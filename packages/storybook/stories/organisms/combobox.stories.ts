import type { Meta, StoryObj } from '@storybook/html';

interface ComboboxArgs {
  label?: string;
  hint?: string;
  placeholder?: string;
  expanded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  invalid?: boolean;
  withIcons?: boolean;
}

const meta: Meta<ComboboxArgs> = {
  title: 'Organisms/Combobox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Combobox Primitive

The **Combobox** primitive is an accessible search-and-select orchestrator combining an editable text field, optional multi-select tags, trailing clear and toggle buttons, and an anchored floating popup listbox.

Engineered with zero-specificity \`:where()\`, local private token manifests (\`--_combobox-*\`), full compatibility with CSS Anchor Positioning and native HTML \`popover\`, and seamless delegation of focus rings (\`:focus-within\`) to eliminate double outlines.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Single-Select Searchable Combobox -->
<div class="field">
  <label for="framework-combo" class="field__label">Primary Framework</label>
  <div class="combobox">
    <div class="combobox__control" style="anchor-name: --combo-framework;">
      <svg class="icon combobox__icon-start" width="18" height="18" aria-hidden="true"><use href="#Search"/></svg>
      <input 
        id="framework-combo"
        type="text" 
        class="combobox__input"
        role="combobox"
        aria-expanded="false"
        aria-autocomplete="list"
        aria-controls="framework-listbox"
        placeholder="Search frameworks..."
      />
      <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
        <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#ChevronDown"/></svg>
      </button>
    </div>

    <ul 
      id="framework-listbox" 
      role="listbox" 
      class="combobox__listbox combobox__listbox--anchored"
      style="position-anchor: --combo-framework;"
      aria-label="Framework suggestions"
    >
      <li role="option" class="combobox__option" aria-selected="true">
        <span>Web Components</span>
        <svg class="icon combobox__check" aria-hidden="true"><use href="#Check"/></svg>
      </li>
      <li role="option" class="combobox__option" aria-selected="false">
        <span>Svelte</span>
      </li>
      <li role="option" class="combobox__option" aria-selected="false">
        <span>React</span>
      </li>
    </ul>
  </div>
</div>

<!-- 2. Multi-Select Combobox with Tags -->
<div class="field">
  <label for="tags-combo" class="field__label">Technologies</label>
  <div class="combobox">
    <div class="combobox__control">
      <div class="combobox__tags">
        <span class="chip">
          <span>TypeScript</span>
          <button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button>
        </span>
        <span class="chip">
          <span>Accessibility</span>
          <button type="button" class="chip__remove" aria-label="Remove Accessibility">×</button>
        </span>
      </div>
      <input 
        id="tags-combo"
        type="text" 
        class="combobox__input"
        role="combobox"
        aria-expanded="false"
        placeholder="Add tag..."
      />
    </div>
  </div>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **1.3.1 Info & Relationships** | **A** | Structured with \`role="combobox"\`, \`role="listbox"\`, and \`role="option"\`. Synchronized via \`aria-controls\`, \`aria-expanded\`, and \`aria-selected\`. |
| **1.4.3 Contrast Minimum** | **AA** | 4.5:1 text contrast on input and options; high-contrast \`--foreground-accent\` (#00875a) highlight on selected options. |
| **2.1.1 Keyboard Navigation** | **A** | Supports ArrowDown / ArrowUp active navigation, Enter selection, Esc to dismiss, and Tab navigation. |
| **2.4.7 Focus Visible** | **AA** | Single, unified 2px high-contrast outline on \`.combobox__control:focus-within\`, avoiding conflicting inner rings. |
| **2.5.5 / 2.5.8 Target Sizing** | **AA/AAA** | Default height is 48px (\`--spacing-target\`). Compact size maintain minimum 32px height. |

---

#### 3. CSS Custom Property Contract Table

| Property | Default Value | Description |
| :--- | :--- | :--- |
| \`--combobox-min-height\` | \`var(--spacing-target, 3rem)\` | Control height matching WCAG touch targets |
| \`--combobox-bg\` | \`var(--surface-card)\` | Control surface background fill |
| \`--combobox-border-color\` | \`var(--border-color-quiet)\` | Resting border stroke |
| \`--combobox-border-width\` | \`var(--border-width-1, 1px)\` | Border stroke thickness |
| \`--combobox-radius\` | \`var(--radius, 0.25rem)\` | Container corner radius |
| \`--combobox-color\` | \`var(--foreground-default)\` | Input and option text color |
| \`--combobox-placeholder-color\` | \`var(--foreground-muted)\` | Placeholder text color |
| \`--combobox-listbox-bg\` | \`var(--surface-card)\` | Floating listbox surface background |
| \`--combobox-listbox-border-color\` | \`var(--panel-border-color)\` | Floating listbox perimeter border |
| \`--combobox-listbox-shadow\` | \`var(--shadow-md)\` | Floating elevation drop shadow |
| \`--combobox-listbox-max-height\` | \`18rem\` | Maximum scrollable listbox height |
| \`--combobox-option-hover-bg\` | \`var(--surface-translucent)\` | Option hover / active descendant background |
| \`--combobox-option-selected-bg\` | \`var(--surface-muted)\` | Selected option background fill |
| \`--combobox-option-selected-color\` | \`var(--foreground-accent)\` | Selected option text highlight color |
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label copy',
      defaultValue: 'Choose Framework',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder copy',
      defaultValue: 'Search or select a framework...',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the floating listbox is open',
      defaultValue: false,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Control sizing variant',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled interaction state',
      defaultValue: false,
    },
    invalid: {
      control: 'boolean',
      description: 'Validation error state',
      defaultValue: false,
    },
    withIcons: {
      control: 'boolean',
      description: 'Show leading search icon and trailing toggle',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<ComboboxArgs>;

function getComboboxClasses(args: ComboboxArgs): string {
  const classes = ['combobox'];
  if (args.size && args.size !== 'md') classes.push(`combobox--${args.size}`);
  if (args.invalid) classes.push('combobox--invalid');
  if (args.disabled) classes.push('combobox--disabled');
  return classes.join(' ');
}

export const Default: Story = {
  args: {
    label: 'Primary Framework',
    placeholder: 'Search or select...',
    expanded: false,
    size: 'md',
    disabled: false,
    invalid: false,
    withIcons: true,
  },
  render: (args) => `
    <div style="max-inline-size: 24rem; padding-block-end: 14rem;">
      <div class="field">
        <label for="demo-combo-input" class="field__label">${args.label}</label>
        <div class="${getComboboxClasses(args)}" ${args.expanded ? 'data-expanded="true"' : ''}>
          <div class="combobox__control" style="anchor-name: --combo-demo;">
            ${args.withIcons ? '<svg class="icon combobox__icon-start" width="18" height="18" aria-hidden="true"><use href="#Search"/></svg>' : ''}
            <input 
              id="demo-combo-input"
              type="text" 
              class="combobox__input"
              role="combobox"
              aria-expanded="${args.expanded ? 'true' : 'false'}"
              aria-autocomplete="list"
              aria-controls="demo-combo-listbox"
              placeholder="${args.placeholder}"
              ${args.disabled ? 'disabled' : ''}
              ${args.invalid ? 'aria-invalid="true"' : ''}
            />
            ${args.withIcons ? `
              <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
                <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#ChevronDown"/></svg>
              </button>
            ` : ''}
          </div>

          <ul 
            id="demo-combo-listbox" 
            role="listbox" 
            class="combobox__listbox combobox__listbox--anchored"
            style="position-anchor: --combo-demo;"
            aria-label="Suggestions"
          >
            <li role="option" class="combobox__option" aria-selected="true">
              <span>Web Components</span>
              <svg class="icon combobox__check" aria-hidden="true"><use href="#Check"/></svg>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Svelte</span>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>React</span>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Vue.js</span>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Solid.js</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
};

