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
| Density | Containers & layout only | default, `--compact` (sets `--ui-sizing: compact`; nested gaps, type and controls step down) |
| Presentation | Everything | Normal (text + icon), minimal (icon only) |
| Prominence | Everything with a surface | default, `--strong`, `--subtle`, `--plain` |
| Intent | Status or consequence | neutral (default), `--accent`, `--danger`, `--warning`, `--success`, `--info` |

- **Intent never relies on colour alone** (WCAG 1.4.1): pair every non-neutral intent with an icon, a role (`role="alert"`, `role="status"`) or descriptive text.
- **Smaller size never shrinks the hit area:** `--sm` controls (and controls stepped down by a compact container) keep a 48px target unless the product has opted into fine-pointer targets, and never drop below 24px (WCAG 2.5.8). The library never switches fine-pointer mode on automatically with `@media (pointer: fine)`.

### Legacy → Canonical Names
| Current class (use until migrated) | Target | Notes |
| :--- | :--- | :--- |
| `.button--primary` | `.button--strong.button--accent` | Already supported. Do not write `--primary` in new markup. |
| `.button--secondary` | `.button` (default) | Not a button modifier; never use it. |
| `.button--destructive` | `.button--danger` | Keep `--destructive` until button is migrated. |
| `.button--subtle-primary`, `.button--plain-primary`, `.button--plain-destructive`, `.button--subtle-tint`, `.button--ghost` | Combine single-axis modifiers | Compound or duplicate prominence names; remove. |
| `--dense` modifiers (`.card--dense`, `.field--dense`, `.banner--dense`, etc.) | `--compact` | One density modifier only. |
| `.ui-dense`, `style(--ui-density: dense)`, `--control-density`, `--menu-density`, `--combobox-density`, `--textarea-density`, `--telemetry-density` | `.ui-compact`, `style(--ui-sizing: compact)` | One density flag. Migrate in each component's pass. |
| `.banner--info` | Undecided | Currently maps to accent; settled in the banner pass. |
| `.alert` styling | `.banner` + `role` | `.alert` is a placement container only (see §21). |
| `.range-group` | `.range-lockup` | Do not use. |
| `.tabs`, `.tabs__panel`, `.tab--simple`, `.workspace` | `.tabbed-content`, `.tab-panel`, `.tab--plain`, `.app__workspace` | Do not use. |
| Responsive visibility synonyms (§31D) | First name in each row | Do not use synonyms. |

### v1 Scope
- **In core:** `telemetry` (to be refactored onto badge, text and icon atoms), `batch-actions`.
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
2. **Sass Recompilation:** After updating SCSS in `designforhumans-blog`, recompile shared stylesheets using:
   ```bash
   /opt/homebrew/bin/sass web/styles/scss/dfh-shared.scss web/styles/dfh-shared.css && /opt/homebrew/bin/sass web/styles/scss/dfh-blog.scss web/styles/dfh-blog.css
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

In Design For Humans, complex assemblies (`.card`, `.dialog`, `.empty-state`, `.table`, `.tabbed-content`) are **Organisms** that compose foundational **Atoms** (`.button`, `.heading`, `.subheading`, `.small-heading`, `.micro-heading`, `.display-title`, `.text`, `.caption`, `.badge`, `.chip`, `.icon`).

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

### 3. Container-Adaptive Typography Mode (`--font-sizing: cq`)
Organism and structural molecule containers (`.card__content`, `.empty-state`, `.stepper`, `.dialog`, `.menu`, `.combobox`) establish container query contexts and enable container query font sizing:
```css
container-type: inline-size;
--font-sizing: cq;
```
This enables all typography atoms placed inside (`.heading`, `.subheading`, `.small-heading`, `.micro-heading`, `.display-title`, `.small-text`, `.micro-text`) to scale adaptively with container query units (`cqi`), remaining perfectly proportioned across any container width without breakpoint micro-management.

### 4. Container Density & Sizing Orchestration (`--ui-sizing: compact` & `--font-sizing: compact`)
When an organism or molecule enters compact density (the only density modifier is `--compact`; `--dense` is legacy) (`.stepper--compact`, `.card--compact`, `.menu--compact`, `.table--compact`, `.combobox--compact`), declare:
```css
--ui-sizing: compact;
```
This enables nested text atoms (`.heading`, `.subheading`, `.small-heading`, `.micro-heading`, `.display-title`, `.micro-text`, etc.) to automatically step down to their compact scale variants (`--micro-heading-compact-font-size`, `--micro-text-compact-font-size`, `--title-compact-font-size`, etc.) via `@container style(--ui-sizing: compact) or style(--font-sizing: compact)` container style queries without manual utility overrides or invasive class juggling.

To step down typography alone without changing container geometry, set `--font-sizing: compact` on the region instead. Size modifiers (`--sm`, `--lg`) belong to atoms and controls only; containers never take a size modifier.

### 5. Tier 3 Token Economy
Never create redundant Tier 3 component tokens for heading or description typography (e.g. `card.title-font-size`, `empty-state.title-font-size`, `stepper.title-font-size`, `menu.header-font-size`). Typography is owned globally and composed atomically.

---

## Canonical Component Markup Signatures
When generating or authoring HTML markup for Design For Humans components, strictly use the following semantic patterns:

### 1. Button Primitive
```html
<!-- Default Button (Outline Neutral) -->
<button type="button" class="button">
  <span>Action Label</span>
</button>

<!-- Strong Button (High-emphasis filled neutral, synonym: .button--selected, .is-active) -->
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

<!-- Destructive Button (Outlined danger) -->
<button type="button" class="button button--destructive">
  <span>Delete Item</span>
</button>

<!-- Strong Destructive Button (High-emphasis solid danger) -->
<button type="button" class="button button--strong button--destructive">
  <span>Delete Record</span>
</button>

<!-- Subtle Destructive Button -->
<button type="button" class="button button--subtle button--destructive">
  <span>Remove</span>
</button>

<!-- Placeholder / Dashed Outline Button -->
<button type="button" class="button button--placeholder">
  <span>+ Add Item</span>
</button>

<!-- With Icon (Trailing) -->
<button type="button" class="button button--strong button--accent">
  <span>Get Started</span>
  <svg class="icon icon--dir" aria-hidden="true" focusable="false">
    <use href="#ArrowRight"/>
  </svg>
</button>

<!-- Icon-Only Button (MANDATORY: use .visually-hidden text for translation & voice control) -->
<button type="button" class="button button--icon">
  <span class="visually-hidden">Search site</span>
  <svg class="icon" aria-hidden="true" focusable="false">
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
  <svg class="icon icon--off" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  <span>Switch</span>
</label>

<!-- Button-Like Radio Group Choices -->
<div class="cluster">
  <label class="button">
    <input type="radio" name="choice-demo" class="visually-hidden" checked />
    <span>Choice 1</span>
    <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
  <label class="button">
    <input type="radio" name="choice-demo" class="visually-hidden" />
    <span>Choice 2</span>
    <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
</div>

<!-- Link Styled as Button (MANDATORY: role="button") -->
<a href="/login" class="button button--strong button--accent" role="button">
  <span>Log In</span>
</a>

