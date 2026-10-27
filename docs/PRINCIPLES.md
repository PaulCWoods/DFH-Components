# Component Library Principles

Oct 26, 2026 · @Paul Woods · Updated Oct 27, 2026

## Purpose

These principles decide what belongs in the library, how it is built, and when a component is ready for version 1. The library is pre-v1, so rewrites are expected and welcome; a principle outranks existing code.

The library serves two audiences from one source of truth. Developers consume the CSS; designers consume the same tokens as Figma Variables and Tokens Studio sets through `packages/figma-sync/`. A change to token tiers, axis names or variant values is not done until it has clean parity in both.

Each section ends in rules that can be tested. **Must** means a component fails review without it, **should** means a documented exception is needed to skip it, and **may** is optional. Section 10 turns the rules into the checklist for the refinement pass.

## 1. Foundations: accessible, responsive, content first

Every component works for everyone, at any size, before it looks good. Accessibility is a build requirement, not a polish step.

**Accessibility first**

- Every component must meet WCAG 2.2 AA. AA is the floor, and AAA must always be achievable using the library itself, through documented options or tokens and without custom code (for example the 48px touch target default and an enhanced-contrast mode).
- Native HTML elements come first (`details`, `dialog`, `button`, popover). ARIA is added only where no native element does the job.
- Each component must be fully operable by keyboard, with a visible focus indicator and no keyboard trap.
- Each component must survive forced-colors mode, `prefers-reduced-motion`, `prefers-contrast`, 200% text zoom, 400% reflow and user text-spacing overrides.
- Borderless or subtle designs must still give controls and focus a 3:1 non-text boundary (WCAG 1.4.11).

**Responsiveness is core**

- Every component must work from the smallest practical container up to the largest, with no horizontal scroll except in components that scroll by design (tables, carousels).
- Components respond to their container (container queries), not the viewport. Media queries belong only to the app shell and to user-preference features such as `pointer` and `prefers-*`.
- Layout is fluid by default (auto-fit grids, intrinsic sizing, `clamp()`); fixed breakpoints are the exception and must be justified.

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

- A new variant must name the user need it serves and which existing axis it belongs to. If it fits none, the component is probably two components.
- Combinations are not multiplied by default. A component documents only the combinations it supports and tests.
- Defaults are the most accessible and most forgiving option. Opting into fine, compact, small or minimal is a deliberate step.
- Every variant must be reachable by token or one modifier, not by overriding component CSS.

**Axes are orthogonal**

- Each modifier sets exactly one axis. Compound modifiers that fuse two axes (`.button--subtle-primary`, `.button--plain-destructive`) are not allowed; write `.button--subtle.button--accent` instead.
- Axis values use the canonical names in the table across every component. `--primary` and `--destructive` are pre-v1 names for `--accent` and `--danger` and are removed with the other aliases (section 7).
- Where intent is set by script, it may also be exposed as `[data-intent="danger"]`, mapping to the same tokens as the modifier.

**Size and density are different things**

- Size scales a control's own height, type and padding (button, input, select, badge, avatar). Only atoms and interactive controls take a size modifier.
- Density scales the space inside and between components in a container (card, table, form, stepper). Only containers take `--compact`.
- They must not share modifier names. There is one density modifier, `--compact`; `--dense` is not used.
- `--compact` sets `--ui-sizing: compact` on the container, so nested layout primitives tighten their gaps, typography atoms step down, and nested controls step down to their `--sm` size, all through `@container style(--ui-sizing: compact)`. This is the one density flag; per-component density flags (`--ui-density`, `--control-density`, `--menu-density` and similar) are migrated to it.
- To step down type alone without changing geometry or controls, set `--font-sizing: compact` on the region.
- A smaller visual size never shrinks the hit area. Unless the product has opted into fine-pointer targets, a `--sm` control, or one stepped down by a compact container, keeps a 48px target through a transparent `::after` or a padding buffer. On any pointer it never falls below 24px (WCAG 2.5.8).

**Pointer is opt-in**

- The library defaults to 48px targets on every device, which meets WCAG 2.5.5 (AAA) everywhere.
- A product that knows its users are on mouse or trackpad may opt into fine-pointer targets (32px) with a single root token. It may set that token inside `@media (pointer: fine)` itself, but the library never does so automatically.
- Fine-pointer mode changes the minimum target only. It never shrinks visual sizes on its own.

