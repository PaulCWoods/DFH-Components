# Thumbnail

From the Cadence deck (HANDOVER, library candidates): square artwork with a size token, a fallback icon and corner badges, for album art, product shots and file previews. Cadence uses `.deck__art`.

## What exists

- **Avatar** (§6): an atom for people, 48px by default, `--sm` 32px, `--lg` 64px, `--avatar-size` for one-offs, `--square`, initials or a placeholder icon, corner dot badges (`.badge--top-end` …).
- **Icon box** (§9): an icon on a tinted square. No image.
- **`card__thumb`**: a card's image only, sized by the card.

So a square image of a thing has nowhere to live: an avatar says "person" (its placeholder is a person, its group is a stack of people), and `card__thumb` needs a card.

## Proposal

- **`.thumbnail` atom:** an `<img>` (or a `<span>` holding one) at a square size. Sizes match the avatar's steps (32, 48, 64) and go larger (96, 128) through `--thumbnail-size`, since artwork is shown bigger than faces. Corners from the radius tokens (`--thumbnail-corners: round` for none, square default).
- **Aspect:** square by default; `--thumbnail-aspect` for 4:3 or 16:9 previews. `object-fit: cover`.
- **Fallback:** `.thumbnail--placeholder` holds an icon (music, image, file) on the subtle surface, `aria-hidden` when the thumbnail sits beside its title.
- **Badges:** the avatar's corner badge classes apply as they are.
- **Accessibility:** `alt=""` beside a visible title (it's decoration then); a real `alt` when the image carries what the text doesn't.
- Stories, §-doc, blog twin, Cadence moves off `.deck__art`.

## Questions

1. A new `.thumbnail` atom, or a non-person mode of avatar?
2. Which sizes?
3. Square only, or an aspect token too?

## Decided and done (30 October 2026)

1. **A new `.thumbnail` atom**, not a mode of avatar.
2. **Sizes:** the avatar's 32, 48 and 64 (`--sm`, default, `--lg`), and `--thumbnail-size` for larger artwork. The size is the block size, so mixed shapes line up in a row.
3. **Aspect token:** `--thumbnail-aspect` (1 by default).

- No `--placeholder` modifier: every thumbnail shows the muted tint behind its content, so one holding an icon is the placeholder, and an image shows the tint while it loads.
- Corners: rounded (`--radius`) by default, `--round` for a circle, which pulls a corner badge onto its edge as an avatar does.
- Tokens: `thumbnail.size`, `sm-size`, `lg-size`, `aspect`, `radius`, `round-radius`, `bg`, `text`.
- Cadence: `.deck__art` is gone; the record is `.thumbnail.thumbnail--round.deck__vinyl`, sized with `--thumbnail-size`.
- Icons: the stories use Music, Disc, Cart and Code. An image and a file icon would suit thumbnails better when the icon set gains them.
