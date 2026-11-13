/* ==========================================================================
   rehype-docs: the HTML that markdown makes, made usable
   --------------------------------------------------------------------------
   - Every <pre> is focusable, so a code block that scrolls sideways can be
     reached by keyboard (WCAG 2.1.1).
   - Every table from markdown sits in a .table-container that scrolls
     sideways on a narrow screen instead of widening the page (WCAG 1.4.10).
     The container is a focusable region named after the section it's in
     (numbered when a section has more than one).
   - A Do and Don't table has equal columns, and each point starts with an
     icon and a hidden "Do" or "Don't", so it keeps its meaning when the
     table scrolls away from its header.
   ========================================================================== */
const text = (node) => (node.type === 'text' ? node.value : (node.children ?? []).map(text).join(''));

const element = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });
const row = (section) => section?.children.filter((n) => n.tagName === 'tr').map((tr) => tr.children.filter((n) => n.tagName === 'td' || n.tagName === 'th'));
const points = [
  { label: 'Do', icon: 'check', intent: 'icon--success' },
  { label: "Don't", icon: 'x', intent: 'icon--danger' },
];
const part = (table, name) => table.children.find((n) => n.tagName === name);

/* Marks up a table headed exactly Do and Don't; any other table is left alone */
const doAndDont = (table) => {
  const head = row(part(table, 'thead'))?.[0]?.map((th) => text(th).trim().replace('’', "'"));
  if (head?.join() !== points.map((p) => p.label).join()) return;
  table.properties.className = ['do-dont'];
  for (const cells of row(part(table, 'tbody')) ?? []) {
    cells.forEach((td, i) => {
      if (!td.children.length) return;
      const { label, icon, intent } = points[i];
      td.children = [
        element('div', { className: ['do-dont__point'] }, [
          element('svg', { className: ['icon', intent], width: '1em', height: '1em', ariaHidden: 'true', focusable: 'false' }, [element('use', { href: `/icons.svg#${icon}` })]),
          element('div', {}, [element('span', { className: ['sr-only'] }, [{ type: 'text', value: `${label}: ` }]), ...td.children]),
        ]),
      ];
    });
  }
};

export default function rehypeDocs() {
  return (tree) => {
    let heading = 'Table';
    const used = {};
    const name = () => {
      used[heading] = (used[heading] ?? 0) + 1;
      return used[heading] > 1 ? `${heading}, table ${used[heading]}` : heading;
    };
    const visit = (node) => {
      if (node.type !== 'element' && node.type !== 'root') return;
      node.children?.forEach((child, i) => {
        if (child.type !== 'element') return;
        if (/^h[1-6]$/.test(child.tagName)) heading = text(child).trim();
        if (child.tagName === 'pre') child.properties.tabIndex ??= 0;
        if (child.tagName === 'table' && !child.properties.className) {
          doAndDont(child);
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-container'], tabIndex: 0, role: 'region', ariaLabel: name() },
            children: [child],
          };
          return;
        }
        visit(child);
      });
    };
    visit(tree);
  };
}
