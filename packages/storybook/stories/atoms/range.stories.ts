import type { Meta, StoryObj } from '@storybook/html';

type Size = 'sm' | 'default' | 'lg';
type Intent = 'accent' | 'info' | 'success' | 'warning' | 'danger';

interface RangeArgs {
  label: string;
  value: number;
  size: Size;
  intent: Intent;
  disabled: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];
const INTENTS: Intent[] = ['accent', 'info', 'success', 'warning', 'danger'];

/** Keeps --value (the Blink/WebKit fill) and the readout in step with the slider. */
const SYNC = `oninput="this.style.setProperty('--value', ((this.value - this.min) / (this.max - this.min) * 100) + '%'); const o = document.querySelector('output[for=&quot;' + this.id + '&quot;]'); if (o) o.textContent = this.value + '%';"`;

const rangeClasses = (size: Size = 'default', intent: Intent = 'accent') =>
  ['range', size !== 'default' ? `range--${size}` : '', intent !== 'accent' ? `range--${intent}` : ''].filter(Boolean).join(' ');

let uid = 0;
const field = (label: string, value: number, classes = 'range', attrs = '') => {
  const id = `range-demo-${++uid}`;
  return `
    <div class="field">
      <div class="field__header">
        <label for="${id}" class="field__label label">${label}</label>
        <output for="${id}" class="small-text">${value}%</output>
      </div>
      <input id="${id}" type="range" class="${classes}" min="0" max="100" value="${value}" style="--value: ${value}%;" ${SYNC} ${attrs} />
    </div>`;
};

const meta: Meta<RangeArgs> = {
  title: 'Atoms/Range',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
An \`<input type="range">\` slider with a token-driven track, fill and thumb.

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default, \`--sm\`, \`--lg\` | \`--range-size\`, \`--controls-size\` |
| Intent | accent (default), \`--info\`, \`--success\`, \`--warning\`, \`--danger\` | \`--range-intent\` |

- A compact container steps the range to \`--sm\`.
- The slider is at least \`--spacing-target-min\` tall whatever its visual size, so even \`--sm\` meets the target size (WCAG 2.5.8).
- Blink and WebKit draw the fill from \`--value\` (a percentage, updated by script on \`input\`); Gecko draws it natively. The fill follows the text direction.
- Pair intent with an \`<output>\` that states the value (WCAG 1.4.1).

\`\`\`html
<div class="field">
  <div class="field__header">
    <label for="volume" class="field__label label">Volume</label>
    <output for="volume" class="small-text">65%</output>
  </div>
  <input id="volume" type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" />
</div>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: 'inline-radio', options: SIZES },
    intent: { control: 'select', options: INTENTS },
    disabled: { control: 'boolean' },
  },
  render: (args) => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      ${field(args.label, args.value, rangeClasses(args.size, args.intent), args.disabled ? 'disabled' : '')}
    </div>
  `,
};

export default meta;
type Story = StoryObj<RangeArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { label: 'Volume', value: 65, size: 'default', intent: 'accent', disabled: false },
};

/**
 * Sizes. The track and thumb shrink; the hit area doesn't.
 */
export const Sizes: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${SIZES.map((s, n) => field(['Bass', 'Mid', 'Treble'][n], 40, rangeClasses(s))).join('')}
      <div class="ui-compact">${field('Balance', 40)}</div>
    </div>
  `,
};

/**
 * Intents, each with an output that states the value.
 */
export const Intents: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${INTENTS.map((i, n) => field(['Brightness', 'Upload limit', 'Battery saver', 'Fan speed', 'Disk use'][n] ?? 'Level', 20 + n * 15, rangeClasses('default', i))).join('')}
    </div>
  `,
};

/**
 * Disabled.
 */
export const States: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${field('Volume', 50)}
      ${field('Bass boost (needs headphones)', 50, 'range', 'disabled')}
    </div>
  `,
};

/**
 * The fill grows from the inline start in either direction.
 */
export const Direction: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      <div dir="ltr">${field('Volume', 30)}</div>
      <div dir="rtl">${field('الصوت', 30)}</div>
    </div>
  `,
};

/**
 * Stepped values with labelled ticks.
 */
export const Steps: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      <div class="field">
        <label for="range-steps" class="field__label label">Text size</label>
        <input id="range-steps" type="range" class="range" min="0" max="100" step="25" value="50" style="--value: 50%;" list="range-steps-list" aria-valuetext="M" oninput="this.style.setProperty('--value', this.value + '%'); this.setAttribute('aria-valuetext', ['XS', 'S', 'M', 'L', 'XL'][this.value / 25]);" />
        <datalist id="range-steps-list">
          <option value="0"></option><option value="25"></option><option value="50"></option><option value="75"></option><option value="100"></option>
        </datalist>
        <div class="range__scale-ticks small-text" aria-hidden="true"><span>XS</span><span>S</span><span>M</span><span>L</span><span>XL</span></div>
      </div>
    </div>
  `,
};

/**
 * Range lockup (molecule): a button, a range and a readout in one row.
 */
export const RangeLockup: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${[
        ['', 'Track one'],
        [' controls-sm', 'Track two'],
        [' range-lockup--fill', 'Track three'],
      ]
        .map(([mods, track], n) => {
          const id = `lockup-${n}`;
          return `
        <div class="range-lockup${mods}">
          <button type="button" class="button button--subtle button--icon" aria-pressed="false" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg><span class="sr-only">Mute ${track.toLowerCase()}</span>
          </button>
          <input id="${id}" type="range" class="range" min="0" max="100" value="70" style="--value: 70%;" aria-label="${track} volume" ${SYNC} />
          <output for="${id}" class="range-lockup__output small-text font-mono">70%</output>
        </div>`;
        })
        .join('')}
    </div>
  `,
};
