#!/usr/bin/env node
/* ==========================================================================
   check:docs
   --------------------------------------------------------------------------
   The docs site's gate (docs/audit/docs-site.md). Serves the built site
   (packages/docs/dist) and, for every page:

   - links: every internal link and #anchor points at a page and an id that
     exist (links inside live examples are made up, and skipped);
   - axe: no WCAG violations, in light and in dark;
   - layout: nothing stranded out of reach and no sideways scroll, at the
     same 10 screen sizes as check:layout.

   Usage:
     npm run build:docs
     npm run check:docs
   Set CHROME_PATH if Chrome isn't in the default macOS location.

   Exits 1 when it finds a problem.
   ========================================================================== */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, normalize, relative } from 'node:path';

const root = new URL('../packages/docs/dist/', import.meta.url).pathname;
const axeSource = readFileSync(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const widths = [375, 768, 1024, 1280, 1600];
const heights = [600, 900];
const tolerance = 16;

if (!existsSync(join(root, 'index.html'))) {
  console.error('check:docs: no built docs. Run npm run build:docs first.');
  process.exit(2);
}

/* Every page: each index.html under dist, as its URL path */
const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? (f === 'pagefind' || f === 'storybook' ? [] : walk(p)) : f === 'index.html' ? [p] : [];
});
const pages = walk(root).map((f) => `/${relative(root, f).replace(/index\.html$/, '')}`);

/* Static server for dist */
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.wasm': 'application/wasm' };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

/* Chrome over the DevTools protocol */
const profile = mkdtempSync(join(tmpdir(), 'check-docs-'));
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
let targets;
for (let i = 0; i < 40 && !targets; i++) {
  await new Promise((r) => setTimeout(r, 250));
  targets = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).catch(() => undefined);
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pending = {};
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } };
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pending[id] = r; ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* In the page: its internal links (not those in live examples, which
   point at made-up pages), and its ids */
const linksProbe = `(() => ({
  links: [...document.querySelectorAll('a[href]:not([data-example] a, [data-playground] a)')].map((a) => a.getAttribute('href')).filter((h) => !/^[a-z]+:/i.test(h) || h.startsWith(location.origin)),
  ids: [...document.querySelectorAll('[id]')].map((el) => el.id),
}))()`;

/* In the page: what's out of reach at this size (as in check:layout) */
const layoutProbe = `(() => {
  const out = [];
  const name = (el) => el.id ? '#' + el.id : el.tagName.toLowerCase() + [...el.classList].slice(0, 3).map((c) => '.' + c).join('');
  const scrolls = (el) => /auto|scroll/.test(getComputedStyle(el).overflowY + getComputedStyle(el).overflowX);
  const shown = (el) => !el.closest('[hidden], [aria-hidden="true"], .sr-only, dialog:not([open]), [popover]:not(:popover-open)');
  for (const el of document.querySelectorAll('body *')) {
    if (!shown(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const clipY = /hidden|clip/.test(cs.overflowY) && el.clientHeight > 64 && el.scrollHeight - el.clientHeight > ${tolerance};
    const clipX = /hidden|clip/.test(cs.overflowX) && el.clientWidth > 64 && el.scrollWidth - el.clientWidth > ${tolerance};
    if (!clipY && !clipX) continue;
    const box = el.getBoundingClientRect();
    const stranded = [...el.querySelectorAll('*')].find((d) => {
      if (!shown(d) || d.matches('svg *')) return false;
      const r = d.getBoundingClientRect();
      if (!r.width || !r.height || getComputedStyle(d).visibility === 'hidden') return false;
      for (let a = d.parentElement; a && a !== el; a = a.parentElement) if (scrolls(a)) return false;
      return (clipY && (r.bottom > box.bottom + ${tolerance} || r.top < box.top - ${tolerance}))
        || (clipX && (r.right > box.right + ${tolerance} || r.left < box.left - ${tolerance}));
    });
    if (stranded) out.push('clipped ' + name(el) + ': ' + name(stranded) + ' is out of reach');
  }
  const d = document.scrollingElement;
  if (d.scrollWidth > d.clientWidth + 1) out.push('page overflow ' + d.scrollWidth + 'px wide in ' + d.clientWidth + 'px');
  return out;
})()`;

/* Standards decide, not the tool. Off: an <aside> in <main> is valid HTML and
   ARIA (complementary is allowed there); only axe's best-practice rule objects */
