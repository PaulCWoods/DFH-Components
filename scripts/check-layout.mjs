#!/usr/bin/env node
/* ==========================================================================
   check:layout
   --------------------------------------------------------------------------
   Loads stories from the built Storybook in headless Chrome at a grid of
   screen sizes and reports layouts that strand content:

   - clipped: an element that hides its overflow (overflow hidden or clip)
     with something visible inside it beyond its edge, and no scroller in
     between, so that content can't be reached;
   - page overflow: the page is wider than the screen (a sideways scroll).

   Usage:
     npm run build:storybook
     npm run check:layout                    # layout and recipe stories
     npm run check:layout -- 'organisms-'    # stories whose id matches
   Set CHROME_PATH if Chrome isn't in the default macOS location.

   Exits 1 when it finds a problem, so it can gate a pass.
   ========================================================================== */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';

const root = new URL('../packages/storybook/storybook-static/', import.meta.url).pathname;
const filter = new RegExp(process.argv[2] || '^(layout-|recipes-)');
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const widths = [375, 768, 1024, 1280, 1600];
const heights = [600, 900];
const tolerance = 16;

if (!existsSync(join(root, 'index.json'))) {
  console.error('check:layout: no built Storybook. Run npm run build:storybook first.');
  process.exit(2);
}

/* Static server for storybook-static */
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

/* Chrome over the DevTools protocol */
const profile = mkdtempSync(join(tmpdir(), 'check-layout-'));
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
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result?.result?.value;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* Runs in the page: what's out of reach at this size. A clipping element is
   only a problem when something visible inside it sits beyond its edge with
   no scroller in between (content in a nested scroller can be reached). */
const probe = `(() => {
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
    if (stranded) out.push('clipped ' + name(el) + ' (' + el.scrollWidth + 'x' + el.scrollHeight + ' in ' + el.clientWidth + 'x' + el.clientHeight + '): ' + name(stranded) + ' is out of reach');
  }
  const d = document.scrollingElement;
  if (d.scrollWidth > d.clientWidth + 1) out.push('page overflow ' + d.scrollWidth + 'px wide in ' + d.clientWidth + 'px');
  return out;
})()`;

const index = JSON.parse(readFileSync(join(root, 'index.json'), 'utf8'));
const ids = Object.values(index.entries).filter((e) => e.type === 'story' && filter.test(e.id)).map((e) => e.id);
const problems = [];

for (const id of ids) {
  await send('Emulation.setDeviceMetricsOverride', { width: widths.at(-1), height: heights.at(-1), deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `${base}/iframe.html?id=${id}&viewMode=story` });
  await wait(1200);
  for (const w of widths) {
    for (const h of heights) {
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
      await wait(150);
      for (const p of (await evaluate(probe)) || []) problems.push(`${id} @ ${w}x${h}: ${p}`);
    }
  }
}

ws.close();
chrome.kill();
server.close();
try { rmSync(profile, { recursive: true, force: true }); } catch {}

if (problems.length) {
  console.log(problems.join('\n'));
  console.log(`\ncheck:layout: ${problems.length} problem(s) in ${ids.length} stories.`);
  process.exit(1);
}
console.log(`check:layout: ${ids.length} stories at ${widths.length * heights.length} sizes, nothing out of reach.`);
