# Component Inventory (read-only audit, step 1)

Generated 2026-10-27 from `packages/css/src/**` and `tokens/*.json`. **No code was changed.**
Judged against [docs/PRINCIPLES.md](../PRINCIPLES.md). Modifier lists were extracted by pattern (`.block--mod`, `.block__el`), so they include aliases and cross-component selectors. Atomic level = folder the file lives in; where I think the folder is wrong I say so.

## 0. How to read this

**Shared axes (PRINCIPLES §2):** Pointer · Density · Presentation · Prominence.

Many modifiers fit none of these four. I tag every modifier with one of:

| Tag | Meaning | Maps to a shared axis? |
| --- | --- | --- |
| **SIZE** | `--sm --lg --xl --xs --2xs --2xl` (scales the component's own type/padding) | No. Size is not one of the four axes (see §A) |
| **DENS** | `--compact --dense --tight --loose --cushioned` | Density |
| **PRES** | `--plain --flush --bordered --ruled --translucent --hollow --panel --ghost --unstyled --bare --no-icon --no-arrow` (chrome on/off) | Presentation, partly. See §A |
| **PROM** | `--strong --subtle --accent --primary --selected` | Prominence |
| **INTENT** | `--danger --success --warning --error --info --destructive` | **No axis.** See §A |
| **SHAPE** | `--round --square --pill --circle` | **No axis** |
| **ORIENT** | `--vertical --horizontal --inline --stacked --reverse --start --end --left --right --center` | **No axis.** Layout/alignment |
| **POS** | placement, e.g. `tooltip--bottom`, `toast-stack--top-end` | **No axis.** Behavioural config |
| **BEHAV** | `--sticky* --scrollable --fixed --floating --docked --live --dismissing` | **No axis.** Behaviour/state |
| **CONTENT** | content-specific hooks, e.g. `table__cell--num`, `skeleton--w-50` | **No axis.** Part of the component contract, not a variant |

## 1. Summary of findings

1. **Size and density are conflated** in at least 12 components (§A.1). `--compact`, `--dense` and `--sm` are frequently aliases of one rule, and `--compact` additionally switches `--ui-sizing`, which steps down typography.
2. **Pointer axis is almost absent.** `pointer: fine` is used in only `table.css` and `utilities/appearance-modes.css`. Touch-target size is bound to size modifiers (`--sm` → `--spacing-target-sm` = 32px), not to pointer (§A.2).
3. **Hex literals live in component fallbacks** (e.g. `#008076`, `#ffffff`, `#d32f2f`) in 20+ files. `button.css` alone has about 85 occurrences. This violates PRINCIPLES §5 ("raw values never appear in a component") and AGENTS.md's own terminal-fallback rule (§A.3).
4. **Components reference Tier-1 (primitive) tokens directly**: `--spacing-N` in 46 files, `--typography-font-size-*` in 28, `--color-*` in 4 (`skeleton`, `card`, `deck`, `dialog`). Contradicts PRINCIPLES §3 (§A.4).
5. **No cascade layers.** `@layer` appears nowhere. Cascade order is import order only. PRINCIPLES §7 requires a fixed layer order (§A.5).
6. **Viewport media queries inside components/layout**: `card.css` (×2), `header.css`, `prose.css`, and most of `layout/*` (`app`, `grid`, `main`, `sidebar`, `split`). PRINCIPLES §1 allows viewport queries only for the app shell and `pointer`/`prefers-*` (§A.6).
7. **Alias sprawl** (same rule under 2 to 4 names) throughout. Examples: `table--zebra/striped`, `table--sticky-head/header`, `card__head/header`, `nav-tree*/navigation-tree*`, `telemetry--icon-end/right` (§A.7).
8. **Prominence × intent are encoded as compound class names** (`button--subtle-primary`, `--plain-destructive`, `--subtle-tint`), which is the cross-product multiplication §2 warns against.
9. **forced-colors** is handled in only 4 files (`skeleton`, `skip-link`, `combobox`, `empty-state`). `prefers-contrast` is handled in more but not uniformly. (Counted, not assessed in depth.)
10. **Dependency direction problems**: `skeleton` (atom) depends on button, badge, chip, input, textarea, select, avatar, card; `popover` (molecule) and `tooltip` reference card/menu/banner/toast; `field` (molecule) references a layout primitive (`cluster`).

---

## 2. Foundations (not components, but they carry the axes)

| File | Role | Notes |
| --- | --- | --- |
| `reset.css` | Reset | Not inspected in depth |
| `variables.css` | Compiled tokens | Generated; do not edit |
| `utilities/appearance-modes.css` | `.font-sizing-{fixed,compact,cq,fluid,tight}`, `.vert-spacing-*`, `.font-sizing-compact--on-desk` (`pointer: fine` + `hover: hover`) | **This is the only place a pointer-driven mode exists**, and it drives *font sizing*, not target size. It is size/density/pointer blended into one `--font-sizing` variable |
| `--ui-sizing: compact` | Container-style-query switch (set by `.card--compact`, `.menu--compact`, etc.) | Despite the name it controls *typography step-down*. It is the de-facto density mechanism |
| `.ui-dense`, `.ui-compact` | Class hooks on a container | Defined in 10 files (`input`, `select`, `textarea`, `check-radio`, `progress`, `range`, `choices`, `card`, `deck`, `appearance-modes`) |

Token tiers (from `tokens/*.json`):
- **T1**: color, opacity, translucency, sizing, layout, spacing, typography, border-width, radius, duration, z-index, fluid
- **T2**: surface/foreground/border colour roles, typography presets (`body-*`, `heading-*`, …), `control`, `control-sm/lg`, `radius`, `shadow`, `focus-ring`, `z-index`, etc.
- **T3**: accordion, alert, avatar, badge, banner, batch-actions, block-link, breadcrumb, button, button-group, card, chip, deck, dialog, divider, empty-state, field, fieldset, form, header, sidebar, footer, input, link, pagination, popover, prose, meter, progress, range, select, skip-link, table, switch, tabs, telemetry, textarea, toast, tooltip, menu, skeleton, combobox, wrapper

**T3 has no entries** for: `chip`-adjacent `check-radio`, `choices`, `lockup`, `navigation-tree`, `stepper`, `tab`, `tab-list`, `tabbed-content`, `section`, `text`, `icon`. (Inferred from key list; some may live under other keys.)

---

## 3. Atoms (`atoms/`)

Dependency notation: **→** = references another component's class in its selectors (a coupling), not necessarily wrong.

### `button` · `button.css`
- **Elements:** `button__icon`, `button__text`, `button__text--placeholder`
- **SIZE:** `--sm` `--lg` `--icon-lg`
- **PROM:** `--strong` `--subtle` `--plain` `--ghost` `--accent` `--primary`(alias) `--selected`(alias) `--subtle-primary` `--plain-primary` `--subtle-tint`
- **INTENT:** `--destructive` `--plain-destructive`
- **PRES:** `--flush` `--placeholder` `--labeled`(opts out of icon-collapse)
- **SHAPE:** `--round` `--avatar`; `--icon` is a content type (icon-only)
- **Deps →** badge, chip, icon, kbd (and `avatar--*`, `badge--*-corner`)
- **Flags:** Compound prominence×intent names (`--subtle-primary`, `--plain-destructive`, `--plain-primary`). `--sm` lowers min target to 32px (**size drives target size**). `--icon-lg` is a size on a content type. `--primary`/`--accent`/`--strong` overlap. ~85 hex literals. Presentation axis "minimal" (icon-only) is handled by `--icon` + `--ui-labels: hidden` container query, which is the nearest thing to a Presentation axis in the library.

### `badge` · `badge.css` (also defines `kbd`)
- **Elements:** `badge__text`, `kbd__text`
- **SIZE:** `--sm` · **PROM:** `--strong` `--subtle` `--plain` `--accent` · **INTENT:** `--danger` `--success` `--warning` · **SHAPE:** `--round` · **POS:** `--top-left-corner` `--top-right-corner` `--bottom-left-corner` `--bottom-right-corner`
- **Deps →** kbd (same file)
- **Flags:** `kbd` lives in `badge.css` (not its own file). Corner-position modifiers are placement, not a variant. 18 hex literals.

### `chip` · `chip.css`
- **Elements:** `chip__remove`
- **SIZE:** `--sm` · **PRES:** `--plain` `--simple` · **INTENT:** `--color-danger` `--color-success` `--color-warning`, `--status`, `status--danger/success/warning`
- **Flags:** Two intent vocabularies (`chip--color-*` and `status--*`). `--plain` vs `--simple` unclear difference.

### `icon` · `icon.css`
- **SIZE:** `--xs` `--sm` `--md` `--lg` `--xl` `--2xl` `--scale-sm` `--scale-lg` `--scale-xl`
- **INTENT/colour:** `--accent` `--danger` `--destructive`(alias) `--success` `--warning` `--muted`
- **ORIENT:** `--dir` (mirror in RTL), `--disclosure`
- **Related:** `icon-box` with `--sm` `--lg` `--round` `--surface`
- **Flags:** Two parallel size vocabularies (`--sm…` vs `--scale-sm…`). Principle §6 wants one `em`-based scale tied to the type scale. 4 hex literals.

### `input` · `input.css`
- **SIZE:** `--sm` `--lg` · **PRES:** `--plain` `--flush` `--ghost` `--bare` `--unstyled` `--subtle`
- **Related:** `color-input--sm/lg/square`
- **Flags:** Six chrome-removal modifiers (`plain/flush/ghost/bare/unstyled/subtle`) with overlapping meaning; §2 says each variant needs a named user need. `--sm` → 32px target.

### `textarea` · `textarea.css`
- **SIZE:** `--sm` `--lg` · **PRES:** `--plain` `--flush` `--ghost` `--subtle` · **BEHAV:** `--one-line`
- **Flags:** Same chrome-modifier overlap as `input`.

### `select` · `select.css`
- **SIZE:** `--sm` `--lg` · **PRES:** `--plain` `--flush` `--ghost` `--subtle` · **BEHAV:** `--custom`
- **Flags:** Same overlap as `input`.

### `check-radio` · `check-radio.css`
- **SIZE:** `check--sm/lg`, `checkbox-input--sm/lg`, `radio-input--sm/lg`
- **INTENT:** `--danger` `--success` `--warning` (×3 class families)
- **Flags:** Same modifier duplicated across three class names (`check--*`, `checkbox-input--*`, `radio-input--*`).

### `switch` · `switch.css`
- **Elements:** `switch__control` `switch__label` `switch__option(--on/--off)`
- **SIZE:** `--sm` `--lg` · **PROM:** `--subtle` · **INTENT:** `--danger` `--destructive`(alias) · **SHAPE:** `--round`

### `range` · `range.css`
- **Elements:** `range-group__output`, `range-lockup__output`, `range__scale-ticks`
- **SIZE:** `--sm` `--lg` · **INTENT:** `--danger` `--success` `--warning`
- **Related:** `range-group--*` and `range-lockup--*` (identical modifier sets: `block bordered fill lg pill sm surface`)
- **Deps →** button
- **Flags:** `range-group` and `range-lockup` look like duplicate components. 13 hex literals.

### `progress` · `progress.css` (also defines `meter`)
- **SIZE:** `--sm` `--lg` · **PROM:** `--subtle` · **INTENT:** `--danger` `--success` `--warning` (for both `progress--*` and `meter--*`)
- **Deps →** meter (same file)
- **Flags:** `meter` lives in `progress.css`. 22 hex literals (the most per file after `button`).

### `divider` · `divider.css`
- **SIZE:** `--sm` `--md` `--lg` · **PROM:** `--strong` `--subtle` `--quiet` `--accent` · **PRES:** `--dashed` `--dotted` · **ORIENT:** `--vertical`
- **Flags:** `--subtle` vs `--quiet` unclear.

### `link` · `link.css` (also `block-link`)
- **SIZE:** `--sm` `--lg` · **PRES:** `--plain` `--subtle` `--underline`/`--underlined`(alias) · **INTENT/colour:** `--accent` `--danger` `--destructive`(alias) `--success` `--muted` · **BEHAV:** `--stretch`/`--stretched`(alias) · **ORIENT:** `--inline-flex`
- **Related `block-link`:** `--sm` `--compact` `--plain` `--ghost` `--subtle` `--icon` `--inline` `--flex`; element `block-link__arrow`
- **Deps →** icon, block-link
- **Flags:** `block-link--compact` is a density on a block-link that also has `--sm`. 22 hex literals.

### `tab` · `tab.css`
- **Elements:** `tab__text`
- **SIZE:** `--sm` · **PRES:** `--plain` `--subtle` `--fill` `--button` · **SHAPE:** `--round` · **ORIENT:** `--vertical` · content: `--icon`
- **Deps →** badge, chip, icon, kbd, button (`button--subtle`)

### `skeleton` · `skeleton.css`
- **SIZE:** `--sm` `--md` `--lg` · **SHAPE:** `--circle` `--round` `--rect` · **CONTENT:** `--avatar` `--badge` `--button` `--chip` `--heading` `--input` `--media` `--text` `--title` `--inline`, widths `--w-25 … --w-90` · **BEHAV:** `--pulse` `--static`; `card--skeleton`
- **Deps →** button, badge, chip, input, textarea, select, avatar, card
- **Flags:** **Reverse dependency**: an atom that knows about eight other components. `--w-*` are content widths, not variants. Uses `--color-*` primitives.

### `skip-link` · `skip-link.css`
- **BEHAV:** `--floating` · No size/density variants.

### `text` · `text.css` (typography atoms)
- **Classes:** `.text` `.heading` `.subheading` `.small-heading` `.micro-heading` `.nano-heading` `.display-title` `.title` `.small-text`/`.caption` `.micro-text` `.nano-text` `.large-text` `.strong-text` `.alt-text` `.code-text`/`.code` `.pre`
- **Flags:** `.pre` is **also** defined in `utilities/typography.css` (identical rule). Typography presets in T2 include `*-fixed/-compact/-cq/-fluid` variants. That is a **fourth axis (font-sizing mode) living in tokens** that is not in PRINCIPLES.

---

## 4. Molecules (`molecules/`)

### `alert` · `alert.css`
- **DENS:** `--compact` `--dense` (identical rule) · **BEHAV/POS:** `--top` `--bottom` `--fixed-top` `--fixed-bottom` `--floating` `--sticky` `--dismissing`
- **Deps →** banner, wrapper
- **Flags:** `alert` and `banner` overlap heavily and cross-reference each other (`alert--fixed-*` selectors appear in `banner.css`). **Possible duplicate component.** Compact rule uses `--alert-sm-*` tokens (compact = sm).

### `avatar` · `avatar.css`
- **Elements:** `avatar__image` `avatar__text` `avatar-count__text`
- **SIZE:** `--xs` `--sm` `--lg` `--xl` · **SHAPE:** `--round` `--square` · **PROM:** `--accent` · content: `--count` `--placeholder` · **BEHAV/state:** `--status-online/away/busy/offline`; groups: `avatar-group--stacked/stackable/crescent`
- **Deps →** icon

### `banner` · `banner.css`
- **Elements:** `banner__action` `banner__inner` `banner__thumb`
- **DENS:** `--compact` `--dense` · **PROM:** `--strong` `--subtle` `--accent` · **INTENT:** `--danger` `--error`(alias) `--info` `--success` `--warning` · **PRES:** `--flush` `--ruled` `--round` `--dynamic-corners` · **ORIENT:** `--action-align-center`
- **Deps →** button, icon, alert, heading family, wrapper
- **Flags:** `--danger`/`--error` aliases. `--compact` uses `--banner-sm-*` tokens (compact = sm).

### `batch-actions` · `batch-actions.css`
- **Elements:** `__actions` `__dismiss` `__separator` `__summary`
- **DENS:** `--compact` · **PRES:** `--flush` `--plain` `--contrast` `--round` · **BEHAV:** `--docked` `--inline` `--scrollable`
- **Deps →** button-group

### `breadcrumb` · `breadcrumb.css`
- **Elements:** `__item` `__link` `__list` · No variants.

### `button-group` · `button-group.css`
- **Elements:** `__content` `__end` `__fill`
- **DENS:** `--compact` `--dense` `--tight` (compact/dense identical; `tight` = zero gap) · **PRES:** `--ruled` `--round` · **ORIENT:** `--stacked` `--center` `--justify-center` `--justify-end` `--space-between` `--stretch` `--fill-items`
- **Deps →** button, badge, chip, icon, kbd, lockup
- **Flags:** Alignment modifiers duplicate flex utilities (`justify-*`). Compact uses `--button-group-sm-gap`.

### `choices` · `choices.css`
- **Elements:** `choice__label` `choice__description`
- **SIZE/DENS:** `choice--sm` `choice--compact` `choice--lg`, `choices--compact` `choices--dense` · **ORIENT:** `choices--inline`
- **Flags:** `choice--sm` and `choice--compact` are the **same rule** (`.choice--sm, .choice--compact`) that sets font-size, line-height and min-size. **Textbook size/density conflation.** Also reads `.controls-sm` ancestor.

### `field` · `field.css`
- **Elements:** `__label` `__input` `__hint` `__error(s)` `__header` `__output` `__result`
- **SIZE/DENS:** `--compact` `--dense` `--sm` (**one rule**: inner gap 0.25rem) · `--loose` `--lg` (**one rule**: inner gap 0.75rem)
- **Deps →** input, textarea, select, button-group, cluster (layout)
- **Flags:** Three names for one gap value and two for another: size and density tied together. Related `fields-grid` (referenced in HANDOVER) is not listed by the extraction. Needs check.

### `fieldset` · `fieldset.css`
- **Elements:** `__description`
- **DENS/SIZE:** `--compact` `--dense` `--loose` `--lg` (same aliasing as `field`) · **PRES:** `--bordered`

### `lockup` · `lockup.css`
- **SIZE/DENS:** `--sm` `--md` `--lg` `--tight` `--loose` `--gap` · **ORIENT:** `--horizontal` `--inline` `--start` `--center` `--end`
- **Deps →** avatar, inline (layout)
- **Flags:** Size words (`sm/md/lg`) and spacing words (`tight/loose`) side by side. Unclear which axis `--gap` is.

### `navigation-tree` · `navigation-tree.css`
- **Elements:** `navigation-tree__{heading,item,item--nested,label,link,list,text}` **and duplicate** `nav-tree__*`
- **DENS:** `--compact` · **PRES:** `--flush` `--ruled` `--indicator` `--toc`
- **Flags:** Whole class family duplicated under `nav-tree` and `navigation-tree`.

### `pagination` · `pagination.css`
- **Elements:** `pagination__ellipsis`, `page-count__{info,jump}`
- **ORIENT:** `pagination--between/center/end`, `page-count--start/center/end`
- **Deps →** button, divider, button-group
- **Flags:** Alignment-only modifiers (duplicate utilities).

### `popover` · `popover.css`
- **SIZE:** `--lg` `--xl` `--full` `--full-width` `--full-height` · **POS:** `--anchored` `--top` `--bottom-end` `--bottom-left` `--left` `--right` `--start` `--end`
- **Deps →** banner, toast, tooltip, card, menu
- **Flags:** Molecule that composes organisms (card, menu). Likely belongs higher or should be structure-only.

### `prose` · `prose.css`
- No modifiers; heavy `--font-sizing`/`--vert-spacing` logic (21 mode references).
- **Deps →** button, check, block-link, display-title
- **Flags:** Content-styling scope, not a molecule in the atom→organism sense. Contains `@media screen`/`print`/`width` queries.

### `stepper` · `stepper.css`
- **Elements:** `__content` `__desc`/`__description` `__indicator(-text)` `__item` `__label` `__list` `__step` `__title` `__trigger`
- **DENS:** `--compact` · **ORIENT:** `--inline` `--vertical`
- **Deps →** button, icon, small-heading, micro-heading
- **Flags:** `__desc` vs `__description` alias. 10 hex literals.

### `tab-list` · `tab-list.css`
- **DENS:** `--tight` · **ORIENT:** `tabbed-content--vertical`
- **Deps →** button, tab, tabbed-content
- **Flags:** Molecule that knows about its parent organism (`tabbed-content`), a circular-ish dependency. Also references `sidebar--flush`, `card__body--flush`.

### `telemetry` · `telemetry.css`
- **Elements:** `__content` `__icon` `__label` `__status` `__trend(--positive/negative/neutral)` `__unit` `__value`
- **SIZE:** `--sm` `--lg` · **DENS:** `--compact` · **PROM:** `--accent` `--subtle` · **INTENT:** `--danger` `--success` `--warning` · **PRES:** `--bordered` `--card` `--pill` `--round` · **ORIENT:** `--inline` `--stacked` `--icon-end`/`--icon-right`(alias)
- **Groups:** `telemetry-group--ruled`, `telemetry-strip--ruled`
- **Deps →** icon
- **Flags:** Has **both** `--sm` and `--compact`.

### `toast` · `toast.css`
- **BEHAV:** `--dismissing` · **POS:** `toast-stack--{top,bottom}-{start,center,end}`

### `tooltip` · `tooltip.css`
- **POS:** `--top/bottom/left/right/start/end` · **PRES:** `--no-arrow`
- **Deps →** banner, card
- **Flags:** 11 hex literals.

---

## 5. Organisms (`organisms/`)

### `card` · `card.css`
- **Elements:** `__content` `__header`/`__head` `__footer`/`__foot` `__body` `__hgroup` `__title` `__subtitle` `__band` `__thumb` `__canvas` `__date` `__link` `__header-line`, each with `--flush`/`--scrollable`/`--bordered`/`--ruled`/`--subtle` variants
- **DENS:** `--compact` (sets `--ui-sizing: compact`), `--dense` (alias of `.ui-dense`; does **not** set `--ui-sizing`) · **PRES:** `--plain` `--flush` `--bordered` `--ruled` `--translucent` `--hollow` `--panel` `--bands` · **BEHAV:** `--scrollable` `--sticky-header` `--sticky-footer` `--dynamic-corners` · **SIZE:** `--sizes-cq` `--sizes-fixed` (this is the font-sizing mode axis in disguise)
- **Deps →** button, badge, chip, icon, text, heading family
- **Flags:**
  - **`--compact` and `--dense` both exist and differ**: `--dense` leaves typography alone, `--compact` steps it down. This is the *one place the library already separates density from size*. It should be the model, but the naming is confusing (and `--dense` falls back to `--card-compact-*` tokens).
  - `--sizes-cq`/`--sizes-fixed` are font-sizing modes, not variants.
  - Viewport media queries at lines 792 and 828. Uses `--color-*` primitives.

### `deck` · `deck.css`
- **Elements:** about 40 (`deck__art`, `__meters`, `__transport`, …)
- **DENS:** `--compact` `--dense` (**one rule**) · **PRES:** `--bordered` `--flush` `--hollow` `--panel` `--plain` `--translucent` · **ORIENT:** `--horizontal` · **BEHAV:** `--live` `--on-air` `--cue` `--dock` `--preview`
- **Deps →** icon, meter, lockup, button-group, subheading, small-heading, inline, split
- **Flags:** Domain-specific (audio player). **Very large surface for a general library.** `--live/--on-air/--cue` are states, not variants. Uses `--color-*`. 9 hex literals.

### `dialog` · `dialog.css`
- **Related:** `dialog--drawer` `dialog--scrollable`
- **Deps →** button, card
- **Flags:** Composes `.card` by markup contract (good per §3). Uses `--color-*`.

### `accordion` · `accordion.css`
- **Elements:** `accordion__icon`
- **PRES:** `--flush` `--plain` `--ruled` `--transparent` `--no-icon` · groups: `accordion-group--no-icons` `--tight`
- **Flags:** `--plain` vs `--transparent` unclear.

### `combobox` · `combobox.css`
- **Elements:** about 16 (`__control` `__input` `__listbox(--in-flow/--static)` `__option(-main/-desc)` `__group-header` `__tags` …)
- **SIZE:** `--sm` `--lg` · **PRES:** `--plain` `--flush` `--ghost` `--subtle` · **state:** `--disabled` `--invalid`
- **Deps →** micro-heading
- **Flags:** `--disabled`/`--invalid` as classes duplicate native `:disabled`/`:user-invalid` (§7 says native over scripted). Same chrome-modifier set as `input`.

### `empty-state` · `empty-state.css`
- **Elements:** `__actions` `__content` `__description` `__hgroup` `__icon-well` `__title` `__visual`
- **DENS:** `--compact` · **PRES:** `--bordered` `--flush` · **INTENT:** `--danger` `--error`(alias) `--success` `--warning` · **ORIENT:** `--left`/`--start`(alias)
- **Deps →** icon, card, heading family

### `form` · `form.css`
- **Elements:** `form__submission(--left/--right)` · **DENS:** `--compact`
- **Deps →** button

### `header` · `header.css`
- **PRES:** `--borderless` `--flush` `--translucent` · **BEHAV:** `--sticky`
- **Flags:** `@media (min-width: 1024px)` is a **hard-coded px breakpoint** (the only one found).

### `menu` · `menu.css`
- **Elements:** `menu__{content,heading,item,item--destructive,label,separator,text}`
- **DENS:** `--compact` · **PRES:** `--plain` `--ruled` `--translucent` · **BEHAV:** `--submenu`
- **Deps →** button, badge, chip, icon, divider, kbd, small-heading, micro-heading

### `section` · `section.css`
- **Elements:** `__body` `__footer` `__header` · **DENS:** `--compact` · **PRES:** `--flush` `--plain`

### `table` · `table.css`
- **Elements:** `table__caption(--bottom)` `table__sort-button`, plus ~25 `table__cell--*` and a **duplicate** `table__col--*` set
- **SIZE/DENS:** `--compact` `--sm` · **PRES:** `--bordered` `--flush` `--simple` `--striped`/`--zebra` `--hover` · **BEHAV:** `--fixed` `--sticky-head/-header` `--sticky-foot/-footer` `--sticky-1st-column/-first-column` `--sticky-last-column` · CONTENT: `--head-cells-long`
- **Deps →** button, icon, button-group
- **Flags:** Both `--compact` and `--sm`. `__cell--*` and `__col--*` mirror each other. Only component with a `pointer: fine` query. Many `__cell--xs…xl` are width tokens, not variants.

### `tabbed-content` / `tabs` · `tabbed-content.css`, `tabs.css`
- `tabbed-content` has `__panel`; `tabs__panel` alias. `tabs.css` is a **forwarder** that `@import`s tab + tab-list + tabbed-content. It is **not imported by `index.css`**.
- **Deps →** tab-list (tabs → tab, tab-list, tabbed-content)

---

## 6. Layout primitives (`layout/`)

Per PRINCIPLES §3 these "own space and arrangement and hold no content styling". Several carry viewport media queries (§A.6).

| Primitive | Modifiers | Axis | Flags |
| --- | --- | --- | --- |
| `stack` | `--tight` `--cushioned` `--ruled` | DENS, PRES | Clean |
| `cluster` | `--tight` `--cushioned` `--ruled` | DENS, PRES | Clean |
| `inline` | `--tight` `--cushioned` `--between` `--ruled` + `inline-responsive` family and `--2xs … --2xl` | DENS, ORIENT | Responsive uses `@container` (good). `.inline` name collides with CSS keyword (resolved: display utility is `.d-inline`) |
| `grid` | `--1-col … --6-col` `--auto-fit` `--2xs … --2xl` (intrinsic min size) `--tight` `--cushioned` `--ruled` `--carousel(-below-md/-bleed)` | SIZE (intrinsic), DENS | Viewport `@media` for column counts and carousel. `--sm/--md` here mean *column min-width*, a different meaning of "size" from controls |
| `split` | `--2xs … --2xl`, `--auto`, **14** `--auto-below-*` / `--auto-in-container-below-*`, `--nowrap` `--reverse` `--stretch` `--end` `--three` `--panels` `--tight` `--cushioned` `--ruled` | mixed | Both viewport and container variants of the same collapse behaviour (§A.6). Largest modifier surface among layouts |
| `wrapper` | `--2xs … --2xl` `--start` `--middle` `--end` | SIZE (max-width) | `--xs…--2xl` are widths |
| `sidebar` | `--end`/`--right`(alias) `--floating` `--flush` `--rail` `--ruled` `--sticky` · elements `__band __body __footer __header __scroller` | ORIENT, PRES | Viewport `@media (width < 48em)`. Defines `app--*` hooks too |
| `app` | `--locked` `--viewport` · `__aside __footer __workspace` | BEHAV | App shell: viewport queries allowed by §1 |
| `main` | `--flush` `--panels` `--viewport` | PRES | App shell |

---

## A. Detailed flags

### A.1 Size and density conflated
Same rule applied to both a size name and a density name (or density modifiers that use `-sm-` tokens):

| Component | Evidence |
| --- | --- |
| `field` | `.field--compact, .field--dense, .field--sm` → one rule; `.field--loose, .field--lg` → one rule |
| `fieldset` | `--compact/--dense` one rule; `--loose/--lg` one rule |
| `choices` / `choice` | `.choice--sm, .choice--compact` one rule changing font-size, line-height, min-size |
| `alert` | `--compact, --dense` use `--alert-sm-*` tokens |
| `banner` | `--compact, --dense` use `--banner-sm-*` tokens |
| `button-group` | `--compact, --dense` use `--button-group-sm-gap` |
| `deck` | `--dense` and `--compact` one rule, using `--deck-compact-*` |
| `telemetry` | has `--sm` **and** `--compact` |
| `table` | has `--sm` **and** `--compact` |
| `block-link` | has `--sm` **and** `--compact` |
| `lockup` | `--sm/--md/--lg` and `--tight/--loose` on one block |
| `card` | `--compact` sets `--ui-sizing: compact` (typography step-down) *and* padding; `--dense` falls back to `--card-compact-*` tokens |
| tokens | `--ui-sizing: compact` and `--font-sizing: compact` both mean "density" *and* "font step-down"; T2 has `*-compact` typography presets |

**Closest to correct today:** `card--dense` (spacing only) vs `card--compact` (spacing and type). That split should probably be generalised.

### A.2 Pointer axis
- Touch-first default is partially in place: `--spacing-target: 48px` drives `button`, `input`, `select` min sizes.
- But `--sm` → `--spacing-target-sm` (32px) and `--lg` → 64px. **Target size is a function of the size modifier, not of pointer.**
- `pointer: fine` is used only in `table.css` (hover affordance) and `appearance-modes.css` (`.font-sizing-compact--on-desk`). No root-level "fine pointer → compact targets" token switch exists, and no manual override as PRINCIPLES §2 requires.

### A.3 Raw values
Hex literals appear as `var(--x, #hex)` fallbacks in (counts of literal occurrences): `button` 85, `progress` 22, `link` 22, `badge` 18, `range` 13, `tooltip` 11, `stepper` 10, `deck` 9, `switch` 7, `check-radio` 6, `banner` 6, `telemetry` 5, `batch-actions` 4, `tab-list` 4, `icon` 4, and 1 to 3 each in `divider`, `skip-link`, `select`, `textarea`, `input`, `skeleton`, `field`, `combobox`, `card`, `dialog`, `sidebar`. `skip-link.css` also has a literal `rgba(...)` shadow fallback. (Counts include `rgba()` and similar; I did not separate legitimately-neutral values.) AGENTS.md (terminal-fallback standards) already forbids these.

### A.4 Primitive tokens in components
`--spacing-4/8/16…` (T1 scale) referenced directly in 46 component files; `--typography-font-size-*` in 28; `--color-*` in `skeleton`, `card`, `deck`, `dialog`; `--radius-N` in 1. §3: "Components never reference [primitives] directly."

### A.5 Cascade layers
No `@layer`. `index.css` imports in order: Google Fonts (`@import url(...)` to external host), `variables.css`, **then** `reset.css`.

### A.6 Viewport vs container queries
- Components: `card.css` L792, L828 (`width < 48em or height < 36em`), `header.css` L23 (`min-width: 1024px`, hard px), `prose.css` (width, screen, print).
- Layout: `grid` (carousel and column counts, 8 viewport queries), `split` (7 viewport + container variants), `sidebar`, `app`, `main`.
- `split` ships **both** `--auto-below-*` (viewport) and `--auto-in-container-below-*` (container) for every breakpoint, doubling its surface.

### A.7 Aliases and duplicates (candidates to delete pre-v1)
`card__head/__header`, `card__foot/__footer`, `table--zebra/--striped`, `table--sticky-head/-header`, `table--sticky-foot/-footer`, `table--sticky-1st/-first-column`, `table__cell--numeric/--num`, `table__col--*` duplicating `table__cell--*`, `nav-tree*` / `navigation-tree*`, `telemetry--icon-end/--icon-right`, `empty-state--left/--start`, `empty-state--danger/--error`, `banner--danger/--error`, `link--stretch/--stretched`, `link--underline/--underlined`, `link--destructive/--danger`, `icon--destructive`, `switch--destructive`, `button--primary/--accent`, `button--selected/--strong`, `stepper__desc/__description`, `sidebar--end/--right`, `tabs__panel/tabbed-content__panel`, `tabs.css` forwarder, `.pre` (text.css and typography.css), `check--*`/`checkbox-input--*`/`radio-input--*`, `range-group`/`range-lockup`, `icon--*` vs `icon--scale-*`.

### A.8 Variants with no shared axis
These need a decision (new axis, or move to a different mechanism). See also question 2 below.
- **INTENT** (`danger/success/warning/info/error/destructive/accent`): present on ~20 components. It is the single largest non-axis variant family.
- **SHAPE** (`round/square/pill/circle`): ~12 components.
- **ORIENT/alignment** (`start/center/end/between/…`): `button-group`, `pagination`, `lockup`, `wrapper`, `split`, `batch-actions`; duplicates flex utilities.
- **POS** (`tooltip--*`, `popover--*`, `toast-stack--*`, `badge--*-corner`): should be token/attribute-driven.
- **BEHAV** (`sticky/scrollable/fixed/docked/live/on-air/cue`): behaviours/states, not variants.
- **CONTENT** (`skeleton--w-*`, `table__cell--*`, `wrapper--*`): contract hooks, not variants.
- **Font-sizing mode** (`--sizes-cq/--sizes-fixed`, `.font-sizing-*`, `--font-sizing`, `--vert-spacing`): a fourth, token-level axis not in PRINCIPLES.

### A.9 Atomic-level and dependency oddities
- `skeleton` (atom) → 8 other components (reverse dependency).
- `popover`, `tooltip` (molecules) → `card`, `menu`, `banner`, `toast`.
- `tab-list` (molecule) → `tabbed-content` (its parent organism).
- `field` (molecule) → `cluster` (layout).
- `prose` is a content style; arguably not a molecule.
- `kbd` is in `badge.css`; `meter` is in `progress.css`; `block-link` is in `link.css`; `icon-box` is in `icon.css`.
- `deck` is highly domain-specific (audio) and the largest organism; may not belong in a general library for v1.
- `alert` ↔ `banner` mutual references.
- Utilities `appearance-modes`, `responsive-helpers` (79 KB), `color-palette` (12 KB) are large; not audited here.

---

## B. Not covered by this inventory (for the next step)
- `reset.css`, `utilities/*` beyond what's cited, `responsive-helpers.css`.
- Per-component a11y checklist (§9): keyboard map, forced-colors, target size per pointer mode, contrast, 200%/400% zoom. Only **counts** of `forced-colors`/`prefers-contrast` were collected.
- Storybook coverage: 72 story files found; not mapped to components.
- Token coverage in `3-component.json` per component (key list only).
- The blog repo (`designforhumans-blog`) mirror: not examined.
