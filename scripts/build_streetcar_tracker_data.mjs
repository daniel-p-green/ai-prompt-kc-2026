import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

import { createLiveArrivalsSnapshot } from "./fetch_kc_streetcar_arrivals.mjs";
import {
  buildGtfsStopIndex,
  categorizeFoodPlace,
  getNearbyFoodPlaces,
  pickDirectionStopMatch
} from "../src/lib/tracker.js";

const root = process.cwd();
const tmpDir = path.join(root, "tmp", "kcata-gtfs");
const gtfsZipPath = path.join(tmpDir, "google_transit.zip");
const gtfsUrl = "http://www.kc-metro.com/gtf/google_transit.zip";
const routeId = "601";
const outputPath = path.join(root, "data", "kc-streetcar-tracker.json");
const endpointsPath = path.join(
  root,
  "docs/reference/kc-streetcar/arrivals/arrival-display-endpoints.json"
);
const liveSnapshotPath = path.join(
  root,
  "docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json"
);

const curatedPantries = [
  {
    id: "curated-guadalupe-centers",
    name: "Guadalupe Centers",
    category: "pantry",
    address: "1015 Avenida Cesar E. Chavez, Kansas City, MO 64108",
    location: { lat: 39.0856775, lon: -94.5968936 },
    source: "StreetCart docs + public address geocode"
  },
  {
    id: "curated-bishop-sullivan-center",
    name: "Bishop Sullivan Center",
    category: "pantry",
    address: "3936 Troost Ave, Kansas City, MO 64110",
    location: { lat: 39.0548371, lon: -94.572646 },
    source: "StreetCart docs + public address geocode"
  },
  {
    id: "curated-cross-lines-community-outreach",
    name: "Cross-Lines Community Outreach",
    category: "pantry",
    address: "736 Shawnee Ave, Kansas City, KS 66105",
    location: { lat: 39.0859799, lon: -94.6279825 },
    source: "StreetCart docs + public address geocode"
  },
  {
    id: "curated-harvesters",
    name: "Harvesters Community Food Network",
    category: "pantry",
    address: "3801 Topping Ave, Kansas City, MO 64129",
    location: { lat: 39.056118, lon: -94.516518 },
    source: "StreetCart docs + public address geocode"
  }
];

