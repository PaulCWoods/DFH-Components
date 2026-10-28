# Text: usage inventory

Covers the typography atoms in `atoms/text.css`: six heading steps, the body text steps and the small presets at the end of the file. It also covers the sizing modes they respond to (`--font-sizing`, `--ui-sizing: compact`) and the muted text colour utility they are always paired with. `.prose` styles its own children through the same tokens and gets its own pass; it is noted where it depends on these atoms. The other typography utilities (`.font-size-*`, `.font-weight-*` and their synonyms) belong to a utilities pass.

Counts are class attributes in Storybook stories, the docs site, AGENTS.md and the blog templates.

## The CSS

| File | Lines | What |
| :--- | ---: | :--- |
| `atoms/text.css` | 269 | 13 presets, `.strong-text`, `.alt-text`, `code` / `.code-text` / `.code`, `.pre` |
| `utilities/color.css` | – | `.text-color-muted`, `.text-muted`, `.color-muted` (one rule, three names) |
| `tokens/2-semantic.json` | – | `body*`, `heading*`, `title*`, `display-title*`, `micro-*`, `nano-*` with `-fixed`, `-fluid`, `-cq` and `-compact` sizes |

There are no Tier 3 tokens for text. The atoms read Tier 2 directly, which is correct: typography is owned globally (AGENTS, "Tier 3 Token Economy").

## Usage

| Class | Stories | Docs | AGENTS | Blog |
| :--- | ---: | ---: | ---: | ---: |
| `.display-title` | 7 | 1 | 2 | 1 |
| `.title` | 12 | 1 | 3 | 4 |
| `.heading` | 68 | 2 | 6 | 13 |
| `.subheading` | 66 | 1 | 4 | 21 |
| `.small-heading` | 112 | 5 | 5 | 12 |
| `.micro-heading` | 86 | 10 | 6 | 80 |
| `.nano-heading` | 0 | 0 | 0 | 0 |
| `.large-text` | 4 | 0 | 1 | 0 |
| `.text` | 42 | 0 | 5 | 3 |
| `.small-text` | 27 | 16 | 2 | 51 |
| `.caption` | 0 | 0 | 0 | 0 |
| `.micro-text` | 185 | 2 | 8 | 23 |
| `.nano-text` | 0 | 0 | 0 | 0 |
| `.strong-text` | 6 | 0 | 1 | 1 |
| `.alt-text`, `.code-text` | 1 each | 0 | 0 | 0 |
| `.code` | 0 | 0 | 0 | 0 |
| `.pre` | 0 | 5 | 0 | 0 |
| `.text-muted` | 224 | 23 | 16 | 117 |
| `.text-color-muted` | 111 | 3 | 9 | 6 |
| `.font-sizing-fluid`, `-cq`, `-fixed` | 4, 9, 2 | 1, 0, 0 | 1, 2, 1 | 3, 1, 0 |

`micro-text` tokens are also read by `field` (hint, output, error), `fieldset`, `range`, `range-lockup`, `switch`, `stepper` and `prose`, so step −1 is effectively the system's small UI text.

## Measurements

Computed font size in px and line height (ratio). Each sample sits in a 320px-wide container; the columns are the sizing mode set on that container.

**Viewport 375px**

| Class | Default (fluid) | Fixed | Cq | Compact |
| :--- | ---: | ---: | ---: | ---: |
| `.display-title` | 40.0 / 1.00 | 39.8 | 40.0 | 33.2 |
| `.title` | 28.0 / 1.00 | 27.6 | 28.0 | 23.0 |
| `.heading` | 23.0 / 1.12 | 23.0 | 23.0 | 19.2 |
| `.subheading` | 19.0 / 1.26 | 19.2 | 19.0 | 16.0 |
| `.small-heading` | 16.0 / 1.42 | 16.0 | 16.0 | 13.3 |
| `.micro-heading` | 13.3 / 1.12 | – | – | 11.1 |
| `.large-text` | 20.0 / 1.50 | 20.0 | 20.0 | 16.0 |
| `.text` | 16.0 / 1.60 | 16.0 | 16.0 | 13.3 |
| `.small-text` | **12.8** / 1.40 | 12.8 | 12.8 | 11.2 |
| `.micro-text` | **13.3** / 1.42 | – | – | 11.1 |

