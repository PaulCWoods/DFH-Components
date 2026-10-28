# AGENTS.md: Design For Humans Component Library

## Project Context & Mission
**Design For Humans** is an accessible, modern, token-driven UI component library and design system combining Web Standards, Figma synchronization, and automated workflows.
- **Lead / Author:** Paul Charles Woods (Senior web professional specializing in digital accessibility and web standards).
- **Target Standard:** WCAG 2.2 Level AA / AAA, Baseline Widely Available + Modern Web Standards.

---

## Source of Truth & Pre-v1 Migration
- **`docs/PRINCIPLES.md` outranks this file.** It defines the shared variant axes, token tiers, v1 scope and the refinement checklist. Where this file and PRINCIPLES disagree, PRINCIPLES wins and this file is the one to fix.
- **Dual audience:** DFH-Components feeds developers (CSS) and designers (Figma Variables and Tokens Studio via `packages/figma-sync/`) from one token source. Any change to token tiers, axis names or variant values must keep parity in both.
- **Pre-v1 status:** The library is being refactored component by component against PRINCIPLES. Markup in this file uses names the current CSS supports. Where a canonical name is not yet implemented, the table below gives the current class to use and the target it will become. When you refactor a component, migrate it to the target names, delete its aliases, and update its section here.

### Shared Variant Axes (PRINCIPLES §2)
Each modifier sets exactly **one** axis. Never fuse two axes into one class (`.button--subtle-primary`, `.button--plain-destructive` are forbidden; write `.button--subtle.button--accent`).

| Axis | Applies to | Values |
| :--- | :--- | :--- |
| Pointer | Everything | Touch (48px targets, default), fine (32px targets, opt-in by the product via a root token only) |
| Size | Atoms & interactive controls only | default, `--sm`, `--lg` |
| Density | Containers & layout only | default, `--compact` (sets `--ui-sizing: compact`; nested gaps, type and controls step down). `.ui-compact` sets it on any region; `.fine:ui-compact` sets it only where the primary pointer is fine |
| Presentation | Everything | Normal (text + icon), minimal (icon only) |
| Prominence | Everything with a surface | default, `--strong`, `--subtle`, `--plain` |
| Intent | Status or consequence | neutral (default), `--accent`, `--danger`, `--warning`, `--success`, `--info` |

- **Intent never relies on colour alone** (WCAG 1.4.1): pair every non-neutral intent with an icon, a role (`role="alert"`, `role="status"`) or descriptive text.
- **Smaller size never shrinks the hit area:** `--sm` controls (and controls stepped down by a compact container) keep a 48px target unless the product has opted into fine-pointer targets, and never drop below 24px (WCAG 2.5.8). Text fields can't take a buffer, so `--sm` text controls are 32px. The library never switches fine-pointer mode on automatically with `@media (pointer: fine)`; `fine:ui-compact` is the product's opt-in.

### Legacy → Canonical Names
| Current class (use until migrated) | Target | Notes |
| :--- | :--- | :--- |
| `.button--primary`, `.button--secondary`, `.button--danger`, `.button--selected`, `.button--subtle-tint`, `.button--ghost`, compound `.button--*-primary` / `--*-destructive` | `.button--strong.button--accent`, `.button`, `.button--danger`, `.is-active`, `.button--subtle`, `.button--plain`, single-axis pairs | **Removed** in the button pass. These classes no longer exist. |
| `--button-variation`, `--button-appearance`, `--button-tone` (flag), `--button-density`, `.buttons-dense`, `.buttons-regular`, `.buttons-primary`, `.buttons-destructive` | `--button-prominence`, `--button-intent`, `--ui-sizing: compact` | **Removed** in the button pass. |
| `.badge--strong`, `--subtle`, `--plain`, `--round`, `--contrast`; badges used as labels; `.badge--top-right-corner` and the other physical corners; `.chip--simple`, `.chip--status`, `.chip--color-*`; `[data-status]` on badge, chip or status; `--badge-variation`, `--badge-tone`, `--badge-appearance`, `--chip-variation` | `.status` with a prominence and intent, `.chip`, `.badge--top-end` / `--top-start` / `--bottom-end` / `--bottom-start`, `.chip--plain`, `.status--plain.status--{intent}`, `--status-*` / `--chip-*` / `--badge-intent` flags | **Removed** in the badge pass. See §5. |
| `.icon--xs`, `--md`, `--xl`, `--2xl`, `--scale-*`, `--muted`, `--destructive`, bare `.dir`; `.icon-box--surface`, `.icon-boxes-*`, `.icon-box-compact`, `.icon-box-lg`, `--icon-box-density`; `--icon-scale` | `--icon-size`, `.icon--danger`, `.text-color-muted`, `.icon--dir`, `.icon-box--subtle`, `--icon-box-size: sm`, `--ui-sizing: compact` | **Removed** in the icon pass. See §9. |
| `--dense` modifiers (`.card--dense`, `.field--dense`, `.banner--dense`, etc.) | `--compact` | One density modifier only. |
| `.ui-dense`, `style(--ui-density: dense)`, `--control-density`, `--menu-density`, `--combobox-density`, `--textarea-density`, `--telemetry-density` | `.ui-compact`, `style(--ui-sizing: compact)` | One density flag. Migrate in each component's pass. |
| `.alert` styling | `.banner` + `role` | `.alert` is a placement container only (see §21). |
| `.range-group`, `--surface`, `--pill`; `.input--ghost`, `.inputs-*`, `.selects-*`, `.textareas-*`, `.controls-dense`; `.checkbox-input--sm` and intents, `.check--*`; `.switch--destructive`; `--controls-variation`, `--*-variation`, `--*-density`, `--range-variant`, `--range-tone`, `--switch-shape`, `--form-check-size`; bare `input`/`select`/`textarea` styling; `:user-valid` styling | `.range-lockup`, `--bordered`, `--bordered --round`; `.input--plain`, `.controls-*`, `.ui-compact`; `.checkbox-input--lg`; `.switch--danger`; `--controls-prominence`, `--*-prominence`, `--ui-sizing: compact`, `--range-intent`, `--switch-corners`, `--check-box-size`; classes only | **Removed** in the form-controls pass. See §7. |
| Bare `progress`/`meter` styling, `.progress--subtle`, `.progress--accent`, `.meter--success`/`--warning`/`--danger`, `--progress-variant`, `--progress-tone`, `.controls-sm`/`-lg` on bars | `.progress`/`.meter` classes, `.progress--{intent}` or `--progress-intent`, meter thresholds (`low`/`high`/`optimum`), `--progress-size`/`--meter-size` | **Removed** in the progress and meter pass. See §25. |
| `.link--accent`, `--danger`, `--destructive`, `--success`, `--muted`, `--sm`, `--lg`, `--inline-flex`, `--underline(d)`, `--stretch`, `--inverted`, `--on-dark`; `.block-link--compact`, `--ghost`, `--icon`, `--inline`, `--flex`; `--link-hover-color`, `--link-active-color` | `.link`, `.link--subtle`, `.button--danger` for actions, `.color-scheme-dark` on dark bands, `.link--stretched`; `.block-link--sm`, `--plain`, `.button--icon` on an `<a>` | **Removed** in the link pass. See §8. |
| `.tabs`, `.tabs__panel`, `.tabbed-content__panel`; per-tab `.tab--button`, `--subtle`, `--plain`, `--simple`, `--sm`, `--round`, `--vertical`, `--fill`; `.tabs-button`, `.tabs-subtle`, `.tabs-plain`, `.tabs-sm`, `.tabs-round`, `.tabs-icon`, `.tabs-vertical`, `.tabs-on-right`, `.tabs-flush`, `.tabs-scrollable`, `.tabs-wrap`, `.tabs-fill`, `.tabs-floating`, `.tabs-docked`, `.tabs-docked-top`; `--tabs-variation`, `--tab-variation`, `--tabs-style`, `--tabs-shape`; `--tabs-*` tokens | `.tabbed-content`, `.tab-panel`; axes on the list: `.tab-list--segmented`, `--subtle`, `--plain`, `--sm`, `--round`, `--vertical`, `--end`, `--flush`, `--scrollable`, `--fill`, `--floating`, `--docked`; `.tab--icon`; `--tab-list-style`, `--tab-list-prominence`, `--tab-list-size`, `--tab-list-corners`; `--tab-*`, `--tab-list-*` tokens | **Removed** in the tab pass. See §24. |
| `.micro-text`, `.caption`, `.nano-heading`, `.nano-text`, `.strong-text`, `.alt-text`, `.code-text`, `.code`, `.color-muted`; `--micro-text-*`, `--nano-*`, `--small-text-*`, `--large-text-*`, `--body-font-size` | `.small-text`, `.font-bold`, `.font-serif`, `.font-mono`, `.text-muted`; `--body-sm-*`, `--body-lg-*`, `--body-fixed-font-size` | **Removed** in the text pass. Text atoms are fixed by default; see §20. |
| `.divider--vertical`, `--subtle`, `--quiet`, `--accent`, `--dotted`, `--sm`, `--md`, `--lg`; `.menu__separator`, `.batch-actions__separator`, `.combobox__separator`; `--divider-border-*`; styling of bare `hr` | `aria-orientation="vertical"`, `.divider`, `.divider--strong`, `.divider--dashed`; `.divider` (`<li role="separator">` in lists); `--divider-width`, `--divider-style`, `--divider-color` | **Removed** in the divider pass. See §15. |
| `.skeleton--title`, `--circle`, `--round`, `--chip`, `--rect`, `--inline`, `--static`, `--sm`, `--md`, `--lg`, `--w-25`, `--w-33`, `--w-40`, `--w-60`, `--w-66`; `.card.skeleton`, `.card--skeleton`; `--skeleton-animation`, `--skeleton-bg` | `--heading`, `--avatar`, `--badge`, `--media`, `--skeleton-width`; a card with `aria-busy` and shapes inside; `--skeleton-motion`, `--skeleton-color` | **Removed** in the skeleton pass. See §26. |
| `.workspace` | `.app__workspace` | Do not use. |
| Responsive visibility synonyms (§31D) | First name in each row | Do not use synonyms. |

### v1 Scope
- **In core:** `telemetry` (to be refactored onto status, text and icon atoms), `batch-actions`.
- **Out of core:** `deck` is a stress-test showcase moving to `packages/storybook/stories/recipes/`. Do not use it in new library work or treat it as a pattern to copy.

---

## Technology Stack
- **Monorepo Architecture:** npm workspaces (`packages/*`).
- **Core Styling:** Vanilla Modern CSS (CSS Nesting, Logical Properties, Container Queries, Container Style Queries, CSS Anchor Positioning, Native CSS Functions `@function`, Native `light-dark()`, and `:where()` zero-specificity cascade). No Tailwind, no CSS-in-JS.
- **Design Tokens:** W3C DTCG (Design Token Community Group) 3-tier JSON specification (`tokens/*.json`) compiled to native CSS Custom Properties.
- **Storybook:** Storybook 8 (HTML + Vite) with `@storybook/addon-a11y` (axe-core automated WCAG auditing).
- **Documentation Site:** Astro 7 with MDX (`packages/docs`).
- **Iconography:** Canonical SVG sprite sheet (`icons/icons.svg`) synchronized across web, Storybook, and Craft CMS targets.
- **Figma Synchronization:** Node.js token compiler and exporter supporting Tokens Studio ($0 free tier) and Native Figma Variables.
- **Consumer Site:** Craft CMS blog (`/Users/paulwoods/Sites/designforhumans-blog`) consuming tokens & utilities via Sass.

---

## Directory Architecture
```
DFH-Components/
├── tokens/
│   ├── 1-global.json          # Tier 1: Foundation tokens (palettes, scales, units)
│   ├── 2-semantic.json        # Tier 2: Semantic UI tokens (light-dark(), surfaces, focus, shadows)
│   └── 3-component.json       # Tier 3: Component tokens (button, dialog, popover, accordion)
├── packages/
│   ├── css/                   # @design-for-humans/components-css
│   │   ├── src/
│   │   │   ├── reset.css      # Modern accessible CSS reset
│   │   │   ├── variables.css  # Auto-compiled CSS custom properties (DO NOT edit directly)
│   │   │   ├── index.css      # Core entrypoint importing layout, components & utilities
│   │   │   ├── atoms/         # Foundational indivisible primitives (text, button, tab, input, badge, icon, etc.)
│   │   │   ├── molecules/     # Simple combined units (field, lockup, tab-list, avatar, banner, telemetry, popover, etc.)
│   │   │   ├── organisms/     # Complex composite assemblies (card, dialog, table, tabbed-content, header, etc.)
│   │   │   ├── layout/        # 1D/2D spatial layout primitives (cluster, grid, inline, split, stack, wrapper, sidebar, app)
│   │   │   ├── utilities/     # Low-specificity utility classes (spacing, border, typography, accessibility, display, flex, layout-helpers)
│   │   │   └── overrides.css  # Custom extension layer for project-specific overrides
│   ├── docs/                  # @design-for-humans/docs (Astro documentation portal)
│   │   ├── src/
│   │   │   ├── components/    # Astro documentation components (ExampleCard, CodeBlock, ComponentPlayground, etc.)
│   │   │   ├── layouts/       # Astro page shells & layout wrappers
│   │   │   └── pages/         # Documentation routes (/components, /components/atoms/button, etc.)
│   │   └── public/            # Public assets (icons.svg, favicon)
│   ├── figma-sync/            # Token compilation & Figma export tooling
│   │   ├── compile-tokens.js      # Node token compiler (W3C DTCG -> CSS variables)
│   │   ├── export-figma-tokens.js # Figma exporter (Tokens Studio & Honza Toman Variables)
│   │   └── dist/
│   │       ├── tokens-studio/     # Tokens Studio format (figma-tokens.json)
│   │       └── native-variables/  # Native Figma Variables format (unified and modular collections)
│   └── storybook/             # @design-for-humans/storybook
│       ├── .storybook/        # Storybook configuration with @storybook/addon-a11y
│       └── stories/           # Component stories with automated axe WCAG checks
│           ├── atoms/         # Stories for indivisible primitives (button, input, badge, icon, etc.)
│           ├── molecules/     # Stories for composed units (field, lockup, avatar, banner, etc.)
│           ├── organisms/     # Stories for complex assemblies (card, dialog, table, tabs, etc.)
│           ├── layout/        # Stories for 1D/2D layout primitives (grid, stack, cluster, inline, split, etc.)
│           ├── utilities/     # Stories for utility classes (spacing, border, typography, flex, etc.)
│           ├── recipes/       # Stories for composite workflows and domain showcases (tally-sprout, cadence-dashboard, deck, etc.)
│           └── tokens/        # Stories for tokens (shadows, elevation, etc.)
├── docs/                      # Architecture, principles, and handover documentation
│   ├── PRINCIPLES.md          # Core design and engineering principles (outranks AGENTS.md)
│   ├── HANDOVER.md            # Active project state, decisions, and roadmap
│   └── audit/                 # Component inventory and audit findings
├── icons/
│   ├── icons.svg              # CANONICAL Single Source of Truth SVG sprite sheet (91 symbols)
│   └── icons.html             # Auto-synchronized standalone HTML preview
├── scripts/
│   └── sync-icons.js          # Synchronizer script (npm run sync:icons)
└── .agents/                   # Agent & developer skills and workflow guides
    └── skills/
        ├── modern-web-guidance/   # Chrome web standard best practices
        ├── tokens/SKILL.md        # Detailed token system specification & naming conventions
        ├── accessibility/SKILL.md # WCAG 2.2 compliance & auditing rules
        ├── recipe-composition/    # Decision-making heuristics & composite pattern guide
        └── css-commenting/        # CSS maintenance and block (/* */) commenting guide
```

---

## Commands & Development Workflow

### 1. Daily Development & Preview
| Command | Workspace / Context | Description |
| :--- | :--- | :--- |
| `npm run storybook` | `@design-for-humans/storybook` | Starts Storybook dev server on `http://localhost:6006` with live a11y checks. |
| `npm run build:storybook` | `@design-for-humans/storybook` | Generates static Storybook production bundle in `storybook-static/`. |
| `npm run docs` | `@design-for-humans/docs` | Starts Astro documentation dev server on `http://localhost:4321`. |
| `npm run build:docs` | `@design-for-humans/docs` | Builds static Astro documentation site into `packages/docs/dist/`. |

### 2. Tokens & Assets Pipeline
| Command | Workspace / Context | Description |
| :--- | :--- | :--- |
| `npm run build:tokens` | Root | Compiles `tokens/*.json` into `packages/css/src/variables.css`. |
| `npm run export:figma` | Root | Exports Tokens Studio and Native Figma Variables JSON into `packages/figma-sync/dist/`. |
| `npm run sync:icons` | Root | Propagates `icons/icons.svg` to CSS package, Storybook, Astro docs, and Craft CMS blog. |

### 3. Linting & Testing Status
- **Formatting:** Prettier (`^3.0.0`) configured via package.json.
- **Linter:** TODO (No standalone `npm run lint` script or stylelint configured yet; manual adherence to CSS commenting and zero-specificity rules required).
- **Accessibility / Automated Testing:** Every Storybook story automatically runs axe-core assertions via `@storybook/addon-a11y`.
- **Unit / Integration Tests:** TODO (No Jest/Vitest runner configured yet).

---

## Dual-Repository Architecture & Synchronization
The component library operates in tandem with the live site repository:
- **Library Repo:** `DFH-Components` (`/Users/paulwoods/Sites/DFH-Components`)
- **Blog Repo:** `designforhumans-blog` (`/Users/paulwoods/Sites/designforhumans-blog`)

### Synchronization Conventions:
1. **Utility & Atom Parity:** When modifying CSS utilities or atoms in `packages/css/src/utilities/`, mirror corresponding changes into `designforhumans-blog/web/styles/scss/library/utilities/`.
1b. **Component Overview Page:** Each component pass also updates `designforhumans-blog/templates/_component-library.twig`, the one-page overview, to the new markup. Blog Tier 3 tokens live in `web/styles/scss/library/theme/_tier3.scss` and are kept in step by hand.
2. **Sass Recompilation:** After updating SCSS in `designforhumans-blog`, recompile shared stylesheets using:
   ```bash
   /opt/homebrew/bin/sass web/styles/scss/dfh-shared.scss web/styles/css/dfh-shared.css && /opt/homebrew/bin/sass web/styles/scss/dfh-blog.scss web/styles/css/dfh-blog.css
   ```
3. **Icon Propagation:** `DFH-Components/icons/icons.svg` is the single source of truth. Running `npm run sync:icons` automatically writes updated sprites to `designforhumans-blog/templates/_icons.twig` and `designforhumans-blog/web/web/symbol-defs.svg`.

---

## Naming & Architectural Conventions

