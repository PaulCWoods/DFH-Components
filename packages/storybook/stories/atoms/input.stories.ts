import type { Meta, StoryObj } from '@storybook/html';

type Size = 'sm' | 'default' | 'lg';
type Prominence = 'default' | 'subtle' | 'plain';

interface InputArgs {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'search' | 'date';
  placeholder: string;
  size: Size;
  prominence: Prominence;
  round: boolean;
  invalid: boolean;
  disabled: boolean;
  readonly: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];
const PROMINENCES: Prominence[] = ['default', 'subtle', 'plain'];

const inputClasses = (size: Size = 'default', prominence: Prominence = 'default', round = false) =>
  [
    'input',
    size !== 'default' ? `input--${size}` : '',
    prominence !== 'default' ? `input--${prominence}` : '',
    round ? 'input--round' : '',
  ]
    .filter(Boolean)
    .join(' ');

let uid = 0;
const field = (label: string, control: (id: string) => string, hint = '') => {
  const id = `input-demo-${++uid}`;
  return `
    <div class="field">
      <label for="${id}" class="field__label">${label}</label>
      ${hint ? `<p id="${id}-hint" class="field__hint">${hint}</p>` : ''}
      ${control(id)}
    </div>`;
};

const meta: Meta<InputArgs> = {
  title: 'Atoms/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Input

A single-line text field. Input, select and textarea share one base (\`atoms/input.css\`), so the axes, flags and states below apply to all three.

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default, \`--sm\`, \`--lg\` | \`--input-size\`, \`--controls-size\` |
| Prominence | outline (default), \`--subtle\`, \`--plain\` | \`--input-prominence\`, \`--controls-prominence\` |
| Corners | \`--round\` | \`--input-corners\`, \`--controls-corners\` |

- A compact container (\`--ui-sizing: compact\`) steps controls to \`--sm\`.
- \`--flush\` drops the inline padding and the boundary, for a field inside a bar that draws both (for example a command palette header with \`.focus-within\`).
- Group classes: \`.controls-sm\`, \`.controls-lg\`, \`.controls-subtle\`, \`.controls-plain\`, \`.controls-round\`.
- Classes only: an \`<input>\` without \`.input\` keeps browser styling.

\`\`\`html
<div class="field">
  <label for="email" class="field__label">Email</label>
  <input id="email" type="email" class="input" autocomplete="email" />
</div>
\`\`\`

#### Accessibility
- Every prominence keeps a 3:1 edge (WCAG 1.4.11): outline has a full border; subtle and plain keep the bottom border.
- \`--sm\` is 32px, the same as a small button. A field can't take a hit-area buffer, so that is also its target: above the 24px minimum (WCAG 2.5.8), below the 48px touch target. To shrink only for mouse and trackpad users, put the controls in a \`fine:ui-compact\` container.
- Invalid styling follows \`:user-invalid\` and \`aria-invalid="true"\`. Pair it with a \`.field__error\` message. Valid fields are not recoloured.
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'date'] },
    placeholder: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES, description: 'Size axis' },
    prominence: { control: 'inline-radio', options: PROMINENCES, description: 'Prominence axis' },
    round: { control: 'boolean', description: '--round corners' },
    invalid: { control: 'boolean', description: 'aria-invalid="true" with an error message' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (args) => `
    <div class="demo-stage demo-constrained--md">
      <div class="field">
        <label for="input-playground" class="field__label">${args.label}</label>
        <input
          id="input-playground"
          type="${args.type}"
          class="${inputClasses(args.size, args.prominence, args.round)}"
          placeholder="${args.placeholder}"
          ${args.invalid ? 'aria-invalid="true" aria-describedby="input-playground-error"' : ''}
          ${args.disabled ? 'disabled' : ''}
          ${args.readonly ? 'readonly value="Read-only value"' : ''}
        />
        ${args.invalid ? '<p id="input-playground-error" class="field__error">Enter an email address in the form name@example.com.</p>' : ''}
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj<InputArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    size: 'default',
    prominence: 'default',
    round: false,
    invalid: false,
    disabled: false,
    readonly: false,
  },
};

/**
 * Outline, subtle and plain. Each keeps a 3:1 edge; subtle and plain keep it on the bottom only.
 */
