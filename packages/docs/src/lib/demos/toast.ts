/* A demo of the product's script for Toasts. The stack is in the page from
   the start (role="status", popover="manual") and opened once; each Toast
   is a copy of a <template> added to it, so it is announced. A Toast stays
   at least 5 seconds, longer while it is hovered or focused, and its
   Dismiss Button removes it. Focus never moves to a Toast. It is product
   code, not part of the library. */
export const enhance = (root: ParentNode) => {
  const stack = root.querySelector<HTMLElement>('.toast-stack');
  const template = root.querySelector<HTMLTemplateElement>('template');
  const trigger = root.querySelector<HTMLButtonElement>('[data-raise]');
  if (!stack || !template || !trigger) return;
  stack.showPopover();
  trigger.addEventListener('click', () => {
    const toast = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    let timer = 0;
    const remove = () => {
      if (toast.contains(document.activeElement)) trigger.focus();
      toast.remove();
    };
    const start = () => (timer = window.setTimeout(remove, 5000));
    const pause = () => window.clearTimeout(timer);
    toast.addEventListener('pointerenter', pause);
    toast.addEventListener('pointerleave', start);
    toast.addEventListener('focusin', pause);
    toast.addEventListener('focusout', start);
    toast.querySelector('.banner__action')?.addEventListener('click', remove);
    stack.append(toast);
    start();
  });
};