const ensureGtfsFeed = async () => {
  fs.mkdirSync(tmpDir, { recursive: true });

  if (!fs.existsSync(gtfsZipPath)) {
    const response = await fetch(gtfsUrl);
    if (!response.ok) {
      throw new Error(`Failed to download GTFS feed: ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(gtfsZipPath, buffer);
  }

  execFileSync("unzip", ["-o", "-q", gtfsZipPath, "-d", tmpDir]);
};

const parseCsvLine = (line) => {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
};

const readCsv = (filePath) => {
  const lines = fs.readFileSync(filePath, "utf8").trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
};

const loadLiveSnapshot = async () => {
  if (fs.existsSync(liveSnapshotPath)) {
    return JSON.parse(fs.readFileSync(liveSnapshotPath, "utf8"));
  }

  const endpoints = JSON.parse(fs.readFileSync(endpointsPath, "utf8"));
  return createLiveArrivalsSnapshot({ endpoints });
};

const buildGtfsLookups = () => {
  const routes = readCsv(path.join(tmpDir, "routes.txt"));
  const trips = readCsv(path.join(tmpDir, "trips.txt"));
  const stops = readCsv(path.join(tmpDir, "stops.txt"));
  const stopTimes = readCsv(path.join(tmpDir, "stop_times.txt"));

  const route = routes.find((candidate) => candidate.route_id === routeId);
  const stopIndex = buildGtfsStopIndex({ routeId, trips, stops, stopTimes });

  return { route, stopIndex };
};

const buildOverpassQuery = (bbox) => `
[out:json][timeout:25];
(
  nwr["shop"~"supermarket|grocery|greengrocer|convenience|deli|farm|organic|health_food"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  nwr["amenity"="marketplace"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  nwr["amenity"="social_facility"]["social_facility"="food_bank"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  nwr["social_facility"="food_bank"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
);
out center;
`;

const getRouteBoundingBox = (routeStops) => {
  const lats = routeStops.map((stop) => stop.location.lat);
  const lons = routeStops.map((stop) => stop.location.lon);

  return {
    south: Math.min(...lats) - 0.018,
    north: Math.max(...lats) + 0.018,
    west: Math.min(...lons) - 0.022,
    east: Math.max(...lons) + 0.022
  };
};

const fetchOverpassPlaces = async (bbox) => {
  const query = buildOverpassQuery(bbox);
  const urls = [
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass-api.de/api/interpreter"
  ];

  for (const url of urls) {
    const response = await fetch(`${url}?data=${encodeURIComponent(query)}`);
    if (!response.ok) {
      continue;
    }

    const payload = await response.json();
    if (Array.isArray(payload.elements)) {
      return payload.elements;
    }
  }

  throw new Error("Failed to fetch food-access places from public OSM data");
};

const formatAddress = (tags = {}) => {
  const parts = [
    [tags["addr:housenumber"], tags["addr:street"]].filter(Boolean).join(" "),
    tags["addr:city"],
    tags["addr:state"],
    tags["addr:postcode"]
  ].filter(Boolean);

  return parts.join(", ") || null;
};

const normalizeFoodPlace = (place) => {
  const lat = place.lat ?? place.center?.lat;
  const lon = place.lon ?? place.center?.lon;
  if (lat == null || lon == null) {
    return null;
  }

  const name = place.tags?.name ?? place.tags?.brand;
  if (!name) {
    return null;
  }

  return {
    id: `osm-${place.type}-${place.id}`,
    name,
    category: categorizeFoodPlace(place),
    address: formatAddress(place.tags),
    location: {
      lat: Number(lat),
      lon: Number(lon)
    },
    source: "OpenStreetMap"
  };
};

const createStopGroups = ({ liveSnapshot, stopIndex, foodPlaces }) => {
  return liveSnapshot.endpoints
    .map((endpoint, order) => {
      const directions = endpoint.stops
        .map((stop) => {
          const matched = pickDirectionStopMatch({
            directionId: stop.directionId,
            stopName: stop.stopName,
            stopIndex
          });

          if (!matched) {
            return null;
          }

          return {
            code: stop.code,
            label: stop.direction,
            stopName: stop.stopName,
            gtfsStopId: matched.gtfsStopId,
            directionId: stop.directionId,
            location: matched.location
          };
        })
        .filter(Boolean);

      if (directions.length === 0) {
        return null;
      }

      const centroid = directions.reduce(
        (accumulator, direction) => ({
          lat: accumulator.lat + direction.location.lat / directions.length,
          lon: accumulator.lon + direction.location.lon / directions.length
        }),
        { lat: 0, lon: 0 }
      );

      const nearbyFood = getNearbyFoodPlaces({ centroid }, foodPlaces, 1).map((place) => ({
        id: place.id,
        name: place.name,
        category: place.category,
        address: place.address,
        distanceMiles: Number(place.distanceMiles.toFixed(2)),
        source: place.source
      }));

      const categoryCounts = nearbyFood.reduce((counts, place) => {
        counts[place.category] = (counts[place.category] ?? 0) + 1;
        return counts;
      }, {});

      return {
        id: endpoint.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        label: endpoint.label,
        arrivalsUrl: endpoint.url,
        centroid,
        order,
        directions,
        nearbyFood,
        categoryCounts
      };
    })
    .filter(Boolean)
    .toSorted((left, right) => left.order - right.order);
};

const writeJson = (filePath, value) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
};

export const buildTrackerData = async () => {
  await ensureGtfsFeed();

  const liveSnapshot = await loadLiveSnapshot();
  const { route, stopIndex } = buildGtfsLookups();
  const bbox = getRouteBoundingBox(stopIndex.routeStops);
  const osmPlaces = await fetchOverpassPlaces(bbox);
  const normalizedFoodPlaces = osmPlaces
    .map(normalizeFoodPlace)
    .filter(Boolean);
  const uniqueFoodPlaces = [
    ...normalizedFoodPlaces,
    ...curatedPantries
  ].reduce((places, place) => {
    if (!places.some((candidate) => candidate.id === place.id)) {
      places.push(place);
    }
    return places;
  }, []);

  const stopGroups = createStopGroups({
    liveSnapshot,
    stopIndex,
    foodPlaces: uniqueFoodPlaces
  });

  return {
    updatedAt: new Date().toISOString(),
    brand: {
      name: "KC Streetcar",
      colors: {
        blue: "#0081C6",
        navy: "#004987",
        route: `#${route.route_color}`
      }
    },
    route: {
      id: route.route_id,
      shortName: route.route_short_name,
      longName: route.route_long_name,
      color: `#${route.route_color}`,
      textColor: `#${route.route_text_color}`
    },
    sources: {
      brand: "https://kcstreetcar.org/",
      arrivals: "https://arrivals.kcstreetcar.org/rmn",
      gtfs: gtfsUrl,
      foodAccess: "https://overpass.kumi.systems/api/interpreter"
    },
    stopGroups
  };
};

export const main = async () => {
  const trackerData = await buildTrackerData();
  writeJson(outputPath, trackerData);
  console.log(`Wrote ${trackerData.stopGroups.length} stop groups to ${outputPath}`);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
