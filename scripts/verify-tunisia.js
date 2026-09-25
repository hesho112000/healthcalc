import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const PAGE = 1000;
let rows = [];
let from = 0;
for (;;) {
  const { data, error } = await supabase
    .from('dishes')
    .select('id,name_ar,name_en,name_fr,name_es,name_de,cal_100,region,meal_type,source')
    .eq('region', 'pan_tunisian')
    .range(from, from + PAGE - 1);
  if (error) throw error;
  rows = rows.concat(data);
  if (data.length < PAGE) break;
  from += PAGE;
}

console.log('pan_tunisian rows in DB:', rows.length);

const sources = {};
for (const r of rows) {
  const s = r.source ?? '(null)';
  sources[s] = (sources[s] || 0) + 1;
}
console.log('sources:', JSON.stringify(sources, null, 2));

const badLangs = rows.filter((r) => !r.name_ar || !r.name_en || !r.name_fr || !r.name_es || !r.name_de);
console.log('rows with empty lang field:', badLangs.length);
badLangs.forEach((r) => console.log('  ', r.id, r.name_ar));

const mealTypes = {};
for (const r of rows) mealTypes[r.meal_type] = (mealTypes[r.meal_type] || 0) + 1;
console.log('meal_types:', JSON.stringify(mealTypes));

const lowCal = rows.filter((r) => r.cal_100 < 20).map((r) => `${r.name_ar}(${r.cal_100})`);
const highCal = rows.filter((r) => r.cal_100 > 900).map((r) => `${r.name_ar}(${r.cal_100})`);
console.log('cal_100 < 20:', lowCal.length, lowCal.join(' | '));
console.log('cal_100 > 900:', highCal.length, highCal.join(' | '));

const names = rows.map((r) => r.name_ar);
const seen = new Set();
const dups = [];
for (const n of names) {
  if (seen.has(n)) dups.push(n);
  seen.add(n);
}
console.log('duplicate name_ar within migrated set:', dups.length, dups.join(' | '));