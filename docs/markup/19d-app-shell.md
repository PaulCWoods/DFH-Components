---
title: App Shell
tier: layout
summary: The page shell that places the Header, main and footer in rows, with side panes beside the main.
storybook: layout-app-shell
related: [header, sidebar, footer, wrapper, split, modal-dialog]
---

# 19d. App Shell
```html live
<div class="border rounded-md">
  <div class="app min-h-0">
    <div class="header header--compact">
      <div class="header__bar"><span class="small-heading">Header</span></div>
    </div>
    <div class="app__workspace">
      <div class="sidebar sidebar--subtle">
        <div class="sidebar__body"><p class="small-text">Sidebar</p></div>
      </div>
      <div class="main"><p class="text">The main row takes the free height.</p></div>
    </div>
    <div class="footer">
      <div class="footer__bar"><p class="small-text text-muted">Footer</p></div>
    </div>
  </div>
</div>
```

## Why it exists
Every page has the same outline: a Header, the main content, a Footer. The shell places those three in rows and gives the free height to the main, so the Footer stays at the bottom of a short page. It also keeps the landmarks in the one place a page needs them.

An app often wants its panes to scroll inside the screen, and that's the risky part, because a locked region clips whatever doesn't fit. So anything holding content scrolls, and the lock releases on small or short screens, where panes would be too short to use.

It decides nothing about small-screen navigation. Moving a Sidebar into a drawer means choosing what to duplicate, and that's the product's call.

## When to use
- **Once per page,** on `<body>`, to place the Header, main and footer.
- **For an app whose panes scroll inside the screen,** with `.app--viewport`.
- **Not to centre or cap content:** that is a [Wrapper](19-wrapper.md).
- **Not for panes inside the content:** that is a [Split](19c-split.md).

## Rules
- **Landmarks:** one shell per page. Its `<header>` is the Banner, its `<footer>` the contentinfo, and there is one `<main>`. The Skip Link comes first; it is fixed, so it takes no row.
- **Small screens:** nothing becomes a drawer on its own. A Sidebar stacks above the main, or the product hides it (`max-md:hide`) and puts the same navigation in a `.dialog--drawer` opened from the Header; see [Sidebar](34-sidebar.md).
- **Never clip a locked region.** The shell and workspace hide overflow because their rows and panes are sized to fit; anything holding content (the main, a pane) scrolls instead, so no screen size can strand content out of reach.
- **Viewport:** in `.app--viewport` the main scrolls; give it `tabindex="-1"` if it holds nothing focusable near the top, so keyboard users can scroll it after the Skip Link.

## Keyboard and screen readers
The shell adds no behaviour. The browser provides this from the elements in it.
- **Tab** first reaches the [Skip Link](07-skip-link.md), which moves past the Header and any Sidebar to the main.
- **Landmarks** let a screen reader jump straight to the banner, the main and the contentinfo. They come from `<header>`, `<main>` and `<footer>`, which is why each appears once.
- **Reading order** follows the source. Below 48rem a side pane stacks above the main, in the same order.
- **A scrolling main** in `.app--viewport` needs focus inside it before arrow keys scroll it. A Skip Link to a main with `tabindex="-1"` gives it that.

## A Whole Page
A whole page, so it can't be shown live here. The miniature at the top uses `<div>`s and `.min-h-0` for that reason.

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

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use one shell, one `<header>`, one `<main>` and one `<footer>` per page. | Nest a shell in a shell. |
| Put the Skip Link first. | Give the Skip Link a row. |
| Put side panes in `.app__workspace`. | Add an `aside` as a direct child of `.app`. |
| Let the main scroll when its content outgrows a locked shell. | Clip anything that holds content. |
| Give a scrolling main `tabindex="-1"` if nothing near its top takes focus. | Leave keyboard users unable to scroll it. |

## Reference
The page shell: header, main and footer in rows, the main row taking the free height so the Footer sits at the bottom of a short page. Layout (`layout/app.css`, `layout/main.css`); the Header, Sidebar and footer it places are organisms.

## Options
| Part | Role |
| :--- | :--- |
| `.app` | Places its direct `<header>`/`.header`, `<main>`/`.main`/`.app__workspace` and `<footer>`/`.footer` in rows |
| `.app__workspace` | Side panes (`.sidebar`, `<aside>`) beside the main. Below 48rem they stack, side pane first, at full width |
| `.app--viewport` | The shell fills the screen and panes scroll inside it. Below 48rem wide or 36rem tall it scrolls as a page again |
| `.main` | Cushion padding round the content; no inline padding when its child is a `.wrapper` |
| `.main--flush` | No padding |
| `.main--viewport` | As tall as its track, for panes that scroll inside it. It never clips: when its content doesn't fit (the panes stack, or a sticky header and a pane outgrow it), the main scrolls |

### Further rules
- **Size containers:** `.main` and `.app__workspace` are `container-type: inline-size`, so container-prefixed classes (`@max-md:card--flat`, `@max-2xl:hide`) and container queries anywhere in the shell respond to the main's width. Add `.container-type-normal` to opt out, for instance on a `.main` that must shrink to its content in a flex row.
- **Checked:** `npm run check:layout` tests that no screen size strands content out of reach.
