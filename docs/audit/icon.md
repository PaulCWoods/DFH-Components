# Icon and icon-box: usage inventory

Counts cover Storybook stories, the docs site and AGENTS.md ("library"), and the blog templates ("blog"). The CSS is `packages/css/src/atoms/icon.css` (254 lines). There are no Tier 3 icon tokens.

## Definitions

- **Icon** (`.icon`): an inline SVG glyph from the sprite, sized in `em` so it follows the text around it. It takes its colour from the text (`currentColor`).
- **Icon box** (`.icon-box`): a fixed square frame around an icon, used where an icon needs to line up with controls (mostly banners).

## The sprite

- `icons/icons.svg` has 103 symbols, all filled with `currentColor` and no strokes. Of those, 99 use a 120×120 grid, 3 use 24×24 and 1 uses 82.5×82.5. It is one family, as PRINCIPLES §6 asks.
- `ArrowStart`, `ArrowEnd`, `ChevronStart` and `ChevronEnd` are different glyphs from `ArrowLeft` and similar (for example, chevron with a bar). They are not logical-direction duplicates.

## Totals

| | Library | Blog |
| :--- | ---: | ---: |
| `svg.icon` elements | 770 | 272 |
| … with a `width` attribute | 333 | 193 |
| … drawn inline with `stroke=` (not the sprite family) | 69 | 0 |
| … with no `aria-hidden` | 194 | 11 |
| `.icon-box` | 30 | 15 |

### Modifiers in use

| Class | Library | Blog | Notes |
| :--- | ---: | ---: | :--- |
| `icon--xs` | 1 | 1 | |
| `icon--sm` | 1 | 1 | |
| `icon--md` | 0 | 0 | Same as default (1em) |
| `icon--lg` | 10 | 11 | |
| `icon--xl` | 1 | 1 | |
| `icon--2xl` | 3 | 1 | |
| `icon--scale-sm`, `-lg`, `-xl` | 0 | 0 | Second size vocabulary. Scales with `scale`, which does not change the layout box, so a scaled icon overlaps its neighbours. |
| `icon--accent`, `--success`, `--warning`, `--danger`, `--muted` | 1 each | 1–2 each | Only in the icon story and the blog overview. Each sets `fill`, not `color`. |
| `icon--destructive` | 0 | 0 | Alias of `--danger` |
| `icon--dir` | 43 | 24 | Mirror in RTL |
| `dir` (bare alias) | 13 | 4 | Same as `icon--dir` |
| `icon--disclosure` | 1 | 0 | Rotates on `aria-expanded`. Has no reduced-motion handling. |
| `icon-box` | 30 | 15 | banner 15, alert 4, icon story 5, command palette 3, app header 2, text 1 |
| `icon-box--sm` | 1 | 2 | |
| `icon-box--round` | 0 | 1 | |
| `icon-box--surface` | 0 | 3 | |
| `icon-boxes-sm`, `-lg`, `-compact`, `-regular`, `icon-box-compact`, `icon-box-lg` | 0 | 0 | Group and alias classes nothing uses |

The classes most often paired with `.icon` are component hooks (`telemetry__icon` 24, `block-link__arrow` 13, `combobox__*` 11, `icon--on/off/check` 16) and text colour utilities (`text-color-muted`, `text-accent` and similar, 24 in all).

## Problems found

1. **Two size vocabularies.** `--xs … --2xl` set the size; `--scale-*` set a transform that does not reserve space. The size modifiers are also declared twice (nested in `.icon`, then again standalone). They point at `--icon-size-*` tokens that do not exist.
2. **Intent sets `fill`, not `color`.** Inline icons drawn with `stroke="currentColor"` ignore the intent. Colour should flow through `color` so `currentColor` covers fill and stroke alike.
3. **Literal hex fallbacks.** The stale aqua `#008076`, plus `#00875a`, `#b06000` and `#d32f2f`, which PRINCIPLES §5 forbids.
4. **Unused colour hook.** `--icon-color` is set 11 times by banner, but `.icon` never reads it; banner colours its icons itself.
5. **RTL relies on the `[dir="rtl"]` attribute.** `:dir(rtl)` would also follow `dir="auto"` and inherited direction. Badge already uses `:dir()`.
6. **Missing glyphs render blank.** 21 ids referenced in the library and 5 in the blog are not in the sprite:
   - Library: Alert, AlignCenter, AlignLeft, AlignRight, Box, Calendar (4), Compass, FileText, Folder (3), Layers (2), Menu (2), MoreVertical, Pointer, Refresh, Rocket, Sliders (2), Sparkle (2), Split, Telemetry, TrendUp, Type.
   - Blog: ChevronDownLeft, ChevronDownRight, ChevronUpLeft, ChevronUpRight, Cognition.
7. **Off-family inline SVGs.** 69 stroke-drawn icons in the stories don't belong to the sprite family (PRINCIPLES §6: one family, one stroke weight).
8. **194 library icons without `aria-hidden`.** Most sit inside a labelled control, so they are decorative and should be hidden. Axe doesn't flag this, because an SVG with no role is usually ignored, but screen readers can still announce some of them.
9. **`width` attributes disagree with the CSS.** Values are 20, 16, 18, 24, 22, 32 and 14 in the library, and mostly 32 in the blog. The CSS overrides them, so they only show when CSS fails, and then at assorted sizes.
10. **The icon-box is coupled to button.** It sizes from button tokens and reacts to `.buttons-sm`. It reads legacy `--ui-density: dense`. It uses `--icon-box-size` both as a flag (`sm`, `regular`) and as a length, so a flag value ends up inside `block-size: var(--icon-box-size, …)` and the declaration is invalid. It also has six group and alias classes with no users.
11. **No reduced-motion handling** on the `--disclosure` rotation.

