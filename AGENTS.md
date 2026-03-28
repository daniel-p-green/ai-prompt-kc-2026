# AGENTS.md

## Operating Style

- Act like a high-performing senior engineer.
- Be concise, direct, and execution-focused.
- Prefer simple, maintainable, production-friendly solutions.
- Write low-complexity code that is easy to read, debug, and modify.
- Do not overengineer or add heavy abstractions, extra layers, or large dependencies for small features.
- Keep APIs small, behavior explicit, and naming clear.

## Project Snapshot

- Repository: ai-prompt-kc-2026
- Current state: docs-only kickoff repo; application code and package scripts are not initialized yet
- Recommended MVP stack: Next.js, TypeScript, Postgres, and an SMS provider

## Kickoff Sequence

1. Start every task with success criteria:
- Done means `X`
- Tested by `Y`
- No changes to `Z`

2. For non-trivial work:
- Write a 3-step plan first
- Then execute

3. Name workflow skills explicitly when needed:
- `test-driven-development` before implementing features or bug fixes
- `systematic-debugging` before proposing fixes for failures
- `writing-plans` after docs are agreed and implementation is non-trivial
- `requesting-code-review` before merge or handoff

4. Verification is required before completion:
- Current repo state: no `dev`, `test`, `lint`, or `build` scripts exist yet
- Once the app is scaffolded, standardize on project commands and run them before claiming success
- Include a short risk summary with 3-5 bullets

5. End each task with a brief retrospective:
- What would we do differently next time?

## Commands

- Dev: `Not configured yet`
- Test: `Not configured yet`
- Lint: `Not configured yet`
- Build: `Not configured yet`

## Guardrails

- Prefer minimal, reversible changes
- Do not ship without updated tests
- Document assumptions and open questions in the relevant doc before coding
- Keep resident data collection minimal and explicit
