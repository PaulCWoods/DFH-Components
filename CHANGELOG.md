# Changelog

What changed in each published version of the library (`dfh-components.css`, the theme stylesheets and the shared skills), newest first. Sites link a version from `components.designforhumans.blog/css/<version>/`; a published version never changes.

Each entry lists what a site using the library would notice: new components and options, changed behaviour, and anything removed or renamed (with what to use instead).

The version number says how much checking an upgrade needs. What it covers is everything a site writes or links: class names and the markup each component expects, tokens (the custom properties), icon names, the theme file format, the published file paths and the shared skills' names.

- **A patch (1.3.2)** fixes something, or corrects a value in a theme. Upgrading never needs a change to your markup or CSS.
- **A minor version (1.4.0)** adds: new components, options, tokens, icons and utilities. It may change how a default looks, but your markup stays valid. A name that's replaced keeps working until the next major version, and the entry says what to use instead.
- **A major version (2.0.0)** can need work when you upgrade: a class, token, icon or option removed or renamed with nothing left in its place, markup that must change, a new theme file format, or new file paths. It removes the names the minor versions replaced.

Planned work is in the [roadmap](https://github.com/PaulCWoods/DFH-Components/blob/main/docs/ROADMAP.md).

## Unreleased

### Added
- **Columns:** `.columns` sets a long list in newspaper columns, running down one and on into the next: a glossary, an index, a site map. As many columns fit as there's room for at the minimum width (16rem by default; `--2xs`, `--sm` and `--md` change it, from the Grid's block steps), down to one on a phone, with no breakpoints. `--2-col` … `--4-col` set a maximum (and `@xs:` … `@7xl:` from a container size, as on the Grid), `--ruled` draws a rule between columns, and each item stays whole in one column unless you add `--flow`. Hooks: `--gap`, `--columns-width`, `--columns-count`.
- **Brand Logo:** `.brand__logo`, a full logo (an `<img>` or `<svg>`) beside the Name or on its own, as tall as `--brand-mark-size`. Beside a Logo the Mark is hidden, and in a container 20em wide or less (a phone, a Sidebar rail) it stands in for the Logo.
- **A Mark on its own is a Button's size:** with no Name or Logo beside it, or where it stands alone in a narrow container, the Mark is as big as a Button: 48px, or 32px in a compact container, where Buttons step down too. The new `--brand-mark-alone-size` and `--brand-compact-mark-alone-size` set it. A Brand that was a Mark alone grows from 24px (32px when compact).
- **A Brand follows `hide-labels`:** `hide-labels` or a condition's (`max-md:hide-labels`), on the Brand or a region around it, shows the Mark alone at a Button's size, as Buttons show only their icons.
- **Light and dark images:** `dark:hide` and `light:hide` show the right version of an image in two versions (a Brand's Logo or Mark, a screenshot), following a dark band and an inverted palette as well as the page's scheme. `--color-scheme` mirrors the scheme for them; set it beside `color-scheme` if you set that yourself.
- **Bar:** `.bar` lays out one row in three zones, a start, a centre and an end, with the centre in the middle of the row whatever the ends hold: a Dialog's header (Back, the title, Close), a media player, a wizard's footer, an app header with search in the middle. Short of room the ends keep their width, the centre moves off-centre only as far as it must and then wraps, and nothing overlaps. Put it on a `card__header` or a `header__bar` to lay out their row. Hooks: `--gap`, `--align-items`.
- **Break utilities:** `break-inside-avoid`, `break-after-avoid` and `column-span-all`, for Columns and for print.
- **A docked Tab List leaves room for the content's end:** as the last child of a Main it is sticky rather than fixed, so it rides over the content while it scrolls and sits below the last row at the end instead of covering it. Placed elsewhere it stays fixed, as before.

### Fixed
- **A Dialog's backdrop dims the page in dark mode:** it was mixed from the darkest neutral step, which in dark mode is lighter than the page, so it lifted the page instead of dimming it and a Dialog's shadow showed as a pale halo. In dark mode it is now mixed from the theme's black, in the starter, DFH and Eden themes. No markup changes.
- **A current Stepper step with errors:** with `aria-current="step"` and `.is-invalid` together, the indicator kept the current step's accent fill under the danger ring and icon, so the two clashed. The invalid state now wins: a danger ring and warning icon on the plain fill. No markup changes.
- **A Banner Dock in the app shell sits under the Header:** `.app` gave it no row, so it landed after the footer, at the foot of the page. It now takes a row of its own under the Header; a fixed Dock leaves the flow as before. No markup changes.
- **Labels in a Popover or Dialog opened from an icon-only bar:** `hide-labels` no longer reaches into a Popover or Dialog inside the region, so a menu opened from a Header whose Buttons show only their icons keeps its labels.

## 1.3.3 (17 November 2026)

### Fixed
- **A Combobox with many Chips keeps room to type:** the input used to shrink beside a growing set of Chips until it was too narrow to use. When the Chips leave it less than about 5rem, the input and its Buttons now move to a row of their own, the full width of the field. No markup changes.
- **The component gate measures every text colour against what it sits on:** it used to pair only a `color` token with a `bg` of the same name, so Avatar text on the Avatar's background, Thumbnail text, a Badge, Status or Button's text on its fill (`on-color`, on the neutral tone and every intent), the Skip Link's text and a few others were never measured. A theme that sets one of them now fails `build:components`, `build:themes` and the Token Designer's check when the pair is under 4.5:1. Every published theme passes.
- **The Token Designer offers choices where it asked for a typed value:** a component's translucency (the roles and the steps), backdrop filter (none, the surface layer's, a blur, or a typed value such as an SVG filter's `url()`), Poster's font sizing (fixed, fluid, cq or compact), letter spacing (the steps, or a typed value), the placeholder's font style, Card's direction and header alignment, and transitions and shadows whose type didn't say so. Navigation Tree's muted colour and Telemetry's fill colour are picked from the colours. The choices come from the theme engine's `tokenOptions()`.

## 1.3.2 (16 November 2026)

### Fixed
- **Every text style takes what its theme sets:** a theme could give large, small and micro text their own family and weight, letter spacing and case to body text and Label, and case to Subheading, but the CSS never read them. They now apply, to the text atoms and to the same elements in Prose (the lead paragraph, `small` and captions). Large, small and micro text still take body text's family and weight when the theme leaves theirs unset, and letter spacing and case are still inherited, so nothing changes until a theme sets one.

## 1.3.1 (16 November 2026)

### Fixed
- **A smaller jump when the DFH theme's display face loads:** until Avory arrives, display text now falls back to a condensed face (Impact, Haettenschweiler or Arial Narrow Bold) instead of Inter, so headings change less in width when it swaps in.

## 1.3.0 (16 November 2026)

### Renamed
- **Icons take Lucide's names:** every symbol in the sprite is renamed to the name of the Lucide icon it is drawn from, in kebab-case: `#Close` is `#x`, `#ArrowRight` `#arrow-right`, `#Delete` `#trash`, `#Warning` `#triangle-exclamation-point`. Filled icons end in `-filled` and brands start with `brand-` (`#brand-github`). The old names still work, each pointing at its new one, until version 2.0; the [full list](https://github.com/PaulCWoods/DFH-Components/blob/main/docs/audit/icon-names.md) is on GitHub. `#ChevronStart` and `#ChevronEnd` were drawn the wrong way round: `#chevron-first` is now `|<` and `#chevron-last` `>|`.

### Added
- **The icon sprite is published with each version:** `components.designforhumans.blog/css/<version>/icons.svg`, beside the CSS, so a site can download the icons that match the version it links. A sprite only works from the page's own domain, so serve your copy yourself.
- **Licence notices in the sprite:** a comment at the top of `icons.svg` credits Lucide (ISC), Feather (MIT) and Simple Icons (CC0), with Lucide's and Feather's notices, which their licences ask to travel with every copy. Keep it in yours.
- **An outline Play icon:** `#play`. The filled one is `#play-filled`.
- **Full-screen Dialog:** `dialog--full` fills the screen, clear of the safe areas, and slides up like an iOS sheet; `max-md:dialog--full` does it on a phone only and leaves the Dialog centred on larger screens. Use it for a form with several fields or a text area, with Cancel and the main action in the header, so the on-screen keyboard never covers them.
- **Card bleed:** `.card__bleed` in a Card's header, band, body or footer, or straight in the Card, runs a row to the Card's edges, its first item still in line with the title. `card__bleed--scrollable` makes it a row that scrolls sideways with the scroll fade (filters, tags, thumbnails), with room above and below for small controls' hit areas. It wraps in print.

### Changed
- **The page behind a Dialog doesn't bounce:** while a modal Dialog is open, the page can no longer be pulled past its ends on a touch screen (`overscroll-behavior: none`), on top of the scroll lock it already had.
- **Inline Choices wrap evenly:** when `choices--inline` runs onto more lines, browsers that support `flex-wrap: balance` share the options out across the lines instead of leaving one on its own; others wrap as before.

### Fixed
- **Code in a Prose table keeps its words:** inline code in Prose could break after any letter, so a table squeezed a column of names or tokens to a few letters a line. It now breaks between words, after a hyphen or a dot, and mid-word only when a word can't fit at all, so a table's columns are sized to keep each word whole.
- **Prose tables scroll rather than squeeze:** a table in a scroll wrapper in Prose (a `.table-container`, or the `figure` a CMS puts round a table, which now scrolls) is at least `--prose-table-column-min` (10em) wide for each column. On a phone it scrolls instead of narrowing its columns to a word a line; print still fits it to the page.
- **Captions with paragraphs in Prose:** a CMS often puts a caption's text in a `<p>`. With `prose--body-alt` that paragraph took the serif, and it never balanced its lines. It now keeps the caption's family and type, a text atom on the caption included (`<figcaption class="text">`), and balances its lines.

## 1.2.0 (12 November 2026)

### Added
- **Compact Footer:** `footer--compact` tightens each bar's padding and gap and steps the Buttons and text in it down, for an app's action bar. `max-md:footer--compact` does it on a phone only, and `fine:footer--compact` only where the pointer is fine, as the Header's do.

### Changed
- **Small underline Tabs look small on touch screens too:** a `tab-list--sm` (or a Tab List in a compact region) was a 48px band on touch, with its Tabs stretched to fill it, so it looked larger than a small Button beside it. The band keeps its 48px for the hit areas, but the Tabs now sit in it at 32px with the rule and indicator at their foot, as they do with fine-pointer targets.

### Fixed
- **Italics in the DFH theme:** Adapter's italics were both italic and slanted, which looked wrong. The theme now sets the italic axis only.
- **Scrolling Tab Lists scroll one way only:** a `tab-list--scrollable` row could also scroll a little up and down, and a vertical one sideways. Each now scrolls only along its own direction.
- **Pagination beside other things in a row:** in a row that sizes to its content (a Card footer next to "Showing 1 to 8 of 214"), Pagination had no width and collapsed. It now takes the room left, never less than Previous, the current page and Next, and wraps to its own line when even those don't fit. Add `justify-end` to put its Buttons at the end of the row.

## 1.1.1 (11 November 2026)

### Fixed
- **Switch taps on iPhone and Safari:** only the label toggled a Switch, because Safari doesn't stretch a form control between its insets, so the invisible checkbox that fills the control had no size. The checkbox now has an explicit size, so tapping the control itself toggles it again, with the same hit area as before.

## 1.1.0 (11 November 2026)

### Added
- **22 brand icons** in the sprite, from Simple Icons: Apple, Apple Pay, Discord, Dropbox, Facebook, Figma, GitHub, Google, Google Pay, Instagram, Mastercard, Notion, PayPal, Reddit, Shopify, Stripe, Telegram, TikTok, Visa, WhatsApp, X and YouTube (`#BrandApple` … `#BrandYouTube`). A brand's own guidelines still apply to how its logo is used.
- **The theme engine compiles in the browser:** `compileTokens()` turns the token tiers into `variables.css`, `compileTheme()` builds a theme and compiles it, and `themeStylesheet()` writes a theme's stylesheet (a full theme as what it changes from the library, a sub-brand scoped to its class). They read and write no files, and `build:tokens` and `build:themes` now use them, with the same output as before. The Token Designer uses them for its Stylesheet export.

### Changed
- **Font links don't hold up the first paint:** the head links a theme's stylesheet header lists now preload a Google or Adobe font stylesheet and apply it when it arrives, with a `<noscript>` link for pages without JavaScript, and an Adobe kit gets preconnects to `use.typekit.net` and `p.typekit.net`. Text shows in the fallback font until the fonts arrive, as it already did with `font-display: swap`. Copy the new lines into your page head.
- **Controls in the starter and DFH themes get a looser line height:** `--control-line-height` and `--control-sm-line-height` are one step up the line-height scale, so text in default and small Buttons, Inputs and Selects has a little more room. The Eden theme keeps the tighter one.
- **Button labels that wrap are balanced** (`text-wrap: balance`), so a two-line label splits into lines of similar length instead of leaving one word alone.

### Fixed
- **Telemetry trend spacing:** a Status after a bare figure (`128,450 <span class="status">…`) sat against it, because the figure is text and the Status counted as the value's first child. The value's own gap (`--telemetry-trend-gap`) now spaces every part, a unit stays against its figure, and a trend that wraps starts its line flush.

## 1.0.0 (10 November 2026)

The first public version: the source is on GitHub under the MIT licence, and the docs are open to search engines. Nothing a site links has changed since 0.5.3: raising the version is all a site needs.

### Added
- **The theme format:** every theme file names its format with `"$schema"` and `"version": 1`, and the schema is published at `components.designforhumans.blog/schema/theme-v1.schema.json` (MIT, like the library). Editors check and complete theme files against it. The build and the Token Designer check every theme before using it, and name each problem's place (`type.scale.ration isn't part of type.scale`). A file without a version is read as version 1; a file from a newer version is refused, not guessed at.
- **What's free:** a page in Start that says what's free under the MIT licence and what's planned (the Token Designer, a Figma kit and Pro), and a README for the repository.

### Changed
- **Packages:** `@design-for-humans/components-css` and `@design-for-humans/theme-engine` name their licence (MIT), their exports and their files, and the engine now holds the token compiler (`npm run build:tokens` is unchanged). The engine's version follows the library's. Nothing a site links changes.

## 0.5.3 (10 November 2026)

### Added
- **Input Frame:** a text field with buttons inside one control, for showing a password or clearing a search. It takes the Input's sizes, looks and states, and its buttons keep a 48px hit area. The library ships no script: the product switches the field's type and the button's `aria-pressed`.
- **Prose `--headings-up`:** Prose headings set one step up the scale (`h2` as a title, `h3` as a heading), for a page whose headings lead.
- **Italic through a font's axes:** a theme can give a variable font its `italicAxes` (Adapter PE's are `ital 1, slnt -10`). The library sets them wherever it sets italic, so a font whose host declares only an upright face (an Adobe kit) still draws its real italic. The DFH themes use it.
- **Choices with the input beside the label:** a `div.choice` holding the input and a `label for` is supported, styled and hit-tested like `label.choice`.
- **Token Designer:** an italic axes field for variable fonts.

### Changed
- **Placeholders are italic** (`--input-placeholder-font-style`), so they don't read as a value. They keep 4.5:1 contrast in the muted colour.
- **Prose spaces every direct child,** so a wrapper (a `div` around a Table, a CMS block) no longer sits against the block after it.
- **A Card stays full width in a Stack when it's aligned** (`self-start` in a column), and sizes to its content once the Stack becomes a row.
- **Icon-only Tabs are decided by a visually hidden label** (`.sr-only`), so a visible label needs no `.tab__text` wrapper to keep its gap.
- **The button at the end of a Combobox** sits as far from the end as from the top and bottom.

## 0.5.2 (10 November 2026)

### Added
- **Prose lead:** `prose--lead` sets the first paragraph as a lead.
- **Navigation Tree:** collapsible groups and dividers between them.
- **Accordion:** the state icon can sit at the start.
- **Shared skills:** `site-css`, for a product's own CSS beside the library.

### Changed
- Navigation Tree toggles take the tree's own inline padding.

## 0.5.1 (10 November 2026)

### Changed
- **A Grid carousel straight inside a Wrapper** bleeds into the Wrapper's gutter, to the screen edge, with its first item still in line with the text. A flush or nested Wrapper has no gutter, so nothing changes there.

## 0.5.0 (10 November 2026)

### Added
- **Row Cards size their media** with `--card-thumb-size` (half the width by default).
- **Telemetry fill with intents.**

### Changed
- **Border utilities draw the theme's border width;** width and style classes adjust one side or all.
- Navigation Tree links use the foreground colour.
- Lighter accent surfaces in the DFH themes and sub-brands.

### Removed
- `.border-md` and `.border-lg`: use `.border-width-medium` and `.border-width-thick`.

## 0.4.0 (9 November 2026)

### Added
- **Busy states:** the Spinner atom, busy Buttons and busy regions.
- **Print:** `utilities/print.css`, with `print:hide` and `print:keep`.
- **Easing from the theme:** components take the theme's motion roles (`--ease-in-out`, `--ease-in`, `--ease-out`).
- **Fine-pointer targets** (`.fine:targets-sm`) and a compact Header for fine pointers (`fine:header--compact`).
- **Brand** on a `<button>`.
- **Shared skills,** published per version at `components.designforhumans.blog/skills/<version>/`: accessibility, tokens, composition, UI guidance, design principles.

### Changed
- Every component audited by group (actions, forms, navigation, surfaces, messages, indicators, content, identity, layout) against the Principles, for zero specificity, target sizes, hit areas that never cover a neighbour, forced colours and reduced transparency.
- Subtle fields have no border; it returns under `prefers-contrast: more` and forced colours.
- Pagination collapses below a 30rem row to Previous, current and Next.
- A Switch's row doesn't toggle it; its label does.
- Prose inline code wraps.

### Removed
- `--timefunc-ease-in-out`, `--timefunc-ease-in`, `--timefunc-ease-out`, `--timefunc-linear`: use the theme's motion roles, or `linear`.
- `.header__skip-link`: put a `.skip-link` before the Header.
- `.range-lockup--sm`, `--lg`, `--bordered`, `--round`: use `.controls-sm` or `.controls-lg` on the lockup.

## 0.3.0 (6 November 2026)

### Added
- **`.card__canvas`:** media of any kind where a thumb sits (a carousel, a demo, a chart), padded on the card's surface.
- `.thumbnail--stretch` fills the inline size and keeps its aspect.
- `.focus-ring--inset`, and overscroll utilities on each axis (`overscroll-y-*`, `overscroll-x-*`).
- Icon sizes in ems: `--icon-base-size` and the Button's `--button-icon-size`.
- The Eden theme (Gardens of Eden).

### Changed
- Grid carousels keep a stable scrollbar gutter.

## 0.2.1 (3 November 2026)

### Changed
- Updated icons.

## 0.2.0 (3 November 2026)

### Added
- **Poster.**
- New icons and layout additions.

### Changed
- `prose--body-serif` is `prose--body-alt`.

## 0.1.0 (2 November 2026)

The first published version: the library, the DFH theme and its blog and docs sub-brands, linked by the blog and the course.
