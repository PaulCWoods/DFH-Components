import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Border',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Borders, corner radius and rules, on logical properties. Defined in \`utilities/border.css\`.

### Borders
\`.border\` draws a 1px solid border in \`--border-color\` (the text colour unless set). The style and colour classes change one part of it, so they combine:

\`\`\`html
<div class="border border-dashed border-muted rounded-md p-md">…</div>
<div class="border-b border-quiet">…</div>
\`\`\`

| Verbose | Shorthand | Sets |
| :--- | :--- | :--- |
| \`.border\` | – | a 1px border on every side |
| \`.border-md\`, \`.border-lg\` | – | 2px and 4px |
| \`.border-none\` | \`.border-0\` | no border |
| \`.border-block-start\` | \`.border-t\` | the block-start side only (also \`-b\`, \`-s\`, \`-e\`, \`-x\`, \`-y\`) |
| \`.border-style-dashed\` | \`.border-dashed\` | the style (also solid, dotted, double) |
| \`.border-color-muted\` | \`.border-muted\` | the colour (also quiet, accent, success, warning, danger) |
| \`.rounded\` | – | the default radius |
| \`.border-radius-md\` | \`.rounded-md\` | none, sm, md, lg, xl, full |
| \`.rounded-t\`, \`-b\`, \`-s\`, \`-e\` | – | the default radius on one side's corners |

- A colour class sets the colour only: pair it with \`.border\` or a side. An intent colour is never the only sign of the intent (WCAG 1.4.1).
- \`.rule\`, \`.column-rule\` and \`.row-rule\` draw a rule in the gaps of a flex or grid container (CSS gap decorations), where supported. Browsers without them show the gap alone. The layout primitives take \`--ruled\` instead.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const box = (cls: string, label = `.${cls.split(' ').join('.')}`) =>
  `<div class="${cls} p-md"><p class="small-text font-mono">${label}</p></div>`;

export const Playground: Story = {
  args: { width: 'border', style: 'solid', colour: 'default', radius: 'md' },
  argTypes: {
    width: { control: 'inline-radio', options: ['border', 'border-md', 'border-lg'] },
    style: { control: 'inline-radio', options: ['solid', 'dashed', 'dotted', 'double'] },
    colour: { control: 'select', options: ['default', 'muted', 'quiet', 'accent', 'success', 'warning', 'danger'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', 'full'] },
  },
  render: (args) => {
    const cls = [args.width, args.style !== 'solid' && `border-${args.style}`, args.colour !== 'default' && `border-${args.colour}`, `rounded-${args.radius}`]
      .filter(Boolean)
      .join(' ');
    return `<div class="max-inline-size-xs">${box(cls)}</div>`;
  },
};

export const WidthsAndStyles: Story = {
  parameters: { docs: { description: { story: 'Three widths and four styles.' } } },
  render: () => `
    <div class="grid grid--2xs">
      ${['border', 'border-md', 'border-lg'].map((c) => box(`${c} rounded-md`)).join('')}
      ${['dashed', 'dotted', 'double'].map((s) => box(`border-md border-${s} rounded-md`)).join('')}
    </div>`,
};

export const Sides: Story = {
  parameters: { docs: { description: { story: 'One side, or one axis. Start and end follow the text direction.' } } },
  render: () => `
    <div class="grid grid--2-col grid--xs">
      ${['ltr', 'rtl'].map((dir) => `
        <section class="stack" dir="${dir}" aria-labelledby="sides-${dir}">
          <h2 id="sides-${dir}" class="micro-heading">${dir === 'ltr' ? 'Left to right' : 'Right to left'}</h2>
          <div class="grid grid--2xs">
            ${['t', 'b', 's', 'e', 'x', 'y'].map((s) => box(`border-${s} border-muted`)).join('')}
          </div>
        </section>`).join('')}
    </div>`,
};

export const Colours: Story = {
  parameters: { docs: { description: { story: 'A colour class with `.border`. The intent colours carry words here too.' } } },
  render: () => `
    <div class="grid grid--2xs">
      ${box('border border-muted rounded-md')}
      ${box('border border-quiet rounded-md')}
      ${box('border-md border-accent rounded-md', 'Accent: featured')}
      ${box('border-md border-success rounded-md', 'Success: watered')}
      ${box('border-md border-warning rounded-md', 'Warning: dry soil')}
      ${box('border-md border-danger rounded-md', 'Danger: frost tonight')}
    </div>`,
};

export const Radius: Story = {
  parameters: { docs: { description: { story: 'The radius scale, and the default radius on one side\'s corners.' } } },
  render: () => `
    <div class="grid grid--2xs">
      ${['none', 'sm', 'md', 'lg', 'xl', 'full'].map((r) => box(`border border-muted rounded-${r}`)).join('')}
      ${['t', 'b', 's', 'e'].map((r) => box(`border border-muted rounded-${r}`)).join('')}
    </div>`,
};

export const Rules: Story = {
  parameters: { docs: { description: { story: '`.rule` on a flex row: a rule in each gap, where gap decorations are supported. Elsewhere the gap separates the items alone.' } } },
  render: () => `
    <div class="flex flex-wrap gap-md rule">
      <span class="small-text">Sow</span><span class="small-text">Prick out</span><span class="small-text">Harden off</span><span class="small-text">Plant</span>
    </div>`,
};
