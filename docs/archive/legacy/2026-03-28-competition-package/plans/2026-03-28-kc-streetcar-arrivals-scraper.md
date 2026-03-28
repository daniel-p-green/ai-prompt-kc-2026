# KC Streetcar Arrivals Scraper Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a small Node-based scraper that converts KC Streetcar signage URLs into structured live-arrival JSON using the public Firebase backend.

**Architecture:** Keep the implementation as one script with a few exported pure helpers so it can run as a CLI and still support unit tests. Read the published endpoint list from the existing reference JSON, parse stop codes from each signage URL, fetch the public `stops`, `alerts`, and `byStop/*` Firebase paths, and write one normalized JSON snapshot.

**Tech Stack:** Node.js built-ins (`fs`, `path`, `assert`, `node:test`), existing repo JSON reference files, live KC Streetcar Firebase Realtime Database.

---

## Assumptions

- The Firebase Realtime Database backing the public signage site remains anonymously readable.
- A checked-in live snapshot is useful as reference evidence, but the script is the source of truth because arrival times change continuously.
- The repo should stay lightweight and avoid adding new scraping dependencies.

## Open Questions

- If the Streetcar team locks down Firebase access later, the scraper will need a new source or authenticated access path.
- If we later need CSV or app ingestion, we should add a second formatter instead of changing the normalized JSON shape.

### Task 1: Write the failing parser and normalizer tests

**Files:**
- Create: `scripts/fetch_kc_streetcar_arrivals.test.mjs`
- Modify: `package.json`

**Step 1: Write the failing test**

- Assert that `/rmn` produces one stop code and `/nlnnls` produces two stop codes.
- Assert that a sample Firebase stop payload normalizes into a stable endpoint snapshot with label, stop metadata, and trimmed arrival fields.

**Step 2: Run test to verify it fails**

Run: `node --test scripts/fetch_kc_streetcar_arrivals.test.mjs`

Expected: FAIL because the scraper module and exported helpers do not exist yet.

### Task 2: Implement the minimal scraper

**Files:**
- Create: `scripts/fetch_kc_streetcar_arrivals.mjs`
- Modify: `package.json`

**Step 1: Write minimal implementation**

- Export helpers for URL stop-code parsing and endpoint normalization.
- Add a CLI that reads `docs/reference/kc-streetcar/arrivals/arrival-display-endpoints.json`.
- Fetch `stops.json`, `alerts.json`, and each needed `byStop/<code>.json`.
- Write normalized output to `docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json`.

**Step 2: Run test to verify it passes**

Run: `node --test scripts/fetch_kc_streetcar_arrivals.test.mjs`

Expected: PASS

### Task 3: Verify against the live service and document it

**Files:**
- Modify: `docs/reference/kc-streetcar/README.md`
- Modify: `docs/engineering/test-strategy.md`
- Modify: `docs/logs/2026-03-28-worklog.md`

**Step 1: Run the live scraper**

Run: `node scripts/fetch_kc_streetcar_arrivals.mjs`

Expected: `docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json` is written with a fetch timestamp and live arrivals.

**Step 2: Sanity-check a few stops**

- Confirm `River Market North`, `North Loop`, and `UMKC` include the expected stop codes and arrival arrays.
- Confirm service alerts are present even when empty.

**Step 3: Update docs**

- Document the new script and output file in the Streetcar reference README.
- Record the manual verification path in test strategy.
- Add one worklog entry capturing the Firebase discovery and scope choice.
