---
title: Menu
tier: molecule
summary: A list of actions in rows, usually opened from a Button in a Popover.
tokens: menu
storybook: molecules-menu
related: [popover, button, button-group, divider]
---

# 3b. Menu
```html playground width=sm
<menu class="menu" data-axes aria-label="File options">
  <li><button type="button" class="button"><span>Rename</span></button></li>
  <li><button type="button" class="button"><span>Move to folder</span></button></li>
  <li><button type="button" class="button button--danger"><span>Delete file</span></button></li>
</menu>
---
Prominence: Default, Strong=menu--strong, Subtle=menu--subtle, Plain=menu--plain
Density: Default, Compact=menu--compact
```

## Purpose
Applications have actions that don't deserve a place on the page until someone asks for them: rename, move, delete. A Menu lists them in rows, with room for a heading or a shortcut.

Its items are ordinary [Buttons](01-button.md). The Menu makes them plain and full width and otherwise leaves them alone, so they keep their 48px targets, intent and focus ring, and there's nothing new to learn.

It is deliberately not an ARIA menu. `role="menu"` promises arrow keys, typeahead and focus management, which all need a script, and the library ships none. A promise it couldn't keep would be worse for keyboard and screen-reader users than a list of Buttons that Tab moves through.

## When to use
- **For a list of actions or links,** with headings and shortcuts if they help, in a Popover, Card or Sidebar.
- **Not for two or three Buttons in a row:** that is a [Button Group](14-button-group.md).
- **Not for choosing a value in a Form:** that is a [select](07-form-controls.md) or a [Combobox](28-combobox.md).
- **Not for a site's navigation hierarchy:** that is a [Navigation Tree](16b-navigation-tree.md).

## Rules
- **No ARIA Menu roles.** A Menu is a list (`<menu>`), and Tab moves through it. `role="menu"` promises arrow keys, typeahead and focus management, which need a script the library doesn't ship. So no `role="menu"`, `menuitem`, `role="none"` or `aria-haspopup="menu"`; a Popover already provides Escape and light dismiss, and `popovertarget` exposes the expanded state.
- **Items** are `<li>` holding a `.button` (or an `<a class="button">`). A destructive item is `.button--danger`, with a label that says what it does. A Link to the current page has `aria-current="page"` and shows in bold with a tint and a rail at its start, not as a filled Button, so the current item never rests on colour alone.
- **Disabled items** are `disabled` Buttons, which Tab skips. When people need to find an item and learn why they can't use it, use `aria-disabled="true"` instead: it stays in the Tab order, and the product's script must ignore its clicks and keys. Say why nearby, or in the item's description.
- **Long labels wrap** inside the item; the shortcut or status stays at the end. Keep labels to a few words, starting with a verb for actions.
- **Checkable items** are Buttons with `aria-pressed` and a check icon with `.icon--on`; the check keeps its space while off, so labels line up.

## Keyboard and screen readers
The browser provides all of this. Script only what each item does.
- **Tab and Shift+Tab** move between items, one at a time. Arrow keys do nothing here, as with any list of Buttons.
- **Enter and Space** press a Button. Enter follows a Link.
- **Escape** closes a Menu in a [Popover](03-popover.md), and returns focus to the Button that opened it.
- **A screen reader** hears each item's name and role, "pressed" from `aria-pressed` and "current page" from `aria-current`.
- **Choosing an item doesn't close the Popover.** Call `hidePopover()` from the script that does the work, or give the item `popovertarget` and `popovertargetaction="hide"`.

## Actions in a Popover
```html live cluster
<button type="button" class="button" popovertarget="doc-menu">
  <span>Options</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div id="doc-menu" popover class="popover">
  <menu class="menu" aria-label="Document options">
    <li class="menu__heading"><h3 class="micro-heading">Document</h3></li>
    <li>
      <button type="button" class="button">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
        <span>Duplicate</span>
        <kbd class="kbd">⌘D</kbd>
      </button>
    </li>
    <li>
      <button type="button" class="button">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
        <span>Export JSON</span>
        <kbd class="kbd">⇧⌘E</kbd>
      </button>
    </li>
    <li role="separator" class="divider"></li>
    <li>
      <button type="button" class="button button--danger">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
        <span>Delete document</span>
      </button>
    </li>
  </menu>
</div>
```
A Popover makes its Menu strong through a flag, so it floats with a shadow and needs no modifier.

## Checkable Items
```html live width=sm
<menu class="menu" aria-label="View">
  <li>
    <button type="button" class="button" aria-pressed="true">
      <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      <span>Line numbers</span>
    </button>
  </li>
  <li>
    <button type="button" class="button" aria-pressed="false">
      <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      <span>Word wrap</span>
    </button>
  </li>
</menu>
```
The check keeps its space while it's off, so the labels don't shift.

## Links in a Card or Sidebar
```html live width=sm
<nav aria-label="Account">
  <menu class="menu menu--plain">
    <li><a href="/profile" class="button" aria-current="page"><span>Profile</span></a></li>
    <li><a href="/billing" class="button"><span>Billing</span><span class="status status--warning status--plain"><span class="status__text">Due</span></span></a></li>
  </menu>
</nav>
```
`--plain` drops the Menu's own surface where a Card or Sidebar already draws one.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use `<menu>`, `<li>` and `.button`, and let Tab move through it. | Add `role="menu"`, `menuitem` or `aria-haspopup="menu"`. |
| Say what a destructive item does: "Delete document". | Label it "Delete" with colour as the only warning. |
| Show a checkable item with `aria-pressed` and a `.icon--on` check. | Add or remove the check icon, so labels shift. |
| Set the type of a heading with a text atom on a heading element. | Use `<header>` in a Menu. |
| Let the container set the width. | Give the Menu a width of its own. |

## Reference
A list of actions, usually opened from a Button in a [Popover](03-popover.md): Buttons and links in rows, with optional headings and Dividers. Its items are [Buttons](01-button.md); the Menu makes them plain and full width, puts their content at the start and a trailing shortcut, Badge or status at the end. It never restyles them, so items keep the Button's 48px targets, intent, density and focus ring.

## Options
| Option | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and border), `--strong` (raised, with a shadow), `--subtle` (tint, no border), `--plain` (no surface, for a Menu inside a Card or Sidebar) | `--menu-prominence` (a Popover sets `strong`) |
| Density | `--compact` (sets `--ui-sizing: compact`) | |
| Material | `--translucent` | |
| Rules | `--ruled`: rules between items, replacing the Dividers where gap decorations are supported | |

### Further rules
- **Headings** are a `<li class="menu__heading">` holding a heading element with a text atom (`.micro-heading`). The heading level fits the page.
- **Dividers** are `<li role="separator" class="divider"></li>`; the Menu bleeds them to its edges.
- **Width** comes from the container. In a Popover it is the content's, at least the invoker's.
