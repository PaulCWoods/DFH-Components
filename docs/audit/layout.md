# Layout and the App Shell

Covers `packages/css/src/layout/`: the layout primitives (`.stack`, `.inline`, `.inline-responsive`, `.cluster`, `.grid`, `.split`, `.wrapper`) and the app shell (`.app`, `.app__workspace`, `.main`, `.sidebar`, and `.footer`, which lives in `app.css`).

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Behaviour was checked in headless Chrome against `packages/css/src/index.css`.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `stack.css` | 55 | A flex column; gap from `--gap`; `--tight`, `--cushioned`, `--ruled` (gap decorations); resets lists. |
| `inline.css` | 141 | `.inline`, a row that doesn't wrap, centred; `--between`; `.inline-responsive`, a column that turns into a row above one of 7 container widths; `--tight`, `--cushioned`, `--ruled`. |
| `cluster.css` | 53 | An `inline-flex` row that wraps, stretched; `--tight`, `--cushioned`, `--ruled`. |
| `grid.css` | 395 | Auto-fill columns at a minimum item width (`--2xs` … `--2xl`); `--auto-fit`; fixed `--1-col` … `--6-col`; viewport-prefixed (`sm:`, `md:`, `lg:`, `xl:`) and container-prefixed (`@sm:` …) column classes; `--carousel` (alias `.grid-carousel`) with viewport and container variants; `--tight`, `--cushioned`, `--ruled`. |
| `split.css` | 401 | Two panes: a side pane at a preferred width and a main pane that wraps below it when narrow; `--end` (alias `--reverse`); 7 widths; `--three`; `--stretch` / `--panels`; `--nowrap`; 7 `--auto-below-*` (viewport) and 7 `--auto-in-container-below-*` variants. |
| `wrapper.css` | 67 | A centred column capped at the site width; 7 size modifiers; `--start`, `--end`, `--middle`. No inline padding. |
| `sidebar.css` | 253 | A surface panel with border, header, scrolling body (alias `__scroller`), band and footer; `--sticky`, `--flush`, `--end` (alias `--right`), `--floating`, `--rail`, `--ruled`; below 48em every sidebar becomes a fixed off-canvas drawer opened by `.is-open`. |
| `app.css` | 110 | `.app`, a grid of header, aside, main and footer rows (a scroll-state container); `.footer` / `.app__footer`; `.app__workspace` (alias `.workspace`), side panes and main in a row, a column below 48em; `--viewport` (alias `--locked`), which locks the page to the viewport so panes scroll, and unlocks when small. |
| `main.css` | 39 | `.main` with cushion padding; `--flush`; `--viewport` (alias `--panels`). |

Tier 3: `sidebar.*` and `footer.*` (3 border tokens each), `wrapper.*` (1). The primitives read `--spacing`, `--spacing-cushion` and Tier 1 fallbacks (`--spacing-64`, `--spacing-block-*`).

## Usage

| Primitive | Library | Blog | Modifiers in use (Library) |
| :--- | ---: | ---: | :--- |
| `.stack` | 474 | 128 | `--tight` / `--cushioned` / `--ruled` 31 |
| `.inline` | 377 | 41 | `--between` 19 |
| `.inline-responsive` | 43 | 12 | sizes `--xs`, `--sm`, `--md` mostly |
| `.cluster` | 174 | 52 | `--tight` / `--cushioned` / `--ruled` 28 |
| `.grid` | 111 | 18 | `--sm` 45, `--2xs` 25, `--xs` 23, `--auto-fit` 19, `--2-col` 9, `--carousel` 8, `--3-col` 7; viewport-prefixed 18 |
| `.split` | 31 | 3 | `--sm` 15, `--end` 13, `--xs` 12, `--2xs` 9, `--three` 7; `--auto-below-*` and `--auto-in-container-*` 0 |
| `.wrapper` | 131 | 36 | `--lg` 66, `--md` 34, `--sm` 11, `--middle` 10 |
| `.sidebar` | 29 | 0 | `--flush` 19, `--sticky` 14, `--rail` 14, `--floating` 7, `--end` 7 |
| `.app` / `.main` | 27 / 18 | 1 / 1 | `--viewport` 15; `main--flush` 12 |
| Inline `--gap:` | 124 | 0 | |
| Utilities doing layout work | `align-items-center` 314, `gap-*` 322, `justify-content-between` 108 | 34, 132, 1 | |
| Inline styles in the 8 layout stories | 203 | – | |

