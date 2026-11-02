---
title: Badge, Status, Chip and Kbd
tier: atom
summary: Small labels chosen by their job, such as a count on something, the state of something, a value someone chose or a key to press.
tokens: [badge, status, chip, kbd]
storybook: [atoms-badge, atoms-status, atoms-chip, atoms-kbd]
related: [button, avatar, icon-icon-box, form-controls]
---

# 5. Badge, Status, Chip & Kbd Primitives
```html live cluster
<span class="badge"><span class="badge__text">3</span></span>
<span class="status status--success"><span class="status__text">Passed</span></span>
<span class="chip"><span class="chip__text">Ferns</span></span>
<kbd class="kbd">Esc</kbd>
```

## Purpose
A small rounded label can mean almost anything: a count, a result, a tag, a key. When one pill does all of those jobs, the reader has to guess which one it's doing, and the markup can't help a screen reader tell them apart.

So there are four atoms, and you choose by job, not by look. If it's attached to something, it's a Badge. If it says what state something is in, it's a Status. If it's a value someone chose or could remove, it's a Chip. If it's a key, it's a Kbd.

Each takes only the axes its job needs. A Badge is always solid, because it has to show on its host. A Chip has no intent, because a value someone picked isn't good or bad. A Kbd has only a size and a quieter edge.

## When to use
- **Badge:** a count or dot attached to a host, such as unread items on a Tab.
- **Status:** the state of a thing, in words, such as "Passed" in a Table row.
- **Chip:** a value someone chose or could remove, such as an active filter or a tag.
- **Kbd:** a key or shortcut to press.
- **Not for a message:** a sentence that needs attention is a [Banner](11-banner.md).

## Rules
- **Never colour alone** (WCAG 1.4.1). A Status says its state in words, and a Badge's meaning is in its host's name.
- **Presence** (online, away, busy) is a dot Badge on an [Avatar](06-avatar.md), not a Status.
- **Scripts change the `__text` span.** Text goes in `.badge__text`, `.status__text` or `.chip__text`, which trims it so it centres optically. A script that writes to the parent loses that.

## Keyboard and screen readers
- **A Chip's remove control** is a real `<button>`, so Tab reaches it and Enter or Space presses it. Its `aria-label` says what goes: "Remove TypeScript".
- **Removing a Chip is the product's script,** and so is the focus after it. Move focus to the next Chip, or back to the Input that created it, or keyboard users lose their place.
- **A `.kbd` only shows a key.** The product scripts the shortcut itself, and mirrors it in `aria-keyshortcuts` on its control.
- **A Status that changes** while someone is on the page isn't announced on its own. Say the change in a `role="status"` element.

## A Count Belongs to Its Host
The host's name carries the count, and the Badge is hidden from screen readers so it isn't read twice.
```html live cluster
<button type="button" class="button button--icon" aria-label="Notifications, 3 unread">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
  <span class="badge badge--danger badge--sm badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
</button>
<a href="#when-to-use" class="tab">
  <span class="tab__text">Issues</span>
  <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span>
  <span class="sr-only">, 14 open</span>
</a>
```

## A State Is Said in Words
The text carries the state, and intent backs it up. Choose the prominence for how much the state matters on this page.
```html playground cluster
<span class="status" data-axes><span class="status__text" data-label>Queued</span></span>
---
Prominence: Default, Strong=status--strong, Subtle=status--subtle, Plain=status--plain
Intent: Neutral, Accent=status--accent "New", Danger=status--danger "Failed", Warning=status--warning "Degraded", Success=status--success "Passed", Info=status--info "Scheduled"
Size: Default, Small=status--sm
Corners: Rounded, Round=status--round
```

## A Value Someone Chose
A static tag, and a token someone can remove.
```html live cluster
<span class="chip"><span class="chip__text">TypeScript</span></span>
<span class="chip chip--subtle">
  <span class="chip__text">TypeScript</span>
  <button type="button" class="chip__remove" aria-label="Remove TypeScript">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  </button>
</span>
<span class="chip chip--plain"><span class="chip__text">Lesson 04</span></span>
```

## A Key to Press
A single key and a combination. Mirror the shortcut in `aria-keyshortcuts` on its control.
```html live cluster
<kbd class="kbd">Esc</kbd>
<kbd class="kbd"><kbd>⌘</kbd><kbd>K</kbd></kbd>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Choose the atom for its job. | Use a Badge as a label because it looks right. |
| Say the state in words: "Failed". | Show a red dot and nothing else. |
| Put a Badge's meaning in its host's name: "Notifications, 3 unread". | Leave a screen reader with "3". |
| Move focus to the next Chip after removing one. | Let focus fall back to the top of the page. |
| Mirror a shortcut in `aria-keyshortcuts` on its control. | Rely on a `.kbd` to make the shortcut work. |

## Reference
Four atoms, chosen by **job**, not by look. If it's attached to something, it's a Badge. If it sits in the flow and says what state something is in, it's a Status. If it's a value someone chose or could remove, it's a Chip. If it's a key, it's a Kbd.

## Options
| Atom | Job | Axes |
| :--- | :--- | :--- |
| `.badge` | Count or dot attached to a host (tab, Button, nav item, icon), inline after its label or in a corner | Intent, size, presentation (`--dot`). Prominence fixed at strong. |
| `.status` | State of a thing: text with an optional dot or icon | Prominence (default outline pill, `--strong`, `--subtle`, `--plain` dot and text), intent, size, `--round`; `--no-dot` (text only) |
| `.chip` | Value token: selected option, active filter, category or tag; optionally removable | Prominence (default outline, `--subtle`, `--plain`), size, `--round`. No intent. |
| `.kbd` | Keyboard key or shortcut | Size; prominence (`--subtle`, a thinner lower edge) |

### Further rules
- Intents: `--accent`, `--info`, `--danger`, `--warning` and `--success`. Info is aqua, with its own Tier 2 roles.
- Container flags: `--badge-intent`, `--badge-size`; `--status-prominence`, `--status-intent`, `--status-size`, `--status-corners`; `--chip-prominence`, `--chip-size`, `--chip-corners`; `--kbd-size`.
- A compact container (`--ui-sizing: compact`) steps all four to `--sm`.
- **Height:** a default status or Chip is at least as tall as a small Button (`--status-min-size`, `--chip-min-size`, both `spacing.target-sm`, 32px), so they line up side by side. Plain, `--sm` and compact ones take their content's height.
- Wrap the text in `.badge__text`, `.status__text` or `.chip__text`. It trims the text box to cap height (`text-box: trim-both cap alphabetic`) so the text centres optically; padding-block is sized for trimmed text. Bare text still renders, just slightly off-centre and shorter. Scripts that change the text must update the `__text` span, not the parent.
- **Corner Badges and Avatars:** a corner Badge goes inside the Avatar. The Avatar pulls it onto its round edge and rings it in the surface colour; see [Avatar](06-avatar.md).

## Status
The text carries the state (WCAG 1.4.1).
```html live cluster
<span class="status status--success"><span class="status__text">Passed</span></span>
<span class="status status--strong status--danger"><span class="status__text">Failed</span></span>
<span class="status status--subtle status--accent status--round"><span class="status__text">New</span></span>
<span class="status status--plain status--warning"><span class="status__text">Degraded</span></span>
<span class="status status--strong status--warning status--round">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
  <span class="status__text">Action required</span>
</span>
```
