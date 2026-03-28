# PRD: StreetCart KC Architect Proof

Date: 2026-03-28  
Owner: AICodex  
Path note: this file keeps its old filename for repo stability, but the active product brief is now the StreetCart KC architect proof inside the final Oracle, Muse, and Architect package

## Product Summary

Build a single web dashboard that proves StreetCart KC can operate as a real 60-day pilot. This is the architect surface inside the final StreetCart KC package. The page must serve three audiences at once:

- judges who need the whole concept in under two minutes
- city and funder reviewers who need budget and KPI proof
- live audiences who need a focused, high-contrast presentation view

This product is not the older stop-level streetcar arrival tracker. It is the architect proof inside the final StreetCart submission set.

## Users + JTBD

- Judge: "Show me the concept working without a long explanation."
- City lead: "Show me budget, ZIP targeting, partner coverage, and renewal logic."
- Public viewer: "Show me who is winning and what the program has moved this week."

Core JTBD:

> When I need to evaluate StreetCart KC quickly, help me see the operating loop, the pressure zones, and the proof metrics in one page so I can trust the concept as a real pilot.

## Scope

In scope:

- hero with StreetCart thesis and pilot facts
- alert banner
- tournament scoreboard
- ZIP heat board with selectable detail
- live feed
- KPI cards
- budget tracker
- pantry network
- presentation mode

Out of scope:

- real backend APIs
- map SDKs
- account systems
- resident signup or volunteer flows
- long-term app scaffolding

## Functional Requirements

1. The dashboard must render from bundled repo data with no network dependency.
2. The scoreboard must show ordered team standings and update from simulated queued events.
3. ZIP selection must update detail state in one interaction.
4. Presentation mode must reduce the surface to scoreboard, stats, and CTA.
5. The supply-alert banner must preserve the post-curveball context.
6. Budget and pantry panels must remain visible and legible on desktop.

## Quality Bar

- Feels like civic operations software
- Strong route-like structure, not generic cards everywhere
- Short, declarative copy
- Data-heavy without becoming cluttered
- Clear enough for a live deadline demo

## Verification

- `npm run test`
- `npm run build`
- browser check on `tracker.html`
