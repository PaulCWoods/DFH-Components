---
title: Toast
tier: molecule
summary: A short message that appears in a corner of the screen, built from a Banner in a live stack.
tokens: toast
storybook: molecules-toast
related: [banner, banner-dock, popover, modal-dialog]
---

# 18. Toast (Banners in a live stack)
```html live width=md
<!-- Shown in the page here; a real toast sits in a stack -->
<div class="banner banner--success banner--round toast">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#check"/></svg></span>
  <div class="banner__body">
    <p class="text font-bold">Settings saved</p>
    <p class="small-text">Your preferences have been updated.</p>
  </div>
  <button type="button" class="button button--icon banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg>
    <span class="sr-only">Dismiss</span>
  </button>
</div>
```

## Purpose
A Toast says that something just happened, without stopping what someone is doing. Its risks are that a screen reader never hears it and that it goes before it can be read, so most of what follows is about those two.

A live region only announces changes made after it exists. So the live region is the stack, which is on the page from the start, and each Toast is added to it. A Toast created along with its own live region may never be heard.

A Toast is a [Banner](11-banner.md), because a message looks the same wherever it appears. The library ships no timer: how long a message stays depends on what it says, and that is the product's decision, within the limits below.

## When to use
- **For a short message about something that just happened:** settings saved, a connection lost.
- **Not for a message that belongs to a part of the page:** that is a [Banner](11-banner.md) in the page.
- **Not for a site-wide announcement:** that is a [Banner Dock](21-banner-dock.md).
- **Not for something the person must answer before going on:** that is a [Dialog](02-modal-dialog.md).

## Rules
- **The stack is the live region.** Put it in the page from the start with `role="status"` (polite) and a label, and open it once with `showPopover()`. Add Toasts to it. Urgent messages go in a second stack with `role="alert"`. Never put a role on the Toast itself.
- **Top layer:** `popover="manual"` keeps the stack above the page. A modal Dialog makes everything outside it inert, top layer included, so a Dialog that raises Toasts holds its own stack inside it.
- **Timing (WCAG 2.2.1):** a Toast with an action never dismisses itself. Others stay at least 5 seconds and pause while hovered or focused. The library ships no timer.
- **Dismiss** by removing the Toast, or set `hidden` to fade it out.

## Keyboard and screen readers
The browser keeps the stack in the top layer and announces what's added to it. Timing and focus after dismissal are the product's script.
- **Focus stays where it is.** Showing a Toast doesn't move focus, and the script shouldn't either.
- **Tab** reaches a Toast's Buttons where the stack sits in the page's order.
- **Escape** does nothing: a `popover="manual"` stack doesn't close itself. A Toast with an action needs its own Button to dismiss it.
- **Dismissing the focused Toast** loses focus, so the script moves it somewhere useful first.
- **A screen reader** hears each Toast as it's added: a `role="status"` stack waits for a pause, and a `role="alert"` stack interrupts.

## Stack and Toast
```html
<div class="toast-stack toast-stack--bottom-end" popover="manual" role="status" aria-label="Notifications" id="toasts">
  <div class="banner banner--success banner--round toast">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#check"/></svg></span>
    <div class="banner__body">
      <p class="text font-bold">Settings saved</p>
      <p class="small-text">Your preferences have been updated.</p>
    </div>
    <button type="button" class="button button--icon banner__action">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg>
      <span class="sr-only">Dismiss</span>
    </button>
  </div>
</div>

<script>
  document.getElementById('toasts').showPopover();
</script>
```

## Urgent Stack
```html
<div class="toast-stack toast-stack--top-center" popover="manual" role="alert" aria-label="Urgent notifications">
  <div class="banner banner--strong banner--danger banner--round toast">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#circle-exclamation-point"/></svg></span>
    <div class="banner__body"><p class="text">Connection lost. Changes are not being saved.</p></div>
    <button type="button" class="button banner__action"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#rotate-ccw"/></svg><span>Retry</span></button>
  </div>
</div>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Put the stack in the page from the start and add Toasts to it. | Create the live region with the message, when it may not be announced. |
| Put `role="status"` or `role="alert"` on the stack. | Put a role on the Toast. |
| Keep a Toast with an action until it is dismissed. | Time out a Toast that has an action. |
| Give a Dialog that raises Toasts its own stack. | Raise Toasts behind a modal Dialog, where they are inert. |
| Pair an intent with an icon or words. | Leave the colour to say it alone. |

## Reference
A Toast is a [Banner](11-banner.md) with `.toast`: it gains a shadow and entry and exit transitions. `.toast-stack` places Toasts in a corner of the viewport.

## Options
| Part | Options |
| :--- | :--- |
| `.toast-stack` | Placement: `--bottom-end` (default), `--bottom-start`, `--bottom-center`, `--top-start`, `--top-center`, `--top-end` |
| `.toast` | Goes on a Banner, which keeps [its own options](11-banner.md) |

### Further rules
- Toasts usually take `banner--round`.
- With reduced motion a Toast fades in and out without moving or scaling.
- A top stack sits below a sticky [Header](33-header.md), so it never covers the Header's controls.
