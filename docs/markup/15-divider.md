---
title: Divider
tier: atom
summary: A rule between groups of content.
tokens: divider
storybook: atoms-divider
related: [menu, button-group, stack-inline-cluster]
---

# 15. Divider Primitive
```html playground
<p class="text">Ferns and hostas</p>
<hr class="divider" data-axes>
<p class="text">Hellebores and foxgloves</p>
---
Prominence: Default, Strong=divider--strong
Style: Solid, Dashed=divider--dashed
```

## Purpose
Most groups can be told apart with space alone, and a line is one more thing on the page to look past. A Divider is for the places space can't do it, such as between sections of a Menu or actions in a row.

It's a real `<hr>`, or a `role="separator"` in a list, so the separation reaches a screen reader too. Components place it and never restyle it, so there's one rule across the library. It's quiet by default, because it's usually decorative. When the rule is the only boundary between two things, `--strong` takes it to at least 3:1.

## When to use
- **Between groups that space alone can't separate:** Menu sections, or actions in a toolbar row.
- **`--strong` when the rule is the only boundary** and must reach 3:1.
- **Not between every item:** try more space first.

## Rules
- **A vertical Divider takes `aria-orientation="vertical"`:** assistive technology hears it, and it forces the orientation. A purely decorative Divider can take `aria-hidden="true"` instead.
- **Only the direct parent turns it vertical.** `--direction` doesn't inherit, so a Divider nested deeper inside a row stays horizontal.
- **In a list,** an `<hr>` isn't allowed. Inside `<menu>`, `<ul>` or `<ol>`, use `<li role="separator" class="divider"></li>`. In a listbox, where a separator isn't allowed, use `role="none"`.

## Vertical (in a row)
```html live
<div class="button-group">
  <button type="button" class="button button--subtle"><span>Dashboard</span></button>
  <hr class="divider" aria-orientation="vertical">
  <button type="button" class="button button--subtle"><span>Settings</span></button>
</div>
```

## In a Menu
```html live
<menu class="menu" aria-label="Document options">
  <li><button type="button" class="button"><span>Duplicate</span></button></li>
  <li role="separator" class="divider"></li>
  <li><button type="button" class="button button--danger"><span>Delete</span></button></li>
</menu>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use `<li role="separator" class="divider">` in a list. | Put an `<hr>` straight inside a `<ul>`. |
| Add `aria-orientation="vertical"` to a vertical Divider. | Leave its orientation to the layout alone. |
| Use `--strong` for a rule that is the only boundary. | Add a custom border colour for one instance. |

## Reference
A rule between groups. Components (Menu, Batch Actions, Button Group) place it; they never restyle it. Classes only: a bare `<hr>` gets a quiet rule from the reset.

## Options
| Axis | Values |
| :--- | :--- |
| Orientation | Horizontal (default); vertical when the **direct parent** sets `--direction: row` (`.inline`, `.cluster`, `.button-group`, `.batch-actions`), or anywhere with `aria-orientation="vertical"` |
| Prominence | Default (quiet, decorative), `--strong` (at least 3:1, for a rule that is the only boundary) |
| Style | Solid (default), `--dashed` |

### Further rules
- Theming: `--divider-width`, `--divider-style`, `--divider-color`, `--divider-strong-color`.

## Horizontal
```html live
<hr class="divider">
<hr class="divider divider--strong">
<hr class="divider divider--dashed">
```
