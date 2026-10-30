# Colour Palette

This audit covers:
- the Tier 1 colour ramps (`tokens/1-global.json` → `color`);
- the Tier 2 colour roles built on them (`tokens/2-semantic.json`);
- how both reach Figma and the blog;
- the tool that will generate the ramps.

The tool is meant to become the first feature of a **Token Designer**: a UI where developers and designers build a theme for the token library.

The numbers come from `tokens/*.json`, with WCAG 2 contrast and APCA Lc measured in a script. The ramp and pairing tables are reproducible.

## What there is

### Tier 1 ramps

- **Hues.** There are eight: neutral, aqua, blue, purple, olive, amber, green and red.
- **Steps.** Neutral has 11 steps (000 to 1000); the other hues have 9 (100 to 900).
- **Authoring.** Every value is a hand-picked hex.

OKLCH lightness (×100) of each step:

| Step | neutral | aqua | blue | purple | olive | amber | green | red | Spread |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 100 | 92 | 97 | 97 | 97 | 98 | 97 | 97 | 97 | 1 |
| 200 | 83 | 94 | 94 | 94 | 95 | 94 | 92 | 91 | 4 |
| 300 | 77 | 87 | 87 | 87 | 87 | 89 | 84 | 83 | 6 |
| 400 | 70 | 78 | 78 | 78 | 78 | 84 | 75 | 74 | 10 |
| 500 | 63 | 67 | 67 | 67 | 67 | 79 | 66 | 64 | 15 |
| 600 | 56 | 55 | 63 | 63 | 63 | 71 | 59 | 60 | 16 |
| 700 | 49 | 46 | 54 | 54 | 54 | 57 | 50 | 52 | 11 |
| 800 | 42 | 34 | 43 | 42 | 42 | 43 | 39 | 40 | 9 |
| 900 | 36 | 28 | 28 | 27 | 27 | 26 | 26 | 27 | 2 |

(The Spread column ignores neutral, which follows its own curve.)

The ends of the ramps agree; the middle doesn't:
- **Amber** runs 12 to 15 points lighter than the rest from 400 to 600, then drops 14 points to 700.
- **Aqua** runs 8 to 9 points darker than the rest from 600 to 800.

This is the fault HANDOVER describes: the same step gives a different contrast in each hue, so a role that works for red fails for amber.

WCAG contrast of step 700, the light-mode text step, against white:

| aqua | blue | purple | olive | amber | green | red |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 6.8 | 4.9 | 5.4 | 4.9 | **4.5** | 5.8 | 6.2 |

### Tier 2 roles

Each intent maps to fixed steps:

| Role | Light mode | Dark mode |
| :--- | :--- | :--- |
| Text | 700 | 300 |
| Text, hover | 600 | 200 |
| Text, pressed | 800 | 400 |
| Tint surface | 100 (accent and complementary 200) | 900 (accent and complementary 800) |
| Strong surface | 700 | 300 |
| Border | 400 | 600 |

The intents use these hues:
- accent: purple;
- complementary: olive;
- danger: red;
- warning: amber;
- success: green;
- info: aqua.

Neutral provides the canvas, card, muted surface and text. **Blue is not used** by Tier 2, Tier 3 or any component.

### Findings

**Text contrast failures in light mode** (4.5:1 needed):

| Pairing | Ratio | APCA Lc |
| :--- | ---: | ---: |
| Warning text on the canvas | 4.15 | 65 |
| Warning text on its own tint (the open status failure) | 4.12 | 65 |
| Warning text on the muted surface | 3.56 | 55 |
| Canvas-coloured text on the strong warning surface | 4.15 | 70 |
| Accent text on its own tint | 4.46 | 64 |
| Accent text on the muted surface | 4.24 | 61 |
| Complementary text on its own tint | 4.26 | 64 |
| Complementary text on the muted surface | 3.88 | 58 |
| Complementary text on the canvas | 4.53 | 68 |

Complementary text on the canvas passes, but only just. Dark-mode text passes everywhere, at 4.8:1 or more.

**Intent borders are faint.**
- In light mode every intent border is 1.5 to 2.3:1 against the canvas. In dark mode, accent and complementary borders are 2.4:1 against their own tint.
- Today that's allowed: statuses, banners and chips carry their meaning in text and fill. WCAG 1.4.11 asks for 3:1 only where the border itself identifies the control.
- It becomes a problem for the proposed **card intent**. There, an edge is the visual cue, so it needs 3:1.

