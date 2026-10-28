import type { Meta, StoryObj } from '@storybook/html';

interface ChoicesArgs {
  layout: 'vertical' | 'inline';
  size: 'sm' | 'base' | 'lg';
  density: 'default' | 'compact';
  disabled: boolean;
}

const meta: Meta<ChoicesArgs> = {
  title: 'Molecules/Choices',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Choices Primitive

The **Choices** primitive is a layout orchestrator and touch-target wrapper for groups of interactive form choices (checkboxes and radio buttons).
Complies with **WCAG 2.2 Level AA / AAA** (2.5.5 / 2.5.8 Target Size, 1.4.3 Contrast, 2.4.7 Focus Visible, 1.3.1 Info & Relationships).

#### Architectural Principles:
- **Zero-Specificity Cascade Rule:** All primitives and modifiers are wrapped in \`:where(...)\` with \`(0, 0, 0)\` specificity.
- **Expansive Touch Target:** The enclosing \`<label class="choice">\` acts as an expansive touch target with \`min-block-size: var(--_choice-min-block-size, 1.5rem)\` (24px), satisfying WCAG 2.5.8 Target Size (Minimum) AA effortlessly.
- **Zero-JS Check Synchronization:** Wrapping native \`<input type="checkbox">\` or \`<input type="radio">\` inside \`<label class="choice">\` allows users to click anywhere on the row to toggle state natively without JavaScript.
- **Semantic List Support:** \`:where(.choices)\` resets lists and neutralizes nested \`li\` elements with \`:where(li) { display: contents; }\`, permitting accessible \`<ul class="choices">\` markup without bullet or padding distortion.
- **Adaptive Density:** Container queries (\`@container style(--ui-density: dense) or style(--ui-sizing: compact)\`) and explicit \`.choices--compact\` / \`.choice--sm\` classes adjust spacing and font-sizes adaptively.

---

#### Canonical Component Markup Signatures

\`\`\`html
<!-- 1. Semantic Fieldset of Checkboxes -->
<fieldset class="fieldset">
  <legend class="legend">Accessible Audit Deliverables</legend>
  <div class="choices">
    <label class="choice" for="cb-axe">
      <input type="checkbox" id="cb-axe" class="checkbox-input" checked />
      <span>Automated axe-core compliance scanner</span>
    </label>
    <label class="choice" for="cb-keyboard">
      <input type="checkbox" id="cb-keyboard" class="checkbox-input" />
      <span>Keyboard navigation review</span>
    </label>
  </div>
</fieldset>

<!-- 2. Horizontal Radio Choices -->
<div class="choices choices--inline">
  <label class="choice" for="freq-daily">
    <input type="radio" id="freq-daily" name="frequency" class="radio-input" checked />
    <span>Daily</span>
  </label>
  <label class="choice" for="freq-weekly">
    <input type="radio" id="freq-weekly" name="frequency" class="radio-input" />
    <span>Weekly</span>
  </label>
</div>

<!-- 3. Semantic List with Multi-Line Choice Labels -->
<fieldset class="fieldset">
  <legend class="legend">Notification Channels</legend>
  <ul class="choices">
    <li>
      <label class="choice" for="ch-email">
        <input type="checkbox" id="ch-email" class="checkbox-input" checked />
        <span class="choice__label">
          <span>Email Digest</span>
          <small>Weekly accessibility score report delivered to your inbox</small>
        </span>
      </label>
    </li>
    <li>
      <label class="choice" for="ch-sms">
        <input type="checkbox" id="ch-sms" class="checkbox-input" />
        <span class="choice__label">
          <span>SMS Alerts</span>
          <small>Instant notification when critical WCAG violations occur</small>
        </span>
      </label>
    </li>
  </ul>
</fieldset>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'inline'],
      description: 'Choices orientation layout',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Choice sizing variant',
    },
    density: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Spatial density modifier',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled interactive state',
    },
  },
  args: {
    layout: 'vertical',
    size: 'base',
    density: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ChoicesArgs>;

/**
 * 1. Default (Vertical Checkbox Choices in Fieldset)
 */
export const Default: Story = {
  render: (args) => {
    const layoutClass = args.layout === 'inline' ? ' choices--inline' : '';
    const densityClass = args.density === 'compact' ? ' choices--compact' : '';
    const sizeClass = args.size === 'sm' ? ' choice--sm' : args.size === 'lg' ? ' choice--lg' : '';
    const inputSizeClass = args.size === 'sm' ? '' : args.size === 'lg' ? ' checkbox-input--lg' : '';
    const disabledAttr = args.disabled ? ' disabled' : '';

    return `
      <fieldset class="fieldset">
        <legend class="legend">Accessible Audit Deliverables</legend>
        <div class="choices${layoutClass}${densityClass}">
          <label class="choice${sizeClass}">
            <input type="checkbox" id="cb-opt1" class="checkbox-input${inputSizeClass}" checked${disabledAttr} />
            <span>Automated axe-core compliance scanner</span>
          </label>
          <label class="choice${sizeClass}">
            <input type="checkbox" id="cb-opt2" class="checkbox-input${inputSizeClass}"${disabledAttr} />
            <span>Keyboard navigation and focus order audit</span>
          </label>
          <label class="choice${sizeClass}">
            <input type="checkbox" id="cb-opt3" class="checkbox-input${inputSizeClass}"${disabledAttr} />
            <span>Screen reader compatibility (VoiceOver & NVDA)</span>
          </label>
        </div>
      </fieldset>
    `;
  },
};

/**
 * 2. Inline Radio Choices (.choices--inline)
 */
export const InlineChoices: Story = {
  render: () => `
    <fieldset class="fieldset">
      <legend class="legend">Audit Frequency</legend>
      <div class="choices choices--inline">
        <label class="choice">
          <input type="radio" name="audit-freq" id="freq-daily" class="radio-input" checked />
          <span>Daily</span>
        </label>
        <label class="choice">
          <input type="radio" name="audit-freq" id="freq-weekly" class="radio-input" />
          <span>Weekly</span>
        </label>
        <label class="choice">
          <input type="radio" name="audit-freq" id="freq-monthly" class="radio-input" />
          <span>Monthly</span>
        </label>
        <label class="choice">
          <input type="radio" name="audit-freq" id="freq-quarterly" class="radio-input" />
          <span>Quarterly</span>
        </label>
      </div>
    </fieldset>
  `,
};

/**
 * 3. Multi-Line Labels with Descriptions (.choice__label)
 */
export const MultiLineDescriptions: Story = {
  render: () => `
    <fieldset class="fieldset" style="max-inline-size: 32rem;">
      <legend class="legend">Notification Preferences</legend>
      <div class="choices">
        <label class="choice">
          <input type="checkbox" id="notify-email" class="checkbox-input" checked />
          <span class="choice__label">
            <span>Email Digest</span>
            <small>Weekly accessibility score report delivered directly to your inbox.</small>
          </span>
        </label>
        <label class="choice">
          <input type="checkbox" id="notify-slack" class="checkbox-input" checked />
          <span class="choice__label">
            <span>Slack Integration</span>
            <small>Real-time notifications sent to your team channel when regressions occur.</small>
          </span>
        </label>
        <label class="choice">
          <input type="checkbox" id="notify-sms" class="checkbox-input" />
          <span class="choice__label">
            <span>Critical Incident SMS</span>
            <small>Urgent SMS alert triggered only for Level AA failures on production routes.</small>
          </span>
        </label>
      </div>
    </fieldset>
  `,
};

/**
 * 4. Semantic List Markup (`<ul class="choices">`)
 */
export const SemanticList: Story = {
  render: () => `
    <fieldset class="fieldset">
      <legend class="legend">Export Formats (Semantic List)</legend>
      <ul class="choices">
        <li>
          <label class="choice">
            <input type="radio" name="export-fmt" id="fmt-json" class="radio-input" checked />
            <span>JSON (Machine-readable tokens)</span>
          </label>
        </li>
        <li>
          <label class="choice">
            <input type="radio" name="export-fmt" id="fmt-csv" class="radio-input" />
            <span>CSV (Spreadsheet compatible)</span>
          </label>
        </li>
        <li>
          <label class="choice">
            <input type="radio" name="export-fmt" id="fmt-pdf" class="radio-input" />
            <span>PDF (Executive summary report)</span>
          </label>
        </li>
      </ul>
    </fieldset>
  `,
};

/**
 * 5. Sizing Variations (.choice--sm, Base, .choice--lg)
 */
export const SizingTiers: Story = {
  render: () => `
    <div class="stack gap-xl">
      <fieldset class="fieldset">
        <legend class="legend">Small Choices (.choice--sm / .choices--compact)</legend>
        <div class="choices choices--compact">
          <label class="choice choice--sm">
            <input type="checkbox" class="checkbox-input" checked />
            <span class="choice__label">
              <span>Compact Option One</span>
              <small>Space-constrained interfaces and data grids</small>
            </span>
          </label>
          <label class="choice choice--sm">
            <input type="checkbox" class="checkbox-input" />
            <span class="choice__label">
              <span>Compact Option Two</span>
              <small>Minimal vertical row height</small>
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="legend">Standard Choices (Default)</legend>
        <div class="choices">
          <label class="choice">
            <input type="checkbox" class="checkbox-input" checked />
            <span class="choice__label">
              <span>Standard Option</span>
              <small>Default 1rem text with 1.25rem (20px) control</small>
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="legend">Large Choices (.choice--lg)</legend>
        <div class="choices">
          <label class="choice choice--lg">
            <input type="checkbox" class="checkbox-input checkbox-input--lg" checked />
            <span class="choice__label">
              <span>Large Option</span>
              <small>High-visibility touch targets for kiosk or onboarding flows</small>
            </span>
          </label>
        </div>
      </fieldset>
    </div>
  `,
};

/**
 * 6. Interactive States & Inline Links
 */
export const StatesAndLinks: Story = {
  render: () => `
    <div class="stack gap-lg">
      <fieldset class="fieldset">
        <legend class="legend">Choices with Embedded Interactive Links</legend>
        <div class="choices">
          <label class="choice">
            <input type="checkbox" class="checkbox-input" required />
            <span>I have read and agree to the <a href="#terms" class="link">Terms of Service</a> and <a href="#privacy" class="link">Privacy Charter</a>.</span>
          </label>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="legend">Disabled Choices</legend>
        <div class="choices">
          <label class="choice">
            <input type="checkbox" class="checkbox-input" checked disabled />
            <span>Locked Setting (Checked &amp; Disabled)</span>
          </label>
          <label class="choice">
            <input type="checkbox" class="checkbox-input" disabled />
            <span>Unavailable Feature (Unchecked &amp; Disabled)</span>
          </label>
        </div>
      </fieldset>
    </div>
  `,
};
