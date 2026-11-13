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
      <label for="${id}" class="field__label label">${label}</label>
      ${hint ? `<p id="${id}-hint" class="field__hint small-text">${hint}</p>` : ''}
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
  <label for="email" class="field__label label">Email</label>
  <input id="email" type="email" class="input" autocomplete="email" />
</div>
\`\`\`

#### Accessibility
- Outline has a full 3:1 border and plain keeps its bottom border. Subtle is a tinted field with no border; the border comes back in high contrast and forced colours.
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
    <div class="sb-demo-stage sb-demo-constrained--md">
      <div class="field">
        <label for="input-playground" class="field__label label">${args.label}</label>
        ${args.invalid ? '<p id="input-playground-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#triangle-exclamation-point"/></svg>Enter an email address in the form name@example.com.</p>' : ''}
        <input
          id="input-playground"
          type="${args.type}"
          class="${inputClasses(args.size, args.prominence, args.round)}"
          placeholder="${args.placeholder}"
          ${args.invalid ? 'aria-invalid="true" aria-describedby="input-playground-error"' : ''}
          ${args.disabled ? 'disabled' : ''}
          ${args.readonly ? 'readonly value="Read-only value"' : ''}
        />
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
 * Outline, subtle and plain. Outline has a full 3:1 border and plain a bottom border; subtle has none until high contrast or forced colours.
 */
export const Prominence: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${PROMINENCES.map((p, i) => field(['Project name', 'Client', 'Reference'][i] ?? 'Project', (id) => `<input id="${id}" type="text" class="${inputClasses('default', p)}" placeholder="Search projects" />`)).join('')}
      ${field('Search', (id) => `<input id="${id}" type="search" class="input input--round" placeholder="Search projects" />`)}
    </div>
  `,
};

/**
 * Sizes, each beside a button of the same size. A compact container steps both to --sm; fine:ui-compact does so only where the primary pointer is fine (mouse, trackpad).
 */
export const Sizes: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${SIZES.map(
        (s) => `
      <div style="display: grid; grid-template-columns: 1fr auto; align-items: end; gap: var(--spacing-16);">
        ${field('Title', (id) => `<input id="${id}" type="text" class="${inputClasses(s)}" />`)}
        <button type="button" class="button${s !== 'default' ? ` button--${s}` : ''}"><span>Apply</span></button>
      </div>`
      ).join('')}
      <div style="display: grid; grid-template-columns: 1fr auto; align-items: end; gap: var(--spacing-16);" class="ui-compact">
        ${field('Tag', (id) => `<input id="${id}" type="text" class="input" />`)}
        <button type="button" class="button"><span>Apply</span></button>
      </div>
      <div style="display: grid; grid-template-columns: 1fr auto; align-items: end; gap: var(--spacing-16);" class="fine:ui-compact">
        ${field('Owner', (id) => `<input id="${id}" type="text" class="input" />`)}
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
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${field('Full name', (id) => `<input id="${id}" type="text" class="input" />`)}
      ${field('Author', (id) => `<input id="${id}" type="text" class="input" value="Ada Lovelace" />`)}
      <div class="field">
        <label for="input-invalid" class="field__label label">Invalid</label>
        <p id="input-invalid-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#triangle-exclamation-point"/></svg>Enter an email address in the form name@example.com.</p>
        <input id="input-invalid" type="email" class="input" value="ada@" aria-invalid="true" aria-describedby="input-invalid-error" />
      </div>
      ${field('Invoice number', (id) => `<input id="${id}" type="text" class="input" value="INV-2048" readonly />`)}
      ${field('Workspace', (id) => `<input id="${id}" type="text" class="input" value="Design For Humans" disabled />`)}
    </div>
  `,
};

/**
 * Container flags and group classes style every control inside, with no classes on the controls.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <div class="cluster items-end" style="--controls-prominence: subtle; --controls-corners: round;">
        <span class="sb-demo-tag">--controls-prominence: subtle; --controls-corners: round</span>
        ${field('Name', (id) => `<input id="${id}" type="text" class="input" />`)}
        ${field('Role', (id) => `<select id="${id}" class="select"><option>Designer</option><option>Engineer</option></select>`)}
        <button type="button" class="button"><span>Save</span></button>
      </div>
      <div class="cluster items-end controls-sm">
        <span class="sb-demo-tag">.controls-sm</span>
        ${field('Filter', (id) => `<input id="${id}" type="search" class="input" />`)}
        <button type="button" class="button"><span>Go</span></button>
      </div>
      <div class="cluster items-end" style="--input-prominence: plain;">
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
    <div class="sb-demo-stage sb-demo-constrained--md">
      <div class="card">
        <div class="card__header inline gap-sm focus-within">
          <svg class="icon text-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#search"/></svg>
          <input type="search" class="input input--flush grow" aria-label="Search commands" placeholder="Search commands" />
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
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${field('Date', (id) => `<input id="${id}" type="date" class="input" />`)}
      ${field('Time', (id) => `<input id="${id}" type="time" class="input" />`)}
      ${field('Quantity', (id) => `<input id="${id}" type="number" class="input" value="2" min="1" />`)}
      ${field('Password', (id) => `<input id="${id}" type="password" class="input" autocomplete="new-password" />`)}
    </div>
  `,
};

/**
 * Colour and file inputs. A colour input comes in three sizes, and
 * `--stretch` fills its container.
 */
export const ColorAndFile: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <div class="cluster items-end">
        ${['color-input--sm', '', 'color-input--lg']
          .map((m, i) => field(['Accent', 'Brand', 'Background'][i], (id) => `<input id="${id}" type="color" class="${['color-input', m].filter(Boolean).join(' ')}" value="#00a39a" />`))
          .join('')}
      </div>
      ${field('Seed colour (stretches to fill)', (id) => `<input id="${id}" type="color" class="color-input color-input--stretch" value="#3a7bd5" />`)}
      ${field('Attachment', (id) => `<input id="${id}" type="file" class="file-input" />`)}
    </div>
  `,
};
