// Cheap guard for the authored German rows: the Arabic names must never carry
// Latin, CJK or replacement characters. Run before the halal scan:
//   node scripts/check-germany-scripts.mjs
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(process.cwd(), 'scripts');

const load = async (dir, n) => {
  const all = [];
  for (let i = 1; i <= n; i++) {
    const file = join(ROOT, dir, `part${i}.mjs`);
    if (!existsSync(file)) break;
    const m = await import(pathToFileURL(file).href);
    all.push(...m.default);
  }
  return all;
};

const sets = [
  ['germany-base-data', 'base'],
  ['germany-data', 'expansion'],
];

const problems = [];
let total = 0;

for (const [dir, label] of sets) {
  const rows = await load(dir, 4);
  total += rows.length;
  for (const r of rows) {
    for (const k of ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe']) {
      const v = r[k] ?? '';
      if (/[A-Za-z]/.test(v) && k === 'nameAr') {
        problems.push(`${label}: ${k} has Latin -> "${v}"`);
      }
      if (/[\u3000-\u9FFF]/.test(v)) problems.push(`${label}: ${k} has CJK -> "${v}"`);
      if (v.includes('\uFFFD')) problems.push(`${label}: ${k} has U+FFFD -> "${v}"`);
      if (/\?/.test(v)) problems.push(`${label}: ${k} has '?'`);
    }
  }
  console.log(`${label} rows: ${rows.length}`);
}

console.log(`total rows: ${total}`);
if (problems.length) {
  console.log(`\nFAILED with ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 60)) console.log('  -', p);
  process.exit(1);
}
console.log('\nOK: no Latin/CJK/corrupted characters in authored rows');