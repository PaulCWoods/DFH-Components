# 27. Empty State Primitive (Zero-Data Views & Onboarding)
```html
<!-- 1. Standalone Empty State (Search / Filter Miss) -->
<section class="empty-state" aria-labelledby="empty-search-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="empty-search-title" class="empty-state__title heading">No items found</h3>
    <p class="empty-state__description text-muted">
      Try adjusting your search criteria or clear your current filters.
    </p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button button--strong button--accent button--sm">
      <span>Clear Filters</span>
    </button>
  </div>
</section>

<!-- 2. Onboarding / Initial Setup with Primary & Secondary Actions -->
<section class="empty-state empty-state--bordered" aria-labelledby="empty-setup-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="empty-setup-title" class="empty-state__title heading">Create your first project</h3>
    <p class="empty-state__description text-muted">
      Organize design tokens, layout primitives, and composite recipes in a unified space.
    </p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button button--strong button--accent">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
      <span>New Project</span>
    </button>
    <button type="button" class="button">
      <span>Import Repository</span>
    </button>
  </div>
</section>

<!-- 3. Nested Inside Card Primitive (Card Companion) -->
<article class="card bg-card" aria-labelledby="card-empty-title">
  <header class="card__header split align-items-center">
    <h4 class="card__title font-size-0 font-bold">Activity</h4>
    <span class="status status--sm"><span class="status__text">Zero</span></span>
  </header>
  <div class="card__body">
    <div class="empty-state empty-state--flush empty-state--compact" aria-labelledby="card-empty-title">
      <div class="empty-state__visual" aria-hidden="true">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </div>
      <div class="empty-state__content">
        <h5 id="card-empty-title" class="empty-state__title small-heading">All caught up!</h5>
        <p class="empty-state__description text-muted small-text">
          No pending tasks or unread notifications in this view.
        </p>
      </div>
    </div>
  </div>

</article>

<!-- 4. Table Cell Empty State -->
<table class="table">
  <tbody>
    <tr>
      <td colspan="100%">
        <div class="empty-state empty-state--compact" aria-labelledby="tbl-empty-title">
          <div class="empty-state__visual" aria-hidden="true">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
          </div>
          <div class="empty-state__content">
            <h4 id="tbl-empty-title" class="empty-state__title small-heading">No matching records</h4>
            <p class="empty-state__description text-muted">Try clearing search filters.</p>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<!-- 5. Semantic Status Variants (Success, Warning, Error / Danger) -->
<section class="empty-state empty-state--success" aria-labelledby="success-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="success-empty-title" class="empty-state__title">Sync complete</h3>
    <p class="empty-state__description">All 717 tokens are synchronized.</p>
  </div>
</section>

<section class="empty-state empty-state--warning" aria-labelledby="warn-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="warn-empty-title" class="empty-state__title">Subscription expiring</h3>
    <p class="empty-state__description">Renew plan to preserve permissions.</p>
  </div>
</section>

<section class="empty-state empty-state--error" aria-labelledby="err-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="err-empty-title" class="empty-state__title">Connection failed</h3>
    <p class="empty-state__description">Unable to load remote repository.</p>
  </div>
</section>
```

