# 13. Table
A data table: rules, padding, alignment and sticky edges. An organism; cell content is atoms (text atoms, `.status`, `.button`, `.lockup`). Sorting, selection and paging are the page's job; the table styles their states. The audit is in `docs/audit/table.md`.

| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (rules between rows, a tinted head), `--plain` (no rules or tint, outer cells flush with the text around it) | `--table-prominence` |
| Density | default, `--compact` | `--ui-sizing: compact` |

Options: `--bordered` (outer frame and column rules), `--striped`, `--hover`, `--sticky-head`, `--sticky-foot`, `--sticky-first-column`, `--sticky-last-column`.

## A. Table in a Scroll Container
```html
<div class="table-container" tabindex="0" role="region" aria-labelledby="stock">
  <table class="table">
    <caption id="stock" class="small-heading">Plants in stock</caption>
    <thead>
      <tr>
        <th scope="col">Plant</th>
        <th scope="col" class="table__cell--numeric">Height (cm)</th>
        <th scope="col" class="table__cell--numeric">In stock</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Epimedium</th>
        <td class="table__cell--numeric">30</td>
        <td class="table__cell--numeric">42</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" colspan="2">Total</th>
        <td class="table__cell--numeric">42</td>
      </tr>
    </tfoot>
  </table>
</div>
```
- **Scroll container:** a table that can be wider than its column sits in `.table-container`, with `tabindex="0"`, `role="region"` and a unique name (`aria-labelledby` the caption, or `aria-label`), so it can be scrolled by keyboard and found (WCAG 2.1.1, 1.4.10).
- **Caption:** names the table. It sets no type: put a text atom on it (`.small-heading`), or `.sr` to hide it.
- **Headers:** `scope="col"` on column headers, `scope="row"` on the first cell of a row that names it.
- **Type:** the table resets to fixed sizing and uses the body text tokens; head and foot cells are bold. Text atoms in cells win.
- **Compact:** `--compact` or any compact region: 8px by 12px padding and compact text.

## B. Cells and Columns
| Class | On | Does |
| :--- | :--- | :--- |
| `.table__cell--numeric` | cells | End-aligned, tabular figures, no wrapping. Use for numbers and money. |
| `.table__cell--center` | cells | Centred. Use only for a cell holding a status, an icon or a checkbox. |
| `.table__cell--fit` | cells | Shrinks the column to its content, no wrapping (dates, codes). |
| `.table__cell--nowrap` | cells | No wrapping. |
| `.table__cell--truncate` | an element in a cell | One line with an ellipsis. Put the full text in a `title` or elsewhere. |
| `.table__col--index` | `<col>` or header cell | Narrow, centred (row number, checkbox). |
| `.table__col--xs` … `--xl` | `<col>` or header cell | Fixed widths from `--table-col-*-width`. |
| `.table__col--actions` | `<col>` or header cell | Width for row actions, end-aligned. Name the header with `<span class="sr-only">Actions</span>`. |
| `.table__col--fill` | `<col>` or header cell | Takes the remaining width. |

## C. Sorting
```html
<th scope="col" class="table__cell--numeric" aria-sort="ascending">
  <button type="button" class="table__sort-button">
    Height (cm)
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
  </button>
</th>
<th scope="col">
  <button type="button" class="table__sort-button">
    Plant
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronsUpDown"/></svg>
  </button>
</th>
```
- `aria-sort` goes on the `<th>`, on one column at a time. The button is named by its visible text; don't replace it with an `aria-label`.
- Unsorted columns show `ChevronsUpDown`; the sorted column shows `ChevronDown`, which points up for `aria-sort="ascending"`. The page's script sorts the rows, sets `aria-sort` and swaps the icon.
- Say the sort order in the caption or a `role="status"` message if it matters ("Sorted by height, ascending").

## D. Sticky Edges
```html
<div class="table-container" tabindex="0" role="region" aria-labelledby="stock" style="max-block-size: 24rem;">
  <table class="table table--sticky-head table--sticky-first-column">…</table>
</div>
```
Sticky parts need a container with a height (or a narrow width). Where scroll-state queries are supported, a sticky part stays clear until content scrolls under it, then takes a surface and a shadow on the side facing the content: below the head, above the foot, at the inline end of a first column and the inline start of a last column (mirrored in right-to-left text).

## E. Rows with Actions
```html
<table class="table table--hover">
  <thead><tr><th scope="col">Plant</th><th scope="col" class="table__col--actions"><span class="sr-only">Actions</span></th></tr></thead>
  <tbody>
    <tr>
      <th scope="row">Brunnera</th>
      <td class="table__col--actions">
        <button type="button" class="button button--subtle button--sm">Reorder<span class="sr-only"> Brunnera</span></button>
      </td>
    </tr>
  </tbody>
</table>
```
- `--hover` only for rows with actions or selection; a highlight on a read-only row suggests it does something. A row whose control has focus is highlighted too.
- A control doesn't make its row taller than the control. Name each row's buttons uniquely (hidden text with the row's name).

## F. In a Card
```html
<article class="card">
  <header class="card__header"><h3 class="card__title subheading" id="stock">Stock</h3></header>
  <div class="card__body card__body--flush">
    <div class="table-container" tabindex="0" role="region" aria-labelledby="stock">
      <table class="table">…</table>
    </div>
  </div>
</article>
```
A flush card body sets `--table-inset` to the card's padding, so the first and last columns line up with the card's content.

## G. Rules
- A layout grid is not a table. Use a table only for data with rows and columns.
- Don't put `display` on table elements: it drops their table semantics in some browsers.
- Wide tables scroll in their container; the library doesn't reflow rows into cards.
- **Removed:** `.table__caption`, `__caption--bottom`; `--zebra` (use `--striped`), `--sm` (use `--compact`), `--simple` (use `--plain`), `--fixed`, `--flush`, `--head-cells-long`, `--sticky-header`, `--sticky-footer`, `--sticky-1st-column`; `__col--num`, `__col--numeric`, `__col--center`, `__col--fit` (use the `__cell--` classes), `__cell--long` (use `--nowrap`), `__cell--start`, `__cell--index`, `__cell--actions`, `__cell--fill`, `__cell--xs` … `--xl`, `__col--counter`, `__col--expand`, `__col--auto`, `__col--min-*`; the `[data-numeric]`, `[data-center]`, `[data-fit]`, `[data-nowrap]` attributes; `aria-sort` on the button; the `table.font-*`, `head-font-*`, `header-cell-font-weight` and `caption-*` tokens; `--ui-density` on tables.
