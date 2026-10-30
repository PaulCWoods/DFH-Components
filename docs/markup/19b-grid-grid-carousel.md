# 19b. Grid
Columns that fill the width. Items are never narrower than a minimum width, so the grid reflows as space narrows or text is zoomed, without breakpoints. A layout primitive (`layout/grid.css`).

| Modifier | Effect |
| :--- | :--- |
| default, `--2xs` … `--2xl` | Auto-fill columns with the block step as the minimum width (default: the base block step, 36rem) |
| `--auto-fit` | Too few items to fill a row share it |
| `--1-col` … `--6-col` | At most N columns, never narrower than the minimum (the `2xs` step, 8rem, unless a size is set) |
| `@xs:` … `@7xl:` + `grid--N-col` | The column count once the nearest container reaches the size (Tailwind's container scale: `xs` 20rem, `sm` 24, `md` 28, `lg` 32, `xl` 36, `2xl` 42, `3xl` 48, `4xl` 56, `5xl` 64, `6xl` 72, `7xl` 80); one column below |
| `--carousel` | One row that scrolls and snaps, with a peek of the next item |
| `@max-3xl:grid--carousel` | A carousel only in a container narrower than 48rem |
| `--carousel-bleed` | The carousel runs into the page's cushion, to the screen edge |
| `--tight`, `--cushioned`, `--ruled` | No gap, the cushion step, a rule in each gap |

## A. Markup
```html
<!-- As many columns as fit, each at least 16rem -->
<ul class="grid grid--xs" role="list">
  <li class="card">…</li>
</ul>

<!-- At most three columns, each at least 16rem -->
<div class="grid grid--3-col grid--xs">…</div>

<!-- One column, three once its container is 48rem wide -->
<div class="grid @3xl:grid--3-col">…</div>

<!-- A carousel: each card holds a link, so focus scrolls the row -->
<ul class="grid grid--carousel grid--xs" role="list">…</ul>
```

## B. Rules
- **Hooks:** `--gap` and `--grid-min`, set on the grid itself. They don't reach a nested grid.
- **Density:** inside a compact region (`.ui-compact`, a `--compact` container) the gap steps down: the default to the compact step, `--cushioned` to the default.
- **Lists:** a list grid loses its markers, so give it `role="list"`.
- **Carousel:** scrolls by trackpad, touch, or the keyboard as focus moves through its items. If the items hold nothing focusable, give the grid `tabindex="0"` and an `aria-label` so keyboard users can scroll it. Smooth scrolling only without reduced motion.
- **Container variants** need a container ancestor (`.container-inline`, a card, the header, a split); without one they never apply.
- **Removed:** viewport-prefixed column classes (`sm:grid--N-col` … `xl:`, `md:grid`, `md:grid--auto-fit`); `.grid-carousel` and `--bleed` aliases; viewport carousels (`max-md:grid--carousel`, `max-sm:`, `md-max:`, `grid--carousel-below-md`); `@max-md:carousel`; `@sm:`, `@md:`, `@lg:` at 40, 48 and 60em (now `@2xl:`, `@3xl:`, `@5xl:`) and `@max-md:grid--carousel` (now `@max-3xl:`), in the utilities pass. Use a column count (it reflows on its own) or a container variant.
