# Removed names

What each component pass removed and what replaced it, moved here from the public component pages. `AGENTS.md` has the same migration as one table.

## Accordion
- `--flush` (use `--plain`), `--transparent` (the default has no surface), `--ruled`, `--no-icon`, `.accordion-group--no-icons`, `.accordion-group--tight` (use `--joined`), `.accordion__icon`, `--accordion-variation` (use `--accordion-prominence`), the open surface, `--ui-density` on accordions; the `open-bg`, `hover-border` and `inner-border-*` tokens and the `--accordion-summary-*` names.

## Lockup
- `<b>` / `<small>` lines (use text atoms), `lockup--*` modifiers.

## Brand
- `.header__brand`, `__brand-icon`, `__brand-wordmark`, `__brand-logo`.

## Prose
- `--vert-space`, `--vert-spacing`, `--prose-vert-spacing`, `--prose-font-sizing`, `.vert-spacing-*`, `.font-sizing-tight`, the `.emoji.*` classes, `--prose-link-*`, `--prose-underline-*`, `--prose-body-*`, `--prose-block-width`, `--prose-inset-space*`, `--prose-vert-space*`, `--prose-figcaption-margin-bottom`, `--prose-figcaption-text-wrap`, `--prose-small-font-size`, the underline on nested bold, and `diagonal-fractions`.

## Table
- `.table__caption`, `__caption--bottom`; `--zebra` (use `--striped`), `--sm` (use `--compact`), `--simple` (use `--plain`), `--fixed`, `--flush`, `--head-cells-long`, `--sticky-header`, `--sticky-footer`, `--sticky-1st-column`; `__col--num`, `__col--numeric`, `__col--center`, `__col--fit` (use the `__cell--` classes), `__cell--long` (use `--nowrap`), `__cell--start`, `__cell--index`, `__cell--actions`, `__cell--fill`, `__cell--xs` … `--xl`, `__col--counter`, `__col--expand`, `__col--auto`, `__col--min-*`; the `[data-numeric]`, `[data-center]`, `[data-fit]`, `[data-nowrap]` attributes; `aria-sort` on the button; the `table.font-*`, `head-font-*`, `header-cell-font-weight` and `caption-*` tokens; `--ui-density` on tables.

## Wrapper
- padding utilities paired with a wrapper to make up for the missing gutter; `wrapper` on cards.

## Grid
- viewport-prefixed column classes (`sm:grid--N-col` … `xl:`, `md:grid`, `md:grid--auto-fit`); `.grid-carousel` and `--bleed` aliases; viewport carousels (`max-md:grid--carousel`, `max-sm:`, `md-max:`, `grid--carousel-below-md`); `@max-md:carousel`; `@sm:`, `@md:`, `@lg:` at 40, 48 and 60em (now `@2xl:`, `@3xl:`, `@5xl:`) and `@max-md:grid--carousel` (now `@max-3xl:`), in the utilities pass. Use a column count (it reflows on its own) or a container variant.

## Split
- the 14 `--auto-below-*` / `--auto-in-container-below-*` variants and `--auto` (the split wraps on its own); `--reverse` (use `--end`); `--stretch` / `--panels`; `--cushioned` (the default gap is the cushion); `--split-sidebar-width` (now `--split-side-width`), `--split-min-width` (now `--split-main-min-width`).

## App shell
- `.workspace` (use `.app__workspace`), `.app__aside`, `.app__footer` (use `.footer`), `.app__sidebar` (use `.sidebar`), `.app--locked` (use `--viewport`), `.main--panels` (use `--viewport`), the `aside` grid row (side panes go in the workspace), the shell's scroll-state container.

## Stack, inline and cluster
- `--display`, `--flex-wrap`, `--direction` and `--justify` hooks; `.inline--between` no longer sets a width (a flex row already fills its parent).

## Empty state
- the `cq` type mode and size container; `--flush` (no padding is the default); `--bordered` (use `--subtle`); `--left` (use `--start`); `--error` and `[data-status]` (use `--danger` and the other intents); `__icon-well` (use an `.icon-box` in `__visual`); `__hgroup`; `--empty-state-density` (use `--ui-sizing: compact`) and `--empty-state-align`; the card and table rules; `aria-labelledby` on a `<div>`; the well, icon, title, padding and status tokens.

