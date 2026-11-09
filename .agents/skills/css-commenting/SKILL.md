---
name: css-commenting
description: |
  Comments and formatting in the library's CSS (packages/css/src): the file header, numbered section banners, sub-section dividers, inline comments, declaration order and formatting.

  Trigger immediately for:
  - Writing a new stylesheet in packages/css/src.
  - Adding a section, modifier block or style query to an existing one.
  - Tidying or reviewing comments and formatting in library CSS.
---

# Comments and formatting in library CSS

For what the CSS should do (`:where()`, the private manifest, axes and flags, fallbacks), load the `component-authoring` skill. This skill covers how the file reads.

## 1. File header

Every stylesheet opens with a banner. Its title line is "Design For Humans:" and the component's name. Under that, in plain sentences, it explains:
- **What the component is,** and what it isn't responsible for.
- **Its structure:** the parts, and which are direct children.
- **Its axes and option families,** with every modifier and container flag. A table works well when there are several.
- **WCAG notes:** the success criteria it answers and how (targets, contrast, focus, colour alone).
- **Usage:** the smallest correct markup.

```css
/* ==========================================================================
   Design For Humans: Chip
   --------------------------------------------------------------------------
   A token that represents a value: a selected option, an active filter, a
   tag. Optionally removable. Not for state: use .status.

   | Axis       | Modifiers                  | Container flag    |
   | ---------- | -------------------------- | ----------------- |
   | Prominence | (outline) --subtle --plain | --chip-prominence |
   | Size       | --sm                       | --chip-size       |
   | Corners    | --round                    | --chip-corners    |

   Accessibility (removable chips):
   - 2.5.8 Target Size: the remove button keeps a 24px hit area via ::after.

   Usage:
   <span class="chip"><span class="chip__text">Shade</span></span>
   ========================================================================== */
```

The header is the component's reference for maintainers. Update it in the same change as the CSS it describes.

## 2. Sections and sub-sections

- **Numbered section banners** for the main parts of the file, in this order: base, modifiers grouped by axis, parts (`__header`, `__body`), then responsive variants and user preferences. The selector goes in brackets when it helps.

  ```css
  /* ==========================================================================
     1. Base (:where(.chip))
     ========================================================================== */
  ```
- **Dashed dividers** inside a rule, indented with it, for groups such as the private manifest, the container flags, a state or a part. Use the long form for a group that needs a sentence of explanation.

  ```css
  :where(.chip) {
    /* --------------------------------------------------------------------------
       Container Flags (@container style(...))
       Declared before the modifiers, so a modifier on the chip beats a flag
       inherited from a container.
       -------------------------------------------------------------------------- */
  ```
- **Keep each modifier block beside its axis,** and a part's rules beside its part, so related rules are found together.

## 3. Inline comments

- **Explain why, not what.** Write a comment for a constraint, a browser workaround, a specificity or cascade decision, layout maths, or a WCAG reason. Never narrate a declaration (`/* Set the colour */`).
- **Short labels** (`/* Private manifest */`, `/* Intent */`) can head a group of declarations inside a rule.
- **Write sentences in plain British English.** Name the component with a capital (a Button Group) and the class in code (`.button-group`).
- **Name the criterion** where a rule exists for accessibility: `/* Focus Not Obscured (2.4.11): focused elements scroll clear of the header */`.
- **Delete comments that no longer match the code** in the same change.

## 4. Formatting

- **Two-space indentation;** one declaration per line. A long value (a shadow stack, a `calc()`) breaks onto indented lines.
- **Native nesting** with an explicit `&` for states and pseudo-elements.
- **Declaration order inside a rule:**
  1. Custom properties: the private manifest and the flags.
  2. Layout and display.
  3. Sizing.
  4. Spacing.
  5. Typography.
  6. Surface and border.
  7. Position.
  8. Interaction and transition.
  9. Nested states, queries and parts.
- **`index.css` imports by layer,** under one comment per tier, each file `layer(<tier>)`. A new file goes in its tier's group.
- **Keep behaviour when tidying:** comments and formatting changes never reorder rules or change selectors. Changing the order changes the cascade.
