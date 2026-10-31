---
title: Code Block
tier: molecule
summary: Code to read and copy, under a bar that names the language and holds its controls.
tokens: code-block
storybook: molecules-code-block
related: [accordion, prose, button]
---

# 37. Code Block
```html playground
<div class="code-block" data-axes>
  <div class="code-block__bar">
    <span class="small-text">CSS</span>
    <button type="button" class="button"><span>Copy code</span></button>
  </div>
  <pre class="code-block__code" tabindex="0" role="group" aria-label="CSS code"><code>:where(.fern) {
  /* Plant it where the soil stays damp through the driest weeks of summer, under deciduous trees */
  color: var(--foreground, CanvasText);
}</code></pre>
</div>
---
Long lines: Scroll, Wrap=code-block--wrap
Corners: Rounded, Flush=code-block--flush
Density: Default, Compact=code-block--compact
```

## Why it exists
Code is copied more often than it's read, so what matters is that it stays exactly as written, and that taking it is one action. That's why long lines scroll by default: a wrapped line can look like two, and copying what you can't see correctly is how errors start.

It is a dark band in both themes, which marks it off from the page without another border. It sets its own colour scheme, so a Button inside it needs nothing special.

## When to use
- **For code someone will read or copy:** an example, a command, a configuration.
- **Not for a few characters in a sentence:** that is `<code>` in [Prose](12-prose.md) or a text atom with `.font-mono`.
- **Not for a keyboard shortcut:** that is a [Kbd](05-badge-status-chip-kbd.md).

## Rules
- **A scrolling block can be reached by keyboard.** Its `<pre>` takes `tabindex="0"`, `role="group"` and an `aria-label`, so the code can be scrolled and has a name. A `--wrap` block never scrolls, so it needs none of them.
- **The controls are ordinary Buttons,** plain and small through flags on the bar. The last part of the bar sits at the end.
- **Copying is the product's script.** The library ships none. Hide the Button until the script has run, and say that it worked in a `role="status"` element.
- **Code stays left to right,** in a right-to-left page too.

## In a Disclosure
```html live
<details class="accordion accordion--plain accordion--flush">
  <summary class="small-text">Code</summary>
  <div class="code-block code-block--flush">
    <div class="code-block__bar"><span class="small-text">HTML</span></div>
    <pre class="code-block__code" tabindex="0" role="group" aria-label="HTML code"><code>&lt;p class="text"&gt;Ferns like shade.&lt;/p&gt;</code></pre>
  </div>
</details>
```
A flush [Accordion](04-accordion.md) with a flush block keeps code out of the way until it's asked for. This site does the same under every example.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Name the language in the bar. | Leave people to work it out from the code. |
| Let long lines scroll when the exact layout matters. | Break a command across lines where it can be copied wrongly. |
| Give a scrolling block a focusable, named `<pre>`. | Let it scroll out of a keyboard's reach. |
| Use `--flush` in a container that draws the corners. | Put a Code Block in a Card for a second border. |

## Reference
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Lines | scroll (default), `--wrap` | |
| Corners | rounded (default), `--flush` (for a container that draws them) | |
| Density | default, `--compact` | `--ui-sizing: compact` |

Hooks: `--code-block-bg`, `--code-block-color`, `--code-block-bar-bg`, `--code-block-radius`, `--code-block-padding`.
