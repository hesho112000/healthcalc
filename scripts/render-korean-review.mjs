// Renders the full 400-dish Korean proposal to scripts/korean-400-review.md for review.
// READ-ONLY with respect to Supabase: reads only the two proposal JSON files.
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = JSON.parse(readFileSync(join(ROOT, 'scripts', 'korean-200-proposal.json'), 'utf8')).dishes;
const expansion = JSON.parse(readFileSync(join(ROOT, 'scripts', 'korean-expansion-200-proposal.json'), 'utf8')).dishes;
const combined = [...base, ...expansion];

const CAT_ORDER = [
  'breakfast_items', 'rice_dishes', 'noodle_dishes', 'soups_stews', 'poultry_mains',
  'meat_mains', 'fish_seafood', 'vegetable_mains', 'street_snacks',
  'rice_cakes_sweets', 'condiments_sauces', 'beverages',
];

const lines = [];
lines.push('# South Korean Kitchen - Full 400-Dish Proposal (PREVIEW, NOT YET MIGRATED)');
lines.push('');
lines.push('- **200 base (legacy) + 200 expansion = 400** dishes, each with Arabic / English / French / Spanish / German names.');
lines.push('- `cal_100` is **computed** as `round(4P + 4C + 9F)` in the generators, so the set is Atwater-consistent by construction (never hand-typed).');
lines.push('- Every Arabic name carries the **masculine** `كوري` token (base) / `كوري أصيل` (expansion) so the nationality guard in `src/utils/kitchenAuthenticity.ts` maps all 400 to `pan_korean`.');
lines.push('- **Halal: strictly no pork and no alcohol.** Traditional pork belly (삼겹살) and alcoholic soju/makgeolli were replaced with beef/chicken/seafood, beef broth, rice vinegar and pear juice.');
lines.push('- **Golden rule honoured:** whenever a regional attribution was uncertain the dish was tagged `pan_korean`.');
lines.push('');
lines.push('## Region distribution');
const regionDist = {};
for (const d of combined) regionDist[d.region] = (regionDist[d.region] || 0) + 1;
lines.push('');
lines.push('| region | rows |');
lines.push('| --- | ---: |');
for (const [r, n] of Object.entries(regionDist).sort((a, b) => b[1] - a[1])) lines.push(`| ${r} | ${n} |`);
lines.push('');
lines.push('## Category distribution');
const catDist = {};
for (const d of combined) catDist[d.category] = (catDist[d.category] || 0) + 1;
lines.push('');
lines.push('| category | rows |');
lines.push('| --- | ---: |');
for (const c of CAT_ORDER) lines.push(`| ${c} | ${catDist[c] ?? 0} |`);

let n = 0;
for (const cat of CAT_ORDER) {
  const rows = combined.filter((d) => d.category === cat);
  if (!rows.length) continue;
  lines.push('');
  lines.push(`## ${cat} (${rows.length})`);
  lines.push('');
  lines.push('| # | set | Arabic name | English name | region | meal | kcal | P | C | F |');
  lines.push('| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |');
  for (const d of rows) {
    n += 1;
    const set = base.includes(d) ? 'base' : 'exp';
    lines.push(`| ${n} | ${set} | ${d.name_ar} | ${d.name_en} | ${d.region} | ${d.mealType} | ${d.cal_100} | ${d.protein} | ${d.carbs} | ${d.fat} |`);
  }
}
lines.push('');
lines.push(`Total rows rendered: ${n}`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('**Nothing has been written to Supabase.** After approval the next steps are:');
lines.push('1. `migrate-korea-legacy.js` - insert the 200 base rows (region `pan_korean`, 100 g serving).');
lines.push('2. `migrate-korea.js` - insert the 200 expansion rows (regional tags, `asia-korea-2026` source).');
lines.push('3. Register `كوري` in `TOKEN_REGIONS` plus the `korean` entries in `KITCHEN_COUNT_REGIONS` / `KITCHEN_REGION_FAMILIES`.');
lines.push('4. Credit `asian_shared` rows via the `asia-korea-2026` source prefix in `useKitchenDishCounts` (no-op today: 0 asian_shared rows).');
lines.push('5. `npx tsc --noEmit`, `npm run test:kitchens`, `npm run build`, then commit and push.');

writeFileSync(join(ROOT, 'scripts', 'korean-400-review.md'), lines.join('\n') + '\n', 'utf8');
console.log(`wrote scripts/korean-400-review.md (${n} rows)`);
