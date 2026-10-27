import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Tabbed Content',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Tabbed Content Primitive (.tabbed-content / .tabs)

Keyboard-accessible navigation and tabbed interface organism orchestrating the layout relationship between tab lists (\`.tab-list\`) and content panels (\`.tab-panel\`). Features CSS Anchor Positioning selection indicator transitions, roving \`tabindex\` keyboard mechanics, segmented pill buttons, and vertical drawer navigation.

---

### Canonical Semantic Markup Signatures

#### 1. Interactive WAI-ARIA Tablist Pattern
\`\`\`html
<div class="tabs">
  <div class="tab-list" role="tablist" aria-label="Account Settings">
    <button 
      type="button" 
      id="tab-account" 
      class="tab" 
      role="tab" 
      aria-selected="true" 
      aria-controls="panel-account" 
      tabindex="0"
    >
      <span class="tab__text">Account</span>
    </button>
    <button 
      type="button" 
      id="tab-security" 
      class="tab" 
      role="tab" 
      aria-selected="false" 
      aria-controls="panel-security" 
      tabindex="-1"
    >
      <span class="tab__text">Security</span>
      <span class="badge badge--sm badge--accent"><span>2</span></span>
    </button>
  </div>

  <div id="panel-account" class="tabs__panel" role="tabpanel" tabindex="0" aria-labelledby="tab-account">
    <p>Account settings content.</p>
  </div>
  <div id="panel-security" class="tabs__panel" role="tabpanel" tabindex="0" aria-labelledby="tab-security" hidden>
    <p>Security preferences content.</p>
  </div>
</div>
\`\`\`

#### 2. Semantic URL Navigation Tabs
\`\`\`html
<nav class="tabs" aria-label="Repository sections">
  <ul class="tab-list">
    <li>
      <a href="/repo/code" class="tab" aria-current="page">
        <span class="tab__text">Code</span>
      </a>
    </li>
    <li>
      <a href="/repo/issues" class="tab">
        <span class="tab__text">Issues</span>
        <span class="badge badge--subtle"><span>14</span></span>
      </a>
    </li>
  </ul>
</nav>
\`\`\`

#### 3. Plain Horizontal Navigation Tabs (.tabs.tabs-plain)
\`\`\`html
<nav class="tabs tabs-plain" aria-label="Main Navigation">
  <ul class="tab-list">
    <li><a href="/articles" class="tab" aria-current="page"><span class="tab__text">Articles</span></a></li>
    <li><a href="/components" class="tab"><span class="tab__text">Components</span></a></li>
    <li><a href="/tokens" class="tab"><span class="tab__text">Tokens</span></a></li>
  </ul>
</nav>
\`\`\`

#### 4. Icon-Only Tabs (.tabs.tabs-button.tabs-icon or .tab--icon)
\`\`\`html
<div class="tabs tabs-button tabs-icon">
  <div class="tab-list" role="tablist" aria-label="Editor Modes">
    <button type="button" role="tab" class="tab" aria-selected="true" tabindex="0">
      <span class="tab__text">Code View</span>
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
    </button>
    <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1">
      <span class="tab__text">Preview</span>
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#View"/></svg>
    </button>
    <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1">
      <span class="tab__text">Settings</span>
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
    </button>
  </div>
</div>
\`\`\`

#### 5. Floating Glassmorphic Tab Bar (.tabs.tabs-floating)
\`\`\`html
<nav class="tabs tabs-floating" aria-label="Floating Navigation">
  <ul class="tab-list">
    <li><a href="#overview" class="tab" aria-current="page"><span class="tab__text">Overview</span></a></li>
    <li><a href="#analytics" class="tab"><span class="tab__text">Analytics</span></a></li>
    <li><a href="#reports" class="tab"><span class="tab__text">Reports</span></a></li>
  </ul>
</nav>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **2.1.1 Keyboard** | A | **Pass** | WAI-ARIA roving tabindex (Left/Right or Up/Down arrows navigate tabs, Home/End jump to ends, Enter/Space activate). |
| **2.4.7 Focus Visible** | AA | **Pass** | High-contrast 2px focus ring with 2px offset applied on \`:focus-visible\` on both tabs and panel containers. |
| **2.4.13 Focus Appearance** | AAA | **Pass** | 3:1 contrast focus outline ensures immediate visual clarity for assistive keyboard users. |
| **2.5.5 Target Size (Enhanced)** | AAA (48×48px) | **Pass** | Standard tabs enforce \`min-block-size: 3rem\` (48px) and touch targets conforming to AAA. |
| **2.5.8 Target Size (Minimum)** | AA (24×24px) | **Pass** | Compact \`.tabs-sm\` maintains \`min-block-size: 2rem\` (32px), comfortably exceeding AA minimums. |
| **4.1.2 Name, Role, Value** | A | **Pass** | \`role="tablist"\`, \`role="tab"\`, \`aria-selected\`, \`aria-controls\`, and \`role="tabpanel"\` create the complete accessible tree. |
| **2.3.3 Reduced Motion** | AAA | **Pass** | \`@media (prefers-reduced-motion: reduce)\` instantly turns off CSS anchor indicator movement transitions. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--tabs-block-gap\` | \`var(--spacing-unit, 1rem)\` | \`1rem\` | Spacing gap between tablist bar and tabpanel content |
| \`--tabs-indicator-color\` | \`var(--foreground, currentColor)\` | \`currentColor\` | Selection line or active pill background color |
| \`--tabs-indicator-width\` | \`var(--border-width-2, 2px)\` | \`2px\` | Thickness of the active selection indicator line |
| \`--tabs-list-gap\` | \`var(--spacing-breathe, 1rem)\` | \`1rem\` | Horizontal space between adjacent tab items |
| \`--tabs-transition\` | \`var(--duration-sm, 200ms)\` | \`200ms\` | Duration of anchor-positioned indicator interpolation |
| \`--tab-min-size\` | \`var(--spacing-target, 3rem)\` | \`3rem\` (48px) | Minimum touch target height and width for accessibility |
| \`--tab-button-radius\` | \`var(--button-radius, 0.25rem)\` | \`0.25rem\` | Corner rounding applied in \`.tabs-button\` mode |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Interactive WAI-ARIA tab navigation helper
 */
function createInteractiveTabs(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html.trim();
  const root = (container.firstElementChild as HTMLElement) || container;

  const tablists = root.matches('[role="tablist"]')
    ? [root]
    : Array.from(root.querySelectorAll<HTMLElement>('[role="tablist"]'));

  tablists.forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll<HTMLElement>('[role="tab"]'));
    const isVertical = tablist.closest('.tabs-vertical') !== null;

    const selectTab = (tabToSelect: HTMLElement, focus = true) => {
      tabs.forEach((tab) => {
        const isSelected = tab === tabToSelect;
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');

        const panelId = tab.getAttribute('aria-controls');
        if (panelId) {
          const panel = root.querySelector<HTMLElement>(`#${panelId}`);
          if (panel) {
            if (isSelected) {
              panel.removeAttribute('hidden');
            } else {
              panel.setAttribute('hidden', '');
            }
          }
        }
      });

      if (focus) {
        tabToSelect.focus();
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        selectTab(tab);
      });
    });

    tablist.addEventListener('keydown', (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      const currentIndex = tabs.indexOf(activeElement);
      if (currentIndex === -1) return;

      let targetIndex = -1;

      if (isVertical) {
        if (e.key === 'ArrowDown') {
          targetIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowUp') {
          targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }
      } else {
        if (e.key === 'ArrowRight') {
          targetIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }
      }

      if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex !== -1) {
        e.preventDefault();
        selectTab(tabs[targetIndex], true);
      }
    });
  });

  const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('nav.tabs a.tab'));
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const list = link.closest('.tab-list, .tab-list');
      if (list) {
        list.querySelectorAll('a.tab').forEach((other) => other.removeAttribute('aria-current'));
      }
      link.setAttribute('aria-current', 'page');
    });
  });

  return root;
}

