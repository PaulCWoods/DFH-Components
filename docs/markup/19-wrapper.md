# 19. Wrapper Primitive (Content Width Constraints & Alignment)

## A. Standard Centered Site-Width Wrapper
```html
<div class="wrapper">
  <h1>Page Title</h1>
  <p>Centered content constrained to standard site width (--site-width / 75rem).</p>
</div>
```

## B. Size Scale & Alignments
```html
<!-- Large Block Width Constraint (40rem) -->
<div class="wrapper wrapper--lg">
  <article>Constrained editorial article content.</article>
</div>

<!-- BrandMedium Block Width Aligned to Start (30rem) -->
<div class="wrapper wrapper--md wrapper--start">
  <p>Left-aligned medium-width content.</p>
</div>

<!-- Vertically Centered Grid Wrapper -->
<div class="wrapper wrapper--middle">
  <div class="card">Vertically and horizontally centered card.</div>
</div>
```

## C. Split / Sidebar Layout Primitive (`.split`)
```html
<!-- 2-Column Responsive Layout: Sidebar on start, main content auto-expanding on end -->
<div class="split split--sm">
  <aside class="card">
    <h3>Sidebar Filters</h3>
  </aside>
  <main class="stack">
    <h2>Main Content Area</h2>
  </main>
</div>

<!-- Reverse Split: Main content on start, inspector sidebar on end -->
<div class="split split--sm split--end">
  <main class="stack">
    <h2>Main Editor</h2>
  </main>
  <aside class="card">
    <h3>Inspector Panel</h3>
  </aside>
</div>
```

## D. Application Shell & Multi-Sidebar Workspace (`.app`, `.app--viewport`, `.app__workspace`)
The canonical Holy Grail application shell. Grid rows: `auto minmax(0, 1fr) auto`. Dynamic viewport containment: `.app--viewport` (`100dvb`).
`.app__workspace` coordinates multiple sidebars/rails side-by-side with the main content canvas under sticky top chrome.

```html
<!-- Full Application Workspace Shell -->
<div class="app app--viewport">
  <!-- Pinned Top Header -->
  <header class="header header--sticky">
    <nav aria-label="Global navigation">...</nav>
  </header>

  <!-- Multi-Sidebar Workspace Container -->
  <div class="app__workspace">
    <!-- Slim Navigation Rail (4.5rem) -->
    <aside class="sidebar sidebar--rail" aria-label="Primary Navigation">
      <div class="sidebar__scroller">
        <nav class="tab-list tab-list--vertical tab-list--plain tab-list--sm" aria-label="Primary">
          <ul>
            <li><a href="/studio" class="tab tab--icon" aria-current="page"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Radio"/></svg><span class="tab__text">Studio</span></a></li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Contextual Submenu Sidebar -->
    <aside class="sidebar sidebar--flush" aria-label="Sub-navigation">
      <div class="sidebar__scroller">
        <nav class="tab-list tab-list--vertical tab-list--plain tab-list--flush tab-list--sm" aria-label="Sub-navigation">
          <ul>
            <li><a href="#feed" class="tab" aria-current="page"><span class="tab__text">Live Feed</span></a></li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content Canvas -->
    <main class="main" id="main-content">
      <div class="prose">...</div>
    </main>
  </div>

  <!-- Persistent Bottom Dock or Footer -->
  <footer class="footer">
    <p>System status</p>
  </footer>
</div>
```

## E. Sidebar Primitive (`.sidebar`, `.sidebar--sticky`, `.sidebar--flush`, `.sidebar--rail`)
```html
<!-- 1. Standard Sticky Sidebar -->
<aside class="sidebar sidebar--sticky" aria-label="Docs Nav">
  <header class="sidebar__header"><h3 class="small-heading">Sections</h3></header>
  <div class="sidebar__scroller">...</div>
  <footer class="sidebar__footer"><span class="small-text">v2.4.0</span></footer>
</aside>

<!-- 2. Flush Sidebar for Edge-to-Edge Tabs -->
<aside class="sidebar sidebar--flush" aria-label="File Tree">
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--flush tab-list--vertical" aria-label="Files">...</nav>
  </div>
</aside>

<!-- 3. Slim Navigation Rail -->
<aside class="sidebar sidebar--rail" aria-label="Global Rail">
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--vertical tab-list--plain tab-list--sm" aria-label="Global">...</nav>
  </div>
</aside>
```

## F. Mobile Bottom Tab Dock (`.tab-list--docked`)
A floating tab list fixed to the bottom of the viewport on small screens (`md:hide`). See §24.
```html
<nav class="tab-list tab-list--segmented tab-list--round tab-list--floating tab-list--docked md:hide" aria-label="Mobile">
  <a href="/" class="tab tab--icon" aria-current="page"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg><span class="tab__text">Home</span></a>
  <a href="/schedule" class="tab tab--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#List"/></svg><span class="tab__text">Schedule</span></a>
  <a href="/settings" class="tab tab--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg><span class="tab__text">Settings</span></a>
</nav>
```