const axeRun = `axe.run(document, { resultTypes: ['violations'], rules: { 'landmark-complementary-is-top-level': { enabled: false } } }).then((r) => r.violations.map((v) => v.id + ' (' + v.nodes.length + '): ' + v.nodes.slice(0, 2).map((n) => n.target.join(' ') + (n.any[0]?.data?.contrastRatio ? ' ' + n.any[0].data.contrastRatio + ':1 ' + n.any[0].data.fgColor + ' on ' + n.any[0].data.bgColor : '')).join(', ')))`;

const problems = [];
const report = (line) => { problems.push(line); console.log(line); };
const found = {};
const started = Date.now();

for (const [n, page] of pages.entries()) {
  if (process.stderr.isTTY || process.env.PROGRESS) process.stderr.write(`\r${n + 1}/${pages.length} ${page}`.padEnd(80));
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: base + page });
  await wait(800);
  found[page] = await evaluate(linksProbe);

  /* axe in each scheme: the toggle's classes on <html> */
  await evaluate(axeSource + ';0');
  for (const scheme of ['light', 'dark']) {
    await evaluate(`document.documentElement.classList.remove('color-scheme-light', 'color-scheme-dark'); document.documentElement.classList.add('color-scheme-${scheme}')`);
    /* Let colour transitions finish before measuring contrast */
    await wait(600);
    for (const v of (await evaluate(axeRun)) || []) report(`${page} axe ${scheme}: ${v}`);
    /* Each playground choice once, with the others at their start */
    const choices = await evaluate(`document.querySelectorAll('[data-controls] input').length`);
    for (let i = 0; i < choices; i++) {
      await evaluate(`document.querySelectorAll('[data-controls] input')[${i}].click()`);
      await wait(250);
      for (const v of (await evaluate(axeRun)) || []) report(`${page} axe ${scheme}, choice ${i + 1}: ${v}`);
      /* The code says what the choice did, and nothing of the playground's own */
      if (!(await evaluate(`(() => { const input = document.querySelectorAll('[data-controls] input')[${i}]; const code = input.closest('[data-playground]').querySelector('.code-block code').textContent; return input.dataset.classes.split(' ').every((c) => code.includes(c)) && !/data-(axes|label)/.test(code); })()`))) report(`${page} choice ${i + 1}: the code doesn't match`);
      await evaluate(`document.querySelectorAll('[data-controls] input')[${i}].closest('fieldset').querySelector('input[checked]').click()`);
    }
  }
  await evaluate(`document.documentElement.classList.remove('color-scheme-light', 'color-scheme-dark')`);

  for (const w of widths) {
    for (const h of heights) {
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
      await wait(150);
      for (const p of (await evaluate(layoutProbe)) || []) report(`${page} @ ${w}x${h}: ${p}`);
    }
  }
}

/* Links: each internal target is a page, and each #anchor an id on it */
const storyIndex = new URL('../packages/storybook/storybook-static/index.json', import.meta.url);
const stories = existsSync(storyIndex) ? JSON.parse(readFileSync(storyIndex, 'utf8')).entries : {};
for (const [page, { links }] of Object.entries(found)) {
  for (const href of new Set(links)) {
    const url = new URL(href, base + page);
    /* Into Storybook: the story has to exist */
    if (url.pathname === '/storybook/') {
      const story = url.searchParams.get('path')?.split('/').pop();
      if (!stories[story]) report(`${page} link: no story ${story}`);
      continue;
    }
    if (url.pathname.startsWith('/pagefind/') || extname(url.pathname)) {
      if (!existsSync(join(root, url.pathname))) report(`${page} link: ${href} doesn't exist`);
      continue;
    }
    const target = found[url.pathname];
    if (!target) { report(`${page} link: ${href} isn't a page`); continue; }
    const id = decodeURIComponent(url.hash.slice(1));
    if (id && !target.ids.includes(id)) report(`${page} link: ${href} has no #${id}`);
  }
}

ws.close();
chrome.kill();
server.close();
try { rmSync(profile, { recursive: true, force: true }); } catch {}

if (process.stderr.isTTY || process.env.PROGRESS) process.stderr.write('\n');
const took = Math.round((Date.now() - started) / 1000);
if (problems.length) {
  console.log(`\ncheck:docs: ${problems.length} problem(s) in ${pages.length} pages (${took}s).`);
  process.exit(1);
}
console.log(`check:docs: ${pages.length} pages: links resolve, axe clean in light and dark, nothing out of reach at ${widths.length * heights.length} sizes (${took}s).`);
