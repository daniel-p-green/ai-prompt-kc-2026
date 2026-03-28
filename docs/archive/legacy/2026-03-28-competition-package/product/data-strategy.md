# StreetCart KC Data Strategy

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Team: Team Codex KC

## Purpose

Use the challenge API to make StreetCart KC feel grounded and specific, without letting the team get distracted by low-signal data. This is a competition project, not a production analytics program. The API should strengthen the story, sharpen the pilot, and support a thin demo.

## Decision Summary

- Use the challenge API heavily for Oracle.
- Use a small, visual subset of it for Muse.
- Use only the minimum operational slice for Architect.
- Do not force every endpoint into the concept. Some are evidence, some are product inputs, and some are mostly distractions.

## Endpoint Map

| Endpoint | What it gives us | Oracle | Muse | Architect | Verdict |
|---|---|---|---|---|---|
| `/api/challenge/harvest` | Priority ZIPs, weekly pounds, partner agencies | Defines pilot ZIPs, weekly service goals, and partner story | Lets Muse name the neighborhoods we are serving | Seeds dashboard ZIP priorities | Core |
| `/api/challenge/pantries` | Locations, hours, language, ID rules, cold storage | Supports pilot hub and partner selection | Helps create resident-friendly service copy | Powers resident instructions and operator hub setup | Core |
| `/api/challenge/supply-alerts` | Why-now urgency, federal cuts, impacted ZIPs | Strong opening problem slide and renewal logic | Helps frame campaign urgency | Can drive alert banners or dashboard status | Core |
| `/api/challenge/demographics` | Poverty, Hispanic %, no vehicle, SNAP | Supports pilot targeting and ROI argument | Helps Muse localize bilingual and community outreach | Can enrich ZIP scoring logic | Core |
| `/api/challenge/311-calls` | Housing and utility distress by ZIP | Good support evidence for ZIP prioritization | Optional proof point in storytelling | Optional scoring input | Useful secondary |
| `/api/challenge/food-atlas` | Food desert and low-access validation | Supports the argument that target ZIPs are structurally underserved | Good for one badge or map annotation | Optional enrichment only | Useful secondary |
| `/api/challenge/store-closures` | Grocery closure context | Strong narrative context slide | Good before-and-after visual cue | Not needed in product logic | Context only |
| `/api/challenge/transit` | Bus stops near food resources, route frequency | Weak support for reach and feeder access | Mostly distracts from StreetCart KC brand if centered | Maybe useful for a later last-mile layer | Low priority |

## What We Learned From Sampling

Sampled on 2026-03-28.

- `harvest` is immediately valuable because it already names high-priority ZIPs and partner agencies.
- `pantries?zip=64130` returned zero pantry results, which is a strong proof point for access gaps.
- `pantries?language=Spanish` returned multiple bilingual partners and a mobile distribution record serving `64127`, `64130`, `66101`, and `66105`.
- `supply-alerts` clearly supports the urgency narrative around the TEFAP cut and the 3-million-pound shortfall.
- `demographics` plus `food-atlas` make the targeting logic look legitimate instead of arbitrary.
- `transit` looked uneven. One sampled pantry area returned no nearby results, while another returned a few bus stops. That makes it weak as the center of the concept.

## How To Use Data By Track

## Oracle

Oracle should use data the most aggressively.

- `harvest` to select the five pilot ZIPs
- `supply-alerts` to explain why the city must act now
- `demographics` and `311-calls` to justify where demand is most severe
- `pantries` to justify which partners or hubs are operationally credible
- `store-closures` to explain why existing grocery access is failing

Oracle deliverables that should visibly use data:

- pilot geography table
- 60-day KPI scorecard
- partner and hub rationale
- renewal case

## Muse

Muse should use data selectively, not exhaustively.

- Show the target ZIPs and the number of households served
- Mention bilingual need where Spanish-language access matters
- Show one or two hard facts about food insecurity or recent closures
- Keep visuals simple and local instead of data-dense

Muse deliverables that should visibly use data:

- one map or corridor visual with priority ZIP callouts
- one resident-facing flyer or SMS with relevant service details
- one scoreboard mock that ties competition back to household outcomes

## Architect

Architect should use only the minimum data needed to prove the product.

- `harvest` for default ZIP priorities
- `pantries` for service options, language, and requirements
- `supply-alerts` for urgency banners or status
- `demographics` only if you need a simple ZIP score or explanation

Architect should not spend time integrating:

- complex transit logic
- detailed store-closure visualizations
- overbuilt census dashboards

## Streetcar vs. Bus Decision

The free bus system is worth acknowledging, but not worth making central.

Use the streetcar as the spine because:

- it is more brandable
- it is more visually coherent
- it creates a cleaner city-facing story for judges
- it gives Muse and Oracle a simpler narrative arc

Use buses only as a supporting layer because:

- they help explain how access extends beyond the corridor
- they can strengthen answers to coverage objections
- the current `transit` endpoint does not look strong enough to anchor the concept

Recommended line:

"StreetCart KC uses the streetcar corridor as the organizing spine of the pilot, while partner agencies and existing transit options help extend access into the surrounding priority ZIP codes."

## Practical Rule

Before using any endpoint, ask one question:

"Does this make the pilot clearer, more defensible, or more demoable?"

If the answer is no, leave it out.
