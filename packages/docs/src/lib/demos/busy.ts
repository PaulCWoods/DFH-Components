/* A demo of the product's script for a busy Button. A press adds .is-busy
   and aria-disabled="true" (the Button keeps its focus, and the library
   shows the Spinner), says what's happening in a role="status" element,
   and when the work ends says how it went. Presses while busy are ignored,
   since a keyboard can still press an aria-disabled Button. It is product
   code, not part of the library. */
export const enhance = (root: ParentNode) => {
  const status = root.querySelector<HTMLElement>('[role="status"]');
  root.querySelectorAll<HTMLButtonElement>('button[data-busy]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-disabled') === 'true') return;
      button.classList.add('is-busy');
      button.setAttribute('aria-disabled', 'true');
      if (status) status.textContent = button.dataset.busy!;
      setTimeout(() => {
        button.classList.remove('is-busy');
        button.removeAttribute('aria-disabled');
        if (status) status.textContent = button.dataset.done ?? '';
      }, 2000);
    });
  });
};
