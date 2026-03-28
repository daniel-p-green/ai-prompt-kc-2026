# KC Streetcar Brand Guide

Date: 2026-03-28
Repository: ai-prompt-kc-2026
Source basis: `https://kcstreetcar.org`, current public CSS/theme audit, `docs/reference/kc-streetcar/posts/kc-streetcar-brand-revealed/index.md`, and KC Streetcar public wrap/media collateral

## Purpose

This is a practical brand extraction, not an official KC Streetcar standards manual.

Use it when the team needs to borrow the public-facing KC Streetcar look and tone for Muse work, especially where StreetCart KC should feel:

- Kansas City-native
- civic, not startup
- useful before decorative
- proud without being loud

## What The Brand Is

KC Streetcar presents itself as a modern civic utility with strong local pride.

The identity is built around:

- simple transit language
- confident service messaging
- a small, disciplined visual system
- clear route-and-neighborhood orientation
- public-trust signals over promotional flash

The official 2014 brand reveal matters here: the system was described as a classic, globally legible transit identity with an open, friendly feel, and the approved palette was framed as timeless, sophisticated, progressive, and confident.

## Brand Thesis

If you condense the site into one sentence, it is this:

> Kansas City has a free, reliable, city-shaping streetcar system that helps people move through the city with confidence.

That means the brand should always read as:

- public infrastructure first
- city connector second
- cultural energy third

Not the other way around.

## Personality

### Core traits

- Clear
- Civic
- Dependable
- Welcoming
- Confident
- Local

### Tone rules

- Lead with service, access, and route clarity.
- Use short, declarative lines.
- Sound proud of Kansas City without slipping into boosterism.
- Be friendly, but never cute or overly casual.
- Prefer "here is how to ride" over "discover an amazing experience."

### Good tone examples from the site

- `RUNNING DAILY. ALWAYS FREE.`
- `Running from the River Market to UMKC`
- `Explore the Route`
- `How to Ride`
- `Hours of Operation`

### Tone to avoid

- startup disruption language
- smart-city jargon
- luxury-travel language
- playful mascot energy
- dense institutional copy on primary surfaces

## Messaging Hierarchy

When the brand communicates, the priority order is consistent:

1. Service status or utility
2. Route or destination clarity
3. Access benefit
4. Community or neighborhood context
5. Events, promotions, or culture

That is why the homepage leads with fare-free, daily service and route coverage before news, social, or FAQ content.

## Visual System

### Overall posture

The site uses a narrow visual system on purpose.

The strongest pattern is:

- white structural framing
- KC Streetcar blue as the main signal color
- darker blue for hover, emphasis, and depth
- light gray for relief sections
- white text on blue utility surfaces
- dark neutral body copy

### Core palette

These values are directly visible in the public theme CSS.

| Token | Hex | Role |
|---|---|---|
| KC Streetcar Blue | `#0082D6` | Primary brand color, headings, nav band, CTA fills, utility modules |
| Deep Route Blue | `#015890` | Hover state, deeper emphasis, footer/link hover, active depth |
| Light Platform Gray | `#F4F4F4` | Section background, search/utilities, breathing space |
| Body Charcoal-Brown | `#392F2B` | Long-form body copy and FAQ answer text |
| White | `#FFFFFF` | Header field, contrast text on blue, open space |
| Accent Yellow | `#F4CE3C` | Limited alert/highlight use in announcement modules |
| Placeholder Gray | `#A9A8AB` | Form placeholder/supporting field text |

### Official palette direction from KC Streetcar materials

The 2014 brand reveal also calls out:

- interior palette: cobalt blue and silver
- exterior palette: pearl, silver, and graphite

Use that as a strategic interpretation rule:

- keep the system cool, metallic, and clean
- avoid warm, earthy, handmade palettes as the primary identity
- treat bright accent colors as secondary, not the base system

## Typography

### Heading and label face

Use `HalisR` for:

- headlines
- navigation
- section titles
- CTA labels
- service-facing UI labels

Observed site pattern:

- `HalisR` 700 for most headers and navigation
- `HalisR` 900 for large hero emphasis
- common sizes: `48px` for `h1`, `30px` for `h2`, `24px` for `h3`, `18px` for `h4`

This face carries the civic-transit personality. It feels geometric, assertive, and operational.

### Body face

Use `AvenirLTStd-Book` for:

- paragraphs
- explanatory copy
- longer rider guidance
- descriptive support text

Observed site pattern:

- body text at `16px`
- line height around `25.6px`
- light weight appearance (`300`)

That combination keeps the site readable and reduces visual noise under the louder heading system.

### Type behavior

- Use uppercase sparingly for hero statements and operational emphasis.
- Keep most section headings in title case or sentence case.
- Make labels short.
- Avoid decorative display typography beyond the HalisR headline system.

## Layout Principles

### Structural pattern

