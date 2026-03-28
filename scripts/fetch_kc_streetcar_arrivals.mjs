import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const firebaseBaseUrl = "https://kiosk-6e6b4.firebaseio.com";
const endpointsPath = path.join(
  root,
  "docs/reference/kc-streetcar/arrivals/arrival-display-endpoints.json"
);
const defaultOutPath = path.join(
  root,
  "docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json"
);

const chunk = (value, size) => {
  const parts = [];
  for (let index = 0; index < value.length; index += size) {
    parts.push(value.slice(index, index + size));
  }
  return parts.filter(Boolean);
};

export const parseStopCodesFromUrl = (url) => {
  const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
  if (!pathname) {
    return [];
  }
  return chunk(pathname, 3);
};

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

const getPredictionsForStop = (stop, arrivals) => {
  if (!Array.isArray(arrivals?.predictions)) {
    return [];
  }

  const predictions = arrivals.predictions[stop.direction_id] ?? [];
  if (!Array.isArray(predictions)) {
    return [];
  }

  return predictions
    .filter((prediction) => prediction && !prediction.cancelled)
    .map(normalizePrediction)
    .filter((prediction) => prediction.time || prediction.countdown);
};

export const normalizeEndpointArrivals = ({
  endpoint,
  stopsByCode,
  arrivalsByCode
}) => {
  const stopCodes = parseStopCodesFromUrl(endpoint.url);
  const stops = stopCodes.map((code) => {
    const stop = stopsByCode[code] ?? {};
    const arrivals = arrivalsByCode[code] ?? {};

    return {
      code,
      label: stop.label ?? code.toUpperCase(),
      direction: stop.direction ?? null,
      directionId: stop.direction_id ?? null,
      stopName: arrivals.stopName ?? null,
      timestamp: arrivals.timestamp ? new Date(arrivals.timestamp).toISOString() : null,
      arrivals: getPredictionsForStop(stop, arrivals)
    };
  });

  return {
    label: endpoint.label,
    url: endpoint.url,
    stopCodes,
    stops
  };
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const writeJson = (filePath, value) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
};

const fetchJson = async (relativePath) => {
  const response = await fetch(`${firebaseBaseUrl}/${relativePath}.json`);
  if (!response.ok) {
    throw new Error(`Firebase request failed for ${relativePath}: ${response.status}`);
  }
  return response.json();
};

const getOutPath = (args) => {
  const outIndex = args.indexOf("--out");
  if (outIndex === -1) {
    return defaultOutPath;
  }

  const nextArg = args[outIndex + 1];
  if (!nextArg) {
    throw new Error("Missing value for --out");
  }

  return path.resolve(root, nextArg);
};

export const createLiveArrivalsSnapshot = async ({ endpoints }) => {
  const [stopsByCode, alerts] = await Promise.all([
    fetchJson("stops"),
    fetchJson("alerts")
  ]);
  const stopCodes = [...new Set(endpoints.flatMap((endpoint) => parseStopCodesFromUrl(endpoint.url)))];
  const arrivalsEntries = await Promise.all(
    stopCodes.map(async (code) => [code, await fetchJson(`byStop/${code}`)])
  );
  const arrivalsByCode = Object.fromEntries(arrivalsEntries);

  return {
    fetchedAt: new Date().toISOString(),
    firebaseBaseUrl,
    alerts: Array.isArray(alerts) ? alerts.filter(Boolean) : [],
    endpoints: endpoints.map((endpoint) =>
      normalizeEndpointArrivals({ endpoint, stopsByCode, arrivalsByCode })
    )
  };
};

export const main = async (args = process.argv.slice(2)) => {
  const outPath = getOutPath(args);
  const endpoints = readJson(endpointsPath);
  const snapshot = await createLiveArrivalsSnapshot({ endpoints });
  writeJson(outPath, snapshot);
  console.log(`Wrote ${snapshot.endpoints.length} endpoints to ${outPath}`);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
