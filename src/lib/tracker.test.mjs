import test from "node:test";
import assert from "node:assert/strict";

import {
  categorizeFoodPlace,
  getNearbyFoodPlaces,
  mergeStopGroupsWithArrivals
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
