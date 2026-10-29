# 25. Progress & Meter Primitives
`<progress>` shows how far a task has got; `<meter>` shows a measurement within a known range. Both live in `atoms/progress.css` and are styled by class only (bare elements keep browser rendering). The audit is in `docs/audit/progress-meter.md`.

| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.progress` | Size (8px, `--sm` 4px, `--lg` 16px); intent (accent default, `--info`, `--success`, `--warning`, `--danger`); corners (`--round`) | `--progress-size`, `--progress-intent`, `--progress-corners` |
| `.meter` | Size (as progress); corners (`--round`) | `--meter-size`, `--meter-corners` |

- **Name every bar and state its value as text beside it.** The bar backs up the text, so colour never carries the meaning alone (WCAG 1.4.1) and the empty track needn't reach 3:1.
- **Meter colour follows the value.** With `low`, `high` and `optimum` set, the browser picks the region: optimum is success, the next warning, the worst danger. With none set, the meter fills in accent. Meter has no intent classes.
- **Indeterminate progress** has no `value`. Put `aria-busy="true"` on the region being loaded, never on the progress. Under reduced motion the sweep becomes a static hatch.
- A compact container (`--ui-sizing: compact`) steps both to `--sm`.

## A. Progress
```html
<!-- Determinate, labelled, with a readout -->
<div class="field">
  <div class="field__header">
    <label for="upload-progress" class="field__label">Uploading asset</label>
    <span class="field__result">68%</span>
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
    <label id="sync-label" for="sync-progress" class="field__label">Syncing data</label>
    <progress id="sync-progress" class="progress">Syncing</progress>
  </div>
</section>
```

## B. Meter
```html
<!-- With thresholds: colour follows the region the value falls in -->
<div class="field">
  <div class="field__header">
    <label for="disk-meter" class="field__label">Disk use</label>
    <span class="field__result">72 GB of 100 GB</span>
  </div>
  <meter id="disk-meter" class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72 GB</meter>
</div>

<!-- Without thresholds: a plain measurement, filled in accent -->
<meter class="meter meter--sm" value="12" min="0" max="40" aria-label="Seats booked: 12 of 40">12 of 40</meter>

<!-- Password strength -->
<div class="field">
  <label for="pwd-field" class="field__label">Password</label>
  <input id="pwd-field" type="password" class="input" aria-describedby="pwd-strength" />
  <p id="pwd-strength" class="field__hint">Strength: strong</p>
  <meter class="meter meter--sm" value="4" min="0" max="4" low="2" high="3" optimum="4" aria-labelledby="pwd-strength">4 of 4</meter>
</div>
```

