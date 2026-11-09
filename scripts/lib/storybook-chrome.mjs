/* ==========================================================================
   Built Storybook in headless Chrome
   --------------------------------------------------------------------------
   Shared by the checks that load stories and measure them in a real browser
   (check:layout, check:targets): serves storybook-static, starts Chrome and
   talks to it over the DevTools protocol.

   const sb = await openStorybook();
   for (const id of sb.ids(/^atoms-/)) {
     await sb.load(id);
     await sb.size(1280, 900);
     const result = await sb.evaluate('document.title');
   }
   sb.close();

   Set CHROME_PATH if Chrome isn't in the default macOS location.
   ========================================================================== */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';

const root = new URL('../../packages/storybook/storybook-static/', import.meta.url).pathname;
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2' };

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function openStorybook(name = 'check') {
  if (!existsSync(join(root, 'index.json'))) {
    console.error(`${name}: no built Storybook. Run npm run build:storybook first.`);
    process.exit(2);
  }

  /* Static server for storybook-static */
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
  const profile = mkdtempSync(join(tmpdir(), `${name}-`));
  const port = 9400 + Math.floor(Math.random() * 400);
  const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 40 && !targets; i++) {
    await wait(250);
    targets = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).catch(() => undefined);
  }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  /* A dropped connection fails the check at once, not after a silent wait */
  let closing = false;
  ws.onclose = (e) => {
    if (closing) return;
    console.error(`${name}: lost the connection to Chrome (${e.code}${e.reason ? ` ${e.reason}` : ''})`);
    process.exit(1);
  };
  let seq = 0;
  const pending = {};
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } };
  /* A reply that never comes (a lost message, a stalled renderer) fails the
     check after a minute instead of hanging it */
  const send = (method, params = {}) => new Promise((r) => {
    const id = ++seq;
    const timer = setTimeout(() => { delete pending[id]; console.error(`${method} got no reply in 60s`); process.exitCode = 1; r({}); }, 60000);
    pending[id] = (m) => { clearTimeout(timer); r(m); };
    ws.send(JSON.stringify({ id, method, params }));
  });

  const index = JSON.parse(readFileSync(join(root, 'index.json'), 'utf8'));

  return {
    send,
    /* Story ids whose id matches the filter */
    ids: (filter) => Object.values(index.entries).filter((e) => e.type === 'story' && filter.test(e.id)).map((e) => e.id),
    /* Runs an expression in the page and returns its value */
    evaluate: async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result?.result?.value,
    size: async (width, height, settle = 150) => {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
      await wait(settle);
    },
    /* Emulated media features, such as [{ name: 'forced-colors', value: 'active' }] */
    media: async (features = [], settle = 150) => {
      await send('Emulation.setEmulatedMedia', { features });
      await wait(settle);
    },
    load: async (id, { width = 1600, height = 900, settle = 1200 } = {}) => {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
      await send('Page.navigate', { url: `${base}/iframe.html?id=${id}&viewMode=story` });
      await wait(settle);
    },
    close: () => {
      closing = true;
      ws.close();
      chrome.kill();
      server.close();
      try { rmSync(profile, { recursive: true, force: true }); } catch {}
    },
  };
}

/* Progress on one line, only in a terminal (or with PROGRESS set) */
export const progress = (text) => {
  if (process.stderr.isTTY || process.env.PROGRESS) process.stderr.write(`\r${text}`.slice(0, 100).padEnd(100));
};
export const progressDone = () => {
  if (process.stderr.isTTY || process.env.PROGRESS) process.stderr.write('\n');
};
