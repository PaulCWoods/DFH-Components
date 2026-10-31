/* Command palette: markup and the product's script, shared by the Command
   Palette and App Header recipes. The docs site's CommandPalette.astro uses
   the same markup. */

export const icon = (name: string, cls = 'icon') =>
  `<svg class="${cls}" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

interface Item {
  label: string;
  desc: string;
  icon: string;
  kbd?: string;
}

const groups: { label: string; items: Item[] }[] = [
  {
    label: 'Components',
    items: [
      { label: 'Button', desc: 'Actions, with prominence, intent and size', icon: 'Point' },
      { label: 'Combobox', desc: 'A field that filters a list', icon: 'Search' },
      { label: 'Dialog', desc: 'Modal panels and drawers', icon: 'Expand' },
      { label: 'Table', desc: 'Data with sorting, selection and sticky parts', icon: 'Grid' },
    ],
  },
  {
    label: 'Tokens',
    items: [
      { label: 'Colour', desc: 'Surfaces, foregrounds and borders in light and dark', icon: 'LightDark' },
      { label: 'Spacing', desc: 'The spacing steps and the target size', icon: 'Columns' },
    ],
  },
  {
    label: 'Actions',
    items: [
      { label: 'Export Figma variables', desc: 'Write the tokens for Tokens Studio and Figma', icon: 'Upload', kbd: '⇧⌘E' },
      { label: 'Switch colour scheme', desc: 'Light, dark or the system setting', icon: 'Moon', kbd: '⇧⌘L' },
    ],
  },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const option = (id: string, item: Item, active = false) => `
  <li id="${id}-${slug(item.label)}" class="combobox__option${active ? ' is-active' : ''}" role="option" aria-selected="false">
    ${icon(item.icon, 'icon text-muted')}
    <span class="lockup grow">
      <span class="small-heading" data-label>${item.label}</span>
      <span class="small-text text-muted">${item.desc}</span>
    </span>
    ${item.kbd ? `<kbd class="kbd">${item.kbd}</kbd>` : ''}
  </li>`;

const list = (id: string, query: string) => {
  const q = query.toLowerCase();
  let first = true;
  return `
  <div id="${id}-list" class="combobox__listbox combobox__listbox--static" role="listbox" aria-label="Results">
    ${groups
      .map((g) => {
        const items = g.items.filter((i) => !q || `${i.label} ${i.desc}`.toLowerCase().includes(q));
        return `
      <ul role="group" aria-labelledby="${id}-${slug(g.label)}"${items.length ? '' : ' hidden'}>
        <li id="${id}-${slug(g.label)}" role="presentation" class="combobox__group-label micro-heading">${g.label}</li>
        ${g.items
            .map((i) => {
              const shown = items.includes(i);
              const html = option(id, i, shown && first);
              if (shown) first = false;
              return shown ? html : html.replace('role="option"', 'role="option" hidden');
            })
            .join('')}
      </ul>`;
      })
      .join('')}
  </div>`;
};

const skeletonRows = () =>
  ['skeleton--w-50', 'skeleton--w-75', 'skeleton--w-90', 'skeleton--w-50']
    .map(
      (w) => `
    <div class="inline p-sm">
      <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
      <span class="lockup grow">
        <span class="small-heading"><span class="skeleton skeleton--text ${w}" aria-hidden="true"></span></span>
        <span class="small-text"><span class="skeleton skeleton--text" aria-hidden="true"></span></span>
      </span>
    </div>`,
    )
    .join('');

export type PaletteState = 'results' | 'no-results' | 'loading';

/* The dialog. The card is the combobox: its header holds the control, its
   body the static list. */
export const palette = ({ id = 'cmd-palette', state = 'results' as PaletteState, query = '' } = {}) => {
  const q = state === 'no-results' ? query || 'moss' : query;
  const firstId = state === 'results' ? `${id}-${slug(groups[0].items[0].label)}` : '';
  return `
  <dialog id="${id}" class="dialog" aria-label="Command palette" closedby="any">
    <article class="card card--ruled card--compact combobox combobox--flush">
      <header class="card__header">
        <div class="combobox__control">
          ${icon('Search', 'icon combobox__icon-start')}
          <input id="${id}-input" type="search" class="combobox__input" role="combobox" aria-label="Search"
            aria-expanded="true" aria-controls="${id}-list" aria-autocomplete="list" autocomplete="off" spellcheck="false"
            placeholder="Search components, tokens and actions" value="${q}"${firstId && !q ? ` aria-activedescendant="${firstId}"` : ''} autofocus />
          <button type="button" class="button button--plain button--icon" commandfor="${id}" command="close"><span class="sr-only">Close</span>${icon('Close')}</button>
        </div>
      </header>
      <div class="card__body card__body--scrollable" tabindex="0" aria-label="Results"${state === 'loading' ? ' aria-busy="true"' : ''}>
        ${state === 'loading'
      ? `<div id="${id}-list" class="combobox__listbox combobox__listbox--static" role="listbox" aria-label="Results" hidden></div>${skeletonRows()}`
      : `${list(id, q)}
        <div class="empty-state empty-state--compact"${state === 'no-results' ? '' : ' hidden'}>
          <div class="empty-state__content">
            <h2 class="empty-state__title small-heading">Nothing matches “<span data-query>${q}</span>”</h2>
            <p class="empty-state__description small-text">Try a component name, such as “button” or “table”.</p>
          </div>
        </div>`
    }
        <p class="sr-only" role="status">${state === 'no-results' ? 'No results' : state === 'loading' ? 'Loading' : ''}</p>
      </div>
      <footer class="card__footer cluster small-text text-muted">
        <span><kbd class="kbd">↑</kbd> <kbd class="kbd">↓</kbd> to move</span>
        <span><kbd class="kbd">↵</kbd> to choose</span>
        <span><kbd class="kbd">Esc</kbd> to close</span>
      </footer>
    </article>
  </dialog>`;
};

/* The button that opens it, with its shortcut. */
export const paletteOpener = (id = 'cmd-palette', cls = 'button button--subtle') => `
  <button type="button" class="${cls}" commandfor="${id}" command="show-modal" aria-haspopup="dialog" aria-keyshortcuts="Meta+K">
    ${icon('Search')}<span>Search</span><kbd class="kbd max-md:hide">⌘K</kbd>
  </button>`;

/* The product's script (§28 E): filtering, arrow keys, the active option and
   ⌘K. The library ships none of this. */
export const enhancePalette = (root: ParentNode, id = 'cmd-palette') => {
  const dialog = root.querySelector<HTMLDialogElement>(`#${id}`);
  const input = root.querySelector<HTMLInputElement>(`#${id}-input`);
  if (!dialog || !input) return;
  const listbox = dialog.querySelector<HTMLElement>('[role="listbox"]');
  const empty = dialog.querySelector<HTMLElement>('.empty-state');
  const status = dialog.querySelector<HTMLElement>('[role="status"]');
  if (!listbox) return;
  const options = [...listbox.querySelectorAll<HTMLElement>('[role="option"]')];
  const visible = () => options.filter((o) => !o.hidden);

  const setActive = (o: HTMLElement | null) => {
    options.forEach((x) => x.classList.toggle('is-active', x === o));
    if (o) {
      input.setAttribute('aria-activedescendant', o.id);
      o.scrollIntoView({ block: 'nearest' });
    } else input.removeAttribute('aria-activedescendant');
  };

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    options.forEach((o) => (o.hidden = !!q && !o.textContent!.toLowerCase().includes(q)));
    listbox.querySelectorAll<HTMLElement>('[role="group"]').forEach((g) => (g.hidden = !g.querySelector('[role="option"]:not([hidden])')));
    const n = visible().length;
    if (empty) {
      empty.hidden = n > 0;
      const term = empty.querySelector('[data-query]');
      if (term) term.textContent = input.value.trim();
    }
    if (status) status.textContent = q ? (n ? `${n} result${n === 1 ? '' : 's'}` : 'No results') : '';
    setActive(visible()[0] ?? null);
  };

  const choose = () => dialog.close();

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    const v = visible();
    const cur = v.findIndex((o) => o.classList.contains('is-active'));
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!v.length) return;
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive(v[(cur + step + v.length) % v.length]);
    } else if (e.key === 'Enter' && cur > -1) {
      e.preventDefault();
      choose();
    }
  });
  options.forEach((o) => {
    o.addEventListener('mousedown', (e) => e.preventDefault());
    o.addEventListener('click', choose);
  });
  dialog.addEventListener('close', () => {
    input.value = '';
    filter();
  });

  const shortcut = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (dialog.open) dialog.close();
      else dialog.showModal();
    }
  };
  const w = window as unknown as { __dfhPalette?: (e: KeyboardEvent) => void };
  if (w.__dfhPalette) window.removeEventListener('keydown', w.__dfhPalette);
  w.__dfhPalette = shortcut;
  window.addEventListener('keydown', shortcut);
};
