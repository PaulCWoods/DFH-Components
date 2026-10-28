import type { Meta, StoryObj } from '@storybook/html';

interface BannerArgs {
  title?: string;
  message: string;
  variant: 'default' | 'info' | 'success' | 'warning' | 'error';
  prominence?: 'default' | 'subtle' | 'strong';
  hasAction: boolean;
  actionType?: 'dismiss' | 'buttons';
  dynamicCorners: boolean;
  round: boolean;
  ruled: boolean;
}

const meta: Meta<BannerArgs> = {
  title: 'Molecules/Banner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Banner Primitive

The **Banner** primitive styles inline contextual status messages, confirmation callouts, and semantic action panels.
Designed for high legibility and accessibility, it cascades colors automatically into nested **Button**, **Link**, and **Icon** primitives.
Directly aligned with Design For Humans Blog architecture (\`_banner.scss\` & \`_component-library.twig\`).

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Semantic Status Banner with Action -->
<div class="banner banner--warning" role="region" aria-label="Scheduled maintenance notice">
  <div class="banner__inner">
    <p>Scheduled maintenance window begins tonight at 22:00 UTC.</p>
  </div>
  <button type="button" class="button button--subtle banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="visually-hidden">Dismiss notice</span>
  </button>
</div>

<!-- 2. Verbose Banner with Heading & Button Group -->
<div class="banner banner--info" role="region" aria-label="Version update available">
  <div class="banner__inner">
    <h3 class="subheading">Design System v2.4 Available</h3>
    <p>Includes updated WCAG 2.2 AAA token scales and native anchor positioning.</p>
    <div class="button-group" style="margin-block-start: var(--spacing-4);">
      <button type="button" class="button button--strong button--accent button--sm"><span>Update Now</span></button>
      <button type="button" class="button button--subtle button--sm"><span>Release Notes</span></button>
    </div>
  </div>
</div>

<!-- 3. Dynamic Concentric Corners (.banner--dynamic-corners) -->
<div class="banner banner--dynamic-corners buttons-round" role="region" aria-label="Confirmation">
  <div class="banner__inner">
    <p class="heading">Proceed with audit synchronization?</p>
  </div>
  <button type="button" class="button button--strong button--accent banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
    <span class="visually-hidden">Confirm action</span>
  </button>
</div>

<!-- 4. Banner with Media Thumbnail (.banner__thumb) -->
<div class="banner">
  <div class="banner__thumb">
    <img src="/sample-thumb.jpg" alt="" loading="lazy" />
  </div>
  <div class="banner__inner">
    <h4 class="card__title small-heading">Accessible Typography Guide</h4>
    <p class="small-text">Techniques for fluid font scaling without breaking WCAG 1.4.4.</p>
  </div>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **1.4.3 Contrast (Minimum)** | **AA / AAA** | Semantic variants cascade contrast tokens (\`--surface-*\` background and \`--foreground-*\` text/borders) achieving >= 4.5:1 text and >= 3:1 graphical boundaries. |
| **1.4.11 Non-Text Contrast** | **AA** | Perimeter borders adapt under \`@media (prefers-contrast: more)\` with explicit 2px width and 0% translucency. |
| **4.1.3 Status Messages** | **AA** | Use appropriate ARIA roles: \`role="alert"\` for errors requiring immediate attention, \`role="status"\` for confirmations, or \`role="region"\` with \`aria-label\` for general callouts. |
| **2.4.4 Link / Button Purpose** | **A** | Action buttons with icons include \`<span class="visually-hidden">Dismiss notice</span>\` so purpose is unambiguous to screen readers. |
| **Concentric Geometry** | **Standard** | \`.banner--dynamic-corners\` uses \`calc(min(var(--button-radius), var(--button-min-size) / 2) + var(--_banner-outer-padding) + var(--banner-border-width))\` to eliminate corner distortion. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--banner-bg\` | \`var(--surface-card, transparent)\` | Container background fill |
| \`--banner-border-color\` | \`var(--panel-border-color, currentColor)\` | Border stroke color |
| \`--banner-border-width\` | \`var(--panel-border-width, 1px)\` | Border thickness |
| \`--banner-radius\` | \`var(--panel-radius, 0.25rem)\` | Outer corner rounding |
| \`--banner-gap\` | \`var(--spacing, 1rem)\` | Gap between thumbnail, inner copy, and action |
| \`--banner-outer-padding\` | \`var(--spacing-8, 0.5rem)\` | Perimeter padding around inner content |
| \`--banner-inner-padding\` | \`var(--spacing-8, 0.5rem)\` | Content padding within \`.banner__inner\` |
| \`--banner-action-align\` | \`flex-start\` | Vertical alignment of action button |
`,
      },
    },
  },
  args: {
    title: 'Storage Capacity Alert',
    message: 'Your team workspace is at 85% capacity. Older verification logs will be archived next week.',
    variant: 'warning',
    hasAction: true,
    actionType: 'dismiss',
    prominence: 'default',
    dynamicCorners: false,
    round: false,
    ruled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Semantic color theme',
    },
    prominence: {
      control: 'select',
      options: ['default', 'subtle', 'strong'],
      description: 'Orthogonal prominence tier (subtle borderless, default bordered, strong solid fill)',
    },
    actionType: {
      control: 'select',
      options: ['dismiss', 'buttons'],
      description: 'Type of interactive action controls',
    },
    hasAction: {
      control: 'boolean',
      description: 'Shows or hides action controls',
    },
    dynamicCorners: {
      control: 'boolean',
      description: 'Computes outer radius mathematically from nested button',
    },
    round: {
      control: 'boolean',
      description: 'Applies full pill rounding',
    },
    ruled: {
      control: 'boolean',
      description: 'Applies inner separator rule divider',
    },
  },
};

