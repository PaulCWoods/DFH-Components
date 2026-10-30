# 19d. App Shell
The page shell: header, main and footer in rows, the main row taking the free height so the footer sits at the bottom of a short page. Layout (`layout/app.css`, `layout/main.css`); the header, sidebar and footer it places are organisms.

| Part | Role |
| :--- | :--- |
| `.app` | Places its direct `<header>`/`.header`, `<main>`/`.main`/`.app__workspace` and `<footer>`/`.footer` in rows |
| `.app__workspace` | Side panes (`.sidebar`, `<aside>`) beside the main. Below 48rem they stack, side pane first, at full width |
| `.app--viewport` | The shell fills the screen and panes scroll inside it. Below 48rem wide or 36rem tall it scrolls as a page again |
| `.main` | Cushion padding round the content; no inline padding when its child is a `.wrapper` |
| `.main--flush` | No padding |
| `.main--viewport` | As tall as its track, for panes that scroll inside it |

## A. Markup
```html
<body class="app">
  <a href="#main" class="skip-link">Skip to content</a>
  <header class="header header--sticky">…</header>
  <div class="app__workspace">
    <div class="sidebar sidebar--sticky max-md:hide">…</div>
    <main id="main" class="main">
      <div class="wrapper stack">…</div>
    </main>
  </div>
  <footer class="footer">…</footer>
</body>
```

## B. Rules
- **Landmarks:** one shell per page. Its `<header>` is the banner, its `<footer>` the contentinfo, and there is one `<main>`. The skip link comes first; it is fixed, so it takes no row.
- **Small screens:** nothing becomes a drawer on its own. A sidebar stacks above the main, or the product hides it (`max-md:hide`) and puts the same navigation in a `.dialog--drawer` opened from the header (§34).
- **Viewport:** in `.app--viewport` the main scrolls; give it `tabindex="-1"` if it holds nothing focusable near the top, so keyboard users can scroll it after the skip link.
- **Removed:** `.workspace` (use `.app__workspace`), `.app__aside`, `.app__footer` (use `.footer`), `.app__sidebar` (use `.sidebar`), `.app--locked` (use `--viewport`), `.main--panels` (use `--viewport`), the `aside` grid row (side panes go in the workspace), the shell's scroll-state container.
