/* ==========================================================================
   CSS diff: what a theme's compiled tokens change
   --------------------------------------------------------------------------
   Compares two compiled variables.css files block by block (a block is its
   chain of selectors and at-rules) and returns CSS holding only the
   declarations the second changes or adds, in the same blocks. Linked after
   the library, that file turns the defaults into the theme.
   ========================================================================== */

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/* A block's key is its prelude, and which of that prelude it is among its
   siblings, so two blocks with the same prelude stay apart and in order: the
   cascade between them depends on it. */
const SEP = '\u0000';
export const preludeOf = (key) => key.split(SEP)[0];

/* { decls: Map(name -> value), children: Map(key -> node) } */
export const parseBlocks = (css) => {
  const root = { decls: new Map(), children: new Map() };
  const text = strip(css);
  const stack = [root];
  let buffer = '';
  const flush = () => {
    for (const part of buffer.split(';')) {
      const i = part.indexOf(':');
      if (i > 0 && part.trim()) stack.at(-1).decls.set(part.slice(0, i).trim(), part.slice(i + 1).trim().replace(/\s+/g, ' '));
    }
    buffer = '';
  };
  let depth = 0;
  for (const ch of text) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === '{' && depth === 0) {
      /* The prelude is what follows the last declaration */
      const cut = buffer.lastIndexOf(';');
      const prelude = buffer.slice(cut + 1).trim().replace(/\s+/g, ' ');
      buffer = buffer.slice(0, cut + 1);
      flush();
      const parent = stack.at(-1);
      const nth = [...parent.children.keys()].filter((k) => preludeOf(k) === prelude).length;
      const node = { decls: new Map(), children: new Map() };
      parent.children.set(`${prelude}${SEP}${nth}`, node);
      stack.push(node);
    } else if (ch === '}' && depth === 0) {
      flush();
      stack.pop();
    } else buffer += ch;
  }
  return root;
};

const changed = (base, next) => {
  const decls = new Map([...next.decls].filter(([k, v]) => base?.decls.get(k) !== v));
  const children = new Map();
  for (const [key, node] of next.children) {
    const sub = changed(base?.children.get(key), node);
    if (sub.decls.size || sub.children.size) children.set(key, sub);
  }
  return { decls, children };
};

const print = (node, indent = '') =>
  [
    ...[...node.decls].map(([k, v]) => `${indent}${k}: ${v};`),
    ...[...node.children].map(([key, child]) => `${indent}${preludeOf(key)} {\n${print(child, `${indent}  `)}\n${indent}}`),
  ].join('\n');

/** The CSS that turns `baseCss` into `nextCss` */
export const cssDiff = (baseCss, nextCss) => print(changed(parseBlocks(baseCss), parseBlocks(nextCss)));
