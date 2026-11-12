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
