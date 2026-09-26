// Emits src/data/indonesian-full.ts (the registry adapter) from the approved
// indonesia-300-proposal.json. Mirrors the shape of pakistani-full.ts exactly.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const proposal = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'indonesia-300-proposal.json'), 'utf8'));
const dishes = proposal.dishes;

const MEAL_MAP = { snacks: 'snack' };

function slugify(nameEn, i) {
  const base = nameEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 36);
  return `id_${base}_${i}`;
}

const lines = dishes.map((d, i) => {
  const mealType = MEAL_MAP[d.mealType] ?? d.mealType;
  return JSON.stringify({
    id: slugify(d.name_en, i),
    nameAr: d.name_ar,
    nameEn: d.name_en,
    mealType,
    grams: 100,
    kcal: d.cal_100,
    protein: d.protein,
    carbs: d.carbs,
    fat: d.fat,
  });
});

const out = `// Single source of truth for Indonesian cuisine - generated from indonesia-300-proposal.json
// (300 dishes across the archipelago, halal profile, region and meal tagged).
export interface IndonesianFullDish {
  id: string;
  nameAr: string;
  nameEn: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'side' | 'salad' | 'fruit';
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const INDONESIAN_FULL: IndonesianFullDish[] = [
${lines.map((l) => `  ${l},`).join('\n')}
];
`;

const dest = path.join(ROOT, 'src', 'data', 'indonesian-full.ts');
fs.writeFileSync(dest, out);
console.log(`Wrote ${dest} (${dishes.length} dishes)`);