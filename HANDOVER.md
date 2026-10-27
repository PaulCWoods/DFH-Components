# Project Handover: Design For Humans Component Library

**Date:** October 2026  
**Lead / Author:** Paul Charles Woods  
**Target Standard:** WCAG 2.2 Level AA / AAA, Baseline Widely Available + Modern Web Standards  
**Repositories:**
- Primary Library: `/Users/paulwoods/Sites/DFH-Components`
- Consumer Blog (Craft CMS): `/Users/paulwoods/Sites/designforhumans-blog`

---

## 1. What is Finished

### Design Token Architecture (W3C DTCG 3-Tier)
- **Token Sources:** Located in `tokens/`:
  - `1-global.json` (Tier 1: Global palettes, modular type scale `-2` to `8`, unit scales)
  - `2-semantic.json` (Tier 2: Functional UI roles using native `light-dark()`, surface, foreground, border, focus, shadows)
  - `3-component.json` (Tier 3: Component-specific tokens like button, dialog, popover, table)
- **Token Compiler (`packages/figma-sync/compile-tokens.js`):**
  - Compiles tokens to `packages/css/src/variables.css`.
  - Generates fluid typography clamps, CSS Level 5 `@function` parameterized shadows, and light-dark variables.
- **Figma Exporter (`packages/figma-sync/export-figma-tokens.js`):**
  - Exports tokens for Tokens Studio ($0 free tier) and native Figma Variables.
  - Generates static pixel values, flattened colors, and native drop shadows.

### CSS Component System (`packages/css/src/`)
- **Strict Atomic Design Cascade Order (`packages/css/src/index.css`):**
  `Reset -> Variables -> Atoms -> Molecules -> Organisms -> Layout Primitives -> Utilities -> Overrides`
- **Zero-Specificity Cascade Rule:** Every component selector is wrapped in `:where(...)`, guaranteeing zero specificity `(0, 0, 0)` so utilities and consumer overrides work without `!important`.
- **The Organism-Atom Composition Law:** Organisms (`.card`, `.dialog`, `.deck`, `.table`, `.empty-state`) declare layout geometry only; typography is composed atomically (`.heading`, `.subheading`, `.text`, `.caption`).
- **Container-Adaptive Typography (`--font-sizing: cq`):** Typography atoms inside container query contexts automatically scale using container query units (`cqi`).
- **Container Density Orchestration (`--ui-sizing: compact`):** Contextually downsizes child controls and text via container style queries `@container style(--ui-sizing: compact)` without manual class overrides.
- **Unstyled Resilience Fallback Philosophy:** Variables supply system keyword terminal fallbacks (`Canvas`, `CanvasText`, `currentColor`, `Highlight`, `none`). Never hardcode raw hexes or complex strings as fallbacks.
- **Components Implemented:**
  - **Atoms:** `button`, `badge`, `chip`, `input`, `textarea`, `select`, `check-radio`, `switch`, `range`, `progress`, `divider`, `icon`, `link`, `skeleton`, `skip-link`, `tab`, `text`.
  - **Molecules:** `alert`, `avatar`, `banner`, `batch-actions`, `breadcrumb`, `button-group`, `choices`, `field`, `fieldset`, `lockup`, `navigation-tree`, `pagination`, `popover`, `prose`, `stepper`, `tab-list`, `telemetry`, `toast`, `tooltip`.
  - **Organisms:** `accordion`, `card`, `combobox`, `deck`, `dialog`, `empty-state`, `form`, `header`, `menu`, `section`, `tabbed-content`, `table`, `tabs`.
  - **Layout Primitives:** `cluster`, `grid`, `inline`, `split`, `stack`, `wrapper`, `sidebar`, `app`, `main`.

