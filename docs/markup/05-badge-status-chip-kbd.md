# 5. Badge, Status, Chip & Kbd Primitives
Four atoms, chosen by **job**, not by look:
- If it's attached to something, it's a **badge**.
- If it sits in the flow and says what state something is in, it's a **status**.
- If it's a value someone chose or could remove, it's a **chip**.
- If it's a key, it's a **kbd**.

The inventory and migration are recorded in `docs/audit/badge-chip.md`.

| Atom | Job | Axes |
| :--- | :--- | :--- |
| `.badge` | Count or dot attached to a host (tab, button, nav item, icon), inline after its label or in a corner | Intent, size, presentation (`--dot`). Prominence fixed at strong. |
| `.status` | State of a thing: text with an optional dot or icon | Prominence (default outline pill, `--strong`, `--subtle`, `--plain` dot and text), intent, size, `--round` |
| `.chip` | Value token: selected option, active filter, category or tag; optionally removable | Prominence (default outline, `--subtle`, `--plain`), size, `--round`. No intent. |
| `.kbd` | Keyboard key or shortcut | Size only |

- Intents: `--accent`, `--info`, `--danger`, `--warning` and `--success`. Info is aqua, with its own Tier 2 roles.
- Container flags: `--badge-intent`, `--badge-size`; `--status-prominence`, `--status-intent`, `--status-size`, `--status-corners`; `--chip-prominence`, `--chip-size`, `--chip-corners`; `--kbd-size`.
- A compact container (`--ui-sizing: compact`) steps all four to `--sm`.
- `data-status` (online, away, busy) is presence and belongs on `.avatar` only. Never put it on these atoms.
- Story captions are not components: in Storybook, label demo regions with `.sb-demo-tag`, never with a badge.
- Wrap the text in `.badge__text`, `.status__text` or `.chip__text`. It trims the text box to cap height (`text-box: trim-both cap alphabetic`) so the text centres optically; padding-block is sized for trimmed text. Bare text still renders, just slightly off-centre and shorter. Scripts that change the text must update the `__text` span, not the parent.

```html
<!-- Badge: count attached to a host; the host's name carries the count -->
<button type="button" class="button button--icon" aria-label="Notifications, 3 unread">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
  <span class="badge badge--danger badge--sm badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
</button>
<a href="/issues" class="tab">
  <span class="tab__text">Issues</span>
  <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span>
  <span class="visually-hidden">, 14 open</span>
</a>

<!-- Status: the text carries the state (WCAG 1.4.1) -->
<span class="status status--success"><span class="status__text">Passed</span></span>
<span class="status status--strong status--danger"><span class="status__text">Failed</span></span>
<span class="status status--subtle status--accent status--round"><span class="status__text">New</span></span>
<span class="status status--plain status--warning"><span class="status__text">Degraded</span></span>
<span class="status status--strong status--warning status--round">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
  <span class="status__text">Action required</span>
</span>

<!-- Chip: static tag, and removable token -->
<span class="chip"><span class="chip__text">TypeScript</span></span>
<span class="chip chip--subtle">
  <span class="chip__text">TypeScript</span>
  <button type="button" class="chip__remove" aria-label="Remove TypeScript">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  </button>
</span>
<span class="chip chip--plain"><span class="chip__text">Lesson 04</span></span>

<!-- Kbd: single key and combination; mirror the shortcut in aria-keyshortcuts on its control -->
<kbd class="kbd">Esc</kbd>
<kbd class="kbd"><kbd>⌘</kbd><kbd>K</kbd></kbd>
```

- **Corner badges and avatars:** do not put a corner badge inside `.avatar`, which clips with `overflow: hidden`. Use `[data-status]` on the avatar, or wrap the avatar.
- **Removing a chip:** after removal, move focus to the next chip or back to the input that created it.

