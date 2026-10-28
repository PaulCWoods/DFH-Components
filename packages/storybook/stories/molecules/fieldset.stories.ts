import type { Meta, StoryObj } from '@storybook/html';

interface FieldsetArgs {
  layout: 'default' | 'bordered';
  density: 'default' | 'compact' | 'loose';
  required: boolean;
  disabled: boolean;
}

const meta: Meta<FieldsetArgs> = {
  title: 'Molecules/Fieldset',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Fieldset Primitive

The **Fieldset** primitive provides accessible grouping for related form controls, choice clusters, and complex inputs.
Complies with **WCAG 2.2 Level AA / AAA** (1.3.1 Info & Relationships, 3.3.2 Labels or Instructions, 1.4.3 Contrast).

#### Architectural Principles:
- **Zero-Specificity Cascade Rule:** All rules are wrapped in \`:where(...)\` with \`(0, 0, 0)\` specificity.
- **Automated Required Indicator:** When any nested control has \`:required\` or \`[aria-required="true"]\`, \`:where(.legend, legend)::after\` automatically appends \`" (Required)"\` in muted 400-weight typography for cognitive clarity without visual noise.
- **Browser Reset:** Strips default browser margins, borders, and irregular \`<legend>\` floats/paddings, rendering as a flexible column container with token-based gaps (\`--_fieldset-inner-gap\`).
- **Layout Modifiers:** Supports standard vertical stacking and \`.fieldset--bordered\` (card-like panel).
- **Disabled Cascade:** Native \`<fieldset disabled>\` dims the legend and cascades non-interactive states to all nested inputs natively.

---

#### Canonical Component Markup Signatures

\`\`\`html
<!-- 1. Semantic Fieldset with Choices -->
<fieldset class="fieldset">
  <legend class="legend">Audit Scope</legend>
  <p class="fieldset__description">Select all accessibility standards to include in the scan report.</p>
  <div class="choices">
    <label class="choice" for="cb-wcag21">
      <input type="checkbox" id="cb-wcag21" class="checkbox-input" checked />
      <span>WCAG 2.1 Level AA</span>
    </label>
    <label class="choice" for="cb-wcag22">
      <input type="checkbox" id="cb-wcag22" class="checkbox-input" checked />
      <span>WCAG 2.2 Level AA</span>
    </label>
  </div>
</fieldset>

<!-- 2. Bordered Fieldset (Card-Like Grouping) -->
<fieldset class="fieldset fieldset--bordered">
  <legend class="legend">API Key Permissions</legend>
  <div class="stack gap-sm">
    <div class="field">
      <label for="key-name" class="field__label">Key Name</label>
      <input id="key-name" type="text" class="input" placeholder="e.g. CI/CD Pipeline" />
    </div>
  </div>
</fieldset>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'bordered'],
      description: 'Fieldset layout arrangement',
    },
    density: {
      control: 'select',
      options: ['default', 'compact', 'loose'],
      description: 'Spatial density modifier',
    },
    required: {
      control: 'boolean',
      description: 'Group contains a required input (triggers automated (Required) indicator)',
    },
    disabled: {
      control: 'boolean',
      description: 'Native fieldset disabled state',
    },
  },
  args: {
    layout: 'default',
    density: 'default',
    required: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<FieldsetArgs>;

/**
 * 1. Default (Vertical Fieldset with Description & Choices)
 */
export const Default: Story = {
  render: (args) => {
    const layoutClass = args.layout === 'bordered' ? ' fieldset--bordered' : '';
    const densityClass = args.density === 'compact' ? ' fieldset--compact' : args.density === 'loose' ? ' fieldset--loose' : '';
    const disabledAttr = args.disabled ? ' disabled' : '';
    const requiredAttr = args.required ? ' required' : '';

    return `
      <fieldset class="fieldset${layoutClass}${densityClass}"${disabledAttr} style="max-inline-size: 38rem;">
        <legend class="legend">Accessible Audit Deliverables</legend>
        <p class="fieldset__description">Select all reports and artifact summaries to generate during the audit pass.</p>
        <div class="choices">
          <label class="choice" for="fs-axe">
            <input type="checkbox" id="fs-axe" class="checkbox-input"${requiredAttr} checked />
            <span class="choice__label">
              <span>Automated axe-core compliance scanner</span>
              <small>Scans DOM structure and color contrast automatically</small>
            </span>
          </label>
          <label class="choice" for="fs-keyboard">
            <input type="checkbox" id="fs-keyboard" class="checkbox-input"${requiredAttr} />
            <span class="choice__label">
              <span>Keyboard navigation &amp; focus order audit</span>
              <small>Verifies focus visible rings, skip links, and tab sequences</small>
            </span>
          </label>
          <label class="choice" for="fs-sr">
            <input type="checkbox" id="fs-sr" class="checkbox-input"${requiredAttr} />
            <span class="choice__label">
              <span>Screen reader compliance report</span>
              <small>Manual verification using VoiceOver and NVDA</small>
            </span>
          </label>
        </div>
      </fieldset>
    `;
  },
};

/**
 * 2. Automated Required Indicator
 */
export const AutomatedRequired: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 38rem;">
      <fieldset class="fieldset">
        <legend class="legend">Delivery Speed</legend>
        <p class="fieldset__description">Notice how \`(Required)\` automatically appears on the legend because the radio group is required.</p>
        <div class="choices">
          <label class="choice" for="req-rad-1">
            <input type="radio" id="req-rad-1" name="req-delivery" class="radio-input" required checked />
            <span>Standard Courier (3-5 business days)</span>
          </label>
          <label class="choice" for="req-rad-2">
            <input type="radio" id="req-rad-2" name="req-delivery" class="radio-input" required />
            <span>Priority Overnight (Next morning delivery)</span>
          </label>
        </div>
      </fieldset>
    </div>
  `,
};

