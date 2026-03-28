import fs from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";

const root = process.cwd();
const loadJson = (relPath) =>
  JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));

const data = loadJson("data/streetcart-kc.json");
const outPath = path.join(root, "docs/plans/StreetCart_KC_Oracle.pptx");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.company = "Team Codex KC";
pptx.subject = "StreetCart KC Oracle submission";
pptx.title = "StreetCart KC";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US"
};

const COLORS = {
  ink: "0B1020",
  inkSoft: "172034",
  cream: "F4EDE0",
  creamAlt: "FFF8F0",
  red: "C53E37",
  gold: "E3A23B",
  green: "2E7D64",
  blue: "5C7AEA",
  charcoal: "222831",
  white: "FFFFFF",
  muted: "73829B",
  line: "D7C9B8"
};

const image = (relPath) => path.join(root, relPath);

const addSlideBase = (slide, opts = {}) => {
  const bg = opts.bg || COLORS.creamAlt;
  slide.background = { color: bg };
  slide.addText("StreetCart KC", {
    x: 0.45,
    y: 0.2,
    w: 2.2,
    h: 0.25,
    fontFace: "Aptos Display",
    fontSize: 10,
    bold: true,
    color: bg === COLORS.ink ? COLORS.cream : COLORS.red
  });
  slide.addText("Team Codex KC  •  Oracle Track", {
    x: 10.0,
    y: 0.2,
    w: 2.8,
    h: 0.25,
    fontFace: "Aptos",
    fontSize: 9,
    align: "right",
    color: bg === COLORS.ink ? "D9D6CF" : COLORS.muted
  });
};

const addTitle = (slide, title, subtitle, opts = {}) => {
  slide.addText(title, {
    x: 0.55,
    y: opts.y || 0.6,
    w: opts.w || 8.2,
    h: 0.7,
    fontFace: "Aptos Display",
    fontSize: opts.size || 28,
    bold: true,
    color: opts.color || COLORS.ink
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.58,
      y: (opts.y || 0.6) + 0.72,
      w: opts.subW || 7.8,
      h: 0.5,
      fontFace: "Aptos",
      fontSize: 13,
      color: opts.subColor || COLORS.muted
    });
  }
};

const addFooter = (slide, text, bg = COLORS.creamAlt) => {
  slide.addText(text, {
    x: 0.55,
    y: 7.0,
    w: 12.2,
    h: 0.25,
    fontFace: "Aptos",
    fontSize: 8,
    color: bg === COLORS.ink ? "C5CEDA" : COLORS.muted
  });
};

const addMetricCard = (slide, x, y, w, h, metric, opts = {}) => {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: opts.fill || COLORS.white },
    line: { color: opts.line || COLORS.line, width: 1 }
  });
  slide.addText(metric.value, {
    x: x + 0.18,
    y: y + 0.18,
    w: w - 0.36,
    h: 0.38,
    fontFace: "Aptos Display",
    fontSize: opts.valueSize || 24,
    bold: true,
    color: opts.valueColor || COLORS.ink
  });
  slide.addText(metric.label, {
    x: x + 0.18,
    y: y + 0.6,
    w: w - 0.36,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: opts.labelColor || COLORS.red
  });
  slide.addText(metric.detail, {
    x: x + 0.18,
    y: y + 0.9,
    w: w - 0.36,
    h: h - 1.02,
    fontFace: "Aptos",
    fontSize: 9.5,
    color: opts.detailColor || COLORS.muted,
    valign: "top"
  });
};

const addBulletList = (slide, items, opts = {}) => {
  const runs = items.map((item) => ({
    text: item,
    options: {
      bullet: { indent: 12 },
      hanging: 3
    }
  }));
  slide.addText(runs, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    fontFace: "Aptos",
    fontSize: opts.size || 11.5,
    color: opts.color || COLORS.ink,
    breakLine: true,
    paraSpaceAfterPt: opts.paraSpaceAfterPt || 8,
    valign: "top"
  });
};

const addPill = (slide, text, x, y, fill, color = COLORS.white) => {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: Math.max(1.0, text.length * 0.065),
    h: 0.28,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: fill, width: 0.5 }
  });
  slide.addText(text, {
    x: x + 0.1,
    y: y + 0.04,
    w: Math.max(0.8, text.length * 0.065 - 0.2),
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 8.5,
    bold: true,
    color,
    align: "center"
  });
};

