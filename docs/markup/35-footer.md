# 35. Footer
The band at the bottom of a page or app: site links, legal text, contact details. An organism (`organisms/footer.css`) on the header's model: the footer draws the band and lays out its rows; what's in a row (a cluster of links, small text, a grid of link lists) styles itself.

## A. Markup
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

<!-- Two rows: link lists, then legal text -->
<footer class="footer">
  <div class="footer__bar">
    <div class="grid grid--3-col grid--2xs">…a <nav> per list…</div>
  </div>
  <div class="footer__bar">…</div>
</footer>
```

## B. Rules
- **`.footer`** is the band: surface, top border, safe-area padding. Always full width.
- **`.footer__bar`** is a row, capped at `--footer-max-width` (the site width) and centred, so it lines up with `.wrapper` and `.header__bar`. The last part sits at the end; a single part fills the row. Two rows are two bars, with a rule between them.
- **Landmark:** a `<footer>` directly in `<body>` (or `.app`) is the contentinfo landmark: one per page, no `aria-label`. A `<footer>` inside `<article>` or `<section>` isn't a landmark. Site link lists are a `<nav>` labelled by their heading.
- **Tokens:** `footer.bg`, `border-width`, `border-color`, `border-style`, `padding-block`, `padding-inline`, `gap`, `max-width`.
- **Removed:** `.app__footer`; the footer's own padding (the bars have it); `padding-0` and border utilities on it.
