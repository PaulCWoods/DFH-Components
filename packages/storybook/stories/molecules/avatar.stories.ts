import type { Meta, StoryObj } from '@storybook/html';

interface AvatarArgs {
  initials?: string;
  imageSrc?: string;
  altText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'away' | 'busy' | 'offline' | 'none';
  shape?: 'round' | 'square';
  isButton?: boolean;
  isPlaceholder?: boolean;
}

const meta: Meta<AvatarArgs> = {
  title: 'Molecules/Avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Avatar Primitive

The **Avatar** primitive provides an accessible, high-performance container for user profile photographs, initials, status presence rings, icon fallbacks, and multi-user stacked groupings.
Built to fulfill strict **WCAG 2.2 AA / AAA** touch target and visual contrast requirements:
- **2.5.5 Target Size (Enhanced - AAA):** Base avatar diameter is 48px (\`--spacing-48\`), fulfilling Level AAA touch targets.
- **2.5.8 Target Size (Minimum - AA):** Compact \`.avatar--sm\` diameter is 32px (\`--spacing-32\`), fulfilling Level AA.
- **1.1.1 Non-Text Content:** Mandatory accessible name provided via \`alt\` on images or \`aria-label\` on initials/icon wrappers.
- **Status Indicator Rings:** Uses color-coded outer perimeter borders via \`[data-status="online|away|busy|offline"]\`.

> [!IMPORTANT]
> **Corner Badges & Avatars:** Do NOT place corner badge elements (e.g. \`.badge--top-right-corner\`) inside \`.avatar\`, because \`.avatar\` requires \`overflow: hidden\` to clip user photos cleanly. To indicate live status on avatars, use the semantic \`[data-status]\` border ring pattern or wrap the avatar in a relative container.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Initials Avatar with Live Status Indicator Ring -->
<div class="avatar" data-status="online" aria-label="Alex Bennett (online)">
  <span>AB</span>
</div>

<!-- 2. Profile Photo Avatar -->
<div class="avatar" data-status="away">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="Jordan Lee" loading="lazy" />
</div>

<!-- 3. Interactive Avatar Button -->
<button type="button" class="button button--avatar button--round" data-status="online" aria-label="Jordan Lee profile">
  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="" width="48" height="48" style="object-fit: cover; border-radius: inherit;" />
</button>

<!-- 4. Placeholder / Add Team Member Slot -->
<div class="avatar avatar--placeholder" aria-label="Add team member">
  <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- 5. Inline Avatar Group with Counter -->
<div class="avatar-group" aria-label="Project team">
  <div class="avatar" aria-label="Alex Bennett"><span>AB</span></div>
  <div class="avatar" aria-label="Taylor Smith"><span>TS</span></div>
  <div class="avatar" aria-label="Jordan Lee"><span>JL</span></div>
  <div class="avatar avatar--count" aria-label="5 additional team members"><span>+5</span></div>
</div>

<!-- 6. Stacked Crescent Avatar Group (Layered pile) -->
<div class="avatar-group avatar-group--stacked avatar-group--crescent" aria-label="5 team members">
  <div class="avatar" aria-hidden="true"><img src="/u1.jpg" alt="" /></div>
  <div class="avatar" aria-hidden="true"><img src="/u2.jpg" alt="" /></div>
  <div class="avatar avatar--count" aria-label="5 members"><span>5</span></div>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Default size is 48px x 48px (\`--avatar-size\`), meeting 48px AAA touch bounds. |
| **2.5.8 Target Size (Minimum)** | **AA** | Compact size (\`.avatar--sm\`) is 32px x 32px, meeting 24px AA minimums. |
| **1.4.3 / 1.4.11 Contrast** | **AA / AAA** | Foreground text against custom avatar background colors uses CSS \`contrast-color(var(--_avatar-bg))\`. |
| **2.4.7 Focus Visible** | **AA** | Interactive avatar buttons feature a high-contrast focus ring with 2px offset. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--avatar-size\` | \`var(--spacing-48, 3rem)\` | Default avatar width and height (48px) |
| \`--avatar-sm-size\` | \`var(--spacing-32, 2rem)\` | Compact avatar width and height (32px) |
| \`--avatar-lg-size\` | \`var(--spacing-64, 4rem)\` | Large avatar width and height (64px) |
| \`--avatar-bg\` | \`var(--surface-card, Canvas)\` | Fill background behind initials or icon |
| \`--avatar-border-color\` | \`var(--border-color-muted, currentColor)\` | Perimeter border ring color |
| \`--avatar-border-width\` | \`var(--border-width, 1px)\` | Ring stroke thickness (2px in high contrast) |
| \`--avatar-radius\` | \`var(--radius-round, 9999px)\` | Round circle geometry |
| \`--avatar-square-radius\` | \`var(--radius, 0.25rem)\` | Squircle / square rounding for \`.avatar--square\` |
| \`--avatar-group-overlap\` | \`calc(var(--_avatar-size) * -0.7)\` | Overlap indentation for stacked groups |
`,
      },
    },
  },
  args: {
    initials: 'AB',
    altText: 'Alex Bennett',
    size: 'md',
    status: 'online',
    shape: 'round',
    isButton: false,
    isPlaceholder: false,
  },
  argTypes: {
    initials: { control: 'text' },
    altText: { control: 'text' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size scaling tier',
    },
    status: {
      control: 'select',
      options: ['online', 'away', 'busy', 'offline', 'none'],
      description: 'Presence indicator ring status',
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
      description: 'Geometric silhouette shape',
    },
    isButton: {
      control: 'boolean',
      description: 'Renders as an interactive <button> element',
    },
    isPlaceholder: {
      control: 'boolean',
      description: 'Dashed placeholder for adding a team member',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `avatar--${args.size}` : '';
    const squareClass = args.shape === 'square' ? 'avatar--square' : '';
    const placeholderClass = args.isPlaceholder ? 'avatar--placeholder' : '';
    const statusAttr = args.status && args.status !== 'none' ? `data-status="${args.status}"` : '';

    const classes = ['avatar', sizeClass, squareClass, placeholderClass].filter(Boolean).join(' ');

    if (args.isButton) {
      return `
        <div class="demo-stage demo-stage--lg demo-stage--card" style="display: flex; justify-content: center; align-items: center; min-block-size: 10rem;">
          <button 
            type="button" 
            class="button button--avatar button--round ${sizeClass} ${squareClass}"
            ${statusAttr}
            aria-label="${args.altText || 'User profile'}"
          >
            <span>${args.initials || 'AB'}</span>
          </button>
        </div>
      `;
    }

    return `
      <div class="demo-stage demo-stage--lg demo-stage--card" style="display: flex; justify-content: center; align-items: center; min-block-size: 10rem;">
        <div class="${classes}" ${statusAttr} aria-label="${args.altText || 'User'}">
          ${args.isPlaceholder
        ? `<svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>`
        : `<span>${args.initials || 'AB'}</span>`
      }
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Frame, Initials & Status Ring)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Avatar Anatomy & Status Ring Architecture</h4>
          <p class="demo-desc">
            Constructed with a circular clipping frame, trimmed capital typography, and status rings rendered via CSS variables on the perimeter border.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Clipping Frame Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">1. Clipping Host (.avatar)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Circular container with <code>overflow: hidden</code>, 1:1 aspect-ratio, and 48px AAA touch diameter.
              </p>
              <div style="margin-block-start: var(--spacing-8); display: flex; justify-content: center;">
                <div class="avatar" style="pointer-events: none;"><span>AB</span></div>
              </div>
            </div>

            <!-- Status Ring Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">2. Status Ring ([data-status])</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Outer ring border automatically switches token colors (Green: online, Amber: away, Red: busy).
              </p>
              <div style="margin-block-start: var(--spacing-8); display: flex; justify-content: center;">
                <div class="avatar" data-status="online" style="pointer-events: none;"><span>ON</span></div>
              </div>
            </div>

            <!-- Interactive Trigger Spec -->
            <div class="demo-box demo-box--blue demo-constrained--xs">
              <span class="demo-label">3. Avatar Button (.button--avatar)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Interactive trigger with focus rings and hover transitions for profile menus and popovers.
              </p>
              <div style="margin-block-start: var(--spacing-8); display: flex; justify-content: center;">
                <button type="button" class="button button--avatar button--round" aria-label="Profile"><span>JL</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Variants (Initials, Photo, Custom Tint, Icon & Placeholder)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="stack" style="gap: var(--spacing-24);">
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-12);">Individual Avatar Presentation Modes</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-24); flex-wrap: wrap;">
              
              <!-- Initials -->
              <div class="avatar" aria-label="Alex Bennett">
                <span>AB</span>
              </div>

              <!-- Photo Image -->
              <div class="avatar" aria-label="Ronald Reagan">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="Ronald Reagan" 
                  loading="lazy" 
                />
              </div>

              <!-- Custom Tint via CSS Variable -->
              <div class="avatar" style="--avatar-color: #e50914;" aria-label="Casey Dean (High Priority)">
                <span>CD</span>
              </div>

              <!-- Accent Token Fill -->
              <div class="avatar avatar--accent" aria-label="Auditor">
                <span>AU</span>
              </div>

              <!-- Icon Fallback -->
              <div class="avatar" aria-label="Anonymous User">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
              </div>

              <!-- Placeholder / Add Member -->
              <div class="avatar avatar--placeholder" aria-label="Add new team member">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
              </div>

              <!-- Square / Squircle Shape -->
              <div class="avatar avatar--square" aria-label="Square Avatar">
                <span>SQ</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 4. State Matrix (Presence Rings & Interactive Focus/Hover)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Presence Indicators & Interactive States</h4>
          <p class="demo-desc">
            Visual status rings encoded via <code>[data-status]</code> attributes without ad-hoc badges.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- Live Presence Rings -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">Presence Status Indicator Rings ([data-status])</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-24);">
              <div class="avatar" data-status="online" aria-label="User online">
                <span>ON</span>
              </div>
              <div class="avatar" data-status="away" aria-label="User away">
                <span>AW</span>
              </div>
              <div class="avatar" data-status="busy" aria-label="User busy">
                <span>BY</span>
              </div>
              <div class="avatar" data-status="offline" aria-label="User offline">
                <span>OFF</span>
              </div>
            </div>
          </div>

          <!-- Interactive Avatar Buttons -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">Interactive Focus-Visible & Hover States</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-24);">
              <button type="button" class="button button--avatar button--round" data-status="online" aria-label="Active user button">
                <span>JL</span>
              </button>
              <button type="button" class="button button--avatar button--round" data-status="busy" aria-label="Busy user button">
                <span>TS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. Sizes & Density (Small 32px, Default 48px, Large 64px)
 */
export const SizesAndDensity: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Avatar Sizing Tiers</h4>
          <p class="demo-desc">Conforming to WCAG 2.5.5 (48px AAA) and WCAG 2.5.8 (32px AA minimum).</p>
        </div>

        <div class="cluster" style="align-items: center; gap: var(--spacing-24);">
          <!-- Extra-Small 24px -->
          <div style="text-align: center;">
            <div class="avatar avatar--xs" data-status="online" aria-label="Extra small user">
              <span>XS</span>
            </div>
            <span class="demo-label" style="margin-block-start: var(--spacing-8);">24px (.avatar--xs)</span>
          </div>

          <!-- Small 32px -->
          <div style="text-align: center;">
            <div class="avatar avatar--sm" data-status="online" aria-label="Small user">
              <span>SM</span>
            </div>
            <span class="demo-label" style="margin-block-start: var(--spacing-8);">32px (.avatar--sm)</span>
          </div>

          <!-- Default 48px -->
          <div style="text-align: center;">
            <div class="avatar" data-status="online" aria-label="Default user">
              <span>MD</span>
            </div>
            <span class="demo-label" style="margin-block-start: var(--spacing-8);">48px (Default AAA)</span>
          </div>

          <!-- Large 64px -->
          <div style="text-align: center;">
            <div class="avatar avatar--lg" data-status="online" aria-label="Large user">
              <span>LG</span>
            </div>
            <span class="demo-label" style="margin-block-start: var(--spacing-8);">64px (.avatar--lg)</span>
          </div>

          <!-- Extra-Large 96px -->
          <div style="text-align: center;">
            <div class="avatar avatar--xl" data-status="online" aria-label="Extra large user">
              <span>XL</span>
            </div>
            <span class="demo-label" style="margin-block-start: var(--spacing-8);">96px (.avatar--xl)</span>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Avatar Groups (Inline, Crescent Stack & Stackable Hover Expand)
 */
export const AvatarGroups: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24);">
          <h4 class="demo-heading">Multi-User Avatar Grouping Primitives</h4>
          <p class="demo-desc">Clean composition with automated overlap margins and overflow counters.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- 1. Standard Inline Group -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">1. Standard Inline Group (.avatar-group)</span>
            <div class="avatar-group" aria-label="Collaborators list">
              <div class="avatar" aria-label="Alex Bennett"><span>AB</span></div>
              <div class="avatar" aria-label="Taylor Smith"><span>TS</span></div>
              <div class="avatar" aria-label="Jordan Lee"><span>JL</span></div>
              <div class="avatar avatar--count" aria-label="4 more team members"><span>+4</span></div>
            </div>
          </div>

          <!-- 2. Stacked Crescent Group -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">2. Stacked Crescent Layer Pile (.avatar-group--crescent)</span>
            <div class="avatar-group avatar-group--stacked avatar-group--crescent" aria-label="Subscribers list">
              <div class="avatar" aria-hidden="true"><span>1</span></div>
              <div class="avatar" aria-hidden="true"><span>2</span></div>
              <div class="avatar" aria-hidden="true"><span>3</span></div>
              <div class="avatar avatar--count" aria-label="3 items"><span>3</span></div>
            </div>
          </div>

          <!-- 3. Interactive Expand-on-Hover Group -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">3. Interactive Expand on Hover (.avatar-group--stackable)</span>
            <p class="micro-text" style="margin-block: var(--spacing-4);">Hover over the stack below to expand the overlapping avatars.</p>
            <div class="avatar-group avatar-group--stacked avatar-group--stackable" aria-label="Interactive team group">
              <div class="avatar" aria-label="Alex Bennett"><span>AB</span></div>
              <div class="avatar" aria-label="Taylor Smith"><span>TS</span></div>
              <div class="avatar" aria-label="Jordan Lee"><span>JL</span></div>
              <div class="avatar avatar--count" aria-label="5 items"><span>+2</span></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 7. Real World Recipes (User Card, App Header Profile Trigger & Directory List)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Production Recipes</h4>
          <p class="demo-desc">High-frequency user presence patterns across applications.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24); align-items: center;">
          <!-- Recipe 1: Profile Popover Trigger -->
          <div class="demo-box demo-box--neutral demo-constrained--sm">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">App Header User Profile Trigger</span>
            <div class="cluster" style="justify-content: space-between; align-items: center;">
              <span class="micro-text">Alex Bennett (Online)</span>
              <button 
                type="button" 
                class="button button--avatar button--round"
                data-status="online"
                aria-label="View user profile (online)"
              >
                <span>AB</span>
              </button>
            </div>
          </div>

          <!-- Recipe 2: Team Member Summary Card -->
          <div class="card card--compact card--bordered demo-constrained--sm width-md">
            <article class="card__content">
              <header class="card__header">
                <div class="avatar" data-status="online" aria-label="Jordan Lee">
                  <span>JL</span>
                </div>
                <hgroup class="card__hgroup">
                  <h4 class="card__title small-heading">Jordan Lee</h4>
                  <p class="card__subtitle">Accessibility Lead</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p class="micro-text">Design System auditor for WCAG 2.2 AA / AAA compliance.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    `;
  },
};
