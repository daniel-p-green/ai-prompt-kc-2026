import test from "node:test";
import assert from "node:assert/strict";

import {
  parseStopCodesFromUrl,
  normalizeEndpointArrivals
} from "./fetch_kc_streetcar_arrivals.mjs";

test("parseStopCodesFromUrl handles single-stop signage URLs", () => {
  assert.deepEqual(parseStopCodesFromUrl("https://arrivals.kcstreetcar.org/rmn"), [
    "rmn"
  ]);
});

test("parseStopCodesFromUrl handles dual-stop signage URLs", () => {
  assert.deepEqual(parseStopCodesFromUrl("https://arrivals.kcstreetcar.org/nlnnls"), [
    "nln",
    "nls"
  ]);
});

test("normalizeEndpointArrivals returns stable arrival data for a signage endpoint", () => {
  const endpoint = {
    label: "River Market North Stop",
    url: "https://arrivals.kcstreetcar.org/rmn"
  };
  const stopsByCode = {
    rmn: {
      direction: "Southbound",
      direction_id: 1,
      label: "River Market North",
      stop_id: "rmn"
    }
  };
  const arrivalsByCode = {
    rmn: {
      stopName: "RIVER MARKET (3RD & GRAND)",
      timestamp: 1774718871964,
      predictions: [
        null,
        [
          {
            countdown: "4 min",
            headsign: "UMKC",
            predTime: "12:32",
            predPeriod: "pm",
            occupancyStatus: "MANY_SEATS_AVAILABLE",
            vehicleId: "812"
          }
        ]
      ]
    }
  };

  assert.deepEqual(
    normalizeEndpointArrivals({ endpoint, stopsByCode, arrivalsByCode }),
    {
      label: "River Market North Stop",
      url: "https://arrivals.kcstreetcar.org/rmn",
      stopCodes: ["rmn"],
      stops: [
        {
          code: "rmn",
          label: "River Market North",
          direction: "Southbound",
          directionId: 1,
          stopName: "RIVER MARKET (3RD & GRAND)",
          timestamp: "2026-03-28T17:27:51.964Z",
          arrivals: [
            {
              countdown: "4 min",
              headsign: "UMKC",
              time: "12:32pm",
              occupancyStatus: "MANY_SEATS_AVAILABLE",
              vehicleId: "812"
            }
          ]
        }
      ]
    }
  );
});
