/* A demo of the product's script for a Range. The library draws the fill
   from --value, and the browser moves the thumb; keeping the two in step,
   and the readout beside them, is a few lines of the product's own. It is
   product code, not part of the library.

   - The fill: --value as a percentage of the range, on every input.
   - The readout: an <output for="…"> keeps its words and changes its
     number ("65%" becomes "70%").
   - Scale labels: a stepped range under .range__scale-ticks reads its
     label out through aria-valuetext ("M" rather than "50").
   - A Range Lockup's mute button: aria-pressed and its icon. */
export const enhance = (root: ParentNode) => {
  root.querySelectorAll<HTMLInputElement>('input.range').forEach((range) => {
    const ticks = range.parentElement?.querySelector('.range__scale-ticks');
    const update = () => {
      const min = Number(range.min || 0);
      const max = Number(range.max || 100);
      const value = Number(range.value);
      const percent = ((value - min) / (max - min)) * 100;
      range.style.setProperty('--value', `${percent}%`);
      if (ticks) {
        const labels = [...ticks.children].map((t) => t.textContent!.trim());
        const step = Number(range.step || 1);
        const label = labels[Math.round((value - min) / step)];
        if (label) range.setAttribute('aria-valuetext', label);
      }
      const output = range.id && root.querySelector<HTMLOutputElement>(`output[for~="${range.id}"]`);
      if (output) output.textContent = output.textContent!.replace(/-?\d+(\.\d+)?/, String(value));
    };
    range.addEventListener('input', update);
  });

  root.querySelectorAll<HTMLButtonElement>('.range-lockup button[aria-pressed]').forEach((button) => {
    const use = button.querySelector('use');
    button.addEventListener('click', () => {
      const on = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(on));
      use?.setAttribute('href', use.getAttribute('href')!.replace(/#.*$/, on ? '#volume-x' : '#volume-2'));
    });
  });
};
