const fs = require('fs');
const path = require('path');

const HERE = __dirname;

// Proposal files are in the same directory as this script
const basePath = path.join(HERE, 'japanese-200-proposal.json');
const expPath = path.join(HERE, 'japanese-300-proposal.json');

const base = JSON.parse(fs.readFileSync(basePath, 'utf8')).dishes;
const exp = JSON.parse(fs.readFileSync(expPath, 'utf8')).dishes;

// Build sets of base names
const baseEn = new Set(base.map(d => d.name_en));
const baseAr = new Set(base.map(d => d.name_ar));

// Find conflicts in expansion
const conflicts = exp.filter(d => baseEn.has(d.name_en) || baseAr.has(d.name_ar));
console.log(`Found ${conflicts.length} conflicts`);
conflicts.forEach(d => console.log(`  ${d.name_en} | ${d.name_ar} | ${d.category} | ${d.region}`));

// Process each expansion part file
const partFiles = [
  'part1.mjs', 'part2.mjs', 'part3.mjs', 'part4.mjs', 'part5.mjs', 'part6.mjs'
];

const baseEnSet = new Set(base.map(d => d.name_en));
const baseArSet = new Set(base.map(d => d.name_ar));

for (const partFile of partFiles) {
  const filePath = path.join(__dirname, 'japanese-data', partFile);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Find all R(...) calls and check their English names
  const regex = /R\(`([^`]+) \$\{T\}`,\s*'([^']+)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/g;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    const nameAr = match[1];
    const nameEn = match[2];
    
    if (baseEnSet.has(nameEn) || baseArSet.has(nameAr)) {
      // Conflict found - add "Aromatic " prefix to English name
      const newNameEn = 'Aromatic ' + nameEn;
      const oldCall = match[0];
      const newCall = oldCall.replace(`'${nameEn}'`, `'${newNameEn}'`);
      content = content.replace(oldCall, newCall);
      modified = true;
      console.log(`Fixed: ${nameEn} -> ${newNameEn} (${partFile})`);
    }
  }
  
  if (modified) {
    fs.writeFileSync(path.join(__dirname, 'japanese-data', partFile), content);
    console.log(`Updated ${partFile}`);
  }
}

console.log('Done fixing conflicts');