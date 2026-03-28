# KC Streetcar Food Access Tracker Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static proof site with a real React-based KC Streetcar tracker that shows live arrivals and nearby food access within 1 mile of each stop group.

**Architecture:** Use a stop-centric React app rather than a map-first app. Keep arrivals live in the client by polling the public Firebase-backed KC Streetcar signage feed, and generate a local reference dataset for stop geometry plus nearby food access using official KCATA GTFS stop coordinates, public OSM food-location data, and a small curated pantry supplement from documented StreetCart partners.

**Tech Stack:** React, React DOM, Vite, Node.js build scripts, official KCATA GTFS static feed, KC Streetcar Firebase arrival feed, public OSM Overpass API, existing repo docs and data files.

---

## Assumptions

- A stop-centric tracker is the right default for this repo because it keeps the live-arrivals view fast and legible on mobile and desktop.
- Live arrivals should stay live in the browser; food-access data can be generated offline and committed because it changes more slowly.
- The KC Streetcar brand adaptation should use the official homepage blues and visual feel, not a pixel-for-pixel clone of the WordPress site.

## Open Questions

- OSM pantry coverage near the route is incomplete, so the pantry layer will mix public map data with curated pantry partners already named in repo docs.
- The tracker will show real-time arrivals, not moving vehicle positions, unless a reliable public vehicle-position feed is added later.

### Task 1: Write failing tests for the tracker data helpers

**Files:**
- Create: `src/lib/tracker.test.mjs`
- Create: `src/lib/tracker.js`

**Step 1: Write the failing test**

- Assert that food locations are classified into `pantry`, `grocery`, `farmers_market`, and `food_retailer`.
- Assert that stop-group food matching only includes resources within 1.0 mile and sorts them by distance.
- Assert that arrival groups merge into stop groups by stop code without mutating unrelated data.

**Step 2: Run test to verify it fails**

Run: `node --test src/lib/tracker.test.mjs`

Expected: FAIL because the tracker helper module does not exist yet.

### Task 2: Build the tracker data pipeline

**Files:**
- Create: `scripts/build_streetcar_tracker_data.mjs`
- Create: `data/kc-streetcar-tracker.json`

**Step 1: Write minimal implementation**

- Download or read the official KCATA GTFS feed and isolate route `601`.
- Match GTFS stop geometry to KC Streetcar signage stop groups.
- Fetch corridor-wide food locations from public OSM data and merge curated pantry partners.
- Write normalized stop-group data with nearby food resources and route metadata.

**Step 2: Run targeted verification**

Run: `node scripts/build_streetcar_tracker_data.mjs`

Expected: `data/kc-streetcar-tracker.json` is written and includes stop groups, coordinates, and 1-mile nearby food access.

### Task 3: Build the React app and verify it

**Files:**
- Modify: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Modify: `package.json`

**Step 1: Build the app**

- Add React + Vite.
- Load tracker data and live arrivals in parallel.
- Poll live arrivals on an interval.
- Provide stop selection, category filters, and a route strip that follows KC Streetcar branding.

**Step 2: Verify**

Run:
- `node --test src/lib/tracker.test.mjs`
- `npm run build`
- Local browser check of the live tracker

Expected:
- Tests pass.
- Vite build succeeds.
- Browser shows live arrivals and nearby food-access cards for the selected stop group.
