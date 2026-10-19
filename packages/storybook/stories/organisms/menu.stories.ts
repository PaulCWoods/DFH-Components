import type { Meta, StoryObj } from '@storybook/html';

interface MenuArgs {
  compact?: boolean;
  translucent?: boolean;
  ruled?: boolean;
  plain?: boolean;
}

const meta: Meta<MenuArgs> = {
  title: 'Organisms/Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Menu Primitive

The **Menu** primitive is an accessible action list and dropdown context menu foundation.
Engineered as a first-class **companion and ergonomic shortcut** to the Card + Button-Group combination, developers familiar with Card and Button-Group will feel immediately at home.

Built with zero-specificity \`:where()\`, local private variables (\`--_menu-*\`), native logical properties, and full compatibility with native HTML \`[popover]\` and **CSS Anchor Positioning**.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Standard Action Menu -->
<menu class="menu" aria-label="Document options">
  <li role="none">
    <button type="button" class="menu__item" role="menuitem">
      <svg class="icon" aria-hidden="true"><use href="#Duplicate"/></svg>
      <span>Duplicate File</span>
      <kbd class="kbd">⌘D</kbd>
    </button>
  </li>
  <li role="none">
    <button type="button" class="menu__item" role="menuitem">
      <svg class="icon" aria-hidden="true"><use href="#Download"/></svg>
      <span>Export JSON</span>
      <kbd class="kbd">⇧⌘E</kbd>
    </button>
  </li>
  <hr class="menu__separator">
  <li role="none">
    <button type="button" class="menu__item menu__item--destructive" role="menuitem">
      <svg class="icon" aria-hidden="true"><use href="#Delete"/></svg>
      <span>Delete Item</span>
      <kbd class="kbd">⌫</kbd>
    </button>
  </li>
</menu>

<!-- 2. Anchored Dropdown Menu (Button Trigger + Popover + Menu) -->
<button 
  type="button" 
  class="button button--secondary" 
  popovertarget="actions-dropdown" 
  style="anchor-name: --menu-trigger;"
  aria-haspopup="menu"
>
  <span>Options</span>
  <svg class="icon" aria-hidden="true"><use href="#ChevronDown"/></svg>
</button>

<div 
  id="actions-dropdown" 
  popover 
  class="popover popover--anchored" 
  style="position-anchor: --menu-trigger;"
>
  <menu class="menu menu--translucent" aria-label="Quick actions">
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" aria-hidden="true"><use href="#Edit"/></svg>
        <span>Rename</span>
      </button>
    </li>
    <li role="none">
      <button type="button" class="menu__item" role="menuitem">
        <svg class="icon" aria-hidden="true"><use href="#Share"/></svg>
        <span>Share Link</span>
      </button>
    </li>
  </menu>
</div>

<!-- 3. Button-Group Companion Compatibility (using .button inside .menu) -->
<menu class="menu menu--compact">
  <button type="button" class="button">
    <svg class="icon" aria-hidden="true"><use href="#Copy"/></svg>
    <span>Copy Path</span>
    <kbd class="kbd">⌥⌘C</kbd>
  </button>
</menu>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 / 2.5.8 Target Size** | **AA/AAA** | Default menu items preserve standard 36px–40px touch targets; compact desktop menus preserve 32px targets. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | High-contrast 2px focus ring with inset offset (\`outline-offset: -2px\`) ensures indicators are never clipped by overflow boundaries. |
| **1.4.3 Contrast Minimum** | **AA** | Menu text and icons strictly adhere to 4.5:1 contrast against surface backgrounds in both light and dark modes. |
| **Keyboard Accessibility** | **A** | Supports both standard sequential Tab navigation (Action Lists) and W3C APG roving tabindex arrow-key navigation (\`role="menu"\`). |

---

#### 3. CSS Custom Property Contract Table

| Property | Default Value | Description |
| :--- | :--- | :--- |
| \`--menu-bg\` | \`var(--surface-card)\` | Menu container surface background |
| \`--menu-border-color\` | \`var(--panel-border-color)\` | Menu border color |
| \`--menu-border-width\` | \`var(--panel-border-width, 1px)\` | Menu border thickness |
| \`--menu-radius\` | \`var(--radius, 0.375rem)\` | Corner radius of the menu container |
| \`--menu-shadow\` | \`var(--shadow-md)\` | Floating elevation shadow |
| \`--menu-padding\` | \`var(--spacing-4, 0.25rem)\` | Internal gutter around items |
| \`--menu-min-width\` | \`14rem\` | Minimum inline size for comfortable text scanning |
| \`--menu-max-width\` | \`24rem\` | Maximum inline size constraint |
| \`--menu-divider-color\` | \`var(--border-color-quiet)\` | Hairline separator color |
| \`--menu-item-padding-block\` | \`var(--spacing-8, 0.5rem)\` | Vertical padding of individual items |
| \`--menu-item-padding-inline\` | \`var(--spacing-12, 0.75rem)\` | Horizontal padding of individual items |
| \`--menu-item-radius\` | \`var(--radius-sm, 0.25rem)\` | Corner radius of item hover states |
        `,
      },
    },
  },
  argTypes: {
    compact: {
      control: 'boolean',
      description: 'Compact density with tighter vertical padding and font size',
    },
    translucent: {
      control: 'boolean',
      description: 'Frosted glass translucent background with backdrop blur',
    },
    ruled: {
      control: 'boolean',
      description: 'Hairline separators between items using CSS rule',
    },
    plain: {
      control: 'boolean',
      description: 'Borderless and shadowless transparent menu for embedded layouts',
    },
  },
};

