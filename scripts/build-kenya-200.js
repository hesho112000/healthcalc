// Authoring script for the Kenyan 200-dish proposal (scripts/kenya-200-proposal.json).
// 200 NEW dishes (the 100 legacy rows live in src/data/kenyan-full.ts). Mirrors the
// Ethiopia/Nigeria authoring pattern: R() helper + per-category macro templates.
// Regions: pan_kenyan by default (golden rule), regional anchors (nairobi, mombasa,
// kisumu, nakuru, nyeri), african_shared for dishes shared across East Africa (credited to
// the Kenyan card at runtime via the source prefix). All Arabic names carry a كيني/كينية
// token (halal profile: no pork). Emphasizes Nyama Choma, Ugali, Sukuma Wiki, Pilau, Chapati.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100) => ({
  name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100,
});

const dishes = [];

// ============================================================ PAN_KENYAN + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R('فول فطار كيني', 'Foul breakfast Kenyan', 'Foul petit-déjeuner kényan', 'Foul desayuno keniano', 'Foul kenianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_kenyan', 115),
  R('ماندازي جوز هند فطار كيني', 'Coconut mandazi breakfast Kenyan', 'Mandazi à la noix de coco petit-déjeuner kényan', 'Mandazi de coco desayuno keniano', 'Kokos-Mandazi kenianisches Frühstück', 'breakfast_items', 'breakfast', 'mombasa', 200),
  R('ماهامري ماء ورد فطار كيني', 'Rosewater mahamri breakfast Kenyan', 'Mahamri à l eau de rose petit-déjeuner kényan', 'Mahamri de agua de rosas desayuno keniano', 'Rosenwasser-Mahamri kenianisches Frühstück', 'breakfast_items', 'breakfast', 'mombasa', 195),
  R('تشاباتي بيض فطار كيني', 'Chapati eggs breakfast Kenyan', 'Chapati aux œufs petit-déjeuner kényan', 'Chapati con huevos desayuno keniano', 'Chapati mit Ei kenianisches Frühstück', 'breakfast_items', 'breakfast', 'nairobi', 175),
  R('أوجي ذرة فطار كيني', 'Corn uji porridge breakfast Kenyan', 'Bouillie uji de maïs petit-déjeuner kényan', 'Gachas uji de maíz desayuno keniano', 'Mais-Uji-Brei kenianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_kenyan', 95),
  R('أوجي بيهاكس حلو فطار كيني', 'Sweet whisked uji breakfast Kenyan', 'Uji sucré fouetté petit-déjeuner kényan', 'Uji dulce batido desayuno keniano', 'Süßer Uji-Brei kenianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_kenyan', 100),
  R('بيض مسلوق فطار كيني', 'Boiled eggs breakfast Kenyan', 'Œufs durs petit-déjeuner kényan', 'Huevos cocidos desayuno keniano', 'Hartgekochte Eier kenianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_kenyan', 135),
  R('فطائر بطاطس فطار كينية', 'Potato pancakes breakfast Kenyan', 'Crêpes de pommes de terre petit-déjeuner kényan', 'Panqueques de patata desayuno keniano', 'Kartoffelpfannkuchen kenianisches Frühstück', 'breakfast_items', 'breakfast', 'nairobi', 165),
  R('أرز بالحليب فطار كيني', 'Rice with milk breakfast Kenyan', 'Riz au lait petit-déjeuner kényan', 'Arroz con leche desayuno keniano', 'Reis mit Milch kenianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_kenyan', 140),
  R('مخاتي أوفوتا حلوى فطار كيني', 'Sweet mkate ufuta breakfast Kenyan', 'Mkate ufuta sucré petit-déjeuner kényan', 'Mkate ufuta dulce desayuno keniano', 'Süßes Mkate-Ufuta kenianisches Frühstück', 'breakfast_items', 'breakfast', 'mombasa', 210),
  R('شاي حليب زنجبيل فطار كيني', 'Ginger milk tea breakfast Kenyan', 'Thé au lait et au gingembre petit-déjeuner kényan', 'Té con leche y jengibre desayuno keniano', 'Ingwer-Milchtee kenianisches Frühstück', 'breakfast_items', 'breakfast', 'nairobi', 50),
  R('قهوة كينية فطار', 'Kenyan coffee breakfast', 'Café kényan petit-déjeuner', 'Café keniano desayuno', 'Kenianischer Kaffee Frühstück', 'breakfast_items', 'breakfast', 'pan_kenyan', 45),
  R('عصيدة مانجو فطار كينية', 'Mango porridge breakfast Kenyan', 'Bouillie de mangue petit-déjeuner kényan', 'Gachas de mango desayuno keniano', 'Mango-Brei kenianisches Frühstück', 'breakfast_items', 'breakfast', 'kisumu', 110),
  R('سوكوما مع تشاباتي فطار كيني', 'Sukuma with chapati breakfast Kenyan', 'Sukuma avec chapati petit-déjeuner kényan', 'Sukuma con chapati desayuno keniano', 'Sukuma mit Chapati kenianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_kenyan', 120),
);
// --- breads_flatbreads (24) --------------------------------------------------
dishes.push(
  R('تشاباتي وطني كيني', 'National chapati Kenyan', 'Chapati national kényan', 'Chapati nacional keniano', 'Nationales Chapati kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 175),
  R('تشاباتي رقيق كيني', 'Thin chapati Kenyan', 'Chapati fin kényan', 'Chapati fino keniano', 'Dünnes Chapati kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 165),
  R('تشاباتي طبقات سميك كيني', 'Thick layered chapati Kenyan', 'Chapati épais en couches kényan', 'Chapati grueso en capas keniano', 'Dickes Lagen-Chapati kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 190),
  R('تشاباتي قمح كامل كيني', 'Whole wheat chapati Kenyan', 'Chapati de blé complet kényan', 'Chapati de trigo integral keniano', 'Vollkorn-Chapati kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 170),
  R('تشاباتي محلي كيني', 'Sweet chapati Kenyan', 'Chapati sucré kényan', 'Chapati dulce keniano', 'Süßes Chapati kenianisch', 'breads_flatbreads', 'breakfast', 'nairobi', 185),
  R('تشاباتي بجوز هند كيني', 'Coconut chapati Kenyan', 'Chapati à la noix de coco kényan', 'Chapati de coco keniano', 'Kokos-Chapati kenianisch', 'breads_flatbreads', 'breakfast', 'mombasa', 200),
  R('تشاباتي بالزبد كيني', 'Buttery chapati Kenyan', 'Chapati au beurre kényan', 'Chapati con mantequilla keniano', 'Butter-Chapati kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 190),
  R('مخاتي خبز أبيض كيني', 'Mkate white bread Kenyan', 'Mkate pain blanc kényan', 'Mkate pan blanco keniano', 'Mkate-Weißbrot kenianisch', 'breads_flatbreads', 'breakfast', 'mombasa', 195),
  R('مخاتي أوفوتا حلوى كيني', 'Sweet sesame mkate Kenyan', 'Mkate ufuta sucré kényan', 'Mkate ufuta dulce keniano', 'Süßes Sesam-Mkate kenianisch', 'breads_flatbreads', 'breakfast', 'mombasa', 205),
  R('ماندازي كبير كيني', 'Large mandazi Kenyan', 'Grand mandazi kényan', 'Mandazi grande keniano', 'Großes Mandazi kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 190),
  R('خبز الموز الهندي كيني', 'Plantain bread Kenyan', 'Pain de plantain kényan', 'Pan de plátano keniano', 'Kochbananenbrot kenianisch', 'breads_flatbreads', 'breakfast', 'kisumu', 180),
  R('خبز البطاطس كيني', 'Potato bread Kenyan', 'Pain de pommes de terre kényan', 'Pan de patata keniano', 'Kartoffelbrot kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 170),
  R('خبز محشو سمسم كيني', 'Sesame stuffed bun Kenyan', 'Pain fourré au sésame kényan', 'Pan relleno de sésamo keniano', 'Mit Sesam gefülltes Brötchen kenianisch', 'breads_flatbreads', 'breakfast', 'nairobi', 200),
  R('خبز متعدد الحبوب كيني', 'Multigrain bread Kenyan', 'Pain multigrain kényan', 'Pan multigrano keniano', 'Mehrkornbrot kenianisch', 'breads_flatbreads', 'breakfast', 'nairobi', 185),
  R('خبز الشعير كيني', 'Barley bread Kenyan', 'Pain d orge kényan', 'Pan de cebada keniano', 'Gerstenbrot kenianisch', 'breads_flatbreads', 'breakfast', 'nakuru', 175),
  R('خبز الذرة المخمر كيني', 'Fermented corn bread Kenyan', 'Pain de maïs fermenté kényan', 'Pan de maíz fermentado keniano', 'Fermentiertes Maisbrot kenianisch', 'breads_flatbreads', 'breakfast', 'kisumu', 180),
  R('خبز جوز هند وعسل كيني', 'Coconut honey bread Kenyan', 'Pain coco miel kényan', 'Pan de coco y miel keniano', 'Kokos-Honig-Brot kenianisch', 'breads_flatbreads', 'breakfast', 'mombasa', 200),
  R('رولات ناعمة كينية', 'Soft rolls Kenyan', 'Petits pains moelleux kényans', 'Panecillos suaves kenianos', 'Weiche Brötchen kenianisch', 'breads_flatbreads', 'breakfast', 'nairobi', 195),
  R('خبز الحليب كيني', 'Milk bread Kenyan', 'Pain au lait kényan', 'Pan de leche keniano', 'Milchbrot kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 185),
  R('خبز السورجو كيني', 'Sorghum bread Kenyan', 'Pain de sorgho kényan', 'Pan de sorgo keniano', 'Sorghumbrot kenianisch', 'breads_flatbreads', 'breakfast', 'kisumu', 180),
  R('فطيرة ذرة رقيقة كينية', 'Thin corn flatbread Kenyan', 'Galette fine de maïs kényane', 'Tortita fina de maíz keniana', 'Dünnes Maisfladenbrot kenianisch', 'breads_flatbreads', 'breakfast', 'nyeri', 175),
  R('خبز جبن كيني', 'Cheese bread Kenyan', 'Pain au fromage kényan', 'Pan con queso keniano', 'Käsebrot kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 190),
  R('مخاتي مضغوط كيني', 'Pressed mkate Kenyan', 'Mkate pressé kényan', 'Mkate prensado keniano', 'Gepresstes Mkate kenianisch', 'breads_flatbreads', 'breakfast', 'mombasa', 200),
  R('خبز موز مطهو كيني', 'Sweet banana bread Kenyan', 'Pain sucré à la banane kényan', 'Pan dulce de plátano keniano', 'Süßes Bananenbrot kenianisch', 'breads_flatbreads', 'breakfast', 'pan_kenyan', 185),
);
// --- rice_biryani (10) -------------------------------------------------------
dishes.push(
  R('بيلاو لحمة وطني كيني', 'Nyama pilau national Kenyan', 'Pilau national à la viande kényan', 'Pilau de carne nacional keniano', 'Nationales Nyama-Pilau kenianisch', 'rice_biryani', 'lunch', 'pan_kenyan', 220),
  R('بيلاو دجاج مفلفل كيني', 'Spiced chicken pilau Kenyan', 'Pilau de poulet épicé kényan', 'Pilau de pollo especiado keniano', 'Würziges Hähnchen-Pilau kenianisch', 'rice_biryani', 'lunch', 'nairobi', 210),
  R('بيلاو شعرية لحم كيني', 'Pilau with vermicelli Kenyan', 'Pilau aux cheveux d ange kényan', 'Pilau con fideos keniano', 'Pilau mit Fadennudeln kenianisch', 'rice_biryani', 'lunch', 'mombasa', 215),
  R('بيلاو سمك ساحلي كيني', 'Coastal fish pilau Kenyan', 'Pilau de poisson côtier kényan', 'Pilau de pescado costero keniano', 'Küsten-Fisch-Pilau kenianisch', 'rice_biryani', 'lunch', 'mombasa', 210),
  R('بيلاو ماعز كيني', 'Goat pilau Kenyan', 'Pilau de chèvre kényan', 'Pilau de cabra keniano', 'Ziegen-Pilau kenianisch', 'rice_biryani', 'lunch', 'pan_kenyan', 215),
  R('بيرياني دجاج ساحلي كيني', 'Coastal chicken biryani Kenyan', 'Biryani de poulet côtier kényan', 'Biryani de pollo costero keniano', 'Küsten-Hähnchen-Biryani kenianisch', 'rice_biryani', 'lunch', 'mombasa', 230),
  R('بيرياني سمك كيني', 'Fish biryani Kenyan', 'Biryani de poisson kényan', 'Biryani de pescado keniano', 'Fisch-Biryani kenianisch', 'rice_biryani', 'lunch', 'mombasa', 225),
  R('أرز مقلي بيلاو كيني', 'Fried pilau rice Kenyan', 'Riz pilau frit kényan', 'Arroz pilau frito keniano', 'Gebratener Pilau-Reis kenianisch', 'rice_biryani', 'lunch', 'nairobi', 195),
  R('بيلاو خضار كيني', 'Vegetable pilau Kenyan', 'Pilau de légumes kényan', 'Pilau de verduras keniano', 'Gemüse-Pilau kenianisch', 'rice_biryani', 'lunch', 'pan_kenyan', 165),
  R('أرز جوز هند حلو كيني', 'Sweet coconut rice Kenyan', 'Riz sucré à la noix de coco kényan', 'Arroz dulce de coco keniano', 'Süßer Kokosreis kenianisch', 'rice_biryani', 'lunch', 'mombasa', 175),
);
// --- dals_legumes (16) -------------------------------------------------------
dishes.push(
  R('محاراجوي جوز هند فاصوليا كيني', 'Maharagwe coconut beans Kenyan', 'Maharagwe haricots au coco kényan', 'Maharagwe frijoles al coco keniano', 'Maharagwe Kokosbohnen kenianisch', 'dals_legumes', 'lunch', 'mombasa', 135),
  R('غيثيري محضّر كيني', 'Prepared githeri Kenyan', 'Githeri préparé kényan', 'Githeri preparado keniano', 'Zubereitetes Githeri kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 125),
  R('نجاهي مطهوة مع خضار كينية', 'Njahi stewed with greens Kenyan', 'Njahi mijoté aux légumes verts kényan', 'Njahi guisado con verduras keniano', 'Njahi mit Grün geschmort kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 115),
  R('فاصوليا بيضاء مطهوة كينية', 'Stewed white beans Kenyan', 'Haricots blancs mijotés kényans', 'Frijoles blancos guisados kenianos', 'Geschmorte weiße Bohnen kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 120),
  R('عدس كاري كيني', 'Lentil curry Kenyan', 'Curry de lentilles kényan', 'Curry de lentejas keniano', 'Linsen-Curry kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 130),
  R('فول سوداني مطهو كيني', 'Stewed peanuts Kenyan', 'Arachides mijotées kényanes', 'Maníes guisados kenianos', 'Geschmorte Erdnüsse kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 185),
  R('بازلاء بالجزر كينية', 'Peas with carrots Kenyan', 'Petits pois aux carottes kényans', 'Guisantes con zanahorias kenianos', 'Erbsen mit Karotten kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 105),
  R('فاصولياء خضراء مطهوة كينية', 'Stewed green beans Kenyan', 'Haricots verts mijotés kényans', 'Judías verdes guisadas kenianas', 'Geschmorte grüne Bohnen kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 95),
  R('حمص مطهو كيني', 'Stewed chickpeas Kenyan', 'Pois chiches mijotés kényans', 'Garbanzos guisados kenianos', 'Geschmorte Kichererbsen kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 135),
  R('عدس أحمر كاري كيني', 'Red lentil curry Kenyan', 'Curry de lentilles rouges kényan', 'Curry de lentejas rojas keniano', 'Rotes-Linsen-Curry kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 125),
  R('فاصوليا مخبوزة كينية', 'Baked beans Kenyan', 'Haricots cuits au four kényans', 'Frijoles horneados kenianos', 'Gebackene Bohnen kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 130),
  R('عدس أخضر مع فلفل كيني', 'Green lentils with pepper Kenyan', 'Lentilles vertes au poivre kényanes', 'Lentejas verdes con pimienta kenianas', 'Grüne Linsen mit Pfeffer kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 115),
  R('يخنة فاصولياء بيضاء بالطماطم كينية', 'White bean tomato stew Kenyan', 'Ragoût de haricots blancs à la tomate kényan', 'Guiso de frijoles blancos con tomate keniano', 'Weiße-Bohnen-Tomaten-Eintopf kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 115),
  R('بازلاء صفراء مطهوة كينية', 'Stewed yellow peas Kenyan', 'Pois jaunes mijotés kényans', 'Guisantes amarillos guisados kenianos', 'Geschmorte gelbe Erbsen kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 120),
  R('محاراجوي مالالو فاصوليا صغيرة كينية', 'Maharagwe malalo small beans Kenyan', 'Maharagwe malalo petits haricots kényans', 'Maharagwe malalo frijoles pequeños kenianos', 'Maharagwe-Malalo-Kleinbohnen kenianisch', 'dals_legumes', 'lunch', 'nyeri', 110),
  R('متشوزي مخلوط فاصولياء كيني', 'Mixed bean stew Kenyan', 'Ragoût de haricots mélangés kényan', 'Guiso de frijoles mixtos keniano', 'Gemischter Bohneneintopf kenianisch', 'dals_legumes', 'lunch', 'pan_kenyan', 125),
);
// --- vegetarian_mains (22) ---------------------------------------------------
dishes.push(
  R('سوكوما ويجي مطهوة بسمن كينية', 'Sukuma wiki with ghee Kenyan', 'Sukuma wiki au ghee kényan', 'Sukuma wiki con ghee keniano', 'Sukuma-Wiki mit Ghee kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 85),
  R('سوكوما ويجي مع بصل وطماطم كينية', 'Sukuma wiki onion tomato Kenyan', 'Sukuma wiki oignons tomates kényan', 'Sukuma wiki con cebolla y tomate keniano', 'Sukuma-Wiki mit Zwiebel und Tomate kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 80),
  R('موكيمو كامل كيني', 'Full mukimo Kenyan', 'Mukimo complet kényan', 'Mukimo completo keniano', 'Vollständiges Mukimo kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 135),
  R('موكيمو مع إيريو كيني', 'Mukimo with irio Kenyan', 'Mukimo à l irio kényan', 'Mukimo con irio keniano', 'Mukimo mit Irio kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 130),
  R('إيريو مع ذرة خضراء كيني', 'Irio with green corn Kenyan', 'Irio au maïs vert kényan', 'Irio con maíz verde keniano', 'Irio mit grünem Mais kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 120),
  R('يخنة قرع مطهو كيني', 'Stewed pumpkin Kenyan', 'Courge mijotée kényane', 'Calabaza guisada keniana', 'Geschmorter Kürbis kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 95),
  R('يخنة ملفوف كيني', 'Stewed cabbage Kenyan', 'Chou mijoté kényan', 'Repollo guisado keniano', 'Geschmorter Kohl kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 90),
  R('باذنجان مقلي كيني', 'Fried eggplant Kenyan', 'Aubergine frite kényane', 'Berenjena frita keniana', 'Gebratene Aubergine kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 100),
  R('فطر مطهو مع طماطم كيني', 'Mushrooms stewed with tomato Kenyan', 'Champignons mijotés à la tomate kényans', 'Setas guisadas con tomate kenianas', 'Pilze mit Tomate geschmort kenianisch', 'vegetarian_mains', 'lunch', 'nairobi', 90),
  R('سبانخ بالطماطم كينية', 'Spinach with tomato Kenyan', 'Épinards à la tomate kényans', 'Espinacas con tomate kenianas', 'Spinat mit Tomate kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 80),
  R('كاري خضار كيني', 'Vegetable curry Kenyan', 'Curry de légumes kényan', 'Curry de verduras keniano', 'Gemüse-Curry kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 110),
  R('خضار مشكلة مشوية كينية', 'Grilled mixed vegetables Kenyan', 'Légumes grillés mélangés kényans', 'Verduras mixtas a la parrilla kenianas', 'Gegrilltes Gemüse Mix kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 95),
  R('بطاطس محشية بخضار كينية', 'Potatoes stuffed with vegetables Kenyan', 'Pommes de terre farcies aux légumes kényanes', 'Patatas rellenas de verduras kenianas', 'Mit Gemüse gefüllte Kartoffeln kenianisch', 'vegetarian_mains', 'lunch', 'nairobi', 130),
  R('كوسة مطهوة بجوز هند كينية', 'Zucchini stewed with coconut Kenyan', 'Courgette mijotée au coco kényane', 'Calabacín guisado con coco keniano', 'Zucchini mit Kokos geschmort kenianisch', 'vegetarian_mains', 'lunch', 'mombasa', 105),
  R('جزر وبازلاء مسلوقان كينيان', 'Boiled carrots and peas Kenyan', 'Carottes et petits pois bouillis kényans', 'Zanahorias y guisantes hervidos kenianos', 'Gekochte Karotten und Erbsen kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 95),
  R('قرنبيط مطهو كيني', 'Stewed cauliflower Kenyan', 'Chou-fleur mijoté kényan', 'Coliflor guisada keniana', 'Geschmorter Blumenkohl kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 90),
  R('يخنة خضار أفريقي كيني', 'Mixed African vegetable stew Kenyan', 'Ragoût de légumes africain kényan', 'Guiso de verduras africano keniano', 'Afrikanischer Gemüseeintopf kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 100),
  R('بامية مع طماطم كينية', 'Okra with tomato Kenyan', 'Gombo à la tomate kényan', 'Quingombó con tomate keniano', 'Okra mit Tomate kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 85),
  R('فلفل محشي كيني', 'Stuffed pepper Kenyan', 'Poivron farci kényan', 'Pimiento relleno keniano', 'Gefüllte Paprika kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 115),
  R('ملفوف وبطاطس كيني', 'Cabbage and potatoes Kenyan', 'Chou et pommes de terre kényans', 'Repollo y patatas kenianos', 'Kohl und Kartoffeln kenianisch', 'vegetarian_mains', 'lunch', 'kisumu', 100),
  R('بطاطا حلوة مطهوة كينية', 'Stewed sweet potato Kenyan', 'Patate douce mijotée kényane', 'Boniato guisado keniano', 'Geschmorte Süßkartoffel kenianisch', 'vegetarian_mains', 'lunch', 'pan_kenyan', 100),
  R('متشوزي خضارات الجذور كيني', 'Root vegetable stew Kenyan', 'Ragoût de légumes-racines kényan', 'Guiso de hortalizas de raíz keniano', 'Wurzelgemüseeintopf kenianisch', 'vegetarian_mains', 'lunch', 'nyeri', 105),
);
// --- poultry_mains (12) ------------------------------------------------------
dishes.push(
  R('كوكو تشوما متبل كيني', 'Seasoned kuku choma Kenyan', 'Kuku choma assaisonné kényan', 'Kuku choma adobado keniano', 'Gewürztes Kuku-Choma kenianisch', 'poultry_mains', 'lunch', 'pan_kenyan', 195),
  R('كوكو تشوما بصوص الفلفل كيني', 'Kuku choma pepper sauce Kenyan', 'Kuku choma à la sauce poivrée kényan', 'Kuku choma con salsa de pimiento keniano', 'Kuku-Choma mit Pfeffersauce kenianisch', 'poultry_mains', 'lunch', 'nairobi', 200),
  R('متشوزي كوكو بجوز هند ساحلي كيني', 'Coastal coconut chicken stew Kenyan', 'Ragoût de poulet au coco côtier kényan', 'Guiso de pollo al coco costero keniano', 'Küsten-Kokos-Hünereintopf kenianisch', 'poultry_mains', 'lunch', 'mombasa', 190),
  R('دجاج مطهو بالبيلاو كيني', 'Chicken cooked with pilau Kenyan', 'Poulet cuit au pilau kényan', 'Pollo cocinado con pilau keniano', 'Hähnchen mit Pilau gekocht kenianisch', 'poultry_mains', 'lunch', 'pan_kenyan', 185),
  R('دجاج كاري كيني', 'Chicken curry Kenyan', 'Curry de poulet kényan', 'Curry de pollo keniano', 'Hähnchen-Curry kenianisch', 'poultry_mains', 'lunch', 'mombasa', 195),
  R('دجاج بالبطاطس كيني', 'Chicken with potatoes Kenyan', 'Poulet aux pommes de terre kényan', 'Pollo con patatas keniano', 'Hähnchen mit Kartoffeln kenianisch', 'poultry_mains', 'lunch', 'pan_kenyan', 200),
  R('دجاج مشوي بعسل كيني', 'Honey grilled chicken Kenyan', 'Poulet grillé au miel kényan', 'Pollo a la parrilla con miel keniano', 'Honig-Grillhähnchen kenianisch', 'poultry_mains', 'lunch', 'nairobi', 195),
  R('دجاج بالثوم والزنجبيل كيني', 'Chicken garlic and ginger Kenyan', 'Poulet à l ail et au gingembre kényan', 'Pollo con ajo y jengibre keniano', 'Knoblauch-Ingwer-Hähnchen kenianisch', 'poultry_mains', 'lunch', 'pan_kenyan', 190),
  R('يخنة دجاج بالأرز كيني', 'Chicken rice stew Kenyan', 'Ragoût de poulet au riz kényan', 'Guiso de pollo con arroz keniano', 'Hähnchen-Reis-Eintopf kenianisch', 'poultry_mains', 'lunch', 'kisumu', 185),
  R('دجاج مقرمش سواحلي كيني', 'Swahili crispy chicken Kenyan', 'Poulet croustillant swahili kényan', 'Pollo crujiente suajili keniano', 'Knuspriges Swahili-Hähnchen kenianisch', 'poultry_mains', 'lunch', 'mombasa', 210),
  R('دجاج بالليمون والبهارات كيني', 'Chicken lemon and spices Kenyan', 'Poulet au citron et aux épices kényan', 'Pollo con limón y especias keniano', 'Hähnchen mit Zitrone und Gewürzen kenianisch', 'poultry_mains', 'lunch', 'pan_kenyan', 180),
  R('صدر دجاج كيني', 'Kenyan chicken breast', 'Blanc de poulet kényan', 'Pechuga de pollo keniana', 'Kenianische Hähnchenbrust', 'poultry_mains', 'lunch', 'nairobi', 165),
);
// --- meat_mains (22) ---------------------------------------------------------
dishes.push(
  R('نياما تشوما كلاسيكي كيني', 'Classic nyama choma Kenyan', 'Nyama choma classique kényan', 'Nyama choma clásico keniano', 'Klassisches Nyama-Choma kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 230),
  R('نياما تشوما مقبلات كيني', 'Nyama choma platter Kenyan', 'Plateau nyama choma kényan', 'Tabla nyama choma keniana', 'Nyama-Choma-Platte kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 235),
  R('نياما تشوما غنم كيني', 'Lamb nyama choma Kenyan', 'Nyama choma d agneau kényan', 'Nyama choma de cordero keniano', 'Lamm-Nyama-Choma kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 220),
  R('نياما تشوما للمناسبات كيني', 'Nyama choma feast Kenyan', 'Nyama choma de fête kényan', 'Nyama choma festivo keniano', 'Nyama-Choma-Festessen kenianisch', 'meat_mains', 'lunch', 'nairobi', 240),
  R('متشوزي نياما مطبوخ طويلاً كيني', 'Slow cooked beef stew Kenyan', 'Ragoût de bœuf cuit lentement kényan', 'Guiso de res cocinado a fuego lento keniano', 'Langsam gegartes Rindfleisch-Schmorgericht kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 185),
  R('متشوزي نياما بجوز هند كيني', 'Beef coconut stew Kenyan', 'Ragoût de bœuf au coco kényan', 'Guiso de res con coco keniano', 'Rind-Kokos-Eintopf kenianisch', 'meat_mains', 'lunch', 'mombasa', 195),
  R('لحم بقري مفلفل كيني', 'Peppered beef Kenyan', 'Bœuf au poivre kényan', 'Res con pimienta keniana', 'Pfeffriges Rind kenianisch', 'meat_mains', 'lunch', 'nairobi', 190),
  R('لحم غنم مطهو كيني', 'Lamb stew Kenyan', 'Ragoût d agneau kényan', 'Guiso de cordero keniano', 'Lammeintopf kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 195),
  R('يخنة لحم مع خضار جذرية كينية', 'Beef root vegetable stew Kenyan', 'Ragoût de bœuf aux légumes-racines kényan', 'Guiso de res con hortalizas de raíz keniano', 'Rind-Wurzelgemüse-Eintopf kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 175),
  R('كباب لحم كيني', 'Beef kebab Kenyan', 'Kébab de bœuf kényan', 'Kebab de res keniano', 'Rindfleisch-Kebab kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 200),
  R('لحم مشوي على الفحم كيني', 'Charcoal grilled beef Kenyan', 'Bœuf grillé au charbon kényan', 'Res a la brasa keniana', 'Holzkohle-gegrilltes Rind kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 220),
  R('متشوزي نياما مع بطاطس كيني', 'Beef stew with potatoes Kenyan', 'Ragoût de bœuf aux pommes de terre kényan', 'Guiso de res con patatas keniano', 'Rindereintopf mit Kartoffeln kenianisch', 'meat_mains', 'lunch', 'kisumu', 185),
  R('لحم بقري بالبصل كيني', 'Beef with onions Kenyan', 'Bœuf aux oignons kényan', 'Res con cebolla keniana', 'Rind mit Zwiebeln kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 185),
  R('كفتة لحم كينية', 'Kenyan meatballs', 'Boulettes de viande kényanes', 'Albóndigas kenianas', 'Kenianische Fleischbällchen', 'meat_mains', 'lunch', 'nairobi', 210),
  R('كبدة لحم بالبصل كينية', 'Beef liver with onions Kenyan', 'Foie de bœuf aux oignons kényan', 'Hígado de res con cebolla keniano', 'Rinderleber mit Zwiebeln kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 160),
  R('كرشة مفلفلة كينية', 'Spicy tripe Kenyan', 'Tripes épicées kényanes', 'Callos picantes kenianos', 'Würzige Kutteln kenianisch', 'meat_mains', 'lunch', 'nairobi', 150),
  R('موتورا على الفحم كيني', 'Charcoal mutura Kenyan', 'Mutura au charbon kényan', 'Mutura a la brasa keniano', 'Mutura vom Holzkohlegrill kenianisch', 'meat_mains', 'lunch', 'nairobi', 195),
  R('لحم عجل مطهو كيني', 'Stewed veal Kenyan', 'Veau mijoté kényan', 'Ternera guisada keniana', 'Geschmortes Kalb kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 175),
  R('لحم مفروم بالأعشاب كيني', 'Herbed minced beef Kenyan', 'Viande hachée aux herbes kényane', 'Carne picada con hierbas keniana', 'Kräuter-Hackfleisch kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 185),
  R('ضلوع لحم مشوية كينية', 'Grilled beef ribs Kenyan', 'Côtes de bœuf grillées kényanes', 'Costillas de res a la parrilla kenianas', 'Gegrillte Rinderrippchen kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 225),
  R('لحم بقطع كبيرة مشوي كيني', 'Chunks grilled beef Kenyan', 'Bœuf grillé en morceaux kényan', 'Res a la parrilla en trozos keniana', 'Gegrillte Rindfleischstücke kenianisch', 'meat_mains', 'lunch', 'pan_kenyan', 215),
  R('يخنة لحم بالقرع كينية', 'Beef pumpkin stew Kenyan', 'Ragoût de bœuf à la courge kényan', 'Guiso de res con calabaza keniano', 'Rind-Kürbis-Eintopf kenianisch', 'meat_mains', 'lunch', 'nakuru', 180),
);
// --- seafood_mains (4) -------------------------------------------------------
dishes.push(
  R('سمك بجوز هند مشوي كيني', 'Grilled coconut fish Kenyan', 'Poisson grillé au coco kényan', 'Pescado a la parrilla con coco keniano', 'Gegrillter Kokosfisch kenianisch', 'seafood_mains', 'lunch', 'mombasa', 185),
  R('يخنة بلطي مع خضار كينية', 'Lake tilapia stew Kenyan', 'Ragoût de tilapia des lacs kényan', 'Guiso de tilapia de lagos keniano', 'See-Tilapia-Eintopf kenianisch', 'seafood_mains', 'lunch', 'kisumu', 165),
  R('سمك نيلي مدخن كيني', 'Smoked nile perch Kenyan', 'Perche du Nil fumée kényane', 'Perca del Nilo ahumada keniana', 'Geräucherter Nilbarsch kenianisch', 'seafood_mains', 'lunch', 'kisumu', 175),
  R('كاري الروبيان سواحلي كيني', 'Swahili prawn curry Kenyan', 'Curry de crevettes swahili kényan', 'Curry de gambas suajili keniano', 'Swahili-Garnelen-Curry kenianisch', 'seafood_mains', 'lunch', 'mombasa', 190),
);
// --- soups_salads (16) -------------------------------------------------------
dishes.push(
  R('شوربة عدس كينية', 'Lentil soup Kenyan', 'Soupe de lentilles kényane', 'Sopa de lentejas keniana', 'Linsensuppe kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 90),
  R('شوربة خضار كينية', 'Vegetable soup Kenyan', 'Soupe de légumes kényane', 'Sopa de verduras keniana', 'Gemüsesuppe kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 60),
  R('شوربة دجاج مع نودلز كينية', 'Chicken noodle soup Kenyan', 'Soupe de poulet aux nouilles kényane', 'Sopa de pollo con fideos keniana', 'Hühner-Nudelsuppe kenianisch', 'soups_salads', 'lunch', 'nairobi', 80),
  R('شوربة لحم بالخضار كينية', 'Beef vegetable soup Kenyan', 'Soupe de bœuf aux légumes kényane', 'Sopa de res con verduras keniana', 'Rind-Gemüsesuppe kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 95),
  R('شوربة سوكوما ويجي كينية', 'Sukuma wiki soup Kenyan', 'Soupe sukuma wiki kényane', 'Sopa sukuma wiki keniana', 'Sukuma-Wiki-Suppe kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 55),
  R('شوربة ذرة حلوة كينية', 'Sweet corn soup Kenyan', 'Soupe de maïs doux kényane', 'Sopa de maíz dulce keniana', 'Süßmaissuppe kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 70),
  R('كاشومبوري ليمون كيني', 'Lemon kachumbari Kenyan', 'Kachumbari au citron kényan', 'Kachumbari con limón keniano', 'Zitronen-Kachumbari kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 30),
  R('كاشومبوري أفوكادو كيني', 'Avocado kachumbari Kenyan', 'Kachumbari à l avocat kényan', 'Kachumbari de aguacate keniano', 'Avocado-Kachumbari kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 80),
  R('كاشومبوري مانجو كيني', 'Mango kachumbari Kenyan', 'Kachumbari à la mangue kényan', 'Kachumbari de mango keniano', 'Mango-Kachumbari kenianisch', 'soups_salads', 'lunch', 'mombasa', 55),
  R('سلطة خضار مشكلة كينية', 'Mixed vegetable salad Kenyan', 'Salade de légumes variés kényane', 'Ensalada mixta de verduras keniana', 'Gemischter Gemüsesalat kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 45),
  R('سلطة كول سلو كينية', 'Coleslaw Kenyan', 'Coleslaw kényan', 'Ensalada de col keniana', 'Krautsalat kenianisch', 'soups_salads', 'lunch', 'nairobi', 60),
  R('سلطة الأفوكادو والطماطم كينية', 'Avocado tomato salad Kenyan', 'Salade avocat tomates kényane', 'Ensalada de aguacate y tomate keniana', 'Avocado-Tomaten-Salat kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 75),
  R('سلطة جزر وبنجر كينية', 'Carrot beetroot salad Kenyan', 'Salade carottes betteraves kényane', 'Ensalada de zanahoria y remolacha keniana', 'Karotten-Rote-Bete-Salat kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 55),
  R('سلطة البنجر بالليمون كينية', 'Beetroot lemon salad Kenyan', 'Salade de betterave au citron kényane', 'Ensalada de remolacha con limón keniana', 'Rote-Bete-Zitronen-Salat kenianisch', 'soups_salads', 'lunch', 'pan_kenyan', 50),
  R('سلطة الحمص كينية', 'Chickpea salad Kenyan', 'Salade de pois chiches kényane', 'Ensalada de garbanzos keniana', 'Kichererbsensalat kenianisch', 'soups_salads', 'lunch', 'nairobi', 90),
  R('سلطة المانجو الحارة كينية', 'Spicy mango salad Kenyan', 'Salade de mangue épicée kényane', 'Ensalada de mango picante keniana', 'Scharfer Mango-Salat kenianisch', 'soups_salads', 'lunch', 'mombasa', 60),
);
// --- street_snacks (22) ------------------------------------------------------
dishes.push(
  R('ساموسا لحم شوارع كينية', 'Lamb samosa street Kenyan', 'Samoussa à l agneau de rue kényane', 'Samosa de cordero callejera keniana', 'Lamm-Samosa Straße kenianisch', 'street_snacks', 'snacks', 'african_shared', 285),
  R('ساموسا خضار شوارع كينية', 'Vegetable samosa street Kenyan', 'Samoussa aux légumes de rue kényane', 'Samosa de verduras callejera keniana', 'Gemüse-Samosa Straße kenianisch', 'street_snacks', 'snacks', 'african_shared', 250),
  R('ساموسا عدس شوارع كيني', 'Lentil samosa street Kenyan', 'Samoussa aux lentilles de rue kényan', 'Samosa de lentejas callejera keniano', 'Linsen-Samosa Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 240),
  R('فيازي كاراي حار شوارع كيني', 'Spicy viazi karai street Kenyan', 'Viazi karai épicé de rue kényan', 'Viazi karai picante callejero keniano', 'Würziges Viazi-Karai Straße kenianisch', 'street_snacks', 'snacks', 'nairobi', 135),
  R('ماهمري بعد الظهر شوارع كيني', 'Afternoon mahamri street Kenyan', 'Mahamri de l après-midi de rue kényan', 'Mahamri de tarde callejero keniano', 'Nachmittags-Mahamri Straße kenianisch', 'street_snacks', 'snacks', 'mombasa', 195),
  R('محليندي ذرة مشوية شوارع كيني', 'Roasted corn street Kenyan', 'Maïs grillé de rue kényan', 'Maíz asado callejero keniano', 'Gerösteter Mais Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 125),
  R('بطاطس مقلية شوارع كينية', 'Fried potatoes street Kenyan', 'Frites de rue kényane', 'Patatas fritas callejeras kenianas', 'Pommes frites Straße kenianisch', 'street_snacks', 'snacks', 'african_shared', 170),
  R('موز مقلي شوارع كيني', 'Fried banana street Kenyan', 'Banane frite de rue kényan', 'Plátano frito callejero keniano', 'Frittierte Banane Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 165),
  R('بيض مقلي دسم شوارع كيني', 'Fried eggs rich street Kenyan', 'Œufs frits riches de rue kényans', 'Huevos fritos ricos callejeros kenianos', 'Reichhaltige Spiegeleier Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 160),
  R('ماندازي مع شاي شوارع كيني', 'Mandazi with tea street Kenyan', 'Mandazi au thé de rue kényan', 'Mandazi con té callejero keniano', 'Mandazi mit Tee Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 185),
  R('فول سوداني محمص شوارع كيني', 'Roasted groundnuts street Kenyan', 'Arachides grillées de rue kényanes', 'Maníes tostados callejeros kenianos', 'Geröstete Erdnüsse Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 310),
  R('كباب دجاج شوارع كيني', 'Chicken kebab street Kenyan', 'Kébab de poulet de rue kényan', 'Kebab de pollo callejero keniano', 'Hähnchen-Kebab Straße kenianisch', 'street_snacks', 'snacks', 'nairobi', 200),
  R('فطائر ذرة مقلية شوارع كينية', 'Corn fritters street Kenyan', 'Beignets de maïs de rue kényans', 'Buñuelos de maíz callejeros kenianos', 'Maiskrapfen Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 220),
  R('كرات بطاطس مقلية شوارع كينية', 'Potato balls street Kenyan', 'Boules de pommes de terre de rue kényanes', 'Bolas de patata callejeras kenianas', 'Kartoffelbällchen Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 190),
  R('بيرياني بوكيت شوارع كيني', 'Biryani pockets street Kenyan', 'Poches de biryani de rue kényanes', 'Bolsillos de biryani callejeros kenianos', 'Biryani-Taschen Straße kenianisch', 'street_snacks', 'snacks', 'mombasa', 205),
  R('سناك لحم مجفف شوارع كيني', 'Dried meat snack street Kenyan', 'En-cas de viande séchée de rue kényan', 'Snack de carne seca callejero keniano', 'Trockenfleisch-Snack Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 200),
  R('مخاتي حلو شوارع كيني', 'Sweet mkate street Kenyan', 'Mkate sucré de rue kényan', 'Mkate dulce callejero keniano', 'Süßes Mkate Straße kenianisch', 'street_snacks', 'snacks', 'mombasa', 200),
  R('شيبسي بطاطا شوارع كينية', 'Potato chips street Kenyan', 'Chips de rue kényans', 'Patatas chips callejeras kenianas', 'Kartoffelchips Straße kenianisch', 'street_snacks', 'snacks', 'african_shared', 185),
  R('ذرة حلوة مسلوقة شوارع كينية', 'Boiled sweet corn street Kenyan', 'Maïs doux bouilli de rue kényan', 'Maíz dulce hervido callejero keniano', 'Gekochter Süßmais Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 120),
  R('كعك سمسم شوارع كيني', 'Sesame cookies street Kenyan', 'Biscuits au sésame de rue kényans', 'Galletas de sésamo callejeras kenianas', 'Sesamkekse Straße kenianisch', 'street_snacks', 'snacks', 'pan_kenyan', 295),
  R('فطيرة محشوة لحم شوارع كينية', 'Meat stuffed pastry street Kenyan', 'Feuilleté à la viande de rue kényan', 'Empanada de carne callejera keniana', 'Fleischteigtasche Straße kenianisch', 'street_snacks', 'snacks', 'nairobi', 240),
  R('كرات جوز هند شوارع كينية', 'Coconut toffee balls street Kenyan', 'Boules de coco de rue kényanes', 'Bolas de coco callejeras kenianas', 'Kokosbonbon-Kugeln Straße kenianisch', 'street_snacks', 'snacks', 'mombasa', 260),
);
// --- condiments (8) ----------------------------------------------------------
dishes.push(
  R('بيلي بيلي صلصة حارة كينية', 'Pili pili hot sauce Kenyan', 'Sauce piquante pili pili kényane', 'Salsa picante pili pili keniana', 'Pili-Pili-Scharfe Sauce kenianisch', 'condiments', 'snacks', 'pan_kenyan', 60),
  R('صوص نياما تشوما كيني', 'Nyama choma dipping sauce Kenyan', 'Sauce pour nyama choma kényane', 'Salsa para nyama choma keniana', 'Nyama-Choma-Dip kenianisch', 'condiments', 'snacks', 'nairobi', 90),
  R('كاشومبوري مهروس كيني', 'Crushed kachumbari Kenyan', 'Kachumbari écrasé kényan', 'Kachumbari machacado keniano', 'Zerkleinertes Kachumbari kenianisch', 'condiments', 'snacks', 'pan_kenyan', 35),
  R('معجون كاري جوز هند كيني', 'Coconut curry paste Kenyan', 'Pâte de curry au coco kényane', 'Pasta de curry de coco keniana', 'Kokos-Curry-Paste kenianisch', 'condiments', 'snacks', 'mombasa', 120),
  R('بهارات بيلاو كينية', 'Pilau masala blend Kenyan', 'Mélange d épices pilau kényan', 'Mezcla de especias pilau keniana', 'Pilau-Gewürzmischung kenianisch', 'condiments', 'snacks', 'pan_kenyan', 300),
  R('صوص مانجو كيني', 'Mango sauce Kenyan', 'Sauce à la mangue kényane', 'Salsa de mango keniana', 'Mangosauce kenianisch', 'condiments', 'snacks', 'mombasa', 70),
  R('معجون سوكوما ويجي كيني', 'Sukuma wiki paste Kenyan', 'Pâte de sukuma wiki kényane', 'Pasta de sukuma wiki keniana', 'Sukuma-Wiki-Paste kenianisch', 'condiments', 'snacks', 'pan_kenyan', 55),
  R('بهارات تشوما كينية', 'Choma spice rub Kenyan', 'Mélange d épices choma kényan', 'Mezcla de especias choma keniana', 'Choma-Gewürzmischung kenianisch', 'condiments', 'snacks', 'pan_kenyan', 290),
);
// --- desserts_sweets (8) -----------------------------------------------------
dishes.push(
  R('كيك موز كيني', 'Banana cake Kenyan', 'Gâteau à la banane kényan', 'Pastel de plátano keniano', 'Bananenkuchen kenianisch', 'desserts_sweets', 'snacks', 'pan_kenyan', 220),
  R('حلاوة سمسم كينية', 'Sesame halva Kenyan', 'Halva au sésame kényan', 'Halva de sésamo keniana', 'Sesam-Halva kenianisch', 'desserts_sweets', 'snacks', 'pan_kenyan', 300),
  R('بودينغ ذرة حلوة كيني', 'Sweet corn pudding Kenyan', 'Pouding de maïs doux kényan', 'Pudín de maíz dulce keniano', 'Süßmaispudding kenianisch', 'desserts_sweets', 'snacks', 'pan_kenyan', 160),
  R('حلويات جوز هند كينية', 'Coconut sweets Kenyan', 'Bonbons de coco kényans', 'Dulces de coco kenianos', 'Kokossüßigkeiten kenianisch', 'desserts_sweets', 'snacks', 'mombasa', 250),
  R('موز بالعسل كيني', 'Banana with honey Kenyan', 'Banane au miel kényane', 'Plátano con miel keniano', 'Banane mit Honig kenianisch', 'desserts_sweets', 'snacks', 'pan_kenyan', 120),
  R('فاكهة مشكلة بالعسل كينية', 'Mixed fruit with honey Kenyan', 'Fruits variés au miel kényans', 'Fruta variada con miel keniana', 'Obstsalat mit Honig kenianisch', 'desserts_sweets', 'snacks', 'pan_kenyan', 90),
  R('كعكة فانيليا كينية', 'Vanilla cake Kenyan', 'Gâteau à la vanille kényan', 'Pastel de vainilla keniano', 'Vanillekuchen kenianisch', 'desserts_sweets', 'snacks', 'nairobi', 240),
  R('بسكويت دقيق كيني', 'Flour biscuits Kenyan', 'Biscuits à la farine kényans', 'Galletas de harina kenianas', 'Mehlkekse kenianisch', 'desserts_sweets', 'snacks', 'pan_kenyan', 230),
);
// --- beverages (22) ----------------------------------------------------------
dishes.push(
  R('شاي كيني سادة', 'Plain Kenyan tea', 'Thé kényan nature', 'Té keniano solo', 'Einfacher kenianischer Tee', 'beverages', 'snacks', 'nairobi', 20),
  R('شاي حليب سميك كيني', 'Strong milk tea Kenyan', 'Thé fort au lait kényan', 'Té fuerte con leche keniano', 'Starker Milchtee kenianisch', 'beverages', 'snacks', 'pan_kenyan', 55),
  R('قهوة كينية سوداء', 'Black Kenyan coffee', 'Café kényan noir', 'Café negro keniano', 'Schwarzer kenianischer Kaffee', 'beverages', 'snacks', 'pan_kenyan', 20),
  R('قهوة بالحليب كينية', 'Coffee with milk Kenyan', 'Café au lait kényan', 'Café con leche keniano', 'Kaffee mit Milch kenianisch', 'beverages', 'snacks', 'pan_kenyan', 45),
  R('عصير مانجو كيني', 'Mango juice Kenyan', 'Jus de mangue kényan', 'Jugo de mango keniano', 'Mangosaft kenianisch', 'beverages', 'snacks', 'pan_kenyan', 55),
  R('عصير أناناس كيني', 'Pineapple juice Kenyan', 'Jus d ananas kényan', 'Jugo de piña keniano', 'Ananassaft kenianisch', 'beverages', 'snacks', 'pan_kenyan', 50),
  R('عصير باشن فروت كيني', 'Passion fruit juice Kenyan', 'Jus de fruit de la passion kényan', 'Jugo de maracuyá keniano', 'Passionsfruchtsaft kenianisch', 'beverages', 'snacks', 'kisumu', 55),
  R('عصير برتقال كيني', 'Orange juice Kenyan', 'Jus d orange kényan', 'Jugo de naranja keniano', 'Orangensaft kenianisch', 'beverages', 'snacks', 'pan_kenyan', 45),
  R('عصير ليمون كيني', 'Lemon juice Kenyan', 'Jus de citron kényan', 'Jugo de limón keniano', 'Zitronensaft kenianisch', 'beverages', 'snacks', 'pan_kenyan', 30),
  R('عصير أفوكادو كيني', 'Avocado shake Kenyan', 'Smoothie d avocat kényan', 'Batido de aguacate keniano', 'Avocado-Shake kenianisch', 'beverages', 'snacks', 'nairobi', 85),
  R('ماء جوز هند كيني', 'Coconut water Kenyan', 'Eau de coco kényane', 'Agua de coco keniana', 'Kokoswasser kenianisch', 'beverages', 'snacks', 'mombasa', 20),
  R('حليب مخفوق موز كيني', 'Banana milkshake Kenyan', 'Lait frappé à la banane kényan', 'Batido de plátano keniano', 'Bananen-Milchshake kenianisch', 'beverages', 'snacks', 'pan_kenyan', 80),
  R('شراب زنجبيل كيني', 'Ginger drink Kenyan', 'Boisson au gingembre kényane', 'Bebida de jengibre keniana', 'Ingwergetränk kenianisch', 'beverages', 'snacks', 'pan_kenyan', 30),
  R('شراب ليمون بالنعناع كيني', 'Lemon mint cooler Kenyan', 'Boisson citron menthe kényane', 'Refresco de limón y menta keniano', 'Zitronen-Minz-Erfrischung kenianisch', 'beverages', 'snacks', 'mombasa', 35),
  R('حليب طازج كيني', 'Fresh milk Kenyan', 'Lait frais kényan', 'Leche fresca keniana', 'Frische Milch kenianisch', 'beverages', 'snacks', 'pan_kenyan', 65),
  R('لبن رائب كيني', 'Buttermilk Kenyan', 'Babeurre kényan', 'Suero de leche keniano', 'Buttermilch kenianisch', 'beverages', 'snacks', 'pan_kenyan', 60),
  R('شراب قصب سكر كيني', 'Sugarcane juice Kenyan', 'Jus de canne à sucre kényan', 'Jugo de caña de azúcar keniano', 'Zuckerrohrsaft kenianisch', 'beverages', 'snacks', 'kisumu', 90),
  R('عصير جوافة كيني', 'Guava juice Kenyan', 'Jus de goyave kényan', 'Jugo de guayaba keniano', 'Guavensaft kenianisch', 'beverages', 'snacks', 'pan_kenyan', 40),
  R('شراب هيل بالحليب كيني', 'Cardamom milk drink Kenyan', 'Boisson au lait de cardamome kényane', 'Bebida de leche con cardamomo keniana', 'Kardamom-Milchgetränk kenianisch', 'beverages', 'snacks', 'pan_kenyan', 50),
  R('عصير تمر هندي كيني', 'Tamarind juice Kenyan', 'Jus de tamarin kényan', 'Jugo de tamarindo keniano', 'Tamarindensaft kenianisch', 'beverages', 'snacks', 'mombasa', 45),
  R('عصير بابايا كيني', 'Papaya juice Kenyan', 'Jus de papaye kényan', 'Jugo de papaya keniano', 'Papayasaft kenianisch', 'beverages', 'snacks', 'pan_kenyan', 45),
  R('شاي بالليمون كيني', 'Lemon tea Kenyan', 'Thé au citron kényan', 'Té con limón keniano', 'Zitronentee kenianisch', 'beverages', 'snacks', 'nairobi', 25),
);

// ============================================================ MACROS
const MACRO_TPL = {
  breakfast_items: [6, 26, 6],
  breads_flatbreads: [7, 36, 4],
  rice_biryani: [6, 30, 4],
  dals_legumes: [8, 15, 4],
  vegetarian_mains: [5, 13, 6],
  poultry_mains: [22, 7, 9],
  meat_mains: [22, 4, 12],
  seafood_mains: [19, 6, 7],
  soups_salads: [5, 10, 3],
  street_snacks: [6, 22, 9],
  condiments: [3, 8, 6],
  desserts_sweets: [5, 30, 12],
  beverages: [2, 10, 2],
};
const r1 = (v) => Math.round(v * 10) / 10;
for (const d of dishes) {
  const [tp, tc, tf] = MACRO_TPL[d.category];
  const tcal = 4 * tp + 4 * tc + 9 * tf;
  const s = d.cal_100 / tcal;
  d.protein = r1(tp * s);
  d.carbs = r1(tc * s);
  d.fat = r1(tf * s);
  d.cal_100 = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
}

// ============================================================ ASSERT
const byRegion = {};
for (const d of dishes) byRegion[d.region] = (byRegion[d.region] ?? 0) + 1;
const byCategory = {};
for (const d of dishes) byCategory[d.category] = (byCategory[d.category] ?? 0) + 1;
const byMeal = {};
for (const d of dishes) byMeal[d.mealType] = (byMeal[d.mealType] ?? 0) + 1;

const names = dishes.map((d) => d.name_ar);
const dups = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
const badTok = dishes.filter((d) => !/كيني/.test(d.name_ar.replace(/[إأآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')));
const badRange = dishes.filter((d) => d.cal_100 < 20 || d.cal_100 > 900);

console.log('TOTAL dishes:', dishes.length);
console.log('By region:', JSON.stringify(byRegion, null, 0));
console.log('By category:', JSON.stringify(byCategory, null, 0));
console.log('By meal:', JSON.stringify(byMeal, null, 0));
if (dups.length) console.error('DUPLICATE names:', dups.join(' | '));
if (badTok.length) console.error('MISSING TOKEN:', badTok.map((d) => d.name_ar).join(' | '));
if (badRange.length) console.error('OUT OF RANGE:', badRange.map((d) => `${d.name_ar}:${d.cal_100}`).join(' | '));

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}
if (dups.length || badTok.length || badRange.length) process.exit(1);

fs.writeFileSync(
  path.join(__dirname, 'kenya-200-proposal.json'),
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
console.log('\nWrote scripts/kenya-200-proposal.json');