const slide1 = pptx.addSlide();
slide1.background = { color: COLORS.ink };
slide1.addImage({
  path: image("site/assets/streetcart-hub.jpg"),
  x: 7.05,
  y: 0,
  w: 6.28,
  h: 7.5,
  transparency: 15
});
slide1.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 7.3,
  h: 7.5,
  fill: { color: COLORS.ink }
});
slide1.addShape(pptx.ShapeType.rect, {
  x: 6.35,
  y: 0,
  w: 1.8,
  h: 7.5,
  fill: { color: "101827", transparency: 8 },
  line: { color: "101827", transparency: 100 }
});
slide1.addText("StreetCart KC", {
  x: 0.7,
  y: 0.7,
  w: 4.8,
  h: 0.6,
  fontFace: "Aptos Display",
  fontSize: 24,
  bold: true,
  color: COLORS.gold
});
slide1.addText("Kansas City's streetcar-led food access pilot", {
  x: 0.7,
  y: 1.35,
  w: 5.6,
  h: 1.1,
  fontFace: "Aptos Display",
  fontSize: 28,
  bold: true,
  color: COLORS.white
});
slide1.addText(data.thesis, {
  x: 0.7,
  y: 2.55,
  w: 5.8,
  h: 1.05,
  fontFace: "Aptos",
  fontSize: 13,
  color: "D7DDE8"
});
addPill(slide1, "Oracle-led city proposal", 0.72, 3.85, COLORS.red);
addPill(slide1, "Muse inside the pitch", 2.3, 3.85, COLORS.blue);
addPill(slide1, "Thin live demo linked", 3.85, 3.85, COLORS.green);
slide1.addText("11-slide deck  •  live site  •  worklog evidence", {
  x: 0.72,
  y: 4.35,
  w: 4.6,
  h: 0.22,
  fontFace: "Aptos",
  fontSize: 11,
  color: "D7DDE8"
});
data.problemProof.forEach((metric, index) => {
  addMetricCard(
    slide1,
    0.72 + index * 2.05,
    5.25,
    1.82,
    1.45,
    metric,
    {
      fill: "131F34",
      line: "24324E",
      valueColor: COLORS.white,
      labelColor: COLORS.gold,
      detailColor: "C5CEDA",
      valueSize: 20
    }
  );
});
slide1.addText("Team Codex KC  •  Oracle Track  •  60-day pilot plan", {
  x: 0.72,
  y: 6.92,
  w: 5.2,
  h: 0.22,
  fontFace: "Aptos",
  fontSize: 9,
  color: "9FB0C8"
});

const slide2 = pptx.addSlide();
addSlideBase(slide2);
addTitle(
  slide2,
  "Kansas City's food access problem is visible in three numbers",
  "Lead with the facts that make the StreetCart response feel necessary, not decorative."
);
data.problemProof.forEach((metric, index) => {
  addMetricCard(slide2, 0.6 + index * 4.1, 1.55, 3.72, 1.55, metric, {
    fill: index === 0 ? "FFF3EE" : index === 1 ? "F4F7FF" : "F0FAF5",
    line: index === 0 ? "E7C0B9" : index === 1 ? "C9D6FF" : "BEE0D4",
    valueColor: COLORS.ink,
    labelColor: index === 0 ? COLORS.red : index === 1 ? COLORS.blue : COLORS.green,
    valueSize: 28
  });
});
slide2.addText("Who this proposal is for", {
  x: 0.62,
  y: 3.45,
  w: 2.4,
  h: 0.3,
  fontFace: "Aptos Display",
  fontSize: 18,
  bold: true,
  color: COLORS.ink
});
addBulletList(slide2, [
  "City food-access lead who needs a visible 60-day win and a renewal case",
  "Pantry and nonprofit partners who need one operating picture instead of fragmented phone trees",
  "Residents in priority ZIPs who need bilingual instructions and predictable pickup windows",
  "Volunteer teams who need a reason to show up more than once"
], { x: 0.68, y: 3.9, w: 5.8, h: 2.2 });
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 7.15,
  y: 3.55,
  w: 5.55,
  h: 2.45,
  rectRadius: 0.08,
  fill: { color: COLORS.inkSoft },
  line: { color: COLORS.inkSoft }
});
slide2.addText("Priority ZIP proof anchors", {
  x: 7.42,
  y: 3.78,
  w: 2.2,
  h: 0.24,
  fontFace: "Aptos Display",
  fontSize: 16,
  bold: true,
  color: COLORS.white
});
slide2.addText("64130", {
  x: 7.45,
  y: 4.22,
  w: 0.8,
  h: 0.3,
  fontSize: 18,
  bold: true,
  color: COLORS.gold
});
slide2.addText("18.2% food insecurity • 38% no vehicle • zero pantry hits in sampled API query", {
  x: 8.25,
  y: 4.25,
  w: 4.0,
  h: 0.24,
  fontSize: 10,
  color: "D7DDE8"
});
slide2.addText("66101", {
  x: 7.45,
  y: 4.7,
  w: 0.8,
  h: 0.3,
  fontSize: 18,
  bold: true,
  color: COLORS.gold
});
slide2.addText("24.1% food insecurity • 62.8% Hispanic • partner-fed expansion case beyond the corridor", {
  x: 8.25,
  y: 4.73,
  w: 4.0,
  h: 0.24,
  fontSize: 10,
  color: "D7DDE8"
});
slide2.addText("Source set: challenge brief, harvest, pantries, demographics, supply alerts.", {
  x: 7.45,
  y: 5.38,
  w: 4.7,
  h: 0.2,
  fontSize: 8.5,
  color: "AAB5C7"
});
addFooter(slide2, "Use only the three numbers judges will remember. Save the rest for backup.");

