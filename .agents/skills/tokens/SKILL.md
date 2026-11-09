---
name: tokens
description: |
  Using and customising Design For Humans design tokens: the three tiers, the semantic roles to build with (surface, foreground, border, spacing, radius, type, motion, elevation), component tokens, themes, sizing modes and the fallback rules for CSS written against the library.

  Trigger immediately for:
  - Writing CSS for a product that uses the library: picking colours, spacing, radii, type or shadows.
  - Changing how a library component looks: its tokens, a theme, a variant of your own.
  - Looking up a custom property (`--surface-card`, `--spacing-breathe`, `--button-color`).
  - Light, dark, inverted and high-contrast regions; fluid, cq and compact sizing; fine-pointer targets.
  - Matching Figma variables to CSS.
---

# Design tokens in Design For Humans

Everything visual in the library is a custom property, in three tiers. Build with the middle tier, change components through the top tier, and leave the bottom tier alone.

| Tier | What it holds | Example | Use it? |
| :--- | :--- | :--- | :--- |
| 1 Global | Raw scales: colour ramps, the type scale, spacing steps, durations | `--color-blue-600`, `--spacing-16`, `--typography-font-size-2` | No. A theme generates them |
| 2 Semantic | Roles, with light and dark built in | `--surface-card`, `--foreground-muted`, `--spacing-breathe`, `--radius-md` | **Yes: build everything with these** |
| 3 Component | One component's hooks, unset until you set them | `--button-color`, `--card-radius`, `--dialog-width` | Yes, to change a library component |

The CSS name is the token path joined with hyphens: `surface.card` is `--surface-card` and `border.color.muted` is `--border-color-muted`. A `default` at the end drops off, so `foreground.default` is `--foreground`. In Figma, every variable shows its CSS name as code syntax in Dev Mode.

## The roles to build with (Tier 2)

**Colour** (each has light and dark values, and is contrast-checked in light, dark, inverted and high contrast):
- **Surfaces:** `--surface` (page), `--surface-card` (cards, dialogs, popovers), `--surface-muted`, `--surface-layer` (floating and sticky), `--surface-inverted`, `--surface-translucent` (hover tint).
- **Text and icons:** `--foreground`, `--foreground-strong`, `--foreground-muted`, `--foreground-inverted`.
- **Intents:**
  - `--foreground-{accent|complementary|info|success|warning|danger}`, each with `-hover` and `-pressed`.
  - `--surface-{intent}`: a tint for a banner or highlight.
  - `--surface-{intent}-strong`: a solid fill.
  - `--border-color-{intent}`.
