# Table

Covers `.table`, its scroll wrapper `.table-container`, the cell and column helpers, and the sort button. The remaining organisms (accordion, combobox, empty state, header) each get their own pass after this one, because they share no job. Table goes first: it is the largest, and prose now reads its tokens.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome 156 against `packages/css/src/index.css`.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `organisms/table.css` | 746 | Scroll container; base table with type, rules and head tint; 30 cell and column helper classes (with synonyms); striped, hover, compact, small, bordered, simple and fixed modifiers; sticky head, foot, first and last column with scroll-state shadows; the sort button; a rule that reaches into a flush card body; contrast and motion preferences. |

Tier 3: `table.*`, 29 tokens. Nine are typography (`font-*`, `head-font-*`, `header-cell-font-weight`). The column widths (`--table-col-*-width`) are read in the CSS but are not tokens, so they always use the literal fallbacks.

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.table` | 67 (13 files, mostly the table stories and recipes) | 18 (overview only) |
| `.table-container` | 35 | 10 |
| `--striped` / `--zebra` | 18 / 1 | 2 / 0 |
| `--hover` | 16 | 2 |
| `--compact` / `--sm` | 7 / 2 | 2 / 0 |
| `--bordered` / `--simple` | 3 / 2 | 2 / 1 |
| `--flush` (no CSS) | 2 | 0 |
| `--sticky-head` / `--sticky-header` | 7 / 3 | 2 / 0 |
| `--sticky-foot` / `--sticky-footer` | 2 / 1 | 2 / 0 |
| `--sticky-first-column` / `--sticky-last-column` | 5 / 2 | 1 / 2 |
| `.table__caption` | 11 | 9 |
| `.table__cell--numeric` / `.table__col--num` / `.table__col--numeric` | 96 / 17 / 1 | 62 / 0 / 0 |
| `.table__cell--center` / `.table__col--center` | 19 / 12 | 5 / 0 |
| `.table__cell--fit` / `.table__col--fit` | 40 / 33 | 5 / 0 |
| `.table__cell--long` | 10 | 16 |
| `.table__col--index`, `--xs`…`--xl`, `--actions`, `--fill` | 56 | 0 |
| `.table__sort-button` | 3 | 2 |
| Unused: `--fixed`, `--sticky-1st-column`, `--head-cells-long`, `__caption--bottom`, `__cell--start`, `--truncate`, `--nowrap`, `__col--auto`, `__col--expand`, `__col--counter`, `__cell--xs`…`--lg`, `__cell--index`, `__cell--actions`, `__cell--fill`, the `[data-numeric]`, `[data-center]`, `[data-fit]`, `[data-nowrap]` attributes | 0–1 each | 0 |

The blog's Tier 3 differs from the library: head tint off, `--table-flush-cell-padding: 0px` (outer cells flush), its own `--table-striped-header-bg`.

## Measurements and checks

| | Default | `--compact` | In `.ui-compact` |
| :--- | :--- | :--- | :--- |
| Body row height | 51px | 35px | 28px |
| Cell padding | 12px 16px | 4px 8px | 4px 8px |
| Cell text | 16px | 16px | 13.3px |

- **Compact means two things.** `--compact` shrinks the padding but keeps 16px text; a compact region also steps the text down. `--compact` sets the legacy `--ui-density: dense` flag, not `--ui-sizing: compact`. The compact tokens (4px and 8px) disagree with the CSS fallbacks (8px and 12px), and give 28px rows in a compact region.
- **Sorting is announced wrongly.** `aria-sort` sits on the `<button>`, where it isn't allowed: it belongs on the `<th>`. The examples also give the button an `aria-label` ("Sort by downloads") that replaces the visible name. The sort icon is invisible (`opacity: 0`) until hover or focus, so an unsorted column gives no sign that it sorts. The hover colour reads `--link-hover-color`, which the link pass removed.
- **The caption** is 13.3px, bold and muted: the size of small text and the weight of a heading, with the colour of a hint. It's the table's name.
- **Bordered** draws its outer frame on the `.table-container` through `:has()`, so a bordered table outside a container has no frame.
- **Reaching into the card.** One rule targets `.card__body.card__body--flush:not(:has(.table--bordered, .table--flush))` (specificity above zero) and reads the card's private `--_card-padding`. Card already hands its padding to a flush tab list through a public flag (`--tab-list-inset`); table should do the same.
- **The cell button rule** rewrites a `.button`'s padding inside cells, an organism changing an atom's geometry.
- **Synonyms:** 14 pairs or triples of names for the same thing, plus four data attributes.
- **Dead code:**
  - `container-type: scroll-state` on every sticky cell (its name is never queried);
  - `--table-cell-sticky-translucency` and `--table-row-translucency` in the contrast preference (nothing reads them);
  - `-webkit-overflow-scrolling`.
- **A rule outside `:where()`:** `table:is(.table--sticky-head, …)` has specificity (0,1,1).
- **Type:** text atoms in cells work (`<p class="small-text">` is 13.3px), because the table sets type on itself and cells inherit it. The nine type tokens only copy the body tokens.
- **Axe:** the existing stories fail `landmark-unique`, because two scroll regions share the name "Compact density". Every other failure in them belongs to other components (status contrast).

## Problems found

1. Too many names: synonyms for most modifiers, two class families (`__cell--` and `__col--`) used interchangeably, and data attributes.
2. Compact is inconsistent, uses the legacy density flag, and has a `--sm` size modifier on a container (PRINCIPLES: containers take no size).
3. Sorting puts ARIA on the wrong element, hides the sort cue and reads a removed token.
4. Card coupling through another component's private variable.
5. Type tokens that copy body tokens; a caption that looks like a hint.
6. Dead code and a rule with specificity.

## Where it ends

The table styles the grid: rules, padding, alignment, sticky edges. Cell content is atoms (`.status`, `.button`, `.lockup`, text atoms). Selection, sorting logic and pagination belong to the product: the library ships no script, so it styles the states (`aria-sort`, `aria-selected`) and leaves the behaviour to the page. A narrow screen scrolls the table inside its container; the library doesn't reflow rows into cards.

## Questions

1. **Table stays an organism, `.table-container` stays the scroll wrapper.** A container that can scroll gets `tabindex="0"`, `role="region"` and a unique `aria-label` (or `aria-labelledby` pointing at the caption), so keyboard users can scroll it and screen readers can find it. *Recommended: yes.*

2. **Two class families, one job each.**
   - `.table__cell--*` aligns and wraps cells: `--numeric`, `--center`, `--fit`, `--nowrap`, `--truncate`.
   - `.table__col--*` sizes columns, on a `<col>` or a header cell: `--index`, `--xs`, `--sm`, `--md`, `--lg`, `--xl`, `--actions`, `--fill`.

   Migrate `__col--num`, `__col--numeric`, `__col--center` and `__col--fit` to the cell classes, and `__cell--long` to `__cell--nowrap`. Remove the other synonyms and unused names (the table above) and the data attributes. *Recommended: yes.*

3. **Modifiers on the shared axes, one name each.**
   - Prominence: default (rules between rows, tinted head), `--plain` (replaces `--simple`: no rules, no tint, outer cells flush with the text around the table).
   - `--bordered` stays an option: an outer frame plus column rules. The frame is drawn on the container when there is one, otherwise on the table.
   - Density: `--compact` only. It sets `--ui-sizing: compact`, so cell text and controls step down just as they do in a compact region. Remove `--sm` and the `--ui-density` query.
   - Rows: `--striped`, `--hover`. Sticky: `--sticky-head`, `--sticky-foot`, `--sticky-first-column`, `--sticky-last-column`.
   - Remove `--zebra`, `--sm`, `--simple`, `--fixed`, `--flush` and the long sticky names.

   *Recommended: yes.*

4. **Compact padding.** Set the compact tokens to 8px by 12px (today's CSS fallback). Rows come to 37px with compact text, above the 32px small-control size. *Recommended: yes.*

5. **Type comes from the body tokens.**
   - The table resets to fixed sizing (as now) and takes the body text tokens directly.
   - Head cells are bold in the strong foreground.
   - Remove the nine type tokens.
   - The caption is a layout hook that sets no type. The markup puts a text atom on it (`<caption class="small-heading">`), or `.sr` to hide it.
   - Remove `.table__caption`: the `<caption>` element is the hook.

   *Recommended: yes.*

6. **Hover only where rows do something.** `--hover` stays opt-in, for rows with actions or selection, and keeps highlighting a row whose control has focus (`:focus-within`). Stories stop putting it on read-only tables. *Recommended: yes.*

7. **Sorting.**
   - `aria-sort` goes on the `<th>`. The button's name is its visible text.
   - Every sortable header shows an icon: `ChevronsUpDown` when unsorted, `ChevronDown` when sorted. The icon flips for `aria-sort="ascending"`.
   - The button takes the head colour and underlines on hover and focus, like a plain link. The focus ring stays inset.

   The page's script sets `aria-sort` and swaps the icon. *Recommended: yes.*

8. **Card integration through a flag.**
   - The table pads its outer cells with `--table-inset`, which defaults to the cell padding (0 for `--plain`).
   - A flush card body sets `--table-inset` to its padding, as it already does for tab lists.
   - Remove the rule in `table.css` that targets the card body.

   *Recommended: yes.*

9. **Controls in cells.** Keep the negative block margin that stops a button from making its row taller. Remove the override of the button's padding. Keep `nowrap` on a button group in a cell. *Recommended: yes.*

10. **Clean-up.**
    - Remove `container-type: scroll-state` from sticky cells, the dead contrast variables and `-webkit-overflow-scrolling`.
    - Fold `table:is(…)` into a `:where()` rule.
    - Under `prefers-contrast: more`, stripes and shadows drop, and rules thicken through a real token.

    *Recommended: yes.*

11. **Tokens.**
    - `table.*` goes from 29 to about 22: remove the nine type tokens, and add `inset` and seven column widths (`col-index-width` … `col-actions-width`).
    - Fix the compact values (question 4).
    - The blog drops its own table overrides (no head tint, flush outer cells) and follows the library defaults. Its only tables are on the overview page.

    *Recommended: yes.*

12. **Stories and docs.**
    - Rewrite the 751-line stories file: a playground, then one story each for:
      - prominence and borders;
      - rows;
      - compact;
      - sticky edges;
      - sorting;
      - alignment and columns;
      - cell content;
      - in a card;
      - right to left.
    - Give every scroll region a unique name.
    - Migrate the recipes, the empty-state, lockup, status, batch actions and utility stories, the docs site's token table and button page, and the blog overview.

    *Recommended: yes.*

## Migration done

All recommendations taken.

- **Tokens:**
  - `table.*` is 26 tokens. The nine type tokens and the two caption tokens are gone.
  - `inset` and seven column widths are new.
  - Compact padding is 8px by 12px.
- **CSS:**
  - `organisms/table.css` is rewritten: one name per option, cell and column helpers, pure-map modifiers, a `--table-prominence` flag, and the sort button styled from `aria-sort` on the `<th>`.
  - Card sets `--table-inset` on a flush body, alongside `--tab-list-inset`.
- **Found while verifying:**
  - **Rule colours.** Rules drawn from `currentColor` came out darker under bold header cells. The two rule colours are now registered `<color>` properties, so the table resolves them once.
  - **The sticky corner cell** let scrolling header text show through. A bare `tr` in a nested selector gave the rule specificity, so it beat the scroll-state background.
  - **Sticky columns.** A drop shadow per sticky cell covered the row rules. A scrolled sticky column now casts a sideways shadow only: the inline end of a first column, the inline start of a last, flipped in right to left. The negative spread keeps it off the rows above and below.
  - **Review fix.** An inset line drawn between sticky cells (for whole-pixel rounding on 1x screens) doubled the row rule on high-density screens, so it was removed.
- **Usage migrated:**
  - the recipes (cadence, tally), the status story and the docs site's token table and button page;
  - the blog overview, where sorting moved to the `<th>`, every region got a unique name, the footers got row headers and "Simple" became "Plain".
- **Stories:** rewritten (10 stories). Axe passes in light and dark on them. Across the 43 stories that use tables, the only failures are the warning-status contrast that was already open.
- **Blog:** the table SCSS is regenerated. Tier 3 is replaced with the library values (the blog's head-tint and flush overrides are gone), the table and code-block colours are added to both inverted blocks, and card has the new flag.
