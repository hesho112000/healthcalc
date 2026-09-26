// Merges lebanon-150-proposal.json + lebanon-51-proposal.json into
// scripts/lebanon-201-proposal.json (the final migration payload for review).
// Guards against internal + cross-proposal normalized duplicates and 5-lang/cal integrity.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const norm = (s) => (s ?? '').replace(/[\u064B-\u0652\u0670]/g, '').replace(/\u0640/g, '').replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();

const a = JSON.parse(fs.readFileSync(path.join(__dirname, 'lebanon-150-proposal.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(__dirname, 'lebanon-51-proposal.json'), 'utf8'));

const seen = new Map();
const dups = [];
for (const d of [...a.dishes, ...b.dishes]) {
  const n = norm(d.name_ar);
  if (seen.has(n)) dups.push(`${seen.get(n)} <-> ${d.name_ar}`);
  else seen.set(n, d.name_ar);
}
if (dups.length) { console.error('Cross-proposal normalized dups:'); for (const x of dups) console.error('   ', x); process.exit(1); }

const langKeys = ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'];
let errors = 0;
for (const d of [...a.dishes, ...b.dishes]) {
  for (const k of langKeys) if (typeof d[k] !== 'string' || !d[k].trim()) { errors++; console.error(`empty ${k}: ${d.name_ar}`); }
  if (!(d.cal_100 >= 20 && d.cal_100 <= 900)) { errors++; console.error(`cal out of range: ${d.name_ar}`); }
}
if (errors) process.exit(1);

const dishes = [...a.dishes, ...b.dishes];
const cats = {}; const rgns = {};
for (const d of dishes) { cats[d.category] = (cats[d.category] || 0) + 1; rgns[d.region] = (rgns[d.region] || 0) + 1; }

const categories = a.categories;
const regions = a.regions;
const meal_types = a.meal_types;

const out = { kitchen: 'lebanese', target_total: 300, new_dishes: dishes.length, categories, regions, meal_types, dishes };
fs.writeFileSync(path.join(__dirname, 'lebanon-201-proposal.json'), JSON.stringify(out, null, 2));

console.log('total dishes  ', dishes.length);
console.log('legacy + new   ', 99 + dishes.length);
console.log('categories    ', JSON.stringify(cats));
console.log('regions       ', JSON.stringify(rgns));
console.log('wrote scripts/lebanon-201-proposal.json');