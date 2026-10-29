# 15. Divider Primitive
A rule between groups. Organisms (menu, combobox, batch actions, button group) place it; they never restyle it. Classes only: a bare `<hr>` gets a quiet rule from the reset. The audit is in `docs/audit/divider.md`.

| Axis | Values |
| :--- | :--- |
| Orientation | Horizontal (default); vertical when the **direct parent** sets `--direction: row` (`.inline`, `.cluster`, `.button-group`, `.batch-actions`), or anywhere with `aria-orientation="vertical"` |
| Prominence | Default (quiet, decorative), `--strong` (at least 3:1, for a rule that is the only boundary) |
| Style | Solid (default), `--dashed` |

- `--direction` doesn't inherit, so a divider nested deeper inside a row stays horizontal.
- Put `aria-orientation="vertical"` on every vertical divider: assistive technology hears it, and it forces the orientation. A purely decorative divider can take `aria-hidden="true"` instead.
- Inside `<menu>`, `<ul>` or `<ol>`, use `<li role="separator" class="divider"></li>`. In a listbox, where a separator isn't allowed, use `role="none"`.
- Theming: `--divider-width`, `--divider-style`, `--divider-color`, `--divider-strong-color`.

## A. Horizontal
```html
<hr class="divider">
<hr class="divider divider--strong">
<hr class="divider divider--dashed">
```

## B. Vertical (in a row)
```html
<div class="button-group">
  <button type="button" class="button button--subtle"><span>Dashboard</span></button>
  <hr class="divider" aria-orientation="vertical">
  <button type="button" class="button button--subtle"><span>Settings</span></button>
</div>
```

## C. In a Menu
```html
<menu class="menu" aria-label="Document options">
  <li><button type="button" class="button"><span>Duplicate</span></button></li>
  <li role="separator" class="divider"></li>
  <li><button type="button" class="button button--danger"><span>Delete</span></button></li>
</menu>
```

