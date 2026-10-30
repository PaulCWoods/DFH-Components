# 8. Link & Block Link Primitives
| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.link` | Prominence: default (accent, underlined), `--subtle` (text colour, underlined), `--plain` (underline on hover and focus only) | `--link-prominence` |
| `.block-link` | Prominence: outline (default), `--strong`, `--subtle`, `--plain`; size: default, `--sm` | `--block-link-prominence`, `--block-link-size` |

- **The underline marks the link** (WCAG 1.4.1). It is drawn at the full link colour and thickens on hover; there is no hover colour.
- **`--plain` never goes in running text.** Use it where context already marks the link: navigation, a list of links, a card title.
- **No intent or size on links.** A destructive action is a `.button--danger`; an inline link takes the size of its text.
- **On a dark band**, put `.color-scheme-dark` on the band. Every token inside flips, links included. There is no inverted link class.
- **Bare `<a>`** (no class) keeps an underline and the text colour, from the reset.
- `.link--stretched` makes the link's `::after` cover its nearest positioned ancestor, for a whole-row or whole-card target.
- Block link `--sm` keeps a 48px hit area unless the product opts into fine-pointer targets; a compact container steps it to `--sm`. Its label wraps, which is why it isn't a button.

## A. Inline Links
```html
<!-- In running text -->
<p>Read the <a href="/accessibility" class="link">accessibility standards</a> first.</p>

<!-- Subtle: the text colour, still underlined -->
<a href="/category/design" class="link link--subtle">Design systems</a>

<!-- Plain: navigation only -->
<nav aria-label="Footer">
  <a href="/privacy" class="link link--plain">Privacy</a>
</nav>

<!-- External: no space between text and icon; say it opens a new tab -->
<a href="https://www.w3.org" class="link" target="_blank" rel="noopener noreferrer">W3C guidelines<span class="sr-only"> (opens in a new tab)</span><svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg></a>

<!-- On a dark band -->
<section class="color-scheme-dark">
  <p>Follow the <a href="/rss" class="link">RSS feed</a>.</p>
</section>
```

## B. Block Links
```html
<a href="/case-studies/contrast" class="block-link">
  <span class="block-link__text">Colour contrast beyond 4.5:1</span>
  <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</a>

<!-- Prominence and size -->
<a href="/start" class="block-link block-link--strong">…</a>
<a href="/topics/wcag" class="block-link block-link--subtle block-link--sm">…</a>

<!-- A list of block links, set once on the container -->
<ul class="stack list-none p-0 m-0" style="--block-link-prominence: subtle;">
  <li>
    <a href="/topics/wcag" class="block-link">
      <span class="block-link__text">WCAG 2.2 guidelines</span>
      <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
    </a>
  </li>
</ul>
```

