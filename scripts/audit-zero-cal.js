// Audit: lists all dishes with cal_100 = 0 OR cal_100 IS NULL, plus summary by kitchen/type.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['levant-migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or service key in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const { data, error } = await supabase
  .from('dishes')
  .select('id, name_ar, name_en, meal_type, region, source, cal_100, protein, carbs, fat, base_serving_g, base_cal_serv')
  .or('cal_100.is.null,cal_100.lte.0')
  .order('source', { ascending: true });

if (error) {
  console.error('Query failed:', error.message);
  process.exit(1);
}

console.log('TOTAL zero/null cal_100 rows:', data.length);
const bySource = {};
for (const r of data) {
  const s = r.source ?? '(no source)';
  bySource[s] = (bySource[s] ?? 0) + 1;
}
console.log('\nBy source:');
for (const [s, n] of Object.entries(bySource).sort((a, b) => b[1] - a[1])) console.log(`  ${n}  ${s}`);
const byMeal = {};
for (const r of data) byMeal[r.meal_type] = (byMeal[r.meal_type] ?? 0) + 1;
console.log('\nBy meal_type:', JSON.stringify(byMeal));
const byRegion = {};
for (const r of data) byRegion[r.region] = (byRegion[r.region] ?? 0) + 1;
console.log('\nBy region:', JSON.stringify(byRegion));

const csv = ['id|name_ar|name_en|meal_type|region|source|cal_100|protein|carbs|fat|base_serving_g|base_cal_serv'];
for (const r of data) {
  csv.push([r.id, r.name_ar, r.name_en, r.meal_type, r.region, r.source, r.cal_100, r.protein, r.carbs, r.fat, r.base_serving_g, r.base_cal_serv].join('|'));
}
import fs from 'node:fs';
fs.writeFileSync('audit-zero-cal.tsv', csv.join('\n'));
console.log('\nWrote audit-zero-cal.tsv');