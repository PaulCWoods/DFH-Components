# Print and busy states: plan

Two capabilities to add before the sites are rebuilt on the library: printing that works without per-site CSS, and feedback while something is in progress. Both were raised on 8 Nov 2026 and planned on 9 Nov. The Course is the main consumer: its lesson page is the print stress test, and it needs busy states.

## Decisions

| Question | Decision |
| :--- | :--- |
| Print helpers | `print:hide` and `print:keep`, following the library's `condition:` helpers (`max-md:hide`). Not `no-print` or `print`; no `print:show`, since the utilities pass removed `{condition}:show`. |
| How `print:keep` works | Each component that hides itself in print writes the hide so a kept one opts out: `@media print { :where(.x):not(:where(.print\:keep)) { display: none; } }`. Specificity stays zero; the component owns the rule, the utility names the exception. A `display` utility can't do it: `revert-layer` from the utilities layer falls back to the component's own print hide. |
| Tabbed Content in print | Only the open panel prints. Panels already use `hidden`, so this is the default with no rule. |
| Spinner | A sprite icon turned with CSS, not a border ring or an animated SVG. The symbol is `LoaderArc` (a quarter arc, added and synced 9 Nov). Markup: `<svg class="icon spinner" aria-hidden="true"><use href="#LoaderArc"/></svg>`. The Icon gives size and colour; `.spinner` adds the turn. |
| What the spinner says | Nothing. It is always `aria-hidden`; the words go in a `role="status"` region. |
| Busy Button | The spinner sits over the label, which is hidden but kept, so the Button never changes size. It never replaces the Button's icon: a Button may have none, and busy doesn't predict the result. |

## Print

### What the library does in `@media print`

**Colour and surface**
- Print in the light scheme (`color-scheme: light` on `:root`), whatever the screen uses.
- No backgrounds or shadows on surfaces; a Card, Banner or Poster that relied on a fill gets a border instead (Prose and Code Block already do this).
- Text at full contrast; intents keep their icon or words, since colour may print grey.

**Position**
- Sticky and fixed parts become static: Header, Banner Dock, Table's sticky head and foot, Sidebar, App shell (`.app--viewport`, `.main--viewport` let the page run to its full length).
- Scroll containers drop their overflow so nothing is cut off: `.table-container`, `.card__body--scrollable`, `.grid--carousel` (wraps as a grid).

**Hidden by default** (each can be kept with `print:keep`)
- Skip Link, Header navigation, Sidebar, Banner Dock, Toast stack, Batch Actions, Pagination, Menu, Popover, Tooltip, Combobox list.
- The Tab List of a Tabbed Content, except its selected tab, which prints as a label above the open panel.

**Breaks**
- `break-inside: avoid` on Card, Banner, Figure, table rows, Code Block (where shorter than a page), Field.
- `break-after: avoid` on headings and on `.card__header`.
- Table head repeats on each page (`thead { display: table-header-group }`, the browser default once sticky is off).

**Prose**
- Link addresses after links: `a[href^="http"]::after { content: " (" attr(href) ")" }`, not for links whose text is already the address or that point within the page.
- Abbreviations' titles printed the same way, if `abbr[title]` is used.

### New utilities
- `print:hide`: `display: none` in print.
- `print:keep`: no declarations of its own; a hook the components' print rules check.

Both go in the utilities stylesheet beside the responsive helpers, documented in Responsive Helpers, and `check:utilities` learns the `print:` condition.

## Busy states

### Spinner (atom)
- `.spinner` on an `.icon` holding `#LoaderArc`: `animation: spin` with `transform: rotate()`, which runs on the compositor.
- Its own duration token (`spinner.duration`), not a motion role: reduced motion sets every duration role to 0, which would freeze it, and a still spinner looks broken. Under `prefers-reduced-motion: reduce` it turns slowly instead (a second token or a multiplier).
- Forced colours: nothing extra, since it is `currentColor`.
- Sizes: the Icon's (`--icon-size`), so it matches the text or control it sits in.

