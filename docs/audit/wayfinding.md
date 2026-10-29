# Wayfinding: breadcrumb, navigation tree, pagination and stepper

Covers the components that tell people where they are:
- the breadcrumb (`.breadcrumb`), the trail of pages above this one;
- the navigation tree (`.navigation-tree`), nested links to the sections of a site or page;
- pagination (`.pagination`, with `.page-count`), the pages of one list;
- the stepper (`.stepper`), the steps of one task.

All four mark a current position with `aria-current`, and three of them are lists of links. They overlap with components already refactored: pagination sits on the button group, the navigation tree rebuilds what menu items now get from the button, and a vertical tab list and the tree both mark the current page with a rail. The question for this pass is what each one owns, now that link, button, button group, menu and tab do their own jobs.

Counts cover Storybook stories, the docs site, `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome 156, light and dark.

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `molecules/breadcrumb.css` | 101 | `.breadcrumb`; parts `__list`, `__item`, `__link` (all aliases for bare `ol`, `li`, `a`); `.is-current` |
| `molecules/navigation-tree.css` | 245 | `.navigation-tree` **and** `.nav-tree` for everything; `--ruled`, `--indicator`, `--toc`, `--compact`, `--flush`; parts `__list`, `__item`, `__item--nested`, `__link`, `__text`, `__heading`, `__label` |
| `molecules/pagination.css` | 135 | `.pagination`; `--center`, `--end`, `--between`; `__ellipsis`; `.page-count`, `--center`, `--start`, `--end`; parts `__info`, `__jump` |
| `molecules/stepper.css` | 430 | `.stepper`; `--vertical`, `--inline`, `--compact`; parts `__list`, `__item`, `__step`, `__indicator`, `__indicator-text`, `__content`, `__title`, `__label`, `__description`, `__desc`; `.is-active`, `.is-complete`, `.is-invalid` |

Tier 3: `breadcrumb.*` (4 tokens, one of them a font size) and `pagination.*` (1). Navigation tree, page count and stepper have none, and the CSS reads about 45 names with no token (`--nav-tree-*`, `--stepper-*`, `--page-count-font-*`, `--breadcrumb-current-font-weight`).

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.breadcrumb` | 26 | 7 (2 templates, the overview) |
| `breadcrumb__*` | 0 | 0 |
| `.navigation-tree` | 8 (including the docs site's table of contents) | 0 |
| `nav-tree*` | 1 | 0 |
| `__link`, `__item`, `__text`, `__list` | 27, 26, 26, 12 | 0 |
| `--ruled`, `--indicator`, `--compact`, `--flush` | 6, 5, 3, 2 | 0 |
| `__heading`, `__item--nested` | 2, 1 | 0 |
| `.pagination` | 23 | 9 (3 templates, the overview) |
| `--center`, `--end`, `--between`, `__ellipsis` | 0 | 0 |
| `.page-count`, `__info`, `__jump` | 10, 7, 6 | 2, 2, 2 (overview only) |
| `.stepper` | 17 | 6 |
| `__step`, `__indicator`, `__title`, `__item` | 39, 40, 39, 42 | 8 each |
| `__content`, `__description`, `__list` | 23, 23, 13 | 4, 4, 2 |
| `--vertical`, `--compact`, `--inline` | 4, 5, 0 | 0, 2, 0 |
| `aria-current="step"` / `.is-active` on steps | 18 / 14 | 2 / 2 |
| `.is-complete`, `.is-invalid` | 14, 1 | 3, 0 |

## Measurements and checks

- **Breadcrumb links are 21px tall** at 13.3px. They pass WCAG 2.5.8 by spacing (24px circles don't overlap), not by size. The current page is bold, so the trail shifts width when the current page changes.
- **Navigation-tree rows are 38px**, and 28px compact. PRINCIPLES asks for 48px on touch (32px with fine-pointer targets); buttons and menu items already meet it.
- **The current tree item** is accent-coloured, semibold and tinted, with a rail only under `--indicator`. A vertical tab list marks its current tab with a rail too, drawn differently.
- **Pagination buttons are 48px squares**, from the button. The current page is `.is-active` *and* `aria-current="page"`. The blog does the same, and its loop renders every page with no gap marker.
- **Pagination truncation** is an `<hr class="divider">`, a separator, so a screen reader announces a separator where the skipped pages are.
- **Stepper indicators** are 36px circles: success fill for complete, accent ring for current, danger ring for invalid, a quiet ring for upcoming. The indicator is `aria-hidden`, so the state reaches screen readers only if the author writes it into the description. Most stories write "Completed", but the compact stepper and narrow containers (below 34rem) hide the descriptions, and with them the only state text.
- **Interactive steps** reach into the button's private variables (`--_button-bg`, `--_button-min-size: 0` and others), although `.stepper__step` is not a `.button`.

## Problems found

### Breadcrumb
- **Type** is set by the molecule (`font-size` from a Tier 1 step, `font-family`, a bold current page), which the composition law forbids.
- **Links** are restyled from the inside: colour, underline and hover are reset on every `a`, and the CSS still sets `--link-hover-color`, a flag the link pass removed.
- **Aliases** `__list`, `__item`, `__link` and `.is-current` have no uses.

### Navigation tree
- **Two names.** Every rule is written for `.navigation-tree` and `.nav-tree`. PRINCIPLES names this pair as an alias to remove.
- **Rows rebuild a button**, as menu items did: padding, hover, focus, current state and type (`font-weight`), all below the target sizes.
- **Current state** depends on a modifier: `--indicator` (alias `--toc`) adds the rail, and without it the current item is a tint.
- **Leftovers:** `--flush` resets padding that is already zero; `__label` aliases `__heading`; `__item--nested` fakes depth in a flat list (the docs site's table of contents).

### Pagination and page count
- **Alignment modifiers** (`--center`, `--end`, `--between` on both blocks) repeat the flex utilities, as the button group's did. None is used.
- **`__ellipsis`** has no uses; markup uses a divider instead.
- **Page count** is a layout (text at one end, a form at the other) with its own alignment modifiers and a `__info` part that sets type from Tier 1 tokens.
- **Tokens.** It sets `--button-padding-inline` from a Tier 1 fallback, and `--button-group-gap` from its own token.

### Stepper
- **Structure.** Five levels (`__list` > `__item` > `__step` > `__content` > `__title`), plus aliases `__label`, `__desc` and `__indicator-text`.
- **State.** The current step is marked three times (`.is-active` on the item, `aria-current="step"` on the item, and again on the step). The state shown by the indicator relies on colour and on description text that density hides.
- **Indicator type** comes from four private tokens that copy the micro-heading.
- **Literals.** Four hex fallbacks (`#00875a`, `#00d2c4`, `#d32f2f`, `#ffffff`), `transition: all`, `!important`, and a hover that scales the indicator.
- **Density removes content.** `--compact` hides descriptions; it should only make things smaller.

## Where each one ends

- A **breadcrumb** is the trail of ancestors of the current page: a line of links ending in the current page. It is not a stepper; it has no order of tasks.
- A **navigation tree** is nested links to the sections of a site or a page. Unlike a menu, it is navigation with depth and a current location. Unlike a tab list, it is not a set of views of one thing.
- **Pagination** moves between the pages of one list. It is a button group of page links with a current page and a gap marker.
- A **stepper** shows the steps of one task, which are done, which is current, and which are left. Its steps are links only when the user may revisit them.

## Questions

1. **Breadcrumb: type and links from the atoms.** The breadcrumb sets no type: put a text atom on the list (`<ol class="small-text">`). Links are plain `.link`s; the breadcrumb sets `--link-prominence: plain`, so they keep the link colour and underline on hover and focus. The current page is plain text in the foreground colour, not bold, so the trail keeps its width. It is the last `<li aria-current="page">`, or a link with `aria-current="page"` when the page wants to link to itself. The separator stays (`content: "/" / ""`, token `--breadcrumb-separator`). Remove `__list`, `__item`, `__link`, `.is-current` and the font tokens. *Recommended: yes.*

2. **Current page is ARIA, not a class.** As the tab pass decided, `aria-current` marks the current item. The button treats `aria-current` (any value but `"false"`) as selected, like `.is-active`, so a pagination link needs no class. A container that shows the current item differently maps it to its own look: the menu to a subtle tint, the navigation tree to a rail (question 4). `.is-active` stays for non-navigation selection. *Recommended: yes.*

3. **Pagination is a button group with a gap marker.** Markup is `<nav class="pagination button-group" aria-label="Pagination">` holding page links, with the current page as `<a class="button" aria-current="page">`. Pagination makes number buttons square (`--button-padding-inline` from the block padding, no Tier 1 fallback). It adds `.pagination__gap`, an `<span aria-hidden="true">…</span>` for skipped pages, which replaces the divider and `__ellipsis`. A missing previous or next page is a link with no `href` and `aria-disabled="true"`. Remove `--center`, `--end` and `--between`; align with `justify-*` on the group or its container, as for button groups. Prev and next may be icon buttons with hidden text, or text buttons (the blog's "Previous" and "Next"). *Recommended: yes.*

4. **Page count becomes a pattern.** Remove `.page-count`, its parts and modifiers. §17 shows the pattern instead: a `.cluster` with `justify-between`, a `.small-text` status ("Page 2 of 10") and the jump form in field markup (`inline-form` and `inline-field` are left as they are until the form-composition pass). *Recommended: yes.*

5. **Navigation tree items.** Choose one:
   - **(a)** Items are `.button` links in `<li>`, as in the menu. The tree sets `--button-prominence: plain`, full width and start alignment, so rows take the button's targets (48px, or 32px compact or fine), focus ring and wrapping. The tree adds nesting, indentation, `--ruled` guide lines, headings, and the current-location look: a rail on the inline start, the foreground colour and a subtle tint, always, so `--indicator` and `--toc` go.
   - **(b)** Items stay as tree links with their own row styling, brought up to the target sizes and given tokens.

   *Recommended: (a).* It is the menu decision again; two components that build rows of links differently would drift apart.

6. **Navigation tree names and structure.** Remove the `nav-tree*` alias family. Markup is `<nav class="navigation-tree" aria-label="…"><ol>`, with nesting as nested lists inside the `<li>`. A heading is `<li class="navigation-tree__heading">` with a text atom, as in the menu. Remove `__list`, `__item`, `__link`, `__text` (bare `ol`/`ul`, `li` and `.button`), `__label`, `__item--nested` (the docs site's table of contents emits nested lists instead), `--flush` (a no-op) and `--toc`. `--ruled` and `--compact` stay. Collapsible branches (`<details>` in a tree) are left for later. *Recommended: yes.*

7. **Stepper structure.** Use three levels: `<ol class="stepper" aria-label="…">`, `<li class="stepper__item">` and `.stepper__step`, which holds `__indicator`, `__title` and an optional `__description` laid out on a grid. The step is a `<div>` normally, an `<a>` when the step is a page the user may revisit, and a `<button>` for an in-page wizard. Wrap the list in a `<nav>` only when its steps are links. Remove `__list`, `__content`, `__label`, `__desc`, `__indicator-text`, `--inline` (no uses), and the reach into the button's private variables. Interactive steps get the focus ring and at least a 48px target, which their size already gives. *Recommended: yes.*

8. **Stepper state is never colour alone.** The current step is `aria-current="step"` on the item only, so `.is-active` goes. `.is-complete` and `.is-invalid` stay. Each step's title carries its state for screen readers as hidden text (`<span class="visually-hidden">Completed: </span>`), since the indicator is `aria-hidden`. The indicator shows a check for complete and a warning icon for invalid, with intent colours from tokens, not hex. `--compact` (sets `--ui-sizing: compact`, smaller indicator) no longer hides descriptions. Descriptions still hide in narrow containers, which is safe once the state is in the title. Remove `transition: all`, `!important` and the hover scale. *Recommended: yes.*

9. **Tokens and stories.** New Tier 3 sets for `navigation-tree.*` (indent, rule, current rail and tint), `stepper.*` (indicator size, track width and colours, gaps), `breadcrumb.*` (gap, separator, separator colour; the font size goes) and `pagination.*` (gap). No literal or Tier 1 fallbacks. The four story files (1,612 lines in the old conformance-matrix format) are rewritten to the current shape: a playground, then one story per option, plus right-to-left. Usage in the docs site, recipes, header stories and blog templates migrates by script. *Recommended: yes.*

All approved as recommended, with (a) for question 5.

## Migration done

### CSS and tokens
- **Breadcrumb** (101 → 61 lines): lays out the trail and draws the separators; sets `--link-prominence: plain`; no type. The current page is the foreground colour, not bold.
- **Navigation tree** (245 → 167 lines): items are `.button`s, made plain, full width and start-aligned, as in the menu. The current item (`aria-current`) shows a tint and a rail, drawn on the button's `::before`; in a ruled tree the rail sits on the guide line. `--ruled` and `--compact` stay; the `nav-tree` alias family and the parts named in question 6 are gone.
- **Pagination** (135 → 46 lines): sets the button group's gap, squares number buttons, and adds `.pagination__gap`. Page count is a pattern in §17.
- **Stepper** (430 → 290 lines): `ol.stepper` > `li.stepper__item` > `.stepper__step` on a grid; state maps for `aria-current="step"`, `.is-complete` and `.is-invalid`; interactive steps reset as links or buttons with a 48px target; no hex, `!important`, `transition: all` or hover scale.
- **Button:** `aria-current` (not `"false"`) joins the selected map and the forced-colours rule. The label's `:only-child` centring is now zero-specificity, so a menu or tree can align it to the start in a stylesheet without layers (the blog).
- **Menu:** a current link (`aria-current`) shows as a tint.
- **Tokens:** `breadcrumb.*` (5, font size gone), `navigation-tree.*` (11, new), `pagination.*` (2), `stepper.*` (14, new).

### Added during the pass
- **Plain stepper** (`.stepper--plain`, flag `--stepper-prominence: plain`): the number or icon without its circle, coloured by state. It was asked for as a "minimal" version. In PRINCIPLES, minimal presentation means icon only (no text), and a stepper without circles is still text plus indicator, so it is the plain prominence: no surface around the indicator.

### Markup
- Stories for all four rewritten (1,612 → 538 lines): a playground, one story per option, right to left.
- Migrated: the docs site's table of contents (nested lists from depth-3 headings, `aria-current="location"`) and component-header breadcrumb; header and app-header breadcrumbs (`small-text` on the list); the tally-sprout stepper and its script; the button story's current link.
- `docs/markup/16`, `17` and `30` rewritten; `16b-navigation-tree.md` added; notes in §1 and §3b.

### Found while testing
- **Accent links on a muted surface fail contrast.** The header story's breadcrumb now uses link colour on an inline `--surface-muted` background: 4.23:1. It is the same palette gap found in the action-sets pass (accent on the menu's subtle tint). Left for the palette work.
- Axe: all 26 wayfinding stories pass in light and dark.

### Blog
- SCSS regenerated for breadcrumb, navigation tree, pagination, stepper, menu and button; Tier 3 and the inverted-palette blocks updated.
- `_category.twig`, `_tag.twig` and `_entry-lists-shared.twig`: the current page link drops `.is-active`; the category breadcrumb list takes `small-text`.
- `_component-library.twig`: breadcrumb, pagination and stepper sections rewritten, a navigation-tree section added, and the popover demo's action list made a menu.

### Navigation tree, second round
Feedback: the tree looked untidy. Measured causes, all fixed:
- every row was bold (the button's 700), so nothing stood out; items are now regular weight in the muted colour (`navigation-tree.color`), and the current item is bold in the foreground colour;
- guide lines sat 2px left of the parent label, and nested rows started 17px right of the line, so the current tint floated away from its rail. Everything now lines up on one inset (the button's border plus padding): nested lists start under the parent label, the line is drawn there, children's rows start right after it, and the rail covers the line and meets the tint's square start corners;
- headings sat 2px left of the item labels; they now use the same inset. A heading that names the whole tree goes inside it as `.navigation-tree__heading` (story, docs-site table of contents, §16b).
- `navigation-tree.indent` and `compact-indent` tokens went; the indent follows the button padding, so it steps down with density.

### Navigation tree, third round
- **Density stays the author's choice.** Compact by default was tried and reversed: default rows are 48px, and `--compact` gives 32px rows that keep the 48px hit area.
- **Rail inside the button.** The rail fills the current button's start edge, over its border. Its width is `--navigation-tree-rail-width` (now 4px) or the button's radius, whichever is greater, and its start corners take the button's radius, so it sits flush in the curve instead of floating as a pill. The button keeps its own rounded corners.
