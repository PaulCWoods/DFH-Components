---
title: Stack, Inline and Cluster
tier: layout
summary: One-dimensional flows that space their children in a column, a row or a wrapping row.
storybook: [layout-stack, layout-inline, layout-cluster]
related: [grid-grid-carousel, split, wrapper, button-group, utilities]
---

# 22. Stack, Inline & Cluster
```html live
<div class="stack">
  <div class="card"><p class="text">A stack is a column.</p></div>
  <div class="inline inline--between">
    <p class="text">An inline is a row that never wraps.</p>
    <button type="button" class="button">Edit</button>
  </div>
  <ul class="cluster" role="list">
    <li><span class="chip"><span class="chip__text">A cluster</span></span></li>
    <li><span class="chip"><span class="chip__text">is a row</span></span></li>
    <li><span class="chip"><span class="chip__text">that wraps</span></span></li>
  </ul>
</div>
```

## Purpose
Space between things belongs to the group, not to the things. A child with its own margin brings that margin everywhere it goes, and whoever uses it next has to cancel it. With a flow, the parent sets one gap and any child can go in it.

There are three because rows fail in two different ways. A row that never wraps has to have something that shrinks, or it overflows at large text. A row that wraps must be free to break anywhere. Choosing between Inline and Cluster is choosing which of those you have, and that choice is what keeps a layout working at 200% zoom.

They take no sizes or surfaces, and their settings stay on the element they're set on. A gap set on an outer Stack doesn't reach a Stack nested inside it.

## When to use
- **`.stack` for a column** of things.
- **`.inline` for a row whose last item can shrink,** such as an icon and its text.
- **`.cluster` for a row that should wrap,** such as actions and tags.
- **Not for columns of like items:** that is a [Grid](19b-grid-grid-carousel.md).
- **Not for two panes:** that is a [Split](19c-split.md).

## Rules
- **Inline or Cluster:** `.inline` never wraps, so its last item must be able to shrink (text, a scrolling Tab List). Anything that should wrap at narrow widths or large text (actions, tags) is a `.cluster`.
- **A responsive Inline** needs a container ancestor (`.container-inline`, a Card, the Header, a Split); without one it stays a column.
- **Lists:** a list stack, inline or cluster loses its markers, so give it `role="list"`.

## Stack: a Column
```html live
<div class="stack">
  <div class="card"><p class="text">Sow in spring.</p></div>
  <div class="card"><p class="text">Thin in early summer.</p></div>
</div>
```

## Inline: a Row Whose Last Item Can Shrink
```html live
<p class="inline gap-xs"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Light"/></svg><span>Part shade</span></p>

<div class="inline inline--between">
  <h3 class="small-heading">Shade border</h3>
  <button type="button" class="button">Edit</button>
</div>
```

## Cluster: a Row That Wraps
```html live
<ul class="cluster" role="list">
  <li><span class="chip"><span class="chip__text">Shade</span></span></li>
  <li><span class="chip"><span class="chip__text">Moist soil</span></span></li>
</ul>

<div class="cluster cluster--end">
  <button type="button" class="button">Cancel</button>
  <button type="button" class="button button--strong button--accent">Save</button>
</div>
```

## A Column Until There Is Room
```html live
<div class="container-inline">
  <div class="stack @2xl:inline">
    <div class="card"><p class="text">A column at first</p></div>
    <div class="card"><p class="text">A row once the container is 42rem wide</p></div>
  </div>
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Let the flow space its children. | Set margins on the children. |
| Use a `.cluster` for actions and tags. | Use an `.inline` for anything that should wrap. |
| Give a list stack, inline or cluster `role="list"`. | Lose the list's semantics with its markers. |
| Use `.inline--between` to push items to the ends. | Add `.justify-between` or `.items-center` to an Inline. |
| Let the gap separate the content on its own. | Rely on `--ruled` alone to divide it. |

## Reference
One-dimensional flows. Layout primitives (`layout/stack.css`, `layout/inline.css`, `layout/cluster.css`): children don't set their own margins; the flow spaces them.

## Options
| Primitive | Direction | Wraps | Cross-axis default |
| :--- | :--- | :--- | :--- |
| `.stack` | Column | – | Stretch |
| `.inline` | Row | No | Centre |
| `.cluster` | Row | Yes | Centre |
| `.stack.@{size}:inline` | Column, a row once its container reaches the size (`xs` 20rem … `7xl` 80rem, the container scale) | No | Stretch, then centre |

| Modifier | On | Effect |
| :--- | :--- | :--- |
| `--tight` | all | No gap |
| `--cushioned` | all | The cushion step |
| `--ruled` | all | A rule in each gap, where `rule` is supported |
| `--between` | inline, cluster | The first and last items at the two ends |
| `--end` | inline, cluster | Items packed to the end |

### Further rules
- **Hooks:** `--gap`, `--align-items`, `--justify-content`, set on the element itself. They don't reach nested layouts, so `style="--gap: 0"` on an outer stack leaves an inner stack alone. A gap utility (`gap-xs`) also works and wins.
- **Density:** inside a compact region the gap steps down: the default to the compact step (`spacing.compact`), `--cushioned` to the default.
- **Rules elsewhere:** `--ruled` is for the primitives. For any other flex or grid container (a Button Group, a Card body), use the `.rule` utility, or `.column-rule` / `.row-rule` for one axis. Gap decorations are progressive enhancement (not yet in Safari or Firefox): the gap alone must still separate the content.
- **Cluster** is `display: flex` and fills its parent; it was `inline-flex`.
