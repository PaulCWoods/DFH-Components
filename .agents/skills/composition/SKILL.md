---
name: composition
description: |
  Composing screens, pages and flows from Design For Humans components: deciding whether a need is an existing component, an option, a container setting, a token or layout, laying out with the layout primitives, setting type with text atoms, density, narrow screens and states.

  Trigger immediately for:
  - Building a page, screen, form, dashboard, panel or flow with the library.
  - Choosing which component fits a need, or whether the library has one.
  - Laying things out: rows, columns, grids, sidebars, page width, responsive behaviour.
  - Feeling the urge to write custom CSS for something the library might already do.
---

# Composing with Design For Humans

A screen is built from the library's parts: atoms (Button, Badge, text), molecules (Card, Banner, Field), organisms (Dialog, Table, Header), layout primitives (Stack, Cluster, Grid, Split, Wrapper) and utilities. Each component's page on https://components.designforhumans.blog/docs/components/ gives its purpose, when to use it, its rules and examples. Read the page before using a component for the first time.

## 1. Before writing CSS, work down this list

Stop at the first answer that fits:

1. **A component already does it.** Search the docs before writing markup. For example:
   - A set of related actions is a Button Group.
   - A row of figures is Telemetry.
   - Pick-one-of-many with search is a Combobox.
   - A drawer is a Dialog with `.dialog--drawer`.
   - A collapsible section is an Accordion.
   - A notification is a Banner, or a Toast for one that comes and goes.
   - Nothing yet is an Empty State.
2. **An option sets it.** Each modifier sets one thing (one axis): prominence (`--strong`, `--subtle`, `--plain`), intent (`--accent`, `--danger`, `--warning`, `--success`, `--info`), size (`--sm`, `--lg`, for controls), density (`--compact`, for containers), and option families such as `--round`. Combine axes with two classes (`.button--subtle.button--danger`); never invent a fused one.
3. **A container sets it for its children.** Set a flag once on the container, not a modifier on each child:
   - `--button-prominence: plain` or `--button-corners: round` on a toolbar.
   - `.buttons-sm` on a group of Buttons.
   - `.ui-compact` on a dense panel.
4. **A token sets it.** Use the component's own token (`--card-radius`, `--dialog-width`, `--avatar-bg`), on the element, a region or the theme. Load the `tokens` skill.
5. **Layout or a utility places it** (section 2).
6. **Only then is it your own component.** Build it from semantic tokens, text atoms and layout primitives, in the `site` layer. Don't copy a library component's CSS to make a variant; set its tokens under a class of your own. Load the `site-css` skill before writing it.

## 2. Layout

- **One primitive per row or column,** not nested flex wrappers. Don't wrap anything without a reason: the content must make sense without a box, border or background.

| Need | Use |
| :--- | :--- |
| Things in a column, evenly spaced | `.stack` |
| Things in a row that stay on one line | `.inline` (`.inline--between`, `.inline--end`) |
| Things in a row that wrap (tags, actions) | `.cluster` |
| A column that becomes a row when there's room | `.stack` with `.@{size}:inline` |
| A main column beside a side column | `.split` (`--sidebar` keeps one row; `--end` puts the side last) |
| Repeating items in columns | `.grid` (`grid--N-col` is a maximum that reflows); `.grid--carousel` scrolls sideways |
| Page width and gutters | `.wrapper` |
| A whole app (Header, Sidebar, main) | `.app`, `.app__workspace`, `.main` |

- **Gaps come from the primitive** (`--gap`, or a `gap-*` utility), and they step down in a compact region by themselves. Don't add `.items-center` to `.inline` or `.cluster`; they already centre.
- **Respond to the container, not the viewport.** Grids, Splits and Cards reflow on their own. Container variants (`@3xl:`) beat viewport ones (`md:`); viewport queries belong to the page shell.

## 3. Type and density

- **Text size comes from a text atom** on the element, whatever the element is: `<h2 class="card__title small-heading">`. The heading level follows the outline; the class sets the look.
  - Headings: `.display-title`, `.title`, `.heading`, `.subheading`, `.small-heading`, `.micro-heading` (eyebrow).
  - Running text: `.large-text`, `.text`, `.small-text`, `.micro-text`.
  - Form labels: `.label`.
- **Colour and weight come from utilities:** `.text-muted`, `.font-bold`, `.font-mono`.
- **Sizing mode:** text is fixed by default. Put `.font-sizing-fluid` on a region that should grow with the screen (an article, a hero), and `.font-sizing-cq` on one that should grow with its container.
- **Density:** `--compact` on a container, or `.ui-compact` on any region, steps its gaps, type and controls down together. Never shrink things one by one with size classes. Hit areas stay 48px either way.

## 4. Narrow screens

- **Check every screen at 320px and 390px.** The page never scrolls sideways; a Table scrolls inside its focusable `.table-container`.
- **Navigation that won't fit** is hidden on narrow screens and offered in a drawer: a `.dialog.dialog--drawer.dialog--start` opened from a menu Button. Hide the wide version with `max-md:hide`, or `@max-3xl:hide` inside a container.
- **Labels collapse with `.hide-labels`,** which keeps the words for screen readers. Never delete the text.

## 5. States

Design each state, not just the full one:
- **Empty:** an Empty State that says what's missing and how to fill it.
- **Loading:** Skeletons in a region with `aria-busy="true"`, the Skeletons themselves `aria-hidden`, and the message in a `role="status"` line. When the layout isn't known, a Spinner (`.icon.spinner` with `#loader-circle`, always `aria-hidden`) beside the status line. A region reloading content it already shows takes `aria-busy="true"` and recedes on its own.
- **Busy Button:** `.is-busy` with `aria-disabled="true"`, and a Spinner inside it, hidden until then.
- **Print:** the library prints light, unsticks and opens everything, and hides on-screen-only parts (Skip Link, Header nav, Sidebar, Pagination, Toasts, Popovers). Add `print:hide` to actions that mean nothing on paper; `print:keep` brings back one of the library's hidden parts. Don't write a print stylesheet of your own first.
- **Error:** a danger Banner. For forms, an error summary plus each Field's error.
- **Selected, current and open:** the component's own state attributes (`aria-current`, `aria-selected`, `open`).
- **Long and short content:** names that wrap, numbers that grow, a list of one and of a hundred.

Show and hide with the `hidden` attribute.

## 6. Content and accessibility

- **The content is the interface.** Labels say what happens ("Save changes", "Delete 3 plants"), and headings say what's below them. Every icon-only control has a hidden text name.
- **Native elements first:** `<dialog>`, `popover`, `<details>`, links for navigation and Buttons for actions. Use no menu or toolbar roles.
- **Intent is never colour alone:** a Status or Banner carries an icon or words.
- **Chrome is earned:** toolbars, badges and secondary actions appear when people need them, and are the first to collapse on small screens.

Load the `accessibility` skill for the full rules.
