# KC Challenge Data Brief

Source: https://aipromptchamp.com/challenge/print/data-brief.html
Retrieved: 2026-03-28

## Event

- AI Prompt Championship
- KC Regional Data Brief
- Date: March 28, 2026
- Venue: KC Digital Drive, 710 Central St, Kansas City, MO
- API base URL: `https://aipromptchamp.com/api`

## The Challenge

Kansas City has a food access problem. Two grocery stores closed last year. The city's main food bank lost **3 million pounds** from federal cuts. **1 in 7 Kansas Citians are food insecure** at a 10-year high.

The city put **$500,000** on the table. You have $500K revenue, $150K opex, and **60 days** to prove it works. **You are that company.**

## Three Tracks

### The Architect

Build the Product

- Build a working tool for KC food access
- Dashboard, app, alert system, pantry finder
- Judges: Does it work? Would people use it?

### The Oracle

Build the Business

- Business plan plus financial model
- How $500K gets spent, 60-day plan
- Judges: Does the math work? Is it data-driven?

### The Muse

Build the Brand and Get Users

- Go-to-market strategy
- Audience, channels, materials, budget
- Judges: Do you know your audience?

## Challenge Data API

Base URL: `https://aipromptchamp.com/api`

Notes:

- All endpoints return JSON
- Optional but powerful
- CORS enabled

| Endpoint | Returns | Filters |
| --- | --- | --- |
| `/api/challenge/311-calls` | Housing and utility distress by ZIP (13 ZIPs) | `?zip=` |
| `/api/challenge/pantries` | 12 pantry locations, hours, language, ID requirements, cold storage, routes | `?zip=` `?language=` |
| `/api/challenge/food-atlas` | USDA food desert status by census tract | `?zip=` |
| `/api/challenge/store-closures` | 4 grocery store closures (2024-2025) | None |
| `/api/challenge/transit` | 8 bus stops near food resources | `?near=lat,lng` |
| `/api/challenge/demographics` | Census data: poverty, Hispanic percentage, no vehicle (12 ZIPs) | `?zip=` |
| `/api/challenge/supply-alerts` | Federal supply status, with updates at curveball | None |
| `/api/challenge/harvest` | After the Harvest KC priority ZIPs (8 areas) | None |

## Key Data Highlights

### Store Closures (2024-2025)

| Store | ZIP | Closed | Impact |
| --- | --- | --- | --- |
| Save-A-Lot, Prospect | 64127 | Aug 2024 | 12,400 people |
| Price Chopper, Blue Pkwy | 64130 | Nov 2024 | 18,700 people |
| Aldi, Independence | 64124 | Feb 2025 | 9,200 people |
| Dollar General Market | 64128 | Jun 2025 | 6,100 people |

### Highest-Need ZIPs

| ZIP | Poverty | Hispanic % | No Car | Food Insecurity |
| --- | --- | --- | --- | --- |
| 66101 | 44.6% | 62.8% | 48% | 24.1% |
| 64127 | 41.3% | 28.6% | 45% | 21.4% |
| 66105 | 39.8% | 71.4% | 51% | 22.6% |
| 64130 | 38.2% | 12.4% | 38% | 18.2% |
| 64128 | 35.7% | 8.9% | 42% | 16.8% |
| 64132 | 33.1% | 10.2% | 39% | 17.1% |

## Food Pantry and Resource Locations

| Name | ZIP | Hours | Languages | ID Required | Cold Storage | Type |
| --- | --- | --- | --- | --- | --- | --- |
| Harvesters Community Food Network | 64129 | Mon-Fri 8a-4p | EN, ES | No | Industrial | Food Bank |
| Bishop Sullivan Center | 64110 | Mon, Wed, Fri 9a-12p | EN, ES | No | No | Pantry |
| Guadalupe Centers | 64108 | Tue, Thu 10a-2p | ES, EN | No | Fridge | Pantry |
| Reconciliation Services | 64109 | Mon-Fri 9a-3p | EN | Yes | No | Pantry |
| Community Assistance Council | 64134 | Mon-Thu 9a-3p | EN | Yes | Walk-in | Pantry |
| Salvation Army KC | 64111 | Mon, Wed 10a-1p | EN, ES | No | No | Pantry |
| Della Lamb Community Services | 64106 | Mon-Fri 8:30a-4:30p | EN, ES+ | No | Fridge | Refugee Services |
| Sheffield Place | 64126 | Mon-Fri 7a-7p | EN | No | No | Shelter |
| After the Harvest KC | various* | Schedule varies | EN, ES | No | No** | Mobile Distribution |
| Crosslines Community Outreach | 66105 | Mon-Fri 9a-3p | EN, ES | Yes | Walk-in | Pantry |
| KC Community Gardens | 64132 | Seasonal | EN | No | No | Garden |
| El Centro Academy | 66101 | Mon-Fri (school) | ES, EN | No | No*** | School |

Notes:

- `*` Routes: 64127, 64130, 66101, 66105 (Tue/Thu and Wed/Fri)
- `**` Mobile distribution must partner with cold storage sites
- `***` School pantry is non-perishables only unless same-day

## Scoring Rubric

| Dimension | What Judges Evaluate | Weight |
| --- | --- | --- |
| Problem Understanding | Did you understand the problem? Do you know the users and what they need? | /5 |
| Solution Quality | Is it good? Would it work? Is the thinking sound? | /5 |
| Presentation and Polish | Well-built and clearly presented? Can judges interact with it? | /5 |
| Adaptability | How did you respond to the curveball? Rethink or bolt-on? | /5 |
| AI Mastery | Did you direct AI creatively? Evidence of iteration? | /5 |

Each dimension is scored 1-5. Total score is /25 per judge x 4 = /100.

Scale:

- 1 = didn't address
- 2 = significant gaps
- 3 = adequate
- 4 = strong
- 5 = exceptional

## Schedule

| Time | Activity |
| --- | --- |
| 9:00 AM | Registration and Coffee |
| 9:30 AM | Opening Ceremony |
| 10:00 AM | Challenge Goes Live |
| 10:00-12:00 | Block 1: Build |
| 12:00-1:00 | Lunch (provided) |
| 1:00 PM | Curveball |
| 1:00-2:30 | Block 2: Continue and Adapt |
| 2:30 PM | Submissions Due |
| 3:00-3:45 | Tradeshow Judging |
| 3:45-4:30 | Finals and Awards |

## Submission

- Submit at: `https://aipromptchamp.com/regional/kansascity-2026/challenge`
- Deadline: 2:30 PM sharp
- Instruction: Scan the QR code on screen or type the URL

## Footer

AI Prompt Championship, aipromptchamp.com, organized by Unified Esports Association.
