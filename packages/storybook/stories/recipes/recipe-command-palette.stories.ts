import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Command Palette',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Command Palette & Spotlight Recipe

The **Command Palette** recipe demonstrates a production-grade, accessible quick-search modal orchestrating core Design For Humans primitives—**Dialog**, **Card**, **Button Group**, **Empty State**, and **Skeleton**—without div soup, wrapper nesting, or utility overrides.

---

#### 1. Composed Primitives & Architecture
- **Native HTML \`<dialog>\` Container:** Features top-layer elevation, backdrop blur transitions, native Escape dismissal, and declarative \`commandfor="cmd-palette-dialog" command="show-modal"\` triggers.
- **Card Shell (\`.card.card--flush.card--ruled.card--translucent\`):** Provides the translucent panel surface, rounded elevation, and hair-line borders separating the search header, body, and footer.
- **Focus Delegation (\`.card__header.inline.gap-sm.focus-within\`):** Places the high-contrast focus ring on the outer search chrome, while the inner \`<input class="input input--flush focus-none flex-grow">\` delegates its focus ring cleanly to prevent double outlines.
- **Orchestrated Action Stack (\`.button-group.button-group--stacked.button-group--ruled.buttons-subtle\`):** Uses the button group orchestrator for the option list. Child buttons align icons to the start, text expands to fill space, and trailing badges and \`<kbd class="kbd">\` shortcuts automatically right-align.
- **Empty State Primitive (\`.empty-state.empty-state--compact\`):** Seamlessly communicates zero matches when search queries yield no results, with an accessible query reset action.
- **Skeleton Primitive (\`.skeleton\`):** Shimmer placeholders with \`aria-busy="true"\` when asynchronously fetching commands or documentation.

---

#### 2. Canonical Semantic Markup Signature

\`\`\`html
<dialog id="cmd-dialog" class="dialog" aria-label="Command palette">
  <div class="card card--flush card--ruled card--translucent wrapper wrapper--lg">
    <article class="card__content">
      
      <!-- Search Bar Header with Focus Delegation -->
      <header class="card__header inline gap-sm focus-within">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
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
        <form method="dialog">
          <button type="submit" class="button button--subtle button--icon" commandfor="cmd-dialog" command="close">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          </button>
        </form>
      </header>

      <!-- Results Body: Button Group Listbox -->
      <div class="card__body card__body--flush overflow-y-auto" style="max-block-size: 24rem;">
        <div id="cmd-listbox" role="listbox" class="button-group button-group--stacked button-group--tight button-group--ruled buttons-subtle" aria-label="Suggestions">
          <h3 class="button-group__content micro-heading text-color-muted">UI Components</h3>
          
          <button type="button" class="button is-active" role="option" id="cmd-opt-1" aria-selected="true">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
            <div class="lockup">
              <b>Button Primitive</b>
              <small class="opacity-muted">Accessible interactive buttons & toggles</small>
            </div>
            <span class="chip chip--sm"><span class="chip__text">Component</span></span>
            <kbd class="kbd">↵</kbd>
          </button>
        </div>
      </div>

      <!-- Keyboard Legend Footer -->
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
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Interactive Command Palette Modal
 * Full interactive spotlight dialog featuring real-time client-side filtering, keyboard arrow navigation,
 * dynamic empty state toggle, and declarative showModal / close invokers.
 */
export const Interactive: Story = {
  render: () => {
    const dialogId = 'interactive-cmd-dialog';
    const listboxId = 'interactive-cmd-listbox';
    const inputId = 'interactive-cmd-input';
    const emptyStateId = 'interactive-cmd-empty';

    // Interactive client-side progressive enhancement script
    queueMicrotask(() => {
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      const input = document.getElementById(inputId) as HTMLInputElement | null;
      const listbox = document.getElementById(listboxId);
      const emptyState = document.getElementById(emptyStateId);

      if (!dialog || !input || !listbox || !emptyState) return;

      // Global Cmd+K / Ctrl+K keyboard shortcut
      const handleGlobalKey = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (dialog.open) {
            dialog.close();
          } else {
            dialog.showModal();
            input.focus();
          }
        }
      };
      window.removeEventListener('keydown', (window as any)._dfhCmdHandler);
      (window as any)._dfhCmdHandler = handleGlobalKey;
      window.addEventListener('keydown', handleGlobalKey);

      // Real-time search filtering & keyboard navigation
      const getVisibleOptions = () => {
        return Array.from(listbox.querySelectorAll<HTMLButtonElement>('.button[role="option"]:not([hidden])'));
      };

      const updateActiveDescendant = (targetOption: HTMLButtonElement | null) => {
        const options = listbox.querySelectorAll<HTMLButtonElement>('.button[role="option"]');
        options.forEach((opt) => {
          opt.classList.remove('is-active');
          opt.setAttribute('aria-selected', 'false');
        });

        if (targetOption) {
          targetOption.classList.add('is-active');
          targetOption.setAttribute('aria-selected', 'true');
          targetOption.scrollIntoView({ block: 'nearest' });
          input.setAttribute('aria-activedescendant', targetOption.id);
        } else {
          input.removeAttribute('aria-activedescendant');
        }
      };

      // Input event: Filter options
      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        const options = listbox.querySelectorAll<HTMLButtonElement>('.button[role="option"]');
        const headers = listbox.querySelectorAll<HTMLElement>('.button-group__content');
        let visibleCount = 0;

        options.forEach((opt) => {
          const text = opt.textContent?.toLowerCase() || '';
          const matches = query === '' || text.includes(query);
          if (matches) {
            opt.removeAttribute('hidden');
            visibleCount++;
          } else {
            opt.setAttribute('hidden', '');
          }
        });

        // Hide headers if their section has no visible items
        headers.forEach((header) => {
          let next = header.nextElementSibling as HTMLElement | null;
          let hasVisible = false;
          while (next && !next.classList.contains('button-group__content')) {
            if (next.classList.contains('button') && !next.hasAttribute('hidden')) {
              hasVisible = true;
              break;
            }
            next = next.nextElementSibling as HTMLElement | null;
          }
          if (hasVisible) {
            header.removeAttribute('hidden');
          } else {
            header.setAttribute('hidden', '');
          }
        });

        // Toggle Empty State vs Listbox
        if (visibleCount === 0) {
          listbox.setAttribute('hidden', '');
          emptyState.removeAttribute('hidden');
          const termEl = emptyState.querySelector('.cmd-query-term');
          if (termEl) termEl.textContent = query;
          updateActiveDescendant(null);
        } else {
          listbox.removeAttribute('hidden');
          emptyState.setAttribute('hidden', '');
          const visible = getVisibleOptions();
          updateActiveDescendant(visible.length > 0 ? visible[0] : null);
        }
      });

      // Arrow navigation
      input.addEventListener('keydown', (e: KeyboardEvent) => {
        const visible = getVisibleOptions();
        if (visible.length === 0) return;

        const currentIndex = visible.findIndex((opt) => opt.classList.contains('is-active'));

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = currentIndex < visible.length - 1 ? currentIndex + 1 : 0;
          updateActiveDescendant(visible[nextIndex]);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : visible.length - 1;
          updateActiveDescendant(visible[prevIndex]);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const activeOpt = visible[currentIndex];
          if (activeOpt) {
            dialog.close();
          }
        }
      });

      // Clear search button in empty state
      const clearBtn = emptyState.querySelector<HTMLButtonElement>('.cmd-clear-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          input.dispatchEvent(new Event('input'));
          input.focus();
        });
      }
    });

    return `
      <div class="stack min-h-screen bg-color-muted flex align-items-center justify-content-center padding-xl">
        
        <!-- Showcase Launch Card -->
        <div class="card wrapper wrapper--md">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h2 class="card__title heading">Spotlight Command Palette</h2>
                <p class="card__subtitle">Accessible Design System Navigation & Search Modal</p>
              </hgroup>
            </header>
            <div class="card__body prose">
              <p>
                Press <kbd class="kbd">⌘K</kbd> anywhere on the page or click below to launch the spotlight modal. 
                Type to filter commands, use <kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> to cycle options, and hit <kbd class="kbd">↵</kbd> to select.
              </p>
            </div>
            <footer class="card__footer flex justify-content-end">
              <button 
                type="button" 
                class="button button--strong button--accent"
                commandfor="${dialogId}" 
                command="show-modal"
                onclick="document.getElementById('${dialogId}').showModal(); document.getElementById('${inputId}').focus();"
                aria-haspopup="dialog"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <use href="#Search"/>
                </svg>
                <span>Open Command Palette</span>
                <kbd class="kbd max-sm:hide"><kbd>⌘</kbd><kbd>K</kbd></kbd>
              </button>
            </footer>
          </article>
        </div>

        <!-- Spotlight Dialog Primitive -->
        <dialog id="${dialogId}" class="dialog" aria-label="Command palette">
          <div class="card card--flush card--ruled card--translucent wrapper wrapper--lg overflow-hidden">
            <article class="card__content">
              
              <!-- Search Bar Header with Focus Delegation -->
              <header class="card__header inline gap-sm">
                <span class="icon-box icon--lg" aria-hidden="true">
                  <svg class="icon text-color-muted flex-shrink-0" width="1em" height="1em" focusable="false" aria-hidden="true">
                    <use href="#Search"/>
                  </svg>
                </span>
                <input 
                  id="${inputId}"
                  type="search" 
                  class="input input--flush focus-none flex-grow" 
                  role="combobox"
                  aria-expanded="true"
                  aria-autocomplete="list"
                  aria-controls="${listboxId}"
                  aria-activedescendant="cmd-opt-button"
                  placeholder="Search components, tokens, documentation..." 
                  autocomplete="off"
                  autofocus
                />
                <form method="dialog">
                  <button type="submit" class="button button--plain button--icon button--icon-lg" commandfor="${dialogId}" command="close">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
                      <use href="#Close"/>
                    </svg>
                    <span>Close command palette</span>
                  </button>
                </form>
              </header>

              <!-- Results Body: Button Group Listbox & Empty State -->
              <div class="card__body card__body--flush overflow-y-auto" style="max-block-size: 24rem; min-block-size: 14rem;">
                
                <!-- 1. Suggestions Button Group Listbox -->
                <div 
                  id="${listboxId}" 
                  role="listbox" 
                  class="button-group button-group--stacked button-group--tight button-group--ruled buttons-subtle" 
                  aria-label="Commands and suggestions"
                >
                  <!-- Group 1: UI Components -->
                  <h3 class="button-group__content micro-heading text-color-muted">UI Components</h3>

                  <button type="button" class="button is-active" role="option" id="cmd-opt-button" aria-selected="true">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
                    <span class="lockup">
                      <b>Button Primitive</b>
                      <small class="opacity-muted">Accessible interactive buttons, variants & zero-JS toggles</small>
                    </span>
                    <span class="chip chip--sm"><span class="chip__text">Component</span></span>
                    <kbd class="kbd">↵</kbd>
                  </button>

                  <button type="button" class="button" role="option" id="cmd-opt-combobox" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                    <span class="lockup">
                      <b>Combobox Primitive</b>
                      <small class="opacity-muted">Searchable single and multi-select floating listboxes</small>
                    </span>
                    <span class="chip chip--sm"><span class="chip__text">Component</span></span>
                  </button>

                  <button type="button" class="button" role="option" id="cmd-opt-empty" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
                    <span class="lockup">
                      <b>Empty State Primitive</b>
                      <small class="opacity-muted">Accessible zero-data views, feedback & recovery actions</small>
                    </span>
                    <span class="chip chip--sm"><span class="chip__text">Component</span></span>
                  </button>

                  <button type="button" class="button" role="option" id="cmd-opt-skeleton" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
                    <span class="lockup">
                      <b>Skeleton Primitive</b>
                      <small class="opacity-muted">Loading placeholders engineered to eliminate layout shift (CLS)</small>
                    </span>
                    <span class="chip chip--sm"><span class="chip__text">Component</span></span>
                  </button>

                  <button type="button" class="button" role="option" id="cmd-opt-menu" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Navigation"/></svg>
                    <span class="lockup">
                      <b>Menu Primitive</b>
                      <small class="opacity-muted">Action lists, anchored context menus & keyboard shortcuts</small>
                    </span>
                    <span class="chip chip--sm"><span class="chip__text">Component</span></span>
                  </button>

                  <!-- Group 2: Design Tokens -->
                  <h3 class="button-group__content micro-heading text-color-muted">Design Tokens</h3>

                  <button type="button" class="button" role="option" id="cmd-opt-colors" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                    <span class="lockup">
                      <b>Color Palettes & Semantic Schemes</b>
                      <small class="opacity-muted">Tier 2 semantic surfaces, light-dark(), contrast ratios</small>
                    </span>
                    <span class="chip chip--subtle"><span class="chip__text">Tier 2</span></span>
                  </button>

                  <button type="button" class="button" role="option" id="cmd-opt-spacing" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                    <span class="lockup">
                      <b>Spacing Block Scale (--spacing-block-*)</b>
                      <small class="opacity-muted">Progressive clamp scales for responsive layouts</small>
                    </span>
                    <span class="chip chip--subtle"><span class="chip__text">Tier 2</span></span>
                  </button>

                  <!-- Group 3: Quick Actions -->
                  <h3 class="button-group__content micro-heading text-color-muted">Quick Actions</h3>

                  <button type="button" class="button" role="option" id="cmd-opt-figma" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Upload"/></svg>
                    <span class="lockup">
                      <b>Export Figma Variables</b>
                      <small class="opacity-muted">Compile DTCG JSON to Native Variables format</small>
                    </span>
                    <kbd class="kbd">⇧⌘E</kbd>
                  </button>

                  <button type="button" class="button" role="option" id="cmd-opt-audit" aria-selected="false">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Point"/></svg>
                    <span class="lockup">
                      <b>Run WCAG Accessibility Audit</b>
                      <small class="opacity-muted">Execute automated axe-core compliance scanner</small>
                    </span>
                    <kbd class="kbd">⌘A</kbd>
                  </button>
                </div>

                <!-- 2. Zero-Results Empty State (Toggled dynamically when 0 matches) -->
                <div id="${emptyStateId}" class="empty-state empty-state--compact empty-state--flush padding-block-lg" hidden aria-labelledby="cmd-empty-title">
                  <div class="empty-state__visual" aria-hidden="true">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                  </div>
                  <div class="empty-state__content">
                    <h3 id="cmd-empty-title" class="empty-state__title">No matching commands</h3>
                    <p class="empty-state__description">
                      No components or actions matching "<span class="cmd-query-term font-weight-bold"></span>". Try searching for "button", "tokens", or "menu".
                    </p>
                  </div>
                  <div class="empty-state__actions">
                    <button type="button" class="button button--plain button--sm cmd-clear-btn">
                      <span>Clear search query</span>
                    </button>
                  </div>
                </div>

              </div>

              <!-- Footer Keyboard Navigation Hints -->
              <footer class="card__footer inline-responsive inline-responsive--xs justify-content-between text-color-muted font-size-sm">
                <div class="cluster gap-sm">
                  <span><kbd class="kbd">↑↓</kbd> Navigate</span>
                  <span><kbd class="kbd">↵</kbd> Select</span>
                  <span><kbd class="kbd">ESC</kbd> Close</span>
                </div>
                <span class="max-sm:hide">Design For Humans v2.2</span>
              </footer>

            </article>
          </div>
        </dialog>

      </div>
    `;
  },
};

/**
 * 2. Search Miss / Empty State
 * Showcases the command palette when a search query yields zero matches, seamlessly integrating
 * the .empty-state.empty-state--compact primitive into the modal dialog.
 */
export const SearchMissEmptyState: Story = {
  render: () => {
    return `
      <div class="stack min-h-screen bg-color-muted flex align-items-center justify-content-center padding-xl">
        <div class="card card--flush card--ruled card--translucent wrapper wrapper--lg overflow-hidden" role="dialog" aria-label="Command palette (empty state preview)">
          <article class="card__content">
            
            <!-- Search Bar Header with active search term -->
            <header class="card__header inline gap-sm">
              <span class="icon-box" aria-hidden="true">
                <svg class="icon text-color-muted flex-shrink-0" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
              </span>
              <input 
                type="search" 
                class="input input--flush focus-none flex-grow" 
                role="combobox"
                aria-expanded="true"
                aria-autocomplete="list"
                value="datepicker-widget"
                placeholder="Search components, tokens, documentation..." 
              />
              <button type="button" class="button button--subtle button--icon" aria-label="Clear input">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
              </button>
            </header>

            <!-- Card Body: Rendered Empty State Primitive -->
            <div class="card__body card__body--flush padding-block-lg">
              <div class="empty-state empty-state--compact empty-state--flush" aria-labelledby="miss-empty-title">
                <div class="empty-state__visual" aria-hidden="true">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                </div>
                <div class="empty-state__content">
                  <h3 id="miss-empty-title" class="empty-state__title">No matching commands or components</h3>
                  <p class="empty-state__description">
                    We couldn't find any results for "<strong>datepicker-widget</strong>". Try searching for "combobox", "button", or "dialog".
                  </p>
                </div>
                <div class="empty-state__actions">
                  <button type="button" class="button button--subtle button--sm">
                    <span>Clear search</span>
                  </button>
                  <button type="button" class="button button--placeholder button--sm">
                    <span>Request component</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer Keyboard Hints -->
            <footer class="card__footer inline-responsive inline-responsive--xs justify-content-between text-color-muted font-size-sm">
              <div class="cluster gap-sm">
                <span><kbd class="kbd">ESC</kbd> Close</span>
              </div>
              <span>Design For Humans v2.2</span>
            </footer>

          </article>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Asynchronous Data Fetching / Skeleton Loading
 * Showcases the command palette during asynchronous remote data fetching using the .skeleton primitive
 * with aria-busy="true" to prevent Cumulative Layout Shift (CLS).
 */
