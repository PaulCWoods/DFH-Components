/* ==========================================================================
   Navigation
   Builds the site's sections and pages from the collections, so the
   header, sidebar, drawer and previous/next links never point at a page
   that doesn't exist. A section shows once it has a page.
   - docs: src/content/docs; a folder is a section, index.mdx its overview.
   - markup: docs/markup files with a tier, in Components, grouped by tier.
   ========================================================================== */
import { getCollection, type CollectionEntry } from 'astro:content';
import { TIERS, hrefFor, slugOfFile } from './markup.mjs';

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

type Tier = keyof typeof TIERS;
export type Page = { href: string; title: string; summary: string; section: string; group?: string; slug?: string };
export type Section = { key: string; label: string; href: string; pages: Page[] };

/* A page's path under src/content/docs, without the extension
   ("tools/index"). The entry id drops "/index", so it can't give the
   section; the file path can. */
const pathOf = (e: CollectionEntry<'docs'>) => e.filePath!.replace(/^.*?src\/content\/docs\//, '').replace(/\.mdx?$/, '');
const sectionOf = (path: string) => (path.includes('/') ? path.split('/')[0] : '');
const hrefOf = (path: string) => `/docs/${path.replace(/(^|\/)index$/, '')}/`.replace(/\/+/g, '/');
const isOverview = (path: string) => /(^|\/)index$/.test(path);

/* The route parameter for a docs entry: "tools", or undefined for /docs/ */
export const slugOf = (e: CollectionEntry<'docs'>) => hrefOf(pathOf(e)).replace(/^\/docs\/?|\/$/g, '') || undefined;

/* A markup doc as a component page, or nothing until it names a tier */
export const componentOf = (e: CollectionEntry<'markup'>) => {
  const { tier, title, summary } = e.data;
  if (!tier || !title || !summary) return undefined;
  const file = e.filePath!.split('/').pop()!;
  const slug = e.data.slug ?? slugOfFile(file);
  return { href: hrefFor(tier, slug), title, summary, section: 'components', group: TIERS[tier as Tier].label, slug, tier, folder: TIERS[tier as Tier].folder, entry: e };
};

export async function getComponents() {
  const tierOrder = Object.keys(TIERS);
  return (await getCollection('markup'))
    .map(componentOf)
    .filter((c) => c !== undefined)
    .sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier) || a.title.localeCompare(b.title));
}

export async function getNav(): Promise<Section[]> {
  const entries = await getCollection('docs');
  const components = await getComponents();
  return SECTIONS.map(({ key, label }) => {
    const pages: Page[] = entries
      .filter((e) => sectionOf(pathOf(e)) === key)
      .sort((a, b) => Number(isOverview(pathOf(b))) - Number(isOverview(pathOf(a))) || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
      .map((e) => ({ href: hrefOf(pathOf(e)), title: e.data.title, summary: e.data.summary, section: key }));
    if (key === 'components') pages.push(...components.map(({ href, title, summary, section, group, slug }) => ({ href, title, summary, section, group, slug })));
    return { key, label, href: pages[0]?.href ?? '', pages };
  }).filter((s) => s.pages.length);
}

/* Every page in reading order, for previous and next */
export const flatten = (nav: Section[]) => nav.flatMap((s) => s.pages);
