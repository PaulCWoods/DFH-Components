import type { Meta, StoryObj } from '@storybook/html';

interface TabArgs {
  label: string;
  asLink: boolean;
  selected: boolean;
  variant: 'default' | 'button' | 'plain' | 'subtle';
  round: boolean;
  size: 'default' | 'sm';
  hasIcon: boolean;
  hasBadge: boolean;
  iconOnly: boolean;
  disabled: boolean;
}

const meta: Meta<TabArgs> = {
  title: 'Atoms/Tab',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Tab Primitive (Atom)

The **Tab** primitive is the foundational, indivisible interactive trigger used for tabbed interfaces and section navigation.
Tabs come in two structural flavours:
1. **Regular Tab:** Traditional navigation link or trigger with sliding underline indicator.
2. **Button Tab (\`.tab--button\`):** Segmented pill / button control with full background surface selection.

#### Prominence & Appearance Variations:
- **Default:** Outline neutral for buttons (1px border), clean underline for regular tabs.
- **Subtle (\`.tab--subtle\`):** Translucent tinted resting background (\`--surface-translucent\`), borderless, with higher-contrast hover and solid active selection. Matches \`.button--subtle\`.
- **Plain (\`.tab--plain\`, alias \`.tab--simple\`):** Borderless and background-free, clean minimalist presentation. Matches \`.button--plain\`.
- **Round (\`.tab--round\`):** Concentric pill shape.
- **Small (\`.tab--sm\`):** Compact spatial scale.

#### Accessibility & Web Standards Compliance:
- **WCAG 2.4.7 Focus Visible:** High-contrast inset focus ring with \`--focus-ring-offset: -2px\`.
- **WCAG 1.4.3 Contrast:** Minimum 4.5:1 text-to-background contrast on active, hovered, and default states.
- **Anchor Positioning Indicator:** Automatically registers \`anchor-name: --tab-selected\` when active (\`[aria-selected="true"]\` or \`[aria-current="page"]\`), which parent \`.tab-list\` molecules hook into to animate smooth sliding indicators without JavaScript layout calculations.
- **Typographic Precision:** Applied with CSS \`text-box: trim-both cap alphabetic\` on \`.tab__text\` for optical alignment.
- **Accessible Responsive Collapse:** Under \`@container style(--ui-labels: hidden)\` or with \`.hide-labels\`, tabs collapse text labels into 1px accessible screen-reader clips while preserving accessible names.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label text for the tab.' },
    asLink: { control: 'boolean', description: 'Render as an <a> navigation link instead of a <button>.' },
    selected: { control: 'boolean', description: 'Active / selected state.' },
    variant: {
      control: 'select',
      options: ['default', 'button', 'plain', 'subtle'],
      description: 'Tab visual appearance variant.',
    },
    round: { control: 'boolean', description: 'Fully rounded pill shape.' },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Size scaling of the tab.',
    },
    hasIcon: { control: 'boolean', description: 'Display an icon accessory.' },
    hasBadge: { control: 'boolean', description: 'Display a count / status badge.' },
    iconOnly: { control: 'boolean', description: 'Collapse label into accessible icon-only mode.' },
    disabled: { control: 'boolean', description: 'Disabled / inactive state.' },
  },
  args: {
    label: 'Overview',
    asLink: false,
    selected: false,
    variant: 'default',
    round: false,
    size: 'default',
    hasIcon: true,
    hasBadge: false,
    iconOnly: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TabArgs>;

export const Playground: Story = {
  render: (args) => {
    const classNames = ['tab'];
    if (args.variant === 'button') classNames.push('tab--button');
    if (args.variant === 'plain') classNames.push('tab--plain');
    if (args.variant === 'subtle') classNames.push('tab--button', 'tab--subtle');
    if (args.round) classNames.push('tab--round');
    if (args.size === 'sm') classNames.push('tab--sm');
    if (args.iconOnly) classNames.push('tab--icon');

    const iconHtml = args.hasIcon
      ? `<svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#View"/></svg>`
      : '';

    const badgeHtml = args.hasBadge
      ? `<span class="badge badge--sm badge--accent"><span>12</span></span>`
      : '';

    const labelHtml = `<span class="tab__text">${args.label}</span>`;

    if (args.asLink) {
      return `
        <a 
          href="#tab-link" 
          class="${classNames.join(' ')}"
          ${args.selected ? 'aria-current="page"' : ''}
          ${args.disabled ? 'aria-disabled="true"' : ''}
        >
          ${iconHtml}
          ${labelHtml}
          ${badgeHtml}
        </a>
      `;
    }

    return `
      <button 
        type="button" 
        class="${classNames.join(' ')}"
        role="tab"
        aria-selected="${args.selected ? 'true' : 'false'}"
        ${args.disabled ? 'disabled' : ''}
      >
        ${iconHtml}
        ${labelHtml}
        ${badgeHtml}
      </button>
    `;
  },
};

