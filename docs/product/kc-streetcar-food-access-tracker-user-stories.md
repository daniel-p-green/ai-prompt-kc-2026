# User Stories: KC Streetcar Food Access Tracker

Date: 2026-03-28  
Audience: developer handoff

## Epic 1: Public tracker shell

### US-1

As a rider, I want the page to load with a clear selected stop and visible route context so I can understand the surface immediately.

Acceptance criteria:

- The initial page shows the hero, route rail, selected stop, and main content panels without waiting for live data
- The default selected stop is the first stop in canonical route order
- Desktop and mobile both keep the selected stop obvious

### US-2

As a visitor, I want the page to look like a polished KC Streetcar product so I trust the information before reading details.

Acceptance criteria:

- The page uses the approved blue/navy visual system and high-contrast white panels
- Type hierarchy clearly separates hero, section, and card content
- Loading, empty, and live states all look intentional

## Epic 2: Live arrivals

### US-3

As a rider, I want live ETAs for the selected stop so I know whether to board now or wait.

Acceptance criteria:

- The selected stop shows one or two direction cards depending on the stop group
- Each direction card shows the next countdown prominently
- Secondary predictions show time, headsign, and occupancy when present

### US-4

As a user, I want the page to refresh live arrivals automatically so I do not need to reload the page manually.

Acceptance criteria:

- The app polls the public feed every 30 seconds
- The visible `last updated` indicator changes when a new poll succeeds
- Failed polls do not wipe already-rendered static content

### US-5

As a user, I want service alerts or feed failures communicated clearly so I know when to trust or question the live numbers.

Acceptance criteria:

- Public alerts render in a distinct alert module when present
- Feed failure renders a readable warning while preserving the rest of the page
- The warning does not block stop switching or food browsing

## Epic 3: Stop navigation

### US-6

As a user, I want to switch stops from a route rail so I can compare nearby conditions without losing my place.

Acceptance criteria:

- The rail is ordered north to south using the official signage stop order
- Clicking a stop updates summary, arrivals, and food cards in one pass
- The selected stop state is visually persistent and obvious

### US-7

As a business owner or lobby host, I want the route rail to summarize the next ETAs and nearby food count for each stop so the page works well as a passive public display.

Acceptance criteria:

- Each stop card shows stop name, compact ETA summary, and nearby place count
- Dense rail states remain legible on desktop
- The rail does not visually overpower the main selected-stop content

## Epic 4: Food access discovery

### US-8

As a rider, I want nearby food places grouped around the selected stop so I can decide whether I have time to grab groceries, find a pantry, or visit a market.

Acceptance criteria:

- Food results are limited to 1.0 mile from the stop centroid
- Each card shows category, distance, name, address fallback, and source
- The selected stop summary includes visible counts by category

### US-9

As a user, I want to filter by pantry, grocery, farmers market, and food retailer so I can narrow to the kind of place I need right now.

Acceptance criteria:

- Filter changes update the visible card set without changing the selected stop
- Active filter styling is obvious
- Zero-result filters show a calm empty state

## Epic 5: Data pipeline

### US-10

As a developer, I want the corridor dataset generated from explicit sources so the app can be rebuilt reliably without hand-editing stop data.

Acceptance criteria:

- A build script generates the stop + food dataset from GTFS, the official signage reference, OSM, and curated pantry data
- Stop matching uses all route trips to resolve direction-specific GTFS stops
- The generated dataset is suitable for bundling directly into the app
