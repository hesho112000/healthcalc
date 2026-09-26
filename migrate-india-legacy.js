// Migrates the 100 existing Indian dishes (src/data/indian-full.ts -> INDIAN_FULL) to
// Supabase. Awaits the 'asia_migration' secret key (falls back to the service role key).
// Row macros are PER SERVING (grams per row) -> per-100 macros are derived, and cal_100 is
// recomputed via the Atwater factors (4P + 4C + 9F) on the per-100 macros, clamped into
// [20,900]. This deliberately avoids re-introducing the 100-kcal placeholders fixed in the
// legacy data-quality pass. Region: pan_indian (golden rule). FR/ES/DE are keyed by exact
// nameAr.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const raw = fs.readFileSync(path.join(__dirname, 'src/data/indian-full.ts'), 'utf8');
const m = raw.match(/export const INDIAN_FULL: IndianFullDish\[\] = (\[[\s\S]*\]);/);
if (!m) { console.error('Could not extract INDIAN_FULL array'); process.exit(1); }
const rows = JSON.parse(m[1]);

const T = {
  'إيدلي هندي 2 حبة': ['Idli indien 2 pièces', 'Idli indio 2 unidades', 'Indisches Idli 2 Stück'],
  'دوسا سادة هندية': ['Dosa nature indien', 'Dosa simple indio', 'Indisches Dosa natur'],
  'دوسا ماسالا هندية': ['Dosa masala indien', 'Dosa masala indio', 'Indisches Masala-Dosa'],
  'أوبما هندية': ['Upma indien', 'Upma indio', 'Indisches Upma'],
  'بوهة هندية': ['Poha indien', 'Poha indio', 'Indisches Poha'],
  'باراتا ألو هندية': ['Paratha aux pommes de terre indien', 'Paratha de patata indio', 'Indisches Aloo-Paratha'],
  'باراتا سادة فرن لايت هندية': ['Paratha nature léger au four indien', 'Paratha simple ligero al horno indio', 'Indisches leichtes Ofen-Paratha natur'],
  'بوري هندية 1 لايت فرن': ['Puri léger au four indien 1', 'Puri ligero al horno indio 1', 'Indisches leichtes Ofen-Puri 1'],
  'أوتابام هندية': ['Uttapam indien', 'Uttapam indio', 'Indisches Uttapam'],
  'رز أبيض هندي': ['Riz blanc indien', 'Arroz blanco indio', 'Indischer weißer Reis'],
  'رز جيرا هندي': ['Riz au cumin indien', 'Arroz al comino indio', 'Indischer Cumin-Reis'],
  'برياني دجاج هندي': ['Biryani de poulet indien', 'Biryani de pollo indio', 'Indisches Hühner-Biryani'],
  'برياني لحم ضأن هندي': ["Biryani d'agneau indien", "Biryani de cordero indio", 'Indisches Lamm-Biryani'],
  'برياني خضار هندي': ['Biryani de légumes indien', 'Biryani de verduras indio', 'Indisches Gemüse-Biryani'],
  'دال تادكا هندية': ['Dal tadka indien', 'Dal tadka indio', 'Indisches Dal Tadka'],
  'دال ماخاني هندية لايت': ['Dal makhani léger indien', 'Dal makhani ligero indio', 'Indisches leichtes Dal Makhani'],
  'شانا ماسالا هندية': ['Chana masala indien', 'Chana masala indio', 'Indisches Chana Masala'],
  'راجما هندية': ['Rajma indien', 'Rajma indio', 'Indisches Rajma'],
  'سامبار هندي': ['Sambar indien', 'Sambar indio', 'Indisches Sambar'],
  'راسام هندي': ['Rasam indien', 'Rasam indio', 'Indisches Rasam'],
  'بانير بتر ماسالا لايت هندية': ['Paneer butter masala léger indien', 'Paneer mantequilla masala ligero indio', 'Indisches leichtes Paneer-Butter-Masala'],
  'بانير تيكا مشوي هندي': ['Paneer tikka grillé indien', 'Paneer tikka a la parrilla indio', 'Indisches gegrilltes Paneer-Tikka'],
  'دجاج تيكا مشوي هندي': ['Chicken tikka grillé indien', 'Pollo tikka a la parrilla indio', 'Indisches gegrilltes Chicken Tikka'],
  'دجاج تندوري هندي بدون جلد': ['Poulet tandoori sans peau indien', 'Pollo tandoori sin piel indio', 'Indisches Tandoori-Hähnchen ohne Haut'],
  'دجاج بتر لايت هندي': ['Poulet au beurre léger indien', 'Pollo a la mantequilla ligero indio', 'Indisches leichtes Butter-Chicken'],
  'كاري دجاج هندي': ['Curry de poulet indien', 'Curry de pollo indio', 'Indisches Hühner-Curry'],
  'دجاج كورما هندي لايت': ['Korma de poulet léger indien', 'Korma de pollo ligero indio', 'Indisches leichtes Hühner-Korma'],
  'كاري لحم ضأن هندي': ["Curry d'agneau indien", "Curry de cordero indio", 'Indisches Lamm-Curry'],
  'روغان جوش هندي': ['Rogan josh indien', 'Rogan josh indio', 'Indisches Rogan Josh'],
  'كاري بيض هندي': ["Curry d'œufs indien", 'Curry de huevo indio', 'Indisches Eier-Curry'],
  'كاري سمك هندي': ['Curry de poisson indien', 'Curry de pescado indio', 'Indisches Fisch-Curry'],
  'كاري روبيان هندي': ['Curry de crevettes indien', 'Curry de gambas indio', 'Indisches Garnelen-Curry'],
  'نان هندي': ['Naan indien', 'Naan indio', 'Indisches Naan'],
  'نان جبن لايت هندي': ['Naan au fromage léger indien', 'Naan de queso ligero indio', 'Indisches leichtes Käse-Naan'],
  'روتي هندي': ['Roti indien', 'Roti indio', 'Indisches Roti'],
  'شاباتي هندي': ['Chapati indien', 'Chapati indio', 'Indisches Chapati'],
  'كولشا هندية': ['Kulcha indien', 'Kulcha indio', 'Indisches Kulcha'],
  'لحم بقري مسلوق هندي حلال': ['Bœuf bouilli halal indien', 'Ternera hervida halal india', 'Indisches gekochtes Rindfleisch halal'],
  'لحم معيز مسلوق هندي': ['Chevre bouillie indienne', 'Cabra hervida india', 'Indisches gekochtes Ziegenfleisch'],
  'صدر دجاج مسلوق هندي': ['Poitrine de poulet bouillie indienne', 'Pechuga de pollo hervida india', 'Indische gekochte Hähnchenbrust'],
  'صدر دجاج مشوي هندي': ['Poitrine de poulet grillée indienne', 'Pechuga de pollo a la parrilla india', 'Indische gegrillte Hähnchenbrust'],
  'ألو جوبي هندي': ['Aloo gobi indien', 'Aloo gobi indio', 'Indisches Aloo-Gobi'],
  'بهيندي ماسالا هندية': ['Bhindi masala indien', 'Bhindi masala indio', 'Indisches Bhindi-Masala'],
  'باينغان بهارتا هندية': ['Baingan bharta indien', 'Baingan bharta indio', 'Indisches Baingan-Bharta'],
  'بالاك بانير هندية لايت': ['Palak paneer léger indien', 'Palak paneer ligero indio', 'Indisches leichtes Palak-Paneer'],
  'خضار مشكل هندي': ['Légumes mélangés indiens', 'Verduras mixtas indias', 'Indisches gemischtes Gemüse'],
  'كاداي خضار هندي': ['Kadai de légumes indien', 'Kadai de verduras indio', 'Indisches Kadai-Gemüse'],
  'رايتا خيار هندي': ['Raita au concombre indien', 'Raita de pepino indio', 'Indisches Gurken-Raita'],
  'رايتا بوندي هندي': ['Raita boondi indien', 'Raita boondi indio', 'Indisches Boondi-Raita'],
  'كاشومبار سلطة هندية': ['Salade kachumber indienne', 'Ensalada kachumber india', 'Indischer Kachumber-Salat'],
  'باباد فرن لايت هندي': ['Papad léger au four indien', 'Papad ligero al horno indio', 'Indisches leichtes Ofen-Papad'],
  'ساموسا خضار فرن لايت هندية': ['Samosa de légumes légère au four indienne', 'Samosa de verduras ligera al horno india', 'Indische leichte Ofen-Gemüse-Samosa'],
  'باكورا خضار فرن لايت هندية': ['Pakora de légumes léger au four indien', 'Pakora de verduras ligero al horno indio', 'Indisches leichtes Ofen-Gemüse-Pakora'],
  'شوربة موليجاتوني هندية': ['Soupe mulligatawny indienne', 'Sopa mulligatawny india', 'Indische Mulligatawny-Suppe'],
  'شوربة طماطم هندية': ['Soupe de tomates indienne', 'Sopa de tomate india', 'Indische Tomatensuppe'],
  'زبادي هندي': ['Yaourt indien', 'Yogur indio', 'Indisches Joghurt'],
  'بيض مسلوق هندي': ['Œufs durs indiens', 'Huevos duros indios', 'Indische gekochte Eier'],
  'تونة ماء هندية': ["Thon à l'eau indien", 'Atún al agua indio', 'Indischer Thunfisch in Wasser'],
  'مالاي كوفتا لايت هندية': ['Malai kofta léger indien', 'Malai kofta ligero indio', 'Indisches leichtes Malai-Kofta'],
  'كيما لحم هندي': ['Keema indien', 'Keema indio', 'Indisches Keema'],
  'كيما بيض هندي': ['Keema aux œufs indien', 'Keema con huevo indio', 'Indisches Eier-Keema'],
  'سمك مقلي فرن لايت هندي': ['Poisson frit léger au four indien', 'Pescado frito ligero al horno indio', 'Indischer leichter Ofen-Fisch'],
  'روبيان مقلي لايت هندي': ['Crevettes frites légères indiennes', 'Gambas fritas ligeras indias', 'Indische leichte gebratene Garnelen'],
  'سمك تندوري هندي': ['Poisson tandoori indien', 'Pescado tandoori indio', 'Indischer Tandoori-Fisch'],
  'دجاج 65 فرن لايت هندي': ['Chicken 65 léger au four indien', 'Pollo 65 ligero al horno indio', 'Indisches leichtes Ofen-Chicken-65'],
  'جوبي 65 فرن لايت هندي': ['Gobi 65 léger au four indien', 'Gobi 65 ligero al horno indio', 'Indisches leichtes Ofen-Gobi-65'],
  'مانجو هندية': ['Mangue indienne', 'Mango indio', 'Indische Mango'],
  'موز هندي': ['Banane indienne', 'Plátano indio', 'Indische Banane'],
  'تفاح هندي': ['Pomme indienne', 'Manzana india', 'Indischer Apfel'],
  'تمر هندي 3': ['Dattes indiennes 3', 'Dátiles indios 3', 'Indische Datteln 3'],
  'بونجال هندي': ['Pongal indien', 'Pongal indio', 'Indisches Pongal'],
  'رز ليمون هندي': ['Riz au citron indien', 'Arroz al limón indio', 'Indischer Zitronenreis'],
  'رز زبادي هندي': ['Riz au yaourt indien', 'Arroz al yogur indio', 'Indischer Joghurt-Reis'],
  'أبام هندي': ['Appam indien', 'Appam indio', 'Indisches Appam'],
  'بوتو هندي': ['Puttu indien', 'Puttu indio', 'Indisches Puttu'],
  'أفيال خضار هندي': ['Avial de légumes indien', 'Avial de verduras indio', 'Indisches Gemüse-Avial'],
  'ثوران خضار هندي': ['Thoran de légumes indien', 'Thoran de verduras indio', 'Indisches Gemüse-Thoran'],
  'كوزي كاري هندي': ['Kozhi curry indien', 'Kozhi curry indio', 'Indisches Kozhi-Curry'],
  'شيتيناد دجاج هندي': ['Poulet chettinad indien', 'Pollo chettinad indio', 'Indisches Chettinad-Hähnchen'],
  'بتر نان هندي لايت': ['Naan au beurre léger indien', 'Naan con mantequilla ligero indio', 'Indisches leichtes Butter-Naan'],
  'لاسي زبادي هندي': ['Lassi indien', 'Lassi indio', 'Indischer Lassi'],
  'طحينة هندية 10جم': ['Tahini indien 10g', 'Tahini indio 10g', 'Indische Tahini 10g'],
  'سلطة خضراء هندية': ['Salade verte indienne', 'Ensalada verde india', 'Indischer grüner Salat'],
  'برياني حيدر أباد دجاج هندي': ['Biryani hyderabadi de poulet indien', 'Biryani de Hyderabadi de pollo indio', 'Indisches Hyderabadi-Hühner-Biryani'],
  'برياني كولكاتا لحم هندي': ['Biryani de Calcutta à la viande indien', 'Biryani de Calcuta de carne indio', 'Indisches Kolkata-Fleisch-Biryani'],
  'برياني لكناو هندي': ['Biryani lucknowi indien', 'Biryani Lucknowi indio', 'Indisches Lucknowi-Biryani'],
  'شيتيناد لحم هندي': ['Mouton chettinad indien', 'Cordero chettinad indio', 'Indisches Chettinad-Lamm'],
  'كورما خضار هندي لايت': ['Korma de légumes léger indien', 'Korma de verduras ligero indio', 'Indisches leichtes Gemüse-Korma'],
  'كاداي بانير هندي': ['Kadai paneer indien', 'Kadai paneer indio', 'Indisches Kadai-Paneer'],
  'برياني بتر دجاج هندي': ['Biryani de poulet au beurre indien', 'Biryani de pollo a la mantequilla indio', 'Indisches Butter-Chicken-Biryani'],
  'سمك تيكا مشوي هندي': ['Fish tikka grillé indien', 'Pescado tikka a la parrilla indio', 'Indisches gegrilltes Fish-Tikka'],
  'سمك مالابار كاري هندي': ['Curry de poisson malabar indien', 'Curry de pescado malabar indio', 'Indisches Malabar-Fisch-Curry'],
  'حليم حيدر أباد هندي': ['Haleem hyderabadi indien', 'Haleem de Hyderabad indio', 'Indisches Hyderabadi-Haleem'],
  'ليتي تشوكا هندي': ['Litti chokha indien', 'Litti chokha indio', 'Indisches Litti-Chokha'],
  'دوكلا هندية': ['Dhokla indien', 'Dhokla indio', 'Indisches Dhokla'],
  'خاندفي هندية': ['Khandvi indien', 'Khandvi indio', 'Indisches Khandvi'],
  'باف بهاجي لايت هندية': ['Pav bhaji léger indien', 'Pav bhaji ligero indio', 'Indisches leichtes Pav-Bhaji'],
  'فادا سامبار هندية': ['Vada sambar indien', 'Vada sambar indio', 'Indisches Vada-Sambar'],
  'بوليوجاري رز هندي': ['Puliyogare indien', 'Puliyogare indio', 'Indisches Puliyogare'],
  'بيسي بيلي باث هندي': ['Bisi bele bath indien', 'Bisi bele bath indio', 'Indisches Bisi-Bele-Bath'],
};

