import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const AnchoredPopover: Story = {
  render: () => {
    const popoverId = 'demo-popover';
    const anchorName = '--popover-demo-anchor';

    return `
      <div style="padding: 4rem 2rem; display: flex; justify-content: center;">
        <!-- Trigger button with native popovertarget and anchor-name -->
        <button 
          type="button" 
          class="button button--primary"
          popovertarget="${popoverId}"
          commandfor="${popoverId}"
          command="toggle-popover"
          style="anchor-name: ${anchorName};"
          aria-haspopup="dialog"
        >
          <span>Options Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>

        <!-- Native popover tethered via CSS Anchor Positioning -->
        <div 
          id="${popoverId}" 
          popover 
          class="popover popover--anchored"
          style="position-anchor: ${anchorName};"
        >
          <div style="display: flex; flex-direction: column; gap: var(--spacing-0-5); min-inline-size: 14rem;">
            <p style="margin: 0; font-weight: var(--body-strong-font-weight); color: var(--foreground); font-size: var(--typography-font-size-0);">
              Quick Actions
            </p>
            <p style="margin: 0; font-size: var(--body-small-font-size); color: var(--foreground-muted);">
              Natively dismissed on click-outside or Escape.
            </p>
            <hr style="border: 0; border-top: var(--border-quiet); margin: var(--spacing-025) 0;">
            <button type="button" class="button button--subtle button--sm" style="justify-content: flex-start;">
              <span>Duplicate Component</span>
            </button>
            <button type="button" class="button button--subtle button--sm" style="justify-content: flex-start;">
              <span>Export Tokens</span>
            </button>
            <button type="button" class="button button--destructive button--sm" style="justify-content: flex-start;">
              <span>Archive</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },
};

export const OpenPreview: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; justify-content: center;">
      <div 
        class="popover" 
        style="position: static; opacity: 1; transform: none; min-inline-size: 16rem;"
      >
        <p style="margin: 0 0 var(--spacing-0-5); font-weight: var(--body-strong-font-weight);">
          Always Visible Popover
        </p>
        <p style="margin: 0; font-size: var(--body-small-font-size); color: var(--foreground-muted);">
          Demonstrates the token styling, elevation shadow, and borders for overlay containers.
        </p>
      </div>
    </div>
  `,
};
