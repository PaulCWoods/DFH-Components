# Surfaces: card, section and the dialog shell

Covers the surface that other components compose:
- the card molecule (`.card`), moved from `organisms/` to `molecules/` at the start of this pass (PRINCIPLES §9);
- the section organism (`.section`), included because it shares card's part and modifier names;
- the dialog organism (`.dialog`), for the part that wraps and restyles a card.

Counts cover Storybook stories, the docs site, `docs/markup/` and the blog templates.

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `molecules/card.css` | 856 | `.card` and 16 modifiers; 13 parts (`__content`, `__header`/`__head`, `__hgroup`, `__header-line`, `__title`, `__subtitle`, `__link`, `__band`, `__body`, `__footer`/`__foot`, `__thumb`, `__canvas`, `__date`) with their own modifiers |
| `organisms/section.css` | 80 | `.section`, `--flush`, `--compact`, `--plain`, `__header`, `__body`, `__footer` |
| `organisms/dialog.css` | 324 | `dialog` (bare element), `.dialog`, `--scrollable`, `--drawer`; 15 rules that reach into `.card` and its parts |

Tier 3: `card.*` (37 tokens), `dialog.*` (12), none for section. The card CSS reads 64 `--card-*` names, so about half of its customisation points have no token.

## Usage

| Class | Stories | Docs | Markup | Blog |
| :--- | ---: | ---: | ---: | ---: |
| `.card` | 450 | 14 | 35 | 39 |
| `.card__content` | 153 | 5 | 17 | 19 |
| `.card__header` / `__head` | 138 / 0 | 6 | 19 | 18 |
| `.card__hgroup`, `__title`, `__subtitle` | 50, 163, 72 | 1, 0, 1 | 9, 18, 9 | 11, 21, 11 |
| `.card__body` | 140 | 5 | 17 | 18 |
| `.card__body--flush`, `--scrollable` | 23, 0 | 1, 1 | 3, 1 | 2, 0 |
| `.card__footer` / `__foot`, `__footer--flush` | 67 / 0, 1 | 1 | 11, 1 | 10, 1 |
| `.card__band`, `--subtle`, `--ruled`, `--flush` | 5, 3, 1, 0 | 1, 0, 0, 1 | 1, 1, 0, 0 | 3, 2, 0, 0 |
| `.card__link` | 13 | 0 | 4 | 2 |
| `.card__thumb`, `__date`, `__header-line`, `__canvas` | 4, 6, 1, 0 | 0, 0, 0, 1 | 2, 1, 1, 0 | 3, 0, 0, 0 |
| `.card--bordered` | **359** | 13 | 18 | 32 |
| `.card--compact` | 54 | 1 | 16 | 6 |
| `.card--ruled` | 30 | 2 | 12 | 8 |
| `.card--translucent` | 13 | 2 | 4 | 2 |
| `.card--flush` | 7 | 3 | 1 | 0 |
| `.card--bands`, `--panel`, `--scrollable`, `--sticky-header`, `--sticky-footer`, `--dynamic-corners` | 1 each | 0 | 0–1 | 0–1 |
| `.card--interactive` (not defined anywhere) | 0 | 1 | 0 | 0 |
| `.dialog`, `--drawer`, `--scrollable` | 17, 4, 2 | 1, 0, 0 | 3, 0, 1 | 2, 1, 0 |
| `.section` and parts | 7 (one story file) | 0 | 0 | 0 |

Defined but unused: `.card--hollow`, `.card--plain`, `.card--dense`, `.card--sizes-fixed`, `.card--sizes-cq`, `.card__head`, `.card__foot`, `.card__band--bordered`, `.section--compact`, `.section--plain`; the flags `--card-density`, `--card-font-sizing`, `--card-dir: row`, `--dialog-scroll`.

The blog's 42 `.section` uses are its own component (`dfh/components/_section.scss`), unrelated to the library's. The library section has no blog port.

About two in three cards skip `.card__content` and put the parts straight in `.card`; the rest wrap them. Both structures are supported.

## Measurements

Light and dark, against the page (`--surface`).

| | Light | Dark |
| :--- | ---: | ---: |
| Card surface vs page | 1.09 | 1.25 |
| Card border (`--panel-border-color`, 30% of text) on the card | 1.95 | 2.71 |
| Same border against the page | 1.79 | 2.17 |

- The default card has **no border** (`card.border-width` is 0) and a small shadow. Its edge against the page is 1.09:1 in light mode, so the shadow is all that marks it. That is why 359 story cards add `--bordered`.
- In dark mode the card surface (`#181716`) is **darker** than the page (`#2B2A27`): a raised card sinks.
- A card isn't a control, so its edge needn't reach 3:1 (WCAG 1.4.11 covers controls and graphics needed to understand content). A linked card's target is its link, whose focus ring is drawn on the card's perimeter.
- In forced colours the shadow is removed and the background becomes Canvas, so a default card has no boundary at all.