## Measurements and checks

- **Settings leak into nested layouts.** The primitives read unprefixed custom properties, which inherit:
  - `style="--gap: 0"` on a stack gives every stack, inline, cluster and grid inside it a gap of 0 (checked);
  - `--align-items` on a stack centres nested stacks (checked);
  - `.split--sm` sets `--split-sidebar-width`, so a split inside it gets the same side width (checked);
  - `.wrapper--sm` caps every wrapper inside it at the same width (checked).

  Registering these properties with `inherits: false` stops the leak and keeps `style="--gap: 0"` working (checked).
- **Compact doesn't reach layout.** PRINCIPLES says a compact container tightens nested layout gaps. No primitive reads `--ui-sizing`.
- **The sidebar hides its links off-screen and leaves them focusable.** Below 48em every `.sidebar` becomes `position: fixed` and `translateX(-100%)`, opt-in or not. At 600px its link sits at −320px and takes focus (checked), so a keyboard user tabs into an invisible panel (WCAG 2.4.7, 2.4.11). It opens with an `.is-open` class and no script contract. `translateX(-100%)` moves it the wrong way in right-to-left. Its shadow is a literal `rgba()`, its z-index an undefined `--z-modal`.
- **Viewport queries outside the app shell.** PRINCIPLES allows media queries only in the app shell. The grid's `sm:` … `xl:` classes, split's `--auto-below-*`, `split--stretch`, `main--viewport` and the sidebar drawer all use the viewport.
- **Variants nobody uses.** Split's 14 responsive variants have no uses: the base already wraps when the main pane gets too narrow.
- **Three overlapping rows.** `.inline` doesn't wrap and centres its items; `.cluster` wraps, stretches its items and is `inline-flex`, so it sits in a line of text and doesn't fill its parent (checked); `.inline-responsive` is a column that becomes a row. Authors pick one, then add `align-items-center` (314 uses) and `justify-content-between` (108).
- **Fixed column counts don't reflow.** `grid--4-col` stays four columns at any width, so at 400% zoom the columns are a few characters wide (WCAG 1.4.10).
- **The wrapper has no gutter.** Content touches the viewport edge on small screens unless every use adds padding.
- **Leftovers:**
  - aliases: `.grid-carousel`, `split--reverse`, `sidebar--right`, `__scroller`, `.app__sidebar`, `.app__aside`, `.app__footer`, `.workspace`, `app--locked`, `main--panels`;
  - `.app` is a scroll-state container that nothing queries any more;
  - `--site-header-height`;
  - `--ruled` relies on CSS gap decorations (`rule`), which only some browsers draw.
- **Lists:** a `.stack` or `.cluster` on a `<ul>` removes its bullets, and Safari then stops announcing it as a list. Lists of items need `role="list"`.
- **Axe:**
  - the app story with several app shells fails `landmark-no-duplicate-banner`, `-main` and `-contentinfo`;
  - four sidebar stories fail `color-contrast` in dark (hard-coded `#fff` and `#e2e8f0` in inline styles);
  - one sidebar story fails `heading-order`.

## Problems found

1. Layout settings leak into every nested layout.
2. Compact density doesn't reach layout gaps.
3. A sidebar that turns into an invisible, focusable drawer on small screens.
4. Viewport queries in primitives, and 14 unused split variants.
5. Three overlapping row primitives, and utilities filling the gaps.
6. Grids that don't reflow; a wrapper with no gutter.
7. Aliases, a dead container, undefined tokens, literal values; stories built from inline styles; landmark and contrast failures.

