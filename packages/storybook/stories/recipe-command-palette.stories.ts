import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Command Palette',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Spotlight & Command Palette Recipe** demonstrates a production-grade, accessible search modal composed of:
- **Native HTML \`<dialog>\` Container:** Features top-layer backdrop transitions, Escape dismiss, and declarative \`commandfor="command-palette-dialog" command="show-modal"\` triggers.
- **Layout Helpers:** Uses \`.wrapper.wrapper--lg\` for responsive width bounding, \`.stack\` for vertical result lists, \`.inline\` for search inputs, and \`.cluster\` for keyboard hints.
- **Composed Primitives:** Clean \`.card.card--ruled.card--translucent\` shell, \`.input.input--plain\` search input, \`.badge\` and \`.chip\` for keyboard shortcuts (\`⌘K\`, \`ESC\`, \`↵\`), and \`.button-group\` for quick actions.
- **Zero-JS Declarative Triggers:** Uses declarative invokers where supported, falling back gracefully to standard \`HTMLDialogElement.showModal()\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Interactive Command Palette Modal
 * Click "Open Command Palette" or press Cmd+K to launch the spotlight dialog.
 */
export const Interactive: Story = {
  render: () => {
    const dialogId = 'command-palette-dialog';

    return `
      <div class="stack min-h-screen bg-color-subtle flex align-items-center justify-content-center padding-xl">
        
        <!-- Showcase Launch Card -->
        <div class="card wrapper wrapper--md">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h2 class="card__title">Spotlight Command Palette</h2>
                <p class="card__subtitle">Accessible Design System Navigation</p>
              </hgroup>
            </header>
            <div class="card__body">
              <p class="text">
                Press <kbd class="kbd"><span>⌘K</span></kbd> anywhere on the page or click below to trigger the modal dialog.
              </p>
            </div>
            <footer class="card__footer flex justify-content-end">
              <button 
                type="button" 
                class="button button--primary"
                commandfor="${dialogId}" 
                command="show-modal"
                onclick="document.getElementById('${dialogId}').showModal();"
                aria-haspopup="dialog"
              >
                <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                  <use href="#Search"/>
                </svg>
                <span>Open Command Palette</span>
                <span class="badge badge--round badge--sm hide--below-sm"><span>⌘K</span></span>
              </button>
            </footer>
          </article>
        </div>

        <!-- Spotlight Dialog Primitive -->
        <dialog id="${dialogId}" class="dialog" aria-label="Quick command navigation">
          <div class="card card--ruled card--translucent wrapper wrapper--lg overflow-hidden">
            <article class="card__content">
              
              <!-- Search Bar Header -->
              <header class="card__header inline gap-sm focus-within-none">
                <h2 class="visually-hidden">Search components</h2>
                <span class="icon-box">
                  <svg class="icon flex-shrink-0 text-color-muted" width="24" height="24" aria-hidden="true" focusable="false">
                    <use href="#Search"/>
                  </svg>
                </span>
                <input 
                  type="search" 
                  class="input input--flush focus-none" 
                  placeholder="Search components, tokens, documentation..." 
                  autofocus
                />
                <form method="dialog">
                  <button type="submit" class="button button--subtle button--icon" commandfor="${dialogId}" command="close" aria-label="Close command palette">
                    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                      <use href="#Close"/>
                    </svg>
                  </button>
                </form>
              </header>

              <!-- Filtered Navigation Results -->
              <div class="card__body card__body--flush overflow-y-auto padding-top" style="max-block-size: 24rem;">
                <div class="button-group button-group--stacked button-group--ruled s-button:subtle-tint" role="listbox" aria-label="Navigation suggestions">
                  
                  <!-- Section 1: Components -->
                  <h3 class="button-group__content micro-heading text-muted">
                    UI Components
                  </h3>

                  <a href="#button" class="button button--subtle" role="option">
                      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
                      <span>Button Primitive</span>
                    <span class="badge badge--sm"><span>Component</span></span>
                  </a>

                  <a href="#switch" class="button button--subtle" role="option">
                      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Check"/></svg>
                      <span>Switch Toggle</span>
                    <span class="badge badge--sm"><span>Component</span></span>
                  </a>

                  <a href="#tabs" class="button button--subtle" role="option">
                      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Duplicate"/></svg>
                      <span class="button__text">Tabs Navigation</span>
                    <span class="badge badge--sm"><span>Component</span></span>
                  </a>

                  <!-- Section 2: Tokens -->
                  <h3 class="button-group__content micro-heading text-muted">
                    Design Tokens
                  </h3>

                  <a href="#colors" class="button button--subtle" role="option">
                      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
                      <span>Color Palettes & Semantic Schemes</span>
                    <span class="chip">Tier 2</span>
                  </a>

                  <a href="#spacing-blocks" class="button button--subtle" role="option">
                      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
                      <span>Spacing Block Scale (--spacing-block-*)</span>
                    <span class="chip">Tier 2</span>
                  </a>
                </div>
              </div>

              <!-- Footer Keyboard Navigation Hints -->
              <footer class="card__footer inline-responsive inline-responsive--xs justify-content-between text-color-muted font-size-sm">
                <div class="cluster gap-sm">
                  <span><kbd class="kbd">↑↓</kbd> Navigate</span>
                  <span><kbd class="kbd">↵</kbd> Select</span>
                  <span><kbd class="kbd">ESC</kbd> Close</span>
                </div>
                <span class="hide--below-sm">Design For Humans v2.2</span>
              </footer>

            </article>
          </div>
        </dialog>

      </div>
    `;
  },
};
