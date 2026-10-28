# Form controls: usage inventory

Covers six atoms: input (including colour and file), select, textarea, checkbox and radio, switch, and range. The molecules built on them (`field`, `choices`, `fieldset`, `range-lockup`, `combobox`) are noted where they depend on these atoms, but they get their own passes.

Counts cover Storybook stories, the docs site and AGENTS.md ("library"), and the blog templates ("blog").

## The CSS

| File | Lines | Selector |
| :--- | ---: | :--- |
| `atoms/input.css` | 385 | `.input` **and** bare `input[type=text|email|…]`, excluding `[class*="__input"]` |
| `atoms/select.css` | 377 | `.select` **and** every `select` |
| `atoms/textarea.css` | 270 | `.textarea` **and** every `textarea` |
| `atoms/check-radio.css` | 95 | `.checkbox-input`, `.radio-input` **and** every checkbox and radio |
| `atoms/switch.css` | 329 | `.switch` (a label wrapping a checkbox with `role="switch"`) |
| `atoms/range.css` | 404 | `.range` **and** every range input, plus the `.range-lockup` molecule |

Input, select and textarea are three copies of the same component: the same private variables, flags, states and modifiers, with the names changed. Together they are about 1,000 lines.

## Usage

| | Library | Blog |
| :--- | ---: | ---: |
| Text-like `<input>` | 71 | 21 |
| `<select>` | 50 | 8 |
| `<textarea>` | 26 | 6 |
| Checkbox | 124 | 12 |
| Radio | 54 | 12 |
| `role="switch"` | 38 | 5 |
| Range | 49 | 4 |
| Element with no class (styled only by the bare selector) | 5 selects | 1 input |

### Modifiers in use

| Class | Library | Blog |
| :--- | ---: | ---: |
| `input--sm` / `--lg` | 16 / 2 | 1 / 1 |
| `input--plain` / `--subtle` / `--flush` | 12 / 4 / 7 | 1 / 1 / 0 |
| `select--sm` / `--lg` | 11 / 1 | 1 / 1 |
| `select--plain` / `--subtle` / `--flush` / `--custom` | 1 / 5 / 1 / 3 | 1 / 1 / 0 / 0 |
| `textarea--sm` / `--lg` / `--one-line` | 1 / 1 / 3 | 1 / 1 / 1 |
| `textarea--plain` / `--flush` / `--subtle` | 1 / 1 / 0 | 1 / 0 / 1 |
| `checkbox-input--sm` / `--lg` / `--danger` | 4 / 1 / 0 | 2 / 0 / 1 |
| `switch--sm` / `--lg` / `--round` / `--destructive` | 9 / 1 / 1 / 1 | 0 / 0 / 0 / 1 |
| `range--sm` / `--lg` | 37 / 2 | 6 / 0 |
| `range--success` / `--warning` / `--danger` | 4 / 3 / 2 | 1 / 0 / 0 |
| `range-lockup` (and `--sm`, `--pill`, `--bordered`, `--fill`) | 8 | 5 |
| Group classes `controls-subtle`, `controls-dense`, `inputs-plain` | 3, 1, 1 | 0 |
| `input--ghost`, `select--ghost`, `textarea--ghost`, `.check--*`, `.custom`, `.range-group*` | 0 | 0 |

Container flags in use: `--input-variation`, `--select-variation`, `--textarea-variation`, `--input-corners`, `--switch-size`, `--switch-corners`, `--range-variant`, `--range-size` (3 or fewer each, mostly in stories).

## Problems found

