import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const read = (p) => JSON.parse(fs.readFileSync(path.join(__dirname, p), 'utf-8'));

const uae = read('scripts/uae-to-400-proposal.json');
const kwt = read('scripts/kuwait-250-proposal.json');

// (kitchen, name_ar, region, mealType, name_en, kind)
const rows = [
  ...uae.local.map((d) => ({ kitchen: 'uae', name_ar: d.name_ar, name_en: d.name_en ?? null, mealType: d.mealType ?? null, region: d.region ?? null, kind: 'uae-local' })),
  ...uae.new.map((d) => ({ kitchen: 'uae', name_ar: d.name_ar, name_en: d.name_en ?? null, mealType: d.mealType ?? null, region: d.region ?? null, kind: 'uae-new' })),
  ...kwt.dishes.map((d) => ({ kitchen: 'kuwait', name_ar: d.name_ar, name_en: d.name_en ?? null, mealType: d.mealType ?? null, region: d.region ?? null, kind: 'kuwait' })),
];

const TOTAL = rows.length;
let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  try {
    const { data: existing, error: checkErr } = await supabase
      .from('dishes')
      .select('id')
      .eq('name_ar', r.name_ar)
      .maybeSingle();
    if (checkErr) throw new Error(`duplicate check failed: ${checkErr.message}`);
    if (existing) {
      skipped++;
      skippedNames.push(r.name_ar);
      console.log(`Skip ${i + 1}/${TOTAL} [${r.kitchen}] "${r.name_ar}" already exists (id=${existing.id})`);
      continue;
    }
    const { error: insertErr } = await supabase.from('dishes').insert({
      name_ar: r.name_ar,
      name_en: r.name_en,
      name_fr: null,
      name_es: null,
      name_de: null,
      cal_100: null,
      protein: null,
      carbs: null,
      fat: null,
      fiber: null,
      sugar: null,
      sodium: null,
      sat_fat: null,
      base_serving_g: null,
      base_cal_serv: null,
      meal_type: r.mealType,
      region: r.region,
      region_confidence: null,
      source: 'gulf-expansion-2026',
      confidence: null,
      confidence_label: null,
      confidence_color: null,
    });
    if (insertErr) throw new Error(`insert failed: ${insertErr.message}`);
    inserted++;
    console.log(`Insert ${i + 1}/${TOTAL} [${r.kitchen} / ${r.kind}] "${r.name_ar}" (region=${r.region}, meal=${r.mealType})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${r.name_ar}"): ${err.message}`);
  }
}

const byKind = {};
for (const r of rows) byKind[r.kind] = (byKind[r.kind] || 0) + 1;

console.log('\n===== GULF EXPANSION 2026 MIGRATION =====');
console.log(`Total rows   : ${TOTAL}`);
console.log(`  uae-local  : ${byKind['uae-local']}`);
console.log(`  uae-new    : ${byKind['uae-new']}`);
console.log(`  kuwait     : ${byKind['kuwait']}`);
console.log(`Inserted     : ${inserted}`);
console.log(`Skipped      : ${skipped}`);
console.log(`Failed       : ${failed}`);
if (skippedNames.length) console.log('Skipped names:', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;