# Component Library Principles

Oct 26, 2026 · @Paul Woods · Updated Nov 7, 2026

## Purpose

These principles decide what belongs in the library, how it is built, and when a component is ready for version 1. The library is pre-v1, so rewrites are expected and welcome; a principle outranks existing code.

The library serves two audiences from one source of truth. Developers consume the CSS; designers consume the same tokens as Figma Variables and Tokens Studio sets, made from the same themes by the Token Designer's Figma export. A change to token tiers, axis names or variant values is not done until it has clean parity in both.

Each section ends in rules that can be tested. **Must** means a component fails review without it, **should** means a documented exception is needed to skip it, and **may** is optional. Section 11 turns the rules into the checklist for the refinement pass.

## 1. Foundations: accessible, responsive, content first

Every component works for everyone, at any size, before it looks good. Accessibility is a build requirement, not a polish step.

**Accessibility first**

- Every component must meet WCAG 2.2 AA. AA is the floor, and AAA must always be achievable using the library itself, through documented options or tokens and without custom code (for example the 48px touch target default and an enhanced-contrast mode).
- Native HTML elements come first (`details`, `dialog`, `button`, popover). ARIA is added only where no native element does the job.
- Each component must be fully operable by keyboard, with a visible focus indicator and no keyboard trap.
- Each component must survive forced-colors mode, `prefers-reduced-motion`, `prefers-contrast`, 200% text zoom, 400% reflow and user text-spacing overrides. Forced colours and target sizes are checked by script on every component and recipe story (`npm run check:targets`); a component adds a `forced-colors` block only where the check finds something lost. Visible focus is checked by tabbing through every story (`npm run check:focus`), and reflow by loading every story at 320px (`npm run check:layout`).
- A current or selected item differs from its neighbours by more than a tint: a rail, a weight, an icon, an underline or a fill, at 3:1 against what's around it, that still shows in forced colours.
- Borderless or subtle designs must still give controls and focus a 3:1 non-text boundary (WCAG 1.4.11).

**Responsiveness is core**

