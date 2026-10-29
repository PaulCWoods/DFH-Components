import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/App Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Application Header & Global Navigation Landmark Recipe

The **Application Header** recipe demonstrates how Design For Humans primitives and utility classes compose into a zero-style-tag, production-grade, accessible global navigation landmark.

---

#### 1. Composed Primitives & Architecture
- **Bypass Landmark (WCAG 2.4.1):** High-contrast \`.skip-link\` expands on focus, allowing keyboard and screen-reader users to jump straight to \`#main-content\`.
- **Header Shell:** Built with \`.header.header--sticky.header--translucent\` for seamless glassmorphism and sticky top-layer pinning.
- **Brand Lockup:** Semantic link with vector mark and prominent site title.
- **Primary Navigation:** Responsive \`<nav>\` with \`.button--subtle\` items and \`aria-current="page"\` for zero-JS active state styling.
- **Spotlight Search Invoker:** Interactive search trigger with \`⌘K\` chip and declarative \`commandfor="cmd-header-dialog" command="show-modal"\` launching the Command Palette modal.
- **Notifications Popover & Empty State:** Bell button with anchored \`.badge--top-end\` and an anchored popover featuring the \`.empty-state.empty-state--compact\` primitive when all alerts are cleared.
- **User Profile Menu Primitive:** Interactive avatar button with live \`[data-status="online"]\` ring, triggering an anchored CSS popover that renders the first-class \`.menu.menu--translucent\` primitive with keyboard shortcuts (\`⇧⌘P\`, \`⌘,\`), dark mode switch, and destructive sign-out action.
- **Responsive Mobile Navigation:** Collapses inline navigation behind an accessible \`.md:hide\` menu button (\`#Navigation\` / \`#Close\` toggle pair) that reveals an anchored stacked \`.menu\` via native HTML \`popover\`.

---

#### 2. Canonical Semantic Markup Signature

\`\`\`html
<!-- Landmark Skip Link -->
<a href="#main-content" class="skip-link"><span>Skip to main content</span></a>

<!-- Global Header Shell -->
<header class="header header--sticky header--translucent padding-block-sm">
  <div class="wrapper flex align-items-center justify-content-between flex-wrap gap-sm">
    
    <!-- Brand -->
    <a href="/" class="link inline gap-sm font-weight-bold font-size-lg underline-none">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
      <span>Design For Humans</span>
    </a>

    <!-- Primary Nav -->
    <nav aria-label="Primary navigation" class="cluster gap-none">
      <ul class="cluster gap-none">
        <li><a href="#dashboard" class="button button--subtle" aria-current="page"><span>Dashboard</span></a></li>
        <li><a href="#components" class="button button--subtle"><span>Components</span></a></li>
      </ul>
    </nav>

    <!-- Actions Cluster -->
    <div class="inline gap-sm align-items-center">
      <!-- Search Invoker -->
      <button type="button" class="button button--subtle" commandfor="cmd-dialog" command="show-modal">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
        <span>Search docs...</span>
        <kbd class="kbd">⌘K</kbd>
      </button>

      <!-- Notifications with Badge -->
      <button type="button" class="button button--icon" popovertarget="notif-popover">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
        <span class="badge badge--danger badge--sm badge--top-end"><span class="badge__text">3</span></span>
      </button>

      <!-- User Profile Menu -->
      <button type="button" class="button avatar button--avatar button--round" popovertarget="user-popover" data-status="online">
        <span>AB</span>
      </button>

      <div id="user-popover" popover class="popover">
        <menu class="menu menu--translucent" aria-label="Account options">
          <li class="menu__heading"><h3 class="micro-heading">Alex Bennett</h3></li>
          <li><button type="button" class="button"><span>Profile</span><kbd class="kbd">⇧⌘P</kbd></button></li>
          <li role="separator" class="divider"></li>
          <li><button type="button" class="button button--danger"><span>Sign Out</span></button></li>
        </menu>
      </div>
    </div>

  </div>
</header>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Standard Application Header
 * Zero-style-tag desktop and tablet navigation header with search invoker, notifications popover,
 * skip-link, and anchored user profile menu primitive.
 */
export const Standard: Story = {
  render: () => {
    const userPopoverId = 'header-user-popover';
    const userAnchorName = '--header-avatar-anchor';
    const notifPopoverId = 'header-notif-popover';
    const notifAnchorName = '--header-notif-anchor';
    const cmdDialogId = 'header-cmd-dialog';

    return `
      <div class="stack gap-0 min-h-screen bg-color-muted">
        <!-- Top Banner Skip Link (WCAG 2.4.1) -->
        <a href="#main-content" class="skip-link">
          <span>Skip to main content</span>
        </a>

        <!-- Global Header Landmark Primitive -->
        <header class="header header--sticky header--translucent padding-block-sm">
          <div class="wrapper flex align-items-center justify-content-between flex-wrap gap-sm">
            
            <!-- Left: Brand / Logo Lockup -->
            <div class="inline gap-sm align-items-center">
              <a href="/" class="link inline gap-sm font-weight-bold font-size-lg underline-none">
                <span class="icon-box icon--lg" aria-hidden="true">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
                </span>
                <span class="white-space-nowrap max-lg:visually-hidden">Design For Humans</span>
              </a>

              <span class="chip chip--sm chip--round">
                <span class="chip__text">v2.2</span>
              </span>
            </div>

            <!-- Center: Primary Navigation Links -->
            <nav aria-label="Primary navigation" class="cluster gap-none">
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

            <!-- Right: Actions Cluster (Search, Notifications, Profile Flyout) -->
            <div class="inline gap-sm align-items-center max-md:hide-labels">
              
              <!-- Spotlight / Search Trigger Button (Launches Command Palette) -->
              <button 
                type="button" 
                class="button button--subtle"
                commandfor="${cmdDialogId}"
                command="show-modal"
                onclick="document.getElementById('${cmdDialogId}').showModal();"
                aria-haspopup="dialog"
                aria-label="Search design system (Press Command+K)"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
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
                popovertarget="${notifPopoverId}"
                aria-label="Notifications (3 unread)"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <use href="#BellFilled"/>
                </svg>
                <span class="badge badge--danger badge--sm badge--top-end">
                  <span class="badge__text">3</span>
                </span>
              </button>

              <!-- Anchored Notifications Popover (Featuring Empty State when cleared) -->
              <div 
                id="${notifPopoverId}" 
                popover 
                class="popover" style="min-inline-size: 20rem;"
              >
                <article class="card card--compact card--translucent card--ruled">
                  <header class="card__header inline justify-content-between align-items-center">
                    <h3 class="card__title font-size-0">Notifications</h3>
                    <span class="badge badge--accent badge--sm"><span class="badge__text">3 New</span></span>
                  </header>
                  <div class="card__body card__body--flush">
                    <menu class="menu menu--plain" aria-label="Unread notifications">
                      <li>

                        <button type="button" class="button">
                          <svg class="icon text-accent" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                          <span class="button__text stack gap-0">
                            <span class="font-size-sm font-weight-medium">Figma sync completed</span>
                            <span class="small-text text-color-muted">746 native variables compiled</span>
                          </span>
                          <small class="small-text text-color-muted">2m</small>
                        </button>

                      </li>
                      <li>
                        <button type="button" class="button">
                          <svg class="icon text-accent" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
                          <span class="button__text stack gap-0">
                            <span class="font-size-sm font-weight-medium">WCAG AAA review passed</span>
                            <span class="small-text text-color-muted">Zero axe-core violations found</span>
                          </span>
                          <small class="small-text text-color-muted">1h</small>
                        </button>
                      </li>
                    </menu>
                  </div>
                  <footer class="card__footer inline justify-content-between align-items-center">
                    <button type="button" class="button button--subtle button--sm" onclick="this.closest('.card').querySelector('.card__body').innerHTML = '<div class=\\'empty-state empty-state--compact empty-state--flush padding-block-sm\\'><div class=\\'empty-state__visual\\'><svg class=\\'icon\\'><use href=\\'#Check\\'/></svg></div><div class=\\'empty-state__content\\'><h4 class=\\'empty-state__title\\'>All caught up!</h4><p class=\\'empty-state__description\\'>No unread notifications.</p></div></div>'; this.style.display='none';">
                      <span>Mark all read</span>
                    </button>
                    <a href="#all-notifications" class="link font-size-sm"><span>View all</span></a>
                  </footer>
                </article>
              </div>

              <!-- Profile Avatar Button with Live Status Ring (Trigger for Popover) -->
              <button 
                type="button" 
                class="button avatar button--avatar button--round" 
                popovertarget="${userPopoverId}"
                data-status="online"
                aria-label="Account menu for Alex Bennett (online)"
              >
                <span>AB</span>
              </button>

              <!-- Anchored User Profile Menu Primitive -->
              <div 
                id="${userPopoverId}" 
                popover 
                class="popover" style="min-inline-size: 18rem;"
              >
                <menu class="menu menu--translucent" aria-label="User account menu">
                  
                  <!-- User Identity Header -->
                  <li class="menu__heading inline gap-sm align-items-center">
                    <div class="avatar avatar--sm" data-status="online" aria-label="Alex Bennett (online)">
                      <span>AB</span>
                    </div>
                    <div class="stack gap-none flex-grow">
                      <span class="font-weight-medium">Alex Bennett</span>
                      <span class="small-text text-color-muted">alex.bennett@dfh.design</span>
                    </div>
                  </li>

                  <li role="separator" class="divider"></li>

                  <!-- Menu Actions with Keyboard Shortcuts -->
                  <li>
                    <button type="button" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
                      <span>Your Profile</span>
                      <kbd class="kbd">⇧⌘P</kbd>
                    </button>
                  </li>

                  <li>
                    <button type="button" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                      <span>System Preferences</span>
                      <kbd class="kbd">⌘,</kbd>
                    </button>
                  </li>

                  <li>
                    <button type="button" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bookmarked"/></svg>
                      <span>Saved Components</span>
                    </button>
                  </li>

                  <li role="separator" class="divider"></li>

                  <!-- Integrated Switch Toggle -->
                  <li>
                    <label class="switch switch--sm padding-inline-sm padding-block-xs flex justify-content-between align-items-center">
                      <span class="switch__label">Dark Mode</span>
                      <input type="checkbox" role="switch" class="visually-hidden" checked />
                      <span class="switch__control" aria-hidden="true">
                        <span class="switch__option switch__option--off">Off</span>
                        <span class="switch__option switch__option--on">On</span>
                      </span>
                    </label>
                  </li>

                  <li role="separator" class="divider"></li>

                  <!-- Destructive Sign Out -->
                  <li>
                    <button type="button" class="button button--danger">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                      <span>Sign Out</span>
                    </button>
                  </li>
                </menu>
              </div>

            </div>
          </div>
        </header>

        <!-- Command Palette Modal Invoked from Header Search -->
        <dialog id="${cmdDialogId}" class="dialog" aria-label="Command palette">
          <article class="card card--ruled card--translucent wrapper wrapper--lg">
            <header class="card__header inline gap-sm focus-within">
              <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
              <input 
                type="search" 
                class="input input--flush focus-none flex-grow" 
                role="combobox" 
                aria-expanded="true" 
                placeholder="Search components, tokens, documentation..." 
                autofocus 
              />
              <form method="dialog">
                <button type="submit" class="button button--subtle button--icon" commandfor="${cmdDialogId}" command="close" aria-label="Close command palette">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                </button>
              </form>
            </header>
            <div class="card__body card__body--flush overflow-y-auto card__body--scrollable" style="max-block-size: 20rem;">
              <menu role="listbox" class="menu menu--plain menu--ruled" aria-label="Suggestions">
                <li role="presentation" class="menu__heading micro-heading">Recent Documents</li>
                <li role="none">
                  <button type="button" class="button button--subtle is-active" role="option" aria-selected="true">
                    <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Share"/></svg>
                    <span class="button__text stack gap-none text-align-start flex-grow">
                      <span class="font-weight-medium">Button Primitive</span>
                      <span class="small-text text-color-muted">Button states, sizes and accessible toggles</span>
                    </span>
                    <kbd class="kbd">↵</kbd>
                  </button>
                </li>
                <li role="none">
                  <button type="button" class="button button--subtle" role="option" aria-selected="false">
                    <svg class="icon text-color-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                    <span class="button__text stack gap-none text-align-start flex-grow">
                      <span class="font-weight-medium">Combobox Primitive</span>
                      <span class="small-text text-color-muted">Searchable single and multi-select floating listboxes</span>
                    </span>
                    <kbd class="kbd">↵</kbd>
                  </button>
                </li>
              </menu>
            </div>
            <footer class="card__footer inline-responsive justify-content-between text-color-muted font-size-sm">
              <div class="cluster gap-sm">
                <span><kbd class="kbd">↑↓</kbd> Navigate</span>
                <span><kbd class="kbd">↵</kbd> Select</span>
                <span><kbd class="kbd">ESC</kbd> Close</span>
              </div>
              <span>Design For Humans v2.2</span>
            </footer>
          </article>
        </dialog>

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
            <article class="card">
              <header class="card__header">
                <h2 class="card__title heading">Interactive Recipe Highlights</h2>
              </header>
              <div class="card__body prose">
                <ul>
                  <li><strong>Skip Link Navigation:</strong> Click into the preview and press <kbd>Tab</kbd> to focus the high-contrast in-flow skip banner.</li>
                  <li><strong>Command Palette:</strong> Click the Search docs button or press <kbd>⌘K</kbd> to launch the top-layer spotlight dialog.</li>
                  <li><strong>Anchored Menu Primitive:</strong> Click the avatar in the top right to open the native zero-JS anchored <code>.menu</code> primitive with keyboard shortcuts and dark mode switch.</li>
                  <li><strong>Notification Popover:</strong> Click the bell button to open the notifications panel with unread items and empty state transition.</li>
                </ul>
              </div>
            </article>
          </div>
        </main>
      </div>
    `;
  },
};

/**
 * 2. Header with Breadcrumb Subnav & Collaborator Avatar Group
 * Includes a contextual breadcrumb bar below the main header, team avatar group, and quick action buttons.
 */
export const WithBreadcrumbSubnav: Story = {
  render: () => {
    const popoverId = 'subnav-user-popover';
    const anchorName = '--subnav-avatar-anchor';

    return `
      <div class="app">
        <header class="header-container header--sticky">
            
          <!-- Primary Navigation Bar -->
          <div class="header header--translucent color-palette-darker">
            <div class="wrapper flex align-items-center justify-content-between padding-block-breathe">
              <div class="cluster align-items-center gap-sm">
                <a href="/" class="link inline font-weight-bold font-size-lg underline-none">
                  <svg class="icon icon--lg" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
                  <span class="white-space-nowrap max-lg:visually-hidden">Design For Humans</span>
                </a>
              </div>

              <!-- Collaborators Avatar Group & Account Profile -->
              <div class="cluster align-items-center gap-md">
                
                <!-- Active Team Collaborators -->
                <div class="avatar-group max-sm:hide" aria-label="Active team members editing this document">
                  <div class="avatar avatar--sm" aria-label="Taylor Smith"><span>TS</span></div>
                  <div class="avatar avatar--sm" aria-label="Jordan Lee"><span>JL</span></div>
                  <div class="avatar avatar--sm" aria-label="Morgan Chen"><span>MC</span></div>
                  <div class="avatar avatar--sm" aria-label="3 other contributors"><span>+3</span></div>
                </div>

                <!-- Account Trigger & Menu -->
                <button 
                  type="button" 
                  class="button avatar button--avatar button--round" 
                  popovertarget="${popoverId}"
                  data-status="online"
                  aria-label="Account menu (online)"
                >
                  <span>AB</span>
                </button>

                <div 
                  id="${popoverId}" 
                  popover 
                  class="popover" style="min-inline-size: 16rem;"
                >
                  <menu class="menu menu--translucent" aria-label="User account menu">
                    <li class="menu__heading"><h3 class="micro-heading">Alex Bennett</h3></li>
                    <li>
                      <button type="button" class="button">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
                        <span>Profile</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" class="button">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                        <span>Preferences</span>
                      </button>
                    </li>
                    <li role="separator" class="divider"></li>
                    <li>
                      <button type="button" class="button button--danger">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </menu>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Subnav / Breadcrumb Bar -->
          <div class="header header--translucent">
            <div class="wrapper flex align-items-center justify-content-between padding-block-sm">
              <nav class="breadcrumb" aria-label="Breadcrumbs">
                <ol class="small-text">
                  <li><a href="#home" class="link"><span>Design System</span></a></li>
                  <li><a href="#components" class="link"><span>Components</span></a></li>
                  <li aria-current="page"><span>Combobox Primitive</span></li>
                </ol>
              </nav>

              <div class="cluster align-items-center gap-sm">
                <button type="button" class="button button--subtle button--sm inline gap-sm">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
                  <span>Clone Recipe</span>
                </button>
                <button type="button" class="button button--strong button--accent button--sm inline gap-sm">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                  <span>Export CSS</span>
                </button>
              </div>
            </div>
          </div>

        </header>

        <main class="main overflow-auto">
          <div class="wrapper padding-block-lg">
            <article class="card">
              <header class="card__header">
                <h1 class="card__title">Combobox Primitive Documentation</h1>
              </header>
              <div class="card__body">
                <p>Detailed documentation and live demos of the accessible searchable combobox and anchored popup listbox orchestrator.</p>
              </div>
            </article>
          </div>
        </main>
      </div>
    `;
  },
};

/**
 * 3. Responsive Collapsible Navigation Header
 * Demonstrates adaptive header navigation that collapses behind a menu toggle button below medium viewports (<= 48em / 768px).
 * Toggling the menu reveals a stacked navigation overlay using the native HTML popover primitive with zero checkbox hacks.
 */
export const ResponsiveCollapsibleNav: Story = {
  render: () => {
    const userPopoverId = 'responsive-user-popover';
    const userAnchorName = '--responsive-avatar-anchor';
    const mobileNavId = 'responsive-mobile-nav';
    const mobileNavAnchor = '--responsive-nav-toggle-anchor';

    // Progressive enhancement: sync aria-expanded on popover toggle event
    queueMicrotask(() => {
      const popover = document.getElementById(mobileNavId);
      const btn = document.querySelector(`[popovertarget="${mobileNavId}"]`);
      if (popover && btn && !popover.dataset.hasToggleListener) {
        popover.dataset.hasToggleListener = 'true';
        popover.addEventListener('toggle', (event: any) => {
          btn.setAttribute('aria-expanded', event.newState === 'open' ? 'true' : 'false');
        });
      }
    });

    return `
      <div class="stack gap-0 min-h-screen bg-color-muted">
        <!-- Top Banner Skip Link (WCAG 2.4.1) -->
        <a href="#main-content" class="skip-link">
          <span>Skip to main content</span>
        </a>

        <!-- Global Header Landmark Primitive -->
        <header class="header header--sticky header--translucent padding-block-sm">
          <div class="wrapper flex align-items-center justify-content-between flex-wrap gap-sm">
            
            <!-- Left: Brand / Logo Lockup -->
            <div class="inline gap-sm align-items-center">
              <a href="/" class="link inline gap-sm font-weight-bold font-size-lg underline-none">
                <span class="icon-box icon--lg" aria-hidden="true">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
                </span>
                <span class="white-space-nowrap max-md:visually-hidden">Design For Humans</span>
              </a>

              <span class="chip chip--sm chip--round max-md:hide">
                <span class="chip__text">v2.2</span>
              </span>
            </div>

            <!-- Center: Desktop Primary Navigation Links (Hidden on mobile / <= 48em) -->
            <nav aria-label="Primary navigation" class="cluster gap-none max-xl:hide">
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

            <!-- Right: Actions Cluster (Search, Notifications, Profile, and Mobile Menu Toggle) -->
            <div class="inline gap-sm align-items-center">
              
              <!-- Spotlight / Search Trigger Button (Hidden below sm) -->
              <button 
                type="button" 
                class="button button--subtle max-sm:hide"
                aria-label="Search design system (Press Command+K)"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <use href="#Search"/>
                </svg>
                <span class="button__text button__text--placeholder">
                  Search docs...
                  <kbd class="kbd"><span>⌘K</span></kbd>
                </span>
              </button>

              <!-- Notifications Icon Button -->
              <button 
                type="button" 
                class="button button--icon" 
                aria-label="Notifications (3 unread)"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <use href="#BellFilled"/>
                </svg>
                <span class="badge badge--danger badge--sm badge--top-end">
                  <span class="badge__text">3</span>
                </span>
              </button>

              <!-- Profile Avatar Button with Live Status Ring -->
              <button 
                type="button" 
                class="button avatar button--avatar button--round" 
                popovertarget="${userPopoverId}"
                data-status="online"
                aria-label="Account menu for Alex Bennett (online)"
              >
                <span>AB</span>
              </button>

              <!-- Anchored User Profile Menu Popover -->
              <div 
                id="${userPopoverId}" 
                popover 
                class="popover" style="min-inline-size: 16rem;"
              >
                <menu class="menu menu--translucent" aria-label="User account menu">
                  <li class="menu__heading"><h3 class="micro-heading">Alex Bennett</h3></li>
                  <li>
                    <button type="button" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
                      <span>Your Profile</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                      <span>System Preferences</span>
                    </button>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <button type="button" class="button button--danger">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                      <span>Sign Out</span>
                    </button>
                  </li>
                </menu>
              </div>

              <!-- Mobile Menu Toggle Button (Visible only below md / <= 48em) -->
              <button 
                type="button" 
                class="button button--icon xl:hide" 
                popovertarget="${mobileNavId}"
                aria-label="Toggle navigation menu"
                aria-controls="${mobileNavId}"
                aria-expanded="false"
              >
                <svg class="icon icon--off" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <use href="#Navigation"/>
                </svg>
                <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <use href="#Close"/>
                </svg>
              </button>

              <!-- Mobile Collapsible Navigation Popover (Stacked Menu Primitive) -->
              <div 
                id="${mobileNavId}" 
                popover 
                class="popover popover--end-aligned xl:hide" style="min-inline-size: 16rem;"
              >
                <menu class="menu menu--translucent" aria-label="Mobile navigation">
                  <li class="menu__heading"><h3 class="micro-heading">Navigation</h3></li>
                  <li>
                    <a href="#dashboard" class="button" aria-current="page">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg>
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a href="#components" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
                      <span>Components</span>
                    </a>
                  </li>
                  <li>
                    <a href="#tokens" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Point"/></svg>
                      <span>Design Tokens</span>
                    </a>
                  </li>
                  <li>
                    <a href="#audit" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
                      <span>A11y Audit</span>
                    </a>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <button type="button" class="button">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                      <span>Search Documentation</span>
                    </button>
                  </li>
                </menu>
              </div>

            </div>
          </div>
        </header>

        <!-- Simulated Main Page Content -->
        <main id="main-content" class="wrapper padding-block-lg">
          <div class="stack gap-lg">
            <div class="stack gap-sm">
              <h1 class="heading-1">Responsive Header Navigation</h1>
              <p class="lead-text text-color-muted">
                Adaptive application navigation collapsing behind an accessible toggle button on screens <code>&le; 48em</code> (768px).
              </p>
            </div>

            <!-- Testing & Documentation Card -->
            <article class="card">
              <header class="card__header">
                <h2 class="card__title heading">How This Recipe Operates</h2>
              </header>
              <div class="card__body prose">
                <ul>
                  <li>
                    <strong>Responsive Breakpoints:</strong> On viewports wider than <code>48em</code> (desktop), the inline navigation links are visible, and the hamburger button is hidden via <code>.md:hide</code>. On narrower viewports (mobile/tablet), the inline links are hidden via <code>.max-md:hide</code> and the toggle button is displayed.
                  </li>
                  <li>
                    <strong>Zero Checkbox Hacks:</strong> Uses native HTML <code>popover</code> and <code>popovertarget</code> for top-layer elevation and automatic light-dismiss (pressing <kbd>Esc</kbd> or clicking outside closes the menu).
                  </li>
                  <li>
                    <strong>Dynamic Icon Flip:</strong> The toggle button pairs <code>.icon--off</code> (<code>#Navigation</code> hamburger) with <code>.icon--on</code> (<code>#Close</code>). When the popover opens, the icon flips smoothly without custom JavaScript.
                  </li>
                  <li>
                    <strong>First-Class Menu Primitive:</strong> The mobile flyout uses <code>.menu.menu--translucent</code> with accessible <code>.button</code> targets and <code>.divider</code> rules.
                  </li>
                  <li>
                    <strong>Progressive Enhancement:</strong> A progressive event listener syncs <code>aria-expanded="true"</code> on the toggle button when the popover opens, ensuring 100% WCAG 2.2 AA / AAA screen-reader compatibility.
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </main>
      </div>
    `;
  },
};