<!-- Persistently Labeled Button (Opts out of container style(--ui-labels: hidden) text collapsing) -->
<button type="button" class="button button--labeled">
  <svg class="icon" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
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
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
            </svg>
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
  <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
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
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
            <span>Duplicate</span>
          </button>
          <button type="button" class="button">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
            <span>Export JSON</span>
          </button>
          <hr class="divider">
          <button type="button" class="button button--destructive">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
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
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
      <span>Duplicate</span>
      <kbd class="kbd">⌘D</kbd>
    </button>
  </li>
  <li role="none">
    <button type="button" class="menu__item" role="menuitem">
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
      <span>Export JSON</span>
      <kbd class="kbd">⇧⌘E</kbd>
    </button>
  </li>
  <hr class="menu__separator">
  <li role="none">
    <button type="button" class="menu__item menu__item--destructive" role="menuitem">
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
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
  <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
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
        <svg class="icon" aria-hidden="true"><use href="#Edit"/></svg>
        <span>Rename</span>
      </button>
    </li>
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" aria-hidden="true"><use href="#Share"/></svg>
        <span>Share Link</span>
      </button>
    </li>
    <hr class="menu__separator">
    <li role="none">
      <button type="button" class="menu__item menu__item--destructive" role="menuitem">
        <svg class="icon" aria-hidden="true"><use href="#Delete"/></svg>
        <span>Delete</span>
      </button>
    </li>
  </menu>
</div>

<!-- Button-Group Companion Compatibility (using .button inside .menu) -->
<menu class="menu menu--compact">
  <button type="button" class="button">
    <svg class="icon" aria-hidden="true"><use href="#Copy"/></svg>
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

### 5. Badge Primitive
Badges convey passive status, metadata counters, and keyboard keys. They follow the same orthogonal prominence matrix as buttons:
- **Default:** 1px border with a subtle translucent tinted background.
- **Strong (`.badge--strong`):** High-emphasis solid tone fill with inverted high-contrast white text.
- **Subtle (`.badge--subtle`):** Translucent tinted background with no border.
- **Plain (`.badge--plain`):** Borderless and background-free, displaying only colored text.
- **Tones:** `.badge--accent`, `.badge--success`, `.badge--warning`, `.badge--danger` (use `badge--danger`, NOT destructive, as badges indicate passive status rather than destructive user actions).

```html
<!-- Default Badge (1px border + subtle translucent tint) -->
<span class="badge"><span>Neutral</span></span>
<span class="badge badge--accent"><span>Accent</span></span>
<span class="badge badge--success" data-status="online"><span>Online</span></span>
<span class="badge badge--warning" data-status="away"><span>Pending</span></span>
<span class="badge badge--danger" data-status="busy"><span>Danger</span></span>

<!-- Strong Badge (Solid tone fill + inverted text) -->
<span class="badge badge--strong"><span>Strong Neutral</span></span>
<span class="badge badge--accent badge--strong"><span>Strong Accent</span></span>
<span class="badge badge--danger badge--strong"><span>Failed</span></span>

<!-- Subtle Badge (Translucent tint, borderless) -->
<span class="badge badge--subtle"><span>Subtle Neutral</span></span>
<span class="badge badge--accent badge--subtle"><span>Subtle Accent</span></span>

<!-- Plain Badge (Borderless, transparent) -->
<span class="badge badge--plain"><span>Plain Neutral</span></span>
<span class="badge badge--accent badge--plain"><span>Plain Accent</span></span>

<!-- Round & Small Badges -->
<span class="badge badge--accent badge--round"><span>New Release</span></span>
<span class="badge badge--danger badge--strong badge--sm badge--round"><span>3</span></span>

<!-- Keyboard Key Primitive (.kbd) -->
<kbd class="kbd">⌘K</kbd>
<kbd class="kbd">Esc</kbd>

<!-- Corner Notification Badges (Anchored to relative buttons or action containers) -->
<!-- NOTE: Do NOT place corner badges inside .avatar (which uses overflow: hidden). For avatars, use [data-status] color rings -->
<button type="button" class="button button--icon" style="position: relative;" aria-label="Notifications (1 unread)">
  <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#BellFilled"/></svg>
  <span class="badge badge--danger badge--strong badge--sm badge--round badge--top-right-corner">
    <span>1</span>
  </span>
</button>
```

### 5b. Chip & Live Status Primitives
Chips represent metadata tags and dismissible filter tokens. Unlike badges, chips remain simple (no `--strong` or `--subtle` variations):
```html
<!-- Padded Chip with Background (Tags & Comboboxes) -->
<span class="chip"><span>TypeScript</span></span>

<!-- Dismissible Chip (Tags in Combobox / Active Filters) -->
<span class="chip">
  <span>TypeScript</span>
  <button type="button" class="chip__remove" aria-label="Remove TypeScript tag">
    <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
  </button>
</span>

<!-- Plain Frameless Chip (No Background or Padding) -->
<span class="chip chip--plain">Lesson 04</span>
<span class="chip chip--plain chip--status" data-status="online">Online</span>

<!-- Live Status Indicators (with zero-JS indicator dot) -->
<span class="status" data-status="online">Online</span>
<span class="status" data-status="away">Away</span>
<span class="status" data-status="busy">Do Not Disturb</span>
<span class="status" data-status="offline">Offline</span>
```

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
  <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- Placeholder / Add User Avatar -->
<div class="avatar avatar--placeholder" aria-label="Add team member">
  <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
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

#### A. Text, Color, and File Inputs
```html
<!-- Base Text Input with Field Wrapper, Label, and Hint -->
<div class="field">
  <label for="user-email" class="field__label">Email Address</label>
  <p id="user-email-hint" class="field__hint">We will never share your email address.</p>
  <input 
    id="user-email" 
    type="email" 
    class="input" 
    placeholder="you@domain.com"
    aria-describedby="user-email-hint"
  />
</div>

<!-- Modern Web Validation: :user-invalid triggers only after interaction/blur -->
<div class="field">
  <label for="user-password" class="field__label">Password</label>
  <input 
    id="user-password" 
    type="password" 
    class="input" 
    required
    placeholder="••••••••••••"
  />
</div>

<!-- Explicit Error State (Accessible ARIA Association) -->
<div class="field">
  <label for="account-id" class="field__label">Account ID</label>
  <input 
    id="account-id" 
    type="text" 
    class="input" 
    aria-invalid="true" 
    aria-describedby="account-id-error"
    value="INVALID-ID"
  />
  <p id="account-id-error" class="field__error" role="alert">
    Account ID must start with "DFH-" followed by 6 digits.
  </p>
</div>

<!-- Input Sizes (sm: 24px WCAG 2.5.8, md: 48px WCAG 2.5.5, lg: 56px) -->
<input type="text" class="input input--sm" placeholder="Compact filter..." />
<input type="text" class="input" placeholder="Standard size..." />
<input type="text" class="input input--lg" placeholder="Large search..." />

<!-- Input Variations (Plain & Subtle) -->
<input type="text" class="input input--plain" placeholder="Plain input (transparent, borderless)..." />
<input type="text" class="input input--subtle" placeholder="Subtle input (translucent, borderless)..." />

<!-- Color & File Inputs -->
<input type="color" class="color-input" value="#00d2c4" />
<input type="file" class="file-input" />
```

#### B. Zero-JS Auto-Growing Textarea (`field-sizing: content`)
```html
<div class="field">
  <label for="feedback" class="field__label">Feedback</label>
  <textarea 
    id="feedback" 
    class="textarea" 
    rows="3" 
    placeholder="Tell us what you think..."
  ></textarea>
</div>

<!-- Textarea starting as single-line and expanding dynamically -->
<textarea class="textarea textarea--one-line" placeholder="Quick comment..."></textarea>
```

