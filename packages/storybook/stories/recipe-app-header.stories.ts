import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/App Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Application Header & Navigation Bar Recipe** demonstrates how Design For Humans primitives and utility classes compose into a zero-style-tag, production-grade, accessible global navigation landmark.

### Composed Primitives & Utilities
- **Bypass Landmark (WCAG 2.4.1):** High-contrast \`.skip-link\` expands on focus, allowing keyboard and screen-reader users to jump straight to \`#main-content\`.
- **Header Shell:** Built with the \`.header.header--sticky.header--translucent\` primitive for seamless glassmorphism and sticky positioning.
- **Layout Utilities:** Composed using \`.min-h-screen\`, \`.bg-color-subtle\`, \`.flex\`, \`.align-items-center\`, \`.justify-content-between\`, and \`.gap-sm\` from the utility suite.
- **Brand Lockup:** Semantic link with vector mark and prominent site title.
- **Primary Navigation:** Responsive \`<nav>\` with \`.button--subtle\` items and \`aria-current="page"\` for zero-JS active state styling.
- **Quick Search Trigger:** Interactive search button with \`#Search\` vector icon and \`⌘K\` keyboard shortcut chip.
- **Notifications Button:** Interactive \`.button--icon\` with an anchored unread counter (\`.badge--top-right-corner\`).
- **User Profile Flyout:** Interactive \`button.button--avatar\` with \`[data-status="online"]\` ring, triggering an anchored CSS \`popover\` that displays user credentials, theme switches, and stacked menu actions.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Standard Application Header
 * Zero-style-tag desktop and tablet navigation header with search, notifications, skip-link, and anchored user profile menu.
 */
export const Standard: Story = {
  render: () => {
    const popoverId = 'header-user-popover';
    const anchorName = '--header-avatar-anchor';

    return `
      <div class="stack gap-0 min-h-screen bg-color-subtle">
        <!-- Top Banner Skip Link (WCAG 2.4.1) -->
        <a href="#main-content" class="skip-link">
          <span>Skip to main content</span>
        </a>

        <!-- Global Header Landmark Primitive -->
        <header class="header header--sticky header--translucent padding-block-sm">
          <div class="wrapper inline-responsive inline-responsive--xl">
            
            <!-- Brand / Logo Lockup -->
            <div class="inline gap-sm">
              <a href="/" class="link inline gap-sm font-weight-bold font-size-lg">
                <span class="avatar avatar--accent avatar--square" aria-hidden="true">
                  <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                    <use href="#Share"/>
                  </svg>
                </span>
                <span class="white-space-nowrap">Design For Humans</span>
              </a>

              <span class="badge badge--accent badge--round badge--sm">
                <span>v2.2</span>
              </span>
            </div>

            <!-- Primary Navigation Links -->
            <nav aria-label="Primary navigation" class="cluster gap-sm">
              <ul class="cluster gap-none">
                <li>
                  <a href="#dashboard" class="button button--subtle" aria-current="page">
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#components" class="button button--subtle">
                    <span>Components</span>
                  </a>
                </li>
                <li>
                  <a href="#tokens" class="button button--subtle">
                    <span>Design Tokens</span>
                  </a>
                </li>
                <li>
                  <a href="#audit" class="button button--subtle">
                    <span>A11y Audit</span>
                  </a>
                </li>
              </ul>
            </nav>

            <!-- Actions Cluster: Search, Notifications, Profile Flyout -->
            <div class="inline gap-sm">
              
              <!-- Spotlight / Search Trigger Button (Adaptive: collapses text in tight containers) -->
              <button 
                type="button" 
                class="button button--subtle button--subtle-tint button--responsive"
                aria-label="Search design system (Press Command+K)"
              >
                <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                  <use href="#Search"/>
                </svg>
                <span class="button__text button__text--placeholder">
                  Search docs...
                  <kbd class="kbd"><span>⌘K</span></kbd>
                </span>
              </button>

              <!-- Notifications Icon Button with Corner Badge -->
              <button 
                type="button" 
                class="button button--icon" 
                aria-label="Notifications (3 unread)"
              >
                <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
                  <use href="#BellFilled"/>
                </svg>
                <span class="badge badge--danger badge--sm badge--round badge--top-right-corner">
                  <span>3</span>
                </span>
              </button>

              <!-- Profile Avatar Button with Live Status Ring (Trigger for Popover) -->
              <button 
                type="button" 
                class="button avatar button--avatar button--round" 
                popovertarget="${popoverId}"
                style="anchor-name: ${anchorName};"
                data-status="online"
                aria-haspopup="dialog"
                aria-label="Account menu for Alex Bennett (online)"
              >
                <span>AB</span>
              </button>

              <!-- Anchored User Profile Menu Popover -->
              <div 
                id="${popoverId}" 
                popover 
                class="popover popover--anchored"
                style="position-anchor: ${anchorName};"
              >
                <div class="card card--compact card--translucent card--ruled wrapper wrapper--xs">
                  <article class="card__content">
                    
                    <!-- User Identity Header -->
                    <header class="card__header">
                      <div class="avatar" data-status="online" aria-label="Alex Bennett (online)">
                        <span>AB</span>
                      </div>
                      <hgroup class="card__hgroup">
                        <h3 class="card__title">Alex Bennett</h3>
                        <p class="card__subtitle">alex.bennett@dfh.design</p>
                      </hgroup>
                    </header>

                    <!-- Profile Quick Actions -->
                    <div class="card__body card__body--flush">
                      <div class="button-group button-group--tight button-group--stacked s-button:subtle">
                        <button type="button" class="button">
                          <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                            <use href="#User"/>
                          </svg>
                          <span>Your Profile</span>
                        </button>
                        <button type="button" class="button">
                          <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                            <use href="#Settings"/>
                          </svg>
                          <span>System Preferences</span>
                        </button>
                        <button type="button" class="button">
                          <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                            <use href="#Bookmarked"/>
                          </svg>
                          <span>Saved Components</span>
                        </button>
                      </div>
                    </div>

                    <!-- Theme & Setting Switch -->
                    <div class="card__body padding-block-sm">
                      <label class="switch switch--sm flex justify-content-between align-items-center">
                        <span class="switch__label">Dark Mode</span>
                        <input type="checkbox" role="switch" class="visually-hidden" checked />
                        <span class="switch__control" aria-hidden="true">
                          <span class="switch__option switch__option--off">Off</span>
                          <span class="switch__option switch__option--on">On</span>
                        </span>
                      </label>
                    </div>

                    <!-- Sign Out Action -->
                    <footer class="card__footer card__footer--flush">
                      <div class="button-group button-group--tight button-group--stacked s-button:subtle">
                        <button type="button" class="button button--subtle-destructive">
                          <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false">
                            <use href="#Close"/>
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </footer>
                  </article>
                </div>
              </div>

            </div>
          </div>
        </header>

        <!-- Simulated Main Page Content for Skip-Link Testing -->
        <main id="main-content" class="wrapper padding-block-lg">
          <div class="stack gap-lg">
            <div class="stack gap-sm">
              <h1 class="heading-1">Component Library Dashboard</h1>
              <p class="lead-text text-color-muted">
                WCAG 2.2 Level AA / AAA design system combining native web standards with zero-JS interactive primitives.
              </p>
            </div>

            <!-- Instruction Card -->
            <div class="card">
              <article class="card__content">
                <header class="card__header">
                  <h2 class="card__title">Interactive Recipe Highlights</h2>
                </header>
                <div class="card__body prose">
                  <ul>
                    <li><strong>Skip Link Navigation:</strong> Click into the preview and press <kbd>Tab</kbd> to focus the high-contrast in-flow skip banner.</li>
                    <li><strong>Anchored Avatar Popover:</strong> Click the avatar in the top right to open the native zero-JS anchored user profile flyout.</li>
                    <li><strong>Notification Corner Badge:</strong> The unread counter is dynamically positioned at the top-right corner of the bell button without clipping.</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </main>
      </div>
    `;
  },
};

/**
 * 2. Header with Breadcrumb Subnav
 * Includes a contextual breadcrumb bar below the main header for deep navigation flows.
 */
export const WithBreadcrumbSubnav: Story = {
  render: () => {
    const popoverId = 'subnav-user-popover';
    const anchorName = '--subnav-avatar-anchor';

    return `
      <div class="stack gap-0 min-h-screen bg-color-subtle">
        <header class="header header--sticky header--translucent">
          
          <!-- Primary Navigation Bar -->
          <div class="wrapper flex align-items-center justify-content-between padding-block-sm">
            <div class="cluster align-items-center gap-sm">
              <a href="/" class="link link--subtle inline gap-sm font-weight-bold font-size-lg">
                <span class="avatar avatar--accent" aria-hidden="true">
                  <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
                </span>
                <span>Design For Humans</span>
              </a>
            </div>

            <div class="cluster align-items-center gap-sm">
              <button 
                type="button" 
                class="button avatar button--avatar button--round" 
                popovertarget="${popoverId}"
                style="anchor-name: ${anchorName};"
                data-status="online"
                aria-haspopup="dialog"
                aria-label="Account menu (online)"
              >
                <span>AB</span>
              </button>

              <div 
                id="${popoverId}" 
                popover 
                class="popover popover--anchored"
                style="position-anchor: ${anchorName};"
              >
                <div class="card card--compact card--translucent card--ruled wrapper wrapper--xs">
                  <article class="card__content">
                    <header class="card__header">
                      <h3 class="card__title">Alex Bennett</h3>
                    </header>
                    <div class="card__body card__body--flush">
                      <div class="button-group button-group--tight button-group--stacked s-button:subtle">
                        <button type="button" class="button"><span>Profile</span></button>
                        <button type="button" class="button"><span>Settings</span></button>
                        <hr class="divider">
                        <button type="button" class="button button--subtle-destructive"><span>Sign Out</span></button>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <hr class="divider">

          <!-- Secondary Subnav / Breadcrumb Bar -->
          <div class="wrapper flex align-items-center justify-content-between padding-block-sm">
            <nav class="breadcrumb" aria-label="Breadcrumbs">
              <ol>
                <li><a href="#home" class="link"><span>Design System</span></a></li>
                <li><a href="#components" class="link"><span>Components</span></a></li>
                <li aria-current="page"><span>Popover Primitive</span></li>
              </ol>
            </nav>

            <div class="cluster align-items-center gap-sm">
              <button type="button" class="button button--subtle button--sm inline gap-sm">
                <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Duplicate"/></svg>
                <span>Clone Recipe</span>
              </button>
              <button type="button" class="button button--primary button--sm inline gap-sm">
                <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Download"/></svg>
                <span>Export CSS</span>
              </button>
            </div>
          </div>
        </header>

        <main class="wrapper padding-block-lg">
          <div class="card">
            <article class="card__content">
              <header class="card__header">
                <h1 class="card__title">Popover Primitive Documentation</h1>
              </header>
              <div class="card__body">
                <p>Detailed documentation and live demos of the anchored popover top-layer positioning primitive.</p>
              </div>
            </article>
          </div>
        </main>
      </div>
    `;
  },
};
