# 6. Avatar & Avatar Group
Who someone is: a photo, initials or an icon in a shape. The avatar is an atom; the avatar group is a molecule. The audit is in `docs/audit/identity-values.md`.

- **An avatar is never interactive.** A button or link that opens a profile contains one, and the control carries the name.
- **Naming follows context.** Beside a visible name (§6b): `aria-hidden="true"`, and an image inside takes `alt=""`. On its own with a photo: the `alt` names it. On its own with initials or an icon: `role="img"` and `aria-label`.
- **Presence is never colour alone.** A dot badge in the bottom corner, hidden from screen readers, with the state in the name ("Sam Rivera, online") or in visible text.
- **Density:** a compact container steps each size down one (lg to default, default to sm).

| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.avatar` | `--sm`, `--lg`, `--square`, `--accent`, `--placeholder`, `--count` | `--avatar-size-step: sm \| lg`, `--avatar-corners: square` |
| `.avatar-group` | `--stacked` | `--avatar-group-overlap`, `--avatar-group-ring-color` |

## A. Avatar
```html
<!-- Initials on their own -->
<span class="avatar" role="img" aria-label="Sam Rivera">SR</span>

<!-- A photo on its own -->
<img class="avatar" src="ade.jpg" alt="Ade Okafor" />

<!-- An icon -->
<span class="avatar" role="img" aria-label="Guest">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</span>

<!-- Presence: a photo inside a span so the badge can sit on it -->
<span class="avatar" role="img" aria-label="Sam Rivera, online">
  <img src="sam.jpg" alt="" />
  <span class="badge badge--dot badge--success badge--bottom-end" aria-hidden="true"></span>
</span>
```
- **Sizes:** default 48px, `--sm` 32px, `--lg` 64px. A one-off size sets `--avatar-size` (and `--avatar-font-size` for initials).
- **Colour:** set `--avatar-bg` and `--avatar-text` together. Where `contrast-color()` is supported, a background set alone in `style` picks its own text colour.
- **Presence intents:** online `badge--success`, away `badge--warning`, busy `badge--danger`, offline neutral. The avatar pulls a corner badge onto its round edge and rings it in the surface colour.
- **Looks:** `--accent`; `--placeholder` (dashed, an empty slot); `--count` ("+3", tabular figures).

## B. In a Control
```html
<button type="button" class="button button--plain button--icon button--round" aria-label="Account, Sam Rivera, online">
  <span class="avatar avatar--sm" aria-hidden="true">
    <img src="sam.jpg" alt="" />
    <span class="badge badge--dot badge--success badge--bottom-end" aria-hidden="true"></span>
  </span>
</button>
```
The button keeps its 48px target; the avatar inside is decorative.

## C. Avatar Group
```html
<ul class="avatar-group avatar-group--stacked" aria-label="Project members">
  <li><span class="avatar" role="img" aria-label="Sam Rivera">SR</span></li>
  <li><img class="avatar" src="ade.jpg" alt="Ade Okafor" /></li>
  <li><span class="avatar avatar--count" role="img" aria-label="3 more members">+3</span></li>
</ul>
```
- **Spaced** by default; **`--stacked`** overlaps each avatar by `--avatar-group-overlap` (0.33 of its size) and rings it in `--avatar-group-ring-color`. Set the ring colour to the surface the group sits on.
- **Size** comes from the avatars: `--avatar-size-step: sm` on the group, or a modifier on each.
- A group beside a visible list of the same names is `aria-hidden="true"` and needs no labels.
