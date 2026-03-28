# Design System Specification: Civic Utility & Human Precision

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Human Infrastructure."** 

Civic utilities often feel cold, bureaucratic, or neglected. We are rejecting that paradigm in favor of an "Apple-level" finish that treats food access and transit as a premium, high-trust human right. We move beyond the "template" look by utilizing intentional asymmetry—placing bold, oversized route elements against meticulously balanced whitespace. 

The aesthetic is characterized by **Tonal Architecture**: we do not build with lines; we build with light and depth. By layering high-contrast white panels against muted, cool-tinted surfaces, we create a UI that feels like a physical map laid out on a clean architect’s table.

---

## 2. Colors & Surface Logic
Our palette is rooted in the "KC Blue" heritage but elevated through Material-inspired tonal ranges to ensure functional depth.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders (`outline`) for sectioning. Structural boundaries must be defined solely through background color shifts. 
*   Example: A `surface-container-low` section sitting on a `surface` background. 
*   Why: Lines create visual noise; tonal shifts create "zones" that the eye perceives as organized and calm.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of fine paper. 
*   **Base:** `surface` (#f8f9ff)
*   **Low Importance:** `surface-container-low` (#eef4ff)
*   **Standard Containers:** `surface-container` (#e5eeff)
*   **Elevated Content:** `surface-container-highest` (#d1e4ff)
*   **Active Interaction:** `surface-container-lowest` (#ffffff) — Use this for primary white panels to create "pop" against the muted background.

### The "Glass & Gradient" Rule
To avoid a "flat" civic feel, use Glassmorphism for floating navigation bars or transit status overlays.
*   **Token:** `surface` at 80% opacity with a `backdrop-blur` of 20px.
*   **Signature Textures:** Main CTAs or Hero sections should use a subtle linear gradient: `primary` (#006196) to `primary-container` (#007abc) at a 135° angle. This adds "soul" and prevents the blue from feeling like a static block of ink.

---

## 3. Typography
We utilize a dual-typeface system to balance authority with legibility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern, "civic-tech" feel. It conveys confidence. Use `display-lg` for hero route numbers and `headline-md` for station names.
*   **Body & Labels (Inter):** A neutral workhorse. Inter’s tall x-height ensures that food pantry hours and street addresses remain legible even at `body-sm` (0.75rem) on mobile devices.

**Hierarchy as Identity:** 
We use extreme scale contrast. A `display-lg` route identifier (3.5rem) paired with a `label-md` status (0.75rem) creates a sophisticated, editorial look that feels curated rather than crowded.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#eef4ff) section. The delta in luminance creates a soft, natural lift.
*   **Ambient Shadows:** If an element must "float" (e.g., a map toggle), use a custom shadow:
    *   `box-shadow: 0 12px 40px rgba(0, 29, 54, 0.06);` 
    *   Note: The shadow uses a tinted `on-surface` blue-black, not pure grey.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Cards & Lists
*   **Constraint:** Forbid divider lines. 
*   **Solution:** Use `spacing-6` (2rem) of vertical whitespace to separate list items, or alternate background tints between `surface-container-lowest` and `surface-container-low`.
*   **Radii:** Cards must use `radius-lg` (2rem/32px) to feel "human" and approachable.

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Use `radius-full` for a "pill" shape that suggests motion and transit.
*   **Secondary:** `secondary-container` background. No border.
*   **States:** On hover, shift background to `primary-fixed-dim`. 

### Transit-Specific Components
*   **The Route Rail:** A vertical or horizontal element using `route-blue` (#0693E3). It should be 8px thick with `radius-full`, acting as the "spine" of the layout.
*   **Status Chips:** 
    *   *Success:* `success-bg` (#E5F7EF) with `success-ink` (#0F6B43) text.
    *   *Warning:* `warning` (#F3B72F) background with `on-surface` text.

### Input Fields
*   **Style:** Minimalist. Use `surface-container-highest` as a subtle fill. 
*   **Focus:** A 2px "Ghost Border" using `primary` at 40% opacity. Avoid heavy focus rings.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use whitespace as a functional tool to group related food access points.
*   **DO** use `display-lg` typography for single-digit numbers or transit icons to create an editorial "hero" moment.
*   **DO** ensure all touch targets are at least 44px, even if the visual element (like a small chip) is smaller.

### Don't
*   **DON’T** use 1px dividers to separate content. Use a `surface` shift instead.
*   **DON’T** use pure black (#000000) for text. Use `on-surface` (#001d36) to maintain the sophisticated blue-tonal range.
*   **DON’T** use "Default" shadows. If it looks like a standard web shadow, it’s too heavy. Soften and tint it.
*   **DON’T** crowd the edges. The `radius-xl` (3rem) containers require significant internal padding (`spacing-8` or higher) to avoid "visual pinching."