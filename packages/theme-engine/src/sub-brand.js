/* ==========================================================================
   Sub-brands: a theme scoped to a class
   --------------------------------------------------------------------------
   A theme file with "extends" is a sub-brand: only what differs from its
   parent, merged over it, and applied by a class (.theme-<name>) on any
   region, so brands can share a page. Its tokens compile like any theme's,
   then the difference from its parent's compiled tokens is scoped:
   - :root becomes .theme-<name>
   - a selector block (an inverted region) becomes that selector on, or
     inside, .theme-<name>
   - the * block (inverted by container query) covers .theme-<name> and
     everything in it
   A token at :root resolves its var()s there, on <html>, so a region that
   only redeclared --foreground-accent would keep the parent's
   --color-focus. The scope repeats every :root token that reads a changed
   one, at any depth. @function rules are global and can't be scoped, so a
   sub-brand that changes one fails.
   ========================================================================== */

import { inCascade, parseBlocks, preludeOf } from './css-diff.js';

const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);

/* The child over the parent: objects merge, anything else replaces, null removes */
export const mergeTheme = (parent, child) => {
  const out = structuredClone(parent);
  for (const [key, value] of Object.entries(child)) {
    if (value === null) delete out[key];
    else out[key] = isObject(value) && isObject(out[key]) ? mergeTheme(out[key], value) : structuredClone(value);
  }
  return out;
};

/* The inverse: what `theme` sets differently from `parent`, so that
   mergeTheme(parent, overrides) is `theme` again */
export const themeOverrides = (parent, theme) => {
  const out = {};
  for (const key of new Set([...Object.keys(parent), ...Object.keys(theme)])) {
    if (!(key in theme)) out[key] = null;
    else if (!(key in parent)) out[key] = structuredClone(theme[key]);
    else if (isObject(parent[key]) && isObject(theme[key])) {
      const sub = themeOverrides(parent[key], theme[key]);
      if (Object.keys(sub).length) out[key] = sub;
    } else if (JSON.stringify(parent[key]) !== JSON.stringify(theme[key])) out[key] = structuredClone(theme[key]);
  }
  return out;
};

/* A theme with its ancestors merged in. `read(name)` returns a theme file. */
export const resolveTheme = (name, read, seen = []) => {
  if (seen.includes(name)) throw new Error(`${[...seen, name].join(' → ')} extends itself`);
  const theme = read(name);
  if (!theme.extends) return { theme, chain: [name] };
  const parent = resolveTheme(theme.extends, read, [...seen, name]);
  const { extends: _, ...own } = theme;
  return { theme: mergeTheme(parent.theme, own), chain: [...parent.chain, name] };
};

export const scopeClass = (name) => `.theme-${name}`;

const isRoot = (prelude) => prelude === ':root';
const isAtRule = (prelude) => prelude.startsWith('@');
const refs = (value) => [...value.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]);
const node = () => ({ decls: new Map(), children: new Map() });

/* Every :root block (on its own, or inside @media and @supports), with its path */
const rootBlocks = (tree, path = []) =>
  [...tree.children].flatMap(([key, child]) => {
    const prelude = preludeOf(key);
    return isRoot(prelude) ? [[[...path, key], child]] : isAtRule(prelude) && !prelude.startsWith('@function') ? rootBlocks(child, [...path, key]) : [];
  });
const at = (tree, path) => path.reduce((n, p) => (n.children.has(p) ? n.children.get(p) : n.children.set(p, node()).get(p)), tree);

const changed = (base, next) => {
  const out = node();
  for (const [k, v] of next.decls) if (base?.decls.get(k) !== v) out.decls.set(k, v);
  for (const [prelude, child] of next.children) {
    const sub = changed(base?.children.get(prelude), child);
    if (sub.decls.size || sub.children.size) out.children.set(prelude, sub);
  }
  return out;
};

/* Adds, to `diff`, every :root token in `next` that reads a changed one */
const withDependents = (diff, next, extra = []) => {
  const names = new Set([...extra, ...rootBlocks(diff).flatMap(([, n]) => [...n.decls.keys()])]);
  for (let grew = true; grew; ) {
    grew = false;
    for (const [path, block] of rootBlocks(next)) {
      for (const [k, v] of block.decls) {
        if (names.has(k) && at(diff, path).decls.has(k)) continue;
        if (refs(v).some((r) => names.has(r))) {
          at(diff, path).decls.set(k, v);
          if (!names.has(k)) grew = true;
          names.add(k);
        }
      }
    }
  }
  return diff;
};

const scopeSelector = (prelude, cls) => {
  if (isRoot(prelude)) return cls;
  if (prelude === '*') return `:is(${cls}, ${cls} *)`;
  return `:is(${cls}:is(${prelude}), ${cls} :is(${prelude}))`;
};

const print = (tree, cls, indent = '', inSelector = false) =>
  [
    ...[...tree.decls].map(([k, v]) => `${indent}${k}: ${v};`),
    ...[...tree.children].map(([key, child]) => {
      const prelude = preludeOf(key);
      const scoped = !inSelector && !isAtRule(prelude);
      const head = scoped ? scopeSelector(prelude, cls) : prelude;
      return `${indent}${head} {\n${print(child, cls, `${indent}  `, inSelector || scoped)}\n${indent}}`;
    }),
  ].join('\n');

const names = (tree) => [...tree.decls.keys(), ...[...tree.children.values()].flatMap(names)];

/**
 * Every token the sub-brand changes from its parent, with every :root token
 * that reads one: a parent's value that reads one of these was worked out
 * on :root, so the sub-brand has to repeat it.
 */
export const changedTokens = (parentCss, nextCss, own = '') => {
  const next = parseBlocks(nextCss);
  const ownNames = rootBlocks(parseBlocks(own)).flatMap(([, n]) => [...n.decls.keys()]);
  return new Set([...names(withDependents(changed(parseBlocks(parentCss), next), next, ownNames)), ...ownNames]);
};

/**
 * The CSS that turns the parent's compiled tokens into the sub-brand's,
 * inside .theme-<name>. `own` is CSS the sub-brand always carries (its
 * fonts' role tokens, its component tokens), scoped the same way; its :root
 * tokens count as changed.
 */
export const scopeCss = (name, parentCss, nextCss, own = '') => {
  const base = parseBlocks(parentCss);
  const next = parseBlocks(nextCss);
  const diff = changed(base, next);
  const functions = [...diff.children.keys()].map(preludeOf).filter((p) => p.startsWith('@function'));
  if (functions.length) throw new Error(`a sub-brand can't change ${functions.map((f) => f.match(/@function\s+(--[\w-]+)/)?.[1] ?? f).join(', ')} (functions are global): change the type scale and shadows in its parent`);
  const ownTree = parseBlocks(own);
  const ownNames = rootBlocks(ownTree).flatMap(([, n]) => [...n.decls.keys()]);
  /* In the compiled order, with every :root block that sets a changed token */
  const scoped = inCascade(withDependents(diff, next, ownNames), next);
  /* The sub-brand's own CSS goes after, so it wins over the tokens it repeats */
  return [print(scoped, scopeClass(name)), print(ownTree, scopeClass(name))].filter((s) => s.trim()).join('\n\n');
};