- Every component must work from the smallest practical container up to the largest, with no horizontal scroll except in components that scroll by design (tables, carousels).
- Components respond to their container (container queries), not the viewport. Viewport media queries belong only to the parts that span the page (the app shell, the Header and the Sidebar), to placements fixed to the viewport (a floating bar may query the viewport's height, to stay out of the way on a short or zoomed screen), to the viewport-prefixed responsive helpers (`max-md:`, `lg:` …), and to user-preference features such as `pointer` and `prefers-*`.
- Layout is fluid by default (auto-fit grids, intrinsic sizing, `clamp()`); fixed breakpoints are the exception and must be justified.
- Where a size is named, it is Tailwind's: viewport `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem; container `@xs` 20rem through `@7xl` 80rem. One scale serves the responsive helpers, the grid's container column counts, a stack's `@{size}:inline` and card's responsive prominence.

**Content first**

- The content is the product. A component must not need a wrapper, border or background to make sense.
- Chrome (toolbars, badges, secondary actions) is added only when the user needs it at that moment, and is the first thing to collapse on small containers.
- No decorative elements that carry no information or affordance.

## 2. Restraint: few variants, each one intentional

A variant exists only if it serves a different need, not a different taste. Variation is expressed on a small set of shared axes, never as per-component one-offs.

| Axis | Applies to | Default | Alternates | Driven by |
| --- | --- | --- | --- | --- |
| Pointer | Everything | Touch (48px targets) | Fine (32px targets) | Opt-in only: a root token set by the product, never switched on automatically by the library |
| Size | Atoms and interactive controls only | Default | `--sm`, `--lg` | Explicit modifier |
| Density | Containers and layout | Default | `--compact` | Modifier on the container, which sets `--ui-sizing: compact` for its children |
| Presentation | Everything | Normal (text + icon) | Minimal (icon only) | Container width or an explicit modifier |
| Prominence | Everything with a surface | Default | `--strong`, `--subtle`, `--plain` | Explicit modifier |
| Intent | Everything that can signal status or consequence | Neutral | `--accent`, `--danger`, `--warning`, `--success`, `--info` | Explicit modifier, mapped 1:1 to Tier-2 semantic roles |

- A new variant must name the user need it serves and which existing axis it belongs to, or which option family below. If it fits none, the component is probably two components.

**Options outside the axes**

Some choices aren't about attention, consequence or size, so they aren't axes. They are recognised families, each with the same names everywhere it appears. Each option still sets one thing and names the need it serves.

| Family | Options | What it decides |
| --- | --- | --- |
| Corners | `--round` | Pill or circle ends instead of the radius token |
| Placement | `--floating`, `--docked`, `--inline`, `--sticky`, `--fixed-*`; for content inside a frame, `--inline-center`, `--inline-end`, `--block-start`, `--block-end` | Where a component sits relative to the page or its scroller, or where its content sits inside it |
| Arrangement | `--joined`, `--vertical`, `--fill`, `--ruled`, `--end` | How the parts of a container sit together |
| Inset | `--flush` | Whether the padding at a container's edges stays, for content that brings its own or lines up with the content around it |
| Width | `--stretch`, `--rail` | How wide a container is: full width past the page's measure, or narrowed to icons |
| Material | `--translucent` | What the surface is made of, with any prominence that has a fill |
| Overflow | `--scrollable` | Whether content that doesn't fit wraps or scrolls |
- Combinations are not multiplied by default. A component documents only the combinations it supports and tests.
- Defaults are the most accessible and most forgiving option. Opting into fine, compact, small or minimal is a deliberate step.
- Every variant must be reachable by token or one modifier, not by overriding component CSS.

**Axes are orthogonal**

- Each modifier sets exactly one axis. Compound modifiers that fuse two axes (`.button--subtle-primary`, `.button--plain-destructive`) are not allowed; write `.button--subtle.button--accent` instead.
- Axis values use the canonical names in the table across every component. `--primary` and `--destructive` are pre-v1 names for `--accent` and `--danger` and are removed with the other aliases (section 7).
- Where intent is set by script, it may also be exposed as `[data-intent="danger"]`, mapping to the same tokens as the modifier.

**Region flags set one axis for everything in a region**

- A component's own flag (`--button-prominence`, `--chip-size`) reaches that component in a region. Two shared flags reach several at once: `--controls-prominence`, `--controls-size` and `--controls-corners` reach every control (Buttons and form controls), and `--elements-prominence` reaches every element with a prominence axis (controls, Status, Chip, Kbd, Icon Box, Tab List, Telemetry), never a container. A modifier on the component beats any flag; set either a component's own flag or a shared one in a region, not both. The `.controls-*` and `.elements-*` utilities set them.

**Size and density are different things**

- Size scales a control's own height, type and padding (button, input, select, badge, avatar). Only atoms and interactive controls take a size modifier.
- Density scales the space inside and between components in a container (card, table, form, stepper). Only containers take `--compact`.
- They must not share modifier names. There is one density modifier, `--compact`; `--dense` is not used.
- `--compact` sets `--ui-sizing: compact` on the container, so nested layout primitives tighten their gaps, typography atoms step down, and nested controls step down to their `--sm` size, all through `@container style(--ui-sizing: compact)`. This is the one density flag; per-component density flags (`--ui-density`, `--control-density`, `--menu-density` and similar) are migrated to it.
- To step down type alone without changing geometry or controls, set `--font-sizing: compact` on the region.
- A smaller visual size never shrinks the hit area. Unless the product has opted into fine-pointer targets, a `--sm` control, or one stepped down by a compact container, keeps a 48px target through a transparent `::after` or a padding buffer, unless neighbours sit closer than that (see the next rule). On any pointer it never falls below 24px (WCAG 2.5.8). Native fields are one exception (see the decisions log): an input can't take a buffer, so `--sm` text, select and colour controls are 32px, visual and target alike. A range is its own target and keeps the full size. Choice rows in a compact container are the other: the row is the target, so it is 32px to sit with compact fields.
- A bar is never shorter than its targets. A container whose job is to hold a row of controls (a Header bar, a tab list, batch actions, pagination) is at least as tall as the minimum target for the pointer mode, so the controls' hit areas stay inside it. Compact tightens its padding and type; only fine-pointer targets make it shorter.
- A hit area never covers another control. A buffer reaches at most halfway across the gap to its neighbour, so each control owns its half and a tap on what looks like one control never activates the next; joined controls (no gap) take no buffer between them. In a tight group a small control's target is then its own size plus the gap, under 48px on touch: that is accepted (a product that wants full targets there leaves the group at its default size, or scopes compact to fine pointers with `fine:ui-compact`), and it never falls below 24px. A container that sets controls side by side (a Button Group, Menu, Navigation Tree, Tab List, Batch Actions, Cluster, Inline) gives its gap as `--target-gap-inline` or `--target-gap-block`, along the line its items sit on, and frees the outer side of its first and last items (`--target-gap-inline-start` and the other sides); it resets those sides on itself, and a Card, Popover or Dialog starts afresh.
- A container never clips its controls' hit areas. One that hides its overflow (a code block, a banner, a dock) leaves room for the buffers of the controls at its edges, by padding or by placing them inside.
- The visible control is the target. Where the library draws a control around a native field (a combobox, a search field, a switch), the field fills it, so a tap anywhere on what looks like the control reaches the field.
- A row is not a target when a stray tap would change something at once. A Switch's row and hint don't toggle it; only the control and its label do.
- A checkbox or radio with no visible label (selecting a row) can't take a buffer, so it takes its target from a `<label>` around it that fills the table cell or card corner. Its name stays in `aria-label`.
- Text links stacked in a list are at least 24px apart (WCAG 2.5.8). Where a list of links needs 48px targets, its links are block links.

**Pointer is opt-in**

- The library defaults to 48px targets on every device, which meets WCAG 2.5.5 (AAA) everywhere.
- A product that knows its users are on mouse or trackpad may opt into fine-pointer targets (32px) with a single root token: `.fine:targets-sm` on `<html>` sets it where the primary pointer is fine. The library never does so automatically.
- Fine-pointer mode changes the minimum target only. It never shrinks visual sizes on its own.
- Pointer is a mode in Figma too (Targets: Touch, Fine), so a designer can see what a fine-pointer layout does to the bars and controls that read the minimum target.
- To shrink visual sizes only for mouse and trackpad users, a product puts `fine:ui-compact` on a region. It applies compact density inside `@media (pointer: fine)`; touch screens keep the default size. Like the target token, it is the product's choice, never a library default.

**Intent**

- Intent values map 1:1 to Tier-2 semantic roles (`surface.danger`, `foreground.success`, `border.warning`), so the same axis exists as a mode in Figma Variables.
- Intent is never carried by colour alone (WCAG 1.4.1). Every non-neutral intent must be paired with an icon, a semantic role (`role="alert"`, `role="status"`) or descriptive text.
- Badges and other passive indicators use the same intent names as actions; there is no separate status vocabulary.

## 3. Architecture: atoms, structure and contracts

Complex components are assembled from simpler ones, and every layer has one job.

1. **Layout primitives** (stack, inline, cluster, grid, split, wrapper, and the app shell: app, workspace, main) own space and arrangement. They hold no content styling, and their settings (`--gap`, `--align-items` and the like) stay on the element they are set on.
2. **Atoms** are indivisible and meaningful alone (button, input, link, badge, avatar).
3. **Molecules** combine atoms for one purpose (card, poster, banner, banner dock, toast, popover, tooltip, menu, button group, batch actions, breadcrumb, navigation tree, pagination, stepper, tab list, field, fieldset, choices, range lockup, avatar group, lockup, telemetry, prose, code block, accordion, combobox, empty state).
4. **Organisms** combine molecules and primitives into a complete region (table, dialog, header, footer, sidebar, form).

Structural components (layout, bands, headers) and content components (prose, media, data) are kept separate and combined, so a card is a structure that can hold any content.

**One visual, many roles**

- When two components share most of their structure and styling, the library keeps one visual component and expresses the difference as a role or a container.
- `banner` is the visual molecule for in-flow and docked announcements. An alert is a banner inserted into a region with `role="alert"` (or `role="status"` for non-critical notices); there is no `.alert` class. `.banner-dock` pins a banner to the page edge and `.toast-stack` floats banners in a corner. Both are placement only: they set banner flags and never style the banner, and the banner never mentions them.

**Token tiers**

- Tier 1 (global) tokens hold raw values (colour ramps, the spacing scale). Components never use them directly (`padding: var(--spacing-16)`). The one exception is a Tier 1 scale step as the default of a Tier 3 hook; raw `--color-*` ramps are never allowed.
- Tier 2 (semantic) tokens hold meaning (surface, foreground, border, accent, danger). Components reference only these.
- Semantic tokens are added when a component needs one, not in advance. A default uses a Tier 2 token wherever one means that step (`--spacing-sm`, not `--spacing-8`). A step with no role (`--spacing-12`) stays a step: a name for every padding value would say nothing.
- Tier 3 (component) tokens are optional and exist only to expose a documented customisation point. Each is a hook with its default in the component CSS: `var(--button-padding-inline, var(--spacing-md))`. Choosing a step is the component's decision to make. Tier 3 isn't compiled into `variables.css`, so a default also follows the colours and modes around it. `tokens/3-component.json` records the same defaults for Figma, and `npm run check:tokens` fails if the two disagree. A product sets a hook only to differ from the default.
- Every tier must export cleanly to Tokens Studio and Figma Variables; a token that cannot be represented in Figma needs a documented reason.

**Component contract**

Every component must document:

- Its axes and supported variants, and its default.
- Its states (hover, focus, active, disabled, loading, error) and what each looks like.
- Its semantic structure, ARIA pattern and keyboard map.
- Its behaviour at the smallest and largest container sizes.
- Its dependencies, so a molecule can be traced to its atoms.

Naming follows one convention across the library (block, element, modifier), and a modifier describes an axis value, not a visual (`--compact`, not `--tight-padding-2`).

**Utility names**

- A utility has at most two names: a verbose one and a shorthand.
- The verbose name is the CSS property followed by the value, on the logical property where there is one: `.font-weight-bold`, `.text-align-center`, `.text-color-muted`, `.white-space-nowrap`, `.padding-inline-sm`.
- The shorthand is Tailwind's name for the same declaration, with the same meaning: `.font-bold`, `.text-center`, `.text-muted`. Where Tailwind has no name, or its name means something else, there is no shorthand.
- **One exception, spacing:** it keeps Tailwind's prefixes (`p`, `px`, `pt`, `ps`, `m`, `gap-x` …) with the library's step names (`.p-sm`, `.mt-lg`), because Tailwind's numbers map to no step here.
- Sides are logical: `t`/`b` are block start and end, `s`/`e` inline start and end. No left or right names.
- No bare single words that could clash with a component (`.bold`, `.mono`, `.pre`, `.title`, `.inline`). The bare words allowed are Tailwind's for the same declaration (`.flex`, `.hidden`, `.relative`, `.truncate` …), and the valueless defaults `.border`, `.rounded`, `.shadow`.
- Utilities read Tier 2 tokens only. They set one property each and never do a component's job: no type sizes (text atoms), no arrangement (layout primitives), no component widths (tokens).
- Examples in AGENTS, stories and docs use the shorthand. `npm run check:utilities` enforces the names.

**Scope for v1**

The core library holds components that are common across web applications. Domain-specific showcases belong in recipes.

| Component | v1 status | Action |
| --- | --- | --- |
| `telemetry` | In core | A description list of labelled values. Type comes from text atoms, trends and states from the status atom (done in the identity pass). |
| `batch-actions` | In core | A molecule: a placement and frame around a summary and a button group, for tables and card grids. |
| `deck` | Out of core | Done: the Cadence recipe's own CSS in `packages/storybook/stories/recipes/cadence/`. Its tier 3 tokens are gone; it is a stress test, not a library component. |

A new component enters the core only if it serves a need that recurs across unrelated products; otherwise it is a recipe.

## 4. Typography, spacing and alignment over boxes

Structure comes first from type, space and alignment, and only then from borders and backgrounds. A box is a tool for a specific job, not a default.

- Type uses one modular scale and one spacing scale, both defined as tokens. Components pick steps from the scale and never invent values.
- Line length for reading text stays within roughly 45 to 75 characters, and line height is set per type step.
- Space shows grouping: related items sit closer than unrelated ones. Consistent gaps come from layout primitives, not margins on children.
- Alignment is deliberate. Items share edges and baselines, and a component documents its alignment axis.
- Containers (borders, fills, shadows) are used to separate interactive regions, show elevation, or hold a distinct object such as a card. They must not be added only to fill space.
- Where a boundary is needed for accessibility and a box would clutter, use a rule, a tint or an underline instead, and keep contrast at 3:1 or better.
- Typography respects user settings: sizes in relative units, no fixed heights on text, and layouts that tolerate larger text.
- Text atoms are fixed by default: each takes one step of the scale at every width. Fluid (grows with the viewport), container (`cq`, grows with the container) and compact sizing apply only where a container sets `--font-sizing` or `--ui-sizing: compact`, through the appearance-mode classes (`.font-sizing-fluid`, `.font-sizing-cq`, `.font-sizing-compact`, `.ui-compact`) or an organism that sets the mode itself.

**Fonts**

- The library must not load fonts. No remote `@import` (such as Google Fonts) appears in library CSS; it blocks rendering, makes third-party requests consumers have not agreed to, and fails offline.
- Font tokens in `1-global.json` default to system font stacks, so the library is complete without any web font.
- A theme's fonts (`tokens/themes/<name>.json`) reach a page through its stylesheet, never through `index.css`: `packages/css/src/themes/<name>.css` for a theme other than the default, or `packages/css/src/fonts.css` for the default. Each holds the `@font-face` rules for stored fonts and a `:root` block that puts each role's font first. A product that wants a theme's fonts links them and that stylesheet; without them it gets the system stacks. The default theme (starter) uses system fonts.
- Storybook (`.storybook/preview-head.html`) and the documentation site wear the site theme (DFH, named in `tokens/themes.json`) and load its fonts in the page head, between `<!-- theme fonts -->` markers that `npm run build:themes` and the designer's Publish rewrite. Figma takes the theme's fonts for the family roles.

## 5. Colour: OKLCH, semantic roles and surfaces

Colour is created and manipulated in OKLCH and consumed only through semantic roles, so any theme change is a token change.

- Ramps are created in OKLCH tooling with consistent lightness steps across hues, and chroma capped per hue so colours stay inside the sRGB gamut.
- Ramps are stored as hex in Tier 1 tokens, because Figma Variables do not yet support OKLCH. Hex is the storage and exchange format, not the design space: a ramp is changed by regenerating it from OKLCH, never by editing hex values by hand.
- Colours derived in CSS (hover, active, disabled, tints) are manipulated in OKLCH, for example `color-mix(in oklch, …)` between two colours or `oklch(from var(--role) …)`, so lightness changes stay perceptually even.
- Translucency (a colour mixed with `transparent`) is `color-mix(in srgb, var(--role), transparent N%)`: only the alpha should change, and mixing with `transparent` in OKLCH can shift the colour in some browsers. When `alpha()` is Baseline Widely Available, translucency moves to it (`alpha(from var(--role) / …)`), which keeps the colour's own space.
- OKLCH lightness is perceptual, not a contrast guarantee. Every text and UI pairing must be verified against WCAG contrast (and checked with APCA as a second opinion) in the build, not by eye.
- Components use semantic roles only: surface, text, muted text, border, and the intent roles (accent, info, success, warning, danger). Raw colour values never appear in a component.
- Every semantic role must define light and dark values. `light-dark()` and relative colour syntax keep the definitions short.
- Inverted is a surface context, not a third theme. An inverted region (`.color-palette-inverted`) remaps the semantic roles to their inverse in either mode, so a component placed on it stays legible with no changes.
- Colour never carries meaning alone. Status needs an icon, label or pattern as well (WCAG 1.4.1).
- State colours (hover, active, disabled) are derived from the base role with `color-mix()` or relative syntax in OKLCH, not hand-picked per component.

**Fallbacks**

- A `var()` fallback must never be a hex, `rgb()` or other literal colour. `var(--button-bg, #1a1a1a)` fails review.
- Fallbacks chain to a semantic token and end at a system value: `var(--button-bg, var(--surface-neutral, Canvas))`.
- Terminal values are `currentColor`, `transparent`, `inherit`, system colours (`Canvas`, `CanvasText`, `Highlight`) and, for shadows, `none`. If tokens fail to load, the component degrades to a legible, unstyled state.

## 6. Icons: selective, never the only signal

An icon is used when it speeds recognition or saves space. It is never decoration.

- Use an icon only for a widely understood action, a status, or a repeated pattern. If the label is enough, leave the icon out.
- Icon-only is the minimal presentation. It must keep an accessible name and a visible, non-hover way to learn what it does, since tooltips do not work on touch.
- Icon-only targets must meet the touch target rule for the active pointer mode (48px by default, 32px only where the product has opted into fine pointer), even if the glyph is smaller.
- Icons use one family, one stroke weight and one size scale tied to the type scale (`em`-based), and take their colour from the text role.
- Directional icons mirror in right-to-left layouts; non-directional ones do not.
- Decorative icons are hidden from assistive technology; meaningful ones are labelled.

## 7. Modern CSS and future-proofing

The library should get smaller over time. Every release adds capability and removes legacy.

- **Baseline policy.** Anything crucial to a component's operation must use Baseline widely available features. Baseline newly available features may be used for non-essential features and decoration, and for crucial functionality only with a working fallback, always behind `@supports` or with a safe fallback.
- **Legacy is tagged.** Every fallback carries a comment naming what it supports and the condition for removing it (for example `/* legacy: remove when X is widely available */`), so slimming down is a search, not an investigation.
- **No aliases before v1.** Each component, element and modifier has one name. Redundant aliases (`table--zebra` and `table--striped`, `card__head` and `card__header`, `nav-tree` and `navigation-tree`) are removed before v1, keeping the most semantic BEM name. After v1, a rename keeps the old name only as a tagged legacy alias with a removal condition.
- **Cascade layers.** `index.css` declares a fixed layer order, and every stylesheet sits in its layer:

  ```css
  @layer reset, tokens, atoms, molecules, organisms, layout, site, utilities, overrides;
  ```

  Layers formalise the cascade that import order provides today. Components stay wrapped in `:where()` so specificity inside a layer remains zero, and utilities and overrides win by layer, never by specificity. The library leaves `site` empty: a product's own components and its additions to the library's go there, so they beat the library's components and layout and lose to its utilities. A product's token choices go in `tokens`, and what a CMS's output still needs in `reset`.
- **Native over scripted.** Prefer native elements and CSS (`dialog`, popover, anchor positioning, scroll-state queries, `details`) before JavaScript. Where JavaScript is needed, it enhances working HTML.
- **Tokens as custom properties.** Registered properties (`@property`) are used where typed values or animation help.
- **Logical properties** are the default, so right-to-left and vertical writing modes work without extra code.
- **No framework lock-in.** Components are plain HTML and CSS with documented structure, so any framework can wrap them.
- **No external requests.** Library CSS makes no network requests of its own (fonts, images or imports from third-party hosts).

## 8. When principles conflict

Accessibility wins every conflict. Beyond that, these rules settle the common ones.

| Tension | Decision rule |
| --- | --- |
| Typography over boxes vs. visible boundaries | Use a rule, tint or underline that meets 3:1. Remove the box, not the boundary. |
| Less is more vs. a requested variant | Add it only if it fits an existing axis and serves a named user need. Otherwise decline or split the component. |
| Icon-only minimal vs. touch and tooltips | Keep the accessible name and a visible label path on touch. Minimal is allowed only where meaning is obvious. |
| Small size vs. touch targets | Shrink the visual, not the hit area. Targets stay 48px unless the product opts into fine pointer; nothing drops below 24px. Text fields, which can't take a buffer, are the exception: `--sm` is 32px. |
| Intent colour vs. colour-only meaning | Pair every non-neutral intent with an icon, role or text. |
| Innovative use of space vs. predictability | Allowed only if it passes keyboard, zoom, reflow and forced-colors testing and does not move content unexpectedly. |
| Content first vs. needed chrome | Chrome appears on demand and collapses first, but never hides a primary action from keyboard or assistive technology. |
| Modern CSS vs. support | Use Baseline widely available features. Newer ones need a fallback and a removal tag. |
| CSS convenience vs. Figma parity | A token or axis that cannot be represented in Figma Variables needs a documented reason, or it is changed. |

## 9. Content: words are part of the interface

A component is only as clear as the words in it. The library ships no copy, so these rules are for the markup in its docs and recipes, and for products built on it.

- A button says what happens, as a verb and its object: "Save changes", "Delete project". Not "OK", "Submit" or "Click here".
- A link says where it goes. Its text makes sense out of context, since screen readers list links on their own (WCAG 2.4.4).
- An error says what went wrong and how to fix it, in the field's terms: "Enter a date after today", not "Invalid input". It never blames the user.
- An empty state says why it is empty and what to do next.
- Meaning never depends on position, shape or colour alone: no "the button on the right" or "the green items" (WCAG 1.3.3).
- Plain language: short sentences, common words, no jargon the user didn't bring. Headings and labels are front-loaded so the first words carry the meaning.
- Accessible names match the visible label, starting with the same words (WCAG 2.5.3).
- Mark the less common case in a form: "(optional)" in the label, written by the author.
- After a failed submit, a form with more than one field leads with an error summary: a danger banner that counts the problems and links to each field, focused by script, with "Error:" at the start of the page title. Each error is repeated beside its field in the same words.

## 10. Decisions log

Settled questions from the audit, recorded so they are not reopened without new information.

| Question | Decision |
| --- | --- |
| Is intent a shared axis? | Yes, the sixth axis: neutral, accent, danger, warning, success, info. Compound modifiers are removed. |
| Does size remain an axis? | Yes, for atoms and interactive controls only. Containers use density. |
| Dense or compact? | Compact only. `--compact` sets `--ui-sizing: compact`; `--font-sizing: compact` steps down type alone. |
| Do controls step down in a compact container? | Yes, to their `--sm` size, keeping the hit-area rule. |
| Does fine pointer switch on automatically? | No. Fine-pointer targets are opt-in by the product through a root token, and change the minimum target only. |
| Is info its own intent? | Yes, from the icon pass: info uses the Tier 1 aqua ramp through its own Tier 2 roles (`foreground-info`, `surface-info`, `surface-info-strong`, `border-color-info`). Accent stays the brand colour. |
| Are deck, telemetry and batch-actions in v1? | Telemetry and batch-actions are in core. Deck moves to recipes. |
| Are alert and banner separate? | No. Banner is the visual; alert is a role on the region it is inserted into. The page-edge container is `.banner-dock`. |
| Where does a toast's live role go? | On the stack, which is in the page before any toast arrives. A toast never carries its own role. |
| Where does tooltip end and popover begin? | A tooltip is one line of plain text about a control, opened only by `interestfor` and never the only copy of what it says. Anything richer, or with a control in it, is a popover holding a card or a menu, opened by `popovertarget` or, as a hovercard, by `interestfor`. |
| Does a menu use ARIA menu roles? | No. A menu is a list of buttons and links; Tab moves through it and its popover gives Escape and light dismiss. `role="menu"` promises arrow keys, typeahead and focus management that need a script, and the library ships none. The same goes for `role="toolbar"`: a set of controls is a labelled `role="group"`. |
| How is the current page, location or step marked? | With `aria-current` alone, never a class. A button with `aria-current` renders as selected, like `.is-active`; a menu or navigation tree shows it as a tint (the tree adds a rail). Steps use `aria-current="step"`, and the title carries the state in hidden text, since colour and the indicator are not enough. |
| What do button group, menu and batch actions each own? | A button group lays related buttons out (a row, a column, or joined into one control) and never aligns itself on the page. A menu lays plain buttons out in rows with headings and dividers. Batch actions is a placement and frame around a selection summary and a button group. None restyles its buttons. |
| Does the Google Fonts import stay? | No. System stacks by default; fonts load in Storybook and docs heads only. |
| May Tier 3 tokens reference Tier 1? | Yes, to choose a scale step: in the token JSON, and as the fallback where the CSS reads the hook. Use a Tier 2 token where one means that step. Never a colour ramp, and never a step without a hook. |
| Where does a Tier 3 default live? | In the component CSS, as the hook's fallback, with the same value in the token JSON for Figma. `check:tokens` keeps them equal. Tier 3 isn't compiled into `variables.css`. |
| Can a compact bar be shorter than its targets? | No. A bar's minimum height is `--spacing-target-min`, the pointer mode's minimum target, so on touch a compact Header keeps 48px and tightens its padding and type instead. A product that wants a shorter bar for mouse users opts into fine-pointer targets inside `@media (pointer: fine)`. The default bar uses `--spacing-target`, so fine-pointer targets never shrink it on their own. |
| Does the bar rule cover containers that clip? | Yes. Any container that hides its overflow is a bar for this purpose: it never cuts off a control's hit area, by its height or its overflow. |
| What is the target of a control drawn around a native field? | The whole drawn control. The native field fills it, so tapping its padding reaches the field. |
| How does an unlabelled row-selection checkbox meet the target? | Through a `<label>` around it that fills its cell (or the card's corner), since an input can't take a `::after` buffer. The accessible name stays in `aria-label` on the input. |
| How far apart are links in a list? | At least 24px from centre to centre, which meets WCAG 2.5.8 through spacing. For 48px targets, use block links. |
| Must every stylesheet have a forced-colors block? | No. Real borders and text survive forced colours unaided. Every story is checked in forced colours by script, and a component gets a block only where the check finds something lost. |
| Where may viewport media queries be used? | In the parts that span the page (app shell, Header, Sidebar), the viewport-prefixed responsive helpers, and user preferences. Everything else uses container queries. |
| Is a colour-flipped region reversed or inverted? | Inverted, as the code says (`.color-palette-inverted`). One word for one thing. |
| Should tight groups of small controls avoid overlapping hit areas? | Yes (reversed, Nov 2026). Overlap let the later control take taps on the earlier one's own box: on a phone, people hit the wrong item in the docs sidebar and the header's scheme switch. A buffer now reaches halfway across the gap and stops. The cost, a target under 48px in a tight group on touch, is accepted. |
| What does reduced motion do to a layer opening? | It removes movement, not change (Nov 2026). Dialogs, Popovers, Tooltips, Toasts, Banner Docks and Batch Actions drop their slide and scale but keep a short fade, which moves nothing and softens the change; a Banner only fades, so it keeps its transition whole. |
| Can markup rely on invoker commands (`commandfor`, `command`) before they are widely available? | Yes, with a fallback (Nov 2026). Every current browser supports them; the Dialog docs give a few lines of script for older ones. The library still ships no script. |
| How does a surface keep its edge in forced colours? | Every Card but a plain one draws at least a 1px border there, since forced colours flatten fills and drop shadows (Nov 2026). Poster and Banner (so every Toast) do the same. |
| What does reduced transparency change? | Every see-through surface turns solid and drops its blur (Nov 2026): the `--translucent` material on Header, Banner, Card and Menu, Poster's panel, the layer surface (`--surface-layer`, `--surface-layer-filter`) and the translucent utilities. Tints that mark a state, such as a hover wash or a status fill, stay: nothing shows through them. Where a browser can't report the preference (Firefox), nothing changes. |
| How do a sticky Banner Dock and a sticky Header share the top? | They don't (Nov 2026). With a sticky Header the Dock stays in flow above it and scrolls away; a notice that must stay in view is a `--fixed-bottom` Dock. Stacking them would need the Dock's height, which CSS can't know, and a Dock inside the Header would make the Header's focus clearance (WCAG 2.4.11) wrong once dismissed. |
| Does each prominence need an explicit modifier, such as `--outline`? | Not yet. Add one only when a real case needs to override a container's prominence back to the default. |
| Is a card's edge part of prominence? | No. Prominence sets the fill; the card's chrome axis (`--flat`, `--bordered`) sets the edge, and `--flush` the padding, so each modifier keeps to one axis. `--plain` keeps its edgeless look; `.card--plain.card--bordered` is the outline the row above anticipated. Chrome is card-only until a second surface needs it. |
| How are badge, chip, status and kbd told apart? | By job. Attached count or dot: badge. State of a thing: status. Value or tag, optionally removable: chip. Key: kbd. There is no separate "label" atom. |
| What is a status's default look? | The outline pill, like every other default prominence. `--strong`, `--subtle` and `--plain` (dot and text) follow the shared axis. |
| Must a badge sit in a corner? | No. It can sit inline after its host's label or in a logical corner, as long as it belongs to a host. |
| Is `data-status` an intent? | No, and it is gone. Presence (online, away, busy) is a dot badge on an avatar with the state in its name; everything else uses intent modifiers. |
| How is an avatar named? | By context. Beside a visible name: `aria-hidden`. A photo on its own: its `alt`. Initials or an icon on its own: `role="img"` and `aria-label`. An avatar is never interactive; a button or link around it carries the name and the target. |
| How is presence shown? | A dot badge in the avatar's bottom corner, hidden from screen readers, with the state in the accessible name or visible text. No coloured rings. |
| What is a telemetry? | A `<dl>`: each label a `dt`, each value a `dd`, with text atoms for type. A trend or state is a plain status with an icon and signed text. It is never a live region. |
| How does prose relate to the text atoms? | Prose styles bare elements only. Each element takes the type of the atom it stands for, from a nested layer under the atom classes, so an atom class on an element wins. Prose sets the rhythm, which follows `--font-sizing`; there is no separate spacing axis. A bare link is a `.link`. |
| Where does `aria-sort` go, and who sorts? | On the `<th>` of the sorted column, never on the button. The button is named by its visible text. The page's script sorts and sets the state; the library only styles it. |
| Can Storybook demos use library components as captions? | No. Demo captions use the Storybook-only `.sb-demo-tag`. |
| How is text centred in badge, status and chip? | Wrap the text in `.badge__text`, `.status__text` or `.chip__text`, which sets `text-box: trim-both cap alphabetic`. Trimming has no effect on the flex container itself, and padding-block is sized for trimmed text. |
| Are form controls styled by element or by class? | By class only (`.input`, `.select`, `.textarea`, `.checkbox-input`, `.radio-input`, `.range`). The reset gives bare fields their browser rendering back. |
| How does a small text control meet the hit-area rule? | Text fields can't take a `::after` buffer, so `--sm` is 32px, matching a small button: above the 24px minimum (WCAG 2.5.8), below the 48px touch target. Use it where the pointer is fine, or scope it with `fine:ui-compact` so touch screens keep the default size. |
| Do valid fields get a success colour? | No. Only invalid fields are styled, always with an error message. |
| Where does a field's error go, and is it an alert? | Between the hint and the control, starting with a Warning icon, linked with `aria-describedby` and `aria-invalid="true"`. No role unless a script inserts it after the page loads. |
| Who writes "required" or "optional"? | The author, in the label: mark the fewer case, usually "(optional)". CSS never generates it. |
| How big is a checkbox or radio row? | At least `--spacing-target-min` (48px, or 32px with fine-pointer targets), only as wide as its text, the box centred on the first line. In a compact container it is 32px with small-control text and a 16px box, to match the compact fields around it: like a small text control, the row is its own target, so it is the second exception to the 48px rule (above 24px, WCAG 2.5.8). |
| Does the empty track of a progress bar or meter need 3:1? | No, provided every bar has a name and states its value as text beside it. The bar then backs up the text instead of carrying the information alone. High-contrast mode adds an outline. |
| Can a meter take an intent class? | No. Its colour follows its value through `low`, `high` and `optimum`, so a class could make the colour disagree with the value. Without thresholds it fills in accent. |
| How is a link marked, and what changes on hover? | By an underline at the full link colour; link colour alone is too close to body text (WCAG 1.4.1). Hover thickens the underline. There is no hover colour, so nothing else has to reach 4.5:1. |
| Where can a link drop its underline? | Only with `.link--plain`, and only where context already marks it as a link: navigation, a list of links, a card title. Never in running text. It underlines on hover and focus. |
| Do links take intent or size? | No. A link navigates; an action with consequences is a button. An inline link takes the size of its text. |
| How do links work on a dark band? | Put `.color-scheme-dark` on the band. Every `light-dark()` token inside flips, links included. |
| How are bare links styled? | The reset gives an unclassed `<a>` an underline and the surrounding text colour, so it reads as a link without a class. |
| Do checkboxes and radios take an intent? | No. A checkbox has a state, not a status. Invalid turns it danger. |
| What boundary do borderless controls keep? | Plain keeps a 3:1 bottom border (`--border-color-control`). Subtle is a tinted field with no border, by choice: WCAG 1.4.11 doesn't ask a field for a boundary. Its border comes back under `prefers-contrast: more` and in forced colours. `--flush` drops the boundary only inside a bar that draws it. |
| Browser validation or the library's errors? | One or the other, never both. Either the browser checks the form and shows its own messages, or the form has `novalidate` and shows the library's errors with an error summary. |
| What does the library give a component whose behaviour needs a script? | Its CSS, its states and a reference demo of the product's script (a Combobox's is in the docs package), which keeps the documented keyboard map. The demo isn't shipped. |
| Does a Range Lockup take its own size or a border? | No. It takes size from `.controls-sm` or `.controls-lg`, like any group of controls. A border or surface around it is an override or utilities, not an option. |
| What size does a text atom take by default? | Its fixed step, at every width, headings included. A container chooses fluid, `cq` or compact sizing through `--font-sizing` (or `--ui-sizing: compact`); the appearance-mode classes set it. |
| How many names can a utility have? | Two at most: a verbose name (property and value) and Tailwind's shorthand where Tailwind has one with the same meaning. |
| How many small text steps are there? | Two: `.small-text` (step −1) for hints, captions and metadata, and `.micro-text` (step −2, the bottom of the scale, which compact keeps) for footnotes and fine print. `.micro-heading` is the uppercase eyebrow, a separate job. |
| Is card a molecule or an organism? | A molecule. A card is a surface with named slots; what goes in its body is content, not part of the card. Components that compose a card (popover, dialog) then sit at or above it in the cascade, so a positioning shell is never overridden by the card it wraps. |
| What about options that aren't variants, such as `--round` or `--docked`? | They are option families outside the six axes: corners, placement, arrangement, inset, width, material and overflow (section 2). Each sets one thing, with the same name everywhere, and names its need. |
| Is a tint enough to mark the current item? | No. A current or selected item needs a cue that isn't colour alone, at 3:1, which survives forced colours. A Menu and a Navigation Tree use bold text and a rail. |
| May a fixed or floating bar use a viewport query? | Yes, for its height only: on a short or zoomed screen (400% reflow is 320 by 256) it may drop to one scrolling row so it doesn't cover the page. |
| What is the Divider's orientation flag called? | `--divider-orientation` (`vertical` or `horizontal`), set by a parent whose items sit in a row (`.inline`, `.cluster`, Button Group, Batch Actions). It doesn't inherit. `--direction` is removed. |

## 11. Refinement checklist

Run this on every component during the audit. A component is ready for v1 only when every item passes or has a recorded exception.

**Accessibility**

- [ ] Uses the right native element; ARIA only where needed
- [ ] Fully keyboard operable, visible focus, no trap; a control that hides its input (a toggle Button, a choice) shows the ring on what it draws
- [ ] A current or selected item has a cue beyond a tint (section 1)
- [ ] Contrast verified for text (AA) and for boundaries and focus (3:1), with AAA reachable through library options
- [ ] Works in forced-colors, reduced-motion and high-contrast preferences; selected, current and checked states still show in forced colours
- [ ] Touch target meets the documented size for each pointer mode, including `--sm` sizes on coarse pointers
- [ ] Colour is never the only signal; every non-neutral intent has an icon, role or text

**Responsiveness**

- [ ] Works at the smallest and largest container sizes
- [ ] Responds to its container, not the viewport
- [ ] Survives 200% text zoom, 400% reflow and text-spacing overrides

**Restraint and architecture**

- [ ] Variants map to the shared axes (pointer, size, density, presentation, prominence, intent) or a recognised option family (corners, placement, arrangement, inset, width, material, overflow)
- [ ] Each modifier sets one axis; no compound modifiers
- [ ] Size modifiers only on atoms and controls; `--compact` only on containers
- [ ] Every variant has a named user need; unsupported combinations are documented
- [ ] Sits at the right atomic level, with dependencies listed, and is in v1 scope
- [ ] Uses Tier-2 semantic tokens only; no Tier-1 references and no raw values; every hook it reads is in the tokens with one default (`npm run check:tokens`)
- [ ] Contract is documented: states, structure, keyboard map

**Content**

- [ ] Buttons, links, errors and empty states in its examples follow section 9

**Design quality**

- [ ] Structure comes from type, space and alignment before boxes
- [ ] Icons are used only where they earn their place
- [ ] Light, dark and inverted surfaces all pass
- [ ] Content stays first; chrome is on demand

**Code health**

- [ ] Crucial functionality uses Baseline widely available features; newly available ones are non-essential or have a fallback
- [ ] Legacy code is tagged with a removal condition
- [ ] No aliases; one name per component, element and modifier
- [ ] No literal colour fallbacks; fallbacks end at a system value
- [ ] Sits in the correct cascade layer; logical properties and native elements used
- [ ] Makes no external network requests
- [ ] Token and axis changes have parity in Figma Variables and Tokens Studio
- [ ] Naming follows the library convention