### Busy Button
- Hook: `.is-busy` (matching `.is-active`) with `aria-disabled="true"`, so the Button stays focusable, can't be pressed again, and screen readers say it's unavailable.
- The spinner goes in the Button's markup (`<svg class="icon spinner button__spinner" aria-hidden="true">`), centred over the label; `.is-busy` hides the label and icon with `visibility: hidden`, so the width holds and the name stays in the accessibility tree.
- The product announces: a `role="status"` line says "Saving…", then "Saved" or the error. The Button announces nothing itself.
- Works with every prominence, intent and size; the spinner takes the Button's text colour.

### Busy regions
- `aria-busy="true"` on a Card, Table or panel while its content reloads. A rule dims it slightly (no pointer events) so it reads as busy; screen readers wait for the update.
- Skeleton stays the choice when the layout is known; the Spinner, with a status line, when it isn't.
- An optional overlay pattern: a Spinner centred over a busy region, in the Empty State or Card docs, if the stories show it's needed.

## Deliverables

| Area | Work |
| :--- | :--- |
| Icons | `LoaderArc` symbol (done, synced), Figma icon page |
| CSS | `atoms/spinner.css`; `.is-busy` in `atoms/button.css`; `[aria-busy]` rule; `@media print` blocks in each component listed above; `print:hide`, `print:keep` in utilities; print basics in `reset.css` |
| Tokens | `spinner.duration` (and the reduced-motion one) in `3-component.json` with CSS fallbacks; `check:tokens` |
| Docs | New Spinner page (atom); Button page gains a busy example; Responsive Helpers gains the print helpers; a Print section (in Responsive Helpers or its own page) saying what the library does by default; Skeleton and Progress pages link to Spinner |
| Stories | Spinner (sizes, in a status line, reduced motion); busy Button across prominences; a busy Card; print stories rendered with print emulation |
| Checks | `check:focus` (busy Button stays focusable); `check:targets` (unchanged size); a new `check:print` (built Storybook, print media emulated) that fails on fixed or sticky elements, clipped overflow and content wider than the page |
| Figma | Spinner component (icon instance), busy variant on Button (`State=Busy` or a boolean `Busy`) |
| Sites | The Course's lesson page printed as the test; the Course's busy Buttons |

## Settled later (9 Nov)
- **The tab name in print:** the Tab List prints the selected tab alone, as a label above the open panel; the other tabs are hidden.
- **Buttons in print:** left as they are. Bars that hold actions (Batch Actions, Header navigation) are already hidden.
- **The print check:** a separate `npm run check:print`, so a failure says it's a print problem. Under print emulation it fails on fixed or sticky elements, clipped overflow and content wider than the page.

## Progress

**Busy states (9 Nov):**
- `atoms/spinner.css` (imported after Skeleton); `spinner.duration` (`{duration.1}`) and `spinner.reduced-duration` (`{duration.2}`) in Tier 3, `check:tokens` passing.
- `atoms/button.css`: §9 Busy State. The Spinner is hidden in a Button until `.is-busy`, then centred over the contents, which fade to `opacity: 0` (kept in the accessibility tree, unlike `visibility: hidden`) except corner Badges. `.is-busy` cancels the `aria-disabled` dimming; in forced colours it keeps `ButtonText`/`ButtonBorder`, not `GrayText`. A Spinner no longer counts as the Button's icon (icon-only collapse) or stops a lone label being centred.
- `reset.css`: `[aria-busy="true"]` recedes to `--opacity-muted` with a progress cursor, unless it holds a Skeleton or a Spinner outside a Button. No new Tier 2 token.
- No `pointer-events` change: `aria-disabled` already blocks the pointer; the product ignores keyboard presses while busy.
- Docs: new Spinner page (`38-spinner.md`); Button gains "Show an action in progress", a keyboard note, a State row and a Do/Don't row; Skeleton, Progress and Icon link to Spinner. Shared skills `composition` and `ui-guidance` mention both.
- Stories: Atoms/Spinner (Playground, Beside Text, In A Region, Reloading); Button › Busy.
- Gates: `check:focus` and `check:targets` pass on `^atoms-(button|spinner)`.
- Figma (9 Nov): `Icon/Loader Arc` glyph on DFH Semantics (between List and Lock); a Spinner page after Skeleton with a `spinner` set (cloned from `icon`: Size × Intent, glyph fixed, doc link); Button set gains `Busy` (False on all 156, 12 sparse True variants: Size Default × Prominence × Intent, label and icons at opacity 0, Spinner centred and absolute). Not added: the Spinner on the DFH Components overview page.
