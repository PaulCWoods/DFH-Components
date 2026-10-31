# 32. Recipes

A recipe is a whole screen or flow built only from library parts. Recipes live in `packages/storybook/stories/recipes/`. They show how the parts compose and test them against each other. They add no classes to the library. The one exception is the Cadence deck, which is recipe-only CSS.

**Rules for every recipe:**

- **One story per state, with static markup.** No demo scripts toggle states. Dialogs and Popovers open in `play`. The command palette's filtering is the one script, because it is the product's own.
- **No inline `style`** except token hooks: `--value`, `--skeleton-width`, `--avatar-bg`, `--dialog-width`. Hide with `hidden`.
- **Canonical names only:** text atoms for type, PRINCIPLES axes for variants, utilities.
- **Documentation:** the purpose, what the recipe composes and the decisions it makes. Nothing the component's own section already says.
- **Verification:** each story passes axe in light and dark, and at 390px and 1280px nothing overflows the page.

---

## A. App Header

`recipe-app-header.stories.ts`: a product header with primary navigation, search, notifications and an account Menu.

- **Composes:** header, Tab List, Navigation Tree, Dialog drawer, Popover and Menu, Card, Avatar and Avatar Group, Breadcrumb, command palette (B).
- **Narrow screens:** the Header is a container. Below `@3xl` the Tab List hides (`@max-3xl:hide`). A menu Button (`@3xl:hide`) opens the same navigation in a `.dialog--drawer.dialog--start`, and the actions drop their labels (`@max-3xl:hide-labels`).
- **Stories:** Default, NavigationDrawer, Notifications, AccountMenu, Search, TwoRows.

## B. Command Palette

`recipe-command-palette.stories.ts` and `command-palette/palette.ts`: a modal search over components, tokens and actions. It is opened with ⌘K or a Button. The docs site's `CommandPalette.astro` uses the same markup.

- **Composes:** Dialog, Card, Combobox with a static list, Lockup, kbd, Empty State, Skeleton.
- **The Card is the Combobox** (`.card.card--ruled.combobox.combobox--plain`). Options read the Combobox's tokens, so the control sits in `card__header`, with the close Button inside `.combobox__control`. The list sits in a scrollable `card__body`. Groups are `ul[role=group]` labelled by a `.combobox__group-label`.
- **The script** filters the options, moves `.is-active` with `aria-activedescendant` and announces the count in a `role="status"` line. It resets the palette on close. The library ships none of it.
- **Stories:** Default, NoResults, Loading.

## C. Filter Sidebar

`recipe-filter-sidebar.stories.ts`: a plant catalogue with facets in a side pane and results in a Grid.

- **Composes:** header, Wrapper and split, Card, Accordion, Fieldset and choices, Combobox with Chips, range and switch, Chip and status, grid, Empty State, Skeleton.
- **The filters are one compact, ruled form Card.** Each facet is a plain Accordion holding a Fieldset with an `sr-only` legend. Active filters are a list of removable Chips. The result count is a `role="status"` line.
- **Stories:** Default, NoResults, Loading.

## D. Tally & Sprout

`recipe-tally-sprout.stories.ts`: a community garden's plot registry and lease workflow.

- **Composes:** header, Banner Dock, Telemetry, Card, Button group of radios, Table with expandable rows, Batch Actions, Empty State, Skeleton, Dialog with a Stepper and form, drawer, Toast.
- **The registry** switches between Table and Card views with a joined group of native radios, so it needs no script. Selecting rows docks the Batch Actions in the Card. The loading Table keeps its column names and puts Skeletons in the body cells only.
- **The lease form** is a `form.card` in a Dialog with a Stepper. Errors show as a summary Banner, with `aria-invalid` and a `field__error` on each Field.
- **Stories:** Default, RowsSelected, CardView, NoResults, Loading, LeaseForm, LeaseFormErrors, LeaseFormAgreement, LeaseFormFee, ToolLocker, Toast.

## E. Cadence Dashboard

`recipe-cadence-dashboard.stories.ts` and `cadence/deck.css`: a radio station's live desk. It is the stress test: a full-viewport shell with two Sidebars, a sticky header inside the main area and a fixed footer.

- **Composes:** App Shell, Sidebar and rail, Navigation Tree, header, Telemetry, split, Table, status, Lockup, Button Group, range and Range Lockup, Meter, Popover, Dialog and drawer, Banner, Skeleton, Tab List, footer.
- **Narrow screens:** below 48em the rail and the section Menu hide (`max-md:hide`). A compact header's menu Button opens the same Navigation Tree in a `.dialog--drawer.dialog--start`. The sections move to a floating tab bar of links, which takes the docked player's place.
- **The deck** is a Card. `cadence/deck.css` adds only its on-air or cued edge, the record artwork and the docked player's layout. The docked player is one row under a full-width position slider: track at the start, transport in the true centre, time and volume at the end. Its transport is a Button Group with a round, strong accent play Button. Its levels are named `<meter>`s with thresholds.
- **Stories:** Live, Buffering, MenuDrawer, StreamSettings, Deck.
