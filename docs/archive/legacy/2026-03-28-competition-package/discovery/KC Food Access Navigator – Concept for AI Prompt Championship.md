# KC Food Access Navigator – Concept for AI Prompt Championship

## Executive Summary

Kansas City faces a surge in food insecurity, driven by federal cuts to food assistance and multiple grocery store closures in high-poverty neighborhoods. Local food banks like Harvesters are seeing higher demand while losing significant federal commodity supply, leaving pantries struggling to keep up. The AI Prompt Championship KC data brief frames this as a 3 million–pound loss of food bank supply and 1 in 7 residents experiencing food insecurity, the highest level in a decade.[^1][^2][^3]

This report outlines a unified concept called **KC Food Access Navigator**, designed to perform strongly across all three tracks: **The Architect** (product), **The Oracle** (business), and **The Muse** (go-to-market). The core idea is a lightweight, mobile-first web app and SMS service that routes residents to the *closest, open, appropriate* food resource based on need, transit, ID requirements, language, and cold-storage constraints, while providing operational insights to pantries and the city during the 60-day pilot window.[^4][^5]

## Problem and User Understanding

### Structural drivers in Kansas City

Federal cuts to programs like TEFAP and other USDA commodity streams have sharply reduced the volume and quality of food available to regional food banks, forcing them to cancel or scale back deliveries and lose significant quantities of fresh produce. In Kansas City’s Harvesters service area, food insecurity has climbed to its highest level in a decade, with tens of thousands more people affected in a single year. Local reporting highlights pantries that have seen client visits double while facing 30 percent or more reductions in inventory, particularly in protein and dairy.[^2][^3][^1]

Store closures compound this, as four grocery outlets in and around key ZIP codes have shut down between 2024 and 2025, affecting tens of thousands of people in 64127, 64130, 64124, and 64128 who already face high poverty and limited car access. National and state-level data show many census tracts classified as low-income and low-access, where residents live far from a supermarket and rely heavily on pantries and mobile distribution.[^6][^3]

### Priority user segments

Given the data brief and regional context, the solution focuses on three primary user segments:

- **Residents in high-need ZIPs** – especially in 66101, 66105, 64127, 64130, 64128, and 64132, which have high poverty, high food insecurity, and large shares of households without vehicles.
- **Pantries and food bank partners** – including fixed sites and mobile distributors that need to smooth demand, avoid line spikes, and match inventory (especially perishables) with real-time need.
- **City and funders** – the mayor’s office, KC Digital Drive, and philanthropic partners interested in tracking whether a targeted 60-day intervention can measurably improve access metrics in the hardest-hit areas.

These segments cut across language (notably large Hispanic populations in 66101 and 66105), transportation constraints (high "no vehicle" rates), and documentation barriers (ID requirements differing by site), all of which must be modeled in the product experience.

## Solution Overview – KC Food Access Navigator

### Core value proposition

KC Food Access Navigator is a **multi-channel access layer** that sits on top of existing pantries, food bank routes, transit stops, and USDA food-desert data. It aims to answer one question for residents: **“Where can I get good food, today, near me, that actually works for my situation?”** The same data and interface provide pantries and city stakeholders with near-real-time views of which neighborhoods are underserved on a given day.

The solution has three key components:

- **Resident-facing interface** – mobile web app (no install required) plus SMS/WhatsApp flows for low-bandwidth users.
- **Pantry and partner dashboard** – simple web dashboard to update hours, supply flags, and special distributions; powered by the challenge API plus light manual updates.
- **City/analyst view** – map and simple charts to track utilization, bottlenecks, and how the 60-day pilot shifts access in priority ZIPs.

### How it leverages the challenge API

The Navigator uses the provided API endpoints as its primary data backbone, augmented with minimal additional inputs from partners:

- `/api/challenge/pantries` – base directory of locations, hours, languages, ID rules, cold storage, and routes to power resident search and eligibility logic.
- `/api/challenge/food-atlas` – USDA food desert status to prioritize outreach and flag tracts where pantry or mobile routes are the only viable access.
- `/api/challenge/harvest` – After the Harvest priority ZIPs and routes to coordinate mobile drops with resident demand estimates.
- `/api/challenge/311-calls` and `/api/challenge/demographics` – to rank ZIPs by compounded distress (poverty, vehicle access, Hispanic share, housing and utility trouble) and drive targeted messaging.
- `/api/challenge/transit` – bus stop data to show transit-accessible options and travel time estimates for residents without cars.
- `/api/challenge/store-closures` – annotate areas where recent grocery exits have created new gaps and measure whether pantry usage in those areas rises during the pilot.
- `/api/challenge/supply-alerts` – incorporate real-time supply curveballs into routing logic (e.g., deprioritize sites with acute shortages, push users to mobile or alternate pantries).

## Resident Experience – The Architect Track

### Entry points and flows

Residents can access the Navigator via:

