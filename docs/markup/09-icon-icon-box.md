# 9. Icon & Icon Box Primitives
An icon is a glyph from the sprite (`icons/icons.svg`, one filled family), sized in `em` so it follows its text and coloured by the text (`currentColor`). Use one only where it speeds recognition (PRINCIPLES §6). The audit is in `docs/audit/icon.md`.

| Atom | Axes | Notes |
| :--- | :--- | :--- |
| `.icon` | Size (`1em`, `--sm`, `--lg`); intent (`--accent`, `--info`, `--danger`, `--warning`, `--success`) | `--dir` mirrors in right-to-left text; `--disclosure` rotates with the nearest `[aria-expanded]`. Any other size: set `--icon-size` or the font size. |
| `.icon-box` | Size (48px, `--sm` 32px, `--lg` 64px); prominence (plain, `--subtle`); corners (`--round`); intent (`--accent`, `--info`, `--success`, `--warning`, `--danger`) | A fixed square frame that lines icons up with controls. Not interactive. Intent colours the icon, and a subtle box takes the intent's tint. Flags: `--icon-box-size`, `--icon-box-prominence`, `--icon-box-corners`, `--icon-box-intent`; a compact container steps it to `--sm`. In forced colours a subtle box keeps an outline. |

- Every icon carries `width="1em" height="1em"`, so it stays text-sized if CSS fails to load.
- Decorative icons (beside text, or inside a named control) carry `aria-hidden="true" focusable="false"`. A meaningful standalone icon takes `role="img"` and `aria-label`, or its control carries the name.
- Intent colours an icon but never carries meaning alone (WCAG 1.4.1). For muted icons, use the text colour utilities (`.text-color-muted`).
- Never draw icons inline with `stroke` paths. If the sprite lacks a glyph, add it to `icons/icons.svg` and run `npm run sync:icons`.

```html
<!-- Decorative icon beside text -->
<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>

<!-- Directional icon: mirrors in right-to-left text -->
<svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>

<!-- Size and intent -->
<svg class="icon icon--lg icon--success" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>

<!-- Meaningful standalone icon -->
<svg class="icon icon--warning" width="1em" height="1em" role="img" aria-label="Warning"><use href="#Warning"/></svg>

<!-- Icon box -->
<span class="icon-box icon-box--subtle icon-box--round" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
</span>

<!-- Icon box with an intent: the icon and the text beside it say what it means -->
<span class="icon-box icon-box--subtle icon-box--round icon-box--success" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
</span>
```

