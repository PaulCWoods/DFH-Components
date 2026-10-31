/* ==========================================================================
   rehype-docs: the HTML that markdown makes, made usable
   --------------------------------------------------------------------------
   - Every <pre> is focusable, so a code block that scrolls sideways can be
     reached by keyboard (WCAG 2.1.1).
   - Every table from markdown sits in a .table-container that scrolls
     sideways on a narrow screen instead of widening the page (WCAG 1.4.10).
     The container is a focusable region named after the section it's in
     (numbered when a section has more than one).
   ========================================================================== */
const text = (node) => (node.type === 'text' ? node.value : (node.children ?? []).map(text).join(''));

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
