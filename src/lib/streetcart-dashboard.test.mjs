import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  advanceSimulation,
  buildBudgetBars,
  buildPresentationStats,
  buildZipHeatRows,
  createSimulationState,
  resolveDashboardMode
} from "./streetcart-dashboard.js";

const data = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/streetcart-kc.json"), "utf8")
);

test("buildZipHeatRows sorts ZIPs by priority and enriches 66101 with route context", () => {
  const rows = buildZipHeatRows(data);

  assert.equal(rows[0].priority, "Critical");
  assert.equal(rows[0].zip, "66101");
  assert.equal(rows[0].harvestRoute.weeklyLbs, 15000);
  assert.ok(rows[0].pantries.some((pantry) => pantry.name === "El Centro Academy"));
  assert.ok(rows[0].transitStops.some((stop) => stop.route === "51 - KCK/Minnesota"));
  assert.equal(rows[0].alertCount, 3);
});

test("buildBudgetBars preserves the full $500K allocation and normalized shares", () => {
  const rows = buildBudgetBars(data.budget);
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  const shareTotal = rows.reduce((sum, row) => sum + row.share, 0);

  assert.equal(total, 500000);
  assert.equal(rows[0].category, "Pilot operations (60 days)");
  assert.ok(Math.abs(shareTotal - 1) < 0.000001);
});

test("advanceSimulation applies the next queued event to the matching team and live feed", () => {
  const initial = createSimulationState(data);
  const next = advanceSimulation(initial);
  const event = data.liveFeed.queuedEvents[0];
  const updatedTeam = next.teams.find((team) => team.name === event.team);
  const originalTeam = initial.teams.find((team) => team.name === event.team);

  assert.equal(updatedTeam.points, originalTeam.points + event.points);
  assert.equal(updatedTeam.deliveries, originalTeam.deliveries + event.deliveries);
  assert.equal(next.feedEntries[0].team, event.team);
  assert.equal(next.feedEntries[0].zip, event.zip);
  assert.equal(next.step, 1);
});

test("resolveDashboardMode treats stage aliases as presentation mode", () => {
  assert.equal(resolveDashboardMode(""), "exhibit");
  assert.equal(resolveDashboardMode("?mode=stage"), "stage");
  assert.equal(resolveDashboardMode("?mode=presentation"), "stage");
  assert.equal(resolveDashboardMode("?mode=kiosk"), "stage");
  assert.equal(resolveDashboardMode("?mode=unknown"), "exhibit");
});

test("buildPresentationStats rolls up scoreboard totals and priority-route volume", () => {
  const zipRows = buildZipHeatRows(data);
  const stats = buildPresentationStats({
    teams: data.teams,
    zipRows
  });

  assert.equal(stats.totalDeliveries, 1757);
  assert.equal(stats.totalHouseholds, 1309);
  assert.equal(stats.totalPounds, 53340);
  assert.equal(stats.priorityRoutePounds, 56000);
  assert.deepEqual(stats.priorityZips.slice(0, 3), ["66101", "66105", "64127"]);
});
