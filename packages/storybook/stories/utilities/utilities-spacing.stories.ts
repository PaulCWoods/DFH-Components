import type { Meta, StoryObj } from '@storybook/html';

const STEPS = ['0', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'breathe-sm', 'breathe', 'cushion', 'cushion-lg'];
const SIDES = [
  ['', '', 'all sides'],
  ['-block', 'y', 'block'],
  ['-inline', 'x', 'inline'],
  ['-block-start', 't', 'block start'],
  ['-block-end', 'b', 'block end'],
  ['-inline-start', 's', 'inline start'],
  ['-inline-end', 'e', 'inline end'],
];

const meta: Meta = {
  title: 'Utilities/Spacing',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Margin, padding and gap on logical properties, from the Tier 2 spacing steps. Defined in \`utilities/spacing.css\`.

### Names
Each class has a verbose name (the property and the step) and Tailwind's shorthand prefix with the library's step. Examples use the shorthand.

| Verbose | Shorthand | Property |
| :--- | :--- | :--- |
| \`.padding-md\` | \`.p-md\` | \`padding\` |
| \`.padding-block-md\` | \`.py-md\` | \`padding-block\` |
| \`.padding-inline-md\` | \`.px-md\` | \`padding-inline\` |
| \`.padding-block-start-md\` | \`.pt-md\` | \`padding-block-start\` |
| \`.padding-block-end-md\` | \`.pb-md\` | \`padding-block-end\` |
| \`.padding-inline-start-md\` | \`.ps-md\` | \`padding-inline-start\` |
| \`.padding-inline-end-md\` | \`.pe-md\` | \`padding-inline-end\` |
| \`.margin-*\` | \`.m-*\`, \`.my-*\` … | the same for margin, plus \`auto\` |
| \`.gap-md\` | – | \`gap\` |
| \`.row-gap-md\` | \`.gap-y-md\` | \`row-gap\` |
| \`.column-gap-md\` | \`.gap-x-md\` | \`column-gap\` |

### Steps
\`0\`, \`2xs\` (2px), \`xs\` (4px), \`sm\` (8px), \`md\` (16px), \`lg\` (32px), \`xl\` (48px), \`2xl\` (64px), \`3xl\` (128px), \`breathe\` and \`cushion\` (fluid). They read \`--spacing-2xs\` … \`--spacing-3xl\`, \`--spacing-breathe\` and \`--spacing-cushion\`, which designers see under the same names in Figma.

- \`t\`/\`b\` are block start and end, \`s\`/\`e\` inline start and end. There are no left or right names: in right-to-left text \`.ps-md\` pads the right.
- A layout primitive (\`.stack\`, \`.cluster\`, \`.grid\`) spaces its children; set its \`--gap\` or a modifier rather than margins on the children.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// The subtle band is the spacing; the card is the content
const sample = (cls: string, label = `.${cls}`) => `
  <div class="bg-muted rounded-md ${cls}">
    <div class="card"><div class="card__body"><p class="small-text font-mono">${label}</p></div></div>
  </div>`;

export const Playground: Story = {
  args: { property: 'padding', side: 'all sides', step: 'md' },
  argTypes: {
    property: { control: 'inline-radio', options: ['padding', 'margin'] },
    side: { control: 'select', options: SIDES.map((s) => s[2]) },
    step: { control: 'select', options: STEPS },
  },
  render: (args) => {
    const [, short] = SIDES.find((s) => s[2] === args.side)!;
    const cls = `${args.property === 'padding' ? 'p' : 'm'}${short}-${args.step}`;
    return args.property === 'padding'
      ? sample(cls)
      : `<div class="bg-muted rounded-md flex flex-col">
          <div class="card ${cls}"><div class="card__body"><p class="small-text font-mono">.${cls}</p></div></div>
        </div>`;
  },
};

export const Steps: Story = {
  parameters: { docs: { description: { story: 'Padding at each step. The tinted band is the padding.' } } },
  render: () => `
    <div class="grid grid--xs align-items-start">
      ${STEPS.map((s) => sample(`p-${s}`)).join('')}
    </div>`,
};

export const Sides: Story = {
  parameters: { docs: { description: { story: 'Each side at the `lg` step, in left-to-right and right-to-left text. The start side follows the text direction.' } } },
  render: () => `
    <div class="grid grid--2-col grid--xs">
      ${['ltr', 'rtl'].map((dir) => `
        <section class="stack" dir="${dir}" aria-labelledby="sides-${dir}">
          <h2 id="sides-${dir}" class="micro-heading">${dir === 'ltr' ? 'Left to right' : 'Right to left'}</h2>
          ${SIDES.slice(1).map(([, short]) => sample(`p${short}-lg`)).join('')}
        </section>`).join('')}
    </div>`,
};

export const Margins: Story = {
  parameters: { docs: { description: { story: '`.mx-auto` centres a block with a maximum size; `.ms-auto` pushes an item in a row to the end.' } } },
  render: () => `
    <div class="stack">
      <div class="bg-muted rounded-md p-sm">
        <div class="card max-inline-size-xs mx-auto"><div class="card__body"><p class="small-text font-mono">.max-inline-size-xs.mx-auto</p></div></div>
      </div>
      <div class="bg-muted rounded-md p-sm flex gap-sm">
        <span class="chip">Shade</span>
        <span class="chip">Moist soil</span>
        <span class="chip ms-auto">.ms-auto</span>
      </div>
    </div>`,
};

export const Gaps: Story = {
  parameters: { docs: { description: { story: '`.gap-*` on a flex container, and the row and column gaps apart. A layout primitive takes `--gap` instead.' } } },
  render: () => `
    <div class="stack">
      ${['xs', 'sm', 'md', 'lg'].map((s) => `
        <div class="bg-muted rounded-md p-sm flex flex-wrap gap-${s}">
          <span class="chip font-mono">.gap-${s}</span><span class="chip">Fern</span><span class="chip">Hosta</span><span class="chip">Moss</span>
        </div>`).join('')}
      <div class="bg-muted rounded-md p-sm flex flex-wrap gap-x-xl gap-y-xs">
        ${['.gap-x-xl', '.gap-y-xs', 'Astilbe', 'Brunnera', 'Epimedium', 'Heuchera', 'Pulmonaria', 'Tiarella', 'Tradescantia'].map((t) => `<span class="chip">${t}</span>`).join('')}
      </div>
    </div>`,
};
