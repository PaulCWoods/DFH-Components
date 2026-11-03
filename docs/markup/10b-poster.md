---
title: Poster
tier: molecule
summary: A picture with content laid over it, for a hero, a feature or a promotion, that keeps its text readable.
tokens: poster
storybook: molecules-poster
related: [card, thumbnail, button-group, text-heading]
---

# 10b. Poster
```html playground
<div class="poster" data-axes>
  <img class="poster__media" src="/examples/poster-1600.jpg" srcset="/examples/poster-800.jpg 800w, /examples/poster-1600.jpg 1600w, /examples/poster-2400.jpg 2400w" sizes="100vw" alt="" />
  <div class="poster__content">
    <div class="stack">
      <h2 class="title">Gardens worth coming home to</h2>
      <p class="large-text">Design, planting and care for cottage gardens, from the first sketch to the first bloom.</p>
      <div class="button-group">
        <a class="button button--strong button--accent" href="#">Book a visit</a>
        <a class="button" href="#">See our gardens</a>
      </div>
    </div>
  </div>
</div>
---
Prominence: Panel, Solid=poster--strong, Scrim=poster--subtle, None=poster--plain
Inline: Start, Centre=poster--inline-center, End=poster--inline-end
Block: Start=poster--block-start, Centre*, End=poster--block-end
```

## Purpose
A big picture with words on it is one of the first things a designer reaches for, and one of the easiest to get wrong. The text sits on whatever the photo has behind it, so it reads in one crop and vanishes in the next.

The Poster keeps the picture a real `<img>`, so it takes `srcset`, `sizes` and `fetchpriority` like any other image, and crops it to fill with `object-fit: cover`. The content sits on a surface it brings with it: a panel by default, or a scrim over the whole picture. That surface is never more than 25% see-through, whatever a product sets, so the text keeps its contrast with any photo.

The content is a box with padding, a width cap and its surface, and a [Stack](22-stack-inline-cluster.md) inside it lays out what it holds. It is in normal flow, so it sets the Poster's height and never overflows a short crop. Its inline padding grows to line the content up with the site width, as a [Wrapper](19-wrapper.md)'s does. The Poster takes its colours from its scheme, so `.color-scheme-dark` turns the panel or scrim dark.

## When to use
- **For a hero, a feature or a promotion:** a picture that sets the scene, with a few words and an action.
- **Not for a picture of a thing beside its title:** that is a [Card](10-card.md) with a `.card__thumb`, or a [Thumbnail](06c-thumbnail.md).
- **Not for a decorative background:** a picture that says nothing and holds no content belongs in the page's CSS.

## Rules
- **The picture is usually decoration:** `alt=""`, since the words on it carry the message. Give it a real `alt` only when it shows something the words don't.
- **The hero's picture loads first:** `fetchpriority="high"` on the Poster at the top of the page, and never `loading="lazy"` on it. A Poster further down takes `loading="lazy"`.
- **A section of the page:** a `<section>` named by its heading (`aria-labelledby`) when it's a part of the page people would look for; a `<div>` when it's a band within one.
- **Plain has no surface:** what sits on a plain Poster brings its own (a Button, a Card). Never set bare text on one.

## Keep the Subject in View
`--poster-focus` is where the crop centres (`object-position`). Set it to the subject, and it stays in view as the Poster narrows.
```html live
<div class="poster poster--inline-end" style="--poster-focus: 45% 40%;">
  <img class="poster__media" src="/examples/poster-1600.jpg" srcset="/examples/poster-800.jpg 800w, /examples/poster-1600.jpg 1600w, /examples/poster-2400.jpg 2400w" sizes="100vw" alt="" loading="lazy" />
  <div class="poster__content">
    <div class="stack">
      <h3 class="heading">The spring planting list</h3>
      <p class="text">Forty plants we trust for a first border, and where each one likes to grow.</p>
      <div class="button-group">
        <a class="button" href="#">Read the list</a>
      </div>
    </div>
  </div>
</div>
```

## A Dark Scrim
A subtle Poster lays a scrim over the whole picture instead of a panel. In a dark scheme, the scrim is dark.
```html live
<div class="poster poster--subtle poster--inline-center poster--block-end color-scheme-dark">
  <img class="poster__media" src="/examples/poster-1600.jpg" srcset="/examples/poster-800.jpg 800w, /examples/poster-1600.jpg 1600w, /examples/poster-2400.jpg 2400w" sizes="100vw" alt="" loading="lazy" />
  <div class="poster__content text-center">
    <div class="stack">
      <h3 class="title">Open garden weekend</h3>
      <p class="large-text">Saturday 9 and Sunday 10 May, ten till four.</p>
      <div class="button-group justify-center">
        <a class="button button--strong button--accent" href="#">Get free tickets</a>
      </div>
    </div>
  </div>
</div>
```

