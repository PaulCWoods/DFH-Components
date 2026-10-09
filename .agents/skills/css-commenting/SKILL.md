---
name: css-commenting
description: |
  Comprehensive maintenance, architecture, and standardized commenting guide for Design For Humans CSS stylesheets.
  Enforces consistent file headers, section banners, sub-section dividers, property ordering, token fallbacks, utility shorthand aliases, and accessibility annotations using standard CSS block (/* ... */) comments.
---

# CSS Maintenance & Commenting Guide

All CSS stylesheets across the Design For Humans component library follow a standardized, highly scannable commenting structure and maintenance protocol. Using standard CSS block (`/* ... */`) comments ensures full browser compatibility, strict CSS syntax compliance, and clean developer inspection.

---

## 1. Commenting Architecture & Banner Conventions

### A. Top-of-File Header Banner (80 Columns)
Every `.css` utility, primitive, or component file MUST begin with a top-level banner identifying the module name, architectural role, purpose statement, and relevant WCAG / web standard compliance.

```css
/* ==========================================================================
   Design For Humans: [Component / Utility / Layout Module Name]
   --------------------------------------------------------------------------
   [Concise 1–3 line summary explaining the architectural intent, component role,
    and relevant web standards / WCAG compliance].
   ========================================================================== */
```

#### Example:
```css
/* ==========================================================================
   Design For Humans: Card Primitive
   --------------------------------------------------------------------------
   Composable container foundation with container-fluid cqi typography.
   Supports elevated surfaces, sticky headers/footers, and interactive links.
   Complies with WCAG 2.2 AA/AAA (2.4.7 Focus Visible, 1.4.3 Contrast).
   ========================================================================== */
```

---

### B. Primary Section Header (Double-Line Divider)
Used to delineate major functional sections, component variations, or layout phases within a stylesheet.

```css
/* ==========================================================================
   1. [Section Number & Major Topic Title] (.selector)
   ========================================================================== */
```

#### Example:
```css
/* ==========================================================================
   1. Base Card Container (:where(.card))
   ========================================================================== */
```

---

### C. Sub-Section / Feature Divider (Single-Line Dashed Divider)
Used inside major sections to group related CSS properties, modifiers, interactive states, or container queries.

```css
/* --------------------------------------------------------------------------
   [Feature / Modifier / State Name]
   [Optional 1-line explanation of technical mechanics or behavior]
   -------------------------------------------------------------------------- */
```

#### Example:
```css
/* --------------------------------------------------------------------------
   High-Contrast Focus Visible Perimeter (WCAG 2.4.7 / 2.4.13)
   -------------------------------------------------------------------------- */
```

---

### D. Property Grouping Comments
Within selector blocks, organize CSS properties into logical groups separated by concise inline section comments:

```css
:where(.button) {
    /* Layout & Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    box-sizing: border-box;

    /* Sizing & Touch Targets */
    max-inline-size: 100%;
    min-block-size: var(--button-min-size, var(--spacing-target, 3rem));
    min-inline-size: var(--button-min-size, var(--spacing-target, 3rem));

    /* Spacing */
    gap: var(--button-inner-gap, var(--spacing-12, 0.75rem));
    padding-block: var(--button-padding-block, var(--spacing-4, 0.25rem));
    padding-inline: var(--button-padding-inline, var(--spacing-16, 1rem));

    /* Typography */
    font-family: var(--button-font-family, var(--typography-font-family-sans, sans-serif));
    font-size: var(--button-font-size, var(--typography-font-size-0, 1rem));
    font-weight: var(--button-font-weight, var(--font-weight-bold, 700));
    line-height: var(--button-line-height, 1.25);
    text-decoration: none;
    white-space: nowrap;

    /* Surface, Border & Shape */
    background-color: var(--button-bg, transparent);
    border-radius: var(--button-radius, var(--radius, 0.25rem));
    border: var(--button-border-width, 1px) solid var(--button-border-color, currentColor);
    color: var(--button-text, var(--foreground, currentColor));

    /* Transitions */
    transition: background-color var(--duration-sm, 150ms) ease,
                border-color var(--duration-sm, 150ms) ease,
                box-shadow var(--duration-sm, 150ms) ease;
}
```

---

### E. Local Private Component Variables (`--_<component>-*`)
To keep component stylesheets clean, performant, and easily discoverable, define a private variable manifest (`--_<component>-*`) at the root of the base component selector.

#### Advantages of the Local Private Variables Pattern:
1. **Single Source of Fallbacks:** Resolves the public token ladder (`var(--accordion-property, var(--panel-property, <fallback>))`) once at the component root.
2. **Lean Modifiers:** Modifiers only need to re-assign private variables (e.g., `--_accordion-padding-inline: 0; --_accordion-radius: 0;`) instead of repeating long property declarations or deeply nested child resets.
3. **No Selector Repetition:** Child elements and pseudo-elements (`summary`, `::details-content`, `.accordion__icon`) cleanly consume `var(--_accordion-*)` without needing extra modifier selectors.
4. **Per-Instance Scope & Reset:** Scoped cleanly to each component instance without leaking into nested child elements.
5. **Self-Documenting API:** Developers can immediately see every customizable property by reading the top of the component file.

