# Tab, tab list and tabbed content: usage inventory

Covers three tiers that work as one system:
- the tab atom (`.tab`);
- the tab list molecule (`.tab-list`), which owns the sliding selection indicator;
- the tabbed content organism (`.tabbed-content`, with `.tab-panel`).

Counts cover Storybook stories, the docs site, AGENTS.md and the blog templates. Blog tabs appear only on the overview page.

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `atoms/tab.css` | 507 | `.tab`, `.tab__text`, `.tab--button|subtle|plain|sm|round|icon|vertical|fill`; the list-level group classes `.tabs-*` are also styled here |
| `molecules/tab-list.css` | 461 | `.tab-list`, `.tab-list__content`, `.tab-list--tight`, `.tabs-vertical|on-right|plain|subtle|sm|button|round|flush|scrollable|wrap|floating|docked|docked-top` |
| `organisms/tabbed-content.css` | 83 | `.tabbed-content`, `.tabs` (alias), `.tab-panel`, `.tabbed-content__panel` and `.tabs__panel` (aliases) |
| `organisms/tabs.css` | 9 | A forwarder that `@import`s the three files. Not imported by `index.css`. |

Tier 3 tokens are all under `tabs.*` (25 tokens). The CSS reads `--tab-*` names first and falls back to `--tabs-*`, so most customisation points have two names.

## Usage

| Class | Stories | Docs site | AGENTS | Blog |
| :--- | ---: | ---: | ---: | ---: |
| `.tab` | 243 | 11 | 42 | 41 |
| `.tab-list` | 63 | 4 | 18 | 11 |
| `.tab--button` / `.tabs-button` | 38 / 25 | 0 / 3 | 2 / 7 | 0 |
| `.tab--subtle` / `.tabs-subtle` | 6 / 13 | 0 / 3 | 2 / 2 | 0 |
| `.tab--plain` / `.tabs-plain` | 13 / 10 | 0 / 1 | 4 / 4 | 0 |
| `.tab--sm` / `.tabs-sm` | 3 / 13 | 0 / 3 | 0 / 4 | 0 |
| `.tab--round` / `.tabs-round` | 6 / 6 | 0 | 0 / 5 | 0 |
| `.tab--icon` / `.tabs-icon` | 7 / 4 | 0 | 5 / 0 | 0 |
| `.tabs-vertical` | 22 | 1 | 6 | 0 |
| `.tabs-on-right` | 3 | 0 | 0 | 0 |
| `.tabs-flush` | 7 | 1 | 2 | 0 |
| `.tabs-floating`, `.tabs-docked` | 5, 1 | 0 | 3, 2 | 0 |
| `.tabs-scrollable`, `.tabs-wrap` | 1, 1 | 1, 0 | 1, 1 | 0 |
| `.tabs-fill` | 0 | 1 | 0 | 0 |
| `.tab-list--tight`, `.tab-list__content` | 4, 12 | 2, 1 | 0 | 0 |
| `.tabbed-content`, `.tab-panel` | 0, 0 | 0 | 2, 4 | 0 |
| `.tabs` (legacy organism), `.tabs__panel` (legacy panel) | 28, 45 | 0 | 0 | 11, 6 |

Defined but unused: `.tab--vertical`, `.tab--fill`, `.tab--simple`, `.tabs-docked-top`, `.tabbed-content__panel`, `.tabbed-content--vertical`, and the flags `--tabs-variation`, `--tab-variation`, `--tabs-style`, `--tabs-shape`.

Selected state comes from ARIA only: `aria-selected="true"` in a tablist, `aria-current` in navigation. Every tab that carries `.is-active` also carries the ARIA attribute, so nothing depends on the class.

## Measurements

Light and dark, against the page.

| | Light | Dark |
| :--- | ---: | ---: |
| Unselected tab text | 7.65 | 13.17 |
| Tab hover text (accent) | 4.94 | 9.55 |
| **Tab hover text on a subtle segmented tab (accent on tint)** | **4.50 (4.497)** | 8.27 |
| Underline indicator | 7.65 | 13.17 |
| **Plain segmented indicator (5% tint)** | **≈1.07** | ≈1.1 |
| Plain underline list indicator | none | none |

| Size | Height | Hit area |
| :--- | ---: | ---: |
| Default tab | 48px | 48px |
| `.tabs-sm`, compact | 32px | **32px** |
| `.tabs-vertical` (default size) | **32px** | **32px** |

