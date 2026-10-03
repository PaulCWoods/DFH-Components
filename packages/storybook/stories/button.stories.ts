import type { Meta, StoryObj } from '@storybook/html';

interface ButtonArgs {
  label: string;
  variant?: 'default' | 'primary' | 'subtle' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  ariaDisabled?: boolean;
  isLink?: boolean;
  hasIcon?: boolean;
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Button' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'subtle', 'destructive'],
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    disabled: { control: 'boolean', defaultValue: false },
    ariaDisabled: { control: 'boolean', defaultValue: false },
    isLink: { control: 'boolean', defaultValue: false },
    hasIcon: { control: 'boolean', defaultValue: false },
  },
  render: (args) => {
    const variantClass = args.variant && args.variant !== 'default' ? `button--${args.variant}` : '';
    const sizeClass = args.size && args.size !== 'md' ? `button--${args.size}` : '';
    const classes = [
      'button',
      variantClass,
      sizeClass,
    ].filter(Boolean).join(' ');

    const iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    `;

    const content = `
      <span>${args.label || 'Action'}</span>
      ${args.hasIcon ? iconSvg : ''}
    `;

    if (args.isLink) {
      return `
        <a 
          href="#" 
          class="${classes}" 
          ${args.ariaDisabled ? 'aria-disabled="true" tabindex="-1"' : ''}
          role="button"
        >
          ${content}
        </a>
      `;
    }

    return `
      <button 
        type="button" 
        class="${classes}" 
        ${args.disabled ? 'disabled' : ''} 
        ${args.ariaDisabled ? 'aria-disabled="true"' : ''}
      >
        ${content}
      </button>
    `;
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Default: Story = {
  args: {
    label: 'Default Action',
    variant: 'default',
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Action',
    variant: 'primary',
    size: 'md',
  },
};

export const Subtle: Story = {
  args: {
    label: 'Subtle Ghost Action',
    variant: 'subtle',
    size: 'md',
  },
};

export const Destructive: Story = {
  args: {
    label: 'Delete Account',
    variant: 'destructive',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1); flex-wrap: wrap; align-items: center;">
      <button type="button" class="button">
        <span>Default</span>
      </button>
      <button type="button" class="button button--primary">
        <span>Primary</span>
      </button>
      <button type="button" class="button button--subtle">
        <span>Subtle</span>
      </button>
      <button type="button" class="button button--destructive">
        <span>Destructive</span>
      </button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1); align-items: center; flex-wrap: wrap;">
      <button type="button" class="button button--primary button--sm">
        <span>Small (32px)</span>
      </button>
      <button type="button" class="button button--primary button--md">
        <span>Medium / Target (48px)</span>
      </button>
      <button type="button" class="button button--primary button--lg">
        <span>Large (56px)</span>
      </button>
    </div>
  `,
};

export const WithIcon: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1); align-items: center; flex-wrap: wrap;">
      <button type="button" class="button button--primary">
        <span>Get Started</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
      
      <!-- Icon-only button with translatable, screen-reader-friendly text -->
      <button type="button" class="button button--icon">
        <span class="visually-hidden">Search site</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </button>
    </div>
  `,
};

export const DisabledAndAriaDisabled: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1); align-items: center; flex-wrap: wrap;">
      <button type="button" class="button button--primary" disabled>
        <span>Native Disabled</span>
      </button>
      <button type="button" class="button button--primary" aria-disabled="true">
        <span>Aria Disabled</span>
      </button>
      <a href="#" class="button" aria-disabled="true" tabindex="-1" role="button">
        <span>Link Aria Disabled</span>
      </a>
    </div>
  `,
};


export const Round: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1); align-items: center; flex-wrap: wrap;">
      <button type="button" class="button button--round">
        <span>Rounded</span>
      </button>
      <button type="button" class="button button--primary button--round">
        <span>Rounded Primary</span>
      </button>
      <button type="button" class="button button--icon button--round">
        <span class="visually-hidden">Search site</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </button>
    </div>
  `,
};

export const SubtleDestructive: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1); align-items: center; flex-wrap: wrap;">
      <button type="button" class="button button--subtle button--subtle-destructive">
        <span>Delete Account</span>
      </button>
      <button type="button" class="button button--subtle button--subtle-destructive button--sm">
        <span>Remove</span>
      </button>
    </div>
  `,
};

export const Selected: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1); align-items: center; flex-wrap: wrap;">
      <button type="button" class="button button--selected">
        <span>Selected Filter</span>
      </button>
      <span class="button button--selected" aria-current="page">
        <span>Page 1 (Active)</span>
      </span>
      <button type="button" class="button button--round button--selected">
        <span>Selected Pill</span>
      </button>
    </div>
  `,
};

