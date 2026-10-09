---
name: recipe-composition
description: |
  Architecture, decision-making exercise, and authoring guidelines for composite UI recipes (Command Palettes, App Headers, Filter Sidebars, Listbox Menus, Form Drawers, Paginations) in Design For Humans.

  Trigger immediately for:
  - Authoring or refactoring complex composite components and recipes in packages/storybook/stories/recipe-*.stories.ts.
  - Designing menu, listbox, or toolbar interactions using .button-group primitives.
  - Container-level focus styling (.focus-within / .focus-none patterns).
  - Eliminating wrapper div noise and utility overrides in favor of primitive orchestrators.
  - Evaluating structural CSS decisions (progressive rule separators, auto-push siblings, in-flow heading semantics).
---

# Recipe & Composite Component Composition Guide

## 1. Core Philosophy: Primitive Composition over Div Soup
In Design For Humans, complex composite patterns (Command Palettes, Dropdown Menus, Filter Bars, App Headers, Master-Detail Views) are constructed by **orchestrating core primitives**, NOT by assembling deeply nested wrapper `<div>`s with repetitive utility overrides.

### The Anti-Pattern vs. The Canonical Solution
```html
<!-- ❌ ANTI-PATTERN: Div soup with per-item manual overrides -->
<div class="stack stack--tight" role="listbox">
  <div class="padding-block-sm padding-inline bg-color-subtle">
    <span class="micro-heading text-color-muted">UI Components</span>
  </div>
  <a href="#button" class="button button--subtle justify-content-between radius-none" role="option">
    <div class="inline gap-sm">
      <svg class="icon"><use href="#Share"/></svg>
      <span>Button Primitive</span>
    </div>
    <span class="badge badge--sm"><span>Component</span></span>
  </a>
</div>

<!-- ✅ CANONICAL PATTERN: Orchestrated composite with clean, flat semantic markup -->
<div class="button-group button-group--stacked button-group--ruled s-button:subtle-tint" role="listbox" aria-label="Navigation suggestions">
  <h3 class="button-group__content micro-heading text-muted">UI Components</h3>
  <a href="#button" class="button button--subtle" role="option">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
    <span>Button Primitive</span>
    <span class="badge badge--sm"><span>Component</span></span>
  </a>
</div>
```

---

## 2. Recipe Decision-Making Exercise (The 6 Heuristics)

Whenever building or refactoring a composite UI recipe, run through this mental checklist:

### Heuristic 1: Can the parent container orchestrate item geometry?
* Avoid putting `.radius-none`, `.justify-content-between`, or `.w-full` on each child.
* Use container-level modifiers:
  * `.button-group--stacked`: Stretches items vertically, aligns content to start.
  * `.button-group--ruled`: Strips individual borders and border-radii, introducing hairline separators.
  * `s-button:subtle` / `s-button:subtle-tint`: Applies contextual surface styling across all child buttons automatically.

### Heuristic 2: Can sibling selectors eliminate nested flex wrappers?
* Take advantage of built-in button-group layout rules:
  * `:where(.button > span:not(.icon, .chip, .badge)) { flex-grow: 1; }` — Label automatically expands to fill available space.
  * `:where(.button__text) + :where(kbd, .kbd, .chip, .badge, .icon) { margin-inline-start: auto; }` — Trailing metadata automatically right-aligns.
* **Result:** No inner `<div class="inline gap-sm">` or `<div class="split">` is needed inside buttons.

### Heuristic 3: Are group separators and titles accessible in the document outline?
* Instead of non-semantic `<div><span>Section Title</span></div>`, use semantic heading elements (`<h3>`, `<h4>`) classed with `.button-group__content`.
* `.button-group__content` handles font metrics, text alignment, and automatically increases `padding-block-start` for non-first child headings.

### Heuristic 4: Is focus delegated cleanly to avoid double rings?
* In composite search bars, inputs inside card headers, or segmented form rows:
  * Place `:where(.focus-within)` on the outer visual container (e.g., `<header class="card__header inline gap-sm focus-within">`).
  * Place `:where(.focus-none)` on the native `<input>` or child control.
  * **Result:** The entire card header lights up with a single, high-contrast focus ring when the input receives focus, without competing inner/outer outlines.