Axe (27 tab stories, light and dark):
- `aria-required-parent` in four atom stories: tabs with `role="tab"` rendered without a `role="tablist"` parent;
- one contrast failure: a subtle accent status inside a subtle tab, at 4.47:1. This is the accent-on-tint problem in the palette backlog (HANDOVER).

## Problems found

1. **Selection can be invisible or weak.**
   - A plain underline list hides the indicator, leaving bold type as the only sign of the current page.
   - A plain segmented list draws the indicator as a 5% tint, about 1.07:1.
   - Neither meets 3:1 for the state indicator (WCAG 1.4.11), and weight alone is a weak cue.
2. **Forced colours remove the indicator.** It is a `background-color` on `::before`, which forced colours repaint as Canvas. A selected segmented tab also loses its fill and keeps only its weight.
3. **Without anchor positioning, a selected segmented `<button>` tab is invisible.** `.tabs-button .tab:not(a)` sets the selected background to transparent unconditionally and relies on the anchored indicator. Without anchor support, the inverted text sits on the page at 1:1.
4. **Hover changes the text colour to accent.** It passes on the page (4.94:1). On a subtle segmented tab it lands at 4.497:1, and it differs from button, whose hover changes the fill, not the text.
5. **Small and vertical tabs have no hit-area buffer.**
   - `.tabs-sm` and compact tabs are 32px, visual and target alike, which breaks the PRINCIPLES §2 rule that a smaller size keeps a 48px target.
   - Vertical tabs are 32px at the *default* size: their minimum comes from `--button-sm-min-size`.
6. **Axes are scattered over two class families.**
   - Prominence, size and corners exist as per-tab modifiers (`.tab--subtle`) and as list classes (`.tabs-subtle`). The indicator belongs to the list, so a per-tab `--round` or `--sm` inside a list that lacks it draws an indicator of the wrong shape.
   - Layout modifiers of the list (`vertical`, `floating`, `scrollable`, `flush`) use the `.tabs-*` prefix rather than BEM `.tab-list--*`.
7. **"Button" tabs are a second style, not an axis value.** An underline list and a segmented control serve different needs (navigation versus switching a view), but `.tab--button` sits beside the prominence modifiers as if it were one of them.
8. **`[aria-current]` matches `aria-current="false"`.** The selected selector includes bare `[aria-current]`, so `aria-current="false"` (valid ARIA) renders as selected. The hover exclusion lists only `aria-selected="true"` and `aria-current="page"`, so `location` and `true` tabs still change colour on hover.
9. **The molecule knows its parents.** `.tabs-flush` reads card and sidebar private variables (`--_card-padding`, `--_sidebar-padding`) and sets `--_button-marg`. A molecule must not depend on the organisms that contain it.
10. **Legacy names still in use:**
    - `.tabs` and `.tabs__panel` (73 story and 17 blog uses);
    - the unused `.tabbed-content__panel` alias;
    - the `tabs.css` forwarder;
    - the flags `--tabs-variation`, `--tab-variation` and `simple`, the `--tab-simple-*` tokens, and `--ui-density: dense`.
11. **Token rules broken.**
    - Tier 1 references in component CSS: `--spacing-8|12|16|24|32`, `--typography-font-size--1`.
    - `--tabs-sm-min-size` is a literal `2rem`.
    - Tier 3 is named `tabs.*` for both atom and molecule.
    - Plain tabs dim icons to 50% opacity.
12. **Story problems.**
    - Captions are swapped: the subtle navigation story is labelled "Plain", and the plain segmented story is labelled "Subtle".
    - The "round" segmented story is not round.
    - Atom stories use `role="tab"` without a tablist.

What already works:
- the sliding indicator is shared through `anchor-scope`, so lists never interfere;
- `<ul>`/`<li>` navigation works through `display: contents`;
- the label-collapsing presentation axis (`--ui-labels: hidden`, `.hide-labels`, `.tab--icon`) keeps the text for assistive technology;
- the scrollable list fades its edges with a scroll-driven mask;
- panels have a focus ring.

## Questions