export const Prominence: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${PROMINENCES.map((p) => field(p, (id) => `<input id="${id}" type="text" class="${inputClasses('default', p)}" placeholder="Search projects" />`)).join('')}
      ${field('round', (id) => `<input id="${id}" type="search" class="input input--round" placeholder="Search projects" />`)}
    </div>
  `,
};

/**
 * Sizes, each beside a button of the same size. A compact container steps both to --sm; fine:ui-compact does so only where the primary pointer is fine (mouse, trackpad).
 */
export const Sizes: Story = {
  render: () => `
    <div class="demo-stage stack">
      ${SIZES.map(
        (s) => `
      <div style="display: grid; grid-template-columns: 1fr auto; align-items: end; gap: var(--spacing-16);">
        ${field(s, (id) => `<input id="${id}" type="text" class="${inputClasses(s)}" placeholder="${s}" />`)}
        <button type="button" class="button${s !== 'default' ? ` button--${s}` : ''}"><span>Apply</span></button>
      </div>`
      ).join('')}
      <div style="display: grid; grid-template-columns: 1fr auto; align-items: end; gap: var(--spacing-16);" class="ui-compact">
        ${field('Compact container', (id) => `<input id="${id}" type="text" class="input" placeholder="Steps to sm" />`)}
        <button type="button" class="button"><span>Apply</span></button>
      </div>
      <div style="display: grid; grid-template-columns: 1fr auto; align-items: end; gap: var(--spacing-16);" class="fine:ui-compact">
        ${field('fine:ui-compact', (id) => `<input id="${id}" type="text" class="input" placeholder="sm with a mouse, default on touch" />`)}
        <button type="button" class="button"><span>Apply</span></button>
      </div>
    </div>
  `,
};

/**
 * Resting, filled, invalid, read-only and disabled. Tab into a field to see the focus ring.
 */
export const States: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${field('Resting', (id) => `<input id="${id}" type="text" class="input" placeholder="Placeholder text" />`)}
      ${field('Filled', (id) => `<input id="${id}" type="text" class="input" value="Ada Lovelace" />`)}
      <div class="field">
        <label for="input-invalid" class="field__label">Invalid</label>
        <input id="input-invalid" type="email" class="input" value="ada@" aria-invalid="true" aria-describedby="input-invalid-error" />
        <p id="input-invalid-error" class="field__error">Enter an email address in the form name@example.com.</p>
      </div>
      ${field('Read-only', (id) => `<input id="${id}" type="text" class="input" value="INV-2048" readonly />`)}
      ${field('Disabled', (id) => `<input id="${id}" type="text" class="input" value="Locked" disabled />`)}
    </div>
  `,
};

/**
 * Container flags and group classes style every control inside, with no classes on the controls.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="demo-stage stack">
      <div class="cluster align-items-end" style="--controls-prominence: subtle; --controls-corners: round;">
        <span class="sb-demo-tag">--controls-prominence: subtle; --controls-corners: round</span>
        ${field('Name', (id) => `<input id="${id}" type="text" class="input" />`)}
        ${field('Role', (id) => `<select id="${id}" class="select"><option>Designer</option><option>Engineer</option></select>`)}
        <button type="button" class="button"><span>Save</span></button>
      </div>
      <div class="cluster align-items-end controls-sm">
        <span class="sb-demo-tag">.controls-sm</span>
        ${field('Filter', (id) => `<input id="${id}" type="search" class="input" />`)}
        <button type="button" class="button"><span>Go</span></button>
      </div>
      <div class="cluster align-items-end" style="--input-prominence: plain;">
        <span class="sb-demo-tag">--input-prominence: plain</span>
        ${field('Title', (id) => `<input id="${id}" type="text" class="input" value="Untitled" />`)}
      </div>
    </div>
  `,
};

/**
 * --flush inside a bar that draws the boundary and the focus ring.
 */
export const Flush: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md">
      <div class="card card--bordered">
        <div class="card__header inline gap-sm focus-within">
          <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
          <input type="search" class="input input--flush focus-none flex-grow" aria-label="Search commands" placeholder="Search commands" />
        </div>
      </div>
    </div>
  `,
};

/**
 * Native types keep their browser pickers. Date and number reserve room for the picker icon.
 */
export const Types: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${field('Date', (id) => `<input id="${id}" type="date" class="input" />`)}
      ${field('Time', (id) => `<input id="${id}" type="time" class="input" />`)}
      ${field('Quantity', (id) => `<input id="${id}" type="number" class="input" value="2" min="1" />`)}
      ${field('Password', (id) => `<input id="${id}" type="password" class="input" autocomplete="new-password" />`)}
    </div>
  `,
};

/**
 * Colour and file inputs.
 */
export const ColorAndFile: Story = {
  render: () => `
    <div class="demo-stage stack">
      <div class="cluster align-items-end">
        ${['color-input--sm', '', 'color-input--lg']
          .map((m, i) => field(['sm', 'default', 'lg'][i], (id) => `<input id="${id}" type="color" class="${['color-input', m].filter(Boolean).join(' ')}" value="#00a39a" />`))
          .join('')}
      </div>
      ${field('Attachment', (id) => `<input id="${id}" type="file" class="file-input" />`)}
    </div>
  `,
};