const slide3 = pptx.addSlide();
addSlideBase(slide3);
addTitle(
  slide3,
  "StreetCart KC fixes the access layer in one visible operating loop",
  "The streetcar is the public spine. Partners and feeder hubs do the neighborhood fulfillment."
);
const nodes = [
  { x: 0.75, label: "Challenge data", body: "harvest + pantries + alerts + demographics", fill: "FFF3EE", line: "E5C5BF" },
  { x: 2.95, label: "Pilot priorities", body: "ZIP ranking and weekly hub schedule", fill: "F5F6FF", line: "CBD6FF" },
  { x: 5.15, label: "Streetcar hubs", body: "Recurring civic-facing pickup windows", fill: "F0FAF5", line: "BEE0D4" },
  { x: 7.35, label: "Resident instructions", body: "Bilingual SMS and partner-assisted intake", fill: "FFF8E8", line: "F1D28B" },
  { x: 9.55, label: "Verified completions", body: "Pickup, delivery, and verification ledger", fill: "FCEFF7", line: "E8C1D8" }
];
nodes.forEach((node) => {
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: node.x,
    y: 2.4,
    w: 1.85,
    h: 1.55,
    rectRadius: 0.08,
    fill: { color: node.fill },
    line: { color: node.line }
  });
  slide3.addText(node.label, {
    x: node.x + 0.12,
    y: 2.58,
    w: 1.55,
    h: 0.24,
    fontSize: 12,
    fontFace: "Aptos Display",
    bold: true,
    color: COLORS.ink
  });
  slide3.addText(node.body, {
    x: node.x + 0.12,
    y: 3.0,
    w: 1.55,
    h: 0.55,
    fontSize: 9,
    color: COLORS.muted
  });
});
for (let i = 0; i < nodes.length - 1; i += 1) {
  slide3.addShape(pptx.ShapeType.chevron, {
    x: nodes[i].x + 1.82,
    y: 2.95,
    w: 0.28,
    h: 0.42,
    fill: { color: COLORS.red },
    line: { color: COLORS.red }
  });
}
slide3.addShape(pptx.ShapeType.roundRect, {
  x: 9.5,
  y: 4.65,
  w: 2.4,
  h: 1.15,
  rectRadius: 0.08,
  fill: { color: COLORS.inkSoft },
  line: { color: COLORS.inkSoft }
});
slide3.addText("Public proof loop", {
  x: 9.72,
  y: 4.84,
  w: 1.7,
  h: 0.22,
  fontSize: 12,
  bold: true,
  color: COLORS.white
});
slide3.addText("Households served  •  verified points", {
  x: 9.72,
  y: 5.2,
  w: 1.9,
  h: 0.2,
  fontSize: 9,
  color: COLORS.gold
});
slide3.addText("Phase 2 expansion uses KC's free bus network to extend reach beyond the corridor.", {
  x: 0.72,
  y: 6.2,
  w: 7.7,
  h: 0.24,
  fontSize: 11,
  italic: true,
  color: COLORS.blue
});
slide3.addText("Borrowed operating pattern: Baltimore pickup points, Atlanta transit visibility, Philadelphia coordination layer.", {
  x: 0.72,
  y: 6.55,
  w: 8.6,
  h: 0.22,
  fontSize: 9,
  color: COLORS.muted
});
addFooter(slide3, "This slide should explain the whole company in one pass.", COLORS.creamAlt);

