/* ==========================================================================
   A playground's source as code and as live markup
   --------------------------------------------------------------------------
   Used by remark-docs for the first render and by the page script after each
   choice, so the two can't differ. In the source, data-axes (after class) marks
   the element that takes the chosen classes and data-label the element whose
   text a choice can replace. Neither reaches the page.
   ========================================================================== */

/* The shown code points at #Name; the page's copy at the sprite file */
export const toLive = (code) => code.replace(/(<use\s+href=")#([A-Za-z][\w-]*")/g, '$1/icons.svg#$2');

export const compose = (source, classes = [], text) => source
  .replace(/class="([^"]*)"([^>]*?)\s*data-axes/, (_, base, rest) => `class="${[base, ...classes].filter(Boolean).join(' ')}"${rest}`)
  .replace(/(<[^>]*?)\s*data-label([^>]*>)([^<]*)</, (_, open, close, current) => `${open}${close}${text ?? current}<`);
