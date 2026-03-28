import test from "node:test";
import assert from "node:assert/strict";

import {
  buildGtfsStopIndex,
  categorizeFoodPlace,
  getNearbyFoodPlaces,
  mergeStopGroupsWithArrivals,
  pickDirectionStopMatch
} from "./tracker.js";

test("categorizeFoodPlace maps pantry records first", () => {
  assert.equal(
    categorizeFoodPlace({
      tags: { social_facility: "food_bank", shop: "supermarket" }
    }),
    "pantry"
  );
});

test("categorizeFoodPlace maps farmers markets and grocery stores", () => {
  assert.equal(
    categorizeFoodPlace({
      tags: { amenity: "marketplace" }
    }),
    "farmers_market"
  );
  assert.equal(
    categorizeFoodPlace({
      tags: { shop: "supermarket" }
    }),
    "grocery"
  );
  assert.equal(
    categorizeFoodPlace({
      tags: { shop: "convenience" }
    }),
    "food_retailer"
  );
});

test("getNearbyFoodPlaces keeps only resources within 1 mile and sorts them by distance", () => {
  const stopGroup = {
    centroid: { lat: 39.1, lon: -94.58 }
  };
  const places = [
    {
      id: "far",
      name: "Too Far",
      category: "grocery",
      location: { lat: 39.122, lon: -94.58 }
    },
    {
      id: "near-2",
      name: "Second Closest",
      category: "food_retailer",
      location: { lat: 39.103, lon: -94.58 }
    },
    {
      id: "near-1",
      name: "Closest",
      category: "pantry",
      location: { lat: 39.101, lon: -94.58 }
    }
  ];

  assert.deepEqual(
    getNearbyFoodPlaces(stopGroup, places, 1).map((place) => place.id),
    ["near-1", "near-2"]
  );
});

test("mergeStopGroupsWithArrivals attaches live arrivals by stop code", () => {
  const stopGroups = [
    {
      id: "north-loop",
      label: "North Loop Stops",
      directions: [
        { code: "nln", label: "North Loop Northbound" },
        { code: "nls", label: "North Loop Southbound" }
      ]
    }
  ];
  const liveArrivals = [
    {
      label: "North Loop Stops",
      stops: [
        {
          code: "nln",
          arrivals: [{ countdown: "Due", headsign: "River Market" }]
        },
        {
          code: "nls",
          arrivals: [{ countdown: "6 min", headsign: "UMKC" }]
        }
      ]
    }
  ];

  assert.deepEqual(mergeStopGroupsWithArrivals(stopGroups, liveArrivals), [
    {
      id: "north-loop",
      label: "North Loop Stops",
      directions: [
        {
          code: "nln",
          label: "North Loop Northbound",
          live: { arrivals: [{ countdown: "Due", headsign: "River Market" }] }
        },
        {
          code: "nls",
          label: "North Loop Southbound",
          live: { arrivals: [{ countdown: "6 min", headsign: "UMKC" }] }
        }
      ]
    }
  ]);
});

test("pickDirectionStopMatch prefers the most common direction-specific GTFS stop", () => {
  const stopIndex = buildGtfsStopIndex({
    routeId: "601",
    trips: [
      { trip_id: "south-1", route_id: "601", direction_id: "1" },
      { trip_id: "south-2", route_id: "601", direction_id: "1" },
      { trip_id: "north-1", route_id: "601", direction_id: "0" }
    ],
    stops: [
      {
        stop_id: "1601",
        stop_name: "RIVER MARKET WEST (4TH & DELWARE)",
        stop_lat: "39.108848",
        stop_lon: "-94.584417"
      },
      {
        stop_id: "9001",
        stop_name: "RIVER MARKET WEST (4TH & DELWARE)",
        stop_lat: "39.1087",
        stop_lon: "-94.5842"
      },
      {
        stop_id: "1602",
        stop_name: "NORTH LOOP (7TH & MAIN ST)",
        stop_lat: "39.105427",
        stop_lon: "-94.583172"
      }
    ],
    stopTimes: [
      { trip_id: "south-1", stop_id: "1601", stop_sequence: "2" },
      { trip_id: "south-2", stop_id: "1601", stop_sequence: "2" },
      { trip_id: "south-2", stop_id: "9001", stop_sequence: "2" },
      { trip_id: "north-1", stop_id: "1602", stop_sequence: "3" }
    ]
  });

  assert.deepEqual(
    pickDirectionStopMatch({
      directionId: 1,
      stopName: "RIVER MARKET WEST (4TH & DELWARE)",
      stopIndex
    }),
    {
      gtfsStopId: "1601",
      stopName: "RIVER MARKET WEST (4TH & DELWARE)",
      location: { lat: 39.108848, lon: -94.584417 },
      matches: 2,
      minSequence: 2
    }
  );
});

test("pickDirectionStopMatch falls back to stop name when a direction-specific record is missing", () => {
  const stopIndex = buildGtfsStopIndex({
    routeId: "601",
    trips: [{ trip_id: "north-1", route_id: "601", direction_id: "0" }],
    stops: [
      {
        stop_id: "1615",
        stop_name: "CITY MARKET (5TH & WALNUT ST)",
        stop_lat: "39.106145",
        stop_lon: "-94.580931"
      }
    ],
    stopTimes: [{ trip_id: "north-1", stop_id: "1615", stop_sequence: "2" }]
  });

  assert.deepEqual(
    pickDirectionStopMatch({
      directionId: 1,
      stopName: "CITY MARKET (5TH & WALNUT ST)",
      stopIndex
    }),
    {
      gtfsStopId: "1615",
      stopName: "CITY MARKET (5TH & WALNUT ST)",
      location: { lat: 39.106145, lon: -94.580931 },
      matches: 1,
      minSequence: 2
    }
  );
});
