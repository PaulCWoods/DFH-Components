import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Helper to initialize interactive WAI-ARIA tab switching and keyboard navigation
 * for Storybook HTML previews.
 */
function createInteractiveTabs(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html.trim();
  const root = (container.firstElementChild as HTMLElement) || container;

  // 1. Interactive WAI-ARIA Tablists
  const tablists = root.matches('[role="tablist"]')
    ? [root]
    : Array.from(root.querySelectorAll<HTMLElement>('[role="tablist"]'));

  tablists.forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll<HTMLElement>('[role="tab"]'));
    const isVertical = tablist.closest('.tabs--vertical') !== null;

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

    // Click selection
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        selectTab(tab);
      });
    });

    // Keyboard navigation (WCAG 2.1.1 / WAI-ARIA Tabs pattern)
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

  // 2. Navigation Link Tabs (Toggle aria-current="page" on click without page reload)
  const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('nav.tabs a.tab'));
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const list = link.closest('.tabs__list, .tab-list');
      if (list) {
        list.querySelectorAll('a.tab').forEach((other) => other.removeAttribute('aria-current'));
      }
      link.setAttribute('aria-current', 'page');
    });
  });

  return root;
}

export const Default: Story = {
  render: () =>
    createInteractiveTabs(`
    <div class="tabs" style="max-inline-size: 40rem;">
      <div class="tabs__list" role="tablist" aria-label="Account Settings">
        <button type="button" role="tab" id="tab-1" class="tab" aria-selected="true" aria-controls="panel-1" tabindex="0">
          <span class="tab__text">Overview</span>
        </button>
        <button type="button" role="tab" id="tab-2" class="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">
          <span class="tab__text">Security</span>
          <span class="badge badge--pill badge--accent"><span>2</span></span>
        </button>
        <button type="button" role="tab" id="tab-3" class="tab" aria-selected="false" aria-controls="panel-3" tabindex="-1">
          <span class="tab__text">Notifications</span>
          <span class="chip">3</span>
        </button>
      </div>

      <div id="panel-1" role="tabpanel" class="tabs__panel" aria-labelledby="tab-1" tabindex="0">
        <h3 style="margin-block-start: 0; font-size: var(--typography-font-size-1);">Component Overview</h3>
        <p style="color: var(--foreground-muted);">
          Design For Humans tabs provide keyboard-accessible tablist navigation with smooth anchor-positioned selection indicator transitions.
        </p>
      </div>

      <div id="panel-2" role="tabpanel" class="tabs__panel" aria-labelledby="tab-2" tabindex="0" hidden>
        <h3 style="margin-block-start: 0; font-size: var(--typography-font-size-1);">Security & Authentication</h3>
        <p style="color: var(--foreground-muted);">
          Manage hardware security keys, WebAuthn passkeys, and two-factor authentication.
        </p>
      </div>

      <div id="panel-3" role="tabpanel" class="tabs__panel" aria-labelledby="tab-3" tabindex="0" hidden>
        <h3 style="margin-block-start: 0; font-size: var(--typography-font-size-1);">Notification Preferences</h3>
        <p style="color: var(--foreground-muted);">
          Configure email, SMS, and in-app alert digests.
        </p>
      </div>
    </div>
  `),
};

export const NavigationTabs: Story = {
  render: () =>
    createInteractiveTabs(`
    <nav class="tabs" aria-label="Repository sections">
      <ul class="tabs__list">
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
        <li>
          <a href="/repo/pulls" class="tab">
            <span class="tab__text">Pull Requests</span>
          </a>
        </li>
        <li>
          <a href="/repo/settings" class="tab">
            <span class="tab__text">Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  `),
};

export const SmallTabs: Story = {
  render: () =>
    createInteractiveTabs(`
    <nav class="tabs tabs--sm" aria-label="Small filter tabs">
      <ul class="tabs__list">
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
        <li>
          <a href="/repo/pulls" class="tab">
            <span class="tab__text">Pull Requests</span>
          </a>
        </li>
      </ul>
    </nav>
  `),
};

