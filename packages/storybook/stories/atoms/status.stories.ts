import type { Meta, StoryObj } from '@storybook/html';

type Prominence = 'default' | 'strong' | 'subtle' | 'plain';
type Intent = 'neutral' | 'accent' | 'info' | 'danger' | 'warning' | 'success';

interface StatusArgs {
  label: string;
  prominence: Prominence;
  intent: Intent;
  small: boolean;
  round: boolean;
  icon: boolean;
}

const PROMINENCES: Prominence[] = ['default', 'strong', 'subtle', 'plain'];
const INTENTS: Intent[] = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'];

const LABEL: Record<Intent, string> = {
  neutral: 'Draft',
  accent: 'New',
  info: 'Scheduled',
  success: 'Passed',
  warning: 'Pending',
  danger: 'Failed',
};

const ICON: Record<Intent, string> = {
  neutral: 'square-pen',
  accent: 'star',
  info: 'info',
  success: 'check',
  warning: 'triangle-exclamation-point',
  danger: 'circle-exclamation-point',
};

const statusClasses = (prominence: Prominence, intent: Intent, small = false, round = false) =>
  [
    'status',
    intent !== 'neutral' ? `status--${intent}` : '',
    prominence !== 'default' ? `status--${prominence}` : '',
    small ? 'status--sm' : '',
    round ? 'status--round' : '',
  ]
    .filter(Boolean)
    .join(' ');

const iconFor = (intent: Intent) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${ICON[intent]}"/></svg>`;

const meta: Meta<StatusArgs> = {
  title: 'Atoms/Status',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The **state of a thing**: text with an optional dot or icon, in tables, lists, cards and headers ("Passed", "Live", "2 Overdue").

- A count attached to a host is a **Badge**.
- A value or tag is a **Chip**.

| Axis | Modifiers | Container flag |
| :--- | :--- | :--- |
| Prominence | default (outline pill), \`--strong\`, \`--subtle\`, \`--plain\` (dot and text) | \`--status-prominence\` |
| Intent | neutral (default), \`--accent\`, \`--danger\`, \`--warning\`, \`--success\`, \`--info\` | \`--status-intent\` |
| Size | default, \`--sm\` | \`--status-size\` |
| Density | none on the status; a compact container steps it to \`--sm\` | \`--ui-sizing: compact\` |
| Corners | \`--round\` | \`--status-corners\` |

\`\`\`html
<span class="status status--success"><span class="status__text">Passed</span></span>
<span class="status status--plain status--danger"><span class="status__text">Failed</span></span>
<span class="status status--strong status--warning status--round">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#triangle-exclamation-point"/></svg>
  <span class="status__text">Action required</span>
</span>
\`\`\`

#### Accessibility
- The text carries the state (WCAG 1.4.1). Colour, the dot and the icon only reinforce it.
- A dot with no text (\`<span class="status status--plain status--success" aria-hidden="true"></span>\`) is valid only next to text that says the same thing.
- Presence (online, away, busy) belongs to avatar's \`data-status\`, not to status.
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Visible state text' },
    prominence: { control: 'select', options: PROMINENCES, description: 'Prominence axis' },
    intent: { control: 'select', options: INTENTS, description: 'Intent axis' },
    small: { control: 'boolean', description: 'Size: --sm' },
    round: { control: 'boolean', description: 'Corners: --round' },
    icon: { control: 'boolean', description: 'Leading icon (replaces the plain dot)' },
  },
  render: (args) => `
    <div class="sb-demo-stage">
      <span class="${statusClasses(args.prominence, args.intent, args.small, args.round)}">
        ${args.icon ? iconFor(args.intent) : ''}<span class="status__text">${args.label}</span>
      </span>
    </div>
  `,
};

export default meta;
type Story = StoryObj<StatusArgs>;

/**
 * Interactive sandbox for every axis.
 */
export const Playground: Story = {
  args: { label: 'Passed', prominence: 'default', intent: 'success', small: false, round: false, icon: false },
};

/**
 * Every prominence × intent pairing, from two single-axis classes.
 */
export const ProminenceAndIntent: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${PROMINENCES.map(
    (p) => `
        <div class="cluster">
          <span class="sb-demo-label" style="inline-size: 6rem;">${p}</span>
          ${INTENTS.map((i) => `<span class="${statusClasses(p, i)}"><span class="status__text">${LABEL[i]}</span></span>`).join('')}
        </div>`
  ).join('')}
    </div>
  `,
};

/**
 * Icons replace the plain dot and reinforce the state on any prominence.
 */
export const WithIcons: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${(['plain', 'default', 'strong'] as Prominence[])
      .map(
        (p) => `
        <div class="cluster">
          ${INTENTS.map((i) => `<span class="${statusClasses(p, i, false, true)}">${iconFor(i)}<span class="status__text">${LABEL[i]}</span></span>`).join('')}
        </div>`
      )
      .join('')}
    </div>
  `,
};

/**
 * Default and small sizes, square and round corners.
 */
export const SizesAndCorners: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${[false, true]
      .map(
        (round) => `
        <div class="cluster">
          ${INTENTS.map((i) => `<span class="${statusClasses('default', i, false, round)}"><span class="status__text">${LABEL[i]}</span></span>`).join('')}
          ${INTENTS.map((i) => `<span class="${statusClasses('default', i, true, round)}"><span class="status__text">${LABEL[i]}</span></span>`).join('')}
        </div>`
      )
      .join('')}
    </div>
  `,
};

/**
 * Statuses in a table: the most common home for plain statuses.
 */
export const InATable: Story = {
  render: () => `
    <div class="sb-demo-stage">
      <div class="table-container" tabindex="0" role="region" aria-label="Deployments">
        <table class="table">
          <caption class="small-heading">Deployments</caption>
          <thead><tr><th scope="col">Service</th><th scope="col">State</th><th scope="col">Audit</th></tr></thead>
          <tbody>
            <tr><th scope="row">Web</th><td><span class="status status--plain status--success"><span class="status__text">Operational</span></span></td><td><span class="status status--success status--sm"><span class="status__text">Passed</span></span></td></tr>
            <tr><th scope="row">API</th><td><span class="status status--plain status--warning"><span class="status__text">Degraded</span></span></td><td><span class="status status--warning status--sm"><span class="status__text">In review</span></span></td></tr>
            <tr><th scope="row">Worker</th><td><span class="status status--plain status--danger"><span class="status__text">Down</span></span></td><td><span class="status status--danger status--sm"><span class="status__text">2 blockers</span></span></td></tr>
            <tr><th scope="row">Docs</th><td><span class="status status--plain"><span class="status__text">Paused</span></span></td><td><span class="status status--sm"><span class="status__text">Not run</span></span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * Container flags set prominence, intent and size for every status inside.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <div class="cluster" style="--status-prominence: plain;">
        <span class="status status--success"><span class="status__text">Online</span></span>
        <span class="status status--warning"><span class="status__text">Away</span></span>
        <span class="status"><span class="status__text">Offline</span></span>
      </div>
      <div class="cluster" style="--status-intent: accent; --status-corners: round; --ui-sizing: compact;">
        <span class="status"><span class="status__text">Beta</span></span>
        <span class="status status--strong"><span class="status__text">New</span></span>
        <span class="status status--subtle"><span class="status__text">Updated</span></span>
      </div>
    </div>
  `,
};