export const OpenListbox: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; padding-block-end: 14rem;">
      <div class="field">
        <label for="open-combo-input" class="field__label">Compliance Standard</label>
        <p class="field__hint">Select standard for automated auditing scanner.</p>
        <div class="combobox" data-expanded="true">
          <div class="combobox__control" style="anchor-name: --combo-open;">
            <svg class="icon combobox__icon-start" width="18" height="18" aria-hidden="true"><use href="#Search"/></svg>
            <input 
              id="open-combo-input"
              type="text" 
              class="combobox__input"
              role="combobox"
              aria-expanded="true"
              aria-autocomplete="list"
              aria-controls="open-combo-listbox"
              value="WCAG"
            />
            <button type="button" class="combobox__clear" aria-label="Clear filter">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
            </button>
            <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
          </div>

          <ul 
            id="open-combo-listbox" 
            role="listbox" 
            class="combobox__listbox combobox__listbox--anchored"
            style="position-anchor: --combo-open;"
            aria-label="Standards"
          >
            <li role="option" class="combobox__option" aria-selected="true">
              <div class="combobox__option-main">
                <span class="combobox__option-text">WCAG 2.2 Level AA</span>
                <span class="combobox__option-desc">Recommended baseline standard for public web applications</span>
              </div>
              <svg class="icon combobox__check" aria-hidden="true"><use href="#Check"/></svg>
            </li>
            <li role="option" class="combobox__option is-active" aria-selected="false">
              <div class="combobox__option-main">
                <span class="combobox__option-text">WCAG 2.2 Level AAA</span>
                <span class="combobox__option-desc">Enhanced contrast (7:1) and extended target sizing</span>
              </div>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <div class="combobox__option-main">
                <span class="combobox__option-text">WCAG 2.1 Level AA</span>
                <span class="combobox__option-desc">Legacy compliance threshold</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
};

