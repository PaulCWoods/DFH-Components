---
title: Form Controls
tier: atom
summary: The parts people fill in or set, such as text inputs, selects, checkboxes, switches and sliders.
tokens: [input, select, textarea, check, switch, range, range-lockup]
storybook: [atoms-input, atoms-select, atoms-textarea, atoms-checkbox-radio, atoms-switch, atoms-range]
related: [form-composition, button, combobox]
---

# 7. Input & Form Control Primitives
```html playground width=md
<div class="field">
  <label for="default-name" class="field__label label">Your name</label>
  <input id="default-name" type="text" class="input" data-axes autocomplete="name" />
</div>
---
Size: Small=input--sm, Default*, Large=input--lg
Prominence: Default, Subtle=input--subtle, Plain=input--plain
Corners: Rounded, Round=input--round
```

## Purpose
A form is where a page asks the most of someone. The browser already knows a lot about that job: the right on-screen keyboard, autofill, keyboard use, how to tell a screen reader what a control is. Every control here is the native element with a class, so all of that keeps working.

Text inputs, Selects and Textareas share one base, so they line up and change together, and every prominence keeps an edge of at least 3:1, because a field people can't find can't be filled in. The browser still draws the Checkbox and radio, so they stay legible in forced colours.

Styling is opt-in through classes. A bare `<input>` keeps its browser rendering, so anything you embed from elsewhere isn't restyled by accident.

## When to use
- **Input, textarea:** text people type, one line or several.
- **Select:** one option from a list they don't need to search. To search it, use a [Combobox](28-combobox.md).
- **Checkbox, radio:** several choices, or one of a few, all in view.
- **Switch:** a setting that takes effect at once.
- **Range:** a value where the rough amount matters more than the exact number.

## Rules
- **Classes only.** Bare `<input>`, `<select>` and `<textarea>` keep browser styling.
- **Validation:** invalid styling follows `:user-invalid` and `aria-invalid="true"`; always pair it with a `.field__error` message. Valid fields are not recoloured.
- **Hit area:** `--sm` text controls are 32px, and a field can't take a hit-area buffer, so that is also its target. Put touch-facing forms in `fine:ui-compact` rather than using `--sm` directly. Put checkboxes and radios in a `.choice` label.
- **Range fill:** `--value` drives the fill in Blink and WebKit, so a script must update it on `input`.

## Keyboard and screen readers
The browser provides the keys, so don't add key handlers. The exact keys for a Select differ by browser and platform.
- **Tab** moves from control to control, in reading order.
- **A Select** opens with Space or the arrow keys, the arrow keys move through it, Enter chooses and Escape closes.
- **A Checkbox** toggles with Space. So does a Switch, which is a Checkbox with `role="switch"`, and a screen reader announces it as on or off.
- **A group of radios** with one `name` is one Tab stop. The arrow keys move and select within it.
- **A Range** moves with the arrow keys, by larger steps with Page Up and Page Down, and to its ends with Home and End.
- **An `<output>`** is a live region, so a screen reader announces a Range's new value as it changes.
- **Errors and hints** are read with the control through `aria-describedby`. The browser never sets `aria-invalid`: server-rendered or scripted errors must set it themselves.

## Say What's Wrong Beside the Field
An error colour says something is wrong, and the message says what. The icon and the words mean it never relies on colour alone.
```html live width=md
<div class="field">
  <label for="account-id" class="field__label label">Account ID</label>
  <p id="account-id-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Account ID must start with "DFH-" followed by 6 digits.</p>
  <input id="account-id" type="text" class="input" aria-invalid="true" aria-describedby="account-id-error" value="INVALID-ID" />
</div>
```