export default meta;
type Story = StoryObj<BannerArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const variantClass = args.variant !== 'default' ? `banner--${args.variant}` : '';
    const prominenceClass = args.prominence && args.prominence !== 'default' ? `banner--${args.prominence}` : '';
    const cornerClass = args.dynamicCorners ? 'banner--dynamic-corners buttons-round' : '';
    const roundClass = args.round ? 'banner--round' : '';
    const ruledClass = args.ruled ? 'banner--ruled' : '';

    const classes = ['banner', variantClass, prominenceClass, cornerClass, roundClass, ruledClass].filter(Boolean).join(' ');

    let actionMarkup = '';
    if (args.hasAction) {
      if (args.actionType === 'buttons') {
        actionMarkup = `
          <div class="button-group banner__action" style="margin-block-start: var(--spacing-4);">
            <button type="button" class="button button--strong button--accent button--sm"><span>Acknowledge</span></button>
            <button type="button" class="button button--subtle button--sm"><span>Dismiss</span></button>
          </div>
        `;
      } else {
        actionMarkup = `
          <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss banner">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
              <use href="#Close"/>
            </svg>
            <span class="visually-hidden">Dismiss</span>
          </button>
        `;
      }
    }

    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="${classes}" role="region" aria-label="${args.title || 'Notification'}">
            <div class="banner__inner">
              ${args.title ? `<h4 class="subheading">${args.title}</h4>` : ''}
              <p>${args.message}</p>
              ${args.actionType === 'buttons' ? actionMarkup : ''}
            </div>
            ${args.actionType !== 'buttons' ? actionMarkup : ''}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Perimeter, Inner Flow & Concentric Math)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Banner Anatomy & Structural Hierarchy</h4>
          <p class="demo-desc">
            Engineered with clear separation between host wrapper (<code>.banner</code>), vertical layout engine (<code>.banner__inner</code>), and action anchors.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Outer Shell Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">1. Container (.banner)</span>
              <p class="small-text" style="margin-block: var(--spacing-4);">
                Flexbox orchestrator controlling background fill, border frame, padding, and semantic token cascading.
              </p>
              <div style="border: 1px dashed var(--accent); padding: var(--spacing-8); border-radius: var(--radius-sm);">
                <span class="small-text">Outer Host Shell</span>
              </div>
            </div>

            <!-- Inner Body Spec -->
            <div class="demo-box demo-box--blue demo-constrained--xs">
              <span class="demo-label">2. Content Flow (.banner__inner)</span>
              <p class="small-text" style="margin-block: var(--spacing-4);">
                Vertical flex container resetting default child margins and managing spacing via <code>--banner-gap</code>.
              </p>
              <div style="border: 1px dashed #2d4268; padding: var(--spacing-8); border-radius: var(--radius-sm);">
                <span class="small-text">Title & Body Paragraphs</span>
              </div>
            </div>

            <!-- Action Trigger Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">3. Action (.banner__action)</span>
              <p class="small-text" style="margin-block: var(--spacing-4);">
                Positioned with <code>--banner-action-align</code> (top or center). Inherits semantic button tokens.
              </p>
              <div style="margin-block-start: var(--spacing-8);">
                <button type="button" class="button button--subtle button--sm"><span>Dismiss</span></button>
              </div>
            </div>
          </div>

          <!-- Dynamic Concentric Geometry Explanation -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Dynamic Concentric Corners Formula</span>
            <p class="small-text" style="margin-block-start: var(--spacing-4);">
              When <code>.banner--dynamic-corners</code> is paired with <code>buttons-round</code>, the outer radius is dynamically computed:
              <code>--banner-radius: calc(min(var(--button-radius), var(--button-min-size) / 2) + var(--_banner-outer-padding) + var(--banner-border-width));</code>
              This guarantees mathematically concentric curvature without corner pinching.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Variants (Semantic Theme Matrix: Info, Success, Warning, Error)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-16);">
            
            <!-- Default / Neutral -->
            <div class="banner" role="region" aria-label="Announcement">
              <div class="banner__inner">
                <p>Standard neutral announcement banner for informational notices.</p>
              </div>
              <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                <span class="visually-hidden">Dismiss</span>
              </button>
            </div>

            <!-- Info -->
            <div class="banner banner--info" role="status">
              <div class="banner__inner">
                <h4 class="subheading">Documentation Synchronized</h4>
                <p>Design token exports have been refreshed across all Figma variable collections.</p>
              </div>
              <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss info">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                <span class="visually-hidden">Dismiss</span>
              </button>
            </div>

            <!-- Success -->
            <div class="banner banner--success" role="status">
              <div class="banner__inner">
                <h4 class="subheading">WCAG 2.2 Conformance Audit Passed</h4>
                <p>All automated and keyboard axe-core checks passed with 0 violations.</p>
              </div>
              <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss success">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                <span class="visually-hidden">Acknowledge</span>
              </button>
            </div>

            <!-- Warning -->
            <div class="banner banner--warning" role="region" aria-label="Maintenance warning">
              <div class="banner__inner">
                <h4 class="subheading">Scheduled Maintenance Window</h4>
                <p>Deployment servers will be offline on Sunday from 02:00 to 04:00 UTC.</p>
              </div>
              <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss warning">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                <span class="visually-hidden">Dismiss</span>
              </button>
            </div>

            <!-- Error / Danger -->
            <div class="banner banner--error" role="alert">
              <div class="banner__inner">
                <h4 class="subheading">Audit Failure Detected</h4>
                <p>3 components violate WCAG 2.5.8 target size requirements. Deployment blocked.</p>
              </div>
              <button type="button" class="button button--strong button--accent button--icon banner__action" aria-label="Dismiss error">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                <span class="visually-hidden">Dismiss</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 4. Prominence Matrix (Default, Subtle & Strong Variations)
 */
