---
name: tokens
description: |
  Token naming conventions, DTCG 3-tier architecture (Global, Semantic, Component), typography scale (-2 to 8), fluid clamp rules, surface/foreground/border conventions, and Figma export workflow for Design For Humans.

  Trigger immediately for:
  - Token editing: Modifying or referencing tokens/1-global.json, tokens/2-semantic.json, or tokens/3-component.json.
  - CSS custom properties: Looking up or generating CSS variables for surface, foreground, border, typography, spacing, or transitions.
  - Typography modular scale: Applying font-size steps (-2 to 8), fluid clamps, and line-heights.
  - Figma synchronization: Compiling tokens to CSS or exporting to Tokens Studio and Native Figma Variables.
  - Component authoring: Choosing tokens and fallbacks for UI primitives.
---

# Design For Humans: Design Tokens Skill & Naming Conventions

## 1. Architecture Overview (3-Tier DTCG Pipeline)
Design For Humans employs a strict 3-tier W3C Design Tokens Community Group (DTCG) token pipeline designed for AI Agents, modern CSS, and Figma ($0 Free Tier).

```
tokens/
├── 1-global.json      # Tier 1: Foundation (palettes, modular scales -2..8, units, durations, fluid bounds)
├── 2-semantic.json    # Tier 2: Context & Intent (light-dark(), surfaces, foregrounds, borders, shadows, focus)
└── 3-component.json   # Tier 3: Component Scoped (button, dialog, popover, accordion, badge, chip)
```

Generated outputs (never edit directly):
- `packages/css/src/variables.css`: Compiled CSS custom properties (baseline clamps + progressive enhancement).
- `packages/figma-sync/dist/tokens-studio/figma-tokens.json`: $0 Free-tier Tokens Studio exchange file.
- `packages/figma-sync/dist/native-variables/`: Native Figma Variables collections (01 Global, 02 Semantic, 03 Component).

---

## 2. Token Naming Conventions

### Tier 1: Global Foundations (`1-global.json`)
All tokens use standard DTCG keys (`$value`, `$type`, `$description`).

- **Color Palettes:** `color.neutral.<step>`, `color.teal.<step>`, `color.amber.<step>`, `color.rose.<step>`, `color.blue.<step>`, `color.green.<step>` (steps: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950).
- **Typography Font Families:** `typography.font-family.inter`, `georgia`, `jetbrains-mono`, `plus-jakarta-sans`, `sans`, `serif`, `mono`, `display`.
- **Typography Modular Scale (Steps -2 through 8):**
  - `"minus-2"`: `0.64rem`
  - `"minus-1"`: `0.8rem`
  - `"0"`: `1rem` (Base body size)
  - `"1"`: `1.25rem`
  - `"2"`: `1.5625rem`
  - `"3"`: `1.953rem`
  - `"4"`: `2.441rem`
  - `"5"`: `3.052rem`
  - `"6"`: `3.815rem`
  - `"7"`: `4.768rem`
  - `"8"`: `5.96rem`
- **Negative Step Rule:**
  - In JSON files, use key `"minus-1"`, `"minus-2"`.
  - When compiled to CSS, the compiler automatically generates `--typography-font-size--1` and `--typography-font-size-fluid--1` (double hyphen for negative numbers).
- **Typography Weights:** `typography.font-weight.regular`, `medium`, `semibold`, `bold`.
- **Typography Line Heights:** `typography.line-height.0` through `6`.
- **Spacing Scale:** `spacing.0` (0), `spacing.1` (0.0625rem / 1px), `spacing.2` (0.125rem / 2px), `spacing.4` (0.25rem / 4px), `spacing.8` (0.5rem / 8px), `spacing.12` (0.75rem / 12px), `spacing.16` (1rem / 16px), `spacing.24` (1.5rem / 24px), `spacing.32` (2rem / 32px), `spacing.48` (3rem / 48px), `spacing.64` (4rem / 64px), up to `spacing.1280` (80rem / 1280px).
- **Touch Target:** `spacing.target` (`3rem` / `48px` - meets WCAG 2.5.5 AAA).
- **Border Radii:** `radius.none` (`0px`), `radius.sm` (`0.25rem`), `radius.md` (`0.5rem`), `radius.lg` (`0.75rem`), `radius.full` (`9999px`).
- **Transitions:** `transition.duration.0`, `transition.duration.sm` (0.2s), `transition.duration.md` (0.5s), `transition.duration.lg` (0.8s).

