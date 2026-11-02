import type { Meta, StoryObj } from '@storybook/html';

type Prominence = 'default' | 'strong' | 'subtle' | 'plain';
type Intent = 'neutral' | 'accent' | 'danger';
type Size = 'sm' | 'default' | 'lg';

interface ButtonArgs {
  label: string;
  prominence: Prominence;
  intent: Intent;
  size: Size;
  round?: boolean;
  disabled?: boolean;
  ariaDisabled?: boolean;
  isLink?: boolean;
  hasIcon?: boolean;
}

const PROMINENCES: Prominence[] = ['default', 'strong', 'subtle', 'plain'];
const INTENTS: Intent[] = ['neutral', 'accent', 'danger'];

const INTENT_ICON: Record<Intent, string> = {
  neutral: '',
  accent: '<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>',
  danger: '<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>',
};

const buttonClasses = (prominence: Prominence, intent: Intent, size: Size = 'default', round = false) =>
  [
    'button',
    prominence !== 'default' ? `button--${prominence}` : '',
    intent !== 'neutral' ? `button--${intent}` : '',
    size !== 'default' ? `button--${size}` : '',
    round ? 'button--round' : '',
  ]
    .filter(Boolean)
    .join(' ');

const meta: Meta<ButtonArgs> = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The fundamental action control. Variation is expressed on the library's shared axes (PRINCIPLES §2); each modifier sets exactly one axis, so any combination works without extra classes.

| Axis | Modifiers | Container flag |
| :--- | :--- | :--- |
| Prominence | default (outline), \`--strong\`, \`--subtle\`, \`--plain\` | \`--button-prominence\` |
| Intent | neutral (default), \`--accent\`, \`--danger\` | \`--button-intent\` |
| Size | \`--sm\`, default, \`--lg\` | \`--button-size\` |
| Density | none on the button; a compact container steps it to \`--sm\` | \`--ui-sizing: compact\` |
| Corners | \`--round\` | \`--button-corners\` |

Selected states (\`.is-active\`, \`aria-current\`, a checked input inside a \`<label class="button">\`, \`aria-pressed="true"\`) render as strong.

\`\`\`html
<!-- Primary action: strong prominence + accent intent -->
<button type="button" class="button button--strong button--accent">
  <span>Save Changes</span>
</button>

<!-- Danger: always pair intent with an icon or text (WCAG 1.4.1) -->
<button type="button" class="button button--danger">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
  <span>Delete Item</span>
</button>

<!-- Icon-only: keep an accessible name -->
<button type="button" class="button button--icon">
  <span class="sr-only">Search site</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
</button>
\`\`\`

#### Targets (WCAG 2.5.5 / 2.5.8)
Every size keeps a 48px hit area. \`--sm\` (32px) and buttons stepped down by a compact container extend their hit area invisibly through \`::after\`. A product whose users are on mouse or trackpad may opt into 32px targets with one root token; the library never does this automatically:

\`\`\`css
:root { --spacing-target-min: var(--spacing-target-sm); }
\`\`\`

#### Customisation hooks
They colour the neutral Button at every prominence, set on a Button, a container or the theme; intents keep their own colours: \`--button-color\`, \`--button-color-hover\`, \`--button-color-pressed\`, \`--button-color-border\`, \`--button-on-color\`. Geometry uses the Tier 3 tokens \`--button-padding-*\`, \`--button-min-size\`, \`--button-radius\`, \`--button-inner-gap\`, \`--button-font-*\`, and their \`-sm-\` / \`-lg-\` variants.

#### Keyboard
Native \`<button>\`: Tab to focus, Enter or Space to activate. Links styled as buttons activate with Enter only. \`aria-disabled="true"\` keeps the button focusable for screen readers but blocks activation.
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label' },
    prominence: { control: 'select', options: PROMINENCES, description: 'Prominence axis' },
    intent: { control: 'select', options: INTENTS, description: 'Intent axis' },
    size: { control: 'select', options: ['sm', 'default', 'lg'], description: 'Size axis' },
    round: { control: 'boolean', description: 'Round corners' },
    disabled: { control: 'boolean', description: 'Native disabled' },
    ariaDisabled: { control: 'boolean', description: 'aria-disabled="true"' },
    isLink: { control: 'boolean', description: 'Render as a link' },
    hasIcon: { control: 'boolean', description: 'Trailing icon' },
  },
  render: (args) => {
    const classes = buttonClasses(args.prominence, args.intent, args.size, args.round);
    const content = `
      ${INTENT_ICON[args.intent]}
      <span>${args.label || 'Action'}</span>
      ${args.hasIcon ? '<svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>' : ''}
    `;

    const control = args.isLink
      ? `<a href="#" class="${classes}" role="button" ${args.ariaDisabled ? 'aria-disabled="true"' : ''}>${content}</a>`
      : `<button type="button" class="${classes}" ${args.disabled ? 'disabled' : ''} ${args.ariaDisabled ? 'aria-disabled="true"' : ''}>${content}</button>`;

    return `<div class="sb-demo-stage sb-demo-constrained--md">${control}</div>`;
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

/**
 * Interactive sandbox for every axis.
 */
export const Playground: Story = {
  args: {
    label: 'Save Changes',
    prominence: 'strong',
    intent: 'accent',
    size: 'default',
    round: false,
    disabled: false,
    ariaDisabled: false,
    isLink: false,
    hasIcon: false,
  },
};

/**
 * Prominence × intent. Every pairing comes from two single-axis modifiers.
 */
export const ProminenceAndIntent: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${INTENTS.map(
        (intent) => `
        <div class="sb-demo-label">Intent: ${intent}${intent === 'neutral' ? ' (default)' : ` (.button--${intent})`}</div>
        <div class="cluster">
          ${PROMINENCES.map(
            (prominence) => `
            <button type="button" class="${buttonClasses(prominence, intent)}">
              ${INTENT_ICON[intent]}
              <span>${prominence === 'default' ? 'Outline' : prominence[0].toUpperCase() + prominence.slice(1)}</span>
            </button>`,
          ).join('')}
        </div>`,
      ).join('<hr class="divider" />')}
      <hr class="divider" />
      <div class="sb-demo-label">Placeholder (dashed, for "add" affordances)</div>
      <div class="cluster">
        <button type="button" class="button button--placeholder"><span>+ Add Item</span></button>
      </div>
    </div>
  `,
};

