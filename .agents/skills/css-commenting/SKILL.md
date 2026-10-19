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

### E. Local Private Component Variables (`--_<component>-*`) & State Variable Contract
To keep component stylesheets clean, performant, and easily discoverable, define a private variable manifest (`--_<component>-*`) at the root of the base component selector.

#### Advantages of the Local Private Variables Pattern:
1. **Single Source of Fallbacks:** Resolves the public token ladder (`var(--button-bg, transparent)`) once at the component root.
2. **Lean Modifiers as Pure Token Maps:** Modifiers (`.button--primary`, `.button--subtle`) only re-assign private variables instead of repeating CSS property declarations or deep selectors.
3. **Single-Source State Handling:** Declares `:hover` and `:active` rules **strictly once** in the base selector, consuming `--_<component>-hover-*` and `--_<component>-active-*` properties. Modifiers never duplicate `@media (hover: hover) { &:hover { ... } }` or `&:active { ... }` blocks.
4. **No Selector Repetition:** Child elements and pseudo-elements cleanly consume `var(--_<component>-*)` without needing extra modifier selectors.
5. **Per-Instance Scope & Reset:** Scoped cleanly to each component instance without leaking into nested child elements.
6. **Self-Documenting API:** Developers can immediately see every customizable property and state transition by reading the top of the component file.

#### Canonical Example:
```css
:where(.button) {
    /* --------------------------------------------------------------------------
       Local Private Variables (Defaults & Fallback Ladder)
       -------------------------------------------------------------------------- */
    --_button-bg: var(--button-bg, transparent);
    --_button-border-color: var(--button-border-color, var(--border-color-muted, currentColor));
    --_button-border-width: var(--button-border-width, var(--border-width, 1px));
    --_button-font-family: var(--button-font-family, var(--typography-font-family-sans, sans-serif));
    --_button-font-size: var(--button-font-size, var(--control-font-size, var(--typography-font-size-0, 1rem)));
    --_button-font-weight: var(--button-font-weight, var(--font-weight-bold, 700));
    --_button-hover-bg: var(--button-hover-bg, var(--foreground, currentColor));
    --_button-hover-border-color: var(--button-hover-border-color, var(--foreground, currentColor));
    --_button-hover-text: var(--button-hover-text, var(--surface, #ffffff));
    --_button-active-bg: var(--button-active-bg, var(--foreground-accent-pressed, #005f57));
    --_button-active-border-color: var(--button-active-border-color, var(--foreground-accent-pressed, #005f57));
    --_button-active-text: var(--button-active-text, var(--surface, #ffffff));
    --_button-min-size: var(--button-min-size, var(--spacing-target, 3rem));
    --_button-padding-block: var(--button-padding-block, var(--spacing-4, 0.25rem));
    --_button-padding-inline: var(--button-padding-inline, var(--spacing-16, 1rem));
    --_button-radius: var(--button-radius, var(--radius, 0.25rem));
    --_button-text: var(--button-text, var(--foreground, currentColor));

    /* Surface, Border & Shape */
    background-color: var(--_button-bg);
    border: var(--_button-border-width) solid var(--_button-border-color);
    border-radius: var(--_button-radius);
    color: var(--_button-text);

    /* Single-Source State Handling */
    @media (hover: hover) {
        &:hover:not(:disabled, [aria-disabled="true"]) {
            background-color: var(--_button-hover-bg);
            border-color: var(--_button-hover-border-color);
            color: var(--_button-hover-text);
        }
    }

    &:active:not(:disabled, [aria-disabled="true"]) {
        background-color: var(--_button-active-bg);
        border-color: var(--_button-active-border-color);
        color: var(--_button-active-text);
    }
}

/* Variant re-assigns private variables ONLY - no duplicate hover/active rules */
:where(.button--primary) {
    --_button-bg: var(--button-primary-bg, var(--foreground-accent, #008076));
    --_button-border-color: var(--button-primary-border-color, var(--button-primary-bg, var(--foreground-accent, #008076)));
    --_button-text: var(--button-primary-text, var(--surface, #ffffff));
    --_button-hover-bg: var(--button-primary-hover-bg, var(--foreground-accent-hover, #00665e));
    --_button-hover-border-color: var(--button-primary-hover-border-color, var(--button-primary-hover-bg, var(--foreground-accent-hover, #00665e)));
    --_button-hover-text: var(--button-primary-hover-text, var(--button-primary-text, var(--surface, #ffffff)));
    --_button-active-bg: var(--button-primary-active-bg, var(--foreground-accent-pressed, #005f57));
    --_button-active-border-color: var(--button-primary-active-border-color, var(--button-primary-active-bg, var(--foreground-accent-pressed, #005f57)));
    --_button-active-text: var(--button-primary-active-text, var(--button-primary-text, var(--surface, #ffffff)));
}
```

---

### F. Container Style Queries (`@container style(...)`)
Define container style queries directly beneath the private variable manifest inside the base selector. Style queries enable declarative parent orchestration without requiring per-child modifier classes.

#### Standard Comment Header & Structure:
```css
/* --------------------------------------------------------------------------
   Style Container Queries (@container style(...))
   Enables contextual DX orchestration without per-element utility classes:
   e.g., .navigation { --button-variation: subtle; --button-corners: round; }
   -------------------------------------------------------------------------- */

/* Density & Sizing */
@container style(--ui-density: dense) or style(--button-size: sm) {
    --_button-padding-block: var(--button-sm-padding-block, var(--spacing-2, 0.125rem));
    --_button-padding-inline: var(--button-sm-padding-inline, var(--spacing-8, 0.5rem));
    --_button-min-size: var(--button-sm-min-size, var(--spacing-target-sm, 2rem));
}

/* Variation: Subtle */
@container style(--button-variation: subtle) or style(--button-appearance: subtle) {
    --_button-bg: var(--button-subtle-bg, transparent);
    --_button-border-color: var(--button-subtle-border-color, transparent);
    --_button-text: var(--button-subtle-text, var(--foreground, currentColor));
    --_button-hover-bg: var(--button-subtle-hover-bg, var(--surface-hover, rgba(0, 0, 0, 0.05)));
    --_button-hover-border-color: var(--button-subtle-hover-border-color, transparent);
    --_button-hover-text: var(--button-subtle-hover-text, var(--foreground, currentColor));
}

/* Corner Shapes */
@container style(--button-corners: round) {
    --_button-radius: var(--radius-round, 9999px);
}
```

---

### G. Inline Property Annotations
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
