const fs = require('fs');
const base = JSON.parse(fs.readFileSync('japanese-200-proposal.json', 'utf8')).dishes;
const baseEn = new Set(base.map(d => d.name_en));
const baseAr = new Set(base.map(d => d.name_ar));

const partFiles = ['part1','part2','part3','part4','part5','part6'];

for (const p of ['part1','part2','part3','part4','part5','part6']) {
  const filePath = 'japanese-data/' + p + '.mjs';
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Match R(`Arabic ${T}`, 'English', ...)
  const regex = /R\(`([^`]+) \$\{T\}`,\s*'([^']+)'/g;
  let match;
  let modified = false;
  
  // We need to replace in the content string, so we collect all matches first
  const matches = [];
  let match;
  const regex = /R\(`([^`]+) \$\{T\}`,\s*'([^']+)'/g;
  while ((match = regex.exec(content)) !== null) {
    const nameAr = match[1];
    const nameEn = match[2];
    if (baseEn.has(nameEn) || baseAr.has(nameAr)) {
      // Conflict found
      const newNameEn = 'Aromatic ' + nameEn;
      const oldCall = match[0];
      // Find the exact position in the content
      const start = match.index;
      const end = match.index + match[0].length;
      content = content.slice(0, start) + 
                match[0].replace("'" + nameEn + "'", "'Aromatic " + nameEn + "'") +
                content.slice(end);
      modified = true;
      console.log('Fixed: ' + match[2] + ' -> Aromatic ' + match[2] + ' (' + partFile + ')');
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + partFile);
  }
}