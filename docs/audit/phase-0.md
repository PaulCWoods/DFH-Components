# Phase 0: Foundations

Oct 27, 2026. Shared mechanisms set up before the component passes, so each component is migrated once.

## Done

| Item | Change | Files |
| --- | --- | --- |
| Cascade layers | `index.css` declares `@layer reset, tokens, atoms, molecules, organisms, layout, utilities, overrides;` and every `@import` sits in its layer. Verified in the Storybook build output. | `packages/css/src/index.css` |
| Fonts | Google Fonts `@import` removed from the library. Storybook loads the fonts in its own head; the docs site already did. Font tokens already end in system stacks, so the library is complete without web fonts. | `packages/css/src/index.css`, `packages/storybook/.storybook/preview-head.html` |
| Decisions | Pointer is opt-in; compact containers step controls down; info deferred to banner. Recorded in PRINCIPLES §2 and §9 and AGENTS.md. | `docs/PRINCIPLES.md`, `AGENTS.md` |

Builds: `npm run build-storybook` and `npm run build:docs` both pass.

**Layer side effects to watch for.** Unlayered CSS now beats every library layer regardless of specificity. Storybook's `demo.css` and `preview-head.html` only target demo classes and define no token names, so no change is expected. An `!important` in an earlier layer now beats one in a later layer; the only cases are reduced-motion `transition: none` rules and `[hidden] { display: none }` in reset, which becomes stronger, as intended.

## Tier 2 intent roles

| Intent | surface | surface-strong | foreground (+hover, pressed) | border |
| --- | --- | --- | --- | --- |
| accent | yes | yes | yes | yes |
| danger | yes | yes | yes | yes |
| warning | yes | yes | yes | yes |
| success | yes | yes | yes | yes |
| info | no | no | no | no |

- **info** is missing. `banner--info` aliases accent. *Resolved in the icon pass:* info has its own Tier 2 roles on the aqua ramp.
- **complementary** (olive) roles exist but sit outside the intent axis. Decide whether it is a brand colour or removed.
- **No on-strong foreground.** Text on strong intent surfaces uses `--foreground-inverted-strong` by convention. Fine unless a contrast check fails.

## Mechanism contract for component passes

**Density.** One flag, `--ui-sizing: compact`, set by `--compact` modifiers and `.ui-compact`. Under it, gaps tighten, type steps down and controls step down to `--sm`. `--font-sizing: compact` steps type alone. Migrate these per component:

| Flag | Uses |
| --- | --- |
| `style(--ui-sizing: compact)` (keep) | 72 |
| `style(--ui-density: dense)` | 41 |
| `style(--control-density: dense)` | 17 |
| `--menu-density`, `--combobox-density`, `--textarea-density`, `--telemetry-density` | 5 |
| `.ui-dense` class | `appearance-modes.css`, `card.css`, `deck.css` |

**Pointer.** Default target 48px everywhere. Fine-pointer targets (32px) are opt-in by the product through one root token, defined in the button pass as its first consumer. The library never sets it from `@media (pointer: fine)`. Existing cases to fix in their passes:

- `organisms/table.css:686` switches on `(hover: hover) and (pointer: fine)` automatically.
- `utilities/appearance-modes.css:51` `.font-sizing-compact--on-desk` uses `pointer: fine`. It is an explicit opt-in class, so it may stay, but check it in the utilities pass.
- `atoms/range.css` and `reset.css` enlarge for `(pointer: coarse)`. This is harmless, but redundant once 48px is the default.

**Size.** `--spacing-target` (48px), `--spacing-target-sm` (32px) and `--spacing-target-lg` (64px) already exist in Tier 2; 52 references.

## Found along the way (not Phase 0)

- **Hex ramps are correct.** They are generated from OKLCH tooling and stored as hex for Figma. PRINCIPLES §5 now says OKLCH governs creating and manipulating colour. Follow-up: Tier 2 derivations currently use `color-mix(in srgb, …)` (`color.muted`, `color.overlay`, `surface.translucent`, `shadow.color` and others); move them to `in oklch` when those tokens are next touched, and check contrast after. *Done 30 October 2026: every mix is `in oklch`; the contrast gate passes.*
- **`color.red.100` and `color.red.200` are identical** (`#fff1ee`).
- **Stale hex fallbacks.** Component fallbacks such as `#008076` and `#005f57` are aqua, but accent is now purple. If tokens failed to load, components would show the wrong brand colour, which is more evidence for removing literal fallbacks.
- **Inconsistent Tier 2 helper naming.** `surface.accent-strong` maps light mode to `accent-strong-light`, while `surface.danger-strong` maps light mode to `danger-strong-dark`. The resolved colours are equivalent; only the helper names differ.
