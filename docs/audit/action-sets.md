# Action sets: button group, batch actions and menu

Covers the components that hold a set of actions:
- the button group (`.button-group`), a set of related buttons in a row, optionally joined;
- the batch-actions bar (`.batch-actions`), the controls that appear when several items are selected;
- the menu (`.menu`), a list of actions, usually in a popover.

All three hold buttons, and they overlap: a stacked button group with headings is a menu, a menu item restyles a button, and the batch-actions bar wraps a button group. The question for this pass is what each one owns once the button does its own job.

Counts cover Storybook stories, the docs site, `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome 156.

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `molecules/button-group.css` | 272 | `.button-group`; `--compact`, `--dense`, `--tight`, `--round`, `--stacked`, `--ruled`, `--stretch`, `--center`, `--justify-center`, `--justify-end`, `--space-between`, `--fill-items`; parts `__content`, `__end`, `__fill`; a rule that reaches into `.card__body--flush` |
| `molecules/batch-actions.css` | 213 | `.batch-actions`; `--docked`, `--inline`, `--contrast`, `--compact`, `--round`, `--flush`, `--plain`, `--scrollable`; parts `__summary`, `__actions`, `__dismiss`; `[data-state="closed"]` |
| `organisms/menu.css` | 339 | `.menu`; `--compact`, `--translucent`, `--ruled`, `--plain`, `--submenu`; parts `__item`, `__item--destructive`, `__text`, `__heading`, `__label`, `__content`; also styles `.button` and `.button--danger` placed in a menu |

Tier 3: `button-group.*` (1 token), `batch-actions.*` (12), `menu.*` (17). The CSS reads about 30 more names with no token (`--button-group-sm-gap`, `--menu-item-font-family`, `--menu-destructive-hover-bg`, and others).

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.button-group` | 76 | 19 |
| `--tight` | 14 | 4 |
| `--stretch`, `--fill-items` | 12, 1 | 1, 0 |
| `--center`, `--justify-end`, `--space-between` | 11 (9 in deck), 6 (all dialog), 1 | 0 |
| `--stacked`, `--ruled` | 9, 5 | 2, 0 |
| `--sm`, `--segmented` (no CSS) | 2, 1 | 0 |
| `__content`, `__end`, `__fill` | 14, 5, 4 | 5, 1, 0 |
| `.batch-actions` | 9 | 5 |
| `--docked`, `--inline`, `--contrast`, `--compact`, `--flush` | 2, 2, 1, 1, 0 | 1, 1, 1, 2, 1 |
| `.menu` | 20 | 3 |
| `.menu__item`, `--destructive`, `__text` | 57, 14, 18 | 8, 2, 8 |
| `--translucent`, `--compact`, `--ruled` | 10, 3, 1 | 1, 1, 1 |
| `__heading`, `__content`, `__label`, `--submenu` | 13, 1, 0, 0 | 2, 0, 0, 0 |
| `role="menuitem"`, `menuitemcheckbox` | 49, 3 | 8, 0 |
| `role="none"` (on menu `<li>`s) | 60 | 8 |
| `role="menu"` | 3 | 0 |
| `aria-haspopup="menu"` | 8 | 1 |
| `role="toolbar"` (on `<div>`, `<aside>`, `<footer>`) | 19, 10, 1 | |

## Measurements and checks

- **Joined groups lose their frame.** `--tight` sets `border: 0` on every button. With default (outline) buttons, the group renders as three words with no edges; only the active one shows.
- **Stacked groups align unevenly.** A button with an icon or a trailing shortcut aligns to the start; one with only a label is centred.
- **Menu items are 33 to 36px tall** at 13.3px, set by the menu itself. PRINCIPLES asks for 48px targets on touch unless the product opts into fine pointers; buttons already do this, menu items don't.
- **Axe** flags every menu story: `role="menuitem"` (49) sits in a `<menu>` with no `role="menu"`, so it has no valid parent. Only 3 menus have `role="menu"`, and none has the arrow-key handling that role promises.
- **`role="toolbar"`** is on 10 `<aside>` and 1 `<footer>`, which don't allow it (axe), and on 19 `<div>`s. A toolbar promises one tab stop with arrow keys between its controls. The library ships no script, so none of them does that.
- **`rule`** (gap decorations) works in Chrome 156, so `--ruled` draws. Other browsers show the group without rules.

