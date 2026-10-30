/* A fixed set of fonts and families for the tests about font handling, so
   they test the engine rather than whichever fonts tokens/theme.json names
   today: a variable Google sans with italics, a static serif and mono, and a
   display face that loads one weight (800). */
export const useFixtureFonts = (type) => {
  type.fonts = {
    inter: { source: 'google', family: 'Inter', axes: { wght: [100, 900] }, italic: true, fallback: 'system-ui, sans-serif' },
    'pt-serif': { source: 'google', family: 'PT Serif', weights: [400, 700], italic: true, fallback: 'Cambria, serif' },
    'pt-mono': { source: 'google', family: 'PT Mono', weights: [400], fallback: 'Menlo, monospace' },
    'plus-jakarta-sans': { source: 'google', family: 'Plus Jakarta Sans', weights: [800], fallback: 'system-ui, sans-serif' },
  };
  type.families = { sans: { font: 'inter' }, serif: { font: 'pt-serif' }, mono: { font: 'pt-mono' }, display: { font: 'plus-jakarta-sans' } };
  return type;
};
