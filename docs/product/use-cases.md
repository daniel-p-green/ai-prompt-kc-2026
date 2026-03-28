# Use Cases: StreetCart KC

Date: 2026-03-28
Repository: ai-prompt-kc-2026

## Primary Use Cases

### UC-1: Coordinator Launches a StreetCart Hub

- Actor: city or nonprofit coordinator
- Trigger: a new supply alert or planning cycle requires the next weekly StreetCart hub schedule
- Preconditions: latest challenge data has synced and partner agencies are loaded
- Main flow:
1. Coordinator reviews the highest-need ZIPs and selects a streetcar-adjacent hub window plus partner agency.
2. StreetCart KC publishes the event, expected capacity, and service area.
3. Residents and volunteers receive the relevant instructions while the hub appears in the operator dashboard and public schedule.
- Expected result: one weekly hub is clearly defined, staffed, and tied to a measurable service goal

### UC-2: Resident Gets a Pickup or Delivery Instruction

- Actor: resident in a priority ZIP code
- Trigger: resident receives a StreetCart KC SMS, flyer, or referral
- Preconditions: the resident's ZIP is covered by an active hub or partner event
- Main flow:
1. Resident sees the next pickup window or delivery option tied to their ZIP and language.
2. StreetCart KC explains where to go, when to show up, and what requirements apply.
3. Resident completes pickup or receives a drop and the outcome is recorded.
- Expected result: resident gets food through a predictable, low-friction path tied to the pilot

## Edge Cases

### EC-1

- Scenario: the city cannot approve direct use of streetcar vehicles for food transport during the 60-day pilot
- System behavior: StreetCart KC falls back to streetcar-adjacent hubs and partner agency fulfillment without changing the public-facing story
- User-visible response: the public still sees a hub schedule, leaderboard, and service plan tied to the streetcar corridor

### EC-2

- Scenario: a volunteer team wants credit for participation but did not complete a verified shift or delivery
- System behavior: leaderboard points post only after a coordinator verifies completion
- User-visible response: team members can see pending versus verified contributions

## Failure Cases

### FC-1

- Failure mode: challenge API sync fails or times out
- Detection: scheduled sync health check fails and the newest dataset timestamp does not advance
- Recovery path: serve the last known good snapshot, show a stale-data warning, and notify the coordinator

### FC-2

- Failure mode: the bracket or scoreboard becomes the story and food access outcomes disappear from the pitch
- Detection: key artifacts emphasize teams, wraps, or fandom without showing priority ZIPs and households served
- Recovery path: require every major artifact to show ZIP targets, household outcomes, and pilot metrics before competition visuals
