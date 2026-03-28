# PRD: BridgeKC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Working stack: Repo not initialized yet. Recommended MVP stack: Next.js, TypeScript, Postgres, and an SMS provider.

## Problem Statement

Kansas City does not only have too little food supply. It also has fragmented access. In the challenge data, ZIP 64130 shows 18.2% food insecurity and 38% no-vehicle access, while ZIP 66101 shows 24.1% food insecurity and 48% no-vehicle access. At the same time, TEFAP cuts created a 3-million-pound shortfall and recent store closures increased pressure on neighborhoods that were already underserved.

Families need a no-wrong-door way to find a workable food option quickly. Coordinators need a lightweight operations layer that turns distress signals into targeted outreach and smarter distribution.

## Goals

- Help residents in pilot ZIP codes find a food resource they can actually use based on language, hours, ID requirements, and travel constraints.
- Give coordinators a single place to prioritize ZIP codes, publish pop-up resources, and send targeted alerts within minutes instead of days.
- Produce a 60-day pilot demo with measurable usage, not a speculative concept.

## Non-Goals

- Building a full inventory management suite for every pantry partner
- Running direct payment assistance, grocery commerce, or benefits enrollment workflows

## Users and Context

- Primary user: resident in a high-need ZIP code who needs food assistance today and may have no car, limited English proficiency, or low trust in formal systems
- Secondary user: city food access lead or nonprofit coordinator managing outreach and limited supply
- Key usage context: mobile-first, low-bandwidth, bilingual, rapidly changing supply conditions, high need for trust and clarity

## Requirements

### Functional

1. Ingest and normalize challenge data for pantries, supply alerts, store closures, demographics, and priority ZIP signals.
2. Rank pilot ZIP codes based on current need so operators can focus outreach and supply where it matters most.
3. Let residents search by ZIP and simple constraints such as language, no-car status, ID availability, and desired service time.
4. Return the top 1-3 best-fit food resources with clear explanations: address, hours, language support, ID requirement, and why the match was chosen.
5. Let operators create and publish targeted alerts or pop-up events to selected ZIP codes and language audiences.
6. Track basic outcomes such as search started, match delivered, alert sent, click-through, and partner-confirmed pickup.

### Non-Functional

1. Performance: resident lookup should return results in under 2 seconds for cached pilot data.
2. Reliability: if upstream data is unavailable, the product should fall back to the last successful sync and show a stale-data banner.
3. Accessibility: resident flow must work on low-end mobile devices and meet WCAG 2.2 AA expectations for the web experience.
4. Security: collect only minimal contact data, separate operator access from resident access, and log all outbound alert actions.

## Acceptance Criteria

1. Given an operator opens the dashboard after the daily sync, when they view pilot ZIP priorities, then the top ZIPs are ranked with visible reasons pulled from challenge data and latest alerts.
2. Given a resident in ZIP 64130 enters English or Spanish and indicates limited transportation, when they request help, then they receive up to three eligible resources that exclude mismatched hours, language, or ID barriers.
3. Given a coordinator creates a pop-up event for a critical ZIP, when they publish it, then subscribed residents in that ZIP receive the alert in their chosen language and the event appears in the resident experience.
4. Given a partner later confirms or rejects a referral outcome, when the result is recorded, then the dashboard metrics update without exposing resident-sensitive details.

## UX Notes

- Key user flow: resident enters ZIP, language, and constraints; system returns a short ranked list; resident can save or text themselves details
- Empty and error states: no-match flow should explain why, offer broader nearby options, and surface a phone contact instead of a dead end
- Analytics events: `resident_search_started`, `resident_match_returned`, `resource_clicked`, `alert_published`, `alert_delivered`, `pickup_confirmed`

## Rollout and Measurement

- Rollout strategy: pilot five ZIP codes first: 64130, 64127, 66101, 66105, and 64132; onboard a small set of agencies before broader launch
- Success metric: 500 resident matches delivered in 60 days with at least 65% partner-confirmed or resident-confirmed successful resource use
- Guardrail metric: fewer than 5% stale or invalid recommendations, fewer than 2% outbound alert opt-outs, zero storage of sensitive household financial data

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Pantry hours or eligibility data becomes stale | Residents lose trust after failed trips | Require visible freshness timestamps and a coordinator review flow before outbound alerts |
| Partner staff do not update event or capacity data | Dashboard becomes informational instead of operational | Limit pilot to a small set of committed agencies and support manual override workflows |
| Residents do not trust a new tool | Low adoption despite real need | Use SMS, Spanish support, partner flyers, and agency-branded outreach instead of app-only distribution |
| Scope expands into delivery or case management | 60-day pilot slips | Keep v1 focused on matching, alerting, and outcomes only |
