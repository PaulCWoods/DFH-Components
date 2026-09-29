import type { Meta, StoryObj } from '@storybook/html';

interface SelectArgs {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  custom?: boolean;
}

const meta: Meta<SelectArgs> = {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Select Role' },
    hint: { control: 'text', defaultValue: '' },
    error: { control: 'text', defaultValue: '' },
    required: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    custom: { control: 'boolean', defaultValue: false },
  },
  render: (args) => {
    const selectId = 'demo-select-field';
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    const sizeClass = args.size && args.size !== 'md' ? `select--${args.size}` : '';
    const customClass = args.custom ? 'select--custom' : '';
    const selectClasses = ['select', sizeClass, customClass].filter(Boolean).join(' ');

    const describedBy = [
      args.hint ? hintId : '',
      args.error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return `
      <div class="field" style="max-inline-size: 24rem;">
        <label for="${selectId}" class="field__label">
          ${args.label}
        </label>
        ${args.hint ? `<p id="${hintId}" class="field__hint">${args.hint}</p>` : ''}
        <select 
          id="${selectId}"
          class="${selectClasses}"
          ${args.required ? 'required' : ''}
          ${args.disabled ? 'disabled' : ''}
          ${describedBy ? `aria-describedby="${describedBy}"` : ''}
          ${args.error ? 'aria-invalid="true"' : ''}
        >
          <option value="">Select an option...</option>
          <option value="lead">Accessibility Lead</option>
          <option value="architect">Design Systems Architect</option>
          <option value="developer">Senior Frontend Engineer</option>
          <option value="researcher">UX Researcher</option>
        </select>
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
type Story = StoryObj<SelectArgs>;

export const Default: Story = {
  args: {
    label: 'Primary Role',
    size: 'md',
    required: false,
    disabled: false,
  },
};

export const WithHintAndRequired: Story = {
  args: {
    label: 'Target Compliance Standard',
    hint: 'Select the primary WCAG benchmark for automated tests.',
    required: true,
  },
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); max-inline-size: 24rem;">
      <div class="field">
        <label for="select-sm" class="field__label">Small Select (24px Touch Target - WCAG 2.5.8)</label>
        <select id="select-sm" class="select select--sm">
          <option value="1">Sort by Date</option>
          <option value="2">Sort by Priority</option>
          <option value="3">Sort by Severity</option>
        </select>
      </div>

      <div class="field">
        <label for="select-md" class="field__label">Default Select (48px Touch Target - WCAG 2.5.5 AAA)</label>
        <select id="select-md" class="select">
          <option value="1">Level AA (Recommended)</option>
          <option value="2">Level AAA (Strict)</option>
        </select>
      </div>

      <div class="field">
        <label for="select-lg" class="field__label">Large Select (56px Touch Target)</label>
        <select id="select-lg" class="select select--lg">
          <option value="us">United States (USD)</option>
          <option value="eu">European Union (EUR)</option>
          <option value="gb">United Kingdom (GBP)</option>
        </select>
      </div>
    </div>
  `,
};

export const ModernCustomizableSelect: Story = {
  render: () => `
    <div class="field" style="max-inline-size: 24rem;">
      <label for="custom-select-demo" class="field__label">Modern Base Select (Customizable API)</label>
      <p id="custom-select-hint" class="field__hint">Uses Chrome base-select with ::picker(select) styling</p>
      <select id="custom-select-demo" class="select select--custom" aria-describedby="custom-select-hint">
        <button type="button">
          <selectedcontent></selectedcontent>
        </button>
        <option value="wcag-aa" selected>
          <span>WCAG 2.2 Level AA</span>
        </option>
        <option value="wcag-aaa">
          <span>WCAG 2.2 Level AAA</span>
        </option>
        <option value="section-508">
          <span>Section 508 Standard</span>
        </option>
        <option value="en-301-549">
          <span>EN 301 549 (EU)</span>
        </option>
      </select>
    </div>
  `,
};

export const DisabledState: Story = {
  render: () => `
    <div class="field" style="max-inline-size: 24rem;">
      <label for="select-disabled" class="field__label">Locked Organization Tier</label>
      <select id="select-disabled" class="select" disabled>
        <option selected>Enterprise Accessibility Suite (Managed)</option>
      </select>
    </div>
  `,
};
