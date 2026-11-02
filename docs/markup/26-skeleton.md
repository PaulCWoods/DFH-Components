---
title: Skeleton
tier: atom
summary: A placeholder that holds the space of content still loading, so nothing moves when it arrives.
tokens: skeleton
storybook: atoms-skeleton
related: [progress-meter, card, empty-state]
---

# 26. Skeleton Primitive (Content Loading Placeholders)
```html playground width=md
<div class="stack" aria-busy="true">
  <p class="sr-only" role="status">Loading a summary…</p>
  <span class="skeleton" data-axes aria-hidden="true"></span>
</div>
---
Shape: Text=skeleton--text, Heading=skeleton--heading, Avatar=skeleton--avatar, Button=skeleton--button, Input=skeleton--input, Badge=skeleton--badge, Media=skeleton--media
Motion: Shimmer, Pulse=skeleton--pulse
```

## Purpose
A blank space while content loads looks broken, and a page that jumps when content arrives can move what someone was about to press. A Skeleton holds the space with the shape of what's coming, so the page already looks like itself and nothing moves.

A text line takes its height from the text atom it sits in, so the bar matches the text that replaces it. The fill mixes the text colour, so it shows the same on any surface, and it stops moving for anyone who has asked for reduced motion.

A shape tells a screen reader nothing, so it's hidden, and the loading is said once in words. There is no loading Card or loading Table to learn, either. A loading Card is an ordinary Card with shapes inside.

## When to use
- **While content whose shape you know is loading:** a Card list, a profile, a Table.
- **Not for a task with a known end:** that is a [progress bar](25-progress-meter.md).
- **Not when there is nothing to show:** that is an [Empty State](27-empty-state.md).

## Rules
- **Text lines size from the text atom they sit in.** Put `--text` and `--heading` inside the atom the loaded text will use.
- **Don't hold a heading's place with a heading.** Use the atom class on a `div`, not on an `h1`–`h6`: a heading with only hidden content is an empty heading.

## Keyboard and screen readers
All of this is the product's markup and script. The library only draws the shapes.
- **Every shape** takes `aria-hidden="true"`.
- **The region** takes `aria-busy="true"` and a `role="status"` message ("Loading activity…"), which is what a screen reader hears.
- **When loading ends,** set `aria-busy="false"` and update or remove the message.
- **A companion control** is `disabled` (or not focusable) as well as `aria-hidden`, so Tab never lands on a placeholder.

## Text Lines
```html live width=md
<div class="small-heading"><span class="skeleton skeleton--heading" aria-hidden="true"></span></div>
<p class="text">
  <span class="skeleton skeleton--text" aria-hidden="true"></span>
  <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
</p>
```

## Reuse the Real Atom
A companion keeps the atom's own box, so nothing shifts when the real one replaces it. The Skeleton only replaces the paint.
```html live cluster
<div class="avatar skeleton" aria-hidden="true"><span>AB</span></div>
<button type="button" class="button skeleton" aria-hidden="true" disabled><span>Submit</span></button>
<span class="status skeleton" aria-hidden="true"><span class="status__text">Active</span></span>
```

## Loading Card
```html live width=md
<article class="card" aria-busy="true" aria-labelledby="activity-title">
  <header class="card__header">
    <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
    <hgroup class="card__hgroup">
      <h3 id="activity-title" class="card__title small-heading">Team activity</h3>
      <p class="card__subtitle small-text"><span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 8rem;"></span></p>
    </hgroup>
  </header>
  <div class="card__body">
    <p class="sr-only" role="status">Loading team activity…</p>
    <span class="skeleton skeleton--media" aria-hidden="true"></span>
    <p class="text">
      <span class="skeleton skeleton--text" aria-hidden="true"></span>
      <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
    </p>
  </div>
  <footer class="card__footer">
    <button type="button" class="button button--subtle skeleton" aria-hidden="true" disabled><span>Open</span></button>
  </footer>

</article>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Match the shape of what will arrive. | Show a generic block that jumps when content loads. |
| Announce loading once, with `role="status"`. | Leave screen reader users with silence, or a list of empty shapes. |
| Put `aria-hidden="true"` on every shape. | Put a heading tag on a line with only hidden content. |
| Make a companion control `disabled`. | Leave a placeholder Button in the tab order. |

## Reference
A placeholder that holds the space of content still loading, so nothing moves when it arrives.

```html live width=md
<div class="stack" aria-busy="true">
  <p class="sr-only" role="status">Loading a summary…</p>
  <span class="skeleton skeleton--text" aria-hidden="true"></span>
  <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
</div>
```

## Options
| Use | Markup |
| :--- | :--- |
| Shape | `.skeleton` with `--text`, `--heading`, `--avatar`, `--button`, `--input`, `--badge` or `--media`. A bare `.skeleton` is a block sized by `--skeleton-width` and `--skeleton-height`. |
| Companion | `.skeleton` on `.avatar`, `.button`, `.input`, `.textarea`, `.select`, `.badge`, `.chip`, `.status` or `.kbd`. The atom keeps its own box; the Skeleton replaces the paint. |
| Width | `--w-50`, `--w-75`, `--w-90`; any other with `--skeleton-width` (per element, not inherited) |
| Motion | Shimmer (default), `--pulse`; `--skeleton-motion: shimmer \| pulse \| none` on a container |

### Further rules
- **Text lines size from the text atom they sit in.** `--text` and `--heading` are one line box (`1lh`) high with the bar at cap height. Put them inside the atom the loaded text will use; `--heading` differs only in width (60%). Hold a heading's place with the atom class on a `div`, not on an `h1`–`h6`: a heading with only hidden content is an empty heading.
- **The fill mixes the text colour** (`--skeleton-color`), so it shows the same on any surface. Increased contrast uses `--skeleton-color-strong`; reduced motion stops the animation; forced colours fill in `GrayText`.
- There is no `.card.skeleton`: a loading Card is a Card with `aria-busy` and shapes inside.

## Shapes
```html live cluster
<span class="skeleton skeleton--avatar" aria-hidden="true"></span>
<span class="skeleton skeleton--button" aria-hidden="true"></span>
<span class="skeleton skeleton--badge" aria-hidden="true"></span>
<span class="skeleton skeleton--media" aria-hidden="true"></span>
<span class="skeleton" aria-hidden="true" style="--skeleton-width: 12rem; --skeleton-height: 2rem;"></span>
```