/**
 * Resting, selected, disabled and aria-disabled. Hover, active and focus are
 * exercised by interacting; the focus ring uses the tone colour on filled buttons.
 */
export const States: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${(['default', 'strong', 'subtle'] as Prominence[])
        .map(
          (prominence) => `
        <div class="sb-demo-label">${prominence === 'default' ? 'Outline' : prominence}</div>
        <div class="cluster">
          <button type="button" class="${buttonClasses(prominence, 'accent')}"><span>Resting</span></button>
          <button type="button" class="${buttonClasses(prominence, 'accent')} is-active" aria-pressed="true"><span>Selected</span></button>
          <button type="button" class="${buttonClasses(prominence, 'accent')}" disabled><span>Disabled</span></button>
          <button type="button" class="${buttonClasses(prominence, 'accent')}" aria-disabled="true"><span>Aria Disabled</span></button>
        </div>`,
        )
        .join('')}
      <div class="sb-demo-label">Link styled as a button</div>
      <div class="cluster">
        <a href="#" class="button" role="button"><span>Link Button</span></a>
        <a href="#" class="button" role="button" aria-disabled="true"><span>Link Aria Disabled</span></a>
      </div>
    </div>
  `,
};

/**
 * Size axis. The dashed boxes mark the 48px hit area that small buttons keep.
 */
export const SizesAndTargets: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <div class="sb-demo-label">.button--sm (32px) · default (48px) · .button--lg (64px)</div>
      <div class="cluster">
        <button type="button" class="button button--strong button--accent button--sm"><span>Small</span></button>
        <button type="button" class="button button--strong button--accent"><span>Default</span></button>
        <button type="button" class="button button--strong button--accent button--lg"><span>Large</span></button>
      </div>

      <hr class="divider" />

      <div class="sb-demo-label">Small icon buttons keep a 48px hit area (dashed outline shows it)</div>
      <div class="cluster">
        ${['Search', 'Edit', 'Delete']
          .map(
            (icon) => `
          <span style="display: inline-grid; place-items: center; inline-size: var(--spacing-target); block-size: var(--spacing-target); outline: 1px dashed var(--border-color-muted);">
            <button type="button" class="button button--subtle button--icon button--sm">
              <span class="sr-only">${icon}</span>
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${icon}"/></svg>
            </button>
          </span>`,
          )
          .join('')}
      </div>

      <hr class="divider" />

      <div class="sb-demo-label">Fine-pointer opt-in (style="--spacing-target-min: var(--spacing-target-sm)"): hit area matches the 32px visual</div>
      <div class="cluster" style="--spacing-target-min: var(--spacing-target-sm);">
        <button type="button" class="button button--sm"><span>Small</span></button>
        <button type="button" class="button button--subtle button--icon button--sm">
          <span class="sr-only">Search</span>
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
        </button>
      </div>
    </div>
  `,
};

