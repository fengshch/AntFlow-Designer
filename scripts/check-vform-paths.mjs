import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const checks = [
  {
    file: 'src/main.js',
    forbidden: './lib/vform/designer.style.css',
    expected: './lib/vForm/designer.style.css',
  },
  {
    file: 'src/main.js',
    forbidden: '@/./lib/vform/designer.umd.js',
    expected: '@/./lib/vForm/designer.umd.js',
  },
  {
    file: 'vite.config.js',
    forbidden: '@/./lib/vform/designer.umd.js',
    expected: '@/./lib/vForm/designer.umd.js',
  },
];

let failed = false;

for (const check of checks) {
  const fullPath = path.join(root, check.file);
  const content = await readFile(fullPath, 'utf8');

  if (content.includes(check.forbidden)) {
    console.error(`${check.file} still contains ${check.forbidden}`);
    failed = true;
  }

  if (!content.includes(check.expected)) {
    console.error(`${check.file} is missing ${check.expected}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log('vForm import paths match the on-disk file casing');
