import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Focus Helpers',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Focus Helpers (\`focus-helpers.css\`)
Zero-specificity (\`:where()\`) focus management utilities that transfer the high-contrast focus ring indicator to a parent container when any descendant is focused via keyboard (\`:has(:focus-visible)\`), while automatically suppressing duplicate inner child rings.

#### Key Utilities:
- \`.focus-within\` / \`.focus-container\` / \`.has-focus-ring\`: Transmits the standard focus ring to the outer container when an inner element is focused.
- \`.focus-within--input\` / \`.focus-input-container\`: Only highlights the container when form inputs (\`<input>\`, \`<textarea>\`, \`<select>\`) receive focus.
- \`.focus-within--inset\` / \`.focus-ring-inset\`: Inverts the focus ring offset (\`-2px\`) for edge-to-edge and flush containers.
- \`.focus-within--border\` / \`.focus-border\`: Highlights the container's border color on focus.
- \`.focus-ring\`: Explicitly applies the standard focus ring to standalone elements.
- \`.focus-none\` / \`.focus-ring-none\`: Suppresses default outline when custom indicators are used.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Compound Search Bar Container (.focus-within)
 * When the input or button inside the wrapper is focused, the entire search bar receives the focus ring.
 */
export const SearchBarContainer: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <p class="small-text text-color-muted">Press <kbd>Tab</kbd> to focus into the search bar. The outer container receives the focus ring.</p>
      
      <div class="inline align-items-center gap-sm pd-sm rounded-md border focus-within" style="background-color: var(--surface);">
        <span class="icon-box">
          <svg class="icon text-color-muted" width="20" height="20" aria-hidden="true" focusable="false">
            <use href="#Search"/>
          </svg>
        </span>
        <input 
          type="search" 
          class="input input--plain" 
          placeholder="Search components or documentation..." 
        />
        <button type="button" class="button button--subtle button--sm">
          <span>Search</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 2. Input-Only Focus Trigger (.focus-within--input)
 * Only the text input activates the outer container's ring, while the trailing copy button can be focused independently.
 */
export const InputTargetedContainer: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <p class="small-text text-color-muted">Focusing the text input highlights the whole container. Focusing the copy button highlights only the button.</p>

      <div class="inline align-items-center gap-sm pd-sm rounded-md border focus-within--input" style="background-color: var(--surface);">
        <input 
          type="text" 
          class="input input--plain flex-1" 
          value="https://designforhumans.com/tokens" 
          readonly 
        />
        <button type="button" class="button button--secondary button--sm">
          <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Copy"/></svg>
          <span>Copy URL</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 3. Inset Focus Container (.focus-within--inset)
 * Useful for cards or floating banners where the ring should not extend outside the container bounds.
 */
export const InsetFocusContainer: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 28rem;">
      <div class="card card--compact card--bordered focus-within focus-within--inset">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title">Interactive Setting Card</h3>
          </header>
          <div class="card__body inline align-items-center justify-content-between">
            <span>Enable developer debug mode</span>
            <input type="checkbox" role="switch" class="switch" />
          </div>
        </article>
      </div>
    </div>
  `,
};

/**
 * 4. Border Color Highlight on Focus (.focus-within--border)
 */
export const BorderHighlightContainer: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <div class="inline align-items-center gap-sm pd-sm rounded-md border focus-within--border focus-within" style="background-color: var(--surface); border-width: 2px;">
        <span class="icon-box">
          <svg class="icon text-color-muted" width="20" height="20" aria-hidden="true"><use href="#Email"/></svg>
        </span>
        <input 
          type="email" 
          class="input input--plain flex-1" 
          placeholder="Enter email address..." 
        />
      </div>
    </div>
  `,
};