**`-light` and `-dark` mean different things in different Tier 2 groups:**
- In `foreground-color`, `-dark` is the darker colour, used in light mode.
- In `border-color`, `-light` is the light-mode colour, which is the lighter step.
- In `surface.*-strong`, `light-dark()` takes `strong-dark` first.

Someone mapping roles in a designer couldn't work out which is which.

**Themes remap roles.**
- The blog uses the same ramps but maps **accent to aqua**, the hue info already uses. That's the "blog accent/info clash" in the backlog.
- A theme is therefore two things: a set of ramps, and a role map choosing each role's hue. A theme designer has to edit both.

**HANDOVER's red 100/200 note is out of date.** `color.red.100` (`#fff1ee`) and `color.red.200` (`#ffd8d1`) now differ.

**The ramps are only ever referenced, never used directly.**
- No component references a Tier 1 colour directly.
- The only direct uses are a shadow story (`--color-purple-*`) and the avatar stories.
- Changing a value therefore flows through Tier 2 without touching component CSS.

**Downstream copies:**
- The Figma exporter writes the ramps as hex.
- The blog copies them into `library/theme/_tier1.scss`, which matches the library exactly.

## What the tool must do

1. **Generate each hue's ramp from a small description,** instead of hand-picked hex:
   - a hue angle;
   - a chroma curve, capped so every step stays in sRGB gamut (PRINCIPLES §5);
   - lightness targets per step.
2. **Check every Tier 2 pairing in light and dark,** and report failures:
   - text at 4.5:1;
   - large text and UI parts at 3:1;
   - APCA as a second opinion.
3. **Write the `color` block of `tokens/1-global.json`,** and keep the Figma export and the blog copy working.
4. **Work without a UI,** as functions plus a command. The Token Designer then calls the same functions.

## Questions

1. **Where does it live, and does the Token Designer start now?**
   - (a) A script in `packages/figma-sync/`.
   - (b) A **theme engine** package (`packages/theme-engine/`): pure functions, a command (`npm run build:palette`) and tests. The **Token Designer** becomes its own app (`packages/token-designer/`, a Vite page) in the next pass. Its first feature is a ramp editor on the engine. The docs site links to it and can show the engine's output, such as ramps and a pairing matrix, as static pages.
   - (c) Start the designer now, with the ramp editor inside it.
   - (d) A page in the docs site.

   *Recommended: (b).*
   - The engine fixes the failures without waiting on a UI.
   - The designer starts on a tested core instead of growing logic inside UI code.
   - A designer is an app with state, previews and file export, while the docs site is static documentation, so the designer gets its own package. It can still be deployed next to the docs.

2. **Source of truth.**
   - The ramps would be described in a theme file, `tokens/theme.json`, holding hues, chroma, lightness targets and later the role map.
   - The engine generates `1-global.json`'s `color` block from it. That block is then marked generated and never hand-edited.
   - The designer reads and writes the same file, so saving a theme is the build input.

   *Recommended: yes.*

3. **Step names.** Keep 100 to 900 for every hue, and 000 and 1000 for neutral. Renaming to 50 to 950 would break Tier 2, the blog and Figma for no gain. *Recommended: keep.*

4. **What a step means.**
   - (a) The same OKLCH lightness for every hue. Hues are then even to the eye, but WCAG contrast still varies: yellows read lighter than blues at the same lightness.
   - (b) **The same contrast for every hue.** Each step is defined by its contrast against the light canvas, and the engine solves the lightness per hue. For example: 700 reaches 4.5:1 on the canvas and on the 100 tint, and 300 reaches 4.5:1 on the dark canvas.

   *Recommended: (b).* The roles then hold their contrast whichever hue a theme maps to them, which is exactly what remapping accent to aqua needs.

5. **Keep each hue's character.**
   - The engine would take each hue's angle and peak chroma from today's 500 step, so purple stays this purple.
   - Amber is the one that changes: steps 600 to 800 will turn browner, because a yellow that passes 4.5:1 can't stay bright.

   *Recommended: yes, and review the amber steps by eye.*

6. **Hues.** Keep all eight. Blue is unused today, but a theme needs a spare hue, for example the blog's accent once info stops sharing aqua. *Recommended: keep.*

7. **What fails the build.**
   - WCAG 2 failures on gated pairings stop `build:palette` and `build:tokens`.
   - APCA is reported but never blocks.

   *Recommended: yes.*

