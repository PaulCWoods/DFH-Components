# Changelog

What changed in each published version of the library (`dfh-components.css`, the theme stylesheets and the shared skills), newest first. Sites link a version from `components.designforhumans.blog/css/<version>/`; a published version never changes.

Each entry lists what a site using the library would notice: new components and options, changed behaviour, and anything removed or renamed (with what to use instead). Planned work is in [docs/ROADMAP.md](docs/ROADMAP.md).

## Unreleased

### Fixed
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
