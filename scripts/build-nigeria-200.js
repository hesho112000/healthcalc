// Authoring script for the Nigerian 200-dish proposal (scripts/nigeria-200-proposal.json).
// 200 NEW dishes (the 100 legacy rows live in src/data/nigerian-full.ts). Mirrors the
// Malaysia/Indonesia authoring pattern: R() helper + per-category macro templates.
// Regions: pan_nigerian by default (golden rule), regional anchors for famous dishes
// (yoruba / igbo / hausa / efik_calabar / niger_delta), african_shared for dishes shared
// across West Africa (credited to the Nigerian card at runtime via the source prefix). All
// Arabic names carry a نيجيري/نيجيرية token (halal profile: no pork).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100) => ({
  name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100,
});

const dishes = [];

// ============================================================ PAN_NIGERIAN + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R('ماسا كعك أرز فطار نيجيري', 'Masa fermented rice cakes Nigerian breakfast', 'Gâteaux de riz fermenté masa petit-déjeuner nigérian', 'Pastelitos de arroz fermentado masa desayuno nigeriano', 'Masa-Fermentreiskuchen nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'hausa', 240),
  R('سيناسير فطائر أرز فطار نيجيري', 'Sinasir rice pancakes Nigerian breakfast', 'Crêpes de riz sinasir petit-déjeuner nigérian', 'Panqueques de arroz sinasir desayuno nigeriano', 'Sinasir-Reispfannkuchen nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'hausa', 230),
  R('كونون زاكي مشروب دني فطار نيجيري', 'Kunun zaki millet drink Nigerian breakfast', 'Boisson de mil kunun zaki petit-déjeuner nigérian', 'Bebida de mijo kunun zaki desayuno nigeriana', 'Kunun-Zaki-Hirsegetränk nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'hausa', 140),
  R('كونون أيا مشروب فطار نيجيري', 'Kunun aya tiger nut milk Nigerian breakfast', 'Lait de souchets kunun aya petit-déjeuner nigérian', 'Leche de chufas kunun aya desayuno nigeriana', 'Kunun-Aya-Erdmandelmilch nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'hausa', 120),
  R('كوكو عصيدة ذرة فطار نيجيري', 'Koko cornmeal porridge Nigerian breakfast', 'Bouillie de maïs koko petit-déjeuner nigérian', 'Gachas de maíz koko desayuno nigeriano', 'Koko-Maisbrei nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'hausa', 110),
  R('يام مع بيض مقلي فطار نيجيري', 'Yam with fried eggs Nigerian breakfast', 'Igname aux œufs frits petit-déjeuner nigérian', 'Ñame con huevos fritos desayuno nigeriano', 'Yam mit Spiegeleiern nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 215),
  R('أرز مسلوق مع صلصة بيض فطار نيجيري', 'Boiled rice with egg stew Nigerian breakfast', 'Riz blanc à la sauce d œuf petit-déjeuner nigérian', 'Arroz blanco con salsa de huevo desayuno nigeriano', 'Gekochter Reis mit Eiersauce nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 240),
  R('خبز مع أكارا فطار نيجيري', 'Bread with akara Nigerian breakfast', 'Pain aux beignets akara petit-déjeuner nigérian', 'Pan con akara desayuno nigeriano', 'Brot mit Akara nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 250),
  R('موى موى مع خبز فطار نيجيري', 'Moi Moi with bread Nigerian breakfast', 'Moi Moi avec pain petit-déjeuner nigérian', 'Moi Moi con pan desayuno nigeriano', 'Moi-Moi mit Brot nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 255),
  R('فطائر قمح نيجيرية فطار', 'Nigerian wheat pancakes breakfast', 'Crêpes de blé nigérianes petit-déjeuner', 'Panqueques de trigo nigerianos desayuno', 'Nigerianische Weizenpfannkuchen Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 200),
  R('عصيدة أرز فطار نيجيرية', 'Rice porridge Nigerian breakfast', 'Porridge de riz nigérian petit-déjeuner', 'Gachas de arroz nigerianas desayuno', 'Nigerianischer Reisbrei Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 160),
  R('بيض سكوتش نيجيري فطار', 'Nigerian scotch egg breakfast', 'Œuf écossais nigérian petit-déjeuner', 'Huevo escocés nigeriano desayuno', 'Nigerianisches Schotten-Ei Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 210),
  R('توست زبدة فول سوداني فطار نيجيري', 'Peanut butter toast Nigerian breakfast', 'Toast au beurre de cacahuète nigérian', 'Tostada con mantequilla de maní nigeriana', 'Erdnussbutter-Toast nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 260),
  R('أوجي مع حليب فطار نيجيري', 'Ogi with milk Nigerian breakfast', 'Ogi au lait petit-déjeuner nigérian', 'Ogi con leche desayuno nigeriano', 'Ogi mit Milch nigerianisches Frühstück', 'breakfast_items', 'breakfast', 'pan_nigerian', 130),
);
// --- breads_flatbreads (14) --------------------------------------------------
dishes.push(
  R('خبز إيجي رغيف نيجيري', 'Agege bread loaf Nigerian', 'Pain de mie Agege nigérian', 'Pan Agege nigeriano', 'Agege-Brotlaib nigerianisch', 'breads_flatbreads', 'breakfast', 'pan_nigerian', 265),
  R('خبز شاي نيجيري', 'Nigerian tea bread', 'Pain au thé nigérian', 'Pan de té nigeriano', 'Nigerianisches Teebrot', 'breads_flatbreads', 'breakfast', 'pan_nigerian', 245),
  R('خبز حليب نيجيري', 'Nigerian milk bread', 'Pain au lait nigérian', 'Pan de leche nigeriano', 'Nigerianisches Milchbrot', 'breads_flatbreads', 'breakfast', 'pan_nigerian', 260),
  R('خبز قمح بني نيجيري', 'Nigerian brown wheat bread', 'Pain de blé complet nigérian', 'Pan de trigo integral nigeriano', 'Nigerianisches Vollkornbrot', 'breads_flatbreads', 'breakfast', 'pan_nigerian', 225),
  R('خبز جوز هند نيجيري', 'Nigerian coconut bread', 'Pain à la noix de coco nigérian', 'Pan de coco nigeriano', 'Nigerianisches Kokosbrot', 'breads_flatbreads', 'breakfast', 'pan_nigerian', 250),
  R('رول نقانق نيجيري', 'Nigerian sausage roll', 'Feuilleté à la saucisse nigérian', 'Rollito de salchicha nigeriano', 'Nigerianische Wurstrollen', 'breads_flatbreads', 'breakfast', 'pan_nigerian', 300),
  R('بي برغر نيجيري', 'Nigerian bee burger puff', 'Brioche burger bee nigériane', 'Pan de hamburguesa bee nigeriana', 'Nigerianischer Bee-Burger', 'breads_flatbreads', 'breakfast', 'pan_nigerian', 310),
  R('توو شينكافا أكل نيجيري', 'Tuwo shinkafa rice swallow Nigerian', 'Boule de riz tuwo shinkafa nigériane', 'Bola de arroz tuwo shinkafa nigeriana', 'Tuwo-Shinkafa-Reisklöße nigerianisch', 'breads_flatbreads', 'lunch', 'hausa', 200),
  R('توو ماسارا كعكة ذرة نيجيري', 'Tuwo masara corn swallow Nigerian', 'Boule de maïs tuwo masara nigériane', 'Bola de maíz tuwo masara nigeriana', 'Tuwo-Masara-Maisklöße nigerianisch', 'breads_flatbreads', 'lunch', 'hausa', 210),
  R('سيموفيتا أكل نيجيري', 'Semovita swallow Nigerian', 'Boule de semoule semovita nigériane', 'Bola de sémola semovita nigeriana', 'Semovita-Grießklöße nigerianisch', 'breads_flatbreads', 'lunch', 'pan_nigerian', 200),
  R('أكل دقيق قمح نيجيري', 'Wheat flour swallow Nigerian', 'Boule de farine de blé nigériane', 'Bola de harina de trigo nigeriana', 'Weizenmehlklöße nigerianisch', 'breads_flatbreads', 'lunch', 'pan_nigerian', 205),
  R('لافون أكل كسافا نيجيري', 'Lafun cassava flour swallow Nigerian', 'Boule de farine de manioc lafun nigériane', 'Bola de harina de yuca lafun nigeriana', 'Lafun-Manihotmehlklöße nigerianisch', 'breads_flatbreads', 'lunch', 'yoruba', 190),
  R('أكبو فوفو كسافا نيجيري', 'Akpu fermented cassava fufu Nigerian', 'Foufou de manioc fermenté akpu nigérian', 'Fufu de yuca fermentada akpu nigeriano', 'Akpu-Fermentierter Manihot-Fufu nigerianisch', 'breads_flatbreads', 'lunch', 'igbo', 185),
  R('توو داوا كعكة دني نيجيري', 'Tuwo dawa millet swallow Nigerian', 'Boule de mil tuwo dawa nigériane', 'Bola de mijo tuwo dawa nigeriana', 'Tuwo-Dawa-Hirsenklöße nigerianisch', 'breads_flatbreads', 'lunch', 'hausa', 205),
);
// --- rice_biryani (26) -------------------------------------------------------
dishes.push(
  R('جولوف رايس حفلات نيجيري', 'Party jollof rice Nigerian', 'Riz jollof de fête nigérian', 'Arroz jollof de fiesta nigeriano', 'Party-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'african_shared', 195),
  R('جولوف رايس مدخن نيجيري', 'Smoky jollof rice Nigerian', 'Riz jollof fumé nigérian', 'Arroz jollof ahumado nigeriano', 'Rauchiger Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 200),
  R('جولوف رايس دجاج نيجيري', 'Chicken jollof rice Nigerian', 'Riz jollof au poulet nigérian', 'Arroz jollof con pollo nigeriano', 'Hühner-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 220),
  R('جولوف رايس سمك نيجيري', 'Fish jollof rice Nigerian', 'Riz jollof au poisson nigérian', 'Arroz jollof con pescado nigeriano', 'Fisch-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 210),
  R('جولوف رايس خضار نيجيري', 'Vegetable jollof rice Nigerian', 'Riz jollof aux légumes nigérian', 'Arroz jollof con verduras nigeriano', 'Gemüse-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 185),
  R('جولوف رايس لاغوس نيجيري', 'Lagos style jollof rice Nigerian', 'Riz jollof façon Lagos nigérian', 'Arroz jollof estilo Lagos nigeriano', 'Lagos-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'yoruba', 205),
  R('جولوف رايس إيبادان نيجيري', 'Ibadan jollof rice Nigerian', 'Riz jollof d Ibadan nigérian', 'Arroz jollof de Ibadan nigeriano', 'Ibadan-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'yoruba', 200),
  R('جولوف رايس كانو نيجيري', 'Kano jollof rice Nigerian', 'Riz jollof de Kano nigérian', 'Arroz jollof de Kano nigeriano', 'Kano-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'hausa', 205),
  R('جولوف رايس كالابار نيجيري', 'Calabar jollof rice Nigerian', 'Riz jollof de Calabar nigérian', 'Arroz jollof de Calabar nigeriano', 'Calabar-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'efik_calabar', 210),
  R('جولوف رايس بدون زيت نيجيري', 'Oil-less jollof rice Nigerian', 'Riz jollof sans huile nigérian', 'Arroz jollof sin aceite nigeriano', 'Jollof-Reis ohne Öl nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 175),
  R('جولوف رايس بلدي نيجيري', 'Native jollof rice Nigerian', 'Riz jollof autochtone nigérian', 'Arroz jollof nativo nigeriano', 'Traditioneller Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 205),
  R('جولوف رايس أرز محلي نيجيري', 'Local rice jollof Nigerian', 'Riz jollof au riz local nigérian', 'Arroz jollof con arroz local nigeriano', 'Jollof-Reis mit lokalem Reis nigerianisch', 'rice_biryani', 'lunch', 'african_shared', 190),
  R('أرز أوفادا سادة نيجيري', 'Plain ofada rice Nigerian', 'Riz ofada nature nigérian', 'Arroz ofada simple nigeriano', 'Ofada-Reis pur nigerianisch', 'rice_biryani', 'lunch', 'yoruba', 205),
  R('أرز جوز هند نيجيري', 'Coconut rice Nigerian', 'Riz à la noix de coco nigérian', 'Arroz con coco nigeriano', 'Kokosreis nigerianisch', 'rice_biryani', 'lunch', 'efik_calabar', 230),
  R('أرز بانجا نيجيري', 'Banga rice Nigerian', 'Riz banga nigerian', 'Arroz banga nigeriano', 'Banga-Reis nigerianisch', 'rice_biryani', 'lunch', 'niger_delta', 235),
  R('أرز مقلي حفلات نيجيري', 'Party fried rice Nigerian', 'Riz frit de fête nigérian', 'Arroz frito de fiesta nigeriano', 'Party-Gebratener Reis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 210),
  R('أرز أبيض مع يخنة نيجيري', 'White rice with stew Nigerian', 'Riz blanc à la sauce nigériane', 'Arroz blanco con guiso nigeriano', 'Weißer Reis mit Eintopf nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 215),
  R('أرز مقلي مأكولات بحرية نيجيري', 'Seafood fried rice Nigerian', 'Riz frit aux fruits de mer nigérian', 'Arroz frito con mariscos nigeriano', 'Gebratener Reis mit Meeresfrüchten nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 225),
  R('أرز مقلي بيض نيجيري', 'Egg fried rice Nigerian', 'Riz frit aux œufs nigérian', 'Arroz frito con huevo nigeriano', 'Gebratener Eierreis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 200),
  R('أرز كاري نيجيري', 'Nigerian curried rice', 'Riz au curry nigérian', 'Arroz al curry nigeriano', 'Nigerianischer Curryreis', 'rice_biryani', 'lunch', 'pan_nigerian', 215),
  R('أرز ماسالا نيجيري', 'Nigerian masala rice', 'Riz masala nigérian', 'Arroz masala nigeriano', 'Nigerianischer Masala-Reis', 'rice_biryani', 'lunch', 'pan_nigerian', 210),
  R('جولوف رايس مع فاصوليا نيجيري', 'Jollof rice with beans Nigerian', 'Riz jollof aux haricots nigérian', 'Arroz jollof con frijoles nigeriano', 'Jollof-Reis mit Bohnen nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 185),
  R('أرز مقلي روبيان نيجيري', 'Fried rice with prawns Nigerian', 'Riz frit aux crevettes nigérian', 'Arroz frito con gambas nigeriano', 'Gebratener Reis mit Garnelen nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 220),
  R('أرز أوفادا مع أوغيري نيجيري', 'Ofada rice with ogiri Nigerian', 'Riz ofada à l ogiri nigérian', 'Arroz ofada con ogiri nigeriano', 'Ofada-Reis mit Ogiri nigerianisch', 'rice_biryani', 'lunch', 'yoruba', 200),
  R('جولوف رايس جوز هند نيجيري', 'Coconut jollof rice Nigerian', 'Riz jollof à la noix de coco nigérian', 'Arroz jollof con coco nigeriano', 'Kokos-Jollof-Reis nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 230),
  R('أرز و يخنة طماطم نيجيري', 'Rice and tomato stew Nigerian', 'Riz à la sauce tomate nigérian', 'Arroz con guiso de tomate nigeriano', 'Reis mit Tomateneintopf nigerianisch', 'rice_biryani', 'lunch', 'pan_nigerian', 205),
);
// --- dals_legumes (8) --------------------------------------------------------
dishes.push(
  R('عصيدة فاصوليا نيجيرية', 'Nigerian beans porridge', 'Porridge de haricots nigérian', 'Gachas de frijoles nigerianas', 'Nigerianischer Bohnenbrei', 'dals_legumes', 'lunch', 'pan_nigerian', 160),
  R('أدالو فاصوليا و ذرة نيجيري', 'Adalu beans and corn Nigerian', 'Adalu haricots et maïs nigérian', 'Adalu frijoles y maíz nigeriano', 'Adalu-Bohnen-und-Mais nigerianisch', 'dals_legumes', 'lunch', 'yoruba', 170),
  R('إيوا أولوين فاصوليا عسل نيجيرية', 'Ewa oloyin honey beans Nigerian', 'Ewa oloyin haricots au miel nigérians', 'Ewa oloyin frijoles de miel nigerianos', 'Ewa-Oloyin-Honigbohnen nigerianisch', 'dals_legumes', 'lunch', 'yoruba', 175),
  R('أكارا فول شوارع نيجيرية', 'Street akara fritters Nigerian', 'Akara de rue nigérian', 'Akara callejero nigeriano', 'Akara-Straßenkrapfen nigerianisch', 'dals_legumes', 'lunch', 'african_shared', 185),
  R('موى موى بالبيض نيجيري', 'Moi Moi with egg Nigerian', 'Moi Moi aux œufs nigérian', 'Moi Moi con huevo nigeriano', 'Moi-Moi mit Ei nigerianisch', 'dals_legumes', 'lunch', 'pan_nigerian', 165),
  R('يخنة فاصوليا حمراء نيجيرية', 'Nigerian red beans stew', 'Ragoût de haricots rouges nigérian', 'Guiso de frijoles rojos nigeriano', 'Nigerianischer Roter-Bohnen-Eintopf', 'dals_legumes', 'lunch', 'pan_nigerian', 155),
  R('يخنة عدس نيجيرية', 'Nigerian lentil stew', 'Ragoût de lentilles nigérian', 'Guiso de lentejas nigeriano', 'Nigerianischer Linseneintopf', 'dals_legumes', 'lunch', 'pan_nigerian', 150),
  R('فاصوليا سوداء نيجيرية', 'Nigerian black beans', 'Haricots noirs nigérians', 'Frijoles negros nigerianos', 'Nigerianische schwarze Bohnen', 'dals_legumes', 'lunch', 'pan_nigerian', 155),
);
// --- vegetarian_mains (12) ---------------------------------------------------
dishes.push(
  R('إفو ريرو بفول الخروب نيجيري', 'Efo riro with locust beans Nigerian', 'Efo riro aux graines de caroube nigérian', 'Efo riro con algarrobo nigeriano', 'Efo-Riro mit Johannisbrotbohnen nigerianisch', 'vegetarian_mains', 'lunch', 'pan_nigerian', 140),
  R('بوتيج إيجوسي خضار نيجيري', 'Egusi vegetable pottage Nigerian', 'Pottage egusi aux légumes nigérian', 'Pottage de egusi con verduras nigeriano', 'Egusi-Gemüseeintopf nigerianisch', 'vegetarian_mains', 'lunch', 'pan_nigerian', 180),
  R('إيجوسي أوراق ماء نيجيري', 'Waterleaf and egusi Nigerian', 'Feuille douce et egusi nigérians', 'Hoja de agua y egusi nigerianos', 'Wasserblatt und Egusi nigerianisch', 'vegetarian_mains', 'lunch', 'efik_calabar', 175),
  R('يخنة خضار نيجيرية', 'Nigerian vegetable stew', 'Ragoût de légumes nigérian', 'Guiso de verduras nigeriano', 'Nigerianischer Gemüseeintopf', 'vegetarian_mains', 'lunch', 'pan_nigerian', 120),
  R('ملفوف مقلي بخضار نيجيري', 'Fried cabbage with vegetables Nigerian', 'Chou frit aux légumes nigérian', 'Repollo frito con verduras nigeriano', 'Gebratener Kohl mit Gemüse nigerianisch', 'vegetarian_mains', 'lunch', 'pan_nigerian', 110),
  R('شوربة بامية بخضار نيجيرية', 'Okra with vegetables Nigerian', 'Gombo aux légumes nigérian', 'Quingombó con verduras nigeriano', 'Okra mit Gemüse nigerianisch', 'vegetarian_mains', 'lunch', 'pan_nigerian', 100),
  R('موى موى خضار نيجيري', 'Vegetable Moi Moi Nigerian', 'Moi Moi aux légumes nigérian', 'Moi Moi con verduras nigeriano', 'Gemüse-Moi-Moi nigerianisch', 'vegetarian_mains', 'lunch', 'pan_nigerian', 150),
  R('يخنة بذور قرع نيجيرية', 'Pumpkin seed stew Nigerian', 'Ragoût de graines de courge nigérian', 'Guiso de semillas de calabaza nigeriano', 'Kürbiskerneintopf nigerianisch', 'vegetarian_mains', 'lunch', 'igbo', 190),
  R('يخنة موز نيجيرية', 'Plantain porridge Nigerian', 'Porridge de plantain nigérian', 'Gachas de plátano nigerianas', 'Kochbananenbrei nigerianisch', 'vegetarian_mains', 'lunch', 'pan_nigerian', 140),
  R('كاري جوز هند خضار نيجيري', 'Nigerian coconut vegetable curry', 'Curry de légumes au coco nigérian', 'Curry de verduras con coco nigeriano', 'Nigerianisches Kokos-Gemüsecurry', 'vegetarian_mains', 'lunch', 'pan_nigerian', 160),
  R('باذنجان مطهو مع يام نيجيري', 'Stewed garden egg with yam Nigerian', 'Aubergine du jardin mijotée à l igname nigériane', 'Berenjena de jardín guisada con ñame nigeriana', 'Gedünstetes Garten-Ei mit Yam nigerianisch', 'vegetarian_mains', 'lunch', 'pan_nigerian', 115),
  R('بوتيج خضار مشكل نيجيري', 'Nigerian mixed vegetable pottage', 'Pottage de légumes mélangés nigérian', 'Pottage de verduras mixtas nigeriano', 'Nigerianischer Gemüseeintopf Mix', 'vegetarian_mains', 'lunch', 'pan_nigerian', 125),
);
// --- poultry_mains (16) ------------------------------------------------------
dishes.push(
  R('دجاج جولوف نيجيري', 'Jollof chicken Nigerian', 'Poulet jollof nigérian', 'Pollo jollof nigeriano', 'Jollof-Hähnchen nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 240),
  R('دجاج مشوي مفلفل نيجيري', 'Peppered grilled chicken Nigerian', 'Poulet grillé épicé nigérian', 'Pollo a la parrilla con pimiento nigeriano', 'Pfeffriges Grillhähnchen nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 215),
  R('دجاج كاري نيجيري', 'Nigerian chicken curry', 'Curry de poulet nigérian', 'Curry de pollo nigeriano', 'Nigerianisches Hühnercurry', 'poultry_mains', 'lunch', 'pan_nigerian', 230),
  R('دجاج جوز هند نيجيري', 'Nigerian coconut chicken stew', 'Poulet au coco nigérian', 'Pollo con coco nigeriano', 'Nigerianischer Kokos-Hühnereintopf', 'poultry_mains', 'lunch', 'pan_nigerian', 240),
  R('دجاج فول سوداني نيجيري', 'Groundnut chicken stew Nigerian', 'Poulet à l arachide nigérian', 'Pollo con maní nigeriano', 'Erdnuss-Hühnereintopf nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 245),
  R('دجاج أياماسي نيجيري', 'Ayamase chicken Nigerian', 'Poulet ayamase nigérian', 'Pollo ayamase nigeriano', 'Ayamase-Hähnchen nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 245),
  R('دجاج بيبر سوب نيجيري', 'Chicken pepper soup Nigerian', 'Soupe au poivre de poulet nigériane', 'Sopa de pimienta de pollo nigeriana', 'Hühner-Pfeffersuppe nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 160),
  R('دجاج بوكا نيجيري', 'Buka chicken Nigerian', 'Poulet buka nigérian', 'Pollo buka nigeriano', 'Buka-Hähnchen nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 225),
  R('بوتيج دجاج نيجيري', 'Chicken pottage Nigerian', 'Pottage de poulet nigérian', 'Pottage de pollo nigeriano', 'Hühnereintopf-Pottage nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 220),
  R('دجاج مشوي مدخن نيجيري', 'Smoky grilled chicken Nigerian', 'Poulet grillé fumé nigérian', 'Pollo a la parrilla ahumado nigeriano', 'Rauchig gegrilltes Hähnchen nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 205),
  R('سويا دجاج نيجيري', 'Chicken suya Nigerian', 'Suya de poulet nigérian', 'Suya de pollo nigeriano', 'Hühner-Suya nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 210),
  R('أوفه نسالا دجاج نيجيري', 'Chicken ofe nsala Nigerian', 'Ofe nsala au poulet nigérian', 'Ofe nsala de pollo nigeriano', 'Hühner-Ofe-Nsala nigerianisch', 'poultry_mains', 'lunch', 'igbo', 190),
  R('دجاج بزيت النخيل نيجيري', 'Chicken palm oil stew Nigerian', 'Poulet à l huile de palme nigérian', 'Pollo al aceite de palma nigeriano', 'Hähnchen-Palmöleintopf nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 240),
  R('دجاج يخنة طماطم نيجيري', 'Chicken tomato stew Nigerian', 'Poulet à la sauce tomate nigérian', 'Pollo al guiso de tomate nigeriano', 'Hähnchen-Tomatenreintopf nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 230),
  R('فخذ دجاج مقلي نيجيري', 'Fried chicken drumstick Nigerian', 'Haut de cuisse frit nigérian', 'Pierna de pollo frita nigeriana', 'Gebratene Hähnchenkeule nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 225),
  R('غيزارد دجاج مطهو نيجيري', 'Stewed gizzard Nigerian', 'Gésiers mijotés nigérians', 'Mollejas guisadas nigerianas', 'Geschmorte Hühnermägen nigerianisch', 'poultry_mains', 'lunch', 'pan_nigerian', 210),
);
// --- meat_mains (16) ---------------------------------------------------------
dishes.push(
  R('بيبر سوب ماعز نيجيري', 'Goat pepper soup Nigerian', 'Soupe au poivre de chèvre nigériane', 'Sopa de pimienta de cabra nigeriana', 'Ziegen-Pfeffersuppe nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 175),
  R('بيبر سوب بقري نيجيري', 'Beef pepper soup Nigerian', 'Soupe au poivre de bœuf nigériane', 'Sopa de pimienta de res nigeriana', 'Rind-Pfeffersuppe nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 165),
  R('أسون ماعز حار نيجيري', 'Asun spicy goat Nigerian', 'Asun de chèvre épicée nigérian', 'Asun de cabra picante nigeriano', 'Asun-Scharfe Ziege nigerianisch', 'meat_mains', 'lunch', 'yoruba', 200),
  R('سويا بقري شوارع نيجيري', 'Street beef suya Nigerian', 'Suya de bœuf de rue nigérian', 'Suya de res callejero nigeriano', 'Straßen-Suya vom Rind nigerianisch', 'meat_mains', 'lunch', 'african_shared', 195),
  R('سويا كبش نيجيري', 'Ram suya Nigerian', 'Suya de bélier nigérian', 'Suya de carnero nigeriano', 'Schafbock-Suya nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 190),
  R('لحم مفلفل نيجيري', 'Peppered beef Nigerian', 'Bœuf au poivre nigérian', 'Res con pimiento nigeriana', 'Pfeffriges Rind nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 205),
  R('يخنة بقري بوكا نيجيرية', 'Buka beef stew Nigerian', 'Ragoût buka de bœuf nigérian', 'Guiso buka de res nigeriano', 'Buka-Rindereintopf nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 220),
  R('يخنة بقري فول سوداني نيجيرية', 'Groundnut beef stew Nigerian', 'Ragoût de bœuf à l arachide nigérian', 'Guiso de res con maní nigeriano', 'Erdnuss-Rindereintopf nigerianisch', 'meat_mains', 'lunch', 'african_shared', 240),
  R('كاري بقري نيجيري', 'Nigerian beef curry', 'Curry de bœuf nigérian', 'Curry de res nigeriano', 'Nigerianisches Rindcurry', 'meat_mains', 'lunch', 'pan_nigerian', 210),
  R('بيبر سوب ذيل بقري نيجيري', 'Cow tail pepper soup Nigerian', 'Soupe au poivre de queue de bœuf nigériane', 'Sopa de pimienta de rabo de res nigeriana', 'Ochsenschwanz-Pfeffersuppe nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 180),
  R('نكوبي قدم بقري نيجيري', 'Nkwobi cow foot Nigerian', 'Nkwobi pied de bœuf nigérian', 'Nkwobi pata de res nigeriana', 'Nkwobi-Rinderfuß nigerianisch', 'meat_mains', 'lunch', 'igbo', 220),
  R('سويا لحم ضأن نيجيري', 'Spiced lamb suya Nigerian', 'Suya d agneau épicé nigérian', 'Suya de cordero especiado nigeriano', 'Gewürztes Lamm-Suya nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 200),
  R('بوتيج بقري نيجيري', 'Nigerian beef pottage', 'Pottage de bœuf nigérian', 'Pottage de res nigeriano', 'Rind-Pottage nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 200),
  R('بيبر سوب شاكي نيجيري', 'Shaki tripe pepper soup Nigerian', 'Soupe au poivre de tripes shaki nigériane', 'Sopa de pimienta de callos shaki nigeriana', 'Shaki-Kutteln-Pfeffersuppe nigerianisch', 'meat_mains', 'lunch', 'pan_nigerian', 150),
  R('ماعز مشوي بياجي نيجيري', 'Grilled goat with yaji Nigerian', 'Chèvre grillée au yaji nigériane', 'Cabra a la parrilla con yaji nigeriana', 'Gegrillte Ziege mit Yaji nigerianisch', 'meat_mains', 'lunch', 'hausa', 205),
  R('ميان داغينغ لحم هاوسا نيجيري', 'Hausa beef stew miyan daging Nigerian', 'Ragoût de bœuf miyan daging haoussa nigérian', 'Guiso de res miyan daging hausa nigeriano', 'Hausa-Rindereintopf Miyan-Daging nigerianisch', 'meat_mains', 'lunch', 'hausa', 230),
);
// --- seafood_mains (14) ------------------------------------------------------
dishes.push(
  R('قرموط مشوي نيجيري', 'Grilled catfish Nigerian', 'Poisson-chat grillé nigérian', 'Bagre a la parrilla nigeriano', 'Gegrillter Wels nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 180),
  R('بيبر سوب سمك نيجيري', 'Fish pepper soup Nigerian', 'Soupe au poivre de poisson nigériane', 'Sopa de pimienta de pescado nigeriana', 'Fisch-Pfeffersuppe nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 130),
  R('يخنة سمك بانجا نيجيرية', 'Banga fish stew Nigerian', 'Ragoût de poisson banga nigérian', 'Guiso de pescado banga nigeriano', 'Banga-Fischeintopf nigerianisch', 'seafood_mains', 'lunch', 'niger_delta', 200),
  R('بيبر سوب صياد نيجيري', 'Fisherman pepper soup Nigerian', 'Soupe au poivre du pêcheur nigériane', 'Sopa de pimienta de pescador nigeriana', 'Fischer-Pfeffersuppe nigerianisch', 'seafood_mains', 'lunch', 'niger_delta', 140),
  R('أوبوريكو سمك نيجيري', 'Oporico fish Nigerian', 'Poisson oporico nigérian', 'Pescado oporico nigeriano', 'Oporico-Fisch nigerianisch', 'seafood_mains', 'lunch', 'niger_delta', 210),
  R('سمك بصلصة طماطم نيجيري', 'Fish with tomato stew Nigerian', 'Poisson à la sauce tomate nigérian', 'Pescado con guiso de tomate nigeriano', 'Fisch mit Tomateneintopf nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 190),
  R('كروكر مقلي نيجيري', 'Fried croaker Nigerian', 'Courbine frite nigériane', 'Corvina frita nigeriana', 'Gebratene Croaker nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 210),
  R('بلطي مشوي نيجيري', 'Grilled tilapia Nigerian', 'Tilapia grillé nigérian', 'Tilapia a la parrilla nigeriano', 'Gegrillte Tilapia nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 175),
  R('شوربة روبيان بامية نيجيرية', 'Prawn okra soup Nigerian', 'Soupe de gombo aux crevettes nigériane', 'Sopa de quingombó con gambas nigeriana', 'Garnelen-Okra-Suppe nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 155),
  R('يخنة كرافيش نيجيرية', 'Crayfish stew Nigerian', 'Ragoût d écrevisses nigérian', 'Guiso de cangrejos nigeriano', 'Krebseintopf nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 160),
  R('سويا روبيان نيجيري', 'Suya prawns Nigerian', 'Crevettes suya nigérianes', 'Gambas suya nigerianas', 'Suya-Garnelen nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 175),
  R('يخنة سمك كالابار نيجيرية', 'Calabar fish stew Nigerian', 'Ragoût de poisson de Calabar nigérian', 'Guiso de pescado de Calabar nigeriano', 'Calabar-Fischeintopf nigerianisch', 'seafood_mains', 'lunch', 'efik_calabar', 195),
  R('بيبر سوب كرافيش نيجيري', 'Crayfish pepper soup Nigerian', 'Soupe au poivre d écrevisses nigériane', 'Sopa de pimienta de cangrejos nigeriana', 'Krebs-Pfeffersuppe nigerianisch', 'seafood_mains', 'lunch', 'pan_nigerian', 125),
  R('سلطعون مسلوق مفلفل نيجيري', 'Boiled crab with pepper Nigerian', 'Crabe bouilli poivré nigérian', 'Cangrejo hervido con pimiento nigeriano', 'Gekochte Krabbe mit Pfeffer nigerianisch', 'seafood_mains', 'lunch', 'niger_delta', 150),
);
// --- soups_salads (24) -------------------------------------------------------
dishes.push(
  R('ميان كوكا شوربة باوباب نيجيرية', 'Miyan kuka baobab soup Nigerian', 'Soupe de baobab miyan kuka nigériane', 'Sopa de baobab miyan kuka nigeriana', 'Miyan-Kuka-Baobabsuppe nigerianisch', 'soups_salads', 'lunch', 'hausa', 160),
  R('ميان تاوشي شوربة قرع نيجيرية', 'Miyan taushe pumpkin leaf soup Nigerian', 'Soupe de feuilles de courge miyan taushe nigériane', 'Sopa de hojas de calabaza miyan taushe nigeriana', 'Miyan-Taushe-Kürbisblattsuppe nigerianisch', 'soups_salads', 'lunch', 'hausa', 165),
  R('ميان ياكووا شوربة حميض نيجيرية', 'Miyan yakuwa sorrel soup Nigerian', 'Soupe d oseille miyan yakuwa nigériane', 'Sopa de acedera miyan yakuwa nigeriana', 'Miyan-Yakuwa-Sauerampfersuppe nigerianisch', 'soups_salads', 'lunch', 'hausa', 155),
  R('شوربة بامية بإيجوسي نيجيرية', 'Okra soup with egusi Nigerian', 'Soupe de gombo à l egusi nigériane', 'Sopa de quingombó con egusi nigeriana', 'Okra-Suppe mit Egusi nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 150),
  R('إفو ريرو باللحم نيجيري', 'Efo riro with meat Nigerian', 'Efo riro à la viande nigérian', 'Efo riro con carne nigeriano', 'Efo-Riro mit Fleisch nigerianisch', 'soups_salads', 'lunch', 'yoruba', 165),
  R('شوربة أوغو أوراق قرع نيجيرية', 'Ugu pumpkin leaf soup Nigerian', 'Soupe ugu de feuilles de courge nigériane', 'Sopa ugu de hojas de calabaza nigeriana', 'Ugu-Kürbisblattsuppe nigerianisch', 'soups_salads', 'lunch', 'igbo', 140),
  R('شوربة أوراق مرة نيجيرية', 'Bitterleaf soup Nigerian', 'Soupe aux feuilles amères nigériane', 'Sopa de hojas amargas nigeriana', 'Bitterblattsuppe nigerianisch', 'soups_salads', 'lunch', 'igbo', 155),
  R('أوفه أكوو بالدجاج نيجيري', 'Ofe akwu with chicken Nigerian', 'Ofe akwu au poulet nigérian', 'Ofe akwu con pollo nigeriano', 'Ofe-Akwu mit Hähnchen nigerianisch', 'soups_salads', 'lunch', 'igbo', 185),
  R('أوغبونو بسبانخ نيجيري', 'Ogbono with spinach Nigerian', 'Ogbono aux épinards nigérian', 'Ogbono con espinacas nigeriano', 'Ogbono mit Spinat nigerianisch', 'soups_salads', 'lunch', 'igbo', 175),
  R('شوربة فول سوداني نيجيرية', 'Groundnut soup Nigerian', 'Soupe à l arachide nigériane', 'Sopa de maní nigeriana', 'Erdnusssuppe nigerianisch', 'soups_salads', 'lunch', 'african_shared', 185),
  R('بيبر سوب يام نيجيري', 'Pepper soup with yam Nigerian', 'Soupe au poivre à l igname nigériane', 'Sopa de pimienta con ñame nigeriana', 'Pfeffersuppe mit Yam nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 145),
  R('شوربة بامية نباتية نيجيرية', 'Vegan okra soup Nigerian', 'Soupe de gombo végétalienne nigériane', 'Sopa de quingombó vegana nigeriana', 'Vegane Okra-Suppe nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 90),
  R('إيجوسي مع بامية نيجيري', 'Egusi with okra Nigerian', 'Egusi au gombo nigérian', 'Egusi con quingombó nigeriano', 'Egusi mit Okra nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 170),
  R('أفانج مع قواقع نيجيري', 'Afang soup with periwinkle Nigerian', 'Soupe afang au bigorneau nigériane', 'Sopa afang con caracolillo nigeriana', 'Afang-Suppe mit Strandschnecken nigerianisch', 'soups_salads', 'lunch', 'efik_calabar', 175),
  R('إيديكانغ إيكونغ بقواقع نيجيري', 'Edikang ikong with periwinkle Nigerian', 'Edikang ikong au bigorneau nigérian', 'Edikang ikong con caracolillo nigeriano', 'Edikang-Ikong mit Strandschnecken nigerianisch', 'soups_salads', 'lunch', 'efik_calabar', 185),
  R('سلطة خس نيجيرية', 'Nigerian lettuce salad', 'Salade de laitue nigériane', 'Ensalada de lechuga nigeriana', 'Nigerianischer Kopfsalat', 'soups_salads', 'lunch', 'pan_nigerian', 45),
  R('سلطة خيار شرائح نيجيرية', 'Sliced cucumber salad Nigerian', 'Salade de concombres tranchés nigériane', 'Ensalada de pepino en rodajas nigeriana', 'Gurkensalat in Scheiben nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 30),
  R('سلطة جزر مبشور نيجيرية', 'Grated carrot salad Nigerian', 'Salade de carottes râpées nigériane', 'Ensalada de zanahoria rallada nigeriana', 'Geraspelter Karottensalat nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 35),
  R('أباشا مع كرافيش سلطة نيجيرية', 'Abacha with crayfish Nigerian', 'Abacha aux écrevisses nigérian', 'Abacha con cangrejos nigeriano', 'Abacha mit Krebsen nigerianisch', 'soups_salads', 'lunch', 'igbo', 155),
  R('سلطة أوغبا نيجيرية', 'Ugba salad Nigerian', 'Salade ugba nigériane', 'Ensalada ugba nigeriana', 'Ugba-Salat nigerianisch', 'soups_salads', 'lunch', 'igbo', 120),
  R('سلطة فواكه نيجيرية', 'Nigerian fruit salad', 'Salade de fruits nigériane', 'Ensalada de frutas nigeriana', 'Nigerianischer Obstsalat', 'soups_salads', 'lunch', 'pan_nigerian', 70),
  R('سلطة أوراق ماء نيجيرية', 'Waterleaf salad Nigerian', 'Salade de feuille douce nigériane', 'Ensalada de hoja de agua nigeriana', 'Wasserblatt-Salat nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 40),
  R('سلطة أفوكادو وباذنجان نيجيرية', 'Avocado and garden egg salad Nigerian', 'Salade d avocat et aubergine du jardin nigériane', 'Ensalada de aguacate y berenjena de jardín nigeriana', 'Avocado-Garten-Ei-Salat nigerianisch', 'soups_salads', 'lunch', 'pan_nigerian', 95),
  R('سلطة بطاطس نيجيرية', 'Nigerian potato salad', 'Salade de pommes de terre nigériane', 'Ensalada de papas nigeriana', 'Nigerianischer Kartoffelsalat', 'soups_salads', 'lunch', 'pan_nigerian', 130),
);
// --- street_snacks (16) ------------------------------------------------------
dishes.push(
  R('سويا أسياخ نيجيري', 'Suya beef skewers Nigerian', 'Brochettes de bœuf suya nigérianes', 'Brochetas de res suya nigerianas', 'Suya-Rindfleischspieße nigerianisch', 'street_snacks', 'snacks', 'african_shared', 195),
  R('تشين تشين حلوى مقلية نيجيرية', 'Chin chin fried dough Nigerian', 'Chin chin pâte frite nigériane', 'Chin chin masa frita nigeriana', 'Chin-Chin-Frittierteig nigerianisch', 'street_snacks', 'snacks', 'african_shared', 300),
  R('باف باف شوارع نيجيري', 'Street puff puff Nigerian', 'Puff puff de rue nigérian', 'Puff puff callejero nigeriano', 'Puff-Puff von der Straße nigerianisch', 'street_snacks', 'snacks', 'african_shared', 260),
  R('كولي كولي مقرمش نيجيري', 'Crunchy kuli-kuli Nigerian', 'Kuli-kuli croquant nigérian', 'Kuli-kuli crujiente nigeriano', 'Knuspriges Kuli-Kuli nigerianisch', 'street_snacks', 'snacks', 'pan_nigerian', 320),
  R('فطيرة لحم نيجيرية', 'Nigerian meat pie', 'Tourte à la viande nigériane', 'Empanada de carne nigeriana', 'Nigerianische Fleischpastete', 'street_snacks', 'snacks', 'pan_nigerian', 350),
  R('فطيرة دجاج نيجيرية', 'Nigerian chicken pie', 'Tourte au poulet nigériane', 'Empanada de pollo nigeriana', 'Nigerianische Hühnerpastete', 'street_snacks', 'snacks', 'pan_nigerian', 345),
  R('فطيرة سمك نيجيرية', 'Nigerian fish pie', 'Tourte au poisson nigériane', 'Empanada de pescado nigeriana', 'Nigerianische Fischpastete', 'street_snacks', 'snacks', 'pan_nigerian', 330),
  R('لفة بيض نيجيرية', 'Nigerian egg roll', 'Roulé aux œufs nigérian', 'Rollo de huevo nigeriano', 'Nigerianische Eierrolle', 'street_snacks', 'snacks', 'pan_nigerian', 290),
  R('أكارا شوارع مقلية نيجيرية', 'Fried akara street snack Nigerian', 'Akara frit de rue nigérian', 'Akara frito callejero nigeriano', 'Gebratene Akara Straßensnack nigerianisch', 'street_snacks', 'snacks', 'african_shared', 190),
  R('ماسا أسياخ هاوسا نيجيري', 'Hausa masa skewers Nigerian', 'Brochettes masa haoussa nigérianes', 'Brochetas masa hausa nigerianas', 'Hausa-Masa-Spieße nigerianisch', 'street_snacks', 'snacks', 'hausa', 215),
  R('كويباب سويا نيجيري', 'Suya kebab Nigerian', 'Kébab suya nigérian', 'Kebab suya nigeriano', 'Suya-Kebab nigerianisch', 'street_snacks', 'snacks', 'pan_nigerian', 190),
  R('دودو موز مقلي شوارع نيجيري', 'Street fried dodo plantain Nigerian', 'Dodo frit de rue nigérian', 'Dodo frito callejero nigeriano', 'Gebratener Dodo-Kochbanane Straße nigerianisch', 'street_snacks', 'snacks', 'pan_nigerian', 185),
  R('ذرة مشوية شوارع نيجيرية', 'Roasted corn street Nigerian', 'Maïs grillé de rue nigérian', 'Maíz asado callejero nigeriano', 'Gerösteter Mais Straße nigerianisch', 'street_snacks', 'snacks', 'pan_nigerian', 130),
  R('فول سوداني مسلوق نيجيري', 'Boiled groundnuts Nigerian', 'Arachides bouillies nigérianes', 'Maníes hervidos nigerianos', 'Gekochte Erdnüsse nigerianisch', 'street_snacks', 'snacks', 'pan_nigerian', 310),
  R('بولي موز مشوي شوارع نيجيري', 'Street roasted boli plantain Nigerian', 'Plantain rôti boli de rue nigérian', 'Plátano asado boli callejero nigeriano', 'Gerösteter Boli-Kochbanane Straße nigerianisch', 'street_snacks', 'snacks', 'pan_nigerian', 140),
  R('كوكورو شوارع نيجيري', 'Street kokoro corn snack Nigerian', 'Kokoro de rue nigérian', 'Kokoro callejero nigeriano', 'Kokoro Straßensnack nigerianisch', 'street_snacks', 'snacks', 'pan_nigerian', 300),
);
// --- condiments (6) ----------------------------------------------------------
dishes.push(
  R('صلصة فلفل حار نيجيرية', 'Nigerian hot pepper sauce', 'Sauce pimentée nigériane', 'Salsa de chile picante nigeriana', 'Nigerianische Scharfe Chilisauce', 'condiments', 'snacks', 'pan_nigerian', 60),
  R('ياجي خلطة بهارات نيجيري', 'Yaji spice blend Nigerian', 'Mélange d épices yaji nigérian', 'Mezcla de especias yaji nigeriana', 'Yaji-Gewürzmischung nigerianisch', 'condiments', 'snacks', 'hausa', 380),
  R('خلطة سويا نيجيرية', 'Nigerian suya spice mix', 'Mélange d épices suya nigérian', 'Mezcla de especias suya nigeriana', 'Nigerianische Suya-Gewürzmischung', 'condiments', 'snacks', 'pan_nigerian', 400),
  R('مسحوق كاري نيجيري', 'Nigerian curry powder', 'Poudre de curry nigériane', 'Polvo de curry nigeriano', 'Nigerianisches Currypulver', 'condiments', 'snacks', 'pan_nigerian', 340),
  R('قاعدة طماطم نيجيرية', 'Nigerian tomato base', 'Base tomate nigériane', 'Base de tomate nigeriana', 'Nigerianische Tomatenbasis', 'condiments', 'snacks', 'pan_nigerian', 95),
  R('كرافيش مطحون نيجيري', 'Ground crayfish Nigerian', 'Écrevisses moulues nigérianes', 'Cangrejos molidos nigerianos', 'Gemahlene Krebse nigerianisch', 'condiments', 'snacks', 'pan_nigerian', 300),
);
// --- desserts_sweets (10) ----------------------------------------------------
dishes.push(
  R('تشين تشين سكري نيجيري', 'Sweet chin chin Nigerian', 'Chin chin sucré nigérian', 'Chin chin dulce nigeriano', 'Süßes Chin-Chin nigerianisch', 'desserts_sweets', 'snacks', 'pan_nigerian', 320),
  R('باف باف بالسكر نيجيري', 'Puff puff with sugar Nigerian', 'Puff puff sucré nigérian', 'Puff puff con azúcar nigeriano', 'Puff-Puff mit Zucker nigerianisch', 'desserts_sweets', 'snacks', 'pan_nigerian', 275),
  R('كعكة إسفنجية نيجيرية', 'Nigerian plain sponge cake', 'Génoise nigériane', 'Bizcocho sencillo nigeriano', 'Nigerianischer Biskuitkuchen', 'desserts_sweets', 'snacks', 'pan_nigerian', 330),
  R('خبز موز نيجيري', 'Nigerian banana bread', 'Pain à la banane nigérian', 'Pan de plátano nigeriano', 'Nigerianisches Bananenbrot', 'desserts_sweets', 'snacks', 'pan_nigerian', 300),
  R('حلوى جوز هند نيجيرية', 'Nigerian coconut candy', 'Bonbon à la noix de coco nigérian', 'Caramelo de coco nigeriano', 'Nigerianische Kokosbonbon', 'desserts_sweets', 'snacks', 'pan_nigerian', 380),
  R('حلوى فول سوداني نيجيرية', 'Nigerian groundnut candy', 'Bonbon à l arachide nigérian', 'Caramelo de maní nigeriano', 'Nigerianische Erdnussbonbon', 'desserts_sweets', 'snacks', 'hausa', 400),
  R('بودينغ أرز نيجيري', 'Nigerian rice pudding', 'Riz au lait nigérian', 'Arroz con leche nigeriano', 'Nigerianischer Reisbrei Nachspeise', 'desserts_sweets', 'snacks', 'pan_nigerian', 140),
  R('كاسترد حلو نيجيري', 'Sweet custard pudding Nigerian', 'Crème dessert sucrée nigériane', 'Flan dulce nigeriano', 'Süßer Pudding nigerianisch', 'desserts_sweets', 'snacks', 'pan_nigerian', 130),
  R('بودينغ حب العزيز نيجيري', 'Tiger nut pudding Nigerian', 'Pudding de souchets nigérian', 'Pudín de chufas nigeriano', 'Erdmandel-Pudding nigerianisch', 'desserts_sweets', 'snacks', 'pan_nigerian', 150),
  R('دونات نيجيري', 'Nigerian doughnut', 'Beignet nigérian', 'Dona nigeriana', 'Nigerianischer Donut', 'desserts_sweets', 'snacks', 'pan_nigerian', 340),
);
// --- beverages (24) ----------------------------------------------------------
dishes.push(
  R('زوبو مشروب كركديه نيجيري', 'Zobo hibiscus drink Nigerian', 'Boisson à l hibiscus zobo nigériane', 'Bebida de hibisco zobo nigeriana', 'Zobo-Hibiskusgetränk nigerianisch', 'beverages', 'snacks', 'african_shared', 70),
  R('حليب حب العزيز نيجيري', 'Tiger nut milk Nigerian', 'Lait de souchets nigérian', 'Leche de chufas nigeriana', 'Erdmandelmilch nigerianisch', 'beverages', 'snacks', 'hausa', 120),
  R('نبيذ نخيل نيجيري', 'Nigerian palm wine', 'Vin de palme nigérian', 'Vino de palma nigeriano', 'Nigerianischer Palmwein', 'beverages', 'snacks', 'pan_nigerian', 90),
  R('نونو حليب مخمر نيجيري', 'Nunu fermented milk Nigerian', 'Lait fermenté nunu nigérian', 'Leche fermentada nunu nigeriana', 'Nunu-Fermentierte Milch nigerianisch', 'beverages', 'snacks', 'hausa', 100),
  R('حليب صويا نيجيري', 'Soy milk Nigerian', 'Lait de soja nigérian', 'Leche de soja nigeriana', 'Sojamilch nigerianisch', 'beverages', 'snacks', 'pan_nigerian', 110),
  R('تشابمان كوكتيل نيجيري', 'Nigerian Chapman cocktail', 'Cocktail Chapman nigérian', 'Cóctel Chapman nigeriano', 'Nigerianischer Chapman-Cocktail', 'beverages', 'snacks', 'pan_nigerian', 95),
  R('بيرة زنجبيل نيجيرية', 'Nigerian ginger beer', 'Bière de gingembre nigériane', 'Cerveza de jengibre nigeriana', 'Nigerianisches Ingwerbier', 'beverages', 'snacks', 'pan_nigerian', 55),
  R('كونون غيادا حليب فول سوداني نيجيري', 'Kunun gyada groundnut milk Nigerian', 'Lait d arachide kunun gyada nigérian', 'Leche de maní kunun gyada nigeriana', 'Kunun-Gyada-Erdnussmilch nigerianisch', 'beverages', 'snacks', 'hausa', 130),
  R('فورا دي نونو مشروب نيجيري', 'Fura de nunu Nigerian', 'Fura de nunu nigérian', 'Fura de nunu nigeriano', 'Fura-de-Nunu-Getränk nigerianisch', 'beverages', 'snacks', 'hausa', 140),
  R('عصير أناناس نيجيري', 'Nigerian pineapple juice', 'Jus d ananas nigérian', 'Jugo de piña nigeriano', 'Nigerianischer Ananassaft', 'beverages', 'snacks', 'pan_nigerian', 60),
  R('بيساب مشروب كركديه مثلج نيجيري', 'Bissap iced hibiscus Nigerian', 'Bissap à l hibiscus glacé nigérian', 'Bissap de hibisco helado nigeriano', 'Bissap-Eis-Hibiskusgetränk nigerianisch', 'beverages', 'snacks', 'african_shared', 65),
  R('ماء جوز هند نيجيري', 'Nigerian coconut water', 'Eau de coco nigériane', 'Agua de coco nigeriana', 'Nigerianisches Kokoswasser', 'beverages', 'snacks', 'pan_nigerian', 20),
  R('حليب جوز هند طازج نيجيري', 'Fresh coconut milk Nigerian', 'Lait de coco frais nigérian', 'Leche de coco fresca nigeriana', 'Frische Kokosmilch nigerianisch', 'beverages', 'snacks', 'pan_nigerian', 130),
  R('عصير مانجو نيجيري', 'Nigerian mango juice', 'Jus de mangue nigérian', 'Jugo de mango nigeriano', 'Nigerianischer Mangosaft', 'beverages', 'snacks', 'pan_nigerian', 65),
  R('عصير بابايا نيجيري', 'Nigerian pawpaw juice', 'Jus de papaye nigérian', 'Jugo de papaya nigeriano', 'Nigerianischer Papayasaft', 'beverages', 'snacks', 'pan_nigerian', 55),
  R('عصير أغبالومو نيجيري', 'Nigerian agbalumo juice', 'Jus d agbalumo nigérian', 'Jugo de agbalumo nigeriano', 'Nigerianischer Agbalumo-Saft', 'beverages', 'snacks', 'pan_nigerian', 65),
  R('تشابمان بدون كحول نيجيري', 'Non-alcoholic Chapman Nigerian', 'Chapman sans alcool nigérian', 'Chapman sin alcohol nigeriano', 'Alkoholfreier Chapman nigerianisch', 'beverages', 'snacks', 'pan_nigerian', 90),
  R('عصير يوسفي نيجيري', 'Nigerian tangerine juice', 'Jus de mandarine nigérian', 'Jugo de mandarina nigeriano', 'Nigerianischer Mandarinenaffe', 'beverages', 'snacks', 'pan_nigerian', 55),
  R('شاي حليب محلى نيجيري', 'Sweetened milk tea Nigerian', 'Thé au lait sucré nigérian', 'Té con leche endulzado nigeriano', 'Gesüßter Milchtee nigerianisch', 'beverages', 'snacks', 'pan_nigerian', 60),
  R('ميلو مشروب نيجيري', 'Nigerian Milo drink', 'Boisson Milo nigériane', 'Bebida Milo nigeriana', 'Nigerianisches Milo-Getränk', 'beverages', 'snacks', 'pan_nigerian', 85),
  R('بورنفيتا مشروب نيجيري', 'Nigerian Bournvita drink', 'Boisson Bournvita nigériane', 'Bebida Bournvita nigeriana', 'Nigerianisches Bournvita-Getränk', 'beverages', 'snacks', 'pan_nigerian', 80),
  R('شوكولاتة ساخنة نيجيرية', 'Nigerian hot chocolate', 'Chocolat chaud nigérian', 'Chocolate caliente nigeriano', 'Nigerianische heiße Schokolade', 'beverages', 'snacks', 'pan_nigerian', 95),
  R('كونون أيا بجوز هند نيجيري', 'Kunun aya with coconut Nigerian', 'Kunun aya à la noix de coco nigérian', 'Kunun aya con coco nigeriano', 'Kunun-Aya mit Kokos nigerianisch', 'beverages', 'snacks', 'hausa', 130),
  R('زوبو بأناناس نيجيري', 'Zobo with pineapple Nigerian', 'Zobo à l ananas nigérian', 'Zobo con piña nigeriano', 'Zobo mit Ananas nigerianisch', 'beverages', 'snacks', 'african_shared', 75),
);

// ============================================================ MACROS
const MACRO_TPL = {
  breakfast_items: [7, 28, 7],
  breads_flatbreads: [8, 38, 5],
  rice_biryani: [6, 30, 4],
  dals_legumes: [7, 16, 3],
  vegetarian_mains: [5, 12, 6],
  poultry_mains: [24, 6, 8],
  meat_mains: [23, 3, 12],
  seafood_mains: [20, 5, 6],
  soups_salads: [4, 10, 2],
  street_snacks: [6, 22, 8],
  condiments: [3, 8, 5],
  desserts_sweets: [6, 30, 12],
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

console.log('TOTAL dishes:', dishes.length);
console.log('By region:', JSON.stringify(byRegion, null, 0));
console.log('By category:', JSON.stringify(byCategory, null, 0));
console.log('By meal:', JSON.stringify(byMeal, null, 0));
if (dups.length) console.error('DUPLICATE names:', dups.join(' | '));

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}
if (dups.length) process.exit(1);

fs.writeFileSync(
  path.join(__dirname, 'nigeria-200-proposal.json'),
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
console.log('\nWrote scripts/nigeria-200-proposal.json');