/**
 * 1. Playground
 * Interactive sandbox with controls for variant, orientation, size, and items.
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    orientation: 'horizontal',
    size: 'standard',
    showBadges: true,
  },
  argTypes: {
    variant: {
      name: 'Tabs Variant',
      control: { type: 'select' },
      options: ['default', 'simple', 'buttons', 'buttons-round'],
      description: 'Cosmetic style of the tab controls and indicator.',
    },
    orientation: {
      name: 'Orientation',
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      description: 'Horizontal bar or vertical drawer list.',
    },
    size: {
      name: 'Size Tier',
      control: { type: 'inline-radio' },
      options: ['standard', 'sm'],
      description: 'Standard 48px AAA touch targets vs compact 32px AA.',
    },
    showBadges: {
      name: 'Show Badges',
      control: { type: 'boolean' },
      description: 'Includes count badges inside tab headers.',
    },
  },
  render: (args) => {
    const classes = [
      'tabs',
      args.variant === 'plain' || args.variant === 'simple' ? 'tabs-plain' : '',
      args.variant === 'buttons' ? 'tabs-button' : '',
      args.variant === 'buttons-round' ? 'tabs-button tabs-round' : '',
      args.orientation === 'vertical' ? 'tabs-vertical' : '',
      args.size === 'sm' ? 'tabs-sm' : '',
    ].filter(Boolean).join(' ');

    return createInteractiveTabs(`
      <div style="max-inline-size: 42rem; margin-inline: auto;">
        <div class="${classes}">
          <div class="tab-list" role="tablist" aria-label="Interactive Demo">
            <button type="button" role="tab" id="pg-tab-1" class="tab" aria-selected="true" aria-controls="pg-panel-1" tabindex="0">
              <span class="tab__text">Overview</span>
            </button>
            <button type="button" role="tab" id="pg-tab-2" class="tab" aria-selected="false" aria-controls="pg-panel-2" tabindex="-1">
              <span class="tab__text">Analytics</span>
              ${args.showBadges ? '<span class="badge badge--sm badge--accent"><span>New</span></span>' : ''}
            </button>
            <button type="button" role="tab" id="pg-tab-3" class="tab" aria-selected="false" aria-controls="pg-panel-3" tabindex="-1">
              <span class="tab__text">Settings</span>
              ${args.showBadges ? '<span class="badge badge--sm"><span>3</span></span>' : ''}
            </button>
          </div>

          <div id="pg-panel-1" role="tabpanel" class="tabs__panel" aria-labelledby="pg-tab-1" tabindex="0" style="padding-block: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Overview Dashboard</h4>
            <p style="margin: 0; color: var(--foreground-muted);">System operational metrics and health status report.</p>
          </div>

          <div id="pg-panel-2" role="tabpanel" class="tabs__panel" aria-labelledby="pg-tab-2" tabindex="0" hidden style="padding-block: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Analytics Metrics</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Detailed conversion and traffic funnel charts.</p>
          </div>

          <div id="pg-panel-3" role="tabpanel" class="tabs__panel" aria-labelledby="pg-tab-3" tabindex="0" hidden style="padding-block: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Account Settings</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Notification frequency and security credentials.</p>
          </div>
        </div>
      </div>
    `);
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting the ARIA relationships and CSS Anchor Positioning.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> The container (<code>.tabs</code>) wraps a tablist (<code>.tab-list[role="tablist"]</code>) declaring <code>anchor-scope: --tab-selected</code>. Active tabs declare <code>anchor-name: --tab-selected</code> which tethers the animated indicator pseudo-element (<code>::before</code>).
        </p>
      </div>

      <div class="tabs" style="border: 2px dashed var(--color-accent); padding: var(--spacing-16); border-radius: var(--radius-md);">
        <div class="tab-list" role="tablist" aria-label="Anatomy Breakdown" style="border-block-end: 2px dashed var(--border-color); padding-block-end: var(--spacing-4);">
          <button type="button" role="tab" id="anat-tab-1" class="tab" aria-selected="true" aria-controls="anat-panel-1" tabindex="0" style="outline: 1px dashed var(--color-success);">
            <span class="tab__text">button.tab[aria-selected="true"]</span>
          </button>
          <button type="button" role="tab" id="anat-tab-2" class="tab" aria-selected="false" aria-controls="anat-panel-2" tabindex="-1">
            <span class="tab__text">button.tab[aria-selected="false"]</span>
            <span class="badge badge--sm"><span>span.badge</span></span>
          </button>
        </div>

        <div id="anat-panel-1" role="tabpanel" class="tabs__panel" aria-labelledby="anat-tab-1" tabindex="0" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-sm); margin-block-start: var(--spacing-16);">
          <span class="badge badge--sm" style="display: inline-block; margin-block-end: var(--spacing-8);">
            <span>div.tabs__panel[role="tabpanel"][tabindex="0"]</span>
          </span>
          <p style="margin: 0; color: var(--foreground-muted);">
            Tabpanels have tabindex="0" so keyboard users can tab directly from the tablist into the content scroll container.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing underline, button pills, round pills, and vertical orientation.
 */
