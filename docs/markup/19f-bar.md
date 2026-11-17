---
title: Bar
tier: layout
summary: One row in three zones, a start, a centre and an end, with the centre in the middle of the row whatever the ends hold.
storybook: layout-bar
related: [split, stack-inline-cluster, header, modal-dialog, button]
---

# 19f. Bar
```html live
<div class="bar">
  <button type="button" class="button button--plain button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#arrow-left"/></svg><span class="sr-only">Back</span></button>
  <h2 class="small-heading">Edit bed</h2>
  <button type="button" class="button button--plain button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg><span class="sr-only">Close</span></button>
</div>
```

## Purpose
Some rows have a middle that belongs in the middle: a Dialog's title between Back and Close, a player's controls between the time and the volume, "Step 2 of 4" between Back and Next. In a [Split](19c-split.md) or a [Cluster](22-stack-inline-cluster.md) the middle drifts towards the shorter end, so a title moves whenever one side gains a Button.

The Bar keeps the centre centred. Its two ends share the room the centre leaves, so with room the centre sits exactly in the middle. When room runs short it gives way in a sensible order: the ends keep their content's width, the centre moves off-centre only as far as it must, then its text wraps. Nothing overlaps.

## When to use
- **For a row with a true centre:** an app or Dialog header, a media player, an editor toolbar, a wizard's footer.
- **Not for two things pushed apart:** that's an Inline or a Cluster with `--between`.
- **Not for panes of content side by side:** that's a [Split](19c-split.md).

## Rules
- **Three zones, in order:** the first child is the start, the last the end, any between the centre. Two children are a start and an end. Leave a zone empty with an empty element, so the others stay in place.
- **Reading and focus order** run start, centre, end, as in the markup.
- **Never shorter than its targets:** a Bar is at least the target height (48px on touch).
- **Ends that don't fit:** the ends never shrink, so on a phone make their Buttons icon-only with a `hide-labels` condition, such as `max-md:hide-labels` on the Bar.
- **A field in the centre:** give the input `w-full` and a `size` (its width where there's room), and its form `w-full` with a cap such as `max-w-sm`. A fixed width won't shrink on a phone.

## A Dialog's header
`bar` on the Card's header: the header keeps its padding, and the Bar lays out its row.

```html live width=sm
<article class="card" aria-labelledby="bed-title">
  <header class="card__header bar">
    <button type="button" class="button button--plain button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#arrow-left"/></svg><span class="sr-only">Back to beds</span></button>
    <h2 id="bed-title" class="small-heading">Bed 3</h2>
    <button type="button" class="button button--plain button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg><span class="sr-only">Close</span></button>
  </header>
  <div class="card__body"><p class="text">Shade border, north wall. Hellebores, Brunnera and ferns.</p></div>
</article>
```

## An app header with search in the centre
`bar` on a [Header](33-header.md) bar. The search field is as wide as its `size` where there's room and shrinks where there isn't, and below 64rem the Buttons show only their icons and the Brand only its Mark, so the field keeps room on a phone.

```html live
<header class="header">
  <div class="header__bar bar @max-5xl:hide-labels">
    <a href="#main" class="brand"><svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#brand-design-for-humans"/></svg><span class="brand__name">Woodland</span></a>
    <form role="search" aria-label="Plants" class="max-w-sm w-full">
      <input type="search" class="input input--subtle w-full" size="40" placeholder="Search plants" aria-label="Search plants">
    </form>
    <button type="button" class="button"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#share-2"/></svg><span>Share</span></button>
  </div>
</header>
```

## A wizard's footer
```html live
<div class="bar">
  <button type="button" class="button"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#arrow-left"/></svg><span>Back</span></button>
  <p class="small-text text-muted">Step 2 of 4</p>
  <button type="button" class="button button--strong button--accent"><span>Next</span><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#arrow-right"/></svg></button>
</div>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Use a Bar when the middle must stay in the middle | Centre a title with padding that guesses the ends' widths |
| Leave an empty zone as an empty element | Drop the start and expect the centre to stay put |
| Make the ends icon-only on a phone with `hide-labels` | Let the ends push the row wider than the screen |

## Reference

## Options
| Option | Class or hook | Notes |
| :--- | :--- | :--- |
| Gap | `--gap` | Default the spacing step, the compact step under `--ui-sizing: compact` |
| Cross-axis alignment | `--align-items` | Default `center` |

### Further rules
- **How it sizes:** a grid of `minmax(max-content, 1fr) minmax(min-content, auto) minmax(max-content, 1fr)`. The ends take equal shares of what the centre leaves and never less than their content; the centre takes its content's width and never less than its longest word.
- **Cutting the centre short:** add `truncate` to the centre's text to keep it on one line with an ellipsis.
- **Hooks stay put:** `--gap` and `--align-items` are registered with `inherits: false`, so a Bar inside another layout doesn't take its settings.
- **On a component part:** `bar` on a `card__header` or a `header__bar` lays out that part's row and keeps its padding.

### Markup
```html
<div class="bar">
  <div>…start…</div>
  <h2 class="small-heading">…centre…</h2>
  <div>…end…</div>
</div>
```