1. **One place for the axes: the list.** The indicator lives on the list, so prominence, size and corners must apply to the whole list. Make them list modifiers, with matching flags for zero-class orchestration:

   | Axis | Modifier | Flag |
   | :--- | :--- | :--- |
   | Style | `.tab-list--segmented` | `--tab-list-style: segmented` |
   | Prominence | `.tab-list--subtle`, `--plain` | `--tab-list-prominence` |
   | Size | `.tab-list--sm` | `--tab-list-size: sm`; compact steps to it |
   | Corners | `.tab-list--round` | `--tab-list-corners: round` |
   | Layout | `.tab-list--vertical`, `--end` (was `.tabs-on-right`), `--scrollable`, `--fill`, `--floating`, `--docked`, `--flush`, `--tight` | – |

   - The tab keeps one modifier, `.tab--icon` (presentation can differ per tab).
   - The per-tab `--button`, `--subtle`, `--plain`, `--sm` and `--round`, all `.tabs-*` classes, `.tabs-wrap` (wrapping is the default) and `.tabs-docked-top` (unused) are removed.
   - `.tabbed-content--vertical` and `--end` set the panel direction.

   *Recommended: yes.* The alternative keeps per-tab modifiers for parity with `.button--*`, at the cost of mismatched indicators.
2. **Segmented, not "button".** Rename the button style to `segmented`. It is a view switcher, not a row of buttons, and the new name stops it reading like a prominence value. *Recommended: yes.*
3. **Selection is always shown at 3:1.** Prominence changes the unselected tabs and the list's rule, never the selected tab:

   | Style | Default | `--subtle` | `--plain` |
   | :--- | :--- | :--- | :--- |
   | Underline | Rule under the list | – (not offered) | No rule |
   | Segmented | Outlined tabs | Tinted tabs, no border | No border, no fill |

   - In every variant the selected tab gets the solid indicator: a 2px foreground line (underline) or the strong fill (segmented).
   - The no-indicator plain navigation and the 5% plain segmented fill go.
   - Underline `--subtle` is dropped because it would equal `--plain`; current `.tabs-subtle` underline lists map to `--plain`.
   - Plain tabs stop dimming their icons.

   *Recommended: yes.*
4. **Hover changes the surface, not the colour.** Matching button:
   - underline tabs show a 2px line in `--border-color-control` (3:1) under the hovered tab;
   - segmented tabs show the translucent fill;
   - the text keeps its colour, which also removes the 4.497:1 accent-on-tint hover;
   - `--tab-hover-color` goes.

   *Recommended: yes.*
5. **Sizes and hit area.**
   - Default tabs are 48px in every orientation, so vertical tabs grow from 32px to 48px.
   - `--sm` is 32px with a 48px hit area through `::after`, unless the product opts into fine-pointer targets. Compact steps to `--sm`.
   - For a dense sidebar, use `--sm`, `.ui-compact` or `fine:ui-compact`.

   *Recommended: yes.*

### Fixes that need no decision

- Forced colours: draw the indicator in `Highlight`, and give a selected segmented tab a `Highlight` outline.
- Without anchor positioning, the selected tab draws its own indicator (underline border or segmented fill). It no longer forces a transparent background.
- Selected selector: `[aria-selected="true"]` and `[aria-current]:not([aria-current="false"])`, used the same way for hover.
- Flush: card and sidebar set a public `--tab-list-inset` on their flush bodies; the tab list reads only that.
- Tokens: split Tier 3 into `tab.*` and `tab-list.*`; remove the double names, Tier 1 references, the literal `2rem`, and the legacy flags and aliases. Delete `tabs.css`.
- Migrate `.tabs` → `.tabbed-content` and `.tabs__panel` → `.tab-panel` everywhere.
- Stories:
  - render atom stories inside a tablist;
  - fix the swapped captions and the round story;
  - rebuild them to the new API.
- AGENTS §24: rewrite. State that `.tabbed-content` needs the APG keyboard pattern (roving `tabindex`, arrow keys), which the consumer supplies.
- Docs site and blog: migrate the markup, port the SCSS, add the tokens and update the overview page.

## Migration done

All five questions were approved. One amendment: a plain list (underline `--plain` and segmented `--plain`) has no rule or border to set the selected tab against, so the selected tab is accent and bold as well as carrying the indicator.

### What changed

