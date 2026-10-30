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
| Form composition: field, fieldset, choices, form | Done | [audit](audit/form-composition.md) |
| Identity and values: avatar, lockup, telemetry | Done | [audit](audit/identity-values.md) |
| Prose | Done | [audit](audit/prose.md) |
| Table | Done | [audit](audit/table.md) |
| Review: table sticky shadows; scrollable tabs and batch actions with the shared scroll fade (`utilities/scroll-fade.css`) | Done | |
| Accordion (moved to molecules) | Done | [audit](audit/accordion.md) |
| Combobox (moved to molecules) | Done | [audit](audit/combobox.md) |
| Empty state (moved to molecules; intent added to the icon box) | Done | [audit](audit/empty-state.md) |
| Header (rows, stuck shadow, focus clears a sticky header) | Done | [audit](audit/header.md) |
| Layout: primitives (non-inheriting hooks, compact gaps, rows, maximum column counts, wrapper gutter), app shell; sidebar and footer moved to organisms | Done | [audit](audit/layout.md) |
| Utilities (two names each, Tier 2 spacing steps, Tailwind sizes, responsive helpers, modes, `check:utilities`) | Done | [audit](audit/utilities.md) |
| Dialog (modal only, close commands, scroll lock, start-side drawer, faster motion) | Done | [audit](audit/dialog.md) |
| Recipes (states as stories, no inline styles, deck out of core, one command palette) | Done | [audit](audit/recipes.md) |
| Colour palette (generated ramps, contrast gate, theme engine, Token Designer with Global and Semantic tabs; bridge colours removed) | Done | [audit](audit/palette.md) |
| Card intent and subtle telemetry | Done | [surfaces](audit/surfaces.md), [identity](audit/identity-values.md) |

Molecules are audited in groups that share a job, so overlapping components are judged against each other. Card runs first because banner, popover, tooltip, toast and dialog compose it.

The blog's component library page (`_component-library.twig`) gets a proper rework once the atoms are finished.

## Backlog

### Menu and batch actions ARIA (found in the divider pass)

- Menu stories and AGENTS examples put `role="menuitem"` on items in a `<menu>` that has no `role="menu"`, so axe reports a missing parent. Decide in the menu pass: a real `role="menu"` (with arrow-key handling) or plain buttons in a list.
- `.batch-actions` examples put `role="toolbar"` on `<aside>` and `<footer>`, which don't allow it. Use a `<div>`.

### Page-level size containers (found in the surfaces pass)

Container-prefixed modifiers (`@max-sm:card--plain`, `@max-sm:hide`) need an ancestor with `container-type: inline-size`. Only `.split`, `.sidebar`, `.header`, `.footer` and `.container-inline` provide one, so in most layouts these classes match nothing. Make `main` and `.app__workspace` inline-size containers by default. Don't do it on `.grid` or `.stack`: an inline-size container can't shrink to its content, which breaks them in flex rows. If the surfaces pass lands first, the card classes ship and work wherever a container exists.

### Library candidates from the Cadence deck (found in the recipes pass)

Patterns the deck needed that the library lacks. Each waits for its component's next pass, or a second use.

- **Card intent:** done (`.card--accent` and the other intents; see `audit/surfaces.md`). Cadence's decks use it.
- **Thumbnail atom:** square artwork with a size token, a fallback icon and avatar-style corner badges, for album art, product shots and file previews. Avatars are round and for people; icon boxes hold icons; `card__thumb` serves only a card's image. Cadence uses `.deck__art`.
- **Range scale labels:** start and end labels under a slider (elapsed and remaining time, a price range, 0 to 100). Range lockup shows one value only.
- **Three-zone bar:** start, a true centre and end, for a media player, an editor toolbar or a wizard footer. Header bars and between-clusters don't centre the middle part. Cadence uses `.deck-dock`, a `1fr auto 1fr` grid.

### Colour palette tool

Build a tool that generates the Tier 1 colour ramps from OKLCH, so every ramp behaves the same way. It must also check contrast at build time and write the ramps out as hex for Figma.

Why: the warning text colour (amber-700, `#a86800`) measures 4.13–4.25:1 against the page background and against its own tint, under the 4.5:1 that small text needs. Accent text on its subtle tint is borderline at 4.47:1. Moving warning to amber-800 would be a patch. The real fault is that the same step gives a different contrast in each hue.

The tool should:
- Set lightness per step, the same for every hue, and cap chroma per hue so colours stay in sRGB gamut (PRINCIPLES §5).
- Guarantee contrast by step, for example: the text step reaches at least 4.5:1 on the canvas and on the 50/100 tints in light mode, with the mirror rule for dark.
- Check every Tier 2 role pairing with WCAG 2 contrast, and with APCA as a second opinion.
- Write `tokens/1-global.json` and keep the Figma export working.

The warning and accent contrast failures are resolved by the generated palette: every gated pairing passes, and axe finds no colour failures in the status, text-colour or recipe stories (see `audit/palette.md`).

**Blog:** mirrored. The blog takes the library's gated steps with its own brand hues (accent aqua, complementary blue), and the gate passes with that mapping. See `audit/palette.md`.

### Other carried items

- A `.split` that is a direct child of another `.split` sizes itself with its own `--split-side-width`, because the parent's pane rules read `--_split-side` on the child. Wrap it in a plain element (the Token Designer does), or have the pane rules read a separate variable, in the layout's next pass.
- The docs sidebar links to a `/components/atoms/badge` page, and to `/components/layout/*` pages, that don't exist.
- `tabbed-content.gap` points at `{spacing.default}`, which compiles to an undefined `--spacing-default`; point it at `{spacing.16}` in the tabs' next pass.
- A header bar is 65–66px tall; the 4rem `--header-height` fallback (scroll padding, sticky sidebar offset) is 2px short. Decide in the header's next pass whether to raise it.
- Axe failures left after the palette pass (full sweep, 454 stories, light and dark), none from the palette:
  - disabled hint contrast (`molecules-field--disabled`, light and dark) and the range output (`atoms-range--states`, light).
- Icon work (glyphs to draw, the tab icon scale, `Icon.astro`, the blog accent/info clash) is listed in `audit/icon-todo.md`.
- The docs sidebar's "Composite Recipes" links (`/recipes/*`) point at pages that don't exist. Either build them from the stories or link to Storybook.
- Tier 2 `color-mix(in srgb, …)` derivations move to `in oklch` when next touched (`audit/phase-0.md`).
- Text sizes: Tier 2 keeps one fixed size per text atom, `--{atom}-fixed-font-size`. The plain `--body-sm-font-size` and `--body-xs-font-size` (duplicates) are gone, and `--micro-heading-font-size` is `--micro-heading-fixed-font-size`. Figma still names them `body-sm/font-size` and so on (the exporter maps them), so the Figma output is unchanged apart from two descriptions. Blog mirrored.
- `body-xs-compact` points at `{typography.font-size.minus-3}`, which doesn't exist (the scale stops at minus-2), so micro text in a compact region gets no size. Point it at minus-2, or add a minus-3 step.
