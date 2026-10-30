# Accordion

Covers `.accordion` (a native `<details>` and `<summary>`) and `.accordion-group`. It is the first of the remaining organisms, which get one pass each because they share no job: accordion, combobox, empty state, header.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome 156 against `packages/css/src/index.css`.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `organisms/accordion.css` | 308 | Base disclosure with a border, and a surface when open; style queries for density, compact text and `--accordion-variation` (plain, flush); modifiers `--plain`, `--flush`, `--transparent`, `--ruled`; a rule that reaches into a flush card body; the summary's layout and type; a plus/minus icon from two pseudo-elements, with `--no-icon` and `.accordion-group--no-icons` to turn it off; the height animation on `::details-content`; `.accordion-group` with `--tight`; motion and contrast preferences. |

Tier 3: `accordion.*`, 12 tokens. The CSS also reads eight names that aren't tokens (`summary-font-family`, `-size`, `-weight`, `-color`, `summary-gap`, `icon-size`, `icon-stroke`, `group-gap`), so they always use their literal fallbacks.

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.accordion` | 59 (the accordion stories, the filter sidebar recipe, markup docs) | 82 (81 on the overview page, 1 table of contents) |
| `--flush` | 7 | 38 (the overview's sections) |
| `--transparent` | 3 | 38 (the overview's subsections) |
| `--plain` | 4 | 0 |
| `--no-icon` / `.accordion-group--no-icons` | 5 / 1 | 0 |
| `--ruled` | 0 | 0 |
| `.accordion-group` / `--tight` | 23 / 9 | 4 / 0 |
| `name` (exclusive group) | 16 | 3 |
| `--accordion-variation` | 3 | 0 |
| `.accordion__icon` (no CSS left but one reduced-motion selector) | 0 | 0 |
| `.accordion__heading` (blog only, no CSS) | 0 | 38 |

The blog's overview uses accordions as collapsible page sections. Its own `section.scss` puts heading type on the summaries (`.section__title`, `.subsection__heading`), which only works because the blog has one layer and that file comes after the accordion.

## Measurements and checks

| | Default | In `.ui-compact` | `--flush` |
| :--- | :--- | :--- | :--- |
| Summary height | 58px | 37px | 58px |
| Padding | 16px | 8px by 12px | 16px by 0 |
| Summary text | 16px bold | 13.3px bold | 16px bold |

- **The icon overlaps long summaries.** It is absolutely placed in the summary's end padding (16px), but it's 14px wide and the text can run to that padding's edge. Wrapped text runs under the icon. The two pseudo-elements also make the icon hard to restyle.
- **Compact targets.** A compact summary is 37px tall. PRINCIPLES keeps a 48px target in compact containers unless the product opts into fine-pointer targets.
- **The focus ring** goes round the whole `<details>`, open content included, not the summary that has focus. In `--flush` its offset is 1rem, so it draws 16px outside the item, over its neighbours.
- **Hover** turns the whole border and the summary text accent-coloured. No other library control changes its border on hover.
- **The summary sets type** (family, size, weight, colour) in the organism layer, so a text atom on a summary (`<summary class="subheading">`) loses. The blog works around this with its single layer.
- **Open changes the surface:** closed is transparent, open takes the card surface. `--transparent` exists only to undo that (38 blog uses). On a card-coloured page the change is invisible; on a tinted page an accordion jumps between two looks.
- **Three ways to say "less frame":** `--plain` (no border, keeps padding), `--flush` (rules above and below, no inline padding) and `--transparent` (border, no surface), plus `--accordion-variation` repeating two of them.
- **No indicator:** `--no-icon` and `--no-icons` remove the only visual sign that a summary opens and whether it is open.
- **Density** reads the legacy `--ui-density: dense` flag, Tier 1 tokens (`--spacing-8`, `--spacing-12`, `--typography-font-size-0`, `--typography-font-size--1`) and has no `--compact` modifier.
- **Reaching into the card.** `.card__body--flush > .accordion-group > .accordion` reads the card's private `--_card-padding`. Table and tab list now take a public `--*-inset` flag from the card.
- **Dead code:** the `.accordion__icon::after` selector and `!important` in the reduced-motion block; `transition-property: overflow`.
- **Exclusive groups** (`name`) work natively, and find-in-page opens a closed accordion that holds the match (Chrome).
- **Axe:** the accordion stories pass in light and dark. The filter sidebar recipe's failures belong to other components.

## Problems found

1. Too many prominence names, one of them only undoing a default (open surface).
2. The icon overlaps text and can be switched off, leaving no state cue.
3. Focus ring on the wrong element, with a large offset in flush.
4. Compact uses the legacy flag and Tier 1 tokens, and drops below the 48px target.
5. The summary's type beats text atoms.
6. Card coupling through a private variable; dead code.

## Where it ends

An accordion is one disclosure: a summary that names a section and content that opens below it. It draws the frame, the summary's layout and the state icon. What the summary says is a text atom, and the content is anything. An accordion group stacks disclosures and optionally joins them. Tabs, menus and navigation trees are not accordions, even when they collapse.

## Questions

1. **Accordion is a molecule.** It is a summary and content in a frame, composed of atoms, with no other molecules required. Move it to `molecules/accordion.css` and the stories to `Molecules/Accordion`. *Recommended: yes.*

2. **Prominence on the shared axis.**
   - Default: a border with the radius, no surface of its own, the same open or closed.
   - `--plain`: no border or radius, and no inline padding, so the summary lines up with the text around it. A rule above and below separates items; in a group, one rule between items (today's `--flush`).
   - Flag `--accordion-prominence: plain`.
   - Remove `--flush`, `--transparent`, `--ruled`, the open surface, `--accordion-variation` and the `open-bg` token. Today's `--plain` (no border, padding kept) has no use outside its story and goes.

   Something that needs a surface goes in a card, or sets `--accordion-bg`. *Recommended: yes.*

3. **One state icon, never removed.**
   - A single `::after` drawn from two gradients (a plus that becomes a minus), placed as a flex item at the summary's end, so text wraps before it and right-to-left needs nothing extra.
   - Size and stroke follow the text (`1em`, the border width).
   - Remove `--no-icon` and `.accordion-group--no-icons`.

   *Recommended: yes.*

4. **Focus and hover on the summary.**
   - The focus ring goes on the summary, inset so it isn't clipped and doesn't cover neighbours; it follows the frame's radius.
   - Hover tints the summary, like a plain button's hover. The border and text colour don't change.

   *Recommended: yes.*

5. **Summary type comes from text atoms.**
   - The summary is bold body text by default, set so that a text atom on the summary wins (`<summary class="subheading">`).
   - Remove the summary type names.
   - A heading inside a summary is valid HTML, but some screen readers flatten it into the summary's name. Document it as an option for pages that need it in their outline, not the default.

   *Recommended: yes.*

6. **Density.**
   - `--compact` (new) sets `--ui-sizing: compact`, like every container. A compact region gets the same result.
   - Compact padding is 8px by 12px through new Tier 3 tokens, and the summary keeps a 48px minimum height, or 32px when the product opts into fine-pointer targets.
   - Remove the `--ui-density` query and the Tier 1 references.

   *Recommended: yes.*

7. **Groups.**
   - `.accordion-group` stacks items with a gap from a token.
   - `--tight` becomes `--joined`, as in the button group: shared borders, outer corners rounded.
   - A `--plain` group has no gap and one rule between items.

   *Recommended: yes.*

8. **Exclusive groups.** Keep `name` as the way to allow one open item at a time. Document that it hides content people may want to compare, so use it only for long, independent items. *Recommended: yes.*

9. **Card integration through a flag.** The accordion pads its summary and content with `--accordion-inset`, defaulting to the accordion's padding. A flush card body sets it, as it does for table and tab list. Remove the rule that reads `--_card-padding`. *Recommended: yes.*

10. **Clean-up and tokens.**
    - Remove the dead selector, the `!important` and the `overflow` transition. Keep the height animation and the reduced-motion and contrast preferences.
    - `accordion.*` stays at 12, with five out and five in:
      - remove `open-bg` and `hover-border`, and the three `inner-border-*` tokens that only `--ruled` read;
      - add `compact-padding-block`, `compact-padding-inline`, `group-gap`, `hover-bg` and `icon-size`.

    *Recommended: yes.*

11. **Stories, docs and the blog.**
    - Rewrite the stories:
      - a playground;
      - prominence;
      - summary content (text atoms, a heading, long text);
      - groups (gap, joined, plain, exclusive);
      - compact;
      - in a card;
      - right to left.
    - Migrate the filter sidebar recipe.
    - Blog: the overview's sections become `--plain` and its subsections lose `--transparent`. Its section titles keep their type, which now wins without the single-layer workaround. `.accordion__heading` (no CSS) goes.

    *Recommended: yes.*

## Migration done

All recommendations taken.

- **Tokens:** `accordion.*` is 12 tokens. `open-bg`, `hover-border` and the three `inner-border-*` tokens are gone. `compact-padding-block`, `compact-padding-inline`, `hover-bg`, `icon-size` and `group-gap` are new.
- **CSS:**
  - `molecules/accordion.css` replaces `organisms/accordion.css`.
  - Default and `--plain` prominence, with a `--accordion-prominence` flag; `--compact` and compact regions.
  - One gradient icon as a flex item.
  - The focus ring and hover tint are on the summary.
  - A bare summary is bold; a classed summary takes its type from its text atom.
  - Groups have a token gap and `--joined`; plain accordions sit one rule apart.
  - Card sets `--accordion-inset` on a flush body.
- **Found while verifying:**
  - **Nested accordions.** The `--plain` modifier first set the public flag, so accordions nested in a plain one turned plain too (the blog's subsections lost their padding). The modifier now sets only the private variables, and a card's inset stops at the accordion's content.
  - **Rule style.** Plain accordions now draw their rules in the rule style, not the frame's. The blog's frame is dashed.
  - **Plain hover.** With no inline padding, the hover tint would sit flush against the text. It reaches half a spacing step past the text, and the text stays lined up.
- **Usage migrated:**
  - The filter sidebar recipe and `32-recipes.md`: their joined groups sat in flush card bodies, where the old card rule removed their side borders. They are now plain accordions.
  - The docs site's navigation and command palette list accordion under molecules.
- **Stories:** rewritten as `Molecules/Accordion` (8 stories). Axe passes in light and dark. The filter sidebar's remaining failures belong to the combobox, a heading in the split layout and the known warning status contrast.
- **Blog:**
  - The SCSS moved to `library/molecules/_accordion.scss`.
  - Tier 3 keeps the blog's dashed frame and adds the new tokens.
  - On the overview, sections are `--plain`, subsections lost `--transparent`, and the 38 `.accordion__heading` spans are gone.
