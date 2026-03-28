# Test Strategy: StreetCart KC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Current runtime: Vite multi-page frontend, React dashboard page, Node-based data/build scripts
Future-state app stack: `Next.js`, `TypeScript`, `Postgres`, and an SMS provider remain deferred
Coverage focus: automated checks protect the architect web artifact inside the repo's final Oracle, Muse, and Architect submission package

## Quality Gates

- Lint: `Not configured yet`
- Test: `npm run test`
- Build: `npm run build`
- Preview: `npm run preview`

## Current Baseline Verification

- Live arrivals scraper unit tests: `npm run test:arrivals`
- StreetCart source-data contract tests: `npm run test:streetcart`
- Tracker helper tests: `npm run test:tracker`
- Dashboard helper tests: `npm run test:dashboard`
- Combined regression check: `npm run test`
- Live arrivals reference refresh: `npm run arrivals:fetch`
- Tracker dataset rebuild: `npm run tracker:data`
- Deck rebuild: `npm run deck:build`
- Local multi-page app review: `npm run dev` or `npm run preview`
- Manual static-site walkthrough:
  - `index.html` loads the StreetCart proof with no missing assets
  - core KPIs, partner sections, and proof framing remain legible
- Manual dashboard walkthrough:
  - `tracker.html` loads with the StreetCart hero, scoreboard, ZIP pressure board, budget panel, and pantry panel
  - ZIP selection updates the detail panel in one interaction
  - kiosk mode opens and exits cleanly
  - the simulated live feed keeps the scoreboard view feeling active without breaking layout
- Manual arrivals sanity check:
  - `docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json` writes successfully
  - `River Market North Stop`, `North Loop Stops`, and `UMKC Stops` each contain expected stop codes and arrival arrays
  - alerts remain present as an array even when empty
- Scope guardrail: no walkthrough should imply a real backend, auth, SMS provider, or production scheduling stack

## Test Scope

### Unit

- Tracker helpers: stop-group food matching, category classification, food filtering, arrival-group merging
- Dashboard helpers: ZIP enrichment, budget-share math, and simulated scoreboard/feed updates
- Scraper helpers: signage URL parsing, endpoint normalization, alert and stop payload shaping
- Source-data contract checks: required StreetCart keys and deck/demo assumptions
- Error handling: empty arrival arrays, missing food categories, stale-feed warnings, incomplete source JSON

### Integration

- Data boundaries: GTFS ingest, signage stop matching, OSM enrichment, and generated tracker dataset output
- Build boundaries: deck generation from `data/streetcart-kc.json`, tracker bundle generation from `data/kc-streetcar-tracker.json`
- State transitions: dashboard shell to live feed updates, ZIP switch to synchronized detail updates, kiosk toggle to condensed render

### End-to-End

- Primary dashboard flow: user lands on the dashboard, reads the winning team, checks a priority ZIP, and scans budget + pantry proof
- Critical edge flow: kiosk mode still exposes scoreboard + stats without the full dashboard chrome
- Static-proof rule: the current StreetCart proof remains a presentation artifact, not a production application

## Requirement-to-Test Mapping

| Active requirement | Test level | Current command |
|---|---|---|
| Tracker data classifies and sorts food access correctly | Unit | `npm run test:tracker` |
| Dashboard data enrichment and simulation logic stay correct | Unit | `npm run test:dashboard` |
| Live-arrival scraper normalizes signage data correctly | Unit | `npm run test:arrivals` |
| Source StreetCart JSON still satisfies the site/deck contract | Unit | `npm run test:streetcart` |
| Multi-page bundle still builds successfully | Integration | `npm run build` |

## Test Data and Fixtures

- Required fixtures: signage endpoint samples, Firebase stop payload samples, GTFS-derived stop geometry, curated pantry supplement, StreetCart source JSON
- Synthetic data needs: empty arrival lists, invalid signage URLs, food resources outside the radius threshold, incomplete source-data objects
- Cleanup strategy: generated artifacts are deterministic and should be regenerated from scripts instead of hand-editing outputs

## Release Verification Checklist

- [ ] All new or changed behavior covered by tests
- [ ] Regression tests pass
- [ ] No flaky tests introduced
- [ ] `npm run build` passes
- [ ] Tracker data and live-arrivals snapshots were refreshed if the change depended on them
- [ ] Manual review covered the affected page or artifact
- [ ] Public-facing artifacts still avoid implying unsupported production workflows
- [ ] Risk summary written
