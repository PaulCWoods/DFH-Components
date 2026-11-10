---
title: Utilities
tier: utility
summary: Classes that set one property to one value on the element they are on.
storybook: [utilities-spacing, utilities-border, utilities-typography, utilities-colour, utilities-display-flex, utilities-sizing, utilities-position-overflow-stacking, utilities-shadow, utilities-focus, utilities-appearance-modes]
related: [responsive-visibility, text-heading, stack-inline-cluster, wrapper]
---

# 36. Utilities
```html live
<div class="border border-dashed border-muted rounded-md p-md">
  <p class="small-text text-muted text-balance">A dashed, muted border, a rounded corner and medium padding, from four utilities.</p>
</div>
```

## Purpose
Sometimes one element just needs a bit more margin or a muted colour, and a new modifier would be out of proportion. A utility is that small adjustment: one property, one value, on the element it's written on.

The values come from the same tokens as the components, and the sides are logical (`start` and `end`, never left and right), so a right-to-left page and a change of theme need nothing extra. Their names follow Tailwind's where the meaning is the same, because many people already know them, and there are never more than two names for one thing.

They stop where a component's job begins. There's no utility for a type size, for a row of things or for a component's width, since those are the decisions the library exists to make once.

## When to use
- **For a one-off adjustment:** a margin, a border, a muted colour.
- **Not for a type size:** that is a [text atom](20-text-heading.md).
- **Not for a row or column of things:** that is a layout primitive: a [Stack, Inline or Cluster](22-stack-inline-cluster.md), a [Grid](19b-grid-grid-carousel.md) or a [Split](19c-split.md).
- **Not for a component's width or surface:** set its token.
- **Not for hiding by a condition:** those are the [Responsive Helpers](31-responsive-visibility.md).

## Rules
- **Intent colours** (text, border, shadow, background) never carry meaning alone (WCAG 1.4.1).
- **Scrolling regions** (`overflow-*-auto`) need something focusable inside, or `tabindex="0"`, a role and a label (WCAG 2.1.1).
- **Text on dark backgrounds:** pair a dark `bg-*` with `text-inverted` or `text-on-dark`, or put `.color-scheme-dark` on the region.

