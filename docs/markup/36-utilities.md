# 36. Utilities
A utility sets one property to one value on the element it is on, from a Tier 2 token where one exists (`packages/css/src/utilities/`). It never does a component's job: type size belongs to the text atoms, arrangement to the layout primitives, widths and surfaces to components. Responsive helpers are in §31.

## A. Names
- **Two names at most.** The verbose name is the logical property and the value (`.padding-inline-sm`, `.text-align-start`, `.border-block-end`). The shorthand is Tailwind's, where Tailwind has one with the same meaning (`.px-sm`, `.text-start`, `.border-b`). **Examples and markup use the shorthand.**
- **Spacing is the one exception:** it keeps Tailwind's prefixes with the library's step names (`.p-sm`, not `.p-2`), because Tailwind's numbers map to nothing here.
- **Logical sides only.** `t`/`b` are block start and end; `s`/`e` inline start and end; `x`/`y` the inline and block axes. There are no left or right names.
- **Bare words** only where Tailwind uses the word for the same declaration: `flex`, `hidden`, `block`, `contents`, `static`, `relative`, `absolute`, `fixed`, `sticky`, `isolate`, `truncate`, `italic`, `uppercase`, `lowercase`, `capitalize`, `grow`, `shrink`; and the valueless defaults `border`, `rounded`, `shadow`, `rule`.
- `npm run check:utilities` fails on a third name, a bare word outside that list, a left/right name, or a Tier 1 token.

## B. Scales
| Scale | Steps | Tokens |
| :--- | :--- | :--- |
| Spacing | `0`, `2xs` 2px, `xs` 4px, `sm` 8px, `md` 16px, `lg` 32px, `xl` 48px, `2xl` 64px, `3xl` 128px, `breathe`, `cushion` (fluid); `auto` for margins | `--spacing-2xs` … `--spacing-3xl`, `--spacing-breathe`, `--spacing-cushion` |
| Sizes | `2xs` 8rem, `xs` 16rem, `sm` 24rem, `md` 36rem, `lg` 48rem, `xl` 64rem, `2xl` 80rem | `--spacing-block-*` |
| Radius | `none`, `sm`, `md`, `lg`, `xl`, `full` | `--radius-*` |
| Font weight | `normal`, `medium`, `semibold`, `bold` | `--font-weight-*` |
| z-index | `base`, `sticky`, `overlay`, `dialog`, `popover`, `toast`, `tooltip`, `auto` | `--z-index-*` |
| Translucency | `bg-translucent-subtle`, `bg-translucent`, `bg-translucent-strong` | `--translucency-subtle`, `--translucency`, `--translucency-strong`, `--surface-layer-filter` |

