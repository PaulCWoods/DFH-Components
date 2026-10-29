# Handover: state and plan

`docs/PRINCIPLES.md` sets the rules. This file records where the refactor has got to and what comes next. Each pass has its own audit in `docs/audit/`.

## How a pass runs

1. Usage inventory and audit (`docs/audit/<component>.md`), with questions for a decision.
2. Implement: tokens, CSS, migration of every usage, stories, its `docs/markup/` file (plus AGENTS.md if a project-wide rule changes).
3. Verify: Storybook build, axe in light and dark, screenshots.
4. Mirror to the blog: SCSS port, Tier 3 tokens, `templates/_component-library.twig`.

## Passes

| Pass | State | Audit |
| :--- | :--- | :--- |
| Phase 0 foundations | Done | `audit/phase-0.md` |
| Button | Done | `audit/button.md` |
| Badge, status, chip, kbd | Done | `audit/badge-chip.md` |
| Icon (and icon-box) | Done | `audit/icon.md` |
| Form controls (input, select, textarea, check/radio, switch, range) | Done | `audit/form-controls.md` |
| Progress and meter | Done | `audit/progress-meter.md` |
| Link, block link and skip link | Done | `audit/link.md` |
| Tab, tab list and tabbed content | Done | `audit/tab.md` |
| Text | Done | `audit/text.md` |
| Divider | Done | `audit/divider.md` |
| Skeleton | Done | `audit/skeleton.md` |
| Surfaces: card (moved to molecules), section, dialog shell | Done | `audit/surfaces.md` |
| Announcements: banner, banner dock, toast | Done | `audit/announcements.md` |
| Floating layers: popover, tooltip | Done | `audit/floating-layers.md` |
| Action sets: button-group, batch-actions, menu | Done | `audit/action-sets.md` |
| Wayfinding: breadcrumb, navigation-tree, pagination, stepper | Done | `audit/wayfinding.md` |
| Form composition: field, fieldset, choices, form | Audited, awaiting answers | [audit](audit/form-composition.md) |
| Identity and values: avatar, lockup, telemetry | To do | |
| Prose | To do | |
| Remaining organisms (accordion, combobox, empty-state, header, table) | To do | |

Molecules are audited in groups that share a job, so overlapping components are judged against each other. Card runs first because banner, popover, tooltip, toast and dialog compose it.

The blog's component library page (`_component-library.twig`) gets a proper rework once the atoms are finished.

## Backlog

### Utility names pass

PRINCIPLES §3 now limits each utility to two names: verbose (property and value) and Tailwind's shorthand where it has one with the same meaning. The utilities still carry up to five names each (`.fw-700`, `.fs-xs`, `.bold`, `.mono`, `.pre`, the §31D responsive synonyms). Cut them to two, migrate usages, and add a check that fails on a third name. Watch for shorthands whose Tailwind meaning differs (`.text-nowrap` sets `white-space` here; in Tailwind it sets `text-wrap`).

### Menu and batch actions ARIA (found in the divider pass)

- Menu stories and AGENTS examples put `role="menuitem"` on items in a `<menu>` that has no `role="menu"`, so axe reports a missing parent. Decide in the menu pass: a real `role="menu"` (with arrow-key handling) or plain buttons in a list.
- `.batch-actions` examples put `role="toolbar"` on `<aside>` and `<footer>`, which don't allow it. Use a `<div>`.

### Broken `{foreground.default}` references (found in the skeleton pass)

Tier 3 `empty-state.title-color` and `combobox.color` reference `{foreground.default}`. The compiler names it `--foreground-default`, which doesn't exist (the Tier 2 token compiles to `--foreground`), so both fall back. Point them at `{foreground}` in the empty state and combobox passes, and check how they look after.

### Tally Sprout loading table (found in the skeleton pass)

The loading table in `recipe-tally-sprout` has header cells holding only skeletons, so axe reports empty table headers. Column names are known before the data loads: show them, and put skeletons in the body cells only.

### Page-level size containers (found in the surfaces pass)

Container-prefixed modifiers (`@max-sm:card--plain`, `@max-sm:hide`) need an ancestor with `container-type: inline-size`. Only `.split`, `.sidebar` and `.container-inline` provide one, so in most layouts these classes match nothing. Make `main` and `.app__workspace` inline-size containers by default. Don't do it on `.grid` or `.stack`: an inline-size container can't shrink to its content, which breaks them in flex rows. If the surfaces pass lands first, the card classes ship and work wherever a container exists.

### Sidebar story backgrounds

The sidebar stories use `var(--surface-ground, #fafafa)`. The token doesn't exist, so dark mode shows the light hex and fails contrast.

### Colour palette tool

Build a tool that generates the Tier 1 colour ramps from OKLCH, so every ramp behaves the same way. It must also check contrast at build time and write the ramps out as hex for Figma.

Why: the warning text colour (amber-700, `#a86800`) measures 4.13–4.25:1 against the page background and against its own tint, under the 4.5:1 that small text needs. Accent text on its subtle tint is borderline at 4.47:1. Moving warning to amber-800 would be a patch. The real fault is that the same step gives a different contrast in each hue.

The tool should:
- Set lightness per step, the same for every hue, and cap chroma per hue so colours stay in sRGB gamut (PRINCIPLES §5).
- Guarantee contrast by step, for example: the text step reaches at least 4.5:1 on the canvas and on the 50/100 tints in light mode, with the mirror rule for dark.
- Check every Tier 2 role pairing with WCAG 2 contrast, and with APCA as a second opinion.
- Write `tokens/1-global.json` and keep the Figma export working.
- Fix on the way: `color.red.100` and `color.red.200` are identical (`audit/phase-0.md`).

Until then, the warning and accent contrast failures stay open (`audit/badge-chip.md`, Axe).

### Other carried items

- Telemetry and empty-state still use `data-status`. Handle it in their own passes.
- The docs sidebar links to a `/components/atoms/badge` page that does not exist.
- Glyphs to draw for the sprite, and the blog accent/info clash (`audit/icon.md`).
- Tier 2 `color-mix(in srgb, …)` derivations move to `in oklch` when next touched (`audit/phase-0.md`).
