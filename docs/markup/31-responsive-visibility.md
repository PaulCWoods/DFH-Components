---
title: Responsive Helpers
tier: utility
summary: Hide something, its labels, or everything but its accessible name, by a condition, and choose what prints.
storybook: utilities-responsive-helpers
related: [utilities, header, button, grid-grid-carousel]
---

# 31. Responsive Helpers
```html live
<div class="button-group max-md:hide-labels" role="group" aria-label="Bed actions, shown by default">
  <button type="button" class="button"><svg class="button__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#plus"/></svg><span>Add plant</span></button>
  <button type="button" class="button"><svg class="button__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#share-2"/></svg><span>Share</span></button>
</div>
```

## Purpose
Most layouts should reflow on their own, and hiding is what's left for when they can't. Removing something at a width takes it away from everyone at that width, including people who zoomed in and so got the narrow layout on a large screen. That's why these helpers are for duplicates and labels, and never for the only way to do something.

Hidden isn't one thing. `hide` removes an element for everyone, `sr-only` keeps the words for screen readers, voice control and translation, and `hide-labels` shortens a Button to its icon while the text stays as its name. Choosing the right one decides who still gets the content.

There's one direction only: every class hides, and there is no `show`. To show something at one width, hide it at the others, so nothing depends on which `display` value a helper would restore. The one exception is `print:keep`, which cancels a hide the library makes in print rather than restoring a `display`.

## When to use
- **To drop a duplicate at some widths,** such as the navigation when a menu Button offers the same links.
- **To shorten controls to their icons,** with `hide-labels`.
- **To keep words for screen readers only,** with `sr-only`.
- **To decide what prints,** with `print:hide` and `print:keep`.
- **Not to rearrange things:** [Grids](19b-grid-grid-carousel.md), [Splits](19c-split.md) and [Clusters](22-stack-inline-cluster.md) reflow on their own.
- **Not to hide the only way to do something.**

## Rules
- **Never hide the only way to do something.** Hide a duplicate (the navigation when a menu Button offers the same links), or a label whose icon and accessible name remain.
- **Prefer a container condition** inside a component, so it adapts wherever it is placed. A container condition needs an ancestor with `container-type: inline-size` (`.container-inline`, `.split`, `.sidebar`, `.header`, `.footer`); without one it never matches.
- **Show by hiding:** there is no `show`. To show something only below 48rem, hide it from 48rem: `md:hide`.

## Shorten, swap, or keep for screen readers
```html live
<!-- Icons only below 48rem; the text stays the buttons' accessible names -->
<div class="button-group max-md:hide-labels" role="group" aria-label="Bed actions">
  <button type="button" class="button"><svg class="button__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#plus"/></svg><span>Add plant</span></button>
  <button type="button" class="button"><svg class="button__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#share-2"/></svg><span>Share</span></button>
</div>

<!-- A menu button in a narrow header, the navigation in a wide one -->
<div class="header">
  <div class="header__bar">
    <nav class="header__nav @max-3xl:hide" aria-label="Main, example">
      <a href="/plants" class="link link--plain">Plants</a>
    </nav>
    <button type="button" class="button @3xl:hide" popovertarget="site-menu">Menu</button>
    <div id="site-menu" popover class="popover">
      <menu class="menu" aria-label="Site menu">
        <li><a href="/plants" class="button"><span>Plants</span></a></li>
      </menu>
    </div>
  </div>
</div>

<!-- Words read by screen readers but not shown below 48rem -->
<p>Harvest <span class="max-md:sr-only">(rhubarb, chard and kale)</span> due this week</p>
```

## Choosing what prints
The library already prints well: light colours on any band, nothing sticky or cut off, Cards and table rows kept whole, and the address of a link to another site after it in [Prose](12-prose.md). It hides what only works on screen: the Skip Link, the Header's navigation, the Sidebar, Banner Docks, Toasts, Batch Actions, Pagination, docked Tab Lists, Popovers and Tooltips. Tabbed Content prints its open panel, with the selected Tab as its label.

```html live
<!-- Hidden in print: an action that means nothing on paper -->
<button type="button" class="button print:hide"><span>Share this plan</span></button>

<!-- Kept in print: Pagination that tells the reader where this page sits -->
<nav class="pagination button-group print:keep" aria-label="Planting guide pages">
  <a href="/guide/1" class="button"><span>1</span></a>
  <a href="/guide/2" class="button" aria-current="page"><span>2</span></a>
  <a href="/guide/3" class="button"><span>3</span></a>
</nav>
```
- **`print:hide`** hides anything in print.
- **`print:keep`** keeps something the library hides in print. It works only on the components listed above; on anything else there is nothing to cancel.

## Do and don't
| Do | Don't |
| :--- | :--- |
| Show something only below 48rem with `md:hide`. | Look for a `show` class. |
| Prefer a container condition inside a component. | Use a container condition with no container ancestor. |
| Hide a duplicate, or a label whose icon and name remain. | Hide the only way to do something. |
| Use `.sr-only` for words only screen readers need. | Use `display: none` on text that must still be read. |
| Hide on-screen-only actions with `print:hide`. | Write a print stylesheet to undo what the library already does. |

## Reference
Hide something, its labels, or everything but its accessible name, by a condition (`utilities/responsive-helpers.css`, `utilities/accessibility.css`). One name per condition, in Tailwind's form. The other [utilities](36-utilities.md) have their own page.

## Options
| Class | Effect |
| :--- | :--- |
| `.sr-only` (`.visually-hidden`) | Hidden on screen; still read by screen readers, voice control and translation |
| `.hide-labels` | Sets `--ui-labels: hidden`. Buttons and Tabs inside show only their icon and keep the text as their accessible name; any `.ui-label` inside is visually hidden |
| `{condition}:hide` | `display: none` while the condition holds |
| `{condition}:hide-labels` | `.hide-labels` while the condition holds |
| `{condition}:sr-only` (`{condition}:visually-hidden`) | `.sr-only` while the condition holds |
| `print:hide` | `display: none` in print |
| `print:keep` | Cancels the library's own print hide on a component (the Header's navigation, a Sidebar, Pagination and the others above) |

Always hidden is the `hidden` attribute (or `.hidden`). The reset keeps `[hidden]` hidden whatever `display` a component sets, except `hidden="until-found"`, which find-in-page can reveal.

### Further rules
- **Viewport sizes:** `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem (Tailwind's). Media queries use the `width >=` / `width <` range syntax, so the two sides of a breakpoint never overlap.

## Conditions
| Prefix | While |
| :--- | :--- |
| `sm:`, `md:`, `lg:`, `xl:`, `2xl:` | The viewport is at least 40, 48, 64, 80 or 96rem wide |
| `max-sm:` … `max-2xl:` | The viewport is narrower than that |
| `@xs:` … `@7xl:` | The nearest size container is at least the size |
| `@max-xs:` … `@max-7xl:` | The nearest size container is narrower than the size |
| `short:` / `tall:` | The viewport is under / at least 36rem tall |
| `app-locked:` / `app-unlocked:` | `.app--viewport` is locked to the viewport (at least 48rem wide and 36rem tall) / scrolls as a page |
| `print:` | The page is printed (`hide` and `keep` only) |

Container sizes (Tailwind's container scale): `xs` 20rem, `sm` 24, `md` 28, `lg` 32, `xl` 36, `2xl` 42, `3xl` 48, `4xl` 56, `5xl` 64, `6xl` 72, `7xl` 80. The Grid's container column counts, a Stack's `@{size}:inline` and Card's `@max-*:card--plain` use the same scale.
