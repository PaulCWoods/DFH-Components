---
title: Prose
tier: molecule
summary: Styles bare HTML, such as CMS and Markdown output, so it reads like the rest of the library without classes.
tokens: prose
storybook: molecules-prose
related: [text-heading, wrapper, link-block-link, table]
---

# 12. Prose
```html live
<div class="prose">
  <h2>Planting a shade garden</h2>
  <p>Shade under trees is usually dry. Read the <a href="/soil">soil guide</a> first.</p>
  <ul>
    <li>Leaf mould</li>
    <li>Mulch for the first summer</li>
  </ul>
</div>
```

## Purpose
Long text usually comes from somewhere that can't add classes, such as a CMS or a Markdown file. Prose makes that output read like the rest of the library by styling the bare elements.

Each element takes the type of the text atom it stands for, so a heading in an article matches a heading in an interface. Prose has no options of its own. It follows the sizing mode around it, and so does the space between its blocks, so one article sits properly in a page, a Dialog or a compact region.

It styles everything in its scope, whatever classes an element has, because CMSs put their own classes on every block. That's why `.prose-end` exists: anything that should stay a component has to leave the scope.

## When to use
- **For long-form text you can't put classes on:** CMS output, Markdown, an article.
- **Not for markup you write by hand in an interface:** use [text atoms](20-text-heading.md) and a list (`.list`).
- **Not for components in the text:** put those in a `.prose-end`.

## Rules
- **Which elements:** every element in the prose takes the prose look, whatever classes it has (a CMS's, such as WordPress's `wp-block-list`; a text atom on an element still wins for type). Components (`ul.cluster`, `.table`, `.divider`, a Card) and widgets go in a `.prose-end`. Links are the exception: a Link with a class is left alone.
- **Anchors:** an element with an `id` keeps `--prose-scroll-margin` above it when scrolled to, below a sticky Header, which the page already clears.

## Article
A real article starts at `<h1>`; this one starts at `<h3>` to fit the page around it.
```html live
<article class="prose">
  <h3>Planting a shade garden</h3>
  <p>Shade under trees is usually dry. Read the <a href="/soil">soil guide</a> first.</p>

  <h4>What to buy</h4>
  <ul>
    <li>Leaf mould</li>
    <li>Mulch for the first summer</li>
  </ul>

  <blockquote>
    <p>The love of gardening is a seed once sown that never dies.</p>
  </blockquote>

  <figure>
    <img src="/examples/cover.svg" alt="Abstract cover artwork" width="800" height="533" loading="lazy">
    <figcaption>Figure 1: The cover of the planting guide.</figcaption>
  </figure>

  <pre><code>:where(textarea) { field-sizing: content; }</code></pre>
</article>
```

## A component in the text
```html live
<article class="prose">
  <p>Text styled by prose.</p>
  <div class="prose-end">
    <div class="card">
      <div class="card__body"><p class="text">A card, outside prose.</p></div>
    </div>
  </div>
  <p>Prose carries on.</p>
</article>
```
Everything inside `.prose-end` is outside prose: no element type, no margins, and links need a class. The `.prose-end` block itself keeps the rhythm around it. Components on lists, Tables and rules (`ul.cluster`, `.table`, `.divider`) need one too: prose styles every list, Table and rule in its scope.

## Sizing comes from around it
```html live
<article class="prose font-sizing-fluid">
  <p>This text grows with the viewport.</p>
</article>

<div class="ui-compact">
  <article class="prose">
    <p>This text takes the compact size from the region around it.</p>
  </article>
</div>
```
Prose has no mode of its own. It follows the mode on itself or around it: fixed on a plain page, cq in a Dialog, compact in a compact region. The rhythm follows the same mode.

## Do and don't
| Do | Don't |
| :--- | :--- |
| Put components and widgets in a `.prose-end`. | Leave a `ul.cluster`, `.table` or Card in the prose, which styles it too. |
| Put a text atom on an element to change its type. | Add a class that only sets type another way. |
| Set the sizing mode on the prose or around it. | Look for a prose size option. |
| Set the column width on the Wrapper the prose sits in. | Set a width on the prose. |
| Write emoji in the text. | Use emoji classes. |

## Reference
Styles bare HTML (CMS and Markdown output) so it reads like the rest of the library without classes. A molecule: `@scope (.prose) to (.prose-end)`.

## Options
| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.prose` | `--body-alt`, `--lead`; it follows the sizing mode around it | `--font-sizing`, `--ui-sizing: compact`, `--link-prominence: subtle` |
| `.prose-end` | | |

### Further rules
- **Type:** each element takes the type of the text atom it stands for: `h1` `.title`, `h2` `.heading`, `h3` `.subheading`, `h4`–`h6` `.small-heading`, `p`, lists, description lists and Tables `.text`, `small`, `figcaption` and `caption` `.small-text`. The rules live with the atoms (`atoms/text.css`) in a layer under the atom classes, so a text atom on an element wins (`<p class="small-text">`) and any other class keeps the prose look.
- **Rhythm:** the space between blocks follows the sizing mode: `--prose-space` (fixed), `--prose-space-fluid`, `--prose-space-cq`, and half the fixed space when compact. Headings take `1.5em` above, except first or straight after another heading.
- **Measure:** text blocks stop at `--body-measure` (66ch). Paragraphs wrap with `text-wrap: pretty`, headings with `balance`. Hyphenation is `--prose-hyphens` (`none`). The column width belongs to the Wrapper the prose sits in.
- **Numerals:** oldstyle figures and hanging punctuation in paragraphs, lining figures elsewhere, tabular figures in Tables, a slashed zero in code.
- **Links:** a bare link (no class) is a `.link`. `--link-prominence: subtle` on the prose or a region makes links body-coloured; the underline still marks them.
- **Body serif:** `--body-alt` sets paragraphs, lists and description lists in the alternate body family (`--body-alt-font-family`, as `.font-serif` does); headings, captions, tables and code keep theirs.
- **Lead:** `--lead` gives the first paragraph that is a direct child of the prose the type of `.large-text`, in every sizing mode, for an article whose first paragraph comes from a CMS and can't carry a class. Where you write the markup, put `.large-text` on the paragraph instead.
- **Lists:** lists are indented by `--prose-indent`. Nested ordered lists step decimal, lower-latin, lower-roman. In a `<dl>`, `dt` is strong and `dd` is indented.
- **Rules and quotes:** an `hr` uses the Divider tokens. A `blockquote` has an inline-start rule (`--prose-blockquote-border-width`).
- **Figures:** the caption is small text in `--prose-figcaption-color`, half a rhythm below the media.
- **Code:** a `pre` is a dark band in both themes (`--prose-code-block-bg`, `--prose-code-block-text`). Long lines wrap, so it is never a scrolling region. Code reads left to right in every direction. Inline `code` has a subtle tint (`--prose-code-bg`), and a long name or address in it breaks rather than widen the page. A Code Block placed straight in the prose keeps its own styles and takes the prose rhythm around it.
- Put every component and widget in prose inside a `.prose-end`.
- Write emoji in the text. There are no emoji classes.

## Tables
```html live
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
A Table in prose gets a light ruled look from the Table tokens. A wide Table is a `.table` in a [scroll wrapper](13-table.md).
