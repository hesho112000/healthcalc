// Migrates the 100 existing Jordanian dishes (src/data/jordanian-full-100-USDA.json) to
// Supabase. Source rows have only name_ar/name_en -> full FR/ES/DE translations are keyed
// by exact name_ar. Region: pan_jordanian (golden rule). Meal types mapped from the row's
// mealType bucket. cal_100 is clamped into [20,900] (tiny drinks like coffee would round
// below the integrity floor).
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

const rows = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/jordanian-full-100-USDA.json'), 'utf8'));

const T = {
  'منقوشة زعتر لايت أردنية 1': ['Manakish zaatar jordanien léger 1', 'Manakish zaatar jordano ligero 1', 'Jordanisches Zaatar-Manakish leicht 1'],
  'كعك القدس أردني 60جم': ['Kaak al-Quds jordanien 60g', 'Kaak de Jerusalén jordano 60g', 'Jordanisches Jerusalem-Kaak 60g'],
  'فلافل لايت أردنية 3': ['Falafel jordanien léger 3', 'Falafel jordano ligero 3', 'Jordanisches Falafel leicht 3'],
  'فول مدمس لايت أردني': ['Foul moudammas jordanien léger', 'Ful medames jordano ligero', 'Jordanisches Ful-Mudammas leicht'],
  'فتة حمص لايت أردنية': ['Fatteh houmous jordanien léger', 'Fatteh de hummus jordano ligero', 'Jordanisches Hummus-Fatteh leicht'],
  'لبنة زعتر أردنية 40جم': ['Labneh zaatar jordanien 40g', 'Labneh zaatar jordano 40g', 'Jordanisches Zaatar-Labneh 40g'],
  'قلاية بندورة طماطم لايت أردنية': ['Qalayet bandora jordanien léger', 'Qalayet bandura jordano ligero', 'Jordanisches Tomaten-Galayet leicht'],
  'قهوة عربية أردنية': ['Café arabe jordanien', 'Café árabe jordano', 'Jordanischer arabischer Kaffee'],
  'منسف لايت أردني': ['Mansaf jordanien léger', 'Mansaf jordano ligero', 'Jordanisches Mansaf leicht'],
  'زرب بدوي لحم حفرة لايت أردني': ['Zarb bédouin jordanien léger', 'Zarb beduino jordano ligero', 'Jordanisches Beduinen-Zarb leicht'],
  'مقلوبة دجاج لايت أردنية': ['Maqluba de poulet jordanienne légère', 'Maqluba de pollo jordana ligera', 'Jordanische Hühner-Maqluba leicht'],
  'كبسة دجاج لايت أردنية': ['Kabsa de poulet jordanienne légère', 'Kabsa de pollo jordana ligera', 'Jordanische Hühner-Kabsa leicht'],
  'فريكة لحم لايت أردنية': ['Freekeh à la viande jordanien léger', 'Freekeh con carne jordano ligero', 'Jordanisches Freekeh mit Fleisch leicht'],
  'ملوخية لايت أردنية': ['Mlukhiyeh jordanienne légère', 'Mlukhiya jordana ligera', 'Jordanisches Mlukhiye leicht'],
  'كبة لايت أردنية 1': ['Kibbeh jordanien léger 1', 'Kibbeh jordano ligero 1', 'Jordanisches Kibbeh leicht 1'],
  'كفتة بصينية لايت أردنية': ['Kofta au four jordanienne légère', 'Kofta al horno jordana ligera', 'Jordanische Ofen-Kofta leicht'],
  'شيش كباب لايت أردني': ['Chiche kebab jordanien léger', 'Shish kebab jordano ligero', 'Jordanisches Shish-Kebab leicht'],
  'شيش طاووق لايت أردني': ['Chiche taouk jordanien léger', 'Shish taouk jordano ligero', 'Jordanisches Shish-Taouk leicht'],
  'كفتة كباب لايت أردنية': ['Kofta kebab jordanienne légère', 'Kofta kebab jordana ligera', 'Jordanische Kofta-Kebab leicht'],
  'قلاية بندورة لايت أردنية': ['Qalayet bandora jordanien léger 2', 'Qalayet bandura jordano ligero 2', 'Jordanisches Tomaten-Galayet leicht 2'],
  'رشوف عدس جميد لايت أردني': ['Rshaif lentilles jameed jordanien léger', 'Rshaif lentejas jameed jordano ligero', 'Jordanisches Linsen-Jameed-Rshaif leicht'],
  'فتة دجاج لايت أردنية': ['Fatteh de poulet jordanienne légère', 'Fatteh de pollo jordana ligera', 'Jordanisches Hühner-Fatteh leicht'],
  'شاورما دجاج لايت أردنية': ['Chawarma de poulet jordanienne légère', 'Shawarma de pollo jordano ligero', 'Jordanisches Hühnchen-Shawarma leicht'],
  'شاورما لحم لايت أردنية': ['Chawarma de buf jordanienne légère', 'Shawarma de res jordano ligero', 'Jordanisches Rind-Shawarma leicht'],
  'حمص أردني 60جم': ['Houmous jordanien 60g', 'Hummus jordano 60g', 'Jordanisches Hummus 60g'],
  'متبل باذنجان أردني 60جم': ['Moutabal jordanien 60g', 'Mutabal jordano 60g', 'Jordanisches Auberginen-Mutabal 60g'],
  'بابا غنوج أردني 60جم': ['Baba ganoush jordanien 60g', 'Baba ghanoush jordano 60g', 'Jordanisches Baba-Ghanoush 60g'],
  'تبولة لايت أردنية': ['Taboulé jordanien léger', 'Tabule jordano ligero', 'Jordanisches Taboulé leicht'],
  'فتوش لايت أردني': ['Fattoush jordanien léger', 'Fattush jordano ligero', 'Jordanisches Fattoush leicht'],
  'سلطة بنادورة طماطم أردنية': ['Salade de tomates jordanienne', 'Ensalada de tomate jordana', 'Jordanischer Tomatensalat'],
  'لبنة أردنية 40جم': ['Labneh jordanien 40g', 'Labneh jordano 40g', 'Jordanisches Labneh 40g'],
  'جبنة بيضاء أردنية 30جم': ['Fromage blanc jordanien 30g', 'Queso blanco jordano 30g', 'Jordanischer weißer Käse 30g'],
  'جميد لبن مجفف أردني 20جم': ['Jameed jordanien 20g', 'Jameed jordano 20g', 'Jordanisches Jameed 20g'],
  'ورق عنب لايت أردني 3': ['Feuilles de vigne farcies jordaniennes légères 3', 'Hojas de parra jordanas ligeras 3', 'Jordanische gefüllte Weinblätter leicht 3'],
  'كوسا محشي لايت أردني': ['Courgettes farcies jordaniennes légères', 'Calabacines rellenos jordanos ligeros', 'Jordanische gefüllte Zucchini leicht'],
  'بطاطا حارة لايت أردنية': ['Batata harra jordanienne légère', 'Patatas picantes jordanas ligeras', 'Jordanische scharfe Kartoffeln leicht'],
  'مكدوس باذنجان محشي أردني 30جم': ['Makdous jordanien 30g', 'Makdus jordano 30g', 'Jordanisches Makdous 30g'],
  'زيتون أردني 30جم': ['Olives jordaniennes 30g', 'Aceitunas jordanas 30g', 'Jordanische Oliven 30g'],
  'لوبية بزيت لايت أردنية': ['Loubieh à lhuile jordanienne légère', 'Judías verdes en aceite jordanas ligeras', 'Jordanische grüne Bohnen in Öl leicht'],
  'فاصوليا بزيت لايت أردنية': ['Fasoulia à lhuile jordanienne légère', 'Judías en aceite jordanas ligeras', 'Jordanische Bohnen in Öl leicht'],
  'شوربة عدس لايت أردنية': ['Soupe de lentilles jordanienne légère', 'Sopa de lentejas jordana ligera', 'Jordanische Linsensuppe leicht'],
  'شوربة دجاج لايت أردنية': ['Soupe de poulet jordanienne légère', 'Sopa de pollo jordana ligera', 'Jordanische Hühnersuppe leicht'],
  'لبن بخيار لايت أردني': ['Laban bi khiar jordanien léger', 'Yogur con pepino jordano ligero', 'Jordanischer Gurkensalat in Joghurt leicht'],
  'بيض مسلوق أردني': ['Œufs durs jordaniens', 'Huevos duros jordanos', 'Jordanische gekochte Eier'],
  'زبادي أردني': ['Yaourt jordanien', 'Yogur jordano', 'Jordanisches Joghurt'],
  'تونة ماء أردنية': ["Thon à l'eau jordanien", 'Atún al agua jordano', 'Jordanischer Thunfisch in Wasser'],
  'تين أردني': ['Figue jordanienne', 'Higo jordano', 'Jordanische Feige'],
  'عنب أردني': ['Raisin jordanien', 'Uva jordana', 'Jordanische Weintraube'],
  'بطيخ أردني': ['Pastèque jordanienne', 'Sandía jordana', 'Jordanische Wassermelone'],
  'رمان أردني': ['Grenade jordanienne', 'Granada jordana', 'Jordanischer Granatapfel'],
  'مشمش أردني': ['Abricot jordanien', 'Albaricoque jordano', 'Jordanische Aprikose'],
  'كنافة نابلسية لايت أردنية 60جم': ['Knafeh nabulsi jordanien léger 60g', 'Canafe nabulsi jordano ligero 60g', 'Jordanisches Nablus-Kanafeh leicht 60g'],
  'بقلاوة لايت أردنية 30جم': ['Baklava jordanienne légère 30g', 'Baklava jordana ligera 30g', 'Jordanisches Baklava leicht 30g'],
  'صفيحة لحم لايت أردنية 1': ['Sfiha jordanienne légère 1', 'Sfiha jordana ligera 1', 'Jordanisches Sfiha leicht 1'],
  'فطاير سبانخ لايت أردنية 1': ['Fatayer aux épinards jordanien léger 1', 'Fatayer de espinacas jordano ligero 1', 'Jordanisches Spinat-Fatayer leicht 1'],
  'سمبوسك لحم لايت أردني 1': ['Sambousik jordanien léger 1', 'Sambusik jordano ligero 1', 'Jordanisches Fleisch-Sambusik leicht 1'],
  'قاورما لحم محفوظ أردني 30جم': ['Kawarma jordanien 30g', 'Kawarma jordano 30g', 'Jordanisches eingelegtes Fleisch 30g'],
  'مقانق لايت أردنية 40جم': ['Makanek jordaniennes légères 40g', 'Makanek jordanos ligeros 40g', 'Jordanische Makanek-Wurst leicht 40g'],
  'قرنبيط مقلي لايت أردني': ['Chou-fleur frit jordanien léger', 'Coliflor frita jordana ligera', 'Jordanischer frittierter Blumenkohl leicht'],
  'مسقعة لايت أردنية': ['Moussaka jordanienne légère', 'Moussaka jordana ligera', 'Jordanische Moussaka leicht'],
  'فاصوليا ورز لايت أردنية': ['Fasoulia riz jordanienne légère', 'Judías con arroz jordanas ligeras', 'Jordanische Bohnen mit Reis leicht'],
  'بازيلا ورز لايت أردنية': ['Bazella riz jordanienne légère', 'Guisantes con arroz jordanos ligeros', 'Jordanische Erbsen mit Reis leicht'],
  'مجدرة عدس أرز لايت أردنية': ['Moudjaddara jordanienne légère', 'Mujaddara jordana ligera', 'Jordanische Mujaddara leicht'],
  'شوربة فريكة لايت أردنية': ['Soupe de freekeh jordanienne légère', 'Sopa de freekeh jordana ligera', 'Jordanische Freekeh-Suppe leicht'],
  'معمول تمر لايت أردني 30جم': ['Maamoul aux dattes jordanien léger 30g', 'Maamoul de dátiles jordano ligero 30g', 'Jordanisches Dattel-Maamoul leicht 30g'],
  'قطايف عصافيري لايت أردنية 1': ['Atayef jordanien léger 1', 'Atayef jordano ligero 1', 'Jordanisches Atayef leicht 1'],
  'مهلبية لايت أردنية 80جم': ['Muhallabieh jordanien léger 80g', 'Muhalabiya jordana ligera 80g', 'Jordanisches Muhallabieh leicht 80g'],
  'رز بحليب لايت أردني 80جم': ['Riz au lait jordanien léger 80g', 'Arroz con leche jordano ligero 80g', 'Jordanischer Milchreis leicht 80g'],
  'لبن جميد لايت أردني 100جم': ['Jameed liquids jordanien léger 100g', 'Jameed líquido jordano ligero 100g', 'Jordanisches Jameed-Getränk leicht 100g'],
  'صفيحة بعلبكية لايت أردنية 1': ['Sfiha baalbaki jordanienne légère 1', 'Sfiha baalbaki jordana ligera 1', 'Jordanisches Baalbek-Sfiha leicht 1'],
  'لحم بعجين لايت أردني 1': ['Lahm bi ajeen jordanien léger 1', 'Lahm bi ajeen jordano ligero 1', 'Jordanisches Lahm bi Ajeen leicht 1'],
  'كباب حلبي لايت أردني': ["Kebab d'Alep jordanien léger", 'Kebab aleppino jordano ligero', 'Jordanisches Aleppo-Kebab leicht'],
  'كباب خشخاش لايت أردني': ['Kebab khachkhach jordanien léger', 'Kebab khashkhash jordano ligero', 'Jordanisches Khashkhash-Kebab leicht'],
  'سجق أردني لايت 30جم': ['Soujouk jordanien léger 30g', 'Soujouk jordano ligero 30g', 'Jordanische Soujouk leicht 30g'],
  'زيتون أخضر أردني 30جم': ['Olives vertes jordaniennes 30g', 'Aceitunas verdes jordanas 30g', 'Jordanische grüne Oliven 30g'],
  'طرشي مخلل أردني 40جم': ['Pickles jordaniens 40g', 'Encurtidos jordanos 40g', 'Jordanische Pickles 40g'],
  'سلطة جرجير أردنية': ['Salade de roquette jordanienne', 'Ensalada de rúcula jordana', 'Jordanischer Rucola-Salat'],
  'لبن بخيار سلطة أردنية': ['Salade laban bi khiar jordanienne', 'Ensalada de yogur y pepino jordana', 'Jordanischer Gurkensalat in Joghurt'],
  'سلطة فلاحية أردنية': ['Salade fellah jordanienne', 'Ensalada campesina jordana', 'Jordanischer Bauernsalat'],
  'بطاطا مقلية لايت أردنية': ['Pommes frites jordaniennes légères', 'Patatas fritas jordanas ligeras', 'Jordanische Pommes leicht'],
  'فاصوليا ورز لايت أردنية 2': ['Fasoulia riz jordanienne légère 2', 'Judías con arroz jordanas ligeras 2', 'Jordanische Bohnen mit Reis leicht 2'],
  'بازيلا ورز لايت أردنية 2': ['Bazella riz jordanienne légère 2', 'Guisantes con arroz jordanos ligeros 2', 'Jordanische Erbsen mit Reis leicht 2'],
  'كباب باذنجان لايت أردني': ["Kebab d'aubergine jordanien léger", 'Kebab de berenjena jordano ligero', 'Jordanisches Auberginen-Kebab leicht'],
  'داوود باشا كفتة لايت أردني': ['Daoud bacha jordanien léger', 'Daoud basha jordano ligero', 'Jordanisches Daoud-Pascha-Kofta leicht'],
  'لبن جميد لايت أردني 100جم 2': ['Jameed liquids jordanien léger 100g 2', 'Jameed líquido jordano ligero 100g 2', 'Jordanisches Jameed-Getränk leicht 100g 2'],
  'بطيخ أصفر أردني': ['Melon jaune jordanien', 'Melón amarillo jordano', 'Jordanische gelbe Melone'],
  'خوخ أردني': ['Pêche jordanienne', 'Melocotón jordano', 'Jordanischer Pfirsich'],
  'زيت زيتون أردني 10جم': ["Huile d'olive jordanienne 10g", 'Aceite de oliva jordano 10g', 'Jordanisches Olivenöl 10g'],
  'كعك بسمسم أردني 60جم': ['Kaak au sésame jordanien 60g', 'Kaak de sésamo jordano 60g', 'Jordanisches Sesam-Kaak 60g'],
  'كعك أساور أردني 40جم': ['Kaak asawer jordanien 40g', 'Kaak asawer jordano 40g', 'Jordanisches Kaak-Armband 40g'],
  'حلاوة الجبن لايت أردنية 50جم': ['Halawet el jibn jordanienne légère 50g', 'Halawet el jibn jordana ligera 50g', 'Jordanisches Käse-Süß leicht 50g'],
  'صفوف كركم لايت أردني 40جم': ['Sfouf au curcuma jordanien léger 40g', 'Sfouf de cúrcuma jordano ligero 40g', 'Jordanisches Kurkuma-Sfouf leicht 40g'],
  'نمورة سميد لايت أردنية 40جم': ['Nammoura jordanienne légère 40g', 'Nammura jordana ligera 40g', 'Jordanische Grieß-Nammara leicht 40g'],
  'كنافة نابلسية لايت أردنية 60جم 2': ['Knafeh nabulsi jordanien léger 60g 2', 'Canafe nabulsi jordano ligero 60g 2', 'Jordanisches Nablus-Kanafeh leicht 60g 2'],
  'قلاية بندورة أردنية 2': ['Qalayet bandora jordanien 2', 'Qalayet bandura jordano 2', 'Jordanisches Tomaten-Galayet 2'],
  'جوانح دجاج لايت أردنية 2': ['Ailes de poulet jordaniennes légères 2', 'Alitas de pollo jordanas ligeras 2', 'Jordanische Hähnchenflügel leicht 2'],
  'كبة صينية لايت أردنية': ['Kibbeh au four jordanien léger', 'Kibbeh al horno jordano ligero', 'Jordanisches Ofen-Kibbeh leicht'],
  'فاصوليا بزيت لايت أردنية 2': ['Fasoulia à lhuile jordanienne légère 2', 'Judías en aceite jordanas ligeras 2', 'Jordanische Bohnen in Öl leicht 2'],
  'بامية بزيت لايت أردنية': ['Bamia à lhuile jordanienne légère', 'Bamya en aceite jordana ligera', 'Jordanisches Okra in Öl leicht'],
  'قهوة عربية أردنية 2': ['Café arabe jordanien 2', 'Café árabe jordano 2', 'Jordanischer arabischer Kaffee 2'],
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
      source: 'المطبخ الأردني التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_jordanian', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${nameAr}" (meal=${MEAL[r.mealType] ?? 'lunch'}, cal=${cal100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== JORDAN LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (clamped.length) console.log('Clamped cal_100  :', clamped.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;