1. **Three copies of one control.** Input, select and textarea repeat the same 150-line block. Fixes made to one drift from the others: select has `:active`, the others don't; select's `:user-valid` has no `:placeholder-shown` guard; textarea's flush flag reads `--control-variation` and its corners flag `--control-corners`, while input reads `--controls-*`.
2. **Bare element selectors.** Every `input`, `select`, `textarea`, checkbox and range on the page is styled, whatever its class. Components that use native elements have to opt out (`:not([class*="__input"], .input--bare, .input--unstyled)`), and the switch hides its checkbox with `!important` to beat it. Check and radio use `all: revert`, which also reverts anything a containing component sets.
3. **The default boundary fails 1.4.11.** The control border is `--border-color-quiet` (30% grey). Against the page it measures about 1.6:1; a text field needs 3:1 to be identifiable. Plain and subtle inputs have no border at all, and nothing else marks the field (PRINCIPLES §1).
4. **Size ignores the hit-area rule.** `--sm` input, select and textarea are 32px with no buffer. Text fields are replaced elements, so the `::after` buffer that button uses isn't available. Range `--sm` is 16px tall and checkbox `--sm` 16px, under the 24px minimum in WCAG 2.5.8.
5. **Five density and variation vocabularies.** Flags include `--ui-density`, `--control-density`, `--input-density: compact`, `--controls-size`, `--controls-variation`, `--control-variation`, `--input-variation`, `--range-variant`, `--range-tone`, `--switch-variation: destructive`, `--switch-intent: destructive`, `--switch-shape`. PRINCIPLES has one density flag (`--ui-sizing`) and names flags after their axis.
6. **Dead group classes.** `:where(.inputs-dense) { … }` and the like are nested inside the control, so they compile to `input .inputs-dense` and never apply. `.inputs-*`, `.selects-*` and `.textareas-*` duplicate the shared `.controls-*` classes.
7. **Prominence values are off-axis.** `--ghost` aliases `--plain`. `--flush` is plain with no inline padding, which is layout, not prominence.
8. **Success styling on every valid field.** `:user-valid` turns the border green once a field is touched and valid. It's colour only (WCAG 1.4.1), and it fires on optional fields too.
9. **Intent on checkboxes.** `--danger`, `--success` and `--warning` checkboxes recolour the tick. A checkbox has a state, not a status. Invalid already turns it danger.
10. **Literal colours.** Hex fallbacks `#d32f2f`, `#00875a`, `#b06000`, `#008076` (the stale aqua), `#e6e4df`, `#b71c1c`, `#8b0000` and `#ffffff`. The select chevron is a data URI drawn in `#757575`, so it doesn't follow the text colour or dark mode.
11. **Size tokens rely on typed arithmetic.** `--input-sm-padding-block` and its siblings are `calc(var(--input-sm-min-size) / var(--input-min-size) * …)`, dividing a length by a length. Chrome 156 resolves it. Browsers without typed arithmetic drop the whole declaration and the padding falls to 0. This needs checking in Firefox.
12. **Range fill ignores direction.** The WebKit fill is `linear-gradient(to right, …)`, so in right-to-left text the fill grows from the wrong end. Switch mirrors its slide with `[dir="rtl"]`, not `:dir(rtl)`.
13. **Range lockup lives in `range.css`.** It's a molecule. It still carries every `.range-group*` alias and `--range-group-*` token AGENTS.md says to remove, plus three names for one surface (`--surface`, `--bordered`, `--pill`).
14. **Switch duplicates field.** `.switch__label` typography is declared in both `switch.css` and `field.css`.

## Questions