8. **Which pairings are gated.**
   - Text roles on the canvas, card, muted surface and their own tint, at 4.5:1 in both modes.
   - Inverted text on strong surfaces, at 4.5:1.
   - At 3:1: control borders, and the future card-intent edge.
   - Status, banner and chip borders are reported only.

   *Recommended: yes.*

9. **The `-light` / `-dark` names in Tier 2.** This pass changes values only, so every Tier 2 name, the blog and Figma keep working. The names are renamed by mode (`-on-light` / `-on-dark`, or roles that state the mode) when the designer gains the role map. *Recommended: log now, rename with the role map.*

10. **Dark mode.**
    - One ramp per hue serves both modes, as today; dark mode uses the light steps.
    - The gate checks both modes.
    - Separate dark ramps would double the palette, and nothing measured here needs them.

    *Recommended: one ramp.*

11. **Output format.**
    - `$value` stays hex (sRGB), so Figma, Tokens Studio and the blog's Sass work unchanged.
    - The OKLCH source is kept in the theme file, and copied into each token's `$extensions`.

    *Recommended: yes.*

12. **The blog's accent/info clash.** The blog maps accent to aqua, which info already uses. Options:
    - move the blog's info to blue;
    - move the blog's accent to blue;
    - leave it.

    *Recommended: move the blog's info to blue.* Accent is the blog's brand colour, and info only needs to differ from it.

13. **Tests.** There is no test runner. The engine is pure functions, so use Node's built-in `node --test`, which adds no dependency. It covers the colour maths, the gamut cap and the contrast solver. *Recommended: yes.*

14. **The first visual check.** Until the designer exists, a Storybook page (Tokens / Colour) shows each ramp, the pairing matrix in light and dark, and each pairing's ratio. The designer later reuses its parts. *Recommended: yes.*

## Answers

You approved all the recommendations, with question 4 replaced by your ramp model.

**The ramp model (replaces 4 and refines 5):**

- **A ramp starts from a picked colour.** The engine takes the colour's hue and chroma and builds its 500 step. The picked colour's own lightness gives way to the curve's lightness at 500, and the designer shows the picked colour beside the 500 it produced.
- **One lightness curve shapes the ramp.** It runs from the lightest step (100) to the darkest (900), between two end lightnesses, and its shape is either:
  - straight (linear);
  - an S, gentle at the ends and steeper in the middle;
  - a reverse S, steeper at the ends and gentle in the middle.

  The shape is written as a CSS easing curve (`linear` or `cubic-bezier(x1, y1, x2, y2)`), which designers and developers already know. Presets cover the three shapes.
- **The curve is shared.** Each new hue starts from a picked 500 swatch and takes the same curve, so every hue has the same lightness at the same step.
- **Contrast limits the curve rather than defining the steps.** At equal OKLCH lightness, WCAG contrast differs by about 0.7 across hues: at lightness 52, 4.8:1 for green up to 5.5:1 for red, against today's spread of 4.5 to 6.8. So the gate turns into limits on the curve, such as "700 at or below lightness 52" and "300 high enough for dark mode". The engine reports which hue and pairing breaks a limit. A per-hue nudge is the fallback only if one hue still fails.
- **Chroma** peaks at the picked colour's chroma around 500 and tapers towards the ends. Each step is capped to stay in sRGB gamut.
- **Neutral** follows the same curve from 100 to 900. Its 000 and 1000 sit outside the curve as the light and dark canvases.

**Names:**
- Fixed: **neutral**, **red**, **amber** and **green**. Neutral gives the surfaces and text; red, amber and green give danger, warning and success.
- Every other hue is named by the user. The library's defaults stay aqua, blue, purple and olive.
- In the role map, accent, complementary and info can point at any hue.

**Order:**
1. **This pass:** the theme engine (`packages/theme-engine/`). It holds the colour maths, the curve, the ramp builder, the contrast gate, the `build:palette` command and `node --test` tests, and reads `tokens/theme.json`. It also adds the Tokens / Colour Storybook page, showing the ramps and the pairing matrix, with old against new for review. The generated ramps are written to `1-global.json` only after you've seen them.
2. **Next pass:** the Token Designer app (`packages/token-designer/`), whose first feature is the ramp editor.

## Progress

