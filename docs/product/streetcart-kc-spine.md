# StreetCart KC Spine

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Team: Team Codex KC

## One-Sentence Thesis

StreetCart KC turns the Kansas City streetcar corridor into a rolling food spine and live scoreboard, using a March Madness-style volunteer tournament to move more groceries into the city's highest-need ZIP codes through streetcar-adjacent hubs and partner pantries in 60 days.

## What This Actually Solves

This is not a cute transit idea. The streetcar is the public-facing spine, not the whole logistics system.

- Food access problem: supply is down, stores have closed, and residents still cannot tell where they can reliably get food.
- Coordination problem: the city and pantry partners need one visible operating plan, not more fragmented outreach.
- Participation problem: volunteers and sponsors need a reason to show up repeatedly, not once.

StreetCart KC solves those three problems together:

- the streetcar corridor gives the city a recognizable place-based story
- partner pantries and community hubs do neighborhood fulfillment
- the bracket and scoreboard create recurring public participation

## The Hard Truths to Say Out Loud

- Not every priority ZIP sits directly on the streetcar line. Phase one still works because the line is the staging and attention spine, while fulfillment fans out through partner hubs.
- The bracket is the engagement engine, not the value proposition. The value proposition is households served in priority ZIPs.
- The custom wrap is a renewal-phase reward. It should not be the first 60-day dependency.

## Streetcar vs. Bus Stress Test

Kansas City's free bus system is a real alternative and should not be ignored. It has broader geographic reach than the streetcar and is more directly tied to neighborhood access in many of the highest-need ZIP codes.

Why not make buses the spine?

- Better geographic coverage does not automatically make for a better competition entry.
- The bus story is operationally plausible, but it is less ownable, less visually cohesive, and harder to turn into a simple public symbol for judges.
- The sampled `transit` endpoint is bus-stop oriented, but the data looked sparse and uneven. That makes it weak as the main narrative backbone.

Why keep the streetcar as the spine?

- It is uniquely Kansas City and instantly legible in a pitch.
- It gives Muse a stronger brand system, stronger visuals, and a clearer scoreboard or wrap story.
- It gives Oracle a cleaner story about using an existing civic asset to organize action.
- It gives Architect a simpler demo frame: hubs, resident instructions, and a public leaderboard.

Best decision:

- Keep the streetcar as the primary brand and operating spine.
- Use buses as a supporting feeder or access layer, not the headline concept.
- If challenged, say: "StreetCart KC uses the streetcar corridor to organize the city-facing program, while existing bus routes and partner agencies extend reach into the surrounding ZIP codes."

## 60-Day Pilot Shape

- Pilot geography: prioritize ZIPs 64130, 64127, 66101, 66105, and 64132 using the challenge API.
- Operating model: three to four streetcar-adjacent weekly hubs plus pantry-partner fulfillment into the target ZIPs.
- Delivery model: pickup windows first, volunteer last-mile help where appropriate, and bilingual resident communication.
- Visibility model: public leaderboard, streetcar-style scoreboard mock, social proof, and partner collateral.

## Oracle: What To Build

Oracle should be the strongest artifact because it answers feasibility.

- Define the exact 60-day pilot: who runs it, where it happens, what gets measured.
- Frame the money cleanly: `$500k` contract value, roughly `$150k` direct 60-day operating costs, and the rest positioned as build, program margin, renewal runway, and city value creation.
- Add one explicit expansion sentence: "Phase 2 expansion uses KC's free bus network to extend reach beyond the streetcar corridor."
- Show three tables:
  - pilot budget
  - KPI scorecard
  - renewal case

Recommended Oracle metrics:

- households served in priority ZIPs
- verified deliveries or pickups per week
- volunteer shift fill rate
- average household distance to pickup or delivery support
- partner participation and repeat engagement

## Muse: What To Build

Muse should make the idea feel obvious and local.

- StreetCart KC logo and visual system
- one live scoreboard mock styled like a streetcar arrival display
- one custom wrap concept for the winning team
- one resident-facing SMS or flyer
- one volunteer bracket visual

Muse should always show:

- the priority ZIPs
- the households served
- the fact that this is about food access first

## Architect: What To Build

Architect should be thin and believable, not ambitious.

Recommended thin demo:

- operator dashboard with priority ZIPs and next hub schedule
- resident view showing a pickup window or delivery instruction
- public leaderboard showing verified team points

Do not spend the clock building:

- full routing optimization
- real-time vehicle tracking
- complete pantry inventory management

## Likely Judge Objections and Answers

### "This sounds like a branding campaign, not food access."

Answer: the competition layer is the volunteer engine, but the operating core is priority ZIP service, partner hubs, and verified household outcomes.

### "Can the streetcar even carry food like this?"

Answer: phase one does not depend on that. The pilot works with streetcar-adjacent hubs and partner fulfillment even if direct in-car transport is out of scope.

### "Why not just use the free bus system instead?"

Answer: buses are part of the access picture, but they are better treated as feeder infrastructure than the main program symbol. The streetcar gives the city a clearer organizing spine, a stronger public identity, and a more cohesive pilot story, while bus access can still support last-mile reach.

### "Why is this better than what pantries already do?"

Answer: it creates one city-level operating spine, better targeting, repeat volunteer turnout, and a public proof loop the city can renew.

## Best First Slide

StreetCart KC turns Kansas City's streetcar corridor into a public food distribution spine and live citywide scoreboard, using sports-fueled volunteer competition to deliver more groceries into priority ZIP codes in 60 days.

## Recommended Build Order From Here

1. Finish Oracle first.
2. Build Muse around the exact same thesis and metrics.
3. Only then build the thinnest possible Architect proof.