export const ProminenceMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24);">
          <h4 class="demo-heading">Banner Prominence Matrix</h4>
          <p class="demo-desc">
            Orthogonal prominence tiers: Default (bordered translucent), Subtle (borderless), and Strong (high-emphasis solid fill).
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-32);">
          <!-- 1. Default Prominence (Bordered) -->
          <div>
            <h5 class="subheading" style="margin-block-end: var(--spacing-12);">1. Default Prominence (1px Bordered Translucent)</h5>
            <div class="stack" style="gap: var(--spacing-12);">
              <div class="banner" role="region" aria-label="Default Neutral">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg></span>
                <div class="banner__inner"><p>Neutral Default: Standard card surface with subtle outline.</p></div>
                <button type="button" class="button button--subtle button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg><span class="visually-hidden">Dismiss</span></button>
              </div>
              <div class="banner banner--info" role="region" aria-label="Info Default">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
                <div class="banner__inner"><p>Info Default: Translucent accent tint with accent border.</p></div>
                <button type="button" class="button button--subtle button--sm banner__action"><span>Action</span></button>
              </div>
              <div class="banner banner--success" role="status" aria-label="Success Default">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
                <div class="banner__inner"><p>Success Default: Translucent green tint with success border.</p></div>
              </div>
              <div class="banner banner--warning" role="region" aria-label="Warning Default">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
                <div class="banner__inner"><p>Warning Default: Translucent amber tint with warning border.</p></div>
              </div>
              <div class="banner banner--error" role="alert" aria-label="Error Default">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></span>
                <div class="banner__inner"><p>Error Default: Translucent red tint with danger border.</p></div>
              </div>
            </div>
          </div>

          <!-- 2. Subtle Prominence (Borderless) -->
          <div>
            <h5 class="subheading" style="margin-block-end: var(--spacing-12);">2. Subtle Prominence (.banner--subtle: Borderless Soft Tint)</h5>
            <div class="stack" style="gap: var(--spacing-12);">
              <div class="banner banner--subtle" role="region" aria-label="Neutral Subtle">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg></span>
                <div class="banner__inner"><p>Neutral Subtle: Borderless resting surface blend.</p></div>
              </div>
              <div class="banner banner--subtle banner--info" role="region" aria-label="Info Subtle">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
                <div class="banner__inner"><p>Info Subtle: Borderless soft accent wash.</p></div>
              </div>
              <div class="banner banner--subtle banner--success" role="status" aria-label="Success Subtle">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
                <div class="banner__inner"><p>Success Subtle: Borderless soft positive wash.</p></div>
              </div>
              <div class="banner banner--subtle banner--warning" role="region" aria-label="Warning Subtle">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
                <div class="banner__inner"><p>Warning Subtle: Borderless soft warning wash.</p></div>
              </div>
              <div class="banner banner--subtle banner--error" role="alert" aria-label="Error Subtle">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></span>
                <div class="banner__inner"><p>Error Subtle: Borderless soft error wash.</p></div>
              </div>
            </div>
          </div>

          <!-- 3. Strong Prominence (High-Emphasis Solid Fill) -->
          <div>
            <h5 class="subheading" style="margin-block-end: var(--spacing-12);">3. Strong Prominence (.banner--strong: High-Emphasis Solid Fill)</h5>
            <div class="stack" style="gap: var(--spacing-12);">
              <div class="banner banner--strong" role="region" aria-label="Neutral Strong">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg></span>
                <div class="banner__inner"><p>Neutral Strong: High-emphasis solid neutral fill with inverted text.</p></div>
                <button type="button" class="button button--subtle button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg><span class="visually-hidden">Dismiss</span></button>
              </div>
              <div class="banner banner--strong banner--info" role="region" aria-label="Info Strong">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
                <div class="banner__inner"><p>Info Strong: Solid accent fill with high-contrast inverted text.</p></div>
                <button type="button" class="button button--strong button--accent button--sm banner__action"><span>Update</span></button>
              </div>
              <div class="banner banner--strong banner--success" role="status" aria-label="Success Strong">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
                <div class="banner__inner"><p>Success Strong: Solid success fill with high-contrast inverted text.</p></div>
                <button type="button" class="button button--subtle button--sm banner__action"><span>View</span></button>
              </div>
              <div class="banner banner--strong banner--warning" role="region" aria-label="Warning Strong">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
                <div class="banner__inner"><p>Warning Strong: Solid warning fill with high-contrast inverted text.</p></div>
                <button type="button" class="button button--subtle button--sm banner__action"><span>Resolve</span></button>
              </div>
              <div class="banner banner--strong banner--error" role="alert" aria-label="Error Strong">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></span>
                <div class="banner__inner"><p>Error Strong: Solid danger fill with high-contrast inverted text.</p></div>
                <button type="button" class="button button--subtle button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg><span class="visually-hidden">Dismiss</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. State Matrix (Color Token Cascading & High Contrast Overrides)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Token Cascading & Contrast Matrix</h4>
          <p class="demo-desc">
            Banners cascade their semantic colors into all nested interactive elements (buttons, links, icons).
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Automatic Subcomponent Color Cascading</span>
            <div class="banner banner--warning" style="margin-block-start: var(--spacing-8);">
              <div class="banner__inner">
                <p>
                  Nested links like <a href="#details" class="link">this audit documentation</a> and
                  buttons inherit the warning color scheme automatically.
                </p>
                <div class="button-group" style="margin-block-start: var(--spacing-4);">
                  <button type="button" class="button button--strong button--accent button--sm"><span>Primary Action</span></button>
                  <button type="button" class="button button--subtle button--sm"><span>Subtle Action</span></button>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-box demo-box--neutral">
            <span class="demo-label">High-Contrast Mode (@media (prefers-contrast: more))</span>
            <p class="small-text" style="margin-block: var(--spacing-4);">
              Translucency drops to 0% and border width scales to 2px for strong visual framing.
            </p>
            <div class="banner banner--info" style="border-width: 2px; margin-block-start: var(--spacing-8);">
              <div class="banner__inner">
                <p>Explicit 2px solid perimeter border in forced-colors environments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. Sizes & Density (Compact Inline vs Verbose Multi-Action vs Media Thumbnail)
 */
