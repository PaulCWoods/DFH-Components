import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Banner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
One message with an intent, in one row: an optional icon, the body and optional actions. A banner with media, or a title, body and footer of controls, is a card. An alert is a role on a banner, not a component; \`.banner-dock\` pins a banner to the page edge and \`.toast\` floats one in a corner.

### Markup
\`\`\`html
<div class="banner banner--warning">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
  <div class="banner__body">
    <p class="text">Scheduled maintenance begins tonight at 22:00 UTC.</p>
  </div>
  <button type="button" class="button button--icon banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Dismiss</span>
  </button>
</div>
\`\`\`

### Axes
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (tint and intent border), \`--subtle\` (tint, no border), \`--strong\` (filled), \`--plain\` (icon and text only) | \`--banner-prominence\` |
| Intent | neutral, \`--accent\`, \`--info\`, \`--success\`, \`--warning\`, \`--danger\` | \`--banner-intent\` |
| Density | default, \`--compact\` | \`--ui-sizing: compact\` |
| Corners | default, \`--round\` (round buttons, concentric frame) | \`--banner-corners\` |

- **Intent is never colour alone.** A banner with an intent starts with an icon, or states its intent in the text.
- **Icon box:** the icon sits in an \`.icon-box\` the size of the banner's buttons; both align to the start of the row (\`--banner-align\`; a dock centres them).
- \`--translucent\` is a material that combines with any prominence that has a fill.
- Buttons inside are small and subtle. Use text atoms for the message; a title is \`.text.font-bold\`.
- **Roles.** An in-flow banner takes no role. \`role="status"\` or \`role="alert"\` go on a region that is in the page before its message arrives.
- **Dismiss** by setting \`hidden\`; the banner fades out.
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

const intentIcon: Record<string, string> = {
  accent: 'Info',
  info: 'Info',
  success: 'Check',
  warning: 'Warning',
  danger: 'Error',
};

const dismiss = `
  <button type="button" class="button button--icon banner__action" onclick="this.closest('.banner').hidden = true">
    ${icon('Close')}
    <span class="sr-only">Dismiss</span>
  </button>`;

const banner = (classes: string, body: string, opts: { intent?: string; action?: string } = {}) => `
  <div class="${['banner', opts.intent && opts.intent !== 'neutral' ? `banner--${opts.intent}` : '', classes].filter(Boolean).join(' ')}">
    ${opts.intent && opts.intent !== 'neutral' ? iconBox(intentIcon[opts.intent]) : ''}
    <div class="banner__body">${body}</div>
    ${opts.action ?? ''}
  </div>`;

export const Playground: Story = {
  args: {
    intent: 'warning',
    prominence: 'default',
    compact: false,
    round: false,
    translucent: false,
    title: 'Storage almost full',
    message: 'Your workspace is at 85% capacity. Older logs will be archived next week.',
    action: 'dismiss',
  },
  argTypes: {
    intent: { control: 'select', options: ['neutral', 'accent', 'info', 'success', 'warning', 'danger'] },
    prominence: { control: 'inline-radio', options: ['default', 'subtle', 'strong', 'plain'] },
    compact: { control: 'boolean' },
    round: { control: 'boolean' },
    translucent: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    action: { control: 'inline-radio', options: ['none', 'dismiss', 'buttons'] },
  },
  render: (args) => {
    const classes = [
      args.prominence !== 'default' ? `banner--${args.prominence}` : '',
      args.compact ? 'banner--compact' : '',
      args.round ? 'banner--round' : '',
      args.translucent ? 'banner--translucent' : '',
    ].filter(Boolean).join(' ');
    const action = args.action === 'dismiss'
      ? dismiss
      : args.action === 'buttons'
        ? `<div class="cluster banner__action">
             <button type="button" class="button"><span>Later</span></button>
             <button type="button" class="button button--strong button--accent"><span>Archive now</span></button>
           </div>`
        : '';
    const body = `${args.title ? `<p class="text font-bold">${args.title}</p>` : ''}<p class="small-text">${args.message}</p>`;
    return `<div style="max-inline-size: 40rem;">${banner(classes, body, { intent: args.intent, action })}</div>`;
  },
};

export const Anatomy: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 40rem;">
      <div class="banner banner--info">
        ${iconBox('Info')}
        <div class="banner__body">
          <span class="sb-demo-tag"><span>.banner__body</span></span>
          <p class="text font-bold">Title (.text.font-bold)</p>
          <p class="small-text">The message. Text atoms set the type; the banner sets none.</p>
        </div>
        <div class="cluster banner__action">
          <span class="sb-demo-tag"><span>.banner__action</span></span>
          <button type="button" class="button"><span>Action</span></button>
        </div>
      </div>
      <p class="small-text text-muted">Leading icon (carries the intent), body, then one button or a <code>.cluster</code> of them. A <code>.cluster</code> in the body sits under the message instead.</p>
    </div>
  `,
};