## Questions

1. **Size scale.** Keep one `em` scale on the shared Size axis: default (1em), `--sm` and `--lg`. Remove `--xs`, `--md`, `--xl`, `--2xl` and all `--scale-*`. Larger glyphs, such as empty-state visuals, set `--icon-size` or the font size of their container instead. The 5 current `--xs`, `--xl` and `--2xl` uses would move to `--icon-size`.
2. **Colour.** Keep intent modifiers (`--accent`, `--danger`, `--warning`, `--success`, `--info`) setting `color`. Remove `--destructive`, and remove `--muted` in favour of the text colour utilities already in use. Add a public `--icon-color` hook so banner's existing variable starts working.
3. **Icon-box.** Keep it as icon's companion with its own tokens and the shared axes:
   - Size: `--sm`, `--lg`.
   - Prominence: plain by default, `--subtle` replacing `--surface`.
   - Corners: `--round`.
   - Compact via `--ui-sizing`.

   Remove the button coupling and the unused group and alias classes.
4. **Direction.** Remove the bare `.dir` alias and keep `.icon--dir`. Mirror with `:dir(rtl)`.
5. **Accessibility.** Add `aria-hidden="true" focusable="false"` to every decorative icon by script. Any icon that is the only content of an element without an accessible name gets listed for a hand fix (`role="img"` plus a label, or a label on its control).
6. **Missing and off-family glyphs.** Swap to an existing sprite glyph where one fits (Alert→Warning, MoreVertical→More, Menu→Navigation, Refresh→?, and so on). List the rest as glyphs to draw. Inline stroke icons move to sprite references where a glyph exists.
7. **`width` attributes.** Normalise every icon to `width="1em" height="1em"`, which SVG accepts. With CSS failing, icons then still match the text, and the markup no longer suggests sizes that the CSS ignores.
8. **Tokens.** Add Tier 3 `icon.size-sm` and `icon.size-lg` in `em`, plus `icon-box.*` sizes. To check during the pass: whether the Figma exporter handles `em` values.

## Migration done

All eight questions were approved. The info intent (aqua) was added in the same pass.

### CSS and tokens

- `icon.css` rewritten (254 → 187 lines). Size: `1em`, `--sm`, `--lg`, or any length via `--icon-size`. Intent: `--accent`, `--info`, `--danger`, `--warning`, `--success`, each setting `color`. `--dir` mirrors with `:dir(rtl)`. `--disclosure` has a reduced-motion fallback.
- Removed: `--xs`, `--md`, `--xl`, `--2xl`, `--scale-*`, `--muted`, `--destructive`, bare `.dir`, `--icon-scale`, all literal hex fallbacks.
- Icon box: own tokens, `--sm` / `--lg`, `--subtle` (replaces `--surface`), `--round`; flags `--icon-box-size`, `--icon-box-prominence`, `--icon-box-corners`; a compact container steps it to `--sm`. Button coupling and the six group and alias classes are gone. Banner now sets `--icon-box-size: sm` instead of `--icon-box-density: compact`.
- Tier 3: `icon.size-sm` (0.875em), `icon.size-lg` (1.25em), `icon-box.min-size`, `sm-min-size`, `lg-min-size`, `radius`. The length tokens are named `*-min-size` so they don't clash with the `--icon-box-size` flag. The Figma exporter converts `em` like `rem` (×16).
- `--icon-color` is **not** read by `.icon`. It inherits, so a banner's icon colour would reach icons inside its buttons. Banner keeps colouring its own direct-child icons.

### Markup

| | Library | Blog |
| :--- | ---: | ---: |
| `svg.icon` elements | 737 | 273 |
| … with `width="1em" height="1em"` | 737 | 273 |
| … with no `aria-hidden`, `aria-label` or `role="img"` | 0 | 0 |
| … drawn inline with `stroke=` | 6 | 0 |
| `.icon-box` | 28 | 15 |

- `icon--xs`, `--xl`, `--2xl` became `style="--icon-size: …"`. `icon--muted` became `.text-color-muted`; `icon--destructive` became `--danger`; `icon-box--surface` became `--subtle`.
- Width attributes are `1em` rather than unitless: a unitless value is pixels and can't follow the text when CSS fails; SVG 2 accepts `1em`.
- Inline stroke icons with a sprite equivalent now use `<use href>`.

### Glyph mapping

Alert→Warning, Menu→Navigation, MoreVertical→More, Sliders→Settings, Sparkle→Star, TrendUp→ArrowUpRight, Telemetry→ChartBar, Split→Columns, Pointer→Point, Cognition→Neurology, ChevronDownLeft/DownRight/UpLeft/UpRight→CornerBottomLeft/BottomRight/TopLeft/TopRight.

### Glyphs to draw

Still referenced but missing from the sprite (render blank): AlignCenter, AlignLeft, AlignRight, Box, Calendar (4 uses), Compass, FileText, Folder (3), Layers (2), Refresh, Rocket, Type.

Still drawn inline with strokes, waiting for a sprite glyph: Save (2), Layers, Server, Target, CheckSquare, Sidebar.

### Left for other passes

- **Tab** sets `scale: var(--_tab-icon-scale)` on its icons, which overrides the icon's RTL mirror inside tabs. Fix in the tab pass (size with `--icon-size` instead).
- **Empty state** also scales its icon with `scale`. Same fix in its pass.
- **Blog accent is aqua** (`--foreground-color-accent-dark` is aqua-700), the same hue now used for info. In the blog the two intents look the same; needs a decision.
