# Button pass

Oct 27, 2026. First Phase 1 component. It is the reference implementation of the shared axes for every later component.

## Model

Intent sets a **tone** (`--_button-tone`, `-hover`, `-pressed`, `-border`, and `--_button-on-tone`). Prominence decides where the tone goes:

| Prominence | Rest | Hover | Active |
| --- | --- | --- | --- |
| Outline (default) | Tone text and border | Filled with the tone | Filled with the pressed tone |
| `--strong` | Filled with the tone | Hover tone | Pressed tone |
| `--subtle` | Translucent surface, tone text | Stronger translucent surface, hover-tone text | Same, pressed-tone text |
| `--plain` | Transparent, tone text | Translucent surface, hover-tone text | Stronger translucent surface, pressed-tone text |

Every prominence × intent pairing now comes from two classes; the six combination rule blocks are gone.

| Axis | Modifiers | Container flag |
| --- | --- | --- |
| Prominence | `--strong`, `--subtle`, `--plain` | `--button-prominence` (and `--controls-variation` for subtle and plain) |
| Intent | `--accent`, `--danger` | `--button-intent` |
| Size | `--sm`, `--lg` | `--button-size`, `--controls-size: sm` |
| Density | none | `--ui-sizing: compact` steps to `--sm`; `--lg` steps to default |
| Corners | `--round` | `--button-corners` |

Selected states (`.is-active`, `:has(:checked)`) render as strong. Group classes (`.buttons-strong|subtle|plain|sm|lg|round`) set the flags only.

## Checklist (PRINCIPLES §10)

| Item | Result |
| --- | --- |
| Native element; ARIA only where needed | Pass. `aria-disabled` and `aria-pressed` supported. |
| Keyboard, visible focus, no trap | Pass. Focus ring uses the tone on filled states, where `currentColor` would be invisible. |
| Contrast (AA), AAA reachable | Pass. axe has no violations in light or dark. |
| Forced colors, reduced motion, high contrast | Added a forced-colors rule: selected uses `Highlight` and disabled uses `GrayText`. Transparent borders on subtle and plain show automatically. Reduced motion and `prefers-contrast` were already handled. |
| Touch targets per pointer mode | Added. A `::after` hit area keeps 48px on `--sm` and compact; `--spacing-target-min` is the opt-in. |
| Colour never the only signal | Documented. Stories pair every intent with an icon. |
| Container-responsive | Pass. Labels collapse via `--ui-labels: hidden` / `.hide-labels`. |
| Variants map to axes; one axis per modifier | Pass. |
| Tier 2 only; no raw values | Pass for colour. No hex fallbacks remain (previously about 85); terminals are `CanvasText`, `Canvas`, `currentColor` or `transparent`. Geometry falls back to its Tier 3 token, then a literal (see open question 2). No Tier 1 references remain. |
| Legacy tagged or removed | Removed. See below. |
| Story is the definition of done | Rewritten. The new stories are Playground, ProminenceAndIntent, States, SizesAndTargets, ContainerFlags, IconOnlyAndShapes, Toggles, ContainerAdaptive and Surfaces. |

## Removed

- **Classes:** `.button--primary`, `--secondary`, `--destructive` (now `--danger`), `--selected` (now `.is-active`), `--subtle-tint`, `--ghost`, `--subtle-primary`, `--plain-primary`, `--plain-destructive`, `.buttons-primary`, `.buttons-destructive`, `.buttons-dense`, `.buttons-regular`.
- **Flags:** `--button-variation`, `--button-appearance`, `--button-tone` (flag), `--button-density`, `--control-size` (a typo; the real flag is `--controls-size`). The button no longer reads `--ui-density` or `--control-density`.
- **Tier 3 tokens:** all per-combination colour tokens: `button.default.*`, `primary.*`, `accent.*`, `strong.*`, `destructive.*`, `strong-destructive.*`, `subtle.*`, `subtle-destructive.*`, `selected.*`. Colour now comes straight from the Tier 2 intent roles. Added `button.lockup-gap` and Tier 2 `spacing.target-min`. Figma exports regenerated.

**Usages migrated:** 55 files across stories, recipes, docs pages and component CSS (`banner.css`, `dialog.css`, `menu.css`).

## Visible changes

- **Neutral states stay neutral.** Previously, strong-neutral hover, outline-neutral active, and subtle and plain neutral hover all turned accent (purple). They now use `--foreground-strong`.
- **Strong accent** now sets an inverted colour palette for its contents, like the other strong buttons.
- **The dialog close button** uses `--sm` instead of the removed "dense" flag. It is icon-only, so there is no visible change.
- **Containers using the old density flags** (`.ui-dense`, `.card--dense`, `.controls-dense`, `--ui-density: dense`) no longer shrink buttons. They regain it when each of those components migrates to `--ui-sizing: compact`.

## Resolved questions

Settled on Oct 27, 2026 and recorded in the PRINCIPLES §9 decisions log.

1. **Hit-area overlap.** Accepted. In a tight group of `--sm` buttons with no gap, each invisible 48px hit area overlaps its neighbours by up to 8px, and the later button wins the click. WCAG 2.5.8 allows this. Dense toolbars that need exact targets opt into fine-pointer targets.
2. **Tier 3 → Tier 1 in token JSON.** Allowed. `button.padding-*` and `button.lockup-gap` choose Tier 1 spacing steps in `3-component.json`; picking a step is the component's call. Component CSS still never references Tier 1. PRINCIPLES §3 now says so.
3. **Blog mirrored.** Done. `_button.scss` is synced from `button.css`. In the blog templates and SCSS usage comments:
   - `.button--primary` became `.button--strong.button--accent`;
   - `.button--secondary` was dropped (the default is now the outline);
   - `.button--selected` became `.is-active` (pagination in `_tag`, `_category` and `_entry-lists-shared`);
   - `.buttons-dense` became `.buttons-sm`;
   - `.buttons-regular` was dropped.

   No legacy button classes remain, and the stylesheets have been recompiled.
4. **Overriding back to outline.** Deferred. There is no outline modifier, so a button inside a `--button-prominence: strong` container cannot return to outline. Add `.button--outline` only when a real case appears.

## Axe sweep (all 469 stories, light and dark)

Run with axe-core in headless Chrome against the static Storybook build. Results below are only those that touch the button atom; the full output is in the scratchpad and the rest belongs to other components' passes.

- **Button stories:** no violations in light or dark.
- **Tooltip anatomy story:** an icon-only button had no accessible name. Fixed in the story.
- **Banner, strong warning:** a subtle button's text measures 3.82:1 on the strong amber surface. The banner inverts the palette on `amber.700`, where even white text only reaches 4.52:1, and a subtle button adds a translucent layer that lowers it further. This is a banner and token issue, recorded for the banner pass.
- **Dark mode, second run:** an earlier dark run of 161 stories gave no usable results because a stale file server served the wrong build. On the rerun, 160 of the 161 stories rendered (`utilities-color--playground` did not), and none of the violations involve the button atom. Dark-only findings: four sidebar stories have light text on a hard-coded light surface (1.04:1 and 2:1), and a `.chip__remove` in the filter-sidebar recipe has no accessible name.
- **Not button-related, for later passes:** `aria-required-parent` on tab and menu stories (tabs and menu items rendered outside a `tablist` or `menu`), `select-name` on select stories, `color-contrast` in 30+ stories (deck, table, range, badge, chip, recipes), and landmark duplication in header and app-shell stories.
