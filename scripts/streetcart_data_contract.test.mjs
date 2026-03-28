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
  assert.equal(data.curveballModule.communityVote.bracketTeam, "KCK Wildcats");
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

test("kck bracket identity appears in the sample leaderboard", () => {
  assert.ok(data.teams.some((team) => team.name === "KCK Wildcats"));
});
