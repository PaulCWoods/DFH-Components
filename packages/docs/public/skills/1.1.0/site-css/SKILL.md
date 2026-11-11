---
name: site-css
description: |
  Writing a product's own CSS beside the Design For Humans library: when to write any, one file per component in the site layer, selectors that leave the library's text atoms and utilities in charge, Tier 2 values only, your own tokens, comments and formatting.

  Trigger immediately for:
  - Writing or editing a site's or product's own stylesheet that sits on top of the library.
  - Styling CMS output (WordPress blocks, Craft fields) that can't carry library classes.
  - Tidying, reviewing or formatting a product's CSS.
---

<!-- Design For Humans Components 1.1.0. Updates: https://components.designforhumans.blog/docs/start/skills/ -->

# Your own CSS beside the library

The library comes first. Most needs are a component, an option, a container setting, a token or a utility, and need no CSS at all: work down the `composition` skill's list before opening a stylesheet. What's left belongs in a small file of your own, written the way this skill describes. CSS you keep should be the part of your product the library can't know about.

## 1. Before you write a rule

- **Put classes in the markup.** A text atom (`.title`, `.large-text`, `.small-text`), a layout primitive (`.stack`, `.cluster`, `.grid`) or a utility (`.p-sm`, `.text-muted`, `.bg-darker`, `.color-scheme-dark`) in a template beats a rule in a stylesheet.
- **Set a component's token, not its properties.** `--card-padding`, `--header-bg`, `--button-corners` change a component everywhere it reads them, in every sizing mode and theme. A rule that sets `padding` on `.card` fights the component and misses compact regions.
- **A need the library almost meets is a finding.** If you write CSS because a component lacks an option, say so in the file's header and tell the library's maintainers. Delete the rule when the option ships.

## 2. Files and layers

The library declares its layers, and leaves `site` for you:

```css
@layer reset, tokens, atoms, molecules, organisms, layout, site, utilities, overrides;
```

- **One file per component,** named after it (`lesson-page.css`, `credential-card.css`), and an `index.css` that imports each into its layer:

  ```css
  @import url("tokens.css") layer(tokens);
  @import url("animations.css") layer(reset);

  @import url("components/article.css") layer(site);
  @import url("components/credential-card.css") layer(site);
  ```
- **`tokens`** holds your token choices and your own tokens. **`reset`** holds keyframes and whatever your platform's output needs before anything else (WordPress's alignment classes, say). **`site`** holds your components.
- **`site` beats the library's components and loses to its utilities,** so a utility on your component still works and you never need `!important`.
- **Never write unlayered CSS.** It beats every layer, the utilities included.
- **Bundle the files for production** (Lightning CSS or any bundler that keeps `@import … layer()`), and link the bundle after the library, its theme and anything shared.

## 3. Selectors

- **A class per component, BEM-lite:** `.lesson-head`, `.lesson-head__nav`, `.lesson-head--sticky`. Don't reuse a library block's name for your own component, and don't add your parts to a library block (`.card__badge`): wrap or compose instead.
- **Never set type on an element that carries a text atom.** `site` comes after the atoms, so `.card-title { font-size: … }` overrides `.heading` on the same element, in every sizing mode. Put the atom in the markup and leave its type alone.
- **Content you can't add classes to** (a CMS's rich text, a plugin's block) is styled by element under a class you own: `.lesson-body aside`, `.wp-block-pullquote p`. Wrap those element selectors in `:where()` when a utility or atom might need to win inside the same layer.
- **Match the platform's own classes** for its blocks (`.wp-block-quote`), so the rule follows the block wherever the editor puts it.
- **No IDs, no `!important`,** no selectors that depend on a library component's internal structure.

## 4. Values

- **Tier 2 roles only:** `--surface-card`, `--foreground-muted`, `--border-color-quiet`, `--spacing`, `--spacing-cushion`, `--radius-md`, `--shadow`, `--duration-sm`, `--ease-in-out`, `--focus-ring-width`. Never a Tier 1 step (`--color-neutral-800`, `--spacing-64`, `--typography-font-size-1`, `--typography-font-weight-600`): those don't follow the theme, high contrast or compact regions. The `tokens` skill lists the roles.
- **Type comes from text atoms,** in the markup. When content can't carry a class and must look like an atom, that's a finding (section 1). Never copy an atom's declarations and its sizing-mode queries into your rule.
- **No literal colours or sizes** outside a terminal fallback. Spacing multiples are fine as `calc(var(--spacing-cushion) * 2)`.
- **Logical properties:** `margin-block-start`, `padding-inline`, `inset-inline-end`, `inline-size`.
- **Safe areas:** the library's `--safe-area-inset-inline-start`, `-inline-end`, `-top` and `-bottom` (each `0px` outside a notched screen). Use the side that matches the property: start for start, end for end.
- **Motion:** durations from `--duration-*` and easing from `--ease-*`. The library already takes every duration to 0 under reduced motion, so your tokens that read them need no reduced-motion block of their own. A literal duration (`3s`) doesn't, so use a role.
- **Stacking:** `--z-index-sticky` and the other `--z-index-*` roles, not numbers.

## 5. Your own tokens

- **Name them `--<component>-<property>`,** hyphens only: `--lesson-aside-sticky-top`, `--article-transition`.
- **Declare them in `tokens`, on `:root`,** each reading a role: `--article-transition: var(--duration-sm);`. Group them under a comment per component, in the order of your files.
- **Read them with a fallback that ends at a role or a system value:** `var(--lesson-aside-sticky-top, var(--header-height, 4rem))`.
- **Make a token only when something changes it:** a theme, a region or another component. A value used once stays in its rule.

## 6. Comments

- **A header on every file,** in the library's banner style: the component's name, then what it is and why the library doesn't cover it. Name findings there.

  ```css
  /* ==========================================================================
     Lesson page: the lesson's header bar, video and aside
     --------------------------------------------------------------------------
     The header bar hides the parent link as the lesson title scrolls in, which
     the library's Header has no option for (a finding).
     ========================================================================== */
  ```
- **A dashed divider** heads each group of rules in a long file:

  ```css
  /* --------------------------------------------------------------------------
     Video player
     -------------------------------------------------------------------------- */
  ```
- **Comment why, never what:** a browser workaround, a cascade decision, layout maths, a WCAG reason. `/* Keep the column clear of the sticky header */`, not `/* Set top */`.
- **Delete a comment when the code it describes changes.**

## 7. Formatting

- **Run Prettier** with its defaults: two-space indentation, one declaration per line, spaces around operators in `calc()`, one blank line between rules and none inside a rule.
- **Nest** with an explicit `&` for states and pseudo-elements, and nest media and container queries inside the rule they change.
- **Order declarations** in groups: custom properties; layout and display; sizing; spacing; typography; surface and border; position; interaction and transition; then nested states, queries and parts.
- **Keep behaviour when tidying:** never reorder rules or change selectors in a formatting pass. Order is part of the cascade.

## 8. Before you finish

- Could a class in the markup, a component's token or an option do this instead?
- Is every value a Tier 2 role, your own token or a fallback?
- Does any rule set type on an element with a text atom?
- Is every file in a layer, with a header that says why it exists?
- Has Prettier run?