export const Intents: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 40rem;">
      ${banner('', '<p class="text">Neutral: a message with no intent, and no icon needed.</p>', { action: dismiss })}
      ${['accent', 'info', 'success', 'warning', 'danger']
      .map((i) => banner('', `<p class="text"><strong>${i[0].toUpperCase() + i.slice(1)}:</strong> the icon carries the intent as well as the colour.</p>`, { intent: i, action: dismiss }))
      .join('')}
    </div>
  `,
};

export const Prominence: Story = {
  render: () => {
    const intents = ['neutral', 'info', 'success', 'warning', 'danger'];
    const prominences = ['default', 'subtle', 'strong', 'plain'];
    return `
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));">
        ${prominences
        .map((p) => `
            <div class="stack">
              <h3 class="small-heading">${p === 'default' ? 'Default' : `.banner--${p}`}</h3>
              ${intents
            .map((i) => banner(p === 'default' ? '' : `banner--${p}`, `<p class="small-text">${i[0].toUpperCase() + i.slice(1)}</p>`, { intent: i }))
            .join('')}
            </div>`)
        .join('')}
      </div>
    `;
  },
};

export const ProminenceFlag: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 40rem;">
      <p class="small-text text-muted">The flags are set once on the container; a modifier on a banner still wins.</p>
      <div class="stack" style="--banner-prominence: subtle; --banner-intent: info;">
        ${banner('', '<p class="text">Set by <code>--banner-prominence: subtle; --banner-intent: info</code>.</p>', { action: dismiss })}
        ${banner('banner--strong', '<p class="text">This one adds <code>.banner--strong</code>.</p>', { intent: 'info' })}
      </div>
    </div>
  `,
};

export const DensityAndCorners: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 40rem;">
      ${banner('banner--compact', '<p class="small-text">Compact: for dense tables and toolbars.</p>', { intent: 'info', action: dismiss })}
      <div class="ui-compact">
        ${banner('', '<p class="small-text">Compact from a <code>.ui-compact</code> region.</p>', { intent: 'success', action: dismiss })}
      </div>
      ${banner('banner--round', '<p class="text font-bold">Continue?</p>', {
    action: `<div class="cluster banner__action">
          <button type="button" class="button button--icon">${icon('Close')}<span class="sr-only">Cancel</span></button>
          <button type="button" class="button button--icon button--strong button--accent">${icon('Check')}<span class="sr-only">Continue</span></button>
        </div>`,
  })}
      ${banner('banner--round', '<p class="text">A round banner keeps concentric corners when its message wraps onto a second line, because it never becomes a pill.</p>', { intent: 'warning', action: dismiss })}
    </div>
  `,
};

export const Translucent: Story = {
  render: () => `
    <div style="padding: var(--spacing-breathe); background: linear-gradient(135deg, var(--surface-accent-strong), var(--surface-info-strong)); max-inline-size: 40rem;">
      ${banner('banner--translucent', '<p class="text">Translucent: a material, combined with any prominence that has a fill.</p>', { intent: 'info' })}
    </div>
  `,
};

export const SeveralActions: Story = {
  name: 'Several actions',
  render: () => `
    <div class="banner banner--accent">
      <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
      <div class="banner__body">
        <p class="text font-bold">Design system v2.4 is available</p>
        <p class="small-text">Updated tokens and native anchor positioning.</p>
        <div class="cluster mt-sm">
          <button type="button" class="button"><span>Later</span></button>
          <button type="button" class="button button--strong button--accent"><span>Update</span></button>
        </div>
      </div>
    </div>
  `,
};

export const Dismissal: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 40rem;">
      ${banner('', '<p class="text">Dismiss sets <code>hidden</code>; the banner fades out, or goes at once with reduced motion.</p>', { intent: 'success', action: dismiss })}
      <button type="button" class="button button--sm" onclick="this.previousElementSibling.hidden = false"><span>Show again</span></button>
    </div>
  `,
};

export const InContext: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 32rem;">
      <article class="card">
        <header class="card__header"><h3 class="card__title heading">Payment details</h3></header>
        <div class="card__body stack">
          ${banner('banner--plain', '<p class="small-text">Your card expires next month.</p>', { intent: 'warning' })}
          <p class="text">A plain banner sits inside a card or a form without a second frame.</p>
        </div>
      </article>
      <div role="status" aria-label="Upload status" class="stack">
        ${banner('', '<p class="text">Upload complete. This banner sits in a <code>role="status"</code> region that was in the page before the message arrived.</p>', { intent: 'success' })}
      </div>
    </div>
  `,
};
