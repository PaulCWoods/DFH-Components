---
title: Skip Link
tier: atom
summary: A Link that lets keyboard users jump past repeated content to the main content.
tokens: skip-link
storybook: atoms-skip-link
related: [link-block-link, header]
---

# 7. Skip Link Primitive (WCAG 2.4.1 Bypass Blocks)
```html live
<a href="#main" class="skip-link skip-link--floating">Skip to main content</a>
```

It stays hidden until it has keyboard focus. Tab into the example above to see it.

## Why it exists
Someone with a mouse can go straight past a Header. Someone using a keyboard or a switch has to go through it, one stop at a time, on every page. A Skip Link gives them the same shortcut.

It's an ordinary Link to an id, so it needs no script and works even if script fails. It stays out of sight until it has focus, so it costs nobody else anything. It appears on focus because the sighted keyboard user who lands on it needs to see where they are.

## When to use
- **On every page with repeated navigation before the content** (WCAG 2.4.1).
- **Several destinations:** a `.skip-links` group, when a long page has more than one place to jump to.

## Rules
- **Put it first in `<body>`** and point it at a landmark (`<main id="main">`).

## Keyboard and screen readers
The browser provides all of this. There's nothing to script.
- **Tab,** from the top of the page, reaches it first and opens it.
- **Enter** follows it. The browser moves to the target, and the next Tab carries on from there, so the target needs no `tabindex`.
- **In a `.skip-links` group,** every Link shows while one has focus, so people can see the choices as they Tab through.

## Where It Goes and What It Points At
The in-flow bar moves the page down while it's open. The floating one sits over the page and moves nothing.
```html
<!-- In-flow bar, first in <body> -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- Floating card -->
<a href="#main" class="skip-link skip-link--floating">Skip to main content</a>

<!-- Several destinations -->
<nav class="skip-links" aria-label="Skip links">
  <ul>
    <li><a href="#main" class="skip-link">Skip to main content</a></li>
    <li><a href="#navigation" class="skip-link">Skip to navigation</a></li>
    <li><a href="#footer" class="skip-link">Skip to footer</a></li>
  </ul>
</nav>

<main id="main">…</main>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Make it the first thing in `<body>`. | Put it after the Header it is meant to skip. |
| Point it at a landmark that exists: `<main id="main">`. | Link to an id the page doesn't have. |
| Say where it goes: "Skip to main content". | Write "Skip" or "Click here". |

## Reference
It stays hidden until it has keyboard focus.

## Options
| Axis | Values |
| :--- | :--- |
| Placement | In flow (a bar that opens at the top of the page), `--floating` (slides in from the top-start corner without moving the layout) |
| Group | `.skip-links` (every Link shows while one has focus) |

### Further rules
- It is collapsed until focused, then opens to at least 48px.
- The focus ring uses the Link's text colour, so it shows on the accent fill.
