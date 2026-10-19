#!/usr/bin/env node

/**
 * Design For Humans — Icon Sprite Synchronization Script
 *
 * Single Source of Truth: icons/icons.svg
 *
 * Automatically synchronizes the canonical SVG sprite sheet across:
 * - packages/css/src/icons/icons.svg (Package distribution)
 * - packages/storybook/.storybook/preview-body.html (Storybook preview runtime)
 * - icons/icons.html (Standalone browser HTML preview)
 * - ../designforhumans-blog/templates/_icons.twig (Craft CMS live site, if present)
 * - ../designforhumans-blog/web/web/symbol-defs.svg (Public static fallback, if present)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'icons/icons.svg');

if (!fs.existsSync(SOURCE_FILE)) {
  console.error(`❌ Source icon file not found at: ${SOURCE_FILE}`);
  process.exit(1);
}

const rawContent = fs.readFileSync(SOURCE_FILE, 'utf8');

// Basic SVG validation
if (!rawContent.includes('<svg') || !rawContent.includes('</svg>')) {
  console.error('❌ Source file does not appear to be a valid SVG document.');
  process.exit(1);
}

// Extract and validate symbol IDs
const symbolMatches = [...rawContent.matchAll(/<symbol[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);

if (symbolMatches.length === 0) {
  console.error('❌ No <symbol id="..."> entries found in source SVG.');
  process.exit(1);
}

const uniqueSymbols = new Set();
const duplicates = [];

for (const id of symbolMatches) {
  if (uniqueSymbols.has(id)) {
    duplicates.push(id);
  }
  uniqueSymbols.add(id);
}

if (duplicates.length > 0) {
  console.warn(`⚠️ Warning: Duplicate symbol IDs detected: ${duplicates.join(', ')}`);
}

// Define synchronization targets
const targets = [
  {
    name: 'CSS Package Sprite',
    path: path.join(ROOT_DIR, 'packages/css/src/icons/icons.svg'),
    required: true,
  },
  {
    name: 'Storybook Runtime Preview',
    path: path.join(ROOT_DIR, 'packages/storybook/.storybook/preview-body.html'),
    required: true,
  },
  {
    name: 'Root HTML Preview',
    path: path.join(ROOT_DIR, 'icons/icons.html'),
    required: true,
  },
  {
    name: 'Documentation Site Public Sprite',
    path: path.join(ROOT_DIR, 'packages/docs/public/icons.svg'),
    required: false,
  },
  {
    name: 'Design For Humans Blog (Craft CMS _icons.twig)',
    path: path.resolve(ROOT_DIR, '../designforhumans-blog/templates/_icons.twig'),
    required: false,
  },
  {
    name: 'Design For Humans Blog (Public symbol-defs.svg)',
    path: path.resolve(ROOT_DIR, '../designforhumans-blog/web/web/symbol-defs.svg'),
    required: false,
  },
];

console.log(`\n🎨 Design For Humans Icon Synchronizer`);
console.log(`----------------------------------------`);
console.log(`Source: ${path.relative(ROOT_DIR, SOURCE_FILE)} (${uniqueSymbols.size} symbols)`);
console.log('');

let syncedCount = 0;

for (const target of targets) {
  const targetDir = path.dirname(target.path);

  if (!fs.existsSync(targetDir)) {
    if (target.required) {
      fs.mkdirSync(targetDir, { recursive: true });
    } else {
      console.log(`  ⚪ Skipped: ${target.name} (directory not found)`);
      continue;
    }
  }

  fs.writeFileSync(target.path, rawContent, 'utf8');
  const relPath = path.relative(ROOT_DIR, target.path);
  console.log(`  ✔ Synced: ${target.name} ➔ ${relPath}`);
  syncedCount++;
}

console.log(`\n🎉 Success! Synchronized ${uniqueSymbols.size} symbols across ${syncedCount} locations.\n`);
