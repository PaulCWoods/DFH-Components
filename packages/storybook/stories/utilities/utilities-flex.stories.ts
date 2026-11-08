import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Display & Flex',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Display values, and direction, wrapping, alignment and growth for flex and grid. Defined in \`utilities/display.css\` and \`utilities/flex.css\`.

**Reach for a layout primitive first.** A row of things is \`.inline\` (no wrap) or \`.cluster\` (wraps), a column is \`.stack\`, columns are \`.grid\`, a main and a side are \`.split\`. They already align and space their children, and step down under compact density. Use these utilities to adjust one, or on an element that isn't a layout.

### Display
| Verbose | Shorthand |
| :--- | :--- |
| \`.display-block\` | \`.block\` |
| \`.display-inline\` | – (\`.inline\` is the layout primitive) |
| \`.display-inline-block\` | \`.inline-block\` |
| \`.display-flex\` | \`.flex\` |
| \`.display-inline-flex\` | \`.inline-flex\` |
| \`.display-contents\` | \`.contents\` |
| \`.display-none\` | \`.hidden\` |

To hide something at a size, use the responsive helpers (\`.md:hide\`). To hide it from everyone, the \`hidden\` attribute is better than a class: the reset keeps it hidden whatever \`display\` a component sets.

### Flex and grid
| Verbose | Shorthand |
| :--- | :--- |
| \`.flex-direction-row\`, \`-row-reverse\`, \`-column\`, \`-column-reverse\` | \`.flex-row\`, \`.flex-row-reverse\`, \`.flex-col\`, \`.flex-col-reverse\` |
| \`.flex-wrap-wrap\`, \`-nowrap\`, \`-wrap-reverse\` | \`.flex-wrap\`, \`.flex-nowrap\`, \`.flex-wrap-reverse\` |
| \`.align-items-start\` (center, end, stretch, baseline) | \`.items-start\` … |
| \`.justify-content-start\` (center, end, space-between, space-around, space-evenly) | \`.justify-start\` … \`.justify-between\`, \`.justify-around\`, \`.justify-evenly\` |
| \`.align-self-start\` (auto, center, end, stretch, baseline) | \`.self-start\` … |
| \`.justify-self-start\` (center, end, stretch) | – |
| \`.flex-grow-1\`, \`.flex-grow-0\` | \`.grow\`, \`.grow-0\` |
| \`.flex-shrink-1\`, \`.flex-shrink-0\` | \`.shrink\`, \`.shrink-0\` |
| \`.flex-1\`, \`.flex-auto\`, \`.flex-none\` | – |

Reversing the order (\`-reverse\`) moves things visually but not in the reading or tab order (WCAG 1.3.2, 2.4.3). Use it only where the order doesn't carry meaning.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const chips = (n = 3) => ['Fern', 'Hosta', 'Moss', 'Sedge', 'Ivy'].slice(0, n).map((t) => `<span class="chip">${t}</span>`).join('');

export const Playground: Story = {
  args: { direction: 'row', align: 'center', justify: 'start', wrap: 'nowrap' },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'col'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'inline-radio', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    wrap: { control: 'inline-radio', options: ['nowrap', 'wrap'] },
  },
  render: (args) => {
    const cls = `flex flex-${args.direction} items-${args.align} justify-${args.justify} flex-${args.wrap} gap-sm`;
    return `
      <div class="stack">
        <div class="${cls} bg-subtle rounded-md p-sm block-size-2xs">${chips()}</div>
        <p class="small-text font-mono text-muted">.${cls.split(' ').join(' .')}</p>
      </div>`;
  },
};

export const Justify: Story = {
  parameters: { docs: { description: { story: 'Distribution along the main axis. For a row with one end item, `.inline--between` or `.cluster--between` is the primitive\'s own modifier.' } } },
  render: () => `
    <div class="stack">
      ${['start', 'center', 'end', 'between', 'around', 'evenly'].map((j) => `
        <div class="flex flex-wrap justify-${j} gap-sm bg-subtle rounded-md p-sm">${chips()}<span class="chip font-mono">.justify-${j}</span></div>`).join('')}
    </div>`,
};

export const AlignSelfAndGrowth: Story = {
  parameters: { docs: { description: { story: 'One item placed on its own, and items that grow or keep their size.' } } },
  render: () => `
    <div class="stack">
      <div class="flex flex-wrap gap-sm bg-subtle rounded-md p-sm block-size-2xs">
        ${['start', 'center', 'end', 'stretch'].map((s) => `<span class="chip self-${s}">.self-${s}</span>`).join('')}
      </div>
      <div class="flex gap-sm bg-subtle rounded-md p-sm">
        <span class="chip shrink-0">.shrink-0</span>
        <span class="chip grow">.grow</span>
        <span class="chip flex-none">.flex-none</span>
      </div>
    </div>`,
};

export const Display: Story = {
  parameters: { docs: { description: { story: 'Display values side by side. `.hidden` removes the last item.' } } },
  render: () => `
    <div class="stack">
      <p class="text">
        <span class="display-inline bg-subtle px-xs">.display-inline</span>
        <span class="inline-block bg-subtle px-xs">.inline-block</span>
        <span class="block bg-subtle px-xs mt-xs">.block</span>
      </p>
      <div class="inline-flex gap-xs bg-subtle rounded-md p-xs">${chips(2)}</div>
      <ul class="flex gap-sm" role="list">
        <li class="contents"><span class="chip">.contents keeps the chip in the row</span></li>
        <li class="chip">Visible</li>
        <li class="chip hidden">.hidden</li>
      </ul>
    </div>`,
};