const slide4 = pptx.addSlide();
addSlideBase(slide4);
addTitle(
  slide4,
  "Start narrow: four hubs, five ZIPs, one 60-day pilot",
  "Streetcar-facing hubs create the public story. Partner feeders extend access where the corridor alone cannot."
);
slide4.addImage({
  path: image("site/assets/streetcart-hub.jpg"),
  x: 0.62,
  y: 1.6,
  w: 4.55,
  h: 3.45
});
slide4.addShape(pptx.ShapeType.roundRect, {
  x: 0.72,
  y: 5.25,
  w: 4.35,
  h: 1.2,
  rectRadius: 0.08,
  fill: { color: "FFF8E8" },
  line: { color: "F1D28B" }
});
slide4.addText("Pilot ZIPs", {
  x: 0.95,
  y: 5.48,
  w: 1.2,
  h: 0.22,
  fontSize: 12,
  bold: true,
  color: COLORS.ink
});
slide4.addText(data.priorityZips.map((z) => z.zip).join("  •  "), {
  x: 0.95,
  y: 5.84,
  w: 3.7,
  h: 0.22,
  fontSize: 11,
  color: COLORS.red
});
data.hubs.forEach((hub, index) => {
  const x = 5.55 + (index % 2) * 3.45;
  const y = 1.62 + Math.floor(index / 2) * 2.3;
  slide4.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 3.1,
    h: 1.95,
    rectRadius: 0.08,
    fill: { color: index < 2 ? "F5F6FF" : "F4FAF6" },
    line: { color: index < 2 ? "CAD6FF" : "C4E0D4" }
  });
  slide4.addText(hub.name, {
    x: x + 0.16,
    y: y + 0.16,
    w: 2.55,
    h: 0.24,
    fontSize: 12,
    bold: true,
    color: COLORS.ink
  });
  addPill(slide4, hub.type, x + 0.16, y + 0.5, index < 2 ? COLORS.blue : COLORS.green);
  slide4.addText(hub.schedule, {
    x: x + 0.16,
    y: y + 0.82,
    w: 2.65,
    h: 0.2,
    fontSize: 9.5,
    bold: true,
    color: COLORS.red
  });
  slide4.addText(hub.partners.join(" + "), {
    x: x + 0.16,
    y: y + 1.1,
    w: 2.7,
    h: 0.18,
    fontSize: 8.5,
    color: COLORS.muted
  });
  slide4.addText(`Serves ${hub.serves.join(", ")}`, {
    x: x + 0.16,
    y: y + 1.37,
    w: 2.7,
    h: 0.18,
    fontSize: 8.5,
    color: COLORS.ink
  });
});
addFooter(slide4, "Exact streetcar stop names can change. The logic is fixed: civic spine plus feeder reach.");

const slide5 = pptx.addSlide();
addSlideBase(slide5);
addTitle(
  slide5,
  "$500K contract: use the first 60 days to prove renewal",
  "The brief says $500K revenue, $150K operating costs, and 60 days to prove it works. This budget spends like a pilot, not a capital project."
);
slide5.addShape(pptx.ShapeType.roundRect, {
  x: 0.65,
  y: 1.75,
  w: 3.45,
  h: 4.9,
  rectRadius: 0.08,
  fill: { color: COLORS.inkSoft },
  line: { color: COLORS.inkSoft }
});
slide5.addText("$150K", {
  x: 0.93,
  y: 2.15,
  w: 2.1,
  h: 0.45,
  fontSize: 28,
  bold: true,
  color: COLORS.gold
});
slide5.addText("Direct 60-day pilot opex", {
  x: 0.95,
  y: 2.58,
  w: 2.6,
  h: 0.2,
  fontSize: 11.5,
  bold: true,
  color: COLORS.white
});
addBulletList(slide5, [
  "Field staffing and partner hub support",
  "Food handling, cold-chain support, and produce triage",
  "Bilingual SMS and resident outreach",
  "Volunteer operations and event execution"
], { x: 0.96, y: 3.0, w: 2.75, h: 1.7, size: 10.5, color: "D7DDE8" });
slide5.addText("This is the spend that proves the pilot works.", {
  x: 0.95,
  y: 5.48,
  w: 2.3,
  h: 0.3,
  fontSize: 10,
  italic: true,
  color: "B5C0D3"
});
data.budget.forEach((item, index) => {
  addMetricCard(slide5, 4.45 + (index % 2) * 4.05, 1.72 + Math.floor(index / 2) * 1.62, 3.65, 1.35, {
    value: `$${Math.round(item.amount / 1000)}K`,
    label: item.category,
    detail: `${item.percent}% of contract • ${item.detail}`
  }, {
    fill: index === 0 ? "FFF4EE" : index === 1 ? "F5F7FF" : index === 2 ? "F0FAF5" : index === 3 ? "FFF8E8" : "F9EFF7",
    line: COLORS.line,
    valueSize: 22
  });
});
addFooter(slide5, "The direct pilot opex callout is the number to say out loud when judges ask about feasibility.");

