import type { Meta, StoryObj } from '@storybook/html';

interface RangeArgs {
  value: number;
  min: number;
  max: number;
  step: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  label?: string;
  unit?: string;
}

const meta: Meta<RangeArgs> = {
  title: 'Components/Range',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, defaultValue: 50 },
    min: { control: 'number', defaultValue: 0 },
    max: { control: 'number', defaultValue: 100 },
    step: { control: 'number', defaultValue: 1 },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      defaultValue: 'default',
    },
    disabled: { control: 'boolean', defaultValue: false },
    label: { control: 'text', defaultValue: 'Volume Level' },
    unit: { control: 'text', defaultValue: '%' },
  },
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `range--${args.size}` : '';
    const variantClass = args.variant && args.variant !== 'default' ? `range--${args.variant}` : '';
    const classes = ['range', sizeClass, variantClass].filter(Boolean).join(' ');

    const percentage = Math.round(((args.value - args.min) / (args.max - args.min)) * 100);

    return `
      <div class="field" style="max-inline-size: 28rem;">
        <div class="field__header">
          <label for="range-interactive-demo" class="field__label">${args.label || 'Volume'}</label>
          <output for="range-interactive-demo" class="field__output" id="range-val" style="font-weight: var(--font-weight-bold); font-variant-numeric: tabular-nums;">
            ${args.value}${args.unit || ''}
          </output>
        </div>
        <input 
          id="range-interactive-demo"
          type="range" 
          class="${classes}"
          min="${args.min}" 
          max="${args.max}" 
          step="${args.step}" 
          value="${args.value}"
          ${args.disabled ? 'disabled' : ''}
          style="--value: ${percentage}%;"
          aria-describedby="range-val"
          oninput="this.style.setProperty('--value', ((this.value - this.min)/(this.max - this.min)*100) + '%'); document.getElementById('range-val').textContent = this.value + '${args.unit || ''}';"
        />
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<RangeArgs>;

/**
 * 1. Default Interactive Range
 */
export const Default: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    variant: 'default',
    disabled: false,
    label: 'Master Audio Output',
    unit: '%',
  },
};

/**
 * 2. Range Sizing (Small, Standard, Large)
 */
export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 28rem;">
      <div class="field">
        <div class="field__header">
          <label for="r-sm" class="field__label">Small (4px track / 16px thumb: .range--sm)</label>
          <output for="r-sm" class="field__output">30%</output>
        </div>
        <input id="r-sm" type="range" class="range range--sm" value="30" min="0" max="100" style="--value: 30%;" />
      </div>

      <div class="field">
        <div class="field__header">
          <label for="r-md" class="field__label">Default (8px track / 24px thumb)</label>
          <output for="r-md" class="field__output">50%</output>
        </div>
        <input id="r-md" type="range" class="range" value="50" min="0" max="100" style="--value: 50%;" />
      </div>

      <div class="field">
        <div class="field__header">
          <label for="r-lg" class="field__label">Large (12px track / 32px thumb: .range--lg)</label>
          <output for="r-lg" class="field__output">75%</output>
        </div>
        <input id="r-lg" type="range" class="range range--lg" value="75" min="0" max="100" style="--value: 75%;" />
      </div>
    </div>
  `,
};

/**
 * 3. Semantic Color Modifiers
 */