**Viewport 1440px**, same container

| Class | Default (fluid) | Fixed | Cq | Compact (`--font-sizing`) | Compact (`--ui-sizing`) |
| :--- | ---: | ---: | ---: | ---: | ---: |
| `.display-title` | 83.0 | 39.8 | **83.0** | 33.2 | **83.0** |
| `.title` | 48.0 | 27.6 | 28.0 | 23.0 | **48.0** |
| `.heading` | 33.0 | 23.0 | 23.0 | 19.2 | 19.2 |
| `.subheading` | 23.0 | 19.2 | 19.0 | 16.0 | 16.0 |
| `.small-heading` | **16.0** | 16.0 | 16.0 | 13.3 | 13.3 |
| `.large-text` | **20.0** | 20.0 | 20.0 | 16.0 | 16.0 |
| `.text` | **16.0** | 16.0 | 16.0 | 13.3 | 13.3 |
| `.small-text` | **12.8** | 12.8 | 12.8 | 11.2 | 11.2 |

Muted text (`--foreground-muted`): 5.70:1 on the page and 6.21:1 on a card in light mode; 6.83:1 and 8.53:1 in dark. Passes AA; doesn't reach AAA (7:1) in light mode.

## Problems found

1. **Only four of the steps scale.** The atoms ask for token names that don't exist, so the hard-coded fallback is used every time:
   - `.text` asks for `--body-font-size`; the token is `--body-fluid-font-size`. It stays at 16px at every viewport.
   - `.small-text` and `.large-text` ask for `--small-text-*` and `--large-text-*`; the tokens are `--body-sm-*` and `--body-lg-*`. Both run entirely on literal fallbacks (0.8rem, 1.25rem) in every mode.
   - `--small-heading-fluid-font-size` is defined as `var(--body-font-size)`, which doesn't exist, so it is invalid and `.small-heading` never scales.

   The blog defines `--body-font-size` in its own Tier 2, so there body text *is* fluid: the two disagree.
2. **`.small-text` is smaller than `.micro-text`.** 12.8px against 13.3px, because one is a literal and the other a token. The names say the opposite. Both are meant to be step −1, so they are two names for one step.
3. **The big titles ignore their containers.** `.display-title` has no `cq` rule, so in a 320px container on a wide screen it renders at 83px. Neither title steps down under `--ui-sizing: compact` (both do under `--font-sizing: compact`), so a title in a `.card--compact` stays 48px.
4. **Fixed and fluid don't start in the same place.** At 375px, fixed `.display-title` is 39.8px and fluid is 40px; `.title` 27.6 and 28. Harmless, but the fixed steps and the fluid minimums come from different tokens.
5. **Unused or duplicate names.** `.nano-heading`, `.nano-text`, `.caption` and `.code` have no uses. `.caption` is an alias of `.small-text`. `.pre` is defined here and again in the utilities. `:where(code)` styles a bare element, which the reset already does (`reset.css` line 159).
6. **Two names for muted text.** `.text-muted` (380 uses) and `.text-color-muted` (129), plus `.color-muted`. AGENTS uses both, sometimes in the same example.
7. **Literal fallbacks everywhere.** Every size has a `rem` fallback (`5.96rem`, `0.8rem` and so on), several of which don't match the scale. Line heights and weights have numeric fallbacks too. Problem 1 hid behind them.
8. **The file header promises `text-wrap: balance`, but nothing sets it.** Headings wrap greedily; `.card__title` and a few organisms add `balance` themselves.
9. **No line length.** `.text` and `.large-text` set no measure. PRINCIPLES §4 asks for 45 to 75 characters for reading text. `.prose` handles it for articles; a bare `.text` paragraph in a wide container runs the full width.