#### C. Native & Customizable Select
```html
<!-- Native Accessible Select -->
<div class="field">
  <label for="role-select" class="field__label">Primary Role</label>
  <select id="role-select" class="select">
    <option value="">Select role...</option>
    <option value="lead">Accessibility Lead</option>
    <option value="eng">Design Engineer</option>
  </select>
</div>

<!-- Modern Customizable Select (appearance: base-select) -->
<select class="select select--custom">
  <button type="button">
    <selectedcontent></selectedcontent>
  </button>
  <option value="aa" selected>WCAG 2.2 AA</option>
  <option value="aaa">WCAG 2.2 AAA</option>
</select>
```

#### D. Checkboxes, Radios, Choices & Fieldset
```html
<!-- Choice Items Grouped in Choices Container -->
<fieldset class="fieldset">
  <legend class="legend">Accessible Audit Deliverables</legend>
  <div class="choices">
    <label class="choice" for="cb-axe">
      <input type="checkbox" id="cb-axe" class="checkbox-input" checked />
      <span>Automated axe-core compliance scanner</span>
    </label>
    <label class="choice" for="cb-keyboard">
      <input type="checkbox" id="cb-keyboard" class="checkbox-input" />
      <span>Keyboard navigation review</span>
    </label>
  </div>
</fieldset>

<!-- Horizontal Radio Group -->
<div class="choices choices--inline">
  <label class="choice" for="freq-daily">
    <input type="radio" id="freq-daily" name="frequency" class="radio-input" checked />
    <span>Daily</span>
  </label>
  <label class="choice" for="freq-weekly">
    <input type="radio" id="freq-weekly" name="frequency" class="radio-input" />
    <span>Weekly</span>
  </label>
</div>
```

#### E. Segmented Toggle Switch Primitive (`role="switch"`)
```html
<!-- Default Switch (Zero-JS state management via CSS :has(:checked)) -->
<label class="switch">
  <span class="switch__label">Notifications</span>
  <input type="checkbox" role="switch" class="visually-hidden" />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>

<!-- Active / Checked Switch -->
<label class="switch">
  <span class="switch__label">Dark Mode</span>
  <input type="checkbox" role="switch" class="visually-hidden" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>

<!-- Compact Switch -->
<label class="switch switch--sm">
  <span class="switch__label">Compact Filter</span>
  <input type="checkbox" role="switch" class="visually-hidden" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>
```

#### F. Range Slider Input Primitive (`<input type="range">`)
```html
<!-- Interactive Range Slider with Output Readout -->
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label">Volume Level</label>
    <output for="volume-control" class="field__output" id="vol-readout">65%</output>
  </div>
  <input 
    id="volume-control" 
    type="range" 
    class="range" 
    min="0" 
    max="100" 
    value="65" 
    style="--value: 65%;"
    aria-describedby="vol-readout"
  />
</div>

<!-- Range Sizing (.range--sm: 4px/16px, .range--lg: 12px/32px) -->
<input type="range" class="range range--sm" value="30" min="0" max="100" style="--value: 30%;" />
<input type="range" class="range" value="50" min="0" max="100" style="--value: 50%;" />
<input type="range" class="range range--lg" value="75" min="0" max="100" style="--value: 75%;" />

<!-- Semantic Color Range Sliders -->
<input type="range" class="range range--success" value="85" min="0" max="100" style="--value: 85%;" />
<input type="range" class="range range--warning" value="45" min="0" max="100" style="--value: 45%;" />
<input type="range" class="range range--danger" value="20" min="0" max="100" style="--value: 20%;" />

<!-- Range Lockup Primitive (.range-lockup; legacy .range-group is pending removal, never use it) -->
<!-- Unified composite pairing an action button, slider, and numerical readout -->
<!-- Note: Renamed from .range-group to avoid collision with emerging native <rangegroup> -->
<div class="range-lockup range-lockup--sm">
  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Toggle mute">
    <svg class="icon" aria-hidden="true"><use href="#VolumeOn"/></svg>
  </button>
  <input type="range" class="range range--sm" value="85" min="0" max="100" style="--value: 85%;" aria-label="Volume slider" />
  <output class="range-lockup__output">85%</output>
</div>

<!-- Surface Pill Range Lockup with Focus Delegation (:focus-within) -->
<div class="range-lockup range-lockup--sm range-lockup--pill range-lockup--bordered">
  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Toggle mute">
    <svg class="icon" aria-hidden="true"><use href="#VolumeOn"/></svg>
  </button>
  <input type="range" class="range range--sm" value="50" min="0" max="100" style="--value: 50%;" aria-label="Volume slider" />
  <output class="range-lockup__output">50%</output>
</div>
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
```html
<!-- Canonical Top Banner Skip Link (Placed at the very top of <body>) -->
<a href="#main" class="skip-link">
  <span>Skip to main content</span>
</a>

<!-- Floating Round Skip Link Variant -->
<a href="#main" class="skip-link skip-link--floating">
  <span>Skip to main content</span>
</a>

<!-- Grouped Multiple Destinations (Semantic <nav> and <ul>/<li> list) -->
<nav class="skip-links" aria-label="Skip links">
  <ul>
    <li>
      <a href="#main" class="skip-link">
        <span>Skip to main content</span>
      </a>
    </li>
    <li>
      <a href="#navigation" class="skip-link">
        <span>Skip to navigation</span>
      </a>
    </li>
    <li>
      <a href="#footer" class="skip-link">
        <span>Skip to footer</span>
      </a>
    </li>
  </ul>
</nav>
```

### 8. Link & Block Link Primitives

#### A. Inline Hyperlinks
```html
<!-- Default Inline Link -->
<a href="/accessibility" class="link">
  <span>Accessibility Standards</span>
</a>

<!-- Inverted Context Link -->
<a href="/report" class="link link--inverted">
  <span>Conformance Report</span>
</a>

<!-- On-Dark Context Link -->
<a href="/github" class="link link--on-dark">
  <span>GitHub Repository</span>
</a>

<!-- Subtle Link (inherits color at rest, lights up on interaction) -->
<a href="/category/design" class="link link--subtle">
  <span>Design Systems</span>
</a>

<!-- External Link (MANDATORY: .visually-hidden disclaimer + aria-hidden .icon) -->
<a href="https://www.w3.org" class="link" target="_blank" rel="noopener noreferrer">
  <span>W3C Guidelines</span>
  <span class="visually-hidden"> (opens in a new tab)</span>
  <svg class="icon icon--dir" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
</a>
```

#### B. Block Links (Cards & Directory Callouts)
```html
<!-- Standalone Block Link Callout with micro-animated trailing arrow -->
<a href="/case-studies/contrast" class="block-link">
  <span class="block-link__text">Color Contrast Beyond 4.5:1</span>
  <svg class="block-link__arrow icon icon--dir" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
</a>

<!-- Category / Resource List of Block Links -->
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--spacing-8);">
  <li>
    <a href="/topics/wcag" class="block-link">
      <span class="block-link__text">WCAG 2.2 Guidelines</span>
      <svg class="block-link__arrow icon icon--dir" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    </a>
  </li>
</ul>
```

### 9. Icon Primitive
```html
<!-- Standard Inline Icon (scales dynamically with surrounding text font-size) -->
<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <circle cx="12" cy="12" r="10"></circle>
</svg>

<!-- Directional Icon (automatically mirrors with scale: -1 1 in [dir="rtl"] contexts) -->
<svg class="icon icon--dir" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <polyline points="12 5 19 12 12 19"></polyline>
</svg>
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