### 1. Token Architecture (W3C DTCG 3-Tier)
- **Tier 1 (Global):** `tokens/1-global.json` — Foundation values (`palette.*`, `space.*`, `font.*`).
- **Tier 2 (Semantic):** `tokens/2-semantic.json` — Functional UI roles using `light-dark()` (`surface.*`, `foreground.*`, `border.*`, `shadow.*`, `focus.*`).
- **Tier 3 (Component):** `tokens/3-component.json` — Specific component variables (`button.*`, `dialog.*`, `table.*`).
- **CSS Variable Mapping:** Formatted as `--<domain>-<prop>` (e.g. `--surface-card`, `--focus-ring-color`).
- **Component Private Manifest:** Local component variables use `--_<component>-<prop>` (e.g. `--_button-bg`, `--_card-padding`).

### 2. Component Class Names & BEM-Lite
- **Block:** `.card`, `.button`, `.badge`, `.dialog`, `.field`
- **Modifiers:** BEM double-hyphen syntax: `.button--strong`, `.button--accent`, `.card--compact`, `.dialog--scrollable`
- **Sub-elements:** BEM double-underscore syntax: `.card__header`, `.card__title`, `.card__body`, `.card__footer`, `.field__label`

### 3. Spatial Layout Primitives vs. Utilities Law
- **Spatial Layout Primitives** (`.inline`, `.stack`, `.grid`, `.cluster`, `.split`, `.wrapper`, `.sidebar`, `.app`) are structural orchestration components managing geometry, gap, and child distribution.
- **Display Utilities** MUST NOT use bare component names. Display utilities use explicit prefixes:
  - `display: block` $\rightarrow$ `.d-block`, `.display-block`
  - `display: inline` $\rightarrow$ `.d-inline`, `.display-inline` *(DO NOT use `.inline` which clobbers the layout primitive)*
  - `display: inline-block` $\rightarrow$ `.d-inline-block`, `.display-inline-block`
  - `display: contents` $\rightarrow$ `.d-contents`, `.display-contents`
  - `display: none` $\rightarrow$ `.d-none`, `.display-none`, `.hidden`, `.hide`
- **Utility Shorthands:** Standard hyphenated prefixes (`.p-sm`, `.m-md`, `.ms-sm`, `.me-sm`, `.rounded-md`, `.border-0`, `.border-t`, `.font-bold`, `.truncate`, `.text-nowrap`, `.z-10`, `.sr`). Never generate bare single-letter tags (`.p`, `.m`, `.b`).

---

## CSS Architecture & Cascade Order
The stylesheet cascade is strictly defined in `packages/css/src/index.css`:
1. **Reset:** `@import './reset.css';`
2. **Tokens & Variables:** `@import './variables.css';`
3. **Atoms:** `@import './atoms/*.css';` (indivisible controls)
4. **Molecules:** `@import './molecules/*.css';` (composed units)
5. **Organisms:** `@import './organisms/*.css';` (composite assemblies)
6. **Layout Primitives:** `@import './layout/*.css';` (spatial shells)
7. **Utilities:** `@import './utilities/*.css';` (immutable overrides)
8. **Overrides:** `@import './overrides.css';` (project-specific overrides)

**Cascade layers (PRINCIPLES §7, pending migration):** `index.css` will declare
```css
@layer reset, tokens, atoms, molecules, organisms, layout, utilities, overrides;
```
with every stylesheet in its layer. Until then the order above is enforced by import order. Components stay wrapped in `:where()` either way.

**Fonts (PRINCIPLES §4):** Library CSS must not load fonts or make any external request. The Google Fonts `@import` in `index.css` is pending removal. Font tokens default to system stacks; Storybook (`.storybook/preview-head.html`) and the docs site load their own fonts in the page head.

---

## Core Architectural Law: The Organism-Atom Composition Law

> **Fundamental Axiom:** *Organisms orchestrate layout geometry; Atoms dictate elemental styling.*

In Design For Humans, complex assemblies (`.card`, `.dialog`, `.empty-state`, `.table`, `.tabbed-content`) are **Organisms** that compose foundational **Atoms** (`.button`, `.heading`, `.subheading`, `.small-heading`, `.micro-heading`, `.display-title`, `.text`, `.caption`, `.badge`, `.status`, `.chip`, `.kbd`, `.icon`).

### 1. The Zero-Specificity Cascade Rule
All component primitives are wrapped in `:where(...)` to ensure a level playing field with zero specificity `(0, 0, 0)`. Because organisms are imported downstream from atoms in the stylesheet cascade, **any typography property declared on an organism hook (even `inherit` or `font-size: 1rem`) will clobber atom utility classes placed on that element**.

```
❌ ANTI-PATTERN: Organism declares typography styles
:where(.card__title) { font-size: inherit; font-weight: 700; }  <-- Cascades downstream, crossing out .heading!

✅ DESIGN FOR HUMANS LAW: Organism element hooks declare ONLY layout geometry
:where(.card__title) { margin: 0; min-inline-size: 0; text-wrap: balance; }
```

### 2. Constraints on Organism Element Hooks
Organism sub-element hooks (`.card__title`, `.card__subtitle`, `.card__band`, `.empty-state__title`, `.empty-state__description`, `.stepper__title`, `.stepper__description`, `.menu__heading`, `.combobox__group-header`, etc.) are **structural layout hooks only**:
- **ALLOWED declarations:** `margin: 0; min-inline-size: 0; text-wrap: balance; flex: 1; align-self: stretch; color: var(--_...-color); user-select: none;`
- **FORBIDDEN declarations:** `font-size`, `font-family`, `font-weight`, `line-height`, `letter-spacing`, `text-transform`, or `inherit`.

### 3. Typography Sizing Modes (`--font-sizing`)
Text atoms are **fixed** by default: each takes one step of the scale at every width. A container chooses another mode for everything inside it with `--font-sizing`, normally through the appearance-mode classes:

| Mode | Set with | Effect |
| :--- | :--- | :--- |
| fixed | (default), `.font-sizing-fixed` | One step at every width |
| fluid | `.font-sizing-fluid` | Grows with the viewport |
| cq | `.font-sizing-cq` on a container with `container-type: inline-size` | Grows with the container (`cqi`) |
| compact | `.font-sizing-compact`, `.ui-compact`, any `--compact` container | One step down |

Some organisms set the mode themselves: `.dialog`, `.menu`, `.combobox`, `.empty-state` and `.stepper` use `cq` (with `container-type: inline-size`); `.card`, `.table`, `.banner` and `.accordion` reset to fixed. The docs site puts `.font-sizing-fluid` on its article.

### 4. Container Density & Sizing Orchestration (`--ui-sizing: compact` & `--font-sizing: compact`)
When an organism or molecule enters compact density (the only density modifier is `--compact`; `--dense` is legacy) (`.stepper--compact`, `.card--compact`, `.menu--compact`, `.table--compact`, `.combobox--compact`), declare:
```css
--ui-sizing: compact;
```
This steps every nested text atom (`.display-title` through `.small-text`) down to its compact size (`--title-compact-font-size`, `--body-sm-compact-font-size` and so on) via `@container style(--ui-sizing: compact) or style(--font-sizing: compact)` container style queries without manual utility overrides or invasive class juggling.

To step down typography alone without changing container geometry, set `--font-sizing: compact` on the region instead. Size modifiers (`--sm`, `--lg`) belong to atoms and controls only; containers never take a size modifier.

### 5. Tier 3 Token Economy
Never create redundant Tier 3 component tokens for heading or description typography (e.g. `card.title-font-size`, `empty-state.title-font-size`, `stepper.title-font-size`, `menu.header-font-size`). Typography is owned globally and composed atomically.

---

## Canonical Component Markup Signatures
When generating or authoring HTML markup for Design For Humans components, strictly use the following semantic patterns:

### 1. Button Primitive
Reference implementation of the shared axes. Intent (`--accent`, `--danger`) sets a tone; prominence (`--strong`, `--subtle`, `--plain`, default outline) decides where the tone is applied, so any pairing works from two single-axis classes. Container flags: `--button-prominence`, `--button-intent`, `--button-size`, `--button-corners`; group classes `.buttons-strong|subtle|plain|sm|lg|round` set them. The shared `--controls-prominence`, `--controls-size` and `--controls-corners` flags (and `.controls-*` classes) also reach buttons (§7). A compact container (`--ui-sizing: compact`) steps buttons to `--sm`. Every size keeps a 48px hit area via `::after` unless the product opts into fine-pointer targets with `:root { --spacing-target-min: var(--spacing-target-sm); }`. Recolour hooks (undefined by default): `--button-color`, `--button-color-hover`, `--button-color-pressed`, `--button-color-border`, `--button-on-color`.

```html
<!-- Default Button (Outline Neutral) -->
<button type="button" class="button">
  <span>Action Label</span>
</button>

<!-- Strong Button (High-emphasis filled neutral; selected states .is-active and :checked render as strong) -->
<button type="button" class="button button--strong">
  <span>Strong Action</span>
</button>

<!-- Strong Accent Button (High-emphasis solid brand action; replaces legacy .button--primary) -->
<button type="button" class="button button--strong button--accent">
  <span>Primary Action</span>
</button>

<!-- Subtle Button (Translucent background, no border) -->
<button type="button" class="button button--subtle">
  <span>Subtle Action</span>
</button>

<!-- Plain Button (Transparent background, no border) -->
<button type="button" class="button button--plain">
  <span>Plain Action</span>
</button>

<!-- Danger Button (Outlined danger; always pair with an icon or text) -->
<button type="button" class="button button--danger">
  <span>Delete Item</span>
</button>

<!-- Strong Danger Button (High-emphasis solid danger) -->
<button type="button" class="button button--strong button--danger">
  <span>Delete Record</span>
</button>

<!-- Subtle Danger Button -->
<button type="button" class="button button--subtle button--danger">
  <span>Remove</span>
</button>

<!-- Placeholder / Dashed Outline Button -->
<button type="button" class="button button--placeholder">
  <span>+ Add Item</span>
</button>

<!-- With Icon (Trailing) -->
<button type="button" class="button button--strong button--accent">
  <span>Get Started</span>
  <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false">
    <use href="#ArrowRight"/>
  </svg>
</button>

<!-- Icon-Only Button (MANDATORY: use .visually-hidden text for translation & voice control) -->
<button type="button" class="button button--icon">
  <span class="visually-hidden">Search site</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
    <use href="#Search"/>
  </svg>
</button>

<!-- Avatar Button -->
<button type="button" class="button button--avatar button--round" aria-label="Alex Morgan profile">
  <img src="https://example.com/avatar.jpg" alt="" width="40" height="40" style="object-fit: cover; border-radius: inherit;" />
</button>

<!-- Button-Like Checkbox Toggle Switch (Zero-JS state management) -->
<label class="button">
  <input type="checkbox" class="visually-hidden" />
  <svg class="icon icon--off" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  <span>Switch</span>
</label>

<!-- Button-Like Radio Group Choices -->
<div class="cluster">
  <label class="button">
    <input type="radio" name="choice-demo" class="visually-hidden" checked />
    <span>Choice 1</span>
    <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
  <label class="button">
    <input type="radio" name="choice-demo" class="visually-hidden" />
    <span>Choice 2</span>
    <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
</div>

<!-- Link Styled as Button (MANDATORY: role="button") -->
<a href="/login" class="button button--strong button--accent" role="button">
  <span>Log In</span>
</a>

<!-- Persistently Labeled Button (Opts out of container style(--ui-labels: hidden) text collapsing) -->
<button type="button" class="button button--labeled">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
  <span>Add Record</span>
</button>
```

### 2. Modal Dialog Primitive (Native HTML `<dialog>` composed with `.card`)
```html
<!-- Trigger Button (Declarative Invoker command="show-modal") -->
<button type="button" class="button button--strong button--accent" commandfor="my-dialog" command="show-modal" aria-haspopup="dialog">
  <span>Open Dialog</span>
</button>

<!-- Modal Dialog Container (Native positioning & top-layer transitions) -->
<dialog id="my-dialog" class="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <div class="card">
    <article class="card__content">
      <header class="card__header">
        <hgroup class="card__hgroup">
          <h2 id="dialog-title" class="card__title">Dialog Title</h2>
          <p class="card__subtitle">Supporting Subtitle</p>
        </hgroup>
        <form method="dialog">
          <button type="submit" class="button button--subtle button--icon" commandfor="my-dialog" command="close">
            <span class="visually-hidden">Close dialog</span>
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          </button>
        </form>
      </header>

      <div class="card__body">
        <p id="dialog-desc">
          Dialog body copy describing the decision or context clearly.
        </p>
      </div>

      <footer class="card__footer" style="justify-content: flex-end;">
        <form method="dialog" style="display: flex; gap: var(--spacing-8);">
          <button type="submit" class="button" commandfor="my-dialog" command="close">
            <span>Cancel</span>
          </button>
          <button type="submit" value="confirm" class="button button--strong button--accent">
            <span>Confirm</span>
          </button>
        </form>
      </footer>
    </article>
  </div>
</dialog>

<!-- Whole-Card Scrollable Modal Modifier (.dialog--scrollable) -->
<!-- When desired, allows header, body, and footer to scroll together as a single unit -->
<dialog id="terms-dialog" class="dialog dialog--scrollable" aria-labelledby="terms-title">
  <div class="card">
    <article class="card__content">
      <header class="card__header">
        <h2 id="terms-title" class="card__title">Terms & Conditions</h2>
      </header>
      <div class="card__body">
        <p>Whole-card scrolling: header, body, and footer scroll together as a single unit.</p>
      </div>
      <footer class="card__footer" style="justify-content: flex-end;">
        <button type="submit" class="button button--strong button--accent"><span>Accept</span></button>
      </footer>
    </article>
  </div>
</dialog>
```

### 3. Popover Primitive (Native `popover` + CSS Anchor Positioning composed with `.card` or `.banner`)
```html
<!-- Trigger Button with anchor-name and popovertarget -->
<button 
  type="button" 
  class="button"
  popovertarget="my-popover"
  style="anchor-name: --my-anchor;"
  aria-haspopup="dialog"
>
  <span>Actions</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
    <use href="#ChevronDown"/>
  </svg>
</button>

<!-- Popover Wrapper tethered with position-anchor (Composed with Ruled Translucent Card & Stacked Button Group) -->
<div 
  id="my-popover" 
  popover 
  class="popover popover--anchored"
  style="position-anchor: --my-anchor; min-inline-size: 16rem;"
>
  <div class="card card--compact card--bordered card--translucent card--ruled">
    <article class="card__content">
      <header class="card__header">
        <h3 class="card__title">Quick Actions</h3>
      </header>
      <div class="card__body card__body--flush">
        <div class="button-group button-group--tight button-group--stacked buttons-subtle">
          <button type="button" class="button">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
            <span>Duplicate</span>
          </button>
          <button type="button" class="button">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
            <span>Export JSON</span>
          </button>
          <hr class="divider">
          <button type="button" class="button button--danger">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
            <span>Delete Item</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</div>
```

### 3b. Menu Primitive (Action List & Context Menu Companion to Card + Button-Group)
```html
<!-- Standalone Action Menu -->
<menu class="menu" aria-label="Document options">
  <header class="menu__heading">Document Actions</header>
  <li role="none">
    <button type="button" class="menu__item" role="menuitem">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
      <span>Duplicate</span>
      <kbd class="kbd">⌘D</kbd>
    </button>
  </li>
  <li role="none">
    <button type="button" class="menu__item" role="menuitem">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
      <span>Export JSON</span>
      <kbd class="kbd">⇧⌘E</kbd>
    </button>
  </li>
  <li role="separator" class="divider"></li>
  <li role="none">
    <button type="button" class="menu__item menu__item--destructive" role="menuitem">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
      <span>Delete Item</span>
      <kbd class="kbd">⌫</kbd>
    </button>
  </li>
</menu>

<!-- Anchored Dropdown Menu (Button Trigger + Popover + Menu) -->
<button 
  type="button" 
  class="button" 
  popovertarget="doc-menu" 
  style="anchor-name: --menu-anchor;"
  aria-haspopup="menu"
>
  <span>Options</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div 
  id="doc-menu" 
  popover 
  class="popover popover--anchored" 
  style="position-anchor: --menu-anchor; min-inline-size: 16rem;"
>
  <menu class="menu menu--translucent" aria-label="Options menu">
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
        <span>Rename</span>
      </button>
    </li>
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
        <span>Share Link</span>
      </button>
    </li>
    <li role="separator" class="divider"></li>
    <li role="none">
      <button type="button" class="menu__item menu__item--destructive" role="menuitem">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
        <span>Delete</span>
      </button>
    </li>
  </menu>
</div>

<!-- Button-Group Companion Compatibility (using .button inside .menu) -->
<menu class="menu menu--compact">
  <button type="button" class="button">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Copy"/></svg>
    <span>Copy Path</span>
    <kbd class="kbd">⌥⌘C</kbd>
  </button>
</menu>
```

### 4. Accordion Primitive (Native `<details>` / `<summary>`)
```html
<!-- Standalone Disclosure (Indicator generated automatically via ::before and ::after pseudo-elements) -->
<details class="accordion">
  <summary>Accordion Header</summary>
  <p>Accordion body content.</p>
</details>

<!-- Plain, Flush & Transparent Disclosures -->
<details class="accordion accordion--plain">
  <summary>Plain Accordion (No Border)</summary>
  <p>Borderless disclosure content.</p>
</details>

<details class="accordion accordion--flush">
  <summary>Flush Accordion (Edge to Edge)</summary>
  <p>Flush disclosure content.</p>
</details>

<details class="accordion accordion--transparent">
  <summary>Transparent Accordion</summary>
  <p>Transparent disclosure content.</p>
</details>

<!-- Opt-Out: Accordion Without Indicator Icon -->
<details class="accordion accordion--no-icon">
  <summary>Accordion Without Indicator Icon</summary>
  <p>Content without plus/minus icon.</p>
</details>

<!-- Native Exclusive Group (only one open at a time without JavaScript) -->
<div class="accordion-group">
  <details class="accordion" name="faq-group" open>
    <summary>First Question</summary>
    <p>Answer to the first question.</p>
  </details>

  <details class="accordion" name="faq-group">
    <summary>Second Question</summary>
    <p>Answer to the second question.</p>
  </details>
</div>

<!-- Group Opt-Out: No Indicator Icons on any child disclosures -->
<div class="accordion-group accordion-group--no-icons">
  <details class="accordion" name="faq-clean">
    <summary>Item Without Icon</summary>
    <p>Clean disclosure content.</p>
  </details>
</div>
```

### 5. Badge, Status, Chip & Kbd Primitives
Four atoms, chosen by **job**, not by look:
- If it's attached to something, it's a **badge**.
- If it sits in the flow and says what state something is in, it's a **status**.
- If it's a value someone chose or could remove, it's a **chip**.
- If it's a key, it's a **kbd**.

The inventory and migration are recorded in `docs/audit/badge-chip.md`.

