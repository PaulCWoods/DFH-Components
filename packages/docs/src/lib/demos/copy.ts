/* A demo of the product's script for a Code Block's copy Button. The Button
   stays hidden until the script runs and the clipboard is there, so it never
   shows when it can't work. A press copies the code and says so in a
   role="status" element. It is product code, not part of the library. */
export const enhance = (root: ParentNode) => {
  if (!navigator.clipboard) return;
  root.querySelectorAll<HTMLElement>('.code-block').forEach((block) => {
    const button = block.querySelector<HTMLButtonElement>('.code-block__bar button');
    const status = block.querySelector<HTMLElement>('[role="status"]');
    if (!button) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(block.querySelector('code')!.textContent!);
      if (status) status.textContent = 'Copied';
      else {
        /* No status element: say it on the Button for a moment */
        const label = button.querySelector('span') ?? button;
        const text = label.textContent;
        label.textContent = 'Copied';
        setTimeout(() => (label.textContent = text), 2000);
      }
    });
  });
};
