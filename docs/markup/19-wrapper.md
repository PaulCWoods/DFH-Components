---
title: Wrapper
tier: layout
summary: Centres content, caps its width and keeps it off the screen edge.
tokens: wrapper
storybook: layout-wrapper
related: [app-shell, header, footer, stack-inline-cluster, utilities]
---

# 19. Wrapper
```html live
<div class="wrapper wrapper--sm">
  <div class="card">
    <p class="text">This card sits in a wrapper capped at 24rem and centred.</p>
  </div>
</div>
```

## Purpose
A page needs its content kept off the screen edge and lined up from top to bottom. That's one job, so it's one element, and pages don't each invent a width.

The cap applies to the content, not to the box with its gutters. That is why a wrapped page lines up with the [Header](33-header.md) and [Footer](35-footer.md) bars at any width, and why a Wrapper inside a Wrapper doesn't pad twice.

It holds a page's content and nothing smaller. A Card that needs a narrower width takes a utility, because a Wrapper's gutter would pad the Card.

## When to use
- **For the content of a page,** so that it lines up with the Header and footer bars.
- **For a Form or message centred on the screen,** with `--sm` and `--middle`.
- **Not to cap a component:** a Card, a Form or a Dialog's content takes a `max-inline-size-*` [utility](36-utilities.md).
- **Not for columns or panes:** those are a [grid](19b-grid-grid-carousel.md) or a [split](19c-split.md).

## Rules
- **Not for components:** to cap a Card, a Form or a Dialog's content, use a `max-inline-size-*` utility (with `mx-auto` to centre it). A Wrapper's gutter would pad the Card.
- **No doubled inset:** a Wrapper inside a Wrapper has no gutter of its own, and a `.main` whose child is a Wrapper drops its own inline padding.
- **Don't pad it.** The gutter is already there: `padding-inline` utilities on a Wrapper double it.

## A Page, or a Form Centred on the Screen
Both of these hold the page's one `<main>`.

```html
<main id="main" class="main">
  <div class="wrapper stack">
    <h1 class="heading">Shade-loving perennials</h1>
    <p class="text">…</p>
  </div>
</main>

<!-- A sign-in form centred on the screen -->
<main id="main" class="main">
  <div class="wrapper wrapper--sm wrapper--middle">
    <form class="card" aria-labelledby="sign-in">…</form>
  </div>
</main>
```

## A Narrower Cap, to One Side
```html live
<div class="wrapper wrapper--xs wrapper--start">
  <div class="card"><p class="text">16rem, at the start</p></div>
</div>

<div class="wrapper wrapper--xs wrapper--end">
  <div class="card"><p class="text">16rem, at the end</p></div>
</div>

<div class="wrapper wrapper--xs wrapper--middle min-block-size-2xs">
  <div class="card"><p class="text">16rem, centred vertically</p></div>
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Rely on the Wrapper's own gutter. | Add `padding-inline` utilities to it. |
| Cap a Card with `max-inline-size-*` and `mx-auto`. | Put `wrapper` on a Card. |
| Set `--wrapper-max-width` to change the cap for a region. | Give each page a width of its own. |
| Put a Wrapper directly in `.main`. | Add inline padding to make up for a missing inset. |

## Reference
Centres content and caps its width. A gutter on each side keeps the content off the screen edge; the cap applies to the content, so a wrapped page lines up with a header bar at any width. A layout primitive (`layout/wrapper.css`).

## Options
| Modifier | Effect |
| :--- | :--- |
| default | Capped at the site width (`--wrapper-max-width`) |
| `--2xs` … `--2xl` | Capped at a block step (8rem … 80rem) |
| `--start`, `--end` | Aligned to one side |
| `--middle` | Content centred vertically in the space the Wrapper is given |
| `--flush` | No gutter |
| `--safe-area` | Adds the device's safe-area insets to the gutter, for a Wrapper that runs to the screen edge on a notched phone |

### Further rules
- **Gutter:** `--wrapper-gutter` (the cushion step) pads each side; the cap is the content's width, so the Wrapper is up to the cap plus two gutters wide. Don't add `padding-inline` utilities to a Wrapper.
- **Lines up with the bars:** `.header__bar` and `.footer__bar` use the same cap and the same inset, so their content lines up with a wrapped page.
- **Tokens:** `wrapper.max-width` (the site width), `wrapper.gutter` (the cushion step). Set either on a Wrapper to change it there. A Wrapper inside a Wrapper follows the width but has no gutter of its own.
