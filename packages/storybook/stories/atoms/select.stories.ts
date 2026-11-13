import type { Meta, StoryObj } from '@storybook/html';

type Size = 'sm' | 'default' | 'lg';
type Prominence = 'default' | 'subtle' | 'plain';

interface SelectArgs {
  label: string;
  size: Size;
  prominence: Prominence;
  round: boolean;
  custom: boolean;
  invalid: boolean;
  disabled: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];
const PROMINENCES: Prominence[] = ['default', 'subtle', 'plain'];

const selectClasses = (size: Size = 'default', prominence: Prominence = 'default', round = false, custom = false) =>
  [
    'select',
    size !== 'default' ? `select--${size}` : '',
    prominence !== 'default' ? `select--${prominence}` : '',
    round ? 'select--round' : '',
    custom ? 'select--custom' : '',
  ]
    .filter(Boolean)
    .join(' ');

const OPTIONS = `
  <option value="">Choose a role</option>
  <option value="lead">Accessibility lead</option>
  <option value="eng">Design engineer</option>
  <option value="pm">Product manager</option>`;

let uid = 0;
const field = (label: string, control: (id: string) => string) => {
  const id = `select-demo-${++uid}`;
  return `
    <div class="field">
      <label for="${id}" class="field__label label">${label}</label>
      ${control(id)}
    </div>`;
};

const meta: Meta<SelectArgs> = {
  title: 'Atoms/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A native \`<select>\`. It shares the text control base with input and textarea (size, prominence, corners, flags and states: see **Atoms/Input**). This atom adds the chevron and the customizable select.

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default, \`--sm\`, \`--lg\` | \`--select-size\`, \`--controls-size\` |
| Prominence | outline (default), \`--subtle\`, \`--plain\` | \`--select-prominence\`, \`--controls-prominence\` |
| Corners | \`--round\` | \`--select-corners\`, \`--controls-corners\` |

- The chevron is drawn in \`currentColor\`, so it follows the text colour and the colour scheme, and moves to the left in right-to-left text.
- \`--custom\` opts into \`appearance: base-select\` where supported; other browsers show the native select.

\`\`\`html
<div class="field">
  <label for="role" class="field__label label">Role</label>
  <select id="role" class="select">
    <option value="lead">Accessibility lead</option>
  </select>
</div>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    prominence: { control: 'inline-radio', options: PROMINENCES },
    round: { control: 'boolean' },
    custom: { control: 'boolean', description: '--custom: appearance: base-select' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      <div class="field">
        <label for="select-playground" class="field__label label">${args.label}</label>
        ${args.invalid ? '<p id="select-playground-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#triangle-exclamation-point"/></svg>Choose a role.</p>' : ''}
        <select
          id="select-playground"
          class="${selectClasses(args.size, args.prominence, args.round, args.custom)}"
          ${args.invalid ? 'aria-invalid="true" aria-describedby="select-playground-error"' : ''}
          ${args.disabled ? 'disabled' : ''}
        >${OPTIONS}</select>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj<SelectArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { label: 'Role', size: 'default', prominence: 'default', round: false, custom: false, invalid: false, disabled: false },
};

/**
 * Outline, subtle, plain and round.
 */
export const Prominence: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${PROMINENCES.map((p, i) => field(['Team', 'Region', 'Language'][i] ?? 'Team', (id) => `<select id="${id}" class="${selectClasses('default', p)}">${OPTIONS}</select>`)).join('')}
      ${field('Time zone', (id) => `<select id="${id}" class="select select--round">${OPTIONS}</select>`)}
    </div>
  `,
};

/**
 * Sizes, beside an input and a button of the same size.
 */
export const Sizes: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${SIZES.map(
        (s) => `
      <div style="display: grid; grid-template-columns: 1fr 1fr auto; align-items: end; gap: var(--spacing-16);">
        ${field('Status', (id) => `<select id="${id}" class="${selectClasses(s)}">${OPTIONS}</select>`)}
        ${field('Assignee', (id) => `<input id="${id}" type="text" class="input${s !== 'default' ? ` input--${s}` : ''}" />`)}
        <button type="button" class="button${s !== 'default' ? ` button--${s}` : ''}"><span>Apply</span></button>
      </div>`
      ).join('')}
    </div>
  `,
};

/**
 * Invalid and disabled, plus a multi-line list box (no chevron).
 */
export const States: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      <div class="field">
        <label for="select-invalid" class="field__label label">Invalid</label>
        <p id="select-invalid-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#triangle-exclamation-point"/></svg>Choose a role.</p>
        <select id="select-invalid" class="select" aria-invalid="true" aria-describedby="select-invalid-error">${OPTIONS}</select>
      </div>
      ${field('Plan', (id) => `<select id="${id}" class="select" disabled>${OPTIONS}</select>`)}
      ${field('Reviewers', (id) => `<select id="${id}" class="select" size="4">${OPTIONS}</select>`)}
    </div>
  `,
};

/**
 * Customizable select (appearance: base-select). Options can hold rich content.
 */
export const Custom: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      <div class="field">
        <label for="select-custom" class="field__label label">Conformance target</label>
        <select id="select-custom" class="select select--custom">
          <button type="button"><selectedcontent></selectedcontent></button>
          <option value="a">WCAG 2.2 A</option>
          <option value="aa" selected>WCAG 2.2 AA</option>
          <option value="aaa">WCAG 2.2 AAA</option>
        </select>
      </div>
    </div>
  `,
};

/**
 * The chevron moves to the inline end in right-to-left text.
 */
export const Direction: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${['ltr', 'rtl']
        .map(
          (dir) => `
        <div dir="${dir}" class="sb-demo-constrained--md">
          ${field(dir === 'rtl' ? 'الدور' : 'Role', (id) => `<select id="${id}" class="select">${OPTIONS}</select>`)}
        </div>`
        )
        .join('')}
    </div>
  `,
};