const slide6 = pptx.addSlide();
addSlideBase(slide6);
addTitle(
  slide6,
  "What the city gets back in 60 days",
  "Score StreetCart on completed access, not app vanity metrics."
);
data.kpis.forEach((metric, index) => {
  addMetricCard(slide6, 0.7 + index * 3.1, 1.65, 2.78, 1.62, metric, {
    fill: index % 2 === 0 ? "F5F6FF" : "FFF4EE",
    line: index % 2 === 0 ? "CBD6FF" : "E9C5BE",
    valueSize: 24
  });
});
slide6.addShape(pptx.ShapeType.roundRect, {
  x: 0.75,
  y: 3.75,
  w: 5.6,
  h: 2.25,
  rectRadius: 0.08,
  fill: { color: COLORS.white },
  line: { color: COLORS.line }
});
slide6.addText("Renewal triggers", {
  x: 1.0,
  y: 4.0,
  w: 1.9,
  h: 0.24,
  fontSize: 16,
  bold: true,
  color: COLORS.ink
});
addBulletList(slide6, data.renewalCase, {
  x: 1.0,
  y: 4.38,
  w: 4.85,
  h: 1.35,
  size: 10.5
});
slide6.addShape(pptx.ShapeType.roundRect, {
  x: 6.65,
  y: 3.75,
  w: 5.85,
  h: 2.25,
  rectRadius: 0.08,
  fill: { color: COLORS.inkSoft },
  line: { color: COLORS.inkSoft }
});
slide6.addText("Why this is more fundable than another store bet", {
  x: 6.95,
  y: 4.02,
  w: 4.9,
  h: 0.24,
  fontSize: 15,
  bold: true,
  color: COLORS.white
});
addBulletList(slide6, [
  "Uses existing assets and partners instead of new capital build-out",
  "Creates a visible city proof loop with public accountability",
  "Works as a thin operating layer judges can imagine renewing quickly"
], {
  x: 6.95,
  y: 4.4,
  w: 4.9,
  h: 1.3,
  size: 10.5,
  color: "D7DDE8"
});
addFooter(slide6, "Say 'renewal case' at least once. That is the city-buying lens.");

