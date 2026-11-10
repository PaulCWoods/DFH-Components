/* ==========================================================================
   The theme format
   --------------------------------------------------------------------------
   What a theme file (tokens/themes/<name>.json) may hold, as a JSON Schema
   (2020-12). build:themes writes it out as theme-v<n>.schema.json for
   editors and other tools; the engine checks every theme against it before
   any gate runs (validate.js).

   A theme file names its format: "version": 1. A file without one is from
   before the format had a number, and is version 1. When the format
   changes, the version goes up and upgradeTheme() rewrites older files, so
   a saved theme always keeps working.

   The schema checks shape: which keys exist, what kind of value each takes.
   The gates check meaning: contrast, a scale in order, a font's weights.

   A theme file starts with "$schema" (this schema's address, so editors
   check and complete it) and may have a "$description" or "$comment".
   A sub-brand ("extends") is checked as a partial: it
   needs nothing, and null removes what its parent sets. The theme it makes,
   merged over its parent, is then checked whole.
   ========================================================================== */

export const THEME_VERSION = 1;
export const THEME_SCHEMA_URL = `https://components.designforhumans.blog/schema/theme-v${THEME_VERSION}.schema.json`;

const name = '^[a-z][a-z0-9-]*$';
const path = '^[a-z0-9-]+(\\.[a-z0-9-]+)*$';
const hex = { type: 'string', pattern: '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$', description: 'a hex colour, such as #0055ff' };
const length = { type: 'string', pattern: '^-?(\\d+\\.?\\d*|\\.\\d+)(rem|px|em|ch)$', description: 'a length in rem, px, em or ch, such as 1rem' };
const step = { type: 'integer', description: 'a step on the scale (a whole number)' };
const pair = (item) => ({ type: 'array', items: item, minItems: 2, maxItems: 2 });
const map = (keys, value, description) => ({ type: 'object', propertyNames: { pattern: keys }, additionalProperties: value, ...(description ? { description } : {}) });
const shut = (properties, more = {}) => ({ type: 'object', properties, additionalProperties: false, ...more });
const modes = (value) => shut({ light: value, dark: value });
const lightness = { type: 'number', minimum: 0, maximum: 1, description: 'an OKLCH lightness from 0 to 1' };