Axe was not run in this audit (no Playwright in the repo). It runs in the verify step.

## Problems found

### Card

1. **The default is the variant nobody uses.** The default card is a fill with no border, almost invisible against the page; `--bordered` is on nearly every card. The default should be the common case.
2. **Prominence is spread over six overlapping modifiers.**
   - `--bordered` (border), `--hollow` (border, no fill), `--plain` (no fill, no border, no shadow), `--flush` (like plain, plus no padding), `--translucent` (glass fill), `--panel` (a layout behaviour, not a look).
   - `--flush` and `--plain` share one rule; `--hollow` and `--bordered` share another. None maps to the shared axis (default, `--strong`, `--subtle`, `--plain`).
3. **Two structures, held together with negative margins.** Parts work as direct children of `.card` and inside `.card__content`. Every part carries rules for both, and most pull themselves back out with `calc(var(--_card-padding) * -1)`. `.card__content` exists to create the container for `cq` type and to sit beside media in a row card.
4. **Legacy density still wired in.** `--dense`, `.ui-dense`, `--card-density: compact` and `style(--ui-density: dense)` sit beside `--compact`. `--dense` leaves type alone; `--compact` steps it down. PRINCIPLES §9 has settled this: compact only.
5. **Typography on the surface.** `.card__body` sets `font-size`, `line-height` and `color`; `.card__date` sets a weight; `.card__link .icon` sets a size. The Organism-Atom law reserves typography for the text atoms. Tier 3 also holds `card.compact.title.*`, `card.compact.subtitle.*`, `card.body-font-size` and `card.foot-font-size`, which the token-economy rule forbids (and the CSS no longer reads most of them).
6. **Font-sizing modes posing as variants.** `--sizes-fixed` and `--sizes-cq` change padding, not sizing mode. `--sizes-cq` reads `var(--spacing-)`, a name that doesn't exist, so its padding is invalid. Sizing modes belong to `.font-sizing-*`.
7. **The card link duplicates the link atom.**
   - `.card__link` is accent-coloured, underlines on hover and stretches over the card. That is `.link.link--plain.link--stretched`, which the link pass created for this case.
   - card.css still names `.link--stretch`, removed in the link pass.
8. **A loading state that announces "Loading" from CSS.** `.is-loading` on a linked card draws an overlay and puts the word "Loading" in generated content (spoken by some screen readers, never translated). It works only on linked cards. The skeleton pass settled loading cards: `aria-busy` with a `role="status"` message.
9. **Four ways to scroll.** `--panel` (body scrolls, header and footer pinned, inside a full-height pane), `__body--scrollable` (body scrolls, with a max height), `--scrollable` with `--sticky-header`/`--sticky-footer` (content scrolls, header and footer stick), plus dialog's own (below). Each has one use or none. `--panel` and `__body--scrollable` unpin on `(width < 48em) or (height < 36em)`, a viewport query PRINCIPLES §1 allows only in the app shell.
10. **Bands and rules overlap.** `--ruled` draws rules between parts and pads the body; `--bands` pads the body without rules; `__band--ruled` and `__band--bordered` are one rule under two names.
11. **Aliases and dead names:** `__head`/`__header`, `__foot`/`__footer`, their `--flush` pairs, `__band--bordered`, `.card--interactive` (docs only, never defined), `__canvas` (one docs use).
12. **Card knows the button.** `--dynamic-corners` computes the radius from `--button-radius` and `--button-min-size`. The idea (an outer radius concentric with the controls inside) is sound, but a molecule shouldn't read an atom's private sizing, and it has one use.
13. **Token rules broken.**
    - Tier 1 in component CSS: `--typography-font-size-0`, `--spacing-4`, `--spacing-8`, `--color-overlay`.
    - Literal fallbacks: `rgba(0, 0, 0, 0.02)`, `black`, `0.25rem`, `2rem`, `0.8s`.
    - `color-mix(in srgb, …)` for translucency (HANDOVER: move to `in oklch` when touched).
14. **Leaks out of the component.** card.css declares a global `@keyframes spin` and sets `:root { --card-transition: 0s }`.

### Section

15. **Section isn't a surface.** It's page rhythm: a top rule, block spacing and `scroll-margin` for anchor links. It shares card's part names and two modifier names (`--flush`, `--plain`) with different meanings.
16. **It knows the header.** Its scroll margin reads `--header-height`.
17. **Its name collides with the blog.** The blog has its own `.section` with different rules. If the blog ever loads the library's, the two fight.
18. Tier 1 references (`--spacing-4`, `--spacing-8`, `--spacing-16`) and seven uses, all in its own story.

### Dialog (shell)