const slide7 = pptx.addSlide();
addSlideBase(slide7, { bg: COLORS.ink });
addTitle(
  slide7,
  "Muse proof lives inside the pitch, not beside it",
  "Civic structure leads. Sports energy makes people remember it.",
  { color: COLORS.white, subColor: "C5CEDA" }
);
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 0.75,
  y: 1.6,
  w: 4.0,
  h: 4.9,
  rectRadius: 0.08,
  fill: { color: "101827" },
  line: { color: "24324E" }
});
slide7.addText("Station scoreboard mock", {
  x: 1.02,
  y: 1.9,
  w: 2.4,
  h: 0.26,
  fontSize: 16,
  bold: true,
  color: COLORS.gold
});
slide7.addText("WEEK 3 LEADERBOARD", {
  x: 1.02,
  y: 2.35,
  w: 2.8,
  h: 0.24,
  fontSize: 10,
  bold: true,
  color: "94A7C5"
});
data.teams.slice(0, 4).forEach((team, index) => {
  slide7.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 2.78 + index * 0.72,
    w: 3.45,
    h: 0.54,
    rectRadius: 0.06,
    fill: { color: index === 0 ? COLORS.red : "1A263D" },
    line: { color: index === 0 ? COLORS.red : "30425F" }
  });
  slide7.addText(team.name, {
    x: 1.15,
    y: 2.93 + index * 0.72,
    w: 1.95,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: COLORS.white
  });
  slide7.addText(String(team.points), {
    x: 3.4,
    y: 2.9 + index * 0.72,
    w: 0.7,
    h: 0.18,
    fontSize: 11,
    bold: true,
    color: COLORS.gold,
    align: "right"
  });
});
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 5.05,
  y: 1.6,
  w: 3.45,
  h: 4.9,
  rectRadius: 0.08,
  fill: { color: COLORS.creamAlt },
  line: { color: "E1D6C8" }
});
slide7.addText("Winning wrap prize", {
  x: 5.35,
  y: 1.88,
  w: 1.8,
  h: 0.24,
  fontSize: 16,
  bold: true,
  color: COLORS.ink
});
slide7.addImage({
  path: image("site/assets/streetcar-hero.jpg"),
  x: 5.35,
  y: 2.3,
  w: 2.85,
  h: 1.9
});
slide7.addShape(pptx.ShapeType.rect, {
  x: 5.65,
  y: 2.78,
  w: 2.3,
  h: 0.75,
  fill: { color: COLORS.red, transparency: 18 },
  line: { color: COLORS.gold, width: 2 }
});
slide7.addText("CHIEFS KINGDOM", {
  x: 5.85,
  y: 3.0,
  w: 1.9,
  h: 0.18,
  fontSize: 11,
  bold: true,
  color: COLORS.white,
  align: "center"
});
slide7.addText("Renewal-phase reward that turns volunteer pride into a public civic signal.", {
  x: 5.35,
  y: 4.42,
  w: 2.8,
  h: 0.45,
  fontSize: 9.5,
  color: COLORS.muted
});
slide7.addShape(pptx.ShapeType.roundRect, {
  x: 8.8,
  y: 1.6,
  w: 3.75,
  h: 4.9,
  rectRadius: 0.08,
  fill: { color: "101827" },
  line: { color: "24324E" }
});
slide7.addText("Resident-facing proof", {
  x: 9.07,
  y: 1.88,
  w: 2.2,
  h: 0.24,
  fontSize: 16,
  bold: true,
  color: COLORS.gold
});
slide7.addText(data.residentExample.instructionTitle, {
  x: 9.1,
  y: 2.45,
  w: 2.95,
  h: 0.42,
  fontSize: 13,
  bold: true,
  color: COLORS.white
});
slide7.addText(data.residentExample.instructionBody, {
  x: 9.1,
  y: 3.05,
  w: 2.95,
  h: 1.15,
  fontSize: 10,
  color: "D7DDE8"
});
slide7.addText(data.residentExample.fallback, {
  x: 9.1,
  y: 4.55,
  w: 2.95,
  h: 0.42,
  fontSize: 9.5,
  italic: true,
  color: COLORS.gold
});
slide7.addText("Every Muse artifact must still point back to households served.", {
  x: 0.78,
  y: 6.8,
  w: 5.5,
  h: 0.22,
  fontSize: 9,
  color: "AAB5C7"
});

