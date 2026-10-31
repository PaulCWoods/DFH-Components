# Docs site

A plan for `packages/docs`: the public documentation for Design For Humans Components, and later its brochure.

## The four surfaces

| Surface | For | What it is |
| :--- | :--- | :--- |
| **Storybook** | Developers working on or deep in the library | Every component, variant, state and edge case, with axe on each story. The workbench and test bed. |
| **Token Designer** | Whoever designs the theme | The toolkit for tokens (and later components): colour, type, spacing, with live gates. Writes `tokens/theme.json`. |
| **Brochure** (to come) | Someone deciding whether to use it | The shop window: what it is, why it's different, what it looks like. |
| **Docs** | Someone using it | The ethos, how the tokens work, the component library, and patterns and guidance. |

The docs explain and teach; Storybook shows everything. A docs page links to its Storybook stories for the full set of variants, rather than repeating them.

## Decided (30 October 2026)

1. **The markup docs feed the site.** Each `docs/markup/NN-*.md` file becomes its component's page. One source for people and agents.
2. **One Astro site.** The brochure is the home page and a few marketing pages; the docs live under `/docs`. The docs are built first.
3. **Domain:** `components.designforhumans.blog`.
4. **Library only.** The site uses the library's own shell, header, sidebar, prose and atoms, with no docs-only CSS beyond a small layer for things only a docs site has (the live-example frame). Anything it needs that the library lacks becomes a library candidate, not docs CSS.
5. **Start again.** The prototype has no content: a placeholder home, a Button page on old token names (`--spacing-4` fallbacks, `--button-bg` rows that no longer match), and a sidebar of links to missing pages. It is removed, not migrated. The components in it (code block, token table, command palette, theme toggle) are rebuilt as needed, against the current library.

## Map

```
/                         Home (the brochure later; a short landing until then)
/docs/                    Start here: what it is, the four surfaces, where to go
/docs/ethos/              Accessibility first, native HTML, restraint, responsive, modern CSS, designer–developer parity
/docs/start/              Install, import, fonts, colour scheme, a first page, theming with the designer, Figma
/docs/foundations/        Tokens: the three tiers and how they're built
  colour/                 The theme, ramps, roles, the contrast gate, light and dark
  type/                   The scale, text styles, sizing modes (fixed, fluid, cq, compact)
  space/                  The spacing roles, fluid growth, compact
  shape-elevation-motion/ Radius, borders, shadows, motion
  axes/                   Size, density, pointer, presentation, prominence, intent
/docs/components/         The library, by tier
  atoms/<name>/
  molecules/<name>/
  organisms/<name>/
  layout/<name>/
  utilities/
/docs/patterns/           Recipes and composed patterns: forms, navigation, announcements, loading and empty states, app layouts
/docs/guidance/           Accessibility how-tos, the composition law, theming, writing for interfaces, migrating from old names
/docs/tools/              Storybook, the Token Designer, Figma
```

## A component page

Built from its markup doc, plus what can be generated:

1. **Title and summary** (frontmatter).
2. **When to use, and when not** (human prose, new): what it's for, and what to use instead.
3. **Examples** (from the markup doc): each ` ```html live ` fence renders as the real component above its code. Fences without `live` stay code only (fragments such as a lone `<li>`).
4. **Options** (from the markup doc's block / options / flags table).
5. **Accessibility** (from the markup doc's rules): naming, roles, keyboard, colour.
6. **Do and don't** (human, new): short pairs, each with a live example where it helps.
7. **Tokens** (generated from `tokens/3-component.json`): each Tier 3 token, its value and what it does.
8. **Related** and **Storybook** links (frontmatter).

Frontmatter added to each markup file:

```yaml
---
title: Thumbnail
tier: atom            # atom | molecule | organism | layout | utility
summary: A small picture of a thing: album art, a product shot, a file preview.
tokens: thumbnail     # the key in 3-component.json, if any
storybook: atoms-thumbnail
related: [avatar, icon-box, card]
---
```

Agents keep reading the same files; the human sections sit alongside the rules. AGENTS.md's markup table can then be generated from the frontmatter.

## Foundations from the source

The foundations pages read the theme and tokens at build time, so they can't drift:

- **Colour:** the ramps from the theme engine, each role's light and dark values and its contrast.
- **Type:** the scale at both ends of the fluid range, every text style as a specimen.
- **Space:** each role at both ends, drawn to scale (as in the designer).
- **Tokens:** searchable tables per tier, from the JSON.

## Technical

- **Astro 7, static.** Content collections with a glob loader over `../../docs/markup` and `src/content` for everything else (MDX).
- **Live examples:** a remark plugin turns ` ```html live ` into the rendered markup in an example frame, plus the code. The rendered HTML is the code shown; nothing is written twice.
- **Search:** Pagefind (static index, no external request, PRINCIPLES §4). Opened from the header in a `<dialog>`.
- **Fonts:** the generated `fonts.css` and the `<!-- theme fonts -->` head block, as now.
- **Colour scheme:** the library's `.color-scheme-*` utilities, with a toggle that remembers the choice.
- **Icons:** the sprite from `icons/icons.svg` (already synced to `public/`).
- **Gates, run on the built site:** axe on every page (light and dark), the layout reachability check at 10 sizes, and a link check. A page that fails doesn't ship.

