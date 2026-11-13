import type { Meta, StoryObj } from '@storybook/html';

type Prominence = 'default' | 'subtle' | 'plain';

interface ChipArgs {
  label: string;
  prominence: Prominence;
  small: boolean;
  round: boolean;
  removable: boolean;
}

const PROMINENCES: Prominence[] = ['default', 'subtle', 'plain'];
const TAGS = ['TypeScript', 'Design Tokens', 'WCAG 2.2', 'CSS'];

const chipClasses = (prominence: Prominence, small = false, round = false) =>
  ['chip', prominence !== 'default' ? `chip--${prominence}` : '', small ? 'chip--sm' : '', round ? 'chip--round' : '']
    .filter(Boolean)
    .join(' ');

const chip = (label: string, classes: string, removable = false) =>
  removable
    ? `<span class="${classes}">
        <span class="chip__text">${label}</span>
        <button type="button" class="chip__remove" aria-label="Remove ${label}">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg>
        </button>
      </span>`
    : `<span class="${classes}"><span class="chip__text">${label}</span></span>`;

const meta: Meta<ChipArgs> = {
  title: 'Atoms/Chip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A token that **represents a value**: a selected option in a combobox, an active filter, a category or tag. It can be removable.

- State ("Passed") is a **Status**.
- A count is a **Badge**.

| Axis | Modifiers | Container flag |
| :--- | :--- | :--- |
| Prominence | default (outline), \`--subtle\`, \`--plain\` | \`--chip-prominence\` |
| Size | default, \`--sm\` | \`--chip-size\` |
| Density | none on the chip; a compact container steps it to \`--sm\` | \`--ui-sizing: compact\` |
| Corners | \`--round\` | \`--chip-corners\` |
| Intent | none: a chip is a value, not a state | |

\`\`\`html
<span class="chip"><span class="chip__text">TypeScript</span></span>

<span class="chip chip--subtle">
  <span class="chip__text">TypeScript</span>
  <button type="button" class="chip__remove" aria-label="Remove TypeScript">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg>
  </button>
</span>
\`\`\`

#### Accessibility (removable chips)
- \`.chip__remove\` is a real \`<button>\`, named for its value ("Remove TypeScript").
- Its hit area is at least 24px (WCAG 2.5.8), extended invisibly through \`::after\`.
- After removal, move focus to the next chip or back to the input that created it. Never leave focus on \`<body>\`.
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Value' },
    prominence: { control: 'select', options: PROMINENCES, description: 'Prominence axis' },
    small: { control: 'boolean', description: 'Size: --sm' },
    round: { control: 'boolean', description: 'Corners: --round' },
    removable: { control: 'boolean', description: 'Adds a .chip__remove button' },
  },
  render: (args) =>
    `<div class="sb-demo-stage">${chip(args.label, chipClasses(args.prominence, args.small, args.round), args.removable)}</div>`,
};

export default meta;
type Story = StoryObj<ChipArgs>;

/**
 * Interactive sandbox for every axis.
 */
export const Playground: Story = {
  args: { label: 'TypeScript', prominence: 'subtle', small: false, round: false, removable: true },
};

/**
 * The three prominences, static and removable, at both sizes.
 */
export const ProminenceAndSize: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${PROMINENCES.map(
        (p) => `
        <div class="cluster">
          <span class="sb-demo-label" style="inline-size: 6rem;">${p}</span>
          ${TAGS.slice(0, 2).map((t) => chip(t, chipClasses(p))).join('')}
          ${TAGS.slice(2).map((t) => chip(t, chipClasses(p), true)).join('')}
          ${chip('Small', chipClasses(p, true))}
          ${chip('Small', chipClasses(p, true), true)}
        </div>`
      ).join('')}
    </div>
  `,
};

/**
 * Active filters: removable chips with a reset action. Tab through to see the remove buttons' focus rings.
 */
export const ActiveFilters: Story = {
  render: () => `
    <div class="sb-demo-stage cluster">
      <span class="small-text">Active filters:</span>
      ${TAGS.map((t) => chip(t, 'chip chip--subtle chip--round', true)).join('')}
      <button type="button" class="button button--plain button--sm"><span>Clear all</span></button>
    </div>
  `,
};

/**
 * Container flags set prominence, size and corners for every chip inside.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="sb-demo-stage cluster" style="--chip-prominence: plain; --chip-size: sm;">
      ${TAGS.map((t) => chip(t, 'chip')).join('')}
    </div>
  `,
};
