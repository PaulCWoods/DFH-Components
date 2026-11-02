---
title: Accordion
tier: molecule
summary: A section of content that opens and closes under a summary that names it.
tokens: accordion
storybook: molecules-accordion
related: [card, tabs, navigation-tree, menu]
---

# 4. Accordion
```html playground width=md
<details class="accordion" data-axes open>
  <summary>Delivery times</summary>
  <p class="text">Most orders arrive within three working days.</p>
</details>
---
Prominence: Default, Plain=accordion--plain
Density: Default, Compact=accordion--compact
```

## Purpose
An Accordion lets people skip what they don't need, on pages where not everyone needs everything. That has a cost, because closed content is easy to miss. So it suits optional sections, and never the only copy of something people have to read.

It is a native `<details>`. The browser gives it keyboard use, an open or closed state for screen readers and, where supported, find-in-page that opens the section holding the match. A scripted disclosure has to rebuild each of those, so there is no script and no ARIA.

The plus that closes into a minus can't be removed. It's the only visual sign that the summary opens, and of whether it is open.

## When to use
- **For optional sections of content** people can skip, such as questions and answers or long reference notes.
- **Not for content people need to read in order, or the only copy of required information.**
- **Not for switching between views of one thing:** that is [Tabs](24-tabs.md).
- **Not for lists of actions or site navigation:** those are a [Menu](03b-menu.md) and a [Navigation Tree](16b-navigation-tree.md).

## Rules
- Don't hide content people need to read in order, or the only copy of required information, in a closed Accordion.
- Keep interactive elements out of the summary: it is already a control.
- Use `name` to allow one open item at a time only for long, independent items. It hides content people may want to compare.

## Keyboard and screen readers
The browser provides all of this for `<details>`. There's nothing to script.
- **Tab** reaches the summary, then any controls in the content while it is open. Controls in closed content can't be reached.
- **Enter and Space** open and close it.
- **A screen reader** hears the summary as a control, with its open or closed state.
- **Find in page** opens a closed Accordion holding the match, where the browser supports it.

## What goes in the summary
```html live width=md
<!-- Bold body text -->
<details class="accordion">
  <summary>Watering</summary>
  <p class="text">Water deeply once a week in the first summer.</p>
</details>

<!-- A text atom sets the type -->
<details class="accordion">
  <summary class="subheading">Feeding</summary>
  <p class="text">Feed with leaf mould each spring.</p>
</details>

<!-- A heading, when the outline needs it -->
<details class="accordion">
  <summary><h3 class="subheading">Pruning</h3></summary>
  <p class="text">Cut back old stems in late winter.</p>
</details>
```
- A bare summary is bold body text. A summary with a class takes its type from that class, so a classed summary carries a text atom.
- A heading inside a summary is valid HTML and puts the section in the page outline, but some screen readers flatten it into the summary's name. Use it only where the outline needs the section.

## Stacked, joined or one at a time
```html live width=md
<div class="accordion-group">
  <details class="accordion" name="care" open>
    <summary>Spring care</summary>
    <p class="text">Mulch the bed before the soil warms up.</p>
  </details>
  <details class="accordion" name="care">
    <summary>Summer care</summary>
    <p class="text">Water in the evening, at the roots.</p>
  </details>
</div>

<div class="accordion-group accordion-group--joined">
  <details class="accordion">
    <summary>Autumn care</summary>
    <p class="text">Leave seed heads for the birds.</p>
  </details>
  <details class="accordion">
    <summary>Winter care</summary>
    <p class="text">Protect young plants from hard frost.</p>
  </details>
</div>
```
- `.accordion-group` stacks Accordions with `--accordion-group-gap`.
- `--joined` shares the borders between items and rounds only the outer corners.
- Plain Accordions in a group sit one rule apart (no gap).
- **Exclusive:** the same `name` on several `<details>` allows one open at a time. It hides content people may want to compare, so use it only for long, independent items.

## In a Card
```html live width=md
<article class="card">
  <header class="card__header"><h3 class="card__title subheading">Planting guide</h3></header>
  <div class="card__body card__body--flush">
    <div class="accordion-group">
      <details class="accordion accordion--plain">
        <summary>Spacing</summary>
        <p class="text">Leave 30cm between plants.</p>
      </details>
      <details class="accordion accordion--plain">
        <summary>Depth</summary>
        <p class="text">Plant at the depth of the pot.</p>
      </details>
    </div>
  </div>
</article>
```
A flush Card body sets `--accordion-inset` to the Card's padding, so plain Accordions run edge to edge with their text lined up with the Card's.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use `<details>` and `<summary>`, with no script or ARIA. | Build a disclosure from a Button and a hidden panel. |
| Set the summary's type with a text atom. | Put a Button or link in the summary, which is already a control. |
| Keep the built-in state icon. | Try to remove it: it is the only sign that the summary opens. |
| Use `name` only for long, independent items. | Make items exclusive when people may want to compare them. |
| Keep required information open on the page. | Hide its only copy in a closed Accordion. |

## Reference
One disclosure: a native `<details>` whose `<summary>` names a section and whose content opens below it. A molecule: the Accordion draws the frame, the summary's layout and the state icon; the summary's text is a text atom and the content is anything.

## Options
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (a border, no surface of its own, the same open or closed), `--plain` (a rule above and below, no inline padding) | `--accordion-prominence: plain` |
| Padding | default, `--flush` (no padding around the content) | |
| Density | default, `--compact` | `--ui-sizing: compact` |

Groups: `.accordion-group`, `.accordion-group--joined`.

### Further rules
- An Accordion is for sections of content. Tabs, Menus and Navigation Trees are not Accordions.

## Accordion
```html live width=md
<details class="accordion">
  <summary>Watering</summary>
  <p class="text">Water deeply once a week in the first summer.</p>
</details>
```
- **Native behaviour:** Enter and Space toggle the summary; find-in-page opens a closed Accordion holding the match. No script, no ARIA.
- **State icon:** a plus that closes into a minus at the summary's end, drawn by the Accordion. It can't be removed: it is the only visual sign that the summary opens and whether it is open. Long summaries wrap before it.
- **Target:** the summary is at least 48px tall, or the product's fine-pointer target (`--spacing-target-min`).
- **Focus and hover:** the focus ring is inset on the summary; hover tints the summary, like a plain Button.
- **Surface:** the Accordion has none. Put it in a Card for one, or set `--accordion-bg`.

## Plain
```html live width=md
<details class="accordion accordion--plain">
  <summary>Soil</summary>
  <p class="text">Dig in compost before planting.</p>
</details>
```
No border or radius and no inline padding, so the summary lines up with the text around it; a rule above and below. The hover tint reaches a little past the text so it isn't flush with the letters.

## Compact
```html live width=md
<details class="accordion accordion--compact">
  <summary>Sowing</summary>
  <p class="text">Sow thinly and cover lightly with soil.</p>
</details>
```
`--compact`, or any compact region (`.ui-compact`, `--ui-sizing: compact`), steps the padding (8px by 12px) and text down. The summary keeps its 48px target.

## Flush Content
```html live width=md
<details class="accordion accordion--flush">
  <summary>Sowing record</summary>
  <div class="code-block code-block--flush">
    <pre class="code-block__code" tabindex="0" role="group" aria-label="Sowing record"><code>Ferns    autumn
Hostas   spring</code></pre>
  </div>
</details>
```
`--flush` drops the padding around the content, for what brings its own: a [Code Block](37-code-block.md), a Table, an image. The content meets the frame and keeps its corners.
