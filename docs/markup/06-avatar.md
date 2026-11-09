---
title: Avatar and Avatar Group
tier: atom
summary: Who someone is, as a photo, initials or an icon in a shape.
tokens: avatar
storybook: [atoms-avatar, molecules-avatar-group]
related: [lockup, thumbnail, badge-status-chip-kbd]
---

# 6. Avatar & Avatar Group
```html playground cluster
<span class="avatar" data-axes role="img" aria-label="Sam Rivera">SR</span>
---
Size: Small=avatar--sm, Default*, Large=avatar--lg
Corners: Round, Square=avatar--square
Look: Default, Accent=avatar--accent
```

## Purpose
A face or a pair of initials lets someone spot a person in a thread or a member list without reading every name. That's the whole job, so an Avatar is only a shape that holds a photo, initials or an icon.

It can be a control: a `<button>` that opens the account Menu, or a link to a profile. A picture of someone doesn't say what pressing it will do, so the control's name does.

How it's named depends on where it sits. Beside a visible name it's hidden, because hearing the same name twice helps nobody. On its own it has to carry the name itself. That's the one thing to get right each time.

## When to use
- **For a person or an account:** in a comment, a member list or an account Menu.
- **Not for a thing:** album art or a product shot is a [Thumbnail](06c-thumbnail.md).
- **Not for an icon on a tint:** that is an [Icon Box](09-icon-icon-box.md).

## Rules
- **An Avatar can be the control.** `<button class="avatar">` or `<a class="avatar">`: its name, in `.sr-only` text, says what it does ("Account, Sam Rivera"), and initials or an image inside are hidden. When the name shows beside it, a Button holds both and the Avatar inside is hidden.
- **Naming follows context.** Beside a visible name, as in a [Lockup](06b-lockup.md): `aria-hidden="true"`, and an image inside takes `alt=""`. On its own with a photo: the `alt` names it. On its own with initials or an icon: `role="img"` and `aria-label`.
- **Presence is never colour alone.** A dot Badge in the bottom corner, hidden from screen readers, with the state in the name ("Sam Rivera, online") or in visible text.

## Name it for where it sits
```html live cluster
<!-- Initials on their own -->
<span class="avatar" role="img" aria-label="Sam Rivera">SR</span>

<!-- A photo on its own -->
<img class="avatar" src="/examples/thumb.svg" alt="Ade Okafor" />

<!-- An icon -->
<span class="avatar" role="img" aria-label="Guest">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</span>

<!-- Presence: a photo inside a span so the badge can sit on it -->
<span class="avatar" role="img" aria-label="Sam Rivera, online">
  <img src="/examples/thumb.svg" alt="" />
  <span class="badge badge--dot badge--success badge--bottom-end" aria-hidden="true"></span>
</span>
```

## As a control
```html live cluster
<!-- The Avatar is the button -->
<button type="button" class="avatar">
  <img src="/examples/thumb.svg" alt="" />
  <span class="badge badge--dot badge--success badge--bottom-end" aria-hidden="true"></span>
  <span class="sr-only">Account, Sam Rivera, online</span>
</button>

<!-- A small one keeps a 48px hit area -->
<a class="avatar avatar--sm" href="#">
  <span aria-hidden="true">AO</span>
  <span class="sr-only">Ade Okafor's profile</span>
</a>

<!-- With the name beside it, a Button holds both -->
<button type="button" class="button button--plain button--round">
  <span class="avatar avatar--sm" aria-hidden="true">SR</span>
  Sam Rivera
</button>
```
An Avatar that is the control takes a focus ring and, when it's smaller than 48px, a hit area that reaches 48px. It has no hover look: the face is the affordance. Inside a Button, an Avatar follows the Button's corners, so a round Button keeps it round.

## Avatar Group
```html live
<ul class="avatar-group avatar-group--stacked" aria-label="Project members">
  <li><span class="avatar" role="img" aria-label="Sam Rivera">SR</span></li>
  <li><img class="avatar" src="/examples/thumb.svg" alt="Ade Okafor" /></li>
  <li><span class="avatar avatar--count" role="img" aria-label="3 more members">+3</span></li>
</ul>
```
- **Spaced** by default; **`--stacked`** overlaps each Avatar by `--avatar-group-overlap` (0.33 of its size) and rings it in `--avatar-group-ring-color`. Set the ring colour to the surface the group sits on.
- **Size** comes from the Avatars: `--avatar-size-step: sm` on the group, or a modifier on each.
- A group beside a visible list of the same names is `aria-hidden="true"` and needs no labels.

## Do and don't
| Do | Don't |
| :--- | :--- |
| Hide the Avatar when the name is beside it. | Make a screen reader hear the name twice. |
| Make the Avatar a `<button>` or `<a>` named for what it does. | Put a click handler on a `<span class="avatar">`. |
| Say presence in the name: "Sam Rivera, online". | Rely on the colour of the dot. |
| Set `--avatar-bg` and `--avatar-text` together. | Set a background and hope the text still reads. |

## Reference
Who someone is: a photo, initials or an icon in a shape. The Avatar is an atom; the Avatar Group is a molecule.

## Options
| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.avatar` | `--sm`, `--lg`, `--square`, `--accent`, `--placeholder`, `--count` | `--avatar-size-step: sm \| lg`, `--avatar-corners: square` |
| `.avatar-group` | `--stacked` | `--avatar-group-overlap`, `--avatar-group-ring-color` |

### Further rules
- **Density:** a compact container steps each size down one (lg to default, default to sm), whether the size comes from a modifier or the `--avatar-size-step` flag.
- **Sizes:** default 48px, `--sm` 32px, `--lg` 64px. A one-off size sets `--avatar-size` (and `--avatar-font-size` for initials).
- **Colour:** set `--avatar-bg` and `--avatar-text` together. Where `contrast-color()` is supported, a background set alone in `style` picks its own text colour.
- **Presence intents:** online `badge--success`, away `badge--warning`, busy `badge--danger`, offline neutral. A corner Badge sits on the Avatar's curve (on the rim when round, near the corner when square), ringed in the surface colour.
- **Looks:** `--accent`; `--placeholder` (dashed, an empty slot); `--count` ("+3", tabular figures).
