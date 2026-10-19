import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Tab List',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Tab List Primitive (Molecule)

The **Tab List** molecule is a cohesive group container for interactive tabs and navigation links.
It orchestrates:
- **Anchor Scope:** Establishes \`anchor-scope: --tab-selected\` so the active tab's anchor is encapsulated within the list.
- **Sliding Indicator Transition:** Animates a hardware-accelerated indicator pseudo-element (\`::before\`) via CSS Anchor Positioning without requiring manual JavaScript dimension measurement.
- **Standalone Navigation:** Can function completely independently from panels as a site header navigation, sub-navigation, or filter toolbar.
- **Semantic Flexibility:** Supports both \`<div class="tab-list" role="tablist">\` and semantic \`<nav class="tab-list"><ul class="tab-list__items"><li><a class="tab">...\` structures with \`display: contents\` list-item transparency.
- **Floating & Docked Modes:** Translucent floating pill bar (\`.tabs-floating\`) with backdrop blur and fixed bottom viewport dock (\`.tabs-docked\`).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const createInteractiveList = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;

  requestAnimationFrame(() => {
    const tablists = container.querySelectorAll<HTMLElement>('.tab-list, .tab-list');
    tablists.forEach((tablist) => {
      const tabs = tablist.querySelectorAll<HTMLElement>('[role="tab"]');
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          tabs.forEach((t) => {
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
          });
          tab.setAttribute('aria-selected', 'true');
          tab.setAttribute('tabindex', '0');
        });
      });
    });
  });

  return container;
};

export const StandaloneUnderlineNav: Story = {
  render: () => `
    <nav class="tab-list" aria-label="Site Sections">
      <ul>
        <li>
          <a href="#overview" class="tab" aria-current="page">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#View"/></svg>
            <span class="tab__text">Overview</span>
          </a>
        </li>
        <li>
          <a href="#components" class="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
            <span class="tab__text">Components</span>
            <span class="badge badge--sm badge--accent"><span>42</span></span>
          </a>
        </li>
        <li>
          <a href="#tokens" class="tab">
            <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
            <span class="tab__text">Tokens</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
};

export const SegmentedButtonsList: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Interactive Segmented Pill List (.tab-list.tabs-button.tabs-round)</h4>
      <div class="tab-list tabs-button" role="tablist" aria-label="Frequency Switcher">
        <button type="button" class="tab tab--button" role="tab" aria-selected="true" tabindex="0">
          <span class="tab__text">Monthly</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Quarterly</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Annual</span>
          <span class="badge badge--sm badge--accent"><span>Save 20%</span></span>
        </button>
      </div>
    </div>
  `),
};

export const VerticalList: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 20rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Vertical Tab List (.tab-list.tabs-vertical)</h4>
      <div class="tab-list tabs-vertical" role="tablist" aria-label="Settings navigation">
        <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#User"/></svg>
          <span class="tab__text">Profile</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Lock"/></svg>
          <span class="tab__text">Security</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Bell"/></svg>
          <span class="tab__text">Notifications</span>
        </button>
      </div>
    </div>
  `),
};

export const VerticalListReversed: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 20rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Reversed Vertical Tab List (.tab-list.tabs-vertical.tabs-on-right)</h4>
      <div class="tab-list tabs-vertical tabs-on-right" role="tablist" aria-label="Settings navigation reversed">
        <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#User"/></svg>
          <span class="tab__text">Profile</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Lock"/></svg>
          <span class="tab__text">Security</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Bell"/></svg>
          <span class="tab__text">Notifications</span>
        </button>
      </div>
    </div>
  `),
};

export const SubtleSegmentedButtons: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Subtle Segmented Pill List (.tab-list.tabs-button.tabs-round.tabs-subtle)</h4>
      <div class="tab-list tabs-button tabs-subtle" role="tablist" aria-label="View Switcher">
        <button type="button" class="tab tab--button" role="tab" aria-selected="true" tabindex="0">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#View"/></svg>
          <span class="tab__text">Overview</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Code"/></svg>
          <span class="tab__text">Source</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
          <span class="tab__text">Settings</span>
        </button>
      </div>
    </div>
  `),
};

