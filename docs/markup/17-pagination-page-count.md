# 17. Pagination

Moves between the pages of one list: a button group (§14) of page links. Pagination makes the number buttons square and adds a gap marker for skipped pages; the group's options (`.buttons-subtle`, `.buttons-sm`, `.buttons-round`, `--joined`) and a `justify-*` utility on it set the rest. The audit is in `docs/audit/wayfinding.md`.

- **Current page:** `aria-current="page"` on its link. The button shows `aria-current` as selected; no `.is-active`.
- **No previous or next page:** keep the control, as a link with no `href` and `aria-disabled="true"`, so the row doesn't shift.
- **Skipped pages:** `<span class="pagination__gap" aria-hidden="true">…</span>`. The page numbers already say which pages are missing, so the marker is hidden.
- **Previous and next** are icon buttons with hidden text, or text buttons. Use `.icon--dir` so arrows flip in right-to-left pages.
- **Alignment** comes from a `justify-*` utility on the group or the layout around it.

## A. Numbered
```html
<nav class="pagination button-group buttons-subtle" aria-label="Pagination">
  <a class="button button--icon" href="/page/4">
    <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronLeft"/></svg>
    <span class="visually-hidden">Previous page</span>
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
    <span class="visually-hidden">Next page</span>
  </a>
</nav>
```

## B. Previous and Next with Text
```html
<nav class="pagination button-group justify-between" aria-label="Pagination">
  <a class="button" aria-disabled="true"><span>Previous</span></a>
  <span class="small-text">Page 1 of 10</span>
  <a class="button" href="/page/2"><span>Next</span></a>
</nav>
```

## C. Page Count (a Pattern)
There is no page-count component: it is a cluster with a status and a jump form. The form markup follows §7 until the form-composition pass settles `inline-form` and `inline-field`.
```html
<div class="cluster justify-between">
  <p class="small-text text-muted">Page 2 of 10</p>
  <form class="inline-form" action="/archive">
    <div class="inline-field">
      <label for="page-jump" class="field__label">Go to page</label>
      <input class="input" type="number" id="page-jump" name="page" min="1" max="10" value="2">
    </div>
    <button class="button button--subtle" type="submit"><span>Go</span></button>
  </form>
</div>
```