#### B. Content Card with Badge & Action Button
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
      <span class="badge badge--success"><span>Active</span></span>
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
      <span class="badge badge--accent badge--round"><span>Step 2 of 4</span></span>
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
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
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
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
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
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
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
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
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
            <td class="table__cell--fit"><span class="badge badge--success"><span>Active</span></span></td>
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
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </th>
        <th scope="col" class="table__cell--numeric">
          <button type="button" class="table__sort-button" aria-sort="descending" aria-label="Sort by downloads">
            <span>Downloads</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
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
        <td class="table__cell--fit"><span class="badge"><span>Level A</span></span></td>
        <td class="table__cell--fit table__cell--center">
          <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" class="table__cell--fit">Summary</th>
        <td colspan="3" class="table__cell--long">All core components passing compliance</td>
        <td class="table__cell--fit table__cell--center"><span class="badge badge--success"><span>Passed</span></span></td>
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
        <td class="table__col--sm"><span class="chip chip--sm"><span>Music</span></span></td>
        <td class="table__col--num font-mono text-muted">03:52</td>
        <td class="table__col--md"><span class="badge badge--success badge--sm"><span>Live</span></span></td>
        <td class="table__col--actions">
          <button type="button" class="button button--subtle button--icon button--sm" aria-label="Options">
            <svg class="icon"><use href="#ChevronDown"/></svg>
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
  <hr class="divider">
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
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
    <span class="button__text">Share Document</span>
    <span class="badge badge--sm"><span>New</span></span>
  </button>
  <button type="button" class="button" role="option">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Duplicate"/></svg>
    <span class="button__text">Duplicate</span>
    <kbd class="kbd">⌘D</kbd>
  </button>
  <h3 class="button-group__content micro-heading text-muted">Danger Zone</h3>
  <button type="button" class="button button--destructive" role="option">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Delete"/></svg>
    <span class="button__text">Delete Permanently</span>
  </button>
</div>
```

### 15. Divider Primitive

#### A. Horizontal Divider (Default Stack/Block Context)
```html
<hr class="divider">
```

#### B. Vertical Divider (Inside Row Container via Container Style Queries)
```html
<!-- Automatically adopts vertical border-inline-start when container has --direction: row -->
<div class="button-group">
  <button type="button" class="button button--subtle"><span>Dashboard</span></button>
  <hr class="divider">
  <button type="button" class="button button--subtle"><span>Settings</span></button>
</div>
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
  <span class="button button--selected" aria-current="page"><span>1</span></span>
  <a class="button" href="/page/2"><span>2</span></a>
  <a class="button" href="/page/3"><span>3</span></a>
  <hr class="divider">
  <a class="button" href="/page/10"><span>10</span></a>
</nav>
```

#### B. Directional Navigation with Text Indicator
```html
<nav class="pagination button-group buttons-subtle" aria-label="Pagination">
  <span aria-disabled="true" class="button">
    <svg class="icon dir" width="24" height="24" aria-hidden="true" focusable="false">
      <use href="#ChevronLeft"/>
    </svg>
    <span class="visually-hidden">Previous page</span>
  </span>
  <hr class="divider">
  <span class="button-group__content">Page 1 of 10</span>
  <hr class="divider">
  <a class="button" href="/page/2">
    <svg class="icon dir" width="24" height="24" aria-hidden="true" focusable="false">
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
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
        </svg>
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
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
      </svg>
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
- `.batch-actions__separator`: Vertical divider rule.

```html
<!-- Floating Batch Actions Bar -->
<aside class="batch-actions" role="toolbar" aria-label="Batch operations">
  <!-- Summary Hook -->
  <div class="batch-actions__summary">
    <span class="badge badge--accent badge--round"><span>3</span></span>
    <span class="micro-heading">3 items selected</span>
  </div>

  <hr class="batch-actions__separator" aria-hidden="true" />

  <!-- Actions Hook -->
  <div class="batch-actions__actions">
    <div class="button-group button-group--tight buttons-sm buttons-subtle">
      <button type="button" class="button">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
        <span>Export</span>
      </button>
      <button type="button" class="button">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
        <span>Edit</span>
      </button>
      <button type="button" class="button button--destructive">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
        <span>Delete</span>
      </button>
    </div>
  </div>

  <hr class="batch-actions__separator" aria-hidden="true" />

  <!-- Dismiss Hook -->
  <div class="batch-actions__dismiss">
    <button type="button" class="button button--subtle button--icon button--sm" aria-label="Clear selection">
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      <span class="visually-hidden">Clear selection</span>
    </button>
  </div>
</aside>

<!-- Docked Variant (Embedded inside Card or Table container) -->
<aside class="batch-actions batch-actions--docked" role="toolbar" aria-label="Table batch actions">
  <div class="batch-actions__summary">
    <span class="badge badge--accent badge--round"><span>5</span></span>
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
        <nav class="tab-list tabs-vertical tabs-plain tabs-sm">
          <ul>
            <li><button type="button" class="tab is-active" aria-current="page" aria-label="Studio"><svg class="icon"><use href="#Radio"/></svg></button></li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Contextual Submenu Sidebar -->
    <aside class="sidebar sidebar--flush" aria-label="Sub-navigation">
      <div class="sidebar__scroller">
        <nav class="tab-list tabs-vertical tabs-plain tabs-flush tabs-sm">
          <ul>
            <li><a href="#feed" class="tab is-active" aria-current="page"><span class="tab__text">Live Feed</span></a></li>
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
  <footer class="sidebar__footer"><span class="micro-text">v2.4.0</span></footer>
</aside>

<!-- 2. Flush Sidebar for Edge-to-Edge Tabs -->
<aside class="sidebar sidebar--flush" aria-label="File Tree">
  <div class="sidebar__scroller">
    <nav class="tab-list tabs-flush tabs-vertical">...</nav>
  </div>
</aside>

<!-- 3. Slim Navigation Rail -->
<aside class="sidebar sidebar--rail" aria-label="Global Rail">
  <div class="sidebar__scroller">
    <nav class="tab-list tabs-vertical tabs-plain tabs-sm">...</nav>
  </div>
</aside>
```

#### F. Mobile Floating Bottom Tab Dock (`.tabs-docked`)
Fixed floating bottom navigation bar for mobile viewports (`md:hide`), elevating `tab-list` primitives:
```html
<div class="tabs-docked md:hide" style="z-index: var(--z-index-sticky, 100);">
  <nav class="tab-list tabs-button tabs-round tabs-floating" aria-label="Mobile Bottom Navigation">
    <button type="button" class="tab is-active" aria-current="page" aria-label="Home"><svg class="icon"><use href="#Home"/></svg></button>
    <button type="button" class="tab" aria-label="Schedule"><svg class="icon"><use href="#Calendar"/></svg></button>
    <button type="button" class="tab" aria-label="Settings"><svg class="icon"><use href="#Settings"/></svg></button>
  </nav>
</div>
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

#### A. Standalone Headings Hierarchy
```html
<h1 class="display-title">Display Title</h1>
<h2 class="title">Editorial Title</h2>
<h3 class="heading">Section Heading</h3>
<h4 class="subheading">Article Subheading</h4>
<h5 class="small-heading">Card Subheading</h5>
<span class="micro-heading">Category Eyebrow</span>
```

#### B. Block Text Styles
```html
<p class="large-text">Editorial lead-in paragraph text.</p>
<p class="text">Standard body paragraph styled with design system line-height and font scale.</p>
<p class="strong-text text">Emphasized body text with strong token weight.</p>
<p class="small-text">Secondary caption, timestamp, or form hint.</p>
<p class="micro-text">Compact legal disclaimer or fine-print.</p>
```

#### C. Adaptive & Fixed Scaling via Utilities
```html
<!-- Container-adaptive scaling (cqi units via .font-sizing-cq) -->
<div class="font-sizing-cq" style="container-type: inline-size;">
  <h2 class="title">Container Adaptive Title</h2>
  <h3 class="heading">Container Adaptive Heading</h3>
  <p class="text">Container Adaptive Body</p>
