# Roadmap

Features and fixes we might build, for choosing what goes in each release. Nothing here is promised.

**How to use it**
- **Adding an idea:** put it in the section it belongs to, as a bullet. Give it a name in bold, then say what it is and why we'd want it. Add where it came from if it helps (a site, an audit, a recipe).
- **Planning a release:** move the items you've picked into **Next release**.
- **After a release:** delete each shipped item from this file and record it in [CHANGELOG.md](../CHANGELOG.md).
- **Something we decide not to do:** move it to **Decided against**, with the reason, so it isn't raised again.

Sizes are rough: **S** fits in an afternoon, **M** is a component pass, **L** is several passes or a new tool.

## Next release

Nothing picked yet.

## Being planned

Picked from the planning sheet on 12 November 2026. Each needs its open questions settled before it's built.

### Card inner bands (S)
A part inside a Card's header, body, footer or band that runs to the Card's edges, so a row that scrolls sideways (ramps, chips, a table, thumbnails) reaches the edge instead of stopping at the padding. It takes a negative inline margin of the Card's padding and pads its inside by the same amount, so its content still starts in line with the rest of the Card. The Designer's ramps need it.
- **Name:** `.card__bleed`, after the Grid Carousel's `--carousel-bleed`, which does the same for a carousel.
- **How:** reads `--_card-padding`, so compact, flush and plain Cards follow on their own (a flush Card's bleed does nothing).
- **Scrolling:** it doesn't scroll by itself; pair it with `overflow-x-auto` and the scroll fade. A scrolling bleed must leave room for its controls' hit areas above and below (nothing clips a hit area), so it gets block padding of half the gap between target and control, as the Tab List's bar does.
- **Where:** a direct child of `.card__header`, `.card__band`, `.card__body` or `.card__footer`. Not of `.card__content`, which always holds those parts rather than a bleed.
- **Open question:** should a Sidebar body get the same?
- **Also:** markup doc (§10), a story, Figma (a slot frame in card/body, card/header and card/footer, with the negative margin described, since Figma can't draw it), `check:layout` and `check:targets`.

### Column layouts (S)
Text and short items in newspaper columns with CSS multi-column, for long lists (a glossary, an index of links, a sitemap footer) and print. The Grid sets items in rows; this flows content down and across.
- **Primitive:** `.columns` in `layout/`, with `--columns-width` (the narrowest a column gets; `column-width`, default about 18rem) and `--columns-count` (the most columns; default `auto`), and `--gap` for the gap between columns, stepping down under `--ui-sizing: compact` like the other primitives. A `--ruled` modifier draws `column-rule` from the rule tokens.
- **Utilities:** `.break-inside-avoid` (an item stays whole), `.break-before-column`, `.break-after-avoid` (a heading stays with what follows), `.column-span-all` (a heading across every column). Classes rather than `style` attributes, so they print and show in the docs.
- **Rules to write:** reading order goes down each column, so it suits lists people scan, not running prose on screen (they'd scroll back up); use it for prose only in print. Never put interactive rows in columns where focus order would jump.
- **Responsive:** columns form from the room there is: `column-width` drops a column whenever one would be narrower than `--columns-width`, down to one on a phone, with no breakpoints. The `@{size}:` container variants (as the Grid's `@3xl:grid--2-col`) set the most columns where a layout needs a fixed count from a width.
- **Figma:** a description only, since Figma has no multi-column layout.
- **Prose:** no columns option for now.
- **Also:** markup doc (a new layout page), stories at several widths, `check:print`, `check:utilities`.

### Custom Tier 2 colours (L)
A theme can add colour roles of its own (a second brand colour, a category colour) beside accent and the intents, each with the full set the accent has: surfaces (`surface-<name>`, `-strong`, `-dark`), foregrounds (`foreground-<name>`, `-hover`, `-pressed`) and a border colour, generated from one ramp and checked by the same contrast gate.
- **Theme format:** a `roles.custom` list (a name and a ramp). Version 2 of the format, with version 1 files still read.
- **Engine:** generates each role's tokens in light, dark, inverted and high contrast from the accent's recipe, and gates every pairing. The gate's list of roles (`INTENTS` in `gate.js`) grows from the theme.
- **CSS:** custom roles are colours, not intents: they get the colour utilities (`.bg-<name>`, `.text-<name>`, `.border-<name>`) and can be set on component tokens, but don't become values of the intent axis, since intent carries a meaning (danger, success) that a brand colour doesn't. The utilities are generated per theme into its stylesheet.
- **Designer:** a role editor in Semantic colours (add, name, pick a ramp, see its pairings), offering to generate the set from a ramp. Pro only: without a licence it opens the Pro dialog, as New theme does.
- **Figma:** each role becomes variables in the Color collection, in both modes.
- **`complementary` keeps its name** and stays built in: the existing extra colour role, beside the custom ones. No rename.
- **Open questions:** how many custom roles a theme may have; whether sub-brands can add them or only change them.

## Library candidates

Things the library lacks or could do better. Each waits for a second use, or for its component's next pass.

### Components and options
- **Range scale labels (M):** start and end labels under a slider: elapsed and remaining time, a price range, 0 to 100. The Range Lockup shows one value only. *From the Cadence recipe.*
- **Three-zone bar (M):** start, a true centre and end, for a media player, an editor toolbar or a wizard footer. Header bars and between-clusters don't centre the middle part. Cadence uses its own `1fr auto 1fr` grid. *From the Cadence recipe.*
- **Tooltip typography (S):** the Tooltip sets its own type rather than taking a text atom. Decide whether it should. *Deferred from the component audit.*
- **Badge, Status and Chip literals (S):** values in their CSS that could be tokens. *Deferred from the component audit.*
- **A motion token for the press scale (S):** the 0.96 scale on press is a literal. *Deferred from the component audit.*
- **Prose, Figure and Blockquote in Figma (M):** Figma has no Prose component, so long-form pages are drawn by hand.
- **Smaller Figma options (S each):**
  - Tab List fill
  - a Meter value
  - a Badge on Navigation Tree items
  - a Banner whose action wraps below
  - a Lockup that holds a link or a Status
  - the Micro Heading's uppercase in its text style
  - a truncated Input placeholder

### Waiting for the platform
- **A Split straight inside a Split (S):** the inner one sizes itself with the outer one's `--split-side-width`. The rule for now is to wrap the inner Split in a `<div>`. Fix it with `inherit()` once that is Baseline.
- **Translucency with `alpha(from …)` (S):** replace the `color-mix(in srgb, …, transparent)` mixes once relative colour with `alpha()` is Baseline Widely Available.
- **Drop a fluid type method (S):** the compiler writes `clamp()`, then `progress()`, then `@function`. Drop each older method once the next is Baseline Widely Available.

## Tools

The Token Designer, the Figma export and the other tools are planned in the private repo's roadmap. The library's side of any tool (an engine feature, a token, the theme format) is planned here.

## Docs site
- **Brochure home page (M):** the home page as the product's front door, with Designer, Figma and Real World screenshots side by side.
- **Recipe pages (M):** a page per recipe built from its stories, or links to Storybook.

## Decided against

Nothing yet.
