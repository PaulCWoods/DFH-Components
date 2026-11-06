---
title: Table
tier: organism
summary: Data in rows and columns, with rules, alignment and sticky edges.
tokens: table
storybook: organisms-table
related: [card, badge-status-chip-kbd, button, pagination-page-count, batch-actions]
---

# 13. Table
```html playground
<div class="table-container" tabindex="0" role="region" aria-labelledby="default-stock">
  <table class="table" data-axes>
    <caption id="default-stock" class="small-heading">Ferns in stock</caption>
    <thead>
      <tr>
        <th scope="col">Plant</th>
        <th scope="col" class="table__cell--numeric">Height (cm)</th>
        <th scope="col" class="table__cell--numeric">In stock</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Hart's tongue</th>
        <td class="table__cell--numeric">40</td>
        <td class="table__cell--numeric">18</td>
      </tr>
      <tr>
        <th scope="row">Lady fern</th>
        <td class="table__cell--numeric">60</td>
        <td class="table__cell--numeric">7</td>
      </tr>
    </tbody>
  </table>
</div>
---
Prominence: Default, Plain=table--plain
Frame: Default, Bordered=table--bordered
Rows: Default, Striped=table--striped
Density: Default, Compact=table--compact
```

## Purpose
A Table is for comparing, across a row or down a column. Only a real `<table>` tells a screen reader which headers belong to a cell, so someone moving through it hears the column and the row as they go. That is why it uses `<th>` with `scope`, and why nothing here changes the `display` of its elements.

A wide Table scrolls in its container, and the library won't reflow rows into Cards. Stacked Cards keep each value but lose the columns, and the columns are the reason to use a Table at all.

Sorting, selection and paging depend on your data, so they are the page's job. The Table only styles their states.

## When to use
- **For data with rows and columns,** where people compare across them.
- **Not for layout:** a layout grid is not a Table; use a [grid](19b-grid-grid-carousel.md).
- **Not for name and value pairs on their own:** [Telemetry](30-telemetry.md) is a description list.
- **Not for a list of things with one main link:** use a [Card](10-card.md) or a [list](20-text-heading.md).

## Rules
- Don't put `display` on table elements: it drops their Table semantics in some browsers.
- Wide Tables scroll in their container; the library doesn't reflow rows into Cards.
- **Scroll container:** a Table that can be wider than its column sits in `.table-container`, with `tabindex="0"`, `role="region"` and a unique name (`aria-labelledby` the caption, or `aria-label`), so it can be scrolled by keyboard and found (WCAG 2.1.1, 1.4.10).
- **Caption:** names the Table. It sets no type: put a text atom on it (`.small-heading`), or `.sr-only` to hide it.
- **Headers:** `scope="col"` on column headers, `scope="row"` on the first cell of a row that names it.

## Keyboard and screen readers
The browser provides all of this, given a real `<table>` and a focusable container. The page's script only sorts the rows and updates the state.
- **Tab** reaches the `.table-container`, then each control inside it, in reading order.
- **Arrow keys** scroll the container once it has focus.
- **Enter and Space** press a sort Button.
- **A screen reader** finds the container as a region by its name, moves from cell to cell and reads the headers from `scope`. It takes the sort order from `aria-sort` on the `<th>`.

## Let a Wide Table Scroll
```html live
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

## Sorting
```html live
<div class="table-container" tabindex="0" role="region" aria-labelledby="stock-sorted">
  <table class="table">
    <caption id="stock-sorted" class="small-heading">Plants by height</caption>
    <thead>
      <tr>
        <th scope="col">
          <button type="button" class="table__sort-button">
            Plant
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronsUpDown"/></svg>
          </button>
        </th>
        <th scope="col" class="table__cell--numeric" aria-sort="ascending">
          <button type="button" class="table__sort-button">
            Height (cm)
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">Epimedium</th><td class="table__cell--numeric">30</td></tr>
      <tr><th scope="row">Brunnera</th><td class="table__cell--numeric">45</td></tr>
    </tbody>
  </table>
