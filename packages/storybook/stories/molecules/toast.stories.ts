import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Banners floated in a corner of the viewport. A toast is a banner with \`.toast\`, which adds a shadow and entry and exit transitions. The stack places them.

### Markup
\`\`\`html
<!-- In the page from the start; opened once with showPopover() -->
<div class="toast-stack toast-stack--bottom-end" popover="manual" role="status" aria-label="Notifications" id="toasts"></div>

<!-- Added to the stack when something happens -->
<div class="banner banner--success toast">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
  <div class="banner__body"><p class="text">Settings saved.</p></div>
  <button type="button" class="button button--icon banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Dismiss</span>
  </button>
</div>
\`\`\`

- **The stack is the live region.** It is in the page before any message arrives, so additions are announced. Polite messages go in a \`role="status"\` stack, urgent ones in a \`role="alert"\` stack.
- **Top layer.** \`popover="manual"\` keeps the stack above the page. A modal dialog makes everything outside it inert, top layer included, so a dialog that raises toasts holds its own stack.
- **Timing (WCAG 2.2.1).** A toast with an action never dismisses itself. Others stay at least 5 seconds and pause while hovered or focused.
- **Dismiss** by removing the toast, or set \`hidden\` to fade it out.
- Placements: \`--bottom-end\` (default), \`--bottom-start\`, \`--bottom-center\`, \`--top-start\`, \`--top-center\`, \`--top-end\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const iconBox = (name: string) => `<span class="icon-box" aria-hidden="true">${icon(name)}</span>`;

const intentIcon: Record<string, string> = { info: 'Info', success: 'Check', warning: 'Warning', danger: 'Error' };

const toast = (intent: string, title: string, text: string, action = '') => `
  <div class="banner banner--${intent} banner--round toast">
    ${iconBox(intentIcon[intent])}
    <div class="banner__body">
      <p class="text font-bold">${title}</p>
      <p class="small-text">${text}</p>
    </div>
    ${action}
    <button type="button" class="button button--icon banner__action" onclick="this.closest('.toast').remove()">
      ${icon('Close')}
      <span class="sr-only">Dismiss</span>
    </button>
  </div>`;

/* Static demos sit in a frame with contain: layout, so the fixed stack stays inside it */
const frame = (inner: string, label: string) => `
  <div class="stack">
    <h3 class="small-heading">${label}</h3>
    <div style="contain: layout; block-size: 18rem; border: 1px solid var(--panel-border-color, currentColor);">
      ${inner}
    </div>
  </div>`;

export const Playground: Story = {
  args: { intent: 'success', placement: 'bottom-end', withAction: false },
  argTypes: {
    intent: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    placement: { control: 'select', options: ['bottom-end', 'bottom-start', 'bottom-center', 'top-start', 'top-center', 'top-end'] },
    withAction: { control: 'boolean' },
  },
  render: (args) => {
    const root = document.createElement('div');
    root.innerHTML = `
      <div class="stack" style="max-inline-size: 32rem;">
        <p class="text">Each press adds a toast to a live stack opened with <code>showPopover()</code>. Toasts without an action leave after 5 seconds, pausing while hovered or focused.</p>
        <button type="button" class="button button--strong button--accent" data-add><span>Show toast</span></button>
      </div>
      <div class="toast-stack toast-stack--${args.placement}" popover="manual" role="status" aria-label="Notifications"></div>
    `;
    const stack = root.querySelector('.toast-stack') as HTMLElement;
    let count = 0;
    root.querySelector('[data-add]')!.addEventListener('click', () => {
      if (!stack.matches(':popover-open')) stack.showPopover();
      count += 1;
      const action = args.withAction ? '<button type="button" class="button banner__action"><span>Undo</span></button>' : '';
      stack.insertAdjacentHTML('beforeend', toast(args.intent, `Notification ${count}`, 'Your change has been saved.', action));
      const el = stack.lastElementChild as HTMLElement;
      if (args.withAction) return;
      let timer = 0;
      const arm = () => { clearTimeout(timer); timer = window.setTimeout(() => el.remove(), 5000); };
      const pause = () => clearTimeout(timer);
      el.addEventListener('pointerenter', pause);
      el.addEventListener('focusin', pause);
      el.addEventListener('pointerleave', arm);
      el.addEventListener('focusout', arm);
      arm();
    });
    return root;
  },
};

export const Stack: Story = {
  render: () => frame(`
    <div class="toast-stack" role="status" aria-label="Notifications">
      ${toast('success', 'Project published', 'Your changes are now live.')}
      ${toast('warning', 'Storage at 85%', 'Archive older files to free space.', '<button type="button" class="button banner__action"><span>Review</span></button>')}
      ${toast('danger', 'Sync failed', 'Unable to reach the backup server.')}
    </div>`, 'Bottom end (default)'),
};

export const Placements: Story = {
  render: () => `
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));">
      ${['top-start', 'top-center', 'top-end', 'bottom-start', 'bottom-center', 'bottom-end']
        .map((p) => frame(`
          <div class="toast-stack toast-stack--${p}" role="status" aria-label="Notifications, ${p}">
            ${toast('info', p, 'Placed with .toast-stack--' + p + '.')}
          </div>`, `.toast-stack--${p}`))
        .join('')}
    </div>
  `,
};

export const Dismissal: Story = {
  render: () => frame(`
    <div class="toast-stack" role="status" aria-label="Notifications">
      <div class="banner banner--success banner--round toast" id="toast-dismiss-demo">
        ${iconBox('Check')}
        <div class="banner__body"><p class="text">Setting <code>hidden</code> fades a toast out.</p></div>
        <button type="button" class="button button--icon banner__action" onclick="this.closest('.toast').hidden = true">
          ${icon('Close')}
          <span class="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
    <div style="padding: var(--spacing-breathe);">
      <button type="button" class="button button--sm" onclick="document.getElementById('toast-dismiss-demo').hidden = false"><span>Show again</span></button>
    </div>`, 'Dismissal'),
};
