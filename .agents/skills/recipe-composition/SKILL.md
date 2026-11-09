---
name: recipe-composition
description: |
  Writing and maintaining the library's recipe stories (packages/storybook/stories/recipes), the composed screens that prove the library: what a recipe may and may not add, one story per state, and how a missing piece becomes a library change.

  Trigger immediately for:
  - Authoring or refactoring packages/storybook/stories/recipes/*.stories.ts.
  - The Token Designer's Real World pages (packages/token-designer/src/real-world/*.html), which follow the same rules.
  - Finding that a recipe needs something the library doesn't have.
---

# Recipe stories

Recipes are screens composed only from library markup, to prove the library works as a whole. Load the `composition` skill first: its decision list applies to every recipe. `docs/markup/32-recipes.md` lists the five recipes (App Header, Command Palette, Filter Sidebar, Tally & Sprout, Cadence Dashboard) and the rules they share. Update it when you add, rename or remove a story.

## 1. A recipe adds nothing to the library

- **No CSS of its own.** When a recipe needs something and the `composition` list runs out, the library is missing it. Log it in `docs/HANDOVER.md` for that component's pass. Never patch it in the recipe.
- **The one exception** is Cadence's `cadence/deck.css`, which ships nowhere and isn't a pattern to copy.
- **Inline `style` holds token hooks only:** `--value`, `--skeleton-width`, `--avatar-bg`, `--dialog-width` and component tokens.
- **The Real World pages work the same way:** a page that needs CSS of its own means the library is missing something.

## 2. States are stories

- **One story per state,** with static markup: default, empty, loading, error, selected, open.
- **Open dialogs and popovers in `play`** (`showModal()`, `showPopover()`), never with a demo script.
- **No scripts that toggle classes.** A script belongs only where the product would ship one, such as the command palette's filtering.
- **Hide with `hidden`.**

## 3. Verify

1. **Build Storybook:** `npm run build:storybook`.
2. **Run the story gates on the recipes,** one at a time, each under `timeout`:
   - `npm run check:layout -- '^recipes-'` (reachable at 12 widths, no sideways scroll);
   - `check:targets -- '^recipes-'` (hit areas, bars and forced colours);
   - `check:focus -- '^recipes-'`.
3. **Check axe** in the Storybook a11y panel, in light and dark.
4. **Look at the screens** at 390px and 1280px.
