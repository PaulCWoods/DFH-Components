/* A demo of the product's script for Batch Actions. Choosing items shows the
   bar with the count, and the count goes in a role="status" element outside
   the bar, so the first one is announced too. Clear selection unchecks
   everything, moves focus back to the list and hides the bar. It is
   product code, not part of the library. */
export const enhance = (root: ParentNode) => {
  const bar = root.querySelector<HTMLElement>('.batch-actions');
  if (!bar) return;
  const boxes = [...root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];
  const summary = bar.querySelector<HTMLElement>('.batch-actions__summary');
  const status = [...root.querySelectorAll<HTMLElement>('[role="status"]')].find((s) => !bar.contains(s));
  const update = () => {
    const count = boxes.filter((b) => b.checked).length;
    bar.hidden = count === 0;
    const text = count ? `${count} selected` : 'Selection cleared';
    if (summary && count) summary.textContent = text;
    if (status) status.textContent = text;
  };
  boxes.forEach((b) => b.addEventListener('change', update));
  bar.querySelector('.batch-actions__dismiss')?.addEventListener('click', () => {
    boxes.forEach((b) => (b.checked = false));
    boxes[0]?.focus();
    update();
  });
};
