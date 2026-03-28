# PRD: StreetCart KC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Working stack: Repo not initialized yet. Recommended MVP stack for a thin Architect demo: Next.js, TypeScript, Postgres, and an SMS provider.

## Problem Statement

Kansas City does not only have too little food supply. It also has fragmented access. In the challenge data, ZIP 64130 shows 18.2% food insecurity and 38% no-vehicle access, while ZIP 66101 shows 24.1% food insecurity and 48% no-vehicle access. At the same time, TEFAP cuts created a 3-million-pound shortfall and recent store closures increased pressure on neighborhoods that were already underserved.

StreetCart KC responds with one city-native idea that can power all three competition tracks: treat the streetcar corridor as the public engagement and staging spine, use streetcar-adjacent hubs plus pantry partners to move food into priority ZIP codes, and drive volunteer turnout through a March Madness-style service competition that updates a live leaderboard.

## Goals

- Show a credible 60-day pilot that moves more food into priority ZIP codes using existing civic infrastructure instead of a brand-new logistics system.
- Give coordinators one operating view for ZIP priorities, hub schedules, volunteer assignments, and verified service metrics.
- Turn community participation into an engagement engine through a sports-style tournament, public leaderboard, and renewal-phase streetcar wrap prize.

## Non-Goals

- Building a full inventory management suite for every pantry partner
- Running direct payment assistance, grocery commerce, or benefits enrollment workflows
- Requiring direct food transport on streetcar vehicles in phase one

## Users and Context

- Primary user: city food access lead or nonprofit coordinator managing scarce supply, partner agencies, and public accountability
- Secondary user: resident in a high-need ZIP code who needs predictable access to a pickup hub or delivery option
- Tertiary user: volunteer teams, schools, fan groups, and churches participating in the service tournament
- Key usage context: rapidly changing supply conditions, need for visible public momentum, low-bandwidth resident communication, and tight event time constraints

## Requirements

### Functional

1. Ingest and normalize challenge data for pantries, supply alerts, store closures, demographics, and ZIP priority signals.
2. Rank pilot ZIP codes and recommend three to four streetcar-adjacent hub windows or partner staging points for the first 60-day pilot.
3. Let operators schedule hub events, assign partner agencies, and define which households or ZIPs each event serves.
4. Let residents receive simple pickup or delivery instructions in English or Spanish, including where to go, when to show up, and what requirements apply.
5. Track volunteer teams, verified delivery or hub-shift completions, and a public leaderboard that updates the bracket.
6. Expose a simple scoreboard or leaderboard view suitable for mock streetcar signage, social sharing, and judge demos.
7. Support a curveball-response mode that can switch the package into community-vote or produce-surge messaging without changing the core hub model.

### Non-Functional

1. Performance: operators should be able to load the pilot dashboard and resident lookup in under 2 seconds for cached pilot data.
2. Reliability: if upstream data is unavailable, the product should fall back to the last successful sync and show a stale-data banner.
3. Accessibility: resident and public leaderboard views must work on low-end mobile devices and meet WCAG 2.2 AA expectations for the web experience.
4. Security: collect only minimal contact data, separate operator access from public views, and log all outbound alert actions.

## Acceptance Criteria

1. Given an operator opens the dashboard after the daily sync, when they view pilot ZIP priorities, then the top ZIPs are ranked with visible reasons pulled from challenge data and linked to proposed hub windows.
2. Given a coordinator schedules a streetcar-adjacent hub or partner event, when they publish it, then residents in the selected ZIPs can see or receive the event details in their chosen language.
3. Given a volunteer team completes verified deliveries or hub shifts, when the completion is recorded, then the public leaderboard updates without exposing resident-sensitive details.
4. Given a judge views the demo, when they step through the coordinator, resident, and leaderboard views, then they can understand how the same system supports Oracle, Muse, and Architect.
5. Given the challenge shifts into resident-vote or perishables-surplus conditions, when the package switches to curveball mode, then the response still reads as the same partner-supported, pickup-first pilot rather than a bolt-on idea.

## UX Notes

- Key user flow: coordinator picks a priority ZIP and hub, residents receive pickup guidance, volunteers record completions, leaderboard updates
- Empty and error states: if a hub is full or a ZIP has no nearby option, the system should show the next partner option and a hotline fallback instead of a dead end
- Analytics events: `hub_created`, `resident_notified`, `pickup_confirmed`, `delivery_verified`, `leaderboard_updated`, `team_points_awarded`
- Curveball packaging rule: community-vote outreach should be Spanish-first in `66101` and `66105`, while produce-surge timing should be described as a `48-hour` window rather than locked weekday/date copy

## Rollout and Measurement

- Rollout strategy: pilot four hubs serving five high-need ZIP codes first: River Market Exchange Hub, Union Station Civic Hub, Guadalupe Family Hub, and Cross-Lines Connector Hub; onboard a small set of agencies before broader launch
- Phase 2 expansion: use KC's free bus network to extend reach beyond the streetcar corridor without changing the streetcar-led brand or operating spine
- Success metric: 1,800+ unique households reached and 3,200+ completed service events in 60 days, with at least 70% of volume tied to priority ZIP codes and at least 50 volunteer teams activated
- Guardrail metric: fewer than 10% failed pickups or missed windows, fewer than 5% stale event details, zero storage of sensitive household financial data

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| The concept feels gimmicky instead of operational | Judges dismiss the bracket as marketing fluff | Anchor every slide and screen in households served, priority ZIPs, and verified completions |
| Direct use of streetcar vehicles is not approved in 60 days | Feasibility questions stall the pitch | Frame phase one as streetcar-adjacent hubs plus partner fulfillment, not full transit retrofitting |
| Partner staff do not update event or capacity data | Dashboard becomes informational instead of operational | Limit pilot to a small set of committed agencies and support manual override workflows |
| Scope expands into a citywide delivery network | 60-day pilot slips | Keep v1 focused on hubs, alerts, leaderboard, and proof of demand |
