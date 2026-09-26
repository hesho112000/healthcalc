// Migrates the 100 existing Pakistani dishes (src/data/pakistani-full.ts -> PAKISTANI_FULL)
// to Supabase. Awaits the 'asia_migration' secret key (falls back to the service role key).
// Row macros are PER SERVING (grams per row) -> per-100 macros are derived, and cal_100 is
// recomputed via the Atwater factors (4P + 4C + 9F) on the per-100 macros, clamped into
// [20,900]. Region: pan_pakistani (golden rule). FR/ES/DE are keyed by exact nameAr.
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

const raw = fs.readFileSync(path.join(__dirname, 'src/data/pakistani-full.ts'), 'utf8');
const m = raw.match(/export const PAKISTANI_FULL: PakistaniFullDish\[\] = (\[[\s\S]*\]);/);
if (!m) { console.error('Could not extract PAKISTANI_FULL array'); process.exit(1); }
const rows = JSON.parse(m[1]);

const T = {
  'باراتا ألو باكستانية': ['Paratha aux pommes de terre pakistanais', 'Paratha de patata paquistaní', 'Pakistanisches Aloo-Paratha'],
  'باراتا قيمه باكستانية': ['Paratha au qeema pakistanais', 'Paratha de qeema paquistaní', 'Pakistanisches Qeema-Paratha'],
  'حلوة بوري باكستانية لايت فرن': ['Halwa puri léger au four pakistanais', 'Halwa puri ligero al horno paquistaní', 'Pakistanisches leichtes Ofen-Halwa-Puri'],
  'شانا فطار باكستاني': ['Petit-déjeuner au chana pakistanais', 'Desayuno de chana paquistaní', 'Pakistanisches Chana-Frühstück'],
  'نهاري باكستاني': ['Nihari pakistanais', 'Nihari paquistaní', 'Pakistanisches Nihari'],
  'بايا باكستانية': ['Paya pakistanais', 'Paya paquistaní', 'Pakistanisches Paya'],
  'أندا باراتا باكستانية': ['Paratha aux œufs pakistanais', 'Paratha de huevo paquistaní', 'Pakistanisches Eier-Paratha'],
  'لاسي حلوة باكستانية': ['Lassi sucré pakistanais', 'Lassi dulce paquistaní', 'Pakistanischer süßer Lassi'],
  'شاي باراتا باكستانية': ['Thé et paratha pakistanais', 'Té y paratha paquistaní', 'Pakistanisches Chai-Paratha'],
  'رز أبيض باكستاني': ['Riz blanc pakistanais', 'Arroz blanco paquistaní', 'Pakistanischer weißer Reis'],
  'رز زيرة باكستاني': ['Riz au cumin pakistanais', 'Arroz al comino paquistaní', 'Pakistanischer Cumin-Reis'],
  'برياني دجاج باكستاني': ['Biryani de poulet pakistanais', 'Biryani de pollo paquistaní', 'Pakistanisches Hühner-Biryani'],
  'برياني لحم ضأن باكستاني': ["Biryani d'agneau pakistanais", "Biryani de cordero paquistaní", 'Pakistanisches Lamm-Biryani'],
  'برياني خضار باكستاني': ['Biryani de légumes pakistanais', 'Biryani de verduras paquistaní', 'Pakistanisches Gemüse-Biryani'],
  'بلاو دجاج باكستاني': ['Pulao de poulet pakistanais', 'Pulao de pollo paquistaní', 'Pakistanisches Hühner-Pulao'],
  'بلاو لحم باكستاني': ['Pulao de viande pakistanais', 'Pulao de carne paquistaní', 'Pakistanisches Fleisch-Pulao'],
  'دال تادكا باكستانية': ['Dal tadka pakistanais', 'Dal tadka paquistaní', 'Pakistanisches Dal Tadka'],
  'دال ماش باكستانية': ['Dal mash pakistanais', 'Dal mash paquistaní', 'Pakistanisches Urad-Dal'],
  'شانا ماسالا باكستانية': ['Chana masala pakistanais', 'Chana masala paquistaní', 'Pakistanisches Chana-Masala'],
  'ألو جوشت باكستاني': ['Aloo gosht pakistanais', 'Aloo gosht paquistaní', 'Pakistanisches Aloo-Gosht'],
  'قورمة دجاج باكستانية لايت': ['Qorma de poulet léger pakistanais', 'Qorma de pollo ligero paquistaní', 'Pakistanisches leichtes Hühner-Qorma'],
  'قورمة لحم باكستانية': ['Qorma de viande pakistanais', 'Qorma de carne paquistaní', 'Pakistanisches Fleisch-Qorma'],
  'كراهي دجاج باكستاني': ['Karahi de poulet pakistanais', 'Karahi de pollo paquistaní', 'Pakistanisches Hühner-Karahi'],
  'كراهي لحم باكستاني': ['Karahi de viande pakistanais', 'Karahi de carne paquistaní', 'Pakistanisches Fleisch-Karahi'],
  'حليم باكستاني': ['Haleem pakistanais', 'Haleem paquistaní', 'Pakistanisches Haleem'],
  'قيمه مطر باكستاني': ['Keema matar pakistanais', 'Keema matar paquistaní', 'Pakistanisches Keema-Matar'],
  'نرگسي كوفتة باكستانية': ['Kofta nargisi pakistanais', 'Kofta nargisi paquistaní', 'Pakistanisches Nargisi-Kofta'],
  'نان باكستاني': ['Naan pakistanais', 'Naan paquistaní', 'Pakistanisches Naan'],
  'روتي باكستاني': ['Roti pakistanais', 'Roti paquistaní', 'Pakistanisches Roti'],
  'كولشا باكستانية': ['Kulcha pakistanais', 'Kulcha paquistaní', 'Pakistanisches Kulcha'],
  'سيخ كباب باكستاني مشوي': ['Seekh kebab grillé pakistanais', 'Seekh kebab a la parrilla paquistaní', 'Pakistanisches gegrilltes Seekh-Kebab'],
  'شابلي كباب باكستاني مشوي': ['Kebab chapli grillé pakistanais', 'Kebab chapli a la parrilla paquistaní', 'Pakistanisches gegrilltes Chapli-Kebab'],
  'دجاج تيكا باكستاني مشوي': ['Chicken tikka grillé pakistanais', 'Pollo tikka a la parrilla paquistaní', 'Pakistanisches gegrilltes Chicken-Tikka'],
  'بيف تيكا باكستاني مشوي': ['Beef tikka grillé pakistanais', 'Beef tikka a la parrilla paquistaní', 'Pakistanisches gegrilltes Beef-Tikka'],
  'مالاي بوتي باكستاني مشوي': ['Malai boti grillé pakistanais', 'Malai boti a la parrilla paquistaní', 'Pakistanisches gegrilltes Malai-Boti'],
  'كاري سمك باكستاني': ['Curry de poisson pakistanais', 'Curry de pescado paquistaní', 'Pakistanisches Fisch-Curry'],
  'كاري روبيان باكستاني': ['Curry de crevettes pakistanais', 'Curry de gambas paquistaní', 'Pakistanisches Garnelen-Curry'],
  'سمك مقلي فرن لايت باكستاني': ['Poisson frit léger au four pakistanais', 'Pescado frito ligero al horno paquistaní', 'Pakistanischer leichter Ofen-Fisch'],
  'داهي بهالا باكستاني': ['Dahi bhalla pakistanais', 'Dahi bhalla paquistaní', 'Pakistanisches Dahi-Bhalla'],
  'ساموسا فرن لايت باكستانية': ['Samosa léger au four pakistanais', 'Samosa ligera al horno paquistaní', 'Pakistanische leichte Ofen-Samosa'],
  'باكورا فرن لايت باكستانية': ['Pakora léger au four pakistanais', 'Pakora ligero al horno paquistaní', 'Pakistanisches leichtes Ofen-Pakora'],
  'رايتا خيار باكستاني': ['Raita au concombre pakistanais', 'Raita de pepino paquistaní', 'Pakistanisches Gurken-Raita'],
  'كاشومبار سلطة باكستانية': ['Salade kachumber pakistanaise', 'Ensalada kachumber paquistaní', 'Pakistanischer Kachumber-Salat'],
  'شامي كباب باكستاني فرن لايت': ['Shami kebab léger au four pakistanais', 'Shami kebab ligero al horno paquistaní', 'Pakistanisches leichtes Ofen-Shami-Kebab'],
  'كاري بيض باكستاني': ["Curry d'œufs pakistanais", 'Curry de huevo paquistaní', 'Pakistanisches Eier-Curry'],
  'بهيندي ماسالا باكستانية': ['Bhindi masala pakistanais', 'Bhindi masala paquistaní', 'Pakistanisches Bhindi-Masala'],
  'ألو جوبي باكستانية': ['Aloo gobi pakistanais', 'Aloo gobi paquistaní', 'Pakistanisches Aloo-Gobi'],
  'ساغ باكستاني': ['Saag pakistanais', 'Saag paquistaní', 'Pakistanisches Saag'],
  'مانجو باكستانية': ['Mangue pakistanaise', 'Mango paquistaní', 'Pakistanische Mango'],
  'موز باكستاني': ['Banane pakistanaise', 'Plátano paquistaní', 'Pakistanische Banane'],
  'تفاح باكستاني': ['Pomme pakistanaise', 'Manzana paquistaní', 'Pakistanischer Apfel'],
  'تمر باكستاني 3': ['Dattes pakistanaises 3', 'Dátiles paquistaníes 3', 'Pakistanische Datteln 3'],
  'زبادي باكستاني': ['Yaourt pakistanais', 'Yogur paquistaní', 'Pakistanisches Joghurt'],
  'بيض مسلوق باكستاني': ['Œufs durs pakistanais', 'Huevos duros paquistaníes', 'Pakistanische gekochte Eier'],
  'تونة ماء باكستانية': ["Thon à l'eau pakistanais", 'Atún al agua paquistaní', 'Pakistanischer Thunfisch in Wasser'],
  'لحم بقري مسلوق باكستاني': ['Bœuf bouilli pakistanais', 'Ternera hervida paquistaní', 'Pakistanisches gekochtes Rindfleisch'],
  'لحم معيز مسلوق باكستاني': ['Chevre bouillie pakistanaise', 'Cabra hervida paquistaní', 'Pakistanisches gekochtes Ziegenfleisch'],
  'صدر دجاج مسلوق باكستاني': ['Poitrine de poulet bouillie pakistanaise', 'Pechuga de pollo hervida paquistaní', 'Pakistanische gekochte Hähnchenbrust'],
  'نهاري دجاج باكستاني': ['Nihari de poulet pakistanais', 'Nihari de pollo paquistaní', 'Pakistanisches Hühner-Nihari'],
  'نهاري لحم ضأن باكستاني': ["Nihari d'agneau pakistanais", 'Nihari de cordero paquistaní', 'Pakistanisches Lamm-Nihari'],
  'كونا باكستاني': ['Kunna pakistanais', 'Kunna paquistaní', 'Pakistanisches Kunna'],
  'شرغا دجاج فرن لايت باكستاني': ['Chargha de poulet léger au four pakistanais', 'Chargha de pollo ligero al horno paquistaní', 'Pakistanisches leichtes Ofen-Chargha'],
  'طحينة باكستانية 10جم': ['Tahini pakistanais 10g', 'Tahini paquistaní 10g', 'Pakistanische Tahini 10g'],
  'سلطة خضراء باكستانية': ['Salade verte pakistanaise', 'Ensalada verde paquistaní', 'Pakistanischer grüner Salat'],
  'شوربة عدس باكستانية': ['Soupe de lentilles pakistanaise', 'Sopa de lentejas paquistaní', 'Pakistanische Linsensuppe'],
  'شوربة دجاج باكستانية': ['Soupe au poulet pakistanaise', 'Sopa de pollo paquistaní', 'Pakistanische Hühnersuppe'],
  'أومليت خضار باكستاني': ['Omelette de légumes pakistanaise', 'Tortilla de verduras paquistaní', 'Pakistanisches Gemüse-Omelett'],
  'كراهي أبيض لحم باكستاني': ['Karahi blanc à la viande pakistanais', 'Karahi blanco de carne paquistaní', 'Pakistanisches weißes Fleisch-Karahi'],
  'كراهي أبيض دجاج باكستاني': ['Karahi blanc au poulet pakistanais', 'Karahi blanco de pollo paquistaní', 'Pakistanisches weißes Hühner-Karahi'],
  'ساجي بلوتشي باكستاني': ['Sajji baloutchi pakistanais', 'Sajji baluchi paquistaní', 'Pakistanisches Balochi-Sajji'],
  'كعك بلوتشي باكستاني': ['Kaak baloutchi pakistanais', 'Kaak baluchi paquistaní', 'Pakistanisches Balochi-Kaak'],
  'دجاج جالفرزي باكستاني': ['Poulet jalfrezi pakistanais', 'Pollo jalfrezi paquistaní', 'Pakistanisches Hühner-Jalfrezi'],
  'خضار مشكل باكستاني': ['Légumes mélangés pakistanais', 'Verduras mixtas paquistaníes', 'Pakistanisches gemischtes Gemüse'],
  'باينغان بهارتا باكستاني': ['Baingan bharta pakistanais', 'Baingan bharta paquistaní', 'Pakistanisches Baingan-Bharta'],
  'تيندا جوشت باكستاني': ['Tinda gosht pakistanais', 'Tinda gosht paquistaní', 'Pakistanisches Tinda-Gosht'],
  'كريلا قيمه باكستاني': ['Karela qeema pakistanais', 'Karela qeema paquistaní', 'Pakistanisches Karela-Qeema'],
  'دال شاول باكستاني': ['Dal chawal pakistanais', 'Dal chawal paquistaní', 'Pakistanisches Dal-Chawal'],
  'أشار جوشت باكستاني': ['Achar gosht pakistanais', 'Achar gosht paquistaní', 'Pakistanisches Achar-Gosht'],
  'بومباي برياني باكستاني': ['Biryani de Bombay pakistanais', 'Biryani de Bombay paquistaní', 'Pakistanisches Bombay-Biryani'],
  'برياني سمك باكستاني': ['Biryani de poisson pakistanais', 'Biryani de pescado paquistaní', 'Pakistanisches Fisch-Biryani'],
  'برياني روبيان باكستاني': ['Biryani de crevettes pakistanais', 'Biryani de gambas paquistaní', 'Pakistanisches Garnelen-Biryani'],
  'كابولي بلاو باكستاني': ['Pulao kaboulien pakistanais', 'Pulao afgano paquistaní', 'Pakistanisches Kabuli-Pulao'],
  'شوربة دجاج ذرة باكستانية': ['Soupe de poulet au maïs pakistanaise', 'Sopa de pollo con maíz paquistaní', 'Pakistanische Hühner-Mais-Suppe'],
  'ماتن شوبس باكستاني مشوي': ['Côtes de mouton grillées pakistanaises', 'Chuletas de cordero a la parrilla paquistaníes', 'Pakistanische gegrillte Lammkoteletts'],
  'دجاج شوبس باكستاني مشوي': ['Côtes de poulet grillées pakistanaises', 'Chuletas de pollo a la parrilla paquistaníes', 'Pakistanische gegrillte Hähnchenkoteletts'],
  'رسمي كباب باكستاني': ['Kebab reshmi pakistanais', 'Kebab reshmi paquistaní', 'Pakistanisches Reshmi-Kebab'],
  'جولا كباب باكستاني': ['Kebab gola pakistanais', 'Kebab gola paquistaní', 'Pakistanisches Gola-Kebab'],
  'بهاري كباب باكستاني مشوي': ['Kebab bihari grillé pakistanais', 'Kebab bihari a la parrilla paquistaní', 'Pakistanisches gegrilltes Bihari-Kebab'],
  'دم قيمه باكستاني': ['Dum qeema pakistanais', 'Dum qeema paquistaní', 'Pakistanisches Dum-Qeema'],
  'بايا باكستاني لحم': ['Paya à la viande pakistanais', 'Paya de carne paquistaní', 'Pakistanisches Fleisch-Paya'],
  'مغز باكستاني': ['Maghaz pakistanais', 'Maghaz paquistaní', 'Pakistanisches Maghaz'],
  'كليجي باكستانية': ['Kaleji pakistanais', 'Kaleji paquistaní', 'Pakistanisches Kaleji'],
  'ألو باراتا باكستاني إضافي': ['Paratha extra aux pommes de terre pakistanais', 'Paratha extra de patata paquistaní', 'Pakistanisches extra Aloo-Paratha'],
  'تشيز نان باكستاني لايت': ['Naan au fromage léger pakistanais', 'Naan de queso ligero paquistaní', 'Pakistanisches leichtes Käse-Naan'],
  'روغني نان باكستاني': ['Naan roghni pakistanais', 'Naan roghni paquistaní', 'Pakistanisches Roghni-Naan'],
  'تافتان باكستاني': ['Taftan pakistanais', 'Taftan paquistaní', 'Pakistanisches Taftan'],
  'شير خورما لايت باكستاني 50جم': ['Sheer khurma léger pakistanais 50g', 'Sheer khurma ligero paquistaní 50g', 'Pakistanisches leichtes Sheer-Khurma 50g'],
  'فيرني لايت باكستاني 80جم': ['Firni léger pakistanais 80g', 'Firni ligero paquistaní 80g', 'Pakistanisches leichtes Firni 80g'],
  'خير لايت باكستاني 80جم': ['Kheer léger pakistanais 80g', 'Kheer ligero paquistaní 80g', 'Pakistanisches leichtes Kheer 80g'],
  'جلاب جامن واحدة لايت باكستاني': ['Gulab jamun léger 1 pakistanais', 'Gulab jamun ligero 1 paquistaní', 'Pakistanisches leichtes Gulab-Jamun 1'],
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
      source: 'المطبخ الباكستاني التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_pakistani', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${nameAr}" (meal=${meal}, cal=${cal100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== PAKISTAN LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (clamped.length) console.log('Clamped cal_100  :', clamped.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;