// Repairs the 3 Taiwan base teas whose cal_100 was raised to 20 by an earlier
// clamp, breaking Atwater consistency. Recomputes cal_100 (and the derived
// base_cal_serv) from the stored macros so cal_100 === round(4P + 4C + 9F).
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

for (const line of fs.readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data, error } = await sb
  .from('dishes')
  .select('id,name_ar,name_en,cal_100,protein,carbs,fat,base_serving_g,base_cal_serv')
  .like('source', 'asia-taiwan-2026%');
if (error) throw error;

const drift = data.filter((r) => r.cal_100 !== Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat));
console.log(`rows with Atwater drift: ${drift.length}`);

for (const r of drift) {
  const fixed = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  const grams = Number(r.base_serving_g) || 100;
  const baseCalServ = Math.round(fixed * (grams / 100) * 10) / 10;
  const { error: upErr } = await sb
    .from('dishes')
    .update({ cal_100: fixed, base_cal_serv: baseCalServ })
    .eq('id', r.id);
  if (upErr) { console.error(`FAIL ${r.id}: ${upErr.message}`); process.exitCode = 1; continue; }
  console.log(`fixed ${r.name_ar} | ${r.name_en}: cal_100 ${r.cal_100} -> ${fixed}, base_cal_serv ${r.base_cal_serv} -> ${baseCalServ}`);
}

const { data: after } = await sb
  .from('dishes')
  .select('cal_100,protein,carbs,fat')
  .like('source', 'asia-taiwan-2026%');
const still = after.filter((r) => r.cal_100 !== Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat));
console.log(`\nremaining drift rows: ${still.length}`);
if (still.length) process.exitCode = 1;
