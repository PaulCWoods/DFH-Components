---
title: Pagination
tier: molecule
summary: Links that move between the pages of one list.
tokens: pagination
storybook: molecules-pagination
related: [button-group, button, breadcrumb, table]
---

# 17. Pagination
```html playground
<nav class="pagination button-group" data-axes aria-label="Pagination">
  <a class="button button--icon" href="/page/1">
    <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronLeft"/></svg>
    <span class="sr-only">Previous page</span>
  </a>
  <a class="button" href="/page/1"><span>1</span></a>
  <a class="button" href="/page/2" aria-current="page"><span>2</span></a>
  <a class="button" href="/page/3"><span>3</span></a>
  <a class="button button--icon" href="/page/3">
    <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronRight"/></svg>
    <span class="sr-only">Next page</span>
  </a>
</nav>
---
Prominence: Default, Subtle*=buttons-subtle
Size: Default, Small=buttons-sm
Corners: Rounded, Round=buttons-round
Edges: Separate, Joined=button-group--joined
```

## Purpose
Splitting a long list gives each part an address. People can come back to page 5, share it, or leave and return to the same place, and whatever follows the list stays within reach.

Pagination is real links in a `<nav>`, so it works with no script and a page can open in a new tab. It is a [Button Group](14-button-group.md) of those links and adds only what the group lacks: square number Buttons and a marker for skipped pages.

The page numbers already say which pages are missing, so the marker is hidden from screen readers. A missing previous or next stays in the row, so the row doesn't shift from page to page and nobody's click lands on the wrong link.

## When to use
- **For a list split over pages:** an archive, search results, a long [Table](13-table.md).
- **For a page count and a jump form,** use a [Cluster](22-stack-inline-cluster.md), as shown below. There is no page-count component.
- **Not for the trail above a page:** that is a [Breadcrumb](16-breadcrumb.md).
- **Not for the stages of a task:** that is a [Stepper](30-stepper.md).

## Rules
- **Current page:** `aria-current="page"` on its Link. The Button shows `aria-current` as selected; no class.
- **No previous or next page:** keep the control, as a Link with no `href`, `role="link"` and `aria-disabled="true"` (without an `href` it has no role of its own), so the row doesn't shift.
- **Skipped pages:** `<span class="pagination__gap" aria-hidden="true">…</span>`. The page numbers already say which pages are missing, so the marker is hidden.
- **Narrow rows:** Pagination fills its row and responds to its own width. Narrower than 30rem it keeps Previous, the current page and Next, and hides the other pages and gaps, so its 48px targets never overflow a phone. Beside other things in a row (a Card footer), it takes the room left, showing only Previous, the current page and Next when that's under 30rem, and wraps to its own line when even those don't fit; a `justify-end` utility puts its Buttons at the end. Put Previous and Next first and last.

## Keyboard and screen readers
The links behave as links, so there's nothing to script.
- **Tab** moves through the links in order, and **Enter** follows one. A Link with no `href` isn't a stop.
- **A screen reader** finds the `<nav>` by its `aria-label`, hears "current page" from `aria-current`, and hears the hidden text on the previous and next icons. It skips the gap marker.
- **A list updated by script** without loading a page has to move focus and announce the change itself.

## Skipping pages
```html live
<nav class="pagination button-group buttons-subtle" aria-label="Numbered pagination">
  <a class="button button--icon" href="/page/4">
    <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronLeft"/></svg>
    <span class="sr-only">Previous page</span>
  </a>
  <a class="button" href="/page/1"><span>1</span></a>
  <span class="pagination__gap" aria-hidden="true">…</span>
  <a class="button" href="/page/4"><span>4</span></a>
  <a class="button" href="/page/5" aria-current="page"><span>5</span></a>
  <a class="button" href="/page/6"><span>6</span></a>
  <span class="pagination__gap" aria-hidden="true">…</span>
  <a class="button" href="/page/12"><span>12</span></a>
  <a class="button button--icon" href="/page/6">
    <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronRight"/></svg>
    <span class="sr-only">Next page</span>
  </a>
</nav>
```

## Previous and next with text
```html live
<nav class="pagination button-group justify-between" aria-label="Previous and next pagination">
  <a role="link" class="button" aria-disabled="true"><span>Previous</span></a>
  <span class="small-text">Page 1 of 10</span>
  <a class="button" href="/page/2"><span>Next</span></a>
</nav>
```

## A page count and a jump form
There is no page-count component: it is a Cluster with small text and a jump form. The jump form is a Cluster holding an [inline Field](07b-form-composition.md) and its Button.
```html live
<div class="cluster cluster--between">
  <p class="small-text text-muted">Page 2 of 10</p>
  <form class="cluster" action="/archive">
    <div class="field field--inline">
      <label for="page-jump" class="field__label label">Go to page</label>
      <input class="input" type="number" id="page-jump" name="page" min="1" max="10" value="2">
    </div>
    <button class="button button--subtle" type="submit"><span>Go</span></button>
  </form>
</div>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Mark the current page with `aria-current="page"`. | Add `.is-active` as well. |
| Keep a missing previous or next as a Link with `aria-disabled="true"`. | Remove it, so the row shifts. |
| Hide the gap marker with `aria-hidden="true"`. | Have the ellipsis read aloud. |
| Use `.icon--dir` on arrows. | Use arrows that point the wrong way in right-to-left pages. |
| Align the row with a `justify-*` utility. | Add an alignment class to Pagination. |

## Reference
Moves between the pages of one list: a [Button Group](14-button-group.md) of page links. Pagination makes the number Buttons square and adds a gap marker for skipped pages; the group's options (`.buttons-subtle`, `.buttons-sm`, `.buttons-round`, `--joined`) and a `justify-*` utility on it set the rest.

## Options
| Block | Options | From |
| :--- | :--- | :--- |
| `.pagination` | Prominence: `.buttons-subtle`; size: `.buttons-sm`; corners: `.buttons-round`; joined: `.button-group--joined`; alignment: a `justify-*` utility | The [Button Group](14-button-group.md) |
| `.pagination__gap` | Marks skipped pages | Pagination |

### Further rules
- **Previous and next** are icon Buttons with hidden text, or text Buttons. Use `.icon--dir` so arrows flip in right-to-left pages.
- **Alignment** comes from a `justify-*` utility on the group or the layout around it.
