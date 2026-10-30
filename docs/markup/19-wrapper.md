# 19. Wrapper
Centres content and caps its width. A gutter on each side keeps the content off the screen edge; the cap applies to the content, so a wrapped page lines up with a header bar at any width. A layout primitive (`layout/wrapper.css`). The audit is in `docs/audit/layout.md`.

| Modifier | Effect |
| :--- | :--- |
| default | Capped at the site width (`--wrapper-max-width`) |
| `--2xs` … `--2xl` | Capped at a block step (8rem … 80rem) |
| `--start`, `--end` | Aligned to one side |
| `--middle` | Content centred vertically in the space the wrapper is given |

## A. Markup
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

## B. Rules
- **Gutter:** `--wrapper-gutter` (the cushion step) pads each side; the cap is the content's width, so the wrapper is up to the cap plus two gutters wide. Don't add `padding-inline` utilities to a wrapper.
- **No doubled inset:** a wrapper inside a wrapper has no gutter of its own, and a `.main` whose child is a wrapper drops its own inline padding.
- **Lines up with the bars:** `.header__bar` and `.footer__bar` use the same cap and the same inset, so their content lines up with a wrapped page.
- **Not for components:** to cap a card, a form or a dialog's content, use a `max-width-*` utility (with `margin-inline-auto` to centre it). A wrapper's gutter would pad the card.
- **Tokens:** `wrapper.max-width` (the site width), `wrapper.gutter` (the cushion step). Set either on a wrapper to change it there and in wrappers inside it.
- **Removed:** padding utilities paired with a wrapper to make up for the missing gutter; `wrapper` on cards.
