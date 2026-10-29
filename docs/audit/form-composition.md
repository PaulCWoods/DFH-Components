# Form composition: field, fieldset, choices and form

Covers the molecules that put form controls together, plus the form that holds them:
- the field (`.field`): a label, hint, error and one control;
- the fieldset (`.fieldset`): a group of related controls under a legend;
- choices (`.choices`, `.choice`): a list of checkboxes or radios, each with its label;
- the form (`.form`): the fields in order, then the actions.

The form-controls pass refactored the controls themselves: input, select, textarea, checkbox, radio, switch and range. This pass is about what sits around them: labels, hints, errors, grouping, layout and spacing. It also covers `inline-form` and `inline-field`, which the wayfinding pass left for here.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome 156, light and dark.

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `molecules/field.css` | 219 | `.field`; `--compact`, `--dense`, `--sm`, `--loose`, `--lg`; parts `__header`, `__label`, `__hint`, `__output`, `__result`, `__error`, `__errors`; aliases `.label`, `.hint`, `.output`, `.error-message`, `.field .errors`; also `.switch__label`; layouts `.inline-field`, `.fields-grid`, `.fields-inline` |
| `molecules/fieldset.css` | 129 | `.fieldset` **and bare `fieldset`**; `--compact`, `--dense`, `--loose`, `--lg`, `--bordered`; `.legend` **and bare `legend`**; `__description` |
| `molecules/choices.css` | 157 | `.choices`; `--inline`, `--compact`, `--dense`; flag `--choices-layout`; `.choice`; `--sm`, `--compact`, `--lg`; `.controls-sm` and `.controls-lg` scoping; `__label` with `small` and `__description` |
| `organisms/form.css` | 116 | `.form`; `--compact` (not in `:where()`); `.inline-form`; `__submission`, `--right`, `--left`; flag `--form-submission-align`; a special case for `.form__submission.button` |