---

### Tier 2: Semantic Intent (`2-semantic.json`)
Semantic tokens express intent and context. Light/dark switching uses native `light-dark()` expressions.

#### Surfaces
| Token JSON Path | CSS Custom Property | Intended Use |
| :--- | :--- | :--- |
| `surface.base` | `--surface` | Main canvas / body background |
| `surface.card` | `--surface-card` | Cards, modals, dialogs, popovers, elevated containers |
| `surface.translucent` | `--surface-translucent` | Hover highlight tint / quiet container fill |
| `surface.inverted` | `--surface-inverted` | High-contrast reverse background (tooltips, inverted cards) |
| `surface.dark` | `--surface-dark` | Deep dark surface fill |
| `surface.darker` | `--surface-darker` | Darkest container backdrop fill |
| `surface.accent` | `--surface-accent` | Solid brand accent surface |
| `surface.accent-hover` | `--surface-accent-hover` | Accent surface interactive hover |
| `surface.accent-fade` | `--surface-accent-fade` | 10% accent tint for highlights |
| `surface.accent-quiet` | `--surface-accent-quiet` | 20% accent tint for badges/selection |
| `surface.danger` | `--surface-danger` | Destructive/error alert background |
| `surface.warning` | `--surface-warning` | Warning alert background |
| `surface.success` | `--surface-success` | Success alert background |

#### Foregrounds (Text & Icons)
| Token JSON Path | CSS Custom Property | Intended Use |
| :--- | :--- | :--- |
| `foreground.base` | `--foreground` | Primary text and default icon fill |
| `foreground.muted` | `--foreground-muted` | Secondary text, captions, metadata |
| `foreground.subtle` | `--foreground-subtle` | Tertiary text, placeholder text |
| `foreground.accent` | `--foreground-accent` | Brand teal text, primary links |
| `foreground.accent-hover` | `--foreground-accent-hover` | Accent interactive hover state |
| `foreground.danger` | `--foreground-danger` | Destructive actions, validation errors |
| `foreground.warning` | `--foreground-warning` | Warning messages |
| `foreground.success` | `--foreground-success` | Success messages, confirmed status |

#### Borders & Outlines
| Token JSON Path | CSS Custom Property | Intended Use |
| :--- | :--- | :--- |
| `border.width.default` | `--border-width`, `--border-width-default` | Standard 2px border width |
| `border.width.none` | `--border-width-none` | No border; 0 whatever the theme |
| `border.width.thin` | `--border-width-thin` | Hairline 1px stroke (rules, subtle cards) |
| `border.width.thick` | `--border-width-thick` | Prominent 4px stroke |
| `border.base` | `--border` | Default prominent border |
| `border.accent` | `--border-accent` | Active, focused, or highlighted border |
| `border.accent-hover` | `--border-accent-hover` | Accent interactive border hover |
| `border.danger` | `--border-danger` | Form error or destructive border |
| `border.success` | `--border-success` | Success/verified border |
| `panel.border-width` | `--panel-border-width` | Shared perimeter border thickness for panels, cards, tables, menus |
| `panel.border-color` | `--panel-border-color` | Shared perimeter border color for panels, cards, tables, menus |
| `app.border-width` | `--app-border-width` | Shared perimeter border thickness for major app landmarks (header, sidebar, footer) |
| `app.border-color` | `--app-border-color` | Shared perimeter border color for major app landmarks (header, sidebar, footer) |

#### Focus Rings (WCAG 2.4.7 & 2.4.13)
- `--focus-ring-color`: `var(--foreground-accent)`
- `--focus-ring-outline`: `2px solid var(--focus-ring-color)`
- `--focus-ring-offset`: `2px`

