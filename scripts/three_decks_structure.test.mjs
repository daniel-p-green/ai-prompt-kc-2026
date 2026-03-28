import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const decks = [
  {
    file: "streetcart-kc-oracle.html",
    strings: [
      "The Oracle: 60-Day Business Plan",
      "MD Food Bank benchmark: 11,266 HH/year, 2 vehicles, 4.2:1 ROI",
      "Decentralized systems absorb shocks centralized models cannot survive."
    ]
  },
  {
    file: "streetcart-kc-muse.html",
    strings: [
      "The Muse: Go-to-Market &amp; Brand",
      "The scoreboard is the billboard.",
      "Voto y Verdura: Vote and Vegetables"
    ]
  },
  {
    file: "streetcart-kc-architect.html",
    strings: [
      "The Architect: Platform &amp; Live Dashboard",
      "All 8 API endpoints rendered in one operational view",
      "Eight endpoints. One dashboard. Three surfaces. One truth."
    ]
  }
];

test("streetcart-kc-master.html references all three decks", () => {
  const html = readFileSync(resolve(process.cwd(), "streetcart-kc-master.html"), "utf8");
  assert.ok(html.includes("streetcart-kc-oracle.html"));
  assert.ok(html.includes("streetcart-kc-muse.html"));
  assert.ok(html.includes("streetcart-kc-architect.html"));
  assert.ok(html.includes("id=\"deck-frame\""));
});

for (const deck of decks) {
  test(`${deck.file} has five slides and required copy`, () => {
    const html = readFileSync(resolve(process.cwd(), deck.file), "utf8");
    const slideCount = (html.match(/<section class="slide/g) || []).length;
    assert.equal(slideCount, 5);

    for (const snippet of deck.strings) {
      assert.ok(html.includes(snippet), `${deck.file} missing "${snippet}"`);
    }
  });
}