## Where it ends

Layout primitives arrange and space their children and nothing else: no surface, no border, no viewport queries. The app shell (`.app`, `.app__workspace`, `.main`) places the page's regions and is the one place that may use the viewport. Panels that have a surface and parts (`.sidebar`, `.footer`) are organisms, like the header.

## Questions

1. **Tiers.**
   - Layout primitives: stack, inline, cluster, grid, split, wrapper.
   - App shell, still layout: `.app`, `.app__workspace`, `.main`.
   - `.sidebar` becomes an organism (`organisms/sidebar.css`): a panel with a surface, parts and sticky behaviour, like the header.
   - `.footer` moves out of `app.css` into `organisms/footer.css`, on the header's model: a band with `.footer__bar` rows capped at the site width.

   *Recommended: yes.*

2. **Settings don't leak.** Register the primitives' hooks with `@property … inherits: false` (`--gap`, `--align-items`, `--justify-content`, `--split-side-width`, `--split-main-min-width`, `--wrapper-max-width`, `--grid-min`), so `style="--gap: 0"` keeps working on the element it is set on. Remove `--display`, `--flex-wrap`, `--direction` and `--justify` (no uses). *Recommended: yes.*

3. **Compact reaches layout.** Every primitive steps its gap down under `--ui-sizing: compact` (default gap → a new Tier 2 `spacing.compact` step; `--cushioned` → the default). *Recommended: yes.*

4. **Rows.**
   - `.inline`: a row that doesn't wrap, items centred.
   - `.cluster`: a row that wraps, items centred; `display: flex`, so it fills its parent.
   - Both take `--between` (ends apart) and `--end` (packed to the end), so layout stops relying on the justify utilities.
   - `.inline-responsive--{size}` stays (a column that becomes a row in a wide enough container); the docs say it needs a container ancestor.

   *Recommended: yes.*

5. **Grid.**
   - Auto-fill by minimum item width stays the default (`--2xs` … `--2xl`, `--grid-min`).
   - `--2-col` … `--6-col` become maximum column counts: up to N columns, never narrower than the minimum width, so they reflow at zoom.
   - Remove the viewport-prefixed column classes (`sm:` … `xl:`); the container ones (`@sm:` …) stay.
   - `--carousel` stays, with its container variant. Remove `.grid-carousel` and the viewport variants.

   *Recommended: yes.*

