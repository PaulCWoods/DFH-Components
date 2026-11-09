# AGENTS.md: Design For Humans Component Library

## Project Context & Mission
**Design For Humans** is an accessible, modern, token-driven UI component library and design system combining Web Standards, Figma synchronization, and automated workflows.
- **Lead / Author:** Paul Charles Woods (Senior web professional specializing in digital accessibility and web standards).
- **Target Standard:** WCAG 2.2 Level AA / AAA, Baseline Widely Available + Modern Web Standards.

---

## Source of Truth & Pre-v1 Migration
- **`docs/PRINCIPLES.md` outranks this file.** It defines the shared variant axes, token tiers, v1 scope and the refinement checklist. Where this file and PRINCIPLES disagree, PRINCIPLES wins and this file is the one to fix.
- **Dual audience:** DFH-Components feeds developers (CSS) and designers (Figma Variables and Tokens Studio via `packages/figma-sync/`) from one token source. Any change to token tiers, axis names or variant values must keep parity in both.
- **Pre-v1 status:** The library is being refactored component by component against PRINCIPLES. Markup in this file uses names the current CSS supports. Where a canonical name is not yet implemented, the table below gives the current class to use and the target it will become. When you refactor a component, migrate it to the target names, delete its aliases, and update its section here.

### Shared Variant Axes (PRINCIPLES §2)
Each modifier sets exactly **one** axis. Never fuse two axes into one class (`.button--subtle-primary`, `.button--plain-destructive` are forbidden; write `.button--subtle.button--accent`).

| Axis | Applies to | Values |
| :--- | :--- | :--- |
| Pointer | Everything | Touch (48px targets, default), fine (32px targets, opt-in by the product only: `.fine:targets-sm` on `<html>` sets the root token) |
| Size | Atoms & interactive controls only | default, `--sm`, `--lg` |
| Density | Containers & layout only | default, `--compact` (sets `--ui-sizing: compact`; nested gaps, type and controls step down). `.ui-compact` sets it on any region; `.fine:ui-compact` sets it only where the primary pointer is fine |
| Presentation | Everything | Normal (text + icon), minimal (icon only) |
| Prominence | Everything with a surface | default, `--strong`, `--subtle`, `--plain` |
| Intent | Status or consequence | neutral (default), `--accent`, `--danger`, `--warning`, `--success`, `--info` |

- **Intent never relies on colour alone** (WCAG 1.4.1): pair every non-neutral intent with an icon, a role (`role="alert"`, `role="status"`) or descriptive text.
- **A bar is never shorter than its targets:** a container that holds a row of controls (a Header bar, a tab list, batch actions, pagination) is at least `--spacing-target-min` tall, so on touch a compact one tightens its padding and type and keeps 48px. Only fine-pointer targets make it shorter.
- **Nothing clips a hit area, and the drawn control is the target:** a container that hides its overflow leaves room for its edge controls' buffers; a native field fills the control drawn around it; an unlabelled row-selection checkbox takes its target from a `<label>` filling its cell; links stacked in a list sit at least 24px apart (block links for 48px); no hit area covers another control, since a buffer reaches at most halfway across the gap its container declares (`--target-gap-inline`, `--target-gap-block`). `npm run check:targets` checks all of it.
- **Smaller size never shrinks the hit area:** `--sm` controls (and controls stepped down by a compact container) keep a 48px target unless the product has opted into fine-pointer targets or neighbours sit closer (a tight group gives each its own size plus the gap, accepted), and never drop below 24px (WCAG 2.5.8). Text fields can't take a buffer, so `--sm` text controls are 32px. The library never switches fine-pointer mode on automatically with `@media (pointer: fine)`; `.fine:targets-sm` is the product's opt-in to fine targets, and `fine:ui-compact` (or `fine:header--compact`) to density.

