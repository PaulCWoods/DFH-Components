/* A demo of the product's script for removable Chips. A Chip's remove
   Button takes the Chip away, moves focus to the next Chip's remove Button
   (or the one before, or another control when none are left), and says
   what went in a role="status" element. The demo adds a Button to put
   them back. It is product code, not part of the library. */
export const enhance = (root: ParentNode) => {
  const list = root.querySelector<HTMLElement>('[data-chips]');
  const status = root.querySelector<HTMLElement>('[role="status"]');
  const again = root.querySelector<HTMLButtonElement>('[data-show-again]');
  if (!list) return;
  const original = list.innerHTML;
  const wire = () => {
    list.querySelectorAll<HTMLElement>('.chip').forEach((chip) => {
      chip.querySelector('.chip__remove')?.addEventListener('click', () => {
        const chips = [...list.querySelectorAll<HTMLElement>('.chip')];
        const at = chips.indexOf(chip);
        const next = chips[at + 1] ?? chips[at - 1];
        const name = chip.querySelector('.chip__text')!.textContent!.trim();
        (chip.closest('li') ?? chip).remove();
        if (status) status.textContent = `Removed ${name}`;
        if (again) again.hidden = false;
        (next?.querySelector<HTMLElement>('.chip__remove') ?? again)?.focus();
      });
    });
  };
  wire();
  again?.addEventListener('click', () => {
    list.innerHTML = original;
    wire();
    again.hidden = true;
    if (status) status.textContent = 'All plants back';
    list.querySelector<HTMLElement>('.chip__remove')?.focus();
  });
};