## Problems found

### Button group
- **Alignment modifiers** (`--center`, `--justify-center`, `--justify-end`, `--space-between`, `--stretch`) repeat the flex utilities and the cluster primitive. They also set `inline-size: stretch` and even `block-size`.
- **Two names for density** (`--compact`, `--dense`), and the query still reads the legacy `--ui-density: dense`. `--sm` and `--segmented` appear in markup with no CSS.
- **`--tight`** names a gap, but what it makes is a joined group. It strips the borders, so outline buttons lose their frame.
- **`--stacked` is half a menu.** It aligns icon rows to the start, pushes shortcuts and badges to the end, pads headings (`__content` as `h3`), and reaches into `.card__body--flush`. The markup example even gives it `role="listbox"` with `role="option"` buttons.
- **`__content`** sets font family, size and weight, which the composition law forbids. `__fill` and `__end` both push things apart.
- **Tokens.** Fallbacks reach Tier 1 (`--spacing-4`, `--spacing-16`, `--typography-*`).

### Menu
- **Roles.** Menu-item roles without a menu fail axe. A real ARIA menu needs a script for arrow keys, typeahead and focus return, and the library ships none.
- **Items restyle buttons.** `.menu__item` rebuilds a button (padding, type, hover, focus, disabled), and the menu also restyles `.button` placed inside it. Items miss the button's target sizes, density and intent.
- **Surface.** The menu always draws a border and shadow, even in flow. `--plain` turns them off. There is no prominence axis or flag, so a popover can't raise it the way it raises a card.
- **Tier.** It's in `organisms/`, but it is a list of buttons with headings and dividers: a molecule, like card.
- **Leftovers:** `__label` (alias of `__heading`, 0 uses), `__content` (1), `--submenu` (0; a submenu is a popover anchored to an item), and the `--menu-density` and `--ui-density` queries.
- **Typography** is set on items and headings (`--menu-item-font-*`), not taken from text atoms.

### Batch actions
- **Role.** `role="toolbar"` on `<aside>` and `<footer>` is invalid, and a toolbar without arrow-key handling misleads screen-reader users.
- **Summary.** A badge showing "3" sits next to the text "3 items selected". The badge pass made badges counts attached to a control, and here the count is said twice. Nothing announces it when the selection changes.
- **Prominence.** `--contrast` is the inverted, strong form. `--flush` and `--plain` differ only in padding.
- **State.** `[data-state="closed"]` duplicates `[hidden]`, and the exit uses `visibility` rather than the discrete-transition pattern the banner dock and toast now use.
- **Tokens.** Hex and `rgba()` fallbacks (4), a three-layer `rgba()` shadow fallback, Tier 1 reaches, and `--layer-floating` (undefined).

## Where each one ends

- A **button group** is a set of related buttons laid out together: a row by default, or a column. It may join them into one control (a segmented switcher). It doesn't align itself on the page; the layout around it does.
- A **menu** is a list of actions, usually opened from a button in a popover: buttons and links in rows, with optional headings and dividers. Its items are buttons; the menu decides their layout, not their look.
- A **batch-actions bar** appears while items are selected. It says how many, and offers actions on them and a way to clear the selection. It is a placement and a frame around a summary and a button group.

## Questions

1. **Button group: no page alignment.** Remove `--center`, `--justify-center`, `--justify-end`, `--space-between` and `--stretch`. Groups align with `.cluster` or the `justify-*` utilities on their container. One width option stays: `--fill`, where the group fills its container and the buttons share the width (replaces `--stretch` and `--fill-items`). The 6 dialog footers and 9 deck groups migrate by script. *Recommended: yes.*

2. **Joined groups.** Rename `--tight` to `--joined`. A joined group keeps every button's border, overlaps the shared edges so no line doubles, rounds only the outer corners (pill ends under `--button-corners: round`), and lifts the focused button so its ring shows in full. A set of mutually exclusive choices is radio inputs inside the buttons (`.button:has(input[type=radio])`, which button already supports); toggles use `aria-pressed`. *Recommended: yes.*

