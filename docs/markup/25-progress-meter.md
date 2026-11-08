---
title: Progress and Meter
tier: atom
summary: A bar for how far a task has got, or for a measurement within a known range.
tokens: [progress, meter]
storybook: [atoms-progress, atoms-meter]
related: [skeleton, form-composition, badge-status-chip-kbd]
---

# 25. Progress & Meter Primitives
```html playground width=md
<div class="field">
  <div class="field__header">
    <label for="default-progress" class="field__label label" data-label>Uploading photos</label>
    <span class="small-text">68%</span>
  </div>
  <progress id="default-progress" class="progress" data-axes value="68" max="100">68%</progress>
</div>
---
Size: Small=progress--sm, Default*, Large=progress--lg
Intent: Accent, Info=progress--info "Checking photos", Success=progress--success "Upload on track", Warning=progress--warning "Upload is slow", Danger=progress--danger "Upload failed at 68%"
Corners: Default, Round=progress--round
```

## Purpose
A bar can answer two different questions: how far along is this, and how much of it is there? They look alike and mean different things, so there are two native elements. `<progress>` is for a task that will finish. `<meter>` is for a measurement that just is, like disk use.

The browser gives each its role and value, and it works out a Meter's region from `low`, `high` and `optimum`. So a Meter's colour follows its value with no script, and it has no intent classes that could disagree with the number.

A bar never works alone. It backs up the name and value in the text beside it, so colour doesn't carry the meaning. When you can't tell how long a task will take, leave the value off and let it say so honestly, instead of showing a made-up percentage.

## When to use
- **`<progress>` for a task under way:** an upload, a lesson, the steps of a job.
- **`<meter>` for a measurement:** disk use, seats booked, password strength.
- **Not for content still loading in place:** a [Skeleton](26-skeleton.md) holds its space.

## Rules
- **Name every bar and state its value as text beside it.** The bar backs up the text, so colour never carries the meaning alone (WCAG 1.4.1) and the empty track needn't reach 3:1.
- **Meter colour follows the value.** With `low`, `high` and `optimum` set, the browser picks the region: optimum is success, the next warning, the worst danger. With none set, the Meter fills in accent. Meter has no intent classes.
- **Indeterminate progress** has no `value`. Put `aria-busy="true"` on the region being loaded, never on the progress. Under reduced motion the sweep becomes a static hatch.
- **Forced colours** draw the track as the page with an edge and the value as a highlight, so a bar never disappears into its track.

## Keyboard and screen readers
- **Neither takes focus or keys.** They report; they aren't controls.
- **A screen reader** reads the name and value when someone reaches the bar. It doesn't announce a change as it happens.
- **Announcing progress is the product's script.** Say the moments that matter, such as "Upload complete", in a `role="status"` element, and not every percent.

## When You Can't Tell How Long
```html live width=md
<!-- Indeterminate: aria-busy on the region being loaded -->
<section aria-busy="true" aria-labelledby="sync-label">
  <div class="field">
    <label id="sync-label" for="sync-progress" class="field__label label">Syncing data</label>
    <progress id="sync-progress" class="progress">Syncing</progress>
  </div>
</section>
```

## A Meter Colours Itself
```html live width=md
<!-- With thresholds: colour follows the region the value falls in -->
<div class="field">
  <div class="field__header">
    <label for="disk-meter" class="field__label label">Disk use</label>
    <span class="small-text">72 GB of 100 GB</span>
  </div>
  <meter id="disk-meter" class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72 GB</meter>
</div>

<!-- Without thresholds: a plain measurement, filled in accent -->
<meter class="meter meter--sm" value="12" min="0" max="40" aria-label="Seats booked: 12 of 40">12 of 40</meter>

<!-- Password strength -->
<div class="field">
  <label for="pwd-field" class="field__label label">Password</label>
  <input id="pwd-field" type="password" class="input" aria-describedby="pwd-strength" />
  <p id="pwd-strength" class="field__hint small-text">Strength: strong</p>
  <meter class="meter meter--sm" value="4" min="0" max="4" low="2" high="3" optimum="4" aria-labelledby="pwd-strength">4 of 4</meter>
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| State the value as text beside the bar. | Leave the bar to say it alone. |
| Set `low`, `high` and `optimum` so a Meter colours itself. | Look for a Meter intent class. |
| Put `aria-busy="true"` on the region being loaded. | Put it on the Progress Bar. |
| Use `<progress>` with no `value` when you can't tell how long it takes. | Show a made-up percentage. |

## Reference
`<progress>` shows how far a task has got; `<meter>` shows a measurement within a known range. Both live in `atoms/progress.css` and are styled by class only (bare elements keep browser rendering).

## Options
| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.progress` | Size (8px, `--sm` 4px, `--lg` 16px); intent (accent default, `--info`, `--success`, `--warning`, `--danger`); corners (`--round`) | `--progress-size`, `--progress-intent`, `--progress-corners` |
| `.meter` | Size (as progress); corners (`--round`) | `--meter-size`, `--meter-corners` |

### Further rules
- A compact container (`--ui-sizing: compact`) steps both to `--sm`.

## Progress
```html live width=md
<!-- Determinate, labelled, with a readout -->
<div class="field">
  <div class="field__header">
    <label for="upload-progress" class="field__label label">Uploading asset</label>
    <span class="small-text">68%</span>
  </div>
  <progress id="upload-progress" class="progress" value="68" max="100">68%</progress>
</div>

<!-- Size, intent and corners -->
<progress class="progress progress--sm" value="45" max="100" aria-label="Lesson progress">45%</progress>
<progress class="progress progress--lg progress--round" value="85" max="100" aria-label="Course progress">85%</progress>
<progress class="progress progress--success" value="100" max="100" aria-label="Backup complete">100%</progress>
<progress class="progress progress--danger" value="30" max="100" aria-label="Upload failed at 30%">30%</progress>

<!-- Indeterminate: aria-busy on the region being loaded -->
<section aria-busy="true" aria-labelledby="sync-label">
  <div class="field">
    <label id="sync-label" for="sync-progress" class="field__label label">Syncing data</label>
    <progress id="sync-progress" class="progress">Syncing</progress>
  </div>
</section>
```