</div>

<!-- Locked fixed scale steps (via .font-sizing-fixed) -->
<div class="font-sizing-fixed">
  <h2 class="title">Fixed Scale Title</h2>
  <h3 class="heading">Fixed Scale Heading</h3>
  <p class="text">Fixed Scale Body</p>
</div>
```

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
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
        </svg>
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
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
      </svg>
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
  <span class="badge badge--accent">Design Tokens</span>
  <span class="badge badge--success">WCAG AAA</span>
  <span class="chip">v2.0</span>
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
  <span class="visually-hidden">Save Document</span>
  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
</button>

<!-- Native Inverted Popover Tooltip -->
<div 
  id="tip-save" 
  popover="hint" 
  class="tooltip"
  style="position-anchor: --anchor-save;"
>
  Save document (⌘S)
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

### 24. Tabs System (Tab Atom, Tab List Molecule & Tabbed Content Organism)

The tabs system in Design For Humans is decomposed across three distinct architectural tiers:
1. **Atom (`.tab`):** Individual interactive trigger (button or link).
   - **Flavours:** Regular Tab (default underline indicator) and Button Tab (`.tab--button`).
   - **Variations:** Default (outline / underline), Subtle (`.tab--subtle`, matching `.button--subtle` with translucent tinted surface and borderless treatment), Plain (`.tab--plain`, borderless and transparent), and Round (`.tab--round`).
   - Registers `anchor-name: --tab-selected` when selected.
2. **Molecule (`.tab-list`):** Collection container for tabs with `anchor-scope: --tab-selected` and a shared sliding indicator (`::before`). Can live **standalone** as a top-level site nav bar, sub-nav, or floating dock without any organism wrapper. Supports `.tabs-subtle` and `.tabs-plain` container variations.
3. **Organism (`.tabbed-content`):** Spatial layout coordinator between a `.tab-list` and content panels (`.tab-panel`).
*Legacy aliases pending removal (never use):* `.tabs` (use `.tabbed-content`) and `.tabs__panel` (use `.tab-panel`).

#### A. Standalone Navigation Tab List (Molecule + Atom)
```html
<!-- Standalone Navigation Bar (No organism wrapper needed) -->
<nav class="tab-list" aria-label="Repository sections">
  <a href="/repo/code" class="tab" aria-current="page"><span class="tab__text">Code</span></a>
  <a href="/repo/issues" class="tab"><span class="tab__text">Issues</span> <span class="badge badge--subtle"><span>14</span></span></a>
  <a href="/repo/pulls" class="tab"><span class="tab__text">Pull Requests</span></a>
</nav>

<!-- Semantic <ul> navigation tabs (display: contents preserves layout & anchor tracking) -->
<nav class="tab-list" aria-label="Site Navigation">
  <ul>
    <li><a href="/docs" class="tab" aria-current="page"><span class="tab__text">Docs</span></a></li>
    <li><a href="/components" class="tab"><span class="tab__text">Components</span></a></li>
    <li><a href="/showcase" class="tab"><span class="tab__text">Showcase</span></a></li>
  </ul>
</nav>
```

#### B. Tabbed Content with Panels (Organism + Molecule + Atom)
```html
<!-- Interactive WAI-ARIA Tabbed Content -->
<div class="tabbed-content">
  <div class="tab-list" role="tablist" aria-label="Account Settings">
    <button type="button" role="tab" id="tab-1" class="tab" aria-selected="true" aria-controls="panel-1" tabindex="0">
      <span class="tab__text">Overview</span>
    </button>
    <button type="button" role="tab" id="tab-2" class="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">
      <span class="tab__text">Security</span>
      <span class="badge badge--round badge--accent"><span>2</span></span>
    </button>
  </div>

  <div id="panel-1" role="tabpanel" class="tab-panel" aria-labelledby="tab-1" tabindex="0">
    <p>Overview panel content.</p>
  </div>
  <div id="panel-2" role="tabpanel" class="tab-panel" aria-labelledby="tab-2" tabindex="0" hidden>
    <p>Security panel content.</p>
  </div>
</div>
```

#### C. Button / Segmented Tabs: Default, Subtle & Round
```html
<!-- Default Outline Segmented Tabs -->
<nav class="tab-list tabs-button" aria-label="View Modes">
  <a href="/grid" class="tab" aria-current="page"><span class="tab__text">Grid</span></a>
  <a href="/list" class="tab"><span class="tab__text">List</span></a>
</nav>

<!-- Subtle Segmented Pill Tabs (.tab-list.tabs-button.tabs-round.tabs-subtle) -->
<!-- Gives tabs the same subtle translucent appearance as .button--subtle -->
<div class="tab-list tabs-button tabs-round tabs-subtle" role="tablist" aria-label="Frequency Switcher">
  <button type="button" class="tab tab--button tab--subtle" role="tab" aria-selected="true" tabindex="0">
    <span class="tab__text">Monthly</span>
  </button>
  <button type="button" class="tab tab--button tab--subtle" role="tab" aria-selected="false" tabindex="-1">
    <span class="tab__text">Annual</span>
    <span class="badge badge--sm badge--accent"><span>Save 20%</span></span>
  </button>
</div>
```

#### D. Vertical Tabbed Content (.tabs-vertical)
```html
<div class="tabbed-content tabs-vertical">
  <div class="tab-list tabs-vertical" role="tablist" aria-label="Settings Categories">
    <button type="button" role="tab" id="vtab-general" class="tab" aria-selected="true" aria-controls="vpanel-general">
      <span class="tab__text">General</span>
    </button>
    <button type="button" role="tab" id="vtab-security" class="tab" aria-selected="false" aria-controls="vpanel-security">
      <span class="tab__text">Security</span>
    </button>
  </div>

  <div id="vpanel-general" role="tabpanel" class="tab-panel" aria-labelledby="vtab-general" tabindex="0">
    <p>General configuration settings.</p>
  </div>
  <div id="vpanel-security" role="tabpanel" class="tab-panel" aria-labelledby="vtab-security" tabindex="0" hidden>
    <p>Passkeys and security controls.</p>
  </div>
</div>
```

#### E. Plain Horizontal Navigation (.tab-list.tabs-plain, .tab--plain)
```html
<!-- Clean Navigation Bar without Bottom Border Shadow or Underline Indicator -->
<nav class="tab-list tabs-plain" aria-label="Main Navigation">
  <a href="/articles" class="tab tab--plain" aria-current="page"><span class="tab__text">Articles</span></a>
  <a href="/components" class="tab tab--plain"><span class="tab__text">Components</span></a>
  <a href="/tokens" class="tab tab--plain"><span class="tab__text">Tokens</span></a>
  <a href="/about" class="tab tab--plain"><span class="tab__text">About</span></a>
