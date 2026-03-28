# Test Strategy: StreetCart KC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Current runtime: Vite multi-page frontend, React tracker page, Node-based data/build scripts
Future-state app stack: `Next.js`, `TypeScript`, `Postgres`, and an SMS provider remain deferred

## Quality Gates

- Lint: `Not configured yet`
- Test: `npm run test`
- Build: `npm run build`
- Preview: `npm run preview`

## Current Baseline Verification

- Live arrivals scraper unit tests: `npm run test:arrivals`
- StreetCart source-data contract tests: `npm run test:streetcart`
- Tracker helper tests: `npm run test:tracker`
- Combined regression check: `npm run test`
- Live arrivals reference refresh: `npm run arrivals:fetch`
- Tracker dataset rebuild: `npm run tracker:data`
- Deck rebuild: `npm run deck:build`
- Local multi-page app review: `npm run dev` or `npm run preview`
- Manual static-site walkthrough:
  - `index.html` loads the StreetCart proof with no missing assets
  - core KPIs, partner sections, and proof framing remain legible
- Manual tracker walkthrough:
  - `tracker.html` loads with a selected stop, stop rail, arrivals panel, and food-access panel
  - stop switching updates the summary, arrivals, and food cards together
  - filter changes preserve the selected stop and only change the visible food set
  - live-feed failure preserves the shell and shows a readable warning
- Manual arrivals sanity check:
  - `docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json` writes successfully
  - `River Market North Stop`, `North Loop Stops`, and `UMKC Stops` each contain expected stop codes and arrival arrays
  - alerts remain present as an array even when empty
- Scope guardrail: no walkthrough should imply a real backend, auth, SMS provider, or production scheduling stack

## Test Scope

### Unit

- Tracker helpers: stop-group food matching, category classification, food filtering, arrival-group merging
- Scraper helpers: signage URL parsing, endpoint normalization, alert and stop payload shaping
- Source-data contract checks: required StreetCart keys and deck/demo assumptions
- Error handling: empty arrival arrays, missing food categories, stale-feed warnings, incomplete source JSON

### Integration

- Data boundaries: GTFS ingest, signage stop matching, OSM enrichment, and generated tracker dataset output
- Build boundaries: deck generation from `data/streetcart-kc.json`, tracker bundle generation from `data/kc-streetcar-tracker.json`
- State transitions: tracker shell to live-hydrated state, live success to stale-data warning, stop switch to synchronized UI update

### End-to-End

- Primary tracker flow: user lands on the tracker, reads the current stop, checks the next arrivals, and scans nearby food options
- Critical edge flow: the tracker remains useful when live arrivals fail and falls back to the static stop + food shell
- Static-proof rule: the current StreetCart proof remains a presentation artifact, not a production application

## Requirement-to-Test Mapping

| Active requirement | Test level | Current command |
|---|---|---|
| Tracker data classifies and sorts food access correctly | Unit | `npm run test:tracker` |
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
