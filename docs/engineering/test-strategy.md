# Test Strategy: StreetCart KC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Working stack: Repo not initialized yet. Recommended MVP stack for a thin Architect demo: Next.js, TypeScript, Postgres, and an SMS provider.

## Quality Gates

- Lint: `Not configured yet in repo. Target command after scaffold: npm run lint`
- Test: `Not configured yet in repo. Target command after scaffold: npm run test`
- Build: `Not configured yet in repo. Target command after scaffold: npm run build`

## Current Baseline Verification

- Live arrivals scraper unit tests: `npm run test:arrivals`
- Live arrivals reference refresh: `npm run arrivals:fetch`
- Deck rebuild: `npm run deck:build`
- Thin demo review: `npm run site:serve`
- Manual Architect walkthrough:
  - operator view loads with ZIPs, hubs, and KPI cards
  - resident language toggle works in English and Spanish
  - leaderboard view renders and keeps food-access outcomes ahead of team energy
- Manual arrivals sanity check:
  - `docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json` writes successfully
  - `River Market North Stop`, `North Loop Stops`, and `UMKC Stops` each contain expected stop codes and arrival arrays
  - alerts remain present as an array even when empty
- Scope guardrail: no walkthrough should imply a real backend, auth, SMS provider, or production scheduling stack

## Test Scope

### Unit

- Core business logic: ZIP priority scoring, hub selection, volunteer points, leaderboard ranking, resident service matching
- Validation rules: language fallback, event eligibility, stale-data banners, ZIP normalization, points verification
- Error handling: empty hub schedule, upstream sync failures, SMS delivery failures, unverified team submissions

### Integration

- Data boundaries: challenge API ingestion, normalization, cache refresh, and snapshot fallback
- Service boundaries: SMS provider send flow, outbound alert audit log, leaderboard updates, authenticated operator actions
- State transitions: draft hub to published hub, sync success to stale-data fallback, volunteer completion to verified points

### End-to-End

- Primary user flow: operator publishes a hub, resident receives service instructions, volunteer completion updates the leaderboard
- Critical edge flow: the pilot remains coherent when direct streetcar transport is unavailable and the system falls back to partner hub fulfillment
- Thin demo rule: the current competition proof stays limited to operator, resident, and leaderboard views until a real app scaffold exists

## Requirement-to-Test Mapping

| PRD criterion | Test level | Test case id |
|---|---|---|
| ZIP priorities and proposed hubs display with reasons | Integration | INT-001 |
| Resident gets valid pickup or delivery instructions | Unit + E2E | UNIT-004, E2E-001 |
| Operator can publish a hub and notify residents | Integration + E2E | INT-007, E2E-002 |
| Leaderboard updates only after verified completions | Unit + Integration | UNIT-009, INT-010 |

## Test Data and Fixtures

- Required fixtures: pantry dataset snapshot, supply alert snapshot, demographics for pilot ZIPs, sample hub schedules, resident search inputs, operator accounts, volunteer teams
- Synthetic data needs: mock SMS delivery receipts, invalid event windows, missing language support, stale snapshot timestamps, duplicate or fraudulent team completions
- Cleanup strategy: seed deterministic fixture data for local and preview environments and reset operator-created hubs, alerts, and leaderboard entries between test runs

## Release Verification Checklist

- [ ] All new or changed behavior covered by tests
- [ ] Regression tests pass
- [ ] No flaky tests introduced
- [ ] Live pilot ZIP data reviewed for freshness and obvious bad recommendations
- [ ] Every public-facing artifact still ties back to food access metrics and priority ZIPs
- [ ] Architect remains limited to operator, resident, and leaderboard proof only
- [ ] No artifact implies unsupported production workflows
- [ ] Risk summary written
