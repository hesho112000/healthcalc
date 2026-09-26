// One-pass audit + fix for both live-data quality issues.
//   1. Names: inappropriate dishes → adult alternatives (or removal).
//      - لبن الأم (breast milk)  → REMOVED (DB already has حليب طازج / لبن بقري / لبن كامل الدسم / زبادي / لبن رائب).
//      - قمح محصن لأغذية الأطفال → adult fortified toasted wheat flakes (macros already Atwater-consistent).
//      - أرز محصن لأغذية الأطفال → adult fortified toasted rice flakes, moved to breakfast.
//   2. Calories: ATWATER recalcs applied ONLY where macros are verifiably per-100g and agree with the
//      stored cal_100 within a sane bound (fixing placeholder dance without corrupting authored rows):
//        gates: macros present; Atwater ∈ [5,900]; cal_100 ∈ [5,900]; macros plausible per-100g
//               (p,c,f ≤100 and p+c+f ≤110); |Atwater − cal_100| ≤ 30% of the larger.
//      Rows failing gates are FLAGGED (broken-macro legacy families) and left untouched.
//      Rows with missing macros + cal_100 exactly 100 → override-based realistic values.
// DRY_RUN=1 previews; otherwise applies.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const DRY = process.env.DRY_RUN === '1';
const supabase = createClient(process.env.SUPABASE_URL, process.env['levant-migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const rows = [];
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase.from('dishes').select('*').order('id', { ascending: true }).range(from, from + PAGE - 1);
  if (error) { console.error('Query failed:', error.message); process.exit(1); }
  rows.push(...(data ?? []));
  if ((data ?? []).length < PAGE) break;
}
const byNameAr = new Map();
for (const r of rows) byNameAr.set(r.name_ar, r);
const allNewNames = new Set(rows.map((r) => r.name_ar));

console.log(`\n===== FIX LEGACY DATA QUALITY (${DRY ? 'DRY RUN' : 'APPLY'}) =====`);
console.log('Total rows:', rows.length);

// ---------------- 1. NAMES ----------------
const REMOVE = ['لبن الأم'];
const RENAMES = [
  {
    match: 'قمح محصن لأغذية الأطفال',
    names: { name_ar: 'رقائق قمح محمّصة محصّنة', name_en: 'Fortified Toasted Wheat Flakes', name_fr: 'Flocons de blé grillés enrichis', name_es: 'Copos de trigo tostados enriquecidos', name_de: 'Angereicherte geröstete Weizenflocken' },
  },
  {
    match: 'أرز محصن لأغذية الأطفال',
    names: { name_ar: 'رقائق أرز محمّصة محصّنة', name_en: 'Fortified Toasted Rice Flakes', name_fr: 'Flocons de riz grillés enrichis', name_es: 'Copos de arroz tostados enriquecidos', name_de: 'Angereicherte geröstete Reisflocken' },
    meal_type: 'breakfast',
  },
];

// ---------------- 2. CALORIES ----------------
const PLACEHOLDER = new Map([
  ['لبنة بالثوم والنعناع', 130], ['تمر هندي', 110], ['فول أخضر مسلوق بالملح', 110],
  ['مشروب اللوز بالورد', 75], ['شوربة البرغل بالكبدة', 90], ['سلطة حمص بالليمون بحرينية', 150],
  ['عصير الموز بالحليب', 95], ['سلطة حمص بالليمون قطرية', 150], ['ذرة مشوية', 108],
  ['بابا غنوج بالطحينة والزيت البلدي', 115], ['سلطة حمص بالليمون عمانية', 150],
  ['الشوربة الحورانية', 60], ['سلطة العدس بالكمون', 120],
]);

const removePlan = [], renamePlan = [], macroPlan = [], placePlan = [], flagged = [];

for (const n of REMOVE) if (byNameAr.has(n)) removePlan.push(byNameAr.get(n));

for (const spec of RENAMES) {
  const r = byNameAr.get(spec.match);
  if (!r) { console.log(`  [rename] NOT FOUND: ${spec.match}`); continue; }
  if (allNewNames.has(spec.names.name_ar)) { console.log(`  [rename] COLLISION ${spec.names.name_ar}; skip ${spec.match}`); continue; }
  allNewNames.add(spec.names.name_ar);
  renamePlan.push({ row: r, spec });
}

let atwaterTotal = 0;
const dist = new Map(); // source -> relative diff buckets
const bySourceDiff = {};
for (const r of rows) {
  if (r.protein == null || r.carbs == null || r.fat == null) {
    if (r.cal_100 === 100 && PLACEHOLDER.has(r.name_ar)) {
      const cal = PLACEHOLDER.get(r.name_ar);
      placePlan.push({ row: r, cal, target: cal });
    }
    continue;
  }
  atwaterTotal++;
  const rc = Math.round(r.protein * 4 + r.carbs * 4 + r.fat * 9);
  if (rc < 5 || rc > 900) { flagged.push({ r, why: `mnc ${r.cal_100}->${rc}` }); continue; }
  if (r.cal_100 < 5 || r.cal_100 > 900 || r.protein > 100 || r.carbs > 100 || r.fat > 100 || (r.protein + r.carbs + r.fat) > 110) {
    flagged.push({ r, why: `nongate mac/p/c/f/cal` }); continue;
  }
  const bigger = Math.max(rc, r.cal_100);
  const rel = Math.abs(rc - r.cal_100) / bigger;
  const src = r.source ?? '(null)';
  if (rel > 0.3) { flagged.push({ r, why: `disagree ${r.cal_100}->${rc}` }); continue; }
  if (!bySourceDiff[src]) bySourceDiff[src] = { '≤10%': 0, '10–30%': 0, '>30%': 0 };
  const bucket = rel <= 0.1 ? '≤10%' : (rel <= 0.3 ? '10–30%' : '>30%');
  bySourceDiff[src][bucket]++;
  if (rc === r.cal_100) continue;
  macroPlan.push({ id: r.id, cal_100: rc, base_cal_serv: r.base_serving_g ? Math.round((rc / 100) * r.base_serving_g) : rc });
}

console.log(`\n-- 1. NAMES --`);
console.log(`  REMOVE (${removePlan.length}):`);
for (const r of removePlan) console.log(`    ${r.name_ar} | ${r.name_en} | ${r.id}`);
console.log(`  RENAME (${renamePlan.length}):`);
for (const { row, spec } of renamePlan) console.log(`    ${row.name_ar} -> ${spec.names.name_ar}${spec.meal_type ? ` (meal→${spec.meal_type})` : ''}`);

console.log(`\n-- 2. ATWATER (macro-bearing rows: ${atwaterTotal}) --`);
console.log(`  Would-change: ${macroPlan.length}   Flagged-skip: ${flagged.length}`);
console.log(`  Relative diff by source (would-change set):`);
for (const [s, b] of Object.entries(bySourceDiff)) console.log(`    ${JSON.stringify(b)}\t${s}`);
const top = [...macroPlan].map((m) => ({ ...m })).sort((a, b) => Math.abs(b.cal_100 - 0) - Math.abs(a.cal_100 - 0));
console.log(`  Sample of largest corrections (first 20):`);
// rebuild old value from rows
const oldOf = new Map(macroPlan.map((m) => [m.id, byNameAr.get(rows.find((x) => x.id === m.id)?.name_ar)?.cal_100]));
const sample = [...macroPlan]
  .map((m) => ({ name: rows.find((x) => x.id === m.id)?.name_ar, old: oldOf.get(m.id), now: m.cal_100 }))
  .sort((a, b) => Math.abs(b.now - b.old) - Math.abs(a.now - a.old))
  .slice(0, 20);
for (const s of sample) console.log(`    ${s.name} : ${s.old} -> ${s.now}`);

console.log(`\n-- 2b. PLACEHOLDER 100s WITHOUT MACROS (${placePlan.length}) --`);
for (const p of placePlan) console.log(`    ${p.row.name_ar} : 100 -> ${p.cal}`);

console.log(`\n-- FLAGGED (broken macros / disagreement >30% — LEFT AS-IS) ${flagged.length} --`);
for (const f of flagged.slice(0, 25)) console.log(`    ${f.r.name_ar} | ${f.r.source ?? '-'} | ${f.why}`);
if (flagged.length > 25) console.log(`    ... and ${flagged.length - 25} more`);

if (DRY) { console.log('\nDry run complete — no writes.'); process.exit(0); }

// ---------------- APPLY ----------------
async function batch(plan, fn) {
  const CH = 50;
  for (let i = 0; i < plan.length; i += CH) await Promise.all(plan.slice(i, i + CH).map((item) => fn(item)));
}
let n = 0;
await batch(removePlan, async (r) => {
  const { error } = await supabase.from('dishes').delete().eq('id', r.id);
  if (error) throw error; n++;
});
console.log('\nRemoved:', n);

n = 0;
await batch(renamePlan, async ({ row, spec }) => {
  const { error } = await supabase.from('dishes').update({ ...spec.names, ...(spec.meal_type ? { meal_type: spec.meal_type } : {}) }).eq('id', row.id);
  if (error) throw error; n++;
});
console.log('Renamed:', n);

n = 0;
await batch(macroPlan, async ({ id, cal_100, base_cal_serv }) => {
  const { error } = await supabase.from('dishes').update({ cal_100, base_cal_serv }).eq('id', id);
  if (error) throw error; n++;
});
console.log('Atwater cal_100 fixes:', n);

n = 0;
await batch(placePlan, async ({ row, cal }) => {
  const base_cal_serv = row.base_serving_g ? Math.round((cal / 100) * row.base_serving_g) : cal;
  const { error } = await supabase.from('dishes').update({ cal_100: cal, base_cal_serv }).eq('id', row.id);
  if (error) throw error; n++;
});
console.log('Placeholder-category fixes:', n);
console.log('DONE.');