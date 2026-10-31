import type { Meta, StoryObj } from '@storybook/html';

interface CheckArgs {
  type: 'checkbox' | 'radio';
  label: string;
  large: boolean;
  checked: boolean;
  invalid: boolean;
  disabled: boolean;
}

const control = (type: 'checkbox' | 'radio', attrs = '', large = false) =>
  `<input type="${type}" class="${type}-input${large ? ` ${type}-input--lg` : ''}" ${attrs} />`;

const choice = (type: 'checkbox' | 'radio', label: string, attrs = '', large = false) => `
  <label class="choice">
    ${control(type, attrs, large)}
    <span>${label}</span>
  </label>`;

const meta: Meta<CheckArgs> = {
  title: 'Atoms/Checkbox & Radio',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Native checkboxes and radios, coloured with \`accent-color\`. The browser draws the box, so it stays legible in forced colours.

| Axis | Modifiers | Container flag |
| :--- | :--- | :--- |
| Size | default (20px), \`--lg\` (24px) | \`--check-size: lg\` |

- No intent: a checkbox has a state, not a status. Invalid (\`:user-invalid\`, \`aria-invalid="true"\`) turns it danger.
- A compact container steps \`--lg\` back to default.
- Put the input inside a \`.choice\` label, so the whole row is the target (WCAG 2.5.8).

\`\`\`html
<label class="choice">
  <input type="checkbox" class="checkbox-input" />
  <span>Keyboard review</span>
</label>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['checkbox', 'radio'] },
    label: { control: 'text' },
    large: { control: 'boolean', description: '--lg' },
    checked: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => `
    <div class="sb-demo-stage">
      ${choice(
        args.type,
        args.label,
        [args.checked ? 'checked' : '', args.invalid ? 'aria-invalid="true"' : '', args.disabled ? 'disabled' : '', args.type === 'radio' ? 'name="playground"' : '']
          .filter(Boolean)
          .join(' '),
        args.large
      )}
    </div>
  `,
};

export default meta;
type Story = StoryObj<CheckArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { type: 'checkbox', label: 'Send me the weekly digest', large: false, checked: true, invalid: false, disabled: false },
};

/**
 * Default and large.
 */
export const Sizes: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <div class="cluster">
        ${choice('checkbox', 'Default', 'checked')}
        ${choice('checkbox', 'Large', 'checked', true)}
      </div>
      <div class="cluster">
        ${choice('radio', 'Default', 'name="size-r" checked')}
        ${choice('radio', 'Large', 'name="size-r"', true)}
      </div>
      <div class="cluster ui-compact">
        <span class="sb-demo-tag">compact container</span>
        ${choice('checkbox', 'Large steps to default', 'checked', true)}
      </div>
    </div>
  `,
};

/**
 * Unchecked, checked, indeterminate (set by script), invalid and disabled.
 */
export const States: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <div class="cluster">
        ${choice('checkbox', 'Unchecked')}
        ${choice('checkbox', 'Checked', 'checked')}
        <label class="choice">
          <input type="checkbox" class="checkbox-input" data-indeterminate />
          <span>Indeterminate</span>
        </label>
        ${choice('checkbox', 'Invalid', 'aria-invalid="true"')}
        ${choice('checkbox', 'Disabled', 'disabled')}
        ${choice('checkbox', 'Disabled, checked', 'disabled checked')}
      </div>
      <div class="cluster">
        ${choice('radio', 'Unchecked', 'name="state-r"')}
        ${choice('radio', 'Checked', 'name="state-r" checked')}
        ${choice('radio', 'Disabled', 'name="state-r2" disabled')}
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    canvasElement.querySelectorAll<HTMLInputElement>('[data-indeterminate]').forEach((el) => (el.indeterminate = true));
  },
};

/**
 * Grouped in a fieldset with a legend.
 */
export const InAFieldset: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      <fieldset class="fieldset">
        <legend class="fieldset__legend label">Deliverables</legend>
        <div class="choices">
          ${choice('checkbox', 'Automated axe scan', 'checked')}
          ${choice('checkbox', 'Keyboard review')}
          ${choice('checkbox', 'Screen reader walkthrough')}
        </div>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset__legend label">Frequency</legend>
        <div class="choices choices--inline">
          ${choice('radio', 'Daily', 'name="freq" checked')}
          ${choice('radio', 'Weekly', 'name="freq"')}
          ${choice('radio', 'Monthly', 'name="freq"')}
        </div>
      </fieldset>
    </div>
  `,
};
