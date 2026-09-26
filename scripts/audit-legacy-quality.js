// READ-ONLY audit of the live dishes table for the two data-quality issues:
//  1. cal_100 == 100 placeholder rows  (and other source-based sanity checks)
//  2. inappropriate / placeholder Arabic dish names (breast milk, baby food, pet food, ...)
// Reports counts per source, macro availability, exact-100 rows with their macros, and
// any name matches against an offensive/culturally-insensitive keyword list.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env['levant-migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const NAME_FLAGS = [
  /لبن[ـ ]?ال[أإآ]م/,
  /حليب[ـ ]?الث?دي/,
  /حليب[ـ ]?ال[أإآ]م/,
  /رضا[عع]/,
  /رضيع/,
  /رضع/,
  /ولادة|مولود/,
  /baby|breast\s*milk|human\s*milk|infant|formula|lactation/i,
  /كلا[بب]|قطط|قطيط|هريرة|طعام الكلاب|طعام القطط|علف/,
  /pet\s*food|dog\s*food|cat\s*food|kibble/i,
  /سيريلاك|بريم|فورميلا|ماش|بودياشور|pediasure|cereal\s*food/i,
];

const rows = [];
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .order('id', { ascending: true })
    .range(from, from + PAGE - 1);
  if (error) { console.error('Query failed:', error.message); process.exit(1); }
  rows.push(...(data ?? []));
  if ((data ?? []).length < PAGE) break;
}

const bySource = {};
for (const r of rows) bySource[r.source ?? '(null)'] = (bySource[r.source ?? '(null)'] ?? 0) + 1;

console.log('\n===== LIVE DISHES AUDIT =====');
console.log('Total rows:', rows.length);
console.log('\n-- Sources --');
for (const [s, n] of Object.entries(bySource).sort((a, b) => b[1] - a[1])) console.log(`  ${n}\t${s}`);

const hasMacros = rows.filter((r) => r.protein != null && r.carbs != null && r.fat != null);
console.log('\n-- Macros --');
console.log('Rows with protein+carbs+fat all set:', hasMacros.length);
console.log('Rows missing any macro:', rows.length - hasMacros.length);

const exact100 = rows.filter((r) => r.cal_100 === 100);
console.log('\n-- cal_100 == 100 (placeholder suspicion) --');
console.log('Count:', exact100.length);
const x100bySource = {};
for (const r of exact100) x100bySource[r.source ?? '(null)'] = (x100bySource[r.source ?? '(null)'] ?? 0) + 1;
console.log('By source:', JSON.stringify(x100bySource));
console.log('Sample 25 (name_ar | cal_100 | p/c/f | meal_type | region):');
for (const r of exact100.slice(0, 25)) {
  console.log(`  ${r.name_ar ?? '?'}\t| cal=${r.cal_100}\t| p=${r.protein} c=${r.carbs} f=${r.fat}\t| ${r.meal_type}\t| ${r.region ?? '-'}`);
}

const calNulls = rows.filter((r) => r.cal_100 == null);
console.log('\nRows with cal_100 NULL:', calNulls.length);
const calZero = rows.filter((r) => r.cal_100 != null && r.cal_100 <= 0);
console.log('Rows with cal_100 <= 0:', calZero.length, calZero.map((r) => r.name_ar).join(' | '));

console.log('\n-- Inappropriate / placeholder names --');
let flaggedTotal = 0;
for (const pat of NAME_FLAGS) {
  const hits = rows.filter((r) => pat.test(r.name_ar ?? '') || pat.test(r.name_en ?? ''));
  if (hits.length) {
    console.log(`\n  Pattern ${pat}: ${hits.length}`);
    for (const h of hits) console.log(`    ${h.name_ar} | ${h.name_en} | source=${h.source ?? '-'} | meal=${h.meal_type} | region=${h.region ?? '-'}`);
    flaggedTotal += hits.length;
  }
}
console.log('\nTotal flagged names:', flaggedTotal);

// context-insensitive leftovers: extremely short/odd Arabic names
console.log('\n-- Short (<=6 char) Arabic names --');
for (const r of rows.filter((r) => (r.name_ar ?? '').replace(/\s/g, '').length <= 6)) {
  console.log(`  [${(r.name_ar ?? '').trim()}] ${r.name_en ?? ''} | ${r.source ?? '-'}`);
}

// name_ar duplicates in DB (rename collision risk)
const seen = new Map();
const dups = [];
for (const r of rows) {
  if (seen.has(r.name_ar)) dups.push(r.name_ar);
  seen.set(r.name_ar, r.id);
}
console.log('\nDuplicate name_ar in DB:', dups.length, dups.slice(0, 20).join(' | '));