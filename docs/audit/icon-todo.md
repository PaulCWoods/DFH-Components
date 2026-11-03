# Icon TODO

What the sprite (`icons/icons.svg`, 134 symbols) still needs. The icon pass is in `audit/icon.md`. Add a symbol, run `npm run sync:icons`, then swap any stand-in for it.

Checked on 3 November 2026: every symbol a story, docs page, designer view, blog template or course template references is in the sprite, so nothing renders blank.

## Glyphs to draw

All in the sprite's one family: 24px grid, the same stroke weight, `currentColor` (PRINCIPLES §6).

Nothing outstanding.

## Drawn on 3 November 2026

Filter, Calendar, Folder, Refresh, Sparkle, TrendUp, TrendDown, Save, Layers, Server, Target, CheckSquare, CheckSquareChecked, the six Panel glyphs (for the Sidebar row), Text (for the Type row), AlignStart, AlignCenter, AlignEnd, Box, Compass, FileText, Rocket, Clock, Hide and BrandGardensEden. Underline, Italic, Email, Bookmark and Bold were redrawn.

Swapped in:
- Calendar and Folder in Cadence's icon rail, replacing `List` and `Grid`.
- TrendUp for the rising trends in the Telemetry docs and stories and the Real World inventory, replacing `ArrowUp`.
- Refresh on the retry and reload actions: the Toast and Banner Dock docs and stories, and Cadence's stalled-stream banner.

The rest have no use yet. Filter is for a button that opens filters in a drawer; the filter sidebar recipe has none, since its filters stack above the results on a narrow screen. Save stays off Save buttons: a text label says it, and an icon on every Save adds noise.

## Notes for use

- **Direction:** AlignStart and AlignEnd are logical, and the Panel glyphs are drawn for left to right. Give them `.icon--dir` so they mirror in right to left. Leave the trends unmirrored: a chart's time axis runs left to right in both.
- **Export names:** the 3 November export shifted every id from `BarChart` to `ArrowDownLeft` down by one, so each arrow carried the next one's name, `ArrowDownLeft` disappeared and the bar chart arrived as `BarChart_1`. It was fixed by hand, and the next export (which added Filter) shifted them again, so the fault is in the source file, probably a layer name off by one. After an export, check that every existing name still draws its old glyph.

## Decisions

- **Blog accent and info are the same hue** (aqua). Decided 30 October 2026: keep it. The blog rarely uses info, and the intents never rely on colour alone.