### Legacy → Canonical Names
| Current class (use until migrated) | Target | Notes |
| :--- | :--- | :--- |
| `.button--primary`, `.button--secondary`, `.button--danger`, `.button--selected`, `.button--subtle-tint`, `.button--ghost`, compound `.button--*-primary` / `--*-destructive` | `.button--strong.button--accent`, `.button`, `.button--danger`, `.is-active`, `.button--subtle`, `.button--plain`, single-axis pairs | **Removed** in the button pass. These classes no longer exist. |
| `--button-variation`, `--button-appearance`, `--button-tone` (flag), `--button-density`, `.buttons-dense`, `.buttons-regular`, `.buttons-primary`, `.buttons-destructive` | `--button-prominence`, `--button-intent`, `--ui-sizing: compact` | **Removed** in the button pass. |
| `.badge--strong`, `--subtle`, `--plain`, `--round`, `--contrast`; badges used as labels; `.badge--top-right-corner` and the other physical corners; `.chip--simple`, `.chip--status`, `.chip--color-*`; `[data-status]` on badge, chip or status; `--badge-variation`, `--badge-tone`, `--badge-appearance`, `--chip-variation` | `.status` with a prominence and intent, `.chip`, `.badge--top-end` / `--top-start` / `--bottom-end` / `--bottom-start`, `.chip--plain`, `.status--plain.status--{intent}`, `--status-*` / `--chip-*` / `--badge-intent` flags | **Removed** in the badge pass. See §5. |
| `.avatar--xs`, `--xl`, `--round`, `--crescent`, `--stackable`, `--status-*`; `.avatar__text`, `__image`, `__fallback`; `.avatar-count`, `__text`; `[data-status]`, `data-color` on an avatar; `.button--avatar`; `div.avatar-group`; `.lockup--*` modifiers, `<b>`/`<small>` lockup lines; `.telemetry__icon`, `__content`, `__label`, `__value`, `__unit`, `__trend`, `__status`, `[data-trend]`; `.telemetry--pill`, `--subtle`, `--bordered`, `--sm`, `--stacked`, `--icon-end`, `--card`; `.telemetry-strip`, `.stat-pill`; `--telemetry-variation`, `--telemetry-density` | `--avatar-size`, `.avatar--placeholder`/`--count`, a dot badge with the state in the name, `--avatar-bg` + `--avatar-text`, a `button.avatar` or `a.avatar` named in `.sr-only` text, `ul.avatar-group` of `li`s; text atoms in `.lockup`, `.text-center`/`.text-end`, `.inline`; `<dl class="telemetry-group">` of `.telemetry` with bare `dt`/`dd` and text atoms, `.status--plain` trends, `--round`, `--plain`, `--compact`; `--telemetry-prominence`, `--ui-sizing: compact` | **Removed** in the identity pass. Avatar is an atom. See §6, §6b, §30. `.telemetry--subtle` came back later as a tint with no border (the old one meant plain). |
| `.icon--xs`, `--md`, `--xl`, `--2xl`, `--scale-*`, `--muted`, `--destructive`, bare `.dir`; `.icon-box--surface`, `.icon-boxes-*`, `.icon-box-compact`, `.icon-box-lg`, `--icon-box-density`; `--icon-scale` | `--icon-size`, `.icon--danger`, `.text-color-muted`, `.icon--dir`, `.icon-box--subtle`, `--icon-box-size: sm`, `--ui-sizing: compact` | **Removed** in the icon pass. See §9. |
| `--dense` modifiers (`.card--dense`, `.field--dense`, `.banner--dense`, etc.) | `--compact` | One density modifier only. |
| `.ui-dense`, `style(--ui-density: dense)`, `--control-density`, `--menu-density`, `--combobox-density`, `--textarea-density`, `--telemetry-density` | `.ui-compact`, `style(--ui-sizing: compact)` | One density flag. Migrate in each component's pass. |
| `.alert` and its placements (`--top`, `--sticky`, `--bottom`, `--fixed-*`, `--floating`, `--compact`, `--dismissing`); `.banner__inner`, `__thumb`; `.banner--error`, `--dynamic-corners`, `--dense`, `--flush`, `--ruled`, `--action-align-center`; `buttons-sm` / `buttons-round` on a banner; `.toast` as a wrapper around a banner, `.toast--dismissing`; `role="none"` / `role="region"` on banners; `--alert-*`, `--banner-sm-*` | `.banner-dock` with `--sticky`, `--fixed-top`, `--fixed-bottom`, `--floating`; `.banner__body`; a card row for media; `.banner--danger`, `--round`, `--compact`; `.toast` on the banner itself in a live `.toast-stack`; `hidden` to dismiss; `--banner-dock-*`, `--banner-compact-*` | **Removed** in the announcements pass. Alert is a role, not a class. See §11, §18, §21. |
| `.range-group`, `--surface`, `--pill`; `.input--ghost`, `.inputs-*`, `.selects-*`, `.textareas-*`, `.controls-dense`; `.checkbox-input--sm` and intents, `.check--*`; `.switch--destructive`; `--controls-variation`, `--*-variation`, `--*-density`, `--range-variant`, `--range-tone`, `--switch-shape`, `--form-check-size`; bare `input`/`select`/`textarea` styling; `:user-valid` styling | `.range-lockup`, `--bordered`, `--bordered --round`; `.input--plain`, `.controls-*`, `.ui-compact`; `.checkbox-input--lg`; `.switch--danger`; `--controls-prominence`, `--*-prominence`, `--ui-sizing: compact`, `--range-intent`, `--switch-corners`, `--check-box-size`; classes only | **Removed** in the form-controls pass. See §7. |
| Bare `progress`/`meter` styling, `.progress--subtle`, `.progress--accent`, `.meter--success`/`--warning`/`--danger`, `--progress-variant`, `--progress-tone`, `.controls-sm`/`-lg` on bars | `.progress`/`.meter` classes, `.progress--{intent}` or `--progress-intent`, meter thresholds (`low`/`high`/`optimum`), `--progress-size`/`--meter-size` | **Removed** in the progress and meter pass. See §25. |
| `.link--accent`, `--danger`, `--destructive`, `--success`, `--muted`, `--sm`, `--lg`, `--inline-flex`, `--underline(d)`, `--stretch`, `--inverted`, `--on-dark`; `.block-link--compact`, `--ghost`, `--icon`, `--inline`, `--flex`; `--link-hover-color`, `--link-active-color` | `.link`, `.link--subtle`, `.button--danger` for actions, `.color-scheme-dark` on dark bands, `.link--stretched`; `.block-link--sm`, `--plain`, `.button--icon` on an `<a>` | **Removed** in the link pass. See §8. |
| `.tabs`, `.tabs__panel`, `.tabbed-content__panel`; per-tab `.tab--button`, `--subtle`, `--plain`, `--simple`, `--sm`, `--round`, `--vertical`, `--fill`; `.tabs-button`, `.tabs-subtle`, `.tabs-plain`, `.tabs-sm`, `.tabs-round`, `.tabs-icon`, `.tabs-vertical`, `.tabs-on-right`, `.tabs-flush`, `.tabs-scrollable`, `.tabs-wrap`, `.tabs-fill`, `.tabs-floating`, `.tabs-docked`, `.tabs-docked-top`; `--tabs-variation`, `--tab-variation`, `--tabs-style`, `--tabs-shape`; `--tabs-*` tokens | `.tabbed-content`, `.tab-panel`; axes on the list: `.tab-list--segmented`, `--subtle`, `--plain`, `--sm`, `--round`, `--vertical`, `--end`, `--flush`, `--scrollable`, `--fill`, `--floating`, `--docked`; `.tab--icon`; `--tab-list-style`, `--tab-list-prominence`, `--tab-list-size`, `--tab-list-corners`; `--tab-*`, `--tab-list-*` tokens | **Removed** in the tab pass. See §24. |
| `.caption`, `.nano-heading`, `.nano-text`, `.strong-text`, `.alt-text`, `.code-text`, `.code`, `.color-muted`; `--micro-text-*`, `--nano-*`, `--small-text-*`, `--large-text-*`, `--body-font-size` | `.small-text`, `.font-bold`, `.font-serif`, `.font-mono`, `.text-muted`; `--body-sm-*`, `--body-lg-*`, `--body-fixed-font-size` | **Removed** in the text pass. Text atoms are fixed by default; see §20. `.micro-text` was merged into `.small-text` then, and came back later as the step below it (−2, 12px). |
| `--vert-space`, `--vert-spacing`, `--prose-vert-spacing`, `--prose-font-sizing`, `--prose-spacing`, `.vert-spacing-*`, `.font-sizing-tight`; `.emoji.*` classes; `--prose-link-*`, `--prose-underline-*`, `--prose-body-*`, `--prose-block-width`, `--prose-inset-space*`, `--prose-vert-space*`, `--prose-figcaption-margin-bottom`, `--prose-figcaption-text-wrap`, `--prose-small-font-size` | `--font-sizing` (the rhythm follows it), `--prose-space`, `--prose-space-fluid`, `--prose-space-cq`, `--prose-indent`; the emoji in the text; `--link-prominence: subtle` on the prose | **Removed** in the prose pass. See §12. |
| `.divider--vertical`, `--subtle`, `--quiet`, `--accent`, `--dotted`, `--sm`, `--md`, `--lg`; `.menu__separator`, `.batch-actions__separator`, `.combobox__separator`; `--divider-border-*`; styling of bare `hr` | `aria-orientation="vertical"`, `.divider`, `.divider--strong`, `.divider--dashed`; `.divider` (`<li role="separator">` in lists); `--divider-width`, `--divider-style`, `--divider-color` | **Removed** in the divider pass. See §15. |
| `.skeleton--title`, `--circle`, `--round`, `--chip`, `--rect`, `--inline`, `--static`, `--sm`, `--md`, `--lg`, `--w-25`, `--w-33`, `--w-40`, `--w-60`, `--w-66`; `.card.skeleton`, `.card--skeleton`; `--skeleton-animation`, `--skeleton-bg` | `--heading`, `--avatar`, `--status`, `--media`, `--skeleton-width`; a card with `aria-busy` and shapes inside; `--skeleton-motion`, `--skeleton-color` | **Removed** in the skeleton pass. See §26. |
| `--hollow`, `--dense`, `--panel`, `--bands`, `--sticky-header`, `--sticky-footer`, `--dynamic-corners`, `--sizes-fixed`, `--sizes-cq`, `.is-loading` on a card; `.card__link`, `__date`, `__canvas`, `__head`, `__foot`, `__band--ruled`, `__band--bordered`, `__band--flush`; `.card__content` around every card's parts; `--card-density`; `.section`; bare `<dialog>` styling, `--dialog-scroll` | Default card (bordered), `--plain`, `--compact`, `.card__body--scrollable`, `--ruled`, `--scrollable`; `.link.link--plain.link--stretched`; parts as direct children (`.card__content` only beside a thumb); `.ui-compact`; `.stack` with a divider; `.dialog` class, `.dialog--scrollable` | **Removed** in the surfaces pass. Card is a molecule. See §10 and §2. `--bordered` and `--flush` came back later with new meanings: `--bordered` is the chrome axis's border (at any prominence; the default card already has one), `--flush` drops the padding only (pair it with `--plain` for the old look). `__canvas` came back too, as media of any kind where the thumb sits (a carousel, a demo, a chart). |
| A `form method="dialog"` around a lone header close button, and the rule that made a lone button in one subtle and small; `--dialog-close-button-prominence`, `--dialog-close-button-size`; `dialog.padding`; `.dialog` opened with `show()`; `aria-modal` on a dialog | `.button.button--plain.button--icon` with `commandfor="{id}" command="close"`; the button's own classes; `dialog.cushion`; a `.popover`; nothing (`showModal()` makes the page inert) | **Removed** in the dialog pass. Navigation drawers take `.dialog--start`. See §2. |
| `.popover--anchored`, `--lg`, `--xl`, `--full*`, `--left`, `--right`, `--bottom-left`, `--bottom-end`; bare `[popover]` styling; inline `anchor-name` / `position-anchor` on invoked popovers; a banner or bare text in a popover; `aria-haspopup="dialog"` on popovers that aren't dialogs; `.tooltip--left`, `--right`, `--anchored`; `.has-tooltip`; `popovertarget` on a tooltip; `role="tooltip"`; cards in tooltips; `--tooltip-font-size`, `--tooltip-line-height`, `--popover-bg`, `--popover-padding` and the other popover surface tokens | `.popover` (anchored by default), `--end-aligned`, `--start`, `--end`, `--popover-max-width`; `.tooltip--start`, `--end`; `interestfor` only; `aria-hidden` (label) or `aria-describedby` (description); a popover hovercard for rich content | **Removed** in the floating-layers pass. See §3, §23. |
| `.button-group--tight`, `--segmented`, `--stacked`, `--stretch`, `--fill-items`, `--center`, `--justify-center`, `--justify-end`, `--space-between`, `--dense`, `--sm`, `--round`, `__content`, `__fill`; `.menu__item`, `__item--destructive`, `__text`, `__label`, `__content`, `--submenu`; `<header>` in a menu; `role="menu"`, `menuitem*`, `role="none"` on menu items, `aria-haspopup="menu"`; `role="toolbar"` without arrow-key script; `.batch-actions--contrast`, `--flush`, `data-state`, a count badge in the summary; `--menu-item-*`, `--menu-density` | `.button-group--joined`, `--vertical`, `--fill`, a `justify-*` utility or the container, `--compact`, `.buttons-sm`, `.buttons-round`, a text atom; `.button` in a `<li>`, `.button--danger`; `<li class="menu__heading">` with a text atom; no menu roles; `role="group"` with a label; `.batch-actions--strong`, `--plain`, `hidden`, the summary text in `role="status"` | **Removed** in the action-sets pass. Menu is a molecule. See §3b, §14, §18b. |
| `.breadcrumb__list`, `__item`, `__link`, `.is-current` in a breadcrumb; `--breadcrumb-font-size`, `--breadcrumb-current-font-weight`, `--breadcrumb-color`; `.nav-tree*`; `.navigation-tree__list`, `__item`, `__item--nested`, `__link`, `__text`, `__label`, `--indicator`, `--toc`, `--flush`; `--nav-tree-*`; `.pagination--center`, `--end`, `--between`, `__ellipsis`, an `<hr class="divider">` as a page gap; `.is-active` on the current page; `.page-count`, `__info`, `__jump`, `--center`, `--start`, `--end`; `.stepper__list`, `__content`, `__label`, `__desc`, `__indicator-text`, `--inline`; `.is-active` on steps; `<nav>` around a stepper of plain steps | Bare `ol`, `li` and `.link` with a text atom on the list; `.navigation-tree` with bare lists and `.button` items, `aria-current` for the current item, `.navigation-tree__heading` in an `<li>`; `.pagination__gap` (`aria-hidden`), `aria-current="page"` alone; a cluster with `.small-text` and a jump form; `ol.stepper` > `li.stepper__item` > `.stepper__step`, `aria-current="step"` alone, hidden state text in the title | **Removed** in the wayfinding pass. See §16, §16b, §17, §30. |
| `.legend`, bare `fieldset`/`legend` styling, `.fieldset--bordered`, `--loose`, `--lg`, `--dense`, `.fieldset__description`; `.field__result`, `__output`, `__errors`, `.label`/`.hint`/`.output`/`.error-message` aliases, `.field--sm`/`--lg`/`--loose`/`--dense`, `.inline-field`, `.fields-grid`, `.fields-inline`; generated " (Required)" and `.required`; `role="alert"` on server-rendered errors; `.choice--sm`/`--lg`/`--compact`, `.choices--compact`, `<small>` descriptions, `.controls-sm`/`-lg` on choices; `.form__submission`, `--right`, `--left`, `--form-submission-align`; `.inline-form`; `--form-choice*`, `--form-submission-*`, `--field-inner-gap`, `--fieldset-inner-gap` | `.fieldset__legend label`, `.fieldset` in a `.card`, `.fieldset__hint`; `<output class="small-text">`, `.field__error`, the `.label` text atom, `.field--inline`, `.form--aligned`, `.grid`; "(optional)" written in the label; `aria-describedby` + `aria-invalid`; the box size, `.small-text` in `.choice__label`; `.form__actions button-group` with a `justify-*` utility; `.cluster`; `--choice-*`, `--choices-*`, `--form-*`, `--field-*`, `--fieldset-gap` | **Removed** in the form-composition pass. See §7b. |
| `.accordion--flush` (the old meaning; it came back for flush content), `--transparent`, `--ruled`, `--no-icon`; `.accordion-group--tight`, `--no-icons`; `.accordion__icon`, `.accordion__heading`; `--accordion-variation`; `--accordion-open-bg`, `--accordion-hover-border`, `--accordion-inner-border-*`, `--accordion-summary-*` | `.accordion--plain`; `.accordion-group--joined`; the built-in state icon; a text atom on the summary; `--accordion-prominence`; `--accordion-bg`, `--accordion-hover-bg`, `--accordion-inset` | **Removed** in the accordion pass. Accordion is a molecule. See §4. |
| `.combobox--ghost`, `--invalid`, `--disabled`, `comboboxes-*`; `.combobox__listbox--anchored`, `--in-flow`; inline `anchor-name` / `position-anchor` on a combobox; `__option-main`, `__option-desc`, `__group-header`; dividers in a listbox; `.is-selected`, `data-focused`, `data-expanded`; `--combobox-density`, `--combobox-variation`; the combobox control tokens | `.combobox--plain`, `--subtle`, `--round`, `--sm`, `--lg` on the shared text-control base; `aria-invalid`, `disabled` on the input; `popover="manual"` on the list; a `.lockup`; `__group-label` in a `role="group"`; `.is-active` with `aria-activedescendant`, `aria-selected`, `aria-expanded`; `--combobox-size`, `--combobox-prominence`, `--combobox-corners`; the input tokens | **Removed** in the combobox pass. Combobox is a molecule. See §28. |
| `.empty-state--flush`, `--bordered`, `--left`, `--error`, `[data-status]` on an empty state; `__icon-well`, `__hgroup`, an icon straight in `__visual`; `--empty-state-density`, `--empty-state-align`; `aria-labelledby` on an empty-state `<div>`; the empty state's `cq` type mode; `empty-state.icon-well-*`, `icon-*`, `title-color`, `padding-*`, `max-width` tokens | No padding by default (a `padding-block-*` utility for more), `--subtle`, `--start`, `--danger` and the other intents; an `.icon-box` in `__visual`; `--ui-sizing: compact`; a `<div>` (a `<section>` only as a page's whole content) with a `role="status"` element for the announcement; fixed text atoms; `empty-state.gap`, `compact-gap`, `content-max-width`, `description-color`, `subtle-*`, `--icon-box-intent` | **Removed** in the empty state pass. Empty state is a molecule. See §27. |
| `.header-container`, `.header--borderless`, `--flush`; a row built inside the header (`.wrapper.flex.justify-content-between`, `.inline--between`) and padding utilities on it; `aria-label` on the banner; `--header-mobile-height`, `--header-desktop-height` and the global `--header-height` rule; `--header-color-palette`, `--header-color-scheme`, `--header-contained-height`, `--header-container-gap`, `--header-backdrop-filter` | Two `.header__bar`s in one `<header>`, `.header--plain`, `--header-padding-inline`; `.header__bar` with `.header__nav`; no label (one banner per page); `--header-height` set by the product on `:root` when the header is taller than 4rem; `.color-scheme-*` / `.color-palette-*` utilities, `--header-filter` | **Removed** in the header pass. See §33. `--flush` came back later with a new meaning: it drops the band's inline and the bar's block padding, for a Header over a Sidebar. |
| `.table__caption`, `__caption--bottom`; `.table--zebra`, `--sm`, `--simple`, `--fixed`, `--flush`, `--head-cells-long`, `--sticky-header`, `--sticky-footer`, `--sticky-1st-column`; `.table__col--num`, `--numeric`, `--center`, `--fit`, `--counter`, `--expand`, `--auto`, `--min-*`; `.table__cell--long`, `--start`, `--index`, `--actions`, `--fill`, `--xs`…`--xl`; `[data-numeric]`, `[data-center]`, `[data-fit]`, `[data-nowrap]`; `aria-sort` on the sort button; `table.font-*`, `head-font-*`, `header-cell-font-weight`, `caption-*` tokens | A text atom on `<caption>`; `.table--striped`, `--compact`, `--plain`, `--sticky-head`, `--sticky-foot`, `--sticky-first-column`; `.table__cell--numeric`, `--center`, `--fit`, `--nowrap` (cells) and `.table__col--*` (widths); `aria-sort` on the `<th>`; body text tokens; `--table-inset` | **Removed** in the table pass. See §13. |
| `.split--auto*`, `--auto-below-*`, `--auto-in-container-below-*`, `--reverse`, `--stretch`, `--panels`, `--cushioned`; `--split-sidebar-width`, `--split-min-width`; `.grid-carousel`, `--bleed` alias, viewport grid classes (`sm:grid--N-col` … `xl:`, `md:grid*`, `max-md:grid--carousel` and its aliases), `@max-md:carousel`; `--display`, `--flex-wrap`, `--direction`, `--justify` hooks; padding utilities added to a `.wrapper`; `wrapper` on a card; `.sidebar__scroller`, `.sidebar--flush`, `--right`, `.app__sidebar`, `.is-open`, the automatic sidebar drawer, `--site-header-height`; `.app__aside`, `.app__footer`, `.workspace`, `.app--locked`, `.main--panels`; `layout/sidebar.css`, the footer in `layout/app.css` | The split wraps on its own, `--end`, `--align-items: stretch`, the default gap; `--split-side-width`, `--split-main-min-width`; `.grid--carousel`, `--carousel-bleed`, `grid--N-col` (a maximum count that reflows) or `@xs:` … `@7xl:` container variants, `@max-3xl:grid--carousel`; `--justify-content`, `.inline--between`/`--end`, `.cluster--between`/`--end`; the wrapper's own gutter (`--wrapper-gutter`); `max-width-*` + `margin-inline-auto`; `.sidebar__body`, `__body--flush`, `--end`, `.sidebar`, a `.dialog--drawer`, `--header-height`; `.app__workspace`, `.footer`, `.app--viewport`, `.main--viewport`; `organisms/sidebar.css`, `organisms/footer.css` | **Removed** in the layout pass. See §19, §19b, §19c, §19d, §22, §34, §35. |
| Third names and synonyms: `.mg-*`, `.pd-*`, `.bd-*`, `.rd-*`, `.fs-*`, `.fw-*`, `.d-*`, `.sr`, `.bold`, `.mono`, `.pre`, `.nowrap`, `.round`, `.squared`, `.cq*`; valueless `.padding`, `.margin`, `.gap`; left/right names (`.ml-*`, `.pr-*`, `.border-l`, `.rounded-r`, `.text-left`, `.margin-left-*`); `.margin-top-*`/`-bottom-*` and `.padding-start-*`/`-end-*`; `.font-size-*`, `.line-height-*`; `.font-weight-100` … `-900`; `.z-0` … `.z-50`; `.width-dialog`, `-popover`, `-sidebar`, `-prose`, `-shell`, `-wide`, `.width-*`, `.height-*`, `.block-*`, `.size-grow`, `.max-width-*`, `.min-width-*`; `.bg-effect-*`, `.bg-blurred-*`, `.bg-color`, `.color-accent` and the other `.color-*` text colours; `.shadow-raised`, `-inset`, `-0`, `.no-shadow`, palette shadows (`.shadow-aqua` …); `.backdrop`; `.focus-none`, `.outline-none`, `.focus-container`, `.focus-border`, `.focus-ring-inset`; `.underline-none`; `.hide` (unconditional), `{condition}:show`, `hide-decor`, `flex-auto`, the §31 synonyms, the `2xs`/`xs` viewport sizes; `.ui-dense`, `.ui-default`, `.spacing-mode-*`, `.font-sizing-compact--on-desk`; `utilities/spacing-blocks.css` | `.m-*`, `.p-*`, `.border`, `.rounded-*`, a text atom, `.font-bold`, `.hidden`, `.sr-only`, `.font-mono`, `.whitespace-pre`, `.whitespace-nowrap`, `.rounded-full`, `.rounded-none`, `.container-inline`; `.p-md`, `.m-md`, `.gap-md`; `.ms-*`, `.pe-*`, `.border-s`, `.rounded-e`, `.text-start`; `.mt-*`/`.mb-*`, `.ps-*`/`.pe-*`; `.small-text`, `.text`, `.large-text`; `.font-normal` … `.font-bold`; `.z-base` … `.z-tooltip`; the component's token, `.inline-size-*`, `.max-inline-size-*`, `.min-inline-size-*`, `.block-size-*`, `.size-*`, `.grow`; `.bg-translucent-subtle`, `.bg-translucent`, `-strong`; `.bg-surface`, `.text-accent` …; `.shadow-lg`, `.shadow-inner`, `.shadow-none`, `.shadow-accent` …; `<dialog>`'s `::backdrop`; `.focus-within`, `--inset`, `--border`; `.link--plain`; `.hidden` or `[hidden]`, `{other condition}:hide`; `.ui-compact`, `.fine:ui-compact`; `utilities/sizing.css`. Container sizes moved to Tailwind's container scale (`@sm:` 40em is now `@2xl:`, `@md:` 48em `@3xl:`, `@lg:` 60em `@5xl:`), `lg:` to 64rem; `.border-muted`/`.border-quiet` set the colour only; `.border` is 1px | **Removed** in the utilities pass. See §31, §36. |
| `.inline-responsive`, `--{size}` and its other modifiers | `.stack.@{size}:inline`, `.stack--*` modifiers, the `--justify-content` hook | **Removed** with the layout tidy. See §22. |
| `.header__brand`, `__brand-icon`, `__brand-wordmark`, `__brand-logo` | `.brand` on the `<a>`, `.brand__mark`, `.brand__name` | **Removed** when the brand became an atom. See §6d. |
| `.header__skip-link`; `.tab-list__content` and nested Tab List navigation; Tabs with no panel as a view switcher; `split--nowrap` beside `split--sidebar` | A `.skip-link` before the Header; a Navigation Tree; a joined Button Group of radio inputs; `--sidebar` alone (it keeps one row) | **Removed** in the navigation audit. Pagination collapses below a 30rem row. |
| `.deck__art`, `--vinyl` | `.thumbnail` (§6c); Cadence's record is `.thumbnail.thumbnail--round.deck__vinyl` | **Removed** in the thumbnail pass. |
| `.button--flush`, `.button--icon-lg`, `.buttons-icon-lg`, `.button__text--placeholder`, the `hide-decor` / `--ui-decor` hooks on Button and Tab; the Divider's `--direction` flag | a Link (`.link`) for a link that should line up with text, `.button--plain` otherwise; `--button-icon-size`; `.button--placeholder` alone; `--divider-orientation: vertical` (set by `.inline`, `.cluster`, Button Group and Batch Actions) | **Removed** in the actions audit. |
| `.select--flush`, `.textarea--flush`; `.range-lockup--sm`, `--lg`, `--bordered`, `--round`, `--range-lockup-padding-inline`; font styling on `.range-lockup__output` and `.range__scale-ticks`; `--combobox-listbox-max-height`; a Combobox list without `popover`; `<label class="switch">` wrapping an `.sr-only` checkbox | `.input--flush`; `.controls-sm`/`-lg` on the lockup, an override or utilities for a frame; `.small-text` (`.font-mono` on the readout); `--combobox-listbox-max-size`; `popover="manual"`; `div.switch` with a `<label for>` in `.switch__label` and the checkbox inside `.switch__control` | **Removed** in the forms audit. See §7, §28. |
| `.deck` and its parts and modifiers in the library, `--deck-*` tokens, `organisms/deck.css`, §29; recipe demo scripts that toggle states, `.is-open` on a sidebar and hand-made backdrops; inline `style` in recipes beyond token hooks; `.font-size-md`, `.font-weight-medium`, `.heading-1`, `.lead-text`; §32 patterns A–C | The Cadence recipe's `cadence/deck.css`; one story per state with static markup, dialogs and popovers opened in `play`; a `.dialog--drawer.dialog--start`; `hidden` and token hooks (`--value`, `--skeleton-width`, `--avatar-bg`, `--dialog-width`) only; text atoms and `.font-*` utilities; the five recipes in §32 | **Removed** in the recipes pass. See §32. |

