---
title: Lockup
tier: molecule
summary: A primary line of text with a secondary one under it, such as a name and an email.
tokens: lockup
storybook: molecules-lockup
related: [avatar, thumbnail, text-heading]
---

# 6b. Lockup
```html live
<span class="lockup">
  <span class="small-heading">Full sun</span>
  <span class="small-text text-muted">Mycorrhizal fungi and leaf mulch</span>
</span>
```

## Purpose
Interfaces are full of things with two lines: a name and an email, a plot and its soil. Without a shared part, each one gets its own small layout, and they drift apart.

A Lockup has no options, on purpose. It stacks its lines and lets them shrink, which is the only part that's hard to get right in a tight row. Everything else is decided elsewhere: type by the text atom on each line, alignment by a text utility, and what sits beside it by a layout primitive.

## When to use
- **For two lines that belong together:** in a list, a Table cell, a Button or beside an [Avatar](06-avatar.md) or [Thumbnail](06c-thumbnail.md).
- **Not for one line:** that is a [text atom](20-text-heading.md) alone.
- **Not for a title, body and actions:** that is a [Card](10-card.md).

## Rules
- **Lines** take any text atom: `.small-heading` over `.small-text.text-muted` in lists and Tables, `.heading` over `.text` for a profile. The Lockup sets no type.
- **Truncation:** add `.truncate` to a line; the Lockup and its lines have `min-inline-size: 0`, so they shrink in flex and grid.

## A name beside an Avatar
An Avatar beside a Lockup. The name is visible, so the Avatar is decorative.
```html live
<div class="inline">
  <span class="avatar avatar--sm" aria-hidden="true">MC</span>
  <span class="lockup">
    <span class="small-heading">Marcus Chen</span>
    <span class="small-text text-muted">mchen@urbanmail.net</span>
  </span>
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Put a text atom on each line. | Use `<b>` and `<small>` for the lines. |
| Hide the Avatar beside a visible name with `aria-hidden`. | Make a screen reader say the name twice. |
| Add `.truncate` to a line that may run long. | Set a width on the Lockup to stop it pushing its container wider. |
| Use `.text-center` or `.text-end` on the Lockup. | Look for a `lockup--*` modifier. |

## Reference
A primary line with a secondary one under it: a name and an email, a plot and its soil. A molecule that stacks its lines and lets them truncate; type comes from text atoms on the lines.

## Options
| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.lockup` | none | `--lockup-gap` |

### Further rules
- **Alignment:** `.text-center` or `.text-end` on the Lockup.
- **Spacing:** `--lockup-gap` (none by default; the lines' leading spaces them).
- **Inline:** `<span class="lockup">` is inline-flex, so it can sit in a Button or a sentence.
- **No options.** The stack and truncation are all it does.