What already works:
- the steps come from one modular scale (ratio 1.2);
- line height is set per step;
- `--font-sizing: compact` and `--ui-sizing: compact` step everything else down by one;
- the organism hooks (`.card__title` and the rest) leave typography to these atoms as AGENTS requires;
- sizes are in `rem`, so they follow the user's font setting.

## Questions

1. **What is the default sizing mode for body text?** Headings are fluid by default (they grow with the viewport) and that stays. For `.large-text`, `.text` and `.small-text`:
   - **fixed** by default (16px body at every width). Interface text stays put, and only article prose opts into fluid with `.font-sizing-fluid` or its own default. This is the library's current behaviour, by accident.
   - **fluid** by default (body 16px → 19.2px). Matches the blog today, but grows every label, table cell and card body on a wide screen.

   *Recommended: fixed for body steps, fluid for headings.* Then `.small-heading`, the heading that sits closest to body text, is fixed too (it is already, by accident).
2. **One small text step.** Merge `.small-text` and `.micro-text` into one class at step −1 (13.3px, compact 11.1px). Which name survives?
   - `.small-text`: pairs with `.large-text` and `.text`. The 208 `.micro-text` uses migrate, and the `micro-text` tokens (read by field, switch, range and others) are renamed to `body-sm`. *Recommended.*
   - `.micro-text`: no token renames; the 94 `.small-text` uses migrate.

   `.micro-heading` keeps its name: it is the uppercase eyebrow, a different job.
3. **Remove the unused presets.** `.nano-heading`, `.nano-text` and `.caption` go, along with their `nano-*` tokens. `.code` and the bare `:where(code)` rule go (the reset styles `code`). `.pre` moves to the utilities only. `.strong-text` and `.alt-text`: keep them as the two text modifiers, renamed `.text--strong` and `.text--alt`? Or remove them in favour of `.font-weight-bold` and `.font-family-*`? *Recommended: remove; the utilities already do this.*
4. **Muted text name.** Keep one of:
   - `.text-muted` (380 uses, shortest);
   - `.text-color-muted` (129 uses; matches the other `.text-color-*` utilities and the icon pass).

   *Recommended: `.text-color-muted`,* so every text colour utility shares a prefix and `.text-*` stops mixing colours with alignment (`.text-center`). Migration is mechanical. Separately: should `--foreground-muted` reach 7:1 in light mode, so AAA is reachable? That is a palette change and touches every muted label.
5. **Titles in compact regions.** Should `.title` and `.display-title` step down under `--ui-sizing: compact` like every other heading? *Recommended: yes.* A compact card with a display title is unusual, but when it happens the title shouldn't stay 83px.

### Fixes that need no decision

- Point every atom at the tokens that exist (`--body-fixed-font-size` and the rest), and give `.display-title` a `cq` size.
- Make the fixed steps and the fluid minimums the same values.
- Replace the literal fallbacks: the size chain ends at the Tier 2 token, and if tokens fail to load the text inherits its parent's size (unstyled but legible).
- Headings get `text-wrap: balance`; body steps get `text-wrap: pretty`.
- `.text` and `.large-text` get a measure (`max-inline-size` around 65ch, from a token) that a container can lift.
- Storybook: rebuild the Text stories around the steps and modes, with a story that shows each mode side by side.
- AGENTS §20: rewrite to the final set; fix §5's "Organism-Atom" examples that use `.text-muted`.
- Blog: port `_text.scss` and its mixin, align `_tier2.scss` (`--body-font-size`), and update the typography section of `_component-library.twig`.

## Migration done

