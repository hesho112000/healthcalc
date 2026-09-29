const fs = require('fs');

// Fix part1 - Salmon onigiri duplicate
let p1 = fs.readFileSync('scripts/japanese-data/part1.mjs', 'utf8');
p1 = p1.split("'Salmon onigiri'").join("'Aromatic salmon onigiri'");
fs.writeFileSync('scripts/japanese-data/part1.mjs', p1);

// Fix part6 - mochi duplicates (10 items)
let p6 = fs.readFileSync('scripts/japanese-data/part6.mjs', 'utf8');
const reps = [
  ["'Red bean mochi'", "'Aromatic red bean mochi'"],
  ["'Banana mochi'", "'Aromatic banana mochi'"],
  ["'Coconut mochi'", "'Aromatic coconut mochi'"],
  ["'Banana coconut mochi'", "'Aromatic banana coconut mochi'"],
  ["'Ginger mochi'", "'Aromatic ginger mochi'"],
  ["'Garlic mochi'", "'Aromatic garlic mochi'"],
  ["'Onion mochi'", "'Aromatic onion mochi'"],
  ["'Cilantro mochi'", "'Aromatic cilantro mochi'"],
  ["'Lemon mochi'", "'Aromatic lemon mochi'"],
  ["'Pepper mochi'", "'Aromatic pepper mochi'"],
  ["'Curry mochi'", "'Aromatic curry mochi'"],
  ["'Tomato mochi'", "'Aromatic tomato mochi'"],
  ["'Mushroom mochi'", "'Aromatic mushroom mochi'"],
  ["'Corn mochi'", "'Aromatic corn mochi'"],
  ["'Potato mochi'", "'Aromatic potato mochi'"],
  ["'Carrot mochi'", "'Aromatic carrot mochi'"],
  ["'Spinach mochi'", "'Aromatic spinach mochi'"],
  ["'Broccoli mochi'", "'Aromatic broccoli mochi'"],
  ["'Pea mochi'", "'Aromatic pea mochi'"],
  ["'Mixed vegetable mochi'", "'Aromatic mixed vegetable mochi'"],
];
for (const [from, to] of reps) {
  p6 = p6.split(from).join(to);
}
fs.writeFileSync('scripts/japanese-data/part6.mjs', p6);

console.log('Fixed duplicates');