## Flush: Lay It Out Yourself
A flush Poster's content fills the whole picture and takes the Poster's padding, so anything inside it still lines up with the page.
```html live
<div class="poster poster--flush poster--subtle color-scheme-dark">
  <img class="poster__media" src="/examples/poster-1600.jpg" srcset="/examples/poster-800.jpg 800w, /examples/poster-1600.jpg 1600w, /examples/poster-2400.jpg 2400w" sizes="100vw" alt="" loading="lazy" />
  <div class="poster__content">
    <div class="stack gap-lg">
      <h3 class="title">The spring planting list</h3>
      <div class="grid grid--3-col">
        <div class="card card--compact"><h4 class="small-heading">Borders</h4><p class="small-text">Twelve plants for sun and shade.</p></div>
        <div class="card card--compact"><h4 class="small-heading">Pots</h4><p class="small-text">Eight that thrive in a container.</p></div>
        <div class="card card--compact"><h4 class="small-heading">Kitchen garden</h4><p class="small-text">Ten crops for a first season.</p></div>
      </div>
    </div>
  </div>
</div>
```

## Sources for Every Screen
A `<picture>` works as the media: the Poster lays its image out, and the browser picks the source.
```html
<section class="poster" aria-labelledby="hero-title">
  <picture>
    <source media="(width < 48rem)" srcset="hero-tall-800.webp 800w, hero-tall-1200.webp 1200w" sizes="100vw" />
    <img class="poster__media" src="hero-1600.webp" srcset="hero-1600.webp 1600w, hero-2400.webp 2400w" sizes="100vw" alt="" fetchpriority="high" />
  </picture>
  <div class="poster__content">
    <div class="stack">
      <h1 class="display-title" id="hero-title">Gardens of Eden</h1>
      …
    </div>
  </div>
</section>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use `alt=""` when the words on the Poster carry the message. | Describe a mood picture in its `alt`. |
| Give the hero's picture `fetchpriority="high"`. | Lazy-load the picture at the top of the page. |
| Set `--poster-focus` on the subject. | Crop the image file for each screen size by hand. |
| Put a Button or Card on a plain Poster. | Set bare text on a plain Poster. |

## Reference
A picture with content laid over it. A molecule: a `.poster` holds a `.poster__media` (an `<img>`, the `<img>` in a `<picture>`, or a `<video>`) and one `.poster__content`.

## Options
| Block | Options | Tokens |
| :--- | :--- | :--- |
| `.poster` | Prominence: default (translucent panel), `--strong` (solid panel), `--subtle` (scrim, no panel), `--plain` (neither). Placement: `--inline-center`, `--inline-end`, `--block-start`, `--block-end`. Padding: `--flush`. Width: `--stretch` (no site-width alignment). Density: `--compact` | `--poster-focus`, `--poster-min-size`, `--poster-content-max-width`, `--poster-translucency`, `--poster-scrim-translucency`, `--poster-font-sizing` |

### Further rules
- **Height:** the content sets it; `--poster-min-size` (24rem) is the least. A full-screen hero sets it on the Poster (`--poster-min-size: 80svh`).
- **Content:** padding, a width cap and its surface only. A layout primitive inside it arranges what it holds.
- **Padding:** the cushion step, and inline at least enough to line the content up with the site width (`max(padding + safe area, (100% - site width) / 2)`, where 100% is the width of the box the Poster sits in, so a Poster narrower than the page pads for its own box). The safe area counts once a page opts into it with `.viewport-fit-cover`, so a full-width Poster's content stays clear of a notch or rounded screen corner.
- **Stretch:** `--stretch` drops the site-width alignment, so the inline padding is the padding and safe area alone, at any width. Use it where the Header and Footer are `--stretch` too, so the content lines up with theirs. With `--flush`, the content runs the Poster's whole width.
- **Flush:** the content fills the Poster, with no cap or corners, and takes the Poster's padding (block and inline, safe area included) as its own.
- **Placement:** start on the inline axis and centred on the block axis by default. Text alignment is the content's own (`.text-center`).
- **Width of the content:** at most `--poster-content-max-width` (36rem).
- **Type:** the content's type grows with its width (`cq`), so it fits its column at any size. `--poster-font-sizing: fixed` keeps it at one size.
- **The contrast floor:** the panel and scrim are at most 25% see-through, whatever `--poster-translucency` or `--poster-scrim-translucency` say. They are solid when the user asks for more contrast or less transparency, and a subtle Poster then takes a solid panel, so the picture stays in view. Forced colours draw the panel in system colours with an edge.
- **Colour:** the panel and scrim are the card surface of the Poster's scheme. `.color-scheme-dark` or `.color-palette-inverted` on the Poster turns them dark.
- **Density:** `--compact` (or a compact container) steps the padding and the content down.
- **Corners:** square by default (`--poster-radius`), for a full-width band. A Poster inside the page's width can take `.rounded-lg`.