### v1 Scope
- **In core:** `telemetry` (a description list on status, text and icon atoms), `batch-actions`.
- **Out of core:** `deck` is the Cadence recipe's own CSS (`packages/storybook/stories/recipes/cadence/deck.css`), with no tokens and no package export, and isn't published. Do not use it in library work or treat it as a pattern to copy.

---

## Technology Stack
- **Monorepo Architecture:** npm workspaces (`packages/*`).
- **Core Styling:** Vanilla Modern CSS (CSS Nesting, Logical Properties, Container Queries, Container Style Queries, CSS Anchor Positioning, Native CSS Functions `@function`, Native `light-dark()`, and `:where()` zero-specificity cascade). No Tailwind, no CSS-in-JS.
- **Design Tokens:** W3C DTCG (Design Token Community Group) 3-tier JSON specification (`tokens/*.json`) compiled to native CSS Custom Properties.
- **Storybook:** Storybook 8 (HTML + Vite) with `@storybook/addon-a11y` (axe-core automated WCAG auditing).
- **Documentation Site:** Astro 7 with MDX (`packages/docs`).
- **Iconography:** Canonical SVG sprite sheet (`icons/icons.svg`) synchronized across web, Storybook, and Craft CMS targets.
- **Figma Synchronization:** Node.js token compiler and exporter supporting Tokens Studio ($0 free tier) and Native Figma Variables.
- **Consumer Sites:** the Craft CMS blog (`/Users/paulwoods/Sites/designforhumans-blog`) and the WordPress course (`/Users/paulwoods/Sites/DFH-Course-Theme`), which link the published library from `components.designforhumans.blog/css/<version>/`.