## One-off adjustments
```html live
<div class="border border-dashed border-muted rounded-md p-md">A dashed plot boundary</div>
<p class="small-text text-muted text-balance">Bed 3 is resting this year.</p>
<div class="card max-inline-size-sm mx-auto"><p class="text">Centred and capped at 24rem.</p></div>
<button type="button" class="button button--icon"><span class="sr-only">Remove Bed 3</span><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Use the shorthand in markup: `.p-sm`, `.mx-auto`. | Use a left or right name, or a third name. |
| Use a text atom for a type size. | Look for `font-size-*`. |
| Use a layout primitive for a row of things. | Build one from `flex` and `gap` utilities. |
| Set a component's token for its width. | Set its width with a utility. |
| Pair an intent colour with an icon or text. | Let a colour carry the meaning alone. |

## Reference
A utility sets one property to one value on the element it is on, from a Tier 2 token where one exists (`packages/css/src/utilities/`). It never does a component's job: type size belongs to the text atoms, arrangement to the layout primitives, widths and surfaces to components. [Responsive helpers](31-responsive-visibility.md) have their own page.

## Options
- **Two names at most.** The verbose name is the logical property and the value (`.padding-inline-sm`, `.text-align-start`, `.border-block-end`). The shorthand is Tailwind's, where Tailwind has one with the same meaning (`.px-sm`, `.text-start`, `.border-b`). **Examples and markup use the shorthand.**
- **Spacing is the one exception:** it keeps Tailwind's prefixes with the library's step names (`.p-sm`, not `.p-2`), because Tailwind's numbers map to nothing here.
- **Logical sides only.** `t`/`b` are block start and end; `s`/`e` inline start and end; `x`/`y` the inline and block axes. There are no left or right names.
- **Bare words** only where Tailwind uses the word for the same declaration: `flex`, `hidden`, `block`, `contents`, `static`, `relative`, `absolute`, `fixed`, `sticky`, `isolate`, `truncate`, `italic`, `uppercase`, `lowercase`, `capitalize`, `grow`, `shrink`; and the valueless defaults `border`, `rounded`, `shadow`, `rule`.
- `npm run check:utilities` fails on a third name, a bare word outside that list, a left/right name, or a Tier 1 token.

### Further rules
- **Not a utility:** a type size (use a text atom: `.small-text`, `.text`, `.large-text`, `.small-heading` …); a row or column of things (use `.inline`, `.cluster`, `.stack`, `.grid`, `.split`); a component's width or surface (set its token).
- **Gaps and layout primitives:** `gap-*` also sets the `--gap` hook, so a Grid's column count and a layout primitive's spacing follow it. `gap-x-*` and `gap-y-*` set only their own property.
- **Aspect ratio:** an image given an `aspect-*` also takes `.object-cover` (or `.object-contain`), or it stretches to the shape. A Card thumb, Thumbnail or Poster sets its own shape and fit: set its token, not these.
- **Combining:** `.border` draws the border; the style and colour classes change one part of it. A colour class tints a shadow the element already has.

## Scales
| Scale | Steps | Tokens |
| :--- | :--- | :--- |
| Spacing | `0`, `2xs` 2px, `xs` 4px, `sm` 8px, `md` 16px, `lg` 32px, `xl` 48px, `2xl` 64px, `3xl` 128px, `breathe-sm`, `breathe`, `cushion`, `cushion-lg` (fluid); `auto` for margins | `--spacing-2xs` … `--spacing-3xl`, `--spacing-breathe-sm`, `--spacing-breathe`, `--spacing-cushion`, `--spacing-cushion-lg` |
| Sizes | `2xs` 8rem, `xs` 16rem, `sm` 24rem, `md` 36rem, `lg` 48rem, `xl` 64rem, `2xl` 80rem | `--spacing-block-*` |
| Radius | `none`, `sm`, `md`, `lg`, `xl`, `full` | `--radius-*` |
| Font weight | `normal`, `medium`, `semibold`, `bold` | `--font-weight-*` |
| z-index | `base`, `sticky`, `overlay`, `dialog`, `popover`, `toast`, `tooltip`, `auto` | `--z-index-*` |
| Translucency | `bg-translucent-subtle`, `bg-translucent`, `bg-translucent-strong` | `--translucency-subtle`, `--translucency`, `--translucency-strong`, `--surface-layer-filter` |

## Families
| File | Shorthands (verbose in brackets) |
| :--- | :--- |
| `spacing.css` | `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `ps-*`, `pe-*` (`padding-*`, `padding-inline-*` …); the same with `m`; `gap-*`, `gap-x-*` (`column-gap-*`), `gap-y-*` (`row-gap-*`) |
| `border.css` | `border` (the theme's `--border-width`, solid, `--border-color`), `border-0` (`border-none`); `border-t`, `-b`, `-s`, `-e`, `-x`, `-y` (`border-block-start` …); `border-dashed` … (`border-style-*`, style only); `border-width-thin`, `-medium`, `-thick` (width only; the width and style classes change their own element's border, not one nested inside); `border-muted` … (`border-color-*`, colour only); `rounded`, `rounded-*` (`border-radius-*`), `rounded-t`, `-b`, `-s`, `-e`; `rule`, `column-rule`, `row-rule` |
| `typography.css` | `font-sans`, `-serif`, `-mono` (`font-family-*`), `font-family-display`; `font-normal` … `font-bold` (`font-weight-*`); `italic`, `not-italic` (`font-style-*`); `text-start`, `-end`, `-center`, `-justify` (`text-align-*`); `uppercase`, `lowercase`, `capitalize`, `normal-case`; `whitespace-*` (`white-space-*`); `text-wrap`, `text-nowrap`, `text-balance`, `text-pretty` (`text-wrap-*`); `wrap-break-word`, `wrap-anywhere` (`overflow-wrap-*`); `truncate`; `text-box-trim-both` |
| `color.css` | `bg-*` (`bg-color-*`); `bg-translucent*`; `text-color`; `text-muted`, `text-strong`, `text-accent` … (`text-color-*`); `opacity-0`, `-muted`, `-disabled`, `-100` |
| `display.css` | `block`, `inline-block`, `flex`, `inline-flex`, `contents`, `hidden` (`display-*`); `display-inline` |
| `flex.css` | `flex-row`, `flex-col` … (`flex-direction-*`); `flex-wrap`, `flex-nowrap` (`flex-wrap-*`); `items-*` (`align-items-*`); `justify-*` (`justify-content-*`); `self-*` (`align-self-*`); `justify-self-*`; `grow`, `grow-0`, `shrink`, `shrink-0` (`flex-grow-*`, `flex-shrink-*`); `flex-1`, `flex-auto`, `flex-none` |
| `sizing.css` | `inline-size-{step}`, `min-inline-size-{step}` (no wider than its space; with `min-w-force` beside it, the full step, for content that should scroll rather than shrink, such as a cell in a scrolling table), `max-inline-size-{step}` and the block forms; `w-full`, `w-auto`, `w-screen`, `min-w-0`, `max-w-full`, `max-w-none`, `h-full`, `h-auto`, `h-screen`, `min-h-0`, `min-h-screen`, `max-h-full`; `size-{step}`, `size-full`; `-unit` (`--spacing`) and `-target` (`--spacing-target`) on every width, height and size (`w-target`, `h-target`, `min-h-unit`, `size-target` …); `w-stretch`, `min-w-stretch`, `max-w-stretch`, `h-stretch`, `min-h-stretch`, `max-h-stretch`, `size-stretch` (fill the space less the element's own margins, where `full` adds them and overflows; `100%` where `stretch` isn't supported); `aspect-auto`, `aspect-square`, `aspect-video`, `aspect-4/3`, `aspect-3/2`, `aspect-3/4`; `object-cover`, `object-contain` |
| `layout-helpers.css` | `relative` … (`position-*`); `overflow-*`, `overflow-x-*`, `overflow-y-*`; `overscroll-*`, `overscroll-x-*`, `overscroll-y-*` (`overscroll-behavior-*`, `-inline-*`, `-block-*`); `scrollbar-gutter-*`; `isolate` (`isolation-isolate`); `z-*` |
| `shadow.css` | `shadow-none`, `-sm`, `-md` (`shadow`), `-lg`, `-inner`, the `-light` forms; `shadow-accent`, `-success`, `-warning`, `-danger` |
| `focus-helpers.css` | `focus-within`, `focus-within--input`, `focus-within--inset`, `focus-within--border`, `focus-ring`, `focus-ring--inset` |
| `container.css` | `container-inline` (`container-type-inline-size`), `container-scroll` (`container-type-scroll-state`), `container-inline-scroll` (`container-type-inline-size-scroll-state`), `container-type-size`, `container-type-normal` |
| `scroll-fade.css` | `scroll-fade` |
| `sticky-shadow.css` | `sticky-shadow`: pins a part to the edge of its scroller, with a shadow only while it is pinned. The scroller takes `container-scroll` (`container-inline-scroll` on a Card), and the part is its direct child; see [Card](10-card.md) |

