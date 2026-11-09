---
title: Text and Heading
tier: atom
summary: The type styles, from a display title to small text, and the List.
tokens: list
storybook: atoms-text
related: [prose, form-composition, card]
---

# 20. Text & Heading Primitives (Typography Presets)
```html playground
<div class="stack" data-axes>
  <h2 class="heading">Shade borders</h2>
  <p class="text">Ferns, hostas and hellebores grow well under trees.</p>
</div>
---
Sizing: Fixed, Fluid=font-sizing-fluid, Container=font-sizing-cq container-inline, Compact=font-sizing-compact
```

## Purpose
Most of what people come to a page for is text, so type should be consistent and hard to get wrong. Each atom sets size, family, weight and line height together, because those only work as a set. Ten of them cover the whole range, so a page doesn't drift into near-identical sizes.

The class sets the look, and the element sets the meaning. A screen reader user moves through a page by its heading levels, so the outline shouldn't bend to get a size, and the size shouldn't bend to fit the outline. An `h2` can look like a `.small-heading`.

Atoms are fixed by default, because a Card's title has no reason to change with the width of the window. Where type should grow or shrink, one container says so for everything inside it, so nobody sizes one element at a time. Body text also stops at a comfortable reading width on its own.

## When to use
- **For any text outside `.prose`:** a text atom sets its size, family, weight and line height.
- **Inside `.prose`:** bare elements are styled already, so no class is needed.
- **For a Form label:** `.label`, which stays the same size in every mode but compact.

## Rules
- **Fixed by default.** Fluid, `cq` and compact sizing come from [the container](#sizing-modes).
- **Choose the element for its meaning,** and hold headings in order down the page.
- `.text` and `.large-text` stop at `--body-measure` (66ch). Set `--body-measure: none` on a container to lift it.
- Colour and weight come from utilities: `.text-muted`, `.font-bold`, `.font-serif`, `.font-mono`.

## The Element and the Look Are Separate
```html live
<h3 class="display-title">Display Title</h3>
<h3 class="title">Page Title</h3>
<h3 class="heading">Section Heading</h3>
<h3 class="subheading">Sub-section Heading</h3>
<h3 class="small-heading">Card Heading</h3>
<p class="micro-heading text-muted">Category Eyebrow</p>
```

## Sizing Modes
```html live
<!-- Fluid: headings and body grow with the viewport -->
<article class="font-sizing-fluid">
  <h3 class="title">Fluid Title</h3>
  <p class="text">Fluid body copy.</p>
</article>

<!-- Container: sized to the container's width -->
<div class="font-sizing-cq container-inline">
  <h3 class="heading">Container Heading</h3>
  <p class="text">Container body copy.</p>
</div>

<!-- Compact: one step down -->
<div class="font-sizing-compact">
  <h3 class="heading">Compact Heading</h3>
</div>
```

## Lists
`.list` is a bulleted (`ul`) or numbered (`ol`) list outside prose, with prose's indent and item spacing. The reset strips a bare list's padding, which leaves its markers hanging outside the box. `.list` puts them back inside, so they sit within a Card's or Dialog's padding. Put a text atom on the list for its type; `.list` sets the geometry only.

```html live
<ul class="list small-text">
  <li><code class="font-mono">tokens/themes/starter.json</code></li>
  <li><code class="font-mono">tokens/1-global.json</code>, the ramps</li>
</ul>

<ol class="list text">
  <li>Choose a curve
    <ol>
      <li>Nested lists take the same spacing and indent again</li>
    </ol>
  </li>
  <li>Publish</li>
</ol>
```

- **Not for** navigation, Menus or Card grids: those are components with `role="list"` and no markers. Inside `.prose`, a bare list is styled already; don't add `.list`.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Choose the element for its meaning and the class for its look. | Pick `<h4>` because it looks the right size. |
| Set `.font-sizing-fluid` on a container. | Set a font size on one element. |
| Use `.text-muted` and `.font-bold` for colour and weight. | Add a new class for a bold or muted variant. |
| Hold headings in order down the page. | Skip from `<h1>` to `<h4>`. |

## Reference
Ten type atoms, one step of the scale each, and a list atom. The class sets the look; choose the element for its meaning (an `h2` can look like a `.small-heading`).

```html live
<h2 class="heading">Shade borders</h2>
<p class="text">Ferns, hostas and hellebores grow well under trees.</p>
```

## Options
| Class | Job | Step |
| :--- | :--- | :--- |
| `.display-title` | Hero and cover titles | 5 (fluid 5–8) |
| `.title` | Page titles | 3 (fluid 3–5) |
| `.heading` | Section headings | 2 (fluid 2–3) |
| `.subheading` | Sub-section headings | 1 |
| `.small-heading` | Card and panel headings | 0 |
| `.micro-heading` | Uppercase eyebrow and group labels | −1 |
| `.large-text` | Lead paragraphs | 1 |
| `.text` | Body copy | 0 |
| `.small-text` | Hints, captions, metadata | −1 |
| `.micro-text` | Footnotes and fine print | −2 (the bottom of the scale; compact keeps it) |
| `.label` | Form labels and legends (bold; fixed in every mode but compact) | 0 |

### Further rules
- Headings balance their lines; body text takes `--body-text-wrap`.
- No literal fallbacks: if tokens fail to load, text inherits its parent's size and stays legible.
- Colour and weight come from utilities: `.text-muted` (or `.text-color-muted`), `.font-bold`, `.font-serif`, `.font-mono`. There is no `.strong-text`, `.alt-text`, `.caption` or `.nano-*`.

### Lists: markers and spacing
- **Markers:** disc then circle for `ul`; decimal, lower-latin, lower-roman for `ol`, as in prose.
- **Spacing:** `--list-indent` and `--list-gap` (Tier 3, the same values as prose). A compact region halves the gap.

## Body Text
```html live
<p class="large-text">Editorial lead-in paragraph.</p>
<p class="text">Body copy for reading.</p>
<p class="small-text text-muted">Updated 2 days ago</p>
```
