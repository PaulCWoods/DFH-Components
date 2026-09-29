import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const ModalDialog: Story = {
  render: () => {
    const dialogId = 'demo-modal';

    // We bind a simple helper so clicking the trigger button invokes showModal() natively
    setTimeout(() => {
      const openBtn = document.getElementById('open-dialog-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div>
        <button 
          id="open-dialog-btn" 
          type="button" 
          class="button button--primary"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>Open Accessible Dialog</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="dialog" 
          aria-labelledby="dialog-title" 
          aria-describedby="dialog-desc"
        >
          <div class="dialog__header">
            <h2 id="dialog-title" class="dialog__title">Account Deletion</h2>
            <form method="dialog">
              <button 
                type="submit" 
                class="button button--subtle button--icon" 
                aria-label="Close dialog"
                commandfor="${dialogId}"
                command="close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </form>
          </div>

          <p id="dialog-desc" class="dialog__body">
            Are you sure you want to delete your account? This action is permanent and cannot be undone. All your project assets and design tokens will be deleted.
          </p>

          <div class="dialog__footer">
            <form method="dialog" style="display: flex; gap: var(--spacing-0-5);">
              <button 
                type="submit" 
                class="button"
                commandfor="${dialogId}"
                command="close"
              >
                <span>Cancel</span>
              </button>
              <button 
                type="submit" 
                value="confirm" 
                class="button button--destructive"
              >
                <span>Confirm & Delete</span>
              </button>
            </form>
          </div>
        </dialog>
      </div>
    `;
  },
};

export const OpenPreview: Story = {
  render: () => `
    <div style="position: relative; min-block-size: 20rem; inline-size: 100%; display: flex; align-items: center; justify-content: center;">
      <dialog 
        open 
        class="dialog" 
        style="position: static; display: flex;"
        aria-labelledby="open-dialog-title" 
        aria-describedby="open-dialog-desc"
      >
        <div class="dialog__header">
          <h2 id="open-dialog-title" class="dialog__title">Design For Humans</h2>
        </div>
        <p id="open-dialog-desc" class="dialog__body">
          This preview demonstrates the dialog's default typography, padding, and token styling in the open state.
        </p>
        <div class="dialog__footer">
          <button type="button" class="button button--primary">
            <span>Acknowledge</span>
          </button>
        </div>
      </dialog>
    </div>
  `,
};
