---
name: recipe-composition
description: |
  Architecture, decision-making exercise, and authoring guidelines for composite UI recipes (Command Palettes, App Headers, Filter Sidebars, Listbox Menus, Form Drawers, Paginations) in Design For Humans.

  Trigger immediately for:
  - Authoring or refactoring complex composite components and recipes in packages/storybook/stories/recipes/recipe-*.stories.ts.
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
  <div class="padding-block-sm padding-inline bg-color-muted">
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

### Heuristic 1: Can the parent container orchestrate item geometry & variation?
* Avoid putting `.radius-none`, `.justify-content-between`, or `.w-full` on each child.
* **Declarative Container Style Queries (Zero-Class Pattern):**
  * Set contextual properties on the parent container (e.g. `.navigation { --button-variation: subtle; --button-corners: round; }` or `--ui-density: dense;`).
  * Children adapt automatically without modifier classes (`<button class="button">...</button>`).
* **Container-level modifiers:**
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

### Heuristic 7: Are organism element hooks separated from typography atoms?
* In atomic design, organisms (`.card`, `.deck`, `.dialog`) must NOT declare competing typography systems on their inner element hooks (`.card__title`, `.card__subtitle`, `.deck__title`).
* Element hooks should only handle **structural layout**: margin resets (`margin: 0`), text wrapping (`text-wrap: balance`), minimum inline widths (`min-inline-size: 0`), and header flex expansion (`flex: 1`).
* Developers compose **Typography Atoms** (`.heading`, `.small-heading`, `.subheading`, `.micro-heading`, `.display-title`, `.text-muted`) directly on the element hooks without specificity or property collision.

---

## 3. Canonical Recipe Examples

### A. Command Palette / Search Modal (Combobox + Dialog + Empty State)
```html
<dialog id="cmd-palette" class="dialog" aria-label="Command palette">
  <div class="card card--flush card--ruled card--translucent wrapper wrapper--lg overflow-hidden">
    <article class="card__content">
      
      <!-- Combobox Search Header -->
      <header class="card__header combobox combobox--flush">
        <div class="combobox__control">
          <svg class="icon combobox__icon-start" width="22" height="22" aria-hidden="true"><use href="#Search"/></svg>
          <input 
            type="search" 
            class="combobox__input" 
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="cmd-listbox"
            aria-activedescendant="cmd-opt-1"
            placeholder="Search components, tokens, documentation..."
            autofocus
          />
          <button type="button" class="button button--subtle button--icon" commandfor="cmd-palette" command="close" aria-label="Close command palette">
            <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Close"/></svg>
          </button>
        </div>
      </header>

      <!-- Filtered Results Listbox -->
      <div class="card__body card__body--flush overflow-y-auto" style="max-block-size: 24rem;">
        <ul id="cmd-listbox" role="listbox" class="combobox__listbox combobox__listbox--static" aria-label="Suggestions">
          <header class="combobox__group-header">UI Components</header>
          
          <li role="option" id="cmd-opt-1" class="combobox__option is-active" aria-selected="true">
            <svg class="icon text-color-muted" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
            <div class="combobox__option-main">
              <span class="font-weight-medium">Button Primitive</span>
              <span class="combobox__option-desc">Accessible interactive buttons, states & toggles</span>
            </div>
            <span class="badge badge--sm"><span>Component</span></span>
            <kbd class="kbd">↵</kbd>
          </li>

          <li role="option" id="cmd-opt-2" class="combobox__option" aria-selected="false">
            <svg class="icon text-color-muted" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
            <div class="combobox__option-main">
              <span class="font-weight-medium">Combobox Primitive</span>
              <span class="combobox__option-desc">Searchable single and multi-select floating listboxes</span>
            </div>
            <span class="badge badge--sm"><span>Component</span></span>
          </li>
        </ul>

        <!-- Zero-Results Empty State -->
        <div class="empty-state empty-state--compact empty-state--flush padding-block-lg" hidden aria-labelledby="cmd-empty-title">
          <div class="empty-state__visual" aria-hidden="true"><svg class="icon" width="28" height="28"><use href="#Search"/></svg></div>
          <div class="empty-state__content">
            <h3 id="cmd-empty-title" class="empty-state__title">No matching commands</h3>
            <p class="empty-state__description">No results found for your query. Try searching for "button" or "tokens".</p>
          </div>
        </div>
      </div>

      <!-- Action Footer with Keyboard Shortcuts -->
      <footer class="card__footer inline-responsive justify-content-between text-color-muted font-size-sm">
        <div class="cluster gap-sm">
          <span><kbd class="kbd">↑↓</kbd> Navigate</span>
          <span><kbd class="kbd">↵</kbd> Select</span>
          <span><kbd class="kbd">ESC</kbd> Close</span>
        </div>
        <span>Design For Humans v2.2</span>
      </footer>

    </article>
  </div>
</dialog>
```

