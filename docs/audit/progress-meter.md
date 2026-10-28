# Progress and meter: usage inventory

Covers two atoms in one file, `atoms/progress.css`: `<progress>` (how far a task has got) and `<meter>` (a measurement within a known range, such as disk use). Neither is interactive, so the hit-area rules don't apply. The `.field` molecule they sit in gets its own pass.

Counts cover Storybook stories, the docs site and AGENTS.md ("library"), and the blog templates ("blog").

## The CSS

| File | Lines | Selector |
| :--- | ---: | :--- |
| `atoms/progress.css` | 294 | `.progress` **and** every `progress`; `.meter` **and** every `meter` |

Blog: `library/atoms/_progress-meter.scss`.

## Usage

| | Library | Blog |
| :--- | ---: | ---: |
| `<progress>` | 35 (28 stories, 7 AGENTS) | 4 |
| `<meter>` | 51 (45 stories, 6 AGENTS) | 5 |
| Indeterminate progress (no `value`) | 9 | 1 |
| Element with no class (styled only by the bare selector) | 8, all in stories | 0 |

The deck recipe accounts for 15 meters (`meter--sm deck__meter-bar`). The docs site has no progress or meter page.

### Modifiers in use

| Class | Library | Blog |
| :--- | ---: | ---: |
| `.progress--sm` | 4 | 1 |
| `.progress--lg` | 2 | 0 |
| `.progress--success` | 3 | 0 |
| `.progress--warning` | 2 | 0 |
| `.progress--danger` | 2 | 1 |
| `.progress--subtle` | 1 | 0 |
| `.progress--accent` (not defined in the CSS) | 1 | 0 |
| `.meter--sm` | 22 | 2 |
| `.meter--lg` | 2 | 0 |
| `.meter--success`, `--warning`, `--danger` | 1, 1, 2 | 0 |

Container flags read but never set anywhere: `--progress-size`, `--progress-variant`, `--progress-tone`, `--meter-size`. The CSS also reacts to `.controls-sm` and `.controls-lg` ancestors and to the legacy `--ui-density: dense`.

## Measurements

Fill against track and against the page (`--surface-muted` track, story stage background):

| Fill | Light: track / page | Dark: track / page |
| :--- | :--- | :--- |
| Accent | 4.24 / 5.38 | 7.36 / 11.91 |
| Info | 3.86 / 4.90 | 7.64 / 12.36 |
| Success | 4.54 / 5.77 | 7.23 / 11.70 |
| Warning | 3.56 / 4.52 | 7.96 / 12.87 |
| Danger | 4.86 / 6.17 | 6.41 / 10.36 |
| Muted (`--subtle`) | 4.88 / 6.21 | 5.27 / 8.53 |
| **Empty track against page** | **1.27** | **1.62** |

Every fill clears 3:1. The empty track does not, so the full length of the bar is hard to see.

Axe (12 progress and meter stories, light and dark): one finding, the amber warning text in a status chip (4.25:1), which is the open palette issue in HANDOVER.

## Problems found