| Atom | Job | Axes |
| :--- | :--- | :--- |
| `.badge` | Count or dot attached to a host (tab, button, nav item, icon), inline after its label or in a corner | Intent, size, presentation (`--dot`). Prominence fixed at strong. |
| `.status` | State of a thing: text with an optional dot or icon | Prominence (default outline pill, `--strong`, `--subtle`, `--plain` dot and text), intent, size, `--round` |
| `.chip` | Value token: selected option, active filter, category or tag; optionally removable | Prominence (default outline, `--subtle`, `--plain`), size, `--round`. No intent. |
| `.kbd` | Keyboard key or shortcut | Size only |

- Intents: `--accent`, `--info`, `--danger`, `--warning` and `--success`. Info is aqua, with its own Tier 2 roles.
- Container flags: `--badge-intent`, `--badge-size`; `--status-prominence`, `--status-intent`, `--status-size`, `--status-corners`; `--chip-prominence`, `--chip-size`, `--chip-corners`; `--kbd-size`.
- A compact container (`--ui-sizing: compact`) steps all four to `--sm`.
- `data-status` (online, away, busy) is presence and belongs on `.avatar` only. Never put it on these atoms.
- Story captions are not components: in Storybook, label demo regions with `.sb-demo-tag`, never with a badge.
- Wrap the text in `.badge__text`, `.status__text` or `.chip__text`. It trims the text box to cap height (`text-box: trim-both cap alphabetic`) so the text centres optically; padding-block is sized for trimmed text. Bare text still renders, just slightly off-centre and shorter. Scripts that change the text must update the `__text` span, not the parent.

```html
<!-- Badge: count attached to a host; the host's name carries the count -->
<button type="button" class="button button--icon" aria-label="Notifications, 3 unread">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
  <span class="badge badge--danger badge--sm badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
</button>
<a href="/issues" class="tab">
  <span class="tab__text">Issues</span>
  <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span>
  <span class="visually-hidden">, 14 open</span>
</a>

<!-- Status: the text carries the state (WCAG 1.4.1) -->
<span class="status status--success"><span class="status__text">Passed</span></span>
<span class="status status--strong status--danger"><span class="status__text">Failed</span></span>
<span class="status status--subtle status--accent status--round"><span class="status__text">New</span></span>
<span class="status status--plain status--warning"><span class="status__text">Degraded</span></span>
<span class="status status--strong status--warning status--round">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
  <span class="status__text">Action required</span>
</span>

<!-- Chip: static tag, and removable token -->
<span class="chip"><span class="chip__text">TypeScript</span></span>
<span class="chip chip--subtle">
  <span class="chip__text">TypeScript</span>
  <button type="button" class="chip__remove" aria-label="Remove TypeScript">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  </button>
</span>
<span class="chip chip--plain"><span class="chip__text">Lesson 04</span></span>

<!-- Kbd: single key and combination; mirror the shortcut in aria-keyshortcuts on its control -->
<kbd class="kbd">Esc</kbd>
<kbd class="kbd"><kbd>⌘</kbd><kbd>K</kbd></kbd>
```

- **Corner badges and avatars:** do not put a corner badge inside `.avatar`, which clips with `overflow: hidden`. Use `[data-status]` on the avatar, or wrap the avatar.
- **Removing a chip:** after removal, move focus to the next chip or back to the input that created it.

### 6. Avatar Primitive & Avatar Groups
```html
<!-- Initials Avatar with Live Status Indicator Ring -->
<div class="avatar" data-status="online" aria-label="Alex Bennett (online)">
  <span>AB</span>
</div>

<!-- Photo Image Avatar -->
<div class="avatar" data-status="away">
  <img src="https://example.com/avatar.jpg" alt="User profile photo" loading="lazy" />
</div>

<!-- Avatar Button (Interactive) -->
<button type="button" class="button button--avatar button--round" data-status="online" aria-label="Jordan Lee profile">
  <img src="https://example.com/avatar.jpg" alt="" width="40" height="40" style="object-fit: cover; border-radius: inherit;" />
</button>

<!-- Icon Fallback Avatar -->
<div class="avatar" aria-label="User profile">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- Placeholder / Add User Avatar -->
<div class="avatar avatar--placeholder" aria-label="Add team member">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- Custom Colored Avatar via inline tokens -->
<div class="avatar" style="--avatar-bg: #e50914; --avatar-text: #ffffff;" aria-label="Alex Bennett">
  <span>AB</span>
</div>

<!-- Inline Avatar Group with Counter -->
<div class="avatar-group" aria-label="Project team">
  <div class="avatar" aria-label="Alex Bennett"><span>AB</span></div>
  <div class="avatar" aria-label="Taylor Smith"><span>TS</span></div>
  <div class="avatar" aria-label="Jordan Lee"><span>JL</span></div>
  <div class="avatar" aria-label="5 additional team members"><span>+5</span></div>
</div>

<!-- Stacked Crescent Avatar Group (Layered pile with counter on top) -->
<div class="avatar-group avatar-group--stacked avatar-group--crescent" aria-label="5 active members">
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-label="5 members"><span>5</span></div>
</div>
```

### 6b. Lockup Primitive (Paired Typographic Micro-Container)
```html
<!-- Standalone Data Pair (Table Cell or Card) -->
<div class="lockup">
  <b>Full Sun</b>
  <small>Mycorrhizal Fungi + Leaf Mulch</small>
</div>

<!-- User Identity Lockup (Composed with .inline & .avatar) -->
<div class="inline align-items-center" style="--gap: var(--spacing-8);">
  <div class="avatar avatar--sm" aria-hidden="true"><span>MC</span></div>
  <div class="lockup">
    <b>Marcus Chen</b>
    <small>mchen.gardens@urbanmail.net</small>
  </div>
</div>

<!-- Inline Flow Span Lockup -->
<span class="lockup">
  <b>Plot #12</b>
  <small>Raised Bed</small>
</span>
```

### 7. Input & Form Control Primitives
Six atoms: input (with colour and file), select, textarea, checkbox and radio, switch, range. The audit is in `docs/audit/form-controls.md`.

- **Classes only.** Bare `<input>`, `<select>` and `<textarea>` keep browser styling; the reset gives them back their native rendering.
- **One base for text controls.** `.input`, `.select` and `.textarea` share `atoms/input.css` section 1: the same size, prominence, corners, flags and states.

| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.input`, `.select`, `.textarea` | Size (`--sm`, `--lg`), prominence (outline, `--subtle`, `--plain`), corners (`--round`) | `--input-*`, `--select-*`, `--textarea-*` (`size`, `prominence`, `corners`) |
| `.checkbox-input`, `.radio-input` | Size (20px, `--lg` 24px) | `--check-size: lg` |
| `.switch` | Size, prominence (`--subtle`), intent (`--danger`), corners | `--switch-size`, `--switch-prominence`, `--switch-intent`, `--switch-corners` |
| `.range` | Size, intent (`--info`, `--success`, `--warning`, `--danger`) | `--range-size`, `--range-intent` |

- Group flags `--controls-size`, `--controls-prominence` and `--controls-corners` reach every control, buttons included. Group classes: `.controls-sm`, `.controls-lg`, `.controls-subtle`, `.controls-plain`, `.controls-round`. A compact container (`--ui-sizing: compact`) steps controls to `--sm`.
- **Every prominence keeps a 3:1 edge** (`--border-color-control`). Outline has a full border; subtle and plain keep the bottom border.
- **`--flush`** (text controls) drops the inline padding and the boundary. Use it only inside a bar that draws both, such as a command palette header with `.focus-within`.
- **Hit area:** `--sm` text controls are 32px, matching small buttons; a field can't take a hit-area buffer, so this is also its target (above the 24px minimum). Put touch-facing forms in `fine:ui-compact` rather than using `--sm` directly. Switch and range keep a hit area of at least `--spacing-target-min` whatever their visual size. Put checkboxes and radios in a `.choice` label.
- **Validation:** invalid styling follows `:user-invalid` and `aria-invalid="true"`; always pair it with a `.field__error` message. Valid fields are not recoloured.
- Checkboxes have no intent: a checkbox has a state, not a status.

#### A. Text, Colour and File Inputs
```html
<div class="field">
  <label for="user-email" class="field__label">Email Address</label>
  <p id="user-email-hint" class="field__hint">We will never share your email address.</p>
  <input id="user-email" type="email" class="input" autocomplete="email" aria-describedby="user-email-hint" />
</div>

<!-- Error state -->
<div class="field">
  <label for="account-id" class="field__label">Account ID</label>
  <input id="account-id" type="text" class="input" aria-invalid="true" aria-describedby="account-id-error" value="INVALID-ID" />
  <p id="account-id-error" class="field__error">Account ID must start with "DFH-" followed by 6 digits.</p>
</div>

<!-- Size, prominence and corners -->
<input type="search" class="input input--sm" aria-label="Filter" />
<input type="text" class="input input--lg" aria-label="Title" />
<input type="text" class="input input--subtle" aria-label="Name" />
<input type="text" class="input input--plain" aria-label="Name" />
<input type="search" class="input input--round" aria-label="Search" />

<!-- Colour and file -->
<input type="color" class="color-input" value="#00a39a" aria-label="Brand colour" />
<input type="file" class="file-input" aria-label="Attachment" />
```

#### B. Textarea (grows with `field-sizing: content`)
```html
<div class="field">
  <label for="feedback" class="field__label">Feedback</label>
  <textarea id="feedback" class="textarea"></textarea>
</div>

<!-- Starts at one line and grows; cap the height with --textarea-lines-max -->
<textarea class="textarea textarea--one-line" aria-label="Comment"></textarea>
```

#### C. Select
```html
<div class="field">
  <label for="role-select" class="field__label">Primary Role</label>
  <select id="role-select" class="select">
    <option value="">Choose a role</option>
    <option value="lead">Accessibility Lead</option>
  </select>
</div>

<!-- Customizable select (appearance: base-select; other browsers show the native select) -->
<select class="select select--custom" aria-label="Conformance target">
  <button type="button"><selectedcontent></selectedcontent></button>
  <option value="aa" selected>WCAG 2.2 AA</option>
  <option value="aaa">WCAG 2.2 AAA</option>
</select>
```

#### D. Checkboxes, Radios, Choices & Fieldset
```html
<fieldset class="fieldset">
  <legend class="legend">Audit deliverables</legend>
  <div class="choices">
    <label class="choice">
      <input type="checkbox" class="checkbox-input" checked />
      <span>Automated axe scan</span>
    </label>
    <label class="choice">
      <input type="checkbox" class="checkbox-input checkbox-input--lg" />
      <span>Keyboard review</span>
    </label>
  </div>
</fieldset>

<div class="choices choices--inline">
  <label class="choice">
    <input type="radio" name="frequency" class="radio-input" checked />
    <span>Daily</span>
  </label>
  <label class="choice">
    <input type="radio" name="frequency" class="radio-input" />
    <span>Weekly</span>
  </label>
</div>
```

#### E. Switch (`role="switch"`)
```html
<label class="switch">
  <span class="switch__label">Notifications <small>Email and push</small></span>
  <input type="checkbox" role="switch" class="visually-hidden" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>

<!-- Small, round, danger -->
<label class="switch switch--sm switch--round switch--danger">
  <span class="switch__label">Auto-delete</span>
  <input type="checkbox" role="switch" class="visually-hidden" />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>
```

#### F. Range & Range Lockup
`--value` drives the fill in Blink and WebKit; update it on `input`. Gecko draws the fill natively.
```html
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label">Volume</label>
    <output for="volume-control" class="field__output">65%</output>
  </div>
  <input id="volume-control" type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" />
</div>

<!-- Size and intent: pair intent with an output that states the value -->
<input type="range" class="range range--sm" min="0" max="100" value="30" style="--value: 30%;" aria-label="Balance" />
<input type="range" class="range range--danger" min="0" max="100" value="92" style="--value: 92%;" aria-label="Disk use" />

<!-- Range lockup (molecule): button + range + readout -->
<div class="range-lockup range-lockup--sm">
  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Mute">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
  </button>
  <input id="lockup-vol" type="range" class="range" min="0" max="100" value="85" style="--value: 85%;" aria-label="Volume" />
  <output for="lockup-vol" class="range-lockup__output">85%</output>
</div>

<!-- Bordered and round (the boundary lights up while a child has focus) -->
<div class="range-lockup range-lockup--bordered range-lockup--round range-lockup--fill">…</div>
```

#### G. Complete Form Layout & Submission Bar
```html
<form class="form">
  <div class="field">
    <label for="full-name" class="field__label">Full Name</label>
    <input id="full-name" type="text" class="input" required />
  </div>

  <div class="form__submission form__submission--right">
    <button type="reset" class="button button--subtle">
      <span>Cancel</span>
    </button>
    <button type="submit" class="button button--strong button--accent">
      <span>Submit</span>
    </button>
  </div>
</form>
```

### 7. Skip Link Primitive (WCAG 2.4.1 Bypass Blocks)
Put the skip link first in `<body>` and point it at a landmark (`<main id="main">`). It is collapsed until focused, then opens to at least 48px. The focus ring uses the link's text colour, so it shows on the accent fill. `.skip-link--floating` slides in from the top-start corner without moving the layout. In a `.skip-links` group, every link shows while one has focus. The audit is in `docs/audit/link.md`.

```html
<!-- In-flow bar, first in <body> -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- Floating card -->
<a href="#main" class="skip-link skip-link--floating">Skip to main content</a>

<!-- Several destinations -->
<nav class="skip-links" aria-label="Skip links">
  <ul>
    <li><a href="#main" class="skip-link">Skip to main content</a></li>
    <li><a href="#navigation" class="skip-link">Skip to navigation</a></li>
    <li><a href="#footer" class="skip-link">Skip to footer</a></li>
  </ul>
</nav>

<main id="main">…</main>
```

### 8. Link & Block Link Primitives
| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.link` | Prominence: default (accent, underlined), `--subtle` (text colour, underlined), `--plain` (underline on hover and focus only) | `--link-prominence` |
| `.block-link` | Prominence: outline (default), `--strong`, `--subtle`, `--plain`; size: default, `--sm` | `--block-link-prominence`, `--block-link-size` |

- **The underline marks the link** (WCAG 1.4.1). It is drawn at the full link colour and thickens on hover; there is no hover colour.
- **`--plain` never goes in running text.** Use it where context already marks the link: navigation, a list of links, a card title.
- **No intent or size on links.** A destructive action is a `.button--danger`; an inline link takes the size of its text.
- **On a dark band**, put `.color-scheme-dark` on the band. Every token inside flips, links included. There is no inverted link class.
- **Bare `<a>`** (no class) keeps an underline and the text colour, from the reset.
- `.link--stretched` makes the link's `::after` cover its nearest positioned ancestor, for a whole-row or whole-card target.
- Block link `--sm` keeps a 48px hit area unless the product opts into fine-pointer targets; a compact container steps it to `--sm`. Its label wraps, which is why it isn't a button.

#### A. Inline Links
```html
<!-- In running text -->
<p>Read the <a href="/accessibility" class="link">accessibility standards</a> first.</p>

<!-- Subtle: the text colour, still underlined -->
<a href="/category/design" class="link link--subtle">Design systems</a>

<!-- Plain: navigation only -->
<nav aria-label="Footer">
  <a href="/privacy" class="link link--plain">Privacy</a>
</nav>

<!-- External: no space between text and icon; say it opens a new tab -->
<a href="https://www.w3.org" class="link" target="_blank" rel="noopener noreferrer">W3C guidelines<span class="visually-hidden"> (opens in a new tab)</span><svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg></a>

<!-- On a dark band -->
<section class="color-scheme-dark">
  <p>Follow the <a href="/rss" class="link">RSS feed</a>.</p>
</section>
```

#### B. Block Links
```html
<a href="/case-studies/contrast" class="block-link">
  <span class="block-link__text">Colour contrast beyond 4.5:1</span>
  <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</a>

<!-- Prominence and size -->
<a href="/start" class="block-link block-link--strong">…</a>
<a href="/topics/wcag" class="block-link block-link--subtle block-link--sm">…</a>

<!-- A list of block links, set once on the container -->
<ul class="stack list-none padding-0 margin-0" style="--block-link-prominence: subtle;">
  <li>
    <a href="/topics/wcag" class="block-link">
      <span class="block-link__text">WCAG 2.2 guidelines</span>
      <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
    </a>
  </li>
</ul>
```

### 9. Icon & Icon Box Primitives
An icon is a glyph from the sprite (`icons/icons.svg`, one filled family), sized in `em` so it follows its text and coloured by the text (`currentColor`). Use one only where it speeds recognition (PRINCIPLES §6). The audit is in `docs/audit/icon.md`.

| Atom | Axes | Notes |
| :--- | :--- | :--- |
| `.icon` | Size (`1em`, `--sm`, `--lg`); intent (`--accent`, `--info`, `--danger`, `--warning`, `--success`) | `--dir` mirrors in right-to-left text; `--disclosure` rotates with the nearest `[aria-expanded]`. Any other size: set `--icon-size` or the font size. |
| `.icon-box` | Size (48px, `--sm` 32px, `--lg` 64px); prominence (plain, `--subtle`); corners (`--round`) | A fixed square frame that lines icons up with controls. Not interactive. Flags: `--icon-box-size`, `--icon-box-prominence`, `--icon-box-corners`; a compact container steps it to `--sm`. |

- Every icon carries `width="1em" height="1em"`, so it stays text-sized if CSS fails to load.
- Decorative icons (beside text, or inside a named control) carry `aria-hidden="true" focusable="false"`. A meaningful standalone icon takes `role="img"` and `aria-label`, or its control carries the name.
- Intent colours an icon but never carries meaning alone (WCAG 1.4.1). For muted icons, use the text colour utilities (`.text-color-muted`).
- Never draw icons inline with `stroke` paths. If the sprite lacks a glyph, add it to `icons/icons.svg` and run `npm run sync:icons`.

```html
<!-- Decorative icon beside text -->
<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>

<!-- Directional icon: mirrors in right-to-left text -->
<svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>

<!-- Size and intent -->
<svg class="icon icon--lg icon--success" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>

<!-- Meaningful standalone icon -->
<svg class="icon icon--warning" width="1em" height="1em" role="img" aria-label="Warning"><use href="#Warning"/></svg>

<!-- Icon box -->
<span class="icon-box icon-box--subtle icon-box--round" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
</span>
```

### 10. Card Primitive

#### A. Full Composable Card with Media (Full-Card Link via `.card__link`)
```html
<div class="card">
  <div class="card__thumb">
    <img 
      src="https://example.com/cover.jpg" 
      alt="Descriptive label for screen readers" 
      loading="lazy" 
    />
  </div>
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title">
          <a href="/articles/my-post" class="card__link">Article Headline</a>
        </h3>
        <p class="card__subtitle">Supporting Subtitle</p>
      </hgroup>
    </header>
    <div class="card__body">
      <p>Short summary paragraph describing the content clearly.</p>
    </div>
    <footer class="card__footer">
      <time class="card__date" datetime="2026-09-30">30 September 2026</time>
    </footer>
  </article>
</div>
```