## Phases

1. **Clean slate and shell.** Remove the prototype pages and components. Build the shell from the library: header with search and the scheme toggle, skip link, sidebar nav generated from the collections, prose, previous and next links. Set `site` to `components.designforhumans.blog`. Gates running.
2. **Pipeline and pilot.** The markup collection, the live-example plugin, the generated token table, the Storybook links. Pilot on three pages: Button (an atom), Field (form composition) and Card (a molecule). Agree the page shape on these before going wider.
3. **Ethos, Start and Foundations.** Ethos written for people from PRINCIPLES (which stays the rulebook). Start: install to first page. Foundations generated from the theme and tokens.
4. **The library.** Frontmatter and human sections for every markup doc, tier by tier: atoms, molecules, organisms, layout, utilities. From then on, each component pass updates its page with its markup doc.
5. **Patterns and guidance.** The five recipes from §32 as patterns, plus forms, navigation, announcements, loading and empty states; the accessibility, composition, theming, writing and migration guides.
6. **Brochure.** The home page and a few marketing pages, built from library parts and showing the live components. It echoes the blog's home page: no header navigation; the brand in its frame, a short hello, then sections of linked cards (`.card` with a thumb and a stretched link) that take people on to the docs, the foundations, the tools and the patterns. The docs keep their header and sidebars.
7. **Deploy** to `components.designforhumans.blog`.

## Phase 1: done (30 October 2026)

- **Removed** the prototype: its pages, layouts and components.
- **Shell from the library:** `body.app` with a skip link; a sticky `.header` with the brand, the sections as a plain scrollable tab list, search, the colour scheme and (below 48rem) a menu button; the section's pages in a sticky `.sidebar` of `.navigation-tree` (from 48rem); the article in `.prose` inside a `.wrapper`; "On this page" in a sticky end `.sidebar` (from the xl width, on pages with two or more sections); previous and next as `.block-link`s; a one-row `.footer`. No docs CSS.
- **Drawer:** below 48rem the menu button opens a `.dialog--drawer.dialog--start` with every section (the current one opened to its pages) and the colour scheme.
- **Colour scheme:** follow the system, light or dark, as a joined button group with `aria-pressed`. It sets `.color-scheme-light` or `-dark` on `<html>` and remembers the choice; a head script applies it before the first paint.
- **Search:** Pagefind, built after `astro build`, in a `.dialog` with a field, a status line and linked results. The article is the indexed region.
- **Content:** a `docs` collection (`src/content/docs`, MDX with `title`, `summary`, `order`). A folder is a section and its `index.mdx` the overview; sections show in the header and drawer once they have a page. Two pages so far: Overview and Tools. The home page stands in for the brochure.
- **Code** takes the library's prose styling: Astro's highlighter is off (its colours failed contrast). A code block of our own comes with the live examples in phase 2.
- **Gate:** `npm run check:docs` (links and anchors, axe in light and dark, reachability at 10 sizes). 3 pages pass.
- **Fonts:** the font writer now needs each `theme fonts` marker on a line of its own. A comment in the layout that quoted the marker was taken for it, and a Publish overwrote the layout's frontmatter.
- **Site:** `site` is `https://components.designforhumans.blog`, with trailing slashes.
- **Library candidates:** none yet.

## Phase 2: pilot built (30 October 2026), page shape to agree

