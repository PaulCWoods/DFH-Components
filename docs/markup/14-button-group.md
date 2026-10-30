# 14. Button Group

A set of related buttons laid out together: a row by default, or a column. The group lays the buttons out; they keep their own look. It has no alignment options: a `justify-*` utility on the group (`.justify-end`, `.justify-center`, `.justify-between`), or the layout around it, decides where the buttons sit. Rows of actions with headings and shortcuts are a menu (§3b). The audit is in `docs/audit/action-sets.md`.

| Option | Values |
| :--- | :--- |
| Orientation | row (default), `--vertical` (full-width buttons, content centred) |
| Joined | `--joined`: one control; shared edges overlap, only the outer corners round |
| Width | the content's (default), `--fill` (fills its container; the buttons share the width) |
| Rules | `--ruled`: rules between the buttons where gap decorations are supported |
| Density | `--compact` (sets `--ui-sizing: compact`) |
| Part | `__end` pushes itself and what follows to the end of the row |

- **Button looks come from the buttons.** Set them for the whole group with `.buttons-strong`, `.buttons-subtle`, `.buttons-plain`, `.buttons-sm`, `.buttons-lg` or `.buttons-round` (or the flags they set).
- **Roles.** A group whose buttons share a purpose takes `role="group"` and a label. Not `role="toolbar"`: a toolbar promises arrow keys between its controls, and the library ships no script.
- **Joined choices.** Exclusive choices are radio inputs inside the buttons, so the browser handles selection and arrow keys. Toggles are buttons with `aria-pressed`. A joined group keeps every border; the hovered, selected or focused button rises so its border and focus ring show in full.
- **Text in a group** is a text atom (`.small-text`), not a part of the group.
- **Dividers** between buttons stand upright on their own; give them `aria-orientation="vertical"`.

## A. Actions
```html
<div class="button-group">
  <button type="button" class="button"><span>Save draft</span></button>
  <button type="button" class="button button--strong button--accent"><span>Publish</span></button>
</div>
```

## B. Aligned with a utility
In a flex container (here a card footer) the group is only as wide as its buttons, so the container aligns it. On its own line, the utility goes on the group.
```html
<footer class="card__footer justify-end">
  <form method="dialog" class="button-group">
    <button type="submit" class="button button--subtle"><span>Cancel</span></button>
    <button type="submit" value="confirm" class="button button--strong button--accent"><span>Publish</span></button>
  </form>
</footer>

<div class="button-group justify-center">…</div>
```

## C. Joined: exclusive choice
```html
<div class="button-group button-group--joined" role="radiogroup" aria-label="Range">
  <label class="button"><input type="radio" name="range" value="day" class="sr-only" checked><span>Day</span></label>
  <label class="button"><input type="radio" name="range" value="week" class="sr-only"><span>Week</span></label>
  <label class="button"><input type="radio" name="range" value="month" class="sr-only"><span>Month</span></label>
</div>
```

## D. Joined: toggles
```html
<div class="button-group button-group--joined" role="group" aria-label="Text style">
  <button type="button" class="button button--icon" aria-pressed="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bold"/></svg>
    <span class="sr-only">Bold</span>
  </button>
  <button type="button" class="button button--icon" aria-pressed="false">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Italic"/></svg>
    <span class="sr-only">Italic</span>
  </button>
</div>
```

## E. Vertical, fill and end
```html
<div class="button-group button-group--vertical">
  <button type="button" class="button button--strong button--accent"><span>Continue with email</span></button>
  <button type="button" class="button"><span>Continue with a passkey</span></button>
</div>

<div class="button-group button-group--fill">
  <button type="button" class="button"><span>Cancel</span></button>
  <button type="button" class="button button--strong button--accent"><span>Submit</span></button>
</div>

<div class="button-group">
  <a href="/step/2" class="button"><span>Back</span></a>
  <span class="small-text">Step 3 of 4</span>
  <button type="button" class="button button--strong button--accent button-group__end"><span>Next</span></button>
</div>
```