const slide8 = pptx.addSlide();
addSlideBase(slide8);
addTitle(
  slide8,
  "What judges can touch in under two minutes",
  "The live site is a thin proof: operator dashboard, resident instructions, and public leaderboard."
);
const views = [
  {
    title: "Operator dashboard",
    sub: "priority ZIPs • next hub • KPI cards",
    body: "Shows the pilot schedule, partner assignment, ZIP priority ranking, and the one curveball-ready operating lever."
  },
  {
    title: "Resident instruction view",
    sub: "English / Español",
    body: "Shows one example household getting a clear pickup message with a fallback for selective delivery."
  },
  {
    title: "Public leaderboard",
    sub: "verified points only",
    body: "Shows the tournament without losing the core metric: verified completions in priority ZIPs."
  }
];
views.forEach((view, index) => {
  const x = 0.78 + index * 4.1;
  slide8.addShape(pptx.ShapeType.roundRect, {
    x,
    y: 1.75,
    w: 3.65,
    h: 4.65,
    rectRadius: 0.08,
    fill: { color: COLORS.white },
    line: { color: COLORS.line }
  });
  slide8.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.18,
    y: 2.05,
    w: 3.28,
    h: 2.18,
    rectRadius: 0.06,
    fill: { color: index === 0 ? "F4F7FF" : index === 1 ? "FFF8E8" : "FCEFF7" },
    line: { color: index === 0 ? "CBD6FF" : index === 1 ? "F1D28B" : "E8C1D8" }
  });
  slide8.addText(view.title, {
    x: x + 0.2,
    y: 4.55,
    w: 2.8,
    h: 0.24,
    fontSize: 14,
    bold: true,
    color: COLORS.ink
  });
  slide8.addText(view.sub, {
    x: x + 0.2,
    y: 4.9,
    w: 2.4,
    h: 0.18,
    fontSize: 9.5,
    bold: true,
    color: COLORS.red
  });
  slide8.addText(view.body, {
    x: x + 0.2,
    y: 5.22,
    w: 3.0,
    h: 0.75,
    fontSize: 9.5,
    color: COLORS.muted
  });
  if (index === 0) {
    slide8.addText("KPI", { x: x + 0.35, y: 2.25, w: 0.5, h: 0.18, fontSize: 9, bold: true, color: COLORS.blue });
    slide8.addText("ZIP", { x: x + 1.48, y: 2.25, w: 0.5, h: 0.18, fontSize: 9, bold: true, color: COLORS.blue });
    slide8.addText("Hub", { x: x + 2.45, y: 2.25, w: 0.5, h: 0.18, fontSize: 9, bold: true, color: COLORS.blue });
    data.priorityZips.slice(0, 3).forEach((zip, r) => {
      slide8.addText(zip.zip, { x: x + 1.42, y: 2.68 + r * 0.34, w: 0.6, h: 0.16, fontSize: 8.5, color: COLORS.ink });
      slide8.addText(zip.priority, { x: x + 0.32, y: 2.68 + r * 0.34, w: 0.7, h: 0.16, fontSize: 8.5, color: COLORS.red });
      slide8.addText(data.hubs[r].name.split(" ")[0], { x: x + 2.32, y: 2.68 + r * 0.34, w: 0.9, h: 0.16, fontSize: 8.5, color: COLORS.ink });
    });
  } else if (index === 1) {
    slide8.addText("StreetCart KC", { x: x + 0.35, y: 2.22, w: 1.2, h: 0.18, fontSize: 9, bold: true, color: COLORS.red });
    slide8.addText("Miércoles · 11:00 AM - 2:00 PM", { x: x + 0.35, y: 2.65, w: 2.5, h: 0.18, fontSize: 8.5, color: COLORS.ink });
    slide8.addText("Cross-Lines Connector Hub", { x: x + 0.35, y: 2.95, w: 2.2, h: 0.18, fontSize: 8.5, color: COLORS.ink });
    slide8.addText("No ID needed • reply AYUDA for delivery", { x: x + 0.35, y: 3.25, w: 2.5, h: 0.18, fontSize: 8.5, color: COLORS.green });
  } else {
    data.teams.slice(0, 3).forEach((team, r) => {
      slide8.addText(team.name, { x: x + 0.35, y: 2.55 + r * 0.42, w: 1.8, h: 0.16, fontSize: 8.5, color: COLORS.ink });
      slide8.addText(String(team.points), { x: x + 2.55, y: 2.55 + r * 0.42, w: 0.5, h: 0.16, fontSize: 8.5, bold: true, color: COLORS.red, align: "right" });
    });
  }
});
addFooter(slide8, "If the site raises more questions than confidence, cut features until these three views are clean.");

const slide9 = pptx.addSlide();
addSlideBase(slide9);
addTitle(
  slide9,
  "AI mastery is visible because the process is visible",
  "Do not just claim AI use. Show how it changed the concept, the data choices, and the artifacts."
);
slide9.addShape(pptx.ShapeType.roundRect, {
  x: 0.72,
  y: 1.75,
  w: 6.1,
  h: 4.85,
  rectRadius: 0.08,
  fill: { color: COLORS.white },
  line: { color: COLORS.line }
});
slide9.addText("What AI actually did", {
  x: 1.0,
  y: 2.0,
  w: 2.2,
  h: 0.24,
  fontSize: 16,
  bold: true,
  color: COLORS.ink
});
addBulletList(slide9, data.aiProcess, {
  x: 1.0,
  y: 2.4,
  w: 5.1,
  h: 1.4,
  size: 11
});
slide9.addText("Worklog moments", {
  x: 1.0,
  y: 4.3,
  w: 2.0,
  h: 0.24,
  fontSize: 14,
  bold: true,
  color: COLORS.red
});
addBulletList(slide9, [
  "10:47 AM — cut low-signal APIs and lock the core data inputs",
  "10:51 AM — streetcar beats bus as the brief's right answer, with bus kept as phase-two reach",
  "10:55 AM — start a live reasoning log to prove iteration instead of reconstructing it later"
], {
  x: 1.0,
  y: 4.62,
  w: 5.0,
  h: 1.2,
  size: 10.2
});
slide9.addShape(pptx.ShapeType.roundRect, {
  x: 7.05,
  y: 1.75,
  w: 5.45,
  h: 4.85,
  rectRadius: 0.08,
  fill: { color: COLORS.inkSoft },
  line: { color: COLORS.inkSoft }
});
slide9.addText("Artifacts judges can inspect", {
  x: 7.33,
  y: 2.02,
  w: 2.8,
  h: 0.24,
  fontSize: 16,
  bold: true,
  color: COLORS.white
});
addBulletList(slide9, [
  "This deck and its source script",
  "The live site showing the same pilot data",
  "The data strategy memo",
  "The timestamped worklog"
], {
  x: 7.33,
  y: 2.42,
  w: 4.3,
  h: 1.3,
  size: 11,
  color: "D7DDE8"
});
slide9.addText("AI mastery score target: show intentional direction, not accidental generation.", {
  x: 7.33,
  y: 5.3,
  w: 4.4,
  h: 0.4,
  fontSize: 10,
  italic: true,
  color: COLORS.gold
});
addFooter(slide9, "Reference docs: streetcart-kc-spine.md, data-strategy.md, 2026-03-28-worklog.md");