export const ButtonTabs: Story = {
  render: () =>
    createInteractiveTabs(`
    <nav class="tabs tabs--buttons" aria-label="Button style tabs">
      <ul class="tabs__list">
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
        <li>
          <a href="/repo/pulls" class="tab">
            <span class="tab__text">Pull Requests</span>
          </a>
        </li>
        <li>
          <a href="/repo/settings" class="tab">
            <svg class="icon" width="32" height="32" aria-hidden="true"><use href="#Settings"></use></svg>
            <span class="tab__text visually-hidden">Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  `),
};

export const RoundButtonTabs: Story = {
  render: () =>
    createInteractiveTabs(`
    <nav class="tabs tabs--buttons tabs--round" aria-label="Pill style tabs">
      <ul class="tabs__list">
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
        <li>
          <a href="/repo/pulls" class="tab">
            <span class="tab__text">Pull Requests</span>
          </a>
        </li>
        <li>
            <a href="/repo/settings" class="tab">
                <svg class="icon" width="32" height="32" aria-hidden="true"><use href="#Settings"></use></svg>
                <span class="tab__text visually-hidden">Settings</span>
            </a>
        </li>
      </ul>
    </nav>
  `),
};

export const VerticalTabs: Story = {
  render: () =>
    createInteractiveTabs(`
    <div class="tabs tabs--vertical" style="max-inline-size: 48rem;">
      <div class="tabs__list" role="tablist" aria-label="Settings Categories">
        <button type="button" role="tab" id="vtab-general" class="tab" aria-selected="true" aria-controls="vpanel-general" tabindex="0">
          <span class="tab__text">General</span>
        </button>
        <button type="button" role="tab" id="vtab-security" class="tab" aria-selected="false" aria-controls="vpanel-security" tabindex="-1">
          <span class="tab__text">Security & Keys</span>
        </button>
        <button type="button" role="tab" id="vtab-billing" class="tab" aria-selected="false" aria-controls="vpanel-billing" tabindex="-1">
          <span class="tab__text">Billing & Plans</span>
        </button>
        <button type="button" role="tab" id="vtab-notifications" class="tab" aria-selected="false" aria-controls="vpanel-notifications" tabindex="-1">
          <span class="tab__text">Notifications</span>
        </button>
      </div>

      <div id="vpanel-general" role="tabpanel" class="tabs__panel" aria-labelledby="vtab-general" tabindex="0">
        <h3 style="margin-block-start: 0; font-size: var(--typography-font-size-1);">General Settings</h3>
        <p style="color: var(--foreground-muted);">
          Configure workspace name, primary language, time zone, and brand assets.
        </p>
      </div>

      <div id="vpanel-security" role="tabpanel" class="tabs__panel" aria-labelledby="vtab-security" tabindex="0" hidden>
        <h3 style="margin-block-start: 0; font-size: var(--typography-font-size-1);">Security Settings</h3>
        <p style="color: var(--foreground-muted);">
          Manage hardware security keys, WebAuthn passkeys, and two-factor authentication.
        </p>
      </div>

      <div id="vpanel-billing" role="tabpanel" class="tabs__panel" aria-labelledby="vtab-billing" tabindex="0" hidden>
        <h3 style="margin-block-start: 0; font-size: var(--typography-font-size-1);">Billing & Plans</h3>
        <p style="color: var(--foreground-muted);">
          Manage subscriptions, invoices, and payment methods.
        </p>
      </div>

      <div id="vpanel-notifications" role="tabpanel" class="tabs__panel" aria-labelledby="vtab-notifications" tabindex="0" hidden>
        <h3 style="margin-block-start: 0; font-size: var(--typography-font-size-1);">Notification Preferences</h3>
        <p style="color: var(--foreground-muted);">
          Configure alert thresholds, email frequency, and webhook endpoints.
        </p>
      </div>
    </div>
  `),
};
