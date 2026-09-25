import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const regions = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb.from('dishes').select('region').order('id', { ascending: true }).range(from, from + 999);
  if (error) throw error;
  regions.push(...(data ?? []).map((r) => r.region));
  if ((data ?? []).length < 1000) break;
}

const KITCHEN_COUNT_REGIONS = {
  saudi: new Set(['pan_saudi', 'hijazi', 'najdi', 'janubi', 'sharqi', null]),
  emirati: new Set(['pan_emirati', 'ras_al_khaimah']),
  kuwaiti: new Set(['pan_kuwaiti']),
  qatar: new Set(['pan_qatari']),
  bahraini: new Set(['pan_bahraini']),
  omani: new Set(['pan_omani']),
  moroccan: new Set(['pan_moroccan', 'fes', 'marrakech', 'tangier', 'essouira', 'chefchaouen', 'sahara']),
  egyptian: new Set(['pan_egyptian', 'alexandria', 'delta', 'upper_egypt', 'sinai', 'nubia']),
};
for (const [id, set] of Object.entries(KITCHEN_COUNT_REGIONS)) {
  const n = regions.reduce((acc, region) => acc + (set.has(region) ? 1 : 0), 0);
  console.log(`${id.padEnd(10)} ${n}`);
}
console.log('total rows scanned:', regions.length);