Built:
- `packages/theme-engine/`:
  - `src/color.js`: OKLCH maths, gamut mapping, WCAG 2 and APCA;
  - `src/curve.js`: CSS easing curves with presets (`linear`, `s`, `soft-s`, `reverse-s`, `ease-in`, `ease-out`);
  - `src/ramp.js`: the ramp builder, which enforces the fixed hue names;
  - `src/gate.js`: Tier 2 roles resolved per mode, and 144 pairings;
  - `src/tokens.js`: the DTCG `color` block, with OKLCH in `$extensions`;
  - `bin/build-palette.js`;
  - 18 `node --test` tests.
- `tokens/theme.json`: seeds from today's 500 steps. Neutral keeps its seed's chroma at every step, so it stays warm.
- Root scripts: `npm run build:palette` (add `-- --write` to write) and `npm run test:theme`.
- Storybook, Tokens / Colour:
  - **Ramps:** today against generated;
  - **Curve:** the shared curve over each hue's lightness today;
  - **Pairings:** every pairing today and generated.

  All three have a curve picker, and pass axe in light and dark.

**More failures than the audit counted.** The gate also checks hover and pressed text, and with them **19 gated pairings fail today**, not 9. The hover text step (600) is the worst: warning hover is 2.43:1, complementary 3.16, accent 3.47, success 3.52.

**Hover text sets the limit.** Hover text needs 4.5:1, which caps step 600 at lightness 53. Today's hues sit at 55 to 71 there, so every passing curve is darker than today from 600 down. Two candidates:

| Curve | Lightness 100 → 900 | Lowest gated pairing | Look |
| :--- | :--- | ---: | :--- |
| `soft-s` (in the theme now) | 97 93 84 74 62 50 40 31 27 | 5.16:1 | Darker 600 to 800; slack for new hues |
| `cubic-bezier(0.3, 0.05, 0.7, 0.85)` | 97 93 85 76 65 53 43 33 27 | 4.52:1 | Closest to today that passes; no slack |

The generated colours aren't written to `1-global.json` until a curve is chosen.

**Token Designer prototype** (`packages/token-designer/`, `npm run designer`, port 5180). It's a Vite page built from the library's own CSS on the theme engine. Its parts:
- **Lightness curve:** presets, a curve editor with two draggable handles, number fields for keyboard users, end lightness and colour kept at the ends.
- **Hues:**
  - a colour picker and hex field per hue, with the live ramp; the 500 step is outlined as the one built from the picked colour;
  - neutral, red, amber and green are marked required;
  - hues Tier 2 reads (aqua, purple, olive) show their roles and can't be removed until the role map exists;
  - added hues can be named freely and removed.
- **Contrast:** the gate's verdict live, in the header and as a table, showing failing and reported pairings, or every pairing.
- **Preview:** buttons, statuses, banners, links, text and progress in light and dark iframes, recoloured by overriding the `--color-*` variables.
- **Export:** copy, download, and Save to `tokens/theme.json`. Save only works on the local dev server. It writes the theme, never the generated colours: `build:palette -- --write` stays the step that changes tokens, behind the gate.
- Axe passes on the designer in light and dark.


