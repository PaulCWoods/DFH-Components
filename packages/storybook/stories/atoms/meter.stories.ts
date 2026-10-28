import type { Meta, StoryObj } from '@storybook/html';

type Size = 'sm' | 'default' | 'lg';

interface MeterArgs {
  label: string;
  value: number;
  thresholds: boolean;
  size: Size;
  round: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];

/** Disk-use style ranges: low is good, high is bad. */
const RANGES = 'low="60" high="85" optimum="20"';

const meterClasses = (size: Size = 'default', round = false) =>
  ['meter', size !== 'default' ? `meter--${size}` : '', round ? 'meter--round' : ''].filter(Boolean).join(' ');

let uid = 0;
/** A labelled meter with its value stated as text beside it. */
const field = (label: string, value: number, attrs = '', classes = 'meter', readout = `${value}%`) => {
  const id = `meter-demo-${++uid}`;
  return `
    <div class="field">
      <div class="field__header">
        <label for="${id}" class="field__label">${label}</label>
        <span class="field__result">${readout}</span>
      </div>
      <meter id="${id}" class="${classes}" value="${value}" ${/\bmax=/.test(attrs) ? '' : 'min="0" max="100"'} ${attrs}>${readout}</meter>
    </div>`;
};

const meta: Meta<MeterArgs> = {
  title: 'Atoms/Meter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Meter

A native \`<meter>\`: a measurement within a known range, such as disk use or a score.

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default (8px), \`--sm\` (4px), \`--lg\` (16px) | \`--meter-size\` |
| Corners | \`--round\` | \`--meter-corners\` |

- **Colour follows the value.** With \`low\`, \`high\` and \`optimum\` set, the browser picks the region: the optimum region is success, the next warning, the worst danger. With none set, the meter is a plain measurement and fills in accent.
- There are no intent classes: they would let the colour disagree with the value.
- Name every meter and state its value as text beside it (WCAG 1.4.1).
- A compact container steps the meter to \`--sm\`.

\`\`\`html
<div class="field">
  <div class="field__header">
    <label for="disk" class="field__label">Disk use</label>
    <span class="field__result">72 GB of 100 GB</span>
  </div>
  <meter id="disk" class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72 GB</meter>
</div>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'range', min: 0, max: 100 } },
    thresholds: { control: 'boolean', description: 'low="60" high="85" optimum="20"' },
    size: { control: 'inline-radio', options: SIZES },
    round: { control: 'boolean', description: '--round' },
  },
  render: (args) => `
    <div class="demo-stage demo-constrained--md">
      ${field(args.label, args.value, args.thresholds ? RANGES : '', meterClasses(args.size, args.round))}
    </div>
  `,
};

export default meta;
type Story = StoryObj<MeterArgs>;

/**
 * Interactive sandbox. Turn thresholds on and move the value to see the colour follow it.
 */
export const Playground: Story = {
  args: { label: 'Disk use', value: 72, thresholds: true, size: 'default', round: false },
};

/**
 * With thresholds, the region the value falls in sets the colour.
 */
export const Ranges: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${field('Disk use: healthy', 25, RANGES, 'meter', '25 GB of 100 GB')}
      ${field('Disk use: getting full', 72, RANGES, 'meter', '72 GB of 100 GB')}
      ${field('Disk use: critical', 94, RANGES, 'meter', '94 GB of 100 GB')}
      ${field('Password strength', 4, 'min="0" max="4" low="2" high="3" optimum="4"', 'meter', 'Strong')}
    </div>
  `,
};

/**
 * Without thresholds, a meter is a plain measurement and fills in accent.
 */
export const PlainMeasurement: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${field('Seats booked', 30, '', 'meter', '12 of 40')}
      ${field('Course completed', 65)}
    </div>
  `,
};

/**
 * Sizes, round corners, and a compact container stepping the meter to --sm.
 */
export const Sizes: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${SIZES.map((s) => field(`Size ${s}`, 72, RANGES, meterClasses(s))).join('')}
      ${field('Round', 72, RANGES, meterClasses('lg', true))}
      <div class="ui-compact">${field('Compact container', 72, RANGES)}</div>
    </div>
  `,
};

/**
 * The fill follows the text direction.
 */
export const Direction: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div dir="ltr">${field('Disk use', 72, RANGES, meterClasses('lg'))}</div>
      <div dir="rtl">${field('استخدام القرص', 72, RANGES, meterClasses('lg'))}</div>
    </div>
  `,
};
