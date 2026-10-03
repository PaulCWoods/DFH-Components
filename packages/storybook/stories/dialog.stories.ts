import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Dialog Primitive** uses native HTML \`<dialog>\` for top-layer positioning, viewport bounds, backdrop rendering, and focus trapping, composing cleanly with the **Card** primitive for surface, elevation, borders, and structured content.

### Canonical Markup Signature
\`\`\`html
<!-- Declarative Trigger Button -->
<button type="button" class="button button--primary" commandfor="my-dialog" command="show-modal" aria-haspopup="dialog">
  <span>Open Dialog</span>
</button>

<!-- Modal Dialog Container -->
<dialog id="my-dialog" class="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <div class="card">
    <article class="card__content">
      <header class="card__header">
        <hgroup class="card__hgroup">
          <h2 id="dialog-title" class="card__title">Dialog Title</h2>
          <p class="card__subtitle">Supporting Subtitle</p>
        </hgroup>
        <button type="button" class="button button--subtle button--icon" commandfor="my-dialog" command="close">
          <span class="visually-hidden">Close dialog</span>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
          </svg>
        </button>
      </header>

      <div class="card__body">
        <p id="dialog-desc">Dialog body copy describing the decision or context clearly.</p>
      </div>

      <footer class="card__footer">
        <form method="dialog" class="form__submission" style="display: flex; gap: var(--spacing-0-5);">
          <button type="submit" class="button button--secondary" commandfor="my-dialog" command="close">
            <span>Cancel</span>
          </button>
          <button type="submit" value="confirm" class="button button--primary">
            <span>Confirm</span>
          </button>
        </form>
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
 * 1. Modal Confirmation Dialog
 * Standard confirmation dialog composed with Card primitive and native <form method="dialog">.
 */
export const ModalDialog: Story = {
  render: () => {
    const dialogId = 'demo-confirm-dialog';

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
          <span>Open Account Dialog</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="dialog" 
          aria-labelledby="dialog-title" 
          aria-describedby="dialog-desc"
        >
          <div class="card">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h2 id="dialog-title" class="card__title">Delete Account</h2>
                  <p class="card__subtitle">Permanent action</p>
                </hgroup>
                <form method="dialog">
                  <button 
                    type="submit" 
                    class="button button--subtle button--icon" 
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span class="visually-hidden">Close dialog</span>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                      <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </form>
              </header>

              <div class="card__body">
                <p id="dialog-desc">
                  Are you sure you want to delete your account? All design tokens, workspaces, and team permissions will be permanently removed.
                </p>
              </div>

              <footer class="card__footer">
                <form method="dialog" class="form__submission">
                  <button 
                    type="submit" 
                    class="button button--secondary"
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
              </footer>
            </article>
          </div>
        </dialog>
      </div>
    `;
  },
};

/**
 * 2. Media Featured Modal Dialog
 * Composes a Card with media thumb, status badge, and action buttons.
 */
export const MediaFeaturedModal: Story = {
  render: () => {
    const dialogId = 'demo-media-dialog';

    setTimeout(() => {
      const openBtn = document.getElementById('open-media-dialog-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div>
        <button 
          id="open-media-dialog-btn" 
          type="button" 
          class="button button--secondary"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>Open Featured Release Modal</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="dialog" 
          aria-labelledby="media-dialog-title" 
          aria-describedby="media-dialog-desc"
        >
          <div class="card">
            <div class="card__thumb">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" 
                alt="Retro tech workspace hardware" 
                loading="lazy" 
              />
            </div>
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h2 id="media-dialog-title" class="card__title">Design For Humans v2.0</h2>
                  <p class="card__subtitle">Full Web Standards & Native Figma Variables</p>
                </hgroup>
                <span class="badge badge--accent badge--pill"><span>New</span></span>
              </header>

              <div class="card__body">
                <p id="media-dialog-desc">
                  Explore new zero-JavaScript popovers, container query fluid tokens, dynamic concentric radii, and automated WCAG 2.2 Level AAA checks.
                </p>
              </div>

              <footer class="card__footer">
                <form method="dialog" class="form__submission">
                  <button 
                    type="submit" 
                    class="button button--subtle"
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span>Later</span>
                  </button>
                  <button 
                    type="submit" 
                    class="button button--primary"
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span>Explore System</span>
                  </button>
                </form>
              </footer>
            </article>
          </div>
        </dialog>
      </div>
    `;
  },
};

/**
 * 3. Dynamic Concentric Corners Modal
 * Card radius dynamically harmonizes with the pill action button using .card--dynamic-corners.
 */
export const DynamicCornersModal: Story = {
  render: () => {
    const dialogId = 'demo-concentric-dialog';

    setTimeout(() => {
      const openBtn = document.getElementById('open-concentric-dialog-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div>
        <button 
          id="open-concentric-dialog-btn" 
          type="button" 
          class="button button--primary"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>Open Concentric Modal</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="dialog" 
          aria-labelledby="concentric-title"
        >
          <div class="card card--dynamic-corners" style="--button-radius: var(--radius-pill);">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h2 id="concentric-title" class="card__title">Harmonious Geometry</h2>
                  <p class="card__subtitle">Concentric curvature formula</p>
                </hgroup>
              </header>

              <div class="card__body">
                <p>
                  The outer border radius of this modal is mathematically computed from the nested pill action button below.
                </p>
              </div>

              <footer class="card__footer">
                <form method="dialog" class="form__submission">
                  <button 
                    type="submit" 
                    class="button button--primary s-button:round"
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span>Got it</span>
                  </button>
                </form>
              </footer>
            </article>
          </div>
        </dialog>
      </div>
    `;
  },
};

/**
 * 4. Slide-Out Drawer (.dialog--drawer)
 * Full-height slide-out drawer sliding from the viewport edge.
 */
export const SlideOutDrawer: Story = {
  render: () => {
    const dialogId = 'demo-drawer-dialog';

    setTimeout(() => {
      const openBtn = document.getElementById('open-drawer-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div>
        <button 
          id="open-drawer-btn" 
          type="button" 
          class="button button--secondary"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>Open Navigation Drawer</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="dialog dialog--drawer" 
          aria-labelledby="drawer-title"
        >
          <div class="card">
            <article class="card__content" style="block-size: 100%; display: flex; flex-direction: column;">
              <header class="card__header">
                <h2 id="drawer-title" class="card__title">Quick Settings</h2>
                <form method="dialog">
                  <button 
                    type="submit" 
                    class="button button--subtle button--icon" 
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span class="visually-hidden">Close drawer</span>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                      <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </form>
              </header>

              <div class="card__body" style="flex-grow: 1;">
                <p>Manage accessibility preferences, high contrast mode, and sound effects.</p>
                <div class="field" style="margin-block-start: var(--spacing-1);">
                  <label class="choice" for="cb-high-contrast">
                    <input type="checkbox" id="cb-high-contrast" class="checkbox-input" />
                    <span>Force Enhanced Contrast</span>
                  </label>
                </div>
              </div>  

              <footer class="card__footer">
                <form method="dialog" class="form__submission">
                  <button 
                    type="submit" 
                    class="button button--primary"
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span>Save & Close</span>
                  </button>
                </form>
              </footer>
            </article>
          </div>
        </dialog>
      </div>
    `;
  },
};
