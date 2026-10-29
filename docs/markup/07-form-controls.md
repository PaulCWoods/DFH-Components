# 7. Input & Form Control Primitives
Six atoms: input (with colour and file), select, textarea, checkbox and radio, switch, range. The audit is in `docs/audit/form-controls.md`.

- **Classes only.** Bare `<input>`, `<select>` and `<textarea>` keep browser styling; the reset gives them back their native rendering.
- **One base for text controls.** `.input`, `.select` and `.textarea` share `atoms/input.css` section 1: the same size, prominence, corners, flags and states.

| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.input`, `.select`, `.textarea` | Size (`--sm`, `--lg`), prominence (outline, `--subtle`, `--plain`), corners (`--round`) | `--input-*`, `--select-*`, `--textarea-*` (`size`, `prominence`, `corners`) |
| `.checkbox-input`, `.radio-input` | Size (20px, `--lg` 24px) | `--check-size: lg` |
| `.switch` | Size, prominence (`--subtle`), intent (`--danger`), corners | `--switch-size`, `--switch-prominence`, `--switch-intent`, `--switch-corners` |
| `.range` | Size, intent (`--info`, `--success`, `--warning`, `--danger`) | `--range-size`, `--range-intent` |

- Group flags `--controls-size`, `--controls-prominence` and `--controls-corners` reach every control, buttons included. Group classes: `.controls-sm`, `.controls-lg`, `.controls-subtle`, `.controls-plain`, `.controls-round`. A compact container (`--ui-sizing: compact`) steps controls to `--sm`.
- **Every prominence keeps a 3:1 edge** (`--border-color-control`). Outline has a full border; subtle and plain keep the bottom border.
- **`--flush`** (text controls) drops the inline padding and the boundary. Use it only inside a bar that draws both, such as a command palette header with `.focus-within`.
- **Hit area:** `--sm` text controls are 32px, matching small buttons; a field can't take a hit-area buffer, so this is also its target (above the 24px minimum). Put touch-facing forms in `fine:ui-compact` rather than using `--sm` directly. Switch and range keep a hit area of at least `--spacing-target-min` whatever their visual size. Put checkboxes and radios in a `.choice` label.
- **Validation:** invalid styling follows `:user-invalid` and `aria-invalid="true"`; always pair it with a `.field__error` message. Valid fields are not recoloured.
- Checkboxes have no intent: a checkbox has a state, not a status.

## A. Text, Colour and File Inputs
```html
<div class="field">
  <label for="user-email" class="field__label">Email Address</label>
  <p id="user-email-hint" class="field__hint">We will never share your email address.</p>
  <input id="user-email" type="email" class="input" autocomplete="email" aria-describedby="user-email-hint" />
</div>

<!-- Error state -->
<div class="field">
  <label for="account-id" class="field__label">Account ID</label>
  <input id="account-id" type="text" class="input" aria-invalid="true" aria-describedby="account-id-error" value="INVALID-ID" />
  <p id="account-id-error" class="field__error">Account ID must start with "DFH-" followed by 6 digits.</p>
</div>

<!-- Size, prominence and corners -->
<input type="search" class="input input--sm" aria-label="Filter" />
<input type="text" class="input input--lg" aria-label="Title" />
<input type="text" class="input input--subtle" aria-label="Name" />
<input type="text" class="input input--plain" aria-label="Name" />
<input type="search" class="input input--round" aria-label="Search" />

<!-- Colour and file -->
<input type="color" class="color-input" value="#00a39a" aria-label="Brand colour" />
<input type="file" class="file-input" aria-label="Attachment" />
```

## B. Textarea (grows with `field-sizing: content`)
```html
<div class="field">
  <label for="feedback" class="field__label">Feedback</label>
  <textarea id="feedback" class="textarea"></textarea>
</div>

<!-- Starts at one line and grows; cap the height with --textarea-lines-max -->
<textarea class="textarea textarea--one-line" aria-label="Comment"></textarea>
```

## C. Select
```html
<div class="field">
  <label for="role-select" class="field__label">Primary Role</label>
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

## D. Checkboxes, Radios, Choices & Fieldset
```html
<fieldset class="fieldset">
  <legend class="legend">Audit deliverables</legend>
  <div class="choices">
    <label class="choice">
      <input type="checkbox" class="checkbox-input" checked />
      <span>Automated axe scan</span>
    </label>
    <label class="choice">
      <input type="checkbox" class="checkbox-input checkbox-input--lg" />
      <span>Keyboard review</span>
    </label>
  </div>
</fieldset>

<div class="choices choices--inline">
  <label class="choice">
    <input type="radio" name="frequency" class="radio-input" checked />
    <span>Daily</span>
  </label>
  <label class="choice">
    <input type="radio" name="frequency" class="radio-input" />
    <span>Weekly</span>
  </label>
</div>
```

## E. Switch (`role="switch"`)
```html
<label class="switch">
  <span class="switch__label">Notifications <small>Email and push</small></span>
  <input type="checkbox" role="switch" class="visually-hidden" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>

<!-- Small, round, danger -->
<label class="switch switch--sm switch--round switch--danger">
  <span class="switch__label">Auto-delete</span>
  <input type="checkbox" role="switch" class="visually-hidden" />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>
```

## F. Range & Range Lockup
`--value` drives the fill in Blink and WebKit; update it on `input`. Gecko draws the fill natively.
```html
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label">Volume</label>
    <output for="volume-control" class="field__output">65%</output>
  </div>
  <input id="volume-control" type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" />
</div>

<!-- Size and intent: pair intent with an output that states the value -->
<input type="range" class="range range--sm" min="0" max="100" value="30" style="--value: 30%;" aria-label="Balance" />
<input type="range" class="range range--danger" min="0" max="100" value="92" style="--value: 92%;" aria-label="Disk use" />

<!-- Range lockup (molecule): button + range + readout -->
<div class="range-lockup range-lockup--sm">
  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Mute">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
  </button>
  <input id="lockup-vol" type="range" class="range" min="0" max="100" value="85" style="--value: 85%;" aria-label="Volume" />
  <output for="lockup-vol" class="range-lockup__output">85%</output>
</div>

<!-- Bordered and round (the boundary lights up while a child has focus) -->
<div class="range-lockup range-lockup--bordered range-lockup--round range-lockup--fill">…</div>
```

## G. Complete Form Layout & Submission Bar
```html
<form class="form">
  <div class="field">
    <label for="full-name" class="field__label">Full Name</label>
    <input id="full-name" type="text" class="input" required />
  </div>

  <div class="form__submission form__submission--right">
    <button type="reset" class="button button--subtle">
      <span>Cancel</span>
    </button>
    <button type="submit" class="button button--strong button--accent">
      <span>Submit</span>
    </button>
  </div>
</form>
```

