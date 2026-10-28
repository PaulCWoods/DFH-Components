/**
 * Shared markup and behaviour for the tab, tab list and tabbed content stories.
 * Not a story file: Storybook only loads *.stories.ts.
 */

export type TabStyle = 'underline' | 'segmented';
export type TabProminence = 'default' | 'subtle' | 'plain';

export interface ListOptions {
  style?: TabStyle;
  prominence?: TabProminence;
  sm?: boolean;
  round?: boolean;
  extra?: string[];
}

/** Class list for a .tab-list from its axes. */
export const listClasses = ({ style = 'underline', prominence = 'default', sm, round, extra = [] }: ListOptions = {}) =>
  [
    'tab-list',
    style === 'segmented' ? 'tab-list--segmented' : '',
    prominence !== 'default' ? `tab-list--${prominence}` : '',
    sm ? 'tab-list--sm' : '',
    round ? 'tab-list--round' : '',
    ...extra,
  ]
    .filter(Boolean)
    .join(' ');

export const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

/** Navigation tab list: links, the first one current. */
export const navList = (label: string, items: string[], options: ListOptions = {}, current = 0) => `
  <nav class="${listClasses(options)}" aria-label="${label}">
    ${items
      .map(
        (item, i) =>
          `<a href="#" class="tab"${i === current ? ' aria-current="page"' : ''}><span class="tab__text">${item}</span></a>`
      )
      .join('')}
  </nav>`;

let uid = 0;

/** Tablist with panels, inside .tabbed-content. */
export const tabbedContent = (
  label: string,
  items: { tab: string; panel: string }[],
  options: ListOptions & { layout?: string[] } = {}
) => {
  const id = `tc${++uid}`;
  return `
  <div class="${['tabbed-content', ...(options.layout ?? [])].join(' ')}">
    <div class="${listClasses(options)}" role="tablist" aria-label="${label}">
      ${items
        .map(
          (item, i) => `
        <button type="button" role="tab" id="${id}-t${i}" class="tab" aria-selected="${i === 0}" aria-controls="${id}-p${i}" tabindex="${i === 0 ? 0 : -1}">${item.tab}</button>`
        )
        .join('')}
    </div>
    ${items
      .map(
        (item, i) => `
      <div id="${id}-p${i}" role="tabpanel" class="tab-panel" aria-labelledby="${id}-t${i}" tabindex="0"${i === 0 ? '' : ' hidden'}>${item.panel}</div>`
      )
      .join('')}
  </div>`;
};

/**
 * Wires the APG tabs pattern (roving tabindex; arrow keys, Home and End;
 * selection follows focus) on every tablist, and moves aria-current between
 * navigation links on click. Products supply this behaviour themselves.
 */
export const withTabBehaviour = (html: string): HTMLElement => {
  const root = document.createElement('div');
  root.innerHTML = html;

  root.querySelectorAll<HTMLElement>('[role="tablist"]').forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll<HTMLElement>('[role="tab"]'));

    const select = (next: HTMLElement) => {
      tabs.forEach((tab) => {
        const selected = tab === next;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = root.querySelector<HTMLElement>(`#${tab.getAttribute('aria-controls')}`);
        if (panel) panel.hidden = !selected;
      });
      next.focus();
    };

    tabs.forEach((tab) => tab.addEventListener('click', () => select(tab)));

    tablist.addEventListener('keydown', (event) => {
      const index = tabs.indexOf(document.activeElement as HTMLElement);
      if (index === -1) return;
      const { direction, flexDirection } = getComputedStyle(tablist);
      const vertical = flexDirection.startsWith('column');
      const rtl = direction === 'rtl';
      const forward = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
      const back = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
      const target =
        event.key === forward ? (index + 1) % tabs.length
        : event.key === back ? (index - 1 + tabs.length) % tabs.length
        : event.key === 'Home' ? 0
        : event.key === 'End' ? tabs.length - 1
        : -1;
      if (target === -1) return;
      event.preventDefault();
      select(tabs[target]);
    });
  });

  root.querySelectorAll<HTMLAnchorElement>('nav.tab-list a.tab').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      link.closest('.tab-list')?.querySelectorAll('a.tab').forEach((other) => other.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');
    });
  });

  return root;
};