/**
 * Container flags. A parent sets the axis once; a modifier on an individual
 * button still wins. A compact container steps buttons down to --sm.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <div class="sb-demo-label">Parent: style="--button-prominence: subtle; --button-corners: round;"</div>
      <nav class="cluster" style="--button-prominence: subtle; --button-corners: round;" aria-label="Demo navigation">
        <a href="#" class="button" aria-current="page"><span>Overview</span></a>
        <a href="#" class="button"><span>Analytics</span></a>
        <a href="#" class="button"><span>Reports</span></a>
      </nav>

      <div class="sb-demo-label">Parent: style="--button-intent: danger;" (one child overrides with .button--strong)</div>
      <div class="cluster" style="--button-intent: danger;">
        <button type="button" class="button"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg><span>Remove</span></button>
        <button type="button" class="button button--strong"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg><span>Delete All</span></button>
      </div>

      <div class="sb-demo-label">Parent: style="--ui-sizing: compact;" (density steps controls to --sm; --lg steps to default)</div>
      <div class="cluster" style="--ui-sizing: compact;">
        <button type="button" class="button"><span>Cancel</span></button>
        <button type="button" class="button button--strong button--accent"><span>Save</span></button>
        <button type="button" class="button button--lg"><span>Large</span></button>
      </div>

      <div class="sb-demo-label">Group classes: .buttons-subtle .buttons-sm</div>
      <div class="cluster buttons-subtle buttons-sm">
        <button type="button" class="button"><span>Copy</span></button>
        <button type="button" class="button"><span>Paste</span></button>
        <button type="button" class="button button--danger"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg><span>Delete</span></button>
      </div>
    </div>
  `,
};

/**
 * Icon-only (minimal presentation), round shapes and avatar buttons.
 */
export const IconOnlyAndShapes: Story = {
  render: () => `
    <div class="sb-demo-stage cluster">
      <button type="button" class="button button--icon">
        <span class="sr-only">Search records</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
      </button>
      <button type="button" class="button button--icon button--round button--subtle">
        <span class="sr-only">Notifications</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
      </button>
      <button type="button" class="button button--strong button--accent button--round">
        <span>Get Started</span>
        <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
      </button>
      <button type="button" class="button button--plain button--icon button--round" aria-label="Alex Morgan profile, online"><span class="avatar avatar--sm" aria-hidden="true"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="" /><span class="badge badge--dot badge--success badge--bottom-end" aria-hidden="true"></span></span></button>
    </div>
  `,
};

/**
 * Native checkbox and radio inputs inside `<label class="button">`. Checked
 * renders as strong, with no JavaScript.
 */
export const Toggles: Story = {
  render: () => `
    <div class="sb-demo-stage cluster">
      <label class="button">
        <input type="checkbox" class="sr-only" />
        <svg class="icon icon--off" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
        <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        <span>Notifications</span>
      </label>
      <fieldset class="cluster" style="border: 0; margin: 0; padding: 0;">
        <legend class="fieldset__legend label sr-only">View</legend>
        <label class="button">
          <input type="radio" name="button-toggle-demo" class="sr-only" checked />
          <span>Grid</span>
          <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>
        <label class="button">
          <input type="radio" name="button-toggle-demo" class="sr-only" />
          <span>List</span>
          <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>
      </fieldset>
    </div>
  `,
};

/**
 * Labels collapse to icon-only in narrow containers (@max-3xl:hide-labels).
 * Drag the container edge to resize.
 */
export const ContainerAdaptive: Story = {
  render: () => `
    <div class="sb-demo-stage">
      <div class="container-inline" style="resize: horizontal; overflow: auto; inline-size: 34rem; min-inline-size: 10rem; max-inline-size: 100%; padding: var(--spacing-default); outline: 1px dashed var(--border-color-muted);">
        <div class="cluster @max-3xl:hide-labels">
          <button type="button" class="button">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
            <span class="button__text">Search</span>
          </button>
          <button type="button" class="button button--strong button--accent">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            <span class="button__text">Create</span>
          </button>
          <button type="button" class="button button--subtle">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
            <span class="button__text">Export</span>
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * Light, dark and reversed surfaces. Reversed remaps the semantic roles, so
 * the same markup stays legible with no changes.
 */
export const Surfaces: Story = {
  render: () => {
    const row = PROMINENCES.map(
      (prominence) =>
        `<button type="button" class="${buttonClasses(prominence, 'accent')}"><span>${prominence === 'default' ? 'Outline' : prominence}</span></button>`,
    ).join('');
    return `
      <div class="stack">
        <div class="sb-demo-stage stack" style="color-scheme: light; background: var(--surface); color: var(--foreground);">
          <div class="sb-demo-label">Light</div>
          <div class="cluster">${row}</div>
        </div>
        <div class="sb-demo-stage stack" style="color-scheme: dark; background: var(--surface); color: var(--foreground);">
          <div class="sb-demo-label">Dark</div>
          <div class="cluster">${row}</div>
        </div>
        <div class="sb-demo-stage stack color-palette-inverted" style="background: var(--surface); color: var(--foreground);">
          <div class="sb-demo-label">Reversed (.color-palette-inverted)</div>
          <div class="cluster">${row}</div>
        </div>
      </div>
    `;
  },
};
