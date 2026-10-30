# 12. Prose
Styles bare HTML (CMS and Markdown output) so it reads like the rest of the library without classes. A molecule: `@scope (.prose) to (.prose-end)`. The audit is in `docs/audit/prose.md`.

| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.prose` | none: it follows the sizing mode around it | `--font-sizing`, `--ui-sizing: compact`, `--link-prominence: subtle` |
| `.prose-end` | | |

## A. Article
```html
<article class="prose">
  <h1>Planting a shade garden</h1>
  <p>Shade under trees is usually dry. Read the <a href="/soil">soil guide</a> first.</p>

  <h2>What to buy</h2>
  <ul>
    <li>Leaf mould</li>
    <li>Mulch for the first summer</li>
  </ul>

  <blockquote>
    <p>The love of gardening is a seed once sown that never dies.</p>
  </blockquote>

  <figure>
    <img src="/border.jpg" alt="Ferns and hostas under a birch tree" width="800" height="533" loading="lazy">
    <figcaption>Figure 1: The border in its second spring.</figcaption>
  </figure>

  <pre><code>:where(textarea) { field-sizing: content; }</code></pre>
</article>
```

- **Type:** each element takes the type of the text atom it stands for: `h1` `.title`, `h2` `.heading`, `h3` `.subheading`, `h4`–`h6` `.small-heading`, `p` and bare lists, description lists and tables `.text`, `small`, `figcaption` and `caption` `.small-text`. The rules live with the atoms (`atoms/text.css`) in a layer under the atom classes, so a text atom on an element wins (`<p class="small-text">`) and any other class keeps the prose look.
- **Rhythm:** the space between blocks follows the sizing mode: `--prose-space` (fixed), `--prose-space-fluid`, `--prose-space-cq`, and half the fixed space when compact. Headings take `1.5em` above, except first or straight after another heading.
- **Measure:** text blocks stop at `--body-measure` (66ch). Paragraphs wrap with `text-wrap: pretty`, headings with `balance`. Hyphenation is `--prose-hyphens` (`none`). The column width belongs to the wrapper the prose sits in.
- **Numerals:** oldstyle figures and hanging punctuation in paragraphs, lining figures elsewhere, tabular figures in tables, a slashed zero in code.
- **Links:** a bare link (no class) is a `.link`. `--link-prominence: subtle` on the prose or a region makes links body-coloured; the underline still marks them.
- **Lists:** bare lists are indented by `--prose-indent`. Nested ordered lists step decimal, lower-latin, lower-roman. In a `<dl>`, `dt` is strong and `dd` is indented.
- **Rules and quotes:** a bare `hr` uses the divider tokens. A `blockquote` has an inline-start rule (`--prose-blockquote-border-width`).
- **Figures:** the caption is small text in `--prose-figcaption-color`, half a rhythm below the media.
- **Code:** a `pre` is a dark band in both themes (`--prose-code-block-bg`, `--prose-code-block-text`). Long lines wrap, so it is never a scrolling region. Code reads left to right in every direction. Inline `code` has a subtle tint (`--prose-code-bg`).
- **Anchors:** an element with an `id` keeps `--prose-scroll-margin` above it when scrolled to. A product with a sticky header adds the header height to that token.

## B. Tables
```html
<div class="prose">
  <table>
    <caption>Plants for dry shade</caption>
    <thead>
      <tr><th scope="col">Plant</th><th scope="col">Height</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Epimedium</th><td>30cm</td></tr>
    </tbody>
  </table>
</div>
```
A bare table gets a light ruled look from the table tokens. A wide table is a `.table` in a scroll wrapper (§13).

## C. Sizing
```html
<article class="prose font-sizing-fluid">…</article>

<div class="ui-compact">
  <article class="prose">…</article>
</div>
```
Prose has no mode of its own. It follows the mode on itself or around it: fixed on a plain page, cq in a dialog, compact in a compact region. The rhythm follows the same mode.

## D. Ending the Scope
```html
<article class="prose">
  <p>Text styled by prose.</p>
  <div class="prose-end">
    <div class="card">…</div>
  </div>
  <p>Prose carries on.</p>
</article>
```
Everything inside `.prose-end` is outside prose: no element type, no margins, and links need a class. The `.prose-end` block itself keeps the rhythm around it. Lists, tables and rules with a class (`ul.cluster`, `.table`, `.divider`) are components and style themselves without one.

## E. Rules
- Don't put a widget in prose without `.prose-end` unless it is built only from classed elements.
- Write emoji in the text. There are no emoji classes.
- **Removed:** `--vert-space`, `--vert-spacing`, `--prose-vert-spacing`, `--prose-font-sizing`, `.vert-spacing-*`, `.font-sizing-tight`, the `.emoji.*` classes, `--prose-link-*`, `--prose-underline-*`, `--prose-body-*`, `--prose-block-width`, `--prose-inset-space*`, `--prose-vert-space*`, `--prose-figcaption-margin-bottom`, `--prose-figcaption-text-wrap`, `--prose-small-font-size`, the underline on nested bold, and `diagonal-fractions`.
