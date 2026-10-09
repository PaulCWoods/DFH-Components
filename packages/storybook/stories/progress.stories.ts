import type { Meta, StoryObj } from '@storybook/html';

interface ProgressArgs {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'subtle';
  isIndeterminate?: boolean;
  label?: string;
}

const meta: Meta<ProgressArgs> = {
  title: 'Components/Progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, defaultValue: 65 },
    max: { control: { type: 'number' }, defaultValue: 100 },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'subtle'],
      defaultValue: 'default',
    },
    isIndeterminate: { control: 'boolean', defaultValue: false },
    label: { control: 'text', defaultValue: 'Exporting files...' },
  },
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `progress--${args.size}` : '';
    const variantClass = args.variant && args.variant !== 'default' ? `progress--${args.variant}` : '';
    const classes = ['progress', sizeClass, variantClass].filter(Boolean).join(' ');

    const valueAttr = args.isIndeterminate ? '' : `value="${args.value ?? 65}"`;
    const maxAttr = `max="${args.max ?? 100}"`;
    const labelText = args.label || 'Progress';

    return `
      <div class="field" style="max-inline-size: 28rem;">
        <div class="field__header">
          <label for="progress-interactive-demo" class="field__label">${labelText}</label>
          ${!args.isIndeterminate ? `<span class="field__result" id="progress-val-text">${args.value ?? 65}%</span>` : ''}
        </div>
        <progress 
          id="progress-interactive-demo" 
          class="${classes}" 
          ${valueAttr} 
          ${maxAttr}
          ${!args.isIndeterminate ? 'aria-describedby="progress-val-text"' : ''}
        >
          ${!args.isIndeterminate ? `${args.value ?? 65}%` : 'Loading...'}
        </progress>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<ProgressArgs>;

/**
 * 1. Default Determinate Progress
 */
export const Default: Story = {
  args: {
    value: 70,
    max: 100,
    size: 'md',
    variant: 'default',
    isIndeterminate: false,
    label: 'Uploading profile photo...',
  },
};

/**
 * 2. Progress Sizing (Small, Standard, Large)
 */
export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 28rem;">
      <div class="field">
        <div class="field__header">
          <label for="prog-sm" class="field__label">Small (4px / .progress--sm)</label>
          <span class="field__result">45%</span>
        </div>
        <progress id="prog-sm" class="progress progress--sm" value="45" max="100">45%</progress>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="prog-md" class="field__label">Default (8px)</label>
          <span class="field__result">70%</span>
        </div>
        <progress id="prog-md" class="progress" value="70" max="100">70%</progress>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="prog-lg" class="field__label">Large (16px / .progress--lg)</label>
          <span class="field__result">85%</span>
        </div>
        <progress id="prog-lg" class="progress progress--lg" value="85" max="100">85%</progress>
      </div>
    </div>
  `,
};

/**
 * 3. Semantic Status Variants
 */
export const SemanticVariants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 28rem;">
      <div class="field">
        <div class="field__header">
          <label for="prog-default" class="field__label">Accent (Default)</label>
          <span class="field__result">65%</span>
        </div>
        <progress id="prog-default" class="progress" value="65" max="100">65%</progress>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="prog-success" class="field__label">Success (.progress--success)</label>
          <span class="field__result" style="color: var(--foreground-success); font-weight: var(--font-weight-bold);">100%</span>
        </div>
        <progress id="prog-success" class="progress progress--success" value="100" max="100">100%</progress>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="prog-warning" class="field__label">Warning (.progress--warning)</label>
          <span class="field__result" style="color: var(--foreground-warning); font-weight: var(--font-weight-bold);">40%</span>
        </div>
        <progress id="prog-warning" class="progress progress--warning" value="40" max="100">40%</progress>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="prog-danger" class="field__label">Danger (.progress--danger)</label>
          <span class="field__result" style="color: var(--foreground-danger); font-weight: var(--font-weight-bold);">20%</span>
        </div>
        <progress id="prog-danger" class="progress progress--danger" value="20" max="100">20%</progress>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="prog-subtle" class="field__label">Subtle (.progress--subtle)</label>
          <span class="field__result">50%</span>
        </div>
        <progress id="prog-subtle" class="progress progress--subtle" value="50" max="100">50%</progress>
      </div>
    </div>
  `,
};

/**
 * 4. Indeterminate Background Task Animation
 */
export const Indeterminate: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 28rem;">
      <div class="field">
        <label for="prog-indet" class="field__label">Syncing data with cloud...</label>
        <progress id="prog-indet" class="progress" aria-busy="true">Syncing...</progress>
        <p class="field__hint">Calculating remaining transfer size...</p>
      </div>

      <div class="field">
        <label for="prog-indet-lg" class="field__label">Compiling WebAssembly bundle</label>
        <progress id="prog-indet-lg" class="progress progress--lg" aria-busy="true">Compiling...</progress>
      </div>
    </div>
  `,
};

/**
 * 5. Complete Field Task Upload Composition
 */
export const TaskCardComposition: Story = {
  render: () => `
    <div class="card" style="max-inline-size: 32rem;">
      <article class="card__content">
        <header class="card__header">
          <hgroup class="card__hgroup">
            <h3 class="card__title">Design System Artifacts</h3>
            <p class="card__subtitle">Syncing tokens with Figma API</p>
          </hgroup>
          <span class="badge badge--accent"><span>In Progress</span></span>
        </header>

        <div class="card__body">
          <div class="field" style="margin-block: var(--spacing-8);">
            <div class="field__header">
              <label for="figma-sync-prog" class="field__label">Synchronizing 42 token collections...</label>
              <span class="field__result" id="sync-val" style="font-weight: var(--font-weight-bold); color: var(--foreground-accent);">76%</span>
            </div>
            <progress id="figma-sync-prog" class="progress" value="76" max="100" aria-describedby="sync-val">76%</progress>
          </div>
        </div>

        <footer class="card__footer" style="justify-content: flex-end;">
          <button type="button" class="button button--subtle">
            <span>Cancel</span>
          </button>
        </footer>
      </article>
    </div>
  `,
};
