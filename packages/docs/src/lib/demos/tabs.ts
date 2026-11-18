/* A demo of the product's script, so the examples can be tried: the WAI-ARIA
   Tabs pattern, with roving tabindex. It is product code, not part of the
   library. */
export const enhance = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>('[role="tablist"]').forEach((list) => {
    const tabs = () => [...list.querySelectorAll<HTMLElement>('[role="tab"]')];
    const select = (tab: HTMLElement) => {
      tabs().forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        if (on) t.removeAttribute('tabindex');
        else t.tabIndex = -1;
        const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
        if (panel) panel.hidden = !on;
      });
      tab.focus();
    };
    list.addEventListener('click', (e) => {
      const tab = (e.target as HTMLElement).closest<HTMLElement>('[role="tab"]');
      if (tab) select(tab);
    });
    list.addEventListener('keydown', (e) => {
      const all = tabs();
      const current = all.indexOf(e.target as HTMLElement);
      if (current < 0) return;
      const vertical = list.classList.contains('tab-list--vertical');
      const rtl = getComputedStyle(list).direction === 'rtl';
      const next = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
      const previous = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
      const target = e.key === next ? all[(current + 1) % all.length]
        : e.key === previous ? all[(current - 1 + all.length) % all.length]
        : e.key === 'Home' ? all[0]
        : e.key === 'End' ? all[all.length - 1]
        : null;
      if (target) {
        e.preventDefault();
        select(target);
      }
    });
  });
};
