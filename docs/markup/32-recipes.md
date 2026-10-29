# 32. Component Recipes & Composed Patterns
When building complex UI features (menus, settings panels, user cards, notifications, search palettes, and catalog filters), AI agents MUST compose primitive components instead of introducing custom inline styles or bespoke wrappers.

## A. Anchored Context Menu Recipe
Composes `.popover` + `.menu.menu--translucent` + `.button` + `.divider` (`<li role="separator">`) + `<kbd class="kbd">`:
```html
<button 
  type="button" 
  class="button" 
  popovertarget="menu-popover"
>
  <span>Options</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div id="menu-popover" popover class="popover" style="min-inline-size: 16rem;">
  <menu class="menu menu--translucent" aria-label="Document options">
    <li class="menu__heading"><h3 class="micro-heading">Document Options</h3></li>
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
        <span>Delete Item</span>
        <kbd class="kbd">⌫</kbd>
      </button>
    </li>
  </menu>
</div>
```

## B. User Profile Card & Status Flyout Recipe
Composes `.avatar` with `data-status`, `.chip`, `.status`, and a `.button-group` in the footer:
```html
<article class="card card--compact card--translucent">
  <header class="card__header">
    <div class="avatar" data-status="online" aria-label="Jordan Lee (online)">
      <span aria-hidden="true">JL</span>
    </div>
    <hgroup class="card__hgroup">
      <h3 class="card__title">Jordan Lee</h3>
      <p class="card__subtitle">jordan.lee@dfh.design</p>
    </hgroup>
  </header>
  <div class="card__body">
    <div class="stack">
      <div class="cluster">
        <span class="chip chip--subtle"><span class="chip__text">Design Lead</span></span>
        <span class="status status--success status--plain"><span class="status__text">Online</span></span>
      </div>
      <p class="small-text">
        Lead accessibility auditor for WCAG 2.2 Level AA / AAA design systems.
      </p>
    </div>
  </div>
  <footer class="card__footer">
    <div class="button-group">
      <button type="button" class="button button--strong button--accent button--sm"><span>View Profile</span></button>
      <button type="button" class="button button--subtle button--sm"><span>Sign Out</span></button>
    </div>
  </footer>

</article>
```

## C. Settings / Preferences Flyout Recipe
Composes `.switch.switch--sm`, `.range.range--sm`, `.field`, and `.button-group--fill`:
```html
<article class="card card--compact card--translucent card--ruled" style="min-inline-size: 20rem;">
  <header class="card__header">
    <h3 class="card__title">Preferences</h3>
  </header>
  <div class="card__body">
    <div class="stack">
      <label class="switch switch--sm" style="inline-size: 100%;">
        <span class="switch__label small-text">High Contrast Mode</span>
        <input type="checkbox" role="switch" class="visually-hidden" />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>
      <div class="field">
        <div class="field__header">
          <label for="font-scale-slider" class="field__label">UI Scale</label>
          <output for="font-scale-slider" class="field__output">100%</output>
        </div>
        <input id="font-scale-slider" type="range" class="range range--sm" value="50" min="0" max="100" style="--value: 50%;" />
      </div>
    </div>
  </div>
  <footer class="card__footer card__footer--flush">
    <div class="button-group button-group--fill">
      <button type="button" class="button button--subtle"><span>Done</span></button>
    </div>
  </footer>

</article>
```

## D. Application Header & Global Navigation Landmark Recipe
Composes `.skip-link` + `.header.header--sticky.header--translucent` + `.wrapper.flex.justify-content-between` + `.button--subtle` (`aria-current="page"`) + `.badge--top-end` + `button.button--avatar` (`[data-status]`) + `.menu.menu--translucent` inside anchored `.popover` + Command Palette invoker:
```html
<!-- In-Flow Landmark Skip Link -->
<a href="#main" class="skip-link"><span>Skip to main content</span></a>

<!-- Global Header Landmark -->
<header class="header header--sticky header--translucent padding-block-sm">
  <div class="wrapper flex align-items-center justify-content-between flex-wrap gap-sm">
    <!-- Brand -->
    <a href="/" class="link inline gap-sm font-weight-bold font-size-lg underline-none">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
      <span>Design For Humans</span>
    </a>

    <!-- Primary Nav -->
    <nav aria-label="Primary navigation" class="cluster gap-none">
      <ul class="cluster gap-none">
        <li><a href="#dashboard" class="button button--subtle" aria-current="page"><span>Dashboard</span></a></li>
        <li><a href="#components" class="button button--subtle"><span>Components</span></a></li>
        <li><a href="#audit" class="button button--subtle"><span>Audit</span></a></li>
      </ul>
    </nav>

    <!-- Actions -->
    <div class="cluster align-items-center gap-sm">
      <!-- Search Invoker (Launches Command Palette) -->
      <button type="button" class="button button--subtle" commandfor="cmd-palette" command="show-modal" aria-haspopup="dialog" aria-label="Search (Press Cmd+K)">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
        <span class="button__text button__text--placeholder">Search docs... <kbd class="kbd">⌘K</kbd></span>
      </button>

      <!-- Notifications with Corner Badge -->
      <button type="button" class="button button--icon" popovertarget="header-notifs" aria-label="Notifications (3 unread)">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
        <span class="badge badge--danger badge--sm badge--top-end"><span class="badge__text">3</span></span>
      </button>

      <!-- User Avatar Trigger & Anchored Menu -->
      <button type="button" class="button avatar button--avatar button--round" popovertarget="header-user-popover" data-status="online" aria-label="Account menu (online)">
        <span>AB</span>
      </button>

      <div id="header-user-popover" popover class="popover" style="min-inline-size: 18rem;">
        <menu class="menu menu--translucent" aria-label="User account menu">
          <li class="menu__heading inline gap-sm align-items-center">
            <div class="avatar avatar--sm" data-status="online"><span>AB</span></div>
            <div class="stack gap-none">
              <span class="font-weight-medium">Alex Bennett</span>
              <span class="small-text text-color-muted">alex.bennett@dfh.design</span>
            </div>
          </li>
          <li role="separator" class="divider"></li>
          <li><button type="button" class="button"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg><span>Profile</span><kbd class="kbd">⇧⌘P</kbd></button></li>
          <li><button type="button" class="button"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg><span>Preferences</span><kbd class="kbd">⌘,</kbd></button></li>
          <li role="separator" class="divider"></li>
          <li><button type="button" class="button button--danger"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg><span>Sign Out</span></button></li>
        </menu>
      </div>
    </div>
  </div>
</header>
```