3. **Orientation.** Rename `--stacked` to `--vertical`, matching the tab list. A vertical group stacks full-width buttons with their content centred, as any button. Start-aligned rows with headings and shortcuts are a menu (question 6). `--ruled` stays, drawn with gap decorations where supported. *Recommended: yes.*

4. **Button group parts and density.** Remove `__content` (text in a group is a text atom) and `__fill`. Keep `__end`, which pushes what follows to the end. `--compact` is the one density modifier (sets `--ui-sizing: compact`); `--dense` and the `--ui-density` query go. `--sm` (2 uses) becomes `.buttons-sm`; `--segmented` becomes `--joined`. A group whose buttons share a purpose takes `role="group"` and a label. *Recommended: yes.*

5. **Menu roles.** Choose one:
   - **(a)** A menu is a list of buttons and links, with no menu roles. Tab moves through it; the popover provides Escape and light dismiss. Checkable items are buttons with `aria-pressed` or checkbox inputs. `role="menu"`, `menuitem*`, `role="none"` and `aria-haspopup="menu"` go (about 120 attributes, by script).
   - **(b)** A full ARIA menu (`role="menu"`, arrow keys, typeahead, focus management), with the library documenting the script a product must supply.

   *Recommended: (a).* PRINCIPLES puts native elements first and makes JavaScript an enhancement. An ARIA menu without its script is worse than a plain list, and that is what every menu has today.

6. **Menu items are buttons.** `.menu__item` goes; items are `.button` (or a link with `.button`). The menu sets `--button-prominence: plain`, makes them full width with their content at the start, and pushes a trailing shortcut, badge or status to the end. `--destructive` becomes `.button--danger`; `__text` goes. Items take the button's target sizes (48px on touch, 32px compact or fine), density and focus ring. The stacked group's menu rules and its reach into `.card__body--flush` move here. The 65 items migrate by script. *Recommended: yes.*

7. **Menu surface on the shared axis.** Map it as card does: default (surface and border, no shadow), `--strong` (raised, with a shadow; a popover sets `--menu-prominence: strong`), `--subtle` (tint, no border), `--plain` (no surface, for a menu inside a card or sidebar). `--translucent` stays as the material, and `--ruled` and `--compact` stay. Flag: `--menu-prominence`. *Recommended: yes.*

8. **Menu structure and tier.** Move menu to `molecules/`. Markup: a `<menu class="menu" aria-label="…">` (a list), each item in an `<li>`, a heading in an `<li>` as `.menu__heading` with a text atom, a divider as `<li role="separator" class="divider">`. Remove `__label`, `__content`, `--submenu` and the item typography tokens. *Recommended: yes.*

9. **Batch-actions role and summary.** The bar is a `<div role="group" aria-label="…">`, not a toolbar, since it has no arrow-key handling. A product that adds roving focus may use `role="toolbar"`. The summary is text ("3 selected") in an element with `role="status"`, so changes to the count are announced; the count badge goes. *Recommended: yes.*

10. **Batch-actions prominence and placement.** Placements stay: floating (default, fixed at the bottom centre), `--docked` (sticks to the bottom of its container), `--inline` (in flow). Prominence on the shared axis: default (layer surface, border; shadow when floating), `--strong` (inverted, replaces `--contrast`), `--plain` (no surface; replaces `--flush` and `--plain`). `--round`, `--compact` stay; `--scrollable` (0 uses) goes. *(Reinstated in review: `--scrollable` keeps one row, the summary and dismiss fixed and the actions scrolling with the shared scroll fade. See §18b C.)* Hiding is `hidden` only, with the discrete-transition exit used by the banner dock; `data-state` goes. Literal fallbacks go. *Recommended: yes.*

All approved as recommended, with (a) for question 5.

## Migration done

### CSS and tokens
- **Button group** (`molecules/button-group.css`, 272 → 158 lines):
  - `--joined`, `--vertical`, `--fill`, `--ruled` and `--compact`, plus `__end`;
  - a joined group keeps every border, overlaps the shared edges, rounds the outer corners (pill ends from `--button-corners: round`, in either orientation) and lifts the hovered, selected or focused button;
  - the group is block-level flex, so a `justify-*` utility on it aligns its buttons.
