import type { Meta, StoryObj } from '@storybook/html';

type Size = 'sm' | 'default' | 'lg';
type Intent = 'accent' | 'info' | 'success' | 'warning' | 'danger';

interface ProgressArgs {
  label: string;
  value: number;
  indeterminate: boolean;
  size: Size;
  intent: Intent;
  round: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];
const INTENTS: Intent[] = ['accent', 'info', 'success', 'warning', 'danger'];

const progressClasses = (size: Size = 'default', intent: Intent = 'accent', round = false) =>
  [
    'progress',
    size !== 'default' ? `progress--${size}` : '',
    intent !== 'accent' ? `progress--${intent}` : '',
    round ? 'progress--round' : '',
  ]
    .filter(Boolean)
    .join(' ');

let uid = 0;
/** A labelled bar with its value stated as text beside it. */
const field = (label: string, value: number | null, classes = 'progress', readout = value === null ? 'Working…' : `${value}%`) => {
  const id = `progress-demo-${++uid}`;
  return `
    <div class="field">
      <div class="field__header">
        <label for="${id}" class="field__label label">${label}</label>
        <span class="small-text">${readout}</span>
      </div>
      <progress id="${id}" class="${classes}" ${value === null ? '' : `value="${value}"`} max="100">${readout}</progress>
    </div>`;
};

const meta: Meta<ProgressArgs> = {
  title: 'Atoms/Progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A native \`<progress>\` showing how far a task has got. Leave out \`value\` for an indeterminate bar.

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default (8px), \`--sm\` (4px), \`--lg\` (16px) | \`--progress-size\` |
| Intent | accent (default), \`--info\`, \`--success\`, \`--warning\`, \`--danger\` | \`--progress-intent\` |
| Corners | \`--round\` | \`--progress-corners\` |

- A compact container steps the bar to \`--sm\`.
- Name every bar and state its value as text beside it. The bar backs up the text, so colour never carries the meaning alone (WCAG 1.4.1).
- Put \`aria-busy="true"\` on the region being loaded, not on the progress.
- Under reduced motion an indeterminate bar shows a static hatch instead of the sweep.

\`\`\`html
<div class="field">
  <div class="field__header">
    <label for="upload" class="field__label label">Uploading</label>
    <span class="small-text">68%</span>
  </div>
  <progress id="upload" class="progress" value="68" max="100">68%</progress>
</div>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'range', min: 0, max: 100 } },
    indeterminate: { control: 'boolean', description: 'Leave out value' },
    size: { control: 'inline-radio', options: SIZES },
    intent: { control: 'select', options: INTENTS },
    round: { control: 'boolean', description: '--round' },
  },
  render: (args) => `
    <div class="demo-stage demo-constrained--md">
      ${field(args.label, args.indeterminate ? null : args.value, progressClasses(args.size, args.intent, args.round))}
    </div>
  `,
};

export default meta;
type Story = StoryObj<ProgressArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { label: 'Uploading', value: 68, indeterminate: false, size: 'default', intent: 'accent', round: false },
};

/**
 * Sizes, and a compact container stepping the bar to --sm.
 */
export const Sizes: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${SIZES.map((s) => field(`Size ${s}`, 45, progressClasses(s))).join('')}
      <div class="ui-compact">${field('Compact container', 45)}</div>
    </div>
  `,
};

/**
 * Intents, each with a label and readout that state the outcome.
 */
export const Intents: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${field('Uploading (accent)', 40)}
      ${field('Indexing (info)', 55, progressClasses('default', 'info'))}
      ${field('Backup complete', 100, progressClasses('default', 'success'), 'Done')}
      ${field('Storage nearly full', 88, progressClasses('default', 'warning'), '88% used')}
      ${field('Upload failed', 30, progressClasses('default', 'danger'), 'Failed at 30%')}
    </div>
  `,
};

/**
 * Indeterminate: no value. With reduced motion the sweep becomes a static hatch.
 */
export const Indeterminate: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack" aria-busy="true">
      ${SIZES.map((s) => field(`Syncing (${s})`, null, progressClasses(s))).join('')}
    </div>
  `,
};

/**
 * Default and round corners.
 */
export const Corners: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${field('Default', 60, progressClasses('lg'))}
      ${field('Round', 60, progressClasses('lg', 'accent', true))}
    </div>
  `,
};

/**
 * Container flags style every bar inside.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack" style="--progress-size: lg; --progress-intent: success; --progress-corners: round;">
      <span class="sb-demo-tag">--progress-size: lg; --progress-intent: success; --progress-corners: round</span>
      ${field('Step 1', 100, 'progress', 'Done')}
      ${field('Step 2', 100, 'progress', 'Done')}
    </div>
  `,
};

/**
 * The fill and the indeterminate sweep follow the text direction.
 */
export const Direction: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div dir="ltr">${field('Uploading', 30, progressClasses('lg'))}</div>
      <div dir="rtl">${field('جارٍ الرفع', 30, progressClasses('lg'))}</div>
      <div dir="rtl">${field('جارٍ المزامنة', null, progressClasses('lg'))}</div>
    </div>
  `,
};
