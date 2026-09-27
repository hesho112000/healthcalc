// Authoring script for the South African 200-dish proposal (scripts/south-africa-200-proposal.json).
// 200 NEW dishes (the 100 legacy rows live in src/data/south-african-full.ts).
// Regions: pan_south_african by default (golden rule), regional anchors (cape_town, johannesburg, durban, pretoria, port_elizabeth),
// african_shared for dishes shared across Southern Africa (credited to africa-south-africa-2026 source).
// All Arabic names carry جنوب أفريقي/أفريقية token (halal profile: no pork).
// Emphasizes: Braai, Bobotie, Biltong, Bunny Chow, Sosatie, Potjiekos, Samoosa, Chakalaka, Boerewors, Pap, Mufta, Malva pudding, Koeksister, Melktert, Vetkoek, Gatsby, Roggebrood, Milk tart, Droëwors, Amasi, Mageu, Umngqusho, Morogo, Amadumbe, Rooibos, Amarula, Billy tea, Perdeley.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'جنوب أفريقي';

// ============================================================ PAN_SOUTH_AFRICAN + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`فول مدمس ${T}`, 'Foul mashed African', 'Foul écrasé africain', 'Foul machacado africano', 'Foul zerdrückt afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 7, 18, 4),
  R(`بوبوتي فطور ${T}`, 'Bobotie breakfast African', 'Bobotie petit-déjeuner africain', 'Bobotie desayuno africano', 'Bobotie Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 8, 14, 7),
  R(`باب مع بويرفورس فطور ${T}`, 'Pap with boerewors breakfast African', 'Pap avec boerewors petit-déjeuner africain', 'Pap con boerewors desayuno africano', 'Pap mit Boerewors Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 10, 20, 6),
  R(`أومغقوشو فاصوليا ذرة فطور ${T}`, 'Umngqusho samp beans breakfast African', 'Umngqusho samp et haricots petit-déjeuner africain', 'Umngqusho samp y frijoles desayuno africano', 'Umngqusho Samp-Bohnen Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 7, 22, 3),
  R(`موغودو كرشة فطور ${T}`, 'Mogodu tripe breakfast African', 'Mogodu tripes petit-déjeuner africain', 'Mogudu callos desayuno africano', 'Mogudu Kutteln Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'cape_town', 14, 8, 4),
  R(`تشاكالاكا وخبز فطور ${T}`, 'Chakalaka and bread breakfast African', 'Chakalaka et pain petit-déjeuner africain', 'Chakalaka y pan desayuno africano', 'Chakalaka und Brot Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'johannesburg', 5, 22, 4),
  R(`موسي مايزي فطور ${T}`, 'Maize meal porridge breakfast African', 'Bouillie de maïs petit-déjeuner africain', 'Gachas de maíz desayuno africano', 'Maisbrei Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 4, 24, 2),
  R(`شاي رويبوس فطور ${T}`, 'Rooibos tea breakfast African', 'Thé rooibos petit-déjeuner africain', 'Té rooibos desayuno africano', 'Rooibos-Tee Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 1, 8, 0),
  R(`فريتاتس خضار فطور ${T}`, 'Vegetable fritters breakfast African', 'Beignets de légumes petit-déjeuner africain', 'Buñuelos de verduras desayuno africano', 'Gemüse-Krapfen Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 5, 24, 7),
  R(`أومليت ذرة فطور ${T}`, 'Maize omelette breakfast African', 'Omelette au maïs petit-déjeuner africain', 'Omeleta de maíz desayuno africano', 'Mais-Omelette Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 9, 12, 9),
  R(`أماسي مع ماسا فطور ${T}`, 'Amasi with maize meal breakfast African', 'Amasi avec pap petit-déjeuner africain', 'Amasi con pap desayuno africano', 'Amasi mit Pap Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'durban', 5, 16, 3),
  R(`سوساتي فطور ${T}`, 'Sosatie breakfast African', 'Sosatie petit-déjeuner africain', 'Sosatie desayuno africano', 'Sosatie Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 9, 14, 6),
  R(`سامبوسا فطور ${T}`, 'Samoosa breakfast African', 'Samoosa petit-déjeuner africain', 'Samoosa desayuno africano', 'Samoosa Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 8, 20, 7),
  R(`ماجو ماعز فطور ${T}`, 'Mageu maize drink breakfast African', 'Mageu boisson de maïs petit-déjeuner africain', 'Mageu bebida de maíz desayuno africano', 'Mageu-Maisgetränk Frühstück afrikanisch', 'breakfast_items', 'breakfast', 'pan_south_african', 3, 20, 1),
);
// --- breads_flatbreads (24) --------------------------------------------------
dishes.push(
  R(`خبز براي ${T}`, 'Braai bread African', 'Pain braai africain', 'Pan braai africano', 'Braai-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 6, 26, 6),
  R(`خبز روغروبود ${T}`, 'Roggebrood African', 'Roggebrood africain', 'Roggebrood africano', 'Roggebroed afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 7, 28, 5),
  R(`فطيرة لحم ${T}`, 'Meat pie African', 'Tourte de viande africaine', 'Pastel de carne africano', 'Fleischkuchen afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 10, 22, 14),
  R(`فطيرة دجاج ${T}`, 'Chicken pie African', 'Tourte de poulet africaine', 'Pastel de pollo africano', 'Hähnchenkuchen afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 10, 20, 10),
  R(`سجق بوري ${T}`, 'Boerewors roll African', 'Rouleau de boerewors africain', 'Rollito de boerewors africano', 'Boerewors-Rolle afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 16, 16, 15),
  R(`ساندويتش جاتسبي ${T}`, 'Gatsby sandwich African', 'Sandwich Gatsby africain', 'Sándwich Gatsby africano', 'Gatsby-Sandwich afrikanisch', 'breads_flatbreads', 'lunch', 'cape_town', 12, 34, 10),
  R(`روتي ${T}`, 'Roti African', 'Roti africain', 'Roti africano', 'Roti afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 10, 26, 7),
  R(`باني تشاو خبز ${T}`, 'Bunny chow bread African', 'Pain bunny chow africain', 'Pan bunny chow africano', 'Bunny-Chow-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 8, 26, 8),
  R(`سوسيج رول ${T}`, 'Sausage roll African', 'Rouleau de saucisse africain', 'Rollito de salchicha africano', 'Wurstrolle afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 9, 20, 13),
  R(`فيت كوكي ${T}`, 'Vetkoek African', 'Vetkoek africain', 'Vetkoek africano', 'Vetkoek afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 6, 28, 10),
  R(`خبز أماسي ${T}`, 'Amasi bread African', 'Pain amasi africain', 'Pan amasi africano', 'Amasi-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 5, 24, 6),
  R(`فريتاتس خبز ${T}`, 'Fritter bread African', 'Beignet de pain africain', 'Buñuelo de pan africano', 'Fritter-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 5, 24, 7),
  R(`خبز الذرة ${T}`, 'Maize bread African', 'Pain de maïs africain', 'Pan de maíz africano', 'Maisbrot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 5, 26, 5),
  R(`خبز البفنوي ${T}`, 'Bunny bread African', 'Pain bunny africain', 'Pan bunny africano', 'Bunny-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 6, 28, 5),
  R(`كوكسستر حلوى ${T}`, 'Koeksister African', 'Koeksister africain', 'Koeksister africano', 'Koeksister afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 4, 28, 8),
  R(`مالفطر بيض ${T}`, 'Melktert egg crust African', 'Malva tarte croûte d œuf africaine', 'Malva pastel de huevo africano', 'Melktert-Eierteig afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 6, 24, 9),
  R(`فطيرة تشاكالاكا ${T}`, 'Chakalaka pie African', 'Tourte chakalaka africaine', 'Pastel chakalaka africano', 'Chakalaka-Kuchen afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 8, 22, 12),
  R(`خبز أمادومبي ${T}`, 'Amadumbe bread African', 'Pain amadumbe africain', 'Pan amadumbe africano', 'Amadumbe-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 5, 24, 6),
  R(`فطيرة صوص ${T}`, 'Sauce pie African', 'Tourte sauce africaine', 'Pastel salsa africano', 'Saucenkuchen afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 9, 20, 12),
  R(`خبز سوساتي ${T}`, 'Sosatie bread African', 'Pain sosatie africain', 'Pan sosatie africano', 'Sosatie-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 6, 26, 7),
  R(`فطيرة لحم الغزال ${T}`, 'Game meat pie African', 'Tourte de gibier africaine', 'Pastel de carne de caza africano', 'Wildbret-Kuchen afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 12, 22, 14),
  R(`خبز المانجو ${T}`, 'Mango bread African', 'Pain mangue africain', 'Pan mango africano', 'Mango-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 4, 26, 5),
  R(`فطيرة البوبوتي ${T}`, 'Bobotie pie African', 'Tourte bobotie africaine', 'Pastel bobotie africano', 'Bobotie-Kuchen afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 10, 22, 12),
  R(`خبز الماشوا ${T}`, 'Mashwa bread African', 'Pain mashwa africain', 'Pan mashwa africano', 'Mashwa-Brot afrikanisch', 'breads_flatbreads', 'lunch', 'pan_south_african', 5, 24, 6),
);
// --- rice_biryani (10) ------------------------------------------------------
dishes.push(
  R(`أرز جولوف ${T}`, 'Jollof rice African', 'Riz jollof africain', 'Arroz jollof africano', 'Jollof-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 5, 36, 4),
  R(`أرز بوبوتي ${T}`, 'Bobotie rice African', 'Riz bobotie africain', 'Arroz bobotie africano', 'Bobotie-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 8, 32, 7),
  R(`أرز سوساتي ${T}`, 'Sosatie rice African', 'Riz sosatie africain', 'Arroz sosatie africano', 'Sosatie-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 10, 30, 8),
  R(`أرز دجاج ${T}`, 'Chicken rice African', 'Riz poulet africain', 'Arroz pollo africano', 'Hähnchen-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 12, 32, 6),
  R(`أرز كاري ${T}`, 'Curry rice African', 'Riz curry africain', 'Arroz curry africano', 'Curry-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 8, 34, 7),
  R(`أرز لحم ${T}`, 'Meat rice African', 'Riz viande africain', 'Arroz carne africano', 'Fleisch-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 14, 30, 8),
  R(`أرز بيلتونج ${T}`, 'Biltong rice African', 'Riz biltong africain', 'Arroz biltong africano', 'Biltong-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 16, 28, 6),
  R(`أرز أمادومبي ${T}`, 'Amadumbe rice African', 'Riz amadumbe africain', 'Arroz amadumbe africano', 'Amadumbe-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 4, 34, 4),
  R(`أرز موروغو ${T}`, 'Morogo rice African', 'Riz morogo africain', 'Arroz morogo africano', 'Morogo-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 5, 32, 5),
  R(`أرز باب ${T}`, 'Pap rice African', 'Riz pap africain', 'Arroz pap africano', 'Pap-Reis afrikanisch', 'rice_biryani', 'lunch', 'pan_south_african', 4, 36, 3),
);
// --- dals_legumes (16) -----------------------------------------------------
dishes.push(
  R(`فول مدمس مطبوخ ${T}`, 'Boiled foul African', 'Foul bouilli africain', 'Foul cocido africano', 'Gekochter Foul afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 7, 18, 4),
  R(`فول سكر يخنة ${T}`, 'Sugar bean stew African', 'Ragoût de frijoles africain', 'Guiso de frijoles azúcar africano', 'Zuckerbohnen-Eintopf afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 7, 20, 3),
  R(`فول بينز كيب ${T}`, 'Cape sugar bean soup African', 'Soupe de frijoles du Cap africaine', 'Sopa de frijoles del Cabo africana', 'Zuckerbohnen-Cap-Suppe afrikanisch', 'dals_legumes', 'lunch', 'cape_town', 7, 18, 3),
  R(`فول موروغو ${T}`, 'Morogo bean stew African', 'Ragoût de frijoles morogo africain', 'Guiso de frijoles morogo africano', 'Morogo-Bohnen-Eintopf afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 6, 18, 4),
  R(`دال عدس ${T}`, 'Lentil dal African', 'Dal de lentilles africain', 'Dal de lentejas africano', 'Linsen-Dal afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 8, 18, 3),
  R(`دال حمص ${T}`, 'Chickpea dal African', 'Dal de pois chiches africain', 'Dal de garbanzos africano', 'Kichererbsen-Dal afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 7, 20, 4),
  R(`فول مطبوخ ${T}`, 'Boiled beans African', 'Haricots bouillis africains', 'Frijoles cocidos africano', 'Gekochte Bohnen afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 6, 18, 2),
  R(`سامب فول ${T}`, 'Samp and beans African', 'Samp et haricots africains', 'Samp y frijoles africano', 'Samp und Bohnen afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 7, 22, 3),
  R(`فول ماشوا يخنة ${T}`, 'Mashwa bean stew African', 'Ragoût de mashwa africain', 'Guiso de mashwa africano', 'Mashwa-Bohnen-Eintopf afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 6, 18, 4),
  R(`فول أمادومبي ${T}`, 'Amadumbe bean stew African', 'Ragoût d amadumbe africain', 'Guiso de amadumbe africano', 'Amadumbe-Bohnen-Eintopf afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 5, 20, 3),
  R(`فول خضار ${T}`, 'Vegetable bean African', 'Haricots aux légumes africains', 'Frijoles con verduras africano', 'Gemüse-Bohnen afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 5, 18, 3),
  R(`فول كارى ${T}`, 'Curry bean African', 'Haricots curry africains', 'Frijoles curry africano', 'Bohnen-Curry afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 7, 20, 5),
  R(`فول باب ${T}`, 'Pap bean African', 'Haricots pap africains', 'Frijoles pap africano', 'Pap-Bohnen afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 4, 20, 2),
  R(`فول مافو ${T}`, 'Mafu bean African', 'Haricots mafu africains', 'Frijoles mafu africano', 'Mafu-Bohnen afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 5, 18, 3),
  R(`فول تشاكالاكا ${T}`, 'Chakalaka bean African', 'Haricots chakalaka africains', 'Frijoles chakalaka africano', 'Chakalaka-Bohnen afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 6, 18, 4),
  R(`فول بويرفورس ${T}`, 'Boerewors bean African', 'Haricots boerewors africains', 'Frijoles boerewors africano', 'Boerewors-Bohnen afrikanisch', 'dals_legumes', 'lunch', 'pan_south_african', 9, 20, 5),
);
// --- vegetarian_mains (22) --------------------------------------------------
dishes.push(
  R(`بوتجيكوس خضار ${T}`, 'Potjiekos vegetables African', 'Potjiekos légumes africain', 'Potjiekos verduras africano', 'Potjiekos Gemüse afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 6, 18, 5),
  R(`بوتجيكوس أمادومبي ${T}`, 'Potjiekos amadumbe African', 'Potjiekos amadumbe africain', 'Potjiekos amadumbe africano', 'Potjiekos Amadumbe afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 20, 5),
  R(`موروغو يخنة ${T}`, 'Morogo stew African', 'Morogo ragoût africain', 'Morogo guiso africano', 'Morogo-Eintopf afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 6, 14, 4),
  R(`تشاكالاكا لحم نباتي ${T}`, 'Chakalaka vegetarian meat African', 'Chakalaka viande végétale africaine', 'Chakalaka carne vegetariana africano', 'Chakalaka-Vegetarisches Fleisch afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 7, 16, 5),
  R(`كاري خضار كيب ${T}`, 'Cape Malay vegetable curry African', 'Curry de légumes du Cap malais africain', 'Curry de verduras del Cabo malayo africano', 'Kap-Malai-Gemüse-Curry afrikanisch', 'vegetarian_mains', 'lunch', 'cape_town', 6, 18, 7),
  R(`سوكوما ويجي ${T}`, 'Sukuma wiki African', 'Sukuma wiki africain', 'Sukuma wiki africano', 'Sukuma-Wiki afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 14, 5),
  R(`موروغو سوساتي ${T}`, 'Morogo sosatie African', 'Morogo sosatie africain', 'Morogo sosatie africano', 'Morogo-Sosatie afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 8, 14, 6),
  R(`فول ماشوا باب يخنة ${T}`, 'Mashwa pap beans African', 'Foul pap mashwa africain', 'Foul pap mashwa africano', 'Mashwa-Pap-Bohnen afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 6, 18, 4),
  R(`بوتجيكوس سامب ${T}`, 'Potjiekos samp African', 'Potjiekos samp africain', 'Potjiekos samp africano', 'Potjiekos Samp afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 18, 4),
  R(`كاري باب ${T}`, 'Pap curry African', 'Curry de pap africain', 'Curry de pap africano', 'Pap-Curry afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 20, 4),
  R(`بوتجيكوس قرع ${T}`, 'Potjiekos pumpkin African', 'Potjiekos courge africain', 'Potjiekos calabaza africano', 'Potjiekos-Kürbis afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 3, 18, 3),
  R(`موروغو أماسي ${T}`, 'Morogo amasi African', 'Morogo amasi africain', 'Morogo amasi africano', 'Morogo-Amasi afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 12, 3),
  R(`تشاكالاكا باب ${T}`, 'Chakalaka pap African', 'Chakalaka pap africain', 'Chakalaka pap africano', 'Chakalaka-Pap afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 4, 18, 3),
  R(`فول أمادومبي مطبوخ ${T}`, 'Boiled amadumbe African', 'Amadumbe bouilli africain', 'Amadumbe cocido africano', 'Gekochtes Amadumbe afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 3, 22, 1),
  R(`بوتجيكوس فول ${T}`, 'Potjiekos beans African', 'Potjiekos frijoles africain', 'Potjiekos frijoles africano', 'Potjiekos-Bohnen afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 6, 18, 4),
  R(`كاري باب أماسي ${T}`, 'Pap amasi curry African', 'Curry de pap amasi africain', 'Curry de pap amasi africano', 'Pap-Amasi-Curry afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 20, 4),
  R(`سوكوما ويجي تشاكالاكا ${T}`, 'Sukuma wiki chakalaka African', 'Sukuma wiki chakalaka africain', 'Sukuma wiki chakalaka africano', 'Sukuma-Wiki-Chakalaka afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 14, 5),
  R(`موروغو باب ${T}`, 'Morogo pap African', 'Morogo pap africain', 'Morogo pap africano', 'Morogo-Pap afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 16, 4),
  R(`تشاكالاكا أمادومبي ${T}`, 'Chakalaka amadumbe African', 'Chakalaka amadumbe africain', 'Chakalaka amadumbe africano', 'Chakalaka-Amadumbe afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 5, 18, 4),
  R(`بوتجيكوس موروغو ${T}`, 'Potjiekos morogo African', 'Potjiekos morogo africain', 'Potjiekos morogo africano', 'Potjiekos-Morogo afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 6, 18, 5),
  R(`فول ماشوا باب ${T}`, 'Mashwa pap beans African', 'Foul pap mashwa africain', 'Foul pap mashwa africano', 'Mashwa-Pap-Bohnen afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 6, 18, 4),
  R(`كاري خضار أماسي ${T}`, 'Amasi vegetable curry African', 'Curry de légumes amasi africain', 'Curry de verduras amasi africano', 'Amasi-Gemüse-Curry afrikanisch', 'vegetarian_mains', 'lunch', 'pan_south_african', 4, 16, 3),
);
// --- poultry_mains (12) -----------------------------------------------------
dishes.push(
  R(`دجاج براي مشوي ${T}`, 'Braai chicken grilled African', 'Poulet braai grillé africain', 'Pollo braai a la parrilla africano', 'Braai-Hähnchen gegrillt afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 24, 6, 10),
  R(`دجاج كاري ديربان ${T}`, 'Durban chicken curry African', 'Poulet curry de Durban africain', 'Pollo curry de Durban africano', 'Durban-Hähnchen-Curry afrikanisch', 'poultry_mains', 'lunch', 'durban', 16, 14, 9),
  R(`دجاج سوساتي ${T}`, 'Sosatie chicken African', 'Poulet sosatie africain', 'Pollo sosatie africano', 'Hähnchen-Sosatie afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 14, 12, 8),
  R(`دجاج بوبوتي ${T}`, 'Bobotie chicken African', 'Poulet bobotie africain', 'Pollo bobotie africano', 'Hähnchen-Bobotie afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 12, 14, 7),
  R(`دجاج بوتجيكوس ${T}`, 'Potjiekos chicken African', 'Poulet potjiekos africain', 'Pollo potjiekos africano', 'Hähnchen-Potjiekos afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 14, 14, 8),
  R(`دجاج سوكوما ويجي ${T}`, 'Sukuma wiki chicken African', 'Poulet sukuma wiki africain', 'Pollo sukuma wiki africano', 'Hähnchen-Sukuma-Wiki afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 12, 12, 7),
  R(`دجاج تشاكالاكا ${T}`, 'Chakalaka chicken African', 'Poulet chakalaka africain', 'Pollo chakalaka africano', 'Hähnchen-Chakalaka afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 13, 14, 8),
  R(`دجاج بيلتونج ${T}`, 'Biltong chicken African', 'Poulet biltong africain', 'Pollo biltong africano', 'Hähnchen-Biltong afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 15, 10, 9),
  R(`دجاج أماسي ${T}`, 'Amasi chicken African', 'Poulet amasi africain', 'Pollo amasi africano', 'Hähnchen-Amasi afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 12, 14, 6),
  R(`دجاج سامبوسا ${T}`, 'Samoosa chicken African', 'Poulet samosa africain', 'Pollo samosa africano', 'Hähnchen-Samosa afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 13, 16, 8),
  R(`دجاج ماجو ${T}`, 'Mageu chicken African', 'Poulet mageu africain', 'Pollo mageu africano', 'Hähnchen-Mageu afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 11, 16, 7),
  R(`دجاج باب ${T}`, 'Pap chicken African', 'Poulet pap africain', 'Pollo pap africano', 'Hähnchen-Pap afrikanisch', 'poultry_mains', 'lunch', 'pan_south_african', 12, 14, 7),
);
// --- meat_mains (22) --------------------------------------------------------
dishes.push(
  R(`براي بويرفورس سجق مشوي ${T}`, 'Braai boerewors grilled African', 'Braai boerewors saucisse grillée africaine', 'Braai boerewors salchicha a la parrilla africana', 'Braai Boerewors-Wurst gegrillt afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 18, 10, 16),
  R(`براي أضلاع ${T}`, 'Braai ribs African', 'Côtes de braai grillées africaines', 'Costillas de braai a la parrilla africana', 'Braai-Rippchen gegrillt afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 18, 8, 18),
  R(`لامب تشوبس مشوي ${T}`, 'Lamb chops grilled African', 'Côtelettes d agneau grillées africaines', 'Chuletas de cordero a la parrilla africana', 'Lammkoteletts gegrillt afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 20, 0, 18),
  R(`ستيك سبرينغبوك ${T}`, 'Springbok steak African', 'Steak de springbok africain', 'Bistec de springbok africano', 'Springbok-Rindfleisch afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 22, 0, 13),
  R(`كودو ستيك ${T}`, 'Kudu steak African', 'Steak de koudou africain', 'Bistec de kudu africano', 'Kudu-Rindfleisch afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 21, 0, 13),
  R(`بر بوي براي ${T}`, 'Perdeley pot roast African', 'Perdeley rôti en cocote africain', 'Perdeley estofado africano', 'Perdeley-Schmorebraten afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 15, 12, 14),
  R(`بوبوتي ${T}`, 'Bobotie African', 'Bobotie africain', 'Bobotie africano', 'Bobotie afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 10, 16, 10),
  R(`بوتجيكوس لحم ${T}`, 'Potjiekos meat African', 'Potjiekos viande africain', 'Potjiekos carne africano', 'Potjiekos Fleisch afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 14, 14, 12),
  R(`سوساتي لحم مشوي ${T}`, 'Sosatie grilled meat African', 'Sosatie viande grillée africaine', 'Sosatie carne a la parrilla africana', 'Sosatie Bratfleisch afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 16, 12, 12),
  R(`بيف بيلتونج ${T}`, 'Biltong beef African', 'Biltong bœuf africain', 'Biltong res africana', 'Biltong getrocknetes Rindfleisch afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 38, 2, 12),
  R(`درويرس سجق مجفف ${T}`, 'Droëwors dried sausage African', 'Droëwors saucisse séchée africaine', 'Droëwors salchicha seca africana', 'Droëwors getrocknete Wurst afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 20, 4, 20),
  R(`سوموسا لحم ${T}`, 'Samoosa meat African', 'Samoosa viande africaine', 'Samoosa carne africana', 'Samoosa-Fleisch afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 10, 22, 14),
  R(`كاري لحم ماعز ${T}`, 'Lamb curry African', 'Curry d agneau africain', 'Curry de cordero africano', 'Lamm-Curry afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 14, 16, 12),
  R(`يخنة لحم بالبيلش ${T}`, 'Beef stew with peas African', 'Ragoût de bœuf aux petits pois africain', 'Guiso de res con guisantes africano', 'Rindfleisch-Eintopf mit Erbsen afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 12, 14, 6),
  R(`كاري دجاج براي ${T}`, 'Braai chicken curry African', 'Curry de poulet braai africain', 'Curry de pollo braai africano', 'Braai-Hähnchen-Curry afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 15, 14, 9),
  R(`براي لحم الغزال ${T}`, 'Braai game meat African', 'Viande de gibier braai africaine', 'Carne de caza braai africana', 'Wildbret-Braai afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 18, 8, 14),
  R(`براي كودو ${T}`, 'Braai kudu African', 'Braai koudou africain', 'Braai kudu africano', 'Braai-Kudu afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 19, 8, 13),
  R(`ستيك بيرديلي ${T}`, 'Perdeley steak African', 'Steak perdeley africain', 'Bistec perdeley africano', 'Perdeley-Steak afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 16, 10, 15),
  R(`ماشوا لحم مطبوخ ${T}`, 'Boiled mashwa meat African', 'Mashwa viande bouillie africaine', 'Mashwa carne cocida africana', 'Mashwa-Fleisch gekocht afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 12, 14, 8),
  R(`براي سوساتي ${T}`, 'Braai sosatie African', 'Braai sosatie africain', 'Braai sosatie africano', 'Braai-Sosatie afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 16, 12, 13),
  R(`بوتجيكوس سوساتي ${T}`, 'Potjiekos sosatie African', 'Potjiekos sosatie africain', 'Potjiekos sosatie africano', 'Potjiekos-Sosatie afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 15, 14, 12),
  R(`كاري لحم ماعز سوكوما ${T}`, 'Lamb curry sukuma African', 'Curry d agneau sukuma africain', 'Curry de cordero sukuma africano', 'Lamm-Curry-Sukuma afrikanisch', 'meat_mains', 'lunch', 'pan_south_african', 13, 16, 11),
);
// --- seafood_mains (4) -----------------------------------------------------
dishes.push(
  R(`سمك سنوك مشوي ${T}`, 'Snoek fish grilled African', 'Snoek poisson grillé africain', 'Snoek pescado a la parrilla africano', 'Snoek-Seefisch gegrillt afrikanisch', 'seafood_mains', 'lunch', 'pan_south_african', 22, 0, 6),
  R(`جراد بحر غربي مشوي ${T}`, 'West Coast rock lobster grilled African', 'Langouste de la Côte Ouest grillée africaine', 'Cigala de la Costa Oeste a la parrilla africana', 'Westküsten-Hummer gegrillt afrikanisch', 'seafood_mains', 'lunch', 'cape_town', 20, 2, 5),
  R(`كاري سمك كيب ${T}`, 'Cape Malay fish curry African', 'Curry de poisson du Cap malais africain', 'Curry de pescado del Cabo malayo africano', 'Kap-Malai-Fisch-Curry afrikanisch', 'seafood_mains', 'lunch', 'cape_town', 16, 14, 9),
  R(`سمك هاردروف مشوي ${T}`, 'Harderock fish grilled African', 'Poisson harderock grillé africain', 'Pescado harderock a la parrilla africano', 'Harderock-Seefisch gegrillt afrikanisch', 'seafood_mains', 'lunch', 'pan_south_african', 21, 0, 5),
);
// --- soups_salads (16) -----------------------------------------------------
dishes.push(
  R(`شوربة قرع ${T}`, 'Pumpkin soup African', 'Soupe de courge africaine', 'Sopa de calabaza africana', 'Kürbisuppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 3, 14, 2),
  R(`شوربة فول ${T}`, 'Bean soup African', 'Soupe de frijoles africaine', 'Sopa de frijoles africana', 'Bohnensuppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 6, 16, 2),
  R(`شوربة خضار ${T}`, 'Vegetable soup African', 'Soupe de légumes africaine', 'Sopa de verduras africana', 'Gemüsesuppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 3, 14, 2),
  R(`شوربة ماشوا ${T}`, 'Mashwa soup African', 'Soupe de mashwa africaine', 'Sopa de mashwa africana', 'Mashwa-Suppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 4, 14, 2),
  R(`شوربة باب ${T}`, 'Pap soup African', 'Soupe de pap africaine', 'Sopa de pap africana', 'Pap-Suppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 4, 16, 2),
  R(`شوربة أماسي ${T}`, 'Amasi soup African', 'Soupe d amasi africaine', 'Sopa de amasi africana', 'Amasi-Suppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 4, 8, 2),
  R(`شوربة بيلتونج ${T}`, 'Biltong soup African', 'Soupe de biltong africaine', 'Sopa de biltong africana', 'Biltong-Suppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 8, 10, 3),
  R(`شوربة بويرفورس ${T}`, 'Boerewors soup African', 'Soupe de boerewors africaine', 'Sopa de boerewors africana', 'Boerewors-Suppe afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 8, 14, 4),
  R(`سلطة حديقة ${T}`, 'Garden salad African', 'Salade de jardin africaine', 'Ensalada de jardín africana', 'Gartensalat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 2, 6, 1),
  R(`سلطة كول سلو ${T}`, 'Coleslaw African', 'Salade de chou africaine', 'Ensalada de repollo africana', 'Krautsalat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 2, 8, 3),
  R(`سلطة خضار مشكلة ${T}`, 'Mixed vegetable salad African', 'Salade de légumes mixtes africaine', 'Ensalada de verduras mixtas africana', 'Gemischter Gemüsesalat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 2, 7, 1.5),
  R(`سلطة أفوكادو ${T}`, 'Avocado salad African', 'Salade d avocat africaine', 'Ensalada de aguacate africana', 'Avocado-Salat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 2, 8, 12),
  R(`سلطة بنجر ${T}`, 'Beetroot salad African', 'Salade de betterave africaine', 'Ensalada de remolacha africana', 'Rote-Bete-Salat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 2, 9, 0.5),
  R(`سلطة تماهيني ${T}`, 'Tahini salad African', 'Salade de tahini africaine', 'Ensalada de tahini africana', 'Tahini-Salat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 4, 8, 8),
  R(`سلطة فول ${T}`, 'Bean salad African', 'Salade de frijoles africaine', 'Ensalada de frijoles africana', 'Bohnensalat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 6, 14, 3),
  R(`سلطة موروقو ورقية ${T}`, 'Morogo salad African', 'Salade de morogo africaine', 'Ensalada de morogo africana', 'Morogi-Blattsalat afrikanisch', 'soups_salads', 'lunch', 'pan_south_african', 4, 6, 2),
);
// --- street_snacks (22) ----------------------------------------------------
dishes.push(
  R(`سامبوسا لحم ${T}`, 'Lamb samosa African', 'Sambusa à l agneau africain', 'Sambusa de cordero africano', 'Lamm-Sambusa afrikanisch', 'street_snacks', 'snacks', 'african_shared', 10, 22, 14),
  R(`سامبوسا خضار ${T}`, 'Vegetable samosa African', 'Sambusa aux légumes africain', 'Sambusa de verduras africano', 'Gemüse-Sambusa afrikanisch', 'street_snacks', 'snacks', 'african_shared', 6, 20, 10),
  R(`كولو محمص ${T}`, 'Kolo roasted grain African', 'Kolo céréales grillées africain', 'Kolo granos tostados africano', 'Kolo-Geröstete-Körner afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 8, 40, 12),
  R(`ذرة مشوية ${T}`, 'Roasted corn African', 'Maïs grillé africain', 'Maíz asado africano', 'Gerösteter Mais afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 4, 18, 2),
  R(`بطاطا مقلية ${T}`, 'Fried potatoes African', 'Frites africaines', 'Patatas fritas africanas', 'Pommes frites afrikanisch', 'street_snacks', 'snacks', 'african_shared', 3, 22, 8),
  R(`فول ${T}`, 'Foul African', 'Foul africain', 'Foul africano', 'Foul afrikanisch', 'street_snacks', 'snacks', 'african_shared', 7, 18, 4),
  R(`لقيمات عسل ${T}`, 'Honey fritters African', 'Beignets au miel africains', 'Buñuelos de miel africano', 'Honig-Krapfen afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 5, 28, 10),
  R(`حمص محمص ${T}`, 'Roasted chickpeas African', 'Pois chiches grillés africains', 'Garbanzos tostados africanos', 'Geröstete Kichererbsen afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 7, 20, 6),
  R(`فول سوداني محمص ${T}`, 'Roasted groundnuts African', 'Arachides grillées africaines', 'Maníes tostados africanos', 'Geröstete Erdnüsse afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 12, 30, 14),
  R(`فطائر محشوة ${T}`, 'Stuffed dumplings African', 'Beignets farcis africains', 'Empanadillas rellenas africanas', 'Gefüllte Teigtaschen afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 8, 24, 10),
  R(`خبز مشوي مع عسل ${T}`, 'Grilled bread honey African', 'Pain grillé au miel africain', 'Pan asado con miel africano', 'Geröstetes Brot mit Honig afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 6, 26, 8),
  R(`صحن حمص بالطحينة ${T}`, 'Hummus plate African', 'Assiette de houmous africaine', 'Plato de hummus africano', 'Hummus-Teller afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 6, 18, 6),
  R(`كباب حواري ${T}`, 'Street kebab African', 'Kébab de rue africain', 'Kebab callejero africano', 'Straßen-Kebab afrikanisch', 'street_snacks', 'snacks', 'african_shared', 12, 20, 10),
  R(`شيبسي بطاطا ${T}`, 'Potato chips African', 'Chips de pommes de terre africains', 'Patatas fritas chips africanas', 'Kartoffelchips afrikanisch', 'street_snacks', 'snacks', 'african_shared', 3, 24, 9),
  R(`ذرة حلوة مسلوقة ${T}`, 'Boiled sweet corn African', 'Maïs doux bouilli africain', 'Maíz dulce hervido africano', 'Gekochter Süßmais afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 3, 20, 2),
  R(`كعك السمسم ${T}`, 'Sesame cookies African', 'Biscuits au sésame africains', 'Galletas de sésamo africanas', 'Sesamkekse afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 5, 30, 12),
  R(`لوز محمص ${T}`, 'Roasted almonds African', 'Amandes grillées africaines', 'Almendras tostadas africanos', 'Geröstete Mandeln afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 10, 28, 16),
  R(`إنجيرا بالفلفل ${T}`, 'Injera with chili African', 'Injera au piment africaine', 'Injera con chile africana', 'Injera mit Chili afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 4, 20, 3),
  R(`بيض مقلي مسلوق ${T}`, 'Fried boiled eggs African', 'Œufs frits bouillis africains', 'Huevos fritos cocidos africanos', 'Gebratene Eier gekocht afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 11, 2, 10),
  R(`شيبسي ذرة ${T}`, 'Corn chips African', 'Chips de maïs africains', 'Chips de maíz africanos', 'Maischips afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 4, 22, 5),
  R(`فريتاتس بطاطس ${T}`, 'Potato fritters African', 'Beignets de pommes de terre africains', 'Buñuelos de patata africanos', 'Kartoffel-Krapfen afrikanisch', 'street_snacks', 'snacks', 'pan_south_african', 4, 22, 9),
  R(`سامبوسا دجاج ${T}`, 'Chicken samosa African', 'Sambusa au poulet africain', 'Sambusa de pollo africano', 'Hähnchen-Sambusa afrikanisch', 'street_snacks', 'snacks', 'african_shared', 12, 22, 12),
);
// --- condiments (8) ----------------------------------------------------------
dishes.push(
  R(`صلصة تشاكالاكا ${T}`, 'Chakalaka sauce African', 'Sauce chakalaka africaine', 'Salsa chakalaka africana', 'Chakalaka-Sauce afrikanisch', 'condiments', 'snacks', 'pan_south_african', 2, 10, 2),
  R(`صلصة بريبري ${T}`, 'Berbere sauce African', 'Sauce berbere africaine', 'Salsa berbere africana', 'Berbere-Sauce afrikanisch', 'condiments', 'snacks', 'pan_south_african', 8, 14, 14),
  R(`صلصة متميتا ${T}`, 'Mitmita sauce African', 'Sauce mitmita africaine', 'Salsa mitmita africana', 'Mitmita-Sauce afrikanisch', 'condiments', 'snacks', 'pan_south_african', 10, 16, 18),
  R(`زبدة نتر كيب ${T}`, 'Niter kibe butter African', 'Beurre niter kibe africain', 'Mantequilla niter kibe africano', 'Niter-Kibe-Butter afrikanisch', 'condiments', 'snacks', 'pan_south_african', 2, 0, 50),
  R(`عيب قشطة ${T}`, 'Ayib cream African', 'Crème ayib africaine', 'Crema ayib africana', 'Ayib-Sahne afrikanisch', 'condiments', 'snacks', 'pan_south_african', 4, 6, 6),
  R(`صلصة تمر هندي ${T}`, 'Tamarind sauce African', 'Sauce au tamarin africaine', 'Salsa de tamarindo africana', 'Tamarinden-Sauce afrikanisch', 'condiments', 'snacks', 'pan_south_african', 2, 16, 2),
  R(`شطة ثوم ${T}`, 'Garlic chili paste African', 'Pâte pimentée à l ail africaine', 'Pasta de chile y ajo africana', 'Knoblauch-Chili-Paste afrikanisch', 'condiments', 'snacks', 'pan_south_african', 2, 8, 4),
  R(`بهارات باب ${T}`, 'Pap spice blend African', 'Mélange d épices pour pap africain', 'Mezcla de especias para pap africano', 'Pap-Gewürzmischung afrikanisch', 'condiments', 'snacks', 'pan_south_african', 5, 20, 18),
);
// --- desserts_sweets (8) -----------------------------------------------------
dishes.push(
  R(`حلاوة مالفطر ${T}`, 'Malva pudding African', 'Gâteau malva africain', 'Pastel malva africano', 'Malva-Pudding afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 5, 40, 12),
  R(`كوكسستر ${T}`, 'Koeksister African', 'Koeksister africain', 'Koeksister africano', 'Koeksister afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 4, 28, 8),
  R(`ميلكتيرت ${T}`, 'Melktert African', 'Melktert africain', 'Melktert africano', 'Melktert afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 6, 24, 9),
  R(`حلوى سمسم ${T}`, 'Sesame candy African', 'Bonbon au sésame africain', 'Caramelo de sésamo africano', 'Sesamsüßigkeit afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 6, 34, 14),
  R(`تمر بالسمسم ${T}`, 'Dates with sesame African', 'Dattes au sésame africain', 'Dátiles con sésamo africano', 'Datteln mit Sesam afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 4, 36, 10),
  R(`كعكة عسل ${T}`, 'Honey cake African', 'Gâteau au miel africain', 'Pastel de miel africano', 'Honigkuchen afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 6, 30, 10),
  R(`أرز حلو ${T}`, 'Sweet rice pudding African', 'Riz au lait sucré africain', 'Arroz con leche dulce africano', 'Süßer Reisbrei afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 4, 28, 4),
  R(`فاكهة بالعسل ${T}`, 'Fruit with honey African', 'Fruits au miel africains', 'Fruta con miel africano', 'Obst mit Honig afrikanisch', 'desserts_sweets', 'snacks', 'pan_south_african', 2, 20, 2),
);
// --- beverages (22) ----------------------------------------------------------
dishes.push(
  R(`بن سادة ${T}`, 'Black coffee African', 'Café noir africain', 'Café negro africano', 'Schwarzer Kaffee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 4, 0),
  R(`قهوة بالحليب ${T}`, 'Coffee with milk African', 'Café au lait africain', 'Café con leche africano', 'Kaffee mit Milch afrikanisch', 'beverages', 'snacks', 'pan_south_african', 2, 6, 2),
  R(`بونة معسولة ${T}`, 'Honeyed coffee African', 'Café au miel africain', 'Café con miel africano', 'Honig-Kaffee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 2, 8, 3),
  R(`شاي رويبوس ${T}`, 'Rooibos tea African', 'Thé rooibos africain', 'Té rooibos africano', 'Rooibos-Tee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 5, 0),
  R(`شاي بنج ${T}`, 'Bunya tea African', 'Thé bunya africain', 'Té bunya africano', 'Bunya-Tee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 4, 0),
  R(`أمارولا ${T}`, 'Amarula African', 'Amarula africain', 'Amarula africano', 'Amarula afrikanisch', 'beverages', 'snacks', 'pan_south_african', 2, 16, 6),
  R(`ماجو ماعز ${T}`, 'Mageu maize drink African', 'Mageu boisson de maïs africain', 'Mageu bebida de maíz africano', 'Mageu-Maisgetränk afrikanisch', 'beverages', 'snacks', 'pan_south_african', 3, 20, 1),
  R(`أماسي ${T}`, 'Amasi African', 'Amasi africain', 'Amasi africano', 'Amasi afrikanisch', 'beverages', 'snacks', 'pan_south_african', 4, 8, 2),
  R(`شاي حليب ${T}`, 'Milk tea African', 'Thé au lait africain', 'Té con leche africano', 'Milchtee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 2, 8, 2),
  R(`بن بالحليب ${T}`, 'Milk coffee African', 'Café au lait africain', 'Café con leche africano', 'Kaffee mit Milch afrikanisch', 'beverages', 'snacks', 'pan_south_african', 3, 8, 2),
  R(`عصير مانجو ${T}`, 'Mango juice African', 'Jus de mangue africain', 'Jugo de mango africano', 'Mangosaft afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 18, 0.5),
  R(`عصير أناناس ${T}`, 'Pineapple juice African', 'Jus d ananas africain', 'Jugo de piña africano', 'Ananassaft afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 16, 0.5),
  R(`عصير أفوكادو ${T}`, 'Avocado juice African', 'Jus d avocat africain', 'Jugo de aguacate africano', 'Avocado-Saft afrikanisch', 'beverages', 'snacks', 'pan_south_african', 2, 10, 6),
  R(`أماسي بالعسل ${T}`, 'Amasi with honey African', 'Amasi au miel africain', 'Amasi con miel africano', 'Amasi mit Honig afrikanisch', 'beverages', 'snacks', 'pan_south_african', 3, 10, 3),
  R(`بن بروي ${T}`, 'Brewed coffee African', 'Café brassé africain', 'Café preparado africano', 'Gebrührter Kaffee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 4, 0),
  R(`شاي أخضر ${T}`, 'Green tea African', 'Thé vert africain', 'Té verde africano', 'Grüner Tee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 4, 0),
  R(`ليموناد ${T}`, 'Lemonade African', 'Limonaade africaine', 'Limón africano', 'Limonaade afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 14, 1),
  R(`شاي بالزنجبيل ${T}`, 'Ginger tea African', 'Thé au gingembre africain', 'Té de jengibre africano', 'Ingwer-Tee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 4, 0),
  R(`قهوة بالزنجبيل ${T}`, 'Ginger coffee African', 'Café au gingembre africain', 'Café con jengibre africano', 'Ingwer-Kaffee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 2, 6, 1),
  R(`عصير برتقال ${T}`, 'Orange juice African', 'Jus d orange africain', 'Jugo de naranja africano', 'Orangensaft afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 18, 0.5),
  R(`شراب مانجو ${T}`, 'Mango syrup African', 'Sirop de mangue africain', 'Sirope de mango africano', 'Mangosirup afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 22, 1),
  R(`شاي نعناع ${T}`, 'Mint tea African', 'Thé à la menthe africain', 'Té de menta africano', 'Minztee afrikanisch', 'beverages', 'snacks', 'pan_south_african', 1, 4, 0),
);

// ============================================================ BUILD OUTPUT
const byCategory = {};
const byRegion = {};
const byMeal = {};
for (const d of dishes) {
  byCategory[d.category] = (byCategory[d.category] || 0) + 1;
  byRegion[d.region] = (byRegion[d.region] || 0) + 1;
  byMeal[d.mealType] = (byMeal[d.mealType] || 0) + 1;
}

// Validation
const dups = [];
const seen = new Set();
const badTok = [];
const badRange = [];
for (const d of dishes) {
  if (seen.has(d.name_ar)) dups.push(d.name_ar);
  seen.add(d.name_ar);
  if (d.cal_100 < 20 || d.cal_100 > 900) badRange.push(`${d.name_ar}(${d.cal_100})`);
  if (!d.name_ar.includes('جنوب أفريقي')) badTok.push(d.name_ar);
}

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}
if (dups.length || badTok.length || badRange.length) {
  console.error('\nVALIDATION FAILED:');
  if (dups.length) console.error(`Duplicate names: ${dups.join(', ')}`);
  if (badTok.length) console.error(`Missing token: ${badTok.join(', ')}`);
  if (badRange.length) console.error(`Bad cal range: ${badRange.join(', ')}`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'south-africa-200-proposal.json'),
  JSON.stringify(
    {
      meta: { target: 200, new_dishes: dishes.length, legacy_dishes: 0, with_macros: true },
      categories: Object.keys(byCategory),
      regions: Object.keys(byRegion),
      meal_types: Object.keys(byMeal),
      dishes,
    },
    null,
    2
  )
);
console.log(`\nWrote scripts/south-africa-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);
