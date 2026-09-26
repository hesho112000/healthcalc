// Migrates the 100 existing Syrian dishes (src/data/syrian-full-100-USDA.json) to Supabase.
// Source rows have only name_ar/name_en -> full FR/ES/DE translations are provided inline
// (keyed by exact name_ar) to satisfy the 5-language non-empty integrity rule.
//
// Region: pan_syrian (golden rule). Meal types mapped from the row's mealType bucket.
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

const rows = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/syrian-full-100-USDA.json'), 'utf8'));

// name_ar -> [fr, es, de]
const T = {
  'منقوشة زعتر لايت سورية 1': ['Manakish zaatar syrien léger 1', 'Manakish zaatar sirio ligero 1', 'Syrisches Zaatar-Manakish leicht 1'],
  'فتة حمص لايت سورية': ['Fatteh houmous syrien léger', 'Fatteh de hummus sirio ligero', 'Syrisches Hummus-Fatteh leicht'],
  'فول مدمس لايت سوري': ['Foul moudammas syrien léger', 'Ful medames sirio ligero', 'Syrisches Ful-Mudammas leicht'],
  'مامونية سميد حلو لايت سورية 100جم': ['Mamounié syrienne légère 100g', 'Mamunia siria ligera 100g', 'Syrische Mamunia leicht 100g'],
  'سحلب لايت سوري 200مل': ['Sahleb syrien léger 200ml', 'Sahleb sirio ligero 200ml', 'Syrischer Sahleb leicht 200ml'],
  'كعك بحليب لايت سوري 1': ['Kaak au lait syrien léger 1', 'Kaak de leche sirio ligero 1', 'Syrischer Milch-Kaak leicht 1'],
  'قهوة عربية سورية': ['Café arabe syrien', 'Café árabe sirio', 'Syrischer arabischer Kaffee'],
  'جلاب لايت سوري 200مل': ['Jallab syrien léger 200ml', 'Jallab sirio ligero 200ml', 'Syrisches Jallab leicht 200ml'],
  'كبة حلبية لايت سورية 1': ["Kibbeh d'Alep léger 1", 'Kibbeh de Alepo ligero 1', 'Aleppo-Kibbeh leicht 1'],
  'كبة لبنية لايت سورية': ['Kibbeh au laban syrien léger', 'Kibbeh en yogur sirio ligero', 'Syrisches Joghurt-Kibbeh leicht'],
  'كبة صينية لايت سورية': ['Kibbeh au four syrien léger', 'Kibbeh al horno sirio ligero', 'Syrisches Ofen-Kibbeh leicht'],
  'كبة نيئة لايت سورية 80جم': ['Kibbeh nayé syrien léger 80g', 'Kibbeh crudo sirio ligero 80g', 'Syrisches rohes Kibbeh leicht 80g'],
  'كباب حلبي لايت سوري': ["Kebab d'Alep syrien léger", 'Kebab aleppino sirio ligero', 'Syrisches Aleppo-Kebab leicht'],
  'كباب خشخاش لايت سوري': ['Kebab khachkhach syrien léger', 'Kebab khashkhash sirio ligero', 'Syrisches Khashkhash-Kebab leicht'],
  'شيش طاووق لايت سوري': ['Chiche taouk syrien léger', 'Shish taouk sirio ligero', 'Syrisches Shish-Taouk leicht'],
  'لحمة بكرز كرز لحم لايت سورية': ['Lahme b karaz syrienne légère', 'Carne con cerezas siria ligera', 'Syrisches Fleisch mit Kirschen leicht'],
  'فريكة لحم لايت سورية': ['Freekeh à la viande syrien léger', 'Freekeh con carne sirio ligero', 'Syrisches Freekeh mit Fleisch leicht'],
  'ملوخية لايت سورية': ['Mlukhiyeh syrienne légère', 'Mlukhiya siria ligera', 'Syrisches Mlukhiye leicht'],
  'بامية لحم لايت سورية': ['Bamia à la viande syrienne légère', 'Bamya con carne siria ligera', 'Syrisches Okra mit Fleisch leicht'],
  'فاصوليا لحم لايت سورية': ['Fasoulia à la viande syrienne légère', 'Judías con carne sirias ligeras', 'Syrische Bohnen mit Fleisch leicht'],
  'يبرق ورق عنب لايت سوري 3': ['Yabrak feuilles de vigne syrien léger 3', 'Yabrak de hojas de parra sirio ligero 3', 'Syrisches gefülltes Weinblatt leicht 3'],
  'كوسا محشي لايت سوري': ['Courgettes farcies syriennes légères', 'Calabacines rellenos sirios ligeros', 'Syrische gefüllte Zucchini leicht'],
  'محشي باذنجان لايت سوري': ['Aubergines farcies syriennes légères', 'Berenjenas rellenas sirias ligeras', 'Syrische gefüllte Auberginen leicht'],
  'شاورما دجاج لايت سورية': ['Chawarma de poulet syrienne légère', 'Shawarma de pollo sirio ligero', 'Syrisches Hühnchen-Shawarma leicht'],
  'حمص سوري 60جم': ['Houmous syrien 60g', 'Hummus sirio 60g', 'Syrisches Hummus 60g'],
  'متبل باذنجان سوري 60جم': ['Moutabal syrien 60g', 'Mutabal sirio 60g', 'Syrisches Auberginen-Mutabal 60g'],
  'محمرة فلفل جوز سورية 40جم': ['Muhammara syrienne 40g', 'Muhammara siria 40g', 'Syrische Muhammara 40g'],
  'بابا غنوج سوري 60جم': ['Baba ganoush syrien 60g', 'Baba ghanoush sirio 60g', 'Syrisches Baba-Ghanoush 60g'],
  'تبولة لايت سورية': ['Taboulé syrien léger', 'Tabule sirio ligero', 'Syrisches Taboulé leicht'],
  'فتوش لايت سوري': ['Fattoush syrien léger', 'Fattush sirio ligero', 'Syrisches Fattoush leicht'],
  'سلطة بنادورة طماطم سورية': ['Salade de tomates syrienne', 'Ensalada de tomate siria', 'Syrischer Tomatensalat'],
  'سلطة جرجير سورية': ['Salade de roquette syrienne', 'Ensalada de rúcula siria', 'Syrischer Rucola-Salat'],
  'لبنة سورية 40جم': ['Labneh syrien 40g', 'Labneh sirio 40g', 'Syrisches Labneh 40g'],
  'جبنة مشللة سورية 30جم': ['Fromage mshallaleh syrien 30g', 'Queso trenzado sirio 30g', 'Syrischer Käsefaden 30g'],
  'حلوم مشوي لايت سوري 30جم': ['Halloumi grillé syrien léger 30g', 'Halloumi a la plancha sirio ligero 30g', 'Syrisches gegrilltes Halloumi leicht 30g'],
  'بطاطا حارة لايت سورية': ['Batata harra syrienne légère', 'Patatas picantes sirias ligeras', 'Syrische scharfe Kartoffeln leicht'],
  'بطاطا مقلية لايت سورية': ['Pommes frites syriennes légères', 'Patatas fritas sirias ligeras', 'Syrische Pommes leicht'],
  'مكدوس باذنجان محشي سوري 30جم': ['Makdous syrien 30g', 'Makdus sirio 30g', 'Syrisches Makdous 30g'],
  'زيتون سوري 30جم': ['Olives syriennes 30g', 'Aceitunas sirias 30g', 'Syrische Oliven 30g'],
  'طرشي مخلل سوري 40جم': ['Pickles syriens 40g', 'Encurtidos sirios 40g', 'Syrische Pickles 40g'],
  'شوربة عدس لايت سورية': ['Soupe de lentilles syrienne légère', 'Sopa de lentejas siria ligera', 'Syrische Linsensuppe leicht'],
  'شوربة دجاج لايت سورية': ['Soupe de poulet syrienne légère', 'Sopa de pollo siria ligera', 'Syrische Hühnersuppe leicht'],
  'لبن بخيار لايت سوري': ['Laban bi khiar syrien léger', 'Yogur con pepino sirio ligero', 'Syrischer Gurkensalat in Joghurt leicht'],
  'بيض مسلوق سوري': ['Œufs durs syriens', 'Huevos duros sirios', 'Syrische gekochte Eier'],
  'زبادي سوري': ['Yaourt syrien', 'Yogur sirio', 'Syrisches Joghurt'],
  'تونة ماء سورية': ["Thon à l'eau syrien", 'Atún al agua sirio', 'Syrischer Thunfisch in Wasser'],
  'تين سوري': ['Figue syrienne', 'Higo sirio', 'Syrische Feige'],
  'عنب سوري': ['Raisin syrien', 'Uva siria', 'Syrische Weintraube'],
  'بطيخ سوري': ['Pastèque syrienne', 'Sandía siria', 'Syrische Wassermelone'],
  'رمان سوري': ['Grenade syrienne', 'Granada siria', 'Syrischer Granatapfel'],
  'مشمش سوري': ['Abricot syrien', 'Albaricoque sirio', 'Syrische Aprikose'],
  'بقلاوة لايت سورية 30جم': ['Baklava syrienne légère 30g', 'Baklava siria ligera 30g', 'Syrisches Baklava leicht 30g'],
  'معمول تمر لايت سوري 30جم': ['Maamoul aux dattes syrien léger 30g', 'Maamoul de dátiles sirio ligero 30g', 'Syrisches Dattel-Maamoul leicht 30g'],
  'صفيحة لحم لايت سورية 1': ['Sfiha syrienne légère 1', 'Sfiha siria ligera 1', 'Syrisches Sfiha leicht 1'],
  'فطاير سبانخ لايت سورية 1': ['Fatayer aux épinards syrien léger 1', 'Fatayer de espinacas sirio ligero 1', 'Syrisches Spinat-Fatayer leicht 1'],
  'سمبوسك لحم لايت سوري 1': ['Sambousik syrien léger 1', 'Sambusik sirio ligero 1', 'Syrisches Fleisch-Sambusik leicht 1'],
  'قاورما لحم محفوظ سوري 30جم': ['Kawarma syrien 30g', 'Kawarma sirio 30g', 'Syrisches eingelegtes Fleisch 30g'],
  'مقانق لايت سورية 40جم': ['Makanek syriennes légères 40g', 'Makanek sirios ligeros 40g', 'Syrische Makanek-Wurst leicht 40g'],
  'سجق سوري لايت 30جم': ['Soujouk syrien léger 30g', 'Soujouk sirio ligero 30g', 'Syrische Soujouk leicht 30g'],
  'روس بتوت توت لايت سوري 200مل': ['Charbet tout syrien léger 200ml', 'Bebida de moras sira ligera 200ml', 'Syrisches Maulbeergetränk leicht 200ml'],
  'تمر هندي لايت سوري 200مل': ['Tamer hindi syrien léger 200ml', 'Bebida de tamarindo siria ligera 200ml', 'Syrisches Tamarindengetränk leicht 200ml'],
  'جلاب لايت سوري 200مل 2': ['Jallab syrien léger 200ml 2', 'Jallab sirio ligero 200ml 2', 'Syrisches Jallab leicht 200ml 2'],
  'قرنبيط مقلي لايت سوري': ['Chou-fleur frit syrien léger', 'Coliflor frita siria ligera', 'Syrischer frittierter Blumenkohl leicht'],
  'مسقعة لايت سورية': ['Moussaka syrienne légère', 'Moussaka siria ligera', 'Syrische Moussaka leicht'],
  'فاصوليا ورز لايت سورية': ['Fasoulia riz syrienne légère', 'Judías con arroz sirias ligeras', 'Syrische Bohnen mit Reis leicht'],
  'بازيلا ورز لايت سورية': ['Bazella riz syrienne légère', 'Guisantes con arroz sirios ligeros', 'Syrische Erbsen mit Reis leicht'],
  'كباب باذنجان لايت سوري': ["Kebab d'aubergine d'Alep léger", 'Kebab de berenjena aleppino ligero', 'Syrisches Auberginen-Kebab leicht'],
  'داوود باشا كفتة لايت سوري': ['Daoud bacha syrien léger', 'Daoud basha sirio ligero', 'Syrisches Daoud-Pascha-Kofta leicht'],
  'كباب كرز لايت سوري': ['Kebab karaz syrien léger', 'Kebab de cerezas sirio ligero', 'Syrisches Kirsch-Kebab leicht'],
  'كبة سماقية لايت سورية': ['Kibbeh sumakiyeh syrien léger', 'Kibbeh de suma sirio ligero', 'Syrisches Sumach-Kibbeh leicht'],
  'كبة كراوية مقلية لايت سورية 1': ['Kibbeh krouniyeh frit syrien léger 1', 'Kibbeh de alcaravea frito sirio ligero 1', 'Syrisches gebratenes Kümmel-Kibbeh leicht 1'],
  'كبة بصينية لايت سورية': ['Kibbeh b saynieh syrien léger', 'Kibbeh en bandeja sirio ligero', 'Syrisches Ofen-Kibbeh in Form leicht'],
  'كباب خشخاش لايت سوري 2': ['Kebab khachkhach syrien léger 2', 'Kebab khashkhash sirio ligero 2', 'Syrisches Khashkhash-Kebab leicht 2'],
  'فاصوليا بزيت لايت سورية 2': ["Fasoulia à l'huile syrienne légère 2", 'Judías en aceite sirias ligeras 2', 'Syrische Bohnen in Öl leicht 2'],
  'بامية بزيت لايت سورية 2': ["Bamia à l'huile syrienne légère 2", 'Bamya en aceite siria ligera 2', 'Syrisches Okra in Öl leicht 2'],
  'رمان سوري 2': ['Grenade syrienne 2', 'Granada siria 2', 'Syrischer Granatapfel 2'],
  'زيتون أخضر سوري 30جم': ['Olives vertes syriennes 30g', 'Aceitunas verdes sirias 30g', 'Syrische grüne Oliven 30g'],
  'لبن بخيار لايت سوري 2': ['Laban bi khiar syrien léger 2', 'Yogur con pepino sirio ligero 2', 'Syrischer Gurkensalat in Joghurt leicht 2'],
  'فاصوليا ورز لايت سورية 2': ['Fasoulia riz syrienne légère 2', 'Judías con arroz sirias ligeras 2', 'Syrische Bohnen mit Reis leicht 2'],
  'معمول فستق لايت سوري 30جم': ['Maamoul aux pistaches syrien léger 30g', 'Maamoul de pistacho sirio ligero 30g', 'Syrisches Pistazien-Maamoul leicht 30g'],
  'غريبة لايت سورية 20جم': ['Ghraybeh syrien léger 20g', 'Ghuraiba siria ligera 20g', 'Syrisches Ghuraiba leicht 20g'],
  'مغلي أرز قرفة لايت سوري 80جم': ['Meghli syrien léger 80g', 'Meghli sirio ligero 80g', 'Syrisches Zimt-Reis-Meghli leicht 80g'],
  'مهلبية لايت سورية 80جم': ['Muhallabieh syrien léger 80g', 'Muhalabiya siria ligera 80g', 'Syrisches Muhallabieh leicht 80g'],
  'رز بحليب لايت سوري 80جم': ['Riz au lait syrien léger 80g', 'Arroz con leche sirio ligero 80g', 'Syrischer Milchreis leicht 80g'],
  'قطايف عصافيري لايت سورية 1': ['Atayef syrien léger 1', 'Atayef sirio ligero 1', 'Syrisches Atayef leicht 1'],
  'قطايف جوز لايت سورية 1': ['Qatayef aux noix syrien léger 1', 'Qatayef de nuez sirio ligero 1', 'Syrisches Walnuss-Qatayef leicht 1'],
  'كنافة لايت سورية 60جم': ['Kanafeh syrienne légère 60g', 'Canafe siria ligera 60g', 'Syrisches Kanafeh leicht 60g'],
  'حلاوة الجبن لايت سورية 50جم': ['Halawet el jibn syrienne légère 50g', 'Halawet el jibn siria ligera 50g', 'Syrisches Käse-Süß leicht 50g'],
  'صفوف كركم لايت سوري 40جم': ['Sfouf au curcuma syrien léger 40g', 'Sfouf de cúrcuma sirio ligero 40g', 'Syrisches Kurkuma-Sfouf leicht 40g'],
  'نمورة سميد لايت سورية 40جم': ['Nammoura syrienne légère 40g', 'Nammura siria ligera 40g', 'Syrische Grieß-Nammara leicht 40g'],
  'كنافة نابلسية لايت سورية 60جم': ['Knafeh nabulsi syrienne légère 60g', 'Canafe nabulsi siria ligera 60g', 'Syrisches Nablus-Kanafeh leicht 60g'],
  'قهوة عربية سورية 2': ['Café arabe syrien 2', 'Café árabe sirio 2', 'Syrischer arabischer Kaffee 2'],
  'جوانح دجاج لايت سورية 2': ['Ailes de poulet syriennes légères 2', 'Alitas de pollo sirias ligeras 2', 'Syrische Hähnchenflügel leicht 2'],
  'كبة أرمنية لايت سورية': ['Kibbeh arménien syrien léger', 'Kibbeh armenio sirio ligero', 'Syrisches armenisches Kibbeh leicht'],
  'زيت زيتون سوري 10جم': ["Huile d'olive syrienne 10g", 'Aceite de oliva sirio 10g', 'Syrisches Olivenöl 10g'],
  'كعك بسمسم سوري 60جم': ['Kaak au sésame syrien 60g', 'Kaak de sésamo sirio 60g', 'Syrisches Sesam-Kaak 60g'],
  'ملوخية ورز لايت سورية': ['Mlukhiyeh riz syrienne légère', 'Mlukhiya con arroz siria ligera', 'Syrisches Mlukhiye mit Reis leicht'],
  'كبة صينية لايت سورية 2': ['Kibbeh au four syrien léger 2', 'Kibbeh al horno sirio ligero 2', 'Syrisches Ofen-Kibbeh leicht 2'],
  'شوربة فريكة لايت سورية': ['Soupe de freekeh syrienne légère', 'Sopa de freekeh siria ligera', 'Syrische Freekeh-Suppe leicht'],
  'مامونية لايت سورية 2': ['Mamounié syrienne légère 2', 'Mamunia siria ligera 2', 'Syrische Mamunia leicht 2'],
};

