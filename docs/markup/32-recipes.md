# 32. Recipes

A recipe is a whole screen or flow built only from library parts. Recipes live in `packages/storybook/stories/recipes/`. They show how the parts compose and test them against each other. They add no classes to the library. The one exception is the Cadence deck, which is recipe-only CSS.

**Rules for every recipe:**

- **One story per state, with static markup.** No demo scripts toggle states. Dialogs and popovers open in `play`. The command palette's filtering is the one script, because it is the product's own (§28 E).
- **No inline `style`** except token hooks: `--value`, `--skeleton-width`, `--avatar-bg`, `--dialog-width`. Hide with `hidden`.
- **Canonical names only:** text atoms for type, PRINCIPLES axes for variants, §36 utilities.
- **Documentation:** the purpose, what the recipe composes (with § links) and the decisions it makes. Nothing the component's own section already says.
- **Verification:** each story passes axe in light and dark, and at 390px and 1280px nothing overflows the page.

---

## A. App Header

`recipe-app-header.stories.ts`: a product header with primary navigation, search, notifications and an account menu.

- **Composes:** header (§33), tab list (§24), navigation tree (§16b), dialog drawer (§2), popover and menu (§3, §3b), card (§10), avatar and avatar group (§6), breadcrumb (§16), command palette (B).
- **Narrow screens:** the header is a container. Below `@3xl` the tab list hides (`@max-3xl:hide`). A menu button (`@3xl:hide`) opens the same navigation in a `.dialog--drawer.dialog--start`, and the actions drop their labels (`@max-3xl:hide-labels`).
- **Stories:** Default, NavigationDrawer, Notifications, AccountMenu, Search, TwoRows.

## B. Command Palette

`recipe-command-palette.stories.ts` and `command-palette/palette.ts`: a modal search over components, tokens and actions. It is opened with ⌘K or a button. The docs site's `CommandPalette.astro` uses the same markup.

- **Composes:** dialog (§2), card (§10), combobox with a static list (§28 D), lockup (§6b), kbd (§5), empty state (§27), skeleton (§26).
- **The card is the combobox** (`.card.card--ruled.combobox.combobox--plain`). Options read the combobox's tokens, so the control sits in `card__header`, with the close button inside `.combobox__control`. The list sits in a scrollable `card__body`. Groups are `ul[role=group]` labelled by a `.combobox__group-label`.
- **The script** filters the options, moves `.is-active` with `aria-activedescendant` and announces the count in a `role="status"` line. It resets the palette on close. The library ships none of it.
- **Stories:** Default, NoResults, Loading.

## C. Filter Sidebar

`recipe-filter-sidebar.stories.ts`: a plant catalogue with facets in a side pane and results in a grid.

- **Composes:** header (§33), wrapper and split (§19, §19c), card (§10), accordion (§4), fieldset and choices (§7b), combobox with chips (§28), range and switch (§7), chip and status (§5), grid (§19b), empty state (§27), skeleton (§26).
- **The filters are one compact, ruled form card.** Each facet is a plain accordion holding a fieldset with an `sr-only` legend. Active filters are a list of removable chips. The result count is a `role="status"` line.
- **Stories:** Default, NoResults, Loading.

## D. Tally & Sprout

`recipe-tally-sprout.stories.ts`: a community garden's plot registry and lease workflow.

- **Composes:** header (§33), banner dock (§21), telemetry (§30), card (§10), button group of radios (§14 C), table with expandable rows (§13), batch actions (§18b), empty state (§27), skeleton (§26), dialog with a stepper and form (§2, §30, §7b), drawer (§2), toast (§18).
- **The registry** switches between table and card views with a joined group of native radios, so it needs no script. Selecting rows docks the batch actions in the card. The loading table keeps its column names and puts skeletons in the body cells only.
- **The lease form** is a `form.card` in a dialog with a stepper. Errors show as a summary banner, with `aria-invalid` and a `field__error` on each field.
- **Stories:** Default, RowsSelected, CardView, NoResults, Loading, LeaseForm, LeaseFormErrors, LeaseFormAgreement, LeaseFormFee, ToolLocker, Toast.

## E. Cadence Dashboard

`recipe-cadence-dashboard.stories.ts` and `cadence/deck.css`: a radio station's live desk. It is the stress test: a full-viewport shell with two sidebars, a sticky header inside the main area and a fixed footer.

- **Composes:** app shell (§19d), sidebar and rail (§34), navigation tree (§16b), header (§33), telemetry (§30), split (§19c), table (§13), status (§5), lockup (§6b), button group (§14), range and range lockup (§7), meter (§25), popover (§3), dialog and drawer (§2), banner (§11), skeleton (§26), tab list (§24), footer (§35).
- **Narrow screens:** below 48em the rail and the section menu hide (`max-md:hide`). A compact header's menu button opens the same navigation tree in a `.dialog--drawer.dialog--start`. The sections move to a floating tab bar of links, which takes the docked player's place.
- **The deck** is a card. `cadence/deck.css` adds only its on-air or cued edge, the record artwork and the docked player's layout. The docked player is one row under a full-width position slider: track at the start, transport in the true centre, time and volume at the end. Its transport is a button group with a round, strong accent play button. Its levels are named `<meter>`s with thresholds.
- **Stories:** Live, Buffering, MenuDrawer, StreamSettings, Deck.