1. **Bare element selectors.** Every `progress` and `meter` is styled whatever its class, the pattern the form-controls pass removed.
2. **The meter fill is thinner than its track in Blink and WebKit.** The browser's own `::-webkit-meter-bar` keeps its default inner size, so the coloured value sits as a thin line along the top edge and is not rounded. Progress is unaffected.
3. **Meter intent modifiers defeat the native ranges.** `<meter>` already colours itself from `low`, `high` and `optimum`: green in the good range, amber in the next, red in the worst. `.meter--danger` paints all three red, so the colour no longer follows the value. The "Explicit Override" story shows a red bar at 40% with no reason given.
4. **A meter without thresholds always reads as success.** With no `low`/`high`/`optimum` the browser treats every value as optimum, so a plain measurement (for example "12 of 40 seats") is drawn green, as if it were good news.
5. **`--subtle` sets a colour, not a prominence.** It turns the fill grey. On the shared axes that is neutral intent, not subtle prominence.
6. **Intent set is incomplete and off-axis.** Progress has success, warning and danger but no info. `.progress--accent` is used but doesn't exist (accent is already the default). Flags use the old names `--progress-variant` and `--progress-tone`.
7. **The reduced-motion block is dropped entirely.** Its selector list mixes `::-webkit-…` and `::-moz-…` pseudo-elements. A browser that doesn't know one of them drops the whole rule, so in every browser the transitions stay on. It also uses five `!important`s.
8. **Reduced-motion indeterminate looks like a full bar.** Without animation the indeterminate state becomes a solid bar at 60% opacity across the whole width, which reads as "complete".
9. **Size hooks are inconsistent.** Size answers to `--progress-size`, `.controls-sm` and `.controls-lg` ancestors, compact and dense. Meter has no `sm`/`lg` height tokens, so it falls back to Tier 1 spacing.
10. **Token rules broken.** Hex fallbacks (`#E6E4DF`, `#008076`, `#00875a`, …) and direct Tier 1 references (`--spacing-4`, `--spacing-8`, `--spacing-16`).
11. **AGENTS guidance is wrong in two places.** It puts `aria-busy="true"` on the indeterminate `<progress>`; `aria-busy` belongs on the region being loaded, not on the progress bar. And most examples have no accessible name (the label sits nearby but isn't tied to the element).

What already works: Blink fills both elements from the correct side in right-to-left text; the fallback text inside the element (`68%`) is right; transitions on value changes are smooth.

## Questions

1. **Classes only.** Style `.progress` and `.meter` only, as with the form controls, and let the reset give bare elements their browser rendering (`all: revert`, added to the existing rule). Eight story elements need a class. *Recommended: yes.*
2. **Progress intent matches range.** Accent by default; `--info`, `--success`, `--warning`, `--danger` as modifiers, plus a `--progress-intent` flag. Remove `--subtle` (1 use) and the phantom `--accent` (1 use). If a grey bar is wanted later, it would be a neutral intent across all atoms, not a one-off here. *Recommended: yes.*
3. **Meter colour comes from the value, not a class.** Remove `--success`, `--warning` and `--danger` from meter. With `low`/`high`/`optimum` set, the native ranges colour it (success, warning, danger). With none set, it is a plain measurement and fills in accent, the same as progress (fixes problem 4). *Recommended: yes.* Either way, the value must also be stated in text (WCAG 1.4.1).
4. **The empty track.** The track is 1.27:1 against the page. Options:
   - (a) Leave it, and require a visible text value (label plus readout) for every bar. The bar then supplements the text rather than carrying the information alone, so the 3:1 rule (1.4.11) doesn't apply to it. Keep the existing high-contrast outline under `prefers-contrast: more`.
   - (b) Give the track a 3:1 inset edge from `--border-color-control` at all times.

   *Recommended: (a).* It matches how the bars are already used, and an edge on a 4px bar is heavy. The rule goes into PRINCIPLES.
5. **Size and flags.** Keep 4px (`--sm`), 8px (default), 16px (`--lg`). Flags `--progress-size` and `--meter-size`; a compact container steps both to `--sm`. Drop the `.controls-sm`/`.controls-lg` ancestor hooks and `--ui-density`: these aren't controls, and `--controls-size` would only make them follow form controls by accident. *Recommended: yes.*
6. **Corners.** Today the radius is `--radius` (4px), which is almost a pill on an 8px bar but square on a 16px one. Options:
   - (a) Add `--round` and a `--progress-corners` / `--meter-corners` flag, as on the other atoms.
   - (b) Always fully round.

   *Recommended: (a)*, for consistency with button, input, status and the rest.
7. **Indeterminate under reduced motion.** Replace the 60%-opacity full bar with a static diagonal hatch across the track. It reads as "working, amount unknown" and can't be mistaken for complete. *Recommended: yes.*

### Fixes that need no decision

- Make the meter fill fill the track's height in Blink and WebKit (`::-webkit-meter-bar` sizing), and round it.
- Split the reduced-motion selector list so each vendor pseudo-element has its own rule, and remove the `!important`s.
- Remove hex fallbacks and Tier 1 references; add `meter.sm-height` and `meter.lg-height` tokens.
- Remove the legacy `--progress-variant`, `--progress-tone` and `--ui-density: dense` hooks.
- Run the indeterminate animation in the reading direction (it always sweeps left to right, even in right-to-left text).
- AGENTS §25: drop `aria-busy` from the progress element and show where it goes; give every example an accessible name (`<label for>` or `aria-labelledby`).
- Stories: rename "Explicit Override", give the eight unclassed elements a class, and add a right-to-left story.
- Blog: port to `_progress-meter.scss`, add the Tier 3 tokens, update `_component-library.twig`.

## Migration done

All seven answers and the fixes that need no decision are in. The library and the blog match.

### What changed

- **Classes only.** `.progress` and `.meter` are styled; bare elements keep browser rendering (the reset's `all: revert` rule now covers `progress` and `meter`).
- **One shared base** (`:where(.progress, .meter)`) for size, corners, track and the high-contrast outline. Progress and meter keep only their fills.
- **Progress intent** matches range: accent default, `--info`, `--success`, `--warning`, `--danger`, flag `--progress-intent`. `--subtle` and `--accent` are gone.
- **Meter colour follows the value.** The intent classes are gone. With thresholds the native regions pick success, warning or danger; with none (`:not([low], [high], [optimum])`) the meter fills in accent.
- **Meter fill fixed in Blink and WebKit.** `::-webkit-meter-bar` needs an explicit length (`var(--_bar-height)`); a percentage height doesn't resolve, which is what left the value at half height along the top edge.
- **Size and corners:** `--sm`, `--lg`, `--round`; flags `--progress-size`, `--meter-size`, `--progress-corners`, `--meter-corners`; compact steps to `--sm` and `--lg` back to default. The `.controls-*` hooks and `--ui-density` are gone.
- **Indeterminate** sweeps in the reading direction; under reduced motion it shows a static hatch. The reduced-motion rules now apply (one vendor pseudo-element per selector, no `!important`).
- **Tokens:** hex fallbacks and Tier 1 references removed; `meter.sm-height`, `meter.lg-height` and `meter.transition` added; `progress.fill-bg` removed.
- **Rules recorded:** PRINCIPLES §9 (track contrast, no meter intent); AGENTS §25 rewritten, with a "Removed" row in the legacy table.
- **Stories** rewritten: Progress (Playground, Sizes, Intents, Indeterminate, Corners, ContainerFlags, Direction) and Meter (Playground, Ranges, PlainMeasurement, Sizes, Direction). Every bar is named and states its value as text.

### Axe (progress, meter, and the recipes that use them; light and dark)

The two atoms are clean. Remaining findings are older and in the deck recipe (out of core): amber warning text in a status (4.25:1, the palette issue) and `aria-label` on a `div` with no role.

### Caveat

Firefox and Safari weren't available to test. The Gecko rules (`::-moz-progress-bar`, `:-moz-meter-*`) follow the documented pseudo-elements; check them in Firefox when convenient.

