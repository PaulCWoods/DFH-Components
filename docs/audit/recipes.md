# Recipes

Covers the five recipe stories in `packages/storybook/stories/recipes/`, the recipe markup in `docs/markup/32-recipes.md`, the recipe guide in `.agents/skills/recipe-composition/SKILL.md`, and the deck. PRINCIPLES moves the deck out of core into a recipe. Every component pass has already migrated the recipes' class names, so this pass is about how the recipes are built, not what they're called.

Measured against `packages/css/src/index.css` in headless Chrome at 390px and 1280px, with axe in light and dark.

## What there is

| Recipe | Lines | Stories | Inline styles | Script wiring | Composes |
| :--- | ---: | ---: | ---: | ---: | :--- |
| App header | 752 | 3 | 6 | 1 | header, skip link, nav, popover menu, notifications popover with empty state, its own copy of the command palette |
| Command palette | 644 | 3 | 14 | 4 | dialog, card, a `<menu role="listbox">` of option buttons, empty state, skeletons |
| Filter sidebar | 683 | 3 | 28 | 0 | wrapper, split, accordions, combobox with chips, checkboxes, switches, chips, card grid, empty state, skeletons |
| Tally & Sprout | 1,614 | 3 | 59 | 29 | app shell, metric cards, banner dock, table with selection, sub-rows and batch actions, a three-step lease dialog, a tool drawer, a toast |
| Cadence | 1,719 | 2 | 27 | 26 | app shell, sidebar rail and submenu, header, deck, table, settings dialog, a bottom deck dock, a floating tab bar |
| Deck story (`organisms/deck.stories.ts`) | – | – | 63 | – | the deck organism alone (out of core) |

`docs/markup/32-recipes.md` has six sections:
- A–C: context menu, profile flyout, settings flyout. These have no stories, and §3 and §3b now cover the same ground.
- D: app header.
- E: command palette.
- F: filter sidebar.

The command palette exists four times: the recipe, the app header's copy, the docs site (`CommandPalette.astro`) and §32 E. The recipe guide repeats a fifth version.

## Measurements and checks

- **Class names.** Nearly everything resolves. The exceptions:
  - legacy names: `font-size-md` (tally, cadence), `font-weight-medium`, `heading-1`, `lead-text` (app header). (An earlier draft also listed `toast-stack--bottom-end`; that class exists, §18.)
  - unprefixed script hooks (`plot-row`, `queue-checkbox`, `btn-row-up`, `cmd-clear-btn` …);
  - deck parts the deck CSS doesn't define (`deck__elapsed`, `deck__remaining`, `deck__mute`).
- **Inline styles** (134 in the recipes, 63 in the deck story):
  - `style="display: none"` used as state (the grid view, the wizard steps, the batch bar, the error summary) where `hidden` is the attribute;
  - literal `margin`, `padding`, `color`, `background-color`, `flex` and `z-index`;
  - one `inline-size: 100%; block-size: 100%; block-size: 100%; display: flex …` on the drawer's card;
  - the rest are legitimate token hooks (`--skeleton-width`, `--value`, `--avatar-bg`, `--split-side-width`).
- **Scripts.** Tally and Cadence each run about 300 lines of demo script: filtering, view switching, wizard steps, fee maths, play/pause sync, timers, batch selection, and a hand-made drawer. That's 55 listeners between them.
  - The interactive state lives in script, so most states have no story of their own and axe never sees them: rows selected, the batch bar, wizard steps 2 and 3, the open drawer, the toast, the open settings dialog.
  - The library ships no JS, and the recipes are where readers learn its markup. Script-driven state hides the markup for each state behind code.
- **Cadence's drawer.** The submenu still toggles `.is-open` with a hand-made backdrop `<div>` and script (HANDOVER notes it). The library no longer styles `.is-open`, so on narrow screens the submenu just stacks above the page. This is the case `.dialog--drawer.dialog--start` was built for.
- **Cadence at 390px:**
  - the transport buttons collapse into empty overlapping circles;
  - the deck leaves a tall empty gap below its controls;
  - the floating tab bar is a `<nav>` of `<button>`s with `aria-current` (navigation should be links).
- **Missing icons.** The rail uses `#Calendar`, `#ChartBar` and `#Folder`, which aren't in the sprite, so three rail buttons render empty at 1280px. `#BarChart` exists.
- **Command palette.**
  - It uses a `<menu role="listbox">` with `role="none"` items and `role="option"` buttons, and a `focus-within` header holding an `input--flush`.
  - The combobox molecule (§28) has since shipped the same parts (`combobox__listbox`, `combobox__option`, group labels, the status element). Four copies drift independently.
