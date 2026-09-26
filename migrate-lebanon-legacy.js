// Migrates the 100 existing Lebanese dishes (src/data/lebanese-full-100-USDA.json) to Supabase.
// Source rows have only name_ar/name_en -> full FR/ES/DE translations are provided inline
// (index-aligned) to satisfy the 5-language non-empty integrity rule.
//
// Region: pan_lebanese (golden rule). Meal types mapped from the row's mealType bucket.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['levant-migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (levant-migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const rows = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src/data/lebanese-full-100-USDA.json'), 'utf8'),
);

// [fr, es, de] index-aligned with the JSON array (100 entries).
const T = [
  ['Manakish zaatar libanèse allégée 1', 'Manakish zaatar libanés ligera 1', 'Libanesisches Zaatar-Manakish leicht 1'],
  ['Manakish jebneh fromage libanais allégé 1', 'Manakish de queso libanés ligero 1', 'Libanesisches Käse-Manakish leicht 1'],
  ['Fatteh houmous libanais allégé', 'Fatteh de hummus libanés ligero', 'Libanesisches Hummus-Fatteh leicht'],
  ['Foul moudammas libanais allégé', 'Ful medames libanés ligero', 'Libanesisches Ful-Mudammas leicht'],
  ['Labneh zaatar libanais 40g', 'Labneh zaatar libanés 40g', 'Libanesisches Labneh mit Zaatar 40g'],
  ['Biscuits kaak bi haleeb lait légers 1', 'Galletas de leche kaak ligeras libanesas 1', 'Libanesische Milch-Kaak leicht 1'],
  ['Café blanc libanais', 'Café blanco libanés', 'Libanesisches weißer Kaffee'],
  ['Jallab libanais allégé 200ml', 'Jallab libanés ligero 200ml', 'Libanesisches Jallab leicht 200ml'],
  ['Kibbeh nayeh cru libanais léger 80g', 'Kibbeh nayeh crudo libanés ligero 80g', 'Libanesisches rohes Kibbeh leicht 80g'],
  ['Kibbeh maklieh frit libanais léger 1', 'Kibbeh frito libanés ligero 1', 'Libanesisches gebratenes Kibbeh leicht 1'],
  ['Kibbeh sanieh au four libanais léger', 'Kibbeh al horno libanés ligero', 'Libanesisches Ofen-Kibbeh leicht'],
  ['Kibbeh labnieh au yaourt libanais léger', 'Kibbeh con yogur libanés ligero', 'Libanesisches Joghurt-Kibbeh leicht'],
  ['Brochettes shish taouk libanaises légères', 'Pinchos shish taouk libaneses ligeros', 'Libanesisches Shish-Taouk-Spieß leicht'],
  ['Brochettes shish kebab libanaises légères', 'Pinchos shish kebab libaneses ligeros', 'Libanesisches Shish-Kebab-Spieß leicht'],
  ['Kofta kebab libanaise légère', 'Kofta kebab libanesa ligera', 'Libanesisches Kofta-Kebab leicht'],
  ['Samke harra poisson épicé libanais léger', 'Pescado picante libanés ligero samke harra', 'Libanesisches scharfes Fischgericht leicht'],
  ['Mloukhieh poulet jute libanaise légère', 'Mlukhiye de pollo libanesa ligera', 'Libanesisches Hühnchen-Mlukhiye leicht'],
  ['Mujaddara lentilles riz libanaise légère', 'Mujaddara lentejas y arroz libanesa ligera', 'Libanesisches Linsen-Reis-Mujaddara leicht'],
  ['Riz au lait libanais léger 80g', 'Arroz con leche libanés ligero 80g', 'Libanesisches Milchreis leicht 80g'],
  ['Freekeh à la viande libanais léger', 'Freekeh con carne libanés ligero', 'Libanesisches Freekeh mit Fleisch leicht'],
  ['Kebbeh b laban au yaourt libanais léger', 'Kibbeh en yogur libanés ligero', 'Libanesisches Kibbeh in Joghurtsauce leicht'],
  ['Shawarma poulet libanais léger', 'Shawarma de pollo libanés ligero', 'Libanesisches Hühnchen-Shawarma leicht'],
  ['Shawarma viande libanais léger', 'Shawarma de carne libanés ligero', 'Libanesisches Fleisch-Shawarma leicht'],
  ['Falafel libanais léger 3', 'Falafel libanés ligero 3', 'Libanesisches Falafel leicht 3'],
  ['Houmous libanais 60g', 'Hummus libanés 60g', 'Libanesisches Hummus 60g'],
  ['Moutabal aubergine libanais 60g', 'Mutabal de berenjena libanés 60g', 'Libanesisches Auberginen-Mutabal 60g'],
  ['Baba ghanouj libanais 60g', 'Baba ghanoush libanés 60g', 'Libanesisches Baba-Ghanoush 60g'],
  ['Taboulé libanais léger', 'Tabule libanés ligero', 'Libanesisches Taboulé leicht'],
  ['Fatouche libanais léger', 'Fattush libanés ligero', 'Libanesisches Fattoush leicht'],
  ['Salade de roquette libanaise', 'Ensalada de rúcula libanesa', 'Libanesischer Rucola-Salat'],
  ['Labneh libanais 40g', 'Labneh libanés 40g', 'Libanesisches Labneh 40g'],
  ['Halloum grillé libanais léger 30g', 'Halloum a la plancha libanés ligero 30g', 'Libanesisches gegrilltes Halloumi leicht 30g'],
  ['Fromage akkawi libanais 30g', 'Queso akkawi libanés 30g', 'Libanesischer Akkawi-Käse 30g'],
  ['Shanklish fromage épicé libanais 30g', 'Queso especiado shanklish libanés 30g', 'Libanesischer gewürzter Schanklisch 30g'],
  ['Feuilles de vigne libanaises légères 3', 'Hojas de parra libanesas ligeras 3', 'Libanesisches gefülltes Weinblatt leicht 3'],
  ['Courgettes farcies libanaises légères', 'Calabacines rellenos libaneses ligeros', 'Libanesisches gefüllte Zucchini leicht'],
  ['Pommes de terre épicées libanaises légères', 'Patatas picantes libanesas ligeras', 'Libanesisches scharfes Kartoffelgericht leicht'],
  ['Haricots verts à l’huile libanais légers', 'Judías verdes al aceite libanesas ligeras', 'Libanesisches grüne Bohnen in Öl leicht'],
  ['Chicorée à l’huile libanaise légère', 'Achicoria al aceite libanesa ligera', 'Libanesisches Chicorée in Öl leicht'],
  ['Haricots à l’huile libanais légers', 'Judías al aceite libanesas ligeras', 'Libanesisches Bohnen in Öl leicht'],
  ['Okra à l’huile libanaise légère', 'Okra al aceite libanesa ligera', 'Libanesisches Okra in Öl leicht'],
  ['Soupe de lentilles libanaise légère', 'Sopa de lentejas libanesa ligera', 'Libanesische Linsensuppe leicht'],
  ['Yaourt au concombre libanais léger', 'Yogur con pepino libanés ligero', 'Libanesisches Joghurt mit Gurke leicht'],
  ['Soupe de poulet libanaise légère', 'Sopa de pollo libanesa ligera', 'Libanesische Hühnersuppe leicht'],
  ['Œufs durs libanais', 'Huevos duros libaneses', 'Libanesisches gekochte Eier'],
  ['Yaourt libanais', 'Yogur libanés', 'Libanesisches Joghurt'],
  ['Thon à l’eau libanais', 'Atún al agua libanés', 'Libanesisches Thunfisch in Wasser'],
  ['Pomme libanaise', 'Manzana libanesa', 'Libanesischer Apfel'],
  ['Figue libanaise', 'Higo libanés', 'Libanesische Feige'],
  ['Raisin libanais', 'Uva libanesa', 'Libanesische Weintraube'],
  ['Pastèque libanaise', 'Sandía libanesa', 'Libanesische Wassermelone'],
  ['Abricot libanais', 'Albaricoque libanés', 'Libanesische Aprikose'],
  ['Baklava libanaise légère 30g', 'Baklava libanesa ligera 30g', 'Libanesisches Baklava leicht 30g'],
  ['Maamoul aux dattes libanais léger 30g', 'Maamoul de dátiles libanés ligero 30g', 'Libanesisches Dattel-Maamoul leicht 30g'],
  ['Sfiha baalbakie viande libanaise légère 1', 'Sfiha de carne libanesa ligera 1', 'Libanesisches Sfiha leicht 1'],
  ['Lahme bi ajine libanais léger 1', 'Lahm bi ajin libanés ligero 1', 'Libanesisches Fleischgebäck leicht 1'],
  ['Fatayer épinards libanais léger 1', 'Fatayer de espinacas libanés ligero 1', 'Libanesisches Spinat-Fatayer leicht 1'],
  ['Sambousik viande libanais léger 1', 'Sambusik de carne libanés ligero 1', 'Libanesisches Fleisch-Sambusik leicht 1'],
  ['Kawarma viande confite libanais 30g', 'Carne confitada kawarma libanesa 30g', 'Libanesisches eingelegtes Fleisch 30g'],
  ['Makanek saucisses libanaises légères 40g', 'Salchichas makanek libanesas ligeras 40g', 'Libanesisches Makanek leicht 40g'],
  ['Soujouk saucisse libanaise légère 30g', 'Soujouk salchicha libanés ligero 30g', 'Libanesisches Soujouq leicht 30g'],
  ['Shawarma falafel libanais léger', 'Shawarma de falafel libanés ligero', 'Libanesisches Falafel-Shawarma leicht'],
  ['Chou-fleur frit libanais léger', 'Coliflor frita libanesa ligera', 'Libanesisches gebratener Blumenkohl leicht'],
  ['Moussaka aubergine libanaise légère', 'Moussaka de berenjena libanesa ligera', 'Libanesisches Auberginen-Moussaka leicht'],
  ['Haricots et riz libanais légers', 'Judías con arroz libanesas ligeras', 'Libanesisches Bohnen mit Reis leicht'],
  ['Petits pois et riz libanais légers', 'Guisantes con arroz libaneses ligeros', 'Libanesisches Erbsen mit Reis leicht'],
  ['Mloukhieh et riz libanais légers', 'Mlukhiye con arroz libanesa ligera', 'Libanesisches Mlukhiye mit Reis leicht'],
  ['Kebbab halabi libanais léger', 'Kebab aleppino libanés ligero', 'Libanesisches Aleppo-Kebab leicht'],
  ['Kebab khashkhash libanais léger', 'Kebab khashkhash libanés ligero', 'Libanesisches scharfes Kebab leicht'],
  ['Sayadieh poisson riz libanais léger', 'Sayadiye de pescado libanés ligero', 'Libanesisches Fisch-Sayadieh leicht'],
  ['Ailes de poulet libanaises légères', 'Alitas de pollo libanesas ligeras', 'Libanesisches Hähnchenflügel leicht'],
  ['Kibbeh arménien libanais léger', 'Kibbeh armenio libanés ligero', 'Libanesisches armenisches Kibbeh leicht'],
  ['Kibbeh krouniyeh frit libanais léger 1', 'Kibbeh frito libanés ligero 1', 'Libanesisches gebratenes Kibbeh leicht 1'],
  ['Kibbeh arménien libanais léger 2', 'Kibbeh armenio libanés ligero 2', 'Libanesisches armenisches Kibbeh leicht 2'],
  ['Kibbeh b saynieh libanais léger', 'Kibbeh al horno en bandeja libanés ligero', 'Libanesisches Ofen-Kibbeh in Form leicht'],
  ['Kebab khashkhash libanais léger 2', 'Kebab khashkhash libanés ligero 2', 'Libanesisches scharfes Kebab leicht 2'],
  ['Haricots à l’huile libanais légers 2', 'Judías al aceite libanesas ligeras 2', 'Libanesisches Bohnen in Öl leicht 2'],
  ['Okra à l’huile libanaise légère 2', 'Okra al aceite libanesa ligera 2', 'Libanesisches Okra in Öl leicht 2'],
  ['Grenade libanaise', 'Granada libanesa', 'Libanesischer Granatapfel'],
  ['Abricot libanais 2', 'Albaricoque libanés 2', 'Libanesische Aprikose 2'],
  ['Olives libanaises 30g', 'Aceitunas libanesas 30g', 'Libanesische Oliven 30g'],
  ['Pickles libanais 40g', 'Encurtidos libaneses 40g', 'Libanesische Gurken 40g'],
  ['Yaourt au concombre libanais léger 2', 'Yogur con pepino libanés ligero 2', 'Libanesisches Joghurt mit Gurke leicht 2'],
  ['Salade de tomates libanaise', 'Ensalada de tomate libanesa', 'Libanesischer Tomatensalat'],
  ['Haricots et riz libanais légers 2', 'Judías con arroz libanesas ligeras 2', 'Libanesisches Bohnen mit Reis leicht 2'],
  ['Maamoul pistache libanais léger 30g', 'Maamoul de pistacho libanés ligero 30g', 'Libanesisches Pistazien-Maamoul leicht 30g'],
  ['Ghraybeh sablé libanais léger 20g', 'Galleta ghraybeh libanesa ligera 20g', 'Libanesisches Ghuraiba leicht 20g'],
  ['Meghli riz cannelle libanais léger 80g', 'Meghli arroz canela libanés ligero 80g', 'Libanesisches Zimt-Meghli leicht 80g'],
  ['Muhallabieh pudding libanais léger 80g', 'Muhalabiya pudín libanés ligero 80g', 'Libanesisches Muhallabieh leicht 80g'],
  ['Riz au lait libanais léger 80g', 'Arroz con leche libanés ligero 80g', 'Libanesisches Milchreis leicht 80g'],
  ['Atayef asafiri libanais léger 1', 'Atayef libanés ligero 1', 'Libanesisches Atayef leicht 1'],
  ['Qatayef noix libanais léger 1', 'Qatayef de nuez libanés ligero 1', 'Libanesisches Walnuss-Qatayef leicht 1'],
  ['Kanafeh libanaise légère 60g', 'Canafe libanesa ligera 60g', 'Libanesisches Kanafeh leicht 60g'],
  ['Halawet el jibn libanaise légère 50g', 'Halawet el jibn libanesa ligera 50g', 'Libanesisches Käse-Süß leicht 50g'],
  ['Sfouf gâteau curcuma libanais léger 40g', 'Sfouf de cúrcuma libanés ligero 40g', 'Libanesisches Kurkuma-Sfouf leicht 40g'],
  ['Nammoura semoule libanaise légère 40g', 'Nammoura de sémola libanesa ligera 40g', 'Libanesisches Grieß-Nammura leicht 40g'],
  ['Knafeh nabulsi libanaise légère 60g', 'Canafe nabulsi libanesa ligera 60g', 'Libanesisches Nablus-Kanafeh leicht 60g'],
  ['Café arabe libanais', 'Café árabe libanés', 'Libanesischer arabischer Kaffee'],
  ['Ailes de poulet libanaises légères 2', 'Alitas de pollo libanesas ligeras 2', 'Libanesisches Hähnchenflügel leicht 2'],
  ['Daoud bacha kefta libanais léger', 'Daoud basha libanés ligero', 'Libanesisches Daoud-Pascha-Kofta leicht'],
];

