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

let uid = 0;
const switchEl = (label: string, mods: string[] = [], attrs = '', hint = '') => {
  const id = `switch-${++uid}`;
  return `
  <div class="${['switch', ...mods.filter(Boolean)].join(' ')}">
    <div class="switch__label">
      <label for="${id}" class="label">${label}</label>${hint ? `
      <p id="${id}-hint" class="small-text text-muted">${hint}</p>` : ''}
    </div>
    <span class="switch__control">
      <input type="checkbox" role="switch" id="${id}"${hint ? ` aria-describedby="${id}-hint"` : ''} ${attrs} />
      <span class="switch__option switch__option--off" aria-hidden="true">Off</span>
      <span class="switch__option switch__option--on" aria-hidden="true">On</span>
    </span>
  </div>`;
};

const meta: Meta<SwitchArgs> = {
  title: 'Atoms/Switch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A segmented Off / On toggle: a checkbox with \`role="switch"\` that fills the drawn control, named by a \`<label for>\`. State is read with \`:has(:checked)\`, so no script is needed.

| Axis | Modifiers | Container flags |
| :--- | :--- | :--- |
| Size | default (48px), \`--sm\`, \`--lg\` | \`--switch-size\`, \`--controls-size\` |
| Prominence | outline (default), \`--subtle\` | \`--switch-prominence\`, \`--controls-prominence\` |
| Intent | accent (default), \`--danger\` | \`--switch-intent\` |
| Corners | \`--round\` | \`--switch-corners\`, \`--controls-corners\` |

- A compact container steps the switch to \`--sm\`.
- The control is the target: the checkbox fills it and reaches \`--spacing-target-min\` whatever its visual size. The label text toggles it too; the hint and the rest of the row don't, so it can't be switched by accident.
- A hint is linked with \`aria-describedby\`, so it isn't part of the name. The Off and On text is hidden: the role says the state.
- The selected side is bold on the indicator and says Off or On, so the state isn't colour alone (WCAG 1.4.1), and it shows in forced colours.
- Subtle has no border; it comes back in forced colours and high contrast.

\`\`\`html
<div class="switch">
  <div class="switch__label">
    <label for="notify" class="label">Notifications</label>
    <p id="notify-hint" class="small-text text-muted">Email and push</p>
  </div>
  <span class="switch__control">
    <input type="checkbox" role="switch" id="notify" aria-describedby="notify-hint" />
    <span class="switch__option switch__option--off" aria-hidden="true">Off</span>
    <span class="switch__option switch__option--on" aria-hidden="true">On</span>
  </span>
</div>
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
    <div class="sb-demo-stage sb-demo-constrained--md">
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
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${switchEl('Show line numbers', ['switch--sm'], 'checked')}
      ${switchEl('Autosave drafts', [], 'checked')}
      ${switchEl('Large print', ['switch--lg'], 'checked')}
      <div class="ui-compact">${switchEl('Show grid lines (compact container)', [], 'checked')}</div>
    </div>
  `,
};

/**
 * Prominence, intent and corners.
 */
export const Variants: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${switchEl('Weekly digest', [], 'checked')}
      ${switchEl('Sound effects (subtle)', ['switch--subtle'], 'checked')}
      ${switchEl('Auto-delete old drafts', ['switch--danger'], 'checked', 'Deletes drafts after 30 days')}
      ${switchEl('Location sharing (round)', ['switch--round'], 'checked')}
    </div>
  `,
};

/**
 * Off, on and disabled.
 */
export const States: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${switchEl('Dark mode')}
      ${switchEl('Notifications', [], 'checked')}
      ${switchEl('Two-step sign-in', [], 'disabled', 'Set up an authenticator first')}
      ${switchEl('Backups', [], 'disabled checked', 'Managed by your organisation')}
    </div>
  `,
};

/**
 * Container flags style every switch inside.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack" style="--switch-size: sm; --switch-corners: round;">
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
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      <div dir="ltr">${switchEl('Notifications', [], 'checked')}</div>
      <div dir="rtl">${switchEl('الإشعارات', [], 'checked')}</div>
    </div>
  `,
};
