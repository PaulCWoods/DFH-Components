# Roadmap

Features and fixes we might build, for choosing what goes in each release. Nothing here is promised.

**How to use it**
- **Adding an idea:** put it in the section it belongs to, as a bullet. Give it a name in bold, then say what it is and why we'd want it. Add where it came from if it helps (a site, an audit, a recipe).
- **Planning a release:** move the items you've picked into **Next release**.
- **After a release:** delete each shipped item from this file and record it in [CHANGELOG.md](../CHANGELOG.md).
- **Something we decide not to do:** move it to **Decided against**, with the reason, so it isn't raised again.

Sizes are rough: **S** fits in an afternoon, **M** is a component pass, **L** is several passes or a new tool.

## Next release

- **Theme JSON format (M):** a versioned, validated format for importing and exporting themes. Free and Pro both build on it. *Built; ships with the next version.*

## Before v1

Decisions and loose ends to settle before calling it v1.

- **Repo split and licence (L):** split by what's paid, before the repo goes public.
  - **Public, MIT:** `packages/css`, the docs, Storybook, the shared skills, the theme format, and the engine core (palette, type, space, shape, motion, the gates, and `compile-tokens.js` moved out of `figma-sync`).
  - **Private, in DFH-Components-Private:** the Pro server function, the Figma export, sub-brand and multi-theme builds, AI theme generation, the accessibility report and the Token Designer app.
- **Licence files and a "What's free" page (S):** say plainly what's MIT, what the Figma kit costs, and what Pro adds.
- **Figma, for the latest batch (M):** an Input Frame set (password and search) and italic placeholders. The sibling form of a choice may need nothing. Card stretch, Prose spacing and the Tab change are CSS only.
- **Docs links to missing pages (S):** check the sidebar's `/components/atoms/badge`, `/components/layout/*` and `/recipes/*` links. Build each page or link to Storybook.

## Library candidates

Things the library lacks or could do better. Each waits for a second use, or for its component's next pass.

### Components and options
- **Range scale labels (M):** start and end labels under a slider: elapsed and remaining time, a price range, 0 to 100. The Range Lockup shows one value only. *From the Cadence recipe.*
- **Three-zone bar (M):** start, a true centre and end, for a media player, an editor toolbar or a wizard footer. Header bars and between-clusters don't centre the middle part. Cadence uses its own `1fr auto 1fr` grid. *From the Cadence recipe.*
- **Footer compact density (S):** the Footer has no `--compact`. *Deferred from the component audit.*
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

The Token Designer is the product. These follow the agreed tiers: the library and solo tools are free, the full Figma kit is a one-off purchase, and Pro is a subscription.

### Free
- **Hosted Designer, local-first (L):** edit one full theme in the browser, with its gates and Real World pages, and export its CSS. Work in progress lives in IndexedDB, the JSON file is the real save, and a theme can be shared in the URL.
- **Import a theme from JSON (M):** needs the theme JSON format above.
- **Delete a theme, downloading it first (S):** full deletion, saving the theme's JSON for the person to keep. Today a theme can only be archived.
- **Archive full themes (S):** only sub-brands can be archived today.
- **OKLCH ramp builder (M):** the colour generator on its own, ending in "Open in Designer".
- **Icon sprite builder (L):** a replacement for IcoMoon that writes the sprite the library uses. It would also fix the id shift seen in the last two exports.

### Pro
- **Sub-brands and multiple themes (M):** they work today in the dev Designer; they need gating in the hosted one.
- **Figma export (M):** Figma Variables with modes, and Tokens Studio. It runs in a stateless server function: a theme and a licence key go in, files come out, nothing is stored.
- **AI theme generation (L):** a theme drafted from a brief or a brand, then checked by the gates.
- **Accessibility report (M):** a report on a theme's gates that a client can sign off.
- **Team sync (L):** only if people ask for it.

## Docs site
- **Brochure home page (M):** the home page as the product's front door, with Designer, Figma and Real World screenshots side by side.
- **Recipe pages (M):** a page per recipe built from its stories, or links to Storybook.

## Decided against

Nothing yet.
