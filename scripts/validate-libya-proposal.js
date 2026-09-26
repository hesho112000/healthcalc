// Validates scripts/libya-49-proposal.json against:
//  1) schema (5 langs, mealType, region, cal_100 range, category)
//  2) internal duplicate Arabic names
//  3) duplicate Arabic names already in live Supabase DB (scripts/_db-names.json)
//  4) duplicate Arabic names already in the local 201-name Libyan set
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function norm(s) {
  return (s ?? '')
    .trim()
    .replace(/[أآإ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[^\u0600-\u06FF\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const proposal = JSON.parse(fs.readFileSync(path.join(__dirname, 'libya-49-proposal.json'), 'utf8'));
const existing = JSON.parse(fs.readFileSync(path.join(__dirname, '_db-names.json'), 'utf8'));

const local = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/libyan-full-100-USDA.json'), 'utf8'));
const localAr = local.categories.flatMap((c) => c.dishes.map((d) => d.name)).map(norm).filter(Boolean);

const schemaErrors = [];
for (const d of proposal.dishes) {
  for (const k of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!d[k] || !d[k].trim()) schemaErrors.push(`empty ${k}: ${d.name_ar}`);
  }
  if (!(d.cal_100 >= 20 && d.cal_100 <= 900)) schemaErrors.push(`cal out of range: ${d.cal_100} (${d.name_ar})`);
  if (!proposal.meal_types.includes(d.mealType)) schemaErrors.push(`bad mealType: ${d.mealType} (${d.name_ar})`);
  if (!proposal.regions.includes(d.region)) schemaErrors.push(`bad region: ${d.region} (${d.name_ar})`);
  if (!proposal.categories.includes(d.category)) schemaErrors.push(`bad category: ${d.category} (${d.name_ar})`);
}

const seen = new Set();
const internalDups = [];
for (const d of proposal.dishes) {
  const n = norm(d.name_ar);
  if (seen.has(n)) internalDups.push(d.name_ar);
  seen.add(n);
}

const dbSet = new Set(existing.map(norm).filter(Boolean));
const dbDups = proposal.dishes.filter((d) => dbSet.has(norm(d.name_ar))).map((d) => d.name_ar);

const localSet = new Set(localAr);
const localDups = proposal.dishes.filter((d) => localSet.has(norm(d.name_ar))).map((d) => d.name_ar);

const totalInDB = existing.length;
const totalAfter = totalInDB + proposal.dishes.length;

function countBy(k) {
  const m = {};
  for (const d of proposal.dishes) m[d[k]] = (m[d[k]] || 0) + 1;
  return m;
}

console.log('===== LIBYA 49 PROPOSAL VALIDATION =====');
console.log(`dishes in proposal : ${proposal.dishes.length}`);
console.log(`rows currently in DB: ${totalInDB}`);
console.log(`rows after injection: ${totalAfter} (delta +${proposal.dishes.length})`);
console.log(`schema errors      : ${schemaErrors.length}`);
schemaErrors.slice(0, 20).forEach((e) => console.log('  ' + e));
console.log(`internal dups      : ${internalDups.length}${internalDups.length ? ' -> ' + internalDups.join(' | ') : ''}`);
console.log(`dups vs live DB    : ${dbDups.length}${dbDups.length ? ' -> ' + dbDups.join(' | ') : ''}`);
console.log(`dups vs local 201  : ${localDups.length}${localDups.length ? ' -> ' + localDups.join(' | ') : ''}`);
console.log('category counts    :', JSON.stringify(countBy('category')));
console.log('region counts      :', JSON.stringify(countBy('region')));
console.log('mealType counts    :', JSON.stringify(countBy('mealType')));

process.exitCode = schemaErrors.length || internalDups.length || dbDups.length || localDups.length ? 1 : 0;