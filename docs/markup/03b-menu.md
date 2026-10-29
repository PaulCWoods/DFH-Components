# 3b. Menu

A list of actions, usually opened from a button in a popover (§3): buttons and links in rows, with optional headings and dividers. Its items are buttons (§1); the menu makes them plain and full width, puts their content at the start and a trailing shortcut, badge or status at the end. It never restyles them, so items keep the button's 48px targets, intent, density and focus ring. The audit is in `docs/audit/action-sets.md`.

| Option | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and border), `--strong` (raised, with a shadow), `--subtle` (tint, no border), `--plain` (no surface, for a menu inside a card or sidebar) | `--menu-prominence` (a popover sets `strong`) |
| Density | `--compact` (sets `--ui-sizing: compact`) | |
| Material | `--translucent` | |
| Rules | `--ruled`: rules between items, replacing the dividers where gap decorations are supported | |

- **No ARIA menu roles.** A menu is a list (`<menu>`), and Tab moves through it. `role="menu"` promises arrow keys, typeahead and focus management, which need a script the library doesn't ship. So no `role="menu"`, `menuitem`, `role="none"` or `aria-haspopup="menu"`; a popover already provides Escape and light dismiss, and `popovertarget` exposes the expanded state.
- **Items** are `<li>` holding a `.button` (or an `<a class="button">`). A destructive item is `.button--danger`, with a label that says what it does. A link to the current page has `aria-current="page"` and shows as a tint, not a filled button.
- **Checkable items** are buttons with `aria-pressed` and a check icon with `.icon--on`; the check keeps its space while off, so labels line up.
- **Headings** are a `<li class="menu__heading">` holding a heading element with a text atom (`.micro-heading`). The heading level fits the page.
- **Dividers** are `<li role="separator" class="divider"></li>`; the menu bleeds them to its edges.
- **Width** comes from the container. In a popover it is the content's, at least the invoker's.

## A. Actions in a Popover
```html
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

## B. Checkable Items
```html
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

## C. Links in a Card or Sidebar
```html
<nav aria-label="Account">
  <menu class="menu menu--plain">
    <li><a href="/profile" class="button" aria-current="page"><span>Profile</span></a></li>
    <li><a href="/billing" class="button"><span>Billing</span><span class="status status--warning status--plain"><span class="status__text">Due</span></span></a></li>
  </menu>
</nav>
```