#### Elevation & Shadows (3-Layer Stacks & CSS Level 5 `@function`)
Design For Humans implements an ergonomic, non-verbose shadow architecture pairing 3-layer Gaussian blur geometry with native CSS `@function` rules and 100% backward-compatible variable composition:

| Token JSON Path | CSS Variable Fallback | `@function` Signature | Intended Use |
| :--- | :--- | :--- | :--- |
| `shadow.color` | `--shadow-color` | — | Base elevation tint (90% light / 80% dark neutral tint) |
| `shadow.color-light` | `--shadow-color-light` | — | Subtle elevation tint (95% light / 90% dark neutral tint) |
| `shadow.none` | `--shadow-none` | — | Flat / reset elevation (`0 0 0 0 transparent`) |
| `shadow.sm` | `--shadow-sm` | `--shadow-sm(--color)` | Subtle card & resting container elevation |
| `shadow.md` | `--shadow-md` | `--shadow-md(--color)` | Medium elevated popovers, dropdowns, hovered cards |
| `shadow.lg` | `--shadow-lg` | `--shadow-lg(--color)` | High modals, drawers, toasts, and floating flyouts |
| `shadow.inner` | `--shadow-inner` | `--shadow-inner(--color)` | Inset well and pressed states |
| `shadow.sm-light` | `--shadow-sm-light` | `--shadow-sm(var(--shadow-color-light))` | Light resting surface elevation |
| `shadow.md-light` | `--shadow-md-light` | `--shadow-md(var(--shadow-color-light))` | Light medium elevation |
| `shadow.lg-light` | `--shadow-lg-light` | `--shadow-lg(var(--shadow-color-light))` | Light high elevation |
| `shadow.inner-light` | `--shadow-inner-light` | `--shadow-inner(var(--shadow-color-light))` | Light inset well elevation |

- **Decomposed Layer Geometry (`--_shadow-*-layer-[1..3]`):**
  - `sm`: Layer 1 (`0 0 1px 0`), Layer 2 (`0 1px 2px 0`), Layer 3 (`0 2px 6px 0`).
  - `md`: Layer 1 (`0 1px 4px 0`), Layer 2 (`0 2px 8px 0`), Layer 3 (`0 8px 24px 0`).
  - `lg`: Layer 1 (`0 4px 16px 0`), Layer 2 (`0 8px 32px 0`), Layer 3 (`0 16px 64px 0`).
  - `inner`: Layer 1 (`inset 0 1px 2px 0`), Layer 2 (`inset 0 2px 4px 0`), Layer 3 (`inset 0 4px 8px 0`).
- **Dynamic Recoloring via Native `@function` (Modern Browsers):**
  ```css
  /* Inline color parameterization without repeating 3-layer stack */
  .card--brand {
    box-shadow: --shadow-md(var(--color-purple-500));
  }
  .card--danger-glow {
    box-shadow: --shadow-lg(var(--color-red-500));
  }
  ```
- **Firefox & Universal Browser Resilience:**
  - ⚠️ **Firefox Compatibility Gotcha:** Firefox does not yet support CSS `@function`. If a property uses `--shadow-md(...)` directly without fallback, Firefox drops the entire `box-shadow` declaration.
  - When authoring modern styles using `@function`, always guard with `@supports at-rule(@function)` or provide a preceding cascading fallback:
  ```css
  /* 100% universal across Chrome, Safari, and Firefox */
  .card--brand {
    --shadow-color: color-mix(in srgb, var(--color-purple-700), transparent 75%);
    box-shadow: var(--shadow-md, none);
  }

  /* Progressive enhancement with @function guard */
  @supports at-rule(@function) {
    .card--brand {
      box-shadow: --shadow-md(var(--color-purple-500));
    }
  }
  ```


#### Fluid Spacing & Typography Architecture
Design For Humans supports fluid spacing and responsive typography across both Web and Figma:
- **Dual-Ratio Fluid Typography Model:**
  - **Mobile:** Minor Third (`1.2` ratio), base `1rem` (16px) at 400px viewport.
  - **Desktop:** Major Third (`1.25` ratio), base `1.5rem` (24px) at 1280px viewport.
  - Scale steps $-2$ through $8$ interpolate smoothly between `1rem * 1.2^k` (mobile) and `1.5rem * 1.25^k` (desktop).