export const themeSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: THEME_SCHEMA_URL,
  title: 'Design For Humans theme',
  description: 'A theme for the Design For Humans component library: its colours, type, spacing, shape, motion and component tokens. A sub-brand ("extends") holds only what differs from its parent.',
  type: 'object',
  properties: {
    $schema: { type: 'string', description: 'the address of this schema' },
    $description: { type: 'string', description: 'what the theme is for' },
    $comment: { type: 'string' },
    version: { const: THEME_VERSION, description: `the theme format's version (${THEME_VERSION})` },
    extends: { type: 'string', pattern: name, description: 'the theme this sub-brand changes' },

    /* Colour: one lightness curve and its ends, every hue's seed */
    curve: { $ref: '#/$defs/curve' },
    ends: shut({ light: lightness, dark: lightness }, { description: 'the lightness of steps 100 and 900' }),
    chroma: shut({ light: { type: 'number', minimum: 0 }, dark: { type: 'number', minimum: 0 } }, { description: 'how much of each hue\'s chroma steps 100 and 900 keep' }),
    fixed: shut({ white: hex, black: hex }, { description: 'the theme\'s white and black' }),
    hues: map(name, { $ref: '#/$defs/hue' }, 'each colour ramp, by name'),
    roles: map(path, modes({ type: 'string', description: 'a palette step (neutral.900), white or black' }), 'each colour role\'s palette step in light and dark'),
    mixes: map(path, modes({ $ref: '#/$defs/mix' }), 'colours made from another colour'),
    contrast: shut(
      {
        steps: { type: 'integer', minimum: 0, description: 'how many steps each role moves under high contrast' },
        extra: map(path, { type: ['string', 'number'] }, 'other tokens high contrast changes'),
      },
      { description: 'high contrast (prefers-contrast: more)' },
    ),

    type: { $ref: '#/$defs/type' },
    space: { $ref: '#/$defs/space' },
    shape: { $ref: '#/$defs/shape' },
    motion: shut({
      duration: map(name, { type: 'number', minimum: 0, description: 'seconds' }, 'the durations, in seconds'),
      ease: map(name, { type: 'string', description: 'linear or a cubic-bezier()' }, 'the easing curves'),
    }),
    components: map(path, { type: ['string', 'number'], description: 'a token reference such as {radius}, a keyword, or a plain number' }, 'Tier 3 component tokens the theme changes'),
  },
  required: ['version'],
  /* A full theme has its colours; a sub-brand takes its parent's */
  if: { required: ['extends'] },
  else: { required: ['hues', 'roles'] },
  additionalProperties: false,

  $defs: {
    curve: { type: 'string', description: 'linear, a preset (soft-s) or a cubic-bezier()' },
    hue: shut(
      {
        seed: hex,
        curve: { $ref: '#/$defs/curve' },
        ends: shut({ light: lightness, dark: lightness }),
        chroma: shut({ light: { type: 'number', minimum: 0 }, dark: { type: 'number', minimum: 0 } }),
        outside: map('^\\d+$', { type: 'number' }, 'extra steps beyond the ends (000, 1000): how much lighter or darker'),
        exact: { type: 'boolean', description: 'keep the seed exactly at its step' },
      },
      { required: ['seed'] },
    ),
    mix: shut(
      {
        color: { type: 'string', description: 'currentColor, white, black, a palette step or a role' },
        transparent: { type: 'number', minimum: 0, maximum: 100, description: 'a translucency step, in per cent' },
      },
      { required: ['color'] },
    ),

    font: shut(
      {
        source: { enum: ['google', 'adobe', 'local', 'system'] },
        family: { type: 'string' },
        fallback: { type: 'string', description: 'the stack used until the font loads, ending in a generic family' },
        figma: { type: 'string', description: 'the family as Figma names it' },
        kit: { type: 'string', pattern: '^[a-z0-9]+$', description: 'an Adobe Fonts kit id' },
        weights: { type: 'array', items: { type: 'integer', minimum: 1, maximum: 1000 } },
        axes: map('^[A-Za-z0-9]{4}$', pair({ type: 'number' }), 'a variable font\'s axes, each as [lowest, highest]'),
        italic: { type: 'boolean', description: 'load the italics too (Google)' },
        italicAxes: map('^[A-Za-z0-9]{4}$', { type: 'number' }, 'what the font\'s italic sets, such as { "ital": 1, "slnt": -10 }'),
        files: {
          type: 'array',
          items: shut(
            {
              path: { type: 'string', description: 'from the repository root' },
              weight: { type: 'integer', minimum: 1, maximum: 1000 },
              style: { enum: ['normal', 'italic', 'oblique'] },
            },
            { required: ['path'] },
          ),
        },
      },
      { required: ['source'] },
    ),
    family: shut({
      font: { type: 'string', pattern: name, description: 'one of the theme\'s fonts' },
      system: { enum: ['sans-serif', 'serif', 'monospace'] },
      use: { type: 'string', pattern: name, description: 'another family, to share its font' },
    }),
    style: shut({
      family: { type: 'string', pattern: name },
      weight: { type: 'string', pattern: name, description: 'a weight name, such as bold' },
      size: step,
      compact: step,
      growTo: step,
      leading: step,
      lineHeight: { type: 'number', exclusiveMinimum: 0 },
      letterSpacing: { type: 'string', pattern: name },
      case: { enum: ['none', 'uppercase', 'lowercase', 'capitalize'] },
      fluid: { type: 'boolean' },
      sizeOnStyle: { type: 'boolean' },
    }),
    type: shut({
      fonts: map(name, { $ref: '#/$defs/font' }, 'the fonts, by token name'),
      families: map(name, { $ref: '#/$defs/family' }, 'each font role (sans, serif, mono, display) and its font'),
      scale: shut({
        base: length,
        ratio: { type: 'number', exclusiveMinimum: 0 },
        steps: pair(step),
        min: { anyOf: [length, { const: '' }], description: 'the smallest size (a length), or empty for none' },
        ceiling: shut({ lower: { anyOf: [length, { const: 0 }] }, upper: { anyOf: [length, { const: 0 }] } }, { description: 'the largest sizes; 0 lifts one' }),
      }),
      leading: shut({ base: { type: 'number', exclusiveMinimum: 0 }, ratio: { type: 'number', exclusiveMinimum: 0 }, steps: pair(step) }),
      fluid: shut({ max: shut({ base: length, ratio: { type: 'number', exclusiveMinimum: 0 } }), viewports: pair(length) }),
      styles: map(name, { $ref: '#/$defs/style' }, 'each text style'),
      controls: map(name, shut({ size: step, leading: step }), 'the type inside controls at each size'),
    }),

    space: shut({
      base: length,
      ratio: { type: 'number', exclusiveMinimum: 0 },
      roles: map(name, shut({ from: length, step }, { required: ['step'] }), 'the fluid spacing roles'),
      'site-width': { type: 'string' },
      targets: shut({ sm: { type: 'number' }, default: { type: 'number' }, lg: { type: 'number' } }, { description: 'target sizes, in px' }),
      app: shut({
        'padding-inline': { type: ['string', 'number'], description: 'a spacing role, or a step in px' },
        'sidebar-width': { type: 'number', description: 'px' },
        'sidebar-compact-width': { type: 'number', description: 'px' },
      }),
    }),

    line: shut({
      width: { type: 'string' },
      color: { type: 'string' },
      style: { type: 'string' },
      radius: { type: ['string', 'number'] },
      offset: { type: ['string', 'number'] },
    }),
    shadowLevel: shut({
      inset: { type: 'boolean' },
      layers: { type: 'array', items: shut({ y: { type: 'number' }, blur: { type: 'number', minimum: 0 }, spread: { type: 'number' } }) },
    }),
    shape: shut({
      radius: map(name, { type: ['number', 'string'] }, 'radius roles: a size in px, or another role'),
      border: map(name, { type: ['number', 'string'] }, 'border widths: a size in px, or another role'),
      lines: map(name, { $ref: '#/$defs/line' }, 'each line: rule, panel, control, focus ring'),
      shadow: shut({
        color: modes({ $ref: '#/$defs/mix' }),
        'color-light': modes({ $ref: '#/$defs/mix' }),
        levels: map(name, { $ref: '#/$defs/shadowLevel' }, 'each shadow level'),
      }),
    }),
  },
};
