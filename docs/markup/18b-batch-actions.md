# 18b. Batch Actions

The bar shown while items are selected: how many, the actions on them, and a way to clear the selection. It is a placement and a frame around a summary and a button group (§14). The audit is in `docs/audit/action-sets.md`.

| Option | Values |
| :--- | :--- |
| Placement | floating (default; fixed at the bottom centre of the viewport), `--docked` (sticks to the bottom of its scroll container), `--inline` (in flow) |
| Prominence | default (layer surface and border; a shadow when floating), `--strong` (inverted), `--plain` (no surface) |
| Corners | `--round` |
| Density | `--compact` (sets `--ui-sizing: compact`) |

- **A group, not a toolbar.** The bar is a `<div role="group">` with a label naming what is selected. `role="toolbar"` promises arrow keys between its controls; use it only if the product adds that script.
- **Summary.** Text in an element with `role="status"` (`.batch-actions__summary`), so a changed count is announced. Keep the bar in the page and toggle `hidden`, so the live region exists before the count changes. No count badge: the text already says it.
- **Actions** are a button group with `.batch-actions__actions`. **Dismiss** (`.batch-actions__dismiss`) sits at the end and clears the selection.
- **Hiding.** Set `hidden`; the bar fades and slides away (fades only when inline or with reduced motion).
- **Dividers** between the parts stand upright; they are decorative here, so `aria-hidden="true"`.

## A. Floating
```html
<div class="batch-actions" role="group" aria-label="Selected files" hidden>
  <p class="batch-actions__summary small-heading" role="status">3 selected</p>
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
    <span class="visually-hidden">Clear selection</span>
  </button>
</div>
```

## B. Docked in a Card
```html
<article class="card">
  <header class="card__header">…</header>
  <div class="card__body card__body--scrollable" tabindex="0" aria-label="Plants">…</div>
  <div class="batch-actions batch-actions--docked" role="group" aria-label="Selected plants">
    <p class="batch-actions__summary small-heading" role="status">2 selected</p>
    <div class="batch-actions__actions button-group">
      <button type="button" class="button button--strong button--accent"><span>Archive</span></button>
    </div>
    <button type="button" class="button button--plain batch-actions__dismiss"><span>Deselect all</span></button>
  </div>
</article>
```

## C. Strong and Round
```html
<div class="batch-actions batch-actions--strong batch-actions--round" role="group" aria-label="Selected photos">…</div>
```
