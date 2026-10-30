import type { Meta, StoryObj } from '@storybook/html';

type Size = 'sm' | 'default' | 'lg';
type Prominence = 'default' | 'subtle' | 'plain';

interface TextareaArgs {
  label: string;
  size: Size;
  prominence: Prominence;
  oneLine: boolean;
  invalid: boolean;
  disabled: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];
const PROMINENCES: Prominence[] = ['default', 'subtle', 'plain'];

const textareaClasses = (size: Size = 'default', prominence: Prominence = 'default', oneLine = false) =>
  [
    'textarea',
    size !== 'default' ? `textarea--${size}` : '',
    prominence !== 'default' ? `textarea--${prominence}` : '',
    oneLine ? 'textarea--one-line' : '',
  ]
    .filter(Boolean)
    .join(' ');

let uid = 0;
const field = (label: string, control: (id: string) => string) => {
  const id = `textarea-demo-${++uid}`;
  return `
    <div class="field">
      <label for="${id}" class="field__label label">${label}</label>
      ${control(id)}
    </div>`;
};

const meta: Meta<TextareaArgs> = {
  title: 'Atoms/Textarea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A multi-line text field that grows with its content (\`field-sizing: content\`) between \`--textarea-lines-min\` (3) and \`--textarea-lines-max\` (16) lines. It shares the text control base with input and select (see **Atoms/Input**).

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default, \`--sm\`, \`--lg\` | \`--textarea-size\`, \`--controls-size\` |
| Prominence | outline (default), \`--subtle\`, \`--plain\` | \`--textarea-prominence\`, \`--controls-prominence\` |
| Corners | \`--round\` | \`--textarea-corners\`, \`--controls-corners\` |

Also \`--one-line\`: starts at one line and grows.

\`\`\`html
<div class="field">
  <label for="feedback" class="field__label label">Feedback</label>
  <textarea id="feedback" class="textarea"></textarea>
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
    oneLine: { control: 'boolean', description: '--one-line' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => `
    <div class="demo-stage demo-constrained--md">
      <div class="field">
        <label for="textarea-playground" class="field__label label">${args.label}</label>
        ${args.invalid ? '<p id="textarea-playground-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Tell us at least one thing.</p>' : ''}
        <textarea
          id="textarea-playground"
          class="${textareaClasses(args.size, args.prominence, args.oneLine)}"
          ${args.invalid ? 'aria-invalid="true" aria-describedby="textarea-playground-error"' : ''}
          ${args.disabled ? 'disabled' : ''}
        >Type to see it grow.</textarea>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj<TextareaArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { label: 'Feedback', size: 'default', prominence: 'default', oneLine: false, invalid: false, disabled: false },
};

/**
 * Outline, subtle and plain.
 */
export const Prominence: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${PROMINENCES.map((p) => field(p, (id) => `<textarea id="${id}" class="${textareaClasses('default', p)}"></textarea>`)).join('')}
    </div>
  `,
};

/**
 * Sizes step the type and padding. Height follows the line count.
 */
export const Sizes: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${SIZES.map((s) => field(s, (id) => `<textarea id="${id}" class="${textareaClasses(s)}"></textarea>`)).join('')}
    </div>
  `,
};

/**
 * Line limits: one line that grows, and a field capped at 5 lines that scrolls after that.
 */
export const Lines: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${field('Comment (--one-line)', (id) => `<textarea id="${id}" class="textarea textarea--one-line" placeholder="Add a comment"></textarea>`)}
      ${field('Notes (--textarea-lines-max: 5)', (id) => `<textarea id="${id}" class="textarea" style="--textarea-lines-max: 5;">One\nTwo\nThree\nFour\nFive\nSix\nSeven</textarea>`)}
    </div>
  `,
};

/**
 * Invalid, read-only and disabled.
 */
export const States: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="field">
        <label for="textarea-invalid" class="field__label label">Invalid</label>
        <p id="textarea-invalid-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Tell us at least one thing.</p>
        <textarea id="textarea-invalid" class="textarea" aria-invalid="true" aria-describedby="textarea-invalid-error"></textarea>
      </div>
      ${field('Read-only', (id) => `<textarea id="${id}" class="textarea" readonly>Submitted on 3 March.</textarea>`)}
      ${field('Disabled', (id) => `<textarea id="${id}" class="textarea" disabled>Locked</textarea>`)}
    </div>
  `,
};