#### Canonical Example:
```css
:where(details.accordion) {
    /* --------------------------------------------------------------------------
       Local Private Variables (Defaults & Fallback Ladder)
       -------------------------------------------------------------------------- */
    --_accordion-border-color: var(--accordion-border-color, var(--panel-border-color, currentColor));
    --_accordion-border-style: var(--accordion-border-style, var(--panel-border-style, solid));
    --_accordion-border-width: var(--accordion-border-width, var(--panel-border-width, 1px));
    --_accordion-hover-border-color: var(--accordion-hover-border, var(--border-color-accent, currentColor));
    --_accordion-icon-size: var(--accordion-icon-size, 0.875rem);
    --_accordion-icon-stroke: var(--accordion-icon-stroke, var(--border-width, 1px));
    --_accordion-inner-border-color: var(--accordion-inner-border-color, var(--rule-color, currentColor));
    --_accordion-inner-border-style: var(--accordion-inner-border-style, var(--rule-style, solid));
    --_accordion-inner-border-width: var(--accordion-inner-border-width, var(--rule-width, 1px));
    --_accordion-open-bg: var(--accordion-open-bg, var(--surface-card, transparent));
    --_accordion-padding-block: var(--accordion-padding-block, var(--accordion-padding, var(--spacing, 1rem)));
    --_accordion-padding-inline: var(--accordion-padding-inline, var(--accordion-padding, var(--spacing, 1rem)));
    --_accordion-radius: var(--accordion-radius, var(--panel-radius, 0.25rem));
    --_accordion-summary-color: var(--accordion-summary-color, var(--foreground, currentColor));
    --_accordion-summary-font-family: var(--accordion-summary-font-family, var(--typography-font-family-sans, sans-serif));
    --_accordion-summary-font-size: var(--accordion-summary-font-size, var(--typography-font-size-0, 1rem));
    --_accordion-summary-font-weight: var(--accordion-summary-font-weight, var(--font-weight-bold, 700));
    --_accordion-summary-gap: var(--accordion-summary-gap, var(--spacing, 1rem));
    --_accordion-timefunc: var(--accordion-timefunc, var(--timefunc-ease-in-out, ease-in-out));
    --_accordion-transition: var(--accordion-transition, var(--duration-sm, 150ms));

    /* Surface, Border & Shape */
    border: var(--_accordion-border-width) var(--_accordion-border-style) var(--_accordion-border-color);
    border-radius: var(--_accordion-radius);
}

/* Modifiers cleanly reassign private variables */
:where(details.accordion--flush) {
    --_accordion-padding-inline: 0;
    --_accordion-radius: 0;
    border-inline: 0;
}
```

---

### F. Inline Property Annotations
Use compact inline comments for non-obvious calculations, browser constraints, accessibility fallbacks, or container query thresholds:

```css
min-block-size: var(--spacing-target, 3rem); /* 48px touch target (WCAG 2.5.5) */
text-box: trim-both cap alphabetic;          /* Leading-trim baseline alignment */
```

---

## 2. Utility & Shorthand Aliases

All utility classes must be wrapped in `:where()` to maintain zero specificity (0,0,0) and include standard shorthand aliases:

### A. Border Utilities
- **Full Border:** `:where(.border, .bd)`
- **Border Sizes:** `:where(.border-sm, .bd-sm)`, `:where(.border-md, .bd-md)`, `:where(.border-lg, .bd-lg)`
- **Directional Sides:**
  - Block Start (Top): `:where(.border-top, .bt)` (+ `-sm`, `-md`, `-lg`)
  - Block End (Bottom): `:where(.border-bottom, .bb)` (+ `-sm`, `-md`, `-lg`)
  - Inline Start (Left in LTR): `:where(.border-left, .bl)` (+ `-sm`, `-md`, `-lg`)
  - Inline End (Right in LTR): `:where(.border-right, .br)` (+ `-sm`, `-md`, `-lg`)
- **Border Colors:** `:where(.border-muted, .border-color-muted, .bd-muted)`, `:where(.border-quiet, .border-color-quiet, .bd-quiet)`
- **Border Styles:** `:where(.border-dashed, .bd-dashed)`, `:where(.border-dotted, .bd-dotted)`, `:where(.border-double, .bd-double)`, `:where(.border-solid, .bd-solid)`
- **Corner Radii:** `:where(.radius, .rounded)`, `:where(.radius-none, .rounded-none)`, `:where(.radius-sm, .rounded-sm)`, `:where(.radius-md, .rounded-md)`, `:where(.radius-lg, .rounded-lg)`, `:where(.radius-round, .rounded-round, .rounded-full)`

