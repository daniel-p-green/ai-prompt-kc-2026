# MASTER DOC
# StreetCart KC Final Submission Package
## Architect Surface Handoff

Date: 2026-03-28  
Audience: senior developer handoff  
Purpose: define the architect artifact inside the final Oracle, Muse, and Architect submission package

---

## 1. Product Summary

This doc governs the judge-facing StreetCart KC architect surface. The repo's final submission now spans Oracle, Muse, and Architect, but the implementation scope here is still the one web artifact that should ship from this codebase.

This is no longer the older stop-level KC Streetcar food-access tracker. The dashboard must show the StreetCart operating model directly:

- tournament scoreboard
- priority ZIP pressure
- live completion feed
- budget and KPI proof
- pantry network and cold-chain reality

The page should read like a city pilot command surface, not a startup admin console.

---

## 2. Success Criteria

Done means:

- `tracker.html` clearly presents StreetCart KC as the architect deliverable
- the doc stays aligned with the repo's final Oracle, Muse, and Architect framing
- the page reflects the post-curveball source data in this repo
- the default view works as a public exhibit / judging surface
- a presentation mode is available for on-stage use from the same app
- the repo test and build commands pass

Tested by:

- `npm run test`
- `npm run build`
- manual browser review of `tracker.html`

No changes to:

- `docs/archive/legacy/`

---

## 3. Scope

### In scope

- Hero with StreetCart thesis and pilot metrics
- Supply-alert banner with the post-curveball data
- Tournament scoreboard with team standings and simulated live updates
- ZIP pressure board with selectable detail for demographics, routes, pantries, transit, and closures
- Live feed of recent verified completions
- Budget tracker with the $500K pilot allocation
- Pantry network panel
- Presentation mode that collapses to scoreboard, proof stats, and CTA

### Out of scope

- Real backend integration
- Real map tiles or GIS stack
- User accounts
- Volunteer sign-up flow
- Resident intake flow
- SMS delivery
- Next.js or TypeScript migration

---

## 4. Data Rules

Use `data/streetcart-kc.json` as the source of truth for:

- contract value and budget
- problem proof
- priority ZIPs and full ZIP demographics
- supply alerts
- harvest routes
- pantry network
- transit connectors
- tournament standings
- simulated live feed
- curveball module

Keep the JSON flat and legible. Prefer explicit fields over abstractions.

---

## 5. Assumptions And Open Questions

Assumptions locked for this repo:

- the current runtime stays Vite + React
- simulated live feed data is acceptable for the architect demo
- the dashboard uses bundled challenge data rather than calling live endpoints
- the static site at `index.html` remains supporting narrative, not the primary architect artifact
- the final web deliverable stays one app with two audience modes: exhibit by default, presentation by toggle or URL
- tracker state may be deep-linked with `mode=stage` and `zip=<ZIP>`
- landing-page demo state may be deep-linked with `view=<demo-view>` and `lang=<locale>`

Open questions deferred:

- whether a true map should exist in a later version
- whether the dashboard and landing page should merge
- whether the long-term app should preserve `tracker.html` as a separate entrypoint

---

## 6. Panel Spec

### Hero band

- one strong civic-blue band
- thesis first
- four proof stats: contract, spine length, public reach, cost per box

### Scoreboard

- leaderboard rows with points, deliveries, households, and pounds
- visible leader state
- progress bars tied to the current leader

### ZIP pressure board

- heat-style grid of ZIP tiles sorted by priority
- click state changes the detail panel
- detail panel must show route, pantries, connectors, and closures without navigation

### Live feed

- rolling list of recent completions
- simulated event loop is acceptable
- keep the language concrete and operations-first

### Budget tracker

- preserve the five-category $500K split
- show spent, forecast, and cost-per-box summary

### Pantry network

- show languages, cold storage, ID rules, and capacity
- keep it scannable

### Presentation mode

- top 60%: scoreboard
- middle 25%: summary stats
- bottom 15%: CTA

---

## 7. Visual Rules

- Use StreetCart blue as the dominant color
- Keep panels white and disciplined
- Favor strong bands, lines, and route-like structure over floating cards
- Avoid playful marketing styling
- Avoid glass, gradients-as-decoration, or startup SaaS patterns

Type:

- headline feel: assertive transit signage
- body feel: calm civic utility

Tone:

- direct
- service-first
- Kansas City specific
- never cute

---

## 8. Implementation Notes

- Keep logic in small helper functions under `src/lib/` where behavior is worth testing
- Keep JSX explicit; do not introduce a component abstraction layer for simple panels
- Prefer local state and intervals over mock data services
- Preserve existing scripts and keep the change reversible

---

## 9. Verification Checklist

- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `tracker.html` loads with the new StreetCart dashboard
- [ ] presentation mode renders and exits correctly
- [ ] ZIP selection updates detail state
- [ ] `tracker.html?mode=stage` and `tracker.html?zip=66101` resolve correctly
- [ ] `index.html?view=resident&lang=en` resolves correctly
- [ ] no doc still describes the tracker as the primary stop-level product