---

## Directory Architecture
```
DFH-Components/
├── tokens/
│   ├── 1-global.json          # Tier 1: Foundation tokens (palettes, scales, units)
│   ├── themes.json            # Names the default theme (builds the library's own tokens) and the site theme (the docs, Storybook and page-head fonts)
│   ├── themes/                # One theme per file: colours (seeds, lightness curves, white and black, each role's colour per mode, the mixes, high contrast), type, spacing, shape, motion and customised component tokens
│   │   ├── starter.json       # The default: system fonts, blue accent
│   │   ├── dfh.json           # Design For Humans, the site theme
│   │   └── course*.json       # Sub-brands ("extends"): the course (of dfh) and its lesson colours (of course)
│   ├── 2-semantic.json        # Tier 2: Semantic UI tokens (light-dark(), surfaces, focus, shadows)
│   └── 3-component.json       # Tier 3: Component tokens (button, dialog, popover, accordion)
├── packages/
│   ├── css/                   # @design-for-humans/components-css
│   │   ├── src/
│   │   │   ├── reset.css      # Modern accessible CSS reset
│   │   │   ├── variables.css  # Auto-compiled CSS custom properties (DO NOT edit directly)
│   │   │   ├── component-theme.css # Generated: the Tier 3 tokens the theme customises (DO NOT edit directly)
│   │   │   ├── themes/        # Generated by build:themes: one stylesheet per non-default theme, only what it changes, linked after index.css (DO NOT edit directly)
│   │   │   ├── index.css      # Core entrypoint importing layout, components & utilities
│   │   │   ├── atoms/         # Foundational indivisible primitives (text, list, button, tab, input, badge, avatar, thumbnail, icon, etc.)
│   │   │   ├── molecules/     # Simple combined units (card, poster, field, lockup, tab-list, avatar-group, banner, telemetry, popover, code-block, etc.)
│   │   │   ├── organisms/     # Complex composite assemblies (dialog, table, tabbed-content, header, footer, sidebar, etc.)
│   │   │   ├── layout/        # 1D/2D spatial layout primitives (cluster, grid, inline, split, stack, wrapper; app and main shell)
│   │   │   ├── utilities/     # Low-specificity utility classes (spacing, border, typography, accessibility, display, flex, layout-helpers)
│   │   │   └── overrides.css  # Custom extension layer for project-specific overrides
│   ├── docs/                  # @design-for-humans/docs: the docs site (components.designforhumans.blog), plan in docs/audit/docs-site.md
│   │   ├── src/
│   │   │   ├── content/docs/  # The written pages, one MDX file each; a folder is a section, index.mdx its overview
│   │   │   ├── components/    # Site parts built from library markup (header, navigation tree, search, scheme toggle)
│   │   │   ├── layouts/       # BaseLayout (head, fonts, app shell) and DocLayout (sidebar, article, on this page)
│   │   │   ├── lib/nav.ts     # Sections and pages from the collection
│   │   │   └── pages/         # Routes: the home page and /docs/[...slug]
│   │   └── public/            # Public assets (icons.svg)
│   ├── theme-engine/          # Builds the tokens from the theme files and gates Tier 2 contrast (core of the future Token Designer)
│   ├── token-designer/        # Token Designer prototype (Vite app): edit a theme in tokens/themes visually, with live ramps, contrast and preview
│   ├── figma-sync/            # Token compilation & Figma export tooling
│   │   ├── compile-tokens.js      # Node token compiler (W3C DTCG -> CSS variables)
│   │   ├── export-figma-tokens.js # Figma exporter (Tokens Studio & Honza Toman Variables)
│   │   └── dist/
│   │       ├── tokens-studio/     # Tokens Studio format (figma-tokens.json)
│   │       └── native-variables/  # Native Figma Variables format (unified and modular collections)
│   └── storybook/             # @design-for-humans/storybook
│       ├── .storybook/        # Storybook configuration with @storybook/addon-a11y
│       └── stories/           # Component stories with automated axe WCAG checks
│           ├── atoms/         # Stories for indivisible primitives (button, input, badge, avatar, icon, etc.)
│           ├── molecules/     # Stories for composed units (card, field, lockup, avatar-group, banner, etc.)
│           ├── organisms/     # Stories for complex assemblies (dialog, table, tabs, etc.)
│           ├── layout/        # Stories for 1D/2D layout primitives (grid, stack, cluster, inline, split, etc.)
│           ├── utilities/     # Stories for utility classes (spacing, border, typography, flex, etc.)
│           ├── recipes/       # Stories for composite workflows and domain showcases (app header, command palette, filter sidebar, tally-sprout, cadence-dashboard)
│           └── tokens/        # Stories for tokens (shadows, elevation, etc.)
├── docs/                      # Architecture, principles, and handover documentation
│   ├── PRINCIPLES.md          # Core design and engineering principles (outranks AGENTS.md)
│   ├── HANDOVER.md            # Active project state, decisions, and roadmap
│   ├── markup/                # Canonical markup & rules, one file per component
│   └── audit/                 # Component inventory and audit findings
├── icons/
│   ├── icons.svg              # CANONICAL Single Source of Truth SVG sprite sheet (134 symbols)
│   └── icons.html             # Auto-synchronized standalone HTML preview
├── scripts/
│   └── sync-icons.js          # Synchronizer script (npm run sync:icons)
└── .agents/                   # Agent & developer skills and workflow guides
    └── skills/
        ├── modern-web-guidance/   # Chrome web standard best practices
        ├── tokens/SKILL.md        # Detailed token system specification & naming conventions
        ├── accessibility/SKILL.md # WCAG 2.2 compliance & auditing rules
        ├── recipe-composition/    # Decision-making heuristics & composite pattern guide
        └── css-commenting/        # CSS maintenance and block (/* */) commenting guide
```

---

## Commands & Development Workflow

### 1. Daily Development & Preview
| Command | Workspace / Context | Description |
| :--- | :--- | :--- |
| `npm run storybook` | `@design-for-humans/storybook` | Starts Storybook dev server on `http://localhost:6006` with live a11y checks. |
| `npm run build:storybook` | `@design-for-humans/storybook` | Generates static Storybook production bundle in `storybook-static/`. |
| `npm run docs` | `@design-for-humans/docs` | Starts the docs dev server on `http://localhost:4321` (search needs a build). |
| `npm run build:docs` | `@design-for-humans/docs` | Builds the docs site into `packages/docs/dist/` and its Pagefind search index. |
| `npm run build:site` | Root | Builds the docs and Storybook, with Storybook at `/storybook/` in `packages/docs/dist`: the whole public site. |
| `npm run check:docs` | Root | The docs gate: on every built page, internal links and anchors resolve, axe passes in light and dark, and nothing is out of reach at 10 screen sizes. Run `build:docs` first. |

