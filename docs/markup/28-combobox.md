---
title: Combobox
tier: molecule
summary: A text field that filters a list of options, for single select or multi-select with Chips.
tokens: combobox
storybook: molecules-combobox
related: [form-controls, form-composition, badge-status-chip-kbd, lockup]
---

# 28. Combobox
```html playground width=md
<div class="field">
  <label for="default-plant" class="field__label label">Plant</label>
  <div class="combobox" data-axes>
    <div class="combobox__control">
      <input id="default-plant" class="combobox__input" role="combobox" aria-expanded="false"
             aria-controls="default-plant-list" aria-autocomplete="list" autocomplete="off" />
      <button type="button" class="button button--plain button--icon combobox__toggle" tabindex="-1" aria-label="Show plants">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
      </button>
    </div>
    <ul id="default-plant-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="Plants">
      <li id="default-plant-1" class="combobox__option" role="option" aria-selected="false">
        <span>Epimedium</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
    </ul>
    <p class="sr-only" role="status"></p>
  </div>
</div>
---
Size: Small=combobox--sm, Default*, Large=combobox--lg
Prominence: Default, Subtle=combobox--subtle, Plain=combobox--plain
Corners: Rounded, Round=combobox--round
```

## Why it exists
A Combobox is the last thing to reach for. A native `<select>` or `<datalist>` comes with keyboard use, screen reader support and a phone's own picker, and a Combobox has to script all of that. So this page starts by asking whether you need one. You do when a list is too long to scroll, or when people pick several values.

The library draws it and leaves the behaviour to you. The field shares its base with the other text controls, so it matches an Input beside it. The list is a manual popover, so a Card or Dialog can't clip it. What happens on each key depends on your data and where it comes from, so the script is the product's, and the steps it must take are set out below.

Focus stays in the input the whole time. Someone can keep typing to narrow the list, while `aria-activedescendant` tells a screen reader which option is active.

