/* A demo of the product's script for a sortable Table. A sort Button sorts
   the body's rows by its column, sets aria-sort on its <th> (and removes it
   from the others), swaps the icons, and says the order in a role="status"
   element. A second press reverses it. It is product code, not part of the
   library. */
export const enhance = (root: ParentNode) => {
  root.querySelectorAll<HTMLTableElement>('table').forEach((table) => {
    const heads = [...table.querySelectorAll<HTMLTableCellElement>('thead th')];
    const status = table.closest('[data-demo]')?.querySelector<HTMLElement>('[role="status"]');
    const icon = (th: HTMLTableCellElement, name: string) => {
      const use = th.querySelector('use');
      use?.setAttribute('href', use.getAttribute('href')!.replace(/#.*$/, `#${name}`));
    };
    heads.forEach((th, column) => {
      th.querySelector('.table__sort-button')?.addEventListener('click', () => {
        const order = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        heads.forEach((other) => {
          if (other === th) return;
          other.removeAttribute('aria-sort');
          icon(other, 'chevrons-up-down');
        });
        th.setAttribute('aria-sort', order);
        icon(th, 'chevron-down');
        const body = table.tBodies[0];
        const key = (row: HTMLTableRowElement) => row.cells[column].textContent!.trim();
        const rows = [...body.rows].sort((a, b) => key(a).localeCompare(key(b), undefined, { numeric: true }));
        if (order === 'descending') rows.reverse();
        body.append(...rows);
        if (status) status.textContent = `Sorted by ${th.textContent!.trim()}, ${order}`;
      });
    });
  });
};
