/* ==========================================================================
   Roles
   Each Tier 2 colour role names one palette colour for light mode and one
   for dark: { "light": "neutral.800", "dark": "neutral.000" }. A colour is a
   ramp step ("hue.step") or a fixed colour ("white", "black"). The roles
   live in tokens/theme.json and are written into tokens/2-semantic.json as
   light-dark({color.neutral.800}, {color.neutral.000}).
   ========================================================================== */

/* Groups in the order the designer lists them: [label, path prefix] */
export const ROLE_GROUPS = [
  ['Surface', 'surface.'],
  ['Foreground', 'foreground.'],
  ['Border', 'border.color.'],
];

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

/** "neutral.800" -> "{color.neutral.800}" */
export const ref = (colour) => `{color.${colour}}`;

/** The $value a role takes: one reference when both modes match. */
export const roleValue = ({ light, dark }) => (light === dark ? ref(light) : `light-dark(${ref(light)}, ${ref(dark)})`);

/** Whether a colour exists in the palette or among the fixed colours of `global`. */
export const colourExists = (colour, palette, global) => {
  const [hue, step] = colour.split('.');
  return step ? !!palette?.[hue]?.[step] : !!global?.color?.[hue];
};

/**
 * Returns a copy of `semantic` with every role in `roles` pointing at the
 * palette. Throws on a role that isn't in the semantic file or a colour
 * that doesn't exist.
 */
export const applyRoles = (semantic, roles = {}, { palette, global } = {}) => {
  const out = structuredClone(semantic);
  for (const [path, role] of Object.entries(roles)) {
    const token = get(out, path);
    if (!token || typeof token !== 'object' || !('$value' in token)) throw new Error(`Unknown role: ${path}`);
    for (const mode of ['light', 'dark']) {
      if (typeof role[mode] !== 'string') throw new Error(`${path} needs a ${mode} colour`);
      if (palette && !colourExists(role[mode], palette, global)) throw new Error(`${path}: there is no colour ${role[mode]}`);
    }
    token.$value = roleValue(role);
  }
  return out;
};

/** Every token path in `tokens`, in the order the file lists them. */
export const tokenPaths = (tokens, prefix = '') =>
  Object.entries(tokens).flatMap(([k, v]) =>
    k.startsWith('$') || !v || typeof v !== 'object' ? [] : '$value' in v ? [prefix + k] : tokenPaths(v, `${prefix}${k}.`),
  );

/**
 * Groups role paths for display: [{ label, roles: [path, …] }]. With
 * `semantic`, the roles follow the semantic file's order; otherwise the
 * order they're listed in.
 */
export const groupRoles = (roles = {}, semantic) => {
  let paths = Object.keys(roles);
  if (semantic) {
    const order = new Map(tokenPaths(semantic).map((p, i) => [p, i]));
    paths = paths.sort((a, b) => (order.get(a) ?? Infinity) - (order.get(b) ?? Infinity));
  }
  return ROLE_GROUPS.map(([label, prefix]) => ({ label, roles: paths.filter((p) => p.startsWith(prefix)) })).filter((g) => g.roles.length);
};