- **Markup collection:** `docs/markup/*.md` is a content collection. A doc becomes a page at `/docs/components/<tier folder>/<slug>/` once its frontmatter names a `tier`, `title` and `summary`; the slug is the file name without its number (`07b-form-composition.md` → `form-composition`). Pages join the Components section of the nav, grouped by tier, and the Components overview lists them as block links.
- **Page shape:** eyebrow (the tier), title, summary, a live example of the default, the doc's opening line, **When to use**, **Options**, **Rules** where the doc has them, the lettered examples, **Do and Don't**, then the generated **Tokens** and **See also**. "On this page" lists them all.
- **Live examples:** ` ```html live ` (or `live cluster` for a row, `live width=md` to cap the width) renders the markup in a `.card.card--ruled` above its code. The stage ends the prose scope (`.prose-end`), so the library styles the example as it would anywhere else. Sprite references point at `/icons.svg` in the rendered copy only. Fences without `live` stay code.
- **Links:** links between markup docs point at their pages, or become text while the target has no page. `§E` links to this page's "E." example and `§24` to the doc numbered 24 once it's a page (a number two docs share, such as §7, stays text).
- **Tables** from markdown sit in a named, focusable `.table-container`, so a wide one scrolls instead of widening the page at 320px.
- **Tokens table:** from `tokens/3-component.json` (name and description) and the compiled `variables.css` (default).
- **Storybook links** need `PUBLIC_STORYBOOK_URL` at build time; without it, See also names the story id (open question 2).
- **Pilot pages:** Button, Field, fieldset and form, Card. Each gained When to use and Do and Don't, and examples filled in enough to render (Card's images are `/examples/*.svg`). The form doc has a complete form.
- **Build:** markdown plugins need `@astrojs/markdown-remark` (Astro 7 defaults to its own processor). The content layer caches rendered markdown by file digest, so a change to a plugin alone wouldn't show; the build runs `astro build --force`.
- **Gate:** 7 pages pass `check:docs`.
- **Library candidates:**
  - A `.card__thumb` in a row card (`--card-dir: row`) has no inline size, so it takes its image's intrinsic width and won't shrink: a 300px image overflows a phone-width card. Card's media-row example is code only until the thumb gets a size (perhaps `--card-thumb-size`, or the thumbnail atom's sizes).
  - Inline code in prose breaks after a hyphen, so a token name can split as `-` / `-controls-prominence` in a table cell.
  - Many Tier 3 tokens have no `$description`, so the Tokens table's "What it does" is empty for them. `card.hgroup-gap` and `card.band-gap` reference Tier 1 spacing.
- **To agree before phase 4:** the page shape above; whether the lettered example headings ("A. Prominence") and `§` references stay as they are on the site or become plain headings and named links.

## Open questions (for later phases)

1. **Hosting** for the subdomain (Netlify, Cloudflare Pages, or the blog's server).
1. **Storybook in public:** decided, at `/storybook/` on the same host.
3. **The Token Designer in public:** a read-only demo, or local only? Publish writes files, so a public one couldn't save.
4. **Versioning:** the library is pre-v1. The docs track `main`, with a pre-v1 note, until there's a release.
5. **The blog's component overview** (`_component-library.twig`): keep it as the blog's own check, or retire it once the docs exist?

## Phase 4: every component has a page (31 October 2026)

- **46 docs** are pages at the page shape, each opening with a live example of the default. `32-recipes.md` waits for the Patterns section (phase 5).
- **Live examples:** only `<use href="#Name">` is rewritten to the sprite, so demo links keep their own targets.
- **Left as code:** whatever holds a real landmark or a whole page (header, sidebar, footer, wrapper and app shell markup), fixed placements (toast stacks, banner docks, fixed batch actions) and script-driven states.
- **Added from the CSS, previously undocumented:** header `--stretch`, sidebar `--compact`, wrapper `--flush`.

## Phase 5: the page shape (pilot)

Button, Card and Dialog are the pilot. A page explains and helps someone choose; Storybook shows everything. The test for a piece of content: would you be worse off for not reading it before using the component? If you'd only look it up, it goes below `## Reference`, which the site doesn't render, and Storybook must cover it.

- **Top of the page:** a playground where the component has axes, replacing the default example. Without a script it is that example.
- **Why it exists:** new writing, drafted from `PRINCIPLES.md` and the audits, for the author to correct before the other pages follow.
- **Code** is closed under each example, in a native `<details>`, with a copy button.
- **Gate:** `check:docs` runs axe on each playground choice in both schemes, and checks the code follows.
- **Storybook is public,** at `components.designforhumans.blog/storybook/` (`npm run build:site`). Each page's foot links in, the gate checks each story exists, and tokens moved there from the pages.
- **Keyboard and screen readers:** a section on components with behaviour, after APG, Carbon and Primer.

## Phase 4: decisions

1. **Story scaffolding:** `demo.css` was 98 class names, 6 in use. It now holds those, one name each (`.sb-demo-*`).
2. **References:** pages link keywords, not `§`, and the build fails on a `§`. Headings lost their letters. Recipes keep `§` until the Patterns phase makes them a page.
3. **Audit references:** none on pages; the site is public.
4. **Rules written for us:** off the pages. Removed names are in `docs/audit/removed-names.md`; Storybook's own rules are in `.storybook/demo.css`.
5. **`.telemetry--inline`:** for when the space calls for it, such as a site header.
6. **`.toast`** has its own shadow, in a stack or not.
7. **A card with a `<header>`** is an `<article>`, in docs, stories and the blog overview.
8. **Standards decide, not axe:** `<aside>` in `<main>` is valid, so the demo uses it and `landmark-complementary-is-top-level` is off.
9. **Button Group's alignment example** no longer uses an inert `form method="dialog"`.
10. **Component names take capitals in prose** (Button Group, not button group).

