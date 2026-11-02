/* ==========================================================================
   Shape: radii, border widths and shadows
   --------------------------------------------------------------------------
   Reads the `shape` section of tokens/theme.json and writes the radius and
   border roles and the shadows of 2-semantic.json, adding the Tier 1 steps
   they point at to 1-global.json (steps are added, never removed: Tier 3 may
   choose one directly).

   Every size is a Tier 1 spacing step, named by its pixels, so shape and space
   share one scale. `default` names the role --radius or --border-width
   follows. round and full stay as they are. A shadow level is a stack of
   layers (y, blur, spread) in the shadow colour; each level has a -light twin
   in the lighter colour. The inner level's layers are inset. Lines are the
   roles that compose those values into a job: rules, panels, the app shell,
   control edges, underlines and the focus ring. border.width.none stays 0.
   ========================================================================== */

export const RADIUS_ROLES = ['sm', 'md', 'lg', 'xl'];
/* What --radius can follow: square corners are a choice, radius.none stays 0 */
export const RADIUS_DEFAULTS = ['none', ...RADIUS_ROLES];
export const BORDER_ROLES = ['thin', 'medium', 'thick'];
export const SHADOW_LEVELS = ['sm', 'md', 'lg'];

export const LINE_WIDTHS = ['none', 'thin', 'medium', 'thick', 'default'];
export const LINE_STYLES = ['solid', 'dashed', 'dotted', 'double'];
export const LINE_RADII = [...RADIUS_DEFAULTS, 'default'];
export const LINE_COLORS = ['border.color.default', 'border.color.muted', 'border.color.quiet', 'border.color.control', 'border.color.accent', 'color.muted', 'color.quiet', 'color.focus'];

/* Each line's fields, and the Tier 2 token each field writes */
export const LINES = {
  rule: { width: 'width', color: 'color', style: 'style' },
  panel: { width: 'border-width', color: 'border-color', style: 'border-style', radius: 'radius' },
  app: { width: 'border-width', color: 'border-color', style: 'border-style' },
  control: { width: 'border-width', color: 'border-color' },
  underline: { width: 'thickness', color: 'color', offset: 'offset' },
  'focus-ring': { width: 'width', color: 'color', offset: 'offset' },
};
/* These have to show: a control's edge (WCAG 1.4.11), a link's underline
   (1.4.1) and the focus ring, which is at least 2px (2.4.13) */
const MUST_SHOW = ['control', 'underline', 'focus-ring'];

const ref = (group, role) => (role === 'default' ? `{${group}}` : `{${group}.${role}}`);
const lineValue = (field, value) => {
  if (field === 'width' || field === 'offset') return ref('border.width', value);
  if (field === 'radius') return ref('radius', value);
  if (field === 'color') return `{${value.replace(/\.default$/, '')}}`;
  return value;
};
const cssRef = (value) => `var(--${value.slice(1, -1).replaceAll('.', '-')})`;

const px = (n) => (n === 0 ? '0' : `${n}px`);

/* The Tier 1 spacing steps as numbers, smallest first */
export const spacingSteps = (global) => Object.keys(global.spacing).filter((k) => /^\d+$/.test(k)).map(Number).sort((a, b) => a - b);

/* Tier 1: a step for each value a role uses */
export const shapeGlobal = (global, shape) => {
  const out = structuredClone(global);
  for (const r of RADIUS_ROLES) out.radius[shape.radius[r]] ??= { $value: `${shape.radius[r]}px` };
  for (const r of BORDER_ROLES) out['border-width'][shape.border[r]] ??= { $value: `${shape.border[r]}px` };
  return out;
};

const shadowColor = ({ light, dark }) => {
  const mix = ({ color, transparent }) => `color-mix(in srgb, {color.${color}}, transparent {translucency.${transparent}})`;
  return `light-dark(${mix(light)}, ${mix(dark)})`;
};

const layers = (level, colorRef) =>
  level.layers.map(({ y, blur, spread }) => ({
    x: '0',
    y: px(y),
    blur: px(blur),
    spread: px(spread),
    color: colorRef,
    ...(level.inset ? { type: 'innerShadow' } : {}),
  }));

/* Tier 2: descriptions already written are kept */
export const applyShape = (semantic, shape) => {
  const out = structuredClone(semantic);
  for (const r of RADIUS_ROLES) out.radius[r].$value = `{radius.${shape.radius[r]}}`;
  out.radius.default.$value = `{radius.${shape.radius.default}}`;
  for (const r of BORDER_ROLES) out.border.width[r].$value = `{border.width.${shape.border[r]}}`;
  out.border.width.default.$value = `{border.width.${shape.border.default}}`;
  for (const [line, fields] of Object.entries(LINES)) {
    for (const [field, key] of Object.entries(fields)) out[line][key].$value = lineValue(field, shape.lines[line][field]);
  }
  out.shadow.color.$value = shadowColor(shape.shadow.color);
  out.shadow['color-light'].$value = shadowColor(shape.shadow['color-light']);
  for (const [name, level] of Object.entries(shape.shadow.levels)) {
    out.shadow[name].$value = layers(level, '{shadow.color}');
    out.shadow[`${name}-light`].$value = layers(level, '{shadow.color-light}');
  }
  return out;
};

/* How far a level's shadow reaches past the surface */
export const shadowReach = (level) => Math.max(...level.layers.map(({ y, blur, spread }) => y + blur + spread));