## E. Command Palette & Spotlight Modal Recipe
Composes `.dialog` + `.card.card--ruled.card--translucent` + `.card__header.inline.gap-sm.focus-within` + `.input.input--flush.focus-none` + a listbox with the menu's list structure (`.menu.menu--plain.menu--ruled`; the listbox role is right because the script supplies arrow keys) + `.empty-state.empty-state--compact`:
```html
<dialog id="cmd-palette" class="dialog" aria-label="Command palette">
  <article class="card card--ruled card--translucent wrapper wrapper--lg overflow-hidden">
    
    <!-- Search Header with Focus Delegation -->
    <header class="card__header inline gap-sm focus-within">
      <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
      <input 
        type="search" 
        class="input input--flush focus-none flex-grow" 
        role="combobox"
        aria-expanded="true"
        aria-autocomplete="list"
        aria-controls="cmd-listbox"
        aria-activedescendant="cmd-opt-1"
        placeholder="Search components, tokens, documentation..."
        autofocus
      />
      <button type="button" class="button button--subtle button--icon" commandfor="cmd-palette" command="close" aria-label="Close command palette">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>

    <!-- Results Body: a listbox laid out as a menu -->
    <div class="card__body card__body--flush card__body--scrollable max-height-sm">
      <menu id="cmd-listbox" role="listbox" class="menu menu--plain menu--ruled" aria-label="Suggestions">
        <li role="presentation" class="menu__heading micro-heading">UI Components</li>
        
        <li role="none">
        
          <button type="button" class="button button--subtle is-active" role="option" id="cmd-opt-1" aria-selected="true">
            <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
            <span class="button__text stack gap-none text-align-start flex-grow">
              <span class="font-weight-medium">Button Primitive</span>
              <span class="small-text text-color-muted">Accessible interactive buttons, states & toggles</span>
            </span>
            <span class="chip chip--sm"><span class="chip__text">Component</span></span>
            <kbd class="kbd">↵</kbd>
          </button>
        
        </li>

        <li role="none">

          <button type="button" class="button button--subtle" role="option" id="cmd-opt-2" aria-selected="false">
            <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
            <span class="button__text stack gap-none text-align-start flex-grow">
              <span class="font-weight-medium">Combobox Primitive</span>
              <span class="small-text text-color-muted">Searchable single and multi-select floating listboxes</span>
            </span>
            <span class="chip chip--sm"><span class="chip__text">Component</span></span>
          </button>

        </li>
      </menu>

      <!-- Zero-Results Search Miss State -->
      <div class="empty-state empty-state--compact empty-state--flush padding-block-lg" hidden aria-labelledby="cmd-empty-title">
        <div class="empty-state__visual" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg></div>
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
</dialog>
```

## F. Faceted Filter Sidebar & Catalog Recipe
Composes `.wrapper.wrapper--2xl` + `.split.split--sm` + `.accordion` (with multi-select `.combobox.combobox--sm` tags, checkboxes, `.range.range--sm`, and `.switch.switch--sm`) + `.chip` with `.chip__remove` + auto-filling `.grid.grid--sm` (with `.card`, `.empty-state`, and `.skeleton` loading states):
```html
<main class="wrapper wrapper--2xl padding-block-md">
  <div class="split split--sm">
    
    <!-- Sidebar Facets -->
    <aside class="stack gap-md">
      <article class="card card--compact card--ruled bg-card">
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
                      <span class="chip chip--subtle chip--sm"><span class="chip__text">TypeScript</span><button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button></span>
                    </div>
                    <input type="text" class="combobox__input" role="combobox" placeholder="Add tag..." />
                  </div>
                </div>
              </div>
            </details>

            <!-- Switch Facet -->
            <details class="accordion" open>
              <summary>Standard Strictness</summary>
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
    </aside>

    <!-- Main Content: Active Filter Bar & Card Grid -->
    <div class="stack gap-md">
      <div class="card card--compact bg-card">
        <div class="cluster gap-xs align-items-center">
          <span class="small-text text-color-muted">Active:</span>
          <span class="chip chip--subtle"><span class="chip__text">TypeScript</span><button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button></span>
        </div>
      
      </div>

      <ul class="grid grid--sm">
        <li>
          <article class="card">
            <header class="card__header inline justify-content-between align-items-center">
              <h3 class="card__title"><a href="#" class="link link--plain link--stretched">Button Primitive</a></h3>
              <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
            </header>
            <div class="card__body">
              <p class="text">Accessible button component supporting primary, subtle, and icon variants.</p>
            </div>
            <footer class="card__footer inline justify-content-between align-items-center">
              <span class="chip chip--subtle"><span class="chip__text">Forms</span></span>
              <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
            </footer>
          
          </article>
        </li>
      </ul>
    </div>

  </div>
</main>
```
