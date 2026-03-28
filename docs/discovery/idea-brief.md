# Idea Brief: StreetCart KC

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Working stack: Repo not initialized yet. Recommended MVP stack for a thin Architect demo: Next.js, TypeScript, Postgres, and an SMS provider.

## 1) Problem

Kansas City's food access problem is a coordination problem as much as a supply problem. Critical ZIP codes have lost grocery stores, federal cuts reduced food supply, and families with limited transportation still have to guess which pantry can actually serve them today. StreetCart KC uses an existing, highly visible civic asset, the streetcar corridor, as the public-facing spine for a 60-day food access pilot. The challenge data shows:

- a 40% TEFAP reduction and a 3-million-pound shortfall this quarter
- critical need in ZIPs 64130, 64127, 66101, 66105, and 64132
- high poverty, high SNAP participation, and high no-vehicle rates in the hardest-hit areas

Today, residents call around, show up to the wrong pantry, or miss limited pop-up distributions. Agencies react with stale spreadsheets and manual phone trees. Volunteers have no compelling reason to keep showing up. StreetCart KC turns that weakness into the hook: use streetcar-adjacent hubs, partner pantries, and a sports-style service competition to make food access visible, measurable, and local.

## 2) Target User

Primary user: city and partner-agency coordinators who need a visible, low-friction way to move more food into priority ZIP codes in 60 days.

Secondary users:

- residents in pilot ZIP codes who need predictable pickup windows or last-mile delivery help
- volunteer teams, schools, churches, and fan groups who need a simple way to participate and see progress

Explicitly out of scope:

- building a full citywide grocery delivery network
- replacing pantry inventory systems or ERPs
- assuming the city must modify streetcar vehicles in phase one to make the concept work

## 3) Outcome

If StreetCart KC works, the city can point to a simple, judge-readable pilot: three to four streetcar-adjacent food hubs, a clear list of priority ZIPs, a volunteer tournament that makes service visible, and households in those ZIPs getting food more predictably. The streetcar corridor becomes the brand and engagement spine. Partner agencies still do the actual neighborhood fulfillment.

## 4) Success Signals

- Leading indicator: weekly verified deliveries or hub pickups, volunteer shift fill rate, and leaderboard participation by team
- Lagging indicator: households served in priority ZIP codes and partner-reported completion rate within 60 days
- Manual acceptance check: a judge can understand the pilot in under 60 seconds and see how a household, a coordinator, and a volunteer team all interact with the same system

## 5) Constraints

- Technical: challenge API as the initial data source, mobile-first resident flows, low-bandwidth support, simple leaderboard logic, minimal personal data collection
- Timeline: 60-day proof window, so phase one must be streetcar-adjacent hubs plus partner delivery, not a citywide logistics rebuild
- Compliance / policy: SMS consent, accessibility, least-privilege handling of resident contact data, and realistic assumptions about what streetcar signage or wraps can be mocked versus operationalized in 60 days

## 6) Non-Goals

- This effort will not depend on getting food loaded directly onto streetcar vehicles in phase one.
- This effort will not promise real-time pantry inventory accuracy in v1.

## 7) Assumptions

- Assumption 1: the same StreetCart KC concept will anchor Oracle, Muse, and a lightweight Architect demo so the team presents one company, not three unrelated projects.
- Assumption 2: phase one uses streetcar-adjacent hubs, partner pantries, and volunteer last-mile support even if direct in-car streetcar transport is not approved.

## 8) Open Questions

- Which streetcar-adjacent stops or partner hubs are the most credible pilot locations for the first presentation?
- Will the city sponsor outbound SMS, signage access, or wrap mockup rights during the pilot, or should those stay positioned as renewal-phase items?
