# Combobox

Covers `.combobox`: a text field that filters a list of options (`role="combobox"` with a `role="listbox"`), single or multi-select with chips, and the in-flow list used by the command palette. The second of the remaining organisms, after accordion; empty state and header follow.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome 156 against `packages/css/src/index.css`.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `organisms/combobox.css` | 561 | A container (a size container in `cq` type mode); the control frame with a focus ring on `:focus-within`; a borderless inner input; a start icon and bespoke clear and toggle buttons; a chip area; the list, absolutely placed under the control or anchored through inline `anchor-name` / `position-anchor`; options with hover, active, selected and disabled states, a check icon and a two-line layout; group headers, dividers, an empty message; `--sm` and `--lg`; `--plain`, `--ghost`, `--subtle`, `--flush` and `comboboxes-*` group classes; a rule reaching into a flush card header; invalid and disabled; style queries inside a universal `*` rule; forced-colours and contrast preferences. |

Tier 3: `combobox.*`, 24 tokens. Several read Tier 1 directly (`spacing.8`, `spacing.12`, `spacing.4`), one is a literal (`listbox-gap: 2px`).

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.combobox` | 17 (combobox stories, filter sidebar, command palette, app header recipes) | 4 (overview) |
| `role="combobox"` | 21 | 2 |
| `--sm` / `--lg` | 9 / 2 | 3 / 3 |
| `--flush` / `--plain` / `--subtle` / `--ghost` / `comboboxes-*` | 1 / 0 / 0 / 0 / 0 | 0 |
| `--invalid` / `--disabled` | 2 / 1 | 0 |
| `__icon-start` / `__clear` / `__toggle` | 6 / 2 / 12 | 2 / 1 / 3 |
| `__tags` (chips) | 7 | 1 |
| `__listbox` / `--anchored` (no CSS) / `--static` / `--in-flow` | 14 / 6 / 1 / 0 | 2 / 1 / 0 / 0 |
| Inline `anchor-name` / `position-anchor` | 8 / 8 | 1 / 1 |
| `__option` / `__option-main` / `__option-desc` / `__check` | 32 / 4 / 4 / 5 | 4 / 0 / 0 / 1 |
| `__group-header` / `__empty` | 2 / 2 | 0 |
| State hooks: `data-expanded` / `.is-active` / `data-focused` / `.is-selected` | 4 / (shared) / 0 / 4 | 1 / – / 0 / 0 |
| `aria-activedescendant` | 9 | 0 |

The library already has a native choose-one control with a styleable list: `.select--custom` (`appearance: base-select`), from the form-controls pass.

## Measurements and checks

| | `.input` | `.combobox` |
| :--- | :--- | :--- |
| Height (default / `--sm`) | 48px / 32px | 48px / 32px |
| Border | 2px, strong control colour | 1px, quiet panel colour |
| Inline padding (default / `--sm`) | 16px / 12px | 12px / 8px |
| Text (default / `--sm`) | 16px / 13.3px | 16px / 16px |
| Invalid border | 2px danger | 1px danger |
| Option | – | 37px tall, 13.3px text |

- **It doesn't look like the fields beside it.** A combobox in a form has a lighter, thinner frame, different padding and, at `--sm`, larger text than an input or select. It reimplements the text-control base instead of sharing it, so prominence, corners, invalid and disabled drift too.
- **The list is clipped.** It is absolutely placed inside `.combobox`, so a card or dialog with `overflow: hidden` or a scrolling body cuts it off (checked: a combobox in a 5rem card shows one sliver of the list). Anchoring needs inline `anchor-name` and `position-anchor` styles with unique names per instance.
- **The active option is hard to see.** Keyboard focus moves through options by `aria-activedescendant`; the active option gets the same 5% tint as hover, which is under 1.2:1 against the list. That fails focus visibility (2.4.7) and appearance (2.4.13). Selected and active share that tint, so they are told apart by colour and weight.
- **Three hooks for one state:** `.is-active`, `data-focused` (no uses) and `.is-selected` (beside `aria-selected`); `data-expanded` duplicates `aria-expanded`.
- **Groups aren't exposed.** Group headers are `role="presentation"`, so screen readers don't hear which group an option is in.
- **The empty message isn't announced:** a plain `<li>` that appears when nothing matches.
- **Small buttons.** Clear and toggle are bespoke 24px buttons with no target buffer. The toggle is `tabindex="-1"` (correct: it's for pointers), so its touch target is all it has.
- **Options are smaller than the field:** 13.3px text in 37px rows under a 16px field, below the 48px touch target the library uses for menu items.
- **The container is a size container in `cq` type mode**, so its text could grow with its width. No other control does that.
- **Style queries sit inside a universal `* { … }` rule**, and read `--ui-density`, `--combobox-density` and `--combobox-variation` (no uses).
- **Literal colour fallbacks:** `#d32f2f`, `#f5f5f5`. Tier 1 references: `--spacing-4` … `--spacing-56`, `--typography-font-size-*`.
- **Reaching into the card:** `.card__header--flush > .combobox--flush` reads `--_card-padding`.
- **No script, but needs one.** The pattern (opening, filtering, arrow keys through `aria-activedescendant`, Escape, selection) needs JavaScript; the library ships none, and the stories are static pictures of each state.
- **Axe:** the validation story and two command palette stories fail `aria-required-attr` (a `role="combobox"` without `aria-expanded` or `aria-controls`). Otherwise the stories pass in light and dark.