#### B. Content Card with Status & Action Button
```html
<div class="card">
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title">
          <a href="/settings/security" class="card__link">Security Settings</a>
        </h3>
        <p class="card__subtitle">Two-Factor Authentication</p>
      </hgroup>
      <span class="status status--success"><span class="status__text">Active</span></span>
    </header>
    <div class="card__body">
      <p>Manage passkeys, hardware tokens, and two-factor authentication.</p>
    </div>
    <footer class="card__footer">
      <span>Updated 2 days ago</span>
      <button type="button" class="button button--subtle">
        <span>Configure</span>
      </button>
    </footer>
  </article>
</div>
```

#### C. Card Composition in CSS Grid
```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-16);">
  <div class="card">
    <div class="card__thumb">
      <img src="https://example.com/thumb.jpg" alt="" loading="lazy" />
    </div>
    <article class="card__content">
      <header class="card__header">
        <h3 class="card__title"><a href="/post-1" class="card__link">Card Title</a></h3>
      </header>
      <div class="card__body">
        <p>Card body copy.</p>
      </div>
      <footer class="card__footer">
        <time datetime="2026-09-30">30 September 2026</time>
      </footer>
    </article>
  </div>
</div>
#### D. Card with Dynamic Concentric Radius (`.card--dynamic-corners`)
```html
<!-- Outer card radius aligns mathematically with nested button curvature:
     --card-radius: calc(min(var(--button-radius), var(--button-min-size)/2) + var(--card-padding) + var(--card-border-width)) -->
<div class="card card--dynamic-corners" style="--button-radius: var(--radius-round);">
  <article class="card__content">
    <header class="card__header">
      <h3 class="card__title"><a href="/plan">Concentric Plan</a></h3>
    </header>
    <div class="card__body">
      <p>Card outer boundary curves harmoniously with the round action button below.</p>
    </div>
    <footer class="card__footer">
      <button type="button" class="button button--strong button--accent">
        <span>Get Started</span>
      </button>
    </footer>
  </article>
</div>
```

#### E. Card with Interstitial Band (`.card__band`)
```html
<!-- Dedicated shelf between header & body or body & footer for toolbars, steppers, or notices -->
<div class="card card--bordered card--ruled">
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title">Project Setup</h3>
        <p class="card__subtitle">Continuous Deployment</p>
      </hgroup>
    </header>

    <!-- Interstitial Band (supports .card__band--subtle, .card__band--ruled, .card__band--flush) -->
    <div class="card__band card__band--subtle">
      <span class="status status--accent status--round"><span class="status__text">Step 2 of 4</span></span>
      <div class="button-group button-group--tight buttons-sm buttons-subtle">
        <button type="button" class="button"><span>Back</span></button>
        <button type="button" class="button button--strong button--accent"><span>Proceed</span></button>
      </div>
    </div>

    <div class="card__body">
      <p>Card body copy sits below the band, properly framed by ruled dividers.</p>
    </div>
  </article>
</div>
```

#### E. Card Header with Multi-Line Toolbar (`.card__header-line`)
```html
<!-- Forces a full-width second line in the card header without artificial wrapper divs -->
<div class="card card--panel card--bordered">
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title">Queue & Schedule</h3>
        <p class="card__subtitle">8 items queued</p>
      </hgroup>
      <div class="cluster gap-xs align-items-center">
        <button type="button" class="button button--sm"><span>Auto-Balance</span></button>
      </div>

      <!-- Forced full-width second row for search, filter pills, or segmented views -->
      <div class="card__header-line inline justify-content-between align-items-center flex-wrap gap-xs">
        <input type="search" class="input input--sm" placeholder="Search queued items..." aria-label="Search items" />
        <div class="button-group button-group--tight buttons-subtle" role="radiogroup">
          <button type="button" class="button button--sm is-active"><span>All</span></button>
          <button type="button" class="button button--sm"><span>Music</span></button>
        </div>
      </div>
    </header>
    <div class="card__body">
      <p>Card body content.</p>
    </div>
  </article>
</div>
```

#### D. Atomic Typography Composition with Card Hooks
In Design For Humans, `.card` is an **Organism** that composes **Typography Atoms** (`.heading`, `.small-heading`, `.subheading`, `.micro-heading`, `.display-title`, `.text`, etc.).
`.card__title` and `.card__subtitle` are **structural layout hooks** — out of the box they handle margin resets (`margin: 0`), text wrapping (`text-wrap: balance`), minimum inline sizing (`min-inline-size: 0`), and header flex expansion (`flex: 1`), while intentionally **deferring typography styles** to atom primitives:

```html
<!-- Standard Card Header: Uses .heading atom -->
<header class="card__header">
  <hgroup class="card__hgroup">
    <h2 class="card__title heading">Analytics Overview</h2>
    <p class="card__subtitle subheading">Real-time telemetry stream</p>
  </hgroup>
</header>

<!-- Compact Widget Card: Uses .small-heading atom -->
<header class="card__header">
  <hgroup class="card__hgroup">
    <h3 class="card__title small-heading">Storage Quota</h3>
    <p class="card__subtitle micro-heading text-muted">Updated 5m ago</p>
  </hgroup>
</header>

<!-- Hero / Editorial Card: Uses .display-title or .title atom -->
<header class="card__header">
  <h1 class="card__title display-title">Volume XII</h1>
</header>
```

> **Design System Rule:** Never define rigid typography cascades directly on organism element hooks (like `.card__title` or `.card__subtitle`). Always let typography atoms control font-size, line-height, casing, and weights.

### 11. Banner Primitive

#### A. Standard Banner
```html
<div class="banner" role="region" aria-label="Notification">
  <div class="banner__inner">
    <p>This is a standard banner message.</p>
  </div>
</div>
```

#### B. Semantic Status Banners with Action Buttons
```html
<!-- Success Banner with Subtle Check Action -->
<div class="banner banner--success" role="status">
  <div class="banner__inner">
    <p>This is a success banner message.</p>
  </div>
  <button type="button" class="button button--subtle banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
      <use href="#Check" />
    </svg>
    <span class="visually-hidden">Action</span>
  </button>
</div>

<!-- Warning Banner with Subtle Check Action -->
<div class="banner banner--warning" role="region" aria-label="Warning">
  <div class="banner__inner">
    <p>This is a warning banner message.</p>
  </div>
  <button type="button" class="button button--subtle banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
      <use href="#Check" />
    </svg>
    <span class="visually-hidden">Action</span>
  </button>
</div>

<!-- Error / Danger Banner with Primary Dismiss Action -->
<div class="banner banner--error" role="alert">
  <div class="banner__inner">
    <p>This is an error banner message.</p>
  </div>
  <button type="button" class="button button--strong button--accent banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
      <use href="#Close" />
    </svg>
    <span class="visually-hidden">Close</span>
  </button>
</div>
```

#### C. Verbose Banner with Subheading and Button Actions
```html
<div class="banner" role="region" aria-label="Action required">
  <div class="banner__inner">
    <h3 class="subheading">Subheading</h3>
    <p>This is more verbose banner message.</p>
    <div style="display: flex; gap: var(--spacing-8);">
      <button type="button" class="button">
        <span>Cancel</span>
      </button>
      <button type="button" class="button button--strong button--accent">
        <span>OK</span>
      </button>
    </div>
  </div>
</div>
```

#### D. Dynamic Concentric Corners Banner (`.banner--dynamic-corners`)
```html
<!-- Outer curvature scales concentrically with nested round action button:
     --banner-radius: calc(min(var(--button-radius), var(--button-min-size)/2) + var(--banner-outer-padding) + var(--banner-border-width)) -->
<div class="banner banner--dynamic-corners buttons-round" role="region" aria-label="Confirmation">
  <div class="banner__inner">
    <p style="font-size: var(--typography-font-size-1); font-weight: var(--font-weight-bold);">Continue?</p>
  </div>
  <button type="button" class="button banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
      <use href="#Check" />
    </svg>
    <span class="visually-hidden">Action</span>
  </button>
</div>
```

### 12. Prose Primitive (Rich Text & Editorial Layout)

#### A. Standard Article Prose
```html
<article class="prose">
  <h1>Main Article Title</h1>
  <p>Editorial paragraph formatted with balanced line-lengths and proportional numbers.</p>
  
  <h2>Section Heading</h2>
  <p>Paragraph containing an <a href="/guide">accessible hyperlink</a> and inline <code>code sample</code>.</p>
  
  <blockquote>
    <p>A memorable editorial blockquote with inset leading accent border.</p>
  </blockquote>

  <ul>
    <li>First key takeaway item</li>
    <li>Second key takeaway item</li>
  </ul>
</article>
```

#### B. Code Syntax Block inside Prose
```html
<div class="prose">
  <pre><code>:where(textarea) {
  field-sizing: content;
  min-block-size: 3lh;
}</code></pre>
</div>
```

#### C. Figure with Caption
```html
<div class="prose">
  <figure>
    <img src="https://example.com/figure.jpg" alt="Descriptive accessible text" loading="lazy" />
    <figcaption>
      <p>Figure 1: Token architecture and responsive layout.</p>
    </figcaption>
  </figure>
</div>
```

#### D. Default Fixed Scale Prose
```html
<!-- By default, .prose enforces fixed scale steps and a locked 1rem vertical rhythm -->
<article class="prose">
  <h1>Fixed Title (Size 5)</h1>
  <p>Body paragraphs fixed to 1rem with locked vertical rhythm.</p>
  <h2>Fixed Section Heading (Size 3)</h2>
  <h3>Fixed Subheading (Size 1)</h3>
</article>
```

#### E. Fluid & Container-Adaptive Prose via Sizing Utilities
```html
<!-- Fluid scaling via font-sizing-fluid utility -->
<div class="font-sizing-fluid">
  <article class="prose">
    <h2>Fluid Responsive Section</h2>
    <p>Body copy scales smoothly across viewports via clamp().</p>
  </article>
</div>

<!-- Container-adaptive scaling via font-sizing-cq utility -->
<div class="font-sizing-cq" style="container-type: inline-size;">
  <article class="prose">
    <h2>Container-Adaptive Section</h2>
    <p>Body copy scales seamlessly according to container width via cqi units.</p>
  </article>
</div>
```

#### F. Scoped Prose Boundary & Cancellation (`.prose-end`)
```html
<!-- .prose styles children using @scope (:where(.prose)) to (:where(.prose-end)) -->
<!-- Placing .prose-end on any sub-tree cancels prose typography, allowing custom embedded UI -->
<article class="prose">
  <h2>Editorial Section</h2>
  <p>Standard editorial copy formatted by prose.</p>

  <!-- Embedded widget opting out of prose styling -->
  <div class="prose-end">
    <div class="card">
      <p>Content inside .prose-end is free from prose paragraph margins and heading styles.</p>
    </div>
  </div>

  <p>Prose styling resumes for subsequent editorial children.</p>
</article>
```

### 13. Table Primitive

#### A. Standard Data Table with Accessible Scroll Container
```html
<div class="table-container" tabindex="0" role="region" aria-label="Quarterly Financial Results">
  <table class="table">
    <caption class="table__caption">Quarterly Financial Results (Q3 2026)</caption>
    <thead>
      <tr>
        <th scope="col">Department</th>
        <th scope="col" class="table__cell--numeric">Budget</th>
        <th scope="col" class="table__cell--numeric">Actual</th>
        <th scope="col" class="table__cell--numeric">Variance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Engineering</th>
        <td class="table__cell--numeric">$120,000</td>
        <td class="table__cell--numeric">$114,500</td>
        <td class="table__cell--numeric">-$5,500</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total</th>
        <td class="table__cell--numeric">$120,000</td>
        <td class="table__cell--numeric">$114,500</td>
        <td class="table__cell--numeric">-$5,500</td>
      </tr>
    </tfoot>
  </table>
</div>
```

#### B. Table Composed inside Card with Striped Rows
```html
<div class="card">
  <div class="card__body" style="padding: 0;">
    <div class="table-container" tabindex="0" role="region" aria-label="User Directory" style="margin-block-end: 0;">
      <table class="table table--striped table--hover">
        <thead>
          <tr>
            <th scope="col" class="table__cell--fit">User</th>
            <th scope="col">Role</th>
            <th scope="col" class="table__cell--fit">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="table__cell--fit">Paul Woods</th>
            <td>Design Engineer</td>
            <td class="table__cell--fit"><span class="status status--success"><span class="status__text">Active</span></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

#### C. Sortable Header Table
```html
<div class="table-container" tabindex="0" role="region" aria-label="Package Registry">
  <table class="table table--hover">
    <thead>
      <tr>
        <th scope="col">
          <button type="button" class="table__sort-button" aria-sort="ascending" aria-label="Sort by package name">
            <span>Package</span>
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
          </button>
        </th>
        <th scope="col" class="table__cell--numeric">
          <button type="button" class="table__sort-button" aria-sort="descending" aria-label="Sort by downloads">
            <span>Downloads</span>
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><code>@design-for-humans/css</code></th>
        <td class="table__cell--numeric">14,280</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### D. Full Sticky Matrix Table (.table--sticky-*)
```html
<div class="table-container" tabindex="0" role="region" aria-label="Audit Matrix" style="max-block-size: 20rem; overflow: auto;">
  <table class="table table--sticky-head table--sticky-footer table--sticky-first-column table--sticky-last-column table--striped">
    <caption class="table__caption">WCAG 2.2 Conformance Audit Results</caption>
    <thead>
      <tr>
        <th scope="col" class="table__cell--fit">Component</th>
        <th scope="col">WCAG Criterion</th>
        <th scope="col">Description</th>
        <th scope="col" class="table__cell--fit">Level</th>
        <th scope="col" class="table__cell--fit table__cell--center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="table__cell--fit">Modal Dialog</th>
        <td class="table__cell--long">2.1.2 No Keyboard Trap</td>
        <td class="table__cell--long">Modal dialogs must not trap keyboard focus when cycling elements.</td>
        <td class="table__cell--fit"><span class="status"><span class="status__text">Level A</span></span></td>
        <td class="table__cell--fit table__cell--center">
          <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" class="table__cell--fit">Summary</th>
        <td colspan="3" class="table__cell--long">All core components passing compliance</td>
        <td class="table__cell--fit table__cell--center"><span class="status status--success"><span class="status__text">Passed</span></span></td>
      </tr>
    </tfoot>
  </table>
</div>
```

#### E. Flush Table (.table--flush)
```html
<div class="table-container" tabindex="0" role="region" aria-label="Flush Alignment Summary">
  <table class="table table--flush">
    <caption class="table__caption">Editorial Aligned Table</caption>
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col" class="table__cell--numeric">Score</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Button</th>
        <td class="table__cell--numeric">100%</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### F. Token-Driven Column Sizing Helpers (.table__col--*)
```html
<!-- Eliminates inline style="inline-size: ..." on <col>, <th>, and <td> -->
<div class="table-container" tabindex="0" role="region" aria-label="Broadcast Queue">
  <table class="table table--striped table--hover">
    <caption class="table__caption">Broadcast Queue</caption>
    <thead>
      <tr>
        <th scope="col" class="table__col--index"><span class="visually-hidden">Position</span>#</th>
        <th scope="col" class="table__col--sm">Time</th>
        <th scope="col" class="table__col--fill">Asset Title</th>
        <th scope="col" class="table__col--sm">Type</th>
        <th scope="col" class="table__col--sm table__col--num">Duration</th>
        <th scope="col" class="table__col--md">Status</th>
        <th scope="col" class="table__col--actions"><span class="visually-hidden">Actions</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table__col--index text-muted">1</td>
        <td class="table__col--sm font-mono text-muted">10:45 AM</td>
        <td class="table__col--fill">Solaris Horizon</td>
        <td class="table__col--sm"><span class="chip chip--subtle chip--sm"><span class="chip__text">Music</span></span></td>
        <td class="table__col--num font-mono text-muted">03:52</td>
        <td class="table__col--md"><span class="status status--success status--sm"><span class="status__text">Live</span></span></td>
        <td class="table__col--actions">
          <button type="button" class="button button--subtle button--icon button--sm" aria-label="Options">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 14. Button Group Primitive

#### A. Standard Button Group with Divider & Text Content
```html
<div class="button-group">
  <a href="/prev" class="button"><span>Previous</span></a>
  <span class="button-group__content button-group__fill">Step 2 of 4</span>
  <hr class="divider" aria-orientation="vertical">
  <button type="button" class="button button--strong button--accent"><span>Next</span></button>
</div>
```

#### B. Full-Width Fill & Stacked Button Groups
```html
<!-- Fill (Stretches buttons across container width) -->
<div class="button-group button-group--stretch">
  <a href="/drafts" class="button"><span>Drafts</span></a>
  <span class="button"><span>Published</span></span>
  <button type="button" class="button button-group__end button--strong button--accent"><span>Create</span></button>
</div>

<!-- Stacked & Ruled (Vertical column listbox / menu with section headings & auto-pushed trailing badges) -->
<div class="button-group button-group--stacked button-group--ruled buttons-subtle" role="listbox" aria-label="Action Menu">
  <h3 class="button-group__content micro-heading text-muted">Primary Actions</h3>
  <button type="button" class="button" role="option">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
    <span class="button__text">Share Document</span>
    <span class="status status--sm"><span class="status__text">New</span></span>
  </button>
  <button type="button" class="button" role="option">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
    <span class="button__text">Duplicate</span>
    <kbd class="kbd">⌘D</kbd>
  </button>
  <h3 class="button-group__content micro-heading text-muted">Danger Zone</h3>
  <button type="button" class="button button--danger" role="option">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
    <span class="button__text">Delete Permanently</span>
  </button>
</div>
```

### 15. Divider Primitive
A rule between groups. Organisms (menu, combobox, batch actions, button group) place it; they never restyle it. Classes only: a bare `<hr>` gets a quiet rule from the reset. The audit is in `docs/audit/divider.md`.

| Axis | Values |
| :--- | :--- |
| Orientation | Horizontal (default); vertical when the **direct parent** sets `--direction: row` (`.inline`, `.cluster`, `.button-group`, `.batch-actions`), or anywhere with `aria-orientation="vertical"` |
| Prominence | Default (quiet, decorative), `--strong` (at least 3:1, for a rule that is the only boundary) |
| Style | Solid (default), `--dashed` |

- `--direction` doesn't inherit, so a divider nested deeper inside a row stays horizontal.
- Put `aria-orientation="vertical"` on every vertical divider: assistive technology hears it, and it forces the orientation. A purely decorative divider can take `aria-hidden="true"` instead.
- Inside `<menu>`, `<ul>` or `<ol>`, use `<li role="separator" class="divider"></li>`. In a listbox, where a separator isn't allowed, use `role="none"`.
- Theming: `--divider-width`, `--divider-style`, `--divider-color`, `--divider-strong-color`.

#### A. Horizontal
```html
<hr class="divider">
<hr class="divider divider--strong">
<hr class="divider divider--dashed">
```

#### B. Vertical (in a row)
```html
<div class="button-group">
  <button type="button" class="button button--subtle"><span>Dashboard</span></button>
  <hr class="divider" aria-orientation="vertical">
  <button type="button" class="button button--subtle"><span>Settings</span></button>