## C. Families
| File | Shorthands (verbose in brackets) |
| :--- | :--- |
| `spacing.css` | `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `ps-*`, `pe-*` (`padding-*`, `padding-inline-*` …); the same with `m`; `gap-*`, `gap-x-*` (`column-gap-*`), `gap-y-*` (`row-gap-*`) |
| `border.css` | `border`, `border-md`, `border-lg`, `border-0` (`border-none`); `border-t`, `-b`, `-s`, `-e`, `-x`, `-y` (`border-block-start` …); `border-dashed` … (`border-style-*`); `border-muted` … (`border-color-*`, colour only); `rounded`, `rounded-*` (`border-radius-*`), `rounded-t`, `-b`, `-s`, `-e`; `rule`, `column-rule`, `row-rule` |
| `typography.css` | `font-sans`, `-serif`, `-mono` (`font-family-*`), `font-family-display`; `font-normal` … `font-bold` (`font-weight-*`); `italic`, `not-italic` (`font-style-*`); `text-start`, `-end`, `-center`, `-justify` (`text-align-*`); `uppercase`, `lowercase`, `capitalize`, `normal-case`; `whitespace-*` (`white-space-*`); `text-wrap`, `text-nowrap`, `text-balance`, `text-pretty` (`text-wrap-*`); `wrap-break-word`, `wrap-anywhere` (`overflow-wrap-*`); `truncate`; `text-box-trim-both` |
| `color.css` | `bg-*` (`bg-color-*`); `bg-translucent*`; `text-color`; `text-muted`, `text-strong`, `text-accent` … (`text-color-*`); `opacity-0`, `-muted`, `-disabled`, `-100` |
| `display.css` | `block`, `inline-block`, `flex`, `inline-flex`, `contents`, `hidden` (`display-*`); `display-inline` |
| `flex.css` | `flex-row`, `flex-col` … (`flex-direction-*`); `flex-wrap`, `flex-nowrap` (`flex-wrap-*`); `items-*` (`align-items-*`); `justify-*` (`justify-content-*`); `self-*` (`align-self-*`); `justify-self-*`; `grow`, `grow-0`, `shrink`, `shrink-0` (`flex-grow-*`, `flex-shrink-*`); `flex-1`, `flex-auto`, `flex-none` |
| `sizing.css` | `inline-size-{step}`, `min-inline-size-{step}`, `max-inline-size-{step}` and the block forms; `w-full`, `w-auto`, `w-screen`, `min-w-0`, `max-w-full`, `max-w-none`, `h-full`, `h-auto`, `h-screen`, `min-h-0`, `min-h-screen`, `max-h-full`; `size-unit`, `size-target`, `size-{step}`, `size-full` |
| `layout-helpers.css` | `relative` … (`position-*`); `overflow-*`, `overflow-x-*`, `overflow-y-*`; `overscroll-*` (`overscroll-behavior-*`); `scrollbar-gutter-*`; `isolate` (`isolation-isolate`); `z-*` |
| `shadow.css` | `shadow-none`, `-sm`, `-md` (`shadow`), `-lg`, `-inner`, the `-light` forms; `shadow-accent`, `-success`, `-warning`, `-danger` |
| `focus-helpers.css` | `focus-within`, `focus-within--input`, `focus-within--inset`, `focus-within--border`, `focus-ring` |
| `container.css` | `container-inline` (`container-type-inline-size`), `container-type-size`, `container-type-normal` |
| `scroll-fade.css` | `scroll-fade` |

## D. Modes
A mode class sets a flag that the components inside read; it styles nothing itself.

| Class | Flag |
| :--- | :--- |
| `.ui-compact`, `.fine:ui-compact` | `--ui-sizing: compact` (density), the latter only where the primary pointer is fine |
| `.font-sizing-fixed`, `-fluid`, `-cq`, `-compact` | `--font-sizing` |
| `.controls-plain`, `-subtle`, `-sm`, `-lg`, `-round` | `--controls-prominence`, `--controls-size`, `--controls-corners` |
| `.elements-plain`, `-subtle` | `--elements-prominence`: every element with that prominence (controls, status, chip, kbd, icon box, tab list, telemetry); not containers (card, sidebar, banner, menu, accordion, table, stepper, empty state) or links |
| `.color-scheme-light`, `-dark`, `-light-dark` | `color-scheme` |
| `.color-palette-inverted` (`.colors-inverted`) | The palette roles |

## E. Markup
```html
<div class="border border-dashed border-muted rounded-md p-md">…</div>
<p class="small-text text-muted text-balance">…</p>
<div class="card max-inline-size-sm mx-auto">…</div>
<span class="sr-only">Remove Bed 3</span>
```

## F. Rules
- **Not a utility:** a type size (use a text atom: `.small-text`, `.text`, `.large-text`, `.small-heading` …); a row or column of things (use `.inline`, `.cluster`, `.stack`, `.grid`, `.split`); a component's width or surface (set its token).
- **Combining:** `.border` draws the border; the style and colour classes change one part of it. A colour class tints a shadow the element already has.
- **Text on dark backgrounds:** pair a dark `bg-*` with `text-inverted` or `text-on-dark`, or put `.color-scheme-dark` on the region.
- **Intent colours** (text, border, shadow, background) never carry meaning alone (WCAG 1.4.1).
- **Scrolling regions** (`overflow-*-auto`) need something focusable inside, or `tabindex="0"`, a role and a label (WCAG 2.1.1).
- **Removed in the utilities pass:** every third name and synonym; `font-size-*`, `line-height-*`, `fs-*`, `fw-*`; numeric weights and z-indexes; `width-dialog`, `-popover`, `-sidebar`, `-prose`, `-shell`, `-wide`, `block-*`, `height-*`, `size-grow`; `bg-effect-*`, `bg-blurred-*`, palette shadow colours; `.backdrop`, `.focus-none`, `.outline-none`; `ui-dense`, `ui-default`, `spacing-mode-*`, `viewport-fit-cover`; the left/right names. `border-muted` and `border-quiet` now set the colour only, `.border` is 1px, and `.text-nowrap` sets `text-wrap`.