**Intent**

- Intent values map 1:1 to Tier-2 semantic roles (`surface.danger`, `foreground.success`, `border.warning`), so the same axis exists as a mode in Figma Variables.
- Intent is never carried by colour alone (WCAG 1.4.1). Every non-neutral intent must be paired with an icon, a semantic role (`role="alert"`, `role="status"`) or descriptive text.
- Badges and other passive indicators use the same intent names as actions; there is no separate status vocabulary.

## 3. Architecture: atoms, structure and contracts

Complex components are assembled from simpler ones, and every layer has one job.

1. **Layout primitives** (stack, cluster, grid, split, inline) own space and arrangement. They hold no content styling.
2. **Atoms** are indivisible and meaningful alone (button, input, link, badge).
3. **Molecules** combine atoms for one purpose (banner, pagination, telemetry).
4. **Organisms** combine molecules and primitives into a complete region (table, dialog, card, header, batch actions).

Structural components (layout, bands, headers) and content components (prose, media, data) are kept separate and combined, so a card is a structure that can hold any content.

**One visual, many roles**

- When two components share most of their structure and styling, the library keeps one visual component and expresses the difference as a role or a container.
- `banner` is the visual molecule for in-flow and docked announcements. An alert is a banner with `role="alert"` (or `role="status"` for non-critical notices), optionally placed in a floating or toast container. Alert must not define its own tokens or styles that duplicate banner's, and the two must not import each other.

**Token tiers**

- Tier 1 (global) tokens hold raw values (colour ramps, the spacing scale). Components must never reference them directly, including `--spacing-*` steps and raw `--color-*` ramps.
- Tier 2 (semantic) tokens hold meaning (surface, foreground, border, accent, danger). Components reference only these.
- Semantic tokens are added when a component needs one, not in advance. When a refactor replaces a Tier 1 reference (such as `--spacing-8`), it adds the semantic token that names the role (such as a spacing step for the gap between related items), and later components reuse it.
- Tier 3 (component) tokens are optional and exist only to expose a documented customisation point.
- Every tier must export cleanly to Tokens Studio and Figma Variables; a token that cannot be represented in Figma needs a documented reason.

**Component contract**

Every component must document:

- Its axes and supported variants, and its default.
- Its states (hover, focus, active, disabled, loading, error) and what each looks like.
- Its semantic structure, ARIA pattern and keyboard map.
- Its behaviour at the smallest and largest container sizes.
- Its dependencies, so a molecule can be traced to its atoms.

Naming follows one convention across the library (block, element, modifier), and a modifier describes an axis value, not a visual (`--compact`, not `--tight-padding-2`).

**Scope for v1**

The core library holds components that are common across web applications. Domain-specific showcases belong in recipes.

| Component | v1 status | Action |
| --- | --- | --- |
| `telemetry` | In core | Refactor to compose standard atoms (badge, text, icon) rather than its own type and trend styles. |
| `batch-actions` | In core | Keep as an organism for tables and card grids. |
| `deck` | Out of core | Move from `packages/css/src/organisms/` to a recipe in `packages/storybook/stories/recipes/`. It remains a stress test of the token system, not a library component. |

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

**Fonts**

- The library must not load fonts. No remote `@import` (such as Google Fonts) appears in library CSS; it blocks rendering, makes third-party requests consumers have not agreed to, and fails offline.
- Font tokens in `1-global.json` default to system font stacks, so the library is complete without any web font.
- Storybook (`.storybook/preview-head.html`) and the documentation site load their own fonts in the page head. The documentation explains how consumers either link or self-host a font such as Inter and point the font tokens at it.

## 5. Colour: OKLCH, semantic roles and surfaces

Colour is created and manipulated in OKLCH and consumed only through semantic roles, so any theme change is a token change.