/* The gate: sizes on the spacing scale that never shrink up it, a default that
   exists, borders that can be seen, shadows that rise with their level */
export const shapeGate = (shape, { translucency, colors, steps } = {}) => {
  const rows = [];
  const fail = (style, message) => rows.push({ level: 'fail', rule: 'shape', style, message });
  const scale = (label, values, order, min, defaults = order) => {
    order.forEach((r, i) => {
      const v = values[r];
      if (!Number.isInteger(v) || v < min) fail(`${label} ${r}`, `${v}px isn't a whole number of pixels from ${min}px up`);
      else if (steps && !steps.includes(v)) fail(`${label} ${r}`, `${v}px isn't a spacing step`);
      if (i && v < values[order[i - 1]]) fail(`${label} ${r}`, `smaller than ${order[i - 1]}`);
    });
    if (!defaults.includes(values.default)) fail(`${label} default`, `${values.default} isn't one of ${defaults.join(', ')}`);
  };
  scale('radius', shape.radius, RADIUS_ROLES, 0, RADIUS_DEFAULTS);
  scale('border', shape.border, BORDER_ROLES, 1);

  const allowed = { width: LINE_WIDTHS, offset: LINE_WIDTHS, color: LINE_COLORS, style: LINE_STYLES, radius: LINE_RADII };
  for (const [line, fields] of Object.entries(LINES)) {
    for (const field of Object.keys(fields)) {
      if (!allowed[field].includes(shape.lines?.[line]?.[field])) fail(`${line} ${field}`, `${shape.lines?.[line]?.[field]} isn't one of ${allowed[field].join(', ')}`);
    }
    if (MUST_SHOW.includes(line) && shape.lines?.[line]?.width === 'none') fail(`${line} width`, "can't be none: it has to show");
  }
  const ringWidth = shape.lines?.['focus-ring']?.width;
  if (ringWidth && ringWidth !== 'none' && shape.border[ringWidth === 'default' ? shape.border.default : ringWidth] < 2) fail('focus-ring width', 'under 2px');

  for (const [name, level] of Object.entries(shape.shadow.levels)) {
    level.layers.forEach(({ y, blur, spread }, i) => {
      if (![y, blur, spread].every(Number.isFinite)) fail(`shadow ${name}`, `layer ${i + 1} needs a y, blur and spread`);
      if (steps && ![y, blur, spread].every((v) => steps.includes(v))) fail(`shadow ${name}`, `layer ${i + 1} has a size that isn't a spacing step`);
    });
  }
  SHADOW_LEVELS.slice(1).forEach((name, i) => {
    const below = SHADOW_LEVELS[i];
    if (shadowReach(shape.shadow.levels[name]) <= shadowReach(shape.shadow.levels[below])) fail(`shadow ${name}`, `reaches no further than ${below}, so it wouldn't look higher`);
  });
  if (colors) {
    for (const key of ['color', 'color-light']) {
      for (const mode of ['light', 'dark']) {
        const { color } = shape.shadow[key][mode];
        if (!colors.includes(color)) fail(`shadow ${key}`, `${color} in ${mode} mode isn't in the palette`);
      }
    }
  }
  if (translucency) {
    for (const key of ['color', 'color-light']) {
      for (const mode of ['light', 'dark']) {
        const step = shape.shadow[key][mode].transparent;
        if (!(step in translucency)) fail(`shadow ${key}`, `${step}% in ${mode} mode isn't a translucency step`);
      }
    }
  }
  return { rows, failures: rows.filter((r) => r.level === 'fail'), reports: rows.filter((r) => r.level === 'report') };
};

/* The preview's custom properties, as the compiler names them. hexOf turns a
   palette colour (hue.step, white or black) into a value. */
export const shapeCssVars = (shape, hexOf) => {
  const vars = {};
  for (const r of RADIUS_ROLES) vars[`--radius-${r}`] = `${shape.radius[r]}px`;
  vars['--radius-none'] = '0px';
  vars['--radius'] = `var(--radius-${shape.radius.default})`;
  for (const r of BORDER_ROLES) vars[`--border-width-${r}`] = `${shape.border[r]}px`;
  vars['--border-width'] = `var(--border-width-${shape.border.default})`;
  for (const [line, fields] of Object.entries(LINES)) {
    for (const [field, key] of Object.entries(fields)) {
      const value = lineValue(field, shape.lines[line][field]);
      vars[`--${line}-${key}`] = field === 'style' ? value : cssRef(value);
    }
  }
  const mix = ({ color, transparent }) => `color-mix(in srgb, ${hexOf(color)}, transparent ${transparent}%)`;
  vars['--shadow-color'] = `light-dark(${mix(shape.shadow.color.light)}, ${mix(shape.shadow.color.dark)})`;
  vars['--shadow-color-light'] = `light-dark(${mix(shape.shadow['color-light'].light)}, ${mix(shape.shadow['color-light'].dark)})`;
  for (const [name, level] of Object.entries(shape.shadow.levels)) {
    level.layers.forEach(({ y, blur, spread }, i) => {
      vars[`--_shadow-${name}-layer-${i + 1}`] = `${level.inset ? 'inset ' : ''}0 ${px(y)} ${px(blur)} ${px(spread)}`;
    });
  }
  return vars;
};
