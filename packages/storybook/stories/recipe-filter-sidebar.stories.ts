import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Filter Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Faceted Filter & Search Catalog Recipe** demonstrates a responsive e-commerce or asset catalog layout composed of:
- **Layout Helpers:** Uses \`.wrapper.wrapper--2xl\` for outer page constraint, the \`.split.split--sm\` primitive for responsive sidebar $\\leftrightarrow$ main grid folding, and \`.grid.grid--sm\` for responsive card rendering without media queries.
- **Sidebar Facets:** Collapsible \`<details class="accordion">\` sections containing price range sliders, role checkboxes, and status switches.
- **Interactive Action Bar:** Search field, active filters \`.cluster\` with dismissible \`.badge\` items, and sort select dropdown.
- **Clean Elevation:** Uses subtle card elevation and background surfaces rather than dense heavy borders.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Faceted Catalog Layout
 * 2-column split with responsive sidebar filters and 3-column auto-filling card grid.
 */
export const Standard: Story = {
  render: () => `
    <div class="stack gap-0 min-h-screen bg-color-subtle">
      
      <!-- Top Navigation Banner -->
      <header class="header header--sticky header--translucent padding-block-sm">
        <div class="wrapper inline justify-content-between">
          <div class="inline gap-sm">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Share"/></svg>
            <h1 class="title font-size-lg margin-0">Component Catalog</h1>
          </div>
          <div class="inline gap-sm">
            <span class="badge badge--success"><span>36 Components</span></span>
          </div>
        </div>
      </header>

      <!-- Main Layout Body (.split 2-column sidebar layout) -->
      <main class="wrapper wrapper--2xl padding-block-md">
        <div class="split split--sm">
          
          <!-- Column 1: Sidebar Facets -->
          <aside class="stack gap-md">
            <div class="card">
              <article class="card__content">
                <header class="card__header inline justify-content-between">
                  <h2 class="card__title font-size-0">Filters</h2>
                  <button type="button" class="button button--subtle button--sm"><span>Reset</span></button>
                </header>

                <div class="card__body card__body--flush">
                  <div class="stack stack--tight">
                    
                    <!-- Facet 1: Compliance Standard -->
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

                    <!-- Facet 2: Component Category -->
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

                    <!-- Facet 3: Touch Target Scale -->
                    <details class="accordion">
                      <summary>Min Touch Target</summary>
                      <div class="field padding-block-sm">
                        <div class="field__header inline justify-content-between">
                          <label for="target-range" class="field__label">Size</label>
                          <output for="target-range" class="field__output">48px (AAA)</output>
                        </div>
                        <input id="target-range" type="range" class="range" min="24" max="56" value="48" style="--value: 75%;" />
                      </div>
                    </details>

                  </div>
                </div>
              </article>
            </div>
          </aside>

          <!-- Column 2: Main Content Area -->
          <div class="stack gap-md">
            
            <!-- Filter Bar / Toolbar -->
            <div class="card card--compact">
              <div class="card__content">
                <div class="inline-responsive inline-responsive--md justify-content-between gap-sm">
                  
                  <!-- Active Filter Chips -->
                  <div class="cluster gap-xs align-items-center">
                    <span class="small-text text-color-muted">Active:</span>
                    <span class="badge badge--accent">
                      <span>Level AA</span>
                      <button type="button" class="button button--subtle button--icon button--sm" aria-label="Remove Level AA filter">×</button>
                    </span>
                    <span class="badge badge--accent">
                      <span>Form Controls</span>
                      <button type="button" class="button button--subtle button--icon button--sm" aria-label="Remove Form Controls filter">×</button>
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
            </div>

            <!-- Auto-Filling Component Grid (.grid .grid--sm) -->
            <ul class="grid grid--sm">
              
              <!-- Card 1 -->
              <li>
                <div class="card">
                  <article class="card__content">
                    <header class="card__header inline justify-content-between">
                      <h3 class="card__title"><a href="#" class="card__link">Button Primitive</a></h3>
                      <span class="badge badge--success"><span>WCAG AAA</span></span>
                    </header>
                    <div class="card__body">
                      <p class="text">Accessible button component supporting primary, subtle, destructive, and responsive icon variants.</p>
                    </div>
                    <footer class="card__footer inline justify-content-between">
                      <span class="chip">Forms</span>
                      <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                    </footer>
                  </article>
                </div>
              </li>

              <!-- Card 2 -->
              <li>
                <div class="card">
                  <article class="card__content">
                    <header class="card__header inline justify-content-between">
                      <h3 class="card__title"><a href="#" class="card__link">Segmented Switch</a></h3>
                      <span class="badge badge--success"><span>WCAG AAA</span></span>
                    </header>
                    <div class="card__body">
                      <p class="text">Binary toggle switch with anchor-positioned sliding indicator and zero-JS state management.</p>
                    </div>
                    <footer class="card__footer inline justify-content-between">
                      <span class="chip">Forms</span>
                      <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                    </footer>
                  </article>
                </div>
              </li>

              <!-- Card 3 -->
              <li>
                <div class="card">
                  <article class="card__content">
                    <header class="card__header inline justify-content-between">
                      <h3 class="card__title"><a href="#" class="card__link">Navigation Tabs</a></h3>
                      <span class="badge badge--accent"><span>WCAG AA</span></span>
                    </header>
                    <div class="card__body">
                      <p class="text">WAI-ARIA compliant horizontal and vertical tabs with hardware-accelerated anchor indicators.</p>
                    </div>
                    <footer class="card__footer inline justify-content-between">
                      <span class="chip">Navigation</span>
                      <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                    </footer>
                  </article>
                </div>
              </li>

              <!-- Card 4 -->
              <li>
                <div class="card">
                  <article class="card__content">
                    <header class="card__header inline justify-content-between">
                      <h3 class="card__title"><a href="#" class="card__link">Modal Dialog</a></h3>
                      <span class="badge badge--success"><span>WCAG AAA</span></span>
                    </header>
                    <div class="card__body">
                      <p class="text">Native top-layer dialog container with backdrop blur, discrete transitions, and escape traps.</p>
                    </div>
                    <footer class="card__footer inline justify-content-between">
                      <span class="chip">Overlays</span>
                      <button type="button" class="button button--subtle button--sm"><span>View Docs</span></button>
                    </footer>
                  </article>
                </div>
              </li>

            </ul>

          </div>

        </div>
      </main>

    </div>
  `,
};
