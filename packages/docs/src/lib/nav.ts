/* ==========================================================================
   Navigation
   Builds the site's sections and pages from the docs collection, so the
   header, sidebar, drawer and previous/next links never point at a page
   that doesn't exist. A section shows once it has a page.
   ========================================================================== */
import { getCollection, type CollectionEntry } from 'astro:content';

/* The sections, in reading order (docs/audit/docs-site.md) */
export const SECTIONS = [
  { key: '', label: 'Overview' },
  { key: 'ethos', label: 'Ethos' },
  { key: 'start', label: 'Start' },
  { key: 'foundations', label: 'Foundations' },
  { key: 'components', label: 'Components' },
  { key: 'patterns', label: 'Patterns' },
  { key: 'guidance', label: 'Guidance' },
  { key: 'tools', label: 'Tools' },
] as const;

export type Page = { href: string; title: string; summary: string; section: string; entry: CollectionEntry<'docs'> };
export type Section = { key: string; label: string; href: string; pages: Page[] };

/* A page's path under src/content/docs, without the extension
   ("tools/index"). The entry id drops "/index", so it can't give the
   section; the file path can. */
const pathOf = (e: CollectionEntry<'docs'>) => e.filePath!.replace(/^.*?src\/content\/docs\//, '').replace(/\.mdx?$/, '');
const sectionOf = (path: string) => (path.includes('/') ? path.split('/')[0] : '');
const hrefOf = (path: string) => `/docs/${path.replace(/(^|\/)index$/, '')}/`.replace(/\/+/g, '/');
const isOverview = (path: string) => /(^|\/)index$/.test(path);

export async function getNav(): Promise<Section[]> {
  const entries = await getCollection('docs');
  return SECTIONS.map(({ key, label }) => {
    const pages = entries
      .filter((e) => sectionOf(pathOf(e)) === key)
      .sort((a, b) => Number(isOverview(pathOf(b))) - Number(isOverview(pathOf(a))) || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
      .map((e) => ({ href: hrefOf(pathOf(e)), title: e.data.title, summary: e.data.summary, section: key, entry: e }));
    return { key, label, href: pages[0]?.href ?? '', pages };
  }).filter((s) => s.pages.length);
}

/* Every page in reading order, for previous and next */
export const flatten = (nav: Section[]) => nav.flatMap((s) => s.pages);

/* The route parameter for an entry: "tools", or undefined for /docs/ */
export const slugOf = (e: CollectionEntry<'docs'>) => hrefOf(pathOf(e)).replace(/^\/docs\/?|\/$/g, '') || undefined;