### B. Filter Sidebar / Faceted Catalog (Accordion + Combobox Tag Picker + Card Grid)
```html
<main class="wrapper wrapper--2xl padding-block-md">
  <div class="split split--sm">
    
    <!-- Sidebar Facets -->
    <aside class="stack gap-md">
      <div class="card card--compact card--ruled bg-card">
        <article class="card__content">
          <header class="card__header inline justify-content-between align-items-center">
            <h2 class="card__title font-size-0">Filters</h2>
            <button type="button" class="button button--subtle button--sm"><span>Reset</span></button>
          </header>

          <div class="card__body card__body--flush">
            <div class="accordion-group accordion-group--tight">
              
              <!-- Multi-Select Combobox Tag Facet -->
              <details class="accordion" open>
                <summary>Technologies</summary>
                <div class="padding-block-sm">
                  <div class="combobox combobox--sm">
                    <div class="combobox__control">
                      <div class="combobox__tags">
                        <span class="chip chip--sm"><span>TypeScript</span><button type="button" class="chip__remove">×</button></span>
                      </div>
                      <input type="text" class="combobox__input" role="combobox" placeholder="Add tag..." />
                    </div>
                  </div>
                </div>
              </details>

              <!-- Binary Switch Facet -->
              <details class="accordion" open>
                <summary>Standards</summary>
                <div class="padding-block-sm">
                  <label class="switch switch--sm flex justify-content-between align-items-center">
                    <span class="switch__label">Strict AAA</span>
                    <input type="checkbox" role="switch" class="visually-hidden" checked />
                    <span class="switch__control" aria-hidden="true">
                      <span class="switch__option switch__option--off">Off</span>
                      <span class="switch__option switch__option--on">On</span>
                    </span>
                  </label>
                </div>
              </details>

            </div>
          </div>
        </article>
      </div>
    </aside>

    <!-- Main Content: Active Filter Bar & Card Grid -->
    <div class="stack gap-md">
      <div class="card card--compact bg-card">
        <div class="card__content">
          <div class="cluster gap-xs align-items-center">
            <span class="small-text text-color-muted">Active:</span>
            <span class="chip"><span>TypeScript</span><button type="button" class="chip__remove">×</button></span>
          </div>
        </div>
      </div>

      <ul class="grid grid--sm">
        <li>
          <div class="card">
            <article class="card__content">
              <header class="card__header inline justify-content-between align-items-center">
                <h3 class="card__title"><a href="#" class="card__link">Combobox Primitive</a></h3>
                <span class="badge badge--success"><span>WCAG AAA</span></span>
              </header>
              <div class="card__body">
                <p class="text">Searchable single and multi-select floating listboxes with focus delegation and chips.</p>
              </div>
              <footer class="card__footer inline justify-content-between align-items-center">
                <span class="chip">Forms</span>
                <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
              </footer>
            </article>
          </div>
        </li>
      </ul>
    </div>

  </div>
</main>
```

### C. Anchored Context Menu (Button Trigger + Popover + Menu Primitive)
```html
<button type="button" class="button button--secondary" popovertarget="doc-menu" style="anchor-name: --menu-trigger;" aria-haspopup="menu">
  <span>Options</span>
  <svg class="icon"><use href="#ChevronDown"/></svg>
</button>

<div id="doc-menu" popover class="popover popover--anchored" style="position-anchor: --menu-trigger; min-inline-size: 16rem;">
  <menu class="menu menu--translucent" aria-label="Quick options">
    <header class="menu__heading">Actions</header>
    <li role="none"><button type="button" class="menu__item" role="menuitem"><svg class="icon"><use href="#Duplicate"/></svg><span>Duplicate</span><kbd class="kbd">⌘D</kbd></button></li>
    <li role="none"><button type="button" class="menu__item" role="menuitem"><svg class="icon"><use href="#Download"/></svg><span>Export</span><kbd class="kbd">⇧⌘E</kbd></button></li>
    <hr class="menu__separator">
    <li role="none"><button type="button" class="menu__item menu__item--destructive" role="menuitem"><svg class="icon"><use href="#Delete"/></svg><span>Delete</span><kbd class="kbd">⌫</kbd></button></li>
  </menu>
</div>
```