### 2. Tokens & Assets Pipeline
| Command | Workspace / Context | Description |
| :--- | :--- | :--- |
| `npm run build:tokens` | Root | Compiles Tier 1 and Tier 2 of `tokens/*.json` into `packages/css/src/variables.css`. Tier 3 defaults live in the component CSS. |
| `npm run build:themes` | Root | Builds every theme in `tokens/themes`, running every gate on each. The default (`tokens/themes.json`) writes the library's own tokens: `tokens/1-global.json`, `2-semantic.json`, `component-theme.css`, `fonts.css`, then `variables.css`. Each other theme writes `packages/css/src/themes/<name>.css`: only the tokens it changes (in light, dark, inverted, high contrast and compact), its font faces and its component tokens, in the `tokens` layer, to link after the library. A theme with `"extends"` is a sub-brand: merged over its parent (objects merge, `null` removes), checked whole, and written as the difference from its parent's compiled tokens scoped to `.theme-<name>` (`:root` becomes the class; inverted blocks apply on and inside it), with every `:root` token that reads a changed one repeated in the scope. A sub-brand can't change an `@function` (type scale, shadows): the build fails it. Link a sub-brand after its parent. Writes the site theme's font links into the Storybook and docs heads. A theme that fails a gate writes nothing and the command fails. The `build:*` scripts below work on the default theme alone. |
| `npm run build:palette` | Root | Builds the Tier 1 colour ramps from the default theme and checks every Tier 2 pairing in light and dark; it also writes the high-contrast block (`$media "(prefers-contrast: more)"`, from the `contrast` section: each role moves that many steps along its ramp away from what it's paired with, neutrals at the ends become white or black, each mix gets one translucency step more solid; fails a pairing that loses contrast, reports text under 7:1) and checks the mixes (the colours made from another colour; fails: a colour or translucency step that doesn't exist, a `color.*` token made from another, a control edge or focus ring under 3:1); `-- --write` replaces the `color` block of `tokens/1-global.json` and the colour roles and mixes in `tokens/2-semantic.json` (only when the gate passes). Edit the theme, never the generated colours or role values. |
| `npm run build:type` | Root | Builds the type scale and text styles from the `type` section of the default theme and prints the steps (fixed, and at both ends of the fluid range), the styles, the font `<link>`s and the type gate (fails: broken references, a scale or hierarchy out of order, a minimum size that isn't a rem or px length or is above the base, a ceiling that isn't a length, a lower ceiling below the base or the floor, an upper ceiling below the lower, compact above fixed, fluid growth over 2.5×; reports: sizes under 12px, several steps at the minimum, a style at the minimum set at 400 or lighter (a thin font may need a larger floor), a body or body-lg line height under 1.5, a style a ceiling holds down, look-alike styles); `-- --write` (only when nothing fails) replaces the typography of `tokens/1-global.json`, the fluid type steps and the text styles in `tokens/2-semantic.json`, writes `packages/css/src/fonts.css` (the `@font-face` rules and the `:root` block that points the system-stack role tokens at the theme's fonts) and rewrites the font `<link>`s between the `<!-- theme fonts -->` markers in the Storybook and docs heads. A token that already resolves to a style's value is left as written. The scale's optional `min` (`"0.75rem"` in both full themes) raises every step below it, fixed and at both ends of the fluid range; it is written as `typography.font-size-min`, which the compiled CSS functions also apply. Two ceilings bring sizes down the same way: `scale.ceiling.lower` (default `3rem`) at the small end (fixed, compact, fluid's start) and `scale.ceiling.upper` (default `6rem`) at the large end, written as `typography.font-size-max-small` and `-max-large`; `0` lifts one. A style's fluid size starts at its fixed size and runs to its step on the large scale, or to `growTo`; cq sizes follow fluid. Edit the theme, never the generated steps. |
| `npm run build:space` | Root | Builds the fluid spacing roles (`breathe-sm`, `breathe`, `cushion`, `cushion-lg`) from the `space` section of the default theme, prints each at both ends of the fluid range and runs the space gate (positive, growing, each role at least the one before; the site width a length in rem, em, px or ch; each target a Tier 1 step of at least 24px, the default at least 44px, in order; the app's sidebar widths Tier 1 steps, compact no wider, and the landmark padding a role or a step that takes at most half the compact column); `-- --write` replaces `fluid.spacing` in `tokens/1-global.json`, points the `spacing.<role>` and `spacing.cq-<role>` tokens at it, and writes the theme's `site-width` and `targets` (`sm`, `default`, `lg`, in px) to `spacing.site-width` and `spacing.target-sm`, `target`, `target-lg` in `tokens/2-semantic.json`, and the theme's `app` sizes (`padding-inline`, a role name or a step in px; `sidebar-width` and `sidebar-compact-width`, in px) to `app.*`. Edit the theme, never the generated steps. |
| `npm run build:shape` | Root | Builds the radius and border roles, the lines (rule, panel, app, control, underline, focus ring) and the shadows from the `shape` section of the default theme, prints them and runs the shape gate (fails: a size that isn't a Tier 1 spacing step, roles out of order, a border under 1px, a missing default, a control edge, underline or focus ring set to none, a focus ring under 2px, a shadow level that reaches no further than the one below, a shadow colour outside the palette); `-- --write` adds any new Tier 1 steps to `tokens/1-global.json` (never removing one) and replaces those roles and shadows in `tokens/2-semantic.json`. Edit the theme, never the generated roles. |
| `npm run build:motion` | Root | Prints the durations and easings from the `motion` section of the default theme and runs the motion gate (fails: durations out of order, a curve CSS can't run); `-- --write` adds any new Tier 1 duration steps and replaces those roles. `duration.none` stays 0 and reduced motion still takes every duration to it. Edit the theme, never the generated roles. |
| `npm run build:components` | Root | Prints the Tier 3 tokens the `components` section of the default theme customises and runs the component gate (fails: an unknown token, a reference to nothing, a number token (an icon size in ems) that isn't a plain number above 0, a value that breaks out of its declaration, a part's own text and background under 4.5:1; warns: a colour measured only against the page's text or surface); `-- --write` writes `packages/css/src/component-theme.css`, which holds only those tokens, repeated for inverted and compact regions. Figma gets every Tier 3 value with these over the defaults. Edit the theme, never the generated file. |
| `npm run test:theme` | Root | Runs the theme engine's `node --test` suite. |
| `npm run designer` | Root | Starts the Token Designer prototype on `http://localhost:5180`. **Colors**, Global: ramps and their lightness curves; Semantic: a palette colour per role and mode, with each pairing's contrast, the mixes, and high contrast (its steps, its checks and a preview in it). **Typography** (`#type`), Global: fonts (Google, Adobe, stored in the project, system, with links out to Google Fonts and Adobe Fonts, and an optional name in Figma) and the page-head code, the family roles, the scale with its floor and lower and upper ceilings, the fluid range, every step and the type gate; Text styles: the type inside controls at each size, and each style's family, weight, line height, spacing, case, steps and growth, with a specimen, its checks, and a preview whose sizing and width controls show fluid and cq sizes. **Spacing** (`#space`): the base and ratio, each fluid role's start and step, both ends drawn to scale, the site width (free text), the three target sizes, the App shell (landmark padding as a role or a step, the sidebar and compact sidebar widths), and the space gate. **Shape** (`#shape`): the radius and border roles and each one's default, the lines (each one's width, colour, style, radius and offset), every shadow level's layers (each size picked from the Tier 1 spacing steps) and the shadow colours in both modes, drawn in the preview with real components, and the shape gate. **Motion** (`#motion`): the durations and easing curves, run on demand in the preview, and the motion gate. **Components** (`#components`): every Tier 3 token as a dropdown in logical groups (a plain number, such as the Icon's base size or the Button's icon size in ems, as a number field), starting on its default, with revert per token and per component; the preview shows the open component's live examples from `docs/markup`. **Export** has tabs. **Theme** and **Colors** copy or download the theme, or the colour ramps as Tier 1 JSON, `variables.css` custom properties, the blog's `_tier1.scss` or an Adobe Swatch Exchange file (download only), or the customised component tokens as CSS. **Figma** (dev only) saves the theme if it has changed, runs `build:themes` and `export:figma`, and lists the open theme's Figma files to download, with the plan each set needs. The menu drawer (the logo) picks a full theme, then one of its sub-brands (`?theme=<name>`; the default theme otherwise), and **New sub-brand** opens a dialog (the name is made lower case and hyphenated, and refused if it exists). On a sub-brand the drawer counts its overrides and opens **Changes and how to use it**: a dialog with the stylesheet links and class it needs, and each overridden value beside its parent's (a light/dark pair as one row; a ramp the parent lacks reverts with what uses it), each with **Revert**, plus **Revert all**. Save writes only the overrides. **New theme** (under the theme choice) copies a full theme into a new, independent one. Archive (dev only, beside New theme for a full theme and beside a sub-brand's changes) moves it to `tokens/themes/archive/`, which nothing builds or exports, and removes its stylesheet and Figma files; the drawer's **Archived** list restores it. A theme that sub-brands extend, or one `tokens/themes.json` names, can't be archived. **Save** writes `tokens/themes/<name>.json`; **Publish** (dev only, every gate must pass) also runs `build:themes` and `export:figma`. **Real world** (in the header) opens `real-world.html` in another tab: whole pages for a made-up gardening company, Gardens of Eden (a homepage, a blog entry, a compact staff inventory), as tabs of frames with a width choice and light and dark. The Designer sends its preview's theme, component tokens and fonts over a `BroadcastChannel` as they change, so edits show there live. The pages (`packages/token-designer/src/real-world/*.html`) are library markup only, like the recipes; a page that needs CSS of its own means the library is missing something. Photos are from Unsplash, credited in `public/real-world/photos/CREDITS.md`. |
| `npm run export:figma` | Root | Exports every theme to Figma (run `build:themes` first): the default into `packages/figma-sync/dist/` (Tokens Studio, and Native Variables as one unified single-mode collection or five modular ones: Color (Light, Dark), Structure (one mode, with each fluid type step's large end), Font sizing (Fixed, Fluid Large, Compact: each text role's size, as `.font-sizing-*` and `.ui-compact`) Spacing (Fixed, Fluid Large: the fluid spacing roles at each end) and Pointer (Touch, Fine: `spacing/target-min` and what reads it, as `.fine:targets-sm` sets it), built in `packages/figma-sync/modes.js`), each other theme and sub-brand the same way into `dist/themes/<name>/`, and each theme with sub-brands into `dist/themes/<name>-modes/`: the modular collections with a mode per brand in each of their modes, merged by variable name (a collection every brand shares keeps its own modes). Every variable carries its CSS name as WEB code syntax (`var(--surface-card)`; none for the Figma-only shadow layers) and scopes for where it applies; the Tier 1 colour steps are hidden from publishing. Fonts export by their `figma` name in the theme when they have one; Tokens Studio's theme groups are Color, Font sizing, Spacing and Pointer. Steps for designers: `packages/docs/src/content/docs/tools/figma.mdx`. Figma's modes per collection: Starter 1, Professional 10, Organization 20, Enterprise 40; the modes README says which plan a family needs. |
| `npm run build:css` | Root | Publishes the library for sites that link it (the blog, the course) under `packages/docs/public/css/<version>/`, served at `components.designforhumans.blog/css/<version>/`: `dfh-components.css` (`index.css` and its imports in one minified file, with the layer order), `themes/<name>.css` for each theme and sub-brand, and `fonts.css` when the default theme stores fonts. The version is `packages/css/package.json`'s. A published version never changes: when the files would differ, the build fails and asks for a new version. Commit the folder; `build:site` publishes it. Run `build:themes` first. |
| `npm run sync:icons` | Root | Propagates `icons/icons.svg` to CSS package, Storybook, Astro docs, and Craft CMS blog. |
| `npm run check:tokens` | Root | Fails when a Tier 3 token's value in `tokens/3-component.json` differs from a fallback the CSS gives it, the CSS reads it with no fallback, or nothing reads it. Tier 3 counts as unset, as it is in `variables.css`. |
| `npm run check:layout` | Root | Loads the built Storybook's stories (or `-- '<id pattern>'`) in headless Chrome, layouts and recipes at 12 screen sizes and components at 320px and a desktop width, and fails on content a clipping element strands out of reach, or a page wider than the screen. Run `build:storybook` first. |
| `npm run check:targets` | Root | Loads the built Storybook's component and recipe stories (or `-- '<id pattern>'`) in headless Chrome, with touch targets and with fine-pointer targets, at a desktop and a phone width, and in forced colours. Fails on: a control whose hit area is under the target its own `--spacing-target-min` asks for (text fields and choice rows 32px; text links WCAG's 24px or spacing; links in running text exempt), a hit area that reaches past the bar holding it (header, tab list, batch actions, pagination), a control whose border or fill disappears in forced colours, and a selected or current item that looks like its neighbours there. `ROOT_STYLE='--token: value'` tries a token on `:root` without a rebuild. Run `build:storybook` first. |
| `npm run check:focus` | Root | Tabs through the built Storybook's component, layout and recipe stories (or `-- '<id pattern>'`) in headless Chrome and fails on a focus stop where nothing visibly changes: the outline, shadow, border or background of the focused element, its pseudo-elements, or the visible element drawing a hidden input's ring. Run `build:storybook` first. |

### 3. Linting & Testing Status
- **Formatting:** Prettier (`^3.0.0`) configured via package.json.
- **Linter:** TODO (No standalone `npm run lint` script or stylelint configured yet; manual adherence to CSS commenting and zero-specificity rules required).
- **Accessibility / Automated Testing:** Every Storybook story automatically runs axe-core assertions via `@storybook/addon-a11y`.
- **Layout reachability:** `npm run check:layout` (after `build:storybook`) checks that no clipping element strands content at any of its screen sizes, and that no story is wider than the screen, down to 320px. Run it after any change to layout, shell, sidebar or recipe CSS.
- **Visible focus:** `npm run check:focus` (after `build:storybook`) tabs through every story. Run it after any change to focus styles or to a control that hides its input.
- **Targets and forced colours:** `npm run check:targets` (after `build:storybook`) checks hit areas in both pointer modes, bars against their targets, and forced colours. Run it after any change to a control's size, a bar or a forced-colors block.
- **Unit / Integration Tests:** TODO (No Jest/Vitest runner configured yet).

---

## Sites That Use the Library
The blog and the course link the library; they hold no copy of it.
- **Library Repo:** `DFH-Components` (`/Users/paulwoods/Sites/DFH-Components`)
- **Blog Repo:** `designforhumans-blog` (`/Users/paulwoods/Sites/designforhumans-blog`), live at `designforhumans.blog`
- **Course Repo:** `DFH-Course-Theme` (`/Users/paulwoods/Sites/DFH-Course-Theme`), live at `courses.designforhumans.blog`

1. **Linking:** each site's head links, from `components.designforhumans.blog/css/<version>/`, `dfh-components.css`, `themes/dfh.css` and its sub-brand (`themes/blog.css` with `theme-blog` on `<html>`; the course's four `themes/course*.css` with `theme-course` on `<html>` and a lesson's class beside its `data-lesson` or `data-syllabus`), then DFH Shared Styles, then its own CSS. The blog pins the version in `templates/_layout.twig` (`DFH_COMPONENTS_CSS` in its `.env` points at a local build); the course in `dfh_library_css()` in `functions.php` (`DFH_COMPONENTS_CSS` in `wp-config.php`).
2. **Releasing:** a change the sites should get is a new version: raise `packages/css/package.json`'s version, run `build:themes` and `build:css`, commit and push (the docs deploy publishes it), then raise the version each site pins and check it there.
3. **The sites' own CSS:** what the sites share (the article, section, index card, card list, brand frame, site trail and their component token choices) is DFH Shared Styles (`/Users/paulwoods/Sites/DFH-Shared-Styles`), plain CSS bundled with Lightning CSS and released as git tags served by jsDelivr; each site pins a tag (`DFH_SHARED_CSS` overrides it, like `DFH_COMPONENTS_CSS`). It is never library CSS. The blog's own pages are plain CSS too, one file per component in `web/styles/src/`, bundled by `npm run build:css` (Lightning CSS) into `web/styles/css/dfh-blog.css`; the course compiles `scss/dfh-course.scss` with `/opt/homebrew/bin/sass --style=compressed`. Each appends to the library's layers: tokens to `tokens`, what WordPress's output still needs to `reset`, components to `layout` until the site pins a version that declares `site`, then to `site`. Before then, `@layer site` would land after `overrides` and beat the utilities.
4. **Icon Propagation:** `DFH-Components/icons/icons.svg` is the single source of truth. Running `npm run sync:icons` automatically writes updated sprites to `designforhumans-blog/templates/_icons.twig` and `designforhumans-blog/web/web/symbol-defs.svg`.

---

## Naming & Architectural Conventions

### 1. Token Architecture (W3C DTCG 3-Tier)
- **Tier 1 (Global):** `tokens/1-global.json` — Foundation values (`palette.*`, `space.*`, `font.*`).
- **Tier 2 (Semantic):** `tokens/2-semantic.json` — Functional UI roles using `light-dark()` (`surface.*`, `foreground.*`, `border.*`, `shadow.*`, `focus.*`). Colour roles point straight at the palette, `light-dark({color.neutral.800}, {color.neutral.000})`, and are written from the default theme; there are no in-between "bridge" colours. The `.color-palette-inverted` block is generated by swapping each role's two branches.
- **App-level sizes** are Tier 2, in the `app` group: the landmark borders, their inline padding (`--app-padding-inline`, resolved on `:root` so a compact region doesn't move it) and the sidebar column (`--app-sidebar-width`, which `.ui-compact` and `.fine:ui-compact` set to `--app-sidebar-compact-width`). When parts must line up with each other (the Sidebar, a `split--sidebar`, a Header split over them), they read the app token, never another component's Tier 3.
- **Tier 3 (Component):** `tokens/3-component.json` — Specific component variables (`button.*`, `dialog.*`, `table.*`).
- **CSS Variable Mapping:** Formatted as `--<domain>-<prop>` (e.g. `--surface-card`, `--focus-ring-color`).
- **Component Private Manifest:** Local component variables use `--_<component>-<prop>` (e.g. `--_button-bg`, `--_card-padding`).

### 2. Component Class Names & BEM-Lite
- **Block:** `.card`, `.button`, `.badge`, `.dialog`, `.field`
- **Modifiers:** BEM double-hyphen syntax: `.button--strong`, `.button--accent`, `.card--compact`, `.dialog--scrollable`
- **Sub-elements:** BEM double-underscore syntax: `.card__header`, `.card__title`, `.card__body`, `.card__footer`, `.field__label`

### 3. Spatial Layout Primitives vs. Utilities Law
- **Spatial Layout Primitives** (`.inline`, `.stack`, `.grid`, `.cluster`, `.split`, `.wrapper`, `.app`, `.app__workspace`, `.main`) are structural orchestration components managing geometry, gap, and child distribution. Their hooks (`--gap`, `--align-items`, `--justify-content`, `--grid-min`, `--split-*`) are registered with `inherits: false`, so they stay on the element they are set on, and their gaps step down under `--ui-sizing: compact`. `.sidebar` and `.footer` are organisms.
- **Utilities** (§36) set one property each, on logical properties, from Tier 2 tokens. Each has at most two names: the verbose one (`.padding-inline-sm`, `.display-none`) and Tailwind's shorthand where it means the same (`.px-sm`, `.hidden`). Markup uses the shorthand: `.p-sm`, `.mx-auto`, `.ps-sm`, `.gap-sm`, `.border`, `.border-t`, `.rounded-md`, `.font-bold`, `.text-muted`, `.text-start`, `.truncate`, `.whitespace-nowrap`, `.z-sticky`, `.sr-only`. Spacing keeps Tailwind's prefixes with the library's step names. No left/right names (use `s`/`e`), no bare single letters, and `display: inline` is `.display-inline` only (`.inline` is the layout primitive). `npm run check:utilities` enforces the names.
- **Not utilities:** type size (use a text atom), a row or column of things (use a layout primitive), a component's width or surface (set its token). Don't add `.items-center` to `.inline` or `.cluster` (they centre already) or `.justify-between` to `.inline` (use `.inline--between`).

---

## CSS Architecture & Cascade Order
The stylesheet cascade is strictly defined in `packages/css/src/index.css`:
1. **Reset:** `@import './reset.css';`
2. **Tokens & Variables:** `@import './variables.css';`
3. **Atoms:** `@import './atoms/*.css';` (indivisible controls)
4. **Molecules:** `@import './molecules/*.css';` (composed units)
5. **Organisms:** `@import './organisms/*.css';` (composite assemblies)
6. **Layout Primitives:** `@import './layout/*.css';` (spatial shells)
7. **Utilities:** `@import './utilities/*.css';` (immutable overrides)
8. **Overrides:** `@import './overrides.css';` (project-specific overrides)

**Cascade layers (PRINCIPLES §7):** `index.css` declares
```css
@layer reset, tokens, atoms, molecules, organisms, layout, site, utilities, overrides;
```
and imports every stylesheet into its layer, so utilities and overrides win by layer, never by specificity. Components stay wrapped in `:where()`, so specificity inside a layer is zero. The library leaves `site` empty for the sites that use it (their components, after the library's and under its utilities); never put library CSS there.

**Fonts (PRINCIPLES §4):** Library CSS must not load fonts or make any external request. Font tokens default to system stacks; a theme's fonts come with its stylesheet (`fonts.css` for the default, `themes/<name>.css` for the others), and Storybook (`.storybook/preview-head.html`) and the docs site load the site theme's fonts in the page head.

---

## Core Architectural Law: The Organism-Atom Composition Law

> **Fundamental Axiom:** *Organisms orchestrate layout geometry; Atoms dictate elemental styling.*

In Design For Humans, composites (the `.card`, `.poster`, `.banner`, `.lockup`, `.telemetry` and `.empty-state` molecules; the `.dialog`, `.table` and `.tabbed-content` organisms) compose foundational **Atoms** (`.button`, `.heading`, `.subheading`, `.small-heading`, `.micro-heading`, `.display-title`, `.text`, `.small-text`, `.micro-text`, `.label`, `.list`, `.badge`, `.status`, `.chip`, `.kbd`, `.icon`, `.avatar`, `.thumbnail`, `.brand`).

### 1. The Zero-Specificity Cascade Rule
All component primitives are wrapped in `:where(...)` to ensure a level playing field with zero specificity `(0, 0, 0)`. Because organisms are imported downstream from atoms in the stylesheet cascade, **any typography property declared on an organism hook (even `inherit` or `font-size: 1rem`) will clobber atom utility classes placed on that element**.

```
❌ ANTI-PATTERN: Organism declares typography styles
:where(.card__title) { font-size: inherit; font-weight: 700; }  <-- Cascades downstream, crossing out .heading!

✅ DESIGN FOR HUMANS LAW: Organism element hooks declare ONLY layout geometry
:where(.card__title) { margin: 0; min-inline-size: 0; text-wrap: balance; }
```

### 2. Constraints on Organism Element Hooks
Organism sub-element hooks (`.card__title`, `.card__subtitle`, `.card__band`, `.empty-state__title`, `.empty-state__description`, `.stepper__title`, `.stepper__description`, `.menu__heading`, `.combobox__group-label`, etc.) are **structural layout hooks only**:
- **ALLOWED declarations:** `margin: 0; min-inline-size: 0; text-wrap: balance; flex: 1; align-self: stretch; color: var(--_...-color); user-select: none;`
- **FORBIDDEN declarations:** `font-size`, `font-family`, `font-weight`, `line-height`, `letter-spacing`, `text-transform`, or `inherit`.

### 3. Typography Sizing Modes (`--font-sizing`)
Text atoms are **fixed** by default: each takes one step of the scale at every width. A container chooses another mode for everything inside it with `--font-sizing`, normally through the appearance-mode classes:

| Mode | Set with | Effect |
| :--- | :--- | :--- |
| fixed | (default), `.font-sizing-fixed` | One step at every width |
| fluid | `.font-sizing-fluid` | Grows with the viewport |
| cq | `.font-sizing-cq` on a container with `container-type: inline-size` | Grows with the container (`cqi`) |
| compact | `.font-sizing-compact`, `.ui-compact`, any `--compact` container | One step down |

Some organisms set the mode themselves: `.dialog` and `.stepper` use `cq` (with `container-type: inline-size`); `.card`, `.menu`, `.navigation-tree`, `.table`, `.banner` and `.accordion` reset to fixed (a dialog passes `cq` to its card through `--card-font-sizing`). Prose takes no mode of its own: it follows the mode around it, and so does its rhythm. The docs site puts `.font-sizing-fluid` on its article.

### 4. Container Density & Sizing Orchestration (`--ui-sizing: compact` & `--font-sizing: compact`)
When an organism or molecule enters compact density (the only density modifier is `--compact`; `--dense` is legacy) (`.stepper--compact`, `.card--compact`, `.menu--compact`, `.table--compact`, `.accordion--compact`, `.empty-state--compact`), declare:
```css
--ui-sizing: compact;
```
This steps every nested text atom (`.display-title` through `.micro-text`) down to its compact size (`--title-compact-font-size`, `--body-sm-compact-font-size` and so on) via `@container style(--ui-sizing: compact) or style(--font-sizing: compact)` container style queries without manual utility overrides or invasive class juggling.

To step down typography alone without changing container geometry, set `--font-sizing: compact` on the region instead. Size modifiers (`--sm`, `--lg`) belong to atoms and controls only; containers never take a size modifier.

### 5. Tier 3 Token Economy
Never create redundant Tier 3 component tokens for heading or description typography (e.g. `card.title-font-size`, `empty-state.title-font-size`, `stepper.title-font-size`, `menu.header-font-size`). Typography is owned globally and composed atomically.

---

## Component Markup
Canonical markup and per-component rules live in `docs/markup/`, one file per component. Read a component's file before writing or reviewing its markup, and update it in that component's pass. References to "§N" in this file and the audits mean `docs/markup/NN-*.md`.

The markup docs also feed the docs site (`packages/docs`, plan in `docs/audit/docs-site.md`). A doc becomes a page once it has frontmatter: `title`, `tier` (`atom` | `molecule` | `organism` | `layout` | `utility`), `summary` (one sentence for people), and optionally `tokens` (its key or keys in `3-component.json`), `storybook` (story ids) and `related` (other pages' slugs). Its sections, in order: a live example of the default component, or a playground where it has axes (right after the `#` heading, with no heading of its own, so it is the first thing on the page), **Purpose** (why it exists), **When to use**, the **Rules** that shouldn't be missed, **Keyboard and screen readers** (on components with behaviour: what the browser provides and what the product must script), two to four examples that each teach a decision, **Do and Don't** (a two-column table), then **## Reference**. The site stops at Reference: everything below it (the Options table, further rules, every variant) is for looking up, in the file or in Storybook, which must cover it. The page's foot is generated: **In Storybook** (every variant and state, and the tokens) and **See also**. Write component names with capitals in prose (a Button Group, the Card, Buttons), so they read as the component; code and generic uses (a data list, a column header, the inline axis) stay as they are. Pages are public: link a keyword to another doc (`[tooltip](23-tooltip.md)`), never a `§` reference (the build fails on one) or a lettered heading, and leave out audit references, removed names (`docs/audit/removed-names.md`) and anything only Storybook uses (its scaffolding is the `.sb-demo-*` classes in `.storybook/demo.css`). An ` ```html live ` fence (`live cluster` for a row, `live width=md` to cap its width with that `.max-w-*` step) renders on the page with its code closed under it; ` ```html playground ` adds a control per axis (the markup with `data-axes` after the class of the element that changes and `data-label` on text a choice replaces, then `---` and a line per axis: `Intent: Neutral, Danger=button--danger "Delete project"`; `*` marks the starting choice where it isn't the first). Either must be complete, valid markup that passes axe: real text, unique ids, icons as `href="#Name"`, images from `/examples/`. Keep fragments in plain ` ```html ` fences. Run `npm run build:docs && npm run check:docs` after editing a doc that has a page.

| File |
| :--- |
| [Button Primitive](docs/markup/01-button.md) |
| [Modal Dialog Primitive (Native HTML `<dialog>` composed with `.card`)](docs/markup/02-modal-dialog.md) |
| [Popover](docs/markup/03-popover.md) |
| [Menu](docs/markup/03b-menu.md) |
| [Accordion](docs/markup/04-accordion.md) |
| [Badge, Status, Chip & Kbd Primitives](docs/markup/05-badge-status-chip-kbd.md) |
| [Avatar & Avatar Group](docs/markup/06-avatar.md) |
| [Lockup](docs/markup/06b-lockup.md) |
| [Thumbnail](docs/markup/06c-thumbnail.md) |
| [Brand](docs/markup/06d-brand.md) |
| [Input & Form Control Primitives](docs/markup/07-form-controls.md) |
| [Form Composition: Field, Fieldset, Choices & Form](docs/markup/07b-form-composition.md) |
| [Skip Link Primitive (WCAG 2.4.1 Bypass Blocks)](docs/markup/07-skip-link.md) |
| [Link & Block Link Primitives](docs/markup/08-link-block-link.md) |
| [Icon & Icon Box Primitives](docs/markup/09-icon-icon-box.md) |
| [Card Primitive](docs/markup/10-card.md) |
| [Poster](docs/markup/10b-poster.md) |
| [Banner](docs/markup/11-banner.md) |
| [Prose](docs/markup/12-prose.md) |
| [Table](docs/markup/13-table.md) |
| [Button Group](docs/markup/14-button-group.md) |
| [Divider Primitive](docs/markup/15-divider.md) |
| [Breadcrumb](docs/markup/16-breadcrumb.md) |
| [Navigation Tree](docs/markup/16b-navigation-tree.md) |
| [Pagination](docs/markup/17-pagination-page-count.md) |
| [Toast (Banners in a Live Stack)](docs/markup/18-toast.md) |
| [Batch Actions](docs/markup/18b-batch-actions.md) |
| [Wrapper](docs/markup/19-wrapper.md) |
| [Grid](docs/markup/19b-grid-grid-carousel.md) |
| [Split](docs/markup/19c-split.md) |
| [App Shell (`.app`, `.app__workspace`, `.main`)](docs/markup/19d-app-shell.md) |
| [Text & Heading Primitives (Typography Presets)](docs/markup/20-text-heading.md) |
| [Banner Dock (Site Announcements Pinned to the Page Edge)](docs/markup/21-banner-dock.md) |
| [Stack, Inline & Cluster](docs/markup/22-stack-inline-cluster.md) |
| [Tooltip](docs/markup/23-tooltip.md) |
| [Tabs (Tab Atom, Tab List Molecule & Tabbed Content Organism)](docs/markup/24-tabs.md) |
| [Progress & Meter Primitives](docs/markup/25-progress-meter.md) |
| [Skeleton Primitive (Content Loading Placeholders)](docs/markup/26-skeleton.md) |
| [Empty State](docs/markup/27-empty-state.md) |
| [Combobox](docs/markup/28-combobox.md) |
| [Code Block](docs/markup/37-code-block.md) |
| [Stepper](docs/markup/30-stepper.md) |
| [Telemetry](docs/markup/30-telemetry.md) |
| [Responsive Helpers](docs/markup/31-responsive-visibility.md) |
| [Component Recipes & Composed Patterns](docs/markup/32-recipes.md) |
| [Header](docs/markup/33-header.md) |
| [Sidebar](docs/markup/34-sidebar.md) |
| [Footer](docs/markup/35-footer.md) |
| [Utilities](docs/markup/36-utilities.md) |

---

## Non-Negotiable Architectural Rules

### 1. Zero Legacy Hacks — Rely on Native Primitives
- **Overlays & Dialogs:** Use native HTML `<dialog>` with `.showModal()`. Never generate custom `div` modals or JS focus traps.
- **Popovers:** Use the native `popover` attribute with `popovertarget` or `interestfor`. The invoker is the implicit anchor; `.popover` and `.tooltip` place themselves with `position-area`, so markup needs no `anchor-name` or `position-anchor`.
- **Menus & Action Sets:** A menu is a `<menu>` list of `.button`s with no ARIA menu roles; a set of related controls is a labelled `role="group"`, not `role="toolbar"`. Both roles promise arrow-key handling that needs a script, and the library ships none.
- **Interactive Controls:** Always use native semantic elements (`<button type="button">`, `<a href="...">`, `<input>`, `<textarea>`). Never create untyped clickable `<div>` or `<span>` elements.
- **Form Growth & Sizing:** Use `field-sizing: content;` on `<textarea>` instead of manual JavaScript height auto-expansion listeners.
- **Validation Timing:** Use `:user-invalid` and `:user-valid` rather than `:invalid` to prevent premature error styling on pristine/unvisited fields.
- **Animatable Keywords:** Use `interpolate-size: allow-keywords;` on `:root` instead of manual height-measuring JavaScript for expand/collapse transitions.
- **Typography Alignment:** Use `text-box: trim-both cap alphabetic;` for exact typographic bounding boxes without phantom leading.

### 2. Strict Token Compliance & W3C DTCG Standard
- **W3C DTCG Format:** All tokens use `$value`, `$type`, and `$description`. Group-level `$type` inheritance is supported.
- **Never Hardcode Literals:** No raw `#hex`, `rgb()`, `px`, or `rem` in component CSS. Every color, spacing, radius, border, and duration must reference custom properties from `packages/css/src/variables.css`.
- **Resilient Fallback Philosophy (Unstyled Resilience):**
  - Component CSS variable declarations should never use complex hardcoded multi-layer strings or arbitrary hex codes as fallbacks.
  - If a token system fails to load, a stylesheet is consumed in isolation, or CSS variables are absent, the site must degrade gracefully into a functional, legible, unstyled state.
  - **Terminal Fallback Standards:**
    - **Shadows:** Always terminate at `none` (or `0 0 0 transparent`), e.g. `var(--component-shadow, var(--shadow-md, none))`. Never hardcoded `rgba(...)` multi-layer stacks.
    - **Borders:** Border colors terminate at `currentColor` (or `transparent` when borderless); border widths terminate at `1px` or `0px`.
    - **Surfaces & Backgrounds:** Terminate at `Canvas`, `Highlight`, or `transparent`. Never hardcoded `#ffffff` or arbitrary hexes.
    - **Foregrounds & Text:** Terminate at `currentColor` or `CanvasText`.
- **Token Tier Boundary:** Components reference Tier 2 semantic tokens and their own optional Tier 3 hooks. A Tier 1 scale step may appear only as a hook's default, and only where no Tier 2 token means that step: `var(--badge-gap, var(--spacing-12))`, `var(--button-gap, var(--spacing-sm))`. Never `gap: var(--spacing-12)`, and never a raw `--color-*` ramp.
- **Tier 3 Defaults Live in the CSS:** Tier 3 isn't compiled into `variables.css`. Each token's default is the fallback where the CSS reads it, and `tokens/3-component.json` holds the same value for Figma. Change both together; `npm run check:tokens` fails on a mismatch, a read with no fallback or a token nothing reads. A theme customises a token in the `components` section of the default theme, not by changing its default. Outside a component's stylesheet, never read a Tier 3 token without its fallback.
- **No Literal Colour Fallbacks:** `var(--button-bg, #1a1a1a)` fails review. Chain to a semantic token and end at a system value: `var(--button-bg, var(--surface-neutral, Canvas))`.
- **Semantic Fallbacks in CSS:** When using component tokens, always supply semantic fallbacks: `var(--component-x, var(--<domain>-x, <basic-terminal-fallback>))`.
- **Dual-Bridge Strategy (Web & Figma):**
  - Token source (`1-global.json`) contains the pure modular scale (`-2` to `8`) without web math or `fluid-N` clutter.
  - Web compiler (`compile-tokens.js`) writes fluid sizes three ways, oldest first so each newer one wins where it's supported: `clamp()` in `:root`, then `progress()` in `@supports (opacity: progress(1px, 0px, 1px))`, then the `@function`s in `@supports at-rule(@function) and (opacity: progress(1px, 0px, 1px))`. When a method becomes Baseline Widely Available, drop the one before it. A theme's CSS (`build:themes`) repeats a changed token in every `:root` block that sets it, in the same order, so a theme linked after the library keeps all three.
  - Figma exporter (`export-figma-tokens.js`) converts all tokens to static pixel floats/dimensions and native shadows for $0 free-tier Tokens Studio and Figma Variables.
- **Token Editing:** To add or update tokens, edit `tokens/1-global.json`, `tokens/2-semantic.json`, or `tokens/3-component.json` (with its fallback in the CSS), then execute:
  ```bash
  npm run build:tokens
  npm run export:figma
  ```
- **Elevation & Shadows Architecture (3-Layer Stacks & CSS Level 5 `@function`):**
  - Shadows use 3-layer Gaussian blur stacks (`sm`, `md`, `lg`, `inner` and `-light` variants) with decomposed layer variables (`--_shadow-*-layer-[1..3]`).
  - Web compiler emits native CSS functions (`@function --shadow-sm(--color: black) { result: ... }`) enabling zero-JS parameterized recoloring without repeating 3-layer declarations.
  - Full universal backward compatibility via `@supports at-rule(@function)` and contextual CSS custom property inheritance (`--shadow-color: [any-color]; box-shadow: var(--shadow-md, none);`).
  - ⚠️ **Firefox Compatibility Gotcha:** Firefox does not yet support CSS `@function`. Writing `box-shadow: --shadow-md(...)` directly causes Firefox to drop the property entirely. Always guard `@function` with `@supports at-rule(@function)` or cascade fallback to `var(--shadow-md)`.
- **Light/Dark Mode:** Never write redundant `.dark-mode` class blocks. Use native `light-dark()` in tokens and rely on `color-scheme: light dark;`.

### 3. Top-Layer Animations
- Elements entering/exiting the top layer (`dialog`, `[popover]`) must use:
  - `@starting-style` for entry animations.
  - `transition-behavior: allow-discrete;` on `display` and `overlay`.
  - Animate `::backdrop` smoothly alongside the dialog.
  - Full `@media (prefers-reduced-motion: reduce)` fallbacks.

### 4. Accessibility First (WCAG 2.2 AA / AAA)
- **High-Contrast Focus Visible:** Every interactive element must display `outline: var(--focus-ring-width) solid var(--focus-ring-color)` with `outline-offset: var(--focus-ring-offset)`.
- **Target Sizes:** Primary buttons and touch targets must meet `--button-min-size: var(--spacing-target)` (`3rem` / `48px`, exceeding WCAG 2.5.5). Small variants must meet at least `24x24px` (WCAG 2.5.8), and on coarse pointers keep a 48px hit area via a transparent `::after` or padding buffer.
- **Intent Is Never Colour Alone (WCAG 1.4.1):** Every danger, warning, success, info or accent variant must also carry an icon, role or descriptive text.
- **Automated Axe Audits:** Every Storybook story must pass `@storybook/addon-a11y` without contrast, labeling, or keyboard violations.
- **Standards Decide, Not the Tool:** When axe fails something, check it against the HTML and ARIA specs. If they allow it, keep the markup and turn the rule off in `scripts/check-docs.mjs` and `.storybook/preview.ts` with the reason (an `<aside>` in `<main>` is the case so far).
- Consult `.agents/skills/accessibility/SKILL.md` for specific ARIA patterns.

### 5. Local Private Variables Manifest & State Variable Contract
- In component stylesheets, define all local fallback ladders at the top of the base `:where(.<component>)` selector using the private `--_<component>-*` prefix.
- **Interactive State Contract:** Declare `--_<component>-hover-*` and `--_<component>-active-*` private variables at the component root. Handle `:hover` and `:active` **strictly once** inside the base selector consuming these variables.
- Modifiers (`.<component>--accent`, `.<component>--subtle`, `.<component>--compact`) act as **pure token maps** that re-assign private variables rather than duplicating pseudo-classes or declarations.
- Child elements and pseudo-elements must consume `var(--_<component>-*)` directly.

### 6. Container Style Queries (`@container style(...)`)
- Support zero-class contextual styling by declaring `@container style(--<component>-variation: ...)` and `@container style(--<component>-corners: ...)` directly in the base component.
- Enables parent containers to orchestrate children cleanly: `.navigation { --button-prominence: subtle; --button-corners: round; }`.
- Name flags after the PRINCIPLES axis they set: `--<component>-prominence`, `--<component>-intent`, `--<component>-size`, `--<component>-corners`. Density is never a per-component flag; use `--ui-sizing: compact`. Button is the reference implementation; older `--<component>-variation` flags are migrated in each component's pass.

---

## Component Authoring Workflow
1. **Check Tokens:** Verify required tokens exist in `tokens/3-component.json`. If missing, add them and run `npm run build:tokens`.
2. **Author CSS:** Create `packages/css/src/{atoms,molecules,organisms}/<component>.css` based on the component's Atomic Design tier. Use `:where()` for low specificity, local private variables manifest (`--_<component>-*`) with state contract (`--_<component>-hover-*`, `--_<component>-active-*`), container style queries (`@container style(...)`), native CSS nesting with explicit `&` for states (`&:hover`, `&:active`, `&:focus-visible`), logical properties (`inline-size`, `block-size`, `padding-inline`, `padding-block`), and standardized section comments. Consult `.agents/skills/tokens/SKILL.md` (Section 4) and `.agents/skills/css-commenting/SKILL.md` for full guidelines.
3. **Register in Entrypoint:** Add `@import './{atoms,molecules,organisms}/<component>.css';` into the appropriate Atomic tier in `packages/css/src/index.css`.
4. **Author Storybook Stories:** Create `packages/storybook/stories/{atoms,molecules,organisms,layout,utilities,recipes}/<component>.stories.ts` with matching `title: '{Atoms,Molecules,Organisms,Layout,Utilities,Recipes}/...'`, covering all variants, sizes, states (`hover`, `active`, `disabled`, `aria-disabled`), and verify with `npm run build-storybook --workspace=@design-for-humans/storybook`.