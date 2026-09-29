// Guard against silent text corruption in the Korean data sources.
// Fails on: replacement chars, '??' sequences, stray Latin glued to Arabic,
// Latin inside the Arabic slot, missing nationality token, and malformed rows.
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const TOKEN = 'كوري';
const PLACEHOLDER = /\$\{T\}/g;
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snacks', 'side', 'salad', 'fruit']);
const CJK = /[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\u3040-\u30FF\uAC00-\uD7AF]/;
const dirs = process.argv.slice(2);
let bad = 0;

for (const dir of dirs) {
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.mjs'))) {
    const p = join(dir, f);
    const src = readFileSync(p, 'utf8');
    src.split('\n').forEach((line, i) => {
      if (!line.trim().startsWith('B(')) return;
      const n = i + 1;
      const errs = [];

      if (line.includes('\uFFFD')) errs.push('U+FFFD replacement char');
      if (/\?\?/.test(line)) errs.push('?? sequence');

      const arMatch = line.match(/`([^`]*)`/);
      if (!arMatch) {
        errs.push('Arabic slot (backticks) not found');
      } else {
        const raw = arMatch[1];
        // Resolve the template placeholder so `${T}` is not read as stray Latin.
        const resolved = raw.replace(PLACEHOLDER, TOKEN);
        if (/[A-Za-z]/.test(resolved)) errs.push(`Latin inside Arabic name: "${resolved}"`);
        if (/[\uAC00-\uD7AF\u1100-\u11FF\u3040-\u30FF]/.test(resolved)) {
          errs.push(`CJK/Hangul inside Arabic name: "${resolved}"`);
        }
        if (!resolved.includes(TOKEN)) errs.push(`missing "${TOKEN}" token: "${resolved}"`);
        if (/\.{2,}|\s{2,}/.test(resolved)) errs.push(`odd spacing/punctuation: "${resolved}"`);
        if (raw.replace(PLACEHOLDER, '').trim().endsWith(',')) errs.push('trailing comma in Arabic name');
      }

      // Arabic and Latin touching with no separator anywhere in the row.
      const slots = [...line.matchAll(/`([^`]*)`/g)].map((m) => m[1].replace(PLACEHOLDER, TOKEN));
      const glue = /[\u0600-\u06FF][A-Za-z]|[A-Za-z][\u0600-\u06FF]/.test(
        slots.filter((s) => /[\u0600-\u06FF]/.test(s)).join(' '),
      );
      if (glue) errs.push('Arabic and Latin characters touching with no separator');

      // Every row must supply 4 quoted languages + category + mealType + cooking = 7,
      // plus exactly one backticked Arabic name. Numerals must be plain ints.
      const quoted = (line.match(/'[^']*'/g) || []).length;
      if (quoted !== 7) errs.push(`expected 7 single-quoted fields (4 langs + cat + meal + cooking), got ${quoted}`);
      const ticks = (line.match(/`/g) || []).length;
      if (ticks !== 2) errs.push(`expected exactly one backticked Arabic name, got ${ticks / 2}`);
      // Drop all string literals, then the only bare tokens left must be the 3 macros.
      const bare = line
        .replace(/`[^`]*`/g, '')
        .replace(/'[^']*'/g, '')
        .replace(/^[^\(]*\(/, '')
        .replace(/\)\s*,?\s*$/, '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const nonNumeric = bare.filter((s) => !/^\d+(?:\.\d+)?$/.test(s));
      if (bare.length !== 3) errs.push(`expected exactly 3 bare macro args, got ${bare.length} [${bare.join(', ')}]`);
      if (nonNumeric.length) errs.push(`non-numeric macro arg(s): ${nonNumeric.join(', ')}`);

      // No CJK / fullwidth / Hangul anywhere in the row, in any language slot.
      if (CJK.test(line.replace(PLACEHOLDER, TOKEN))) {
        const bad1 = [...line.matchAll(/[`']([^`']*)[`']/g)].filter((m) => CJK.test(m[1]));
        errs.push(`CJK/Hangul in field(s): ${bad1.map((m) => `"${m[1]}"`).join(', ')}`);
      }

      // mealType must be a known value.
      const meal = (line.match(/'([^']*)',\s*\d+,/) || [])[1];
      if (meal !== undefined && !MEALS.has(meal)) errs.push(`invalid mealType "${meal}"`);
      if (meal === undefined) errs.push('could not locate mealType');

      if (errs.length) {
        bad++;
        console.log(`\n${p}:${n}`);
        errs.forEach((e) => console.log(`   - ${e}`));
        console.log(`   ${line.trim().slice(0, 160)}`);
      }
    });
  }
}

console.log(bad ? `\nFAIL: ${bad} bad row(s)` : '\nOK: no corruption detected');
process.exit(bad ? 1 : 0);
