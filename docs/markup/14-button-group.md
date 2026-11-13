---
title: Button Group
tier: molecule
summary: A set of related Buttons laid out together, in a row or a column.
tokens: button-group
storybook: molecules-button-group
related: [button, menu, divider, batch-actions]
---

# 14. Button Group
```html playground width=md
<div class="button-group" data-axes>
  <button type="button" class="button"><span>Cancel</span></button>
  <button type="button" class="button button--strong button--accent"><span>Save</span></button>
</div>
---
Orientation: Row, Column=button-group--vertical
Edges: Separate, Joined=button-group--joined
Width: Content, Fill=button-group--fill
Buttons: Default, Subtle=buttons-subtle, Plain=buttons-plain
```

## Purpose
[Buttons](01-button.md) that belong together should look as if they do. A Button Group keeps them at the right distance and lets them wrap when the space runs out. It lays them out and leaves them alone, so a Button looks and behaves the same in a group as anywhere else.

It has no alignment options, because where a group sits is the page's decision. A `justify-*` utility or the layout around it makes that decision, and looks and sizes come from the Buttons, set for the whole group with `.buttons-*`.

Joined turns several Buttons into one control, and the hard part is left to the browser: an exclusive choice uses real radio inputs, so selection and arrow keys need no script. It won't call itself a toolbar, because `role="toolbar"` promises arrow keys between controls and the library ships no script to keep that promise.

## When to use
- **For a few related Buttons:** a Form's actions, a choice of views, text style toggles.
- **Not for rows of actions with headings and shortcuts:** that is a [Menu](03b-menu.md).
- **Not for actions on selected items:** that is [Batch Actions](18b-batch-actions.md).
- **Not for moving between views of one thing, each with its own panel:** that is [Tabs](24-tabs.md).

## Rules
- **Roles.** A group whose Buttons share a purpose takes `role="group"` and a label. Not `role="toolbar"`: a toolbar promises arrow keys between its controls, and the library ships no script.
- **Joined choices.** Exclusive choices are radio inputs inside the Buttons, so the browser handles selection and arrow keys. Toggles are Buttons with `aria-pressed`. A joined group keeps every border; the hovered, selected or focused Button rises so its border and focus ring show in full.

## Keyboard and screen readers
The browser provides all of this. Script only what a Button does, including flipping `aria-pressed` on a toggle.
- **Tab** moves between Buttons, each its own stop. A set of radios is one stop.
- **Enter and Space** press a Button.
- **Arrow keys** move between radios and select as they go. They do nothing between ordinary Buttons.
- **A screen reader** hears the label on entering a `role="group"` or `role="radiogroup"`, then "pressed" from `aria-pressed` or the radio's checked state.

## Choosing one of several
```html live
<div class="button-group button-group--joined" role="radiogroup" aria-label="Range">
  <label class="button"><input type="radio" name="range" value="day" class="sr-only" checked><span>Day</span></label>
  <label class="button"><input type="radio" name="range" value="week" class="sr-only"><span>Week</span></label>
  <label class="button"><input type="radio" name="range" value="month" class="sr-only"><span>Month</span></label>
</div>
```

## Turning things on and off
```html live
<div class="button-group button-group--joined" role="group" aria-label="Text style">
  <button type="button" class="button button--icon" aria-pressed="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#letter-b"/></svg>
    <span class="sr-only">Bold</span>
  </button>
  <button type="button" class="button button--icon" aria-pressed="false">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#italic"/></svg>
    <span class="sr-only">Italic</span>
  </button>
</div>
```

## Aligned with a utility
In a flex container (here a Card footer) the group is only as wide as its Buttons, so the container aligns it. On its own line, the utility goes on the group.
```html live width=md
<article class="card">
  <div class="card__body"><p class="text">You have unsaved changes.</p></div>
  <footer class="card__footer justify-end">
    <div class="button-group">
      <button type="button" class="button button--subtle"><span>Discard</span></button>
      <button type="button" class="button button--strong button--accent"><span>Save</span></button>
    </div>
  </footer>
</article>

<div class="button-group justify-center">
  <button type="button" class="button"><span>Previous</span></button>
  <button type="button" class="button"><span>Next</span></button>
</div>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Align the group with a `justify-*` utility or the layout around it. | Look for an alignment modifier on the group. |
| Use `role="group"` and a label for Buttons that share a purpose. | Use `role="toolbar"`, which promises arrow keys. |
| Put radio inputs inside the Buttons for an exclusive choice. | Script the selection yourself. |
| Set looks for the group with `.buttons-subtle` and its siblings. | Add a size or look to the group's own modifiers. |
| Write text in a group as a text atom (`.small-text`). | Look for a text part of the group. |

## Reference
A set of related Buttons laid out together: a row by default, or a column. The group lays the Buttons out; they keep their own look. It has no alignment options: a `justify-*` utility on the group (`.justify-end`, `.justify-center`, `.justify-between`), or the layout around it, decides where the Buttons sit. Rows of actions with headings and shortcuts are a [Menu](03b-menu.md).

## Options
| Option | Values |
| :--- | :--- |
| Orientation | row (default), `--vertical` (full-width Buttons, content centred) |
| Joined | `--joined`: one control; shared edges overlap, only the outer corners round; one row whose labels wrap |
| Width | the content's (default), `--fill` (fills its container; the Buttons share the width) |
| Rules | `--ruled`: rules between the Buttons where gap decorations are supported |
| Density | `--compact` (sets `--ui-sizing: compact`) |
| Part | `__end` pushes itself and what follows to the end of the row (not in a joined group) |

### Further rules
- **Button looks come from the Buttons.** Set them for the whole group with `.buttons-strong`, `.buttons-subtle`, `.buttons-plain`, `.buttons-sm`, `.buttons-lg` or `.buttons-round` (or the flags they set).
- **Text in a group** is a text atom (`.small-text`), not a part of the group.
- **Dividers** between Buttons stand upright in a row on their own; give them `aria-orientation="vertical"` there, so assistive technology hears it. In a `--vertical` group they lie flat, so leave the attribute off.
- **A joined group stays one row.** Where space runs out its Buttons narrow and their labels wrap, never below the target size. Keep it to a few short labels; more than will fit on a phone is a [Select](07-form-controls.md) or [Tabs](24-tabs.md).
- **Not with joined:** `__end` and `--ruled`. A joined group has no gap to push across or to rule.

## Actions
```html live
<div class="button-group">
  <button type="button" class="button"><span>Save draft</span></button>
  <button type="button" class="button button--strong button--accent"><span>Publish</span></button>
</div>
```

## Vertical, fill and end
```html live width=md
<div class="button-group button-group--vertical">
  <button type="button" class="button button--strong button--accent"><span>Continue with email</span></button>
  <button type="button" class="button"><span>Continue with a passkey</span></button>
</div>

<div class="button-group button-group--fill">
  <button type="button" class="button"><span>Cancel</span></button>
  <button type="button" class="button button--strong button--accent"><span>Send message</span></button>
</div>

<div class="button-group">
  <a href="/step/2" class="button"><span>Back</span></a>
  <span class="small-text">Step 3 of 4</span>
  <button type="button" class="button button--strong button--accent button-group__end"><span>Next</span></button>
</div>
```
