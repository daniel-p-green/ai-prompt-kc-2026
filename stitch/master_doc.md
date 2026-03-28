# MASTER DOC
# KC Streetcar Food Access Tracker

Date: 2026-03-28  
Audience: senior developer handoff  
Purpose: one document that defines what to build, how polished it must feel, and how to break the work into shippable slices

---

## 1. Product In One Paragraph

Build a stop-first public web app for the KC Streetcar that combines live arrival times with nearby food access within 1.0 mile of each stop. This is not a map product, a trip planner, or a transit admin tool. It is one highly polished public-facing page that answers two questions fast: when is the next streetcar, and what food access options are near this stop right now?

The app should feel like civic infrastructure with Apple-level finish: calm, precise, deliberate, and highly legible. It should look expensive in craft, not flashy in styling.

---

## 2. Users + JTBD

### Primary users

- Rider or nearby resident deciding whether to board now, wait, or make a quick stop first
- Business owner, property manager, or lobby host who wants a trustworthy public display for customers or tenants

### Core JTBD

> When I am near the KC Streetcar line and trying to decide my next move, help me see the next arrivals and nearby food access at a glance so I can act without opening multiple apps or decoding transit data.

### Supporting JTBD

- When I host this on a public screen, help me show something polished and trustworthy so people understand both timing and nearby value immediately.
- When live data fails, help me preserve confidence with a clear fallback instead of an empty or broken page.

---

## 3. Scope

### In scope

- Branded hero/header using KC Streetcar visual language
- Stop rail ordered north to south
- Selected stop summary
- Live ETA cards with occupancy where available
- Food access list within 1.0 mile of selected stop
- Filters: all, pantry, grocery, farmers market, food retailer
- Public alerts and stale/live-feed warning state
- Responsive desktop and mobile layout

### Out of scope

- Maps
- Accounts or saved stops
- Trip planning or route combinations
- CMS/admin tooling
- Backend rewrite
- Expansion beyond the current corridor tracker

---

## 4. Non-Negotiable Product Principles

1. Stop-first, not map-first.
2. The first viewport must explain itself.
3. Live ETAs and food access must feel like one product, not two stitched widgets.
4. The page must stay useful even if live polling fails.
5. Every visual state must look intentional: loading, live, empty, filtered, alert, and failure.
6. Prefer restraint over feature volume.

---

## 5. Functional Requirements

1. The app must render immediately from bundled stop + food data.
2. Live ETAs must hydrate asynchronously from the public KC Streetcar feed.
3. Live ETAs must poll every 30 seconds.
4. Selecting a stop must update summary, ETA cards, and food cards in one interaction.
5. Filter changes must update food cards without changing the selected stop.
6. The app must show public service alerts when present.
7. If the live feed fails, the app must keep the static shell and show a readable warning.
8. Data sources must remain explicit:
   - public KC Streetcar arrivals feed
   - GTFS-derived stop geometry
   - OSM + curated pantry supplement

---

## 6. UX + Performance Requirements

- Initial shell should feel immediate, with no blank-screen wait for live data.
- On desktop, the first viewport should clearly show:
  - hero
  - route rail
  - selected stop summary
  - live arrivals module
  - at least the start of the food-access module
- Stop changes and filter changes should feel instant.
- The page should remain visually composed at:
  - desktop: `1440px+`
  - mobile: `390px`
- Feed failure should never collapse the whole page into an error wall.

Success heuristics:

- User can find next arrival in under 3 seconds.
- User can find at least one nearby food option in under 5 seconds.

---

## 7. Brand Thesis

The interface should make Kansas City transit feel calm, precise, and trustworthy. The user should feel like the app already knows the one decision they need to make next and is presenting it without noise.

This should feel as polished as a premium Apple page, but not luxurious, playful, or brand-performative. The right read is: public infrastructure with obsessive craft.

### Tone

- Civic
- Modern
- Confident
- Human
- Useful first, elegant second

### Anti-patterns

- Generic transit dashboard
- Glassmorphism
- Busy map-heavy UI
- Startup SaaS styling
- Overuse of pills, stickers, or decorative ornaments
- Purple gradients

---

## 8. Visual System

### Color tokens

- `--brand-blue: #0081C6`
- `--brand-navy: #004987`
- `--route-blue: #0693E3`
- `--surface: #FFFFFF`
- `--surface-muted: #F7FBFE`
- `--ink-strong: #0E3558`
- `--ink: #4D6985`
- `--line: rgba(18, 50, 77, 0.08)`
- `--warning: #F3B72F`
- `--error: #C2410C`
- `--success-bg: #E5F7EF`
- `--success-ink: #0F6B43`

Rules:

- Hero and route rail use blue/navy.
- Main panels stay white.
- Color directs attention; it does not decorate everything.

### Typography

Recommended feel:

- Headings: geometric, assertive, transit-signage energy
- Body: clean, neutral, readable

Recommended stack:

- Headings: `Avenir Next`, `Inter`, `Segoe UI`, sans-serif
- Body: `Avenir Next`, `Open Sans`, `Segoe UI`, sans-serif

Type scale:

- Hero title: `56-72px`, bold, `0.94-1.0` line height
- Section heading: `30-36px`, bold
- Panel heading: `22-26px`
- Card heading: `18-20px`
- Body: `16-18px`, `1.5-1.65`
- Labels: `11-12px`, uppercase, `0.1-0.14em` tracking

### Spacing + geometry

- Max content width: `1440-1480px`
- Outer padding: `24px`
- Major gaps: `18px`
- Main radius: `22-28px`
- Secondary radius: `16-22px`

