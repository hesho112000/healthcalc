const fs = require('fs');
const parts = ['part1','part2','part3','part4','part5','part6'];
for (const p of ['part1','part2','part3','part4','part5','part6']) {
  const content = fs.readFileSync('japanese-data/' + p + '.mjs', 'utf8');
  const regex = /R\(`[^`]+\$\{T\}`,\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(p + ': ' + match[1]);
  }
}