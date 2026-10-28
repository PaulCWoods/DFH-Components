# Divider: usage inventory

Covers the divider atom (`atoms/divider.css`) and the separators that organisms and molecules draw for themselves: `.menu__separator`, `.batch-actions__separator`, `.combobox__separator` and the button group's divider. Prose draws its own `hr` and gets its own pass; `card--ruled` and `menu--ruled` (CSS `rule`) are borders of their containers, not dividers.

Counts are class attributes in Storybook stories, the docs site, AGENTS.md and the blog templates.

## The CSS

| File | What |
| :--- | :--- |
| `atoms/divider.css` (105 lines) | `:where(hr, .divider)`: a top border; vertical under `@container style(--direction: row)`, `.divider--vertical` or `[aria-orientation="vertical"]`; modifiers `--dashed`, `--dotted`, `--sm`, `--md`, `--lg`, `--strong`, `--subtle`, `--quiet`, `--accent` |
| `organisms/menu.css` | `.menu__separator, .menu > hr.divider`: its own border, bleeding to the menu's edges |
| `molecules/batch-actions.css` | `.batch-actions__separator`: a 1px × 1.25rem background bar at 35% opacity |
| `organisms/combobox.css` | `.combobox__separator`: a 1px background bar |
| `molecules/button-group.css` | Sets `--direction: row` and overrides `--divider-width` and `--divider-color` |
| `tokens` | Tier 3 `divider.width`, `divider.color`; Tier 2 `rule.width`, `rule.color`, `rule.style` |

`--direction` is set by `.inline` (row), `.inline-responsive` and `.stack` (column), `.button-group`, `.field` and `.form`. Only the divider reads it.

## Usage

| Class | Stories | Docs | AGENTS | Blog |
| :--- | ---: | ---: | ---: | ---: |
| `.divider` | 76 | 1 | 7 | 21 |
| `.divider--subtle` | 0 | 0 | 0 | 4 |
| `.divider--dashed`, `--dotted`, `--strong`, `--accent` | 0 | 0 | 0 | 1 each (overview page) |
| `.divider--md` | 0 | 0 | 0 | 2 (overview page) |
| `.divider--vertical`, `--sm`, `--lg`, `--quiet` | 0 | 0 | 0 | 0 |
| `aria-orientation="vertical"` | 0 | 0 | 0 | 0 |
| `.menu__separator` | 11 | 0 | 5 | 2 |
| `.batch-actions__separator` | 8 | 0 | 2 | 6 |
| `.combobox__separator` | 1 | 0 | 0 | 0 |
| Bare `<hr>` (no class) | 3 | 0 | 0 | 3 |

## Measurements

Rendered size and contrast against the page background:

| Case | Size | Light | Dark |
| :--- | :--- | ---: | ---: |
| `.divider` in a block | full width × 1px | 1.62 | 2.55 |
| `.divider` between items in `.inline` | 1px × item height | 1.62 | 2.55 |
| **`.divider` inside a card that sits in `.inline`** | **1px × 0 (invisible)** | – | – |
| **`.divider` between items in `.cluster`** | **50px × 1px (horizontal)** | 1.62 | 2.55 |
| `.batch-actions__separator` | 1px × 20px | **1.17** | **1.37** |
| `.menu__separator` | menu width × 1px | 1.62 | 2.55 |
| A divider in `--border-color-control` | | 3.39 | 6.79 |

## Problems found

1. **Orientation leaks.** `--direction` is an ordinary custom property, so it inherits. A divider anywhere inside a row (inside a card inside an `.inline`, say) turns vertical. In a block it then collapses to 1px × 0 and disappears.
2. **Rows that don't say they're rows.** `.cluster`, `.split` and toolbars don't set `--direction`, so a divider between their items lies flat (50px wide in the test).
3. **Bare `hr` is styled.** The selector is `:where(hr, .divider)`. Every other atom is now class-only, and the reset gives bare elements their browser rendering.
4. **Four separators.** Menu, batch actions and combobox each draw their own, with their own colour, size and opacity. The batch actions one is 1.17:1 against the page because of `opacity: 0.35`, and uses a fixed `1.25rem` height. AGENTS also shows `<hr class="menu__separator">` directly inside `<menu>`, which only allows `<li>` children.
5. **The modifiers aren't axes.**
   - `--strong`, `--subtle` and `--quiet` are prominence, but `--subtle` and `--quiet` are the same as the default.
   - `--accent` is an intent on something that has no status.
   - `--sm`, `--md` and `--lg` set the line's thickness, not a size.
   - `--dashed` and `--dotted` are a look.
   - Only the blog overview page uses any of them.
6. **Contrast depends on the job.** The default rule is 1.62:1 (light), well under 3:1. That is fine for a decorative rule, where spacing or headings already separate the groups. It is not enough where the rule is the only thing marking a boundary (PRINCIPLES §4).
7. **Token rules broken.**
   - A hex fallback (`#008076`).
   - Three-deep alias ladders: `--divider-border-width` → `--divider-width` → `--rule-width`.
   - Literal thickness fallbacks.
   - The high-contrast rule reads the alias chain and clamps to `1.5px`.
8. **Orientation isn't announced.** An `<hr>` is a separator, horizontal by default. When CSS turns it vertical, assistive technology still reports horizontal. Most screen readers don't voice orientation, but `aria-orientation="vertical"` is the correct markup and costs nothing.

What already works:
- `margin: 0`, so spacing comes from the parent's gap;
- logical borders, so a vertical rule sits on the inline-start side in right-to-left text too;
- forced colours draw borders in system colours without a rule;
- `prefers-contrast: more` strengthens it.

## Questions

