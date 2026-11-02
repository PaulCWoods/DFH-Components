---
title: Split
tier: layout
summary: Two panes side by side, a side pane at its preferred width and a main pane taking the rest.
storybook: layout-split
related: [grid-grid-carousel, app-shell, sidebar, stack-inline-cluster]
---

# 19c. Split
```html live
<div class="split split--xs">
  <div class="card"><p class="text">The side pane, 16rem wide.</p></div>
  <div class="card"><p class="text">The main pane takes the rest, and the panes wrap when it would get too narrow.</p></div>
</div>
```

## Purpose
Filters beside results, or notes beside an article: one pane has a width it wants, and the other should get everything else. When there isn't room for both, they should simply stack.

A Split decides that from the space it actually has, so it needs no breakpoint and gives the right answer at any zoom, in any container. A breakpoint only knows about the screen.

It won't reorder its panes. The order in the source is the order a keyboard and a screen reader follow, so moving a pane with CSS would make what people see and what they reach disagree. To put the side pane last, write it last.

## When to use
- **For a side pane beside main content** in a page, with no breakpoint.
- **For three panes,** with `--three`.
- **Not for the page's own Sidebar:** that goes in the [App Shell's workspace](19d-app-shell.md) as a [Sidebar](34-sidebar.md).
- **Not for a set of like items:** that is a [Grid](19b-grid-grid-carousel.md).

## Rules
- **Source order is reading order.** Put the side pane first only when it is read first (navigation, filters); use `--end` otherwise. Don't reorder with CSS.
- **A Split can't be a pane of another split.** A pane is sized from its Split's side width, but a pane that is itself a Split reads its own instead (CSS can't read a parent's custom property past a redeclaration until `inherit()` is widely supported). Wrap the inner split in a plain `<div>`, which becomes the pane.

## The Side Pane First, or Last
```html live
<div class="split split--xs">
  <nav class="card" aria-label="Plant groups">
    <ul class="stack gap-xs" role="list">
      <li><a href="/ferns" class="link link--plain">Ferns</a></li>
      <li><a href="/hostas" class="link link--plain">Hostas</a></li>
    </ul>
  </nav>
  <div class="stack">
    <p class="text">Ferns and hostas both like a shady corner.</p>
    <p class="text">Water them through their first summer.</p>
  </div>
</div>

<div class="split split--end">
  <div class="stack">
    <p class="text">Plant in autumn, while the soil is warm.</p>
  </div>
  <aside class="card" aria-label="Planting notes"><p class="text">Planting notes: mulch after the first frost.</p></aside>
</div>
```

## Three Panes
```html live
<div class="split split--three">
  <div class="card"><p class="text">Start</p></div>
  <div class="card"><p class="text">Centre, which takes the rest</p></div>
  <div class="card"><p class="text">End</p></div>
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Let the Split wrap on its own. | Add breakpoints, or look for an `--auto` variant. |
| Use `--end` when the side pane is read last. | Reorder the panes with CSS. |
| Wrap an inner split in a plain `<div>`. | Make a Split a pane of another split. |
| Set `--align-items: stretch` for equal-height panes. | Set heights on the panes. |

## Reference
Two panes side by side: a side pane at its preferred width and a main pane that takes the rest. When the main pane would be narrower than its minimum, the panes wrap and each takes the full width. No breakpoint is needed, and it works at any zoom. A layout primitive (`layout/split.css`).

## Options
| Modifier | Effect |
| :--- | :--- |
| `--2xs` … `--2xl` | The side pane's width (default `--xs`, 16rem) |
| `--end` | The side pane is the last child |
| `--nowrap` | Never wrap: the side pane keeps its width, the main shrinks |
| `--three` | Start, centre and end panes; start and end at their width or their content's, the centre takes the rest. When the centre would drop below its minimum, a side pane wraps to its own full-width row. With `--nowrap`, one row always |
| `--tight`, `--ruled` | No gap; a rule in the gap |

### Further rules
- **Hooks**, set on the Split itself: `--gap`, `--align-items` (default `flex-start`; `stretch` for equal-height panes), `--split-side-width`, `--split-main-min-width` (default 24rem), `--split-start-width` and `--split-end-width` (for `--three`). They don't reach a nested split.
- **Density:** the gap is the cushion step; inside a compact region it steps down to the default.
- **Panes that scroll** (a viewport-locked workspace) are the App Shell's job: `.app--viewport` with `.main--viewport`, and `--align-items: stretch` on the Split.
