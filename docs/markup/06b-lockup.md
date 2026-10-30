# 6b. Lockup
A primary line with a secondary one under it: a name and an email, a plot and its soil. A molecule that stacks its lines and lets them truncate; type comes from text atoms on the lines. The audit is in `docs/audit/identity-values.md`.

```html
<span class="lockup">
  <span class="small-heading">Full sun</span>
  <span class="small-text text-muted">Mycorrhizal fungi and leaf mulch</span>
</span>
```

## Identity
An avatar beside a lockup. The name is visible, so the avatar is decorative.
```html
<div class="inline">
  <span class="avatar avatar--sm" aria-hidden="true">MC</span>
  <span class="lockup">
    <span class="small-heading">Marcus Chen</span>
    <span class="small-text text-muted">mchen@urbanmail.net</span>
  </span>
</div>
```

- **Lines** take any text atom: `.small-heading` over `.small-text.text-muted` in lists and tables, `.heading` over `.text` for a profile. The lockup sets no type.
- **Truncation:** add `.truncate` to a line; the lockup and its lines have `min-inline-size: 0`, so they shrink in flex and grid.
- **Alignment:** `.text-center` or `.text-end` on the lockup.
- **Spacing:** `--lockup-gap` (none by default; the lines' leading spaces them).
- **Inline:** `<span class="lockup">` is inline-flex, so it can sit in a button or a sentence.
- **No options.** Removed: `<b>` / `<small>` lines (use text atoms), `lockup--*` modifiers.
