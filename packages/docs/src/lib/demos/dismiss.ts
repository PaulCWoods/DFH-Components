/* A demo of the product's script for dismissing a Banner. Dismiss moves
   focus first, since the Button it is on is about to go, then sets hidden,
   and the Banner fades out. The demo adds a Button to bring it back. It is
   product code, not part of the library. */
export const enhance = (root: ParentNode) => {
  const again = root.querySelector<HTMLButtonElement>('[data-show-again]');
  root.querySelectorAll<HTMLElement>('.banner').forEach((banner) => {
    banner.querySelector('.banner__action')?.addEventListener('click', () => {
      if (again) {
        again.hidden = false;
        again.focus();
      }
      banner.hidden = true;
    });
    again?.addEventListener('click', () => {
      banner.hidden = false;
      again.hidden = true;
      banner.querySelector<HTMLElement>('.banner__action')?.focus();
    });
  });
};
