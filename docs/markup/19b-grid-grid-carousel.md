---
title: Grid
tier: layout
summary: Columns that fill the width and reflow on their own, or a row that scrolls and snaps.
storybook: layout-grid
related: [split, stack-inline-cluster, wrapper, card, responsive-visibility]
---

# 19b. Grid
```html live
<ul class="grid grid--xs" role="list">
  <li class="card"><p class="text">Ferns</p></li>
  <li class="card"><p class="text">Hostas</p></li>
  <li class="card"><p class="text">Grasses</p></li>
</ul>
```

## Purpose
A set of like things should fill the space it's given, whatever that space turns out to be. So a Grid has no breakpoints. It takes a minimum width for an item and fits as many columns as it can.

That also makes it hold up under zoom. Zooming in narrows the space in CSS terms, so the columns drop away by themselves and nothing overflows. A column count is only a maximum, and an item still won't go below its minimum.

The carousel is the same list in one row, scrolled by the browser. It adds no script and no arrows, so trackpads, touch and focus all work as they do on any other scroller.

## When to use
- **For a set of like items** (Cards, link lists) in as many columns as fit.
- **For a row that scrolls,** with `--carousel`.
- **Not for two panes of different widths:** that is a [Split](19c-split.md).
- **Not for one row or column of things:** that is an Inline, a Cluster or a [Stack](22-stack-inline-cluster.md).
- **Not for data:** that is a [Table](13-table.md).

## Rules
- **Lists:** a list grid loses its markers, so give it `role="list"`.
- **Carousel:** scrolls by trackpad, touch, or the keyboard as focus moves through its items. If the items hold nothing focusable, give the Grid `tabindex="0"` and an `aria-label` so keyboard users can scroll it. Smooth scrolling only without reduced motion.
- **Container variants** need a container ancestor (`.container-inline`, a Card, the Header, a Split); without one they never apply.

## As many columns as fit
As many columns as fit, each at least 16rem.

```html live
<ul class="grid grid--xs" role="list">
  <li class="card"><p class="text">Astrantia</p></li>
  <li class="card"><p class="text">Brunnera</p></li>
</ul>
```

## At most a number of columns
At most three columns, each at least 16rem.

```html live
<div class="grid grid--3-col grid--xs">
  <div class="card"><p class="text">Spring</p></div>
  <div class="card"><p class="text">Summer</p></div>
  <div class="card"><p class="text">Autumn</p></div>
</div>
```

One column, three once its container is 48rem wide.

```html live
<div class="container-inline">
  <div class="grid @3xl:grid--3-col">
    <div class="card"><p class="text">Sun</p></div>
    <div class="card"><p class="text">Part shade</p></div>
    <div class="card"><p class="text">Full shade</p></div>
  </div>
</div>
```

## One row that scrolls
Each Card holds a Link, so focus scrolls the row.

```html live
<ul class="grid grid--carousel grid--xs" role="list">
  <li class="card"><a href="/ferns" class="link link--plain link--stretched">Ferns</a></li>
  <li class="card"><a href="/hostas" class="link link--plain link--stretched">Hostas</a></li>
  <li class="card"><a href="/grasses" class="link link--plain link--stretched">Grasses</a></li>
  <li class="card"><a href="/bulbs" class="link link--plain link--stretched">Bulbs</a></li>
  <li class="card"><a href="/climbers" class="link link--plain link--stretched">Climbers</a></li>
  <li class="card"><a href="/shrubs" class="link link--plain link--stretched">Shrubs</a></li>
</ul>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Give the Grid a maximum column count and let it reflow. | Set columns at viewport breakpoints. |
| Give a list grid `role="list"`. | Leave a list without its role once its markers are gone. |
| Make a carousel of unfocusable items a named tab stop. | Leave a row that keyboard users can't scroll. |
| Give container variants a container ancestor. | Expect `@3xl:` to apply with no container. |
| Use `--gap` and `--grid-min` on the Grid itself. | Expect them to reach a nested grid. |

## Reference
Columns that fill the width. Items are never narrower than a minimum width, so the Grid reflows as space narrows or text is zoomed, without breakpoints. A layout primitive (`layout/grid.css`).

## Options
| Modifier | Effect |
| :--- | :--- |
| default, `--2xs` … `--2xl` | Auto-fill columns with the block step as the minimum width (default: the base block step, 36rem) |
| `--auto-fit` | Too few items to fill a row share it |
| `--1-col` … `--6-col` | At most N columns, never narrower than the minimum (the `2xs` step, 8rem, unless a size is set) |
| `@xs:` … `@7xl:` + `grid--N-col` | The column count once the nearest container reaches the size (Tailwind's container scale: `xs` 20rem, `sm` 24, `md` 28, `lg` 32, `xl` 36, `2xl` 42, `3xl` 48, `4xl` 56, `5xl` 64, `6xl` 72, `7xl` 80); one column below |
| `--carousel` | One row that scrolls and snaps, with a peek of the next item |
| `@max-3xl:grid--carousel` | A carousel only in a container narrower than 48rem |
| `--carousel-bleed` | The carousel runs into the page's cushion, to the screen edge. A carousel straight inside a Wrapper does this on its own, into the Wrapper's gutter |
| `--tight`, `--cushioned`, `--ruled` | No gap, the cushion step, a rule in each gap |

### Further rules
- **Hooks:** `--gap` and `--grid-min`, set on the Grid itself. They don't reach a nested grid. A `gap-*` utility sets `--gap`, so the column count allows for it; `gap-x-*` doesn't, so on a `grid--N-col` it can push the last column to the next row.
- **Density:** inside a compact region (`.ui-compact`, a `--compact` container) the gap steps down: the default to the compact step, `--cushioned` to the default.
