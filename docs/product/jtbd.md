# JTBD: BridgeKC

Date: 2026-03-28
Repository: ai-prompt-kc-2026

## Core Job Statement

When I need food support in my neighborhood and resources keep changing, I want a simple way to find the best option for me right now, so I can get food without wasting time, money, or trust.

## Primary Jobs

1. As a resident, find a food resource I can realistically use today given my language, transportation, and documentation constraints.
2. As a coordinator, decide where to focus limited supply and outreach so scarce food reaches the highest-need ZIP codes first.

## Job Steps

| Step | Current friction | Desired progress |
|---|---|---|
| Discover | Residents hear incomplete information through flyers, calls, or word of mouth | Resident starts from one SMS or mobile entry point |
| Decide | Hours, ID rules, and language support are unclear | Resident sees a small ranked list with clear fit reasons |
| Execute | People show up to closed or unreachable sites | Resident gets an option they can actually reach and use |
| Verify | Coordinators cannot easily tell if outreach worked | Pickup and engagement signals roll back into dashboard metrics |
| Maintain | Supply shocks and closures force constant manual rework | Operators can quickly publish new events and alerts for affected ZIPs |

## Outcome Expectations

- Speed: get a usable recommendation in under 2 minutes
- Confidence: trust that the recommendation is current enough to act on
- Control: understand why a match was suggested and what to do next

## Forces of Adoption

### Push (pain)

- Families cannot afford failed trips when gas, time, and child care are tight.
- Coordinators are reacting to supply cuts with fragmented tools and manual outreach.

### Pull (benefits)

- One entry point for residents instead of multiple phone calls
- Better targeting for ZIP-level alerts and pop-up events

### Anxiety (risk)

- Residents may worry about surveillance or data sharing.
- Agencies may worry that another tool creates more admin work.

### Habits (status quo)

- Word-of-mouth referrals
- Paper flyers
- Staff phone trees and spreadsheets

## Evidence Links

- Challenge data: `/api/challenge/supply-alerts` updated 2026-03-28
- Challenge data: `/api/challenge/harvest`, `/api/challenge/demographics?zip=64130`, `/api/challenge/demographics?zip=66101`
