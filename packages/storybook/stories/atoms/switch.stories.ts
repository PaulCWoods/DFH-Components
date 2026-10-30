import type { Meta, StoryObj } from '@storybook/html';

type Size = 'sm' | 'default' | 'lg';

interface SwitchArgs {
  label: string;
  hint: string;
  size: Size;
  subtle: boolean;
  danger: boolean;
  round: boolean;
  checked: boolean;
  disabled: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];

const switchEl = (label: string, mods: string[] = [], attrs = '', hint = '') => `
  <label class="${['switch', ...mods.filter(Boolean)].join(' ')}">
    <span class="switch__label label">${label}${hint ? ` <span class="small-text text-muted">${hint}</span>` : ''}</span>
    <input type="checkbox" role="switch" class="sr-only" ${attrs} />
    <span class="switch__control" aria-hidden="true">
      <span class="switch__option switch__option--off">Off</span>
      <span class="switch__option switch__option--on">On</span>
    </span>
  </label>`;

const meta: Meta<SwitchArgs> = {
  title: 'Atoms/Switch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A segmented Off / On toggle: a label wrapping a checkbox with \`role="switch"\`. State is read with \`:has(:checked)\`, so no script is needed.

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default (48px), \`--sm\`, \`--lg\` | \`--switch-size\`, \`--controls-size\` |
| Prominence | outline (default), \`--subtle\` | \`--switch-prominence\`, \`--controls-prominence\` |
| Intent | accent (default), \`--danger\` | \`--switch-intent\` |
| Corners | \`--round\` | \`--switch-corners\`, \`--controls-corners\` |

- A compact container steps the switch to \`--sm\`.
- The whole label row is the target, at least \`--spacing-target-min\` tall, whatever the control's visual size.
- The On and Off text states the value; colour only reinforces it (WCAG 1.4.1).

\`\`\`html
<label class="switch">
  <span class="switch__label label">Notifications</span>
  <input type="checkbox" role="switch" class="sr-only" />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    subtle: { control: 'boolean', description: '--subtle' },
    danger: { control: 'boolean', description: '--danger' },
    round: { control: 'boolean', description: '--round' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => `
    <div class="demo-stage demo-constrained--md">
      ${switchEl(
        args.label,
        [args.size !== 'default' ? `switch--${args.size}` : '', args.subtle ? 'switch--subtle' : '', args.danger ? 'switch--danger' : '', args.round ? 'switch--round' : ''],
        [args.checked ? 'checked' : '', args.disabled ? 'disabled' : ''].join(' '),
        args.hint
      )}
    </div>
  `,
};

export default meta;
type Story = StoryObj<SwitchArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { label: 'Notifications', hint: 'Email and push', size: 'default', subtle: false, danger: false, round: false, checked: true, disabled: false },
};

/**
 * Sizes, and a compact container stepping the switch to --sm.
 */
export const Sizes: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${SIZES.map((s) => switchEl(`Size ${s}`, [s !== 'default' ? `switch--${s}` : ''], 'checked')).join('')}
      <div class="ui-compact">${switchEl('Compact container', [], 'checked')}</div>
    </div>
  `,
};

/**
 * Prominence, intent and corners.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${switchEl('Outline', [], 'checked')}
      ${switchEl('Subtle', ['switch--subtle'], 'checked')}
      ${switchEl('Danger', ['switch--danger'], 'checked', 'Deletes data after 30 days')}
      ${switchEl('Round', ['switch--round'], 'checked')}
    </div>
  `,
};

/**
 * Off, on and disabled.
 */
export const States: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      ${switchEl('Off')}
      ${switchEl('On', [], 'checked')}
      ${switchEl('Disabled', [], 'disabled')}
      ${switchEl('Disabled, on', [], 'disabled checked')}
    </div>
  `,
};

/**
 * Container flags style every switch inside.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack" style="--switch-size: sm; --switch-corners: round;">
      <span class="sb-demo-tag">--switch-size: sm; --switch-corners: round</span>
      ${switchEl('Autoplay', [], 'checked')}
      ${switchEl('Captions')}
    </div>
  `,
};

/**
 * The indicator slides the other way in right-to-left text.
 */
export const Direction: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div dir="ltr">${switchEl('Notifications', [], 'checked')}</div>
      <div dir="rtl">${switchEl('الإشعارات', [], 'checked')}</div>
    </div>
  `,
};