export const PlainSegmentedButtons: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Subtle Segmented Pill List (.tab-list.tabs-button.tabs-round.tabs-subtle)</h4>
      <div class="tab-list tabs-button tabs-plain" role="tablist" aria-label="View Switcher">
        <button type="button" class="tab tab--button" role="tab" aria-selected="true" tabindex="0">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#View"/></svg>
          <span class="tab__text">Overview</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Code"/></svg>
          <span class="tab__text">Source</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
          <span class="tab__text">Settings</span>
        </button>
      </div>
    </div>
  `),
};

export const RoundSegmentedButtons: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Subtle Segmented Pill List (.tab-list.tabs-button.tabs-round.tabs-subtle)</h4>
      <div class="tab-list tabs-button tabs-round" role="tablist" aria-label="View Switcher">
        <button type="button" class="tab tab--button" role="tab" aria-selected="true" tabindex="0">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#View"/></svg>
          <span class="tab__text">Overview</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Code"/></svg>
          <span class="tab__text">Source</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
          <span class="tab__text">Settings</span>
        </button>
      </div>
    </div>
  `),
};

export const SmallSegmentedButtons: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Subtle Segmented Pill List (.tab-list.tabs-button.tabs-round.tabs-subtle)</h4>
      <div class="tab-list tabs-button tabs-sm" role="tablist" aria-label="View Switcher">
        <button type="button" class="tab tab--button" role="tab" aria-selected="true" tabindex="0">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#View"/></svg>
          <span class="tab__text">Overview</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Code"/></svg>
          <span class="tab__text">Source</span>
        </button>
        <button type="button" class="tab tab--button" role="tab" aria-selected="false" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
          <span class="tab__text">Settings</span>
        </button>
      </div>
    </div>
  `),
};

export const PlainNavigationList: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Plain Navigation Bar (.tab-list.tabs-plain)</h4>
      <nav class="tab-list tabs-plain" aria-label="Documentation Sections">
        <ul>
          <li>
            <a href="#articles" class="tab tab--plain" aria-current="page">
              <span class="tab__text">Articles</span>
            </a>
          </li>
          <li>
            <a href="#components" class="tab tab--plain">
              <span class="tab__text">Components</span>
            </a>
          </li>
          <li>
            <a href="#tokens" class="tab tab--plain">
              <span class="tab__text">Tokens</span>
            </a>
          </li>
          <li>
            <a href="#about" class="tab tab--plain">
              <span class="tab__text">About</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
};

export const SubtleNavigationList: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Plain Navigation Bar (.tab-list.tabs-plain)</h4>
      <nav class="tab-list tabs-subtle" aria-label="Documentation Sections">
        <ul>
          <li>
            <a href="#articles" class="tab" aria-current="page">
              <span class="tab__text">Articles</span>
            </a>
          </li>
          <li>
            <a href="#components" class="tab">
              <span class="tab__text">Components</span>
            </a>
          </li>
          <li>
            <a href="#tokens" class="tab">
              <span class="tab__text">Tokens</span>
            </a>
          </li>
          <li>
            <a href="#about" class="tab">
              <span class="tab__text">About</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
};

export const FloatingPillDock: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="padding: var(--spacing-24); background: var(--surface-muted); border-radius: var(--radius-lg); text-align: center;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Floating Translucent Navigation Pill (.tab-list.tabs-floating.tabs-button.tabs-round)</h4>
      <div class="tab-list tabs-floating tabs-button tabs-round" role="tablist" aria-label="Application Dock">
        <button type="button" class="tab tab--button tab--icon" role="tab" aria-selected="true" aria-label="Home" tabindex="0">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Home"/></svg>
          <span class="tab__text">Home</span>
        </button>
        <button type="button" class="tab tab--button tab--icon" role="tab" aria-selected="false" aria-label="Search" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
          <span class="tab__text">Search</span>
        </button>
        <button type="button" class="tab tab--button tab--icon" role="tab" aria-selected="false" aria-label="Notifications" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Bell"/></svg>
          <span class="tab__text">Notifications</span>
        </button>
        <button type="button" class="tab tab--button tab--icon" role="tab" aria-selected="false" aria-label="Profile" tabindex="-1">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#User"/></svg>
          <span class="tab__text">Profile</span>
        </button>
      </div>
    </div>
  `),
};