</div>
```

#### C. In a Menu
```html
<menu class="menu" role="menu" aria-label="Document options">
  <li role="none"><button type="button" class="menu__item" role="menuitem"><span>Duplicate</span></button></li>
  <li role="separator" class="divider"></li>
  <li role="none"><button type="button" class="menu__item menu__item--destructive" role="menuitem"><span>Delete</span></button></li>
</menu>
```

### 16. Breadcrumb Primitive

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a class="link" href="/topics">Topics</a></li>
    <li><a class="link" href="/topics/visual-design">Visual Design</a></li>
    <li aria-current="page">Modular Scale</li>
  </ol>
</nav>
```

### 17. Pagination & Page Count Primitives

#### A. Numbered Pagination Cluster (.pagination + .button-group)
```html
<nav class="pagination button-group buttons-subtle" aria-label="Pagination">
  <span class="button is-active" aria-current="page"><span>1</span></span>
  <a class="button" href="/page/2"><span>2</span></a>
  <a class="button" href="/page/3"><span>3</span></a>
  <hr class="divider" aria-orientation="vertical">
  <a class="button" href="/page/10"><span>10</span></a>
</nav>
```

#### B. Directional Navigation with Text Indicator
```html
<nav class="pagination button-group buttons-subtle" aria-label="Pagination">
  <span aria-disabled="true" class="button">
    <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false">
      <use href="#ChevronLeft"/>
    </svg>
    <span class="visually-hidden">Previous page</span>
  </span>
  <hr class="divider" aria-orientation="vertical">
  <span class="button-group__content">Page 1 of 10</span>
  <hr class="divider" aria-orientation="vertical">
  <a class="button" href="/page/2">
    <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false">
      <use href="#ChevronRight"/>
    </svg>
    <span class="visually-hidden">Next page</span>
  </a>
</nav>
```

#### C. Page Count with Jump Form (.page-count + .inline-form + .inline-field)
```html
<!-- Jump via Number Input -->
<div class="page-count">
  <p class="page-count__info">Page 2 of 10</p>
  <form class="page-count__jump inline-form">
    <div class="inline-field">
      <label for="page-jump-input" class="field__label">Go to page</label>
      <input class="input" type="number" id="page-jump-input" name="page" min="1" max="10" value="2" style="inline-size: 5rem;">
    </div>
    <button class="button button--subtle" type="submit"><span>Go</span></button>
  </form>
</div>

<!-- Jump via Select Menu -->
<div class="page-count">
  <p class="page-count__info">Page 2 of 10</p>
  <form class="page-count__jump inline-form">
    <div class="inline-field">
      <label for="page-jump-select" class="field__label">Go to page</label>
      <select id="page-jump-select" name="page" class="select">
        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>
      </select>
    </div>
    <button class="button button--subtle" type="submit"><span>Go</span></button>
  </form>
</div>
```

### 18. Toast Primitive (Live Region Status Stacks Composed with Banner)

#### A. Toast Stack Container with Composed Success Toast
```html
<!-- Toast Stack Container (Anchored to Viewport Corner) -->
<aside class="toast-stack toast-stack--bottom-end" aria-label="Notifications">
  <div class="toast" role="status" aria-live="polite">
    <div class="banner banner--success banner--dynamic-corners buttons-round" role="none">
      <div class="banner__inner">
        <p><strong>Settings saved</strong></p>
        <p>Your preferences have been updated successfully.</p>
      </div>
      <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </div>
  </div>
</aside>
```

#### B. Urgent Alert Toast (Assertive Live Region)
```html
<div class="toast" role="alert" aria-live="assertive">
  <div class="banner banner--error banner--dynamic-corners buttons-round" role="none">
    <div class="banner__inner">
      <p><strong>Connection Lost</strong></p>
      <p>Unable to sync changes to server.</p>
    </div>
    <button type="button" class="button button--strong button--accent button--icon banner__action" aria-label="Dismiss error">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    </button>
  </div>
</div>
```

#### C. Toast Stack Placement Modifiers
```html
<!-- Available stack placements: -->
<aside class="toast-stack toast-stack--bottom-end"></aside>
<aside class="toast-stack toast-stack--bottom-start"></aside>
<aside class="toast-stack toast-stack--bottom-center"></aside>
<aside class="toast-stack toast-stack--top-end"></aside>
<aside class="toast-stack toast-stack--top-start"></aside>
<aside class="toast-stack toast-stack--top-center"></aside>
```

### 18b. Batch Actions Primitive (`.batch-actions`)
Provides a focused, accessible floating or docked batch operation toolbar (`role="toolbar"`) triggered upon multi-item selection.
Composes Badge, Button, Button Group, and Icon atoms into structural hook classes:
- `.batch-actions`: Main toolbar container (floating pill by default, with `--docked`, `--inline`, `--contrast`, `--compact`, `--flush`, and `--plain` modifiers).
- `.batch-actions--flush`: Removes corner radius and border width.
- `.batch-actions--plain`: Transparent background, zero radius, and borderless (ideal for embedding seamlessly inside `.card__band`).
- `.batch-actions__summary`: Count badge and selection description label.
- `.batch-actions__actions`: Button-group containing bulk operations.
- `.batch-actions__dismiss`: Action to clear or cancel the selection.
- `.divider` between groups: vertical, because the bar sets `--direction: row`. Decorative here, so `aria-hidden="true"`.

```html
<!-- Floating Batch Actions Bar -->
<aside class="batch-actions" role="toolbar" aria-label="Batch operations">
  <!-- Summary Hook -->
  <div class="batch-actions__summary">
    <span class="badge badge--accent"><span class="badge__text">3</span></span>
    <span class="micro-heading">3 items selected</span>
  </div>

  <hr class="divider" aria-hidden="true" />

  <!-- Actions Hook -->
  <div class="batch-actions__actions">
    <div class="button-group button-group--tight buttons-sm buttons-subtle">
      <button type="button" class="button">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
        <span>Export</span>
      </button>
      <button type="button" class="button">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
        <span>Edit</span>
      </button>
      <button type="button" class="button button--danger">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
        <span>Delete</span>
      </button>
    </div>
  </div>

  <hr class="divider" aria-hidden="true" />

  <!-- Dismiss Hook -->
  <div class="batch-actions__dismiss">
    <button type="button" class="button button--subtle button--icon button--sm" aria-label="Clear selection">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      <span class="visually-hidden">Clear selection</span>
    </button>
  </div>
</aside>

<!-- Docked Variant (Embedded inside Card or Table container) -->
<aside class="batch-actions batch-actions--docked" role="toolbar" aria-label="Table batch actions">
  <div class="batch-actions__summary">
    <span class="badge badge--accent"><span class="badge__text">5</span></span>
    <span>5 selected</span>
  </div>
  <div class="batch-actions__actions">
    <button type="button" class="button button--strong button--accent button--sm"><span>Archive</span></button>
  </div>
  <div class="batch-actions__dismiss">
    <button type="button" class="button button--plain button--sm"><span>Deselect all</span></button>
  </div>
</aside>
```

### 19. Wrapper Primitive (Content Width Constraints & Alignment)

#### A. Standard Centered Site-Width Wrapper
```html
<div class="wrapper">
  <h1>Page Title</h1>
  <p>Centered content constrained to standard site width (--site-width / 75rem).</p>
</div>
```

#### B. Size Scale & Alignments
```html
<!-- Large Block Width Constraint (40rem) -->
<div class="wrapper wrapper--lg">
  <article>Constrained editorial article content.</article>
</div>

<!-- BrandMedium Block Width Aligned to Start (30rem) -->
<div class="wrapper wrapper--md wrapper--start">
  <p>Left-aligned medium-width content.</p>
</div>

<!-- Vertically Centered Grid Wrapper -->
<div class="wrapper wrapper--middle">
  <div class="card">Vertically and horizontally centered card.</div>
</div>
```

#### C. Split / Sidebar Layout Primitive (`.split`)
```html
<!-- 2-Column Responsive Layout: Sidebar on start, main content auto-expanding on end -->
<div class="split split--sm">
  <aside class="card">
    <h3>Sidebar Filters</h3>
  </aside>
  <main class="stack">
    <h2>Main Content Area</h2>
  </main>
</div>

<!-- Reverse Split: Main content on start, inspector sidebar on end -->
<div class="split split--sm split--end">
  <main class="stack">
    <h2>Main Editor</h2>
  </main>
  <aside class="card">
    <h3>Inspector Panel</h3>
  </aside>
</div>
```

#### D. Application Shell & Multi-Sidebar Workspace (`.app`, `.app--viewport`, `.app__workspace`)
The canonical Holy Grail application shell. Grid rows: `auto minmax(0, 1fr) auto`. Dynamic viewport containment: `.app--viewport` (`100dvb`).
`.app__workspace` coordinates multiple sidebars/rails side-by-side with the main content canvas under sticky top chrome.

```html
<!-- Full Application Workspace Shell -->
<div class="app app--viewport">
  <!-- Pinned Top Header -->
  <header class="header header--sticky">
    <nav aria-label="Global navigation">...</nav>
  </header>

  <!-- Multi-Sidebar Workspace Container -->
  <div class="app__workspace">
    <!-- Slim Navigation Rail (4.5rem) -->
    <aside class="sidebar sidebar--rail" aria-label="Primary Navigation">
      <div class="sidebar__scroller">
        <nav class="tab-list tab-list--vertical tab-list--plain tab-list--sm" aria-label="Primary">
          <ul>
            <li><a href="/studio" class="tab tab--icon" aria-current="page"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Radio"/></svg><span class="tab__text">Studio</span></a></li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Contextual Submenu Sidebar -->
    <aside class="sidebar sidebar--flush" aria-label="Sub-navigation">
      <div class="sidebar__scroller">
        <nav class="tab-list tab-list--vertical tab-list--plain tab-list--flush tab-list--sm" aria-label="Sub-navigation">
          <ul>
            <li><a href="#feed" class="tab" aria-current="page"><span class="tab__text">Live Feed</span></a></li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content Canvas -->
    <main class="main" id="main-content">
      <div class="prose">...</div>
    </main>
  </div>

  <!-- Persistent Bottom Dock or Footer -->
  <footer class="footer">
    <p>System status</p>
  </footer>
</div>
```

#### E. Sidebar Primitive (`.sidebar`, `.sidebar--sticky`, `.sidebar--flush`, `.sidebar--rail`)
```html
<!-- 1. Standard Sticky Sidebar -->
<aside class="sidebar sidebar--sticky" aria-label="Docs Nav">
  <header class="sidebar__header"><h3 class="small-heading">Sections</h3></header>
  <div class="sidebar__scroller">...</div>
  <footer class="sidebar__footer"><span class="small-text">v2.4.0</span></footer>
</aside>

<!-- 2. Flush Sidebar for Edge-to-Edge Tabs -->
<aside class="sidebar sidebar--flush" aria-label="File Tree">
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--flush tab-list--vertical" aria-label="Files">...</nav>
  </div>
</aside>

<!-- 3. Slim Navigation Rail -->
<aside class="sidebar sidebar--rail" aria-label="Global Rail">
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--vertical tab-list--plain tab-list--sm" aria-label="Global">...</nav>
  </div>
</aside>
```

#### F. Mobile Bottom Tab Dock (`.tab-list--docked`)
A floating tab list fixed to the bottom of the viewport on small screens (`md:hide`). See §24.
```html
<nav class="tab-list tab-list--segmented tab-list--round tab-list--floating tab-list--docked md:hide" aria-label="Mobile">
  <a href="/" class="tab tab--icon" aria-current="page"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg><span class="tab__text">Home</span></a>
  <a href="/schedule" class="tab tab--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#List"/></svg><span class="tab__text">Schedule</span></a>
  <a href="/settings" class="tab tab--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg><span class="tab__text">Settings</span></a>
</nav>
```

### 19b. Grid & Grid Carousel Primitives (`.grid`, `.grid--carousel`)

#### A. Standard Auto-Fill / Auto-Fit Grid
```html
<!-- Fluid Auto-Fit Grid with token min-width (2xs = 8rem, xs = 16rem, sm = 24rem, md = 30rem) -->
<div class="grid grid--auto-fit grid--2xs">
  <div class="card card--compact card--bordered">Card 1</div>
  <div class="card card--compact card--bordered">Card 2</div>
  <div class="card card--compact card--bordered">Card 3</div>
  <div class="card card--compact card--bordered">Card 4</div>
</div>
```

#### B. Grid Carousel (`.grid--carousel` / `.grid-carousel`)
Single-row horizontal scroll-snapping card carousel powered by `display: grid` and `grid-auto-flow: column`. Cards automatically maintain equal height and peek into view to invite horizontal swipe/scroll interaction without breaking to new lines.
```html
<!-- Always-On Snap Carousel -->
<div class="grid grid--carousel">
  <div class="card card--compact card--bordered card--ruled">Card 1</div>
  <div class="card card--compact card--bordered card--ruled">Card 2</div>
  <div class="card card--compact card--bordered card--ruled">Card 3</div>
</div>
```

#### C. Responsive Carousel Mode (`max-md:grid--carousel`)
Switches to horizontal snap-scroller below `md` (<= 768px), while expanding into fluid auto-fit wrapping grid on desktop (> 768px).
```html
<div class="grid grid--auto-fit grid--2xs max-md:grid--carousel">
  <div class="card card--compact card--bordered card--ruled">Metric 1</div>
  <div class="card card--compact card--bordered card--ruled">Metric 2</div>
  <div class="card card--compact card--bordered card--ruled">Metric 3</div>
  <div class="card card--compact card--bordered card--ruled">Metric 4</div>
</div>
```

### 20. Text & Heading Primitives (Typography Presets)

Nine atoms, one step of the scale each. The class sets the look; choose the element for its meaning (an `h2` can look like a `.small-heading`). The audit is in `docs/audit/text.md`.

| Class | Job | Step |
| :--- | :--- | :--- |
| `.display-title` | Hero and cover titles | 5 (fluid 5–8) |
| `.title` | Page titles | 3 (fluid 3–5) |
| `.heading` | Section headings | 2 (fluid 2–3) |
| `.subheading` | Sub-section headings | 1 |
| `.small-heading` | Card and panel headings | 0 |
| `.micro-heading` | Uppercase eyebrow and group labels | −1 |
| `.large-text` | Lead paragraphs | 1 |
| `.text` | Body copy | 0 |
| `.small-text` | Hints, captions, metadata | −1 |

- **Fixed by default.** Fluid, `cq` and compact sizing come from the container (§ Core Law 3).
- Headings balance their lines; body text uses `text-wrap: pretty`.
- `.text` and `.large-text` stop at `--body-measure` (66ch). Set `--body-measure: none` on a container to lift it.
- No literal fallbacks: if tokens fail to load, text inherits its parent's size and stays legible.
- Colour and weight come from utilities: `.text-muted` (or `.text-color-muted`), `.font-bold`, `.font-serif`, `.font-mono`. There is no `.strong-text`, `.alt-text`, `.micro-text`, `.caption` or `.nano-*`.

#### A. Headings
```html
<h1 class="display-title">Display Title</h1>
<h1 class="title">Page Title</h1>
<h2 class="heading">Section Heading</h2>
<h3 class="subheading">Sub-section Heading</h3>
<h4 class="small-heading">Card Heading</h4>
<p class="micro-heading text-muted">Category Eyebrow</p>
```

#### B. Body Text
```html
<p class="large-text">Editorial lead-in paragraph.</p>
<p class="text">Body copy for reading.</p>
<p class="small-text text-muted">Updated 2 days ago</p>
```

#### C. Sizing Modes
```html
<!-- Fluid: headings and body grow with the viewport -->
<article class="font-sizing-fluid">
  <h1 class="title">Fluid Title</h1>
  <p class="text">Fluid body copy.</p>
</article>

<!-- Container: sized to the container's width -->
<div class="font-sizing-cq" style="container-type: inline-size;">
  <h2 class="heading">Container Heading</h2>
  <p class="text">Container body copy.</p>
</div>

<!-- Compact: one step down -->
<div class="font-sizing-compact">
  <h2 class="heading">Compact Heading</h2>
</div>
```

---

### 21. Alert Placement (Full-Width Site Announcements & Pinned Banners)
`banner` is the only visual component for announcements. An alert is a banner with `role="alert"` (urgent) or `role="status"` (non-critical). `.alert` is a placement container only (sticky, top, bottom); it must not restyle the banner or define its own `--alert-*` tokens. Duplicate alert tokens and styles are pending removal.

#### A. Sticky Top Announcement Bar with Constrained Content
```html
<aside class="alert alert--sticky" role="region" aria-label="System Notice">
  <div class="wrapper">
    <div class="banner banner--warning buttons-sm" role="none">
      <div class="banner__inner">
        <h3 class="subheading">Scheduled Maintenance</h3>
        <p>Services will undergo maintenance on Sunday from 02:00 to 04:00 UTC.</p>
      </div>
      <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </div>
  </div>
</aside>
```

#### B. Full-Width Edge-to-Edge System Bar
```html
<aside class="alert alert--top" role="region" aria-label="Global Announcement">
  <div class="banner banner--info buttons-sm" role="none">
    <div class="banner__inner">
      <p><strong>New Release:</strong> Component library v2.0 is now available.</p>
    </div>
    <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss announcement">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    </button>
  </div>
</aside>
```

#### C. Bottom Fixed Consent Bar
```html
<aside class="alert alert--bottom" role="region" aria-label="Cookie Preferences">
  <div class="wrapper">
    <div class="banner buttons-sm" role="none">
      <div class="banner__inner">
        <p>We use cookies to ensure optimal site functionality.</p>
      </div>
      <div style="display: flex; gap: var(--spacing-8); align-self: center;">
        <button type="button" class="button button--subtle"><span>Manage</span></button>
        <button type="button" class="button button--strong button--accent"><span>Accept All</span></button>
      </div>
    </div>
  </div>
</aside>
```

### 22. Stack, Inline & Cluster Primitives (1D Layout Flows)

#### A. Vertical Stack (.stack)
```html
<div class="stack">
  <div class="card">First Card</div>
  <div class="card">Second Card</div>
</div>
```

#### B. Horizontal Inline Flow (.inline / .stack--inline)
```html
<div class="inline">
  <button type="button" class="button">Option 1</button>
  <button type="button" class="button">Option 2</button>
  <button type="button" class="button">Option 3</button>
</div>
```

#### C. Cluster Primitive (.cluster)
```html
<div class="cluster">
  <span class="chip"><span class="chip__text">Design Tokens</span></span>
  <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
  <span class="chip chip--subtle"><span class="chip__text">v2.0</span></span>
</div>
```

