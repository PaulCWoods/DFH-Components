# 13. Table Primitive

## A. Standard Data Table with Accessible Scroll Container
```html
<div class="table-container" tabindex="0" role="region" aria-label="Quarterly Financial Results">
  <table class="table">
    <caption class="table__caption">Quarterly Financial Results (Q3 2026)</caption>
    <thead>
      <tr>
        <th scope="col">Department</th>
        <th scope="col" class="table__cell--numeric">Budget</th>
        <th scope="col" class="table__cell--numeric">Actual</th>
        <th scope="col" class="table__cell--numeric">Variance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Engineering</th>
        <td class="table__cell--numeric">$120,000</td>
        <td class="table__cell--numeric">$114,500</td>
        <td class="table__cell--numeric">-$5,500</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total</th>
        <td class="table__cell--numeric">$120,000</td>
        <td class="table__cell--numeric">$114,500</td>
        <td class="table__cell--numeric">-$5,500</td>
      </tr>
    </tfoot>
  </table>
</div>
```

## B. Table Composed inside Card with Striped Rows
```html
<div class="card">
  <div class="card__body" style="padding: 0;">
    <div class="table-container" tabindex="0" role="region" aria-label="User Directory" style="margin-block-end: 0;">
      <table class="table table--striped table--hover">
        <thead>
          <tr>
            <th scope="col" class="table__cell--fit">User</th>
            <th scope="col">Role</th>
            <th scope="col" class="table__cell--fit">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="table__cell--fit">Paul Woods</th>
            <td>Design Engineer</td>
            <td class="table__cell--fit"><span class="status status--success"><span class="status__text">Active</span></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

## C. Sortable Header Table
```html
<div class="table-container" tabindex="0" role="region" aria-label="Package Registry">
  <table class="table table--hover">
    <thead>
      <tr>
        <th scope="col">
          <button type="button" class="table__sort-button" aria-sort="ascending" aria-label="Sort by package name">
            <span>Package</span>
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
          </button>
        </th>
        <th scope="col" class="table__cell--numeric">
          <button type="button" class="table__sort-button" aria-sort="descending" aria-label="Sort by downloads">
            <span>Downloads</span>
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><code>@design-for-humans/css</code></th>
        <td class="table__cell--numeric">14,280</td>
      </tr>
    </tbody>
  </table>
</div>
```

## D. Full Sticky Matrix Table (.table--sticky-*)
```html
<div class="table-container" tabindex="0" role="region" aria-label="Audit Matrix" style="max-block-size: 20rem; overflow: auto;">
  <table class="table table--sticky-head table--sticky-footer table--sticky-first-column table--sticky-last-column table--striped">
    <caption class="table__caption">WCAG 2.2 Conformance Audit Results</caption>
    <thead>
      <tr>
        <th scope="col" class="table__cell--fit">Component</th>
        <th scope="col">WCAG Criterion</th>
        <th scope="col">Description</th>
        <th scope="col" class="table__cell--fit">Level</th>
        <th scope="col" class="table__cell--fit table__cell--center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="table__cell--fit">Modal Dialog</th>
        <td class="table__cell--long">2.1.2 No Keyboard Trap</td>
        <td class="table__cell--long">Modal dialogs must not trap keyboard focus when cycling elements.</td>
        <td class="table__cell--fit"><span class="status"><span class="status__text">Level A</span></span></td>
        <td class="table__cell--fit table__cell--center">
          <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" class="table__cell--fit">Summary</th>
        <td colspan="3" class="table__cell--long">All core components passing compliance</td>
        <td class="table__cell--fit table__cell--center"><span class="status status--success"><span class="status__text">Passed</span></span></td>
      </tr>
    </tfoot>
  </table>
</div>
```

## E. Flush Table (.table--flush)
```html
<div class="table-container" tabindex="0" role="region" aria-label="Flush Alignment Summary">
  <table class="table table--flush">
    <caption class="table__caption">Editorial Aligned Table</caption>
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col" class="table__cell--numeric">Score</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Button</th>
        <td class="table__cell--numeric">100%</td>
      </tr>
    </tbody>
  </table>
</div>
```

## F. Token-Driven Column Sizing Helpers (.table__col--*)
```html
<!-- Eliminates inline style="inline-size: ..." on <col>, <th>, and <td> -->
<div class="table-container" tabindex="0" role="region" aria-label="Broadcast Queue">
  <table class="table table--striped table--hover">
    <caption class="table__caption">Broadcast Queue</caption>
    <thead>
      <tr>
        <th scope="col" class="table__col--index"><span class="visually-hidden">Position</span>#</th>
        <th scope="col" class="table__col--sm">Time</th>
        <th scope="col" class="table__col--fill">Asset Title</th>
        <th scope="col" class="table__col--sm">Type</th>
        <th scope="col" class="table__col--sm table__col--num">Duration</th>
        <th scope="col" class="table__col--md">Status</th>
        <th scope="col" class="table__col--actions"><span class="visually-hidden">Actions</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table__col--index text-muted">1</td>
        <td class="table__col--sm font-mono text-muted">10:45 AM</td>
        <td class="table__col--fill">Solaris Horizon</td>
        <td class="table__col--sm"><span class="chip chip--subtle chip--sm"><span class="chip__text">Music</span></span></td>
        <td class="table__col--num font-mono text-muted">03:52</td>
        <td class="table__col--md"><span class="status status--success status--sm"><span class="status__text">Live</span></span></td>
        <td class="table__col--actions">
          <button type="button" class="button button--subtle button--icon button--sm" aria-label="Options">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

