---
title: Button
tier: atom
summary: An action on the page, such as saving a Form, opening a Dialog or changing a setting.
tokens: button
storybook: atoms-button
related: [button-group, link-block-link, menu, icon-icon-box]
---

# 1. Button Primitive
```html playground cluster
<button type="button" class="button" data-axes><span data-label>Save changes</span></button>
---
Prominence: Default, Strong=button--strong, Subtle=button--subtle, Plain=button--plain
Intent: Neutral, Accent=button--accent, Danger=button--danger "Delete project"
Size: Small=button--sm, Default*, Large=button--lg
Corners: Default, Round=button--round
```

## Purpose
Most of what a person does on a page, they do through a Button. It is a real `<button>` because the browser already gives it focus, keyboard use and a role that assistive technology understands, and nothing here replaces those.

Its look comes from two separate choices: prominence says how much attention an action deserves, and intent says what kind of action it is. Keeping them apart means a quiet destructive action and a loud one are the same two ideas, not two more variants to learn.

A 48px hit area is the default at every size, because a target that's easy to reach helps everyone. A smaller one is a decision a product makes on purpose.

## When to use
- **For an action:** submit, save, open, delete, toggle. Use `<button type="button">` (or `type="submit"` in a Form).
- **Not for going somewhere.** A Link goes to another page, even when it looks like a Button: `<a class="button">` keeps its [link role](#a-link-that-looks-like-a-button).
- **Not for one choice among views** (a [Tab List](24-tabs.md)) **or a setting that is on or off** (a [switch](07-form-controls.md)), unless it is a [toggle Button](#toggles-and-choices).

## Rules
- **Never colour alone** (WCAG 1.4.1): the label says what happens ("Delete project"), or an icon does.
- **Every size keeps a 48px hit area** (WCAG 2.5.5), unless the product opts into fine-pointer targets. Never below 24px (2.5.8).
- **A hit area never covers another control.** In a group it reaches at most halfway across the gap to the next Button, so a tap always lands on the Button it looks like it lands on. Small Buttons in a tight group get their own size plus the gap; scope compact to fine pointers with `fine:ui-compact` where touch should keep 48px.
- **One modifier per axis.** Write `.button--subtle.button--accent`. A class that fuses two axes doesn't exist.

## Keyboard and screen readers
- **Enter and Space** both press a Button. The browser handles this, so don't add key handlers.
- **Tab** reaches it, in reading order. Don't change that with a positive `tabindex`.
- **A toggle** says its state through `aria-pressed`, so a screen reader announces "pressed". Keep the label the same in both states.
- **A disabled Button** can't be focused, so nobody using a keyboard can discover why it's disabled. Say why near it.

## Icons
```html live cluster
<button type="button" class="button button--strong button--accent">
  <span>Get started</span>
  <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</button>
<button type="button" class="button">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
  <span>Add record</span>
</button>
<button type="button" class="button button--icon">
  <span class="sr-only">Search site</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
</button>
<button type="button" class="button button--plain button--icon button--round">
  <span class="sr-only">More actions</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#More"/></svg>
</button>
```
- **Icon-only Buttons** keep a text label in `.sr-only`, so screen readers, translation and voice control ("click Search site") all have a name. The icon is `aria-hidden`. Anything with `.button__icon` (an icon, a Status, a Kbd) stays visible when the label is hidden, so it can stand in for the icon; it's decoration, so the hidden label still names the Button.
- **`.icon--dir`** mirrors an arrow in right-to-left text.
- **`--button-icon-size`** sizes the icons in a Button as a number of ems of its text (`1.25` is a quarter larger). It defaults to the Icon's `--icon-base-size`, so a correction for the icon set reaches Buttons too. Set it on a Button, a container or the theme. It's a plain number, so it scales with every Button size.
- **`--labeled`** keeps the text when a container hides Button labels (`--ui-labels: hidden`).
- An [Avatar](06-avatar.md) in a Button: a plain round icon Button holding a hidden Avatar.

## Toggles and Choices
```html live cluster
<button type="button" class="button" aria-pressed="true"><span>Bold</span></button>
<label class="button">
  <input type="checkbox" class="sr-only" />
  <svg class="icon icon--off" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  <span>Notifications</span>
</label>
<div class="cluster" role="radiogroup" aria-label="Delivery">
  <label class="button">
    <input type="radio" name="delivery-demo" class="sr-only" checked />
    <span>Standard</span>
    <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
  <label class="button">
    <input type="radio" name="delivery-demo" class="sr-only" />
    <span>Express</span>
    <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
</div>
```
- **A toggle Button** takes `aria-pressed`; its label stays the same as it changes ("Bold", not "Bold on").
- **A Checkbox or radio styled as a Button** is a `<label class="button">` around a visually hidden input. It needs no script, and the Input keeps its keyboard and screen-reader behaviour. `.icon--on` and `.icon--off` show with the state, and the label draws the focus ring while its input has focus.

## A Link that Looks Like a Button
```html live cluster
<a href="/start" class="button button--strong button--accent">
  <span>Read the guide</span>
  <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</a>
```
It goes somewhere, so it stays a Link: no `role="button"`. Screen-reader users hear "link" and expect a new page; keyboard users open it with Enter (a Button also takes Space).

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Start the label with a verb: "Save changes", "Delete project". | Use "OK", "Submit" or "Click here" when a verb would say what happens. |
| Use one strong accent Button per view, for the main action. | Make every Button strong; nothing stands out. |
| Say what a danger Button destroys, in its label. | Rely on red to say an action is destructive. |
| Give an icon-only Button a hidden text label. | Leave it to `title`, or to the icon alone. |
| Use a Link, styled as a Button if you like, to go to another page. | Put `role="button"` on a Link, or navigate from a `<button>` with script. |
| Explain near a disabled Button why it can't be used yet. | Disable a submit Button without saying what's missing. |

## Reference
The reference implementation of the shared axes. Intent (`--accent`, `--danger`) sets a tone; prominence (`--strong`, `--subtle`, `--plain`, or the default outline) decides where the tone goes, so any pairing works from two single-axis classes.

## Options
| Axis | Modifiers | Container flag |
| :--- | :--- | :--- |
| Prominence | (outline), `--strong`, `--subtle`, `--plain` | `--button-prominence`, `--controls-prominence` |
| Intent | (neutral), `--accent`, `--danger` | `--button-intent` |
| Size | `--sm`, (default), `--lg` | `--button-size`, `--controls-size` |
| Corners | (rounded), `--round` | `--button-corners`, `--controls-corners` |
| Content | `--icon` (icon only), `--labeled` (keeps its text when a container hides labels), `--placeholder` (dashed, an empty slot) | |

## Prominence
```html live cluster
<button type="button" class="button"><span>Default</span></button>
<button type="button" class="button button--strong"><span>Strong</span></button>
<button type="button" class="button button--subtle"><span>Subtle</span></button>
<button type="button" class="button button--plain"><span>Plain</span></button>
<button type="button" class="button button--placeholder"><span>Add item</span></button>
```
- **Default** is an outline. **Strong** is filled, for the main action. **Subtle** is a tint with no border, **plain** has neither: for actions that sit among content (toolbars, Card footers).
- A selected Button (`.is-active`, `aria-current` other than `false`, `:checked`, `aria-pressed="true"`) looks strong, unless a pressed Button shows its own `.icon--on` check. A Menu or Navigation Tree shows the current link in bold with a tint and a rail instead.

## Intent
```html live cluster
<button type="button" class="button button--strong button--accent"><span>Save changes</span></button>
<button type="button" class="button button--subtle button--accent"><span>Preview</span></button>
<button type="button" class="button button--danger"><span>Delete item</span></button>
<button type="button" class="button button--strong button--danger"><span>Delete project</span></button>
<button type="button" class="button button--subtle button--danger"><span>Remove</span></button>
```
- **Accent** is the Brand action; **danger** something that destroys or can't be undone.
- **Never colour alone** (WCAG 1.4.1): the label says what happens ("Delete project"), or an icon does.

## Size and Corners
```html live cluster
<button type="button" class="button button--sm"><span>Small</span></button>
<button type="button" class="button"><span>Default</span></button>
<button type="button" class="button button--lg"><span>Large</span></button>
<button type="button" class="button button--round"><span>Round</span></button>
```
- **Every size keeps a 48px hit area** (WCAG 2.5.5) through `::after`, unless the product opts into fine-pointer targets with `:root { --spacing-target-min: var(--spacing-target-sm); }`. Never below 24px (2.5.8).
- A compact container (`--ui-sizing: compact`) steps Buttons to `--sm`.
- **Neighbours:** a container that sets Buttons side by side gives its gap as `--target-gap-inline` (a row) or `--target-gap-block` (a column), and each Button's hit area reaches at most halfway across it. Button Group, Menu, Navigation Tree, Tab List, Batch Actions, Cluster and Inline do this, and free the outer side of their first and last items (`--target-gap-inline-start: 100vmax` and the other sides). A container of your own does the same; a Card, Popover or Dialog starts afresh.

### Disabled
- **`disabled`** takes a Button out of the Tab order. Use it when there's nothing to learn by reaching it.
- **`aria-disabled="true"`** keeps it in the Tab order and announced as unavailable, so people can find it and the reason nearby. The library stops pointer clicks, but Enter and Space still fire: the product's script must ignore them.
- **A Link can't be disabled.** Leave out `href` and add `role="link" aria-disabled="true"` while it goes nowhere.

## Set on a Container
```html live cluster
<div class="cluster buttons-subtle buttons-sm" role="group" aria-label="Formatting">
  <button type="button" class="button"><span>Bold</span></button>
  <button type="button" class="button"><span>Italic</span></button>
  <button type="button" class="button button--strong"><span>Done</span></button>
</div>
```
- `.buttons-strong`, `-subtle`, `-plain`, `-sm`, `-lg` and `-round` set the flags (`--button-prominence`, `--button-size`, `--button-corners`) on a container. A modifier on the Button beats the flag.
- The shared `--controls-prominence`, `--controls-size` and `--controls-corners` flags (and `.controls-*` classes) reach Buttons and [form controls](07-form-controls.md) together.
- **Colour tokens:** `--button-color`, `--button-color-hover`, `--button-color-pressed` and `--button-color-border` colour the neutral Button at every prominence, set on a Button, a container or the theme. Intents keep their own colours. `--button-on-color` is the text on every fill.

## Default Background and Hover
```html live cluster
<div class="cluster" style="--button-bg: var(--surface-muted); --button-hover-style: tint;">
  <button type="button" class="button"><span>Tinted hover</span></button>
  <button type="button" class="button button--accent"><span>Accent</span></button>
  <button type="button" class="button button--strong"><span>Strong keeps its fill</span></button>
</div>
```
- `--button-bg` is the default Button's resting background (`transparent` by default). Set it on a Button, a container or the theme. Strong, Subtle and Plain keep their own.
- `--button-hover-style` is `fill` (the default: hover fills the Button with its colour, in the inverted palette) or `tint` (hover darkens the resting background in light mode and lightens it in dark, in the normal palette). It's a container flag, so set it on a container or the theme, not on the Button.
- The theme's component gate checks `--button-bg` against `--button-color` at 4.5:1.
