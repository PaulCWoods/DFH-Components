import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Action Menu Popover (Composed with Card Primitive)
 */
export const ActionMenuPopover: Story = {
  render: () => {
    const popoverId = 'actions-popover-demo';
    const anchorName = '--actions-btn-anchor';

    return `
      <div style="padding: 6rem 2rem; display: flex; justify-content: center;">
        <!-- Trigger button with native popovertarget and anchor-name -->
        <button 
          type="button" 
          class="button button--secondary"
          popovertarget="${popoverId}"
          style="anchor-name: ${anchorName};"
          aria-haspopup="dialog"
        >
          <span>Quick Actions</span>
          <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#ChevronDown"/>
          </svg>
        </button>

        <!-- Popover wrapper holding a composable Card -->
        <div 
          id="${popoverId}" 
          popover 
          class="popover popover--anchored"
          style="position-anchor: ${anchorName}"
        >
          <div class="card card--compact card--bordered card--translucent card--ruled">
            <article class="card__content">
              <header class="card__header">
                <h3 class="card__title">Document Options</h3>
              </header>
              <div class="card__body card__body--flush">
                <div class="button-group button-group--tight button-group--stacked s-button:subtle">
                  <button type="button" class="button">
                    <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#Duplicate"/>
          </svg>
                    <span>Duplicate</span>
                  </button>
                  <button type="button" class="button">
                    <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#Download"/>
          </svg>
                    <span>Export JSON</span>
                  </button>
                  <hr class="divider">
                  <button type="button" class="button button--subtle-destructive">
                    <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#Delete"/>
          </svg>
                    <span>Delete File</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. User Profile Popover (Composed with Card & Avatar)
 */
export const UserProfilePopover: Story = {
  render: () => {
    const popoverId = 'profile-popover-demo';
    const anchorName = '--avatar-btn-anchor';

    return `
      <div style="padding: 8rem 2rem; display: flex; justify-content: center;">
        <!-- Avatar Button Trigger -->
        <button 
          type="button" 
          class="button avatar button--avatar button--round"
          popovertarget="${popoverId}"
          style="anchor-name: ${anchorName};"
           data-status="online"
          aria-label="View Jordan Lee profile (online)"
          title="View Jordan Lee profile (online)"
        >
          <span aria-hidden="true">JL</span>
        </button>

        <!-- Popover with User Profile Card -->
        <div 
          id="${popoverId}" 
          popover 
          class="popover popover--anchored popover--lg"
          style="position-anchor: ${anchorName};"
        >
          <div class="card card--compact">
            <article class="card__content">
              <header class="card__header">
                <div class="avatar" data-status="online" aria-label="Jordan Lee (online)">
                  <span aria-hidden="true">JL</span>
                </div>
                <hgroup class="card__hgroup">
                  <h3 class="card__title">Jordan Lee</h3>
                  <p class="card__subtitle">jordan.lee@dfh.design</p>
                </hgroup>
              </header>

              <div class="card__body">
                <div class="stack">
                  <div class="cluster">
                    <span class="badge badge--subtle"><span>Design Lead</span></span>
                    <span class="status" data-status="online">Online</span>
                  </div>
                  <p class="micro-text">
                    Lead accessibility auditor for WCAG 2.2 Level AA / AAA design systems.
                  </p>
                </div>
              </div>

              <footer class="card__footer">
                <div class="button-group button-group--space-between">
                <button type="button" class="button button--primary s-button:sm">
                  <span>View Profile</span> 
                </button>
                <button type="button" class="button button--subtle s-button:sm">
                  <span>Sign Out</span>
                </button>
              </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Settings & Controls Popover (Composed with Card, Switch, & Range)
 */
export const ControlsPopover: Story = {
  render: () => {
    const popoverId = 'settings-popover-demo';
    const anchorName = '--settings-btn-anchor';

    return `
      <div style="padding: 10rem 2rem; display: flex; justify-content: center;">
        <button 
          type="button" 
          class="button button--secondary"
          popovertarget="${popoverId}"
          style="anchor-name: ${anchorName};"
        >
          <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#Settings"/>
          </svg>
          <span>Display Settings</span>
        </button>

        <div 
          id="${popoverId}" 
          popover 
          class="popover popover--anchored popover--lg"
          style="position-anchor: ${anchorName};"
        >
          <div class="card card--compact card--ruled">
            <article class="card__content">
              <header class="card__header">
                <h3 class="card__title">Preferences</h3>
              </header>

              <div class="card__body">
                <div class="stack">
                  <label class="switch switch--sm" style="inline-size: 100%;">
                    <span class="switch__label micro-text">High Contrast Mode</span>
                    <input type="checkbox" role="switch" class="visually-hidden" />
                    <span class="switch__control" aria-hidden="true">
                      <span class="switch__option switch__option--off">Off</span>
                      <span class="switch__option switch__option--on">On</span>
                    </span>
                  </label>

                  <div class="field">
                    <div class="field__header">
                      <label for="font-scale-slider" class="field__label">UI Scale</label>
                      <output for="font-scale-slider" class="field__output">100%</output>
                    </div>
                    <input id="font-scale-slider" type="range" class="range range--sm" value="50" min="0" max="100" style="--value: 50%;" />
                  </div>
                </div>
              </div>

              <footer class="card__footer card__footer--flush">
                <div class="button-group button-group--fill-items">
                  <button type="button" class="button button--subtle">
                    <span>Done</span>
                  </button>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 4. Notification Banner Popover (Composed with Banner Primitive)
 */
export const NotificationBannerPopover: Story = {
  render: () => {
    const popoverId = 'notice-popover-demo';
    const anchorName = '--bell-btn-anchor';

    return `
      <div style="padding: 6rem 2rem; display: flex; justify-content: center;">
        <button 
          type="button" 
          class="button button--icon"
          popovertarget="${popoverId}"
          style="anchor-name: ${anchorName}; position: relative;"
          aria-label="View system notifications"
        >
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#BellFilled" />
              </svg>
          <span class="badge badge--danger badge--sm badge--round badge--bottom-left-corner">
            <span>1</span>
          </span>
        </button>

        <div 
          id="${popoverId}" 
          popover 
          class="popover popover--anchored popover--lg"
          style="position-anchor: ${anchorName};"
        >
          <div class="banner banner--warning s-button:sm" role="status">
            <div class="banner__inner">
              <h4 class="subheading--fixed">Storage Limit Approaching</h4>
              <p>Your team workspace is at 82% capacity. Consider upgrading soon.</p>
              <div class="button-group">
              <button type="button" class="button button--primary"><span>Upgrade</span></button>
              <button type="button" class="button button--subtle"><span>Dismiss</span></button>
              </div>
            </div>
            <button type="button" class="button button--subtle banner__action">
              <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#Close" />
              </svg>
              <span class="visually-hidden">Close</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },
};