- **Borders:** `--border-color` (default), `--border-color-muted`, `--border-color-quiet`, `--border-color-control` (a control's 3:1 boundary).
- **Focus:** `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset`.

**Space:**
- **Steps:** `--spacing-2xs` (2px), `xs` (4), `sm` (8), `md` (16), `lg` (32), `xl` (48), `2xl` (64), `3xl` (128).
- **Fluid roles:** grow with the screen: `--spacing-breathe-sm`, `--spacing-breathe`, `--spacing-cushion`, `--spacing-cushion-lg`. Their `cq-` versions grow with the container instead.
- **Targets:** `--spacing-target` (48px), `--spacing-target-sm` (32px), and `--spacing-target-min`, the hit area every control keeps.
- **Width:** `--spacing-site-width`.

**Shape:**
- **Radii:** `--radius` (the default), `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`, `--radius-none`.
- **Border widths:** `--border-width`, `--border-width-thin`, `--border-width-medium`, `--border-width-thick`.
- **Lines:**
  - `--rule-*`: dividers.
  - `--panel-*`: the edge of a card, table or menu.
  - `--app-*`: the edges of the Header, Sidebar and Footer, and the app's padding and sidebar width.
  - `--underline-*`: link underlines.

**Type:**
- Don't size text with tokens. Put a text atom on it (`.display-title`, `.title`, `.heading`, `.subheading`, `.small-heading`, `.micro-heading`, `.large-text`, `.text`, `.small-text`, `.micro-text`, `.label`).
- For your own component's fonts, read the role's family and weight (`--heading-font-family`, `--body-font-weight`) and the weights `--font-weight-regular` … `--font-weight-black`.

**Motion:**
- **Durations:** `--duration-none`, `-sm`, `-md`, `-lg`, `-xl`. Reduced motion takes them all to none.
- **Easing:** `--ease-in-out`, `--ease-in`, `--ease-out`, `--ease-bounce`, from the theme's motion section.

**Elevation and stacking:**
- **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg` and `--shadow-inner`, tinted by `--shadow-color`.
- **Stacking:** `--z-index-base`, `-sticky`, `-overlay`, `-dialog`, `-popover`, `-toast`, `-tooltip`.

Never use a Tier 1 colour (`--color-blue-600`) in a component, not even for a one-off. A ramp step isn't paired or contrast-checked, doesn't flip in dark mode or an inverted region, and changes meaning when the theme changes.

## Changing how things look

Take the first route that does the job; each later one gives more freedom and more to maintain. The full guide is https://components.designforhumans.blog/docs/start/customise/.

1. **Set a token.** Set the component's Tier 3 token, pointed at a role. Every state follows (hover, pressed, focus, compact), because they're built from the same token.

   For the whole product, set it in the theme (the Token Designer writes it and checks contrast). For a region or one element:

   ```css
   .plant-shop {
     --button-color: var(--foreground-complementary);
     --card-radius: var(--radius-lg);
   }
   ```

   Each component's tokens are listed on its docs page and in Storybook. A Button's colour tokens change only the neutral Button, so a danger Button stays danger.
2. **Add to the library's class** in the `site` layer, setting tokens where you can and properties where you must. A property such as `background` changes only the state you wrote it for.
3. **Build your own component** from the roles, with text atoms on its text and layout primitives (`.stack`, `.cluster`) on its rows, so it follows the type scale, sizing modes and compact regions. A variant of your own is a class that sets a component's tokens: `.button--leaf { --button-color: var(--foreground-success); }`.

Never copy a component's declarations into your own rules (with a mixin or by hand). The copy misses theme changes and sizing modes, and overrides the real class.

## Where your CSS goes

```css
@layer reset, tokens, atoms, molecules, organisms, layout, site, utilities, overrides;
```

- **Token choices** go in `tokens`.
- **Your components and additions** go in `site`. It comes after the library's components, so it wins without `!important`, and before its utilities, so `.p-sm` still works on your component.
- **Avoid unlayered CSS:** it beats every layer, the utilities included.

## Themes and regions

- **A theme** is one stylesheet linked after the library (`themes/<name>.css`). It changes only what differs from the default: colours, fonts, the type scale, spacing, shape, motion and component tokens. A sub-brand is a class (`.theme-<name>`) on `<html>` or a region. Build themes in the Token Designer, never by hand-editing generated CSS.
- **Light and dark** come from `light-dark()` in every colour role and the page's `color-scheme`. Write no `.dark` blocks.
- **Inverted:** `.color-palette-inverted` on a region swaps every role to its opposite, so components inside stay legible unchanged. `.color-scheme-dark` / `.color-scheme-light` force a scheme on a region.
- **High contrast** (`prefers-contrast: more`) is generated from the theme.

## Sizing modes

- **Text atoms are fixed by default.** A container picks another mode for everything inside it:
  - `.font-sizing-fluid` grows with the screen.
  - `.font-sizing-cq` grows with the container; it needs `container-type: inline-size`.
  - `.font-sizing-compact` steps text down by one.
- **Density:** `.ui-compact` (or any `--compact` container, which sets `--ui-sizing: compact`) steps gaps, type and controls down. Hit areas stay 48px. `.fine:ui-compact` applies it only where the primary pointer is fine.
- **Fine-pointer targets** are the product's opt-in: `.fine:targets-sm` on `<html>` sets `--spacing-target-min` to 32px on fine pointers. Never switch it on with `@media (pointer: fine)` yourself.

## Writing CSS against the tokens

- **Chain fallbacks to a role and end at a system value:** `var(--plant-tag-bg, var(--surface-muted, Canvas))`. If the tokens fail to load, the page degrades to legible, unstyled HTML.
- **Never end a chain at a literal colour** (`#fff`, `rgb()`). End colours at `Canvas`, `CanvasText`, `currentColor` or `transparent`, shadows at `none`, and border widths at `1px` or `0`.
- **Derive states in CSS**, not by hand-picking colours:
  - In OKLCH between two colours: `color-mix(in oklch, var(--surface-card), var(--foreground) 8%)`.
  - Translucency in sRGB against `transparent`: `color-mix(in srgb, var(--foreground-accent), transparent 80%)`.
- **Use logical properties** (`padding-inline`, `margin-block-start`, `inline-size`) so right-to-left layouts work.
- **No raw `px`, `rem` or hex in a component.** If a value has no token, it probably wants a role; ask before adding one.
