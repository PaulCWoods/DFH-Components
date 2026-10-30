# Typography

Plan for the type pass: a theme engine for the type scale and the text styles, and a Typography section in the Token Designer. The colour pass (`audit/palette.md`) is the model: one theme source, an engine that writes the tokens, a gate that checks them, and a designer that edits the theme.

## What there is

### Tier 1 (`1-global.json`)

- **Families:** `inter`, `georgia`, `jetbrains-mono`, `plus-jakarta-sans`, each a stack that names the web font first, then system fonts. Four roles point at them: `sans` (Inter), `serif` (Georgia), `mono` (JetBrains Mono), `display` (Plus Jakarta Sans).
- **Scale:** `font-size-base` (1rem) and `ratio` (1.2) give steps -2 to 8 (0.694rem to 4.3rem). The compiler recomputes the stored step values from the base and ratio on every build.
- **Fluid scale:** `fluid-scale` has a mobile base and ratio (1rem, 1.2) and a desktop base and ratio (1.2rem, 1.2). Each fluid step runs from the mobile value to the desktop value between 400px and 1280px. Because the desktop base equals the ratio, every fluid step grows by exactly one step. Ranges like `2-3` and `5-8` are made on demand when a token asks for them, and each comes in a viewport (`vi`) and a container (`cqi`) version.
- **Line heights:** a geometric scale, 1.6 × 1.125ⁿ, with steps 1, 0 and -1 to -5 (1.8 down to 0.89). It has no link to the font-size scale: each text style picks a step by hand.
- **Weights** 100 to 900, and **letter spacing** in `em` (xtight to wide).

### Tier 2 (`2-semantic.json`)

Ten text styles, the text atoms' tokens. Each has a family, weight, line height, letter spacing and case, and a size for each mode (fixed, compact, fluid, cq):

