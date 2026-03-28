# PRD: KC Streetcar Food Access Tracker

Date: 2026-03-28  
Owner: Team Codex KC  
Build target: polished web app handoff for a senior frontend engineer

## Product Summary

Build a stop-first public web app that combines live KC Streetcar arrivals with nearby food access within 1.0 mile of each stop. The app should feel like civic infrastructure with Apple-level finish: immediate, calm, legible, and deliberate. It is not a transit planning suite or a map product. It is a single focused surface that answers two questions fast: "When is the next streetcar?" and "What food access options are near this stop?"

## User + JTBD

- Primary user: rider or nearby resident deciding whether to board now, wait, or make a quick stop first
- Secondary user: business owner, property manager, or community partner who wants a trustworthy public screen for customers, tenants, or visitors

Core JTBD:

> When I am near the KC Streetcar line and trying to decide my next move, help me see the next arrivals and nearby food access at a glance so I can act without opening multiple apps or deciphering transit data.

Supporting JTBD:

- When I host this on a lobby screen or counter display, help me show something polished and trustworthy so people immediately understand both service timing and nearby value.
- When live data fails, help me preserve confidence with a clear fallback instead of an empty or broken screen.

## Scope

In scope:

- Branded landing state with KC Streetcar visual language
- Stop rail ordered north to south
- Selected stop summary with live ETAs and occupancy
- Food access filters: all, pantry, grocery, farmers market, food retailer
- Alert and stale-feed handling
- Responsive desktop and mobile layouts

Out of scope:

- Maps
- Trip planning
- Accounts, favorites, or saved stops
- CMS or admin tooling
- Routing beyond the streetcar corridor

## Requirements

1. Initial load must render the branded shell immediately from bundled stop + food data, then hydrate live arrival data asynchronously from the public feed.
2. The first viewport on desktop must clearly show the hero, selected stop, live arrival module, and at least the beginning of the food module without hunting.
3. Selecting a stop must update stop summary, ETA cards, and food list in one interaction with no layout jump.
4. Filter changes must feel instant and preserve stop context.
5. The app must surface public service alerts when present and a readable stale/error state when the live feed fails.
6. Data sources must stay explicit: KC Streetcar arrivals feed, GTFS-derived stop geometry, OSM + curated pantry supplement.

## UX Quality Bar

- Read as civic transit software, not startup SaaS
- Use disciplined blue-on-white hierarchy with strong type contrast
- Keep motion subtle: 150-200ms for hover/selection, no ornamental animation
- Prefer fewer, stronger modules over dense dashboards
- Every visible state must look intentional: loading, live, empty, filtered, and failure

## Success Metrics

- A first-time visitor can identify the next arrival for the selected stop in under 3 seconds
- A first-time visitor can identify at least one nearby food-access option in under 5 seconds
- The page remains visually composed at 1440px desktop and 390px mobile widths
- Feed failure does not produce a blank or confusing state

## Delivery Notes

- Canonical route order should come from the signage endpoint list, not a single GTFS trip variant
- Static corridor/food data should be bundled at build time
- Live ETAs should poll client-side every 30 seconds
- Treat this as a single high-quality page, not a framework for future abstractions