### Heuristic 5: Are dividers progressively enhanced?
* Use layout primitive modifiers with CSS `rule` support:
  * `.grid--ruled`, `.inline--ruled`, `.stack--ruled`, `.cluster--ruled`, `.button-group--ruled`.
  * Fallback to `var(--border-width-thin, 1px)` via `@supports (rule: 1px)`.
  * Avoid manual `<hr class="divider">` repetition inside homogeneous collections unless building mixed-action toolbars.

### Heuristic 6: Is the composite accessible to assistive technology?
* Include landmark headings (use `<h2 class="visually-hidden">Search components</h2>` if the visual design has an implied header).
* Add appropriate ARIA roles (`role="listbox"`, `role="option"`, `aria-label`, `aria-selected`, `aria-current="page"`).
* Maintain WCAG 2.5.5 / 2.5.8 touch target heights (standard button height `--spacing-48` / `3rem`).

---

## 3. Canonical Recipe Examples

### A. Command Palette / Search Modal
```html
<dialog id="cmd-palette" class="dialog" aria-labelledby="cmd-title">
  <div class="card card--flush max-w-2xl bg-card">
    <article class="card__content">
      
      <!-- Search Bar Header with Focus Delegation -->
      <header class="card__header inline gap-sm focus-within">
        <h2 id="cmd-title" class="visually-hidden">Search palette</h2>
        <span class="icon-box">
          <svg class="icon text-muted" width="24" height="24" aria-hidden="true"><use href="#Search"/></svg>
        </span>
        <input 
          type="search" 
          class="input input--flush focus-none flex-grow" 
          placeholder="Search components, tokens, documentation..."
          aria-label="Search"
        />
        <button type="button" class="button button--subtle button--icon" commandfor="cmd-palette" command="close">
          <span class="visually-hidden">Close</span>
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Close"/></svg>
        </button>
      </header>

      <!-- Filtered Results Stack with Ruled Button Group -->
      <div class="card__body card__body--flush overflow-y-auto" style="max-block-size: 24rem;">
        <div class="button-group button-group--stacked button-group--ruled s-button:subtle-tint" role="listbox" aria-label="Suggestions">
          
          <h3 class="button-group__content micro-heading text-muted">UI Components</h3>
          <a href="#button" class="button button--subtle" role="option">
            <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
            <span class="button__text">Button Primitive</span>
            <span class="badge badge--sm"><span>Component</span></span>
          </a>
          <a href="#switch" class="button button--subtle" role="option">
            <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Check"/></svg>
            <span class="button__text">Switch Toggle</span>
            <span class="badge badge--sm"><span>Component</span></span>
          </a>

          <h3 class="button-group__content micro-heading text-muted">Design Tokens</h3>
          <a href="#colors" class="button button--subtle" role="option">
            <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
            <span class="button__text">Color Palettes & Semantic Schemes</span>
            <span class="chip">Tier 2</span>
          </a>
        </div>
      </div>

      <!-- Action Footer with Keyboard Shortcuts -->
      <footer class="card__footer split bg-subtle text-muted font-size--1">
        <div class="cluster gap-sm">
          <span class="inline gap-xs"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> Navigate</span>
          <span class="inline gap-xs"><kbd class="kbd">↵</kbd> Select</span>
          <span class="inline gap-xs"><kbd class="kbd">ESC</kbd> Close</span>
        </div>
        <span>Design For Humans v2.2</span>
      </footer>

    </article>
  </div>
</dialog>
```

### B. Filter Sidebar / Drawer
```html
<aside class="card card--compact card--ruled bg-card">
  <article class="card__content">
    <header class="card__header split">
      <h2 class="card__title font-size-1 font-bold">Filters</h2>
      <button type="reset" class="button button--subtle button--sm text-accent"><span>Reset all</span></button>
    </header>

    <div class="card__body stack gap-md">
      <fieldset class="fieldset stack gap-xs">
        <legend class="legend font-bold font-size-0">Category</legend>
        <div class="choices">
          <label class="choice"><input type="checkbox" class="checkbox-input" checked /><span>Components</span></label>
          <label class="choice"><input type="checkbox" class="checkbox-input" /><span>Design Tokens</span></label>
          <label class="choice"><input type="checkbox" class="checkbox-input" /><span>Utilities</span></label>
        </div>
      </fieldset>
    </div>
  </article>
</aside>
```