</nav>
```

#### F. Responsive Icon Tabs (.tab--icon, .hide-labels)
```html
<!-- Icon-Only Tabs (MANDATORY: use .visually-hidden or .tab__text inside tab for screen readers) -->
<div class="tab-list tabs-button tabs-round" role="tablist" aria-label="Editor View Modes">
  <button type="button" role="tab" class="tab tab--icon" aria-selected="true" tabindex="0">
    <span class="visually-hidden">Code View</span>
    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
  </button>
  <button type="button" role="tab" class="tab tab--icon" aria-selected="false" tabindex="-1">
    <span class="visually-hidden">Design Canvas</span>
    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
  </button>
</div>

<!-- Container-Adaptive Responsive Tab List (Collapses text labels automatically in narrow containers) -->
<nav class="tab-list hide-labels" aria-label="Responsive Navigation">
  <a href="#feed" class="tab" aria-current="page">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Home"/></svg>
    <span class="tab__text">Feed</span>
  </a>
  <a href="#explore" class="tab">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
    <span class="tab__text">Explore</span>
  </a>
</nav>
```

#### G. Floating Glassmorphic Dock (.tab-list.tabs-floating, .tabs-docked)
```html
<!-- Centered Floating Pill Navigation with Backdrop Blur and Sliding Pill Indicator -->
<nav class="tab-list tabs-floating" aria-label="Floating Navigation">
  <a href="#overview" class="tab" aria-current="page"><span class="tab__text">Overview</span></a>
  <a href="#analytics" class="tab"><span class="tab__text">Analytics</span></a>
  <a href="#reports" class="tab"><span class="tab__text">Reports</span></a>
</nav>

<!-- Pinned Bottom Dock (.tabs-docked) -->
<div class="tab-list tabs-floating tabs-button tabs-round tabs-docked" role="tablist" aria-label="Quick Actions">
  <button type="button" role="tab" class="tab tab--icon" aria-selected="true" tabindex="0">
    <span class="visually-hidden">Search</span>
    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
  </button>
  <button type="button" role="tab" class="tab tab--icon" aria-selected="false" tabindex="-1">
    <span class="visually-hidden">Code</span>
    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
  </button>
  <button type="button" role="tab" class="tab tab--icon" aria-selected="false" tabindex="-1">
    <span class="visually-hidden">Notifications</span>
    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
  </button>
</div>

#### H. Tab-List Wrapping & Horizontal Scrolling (.tabs-scrollable, .tabs-wrap)
By default, `.tab-list` wraps items naturally (`flex-wrap: wrap; overflow: visible`).
- `.tabs-scrollable`: Constrains tabs to a single row (`flex-wrap: nowrap; overflow-x: auto; max-inline-size: stretch; scrollbar-width: none;`). Perfect for mobile category strips and dense horizontal navigation bars.
- `.tabs-wrap`: Explicitly reinforces multi-row wrapping when nested inside scrollable parent containers.

```html
<!-- Scrollable Single-Row Tabs with Hidden Scrollbar -->
<nav class="tab-list tabs-scrollable tabs-button tabs-round tabs-sm" aria-label="Filter Tags">
  <button type="button" class="tab is-active" aria-current="page"><span>All Projects</span></button>
  <button type="button" class="tab"><span>Design Tokens</span></button>
  <button type="button" class="tab"><span>Accessibility</span></button>
  <button type="button" class="tab"><span>Web Standards</span></button>
  <button type="button" class="tab"><span>Performance</span></button>
</nav>

<!-- Explicit Multi-Row Wrapping Tabs -->
<nav class="tab-list tabs-wrap tabs-button tabs-subtle" aria-label="Topic Tags">
  <button type="button" class="tab"><span>Typography</span></button>
  <button type="button" class="tab"><span>Color Palette</span></button>
  <button type="button" class="tab"><span>Elevation</span></button>
</nav>
```

### 25. Progress & Meter Primitives

#### A. Progress Primitive (Task Completion Indicator)
```html
<!-- Determinate Progress in Field Wrapper with Label and Readout -->
<div class="field">
  <div class="field__header">
    <label for="upload-progress" class="field__label">Uploading asset...</label>
    <span class="field__result" id="upload-val">68%</span>
  </div>
  <progress 
    id="upload-progress" 
    class="progress" 
    value="68" 
    max="100" 
    aria-describedby="upload-val"
  >
    68%
  </progress>
</div>

<!-- Small / Compact Progress -->
<progress class="progress progress--sm" value="45" max="100">45%</progress>

<!-- Large Progress -->
<progress class="progress progress--lg" value="85" max="100">85%</progress>

<!-- Indeterminate Animated Progress (Background Task / Live Region) -->
<div class="field">
  <label for="sync-progress" class="field__label">Syncing data with cloud...</label>
  <progress id="sync-progress" class="progress" aria-busy="true">Syncing...</progress>
</div>

<!-- Semantic Status Variants -->
<progress class="progress progress--success" value="100" max="100">100%</progress>
<progress class="progress progress--warning" value="40" max="100">40%</progress>
<progress class="progress progress--danger" value="20" max="100">20%</progress>
```

#### B. Meter Primitive (Scalar Range & Gauge Measurement)
```html
<!-- Storage Quota Gauge (Native Optimum / Safe Range) -->
<div class="field">
  <div class="field__header">
    <label for="disk-meter" class="field__label">Server Disk Usage</label>
    <span class="field__result" id="disk-val">25 GB of 100 GB</span>
  </div>
  <meter 
    id="disk-meter" 
    class="meter" 
    value="25" 
    min="0" 
    max="100" 
    low="60" 
    high="85" 
    optimum="20"
    aria-describedby="disk-val"
  >
    25 GB
  </meter>
</div>

<!-- Sub-Optimum Warning Range (Automatic color calculation) -->
<meter class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72 GB</meter>

<!-- Critical Danger Range (Automatic color calculation) -->
<meter class="meter" value="94" min="0" max="100" low="60" high="85" optimum="20">94 GB</meter>

<!-- Password Strength Meter -->
<div class="field">
  <label for="pwd-field" class="field__label">Password</label>
  <input id="pwd-field" type="password" class="input" value="SuperSecure#Pass2026!" />
  <div style="inline-size: 100%; margin-block-start: var(--spacing-4);">
    <span class="field__hint" id="pwd-strength">Strength: Strong</span>
    <meter id="pwd-meter" class="meter meter--sm" value="4" min="0" max="4" low="2" high="3" optimum="4" aria-labelledby="pwd-strength">4 of 4</meter>
  </div>
</div>
```

### 26. Skeleton Primitive (Content Loading Placeholders)
```html
<!-- 1. Text & Heading Placeholders (Mandatory: aria-hidden="true" on decorative shapes) -->
<span class="skeleton skeleton--heading" aria-hidden="true"></span>
<span class="skeleton skeleton--text" aria-hidden="true"></span>
<span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>

<!-- 2. Shape Placeholders -->
<div class="skeleton skeleton--avatar" aria-hidden="true"></div>
<div class="skeleton skeleton--button" aria-hidden="true"></div>
<div class="skeleton skeleton--badge" aria-hidden="true"></div>
<div class="skeleton skeleton--media" aria-hidden="true"></div>

<!-- 3. Companion Modifier on Existing Primitives -->
<div class="avatar skeleton" aria-hidden="true"></div>
<button type="button" class="button skeleton" aria-hidden="true" disabled>
  <span>Submit</span>
</button>
<span class="badge skeleton" aria-hidden="true">
  <span>Status</span>
</span>

<!-- 4. Async Loading Container with aria-busy="true" (Zero-CLS Card Composite) -->
<article class="card card--bordered bg-card" aria-busy="true" aria-label="Loading card content">
  <div class="card__content">
    <div class="skeleton skeleton--media" aria-hidden="true"></div>
    <header class="card__header inline gap-sm align-items-center">
      <div class="skeleton skeleton--avatar" aria-hidden="true"></div>
      <div class="stack gap-xs flex-grow">
        <span class="skeleton skeleton--heading skeleton--w-75" style="margin: 0;" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--w-40" style="margin: 0;" aria-hidden="true"></span>
      </div>
    </header>
    <div class="card__body stack gap-xs">
      <span class="skeleton skeleton--text" aria-hidden="true"></span>
      <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
    </div>
    <footer class="card__footer split align-items-center">
      <div class="skeleton skeleton--badge" aria-hidden="true"></div>
      <div class="skeleton skeleton--button" style="inline-size: 6rem; min-block-size: 2.25rem;" aria-hidden="true"></div>
    </footer>
  </div>
</article>
```

