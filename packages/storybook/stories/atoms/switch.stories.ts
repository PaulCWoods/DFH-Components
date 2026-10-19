import type { Meta, StoryObj } from '@storybook/html';

interface SwitchArgs {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isRound?: boolean;
  isDestructive?: boolean;
}

const meta: Meta<SwitchArgs> = {
  title: 'Atoms/Switch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Switch Primitive

The **Switch** primitive is an accessible, segmented binary toggle control with a sliding selection indicator and zero-JS state management via CSS \`:has(:checked)\`.
It combines native HTML checkbox ergonomics with a high-craft physical switch interface.

---

#### 1. Canonical Semantic Markup Signature
AI agents and application developers MUST use the following markup structure:

\`\`\`html
<label class="switch">
  <span class="switch__label">Email Notifications</span>
  <input type="checkbox" role="switch" class="visually-hidden" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **4.1.2 Name, Role, Value** | **A** | Native \`<input type="checkbox">\` equipped with \`role="switch"\`. Clicking label or pressing Space toggles state. State is conveyed natively via \`checked\` attribute. |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Standard (\`md\`) switch control has a minimum block size of **48px** (\`--spacing-48\` / \`--spacing-target\`), meeting AAA requirements. |
| **2.5.8 Target Size (Minimum)** | **AA** | Compact (\`switch--sm\`) maintains **32px** height, well exceeding the 24x24px minimum touch target threshold with ample inline padding. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | Both the active indicator (\`--foreground-accent\`) and container border (\`--border-color\`) maintain at least **3:1** graphical contrast against adjacent surface fills in both Light and Dark modes. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | \`:has(input:focus-visible)\` applies an offset focus ring (\`--focus-ring-width: 2px solid var(--focus-ring-color)\`, \`--focus-ring-offset: 2px\`) with at least **3:1** contrast. |
| **2.3.3 Reduced Motion** | **AAA** | \`@media (prefers-reduced-motion: reduce)\` disables sliding translate animations and color transitions instantly. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--switch-height\` | \`--spacing-48\` (3rem / 48px) | Outer control height matching WCAG 2.5.5 target size |
| \`--switch-radius\` | \`--radius-md\` (0.5rem) | Container and indicator corner radius |
| \`--switch-border-width\` | \`--border-width\` (2px) | Track boundary stroke thickness |
| \`--switch-border-color\` | \`--border-color\` (\`currentColor\`) | Track boundary stroke color |
| \`--switch-off-bg\` | \`--surface-muted\` | Inactive background fill under sliding thumb |
| \`--switch-off-color\` | \`--foreground\` (\`currentColor\`) | Inactive label text color |
| \`--switch-on-bg\` | \`--foreground-accent\` | Active indicator background fill |
| \`--switch-on-color\` | \`--foreground-inverted-strong\` | Active option label text color |
| \`--switch-transition\` | \`--duration-sm\` (200ms) | Sliding indicator and color transition duration |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate child switch styles across entire sections without utility classes:

\`\`\`css
/* Example: Contextual settings panel */
.settings-toolbar {
  --switch-corners: round;
  --switch-size: sm;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: {
      description: 'Associated descriptive label text',
      control: 'text',
      defaultValue: 'Two-Factor Authentication',
    },
    checked: {
      description: 'Binary toggle state',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Disabled interaction state',
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      description: 'Control sizing variant',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    isRound: {
      description: 'Circular pill corner shape',
      control: 'boolean',
      defaultValue: false,
    },
    isDestructive: {
      description: 'Destructive safety-critical variant',
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `switch--${args.size}` : '';
    const roundClass = args.isRound ? 'switch--round' : '';
    const destructiveClass = args.isDestructive ? 'switch--destructive' : '';
    const classes = ['switch', sizeClass, roundClass, destructiveClass].filter(Boolean).join(' ');

    return `
      <div class="demo-stage demo-constrained--md">
        <label class="${classes}">
          <span class="switch__label">${args.label || 'Switch Setting'}</span>
          <input 
            type="checkbox" 
            role="switch" 
            class="visually-hidden" 
            ${args.checked ? 'checked' : ''} 
            ${args.disabled ? 'disabled' : ''} 
          />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<SwitchArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Adjust props, state, size, and variants using the Storybook controls table below.
 */
export const Playground: Story = {
  args: {
    label: 'Dark Mode',
    checked: true,
    disabled: false,
    size: 'md',
    isRound: false,
    isDestructive: false,
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Illustrates the semantic parts of the switch primitive.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">1. Label &rarr; 2. Hidden Native Input &rarr; 3. Track Container &rarr; 4. Active Sliding Indicator</div>
      
      <label class="switch">
        <span class="switch__label">
          <b>Notifications</b>
          <small>Push notifications for team mentions</small>
        </span>
        <input type="checkbox" role="switch" class="visually-hidden" checked />
        <span class="switch__control" aria-hidden="true">
          <span class="switch__option switch__option--off">Off</span>
          <span class="switch__option switch__option--on">On</span>
        </span>
      </label>
    </div>
  `,
};

/**
 * 3. Visual Variants & Shapes
 * Compares default rectangular-soft corners, pill/round geometry, and destructive warning mode.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Standard Variant -->
      <div>
        <div class="demo-label">Standard Brand Accent</div>
        <label class="switch">
          <span class="switch__label">Standard Switch</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <hr class="divider" />

      <!-- Pill / Round Variant -->
      <div>
        <div class="demo-label">Round / Pill Shape (.switch--round)</div>
        <label class="switch switch--round">
          <span class="switch__label">Pill Switch</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <hr class="divider" />

      <!-- Destructive Variant -->
      <div>
        <div class="demo-label">Destructive / Safety Critical (.switch--destructive)</div>
        <label class="switch switch--destructive">
          <span class="switch__label">Maintenance Mode (Suspends Traffic)</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>
    </div>
  `,
};

/**
 * 4. State Matrix
 * Side-by-side verification of all interactive states (Off, On, Focus, Disabled).
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Off State -->
      <div>
        <div class="demo-label">State: Off (Unchecked at Rest)</div>
        <label class="switch">
          <span class="switch__label">Offline Mode</span>
          <input type="checkbox" role="switch" class="visually-hidden" />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <!-- On State -->
      <div>
        <div class="demo-label">State: On (Checked at Rest)</div>
        <label class="switch">
          <span class="switch__label">Online Mode</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <!-- Disabled State (Off) -->
      <div>
        <div class="demo-label">State: Disabled (Off)</div>
        <label class="switch">
          <span class="switch__label">Automatic Backups (Locked by Org)</span>
          <input type="checkbox" role="switch" class="visually-hidden" disabled />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <!-- Disabled State (On) -->
      <div>
        <div class="demo-label">State: Disabled (On)</div>
        <label class="switch">
          <span class="switch__label">Compliance Logging (Mandatory)</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked disabled />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>
    </div>
  `,
};

/**
 * 5. Sizes & Density (WCAG Target Compliance)
 * Small (32px, meets WCAG 2.5.8), Medium (48px, meets WCAG 2.5.5 AAA), and Large (56px).
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Small -->
      <div>
        <div class="demo-label">Small (.switch--sm / 32px height, 24px+ WCAG 2.5.8 target)</div>
        <label class="switch switch--sm">
          <span class="switch__label">Compact Filter</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <hr class="divider" />

      <!-- Medium (Default) -->
      <div>
        <div class="demo-label">Standard (.switch / 48px height, WCAG 2.5.5 AAA Target Size)</div>
        <label class="switch">
          <span class="switch__label">Standard Setting</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>

      <hr class="divider" />

      <!-- Large -->
      <div>
        <div class="demo-label">Large (.switch--lg / 56px height)</div>
        <label class="switch switch--lg">
          <span class="switch__label">Prominent Kiosk Switch</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>
    </div>
  `,
};

/**
 * 6. Zero-Class Container Style Queries (@container style(...))
 * Shows how parent containers orchestrate child switch density, geometry, and variants without utility classes.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <div class="demo-label">Parent Container: style="--switch-corners: round; --switch-size: sm;"</div>
      
      <!-- Parent Container orchestrating child switches -->
      <div class="demo-stage stack" style="--switch-corners: round; --switch-size: sm;">
        <label class="switch">
          <span class="switch__label">Auto-save drafts</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>

        <label class="switch">
          <span class="switch__label">Spell check</span>
          <input type="checkbox" role="switch" class="visually-hidden" checked />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipes & UI Compositions
 * Common UI patterns where the switch is applied in production applications.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Settings Card Row -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Privacy & Security</h3>
          </header>
          <div class="card__body stack">
            <label class="switch">
              <span class="switch__label">
                <strong>Two-Factor Authentication</strong>
                <small>Require a security code when logging in from new devices</small>
              </span>
              <input type="checkbox" role="switch" class="visually-hidden" checked />
              <span class="switch__control" aria-hidden="true">
                <span class="switch__option switch__option--off">Off</span>
                <span class="switch__option switch__option--on">On</span>
              </span>
            </label>

            <hr class="divider" />

            <label class="switch">
              <span class="switch__label">
                <strong>Public Profile Indexing</strong>
                <small>Allow external search engines to display your author bio</small>
              </span>
              <input type="checkbox" role="switch" class="visually-hidden" />
              <span class="switch__control" aria-hidden="true">
                <span class="switch__option switch__option--off">Off</span>
                <span class="switch__option switch__option--on">On</span>
              </span>
            </label>
          </div>
        </article>
      </div>

      <!-- Recipe B: Form Field Integration with Hint -->
      <div class="card card--bordered card--translucent">
        <article class="card__content">
          <div class="card__body stack">
            <div class="field">
              <label class="switch">
                <span class="switch__label">Weekly Digest Email</span>
                <input type="checkbox" role="switch" class="visually-hidden" aria-describedby="digest-hint" checked />
                <span class="switch__control" aria-hidden="true">
                  <span class="switch__option switch__option--off">Off</span>
                  <span class="switch__option switch__option--on">On</span>
                </span>
              </label>
              <p id="digest-hint" class="field__hint">Sent every Monday morning summarizing new case studies.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
};
