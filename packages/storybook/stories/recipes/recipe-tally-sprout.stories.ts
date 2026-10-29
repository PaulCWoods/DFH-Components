import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Tally & Sprout Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: "Tally & Sprout" Micro-Community Garden Registry & Civic Manager

**Tally & Sprout** is an accessible, web-based Civic Management and Garden Plot Registry tool engineered entirely with **Design For Humans** primitives, tokens, and zero-style-tag layout orchestrators.

---

#### 1. Composed Primitives & Architecture

- **Application Frame (\`.app\` & \`.main\`):**
  Uses the canonical Holy Grail grid structure defined in \`layout/app.css\` with fluid spacing, responsive container queries, and anchored header.

- **Garden Overview & Metric Strip (\`.grid.grid--auto-fit.grid--2xs\`):**
  High-level stat cards composed with \`.card.card--compact.card--ruled\` using token-driven auto-fit grid sizing, semantic status badges (\`.badge--success\`, \`.badge--warning\`, \`.badge--danger\`), and cistern rainwater level representations via native accessible \`<progress>\`.

- **Announcements (\`<aside class="banner-dock">\` + \`.banner\`):**
  - **Top notice:** Composes \`<aside class="banner-dock">\` with \`.banner.banner--warning\` and \`.banner__action\` for dismissible viewport notifications.
  - **Inline Callouts:** Uses \`.banner.banner--info\` and \`.banner.banner--danger\` directly inside panels, drawers, and modal validation summaries.

- **Plot Registry Directory Card (\`.card\` with contained \`.card__body--flush\`):**
  Strict card anatomy with \`<header class="card__header">\` and unified \`<div class="card__body card__body--flush">\` containing the filter toolbar, sticky data table, card grid view, and empty state.
  - **Sticky Header & Striped Rows:** Uses \`.table.table--striped.table--hover.table--sticky-header\` with token-driven column width helpers (\`.table__col--index\`, \`.table__col--sm\`, \`.table__col--md\`, \`.table__col--lg\`, \`.table__col--fit\`).
  - **Row Expansion for Soil & Environmental Telemetry:** Native expandable rows with \`aria-expanded\` toggles displaying soil pH, organic matter %, NPK telemetry, active crop rotations, and automated drip irrigation zones formatted with the semantic \`<dl class="telemetry-group">\` and \`.telemetry\` primitives.
  - **Batch Selection Bar:** Multi-select checkbox activation orchestrating contextual actions ("Send Seasonal Notice", "Mark for Winter Composting") without page reload.
  - **Filter & Search Toolbar:** Composed using \`.input.input--sm\`, \`.select.select--sm\`, and \`.button-group.buttons-subtle\` with live accessible counter announcements (\`role="status"\` & \`aria-live="polite"\`).

- **Notification Toasts (\`.toast-stack\` & \`.toast\`):**
  Uses the canonical \`.toast-stack.toast-stack--bottom-end\` primitive (the polite live region, opened once with \`showPopover()\`) holding a \`.banner.banner--success.banner--round.toast\` for non-modal feedback.

- **Multi-Step Plot Lease & Registration Modal (\`<dialog class="dialog">\`):**
  Accessible 3-step registration wizard composed inside a \`.card\` with declarative step indicator breadcrumbs, sliding scale fee radio groups, toggle switches for organic pledges, a continuous water quota slider (\`.range-lockup\`), and inline error validation with live \`role="alert"\`.

- **Communal Equipment & Notice Drawer (\`<dialog class="dialog dialog--drawer">\`):**
  Slide-over drawer panel anchored to the viewport edge via \`.dialog--drawer\`, providing live inventory status (Broadforks, Wheelbarrows, Seed Drills), overdue checkouts, and inline shed advisory callouts via \`.banner\`.

---

#### 2. WCAG 2.2 Level AA / AAA Conformance

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **1.3.1 Info & Relationships** | **A** | Semantic HTML5 landmarks (\`<header>\`, \`<main>\`, \`<section>\`, \`<aside>\`, \`<dialog>\`, \`<table>\`, \`<caption>\`, \`<th scope="col/row">\`, \`<hgroup class="card__hgroup">\`). |
| **2.1.1 Keyboard Operability** | **A** | All interactive controls (dialogs, drawers, filter toggles, expandable sub-rows) operate via standard Tab, Space, Enter, and Esc keys. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | 2px high-contrast focus rings with offset (\`--focus-ring-offset: 2px\`) across all table checkboxes, search inputs, and buttons. |
| **2.5.5 / 2.5.8 Target Sizes** | **AA/AAA** | Action buttons and inputs maintain standard 48px / compact 32px heights exceeding the 24x24px minimum touch targets. |
| **3.3.1 Error Identification** | **A** | Required form fields link to accessible error messages via \`aria-describedby\` and declare \`aria-invalid="true"\`. |
| **4.1.2 Name, Role, Value** | **A** | Sliders, switches, checkboxes, meters, and expandable rows maintain synchronized ARIA states (\`aria-expanded\`, \`aria-controls\`, \`role="switch"\`). |
| **4.1.3 Status Messages** | **AA** | Search result counts and batch selection indicators use \`role="status"\` and \`aria-live="polite"\` to inform screen reader users of asynchronous changes. |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Mock Garden Plot Data
 */
interface GardenPlot {
  id: string;
  number: string;
  type: 'Raised Bed' | 'Ground In-Soil' | 'Accessible Container';
  sunlight: 'Full Sun' | 'Partial Shade';
  gardener: {
    name: string;
    email: string;
    initials: string;
    phone: string;
  };
  soilAmendment: string;
  soilPh: number;
  organicMatter: string;
  npk: string;
  activeCrops: string;
  irrigationZone: string;
  feeStatus: 'Paid' | 'Due' | 'Overdue' | 'Exempt';
  feeDueDate: string;
  leaseEndDate: string;
}

const MOCK_PLOTS: GardenPlot[] = [
  {
    id: 'plot-1',
    number: '#A-01',
    type: 'Raised Bed',
    sunlight: 'Full Sun',
    gardener: {
      name: 'Elena Rostova',
      email: 'e.rostova@community.org',
      initials: 'ER',
      phone: '(555) 234-8901',
    },
    soilAmendment: 'Compost + Biochar (Mar 2026)',
    soilPh: 6.8,
    organicMatter: '7.4%',
    npk: 'High N / Balanced P-K',
    activeCrops: 'Heirloom Tomatoes, Sweet Basil, French Marigolds',
    irrigationZone: 'Zone A – Drip Line Active',
    feeStatus: 'Paid',
    feeDueDate: 'Paid Oct 2025',
    leaseEndDate: '30 Nov 2026',
  },
  {
    id: 'plot-2',
    number: '#A-02',
    type: 'Raised Bed',
    sunlight: 'Full Sun',
    gardener: {
      name: 'Marcus Chen',
      email: 'mchen.gardens@urbanmail.net',
      initials: 'MC',
      phone: '(555) 872-3490',
    },
    soilAmendment: 'Mycorrhizal Fungi + Leaf Mulch',
    soilPh: 6.5,
    organicMatter: '6.9%',
    npk: 'Balanced N-P-K',
    activeCrops: 'Snap Peas, Rainbow Chard, Lacinato Kale',
    irrigationZone: 'Zone A – Drip Line Active',
    feeStatus: 'Paid',
    feeDueDate: 'Paid Nov 2025',
    leaseEndDate: '30 Nov 2026',
  },
  {
    id: 'plot-3',
    number: '#B-04',
    type: 'Ground In-Soil',
    sunlight: 'Partial Shade',
    gardener: {
      name: 'Amina Al-Mansoor',
      email: 'amina.urbanroots@civic.org',
      initials: 'AA',
      phone: '(555) 431-7622',
    },
    soilAmendment: 'Mushroom Compost Top-dress',
    soilPh: 7.1,
    organicMatter: '8.2%',
    npk: 'High P / Moderate N',
    activeCrops: 'Wild Garlic, Winter Spinach, French Breakfast Radish',
    irrigationZone: 'Zone B – Micro-Sprinkler Active',
    feeStatus: 'Due',
    feeDueDate: 'Due in 12 days ($85.00)',
    leaseEndDate: '15 May 2026',
  },
  {
    id: 'plot-4',
    number: '#B-07',
    type: 'Ground In-Soil',
    sunlight: 'Full Sun',
    gardener: {
      name: 'Jordan Rivera',
      email: 'jrivera@greenleaf.net',
      initials: 'JR',
      phone: '(555) 902-1144',
    },
    soilAmendment: 'Worm Castings + Alfalfa Meal',
    soilPh: 6.6,
    organicMatter: '6.1%',
    npk: 'High N / Low K',
    activeCrops: 'Early Bush Beans, Carrots, Coriander',
    irrigationZone: 'Zone B – Drip Line Active',
    feeStatus: 'Overdue',
    feeDueDate: 'Overdue by 14 days ($85.00)',
    leaseEndDate: '01 Apr 2026',
  },
  {
    id: 'plot-5',
    number: '#C-03',
    type: 'Accessible Container',
    sunlight: 'Full Sun',
    gardener: {
      name: 'Ruth Vanderberg',
      email: 'ruth.v@seniorscivic.org',
      initials: 'RV',
      phone: '(555) 671-9920',
    },
    soilAmendment: 'Coconut Coir + Worm Castings Blend',
    soilPh: 6.7,
    organicMatter: '9.0%',
    npk: 'Slow-Release Organic',
    activeCrops: 'Strawberries, Bush Cucumbers, Thyme, Mint',
    irrigationZone: 'Zone C – Self-Watering Wicking Reservoir',
    feeStatus: 'Exempt',
    feeDueDate: 'Senior Civic Scholarship',
    leaseEndDate: '30 Nov 2026',
  },
  {
    id: 'plot-6',
    number: '#C-08',
    type: 'Accessible Container',
    sunlight: 'Partial Shade',
    gardener: {
      name: 'Derrick Thorne',
      email: 'd.thorne@outlook.com',
      initials: 'DT',
      phone: '(555) 349-2187',
    },
    soilAmendment: 'Aerated Compost Tea Top-Dress',
    soilPh: 6.9,
    organicMatter: '7.8%',
    npk: 'Balanced N-P-K',
    activeCrops: 'Sugar Snap Peas, Sweet Peppers, Lavender',
    irrigationZone: 'Zone C – Self-Watering Wicking Reservoir',
    feeStatus: 'Paid',
    feeDueDate: 'Paid Dec 2025',
    leaseEndDate: '30 Nov 2026',
  },
  {
    id: 'plot-7',
    number: '#D-02',
    type: 'Ground In-Soil',
    sunlight: 'Full Sun',
    gardener: {
      name: 'Hannah & Sam Klein',
      email: 'kleinfamily@civicgardens.net',
      initials: 'HK',
      phone: '(555) 781-4560',
    },
    soilAmendment: 'Aged Horse Manure + Green Sand',
    soilPh: 7.2,
    organicMatter: '8.5%',
    npk: 'High N / High P',
    activeCrops: 'Sweet Corn, Acorn Squash, Pole Beans (Three Sisters)',
    irrigationZone: 'Zone D – Soaker Hose Active',
    feeStatus: 'Due',
    feeDueDate: 'Due in 5 days ($85.00)',
    leaseEndDate: '30 Jun 2026',
  },
  {
    id: 'plot-8',
    number: '#D-05',
    type: 'Raised Bed',
    sunlight: 'Partial Shade',
    gardener: {
      name: 'Tariq Patel',
      email: 'tariq.p@greenmail.org',
      initials: 'TP',
      phone: '(555) 819-3301',
    },
    soilAmendment: 'Hardwood Biochar + Aged Manure',
    soilPh: 6.4,
    organicMatter: '6.7%',
    npk: 'High K / Moderate N',
    activeCrops: 'Butternut Squash, Bush Beans, Rosemary',
    irrigationZone: 'Zone D – Soaker Hose Active',
    feeStatus: 'Paid',
    feeDueDate: 'Paid Jan 2026',
    leaseEndDate: '30 Nov 2026',
  },
];

/**
 * 1. Default (Interactive Production Dashboard)
 * Fully interactive administrative dashboard testing all component primitives.
 */
export const Default: Story = {
  render: () => {
    return `
      <!-- Skip Link for Accessibility -->
      <a href="#tally-main-content" class="skip-link"><span>Skip to garden directory and dashboard</span></a>

      <div class="app" style="background-color: var(--surface); color: var(--foreground);">
        
        <!-- ================================================================== -->
        <!-- 1. Header & Civic Navigation                                      -->
        <!-- ================================================================== -->
        <header class="header header--sticky header--translucent header--borderless padding-block-xs padding-inline-md" aria-label="Garden Administration Header">
          <div class="inline justify-content-between align-items-center flex-wrap gap-sm">
            
            <!-- Left: Brand, Site Switcher & Season Badge -->
            <div class="cluster align-items-center gap-sm">
              <div class="inline align-items-center" style="--gap: var(--spacing-8);">
                <span class="avatar avatar--sm" style="--avatar-bg: var(--color-green-700, #00875a); color: #fff; font-weight: bold;" aria-hidden="true">🌱</span>
                <div class="lockup">
                  <h1 class="font-size-md font-weight-bold" style="margin: 0; line-height: var(--typography-line-height-heading, 1.2);">Tally &amp; Sprout</h1>
                  <small class="text-muted">Civic Plot Registry &amp; Micro-Garden Commons</small>
                </div>
              </div>

              <!-- Site Switcher Select -->
              <div class="inline align-items-center max-sm:hide">
                <label for="garden-site-selector" class="visually-hidden">Select Garden Site</label>
                <select id="garden-site-selector" class="select select--sm select--subtle font-weight-medium">
                  <option value="oakridge" selected>Oakridge Commons (48 Plots)</option>
                  <option value="riverside">Riverside Meadows (32 Plots)</option>
                  <option value="sunnyside">Sunnyside Urban Farm (64 Plots)</option>
                </select>
              </div>

              <!-- Season Status Badge -->
              <span class="status status--accent status--round max-md:hide">
                <span class="status__text">Spring 2026 Season Active</span>
              </span>
            </div>

            <!-- Right: Action Bar (New Lease Modal Trigger + Shared Tools Drawer Trigger) -->
            <div class="inline align-items-center gap-sm">
              <!-- Shared Tool Locker Slide-Over Trigger -->
              <button 
                type="button" 
                class="button button--subtle button--sm button--icon"
                id="btn-open-tools-drawer"
                aria-label="Open Communal Tool Locker (2 overdue notices)"
                aria-haspopup="dialog"
                style="position: relative;"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                <span class="badge badge--danger badge--sm badge--top-end" aria-hidden="true">
                  <span class="badge__text">2</span>
                </span>
              </button>

              <!-- New Plot Lease Modal Trigger -->
              <button 
                type="button" 
                class="button button--strong button--accent button--sm"
                id="btn-trigger-new-lease"
                aria-haspopup="dialog"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
                <span>New Plot Lease</span>
              </button>
            </div>

          </div>
        </header>

        <!-- ================================================================== -->
        <!-- 2. Weather & Late Frost Advisory Alert (Canonical Composition)    -->
        <!-- ================================================================== -->
        <aside class="banner-dock" aria-label="Frost warning advisory" id="frost-alert-banner">
          <div class="banner banner--warning">
            <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
            <div class="banner__body">
              <p>
                <strong>Late Frost Advisory:</strong> Ground temperatures are forecast to drop to -2°C between 02:00 and 06:00 Wednesday. Gardeners with vulnerable seedlings in Ground In-Soil beds should deploy protective horticultural fleece. Cistern drip zone B will undergo automated purge at 20:00.
              </p>
            </div>
            <button type="button" class="button button--subtle button--icon banner__action" onclick="document.getElementById('frost-alert-banner').remove();" aria-label="Dismiss notice">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
            </button>
          </div>
        </aside>

        <!-- ================================================================== -->
        <!-- 3. Main Workspace: Metrics + Directory Registry Table             -->
        <!-- ================================================================== -->
        <main class="main" id="tally-main-content" style="flex: 1 1 auto; padding: var(--spacing-16);">
          <div class="stack gap-lg">

            <!-- Section A: Overview Metric Stat Cards Strip -->
            <section aria-labelledby="metrics-heading">
              <h2 id="metrics-heading" class="visually-hidden">Garden Capacity & Operational Metrics</h2>
              
              <!-- Responsive grid: auto-fit on desktop, horizontal snap-scroller on mobile/tablet -->
              <div class="grid grid--auto-fit grid--xs grid--carousel">
                
                <!-- Stat 1: Total Plots vs Active Leases -->
                <article class="card card--compact card--ruled">
                  <header class="card__header">
                    <hgroup class="card__hgroup">
                      <h3 class="card__title subheading">Plot Occupancy</h3>
                      <p class="card__subtitle text-muted">Spring 2026 Season</p>
                    </hgroup>
                    <span class="status status--success">
                      <span class="status__text">87.5% Full</span>
                    </span>
                  </header>
                  <div class="card__body">
                    <div class="font-size-2 font-weight-bold font-mono">42 / 48</div>
                    <p class="text-muted" style="margin: 0;">Active leases (6 plots fallow / resting)</p>
                  </div>
                </article>

                <!-- Stat 2: Pending Renewal Requests -->
                <article class="card card--compact card--ruled">
                  <header class="card__header">
                    <hgroup class="card__hgroup">
                      <h3 class="card__title subheading">Pending Renewals</h3>
                      <p class="card__subtitle text-muted">Verification required</p>
                    </hgroup>
                    <span class="status status--warning">
                      <span class="status__text">Action Required</span>
                    </span>
                  </header>
                  <div class="card__body">
                    <div class="font-size-2 font-weight-bold font-mono" style="color: var(--foreground-warning, #b35900);">7 Requests</div>
                    <p class="text-muted" style="margin: 0;">Spring cycle renewals awaiting verification</p>
                  </div>
                </article>

                <!-- Stat 3: Shared Equipment on Loan -->
                <article class="card card--compact card--ruled">
                  <header class="card__header">
                    <hgroup class="card__hgroup">
                      <h3 class="card__title subheading">Tool Locker</h3>
                      <p class="card__subtitle text-muted">Shared shed inventory</p>
                    </hgroup>
                    <span class="status status--danger">
                      <span class="status__text">2 Overdue</span>
                    </span>
                  </header>
                  <div class="card__body">
                    <div class="font-size-2 font-weight-bold font-mono">5 Out</div>
                    <p class="text-muted" style="margin: 0;">12 of 17 communal tools secured in shed</p>
                  </div>
                </article>

                <!-- Stat 4: Rainwater Cistern Level -->
                <article class="card card--compact card--ruled">
                  <header class="card__header">
                    <hgroup class="card__hgroup">
                      <h3 class="card__title subheading">Cistern Reserve</h3>
                      <p class="card__subtitle text-muted">Rainwater harvest</p>
                    </hgroup>
                    <span class="chip">
                      <span class="chip__text">~18 Days</span>
                    </span>
                  </header>
                  <div class="card__body stack gap-xs">
                    <div class="inline justify-content-between align-items-center">
                      <span class="font-size-lg font-weight-bold font-mono">7,850 L</span>
                      <span class="text-muted">78% of 10,000L</span>
                    </div>
                    <progress class="progress" value="78" max="100" aria-label="Rainwater Cistern Capacity"></progress>
                  </div>
                </article>

              </div>
            </section>

            <!-- Section B: Plot Registry Directory (Filters + Table/Card Views) -->
            <!-- All content housed within canonical card__header and card__body--flush -->
            <section class="card" aria-labelledby="directory-heading" id="registry-section">
              
              <!-- Card Header: Title & View Switcher with semantic hgroup -->
              <header class="card__header inline justify-content-between align-items-center flex-wrap gap-sm">
                <hgroup class="card__hgroup">
                  <h2 id="directory-heading" class="card__title heading">Plot Registry Directory</h2>
                  <p class="card__subtitle text-muted">Browse micro-plots, lease statuses, soil amendment history, and irrigation zones.</p>
                </hgroup>

                <!-- Table vs Grid View Switcher -->
                <div class="inline align-items-center">
                  <span class="visually-hidden">View:</span>
                  <div class="button-group buttons-subtle buttons-sm" role="radiogroup" aria-label="Registry View Mode">
                    <button 
                      type="button" 
                      class="button is-active" 
                      id="view-table-btn" 
                      aria-checked="true" 
                      role="radio"
                      aria-label="Table View"
                    >
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#List"/></svg>
                      <span class="max-sm:hide">Table</span>
                    </button>
                    <button 
                      type="button" 
                      class="button" 
                      id="view-grid-btn" 
                      aria-checked="false" 
                      role="radio"
                      aria-label="Grid Cards View"
                    >
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Grid"/></svg>
                      <span class="max-sm:hide">Cards</span>
                    </button>
                  </div>
                </div>
              </header>

              <!-- Interstitial Card Band: Filter & Search Toolbar -->
              <div class="card__band">
                <div class="inline justify-content-between align-items-center flex-wrap gap-sm" style="inline-size: 100%;">
                  
                  <!-- Search Input -->
                  <div class="field" style="flex: 1 1 14rem; min-inline-size: 12rem;">
                    <label for="plot-search-input" class="visually-hidden">Search Plots</label>
                    <input 
                      type="search" 
                      id="plot-search-input" 
                      class="input input--sm input--subtle" 
                      placeholder="Search by plot # or gardener name..." 
                      style="inline-size: 100%;"
                    />
                  </div>

                  <!-- Dropdown Filters -->
                  <div class="cluster align-items-center gap-xs flex-wrap">
                    <!-- Plot Type Filter -->
                    <div>
                      <label for="filter-type" class="visually-hidden">Filter by Plot Type</label>
                      <select id="filter-type" class="select select--sm select--subtle">
                        <option value="all">All Plot Types</option>
                        <option value="Raised Bed">Raised Bed</option>
                        <option value="Ground In-Soil">Ground In-Soil</option>
                        <option value="Accessible Container">Accessible Container</option>
                      </select>
                    </div>

                    <!-- Sunlight Filter -->
                    <div>
                      <label for="filter-sunlight" class="visually-hidden">Filter by Sunlight</label>
                      <select id="filter-sunlight" class="select select--sm select--subtle">
                        <option value="all">All Sunlight</option>
                        <option value="Full Sun">Full Sun (6+ hrs)</option>
                        <option value="Partial Shade">Partial Shade (3-6 hrs)</option>
                      </select>
                    </div>

                    <!-- Status Filter -->
                    <div>
                      <label for="filter-status" class="visually-hidden">Filter by Fee & Lease Status</label>
                      <select id="filter-status" class="select select--sm select--subtle">
                        <option value="all">All Fee Statuses</option>
                        <option value="Paid">Fee Paid</option>
                        <option value="Due">Fee Due Soon</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Exempt">Exempt / Scholarship</option>
                      </select>
                    </div>

                    <!-- Clear Filters Button -->
                    <button type="button" class="button button--subtle button--sm" id="btn-reset-filters">
                      <span>Reset</span>
                    </button>
                  </div>

                  <!-- Result Counter -->
                  <div id="filter-results-announcer" role="status" aria-live="polite" class="text-muted small-text">
                    Showing <strong>${MOCK_PLOTS.length}</strong> plots
                  </div>

                </div>
              </div>

              <!-- Single Contained Card Body for all registry views and empty state -->
              <div class="card__body card__body--flush stack gap-0">

                <!-- Tabular Data View Container -->
                <div id="table-view-container" class="table-container" tabindex="0" role="region" aria-label="Community garden plot registry table">
                  <table class="table table--striped table--hover table--sticky-first-column" id="plot-data-table">
                    <caption class="visually-hidden">Community garden plot registry listing tenant leases, soil amendment statuses, and irrigation schedules.</caption>
                    <thead>
                      <tr>
                        <th scope="col" class="table__col--index">
                          <label class="choice visually-hidden" for="select-all-plots-cb">Select all rows</label>
                          <input type="checkbox" id="select-all-plots-cb" class="checkbox-input" />
                        </th>
                        <th scope="col" class="table__col--fit">Plot ID</th>
                        <th scope="col" class="table__col--fit">Plot Type</th>
                        <th scope="col" class="table__col--lg">Current Leaseholder</th>
                        <th scope="col" class="table__col--md">Sunlight & Soil</th>
                        <th scope="col" class="table__col--fit table__col--center">Fee Status</th>
                        <th scope="col" class="table__col--fit">Lease End</th>
                        <th scope="col" class="table__col--fit table__cell--center"><span class="visually-hidden">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody id="plot-table-body">
                      ${MOCK_PLOTS.map((plot) => {
    const statusBadgeClass =
      plot.feeStatus === 'Paid'
        ? 'badge--success'
        : plot.feeStatus === 'Due'
          ? 'badge--warning'
          : plot.feeStatus === 'Overdue'
            ? 'badge--danger'
            : 'badge--accent';

    return `
                          <tr class="plot-row" data-id="${plot.id}" data-type="${plot.type}" data-sunlight="${plot.sunlight}" data-status="${plot.feeStatus}">
                            <!-- Checkbox Column -->
                            <td class="table__col--index">
                              <label class="choice visually-hidden" for="cb-${plot.id}">Select plot ${plot.number}</label>
                              <input type="checkbox" id="cb-${plot.id}" class="checkbox-input plot-checkbox" data-plot-id="${plot.id}" />
                            </td>

                            <!-- Plot Number (Fit to prevent wrapping IDs) -->
                            <td class="table__col--fit">
                              <strong class="font-mono text-accent">${plot.number}</strong>
                            </td>

                            <!-- Plot Type -->
                            <td class="table__col--fit">
                              <span class="chip chip--subtle chip--sm"><span class="chip__text">${plot.type}</span></span>
                            </td>

                            <!-- Gardener Contact -->
                            <td class="table__col--lg">
                              <div class="inline align-items-center" style="--gap: var(--spacing-8);">
                                <div class="avatar avatar--sm" aria-hidden="true"><span>${plot.gardener.initials}</span></div>
                                <div class="lockup">
                                  <b>${plot.gardener.name}</b>
                                  <small class="text-muted">${plot.gardener.email}</small>
                                </div>
                              </div>
                            </td>

                            <!-- Sunlight & Soil Note -->
                            <td class="table__col--md">
                              <div class="lockup">
                                <b>${plot.sunlight}</b>
                                <small class="text-muted" style="max-inline-size: 14rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                  ${plot.soilAmendment}
                                </small>
                              </div>
                            </td>

                            <!-- Fee Status Badge (Standalone centered discrete pill) -->
                            <td class="table__col--fit table__col--center">
                              <span class="status ${statusBadgeClass}">
                                <span class="status__text">${plot.feeStatus}</span>
                              </span>
                            </td>

                            <!-- Lease End Date & Due Schedule (Fit to prevent wrapping dates) -->
                            <td class="table__col--fit">
                              <div class="lockup">
                                <b class="font-mono">${plot.leaseEndDate}</b>
                                <small class="text-muted">${plot.feeDueDate}</small>
                              </div>
                            </td>

                            <!-- Action Column: Expand Details & Row Options Menu -->
                            <td class="table__col--fit table__cell--center">
                              <button 
                                type="button" 
                                class="button button--plain button--icon button--sm btn-toggle-subrow"
                                aria-expanded="false"
                                aria-controls="subrow-${plot.id}"
                                aria-label="Toggle soil test history for plot ${plot.number}"
                              >
                                <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
                              </button>
                            </td>
                          </tr>

                          <!-- Expandable Sub-Row (Telemetry & Amendment Logs) -->
                          <tr id="subrow-${plot.id}" class="plot-subrow" hidden>
                            <td colspan="8" class="padding-0" style="background-color: var(--surface-translucent, transparent);">
                              <div class="padding-md stack gap-sm" style="border-inline-start: 4px solid var(--border-color-accent, currentColor);">
                                <div class="inline justify-content-between align-items-center flex-wrap gap-xs">
                                  <strong class="text-accent">Soil Chemistry & Microclimate Telemetry for Plot ${plot.number}</strong>
                                  <span class="chip chip--sm"><span class="chip__text">${plot.irrigationZone}</span></span>
                                </div>

                                <!-- Soil Telemetry responsive grid using DFH Telemetry Primitive (<dl class="telemetry-group">) -->
                                <dl class="telemetry-group grid grid--auto-fit grid--2xs" aria-label="Soil chemistry and telemetry for plot ${plot.number}">
                                  <div class="telemetry telemetry--stacked telemetry--bordered">
                                    <dt class="telemetry__label">Soil pH</dt>
                                    <dd class="telemetry__value font-mono">${plot.soilPh} <span class="text-muted font-weight-normal font-sans">(Neutral)</span></dd>
                                  </div>
                                  <div class="telemetry telemetry--stacked telemetry--bordered">
                                    <dt class="telemetry__label">Organic Matter</dt>
                                    <dd class="telemetry__value font-mono">${plot.organicMatter}</dd>
                                  </div>
                                  <div class="telemetry telemetry--stacked telemetry--bordered">
                                    <dt class="telemetry__label">Nutrient Profile (N-P-K)</dt>
                                    <dd class="telemetry__value font-sans font-weight-medium">${plot.npk}</dd>
                                  </div>
                                  <div class="telemetry telemetry--stacked telemetry--bordered">
                                    <dt class="telemetry__label">Gardener Phone</dt>
                                    <dd class="telemetry__value font-mono">${plot.gardener.phone}</dd>
                                  </div>
                                </dl>

                                <div class="padding-block-xs" style="border-block-start: 1px dashed var(--border-color-quiet, currentColor);">
                                  <span class="text-muted"><strong>Current Active Crops:</strong> ${plot.activeCrops}</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        `;
  }).join('')}
                    </tbody>
                  </table>
                </div>

                <!-- Alternative Card Grid View (Hidden by default, activated via switcher) -->
                <!-- Uses token-driven column width modifier (grid--xs) -->
                <div id="grid-view-container" class="padding-md" style="display: none;">
                  <div class="grid grid--auto-fit grid--xs">
                    ${MOCK_PLOTS.map((plot) => `
                      <article class="card card--compact plot-grid-card" data-id="${plot.id}" data-type="${plot.type}" data-sunlight="${plot.sunlight}" data-status="${plot.feeStatus}">
                        <header class="card__header inline justify-content-between align-items-center bg-subtle">
                          <hgroup class="card__hgroup">
                            <h3 class="card__title small-heading">${plot.number}</h3>
                            <p class="card__subtitle text-muted small-text">${plot.type}</p>
                          </hgroup>
                          <span class="status ${plot.feeStatus === 'Paid' ? 'status--success' : plot.feeStatus === 'Due' ? 'status--warning' : plot.feeStatus === 'Overdue' ? 'status--danger' : 'status--accent'}">
                            <span class="status__text">${plot.feeStatus}</span>
                          </span>
                        </header>
                        <div class="card__body stack gap-xs">
                          <div class="inline align-items-center">
                            <span class="chip chip--subtle chip--sm"><span class="chip__text">${plot.type}</span></span>
                            <span class="chip chip--subtle chip--sm"><span class="chip__text">${plot.sunlight}</span></span>
                          </div>
                          <div class="inline align-items-center margin-block-start-xs" style="--gap: var(--spacing-8);">
                            <div class="avatar avatar--sm" aria-hidden="true"><span>${plot.gardener.initials}</span></div>
                            <div class="lockup">
                              <b>${plot.gardener.name}</b>
                              <small class="text-muted">${plot.gardener.email}</small>
                            </div>
                          </div>
                          <div class="text-muted margin-block-start-xs">
                            <strong>Crops:</strong> ${plot.activeCrops}
                          </div>
                        </div>
                        <footer class="card__footer inline justify-content-between align-items-center">
                          <span class="font-mono text-muted font-size-sm">Expires: ${plot.leaseEndDate}</span>
                          <button type="button" class="button button--subtle button--sm" onclick="alert('Viewing Plot ${plot.number}')">
                            <span>View Plot</span>
                          </button>
                        </footer>
                      </article>
                    `).join('')}
                  </div>
                </div>

                <!-- Empty State Block (Displayed when filters match zero items) -->
                <div id="filter-empty-state" class="empty-state padding-block-xl text-center" style="display: none;">
                  <div class="empty-state__icon margin-inline-auto" aria-hidden="true" style="inline-size: 3rem; block-size: 3rem;">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                  </div>
                  <h3 class="empty-state__title font-size-md font-weight-bold margin-block-start-sm">No garden plots match your search</h3>
                  <p class="empty-state__description font-size-sm text-muted margin-block-start-xs">
                    Try adjusting or clearing your query, plot type, or fee status filters.
                  </p>
                  <div class="empty-state__actions margin-block-start-md">
                    <button type="button" class="button button--sm" id="btn-empty-reset">
                      <span>Clear All Filters</span>
                    </button>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </main>

        <!-- ================================================================== -->
        <!-- 4. Multi-Step Plot Lease & Registration Modal Dialog              -->
        <!-- ================================================================== -->
        <dialog id="new-lease-dialog" class="dialog" aria-labelledby="lease-dialog-title" aria-describedby="lease-dialog-desc">
          <article class="card">
            
            <!-- Modal Header & Close Button with semantic hgroup -->
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h2 id="lease-dialog-title" class="card__title heading">New Garden Plot Lease Registration</h2>
                <p id="lease-dialog-desc" class="card__subtitle text-muted">Register a civic plot leaseholder, agree to cultivating bylaws, and calculate seasonal fees.</p>
              </hgroup>
              <form method="dialog">
                <button type="submit" class="button button--plain button--icon button--sm" aria-label="Close registration modal">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                </button>
              </form>
            </header>

            <!-- Interstitial Card Band: Wizard Step Progress Indicator -->
            <div class="card__band card__band--subtle">
              <ol class="stepper stepper--compact" aria-label="Registration steps">
                <li id="nav-step-1" class="stepper__item" aria-current="step">
                  <div class="stepper__step">
                    <span class="stepper__indicator micro-heading" aria-hidden="true">1</span>
                    <span class="stepper__title small-heading"><span class="visually-hidden">Current: </span>Plot &amp; Gardener</span>
                  </div>
                </li>
                <li id="nav-step-2" class="stepper__item">
                  <div class="stepper__step">
                    <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
                    <span class="stepper__title small-heading"><span class="visually-hidden"></span>Growing Agreement</span>
                  </div>
                </li>
                <li id="nav-step-3" class="stepper__item">
                  <div class="stepper__step">
                    <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
                    <span class="stepper__title small-heading"><span class="visually-hidden"></span>Fee Schedule</span>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Modal Form Body -->
            <div class="card__body stack card__body--scrollable">
              
              <!-- Live Error Summary Callout using canonical Banner primitive -->
              <div id="modal-validation-summary" class="banner banner--danger" role="alert" style="display: none;">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Error"/></svg></span>
                <div class="banner__body">
                  <p><strong>Please resolve the following before proceeding:</strong></p>
                  <ul class="margin-block-start-xs padding-inline-start-sm" id="modal-error-list"></ul>
                </div>
              </div>

              <!-- STEP 1: Plot & Leaseholder Contact -->
              <div id="step-pane-1" class="form">
                <div class="field">
                  <label for="new-plot-select" class="field__label">Available Plot Assignment <span class="text-danger" aria-hidden="true">*</span></label>
                  <select id="new-plot-select" class="select" required aria-describedby="plot-picker-hint">
                    <option value="">-- Choose an available plot --</option>
                    <option value="A-03">Plot #A-03 • Raised Bed (Full Sun - 120 sq ft)</option>
                    <option value="B-02">Plot #B-02 • Ground In-Soil (Partial Shade - 200 sq ft)</option>
                    <option value="C-05">Plot #C-05 • Accessible Container (Full Sun - Elevated 32")</option>
                    <option value="D-04">Plot #D-04 • Ground In-Soil (Full Sun - 180 sq ft)</option>
                  </select>
                  <p id="plot-picker-hint" class="field__hint">Only vacant and rested plots for the 2026 season are listed.</p>
                </div>

                <div class="inline-responsive inline-responsive--xs fields-inline">
                  <div class="field">
                    <label for="gardener-name" class="field__label">Full Legal Name <span class="text-danger" aria-hidden="true">*</span></label>
                    <input id="gardener-name" type="text" class="input" placeholder="e.g., Samantha Cruz" required />
                  </div>
                  <div class="field">
                    <label for="gardener-email" class="field__label">Email Address <span class="text-danger" aria-hidden="true">*</span></label>
                    <input id="gardener-email" type="email" class="input" placeholder="s.cruz@domain.org" required />
                  </div>
                </div>

                <div class="field">
                  <label for="gardener-phone" class="field__label">Contact Telephone Number</label>
                  <input id="gardener-phone" type="tel" class="input" placeholder="(555) 000-0000" />
                </div>

                <label class="choice margin-block-start-xs">
                  <input type="checkbox" id="residency-verified" class="checkbox-input" required />
                  <span class="choice__label">
                    <strong>Municipal Resident Verification:</strong> Leaseholder resides within Ward 4 / Oakridge School District (qualifies for standard municipal subsidy).
                  </span>
                </label>
              </div>

              <!-- STEP 2: Growing Agreement & Conditions -->
              <div id="step-pane-2" class="form" style="display: none;">
                
                <!-- Organic Pledge Toggle Switch -->
                <label class="switch">
                  <span class="switch__label">
                    <strong>Organic Cultivation Pledge</strong>
                    <small>Commit to 100% organic methods. Synthetic chemical pesticides, glyphosate, and artificial fertilizers are strictly prohibited.</small>
                  </span>
                  <input type="checkbox" role="switch" class="visually-hidden" checked id="switch-organic-pledge" />
                  <span class="switch__control" aria-hidden="true">
                    <span class="switch__option switch__option--off">Off</span>
                    <span class="switch__option switch__option--on">On</span>
                  </span>
                </label>

                <hr class="divider" />

                <!-- Communal Compost Duty Opt-In -->
                <label class="switch">
                  <span class="switch__label">
                    <strong>Communal Compost Working Group (2 hrs/mo)</strong>
                    <small>Contribute 2 volunteer hours monthly to pile turning, temperature logging, and sifting in exchange for free compost allocation.</small>
                  </span>
                  <input type="checkbox" role="switch" class="visually-hidden" checked id="switch-compost-duty" />
                  <span class="switch__control" aria-hidden="true">
                    <span class="switch__option switch__option--off">Off</span>
                    <span class="switch__option switch__option--on">On</span>
                  </span>
                </label>

                <hr class="divider" />

                <!-- Monthly Water Quota Range Slider -->
                <div class="field">
                  <div class="inline justify-content-between align-items-center">
                    <label for="water-quota-slider" class="field__label">Monthly Drip Irrigation Quota Allotment</label>
                    <output for="water-quota-slider" id="water-readout" class="font-size-sm font-weight-bold font-mono text-accent">350 Litres</output>
                  </div>
                  <p class="field__hint" id="water-hint">Baseline allowance is 350L/month per 100 sq ft plot during peak dry summer months.</p>
                  <div class="range-lockup range-lockup--sm margin-block-start-xs">
                    <input 
                      type="range" 
                      class="range range--sm" 
                      id="water-quota-slider" 
                      min="150" 
                      max="600" 
                      step="25" 
                      value="350" 
                      style="--value: 44%;"
                      aria-describedby="water-hint"
                      oninput="this.style.setProperty('--value', ((this.value - this.min)/(this.max - this.min)*100) + '%'); document.getElementById('water-readout').textContent = this.value + ' Litres';"
                    />
                  </div>
                </div>

              </div>

              <!-- STEP 3: Fee Calculation & Schedule -->
              <div id="step-pane-3" class="stack gap-md" style="display: none;">
                
                <!-- Sliding Scale Tier Radio Group -->
                <fieldset class="fieldset">
                  <legend class="legend font-weight-bold">Sliding Scale Annual Lease Tier</legend>
                  <div class="choices">
                    <label class="choice" for="tier-subsidized">
                      <input type="radio" id="tier-subsidized" name="lease-tier" class="radio-input" value="35" />
                      <span class="choice__label">
                        <strong>Civic Subsidized Tier ($35.00/yr)</strong>
                        <small class="text-muted">For students, seniors, and low-income households</small>
                      </span>
                    </label>

                    <label class="choice" for="tier-standard">
                      <input type="radio" id="tier-standard" name="lease-tier" class="radio-input" value="85" checked />
                      <span class="choice__label">
                        <strong>Standard Resident Rate ($85.00/yr)</strong>
                        <small class="text-muted">Standard annual membership with water & tool locker access</small>
                      </span>
                    </label>

                    <label class="choice" for="tier-sponsor">
                      <input type="radio" id="tier-sponsor" name="lease-tier" class="radio-input" value="150" />
                      <span class="choice__label">
                        <strong>Community Garden Patron ($150.00/yr)</strong>
                        <small class="text-muted">Includes direct sponsorship for accessible raised beds</small>
                      </span>
                    </label>
                  </div>
                </fieldset>

                <hr class="divider" />

                <!-- Key Deposit Checkbox -->
                <label class="choice">
                  <input type="checkbox" id="key-deposit-cb" class="checkbox-input" checked />
                  <span class="choice__label">
                    <strong>Water Shed Brass Key Deposit (+$25.00)</strong>
                    <small class="text-muted">Fully refundable upon surrender of plot key at season conclusion</small>
                  </span>
                </label>

                <!-- Renewal Date Term -->
                <div class="field">
                  <label for="lease-term-end" class="field__label">Lease Season Expiration Date</label>
                  <input type="date" id="lease-term-end" class="input" value="2026-11-30" />
                </div>

                <!-- Fee Calculation Summary Card -->
                <div class="card card--compact card--translucent inline justify-content-between align-items-center" style="background-color: var(--surface-translucent, transparent);">
                  <div>
                    <span class="micro-heading text-muted">Total Due for 2026 Season</span>
                    <div class="text-muted" id="fee-breakdown-text">Base rate: $85.00 + Key deposit: $25.00</div>
                  </div>
                  <div class="font-size-2 font-weight-bold font-mono text-accent" id="fee-total-display">$110.00</div>
                </div>

              </div>

            </div>

            <!-- Modal Footer Navigation Actions -->
            <footer class="card__footer">
              <div class="button-group button-group--fill">
                <button type="button" class="button button--plain" id="btn-wizard-prev" style="visibility: hidden;">
                  <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowLeft"/></svg>
                  <span>Back</span>
                </button>

                <button type="button" class="button button-group__end" onclick="document.getElementById('new-lease-dialog').close();">
                  <span>Cancel</span>
                </button>
                <button type="button" class="button button--strong button--accent" id="btn-wizard-next">
                  <span>Continue to Agreement &rarr;</span>
                </button>
              </div>
            </footer>

          </article>
        </dialog>

        <!-- ================================================================== -->
        <!-- 5. Shared Equipment / Notice Drawer (Slide-Over Panel)            -->
        <!-- ================================================================== -->
        <dialog id="equipment-drawer" class="dialog dialog--drawer" aria-labelledby="drawer-heading">
          <article class="card" style="inline-size: 100%; block-size: 100%; block-size: 100%; display: flex; flex-direction: column;">
            
            <!-- Drawer Header with semantic hgroup -->
            <header class="card__header inline justify-content-between align-items-center padding-md" style="border-block-end: 1px solid var(--border-color-quiet, currentColor);">
              <hgroup class="card__hgroup">
                <h2 id="drawer-heading" class="card__title">Communal Tool Locker & Shed Inventory</h2>
                <p class="card__subtitle text-muted">Track shared equipment loans, maintenance status, and shed access.</p>
              </hgroup>
              <form method="dialog">
                <button type="submit" class="button button--plain button--icon button--sm" aria-label="Close tool locker drawer">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                </button>
              </form>
            </header>

            <!-- Drawer Content List -->
            <div class="card__body stack gap-sm padding-md card__body--scrollable" style="flex: 1 1 auto; overflow-y: auto;">
              
              <!-- Notice Callout: Shed Lock Code using canonical Banner primitive -->
              <div class="banner banner--info">
                <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
                <div class="banner__body">
                  <p><strong>Spring Padlock Combination: 4-8-1-2</strong></p>
                  <p class="text-muted">Please scramble the dial after securing the double doors. Do not leave the hose bib key outside.</p>
                </div>
              </div>

              <!-- Tool 1: Broadfork Heavy-Duty -->
              <div class="card card--compact stack gap-xs">
                <div class="inline justify-content-between align-items-center">
                  <strong>DeWit 5-Tine Broadfork</strong>
                  <span class="status status--success"><span class="status__text">In Shed</span></span>
                </div>
                <p class="text-muted" style="margin: 0;">Located in Tool Bay 1 (Left wall rack). Available for bed aerating.</p>
              </div>

              <!-- Tool 2: Heavy-Duty Wheelbarrow (Checked Out) -->
              <div class="card card--compact stack gap-xs">
                <div class="inline justify-content-between align-items-center">
                  <strong>Dual-Wheel Compost Barrow #2</strong>
                  <span class="status status--warning"><span class="status__text">Checked Out</span></span>
                </div>
                <p class="text-muted" style="margin: 0;">On loan to <strong>Plot #A-04 (Elena R.)</strong> • Due Today by 17:00</p>
              </div>

              <!-- Tool 3: Earthway Precision Garden Seeder (OVERDUE) -->
              <div class="card card--compact stack gap-xs" style="border-color: var(--border-color-danger, #d32f2f);">
                <div class="inline justify-content-between align-items-center">
                  <strong>Earthway Precision Push Seeder</strong>
                  <span class="status status--danger"><span class="status__text">2 Days Overdue</span></span>
                </div>
                <p class="text-muted" style="margin: 0;">Borrowed by <strong>Plot #C-02</strong> on Monday 09:00.</p>
                <div class="inline justify-content-end margin-block-start-xs">
                  <button type="button" class="button button--subtle button--danger button--sm" onclick="alert('Automated reminder notification sent to borrower.');">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Email"/></svg>
                    <span>Send Overdue Ping</span>
                  </button>
                </div>
              </div>

              <!-- Tool 4: Rotary Compost Soil Sifter -->
              <div class="card card--compact stack gap-xs">
                <div class="inline justify-content-between align-items-center">
                  <strong>1/4" Mesh Rotary Trommel Sifter</strong>
                  <span class="status status--success"><span class="status__text">In Shed</span></span>
                </div>
                <p class="text-muted" style="margin: 0;">Located at East Compost Station. Cleared for communal sift day.</p>
              </div>

              <!-- Tool 5: Backpack Pressure Sprayer (Organic Only) -->
              <div class="card card--compact stack gap-xs">
                <div class="inline justify-content-between align-items-center">
                  <strong>15L Organic Neem & Compost Tea Sprayer</strong>
                  <span class="status status--warning"><span class="status__text">Maintenance</span></span>
                </div>
                <p class="text-muted" style="margin: 0;">Gasket replacement underway. Do not fill until Friday.</p>
              </div>

            </div>

            <!-- Drawer Footer -->
            <footer class="card__footer inline justify-content-end padding-md" style="border-block-start: 1px solid var(--border-color-quiet, currentColor);">
              <form method="dialog">
                <button type="submit" class="button button--sm">
                  <span>Close Locker</span>
                </button>
              </form>
            </footer>

          </article>
        </dialog>

        <!-- ================================================================== -->
        <!-- 6. Feedback Toast Notification (DFH Toast Primitive)              -->
        <!-- ================================================================== -->
        <div class="toast-stack toast-stack--bottom-end" popover="manual" role="status" aria-label="Notifications" id="tally-toast-stack">
          <div class="banner banner--success banner--round toast" id="tally-toast" hidden>
            <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
            <div class="banner__body">
              <p class="text font-bold" id="toast-title">Success</p>
              <p class="small-text" id="toast-message">Action recorded.</p>
            </div>
            <button 
              type="button" 
              class="button button--subtle button--icon banner__action" 
              onclick="document.getElementById('tally-toast').hidden = true;" 
              aria-label="Dismiss notification"
            >
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
            </button>
          </div>
        </div>

        <!-- Floating batch actions (shown while plot rows are selected) -->
        <div id="batch-action-bar" class="batch-actions" role="group" aria-label="Selected plots" hidden>
          <p class="batch-actions__summary small-heading" role="status" id="batch-counter-text">0 plots selected</p>

          <hr class="divider" aria-hidden="true" />

          <div class="batch-actions__actions button-group buttons-plain">
            <button type="button" class="button" id="btn-batch-email">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Email"/></svg>
              <span>Email Notice</span>
            </button>
            <button type="button" class="button" id="btn-batch-compost">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Clipboard"/></svg>
              <span>Mark Compost</span>
            </button>
            <button type="button" class="button" id="btn-batch-export">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
              <span>Export CSV</span>
            </button>
          </div>

          <hr class="divider" aria-hidden="true" />

          <button type="button" class="button button--plain button--icon batch-actions__dismiss" id="btn-batch-deselect">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
            <span class="visually-hidden">Clear plot selection</span>
          </button>
        </div>

      </div>

      <!-- ================================================================== -->
      <!-- 7. Interactive Client-Side Orchestration Script                   -->
      <!-- ================================================================== -->
      <script>
        (() => {
          // Toast helper: the stack is the live region, opened once so it is in
          // the page before any message arrives. A toast stays 5 seconds and
          // pauses while hovered or focused.
          const toastStack = document.getElementById('tally-toast-stack');
          const toast = document.getElementById('tally-toast');
          let toastTimer;
          const armToast = () => { clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 5000); };
          if (toastStack && toast) {
            toastStack.showPopover();
            toast.addEventListener('pointerenter', () => clearTimeout(toastTimer));
            toast.addEventListener('focusin', () => clearTimeout(toastTimer));
            toast.addEventListener('pointerleave', armToast);
            toast.addEventListener('focusout', armToast);
          }
          function showToast(title, message) {
            if (!toast) return;
            document.getElementById('toast-title').textContent = title;
            document.getElementById('toast-message').textContent = message;
            toast.hidden = false;
            armToast();
          }

          // Trigger Modal Dialogs
          const btnTriggerLease = document.getElementById('btn-trigger-new-lease');
          const leaseDialog = document.getElementById('new-lease-dialog');
          if (btnTriggerLease && leaseDialog) {
            btnTriggerLease.addEventListener('click', () => {
              leaseDialog.showModal();
            });
          }

          const btnTriggerTools = document.getElementById('btn-open-tools-drawer');
          const toolsDrawer = document.getElementById('equipment-drawer');
          if (btnTriggerTools && toolsDrawer) {
            btnTriggerTools.addEventListener('click', () => {
              toolsDrawer.showModal();
            });
          }

          // Expandable Sub-Rows
          document.querySelectorAll('.btn-toggle-subrow').forEach((btn) => {
            btn.addEventListener('click', () => {
              const targetId = btn.getAttribute('aria-controls');
              const subrow = document.getElementById(targetId);
              if (!subrow) return;
              const isExpanded = btn.getAttribute('aria-expanded') === 'true';
              btn.setAttribute('aria-expanded', !isExpanded);
              subrow.hidden = isExpanded;
            });
          });

          // Table / Cards View Switcher
          const viewTableBtn = document.getElementById('view-table-btn');
          const viewGridBtn = document.getElementById('view-grid-btn');
          const tableView = document.getElementById('table-view-container');
          const gridView = document.getElementById('grid-view-container');

          if (viewTableBtn && viewGridBtn && tableView && gridView) {
            viewTableBtn.addEventListener('click', () => {
              viewTableBtn.classList.add('is-active');
              viewTableBtn.setAttribute('aria-checked', 'true');
              viewGridBtn.classList.remove('is-active');
              viewGridBtn.setAttribute('aria-checked', 'false');
              tableView.style.display = 'block';
              gridView.style.display = 'none';
            });

            viewGridBtn.addEventListener('click', () => {
              viewGridBtn.classList.add('is-active');
              viewGridBtn.setAttribute('aria-checked', 'true');
              viewTableBtn.classList.remove('is-active');
              viewTableBtn.setAttribute('aria-checked', 'false');
              tableView.style.display = 'none';
              gridView.style.display = 'block';
            });
          }

          // Search & Multi-Filter Engine
          const searchInput = document.getElementById('plot-search-input');
          const typeSelect = document.getElementById('filter-type');
          const sunlightSelect = document.getElementById('filter-sunlight');
          const statusSelect = document.getElementById('filter-status');
          const resetFiltersBtn = document.getElementById('btn-reset-filters');
          const emptyResetBtn = document.getElementById('btn-empty-reset');
          const announcer = document.getElementById('filter-results-announcer');
          const emptyState = document.getElementById('filter-empty-state');

          function applyFilters() {
            const query = (searchInput?.value || '').trim().toLowerCase();
            const selectedType = typeSelect?.value || 'all';
            const selectedSunlight = sunlightSelect?.value || 'all';
            const selectedStatus = statusSelect?.value || 'all';

            const rows = document.querySelectorAll('.plot-row');
            const cards = document.querySelectorAll('.plot-grid-card');
            let visibleCount = 0;

            rows.forEach((row) => {
              const textContent = row.textContent?.toLowerCase() || '';
              const rowType = row.dataset.type || '';
              const rowSunlight = row.dataset.sunlight || '';
              const rowStatus = row.dataset.status || '';

              const matchesQuery = !query || textContent.includes(query);
              const matchesType = selectedType === 'all' || rowType === selectedType;
              const matchesSunlight = selectedSunlight === 'all' || rowSunlight === selectedSunlight;
              const matchesStatus = selectedStatus === 'all' || rowStatus === selectedStatus;

              const isVisible = matchesQuery && matchesType && matchesSunlight && matchesStatus;
              row.style.display = isVisible ? '' : 'none';

              // Also hide the associated expandable sub-row if main row is hidden
              const rowId = row.dataset.id;
              const subrow = document.getElementById('subrow-' + rowId);
              if (subrow && !isVisible) {
                subrow.hidden = true;
                const toggleBtn = row.querySelector('.btn-toggle-subrow');
                if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
              }

              if (isVisible) visibleCount++;
            });

            cards.forEach((card) => {
              const textContent = card.textContent?.toLowerCase() || '';
              const cardType = card.dataset.type || '';
              const cardSunlight = card.dataset.sunlight || '';
              const cardStatus = card.dataset.status || '';

              const matchesQuery = !query || textContent.includes(query);
              const matchesType = selectedType === 'all' || cardType === selectedType;
              const matchesSunlight = selectedSunlight === 'all' || cardSunlight === selectedSunlight;
              const matchesStatus = selectedStatus === 'all' || cardStatus === selectedStatus;

              card.style.display = matchesQuery && matchesType && matchesSunlight && matchesStatus ? '' : 'none';
            });

            // Update Announcer
            if (announcer) {
              announcer.innerHTML = 'Showing <strong>' + visibleCount + '</strong> plots';
            }

            // Toggle Empty State
            if (emptyState && tableView && gridView) {
              if (visibleCount === 0) {
                emptyState.style.display = 'block';
                tableView.style.display = 'none';
                gridView.style.display = 'none';
              } else {
                emptyState.style.display = 'none';
                const isTableSelected = viewTableBtn?.classList.contains('is-active');
                tableView.style.display = isTableSelected ? 'block' : 'none';
                gridView.style.display = isTableSelected ? 'none' : 'block';
              }
            }
          }

          [searchInput, typeSelect, sunlightSelect, statusSelect].forEach((el) => {
            if (el) {
              el.addEventListener('input', applyFilters);
              el.addEventListener('change', applyFilters);
            }
          });

          function resetFilters() {
            if (searchInput) searchInput.value = '';
            if (typeSelect) typeSelect.value = 'all';
            if (sunlightSelect) sunlightSelect.value = 'all';
            if (statusSelect) statusSelect.value = 'all';
            applyFilters();
          }

          if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
          if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetFilters);

          // Batch Selection Checkbox Management
          const selectAllCb = document.getElementById('select-all-plots-cb');
          const batchBar = document.getElementById('batch-action-bar');
          const batchText = document.getElementById('batch-counter-text');
          const rowCheckboxes = document.querySelectorAll('.plot-checkbox');

          function updateBatchBar() {
            const checkedBoxes = Array.from(rowCheckboxes).filter((cb) => cb.checked);
            const count = checkedBoxes.length;
            if (batchBar && batchText) {
              batchBar.hidden = count === 0;
              if (count > 0) batchText.textContent = count === 1 ? '1 plot selected' : count + ' plots selected';
            }
            if (selectAllCb) {
              selectAllCb.checked = count === rowCheckboxes.length && count > 0;
              selectAllCb.indeterminate = count > 0 && count < rowCheckboxes.length;
            }
          }

          if (selectAllCb) {
            selectAllCb.addEventListener('change', () => {
              rowCheckboxes.forEach((cb) => {
                const parentRow = cb.closest('.plot-row');
                if (parentRow && parentRow.style.display !== 'none') {
                  cb.checked = selectAllCb.checked;
                }
              });
              updateBatchBar();
            });
          }

          rowCheckboxes.forEach((cb) => {
            cb.addEventListener('change', updateBatchBar);
          });

          document.getElementById('btn-batch-deselect')?.addEventListener('click', () => {
            rowCheckboxes.forEach((cb) => { cb.checked = false; });
            if (selectAllCb) {
              selectAllCb.checked = false;
              selectAllCb.indeterminate = false;
            }
            updateBatchBar();
          });

          document.getElementById('btn-batch-email')?.addEventListener('click', () => {
            const count = Array.from(rowCheckboxes).filter((cb) => cb.checked).length;
            showToast('Email Dispatch', 'Notice dispatched to ' + count + ' garden plot leaseholders.');
          });

          document.getElementById('btn-batch-compost')?.addEventListener('click', () => {
            const count = Array.from(rowCheckboxes).filter((cb) => cb.checked).length;
            showToast('Compost Scheduled', count + ' plots marked for seasonal biochar & compost amendment.');
          });

          document.getElementById('btn-batch-export')?.addEventListener('click', () => {
            const count = Array.from(rowCheckboxes).filter((cb) => cb.checked).length;
            showToast('Export Ready', 'Exported CSV record for ' + count + ' selected plots.');
          });

          // Multi-Step Registration Modal Wizard Flow
          let currentStep = 1;
          const pane1 = document.getElementById('step-pane-1');
          const pane2 = document.getElementById('step-pane-2');
          const pane3 = document.getElementById('step-pane-3');
          const btnPrev = document.getElementById('btn-wizard-prev');
          const btnNext = document.getElementById('btn-wizard-next');
          const nav1 = document.getElementById('nav-step-1');
          const nav2 = document.getElementById('nav-step-2');
          const nav3 = document.getElementById('nav-step-3');
          const valSummary = document.getElementById('modal-validation-summary');
          const errorList = document.getElementById('modal-error-list');

          // Fee Calculation Logic
          function recalculateFee() {
            const checkedTier = document.querySelector('input[name="lease-tier"]:checked');
            const baseRate = parseInt(checkedTier?.value || '85', 10);
            const keyDepositChecked = document.getElementById('key-deposit-cb')?.checked;
            const depositRate = keyDepositChecked ? 25 : 0;
            const total = baseRate + depositRate;

            const feeDisplay = document.getElementById('fee-total-display');
            const breakdownText = document.getElementById('fee-breakdown-text');
            if (feeDisplay) feeDisplay.textContent = '$' + total.toFixed(2);
            if (breakdownText) {
              breakdownText.textContent = 'Base rate: $' + baseRate.toFixed(2) + (depositRate > 0 ? ' + Key deposit: $' + depositRate.toFixed(2) : '');
            }
          }

          document.querySelectorAll('input[name="lease-tier"]').forEach((r) => r.addEventListener('change', recalculateFee));
          document.getElementById('key-deposit-cb')?.addEventListener('change', recalculateFee);

          function updateWizardView() {
            if (valSummary) valSummary.style.display = 'none';

            if (pane1) pane1.style.display = currentStep === 1 ? 'flex' : 'none';
            if (pane2) pane2.style.display = currentStep === 2 ? 'flex' : 'none';
            if (pane3) pane3.style.display = currentStep === 3 ? 'flex' : 'none';

            if (btnPrev) {
              btnPrev.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
            }

            if (btnNext) {
              if (currentStep === 1) {
                btnNext.innerHTML = '<span>Continue to Agreement &rarr;</span>';
              } else if (currentStep === 2) {
                btnNext.innerHTML = '<span>Calculate Seasonal Fees &rarr;</span>';
              } else {
                btnNext.innerHTML = '<span>Confirm & Issue Lease</span>';
              }
            }

            // Step Indicator styles using Stepper primitive classes
            [
              { el: nav1, num: 1 },
              { el: nav2, num: 2 },
              { el: nav3, num: 3 },
            ].forEach(({ el, num }) => {
              if (!el) return;
              const indicator = el.querySelector('.stepper__indicator');
              const state = el.querySelector('.stepper__title .visually-hidden');
              const done = num < currentStep;
              el.className = done ? 'stepper__item is-complete' : 'stepper__item';
              if (num === currentStep) el.setAttribute('aria-current', 'step');
              else el.removeAttribute('aria-current');
              if (state) state.textContent = done ? 'Completed: ' : num === currentStep ? 'Current: ' : '';
              if (indicator) {
                indicator.classList.toggle('micro-heading', !done);
                if (done) indicator.innerHTML = '<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>';
                else indicator.textContent = String(num);
              }
            });
          }

          function validateStep(step) {
            const errors = [];
            if (step === 1) {
              const plotSelect = document.getElementById('new-plot-select');
              const nameInput = document.getElementById('gardener-name');
              const emailInput = document.getElementById('gardener-email');
              const resCheck = document.getElementById('residency-verified');

              if (!plotSelect?.value) errors.push('Please select a vacant garden plot.');
              if (!nameInput?.value.trim()) errors.push('Leaseholder full legal name is required.');
              if (!emailInput?.value.trim() || !emailInput.value.includes('@')) errors.push('A valid contact email address is required.');
              if (!resCheck?.checked) errors.push('You must confirm municipal residency verification.');
            }

            if (errors.length > 0) {
              if (valSummary && errorList) {
                errorList.innerHTML = errors.map((err) => '<li>' + err + '</li>').join('');
                valSummary.style.display = 'flex';
              }
              return false;
            }
            return true;
          }

          if (btnNext) {
            btnNext.addEventListener('click', () => {
              if (!validateStep(currentStep)) return;

              if (currentStep < 3) {
                currentStep++;
                updateWizardView();
              } else {
                // Completed!
                const leaseModal = document.getElementById('new-lease-dialog');
                if (leaseModal) leaseModal.close();
                showToast('Lease Registered', 'New plot lease successfully issued and added to registry.');
                currentStep = 1;
                updateWizardView();
              }
            });
          }

          if (btnPrev) {
            btnPrev.addEventListener('click', () => {
              if (currentStep > 1) {
                currentStep--;
                updateWizardView();
              }
            });
          }
        })();
      </script>
    `;
  },
};

/**
 * 2. EmptyState
 * Demonstrates the directory layout when filters produce zero matching plots.
 */
export const EmptyState: Story = {
  render: () => `
    <div class="app" style="background-color: var(--surface); color: var(--foreground); min-block-size: 100dvb; padding: var(--spacing-24);">
      <article class="card wrapper wrapper--lg margin-inline-auto">
        <header class="card__header inline justify-content-between align-items-center">
          <hgroup class="card__hgroup">
            <h2 class="card__title font-size-md">Plot Registry Directory</h2>
            <p class="card__subtitle text-muted">Municipal plot search results</p>
          </hgroup>
          <span class="status status--danger"><span class="status__text">0 Matches</span></span>
        </header>
        <div class="card__body empty-state padding-block-xl text-center">
          <div class="empty-state__icon margin-inline-auto" aria-hidden="true" style="inline-size: 4rem; block-size: 4rem;">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
          </div>
          <h3 class="empty-state__title font-size-lg font-weight-bold margin-block-start-sm">No Plots Found for "Hydroponic Greenhouse"</h3>
          <p class="empty-state__description font-size-sm text-muted margin-block-start-xs" style="max-inline-size: 28rem; margin-inline: auto;">
            No municipal garden plots matched your current combination of keywords and sunlight criteria. Try resetting your query or viewing all available beds.
          </p>
          <div class="empty-state__actions margin-block-start-md inline justify-content-center gap-xs">
            <button type="button" class="button button--sm">
              <span>Reset All Filters</span>
            </button>
            <button type="button" class="button button--strong button--accent button--sm">
              <span>View Full Registry</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  `,
};

/**
 * 3. LoadingSkeleton
 * Demonstrates how the dashboard communicates initial data-fetching state across cards and tables.
 */
export const LoadingSkeleton: Story = {
  render: () => `
    <div class="app" style="background-color: var(--surface); color: var(--foreground); min-block-size: 100dvb; padding: var(--spacing-16);" aria-busy="true">
      <div class="stack gap-lg">
        <p class="visually-hidden" role="status">Loading your garden…</p>

        <!-- Skeleton Header -->
        <div class="card card--compact inline justify-content-between align-items-center">
          <div class="inline align-items-center gap-sm">
            <div class="skeleton skeleton--avatar" style="--skeleton-width: 2.5rem;"></div>
            <div class="stack gap-xs">
              <div class="skeleton" style="--skeleton-width: 12rem; --skeleton-height: 1.25rem;"></div>
              <div class="skeleton" style="--skeleton-width: 8rem; --skeleton-height: 0.75rem;"></div>
            </div>
          </div>
          <div class="skeleton skeleton--button" style="--skeleton-width: 9rem; --skeleton-height: 2rem;"></div>
        </div>

        <!-- Skeleton Metric Strip using grid--auto-fit grid--2xs -->
        <div class="grid grid--auto-fit grid--2xs">
          ${[1, 2, 3, 4].map(() => `
            <div class="card card--compact stack gap-sm">
              <div class="skeleton" style="--skeleton-width: 60%; --skeleton-height: 0.875rem;"></div>
              <div class="skeleton" style="--skeleton-width: 40%; --skeleton-height: 2rem;"></div>
              <div class="skeleton" style="--skeleton-width: 85%; --skeleton-height: 0.75rem;"></div>
            </div>
          `).join('')}
        </div>

        <!-- Skeleton Table -->
        <div class="card stack gap-md">
          <div class="card__header inline justify-content-between">
            <div class="skeleton" style="--skeleton-width: 14rem; --skeleton-height: 1.5rem;"></div>
            <div class="skeleton" style="--skeleton-width: 6rem; --skeleton-height: 1.5rem;"></div>
          </div>
          <div class="table-container">
            <table class="table table--striped">
              <thead>
                <tr>
                  <th><div class="skeleton skeleton--text" style="--skeleton-width: 2rem;"></div></th>
                  <th><div class="skeleton skeleton--text" style="--skeleton-width: 4rem;"></div></th>
                  <th><div class="skeleton skeleton--text" style="--skeleton-width: 6rem;"></div></th>
                  <th><div class="skeleton skeleton--text" style="--skeleton-width: 10rem;"></div></th>
                  <th><div class="skeleton skeleton--text" style="--skeleton-width: 6rem;"></div></th>
                  <th><div class="skeleton skeleton--text" style="--skeleton-width: 5rem;"></div></th>
                </tr>
              </thead>
              <tbody>
                ${[1, 2, 3, 4, 5].map(() => `
                  <tr>
                    <td><div class="skeleton" style="--skeleton-width: 1.25rem; --skeleton-height: 1.25rem;"></div></td>
                    <td><div class="skeleton skeleton--text" style="--skeleton-width: 3rem;"></div></td>
                    <td><div class="skeleton skeleton--badge" style="--skeleton-width: 5rem; --skeleton-height: 1.25rem;"></div></td>
                    <td><div class="skeleton skeleton--text" style="--skeleton-width: 8rem;"></div></td>
                    <td><div class="skeleton skeleton--text" style="--skeleton-width: 4rem;"></div></td>
                    <td><div class="skeleton skeleton--badge" style="--skeleton-width: 4rem; --skeleton-height: 1.25rem;"></div></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `,
};
