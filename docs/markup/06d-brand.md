---
title: Brand
tier: atom
summary: The product's mark and name, as a Link home.
tokens: brand
storybook: atoms-brand
related: [header, footer, link-block-link, icon-icon-box]
---

# 6d. Brand
```html live
<a href="#main" class="brand">
  <svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
  <span class="brand__name">Design For Humans</span>
</a>
```

## Purpose
The Brand answers two questions at once: whose site is this, and how do I get back to the start? People look for both in the same place, so it's one thing rather than a logo beside a link.

It's a whole Link on its own, setting its own colour, hover and focus ring. Adding `.link` or `.button` would pull it towards looking like every other link on the page, and it's meant to look like the product.

The name stays in the markup on every screen. On the narrowest ones it can give way visually to the mark, but it still names the Link, so nobody using a screen reader is left with an unnamed image. Size is the product's decision, so it's set with a token and there are no size modifiers.

## When to use
- **For the Link home:** the first thing in a Header, a drawer or a Footer.
- **Not for a page's title:** that is a [heading](20-text-heading.md).
- **Not for a logo of someone else's:** a social or partner link is a Link or a Button with an icon.

## Rules
- **Either part can be left out.** A name alone needs nothing else. A mark alone needs `.sr-only` text, so the Link has a name.
- **The name names the Link,** so the mark takes `aria-hidden="true"`.
- **Narrow screens:** beside a mark, at 20em and under, the name is hidden visually and still names the Link. A name with no mark always shows.

## Name Only
```html live
<a href="#main" class="brand">
  <span class="brand__name">Woodland Plants</span>
</a>
```

## Mark Only
```html live
<a href="#main" class="brand">
  <svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
  <span class="sr-only">Design For Humans home</span>
</a>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Set `--brand-color` for another colour | Add `.link` or `.button` classes to it |
| Keep the name in the markup on every screen | Hide the name with `display: none` |
| Set `--brand-mark-size` for a larger logo | Add a text atom to `.brand__name` |

## Reference
The product's mark and name, as a Link home. An atom and a whole link on its own: it sets its colour, hover and focus ring, so it takes no `.link` class.

## Options
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Density | default, a compact container steps it down | `--ui-sizing: compact` |

| Part | What it is |
| :--- | :--- |
| `.brand__mark` | The logo, an icon from the sprite |
| `.brand__name` | The name, in the display type |

### Further rules
- **Target size and states:** on an `<a>`, it is at least the target size (the small target in a compact container), with hover and focus states. On a `<button>`, a mark that opens the app's menu, the same, named with `.sr-only` text for what it does ("Menu"). On any other element, such as a `<span>` that labels an app, it has neither.
- **Tokens:** `--brand-color`, `--brand-gap`, `--brand-mark-size` and the `--brand-font-*` type tokens. Size is a product decision, so there are no size modifiers.
