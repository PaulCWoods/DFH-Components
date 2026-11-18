/* A demo of the product's script for showing a password: the Input Frame's
   Button switches the field between password and text, sets aria-pressed
   and swaps the eye icon. Its label stays "Show password". It is product
   code, not part of the library. */
export const enhance = (root: ParentNode) => {
  root.querySelectorAll<HTMLButtonElement>('.input-frame button[aria-controls][aria-pressed]').forEach((button) => {
    const field = document.getElementById(button.getAttribute('aria-controls')!) as HTMLInputElement | null;
    const use = button.querySelector('use');
    if (!field) return;
    button.addEventListener('click', () => {
      const show = field.type === 'password';
      field.type = show ? 'text' : 'password';
      button.setAttribute('aria-pressed', String(show));
      use?.setAttribute('href', use.getAttribute('href')!.replace(/#.*$/, show ? '#eye-off' : '#eye'));
    });
  });
};
