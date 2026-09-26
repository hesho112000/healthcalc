// Migrates the 100 existing Palestinian dishes (src/data/palestinian-full-100-USDA.json)
// to Supabase (dry-run first, then for real after approval). Source rows have only
// name_ar/name_en -> full FR/ES/DE translations are keyed by exact name_ar (one row is a
// duplicate Arabic name, the second occurrence is skipped by the exists check). Region:
// pan_palestinian (golden rule). cal_100 is clamped into [20,900] (tiny coffee pours
// round below the integrity floor). Meal types mapped from the row's mealType bucket.
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

const rows = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/palestinian-full-100-USDA.json'), 'utf8'));

const T = {
  'منقوشة زعتر لايت فلسطينية 1': ['Manakish zaatar palestinien léger 1', 'Manakish zaatar palestino ligero 1', 'Palästinisches Zaatar-Manakish leicht 1'],
  'كعك القدس فلسطيني 60جم': ['Kaak al-Quds palestinien 60g', 'Kaak de Jerusalén palestino 60g', 'Palästinisches Jerusalem-Kaak 60g'],
  'فلافل لايت فلسطينية 3': ['Falafel palestinien léger 3', 'Falafel palestino ligero 3', 'Palästinisches Falafel leicht 3'],
  'فول مدمس لايت فلسطيني': ['Foul moudammas palestinien léger', 'Ful medames palestino ligero', 'Palästinisches Ful-Mudammas leicht'],
  'فتة حمص لايت فلسطينية': ['Fatteh houmous palestinien léger', 'Fatteh de hummus palestino ligero', 'Palästinisches Hummus-Fatteh leicht'],
  'لبنة زعتر فلسطينية 40جم': ['Labneh zaatar palestinien 40g', 'Labneh zaatar palestino 40g', 'Palästinisches Zaatar-Labneh 40g'],
  'كعك بعجوة لايت فلسطيني 1': ['Kaak bi ajwa palestinien léger 1', 'Kaak de dátiles palestino ligero 1', 'Palästinisches Dattel-Kaak leicht 1'],
  'قهوة عربية فلسطينية': ['Café arabe palestinien', 'Café árabe palestino', 'Palästinensischer arabischer Kaffee'],
  'مسخن دجاج لايت فلسطيني': ['Mousakhan au poulet palestinien léger', 'Musakhan de pollo palestino ligero', 'Palästinensisches Hühner-Musakhan leicht'],
  'مقلوبة دجاج لايت فلسطينية': ['Maqluba de poulet palestinienne légère', 'Maqluba de pollo palestina ligera', 'Palästinensische Hühner-Maqluba leicht'],
  'منسف لايت فلسطيني': ['Mansaf palestinien léger', 'Mansaf palestino ligero', 'Palästinisches Mansaf leicht'],
  'قدرة لحم أرز لايت فلسطينية': ['Qidra viande riz palestinienne légère', 'Qidra de carne y arroz palestino ligero', 'Palästinensisches Fleisch-Reis-Qidra leicht'],
  'قدرة غزة لايت فلسطينية': ['Qidra de Gaza palestinienne légère', 'Qidra de Gaza palestino ligero', 'Palästinensisches Gaza-Qidra leicht'],
  'فريكة لحم لايت فلسطينية': ['Freekeh à la viande palestinien léger', 'Freekeh con carne palestino ligero', 'Palästinisches Freekeh mit Fleisch leicht'],
  'ملوخية لايت فلسطينية': ['Mlukhiyeh palestinienne légère', 'Mlukhiya palestina ligera', 'Palästinisches Mlukhiye leicht'],
  'كبة لايت فلسطينية 1': ['Kibbeh palestinien léger 1', 'Kibbeh palestino ligero 1', 'Palästinisches Kibbeh leicht 1'],
  'كفتة بصينية لايت فلسطينية': ['Kofta au four palestinienne légère', 'Kofta al horno palestina ligera', 'Palästinensische Ofen-Kofta leicht'],
  'سمكة حرة لايت فلسطينية': ['Samke harra palestinienne légère', 'Samke harra palestina ligera', 'Palästinensischer scharfer Fisch leicht'],
  'زرب غزة لحم حفرة لايت فلسطيني': ['Zarb de Gaza palestinien léger', 'Zarb de carne de Gaza palestino ligero', 'Palästinensisches Gaza-Zarb leicht'],
  'شيش كباب لايت فلسطيني': ['Chiche kebab palestinien léger', 'Shish kebab palestino ligero', 'Palästinisches Shish-Kebab leicht'],
  'شاورما دجاج لايت فلسطينية': ['Chawarma de poulet palestinienne légère', 'Shawarma de pollo palestina ligera', 'Palästinisches Hühnchen-Shawarma leicht'],
  'فلافل راب لايت فلسطيني': ['Falafel wrap palestinien léger', 'Falafel en pan palestino ligero', 'Palästinensisches Falafel-Wrap leicht'],
  'كفتة كباب لايت فلسطينية': ['Kofta kebab palestinienne légère', 'Kofta kebab palestina ligera', 'Palästinische Kofta-Kebab leicht'],
  'مجدرة عدس أرز لايت فلسطينية': ['Moudjaddara palestinienne légère', 'Mujaddara palestina ligera', 'Palästinische Mujaddara leicht'],
  'حمص فلسطيني 60جم': ['Houmous palestinien 60g', 'Hummus palestino 60g', 'Palästinisches Hummus 60g'],
  'متبل باذنجان فلسطيني 60جم': ['Moutabal palestinien 60g', 'Mutabal palestino 60g', 'Palästinisches Auberginen-Mutabal 60g'],
  'بابا غنوج فلسطيني 60جم': ['Baba ganoush palestinien 60g', 'Baba ghanoush palestino 60g', 'Palästinisches Baba-Ghanoush 60g'],
  'تبولة لايت فلسطينية': ['Taboulé palestinien léger', 'Tabule palestino ligero', 'Palästinisches Taboulé leicht'],
  'فتوش لايت فلسطيني': ['Fattoush palestinien léger', 'Fattush palestino ligero', 'Palästinisches Fattoush leicht'],
  'سلطة بنادورة طماطم فلسطينية': ['Salade de tomates palestinienne', 'Ensalada de tomate palestina', 'Palästinensischer Tomatensalat'],
  'لبنة فلسطينية 40جم': ['Labneh palestinien 40g', 'Labneh palestino 40g', 'Palästinisches Labneh 40g'],
  'جبنة نابلسية فلسطينية 30جم': ['Fromage nabulsi palestinien 30g', 'Queso nabulsi palestino 30g', 'Palästinensischer Nablus-Käse 30g'],
  'جبنة عكاوية فلسطينية 30جم': ['Fromage akawi palestinien 30g', 'Queso akawi palestino 30g', 'Palästinensischer Akkawi-Käse 30g'],
  'ورق عنب لايت فلسطيني 3': ['Feuilles de vigne farcies palestiniennes légères 3', 'Hojas de parra palestinas ligeras 3', 'Palästinensische gefüllte Weinblätter leicht 3'],
  'كوسا محشي لايت فلسطيني': ['Courgettes farcies palestiniennes légères', 'Calabacines rellenos palestinos ligeros', 'Palästinensische gefüllte Zucchini leicht'],
  'بطاطا حارة لايت فلسطينية': ['Batata harra palestinienne légère', 'Patatas picantes palestinas ligeras', 'Palästinensische scharfe Kartoffeln leicht'],
  'مكدوس باذنجان محشي فلسطيني 30جم': ['Makdous palestinien 30g', 'Makdus palestino 30g', 'Palästinisches Makdous 30g'],
  'زيتون فلسطيني 30جم': ['Olives palestiniennes 30g', 'Aceitunas palestinas 30g', 'Palästinensische Oliven 30g'],
  'لوبية بزيت لايت فلسطينية': ['Loubieh à lhuile palestinienne légère', 'Judías verdes en aceite palestinas ligeras', 'Palästinensische grüne Bohnen in Öl leicht'],
  'فاصوليا بزيت لايت فلسطينية': ['Fasoulia à lhuile palestinienne légère', 'Judías en aceite palestinas ligeras', 'Palästinensische Bohnen in Öl leicht'],
  'شوربة عدس لايت فلسطينية': ['Soupe de lentilles palestinienne légère', 'Sopa de lentejas palestina ligera', 'Palästinensische Linsensuppe leicht'],
  'شوربة دجاج لايت فلسطينية': ['Soupe de poulet palestinienne légère', 'Sopa de pollo palestina ligera', 'Palästinensische Hühnersuppe leicht'],
  'لبن بخيار لايت فلسطيني': ['Laban bi khiar palestinien léger', 'Yogur con pepino palestino ligero', 'Palästinensischer Gurkensalat leicht'],
  'بيض مسلوق فلسطيني': ['Œufs durs palestiniens', 'Huevos duros palestinos', 'Palästinensische gekochte Eier'],
  'زبادي فلسطيني': ['Yaourt palestinien', 'Yogur palestino', 'Palästinisches Joghurt'],
  'تونة ماء فلسطينية': ["Thon à l'eau palestinien", 'Atún al agua palestino', 'Palästinensischer Thunfisch in Wasser'],
  'تين فلسطيني': ['Figue palestinienne', 'Higo palestino', 'Palästinensische Feige'],
  'عنب فلسطيني': ['Raisin palestinien', 'Uva palestina', 'Palästinensische Weintraube'],
  'صبار تين شوكي فلسطيني 100جم': ['Figue de Barbarie palestinienne 100g', 'Higo chumbo palestino 100g', 'Palästinensische Kaktusfeige 100g'],
  'بطيخ فلسطيني': ['Pastèque palestinienne', 'Sandía palestina', 'Palästinensische Wassermelone'],
  'مشمش فلسطيني': ['Abricot palestinien', 'Albaricoque palestino', 'Palästinensische Aprikose'],
  'كنافة نابلسية لايت فلسطينية 60جم': ['Knafeh nabulsi palestinien léger 60g', 'Canafe nabulsi palestino ligero 60g', 'Palästinisches Nablus-Kanafeh leicht 60g'],
  'بقلاوة لايت فلسطينية 30جم': ['Baklava palestinienne légère 30g', 'Baklava palestina ligera 30g', 'Palästinisches Baklava leicht 30g'],
  'صفيحة لحم لايت فلسطينية 1': ['Sfiha palestinienne légère 1', 'Sfiha palestina ligera 1', 'Palästinisches Sfiha leicht 1'],
  'فطاير سبانخ لايت فلسطينية 1': ['Fatayer aux épinards palestinien léger 1', 'Fatayer de espinacas palestino ligero 1', 'Palästinisches Spinat-Fatayer leicht 1'],
  'سمبوسك لحم لايت فلسطيني 1': ['Sambousik palestinien léger 1', 'Sambusik palestino ligero 1', 'Palästinisches Fleisch-Sambusik leicht 1'],
  'قاورما لحم محفوظ فلسطيني 30جم': ['Kawarma palestinien 30g', 'Kawarma palestino 30g', 'Palästinensisches konserviertes Fleisch 30g'],
  'مقانق لايت فلسطينية 40جم': ['Makanek palestiniennes légères 40g', 'Makanek palestinos ligeros 40g', 'Palästinensische Makanek leicht 40g'],
  'قرنبيط مقلي لايت فلسطيني': ['Chou-fleur frit palestinien léger', 'Coliflor frita palestina ligera', 'Palästinensischer frittierter Blumenkohl leicht'],
  'مسقعة لايت فلسطينية': ['Moussaka palestinienne légère', 'Moussaka palestina ligera', 'Palästinensische Moussaka leicht'],
  'فاصوليا ورز لايت فلسطينية': ['Fasoulia riz palestinienne légère', 'Judías con arroz palestinas ligeras', 'Palästinensische Bohnen mit Reis leicht'],
  'بازيلا ورز لايت فلسطينية': ['Bazella riz palestinienne légère', 'Guisantes con arroz palestinos ligeros', 'Palästinensische Erbsen mit Reis leicht'],
  'رمان فلسطيني': ['Grenade palestinienne', 'Granada palestina', 'Palästinensischer Granatapfel'],
  'معمول تمر لايت فلسطيني 30جم': ['Maamoul aux dattes palestinien léger 30g', 'Maamoul de dátiles palestino ligero 30g', 'Palästinisches Dattel-Maamoul leicht 30g'],
  'قطايف عصافيري لايت فلسطينية 1': ['Atayef palestinien léger 1', 'Atayef palestino ligero 1', 'Palästinisches Atayef leicht 1'],
  'مهلبية لايت فلسطينية 80جم': ['Muhallabieh palestinien léger 80g', 'Muhalabiya palestina ligera 80g', 'Palästinisches Muhallabieh leicht 80g'],
  'رز بحليب لايت فلسطيني 80جم': ['Riz au lait palestinien léger 80g', 'Arroz con leche palestino ligero 80g', 'Palästinensischer Milchreis leicht 80g'],
  'بلح الشام لايت فلسطيني 30جم': ['Balah sham palestinien léger 30g', 'Balah sham palestino ligero 30g', 'Palästinensisches Balah-Sham leicht 30g'],
  'قطايف جوز لايت فلسطينية 1': ['Qatayef aux noix palestinien léger 1', 'Qatayef de nuez palestino ligero 1', 'Palästinensisches Walnuss-Qatayef leicht 1'],
  'صفيحة بعلبكية لايت فلسطينية 1': ['Sfiha baalbaki palestinienne légère 1', 'Sfiha baalbaki palestina ligera 1', 'Palästinisches Baalbek-Sfiha leicht 1'],
  'لحم بعجين لايت فلسطيني 1': ['Lahm bi ajeen palestinien léger 1', 'Lahm bi ajeen palestino ligero 1', 'Palästinisches Lahm bi Ajeen leicht 1'],
  'كباب حلبي لايت فلسطيني': ["Kebab d'Alep palestinien léger", 'Kebab aleppino palestino ligero', 'Palästinisches Aleppo-Kebab leicht'],
  'سجق فلسطيني لايت 30جم': ['Soujouk palestinien léger 30g', 'Soujouk palestino ligero 30g', 'Palästinensische Soujouk leicht 30g'],
  'زيتون أخضر فلسطيني 30جم': ['Olives vertes palestiniennes 30g', 'Aceitunas verdes palestinas 30g', 'Palästinensische grüne Oliven 30g'],
  'طرشي مخلل فلسطيني 40جم': ['Pickles palestiniens 40g', 'Encurtidos palestinos 40g', 'Palästinensische Pickles 40g'],
  'سلطة جرجير فلسطينية': ['Salade de roquette palestinienne', 'Ensalada de rúcula palestina', 'Palästinensischer Rucola-Salat'],
  'لبن بخيار سلطة فلسطينية': ['Salade laban bi khiar palestinienne', 'Ensalada de yogur y pepino palestina', 'Palästinensischer Gurkensalat in Joghurt'],
  'سلطة فلاحية فلسطينية': ['Salade fellah palestinienne', 'Ensalada campesina palestina', 'Palästinensischer Bauernsalat'],
  'بطاطا مقلية لايت فلسطينية': ['Pommes frites palestiniennes légères', 'Patatas fritas palestinas ligeras', 'Palästinensische Pommes leicht'],
  'فاصوليا ورز لايت فلسطينية 2': ['Fasoulia riz palestinienne légère 2', 'Judías con arroz palestinas ligeras 2', 'Palästinensische Bohnen mit Reis leicht 2'],
  'بازيلا ورز لايت فلسطينية 2': ['Bazella riz palestinienne légère 2', 'Guisantes con arroz palestinos ligeros 2', 'Palästinensische Erbsen mit Reis leicht 2'],
  'كباب باذنجان لايت فلسطيني': ["Kebab d'aubergine palestinien léger", 'Kebab de berenjena palestino ligero', 'Palästinisches Auberginen-Kebab leicht'],
  'داوود باشا كفتة لايت فلسطيني': ['Daoud bacha palestinien léger', 'Daoud basha palestino ligero', 'Palästinisches Daoud-Pascha leicht'],
  'شوربة فريكة لايت فلسطينية': ['Soupe de freekeh palestinienne légère', 'Sopa de freekeh palestina ligera', 'Palästinensische Freekeh-Suppe leicht'],
  'لبن جميد لايت فلسطيني 100جم': ['Laban jameed palestinien léger 100g', 'Laban jameed palestino ligero 100g', 'Palästinisches Jameed-Getränk leicht 100g'],
  'بطيخ أصفر فلسطيني': ['Melon jaune palestinien', 'Melón amarillo palestino', 'Palästinensische gelbe Melone'],
  'خوخ فلسطيني': ['Pêche palestinienne', 'Melocotón palestino', 'Palästinensischer Pfirsich'],
  'زيت زيتون فلسطيني 10جم': ["Huile d'olive palestinienne 10g", 'Aceite de oliva palestino 10g', 'Palästinensisches Olivenöl 10g'],
  'كعك بسمسم فلسطيني 60جم': ['Kaak au sésame palestinien 60g', 'Kaak de sésamo palestino 60g', 'Palästinisches Sesam-Kaak 60g'],
  'كعك أساور فلسطيني 40جم': ['Kaak asawer palestinien 40g', 'Kaak asawer palestino 40g', 'Palästinisches Kaak-Armband 40g'],
  'حلاوة الجبن لايت فلسطينية 50جم': ['Halawet el jibn palestinienne légère 50g', 'Halawet el jibn palestina ligera 50g', 'Palästinisches Käse-Süß leicht 50g'],
  'صفوف كركم لايت فلسطيني 40جم': ['Sfouf au curcuma palestinien léger 40g', 'Sfouf de cúrcuma palestino ligero 40g', 'Palästinisches Kurkuma-Sfouf leicht 40g'],
  'نمورة سميد لايت فلسطينية 40جم': ['Nammoura palestinienne légère 40g', 'Nammura palestina ligera 40g', 'Palästinensische Grieß-Nammara leicht 40g'],
  'كنافة نابلسية لايت فلسطينية 60جم 2': ['Knafeh nabulsi palestinien léger 60g 2', 'Canafe nabulsi palestino ligero 60g 2', 'Palästinisches Nablus-Kanafeh leicht 60g 2'],
  'قهوة عربية فلسطينية 2': ['Café arabe palestinien 2', 'Café árabe palestino 2', 'Palästinensischer arabischer Kaffee 2'],
  'جوانح دجاج لايت فلسطينية 2': ['Ailes de poulet palestiniennes légères 2', 'Alitas de pollo palestinas ligeras 2', 'Palästinensische Hähnchenflügel leicht 2'],
  'كبة صينية لايت فلسطينية': ['Kibbeh au four palestinien léger', 'Kibbeh al horno palestino ligero', 'Palästinisches Ofen-Kibbeh leicht'],
  'فاصوليا بزيت لايت فلسطينية 2': ['Fasoulia à lhuile palestinienne légère 2', 'Judías en aceite palestinas ligeras 2', 'Palästinensische Bohnen in Öl leicht 2'],
  'بامية بزيت لايت فلسطينية': ['Bamia à lhuile palestinienne légère', 'Bamya en aceite palestina ligera', 'Palästinisches Okra in Öl leicht'],
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
const badLangs = [];
const clamped = [];

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  const nameAr = r.name_ar.trim();
  const g = Number(r.grams);
  const kcal = Number(r.kcal);
  if (!Number.isFinite(g) || !g) { failed++; console.error(`Failed ${i + 1} bad grams`); continue; }
  let cal100 = Math.round((kcal / g) * 100);
  if (cal100 < 20) { clamped.push(`${nameAr} (${cal100}->20)`); cal100 = 20; }
  if (cal100 > 900) { clamped.push(`${nameAr} (${cal100}->900)`); cal100 = 900; }
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
      source: 'المطبخ الفلسطيني التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_palestinian', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${nameAr}" (meal=${MEAL[r.mealType] ?? 'lunch'}, cal=${cal100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== PALESTINE LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (clamped.length) console.log('Clamped cal_100  :', clamped.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;