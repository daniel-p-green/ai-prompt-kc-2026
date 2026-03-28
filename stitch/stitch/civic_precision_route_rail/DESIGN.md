# Design System: Civic Utility & Human Precision

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Blueprint."** 

This system rejects the "template" look of modern SaaS in favor of an editorial, high-precision aesthetic that mirrors the efficiency of public transit and the high-stakes energy of professional sports. We are building "Public infrastructure with obsessive craft." The layout is characterized by intentional asymmetry—using heavy-weighted headlines pushed to the margins—and significant whitespace that acts as a structural element rather than just a gap. We move away from soft, organic shapes toward a rigid, engineered elegance.

---

## 2. Colors
Our palette is rooted in the civic identity of Kansas City, utilizing high-contrast blue tones to represent reliability, punctuated by "Competition Accents" that denote tournament activity.

### The Core Palette
- **Primary (KC Streetcar Blue):** `#005f9e` (derived from `#0082D6`). The pulse of the system.
- **Secondary (Deep Route Blue):** `#19629a` (derived from `#015890`). Used for navigation and structural grounding.
- **Tertiary (Tournament Red):** `#bb0027`. Reserved strictly for critical tournament actions or bracket highlights.
- **Surface Tiers:** 
  - `surface`: `#f8f9fa` (The Base)
  - `surface_container_low`: `#f3f4f5` (Subtle sectioning)
  - `surface_container_highest`: `#e1e3e4` (Deep contrast panels)

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited.** To define boundaries, designers must use tonal shifts. A `surface_container_lowest` (#ffffff) card must sit on a `surface_container_low` (#f3f4f5) background to create definition. If a section needs to feel "heavy," shift the entire background to `surface_dim`.

### Tournament Accents (Strict Use Only)
Use the following tokens exclusively for team-specific data, brackets, or scoreboard components:
- **Chiefs Red:** `tertiary` (#bb0027)
- **Royals Blue:** `primary_container` (#0078c7)
- **Sporting Teal:** Custom utility token (to be used sparingly for "Active" states).
- **Current Red:** `on_tertiary_fixed_variant` (#92001d).

---

## 3. Typography
The typographic voice is "Authoritative Editorial." We pair the geometric precision of **Manrope** with the neutral, high-legibility functionality of **Inter**.

- **Display & Headlines (Manrope):** Use for impact. Headlines should utilize `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to mimic architectural signage.
- **Body & Labels (Inter):** Use for all utility and data-dense areas. Inter provides the "utility" feel needed for public transit-themed interfaces.
- **High-Contrast Scoreboard Numbers:** Use Manrope Bold for all KPI and numeric data. Numbers should be 1.5x the size of their accompanying labels to ensure "Scoreboard" readability.

---

## 4. Elevation & Depth
In alignment with the "Public Infrastructure" theme, we avoid "soft" UI trends. There is no glassmorphism and no traditional drop shadows.

### The Layering Principle
Depth is achieved through **Tonal Stacking**. 
1. **Level 0 (Base):** `surface`
2. **Level 1 (Sections):** `surface_container_low`
3. **Level 2 (Interactive Panels):** `surface_container_lowest` (Pure White)

### The "Route Rail" Shadow
When a floating element is required (e.g., a "Route Rail" navigation bar), use a sharp, highly technical shadow:
- **Style:** 0px offset, 0px blur, 4px spread.
- **Color:** `primary` at 10% opacity. 
- This creates a "blueprint" depth rather than a "cloud" depth.

### The "Ghost Border" Fallback
If accessibility requires a container edge in high-glare environments, use the `outline_variant` token at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Route Rail (Primary Navigation)
A vertical or horizontal bar using `primary` (#005f9e) as the background. Active states are indicated by a high-contrast white "indicator line" that mimics streetcar tracks. No rounded corners on the rail—keep it architectural.

### KPI Cards (Data Dense)
- **Background:** `surface_container_lowest` (#ffffff).
- **Header:** `label-sm` in all-caps using `outline`.
- **Value:** `display-sm` (Manrope) in `on_surface`.
- **Layout:** Asymmetrical. The value is flush-left; the trend indicator is top-right. No dividers.

### High-Contrast Scoreboards
Used for the food access tournament brackets.
- **Fill:** `inverse_surface` (#2e3132).
- **Text:** `inverse_on_surface` (#f0f1f2).
- **Accent:** 4px left-border using the specific sports team color (e.g., Chiefs Red).

### Buttons
- **Primary:** Solid `primary` fill, `on_primary` text. `radius-sm` (0.125rem). Square edges feel more like utility hardware.
- **Secondary:** Tonal shift only. `surface_container_high` fill with `primary` text.
- **Tournament Action:** `tertiary` fill. Use only for "Start Match" or "Submit Donation."

### Inputs & Fields
- **Background:** `surface_container_highest`. 
- **Active State:** A 2px bottom-bar of `primary`. No full-box focus rings.

---

## 6. Do's and Don'ts

### Do
- **Use Intentional Asymmetry:** Align text to a 12-column grid, but leave columns 1-3 empty for "editorial breathing room" in hero sections.
- **Embrace High Contrast:** Use pure white (#ffffff) panels against `surface_dim` to draw focus to data.
- **Treat Typography as UI:** Large numbers are more effective than icons for conveying "status."

### Don't
- **No Soft Shadows:** Never use a shadow with a blur radius higher than 8px. It softens the "Infrastructure" vibe.
- **No 1px Dividers:** Never use lines to separate list items. Use 1.4rem (`spacing-4`) of vertical whitespace or a subtle toggle between `surface` and `surface_container_low`.
- **No Glassmorphism:** Background blurs are too "tech-startup." This system is about "Civic Utility"—it should feel solid, grounded, and permanent.
- **No Centered Layouts:** Avoid centering content. High-end editorial design is almost always flush-left or justified to a specific grid line.