export const Variants: Story = {
  render: () =>
    createInteractiveTabs(`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 46rem;">
      
      <!-- Variant 1: Default Underline Tabs -->
      <section>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Default Underline Indicator (.tabs)
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist" aria-label="Underline Tabs">
            <button type="button" role="tab" id="var1-1" class="tab" aria-selected="true" aria-controls="var1-p1" tabindex="0">
              <span class="tab__text">Overview</span>
            </button>
            <button type="button" role="tab" id="var1-2" class="tab" aria-selected="false" aria-controls="var1-p2" tabindex="-1">
              <span class="tab__text">Features</span>
            </button>
            <button type="button" role="tab" id="var1-3" class="tab" aria-selected="false" aria-controls="var1-p3" tabindex="-1">
              <span class="tab__text">Documentation</span>
            </button>
          </div>
          <div id="var1-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var1-1" tabindex="0" style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Smooth underline slides beneath active items using CSS anchor positioning.</p>
          </div>
          <div id="var1-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var1-2" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Feature list content.</p>
          </div>
          <div id="var1-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var1-3" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Documentation guides.</p>
          </div>
        </div>
      </section>

      <!-- Variant 2: Button Pills -->
      <section>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Segmented Button Style Tabs (.tabs.tabs-button)
        </span>
        <div class="tabs tabs-button">
          <div class="tab-list" role="tablist" aria-label="Button Tabs">
            <button type="button" role="tab" id="var2-1" class="tab" aria-selected="true" aria-controls="var2-p1" tabindex="0">
              <span class="tab__text">Daily View</span>
            </button>
            <button type="button" role="tab" id="var2-2" class="tab" aria-selected="false" aria-controls="var2-p2" tabindex="-1">
              <span class="tab__text">Weekly</span>
            </button>
            <button type="button" role="tab" id="var2-3" class="tab" aria-selected="false" aria-controls="var2-p3" tabindex="-1">
              <span class="tab__text">Monthly</span>
            </button>
          </div>
          <div id="var2-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var2-1" tabindex="0" style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Button pills create tactile segmented control aesthetics.</p>
          </div>
          <div id="var2-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var2-2" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Weekly metrics display.</p>
          </div>
          <div id="var2-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var2-3" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Monthly rollup review.</p>
          </div>
        </div>
      </section>

      <!-- Variant 3: Round Button Pills -->
      <section>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Fully Rounded Capsule Tabs (.tabs.tabs-button.tabs-round)
        </span>
        <div class="tabs tabs-button tabs-round">
          <div class="tab-list" role="tablist" aria-label="Round Tabs">
            <button type="button" role="tab" id="var3-1" class="tab" aria-selected="true" aria-controls="var3-p1" tabindex="0">
              <span class="tab__text">Active</span>
            </button>
            <button type="button" role="tab" id="var3-2" class="tab" aria-selected="false" aria-controls="var3-p2" tabindex="-1">
              <span class="tab__text">Pending</span>
            </button>
            <button type="button" role="tab" id="var3-3" class="tab" aria-selected="false" aria-controls="var3-p3" tabindex="-1">
              <span class="tab__text">Completed</span>
            </button>
          </div>
          <div id="var3-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var3-1" tabindex="0" style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Capsule styling adheres to modern mobile navigation paradigms.</p>
          </div>
          <div id="var3-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var3-2" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Pending review pipeline.</p>
          </div>
          <div id="var3-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var3-3" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Archived completions.</p>
          </div>
        </div>
      </section>

      <!-- Variant 4: Vertical Drawer Tabs -->
      <section>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          4. Vertical Drawer Tabs (.tabs.tabs-vertical)
        </span>
        <div class="tabs tabs-vertical">
          <div class="tab-list" role="tablist" aria-label="Vertical Settings">
            <button type="button" role="tab" id="var4-1" class="tab" aria-selected="true" aria-controls="var4-p1" tabindex="0">
              <span class="tab__text">Account</span>
            </button>
            <button type="button" role="tab" id="var4-2" class="tab" aria-selected="false" aria-controls="var4-p2" tabindex="-1">
              <span class="tab__text">Security</span>
            </button>
            <button type="button" role="tab" id="var4-3" class="tab" aria-selected="false" aria-controls="var4-p3" tabindex="-1">
              <span class="tab__text">Notifications</span>
            </button>
          </div>
          <div id="var4-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var4-1" tabindex="0" style="padding-inline-start: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Account Details</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Vertical layout places indicator on the trailing border edge.</p>
          </div>
          <div id="var4-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var4-2" tabindex="0" hidden style="padding-inline-start: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Security & Two-Factor</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Manage passkeys and access tokens.</p>
          </div>
          <div id="var4-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var4-3" tabindex="0" hidden style="padding-inline-start: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Notification Digest</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Email alerts and push notifications.</p>
          </div>
        </div>
      </section>

      <!-- Variant 4b: Reversed Vertical Tabs (Tabs on Right) -->
      <section>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          4b. Reversed Vertical Tabs (.tabs.tabs-vertical.tabs-on-right)
        </span>
        <div class="tabs tabs-vertical tabs-on-right">
          <div class="tab-list" role="tablist" aria-label="Vertical Settings Reversed">
            <button type="button" role="tab" id="var4b-1" class="tab" aria-selected="true" aria-controls="var4b-p1" tabindex="0">
              <span class="tab__text">Account</span>
            </button>
            <button type="button" role="tab" id="var4b-2" class="tab" aria-selected="false" aria-controls="var4b-p2" tabindex="-1">
              <span class="tab__text">Security</span>
            </button>
            <button type="button" role="tab" id="var4b-3" class="tab" aria-selected="false" aria-controls="var4b-p3" tabindex="-1">
              <span class="tab__text">Notifications</span>
            </button>
          </div>
          <div id="var4b-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var4b-1" tabindex="0" style="padding-inline-end: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Account Details</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Reversed layout places the tab list on the right and reverses the indicator line.</p>
          </div>
          <div id="var4b-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var4b-2" tabindex="0" hidden style="padding-inline-end: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Security & Two-Factor</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Manage passkeys and access tokens.</p>
          </div>
          <div id="var4b-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var4b-3" tabindex="0" hidden style="padding-inline-end: var(--spacing-16);">
            <h4 style="margin: 0 0 var(--spacing-8);">Notification Digest</h4>
            <p style="margin: 0; color: var(--foreground-muted);">Email alerts and push notifications.</p>
          </div>
        </div>
      </section>

      <!-- Variant 5: Plain Navigation Tabs -->
      <section>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          5. Plain Tabs for Navigation Bars (.tabs.tabs-plain)
        </span>
        <nav class="tabs tabs-plain" aria-label="Plain Navbar Tabs">
          <ul class="tab-list">
            <li>
              <a href="#var5-1" class="tab" aria-current="page">
                <span class="tab__text">Articles</span>
              </a>
            </li>
            <li>
              <a href="#var5-2" class="tab">
                <span class="tab__text">Components</span>
              </a>
            </li>
            <li>
              <a href="#var5-3" class="tab">
                <span class="tab__text">Tokens</span>
              </a>
            </li>
          </ul>
        </nav>
      </section>

      <!-- Variant 6: Icon-Only Segmented Tabs -->
      <section>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          6. Icon-Only Segmented Tabs (.tabs.tabs-button.tabs-round.tabs-icon)
        </span>
        <div class="tabs tabs-button tabs-round tabs-icon">
          <div class="tab-list" role="tablist" aria-label="Editor View Modes">
            <button type="button" role="tab" id="var6-1" class="tab" aria-selected="true" aria-controls="var6-p1" tabindex="0">
              <span class="tab__text">Code View</span>
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
            </button>
            <button type="button" role="tab" id="var6-2" class="tab" aria-selected="false" aria-controls="var6-p2" tabindex="-1">
              <span class="tab__text">Split Design</span>
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
            </button>
            <button type="button" role="tab" id="var6-3" class="tab" aria-selected="false" aria-controls="var6-p3" tabindex="-1">
              <span class="tab__text">Live Preview</span>
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#View"/></svg>
            </button>
            <button type="button" role="tab" id="var6-4" class="tab" aria-selected="false" aria-controls="var6-p4" tabindex="-1">
              <span class="tab__text">Settings</span>
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
            </button>
          </div>
          <div id="var6-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var6-1" tabindex="0" style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Code-only editor buffer with syntax highlighting.</p>
          </div>
          <div id="var6-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var6-2" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Split design view with visual drag-and-drop.</p>
          </div>
          <div id="var6-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var6-3" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Full-bleed interactive preview canvas.</p>
          </div>
          <div id="var6-p4" role="tabpanel" class="tabs__panel" aria-labelledby="var6-4" tabindex="0" hidden style="padding-block: var(--spacing-12);">
            <p style="margin: 0;">Editor preferences and lint configuration.</p>
          </div>
        </div>
      </section>

      <!-- Variant 7: Floating Glassmorphic Tab Bar -->
      <section style="position: relative; padding: var(--spacing-24); background: color-mix(in srgb, var(--surface, Canvas) 70%, var(--foreground, CanvasText) 10%); border-radius: var(--radius-lg, 0.75rem); overflow: hidden;">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-16); text-align: center;">
          7. Floating Glassmorphic Tab Bar (.tabs.tabs-floating)
        </span>
        <div class="tabs tabs-floating">
          <div class="tab-list" role="tablist" aria-label="Floating Controls">
            <button type="button" role="tab" id="var7-1" class="tab" aria-selected="true" aria-controls="var7-p1" tabindex="0">
              <span class="tab__text">Overview</span>
            </button>
            <button type="button" role="tab" id="var7-2" class="tab" aria-selected="false" aria-controls="var7-p2" tabindex="-1">
              <span class="tab__text">Analytics</span>
            </button>
            <button type="button" role="tab" id="var7-3" class="tab" aria-selected="false" aria-controls="var7-p3" tabindex="-1">
              <span class="tab__text">Activity</span>
            </button>
            <button type="button" role="tab" id="var7-4" class="tab" aria-selected="false" aria-controls="var7-p4" tabindex="-1">
              <span class="tab__text">Reports</span>
            </button>
          </div>
          <div id="var7-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var7-1" tabindex="0" style="padding-block: var(--spacing-16); text-align: center;">
            <p style="margin: 0;">Floating pill bar with frosted glass backdrop blur and anchor-sliding pill highlight.</p>
          </div>
          <div id="var7-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var7-2" tabindex="0" hidden style="padding-block: var(--spacing-16); text-align: center;">
            <p style="margin: 0;">Real-time telemetry and engagement metrics.</p>
          </div>
          <div id="var7-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var7-3" tabindex="0" hidden style="padding-block: var(--spacing-16); text-align: center;">
            <p style="margin: 0;">Recent commits, deployments, and security audit logs.</p>
          </div>
          <div id="var7-p4" role="tabpanel" class="tabs__panel" aria-labelledby="var7-4" tabindex="0" hidden style="padding-block: var(--spacing-16); text-align: center;">
            <p style="margin: 0;">Automated compliance and WCAG export reports.</p>
          </div>
        </div>
      </section>

      <!-- Variant 8: Floating Icon-Only Dock -->
      <section style="position: relative; padding: var(--spacing-24); background: color-mix(in srgb, var(--surface, Canvas) 60%, var(--foreground, CanvasText) 12%); border-radius: var(--radius-lg, 0.75rem); overflow: hidden;">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-16); text-align: center;">
          8. Floating Icon-Only Dock (.tabs.tabs-floating.tabs-button.tabs-round.tabs-icon)
        </span>
        <div class="tabs tabs-floating tabs-button tabs-round tabs-icon">
          <div class="tab-list" role="tablist" aria-label="Floating Action Dock">
            <button type="button" role="tab" id="var8-1" class="tab" aria-selected="true" aria-controls="var8-p1" tabindex="0">
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
              <span class="tab__text">Search</span>
            </button>
            <button type="button" role="tab" id="var8-2" class="tab" aria-selected="false" aria-controls="var8-p2" tabindex="-1">
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
              <span class="tab__text">Code</span>
            </button>
            <button type="button" role="tab" id="var8-3" class="tab" aria-selected="false" aria-controls="var8-p3" tabindex="-1">
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
              <span class="tab__text">Notifications</span>
            </button>
            <button type="button" role="tab" id="var8-4" class="tab" aria-selected="false" aria-controls="var8-p4" tabindex="-1">
              <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#User"/></svg>
              <span class="tab__text">Profile</span>
            </button>
          </div>
          <div id="var8-p1" role="tabpanel" class="tabs__panel" aria-labelledby="var8-1" tabindex="0" style="padding-block: var(--spacing-12); text-align: center;">
            <p style="margin: 0;">Global search and command palette dock mode.</p>
          </div>
          <div id="var8-p2" role="tabpanel" class="tabs__panel" aria-labelledby="var8-2" tabindex="0" hidden style="padding-block: var(--spacing-12); text-align: center;">
            <p style="margin: 0;">Repository source view.</p>
          </div>
          <div id="var8-p3" role="tabpanel" class="tabs__panel" aria-labelledby="var8-3" tabindex="0" hidden style="padding-block: var(--spacing-12); text-align: center;">
            <p style="margin: 0;">Inbox notifications and alerts.</p>
          </div>
          <div id="var8-p4" role="tabpanel" class="tabs__panel" aria-labelledby="var8-4" tabindex="0" hidden style="padding-block: var(--spacing-12); text-align: center;">
            <p style="margin: 0;">Personal account profile settings.</p>
          </div>
        </div>
      </section>

    </div>
  `),
};

