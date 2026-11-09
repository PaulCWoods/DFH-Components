---
title: Icon and Icon Box
tier: atom
summary: A small glyph that helps people recognise something, on its own or in a frame.
tokens: [icon, icon-box]
storybook: atoms-icon
related: [button, badge-status-chip-kbd, avatar]
---

# 9. Icon & Icon Box primitives
```html playground cluster
<span class="inline">
  <svg class="icon" data-axes width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
  <span class="text" data-label>Rota reminder</span>
</span>
---
Size: Small=icon--sm, Default*, Large=icon--lg
Intent: Neutral, Accent=icon--accent "New rota reminder", Danger=icon--danger "Rota reminder failed to send", Warning=icon--warning "Rota reminder is late", Success=icon--success "Rota reminder sent", Info=icon--info "Rota reminder scheduled"
```

## Purpose
An icon helps someone spot what they already know: a warning beside an error, an arrow on a Link. Few icons mean the same thing to everyone, so an icon sits beside the word and doesn't replace it.

Every icon comes from one sprite, drawn as one family. It's sized in `em` and coloured with `currentColor`, so it follows its text without being told, in any theme and in forced colours. Inside a control or beside text it adds nothing for a screen reader, so it stays hidden there.

An Icon Box is a frame for the moments an icon needs to line up with controls or carry more weight, as in an [Empty State](27-empty-state.md). It isn't interactive. That job belongs to an icon [Button](01-button.md).

## When to use
- **Beside text, to speed recognition:** a warning on an error, an arrow on a Link.
- **`.icon-box` to line icons up** with controls, or to give one more weight, as in an Empty State.
- **Not instead of a word** that people need, unless the control has a hidden name.

## Rules
- Every icon carries `width="1em" height="1em"`, so it stays text-sized if CSS fails to load.
- Decorative icons (beside text, or inside a named control) carry `aria-hidden="true" focusable="false"`. A meaningful standalone icon takes `role="img"` and `aria-label`, or its control carries the name.
- Intent colours an icon but never carries meaning alone (WCAG 1.4.1). For muted icons, use the text colour utilities (`.text-color-muted`).
- Never draw icons inline with `stroke` paths. If the sprite lacks a glyph, add it to `icons/icons.svg` and run `npm run sync:icons`.

## Hide it or name it
```html live cluster
<!-- Decorative icon beside text -->
<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>

<!-- Directional icon: mirrors in right-to-left text -->
<svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>

<!-- Size and intent -->
<svg class="icon icon--lg icon--success" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>

<!-- Meaningful standalone icon -->
<svg class="icon icon--warning" width="1em" height="1em" role="img" aria-label="Warning"><use href="#Warning"/></svg>
```

## Give an Icon more weight
The box is decoration, so it's hidden, and the text beside it says what it means.
```html playground cluster
<span class="inline">
  <span class="icon-box" data-axes aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
  </span>
  <span class="text" data-label>Rota reminder</span>
</span>
---
Prominence: Plain, Subtle=icon-box--subtle
Size: Small=icon-box--sm, Default*, Large=icon-box--lg
Corners: Rounded, Round=icon-box--round
Intent: Neutral, Accent=icon-box--accent "New rota reminder", Danger=icon-box--danger "Rota reminder failed to send", Warning=icon-box--warning "Rota reminder is late", Success=icon-box--success "Rota reminder sent", Info=icon-box--info "Rota reminder scheduled"
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Add a missing glyph to `icons/icons.svg` and run `npm run sync:icons`. | Draw an icon inline with `stroke` paths. |
| Hide an icon beside text from screen readers. | Make a screen reader read "check" before "Saved". |
| Pair an intent colour with words. | Use a red icon as the only sign of an error. |
| Use `--dir` on arrows, so they mirror in right-to-left text. | Mirror an icon that has no direction, like a tick. |

## Reference
An icon is a glyph from the sprite (`icons/icons.svg`, one filled family), sized in `em` so it follows its text and coloured by the text (`currentColor`). Use one only where it speeds recognition.

## Options
| Atom | Axes | Notes |
| :--- | :--- | :--- |
| `.icon` | Size (`--icon-base-size`, `--sm`, `--lg`, `--stretch` to fill its box); intent (`--accent`, `--info`, `--danger`, `--warning`, `--success`) | `--dir` mirrors in right-to-left text; `--disclosure` rotates with the nearest `[aria-expanded]`. Any other size: set `--icon-size` or the font size. `--icon-base-size` is the default size as a plain number of ems (`1`): adjust it for an icon set that sits small or large beside text. Chips, Statuses, Tabs and Buttons follow it. |
| `.icon-box` | Size (48px, `--sm` 32px, `--lg` 64px); prominence (plain, `--subtle`); corners (`--round`); intent (`--accent`, `--info`, `--success`, `--warning`, `--danger`) | A fixed square frame that lines icons up with controls. Not interactive. Intent colours the icon, and a subtle box takes the intent's tint. Flags: `--icon-box-size`, `--icon-box-prominence`, `--icon-box-corners`, `--icon-box-intent`; a compact container steps each size down one (`--lg` to the default, the default to `--sm`). In forced colours a subtle box keeps an outline, and under more contrast it gets its edge back. |

## Icon Box
```html live cluster
<!-- Icon box -->
<span class="icon-box icon-box--subtle icon-box--round" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
</span>

<!-- Icon box with an intent: the icon and the text beside it say what it means -->
<span class="icon-box icon-box--subtle icon-box--round icon-box--success" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
</span>
```