export default meta;
type Story = StoryObj<MenuArgs>;

function getMenuClasses(args: MenuArgs): string {
  const classes = ['menu'];
  if (args.compact) classes.push('menu--compact');
  if (args.translucent) classes.push('menu--translucent');
  if (args.ruled) classes.push('menu--ruled');
  if (args.plain) classes.push('menu--plain');
  return classes.join(' ');
}

export const Default: Story = {
  args: {
    compact: false,
    translucent: false,
    ruled: false,
    plain: false,
  },
  render: (args) => `
    <div style="max-inline-size: 20rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <menu class="${getMenuClasses(args)}" aria-label="File operations">
        <header class="menu__heading">File Operations</header>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Duplicate"/></svg>
            <span class="menu__text">Duplicate File</span>
            <kbd class="kbd">⌘D</kbd>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Download"/></svg>
            <span class="menu__text">Export Manifest</span>
            <kbd class="kbd">⇧⌘E</kbd>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Share"/></svg>
            <span class="menu__text">Share Link</span>
          </button>
        </li>

        <hr class="menu__separator">

        <header class="menu__heading">Danger Zone</header>
        <li role="none">
          <button type="button" class="menu__item menu__item--destructive" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Delete"/></svg>
            <span class="menu__text">Delete File</span>
            <kbd class="kbd">⌫</kbd>
          </button>
        </li>
      </menu>
    </div>
  `,
};

export const AnchoredDropdown: Story = {
  render: () => `
    <div style="min-block-size: 20rem; padding: var(--spacing-32, 2rem); display: flex; align-items: flex-start; justify-content: center;">
      <button 
        type="button" 
        class="button button--secondary" 
        popovertarget="demo-dropdown-menu" 
        style="anchor-name: --demo-dropdown-anchor;"
        aria-haspopup="menu"
      >
        <span>Actions</span>
        <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#ChevronDown"/></svg>
      </button>

      <div 
        id="demo-dropdown-menu" 
        popover 
        class="popover popover--anchored" 
        style="position-anchor: --demo-dropdown-anchor; min-inline-size: 16rem;"
      >
        <menu class="menu menu--translucent" aria-label="Action options">
          <header class="menu__heading micro-heading">Document</header>
          <li role="none">
            <button type="button" class="menu__item" role="menuitem">
              <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Edit"/></svg>
              <span class="menu__text">Edit Metadata</span>
              <kbd class="kbd">⌘E</kbd>
            </button>
          </li>
          <li role="none">
            <button type="button" class="menu__item" role="menuitem">
              <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Duplicate"/></svg>
              <span class="menu__text">Make a Copy</span>
              <kbd class="kbd">⌘D</kbd>
            </button>
          </li>
          <li role="none">
            <button type="button" class="menu__item" role="menuitem" disabled>
              <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Lock"/></svg>
              <span class="menu__text">Lock Editing</span>
            </button>
          </li>
          <hr class="menu__separator">
          <li role="none">
            <button type="button" class="menu__item menu__item--destructive" role="menuitem">
              <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Delete"/></svg>
              <span class="menu__text">Move to Trash</span>
              <kbd class="kbd">⌫</kbd>
            </button>
          </li>
        </menu>
      </div>
    </div>
  `,
};

