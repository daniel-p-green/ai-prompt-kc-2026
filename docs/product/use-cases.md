# Use Cases: BridgeKC

Date: 2026-03-28
Repository: ai-prompt-kc-2026

## Primary Use Cases

### UC-1: Resident Finds a Best-Fit Resource

- Actor: resident in ZIP 64130 with limited transportation
- Trigger: resident texts BridgeKC or opens the mobile web form after hearing about the service
- Preconditions: latest pantry data and pilot ZIP priorities have synced successfully
- Main flow:
1. Resident selects English or Spanish and enters ZIP code plus basic constraints.
2. BridgeKC filters out resources that do not match language, hours, or ID constraints and ranks the remaining options.
3. Resident receives the top matches with address, hours, requirements, and a clear next step.
- Expected result: resident can act on a realistic option without calling multiple agencies first

### UC-2: Coordinator Responds to a Supply Shock

- Actor: city or nonprofit coordinator
- Trigger: a new supply alert or demand spike appears for a pilot ZIP
- Preconditions: operator is authenticated and pilot agencies are loaded in the system
- Main flow:
1. Coordinator reviews the affected ZIP, current pantry options, and why the area is ranked as high priority.
2. Coordinator creates a new pop-up event or targeted outreach alert for one or more ZIP codes and language groups.
3. BridgeKC publishes the event to the resident experience and sends outbound alerts to subscribed households.
- Expected result: households in the affected ZIP learn about a relevant food option quickly, and the action is tracked

## Edge Cases

### EC-1

- Scenario: resident has no ID, but the nearest pantry requires it
- System behavior: exclude the pantry from default results and prioritize no-ID options first
- User-visible response: "We filtered out locations that require ID. Here are the best options that do not."

### EC-2

- Scenario: no pantry inside the ZIP matches current constraints
- System behavior: expand search radius, mark the result as outside-ZIP, and surface the closest viable alternative plus a hotline fallback
- User-visible response: "No exact match is available in your ZIP right now. Here are the nearest options that fit your needs."

## Failure Cases

### FC-1

- Failure mode: challenge API sync fails or times out
- Detection: scheduled sync health check fails and the newest dataset timestamp does not advance
- Recovery path: serve the last known good snapshot, show a stale-data warning, and notify the coordinator

### FC-2

- Failure mode: outbound SMS delivery fails for a published alert
- Detection: provider webhook reports delivery failure or bounce
- Recovery path: retry according to provider rules, log the failure, and keep the alert available in the web experience