### B. Spacing & Margin/Padding Utilities
- **Margin All Sides:** `:where(.margin, .mg)` (+ `-0`, `-sm`, `-md`, `-lg`, `-breathe`)
- **Padding All Sides:** `:where(.padding, .pd)` (+ `-0`, `-sm`, `-md`, `-lg`, `-breathe`, `-cushion`)
- **2-Sided Axes (Exclusively Logical):**
  - Horizontal: `:where(.margin-inline, .mx)` and `:where(.padding-inline, .px)`
  - Vertical: `:where(.margin-block, .my)` and `:where(.padding-block, .py)`
  - *Note:* **Do NOT create compound physical classes like `margin-top-bottom` or `margin-left-right`** (logical `margin-block` / `margin-inline` suffice).
- **Individual Directional Sides:**
  - Margin: `:where(.margin-top, .mt)`, `:where(.margin-bottom, .mb)`, `:where(.margin-left, .ml)`, `:where(.margin-right, .mr)`
  - Padding: `:where(.padding-top, .pt)`, `:where(.padding-bottom, .pb)`, `:where(.padding-left, .pl)`, `:where(.padding-right, .pr)`

---

## 3. File Organization & Architecture

- **Page-Flow Order:** Keep sections in page-flow order: shell, navigation, title/meta, media, main content, supporting content, and exploration/progression.
- **Section Headings:** Use one clear divider per section and short headings that describe the rendered responsibility.
- **Co-located Modifiers:** Keep component modifiers and their nested states beside the component they modify.
- **Scoped Overrides:** Keep WordPress/editor overrides nested under the page component that owns them; this limits specificity and prevents style leakage.
- **Predictable Index Order:** Order the component index alphabetically by imported filename so the source order is predictable and easy to scan.
- **Base Selector First:** Keep the base selector first, followed immediately by its modifiers, variants, child parts, and responsive or preference states.

---

## 4. Formatting & Code Rules

- **Indentation & Braces:** Use four spaces for indentation and preserve the existing brace style.
- **Declaration Order:** Order declarations consistently: layout/display, sizing, spacing, typography, surface/border, positioning, then interaction/animation.
- **Logical Properties:** Use logical properties (`inline-size`, `block-size`, `margin-block`, `padding-inline`, `inset-block`, `inset-inline`) for writing-mode and responsive safety.
- **Physical Properties for Icons:** Use physical properties (`width`, `height`, `top`, `left`, etc.) only for icon glyphs and fixed-orientation graphics where the geometry must stay fixed regardless of writing mode.
- **Token Priority:** Prefer existing design tokens (`var(--...)`, `var(--spacing-...)`) over new literal values.
- **Token Fallbacks:** Give component-facing custom properties a valid, property-appropriate fallback so a missing token does not invalidate the declaration. Prefer a nested chain from component token to semantic token to a simple CSS default, for example:
  ```css
  padding: var(--card-padding, var(--spacing-breathe, 1rem));
  ```
- **Neutral Fallbacks:** Choose neutral fallbacks that preserve usability:
  - `currentColor` for borders and text
  - `1px` for border widths
  - `transparent` for optional surfaces
  - `none` for shadows, filters, and animations
  - `auto` for intrinsic sizing
  - `inherit` or `normal` for typography
- **Spacing & Math Fallbacks:** For spacing and timing, prefer an existing token first, then a conservative unit value; for ratios use `1` or another neutral value that keeps calculations valid. Ensure every custom property inside `calc()` or another compound value has a fallback too.
- **Grammar Safety:** Keep fallbacks compatible with the consuming property's grammar, and avoid self-referential or duplicate fallbacks such as `var(--token, var(--token))`.
- **Purposeful Comments:** Keep comments short and explain constraints, browser fallbacks, specificity decisions, or non-obvious layout math rather than narrating declarations.

---

## 5. Modern Web Techniques & Standards

- **Behavior Preservation:** Preserve behavior during cleanup by keeping selectors, values, nesting, media queries, and rule order intact unless a cascade change is intentional.
- **Progressive Enhancement:** Use `@supports` for progressive enhancement so the base layout remains functional without modern features like scroll-driven animations or base-select.
- **Specificity Control:** Use `:is()` and `:where()` to share rules while deliberately controlling specificity (prefer `:where()` for zero-specificity primitives and utility helpers).
- **Mobile & Inset Resilience:** Use logical sizing and safe-area insets (`env(safe-area-inset-*)`) for resilient mobile layouts.
- **Layout Primitives:** Use grid for 2D layouts / content-aside relationships and flexbox for 1D flows (`.stack`, `.inline`, `.cluster`, `.split`).
- **Media Stability:** Use stable aspect ratios (`aspect-ratio: ...`) and overflow rules (`overflow: clip` / `overflow: auto`) for embedded media and sticky regions.
- **Touch Targets:** Maintain WCAG 2.5.8 (min 24×24px with 4px target spacing) and WCAG 2.5.5 (48×48px minimum target size for primary touch actions).
- **Focus Rings:** Ensure high-contrast focus rings (`:focus-visible`) meet WCAG 2.4.7 / 2.4.13 with 3:1 contrast against adjacent backgrounds.
- **Build Verification:** Verify Storybook component builds (`npm run build:storybook`) to ensure 0 syntax or cascade errors.
