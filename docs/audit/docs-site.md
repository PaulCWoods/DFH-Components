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
6. **Brochure.** The home page and a few marketing pages, built from library parts and showing the live components.
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

## Open questions (for later phases)

1. **Hosting** for the subdomain (Netlify, Cloudflare Pages, or the blog's server).
2. **Storybook in public:** deploy it alongside (`/storybook/`) so the docs can link to it, or keep it local?
3. **The Token Designer in public:** a read-only demo, or local only? Publish writes files, so a public one couldn't save.
4. **Versioning:** the library is pre-v1. The docs track `main`, with a pre-v1 note, until there's a release.
5. **The blog's component overview** (`_component-library.twig`): keep it as the blog's own check, or retire it once the docs exist?