- **Web Compiler (`compile-tokens.js`):**
  - Generates standard precomputed `clamp(min, preferred, max)` fallbacks for all steps `--typography-font-size-fluid--2` through `--typography-font-size-fluid-8`.
  - Generates progressive enhancement `@supports (opacity: progress(1px, 0px, 1px))` block using `round(min + var(--_pg) * (max - min), 1px)`.
- **Figma Native Variables Suite (`export-figma-tokens.js`):**
  - **Option A (Free Tier Single-Mode):** `dfh-unified.json` (Collection: `Design For Humans`, Mode: `Value`). Light theme + Desktop scale with 100% internal variable alias pills for $0 Figma accounts.
  - **Option B (Multi-Mode Modular Collections, Zero Mode Pollution):**
    - `01-color.json` (Collection: `Color`, Modes: `Light` & `Dark`): Primitive palettes + semantic surfaces, foregrounds, borders, shadows, and focus rings. Semantic colors internally alias primitives.
    - `02-container.json` (Collection: `Container`, Modes: `Small` & `Large`): Responsive fluid spacing (`breathe`, `cushion`) and semantic typography font sizes/line heights (Small and Large container pixel numbers, e.g. Step 0: 16px Small / 24px Large, matching container query workflows).
    - `03-structure.json` (Collection: `Structure`, Mode: `Value`): Static spacing, radii, border stroke widths, focus ring metrics, typography font metrics, durations, and component specs.
  - Designers can switch Theme (Light/Dark) and Container (Small/Large) independently on any Figma frame, screen, or nested component without mode conflicts or mode pollution on numbers.

#### Fluid Token Usage Patterns in Semantic & Component Tokens
- **Single Fluid Token Reference (Recommended Default):** Reference any global fluid step directly by name, e.g. `"$value": "{fluid.typography.font-size.5}"`. The mobile min and desktop max are mathematically implied without needing a second token.
- **Custom / Dramatic Scales (Two-Token Syntax):** Explicit `fluid(min, max)` expressions remain fully supported for non-standard or dramatic scaling ranges spanning multiple scale steps (e.g. `fluid({fluid.typography.font-size.1}, {fluid.typography.font-size.5})` or `fluid(1rem, 3.5rem)`).
- **Fixed Non-Fluid Typography:** Reference static global scale tokens directly without `fluid()`, e.g. `"$value": "{typography.font-size.minus-1}"` for `micro-heading`.