### Motion

- Hover/selection: `150-180ms`
- Panel/filter transitions: `180-220ms`
- No bounce, no parallax, no showy reveal choreography

---

## 9. Component Rules

### Hero

- One strong blue band
- Strong title
- One-sentence utility statement
- Two clear actions
- Right-side stat stack on desktop
- Must still feel composed when wrapped on mobile

### Route rail

- Ordered north to south
- Each stop card shows:
  - order number
  - stop name
  - compact live ETA summary
  - nearby food count
- Selected state must be obvious without harsh contrast tricks
- Rail should feel like a transit object, not a sidebar from admin software

### Selected stop summary

- Show stop name first
- Show exact stop label beneath
- Show two small badges:
  - nearby places count
  - last live update

### Arrival cards

- Lead with direction and next countdown
- Show next 2-3 predictions cleanly
- Occupancy badges should feel soft and readable
- Empty state must be calm and explicit

### Food cards

- Lead with category and distance
- Name prominent
- Address/source secondary
- Grid should feel airy, not dense

### Filters

- Short labels only
- Clear active state
- No clever segmented control if it weakens readability

### Alerts and failures

- Alerts use warning yellow as an accent
- Failures should preserve the rest of the page
- Never render a full-page error wall unless the app cannot render at all

---

## 10. Copy Rules

Write like public service software:

- Declarative
- Helpful
- Confident
- Never cute

Good examples:

- `Next streetcars`
- `Walkable and short-hop options`
- `Updated 1:06 PM`
- `No current prediction for this direction.`

Avoid:

- marketing slogans
- startup jargon
- transit jargon without translation
- over-explaining obvious UI

---

## 11. Data + Technical Constraints

1. Canonical route order comes from the official signage endpoint list, not one GTFS trip variant.
2. GTFS is used for geometry matching and stop centroids.
3. Static corridor + food data should be generated at build time and bundled into the app.
4. Live ETAs should be polled client-side every 30 seconds from the public feed.
5. Treat this as one high-quality page, not a framework for future abstractions.

---

## 12. User Stories

### Epic A: Public tracker shell

**US-1**  
As a rider, I want the page to load with a clear selected stop and visible route context so I can understand the surface immediately.

Acceptance criteria:

- Initial page shows hero, route rail, selected stop, and main panels without waiting for live data
- Default selected stop is first stop in canonical route order
- Desktop and mobile both keep the selected stop obvious

**US-2**  
As a visitor, I want the page to look like a polished KC Streetcar product so I trust the information before reading details.

Acceptance criteria:

- Blue/navy visual system with high-contrast white panels
- Clear type hierarchy
- Loading, empty, and live states all feel intentional

### Epic B: Live arrivals

**US-3**  
As a rider, I want live ETAs for the selected stop so I know whether to board now or wait.

Acceptance criteria:

- One or two direction cards depending on stop group
- Next countdown is visually dominant
- Secondary predictions show time, headsign, and occupancy when present

**US-4**  
As a user, I want the page to refresh live arrivals automatically so I do not need to reload manually.

Acceptance criteria:

- Poll every 30 seconds
- `Last updated` changes on successful refresh
- Failed polls do not wipe the static shell

**US-5**  
As a user, I want service alerts or feed failures communicated clearly so I know when to trust or question the live numbers.

Acceptance criteria:

- Public alerts render when present
- Feed failure warning preserves the rest of the page
- Warning does not block stop switching or food browsing

### Epic C: Stop navigation

**US-6**  
As a user, I want to switch stops from a route rail so I can compare nearby conditions without losing my place.

Acceptance criteria:

- Rail ordered north to south
- Clicking a stop updates summary, arrivals, and food cards in one pass
- Selected stop state remains obvious

**US-7**  
As a business owner or lobby host, I want the route rail to summarize ETAs and nearby food count for each stop so the page works as a passive public display.

Acceptance criteria:

- Each stop card shows stop name, compact ETA summary, and nearby food count
- Dense rail remains legible on desktop
- Rail does not overpower selected-stop content

### Epic D: Food access discovery

**US-8**  
As a rider, I want nearby food places grouped around the selected stop so I can decide whether I have time to grab groceries, find a pantry, or visit a market.

Acceptance criteria:

- Results limited to 1.0 mile from stop centroid
- Each card shows category, distance, name, address fallback, and source
- Selected stop summary shows visible counts by category

**US-9**  
As a user, I want to filter by pantry, grocery, farmers market, and food retailer so I can narrow to what I need right now.

Acceptance criteria:

- Filter changes update visible cards without changing selected stop
- Active state is obvious
- Zero-result filters show a calm empty state

### Epic E: Data pipeline

**US-10**  
As a developer, I want the corridor dataset generated from explicit sources so the app can be rebuilt reliably without hand-editing stop data.

Acceptance criteria:

- Build script generates stop + food dataset from GTFS, signage reference, OSM, and curated pantry data
- Stop matching uses all route trips, not a single representative trip
- Generated dataset is suitable for direct app bundling

---

## 13. Recommended Build Order

1. Static shell and layout
2. Route rail + selected stop state
3. Bundled dataset integration
4. Live ETA polling
5. Food filters
6. Alerts/failure states
7. Mobile polish
8. Final visual QA against this doc

---

## 14. Final QA Standard

Do not call this done if any of the following are true:

- first viewport looks generic or busy
- route rail feels like admin software
- stop or filter changes cause jumpy reflow
- empty states look accidental
- mobile feels stacked and cluttered
- page is technically correct but aesthetically weak

If the build meets the functional requirements but misses the visual bar, it is not done.
