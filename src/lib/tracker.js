const EARTH_RADIUS_MILES = 3958.8;

const toRadians = (value) => (value * Math.PI) / 180;

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