const missing = rows.filter((r) => !T[r.nameAr.trim()]);
if (missing.length) {
  console.error('Missing translations for:', missing.map((r) => r.nameAr).join(' | '));
  process.exit(1);
}

const MEAL = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', side: 'lunch', salad: 'snacks', fruit: 'snacks' };

let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];
const badLangs = [];
const clamped = [];

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  const nameAr = r.nameAr.trim();
  const g = Number(r.grams);
  if (!Number.isFinite(g) || !g) { failed++; console.error(`Failed ${i + 1} bad grams`); continue; }
  const p100raw = (Number(r.protein ?? 0) / g) * 100;
  const c100raw = (Number(r.carbs ?? 0) / g) * 100;
  const f100raw = (Number(r.fat ?? 0) / g) * 100;
  const p100 = Math.round(p100raw * 10) / 10;
  const c100 = Math.round(c100raw * 10) / 10;
  const f100 = Math.round(f100raw * 10) / 10;
  let cal100 = Math.round(4 * p100raw + 4 * c100raw + 9 * f100raw);
  if (cal100 < 20) { clamped.push(`${nameAr} (${cal100}->20)`); cal100 = 20; }
  if (cal100 > 900) { clamped.push(`${nameAr} (${cal100}->900)`); cal100 = 900; }
  const nameEn = (r.nameEn ?? '').trim();
  const [fr, es, de] = T[nameAr];
  if (![nameAr, nameEn, fr, es, de].every((v) => typeof v === 'string' && v.trim().length > 0)) badLangs.push(nameAr);
  const meal = MEAL[r.mealType] ?? 'lunch';

  try {
    const { data: existing } = await supabase.from('dishes').select('id').eq('name_ar', nameAr).maybeSingle();
    if (existing) { skipped++; skippedNames.push(nameAr); console.log(`Skip ${i + 1}/${rows.length} "${nameAr}" (id=${existing.id})`); continue; }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr, name_en: nameEn, name_fr: fr, name_es: es, name_de: de,
      meal_type: meal,
      cal_100: cal100, protein: p100, carbs: c100, fat: f100,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: g, base_cal_serv: Math.round(Number(r.kcal ?? 0) * 10) / 10, serving_unit: null, serving_description: null,
      healthy: null, is_fried: null, is_sweet: null,
      source: 'المطبخ الهندي التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_indian', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${nameAr}" (meal=${meal}, cal=${cal100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== INDIA LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (clamped.length) console.log('Clamped cal_100  :', clamped.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;