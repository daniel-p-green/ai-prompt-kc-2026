export const FIREBASE_BASE_URL = "https://kiosk-6e6b4.firebaseio.com";
export const LIVE_POLL_INTERVAL_MS = 30000;

const formatArrivalTime = (prediction) => {
  const time = prediction.predTime || prediction.schedTime;
  const period = prediction.predPeriod || prediction.schedPeriod || "";

  if (!time) {
    return null;
  }

  return `${time}${period}`;
};

const normalizePrediction = (prediction) => ({
  countdown: prediction.countdown ?? null,
  headsign: prediction.headsign ?? null,
  time: formatArrivalTime(prediction),
  occupancyStatus: prediction.occupancyStatus ?? null,
  vehicleId: prediction.vehicleId ?? null
});

const getPredictionsForDirection = (direction, arrivals) => {
  const directionPredictions =
    arrivals?.predictions?.[direction.directionId] ??
    arrivals?.predictions?.[String(direction.directionId)] ??
    [];

  if (!Array.isArray(directionPredictions)) {
    return [];
  }

  return directionPredictions
    .filter((prediction) => prediction && !prediction.cancelled)
    .map(normalizePrediction)
    .filter((prediction) => prediction.time || prediction.countdown);
};

const fetchJson = async (relativePath) => {
  const response = await fetch(`${FIREBASE_BASE_URL}/${relativePath}.json`);
  if (!response.ok) {
    throw new Error(`Live arrivals request failed for ${relativePath}: ${response.status}`);
  }

  return response.json();
};

export const fetchLiveStopGroups = async (stopGroups) => {
  const stopCodes = [...new Set(stopGroups.flatMap((group) => group.directions.map((direction) => direction.code)))];
  const [alerts, ...arrivalsEntries] = await Promise.all([
    fetchJson("alerts"),
    ...stopCodes.map(async (code) => [code, await fetchJson(`byStop/${code}`)])
  ]);
  const arrivalsByCode = new Map(arrivalsEntries);

  return {
    alerts: Array.isArray(alerts) ? alerts.filter(Boolean) : [],
    fetchedAt: new Date().toISOString(),
    endpoints: stopGroups.map((group) => ({
      label: group.label,
      stops: group.directions.map((direction) => {
        const arrivals = arrivalsByCode.get(direction.code) ?? {};

        return {
          code: direction.code,
          direction: direction.label,
          directionId: direction.directionId,
          stopName: arrivals.stopName ?? direction.stopName,
          timestamp: arrivals.timestamp ? new Date(arrivals.timestamp).toISOString() : null,
          arrivals: getPredictionsForDirection(direction, arrivals)
        };
      })
    }))
  };
};
