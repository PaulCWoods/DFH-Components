---
title: Columns
tier: layout
summary: Content in newspaper columns, running down one column and on into the next, for long lists people scan.
storybook: layout-columns
related: [grid, stack-inline-cluster, utilities, footer]
---

# 19e. Columns
```html live
<ul class="columns" role="list">
  <li class="text">Astrantia</li>
  <li class="text">Brunnera</li>
  <li class="text">Campanula</li>
  <li class="text">Digitalis</li>
  <li class="text">Epimedium</li>
  <li class="text">Geranium</li>
  <li class="text">Hellebore</li>
  <li class="text">Hosta</li>
  <li class="text">Pulmonaria</li>
</ul>
```

## Purpose
A long list of short things, such as a glossary, an index of links or a site map, wastes most of the width when it runs in one column, and in a Grid it reads across each row. Columns sets it the way a newspaper does: down one column, then on into the next.

Like the Grid, it has no breakpoints. Each column has a minimum width, and the browser fits as many as there's room for, down to one on a phone or when the text is zoomed.

## When to use
- **For a long list people scan:** a glossary, an index, links in a site map footer, a list of tags.
- **For print,** where a page doesn't scroll and columns of prose read well.
- **Not for items people compare across a row,** such as Cards: that's a [Grid](19b-grid-grid-carousel.md).
- **Not for running prose on a screen:** readers would reach the foot of a column and have to scroll back up for the next.
- **Not for a row or column of things:** that's an Inline, a Cluster or a [Stack](22-stack-inline-cluster.md).

## Rules
- **Reading order runs down each column.** Put things in the order they should be read, top to bottom.
- **Never interactive rows:** form fields or a long run of controls in columns make focus jump from the foot of one column to the top of the next. A list of links, read as a list, is fine.
- **Choose the minimum width for the content:** `--2xs` for tags or single words, the default for short entries, `--sm` or `--md` for entries a line or two long.
- **Items stay whole:** each direct child stays in one column. Add `--flow` to let items run on into the next column, as text does.
- **Lists:** a list loses its markers, so give it `role="list"`.
- **Links one above another** need 24px between them (WCAG 2.5.8 Target Size (Minimum)): give each item `py-xs`, as a Stack of links takes `gap-xs`.
- **Container variants** need a container ancestor (`.container-inline`, a Card, the Header, a Split); without one they never apply.

## A glossary under letters
A heading across every column with `column-span-all`, and each letter's terms kept together in a `<div>`, since items stay whole. Padding at the foot of each group (`pb-sm`) separates them; at the foot of a column it's simply cut off.

```html live
<div class="columns columns--3-col">
  <h3 class="small-heading column-span-all mb-xs">Shade plants</h3>
  <div class="stack gap-2xs pb-sm">
    <h4 class="micro-heading">A</h4>
    <p class="small-text">Astilbe</p>
    <p class="small-text">Astrantia</p>
  </div>
  <div class="stack gap-2xs pb-sm">
    <h4 class="micro-heading">B</h4>
    <p class="small-text">Bergenia</p>
    <p class="small-text">Brunnera</p>
  </div>
  <div class="stack gap-2xs pb-sm">
    <h4 class="micro-heading">E</h4>
    <p class="small-text">Epimedium</p>
  </div>
  <div class="stack gap-2xs pb-sm">
    <h4 class="micro-heading">H</h4>
    <p class="small-text">Hellebore</p>
    <p class="small-text">Heuchera</p>
    <p class="small-text">Hosta</p>
  </div>
</div>
```

## A site map with rules between
`--ruled` draws a line between the columns, from the same tokens as a [Divider](15-divider.md).

```html live
<nav aria-label="Site map">
  <ul class="columns columns--2xs columns--ruled small-text" role="list">
    <li class="py-xs"><a class="link" href="#plants">Plants</a></li>
    <li class="py-xs"><a class="link" href="#planting-guides">Planting guides</a></li>
    <li class="py-xs"><a class="link" href="#garden-tours">Garden tours</a></li>
    <li class="py-xs"><a class="link" href="#seed-swaps">Seed swaps</a></li>
    <li class="py-xs"><a class="link" href="#volunteering">Volunteering</a></li>
    <li class="py-xs"><a class="link" href="#contact-us">Contact us</a></li>
  </ul>
</nav>
```

## Do and don't

| Do | Don't |
| :--- | :--- |
| Use Columns for a long list read top to bottom | Set running prose in columns on a screen |
| Let the minimum width decide how many columns fit | Fix a count with no thought for narrow screens |
| Keep each group of terms in one element, so it stays whole | Put form fields or a row of controls in columns |

## Reference

## Options

| Option | Class or hook | Notes |
| :--- | :--- | :--- |
| Minimum column width | `--2xs`, `--xs` (default), `--sm`, `--md`, or `--columns-width` | The narrowest a column gets, from the block steps the Grid uses: about 8, 16, 24 and 36rem |
| Most columns | `--2-col` … `--4-col`, or `--columns-count` | A maximum; columns still won't go below the minimum width |
| From a container size | `@xs:columns--2-col` … `@7xl:columns--4-col` | Tailwind's container scale, as on the Grid |
| Gap | `--gap` | Default the spacing step, the compact step under `--ui-sizing: compact` |
| Rules | `--ruled` | `column-rule` from the rule width, style and colour |
| Items break | `--flow` | Items run on from one column into the next |

### Further rules
- **Breaks:** `break-inside-avoid` keeps something nested whole, `break-after-avoid` keeps a heading with what follows, and `column-span-all` runs a heading across every column. They're utilities, so they work in print too. There's no utility to force a new column: on a screen with room for one column, it would add a second beside it and the page would scroll sideways.
- **Hooks stay put:** `--gap`, `--columns-width` and `--columns-count` are registered with `inherits: false`, so a Columns inside another doesn't take its settings.
- **Prose:** Prose has no columns option for now.

### Markup
```html
<ul class="columns columns--3-col" role="list">
  <li>…</li>
</ul>

<div class="container-inline">
  <div class="columns @3xl:columns--2-col">…</div>
</div>
```
