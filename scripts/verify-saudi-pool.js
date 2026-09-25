import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function fetchAll(table) {
  const out = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase.from(table).select('*').order('id', { ascending: true }).range(from, from + PAGE - 1);
    if (error) throw error;
    const rows = data ?? [];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

const norm = (s) =>
  (s ?? '').replace(/[\u064B-\u0652\u0670]/g, '').replace(/\u0640/g, '').replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();

const TOKEN_REGIONS = {
  سعودي: 'pan_saudi', سعوديه: 'pan_saudi', قطري: 'pan_qatari', قطريه: 'pan_qatari',
  بحريني: 'pan_bahraini', بحرينيه: 'pan_bahraini', عماني: 'pan_omani', عمانيه: 'pan_omani',
  كويتي: 'pan_kuwaiti', كويتيه: 'pan_kuwaiti', إماراتي: 'pan_emirati', إماراتيه: 'pan_emirati',
  اماراتي: 'pan_emirati', اماراتيه: 'pan_emirati', مغربي: 'pan_moroccan', مغربيه: 'pan_moroccan',
  مصري: 'pan_egyptian', مصريه: 'pan_egyptian', لبناني: 'mena_shared', لبنانيه: 'mena_shared',
  سوري: 'mena_shared', سوريه: 'mena_shared', شامي: 'mena_shared', شاميه: 'mena_shared',
  أردني: 'mena_shared', أردنيه: 'mena_shared', فلسطيني: 'mena_shared', فلسطينيه: 'mena_shared',
  يمني: 'mena_shared', يمنيه: 'mena_shared', عراقي: 'mena_shared', عراقيه: 'mena_shared',
  هندي: 'global', هنديه: 'global', تركي: 'global', تركيه: 'global',
  باكستاني: 'global', باكستانيه: 'global',
};
const NO_RETAG = new Set(['صيني', 'صينيه', 'سوداني', 'سودانيه']);
const TAMARIND = /تمر\s*(?:ال)?هندي/;

const nationality = (name) => {
  let n = norm(name);
  if (TAMARIND.test(n)) n = n.replace(TAMARIND, 'تمر');
  for (const t of n.split(/\s+/)) {
    if (NO_RETAG.has(t)) continue;
    const base = t.replace(/^ال/, '');
    if (TOKEN_REGIONS[base]) return TOKEN_REGIONS[base];
  }
  return null;
};

const SAUDI_FAM = new Set(['pan_saudi', 'gulf_shared', 'hijazi', 'najdi', 'janubi', 'sharqi']);

const rows = await fetchAll('dishes');

let pool = rows.filter((r) => {
  if (!r.name_ar) return false;
  if (r.region && !SAUDI_FAM.has(r.region)) return false;
  const nat = nationality(r.name_ar);
  if (nat && nat !== 'pan_saudi') return false;
  const n = norm(r.name_ar);
  if (n === 'تبوله' || n === 'فتوش') return false;
  return true;
});

console.log(`SAUDI POOL (token-filtered): ${pool.length}`);

const fm = {};
for (const r of pool) {
  const k = r.region ?? 'NULL';
  fm[k] = (fm[k] || 0) + 1;
}
for (const k of Object.keys(fm).sort()) console.log(String(fm[k]).padStart(5), k);

const bad = pool.filter((r) => {
  const nat = nationality(r.name_ar);
  return nat && nat !== 'pan_saudi';
});
console.log(`Foreign-named still in pool: ${bad.length}`);
for (const r of bad) console.log('  ', r.name_ar, '|', r.region);

const tamarind = rows.filter((r) => norm(r.name_ar).includes('تمر هندي'));
console.log('Tamarind rows preserved:', tamarind.map((r) => `${r.name_ar} [${r.region ?? 'NULL'}]`).join(' / '));