export const SizesAndDensity: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Compact Single Line -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Compact Single-Line Banner</span>
              <div class="banner banner--info">
                <div class="banner__inner" style="flex-direction: row; align-items: center; justify-content: space-between; inline-size: 100%;">
                  <span class="small-text">Quick status update: 4 tests pending review.</span>
                  <a href="#view" class="link small-text"><span>Review</span></a>
                </div>
              </div>
            </div>

            <!-- Verbose with Subheading and Button Group -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Multi-Line Verbose Banner with Actions</span>
              <div class="banner banner--warning">
                <div class="banner__inner">
                  <h4 class="subheading">Database Migration Required</h4>
                  <p>Changes in DTCG token architecture require a schema re-indexing.</p>
                  <div class="button-group" style="margin-block-start: var(--spacing-4);">
                    <button type="button" class="button button--strong button--accent button--sm"><span>Run Migration</span></button>
                    <button type="button" class="button button--subtle button--sm"><span>Postpone</span></button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Banner with Thumbnail Media -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Media Thumbnail Callout (.banner__thumb)</span>
              <div class="banner banner--dynamic-corners">
                <div class="banner__thumb" style="inline-size: 8rem; background-color: var(--surface-accent); display: flex; align-items: center; justify-content: center;">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg>
                </div>
                <div class="banner__inner">
                  <h4 class="card__title small-heading">Design System 2026</h4>
                  <p class="small-text">Modern Web Standards and WCAG 2.2 Level AA / AAA accessible primitives.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Geometry Modifiers (Dynamic Corners, Round Pills & Ruled Dividers)
 */
