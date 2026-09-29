const fs = require('fs');
const base = JSON.parse(fs.readFileSync('japanese-200-proposal.json', 'utf8')).dishes;
const baseEn = new Set(base.map(d => d.name_en));
const baseAr = new Set(base.map(d => d.name_ar));

const parts = ['part1','part2','part3','part4','part5','part6'];

for (const p of ['part1','part2','part3','part4','part5','part6']) {
  let content = fs.readFileSync('japanese-data/' + p + '.mjs', 'utf8');
  const regex = /R\(`([^`]+) \$\{T\}`,\s*'([^']+)'/g;
  const matches = [];
  let match;
  while ((match = /R\(`([^`]+) \$\{T\}`,\s*'([^']+)'/g.exec(content)) !== null) {
    matches.push({nameAr: match[1], nameEn: match[2], index: match.index, full: match[0]});
  }
  
  let modified = false;
  // Process matches in reverse order to avoid index shifting
  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    const nameAr = m.nameAr;
    const nameEn = m.nameEn;
    if (baseEn.has(m.nameEn) || baseAr.has(m.nameAr)) {
      const newNameEn = 'Aromatic ' + nameEn;
      const newCall = m.full.replace("'" + nameEn + "'", "'Aromatic " + nameEn + "'");
      content = content.slice(0, m.index) + m.full.replace("'" + nameEn + "'", "'Aromatic " + nameEn + "'") + content.slice(m.index + m.full.length);
      console.log('Fixed: ' + nameEn + ' -> Aromatic ' + nameEn + ' (japanese-data/' + partFile + ')');
    }
  }
  
  if (matches.some(m => baseEn.has(m.nameEn) || baseAr.has(m.nameAr))) {
    fs.writeFileSync('japanese-data/' + p + '.mjs', content);
    console.log('Updated ' + p);
  }
}