### 27. Empty State Primitive (Zero-Data Views & Onboarding)
```html
<!-- 1. Standalone Empty State (Search / Filter Miss) -->
<section class="empty-state" aria-labelledby="empty-search-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
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
    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="empty-setup-title" class="empty-state__title heading">Create your first project</h3>
    <p class="empty-state__description text-muted">
      Organize design tokens, layout primitives, and composite recipes in a unified space.
    </p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button button--strong button--accent">
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
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
      <span class="badge badge--sm">Zero</span>
    </header>
    <div class="card__body">
      <div class="empty-state empty-state--flush empty-state--compact" aria-labelledby="card-empty-title">
        <div class="empty-state__visual" aria-hidden="true">
          <svg class="icon" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </div>
        <div class="empty-state__content">
          <h5 id="card-empty-title" class="empty-state__title small-heading">All caught up!</h5>
          <p class="empty-state__description text-muted micro-text">
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
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
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
    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="success-empty-title" class="empty-state__title">Sync complete</h3>
    <p class="empty-state__description">All 717 tokens are synchronized.</p>
  </div>
</section>

<section class="empty-state empty-state--warning" aria-labelledby="warn-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="warn-empty-title" class="empty-state__title">Subscription expiring</h3>
    <p class="empty-state__description">Renew plan to preserve permissions.</p>
  </div>
</section>

<section class="empty-state empty-state--error" aria-labelledby="err-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
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
      <svg class="icon combobox__icon-start" width="18" height="18" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
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
        <svg class="icon" width="16" height="16" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
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
        <svg class="icon combobox__check" width="16" height="16" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
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
        <span class="chip">
          <span>TypeScript</span>
          <button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button>
        </span>
        <span class="chip">
          <span>Design Tokens</span>
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
        <svg class="icon" width="16" height="16" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
      </button>
    </div>
  </div>
</div>

<!-- 3. Compact Combobox (.combobox--sm) -->
<div class="combobox combobox--sm">
  <div class="combobox__control">
    <input type="text" class="combobox__input" placeholder="Quick filter..." />
    <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
      <svg class="icon" width="14" height="14" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
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
        <span class="status" data-status="online" aria-hidden="true"></span>
        <h2 class="deck__channel">Deck A • On Air</h2>
      </div>
      <div class="deck__header-actions">
        <button type="button" class="button button--subtle button--icon button--sm" aria-label="Deck options">
          <svg class="icon"><use href="#Info"/></svg>
        </button>
      </div>
    </header>

    <!-- Deck Body -->
    <div class="deck__body">
      
      <!-- Track Presentation & Artwork -->
      <div class="deck__track">
        <div class="deck__art-frame" aria-hidden="true">
          <div class="deck__art">
            <svg class="icon"><use href="#Disc"/></svg>
          </div>
          <span class="badge badge--accent badge--sm badge--round deck__badge"><span>LIVE</span></span>
        </div>
        <div class="deck__identity">
          <div class="deck__tags">
            <span class="chip chip--sm"><span>Heavy Rotation</span></span>
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
          <svg class="icon"><use href="#ChevronStart"/></svg>
        </button>
        <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause playback">
          <svg class="icon"><use href="#Pause"/></svg>
        </button>
        <button type="button" class="button button--subtle button--icon deck__skip" aria-label="Skip to next track">
          <svg class="icon"><use href="#ChevronEnd"/></svg>
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
            <svg class="icon"><use href="#VolumeOn"/></svg>
          </button>
          <input type="range" class="range range--sm deck__fader" id="deck-vol" min="0" max="100" value="85" style="--value: 85%;" aria-label="Volume level" />
        </div>
      </div>

    </div>

    <!-- Stereo VU Peak Meters -->
    <div class="deck__meters" role="region" aria-label="Stereo Master Peak Meters">
      <div class="deck__meters-header">
        <span class="deck__meters-title">Stereo Peak (dBFs)</span>
        <span class="badge badge--success badge--sm"><span>-1.8 dB Headroom</span></span>
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
          <div class="deck__art"><svg class="icon"><use href="#Disc"/></svg></div>
        </div>
        <div class="deck__identity">
          <h3 class="deck__title">Celestial Horizon</h3>
          <p class="deck__artist">Aura & Tycho</p>
        </div>
      </div>
      <div class="deck__timeline-transport-group">
        <div class="deck__transport" role="toolbar" aria-label="Dock controls">
          <button type="button" class="button button--subtle button--icon button--sm deck__cue" aria-label="Cue"><svg class="icon"><use href="#ChevronStart"/></svg></button>
          <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause"><svg class="icon"><use href="#Pause"/></svg></button>
          <button type="button" class="button button--subtle button--icon button--sm deck__skip" aria-label="Skip"><svg class="icon"><use href="#ChevronEnd"/></svg></button>
        </div>
        <div class="deck__timeline">
          <input type="range" class="range range--sm deck__scrubber" min="0" max="232" value="134" style="--value: 58%;" aria-label="Seek" />
        </div>
      </div>
      <div class="deck__volume-meters-group">
        <div class="deck__volume-controls">
          <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Mute"><svg class="icon"><use href="#VolumeOn"/></svg></button>
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
  <svg class="telemetry__icon icon" aria-hidden="true"><use href="#User"/></svg>
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
      <svg class="telemetry__icon icon" aria-hidden="true"><use href="#User"/></svg>
      Listeners
    </dt>
    <dd class="telemetry__value">14,820</dd>
  </div>
  <div class="telemetry">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" aria-hidden="true"><use href="#Progress"/></svg>
      Peak Today
    </dt>
    <dd class="telemetry__value">28,450</dd>
  </div>
  <div class="telemetry" data-status="online">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" aria-hidden="true"><use href="#Circle"/></svg>
      Uptime
    </dt>
    <dd class="telemetry__value">99.98%</dd>
  </div>
</dl>

<!-- 4. Dashboard KPI Stat Card (.telemetry--card .telemetry--stacked) -->
<div class="telemetry telemetry--card telemetry--stacked">
  <svg class="telemetry__icon icon" aria-hidden="true"><use href="#Progress"/></svg>
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
          <svg class="icon"><use href="#Check"/></svg>
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
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon"><use href="#Check"/></svg></span>
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
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon"><use href="#Check"/></svg></span>
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
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon"><use href="#Check"/></svg></span>
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
Composes `.popover.popover--anchored` + `.menu.menu--translucent` + `.menu__item` + `.menu__separator` + `<kbd class="kbd">`:
```html
<button 
  type="button" 
  class="button" 
  popovertarget="menu-popover" 
  style="anchor-name: --menu-anchor;"
  aria-haspopup="menu"
>
  <span>Options</span>
  <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#ChevronDown"/></svg>
</button>