- **Menu** moved to `molecules/menu.css` (339 → 203 lines):
  - prominence on the shared axis, with a `--menu-prominence` flag; the popover sets `strong`, as it does for card;
  - items are `.button` in `<li>`, and the menu sets `--button-prominence: plain`, full width and start alignment;
  - a check (`.icon--on`) keeps its space while off;
  - headings are `<li class="menu__heading">` with a text atom;
  - type is fixed, like card.
- **Batch actions** (213 → 181 lines):
  - floating by default, with `--docked` and `--inline`;
  - prominence `--strong` and `--plain`, plus `--round` and `--compact`;
  - hidden with `[hidden]` using the discrete exit, with `@starting-style` for entry;
  - no literal colour or shadow fallbacks;
  - `__actions` takes the free space, so the dismiss button and its divider sit at the end.
- **Tokens:**
  - `button-group.*` (5: gap, compact gap, rule);
  - `batch-actions.*` (18, adding strong, compact and z-index);
  - `menu.*` (16: the card-like surface set, heading colour, rule, translucency);
  - the item typography, size and divider tokens went.

### Found while testing
- **Pressed toggles didn't look pressed.** `aria-pressed="true"` only switched icons, so a joined Bold/Italic group showed no state. A pressed button now renders as selected, like `.is-active` and `:checked`, unless it carries its own `.icon--on` check (as menu items do). Changed in `atoms/button.css` and noted in §1.
- **Command palette** (recipe and §32) was a stacked button group with `role="listbox"`. It now uses the menu's list structure (`<menu role="listbox" class="menu menu--plain menu--ruled">`, options in `<li role="none">`). The listbox role stays because its script supplies arrow keys and `aria-activedescendant`. The filter script was updated to hide list items and find `.menu__heading`.
- **The migration script dropped repeated tokens** inside `${…}` class expressions. Two stories failed to index; both were restored from git and checked with esbuild.
- **Leftovers fixed:**
  - the app-header notifications "Mark all read" still looked for `.card__content`;
  - the tally-sprout fee status still used `badge--*` intents on a `.status`.

### Markup
- **Script migration** (`scratchpad/as/migrate.py`), run on the stories, docs site, markup docs, recipe skill and blog overview:
  - renamed `--tight`/`--segmented` → `--joined`, `--stacked` → `--vertical`, `--stretch`/`--fill-items` → `--fill`, `--sm` → `.buttons-sm`;
  - `.menu__item` → `.button`, `--destructive` → `.button--danger`;
  - `role="menuitemcheckbox" aria-checked` → `aria-pressed`;
  - removed `role="menu"`, `menuitem`, `role="none"` on items and `aria-haspopup="menu"`;
  - `<header class="menu__heading">` → `<li class="menu__heading">` with a heading.
- **By hand:**
  - dialog footers use `.card__footer.justify-end`;
  - deck transports lost `--center`;
  - `role="toolbar"` became `role="group"` (deck, cadence, tooltip, divider);
  - pairs of separate actions that had been "tight" are plain groups;
  - batch-actions markup was rewritten everywhere (stories, divider story, tally-sprout and its script, blog);
  - the app-header notifications became a plain menu.
- **Rewritten:** stories for button group, menu (moved to Molecules) and batch actions; §3b, §14 and §18b. §15, §17, §32 and the recipe-composition skill were updated.
- **AGENTS:** a legacy row; the "Menus & Action Sets" rule; menu in the fixed type list; table titles.
- **PRINCIPLES:** menu, button group and batch actions are molecules; two new decision rows (menu roles, and what each one owns).

### Checks
- Chrome 156:
  - joined groups in rows, columns, round, compact and right-to-left;
  - menus at each prominence, in a popover, compact and translucent, with checkable items and in right-to-left;
  - batch actions floating, inline at each prominence, and docked.
- Axe passed on the 15 action-set stories in light and dark. One finding (accent status text on the subtle menu's tint, 4.38:1) is the known palette issue; the story now uses a neutral status.
- The blog compiles; its overview has new Button Group, Menu and Batch Actions sections.

### Left for later
- **Accent and warning text on tints** fail 4.5:1 (palette pass).
- **Combobox and the command palette:** group labels inside a listbox are presentational list items, not `role="group"` with a label. This belongs to the combobox pass.
