# Test Strategy: BridgeKC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Working stack: Repo not initialized yet. Recommended MVP stack: Next.js, TypeScript, Postgres, and an SMS provider.

## Quality Gates

- Lint: `Not configured yet in repo. Target command after scaffold: npm run lint`
- Test: `Not configured yet in repo. Target command after scaffold: npm run test`
- Build: `Not configured yet in repo. Target command after scaffold: npm run build`

## Test Scope

### Unit

- Core business logic: ZIP priority scoring, pantry eligibility filtering, resident match ranking, alert audience selection
- Validation rules: language fallback, ID-required filtering, stale-data banners, ZIP normalization
- Error handling: empty results, upstream sync failures, SMS delivery failures

### Integration

- Data boundaries: challenge API ingestion, normalization, cache refresh, and snapshot fallback
- Service boundaries: SMS provider send flow, outbound alert audit log, authenticated operator actions
- State transitions: draft alert to published alert, sync success to stale-data fallback, resident match to outcome confirmation

### End-to-End

- Primary user flow: resident gets a valid resource recommendation in English or Spanish from a mobile device
- Critical edge flow: operator publishes a new ZIP-targeted alert after a supply shock and sees it appear in the resident experience

## Requirement-to-Test Mapping

| PRD criterion | Test level | Test case id |
|---|---|---|
| ZIP priorities display with reasons | Integration | INT-001 |
| Resident gets best-fit resource matches | Unit + E2E | UNIT-004, E2E-001 |
| Operator can publish a targeted alert | Integration + E2E | INT-007, E2E-002 |
| Metrics update after referral outcome changes | Integration | INT-010 |

## Test Data and Fixtures

- Required fixtures: pantry dataset snapshot, supply alert snapshot, demographics for pilot ZIPs, resident search inputs, operator accounts
- Synthetic data needs: mock SMS delivery receipts, invalid pantry hours, missing language support, stale snapshot timestamps
- Cleanup strategy: seed deterministic fixture data for local and preview environments and reset operator-created alerts between test runs

## Release Verification Checklist

- [ ] All new or changed behavior covered by tests
- [ ] Regression tests pass
- [ ] No flaky tests introduced
- [ ] Live pilot ZIP data reviewed for freshness and obvious bad recommendations
- [ ] Risk summary written
