# BRAND.md

## Product

KC Streetcar Food Access Tracker

This is a public-facing civic utility surface. It should feel as polished as a premium Apple page, but not luxurious, playful, or brand-performative. The right read is: public infrastructure with obsessive craft.

## Brand Thesis

The interface should make Kansas City transit feel calm, precise, and trustworthy. The user should feel like the app already knows the one decision they need to make next and is presenting it without noise.

## Visual Direction

- Tone: civic, modern, confident, human
- Emotional read: useful first, elegant second
- Design posture: strong framing, clean geometry, very little visual clutter
- Anti-patterns: generic transit dashboard, glassmorphism, busy maps, oversized pills everywhere, playful illustrations, purple gradients

## Color System

Use the KC Streetcar palette as the base system:

- `--brand-blue: #0081C6`
- `--brand-navy: #004987`
- `--route-blue: #0693E3`
- `--surface: #FFFFFF`
- `--surface-muted: #F7FBFE`
- `--ink-strong: #0E3558`
- `--ink: #4D6985`
- `--line: rgba(18, 50, 77, 0.08)`
- `--warning: #F3B72F`
- `--error: #C2410C`
- `--success-bg: #E5F7EF`
- `--success-ink: #0F6B43`

Rules:

- Hero and route rail use blue/navy.
- Primary information panels stay white.
- Use color to direct attention, not decorate everything.
- Keep contrast comfortably WCAG AA or better.

## Typography

Target feel:

- Headlines: geometric, assertive, transit-signage energy
- Body: clean, neutral, highly readable

Recommended stack:

- Display / headings: `Avenir Next`, `Inter`, `Segoe UI`, sans-serif
- Body: `Avenir Next`, `Open Sans`, `Segoe UI`, sans-serif

Type scale:

- Hero title: `56-72px`, `0.94-1.0` line height, bold
- Section heading: `30-36px`, bold
- Panel heading: `22-26px`, semibold/bold
- Card heading: `18-20px`, semibold
- Body: `16-18px`, `1.5-1.65` line height
- Labels / eyebrow copy: `11-12px`, uppercase, `0.1-0.14em` letter spacing

Rules:

- Short labels
- No decorative display type
- Avoid long paragraphs in the UI
- Use big type for the one thing the user needs now

## Layout + Spacing

Desktop target:

- Max content width: `1440-1480px`
- Outer page padding: `24px`
- Major module gap: `18px`
- Primary radius: `22-28px`
- Secondary radius: `16-22px`

Module rules:

- Hero is one large band, not a card mosaic
- Route rail is a distinct anchored column
- Main content is two large panels: arrivals and food access
- Stats sit in a tight, even rhythm
- Let whitespace create confidence; do not fill every gap

## Motion

- Hover / selection: `150-180ms`, ease-out
- Panel/filter transitions: `180-220ms`
- No bounce, no parallax, no showy entrance animation
- Motion exists to confirm state change, never to entertain

## Component Specs

### Hero

- Blue gradient or blue field with restrained depth
- Strong title, one-sentence utility statement, two clear actions
- Right-side stat stack on desktop
- Must still feel composed when text wraps on mobile

### Route rail

- Ordered north to south
- Each stop card shows: order number, stop name, next live summary, nearby food count
- Selected stop must be obvious without harsh contrast tricks
- Rail should feel like a transit object, not a marketing sidebar

### Stop summary

- Show selected stop name first
- Show exact stop label beneath
- Show two small badges: nearby places count, last live update
- Never crowd this module

### Arrival cards

- Lead with direction and next countdown
- Show next 2-3 predictions cleanly
- Occupancy badges should be soft and readable
- Empty state must say what is missing without implying the app is broken

### Food cards

- Lead with category and distance
- Name must be prominent
- Address and source should feel secondary
- Card grid should feel airy, not dense

### Filters

- Short labels only
- Clear active state
- No fancy segmented-control styling if it weakens readability

### Alerts and failure states

- Alerts use warning yellow as an accent, not a full screaming banner
- Failure state should say live data is unavailable but leave the rest of the page useful
- Never collapse the page into an error wall

## Copy Style

- Declarative
- Helpful
- Confident
- Never cute

Good examples:

- `Next streetcars`
- `Walkable and short-hop options`
- `Updated 1:06 PM`
- `No current prediction for this direction.`

Avoid:

- marketing slogans
- startup jargon
- transit jargon without translation
- over-explaining obvious UI

## QA Standard

Do not ship if any of these are true:

- the first viewport looks busy or generic
- the route rail feels like admin software
- filter or stop changes cause jumpy reflow
- empty states look accidental
- mobile collapses into stacked clutter
- the page is technically correct but aesthetically weak