Tier 3: `field.*` (4 tokens), `fieldset.*` (1) and `form.*` (6). Three of the six in `form.*` are the choices' gaps. Every file also reads Tier 1 spacing (`--spacing-4` to `--spacing-192`) and queries the legacy `--ui-density: dense` flag.

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.field` | 73 | 26 (the overview and the contact form) |
| `field__label` | 67 | 26 |
| `field__hint`, `field__error`, `field__errors` | 13, 10, 2 | 1, 0, 1 |
| `field__header`, `__output`, `__result` | 8, 5, 4 | 9, 0, 9 |
| `.label`, `.hint`, `.output`, `.error-message` (aliases) | 0 | 1 |
| `field--*` | 0 | 0 |
| `.inline-field`, `.fields-grid`, `.fields-inline` | 3, 2, 1 | 1, 0, 0 |
| `.fieldset` | 22 | 2 |
| `--bordered`, `--compact`, `--loose` | 3, 1, 1 | 0 |
| `.legend` | 22 or so (the rest are bare `<legend>`) | 2 |
| `fieldset__description` | 5 | 1 |
| `.choices` | 20 | 2 |
| `--inline`, `--compact` | 3, 2 | 1, 0 |
| `.choice` | 65 | 19 |
| `--sm`, `--lg` | 4, 1 | 0 |
| `choice__label`, with `<small>` descriptions | 17, 9 | 14 |
| `.form` | 17 | 3 (the overview and the contact form) |
| `.inline-form` | 1 (pagination's page-count pattern) | 1 |
| `form__submission`, `--right` | 10, 3 | 2 (one on the contact form's button itself) |

The field, fieldset and choices stories (1,072 lines) use the old conformance-matrix format. Field and form share one story file titled "Field Form".

## Measurements and checks

- **Fieldset spacing is broken.** The fieldset is a flex column but sets `column-gap`, so its children get no gap at all. The spacing on screen comes from the legend's bottom margin and the description's negative top margin.
- **Choice rows are 24px tall** (a 20px box, 20px line height) with a 16px gap. They pass WCAG 2.5.8 by size, but PRINCIPLES asks for 48px touch targets unless the product opts into fine pointers. In a column, every `.choice` stretches to the full width (608px and 1248px in the stories), so a click in empty space far from the text still toggles the box.
- **Labels are 16px bold**, hints and errors 13.3px. The molecule sets that type itself, and repeats it for the legend and `.switch__label` (the form-controls pass flagged the switch duplicate).
- **Required text is generated.** Whenever a field or fieldset contains a `:required` control, `::after` adds " (Required)". It's English text hard-coded in CSS. Screen readers also announce "required" from the control, so many of them say it twice. Authors can opt out only with a `.required` class.
- **Errors are `role="alert"`** in every story, including errors present on page load. An alert is announced as soon as it is rendered, so a page with three server-side errors announces all three at once and out of order. The error colour has a hex fallback (`#d32f2f`). The errors have no icon; they are text, so they don't rely on colour alone.
- **Disabled fields** dim the whole field to 0.5, label included. A disabled fieldset only mutes its legend.
- **Axe:** 18 stories. One fails, in light and dark: `Field Form › State matrix` (`role="alert"` on a `<ul>`, two list items outside a list, and the disabled hint's contrast, which is exempt). The other 17 pass.

## Problems found

### Field
- **Type in the molecule.** Label, hint, output and error each declare font family, size, weight and line height, which the composition law forbids. There's no label text atom, only the semantic `--label-*` tokens.
- **Aliases:** `.label`, `.hint`, `.output`, `.field__result`, `.error-message`, `.field .errors`, and `__error` beside `__errors`.
- **Size and density on a container:** `--sm`, `--lg`, `--loose` and `--dense`. Containers take density only, and its one modifier is `--compact`.
- **Three layouts:**
  - `.inline-field` puts the label beside the control;
  - `.fields-grid` puts every label in a column beside its control once the container is wide;
  - `.fields-inline` is an auto-fit grid of fields, which is what `.grid` already does.

### Fieldset
- **Styled by element.** Bare `fieldset` and `legend` are styled. The form-controls pass decided to style controls by class only.
- **Gap bug** (above), and a legend that sets its own type.
- **`--bordered`** draws a rounded box around the group. Card is now bordered by default, and the surfaces pass removed `--bordered` from it.
- **`__description`** does the job `field__hint` does, under another name.

### Choices
- **Size on the label row.** `.choice--sm`, `--lg`, and `.controls-sm`/`-lg` scoping set the text size and gap, separately from the box. The form-controls pass removed the small checkbox. The box size is now `--lg` or the `--check-size` flag, so a choice can drift from its box.
- **Type in the molecule.** It sets font size and family, and uses the line height to line the box up with the first line of text.
- **Descriptions** are `<small>` or `__description` with their own type.
- `.choice:disabled` can never match, because a label can't be disabled.

### Form
- **`.form` is a stack** with a field gap. Its `--compact` isn't wrapped in `:where()`, so it outranks every other zero-specificity rule.
- **`form__submission`** is a button group in another form: wrap, gap, alignment modifiers, an alignment flag, and a special case for when the class is on a button.
- **`.inline-form`** is a `.cluster`.

## Where each one ends

- A **field** is one control with its label, and optionally a hint, an error and an output. It owns the order and spacing of those parts.
- A **fieldset** groups controls that answer one question (an address, a set of choices). It owns the legend and the spacing between its children.
- **Choices** are a list of checkbox or radio labels. They own the row height and the alignment of each box with its text. Their question goes in a fieldset legend.
- A **form** owns the vertical rhythm between fields and fieldsets, density for everything inside, and the space before its actions. Layout beyond that (columns, grids) comes from the layout primitives.

## Questions

1. **A label text atom.** Add `.label` to `atoms/text.css` from the `--label-*` tokens: 16px bold, stepping down in compact. It's a text preset like `.small-heading`, for form labels and legends. The parts then set no type:
   - `<label class="field__label label">`;
   - `<legend class="fieldset__legend label">`;
   - `.switch__label label`;
   - hints and errors take `.small-text`.

   The field keeps the colours: hint muted, error danger.

   *Recommended: yes.* It keeps the composition law. Labels and legends stay identical, and a compact form steps them down with everything else.

2. **Field anatomy and order.** Choose one:
   - **(a)** Label, hint, error, control. The error comes before the control, so a screen-reader user hears it before reaching the field, and a magnifier user sees it beside the label. GOV.UK uses this order.
   - **(b)** Label, hint, control, error, as most stories do now.

   Either way:
   - `.field__header` stays, for a label with an `<output>` or a link beside it;
   - the output is `<output class="small-text">`;
   - remove `__result`, `__errors` (one `.field__error`, a `<p>` or a `<ul>`), and the `.label`, `.hint`, `.output`, `.error-message` and `.field .errors` aliases.

   *Recommended: (a).*

3. **Errors are not alerts.** An error is linked to its control with `aria-describedby`, and the control takes `aria-invalid="true"`. It has no role in the canonical markup. A script that inserts an error after the page loads may add `role="alert"`; the docs say so. The error starts with a Warning icon (`aria-hidden`) before its text, and its colour comes from `--field-error-color` → `--foreground-danger` → `currentColor`, with no hex. *Recommended: yes.*

4. **Required and optional are written, not generated.** Remove the `::after` " (Required)" text, the `.required` opt-out and the matching fieldset rule. Authors write it into the label, preferably by marking the fewer case, usually "(optional)". The markup shows `<span class="text-muted">(optional)</span>` inside the label. Required controls keep `required`, which screen readers announce. *Recommended: yes.* CSS-generated text can't be translated, and it doubles the announcement.

5. **Choice rows meet the target size.** Choose one:
   - **(a)** Each `.choice` is at least 48px tall: 32px in a compact container or with fine-pointer targets, never below 24px. The box is centred on the first line with `1lh` maths, not by forcing the line height. Choices have no row gap, since the rows carry the space. A column of choices aligns to the start, so each label is only as wide as its text.
   - **(b)** Keep 24px rows with a 16px gap. That passes 2.5.8, but it's under the 48px touch target.

   With (a), a column of choices sits 48px per row instead of 40px today. A row with a description grows with it. *Recommended: (a).*

6. **Choices take their size from the box.** Remove `.choice--sm`, `--lg` and `--compact`, and the `.controls-sm`/`-lg` scoping. The gap between box and text follows the box size (`--check-size: lg`, or a `--lg` box). The text is the body text the choice sits in. A description is `<span class="small-text text-muted">` in `.choice__label`, which replaces `<small>` and `__description`. `--inline` and the `--choices-layout: inline` flag stay. `--compact` and `--dense` go: compact comes from the container (`--ui-sizing: compact`). *Recommended: yes.*

7. **Fieldset by class, with a working gap.** Style `.fieldset` and `.fieldset__legend` only, not bare `fieldset` and `legend`. The fieldset takes `--fieldset-gap` as `row-gap`; the legend keeps `float` so it joins the flex flow, and loses its margins. `__description` becomes `.fieldset__hint`, linked with `aria-describedby` on the fieldset, as for a field. Remove `--dense`, `--loose` and `--lg`; `--compact` stays. A disabled fieldset dims its content as a disabled field does. *Recommended: yes.*

8. **Bordered fieldset.** Choose one:
   - **(a)** Remove `--bordered`. A boxed group is a fieldset inside a `.card` (or `.card__body`), which already owns borders, radius, padding and prominence.
   - **(b)** Keep `--bordered`, with the legend sitting in the border as browsers draw it.

   *Recommended: (a).* Three story uses, none in the blog.

9. **Form layouts from the layout primitives.** Choose how to name them:
   - `.fields-inline` goes; use `.grid`.
   - `.inline-form` goes; use `.cluster` with `align-items: end`, so the buttons line up with inputs under their labels.
   - `.inline-field` becomes `.field--inline`: the label beside its control, wrapping when there isn't room.
   - `.fields-grid` becomes `.form--aligned`: every field's label in one column beside its control once the form is wider than 32rem. Below that, labels stack.

   *Recommended: yes*, unless you'd prefer other names for the last two.

10. **Form actions are a button group.** Replace `.form__submission`, its `--right`/`--left` modifiers, the alignment flag and the special case for `.button` with `<div class="form__actions button-group">`. The part only adds space above the actions; the group handles wrapping and gaps, and a `justify-end` utility handles alignment. The blog's contact form wraps its submit button in it. `.form` stays a column with the field gap. Its `--compact` (in `:where()`, setting `--ui-sizing: compact`) is the one density switch for a whole form. *Recommended: yes.*

11. **Tokens and stories.** Tier 3 is reorganised:
    - `field.*`: gap, hint colour, error colour, aligned label width;
    - `fieldset.*`: gap;
    - `choices.*`: column gap for inline;
    - `choice.*`: gap;
    - `form.*`: gap, actions gap.

    The choices tokens move out of `form.*`. No Tier 1 fallbacks, and no `--ui-density` queries. Stories are rewritten in the current shape, as Molecules/Field, Molecules/Fieldset, Molecules/Choices and a new Organisms/Form, each with a playground, one story per option, and right to left. Usage in stories, recipes, the docs site and the blog migrates by script. *Recommended: yes.*