## Put Checkboxes and Radios in a Label
A Checkbox or radio goes in a `.choice` label, so the whole row is the target; a set of them is `.choices` in a [Fieldset](07b-form-composition.md).
```html live width=md
<label class="choice">
  <input type="checkbox" class="checkbox-input" name="terms" />
  <span>I agree to the plot terms</span>
</label>

<!-- Large box -->
<label class="choice">
  <input type="radio" class="radio-input radio-input--lg" name="size" value="full" />
  <span>Full plot</span>
</label>
```

## A Switch Acts at Once
Use a Switch when flipping it changes the setting straight away. If nothing happens until someone submits a form, it's a Checkbox.
```html live width=md
<label class="switch">
  <span class="switch__label label">Notifications <span class="small-text text-muted">Email and push</span></span>
  <input type="checkbox" role="switch" class="sr-only" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>

<!-- Small, round, danger -->
<label class="switch switch--sm switch--round switch--danger">
  <span class="switch__label label">Auto-delete</span>
  <input type="checkbox" role="switch" class="sr-only" />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>
```

## Show a Range's Value
A slider shows roughly where it is, and an `<output>` beside it gives the number.
```html live width=md
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label label">Volume</label>
    <output for="volume-control" class="small-text">65%</output>
  </div>
  <input id="volume-control" type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" />
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Give every control a visible label. | Rely on a placeholder as the label. |
| Use `:user-invalid` or `aria-invalid="true"` with a `.field__error`. | Show an error colour with no message. |
| Set the right `type` and `autocomplete`. | Make people retype what the browser already knows. |
| Put checkboxes and radios in a `.choice` label. | Leave a 20px box as the whole target. |
| Use `.ui-compact` on a dense region. | Add `--sm` to every control in it. |

## Reference
Six atoms: input (with colour and file), select, textarea, checkbox and radio, switch, range. What goes around them (field, Fieldset, choices, form) is in [form composition](07b-form-composition.md).

## Options
| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.input`, `.select`, `.textarea` | Size (`--sm`, `--lg`), prominence (outline, `--subtle`, `--plain`), corners (`--round`, not on `.textarea`) | `--input-*`, `--select-*` (`size`, `prominence`, `corners`), `--textarea-*` (`size`, `prominence`) |
| `.checkbox-input`, `.radio-input` | Size (20px, `--lg` 24px) | `--check-size: lg` |
| `.switch` | Size (`--sm`, `--lg`), prominence (`--subtle`), intent (`--danger`), corners | `--switch-size`, `--switch-prominence`, `--switch-intent`, `--switch-corners` |
| `.color-input` | Size (`--sm`, `--lg`, `--stretch` to fill its container) | |
| `.range` | Size, intent (`--info`, `--success`, `--warning`, `--danger`) | `--range-size`, `--range-intent` |

### Further rules
- **Classes only.** Bare `<input>`, `<select>` and `<textarea>` keep browser styling; the reset gives them back their native rendering.
- **One base for text controls.** `.input`, `.select` and `.textarea` share `atoms/input.css` section 1: the same size, prominence, corners, flags and states.
- Group flags `--controls-size`, `--controls-prominence` and `--controls-corners` reach every control, Buttons included. Group classes: `.controls-sm`, `.controls-lg`, `.controls-subtle`, `.controls-plain`, `.controls-round`. `.elements-subtle` and `.elements-plain` (`--elements-prominence`) reach controls too, along with the other [non-container elements](36-utilities.md). A compact container (`--ui-sizing: compact`) steps controls to `--sm`.
- **Every prominence keeps a 3:1 edge** (`--border-color-control`). Outline has a full border; subtle and plain keep the bottom border.
- **`--flush`** (text controls) drops the inline padding and the boundary. Use it only inside a bar that draws both, such as a command palette header with `.focus-within`.
- **Hit area:** `--sm` text controls are 32px, matching small Buttons; a Field can't take a hit-area buffer, so this is also its target (above the 24px minimum). Put touch-facing forms in `fine:ui-compact` rather than using `--sm` directly. Switch and range keep a hit area of at least `--spacing-target-min` whatever their visual size. Put checkboxes and radios in a `.choice` label.
- Checkboxes have no intent: a Checkbox has a state, not a Status.