## Problems found

1. A form control that doesn't match the other form controls.
2. A list that is clipped by its container and needs inline anchor names.
3. An invisible active option; duplicate state hooks.
4. Groups and the empty message aren't exposed to screen readers.
5. Undersized clear and toggle buttons and options.
6. Container type mode, a universal-selector rule, dead flags, literal colours, Tier 1 tokens, card coupling.
7. The behaviour contract isn't written down anywhere.

## Where it ends

The combobox styles a field that filters a list, and the states a script sets: open, active option, selected options, chips, no results. The library ships no script; the product supplies the behaviour, as it does for table sorting. Where no typing is needed, a native control is better: `.select--custom` to pick one from a short list, `<input list>` with a `<datalist>` for plain suggestions.

## Questions

1. **Combobox is a molecule.** It is a field, a list and chips, composed of atoms (input frame, buttons, chips, text atoms, icons), with no other molecules required. Move it to `molecules/combobox.css` and the stories to `Molecules/Combobox`. *Recommended: yes.*

2. **When to use it.** Document a choice:
   - Pick one from a short, known list: `.select--custom` (native, no script).
   - Suggestions while typing, any value allowed: `<input list>` and `<datalist>` (native, unstyled list).
   - Filter a long list, multi-select with chips, rich options: the combobox, with the product's script.

   *Recommended: yes.*

3. **The control is a text control.**
   - `.combobox__control` joins the shared text-control base in `input.css` (`.input`, `.select`, `.textarea`), with its focus ring on `:focus-within`. Size (`--sm`, `--lg`), prominence (`--subtle`, `--plain`), corners (`--round`), invalid and disabled come from there, and so do the `--controls-*` flags and compact regions.
   - The modifiers go on `.combobox`: `.combobox--sm`, `--lg`, `--subtle`, `--plain`, `--round`, with `--combobox-size`, `--combobox-prominence` and `--combobox-corners` flags.
   - The inner `.combobox__input` has no frame.
   - Remove `--ghost`, `--flush`, `comboboxes-*`, `--invalid` (use `aria-invalid` on the input), `--disabled` (use `disabled` on the input), the density and variation flags, the `cq` type mode and size container, and the card-header rule.

   *Recommended: yes.*

4. **The list is a popover, anchored in CSS.**
   - `.combobox__listbox` is `popover="manual"`; the script shows and hides it with `aria-expanded`. In the top layer it can't be clipped by a card or dialog.
   - The combobox scopes an anchor name (`anchor-scope`), so the list finds its own control with no inline styles; it sits below and flips above when there's no room, at least as wide as the control.
   - Without anchor positioning, it falls back to sitting under the control in flow.
   - `.combobox__listbox--static` stays for a list that is always shown (the command palette); remove `--in-flow` and `--anchored` and the inline anchor styles.

   *Recommended: yes.*

5. **Option states, one hook each.**
   - Active (keyboard) option: `.is-active`, which the script moves along with `aria-activedescendant`. It gets an inset focus ring, not a tint.
   - Selected: `aria-selected="true"` only, shown with the check icon and the accent colour. Remove `.is-selected`, `data-focused` and `data-expanded`.
   - Hover: the tint.
   - Disabled: `aria-disabled="true"`.

   *Recommended: yes.*