export const ComplexNavigationList: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <h4 class="font-size-sm font-weight-bold text-color-muted">Complex Navigation List (.tab-list.tabs-button.tabs-subtle.tabs-vertical)</h4>
      <nav class="tab-list tabs-button tabs-subtle tabs-vertical" aria-label="Documentation Sections">
        <ul>
          <li>
            <button class="button button--plain button--sm button--icon" aria-expanded="true" aria-controls="nav-getting-started">
              <span class="visually-hidden">Toggle Getting Started</span>
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
            <span class="tab-list__content small-heading">Getting Started</span>
            <ul id="nav-getting-started">
              <li>
                <a href="#overview" class="tab" aria-current="page">
                  <span class="tab__text">Overview</span>
                </a>
              </li>
              <li>
                <a href="#installation" class="tab">
                  <span class="tab__text">Installation</span>
                </a>
              </li>
              <li>
                <a href="#design-tokens" class="tab">
                  <span class="tab__text">Design Tokens</span>
                </a>
              </li>
              <li>
                <a href="#accessibility" class="tab">
                  <span class="tab__text">Accessibility Principles</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button class="button button--plain button--sm button--icon" aria-expanded="true" aria-controls="nav-components">
              <span class="visually-hidden">Toggle Components</span>
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#ChevronDown"/></svg>
            </button>
            <span class="tab-list__content small-heading">Components</span>
            <ul id="nav-components">
              <li>
                <a href="#buttons" class="tab">
                  <span class="tab__text">Buttons</span>
                </a>
              </li>
              <li>
                <a href="#tabs" class="tab">
                  <span class="tab__text">Tabs & Navigation</span>
                  <span class="badge badge--sm badge--accent"><span>Updated</span></span>
                </a>
              </li>
              <li>
                <a href="#dialogs" class="tab">
                  <span class="tab__text">Dialogs & Sheets</span>
                </a>
              </li>
              <li>
                <a href="#forms" class="tab">
                  <span class="tab__text">Form Controls</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button class="button button--plain button--sm button--icon" aria-expanded="false" aria-controls="nav-layout">
              <span class="visually-hidden">Toggle Layout Primitives</span>
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#ChevronRight"/></svg>
            </button>
            <span class="tab-list__content small-heading">Layout Primitives</span>
          </li>
          <li>
            <a href="#figma" class="tab">
              <span class="tab__text">Figma Libraries</span>
            </a>
          </li>
          <li>
            <a href="#changelog" class="tab">
              <span class="tab__text">Changelog</span>
              <span class="badge badge--sm badge--subtle"><span>v2.4</span></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
};

export const ScrollableHorizontalList: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 28rem;">
      <div>
        <h4 class="font-size-sm font-weight-bold text-color-muted">Scrollable Single Row Tab List (.tabs-scrollable)</h4>
        <p class="font-size-xs text-color-muted">Constrained to 28rem container. Tabs remain on a single line with smooth horizontal scrolling.</p>
      </div>
      <div class="tab-list tabs-scrollable" role="tablist" aria-label="Project Management Navigation">
        <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0">
          <span class="tab__text">Overview</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Milestones</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Roadmap</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Analytics</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Team Members</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Integrations</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Audit Log</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Settings</span>
        </button>
      </div>
    </div>
  `),
};

export const WrappingHorizontalList: Story = {
  render: () =>
    createInteractiveList(`
    <div class="stack gap-md" style="max-inline-size: 28rem;">
      <div>
        <h4 class="font-size-sm font-weight-bold text-color-muted">Default Multi-Line Wrapping Tab List (or .tabs-wrap)</h4>
        <p class="font-size-xs text-color-muted">Constrained to 28rem container. Tabs wrap naturally onto multiple rows without clipping.</p>
      </div>
      <div class="tab-list tabs-wrap" role="tablist" aria-label="Topic Filter Tags">
        <button type="button" class="tab" role="tab" aria-selected="true" tabindex="0">
          <span class="tab__text">All Topics</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Accessibility</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Design Tokens</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Component Architecture</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">Fluid Typography</span>
        </button>
        <button type="button" class="tab" role="tab" aria-selected="false" tabindex="-1">
          <span class="tab__text">WCAG 2.2</span>
        </button>
      </div>
    </div>
  `),
};