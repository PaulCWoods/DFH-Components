---
title: Empty State
tier: molecule
summary: The block shown where content would be when there is none, saying why and what to do next.
tokens: empty-state
storybook: molecules-empty-state
related: [card, banner, icon-icon-box, button]
---

# 27. Empty State
```html playground width=md
<div class="empty-state" data-axes>
  <div class="empty-state__visual">
    <span class="icon-box" aria-hidden="true">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
    </span>
  </div>
  <div class="empty-state__content">
    <h2 class="empty-state__title subheading">No saved plants</h2>
    <p class="empty-state__description small-text" data-label>Save a plant from the catalogue to find it here later.</p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button">Browse plants</button>
  </div>
</div>
---
Prominence: Default, Subtle=empty-state--subtle
Intent: Neutral, Accent=empty-state--accent "Start here: the catalogue has 40 plants to choose from.", Info=empty-state--info "Note: plants you save on another device appear here too.", Success=empty-state--success "Done: you've planted everything you saved.", Warning=empty-state--warning "Saving is paused while the catalogue is updated.", Danger=empty-state--danger "Failed: your saved plants didn't load."
Density: Default, Compact=empty-state--compact
Alignment: Centred, Start=empty-state--start
```

## Why it exists
A blank space leaves people guessing whether something broke, is still loading or really has nothing to show. An Empty State settles it: it says what is missing, why, and what to do next.

Most of its value is in the words, so the component stays out of their way. It lays out a visual, some text and actions, and each part styles itself. It has no padding of its own because it normally sits in something that does, such as a Card or a Table cell.

It isn't a live region. One that arrives along with its content isn't reliably announced, and if it were, the whole block would be read out when one short sentence would do. So the news goes in a status element that's already on the page.

## When to use
- **Where content would be and there is none:** a search or filter miss, a first use, a cleared queue, a region that failed to load.
- **Not for a page-level error:** that is a Banner with [`role="alert"`](11-banner.md).
- **Not while content is still loading:** a [Skeleton](26-skeleton.md) holds its space.

## Rules
- A `<div>`, not a landmark. Use a `<section>` with a heading only when the Empty State is the whole content of a page or panel.
- The heading level fits the page outline; the class sets the size. In a Table cell, the title can be a `<p>`.
- When a search or filter empties a list, put the news in a `role="status"` element that is on the page from the start ("No plants match", or the result count). The Empty State isn't a live region: one added with its content isn't reliably announced, and a whole block would be read out.
- **`hidden`** works on it: show it with `hidden = false`, not an inline `display`.

## Say What's Empty and What to Do
```html live width=md
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

- The title says what is empty: "No plants match “fern”", not "No results".
- The description says why, or what to do next.
- At most one primary action. A first-use state shows the action that fills it.
- An error that leaves a region empty can be a `--danger` Empty State with a "Try again" Button. A page-level error is a Banner with [`role="alert"`](11-banner.md).

## Say What Happened with Intent
```html live width=md
<div class="empty-state empty-state--success">
  <div class="empty-state__visual">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
  </div>
  <div class="empty-state__content">
    <h3 class="empty-state__title subheading">All caught up</h3>
    <p class="empty-state__description small-text">No plants need watering today.</p>
  </div>
</div>
```
Intent tints the Icon Box and colours its icon (it sets `--icon-box-intent`). Colour never carries the meaning alone (WCAG 1.4.1): the icon and the title say what happened.

## Placement
- **In a Card:** inside `.card__body`. Use `--compact` in a small Card.
- **In a Table:** one row, one cell with `colspan` spanning every column; keep the header row so the columns stay named.
- **In a narrow Sidebar:** `--compact` and `--start`, or a `.ui-compact` region.
- **A slot or drop zone:** `--subtle`.

```html live width=md
<!-- In a small card -->
<div class="card">
  <div class="card__body">
    <div class="empty-state empty-state--compact">
      <div class="empty-state__visual">
        <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg></span>
      </div>
      <div class="empty-state__content">
        <h3 class="empty-state__title small-heading">No reminders</h3>
        <p class="empty-state__description small-text">Add one to get a nudge before watering day.</p>
      </div>
    </div>
  </div>
</div>

<!-- A slot or drop zone -->
<div class="empty-state empty-state--subtle">
  <div class="empty-state__visual">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Upload"/></svg></span>
  </div>
  <div class="empty-state__content">
    <h3 class="empty-state__title subheading">No photos of this bed</h3>
    <p class="empty-state__description small-text">Upload a photo to track how it grows.</p>
  </div>
</div>

<!-- Aligned to the start, as in a narrow sidebar -->
<div class="empty-state empty-state--compact empty-state--start">
  <div class="empty-state__content">
    <h3 class="empty-state__title small-heading">No filters applied</h3>
    <p class="empty-state__description small-text">Choose a filter to narrow the list.</p>
  </div>
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Say what is empty: "No plants match “fern”". | Write "No results". |
| Say why, or what to do next. | Leave people with a title and nothing to do. |
| Announce a search miss in a `role="status"` that is on the page from the start. | Make the Empty State a live region. |
| Show at most one primary action. | Offer several competing actions. |
| Show and hide it with `hidden`. | Set an inline `display`. |
| Pair intent with an icon and a title that says what happened. | Leave colour to carry the meaning. |

## Reference
The block shown where content would be when there is none: a search or filter miss, a first use, a cleared queue, a region that failed to load. A molecule: it lays out a visual, a title, a description and actions; the parts are atoms (an Icon Box, text atoms, Buttons) that style themselves.

## Options
| Axis | Modifiers (on `.empty-state`) | Flag |
| :--- | :--- | :--- |
| Prominence | default (no frame, no padding), `--subtle` (dashed, tinted, padded) | none |
| Density | default, `--compact` | `--ui-sizing: compact` (`.ui-compact`) |
| Intent | neutral, `--accent`, `--info`, `--success`, `--warning`, `--danger` | `--icon-box-intent` |
| Alignment | centred, `--start` | none |

### Further rules
- **Parts** are layout hooks only. Type comes from the text atom on the title (`.subheading`, or `.small-heading` when compact) and the description (`.small-text`, muted by the Empty State). Actions are `.button`s, or a `.button-group`.
- **The visual** is an `.icon-box`, which the Empty State makes large, subtle and round (small when compact), with a 1.5em icon (1.25em when compact). Or an illustration (`<img alt="">` or an `aria-hidden` `<svg>`), capped at 10rem.
- **Padding:** none by default. The Empty State sits in something that has its own (a Card body, a Table cell, a Dialog, a page section). Add room with a `padding-block-*` utility.
