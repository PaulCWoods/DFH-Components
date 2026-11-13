# Icon names: Lucide

The renames made on 13 November 2026, checked against Lucide 1.72.0 (`lucide-static`). The sprite keeps each old name for one minor version as a `data-deprecated` symbol pointing at its new one; the Icon story leaves those out.

## Rules

1. An icon drawn from a Lucide icon takes that icon's name, as Lucide 1.72.0 spells it. We rename only when we choose to, not when Lucide does.
2. Kebab-case, as Lucide writes it.
3. A filled icon is its outline name with `-filled` on the end.
4. A brand is `brand-` and its name in kebab-case (`brand-github`, `brand-google-pay`). Our own brands follow the same rule.
5. An icon with no Lucide twin takes a name in the same style, and is marked **own** below.
6. Direction is Lucide's: `left` and `right`. An icon that should turn round in right-to-left text takes `.icon--dir`, as `chevron-left` does today. The library's `start` and `end` names go.

## Decided

- **The chevrons were swapped as they were renamed:** `chevron-first` is `|<` and `chevron-last` `>|`, as in Lucide. The old `ChevronStart` was drawn `>|`, so Cadence's "Back to start" now shows the right one.
- **`play` is a new outline;** the old filled one is `play-filled`.
- **`LightDark` became `contrast`,** drawn as before (an outline circle split by a line).
- **One drawing of each brand duplicate was kept:** `BrandDropbox` and `BrandMastercard`.
- **`rows-2`, `columns-3` and `grid-3x3` keep their old drawings.** The 13 November export lost their frames (and the grid's lines ran past the edge).
- **`brand-gardens-eden` keeps its old drawing,** on its own 120 × 120 grid. It wasn't in the export.
- **Lucide 1.x renamed many icons** (`bold` became `letter-b`, `music` `eighth-notes`, `triangle-alert` `triangle-exclamation-point`, `trash-2` `trash`). These are 1.x names, so older Lucide docs and blog posts show some old ones.

## Fix in the IcoMoon project

The export spelt four names differently; the sprite corrects them. Rename them in IcoMoon so the next export matches:

- `circle-examination-point-filled` → `circle-exclamation-point` (it is the outline)
- `chevrond-left-right` → `chevrons-left-right`
- `square-checked` → `square-check`
- `square-checked-filled` → `square-check-filled`

And add `brand-gardens-eden`, and redraw or re-export `rows-2`, `columns-3` and `grid-3x3` with their frames.

## Icons

| Old | New | Note |
| :--- | :--- | :--- |
| AlignCenter | text-align-center | |
| AlignEnd | text-align-end | |
| AlignStart | text-align-start | |
| Archive | archive | |
| ArrowBottom | arrow-down-to-line | |
| ArrowDown | arrow-down | |
| ArrowDownLeft | arrow-down-left | |
| ArrowDownRight | arrow-down-right | |
| ArrowEnd | arrow-right-to-line | `.icon--dir` |
| ArrowLeft | arrow-left | |
| ArrowRight | arrow-right | |
| ArrowStart | arrow-left-to-line | `.icon--dir` |
| ArrowTop | arrow-up-to-line | |
| ArrowUp | arrow-up | |
| ArrowUpLeft | arrow-up-left | |
| ArrowUpRight | arrow-up-right | |
| BarChart | chart-no-axes-column-increasing | |
| Bell | bell | |
| BellFilled | bell-filled | |
| Bold | letter-b | Lucide 1.x name |
| Bookmark | bookmark | |
| BookmarkFilled | bookmark-filled | |
| Box | box | |
| Brain | brain | |
| BrainCog | brain-cog | |
| Calendar | calendar | |
| Cart | shopping-cart | |
| Check | check | |
| ChevronDown | chevron-down | |
| ChevronEnd | chevron-last | Drawings swapped |
| ChevronLeft | chevron-left | |
| ChevronRight | chevron-right | |
| ChevronsLeftRight | chevrons-left-right | |
| ChevronStart | chevron-first | Drawings swapped |
| ChevronsUpDown | chevrons-up-down | |
| ChevronUp | chevron-up | |
| Circle | circle | |
| CircleFilled | circle-filled | |
| Clip | paperclip | |
| Clipboard | clipboard | |
| Clock | clock | |
| Close | x | |
| Code | code-xml | Lucide's `code` has no slash |
| Columns | columns-3 | |
| Compass | compass | |
| Contract | minimize-2 | |
| Copy | copy | |
| Cut | scissors | |
| Delete | trash | Lucide 1.x name |
| Disc | disc | |
| Download | download | |
| Duplicate | copy-plus | |
| Edit | square-pen | |
| Email | mail | |
| Error | circle-exclamation-point | Lucide 1.x name |
| ErrorFilled | circle-exclamation-point-filled | |
| Expand | maximize-2 | |
| External | external-link | |
| FileText | file-text | |
| Filter | funnel | |
| Folder | folder | |
| Globe | globe | |
| Grid | grid-3x3 | |
| Hand | hand | |
| Hearing | ear | |
| Help | circle-question-mark | |
| Hide | eye-off | |
| Home | house | |
| Info | info | |
| Italic | italic | |
| Layers | layers | |
| Light | sun | |
| LightDark | contrast | |
| Link | link | |
| List | list | |
| LoaderArc | loader-circle | |
| Lock | lock | |
| Maximise | maximize | |
| Minimise | minimize | |
| Minus | minus | |
| Moon | moon | |
| More | ellipsis | |
| Music | eighth-notes | Lucide 1.x name |
| Muted | volume-x | |
| Navigation | menu | Lucide's `navigation` is an arrow |
| PanelLeft | panel-left | |
| PanelLeftClose | panel-left-close | |
| PanelLeftOpen | panel-left-open | |
| PanelRight | panel-right | |
| PanelRightClose | panel-right-close | |
| PanelRightOpen | panel-right-open | |
| Pause | pause | |
| PauseFilled | pause-filled | |
| Person | person-standing | |
| Play | play-filled | |
| Plus | plus | |
| Point | pointer | |
| Printer | printer | |
| Progress | circle-dashed-check | |
| Question | question-mark | |
| Quote | quote | |
| QuoteFilled | quote-filled | |
| Radio | radio | |
| Redo | redo-2 | |
| Refresh | rotate-ccw | |
| Rocket | rocket | |
| Rows | rows-2 | |
| Save | save | |
| Search | search | |
| Server | server | |
| Settings | cog | Ours has spokes, like `cog`; Lucide's `settings` is the rounded gear |
| Share | share-2 | |
| Shield | shield | |
| Sortable | arrow-down-up | |
| SortableHorizontal | arrow-right-left | |
| Sparkle | sparkle | |
| Sparkles | sparkles | |
| Square | square | |
| SquareChecked | square-check | |
| SquareCheckedFilled | square-check-filled | |
| SquareFilled | square-filled | |
| Star | star | |
| StarFilled | star-filled | |
| Target | target | |
| Text | square-text | |
| TrendDown | trending-down | |
| TrendUp | trending-up | |
| Type | type | |
| Underline | underline | |
| Undo | undo-2 | |
| Unlock | lock-open | |
| Upload | upload | |
| User | user | |
| View | eye | |
| VolumeLow | volume-1 | |
| VolumeOff | volume | Speaker with no waves |
| VolumeOn | volume-2 | |
| Warning | triangle-exclamation-point | Lucide 1.x name |
| WarningFilled | triangle-exclamation-point-filled | |

## Brands

| Old | New | Note |
| :--- | :--- | :--- |
| BrandApple | brand-apple | |
| BrandApplePay | brand-apple-pay | |
| BrandBluesky | brand-bluesky | |
| BrandDesignForHumans | brand-design-for-humans | **own** |
| BrandDiscord | brand-discord | |
| BrandDropbox, BrandDropBox | brand-dropbox | Keep one drawing |
| BrandFacebook | brand-facebook | |
| BrandFigma | brand-figma | |
| BrandGardensEden | brand-gardens-eden | **own** |
| BrandGitHub | brand-github | |
| BrandGoogle | brand-google | |
| BrandGooglePay | brand-google-pay | |
| BrandInstagram | brand-instagram | |
| BrandLinkedIn | brand-linkedin | |
| BrandMastercard, BrandMasterCard | brand-mastercard | Keep one drawing |
| BrandMedium | brand-medium | |
| BrandNotion | brand-notion | |
| BrandPayPal | brand-paypal | |
| BrandReddit | brand-reddit | |
| BrandShopify | brand-shopify | |
| BrandStripe | brand-stripe | |
| BrandTelegram | brand-telegram | |
| BrandTikTok | brand-tiktok | |
| BrandVisa | brand-visa | |
| BrandWhatsApp | brand-whatsapp | |
| BrandX | brand-x | |
| BrandYouTube | brand-youtube | |