## Modes
A mode class sets a flag that the components inside read; it styles nothing itself.

| Class | Flag |
| :--- | :--- |
| `.ui-compact`, `.fine:ui-compact` | `--ui-sizing: compact` (density), the latter only where the primary pointer is fine |
| `.fine:targets-sm` | `--spacing-target-min: var(--spacing-target-sm)` where the primary pointer is fine: the product's opt-in to 32px targets. Goes on `<html>` |
| `.sizing-default` | Back to the default size inside a compact region: `--ui-sizing`, the spacing roles and the type |
| `.font-sizing-fixed`, `-fluid`, `-cq`, `-compact` | `--font-sizing` |
| `.controls-plain`, `-subtle`, `-sm`, `-lg`, `-round` | `--controls-prominence`, `--controls-size`, `--controls-corners` |
| `.elements-plain`, `-subtle` | `--elements-prominence`: every element with that prominence (controls, status, Chip, kbd, Icon Box, Tab List, Telemetry); not containers (Card, Sidebar, Banner, Menu, Accordion, Table, Stepper, Empty State) or links |
| `.color-scheme-light`, `-dark`, `-light-dark` | `color-scheme` |
| `.color-palette-inverted` (`.colors-inverted`) | The palette roles |
| `.viewport-fit-cover` | `--safe-area-inset-top`, `-bottom`, `-left`, `-right` from the device, and `-inline-start`, `-inline-end` by direction. Goes on `<html>`, with `viewport-fit=cover` in the viewport meta (without it the device reports 0). Header, Footer, Sidebar, a drawer Dialog, `.wrapper--safe-area`, Toast, Batch Actions, a docked Tab List and Skip Link read them |