## When to use
Choose the simplest control that works.
- **Pick one from a short, known list:** [`.select--custom`](07-form-controls.md) (native, no script).
- **Suggestions while typing, any value allowed:** `<input list>` with a `<datalist>` (native, unstyled list).
- **Filter a long list, multi-select with Chips, rich options:** `.combobox`, with the product's script.
- **Not without a script:** the library ships none, so the examples on this page don't open, and the list needs the steps in [the product's script](#the-products-script).

## Rules
- Name the field with a `<label>`; name the list with `aria-label`.
- Don't put links or Buttons inside options.
- **Buttons** in the field are `.button.button--plain.button--icon`, sized to fit the field with a 48px hit area. `tabindex="-1"`: keyboard users use the arrow keys and Escape. `.combobox__toggle` turns its chevron while the list is open.
- **The status element** (`role="status"`, visually hidden) carries the result count, so it is announced.

## Keyboard and screen readers
The browser provides focus, typing and Tab. Everything to do with the list is the product's script.
- **Typing** filters the list and opens it.
- **ArrowDown** opens the list and moves to the next option, **ArrowUp** to the previous. Focus stays in the input.
- **Enter** selects the active option.
- **Escape** closes an open list. With the list closed, it clears the input.
- **Backspace** in an empty multi-select input removes the last Chip.
- **Tab** leaves the field and closes the list. A Chip's remove Button is in the tab order; the field's other Buttons aren't.
- **A screen reader** hears a combobox from `role="combobox"`, whether it's open from `aria-expanded`, the active option through `aria-activedescendant`, and the number of results from the status element.

## Single Select
```html live width=md
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
      <li id="plant-2" class="combobox__option" role="option" aria-selected="false">
        <span>Brunnera</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
    </ul>
    <p class="sr-only" role="status"></p>
  </div>
</div>
```

## Multi-Select with Chips
```html live width=md
<div class="field">
  <label for="plants-multi" class="field__label label">Plants</label>
  <div class="combobox">
    <div class="combobox__control">
      <span class="combobox__tags">
        <span class="chip chip--subtle">
          <span class="chip__text">Brunnera</span>
          <button type="button" class="chip__remove" aria-label="Remove Brunnera">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          </button>
        </span>
      </span>
      <input id="plants-multi" class="combobox__input" role="combobox" aria-expanded="false"
             aria-controls="plants-multi-list" aria-autocomplete="list" autocomplete="off" />
    </div>
    <ul id="plants-multi-list" class="combobox__listbox" role="listbox" popover="manual" aria-multiselectable="true" aria-label="Plants to add">
      <li id="plants-multi-1" class="combobox__option" role="option" aria-selected="true">
        <span>Brunnera</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
      <li id="plants-multi-2" class="combobox__option" role="option" aria-selected="false">
        <span>Epimedium</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
    </ul>
    <p class="sr-only" role="status"></p>
  </div>
</div>
```
Chips sit before the input and wrap. Each remove Button names its value. The list stays open while choosing.

## The Product's Script
The library ships no script. The product's script must:
1. Show the list (`showPopover()`) and set `aria-expanded="true"` on typing, ArrowDown or the toggle; hide it and set `false` on Escape, a single selection or leaving the field.
2. Filter: set `hidden` on options (and on groups with none left), show `.combobox__empty` when nothing matches, and put the count or "No results" in the status element.
3. Move the active option with ArrowUp and ArrowDown: `.is-active` on the option and `aria-activedescendant` on the input. Focus stays in the input. Scroll the option into view.
4. Select with Enter or a click (prevent the mousedown so focus stays in the input): set `aria-selected`; fill the input (single) or add a Chip (multi).
5. Escape with the list closed clears the input. In multi-select, Backspace in an empty input removes the last Chip. After removing a Chip, return focus to the input.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use a native select or datalist when it does the job. | Reach for a Combobox for a short, known list. |
| Name the field with a `<label>` and the list with `aria-label`. | Leave the list unnamed. |
| Put the result count in the status element. | Show a count that is never announced. |
| Keep focus in the input and set `aria-activedescendant`. | Move focus into the options. |
| Set `aria-invalid` or `disabled` on the input. | Look for an invalid or disabled class. |
| Say why an option is disabled. | Put links or Buttons inside options. |

## Reference
A text field that filters a list of options: single select, or multi-select with Chips. A molecule: the field's frame is the shared [text-control base](07-form-controls.md), the Buttons are `.button` atoms, Chips are `.chip` atoms and option text is text atoms.

## Options
| Axis | Modifiers (on `.combobox`) | Flags |
| :--- | :--- | :--- |
| Size | default, `--sm`, `--lg` | `--combobox-size`, `--controls-size`, a compact region |
| Prominence | default (outline), `--subtle`, `--plain` | `--combobox-prominence`, `--controls-prominence` |
| Corners | `--round` | `--combobox-corners`, `--controls-corners` |
| Frame | default, `--flush` (no frame of its own, for a Combobox on a surface that draws one, such as a command palette) | |

### Further rules
- **The field** matches an input of the same size and prominence. Its focus ring shows while the input has focus; `aria-invalid="true"` or `disabled` on the input sets the field's invalid or disabled look.
- **The list** is `popover="manual"`, so no Card or Dialog clips it. It anchors to its own field in CSS (no inline styles), opens below and flips above when there is no room. A list without `popover` sits under the field and can be clipped.
- **Options** are at least 48px tall (or the product's fine-pointer target). The check icon shows on selected options; the selected text takes the accent colour.

## Option Content, Groups and No Results
```html
<!-- Two-line option: mark the line that fills the input -->
<li id="plant-example" class="combobox__option" role="option" aria-selected="false">
  <span class="lockup">
    <span class="small-heading" data-label>Brunnera</span>
    <span class="small-text text-muted">Part shade, 40cm</span>
  </span>
  <svg class="icon combobox__check" …><use href="#Check"/></svg>
</li>

<!-- Disabled option: say why -->
<li class="combobox__option" role="option" aria-selected="false" aria-disabled="true">…Out of stock…</li>

<!-- Groups: a div listbox of labelled groups -->
<div id="plant-grouped-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="Plants">
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

## Static List (Command Palette)
`.combobox__listbox--static` is always shown, in flow, with no frame of its own: for a list that is the whole content of a Dialog or panel. Its input keeps `aria-expanded="true"` and `aria-controls`.
```html live width=md
<div class="field">
  <label for="palette-input" class="field__label label">Find a plant</label>
  <div class="combobox">
    <div class="combobox__control">
      <svg class="icon combobox__icon-start" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
      <input id="palette-input" class="combobox__input" role="combobox" aria-expanded="true"
             aria-controls="palette-list" aria-autocomplete="list" autocomplete="off" />
    </div>
    <ul id="palette-list" class="combobox__listbox combobox__listbox--static" role="listbox" aria-label="Matching plants">
      <li id="palette-1" class="combobox__option" role="option" aria-selected="true">
        <span class="lockup">
          <span class="small-heading" data-label>Brunnera</span>
          <span class="small-text text-muted">Part shade, 40cm</span>
        </span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
      <li id="palette-2" class="combobox__option" role="option" aria-selected="false">
        <span class="lockup">
          <span class="small-heading" data-label>Epimedium</span>
          <span class="small-text text-muted">Full shade, 30cm</span>
        </span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
    </ul>
    <p class="sr-only" role="status">2 plants</p>
  </div>
</div>
```
