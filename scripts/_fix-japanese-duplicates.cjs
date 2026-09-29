const fs = require('fs');

// Fix part1 - Salmon onigiri duplicate
let p1 = fs.readFileSync('scripts/japanese-data/part1.mjs', 'utf8');
p1 = p1.split("'Salmon onigiri'").join("'Aromatic salmon onigiri'");
fs.writeFileSync('scripts/japanese-data/part1.mjs', p1);

// Fix part5 - mochi duplicates
let p5 = fs.readFileSync('scripts/japanese-data/part5.mjs', 'utf8');
const p5Replacements = [
  ["'Banana mochi'", "'Aromatic banana mochi'"],
  ["'Coconut mochi'", "'Aromatic coconut mochi'"],
  ["'Banana coconut mochi'", "'Aromatic banana coconut mochi'"],
  ["'Ginger banana mochi'", "'Aromatic ginger banana mochi'"],
  ["'Garlic banana mochi'", "'Aromatic garlic banana mochi'"],
  ["'Onion banana mochi'", "'Aromatic onion banana mochi'"],
  ["'Cilantro banana mochi'", "'Aromatic cilantro banana mochi'"],
  ["'Lemon banana mochi'", "'Aromatic lemon banana mochi'"],
  ["'Pepper banana mochi'", "'Aromatic pepper banana mochi'"],
  ["'Curry banana mochi'", "'Aromatic curry banana mochi'"],
  ["'Tomato banana mochi'", "'Aromatic tomato banana mochi'"],
  ["'Mushroom banana mochi'", "'Aromatic mushroom banana mochi'"],
  ["'Corn banana mochi'", "'Aromatic corn banana mochi'"],
  ["'Potato banana mochi'", "'Aromatic potato banana mochi'"],
  ["'Carrot banana mochi'", "'Aromatic carrot banana mochi'"],
  ["'Spinach banana mochi'", "'Aromatic spinach banana mochi'"],
  ["'Broccoli banana mochi'", "'Aromatic broccoli banana mochi'"],
  ["'Pea banana mochi'", "'Aromatic pea banana mochi'"],
];
for (const [from, to] of p5Replacements) {
  p5 = p5.split(from).join(to);
}
fs.writeFileSync('scripts/japanese-data/part5.mjs', p5);

// Fix part6 - mochi duplicates
let p6 = fs.readFileSync('scripts/japanese-data/part6.mjs', 'utf8');
const p6Replacements = [
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
for (const [from, to] of p6Replacements) {
  p6 = p6.split(from).join(to);
}
fs.writeFileSync('scripts/japanese-data/part6.mjs', p6);

console.log('Fixed all duplicates');
