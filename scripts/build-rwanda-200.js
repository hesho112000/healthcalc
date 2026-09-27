// Authoring script for the Rwandan 200-dish proposal (scripts/rwanda-200-proposal.json).
// 200 NEW dishes (the 100 legacy rows live in src/data/rwandan-full.ts).
// Regions: pan_rwandan by default (golden rule), regional anchors (kigali, butare, musanze,
// rwamagana, gisenyi), african_shared for dishes shared across East/Central Africa (credited
// to africa-rwanda-2026 source). All Arabic names carry رواندي أصيل token (halal profile: no pork).
// Emphasizes: Isombe, Ibihaza, Ugali (Umutsima), Agatogo, Brochettes, Nyama Choma, Mukeke,
// Sambaza, Akabanga, Kivuguto, Ubushera, Urwagwa, Ikigage, Akarabo tea, Rwandan coffee,
// Matoke (Amateke), Mandazi, Chapati, Ibishyimbo beans, Ubunyobwa groundnuts, Ibijumba.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'رواندي أصيل';

// ============================================================ PAN_RWANDAN + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`أوموتسيما عصيدة فطور ${T}`, 'Umutsima corn porridge breakfast Rwandan', 'Bouillie de maïs petit-déjeuner rwandais', 'Gachas de maíz desayuno ruandés', 'Maisbrei Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 4, 24, 2),
  R(`إيبيجابا عصيدة دخن فطور ${T}`, 'Igikoma millet porridge breakfast Rwandan', 'Bouillie de mil petit-déjeuner rwandais', 'Gachas de mijo desayuno ruandés', 'Hirsebrei Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 4, 22, 1),
  R(`مندازي فطور ${T}`, 'Mandazi breakfast Rwandan', 'Mandazi petit-déjeuner rwandais', 'Mandazi desayuno ruandés', 'Mandazi Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 5, 28, 7),
  R(`شاي بالحليب فطور ${T}`, 'Milk tea breakfast Rwandan', 'Thé au lait petit-déjeuner rwandais', 'Té con leche desayuno ruandés', 'Milchtee Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 2, 8, 2),
  R(`قهوة سوداء فطور ${T}`, 'Black coffee breakfast Rwandan', 'Café noir petit-déjeuner rwandais', 'Café negro desayuno ruandés', 'Schwarzer Kaffee Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 1, 5, 0),
  R(`بطاطا حلوة مسلوقة فطور ${T}`, 'Boiled sweet potatoes breakfast Rwandan', 'Patates douces bouillies petit-déjeuner rwandais', 'Boniatos hervidos desayuno ruandés', 'Gekochte Süßkartoffeln Frühstück ruandisch', 'breakfast_items', 'breakfast', 'musanze', 2, 26, 0),
  R(`ماتوكي أخضر مسلوق فطور ${T}`, 'Steamed green matoke breakfast Rwandan', 'Matoke vert cuit à la vapeur petit-déjeuner rwandais', 'Matoke verde al vapor desayuno ruandés', 'Gedämpfter grüner Matoke Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 2, 26, 1),
  R(`فاصوليا فطور ${T}`, 'Breakfast beans Rwandan', 'Haricots petit-déjeuner rwandais', 'Frijoles desayuno ruandés', 'Bohnen Frühstück ruandisch', 'breakfast_items', 'breakfast', 'butare', 8, 20, 3),
  R(`بيض مقلي مع بصل فطور ${T}`, 'Fried eggs with onions breakfast Rwandan', 'Œufs frits aux oignons petit-déjeuner rwandais', 'Huevos fritos con cebolla desayuno ruandés', 'Spiegeleier mit Zwiebeln Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 11, 3, 11),
  R(`أومليت فطور ${T}`, 'Omelette breakfast Rwandan', 'Omelette petit-déjeuner rwandais', 'Tortilla desayuno ruandés', 'Omelett Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 10, 4, 10),
  R(`خبز بالعسل فطور ${T}`, 'Honey bread breakfast Rwandan', 'Pain au miel petit-déjeuner rwandais', 'Pan con miel desayuno ruandés', 'Honigbrot Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 5, 30, 4),
  R(`عصيدة أرز بحليب فطور ${T}`, 'Rice porridge with milk breakfast Rwandan', 'Bouillie de riz au lait petit-déjeuner rwandais', 'Gachas de arroz con leche desayuno ruandés', 'Reisbrei mit Milch Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 4, 24, 3),
  R(`أفوكادو توست فطور ${T}`, 'Avocado toast breakfast Rwandan', 'Toast à l avocat petit-déjeuner rwandais', 'Tostada de aguacate desayuno ruandés', 'Avocado-Toast Frühstück ruandisch', 'breakfast_items', 'breakfast', 'kigali', 5, 18, 8),
  R(`فواكه موسمية فطور ${T}`, 'Seasonal fruit platter breakfast Rwandan', 'Assortiment de fruits de saison petit-déjeuner rwandais', 'Plato de frutas de temporada desayuno ruandés', 'Saisonale Obstplatte Frühstück ruandisch', 'breakfast_items', 'breakfast', 'pan_rwandan', 1, 16, 1),
);
// --- breads_flatbreads (24) --------------------------------------------------
dishes.push(
  R(`خبز كوامغا ${T}`, 'Kwanga fermented cassava bread Rwandan', 'Kwanga pain de manioc fermenté rwandais', 'Kwanga pan de yuca fermentado ruandés', 'Kwanga fermentiertes Maniokbrot ruandisch', 'breads_flatbreads', 'lunch', 'butare', 2, 30, 1),
  R(`خبز الكسافا ${T}`, 'Cassava bread Rwandan', 'Pain de manioc rwandais', 'Pan de yuca ruandés', 'Maniokbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 2, 30, 2),
  R(`شاباتي بسيط ${T}`, 'Plain chapati Rwandan', 'Chapati simple rwandais', 'Chapati sencillo ruandés', 'Einfacher Chapati ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 7, 28, 6),
  R(`خبز الماندازي ${T}`, 'Mandazi bread Rwandan', 'Pain mandazi rwandais', 'Pan mandazi ruandés', 'Mandazi-Brot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 5, 30, 7),
  R(`خبز الذرة ${T}`, 'Corn bread Rwandan', 'Pain de maïs rwandais', 'Pan de maíz ruandés', 'Maisbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 5, 30, 4),
  R(`خبز البطاطا الحلوة ${T}`, 'Sweet potato bread Rwandan', 'Pain de patate douce rwandais', 'Pan de boniato ruandés', 'Süßkartoffelbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 4, 32, 4),
  R(`خبز الموز ${T}`, 'Plantain bread Rwandan', 'Pain de plantain rwandais', 'Pan de plátano ruinés ruandés', 'Kochbananen-Brot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 3, 32, 4),
  R(`خبز الأرز ${T}`, 'Rice bread Rwandan', 'Pain de riz rwandais', 'Pan de arroz ruandés', 'Reisbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 4, 30, 3),
  R(`فطيرة الخضار ${T}`, 'Vegetable pie Rwandan', 'Tourte aux légumes rwandaise', 'Pastel de verduras ruandés', 'Gemüsetorte ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 7, 22, 12),
  R(`فطيرة اللحم البقري ${T}`, 'Beef pie Rwandan', 'Tourte au bœuf rwandaise', 'Pastel de carne de res ruandés', 'Rindfleischpastete ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 10, 22, 13),
  R(`فطيرة الدجاج ${T}`, 'Chicken pie Rwandan', 'Tourte au poulet rwandaise', 'Pastel de pollo ruandés', 'Hähnchenpastete ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 11, 20, 12),
  R(`رغيف قمح ${T}`, 'Wheat loaf Rwandan', 'Pain de blé rwandais', 'Pan de trigo ruandés', 'Weizenbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 8, 30, 4),
  R(`خبز بالجبن ${T}`, 'Cheese bread Rwandan', 'Pain au fromage rwandais', 'Pan con queso ruandés', 'Käsebrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 8, 26, 6),
  R(`خبز القرفة ${T}`, 'Cinnamon bread Rwandan', 'Pain à la cannelle rwandais', 'Pan de canela ruandés', 'Zimtbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 5, 32, 5),
  R(`خبز العسل الحلو ${T}`, 'Sweet honey bread Rwandan', 'Pain doux au miel rwandais', 'Pan dulce de miel ruandés', 'Süßes Honigbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 4, 34, 4),
  R(`دونات ${T}`, 'Donut Rwandan', 'Donut rwandais', 'Dona ruandesa', 'Donut ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 5, 30, 9),
  R(`خبز الموز الناضج ${T}`, 'Ripe banana bread Rwandan', 'Pain à la banane mûre rwandais', 'Pan de plátano maduro ruandés', 'Reifes Bananenbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 4, 32, 6),
  R(`خبز بالسمسم ${T}`, 'Sesame bread Rwandan', 'Pain au sésame rwandais', 'Pan de sésamo ruandés', 'Sesambrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 6, 28, 7),
  R(`خبز الحبوب الكاملة ${T}`, 'Wholegrain bread Rwandan', 'Pain complet rwandais', 'Pan integral ruandés', 'Vollkornbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 7, 28, 4),
  R(`خبز البطاطا العادي ${T}`, 'Potato bread Rwandan', 'Pain de pomme de terre rwandais', 'Pan de patata ruandés', 'Kartoffelbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 4, 28, 4),
  R(`خبز بالفول السوداني ${T}`, 'Peanut bread Rwandan', 'Pain aux cacahuètes rwandais', 'Pan con cacahuete ruandés', 'Erdnussbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 9, 26, 9),
  R(`خبز محمص فطور ${T}`, 'Toasted bread Rwandan', 'Pain grillé rwandais', 'Pan tostado ruandés', 'Toastbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 6, 22, 4),
  R(`خبز الأعشاب ${T}`, 'Herb bread Rwandan', 'Pain aux herbes rwandais', 'Pan de hierbas ruandés', 'Kräuterbrot ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 6, 28, 4),
  R(`رول خبز ${T}`, 'Bread roll Rwandan', 'Petit pain rwandais', 'Panecillo ruandés', 'Brötchen ruandisch', 'breads_flatbreads', 'lunch', 'pan_rwandan', 6, 28, 4),
);
// --- rice_biryani (10) ------------------------------------------------------
dishes.push(
  R(`أرز بالفاصوليا ${T}`, 'Rice with beans Rwandan', 'Riz aux haricots rwandais', 'Arroz con frijoles ruandés', 'Reis mit Bohnen ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 7, 28, 3),
  R(`أرز بالبازيلاء ${T}`, 'Rice with peas Rwandan', 'Riz aux petits pois rwandais', 'Arroz con guisantes ruandés', 'Reis mit Erbsen ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 6, 28, 3),
  R(`أرز بالخضار ${T}`, 'Vegetable rice Rwandan', 'Riz aux légumes rwandais', 'Arroz con verduras ruandés', 'Gemüsereis ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 4, 30, 4),
  R(`أرز بصلصة الطماطم ${T}`, 'Rice with tomato sauce Rwandan', 'Riz à la sauce tomate rwandais', 'Arroz con salsa de tomate ruandés', 'Reis mit Tomatensauce ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 5, 30, 4),
  R(`أرز بالدجاج ${T}`, 'Chicken rice Rwandan', 'Riz au poulet rwandais', 'Arroz con pollo ruandés', 'Hähnchenreis ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 12, 26, 6),
  R(`أرز باللحم ${T}`, 'Meat rice Rwandan', 'Riz à la viande rwandais', 'Arroz con carne ruandés', 'Fleischreis ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 11, 26, 7),
  R(`أرز بالسمك ${T}`, 'Fish rice Rwandan', 'Riz au poisson rwandais', 'Arroz con pescado ruandés', 'Fischreis ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 10, 27, 5),
  R(`أرز بجوز الهند ${T}`, 'Coconut rice Rwandan', 'Riz à la noix de coco rwandais', 'Arroz con coco ruandés', 'Kokosreis ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 5, 30, 5),
  R(`بيلاو ${T}`, 'Pilau Rwandan', 'Pilau rwandais', 'Pilau ruandés', 'Pilau ruandisch', 'rice_biryani', 'lunch', 'african_shared', 8, 30, 6),
  R(`أرز مبهر كيغالي ${T}`, 'Kigali spiced rice Rwandan', 'Riz épicé de Kigali rwandais', 'Arroz especiado de Kigali ruandés', 'Gewürzreis aus Kigali ruandisch', 'rice_biryani', 'lunch', 'pan_rwandan', 5, 30, 5),
);
// --- dals_legumes (16) -----------------------------------------------------
dishes.push(
  R(`فاصوليا بالموز ${T}`, 'Beans with bananas Rwandan', 'Haricots aux bananes rwandais', 'Frijoles con plátano ruandés', 'Bohnen mit Bananen ruandisch', 'dals_legumes', 'lunch', 'rwamagana', 7, 24, 2),
  R(`يخنة الفاصوليا الحمراء ${T}`, 'Red bean stew Rwandan', 'Ragoût de haricots rouges rwandais', 'Guiso de frijoles rojos ruandés', 'Rote-Bohnen-Eintopf ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 8, 22, 3),
  R(`فاصوليا بزبدة الفول السوداني ${T}`, 'Beans in peanut butter Rwandan', 'Haricots au beurre de cacahuète rwandais', 'Frijoles con mantequilla de cacahuete ruandés', 'Bohnen mit Erdnussbutter ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 9, 20, 6),
  R(`فاصوليا بيضاء ${T}`, 'White beans Rwandan', 'Haricots blancs rwandais', 'Frijoles blancos ruandés', 'Weiße Bohnen ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 8, 22, 2),
  R(`شوربة الفاصوليا الرد ${T}`, 'Kidney bean soup Rwandan', 'Soupe aux haricots rouges rwandaise', 'Sopa de frijoles rojos ruandés', 'Kidneybohnen-Suppe ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 7, 20, 3),
  R(`بازيلاء مطهوة ${T}`, 'Cooked peas Rwandan', 'Petits pois cuits rwandais', 'Guisantes cocidos ruandés', 'Gekochte Erbsen ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 7, 18, 2),
  R(`بازيلاء خضراء طازجة ${T}`, 'Fresh green peas Rwandan', 'Petits pois frais rwandais', 'Guisantes verdes frescos ruandés', 'Frische grüne Erbsen ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 6, 16, 1),
  R(`حمص مطهو ${T}`, 'Cooked chickpeas Rwandan', 'Pois chiches cuits rwandais', 'Garbanzos cocidos ruandés', 'Gekochte Kichererbsen ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 7, 18, 3),
  R(`عدس أحمر يخنة ${T}`, 'Red lentil stew Rwandan', 'Ragoût de lentilles rouges rwandais', 'Guiso de lentejas rojas ruandés', 'Rote-Linsen-Eintopf ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 8, 18, 2),
  R(`لوبيا مطهوة ${T}`, 'Cooked cowpeas Rwandan', 'Niébés cuits rwandais', 'Caupíes cocidos ruandés', 'Gekochte Kuherbsen ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 7, 20, 2),
  R(`فول الصويا مطهو ${T}`, 'Cooked soybeans Rwandan', 'Soja cuit rwandais', 'Soja cocida ruandés', 'Gekochte Sojabohnen ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 11, 12, 6),
  R(`فول سوداني مطهو ${T}`, 'Cooked groundnuts Rwandan', 'Cacahuètes cuites rwandaises', 'Cacahuetes cocidos ruandés', 'Gekochte Erdnüsse ruandisch', 'dals_legumes', 'lunch', 'rwamagana', 10, 14, 12),
  R(`بامية بالطماطم ${T}`, 'Okra with tomato Rwandan', 'Gombo à la tomate rwandais', 'Okra con tomate ruandés', 'Okra mit Tomaten ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 4, 14, 4),
  R(`فاصوليا مع الذرة ${T}`, 'Beans and corn Rwandan', 'Haricots et maïs rwandais', 'Frijoles y maíz ruandés', 'Bohnen und Mais ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 7, 26, 3),
  R(`كاري الفاصوليا ${T}`, 'Bean curry Rwandan', 'Curry de haricots rwandais', 'Curry de frijoles ruandés', 'Bohnen-Curry ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 7, 20, 6),
  R(`فاصوليا خضراء مطهوة ${T}`, 'Stewed green beans Rwandan', 'Haricots verts mijotés rwandais', 'Judías verdes guisadas ruandés', 'Geschmorte grüne Bohnen ruandisch', 'dals_legumes', 'lunch', 'pan_rwandan', 3, 10, 3),
);
// --- vegetarian_mains (22) --------------------------------------------------
dishes.push(
  R(`إيسومبي مع صلصة فول سوداني ${T}`, 'Isombe with peanut sauce Rwandan', 'Isombe à la sauce cacahuète rwandais', 'Isombe con salsa de cacahuete ruandés', 'Isombe mit Erdnusssauce ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 6, 16, 7),
  R(`إيبيهازا قرع مع فاصوليا ${T}`, 'Ibihaza pumpkin with beans Rwandan', 'Ibihaza courge aux haricots rwandais', 'Ibihaza calabaza con frijoles ruandés', 'Ibihaza Kürbis mit Bohnen ruandisch', 'vegetarian_mains', 'lunch', 'butare', 6, 20, 3),
  R(`أغاتوغو كسافا وموز ${T}`, 'Agatogo cassava plantain mash Rwandan', 'Agatogo purée de manioc et plantain rwandais', 'Agatogo puré de yuca y plátano ruandés', 'Agatogo Maniok-Kochbananen-Püree ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 26, 3),
  R(`إمبوغا خضار مطهوة ${T}`, 'Imboga cooked greens Rwandan', 'Imboga légumes verts cuits rwandais', 'Imboga verduras cocidas ruandés', 'Imboga gekochtes Gemüse ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 4, 10, 5),
  R(`ملفوف وجزر مطهو ${T}`, 'Cabbage and carrots Rwandan', 'Chou et carottes mijotés rwandais', 'Repollo y zanahorias guisados ruandés', 'Kohl und Karotten gedünstet ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 10, 3),
  R(`سبانخ بالثوم ${T}`, 'Garlic spinach Rwandan', 'Épinards à l ail rwandais', 'Espinacas con ajo ruandés', 'Spinat mit Knoblauch ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 4, 8, 6),
  R(`موز أخضر مطهو ${T}`, 'Cooked green bananas Rwandan', 'Bananes vertes cuites rwandaises', 'Plátanos verdes cocidos ruandés', 'Gekochte grüne Bananen ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 2, 26, 1),
  R(`باذنجان مشوي ${T}`, 'Grilled eggplant Rwandan', 'Aubergine grillée rwandaise', 'Berenjena a la parrilla ruandés', 'Gegrillte Aubergine ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 12, 6),
  R(`بطاطا مهروسة ${T}`, 'Mashed potatoes Rwandan', 'Purée de pommes de terre rwandaise', 'Puré de patatas ruandés', 'Kartoffelpüree ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 20, 7),
  R(`قرع مسلوق بسيط ${T}`, 'Simple boiled pumpkin Rwandan', 'Courge bouillie simple rwandaise', 'Calabaza hervida simple ruandés', 'Einfacher Kürbis ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 2, 16, 2),
  R(`فطر محمّر بالثوم ${T}`, 'Sautéed garlic mushrooms Rwandan', 'Champignons sautés à l ail rwandais', 'Champiñones salteados con ajo ruandés', 'Gebratene Knoblauchpilze ruandisch', 'vegetarian_mains', 'lunch', 'musanze', 5, 8, 8),
  R(`فاصوليا خضراء مسلوقة ${T}`, 'Boiled green beans Rwandan', 'Haricots verts bouillis rwandais', 'Judías verdes hervidas ruandés', 'Gekochte grüne Bohnen ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 10, 2),
  R(`ذرة مسلوقة ${T}`, 'Boiled corn Rwandan', 'Maïs bouilli rwandais', 'Maíz hervido ruandés', 'Gekochter Mais ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 4, 24, 3),
  R(`بطاطا حلوة مشوية ${T}`, 'Roasted sweet potatoes Rwandan', 'Patates douces rôties rwandaises', 'Boniatos asados ruandés', 'Geröstete Süßkartoffeln ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 26, 1),
  R(`جزر مطهو ${T}`, 'Cooked carrots Rwandan', 'Carottes cuites rwandaises', 'Zanahorias cocidas ruandés', 'Gekochte Karotten ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 2, 12, 2),
  R(`أفوكادو محشي بالخضار ${T}`, 'Vegetable stuffed avocado Rwandan', 'Avocat farci aux légumes rwandais', 'Aguacate relleno de verduras ruandés', 'Mit Gemüse gefüllte Avocado ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 12, 9),
  R(`أوراق القرع مطهوة ${T}`, 'Cooked pumpkin leaves Rwandan', 'Feuilles de courge cuites rwandaises', 'Hojas de calabaza cocidas ruandés', 'Gekochte Kürbisblätter ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 4, 8, 5),
  R(`كسافا مسلوقة بالثوم ${T}`, 'Boiled garlic cassava Rwandan', 'Manioc bouilli à l ail rwandais', 'Yuca hervida con ajo ruandés', 'Gekochter Maniok mit Knoblauch ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 2, 28, 2),
  R(`بلانتين مشوي ${T}`, 'Grilled plantain Rwandan', 'Plantain grillé rwandais', 'Plátano macho a la parrilla ruandés', 'Gegrillte Kochbanane ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 2, 30, 2),
  R(`يخنة الخضار الموسمية ${T}`, 'Seasonal vegetable stew Rwandan', 'Ragoût de légumes de saison rwandais', 'Guiso de verduras de temporada ruandés', 'Saisonaler Gemüseeintopf ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 4, 14, 5),
  R(`طماطم محشية ${T}`, 'Stuffed tomatoes Rwandan', 'Tomates farcies rwandaises', 'Tomates rellenos ruandés', 'Gefüllte Tomaten ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 4, 14, 6),
  R(`قلقاس مطهو ${T}`, 'Cooked taro Rwandan', 'Taro cuit rwandais', 'Taro cocido ruandés', 'Gekochtes Taro ruandisch', 'vegetarian_mains', 'lunch', 'pan_rwandan', 3, 24, 1),
);
// --- poultry_mains (12) -----------------------------------------------------
dishes.push(
  R(`دجاج مع إيسومبي ${T}`, 'Chicken with isombe Rwandan', 'Poulet à l isombe rwandais', 'Pollo con isombe ruandés', 'Hähnchen mit Isombe ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 16, 10, 8),
  R(`دجاج مطهو بصلصة الفول السوداني ${T}`, 'Chicken in peanut stew Rwandan', 'Poulet au ragoût de cacahuètes rwandais', 'Pollo en guiso de cacahuete ruandés', 'Hähnchen im Erdnusseintopf ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 15, 12, 10),
  R(`بروتشيت الدجاج ${T}`, 'Chicken brochettes Rwandan', 'Brochettes de poulet rwandaises', 'Brochetas de pollo ruandés', 'Hähnchenspieße ruandisch', 'poultry_mains', 'lunch', 'kigali', 20, 6, 10),
  R(`دجاج مشوي على الفحم ${T}`, 'Charcoal grilled chicken Rwandan', 'Poulet grillé au charbon rwandais', 'Pollo asado al carbón ruandés', 'Kohlegrill-Hähnchen ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 22, 4, 12),
  R(`دجاج بالعسل والليمون ${T}`, 'Honey lemon chicken Rwandan', 'Poulet au miel et citron rwandais', 'Pollo con miel y limón ruandés', 'Honig-Zitronen-Hähnchen ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 20, 10, 8),
  R(`دجاج بالثوم والزنجبيل ${T}`, 'Garlic ginger chicken Rwandan', 'Poulet à l ail et gingembre rwandais', 'Pollo con ajo y jengibre ruandés', 'Knoblauch-Ingwer-Hähnchen ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 19, 6, 10),
  R(`دجاج مع بيلاو ${T}`, 'Chicken with pilau Rwandan', 'Poulet au pilau rwandais', 'Pollo con pilau ruandés', 'Hähnchen mit Pilau ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 14, 24, 6),
  R(`دجاج مع ماتوكي ${T}`, 'Chicken with matoke Rwandan', 'Poulet au matoke rwandais', 'Pollo con matoke ruandés', 'Hähnchen mit Matoke ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 14, 22, 6),
  R(`دجاج بالطماطم والروزماري ${T}`, 'Rosemary tomato chicken Rwandan', 'Poulet tomate romarin rwandais', 'Pollo tomate romero ruandés', 'Hähnchen mit Tomate und Rosmarin ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 18, 8, 9),
  R(`دجاج مقلي بالبقسماط ${T}`, 'Breaded fried chicken Rwandan', 'Poulet pané frit rwandais', 'Pollo empanado frito ruandés', 'Panierte gebratene Hähnchen ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 18, 12, 12),
  R(`حساء الدجاج بالخضار ${T}`, 'Chicken vegetable soup Rwandan', 'Soupe de poulet aux légumes rwandaise', 'Sopa de pollo con verduras ruandés', 'Hähnchen-Gemüsesuppe ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 10, 8, 4),
  R(`دجاج مع أرز أبيض ${T}`, 'Chicken with white rice Rwandan', 'Poulet au riz blanc rwandais', 'Pollo con arroz blanco ruandés', 'Hähnchen mit weißem Reis ruandisch', 'poultry_mains', 'lunch', 'pan_rwandan', 14, 26, 5),
);
// --- meat_mains (22) --------------------------------------------------------
dishes.push(
  R(`بروتشيت اللحم البقري ${T}`, 'Beef brochettes Rwandan', 'Brochettes de bœuf rwandaises', 'Brochetas de res ruandés', 'Rindfleischspieße ruandisch', 'meat_mains', 'lunch', 'kigali', 22, 4, 12),
  R(`بروتشيت لحم الماعز على الفحم ${T}`, 'Charcoal goat brochettes Rwandan', 'Brochettes de chèvre au charbon rwandaises', 'Brochetas de cabra al carbón ruandés', 'Kohlegrill-Ziegenspieße ruandisch', 'meat_mains', 'lunch', 'kigali', 21, 4, 13),
  R(`بروتشيت مشكلة ${T}`, 'Mixed brochettes Rwandan', 'Brochettes mixtes rwandaises', 'Brochetas mixtas ruandés', 'Gemischte Spieße ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 20, 6, 14),
  R(`نياما تشوما ماعز ${T}`, 'Goat nyama choma Rwandan', 'Nyama choma de chèvre rwandais', 'Nyama choma de cabra ruandés', 'Ziegen-Nyama-Choma ruandisch', 'meat_mains', 'lunch', 'african_shared', 22, 4, 14),
  R(`يخنة اللحم البقري ${T}`, 'Beef stew Rwandan', 'Ragoût de bœuf rwandais', 'Guiso de res ruandés', 'Rindfleischeintopf ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 18, 8, 9),
  R(`يخنة لحم الماعز ${T}`, 'Goat stew Rwandan', 'Ragoût de chèvre rwandais', 'Guiso de cabra ruandés', 'Ziegeneintopf ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 17, 8, 10),
  R(`لحم بقري مع إيسومبي ${T}`, 'Beef with isombe Rwandan', 'Bœuf à l isombe rwandais', 'Res con isombe ruandés', 'Rindfleisch mit Isombe ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 16, 10, 8),
  R(`لحم بقري مع موز مطهو ${T}`, 'Beef with cooked bananas Rwandan', 'Bœuf aux bananes cuites rwandais', 'Res con plátanos cocidos ruandés', 'Rindfleisch mit gekochten Bananen ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 15, 18, 8),
  R(`لحم بقري بصلصة الفول السوداني ${T}`, 'Beef in peanut sauce Rwandan', 'Bœuf à la sauce cacahuète rwandais', 'Res en salsa de cacahuete ruandés', 'Rindfleisch in Erdnusssauce ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 17, 10, 12),
  R(`كباب لحم الماعز ${T}`, 'Goat kebab Rwandan', 'Kebab de chèvre rwandais', 'Kebab de cabra ruandés', 'Ziegenkebab ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 19, 8, 14),
  R(`لحم الضأن المشوي ${T}`, 'Grilled lamb Rwandan', 'Agneau grillé rwandais', 'Cordero a la parrilla ruandés', 'Gegrilltes Lamm ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 20, 4, 15),
  R(`يخنة لحم الضأن ${T}`, 'Lamb stew Rwandan', 'Ragoût d agneau rwandais', 'Guiso de cordero ruandés', 'Lammeintopf ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 16, 8, 12),
  R(`لحم بقري بالبصل المطبوخ ${T}`, 'Beef with cooked onions Rwandan', 'Bœuf aux oignons cuits rwandais', 'Res con cebollas cocidas ruandés', 'Rindfleisch mit gekochten Zwiebeln ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 18, 8, 10),
  R(`لحم بقري مع القرع ${T}`, 'Beef with pumpkin Rwandan', 'Bœuf à la courge rwandais', 'Res con calabaza ruandés', 'Rindfleisch mit Kürbis ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 15, 12, 9),
  R(`كاري اللحم البقري ${T}`, 'Beef curry Rwandan', 'Curry de bœuf rwandais', 'Curry de res ruandés', 'Rind-Curry ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 16, 12, 10),
  R(`كرشة مطهوة بصلصة الطماطم ${T}`, 'Tripe in tomato sauce Rwandan', 'Tripes à la sauce tomate rwandaises', 'Callos en salsa de tomate ruandés', 'Kutteln in Tomatensauce ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 14, 6, 8),
  R(`كبد بقري مشوي ${T}`, 'Grilled beef liver Rwandan', 'Foie de bœuf grillé rwandais', 'Hígado de res a la parrilla ruandés', 'Gegrillte Rinderleber ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 20, 6, 8),
  R(`لحم بقري حار بالفلفل ${T}`, 'Spicy beef Rwandan', 'Bœuf épicé rwandais', 'Res picante ruandés', 'Würziges Rindfleisch ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 19, 8, 11),
  R(`لحم بقري مع أوغالي ${T}`, 'Beef with ugali Rwandan', 'Bœuf à l ugali rwandais', 'Res con ugali ruandés', 'Rindfleisch mit Ugali ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 15, 20, 8),
  R(`لحم ماعز مع القرع ${T}`, 'Goat with pumpkin Rwandan', 'Chèvre à la courge rwandaise', 'Cabra con calabaza ruandés', 'Ziege mit Kürbis ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 14, 12, 10),
  R(`أضلاع مشوية ${T}`, 'Grilled ribs Rwandan', 'Côtes grillées rwandaises', 'Costillas a la parrilla ruandés', 'Gegrillte Rippchen ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 18, 6, 16),
  R(`لحم بقري بصلصة الطماطم ${T}`, 'Beef in tomato sauce Rwandan', 'Bœuf à la sauce tomate rwandais', 'Res en salsa de tomate ruandés', 'Rindfleisch in Tomatensauce ruandisch', 'meat_mains', 'lunch', 'pan_rwandan', 17, 8, 10),
);
// --- seafood_mains (4) -----------------------------------------------------
dishes.push(
  R(`موكيكي تيلابيا مشوي ${T}`, 'Mukeke grilled tilapia Rwandan', 'Mukeke tilapia grillé rwandais', 'Mukeke tilapia a la parrilla ruandés', 'Mukeke gegrillter Tilapia ruandisch', 'seafood_mains', 'lunch', 'african_shared', 21, 2, 5),
  R(`سامبازا مقلي من كييفو ${T}`, 'Fried Kivu sambaza Rwandan', 'Sambaza frit du Kivu rwandais', 'Sambaza frito del Kivu ruandés', 'Gebratene Sambaza vom Kivu ruandisch', 'seafood_mains', 'lunch', 'pan_rwandan', 20, 3, 9),
  R(`سمك بحيرة كييفو مطهو ${T}`, 'Cooked Lake Kivu fish Rwandan', 'Poisson du lac Kivu mijoté rwandais', 'Pescado del lago Kivu guisado ruandés', 'Geschmorter Fisch vom Kivu-See ruandisch', 'seafood_mains', 'lunch', 'gisenyi', 18, 6, 7),
  R(`تيلابيا مقلية ${T}`, 'Fried tilapia Rwandan', 'Tilapia frit rwandais', 'Tilapia frito ruandés', 'Gebratener Tilapia ruandisch', 'seafood_mains', 'lunch', 'pan_rwandan', 20, 4, 9),
);
// --- soups_salads (16) -----------------------------------------------------
dishes.push(
  R(`شوربة القرع ${T}`, 'Pumpkin soup Rwandan', 'Soupe de courge rwandaise', 'Sopa de calabaza ruandés', 'Kürbissuppe ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 4, 12, 5),
  R(`شوربة البطاطا الحلوة ${T}`, 'Sweet potato soup Rwandan', 'Soupe de patate douce rwandaise', 'Sopa de boniato ruandés', 'Süßkartoffelsuppe ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 3, 16, 3),
  R(`شوربة الفول السوداني ${T}`, 'Peanut soup Rwandan', 'Soupe de cacahuètes rwandaise', 'Sopa de cacahuete ruandés', 'Erdnusssuppe ruandisch', 'soups_salads', 'lunch', 'rwamagana', 7, 12, 10),
  R(`شوربة سمك كييفو ${T}`, 'Kivu fish soup Rwandan', 'Soupe de poisson du Kivu rwandaise', 'Sopa de pescado del Kivu ruandés', 'Fischsuppe vom Kivu ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 12, 6, 5),
  R(`شوربة الإيسومبي ${T}`, 'Isombe soup Rwandan', 'Soupe à l isombe rwandaise', 'Sopa de isombe ruandés', 'Isombe-Suppe ruandisch', 'soups_salads', 'lunch', 'butare', 5, 10, 6),
  R(`شوربة الدجاج بالزنجبيل ${T}`, 'Ginger chicken soup Rwandan', 'Soupe de poulet au gingembre rwandaise', 'Sopa de pollo con jengibre ruandés', 'Ingwer-Hähnchensuppe ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 12, 7, 6),
  R(`شوربة اللحم البقري ${T}`, 'Beef broth Rwandan', 'Bouillon de bœuf rwandais', 'Caldo de res ruandés', 'Rindfleischbrühe ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 10, 6, 7),
  R(`شوربة العدس ${T}`, 'Rwandan lentil soup Rwandan', 'Soupe de lentilles rwandaise', 'Sopa de lentejas ruandés', 'Linsensuppe ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 6, 14, 3),
  R(`سلطة كاتشومباري ${T}`, 'Kachumbari salad Rwandan', 'Salade kachumbari rwandaise', 'Ensalada kachumbari ruandés', 'Kachumbari-Salat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 2, 9, 1),
  R(`سلطة الجزر ${T}`, 'Carrot salad Rwandan', 'Salade de carottes rwandaise', 'Ensalada de zanahorias ruandés', 'Karottensalat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 1, 10, 2),
  R(`سلطة الملفوف ${T}`, 'Cabbage slaw Rwandan', 'Salade de chou rwandaise', 'Ensalada de repollo ruandés', 'Kohlsalat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 2, 8, 4),
  R(`سلطة القرع المحمص ${T}`, 'Roasted pumpkin salad Rwandan', 'Salade de courge rôtie rwandaise', 'Ensalada de calabaza asada ruandés', 'Gerösteter Kürbissalat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 2, 12, 6),
  R(`سلطة البطاطا ${T}`, 'Potato salad Rwandan', 'Salade de pommes de terre rwandaise', 'Ensalada de patatas ruandés', 'Kartoffelsalat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 3, 16, 6),
  R(`سلطة الذرة والأفوكادو ${T}`, 'Corn avocado salad Rwandan', 'Salade maïs avocat rwandaise', 'Ensalada de maíz y aguacate ruandés', 'Mais-Avocado-Salat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 3, 14, 5),
  R(`سلطة السبانخ الطازجة ${T}`, 'Fresh spinach salad Rwandan', 'Salade d épinards frais rwandaise', 'Ensalada de espinacas frescas ruandés', 'Frischer Spinatsalat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 3, 6, 3),
  R(`سلطة البنجر ${T}`, 'Beetroot salad Rwandan', 'Salade de betterave rwandaise', 'Ensalada de remolacha ruandés', 'Rote-Bete-Salat ruandisch', 'soups_salads', 'lunch', 'pan_rwandan', 2, 12, 2),
);
// --- street_snacks (22) ----------------------------------------------------
dishes.push(
  R(`ذرة مشوية بالفحم ${T}`, 'Charcoal roasted corn Rwandan', 'Maïs rôti au charbon rwandais', 'Maíz asado al carbón ruandés', 'Kohlegerösteter Mais ruandisch', 'street_snacks', 'snacks', 'african_shared', 4, 20, 2),
  R(`فول سوداني محمص ${T}`, 'Roasted groundnuts Rwandan', 'Cacahuètes grillées rwandaises', 'Cacahuetes tostados ruandés', 'Geröstete Erdnüsse ruandisch', 'street_snacks', 'snacks', 'african_shared', 14, 18, 15),
  R(`شيبس البلانتين ${T}`, 'Plantain chips Rwandan', 'Chips de plantain rwandaises', 'Chips de plátano ruandés', 'Kochbananen-Chips ruandisch', 'street_snacks', 'snacks', 'african_shared', 2, 32, 9),
  R(`بطاطا مقلية كيغالي ${T}`, 'Kigali fries Rwandan', 'Frites de Kigali rwandaises', 'Papas fritas de Kigali ruandés', 'Pommes aus Kigali ruandisch', 'street_snacks', 'snacks', 'kigali', 3, 26, 9),
  R(`كسافا مقلية ${T}`, 'Fried cassava Rwandan', 'Manioc frit rwandais', 'Yuca frita ruandés', 'Frittierter Maniok ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 2, 32, 5),
  R(`موز مشوي ${T}`, 'Roasted bananas Rwandan', 'Bananes rôties rwandaises', 'Plátanos asados ruandés', 'Geröstete Bananen ruandisch', 'street_snacks', 'snacks', 'gisenyi', 2, 30, 1),
  R(`بطاطا مشوية من الشارع ${T}`, 'Street roasted potatoes Rwandan', 'Pommes de terre rôties de rue rwandaises', 'Patatas asadas callejeras ruandés', 'Geröstete Straßenkartoffeln ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 3, 24, 3),
  R(`مندازي من الشارع ${T}`, 'Street mandazi Rwandan', 'Mandazi de rue rwandais', 'Mandazi callejero ruandés', 'Straßen-Mandazi ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 4, 28, 7),
  R(`ساموسة خضار مقلية ${T}`, 'Fried vegetable samosa Rwandan', 'Samoussa aux légumes frit rwandais', 'Samosa de verduras frita ruandés', 'Gebratene Gemüse-Samosa ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 6, 22, 7),
  R(`ساموسة لحم مقلية ${T}`, 'Fried meat samosa Rwandan', 'Samoussa à la viande frit rwandais', 'Samosa de carne frita ruandés', 'Gebratene Fleisch-Samosa ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 9, 20, 9),
  R(`فول مسلوم من الشارع ${T}`, 'Street boiled beans Rwandan', 'Haricots bouillis de rue rwandais', 'Frijoles hervidos callejeros ruandés', 'Gekochte Straßenbohnen ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 8, 20, 3),
  R(`بيض مسلوق من الشارع ${T}`, 'Street boiled eggs Rwandan', 'Œufs durs de rue rwandais', 'Huevos duros callejeros ruandés', 'Gekochte Straßeneier ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 11, 2, 8),
  R(`رول شاباتي بالفول ${T}`, 'Chapati bean roll Rwandan', 'Rouleau chapati aux haricots rwandais', 'Rollo de chapati con frijoles ruandés', 'Chapati-Bohnenrolle ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 7, 28, 6),
  R(`فطائر صغيرة محشية ${T}`, 'Stuffed mini pastries Rwandan', 'Petites pâtisseries farcies rwandaises', 'Mini pasteles rellenos ruandés', 'Gefüllte Mini-Pasteten ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 8, 22, 10),
  R(`بروتشيت صغير من الشارع ${T}`, 'Street mini brochettes Rwandan', 'Mini brochettes de rue rwandaises', 'Mini brochetas callejeras ruandés', 'Mini-Spieße von der Straße ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 19, 6, 12),
  R(`فطيرة موز مقلية ${T}`, 'Fried banana fritters Rwandan', 'Beignets de banane frits rwandais', 'Buñuelos de plátano fritos ruandés', 'Frittierte Bananenplätzchen ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 3, 32, 8),
  R(`بطاطا حلوة مقلية ${T}`, 'Fried sweet potatoes Rwandan', 'Patates douces frites rwandaises', 'Boniatos fritos ruandés', 'Frittierte Süßkartoffeln ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 2, 28, 6),
  R(`مكسرات مشكلة محمصة ${T}`, 'Roasted mixed nuts Rwandan', 'Noix mélangées grillées rwandaises', 'Nueces mixtas tostadas ruandés', 'Geröstete gemischte Nüsse ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 8, 14, 14),
  R(`ذرة مفرقعة حارة ${T}`, 'Spicy popcorn Rwandan', 'Pop-corn épicé rwandais', 'Palomitas picantes ruandés', 'Würziges Popcorn ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 4, 24, 3),
  R(`شيبس الكسافا مقرمش ${T}`, 'Crispy cassava chips Rwandan', 'Chips de manioc croustillants rwandais', 'Chips de yuca crujientes ruandés', 'Knackige Maniok-Chips ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 2, 30, 8),
  R(`كوب فواكه من الشارع ${T}`, 'Street fruit cup Rwandan', 'Coupe de fruits de rue rwandaise', 'Vaso de frutas callejero ruandés', 'Straßen-Obstbecher ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 1, 18, 1),
  R(`سمك صغير مقلي مقرمش ${T}`, 'Crispy small fried fish Rwandan', 'Petits poissons frits croustillants rwandais', 'Pescados pequeños fritos crujientes ruandés', 'Knackig frittierte kleine Fische ruandisch', 'street_snacks', 'snacks', 'pan_rwandan', 19, 6, 8),
);
// --- condiments (8) ----------------------------------------------------------
dishes.push(
  R(`زيت الفلفل أكابانغا ${T}`, 'Akabanga chili oil Rwandan', 'Huile de piment Akabanga rwandaise', 'Aceite de chile Akabanga ruandés', 'Akabanga-Chiliöl ruandisch', 'condiments', 'snacks', 'pan_rwandan', 1, 4, 12),
  R(`صلصة البيل بيلي الحارة ${T}`, 'Hot pili-pili sauce Rwandan', 'Sauce pili-pili piquante rwandaise', 'Salsa pili-pili picante ruandés', 'Scharfe Pili-Pili-Sauce ruandisch', 'condiments', 'snacks', 'pan_rwandan', 2, 10, 6),
  R(`صلصة الفول السوداني السميكة ${T}`, 'Thick peanut sauce Rwandan', 'Sauce d arachide épaisse rwandaise', 'Salsa de cacahuete espesa ruandés', 'Dicke Erdnusssauce ruandisch', 'condiments', 'snacks', 'pan_rwandan', 9, 12, 16),
  R(`تشاتني الطماطم ${T}`, 'Tomato chutney Rwandan', 'Chutney de tomate rwandais', 'Chutney de tomate ruandés', 'Tomatenschutney ruandisch', 'condiments', 'snacks', 'pan_rwandan', 2, 12, 3),
  R(`صوص الأعشاب الخضراء ${T}`, 'Green herb sauce Rwandan', 'Sauce verte aux herbes rwandaise', 'Salsa verde de hierbas ruandés', 'Grüne Kräutersauce ruandisch', 'condiments', 'snacks', 'pan_rwandan', 2, 8, 6),
  R(`صلصة الثوم ${T}`, 'Garlic sauce Rwandan', 'Sauce à l ail rwandaise', 'Salsa de ajo ruandés', 'Knoblauchsauce ruandisch', 'condiments', 'snacks', 'pan_rwandan', 2, 12, 7),
  R(`صوص الشواء ${T}`, 'BBQ sauce Rwandan', 'Sauce barbecue rwandaise', 'Salsa barbacoa ruandés', 'BBQ-Sauce ruandisch', 'condiments', 'snacks', 'pan_rwandan', 3, 14, 5),
  R(`خلطة البهارات ${T}`, 'Rwandan spice blend Rwandan', 'Mélange d épices rwandais', 'Mezcla de especias ruandés', 'Ruandische Gewürzmischung ruandisch', 'condiments', 'snacks', 'pan_rwandan', 4, 16, 4),
);
// --- desserts_sweets (8) -----------------------------------------------------
dishes.push(
  R(`موز بالعسل المحلي ${T}`, 'Local honey bananas Rwandan', 'Bananes au miel local rwandaises', 'Plátanos con miel local ruandés', 'Bananen mit lokalem Honig ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 2, 30, 3),
  R(`كعكة الموز ${T}`, 'Banana cake Rwandan', 'Gâteau à la banane rwandais', 'Pastel de plátano ruandés', 'Bananenkuchen ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 5, 34, 8),
  R(`فطيرة الفواكه كيغالي ${T}`, 'Kigali fruit tart Rwandan', 'Tarte aux fruits de Kigali rwandaise', 'Tarta de frutas de Kigali ruandés', 'Obsttorte aus Kigali ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 4, 32, 10),
  R(`آيس كريم الفانيليا بالعسل ${T}`, 'Honey vanilla ice cream Rwandan', 'Glace vanille au miel rwandaise', 'Helado de vainilla con miel ruandés', 'Honig-Vanilleeis ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 4, 22, 8),
  R(`كعكة القهوة ${T}`, 'Rwandan coffee cake Rwandan', 'Gâteau au café rwandais', 'Pastel de café ruandés', 'Kaffeekuchen ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 5, 32, 12),
  R(`بسكويت الفول السوداني ${T}`, 'Peanut biscuits Rwandan', 'Biscuits aux cacahuètes rwandais', 'Galletas de cacahuete ruandés', 'Erdnusskekse ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 8, 26, 14),
  R(`موس الماراكويا ${T}`, 'Passion fruit mousse Rwandan', 'Mousse de fruit de la passion rwandaise', 'Mousse de maracuyá ruandés', 'Passionsfrucht-Mousse ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 3, 22, 8),
  R(`كعكة العسل ${T}`, 'Honey cake Rwandan', 'Gâteau au miel rwandais', 'Pastel de miel ruandés', 'Honigkuchen ruandisch', 'desserts_sweets', 'snacks', 'pan_rwandan', 4, 34, 8),
);
// --- beverages (22) ----------------------------------------------------------
dishes.push(
  R(`أكارابو شاي أسود ${T}`, 'Akarabo black tea Rwandan', 'Thé noir Akarabo rwandais', 'Té negro Akarabo ruandés', 'Akarabo-Schwarztee ruandisch', 'beverages', 'snacks', 'pan_rwandan', 0, 5, 0),
  R(`قهوة بالحليب كيغالي ${T}`, 'Kigali coffee with milk Rwandan', 'Café au lait de Kigali rwandais', 'Café con leche de Kigali ruandés', 'Kaffee mit Milch aus Kigali ruandisch', 'beverages', 'snacks', 'kigali', 2, 6, 2),
  R(`أوبوشرا شراب الذرة المخمر ${T}`, 'Ubushera fermented sorghum drink Rwandan', 'Ubushera boisson de sorgho fermenté rwandaise', 'Ubushera bebida de sorgo fermentado ruandés', 'Ubushera fermentiertes Hirsegetränk ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 12, 0),
  R(`أورواغوا بيرة الموز ${T}`, 'Urwagwa banana beer Rwandan', 'Urwagwa bière de banane rwandaise', 'Urwagwa cerveza de plátano ruandés', 'Urwagwa-Bananenbier ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 10, 0),
  R(`إيكيغاجي بيرة السورغوم ${T}`, 'Ikigage sorghum beer Rwandan', 'Ikigage bière de sorgho rwandaise', 'Ikigage cerveza de sorgo ruandés', 'Ikigage-Sorghumbier ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 10, 0),
  R(`كايفوغوتو زبادي مخمر ${T}`, 'Kivuguto fermented milk Rwandan', 'Kivuguto lait fermenté rwandais', 'Kivuguto leche fermentada ruandés', 'Kivuguto fermentierte Milch ruandisch', 'beverages', 'snacks', 'pan_rwandan', 3, 5, 3),
  R(`حليب طازج كامل الدسم ${T}`, 'Full-fat fresh milk Rwandan', 'Lait frais entier rwandais', 'Leche fresca entera ruandés', 'Frische Vollmilch ruandisch', 'beverages', 'snacks', 'pan_rwandan', 3, 5, 4),
  R(`عصير الماراكويا ${T}`, 'Passion fruit juice Rwandan', 'Jus de fruit de la passion rwandais', 'Jugo de maracuyá ruandés', 'Passionsfruchtsaft ruandisch', 'beverages', 'snacks', 'gisenyi', 1, 13, 1),
  R(`عصير المانجو ${T}`, 'Mango juice Rwandan', 'Jus de mangue rwandais', 'Jugo de mango ruandés', 'Mangosaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 16, 0),
  R(`عصير الأناناس ${T}`, 'Pineapple juice Rwandan', 'Jus d ananas rwandais', 'Jugo de piña ruandés', 'Ananassaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 14, 0),
  R(`عصير الموز ${T}`, 'Banana juice Rwandan', 'Jus de banane rwandais', 'Jugo de plátano ruandés', 'Bananensaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 16, 0),
  R(`ميلك شيك الأفوكادو ${T}`, 'Avocado milkshake Rwandan', 'Milk-shake d avocat rwandais', 'Batido de aguacate ruandés', 'Avocado-Milchshake ruandisch', 'beverages', 'snacks', 'pan_rwandan', 2, 14, 5),
  R(`عصير البرتقال الطازج ${T}`, 'Fresh orange juice Rwandan', 'Jus d orange frais rwandais', 'Jugo de naranja fresco ruandés', 'Frischer Orangensaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 12, 0),
  R(`شيك الأفوكادو والموز ${T}`, 'Avocado banana shake Rwandan', 'Shake avocat banane rwandais', 'Batido de aguacate y plátano ruandés', 'Avocado-Bananen-Shake ruandisch', 'beverages', 'snacks', 'pan_rwandan', 2, 16, 5),
  R(`شراب الزنجبيل ${T}`, 'Ginger drink Rwandan', 'Boisson au gingembre rwandaise', 'Bebida de jengibre ruandés', 'Ingwergetränk ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 12, 0),
  R(`عصير الجزر والزنجبيل ${T}`, 'Carrot ginger juice Rwandan', 'Jus carotte gingembre rwandais', 'Zumo de zanahoria y jengibre ruandés', 'Karotten-Ingwersaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 12, 0),
  R(`ليمونادة محلية ${T}`, 'Local lemonade Rwandan', 'Limonade locale rwandaise', 'Limonada local ruandés', 'Lokale Limonade ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 12, 0),
  R(`عصير الجوافة ${T}`, 'Guava juice Rwandan', 'Jus de goyave rwandais', 'Jugo de guayaba ruandés', 'Guavensaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 13, 0),
  R(`عصير البابايا ${T}`, 'Papaya juice Rwandan', 'Jus de papaye rwandais', 'Jugo de papaya ruandés', 'Papayasaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 14, 0),
  R(`شاي الزنجبيل بالعسل ${T}`, 'Ginger honey tea Rwandan', 'Thé au gingembre et miel rwandais', 'Té de jengibre y miel ruandés', 'Ingwer-Honig-Tee ruandisch', 'beverages', 'snacks', 'musanze', 1, 10, 0),
  R(`عصير البطيخ ${T}`, 'Watermelon juice Rwandan', 'Jus de pastèque rwandais', 'Jugo de sandía ruandés', 'Wassermelonensaft ruandisch', 'beverages', 'snacks', 'pan_rwandan', 1, 12, 0),
  R(`سموذي المانجو والماراكويا ${T}`, 'Mango passion smoothie Rwandan', 'Smoothie mangue fruit de la passion rwandais', 'Batido de mango y maracuyá ruandés', 'Mango-Passionsfrucht-Smoothie ruandisch', 'beverages', 'snacks', 'pan_rwandan', 2, 18, 1),
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
  if (!d.name_ar.includes('رواندي')) badTok.push(d.name_ar);
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
  path.join(__dirname, 'rwanda-200-proposal.json'),
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
console.log(`\nWrote scripts/rwanda-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);