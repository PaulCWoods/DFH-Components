/* ==========================================================================
   remark-docs: markdown as the docs site needs it
   --------------------------------------------------------------------------
   - Drops the first top-level heading: the layout prints the title.
   - A ```html live fence renders as the real markup above its code, in a
     card. The shown code is the fence as written; in the rendered copy,
     sprite references (href="#Name") point at /icons.svg. The words after
     "live" lay the examples out: "cluster" (side by side) or the default,
     a stack; "width=md" caps them with that .max-w-* utility, for parts
     that would otherwise fill the page (2xs to 2xl).
   - A ```html playground fence is one example with a control per axis: the
     markup (data-axes on the element that changes), then --- and a line per
     axis ("Size: Small=button--sm, Default*, Large=button--lg"). Without a
     script it is the plain example.
   - The code of an example stays closed until asked for. Every other fence
     is a code block.
   - "## Reference" ends the page: what follows is for looking up (and for
     agents, in the file), and Storybook shows it.
   - Links between markup docs ("07b-form-composition.md") point at their
     pages; a link to a doc that isn't a page yet becomes its text.
   - A "§" reference fails the build: pages link a keyword to the doc, which
     reads better and makes sense to a screen reader out of context.
   Markdown only: MDX pages write their examples as components.
   ========================================================================== */
import { readMarkupIndex } from './markup.mjs';
import { compose, toLive } from './playground.mjs';

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Walk the tree, letting the visitor replace a node in its parent */
const walk = (node, visit, parent = null, index = 0) => {
  visit(node, parent, index);
  for (let i = 0; i < (node.children?.length ?? 0); i++) walk(node.children[i], visit, node, i);
};

const attr = (s) => escape(s).replace(/"/g, '&quot;');

const LANGUAGES = { html: 'HTML', css: 'CSS', js: 'JavaScript', ts: 'TypeScript', json: 'JSON', bash: 'Shell', sh: 'Shell', twig: 'Twig', scss: 'Sass' };

/* A code block, with a copy button for the page's script to reveal */
const codeBlock = (code, lang = 'html', modifiers = '') => {
  const language = LANGUAGES[lang] ?? 'Code';
  return `<div class="code-block${modifiers}">
<div class="code-block__bar"><span class="small-text">${language}</span><div class="cluster gap-xs"><span class="small-text" role="status" data-copy-status></span><button type="button" class="button" data-copy hidden><span>Copy code</span></button></div></div>
<pre class="code-block__code" tabindex="0" role="group" aria-label="${language} code"><code class="language-${lang}">${escape(code)}</code></pre>
</div>`;
};

/* An example's code stays closed until asked for, so a page reads as its examples */
const exampleCode = (code) => `<details class="accordion accordion--plain accordion--flush">
<summary class="small-text">Code</summary>
${codeBlock(code, 'html', ' code-block--flush')}
</details>`;

const frame = (layout, width, html) => `<div class="${layout === 'cluster' ? 'cluster' : 'stack'}${width ? ` max-w-${width}` : ''}">
${html}
</div>`;

export const liveExample = (code, layout = 'stack', width) => `<figure class="card card--ruled" data-example>
<div class="card__body prose-end">${frame(layout, width, toLive(code))}</div>
<div class="card__body card__body--flush">${exampleCode(code)}</div>
</figure>`;

/* "Danger=button--danger "Delete project"": a label, * if it starts chosen,
   its classes and the text it gives the data-label element */
const parseChoice = (s) => {
  const m = s.trim().match(/^([^=*"]+?)(\*)?(?:=([^"]*?))?(?:\s+"(.*)")?$/);
  if (!m) throw new Error(`Playground: can't read the choice "${s}"`);
  return { label: m[1].trim(), chosen: !!m[2], classes: (m[3] ?? '').trim().split(/\s+/).filter(Boolean), text: m[4] };
};

