import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Filter Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Faceted Filter Sidebar & Catalog Recipe

The **Filter Sidebar & Catalog** recipe demonstrates a production-grade, accessible catalog and asset browsing layout orchestrating Design For Humans primitives into a responsive 2-column faceted layout.

---

#### 1. Composed Primitives & Architecture
- **Layout Orchestrators:** Outer constraint via \`.wrapper.wrapper--2xl\`, responsive sidebar-to-main folding via \`.split.split--sm\`, and auto-filling multi-column catalog via \`.grid.grid--sm\`.
- **Sidebar Disclosures (\`.accordion\` & \`.accordion-group\`):** Native \`<details class="accordion">\` sections containing multi-select combobox tag filters, checkbox choices, range sliders, and switch toggles.
- **Multi-Select Combobox Filter (\`.combobox.combobox--sm\`):** Searchable tag selector with removable chips (\`.combobox__tags\` + \`.chip\` + \`.chip__remove\`) for rapid tag filtering.
- **Segmented Switch Facets (\`.switch.switch--sm\`):** Zero-JS binary toggles for compliance benchmarks and release maturity.
- **Dismissible Filter Chips:** Active filter bar using canonical \`.chip\` with \`.chip__remove\` triggers.
- **Empty State Primitive (\`.empty-state\`):** Accessible zero-match presentation with "Reset All Filters" when criteria produce 0 results.
- **Skeleton Primitive (\`.skeleton\`):** Responsive placeholder card grid with \`aria-busy="true"\` for asynchronous catalog data fetching.

---

#### 2. Canonical Semantic Markup Signature

\`\`\`html
<main class="wrapper wrapper--2xl padding-block-md">
  <div class="split split--sm">
    
    <!-- Sidebar Facets -->
    <aside class="stack gap-md">
      <article class="card card--compact card--ruled bg-card">
        <header class="card__header inline justify-content-between">
          <h2 class="card__title font-size-0">Filters</h2>
          <button type="reset" class="button button--subtle button--sm"><span>Reset</span></button>
        </header>

        <div class="card__body card__body--flush">
          <div class="accordion-group accordion-group--tight">
            
            <!-- Tag Combobox Facet -->
            <details class="accordion" open>
              <summary>Technologies</summary>
              <div class="padding-block-sm">
                <div class="combobox combobox--sm">
                  <div class="combobox__control">
                    <div class="combobox__tags">
                      <span class="chip chip--subtle chip--sm"><span class="chip__text">TypeScript</span><button type="button" class="chip__remove" aria-label="Remove TypeScript"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button></span>
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
                <label class="switch switch--sm">
                  <span class="switch__label">Strict AAA</span>
                  <input type="checkbox" role="switch" class="visually-hidden" checked />
                  <span class="switch__control"><span class="switch__option--off">Off</span><span class="switch__option--on">On</span></span>
                </label>
              </div>
            </details>

          </div>
        </div>
      </article>
    </aside>

    <!-- Main Catalog Grid / Content -->
    <div class="stack gap-md">
      <!-- Toolbar with active chips & sort -->
      <!-- Component Card Grid or Empty State -->
    </div>

  </div>
</main>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Faceted Catalog Layout
 * 2-column split with collapsible sidebar facets (combobox tag picker, checkboxes, range sliders, switches)
 * and an auto-filling 3-column component card grid.
 */
export const Standard: Story = {
  render: () => `
    <div class="stack gap-0 min-h-screen bg-color-muted">
      
      <!-- Top Navigation Banner -->
      <header class="header header--sticky header--translucent padding-block-sm">
        <div class="wrapper inline justify-content-between align-items-center">
          <div class="inline gap-sm align-items-center">
            <svg class="icon text-accent" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
            <h1 class="title font-size-lg margin-0">Component Catalog</h1>
          </div>
          <div class="inline gap-sm align-items-center">
            <span class="status status--success"><span class="status__text">36 Components</span></span>
          </div>
        </div>
      </header>

      <!-- Main Layout Body (.split 2-column sidebar layout) -->
      <main class="wrapper wrapper--2xl padding-block-md">
        <div class="split split--sm">
          
          <!-- Column 1: Sidebar Facets -->
          <aside class="stack gap-md">
            <article class="card card--compact card--ruled bg-card">
              <header class="card__header inline justify-content-between align-items-center">
                <h2 class="card__title font-size-0">Filters</h2>
                <button type="button" class="button button--subtle button--sm"><span>Reset</span></button>
              </header>

              <div class="card__body card__body--flush">
                <div class="accordion-group accordion-group--tight">
                  
                  <!-- Facet 1: Technology Tags (Multi-Select Combobox Primitive) -->
                  <details class="accordion" open>
                    <summary>Technology Tags</summary>
                    <div class="padding-block-sm stack gap-xs">
                      <div class="combobox combobox--sm">
                        <div class="combobox__control">
                          <div class="combobox__tags">
                            <span class="chip chip--subtle chip--sm">
                              <span class="chip__text">TypeScript</span>
                              <button type="button" class="chip__remove" aria-label="Remove TypeScript filter"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
                            </span>
                            <span class="chip chip--subtle chip--sm">
                              <span class="chip__text">ARIA 1.2</span>
                              <button type="button" class="chip__remove" aria-label="Remove ARIA 1.2 filter"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
                            </span>
                          </div>
                          <input 
                            type="text" 
                            class="combobox__input" 
                            role="combobox" 
                            placeholder="Add tag..." 
                            aria-label="Filter by technology tag" 
                          />
                        </div>
                      </div>
                    </div>
                  </details>

                  <!-- Facet 2: Compliance Standard (Checkboxes) -->
                  <details class="accordion" open>
                    <summary>WCAG Benchmark</summary>
                    <div class="choices stack gap-xs padding-block-sm">
                      <label class="choice" for="filter-aa">
                        <input type="checkbox" id="filter-aa" class="checkbox-input" checked />
                        <span>Level AA (Standard)</span>
                      </label>
                      <label class="choice" for="filter-aaa">
                        <input type="checkbox" id="filter-aaa" class="checkbox-input" checked />
                        <span>Level AAA (Strict)</span>
                      </label>
                      <label class="choice" for="filter-508">
                        <input type="checkbox" id="filter-508" class="checkbox-input" />
                        <span>Section 508</span>
                      </label>
                    </div>
                  </details>

                  <!-- Facet 3: Component Category (Checkboxes) -->
                  <details class="accordion" open>
                    <summary>Category</summary>
                    <div class="choices stack gap-xs padding-block-sm">
                      <label class="choice" for="cat-forms">
                        <input type="checkbox" id="cat-forms" class="checkbox-input" checked />
                        <span>Form Controls (8)</span>
                      </label>
                      <label class="choice" for="cat-nav">
                        <input type="checkbox" id="cat-nav" class="checkbox-input" checked />
                        <span>Navigation & Menus (6)</span>
                      </label>
                      <label class="choice" for="cat-overlays">
                        <input type="checkbox" id="cat-overlays" class="checkbox-input" />
                        <span>Overlays & Dialogs (4)</span>
                      </label>
                    </div>
                  </details>

                  <!-- Facet 4: Touch Target Scale (Range Slider) -->
                  <details class="accordion">
                    <summary>Min Touch Target</summary>
                    <div class="field padding-block-sm">
                      <div class="field__header inline justify-content-between align-items-center">
                        <label for="target-range" class="field__label">Size</label>
                        <output for="target-range" class="field__output">48px (AAA)</output>
                      </div>
                      <input id="target-range" type="range" class="range range--sm" min="24" max="56" value="48" style="--value: 75%;" />
                    </div>
                  </details>

                  <!-- Facet 5: Feature Flags (Segmented Switches) -->
                  <details class="accordion">
                    <summary>Feature Flags</summary>
                    <div class="stack gap-sm padding-block-sm">
                      <label class="switch switch--sm flex justify-content-between align-items-center">
                        <span class="switch__label">Zero-JS State</span>
                        <input type="checkbox" role="switch" class="visually-hidden" checked />
                        <span class="switch__control" aria-hidden="true">
                          <span class="switch__option switch__option--off">Off</span>
                          <span class="switch__option switch__option--on">On</span>
                        </span>
                      </label>
                      <label class="switch switch--sm flex justify-content-between align-items-center">
                        <span class="switch__label">High Contrast</span>
                        <input type="checkbox" role="switch" class="visually-hidden" />
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

          <!-- Column 2: Main Content Area -->
          <div class="stack gap-md">
            
            <!-- Filter Bar / Toolbar -->
            <div class="card card--compact bg-card">
              <div class="inline-responsive inline-responsive--md justify-content-between align-items-center gap-sm">
                
                <!-- Active Filter Dismissible Chips -->
                <div class="cluster gap-xs align-items-center">
                  <span class="small-text text-color-muted">Active:</span>
                  <span class="chip chip--subtle">
                    <span class="chip__text">Level AA</span>
                    <button type="button" class="chip__remove" aria-label="Remove Level AA filter"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
                  </span>
                  <span class="chip chip--subtle">
                    <span class="chip__text">Form Controls</span>
                    <button type="button" class="chip__remove" aria-label="Remove Form Controls filter"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
                  </span>
                  <span class="chip chip--subtle">
                    <span class="chip__text">TypeScript</span>
                    <button type="button" class="chip__remove" aria-label="Remove TypeScript filter"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
                  </span>
                </div>

                <!-- Sort Control -->
                <div class="inline gap-xs align-items-center">
                  <label for="catalog-sort" class="small-text text-color-muted white-space-nowrap">Sort by:</label>
                  <select id="catalog-sort" class="select select--sm">
                    <option value="popularity">Most Popular</option>
                    <option value="az">Name (A–Z)</option>
                    <option value="compliance">WCAG Rating</option>
                  </select>
                </div>

              </div>
            </div>

            <!-- Auto-Filling Component Grid (.grid .grid--sm) -->
            <ul class="grid grid--sm">
              
              <!-- Card 1: Combobox -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <h3 class="card__title subheading"><a href="#" class="link link--plain link--stretched">Combobox Primitive</a></h3>
                    <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
                  </header>
                  <div class="card__body">
                    <p class="text">Searchable single and multi-select floating listboxes with focus delegation and chips.</p>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="chip chip--subtle"><span class="chip__text">Forms</span></span>
                    <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                  </footer>
                </article>
              </li>

              <!-- Card 2: Empty State -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <h3 class="card__title subheading"><a href="#" class="link link--plain link--stretched">Empty State Primitive</a></h3>
                    <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
                  </header>
                  <div class="card__body">
                    <p class="text">Communicates zero-data status, search misses, and system feedback with accessible recovery actions.</p>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="chip chip--subtle"><span class="chip__text">Feedback</span></span>
                    <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                  </footer>
                </article>
              </li>

              <!-- Card 3: Menu -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <h3 class="card__title subheading"><a href="#" class="link link--plain link--stretched">Menu Primitive</a></h3>
                    <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
                  </header>
                  <div class="card__body">
                    <p class="text">Dedicated action lists and context menus with keyboard shortcuts and anchored popover integration.</p>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="chip chip--subtle"><span class="chip__text">Navigation</span></span>
                    <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                  </footer>
                </article>
              </li>

              <!-- Card 4: Skeleton -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <h3 class="card__title subheading"><a href="#" class="link link--plain link--stretched">Skeleton Primitive</a></h3>
                    <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
                  </header>
                  <div class="card__body">
                    <p class="text">Accessible shimmer placeholders engineered to eliminate layout shift (CLS) during data loading.</p>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="chip chip--subtle"><span class="chip__text">Feedback</span></span>
                    <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                  </footer>
                </article>
              </li>

              <!-- Card 5: Segmented Switch -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <h3 class="card__title subheading"><a href="#" class="link link--plain link--stretched">Segmented Switch</a></h3>
                    <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
                  </header>
                  <div class="card__body">
                    <p class="text">Binary toggle switch with anchor-positioned sliding indicator and zero-JS state management.</p>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="chip chip--subtle"><span class="chip__text">Forms</span></span>
                    <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                  </footer>
                </article>
              </li>

              <!-- Card 6: Modal Dialog -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <h3 class="card__title subheading"><a href="#" class="link link--plain link--stretched">Modal Dialog</a></h3>
                    <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
                  </header>
                  <div class="card__body">
                    <p class="text">Native top-layer dialog container with backdrop blur, discrete transitions, and escape traps.</p>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="chip chip--subtle"><span class="chip__text">Overlays</span></span>
                    <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                  </footer>
                </article>
              </li>

            </ul>

          </div>

        </div>
      </main>

    </div>
  `,
};

/**
 * 2. Zero Matches / Empty State Catalog View
 * Demonstrates the catalog layout when facet filter combinations return 0 results, seamlessly composing
 * the .empty-state primitive in the main content container with recovery actions.
 */
export const EmptyFilterResults: Story = {
  render: () => `
    <div class="stack gap-0 min-h-screen bg-color-muted">
      
      <!-- Top Navigation Banner -->
      <header class="header header--sticky header--translucent padding-block-sm">
        <div class="wrapper inline justify-content-between align-items-center">
          <div class="inline gap-sm align-items-center">
            <svg class="icon text-accent" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
            <h1 class="title font-size-lg margin-0">Component Catalog</h1>
          </div>
          <div class="inline gap-sm align-items-center">
            <span class="status status--warning"><span class="status__text">0 Results</span></span>
          </div>
        </div>
      </header>

      <!-- Main Layout Body -->
      <main class="wrapper wrapper--2xl padding-block-md">
        <div class="split split--sm">
          
          <!-- Column 1: Sidebar Facets -->
          <aside class="stack gap-md">
            <article class="card card--compact card--ruled bg-card">
              <header class="card__header inline justify-content-between align-items-center">
                <h2 class="card__title font-size-0">Filters (Active)</h2>
                <button type="button" class="button button--subtle button--sm text-accent"><span>Reset all</span></button>
              </header>

              <div class="card__body card__body--flush">
                <div class="accordion-group accordion-group--tight">
                  <details class="accordion" open>
                    <summary>Benchmark</summary>
                    <div class="choices stack gap-xs padding-block-sm">
                      <label class="choice"><input type="checkbox" class="checkbox-input" checked /><span>Strict Section 508</span></label>
                    </div>
                  </details>
                  <details class="accordion" open>
                    <summary>Category</summary>
                    <div class="choices stack gap-xs padding-block-sm">
                      <label class="choice"><input type="checkbox" class="checkbox-input" checked /><span>Audio / Video Player</span></label>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          </aside>

          <!-- Column 2: Main Area Featuring Empty State Primitive -->
          <div class="stack gap-md">
            
            <!-- Filter Bar -->
            <div class="card card--compact bg-card">
              <div class="cluster gap-xs align-items-center">
                <span class="small-text text-color-muted">Active:</span>
                <span class="chip chip--subtle"><span class="chip__text">Strict Section 508</span><button type="button" class="chip__remove" aria-label="Remove Strict Section 508"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button></span>
                <span class="chip chip--subtle"><span class="chip__text">Audio / Video</span><button type="button" class="chip__remove" aria-label="Remove Audio / Video"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button></span>
              </div>
            </div>

            <!-- Empty State Container -->
            <article class="card bg-card">
              <div class="empty-state empty-state--flush padding-block-xl" aria-labelledby="catalog-empty-title">
                <div class="empty-state__visual" aria-hidden="true">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                </div>
                <div class="empty-state__content">
                  <h3 id="catalog-empty-title" class="empty-state__title">No matching components found</h3>
                  <p class="empty-state__description">
                    No components match both "Strict Section 508" and "Audio / Video". Try clearing one or more active filters.
                  </p>
                </div>
                <div class="empty-state__actions">
                  <button type="button" class="button button--strong button--accent">
                    <span>Clear All Filters</span>
                  </button>
                  <button type="button" class="button button--placeholder">
                    <span>Request Audio/Video Primitive</span>
                  </button>
                </div>
              </div>
            </article>

          </div>

        </div>
      </main>

    </div>
  `,
};

/**
 * 3. Asynchronous Data Fetching / Skeleton Catalog Grid
 * Demonstrates the catalog layout while asynchronous component data is loading, composing
 * the .skeleton primitive across the 3-column auto-filling card grid.
 */
export const CatalogLoadingState: Story = {
  render: () => `
    <div class="stack gap-0 min-h-screen bg-color-muted">
      
      <!-- Top Navigation Banner -->
      <header class="header header--sticky header--translucent padding-block-sm">
        <div class="wrapper inline justify-content-between align-items-center">
          <div class="inline gap-sm align-items-center">
            <svg class="icon text-accent" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
            <h1 class="title font-size-lg margin-0">Component Catalog</h1>
          </div>
          <div class="inline gap-sm align-items-center">
            <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 5rem; --skeleton-height: 1.5rem;"></span>
          </div>
        </div>
      </header>

      <!-- Main Layout Body -->
      <main class="wrapper wrapper--2xl padding-block-md">
        <div class="split split--sm">
          
          <!-- Column 1: Sidebar Facets -->
          <aside class="stack gap-md">
            <article class="card card--compact card--ruled bg-card">
              <header class="card__header inline justify-content-between align-items-center">
                <h2 class="card__title font-size-0">Filters</h2>
                <button type="button" class="button button--subtle button--sm" disabled><span>Reset</span></button>
              </header>

              <div class="card__body card__body--flush">
                <div class="accordion-group accordion-group--tight">
                  <details class="accordion" open>
                    <summary>WCAG Benchmark</summary>
                    <div class="choices stack gap-xs padding-block-sm">
                      <label class="choice"><input type="checkbox" class="checkbox-input" checked disabled /><span>Level AA (Standard)</span></label>
                      <label class="choice"><input type="checkbox" class="checkbox-input" checked disabled /><span>Level AAA (Strict)</span></label>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          </aside>

          <!-- Column 2: Main Area in Loading State -->
          <div class="stack gap-md">
            
            <!-- Toolbar Skeleton -->
            <div class="card card--compact bg-card">
              <div class="inline justify-content-between align-items-center">
                <div class="cluster gap-xs align-items-center">
                  <span class="skeleton" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1rem;"></span>
                  <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4.5rem; --skeleton-height: 1.5rem;"></span>
                  <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 5.5rem; --skeleton-height: 1.5rem;"></span>
                </div>
                <span class="skeleton skeleton--button" aria-hidden="true" style="--skeleton-width: 8rem; --skeleton-height: 2rem;"></span>
              </div>
            </div>

            <!-- Auto-Filling Skeleton Card Grid -->
            <p class="visually-hidden" role="status">Loading component catalog…</p>
            <ul class="grid grid--sm" aria-busy="true" aria-label="Loading component catalog">
              
              <!-- Skeleton Card 1 -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4rem; --skeleton-height: 1.25rem;"></span>
                  </header>
                  <div class="card__body stack gap-xs">
                    <span class="skeleton skeleton--text" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></span>
                    <span class="skeleton skeleton--button" aria-hidden="true" style="--skeleton-width: 5rem; --skeleton-height: 1.75rem;"></span>
                  </footer>
                </article>
              </li>

              <!-- Skeleton Card 2 -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--heading" aria-hidden="true" style="--skeleton-width: 66%;"></span>
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4rem; --skeleton-height: 1.25rem;"></span>
                  </header>
                  <div class="card__body stack gap-xs">
                    <span class="skeleton skeleton--text" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></span>
                    <span class="skeleton skeleton--button" aria-hidden="true" style="--skeleton-width: 5rem; --skeleton-height: 1.75rem;"></span>
                  </footer>
                </article>
              </li>

              <!-- Skeleton Card 3 -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4rem; --skeleton-height: 1.25rem;"></span>
                  </header>
                  <div class="card__body stack gap-xs">
                    <span class="skeleton skeleton--text" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 66%;"></span>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></span>
                    <span class="skeleton skeleton--button" aria-hidden="true" style="--skeleton-width: 5rem; --skeleton-height: 1.75rem;"></span>
                  </footer>
                </article>
              </li>

              <!-- Skeleton Card 4 -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--heading" aria-hidden="true" style="--skeleton-width: 33%;"></span>
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4rem; --skeleton-height: 1.25rem;"></span>
                  </header>
                  <div class="card__body stack gap-xs">
                    <span class="skeleton skeleton--text" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></span>
                    <span class="skeleton skeleton--button" aria-hidden="true" style="--skeleton-width: 5rem; --skeleton-height: 1.75rem;"></span>
                  </footer>
                </article>
              </li>

              <!-- Skeleton Card 5 -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4rem; --skeleton-height: 1.25rem;"></span>
                  </header>
                  <div class="card__body stack gap-xs">
                    <span class="skeleton skeleton--text" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></span>
                    <span class="skeleton skeleton--button" aria-hidden="true" style="--skeleton-width: 5rem; --skeleton-height: 1.75rem;"></span>
                  </footer>
                </article>
              </li>

              <!-- Skeleton Card 6 -->
              <li>
                <article class="card">
                  <header class="card__header inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--heading" aria-hidden="true" style="--skeleton-width: 66%;"></span>
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4rem; --skeleton-height: 1.25rem;"></span>
                  </header>
                  <div class="card__body stack gap-xs">
                    <span class="skeleton skeleton--text" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <span class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></span>
                    <span class="skeleton skeleton--button" aria-hidden="true" style="--skeleton-width: 5rem; --skeleton-height: 1.75rem;"></span>
                  </footer>
                </article>
              </li>

            </ul>

          </div>

        </div>
      </main>

    </div>
  `,
};
