// FIX: the 500 gulf-expansion-2026 rows inserted with cal_100 = NULL/0 (all macros
// empty, base_serving_g/base_cal_serv null) produce 0-calorie dishes in meal plans,
// which pulls days far below target (the -37% deficit bug). This script assigns a
// realistic per-100g cal_100 (plus protein/carbs/fat estimates and base_serving_g=100,
// base_cal_serv=cal_100 so the hook's cal_serv becomes > 0) via a keyword classifier.
// Genuinely zero-cal beverages (plain/black coffee, unsweetened herbal teas) stay at 0
// per the product rule ("leave water / black coffee / unsweetened tea at 0").
//
// Usage: node scripts/fix-zero-cal-gulf.js          (writes to Supabase)
//        node scripts/fix-zero-cal-gulf.js --dry-run (only prints assignments/report)
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['levant-migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or service key in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

function normalize(s) {
  return (s ?? '')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---- Category macro values (per 100 g) ----------------------------------
const CATS = {
  zeroDrink:   { cal: 0,   p: 0,   c: 0,   f: 0   },
  juice:       { cal: 45,  p: 0.9, c: 11,  f: 0.2 },
  sweetDrink:  { cal: 60,  p: 1,   c: 15,  f: 0.1 },
  milkDrink:   { cal: 75,  p: 2.2, c: 12,  f: 2   },
  smoothie:    { cal: 92,  p: 1.6, c: 19,  f: 1.2 },
  salep:       { cal: 95,  p: 3,   c: 16,  f: 2   },
  dairyMilk:   { cal: 60,  p: 3.2, c: 4.8, f: 3.3 },
  yogurt:      { cal: 62,  p: 3.5, c: 4.6, f: 3.3 },
  cheese:      { cal: 320, p: 20,  c: 2,   f: 26  },
  labneh:      { cal: 140, p: 7,   c: 6,   f: 11  },
  ghee:        { cal: 880, p: 0.3, c: 0,   f: 98  },
  egg:         { cal: 150, p: 13,  c: 1.1, f: 10  },
  shakshouka:  { cal: 145, p: 10,  c: 6,   f: 9   },
  bread:       { cal: 255, p: 8.5, c: 49,  f: 3.5 },
  breadBarley: { cal: 225, p: 8,   c: 42,  f: 2.5 },
  breadSweet:  { cal: 325, p: 8,   c: 56,  f: 8   },
  breadFilled: { cal: 310, p: 12,  c: 43,  f: 10  },
  breadFried:  { cal: 320, p: 10,  c: 38,  f: 14  },
  breadSesame: { cal: 295, p: 9.5, c: 47,  f: 7   },
  manakish:    { cal: 300, p: 10,  c: 40,  f: 11  },
  falafel:     { cal: 185, p: 13,  c: 18,  f: 8   },
  foul:        { cal: 125, p: 8.5, c: 18,  f: 2.5 },
  masoubBalaleet: { cal: 265, p: 8, c: 43, f: 7   },
  porridge:    { cal: 140, p: 11,  c: 19,  f: 2.5 },
  riceMixed:   { cal: 190, p: 15,  c: 25,  f: 4   },
  riceSeafood: { cal: 175, p: 14,  c: 26,  f: 2.5 },
  ricePlain:   { cal: 140, p: 3.2, c: 30,  f: 0.5 },
  riceDate:    { cal: 220, p: 3.5, c: 47,  f: 2.5 },
  riceDessert: { cal: 185, p: 4,   c: 34,  f: 3.5 },
  noodles:     { cal: 140, p: 5,   c: 24,  f: 2.5 },
  lambStuffed: { cal: 260, p: 21,  c: 6,   f: 17  },
  camel:       { cal: 185, p: 25,  c: 0.5, f: 9   },
  stewMeat:    { cal: 170, p: 13,  c: 9,   f: 9   },
  stewVeg:     { cal: 130, p: 6,   c: 10,  f: 7   },
  fishStew:    { cal: 110, p: 15,  c: 3,   f: 4.5 },
  lentil:      { cal: 115, p: 8,   c: 17,  f: 1.5 },
  spinach:     { cal: 85,  p: 8,   c: 5,   f: 3.5 },
  molokhia:    { cal: 75,  p: 7,   c: 4,   f: 4   },
  stuffedLeaves: { cal: 130, p: 5, c: 14,  f: 6   },
  soup:        { cal: 65,  p: 4,   c: 7,   f: 2.5 },
  soupMeat:    { cal: 95,  p: 7,   c: 7,   f: 4   },
  soupCreamy:  { cal: 105, p: 4,   c: 9,   f: 6   },
  grillMeat:   { cal: 240, p: 25,  c: 3,   f: 14  },
  grillChicken: { cal: 210, p: 26, c: 2,   f: 11  },
  grillVeg:    { cal: 110, p: 4,   c: 9,   f: 7   },
  fishGrill:   { cal: 165, p: 22,  c: 1.5, f: 8   },
  fishFried:   { cal: 220, p: 20,  c: 9,   f: 12  },
  fishCrab:    { cal: 130, p: 18,  c: 1.5, f: 6   },
  shrimp:      { cal: 145, p: 20,  c: 1.5, f: 6   },
  hummusMeat:  { cal: 190, p: 9,   c: 16,  f: 11  },
  salad:       { cal: 55,  p: 1.8, c: 7,   f: 2.5 },
  saladTahini: { cal: 110, p: 3.5, c: 11,  f: 7   },
  beanSalad:   { cal: 110, p: 6,   c: 12,  f: 4   },
  pickles:     { cal: 25,  p: 1,   c: 5,   f: 0.3 },
  dessert:     { cal: 300, p: 5,   c: 45,  f: 12  },
  dessertLight: { cal: 110, p: 4,  c: 18,  f: 3   },
  dessertCake: { cal: 350, p: 5.5, c: 48,  f: 15  },
  dessertCookie: { cal: 330, p: 5, c: 50,  f: 12  },
  dessertBaklava: { cal: 420, p: 6, c: 45, f: 24  },
  dessertHalva: { cal: 450, p: 12, c: 45,  f: 27  },
  dessertSesame: { cal: 430, p: 12, c: 24, f: 34  },
  dateSweet:   { cal: 330, p: 4,   c: 60,  f: 10  },
  umAli:       { cal: 320, p: 8,   c: 40,  f: 14  },
  dates:       { cal: 282, p: 2.5, c: 75,  f: 0.4 },
  fruit:       { cal: 50,  p: 1,   c: 12,  f: 0.3 },
  bananaFried: { cal: 210, p: 2.5, c: 33,  f: 9   },
  zaatar:      { cal: 420, p: 12,  c: 45,  f: 22  },
};

const FISH = /سمك|fish|روبيان|شريمب|shrimp|قريدس|prawn|جربير|كنعد|kanad|زبيدي|zubaidi|هامور|hamour|قباقب|crab|لوبستر|lobster|محار|oyster|حبار|squid|سلمون|salmon|تونة|tuna|سردين|sardine|بوري|ناجل|najil|سيباس|sea bass|لبستر/;
const CHICKEN = /دجاج|chicken|أوراك|طواوق|تاووق/;
const MEAT = /لحم|مmeat|غنم|lamb|حاشي|camel|بقر|beef|برغ|جدي|سجق|sausage|كبدة|liver/;
const RICE = /مجبوس|مكبوس|macboos|machboos|برياني|biryani|كبسة|kabsa|قوزي|quzi|مندي|mandi|مضغوط|madghoot|مقلوبة|maqluba|مشخول|mashkhol|مثلوثة|mathloutha|رز|أرز|rice|صيادية|sayyadia|زربيان|zurbian|بلوف/;

function classify(nameAr, nameEn, mealType) {
  const n = `${normalize(nameAr)} ${nameEn ?? ''}`.toLowerCase();
  const has = (re) => re.test(n);

  // 0) Pure zero-cal beverages: water, plain/black coffee, unsweetened teas.
  if (has(/^ماء$|^water$/)) return 'zeroDrink';
  const isTea = has(/شاي|\btea\b/);
  if (isTea && !has(/حليب|لبن|milk|مكثف|سكر|sugar|عسل|honey|قشطة|cream|كريمة/)) return 'zeroDrink';
  const isCoffee = has(/قهوة|قهوه|\bcoffee\b/);
  if (isCoffee && !has(/حليب|لبن|milk|مكثف|سكر|sugar|عسل|honey|قشطة|cream|كريمة/)) return 'zeroDrink';

  // 1) Calorie-bearing drinks.
  if (has(/سحلب|salep/)) return 'salep';
  if (has(/ميلك شيك|ميك شيك|milkshake/)) return 'smoothie';
  if (has(/عصير موز|banana smoothie|موز مع حليب/)) return 'smoothie';
  if (has(/حليب.*(مانجا|مانجو)|\bmango.*milk|جوافة.*(حليب|milk)|guava.*milk|عصير الجوافه/)) return 'milkDrink';
  if (has(/(شاي|tea).*(حليب|لبن|milk|مكثف|condensed)/)) return 'milkDrink';
  if (has(/جلاب|jallab/)) return 'sweetDrink';
  if (has(/قمر الدين|amardine/)) return 'sweetDrink';
  if (has(/شراب.*هندي|تمر هندي|tamarind/)) return 'sweetDrink';
  if (has(/شربات|sherbet/)) return 'sweetDrink';
  if (has(/ليمون نعناع|iced lemon|lemon mint/)) return 'juice';
  if (has(/الكركديه|hibiscus/)) return 'juice';
  if (has(/زنجبيل|ginger/)) return 'juice';
  if (has(/عصير|juice/)) return 'juice';

  // 2) Salads, dips, pickles (before anything that contains "مشوي").
  if (has(/سلطة.*حمص|chickpea.*salad/)) return 'beanSalad';
  if (has(/طماطم باللبنه|tomatoes? with? labneh/)) return 'saladTahini';
  if (has(/خيار باللبن|cucumbers? in yogurt|yogurt.*cucumber/)) return 'saladTahini';
  if (has(/سلطه الرز|cold rice salad/)) return 'salad';
  if (has(/متبل|mutabal/)) return 'saladTahini';
  if (has(/دقوس|dakkous/)) return 'pickles';
  if (has(/طرشي|torshi/) || has(/مخلل|pickled/)) return 'pickles';
  if (has(/سلطه|salad/)) return 'salad';

  // 3) Soups.
  if (has(/شوربه|shorba|soup/)) {
    if (has(/كريمه|creamy/)) return 'soupCreamy';
    if (has(FISH)) return 'soupMeat';
    if (has(MEAT) || has(CHICKEN)) return 'soupMeat';
    return 'soup';
  }

  // 4) Desserts / sweets / cakes / biscuits.
  if (has(/خبز الموز|banana bread|كيك|cake/)) return 'dessertCake';
  if (has(/بقلاوه|baklava/)) return 'dessertBaklava';
  if (has(/طحينيه|طحينه|halva/)) return 'dessertHalva';
  if (has(/خبيص بالسمسم|حلوة السمسم|حلاوة السمسم/)) return 'dessertSesame';
  if (has(/بسكويت|cookie|معمول|maamoul|كعك|kaak/)) return 'dessertCookie';
  if (has(/ام علي|um ali/)) return 'umAli';
  if (has(/فرني|fern/)) return 'dessertLight';
  if (has(/لقيمات لايت|luqaimat light/)) return 'dessertLight';
  if (has(/كاسترد|custard/)) return has(/تمر|date/) ? 'dateSweet' : 'dessert';
  if (has(/مهلبيه|muhallabia/)) return has(/تمر|date/) ? 'riceDessert' : 'riceDessert';
  if (has(/بسبوسه|basbousa/)) return 'dessert';
  if (has(/كراميل بالتمر|date caramel/)) return 'dateSweet';
  if (has(/بثيثه|bathitha|فوقه|foga|خنفروش|khunfroosh/)) return 'dateSweet';
  if (has(/عصيده|asida|حلاوة|حلوى|حلو(?!م)|dessert|حلى|حلويات|لقيمات|luqaimat|خبيص/)) {
    if (has(/تمر|date|دبس|molasses|عسل|honey/)) return 'dateSweet';
    if (has(/سمسم|sesame/)) return 'dessertSesame';
    return 'dessert';
  }
  if (has(/معصوب|masoub|بلاليط|balaleet/)) return 'masoubBalaleet';
  if (has(/موز مقلي|fried banana/)) return 'bananaFried';
  if (has(/سمبوسه حلوة|sweet samboosa/)) return 'dessert';
  if (has(/مطبق بالتمر|date.*mutabbaq/)) return 'breadSweet';

  // 5) Eggs / omelettes / shakshouka / ghee / falafel / foul / manakish.
  if (has(/شكشوكه|shakshouka/)) return 'shakshouka';
  if (has(/بيض|بيضة|egg|بسطرمه|pastrami|أومليت|omelet/)) return has(/زبده|ghee|butter/) ? 'egg' : 'egg';
  if (has(/^سمن|ghee$/)) return 'ghee';
  if (has(/فلافل|falafel/)) return 'falafel';
  if (has(/مناقيش|manakish/)) return 'manakish';
  if (has(/فول|foul|فول مقاوم/)) return 'foul';

  // 6) Breads & fried pastries.
  if (has(/رقاق بالمرق|regag.*broth/)) return 'bread';
  if (has(/خمير بالعسل|قرص بالعسل|رقاق بالزبده والتمر|مشلتت بالدبس|صمون محشو بالتمر|رقاق بالعسل|خمير بالتمر|خمير بالزبده|جباب بحشوه التمر|جباب بالزعفران|رقاق بالزعفران|رقاق بالزبده|خبز التمر|date bread/)) return 'breadSweet';
  if (has(/مطبق|mutabbaq/)) return 'breadFried';
  if (has(/سمبوسه|samboosa/)) return 'breadFried';
  if (has(/صمون محشو|stuffed.*samoon|محشي.*(باللحم|meat)|رقاق مدهون/)) return 'breadFilled';
  if (has(/عيش بشعير|barley bread|خبز شعير/)) return 'breadBarley';
  if (has(/سمسم.*(سسم)|sesame/)) return 'breadSesame';
  if (has(/صمون|samoon|خبز|عيش|bread|رغيف|تنور|تانور|شراك|شريك|rogh|خبز قمح|خبز الحبوب|corn bread|خبز ذرة|millet|خبز الدخن/)) return 'bread';

  // 7) Rice-based mains & rice desserts.
  if (has(/رز بالتمر|ارز بالتمر|date rice|رز بالزبيب واللوز|raisin almond rice|محمر بالسمك|muhammar/)) return 'riceDate';
  if (has(/مكبوس ملوخيه|كبسه ملوخيه/)) return 'riceMixed';
  if (has(/أرز بالحليب|ارز بالحليب|رز بالحليب|rice pudding|saleeg.*milk|سليق بالحليب/)) return 'riceDessert';
  if (has(RICE)) {
    if (has(FISH)) return 'riceSeafood';
    return 'riceMixed';
  }
  if (has(/مكرونه|معكرونه|pasta|شعريه|vermicelli|نودلز|noodles/)) return 'noodles';
  if (has(/هريس|jiriش|جريش|عرسيه|ارسیا|freekeh|فريكه|مرقوقه|margooga/)) return 'porridge';

  // 8) Grills / roasts / skewers.
  if (has(/سلط/)) return 'salad';
  if (has(/مشوي|grill|شواية|فحم|charcoal|كباب|kebab|شيش|shish|كفتة|kofta|ستيك|steak|مشاوي|سجق|sausage|شاورما|shawarma|بالفرن|oven/)) {
    if (has(/خضار|vegetable/)) return 'grillVeg';
    if (has(FISH)) return has(/روبيان|قريدس|شريمب|shrimp|حبار|squid/) ? 'shrimp' : 'fishGrill';
    if (has(CHICKEN)) return 'grillChicken';
    return 'grillMeat';
  }

  // 9) Lamb-leading dishes (stewed, not grilled).
  if (has(/^لحم\s/)) return 'stewMeat';
  if (has(/حمص باللحم|hummus.*meat/)) return 'hummusMeat';

  // 10) Seafood.
  if (has(FISH)) {
    if (has(/مقلي|fried/)) return has(/روبيان|قريدس|شريمب|shrimp/) ? 'shrimp' : 'fishFried';
    if (has(/قباقب|crab|لوبستر|lobster|محار|oyster|لبستر/)) return 'fishCrab';
    if (has(/روبيان|قريدس|شريمب|shrimp|حبار|squid/)) return 'shrimp';
    return 'fishGrill';
  }

  // 11) Camel main dishes.
  if (has(/حاشي|camel/)) return 'camel';
  if (has(/خروف محشي|stuffed.*lamb/)) return 'lambStuffed';
  if (has(/ورق عنب|grape leaves|محشيه بالرز|مشبع الكرنب|stuffed cabbage/)) return 'stuffedLeaves';

  // 12) Stews.
  if (has(/عدس|lentil/)) return 'lentil';
  if (has(/سبانخ|spinach/)) return 'spinach';
  if (has(/ملوخيه|molokhia/)) return 'molokhia';
  if (has(/لحم بالتمر|lamb.*dates/)) return 'stewMeat';
  if (has(/إيدام|idam|طبعيخه|tabaikha|صالونه|saloona|يخنه|stew|مرق|thareed|ثريد|طاجن|tajin|مسقعه|moussaka|فاصولياء|fava|باميه|okra|لوبيا|beans|بازيلا|peas|كوسا|zucchini|قرع|potato|بطاطس|محشوش|mahshoush|باذنجان|eggplant|لحم بقلوب/)) {
    if (has(FISH)) return 'fishStew';
    if (has(MEAT) || has(CHICKEN)) return 'stewMeat';
    return 'stewVeg';
  }

  // 13) Dates / fruits / dairy.
  if (has(/تمر|date|رطب|rutab|نواشف|dried fruit/)) {
    if (has(/زبده|ghee|butter|فط|pastr|كراميل|caramel|دبس|molasses|كعك|حلوى/)) return 'dateSweet';
    return 'dates';
  }
  if (has(/فراوله|strawberr|مانجو|mango|برتقاl|برتقال|orange|تفاح|apple|بطيخ|watermelon|جريب فروت|grapefruit|خوخ|peach|عنب|grape|رمان|pomegranate|جزر|carrot|ليمون|lemon|خيار|cucumber/)) return 'fruit';
  if (has(/زعتر بزيت الزيتون|zaatar.*olive oil/)) return 'zaatar';
  if (has(/^(لبن)(\s|$)|^لبن مخيض|buttermilk|حليب طازج|fresh milk/)) return 'dairyMilk';
  if (has(/زبادي|yogurt/)) return 'yogurt';
  if (has(/لبنه|labneh/)) return 'labneh';
  if (has(/جبنه|جبن|cheese|حلوم|halloumi/)) return 'cheese';
  if (has(/سمن|ghee/)) return 'ghee';

  // 14) Fallback by meal type.
  return { breakfast: 'bread', lunch: 'stewMeat', dinner: 'stewMeat', snacks: 'dessert', default: 'stewMeat' }[mealType ?? 'default'];
}

async function main() {
  const { data, error } = await supabase
    .from('dishes')
    .select('id, name_ar, name_en, meal_type, source, cal_100')
    .or('cal_100.is.null,cal_100.lte.0')
    .eq('source', 'gulf-expansion-2026');

  if (error) {
    console.error('Query failed:', error.message);
    process.exit(1);
  }

  console.log(`Rows to classify: ${data.length}`);
  const byCat = {};
  const updates = [];
  const unknown = [];
  for (const r of data) {
    const cat = classify(r.name_ar, r.name_en, r.meal_type);
    const v = CATS[cat];
    if (!v) {
      unknown.push(r.name_ar);
      continue;
    }
    byCat[cat] = (byCat[cat] ?? 0) + 1;
    updates.push({
      id: r.id,
      name_ar: r.name_ar,
      cat,
      cal_100: v.cal,
      protein: v.p,
      carbs: v.c,
      fat: v.f,
      base_serving_g: 100,
      base_cal_serv: v.cal,
    });
  }

  console.log('\nBy category:');
  for (const [cat, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${cat.padEnd(16)} ${CATS[cat].cal} cal/100g`);
  }
  if (unknown.length) {
    console.log('\nUNCLASSIFIED (will be skipped):', unknown.join(' | '));
  }

  const zeroCount = updates.filter((u) => u.cal_100 === 0).length;
  console.log(`\nZero-cal kept at 0 (beverages): ${zeroCount}`);
  console.log(`Real-value assignments: ${updates.length - zeroCount}`);

  const reportPath = path.join(__dirname, 'zero-cal-fix-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({ byCat, updates }, null, 2));
  console.log(`Wrote ${reportPath}`);

  if (DRY_RUN) {
    console.log('\n[DRY-RUN] no DB writes performed.');
    return;
  }

  console.log('\nWriting to Supabase...');
  let ok = 0;
  let fail = 0;
  for (const u of updates) {
    const { error: err } = await supabase
      .from('dishes')
      .update({
        cal_100: u.cal_100,
        protein: u.protein,
        carbs: u.carbs,
        fat: u.fat,
        base_serving_g: u.base_serving_g,
        base_cal_serv: u.base_cal_serv,
      })
      .eq('id', u.id);
    if (err) {
      fail++;
      console.error(`  FAIL ${u.name_ar}: ${err.message}`);
    } else {
      ok++;
    }
  }
  console.log(`Updated: ${ok} | Failed: ${fail}`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});