#### D. Modifiers (--tight, --nowrap)
```html
<!-- Zero gap stack -->
<div class="stack stack--tight">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Non-wrapping inline row -->
<div class="inline inline--nowrap">
  <span>Tag 1</span>
  <span>Tag 2</span>
</div>
```

### 23. Tooltip Primitive (Native Popover & CSS Anchor Positioning)

#### A. Interactive Control with Native Interest Invoker / Anchor Tooltip
```html
<!-- Trigger Button with native interestfor, popovertarget fallback, and anchor-name -->
<button 
  type="button" 
  class="button button--icon button--strong button--accent"
  interestfor="tip-save"
  popovertarget="tip-save"
  style="anchor-name: --anchor-save;"
>
  <span class="visually-hidden">Duplicate document</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
</button>

<!-- Native Inverted Popover Tooltip -->
<div 
  id="tip-save" 
  popover="hint" 
  class="tooltip"
  style="position-anchor: --anchor-save;"
>
  Duplicate document (⌘D)
</div>
```

#### B. Directional Positioning Modifiers
```html
<!-- Top (Default) -->
<div id="tip-top" popover="hint" class="tooltip" style="position-anchor: --anchor-top;">
  Appears above
</div>

<!-- Bottom -->
<div id="tip-bottom" popover="hint" class="tooltip tooltip--bottom" style="position-anchor: --anchor-bottom;">
  Appears below
</div>

<!-- Left / Start -->
<div id="tip-left" popover="hint" class="tooltip tooltip--left" style="position-anchor: --anchor-left;">
  Appears to start
</div>

<!-- Right / End -->
<div id="tip-right" popover="hint" class="tooltip tooltip--right" style="position-anchor: --anchor-right;">
  Appears to end
</div>
```

### 24. Tabs (Tab Atom, Tab List Molecule & Tabbed Content Organism)
Three tiers that work as one. The audit is in `docs/audit/tab.md`.
1. **`.tab` (atom):** one tab: a `<button role="tab">` in a tablist, or an `<a>` in navigation. Its only modifier is `.tab--icon`.
2. **`.tab-list` (molecule):** owns every axis of its tabs and draws one selection indicator that slides to the selected tab (anchor positioning, scoped to the list). It works on its own as site navigation, a sub-nav or a floating dock.
3. **`.tabbed-content` (organism):** lays out a tab list and its `.tab-panel`s.

| Axis | List modifiers | Flag |
| :--- | :--- | :--- |
| Style | (underline), `--segmented` | `--tab-list-style` |
| Prominence | (default), `--subtle` (segmented only), `--plain` | `--tab-list-prominence` |
| Size | (default), `--sm` | `--tab-list-size`; a compact container steps to `--sm` |
| Corners | (default), `--round` | `--tab-list-corners` |

Layout modifiers: `--vertical`, `--end` (vertical, on the inline end), `--scrollable` (one row that scrolls; lists wrap by default), `--fill`, `--floating`, `--docked` (fixed to the bottom of the viewport), `--flush`, `--tight`. Organism: `.tabbed-content--vertical` and `--end` put the list beside the panels and make it vertical.

- **Selected state is ARIA only:** `aria-selected="true"` in a tablist, `aria-current` (any value but `"false"`) in navigation. No class.
- **Every variant marks the selected tab at 3:1 or more** with a line (underline) or a fill (segmented), plus bold. Plain lists have no rule or border, so the selected tab also takes the accent colour.
- **Underline is for navigation and sections; segmented switches a view.**
- **Hover changes the surface, never the text colour.**
- **Size:** tabs are 48px in every orientation. `--sm` is 32px with a 48px hit area, unless the product opts into fine-pointer targets.
- **Flush:** in a flush card body or flush sidebar, `--flush` runs tabs edge to edge and lines their labels up with the content through `--tab-list-inset`, which those containers set.
- **Keyboard:** for `role="tablist"`, the product supplies the WAI-ARIA tabs pattern: roving `tabindex` (only the selected tab is in the tab order), arrow keys between tabs (up and down when vertical), Home and End. Each panel has `tabindex="0"`. Navigation lists of links need none of this.
- **Icon-only tabs:** `.tab--icon`, with the label kept in `.tab__text`. `.hide-labels` on the list, or `--ui-labels: hidden` on a container, collapses labels to icons.
- **Counts:** hide a badge from assistive technology and spell the count out in visually hidden text.

#### A. Navigation
```html
<nav class="tab-list" aria-label="Repository sections">
  <a href="/repo/code" class="tab" aria-current="page"><span class="tab__text">Code</span></a>
  <a href="/repo/issues" class="tab">
    <span class="tab__text">Issues</span>
    <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span>
    <span class="visually-hidden">, 14 open</span>
  </a>
  <a href="/repo/pulls" class="tab"><span class="tab__text">Pull requests</span></a>
</nav>

<!-- As a list: <ul> and <li> take display: contents -->
<nav class="tab-list tab-list--plain" aria-label="Site">
  <ul>
    <li><a href="/docs" class="tab" aria-current="page"><span class="tab__text">Docs</span></a></li>
    <li><a href="/components" class="tab"><span class="tab__text">Components</span></a></li>
  </ul>
</nav>
```

#### B. Tabbed Content
```html
<div class="tabbed-content">
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button type="button" role="tab" id="tab-1" class="tab" aria-selected="true" aria-controls="panel-1">
      <span class="tab__text">Overview</span>
    </button>
    <button type="button" role="tab" id="tab-2" class="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">
      <span class="tab__text">Security</span>
    </button>
  </div>
  <div id="panel-1" role="tabpanel" class="tab-panel" aria-labelledby="tab-1" tabindex="0">…</div>
  <div id="panel-2" role="tabpanel" class="tab-panel" aria-labelledby="tab-2" tabindex="0" hidden>…</div>
</div>

<!-- Beside the panels: the list becomes vertical -->
<div class="tabbed-content tabbed-content--vertical">…</div>
```

#### C. Segmented
```html
<div class="tab-list tab-list--segmented tab-list--subtle tab-list--round" role="tablist" aria-label="Billing period">
  <button type="button" role="tab" class="tab" aria-selected="true">
    <span class="tab__text">Monthly</span>
  </button>
  <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1">
    <span class="tab__text">Annual</span>
    <span class="status status--accent status--sm"><span class="status__text">Save 20%</span></span>
  </button>
</div>

<!-- Icon-only -->
<div class="tab-list tab-list--segmented tab-list--round" role="tablist" aria-label="Editor view">
  <button type="button" role="tab" class="tab tab--icon" aria-selected="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
    <span class="tab__text">Code</span>
  </button>
  <button type="button" role="tab" class="tab tab--icon" aria-selected="false" tabindex="-1">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
    <span class="tab__text">Design</span>
  </button>
</div>
```

#### D. Container Flags
```html
<!-- Every tab list inside follows; a modifier on a list beats the flag -->
<aside class="toolbar" style="--tab-list-style: segmented; --tab-list-size: sm;">…</aside>
```

#### E. Layout
```html
<!-- One row that scrolls, edges fading while there is more -->
<nav class="tab-list tab-list--scrollable" aria-label="Filters">…</nav>

<!-- Vertical, flush in a flush sidebar -->
<aside class="sidebar sidebar--flush" aria-label="Settings">
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--vertical tab-list--flush" aria-label="Settings sections">…</nav>
  </div>
</aside>

<!-- Floating bar docked to the bottom of the viewport -->
<nav class="tab-list tab-list--segmented tab-list--round tab-list--floating tab-list--docked md:hide" aria-label="App">
  <a href="/" class="tab tab--icon" aria-current="page">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg>
    <span class="tab__text">Home</span>
  </a>
  <a href="/search" class="tab tab--icon">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
    <span class="tab__text">Search</span>
  </a>
</nav>
```

### 25. Progress & Meter Primitives
`<progress>` shows how far a task has got; `<meter>` shows a measurement within a known range. Both live in `atoms/progress.css` and are styled by class only (bare elements keep browser rendering). The audit is in `docs/audit/progress-meter.md`.

| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.progress` | Size (8px, `--sm` 4px, `--lg` 16px); intent (accent default, `--info`, `--success`, `--warning`, `--danger`); corners (`--round`) | `--progress-size`, `--progress-intent`, `--progress-corners` |
| `.meter` | Size (as progress); corners (`--round`) | `--meter-size`, `--meter-corners` |

- **Name every bar and state its value as text beside it.** The bar backs up the text, so colour never carries the meaning alone (WCAG 1.4.1) and the empty track needn't reach 3:1.
- **Meter colour follows the value.** With `low`, `high` and `optimum` set, the browser picks the region: optimum is success, the next warning, the worst danger. With none set, the meter fills in accent. Meter has no intent classes.
- **Indeterminate progress** has no `value`. Put `aria-busy="true"` on the region being loaded, never on the progress. Under reduced motion the sweep becomes a static hatch.
- A compact container (`--ui-sizing: compact`) steps both to `--sm`.

#### A. Progress
```html
<!-- Determinate, labelled, with a readout -->
<div class="field">
  <div class="field__header">
    <label for="upload-progress" class="field__label">Uploading asset</label>
    <span class="field__result">68%</span>
  </div>
  <progress id="upload-progress" class="progress" value="68" max="100">68%</progress>
</div>

<!-- Size, intent and corners -->
<progress class="progress progress--sm" value="45" max="100" aria-label="Lesson progress">45%</progress>
<progress class="progress progress--lg progress--round" value="85" max="100" aria-label="Course progress">85%</progress>
<progress class="progress progress--success" value="100" max="100" aria-label="Backup complete">100%</progress>
<progress class="progress progress--danger" value="30" max="100" aria-label="Upload failed at 30%">30%</progress>

<!-- Indeterminate: aria-busy on the region being loaded -->
<section aria-busy="true" aria-labelledby="sync-label">
  <div class="field">
    <label id="sync-label" for="sync-progress" class="field__label">Syncing data</label>
    <progress id="sync-progress" class="progress">Syncing</progress>
  </div>
</section>
```

#### B. Meter
```html
<!-- With thresholds: colour follows the region the value falls in -->
<div class="field">
  <div class="field__header">
    <label for="disk-meter" class="field__label">Disk use</label>
    <span class="field__result">72 GB of 100 GB</span>
  </div>
  <meter id="disk-meter" class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72 GB</meter>
</div>

<!-- Without thresholds: a plain measurement, filled in accent -->
<meter class="meter meter--sm" value="12" min="0" max="40" aria-label="Seats booked: 12 of 40">12 of 40</meter>

<!-- Password strength -->
<div class="field">
  <label for="pwd-field" class="field__label">Password</label>
  <input id="pwd-field" type="password" class="input" aria-describedby="pwd-strength" />
  <p id="pwd-strength" class="field__hint">Strength: strong</p>
  <meter class="meter meter--sm" value="4" min="0" max="4" low="2" high="3" optimum="4" aria-labelledby="pwd-strength">4 of 4</meter>
</div>
```

### 26. Skeleton Primitive (Content Loading Placeholders)
A placeholder that holds the space of content still loading, so nothing moves when it arrives. The audit is in `docs/audit/skeleton.md`.

| Use | Markup |
| :--- | :--- |
| Shape | `.skeleton` with `--text`, `--heading`, `--avatar`, `--button`, `--input`, `--badge` or `--media`. A bare `.skeleton` is a block sized by `--skeleton-width` and `--skeleton-height`. |
| Companion | `.skeleton` on `.avatar`, `.button`, `.input`, `.textarea`, `.select`, `.badge`, `.chip`, `.status` or `.kbd`. The atom keeps its own box; the skeleton replaces the paint. |
| Width | `--w-50`, `--w-75`, `--w-90`; any other with `--skeleton-width` (per element, not inherited) |
| Motion | Shimmer (default), `--pulse`; `--skeleton-motion: shimmer \| pulse \| none` on a container |

- **Text lines size from the text atom they sit in.** `--text` and `--heading` are one line box (`1lh`) high with the bar at cap height. Put them inside the atom the loaded text will use; `--heading` differs only in width (60%). Hold a heading's place with the atom class on a `div`, not on an `h1`–`h6`: a heading with only hidden content is an empty heading.
- **The fill mixes the text colour** (`--skeleton-color`), so it shows the same on any surface. Increased contrast uses `--skeleton-color-strong`; reduced motion stops the animation; forced colours fill in `GrayText`.
- **Announce loading.** Every shape takes `aria-hidden="true"`. The region takes `aria-busy="true"` and a `role="status"` message ("Loading activity…"). When loading ends, set `aria-busy="false"` and update or remove the message.
- A companion control is `disabled` (or not focusable) as well as `aria-hidden`.
- There is no `.card.skeleton`: a loading card is a card with `aria-busy` and shapes inside.

```html
<!-- Text lines inside text atoms -->
<div class="small-heading"><span class="skeleton skeleton--heading" aria-hidden="true"></span></div>
<p class="text">
  <span class="skeleton skeleton--text" aria-hidden="true"></span>
  <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
</p>

<!-- Shapes -->
<span class="skeleton skeleton--avatar" aria-hidden="true"></span>
<span class="skeleton skeleton--button" aria-hidden="true"></span>
<span class="skeleton skeleton--badge" aria-hidden="true"></span>
<span class="skeleton skeleton--media" aria-hidden="true"></span>
<span class="skeleton" aria-hidden="true" style="--skeleton-width: 12rem; --skeleton-height: 2rem;"></span>

<!-- Companions -->
<div class="avatar skeleton" aria-hidden="true"><span>AB</span></div>
<button type="button" class="button skeleton" aria-hidden="true" disabled><span>Submit</span></button>
<span class="status skeleton" aria-hidden="true"><span class="status__text">Active</span></span>

<!-- Loading card -->
<article class="card card--bordered" aria-busy="true" aria-labelledby="activity-title">
  <div class="card__content">
    <header class="card__header">
      <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
      <hgroup class="card__hgroup">
        <h3 id="activity-title" class="card__title small-heading">Team activity</h3>
        <p class="card__subtitle small-text"><span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 8rem;"></span></p>
      </hgroup>
    </header>
    <div class="card__body">
      <p class="visually-hidden" role="status">Loading team activity…</p>
      <span class="skeleton skeleton--media" aria-hidden="true"></span>
      <p class="text">
        <span class="skeleton skeleton--text" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
      </p>
    </div>
    <footer class="card__footer">
      <button type="button" class="button button--subtle skeleton" aria-hidden="true" disabled><span>Open</span></button>
    </footer>
  </div>
</article>
```

### 27. Empty State Primitive (Zero-Data Views & Onboarding)
```html
<!-- 1. Standalone Empty State (Search / Filter Miss) -->
<section class="empty-state" aria-labelledby="empty-search-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="empty-search-title" class="empty-state__title heading">No items found</h3>
    <p class="empty-state__description text-muted">
      Try adjusting your search criteria or clear your current filters.
    </p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button button--strong button--accent button--sm">
      <span>Clear Filters</span>
    </button>
  </div>
</section>

<!-- 2. Onboarding / Initial Setup with Primary & Secondary Actions -->
<section class="empty-state empty-state--bordered" aria-labelledby="empty-setup-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="empty-setup-title" class="empty-state__title heading">Create your first project</h3>
    <p class="empty-state__description text-muted">
      Organize design tokens, layout primitives, and composite recipes in a unified space.
    </p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button button--strong button--accent">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
      <span>New Project</span>
    </button>
    <button type="button" class="button">
      <span>Import Repository</span>
    </button>
  </div>
</section>

<!-- 3. Nested Inside Card Primitive (Card Companion) -->
<article class="card card--bordered bg-card" aria-labelledby="card-empty-title">
  <div class="card__content">
    <header class="card__header split align-items-center">
      <h4 class="card__title font-size-0 font-bold">Activity</h4>
      <span class="status status--sm"><span class="status__text">Zero</span></span>
    </header>
    <div class="card__body">
      <div class="empty-state empty-state--flush empty-state--compact" aria-labelledby="card-empty-title">
        <div class="empty-state__visual" aria-hidden="true">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </div>
        <div class="empty-state__content">
          <h5 id="card-empty-title" class="empty-state__title small-heading">All caught up!</h5>
          <p class="empty-state__description text-muted small-text">
            No pending tasks or unread notifications in this view.
          </p>
        </div>
      </div>
    </div>
  </div>
</article>

<!-- 4. Table Cell Empty State -->
<table class="table">
  <tbody>
    <tr>
      <td colspan="100%">
        <div class="empty-state empty-state--compact" aria-labelledby="tbl-empty-title">
          <div class="empty-state__visual" aria-hidden="true">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
          </div>
          <div class="empty-state__content">
            <h4 id="tbl-empty-title" class="empty-state__title small-heading">No matching records</h4>
            <p class="empty-state__description text-muted">Try clearing search filters.</p>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<!-- 5. Semantic Status Variants (Success, Warning, Error / Danger) -->
<section class="empty-state empty-state--success" aria-labelledby="success-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="success-empty-title" class="empty-state__title">Sync complete</h3>
    <p class="empty-state__description">All 717 tokens are synchronized.</p>
  </div>
</section>

<section class="empty-state empty-state--warning" aria-labelledby="warn-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="warn-empty-title" class="empty-state__title">Subscription expiring</h3>
    <p class="empty-state__description">Renew plan to preserve permissions.</p>
  </div>
</section>

<section class="empty-state empty-state--error" aria-labelledby="err-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="err-empty-title" class="empty-state__title">Connection failed</h3>
    <p class="empty-state__description">Unable to load remote repository.</p>
  </div>
</section>
```

### 28. Combobox Primitive (Search & Select)
```html
<!-- 1. Single-Select Searchable Combobox with Anchored Listbox -->
<div class="field">
  <label for="framework-combo" class="field__label">Framework</label>
  <div class="combobox">
    <div class="combobox__control" style="anchor-name: --combo-framework;">
      <svg class="icon combobox__icon-start" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
      <input 
        id="framework-combo"
        type="text" 
        class="combobox__input"
        role="combobox"
        aria-expanded="false"
        aria-autocomplete="list"
        aria-controls="framework-listbox"
        placeholder="Search or select..."
      />
      <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
      </button>
    </div>

    <ul 
      id="framework-listbox" 
      role="listbox" 
      class="combobox__listbox combobox__listbox--anchored"
      style="position-anchor: --combo-framework;"
      aria-label="Framework options"
    >
      <li role="option" class="combobox__option" aria-selected="true">
        <span>Web Components</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
      <li role="option" class="combobox__option" aria-selected="false">
        <span>Svelte</span>
      </li>
      <li role="option" class="combobox__option" aria-selected="false">
        <span>React</span>
      </li>
    </ul>
  </div>
</div>

