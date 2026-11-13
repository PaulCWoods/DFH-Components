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
    /* Disabled options stay reachable with the arrow keys, so people learn
       they exist; they just can't be chosen */
    const visible = () => options().filter((o) => !o.hidden);
    const disabled = (o: HTMLElement) => o.getAttribute('aria-disabled') === 'true';
    const label = (o: HTMLElement) => (o.querySelector('[data-label]') ?? o).textContent!.trim().replace(/\s+/g, ' ');

    const isOpen = () => input.getAttribute('aria-expanded') === 'true';
    const show = (on: boolean) => {
      input.setAttribute('aria-expanded', String(on));
      if (!list.hasAttribute('popover')) return;
      if (on && !list.matches(':popover-open')) list.showPopover();
      if (!on && list.matches(':popover-open')) list.hidePopover();
    };
    const open = () => {
      if (isOpen()) return;
      show(true);
      filter();
    };
    const close = () => {
      if (isStatic || !isOpen()) return;
      show(false);
      setActive(null);
    };
    /* Clearing a single select's text clears its choice too */
    const clear = () => {
      input.value = '';
      if (!multi) options().forEach((o) => o.setAttribute('aria-selected', 'false'));
      filter();
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
      /* Nothing to show: the list closes rather than point at nothing */
      if (!isStatic && isOpen() && !n) show(false);
    };
    const chip = (o: HTMLElement) => {
      const c = document.createElement('span');
      c.className = 'chip chip--subtle';
      c.dataset.for = o.id;
      c.innerHTML = `<span class="chip__text">${label(o)}</span><button type="button" class="chip__remove" aria-label="Remove ${label(o)}"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg></button>`;
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
      o.addEventListener('click', () => {
        if (!disabled(o)) select(o);
      });
    });
    /* A press anywhere in the list (an option, a group label, the
       scrollbar) keeps focus in the input; tabindex="-1" keeps it in the
       box where a browser moves it anyway */
    list.tabIndex = -1;
    list.addEventListener('mousedown', (e) => e.preventDefault());
    /* A press on the field outside the input (an icon, between Chips) puts
       focus in the input */
    box.querySelector('.combobox__control')?.addEventListener('mousedown', (e) => {
      const t = e.target as HTMLElement;
      if (t === input || t.closest('button')) return;
      e.preventDefault();
      input.focus();
    });
    input.addEventListener('input', () => {
      if (isOpen()) filter();
      else {
        show(true);
        filter();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        open();
        /* Read the options after opening, which filters them */
        const v = visible();
        const cur = v.findIndex((o) => o.classList.contains('is-active'));
        const step = e.key === 'ArrowDown' ? 1 : -1;
        setActive(v[(cur + step + v.length) % v.length] ?? null);
        return;
      }
      const v = visible();
      const cur = v.findIndex((o) => o.classList.contains('is-active'));
      if (e.key === 'Enter' && cur > -1) {
        e.preventDefault();
        if (!disabled(v[cur])) select(v[cur]);
      } else if (e.key === 'Escape') {
        if (isOpen() && !isStatic) close();
        else clear();
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
      clear();
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