The website repeatedly uses this rhythm:

1. Fixed white header
2. Blue navigation/action band
3. Large visual hero or content lead
4. Simple action modules
5. White or light-gray content sections
6. Blue footer/contact block

### Composition rules

- Build with strong horizontal bands, not floating cards.
- Favor full-width sections over contained marketing tiles.
- Use large image-led hero zones to establish place.
- Keep corners mostly square. Do not soften everything with pills and rounded cards.
- Use generous spacing, but not luxury-brand emptiness.

### Grid and modules

- Think in route stops, utility panels, and public-information blocks.
- Surface only a few actions at a time.
- Favor side-by-side utility modules with icon + text + link.
- Keep FAQ and support content plainly structured.

## Graphic Motifs

The recurring visual language is transit-derived rather than abstract.

Use:

- route lines
- directional stripes
- signage-inspired bars
- map/path cues
- stop markers
- simple pictograms
- system-style dividers

Do not use:

- glossy 3D effects
- soft startup gradients
- floating glassmorphism panels
- abstract blob shapes
- playful sticker packs

## Photography And Imagery

### What fits

- real streetcar vehicles
- platforms and tracks
- streetscape context
- Kansas City neighborhoods along the line
- riders in believable transit situations
- civic events and corridor activity

### Image posture

- useful and place-specific
- bright, legible, and documentary
- more "city in motion" than "brand lifestyle"

### Avoid

- generic smiling group shots
- stock-tech metaphors
- overly polished corporate-office imagery
- imagery that hides the vehicle, route, or place context

## UI And Component Patterns

### Navigation

- White header frame
- Blue main navigation band
- White nav text in `HalisR`
- Deep blue hover state

This is one of the most recognizable parts of the current system.

### Buttons and CTAs

Observed pattern:

- filled blue button
- white label text
- `HalisR` bold label
- darker blue on hover
- low-radius or nearly square shape

Use CTAs as utility actions, not as hype devices.

### Utility tiles

Homepage action blocks like route, arrivals, and hours all follow the same logic:

- icon or simple graphic
- one short title
- obvious click target
- no extra copy unless necessary

### FAQ pattern

- large blue question text
- plain answer copy underneath
- minimal expand/collapse treatment

### Footer

- solid blue base
- white text and icons
- contact-first content
- informational, not ornamental

## Voice Rules For New Work

When writing in this brand, prefer copy like:

- `Ride free from River Market to UMKC.`
- `Check arrivals before you head to the platform.`
- `Plan your trip along the route.`
- `Service updates and rider information.`

Prefer verbs like:

- ride
- connect
- explore
- plan
- check
- follow
- learn

Avoid phrases like:

- reimagining mobility
- unlocking the future
- frictionless transportation experience
- vibrant lifestyle ecosystem
- transit redefined

## Do / Don't

### Do

- Lead with access, route, frequency, and usefulness.
- Keep the brand visually disciplined.
- Use blue as the hero color, not one option among many.
- Use HalisR to make headers feel public and legible.
- Let Kansas City location context do the emotional work.

### Don't

- Turn the identity into a festival poster.
- Add extra palette colors unless they solve a specific information problem.
- Replace the transit logic with generic civic-tech styling.
- Overwrite the public-service tone with ad-speak.
- Make every surface promotional.

## Application Notes For StreetCart KC

If StreetCart KC borrows from this system, keep the borrow selective.

Borrow:

- the civic utility posture
- the transit-blue anchor
- the HalisR + Avenir split
- route-line and stop-marker graphic logic
- concise, service-first copy

Do not copy directly:

- the KC Streetcar name lockup
- RideKC system naming
- exact vehicle applications
- transit-service claims that do not belong to StreetCart KC

For Muse, the right translation is:

- KC Streetcar gives the civic frame
- StreetCart KC adds food-access proof
- the result should feel like a trusted city-facing program, not a novelty campaign

## Assumptions And Limits

- This guide is inferred from the public site and public reference collateral on `2026-03-28`.
- It is a reverse-engineered operating guide for project use, not an official legal brand manual.
- Exact logo construction, exclusion zones, and formal asset permissions are not defined here.
- If official KC Streetcar brand files appear later, those should override any inferred rule in this document.

## Source Notes

- Live site audited: `https://kcstreetcar.org/`
- About page snapshot: `docs/reference/kc-streetcar/pages/about-streetcar/index.md`
- How to Ride snapshot: `docs/reference/kc-streetcar/pages/how-to-ride/index.md`
- Route snapshot: `docs/reference/kc-streetcar/pages/route/index.md`
- Brand reveal snapshot: `docs/reference/kc-streetcar/posts/kc-streetcar-brand-revealed/index.md`
- Theme CSS audited: `https://kcstreetcar.org/wp-content/themes/kcsc/stylesheets/screen.css?ver=6.9.4`
