const fs = require('fs');
const base = JSON.parse(fs.readFileSync('scripts/japanese-200-proposal.json', 'utf8')).dishes;
const exp = JSON.parse(fs.readFileSync('scripts/japanese-300-proposal.json', 'utf8')).dishes;

const baseEn = new Set(base.map(d => d.name_en));
const baseAr = new Set(base.map(d => d.name_ar));

const fixedExp = exp.map(d => {
  let newNameEn = d.name_en;
  let newNameAr = d.name_ar;
  if (baseEn.has(d.name_en)) newNameEn = 'Regional ' + d.name_en;
  if (baseAr.has(d.name_ar)) newNameAr = 'Regional ' + d.name_ar;
  return { ...d, name_en: newNameEn, name_ar: newNameAr };
});

for (const d of fixedExp) {
  if (baseEn.has(d.name_en)) console.log('EN conflict:', d.name_en);
  if (baseAr.has(d.name_ar)) console.log('AR conflict:', d.name_ar);
}

console.log('Fixed expansion saved');

const prop = JSON.parse(fs.readFileSync('scripts/japanese-300-proposal.json', 'utf8'));
prop.dishes = fixedExp;
fs.writeFileSync('scripts/japanese-300-proposal-fixed.json', JSON.stringify(prop, null, 2));
console.log('Saved fixed proposal');