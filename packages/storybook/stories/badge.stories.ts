import type { Meta, StoryObj } from '@storybook/html';

interface BadgeArgs {
  label: string;
  variant: 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'subtle';
  pill: boolean;
}

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge & Chip',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Status' },
    variant: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warning', 'danger', 'subtle'],
      defaultValue: 'default',
    },
    pill: { control: 'boolean', defaultValue: false },
  },
  render: (args) => {
    const classes = [
      'badge',
      args.variant !== 'default' ? `badge--${args.variant}` : '',
      args.pill ? 'badge--pill' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return `<span class="${classes}"><span>${args.label || 'Status'}</span></span>`;
  },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Default: Story = {
  args: {
    label: 'Standard',
    variant: 'default',
    pill: false,
  },
};

export const Accent: Story = {
  args: {
    label: 'Enrolled',
    variant: 'accent',
    pill: false,
  },
};

export const Success: Story = {
  args: {
    label: 'Completed',
    variant: 'success',
    pill: false,
  },
};

export const Warning: Story = {
  args: {
    label: 'Pending Review',
    variant: 'warning',
    pill: false,
  },
};

export const Danger: Story = {
  args: {
    label: 'Suspended',
    variant: 'danger',
    pill: false,
  },
};

export const Pill: Story = {
  args: {
    label: 'Pill Shape',
    variant: 'accent',
    pill: true,
  },
};

export const AllBadges: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-0-5, 0.5rem); flex-wrap: wrap; align-items: center;">
      <span class="badge"><span>Default</span></span>
      <span class="badge badge--accent"><span>Accent</span></span>
      <span class="badge badge--success"><span>Success</span></span>
      <span class="badge badge--warning"><span>Warning</span></span>
      <span class="badge badge--danger"><span>Danger</span></span>
      <span class="badge badge--subtle"><span>Subtle</span></span>
      <span class="badge badge--accent badge--pill"><span>Pill Badge</span></span>
    </div>
  `,
};

export const Chips: Story = {
  render: () => `
    <div style="display: flex; gap: var(--spacing-1, 1rem); flex-wrap: wrap; align-items: center;">
      <span class="chip">Lesson 04</span>
      <span class="chip">In Progress</span>
      <span class="chip">12 min read</span>
      <span class="chip">WCAG 2.2</span>
    </div>
  `,
};
