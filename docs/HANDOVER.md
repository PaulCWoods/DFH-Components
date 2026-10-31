# Handover: state and plan

`docs/PRINCIPLES.md` sets the rules. This file records where the refactor has got to and what comes next. Each pass has its own audit in `docs/audit/`.

## How a pass runs

1. Usage inventory and audit (`docs/audit/<component>.md`), with questions for a decision.
2. Implement: tokens, CSS, migration of every usage, stories, its `docs/markup/` file (plus AGENTS.md if a project-wide rule changes).
3. Verify: Storybook build, axe in light and dark, screenshots.
4. Mirror to the blog: SCSS port, Tier 3 tokens.

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
| Typography (theme engine for the type scale, line-height scale and text styles; font sources, variable fonts, system stacks by default with a generated `fonts.css`; gate; Typography section in the Token Designer; Figma text styles) | Done, blog mirrored | [audit](audit/typography.md) |
| Fluid spacing (`space` theme section, engine, `build:space`, roles breathe-sm to cushion-lg, Spacing section in the Token Designer, Figma per-mode fix) | Done, blog mirrored | [audit](audit/fluid-spacing.md) |
| Thumbnail atom (`.thumbnail`, §6c; Cadence's record moved onto it) | Done, blog mirrored | [audit](audit/thumbnail.md) |
| Brand atom (`.brand`, §6d; replaces `.header__brand*`) | Done, blog mirrored | [markup](markup/06d-brand.md) |
| Docs site (rebuilt from scratch: markup docs feed the pages, library-only shell, `components.designforhumans.blog`) | Phase 4 done: every component has a page; questions open | [plan](audit/docs-site.md) |

Molecules are audited in groups that share a job, so overlapping components are judged against each other. Card runs first because banner, popover, tooltip, toast and dialog compose it.

## Backlog

### Menu and batch actions ARIA (found in the divider pass)

- Menu stories and AGENTS examples put `role="menuitem"` on items in a `<menu>` that has no `role="menu"`, so axe reports a missing parent. Decide in the menu pass: a real `role="menu"` (with arrow-key handling) or plain buttons in a list.
- `.batch-actions` examples put `role="toolbar"` on `<aside>` and `<footer>`, which don't allow it. Use a `<div>`.

### Page-level size containers (found in the surfaces pass)

Done: `.main` and `.app__workspace` are inline-size containers; `.container-type-normal` opts out. Not `.grid` or `.stack`, which must shrink to their content in flex rows.

### Library candidates from the Cadence deck (found in the recipes pass)

Patterns the deck needed that the library lacks. Each waits for its component's next pass, or a second use.

- **Card intent:** done (`.card--accent` and the other intents; see `audit/surfaces.md`). Cadence's decks use it.
- **Thumbnail atom:** done (`.thumbnail`, §6c): avatar sizes plus `--thumbnail-size`, `--thumbnail-aspect`, `--round`, an icon when there's no picture, corner badges. Cadence's record is a round thumbnail.
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

- A `.split` that is a direct child of another `.split` sizes itself with its own `--split-side-width`. Documented as a rule in §19c (wrap the inner split in a `<div>`); a CSS fix needs `inherit()` to be Baseline. Revisit then.
- The docs sidebar links to a `/components/atoms/badge` page, and to `/components/layout/*` pages, that don't exist.
- Icon work (glyphs to draw, the tab icon scale, `Icon.astro`, the blog accent/info clash) is listed in `audit/icon-todo.md`.
- The docs sidebar's "Composite Recipes" links (`/recipes/*`) point at pages that don't exist. Either build them from the stories or link to Storybook.
- Colour mixes with `transparent` are `in srgb` again (31 October 2026, blog mirrored). The OKLCH versions (30 October) gave a visible shift on translucent surfaces. Every mix in the library is a translucency mix, so none are in OKLCH now; mixes between two colours would be. Move translucency to `alpha(from …)` once it is Baseline Widely Available (PRINCIPLES §5). The shadow colours use translucency tokens (a `translucency.25` step was added) in place of literal percentages.
- Text sizes: Tier 2 keeps one fixed size per text atom, `--{atom}-fixed-font-size`. The plain `--body-sm-font-size` and `--body-xs-font-size` (duplicates) are gone, and `--micro-heading-font-size` is `--micro-heading-fixed-font-size`. Figma still names them `body-sm/font-size` and so on (the exporter maps them), so the Figma output is unchanged apart from two descriptions. Blog mirrored.

### Quick fixes (after the palette pass)

- `tabbed-content.gap` → `{spacing.16}`; `body-xs` descriptions corrected (step -2 is the floor, so compact keeps it).
- Tokens that pointed at steps that don't exist: `check.box-size` (`spacing.20`, now 1.25rem from `spacing.16`), `block-link.line-height` (now the small heading's), the textarea line heights (now body and body-sm). The CSS fallbacks had been covering for them.
- `header.height` token (`--header-height`): a target-sized bar, its padding and the border, 65px, so a sticky header's scroll padding and the sticky sidebar offset clear it. Products with a taller header still set it on `:root`.
- Tab icons size with `--icon-size` instead of `scale`, so `.icon--dir` mirrors them in right to left.
- Status border fallbacks end at `currentColor`.
- A disabled field dims its label and control only; hints, errors and outputs keep full contrast. This clears the last two axe failures (disabled hint, range output).
