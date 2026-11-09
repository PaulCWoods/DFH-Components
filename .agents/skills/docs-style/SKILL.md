---
name: docs-style
description: |
  How Design For Humans documentation is written: voice, British English, plain language, capitalised component names, the page structure of docs/markup files, frontmatter, live and playground examples, links, and what never appears on a public page.

  Trigger immediately for:
  - Writing or editing docs/markup/*.md, packages/docs/src/content/docs/**/*.mdx, PRINCIPLES, AGENTS.md or a README.
  - Writing component descriptions (CSS headers, Figma descriptions, token $description).
  - Reviewing docs copy.
---

# Writing the Design For Humans docs

The docs are read by designers, developers and agents, many of them new to the library, some reading in a second language. Write so a busy reader gets the point from the first words of each sentence.

## 1. Voice

- **Plain English.** Short sentences, common words, one idea per sentence. Use the reader's words, not the code's ("the space between Buttons", then the token).
- **British spelling:** colour, customise, behaviour, centre, grey. Code keeps its own spelling (`color`, `center`).
- **Say why.** A rule comes with its reason, in the same sentence or the next: "Not `role="toolbar"`: a toolbar promises arrow keys between its controls, and the library ships no script."
- **Direct and definite.** "A Banner takes `role="status"`", not "you may want to consider adding". No hedging, no hype ("powerful", "seamless", "simply"), and no exclamation marks.
- **Second person for instructions,** present tense for behaviour: "Set `--card-radius`"; "The browser traps focus".
- **No em dashes.** Use a colon, a comma, brackets or a new sentence.
- **Avoid "e.g." and "i.e."**: write "for example" or "such as".
- **Numbers as digits** with units (48px, 3:1, 4.5:1). WCAG criteria by number and name the first time on a page: "WCAG 2.5.8 Target Size (Minimum)".

## 2. Names

- **Sentence case everywhere,** headings included: only the first word and proper nouns take a capital. Write "Say what's wrong beside the field" and "Keyboard and screen readers", not "Say What's Wrong Beside the Field". The exceptions are titles of works and proper nouns (Figma, Storybook, Token Designer, WCAG).
- **Component names are proper nouns,** so they keep their capitals wherever they appear, in prose and in headings: a Button, the Card, a Button Group, Tabs; "Rows with a Button Group". Code and generic uses stay as they are: `.button-group`, "a data list", "the inline axis", "a button" when it means any button.
- **Classes, attributes, tokens and properties in code:** `.card--plain`, `aria-current`, `--card-radius`, `inline-size`.
- **The axis names are fixed:** prominence, intent, size, density, presentation, pointer. Option families: corners, placement, arrangement, inset, width, material, overflow. Never a synonym ("style", "variant type", "theme" for intent).
- **Removed names never appear** in public docs (they live in `docs/audit/removed-names.md`).

## 3. A component page (`docs/markup/NN-*.md`)

A file becomes a page when it has frontmatter:

```yaml
---
title: Button Group
tier: molecule            # atom | molecule | organism | layout | utility
summary: A set of related Buttons laid out together, in a row or a column.
tokens: button-group      # key(s) in tokens/3-component.json
storybook: molecules-button-group
related: [button, menu, divider, batch-actions]
---
```

The `summary` is one sentence for people, not a definition for machines.

Sections, in this order:
1. **The `#` heading, then a live example** of the default component, or a playground if it has axes. It has no heading of its own, so it's the first thing on the page.
2. **Purpose:** why it exists and the problem it solves, in a short paragraph or two.
3. **When to use:** bold lead-ins. Say what it's for, then "Not for…" with a link to the right component.
4. **Rules:** the ones that mustn't be missed, each with a bold lead-in and its reason.
5. **Keyboard and screen readers** (components with behaviour only). Say what the browser provides and what the product must script. Bold lead-ins for each key and for "A screen reader".
6. **Two to four examples, each teaching one decision.** The heading names the decision ("Choosing one of several"), not the variant ("Joined").
7. **Do and don't:** a two-column table.
8. **`## Reference`:** everything below it is for looking up in the file or in Storybook: the Options table, further rules, every variant. The site stops here, so Storybook must cover it.

The page's foot (In Storybook, See also) is generated.

## 4. Examples

- **` ```html live `** renders on the page with its code closed under it. Use `live cluster` for a row, and `live width=md` to cap the width.
- **` ```html playground `** adds a control per axis:
  - Put `data-axes` after the class of the element that changes, and `data-label` on text a choice replaces.
  - Then a `---` line, and one line per axis: `Intent: Neutral, Danger=button--danger "Delete project"`.
  - `*` marks the starting choice where it isn't the first.
- **Live and playground markup must be complete and valid, and pass axe:**
  - real text, never lorem ipsum;
  - unique ids;
  - icons as `href="#Name"`;
  - images from `/examples/`.
- **Fragments** go in plain ` ```html ` fences.
- **The example's own copy follows the content rules:** Buttons say what they do ("Save changes"), and the data is believable (plants, gardens, orders, not "Item 1").

## 5. Links

- **Link a keyword** to another doc: `[Tooltip](23-tooltip.md)`. Never a `§` reference (the build fails on one) or a lettered heading.
- **Link text says where it goes,** never "here" or "this page".
- **No audit references** and nothing only Storybook uses (`.sb-demo-*`).

## 6. Other writing

- **CSS headers, Figma component descriptions and token `$description`s** are one or two sentences in the same voice: what it is for, then the one thing to know. A token's description names its job and never its value or step, because values change with the theme.
- **PRINCIPLES** states decisions as rules, with the reason; the decisions log answers one question per row.
- **AGENTS.md** is for agents: precise, complete, with exact names and commands. It may be denser than public docs, but it keeps the same spelling and names.

## 7. Check

After editing a doc that has a page, run `npm run build:docs && npm run check:docs`. The check fails on a broken link or anchor, an axe failure in light or dark, and content out of reach at any of its 10 widths.
