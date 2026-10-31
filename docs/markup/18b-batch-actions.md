---
title: Batch Actions
tier: molecule
summary: The bar shown while items are selected, with how many, the actions on them and a way to clear the selection.
tokens: batch-actions
storybook: molecules-batch-actions
related: [button-group, button, divider, card, table]
---

# 18b. Batch Actions
```html playground
<!-- --inline keeps it in the page here; the default floats -->
<div class="batch-actions batch-actions--inline" data-axes role="group" aria-label="Selected documents">
  <p class="batch-actions__summary small-heading">3 selected</p>
  <hr class="divider" aria-hidden="true">
  <div class="batch-actions__actions button-group buttons-subtle">
    <button type="button" class="button">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
      <span>Export</span>
    </button>
    <button type="button" class="button button--danger">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
      <span>Delete</span>
    </button>
  </div>
  <hr class="divider" aria-hidden="true">
  <button type="button" class="button button--plain button--icon batch-actions__dismiss">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Clear selection</span>
  </button>
</div>
---
Prominence: Default, Strong=batch-actions--strong, Plain=batch-actions--plain
Corners: Rounded, Round=batch-actions--round
Density: Default, Compact=batch-actions--compact
```

## Why it exists
Selecting many things is only worth the effort if the actions are close by and it's clear how many they will touch. This bar exists for as long as a selection does, and it floats so it stays in reach however far the list has scrolled.

The count is announced as well as shown, because someone who can't see the bar still needs to know how many items Delete will affect. A Badge would only repeat it.

It is a labelled group of ordinary Buttons, and it never claims to be a toolbar. A toolbar promises arrow keys between its controls, which takes a script the library doesn't ship, and Tab already works.

## When to use
- **While items in a list or Table are selected,** for actions on all of them.
- **Not for actions on one item:** those are Buttons in its row, or a [Menu](03b-menu.md).
- **Not for related controls with nothing selected:** that is a [Button Group](14-button-group.md).

## Rules
- **A group, not a toolbar.** The bar is a `<div role="group">` with a label naming what is selected. `role="toolbar"` promises arrow keys between its controls; use it only if the product adds that script.
- **Summary.** Text in `.batch-actions__summary`. No count Badge: the text already says it.
- **Announcing.** A `hidden` bar isn't in the accessibility tree, so a live region inside it would miss the first count. Keep an empty `role="status"` element in the page, outside the bar, and have the script put the count in it as the selection changes.
- **Actions** are a Button Group with `.batch-actions__actions`. **Dismiss** (`.batch-actions__dismiss`) sits at the end and clears the selection.
- **Dividers** between the parts stand upright; they are decorative here, so `aria-hidden="true"`.

## Keyboard and screen readers
The browser handles the Buttons. Filling the status element is the product's script, and so is focus after the bar goes.
- **Tab** moves through the actions in order, and **Enter or Space** presses one. There are no arrow keys.
- **The floating bar sits over the page,** so leave room at the end of the list, or a focused item can end up behind it (WCAG 2.4.11).
- **Clearing the selection** hides the bar with the Dismiss Button in it, and focus would go with it. The script moves focus back to the list.
- **A screen reader** hears the bar's label as it enters the group, and the new count each time it changes.

## Floating
```html
<p class="sr-only" role="status"></p>
<div class="batch-actions" role="group" aria-label="Selected files" hidden>
  <p class="batch-actions__summary small-heading">3 selected</p>
  <hr class="divider" aria-hidden="true">
  <div class="batch-actions__actions button-group buttons-subtle">
    <button type="button" class="button">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
      <span>Export</span>
    </button>
    <button type="button" class="button button--danger">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
      <span>Delete</span>
    </button>
  </div>
  <hr class="divider" aria-hidden="true">
  <button type="button" class="button button--plain button--icon batch-actions__dismiss">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Clear selection</span>
  </button>
</div>
```

