import type { Meta, StoryObj } from '@storybook/html';

interface MeterArgs {
  value: number;
  min: number;
  max: number;
  low: number;
  high: number;
  optimum: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const meta: Meta<MeterArgs> = {
  title: 'Components/Meter',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, defaultValue: 40 },
    min: { control: 'number', defaultValue: 0 },
    max: { control: 'number', defaultValue: 100 },
    low: { control: 'number', defaultValue: 30 },
    high: { control: 'number', defaultValue: 80 },
    optimum: { control: 'number', defaultValue: 15 },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    label: { control: 'text', defaultValue: 'Disk Usage' },
  },
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `meter--${args.size}` : '';
    const classes = ['meter', sizeClass].filter(Boolean).join(' ');

    return `
      <div class="field" style="max-inline-size: 28rem;">
        <div class="field__header">
          <label for="meter-interactive-demo" class="field__label">${args.label || 'Scalar Value'}</label>
          <span class="field__result" id="meter-val-text">${args.value} of ${args.max}</span>
        </div>
        <meter 
          id="meter-interactive-demo" 
          class="${classes}"
          value="${args.value}" 
          min="${args.min}" 
          max="${args.max}" 
          low="${args.low}" 
          high="${args.high}" 
          optimum="${args.optimum}"
          aria-describedby="meter-val-text"
        >
          ${args.value} / ${args.max}
        </meter>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<MeterArgs>;

/**
 * 1. Default Interactive Meter
 */
export const Default: Story = {
  args: {
    value: 25,
    min: 0,
    max: 100,
    low: 30,
    high: 80,
    optimum: 10,
    size: 'md',
    label: 'Server CPU Load',
  },
};

/**
 * 2. Optimum, Suboptimum, and Critical States
 */
export const SemanticRanges: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 28rem;">
      <!-- Optimum / Safe Zone (low value is optimum) -->
      <div class="field">
        <div class="field__header">
          <label for="m-opt" class="field__label">Optimum Range (Safe / Normal)</label>
          <span class="field__result" style="color: var(--foreground-success); font-weight: var(--font-weight-bold);">25 GB used</span>
        </div>
        <meter id="m-opt" class="meter" value="25" min="0" max="100" low="60" high="85" optimum="20">25 GB</meter>
      </div>

      <!-- Sub-optimum / Warning Zone -->
      <div class="field">
        <div class="field__header">
          <label for="m-warn" class="field__label">Sub-optimum Range (Warning)</label>
          <span class="field__result" style="color: var(--foreground-warning); font-weight: var(--font-weight-bold);">72 GB used</span>
        </div>
        <meter id="m-warn" class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72 GB</meter>
      </div>

      <!-- Critical / Danger Zone -->
      <div class="field">
        <div class="field__header">
          <label for="m-crit" class="field__label">Critical Range (Action Required)</label>
          <span class="field__result" style="color: var(--foreground-danger); font-weight: var(--font-weight-bold);">94 GB used</span>
        </div>
        <meter id="m-crit" class="meter" value="94" min="0" max="100" low="60" high="85" optimum="20">94 GB</meter>
      </div>
    </div>
  `,
};

/**
 * 3. Meter Sizing (Small, Standard, Large)
 */
export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 28rem;">
      <div class="field">
        <div class="field__header">
          <label for="m-sm" class="field__label" style="font-size: var(--micro-text-font-size);">Small (4px / .meter--sm)</label>
          <span class="field__result">30%</span>
        </div>
        <meter id="m-sm" class="meter meter--sm" value="30" min="0" max="100" optimum="10">30%</meter>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="m-md" class="field__label">Default (8px)</label>
          <span class="field__result">50%</span>
        </div>
        <meter id="m-md" class="meter" value="50" min="0" max="100" optimum="10">50%</meter>
      </div>

      <div class="field">
        <div class="field__header">
          <label for="m-lg" class="field__label" style="font-weight: var(--font-weight-bold);">Large (16px / .meter--lg)</label>
          <span class="field__result">70%</span>
        </div>
        <meter id="m-lg" class="meter meter--lg" value="70" min="0" max="100" optimum="10">70%</meter>
      </div>
    </div>
  `,
};

/**
 * 4. Password Strength Gauge Pattern
 */
export const PasswordStrengthComposition: Story = {
  render: () => `
    <div class="field" style="max-inline-size: 28rem;">
      <label for="pwd-input" class="field__label">New Password</label>
      <input id="pwd-input" type="password" class="input" value="SuperSecure#Pass2026!" />
      
      <div style="inline-size: 100%; margin-block-start: var(--spacing-4);">
        <div class="field__header" style="margin-block-end: var(--spacing-4);">
          <span class="field__hint" id="pwd-strength-label">Password strength:</span>
          <span class="field__result" style="color: var(--foreground-success); font-weight: var(--font-weight-bold);">Strong</span>
        </div>
        <meter 
          id="pwd-meter" 
          class="meter meter--sm" 
          value="4" 
          min="0" 
          max="4" 
          low="2" 
          high="3" 
          optimum="4"
          aria-labelledby="pwd-strength-label"
        >
          4 of 4
        </meter>
      </div>
    </div>
  `,
};

/**
 * 5. Storage Quota Card Composition
 */
export const StorageQuotaCard: Story = {
  render: () => `
    <div class="card" style="max-inline-size: 32rem;">
      <article class="card__content">
        <header class="card__header">
          <hgroup class="card__hgroup">
            <h3 class="card__title">Cloud Workspace Storage</h3>
            <p class="card__subtitle">Pro Team Tier (100 GB Included)</p>
          </hgroup>
          <span class="badge badge--warning"><span>82% Used</span></span>
        </header>

        <div class="card__body">
          <div class="field" style="margin-block: var(--spacing-8);">
            <div class="field__header">
              <label for="storage-meter" class="field__label">82.4 GB of 100 GB used</label>
              <span class="field__result" id="quota-val">17.6 GB remaining</span>
            </div>
            <meter 
              id="storage-meter" 
              class="meter" 
              value="82.4" 
              min="0" 
              max="100" 
              low="60" 
              high="80" 
              optimum="20"
              aria-describedby="quota-val"
            >
              82.4 GB
            </meter>
          </div>
          <p style="font-size: var(--micro-text-font-size); color: var(--foreground-muted); margin: 0;">
            Storage warning triggered at 80 GB. Consider upgrading before reaching capacity.
          </p>
        </div>

        <footer class="card__footer" style="justify-content: flex-end; gap: var(--spacing-8);">
          <button type="button" class="button button--subtle">
            <span>Clean Up Files</span>
          </button>
          <button type="button" class="button button--primary">
            <span>Upgrade Storage</span>
          </button>
        </footer>
      </article>
    </div>
  `,
};
