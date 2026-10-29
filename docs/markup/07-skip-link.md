# 7. Skip Link Primitive (WCAG 2.4.1 Bypass Blocks)
Put the skip link first in `<body>` and point it at a landmark (`<main id="main">`). It is collapsed until focused, then opens to at least 48px. The focus ring uses the link's text colour, so it shows on the accent fill. `.skip-link--floating` slides in from the top-start corner without moving the layout. In a `.skip-links` group, every link shows while one has focus. The audit is in `docs/audit/link.md`.

```html
<!-- In-flow bar, first in <body> -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- Floating card -->
<a href="#main" class="skip-link skip-link--floating">Skip to main content</a>

<!-- Several destinations -->
<nav class="skip-links" aria-label="Skip links">
  <ul>
    <li><a href="#main" class="skip-link">Skip to main content</a></li>
    <li><a href="#navigation" class="skip-link">Skip to navigation</a></li>
    <li><a href="#footer" class="skip-link">Skip to footer</a></li>
  </ul>
</nav>

<main id="main">…</main>
```

