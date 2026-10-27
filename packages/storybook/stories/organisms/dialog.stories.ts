import type { Meta, StoryObj } from '@storybook/html';

interface DialogArgs {
  title: string;
  subtitle?: string;
  content: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDrawer?: boolean;
  isScrollable?: boolean;
}

const meta: Meta<DialogArgs> = {
  title: 'Organisms/Dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Dialog & Drawer Primitives

The **Dialog** primitive uses the native HTML \`<dialog>\` element for top-layer positioning, viewport constraints, backdrop dimming, and browser-managed focus trapping.
Content layout and surfaces are cleanly composed using the **Card** primitive.
Supports both centered modal dialogs and slide-out panels via the **\`.dialog--drawer\`** modifier.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Centered Modal Dialog -->
<button type="button" class="button button--strong button--accent" commandfor="confirm-dialog" command="show-modal" aria-haspopup="dialog">
  <span>Open Confirmation Dialog</span>
</button>

<dialog id="confirm-dialog" class="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <div class="card font-sizing-cq">
    <article class="card__content">
      <header class="card__header">
        <hgroup class="card__hgroup">
          <h2 id="dialog-title" class="card__title heading">Publish Verification Report</h2>
          <p class="card__subtitle strong-text text-muted">Immutable Audit Manifest</p>
        </hgroup>
        <form method="dialog">
          <button type="submit" class="button button--plain button--icon button--icon-lg" commandfor="confirm-dialog" command="close">
            <span class="visually-hidden">Close dialog</span>
            <svg class="icon" aria-hidden="true"><use href="#Close"/></svg>
          </button>
        </form>
      </header>

      <div class="card__body">
        <p id="dialog-desc">Publishing will generate an immutable verification hash and notify subscribed reviewers.</p>
      </div>

      <footer class="card__footer">
        <form method="dialog" class="button-group button-group--stretch button-group--justify-end">
          <button type="submit" class="button button--subtle" commandfor="confirm-dialog" command="close">
            <span>Cancel</span>
          </button>
          <button type="submit" value="confirm" class="button button--strong button--accent">
            <span>Publish Report</span>
          </button>
        </form>
      </footer>
    </article>
  </div>
</dialog>

<!-- 2. Slide-Out Drawer (.dialog--drawer) -->
<dialog id="settings-drawer" class="dialog dialog--drawer" aria-labelledby="drawer-title">
  <div class="card font-sizing-cq">
    <article class="card__content" style="block-size: 100%; display: flex; flex-direction: column;">
      <header class="card__header">
        <h2 id="drawer-title" class="card__title heading">Workspace Settings</h2>
        <form method="dialog">
          <button type="submit" class="button button--plain button--icon button--icon-lg" commandfor="settings-drawer" command="close">
            <span class="visually-hidden">Close drawer</span>
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Close"/></svg>
          </button>
        </form>
      </header>
      <div class="card__body" style="flex-grow: 1;">
        <!-- Drawer content -->
      </div>
    </article>
  </div>
</dialog>

<!-- 3. Whole-Card Scrollable Modal (.dialog--scrollable) -->
<dialog id="terms-dialog" class="dialog dialog--scrollable" aria-labelledby="terms-title">
  <div class="card font-sizing-cq">
    <article class="card__content">
      <header class="card__header">
        <h2 id="terms-title" class="card__title heading">Terms & Conditions</h2>
      </header>
      <div class="card__body">
        <!-- Long body copy -->
      </div>
      <footer class="card__footer">
        <button type="button" class="button button--strong button--accent">Accept</button>
      </footer>
    </article>
  </div>
</dialog>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.1.1 Keyboard Accessibility** | **A** | Native browser behavior: \`Escape\` dismisses the modal, Space/Enter activate buttons, and Tab is strictly trapped within top layer. |
| **2.4.3 Focus Order** | **A** | Focus automatically moves to the first interactive element on open, and returns cleanly to trigger upon dismissal. |
| **4.1.2 Name, Role, Value** | **A** | Native \`<dialog>\` provides dialog role; associated via \`aria-labelledby\` to \`card__title\` and \`aria-describedby\` to body description. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | Translucent backdrop (\`::backdrop\`) dims background with 50% opacity and 4px blur, isolating foreground modal contrast. |
| **Modern Animation Standards** | **Standard** | Uses top-layer discrete transitions with \`@starting-style\` and \`transition-behavior: allow-discrete;\` without JavaScript RAF loops. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--_dialog-width\` | \`--spacing-block\` (36rem) | Maximum modal box width |
| \`--_dialog-drawer-max-width\` | \`28rem\` | Slide-out panel width for \`.dialog--drawer\` |
| \`--_dialog-backdrop-color\` | \`rgba(0, 0, 0, 0.5)\` | Backdrop dimming canvas color |
| \`--_dialog-backdrop-filter\` | \`blur(4px)\` | Backdrop frosted glass filter |
| \`--_dialog-cushion\` | \`--spacing-cushion\` (2rem) | Margin buffer preventing modal touching viewport borders |
| \`--_dialog-max-height\` | \`90vb\` | Maximum vertical height before inner scrolling engages |
| \`--_dialog-transition\` | \`--duration-md\` (250ms) | Entry and exit scale/fade animation speed |
`,
      },
    },
  },
  argTypes: {
    title: {
      description: 'Modal title text',
      control: 'text',
      defaultValue: 'Publish Verification Report',
    },
    subtitle: {
      description: 'Supporting subtitle',
      control: 'text',
      defaultValue: 'Immutable Audit Manifest',
    },
    content: {
      description: 'Modal body copy',
      control: 'text',
      defaultValue: 'Publishing will generate an immutable verification hash and notify subscribed accessibility reviewers.',
    },
    confirmLabel: {
      description: 'Primary action button text',
      control: 'text',
      defaultValue: 'Publish Report',
    },
    cancelLabel: {
      description: 'Dismiss button text',
      control: 'text',
      defaultValue: 'Cancel',
    },
    isDrawer: {
      description: 'Render as slide-out drawer (.dialog--drawer)',
      control: 'boolean',
      defaultValue: false,
    },
    isScrollable: {
      description: 'Make entire card scrollable (.dialog--scrollable)',
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const dialogId = 'playground-dialog-demo';
    const drawerClass = args.isDrawer ? 'dialog--drawer' : '';
    const scrollableClass = args.isScrollable ? 'dialog--scrollable' : '';
    const dialogClasses = ['dialog', drawerClass, scrollableClass].filter(Boolean).join(' ');

    setTimeout(() => {
      const openBtn = document.getElementById('playground-open-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div class="demo-stage demo-constrained--md stack" style="align-items: center; justify-content: center; min-block-size: 10rem;">
        <button 
          id="playground-open-btn" 
          type="button" 
          class="button button--strong button--accent"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>${args.isDrawer ? 'Open Slide-Out Drawer' : 'Open Modal Dialog'}</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="${dialogClasses}" 
          aria-labelledby="${dialogId}-title" 
          aria-describedby="${dialogId}-desc"
        >
          <div class="card font-sizing-cq">
            <article class="card__content" style="${args.isDrawer ? 'block-size: 100%; display: flex; flex-direction: column;' : ''}">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h2 id="${dialogId}-title" class="card__title heading">${args.title}</h2>
                  ${args.subtitle ? `<p class="card__subtitle strong-text text-muted">${args.subtitle}</p>` : ''}
                </hgroup>
                <form method="dialog">
                  <button type="submit" class="button button--plain button--icon button--icon-lg" commandfor="${dialogId}" command="close">
                    <span class="visually-hidden">Close</span>
                    <svg class="icon" aria-hidden="true"><use href="#Close"/></svg>
                  </button>
                </form>
              </header>

              <div class="card__body" style="${args.isDrawer ? 'flex-grow: 1;' : ''}">
                <p id="${dialogId}-desc">${args.content}</p>
              </div>

              <footer class="card__footer">
                <form method="dialog" class="button-group button-group--stretch button-group--justify-end">
                  <button type="submit" class="button button--subtle" commandfor="${dialogId}" command="close">
                    <span>${args.cancelLabel || 'Cancel'}</span>
                  </button>
                  <button type="submit" value="confirm" class="button button--strong button--accent">
                    <span>${args.confirmLabel || 'Confirm'}</span>
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

export default meta;
type Story = StoryObj<DialogArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Test modal titles, copy, buttons, and drawer orientation via Storybook controls.
 */
export const Playground: Story = {
  args: {
    title: 'Publish Verification Report',
    subtitle: 'Immutable Audit Manifest',
    content: 'Publishing will generate an immutable verification hash and notify subscribed accessibility reviewers.',
    confirmLabel: 'Publish Report',
    cancelLabel: 'Cancel',
    isDrawer: false,
    isScrollable: false,
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows Trigger button, native <dialog>, frosted ::backdrop, composed Card, header, body, and footer.
 */
export const Anatomy: Story = {
  render: () => {
    const dialogId = 'anatomy-dialog-demo';

    setTimeout(() => {
      const openBtn = document.getElementById('anatomy-open-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div class="demo-stage demo-constrained--lg stack">
        <div class="demo-label">1. Trigger Button &rarr; 2. &lt;dialog&gt; &rarr; 3. ::backdrop &rarr; 4. Composed Card with Header/Body/Footer</div>
        
        <div style="display: flex; justify-content: center; padding-block: var(--spacing-16);">
          <button 
            id="anatomy-open-btn" 
            type="button" 
            class="button button--strong button--accent"
            commandfor="${dialogId}" 
            command="show-modal"
            aria-haspopup="dialog"
          >
            <span>Open Anatomy Dialog Demo</span>
          </button>
        </div>

        <dialog 
          id="${dialogId}" 
          class="dialog" 
          aria-labelledby="anatomy-title" 
          aria-describedby="anatomy-desc"
        >
          <div class="card card--bordered">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h2 id="anatomy-title" class="card__title heading">WCAG 2.2 Modal Architecture</h2>
                  <p class="card__subtitle strong-text text-muted">Native Top-Layer Focus Trapping</p>
                </hgroup>
                <form method="dialog">
                  <button type="submit" class="button button--plain button--icon button--icon-lg" commandfor="${dialogId}" command="close">
                    <span class="visually-hidden">Close dialog</span>
                    <svg class="icon" aria-hidden="true"><use href="#Close"/></svg>
                  </button>
                </form>
              </header>

              <div class="card__body">
                <p id="anatomy-desc">
                  This dialog utilizes native browser top-layer positioning with <code>display: block</code> and <code>allow-discrete</code> transitions.
                  Press <kbd class="kbd">Escape</kbd> to dismiss at any time.
                </p>
              </div>

              <footer class="card__footer">
                <form method="dialog" class="button-group button-group--stretch button-group--justify-end">
                  <button type="submit" class="button button--subtle" commandfor="${dialogId}" command="close">
                    <span>Dismiss</span>
                  </button>
                  <button type="submit" class="button button--strong button--accent">
                    <span>Understood</span>
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
 * 3. Modal Confirmation Dialog
 * Standard confirmation dialog composed with Card primitive and native <form method="dialog">.
 */
export const ModalConfirmation: Story = {
  render: () => {
    const dialogId = 'modal-confirm-demo';

    setTimeout(() => {
      const openBtn = document.getElementById('open-confirm-modal-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div class="demo-stage demo-constrained--md stack" style="align-items: center; padding-block: var(--spacing-24);">
        <button 
          id="open-confirm-modal-btn" 
          type="button" 
          class="button button--strong button--accent"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>Trigger Confirmation Modal</span>
        </button>

        <dialog id="${dialogId}" class="dialog" aria-labelledby="modal-confirm-title">
          <div class="card font-sizing-cq">
            <article class="card__content">
              <header class="card__header">
                <h3 id="modal-confirm-title" class="card__title heading">Approve Deployment to Production</h3>
                <form method="dialog">
                  <button type="submit" class="button button--plain button--icon button--icon-lg" commandfor="${dialogId}" command="close">
                    <span class="visually-hidden">Close</span>
                    <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </form>
              </header>
              <div class="card__body">
                <p>Deploying will update the live production environment to version 2.4.0 with automated rollback enabled.</p>
              </div>
              <footer class="card__footer">
                <form method="dialog" class="button-group button-group--stretch button-group--justify-end">
                  <button type="submit" class="button button--subtle" commandfor="${dialogId}" command="close">
                    <span>Cancel</span>
                  </button>
                  <button type="submit" class="button button--strong button--accent">
                    <span>Approve & Deploy</span>
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
    const dialogId = 'demo-drawer-panel';

    setTimeout(() => {
      const openBtn = document.getElementById('open-drawer-panel-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div class="demo-stage demo-constrained--md stack" style="align-items: center; padding-block: var(--spacing-24);">
        <button 
          id="open-drawer-panel-btn" 
          type="button" 
          class="button"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>Open Slide-Out Drawer (.dialog--drawer)</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="dialog dialog--drawer" 
          aria-labelledby="drawer-panel-title"
        >
          <div class="card font-sizing-cq">
            <article class="card__content" style="block-size: 100%; display: flex; flex-direction: column;">
              <header class="card__header">
                <h3 id="drawer-panel-title" class="card__title heading">Quick Settings Drawer</h3>
                <form method="dialog">
                  <button 
                    type="submit" 
                    class="button button--plain button--icon button--icon-lg" 
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span class="visually-hidden">Close drawer</span>
                    <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </form>
              </header>

              <div class="card__body stack" style="flex-grow: 1;">
                <p style="color: var(--foreground-muted);">Manage accessibility preferences and workspace layout.</p>
                <div class="field">
                  <label class="choice" for="cb-high-contrast-drawer">
                    <input type="checkbox" id="cb-high-contrast-drawer" class="checkbox-input" checked />
                    <span>High-Contrast Focus Indicators</span>
                  </label>
                </div>
                <div class="field">
                  <label class="choice" for="cb-reduced-motion-drawer">
                    <input type="checkbox" id="cb-reduced-motion-drawer" class="checkbox-input" />
                    <span>Reduce Page Animations</span>
                  </label>
                </div>
              </div>  

              <footer class="card__footer">
                <form method="dialog" class="form__submission" style="display: flex; justify-content: flex-end;">
                  <button 
                    type="submit" 
                    class="button button--strong button--accent"
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

/**
 * 5. Whole-Card Scrollable Dialog (.dialog--scrollable)
 * Allows the entire card (header, body, and footer) to scroll as a unified container
 * when content exceeds the dialog max-height or viewport height, instead of fixing the header/footer.
 */
export const WholeCardScrollable: Story = {
  render: () => {
    const dialogId = 'scrollable-card-dialog-demo';

    setTimeout(() => {
      const openBtn = document.getElementById('open-scrollable-dialog-btn');
      const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div class="demo-stage demo-constrained--md stack" style="align-items: center; padding-block: var(--spacing-24);">
        <button 
          id="open-scrollable-dialog-btn" 
          type="button" 
          class="button"
          commandfor="${dialogId}" 
          command="show-modal"
          aria-haspopup="dialog"
        >
          <span>Open Whole-Card Scrollable Dialog (.dialog--scrollable)</span>
        </button>

        <dialog 
          id="${dialogId}" 
          class="dialog dialog--scrollable" 
          aria-labelledby="${dialogId}-title"
        >
          <div class="card card--bordered" style="inline-size: 28rem;">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 id="${dialogId}-title" class="card__title heading">Whole-Card Scrollable Modal</h3>
                  <p class="card__subtitle strong-text text-muted">Header scrolls with card content</p>
                </hgroup>
                <form method="dialog">
                  <button 
                    type="submit" 
                    class="button button--plain button--icon button--icon-lg" 
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span class="visually-hidden">Close</span>
                    <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </form>
              </header>

              <div class="card__body stack">
                <p>
                  By default, DFH dialogs fix the header and footer in place while only the body scrolls.
                  Applying <code>.dialog--scrollable</code> (or <code>.card--scrollable</code>) enables the entire card
                  to scroll as a single unified container.
                </p>
                <p>
                  <strong>Terms of Service &amp; Data Processing Agreement:</strong>
                </p>
                <p>
                  1. Data Collection: All token-driven design parameters and automated accessibility telemetry
                  are recorded in local storage and never transmitted to external services without explicit consent.
                </p>
                <p>
                  2. WCAG 2.2 Level AA / AAA Conformance: Component authors must ensure all custom tokens preserve
                  at least a 4.5:1 text contrast ratio and a 3:1 contrast ratio for user interface controls.
                </p>
                <p>
                  3. Keyboard Navigation: All modal dialogues must provide keyboard-accessible dismiss mechanisms
                  (Escape key or declarative invoker command buttons).
                </p>
                <p>
                  4. Top-Layer Architecture: Using native HTML <code>&lt;dialog&gt;</code> guarantees proper top-layer focus trapping
                  without requiring complex manual tab indexing or focus listeners.
                </p>
              </div>

              <footer class="card__footer">
                <form method="dialog" class="button-group button-group--stretch button-group--justify-end">
                  <button 
                    type="submit" 
                    class="button button--subtle" 
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span>Decline</span>
                  </button>
                  <button 
                    type="submit" 
                    class="button button--strong button--accent"
                    commandfor="${dialogId}"
                    command="close"
                  >
                    <span>Accept Terms</span>
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
 * 6. Real-World Recipes & UI Compositions
 * Common production patterns: Destructive project deletion modal & Navigation drawer with stacked menu.
 */
export const RealWorldRecipes: Story = {
  render: () => {
    const deleteDialogId = 'recipe-delete-dialog';

    setTimeout(() => {
      const openBtn = document.getElementById('open-delete-dialog-btn');
      const dialog = document.getElementById(deleteDialogId) as HTMLDialogElement | null;
      if (openBtn && dialog) {
        openBtn.onclick = () => dialog.showModal();
      }
    }, 0);

    return `
      <div class="stack demo-constrained--lg">
        <div class="demo-label">Recipe A: Destructive Confirmation Dialog</div>
        <div class="demo-stage" style="display: flex; justify-content: center; padding-block: var(--spacing-24);">
          <button 
            id="open-delete-dialog-btn" 
            type="button" 
            class="button button--danger"
            commandfor="${deleteDialogId}" 
            command="show-modal"
            aria-haspopup="dialog"
          >
            <svg class="icon" aria-hidden="true"><use href="#Delete"/></svg>
            <span>Delete Entire Project</span>
          </button>
        </div>

        <dialog id="${deleteDialogId}" class="dialog" aria-labelledby="del-title">
          <div class="card card--bordered">
            <article class="card__content">
              <header class="card__header">
                <h3 id="del-title" class="card__title heading" style="color: var(--foreground-danger);">Permanently Delete Project?</h3>
                <form method="dialog">
                  <button type="submit" class="button button--plain button--icon button--icon-lg" commandfor="${deleteDialogId}" command="close">
                    <span class="visually-hidden">Cancel</span>
                    <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </form>
              </header>
              <div class="card__body">
                <p>
                  This action <strong>cannot be reversed</strong>. All associated audit logs, Figma variable sync bindings, and team permissions will be permanently expunged.
                </p>
              </div>
              <footer class="card__footer">
                <form method="dialog" class="button-group button-group--stretch button-group--justify-end">
                  <button type="submit" class="button button--subtle" commandfor="${deleteDialogId}" command="close">
                    <span>Cancel</span>
                  </button>
                  <button type="submit" value="delete" class="button button--danger">
                    <span>Yes, Delete Project</span>
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