- **Short URL and QR codes** distributed on flyers, bus shelters, community centers, and social media.
- **SMS keyword** (e.g., text "FOOD" to a local number) that triggers a short conversational flow.
- **Embeds and links** on partner sites like KC Digital Drive, Harvesters, pantries, and schools.[^5]

The initial flow collects only what is strictly necessary to route a person effectively:

1. ZIP code or cross streets.
2. Whether they have a car or rely on bus/walking.
3. Language preference (English or Spanish at minimum).
4. Any constraints: needs cold storage items, cannot provide ID, time-of-day availability (e.g., "after 5 p.m.").

### Matching logic

The app then uses the challenge API data and simple rules to present **2–3 best-fit options**, rather than a long directory:

- Filters pantries that are open within the requested time window and day of week.
- Removes sites requiring ID if the user indicates they do not have one.
- Prioritizes sites that match language, are reachable by nearby transit stops, and have cold storage if the user requests fresh or perishable items.
- For users in high-poverty, low-vehicle ZIPs with recent store closures, it preferentially surfaces either mobile distribution routes (After the Harvest) or the closest pantry with good transit links.

For each recommended option, the user sees:

- Name, address, and simple map.
- Today’s hours and any special distributions.
- Whether ID is required, whether Spanish is spoken, and whether fresh/cold items are usually available.
- How to get there: driving directions or which bus line and stop to use, based on `/api/challenge/transit` data.

### AI components for The Architect

To demonstrate AI mastery in the Architect track, the product includes:

- **Natural-language interface** – residents can type or speak "I live near 27th and Prospect, no car, need food for my kids tonight" and an LLM parses this into structured filters (location, transport, timing, household type) against the API data.
- **Explanation layer** – the system uses AI to generate a short, human-friendly explanation of why certain options are recommended ("This pantry is open until 7 p.m., is on your bus route, and does not require ID").
- **Multi-language support** – LLM-backed translation for Spanish and potentially other languages, reducing friction for Hispanic communities in high-need ZIPs.

The MVP for competition day can be implemented as a web-based prototype using standard frameworks (e.g., a single-page app backed by server-side API calls to the challenge endpoints and a hosted LLM), with mock authentication for pantry staff and city viewers.

## 60-Day Pilot Plan – The Oracle Track

### Budget framing and constraints

The city provides **$500,000** for the pilot, and the brief frames a company with **$500K revenue** and **$150K operating expenses** over 60 days, implying a lean team with limited runway that must show traction quickly. In practice, this suggests a focus on:[^4]

- Building only the features needed to demonstrate impact in priority ZIPs during the 60-day window.
- Leveraging existing data sources (the challenge API and partner data) instead of new data collection efforts.
- Using low-cost cloud infrastructure and existing LLM APIs, with careful prompt engineering to minimize token usage per user interaction.

### High-level use of funds

Within the 60-day period, a plausible allocation of the $500,000 could prioritize:

- **Product and engineering** – core team to build and iterate on the Navigator, integrate the API, and deploy the MVP.
- **Community partnerships and outreach** – stipends or mini-grants to key pantries, schools, and community organizations to promote adoption and provide feedback.
- **Data and evaluation** – a lightweight impact measurement framework to track usage, shifts in pantry traffic patterns, and resident satisfaction.

Given time constraints, a detailed line-item budget would be built in a spreadsheet model, but the narrative in a competition setting should emphasize unit economics of outreach (cost per active user in a high-need ZIP) and operational benefits for pantries (e.g., reduced line spikes, better match between mobile route locations and actual demand).

### 60-day milestones

A realistic 60-day plan might include:

- **Weeks 1–2** – finalize product scope with Harvesters, 3–5 flagship pantries, After the Harvest, and KC Digital Drive; integrate static endpoints and build first-clickable prototype.
- **Weeks 3–4** – run small pilots in two ZIPs (e.g., 64127 and 66101), refine matching logic, collect feedback on language, UX, and accuracy of recommendations.
- **Weeks 5–6** – expand to all six high-need ZIPs, introduce SMS gateway, add city/analyst dashboard, and prepare short evaluation report for funders.

Throughout, the pilot can track metrics such as number of lookups by ZIP, average distance to recommended resource, share of users reaching a site via transit versus car, and shifts in distribution volumes for mobile routes.

## Brand and Go-to-Market – The Muse Track

### Positioning and messaging

The Navigator should be positioned as a **community helper**, not a government surveillance tool or a complex app. Core brand attributes:

- **Simple** – "Find food near you today" as a primary message.
- **Respectful** – emphasizes dignity, avoids stigma, and never collects more data than needed.
- **Local** – features KC landmarks, partner logos (Harvesters, KC Digital Drive, key pantries), and bilingual messaging to resonate with Hispanic communities.

Messaging should explicitly acknowledge that federal cuts and store closures are not residents’ fault and that the city is testing new tools to close gaps quickly. This framing aligns with local media narratives about pantries "bracing" for cuts and trying to prevent hunger-related health crises.[^3][^1][^2]

### Channels and tactics