### Systematized Utility Shorthands
- Added recognized, conflict-free shorthands across all utility files:
  - Spacing: `.p-0` … `.p-3xl`, `.m-0` … `.m-3xl`, `.ms-*`, `.me-*`, `.pt-*`, `.pb-*`, `.pl-*`, `.pr-*`
  - Flex: `.flex-row`, `.flex-col`, `.items-start` … `.items-center`, `.justify-between` … `.justify-center`, `.grow`, `.shrink`
  - Borders: `.border-0`, `.border-t`, `.border-b`, `.border-s`, `.border-e`, `.rounded-none` … `.rounded-xl`, `.rounded-full`
  - Typography: `.font-normal` … `.font-black`, `.font-sans`, `.font-serif`, `.font-mono`, `.truncate`, `.text-nowrap`, `.text-pretty`, `.text-balance`
  - Display: `.d-block`, `.d-inline`, `.d-inline-block`, `.d-contents`, `.d-none` (plus `.hidden`, `.hide`)
  - Layout & Dimensions: `.w-full`, `.h-full`, `.w-auto`, `.h-auto`, `.w-screen`, `.h-screen`, `.min-w-0`, `.min-h-0`, `.relative`, `.absolute`, `.sticky`, `.fixed`
  - Z-Index: `.z-0` … `.z-50`, `.z-sticky`, `.z-overlay`, `.z-dialog`, `.z-popover`, `.z-toast`, `.z-tooltip`, `.z-auto`
  - Accessibility: `.sr`, `.sr--focusable`, `.sr-focusable`
  - Color Resets: `.bg-transparent`, `.bg-none`, `.text-current`, `.text-transparent`
- Dual-synchronized across both `DFH-Components` and `designforhumans-blog`.

### Icon System
- Single source of truth: `icons/icons.svg` (91+ SVG symbols).
- Node synchronizer `scripts/sync-icons.js` runs via `npm run sync:icons` and automatically copies the sprite to the CSS package, Storybook preview, root HTML preview, Astro docs public folder, and the Craft CMS blog templates.

### Storybook & Automated Testing
- Storybook 8 (HTML + Vite) running on port `6006`.
- Every story automatically runs axe-core accessibility checks via `@storybook/addon-a11y`.

---

## 2. What is In Progress

1. **Astro Documentation Site Redesign (`packages/docs`):**
   - The documentation site (`npm run docs`, port `4321`) is being modernized with dynamic interactive previews (`ComponentPlayground.astro`), documentation cards (`ExampleCard.astro`), and code snippet tabs (`CodeBlock.astro`).
   - The Button documentation page (`packages/docs/src/pages/components/atoms/button.astro`) was partially refactored: sections 2 and 4 were updated with `ExampleCard`, `card--dense`, `card__canvas`, and `fields-grid`.
   - Remaining work: Finish refactoring the rest of `button.astro`, then propagate the pattern across the remaining component documentation pages.
2. **Missing Icons for Screens:**
   - Several UI icons shown in recent screen mockups need to be drawn or added to `icons/icons.svg`, followed by running `npm run sync:icons`.
3. **Fixed Grid Column Modifiers:**
   - `grid--1-col`, `grid--2-col`, and responsive `md:grid--2-col` were recently added to support strict multi-column layouts where intrinsic auto-fit grids (`grid--sm`, `grid--md`) would otherwise stretch unexpectedly.

---

## 3. Key Decisions & Rationales

1. **Native Web Standards Over JavaScript Libraries:**
   - **Dialogs:** Native HTML `<dialog>` with `.showModal()`. Never use custom JS modal wrappers or third-party focus-trap libraries.
   - **Popovers & Dropdowns:** Native `popover="auto"` or `popover="manual"` combined with CSS Anchor Positioning (`position-anchor`, `position-area`, `anchor()`). No Popper.js or Floating UI.
   - **Textarea Autosizing:** Native `field-sizing: content;`. No JS height listeners.
   - **Form Validation:** Use `:user-invalid` and `:user-valid` rather than `:invalid` to prevent premature error states on untouched fields.
   - **Height / Expand Transitions:** Native `interpolate-size: allow-keywords;` on `:root` to transition to `height: auto` without JavaScript measurement.
   - **Typography Trimming:** Native `text-box: trim-both cap alphabetic;` for crisp alignment without phantom line-height padding.
