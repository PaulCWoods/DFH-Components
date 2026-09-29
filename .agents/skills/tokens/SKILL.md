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
- **Spacing Scale:** `spacing.0`, `spacing.0-25` (0.25rem), `spacing.0-5` (0.5rem), `spacing.0-75` (0.75rem), `spacing.1` (1rem), `spacing.1-5` (1.5rem), `spacing.2` (2rem), `spacing.3` (3rem), `spacing.4` (4rem), `spacing.5` (5rem).
- **Touch Target:** `spacing.target` (`3rem` / `48px` - meets WCAG 2.5.5 AAA).
- **Border Radii:** `radius.none` (`0px`), `radius.sm` (`0.25rem`), `radius.md` (`0.5rem`), `radius.lg` (`0.75rem`), `radius.full` (`9999px`).
- **Transitions:** `transition.duration.0`, `transition.duration.sm` (0.2s), `transition.duration.md` (0.5s), `transition.duration.lg` (0.8s).

---

### Tier 2: Semantic Intent (`2-semantic.json`)
Semantic tokens express intent and context. Light/dark switching uses native `light-dark()` expressions.

#### Surfaces
| Token JSON Path | CSS Custom Property | Intended Use |
| :--- | :--- | :--- |
| `surface.base` | `--surface-base` | Main canvas / body background |
| `surface.card` | `--surface-card` | Cards, modals, dialogs, popovers, elevated containers |
| `surface.fade` | `--surface-fade` | Hover highlight tint / quiet container fill |
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
| `foreground.base` | `--foreground-base` | Primary text and default icon fill |
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
| `border.width` | `--border-width` | Standard 2px border width |
| `border.base` | `--border-base` | Default prominent border |
| `border.muted` | `--border-muted` | Subtle container border (currentColor with alpha) |
| `border.quiet` | `--border-quiet` | Light 20% border for dividers and cards |
| `border.subtle` | `--border-subtle` | 1px dashed or ultra-light border |
| `border.accent` | `--border-accent` | Active, focused, or highlighted border |
| `border.accent-hover` | `--border-accent-hover` | Accent interactive border hover |
| `border.danger` | `--border-danger` | Form error or destructive border |
| `border.success` | `--border-success` | Success/verified border |

#### Focus Rings (WCAG 2.4.7 & 2.4.13)
- `--focus-ring-color`: `var(--foreground-accent)`
- `--focus-ring-outline`: `2px solid var(--focus-ring-color)`
- `--focus-ring-outline-offset`: `2px`

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
    - `02-viewport.json` (Collection: `Viewport`, Modes: `Mobile` & `Desktop`): Responsive fluid spacing (`breathe`, `cushion`) and fluid typography font sizes (Mobile and Desktop pixel numbers, e.g. Step 0: 16px Mobile / 24px Desktop, with zero CSS web math pollution).
    - `03-structure.json` (Collection: `Structure`, Mode: `Value`): Static spacing, radii, border stroke widths, focus ring metrics, typography font metrics, durations, and component specs.
  - Designers can switch Theme (Light/Dark) and Viewport (Mobile/Desktop) independently on any Figma frame without mode conflicts or mode pollution on numbers.

#### Fluid Token Usage Patterns in Semantic & Component Tokens
- **Single Fluid Token Reference (Recommended Default):** Reference any global fluid step directly by name, e.g. `"$value": "{fluid.typography.font-size.5}"`. The mobile min and desktop max are mathematically implied without needing a second token.
- **Custom / Dramatic Scales (Two-Token Syntax):** Explicit `fluid(min, max)` expressions remain fully supported for non-standard or dramatic scaling ranges spanning multiple scale steps (e.g. `fluid({fluid.typography.font-size.1}, {fluid.typography.font-size.5})` or `fluid(1rem, 3.5rem)`).
- **Fixed Non-Fluid Typography:** Reference static global scale tokens directly without `fluid()`, e.g. `"$value": "{typography.font-size.minus-1}"` for `micro-heading`.

#### Semantic Typography Presets
- `body`: `"{fluid.typography.font-size.0}"` (Mobile: 16px, Desktop: 24px)
- `body-small`: `"{fluid.typography.font-size.minus-1}"` (Mobile: 13px, Desktop: 19px)
- `body-large`: `"{fluid.typography.font-size.1}"` (Mobile: 19px, Desktop: 30px)
- `heading`: `"{fluid.typography.font-size.2}"` (Mobile: 23px, Desktop: 38px)
- `subheading`: `"{fluid.typography.font-size.1}"` (Mobile: 19px, Desktop: 30px)
- `small-heading`: `"{fluid.typography.font-size.minus-1}"` (Mobile: 13px, Desktop: 19px)
- `micro-heading`: `"{typography.font-size.minus-1}"` (Fixed static 12.8px)
- `title`: `"{fluid.typography.font-size.5}"` (Mobile: 40px, Desktop: 73px)
- `display-title`: `"{fluid.typography.font-size.7}"` (Mobile: 57px, Desktop: 114px)
- `pullquote`: `"{fluid.typography.font-size.1}"` (Mobile: 19px, Desktop: 30px)

