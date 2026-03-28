import test from "node:test";
import assert from "node:assert/strict";

const loadModule = async () => {
  try {
    return await import("./dashboard-url-state.js");
  } catch {
    assert.fail("dashboard-url-state.js is missing");
  }
};

test("resolveTrackerState preserves stage aliases and valid ZIPs", async () => {
  const module = await loadModule();
  assert.equal(typeof module.resolveTrackerState, "function");

  const state = module.resolveTrackerState({
    search: "?mode=kiosk&zip=66101",
    zipOptions: ["64108", "66101"],
    fallbackZip: "64108"
  });

  assert.deepEqual(state, {
    mode: "stage",
    zip: "66101"
  });
});

test("resolveTrackerState falls back for unknown ZIPs and unsupported modes", async () => {
  const module = await loadModule();
  assert.equal(typeof module.resolveTrackerState, "function");

  const state = module.resolveTrackerState({
    search: "?mode=arcade&zip=99999",
    zipOptions: ["64108", "66101"],
    fallbackZip: "64108"
  });

  assert.deepEqual(state, {
    mode: "exhibit",
    zip: "64108"
  });
});

test("resolveLandingState returns canonical demo view and language", async () => {
  const module = await loadModule();
  assert.equal(typeof module.resolveLandingState, "function");

  const state = module.resolveLandingState("?view=resident&lang=en");

  assert.deepEqual(state, {
    view: "resident",
    lang: "en"
  });
});

test("applySearchState patches only requested values into a URL", async () => {
  const module = await loadModule();
  assert.equal(typeof module.applySearchState, "function");

  const nextUrl = module.applySearchState("https://streetcartkc.test/tracker.html?mode=stage", {
    zip: "66101",
    mode: "exhibit"
  });

  assert.equal(nextUrl, "/tracker.html?zip=66101");
});
