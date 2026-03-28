const EARTH_RADIUS_MILES = 3958.8;

const toRadians = (value) => (value * Math.PI) / 180;
const normalizeStopName = (value) => String(value ?? "").trim().toUpperCase();

export const haversineMiles = (start, end) => {
  const latDistance = toRadians(end.lat - start.lat);
  const lonDistance = toRadians(end.lon - start.lon);
  const startLat = toRadians(start.lat);
  const endLat = toRadians(end.lat);

  const a =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(startLat) * Math.cos(endLat) * Math.sin(lonDistance / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(a));
};

export const categorizeFoodPlace = (place) => {
  const tags = place.tags ?? {};
  const shop = tags.shop ?? "";
  const amenity = tags.amenity ?? "";
  const socialFacility = tags.social_facility ?? "";

  if (place.category) {
    return place.category;
  }

  if (socialFacility === "food_bank") {
    return "pantry";
  }

  if (amenity === "marketplace") {
    return "farmers_market";
  }

  if (["supermarket", "grocery", "greengrocer", "organic", "health_food"].includes(shop)) {
    return "grocery";
  }

  return "food_retailer";
};

const rankStopCandidates = (candidates) => {
  const byStopId = new Map();

  candidates.forEach((candidate) => {
    const existing = byStopId.get(candidate.gtfsStopId);
    if (existing) {
      existing.matches += 1;
      existing.minSequence = Math.min(existing.minSequence, candidate.stopSequence);
      return;
    }

    byStopId.set(candidate.gtfsStopId, {
      gtfsStopId: candidate.gtfsStopId,
      stopName: candidate.stopName,
      location: candidate.location,
      matches: 1,
      minSequence: candidate.stopSequence
    });
  });

  return [...byStopId.values()].toSorted((left, right) => {
    if (right.matches !== left.matches) {
      return right.matches - left.matches;
    }

    return left.minSequence - right.minSequence;
  });
};

export const buildGtfsStopIndex = ({ routeId, trips, stops, stopTimes }) => {
  const tripById = new Map(
    trips
      .filter((trip) => trip.route_id === routeId)
      .map((trip) => [trip.trip_id, trip])
  );
  const stopById = new Map(stops.map((stop) => [stop.stop_id, stop]));
  const routeStopsById = new Map();
  const candidatesByDirectionAndName = new Map();
  const candidatesByName = new Map();

  stopTimes.forEach((stopTime) => {
    const trip = tripById.get(stopTime.trip_id);
    if (!trip) {
      return;
    }

    const stop = stopById.get(stopTime.stop_id);
    if (!stop) {
      return;
    }

    const normalizedName = normalizeStopName(stop.stop_name);
    const candidate = {
      gtfsStopId: stop.stop_id,
      stopName: stop.stop_name,
      stopSequence: Number(stopTime.stop_sequence),
      location: {
        lat: Number(stop.stop_lat),
        lon: Number(stop.stop_lon)
      }
    };
    const directionKey = `${trip.direction_id}:${normalizedName}`;

    if (!routeStopsById.has(candidate.gtfsStopId)) {
      routeStopsById.set(candidate.gtfsStopId, {
        gtfsStopId: candidate.gtfsStopId,
        stopName: candidate.stopName,
        location: candidate.location
      });
    }

    const directionCandidates = candidatesByDirectionAndName.get(directionKey) ?? [];
    directionCandidates.push(candidate);
    candidatesByDirectionAndName.set(directionKey, directionCandidates);

    const namedCandidates = candidatesByName.get(normalizedName) ?? [];
    namedCandidates.push(candidate);
    candidatesByName.set(normalizedName, namedCandidates);
  });

  return {
    routeStops: [...routeStopsById.values()],
    candidatesByDirectionAndName: new Map(
      [...candidatesByDirectionAndName.entries()].map(([key, candidates]) => [
        key,
        rankStopCandidates(candidates)
      ])
    ),
    candidatesByName: new Map(
      [...candidatesByName.entries()].map(([key, candidates]) => [key, rankStopCandidates(candidates)])
    )
  };
};

export const pickDirectionStopMatch = ({ directionId, stopName, stopIndex }) => {
  const normalizedName = normalizeStopName(stopName);
  const directionCandidates =
    stopIndex.candidatesByDirectionAndName.get(`${directionId}:${normalizedName}`) ?? [];

  if (directionCandidates.length > 0) {
    return directionCandidates[0];
  }

  const namedCandidates = stopIndex.candidatesByName.get(normalizedName) ?? [];
  return namedCandidates[0] ?? null;
};

export const getNearbyFoodPlaces = (stopGroup, places, maxMiles = 1) => {
  const center = stopGroup.centroid;
  if (!center) {
    return [];
  }

  return places
    .map((place) => ({
      ...place,
      category: categorizeFoodPlace(place),
      distanceMiles: haversineMiles(center, place.location)
    }))
    .filter((place) => place.distanceMiles <= maxMiles)
    .toSorted((left, right) => left.distanceMiles - right.distanceMiles);
};

export const mergeStopGroupsWithArrivals = (stopGroups, liveArrivals) => {
  const liveByCode = new Map();

  liveArrivals.forEach((group) => {
    group.stops.forEach((stop) => {
      const live = {
        arrivals: stop.arrivals,
      };

      if (stop.stopName) {
        live.stopName = stop.stopName;
      }

      if (stop.timestamp) {
        live.timestamp = stop.timestamp;
      }

      liveByCode.set(stop.code, live);
    });
  });

  return stopGroups.map((group) => ({
    ...group,
    directions: group.directions.map((direction) => ({
      ...direction,
      live: liveByCode.get(direction.code) ?? { arrivals: [] }
    }))
  }));
};
