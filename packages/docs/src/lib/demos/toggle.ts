/* A demo of the product's script for toggle Buttons: a press flips
   aria-pressed, and the library shows the state. The label stays the same
   ("Bold", not "Bold on"). An Input Frame's and a Range Lockup's Buttons
   have scripts of their own. It is product code, not part of the library. */
export const enhance = (root: ParentNode) => {
  root.querySelectorAll<HTMLButtonElement>('button[aria-pressed]:not(.input-frame *, .range-lockup *)').forEach((button) => {
    button.addEventListener('click', () => {
      button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
    });
  });
};