</div>
```
- `aria-sort` goes on the `<th>`, on one column at a time. The Button is named by its visible text; don't replace it with an `aria-label`.
- Unsorted columns show `ChevronsUpDown`; the sorted column shows `ChevronDown`, which points up for `aria-sort="ascending"`. The page's script sorts the rows, sets `aria-sort` and swaps the icon.
- Say the sort order in the caption or a `role="status"` message if it matters ("Sorted by height, ascending").

## Rows with Actions
```html live
<div class="table-container" tabindex="0" role="region" aria-label="Plants to reorder">
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
</div>
```
- `--hover` only for rows with actions or selection; a highlight on a read-only row suggests it does something. A row whose control has focus is highlighted too.
- A control doesn't make its row taller than the control. Name each row's Buttons uniquely (hidden text with the row's name).

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Put a wide Table in a focusable, named `.table-container`. | Reflow rows into Cards, or leave a scroller keyboard users can't reach. |
| Name the Table with a `<caption>` and a text atom. | Leave it unnamed, or look for a caption class. |
| Put `aria-sort` on the `<th>`. | Put it on the sort Button. |
| Use `--hover` only where rows have actions or selection. | Highlight read-only rows. |
| End-align numbers with `.table__cell--numeric`. | Centre a column of figures. |
| Use a Grid for layout. | Set `display` on table elements. |

## Reference
A data Table: rules, padding, alignment and sticky edges. An organism; cell content is atoms (text atoms, `.status`, `.button`, `.lockup`). Sorting, selection and paging are the page's job; the Table styles their states.

## Options
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (rules between rows, a tinted head), `--plain` (no rules or tint, outer cells flush with the text around it) | `--table-prominence` |
| Density | default, `--compact` | `--ui-sizing: compact` |

Options: `--bordered` (outer frame and column rules), `--striped`, `--hover`, `--sticky-head`, `--sticky-foot`, `--sticky-first-column`, `--sticky-last-column`.

### Further rules
- A layout grid is not a Table. Use a Table only for data with rows and columns.
- **Type:** the Table resets to fixed sizing and uses the body text tokens; head and foot cells are bold. Text atoms in cells win.
- **Compact:** `--compact` or any compact region: 8px by 12px padding and compact text.
- **Row groups:** split the body into several `<tbody>`s, one per group; a `<tbody>` that follows another is ruled off like the head. Name a group with a first row holding `<th scope="rowgroup" colspan="…">`.
- **Sticky parts cover what scrolls under them,** so set `scroll-padding-block` on the container to the part's height, to keep a focused control in view (WCAG 2.4.11).

## Cells and Columns
| Class | On | Does |
| :--- | :--- | :--- |
| `.table__cell--numeric` | cells | End-aligned, tabular figures, no wrapping. Use for numbers and money. |
| `.table__cell--center` | cells | Centred. Use only for a cell holding a Status, an icon or a Checkbox. |
| `.table__cell--fit` | cells | Shrinks the column to its content, no wrapping (dates, codes). |
| `.table__cell--nowrap` | cells | No wrapping. |
| `.table__cell--truncate` | an element in a cell | One line with an ellipsis. Put the full text in a `title` or elsewhere. |
| `.table__col--index` | `<col>` or header cell | Narrow, centred (row number, checkbox). |
| `.table__col--xs` … `--xl` | `<col>` or header cell | Fixed widths from `--table-col-*-width`. |
| `.table__col--actions` | `<col>` or header cell | Width for row actions, end-aligned. Name the header with `<span class="sr-only">Actions</span>`. |
| `.table__col--fill` | `<col>` or header cell | Takes the remaining width. |

## Sticky Edges
```html live
<div class="table-container" tabindex="0" role="region" aria-labelledby="stock-sticky" style="max-block-size: 12rem;">
  <table class="table table--sticky-head table--sticky-first-column">
    <caption id="stock-sticky" class="small-heading">Plants in stock, by nursery</caption>
    <thead>
      <tr>
        <th scope="col">Plant</th>
        <th scope="col" class="table__cell--numeric">Height (cm)</th>
        <th scope="col" class="table__cell--numeric">In stock</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Astrantia</th>
        <td class="table__cell--numeric">60</td>
        <td class="table__cell--numeric">12</td>
      </tr>
      <tr>
        <th scope="row">Brunnera</th>
        <td class="table__cell--numeric">45</td>
        <td class="table__cell--numeric">9</td>
      </tr>
      <tr>
        <th scope="row">Epimedium</th>
        <td class="table__cell--numeric">30</td>
        <td class="table__cell--numeric">42</td>
      </tr>
      <tr>
        <th scope="row">Hosta</th>
        <td class="table__cell--numeric">50</td>
        <td class="table__cell--numeric">16</td>
      </tr>
      <tr>
        <th scope="row">Pulmonaria</th>
        <td class="table__cell--numeric">25</td>
        <td class="table__cell--numeric">31</td>
      </tr>
      <tr>
        <th scope="row">Tiarella</th>
        <td class="table__cell--numeric">20</td>
        <td class="table__cell--numeric">14</td>
      </tr>
    </tbody>
  </table>
</div>
```
Sticky parts need a container with a height (or a narrow width). Where scroll-state queries are supported, a sticky part stays clear until content scrolls under it, then takes a surface and a shadow on the side facing the content: below the head, above the foot, at the inline end of a first column and the inline start of a last column (mirrored in right-to-left text).

## In a Card
```html live
<article class="card">
  <header class="card__header"><h3 class="card__title subheading" id="stock-card">Stock</h3></header>
  <div class="card__body card__body--flush">
    <div class="table-container" tabindex="0" role="region" aria-labelledby="stock-card">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Plant</th>
            <th scope="col" class="table__cell--numeric">Height (cm)</th>
            <th scope="col" class="table__cell--numeric">In stock</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Hosta</th><td class="table__cell--numeric">50</td><td class="table__cell--numeric">16</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</article>
```
A flush Card body sets `--table-inset` to the Card's padding, so the first and last columns line up with the Card's content.