export const MultiSelectWithTags: Story = {
  render: () => `
    <div style="max-inline-size: 28rem;">
      <div class="field">
        <label for="tags-input" class="field__label">Project Tags</label>
        <p class="field__hint">Selected items render as removable chips.</p>
        <div class="combobox">
          <div class="combobox__control">
            <div class="combobox__tags">
              <span class="chip">
                <span>Accessibility</span>
                <button type="button" class="chip__remove" aria-label="Remove Accessibility">
                  <svg class="icon" width="12" height="12" aria-hidden="true"><use href="#Close"/></svg>
                </button>
              </span>
              <span class="chip">
                <span>Design Tokens</span>
                <button type="button" class="chip__remove" aria-label="Remove Design Tokens">
                  <svg class="icon" width="12" height="12" aria-hidden="true"><use href="#Close"/></svg>
                </button>
              </span>
              <span class="chip">
                <span>Figma Sync</span>
                <button type="button" class="chip__remove" aria-label="Remove Figma Sync">
                  <svg class="icon" width="12" height="12" aria-hidden="true"><use href="#Close"/></svg>
                </button>
              </span>
            </div>
            <input 
              id="tags-input"
              type="text" 
              class="combobox__input"
              role="combobox"
              aria-expanded="false"
              placeholder="Add more..."
            />
            <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const GroupedCategories: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; padding-block-end: 18rem;">
      <div class="field">
        <label for="grouped-input" class="field__label">Design System Catalog</label>
        <div class="combobox" data-expanded="true">
          <div class="combobox__control" style="anchor-name: --combo-grouped;">
            <svg class="icon combobox__icon-start" width="18" height="18" aria-hidden="true"><use href="#Search"/></svg>
            <input 
              id="grouped-input"
              type="text" 
              class="combobox__input"
              role="combobox"
              aria-expanded="true"
              aria-controls="grouped-listbox"
              placeholder="Search components or tokens..."
            />
            <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
          </div>

          <ul 
            id="grouped-listbox" 
            role="listbox" 
            class="combobox__listbox combobox__listbox--anchored"
            style="position-anchor: --combo-grouped;"
          >
            <li role="presentation" class="combobox__group-header">Primitives</li>
            <li role="option" class="combobox__option" aria-selected="true">
              <span>Button Primitive</span>
              <svg class="icon combobox__check" aria-hidden="true"><use href="#Check"/></svg>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Dialog Primitive</span>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Empty State Primitive</span>
            </li>

            <hr class="combobox__separator" role="separator">

            <li role="presentation" class="combobox__group-header">Design Tokens</li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Tier 1: Global Palettes</span>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Tier 2: Semantic Surfaces</span>
            </li>
            <li role="option" class="combobox__option" aria-selected="false">
              <span>Tier 3: Component Tokens</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
};

export const EmptyFilterState: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; padding-block-end: 8rem;">
      <div class="field">
        <label for="empty-combo-input" class="field__label">Assigned Member</label>
        <div class="combobox" data-expanded="true">
          <div class="combobox__control" style="anchor-name: --combo-empty;">
            <svg class="icon combobox__icon-start" width="18" height="18" aria-hidden="true"><use href="#Search"/></svg>
            <input 
              id="empty-combo-input"
              type="text" 
              class="combobox__input"
              role="combobox"
              aria-expanded="true"
              aria-controls="empty-combo-listbox"
              value="xyz-nobody"
            />
            <button type="button" class="combobox__clear" aria-label="Clear filter">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
            </button>
          </div>

          <div 
            id="empty-combo-listbox" 
            class="combobox__listbox combobox__listbox--anchored"
            style="position-anchor: --combo-empty;"
          >
            <div class="combobox__empty">
              <p>No members found matching "xyz-nobody".</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div class="stack gap-lg" style="max-inline-size: 24rem;">
      <div class="field">
        <label for="combo-sm" class="field__label">Compact Size (.combobox--sm / 32px)</label>
        <div class="combobox combobox--sm">
          <div class="combobox__control">
            <input id="combo-sm" type="text" class="combobox__input" placeholder="Compact filter..." />
            <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
              <svg class="icon" width="14" height="14" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="field">
        <label for="combo-md" class="field__label">Standard Size (48px WCAG Touch Target)</label>
        <div class="combobox">
          <div class="combobox__control">
            <input id="combo-md" type="text" class="combobox__input" placeholder="Standard size..." />
            <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="field">
        <label for="combo-lg" class="field__label">Large Size (.combobox--lg / 56px)</label>
        <div class="combobox combobox--lg">
          <div class="combobox__control">
            <input id="combo-lg" type="text" class="combobox__input" placeholder="Large search..." />
            <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const ValidationState: Story = {
  render: () => `
    <div style="max-inline-size: 24rem;">
      <div class="field">
        <label for="invalid-combo" class="field__label">Assigned Lead</label>
        <div class="combobox combobox--invalid">
          <div class="combobox__control">
            <input 
              id="invalid-combo"
              type="text" 
              class="combobox__input"
              role="combobox"
              aria-invalid="true"
              aria-describedby="combo-error"
              value="Unverified User"
            />
            <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
              <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
          </div>
        </div>
        <p id="combo-error" class="field__error" role="alert">
          Please select a verified organization member from the directory.
        </p>
      </div>
    </div>
  `,
};