19. **It restyles the card it wraps.** `dialog > .card` sets `border-radius`, `border` and `box-shadow` from dialog tokens that fall back to card tokens. With card now a layer below, this works, but it's the coupling this pass set out to remove: the dialog should configure the card through card's flags (`--card-radius`, `--card-shadow`) and leave the properties to card.
20. **It styles the bare element.** `:where(dialog.dialog, dialog)` styles every `<dialog>`, class or not. Form controls are styled by class only (PRINCIPLES §9).
21. **Three ways to scroll the whole card:** `.dialog--scrollable`, a `.card--scrollable` inside, and the `--dialog-scroll: card | all` flag (unused).
22. **The drawer ignores direction.** It sits on the inline end, but slides in with `translateX(100%)`, so in right-to-left text it slides from the wrong side.
23. **A second surface for dialogs without a card.** `dialog:not(:has(.card))` paints its own background, border, radius, shadow and font, duplicating card.
24. Literal and Tier 1 fallbacks: `rgba(0, 0, 0, 0.5)`, `blur(4px)`, `28rem`, `90vb`, `--spacing-16`. `dialog.max-width` is a token the CSS never reads (it reads `--dialog-width`).

What already works:
- the stretched-link pattern: the card's focus ring is drawn on its perimeter, other controls in the card are lifted above the link's overlay, and hover raises the shadow only where hover exists;
- increased contrast thickens the border and drops shadows;
- the title and subtitle hooks already leave typography to the atoms;
- `.card__body--flush` hands the card's padding to a flush tab list through `--tab-list-inset` rather than the tab list reading card internals;
- the dialog uses native `<dialog>`, `@starting-style`, `allow-discrete` and a reduced-motion fallback, and sets its close button through button flags.

## Questions