export const AllVariants: Story = {
  render: () => `
    <div class="stack gap-lg" style="max-inline-size: 40rem;">
      <section class="stack gap-sm">
        <h4 class="font-size-sm font-weight-bold text-color-muted">1. Underline Tab (Default)</h4>
        <div class="cluster gap-md align-items-center" style="border-block-end: 1px solid var(--border-color-quiet);">
          <button type="button" class="tab" aria-selected="true" role="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#View"/></svg>
            <span class="tab__text">Selected Tab</span>
          </button>
          <button type="button" class="tab" aria-selected="false" role="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
            <span class="tab__text">Inactive Tab</span>
          </button>
          <button type="button" class="tab" disabled role="tab">
            <span class="tab__text">Disabled Tab</span>
          </button>
        </div>
      </section>

      <section class="stack gap-sm">
        <h4 class="font-size-sm font-weight-bold text-color-muted">2. Button Style Tab (.tab--button)</h4>
        <div class="cluster gap-sm align-items-center">
          <button type="button" class="tab tab--button" aria-selected="true" role="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            <span class="tab__text">Active Option</span>
          </button>
          <button type="button" class="tab tab--button" aria-selected="false" role="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
            <span class="tab__text">Inactive Option</span>
          </button>
          <button type="button" class="tab tab--button tab--round" aria-selected="false" role="tab">
            <span class="tab__text">Pill Button (.tab--round)</span>
          </button>
        </div>
      </section>

      <section class="stack gap-sm">
        <h4 class="font-size-sm font-weight-bold text-color-muted">3. Subtle Button Tabs (.tab--button.tab--subtle)</h4>
        <div class="cluster gap-sm align-items-center">
          <button type="button" class="tab tab--button tab--subtle" aria-selected="true" role="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            <span class="tab__text">Active Subtle</span>
          </button>
          <button type="button" class="tab tab--button tab--subtle" aria-selected="false" role="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
            <span class="tab__text">Inactive Subtle</span>
          </button>
          <button type="button" class="tab tab--button tab--subtle tab--round" aria-selected="false" role="tab">
            <span class="tab__text">Subtle Pill (.tab--round)</span>
          </button>
        </div>
      </section>

      <section class="stack gap-sm">
        <h4 class="font-size-sm font-weight-bold text-color-muted">4. Plain Tabs (.tab--plain)</h4>
        <div class="cluster gap-md align-items-center">
          <a href="#active" class="tab tab--plain" aria-current="page">
            <span class="tab__text">Active Link</span>
          </a>
          <a href="#inactive" class="tab tab--plain">
            <span class="tab__text">Inactive Link</span>
          </a>
          <button type="button" class="tab tab--button tab--plain" aria-selected="false" role="tab">
            <span class="tab__text">Plain Button Tab</span>
          </button>
        </div>
      </section>

      <section class="stack gap-sm">
        <h4 class="font-size-sm font-weight-bold text-color-muted">5. Small / Compact Sizing (.tab--sm)</h4>
        <div class="cluster gap-sm align-items-center">
          <button type="button" class="tab tab--button tab--sm" aria-selected="true" role="tab">
            <span class="tab__text">Small Active</span>
          </button>
          <button type="button" class="tab tab--button tab--sm" aria-selected="false" role="tab">
            <span class="tab__text">Small Inactive</span>
          </button>
          <button type="button" class="tab tab--button tab--sm tab--round" aria-selected="false" role="tab">
            <span class="tab__text">Small Pill</span>
          </button>
        </div>
      </section>

      <section class="stack gap-sm">
        <h4 class="font-size-sm font-weight-bold text-color-muted">6. Icon-Only Tabs (.tab--icon)</h4>
        <div class="cluster gap-sm align-items-center">
          <button type="button" class="tab tab--button tab--icon" aria-selected="true" role="tab" aria-label="Code Editor">
            <span class="tab__text">Code</span>
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
          </button>
          <button type="button" class="tab tab--button tab--icon" aria-selected="false" role="tab" aria-label="Visual Preview">
            <span class="tab__text">Preview</span>
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#View"/></svg>
          </button>
          <button type="button" class="tab tab--button tab--icon tab--round" aria-selected="false" role="tab" aria-label="Settings">
            <span class="tab__text">Settings</span>
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
          </button>
        </div>
      </section>
    </div>
  `,
};

export const SubtleButton: Story = {
  render: () => `
    <div class="cluster gap-sm align-items-center">
      <button type="button" class="tab tab--button tab--subtle" aria-selected="true" role="tab">
        <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#View"/></svg>
        <span class="tab__text">Active Option</span>
      </button>
      <button type="button" class="tab tab--button tab--subtle" aria-selected="false" role="tab">
        <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
        <span class="tab__text">Inactive Option</span>
      </button>
      <button type="button" class="tab tab--button tab--subtle tab--round" aria-selected="false" role="tab">
        <span class="tab__text">Subtle Pill</span>
        <span class="badge badge--sm badge--accent"><span>New</span></span>
      </button>
    </div>
  `,
};


export const PlainButton: Story = {
  render: () => `
    <div class="cluster gap-sm align-items-center">
      <button type="button" class="tab tab--button tab--plain" aria-selected="true" role="tab">
        <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#View"/></svg>
        <span class="tab__text">Active Option</span>
      </button>
      <button type="button" class="tab tab--button tab--plain" aria-selected="false" role="tab">
        <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
        <span class="tab__text">Inactive Option</span>
      </button>
      <button type="button" class="tab tab--button tab--plain tab--round" aria-selected="false" role="tab">
        <span class="tab__text">Subtle Pill</span>
        <span class="badge badge--sm badge--accent"><span>New</span></span>
      </button>
    </div>
  `,
};

export const PlainNav: Story = {
  render: () => `
    <div class="cluster gap-md align-items-center">
      <a href="#overview" class="tab tab--plain" aria-current="page">
        <span class="tab__text">Overview</span>
      </a>
      <a href="#features" class="tab tab--plain">
        <span class="tab__text">Features</span>
      </a>
      <a href="#pricing" class="tab tab--plain">
        <span class="tab__text">Pricing</span>
        <span class="badge badge--sm badge--subtle"><span>Pro</span></span>
      </a>
    </div>
  `,
};
