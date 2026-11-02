---
title: Link and Block Link
tier: atom
summary: A way to go somewhere else, in running text or as a row of its own.
tokens: [link, block-link]
storybook: atoms-link
related: [button, breadcrumb, skip-link]
---

# 8. Link & Block Link Primitives
```html playground cluster
<a href="#when-to-use" class="link" data-axes>Read the planting guide</a>
---
Prominence: Default, Subtle=link--subtle, Plain=link--plain
```

## Purpose
A Link makes one promise: this goes somewhere. It's a real `<a href>`, so the browser gives it everything people expect from one: opening in a new tab, copying the address and the back button.

The underline is what marks it. Link colour is close to body text, and colour alone doesn't reach everyone, so the underline stays, drawn at the full link colour. It thickens on hover. There's no separate hover colour that could fall below 4.5:1.

Links take no intent and no size. Something that deletes or saves is an action, and that's a [Button](01-button.md), while an inline Link takes the size of the text around it. The Block Link exists for a Link that stands alone, because its label can wrap, which a Button's can't.

## When to use
- **`.link` for going somewhere** from a sentence, a list or a title.
- **`.block-link` for a Link that stands alone** and is the main thing in its row. Its label wraps, which a Button's doesn't.
- **Not for an action:** something that changes the page or saves data is a [Button](01-button.md).

## Rules
- **The underline marks the Link** (WCAG 1.4.1).
- **`--plain` never goes in running text.** Use it where context already marks the Link: navigation, a list of links, a Card title.
- **On a dark band**, put `.color-scheme-dark` on the band. Every token inside flips, links included. There is no inverted link class.

## Keyboard and screen readers
- **Tab** reaches any `<a>` with an `href`. Without one it isn't a Link, and it can't be focused.
- **Enter** follows it. Space scrolls the page instead, which is one more reason an action should be a Button.
- **A screen reader** can list a page's Links out of context, so each one's text has to make sense on its own.
- **A Link that opens a new tab** says so, in hidden text, because the back button won't work there.

## Which Link Where
```html live
<!-- In running text -->
<p>Read the <a href="/accessibility" class="link">accessibility standards</a> first.</p>

<!-- Subtle: the text colour, still underlined -->
<a href="/category/design" class="link link--subtle">Design systems</a>

<!-- Plain: navigation only -->
<nav aria-label="Example links">
  <a href="/privacy" class="link link--plain">Privacy</a>
</nav>

<!-- External: no space between text and icon; say it opens a new tab -->
<a href="https://www.w3.org" class="link" target="_blank" rel="noopener noreferrer">W3C guidelines<span class="sr-only"> (opens in a new tab)</span><svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg></a>

<!-- On a dark band -->
<section class="color-scheme-dark bg-surface p-md">
  <p>Follow the <a href="/rss" class="link">RSS feed</a>.</p>
</section>
```

## A Link That Stands Alone
A Block Link is the main thing in its row. Its label can run to several lines.
```html playground width=md
<a href="#when-to-use" class="block-link" data-axes>
  <span class="block-link__text">Colour contrast beyond 4.5:1</span>
  <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</a>
---
Prominence: Default, Strong=block-link--strong, Subtle=block-link--subtle, Plain=block-link--plain
Size: Default, Small=block-link--sm
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Keep an underline in running text. | Use `--plain` in a sentence, where nothing else marks the Link. |
| Say a Link opens a new tab, with hidden text and an icon. | Open a new tab without warning. |
| Write text that makes sense alone: "Read the guidelines". | Write "Click here" or "More". |
| Use `.color-scheme-dark` on a dark band. | Look for an inverted link class. |

## Reference
```html live
<p>Read the <a href="#which-link-where" class="link">accessibility standards</a> first.</p>
```

## Options
| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.link` | Prominence: default (accent, underlined), `--subtle` (text colour, underlined), `--plain` (underline on hover and focus only) | `--link-prominence` |
| `.block-link` | Prominence: outline (default), `--strong`, `--subtle`, `--plain`; size: default, `--sm` | `--block-link-prominence`, `--block-link-size` |

### Further rules
- **The underline marks the Link** (WCAG 1.4.1). It is drawn at the full link colour and thickens on hover; there is no hover colour.
- **No intent or size on links.** A destructive action is a `.button--danger`; an inline link takes the size of its text.
- **Bare `<a>`** (no class) keeps an underline and the text colour, from the reset.
- `.link--stretched` makes the Link's `::after` cover its nearest positioned ancestor, for a whole-row or whole-card target.
- Block link `--sm` keeps a 48px hit area unless the product opts into fine-pointer targets; a compact container steps it to `--sm`. Its label wraps, which is why it isn't a Button.

## Block Links
```html live
<a href="/case-studies/contrast" class="block-link">
  <span class="block-link__text">Colour contrast beyond 4.5:1</span>
  <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</a>

<!-- Prominence and size -->
<a href="/start" class="block-link block-link--strong">
  <span class="block-link__text">Start here</span>
  <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</a>
<a href="/topics/wcag" class="block-link block-link--subtle block-link--sm">
  <span class="block-link__text">WCAG 2.2 guidelines</span>
  <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</a>

<!-- A list of block links, set once on the container -->
<ul class="stack p-0 m-0" role="list" style="--block-link-prominence: subtle;">
  <li>
    <a href="/topics/wcag" class="block-link">
      <span class="block-link__text">WCAG 2.2 guidelines</span>
      <svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
    </a>
  </li>
</ul>
```
