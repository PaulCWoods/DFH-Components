# 28. Combobox
A text field that filters a list of options: single select, or multi-select with chips. A molecule: the field's frame is the shared text-control base (§7), the buttons are `.button` atoms, chips are `.chip` atoms and option text is text atoms. The audit is in `docs/audit/combobox.md`.

**Choose the simplest control that works:**

| Need | Use |
| :--- | :--- |
| Pick one from a short, known list | `.select--custom` (native, no script) |
| Suggestions while typing, any value allowed | `<input list>` with a `<datalist>` (native, unstyled list) |
| Filter a long list, multi-select with chips, rich options | `.combobox`, with the product's script |

| Axis | Modifiers (on `.combobox`) | Flags |
| :--- | :--- | :--- |
| Size | default, `--sm`, `--lg` | `--combobox-size`, `--controls-size`, a compact region |
| Prominence | default (outline), `--subtle`, `--plain` | `--combobox-prominence`, `--controls-prominence` |
| Corners | `--round` | `--combobox-corners`, `--controls-corners` |

## A. Single Select
```html
<div class="field">
  <label for="plant" class="field__label label">Plant</label>
  <div class="combobox">
    <div class="combobox__control">
      <svg class="icon combobox__icon-start" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
      <input id="plant" class="combobox__input" role="combobox" aria-expanded="false"
             aria-controls="plant-list" aria-autocomplete="list" autocomplete="off" />
      <button type="button" class="button button--plain button--icon combobox__clear" tabindex="-1" aria-label="Clear">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
      <button type="button" class="button button--plain button--icon combobox__toggle" tabindex="-1" aria-label="Show plants">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
      </button>
    </div>
    <ul id="plant-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="Plants">
      <li id="plant-1" class="combobox__option" role="option" aria-selected="false">
        <span>Epimedium</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
      …
    </ul>
    <p class="sr-only" role="status"></p>
  </div>
</div>
```
- **The field** matches an input of the same size and prominence. Its focus ring shows while the input has focus; `aria-invalid="true"` or `disabled` on the input sets the field's invalid or disabled look.
- **Buttons** in the field are `.button.button--plain.button--icon`, sized to fit the field with a 48px hit area. `tabindex="-1"`: keyboard users use the arrow keys and Escape. `.combobox__toggle` turns its chevron while the list is open.
- **The list** is `popover="manual"`, so no card or dialog clips it. It anchors to its own field in CSS (no inline styles), opens below and flips above when there is no room. A list without `popover` sits under the field and can be clipped.
- **Options** are at least 48px tall (or the product's fine-pointer target). The check icon shows on selected options; the selected text takes the accent colour.
- **The status element** (`role="status"`, visually hidden) carries the result count, so it is announced.

## B. Multi-Select with Chips
```html
<div class="combobox__control">
  <span class="combobox__tags">
    <span class="chip chip--subtle">
      <span class="chip__text">Brunnera</span>
      <button type="button" class="chip__remove" aria-label="Remove Brunnera">…</button>
    </span>
  </span>
  <input class="combobox__input" role="combobox" … />
</div>
<ul class="combobox__listbox" role="listbox" popover="manual" aria-multiselectable="true" …>…</ul>
```
Chips sit before the input and wrap. Each remove button names its value. The list stays open while choosing.

## C. Option Content, Groups and No Results
```html
<!-- Two-line option: mark the line that fills the input -->
<li id="plant-2" class="combobox__option" role="option" aria-selected="false">
  <span class="lockup">
    <span class="small-heading" data-label>Brunnera</span>
    <span class="small-text text-muted">Part shade, 40cm</span>
  </span>
  <svg class="icon combobox__check" …><use href="#Check"/></svg>
</li>

<!-- Disabled option: say why -->
<li class="combobox__option" role="option" aria-selected="false" aria-disabled="true">…Out of stock…</li>

<!-- Groups: a div listbox of labelled groups -->
<div id="plant-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="Plants">
  <ul role="group" aria-labelledby="g-perennials">
    <li id="g-perennials" role="presentation" class="combobox__group-label micro-heading">Perennials</li>
    <li class="combobox__option" role="option" …>…</li>
  </ul>
  <ul role="group" aria-labelledby="g-ferns">…</ul>
</div>

<!-- No results: visible message, and the same news in the status element -->
<p class="combobox__empty small-text" hidden>No plants match. Try another name.</p>
```
A rule separates groups; a separator isn't allowed inside a listbox. A list with no options left hides itself.

## D. Static List (Command Palette)
`.combobox__listbox--static` is always shown, in flow, with no frame of its own: for a list that is the whole content of a dialog or panel. Its input keeps `aria-expanded="true"` and `aria-controls`.

## E. The Product's Script
The library ships no script. The product's script must:
1. Show the list (`showPopover()`) and set `aria-expanded="true"` on typing, ArrowDown or the toggle; hide it and set `false` on Escape, a single selection or leaving the field.
2. Filter: set `hidden` on options (and on groups with none left), show `.combobox__empty` when nothing matches, and put the count or "No results" in the status element.
3. Move the active option with ArrowUp and ArrowDown: `.is-active` on the option and `aria-activedescendant` on the input. Focus stays in the input. Scroll the option into view.
4. Select with Enter or a click (prevent the mousedown so focus stays in the input): set `aria-selected`; fill the input (single) or add a chip (multi).
5. Escape with the list closed clears the input. In multi-select, Backspace in an empty input removes the last chip. After removing a chip, return focus to the input.

The Storybook stories carry a demo script that does this; it is product code, not part of the library.

## F. Rules
- Name the field with a `<label>`; name the list with `aria-label`.
- Don't put links or buttons inside options.
- **Removed:** `--ghost`, `--flush`, `comboboxes-*`, `--invalid` (use `aria-invalid`), `--disabled` (use `disabled`); `__listbox--anchored`, `--in-flow`; inline `anchor-name` / `position-anchor`; `__option-main`, `__option-desc` (use a `.lockup`); `__group-header` (use `__group-label` in a `role="group"`); dividers in the list; the bespoke `__clear` and `__toggle` button styles (they're `.button`s); `.is-selected`, `data-focused`, `data-expanded`; `--combobox-density`, `--combobox-variation`, `--ui-density`; the `cq` type mode; the control tokens (`min-height`, `bg`, `border-*`, `radius`, `padding-*`, `gap`, `color`, `placeholder-color`), `listbox-gap` and `option-selected-bg`.