### D. Adaptive Double Navigation Layout (Primary Rail + Submenu Drawer + Floating Dock)
```html
<div class="app app--viewport" id="app-shell">
  <!-- 1. Mobile Compact Top Bar (< 48em) -->
  <header class="header header--sticky header--translucent md:hide">
    <div class="inline justify-content-between align-items-center inline-full">
      <div class="inline align-items-center gap-xs">
        <button type="button" class="button button--plain button--icon" id="drawer-toggle" aria-controls="app-submenu" aria-expanded="false" aria-label="Toggle navigation drawer">
          <svg class="icon"><use href="#Navigation"/></svg>
        </button>
        <strong>Console</strong>
      </div>
      <button type="button" class="button button--avatar button--round" aria-label="User profile">
        <span class="avatar avatar--sm radius-round">AM</span>
      </button>
    </div>
  </header>

  <!-- 2. Dual-Sidebar Workspace (Desktop >= 48em) -->
  <div class="app__workspace">
    <!-- Primary Slim Rail (Desktop only, 4.5rem) -->
    <aside class="sidebar sidebar--rail max-md:hide" aria-label="Main Navigation">
      <div class="sidebar__header">
        <a href="#home" class="link inline align-items-center justify-content-center" aria-label="Home">
          <div class="avatar avatar--sm radius-sm"><svg class="icon"><use href="#BrandDesignForHumans"/></svg></div>
        </a>
      </div>
      <div class="sidebar__scroller">
        <nav class="tab-list tabs-vertical tabs-plain tabs-sm" aria-label="Primary Tiers">
          <ul>
            <li><button type="button" class="tab is-active" aria-current="page" aria-label="Studio"><svg class="icon"><use href="#Radio"/></svg></button></li>
            <li><button type="button" class="tab" aria-label="Schedule"><svg class="icon"><use href="#Calendar"/></svg></button></li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Submenu Drawer (Permanent on Desktop, Slide-Over on Mobile) -->
    <aside class="sidebar sidebar--flush" id="app-submenu" aria-label="Sub-navigation">
      <header class="sidebar__header">
        <div class="inline justify-content-between align-items-center inline-full">
          <h3 class="small-heading margin-0">Studio Operations</h3>
          <button type="button" class="button button--plain button--icon button--sm md:hide" id="drawer-close" aria-label="Close drawer">
            <svg class="icon"><use href="#Close"/></svg>
          </button>
        </div>
      </header>
      <div class="sidebar__scroller">
        <nav class="tab-list tabs-vertical tabs-plain tabs-flush tabs-sm">
          <ul>
            <li><a href="#live" class="tab is-active" aria-current="page"><span class="tab__text">Live Feed</span><span class="badge badge--success badge--sm"><span>Live</span></span></a></li>
            <li><a href="#queues" class="tab"><span class="tab__text">Broadcast Queue</span></a></li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Content Canvas (Main) -->
    <main class="main main--viewport" id="main-content">
      <div class="prose">...</div>
    </main>
  </div>

  <!-- 3. Mobile Floating Bottom Tab Dock (< 48em) -->
  <div class="tabs-docked md:hide" style="z-index: var(--z-index-sticky, 100);">
    <nav class="tab-list tabs-button tabs-round tabs-floating" aria-label="Mobile Navigation">
      <button type="button" class="tab is-active" aria-current="page" aria-label="Studio"><svg class="icon"><use href="#Radio"/></svg></button>
      <button type="button" class="tab" aria-label="Schedule"><svg class="icon"><use href="#Calendar"/></svg></button>
    </nav>
  </div>

  <!-- 4. Accessible Backdrop -->
  <div id="drawer-backdrop" class="backdrop" hidden></div>
</div>
```
