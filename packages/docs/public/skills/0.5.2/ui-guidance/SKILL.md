---
name: ui-guidance
description: |
  Content and interaction guidance for interfaces built with Design For Humans: what buttons, links, headings, errors and empty states should say; when to use a Button or a link, a Dialog or a page, a Toast or a Banner; forms that are quick to fill in; feedback, confirmation and undo; navigation, tables and numbers.

  Trigger immediately for:
  - Writing interface copy: labels, button text, headings, errors, hints, empty states, notifications.
  - Choosing an interaction: a dialog or a page, confirm or undo, a toast or a banner, tabs or links.
  - Designing a form, a table, a list, a settings page or a flow.
  - Reviewing a screen for clarity and ease of use.
---

<!-- Design For Humans Components 0.5.2. Updates: https://components.designforhumans.blog/docs/start/skills/ -->

# UI guidance

A component is only as clear as the words in it and the moment it appears. The library ships no copy and no behaviour scripts. These rules are for the markup and flows built with it. For which component to use, load the `composition` skill; for the accessibility rules, load the `accessibility` skill.

## 1. Words

- **A Button says what happens:** a verb and its object. Write "Save changes", "Delete 3 plants" or "Send invite", not "OK", "Submit", "Yes" or "Click here". In a confirmation, the Button repeats the action ("Delete project"), not "Confirm".
- **A link says where it goes,** and makes sense out of context, because screen readers list links on their own (WCAG 2.4.4). Write "Read the returns policy", not "Read more" or "here".
- **Headings and labels front-load the meaning:** "Billing address", not "Please enter the address for billing". People scan the first two words.
- **An error says what went wrong and how to fix it,** in the field's terms: "Enter a date after today", not "Invalid input". Never blame ("You entered…"), and never use only a code.
- **An empty state says why it's empty and what to do next:** "No plants yet. Add your first plant to start tracking watering."
- **Plain language:** short sentences, common words, and no jargon people didn't bring. Use sentence case for headings, labels and Buttons.
- **Never refer by position, shape or colour alone:** no "the button on the right" or "the green items" (WCAG 1.3.3).
- **Accessible names start with the visible words** (WCAG 2.5.3). A hidden name adds context after them ("Edit" plus a hidden "Edit, Monstera"), never different words.
- **Numbers and dates are unambiguous:** "3 Nov 2026" or the locale's format, never `03/11/26`. Show units, and keep figures aligned in tables (`.table__cell--numeric`).

## 2. Actions

- **A Button does something; a link goes somewhere.** A Button that navigates, or a link that submits, breaks expectations: the middle click, the back button, and what a screen reader announces.
- **One strong action per area.** `.button--strong.button--accent` marks the main thing to do. Everything else is the default outline, `--subtle` or `--plain`. Three strong Buttons is no emphasis at all.
- **Order:** the main action comes last in a row of form actions (Cancel, Save), and first when the actions stack on a narrow screen. Keep the order the same everywhere in a product.
- **Destructive actions** take `--danger` with a clear label. Prefer undo over a confirmation for anything reversible: delete at once and offer "Undo" in a Toast. Confirm only what can't be undone, in an `alertdialog` that names the thing ("Delete 'Spring order'?") and its consequence.
- **Don't disable a Button to explain a rule.** People can't find out why it's disabled. Leave it active and explain on press, or say what's missing beside it. If it must be disabled, use `aria-disabled="true"` so it stays focusable, and show the reason as text.
- **Icon-only is for the obvious and repeated** (close, search, more), and still has a name. Anything less familiar gets a label.

## 3. Forms

- **Ask only for what you need,** in the order people think of it. Group related fields in a Fieldset with a legend.
- **One column.** Labels sit above their fields (or beside them in an aligned form on wide screens). A placeholder never replaces a label.
- **Mark the less common case:** usually "(optional)" in the label, written by you.
- **Help people type less:**
  - The right `type` and `inputmode`.
  - `autocomplete` for personal data (WCAG 1.3.5).
  - Sensible defaults.
  - A Combobox for a long list.
  - Radios for two to five choices, so every option shows.
- **Size the field to the expected answer.** A postcode field is short; a description grows with `field-sizing: content`.
- **Validate when the user leaves the field or submits,** never on every keystroke. After a failed submit with more than one field, show an error summary at the top, focus it, link each problem to its field, and repeat each message beside the field in the same words.
- **Keep what people typed** after an error, and never clear a form on failure.

## 4. Feedback

- **Every action gets a response** within about 100ms: a pressed state, a change, or a Skeleton or progress indicator if it takes longer.
- **A Toast** confirms something that happened and needs nothing back ("Plant saved. Undo"). It leaves on its own only if it holds nothing you must act on, and never carries the only copy of an error.
- **A Banner** stays until it's dealt with: an error, a warning, a system message. Put it near what it's about: page-wide at the top, or in the Card or form it concerns.
- **A Status** is a lasting state of one thing (Overdue, Draft, Live), not a message.
- **Progress:** use a Progress bar when you know how much is left, Skeletons when the layout is known and the content isn't, a Spinner when neither is, and a short status line ("Loading 24 plants…") to announce it.
- **An action in progress** keeps its Button: `.is-busy` with `aria-disabled="true"` shows the Button's Spinner over its label, so it keeps its size and name. Never swap the label for "Saving…".
- **Success is quiet; failure is clear.** Don't celebrate routine saves. Do explain every failure and offer the way out.

## 5. Dialogs, popovers and pages

- **A Dialog interrupts,** so use it only for a short task that must be finished or abandoned before carrying on (confirm, rename, a quick form). Anything longer, or that people will want to link to or come back to, is a page.
- **A drawer** (`.dialog--drawer`) holds navigation on a narrow screen, or details and settings beside the content.
- **A Popover** holds a little more about something, or a few related controls, without leaving the place: filters, a hovercard, a picker.
- **A Tooltip** names or briefly describes a control. Nothing in it may be needed, because it doesn't show on touch.
- **Never stack Dialogs.** If a Dialog needs another, the first one is a page.

## 6. Navigation and structure

- **Show where people are:** `aria-current` on the current page in the Navigation Tree, Header nav and Breadcrumb, with a visible cue beyond colour.
- **Tabs switch between views of one thing,** each with its own panel. Moving between pages is navigation (links); switching how a list is shown is a joined Button Group.
- **Keep the main action and navigation in the same place** on every screen. Consistency beats cleverness (WCAG 3.2.3, 3.2.4).
- **Paginate long lists** or load more on request. Infinite scroll hides the footer and loses people's place.
- **Settings save as they change** (Switches) or with one Save for the page, never a mix on the same screen.

## 7. Tables and lists

- **A Table is for comparing across rows and columns.** A list of things to read or act on is a list of Cards or a Navigation Tree.
- **Give every Table a caption** saying what it holds, with headers on columns (`<th scope="col">`) and on the row's identifying cell (`scope="row"`).
- **Align numbers to the end** with tabular figures, align text to the start, and keep units in the header ("Price (£)").
- **Sorting** says its direction with `aria-sort` on the header; filtering shows the result count in a `role="status"` line.
- **Row actions:** put a few as Buttons in the row's last cell, and more in a Menu. For actions on several selected rows, use Batch Actions.