Key acquisition and engagement channels during the 60-day pilot:

- **Pantry touchpoints** – flyers with QR codes and SMS short codes in waiting areas and distribution lines; volunteers trained to help clients use the tool on their phones.
- **Transit system** – posters or digital signage at bus stops in priority ZIPs, aligning with `/api/challenge/transit` stops to promote routes that lead directly to food resources.
- **Schools and community centers** – especially in ZIPs with high child food insecurity, leveraging existing communication channels (newsletters, robocalls, social media) to share the Navigator link.
- **Local media and social** – brief segments or posts on outlets that have already covered food insecurity and federal cuts to contextualize the pilot and invite participation.[^1][^2][^3]

Success metrics on the Muse side can include unique users by ZIP, repeat usage, conversion from seeing a flyer or post to actually using the Navigator, and survey feedback from residents and pantry staff.

## Judging Rubric Alignment

### Problem understanding

The concept explicitly ties together federal cuts, the role of regional food banks, store closures in already high-poverty, low-vehicle neighborhoods, and the specific needs of Hispanic and car-less households in KC’s highest-need ZIPs. It demonstrates awareness that food insecurity is not just about supply but also about logistics, documentation barriers, language, and transit.[^6][^2][^3][^1]

### Solution quality

KC Food Access Navigator is intentionally narrow and pragmatic, focusing on routing people to existing resources rather than building new food infrastructure. It can be implemented quickly using the provided API, a modern web stack, and hosted LLMs, while generating operational data and insights that the city and partners can use beyond the 60-day pilot.

### Presentation and polish

A high-scoring submission would include a clickable prototype with clear flows for residents, pantry staff, and city viewers, plus a brief technical walkthrough and short pitch deck. Visual clarity (maps, icons, simple forms) and robust error handling (e.g., what happens if no nearby options are open) will be crucial.

### Adaptability and curveball handling

The `/api/challenge/supply-alerts` endpoint is designed for curveballs, such as sudden federal cuts or shipment delays, and the Navigator’s routing logic can gracefully adapt by deprioritizing constrained sites and surfacing alternatives. Additional curveballs (e.g., a bus line outage or sudden closure of a pantry) can be handled by simple configuration flags in the partner dashboard, demonstrating thoughtful resilience.

### AI mastery

The concept demonstrates AI mastery not by overcomplicating the stack but by using LLMs where they add clear value: natural language understanding for resident requests, multilingual support, explanation and outreach message generation, and potential predictive insights about where to extend mobile routes next based on usage patterns. The narrative should emphasize prompt design, safety (no hallucinated locations), and guardrails around data collection.

## Next Steps for Competition Day

For a live competition setting like the AI Prompt Championship Kansas City Regional, the immediate next steps are:

- Build a clickable web demo that calls mock or live versions of the challenge API endpoints and walks through the resident and partner flows.[^4]
- Prepare a short narrative or pitch script that ties the demo directly to KC’s food insecurity headlines and the 60-day pilot framing, using local statistics and stories from reporting to ground the problem.[^2][^3][^1]
- Create 3–5 key screens or slides summarizing the problem, users, solution, and how the Navigator adapts to curveballs, making it easy for judges to score highly across all rubric dimensions.[^4]

---

## References

1. [Kansas City food pantries brace for federal cuts to SNAP benefits as ...](https://www.kcur.org/news/2025-06-05/kansas-city-food-pantries-brace-for-federal-cuts-to-snap-benefits-as-free-food-lines-grow) - Cuts to federal food aid have already reduced the food available at area food pantries and meal site...

2. [Food banks, pantries facing food insecurity, increased demand and ...](https://www.kshb.com/news/local-news/food-banks-pantries-facing-triple-threat-of-food-insecurity-increased-demand-and-federal-cuts) - Harvesters, a regional food bank, is facing a triple threat: food insecurity, increased demand and f...

3. [KC food pantries struggle after demand doubled - The Beacon](https://thebeaconnews.org/stories/2025/11/25/kc-food-pantries-struggle/) - Kansas City food pantries face strain as SNAP disruption and federal cuts create supply shortages am...

4. [AI Prompt Championship — Kansas City Regional | March 28, 2026](https://www.aipromptchamp.com/regional/kansascity-2026) - Live AI prompt engineering competition at KC Digital Drive. Free to enter. Architect, Oracle, and Mu...

5. [Kansas City Regional 2026 | AI Prompt Championship](https://www.kcdigitaldrive.org/event/kansas-city-regional-2026-ai-prompt-championship/) - Event Date: March 28th, 2026. Location: 710 Central St. KC MO. Time: 9:00am – 4:00pm. Admission: Fre...

6. [[PDF] Executive Summary | Hunger Free Kansas](https://hungerfreekansas.org/wp-content/uploads/2023-Environmental-Scon-of-Secondary-Data-Executive-Summary.pdf) - The report looks at data across four domains: 1) demographics, 2) hunger, nutrition and food insecur...

