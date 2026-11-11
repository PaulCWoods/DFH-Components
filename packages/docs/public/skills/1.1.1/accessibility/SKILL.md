---
name: accessibility
description: |
  How to build accessible interfaces with the Design For Humans component library: WCAG 2.2 AA as the floor, native HTML before ARIA, the library's markup for each pattern, target sizes, focus, contrast, forced colours and motion.

  Trigger immediately for:
  - Writing or reviewing markup that uses the library (any `.button`, `.card`, `.dialog`, `.field` and so on).
  - Accessibility questions or audits against WCAG 2.2 AA / AAA.
  - Interactive patterns: buttons, links, dialogs, popovers, tooltips, menus, disclosures, comboboxes, forms, tabs, toasts.
  - Focus, target size, contrast, colour-only meaning, forced colours, reduced motion or transparency.
  - Screen reader names, descriptions, live regions and landmarks.
---

<!-- Design For Humans Components 1.1.1. Updates: https://components.designforhumans.blog/docs/start/skills/ -->

# Accessibility with Design For Humans

WCAG 2.2 AA is the floor. AAA must always be reachable with the library's own options and tokens, without custom code: the 48px target default and the high-contrast palette are two examples. Native HTML comes first; ARIA is added only where no element does the job.

The docs site (https://components.designforhumans.blog/docs/) has a **Keyboard and screen readers** section on every component with behaviour. Read it before writing a component's markup.

## 1. Native elements, no imitation

- **Actions are `<button type="button">`**, navigation is `<a href>`. Never a clickable `<div>`, `<span>` or `<a href="#">`.
- **Dialogs** are `<dialog class="dialog">` opened with `showModal()`, or with `commandfor="{id}" command="show-modal"` on a Button. The browser traps focus, closes on Escape and makes the page inert, so add no focus trap and no `aria-modal`. Name it with `aria-labelledby` pointing at its title. A confirmation takes `role="alertdialog"`. Close with `commandfor="{id}" command="close"`.
- **Popovers** use the `popover` attribute and `popovertarget`; the invoker is their anchor. A popover that isn't a dialog takes no `aria-haspopup="dialog"`.
- **Tooltips** open with `interestfor` only, never `popovertarget`. A Tooltip is an extra: it never holds the only copy of anything, the control keeps its own name, and it never holds a link or button (that's a hovercard Popover). As a label it is `aria-hidden`; as a description the control points at it with `aria-describedby`.
- **Disclosures** are `<details>`/`<summary>` (the Accordion). Don't rebuild them with `aria-expanded`.
- **Menus** are a `<menu>` of `.button`s in `<li>`s with **no** menu roles (`role="menu"`, `menuitem`, `aria-haspopup="menu"`). A set of related controls is a labelled `role="group"`, never `role="toolbar"`. Both roles promise arrow-key handling the library ships no script for.
- **A view switcher with no panel** is a joined Button Group of radio inputs, not Tabs.
- **Forms grow with `field-sizing: content`**, not a script.

## 2. Names, descriptions and text

- **Icon-only controls** get their name from text in the DOM: `<span class="sr-only">Delete</span>` inside the Button. Prefer it to `aria-label`, because page translation and voice control read DOM text reliably and attributes unreliably.
- **Icons** inside a named control are `aria-hidden="true"`. A meaningful icon on its own needs a name.
- **Icon-only needs a visible way to learn what it does** that doesn't rely on hover, since tooltips don't work on touch.
- **Labels are real `<label for>`** elements. Write "(optional)" in the label of an optional field; the library generates no "Required".
- **Hints and errors** are tied with `aria-describedby`, and an invalid control has `aria-invalid="true"`. Server-rendered errors take no `role="alert"`.
- **Content is part of the interface:** a Button says what it does ("Save changes", not "OK"), a link says where it goes.

## 3. Forms and validation

- **One way to validate.** Either the browser checks the form (`required`, `type`, `pattern`) and shows its own messages, or the form has `novalidate` and shows the library's errors. Never both.
- **A failed submit of more than one field gets an error summary:** a danger Banner at the top of the form with `tabindex="-1"`. It counts the problems and links to each field. Move focus to it, and start the page title with "Error:". It takes no `role="alert"`, because the focus move reads it out.
- **Style errors with `:user-invalid`**, never `:invalid`, so a field isn't red before anyone has touched it.

## 4. State and status

- **Intent is never colour alone (1.4.1).** Every accent, info, success, warning or danger variant also carries an icon, a role or words. Write `.status--danger` with its icon and "Overdue", not a red dot.
- **Current and selected items** use `aria-current` (`page`, `step`, `true`) or `aria-selected`, and look different from their neighbours by more than a tint: a rail, a weight, an icon or a fill, at 3:1, that still shows in forced colours.
- **Disabled:** native `disabled` takes the control out of the tab order. `aria-disabled="true"` keeps it focusable, so people can find it and its reason. The library styles both.
- **Live regions exist before their content.** Toasts go in a `.toast-stack` with `role="status"` (or `role="alert"` for urgent ones). Put a search or filter result count in a `role="status"` element that's on the page from the start. An Empty State is not a live region.
- **Combobox:** focus stays on the input (`role="combobox"`, `aria-expanded`, `aria-controls`). Its list is `popover="manual"`, and the active option is set with `aria-activedescendant`. Options carry `role="option"` and `aria-selected`, and never `tabindex`.

## 5. Page structure

- **One `<header>` banner, one `<main id="main">`,** and a `<a href="#main" class="skip-link">Skip to main content</a>` before the Header (2.4.1).
- **Two or more `<nav>` or `<aside>` on a page each need a distinct label:** `aria-label`, or `aria-labelledby` pointing at a visible heading.
- **Headings follow the outline,** whatever they look like. The level comes from the element, the size from a text atom: an `<h2 class="small-heading">` is right in a card.
- **Text atoms set the type** (`.heading`, `.text`, `.small-text`); never shrink text below the scale, and let it reflow. Every component must survive 200% text zoom, 400% reflow (320px) and text-spacing overrides.

## 6. Targets and pointers (2.5.5, 2.5.8)

- **Every control has a 48px hit area by default,** on every size. `--sm` controls keep the 48px target through a transparent buffer.
- **Fine pointers are the product's choice,** never automatic: `.fine:targets-sm` on `<html>` drops targets to 32px where the primary pointer is fine. Nothing ever goes below 24px.
- **A bar is never shorter than its targets.** A Header bar, tab list, Batch Actions or Pagination is at least `--spacing-target-min` tall, so compact density tightens padding and type, not the target.
- **Nothing clips a hit area, and no hit area covers another control.** Text fields can't take a buffer, so a `--sm` text field is 32px. Links stacked in a list sit 24px apart; make them block links for 48px.

## 7. Focus (2.4.7, 2.4.11, 2.4.13)

- **Every focusable element shows a ring:** `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);` at 3:1 against what's around it. The library's components already do; your own must too.
- **Never `outline: none`** without a replacement on `:focus-visible`.
- **Focus moves with intent:** into an opened dialog, back to the invoker when it closes, and to the error summary after a failed submit. It never lands on something hidden or behind a sticky bar: a sticky Header sets `scroll-padding-block-start` on the page so focused and linked items scroll clear of it.

## 8. Colour, contrast and preferences

- **Text is 4.5:1** (3:1 at 24px, or 18.66px bold). **Controls, their boundaries and focus are 3:1 (1.4.11).** A borderless or subtle control still gives its boundary 3:1 in high contrast and forced colours.
- **Use the semantic colour roles** (`--foreground`, `--foreground-muted`, `--surface-card`, `--border-color-control`). Every role pairing is contrast-checked in light, dark, inverted and high contrast. Raw palette steps aren't, so never use them in a component.
- **`prefers-contrast: more`** is built in: roles move further apart, and translucent fills turn solid.
- **Forced colours:** borders, fills that carry meaning and the selected state must survive. Test it; add a `@media (forced-colors: active)` block only where something is lost, using system colours (`CanvasText`, `Highlight`).
- **`prefers-reduced-motion: reduce`** takes every duration to `--duration-none`; drop scale and slide effects, keep opacity fades.
- **`prefers-reduced-transparency: reduce`** turns translucent materials solid.

## 9. Testing

- Axe (in Storybook and on the docs site) catches the mechanical failures. Keyboard and screen reader passes catch the rest.
- **Standards decide, not the tool.** When axe flags markup, check it against the HTML and ARIA specs. If the specs allow it, keep the markup and turn that rule off with the reason written down (an `<aside>` inside `<main>` is the known case).
- In the library's own repo, `npm run check:targets` (hit areas, bars, forced colours), `check:focus` (visible focus on every stop) and `check:layout` (reachable at 320px) run on every story.
