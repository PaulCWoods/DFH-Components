import type { Meta, StoryObj } from '@storybook/html';

interface TextareaArgs {
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  oneLine?: boolean;
  rows?: number;
}

const meta: Meta<TextareaArgs> = {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Message' },
    placeholder: { control: 'text', defaultValue: 'Type your message here...' },
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
    oneLine: { control: 'boolean', defaultValue: false },
    rows: { control: 'number', defaultValue: 3 },
  },
  render: (args) => {
    const textareaId = 'demo-textarea-field';
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;

    const sizeClass = args.size && args.size !== 'md' ? `textarea--${args.size}` : '';
    const oneLineClass = args.oneLine ? 'textarea--one-line' : '';
    const textareaClasses = ['textarea', sizeClass, oneLineClass].filter(Boolean).join(' ');

    const describedBy = [
      args.hint ? hintId : '',
      args.error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return `
      <div class="field" style="max-inline-size: 28rem;">
        <label for="${textareaId}" class="field__label">
          ${args.label}
        </label>
        ${args.hint ? `<p id="${hintId}" class="field__hint">${args.hint}</p>` : ''}
        <textarea 
          id="${textareaId}"
          class="${textareaClasses}"
          rows="${args.rows || 3}"
          placeholder="${args.placeholder || ''}"
          ${args.required ? 'required' : ''}
          ${args.disabled ? 'disabled' : ''}
          ${args.readonly ? 'readonly' : ''}
          ${describedBy ? `aria-describedby="${describedBy}"` : ''}
          ${args.error ? 'aria-invalid="true"' : ''}
        ></textarea>
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
type Story = StoryObj<TextareaArgs>;

export const Default: Story = {
  args: {
    label: 'User Feedback',
    placeholder: 'Tell us how we can improve your accessibility experience...',
    size: 'md',
    required: false,
    disabled: false,
  },
};

export const OneLineInitial: Story = {
  args: {
    label: 'Quick Note',
    placeholder: 'Starts at single-line height and expands dynamically...',
    oneLine: true,
  },
};

export const WithHintAndRequired: Story = {
  args: {
    label: 'Project Description',
    placeholder: 'Provide an overview of the scope and deliverables...',
    hint: 'Markdown formatting is supported. Maximum 5,000 characters.',
    required: true,
  },
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); max-inline-size: 28rem;">
      <div class="field">
        <label for="textarea-sm" class="field__label">Small Textarea (.textarea--sm)</label>
        <textarea id="textarea-sm" class="textarea textarea--sm" placeholder="Compact annotations..."></textarea>
      </div>

      <div class="field">
        <label for="textarea-md" class="field__label">Default Textarea</label>
        <textarea id="textarea-md" class="textarea" placeholder="Standard responsive comment..."></textarea>
      </div>

      <div class="field">
        <label for="textarea-lg" class="field__label">Large Textarea (.textarea--lg)</label>
        <textarea id="textarea-lg" class="textarea textarea--lg" placeholder="Editorial content copy..."></textarea>
      </div>
    </div>
  `,
};

export const DisabledAndReadonly: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); max-inline-size: 28rem;">
      <div class="field">
        <label for="textarea-disabled" class="field__label">Archived Log Message</label>
        <textarea id="textarea-disabled" class="textarea" disabled>Service deployment completed at 2026-09-29T21:00:00Z without errors.</textarea>
      </div>

      <div class="field">
        <label for="textarea-readonly" class="field__label">System Notice</label>
        <textarea id="textarea-readonly" class="textarea" readonly>This workspace is restricted to read-only accessibility audits.</textarea>
      </div>
    </div>
  `,
};
