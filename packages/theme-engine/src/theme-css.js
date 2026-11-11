/* ==========================================================================
   Theme engine: a theme's stylesheet
   What build:themes writes to packages/css/src/themes/<name>.css, as
   functions, so the Token Designer makes the same file in the browser.
   - compileTheme(): a theme's tokens and its whole variables.css
   - themeStylesheet(): a full theme as the difference from the library's
     variables.css; a sub-brand as the difference from its parent's, scoped
     to .theme-<name>. Both in the tokens layer, to link after the library.
   ========================================================================== */

import { buildTheme } from './build.js';
import { compileTokens } from './compile.js';
import { componentCss, componentValue } from './components.js';
import { cssDiff } from './css-diff.js';
import { changedTokens, scopeCss, scopeClass } from './sub-brand.js';
import { fontLinks, fontsCss } from './type.js';

/* A theme's tokens (buildTheme over the library's Tier 1 and 2) and the
   variables.css they compile to. Throws when a gate fails. */
export const compileTheme = (theme, { global, semantic, component }) => {
  const built = buildTheme(theme, { global, semantic, component });
  return { built, css: compileTokens({ global: built.global, semantic: built.semantic, component }).css };
};

const stripComment = (css) => css.replace(/^\/\*[\s\S]*?\*\/\s*/, '');

/* --------------------------------------------------------------------------
   themeStylesheet
   - name, theme (resolved, whole) and compiled (its variables.css)
   - parent: { name, theme, compiled, isDefault } for a sub-brand
   - defaultTheme and libraryCss: the library's own theme and variables.css
   - component: tokens/3-component.json
   - source: where the header says it came from
   Throws when a sub-brand can't be scoped (it changes an @function).
   -------------------------------------------------------------------------- */
export const themeStylesheet = ({ name, theme, compiled, parent, defaultTheme, libraryCss, component, source = `tokens/themes/${name}.json by npm run build:themes` }) => {
  /* A Tier 3 token the default customises and this theme doesn't goes back to its own default */
  const tier3Default = (path) => path.split('.').reduce((node, key) => node[key], component).$value;
  const effectiveComponents = (t) => {
    const reset = Object.fromEntries(
      Object.keys(defaultTheme.components ?? {})
        .filter((path) => !(path in (t.components ?? {})))
        .map((path) => [path, tier3Default(path)]),
    );
    return { ...reset, ...(t.components ?? {}) };
  };
  const fonts = stripComment(fontsCss(theme.type));
  const links = fontLinks(theme.type);
  const fontNote = links.length ? `\n   Its fonts also need, in the page head:\n${links.map((l) => `   ${l}`).join('\n')}` : '';
  let body, head;
  if (!parent) {
    head = `/* ${name}: generated from ${source}. Do not edit.\n   Link it after the library's CSS. It holds only what the theme changes.${fontNote} */`;
    /* The font faces, and the roles pointed at them, come after the diff so they win */
    body = [cssDiff(libraryCss, compiled), fonts, stripComment(componentCss(effectiveComponents(theme), component))];
  } else {
    /* Its fonts, when they differ from its parent's: the faces are global, the roles scoped */
    const ownFonts = fonts === stripComment(fontsCss(parent.theme.type)) ? '' : fonts;
    const faces = (ownFonts.match(/@font-face\s*\{[^}]*\}/g) ?? []).join('\n');
    const roles = ownFonts.replace(/@font-face\s*\{[^}]*\}/g, '');
    /* Its component tokens: only what differs from its parent, or reads a
       token the sub-brand changes (the parent's value was worked out on :root) */
    const changedNames = changedTokens(parent.compiled, compiled, roles);
    const own = effectiveComponents(theme);
    const inherited = effectiveComponents(parent.theme);
    const reads = (value) => [...componentValue(value).matchAll(/var\((--[\w-]+)/g)].some(([, n]) => changedNames.has(n));
    const value = (set, path) => set[path] ?? tier3Default(path);
    const paths = [...new Set([...Object.keys(own), ...Object.keys(inherited)])];
    const differs = Object.fromEntries(paths.filter((p) => value(own, p) !== value(inherited, p) || reads(value(own, p))).map((p) => [p, value(own, p)]));
    const scoped = scopeCss(name, parent.compiled, compiled, `${roles}\n${stripComment(componentCss(differs, component))}`);
    head = `/* ${name}: a sub-brand of ${parent.name}, generated from ${source}. Do not edit.\n   Link it after ${parent.isDefault ? "the library's CSS" : `themes/${parent.name}.css`}, and put class="${scopeClass(name).slice(1)}" on a region, or on <html> for a whole page.\n   It holds only what the sub-brand changes.${ownFonts ? fontNote : ''} */`;
    body = [faces, scoped];
  }
  return [head, '@layer tokens {', body.filter((s) => s.trim()).join('\n\n').replace(/^(?=.)/gm, '  '), '}', ''].join('\n');
};
