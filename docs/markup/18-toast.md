# 18. Toast (Banners in a Live Stack)

A toast is a banner (§11) with `.toast`: it gains a shadow and entry and exit transitions. `.toast-stack` places toasts in a corner of the viewport. The audit is in `docs/audit/announcements.md`.

- **The stack is the live region.** Put it in the page from the start with `role="status"` (polite) and a label, and open it once with `showPopover()`. Add toasts to it. Urgent messages go in a second stack with `role="alert"`. Never put a role on the toast itself.
- **Top layer:** `popover="manual"` keeps the stack above the page. A modal dialog makes everything outside it inert, top layer included, so a dialog that raises toasts holds its own stack inside it.
- **Timing (WCAG 2.2.1):** a toast with an action never dismisses itself. Others stay at least 5 seconds and pause while hovered or focused. The library ships no timer.
- **Dismiss** by removing the toast, or set `hidden` to fade it out.
- **Placements:** `--bottom-end` (default), `--bottom-start`, `--bottom-center`, `--top-start`, `--top-center`, `--top-end`.
- Toasts usually take `banner--round`.

## A. Stack and Toast
```html
<div class="toast-stack toast-stack--bottom-end" popover="manual" role="status" aria-label="Notifications" id="toasts">
  <div class="banner banner--success banner--round toast">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
    <div class="banner__body">
      <p class="text font-bold">Settings saved</p>
      <p class="small-text">Your preferences have been updated.</p>
    </div>
    <button type="button" class="button button--icon banner__action">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      <span class="sr-only">Dismiss</span>
    </button>
  </div>
</div>

<script>
  document.getElementById('toasts').showPopover();
</script>
```

## B. Urgent Stack
```html
<div class="toast-stack toast-stack--top-center" popover="manual" role="alert" aria-label="Urgent notifications">
  <div class="banner banner--strong banner--danger banner--round toast">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Error"/></svg></span>
    <div class="banner__body"><p class="text">Connection lost. Changes are not being saved.</p></div>
    <button type="button" class="button banner__action"><span>Retry</span></button>
  </div>
</div>
```
