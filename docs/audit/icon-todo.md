# Icon TODO

What the sprite (`icons/icons.svg`, 104 symbols) still needs, and the icon fixes left over from other passes. The icon pass is in `audit/icon.md`. Update a row when its glyph is drawn: add the symbol, run `npm run sync:icons`, then swap the stand-in back.

Checked on 30 October 2026: one story referenced a symbol that isn't in the sprite (`ChartBar` in the tabs story, now `BarChart`). Otherwise no story, docs page, designer view or blog template does, so nothing renders blank. Every row below is a wish, not a break.

## Glyphs to draw

All in the sprite's one family: 24px grid, the same stroke weight, `currentColor` (PRINCIPLES §6).

| Glyph | Wanted for | Use until drawn | Status |
| :--- | :--- | :--- | :--- |
| Calendar | Cadence's icon rail (schedule); date fields, events | `List` | To draw |
| Folder | Cadence's icon rail (library); file trees, collections | `Grid` | To draw |
| Refresh | Reload, retry and sync actions | None (the passes dropped the icon) | To draw |
| Sparkle | "New" and generated content | `Star` | To draw |
| TrendUp, TrendDown | Telemetry trends | `ArrowUpRight`, `ArrowDownRight` | To draw; the arrows read fine, so low priority |
| Save | Save actions (the inline icons were dropped in the icon pass) | Text only | To draw |
| Layers | Layer panels, stacking | None | To draw |
| Server | Status pages, infrastructure telemetry | None | To draw |
| Target | Goals, focus | None | To draw |
| CheckSquare | Task lists, "select all" | `Check` | To draw |
| Sidebar | Show or hide a sidebar or drawer | `Navigation` | To draw |
| Type | Typography settings (wanted by the Typography tool) | None | To draw |
| AlignStart, AlignCenter, AlignEnd | Text alignment in editors. Draw them logical (start and end, mirrored in right to left), not left and right | None | To draw |
| Box | Packages, products | None | To draw |
| Compass | Explore, discover | None | To draw |
| FileText | Documents | None | To draw |
| Rocket | Launch, onboarding | None | To draw |

Calendar and Folder are in use with a stand-in today, so draw those first. The rest use the nearest glyph or go without.

## Fixes

| Item | Where | What to do | Status |
| :--- | :--- | :--- | :--- |
| Tab icons are scaled with `scale` | `atoms/tab.css` | Now sized with `--icon-size` (`--_tab-icon-size`, 1.25× in icon-only tabs), so `.icon--dir` mirrors them | Done |
| Docs site icon component | `packages/docs/src/components/Icon.astro` | Still emits `icon--xs`, `--md`, `--xl`, `--2xl`, removed in the icon pass. Move to `--icon-size` and `.icon--sm` / `--lg`, with the docs-site work | Open |
| Empty state icon scaled with `scale` | `molecules/empty-state.css` | Done in the empty state pass (the icon sits in an `.icon-box`) | Done |

## Decisions

- **Blog accent and info are the same hue** (aqua). Decided 30 October 2026: keep it. The blog rarely uses info, and the intents never rely on colour alone.
