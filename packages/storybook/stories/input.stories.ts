import type { Meta, StoryObj } from '@storybook/html';

interface InputArgs {
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
}

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Email address' },
    placeholder: { control: 'text', defaultValue: 'you@example.com' },
    hint: { control: 'text', defaultValue: '' },
    error: { control: 'text', defaultValue: '' },
    required: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    readonly: { control: 'boolean', defaultValue: false },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
      defaultValue: 'text',
    },
  },
  render: (args) => {
    const inputId = 'demo-input-field';
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const sizeClass = args.size && args.size !== 'md' ? `input--${args.size}` : '';
    const inputClasses = ['input', sizeClass].filter(Boolean).join(' ');

    const describedBy = [
      args.hint ? hintId : '',
      args.error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return `
      <div class="field" style="max-inline-size: 24rem;">
        <label for="${inputId}" class="field__label">
          ${args.label}
        </label>
        ${args.hint ? `<p id="${hintId}" class="field__hint">${args.hint}</p>` : ''}
        <input 
          id="${inputId}"
          type="${args.type || 'text'}"
          class="${inputClasses}"
          placeholder="${args.placeholder || ''}"
          ${args.required ? 'required' : ''}
          ${args.disabled ? 'disabled' : ''}
          ${args.readonly ? 'readonly' : ''}
          ${describedBy ? `aria-describedby="${describedBy}"` : ''}
          ${args.error ? 'aria-invalid="true"' : ''}
        />
        ${args.error ? `
          <p id="${errorId}" class="field__error" role="alert">
            <span>${args.error}</span>
          </p>
        ` : ''}
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'e.g. paulwoods',
    size: 'md',
    required: false,
    disabled: false,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Email address',
    placeholder: 'name@workplace.com',
    hint: 'We will only use this to send transaction receipts and invoices.',
    type: 'email',
  },
};

export const RequiredField: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Ada Lovelace',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Work Email',
    placeholder: 'alex@company.org',
    error: 'Please enter a valid business email address ending with a corporate domain.',
    type: 'email',
  },
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); max-inline-size: 24rem;">
      <div class="field">
        <label for="input-size-sm" class="field__label">Small Input (24px Touch Target - WCAG 2.5.8)</label>
        <input id="input-size-sm" type="text" class="input input--sm" placeholder="Compact filter..." />
      </div>

      <div class="field">
        <label for="input-size-md" class="field__label">Default Input (48px Touch Target - WCAG 2.5.5 AAA)</label>
        <input id="input-size-md" type="text" class="input" placeholder="Standard size..." />
      </div>

      <div class="field">
        <label for="input-size-lg" class="field__label">Large Input (56px Touch Target)</label>
        <input id="input-size-lg" type="text" class="input input--lg" placeholder="Large prominent search..." />
      </div>
    </div>
  `,
};

export const ColorAndFileInputs: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); max-inline-size: 24rem;">
      <div class="field">
        <label for="color-picker-default" class="field__label">Theme Accent Color</label>
        <input id="color-picker-default" type="color" class="color-input" value="#00d2c4" />
      </div>

      <div class="field">
        <label for="color-picker-square" class="field__label">Square Swatch</label>
        <input id="color-picker-square" type="color" class="color-input color-input--square" value="#3b82f6" />
      </div>

      <div class="field">
        <label for="file-upload" class="field__label">Upload Documentation</label>
        <input id="file-upload" type="file" class="file-input" />
      </div>
    </div>
  `,
};

export const DisabledAndReadonly: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); max-inline-size: 24rem;">
      <div class="field">
        <label for="input-disabled" class="field__label">Disabled Account ID</label>
        <input id="input-disabled" type="text" class="input" value="DFH-892147" disabled />
      </div>

      <div class="field">
        <label for="input-readonly" class="field__label">Read-Only License Key</label>
        <input id="input-readonly" type="text" class="input" value="MIT-2026-OPEN-WEB" readonly />
      </div>
    </div>
  `,
};
