# 26. Skeleton Primitive (Content Loading Placeholders)
A placeholder that holds the space of content still loading, so nothing moves when it arrives. The audit is in `docs/audit/skeleton.md`.

| Use | Markup |
| :--- | :--- |
| Shape | `.skeleton` with `--text`, `--heading`, `--avatar`, `--button`, `--input`, `--badge` or `--media`. A bare `.skeleton` is a block sized by `--skeleton-width` and `--skeleton-height`. |
| Companion | `.skeleton` on `.avatar`, `.button`, `.input`, `.textarea`, `.select`, `.badge`, `.chip`, `.status` or `.kbd`. The atom keeps its own box; the skeleton replaces the paint. |
| Width | `--w-50`, `--w-75`, `--w-90`; any other with `--skeleton-width` (per element, not inherited) |
| Motion | Shimmer (default), `--pulse`; `--skeleton-motion: shimmer \| pulse \| none` on a container |

- **Text lines size from the text atom they sit in.** `--text` and `--heading` are one line box (`1lh`) high with the bar at cap height. Put them inside the atom the loaded text will use; `--heading` differs only in width (60%). Hold a heading's place with the atom class on a `div`, not on an `h1`–`h6`: a heading with only hidden content is an empty heading.
- **The fill mixes the text colour** (`--skeleton-color`), so it shows the same on any surface. Increased contrast uses `--skeleton-color-strong`; reduced motion stops the animation; forced colours fill in `GrayText`.
- **Announce loading.** Every shape takes `aria-hidden="true"`. The region takes `aria-busy="true"` and a `role="status"` message ("Loading activity…"). When loading ends, set `aria-busy="false"` and update or remove the message.
- A companion control is `disabled` (or not focusable) as well as `aria-hidden`.
- There is no `.card.skeleton`: a loading card is a card with `aria-busy` and shapes inside.

```html
<!-- Text lines inside text atoms -->
<div class="small-heading"><span class="skeleton skeleton--heading" aria-hidden="true"></span></div>
<p class="text">
  <span class="skeleton skeleton--text" aria-hidden="true"></span>
  <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
</p>

<!-- Shapes -->
<span class="skeleton skeleton--avatar" aria-hidden="true"></span>
<span class="skeleton skeleton--button" aria-hidden="true"></span>
<span class="skeleton skeleton--badge" aria-hidden="true"></span>
<span class="skeleton skeleton--media" aria-hidden="true"></span>
<span class="skeleton" aria-hidden="true" style="--skeleton-width: 12rem; --skeleton-height: 2rem;"></span>

<!-- Companions -->
<div class="avatar skeleton" aria-hidden="true"><span>AB</span></div>
<button type="button" class="button skeleton" aria-hidden="true" disabled><span>Submit</span></button>
<span class="status skeleton" aria-hidden="true"><span class="status__text">Active</span></span>

<!-- Loading card -->
<article class="card" aria-busy="true" aria-labelledby="activity-title">
  <header class="card__header">
    <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
    <hgroup class="card__hgroup">
      <h3 id="activity-title" class="card__title small-heading">Team activity</h3>
      <p class="card__subtitle small-text"><span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 8rem;"></span></p>
    </hgroup>
  </header>
  <div class="card__body">
    <p class="visually-hidden" role="status">Loading team activity…</p>
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