---

### Tier 3: Component Scoped (`3-component.json`)
Component tokens scope styles directly to specific UI components (`button`, `dialog`, `popover`, `accordion`, `badge`, `chip`, `input`, `field`).

- **Naming Pattern:** `--<component>-<property>` or `--<component>-<variant>-<property>`
- **Control Unification:** Buttons and form inputs share the Tier 2 `control` semantic tokens (`--control-font-size`, `--control-min-size`, `--control-padding-block`, `--control-padding-inline`, `--control-radius`, `--control-border-width`, etc.) ensuring consistent proportions and alignment across form elements.
- **Mandatory Fallback Rule in CSS:** Always fall back to the semantic token:
  ```css
  background-color: var(--button-primary-bg, var(--foreground-accent));
  color: var(--button-primary-fg, var(--surface-base));
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
- ✅ `.popover`, `.popover--anchored`
- ✅ `.accordion`, `.accordion-group`, `.accordion__icon`
- ✅ `.badge`, `.badge--accent`, `.badge--success`, `.badge--warning`, `.badge--danger`, `.badge--pill`
- ✅ `.chip`
- ✅ Utilities: `.visually-hidden` (canonical) & `.sr-only` (alias), `.visually-hidden--focusable` (skip links)
- ❌ Do NOT use `.dfh-button`, `.dfh-dialog`, or `.ui-` prefixes.

---

## 4. Component CSS Architecture & Native CSS Nesting Guidelines

When authoring CSS for components in `packages/css/src/components/<component>.css`:

### 1. Low-Specificity Foundation (`:where()`)
Always wrap root component selectors and variants in `:where()` to maintain zero-specificity overhead, allowing application consumers to override styles easily:
```css
:where(.component, element.component) {
  /* Base styles */
}

:where(.component--variant) {
  /* Variant overrides */
}
```

### 2. Native CSS Nesting for States & Pseudo-Classes
Always use native CSS nesting with an **explicit parent selector (`&`)** for pseudo-classes, states, and media queries:
- **Pseudo-classes & Attributes:** Must start with `&` to ensure they target the element itself rather than a descendant:
  - `&:focus { outline: none; }`
  - `&:focus-visible { outline: var(--focus-ring-outline); outline-offset: var(--focus-ring-outline-offset); }`
  - `&:active:not(:disabled, [aria-disabled="true"]) { ... }`
  - `&:where(:disabled, [aria-disabled="true"]) { ... }`
  - ⚠️ **Critical rule:** Never omit the `&` for pseudo-classes (e.g., writing `:active` inside a block desugars to `& :active`, matching descendants instead of the component itself).
- **Hover Media Query:** Always wrap hover states in `@media (hover: hover)`:
  ```css
  @media (hover: hover) {
    &:hover:not(:disabled, [aria-disabled="true"]) {
      background-color: var(--component-hover-bg, var(--foreground-base));
    }
  }
  ```
- **Nested Child Elements:** Nest child elements directly by tag name or class:
  ```css
  span {
    text-box: trim-both cap alphabetic;
  }
  ```

### 3. Logical Properties & Layout Rules
- **Dimensions & Spacing:** Use `min-block-size`, `min-inline-size`, `padding-block`, `padding-inline`, `margin-block`, `margin-inline`. Never use physical properties (`width`, `height`, `top`, `bottom`, `left`, `right`).
- **Aspect Ratio:** For square icon-only buttons or chips, use `aspect-ratio: 1 / 1`.

### 4. Size Modifiers via CSS Variable Overrides
Size modifiers should **never** redefine layout declarations. Instead, override the scoped custom properties:
```css
:where(.component--sm, .component.\+sm) {
  --component-min-size: var(--component-sm-min-size);
  --component-padding-block: var(--component-sm-padding-block);
  --component-padding-inline: var(--component-sm-padding-inline);
  --component-font-size: var(--component-sm-font-size);
}
```

### 5. Sensible Commenting & Section Headers
Use standardized comment banners to structure component files:
- `/* ===...=== */` for top-level component sections (`Base Primitive`, `Variants`, `Sizes`, `Link-Specific Resets`).
- `/* ---...--- */` for nested state subsections inside the base or variant blocks (`Disabled State`, `Focus Visible`, `Hover State`, `Active / Pressed State`, `Typographic Bounding Box Alignment`).
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
