#!/usr/bin/env node
/* ==========================================================================
   npm run build:skills
   Publishes the shared agent skills for projects that use the library, from
   the docs domain (components.designforhumans.blog/skills/<version>/):
   - <name>/SKILL.md: each shared skill, with the library version it
     describes after its frontmatter
   - index.json: the version and each skill's name, description and path
   The shared skills are the ones .agents/skills/README.md lists under
   "Shared skills", so the README and what ships can't drift. The version
   is packages/css/package.json's, the same as the CSS the skills describe.
   A published version never changes: when a file would differ from what's
   already there, the build stops and asks for a new version.
   ========================================================================== */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, '.agents/skills');
const { version } = JSON.parse(readFileSync(join(root, 'packages/css/package.json'), 'utf8'));
const out = join(root, 'packages/docs/public/skills', version);
const relative = (p) => p.slice(root.length + 1);

/* The names in the README's shared table: from "**Shared skills**" to "**Repo skills**" */
const readme = readFileSync(join(skillsDir, 'README.md'), 'utf8');
const shared = readme.slice(readme.indexOf('**Shared skills**'), readme.indexOf('**Repo skills**'));
const names = [...shared.matchAll(/^\| `([a-z-]+)` \|/gm)].map((m) => m[1]);
if (!names.length) throw new Error('No shared skills found in .agents/skills/README.md');

/* A skill's frontmatter value, folded block or plain */
const field = (text, key) => {
  const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const block = fm.match(new RegExp(`^${key}:\\s*\\|\\n((?:  .*\\n?|\\n)+)`, 'm'));
  if (block) return block[1].replace(/^ {2}/gm, '').trim().split('\n\n')[0].replace(/\n/g, ' ');
  return fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim();
};

const files = {};
const index = { library: 'Design For Humans Components', version, skills: [] };
for (const name of names) {
  const text = readFileSync(join(skillsDir, name, 'SKILL.md'), 'utf8');
  if (field(text, 'name') !== name) throw new Error(`${name}/SKILL.md names itself ${field(text, 'name')}`);
  /* Shared skills stand alone: no paths into this repo */
  const local = text.match(/\]\((?!https?:|#)[^)]+\)|\.agents\/|docs\/markup\/|AGENTS\.md/);
  if (local) throw new Error(`${name}/SKILL.md points into the repo (${local[0]}); shared skills link to the docs site`);
  files[`${name}/SKILL.md`] = text.replace(/^(---\n[\s\S]*?\n---\n)/, `$1\n<!-- Design For Humans Components ${version}. Updates: https://components.designforhumans.blog/docs/start/skills/ -->\n`);
  index.skills.push({ name, description: field(text, 'description'), path: `${name}/SKILL.md` });
}
files['index.json'] = `${JSON.stringify(index, null, 2)}\n`;

/* A published version never changes */
const changed = Object.entries(files).filter(([file, text]) => existsSync(join(out, file)) && readFileSync(join(out, file), 'utf8') !== text);
if (changed.length) {
  console.error(`✖ Skills ${version} are already published, and ${changed.map(([f]) => f).join(', ')} would change. Raise the version in packages/css/package.json.`);
  process.exit(1);
}
for (const [file, text] of Object.entries(files)) {
  mkdirSync(dirname(join(out, file)), { recursive: true });
  writeFileSync(join(out, file), text);
}
console.log(`✔ ${relative(out)}/`);
for (const file of Object.keys(files)) console.log(`  ${file}`);
