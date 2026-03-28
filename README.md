# StreetCart KC

StreetCart KC is Team Codex KC's working repo for the 2026 AI Prompt Championship submission. The concept is a streetcar-led, partner-operated food-access pilot for Kansas City: the streetcar corridor is the public-facing spine, while pantry and nonprofit partners handle neighborhood fulfillment into priority ZIP codes.

This repo is the operating source for three linked outputs:

- Oracle: business case, pilot economics, and judge-facing deck
- Muse: brand and creative system for the concept
- Architect: thin live product proof for operators, residents, and the public leaderboard

## Current Status

As of `2026-03-28 12:05 PM CT`, the team has a usable competition baseline:

- The StreetCart KC concept is locked in the product docs and worklog.
- The Oracle deck is generated from source and exported to `docs/plans/StreetCart_KC_Oracle.pptx`.
- A lightweight static demo exists and serves from this repo.
- Shared facts for Oracle and Muse are centralized in one document and one JSON data file.
- Submission scope is locked: Oracle first, Muse second, Architect as a thin live proof.
- Research and discarded side explorations are preserved as evidence, not treated as primary deliverables.

What is not done yet:

- The recommended product stack (`Next.js`, `TypeScript`, `Postgres`, SMS provider) has not been scaffolded.
- There are still no app-grade `dev`, `lint`, `test`, or `build` workflows for a real web product.
- The repo currently ships artifact generation and a static site, not a production application.

## What We Have

### Locked concept

- Core concept: `docs/product/prd.md`
- Shared Oracle + Muse source of truth: `docs/product/oracle-muse-fact-base.md`
- Decision trail and morning progress log: `docs/logs/2026-03-28-worklog.md`

### Deliverables in progress

- Oracle one-page brief: `docs/discovery/oracle-one-page-brief.md`
- Oracle deck plan and generated deck: `docs/plans/`
- Static Architect proof: `index.html`, `site/app.js`, `site/styles.css`, `data/streetcart-kc.json`
- Research archive and supporting exploration: `docs/research/`

### Reference material

- KC Streetcar scraped/reference material: `docs/reference/kc-streetcar/`
- Product framing, JTBD, data strategy, and use cases: `docs/product/`
- Discovery notes and briefs: `docs/discovery/`

## Repo Map

```text
.
├── AGENTS.md                        # Project operating rules
├── README.md                        # Root project handbook
├── data/                            # Shared demo/deck data
├── docs/
│   ├── discovery/                  # Briefs, framing, deck input notes
│   ├── engineering/                # Implementation and test strategy notes
│   ├── logs/                       # Dated worklogs and operating record
│   ├── plans/                      # Deck plans and exported artifacts
│   ├── product/                    # PRD, JTBD, fact base, data strategy
│   ├── reference/                  # External reference snapshots
│   └── research/                   # Side research and archived explorations
├── scripts/                         # Artifact generation scripts
├── site/                            # Static demo assets
├── index.html                       # Static demo entrypoint
└── package.json                     # Current repo scripts
```

## Commands

Current scripts are intentionally narrow:

```bash
npm install
npm run arrivals:fetch
npm run deck:build
npm run site:serve
npm run test:arrivals
```

What each one does:

- `npm run arrivals:fetch`: fetches the live KC Streetcar signage data from the public Firebase backend and writes `docs/reference/kc-streetcar/arrivals/live-arrivals-latest.json`
- `npm run deck:build`: regenerates the Oracle PowerPoint from `data/streetcart-kc.json`
- `npm run site:serve`: serves the repo root at `http://127.0.0.1:4173/`
- `npm run test:arrivals`: runs the scraper unit tests for signage URL parsing and output normalization

There is no application `build`, `lint`, `test`, or framework dev server yet.

## Operating Sources Of Truth

When docs disagree, use this order:

1. `docs/product/oracle-muse-fact-base.md`
2. `docs/product/prd.md`
3. `docs/logs/2026-03-28-worklog.md`
4. Supporting discovery docs, research docs, and artifacts

Working rules:

- Keep the streetcar as the public-facing spine, not the full logistics system.
- Keep phase one pickup-first and partner-supported.
- Keep the bracket as the engagement engine, not the value proposition.
- Keep the proof centered on households served, priority ZIPs, and verified completions.
- Preserve side explorations as process evidence, but do not let them compete with the main story.

## Delivery Workflow

For any non-trivial task in this repo:

1. Write success criteria first.
2. Make or update the controlling doc before changing artifacts.
3. Log meaningful decisions in the dated worklog.
4. Rebuild the affected artifact.
5. Verify the output before claiming completion.

Current artifact flow:

1. Update source facts in `docs/product/oracle-muse-fact-base.md` or `data/streetcart-kc.json`
2. Regenerate the Oracle deck with `npm run deck:build`
3. Review the static site with `npm run site:serve`
4. Record the decision or result in `docs/logs/2026-03-28-worklog.md`

## Recommended Next Build Path

The repo's long-term application direction is still:

- Frontend: `Next.js` + `TypeScript`
- Data: `Postgres`
- Messaging: SMS provider for resident notifications

Recommended sequence:

1. Preserve the current static demo as the visual and content baseline.
2. Scaffold the actual app only after the Oracle narrative and Muse system are stable.
3. Move shared facts into a typed data layer when the app scaffold exists.
4. Add real commands for `dev`, `lint`, `test`, and `build` once the framework lands.

## OpenAI Reference Points

These are the official docs to use when we move from artifact mode into product mode:

- Responses API: OpenAI documents it as the primary interface for stateful, tool-using interactions, with support for function calling and built-in tools. Use this as the default API surface for an agentic StreetCart backend.
  Link: <https://developers.openai.com/api/reference/responses/overview/>
- Apps SDK: OpenAI's quickstart states that ChatGPT apps use MCP, require an MCP server, and optionally render a web component UI in ChatGPT. Use this only if we decide to package StreetCart as a ChatGPT app surface.
  Link: <https://developers.openai.com/apps-sdk/quickstart/>
- Codex: OpenAI positions Codex as the coding agent for software development and recommends `gpt-5.4` for most code generation tasks.
  Link: <https://developers.openai.com/api/docs/guides/code-generation/#use-codex>
- GPT-5 prompting for coding: OpenAI recommends explicit role and workflow guidance, strong validation, and clean markdown standards for coding agents. This matches how this repo should stay organized.
  Link: <https://developers.openai.com/api/docs/guides/prompt-engineering/#coding>

## Immediate Priorities

- Tighten Oracle first: narrative order, economics, objections, and curveball readiness.
- Finish Muse second: brand proof, wrap direction, scoreboard logic, and bilingual collateral tied to the same facts.
- Keep Architect fixed at the current three-view proof: operator, resident, and leaderboard.
- Do not scaffold the real application until the competition package is fully locked.

## Risks

- The repo can look more finished than it is if the static demo is mistaken for the product architecture.
- Multiple planning docs can drift unless the fact base remains the explicit tie-breaker.
- The deck, site, and source JSON can diverge if changes are made directly in artifacts.
- The team can lose time by expanding the live product before the competition story is fully stable.

## Retrospective Prompt

At the end of each work block, answer:

- What changed?
- What did we verify?
- What is the next highest-leverage move?
- What would we do differently next time?
