# StreetCart KC

StreetCart KC is Team Codex KC's working repo for the 2026 AI Prompt Championship submission. The concept is a streetcar-led, partner-operated food-access pilot for Kansas City: the streetcar corridor is the public-facing spine, while pantry and nonprofit partners handle neighborhood fulfillment into priority ZIP codes.

This repo currently carries three connected artifacts:

- Oracle: business case, pilot economics, and judge-facing deck
- Muse: brand and creative system for the concept
- Architect: a thin product proof made up of a static StreetCart site and a KC Streetcar tracker page

## Current Status

As of `2026-03-28`, the repo has a usable competition baseline:

- A lightweight static StreetCart proof exists and serves from this repo.
- A branded KC Streetcar food-access tracker ships as a separate React/Vite page at `tracker.html`.
- The Oracle deck is generated from source data and preserved in the legacy archive.
- Shared source data lives in `data/streetcart-kc.json` and `data/kc-streetcar-tracker.json`.
- Structured benchmark research now also lives in `docs/research/2026-03-28-food-access-program-benchmark-dataset/`.
- Research and side explorations are preserved as evidence, not treated as active requirements.

What is not done yet:

- The long-term application stack (`Next.js`, `TypeScript`, `Postgres`, SMS provider) has not been scaffolded.
- There is still no lint workflow or backend service.
- The tracker is still a client-side proof backed by generated data and public feeds, not a production application.

## Documentation Status

- Active docs live in the repo root, `docs/product/`, `docs/engineering/`, `docs/logs/`, `docs/reference/`, and `docs/research/`.
- Superseded competition-planning material was moved to `docs/archive/legacy/2026-03-28-competition-package/`.
- Start with `docs/README.md` if you need the current doc map before opening individual files.

## What We Have

### Active docs

- Tracker product brief: `docs/product/kc-streetcar-food-access-tracker-prd.md`
- Tracker user stories: `docs/product/kc-streetcar-food-access-tracker-user-stories.md`
- UI and implementation handoff: `MASTER_DOC.md`
- Visual and copy standard: `BRAND.md`
- Decision trail: `docs/logs/2026-03-28-worklog.md`

### Current artifacts

- Static StreetCart proof: `index.html`, `site/app.js`, `site/styles.css`, `data/streetcart-kc.json`
- KC Streetcar tracker proof: `tracker.html`, `src/tracker/`, `data/kc-streetcar-tracker.json`
- Research archive and supporting exploration: `docs/research/`
- Historical discovery, Oracle, Muse, and planning docs: `docs/archive/legacy/2026-03-28-competition-package/`

### Reference material

- KC Streetcar scraped/reference material: `docs/reference/kc-streetcar/`
- Active engineering guidance: `docs/engineering/test-strategy.md`

## Repo Map

```text
.
├── AGENTS.md                        # Project operating rules
├── BRAND.md                         # Current tracker brand/design standard
├── MASTER_DOC.md                    # Current tracker implementation handoff
├── README.md                        # Root project handbook
├── data/                            # Shared demo/deck/tracker data
├── docs/
│   ├── README.md                    # Active-vs-archived doc index
│   ├── archive/                     # Legacy competition planning material
│   ├── engineering/                 # Implementation and test strategy notes
│   ├── logs/                        # Dated worklogs and operating record
│   ├── product/                     # Active tracker PRD and user stories
│   ├── reference/                   # External reference snapshots
│   └── research/                    # Side research and source artifacts
├── scripts/                         # Artifact generation scripts
├── site/                            # Static demo assets
├── src/tracker/                     # React tracker app
├── index.html                       # Static demo entrypoint
├── package.json                     # Current repo scripts
├── tracker.html                     # React tracker entrypoint
└── vite.config.js                   # Multi-page Vite config
```

## Commands

Current scripts:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run arrivals:fetch
npm run deck:build
npm run site:serve
npm run tracker:data
npm run test
npm run test:arrivals
npm run test:streetcart
npm run test:tracker
```

What each one does:

- `npm run dev`: serves both the landing page and the tracker page locally with Vite
- `npm run build`: builds the multi-page site to `dist/`
- `npm run preview`: serves the built output for browser verification
- `npm run arrivals:fetch`: fetches the live KC Streetcar signage data from the public Firebase backend and writes `docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json`
- `npm run deck:build`: regenerates the Oracle PowerPoint from `data/streetcart-kc.json`
- `npm run site:serve`: serves the repo root at `http://127.0.0.1:4173/`
- `npm run tracker:data`: rebuilds the streetcar stop + food-access dataset at `data/kc-streetcar-tracker.json`
- `npm run test`: runs arrival, tracker, and StreetCart data-contract tests
- `npm run test:arrivals`: runs the scraper unit tests for signage URL parsing and output normalization
- `npm run test:streetcart`: verifies the StreetCart source JSON contract used by the deck and static proof
- `npm run test:tracker`: runs tracker helper tests for GTFS stop matching and food-access filtering

There is still no lint workflow, but the repo now has real `dev`, `build`, `preview`, and combined `test` commands.

## Operating Sources Of Truth

When docs disagree, use this order:

1. `MASTER_DOC.md`
2. `docs/product/kc-streetcar-food-access-tracker-prd.md`
3. `docs/product/kc-streetcar-food-access-tracker-user-stories.md`
4. `docs/logs/2026-03-28-worklog.md`
5. Historical material in `docs/archive/legacy/2026-03-28-competition-package/`

Working rules:

- Keep the streetcar as the public-facing spine, not the full logistics system.
- Keep phase one pickup-first and partner-supported.
- Keep the proof centered on households served, priority ZIPs, and verified completions.
- Preserve side explorations as process evidence, but do not let them compete with the active tracker requirements.

## Delivery Workflow

For any non-trivial task in this repo:

1. Write success criteria first.
2. Make or update the controlling doc before changing artifacts.
3. Log meaningful decisions in the dated worklog.
4. Rebuild the affected artifact.
5. Verify the output before claiming completion.

Current artifact flow:

1. Update the controlling source doc or source data first.
2. Regenerate the affected artifact:
   - Oracle deck: `npm run deck:build`
   - Tracker data: `npm run tracker:data`
   - Live arrivals snapshot: `npm run arrivals:fetch`
3. Run the relevant tests.
4. Review the affected page or artifact locally.
5. Record the result in `docs/logs/2026-03-28-worklog.md` when the change materially affects project direction.

## Recommended Next Build Path

The repo's long-term application direction is still:

- Frontend: `Next.js` + `TypeScript`
- Data: `Postgres`
- Messaging: SMS provider for resident notifications

Recommended sequence:

1. Preserve the current static demo and tracker as the content and UX baseline.
2. Scaffold the actual app only after the competition narrative and tracker requirements are stable.
3. Move shared facts into a typed data layer when the app scaffold exists.
4. Add a lint workflow once the framework and file conventions stabilize.

## Risks

- The repo can look more finished than it is if the static demo is mistaken for production architecture.
- The deck, site, and source JSON can diverge if changes are made directly in generated artifacts.
- Historical competition docs can still cause confusion if contributors ignore the new archive boundary.
- The team can lose time by expanding the live product before the competition story is fully stable.

## Retrospective Prompt

At the end of each work block, answer:

- What changed?
- What did we verify?
- What is the next highest-leverage move?
- What would we do differently next time?
