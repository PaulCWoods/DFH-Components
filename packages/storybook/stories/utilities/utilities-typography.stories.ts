import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Family, weight, style, alignment, case and wrapping. Defined in \`utilities/typography.css\`.

**There are no size or line-height utilities.** Type size belongs to the text atoms (\`.small-text\`, \`.text\`, \`.large-text\`, \`.small-heading\` …), which carry their line height and follow \`--font-sizing\` (fixed, fluid, cq, compact). See Atoms/Text.

| Verbose | Shorthand | Sets |
| :--- | :--- | :--- |
| \`.font-family-sans\`, \`-serif\`, \`-mono\` | \`.font-sans\`, \`.font-serif\`, \`.font-mono\` | \`font-family\` |
| \`.font-family-display\` | – | the title family |
| \`.font-weight-normal\`, \`-medium\`, \`-semibold\`, \`-bold\` | \`.font-normal\` … \`.font-bold\` | \`font-weight\` |
| \`.font-style-italic\`, \`-normal\` | \`.italic\`, \`.not-italic\` | \`font-style\` |
| \`.text-align-start\`, \`-end\`, \`-center\`, \`-justify\` | \`.text-start\` … | \`text-align\` |
| \`.text-transform-uppercase\`, \`-lowercase\`, \`-capitalize\`, \`-none\` | \`.uppercase\`, \`.lowercase\`, \`.capitalize\`, \`.normal-case\` | \`text-transform\` |
| \`.white-space-nowrap\` (and normal, pre, pre-line, pre-wrap) | \`.whitespace-nowrap\` … | \`white-space\` |
| \`.text-wrap-wrap\`, \`-nowrap\`, \`-balance\`, \`-pretty\` | \`.text-wrap\`, \`.text-nowrap\`, \`.text-balance\`, \`.text-pretty\` | \`text-wrap\` |
| \`.overflow-wrap-break-word\`, \`-anywhere\` | \`.wrap-break-word\`, \`.wrap-anywhere\` | \`overflow-wrap\` |
| \`.truncate\` | – | one line, cut with an ellipsis |
| \`.text-box-trim-both\` | – | trims the space above the cap height and below the baseline |

- Alignment is logical: \`.text-start\` is the right edge in right-to-left text. There is no \`.text-left\`.
- \`.text-nowrap\` sets \`text-wrap\`, as in Tailwind; \`white-space\` is \`.whitespace-nowrap\`.
- Text colours are in Utilities/Colour.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const LINE = 'Shade-loving perennials for a north-facing border';

export const Playground: Story = {
  args: { family: 'sans', weight: 'normal', align: 'start', transform: 'none', italic: false },
  argTypes: {
    family: { control: 'inline-radio', options: ['sans', 'serif', 'mono'] },
    weight: { control: 'inline-radio', options: ['normal', 'medium', 'semibold', 'bold'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end', 'justify'] },
    transform: { control: 'inline-radio', options: ['none', 'uppercase', 'lowercase', 'capitalize'] },
  },
  render: (args) => {
    const cls = [
      `font-${args.family}`,
      `font-${args.weight}`,
      `text-${args.align}`,
      args.transform === 'none' ? 'normal-case' : args.transform,
      args.italic && 'italic',
    ]
      .filter(Boolean)
      .join(' ');
    return `
      <div class="stack max-inline-size-sm">
        <p class="text ${cls}">${LINE}. Lungwort, barrenwort and foam flower spread under the trees.</p>
        <p class="small-text font-mono text-muted">.${cls.split(' ').join(' .')}</p>
      </div>`;
  },
};

export const FamilyAndWeight: Story = {
  parameters: { docs: { description: { story: 'Each family at each weight, on the `.text` atom.' } } },
  render: () => `
    <div class="grid grid--xs">
      ${['sans', 'serif', 'mono', 'display'].map((f) => `
        <section class="stack" aria-labelledby="family-${f}">
          <h2 id="family-${f}" class="micro-heading">.font-${f === 'display' ? 'family-display' : f}</h2>
          ${['normal', 'medium', 'semibold', 'bold'].map((w) => `<p class="text ${f === 'display' ? 'font-family-display' : `font-${f}`} font-${w}">${w}: Lungwort</p>`).join('')}
        </section>`).join('')}
    </div>`,
};

export const AlignmentAndCase: Story = {
  parameters: { docs: { description: { story: 'Logical alignment in both directions, and the case transforms.' } } },
  render: () => `
    <div class="grid grid--2-col grid--xs">
      ${['ltr', 'rtl'].map((dir) => `
        <section class="stack" dir="${dir}" aria-labelledby="align-${dir}">
          <h2 id="align-${dir}" class="micro-heading">${dir === 'ltr' ? 'Left to right' : 'Right to left'}</h2>
          ${['start', 'center', 'end'].map((a) => `<p class="small-text text-${a} bg-subtle p-xs rounded-sm">.text-${a}</p>`).join('')}
        </section>`).join('')}
      <section class="stack" aria-labelledby="case">
        <h2 id="case" class="micro-heading">Case</h2>
        ${['uppercase', 'lowercase', 'capitalize', 'normal-case'].map((t) => `<p class="small-text ${t}">.${t}: Ferns For Dry Shade</p>`).join('')}
      </section>
    </div>`,
};

export const Wrapping: Story = {
  parameters: { docs: { description: { story: 'Balanced and pretty wrapping, truncation, and breaking a long word.' } } },
  render: () => `
    <div class="grid grid--2-col grid--2xs">
      <div class="card"><div class="card__body"><p class="small-heading text-balance">.text-balance: ${LINE}</p></div></div>
      <div class="card"><div class="card__body"><p class="text text-pretty">.text-pretty: ${LINE}, with no single word left on the last line.</p></div></div>
      <div class="card"><div class="card__body"><p class="text truncate">.truncate: ${LINE} and under deciduous trees</p></div></div>
      <div class="card"><div class="card__body"><p class="text wrap-anywhere">.wrap-anywhere: https://example.com/plants/shade/perennials/north-facing-border</p></div></div>
      <div class="card"><div class="card__body"><p class="text whitespace-pre-line">.whitespace-pre-line:
Sow in March.
Plant out in May.</p></div></div>
      <div class="card"><div class="card__body"><p class="text text-nowrap">.text-nowrap: kept on one line</p></div></div>
    </div>`,
};
