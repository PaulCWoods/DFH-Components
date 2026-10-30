# 4. Accordion
One disclosure: a native `<details>` whose `<summary>` names a section and whose content opens below it. A molecule: the accordion draws the frame, the summary's layout and the state icon; the summary's text is a text atom and the content is anything. The audit is in `docs/audit/accordion.md`.

| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (a border, no surface of its own, the same open or closed), `--plain` (a rule above and below, no inline padding) | `--accordion-prominence: plain` |
| Density | default, `--compact` | `--ui-sizing: compact` |

Groups: `.accordion-group`, `.accordion-group--joined`.

## A. Accordion
```html
<details class="accordion">
  <summary>Watering</summary>
  <p class="text">Water deeply once a week in the first summer.</p>
</details>
```
- **Native behaviour:** Enter and Space toggle the summary; find-in-page opens a closed accordion holding the match. No script, no ARIA.
- **State icon:** a plus that closes into a minus at the summary's end, drawn by the accordion. It can't be removed: it is the only visual sign that the summary opens and whether it is open. Long summaries wrap before it.
- **Target:** the summary is at least 48px tall, or the product's fine-pointer target (`--spacing-target-min`).
- **Focus and hover:** the focus ring is inset on the summary; hover tints the summary, like a plain button.
- **Surface:** the accordion has none. Put it in a card for one, or set `--accordion-bg`.

## B. Summary Content
```html
<summary>Watering</summary>                                <!-- bold body text -->
<summary class="subheading">Watering</summary>             <!-- a text atom sets the type -->
<summary><h3 class="subheading">Watering</h3></summary>    <!-- a heading, when the outline needs it -->
```
- A bare summary is bold body text. A summary with a class takes its type from that class, so a classed summary carries a text atom.
- A heading inside a summary is valid HTML and puts the section in the page outline, but some screen readers flatten it into the summary's name. Use it only where the outline needs the section.
- Keep interactive elements out of the summary: it is already a control.

## C. Plain
```html
<details class="accordion accordion--plain">…</details>
```
No border or radius and no inline padding, so the summary lines up with the text around it; a rule above and below. The hover tint reaches a little past the text so it isn't flush with the letters.

## D. Groups
```html
<div class="accordion-group">
  <details class="accordion" name="care" open>…</details>
  <details class="accordion" name="care">…</details>
</div>

<div class="accordion-group accordion-group--joined">…</div>
```
- `.accordion-group` stacks accordions with `--accordion-group-gap`.
- `--joined` shares the borders between items and rounds only the outer corners.
- Plain accordions in a group sit one rule apart (no gap).
- **Exclusive:** the same `name` on several `<details>` allows one open at a time. It hides content people may want to compare, so use it only for long, independent items.

## E. Compact
`--compact`, or any compact region (`.ui-compact`, `--ui-sizing: compact`), steps the padding (8px by 12px) and text down. The summary keeps its 48px target.

## F. In a Card
```html
<article class="card">
  <header class="card__header"><h3 class="card__title subheading">Planting guide</h3></header>
  <div class="card__body card__body--flush">
    <div class="accordion-group">
      <details class="accordion accordion--plain">…</details>
    </div>
  </div>
</article>
```
A flush card body sets `--accordion-inset` to the card's padding, so plain accordions run edge to edge with their text lined up with the card's.

## G. Rules
- An accordion is for sections of content. Tabs, menus and navigation trees are not accordions.
- Don't hide content people need to read in order, or the only copy of required information, in a closed accordion.
- **Removed:** `--flush` (use `--plain`), `--transparent` (the default has no surface), `--ruled`, `--no-icon`, `.accordion-group--no-icons`, `.accordion-group--tight` (use `--joined`), `.accordion__icon`, `--accordion-variation` (use `--accordion-prominence`), the open surface, `--ui-density` on accordions; the `open-bg`, `hover-border` and `inner-border-*` tokens and the `--accordion-summary-*` names.