1. **Orientation.** Make the divider follow its *parent* only:
   - Register `--direction` with `inherits: false`. A style query then sees the direct parent's own value, so nothing leaks past one level.
   - Row layouts (`.inline`, `.cluster`, `.button-group`, toolbars, `.batch-actions`) set `--direction: row`.
   - `aria-orientation="vertical"` on the `hr` forces vertical anywhere, and is also what assistive technology hears.
   - `.divider--vertical` goes (no uses).

   *Recommended: yes.*
2. **Prominence.** Default is the quiet rule (decorative, about 1.6:1). `--strong` uses the control border colour (3.39:1 light, 6.79:1 dark), for when the rule is the only separation cue. Remove `--subtle`, `--quiet`, `--accent`, `--sm`, `--md`, `--lg`, `--dashed` and `--dotted`; a theme can still set `--divider-width`, `--divider-color` and `--divider-style`. *Recommended: yes.* The alternative is keeping `--dashed` as a style, for editorial use.
3. **One separator.** Menus, batch actions and comboboxes use `.divider` itself. The organism only places it (bleed to its edges, vertical height), so colour, width and contrast come from one place. `.menu__separator`, `.batch-actions__separator` and `.combobox__separator` are removed. In a menu or list, the markup is `<li role="separator" class="divider"></li>`, which is valid inside `<menu>` and `<ul>`. *Recommended: yes.*
4. **Bare `hr`.** Class-only like the other atoms. The reset gives a bare `hr` a quiet 1px rule in the text colour's border tone, the way bare links got an underline: legible without a class. `.prose` keeps styling its own. *Recommended: yes.*

### Fixes that need no decision

- Remove the hex fallback, the alias ladders and the literal fallbacks; read `--divider-width`, `--divider-color` and `--divider-style` (Tier 3), which alias the Tier 2 `rule` tokens.
- `prefers-contrast: more`: switch to the strong colour rather than thickening.
- Batch actions separator: no opacity; height from the bar's controls, not `1.25rem`.
- Button group: set `--direction: row` only (stop overriding the divider's tokens).
- Stories: rebuild the Divider stories around orientation, prominence and the organisms that place it; add the nested-row case as a regression check.
- AGENTS §15 and the menu, batch actions and popover examples: new markup.
- Blog: port, update the overview page's divider section and its uses of the removed modifiers.

## Migration done

Decisions: orientation follows the direct parent; prominence default and `--strong`, plus `--dashed` kept as a style; one `.divider` for every separator; bare `hr` styled by the reset.

### Changes

- **`atoms/divider.css`** rewritten:
  - `--direction` is registered with `inherits: false`, so the style query sees only the parent's own value.
  - Vertical under a row parent or `[aria-orientation="vertical"]`.
  - `--strong` uses `--divider-strong-color` (`--border-color-control`).
  - `--dashed` sets the style.
  - Increased contrast switches every divider to the strong colour.
  - `color: inherit`, so the strong colour mixes from the text colour, not the `hr`'s browser grey.
- **Removed:** `.divider--vertical`, `--subtle`, `--quiet`, `--accent`, `--dotted`, `--sm`, `--md`, `--lg`, the `--divider-border-*` aliases, the hex fallback and the `:where(hr)` selector.
- **Row parents:** `.cluster` and `.batch-actions` now set `--direction: row` (`.inline` and `.button-group` already did). The button group no longer overrides the divider's width and colour, so its divider is the quiet default.
- **Organisms place the divider:**
  - menu: `.menu > .divider` bleeds to the edges, and `menu--ruled` hides it;
  - combobox: `.combobox__listbox > .divider` gets margins;
  - batch actions: nothing, it stretches to the bar's height.
  - `.menu__separator`, `.batch-actions__separator` and `.combobox__separator` are removed. The menu's `li` reset skips `.divider`, which would otherwise be `display: contents`.
- **Markup migrated:**
  - 18 menu separators → `<li role="separator" class="divider"></li>`;
  - 16 batch actions separators → `<hr class="divider" aria-hidden="true" />`;
  - the combobox separator → `<li role="none" class="divider"></li>`;
  - `divider--subtle` → `divider`.
- **Tokens:** Tier 3 `divider` has `width`, `style`, `color` (aliasing Tier 2 `rule`) and `strong-color`. `button-group.divider-*` removed.
- **Reset:** `hr:not([class])` gets a quiet 1px rule with `margin-block: 1em`.
- **AGENTS:** §15 rewritten; vertical dividers in the §14 and §17 examples take `aria-orientation="vertical"`; batch actions and menu recipe text updated; legacy row added.
- **Stories:** Divider rebuilt as Playground, Prominence, Orientation (with the card-in-a-row regression case) and InOrganisms.
- **Blog:**
  - `_divider.scss` regenerated;
  - menu, combobox, batch actions, button group and cluster edited to match;
  - Tier 3 divider tokens added;
  - reset rule added;
  - the overview's divider section updated: aria-orientation added, dotted and accent examples removed.

### Measurements after

| Case | Size | Light | Dark |
| :--- | :--- | ---: | ---: |
| `.divider` in a block | full width × 1px | 1.62 | 2.55 |
| In `.inline` / `.cluster` | 1px × item height | 1.62 | 2.55 |
| Inside a card that sits in `.inline` | full width × 1px | 1.62 | 2.55 |
| `.divider--strong` | | 3.39 | 6.79 |
| In batch actions | 1px × bar height | 1.62 | 2.55 |

### Checks

- Axe: the Divider stories are clean, light and dark.
- Existing failures in the menu, combobox and batch actions stories are older and unrelated to dividers: `menuitem` without a `menu` parent, `role="toolbar"` on `aside` and `footer`, and a combobox missing `aria-expanded`. They are logged in HANDOVER.
- The docs site builds and the blog compiles.
