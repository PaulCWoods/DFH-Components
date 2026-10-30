/* ==========================================================================
   Colour maths: sRGB hex <-> OKLCH, gamut mapping, WCAG 2 and APCA contrast.
   Pure functions with no dependencies, so the same code runs in Node (the
   build) and in the browser (Storybook, the Token Designer).
   ========================================================================== */

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

/** '#rgb' or '#rrggbb' -> [r, g, b] in 0..1 (gamma-encoded sRGB). */
export const hexToRgb = (hex) => {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Not a hex colour: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};

/** [r, g, b] in 0..1 -> '#rrggbb'. Values are clamped to the gamut. */
export const rgbToHex = (rgb) =>
  '#' +
  rgb
    .map((c) => Math.round(Math.min(1, Math.max(0, c)) * 255).toString(16).padStart(2, '0'))
    .join('');

/** Linear sRGB -> OKLab [L, a, b]. */
const linearToOklab = ([r, g, b]) => {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

/** OKLab [L, a, b] -> linear sRGB (may fall outside 0..1). */
const oklabToLinear = ([L, a, b]) => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
};

/** '#hex' -> { l, c, h }: lightness 0..1, chroma, hue in degrees. */
export const hexToOklch = (hex) => {
  const [L, a, b] = linearToOklab(hexToRgb(hex).map(toLinear));
  const c = Math.hypot(a, b);
  const h = c < 1e-4 ? 0 : ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  return { l: L, c, h };
};

const oklchToLinear = ({ l, c, h }) => {
  const r = (h * Math.PI) / 180;
  return oklabToLinear([l, c * Math.cos(r), c * Math.sin(r)]);
};

const EPS = 1e-6;
export const inGamut = (lch) => oklchToLinear(lch).every((v) => v >= -EPS && v <= 1 + EPS);

/** The most chroma a lightness and hue can carry inside sRGB. */
export const maxChroma = (l, h) => {
  let lo = 0;
  let hi = 0.4;
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut({ l, c: mid, h })) lo = mid;
    else hi = mid;
  }
  return lo;
};

/** OKLCH -> '#hex', reducing chroma (never lightness or hue) to fit sRGB. */
export const oklchToHex = ({ l, c, h }) => {
  const fit = Math.min(c, maxChroma(l, h));
  return rgbToHex(oklchToLinear({ l, c: fit, h }).map((v) => toGamma(Math.min(1, Math.max(0, v)))));
};

/** Formats OKLCH for CSS: 'oklch(52.0% 0.120 305.0)'. */
export const formatOklch = ({ l, c, h }) =>
  `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(3)} ${h.toFixed(1)})`;

/* --------------------------------------------------------------------------
   Contrast
   -------------------------------------------------------------------------- */

/** WCAG 2 relative luminance. */
export const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG 2 contrast ratio, 1..21. */
export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** APCA (0.0.98G-4g) lightness contrast Lc of text on a background. */
export const apca = (text, background) => {
  const y = (hex) => {
    const [r, g, b] = hexToRgb(hex).map((c) => c ** 2.4);
    const Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
    return Y < 0.022 ? Y + (0.022 - Y) ** 1.414 : Y;
  };
  const Yt = y(text);
  const Yb = y(background);
  if (Yb > Yt) {
    const c = (Yb ** 0.56 - Yt ** 0.57) * 1.14;
    return c < 0.1 ? 0 : (c - 0.027) * 100;
  }
  const c = (Yb ** 0.65 - Yt ** 0.62) * 1.14;
  return c > -0.1 ? 0 : (c + 0.027) * 100;
};