**Layout, after the user's sketch.** The preview runs across the top (light and dark side by side) and can be hidden. Below it, the colour designer has two tabs:
- **Global colours (Tier 1):**
  - one row per ramp: a select box, its name (editable for added hues), the ramp as a strip with the picked step ringed, a hex field, a colour picker and an options menu;
  - **Select all**, **Full details** (a dialog with every step's hex, OKLCH, lightness and gamut) and **Add ramp** (a dialog);
  - **per-ramp settings:** with nothing selected, the curve, ends and chroma panel edits the shared settings. With ramps selected, it edits only those, which gives them their own settings (stored on the hue in `theme.json`, which the engine already reads). A bar shows the count, with **Use shared settings** and **Remove**. Neutral's warm ends are its own settings.
- **Semantic colours (Tier 2):** for now, the contrast table, with a warning on the tab when anything fails. Next: a row per role, a Tier 1 step chosen for light and for dark, and each pairing's ratio, red for a gated failure and amber for a reported one, with an icon and the number so colour isn't the only signal.

A sticky bar holds **Copy theme**, **Download**, **Reset** (discards unsaved changes, after confirming) and **Save**. **Publish**, which would write the tokens only when the gate passes, comes with the Semantic tab.

Decided with the user: the bridge colours (`surface-color.light`, `foreground-color.dark-muted` and the rest) go. Roles point at the palette directly, `light-dark({color.neutral.000}, {color.neutral.1000})`. No library component reads the bridges. The blog does (`_tier2.scss`, `_tier3.scss`, `_color-palette.scss`, `_index-card.scss`), and the Figma exporter's light and dark modes need checking first.

**Semantic tab and roles (done).**
- **Roles live in the theme.** `theme.json` has `roles`: each of the 53 Tier 2 colour roles names a palette colour for light and one for dark (`"foreground.default": { "light": "neutral.800", "dark": "neutral.000" }`; `white` and `black` are allowed). The engine's `applyRoles` writes them into `2-semantic.json` as `light-dark({color.neutral.800}, {color.neutral.000})`, or as one reference when both modes match. The gate (`check({ …, roles })`) measures the theme's roles, not the file's.
- **Bridges removed.** `surface-color`, `foreground-color` and the intent `border-color` groups are gone (about 80 tokens). A migration checked that every role resolves to the same colour in both modes before and after. `surface.layer` and `surface.shade` now mix `{color.white}`, `{color.black}` and `{color.neutral.1000}` directly.
- **Inverted palette generated.** `compile-tokens.js` builds the `.color-palette-inverted` block by swapping each surface, foreground and border role's `light-dark()` branches. This replaces its hand-written map and the 120 hand-written lines in `utilities/color-palette.css`, which keeps only the flag and the two translucent surfaces. The 43 entries the old list had come out the same. It now also inverts the info roles and `surface.shade`, which the old list missed, along with three Tier 3 tokens that read them (`batch-actions-bg`, `stepper-indicator-bg`, `telemetry-bg`).
- **Figma:** the native Variables export is unchanged. Tokens Studio's semantic sets now alias roles straight to the palette.
- **Semantic tab:**
  - one table per group (Surface, Foreground, Border), each with a row per role and a Light mode and Dark mode column;
  - each cell shows the chosen colour and a tile for every pairing the gate checks in that mode;
  - a tile is a button: a tooltip (`interestfor`) names the surface and gives the ratio, and selecting the tile opens the picker for its cell. Each list is one tab stop, with arrow keys, Home and End between tiles. Tooltips show only in Chromium, so a tile's accessible name carries the same text, and a failing or reported tile shows its icon and ratio on the tile itself;
  - a gated failure has a solid outline and an error icon; a reported one has a dashed outline and a warning icon;
  - the colour in each cell is the button that changes it (its name starts with the visible colour name, WCAG 2.5.3). It opens one shared picker: every palette colour as one radio group, ramps as rows and steps as columns. Each swatch is marked with the verdict it would get in that cell: struck through if it fails a gated pairing, a dot if it falls below a reported one. The marks are drawn in black and white, and each radio's name gives the verdict in words ("accent 400, fails on card"). Choosing a colour applies it at once, and the picker stays open so you can compare;
  - **Only problems** hides the rows that pass;
  - roles the gate doesn't check say so.
- **Ramps and roles:** any ramp except the four the intents need (neutral, red, amber, green) can be renamed or removed. Renaming a ramp updates the roles that use it. Removing one that roles use opens a dialog: choose a ramp to take over its roles at the same step (`purple.700` becomes `blue.700`), with the nearest hue suggested and a status saying whether every pairing would still pass. Ramps no role uses are removed straight away. Why a ramp matters sits in a small button after its name: a warning icon for a required ramp, an info icon for one that roles use. Hovering it (Chromium, `interestfor`) or selecting it (every browser, `popovertarget`) opens a popover with the reason and the roles; the button's name says it too ("purple is used by 7 roles"), so it's never tooltip-only. A ramp with its own curve has no label: the curve panel names the ramps that share the settings, the ramp's menu offers "Use shared settings", and Full details says "its own curve". Strips show every step a ramp has across the full width, so neutral's (with 000 and 1000) has 11 and the others 9.
- **Neutral 000 and 1000 follow the ends.** They were fixed lightnesses in the theme (0.97 and 0.28), so the Max lightness and Max darkness sliders didn't move them, and with today's ends 000 matched 100 and 1000 was lighter than 900. `outside` now says how far beyond the ends they sit: 000 is 0.02 lighter than 100 and 1000 is 0.04 darker than 900, kept within 0 and 1. With the current ends that makes 000 `#fcfcfc` (L 99) and 1000 `#1d1d1d` (L 23); every gated pairing still passes. The 000 step also takes the light end's chroma share now (it was taking the dark end's).
- **White and black are in the theme.** `theme.json` has `fixed: { white, black }` (black stays the warm `#181716`). The engine's `withFixed` puts them in place of `1-global.json`'s for the gate and the token output, so `build:palette -- --write` and Publish write them. The Global tab lists them under the ramps, in the same columns, with a hex field and a colour picker each; they're required, as Tier 2 mixes them into the translucent surfaces.
- **Fine-pointer targets.** The designer is a desk tool, so on a mouse or trackpad (`@media (pointer: fine)`) it sets the library's opt-in, `--spacing-target-min: var(--spacing-target-sm)`: small controls such as the sliders take 32px targets instead of 48px. Touch screens keep 48px. The library itself is unchanged (PRINCIPLES §2). Slider hints use `field__hint`.
- **Exact 500 (opt-in, per ramp).** A ramp's options menu has "Use {hex} as 500", which sets the hue's `exact: true` in `theme.json`: the 500 is then the picked hex itself, and the ramp's curve bends through the picked lightness at 500. Each half keeps the curve's shape, scaled to meet it, so 100 and 900 stay where the ends put them and the steps between lead to the picked colour (a pick beyond the ends is held just inside them). Choosing it selects the ramp, so the curve panel shows the bent curve (solid), the shape the handles edit (dashed) and the picked point, and says the picked lightness and chroma. The menu item then reads "Let the curve set 500", which turns it off. It isn't one of a ramp's own curve settings, so "Use shared settings" leaves it alone. Off by default, so ramps stay even; the gate still checks the steps it moves (purple's picked `#ad77e1` lightens its 600, and accent text on the accent surface drops to 4.33:1).
- **Warning contrast: resolved.** With the generated palette, every gated pairing passes, warning included (`foreground.warning` is amber.600 in light). Axe on the 100 colour-sensitive stories (status, badge, chip, text colours, banner, toast, card, telemetry, range, the Cadence and Tally & Sprout recipes), light and dark, leaves only the two non-palette failures already in the backlog: the disabled field hint and the range output (light). The preview applies the roles as well as the ramps.
- **Footer:** copy, download, reset and save are in the page's `<footer class="footer">` (the contentinfo landmark, after `<main>` in the `.app` shell), sticky at the bottom.
- **Layout:** from 48rem wide and 36rem tall the shell is `.app--viewport`: the preview takes the top half of the main and the designer the bottom half, each scrolling on its own, and the designer takes the whole height while the preview is hidden. The designer's bar (title, tabs, preview toggle) sticks to the top of its half. Smaller screens scroll as a page, with the bar under the header. On a phone the preview's light and dark frames are a swipeable pair, the title shortens to "Theme Designer", the gate reads "120 pass" (the full text stays for screen readers), and Publish, the preview toggle, Copy and Download become icon buttons (`max-sm:hide-labels`). The Global and Semantic tabs carry icons (Grid, LightDark) and collapse to them there too.
- **One preview at a time:** a single frame, light or dark. A small round button floats in the preview's top end corner and says what it does: the moon and "Switch to dark mode" in light, the sun and "Switch to light mode" in dark (its name and tooltip change together, so it isn't also `aria-pressed`); it starts in the system's scheme. Switching changes the frame's `color-scheme-*` class in place, with no reload. From 64rem wide and 36rem tall the preview (2fr) and the designer (3fr) sit side by side, the designer on the right; from 48rem they're stacked, preview on top.
- **Preview or editor on small screens:** below 48rem wide or 36rem tall there's room for one or the other. The preview starts hidden; showing it fills the space above the bar, which moves to the bottom of the screen, and hides the tabs and the panels below. The bar's move is a view transition (`view-transition-name: designer-bar`), skipped with reduced motion. The header's height is measured, so the sticky bar sits right under it.
- **Global tab columns:** a `split split--end` gives the ramps the room left by the curve tools (46rem). The tools are a `grid grid--3-col` of equal columns at least 14rem wide: the curve, the control points, and lightness and chroma. Below about 84rem the tools move under the ramps and spread across the width, and the grid drops to fewer columns as room runs out.
- **Publish** (header, dev only) is disabled while anything fails. After confirming, it saves the theme, writes `1-global.json` (ramps) and `2-semantic.json` (roles), then runs `build:tokens` and `export:figma`. The server checks the gate again before writing anything. `build:palette -- --write` now writes the roles too.
- 24 theme engine tests pass. Axe passes on both tabs, the picker, the menu and the dialogs, in light and dark.
