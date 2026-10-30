import type { Meta, StoryObj } from '@storybook/html';

const STEPS: [string, string][] = [
  ['2xs', '8rem'],
  ['xs', '16rem'],
  ['sm', '24rem'],
  ['md', '36rem'],
  ['lg', '48rem'],
  ['xl', '64rem'],
  ['2xl', '80rem'],
];

const meta: Meta = {
  title: 'Utilities/Sizing',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Inline and block sizes from the Tier 2 block scale. Defined in \`utilities/sizing.css\`.

| Step | Token | Size |
| :--- | :--- | :--- |
${STEPS.map(([s, v]) => `| \`${s}\` | \`--spacing-block${s === 'md' ? '' : `-${s}`}\` | ${v} |`).join('\n')}

| Verbose | Shorthand | Sets |
| :--- | :--- | :--- |
| \`.inline-size-{step}\` | – | \`inline-size\` |
| \`.inline-size-full\`, \`-auto\`, \`-screen\` | \`.w-full\`, \`.w-auto\`, \`.w-screen\` | |
| \`.min-inline-size-{step}\`, \`.max-inline-size-{step}\` | – | never more than the space available |
| \`.min-inline-size-0\` | \`.min-w-0\` | lets a flex or grid item shrink below its content |
| \`.max-inline-size-full\`, \`-none\` | \`.max-w-full\`, \`.max-w-none\` | |
| \`.block-size-{step}\`, \`.min-block-size-{step}\`, \`.max-block-size-{step}\` | – | the block sizes |
| \`.block-size-full\`, \`-auto\`, \`-screen\` | \`.h-full\`, \`.h-auto\`, \`.h-screen\` | |
| \`.min-block-size-0\`, \`-screen\`; \`.max-block-size-full\` | \`.min-h-0\`, \`.min-h-screen\`, \`.max-h-full\` | |
| \`.size-unit\`, \`.size-target\`, \`.size-{step}\`, \`.size-full\` | – | both sizes: a square |

- Tailwind's \`w-*\` steps name other sizes, so the steps have the verbose name only.
- **Components size themselves** from their tokens (a dialog from \`--dialog-max-width\`, a popover from \`--popover-max-width\`). Set the token, not a size class, on a component.
- \`.size-target\` is the 48px target size: use it for a custom control's hit area.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const bar = (cls: string) =>
  `<div class="${cls} bg-subtle border border-quiet rounded-sm px-sm py-xs"><p class="small-text font-mono truncate">.${cls}</p></div>`;

export const Playground: Story = {
  args: { property: 'max-inline-size', step: 'sm' },
  argTypes: {
    property: { control: 'inline-radio', options: ['inline-size', 'max-inline-size', 'min-inline-size'] },
    step: { control: 'select', options: STEPS.map(([s]) => s) },
  },
  render: (args) => bar(`${args.property}-${args.step}${args.property === 'inline-size' ? '' : ' w-full'}`),
};

export const MaximumInlineSize: Story = {
  parameters: { docs: { description: { story: 'Each maximum on a full-width bar. A maximum wider than the canvas stops at the canvas.' } } },
  render: () => `<div class="stack">${STEPS.map(([s]) => bar(`max-inline-size-${s}`)).join('')}${bar('max-w-full')}</div>`,
};

export const Squares: Story = {
  parameters: { docs: { description: { story: '`.size-*` sets both sizes: an icon well, a placeholder, a hit area.' } } },
  render: () => `
    <div class="flex flex-wrap items-end gap-md" aria-hidden="true">
      ${['size-unit', 'size-target', 'size-2xs', 'size-xs'].map((c) => `<div class="${c} bg-accent rounded-md border border-accent"></div>`).join('')}
    </div>
    <p class="small-text font-mono mt-sm">.size-unit · .size-target · .size-2xs · .size-xs</p>`,
};

export const ShrinkingInARow: Story = {
  parameters: { docs: { description: { story: 'A flex item won\'t shrink below its content until it has `.min-w-0`, so the text inside can\'t be cut. With it, `.truncate` on the text works.' } } },
  render: () => `
    <div class="stack max-inline-size-xs overflow-x-auto" tabindex="0" role="region" aria-label="Flex rows, without and with .min-w-0">
      ${['', 'min-w-0'].map((c) => `
        <div class="flex gap-sm bg-subtle rounded-md p-sm">
          <span class="chip shrink-0">Bed 4</span>
          <div class="${c}"><p class="small-text truncate">${c ? '.min-w-0: ' : 'Without .min-w-0: '}Pulmonaria officinalis 'Sissinghurst White'</p></div>
        </div>`).join('')}
    </div>`,
};
