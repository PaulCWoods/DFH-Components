import type { Meta, StoryObj } from '@storybook/html';

interface ButtonArgs {
  label: string;
  variant?: 'default' | 'primary' | 'subtle' | 'destructive' | 'placeholder';
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
      options: ['default', 'primary', 'subtle', 'destructive', 'placeholder'],
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
      <svg class="icon icon--dir" aria-hidden="true" focusable="false">
        <use href="#ArrowRight"/>
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
    label: 'Default',
    variant: 'default',
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'md',
  },
};

export const Subtle: Story = {
  args: {
    label: 'Subtle',
    variant: 'subtle',
    size: 'md',
  },
};

export const Destructive: Story = {
  args: {
    label: 'Destructive',
    variant: 'destructive',
    size: 'md',
  },
};

export const Placeholder: Story = {
  args: {
    label: 'Placeholder',
    variant: 'placeholder',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => `
    <div class="cluster">
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
      <button type="button" class="button button--placeholder">
        <span>Placeholder</span>
      </button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div class="cluster align-items-center">
      <button type="button" class="button button--primary button--sm">
        <span>Small (32px)</span>
      </button>
      <button type="button" class="button button--primary button--md">
        <span>BrandMedium / Target (48px)</span>
      </button>
      <button type="button" class="button button--primary button--lg">
        <span>Large (56px)</span>
      </button>
    </div>
  `,
};

export const WithIcon: Story = {
  render: () => `
    <div class="cluster">
      <button type="button" class="button button--primary">
        <span>Get Started</span>
        <svg class="icon icon--dir" aria-hidden="true" focusable="false">
          <use href="#ArrowRight"/>
        </svg>
      </button>
      
      <!-- Icon-only button with translatable, screen-reader-friendly text -->
      <button type="button" class="button button--icon">
        <span class="visually-hidden">Search site</span>
        <svg class="icon" aria-hidden="true" focusable="false">
          <use href="#Search"/>
        </svg>
      </button>
    </div>
  `,
};

export const DisabledAndAriaDisabled: Story = {
  render: () => `
    <div class="cluster">
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
    <div class="cluster">
      <button type="button" class="button button--round">
        <span>Rounded</span>
      </button>
      <button type="button" class="button button--primary button--round">
        <span>Rounded Primary</span>
      </button>
      <button type="button" class="button button--icon button--round">
        <span class="visually-hidden">Search site</span>
        <svg class="icon" aria-hidden="true" focusable="false">
          <use href="#Search"/>
        </svg>
      </button>
    </div>
  `,
};

export const SubtleDestructive: Story = {
  render: () => `
    <div class="cluster">
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
    <div class="cluster">
      <button type="button" class="button button--selected">
        <span>Selected Filter</span>
      </button>
      <span class="button button--selected" aria-current="page">
        <span>Page 1 (Active)</span>
      </span>
      <button type="button" class="button button--round button--selected">
        <span>Selected Round</span>
      </button>
    </div>
  `,
};

/**
 * Button-like interactive controls (Switches, Checkboxes, and Radios)
 * Uses native form elements wrapped in .button styling for zero-JS state management.
 */
export const ButtonLikeSwitches: Story = {
  render: () => `
    <div class="stack">
      <div class="cluster">
        <a href="#" class="button" role="button">
          <span>Link button</span>
        </a>

        <!-- Checkbox switch with icon transition -->
        <label class="button">
          <input type="checkbox" class="visually-hidden" />
          <svg class="icon icon--off" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
          <span>Switch</span>
        </label>

        <!-- Segmented choice radio buttons -->
        <label class="button">
          <input type="radio" name="choice-demo" class="visually-hidden" checked />
          <span>Choice 1</span>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>
        <label class="button">
          <input type="radio" name="choice-demo" class="visually-hidden" />
          <span>Choice 2</span>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>

        <!-- Icon-only checkbox switches with discrete @starting-style transition -->
        <label class="button">
          <input type="checkbox" class="visually-hidden" checked />
          <span class="visually-hidden">Active toggle</span>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>
        <label class="button">
          <input type="checkbox" class="visually-hidden" />
          <span class="visually-hidden">Inactive toggle</span>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>
      </div>
    </div>
  `,
};

/**
 * Avatar Button Primitive (.button--avatar)
 * Integrates avatar imagery with button geometry and focus rings.
 */
export const AvatarButton: Story = {
  render: () => `
    <div class="cluster">
      <button type="button" class="button button--avatar" aria-label="Alex Morgan profile">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
          alt="" 
          width="40" 
          height="40" 
          style="object-fit: cover; border-radius: inherit;" 
        />
      </button>

      <button type="button" class="button button--avatar button--round" aria-label="Jamie Lee profile">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
          alt="" 
          width="40" 
          height="40" 
          style="object-fit: cover; border-radius: inherit;" 
        />
      </button>

      <button type="button" class="button button--avatar" aria-label="User menu">
        <svg class="icon" aria-hidden="true" focusable="false" style="font-size: 1.5rem;"><use href="#User"/></svg>
      </button>
    </div>
  `,
};

/**
 * Color Scheme Contexts
 * Buttons and button-like controls automatically adapt their selected and hover fills inside inverted or dark containers.
 */
export const ColorContexts: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-32);">
      <div class="card" style="padding: var(--spacing-16);">
        <h3 class="card__title" style="margin-block-end: var(--spacing-16);">Standard Surface</h3>
        <div class="cluster">
          <button type="button" class="button button--primary"><span>Primary</span></button>
          <button type="button" class="button"><span>Default</span></button>
          <button type="button" class="button button--placeholder"><span>Placeholder</span></button>
          <label class="button">
            <input type="checkbox" class="visually-hidden" checked />
            <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            <span>Selected Switch</span>
          </label>
        </div>
      </div>

      <div class="card color-palette-inverted" style="padding: var(--spacing-16);">
        <h3 class="card__title" style="margin-block-end: var(--spacing-16);">Inverted Surface (.color-palette-inverted)</h3>
        <div class="cluster">
          <button type="button" class="button button--primary"><span>Primary</span></button>
          <button type="button" class="button"><span>Default</span></button>
          <button type="button" class="button button--subtle"><span>Subtle</span></button>
          <button type="button" class="button button--placeholder"><span>Placeholder</span></button>
          <label class="button">
            <input type="checkbox" class="visually-hidden" checked />
            <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            <span>Selected Switch</span>
          </label>
        </div>
      </div>

      <div class="card color-palette-dark" style="padding: var(--spacing-16);">
        <h3 class="card__title" style="margin-block-end: var(--spacing-16);">Dark Surface (.color-palette-dark)</h3>
        <div class="cluster">
          <button type="button" class="button button--primary"><span>Primary</span></button>
          <button type="button" class="button"><span>Default</span></button>
          <button type="button" class="button button--subtle"><span>Subtle</span></button>
          <button type="button" class="button button--placeholder"><span>Placeholder</span></button>
          <label class="button">
            <input type="checkbox" class="visually-hidden" checked />
            <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            <span>Selected Switch</span>
          </label>
        </div>
      </div>
    </div>
  `,
};

/**
 * Responsive / Container-Adaptive Button
 * Demonstrates .button--responsive dynamically collapsing .button__text and shortcut chips
 * into a compact icon-only button when placed in narrow containers (< 32rem / 512px).
 *
 * Screen reader & Voice Control Accessibility (WCAG 2.5.3):
 * .button__text is clipped using .visually-hidden CSS, ensuring the accessible name
 * is preserved at all screen sizes.
 */
export const ResponsiveAdaptive: Story = {
  render: () => `
    <div class="stack gap-lg">
      <div class="card card--bordered padding-md">
        <h3 class="card__title font-size-lg" style="margin-block-end: var(--spacing-8);">
          Interactive Container Query Demo
        </h3>
        <p class="text-color-muted font-size-sm" style="margin-block-end: var(--spacing-16);">
          Drag the resize handle on the bottom-right corner of the box below to see <code>.button--responsive</code> adapt automatically when container width drops below <strong>32rem (512px)</strong>:
        </p>

        <!-- Resizable Container with container-type: inline-size -->
        <div 
          class="container-type-inline-size"
          style="
            resize: horizontal; 
            overflow: auto; 
            border: 2px dashed var(--border-color-accent, #00d2c4); 
            padding: var(--spacing-16); 
            border-radius: var(--radius-md, 8px); 
            background-color: var(--surface-muted);
            max-inline-size: 100%; 
            min-inline-size: 8rem; 
            inline-size: 38rem;
          "
        >
          <div class="flex align-items-center justify-content-between gap-sm">
            <span class="font-weight-bold font-size-sm">Toolbar</span>
            
            <div class="cluster align-items-center gap-sm">
              <!-- Responsive Search Button -->
              <button 
                type="button" 
                class="button button--responsive"
                aria-label="Search documentation (Press ⌘K)"
              >
                <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                  <use href="#Search"/>
                </svg>
                <span class="button__text button__text--placeholder">
                  Search docs...
                  <kbd class="kbd"><span>⌘K</span></kbd>
                </span>
              </button>

              <!-- Responsive Add Item Button -->
              <button 
                type="button" 
                class="button button--primary button--responsive"
                aria-label="Create new component"
              >
                <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                  <use href="#Check"/>
                </svg>
                <span class="button__text">New Component</span>
              </button>

              <!-- Responsive Export Button -->
              <button 
                type="button" 
                class="button button--subtle button--responsive"
                aria-label="Export dataset"
              >
                <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                  <use href="#Download"/>
                </svg>
                <span class="button__text">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Static Side-by-Side Comparison -->
      <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: var(--spacing-16);">
        <!-- Wide Context (Full Text + Chips) -->
        <div class="card card--bordered padding-md container-type-inline-size" style="inline-size: 100%;">
          <h4 class="font-weight-bold font-size-sm" style="margin-block-end: var(--spacing-8);">Wide Container (&ge; 32rem)</h4>
          <div class="cluster gap-sm">
            <button type="button" class="button button--responsive">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
              <span class="button__text button__text--placeholder">
                Search
                <span class="chip chip--sm">⌘K</span>
              </span>
            </button>
            <button type="button" class="button button--primary button--responsive">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Download"/></svg>
              <span class="button__text">Download</span>
            </button>
          </div>
        </div>

        <!-- Narrow Context (Auto-Collapsed Icon Buttons) -->
        <div class="card card--bordered padding-md container-type-inline-size" style="max-inline-size: 18rem;">
          <h4 class="font-weight-bold font-size-sm" style="margin-block-end: var(--spacing-8);">Narrow Container (&lt; 32rem)</h4>
          <div class="cluster gap-sm">
            <button type="button" class="button button--responsive" aria-label="Search">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
              <span class="button__text button__text--placeholder">
                Search
                <span class="chip chip--sm">⌘K</span>
              </span>
            </button>
            <button type="button" class="button button--primary button--responsive" aria-label="Download">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Download"/></svg>
              <span class="button__text">Download</span>
            </button>
          </div>
        </div>

        <!-- Declarative Style Query Context (style(--button-variant: icon)) -->
        <div class="card card--bordered padding-md" style="--button-variant: icon;">
          <h4 class="font-weight-bold font-size-sm" style="margin-block-end: var(--spacing-8);">Declarative Style Query (<code>--button-variant: icon</code>)</h4>
          <p class="font-size-sm text-color-muted" style="margin-block-end: var(--spacing-12);">No dimensional container query needed. Forced icon mode via container style property:</p>
          <div class="cluster gap-sm">
            <button type="button" class="button button--responsive" aria-label="Search">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
              <span class="button__text button__text--placeholder">
                Search
                <span class="chip chip--sm">⌘K</span>
              </span>
            </button>
            <button type="button" class="button button--primary button--responsive" aria-label="Download">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Download"/></svg>
              <span class="button__text">Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};