1. **Card prominence on the shared axis.** Make the bordered card the default, and map the rest:

   | Modifier | Look | Replaces |
   | :--- | :--- | :--- |
   | (default) | Card surface and quiet border, no shadow | `--bordered`, `--hollow` |
   | `--subtle` | Tinted surface, no border | (new) |
   | `--plain` | No surface, border or shadow; keeps its padding | `--plain`, `--flush` (the look) |
   | `--strong` | Raised: surface and shadow, for cards that float (popover, menu, dialog, toast) | the current default |

   `--translucent` stays as a separate material modifier (it's used by floating cards). Flags: `--card-prominence`. *Recommended: yes.*

2. **One structure.** Choose one:
   - **(a)** Parts are direct children of `.card`; `.card__content` is used only beside `.card__thumb` (row cards and media). The negative margins go. Migrates 153 story uses and every dialog and popover example.
   - **(b)** `.card__content` is always required. Simpler CSS, but every card gains a wrapper.
   - **(c)** Keep both and tidy the CSS.

   *Recommended: (a).* The `cq` container moves to `.card` itself.

3. **Card link.** Remove `.card__link`; a linked card puts `<a class="link link--plain link--stretched">` in its title. Card keeps the hover, focus perimeter and lifted controls, keyed on `:has(.link--stretched)`. *Recommended: yes.*

4. **Loading.** Remove `.is-loading`; a loading card follows the skeleton contract. *Recommended: yes.*

5. **Scrolling.** Keep two, as part modifiers, with no viewport query:
   - `__body--scrollable`: the body scrolls between a pinned header and footer (replaces `--panel` and the dialog's default);
   - `--scrollable`: the whole card scrolls as one (replaces `--sticky-header`/`--sticky-footer` and `--dialog-scroll`; `.dialog--scrollable` sets it).

   *Recommended: yes.* The small-screen unpinning moves to the app shell, which may use viewport queries.

6. **Bands and rules.** Keep `--ruled` (rules between parts) and `.card__band` with `--subtle`; drop `--bands`, `__band--bordered` and `__band--ruled` (a ruled card already rules its bands). *Recommended: yes.*

7. **Concentric corners.** Drop `--dynamic-corners` (one use) until a second need appears, or make it a corners value (`--card-corners: concentric`) that reads a shared `--control-radius` token instead of button's. *Recommended: drop for now*, and revisit in the banner pass, which has the same modifier.

8. **Section.** It isn't a surface. Choose one:
   - **(a)** Remove it from the library; the blog keeps its own `.section`;
   - **(b)** Move it to `layout/` as a page-rhythm primitive, renamed to avoid the blog clash.

   *Recommended: (a).* Seven uses, all in its own story; `.stack` and a divider do the same job.

9. **Dialog.**
   - Style `.dialog` only, not bare `<dialog>`;
   - configure the inner card through card flags (`--card-prominence: strong`, `--card-radius`), never its properties;
   - one scroll model, from question 5;
   - fix the drawer for right-to-left text;
   - keep the no-card fallback, but drawn with the card tokens so there is one surface.

   *Recommended: yes to all.*

10. **Responsive prominence.** A card often wants no border, radius or shadow when it's narrow (on a phone, edge to edge) and its full look as space grows. Handle it the way DFH handles all component responsiveness, with container queries:
    - **Classes:** container-prefixed versions of the prominence modifier, `@max-xs:card--plain` and `@max-sm:card--plain` (and `--subtle` if a case appears). Each is the same private-variable map as its modifier, inside `@container (width < …)`. Prominence carries border, radius and shadow (question 1), so one class covers all three. Written desktop-first so that, with no container to query, the card keeps its full look.
    - **Flags:** a product sets `--card-prominence` inside its own container query for a whole list; card already honours the flag, so this needs no library code.
    - **Not** a viewport query (PRINCIPLES §1: a card in a narrow desktop sidebar has the same need as one on a phone), and **not** automatic (a narrow card in a sidebar or popover may keep its border).
    - **Prerequisite:** a size container to query. Today only `.split`, `.sidebar` and `.container-inline` are inline-size containers; `main`, `.app__workspace`, `.wrapper`, `.grid` and `.stack` are not, so the classes would match nothing in most layouts. Make `main` and `.app__workspace` inline-size containers by default. Leave `.grid` and `.stack` alone: `container-type: inline-size` stops an element shrinking to its content, which breaks them in flex rows.

    *Recommended: yes.* The container change is logged for the layout pass (HANDOVER backlog).

Settled without a question (PRINCIPLES already decides them): compact is the only density modifier; typography leaves the card (`__body`, `__date`, Tier 3 type tokens removed); `--sizes-*` removed; aliases removed; Tier 1 and literal fallbacks replaced; translucency mixes in OKLCH; the global keyframes and root token move out of the component.

Open, outside this pass: the dark-mode card surface is darker than the page. That is a Tier 2 surface decision for the colour palette tool (HANDOVER backlog).

All approved as recommended.

## Migration done

### CSS and tokens
- **`molecules/card.css`** (moved from `organisms/`; 855 lines down to 380):
  - Prominence on the shared axis: bordered default, `--subtle`, `--plain`, `--strong`, with the `--card-prominence` flag. `--translucent` stays as the material.
  - Parts are direct children of `.card`; `.card__content` is used only beside `.card__thumb`.
  - Scrolling: `__body--scrollable` and `--scrollable`.
  - `--ruled` and `.card__band` (`--subtle`).
  - Container-prefixed `@max-sm:card--plain` and `@max-xs:card--plain`.
  - `.card__link`, `.is-loading`, `--bordered`, `--hollow`, `--flush`, `--dense`, `--panel`, `--bands`, `--sticky-*`, `--dynamic-corners`, `--sizes-*` and the card typography removed.
- **`organisms/dialog.css`** (323 lines down to 189):
  - Styles `.dialog` only, and sets its card through flags.
  - One scroll model (`.dialog--scrollable`).
  - The drawer works in right-to-left text.
  - The no-card fallback is drawn with the card tokens.
- **`organisms/section.css`** removed. The blog keeps its own `.section`.
- **Tier 3:** the card and dialog blocks are rewritten, with no type tokens.

### Checks
- **Storybook** builds.
- **Axe:** all 448 stories, light and dark. No card, section or dialog story fails because of these components. The card-with-band story fails on an accent status at 4.38:1 (the palette item in the backlog). The batch-actions "docked in card" story fails on `role="toolbar"` on a `<footer>` (the action-sets pass). The remaining failures belong to components not yet refactored: header and app-shell landmarks, menu roles, sidebar contrast, and the warning tone on tints.

### Left for later
- Page-level size containers, so the container-prefixed classes match in most layouts (HANDOVER backlog).
- The dark-mode card surface is darker than the page (palette backlog).

## Follow-up: card chrome and flush

`--flat`, `--bordered` and `--flush` came back for the Token Designer's tool panels and other layout panels, reviewed against one axis per modifier:

- **Chrome** (`--card-chrome` flag): `--flat` drops the edge (border, corners, shadow) and keeps the fill; `--bordered` draws the border at any prominence. The two are values of one axis, so a card takes one. Prominence keeps the fill: `.card--plain.card--bordered` is an outline.
- **Flush** drops the padding at the card's edges and nothing else. The first draft also cleared the fill, border and corners, which repeated `--plain` and fused two axes; `.card--plain.card--flush` gives that look.
- **Responsive:** `@max-2xl:` and `@max-md:` versions of `--plain`, `--flat`, `--bordered` and `--flush`, written after the prominence ones so a responsive chrome applies over a responsive prominence.
- **Flags:** a card resets `--card-chrome` for cards nested inside it, like `--card-prominence`. The `flush` value of the flag is gone with the change above.
- **Increased contrast:** a bordered card gains the 2px edge even when plain; a flat card gains one like any non-plain card.