## Text, Colour and File Inputs
```html live width=md
<div class="field">
  <label for="user-email" class="field__label label">Email Address</label>
  <p id="user-email-hint" class="field__hint small-text">We will never share your email address.</p>
  <input id="user-email" type="email" class="input" autocomplete="email" aria-describedby="user-email-hint" />
</div>

<!-- Error state -->
<div class="field">
  <label for="account-id" class="field__label label">Account ID</label>
  <p id="account-id-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Account ID must start with "DFH-" followed by 6 digits.</p>
  <input id="account-id" type="text" class="input" aria-invalid="true" aria-describedby="account-id-error" value="INVALID-ID" />
</div>

<!-- Size, prominence and corners -->
<input type="search" class="input input--sm" aria-label="Filter" />
<input type="text" class="input input--lg" aria-label="Title" />
<input type="text" class="input input--subtle" aria-label="First name" />
<input type="text" class="input input--plain" aria-label="Last name" />
<input type="search" class="input input--round" aria-label="Search" />

<!-- Colour and file -->
<input type="color" class="color-input" value="#00a39a" aria-label="Brand colour" />
<input type="file" class="file-input" aria-label="Attachment" />
```

## Textarea (grows with `field-sizing: content`)
```html live width=md
<div class="field">
  <label for="feedback" class="field__label label">Feedback</label>
  <textarea id="feedback" class="textarea"></textarea>
</div>

<!-- Starts at one line and grows; cap the height with --textarea-lines-max -->
<textarea class="textarea textarea--one-line" aria-label="Comment"></textarea>
```

## Select
```html live width=md
<div class="field">
  <label for="role-select" class="field__label label">Primary Role</label>
  <select id="role-select" class="select">
    <option value="">Choose a role</option>
    <option value="lead">Accessibility Lead</option>
  </select>
</div>

<!-- Customizable select (appearance: base-select; other browsers show the native select) -->
<select class="select select--custom" aria-label="Conformance target">
  <button type="button"><selectedcontent></selectedcontent></button>
  <option value="aa" selected>WCAG 2.2 AA</option>
  <option value="aaa">WCAG 2.2 AAA</option>
</select>
```

## Range & Range Lockup
`--value` drives the fill in Blink and WebKit; update it on `input`. Gecko draws the fill natively.
```html live width=md
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label label">Volume</label>
    <output for="volume-control" class="small-text">65%</output>
  </div>
  <input id="volume-control" type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" />
</div>

<!-- Size and intent: pair intent with an output that states the value -->
<input type="range" class="range range--sm" min="0" max="100" value="30" style="--value: 30%;" aria-label="Balance" />
<input type="range" class="range range--danger" min="0" max="100" value="92" style="--value: 92%;" aria-label="Disk use" />

<!-- Range lockup (molecule): button + range + readout -->
<div class="range-lockup range-lockup--sm">
  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Mute the first track">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
  </button>
  <input id="lockup-vol" type="range" class="range" min="0" max="100" value="85" style="--value: 85%;" aria-label="First track volume" />
  <output for="lockup-vol" class="range-lockup__output">85%</output>
</div>

<!-- Bordered and round (the boundary lights up while a child has focus) -->
<div class="range-lockup range-lockup--bordered range-lockup--round range-lockup--fill">
  <button type="button" class="button button--plain button--icon button--sm" aria-label="Mute the second track">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
  </button>
  <input id="lockup-vol-2" type="range" class="range" min="0" max="100" value="40" style="--value: 40%;" aria-label="Second track volume" />
  <output for="lockup-vol-2" class="range-lockup__output">40%</output>
</div>
```

## Forms
Fields, Fieldsets, choices and the Form itself are in [form composition](07b-form-composition.md).
