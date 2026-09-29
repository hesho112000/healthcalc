const fs = require('fs');
const parts = ['part1','part2','part3','part4','part5','part6'];
for (const p of ['part1','part2','part3','part4','part5','part6']) {
  const content = fs.readFileSync('japanese-data/' + p + '.mjs', 'utf8');
  // Find all R( calls
  const regex = /R\(`[^`]+\$\{T\}`/g;
  const matches = content.match(regex);
  if (matches) {
    console.log(p + ': ' + matches.length + ' items');
    for (const m of matches.slice(0, 5)) {
      console.log('  ' + m.substring(0, 80));
    }
  }
}