const fs = require('fs');

const fixes = {
  'part1': {
    'Salmon onigiri': 'Aromatic salmon onigiri'
  },
  'part5': {
    'Onion mochi': 'Aromatic onion mochi',
    'Garlic mochi': 'Aromatic garlic mochi',
    'Ginger mochi': 'Aromatic ginger mochi',
    'Pepper mochi': 'Aromatic pepper mochi',
    'Curry mochi': 'Aromatic curry mochi',
    'Cilantro mochi': 'Aromatic cilantro mochi',
    'Lemon mochi': 'Aromatic lemon mochi',
    'Banana mochi': 'Aromatic banana mochi',
    'Coconut mochi': 'Aromatic coconut mochi'
  },
  'part6': {
    'Onion mochi': 'Aromatic onion mochi',
    'Garlic mochi': 'Aromatic garlic mochi',
    'Ginger mochi': 'Aromatic ginger mochi',
    'Pepper mochi': 'Aromatic pepper mochi',
    'Curry mochi': 'Aromatic curry mochi',
    'Cilantro mochi': 'Aromatic cilantro mochi',
    'Lemon mochi': 'Aromatic lemon mochi',
    'Banana mochi': 'Aromatic banana mochi',
    'Coconut mochi': 'Aromatic coconut mochi'
  }
};

const fs = require('fs');

for (const p of ['part1','part2','part3','part4','part5','part6']) {
  let content = fs.readFileSync('japanese-data/' + p + '.mjs', 'utf8');
  const fixes = fixes[p] || {};
  let modified = false;
  
  for (const [oldName, newName] of Object.entries(fixes)) {
    const oldPattern = "'" + oldName + "'";
    const newPattern = "'" + newName + "'";
    if (content.includes(oldPattern)) {
      content = content.split(oldPattern).join(newPattern);
      console.log('Fixed in ' + p + ': ' + oldName + ' -> ' + newName);
    }
  }
  
  fs.writeFileSync('japanese-data/' + p + '.mjs', content);
  console.log('Updated ' + p);
}

console.log('Done');