## Combobox
- `--ghost`, `--flush`, `comboboxes-*`, `--invalid` (use `aria-invalid`), `--disabled` (use `disabled`); `__listbox--anchored`, `--in-flow`; inline `anchor-name` / `position-anchor`; `__option-main`, `__option-desc` (use a `.lockup`); `__group-header` (use `__group-label` in a `role="group"`); dividers in the list; the bespoke `__clear` and `__toggle` button styles (they're `.button`s); `.is-selected`, `data-focused`, `data-expanded`; `--combobox-density`, `--combobox-variation`, `--ui-density`; the `cq` type mode; the control tokens (`min-height`, `bg`, `border-*`, `radius`, `padding-*`, `gap`, `color`, `placeholder-color`), `listbox-gap` and `option-selected-bg`.

## Telemetry
- `.telemetry__icon`, `__content`, `__label`, `__value`, `__unit`, `__trend`, `__status`, `[data-trend]`, `[data-status]`, the telemetry intents; `--pill` (use `--round`), the old `--subtle` (it meant plain; `--subtle` is now a tint), `--bordered` (the default), `--sm` (use `--compact`), `--stacked` (the default), `--icon-end`, `--card`; `--telemetry-variation`, `--telemetry-density`; `.telemetry-strip` (use `.telemetry-group`); `.stat-pill`; `.telemetry-group--ruled` (removed later; `--fill` shares the row instead).

## Responsive helpers
- `show` and its conditions; `hide-decor`, `show-decor`, `show-labels`, `flex-auto` and the `.ui-decor` hook; the synonyms (`md:hidden`, `min-md:hide`, `hide--above-md`, `md-max:hide`, `@min-md:hide`, `hide--in-container-below-md` …); the `2xs` and `xs` viewport sizes; the old container sizes (`@sm:` was 40em, `@md:` 48em, `@lg:` 60em); `.sr`; the height scale beyond `short`/`tall`. `lg:` moved from 60em to 64rem.

## Header
- `.header-container` (use two `__bar`s); `--borderless` (use `--plain`); `--flush` (set `--header-padding-inline`); the global `--header-height` rule and the Tier 2 `header.mobile-height` / `desktop-height` tokens; the palette and scheme variables (use the utilities); `--header-contained-height`, `--header-container-gap`; the scroll-driven shadow animation and the `app` container query; a layout built inside the header (`.wrapper.flex.justify-content-between`, `.inline--between`) and padding utilities on it.

## Sidebar
- the automatic off-canvas drawer below 48em and `.is-open`; `.sidebar__scroller` (use `__body`); `--flush` (use `__body--flush`); `--right` (use `--end`); `.app__sidebar`; `--site-header-height` and `--sidebar-header-height` (use `--header-height`); its z-index (a sticky sidebar overlaps nothing).

## Footer
- `.app__footer`; the footer's own padding (the bars have it); `padding-0` and border utilities on it.

## Utilities
- every third name and synonym; `font-size-*`, `line-height-*`, `fs-*`, `fw-*`; numeric weights and z-indexes; `width-dialog`, `-popover`, `-sidebar`, `-prose`, `-shell`, `-wide`, `block-*`, `height-*`, `size-grow`; `bg-effect-*`, `bg-blurred-*`, palette shadow colours; `.backdrop`, `.focus-none`, `.outline-none`; `ui-dense`, `ui-default`, `spacing-mode-*`; the left/right names. `border-muted` and `border-quiet` now set the colour only, `.border` is 1px, and `.text-nowrap` sets `text-wrap`.

## Stack, Inline and Cluster
- `.inline-responsive`, `--{size}`, `--between`, `--end`, `--tight`, `--cushioned`, `--ruled`: `.stack` with `@{size}:inline`, `.stack--tight`, `--cushioned`, `--ruled`, and the `--justify-content` hook.

## Actions
- `.button--flush` (a link that lines up with text is a Link, `.link`); `.button--icon-lg` and `.buttons-icon-lg` (set `--button-icon-size`); `.button__text--placeholder`; the `hide-decor` class and `--ui-decor` flag on Button and Tab; the Divider's `--direction` flag (use `--divider-orientation`).