export const LoadingState: Story = {
  render: () => {
    return `
      <div class="stack min-h-screen bg-color-muted flex align-items-center justify-content-center padding-xl">
        <div class="card card--flush card--ruled card--translucent wrapper wrapper--lg overflow-hidden" role="dialog" aria-label="Command palette (loading preview)">
          <article class="card__content">
            
            <!-- Search Bar Header -->
            <header class="card__header inline gap-sm focus-within">
              <span class="icon-box" aria-hidden="true">
                <svg class="icon text-color-muted flex-shrink-0" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
              </span>
              <input 
                type="search" 
                class="input input--flush focus-none flex-grow" 
                role="combobox"
                aria-expanded="true"
                aria-autocomplete="list"
                value="palette"
                placeholder="Search components, tokens, documentation..." 
              />
              <button type="button" class="button button--subtle button--icon" aria-label="Close command palette">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
              </button>
            </header>

            <!-- Card Body: Skeleton Placeholder Placeholders -->
            <div 
              class="card__body card__body--flush overflow-y-auto padding-block-sm" 
              style="max-block-size: 24rem;"
              aria-busy="true" 
              aria-label="Loading search results"
            >
              <p class="visually-hidden" role="status">Loading search results…</p>
              <div class="stack gap-sm padding-inline-md padding-block-sm">
                
                <!-- Skeleton Section Header -->
                <span class="skeleton" aria-hidden="true" style="--skeleton-width: 25%; --skeleton-height: 0.75rem;"></span>

                <!-- Skeleton Option Row 1 -->
                <div class="inline gap-sm align-items-center padding-block-xs">
                  <div class="skeleton skeleton--avatar" aria-hidden="true" style="--skeleton-width: 1.5rem;"></div>
                  <div class="stack gap-xs flex-grow">
                    <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
                  </div>
                  <div class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4.5rem; --skeleton-height: 1.25rem;"></div>
                </div>

                <!-- Skeleton Option Row 2 -->
                <div class="inline gap-sm align-items-center padding-block-xs">
                  <div class="skeleton skeleton--avatar" aria-hidden="true" style="--skeleton-width: 1.5rem;"></div>
                  <div class="stack gap-xs flex-grow">
                    <span class="skeleton skeleton--heading" aria-hidden="true" style="--skeleton-width: 33%;"></span>
                    <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
                  </div>
                  <div class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 4.5rem; --skeleton-height: 1.25rem;"></div>
                </div>

                <!-- Skeleton Option Row 3 -->
                <div class="inline gap-sm align-items-center padding-block-xs">
                  <div class="skeleton skeleton--avatar" aria-hidden="true" style="--skeleton-width: 1.5rem;"></div>
                  <div class="stack gap-xs flex-grow">
                    <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 66%;"></span>
                  </div>
                  <div class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></div>
                </div>

                <!-- Skeleton Section Header 2 -->
                <span class="skeleton margin-top-sm" aria-hidden="true" style="--skeleton-width: 25%; --skeleton-height: 0.75rem;"></span>

                <!-- Skeleton Option Row 4 -->
                <div class="inline gap-sm align-items-center padding-block-xs">
                  <div class="skeleton skeleton--avatar" aria-hidden="true" style="--skeleton-width: 1.5rem;"></div>
                  <div class="stack gap-xs flex-grow">
                    <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
                    <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
                  </div>
                  <div class="skeleton skeleton--badge" aria-hidden="true" style="--skeleton-width: 3rem; --skeleton-height: 1.25rem;"></div>
                </div>

              </div>
            </div>

            <!-- Footer Keyboard Hints -->
            <footer class="card__footer inline-responsive inline-responsive--xs justify-content-between text-color-muted font-size-sm">
              <div class="cluster gap-sm">
                <span>Fetching results...</span>
              </div>
              <span>Design For Humans v2.2</span>
            </footer>

          </article>
        </div>
      </div>
    `;
  },
};
