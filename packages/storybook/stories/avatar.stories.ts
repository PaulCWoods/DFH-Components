import type { Meta, StoryObj } from '@storybook/html';

interface AvatarArgs {
  initials?: string;
  imageSrc?: string;
  altText?: string;
  size?: 'sm' | 'md' | 'lg';
  isPlaceholder?: boolean;
}

const meta: Meta<AvatarArgs> = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  argTypes: {
    initials: { control: 'text', defaultValue: 'AB' },
    imageSrc: { control: 'text', defaultValue: '' },
    altText: { control: 'text', defaultValue: 'User Avatar' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    isPlaceholder: { control: 'boolean', defaultValue: false },
  },
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `avatar--${args.size}` : '';
    const placeholderClass = args.isPlaceholder ? 'avatar--placeholder' : '';
    const classes = ['avatar', sizeClass, placeholderClass].filter(Boolean).join(' ');

    if (args.imageSrc) {
      return `
        <div class="${classes}">
          <img src="${args.imageSrc}" alt="${args.altText || ''}" loading="lazy" />
        </div>
      `;
    }

    if (args.isPlaceholder) {
      return `
        <div class="${classes}" aria-label="${args.altText || 'Empty user slot'}">
          <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
        </div>
      `;
    }

    return `
      <div class="${classes}" aria-label="${args.altText || args.initials || 'User'}">
        <span>${args.initials || 'AB'}</span>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<AvatarArgs>;

/**
 * 1. Default Showcase (Matching Row 1)
 * Single avatar variants: Initials, custom inline colored background, icon fallback, photo image, and placeholder dashed slot.
 */
export const AllVariants: Story = {
  render: () => `
    <div class="cluster" style="align-items: center; gap: var(--spacing-16);">
      <!-- Initials Avatar -->
      <div class="avatar" aria-label="Alex Bennett">
        <span aria-hidden="true">AB</span>
      </div>

      <!-- Custom Color via Inline Style (matching blog custom red style) -->
      <div class="avatar" style="--avatar-color: #e50914;" aria-label="Casey Dean (High Priority)">
        <span aria-hidden="true">CD</span>
      </div>

      <!-- Icon Fallback Avatar -->
      <div class="avatar" aria-label="Anonymous user">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
      </div>

      <!-- Photo Image Avatar -->
      <div class="avatar">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
          alt="Ronald Reagan" 
          loading="lazy" 
        />
      </div>

      <!-- Placeholder Dashed Slot -->
      <div class="avatar avatar--placeholder" aria-label="Add new team member">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
      </div>
    </div>
  `,
};

/**
 * 2. Inline Avatar Group (Matching Row 2)
 * Horizontal group of avatars with an overflow counter item.
 */
export const InlineGroup: Story = {
  render: () => `
    <div class="avatar-group" aria-label="Project collaborators">
      <div class="avatar" aria-label="Alex Bennett"><span aria-hidden="true">AB</span></div>
      <div class="avatar" aria-label="Casey Dean"><span aria-hidden="true">CD</span></div>
      <div class="avatar" aria-label="Edward Fitzwilliam"><span aria-hidden="true">EF</span></div>
      <div class="avatar avatar--count" aria-label="5 additional team members"><span>+5</span></div>
    </div>
  `,
};

/**
 * 3. Stacked Crescent Avatars (Matching Row 3)
 * Overlapping layered circles with outer ring borders and total count on top.
 */
export const StackedCrescentGroup: Story = {
  render: () => `
    <div class="avatar-group avatar-group--stacked avatar-group--crescent" aria-label="5 active subscribers">
      <div class="avatar" aria-hidden="true"></div>
      <div class="avatar" aria-hidden="true"></div>
      <div class="avatar" aria-hidden="true"></div>
      <div class="avatar" aria-hidden="true"></div>
      <div class="avatar avatar--count" aria-label="5 items"><span>5</span></div>
    </div>
  `,
};

/**
 * 4. Stacked Photo Avatars (Matching Row 4)
 * Overlapping photo avatars with total count badge on top.
 */
export const StackedPhotoGroup: Story = {
  render: () => `
    <div class="avatar-group avatar-group--stacked avatar-group--crescent" aria-label="5 team members">
      <div class="avatar" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" alt="" />
      </div>
      <div class="avatar" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80" alt="" />
      </div>
      <div class="avatar" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" alt="" />
      </div>
      <div class="avatar avatar--count" aria-label="5 team members"><span>5</span></div>
    </div>
  `,
};

/**
 * 5. Interactive Stackable Group (Hover Expansion)
 * Hovering over the stack expands each avatar with smooth CSS transitions.
 */
export const StackableHover: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-16);">
      <p class="small-text" style="color: var(--foreground-muted); margin: 0;">Hover over the avatar pile to expand members:</p>
      <div class="avatar-group avatar-group--stackable" aria-label="Team members (hover to expand)">
        <div class="avatar" aria-label="Alex Bennett"><span>AB</span></div>
        <div class="avatar" aria-label="Taylor Smith"><span>TS</span></div>
        <div class="avatar" aria-label="Jordan Lee"><span>JL</span></div>
        <div class="avatar" aria-label="Casey Morgan"><span>CM</span></div>
        <div class="avatar avatar--count" aria-label="Plus 3 more"><span>+3</span></div>
      </div>
    </div>
  `,
};

/**
 * 6. Sizes
 * Small (32px), BrandMedium (48px default), and Large (64px).
 */
export const Sizes: Story = {
  render: () => `
    <div class="cluster" style="align-items: center; gap: var(--spacing-16);">
      <div class="avatar avatar--sm" aria-label="Small avatar"><span>SM</span></div>
      <div class="avatar" aria-label="BrandMedium standard avatar"><span>MD</span></div>
      <div class="avatar avatar--lg" aria-label="Large avatar"><span>LG</span></div>
    </div>
  `,
};

/**
 * 7. Interactive Button Avatars
 * Avatars wrapped as interactive buttons with keyboard focus rings.
 */
export const ButtonAvatars: Story = {
  render: () => `
    <div class="cluster" style="gap: var(--spacing-16);">
      <button type="button" class="avatar" aria-label="View Alex Morgan profile">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
          alt="" 
        />
      </button>

      <button type="button" class="avatar" aria-label="Open user settings">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
      </button>

      <button type="button" class="avatar avatar--placeholder" aria-label="Invite new team member">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
      </button>
    </div>
  `,
};
