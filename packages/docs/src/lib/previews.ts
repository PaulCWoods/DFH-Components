/* What each component's Card on the Components page shows: real library
   markup, by the page's slug. It sits in an inert canvas, so it needs no
   labels or ids of its own, and floating parts (a Popover, a Tooltip, a
   Dialog) are drawn in place rather than opened. A layout shows what it
   does with plain tiles. */
const icon = (name: string, cls = 'icon') =>
  `<svg class="${cls}" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="/icons.svg#${name}"/></svg>`;

const tile = (cls = '') => `<div class="component-card__tile ${cls}"></div>`;
const tiles = (n: number, cls = '') => Array.from({ length: n }, () => `<li class="component-card__tile ${cls}"></li>`).join('');

export const PREVIEWS: Record<string, string> = {
  /* Atoms ---------------------------------------------------------------- */
  avatar: `
    <ul class="avatar-group avatar-group--stacked">
      <li><span class="avatar avatar--lg">SR</span></li>
      <li><img class="avatar avatar--lg" src="/examples/thumb.svg" alt="" /></li>
      <li><span class="avatar avatar--lg">AO</span></li>
      <li><span class="avatar avatar--lg avatar--count">+3</span></li>
    </ul>`,

  'badge-status-chip-kbd': `
    <div class="stack gap-sm">
      <div class="cluster">
        <span class="status status--success">${icon('check')}<span class="status__text">Passed</span></span>
        <span class="status status--warning">${icon('triangle-exclamation-point')}<span class="status__text">Due soon</span></span>
      </div>
      <div class="cluster">
        <span class="chip"><span class="chip__text">Ferns</span></span>
        <span class="chip"><span class="chip__text">Shade</span></span>
        <span class="badge"><span class="badge__text">3</span></span>
        <kbd class="kbd">Esc</kbd>
      </div>
    </div>`,

  brand: `
    <span class="brand">
      ${icon('brand-design-for-humans', 'brand__mark icon')}
      <span class="brand__name">Design For Humans</span>
    </span>`,

  button: `
    <div class="cluster">
      <button type="button" class="button button--strong button--accent">${icon('check', 'button__icon icon')}<span>Save</span></button>
      <button type="button" class="button"><span>Cancel</span></button>
      <button type="button" class="button button--subtle button--icon">${icon('cog')}<span class="sr-only">Settings</span></button>
    </div>`,

  divider: `
    <div class="stack gap-sm component-card__fill">
      <p class="small-text">Ferns and hostas</p>
      <hr class="divider" />
      <p class="small-text">Hellebores and foxgloves</p>
    </div>`,

  'form-controls': `
    <div class="stack gap-sm component-card__fill">
      <input type="text" class="input input--sm" value="Hart's tongue fern" aria-label="Plant" />
      <div class="switch">
        <div class="switch__label"><span class="label">Reminders</span></div>
        <span class="switch__control">
          <input type="checkbox" role="switch" checked aria-label="Reminders" />
          <span class="switch__option switch__option--off" aria-hidden="true">Off</span>
          <span class="switch__option switch__option--on" aria-hidden="true">On</span>
        </span>
      </div>
      <input type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" aria-label="Watering" />
    </div>`,

  'icon-icon-box': `
    <div class="cluster">
      <span class="icon-box icon-box--lg icon-box--subtle">${icon('bell')}</span>
      <span class="icon-box icon-box--lg icon-box--subtle icon-box--round">${icon('star')}</span>
      <span class="icon-box icon-box--lg icon-box--subtle icon-box--success">${icon('check')}</span>
      ${icon('sparkles')} ${icon('calendar')} ${icon('mail')}
    </div>`,

  'link-block-link': `
    <div class="stack gap-sm component-card__fill">
      <p class="text">Read the <span class="link">planting guide</span> first.</p>
      <a class="block-link">
        <span class="block-link__text"><span class="small-heading">Shade borders</span></span>
        ${icon('arrow-right', 'block-link__arrow icon icon--dir')}
      </a>
    </div>`,

  'progress-meter': `
    <div class="stack gap-sm component-card__fill">
      <span class="small-text">Uploading photos</span>
      <progress class="progress" value="68" max="100">68%</progress>
      <span class="small-text">Storage used</span>
      <meter class="meter" value="0.45" low="0.6" high="0.8" optimum="0.2">45%</meter>
    </div>`,

  skeleton: `
    <div class="inline component-card__fill">
      <span class="skeleton skeleton--avatar"></span>
      <div class="stack gap-xs grow">
        <span class="skeleton skeleton--heading"></span>
        <span class="skeleton skeleton--text"></span>
        <span class="skeleton skeleton--text" style="--skeleton-width: 60%;"></span>
      </div>
    </div>`,

  'skip-link': `
    <div class="component-card__frame component-card__fill">
      <span class="skip-link">Skip to main content</span>
      <div class="stack gap-xs p-sm">
        ${tile('component-card__tile--bar')}
        ${tile('component-card__tile--bar')}
      </div>
    </div>`,

  spinner: `
    <div class="inline">
      ${icon('loader-circle', 'icon spinner')}
      <p class="text">Loading plants…</p>
    </div>`,

  'text-heading': `
    <div class="stack gap-xs component-card__fill">
      <p class="heading">Shade borders</p>
      <p class="text">Ferns, hostas and hellebores grow well under trees.</p>
      <p class="small-text text-muted">Updated in March</p>
    </div>`,

  thumbnail: `
    <div class="cluster">
      <img class="thumbnail" src="/examples/thumb.svg" alt="" />
      <img class="thumbnail thumbnail--round" src="/examples/thumb.svg" alt="" />
      <img class="thumbnail" src="/examples/cover.svg" alt="" />
    </div>`,

  /* Molecules ------------------------------------------------------------ */
  accordion: `
    <div class="accordion-group accordion-group--joined component-card__fill">
      <details class="accordion" open>
        <summary>Delivery times</summary>
        <p class="small-text">Most orders arrive in three days.</p>
      </details>
      <details class="accordion"><summary>Returns</summary><p class="small-text">Within 30 days.</p></details>
    </div>`,

  banner: `
    <div class="banner banner--info component-card__fill">
      <span class="icon-box" aria-hidden="true">${icon('info')}</span>
      <div class="banner__body"><p class="text">Your changes are saved automatically.</p></div>
    </div>`,

  'banner-dock': `
    <div class="component-card__frame component-card__fill">
      <div class="banner-dock">
        <div class="banner banner--warning banner--compact">
          <span class="icon-box" aria-hidden="true">${icon('triangle-exclamation-point')}</span>
          <div class="banner__body"><p class="small-text">The shop closes early on Friday.</p></div>
        </div>
      </div>
      <div class="stack gap-xs p-sm">
        ${tile('component-card__tile--bar')}
        ${tile('component-card__tile--bar')}
      </div>
    </div>`,

  'batch-actions': `
    <div class="batch-actions batch-actions--inline component-card__crop">
      <p class="batch-actions__summary small-heading">3 selected</p>
      <hr class="divider" />
      <div class="batch-actions__actions button-group buttons-subtle">
        <button type="button" class="button">${icon('download', 'button__icon icon')}<span>Export</span></button>
        <button type="button" class="button button--danger">${icon('trash', 'button__icon icon')}<span>Delete</span></button>
      </div>
    </div>`,

  breadcrumb: `
    <nav class="breadcrumb">
      <ol class="small-text">
        <li><span class="link">Topics</span></li>
        <li><span class="link">Visual design</span></li>
        <li aria-current="page">Modular scale</li>
      </ol>
    </nav>`,

  'button-group': `
    <div class="button-group button-group--joined">
      <button type="button" class="button"><span>Day</span></button>
      <button type="button" class="button is-active"><span>Week</span></button>
      <button type="button" class="button"><span>Month</span></button>
    </div>`,

  card: `
    <article class="card card--compact component-card__fill">
      <header class="card__header"><p class="card__title small-heading">Shade borders</p></header>
      <div class="card__body"><p class="small-text">Ferns and hostas under trees.</p></div>
      <footer class="card__footer"><span class="link small-text">Plant list</span></footer>
    </article>`,

  'code-block': `
    <div class="code-block component-card__fill">
      <div class="code-block__bar"><span class="small-text">CSS</span></div>
      <pre class="code-block__code"><code>:where(.fern) {
  color: var(--foreground);
}</code></pre>
    </div>`,

  combobox: `
    <div class="combobox component-card__fill">
      <div class="combobox__control">
        <input class="combobox__input" value="Hart's tongue fern" aria-label="Plant" />
        <button type="button" class="button button--plain button--icon combobox__toggle">${icon('chevron-down')}<span class="sr-only">Show plants</span></button>
      </div>
    </div>`,

  'empty-state': `
    <div class="empty-state empty-state--compact">
      <div class="empty-state__visual"><span class="icon-box">${icon('bookmark')}</span></div>
      <div class="empty-state__content">
        <p class="empty-state__title small-heading">No saved plants</p>
        <p class="empty-state__description small-text">Save a plant to find it here.</p>
      </div>
    </div>`,

  'form-composition': `
    <div class="stack gap-sm component-card__fill">
      <div class="field">
        <span class="field__label label">Email address</span>
        <input type="email" class="input input--sm" value="sam@example.com" aria-label="Email address" />
      </div>
      <div class="choices">
        <label class="choice"><input type="radio" class="radio-input" checked /><span class="small-text">By email</span></label>
        <label class="choice"><input type="radio" class="radio-input" /><span class="small-text">By phone</span></label>
      </div>
    </div>`,

  lockup: `
    <div class="inline">
      <span class="avatar avatar--lg">SR</span>
      <span class="lockup">
        <span class="small-heading">Sam Rivera</span>
        <span class="small-text text-muted">Head gardener</span>
      </span>
    </div>`,

  menu: `
    <menu class="menu component-card__fill">
      <li><button type="button" class="button">${icon('square-pen', 'button__icon icon')}<span>Rename</span></button></li>
      <li><button type="button" class="button">${icon('folder', 'button__icon icon')}<span>Move to folder</span></button></li>
      <li><button type="button" class="button button--danger">${icon('trash', 'button__icon icon')}<span>Delete file</span></button></li>
    </menu>`,

  'navigation-tree': `
    <nav class="navigation-tree component-card__fill">
      <ol>
        <li><span class="button"><span>Getting started</span></span></li>
        <li>
          <span class="button" aria-current="page"><span>Tokens</span></span>
          <ol>
            <li><span class="button"><span>Global</span></span></li>
            <li><span class="button"><span>Semantic</span></span></li>
          </ol>
        </li>
      </ol>
    </nav>`,

  'pagination-page-count': `
    <nav class="pagination button-group">
      <span class="button button--icon">${icon('chevron-left', 'icon icon--dir')}<span class="sr-only">Previous page</span></span>
      <span class="button"><span>1</span></span>
      <span class="button" aria-current="page"><span>2</span></span>
      <span class="button"><span>3</span></span>
      <span class="button button--icon">${icon('chevron-right', 'icon icon--dir')}<span class="sr-only">Next page</span></span>
    </nav>`,

  popover: `
    <div class="stack gap-xs">
      <button type="button" class="button"><span>Delivery details</span>${icon('chevron-down')}</button>
      <div class="card card--compact shadow-lg">
        <div class="card__body"><p class="small-text">Orders placed before noon leave the same day.</p></div>
      </div>
    </div>`,

  poster: `
    <div class="poster component-card__fill" style="--poster-min-size: 0;">
      <img class="poster__media" src="/examples/poster-800.jpg" alt="" />
      <div class="poster__content">
        <p class="subheading">Gardens worth coming home to</p>
      </div>
    </div>`,

  prose: `
    <div class="prose component-card__fill">
      <p class="small-heading">Planting a shade garden</p>
      <p class="small-text">Shade under trees is usually dry. Read the <span class="link">soil guide</span> first.</p>
      <ul class="small-text"><li>Leaf mould</li><li>Mulch for the first summer</li></ul>
    </div>`,

  stepper: `
    <ol class="stepper component-card__fill">
      <li class="stepper__item is-complete"><div class="stepper__step"><span class="stepper__indicator">${icon('check')}</span><span class="stepper__title small-heading">Details</span></div></li>
      <li class="stepper__item" aria-current="step"><div class="stepper__step"><span class="stepper__indicator micro-heading">2</span><span class="stepper__title small-heading">Terms</span></div></li>
      <li class="stepper__item"><div class="stepper__step"><span class="stepper__indicator micro-heading">3</span><span class="stepper__title small-heading">Pay</span></div></li>
    </ol>`,

  tabs: `
    <div class="tabbed-content component-card__fill">
      <div class="tab-list">
        <button type="button" class="tab" aria-selected="true"><span class="tab__text">Care</span></button>
        <button type="button" class="tab" aria-selected="false"><span class="tab__text">Planting</span></button>
        <button type="button" class="tab" aria-selected="false"><span class="tab__text">Pests</span></button>
      </div>
      <div class="tab-panel"><p class="small-text">Water weekly in summer.</p></div>
    </div>`,

  telemetry: `
    <dl class="telemetry-group">
      <div class="telemetry"><dt class="small-text text-muted">Uptime</dt><dd class="small-heading">99.98%</dd></div>
      <div class="telemetry"><dt class="small-text text-muted">Orders</dt><dd class="small-heading">1,204</dd></div>
      <div class="telemetry"><dt class="small-text text-muted">Errors</dt><dd class="small-heading">0</dd></div>
    </dl>`,

  toast: `
    <div class="banner banner--success banner--round toast component-card__fill">
      <span class="icon-box" aria-hidden="true">${icon('check')}</span>
      <div class="banner__body">
        <p class="text font-bold">Settings saved</p>
        <p class="small-text">Your preferences are updated.</p>
      </div>
    </div>`,

  tooltip: `
    <div class="stack gap-xs component-card__tooltip">
      <span class="tooltip">Copy link</span>
      <button type="button" class="button button--icon">${icon('copy')}<span class="sr-only">Copy link</span></button>
    </div>`,

  /* Organisms ------------------------------------------------------------ */
  footer: `
    <div class="footer component-card__fill">
      <div class="footer__bar">
        <p class="small-text text-muted">© 2026 Woodland Plants</p>
        <ul class="cluster small-text">
          <li><span class="link">Accessibility</span></li>
          <li><span class="link">Privacy</span></li>
        </ul>
      </div>
    </div>`,

  header: `
    <div class="header header--compact component-card__crop">
      <div class="header__bar">
        <span class="brand">${icon('brand-design-for-humans', 'brand__mark icon')}<span class="brand__name">Woodland</span></span>
        <div class="cluster gap-xs">
          <button type="button" class="button button--plain button--icon">${icon('search')}<span class="sr-only">Search</span></button>
          <button type="button" class="button button--strong button--accent button--sm"><span>Sign in</span></button>
        </div>
      </div>
    </div>`,

  'modal-dialog': `
    <div class="component-card__frame component-card__backdrop component-card__fill">
      <article class="card card--compact shadow-lg component-card__fill">
        <header class="card__header">
          <p class="card__title small-heading">Watering rota</p>
          <span class="button button--plain button--icon button--sm">${icon('x')}<span class="sr-only">Close</span></span>
        </header>
        <div class="card__body"><p class="small-text">Bed 3 is yours this week.</p></div>
      </article>
    </div>`,

  sidebar: `
    <div class="sidebar component-card__fill">
      <div class="sidebar__body">
        <nav class="navigation-tree">
          <ul>
            <li><span class="button" aria-current="page">${icon('house', 'button__icon icon')}<span>Perennials</span></span></li>
            <li><span class="button">${icon('star', 'button__icon icon')}<span>Ferns</span></span></li>
            <li><span class="button">${icon('folder', 'button__icon icon')}<span>Grasses</span></span></li>
          </ul>
        </nav>
      </div>
    </div>`,

  table: `
    <table class="table table--compact component-card__fill">
      <thead><tr><th scope="col">Plant</th><th scope="col" class="table__cell--numeric">Height</th><th scope="col" class="table__cell--numeric">Stock</th></tr></thead>
      <tbody>
        <tr><th scope="row">Hart's tongue</th><td class="table__cell--numeric">40</td><td class="table__cell--numeric">12</td></tr>
        <tr><th scope="row">Soft shield</th><td class="table__cell--numeric">60</td><td class="table__cell--numeric">8</td></tr>
      </tbody>
    </table>`,

  /* Layout: the arrangement, in plain tiles -------------------------------- */
  'app-shell': `
    <div class="component-card__frame component-card__fill">
      <div class="stack gap-xs p-xs">
        ${tile('component-card__tile--bar')}
        <div class="inline gap-xs" style="--align-items: stretch;">
          ${tile('component-card__tile--side')}
          ${tile('component-card__tile--main grow')}
        </div>
        ${tile('component-card__tile--bar')}
      </div>
    </div>`,

  'grid-grid-carousel': `
    <ul class="grid grid--3-col gap-xs component-card__fill" style="--grid-min: 3rem;">
      ${tiles(6)}
    </ul>`,

  split: `
    <div class="split gap-xs component-card__fill" style="--split-side-width: 30%; --split-main-min-width: 30%; --align-items: stretch;">
      ${tile('component-card__tile--main')}
      ${tile('component-card__tile--main')}
    </div>`,

  'stack-inline-cluster': `
    <div class="stack gap-xs component-card__fill">
      ${tile('component-card__tile--bar')}
      ${tile('component-card__tile--bar')}
      <ul class="cluster gap-xs">
        ${tiles(5, 'component-card__tile--chip')}
      </ul>
    </div>`,

  wrapper: `
    <div class="component-card__frame component-card__fill p-xs">
      <div class="stack gap-xs component-card__wrapper">
        ${tile('component-card__tile--bar')}
        ${tile('component-card__tile--main')}
      </div>
    </div>`,

  /* Utilities ------------------------------------------------------------ */
  'responsive-visibility': `
    <div class="stack gap-sm">
      <div class="button-group">
        <button type="button" class="button">${icon('plus', 'button__icon icon')}<span class="ui-label">Add plant</span></button>
        <button type="button" class="button">${icon('share-2', 'button__icon icon')}<span class="ui-label">Share</span></button>
      </div>
      <div class="button-group hide-labels">
        <button type="button" class="button">${icon('plus', 'button__icon icon')}<span class="ui-label">Add plant</span></button>
        <button type="button" class="button">${icon('share-2', 'button__icon icon')}<span class="ui-label">Share</span></button>
      </div>
    </div>`,

  utilities: `
    <div class="border border-dashed border-muted rounded-md p-md component-card__fill">
      <p class="small-text text-muted text-balance">A dashed border, rounded corners and padding, from four utilities.</p>
    </div>`,
};