6. **Options and buttons at target size.**
   - Options are body text, at least 48px tall (or the product's fine-pointer target), and step down in a compact region or `--sm`.
   - Option content is text atoms; a two-line option uses a `.lockup`. Remove `__option-main` and `__option-desc`.
   - Clear and toggle become `.button.button--plain.button--icon.button--sm` inside the control, so they get the button's hover, focus and 48px hit area. `__toggle` stays as a hook for turning its chevron. Remove the bespoke button styles.
   - The start icon is an `.icon` atom; `__icon-start` places it.

   *Recommended: yes.*

7. **Groups and the empty message.**
   - A group is `<ul role="group" aria-labelledby="…">` inside the listbox, labelled by a `<li role="presentation">` with a text atom (`.micro-heading`). `__group-header` becomes `__group-label`, a layout hook only.
   - Dividers between groups are the `.divider` atom (`role="separator"`).
   - No results: `__empty` stays as the visible message, and the count or "No results" also goes into a `role="status"` element, so it is announced.

   *Recommended: yes.*

8. **Multi-select.** Chips sit in `__tags` before the input and wrap; each chip's remove button names its chip ("Remove TypeScript"). Backspace in an empty input removing the last chip is the script's job. *Recommended: yes.*

9. **The script contract, written down.** The markup doc lists what the product's script must do: toggle `aria-expanded` and the popover; filter options; move `aria-activedescendant` and `.is-active` with the arrow keys; Enter selects; Escape closes, then clears; update `aria-selected` and the chips; announce the result count. The stories include a short demo script, marked as product code, so each story can be used by keyboard and tested. *Recommended: yes.*

10. **Tokens.**
    - `combobox.*` drops the control tokens (min-height, bg, border, radius, padding, colour, placeholder), which come from the text-control base.
    - It keeps the list and option tokens, re-pointed at semantic tokens: `listbox-bg`, `listbox-border-color`, `listbox-border-width`, `listbox-radius`, `listbox-shadow`, `listbox-max-height`, `listbox-padding`, `option-padding-block`, `option-padding-inline`, `option-radius`, `option-hover-bg`, `option-selected-color`.
    - Remove `listbox-gap`, `option-selected-bg` and `gap`; remove the literal colour fallbacks.

    That takes it from 24 to about 13. *Recommended: yes.*

11. **Stories, docs and the blog.**
    - Rewrite the stories:
      - a playground;
      - single select;
      - multi-select with chips;
      - groups;
      - rich options;
      - no results;
      - sizes and prominence beside an input;
      - invalid and disabled;
      - in a card that clips (to show the popover escaping);
      - right to left.
    - Migrate the command palette, filter sidebar and app header recipes, and fix the `aria-required-attr` failures.
    - Rewrite `docs/markup/28-combobox.md`.
    - Blog: migrate the overview's four comboboxes.

    *Recommended: yes.*

## Migration done

All recommendations taken.

- **Tokens:** `combobox.*` is 12 tokens, all for the list and its options. The control comes from the input tokens.
- **CSS:**
  - `molecules/combobox.css` replaces `organisms/combobox.css`.
  - `.combobox__control` joins the text-control base in `atoms/input.css`, with a `--combobox-size` / `-prominence` / `-corners` flag set. The modifiers on `.combobox` set these flags, and the field's focus, invalid and disabled states follow its input.
  - The list is a `popover="manual"` anchored through `anchor-scope`; a list without `popover` sits under the field.
  - Options are 48px minimum, the active option has an inset ring, and selected options show the check.
  - Groups are `role="group"` with a rule between them.
- **Found while verifying:**
  - **Closed lists showed.** The list's `display: flex` overrode the browser's rule that hides a closed popover, so every list was open. A closed popover is now hidden explicitly.
  - **A separator isn't allowed in a listbox** (axe `aria-required-children`). Grouped lists are a `<div role="listbox">` of `<ul role="group">`s, separated by a rule.
  - **A disabled option dimmed its field.** The field fades when anything in it is `aria-disabled`. Options no longer count (library and blog).
  - **Buttons grew the field.** In a compact region the button steps to its own small size; the field now sets all three button sizes to fit, so a compact combobox is 32px like a small input.
  - **An empty list** left a bare frame open; a list with no visible options now hides, and `.combobox__empty` shows instead.
  - **Fallback:** without anchor positioning, a popover list shows centred, as the browser places popovers; it still works.
- **Usage migrated:**
  - The filter sidebar recipe (real list, ARIA), the app header and command palette recipes (`aria-controls`, `aria-expanded`), and `32-recipes.md`.
  - The docs site's own command palette: `--plain`, lockup options, and its script no longer sets `.is-selected`. It is listed under molecules in the docs navigation.
- **Stories:** rewritten as `Molecules/Combobox` (10 stories), each driven by a demo script. Checked by keyboard: open, filter, active option, select, chips, no results, right to left, and the list escaping a clipping card. Axe passes on all of them in light and dark. The recipes' remaining failures belong to other components (heading order in the split layout, warning status contrast). Field's disabled story fails on its dimmed hint, a choice from the form-composition pass.
