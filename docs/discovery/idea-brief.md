# Idea Brief: BridgeKC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Working stack: Repo not initialized yet. Recommended MVP stack: Next.js, TypeScript, Postgres, and an SMS provider.

## 1) Problem

Kansas City's food access problem is a coordination problem as much as a supply problem. Critical ZIP codes have lost grocery stores, federal cuts reduced food supply, and families with limited transportation still have to guess which pantry can actually serve them today. The challenge data shows:

- a 40% TEFAP reduction and a 3-million-pound shortfall this quarter
- critical need in ZIPs 64130, 64127, 66101, 66105, and 64132
- high poverty, high SNAP participation, and high no-vehicle rates in the hardest-hit areas

Today, residents call around, show up to the wrong pantry, or miss limited pop-up distributions. Agencies react with stale spreadsheets and manual phone trees.

## 2) Target User

Primary user: food-insecure residents in pilot ZIP codes who need a fast, low-friction way to find a food resource they can actually use today.

Secondary user: city and partner-agency coordinators who need to decide where scarce food should go and how to notify the right households quickly.

Explicitly out of scope:

- building a full grocery delivery marketplace
- replacing pantry inventory systems or ERPs
- SNAP enrollment, benefits case management, or medical screening

## 3) Outcome

If BridgeKC works, a resident can text or visit a simple mobile page, share ZIP code plus a few constraints, and get a ranked list of workable options in English or Spanish. At the same time, coordinators can see where demand and supply shocks are concentrating, publish pop-up events, and target alerts to households in the right ZIP codes.

## 4) Success Signals

- Leading indicator: number of resident matches sent in pilot ZIP codes and number of coordinator alerts published from the dashboard
- Lagging indicator: successful pickup confirmations or partner-reported completed referrals within 60 days
- Manual acceptance check: live demo shows a resident in 64130 getting a usable recommendation and an operator publishing a ZIP-targeted alert after a supply shock

## 5) Constraints

- Technical: mobile-first, bilingual, low-bandwidth friendly, challenge API as initial data source, minimal personal data collection
- Timeline: 60-day proof window, so the MVP must focus on a narrow pilot instead of citywide optimization
- Compliance / policy: SMS consent, accessibility, and least-privilege handling of resident contact data

## 6) Non-Goals

- This effort will not optimize delivery truck routing in v1.
- This effort will not promise real-time pantry inventory accuracy in v1.

## 7) Assumptions

- Assumption 1: this kickoff is optimized for the Architect track, with enough business and GTM hooks to support later Oracle or Muse work.
- Assumption 2: the city or pilot partners can provide 3-5 agencies willing to validate hours, capacity, and event data during the 60-day pilot.

## 8) Open Questions

- Which pilot partners can commit to updating availability at least daily?
- Will the city sponsor outbound SMS costs during the pilot, or must the vendor absorb them inside operating costs?