2. **Layout Primitives vs. Display Utilities Law (Option 1 Decision):**
   - In Design For Humans, `.inline` is a foundational spatial layout primitive (`display: var(--display, flex); flex-wrap: nowrap; gap: var(--_gap);`).
   - Attempting to alias `display: inline` to `.inline` clobbered the layout primitive across dozens of stories and templates.
   - **Decision:** Layout components (`.inline`, `.stack`, `.grid`, `.cluster`, `.split`, `.wrapper`, `.sidebar`) remain untouched. Display utilities strictly use explicit prefixes: `.d-inline`, `.d-block`, `.d-inline-block`, `.d-contents`, `.d-none` (plus `.display-*`).
3. **Zero Specificity Cascade (`:where(...)`):**
   - Wrapping base component and utility rules in `:where(...)` gives them `(0, 0, 0)` specificity.
   - This ensures utilities override components cleanly, and consumer overrides never require `!important`.
4. **Elevation & 3-Layer Gaussian Blur Shadow System:**
   - Shadows are decomposed into 3 layers with custom tokens (`--_shadow-*-layer-[1..3]`).
   - Token compiler emits Level 5 `@function` rules (`@function --shadow-md(--color: black) { result: ... }`).
   - **Firefox Compatibility Fallback:** Firefox drops stylesheets/rules with unrecognized functions. Every `@function` invocation must be wrapped in `@supports at-rule(@function)` or backed by a CSS custom property fallback (`var(--shadow-md, none)`).
5. **Dual-Repository Parity Convention:**
   - The author maintains both `DFH-Components` and `designforhumans-blog`.
   - Modifying tokens, atoms, or utilities in `DFH-Components` requires mirroring the changes into `designforhumans-blog/web/styles/scss/` and running the Sass build command:
     ```bash
     /opt/homebrew/bin/sass web/styles/scss/dfh-shared.scss web/styles/dfh-shared.css && /opt/homebrew/bin/sass web/styles/scss/dfh-blog.scss web/styles/dfh-blog.css
     ```

---

## 4. Known Issues & Technical Debt

1. **Firefox CSS Level 5 `@function`:**
   - Firefox does not yet support `@function`. Using `--shadow-md(...)` directly causes Firefox to silently drop the property. Always provide `var(--shadow-md, none)` fallbacks.
2. **Missing Standalone Linter:**
   - No `npm run lint` script or stylelint config currently exists. Adherence to block comments (`/* ... */`), logical properties, and `:where()` is currently enforced through agent skills and code review.
3. **No Unit/Integration Test Runner:**
   - No Vitest/Jest runner configured. Component validation currently relies on Storybook builds (`npm run build:storybook`) and `@storybook/addon-a11y` axe checks.
4. **Duplicate Icon Symbol Detection:**
   - `scripts/sync-icons.js` warns on duplicate IDs, but symbols must be manually deduplicated in `icons/icons.svg`.

---

## 5. What Was About to Be Done Next

1. Complete the modernization of `packages/docs/src/pages/components/atoms/button.astro` by replacing legacy raw card markups with the newly created `ExampleCard.astro` component.
2. Provide the finalized list of missing icons referenced in UI prototypes and add them to `icons/icons.svg`.
3. Validate and continue the documentation refactor across subsequent atom and molecule pages.

---

## 6. Information from Conversation Not Documented Elsewhere

- **`card--dense` & `card__canvas`:**
  - `card--dense` is an alias/modifier for `.card.ui-dense` (declaring `--ui-sizing: compact;`).
  - `card__canvas` was introduced as a child container of `.card`, functioning similarly to `card__thumb` but designed to be more forgiving for mixed preview elements, code blocks, or playgrounds.
- **`fields-grid`:**
  - Added alongside `field` to support responsive multi-column form layouts in documentation playgrounds and form drawers.
- **`.pre` Utility:**
  - Added to `typography.css` (`:where(.white-space-pre, .pre) { white-space: pre; }`) specifically for formatting raw preformatted code blocks inside documentation cards.
- **Running Local Processes:**
  - The author keeps both `npm run docs` (port 4321) and `npm run storybook` (port 6006) running continuously in background terminals.
