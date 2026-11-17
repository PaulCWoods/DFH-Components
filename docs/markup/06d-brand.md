---
title: Brand
tier: atom
summary: The product's logo and name, as a Link home.
tokens: brand
storybook: atoms-brand
related: [header, footer, sidebar, link-block-link, icon-icon-box, responsive-visibility]
---

# 6d. Brand
```html live
<a href="#main" class="brand">
  <svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#brand-design-for-humans"/></svg>
  <span class="brand__name">Design For Humans</span>
</a>
```

## Purpose
The Brand answers two questions at once: whose site is this, and how do I get back to the start? People look for both in the same place, so it's one thing rather than a logo beside a link.

It's a whole Link on its own, setting its own colour, hover and focus ring. Adding `.link` or `.button` would pull it towards looking like every other link on the page, and it's meant to look like the product.

It has three parts, and any can be left out. The **Logo** is the full logo, often a wordmark. The **Mark** is the small one, a symbol that fits a square. The **Name** is text, such as the product's name beside a company's Logo. Beside a Logo the Mark waits in the markup, hidden, and stands in for the Logo where there's no room for it: on a phone, or in a Sidebar rail.

The name stays in the markup on every screen. On the narrowest ones it gives way visually to the Mark, but it still names the Link, so nobody using a screen reader is left with an unnamed image. Size is the product's decision, so it's set with a token and there are no size modifiers.

## When to use
- **For the Link home:** the first thing in a Header, a drawer or a Footer.
- **Not for a page's title:** that is a [heading](20-text-heading.md).
- **Not for a logo of someone else's:** a social or partner link is a Link or a Button with an icon.

## Rules
- **Any part can be left out.** A Name alone needs nothing else. Without a Name, add `.sr-only` text, so the Link has a name.
- **The Name names the Link,** so the Logo and Mark are decorative: `alt=""` on an `<img>`, `aria-hidden="true"` on an `<svg>`.
- **Give a Logo a Mark.** It's what shows where the Logo doesn't fit.
- **Narrow containers:** at 20em and under, a Brand with a Mark shows the Mark alone, as big as a Button. The Logo is hidden and the Name hidden visually, still naming the Link. A Brand with no Mark always shows its Name.
- **The Mark alone at a width you choose:** add a `hide-labels` condition, as for Buttons: `max-md:hide-labels` on the Brand, or on the Header around it. Don't hide the Name itself with `sr-only`: the Brand can't see that, so the Mark stays small.
- **A wide Logo needs the Mark sooner.** The Mark stands in by itself only at 20em. A Logo and a Name that take more room than that need a container condition on the Brand, such as `@max-md:hide-labels`, so the Mark takes over before they overflow.
- **Light and dark:** a single-colour SVG drawn in `currentColor` follows the Brand's colour in every scheme. A Logo or Mark in two files takes `dark:hide` on the light one and `light:hide` on the dark one ([responsive helpers](31-responsive-visibility.md)).

## A company's Logo beside a product's Name
The Logo is as tall as `--brand-mark-size`. The Mark is in the markup too, hidden until there's no room for the Logo, and each image comes in a light and a dark version.

```html live
<a href="#main" class="brand">
  <img class="brand__logo dark:hide" src="/examples/brand-logo.svg" alt="" width="271" height="32">
  <img class="brand__logo light:hide" src="/examples/brand-logo-dark.svg" alt="" width="271" height="32">
  <img class="brand__mark dark:hide" src="/examples/brand-mark.svg" alt="" width="32" height="32">
  <img class="brand__mark light:hide" src="/examples/brand-mark-dark.svg" alt="" width="32" height="32">
  <span class="brand__name">Plant Finder</span>
</a>
```

## Name only
```html live
<a href="#main" class="brand">
  <span class="brand__name">Woodland Plants</span>
</a>
```

## Mark only
On its own the Mark is as big as a Button beside it: 48px, or 32px in a compact container, where Buttons step down too.

```html live
<a href="#main" class="brand">
  <svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#brand-design-for-humans"/></svg>
  <span class="sr-only">Design For Humans home</span>
</a>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Set `--brand-color` for another colour | Add `.link` or `.button` classes to it |
| Keep the name in the markup on every screen | Hide the name with `display: none` |
| Show the Mark alone with `max-md:hide-labels` on the Brand | Put `max-md:sr-only` on the Name |
| Set `--brand-mark-size` for a larger logo | Add a text atom to `.brand__name` |
| Give a Logo a Mark to stand in for it | Leave a narrow screen to squeeze the Logo |
| Leave the Logo and Mark decorative (`alt=""`) | Give the images alt text that repeats the Name |

## Reference
The product's logo and name, as a Link home. An atom and a whole link on its own: it sets its colour, hover and focus ring, so it takes no `.link` class.

## Options
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Density | default, a compact container steps it down | `--ui-sizing: compact` |

| Part | What it is |
| :--- | :--- |
| `.brand__logo` | The full logo, an `<img>` or `<svg>`, as tall as `--brand-mark-size` and as wide as its shape |
| `.brand__mark` | The small logo, an icon from the sprite, an `<img>` or an `<svg>`. Hidden beside a Logo; on its own it is a Button's size |
| `.brand__name` | The name, in the display type |

### Further rules
- **Target size and states:** on an `<a>`, it is at least the target size (the small target in a compact container), with hover and focus states. On a `<button>`, a mark that opens the app's menu, the same, named with `.sr-only` text for what it does ("Menu"). On any other element, such as a `<span>` that labels an app, it has neither.
- **Tokens:** `--brand-color`, `--brand-gap`, `--brand-mark-size` (the Logo, and the Mark beside a Name), `--brand-mark-alone-size` and `--brand-compact-mark-alone-size` (the Mark on its own, a Button's size by default) and the `--brand-font-*` type tokens. Size is a product decision, so there are no size modifiers.
- **Image sizes:** give an `<img>` or `<svg>` its own `width` and `height` (or a `viewBox`), so it keeps its shape and has a size before the CSS loads.
