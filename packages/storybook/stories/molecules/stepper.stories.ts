import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Stepper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Stepper Primitive

Structured, accessible sequential progression and multi-step wizard navigation composing ordered lists (\`<ol>\`), semantic step landmarks (\`<nav aria-label="...">\`), completed checkmarks, and responsive container query collapse adhering strictly to WCAG 2.2 Level AA / AAA standards.

---

### Canonical Semantic Markup Signatures

#### A. Standard Progress Stepper (Non-Interactive)
\`\`\`html
<nav class="stepper" aria-label="Registration progress">
  <ol class="stepper__list">
    <!-- Completed Step -->
    <li class="stepper__item is-complete">
      <div class="stepper__step">
        <span class="stepper__indicator" aria-hidden="true">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </span>
        <div class="stepper__content">
          <span class="stepper__title small-heading">Personal Details</span>
          <span class="stepper__description small-text text-muted">Completed</span>
        </div>
      </div>
    </li>

    <!-- Active Step -->
    <li class="stepper__item is-active" aria-current="step">
      <div class="stepper__step">
        <span class="stepper__indicator"><span>2</span></span>
        <div class="stepper__content">
          <span class="stepper__title small-heading">Growing Agreement</span>
          <span class="stepper__description small-text text-muted">In progress</span>
        </div>
      </div>
    </li>

    <!-- Upcoming Step -->
    <li class="stepper__item">
      <div class="stepper__step">
        <span class="stepper__indicator"><span>3</span></span>
        <div class="stepper__content">
          <span class="stepper__title small-heading">Fee Schedule</span>
          <span class="stepper__description small-text text-muted">Pending</span>
        </div>
      </div>
    </li>
  </ol>
</nav>
\`\`\`

#### B. Interactive Jump Stepper (Clickable Buttons)
\`\`\`html
<nav class="stepper" aria-label="Checkout steps">
  <ol class="stepper__list">
    <li class="stepper__item is-complete">
      <button type="button" class="stepper__step">
        <span class="stepper__indicator" aria-hidden="true">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </span>
        <span class="stepper__title small-heading">Shipping</span>
      </button>
    </li>
    <li class="stepper__item is-active" aria-current="step">
      <button type="button" class="stepper__step is-active" aria-current="step">
        <span class="stepper__indicator"><span>2</span></span>
        <span class="stepper__title small-heading">Payment</span>
      </button>
    </li>
    <li class="stepper__item">
      <button type="button" class="stepper__step" disabled>
        <span class="stepper__indicator"><span>3</span></span>
        <span class="stepper__title small-heading">Review</span>
      </button>
    </li>
  </ol>
</nav>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.3.1 Info and Relationships** | A | **Pass** | Semantic \`<nav aria-label="...">\` landmarks the progression; \`<ol>\` and \`<li>\` communicate numbered linear steps to assistive technology. |
| **4.1.2 Name, Role, Value** | A | **Pass** | The active step explicitly declares \`aria-current="step"\` so screen readers announce current workflow position unambiguously. |
| **1.4.1 Use of Color** | A | **Pass** | Completed steps are identified by a checkmark icon (\`#Check\`) in addition to green color, ensuring non-color-only state recognition. |
| **1.4.3 Contrast (Minimum)** | AA | **Pass** | Indicator text and borders meet >= 4.5:1 against surfaces in all color themes; active state features high-contrast accent ring. |
| **2.4.7 Focus Visible** | AA | **Pass** | Interactive buttons inherit prominent 2px outline with 3px offset when focused via keyboard. |
| **Container Queries** | Best Practice | **Pass** | \`@container (max-width: 34rem)\` automatically collapses secondary descriptions and collapses non-active step titles in narrow viewports. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--_stepper-gap\` | \`var(--stepper-gap)\` | \`var(--spacing-16, 1rem)\` | Spacing between step items |
| \`--_stepper-track-thickness\` | \`var(--stepper-track-thickness)\` | \`var(--border-width-2, 2px)\` | Thickness of the connecting progression track |
| \`--_stepper-track-color\` | \`var(--stepper-track-color)\` | \`var(--border-color-quiet)\` | Inactive connecting track stroke color |
| \`--_stepper-track-color-complete\` | \`var(--stepper-track-color-complete)\` | \`var(--foreground-success)\` | Completed track segment fill color |
| \`--_stepper-indicator-size\` | \`var(--stepper-indicator-size)\` | \`var(--spacing-36, 2.25rem)\` | Diameter of the step circle indicator |
| \`--_stepper-indicator-font-size\` | \`var(--stepper-indicator-font-size)\` | \`var(--micro-heading-font-size, 0.875rem)\` | Indicator numeral font size |
| \`--_stepper-title-font-size\` | \`var(--stepper-title-font-size)\` | \`var(--micro-heading-font-size, 0.875rem)\` | Step label text size |
| \`--_stepper-desc-font-size\` | \`var(--stepper-desc-font-size)\` | \`var(--body-sm-font-size)\` | Subtitle description text size |
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of step progression',
      defaultValue: 'horizontal',
    },
    compact: {
      control: 'boolean',
      description: 'Hides subtitles for a denser presentation',
      defaultValue: false,
    },
    activeStep: {
      control: { type: 'range', min: 1, max: 4, step: 1 },
      description: 'Currently active step index',
      defaultValue: 2,
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive stepper sandbox exploring orientations, compact mode, and step states.
 */
export const Playground: Story = {
  render: (args) => {
    const isVertical = args.orientation === 'vertical';
    const isCompact = args.compact;
    const active = args.activeStep || 2;

    const steps = [
      { id: 1, title: 'Plot & Gardener', desc: 'Personal details' },
      { id: 2, title: 'Growing Agreement', desc: 'Rules & bylaws' },
      { id: 3, title: 'Fee Schedule', desc: 'Sliding scale tier' },
      { id: 4, title: 'Confirmation', desc: 'Keycard issuance' },
    ];

    return `
      <div style="max-inline-size: ${isVertical ? '24rem' : '48rem'}; padding: var(--spacing-16);">
        <nav class="stepper ${isVertical ? 'stepper--vertical' : ''} ${isCompact ? 'stepper--compact' : ''}" aria-label="Registration steps">
          <ol class="stepper__list">
            ${steps
              .map((s) => {
                const isComplete = s.id < active;
                const isActive = s.id === active;
                const stateClass = isComplete ? 'is-complete' : isActive ? 'is-active' : '';
                const ariaCurrent = isActive ? 'aria-current="step"' : '';

                return `
                  <li class="stepper__item ${stateClass}" ${ariaCurrent}>
                    <div class="stepper__step">
                      <span class="stepper__indicator" aria-hidden="true">
                        ${isComplete ? '<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>' : `<span>${s.id}</span>`}
                      </span>
                      <div class="stepper__content">
                        <span class="stepper__title small-heading">${s.title}</span>
                        ${!isCompact ? `<span class="stepper__description small-text text-muted">${isComplete ? 'Completed' : s.desc}</span>` : ''}
                      </div>
                    </div>
                  </li>
                `;
              })
              .join('')}
          </ol>
        </nav>
      </div>
    `;
  },
};

/**
 * 2. Linear Progress
 * Standard non-interactive stepper used in progressive wizards and sign-up flows.
 */
export const LinearProgress: Story = {
  render: () => `
    <div style="max-inline-size: 52rem; padding: var(--spacing-16);">
      <nav class="stepper" aria-label="Garden plot reservation workflow">
        <ol class="stepper__list">
          <li class="stepper__item is-complete">
            <div class="stepper__step">
              <span class="stepper__indicator" aria-hidden="true">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
              </span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Select Plot</span>
                <span class="stepper__description small-text text-muted">Plot #B-04</span>
              </div>
            </div>
          </li>
          <li class="stepper__item is-active" aria-current="step">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>2</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Gardener Info</span>
                <span class="stepper__description small-text text-muted">In progress</span>
              </div>
            </div>
          </li>
          <li class="stepper__item">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>3</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Civic Agreement</span>
                <span class="stepper__description small-text text-muted">Pending</span>
              </div>
            </div>
          </li>
          <li class="stepper__item">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>4</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Keycard Issuance</span>
                <span class="stepper__description small-text text-muted">Final step</span>
              </div>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  `,
};

/**
 * 3. Interactive Wizard
 * Uses button triggers allowing users to jump back to previously completed steps.
 */
export const InteractiveWizard: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; padding: var(--spacing-16);">
      <nav class="stepper" aria-label="Interactive wizard">
        <ol class="stepper__list">
          <li class="stepper__item is-complete">
            <button type="button" class="stepper__step" onclick="alert('Navigating to Step 1: Account Details');">
              <span class="stepper__indicator" aria-hidden="true">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
              </span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Account Details</span>
                <span class="stepper__description small-text text-muted">Click to edit</span>
              </div>
            </button>
          </li>
          <li class="stepper__item is-active" aria-current="step">
            <button type="button" class="stepper__step is-active" aria-current="step">
              <span class="stepper__indicator"><span>2</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Organization</span>
                <span class="stepper__description small-text text-muted">Current step</span>
              </div>
            </button>
          </li>
          <li class="stepper__item">
            <button type="button" class="stepper__step" disabled>
              <span class="stepper__indicator"><span>3</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Billing Tier</span>
                <span class="stepper__description small-text text-muted">Locked</span>
              </div>
            </button>
          </li>
        </ol>
      </nav>
    </div>
  `,
};

