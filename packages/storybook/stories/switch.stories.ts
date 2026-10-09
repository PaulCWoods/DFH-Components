import type { Meta, StoryObj } from '@storybook/html';

interface SwitchArgs {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isRound?: boolean;
}

const meta: Meta<SwitchArgs> = {
  title: 'Components/Switch',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Label' },
    checked: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    isRound: { control: 'boolean', defaultValue: false },
  },
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `switch--${args.size}` : '';
    const roundClass = args.isRound ? 'switch--round' : '';
    const classes = ['switch', sizeClass, roundClass].filter(Boolean).join(' ');

    return `
      <label class="${classes}">
        <span class="switch__label">${args.label}</span>
        <input 
          type="checkbox" 
          role="switch" 
          class="visually-hidden" 
          ${args.checked ? 'checked' : ''} 
          ${args.disabled ? 'disabled' : ''} 
        />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>
    `;
  },
};

export default meta;
type Story = StoryObj<SwitchArgs>;

/**
 * 1. Default Interactive Switch
 */
export const Default: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    size: 'md',
  },
};

/**
 * 2. Off and On States (Matching the Design Showcase)
 * Displays both the neutral Off state and the active primary green On state.
 */
export const BothStates: Story = {
  render: () => `
    <div class="stack">
      <!-- State 1: Off (Unchecked) -->
      <label class="switch">
        <span class="switch__label">Label</span>
        <input type="checkbox" role="switch" class="visually-hidden" />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>

      <!-- State 2: On (Checked) -->
      <label class="switch">
        <span class="switch__label">Label</span>
        <input type="checkbox" role="switch" class="visually-hidden" checked />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>
    </div>
  `,
};

/**
 * 3. Sizes
 * Small (32px), BrandMedium (48px default target size), and Large (56px).
 */
export const Sizes: Story = {
  render: () => `
    <div class="stack">
      <label class="switch switch--sm">
        <span class="switch__label">Small (32px)</span>
        <input type="checkbox" role="switch" class="visually-hidden" checked />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>

      <label class="switch">
        <span class="switch__label">BrandMedium (48px)</span>
        <input type="checkbox" role="switch" class="visually-hidden" checked />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>

      <label class="switch switch--lg">
        <span class="switch__label">Large (56px)</span>
        <input type="checkbox" role="switch" class="visually-hidden" checked />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>
    </div>
  `,
};

/**
 * 4. Rounded / Round Variant (.switch--round)
 */
export const Round: Story = {
  render: () => `
    <div class="stack">
      <label class="switch switch--round">
        <span class="switch__label">Round Off</span>
        <input type="checkbox" role="switch" class="visually-hidden" />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>

      <label class="switch switch--round">
        <span class="switch__label">Round On</span>
        <input type="checkbox" role="switch" class="visually-hidden" checked />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>
    </div>
  `,
};

/**
 * 5. Switches with Icons (.switch with SVG options)
 */
export const WithIcons: Story = {
  render: () => `
    <div class="stack">
      <label class="switch">
        <span class="switch__label">Feature Toggle Off</span>
        <input
          type="checkbox"
          role="switch"
          class="visually-hidden"
        />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Close"/></svg>
          </span>
          <span class="switch__option switch__option--on">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Check"/></svg>
          </span>
        </span>
      </label>

      <label class="switch">
        <span class="switch__label">Feature Toggle On</span>
        <input
          type="checkbox"
          role="switch"
          class="visually-hidden"
          checked
        />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Close"/></svg>
          </span>
          <span class="switch__option switch__option--on">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Check"/></svg>
          </span>
        </span>
      </label>

      <label class="switch switch--round">
        <span class="switch__label">Round with Icons</span>
        <input
          type="checkbox"
          role="switch"
          class="visually-hidden"
          checked
        />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Close"/></svg>
          </span>
          <span class="switch__option switch__option--on">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Check"/></svg>
          </span>
        </span>
      </label>
    </div>
  `,
};

/**
 * 6. Destructive Switch (.switch--destructive)
 */
export const Destructive: Story = {
  render: () => `
    <div class="stack">
      <label class="switch switch--destructive">
        <span class="switch__label">Maintenance Mode Off</span>
        <input
          type="checkbox"
          role="switch"
          class="visually-hidden"
        />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Check"/></svg>
          </span>
          <span class="switch__option switch__option--on">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Warning"/></svg>
          </span>
        </span>
      </label>

      <label class="switch switch--destructive">
        <span class="switch__label">Maintenance Mode On</span>
        <input
          type="checkbox"
          role="switch"
          class="visually-hidden"
          checked
        />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Check"/></svg>
          </span>
          <span class="switch__option switch__option--on">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Warning"/></svg>
          </span>
        </span>
      </label>

      <label class="switch switch--destructive switch--round">
        <span class="switch__label">Round Destructive On</span>
        <input
          type="checkbox"
          role="switch"
          class="visually-hidden"
          checked
        />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Check"/></svg>
          </span>
          <span class="switch__option switch__option--on">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Warning"/></svg>
          </span>
        </span>
      </label>
    </div>
  `,
};

/**
 * 7. Disabled State
 */
export const Disabled: Story = {
  render: () => `
    <div class="stack">
      <label class="switch">
        <span class="switch__label">Disabled Off</span>
        <input type="checkbox" role="switch" class="visually-hidden" disabled />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>

      <label class="switch">
        <span class="switch__label">Disabled On</span>
        <input type="checkbox" role="switch" class="visually-hidden" checked disabled />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>
    </div>
  `,
};

/**
 * 8. Color Scheme Adaptations
 * Adapts seamlessly across light, inverted, and dark theme contexts.
 */
export const ColorContexts: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24);">
      <div class="card">
        <h4 class="card__title mb pb bb-sm bb-dashed bd-muted">Standard Surface</h4>
        <label class="switch">
          <span class="switch__label">Notifications</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <div class="card colors-inverted">
        <h4 class="card__title mb pb bb-sm bb-dashed bd-muted">Inverted Surface</h4>
        <label class="switch">
          <span class="switch__label">Notifications</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>
    </div>
  `,
};