| Tier | Before | After |
| :--- | :--- | :--- |
| Axes | Per-tab `.tab--button|subtle|plain|sm|round` and list classes `.tabs-*` | On the list only: `.tab-list--segmented|subtle|plain|sm|round`, with flags `--tab-list-style|prominence|size|corners`. The tab keeps `.tab--icon`. |
| Layout | `.tabs-vertical|on-right|scrollable|wrap|fill|floating|docked|docked-top|flush`, `.tab-list--tight` | `.tab-list--vertical|end|scrollable|fill|floating|docked|flush|tight`. Lists wrap by default. `.tabbed-content--vertical|end` make the list vertical without a class. |
| Organism | `.tabs`, `.tabs__panel`, `.tabbed-content__panel`, `organisms/tabs.css` forwarder | `.tabbed-content`, `.tab-panel`. Forwarder deleted. |
| Tokens | 25 `tabs.*` tokens, read with `--tab-*` → `--tabs-*` double fallbacks | `tab.*` (15), `tab-list.*` (14), `tabbed-content.gap`. No Tier 1 references or literal `2rem` in the CSS. |
| Flush | Read `--_card-padding` and `--_sidebar-padding` | Reads `--tab-list-inset`, which `.card__body--flush` and `.sidebar--flush` set |

Behaviour:
- **Selected:** `[aria-selected="true"]` or `[aria-current]:not([aria-current="false"])`.
- **Indicator:**
  - underline lists draw a line under the tab (on the inline end in vertical lists, on the start with `--end`); plain lists draw it in accent;
  - segmented lists draw a fill behind the tab: foreground for outline and subtle, a tint for plain.
- **Fallbacks:**
  - Without anchor positioning, the selected tab draws its own line or fill.
  - In forced colours the indicator is `Highlight`, and a selected segmented tab's text is `HighlightText`.
- **Hover:** a `--border-color-control` line under an underline tab; a tint on a segmented tab. The text colour never changes, and `--tab-hover-color` is gone.
- **Size:** 48px in every orientation. `--sm` is 32px with a 48px hit area through `::after`, and compact steps to `--sm`.
- **Icons:** plain tabs no longer dim them.

### Measurements

Light / dark, against the page (Storybook, Chrome).

| | Underline | Underline `--plain` | Segmented | Segmented `--subtle` | Segmented `--plain` |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Unselected text | 7.65 / 13.17 | 7.65 / 13.17 | 7.65 / 13.17 | 6.96 / 11.42 | 7.65 / 13.17 |
| Selected text (on its indicator) | 7.65 / 13.17 | 4.94 / 9.55 | 8.33 / 16.43 | 8.33 / 16.43 | 6.84 / 5.02 |
| Indicator against the page | 7.65 / 13.17 | 4.94 / 9.55 | 7.65 / 13.17 | 7.65 / 13.17 | 1.21 / 1.36 |
| Hover cue | line 3.39 / 6.79 | line 3.39 / 6.79 | text on tint 6.96 / 13.2 | text on tint 5.77 / 11.64 | text on tint 6.96 / 13.2 |

- Segmented `--plain` uses `--foreground-accent-pressed` for the selected text, because the rest accent falls under 4.5:1 on the tint. Its indicator is the tint (1.21 / 1.36). The accent colour and bold weight carry the state, as agreed.
- Height and hit area: 48 / 48 by default, 32 / 48 for `--sm` and compact, in every orientation.

### Checks

- Axe, light and dark: every tab, tab list and tabbed content story is clean. The earlier `aria-required-parent` failures are gone, because the atom stories now render inside a tablist. The remaining failures in the layout, header and dashboard stories that use tabs predate this pass and are not in tab markup: duplicate landmarks in demos, heading order, a warning status at 4.25:1.
- Forced colours (emulated): indicator `Highlight`; selected segmented text `HighlightText`.
- Docs site build passes.

### Caveats

- **Build gotcha.** The Storybook build drops an at-rule nested inside a nested pseudo-element rule (`&::before { @container … }` compiles to an empty selector). The list's indicator rules are therefore top level.
  - The same bug already breaks the forced-colours rule on the status dot (`atoms/status.css`) and a reduced-motion rule on the spinner. Fix those in their passes.
- **Native nesting order.** A declaration after a nested rule keeps its source order. Flag blocks therefore set only private variables, as in button.
- **Theme gotcha.** A theme that sets a radius token to a unitless `0` breaks `calc()` and `max()` on it. The blog's `--radius: var(--radius-0)` resolves that way. The tab list avoids math on token radii except the floating bar's concentric radius, which falls back to square.
- **Untested:**
  - the anchor-positioning fallback, since Chrome supports anchors;
  - Firefox and Safari.
- **Story IDs changed:**
  - `atoms-tab--all-variants`, `--subtle-button`, `--plain-button` and `--plain-nav` are replaced by `--states`, `--content` and `--hidden-labels`;
  - the tab list and tabbed content stories were rebuilt with new names (see the Storybook index).