const slide10 = pptx.addSlide();
addSlideBase(slide10, { bg: COLORS.ink });
addTitle(
  slide10,
  "Curveball response",
  "This slide is reserved for the 1:00 PM prompt so the team pivots without breaking the story.",
  { color: COLORS.white, subColor: "C5CEDA" }
);
slide10.addShape(pptx.ShapeType.roundRect, {
  x: 0.9,
  y: 1.7,
  w: 5.7,
  h: 3.2,
  rectRadius: 0.08,
  fill: { color: "121B2D" },
  line: { color: "26344F" }
});
slide10.addText("Prepared response frame", {
  x: 1.18,
  y: 1.98,
  w: 2.4,
  h: 0.26,
  fontSize: 18,
  bold: true,
  color: COLORS.gold
});
addBulletList(slide10, [
  "What changed in the environment?",
  "Which operating lever moves first: hub schedule, partner assignment, resident messaging, or produce triage?",
  "How does the public proof loop stay intact?"
], {
  x: 1.18,
  y: 2.42,
  w: 4.8,
  h: 1.3,
  size: 11,
  color: "D7DDE8"
});
slide10.addShape(pptx.ShapeType.roundRect, {
  x: 7.1,
  y: 1.7,
  w: 5.2,
  h: 3.2,
  rectRadius: 0.08,
  fill: { color: "FFF6E7" },
  line: { color: "EACE91" }
});
slide10.addText(data.curveballModule.title, {
  x: 7.42,
  y: 1.98,
  w: 3.0,
  h: 0.26,
  fontSize: 18,
  bold: true,
  color: COLORS.ink
});
slide10.addText(data.curveballModule.body, {
  x: 7.42,
  y: 2.45,
  w: 4.2,
  h: 0.85,
  fontSize: 11.5,
  color: COLORS.ink
});
slide10.addText("Because phase one and phase two are already separated, the model can flex without sounding improvised.", {
  x: 7.42,
  y: 3.52,
  w: 4.1,
  h: 0.55,
  fontSize: 10,
  italic: true,
  color: COLORS.red
});
addFooter(slide10, "Update this slide first at 1:00 PM before touching anything else.", COLORS.ink);

const slide11 = pptx.addSlide();
slide11.background = { color: COLORS.ink };
slide11.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 13.33,
  h: 7.5,
  fill: { color: COLORS.ink }
});
slide11.addText("StreetCart KC", {
  x: 0.82,
  y: 0.92,
  w: 4.0,
  h: 0.45,
  fontSize: 24,
  bold: true,
  color: COLORS.gold
});
slide11.addText("Fund the access layer that makes the existing system work better.", {
  x: 0.82,
  y: 1.55,
  w: 8.5,
  h: 0.85,
  fontSize: 28,
  bold: true,
  color: COLORS.white
});
addBulletList(slide11, [
  "Uses existing infrastructure and trusted partners",
  "Moves food into priority ZIPs in 60 days",
  "Creates a public proof loop the city can renew"
], {
  x: 0.9,
  y: 2.85,
  w: 5.2,
  h: 1.4,
  size: 12,
  color: "D7DDE8"
});
slide11.addText("Linked live proof: operator dashboard • resident instructions • public leaderboard", {
  x: 0.9,
  y: 5.5,
  w: 5.8,
  h: 0.24,
  fontSize: 11,
  color: COLORS.gold
});
slide11.addImage({
  path: image("site/assets/streetcart-hub.jpg"),
  x: 7.35,
  y: 1.1,
  w: 5.25,
  h: 4.6
});
slide11.addText("Ready for judges at 2:30 PM", {
  x: 7.5,
  y: 6.15,
  w: 3.2,
  h: 0.28,
  fontSize: 14,
  bold: true,
  color: COLORS.white
});
slide11.addText("Team Codex KC  •  Oracle-led submission", {
  x: 0.9,
  y: 6.82,
  w: 4.2,
  h: 0.22,
  fontSize: 9,
  color: "9FB0C8"
});

await pptx.writeFile({ fileName: outPath });
console.log(`Wrote ${outPath}`);