<!-- 2. Multi-Select Combobox with Removable Tags (.chip) -->
<div class="field">
  <label for="skills-combo" class="field__label">Technologies</label>
  <div class="combobox">
    <div class="combobox__control">
      <div class="combobox__tags">
        <span class="chip chip--subtle">
          <span class="chip__text">TypeScript</span>
          <button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button>
        </span>
        <span class="chip chip--subtle">
          <span class="chip__text">Design Tokens</span>
          <button type="button" class="chip__remove" aria-label="Remove Design Tokens">×</button>
        </span>
      </div>
      <input 
        id="skills-combo"
        type="text" 
        class="combobox__input"
        role="combobox"
        aria-expanded="false"
        placeholder="Add tag..."
      />
      <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
      </button>
    </div>
  </div>
</div>

<!-- 3. Compact Combobox (.combobox--sm) -->
<div class="combobox combobox--sm">
  <div class="combobox__control">
    <input type="text" class="combobox__input" placeholder="Quick filter..." />
    <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
    </button>
  </div>
</div>
```

### 29. Deck (Out of v1 Core — Moving to Recipes)
`deck` is a domain-specific stress test of the token system, not a library component. It is moving from `packages/css/src/organisms/` to `packages/storybook/stories/recipes/`. Do not use it in new library work or copy its patterns into core components. Markup is kept here for reference until the move.
```html
<!-- 1. Standard On-Air Broadcast Deck -->
<section class="deck deck--on-air deck--bordered" aria-label="Deck A • On Air">
  <div class="deck__content">
    
    <!-- Deck Header -->
    <header class="deck__header">
      <div class="deck__status">
        <span class="status status--success status--plain" aria-hidden="true"></span>
        <h2 class="deck__channel">Deck A • On Air</h2>
      </div>
      <div class="deck__header-actions">
        <button type="button" class="button button--subtle button--icon button--sm" aria-label="Deck options">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg>
        </button>
      </div>
    </header>

    <!-- Deck Body -->
    <div class="deck__body">
      
      <!-- Track Presentation & Artwork -->
      <div class="deck__track">
        <div class="deck__art-frame" aria-hidden="true">
          <div class="deck__art">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
          </div>
          <span class="status status--accent status--sm status--round deck__badge"><span class="status__text">LIVE</span></span>
        </div>
        <div class="deck__identity">
          <div class="deck__tags">
            <span class="chip chip--subtle chip--sm"><span class="chip__text">Heavy Rotation</span></span>
          </div>
          <h3 class="deck__title">Celestial Horizon</h3>
          <p class="deck__artist">Aura & Tycho — Continuum LP</p>
        </div>
      </div>

      <!-- Scrubber & Timeline -->
      <div class="deck__timeline" role="region" aria-label="Track progress">
        <div class="deck__time">
          <span class="deck__elapsed">02:14</span>
          <span class="deck__remaining">-01:38</span>
        </div>
        <input 
          type="range" 
          class="range range--sm deck__scrubber" 
          min="0" 
          max="232" 
          value="134" 
          style="--value: 58%;"
          aria-label="Track seek scrubber"
        />
      </div>

      <!-- Playback Transport Controls -->
      <div class="deck__transport" role="toolbar" aria-label="Playback transport">
        <button type="button" class="button button--subtle button--icon deck__cue" aria-label="Cue to start">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
        </button>
        <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause playback">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg>
        </button>
        <button type="button" class="button button--subtle button--icon deck__skip" aria-label="Skip to next track">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg>
        </button>
      </div>

      <!-- Volume Output & Mute -->
      <div class="deck__volume">
        <div class="deck__volume-header">
          <label class="deck__volume-label" for="deck-vol">Output Level</label>
          <output class="deck__volume-output" for="deck-vol">85%</output>
        </div>
        <div class="deck__volume-controls">
          <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Toggle mute">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
          </button>
          <input type="range" class="range range--sm deck__fader" id="deck-vol" min="0" max="100" value="85" style="--value: 85%;" aria-label="Volume level" />
        </div>
      </div>

    </div>

    <!-- Stereo VU Peak Meters -->
    <div class="deck__meters" role="region" aria-label="Stereo Master Peak Meters">
      <div class="deck__meters-header">
        <span class="deck__meters-title">Stereo Peak (dBFs)</span>
        <span class="status status--success status--sm"><span class="status__text">-1.8 dB Headroom</span></span>
      </div>
      <div class="deck__channel-meter">
        <span class="deck__meter-ch">L</span>
        <meter class="meter meter--sm deck__meter-bar" value="82" min="0" max="100" low="65" high="90" optimum="50">82%</meter>
        <span class="deck__meter-val">-2.1 dB</span>
      </div>
      <div class="deck__channel-meter">
        <span class="deck__meter-ch">R</span>
        <meter class="meter meter--sm deck__meter-bar" value="79" min="0" max="100" low="65" high="90" optimum="50">79%</meter>
        <span class="deck__meter-val">-2.8 dB</span>
      </div>
    </div>

  </div>
</section>

<!-- 2. Horizontal Player Dock Bar (.deck--horizontal) -->
<section class="deck deck--horizontal deck--bordered deck--on-air" aria-label="Player Dock">
  <div class="deck__content">
    <div class="deck__body">
      <div class="deck__track">
        <div class="deck__art-frame" aria-hidden="true">
          <div class="deck__art"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg></div>
        </div>
        <div class="deck__identity">
          <h3 class="deck__title">Celestial Horizon</h3>
          <p class="deck__artist">Aura & Tycho</p>
        </div>
      </div>
      <div class="deck__timeline-transport-group">
        <div class="deck__transport" role="toolbar" aria-label="Dock controls">
          <button type="button" class="button button--subtle button--icon button--sm deck__cue" aria-label="Cue"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg></button>
          <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg></button>
          <button type="button" class="button button--subtle button--icon button--sm deck__skip" aria-label="Skip"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg></button>
        </div>
        <div class="deck__timeline">
          <input type="range" class="range range--sm deck__scrubber" min="0" max="232" value="134" style="--value: 58%;" aria-label="Seek" />
        </div>
      </div>
      <div class="deck__volume-meters-group">
        <div class="deck__volume-controls">
          <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Mute"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg></button>
          <input type="range" class="range range--sm deck__fader" value="85" style="--value: 85%;" aria-label="Volume" />
        </div>
      </div>
    </div>
  </div>
</section>
```

### 30. Telemetry & Stat Pill Primitives (Metrics, Badges & Strips)
```html
<!-- 1. Standard Telemetry Metric Pill -->
<div class="telemetry">
  <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
  <div class="telemetry__content">
    <span class="telemetry__label">Listeners</span>
    <strong class="telemetry__value">14,820</strong>
  </div>
</div>

<!-- 2. Metric with Unit Suffix and Semantic Trend -->
<div class="telemetry">
  <div class="telemetry__content">
    <span class="telemetry__label">Buffer Latency</span>
    <strong class="telemetry__value">42<span class="telemetry__unit">ms</span></strong>
  </div>
  <span class="telemetry__trend" data-trend="positive" aria-label="Decreased by 4ms">
    -4ms
  </span>
</div>

<!-- 3. Semantic Definition List Telemetry Strip (.telemetry-strip--ruled) -->
<dl class="telemetry-group telemetry-strip--ruled" aria-label="Station live telemetry">
  <div class="telemetry">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
      Listeners
    </dt>
    <dd class="telemetry__value">14,820</dd>
  </div>
  <div class="telemetry">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
      Peak Today
    </dt>
    <dd class="telemetry__value">28,450</dd>
  </div>
  <div class="telemetry" data-status="online">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Circle"/></svg>
      Uptime
    </dt>
    <dd class="telemetry__value">99.98%</dd>
  </div>
</dl>

<!-- 4. Dashboard KPI Stat Card (.telemetry--card .telemetry--stacked) -->
<div class="telemetry telemetry--card telemetry--stacked">
  <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
  <div class="telemetry__content">
    <span class="telemetry__label">Total Listen Hours</span>
    <strong class="telemetry__value" style="font-size: var(--typography-font-size-2);">128,450<span class="telemetry__unit">hrs</span></strong>
    <span class="telemetry__trend telemetry__trend--positive">
      +18.2% vs previous period
    </span>
  </div>
</div>

<!-- 5. Compact Telemetry Pill (.telemetry--compact) -->
<div class="telemetry telemetry--compact">
  <span class="telemetry__label">FPS</span>
  <strong class="telemetry__value">60</strong>
</div>
```

### 30. Stepper Primitive (Multi-Step Progression & Wizard Navigation)

#### A. Standard Linear Stepper (Progress Navigation)
```html
<nav class="stepper" aria-label="Registration progress">
  <ol class="stepper__list">
    <!-- Completed Step -->
    <li class="stepper__item is-complete">
      <div class="stepper__step">
        <span class="stepper__indicator" aria-hidden="true">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </span>
        <div class="stepper__content">
          <span class="stepper__title">Personal Details</span>
          <span class="stepper__description text-muted">Completed</span>
        </div>
      </div>
    </li>

    <!-- Active Step (MANDATORY: aria-current="step") -->
    <li class="stepper__item is-active" aria-current="step">
      <div class="stepper__step">
        <span class="stepper__indicator">2</span>
        <div class="stepper__content">
          <span class="stepper__title">Growing Agreement</span>
          <span class="stepper__description text-muted">In progress</span>
        </div>
      </div>
    </li>

    <!-- Upcoming Step -->
    <li class="stepper__item">
      <div class="stepper__step">
        <span class="stepper__indicator">3</span>
        <div class="stepper__content">
          <span class="stepper__title">Fee Schedule</span>
          <span class="stepper__description text-muted">Pending</span>
        </div>
      </div>
    </li>
  </ol>
</nav>
```

#### B. Interactive Jump Stepper (Clickable Step Buttons)
```html
<nav class="stepper" aria-label="Checkout workflow">
  <ol class="stepper__list">
    <li class="stepper__item is-complete">
      <button type="button" class="stepper__step">
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
        <span class="stepper__title">Shipping</span>
      </button>
    </li>
    <li class="stepper__item is-active" aria-current="step">
      <button type="button" class="stepper__step is-active" aria-current="step">
        <span class="stepper__indicator">2</span>
        <span class="stepper__title">Payment</span>
      </button>
    </li>
    <li class="stepper__item">
      <button type="button" class="stepper__step" disabled>
        <span class="stepper__indicator">3</span>
        <span class="stepper__title">Review</span>
      </button>
    </li>
  </ol>
</nav>
```

#### C. Vertical Stepper (.stepper--vertical for Sidebars & Drawers)
```html
<nav class="stepper stepper--vertical" aria-label="Setup guide">
  <ol class="stepper__list">
    <li class="stepper__item is-complete">
      <div class="stepper__step">
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
        <div class="stepper__content">
          <span class="stepper__title">Profile Setup</span>
          <span class="stepper__description text-muted">Verified</span>
        </div>
      </div>
    </li>
    <li class="stepper__item is-active" aria-current="step">
      <div class="stepper__step">
        <span class="stepper__indicator">2</span>
        <div class="stepper__content">
          <span class="stepper__title">Security Keys</span>
          <span class="stepper__description text-muted">Enrolling 2FA</span>
        </div>
      </div>
    </li>
    <li class="stepper__item">
      <div class="stepper__step">
        <span class="stepper__indicator">3</span>
        <div class="stepper__content">
          <span class="stepper__title">Team Invites</span>
          <span class="stepper__description text-muted">Upcoming</span>
        </div>
      </div>
    </li>
  </ol>
</nav>
```

#### D. Compact Stepper (.stepper--compact for Modals & Dialogs)
```html
<nav class="stepper stepper--compact" aria-label="Compact wizard">
  <ol class="stepper__list">
    <li class="stepper__item is-complete">
      <div class="stepper__step">
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
        <span class="stepper__title">Details</span>
      </div>
    </li>
    <li class="stepper__item is-active" aria-current="step">
      <div class="stepper__step">
        <span class="stepper__indicator">2</span>
        <span class="stepper__title">Agreement</span>
      </div>
    </li>
    <li class="stepper__item">
      <div class="stepper__step">
        <span class="stepper__indicator">3</span>
        <span class="stepper__title">Payment</span>
      </div>
    </li>
  </ol>
</nav>
```

### 31. Responsive Visibility & Adaptive Disclosure Helpers
Design For Humans provides low-specificity (`:where()`) responsive visibility and adaptive disclosure classes using concise Tailwind-style prefixes for both viewport media queries and container queries.

#### A. Viewport Media Query Helpers
Used at the page shell / macro layout level (headers, main nav, mobile drawer triggers):
- **Hide on Mobile / Below Breakpoint:** `max-sm:hide` (or `max-md:hide`, `max-lg:hide`, etc.)
- **Hide on Desktop / Above Breakpoint:** `sm:hide` (or `md:hide`, `lg:hide`, etc.)
- **Hide Labels on Mobile:** `max-sm:hide-labels` (or `max-md:hide-labels`)
- **Hide Decorations on Mobile:** `max-sm:hide-decor` (or `max-md:hide-decor`)
- **Auto Flex Basis on Mobile:** `max-sm:flex-auto` (or `max-md:flex-auto`)
- **Accessible Screen Reader Only on Mobile:** `max-sm:sr-only` or `max-sm:visually-hidden`

#### B. Container Query Helpers (Container First!)
Preferred for modular components, sidebars, cards, tables, and dialogs:
- **Hide in Narrow Containers:** `@max-sm:hide` (or `@max-md:hide`, `@max-lg:hide`, etc.)
- **Hide in Wide Containers:** `@sm:hide` (or `@md:hide`, `@lg:hide`, etc.)
- **Hide Labels in Narrow Containers:** `@max-sm:hide-labels` (or `@max-md:hide-labels`)
- **Hide Decorations in Narrow Containers:** `@max-sm:hide-decor` (or `@max-md:hide-decor`)
- **Auto Flex Basis in Narrow Containers:** `@max-sm:flex-auto` (or `@max-md:flex-auto`)
- **Accessible Screen Reader Only in Narrow Containers:** `@max-sm:sr-only` or `@max-sm:visually-hidden`

#### C. Breakpoint Scale Reference
- `2xs`: `20em` (320px, Mobile Min)
- `xs`: `30em` (480px, Phablet)
- `sm`: `40em` (640px, Small Tablet)
- `md`: `48em` (768px, Tablet / Shell)
- `lg`: `60em` (960px, Small Desktop)
- `xl`: `80em` (1280px, Standard Desktop)
- `2xl`: `96em` (1536px, Large Screen)

#### D. Legacy Synonyms (Pending Removal)
The stylesheet still contains synonyms for these helpers. They are removed before v1 (PRINCIPLES §7). Always write the **first** name in each row:
- `sm:hide` ⇄ `sm:hidden`, `min-sm:hide`, `min-sm:hidden`, `hide--above-sm`
- `max-sm:hide` ⇄ `max-sm:hidden`, `sm-max:hide`, `sm-max:hidden`, `hide--below-sm`
- `@sm:hide` ⇄ `@sm:hidden`, `@min-sm:hide`, `@min-sm:hidden`, `hide--in-container-above-sm`
- `@max-sm:hide` ⇄ `@max-sm:hidden`, `@sm-max:hide`, `@sm-max:hidden`, `hide--in-container-below-sm`

---

### 32. Component Recipes & Composed Patterns
When building complex UI features (menus, settings panels, user cards, notifications, search palettes, and catalog filters), AI agents MUST compose primitive components instead of introducing custom inline styles or bespoke wrappers.

#### A. Anchored Context Menu Recipe
Composes `.popover.popover--anchored` + `.menu.menu--translucent` + `.menu__item` + `.divider` (`<li role="separator">`) + `<kbd class="kbd">`:
```html
<button 
  type="button" 
  class="button" 
  popovertarget="menu-popover" 
  style="anchor-name: --menu-anchor;"
  aria-haspopup="menu"
>
  <span>Options</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div id="menu-popover" popover class="popover popover--anchored" style="position-anchor: --menu-anchor; min-inline-size: 16rem;">
  <menu class="menu menu--translucent" aria-label="Document options">
    <header class="menu__heading">Document Options</header>
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
        <span>Duplicate</span>
        <kbd class="kbd">⌘D</kbd>
      </button>
    </li>
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
        <span>Export JSON</span>
        <kbd class="kbd">⇧⌘E</kbd>
      </button>
    </li>
    <li role="separator" class="divider"></li>
    <li role="none">
      <button type="button" class="menu__item menu__item--destructive" role="menuitem">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
        <span>Delete Item</span>
        <kbd class="kbd">⌫</kbd>
      </button>
    </li>
  </menu>
</div>
```

#### B. User Profile Card & Status Flyout Recipe
Composes `.avatar` with `data-status`, `.chip`, `.status`, and `.button-group--space-between`:
```html
<div class="card card--compact card--bordered card--translucent">
  <article class="card__content">
    <header class="card__header">
      <div class="avatar" data-status="online" aria-label="Jordan Lee (online)">
        <span aria-hidden="true">JL</span>
      </div>
      <hgroup class="card__hgroup">
        <h3 class="card__title">Jordan Lee</h3>
        <p class="card__subtitle">jordan.lee@dfh.design</p>
      </hgroup>
    </header>
    <div class="card__body">
      <div class="stack">
        <div class="cluster">
          <span class="chip chip--subtle"><span class="chip__text">Design Lead</span></span>
          <span class="status status--success status--plain"><span class="status__text">Online</span></span>
        </div>
        <p class="small-text">
          Lead accessibility auditor for WCAG 2.2 Level AA / AAA design systems.
        </p>
      </div>
    </div>
    <footer class="card__footer">
      <div class="button-group button-group--space-between">
        <button type="button" class="button button--strong button--accent button--sm"><span>View Profile</span></button>
        <button type="button" class="button button--subtle button--sm"><span>Sign Out</span></button>
      </div>
    </footer>
  </article>
</div>
```

#### C. Settings / Preferences Flyout Recipe
Composes `.switch.switch--sm`, `.range.range--sm`, `.field`, and `.button-group--fill-items`:
```html
<div class="card card--compact card--bordered card--translucent card--ruled" style="min-inline-size: 20rem;">
  <article class="card__content">
    <header class="card__header">
      <h3 class="card__title">Preferences</h3>
    </header>
    <div class="card__body">
      <div class="stack">
        <label class="switch switch--sm" style="inline-size: 100%;">
          <span class="switch__label small-text">High Contrast Mode</span>
          <input type="checkbox" role="switch" class="visually-hidden" />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
        <div class="field">
          <div class="field__header">
            <label for="font-scale-slider" class="field__label">UI Scale</label>
            <output for="font-scale-slider" class="field__output">100%</output>
          </div>
          <input id="font-scale-slider" type="range" class="range range--sm" value="50" min="0" max="100" style="--value: 50%;" />
        </div>
      </div>
    </div>
    <footer class="card__footer card__footer--flush">
      <div class="button-group button-group--fill-items">
        <button type="button" class="button button--subtle"><span>Done</span></button>
      </div>
    </footer>
  </article>