export const CompactDensity: Story = {
  render: () => `
    <div style="max-inline-size: 16rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface);">
      <menu class="menu menu--compact" aria-label="Editor quick menu">
        <header class="menu__heading">Editor Tools</header>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="16" height="16"><use href="#Code"/></svg>
            <span class="menu__text">Format Code</span>
            <kbd class="kbd">⇧⌥F</kbd>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="16" height="16"><use href="#Search"/></svg>
            <span class="menu__text">Find & Replace</span>
            <kbd class="kbd">⌘F</kbd>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="16" height="16"><use href="#Settings"/></svg>
            <span class="menu__text">Preferences</span>
            <kbd class="kbd">⌘,</kbd>
          </button>
        </li>
      </menu>
    </div>
  `,
};

export const RuledSeparators: Story = {
  render: () => `
    <div style="max-inline-size: 18rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface);">
      <menu class="menu menu--ruled" aria-label="Account actions">
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#User"/></svg>
            <span class="menu__text">View Profile</span>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Bell"/></svg>
            <span class="menu__text">Notifications</span>
            <span class="badge badge--sm badge--accent"><span>3</span></span>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Settings"/></svg>
            <span class="menu__text">Settings</span>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item menu__item--destructive" role="menuitem">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Close"/></svg>
            <span class="menu__text">Sign Out</span>
          </button>
        </li>
      </menu>
    </div>
  `,
};

export const CheckableItems: Story = {
  render: () => `
    <div style="max-inline-size: 18rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface);">
      <menu class="menu" aria-label="View settings">
        <header class="menu__heading micro-heading">View Options</header>
        <li role="none">
          <button type="button" class="menu__item" role="menuitemcheckbox" aria-checked="true">
            <svg class="icon icon--check text-accent" width="18" height="18" aria-hidden="true"><use href="#Check"/></svg>
            <span class="menu__text">Show Line Numbers</span>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitemcheckbox" aria-checked="true">
            <svg class="icon icon--check text-accent" width="18" height="18" aria-hidden="true"><use href="#Check"/></svg>
            <span class="menu__text">Word Wrap</span>
          </button>
        </li>
        <li role="none">
          <button type="button" class="menu__item" role="menuitemcheckbox" aria-checked="false">
            <svg class="icon icon--check text-accent" width="18" height="18" aria-hidden="true"><use href="#Check"/></svg>
            <span class="menu__text">Minimap</span>
          </button>
        </li>
      </menu>
    </div>
  `,
};

export const ButtonCompanionCompatibility: Story = {
  render: () => `
    <div style="max-inline-size: 18rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface);">
      <!-- Demonstrates developers using standard .button inside .menu directly -->
      <menu class="menu" aria-label="Companion menu">
        <header class="menu__heading">Card + Button Group Companion</header>
        <button type="button" class="button">
          <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Duplicate"/></svg>
          <span>Clone Branch</span>
          <kbd class="kbd">⌘B</kbd>
        </button>
        <button type="button" class="button">
          <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Download"/></svg>
          <span>Fetch Origin</span>
        </button>
        <hr class="menu__separator">
        <button type="button" class="button button--destructive">
          <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Delete"/></svg>
          <span>Discard Changes</span>
        </button>
      </menu>
    </div>
  `,
};