const missing = rows.filter((r) => !T[r.name_ar.trim()]);
if (missing.length) {
  console.error('Missing translations for:', missing.map((r) => r.name_ar).join(' | '));
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
  const nameEn = (r.name_en ?? '').split(' - ')[0].trim();
  const [fr, es, de] = T[nameAr];
  if (![nameAr, nameEn, fr, es, de].every((v) => typeof v === 'string' && v.trim().length > 0)) badLangs.push(nameAr);
  const p100 = r.protein != null ? Math.round((Number(r.protein) / g) * 100 * 10) / 10 : null;
  const c100 = r.carbs != null ? Math.round((Number(r.carbs) / g) * 100 * 10) / 10 : null;
  const f100 = r.fat != null ? Math.round((Number(r.fat) / g) * 100 * 10) / 10 : null;

  try {
    const { data: existing } = await supabase.from('dishes').select('id').eq('name_ar', nameAr).maybeSingle();
    if (existing) { skipped++; skippedNames.push(nameAr); console.log(`Skip ${i + 1}/${rows.length} "${nameAr}" (id=${existing.id})`); continue; }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr, name_en: nameEn, name_fr: fr, name_es: es, name_de: de,
      meal_type: MEAL[r.mealType] ?? 'lunch',
      cal_100: cal100, protein: p100, carbs: c100, fat: f100,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: g, base_cal_serv: kcal, serving_unit: null, serving_description: null,
      healthy: null, is_fried: null, is_sweet: null,
      source: 'المطبخ السوري التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_syrian', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${nameAr}" (meal=${MEAL[r.mealType] ?? 'lunch'}, cal=${cal100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== SYRIA LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (badCal.length) console.warn('Out-of-range cal_100:', badCal.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;