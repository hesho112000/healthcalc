// Backfills diaspora_priority for every dish that does not have it set yet.
//
// The dishes table has no region_tags column; the kitchen is derived from the
// `region` value (pan_<kitchen> prefix) with the `source` prefix as a fallback
// for rows whose region is null. The first matching rule wins.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

for (const line of fs.readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Ordered rules: first match wins. Each entry tests the normalized kitchen id.
const RULES = [
  [/^(saudi|emirati|kuwaiti|qatari|bahraini|omani)$/, ['middle_eastern', 'arab', 'gulf']],
  [/^(egyptian|moroccan|tunisian|algerian|libyan)$/, ['middle_eastern', 'north_african']],
  [/^(lebanese|syrian|jordanian|palestinian)$/, ['middle_eastern', 'levantine']],
  [/^(indian|pakistani)$/, ['south_asian', 'asian']],
  [/^(indonesian|malaysian|filipino|thai|vietnamese)$/, ['southeast_asian', 'asian']],
  [/^(chinese|japanese|korean|taiwanese)$/, ['east_asian', 'asian']],
  [/^(nigerian|ethiopian|kenyan|south_african|ghanaian|rwandan|seychellois|mauritian|gabonese|botswanan)$/, ['african', 'sub_saharan']],
];
const DEFAULT = ['international'];

// Source prefixes like 'asia-korea-2026 - ...' or 'africa-ghana-2026 - ...'.
const SOURCE_KITCHEN = [
  [/^asia-(korea|taiwan|japan|china|thailand|vietnam|philippines|indonesia|malaysia)-2026/, (m) => m[1]],
  [/^africa-(nigeria|ethiopia|kenya|ghana|seychelles|mauritius|gabon|botswana)-2026/, (m) => m[1]],
  [/^africa-(south-african|south_african)-2026/, () => 'south_african'],
  [/^levant-(lebanon|syria|jordan|palestine)-2026/, (m) => m[1]],
  [/^mena-(egypt|morocco|tunisia|algeria|libya)-2026/, (m) => m[1]],
  [/^gulf-(saudi|uae|kuwait|qatar|bahrain|oman)-2026/, (m) => m[1]],
  [/^southasia-(india|pakistan)-2026/, (m) => m[1]],
];

function kitchenOf(region, source) {
  const r = (region ?? '').trim();
  if (r.startsWith('pan_')) {
    const id = r.slice(4).replace(/-(?=[^-]*$)/, '_').replace(/-/g, '_');
    // pan_south_african -> south_african, pan_saudi -> saudi
    const norm = id.replace(/^south_african$/, 'south_african');
    for (const [re] of RULES) if (re.test(norm)) return norm;
  }
  const s = (source ?? '').trim();
  for (const [re, fn] of SOURCE_KITCHEN) {
    const m = s.match(re);
    if (m) return fn(m);
  }
  return null;
}

function tagsFor(region, source) {
  const k = kitchenOf(region, source);
  if (!k) return DEFAULT;
  for (const [re, tags] of RULES) if (re.test(k)) return tags;
  return DEFAULT;
}

// ---- fetch every dish that still needs tags ----
const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase
    .from('dishes')
    .select('id,region,source')
    .is('diaspora_priority', null)
    .order('id')
    .range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}
console.log(`dishes with diaspora_priority IS NULL: ${rows.length}`);

// ---- group by computed tag set so each batch shares one value ----
const groups = new Map();
for (const r of rows) {
  const key = JSON.stringify(tagsFor(r.region, r.source));
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(r.id);
}

let totalUpdated = 0;
let totalFailed = 0;
let batchNo = 0;
const totalBatches = [...groups.values()].reduce((n, ids) => n + Math.ceil(ids.length / 100), 0);

for (const [key, ids] of groups) {
  const tags = JSON.parse(key);
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    batchNo++;
    const { error } = await supabase
      .from('dishes')
      .update({ diaspora_priority: tags })
      .in('id', chunk);
    if (error) {
      totalFailed += chunk.length;
      console.error(`Batch ${batchNo}/${totalBatches} FAILED: ${error.message}`);
    } else {
      totalUpdated += chunk.length;
      console.log(`Batch ${batchNo}/${totalBatches} done (${chunk.length} rows) -> ${key}`);
    }
  }
}

console.log(`\n===== BACKFILL SUMMARY =====`);
console.log(`Total dishes processed : ${rows.length}`);
console.log(`Batches run            : ${batchNo}/${totalBatches}`);
console.log(`Updated                : ${totalUpdated}`);
console.log(`Failed                 : ${totalFailed}`);
if (totalFailed > 0) process.exitCode = 1;