- Ramps are created in OKLCH tooling with consistent lightness steps across hues, and chroma capped per hue so colours stay inside the sRGB gamut.
- Ramps are stored as hex in Tier 1 tokens, because Figma Variables do not yet support OKLCH. Hex is the storage and exchange format, not the design space: a ramp is changed by regenerating it from OKLCH, never by editing hex values by hand.
- Colours derived in CSS (hover, active, disabled, tints, translucency) are manipulated in OKLCH, for example `color-mix(in oklch, …)` or `oklch(from var(--role) …)`, so lightness changes stay perceptually even.
- OKLCH lightness is perceptual, not a contrast guarantee. Every text and UI pairing must be verified against WCAG contrast (and checked with APCA as a second opinion) in the build, not by eye.
- Components use semantic roles only: surface, text, muted text, border, and the intent roles (accent, info, success, warning, danger). Raw colour values never appear in a component.
- Every semantic role must define light and dark values. `light-dark()` and relative colour syntax keep the definitions short.
- Reversed is a surface context, not a third theme. A reversed region remaps the semantic roles to their inverse in either mode, so a component placed on it stays legible with no changes.
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
  @layer reset, tokens, atoms, molecules, organisms, layout, utilities, overrides;
  ```

  Layers formalise the cascade that import order provides today. Components stay wrapped in `:where()` so specificity inside a layer remains zero, and utilities and overrides win by layer, never by specificity.
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
| Small size vs. touch targets | Shrink the visual, not the hit area. Targets stay 48px unless the product opts into fine pointer; nothing drops below 24px. |
| Intent colour vs. colour-only meaning | Pair every non-neutral intent with an icon, role or text. |
| Innovative use of space vs. predictability | Allowed only if it passes keyboard, zoom, reflow and forced-colors testing and does not move content unexpectedly. |
| Content first vs. needed chrome | Chrome appears on demand and collapses first, but never hides a primary action from keyboard or assistive technology. |
| Modern CSS vs. support | Use Baseline widely available features. Newer ones need a fallback and a removal tag. |
| CSS convenience vs. Figma parity | A token or axis that cannot be represented in Figma Variables needs a documented reason, or it is changed. |

## 9. Decisions log

Settled questions from the audit, recorded so they are not reopened without new information.

| Question | Decision |
| --- | --- |
| Is intent a shared axis? | Yes, the sixth axis: neutral, accent, danger, warning, success, info. Compound modifiers are removed. |
| Does size remain an axis? | Yes, for atoms and interactive controls only. Containers use density. |
| Dense or compact? | Compact only. `--compact` sets `--ui-sizing: compact`; `--font-sizing: compact` steps down type alone. |
| Do controls step down in a compact container? | Yes, to their `--sm` size, keeping the hit-area rule. |
| Does fine pointer switch on automatically? | No. Fine-pointer targets are opt-in by the product through a root token, and change the minimum target only. |
| Is info its own intent? | Undecided; settle during the banner pass, its first consumer. Until then `--info` maps to accent. |
| Are deck, telemetry and batch-actions in v1? | Telemetry and batch-actions are in core. Deck moves to recipes. |
| Are alert and banner separate? | No. Banner is the visual; alert is a role on it. |
| Does the Google Fonts import stay? | No. System stacks by default; fonts load in Storybook and docs heads only. |

## 10. Refinement checklist

Run this on every component during the audit. A component is ready for v1 only when every item passes or has a recorded exception.

**Accessibility**

- [ ] Uses the right native element; ARIA only where needed
- [ ] Fully keyboard operable, visible focus, no trap
- [ ] Contrast verified for text (AA) and for boundaries and focus (3:1), with AAA reachable through library options
- [ ] Works in forced-colors, reduced-motion and high-contrast preferences
- [ ] Touch target meets the documented size for each pointer mode, including `--sm` sizes on coarse pointers
- [ ] Colour is never the only signal; every non-neutral intent has an icon, role or text

**Responsiveness**

- [ ] Works at the smallest and largest container sizes
- [ ] Responds to its container, not the viewport
- [ ] Survives 200% text zoom, 400% reflow and text-spacing overrides

**Restraint and architecture**

- [ ] Variants map to the shared axes (pointer, size, density, presentation, prominence, intent)
- [ ] Each modifier sets one axis; no compound modifiers
- [ ] Size modifiers only on atoms and controls; `--compact` only on containers
- [ ] Every variant has a named user need; unsupported combinations are documented
- [ ] Sits at the right atomic level, with dependencies listed, and is in v1 scope
- [ ] Uses Tier-2 semantic tokens only; no Tier-1 references and no raw values
- [ ] Contract is documented: states, structure, keyboard map

**Design quality**

- [ ] Structure comes from type, space and alignment before boxes
- [ ] Icons are used only where they earn their place
- [ ] Light, dark and reversed surfaces all pass
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