- **Copy and documentation.**
  - The descriptions are long and promotional ("mission-critical", "production-grade", "engineered entirely with…"), and carry WCAG conformance tables that claim things nobody tested (for example, "2px focus rings across all elements").
  - The filter sidebar's catalog lists the library's own components with "WCAG AAA" badges.
  - Avatars are still described with `data-status` in §32 and the app header.
- **Recipe guide** (`SKILL.md`):
  - it names classes that no longer exist (`focus-none`, `justify-content-between`, `radius-none`);
  - its heuristics predate PRINCIPLES (shared axes, container flags, `--ui-sizing`);
  - it repeats the full markup of four recipes.
- **Deck.**
  - `organisms/deck.css` (635 lines) is still imported by the core stylesheet. Its 16 Tier 3 tokens are compiled and exported to Figma.
  - The blog ships `_deck.scss`, and its overview has a deck demo (63 lines).
  - Its story has 63 inline styles and reports `aria-prohibited-attr` (an `aria-label` on a `<div>` with no role).
- **Axe**, 29 recipe stories, light and dark:
  - Warning-status contrast fails in Cadence buffering, the empty filter sidebar and the Tally dashboard. That's the warning colour (amber-700, 4.2:1), waiting on the palette tool, not the recipes.
  - The Tally loading table has six header cells with only skeletons in them (`empty-table-header`).
- **Overflow.** No recipe scrolls the page sideways at 390px; wide tables scroll inside their containers.

## Problems found

1. State lives in demo scripts, so most states are neither shown as markup nor checked by axe.
2. 134 inline styles, `display: none` used as state, and some legacy names.
3. The deck is still in core, in the tokens, in Figma and on the blog.
4. Cadence's drawer is hand-made and broken; its transport collapses on phones; three of its icons are missing.
5. The command palette exists in four copies, none of them built on the combobox molecule.
6. Promotional, unverified docs; §32 overlaps §3/§3b and duplicates the stories; the recipe guide is out of date.
7. Empty header cells in the Tally loading table.

## Where it ends

A recipe is a worked example: real-looking product screens assembled only from library components, utilities and token hooks. It shows how the parts combine and which choice to make where. It adds no CSS of its own (the deck is the one exception, as a stress test kept beside its recipe), and each state you'd want to see is its own story with static markup.

## Questions

1. **The set.** Keep the five recipes: app header, command palette, filter sidebar, Tally & Sprout, Cadence. §32 A–C (context menu, profile and settings flyouts) are dropped, because §3 and §3b cover them. *Recommended: yes.*

2. **States as stories, not scripts.**
   - Each state worth seeing is its own story, with the markup for that state:
     - Tally: rows selected with the batch bar, empty results, loading, each wizard step (one with errors), the tool drawer, the toast;
     - Cadence: live, buffering, the settings dialog, the navigation drawer;
     - the others as now.
   - Dialogs and drawers open in a `play` function, as the dialog stories do, so axe checks them.
   - Demo scripts go. A script stays only where the pattern can't work without one: the command palette's filtering, arrow keys and `aria-activedescendant`, which §28 assigns to the product's script.

   *Recommended: yes.*

3. **No inline styles** except token hooks (`--value`, `--skeleton-width`, `--avatar-bg`, `--dialog-width` …).
   - `hidden` replaces `display: none`.
   - Literal spacing and colour become utilities or component modifiers.
   - Anything that has no library expression is written down as a backlog item, not patched inline.
   - Legacy names go; script hooks go with the scripts.

   *Recommended: yes.*

4. **The deck leaves core.**
   - Move `organisms/deck.css` to `stories/recipes/cadence/deck.css`, imported only by the Cadence stories. Its private variables fall back to Tier 2 tokens, and the 16 `deck.*` Tier 3 tokens are deleted, so they leave the Figma export too.
   - `organisms/deck.stories.ts` becomes a "Deck" story inside the Cadence recipe; §29 is deleted.
   - The blog loses `_deck.scss` and its overview demo.

   *Recommended: yes.*

5. **Cadence.**
   - The submenu becomes the same navigation in a `.dialog--drawer.dialog--start` below 48em; the sidebar is hidden there (`max-md:hide`), as §34 shows.
   - The hand-made backdrop and `.is-open` go.
   - The narrow-screen transport is rebuilt from button and button-group.
   - The floating tab bar becomes links.
   - The missing icons become existing ones (`BarChart`, `List`, `Grid`); `Calendar` and `Folder` join the glyph backlog.

   *Recommended: yes.*

