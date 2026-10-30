# 6c. Thumbnail
A small picture of a thing: album art, a product shot, a file preview. An atom. People take an avatar (§6); an icon on a tint takes an icon box (§9); a card's own image takes `.card__thumb` (§10). The proposal is in `docs/audit/thumbnail.md`.

- **Never interactive.** A button or link that opens the thing contains one, and the control carries the name.
- **Naming follows context.** Beside a visible title: `alt=""` (an icon thumbnail takes `aria-hidden="true"`). On its own, or when the picture says what the text doesn't: a real `alt`.
- **Size is the block size,** so a row of mixed shapes lines up; the width follows the aspect.
- **Density:** a compact container steps each size down one.

| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.thumbnail` | `--sm`, `--lg`, `--round` | `--thumbnail-size-step: sm \| lg`, `--thumbnail-corners: round` |

## A. Thumbnail
```html
<!-- Beside a visible title -->
<img class="thumbnail" src="album.jpg" alt="" />

<!-- On its own -->
<img class="thumbnail thumbnail--lg" src="headphones.jpg" alt="Studio headphones, black" />

<!-- No picture: an icon for the kind of thing -->
<span class="thumbnail" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Music"/></svg>
</span>

<!-- A count on a corner: the span holds the picture and the name -->
<span class="thumbnail thumbnail--lg" role="img" aria-label="Fern, 3 new tracks">
  <img src="fern.jpg" alt="" />
  <span class="badge badge--accent badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
</span>
```
- **Sizes:** default 48px, `--sm` 32px, `--lg` 64px (the avatar's steps). Artwork is often bigger: a one-off size sets `--thumbnail-size` (6rem, 8rem).
- **Aspect:** square by default. `--thumbnail-aspect: 4 / 3` or `16 / 9` for previews. Pictures are cropped to fill (`object-fit: cover`).
- **Corners:** rounded (`--radius`) by default; `--round` for a circle (a record, a single).
- **No picture:** an icon on the muted tint, which also shows while an image loads.
- **Badges:** a count or dot on a corner (§5), hidden from screen readers, with what it means in the name. On `--round` the badge moves in to sit on the edge, as on an avatar.

## B. In a Row
```html
<li class="inline">
  <img class="thumbnail" src="album.jpg" alt="" />
  <div class="lockup">
    <span class="small-heading">Celestial Horizon</span>
    <span class="small-text text-muted">Aura &amp; Tycho</span>
  </div>
</li>
```
