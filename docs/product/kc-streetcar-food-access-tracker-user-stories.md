# User Stories: StreetCart KC Architect Proof

Date: 2026-03-28  
Audience: developer handoff  
Path note: filename retained for continuity, but these stories now describe the StreetCart architect proof inside the final Oracle, Muse, and Architect package

## Epic 1: Judge-facing shell

### US-1

As a judge, I want the page to explain StreetCart KC in one viewport so I understand the concept without narration.

Acceptance criteria:

- The hero states the thesis and pilot facts immediately
- Problem proof, alerts, and the scoreboard are visible without scrolling far
- The page reads like one coherent system, not a stack of unrelated widgets

### US-2

As a city or funder reviewer, I want the page to look trustworthy and civic so the concept feels fundable.

Acceptance criteria:

- The page uses the blue civic brand system consistently
- Panel hierarchy is strong and restrained
- The UI avoids startup or novelty styling

## Epic 2: Tournament scoreboard

### US-3

As a public viewer, I want to see who is winning the volunteer bracket so the product feels alive.

Acceptance criteria:

- Team rows are ordered by points
- Each row shows points, deliveries, households, and pounds
- The current leader is called out clearly

### US-4

As a demo viewer, I want the scoreboard and feed to update without manual refresh so the dashboard feels operational.

Acceptance criteria:

- A queued-event loop advances automatically
- The updated team gains points and delivery counts
- New feed items appear at the top of the live feed

## Epic 3: ZIP pressure board

### US-5

As a reviewer, I want to compare priority ZIPs quickly so I can see whether the pilot is targeting the right neighborhoods.

Acceptance criteria:

- ZIP tiles are ordered by priority first
- Each tile shows food insecurity, no-vehicle rate, route weight, and alert count
- Selecting a tile updates a single detail panel

### US-6

As a reviewer, I want the selected ZIP detail to show partner and route context so I can understand how StreetCart reaches that area.

Acceptance criteria:

- The detail panel shows harvest schedule, pantries, transit connectors, and closure markers
- Vote-zone and closure-heavy ZIPs remain easy to identify
- Empty states explain the gap rather than leaving blank panels

## Epic 4: Proof of feasibility

### US-7

As a funder, I want to see budget and KPI proof on the same page so I can judge renewal viability.

Acceptance criteria:

- The budget panel preserves the full $500K allocation
- KPI cards call out households, deliveries, pounds, and priority-ZIP share
- Cost-per-box context is visible

### US-8

As a reviewer, I want to inspect the pantry network and cold-chain constraints so the curveball response feels credible.

Acceptance criteria:

- Partner cards show languages, cold storage, ID rules, and capacity
- Cross-Lines, Guadalupe, Della Lamb, Harvesters, and El Centro are visible
- The panel is readable without expanding rows or opening modals

## Epic 5: Kiosk mode

### US-9

As a public-screen operator, I want a condensed kiosk layout so the page can act as a live scoreboard on a portrait display.

Acceptance criteria:

- Kiosk mode is one click away from the main dashboard
- The condensed view shows only scoreboard, summary stats, and CTA
- Kiosk mode can be exited without losing dashboard state