/**
 * 4. StateMatrix
 * Demonstrates selected, unselected, hover, keyboard focus-visible, and disabled states.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem;">
      
      <!-- Selected State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          Active / Selected Tab
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0">
              <span class="tab__text">Selected</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Unselected State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          Unselected (tabindex="-1")
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
              <span class="tab__text">Unselected</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Keyboard Focus Visible -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          Keyboard Focus-Visible
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">
              <span class="tab__text">Focused</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Disabled State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          Disabled (aria-disabled="true")
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab" role="tab" aria-selected="false" aria-disabled="true" disabled tabindex="-1">
              <span class="tab__text">Disabled</span>
            </button>
          </div>
        </div>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          High-Contrast Mode (Underline & Bold)
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0" style="text-decoration: underline; text-underline-offset: 4px; font-weight: bold;">
              <span class="tab__text">High Contrast</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Button Tab Focus -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          Button Tab Active & Focused
        </span>
        <div class="tabs tabs-button">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">
              <span class="tab__text">Button Active</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Compares standard 48px AAA touch targets with compact 32px AA tabs.
 */
export const SizesAndDensity: Story = {
  render: () =>
    createInteractiveTabs(`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      
      <!-- Standard Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Standard Size (min-block-size: 3rem / 48px — WCAG 2.5.5 AAA Target)
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist" aria-label="Standard Tabs">
            <button type="button" role="tab" id="std-1" class="tab" aria-selected="true" aria-controls="std-p1" tabindex="0">
              <span class="tab__text">General</span>
            </button>
            <button type="button" role="tab" id="std-2" class="tab" aria-selected="false" aria-controls="std-p2" tabindex="-1">
              <span class="tab__text">Security</span>
              <span class="badge badge--sm badge--accent"><span>AAA</span></span>
            </button>
          </div>
          <div id="std-p1" role="tabpanel" class="tabs__panel" aria-labelledby="std-1" tabindex="0" style="padding-block: var(--spacing-8);">
            <p style="margin: 0; color: var(--foreground-muted);">Ample 48px touch target height for mobile and desktop precision.</p>
          </div>
          <div id="std-p2" role="tabpanel" class="tabs__panel" aria-labelledby="std-2" tabindex="0" hidden style="padding-block: var(--spacing-8);">
            <p style="margin: 0; color: var(--foreground-muted);">Security settings panel.</p>
          </div>
        </div>
      </div>

      <!-- Compact Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Compact Size (.tabs.tabs-sm / min-block-size: 2rem / 32px — WCAG 2.5.8 AA Target)
        </span>
        <div class="tabs tabs-sm">
          <div class="tab-list" role="tablist" aria-label="Compact Tabs">
            <button type="button" role="tab" id="sm-1" class="tab" aria-selected="true" aria-controls="sm-p1" tabindex="0">
              <span class="tab__text">General</span>
            </button>
            <button type="button" role="tab" id="sm-2" class="tab" aria-selected="false" aria-controls="sm-p2" tabindex="-1">
              <span class="tab__text">Security</span>
              <span class="badge badge--sm"><span>AA</span></span>
            </button>
          </div>
          <div id="sm-p1" role="tabpanel" class="tabs__panel" aria-labelledby="sm-1" tabindex="0" style="padding-block: var(--spacing-8);">
            <p style="margin: 0; color: var(--foreground-muted);">Compact density suited for data tables, sub-panes, and inspector toolbars.</p>
          </div>
          <div id="sm-p2" role="tabpanel" class="tabs__panel" aria-labelledby="sm-2" tabindex="0" hidden style="padding-block: var(--spacing-8);">
            <p style="margin: 0; color: var(--foreground-muted);">Compact security settings panel.</p>
          </div>
        </div>
      </div>

    </div>
  `),
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates adaptive container queries collapse labels to icons when space is constrained.
 */
export const ZeroClassOrchestration: Story = {
  render: () =>
    createInteractiveTabs(`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Container Adaptive Tabs:</strong> Under <code>@container style(--ui-labels: hidden)</code>, tabs containing an icon automatically hide their text labels into visually-hidden accessible clips without breaking screen reader announcements.
        </p>
      </div>

      <!-- Standard Slot with Icons & Text -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Full Width Slot (Labels + Icons Visible)
        </span>
        <div class="tabs">
          <div class="tab-list" role="tablist" aria-label="Icon Tabs">
            <button type="button" role="tab" id="ic-1" class="tab" aria-selected="true" aria-controls="ic-p1" tabindex="0">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span class="tab__text">Overview</span>
            </button>
            <button type="button" role="tab" id="ic-2" class="tab" aria-selected="false" aria-controls="ic-p2" tabindex="-1">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
                <path d="m14 9 3 3-3 3"></path>
              </svg>
              <span class="tab__text">Explorer</span>
            </button>
          </div>
          <div id="ic-p1" role="tabpanel" class="tabs__panel" aria-labelledby="ic-1" tabindex="0" style="padding-block: var(--spacing-8);">
            <p style="margin: 0; color: var(--foreground-muted);">Both icon and label are rendered simultaneously.</p>
          </div>
          <div id="ic-p2" role="tabpanel" class="tabs__panel" aria-labelledby="ic-2" tabindex="0" hidden style="padding-block: var(--spacing-8);">
            <p style="margin: 0; color: var(--foreground-muted);">Explorer pane content.</p>
          </div>
        </div>
      </div>
    </div>
  `),
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Settings drawer, GitHub-style repository tabs, and vertical account management.
 */
export const RealWorldRecipes: Story = {
  render: () =>
    createInteractiveTabs(`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: GitHub Style Repository Navigation -->
      <section>
        <h4 style="font-size: var(--typography-font-size-1); margin-block-end: var(--spacing-12);">
          Recipe 1: Semantic Repository Header Navigation
        </h4>
        <nav class="tabs" aria-label="Repository Navigation">
          <ul class="tab-list">
            <li>
              <a href="#code" class="tab" aria-current="page">
                <span class="tab__text">Code</span>
              </a>
            </li>
            <li>
              <a href="#issues" class="tab">
                <span class="tab__text">Issues</span>
                <span class="badge badge--sm badge--subtle"><span>24</span></span>
              </a>
            </li>
            <li>
              <a href="#pulls" class="tab">
                <span class="tab__text">Pull Requests</span>
                <span class="badge badge--sm badge--accent"><span>5</span></span>
              </a>
            </li>
            <li>
              <a href="#actions" class="tab">
                <span class="tab__text">Actions</span>
              </a>
            </li>
            <li>
              <a href="#security" class="tab">
                <span class="tab__text">Security</span>
              </a>
            </li>
          </ul>
        </nav>
      </section>

      <!-- Recipe 2: Account Preferences Panel -->
      <section>
        <h4 style="font-size: var(--typography-font-size-1); margin-block-end: var(--spacing-12);">
          Recipe 2: Account Settings Tabbed Panel with Card Container
        </h4>
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h3 class="card__title subheading">Workspace Preferences</h3>
                <p class="card__subtitle">Manage global organization configurations</p>
              </hgroup>
            </header>

            <div class="card__body card__body--flush">
              <div class="tabs tabs-button" style="padding-inline: var(--spacing-breathe);">
                <div class="tab-list" role="tablist" aria-label="Workspace Sections">
                  <button type="button" role="tab" id="rc2-1" class="tab" aria-selected="true" aria-controls="rc2-p1" tabindex="0">
                    <span class="tab__text">Members</span>
                    <span class="chip">12</span>
                  </button>
                  <button type="button" role="tab" id="rc2-2" class="tab" aria-selected="false" aria-controls="rc2-p2" tabindex="-1">
                    <span class="tab__text">Billing</span>
                  </button>
                  <button type="button" role="tab" id="rc2-3" class="tab" aria-selected="false" aria-controls="rc2-p3" tabindex="-1">
                    <span class="tab__text">Audit Logs</span>
                  </button>
                </div>

                <div id="rc2-p1" role="tabpanel" class="tabs__panel" aria-labelledby="rc2-1" tabindex="0" style="padding-block: var(--spacing-16);">
                  <p style="margin: 0; color: var(--foreground-muted);">Manage invite links, single sign-on domains, and seat allocation.</p>
                </div>
                <div id="rc2-p2" role="tabpanel" class="tabs__panel" aria-labelledby="rc2-2" tabindex="0" hidden style="padding-block: var(--spacing-16);">
                  <p style="margin: 0; color: var(--foreground-muted);">Credit card on file, VAT details, and previous invoice history.</p>
                </div>
                <div id="rc2-p3" role="tabpanel" class="tabs__panel" aria-labelledby="rc2-3" tabindex="0" hidden style="padding-block: var(--spacing-16);">
                  <p style="margin: 0; color: var(--foreground-muted);">Cryptographically signed events for security compliance.</p>
                </div>
              </div>
            </div>

            <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
              <button type="button" class="button button--subtle"><span>Cancel</span></button>
              <button type="button" class="button button--strong button--accent"><span>Save Preferences</span></button>
            </footer>
          </article>
        </div>
      </section>

    </div>
  `),
};

/**
 * Tabs on Right (Reversed Vertical Orientation)
 * Uses `.tabs.tabs-vertical.tabs-on-right` to place the tab list on the right side
 * of the panel with the sliding indicator and border correctly aligned on the left edge.
 */
export const TabsOnRight: Story = {
  render: () =>
    createInteractiveTabs(`
    <div class="card card--bordered" style="max-inline-size: 42rem;">
      <article class="card__content">
        <header class="card__header">
          <hgroup class="card__hgroup">
            <h3 class="card__title subheading">Reversed Vertical Layout (.tabs-on-right)</h3>
            <p class="card__subtitle">Tab list placed on the right edge with indicator line on the left</p>
          </hgroup>
        </header>

        <div class="card__body">
          <div class="tabs tabs-vertical tabs-on-right">
            <div class="tab-list" role="tablist" aria-label="Inspector Panels">
              <button type="button" role="tab" id="tor-tab-1" class="tab" aria-selected="true" aria-controls="tor-panel-1" tabindex="0">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                <span class="tab__text">General</span>
              </button>
              <button type="button" role="tab" id="tor-tab-2" class="tab" aria-selected="false" aria-controls="tor-panel-2" tabindex="-1">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#View"/></svg>
                <span class="tab__text">Display</span>
                <span class="badge badge--sm badge--accent"><span>New</span></span>
              </button>
              <button type="button" role="tab" id="tor-tab-3" class="tab" aria-selected="false" aria-controls="tor-panel-3" tabindex="-1">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#Lock"/></svg>
                <span class="tab__text">Privacy</span>
              </button>
            </div>

            <div id="tor-panel-1" role="tabpanel" class="tabs__panel" aria-labelledby="tor-tab-1" tabindex="0" style="padding-inline-end: var(--spacing-24);">
              <h4 class="small-heading margin-bottom-xs">General Preferences</h4>
              <p class="text-muted margin-0">The indicator line and vertical border are placed on the left edge of the tab-list, seamlessly facing the active panel.</p>
            </div>
            <div id="tor-panel-2" role="tabpanel" class="tabs__panel" aria-labelledby="tor-tab-2" tabindex="0" hidden style="padding-inline-end: var(--spacing-24);">
              <h4 class="small-heading margin-bottom-xs">Display & Theme</h4>
              <p class="text-muted margin-0">Configure light and dark mode appearance, scale density, and layout geometry.</p>
            </div>
            <div id="tor-panel-3" role="tabpanel" class="tabs__panel" aria-labelledby="tor-tab-3" tabindex="0" hidden style="padding-inline-end: var(--spacing-24);">
              <h4 class="small-heading margin-bottom-xs">Security & Permissions</h4>
              <p class="text-muted margin-0">Manage encryption keys, session lifetime, and third-party integrations.</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  `),
};
