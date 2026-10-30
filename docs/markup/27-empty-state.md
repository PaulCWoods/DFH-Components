# 27. Empty State
The block shown where content would be when there is none: a search or filter miss, a first use, a cleared queue, a region that failed to load. A molecule: it lays out a visual, a title, a description and actions; the parts are atoms (an icon box, text atoms, buttons) that style themselves. The audit is in `docs/audit/empty-state.md`.

| Axis | Modifiers (on `.empty-state`) | Flag |
| :--- | :--- | :--- |
| Prominence | default (no frame, no padding), `--subtle` (dashed, tinted, padded) | none |
| Density | default, `--compact` | `--ui-sizing: compact` (`.ui-compact`) |
| Intent | neutral, `--accent`, `--info`, `--success`, `--warning`, `--danger` | `--icon-box-intent` |
| Alignment | centred, `--start` | none |

## A. Markup
```html
<div class="empty-state">
  <div class="empty-state__visual">
    <span class="icon-box" aria-hidden="true">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
    </span>
  </div>
  <div class="empty-state__content">
    <h3 class="empty-state__title subheading">No plants match “fern”</h3>
    <p class="empty-state__description small-text">Check the spelling, or clear the filters to see all 40 plants.</p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button">Clear filters</button>
  </div>
</div>
```
- **Parts** are layout hooks only. Type comes from the text atom on the title (`.subheading`, or `.small-heading` when compact) and the description (`.small-text`, muted by the empty state). Actions are `.button`s, or a `.button-group`.
- **The visual** is an `.icon-box`, which the empty state makes large, subtle and round (small when compact), with a 1.5em icon. Or an illustration (`<img alt="">` or an `aria-hidden` `<svg>`), capped at 10rem.
- **Padding:** none by default. The empty state sits in something that has its own (a card body, a table cell, a dialog, a page section). Add room with a `padding-block-*` utility.
- **`hidden`** works on it: show it with `hidden = false`, not an inline `display`.

## B. Semantics and Announcing
- A `<div>`, not a landmark. Use a `<section>` with a heading only when the empty state is the whole content of a page or panel.
- The heading level fits the page outline; the class sets the size. In a table cell, the title can be a `<p>`.
- When a search or filter empties a list, put the news in a `role="status"` element that is on the page from the start ("No plants match", or the result count). The empty state isn't a live region: one added with its content isn't reliably announced, and a whole block would be read out.

## C. Intent
```html
<div class="empty-state empty-state--success">
  <div class="empty-state__visual">
    <span class="icon-box" aria-hidden="true"><svg class="icon" …><use href="#Check"/></svg></span>
  </div>
  <div class="empty-state__content">
    <h3 class="empty-state__title subheading">All caught up</h3>
    <p class="empty-state__description small-text">No plants need watering today.</p>
  </div>
</div>
```
Intent tints the icon box and colours its icon (it sets `--icon-box-intent`). Colour never carries the meaning alone (WCAG 1.4.1): the icon and the title say what happened.

## D. Placement
- **In a card:** inside `.card__body`. Use `--compact` in a small card.
- **In a table:** one row, one cell with `colspan` spanning every column; keep the header row so the columns stay named.
- **In a narrow sidebar:** `--compact` and `--start`, or a `.ui-compact` region.
- **A slot or drop zone:** `--subtle`.

## E. Writing
- The title says what is empty: "No plants match “fern”", not "No results".
- The description says why, or what to do next.
- At most one primary action. A first-use state shows the action that fills it.
- An error that leaves a region empty can be a `--danger` empty state with a "Try again" button. A page-level error is a banner with `role="alert"` (§11).

## F. Rules
- **Removed:** the `cq` type mode and size container; `--flush` (no padding is the default); `--bordered` (use `--subtle`); `--left` (use `--start`); `--error` and `[data-status]` (use `--danger` and the other intents); `__icon-well` (use an `.icon-box` in `__visual`); `__hgroup`; `--empty-state-density` (use `--ui-sizing: compact`) and `--empty-state-align`; the card and table rules; `aria-labelledby` on a `<div>`; the well, icon, title, padding and status tokens.