1. **One shared base for text controls.** Move what input, select and textarea share into one base rule. That covers private variables, flags, sizes, prominence, states and validation. Each file then keeps only what differs: the picker for select, line limits and `field-sizing` for textarea, colour and file for input. Select and textarea tokens fall back to the input tokens, and Tier 3 duplicates that hold the same value are removed.
2. **Class only.** Style controls by class only (`.input`, `.select`, `.textarea`, `.checkbox-input`, `.radio-input`, `.range`), and drop the bare element selectors. This removes the opt-out hacks and the `!important`s. Six elements need a class added (5 selects in the library, 1 input in the blog). Unclassed form elements in blog content would fall back to browser styling. (In practice the reset's `all: unset` hid them, so the reset now gives bare fields `all: revert`; see Migration done.) If that matters, the blog can apply the classes in its own form templates.
3. **Prominence.** Keep the shared values: default (outline), `--subtle`, `--plain`. Remove `--ghost`. Every value keeps a 3:1 boundary:
   - default gets a full border that measures 3:1;
   - subtle gets a tinted fill plus a 3:1 bottom border;
   - plain gets only a 3:1 bottom border.

   `--flush` stays as a separate layout modifier (no inline padding, for fields embedded in a bar such as the command palette). It only combines with `--plain`.
4. **A 3:1 control border role.** Add a Tier 2 `border.color.control` that measures at least 3:1 on the canvas and card surfaces in both schemes, and use it for every control boundary (input, select, textarea, switch). This touches the colour ramps, so the palette tool should own the final value. Until then, the nearest step that passes is used.
5. **Small text controls and the hit area.** Pick one:
   - **(a)** With touch targets (the default), `--sm` steps the font size and inline padding down but keeps the 48px height. It drops to 32px only when the product opts into fine-pointer targets. Recommended: it is the only option that keeps PRINCIPLES' rule without a wrapper.
   - **(b)** `--sm` is 32px always, and the field's label counts as the larger target. That relies on the label being next to the control and clickable, which isn't true for icon-labelled search fields.
6. **Validation.** Keep invalid styling (paired with `.field__error` text and `aria-invalid`), and remove the green `:user-valid` border.
7. **Checkbox and radio.**
   - Drop the intent modifiers (invalid stays).
   - Drop the `.check--*` aliases.
   - Sizes: default 20px, `--lg` 24px, and remove `--sm` (16px is under 24px). The `.choice` label stays the real hit area.
8. **Flags.** One vocabulary for every control:
   - group flags `--controls-prominence` (renamed from `--controls-variation`, so button changes too), `--controls-size` and `--controls-corners`;
   - per-atom flags `--input-*`, `--select-*`, `--textarea-*`, `--switch-*` and `--range-*`, using `prominence`, `size`, `corners` and `intent` only;
   - density only through `--ui-sizing: compact`.

   This removes `--ui-density`, `--control-density`, `--*-density`, `--*-variation`, `--range-variant`, `--range-tone`, `--switch-shape`, the `.inputs-*`, `.selects-*` and `.textareas-*` classes, and `.controls-dense` (use `.ui-compact`). `.controls-sm`, `.controls-lg`, `.controls-subtle`, `.controls-plain` and `.controls-round` stay.

### Fixes that need no decision

- Remove literal hex fallbacks.
- Draw the select chevron as a `currentColor` mask, so it follows the text colour and dark mode.
- Replace the typed-arithmetic size tokens with explicit spacing tokens.
- Switch:
  - intent `--danger` only (removing `--destructive` and the `destructive` flag values);
  - mirror with `:dir(rtl)`;
  - hide the checkbox once, without `!important`;
  - leave label typography to `field.css`.
- Range:
  - `block-size` at least `--spacing-target-min`, with the track still centred and the same visual size, so `--sm` passes 2.5.8;
  - fill direction follows `:dir(rtl)`;
  - intents `--accent` (default), `--info`, `--success`, `--warning` and `--danger` through `--range-intent`.
- Range lockup:
  - move to `molecules/range-lockup.css`;
  - delete the `.range-group*` names and tokens;
  - collapse `--surface`, `--bordered` and `--pill` into `--bordered` (with `--round` for the pill shape).
- Reduced-motion and `prefers-contrast` blocks are kept, rewritten to the class-only selectors.

## Migration done

All eight answers and the fixes that need no decision are in. The library and the blog match.

### What changed

- **One base.** `atoms/input.css` section 1 holds everything input, select and textarea share. Select keeps the chevron and the customizable select; textarea keeps line limits and `field-sizing`.
- **Classes only.** Bare `input`, `select` and `textarea` are no longer styled. The reset applied `all: unset` to every element, which left unclassed checkboxes invisible, so the reset now gives native fields `all: revert`.
- **Prominence:** outline, `--subtle`, `--plain`; `--ghost` is gone. Every value keeps a 3:1 edge from the new Tier 2 `border.color.control` (67% of the text colour: 3.2 to 3.4:1 in light, 6.5 to 7.5:1 in dark). Subtle and plain keep the bottom border. `--flush` drops padding and boundary for use inside a bar that draws both.
- **Size:** `--sm` is 32px, matching `button--sm`. A field can't take an `::after` buffer, so 32px is also its target: above 24px (WCAG 2.5.8), below the 48px touch target. The first build kept `--sm` at 48px and only shrank the text, which looked wrong beside small buttons. Use `fine:ui-compact` (new) to make a region compact only where the primary pointer is fine.
- **Validation:** `:user-valid` styling is removed; invalid follows `:user-invalid` and `aria-invalid="true"`.
- **Checkbox and radio:** no intents, no `.check--*`; sizes default (20px) and `--lg` (24px), flag `--check-size: lg`.
- **Switch:** `--danger` only, slides the other way in right-to-left text, hides its checkbox without `!important`.
- **Range:** the slider is at least `--spacing-target-min` tall; the fill follows the text direction; intents (info included) via `--range-intent`.
- **Range lockup** is a molecule (`molecules/range-lockup.css`); `.range-group`, `--surface` and `--pill` are replaced by `.range-lockup`, `--bordered` and `--round`.
- **Flags:** `--controls-prominence`, `--controls-size`, `--controls-corners` plus per-atom flags; density only through `--ui-sizing: compact`. `.inputs-*`, `.selects-*`, `.textareas-*` and `.controls-dense` are removed.
- **Select chevron** is drawn in `currentColor`. The customizable select uses `appearance: base-select` behind `@supports`.

### Caveats

- An unchecked invalid checkbox looks like any unchecked one (`accent-color` only colours the checked state). The error message carries it.
- `.choice` is still 24px tall; that belongs to the choices pass.
- The blog keeps its own `--input-min-size` (2.75rem).
- A fade on the customizable select's picker only works when `@starting-style` wraps an `:open::picker(select)` rule; nested inside the `::picker()` rule it is ignored. The fade is currently removed.

### Axe (66 form-related stories, light and dark)

No violations in the six atoms except one: the disabled range's readout in `Atoms/Range › States` (2.34:1). Disabled content is exempt from 1.4.3. Also flagged, all in older stories: `role="toolbar"` on `aside`/`footer` (batch actions), `role="alert"` on a list and a disabled hint's contrast (field state matrix). Two unnamed switches in the focus-helpers story are now named.