## Docked in a Card
```html live width=md
<article class="card max-h-xs">
  <header class="card__header"><h3 class="card__title small-heading">Plants</h3></header>
  <div class="card__body card__body--scrollable" role="group" tabindex="0" aria-label="Plants">
    <ul class="list">
      <li>Fern</li>
      <li>Foxglove</li>
      <li>Hosta</li>
      <li>Lavender</li>
      <li>Rosemary</li>
      <li>Sage</li>
      <li>Thyme</li>
      <li>Yarrow</li>
    </ul>
  </div>
  <div class="batch-actions batch-actions--docked" role="group" aria-label="Selected plants">
    <p class="batch-actions__summary small-heading">2 selected</p>
    <div class="batch-actions__actions button-group">
      <button type="button" class="button button--strong button--accent"><span>Archive</span></button>
    </div>
    <button type="button" class="button button--plain batch-actions__dismiss"><span>Deselect all</span></button>
  </div>
</article>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use `role="group"` with a label naming what is selected. | Use `role="toolbar"` without the arrow-key script. |
| Say the count as text, and announce it from a `role="status"` element outside the bar. | Add a count Badge. |
| Keep that status element in the page from the start. | Put the live region inside the hidden bar, so the first count goes unannounced. |
| Hide Dividers in the bar with `aria-hidden="true"`. | Have decorative Dividers read as separators. |
| Keep the most used actions first in a scrollable bar. | Leave the main action where it must be scrolled to. |

## Reference
The bar shown while items are selected: how many, the actions on them, and a way to clear the selection. It is a placement and a frame around a summary and a [Button Group](14-button-group.md).

## Options
| Option | Values |
| :--- | :--- |
| Placement | floating (default; fixed at the bottom centre of the viewport), `--docked` (sticks to the bottom of its scroll container), `--inline` (in flow) |
| Prominence | default (layer surface and border; a shadow when floating), `--strong` (inverted), `--plain` (no surface) |
| Corners | `--round` |
| Density | `--compact` (sets `--ui-sizing: compact`) |
| Overflow | wraps by default; `--scrollable` keeps one row |

### Further rules
- **Hiding.** Set `hidden`; the bar fades and slides away (fades only when inline or with reduced motion).

## Scrollable
```html live width=md
<div class="batch-actions batch-actions--inline batch-actions--scrollable" role="group" aria-label="Selected reports">
  <p class="batch-actions__summary small-heading">12 selected</p>
  <hr class="divider" aria-hidden="true">
  <div class="batch-actions__actions button-group buttons-subtle">
    <button type="button" class="button"><span>Export</span></button>
    <button type="button" class="button"><span>Duplicate</span></button>
    <button type="button" class="button"><span>Move</span></button>
    <button type="button" class="button"><span>Share</span></button>
    <button type="button" class="button button--danger"><span>Delete</span></button>
  </div>
  <hr class="divider" aria-hidden="true">
  <button type="button" class="button button--plain button--icon batch-actions__dismiss">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Clear selection</span>
  </button>
</div>
```
- For narrow spaces and long action lists. The summary and the dismiss Button stay in place; only the actions scroll.
- Each edge of the actions fades while there is more to scroll that way (the shared scroll fade, `utilities/scroll-fade.css`). It follows the writing direction. Without scroll-driven animations the actions still scroll, without the fade.
- Tab reaches every action and scrolls it into view; focus rings aren't clipped. Keep the most used actions first.

## Strong and Round
`.batch-actions--strong.batch-actions--round` on the bar. It floats by default; `--inline` keeps it in the page here.
```html live
<div class="batch-actions batch-actions--strong batch-actions--round batch-actions--inline" role="group" aria-label="Selected photos">
  <p class="batch-actions__summary small-heading">5 selected</p>
  <div class="batch-actions__actions button-group buttons-subtle">
    <button type="button" class="button"><span>Share</span></button>
  </div>
  <button type="button" class="button button--plain button--icon batch-actions__dismiss">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Clear selection</span>
  </button>
</div>
```
