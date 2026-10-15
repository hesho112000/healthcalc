import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const COUNTRIES = {
  norway: { label: 'Norway', prefix: 'no', exportName: 'NORWAY_FULL' },
  sweden: { label: 'Sweden', prefix: 'se', exportName: 'SWEDEN_FULL' },
  denmark: { label: 'Denmark', prefix: 'dk', exportName: 'DENMARK_FULL' },
  finland: { label: 'Finland', prefix: 'fi', exportName: 'FINLAND_FULL' },
};
const NAME_FIELDS = ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'];
const INTERFACE = 'export interface KitchenDish { id: string; nameAr: string; nameEn: string; nameFr: string; nameEs: string; nameDe: string; category: string; mealType: string; grams: number; kcal: number; protein: number; carbs: number; fat: number; cooking?: string; region?: string; diaspora_priority?: string[]; }';
const NAME_OVERRIDES = {
  'dk-044': {
    nameAr: 'بلح البحر بالأعشاب دنماركي',
    nameEn: 'Danish Mussels with Herbs',
    nameFr: 'Cuisine danoise : Moules aux herbes',
    nameEs: 'Cocina danesa: Mejillones con hierbas',
    nameDe: 'Dänische Küche: Miesmuscheln mit Kräutern',
  },
  'dk-045': {
    nameAr: 'شوربة الكركند بالكريمة دنماركي',
    nameEn: 'Danish Lobster Bisque with Cream',
    nameFr: 'Cuisine danoise : Bisque de homard à la crème',
    nameEs: 'Cocina danesa: Bisque de langosta con crema',
    nameDe: 'Dänische Küche: Hummerbisque mit Sahne',
  },
  'dk-097': {
    nameAr: 'بلح البحر بالطماطم دنماركي',
    nameEn: 'Danish Mussels in Tomato Sauce',
    nameFr: 'Cuisine danoise : Moules à la tomate',
    nameEs: 'Cocina danesa: Mejillones en salsa de tomate',
    nameDe: 'Dänische Küche: Miesmuscheln in Tomatensoße',
  },
  'dk-124': {
    nameAr: 'أولبرود بلبن والعسل دنماركي',
    nameEn: 'Danish Øllebrød Rye Porridge with Milk and Honey',
    nameFr: 'Cuisine danoise : Øllebrød au lait et au miel',
    nameEs: 'Cocina danesa: Øllebrød con leche y miel',
    nameDe: 'Dänische Küche: Øllebrød mit Milch und Honig',
  },
  'no-030': {
    nameAr: 'باكالاو بالطماطم نرويجي',
    nameEn: 'Norwegian Bacalao Tomato Cod Stew',
    nameFr: 'Cuisine norvégienne : Bacalao à la tomate',
    nameEs: 'Cocina noruega: Bacalao con tomate',
    nameDe: 'Norwegische Küche: Bacalao mit Tomaten',
  },
  'no-201': {
    nameAr: 'بلح البحر بالأعشاب نرويجي',
    nameEn: 'Norwegian Mussels Steamed with Herbs',
    nameFr: 'Cuisine norvégienne : Moules aux herbes',
    nameEs: 'Cocina noruega: Mejillones al vapor con hierbas',
    nameDe: 'Norwegische Küche: Miesmuscheln mit Kräutern',
  },
  'no-202': {
    nameAr: 'شوربة المأكولات البحرية نرويجي',
    nameEn: 'Norwegian Seafood Chowder',
    nameFr: 'Cuisine norvégienne : Chowder de fruits de mer',
    nameEs: 'Cocina noruega: Chowder de marisco',
    nameDe: 'Norwegische Küche: Meeresfrüchte-Chowder',
  },
  'se-029': {
    nameAr: 'ستيومانس بيف بالبطاطس حلال سويدي',
    nameEn: 'Swedish Sjömansbiff Halal Beef and Potato Bake',
    nameFr: 'Cuisine suédoise : Sjömansbiff au bœuf halal',
    nameEs: 'Cocina sueca: Sjömansbiff con ternera halal',
    nameDe: 'Schwedische Küche: Sjömansbiff, Halal-Rind-Kartoffelauflauf',
  },
  'se-041': {
    nameAr: 'يخنة السمك بالزعفران سويدي',
    nameEn: 'Swedish Saffron Fish Stew',
    nameFr: 'Cuisine suédoise : Mijoté de poisson au safran',
    nameEs: 'Cocina sueca: Guiso de pescado con azafrán',
    nameDe: 'Schwedische Küche: Safran-Fischeintopf',
  },
};

function applyNameOverrides(rows) {
  for (const row of rows) {
    if (NAME_OVERRIDES[row.id]) Object.assign(row, NAME_OVERRIDES[row.id]);
  }
}

function compareParts(left, right) {
  return left.localeCompare(right, undefined, { numeric: true });
}

async function loadRows(country, directory) {
  const folder = resolve(ROOT, 'scripts', directory);
  if (!existsSync(folder)) throw new Error(`Missing source directory ${folder}`);
  const parts = readdirSync(folder)
    .filter((file) => /^part\d+-\d+\.mjs$/.test(file))
    .sort(compareParts);
  if (!parts.length) throw new Error(`No part modules in ${folder}`);

  const rows = [];
  for (const part of parts) {
    const file = resolve(folder, part);
    const exported = (await import(pathToFileURL(file).href)).default;
    if (!Array.isArray(exported)) throw new Error(`Expected rows array in ${file}`);
    rows.push(...exported);
  }
  return rows;
}

async function buildCountry(countryId) {
  const country = COUNTRIES[countryId];
  if (!country) throw new Error(`Unknown Nordic kitchen: ${countryId}`);
  const base = await loadRows(countryId, `${countryId}-base-data`);
  const expansion = await loadRows(countryId, `${countryId}-data`);
  if (base.length !== 175 || expansion.length !== 175) {
    throw new Error(`${country.label} expects 175 base + 175 expansion rows; got ${base.length} + ${expansion.length}`);
  }

  const rows = [...base, ...expansion].map((row, index) => {
    for (const field of NAME_FIELDS) {
      if (typeof row[field] !== 'string' || !row[field].trim()) {
        throw new Error(`${country.label} row ${index + 1} is missing ${field}`);
      }
    }
    return { ...row, id: `${country.prefix}-${String(index + 1).padStart(3, '0')}` };
  });
  applyNameOverrides(rows);
  if (rows.length !== 350) throw new Error(`${country.label} expects 350 merged rows; got ${rows.length}`);

  const output = resolve(ROOT, 'src', 'data', `${countryId}-full.ts`);
  const source = [
    `// AUTO-GENERATED by scripts/build-nordic-full.js from ${countryId}-base-data + ${countryId}-data. Do not edit.`,
    `// ${country.label}: 175 base + 175 expansion rows, 100 g basis; Atwater + 5-language coverage checked.`,
    INTERFACE,
    `export const ${country.exportName}: KitchenDish[] = ${JSON.stringify(rows, null, 2)};`,
    '',
  ].join('\n');
  writeFileSync(output, source, 'utf8');
  console.log(`${country.label}: ${base.length} base + ${expansion.length} expansion = ${rows.length} dishes`);
}

const requested = process.argv.slice(2);
const countries = requested.length ? requested : Object.keys(COUNTRIES);
for (const country of countries) await buildCountry(country);
