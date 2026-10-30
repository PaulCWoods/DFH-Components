# 19c. Split
Two panes side by side: a side pane at its preferred width and a main pane that takes the rest. When the main pane would be narrower than its minimum, the panes wrap and each takes the full width. No breakpoint is needed, and it works at any zoom. A layout primitive (`layout/split.css`).

| Modifier | Effect |
| :--- | :--- |
| `--2xs` … `--2xl` | The side pane's width (default `--xs`, 16rem) |
| `--end` | The side pane is the last child |
| `--nowrap` | Never wrap: the side pane keeps its width, the main shrinks |
| `--three` | Start, centre and end panes; start and end at their width or their content's, the centre takes the rest. When the centre would drop below its minimum, a side pane wraps to its own full-width row. With `--nowrap`, one row always |
| `--tight`, `--ruled` | No gap; a rule in the gap |

## A. Markup
```html
<div class="split split--xs">
  <nav class="card" aria-label="Plant groups">…</nav>
  <div class="stack">…main…</div>
</div>

<div class="split split--end">
  <div class="stack">…main…</div>
  <aside class="card" aria-label="Planting notes">…</aside>
</div>
```

## B. Rules
- **Hooks**, set on the split itself: `--gap`, `--align-items` (default `flex-start`; `stretch` for equal-height panes), `--split-side-width`, `--split-main-min-width` (default 24rem), `--split-start-width` and `--split-end-width` (for `--three`). They don't reach a nested split.
- **Density:** the gap is the cushion step; inside a compact region it steps down to the default.
- **Source order is reading order.** Put the side pane first only when it is read first (navigation, filters); use `--end` otherwise. Don't reorder with CSS.
- **Panes that scroll** (a viewport-locked workspace) are the app shell's job: `.app--viewport` with `.main--viewport`, and `--align-items: stretch` on the split.
- **Removed:** the 14 `--auto-below-*` / `--auto-in-container-below-*` variants and `--auto` (the split wraps on its own); `--reverse` (use `--end`); `--stretch` / `--panels`; `--cushioned` (the default gap is the cushion); `--split-sidebar-width` (now `--split-side-width`), `--split-min-width` (now `--split-main-min-width`).