| Style | Fixed | Compact | Fluid / cq | Line height |
| :--- | :--- | :--- | :--- | :--- |
| display-title | 5 | 4 | 5→8 | -4 (title's) |
| title | 3 | 2 | 3→5 | -4 |
| heading | 2 | 1 | 2→3 | -3 |
| subheading | 1 | 0 | 1 | -2 |
| small-heading | 0 | -1 | 0 | -1 |
| micro-heading | -1 | -2 | none | -3 |
| body-lg | 1 | 0 | 1 | (body's) |
| body | 0 | -1 | 0 | 0 |
| body-sm | -1 | -2 | -1 (cq: -2) | -1 |
| body-xs | -2 | -2 | -2 | -2 |
| label | 0 | -1 | none | -1 |
| control (sm, lg) | 0 (-1, 2) | | | -2 |

### Elsewhere

- The fluid range (400px to 1280px) and the fluid spacing scale (ratio 4/3) are literals in `compile-tokens.js`, not tokens.
- `export-figma-tokens.js` writes Figma text styles from a hand-written list of six presets.
- `text.css` picks each atom's size from `--font-sizing` and `--ui-sizing` with container style queries. It doesn't change in this pass.

## Findings

1. **One scale, three definitions.** The static scale (`font-size-base`, `ratio`), the fluid scale (`fluid-scale`) and the stored step values all describe the same thing. Only the first two are inputs; the stored values are outputs that sit beside them in the same file and look editable.
2. **The fluid range isn't a token.** 400px and 1280px are fixed in the compiler, so a product can't change where fluid type starts and stops growing, and Figma never sees it. *Fixed in phase 1: the range is now two tokens.*
3. **Line height is chosen by hand, step by step.** Nothing ties it to the size, so a style can end up with loose large type or tight small type. Tokens have pointed at steps that don't exist (`line-height.3` to `.5`, fixed in the quick fixes), and the Figma presets still do.
4. **Figma's text styles are out of date.** *Fixed in phase 5: generated from the styles.* The six presets point at line-height steps 2 to 5, which don't exist; give the title the sans family (the library uses display); and leave out small-heading, micro-heading, display-title and label. There are no compact styles.
5. **Gaps in the modes.** micro-heading and label have no fluid or cq size, so in a fluid region they stay fixed while the type around them grows. body-sm's cq size is -2 while its fluid size is -1. body-xs's compact size is the same as its fixed size (step -2 is the floor).
6. **The smallest step is 11.1px.** Step -2 (0.694rem) carries footnotes, hints and micro text in compact regions. It is legal, but small for a library that aims at AA and some AAA.
7. **Font stacks name web fonts the library doesn't load.** PRINCIPLES §4 says the tokens default to system stacks. Today Inter, Plus Jakarta Sans and JetBrains Mono come first; they only appear when installed locally, so the same page renders differently from machine to machine.
8. **control-lg is step 2**, the heading size. Probably intended, but the gate should report it so it is a choice.

## What the tool must do

### Theme source

A `type` section in `tokens/theme.json`, beside the colour theme, so the designer saves one theme:

```json
"type": {
  "fonts": {
    "inter": { "source": "google", "family": "Inter", "weights": [400, 500, 600, 700, 800], "italic": false },
    "brand": { "source": "adobe", "kit": "abc1234", "family": "freight-sans-pro" },
    "house-serif": { "source": "local", "family": "House Serif", "files": [{ "path": "fonts/house-serif-400.woff2", "weight": 400, "style": "normal" }] }
  },
  "families": {
    "sans": { "font": "inter", "fallback": "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif" },
    "serif": { "font": null, "fallback": "Georgia, Cambria, \"Times New Roman\", serif" },
    "mono": { … }, "display": { … }
  },
  "scale": { "base": "1rem", "ratio": 1.2, "steps": [-2, 8] },
  "fluid": {
    "viewports": ["25rem", "80rem"],
    "min": { "ratio": 1.2 },
    "max": { "base": "1.2rem", "ratio": 1.2 }
  },
  "styles": {
    "heading": { "family": "sans", "weight": "bold", "lineHeight": 1.2, "letterSpacing": "normal", "case": "none",
                 "size": 2, "compact": 1, "growTo": 3 },
    "body": { "family": "sans", "weight": "regular", "lineHeight": 1.6, "size": 0, "compact": -1 },
    …
  }
}
```

- **Fonts** are a list of sources, each with a name the families refer to:
  - **Google Fonts:** family name, weights and italics. The designer builds the `<link>` (with `preconnect`) for a product's page head and shows it to copy.
  - **Adobe Fonts:** the kit (project) ID and the family names exactly as Adobe gives them for CSS. The designer builds the kit's `<link>`.
  - **Local (self-hosted):** font files stored in the project (`fonts/` at the repo root, or a product's own folder), each with its weight and style. The engine writes an `@font-face` stylesheet (`fonts.css`) beside the tokens. `index.css` never imports it: a product links it, or copies it, as it chooses.
  - The library itself still loads no fonts (PRINCIPLES §4). Storybook and the docs site load the theme's fonts in their page heads, from the same sources.
- **Families** (`sans`, `serif`, `mono`, `display`) each name a font and a system fallback stack. The token is the font's family name, then the fallback, so a page without the font still renders in a sensible system face.
- **House style:** Inter for `sans`, from Google Fonts, for now. `display` and `mono` keep Plus Jakarta Sans and JetBrains Mono, also from Google Fonts, unless you'd rather point them at Inter and a system mono.
- **Fluid** is set once for the whole system, as five values: the base size and scale ratio (the fixed scale), the smallest-end ratio (with the base size, the scale at the smallest viewport), and the largest-end base size and ratio. A step's fluid size runs from its value on the small scale to its value on the large scale, between the two viewports. The smallest-end ratio starts equal to the scale ratio, as today.
- **A style's fluid size** follows the system by default: step n grows from step n on the small scale to step n on the large scale. A style can instead grow to another step for a more dramatic change (`growTo`): display-title runs from step 5 on the small scale to step 8 on the large one. The cq size uses the same steps, with the container's width in place of the viewport's.
- **Line height** is a value per style, checked by the gate.

### Engine (`packages/theme-engine`, new `type.js`)

- Builds the static steps, the fluid and cq clamps (moved out of the compiler, the viewport range included), and the line heights.
- Writes the typography block of `1-global.json` and the text styles of `2-semantic.json`, the way `applyRoles` writes the colour roles.
- Generates Figma's text styles from the text styles (every style, fixed and compact), replacing the hand-written presets.
- A migration step reads today's tokens into the new `type` section and checks that every compiled size, line height and clamp comes out the same before anything else changes.

### Gate

Checked on save and before Publish, like the contrast gate. **Fails** block Publish; **reports** show in the designer and the build output but don't block it.

- **Fail:** a reference to a step, family or weight that doesn't exist.
- **Fail:** a scale that doesn't increase step to step, or a hierarchy out of order (display-title ≥ title ≥ heading ≥ subheading ≥ small-heading, each in every mode; compact never larger than fixed).
- **Fail:** a fluid or cq size whose largest value is more than 2.5 times its smallest. Beyond that, zooming to 200% can't double the text (WCAG 1.4.4).
- **Report:** a size below 12px (step -2 is 11.1px today).
- **Report:** body text line height below 1.5 (WCAG 1.4.8, AAA); a heading line height above body's; a style that grows in fluid mode but not in cq, or the other way round.
- **Report:** two styles that differ only in weight or case at the same size (they may not read as different levels).

### Designer

A **Typography** section beside **Colors**, with the same layout: preview on the left, editor on the right, Save and Publish in the footer.

- **Fonts:** add a font from Google Fonts (search by name, pick weights), Adobe Fonts (kit ID and family names) or the project's stored files (pick files, set each one's weight and style). Each font shows a sample in every weight it has. The panel gives the `<link>` or `@font-face` a product needs. The designer loads the fonts for its own preview.
- **Global (Tier 1):**
  - **families:** each role's font and fallback stack, with a sample line;
  - **scale:** base size and ratio, with the named ratios (minor third 1.2, major third 1.25, perfect fourth 1.333 …) as presets;
  - **fluid:** the two viewports, the smallest-end ratio, and the largest-end base size and ratio;
  - a ladder of every step from -2 to 8, at both ends of the fluid range, in px and rem.
- **Semantic (Tier 2):**
  - a row per text style: family, weight, line height, letter spacing, case, its step, its compact step, and how it grows: with the system (the default) or to another step;
  - a specimen of each style, and each gate result on its row, with an icon and words, not colour alone.
- **Preview:** today's preview cards (they use the text atoms already), plus a type specimen, with a width control so fluid and cq sizes can be watched as they grow. The light and dark switch stays.

### Order of work

1. **Engine and migration.** Done 30 October 2026: `type.js`, `test/type.test.js`, `npm run build:type`, the `type` section of `theme.json` (migrated from the tokens), and the fluid range as tokens (`typography.fluid-scale.min-viewport`, `max-viewport`), which `compile-tokens.js` now reads. The compiled `variables.css` is unchanged apart from those two properties. The engine leaves a token as written when it already resolves to the style's value, so references between styles (subheading takes heading's family) and the line-height steps survive until a value changes.
2. **Gate.** Done 30 October 2026: `src/type-gate.js` (`typeGate`), `test/type-gate.test.js`, run by `npm run build:type`, which refuses `--write` on a failure. The designer runs it from phase 3. Today's theme has no failures and six reports:
   - **floor:** micro-heading (compact), body-sm (compact, cq) and body-xs (every mode) reach 11.1px;
   - **line height:** body-sm (1.422) and body-xs (1.264) are below 1.5;
   - **modes:** body-sm's cq size runs a step below its fluid size.

   These are findings 5 and 6, left for phase 6. A style with a step off the scale fails its reference and skips the size checks, so one mistake gives one failure. The look-alike check compares headings with headings and body styles with body styles only, since a heading and body text at one size are meant to differ by weight.
3. **Designer, Global tab.** Done 30 October 2026 (`packages/token-designer/src/type.ts`). The header switches between Colors and Typography (`#type` in the address).
   - **Fonts:** each font set in itself, with a sample of each weight it loads. The dialog takes a Google family (searched from Google's own list through the dev server, with that family's weights and a fallback for its category), an Adobe kit ID and CSS family name, files stored in the project (path, weight, style per line), or a system font. A rename carries the roles with it. A font a role uses can't be removed.
   - **Page head:** the `<link>`s and `@font-face` rules to copy.
   - **Families:** each role's font, with a line set in it.
   - **Scale:** base size, and the ratio with named presets.
   - **Fluid range:** the two widths, the start ratio, and the end base and ratio.
   - **Steps:** every step fixed and at both ends of the range, how much it grows, the styles fixed at it and an "Ag" at its size. Below that, every gate result with an icon and words.
   - The preview takes the type properties (`typeCssVars`, tested against the compiled CSS) and loads the theme's fonts. The header status counts both gates. Publish writes the type tokens too, and is blocked by either gate; publishing the unchanged theme rewrites the tokens byte for byte.
4. **Designer, Semantic tab.** Done 30 October 2026 ("Text styles").
   - **A card per style:** its specimen, set from the theme; its sizes in every mode; and fields for family role, weight, line height, letter spacing, case, step, compact step, how it grows (not at all, with the system, or to a step), and its container size (same as fluid, or a step of its own).
   - **Checks:** the gate's failures and reports for that style, with a status in the card's header.
   - **Inheritance:** a field the theme leaves unset (body-lg's family) shows "Inherits". Once set it stays explicit until Reset, because writing never removes a token.
   - **Moving a step** moves the compact and grow-to steps with it.
   - **Preview:** in the Typography section, a specimen of every text atom in place of the sample UI. The preview's bar (shared with Colors, where it says which mode is showing) holds a sizing control (fixed, fluid, cq, compact), a width control that narrows the frame so fluid and container sizes can be watched as they grow, and the light and dark button. `typeCssVars` now writes the text styles' properties as well.
   - Publish for type came with phase 3.
5. **Figma text styles.** Done 30 October 2026. `figmaTextStyles` (theme engine) builds them from the published Tier 2 styles, and `export-figma-tokens.js` writes them into the Tokens Studio file in place of the six hand-written presets.
   - **Coverage:** all 14 styles at their fixed size, and the same 14 under `compact/`.
   - **References:** each property follows its references down to a Tier 1 token (or a Tier 2 weight), because the Tokens Studio sets don't carry every text group. Every reference resolves inside the exported file.
   - **Fixes finding 4:** the title takes the display family, and the line heights point at steps that exist. Fluid and container sizes stay web only (Figma has one size per style). Native Figma Variables can't carry text styles, so they come through Tokens Studio.
6. **Fixes the tool makes possible:** the mode gaps (finding 5), the floor (finding 6) and the stacks (finding 7), each as a theme change you approve in the designer.
7. **Blog mirror.**

## Answers

Decided with the user on 30 October 2026:

1. **Theme source:** a `type` section in `theme.json`.
2. **Fonts:** an in-house style, Inter for now. The tool needs font sources: Google Fonts, Adobe Fonts (kit ID and family names) and fonts stored in the project.
3. **Fluid model:** set at system level as the base size and scale ratio, then the smallest-end ratio and the largest-end base size and ratio. Each text style either follows that or grows to another step (as display-title does, 5 to 8).
4. **The 12px floor:** report only.
5. **Line height:** a value per style.
6. **Steps:** -2 to 8 is enough.
7. **Fluid spacing:** its own pass later.
