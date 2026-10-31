/* A demo of the product's script, so the examples can be tried. Storybook and
   the docs site run it. It is product code, not part of the library. */
export const enhance = (root: HTMLElement) => {
  root.querySelectorAll<HTMLElement>('.combobox').forEach((box) => {
    const input = box.querySelector<HTMLInputElement>('.combobox__input');
    const list = box.querySelector<HTMLElement>('.combobox__listbox');
    if (!input || !list) return;
    const status = box.querySelector<HTMLElement>('[role="status"]');
    const empty = box.querySelector<HTMLElement>('.combobox__empty');
    const tags = box.querySelector<HTMLElement>('.combobox__tags');
    const multi = list.getAttribute('aria-multiselectable') === 'true';
    const isStatic = list.classList.contains('combobox__listbox--static');
    const options = () => [...list.querySelectorAll<HTMLElement>('[role="option"]')];
    const visible = () => options().filter((o) => !o.hidden && o.getAttribute('aria-disabled') !== 'true');
    const label = (o: HTMLElement) => (o.querySelector('[data-label]') ?? o).textContent!.trim().replace(/\s+/g, ' ');

    const isOpen = () => input.getAttribute('aria-expanded') === 'true';
    const open = () => {
      if (isOpen()) return;
      input.setAttribute('aria-expanded', 'true');
      if (list.hasAttribute('popover')) list.showPopover();
      filter();
    };
    const close = () => {
      if (isStatic || !isOpen()) return;
      input.setAttribute('aria-expanded', 'false');
      if (list.hasAttribute('popover') && list.matches(':popover-open')) list.hidePopover();
      setActive(null);
    };
    const setActive = (o: HTMLElement | null) => {
      options().forEach((x) => x.classList.toggle('is-active', x === o));
      if (o) {
        input.setAttribute('aria-activedescendant', o.id);
        o.scrollIntoView({ block: 'nearest' });
      } else input.removeAttribute('aria-activedescendant');
    };
    const filter = () => {
      const q = (multi || !list.querySelector('[aria-selected="true"]') || input.value !== label(list.querySelector('[aria-selected="true"]')!)) ? input.value.trim().toLowerCase() : '';
      let n = 0;
      options().forEach((o) => {
        o.hidden = !!q && !label(o).toLowerCase().includes(q);
        if (!o.hidden) n++;
      });
      list.querySelectorAll<HTMLElement>('[role="group"]').forEach((g) => {
        g.hidden = !g.querySelector('[role="option"]:not([hidden])');
      });
      if (empty) empty.hidden = n > 0;
      if (status) status.textContent = n ? `${n} result${n === 1 ? '' : 's'}` : 'No results';
      setActive(null);
    };
    const chip = (o: HTMLElement) => {
      const c = document.createElement('span');
      c.className = 'chip chip--subtle';
      c.dataset.for = o.id;
      c.innerHTML = `<span class="chip__text">${label(o)}</span><button type="button" class="chip__remove" aria-label="Remove ${label(o)}"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>`;
      return c;
    };
    const select = (o: HTMLElement) => {
      if (multi) {
        const on = o.getAttribute('aria-selected') !== 'true';
        o.setAttribute('aria-selected', String(on));
        if (on) tags?.append(chip(o));
        else tags?.querySelector(`[data-for="${o.id}"]`)?.remove();
        input.value = '';
        filter();
        setActive(o);
      } else {
        options().forEach((x) => x.setAttribute('aria-selected', String(x === o)));
        input.value = label(o);
        close();
      }
    };

    options().forEach((o, i) => {
      if (!o.id) o.id = `${list.id}-${i}`;
      o.addEventListener('mousedown', (e) => e.preventDefault());
      o.addEventListener('click', () => {
        if (o.getAttribute('aria-disabled') !== 'true') select(o);
      });
    });
    input.addEventListener('input', () => {
      if (isOpen()) filter();
      else open();
    });
    input.addEventListener('keydown', (e) => {
      const v = visible();
      const cur = v.findIndex((o) => o.classList.contains('is-active'));
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        open();
        const step = e.key === 'ArrowDown' ? 1 : -1;
        setActive(v[(cur + step + v.length) % v.length] ?? null);
      } else if (e.key === 'Enter' && cur > -1) {
        e.preventDefault();
        select(v[cur]);
      } else if (e.key === 'Escape') {
        if (isOpen() && !isStatic) close();
        else {
          input.value = '';
          filter();
        }
      } else if (e.key === 'Backspace' && multi && !input.value && tags?.lastElementChild) {
        const last = tags.lastElementChild as HTMLElement;
        list.querySelector(`#${last.dataset.for}`)?.setAttribute('aria-selected', 'false');
        last.remove();
      }
    });
    box.querySelector('.combobox__toggle')?.addEventListener('click', () => {
      if (isOpen()) close();
      else open();
      input.focus();
    });
    box.querySelector('.combobox__clear')?.addEventListener('click', () => {
      input.value = '';
      filter();
      input.focus();
    });
    tags?.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.chip__remove');
      if (!btn) return;
      const c = btn.closest<HTMLElement>('.chip')!;
      list.querySelector(`#${c.dataset.for}`)?.setAttribute('aria-selected', 'false');
      c.remove();
      input.focus();
    });
    box.addEventListener('focusout', (e) => {
      const to = (e as FocusEvent).relatedTarget as Node | null;
      if (!to || !box.contains(to)) close();
    });
    if (tags) {
      options().filter((o) => o.getAttribute('aria-selected') === 'true').forEach((o) => {
        const written = [...tags.querySelectorAll<HTMLElement>('.chip')].find((c) => c.textContent!.trim() === label(o));
        if (written) written.dataset.for = o.id;
        else tags.append(chip(o));
      });
    }
    if (isStatic) filter();
  });
  return root;
};
