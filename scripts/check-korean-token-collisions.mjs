// Read-only safety check: does the new 'كوري' TOKEN_REGIONS entry retag any
// ALREADY-LIVE dish from another kitchen? Such a dish would be rejected by
// hasForeignNationalityFor and silently disappear from that kitchen's plans.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Mirrors normalizeArabicName in src/utils/kitchenAuthenticity.ts.
function norm(s) {
  return (s ?? '')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();
}

const rows = [];
let from = 0;
for (;;) {
  const { data, error } = await supabase.from('dishes').select('id,name_ar,region').order('id').range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
  from += 1000;
}
console.log('total live rows:', rows.length);

const KORI_SOUTH_INDIAN = /كوري\s*(?:روتي|دوسا|غاسي|راث)/;
const hits = rows.filter((r) => {
  let n = norm(r.name_ar);
  if (KORI_SOUTH_INDIAN.test(n)) n = n.replace(KORI_SOUTH_INDIAN, '');
  return n.split(/\s+/).some((t) => t.replace(/^ال/, '') === 'كوري');
});
const byRegion = {};
for (const h of hits) byRegion[h.region ?? '(null)'] = (byRegion[h.region ?? '(null)'] || 0) + 1;
console.log('rows whose nationality resolves to pan_korean:', hits.length);
console.log('by region:', JSON.stringify(byRegion));

// Any hit that is NOT one of our own pan_korean/regional Korean rows is a collision.
const KOREAN_REGIONS = new Set(['pan_korean', 'seoul', 'busan', 'jeju', 'jeonju', 'andong', 'goryeong',
  'gangneung', 'incheon', 'daegu', 'gwangju', 'daejeon', 'ulsan', 'suwon', 'chuncheon', 'mokpo',
  'yeosu', 'pohang', 'gyeongju', 'tongyeong', 'sunchang', 'boseong', 'namhae']);
const foreign = hits.filter((h) => !KOREAN_REGIONS.has(h.region));
console.log('\nCOLLISIONS (resolve to pan_korean but not a Korean-region row):', foreign.length);
for (const f of foreign.slice(0, 40)) console.log(`  id=${f.id} region=${f.region} "${f.name_ar}"`);