/**
 * 4. Vertical Stepper
 * Column-oriented progression suitable for sidebars, drawers, and mobile workflows.
 */
export const Vertical: Story = {
  render: () => `
    <div style="max-inline-size: 20rem; padding: var(--spacing-16);">
      <nav class="stepper stepper--vertical" aria-label="Setup guide">
        <ol class="stepper__list">
          <li class="stepper__item is-complete">
            <div class="stepper__step">
              <span class="stepper__indicator" aria-hidden="true">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
              </span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Account Setup</span>
                <span class="stepper__description small-text text-muted">Verified email</span>
              </div>
            </div>
          </li>
          <li class="stepper__item is-active" aria-current="step">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>2</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Security Keys</span>
                <span class="stepper__description small-text text-muted">2FA Enrollment</span>
              </div>
            </div>
          </li>
          <li class="stepper__item">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>3</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Team Invites</span>
                <span class="stepper__description small-text text-muted">Collaborator roles</span>
              </div>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  `,
};

/**
 * 5. Compact Stepper
 * Clean and compact indicators ideal for constrained modal headers or cards.
 */
export const Compact: Story = {
  render: () => `
    <div style="max-inline-size: 40rem; padding: var(--spacing-16);">
      <nav class="stepper stepper--compact" aria-label="Compact progress bar">
        <ol class="stepper__list">
          <li class="stepper__item is-complete">
            <div class="stepper__step">
              <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
              <span class="stepper__title small-heading">Details</span>
            </div>
          </li>
          <li class="stepper__item is-complete">
            <div class="stepper__step">
              <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
              <span class="stepper__title small-heading">Preferences</span>
            </div>
          </li>
          <li class="stepper__item is-active" aria-current="step">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>3</span></span>
              <span class="stepper__title small-heading">Payment</span>
            </div>
          </li>
          <li class="stepper__item">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>4</span></span>
              <span class="stepper__title small-heading">Review</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  `,
};

/**
 * 6. Validation Error State
 * Demonstrates an invalid step state when form fields within a prior step fail validation.
 */
export const ValidationErrorState: Story = {
  render: () => `
    <div style="max-inline-size: 44rem; padding: var(--spacing-16);">
      <nav class="stepper" aria-label="Form validation progress">
        <ol class="stepper__list">
          <li class="stepper__item is-complete">
            <div class="stepper__step">
              <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Identity</span>
                <span class="stepper__description small-text text-muted">Verified</span>
              </div>
            </div>
          </li>
          <li class="stepper__item is-invalid">
            <div class="stepper__step">
              <span class="stepper__indicator" aria-hidden="true"><span>!</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Soil Agreement</span>
                <span class="stepper__description small-text text-danger">Signature missing</span>
              </div>
            </div>
          </li>
          <li class="stepper__item is-active" aria-current="step">
            <div class="stepper__step">
              <span class="stepper__indicator"><span>3</span></span>
              <div class="stepper__content">
                <span class="stepper__title small-heading">Annual Dues</span>
                <span class="stepper__description small-text text-muted">Current step</span>
              </div>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  `,
};
