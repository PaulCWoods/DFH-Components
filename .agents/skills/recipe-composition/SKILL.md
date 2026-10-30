---
name: recipe-composition
description: |
  How to compose screens and flows (recipes) from Design For Humans parts, and how to decide whether a need is a recipe, a token hook or a new library part.

  Trigger immediately for:
  - Authoring or refactoring packages/storybook/stories/recipes/recipe-*.stories.ts.
  - Building a composite screen (header, palette, filters, registry, dashboard) from library parts.
  - Deciding whether a visual need calls for a new class, a token, a utility or a different composition.
---

# Recipe Composition

`docs/PRINCIPLES.md` is the source of truth, and `docs/markup/32-recipes.md` lists the five recipes and the rules they share. Read both first, then each part's own `docs/markup/` section before using it.

## 1. A recipe adds nothing to the library

A recipe composes atoms, molecules, organisms, layout primitives and utilities. When something looks missing, work down this list and stop at the first answer that fits:

1. **Another part already does it.** Search `docs/markup/` and `packages/css/src/` before writing markup. For example, a group of options is a combobox list (§28), a set of related actions is a button group (§14), a row of figures is telemetry (§30), and a drawer is `.dialog--drawer` (§2).
2. **An axis modifier sets it** (PRINCIPLES §2): size, prominence, intent, density (`--compact` or `.ui-compact`) or presentation (`hide-labels`). Set one axis per class. Never fuse two.
3. **A container sets it for its children** with a flag such as `--button-prominence: plain`, or a set class such as `.buttons-sm`.
4. **A token hook sets it:** `--value`, `--skeleton-width`, `--avatar-bg`, `--dialog-width` and the component tokens in §N. These are the only inline styles allowed.
5. **A layout primitive or utility places it** (§22, §19, §36). Use one primitive per row or column, not nested flex wrappers.
6. **Only then is it a library gap.** Log it in `docs/HANDOVER.md` for the component's pass. Never patch it in the recipe. Cadence's `deck.css` is the single exception, and it ships nowhere.

## 2. States are stories

- Write one story per state, with static markup: default, empty, loading, error, selected, open.
- Open dialogs and popovers in `play` (`showModal()`, `showPopover()`).
- Write no demo scripts that toggle classes. A script belongs in a recipe only when the product would ship it, such as the command palette's filtering.
- Hide with `hidden`, not `display: none`.

## 3. Accessibility checks

- **Names:** every icon button has an `sr-only` name; every region that scrolls is focusable and labelled; every `role="group"` or `radiogroup` is labelled.
- **Native first:** use native elements before any ARIA:
  - a modal is `<dialog>` with `showModal()` and `commandfor` / `command`;
  - a floating layer is `popover`;
  - a joined set of choices is native radios in a button group (§14 C);
  - navigation is links with `aria-current`.
- **No menu or toolbar roles.** The library ships no arrow-key script.
- **Never colour alone:** a status carries text or an icon, and a meter sets its thresholds and carries a name.
- **Announcements:** counts and loading messages go in a `role="status"` line. A loading region is `aria-busy`, and its skeletons are `aria-hidden`.
- **Forms:** errors go in a summary banner, plus `aria-invalid`, `aria-describedby` and a `field__error` on each field.

## 4. Typography and density

Organism hooks (`card__title`, `empty-state__title`, …) set layout only. Size comes from a text atom on the same element (`class="card__title small-heading"`). A container that steps down sets `--ui-sizing: compact` through `--compact` or `.ui-compact`, never through per-element size classes.

## 5. Narrow screens

Check every recipe at 390px. Wide-screen navigation hides (`max-md:hide`, or `@max-3xl:hide` inside a container), and the same navigation opens in a `.dialog--drawer.dialog--start`. Labels collapse with `hide-labels`, never by deleting the text. The page itself never scrolls sideways; tables scroll inside their focusable `.table-container`.

## 6. Verify

Build Storybook, then run axe on every recipe story in light and dark and take screenshots at 390px and 1280px. Update §32 when you add, rename or remove a story.
