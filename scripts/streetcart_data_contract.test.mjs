import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const data = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/streetcart-kc.json"), "utf8")
);

test("curveball module keeps legacy summary fields and new structured fields", () => {
  assert.equal(typeof data.curveballModule.title, "string");
  assert.equal(typeof data.curveballModule.body, "string");
  assert.equal(data.curveballModule.communityVote.window, "14 days");
  assert.deepEqual(data.curveballModule.communityVote.zips, ["66101", "66105"]);
  assert.equal(data.curveballModule.communityVote.bracketTeam, "KCK Unidos");
  assert.equal(data.curveballModule.produceSurge.window, "48 hours");
  assert.equal(data.curveballModule.produceSurge.totalLbs, 1000);
  assert.equal(typeof data.curveballModule.architectureProof, "string");
});

test("produce allocations add up to the declared total", () => {
  const allocated = data.curveballModule.produceSurge.allocations.reduce(
    (sum, allocation) => sum + allocation.lbs,
    0
  );

  assert.equal(allocated, data.curveballModule.produceSurge.totalLbs);
});

test("budget and dashboard data stay aligned to the $500K pilot", () => {
  const budgetTotal = data.budget.reduce((sum, item) => sum + item.amount, 0);

  assert.equal(budgetTotal, 500000);
  assert.equal(data.dashboard.contractValue, 500000);
  assert.equal(typeof data.dashboard.kioskCta, "string");
});

test("kck bracket identity appears in the sample leaderboard", () => {
  assert.ok(data.teams.some((team) => team.name === "KCK Unidos"));
});

test("zip demographics include the vote-zone and food-desert priorities", () => {
  const voteZip = data.zipDemographics.find((zip) => zip.zip === "66101");

  assert.equal(voteZip.priority, "Critical");
  assert.equal(voteZip.hispanicPct, 62.8);
  assert.ok(data.supplyAlerts.some((alert) => alert.impactedZips.includes("66101")));
});
