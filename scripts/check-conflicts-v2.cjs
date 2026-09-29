const fs = require('fs');
const base = JSON.parse(fs.readFileSync('japanese-200-proposal.json', 'utf8')).dishes;
const baseEn = new Set(base.map(d => d.name_en));
const baseAr = new Set(base.map(d => d.name_ar));

const parts = ['part1','part2','part3','part4','part5','part6'];
for (const p of ['part1','part2','part3','part4','part5','part6']) {
  const content = fs.readFileSync('japanese-data/' + p + '.mjs', 'utf8');
  const regex = /R\(`([^`]+) \$\{T\}`,\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const nameAr = match[1];
    const nameEn = match[2];
    if (baseEn.has(nameEn) || baseAr.has(nameAr)) {
      console.log('Conflict in ' + p + ': ' + nameEn + ' | ' + nameAr);
    }
  }
}