# Prose

Covers `.prose`: the scope that styles bare HTML (CMS and Markdown output: headings, paragraphs, lists, quotes, code, figures) so that it reads like the rest of the library without classes. `.prose-end` ends the scope, so a card or widget inside an article keeps its own styles.

Prose is the blog's main content style: every article, page, profile and error template uses it. Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome 156 against `packages/css/src/index.css`.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `molecules/prose.css` | 522 | `@scope (.prose) to (.prose-end)`. Element typography for `h1`–`h6`, `p`/`ul`/`ol`/`dl`, `small`/`figcaption`, each with its own fixed/fluid/cq/compact queries. Block rhythm, lists, links, `hr`, `blockquote`, `figure`, `pre`/`code`, inline semantics (`u`, `del`, `ins`, `s`, `b strong`, `em em`, `sub`, `sup`). A `:where(*)` rule outside the scope for spacing modes. Nine `.emoji.*` classes. |
| `utilities/appearance-modes.css` | — | `.font-sizing-*` set `--font-sizing`, `--prose-font-sizing`, `--vert-spacing` and `--prose-vert-spacing`. `.font-sizing-tight`, `.font-sizing-compact--on-desk` and four `.vert-spacing-*` classes exist for prose. |

Tier 3: `prose.*`, 27 tokens. Ten are link tokens; two reference variables outside the library (`--site-width`, `--site-header-height`).

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.prose` | 16 (stories 6, docs site 2, markup 8), plus 18 in the prose stories | 19 (13 templates, 6 in the overview) |
| `.prose` with `.font-sizing-fluid` | 1 (the docs article) | 3 (home, blog entry, overview) |
| `.prose-end` | 16 (docs site) | 0 |
| `.emoji.*` | 3 (prose stories only) | 0 |
| `.vert-spacing-*`, `.font-sizing-tight` | 0 | 0 |

The blog's `dfh/components/_section.scss` sets `--prose-spacing: fluid`, which nothing reads. The blog's `_prose.scss` matches the library apart from the spacing fallbacks.

## Measurements and checks

Computed styles inside `.prose`:

| | Default | `.font-sizing-fluid` (same element or parent) | In `.ui-compact` |
| :--- | :--- | :--- | :--- |
| `h2` | 23.04px | 33px | 19.2px |
| `p` | 16px | 19px | 13.3px |
| Space after `p`, `h2` | 16px | 16px | 16px |
| `p` max width | 66ch | 66ch | 66ch |

- **The rhythm never changes.** Spacing comes from `--vert-space`, which the `:where(*)` rule only sets once something sets `--vert-space` to `fluid`, `cq`, `fixed` or `tight`. Nothing does: the utilities, the banner and prose itself all set `--vert-spacing` instead. Every block gets the 1rem fallback in every mode, and the tokens `prose.vert-space`, `vert-space-cq` and the three `inset-space` tokens are never read.
- **Text atoms lose to prose.** `<p class="small-text">` inside prose renders at 16px, not 14px: the molecule layer sits above the atoms, so prose's `p` rule wins. `h2.heading` only looks right because the sizes match.
- **Links don't follow the link atom.** A bare link is the body text colour with a 1px accent-coloured underline and no hover thickening. Its hover and active colours read `--link-hover-color` and `--link-active-color`, which the link pass removed, so they fall back to `currentColor`. `:target` makes a link bold, which reflows the line.
- **`text-wrap`** reads `--prose-body-text-wrap: none`, which isn't a valid value, so the rule does nothing. It sits inside `@media (width > 30em)`, a viewport query that PRINCIPLES §1 doesn't allow in a component.
- **`diagonal-fractions`** is on every paragraph and on code. In a font with fraction glyphs it turns "10/12" or `a/2` into a stacked fraction.
- **Figures:** a caption has 56px of space below it and an opacity token. `figure + h2` loses its top margin, so a heading after a figure sits tight against it.
- **`hr`** is 2px solid in the body colour; `.divider` uses `--divider-width`, `--divider-style` and `--divider-color`, so the two rules look different.
- **Code blocks** are a dark band in both themes with `font-size: 1rem` written as a literal. The padding sits on the inner `code`, and long lines wrap. Inline `code` only changes the font.
- **Tables** get nothing: `th` padding is 0. A Markdown table renders as raw cells.
- **`dl`** gets the paragraph type but no `dt`/`dd` styling.
- **`@scope`** is Baseline newly available (Firefox 146, December 2025). Without it, prose styles nothing and the reset's readable defaults show, which meets the resilience rule.

## Problems found

1. The rhythm is broken: one spacing value everywhere, unused tokens, and a style query on every element of every page.
2. Prose re-declares each text atom's type and four sizing queries (about 180 lines), and still overrides an atom class placed on an element.
3. Links contradict the link pass and read removed tokens.
4. Two sizing axes (`--font-sizing` and a separate vertical-spacing axis), with four sets of flags (`--prose-font-sizing`, `--vert-spacing`, `--prose-vert-spacing` and `--prose-spacing` in the blog) and five unused utilities.
5. A viewport media query, an invalid `text-wrap` value, external variables in tokens and a literal `1rem`.
6. Content decoration in a component: nine emoji classes.
7. Gaps: tables, `dl`, inline code.

## Where it ends

Prose styles bare elements only. Anything with a component class (`.card`, `.button`, `.table`, `.divider`) styles itself, and `.prose-end` stops the scope for larger widgets. Width belongs to the wrapper the prose sits in; prose sets only the reading measure of text blocks.

## Questions

1. **Prose stays a molecule.** It's the one place where bare HTML gets the library's look. `@scope (.prose) to (.prose-end)` stays. *Recommended: yes.*

2. **Element type lives with the text atoms.** Move the element typography (`h1` → title, `h2` → heading, `h3` → subheading, `h4`–`h6` → small heading, `p`/`li`/`dd` → text, `small`/`figcaption` → small text) into `atoms/text.css`, in a scoped block next to the atom it copies. That block comes before the atom classes, so a text atom on an element inside prose (`<p class="small-text">`) wins, while other classes (`<h2 id="x" class="anchor">`) keep the prose look. `prose.css` keeps only rhythm, lists, quotes, code, figures and tables. *Recommended: yes.*

3. **One sizing axis.** Prose takes its rhythm from `--font-sizing`: fixed uses `prose.space`, fluid `prose.space-fluid`, cq `prose.space-cq`, and compact (or `--ui-sizing: compact`) half the fixed value. Lists, quotes and captions derive from the same value. Remove the `:where(*)` rule, `--vert-space`, `--vert-spacing`, `--prose-vert-spacing`, `--prose-font-sizing`, `.vert-spacing-*`, `.font-sizing-tight`, the banner's `--vert-spacing` and the blog's `--prose-spacing`. *Recommended: yes.*

4. **Default sizing mode.** Choose one:
   - (a) Prose inherits `--font-sizing` from its context like any other content. A page is fixed unless it says otherwise; a prose in a dialog follows the dialog (cq); the blog keeps `prose font-sizing-fluid`.
   - (b) Prose resets to fixed, as card and menu do, and only a `.font-sizing-*` class on the prose itself changes that.

   *Recommended: (a).*

5. **Links look like `.link`.** A bare link in prose takes the link atom's look: link colour, underline at full link colour, thicker on hover, focus ring from the atom. `--link-prominence: subtle` on a prose gives today's body-coloured look. Remove the ten `prose.link-*` tokens and the bold `:target` style. *Recommended: yes.*

6. **Measure and wrapping.** Text blocks keep `max-inline-size: var(--body-measure)` (66ch). Remove `--prose-block-width` (the wrapper sets width) and the media query. Paragraphs get `text-wrap: pretty`, headings `balance`. Hyphenation stays a token, `none` by default. *Recommended: yes.*

7. **Numerals.** Keep oldstyle proportional figures and hanging punctuation in paragraphs, lining figures in lists and headings, and slashed zero in code. Drop `diagonal-fractions` everywhere. *Recommended: yes.*

8. **Inline semantics.** Keep the `sub`/`sup` fix (no line-height jump) and `em` inside `em` turning upright. Remove the underline on `b strong`/`strong b` and the rules that restate browser defaults for `u`, `del`, `s` and `ins`, along with the three `prose.underline-*` tokens. *Recommended: yes.*

9. **Rules, quotes and figures.**
   - `hr` uses the divider tokens, so it matches `.divider`.
   - `blockquote` keeps its inline-start border (`prose.blockquote-border-width`) in `--border-color`, inset by the list indent.
   - `figcaption` takes the small-text type in `prose.figcaption-color`, with a small gap above and no margin below; the figure's own margin spaces it.
   - `figure + h*` loses its special case.

   *Recommended: yes.*

10. **Code.** `pre` keeps a dark band in both themes, from tokens (`prose.code-block-bg`, `prose.code-block-text`). Its padding moves from the inner `code` to `pre`, at the body size in the mono family, with no literal size. Long lines keep wrapping, so no keyboard-scrollable region is needed. Inline `code`:
    - (a) gets a subtle tint and a small radius (`prose.code-bg`), so code stands out in running text;
    - (b) changes the font only, as now.

    *Recommended: (a).*

11. **Tables.** A bare `<table>` in prose gets a light ruled look:
    - cell padding and row rules from the table tokens;
    - start-aligned header cells;
    - tabular figures;
    - no change to `display`, which would drop table semantics in Safari.

    A wide table still needs a `.table` in a scroll wrapper. *Recommended: yes.*

12. **Lists and description lists.**
    - Lists keep the indent and half-rhythm item spacing.
    - Nested ordered lists step decimal, lower-latin, lower-roman.
    - `dt` gets the strong weight.
    - `dd` gets the list indent and a half-rhythm gap.

    *Recommended: yes.*

13. **Emoji classes go.** The nine `.emoji.*` classes put content in CSS and aren't used outside the prose stories. Write the emoji in the text. *Recommended: yes.*

14. **Headings and anchors.**
    - Headings keep `1.5em` above, the rhythm below, `break-after: avoid` and no top margin when first or directly after another heading.
    - Elements with an `id` keep `scroll-margin-block-start`, from `prose.scroll-margin` (the `--spacing-scroll-margin` token). A product with a sticky header adds its height there; the token stops referencing `--site-header-height`.

    *Recommended: yes.*

15. **Tokens and stories.**
    - Tier 3 `prose.*` shrinks from 27 tokens to about 10: three spaces, hyphens, blockquote border width, figcaption colour, code block background and text, inline code background, scroll margin. Typography and link tokens go.
    - The story file (564 lines) is rewritten: a playground, one story each for text and headings, lists, quotes and rules, code, figures, tables, sizing modes and `.prose-end`, plus right to left.
    - Usage in the docs site and the blog templates needs little change beyond removing the unused classes.

    *Recommended: yes.*

## Migration done

All recommendations taken, with (a) for questions 4 and 10.

- **Tokens:** `prose.*` is now 11 tokens: `space`, `space-fluid`, `space-cq`, `indent`, `hyphens`, `blockquote-border-width`, `figcaption-color`, `code-bg`, `code-block-bg`, `code-block-text`, `scroll-margin`.
- **CSS:**
  - Element type moved to `atoms/text.css` ("Prose Elements"), in a nested `@layer prose` under the atom classes. Scope proximity would otherwise let a scoped `:where(p)` beat an unscoped `:where(.small-text)` of equal specificity, which was the second cause of finding 2 alongside the layer order.
  - `molecules/prose.css` keeps rhythm, lists, rules, quotes, figures, code, tables and inline semantics.
  - Bare prose links share the `.link` rule in `atoms/link.css`.
  - The `--vert-spacing` lines are gone from `appearance-modes.css`, banner, accordion and table.
- **Lists, tables and rules with a class** are skipped, so `ul.cluster`, `dl.telemetry-group`, `.table` and `.divider` inside prose keep their own look.
- **The `.prose-end` block** keeps the rhythm around it; before, it touched the next paragraph.
- **One change to question 8:** the reset unsets every element (`all: unset`), so `u`, `ins`, `del` and `s` have no lines unless something sets them. Prose keeps one line each for them. The `b strong` underline and the three underline tokens are gone.
- **Measured** in headless Chrome:

  | | Fixed | Fluid (on the prose or around it) | Compact region |
  | :--- | :--- | :--- | :--- |
  | Space after `p` | 16px | 21px | 8px |

  - `<p class="small-text">` is 13.3px;
  - `<p class="large-text">` is 19.2px;
  - `<h2 class="anchor">` keeps the heading size;
  - links are the link colour;
  - the figcaption has no margin below.
- **Stories:** rewritten (11 stories). Axe passes in light and dark.