6. **Split.** Keep the two-pane wrap, `--end`, the widths, `--three` and `--nowrap`. Remove the 14 `--auto-below-*` / `--auto-in-container-*` variants, `--reverse` and `--stretch` / `--panels` (a viewport-locked pane layout is `.app--viewport`'s job). *Recommended: yes.*

7. **Wrapper.** Add an inline gutter by default (`--wrapper-gutter`, the cushion step), with the cap applying to the content, so text never touches the screen edge. Remove the padding utilities that uses add to make up for it. Keep the sizes, `--start`, `--end` and `--middle`. *Recommended: yes.*

8. **Sidebar.**
   - It never becomes a drawer on its own. On small screens it stays in flow (the workspace stacks it), or the product puts the same navigation in a `.dialog--drawer`, which is modal, traps focus natively and closes with Escape. Remove the off-canvas rules and `.is-open`.
   - Parts: `__header`, `__body`, `__band`, `__footer`; `__body--flush` replaces `--flush`, as on the card.
   - Keep `--sticky` (offset by `--header-height`), `--end`, `--rail`, `--floating` and `--ruled`.
   - Remove `__scroller`, `--right`, `.app__sidebar` and `--site-header-height`; use the semantic shadow and z-index tokens.

   *Recommended: yes.*

9. **App shell.**
   - `.app` places header, main and footer; `.app__workspace` places side panes beside main and stacks them below 48em; `--viewport` locks the page so panes scroll.
   - `.main` keeps its padding, `--flush` and `--viewport`.
   - Remove `.app__aside`, `.app__footer`, `.workspace`, `--locked`, `main--panels` and the unused scroll-state container.

   *Recommended: yes.*

10. **Tokens.**
    - Tier 2: `spacing.compact`.
    - Tier 3: `sidebar.*` (bg, border ×3, padding, width, min-width, rail-width), `footer.*` (bg, border ×3, padding-block, padding-inline), `wrapper.*` (max-width, gutter).
    - Primitives read Tier 2 spacing only; remove the Tier 1 fallbacks.

    *Recommended: yes.*

11. **Stories, docs and the blog.**
    - Rewrite the 8 layout stories without inline styles, one app shell per story, and fix the landmark and contrast failures.
    - Rewrite `19-wrapper.md`, `19b-grid-grid-carousel.md` and `22-stack-inline-cluster.md`; add markup docs for split, sidebar, footer and the app shell. Each lists, for a `<ul>`, `role="list"`.
    - Migrate the recipes and stories that use removed names.
    - Blog:
      - convert the Sass-authored `_inline.scss` and `_split.scss` to plain CSS so `sync:blog` can mirror them;
      - sync the layout files;
      - move the sidebar and footer;
      - update the overview.

    *Recommended: yes.*

## Migration done

All recommendations taken.

- **Tiers:**
  - `.sidebar` is an organism (`organisms/sidebar.css`; `layout/sidebar.css` is gone).
  - `.footer` moved out of `layout/app.css` into `organisms/footer.css`, on the header's model: a band with `.footer__bar` rows capped at the site width. A single part fills its bar.
- **Settings don't leak:**
  - `--gap`, `--align-items`, `--justify-content`, `--grid-min` and the `--split-*` hooks are registered with `inherits: false`. Checked: an outer `--gap: 0` leaves an inner stack at 16px.
  - Each primitive's file registers what it reads, so a file works on its own.
  - `--wrapper-max-width` is not registered. It is a Tier 3 token on `:root`, and a non-inheriting property would never reach the wrapper. Size modifiers now set a private variable, so a nested wrapper no longer inherits its parent's size.
  - `--split-sidebar-width` was renamed `--split-side-width`.
- **Compact:**
  - Each primitive steps its gap down under `--ui-sizing: compact`: the default to `spacing.compact` (8px), `--cushioned` to the default, and the split's cushion gap to the default.
  - Checked: 8px and 16px in a `.ui-compact` region.
- **Rows:**
  - `.inline` doesn't wrap and centres its items.
  - `.cluster` wraps, centres its items and is `display: flex`.
  - Both have `--between` and `--end`. `.inline--between` no longer sets a width.
- **Grid:**
  - `--1-col` … `--6-col` are maximum counts with a minimum width: the `2xs` step, or a size modifier.
  - The `@sm:`/`@md:`/`@lg:` container variants set the count, one column below.
  - Checked: 4 columns at 1000px, 2 at 300px; `@md:grid--3-col` gives 3 in a 1000px container and 1 in a 600px one.
  - Removed the viewport classes, `.grid-carousel`, its `--bleed` alias, and the viewport carousels. Smooth scrolling is only on without reduced motion.
- **Split:** removed the 14 auto variants, `--auto`, `--reverse`, `--stretch` / `--panels` and `--cushioned` (the default gap is already the cushion).
- **Wrapper:**
  - The gutter (`--wrapper-gutter`) pads each side, and the cap applies to the content.
  - A nested wrapper has no gutter. `.main:has(> .wrapper)` drops its own inline padding.
  - Checked: wrapped content starts at the same x as the header bar's.
  - Wrappers on cards became `max-width-*` with `margin-inline-auto`, because a gutter would pad the card.
- **Sidebar:**
  - Removed the drawer rules, `.is-open`, `__scroller`, `--flush` (now `__body--flush`), `--right`, `.app__sidebar` and `--site-header-height`.
  - The sticky offset is `--header-height`, set only while a sticky header is on the page (`:root:has(.header--sticky)`); otherwise 0.
  - Its z-index is gone: two sticky elements at the same z-index meant the sidebar painted over the header.
  - Checked: at a 200px scroll it sits at 64px, under the header.
- **App shell:**
  - `.app` has three rows (header, main or workspace, footer).
  - Removed `.app__aside`, `.app__footer`, `.workspace`, `--locked`, `.main--panels` and the scroll-state container.
  - The workspace stacks below 48em, and its side panes go full width there.
  - In `--viewport` the main scrolls. Checked: the document is the screen height and the main scrolls 1023px inside 694px.
- **Tokens:**
  - Tier 2: `spacing.compact`.
  - Tier 3:
    - `sidebar.*` (8);
    - `footer.*` (8, including `gap` and `max-width`, as on the header);
    - `wrapper.*` (2).
  - The primitives' Tier 1 fallbacks are gone.
- **Docs site:**
  - The sidebar relied on the automatic drawer. It is now a sticky sidebar hidden below `md`, plus the same navigation (`SidebarNav.astro`, rendered twice with different ids) in a `.dialog--drawer`. The header's menu button opens it with `command="show-modal"`.
  - The drawer opens from the end. A start-side drawer is noted for the dialog pass.
  - The table of contents uses `__body` and the width tokens.
  - Viewport grid classes became column counts.
- **Stories:**
  - The 8 layout stories were rewritten with no inline styles, except the hooks they demonstrate, and one app shell per story.
  - The sidebar and footer stories moved to Organisms.
  - Axe passes on all 37 in light and dark.
- **Migrated:**
  - the cadence recipe (`__body`, `--align-items: stretch` in place of `--stretch`, footer utilities);
  - the deck and responsive-helper stories (hook renames);
  - the command palette, app header, tally and cadence cards (no wrapper);
  - `24-tabs.md`.
- **Markup docs:**
  - rewritten: `19-wrapper.md`, `19b-grid-grid-carousel.md`, `22-stack-inline-cluster.md`;
  - new: `19c-split.md`, `19d-app-shell.md`, `34-sidebar.md`, `35-footer.md`.
- **Rule utility** (asked for during the pass): the unused `.ruled` utility became `.rule`, with `.column-rule` and `.row-rule`, for flex and grid containers that aren't primitives.

## Follow-up: content out of reach

Found in Cadence: from 48rem wide, `.main--viewport` hid its overflow (`main.css` loads after `app.css`, so its `overflow: hidden` beat the shell's `overflow-y: auto` for the main). Whenever the panes stacked, or the sticky station header and the deck outgrew the screen (even at 1280×800), the rest of the main couldn't be scrolled to.

- **Rule:** a locked region scrolls, never clips. `.main--viewport` is now `overflow-y: auto` with `overscroll-behavior: contain`: panes that fit still scroll on their own, and when they don't, the main scrolls. The shell and workspace still clip, because their rows and panes are sized to fit.
- **`.split--three`** didn't wrap, so at phone width its fixed start and end panes pushed the page sideways (465px in 375px). It now wraps like the two-pane split: the centre keeps `--split-main-min-width`, and a side pane that no longer fits takes its own full-width row. `--nowrap` keeps the old one-row behaviour.
- **`npm run check:layout`** (`scripts/check-layout.mjs`): loads stories from the built Storybook in headless Chrome at 5 widths × 2 heights and reports a clipping element with visible content beyond its edge and no scroller in between, and a page wider than the screen. It found the Cadence bug (29 cases) and the three-pane overflow; both now pass. New story: Layout/App Shell → Viewport with panes.