/**
 * 3. Bordered Fieldset Variant (.fieldset--bordered)
 */
export const BorderedVariant: Story = {
  render: () => `
    <div class="stack gap-lg" style="max-inline-size: 38rem;">
      <fieldset class="fieldset fieldset--bordered">
        <legend class="legend">Security Permissions</legend>
        <p class="fieldset__description">Bordered fieldsets visually segment dense forms into distinct logical containers.</p>
        <div class="choices">
          <label class="choice">
            <input type="checkbox" class="checkbox-input" checked />
            <span>Allow public API token generation</span>
          </label>
          <label class="choice">
            <input type="checkbox" class="checkbox-input" checked />
            <span>Enforce two-factor authentication (2FA)</span>
          </label>
          <label class="choice">
            <input type="checkbox" class="checkbox-input" />
            <span>Restrict session IPs to corporate VPN</span>
          </label>
        </div>
      </fieldset>
    </div>
  `,
};

/**
 * 4. Density Tiers (Compact vs Loose)
 */
export const DensityTiers: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 38rem;">
      <!-- Compact Fieldset -->
      <fieldset class="fieldset fieldset--compact">
        <legend class="legend">Compact Fieldset (.fieldset--compact)</legend>
        <div class="choices choices--compact">
          <label class="choice choice--sm">
            <input type="checkbox" class="checkbox-input" checked />
            <span>Compact Option 1</span>
          </label>
          <label class="choice choice--sm">
            <input type="checkbox" class="checkbox-input" />
            <span>Compact Option 2</span>
          </label>
        </div>
      </fieldset>

      <hr class="divider" />

      <!-- Loose Fieldset -->
      <fieldset class="fieldset fieldset--loose">
        <legend class="legend">Loose Fieldset (.fieldset--loose)</legend>
        <div class="choices">
          <label class="choice">
            <input type="checkbox" class="checkbox-input" checked />
            <span>Spacious Option 1</span>
          </label>
          <label class="choice">
            <input type="checkbox" class="checkbox-input" />
            <span>Spacious Option 2</span>
          </label>
        </div>
      </fieldset>
    </div>
  `,
};

/**
 * 5. Disabled Fieldset State
 */
export const DisabledState: Story = {
  render: () => `
    <fieldset class="fieldset fieldset--bordered" disabled style="max-inline-size: 38rem;">
      <legend class="legend">Archived Project Settings</legend>
      <p class="fieldset__description">This project has been archived. All fields and choices within this fieldset are locked.</p>
      <div class="choices">
        <label class="choice">
          <input type="checkbox" class="checkbox-input" checked />
          <span>Automated builds enabled</span>
        </label>
        <label class="choice">
          <input type="checkbox" class="checkbox-input" />
          <span>Email maintainers on push</span>
        </label>
      </div>
    </fieldset>
  `,
};
