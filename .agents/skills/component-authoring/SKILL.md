---
name: component-authoring
description: |
  Writing and refactoring the library's own component CSS in packages/css/src: the :where() and layer rules, the private variable manifest and state contract, modifiers as token maps, axis flags through style queries, sizing modes, fallbacks, targets and forced colours, and what a component pass must update.

  Trigger immediately for:
  - Creating or editing packages/css/src/{atoms,molecules,organisms,layout,utilities}/*.css.
  - Adding a variant, size, state or container flag to a component.
  - Reviewing component CSS against PRINCIPLES and AGENTS.md.
  - A component pass: migrating legacy names, updating its markup doc, stories, tokens and Figma.
---

# Authoring library components

`docs/PRINCIPLES.md` outranks everything here. Read the component's `docs/markup/` file before touching its CSS. Button (`atoms/button.css`) is the reference implementation; copy its shape. For comment banners and grouping, load the `css-commenting` skill.

## 1. Cascade and specificity

- **Every selector is wrapped in `:where()`**, so it has zero specificity: `:where(.card)`, `:where(.card--plain)`. Layers decide what wins, not selectors.
- **`index.css` imports each file into its layer:** `reset, tokens, atoms, molecules, organisms, layout, site, utilities, overrides`. Library CSS never goes in `site`; that layer is the consuming product's.
- **Tier is the layer.** An atom is indivisible (`button`, `badge`, `text`). A molecule composes atoms (`card`, `banner`, `menu`). An organism assembles molecules (`dialog`, `table`, `header`). A component that wraps another sits at or above it.
- **Composites declare layout only on their parts.** `.card__title` may set `margin`, `min-inline-size`, `text-wrap`, `flex`, `align-self`, `color` and `user-select`. It never sets `font-*`, `line-height`, `letter-spacing`, `text-transform` or `inherit`: the text atom on the element owns type, and a later layer would override it.

## 2. The private manifest and state contract

At the top of the base `:where(.component)` rule, declare every value the component uses as a private variable. Each one chains to its Tier 3 hook, then a Tier 2 role, then a terminal value. A made-up `.tag`:

```css
:where(.tag) {
  --_tag-bg: var(--tag-bg, transparent);
  --_tag-text: var(--tag-color, var(--foreground, CanvasText));
  --_tag-border-color: var(--tag-color-border, var(--border-color-muted, currentColor));
  --_tag-radius: var(--tag-radius, var(--radius, 0.25rem));
  --_tag-padding-inline: var(--tag-padding-inline, var(--spacing-sm));

  /* State contract: hover and active are private variables too */
  --_tag-hover-bg: var(--tag-hover-bg, var(--surface-translucent, transparent));
  --_tag-active-bg: var(--tag-active-bg, var(--surface-translucent-strong, transparent));
}
```

- **Handle `:hover` and `:active` once,** in the base rule, reading the private variables. Hover goes under `@media (hover: hover)`, and both exclude `:disabled` and `[aria-disabled="true"]`.
- **Modifiers are pure token maps.** `.tag--subtle` reassigns `--_tag-*` and declares nothing else: no properties, no pseudo-classes. Then every state works for every modifier with no combination rules.
- **Children and pseudo-elements read `var(--_tag-*)`** directly.
- **Nest with an explicit `&`** for states: `&:hover`, `&:focus-visible`, `&:where(:disabled, [aria-disabled="true"])`. A bare `:hover` inside a block matches descendants.

## 3. Axes, modifiers and flags

- **Each modifier sets exactly one axis** (PRINCIPLES §2):

  | Axis | Values |
  | :--- | :--- |
  | Prominence | default, `--strong`, `--subtle`, `--plain` |
  | Intent | neutral, `--accent`, `--danger`, `--warning`, `--success`, `--info` |
  | Size (atoms and controls only) | default, `--sm`, `--lg` |
  | Density (containers only) | `--compact` |

  Option families outside the axes (corners, placement, material and so on) set one thing each, with the same name everywhere. Never fuse two axes into one class: write `.button--subtle.button--accent`.
- **Each axis also has a container flag,** read with a style query in the base rule: `@container style(--button-prominence: subtle) { … }`.
  - Name flags after the axis: `--<component>-prominence`, `-intent`, `-size`, `-corners`.
  - Declare the flags before the modifier rules, so a modifier on the element beats an inherited flag.
- **Density is `--ui-sizing: compact`,** never a per-component flag. A `--compact` container sets it, and nested atoms step down through `@container style(--ui-sizing: compact) or style(--font-sizing: compact)`.
- **Intent needs more than colour.** A new intent variant documents its icon, role or text.

## 4. Values and fallbacks

- **No literals in components:** no hex, `rgb()`, `px` or `rem` outside a terminal fallback. Use Tier 2 roles and the component's own Tier 3 hooks.
- **Terminals:**
  - Colours end at `Canvas`, `CanvasText`, `currentColor` or `transparent`.
  - Shadows end at `none`.
  - Border widths end at `1px` or `0`.
  - Sizes may end at a plain length (`3rem`).
- **A Tier 1 step only as a hook's default,** where no Tier 2 role means it: `var(--badge-gap, var(--spacing-12))`. Never a colour ramp.
- **A new Tier 3 token** needs its fallback in the CSS, the same value in `tokens/3-component.json`, and `npm run check:tokens` passing (load the `token-pipeline` skill).
- **Derive state colours** with `color-mix(in oklch, …)`. Make translucency with `color-mix(in srgb, var(--role), transparent N%)`.
- **Logical properties only:** `inline-size`, `padding-block`, `inset-inline-start`. Use `aspect-ratio: 1` for square controls.

## 5. Behaviour in the browser, not a script

- Use **native elements and attributes** (`dialog`, `popover`, `details`, `commandfor`, `interestfor`, `field-sizing: content`, `:user-invalid`), and `interpolate-size: allow-keywords` for expanding content. The library ships no JavaScript.
- **Top-layer entry and exit** use `@starting-style` with `transition-behavior: allow-discrete` on `display` and `overlay`. The `::backdrop` animates with the dialog. Every motion has a `prefers-reduced-motion` fallback.
- **Type alignment** uses `text-box: trim-both cap alphabetic`.
- **Container queries,** not viewport queries, except in the app shell, Header, Sidebar, viewport-fixed placements and the viewport helpers.

## 6. Accessibility in the CSS

- **Focus:** `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);` on `:focus-visible`. On a filled control, use the tone colour where `currentColor` would vanish.
- **Targets:** the hit area is `--spacing-target-min` (48px, or 32px where the product opted into fine targets).
  - A smaller visual size keeps the hit area with a transparent `::after` buffer that reaches at most halfway into the gap its container declares (`--target-gap-inline`, `--target-gap-block`).
  - Never below 24px.
  - A bar is at least `--spacing-target-min` tall.
- **Forced colours:** add a `@media (forced-colors: active)` block only where `check:targets` finds a border, fill or selected state lost. Use system colours.
- **High contrast, reduced transparency and reduced motion** come mostly from the tokens. Check the component in each.

## 7. A component pass

When a component changes, update in the same pass:
1. **CSS:** the file and the header comment (axes, flags, WCAG notes, usage).
2. **Markup doc:** `docs/markup/NN-<component>.md`, with its examples, Options table and Do and Don't. If the doc has a page, run `npm run build:docs && npm run check:docs`.
3. **Stories:** `packages/storybook/stories/<tier>/<component>.stories.ts`, one story per state, with static markup.
4. **Tokens:** `tokens/3-component.json` and the fallbacks, then `npm run check:tokens`.
5. **AGENTS.md:** the legacy table, with old names → new names; delete aliases and migrate their uses.
6. **Gates:** `npm run build:storybook`, then `check:targets`, `check:focus` and `check:layout`, run one at a time, each under `timeout`.
7. **Figma:** the factory component's variants, if the axes changed.

Removed names go in `docs/audit/removed-names.md`, never in public docs.