/* Commas inside a quoted text don't split choices */
const parseAxes = (block) => block.trim().split('\n').map((line) => {
  const at = line.indexOf(':');
  const choices = line.slice(at + 1).match(/(?:[^,"]|"[^"]*")+/g).map(parseChoice);
  if (!choices.some((c) => c.chosen)) choices[0].chosen = true;
  return { name: line.slice(0, at).trim(), choices };
});

let playgrounds = 0;
export const playground = (value, layout, width) => {
  const [source, block] = value.split(/^---$/m);
  if (!block || !/data-axes/.test(source)) throw new Error('Playground: needs data-axes in its markup, then --- and its axes');
  const axes = parseAxes(block);
  const id = `playground-${++playgrounds}`;
  const start = axes.flatMap((a) => a.choices.filter((c) => c.chosen));
  const startClasses = start.flatMap((c) => c.classes);
  const startText = start.findLast((c) => c.text)?.text;
  const code = compose(source.trim(), startClasses, startText);
  const controls = axes.map((axis, i) => `<fieldset class="fieldset py-md px-cushion">
<legend class="fieldset__legend label">${escape(axis.name)}</legend>
<div class="cluster gap-xs buttons-sm">
${axis.choices.map((c) => `<label class="button button--subtle"><input type="radio" class="sr-only" name="${id}-${i}"${c.chosen ? ' checked' : ''} data-classes="${attr(c.classes.join(' '))}"${c.text ? ` data-text="${attr(c.text)}"` : ''}><span>${escape(c.label)}</span></label>`).join('\n')}
</div>
</fieldset>`).join('\n');
  return `<figure class="card card--ruled" data-playground data-source="${attr(source.trim())}">
<div class="card__body prose-end">${frame(layout, width, `<div class="contents" data-preview>${toLive(code)}</div>`)}</div>
<div class="card__body card__body--flush prose-end" hidden data-controls><div class="cluster gap-thin rule">${controls}</div></div>
<div class="card__body card__body--flush">${exampleCode(code)}</div>
</figure>`;
};

export default function remarkDocs() {
  const pages = readMarkupIndex();
  return (tree, file) => {
    const isMdx = /\.mdx$/.test(file?.path ?? '');
    const first = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 1);
    if (first !== -1) tree.children.splice(first, 1);

    const reference = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && n.children?.[0]?.value === 'Reference');
    if (reference !== -1) tree.children.length = reference;

    walk(tree, (node, parent, i) => {
      if (node.type === 'code' && node.lang === 'html' && /(^|\s)(live|playground)(\s|$)/.test(node.meta ?? '')) {
        const layout = /(^|\s)cluster(\s|$)/.test(node.meta) ? 'cluster' : 'stack';
        const width = node.meta.match(/(?:^|\s)width=(\S+)/)?.[1];
        /* A mistyped width would silently do nothing */
        if (width && !/^(2xs|xs|sm|md|lg|xl|2xl)$/.test(width)) throw new Error(`Live example: no width "${width}" (2xs to 2xl)`);
        const render = /(^|\s)playground(\s|$)/.test(node.meta) ? playground : liveExample;
        parent.children[i] = { type: 'html', value: render(node.value, layout, width) };
      }
      else if (node.type === 'code' && !isMdx) parent.children[i] = { type: 'html', value: codeBlock(node.value, node.lang ?? '') };
      if (node.type === 'link' && /^\d+[a-z]?-[\w-]+\.md(#.*)?$/.test(node.url)) {
        const [doc, hash] = node.url.split('#');
        const page = pages[doc];
        if (page) node.url = page.href + (hash ? `#${hash}` : '');
        else parent.children.splice(i, 1, ...node.children);
      }
      if (node.type === 'text' && /§/.test(node.value)) throw new Error(`${file?.path ?? 'Page'}: link a keyword, not "§": ${node.value.slice(0, 80)}`);
    });
  };
}
