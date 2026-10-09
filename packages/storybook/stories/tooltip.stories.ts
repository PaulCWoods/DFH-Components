import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const tipId = 'tooltip-save';
    const anchorName = '--anchor-save-btn';

    return `
      <div style="padding: 3rem 2rem; display: flex; justify-content: center;">
        <!-- Trigger button with native interestfor, popovertarget, and anchor-name -->
        <button 
          type="button" 
          class="button button--icon button--primary"
          interestfor="${tipId}"
          popovertarget="${tipId}"
          style="anchor-name: ${anchorName};"
        >
          <span class="visually-hidden">Save Document</span>
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
        </button>

        <!-- Native Tooltip Popover -->
        <div 
          id="${tipId}" 
          popover="hint" 
          class="tooltip"
          style="position-anchor: ${anchorName};"
        >
          Save document (⌘S)
        </div>
      </div>
    `;
  },
};

export const DirectionalPositions: Story = {
  render: () => `
    <div class="cluster" style="padding: 4rem 2rem; justify-content: center; gap: var(--spacing-32);">
      <!-- Top (Default) -->
      <div>
        <button 
          type="button" 
          class="button button--secondary"
          interestfor="tip-top"
          popovertarget="tip-top"
          style="anchor-name: --anchor-top;"
        >
          <span>Top</span>
        </button>
        <div id="tip-top" popover="hint" class="tooltip" style="position-anchor: --anchor-top;">
          Appears on top
        </div>
      </div>

      <!-- Bottom -->
      <div>
        <button 
          type="button" 
          class="button button--secondary"
          interestfor="tip-bottom"
          popovertarget="tip-bottom"
          style="anchor-name: --anchor-bottom;"
        >
          <span>Bottom</span>
        </button>
        <div id="tip-bottom" popover="hint" class="tooltip tooltip--bottom" style="position-anchor: --anchor-bottom;">
          Appears on bottom
        </div>
      </div>

      <!-- Left / Start -->
      <div>
        <button 
          type="button" 
          class="button button--secondary"
          interestfor="tip-left"
          popovertarget="tip-left"
          style="anchor-name: --anchor-left;"
        >
          <span>Left</span>
        </button>
        <div id="tip-left" popover="hint" class="tooltip tooltip--left" style="position-anchor: --anchor-left;">
          Appears on left
        </div>
      </div>

      <!-- Right / End -->
      <div>
        <button 
          type="button" 
          class="button button--secondary"
          interestfor="tip-right"
          popovertarget="tip-right"
          style="anchor-name: --anchor-right;"
        >
          <span>Right</span>
        </button>
        <div id="tip-right" popover="hint" class="tooltip tooltip--right" style="position-anchor: --anchor-right;">
          Appears on right
        </div>
      </div>
    </div>
  `,
};

export const OpenPreview: Story = {
  render: () => `
    <div class="stack" style="padding: 2rem; align-items: center;">
      <div 
        class="tooltip" 
        style="position: static; opacity: 1; transform: none; display: inline-block;"
      >
        High-contrast inverted tooltip preview
      </div>

      <div 
        class="tooltip" 
        style="position: static; opacity: 1; transform: none; display: inline-block;"
      >
        Copy link to clipboard (Ctrl+C)
      </div>
    </div>
  `,
};
