---
name: token-pipeline
description: |
  Maintaining the Design For Humans token pipeline in this repo: theme files, the build:* generators and their gates, generated files, Tier 3 defaults and check:tokens, sub-brands, and parity with Figma.

  Trigger immediately for:
  - Editing tokens/themes/*.json, tokens/1-global.json, tokens/2-semantic.json or tokens/3-component.json.
  - Adding, renaming or removing a token at any tier.
  - Running or debugging build:themes, build:palette, build:type, build:space, build:shape, build:motion, build:components, build:tokens or build:css.
  - A gate failure (contrast, type, space, shape, motion, component, check:tokens).
  - Changing the theme engine (packages/theme-engine).
---

# The token pipeline

For using tokens in CSS, load the `tokens` skill. This skill covers how they're made. The command reference, with every gate's rules, is the "Tokens & Assets Pipeline" table in `AGENTS.md`.

## Source and generated files

**Edit the theme, never the output.** Most of Tier 1 and Tier 2 is written by the theme engine from a theme file.

| File | Edit by hand? | Written by |
| :--- | :--- | :--- |
| `tokens/themes/<name>.json` | **Yes**: one theme per file | Hand or the Token Designer (in the private repo) |
| `tokens/themes.json` | Yes | Names the `default` theme (builds the library's tokens), the `site` theme (docs and Storybook fonts) and the theme Storybook starts on |
| `tokens/1-global.json` | Only groups no theme section owns | The `build:*` generators (colour ramps, type steps, fluid spacing, new spacing and duration steps) |
| `tokens/2-semantic.json` | Only roles no theme section owns | The generators (colour roles and mixes, high contrast, text styles, spacing roles, shape, motion) |
| `tokens/3-component.json` | **Yes**, with the CSS fallback | Hand: the Tier 3 values Figma gets |
| `packages/css/src/variables.css` | Never | `build:tokens` (Tier 1 and 2) |
| `packages/css/src/component-theme.css`, `fonts.css`, `themes/*.css` | Never | `build:themes` |
| `packages/docs/public/css/<version>/` | Never; a published version never changes | `build:css` |
| `packages/docs/public/schema/theme-v<n>.schema.json` | Never | `build:themes`, from `theme-schema.js` |

A theme file starts with `"$schema"` (the theme format's address, so editors check and complete it) and `"version": 1`. The format is `packages/theme-engine/src/theme-schema.js`; `build:themes` publishes it as `packages/docs/public/schema/theme-v1.schema.json`. Every theme is checked against it when it's read, before any gate: a misspelt key, a wrong kind of value or a newer version fails with the place named. The schema checks shape, the gates check meaning. To change the format, raise `THEME_VERSION` and add an upgrade step to `upgradeTheme()` (`validate.js`), so saved themes keep working.

A theme file's sections:
- **Colour:** `curve`, `ends`, `chroma`, `fixed`, `hues`, `roles`, `mixes`, `contrast`.
- **Type:** `type` (fonts, families, scale, leading, fluid, styles, controls).
- **Spacing:** `space` (base, ratio, roles, site width, targets, app sizes).
- **Shape:** `shape` (radius, border, shadow, lines).
- **Motion:** `motion` (durations, easings).
- **Component tokens:** `components`, the theme's Tier 3 choices.

A sub-brand has `"extends": "<parent>"` and only what it changes; `null` removes an inherited key.

## The usual flow

1. **Change the theme.** Use the Designer, or edit `tokens/themes/<name>.json`.
2. **Build every theme:** `npm run build:themes`. Every gate runs on every theme, and a theme that fails writes nothing.
   - The default theme rewrites `1-global.json`, `2-semantic.json`, `component-theme.css`, `fonts.css` and `variables.css`.
   - Each other theme writes `packages/css/src/themes/<name>.css`.
3. **Export to Figma** from the private repo (DFH-Components-Private), which reads this repo's tokens: its `export:figma`.
4. **Check Tier 3:** `npm run check:tokens`.
5. **Run the story gates** if anything visible changed: `build:storybook`, then `check:targets`, `check:focus` and `check:layout`, run one at a time, each under `timeout`.

To work on one part of the default theme alone, each generator prints its result and gate, and writes nothing until you pass `-- --write`: `build:palette`, `build:type`, `build:space`, `build:shape`, `build:motion` and `build:components`.

## Gates

Every gate fails rather than writes. Fix the theme, never the generated value:
- **Palette:** every Tier 2 pairing in light, dark and high contrast. A control edge or focus ring needs 3:1, text 4.5:1. It reports text under 7:1.
- **Type:** the scale in order, a floor and ceilings, fluid growth no more than 2.5×, compact no larger than fixed, a font's `italicAxes` (tags with numbers, on a variable font). It reports sizes under 12px, line heights under 1.5 and fonts whose italic axes differ (the page uses one setting, body text's font first).
- **Space:** roles growing in order, each target a Tier 1 step and at least 24px (the default target at least 44px), and the app sizes.
- **Shape:** sizes on the Tier 1 spacing steps, roles in order, a focus ring of at least 2px.
- **Motion:** durations in order, and curves CSS can run.
- **Components:** a known token, a reference that resolves, and a part's own text and background at 4.5:1.

## Tier 3 rules

- **The default lives in the CSS fallback** where the component reads it: `var(--card-radius, var(--radius-lg))`. Tier 3 isn't compiled into `variables.css`.
- **`tokens/3-component.json` holds the same value** for Figma. `npm run check:tokens` fails on a mismatch, on a read with no fallback, and on a token nothing reads. Change both together.
- **A Tier 1 step may be a default** only where no Tier 2 role means that step: `var(--badge-gap, var(--spacing-12))`. A colour ramp step never may.
- **A theme customises a token** in its `components` section, never by changing the default.
- **No typography tokens on composites** (`card.title-font-size`): text atoms own type.
- **Names follow** `--<component>-<property>` and `--<component>-<size>-<property>`. Flags are named after the axis they set: `--<component>-prominence`, `-intent`, `-size`, `-corners`. Density is never a per-component flag; it's `--ui-sizing: compact`.

## Naming and CSS output

- **CSS names** are the path joined with hyphens. A trailing `default` drops (`border.color.default` → `--border-color`), and `minus-N` becomes `-N` (`typography.font-size.minus-1` → `--typography-font-size--1`). Text roles keep their mode in the name (`--body-fixed-font-size`, `--body-fluid-font-size`).
- **Fluid sizes are written three ways,** oldest first so the newest supported wins: `clamp()`, then `progress()` under `@supports`, then the `@function`s under `@supports at-rule(@function)`. Drop the oldest when the next becomes Baseline Widely Available.
- **Shadows** are 3-layer stacks with `@function --shadow-*` versions. Firefox has no `@function`, so it always gets the `var(--shadow-md)` fallback first.
- **Colours** are generated in OKLCH and stored as hex, because Figma can't hold OKLCH. Never hand-edit a hex value.

## Figma

The Figma export lives in the private repo, with the `figma` skill for the Figma file. It imports the engine from this repo, so a token or axis it can't represent is a problem here: PRINCIPLES asks that every tier exports cleanly to Figma Variables and Tokens Studio, or has a documented reason. A token's CSS name becomes its Figma variable's code syntax, so renaming a token renames it in Figma at the next export.

A change that the sites (the blog, the course) should get is a new version: raise `packages/css/package.json`, run `build:themes` then `build:css`, commit, then raise each site's pinned version.