if (T.length !== rows.length) {
  console.error(`Translation map length ${T.length} != rows ${rows.length}`);
  process.exit(1);
}

const MEAL = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', side: 'lunch', salad: 'snacks', fruit: 'snacks' };

let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];
const badCal = [];
const badLangs = [];

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  const nameAr = r.name_ar.trim();
  const g = Number(r.grams);
  const kcal = Number(r.kcal);
  if (!Number.isFinite(g) || !g) { failed++; console.error(`Failed ${i + 1} bad grams`); continue; }
  const cal100 = Math.round((kcal / g) * 100);
  if (!(cal100 >= 20 && cal100 <= 900)) badCal.push(`${nameAr} (${cal100})`);
  const nameEn = r.name_en?.trim() ?? '';
  const [fr, es, de] = T[i];
  if (![nameAr, nameEn, fr, es, de].every((v) => typeof v === 'string' && v.trim().length > 0)) badLangs.push(nameAr);
  const p100 = r.protein != null ? Math.round((Number(r.protein) / g) * 100 * 10) / 10 : null;
  const c100 = r.carbs != null ? Math.round((Number(r.carbs) / g) * 100 * 10) / 10 : null;
  const f100 = r.fat != null ? Math.round((Number(r.fat) / g) * 100 * 10) / 10 : null;

  try {
    const { data: existing } = await supabase.from('dishes').select('id').eq('name_ar', nameAr).maybeSingle();
    if (existing) { skipped++; skippedNames.push(nameAr); console.log(`Skip ${i + 1}/100 "${nameAr}" (id=${existing.id})`); continue; }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr, name_en: nameEn, name_fr: fr, name_es: es, name_de: de,
      meal_type: MEAL[r.mealType] ?? 'lunch',
      cal_100: cal100, protein: p100, carbs: c100, fat: f100,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: g, base_cal_serv: kcal, serving_unit: null, serving_description: null,
      healthy: null, is_fried: null, is_sweet: null,
      source: 'المطبخ اللبناني التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_lebanese', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/100 "${nameAr}" (meal=${MEAL[r.mealType] ?? 'lunch'}, cal=${cal100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/100 ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== LEBANON LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (badCal.length) console.warn('Out-of-range cal_100:', badCal.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;