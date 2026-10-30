# 20. Text & Heading Primitives (Typography Presets)

Ten type atoms, one step of the scale each, and a list atom (section D). The class sets the look; choose the element for its meaning (an `h2` can look like a `.small-heading`). The audit is in `docs/audit/text.md`.

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
| `.label` | Form labels and legends (bold; fixed in every mode but compact) | 0 |

- **Fixed by default.** Fluid, `cq` and compact sizing come from the container (§ Core Law 3).
- Headings balance their lines; body text uses `text-wrap: pretty`.
- `.text` and `.large-text` stop at `--body-measure` (66ch). Set `--body-measure: none` on a container to lift it.
- No literal fallbacks: if tokens fail to load, text inherits its parent's size and stays legible.
- Colour and weight come from utilities: `.text-muted` (or `.text-color-muted`), `.font-bold`, `.font-serif`, `.font-mono`. There is no `.strong-text`, `.alt-text`, `.micro-text`, `.caption` or `.nano-*`.

## A. Headings
```html
<h1 class="display-title">Display Title</h1>
<h1 class="title">Page Title</h1>
<h2 class="heading">Section Heading</h2>
<h3 class="subheading">Sub-section Heading</h3>
<h4 class="small-heading">Card Heading</h4>
<p class="micro-heading text-muted">Category Eyebrow</p>
```

## B. Body Text
```html
<p class="large-text">Editorial lead-in paragraph.</p>
<p class="text">Body copy for reading.</p>
<p class="small-text text-muted">Updated 2 days ago</p>
```

## C. Sizing Modes
```html
<!-- Fluid: headings and body grow with the viewport -->
<article class="font-sizing-fluid">
  <h1 class="title">Fluid Title</h1>
  <p class="text">Fluid body copy.</p>
</article>

<!-- Container: sized to the container's width -->
<div class="font-sizing-cq" style="container-type: inline-size;">
  <h2 class="heading">Container Heading</h2>
  <p class="text">Container body copy.</p>
</div>

<!-- Compact: one step down -->
<div class="font-sizing-compact">
  <h2 class="heading">Compact Heading</h2>
</div>
```

---


## D. Lists
`.list` is a bulleted (`ul`) or numbered (`ol`) list outside prose, with prose's indent and item spacing. The reset strips a bare list's padding, which leaves its markers hanging outside the box. `.list` puts them back inside, so they sit within a card's or dialog's padding. Put a text atom on the list for its type; `.list` sets the geometry only.

```html
<ul class="list small-text">
  <li><code class="font-mono">tokens/theme.json</code></li>
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

- **Markers:** disc then circle for `ul`; decimal, lower-latin, lower-roman for `ol`, as in prose.
- **Spacing:** `--list-indent` and `--list-gap` (Tier 3, the same values as prose). A compact region halves the gap.
- **Not for** navigation, menus or card grids: those are components with `role="list"` and no markers. Inside `.prose`, a bare list is styled already; don't add `.list`.