Decisions: text atoms are fixed by default (headings included), and the container picks fluid, `cq` or compact; one small step, `.small-text`; utilities keep two names at most, so muted text keeps `.text-color-muted` and `.text-muted`; `.strong-text` and `.alt-text` are removed; titles step down in compact regions.

### Changes

- **`atoms/text.css`** rewritten. Nine atoms. Each takes its fixed token and switches with `@container style(--font-sizing: fluid | cq | compact)` or `style(--ui-sizing: compact)`. No literal fallbacks: if tokens fail, text inherits. Headings `text-wrap: balance`; body `pretty`; `.text` and `.large-text` stop at `--body-measure` (66ch).
- **Removed:** `.micro-text`, `.caption`, `.nano-heading`, `.nano-text`, `.strong-text`, `.alt-text`, `.code-text`, `.code`, the bare `code` rule (the reset styles `code`, now with slashed zero), `.pre` here (the utility keeps it), `.color-muted`.
- **Tokens:**
  - removed `micro-text`, `micro-text-compact`, `nano-text`, `nano-heading`;
  - `body-sm` gains `font-size` (step −1), and `body-sm-compact` is now step −2;
  - added `body.measure` (66ch, which `prose.body-line-length` now aliases) and `display-title-cq`;
  - `small-heading-fluid` points at fluid step 0.

  Tier 3 references (badge, status, chip, kbd, card, telemetry) are repointed with the same values. Consumers in field, fieldset, range, range-lockup, switch, telemetry, prose, dialog and popover now read `--body-sm-*`, `--body-fixed-font-size` and `--body-fluid-font-size`.
- **Migrated:** 221 `.micro-text` → `.small-text`, 98 `.color-muted` → `.text-muted`, `.strong-text` → `.font-bold`, `.alt-text` → `.font-serif`, `.code-text` → `.font-mono`, across stories, docs, AGENTS and blog templates.
- **`appearance-modes.css`**: duplicate `.font-sizing-compact` rule removed.
- **PRINCIPLES:** typography default (§4), utility names (§3), three decisions logged. **AGENTS:** Core Law 3 rewritten as the sizing-mode table; §20 rewritten; legacy row added.
- **Blog:**
  - `--font-sizing: fluid` on the blog's root (`dfh/theme/_tier2.scss`), so the site keeps its fluid type;
  - text mixin rewritten (fixed base plus mode queries; `$size` still locks a mode) and `_text.scss` ported;
  - Tier 2 tokens aligned; consumers renamed as in the library;
  - the blog's `display-title-cq` uses step 6, the largest `cq` step the blog generates;
  - a Text section added to the overview page.

### Measurements after

Font size in px. Each sample sits in a 320px container.

| Class | Fixed (default) | Fluid at 375 / 1440 | Cq | Compact |
| :--- | ---: | ---: | ---: | ---: |
| `.display-title` | 39.8 | 40 / 83 | 40 | 33.2 |
| `.title` | 27.6 | 28 / 48 | 28 | 23.0 |
| `.heading` | 23.0 | 23 / 33 | 23 | 19.2 |
| `.subheading` | 19.2 | 19 / 23 | 19 | 16.0 |
| `.small-heading` | 16.0 | 16 / 19 | 16 | 13.3 |
| `.micro-heading` | 13.3 | – | – | 11.1 |
| `.large-text` | 19.2 | 19 / 23 | 19 | 16.0 |
| `.text` | 16.0 | 16 / 19 | 16 | 13.3 |
| `.small-text` | 13.3 | 13 / 16 | 13 | 11.1 |

Compact applies under both `--font-sizing: compact` and `--ui-sizing: compact`, titles included. Fluid and `cq` minimums sit up to 0.3px below the fixed step because the compiler rounds fluid sizes to whole pixels; that is by design.

### Checks

- Axe: every Text story is clean, light and dark. Field, banner and toast stories show only older failures: the warning palette (banner) and landmark labels (toast).
- Docs site builds.
- Blog compiles; the Text section renders in all four modes.
