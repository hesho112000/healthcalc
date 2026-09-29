const fs = require('fs');
const base = JSON.parse(fs.readFileSync('scripts/japanese-200-proposal.json', 'utf8')).dishes;
const exp = JSON.parse(fs.readFileSync('scripts/japanese-300-proposal.json', 'utf8')).dishes;

// Simulate what migration scripts do
const mochiTokens = ['بصل','ثوم','زنجبيل','فلفل','كاري','كزبرة','ليمون','موز','جوز الهند'];

const baseDishes = base.map(d => {
  let name_ar = d.name_ar;
  let name_en = d.name_en;
  if (d.name_ar === 'أونيجيري بالماكريل ياباني') name_ar = d.name_ar + ' (Base)';
  else if (d.name_ar.startsWith('موتشي بال')) {
    const hasToken = ['بصل','ثوم','زنجبيل','فلفل','كاري','كزبرة','ليمون','موز','جوز الهند'].some(w => d.name_ar.includes('موتشي بال' + w + ' ياباني'));
    if (hasToken) name_ar = d.name_ar + ' (Base)';
  }
  if (d.name_en === 'Salmon onigiri') name_en = 'Salmon onigiri (Base)';
  return { name_ar, name_en };
});

const expDishes = exp.map(d => ({ name_ar: d.name_ar, name_en: d.name_en }));

const arCounts = {};
const enCounts = {};

for (const d of baseDishes) {
  arCounts[d.name_ar] = (arCounts[d.name_ar] || 0) + 1;
  enCounts[d.name_en] = (enCounts[d.name_en] || 0) + 1;
}
for (const d of exp) {
  arCounts[d.name_ar] = (arCounts[d.name_ar] || 0) + 1;
  enCounts[d.name_en] = (enCounts[d.name_en] || 0) + 1;
}

console.log('Arabic duplicates after migration:');
Object.entries(arCounts).filter(([,v]) => v > 1).forEach(([k,v]) => console.log('  ', k, 'x', v));

const enCounts2 = {};
for (const d of base) {
  const en = d.name_en === 'Salmon onigiri' ? 'Salmon onigiri (Base)' : d.name_en;
  enCounts[d.name_en] = (enCounts[en] || 0) + 1;
}
for (const d of exp) {
  enCounts[d.name_en] = (enCounts[d.name_en] || 0) + 1;
}
for (const n of Object.keys(enCounts)) {
  if (enCounts[n] > 1) console.log('  English:', n, 'x', enCounts[n]);
}