export const GeometryModifiers: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Dynamic Concentric Corners -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Dynamic Concentric Corners (.banner--dynamic-corners buttons-round)</span>
              <div class="banner banner--success banner--dynamic-corners buttons-round">
                <div class="banner__inner">
                  <p class="heading" style="margin: 0;">Publish to Production?</p>
                </div>
                <button type="button" class="button button--strong button--accent banner__action">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                  <span class="visually-hidden">Confirm Publish</span>
                </button>
              </div>
            </div>

            <!-- Pill Round -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Round Pill Geometry (.banner--round)</span>
              <div class="banner banner--info banner--round">
                <div class="banner__inner">
                  <p class="small-text" style="margin: 0;">New version released — click to reload application.</p>
                </div>
                <button type="button" class="button button--strong button--accent button--sm banner__action">
                  <span>Reload</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 7. Real World Recipes (Cookie Consent, Outage Callout & Form Validation)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Production Recipes</h4>
          <p class="demo-desc">High-frequency UI notification patterns across applications.</p>
        </div>

        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            <!-- Recipe 1: Cookie & Privacy Notice -->
            <div class="banner banner--dynamic-corners buttons-round" role="region" aria-label="Privacy settings">
              <div class="banner__inner">
                <h4 class="subheading">Privacy & Cookies</h4>
                <p class="small-text">
                  We use cookies and telemetry strictly to verify accessible design system performance.
                </p>
                <div class="button-group" style="margin-block-start: var(--spacing-4);">
                  <button type="button" class="button button--strong button--accent button--sm"><span>Accept All</span></button>
                  <button type="button" class="button button--subtle button--sm"><span>Manage Preferences</span></button>
                </div>
              </div>
            </div>

            <!-- Recipe 2: Form Error Summary Box -->
            <div class="banner banner--error" role="alert">
              <div class="banner__inner">
                <h4 class="subheading">There were 2 errors with your submission</h4>
                <ul style="margin: 0; padding-inline-start: var(--spacing-16);">
                  <li class="small-text"><a href="#email-field" class="link">Email address is not formatted correctly</a></li>
                  <li class="small-text"><a href="#terms-field" class="link">You must accept the terms of service</a></li>
                </ul>
              </div>
            </div>

            <!-- Recipe 3: Deployment Success Toast Callout -->
            <div class="banner banner--success" role="status">
              <div class="banner__inner" style="flex-direction: row; align-items: center; justify-content: space-between; inline-size: 100%;">
                <div class="cluster" style="align-items: center; gap: var(--spacing-8);">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                  <span class="small-text"><strong>Build Successful:</strong> Artifact deployed to CDN.</span>
                </div>
                <button type="button" class="button button--subtle button--icon" aria-label="Close notification">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                  <span class="visually-hidden">Dismiss</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};
