---
title: Thumbnail
tier: atom
summary: A small picture of a thing, such as album art, a product shot or a file preview.
tokens: thumbnail
storybook: atoms-thumbnail
related: [avatar, icon-icon-box, card, lockup]
---

# 6c. Thumbnail
```html playground cluster
<img class="thumbnail" data-axes src="/examples/thumb.svg" alt="Green abstract artwork" />
---
Size: Small=thumbnail--sm, Default*, Large=thumbnail--lg
Corners: Rounded, Round=thumbnail--round
```

## Purpose
In a track list, a basket or a file list, people often look for the picture before they read the words. A Thumbnail gives a picture a place in those rows without needing a Card around it, and without borrowing an Avatar, which says "person".

Its size is set on the block side, and the width follows from the aspect. Pictures of different shapes still line up in a row, and the row doesn't jump when an image arrives.

Most of the time it repeats what the words beside it already say, so it usually takes an empty `alt`. It only needs its own description when it says something the text doesn't.

## When to use
- **For a picture of a thing:** in a track list, a basket or a file list.
- **Not for a person:** that is an [Avatar](06-avatar.md).
- **Not for a Card's own image:** that is [`.card__thumb`](10-card.md).
- **Not for an icon on a tint:** that is an [Icon Box](09-icon-icon-box.md).

## Rules
- **Never interactive.** A Button or link that opens the thing contains one, and the control carries the name.
- **Naming follows context.** Beside a visible title: `alt=""` (an icon Thumbnail takes `aria-hidden="true"`). On its own, or when the picture says what the text doesn't: a real `alt`.

## Name It for What It Adds
```html live cluster
<!-- Beside a visible title -->
<img class="thumbnail" src="/examples/thumb.svg" alt="" />

<!-- On its own -->
<img class="thumbnail thumbnail--lg" src="/examples/thumb.svg" alt="Studio headphones, black" />

<!-- No picture: an icon for the kind of thing -->
<span class="thumbnail" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Music"/></svg>
</span>

<!-- A count on a corner: the span holds the picture and the name -->
<span class="thumbnail thumbnail--lg" role="img" aria-label="Fern, 3 new tracks">
  <img src="/examples/thumb.svg" alt="" />
  <span class="badge badge--accent badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
</span>
```

## In a Row
```html live
<ul role="list">
<li class="inline">
  <img class="thumbnail" src="/examples/thumb.svg" alt="" />
  <div class="lockup">
    <span class="small-heading">Celestial Horizon</span>
    <span class="small-text text-muted">Aura &amp; Tycho</span>
  </div>
</li>
</ul>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use `alt=""` when a title beside it says the same. | Repeat the title in the `alt`. |
| Give a Thumbnail on its own a real `alt`. | Leave a lone picture unnamed. |
| Put a Link or Button around one that opens the thing. | Make the Thumbnail itself clickable. |
| Set `--thumbnail-aspect` for a wide preview. | Stretch the image with a width of its own. |

## Reference
A small picture of a thing: album art, a product shot, a file preview. An atom. People take an [Avatar](06-avatar.md); an icon on a tint takes an [Icon Box](09-icon-icon-box.md); a Card's own image takes [`.card__thumb`](10-card.md).

## Options
| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.thumbnail` | `--sm`, `--lg`, `--round` | `--thumbnail-size-step: sm \| lg`, `--thumbnail-corners: round` |

### Further rules
- **Size is the block size,** so a row of mixed shapes lines up; the width follows the aspect.
- **Density:** a compact container steps each size down one.
- **Sizes:** default 48px, `--sm` 32px, `--lg` 64px (the Avatar's steps). Artwork is often bigger: a one-off size sets `--thumbnail-size` (6rem, 8rem).
- **Aspect:** square by default. `--thumbnail-aspect: 4 / 3` or `16 / 9` for previews. Pictures are cropped to fill (`object-fit: cover`).
- **Corners:** rounded (`--radius`) by default; `--round` for a circle (a record, a single).
- **No picture:** an icon on the muted tint, which also shows while an image loads.
- **Badges:** a count or dot on a [corner](05-badge-status-chip-kbd.md), hidden from screen readers, with what it means in the name. On `--round` the Badge moves in to sit on the edge, as on an Avatar.