export const SemanticVariants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 28rem;">
      <div class="field">
        <div class="field__header">
          <label for="r-accent" class="field__label">Accent (Default)</label>
          <output for="r-accent" class="field__output">65%</output>
        </div>
        <input id="r-accent" type="range" class="range" value="65" min="0" max="100" style="--value: 65%;" />
      </div>

      <div class="field">
        <div class="field__header">
          <label for="r-success" class="field__label">Success (.range--success)</label>
          <output for="r-success" class="field__output" style="color: var(--foreground-success); font-weight: var(--font-weight-bold);">85%</output>
        </div>
        <input id="r-success" type="range" class="range range--success" value="85" min="0" max="100" style="--value: 85%;" />
      </div>

      <div class="field">
        <div class="field__header">
          <label for="r-warning" class="field__label">Warning (.range--warning)</label>
          <output for="r-warning" class="field__output" style="color: var(--foreground-warning); font-weight: var(--font-weight-bold);">45%</output>
        </div>
        <input id="r-warning" type="range" class="range range--warning" value="45" min="0" max="100" style="--value: 45%;" />
      </div>

      <div class="field">
        <div class="field__header">
          <label for="r-danger" class="field__label">Danger (.range--danger)</label>
          <output for="r-danger" class="field__output" style="color: var(--foreground-danger); font-weight: var(--font-weight-bold);">25%</output>
        </div>
        <input id="r-danger" type="range" class="range range--danger" value="25" min="0" max="100" style="--value: 25%;" />
      </div>
    </div>
  `,
};

/**
 * 4. Step Increments with Datalist Tick Marks
 */
export const StepIncrementsWithTicks: Story = {
  render: () => `
    <div class="field" style="max-inline-size: 28rem;">
      <div class="field__header">
        <label for="step-range" class="field__label">Display Scale Factor</label>
        <output for="step-range" class="field__output">1.5x</output>
      </div>
      <input 
        id="step-range" 
        type="range" 
        class="range" 
        min="1" 
        max="3" 
        step="0.5" 
        value="1.5" 
        list="scale-ticks"
        style="--value: 25%;"
      />
      <datalist id="scale-ticks" class="range__scale-ticks">
        <option value="1" label="1x"></option>
        <option value="1.5" label="1.5x"></option>
        <option value="2" label="2x"></option>
        <option value="2.5" label="2.5x"></option>
        <option value="3" label="3x"></option>
      </datalist>
    </div>
  `,
};

/**
 * 5. Device Controls Settings Card Composition
 */
export const DeviceSettingsCard: Story = {
  render: () => `
    <div class="card" style="max-inline-size: 32rem;">
      <article class="card__content">
        <header class="card__header">
          <hgroup class="card__hgroup">
            <h3 class="card__title">Audio & Brightness</h3>
            <p class="card__subtitle">Adjust peripheral display controls</p>
          </hgroup>
        </header>

        <div class="card__body" style="display: flex; flex-direction: column; gap: var(--spacing-20); margin-block: var(--spacing-8);">
          <div class="field">
            <div class="field__header">
              <label for="bright-range" class="field__label">Screen Brightness</label>
              <output for="bright-range" class="field__output">80%</output>
            </div>
            <input id="bright-range" type="range" class="range" value="80" min="0" max="100" style="--value: 80%;" />
          </div>

          <div class="field">
            <div class="field__header">
              <label for="vol-range" class="field__label">Microphone Sensitivity</label>
              <output for="vol-range" class="field__output" style="color: var(--foreground-success); font-weight: var(--font-weight-bold);">45%</output>
            </div>
            <input id="vol-range" type="range" class="range range--success" value="45" min="0" max="100" style="--value: 45%;" />
          </div>
        </div>

        <footer class="card__footer" style="justify-content: flex-end;">
          <button type="button" class="button button--subtle">
            <span>Reset Defaults</span>
          </button>
        </footer>
      </article>
    </div>
  `,
};

/**
 * 6. Disabled State
 */
export const Disabled: Story = {
  render: () => `
    <div class="field" style="max-inline-size: 28rem;">
      <div class="field__header">
        <label for="disabled-range" class="field__label">Locked Calibration Setting</label>
        <output for="disabled-range" class="field__output">50% (Disabled)</output>
      </div>
      <input id="disabled-range" type="range" class="range" value="50" min="0" max="100" disabled style="--value: 50%;" />
      <p class="field__hint">Requires administrator permissions to modify device calibration.</p>
    </div>
  `,
};