#### Semantic Text Styles
The text styles are written by the type engine from the `type` section of the default theme in `tokens/themes/` (`npm run build:themes`, or the Token Designer's Typography section). Edit the theme, not the style tokens. Each style has a fixed step, a compact step, and grows in fluid and cq regions with the system (its step on the small scale to the same step on the large) or to another step:

| Style | Fixed | Compact | Fluid / cq |
| :--- | :--- | :--- | :--- |
| `display-title` | 5 | 4 | 5 → 8 |
| `title` | 3 | 2 | 3 → 5 |
| `heading` | 2 | 1 | 2 → 3 |
| `subheading` | 1 | 0 | 1 |
| `small-heading` | 0 | -1 | 0 |
| `micro-heading` | -1 | -2 | fixed |
| `body-lg` | 1 | 0 | 1 |
| `body` | 0 | -1 | 0 |
| `body-sm` | -1 | -2 | -1 (cq: -2) |
| `body-xs` | -2 | -2 | -2 |
| `label` | 0 | -1 | fixed |

`code`, `body-alt` and `body-strong` set only a family or weight and take body's size.

**Figma text styles** are generated from these (`figmaTextStyles` in the theme engine, used by `export-figma-tokens.js`): every style at its fixed size, and under `compact/` at its compact size, in the Tokens Studio file. Fluid and cq sizes are web only. Never hand-write text style presets.

---

### Tier 3: Component Scoped (`3-component.json`)
Component tokens scope styles directly to specific UI components (`button`, `dialog`, `popover`, `accordion`, `badge`, `chip`, `input`, `field`).

- **Naming Pattern:** `--<component>-<property>` or `--<component>-<variant>-<property>`
- **Control Unification:** Buttons and form inputs share the Tier 2 `control` semantic tokens (`--control-font-size`, `--control-min-size`, `--control-padding-block`, `--control-padding-inline`, `--control-radius`, `--control-border-width`, etc.) ensuring consistent proportions and alignment across form elements.
- **Organism-Atom Separation & Token Economy:** Tier 3 component tokens should strictly define unique component geometry (paddings, gaps, well dimensions, elevation, border strokes, and specific component surface/border states). Do NOT create Tier 3 component tokens for heading/body typography (`title-font-size`, `title-weight`, `description-font-size`, `subtitle-font-*`) inside organisms (`card`, `empty-state`, `dialog`). Organisms compose atomic typography classes directly (`.heading`, `.small-heading`, `.subheading`, `.micro-heading`, `.display-title`), keeping Tier 3 lean, clean, and free of redundant font tokens.
- **Defaults Live in the CSS:** Tier 3 isn't compiled into `variables.css`. Each token's default is the fallback where the CSS reads it, with the same value in `3-component.json` for Figma; `npm run check:tokens` fails if they disagree. A Tier 1 scale step may be that default only where no Tier 2 token means the step (`var(--badge-gap, var(--spacing-12))`), and a colour ramp never.
- **Mandatory Fallback Rule in CSS:** Always fall back to the semantic token:
  ```css
  background-color: var(--button-primary-bg, var(--foreground-accent));
  color: var(--button-primary-fg, var(--surface));
  border-radius: var(--button-radius, var(--radius-md));
  font-size: var(--input-font-size, var(--control-font-size));
  ```

---

## 3. Class Naming Conventions
Design For Humans components use clean, standard semantic class names **without arbitrary prefixes**:
- ✅ `.button`, `.button--primary`, `.button--secondary`, `.button--subtle`, `.button--destructive`, `.button--icon`
- ✅ `.input`, `.input--sm`, `.input--lg`, `textarea.input`
- ✅ `.checkbox`, `.radio`, `.choice`
- ✅ `.field`, `.field__label`, `.field__hint`, `.field__error`
- ✅ `.dialog`, `.dialog__header`, `.dialog__title`, `.dialog__body`, `.dialog__footer`
- ✅ `.popover`, `.popover--top`
- ✅ `.accordion`, `.accordion-group`, `.accordion__icon`
- ✅ `.badge`, `.badge--accent`, `.badge--success`, `.badge--warning`, `.badge--danger`, `.badge--round`
- ✅ `.chip`
- ✅ Utilities: `.visually-hidden` (canonical) & `.sr-only` (alias), `.visually-hidden--focusable` (skip links)
- ❌ Do NOT use `.dfh-button`, `.dfh-dialog`, or `.ui-` prefixes.

---

## 4. Component CSS Architecture & Native CSS Nesting Guidelines

When authoring CSS for components in `packages/css/src/{atoms,molecules,organisms}/<component>.css`:

### 1. Low-Specificity Foundation (`:where()`)
Always wrap root component selectors and variants in `:where()` to maintain zero-specificity overhead, allowing application consumers to override styles easily:
```css
:where(.component, element.component) {
  /* Base styles & private variable manifest */
}

:where(.component--variant) {
  /* Variant re-assignments */
}
```

### 2. Local Private Variable Manifest (`--_<component>-*`) & State Variable Contract
Define a complete private variable manifest at the top of the base `:where(.component)` block. This serves as the single source of truth for the token fallback ladder.
Crucially, **interactive components MUST declare private state variables for hover and active transitions**:

```css
:where(.button) {
  /* Core Geometry & Surface */
  --_button-bg: var(--button-bg, transparent);
  --_button-border-color: var(--button-border-color, var(--border-color-muted, currentColor));
  --_button-text: var(--button-text, var(--foreground, currentColor));

  /* Interactive State Contract */
  --_button-hover-bg: var(--button-hover-bg, var(--foreground, currentColor));
  --_button-hover-border-color: var(--button-hover-border-color, var(--foreground, currentColor));
  --_button-hover-text: var(--button-hover-text, var(--surface, #ffffff));
  --_button-active-bg: var(--button-active-bg, var(--foreground-accent-pressed, #005f57));
  --_button-active-border-color: var(--button-active-border-color, var(--foreground-accent-pressed, #005f57));
  --_button-active-text: var(--button-active-text, var(--surface, #ffffff));
}
```

### 3. Single-Source State Handling (Zero Duplicate `:hover` / `:active` Across Variants)
Never duplicate `@media (hover: hover) { &:hover { ... } }` or `&:active { ... }` blocks across individual component variants.
Resolve interactive transitions **strictly once** inside the base `:where(.component)` rule using the private state variables:

```css
:where(.button) {
  /* ... base properties & transitions ... */

  @media (hover: hover) {
    &:hover:not(:disabled, [disabled], [aria-disabled="true"]) {
      background-color: var(--_button-hover-bg);
      border-color: var(--_button-hover-border-color);
      color: var(--_button-hover-text);
    }
  }

  &:active:not(:disabled, [disabled], [aria-disabled="true"]) {
    background-color: var(--_button-active-bg);
    border-color: var(--_button-active-border-color);
    color: var(--_button-active-text);
  }
}
```

#### Variants as Pure Token Dictionaries:
Component variants (`.button--primary`, `.button--subtle`, `.button--destructive`) become **pure token maps** that ONLY re-assign the private variables:
```css
/* Primary Variant (High-emphasis filled action) */
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

### 4. Zero-Class Orchestration via Style Container Queries (`@container style(...)`)
To deliver a superior DX that decouples styling from per-element classnames, embed `@container style(...)` queries directly within the base component definition.
This allows parents (navbars, toolbars, sidebars, forms) to orchestrate child component appearance purely through contextual CSS properties:

```css
:where(.button) {
  /* ... private variables manifest ... */

  /* ------------------------------------------------------------------------
     Style Container Queries (@container style(...))
     Enables contextual DX orchestration without per-element utility classes:
     e.g., .navigation { --button-variation: subtle; --button-corners: round; }
     ------------------------------------------------------------------------ */

  /* Density & Size */
  @container style(--ui-density: dense) or style(--button-size: sm) {
    --_button-padding-block: var(--button-sm-padding-block, var(--spacing-2, 0.125rem));
    --_button-padding-inline: var(--button-sm-padding-inline, var(--spacing-8, 0.5rem));
    --_button-min-size: var(--button-sm-min-size, var(--spacing-target-sm, 2rem));
    --_button-font-size: var(--button-sm-font-size, var(--control-sm-font-size, var(--typography-font-size--1, 0.875rem)));
  }

  /* Variation Orchestration */
  @container style(--button-variation: subtle) or style(--button-appearance: subtle) {
    --_button-bg: var(--button-subtle-bg, transparent);
    --_button-border-color: var(--button-subtle-border-color, transparent);
    --_button-text: var(--button-subtle-text, var(--foreground, currentColor));
    --_button-hover-bg: var(--button-subtle-hover-bg, var(--surface-hover, transparent));
    --_button-hover-border-color: var(--button-subtle-hover-border-color, transparent);
    --_button-hover-text: var(--button-subtle-hover-text, var(--foreground, currentColor));
    --_button-active-bg: var(--button-subtle-active-bg, var(--surface-active, transparent));
    --_button-active-border-color: var(--button-subtle-active-border-color, transparent);
    --_button-active-text: var(--button-subtle-active-text, var(--foreground, currentColor));
  }

  /* Corner Shape */
  @container style(--button-corners: round) {
    --_button-radius: var(--radius-round, 9999px);
  }
}
```

#### Terminal Fallbacks & Resilient Unstyled Graceful Degradation
Component variable declarations must always terminate at basic browser primitives rather than hardcoded design tokens or multi-layer hex/rgba strings. If design tokens fail to load or are absent, components must render legibly and function in an unstyled state:
- **Shadows:** Fall back to `none` (or `0 0 0 transparent`), e.g. `var(--component-shadow, var(--shadow-md, none))`. Never hardcode multi-layer `rgba(...)` stacks.
- **Borders:** Border colors fall back to `currentColor` (or `transparent` when borderless); border widths fall back to `1px` or `0px`.
- **Surfaces & Backgrounds:** Fall back to `Canvas`, `Highlight`, or `transparent`. Never hardcode `#ffffff` or arbitrary hex colors.
- **Foregrounds & Text:** Fall back to `currentColor` or `CanvasText`. Never hardcode arbitrary hex text colors.

#### Application Usage:
```html
<nav class="navigation" style="--button-variation: subtle; --button-corners: round;">
  <!-- Rendered automatically as subtle & round with zero modifier classes -->
  <button type="button" class="button">Home</button>
  <button type="button" class="button">Profile</button>
</nav>
```

### 5. Native CSS Nesting for States & Pseudo-Classes
Always use native CSS nesting with an **explicit parent selector (`&`)** for pseudo-classes, states, and media queries:
- **Pseudo-classes & Attributes:** Must start with `&` to ensure they target the element itself rather than a descendant:
  - `&:focus { outline: none; }`
  - `&:focus-visible { outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset); }`
  - `&:active:not(:disabled, [aria-disabled="true"]) { ... }`
  - `&:where(:disabled, [aria-disabled="true"]) { ... }`
  - ⚠️ **Critical rule:** Never omit the `&` for pseudo-classes (e.g., writing `:active` inside a block desugars to `& :active`, matching descendants instead of the component itself).
- **Nested Child Elements:** Nest child elements directly by tag name or class:
  ```css
  span {
    text-box: trim-both cap alphabetic;
  }
  ```

### 6. Logical Properties & Layout Rules
- **Dimensions & Spacing:** Use `min-block-size`, `min-inline-size`, `padding-block`, `padding-inline`, `margin-block`, `margin-inline`. Never use physical properties (`width`, `height`, `top`, `bottom`, `left`, `right`).
- **Aspect Ratio:** For square icon-only buttons or chips, use `aspect-ratio: 1 / 1`.

### 7. Size Modifiers via CSS Variable Overrides
Size modifiers should **never** redefine layout declarations. Instead, override the scoped custom properties:
```css
:where(.component--sm, .component.\+sm) {
  --component-min-size: var(--component-sm-min-size);
  --component-padding-block: var(--component-sm-padding-block);
  --component-padding-inline: var(--component-sm-padding-inline);
  --component-font-size: var(--component-sm-font-size);
}
```

### 8. Sensible Commenting & Section Headers
Use standardized comment banners to structure component files:
- `/* ===...=== */` for top-level component sections (`Base Primitive`, `Variants`, `Sizes`, `Link-Specific Resets`).
- `/* ---...--- */` for nested state subsections inside the base or variant blocks (`Local Private Variables`, `Style Container Queries`, `Disabled State`, `Interactive Elements`, `Focus Visible`, `Hover State`, `Active / Pressed State`).
- Inline property comments grouping declarations by purpose: `/* Layout & Alignment */`, `/* Sizing & Spacing */`, `/* Typography */`, `/* Borders & Surfaces */`, `/* Transitions */`.

---

## 5. Development Workflow & Commands
Whenever updating or adding tokens in `tokens/*.json`:

1. **Verify Token Schema:** Ensure every new token has `$value`, `$type`, and `$description`.
2. **Compile CSS Custom Properties:**
   ```bash
   npm run build:tokens
   ```
   *Generates `packages/css/src/variables.css`.*
3. **Export Figma Studio & Variables:**
   ```bash
   npm run export:figma
   ```
   *Generates Tokens Studio JSON and native Figma Variables collections.*
4. **Validate Components & Stories:**
   ```bash
   npm run build-storybook --workspace=@design-for-humans/storybook
   ```
