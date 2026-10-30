# Empty State

Covers `.empty-state`: the block shown where content would be when there is none: a search or filter miss, a first-use screen, a cleared queue, a region that failed to load. The third of the remaining organisms, after accordion and combobox; header follows.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome against `packages/css/src/index.css`, at container widths of 16, 32 and 60rem, in light and dark.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `organisms/empty-state.css` | 260 | A centred column that is a size container in `cq` type mode; an icon well (`__visual`, alias `__icon-well`) that enlarges its icon with `scale`; a content group (`__content`, alias `__hgroup`) with a max width; title and description hooks that set colours; an actions row; `--start` (alias `--left`), `--compact`, `--flush`, `--bordered`; status modifiers `--success`, `--warning`, `--error` (alias `--danger`) and the same through `[data-status]`; rules reaching into `.card` and `td`; `--empty-state-density` and `--empty-state-align` flags inside a universal `* { … }` rule; forced-colours and more-contrast borders on the well. |

Tier 3: `empty-state.*`, 17 tokens: padding, gap, max width, 6 for the well and icon, title and description colours, and 6 for the three status wells. The padding and gap read Tier 1 (`spacing.48`, `spacing.24`, `spacing.16`).

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.empty-state` blocks | 25 (stories, 4 recipes, the docs site's command palette) | 6 (overview) |
| `--compact` / `--flush` / `--bordered` / `--start` | 18 / 9 / 3 / 2 | 4 / 1 / 1 / 0 |
| `--success` / `--warning` / `--error` | 3 / 2 / 2 | 2 / 2 / 2 |
| `[data-status]`, `--left`, `--danger`, `__icon-well`, `__hgroup` | 4, 0, 0, 0, 0 | 0 |
| `--empty-state-density` / `--empty-state-align` flags | 2 / 0 | 0 |
| `__visual` / `__content` / `__title` / `__description` / `__actions` | 26 / 27 / 29 / 29 / 18 | 6 / 6 / 6 / 6 / 5 |
| `<section aria-labelledby>` (a region landmark) | most stories and the markup doc | 1 |
| Utilities standing in for the parts (`padding-block-*`, `text-center`, inline sizes, `margin: 0 auto`) | tally-sprout, cadence, filter sidebar, command palette | 3 (the status examples add border, radius, padding and background) |

Not in the CSS but in use: `__icon` (tally-sprout recipe).

## Measurements and checks

| | 16rem | 32rem | 60rem | `--compact` (32rem) | In a card |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Title (`.subheading`) | 19px | 19px | 21px | 20px | 19px |
| Description (`.small-text`) | 13px | 14px | 15px | 14px | 13px |
| Well / icon | 72 / 24px | 72 / 24px | 72 / 24px | 52 / 18px | 72 / 24px |
| Padding | 48 / 24px | 48 / 24px | 48 / 24px | 24 / 16px | 0 (`--flush`) |

- **Its type moves with its width.** The empty state is a `cq` container, so the same title is 19px in a sidebar and 21px in a wide panel, and `--compact` makes it larger (20px), not smaller, because its smaller padding leaves a wider container. Every other molecule is fixed by default and steps down in a compact region.
- **It is a landmark.** The documented markup is `<section aria-labelledby>`, which is a named region. A dashboard with three empty cards gets three extra landmarks, all saying "no data". Several recipes put `aria-labelledby` on a `<div>`, where it does nothing.
- **Nothing is announced.** When a search or filter empties a list, a screen-reader user isn't told; the new block only appears. Nothing in the docs says who should announce it.
- **The well reinvents the icon box.** `.icon-box` (icon pass) already draws a sized, round, tinted box for an icon; the well duplicates it with 6 tokens and its own forced-colours rule. The icon is enlarged with `scale`, a transform, so its layout box stays 16px.
- **Status variants use the old names.** `--error` and `[data-status]` (the inventory and HANDOVER flag both); there are no `--accent` or `--info` intents. Colour isn't the only signal: the icon and the title carry the meaning, which the docs should require.
- **Padding is usually fought.** 9 of 25 blocks use `--flush`, and four recipes add padding utilities, inline padding or `margin: 0 auto` on top. The empty state almost always sits in something that already has padding (a card body, a table cell, a dialog, a page section).
- **Coupling:** `.card .empty-state`, `.card__body:has(> .empty-state:only-child)` (changes the card's padding) and `td > .empty-state`.
- **Dead or duplicate hooks:** `--left`, `--danger`, `__icon-well`, `__hgroup`, `--empty-state-align`; the density flag duplicates `--ui-sizing: compact`.
- **Style queries inside a universal `* { … }` rule**, the pattern removed from the other components.
- **`--bordered`** is a dashed frame with a 40% tint built from `color-mix()` on a token that may be missing. It's the look of a drop zone or a slot waiting for content.
- **Axe:** all 8 empty state stories and the two recipe stories pass in light and dark.

## Problems found

1. Type that grows with the container and a compact mode that enlarges it.
2. A landmark per empty state; no announcement when one appears.
3. A bespoke icon well beside an icon box atom that does the same.
4. Legacy status names and `data-status`; missing intents.
5. Padding that most uses remove; coupling to card and table.
6. Aliases, dead flags, a universal-selector rule, Tier 1 tokens.

## Where it ends

The empty state lays out a visual, a title, a description and actions in a centred (or start-aligned) column. The atoms inside it style themselves: an icon box, text atoms, buttons. What to say, and the announcement, belong to the product.

## Questions

1. **Empty state is a molecule.** Its parts are atoms (icon box, text atoms, buttons) with no molecule required. Move it to `molecules/empty-state.css` and the stories to `Molecules/Empty State`. *Recommended: yes.*

2. **Not a landmark; announced by the product.**
   - The empty state is a `<div>` by default. Use a `<section>` with a heading only when it is the whole content of a page or panel. Remove `aria-labelledby` from the examples.
   - The heading level fits the page outline; the class (`.subheading`, `.small-heading`) sets the size.
   - When a search or filter empties a list, the product puts the news in a `role="status"` element that is already on the page ("No plants match"). The empty state itself isn't a live region: a live region added with its content isn't reliably announced, and a whole block would be read out.

   *Recommended: yes.*

3. **Fixed type, compact steps down.**
   - Drop the `cq` mode and the size container. Text atoms are fixed, as in a card.
   - `--compact` sets `--ui-sizing: compact`, so the text atoms, the icon box and the buttons inside step down, and the gap with them. A compact region (`.ui-compact`) does the same.
   - Remove `--empty-state-density`, and the title colour token (the title inherits). The description keeps a muted colour hook.

   *Recommended: yes.*

4. **The visual is an icon box, or an image.**
   - `__visual` holds an `.icon-box` (or an `<img>` / inline SVG illustration, capped at a max size).
   - The empty state sets the icon box's flags: large, subtle, round, so `<span class="icon-box" aria-hidden="true">` needs no modifiers. Compact steps it to small.
   - The icon is sized with `--icon-size`, not `scale`.
   - Remove `__icon-well`, the well tokens and the well's forced-colours rule (the icon box has its own).

   *Recommended: yes.*

5. **Intent, on the icon box.**
   - Give `.icon-box` the intent axis: `--accent`, `--info`, `--success`, `--warning`, `--danger`, with an `--icon-box-intent` flag, tinting the box and colouring the icon from the semantic surface and foreground tokens. Banner and others can use it too.
   - `.empty-state--success` (and the other intents) set that flag.
   - The icon and title must carry the meaning (1.4.1); the docs say so.
   - Remove `--error`, `--danger` aliasing and `[data-status]`.

   *Recommended: yes.*

6. **Padding and frame.**
   - By default the empty state has no padding of its own: its container (card body, table cell, dialog, section) already has some. Use a `padding-block-*` utility for more room. Remove `--flush`.
   - `--subtle` replaces `--bordered`: a dashed frame (`--rule-style`) with a translucent tint and its own padding, for a slot waiting for content or a drop zone.
   - Remove the card and table rules.

   *Recommended: yes.*

7. **Alignment and parts.**
   - Centred by default; `--start` aligns to the start edge. Remove `--left` and the `--empty-state-align` flag.
   - Parts: `__visual`, `__content` (title and description, with the max width), `__title`, `__description`, `__actions` (a row of buttons, or a `.button-group`). Remove `__hgroup`. Hooks are layout only, under the Organism-Atom law.
   - Remove the universal-selector style queries.

   *Recommended: yes.*

8. **Tokens.** `empty-state.*` keeps `gap`, `content-max-width`, `description-color`, `subtle-padding`, `subtle-bg` and `subtle-border-color`, pointed at semantic tokens. The well, icon, title and status tokens go (icon box tokens and the new icon box intent replace them). That takes it from 17 to 6. *Recommended: yes.*

9. **Content guidance in the docs.**
   - The title says what is empty ("No plants match 'fern'"), the description says why or what to do next, and there is at most one primary action.
   - An error that leaves a region empty can be a `--danger` empty state with a retry button; a page-level error is a banner with `role="alert"`.
   - A first-use state shows the action that fills it.

   *Recommended: yes.*

10. **Stories, docs and the blog.**
    - Rewrite the stories:
      - a playground;
      - search miss;
      - first use;
      - all caught up (success);
      - failed to load with a retry (danger);
      - in a card;
      - in a table row;
      - compact in a sidebar;
      - subtle drop zone;
      - start aligned;
      - right to left.
    - Migrate the recipes (cadence, command palette, tally-sprout, filter sidebar), the docs site's command palette, and `32-recipes.md`.
    - Rewrite `docs/markup/27-empty-state.md`.
    - Blog: migrate the overview's six examples.

    *Recommended: yes.*

## Migration done

All recommendations taken.

- **Tokens:** `empty-state.*` is 7 tokens: `gap`, `compact-gap` (added so compact steps down without a literal), `content-max-width`, `description-color` and three for `--subtle`.
- **Icon box:** `.icon-box` gains the intent axis (`--accent`, `--info`, `--success`, `--warning`, `--danger`, flag `--icon-box-intent`): intent colours the icon and a subtle box takes the intent's tint. A subtle box keeps a transparent outline, which shows in forced colours.
- **CSS:** `molecules/empty-state.css` replaces `organisms/empty-state.css`. No padding or type mode; the visual sets the icon box's flags (large, subtle, round; small when compact) and a 1.5em icon. `--subtle`, `--compact`, `--start` and the intents.
- **Found while verifying:**
  - **`hidden` didn't hide it.** The empty state's `display: flex` beat the browser's rule for `hidden`, and the library has no `[hidden]` reset; `.empty-state[hidden]` now hides.
  - **The icon size reached the buttons.** Setting `--icon-size` on the empty state enlarged button icons; it is set on the visual only.
  - **Table buttons lost their margins' purpose** (reported in review): the table pulls a cell's buttons into the row with negative margins, which also hit an empty state's button in a cell. The rule now applies only to a button directly in a cell, or in a button group, cluster or inline row there.
- **Usage migrated:** the command palette, filter sidebar, cadence, tally-sprout and app header recipes, `32-recipes.md`, and the docs site's command palette (which now announces its result count in a `role="status"` element).
- **Stories:** rewritten as `Molecules/Empty State` (10 stories); the search miss story is live, with its status line. Axe passes on all of them, and on the table and icon stories, in light and dark. The recipes' remaining failures belong to other components (warning status contrast, the skeleton table's empty headers).
- **Blog:** `_empty-state.scss` moved to molecules, `_icon.scss` and `_table.scss` mirrored with `sync:blog`, `_tier3.scss` reduced to the 7 tokens, and the overview's section rewritten (six examples).