</div>
```

#### D. Application Header & Global Navigation Landmark Recipe
Composes `.skip-link` + `.header.header--sticky.header--translucent` + `.wrapper.flex.justify-content-between` + `.button--subtle` (`aria-current="page"`) + `.badge--top-end` + `button.button--avatar` (`[data-status]`) + `.menu.menu--translucent` inside anchored `.popover` + Command Palette invoker:
```html
<!-- In-Flow Landmark Skip Link -->
<a href="#main" class="skip-link"><span>Skip to main content</span></a>

<!-- Global Header Landmark -->
<header class="header header--sticky header--translucent padding-block-sm">
  <div class="wrapper flex align-items-center justify-content-between flex-wrap gap-sm">
    <!-- Brand -->
    <a href="/" class="link inline gap-sm font-weight-bold font-size-lg underline-none">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
      <span>Design For Humans</span>
    </a>

    <!-- Primary Nav -->
    <nav aria-label="Primary navigation" class="cluster gap-none">
      <ul class="cluster gap-none">
        <li><a href="#dashboard" class="button button--subtle" aria-current="page"><span>Dashboard</span></a></li>
        <li><a href="#components" class="button button--subtle"><span>Components</span></a></li>
        <li><a href="#audit" class="button button--subtle"><span>Audit</span></a></li>
      </ul>
    </nav>

    <!-- Actions -->
    <div class="cluster align-items-center gap-sm">
      <!-- Search Invoker (Launches Command Palette) -->
      <button type="button" class="button button--subtle" commandfor="cmd-palette" command="show-modal" aria-haspopup="dialog" aria-label="Search (Press Cmd+K)">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
        <span class="button__text button__text--placeholder">Search docs... <kbd class="kbd">⌘K</kbd></span>
      </button>

      <!-- Notifications with Corner Badge -->
      <button type="button" class="button button--icon" popovertarget="header-notifs" style="anchor-name: --header-notif-anchor;" aria-haspopup="dialog" aria-label="Notifications (3 unread)">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
        <span class="badge badge--danger badge--sm badge--top-end"><span class="badge__text">3</span></span>
      </button>

      <!-- User Avatar Trigger & Anchored Menu -->
      <button type="button" class="button avatar button--avatar button--round" popovertarget="header-user-popover" style="anchor-name: --header-user-anchor;" data-status="online" aria-haspopup="menu" aria-label="Account menu (online)">
        <span>AB</span>
      </button>

      <div id="header-user-popover" popover class="popover popover--anchored" style="position-anchor: --header-user-anchor; min-inline-size: 18rem;">
        <menu class="menu menu--translucent" aria-label="User account menu">
          <header class="menu__heading inline gap-sm align-items-center padding-block-xs">
            <div class="avatar avatar--sm" data-status="online"><span>AB</span></div>
            <div class="stack gap-none">
              <span class="font-weight-medium">Alex Bennett</span>
              <span class="small-text text-color-muted">alex.bennett@dfh.design</span>
            </div>
          </header>
          <li role="separator" class="divider"></li>
          <li role="none"><button type="button" class="menu__item" role="menuitem"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg><span>Profile</span><kbd class="kbd">⇧⌘P</kbd></button></li>
          <li role="none"><button type="button" class="menu__item" role="menuitem"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg><span>Preferences</span><kbd class="kbd">⌘,</kbd></button></li>
          <li role="separator" class="divider"></li>
          <li role="none"><button type="button" class="menu__item menu__item--destructive" role="menuitem"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg><span>Sign Out</span></button></li>
        </menu>
      </div>
    </div>
  </div>
</header>
```

#### E. Command Palette & Spotlight Modal Recipe
Composes `.dialog` + `.card.card--flush.card--ruled.card--translucent` + `.card__header.inline.gap-sm.focus-within` + `.input.input--flush.focus-none` + `.button-group.button-group--stacked.button-group--ruled.buttons-subtle` + `.empty-state.empty-state--compact`:
```html
<dialog id="cmd-palette" class="dialog" aria-label="Command palette">
  <div class="card card--flush card--ruled card--translucent wrapper wrapper--lg overflow-hidden">
    <article class="card__content">
      
      <!-- Search Header with Focus Delegation -->
      <header class="card__header inline gap-sm focus-within">
        <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
        <input 
          type="search" 
          class="input input--flush focus-none flex-grow" 
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-controls="cmd-listbox"
          aria-activedescendant="cmd-opt-1"
          placeholder="Search components, tokens, documentation..."
          autofocus
        />
        <button type="button" class="button button--subtle button--icon" commandfor="cmd-palette" command="close" aria-label="Close command palette">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
        </button>
      </header>

      <!-- Results Body: Stacked Ruled Button Group -->
      <div class="card__body card__body--flush card__body--scrollable max-height-sm">
        <div id="cmd-listbox" role="listbox" class="button-group button-group--stacked button-group--ruled buttons-subtle" aria-label="Suggestions">
          <h3 class="button-group__content micro-heading text-color-muted">UI Components</h3>
          
          <button type="button" class="button button--subtle is-active" role="option" id="cmd-opt-1" aria-selected="true">
            <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
            <span class="button__text stack gap-none text-align-start flex-grow">
              <span class="font-weight-medium">Button Primitive</span>
              <span class="small-text text-color-muted">Accessible interactive buttons, states & toggles</span>
            </span>
            <span class="chip chip--sm"><span class="chip__text">Component</span></span>
            <kbd class="kbd">↵</kbd>
          </button>

          <button type="button" class="button button--subtle" role="option" id="cmd-opt-2" aria-selected="false">
            <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
            <span class="button__text stack gap-none text-align-start flex-grow">
              <span class="font-weight-medium">Combobox Primitive</span>
              <span class="small-text text-color-muted">Searchable single and multi-select floating listboxes</span>
            </span>
            <span class="chip chip--sm"><span class="chip__text">Component</span></span>
          </button>
        </div>

        <!-- Zero-Results Search Miss State -->
        <div class="empty-state empty-state--compact empty-state--flush padding-block-lg" hidden aria-labelledby="cmd-empty-title">
          <div class="empty-state__visual" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg></div>
          <div class="empty-state__content">
            <h3 id="cmd-empty-title" class="empty-state__title">No matching commands</h3>
            <p class="empty-state__description">No results found for your query. Try searching for "button" or "tokens".</p>
          </div>
        </div>
      </div>

      <!-- Action Footer with Keyboard Shortcuts -->
      <footer class="card__footer inline-responsive justify-content-between text-color-muted font-size-sm">
        <div class="cluster gap-sm">
          <span><kbd class="kbd">↑↓</kbd> Navigate</span>
          <span><kbd class="kbd">↵</kbd> Select</span>
          <span><kbd class="kbd">ESC</kbd> Close</span>
        </div>
        <span>Design For Humans v2.2</span>
      </footer>

    </article>
  </div>
</dialog>
```

#### F. Faceted Filter Sidebar & Catalog Recipe
Composes `.wrapper.wrapper--2xl` + `.split.split--sm` + `.accordion` (with multi-select `.combobox.combobox--sm` tags, checkboxes, `.range.range--sm`, and `.switch.switch--sm`) + `.chip` with `.chip__remove` + auto-filling `.grid.grid--sm` (with `.card`, `.empty-state`, and `.skeleton` loading states):
```html
<main class="wrapper wrapper--2xl padding-block-md">
  <div class="split split--sm">
    
    <!-- Sidebar Facets -->
    <aside class="stack gap-md">
      <div class="card card--compact card--ruled bg-card">
        <article class="card__content">
          <header class="card__header inline justify-content-between align-items-center">
            <h2 class="card__title font-size-0">Filters</h2>
            <button type="button" class="button button--subtle button--sm"><span>Reset</span></button>
          </header>

          <div class="card__body card__body--flush">
            <div class="accordion-group accordion-group--tight">
              
              <!-- Multi-Select Combobox Tag Facet -->
              <details class="accordion" open>
                <summary>Technologies</summary>
                <div class="padding-block-sm">
                  <div class="combobox combobox--sm">
                    <div class="combobox__control">
                      <div class="combobox__tags">
                        <span class="chip chip--subtle chip--sm"><span class="chip__text">TypeScript</span><button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button></span>
                      </div>
                      <input type="text" class="combobox__input" role="combobox" placeholder="Add tag..." />
                    </div>
                  </div>
                </div>
              </details>

              <!-- Switch Facet -->
              <details class="accordion" open>
                <summary>Standard Strictness</summary>
                <div class="padding-block-sm">
                  <label class="switch switch--sm flex justify-content-between align-items-center">
                    <span class="switch__label">Strict AAA</span>
                    <input type="checkbox" role="switch" class="visually-hidden" checked />
                    <span class="switch__control" aria-hidden="true">
                      <span class="switch__option switch__option--off">Off</span>
                      <span class="switch__option switch__option--on">On</span>
                    </span>
                  </label>
                </div>
              </details>

            </div>
          </div>
        </article>
      </div>
    </aside>

    <!-- Main Content: Active Filter Bar & Card Grid -->
    <div class="stack gap-md">
      <div class="card card--compact bg-card">
        <div class="card__content">
          <div class="cluster gap-xs align-items-center">
            <span class="small-text text-color-muted">Active:</span>
            <span class="chip chip--subtle"><span class="chip__text">TypeScript</span><button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button></span>
          </div>
        </div>
      </div>

      <ul class="grid grid--sm">
        <li>
          <div class="card">
            <article class="card__content">
              <header class="card__header inline justify-content-between align-items-center">
                <h3 class="card__title"><a href="#" class="card__link">Button Primitive</a></h3>
                <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
              </header>
              <div class="card__body">
                <p class="text">Accessible button component supporting primary, subtle, and icon variants.</p>
              </div>
              <footer class="card__footer inline justify-content-between align-items-center">
                <span class="chip chip--subtle"><span class="chip__text">Forms</span></span>
                <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
              </footer>
            </article>
          </div>
        </li>
      </ul>
    </div>

  </div>
</main>
```

---

## Non-Negotiable Architectural Rules

### 1. Zero Legacy Hacks — Rely on Native Primitives
- **Overlays & Dialogs:** Use native HTML `<dialog>` with `.showModal()`. Never generate custom `div` modals or JS focus traps.
- **Popovers:** Use the native `popover` attribute (`popover="auto"` or `popover="manual"`) with CSS Anchor Positioning (`position-anchor`, `position-area`, `anchor()`).
- **Interactive Controls:** Always use native semantic elements (`<button type="button">`, `<a href="...">`, `<input>`, `<textarea>`). Never create untyped clickable `<div>` or `<span>` elements.
- **Form Growth & Sizing:** Use `field-sizing: content;` on `<textarea>` instead of manual JavaScript height auto-expansion listeners.
- **Validation Timing:** Use `:user-invalid` and `:user-valid` rather than `:invalid` to prevent premature error styling on pristine/unvisited fields.
- **Animatable Keywords:** Use `interpolate-size: allow-keywords;` on `:root` instead of manual height-measuring JavaScript for expand/collapse transitions.
- **Typography Alignment:** Use `text-box: trim-both cap alphabetic;` for exact typographic bounding boxes without phantom leading.

### 2. Strict Token Compliance & W3C DTCG Standard
- **W3C DTCG Format:** All tokens use `$value`, `$type`, and `$description`. Group-level `$type` inheritance is supported.
- **Never Hardcode Literals:** No raw `#hex`, `rgb()`, `px`, or `rem` in component CSS. Every color, spacing, radius, border, and duration must reference custom properties from `packages/css/src/variables.css`.
- **Resilient Fallback Philosophy (Unstyled Resilience):**
  - Component CSS variable declarations should never use complex hardcoded multi-layer strings or arbitrary hex codes as fallbacks.
  - If a token system fails to load, a stylesheet is consumed in isolation, or CSS variables are absent, the site must degrade gracefully into a functional, legible, unstyled state.
  - **Terminal Fallback Standards:**
    - **Shadows:** Always terminate at `none` (or `0 0 0 transparent`), e.g. `var(--component-shadow, var(--shadow-md, none))`. Never hardcoded `rgba(...)` multi-layer stacks.
    - **Borders:** Border colors terminate at `currentColor` (or `transparent` when borderless); border widths terminate at `1px` or `0px`.
    - **Surfaces & Backgrounds:** Terminate at `Canvas`, `Highlight`, or `transparent`. Never hardcoded `#ffffff` or arbitrary hexes.
    - **Foregrounds & Text:** Terminate at `currentColor` or `CanvasText`.
- **Token Tier Boundary:** Components reference Tier 2 semantic tokens (and their own optional Tier 3 tokens) only. Never reference Tier 1 tokens such as `--spacing-4`, `--spacing-8`, `--spacing-16` or raw `--color-*` ramps directly. Semantic spacing tokens (for example `--space-sm`, `--space-md`) do not exist yet: add one to `tokens/2-semantic.json` only when a component being refactored actually needs it, never speculatively.
- **No Literal Colour Fallbacks:** `var(--button-bg, #1a1a1a)` fails review. Chain to a semantic token and end at a system value: `var(--button-bg, var(--surface-neutral, Canvas))`.
- **Semantic Fallbacks in CSS:** When using component tokens, always supply semantic fallbacks: `var(--component-x, var(--<domain>-x, <basic-terminal-fallback>))`.
- **Dual-Bridge Strategy (Web & Figma):**
  - Token source (`1-global.json`) contains the pure modular scale (`-2` to `8`) without web math or `fluid-N` clutter.
  - Web compiler (`compile-tokens.js`) generates standard `clamp()` fallbacks plus `@supports (opacity: progress(1px, 0px, 1px))` progressive enhancement.
  - Figma exporter (`export-figma-tokens.js`) converts all tokens to static pixel floats/dimensions and native shadows for $0 free-tier Tokens Studio and Figma Variables.
- **Token Editing:** To add or update tokens, edit `tokens/1-global.json`, `tokens/2-semantic.json`, or `tokens/3-component.json`, then execute:
  ```bash
  npm run build:tokens
  npm run export:figma
  ```
- **Elevation & Shadows Architecture (3-Layer Stacks & CSS Level 5 `@function`):**
  - Shadows use 3-layer Gaussian blur stacks (`sm`, `md`, `lg`, `inner` and `-light` variants) with decomposed layer variables (`--_shadow-*-layer-[1..3]`).
  - Web compiler emits native CSS functions (`@function --shadow-sm(--color: black) { result: ... }`) enabling zero-JS parameterized recoloring without repeating 3-layer declarations.
  - Full universal backward compatibility via `@supports at-rule(@function)` and contextual CSS custom property inheritance (`--shadow-color: [any-color]; box-shadow: var(--shadow-md, none);`).
  - ⚠️ **Firefox Compatibility Gotcha:** Firefox does not yet support CSS `@function`. Writing `box-shadow: --shadow-md(...)` directly causes Firefox to drop the property entirely. Always guard `@function` with `@supports at-rule(@function)` or cascade fallback to `var(--shadow-md)`.
- **Light/Dark Mode:** Never write redundant `.dark-mode` class blocks. Use native `light-dark()` in tokens and rely on `color-scheme: light dark;`.

### 3. Top-Layer Animations
- Elements entering/exiting the top layer (`dialog`, `[popover]`) must use:
  - `@starting-style` for entry animations.
  - `transition-behavior: allow-discrete;` on `display` and `overlay`.
  - Animate `::backdrop` smoothly alongside the dialog.
  - Full `@media (prefers-reduced-motion: reduce)` fallbacks.

### 4. Accessibility First (WCAG 2.2 AA / AAA)
- **High-Contrast Focus Visible:** Every interactive element must display `outline: var(--focus-ring-width) solid var(--focus-ring-color)` with `outline-offset: var(--focus-ring-offset)`.
- **Target Sizes:** Primary buttons and touch targets must meet `--button-min-size: var(--spacing-target)` (`3rem` / `48px`, exceeding WCAG 2.5.5). Small variants must meet at least `24x24px` (WCAG 2.5.8), and on coarse pointers keep a 48px hit area via a transparent `::after` or padding buffer.
- **Intent Is Never Colour Alone (WCAG 1.4.1):** Every danger, warning, success, info or accent variant must also carry an icon, role or descriptive text.
- **Automated Axe Audits:** Every Storybook story must pass `@storybook/addon-a11y` without contrast, labeling, or keyboard violations.
- Consult `.agents/skills/accessibility/SKILL.md` for specific ARIA patterns.

### 5. Local Private Variables Manifest & State Variable Contract
- In component stylesheets, define all local fallback ladders at the top of the base `:where(.<component>)` selector using the private `--_<component>-*` prefix.
- **Interactive State Contract:** Declare `--_<component>-hover-*` and `--_<component>-active-*` private variables at the component root. Handle `:hover` and `:active` **strictly once** inside the base selector consuming these variables.
- Modifiers (`.<component>--accent`, `.<component>--subtle`, `.<component>--compact`) act as **pure token maps** that re-assign private variables rather than duplicating pseudo-classes or declarations.
- Child elements and pseudo-elements must consume `var(--_<component>-*)` directly.

### 6. Container Style Queries (`@container style(...)`)
- Support zero-class contextual styling by declaring `@container style(--<component>-variation: ...)` and `@container style(--<component>-corners: ...)` directly in the base component.
- Enables parent containers to orchestrate children cleanly: `.navigation { --button-prominence: subtle; --button-corners: round; }`.
- Name flags after the PRINCIPLES axis they set: `--<component>-prominence`, `--<component>-intent`, `--<component>-size`, `--<component>-corners`. Density is never a per-component flag; use `--ui-sizing: compact`. Button is the reference implementation; older `--<component>-variation` flags are migrated in each component's pass.

---

## Component Authoring Workflow
1. **Check Tokens:** Verify required tokens exist in `tokens/3-component.json`. If missing, add them and run `npm run build:tokens`.
2. **Author CSS:** Create `packages/css/src/{atoms,molecules,organisms}/<component>.css` based on the component's Atomic Design tier. Use `:where()` for low specificity, local private variables manifest (`--_<component>-*`) with state contract (`--_<component>-hover-*`, `--_<component>-active-*`), container style queries (`@container style(...)`), native CSS nesting with explicit `&` for states (`&:hover`, `&:active`, `&:focus-visible`), logical properties (`inline-size`, `block-size`, `padding-inline`, `padding-block`), and standardized section comments. Consult `.agents/skills/tokens/SKILL.md` (Section 4) and `.agents/skills/css-commenting/SKILL.md` for full guidelines.
3. **Register in Entrypoint:** Add `@import './{atoms,molecules,organisms}/<component>.css';` into the appropriate Atomic tier in `packages/css/src/index.css`.
4. **Author Storybook Stories:** Create `packages/storybook/stories/{atoms,molecules,organisms,layout,utilities,recipes}/<component>.stories.ts` with matching `title: '{Atoms,Molecules,Organisms,Layout,Utilities,Recipes}/...'`, covering all variants, sizes, states (`hover`, `active`, `disabled`, `aria-disabled`), and verify with `npm run build-storybook --workspace=@design-for-humans/storybook`.