<div id="menu-popover" popover class="popover popover--anchored" style="position-anchor: --menu-anchor; min-inline-size: 16rem;">
  <menu class="menu menu--translucent" aria-label="Document options">
    <header class="menu__heading">Document Options</header>
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#Duplicate"/></svg>
        <span>Duplicate</span>
        <kbd class="kbd">⌘D</kbd>
      </button>
    </li>
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#Download"/></svg>
        <span>Export JSON</span>
        <kbd class="kbd">⇧⌘E</kbd>
      </button>
    </li>
    <hr class="menu__separator">
    <li role="none">
      <button type="button" class="menu__item menu__item--destructive" role="menuitem">
        <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#Delete"/></svg>
        <span>Delete Item</span>
        <kbd class="kbd">⌫</kbd>
      </button>
    </li>
  </menu>
</div>
```

#### B. User Profile Card & Status Flyout Recipe
Composes `.avatar` with `data-status`, `.badge`, `.status`, and `.button-group--space-between`:
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
          <span class="badge badge--subtle"><span>Design Lead</span></span>
          <span class="status" data-status="online">Online</span>
        </div>
        <p class="micro-text">
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
          <span class="switch__label micro-text">High Contrast Mode</span>
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
Composes `.skip-link` + `.header.header--sticky.header--translucent` + `.wrapper.flex.justify-content-between` + `.button--subtle` (`aria-current="page"`) + `.badge--top-right-corner` + `button.button--avatar` (`[data-status]`) + `.menu.menu--translucent` inside anchored `.popover` + Command Palette invoker:
```html
<!-- In-Flow Landmark Skip Link -->
<a href="#main" class="skip-link"><span>Skip to main content</span></a>

<!-- Global Header Landmark -->
<header class="header header--sticky header--translucent padding-block-sm">
  <div class="wrapper flex align-items-center justify-content-between flex-wrap gap-sm">
    <!-- Brand -->
    <a href="/" class="link inline gap-sm font-weight-bold font-size-lg underline-none">
      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#BrandDesignForHumans"/></svg>
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
        <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
        <span class="button__text button__text--placeholder">Search docs... <kbd class="kbd">⌘K</kbd></span>
      </button>

      <!-- Notifications with Corner Badge -->
      <button type="button" class="button button--icon" popovertarget="header-notifs" style="anchor-name: --header-notif-anchor;" aria-haspopup="dialog" aria-label="Notifications (3 unread)">
        <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#BellFilled"/></svg>
        <span class="badge badge--danger badge--sm badge--round badge--top-right-corner"><span>3</span></span>
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
              <span class="micro-text text-color-muted">alex.bennett@dfh.design</span>
            </div>
          </header>
          <hr class="menu__separator">
          <li role="none"><button type="button" class="menu__item" role="menuitem"><svg class="icon" width="18" height="18"><use href="#User"/></svg><span>Profile</span><kbd class="kbd">⇧⌘P</kbd></button></li>
          <li role="none"><button type="button" class="menu__item" role="menuitem"><svg class="icon" width="18" height="18"><use href="#Settings"/></svg><span>Preferences</span><kbd class="kbd">⌘,</kbd></button></li>
          <hr class="menu__separator">
          <li role="none"><button type="button" class="menu__item menu__item--destructive" role="menuitem"><svg class="icon" width="18" height="18"><use href="#Close"/></svg><span>Sign Out</span></button></li>
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
        <svg class="icon text-color-muted" width="22" height="22" aria-hidden="true"><use href="#Search"/></svg>
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
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Close"/></svg>
        </button>
      </header>

      <!-- Results Body: Stacked Ruled Button Group -->
      <div class="card__body card__body--flush card__body--scrollable max-height-sm">
        <div id="cmd-listbox" role="listbox" class="button-group button-group--stacked button-group--ruled buttons-subtle" aria-label="Suggestions">
          <h3 class="button-group__content micro-heading text-color-muted">UI Components</h3>
          
          <button type="button" class="button button--subtle is-active" role="option" id="cmd-opt-1" aria-selected="true">
            <svg class="icon text-color-muted" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
            <span class="button__text stack gap-none text-align-start flex-grow">
              <span class="font-weight-medium">Button Primitive</span>
              <span class="micro-text text-color-muted">Accessible interactive buttons, states & toggles</span>
            </span>
            <span class="badge badge--sm"><span>Component</span></span>
            <kbd class="kbd">↵</kbd>
          </button>

          <button type="button" class="button button--subtle" role="option" id="cmd-opt-2" aria-selected="false">
            <svg class="icon text-color-muted" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
            <span class="button__text stack gap-none text-align-start flex-grow">
              <span class="font-weight-medium">Combobox Primitive</span>
              <span class="micro-text text-color-muted">Searchable single and multi-select floating listboxes</span>
            </span>
            <span class="badge badge--sm"><span>Component</span></span>
          </button>
        </div>

        <!-- Zero-Results Search Miss State -->
        <div class="empty-state empty-state--compact empty-state--flush padding-block-lg" hidden aria-labelledby="cmd-empty-title">
          <div class="empty-state__visual" aria-hidden="true"><svg class="icon" width="28" height="28"><use href="#Search"/></svg></div>
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
                        <span class="chip chip--sm"><span>TypeScript</span><button type="button" class="chip__remove">×</button></span>
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
            <span class="chip"><span>TypeScript</span><button type="button" class="chip__remove">×</button></span>
          </div>
        </div>
      </div>

      <ul class="grid grid--sm">
        <li>
          <div class="card">
            <article class="card__content">
              <header class="card__header inline justify-content-between align-items-center">
                <h3 class="card__title"><a href="#" class="card__link">Button Primitive</a></h3>
                <span class="badge badge--success"><span>WCAG AAA</span></span>
              </header>
              <div class="card__body">
                <p class="text">Accessible button component supporting primary, subtle, and icon variants.</p>
              </div>
              <footer class="card__footer inline justify-content-between align-items-center">
                <span class="chip">Forms</span>
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
- Enables parent containers to orchestrate children cleanly: `.navigation { --button-variation: subtle; --button-corners: round; }`.

---

## Component Authoring Workflow
1. **Check Tokens:** Verify required tokens exist in `tokens/3-component.json`. If missing, add them and run `npm run build:tokens`.
2. **Author CSS:** Create `packages/css/src/{atoms,molecules,organisms}/<component>.css` based on the component's Atomic Design tier. Use `:where()` for low specificity, local private variables manifest (`--_<component>-*`) with state contract (`--_<component>-hover-*`, `--_<component>-active-*`), container style queries (`@container style(...)`), native CSS nesting with explicit `&` for states (`&:hover`, `&:active`, `&:focus-visible`), logical properties (`inline-size`, `block-size`, `padding-inline`, `padding-block`), and standardized section comments. Consult `.agents/skills/tokens/SKILL.md` (Section 4) and `.agents/skills/css-commenting/SKILL.md` for full guidelines.
3. **Register in Entrypoint:** Add `@import './{atoms,molecules,organisms}/<component>.css';` into the appropriate Atomic tier in `packages/css/src/index.css`.
4. **Author Storybook Stories:** Create `packages/storybook/stories/{atoms,molecules,organisms,layout,utilities,recipes}/<component>.stories.ts` with matching `title: '{Atoms,Molecules,Organisms,Layout,Utilities,Recipes}/...'`, covering all variants, sizes, states (`hover`, `active`, `disabled`, `aria-disabled`), and verify with `npm run build-storybook --workspace=@design-for-humans/storybook`.