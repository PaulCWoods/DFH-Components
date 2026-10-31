---
title: Footer
tier: organism
summary: The band at the bottom of a page or app, with site links, legal text and contact details.
tokens: footer
storybook: organisms-footer
related: [header, app-shell, grid-grid-carousel, stack-inline-cluster]
---

# 35. Footer
```html playground
<div class="footer" data-axes>
  <div class="footer__bar">
    <p class="small-text text-muted">© 2026 Woodland Plants</p>
    <nav aria-label="Footer, example">
      <ul class="cluster small-text" role="list">
        <li><a href="/accessibility" class="link">Accessibility</a></li>
        <li><a href="/privacy" class="link">Privacy</a></li>
      </ul>
    </nav>
  </div>
</div>
---
Arrangement: One row, Stacked=footer--stacked
```

## Why it exists
People who reach the bottom of a page are often looking for something specific: contact details, an accessibility statement, the small print. A Footer puts those where they expect them, in a real `<footer>` that a screen reader can jump to as the contentinfo landmark.

It works as the [Header](33-header.md) does. The band and its rows are all it draws, and its bars share the site width, so the top and bottom of a page line up. It has no columns of its own: a set of link lists is a [Grid](19b-grid-grid-carousel.md), which already reflows.

The arrangement is a choice about what comes first. One row suits a short Footer. Stacked suits a site whose links matter more than its legal line, and it keeps source order, so reading order and visual order match.

## When to use
- **Once per page,** at the bottom, for site links and legal text.
- **Not for a Card's or a section's own closing row:** that is [`.card__footer`](10-card.md).
- **Not for actions on the page:** those go in the content or a [Button Group](14-button-group.md).

## Rules
- **Landmark:** a `<footer>` directly in `<body>` (or `.app`) is the contentinfo landmark: one per page, no `aria-label`. A `<footer>` inside `<article>` or `<section>` isn't a landmark. Site link lists are a `<nav>` labelled by their heading.

## The Whole Page's Footer
On a real page the band is a `<footer>`. It is a `<div>` in these demos so that this page keeps one contentinfo landmark.

```html
<footer class="footer">
  <div class="footer__bar">
    <p class="small-text text-muted">© 2026 Woodland Plants</p>
    <nav aria-label="Footer">
      <ul class="cluster small-text" role="list">
        <li><a href="/accessibility" class="link">Accessibility</a></li>
        <li><a href="/privacy" class="link">Privacy</a></li>
      </ul>
    </nav>
  </div>
</footer>
```

## Site Links First
The parts in a column, in source order.

```html live
<div class="footer footer--stacked">
  <div class="footer__bar">
    <nav aria-label="Footer, stacked example">
      <ul class="cluster small-text" role="list">
        <li><a href="/accessibility" class="link">Accessibility</a></li>
        <li><a href="/privacy" class="link">Privacy</a></li>
      </ul>
    </nav>
    <p class="small-text text-muted">© 2026 Woodland Plants</p>
  </div>
</div>
```

## Link Lists, Then Legal Text
Link lists, then legal text.

```html live
<div class="footer">
  <div class="footer__bar">
    <div class="grid grid--3-col grid--2xs">
      <nav aria-labelledby="footer-shop" class="stack">
        <h3 id="footer-shop" class="micro-heading">Shop</h3>
        <ul class="stack gap-xs small-text" role="list">
          <li><a href="/plants" class="link link--plain">Plants</a></li>
          <li><a href="/borders" class="link link--plain">Borders</a></li>
        </ul>
      </nav>
      <nav aria-labelledby="footer-help" class="stack">
        <h3 id="footer-help" class="micro-heading">Help</h3>
        <ul class="stack gap-xs small-text" role="list">
          <li><a href="/delivery" class="link link--plain">Delivery</a></li>
          <li><a href="/returns" class="link link--plain">Returns</a></li>
        </ul>
      </nav>
      <nav aria-labelledby="footer-about" class="stack">
        <h3 id="footer-about" class="micro-heading">About</h3>
        <ul class="stack gap-xs small-text" role="list">
          <li><a href="/nursery" class="link link--plain">Nursery</a></li>
          <li><a href="/contact" class="link link--plain">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="footer__bar">
    <p class="small-text text-muted">© 2026 Woodland Plants</p>
  </div>
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use one `<footer>` directly in `<body>` or `.app`. | Label the contentinfo landmark with `aria-label`. |
| Use two `__bar`s for two rows. | Add padding or border utilities to the Footer. |
| Use `--stacked` when the site links come first. | Reorder the parts with CSS. |
| Label each list of site links by its heading. | Leave several `<nav>`s with no names. |

## Reference
The band at the bottom of a page or app: site links, legal text, contact details. An organism (`organisms/footer.css`) on the Header's model: the Footer draws the band and lays out its rows; what's in a row (a cluster of links, small text, a grid of link lists) styles itself.

## Options
| Axis | Modifiers (on `.footer`) |
| :--- | :--- |
| Arrangement | one row (default), `--stacked` (each bar's parts in a column) |
| Width | bars capped at the site width (default), `--stretch` (no cap) |

### Further rules
- **`.footer`** is the band: surface, top border, and inline padding (`--footer-padding-inline`, plus the safe-area insets). Always full width.
- **`.footer__bar`** is a row, capped at `--footer-max-width` (the site width) and centred, so its content lines up with a `.wrapper`'s and the Header's. The last part sits at the end; a single part fills the row. Two rows are two bars, with a rule between them.
- **`--stacked`** sets each bar's parts in a column, in source order, at the start: the site links above the legal line. One line suits a short footer on a docs or app page; stacked suits a site whose links come first.
- **`--stretch`** drops the width cap.
- **Tokens:** `footer.bg`, `border-width`, `border-color`, `border-style`, `padding-block`, `padding-inline`, `gap`, `max-width`.