6. **One command palette, built on the combobox.**
   - The palette's input, list, options, group labels and status element are the combobox molecule's parts, with an in-flow list (no `popover`) inside the dialog's card.
   - The recipe holds the one copy. The app header opens it instead of embedding its own, and the docs site's `CommandPalette.astro` uses the same markup and keeps its script.

   *Recommended: yes.*

7. **Plain documentation.**
   - Each recipe's description says what it's for, lists the components it composes with links to their `§` files, and names the decisions it demonstrates (why a drawer here, why a joined button group there).
   - No conformance tables, no claims that weren't tested, no marketing.
   - The filter sidebar's catalog becomes a plant catalogue, matching the other stories, instead of the library listing itself with "WCAG AAA" badges.

   *Recommended: yes.*

8. **§32 and the recipe guide.**
   - §32 becomes one short section per recipe: its purpose, the components it composes, its decisions, and a link to the story. The markup lives in the stories, not copied into the doc.
   - The recipe guide is rewritten around PRINCIPLES (shared axes, container flags, `--ui-sizing`, no inline styles, states as stories) and points at §32 instead of repeating markup.

   *Recommended: yes.*

9. **Loading table.** Column names show while loading, and skeletons go in body cells only. *Recommended: yes.*

10. **Verification.** Storybook build; axe on every recipe story in light and dark; screenshots at 390px and 1280px; the docs build, with a check of the palette. The warning-contrast failures stay open, pending the palette tool. *Recommended: yes.*

---

## Migration done

All ten recommendations were applied.

1. **Five recipes:** app header, command palette, filter sidebar, Tally & Sprout and Cadence. §32 A–C (context menu, profile flyout, settings flyout) were dropped, since their parts' own sections cover them.
2. **States are stories.** Every state is its own story with static markup. Dialogs and popovers open in `play`. The demo scripts are gone; the command palette's product script (`command-palette/palette.ts`, `enhancePalette`) stays.
3. **No inline styles** except token hooks. `hidden` replaces `display:none`, and the legacy type classes are gone.
4. **Deck left core:**
   - `organisms/deck.css` moved to `stories/recipes/cadence/deck.css`, imported only by the Cadence stories. Its header says it's recipe-only; the hex fallbacks, its own focus outline and `!important` were removed.
   - The 16 `deck.*` tier 3 tokens were deleted, and the tokens and Figma export rebuilt.
   - `organisms/deck.stories.ts` became Cadence's Deck story, and §29 was deleted.
   - Blog: `_deck.scss`, its `@forward`, the overview's deck section and its contents link were removed, and the CSS recompiled with no `.deck` rules left. There were no deck tokens in `_tier3.scss`.
5. **Cadence:**
   - The rail is icon links. The section menu is a navigation tree.
   - Below 48em both hide. A compact header's menu button opens the tree in a `.dialog--drawer.dialog--start`, the sections become a floating tab bar of links, and the docked player hides.
   - `.is-open` and the backdrop script are gone.
   - The transport is a button group, and the levels are named meters with thresholds.
   - Missing icons were swapped for List, Grid and BarChart; Calendar and Folder are in the glyph backlog.
   - `deck--panel` (flex 1, block size 100%) overrode the split's side basis and is no longer used.
6. **One command palette:** the recipe, the app header and the docs site's `CommandPalette.astro` share the markup. The card is the combobox.
7. **Plain documentation:** each recipe's description gives its purpose, what it composes and its decisions. The filter catalogue is now plants.
8. **§32 and the skill:** §32 is one short section per recipe. `recipe-composition/SKILL.md` is rewritten around PRINCIPLES and points at §32.
9. **Loading table:** Tally's loading table keeps its column names, with skeletons in the body cells only.
10. **Verification:** the Storybook build, axe on every recipe story in light and dark, and screenshots at 390px and 1280px. Axe fixes made along the way:
    - the notifications card in a popover is a `section`, so its header and footer aren't page landmarks;
    - table scroll regions take their own name;
    - the loading palette keeps an empty listbox for `aria-controls`.

    The warning status contrast (4.25:1) stays open, pending the palette tool.

**Found and logged:**
- The docs site's `Icon.astro` emits removed icon classes.
- The docs sidebar's `/recipes/*` links have no pages.

**Follow-up (after review):**
- `deck.css` was cut from 620 lines to about 110, covering only what the stories use. The deck is now a `.card` with a state edge (`.deck--on-air`, `.deck--cue`).
- The docked player is one row under a full-width position slider (`.deck-dock`), about half its old height.
- The station header is flush, and collapses by its own width.
- Tally's stat cards are on the 16rem grid.
- Card fix: a header title never shrinks below its longest word (§10).
- The four patterns the deck needed are logged in HANDOVER as library candidates.

