// Authoring script for the Filipino 200-dish proposal (scripts/filipino-200-proposal.json).
// 200 NEW dishes (the 100 base rows live in src/data/filipino-full.ts). Mirrors the
// Botswana/Gabon authoring pattern: R() helper + per-category macro templates.
// Regions: pan_filipino by default (golden rule), regional anchors (manila, cebu, davao,
// iloilo, bacolod, zamboanga, baguio, cagayan_de_oro, bicol), asian_shared for the plain
// staple that the rest of Asia shares. Every Arabic name carries the token فلبيني أصيل.
// Strict halal: no pork, no alcohol (tuba / lambanog excluded - the two classic Filipino
// alcohols). Pork-leaning national dishes are halal-adapted (chicken adobo, chicken lechon,
// chicken tocino, chicken longganisa, beef tapa, beef menudo, beef dinuguan, beef sisig).
// Anchors: adobo, sinigang, pancit, lechon, kare-kare, pinakbet, ginataan, tinola,
// lumpia, halo-halo, bangus, tilapia, ginisang monggo, paksiw, escabeche, bibingka,
// puto, suman, saba banana, buko, leche flan, taho, kalamansi.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'فلبيني أصيل';

// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`أرز كالدو بالزنجبيل ${T}`, 'Arroz caldo with ginger', 'Riz au lait au gingembre', 'Arroz caldo con jengibre', 'Reisbrei mit Ingwer', 'breakfast_items', 'breakfast', 'manila', 8, 28, 2),
  R(`تشامبورادو بالبيض ${T}`, 'Champorado with eggs', 'Champorado aux oeufs', 'Champorado con huevos', 'Champorado mit Eiern', 'breakfast_items', 'breakfast', 'manila', 7, 38, 4),
  R(`لوغاو بالدجاج ${T}`, 'Lugaw with chicken', 'Lugaw au poulet', 'Lugaw con pollo', 'Lugaw mit Huhn', 'breakfast_items', 'breakfast', 'manila', 9, 21, 3),
  R(`سينانغاغ بالبيض ${T}`, 'Sinangag with egg', 'Sinangag aux oeufs', 'Sinangag con huevo', 'Sinangag mit Ei', 'breakfast_items', 'breakfast', 'manila', 8, 31, 9),
  R(`أرز بالثوم مع البيض ${T}`, 'Garlic rice with egg', 'Riz à l ail et aux oeufs', 'Arroz con ajo y huevo', 'Knoblauchreis mit Ei', 'breakfast_items', 'breakfast', 'pan_filipino', 7, 32, 6),
  R(`ساجول ${T}`, 'Sagul rice and coconut', 'Sagul riz et noix de coco', 'Sagul de arroz y coco', 'Sagul Reis mit Kokos', 'breakfast_items', 'breakfast', 'iloilo', 5, 34, 7),
  R(`إسكامبو ${T}`, 'Escambo fish soup breakfast', 'Escambo soupe de poisson', 'Escambo sopa de pescado', 'Escambo Fischsuppe', 'breakfast_items', 'breakfast', 'iloilo', 11, 12, 5),
  R(`أرز جوز الهند للفطور ${T}`, 'Coconut rice porridge', 'Riz au lait de coco', 'Arroz con leche de coco', 'Reispudding mit Kokos', 'breakfast_items', 'breakfast', 'pan_filipino', 5, 30, 8),
  R(`بوتو بالجبن ${T}`, 'Puto with cheese', 'Puto au fromage', 'Puto con queso', 'Puto mit Käse', 'breakfast_items', 'breakfast', 'pan_filipino', 8, 36, 5),
  R(`سومان باللاتيك ${T}`, 'Suman with latik', 'Suman au latik', 'Suman con latik', 'Suman mit Latik', 'breakfast_items', 'breakfast', 'pan_filipino', 7, 40, 9),
  R(`بيض مقلي مع الخبز ${T}`, 'Fried eggs with bread', 'Oeufs frits avec pain', 'Huevos fritos con pan', 'Spiegeleier mit Brot', 'breakfast_items', 'breakfast', 'pan_filipino', 12, 20, 11),
  R(`خبز إسفنجي بالقهوة ${T}`, 'Sponge bread with coffee', 'Pain éponge avec café', 'Pan esponjoso con café', 'Schwammbrot mit Kaffee', 'breakfast_items', 'breakfast', 'manila', 6, 34, 6),
  R(`كروسون بالبيض ${T}`, 'Krosson with egg', 'Krosson aux oeufs', 'Krosson con huevo', 'Krosson mit Ei', 'breakfast_items', 'breakfast', 'manila', 9, 30, 12),
  R(`طالادا ${T}`, 'Talada rice flour snack', 'Talada snack de farine de riz', 'Talada tentempié de harina de arroz', 'Talada Reismehl-Snack', 'breakfast_items', 'breakfast', 'bicol', 5, 38, 6),
);
// --- rice_dishes (18) --------------------------------------------------------
dishes.push(
  R(`أرز أدوبو الدجاج ${T}`, 'Chicken adobo rice', 'Riz adobo poulet', 'Arroz adobo de pollo', 'Reis mit Huhn-Adobo', 'rice_dishes', 'lunch', 'manila', 15, 30, 6),
  R(`أرز أدوبو البقر ${T}`, 'Beef adobo rice', 'Riz adobo boeuf', 'Arroz adobo de ternera', 'Reis mit Rindfleisch-Adobo', 'rice_dishes', 'lunch', 'manila', 17, 30, 8),
  R(`أرز سينغانغ السمك ${T}`, 'Fish sinigang rice', 'Riz sinigang poisson', 'Arroz sinigang de pescado', 'Reis mit Fisch-Sinigang', 'rice_dishes', 'lunch', 'pan_filipino', 13, 30, 4),
  R(`أرز تينولا ${T}`, 'Tinola rice', 'Riz tinola', 'Arroz tinola', 'Reis mit Tinola', 'rice_dishes', 'lunch', 'pan_filipino', 12, 30, 5),
  R(`أرز بيكول إكسبريس ${T}`, 'Bicol express rice', 'Riz bicol express', 'Arroz bicol express', 'Reis mit Bicol express', 'rice_dishes', 'lunch', 'pan_filipino', 14, 27, 8),
  R(`أرز كاري كاري ${T}`, 'Kare-kare rice', 'Riz kare-kare', 'Arroz kare-kare', 'Reis mit Kare-kare', 'rice_dishes', 'lunch', 'pan_filipino', 14, 26, 9),
  R(`أرز لاينغ ${T}`, 'Laing rice', 'Riz laing', 'Arroz laing', 'Reis mit Laing', 'rice_dishes', 'lunch', 'pan_filipino', 9, 27, 8),
  R(`أرز بيناكبيت ${T}`, 'Pinakbet rice', 'Riz pinakbet', 'Arroz pinakbet', 'Reis mit Pinakbet', 'rice_dishes', 'lunch', 'pan_filipino', 10, 30, 6),
  R(`أرز جاڤا مع البقر ${T}`, 'Java rice with beef', 'Riz Java au boeuf', 'Arroz Java con ternera', 'Java-Reis mit Rindfleisch', 'rice_dishes', 'lunch', 'manila', 13, 32, 8),
  R(`أرز مقلي بالخضار ${T}`, 'Fried rice with vegetables', 'Riz frit aux légumes', 'Arroz frito con verduras', 'Gebratener Reis mit Gemüse', 'rice_dishes', 'lunch', 'pan_filipino', 7, 32, 8),
  R(`أرز بني ${T}`, 'Brown rice', 'Riz brun', 'Arroz integral', 'Brauner Reis', 'rice_dishes', 'lunch', 'asian_shared', 3, 26, 1),
  R(`أرز جوز الهند المطبوخ ${T}`, 'Steamed coconut rice', 'Riz cuit au lait de coco', 'Arroz al vapor con coco', 'Reis mit Kokosmilch', 'rice_dishes', 'lunch', 'pan_filipino', 5, 33, 8),
  R(`باييلا فلبينية ${T}`, 'Filipino paella', 'Paella philippine', 'Paella filipina', 'Philippinische Paella', 'rice_dishes', 'lunch', 'manila', 12, 34, 8),
  R(`بيراني فلبيني ${T}`, 'Manila biryani', 'Biryani de Manille', 'Biryani de Manila', 'Manila-Biryani', 'rice_dishes', 'lunch', 'manila', 13, 35, 9),
  R(`أرز بالروبيان ${T}`, 'Shrimp rice', 'Riz aux crevettes', 'Arroz con camarones', 'Reis mit Garnelen', 'rice_dishes', 'lunch', 'manila', 14, 31, 6),
  R(`أرز مع البيض والأنشوف ${T}`, 'Rice with egg and anchovy', 'Riz aux oeufs et anchois', 'Arroz con huevo y anchoa', 'Reis mit Ei und Sardinen', 'rice_dishes', 'lunch', 'pan_filipino', 9, 31, 6),
  R(`أرز ببيض الملح ${T}`, 'Salted egg rice', 'Riz aux oeufs salés', 'Arroz con huevos salados', 'Reis mit Salz und Ei', 'rice_dishes', 'lunch', 'pan_filipino', 9, 30, 8),
  R(`أرز مقلي بالسمك ${T}`, 'Fried rice with fish', 'Riz frit au poisson', 'Arroz frito con pescado', 'Gebratener Reis mit Fisch', 'rice_dishes', 'lunch', 'pan_filipino', 12, 30, 7),
);
// --- noodle_dishes (20) ------------------------------------------------------
dishes.push(
  R(`بانتسيت كانتون بالخضار ${T}`, 'Pancit canton with vegetables', 'Pancit canton aux légumes', 'Pancit canton con verduras', 'Pancit Canton mit Gemüse', 'noodle_dishes', 'lunch', 'pan_filipino', 8, 28, 7),
  R(`بانتسيت بيهون بالصلصة البيضاء ${T}`, 'Pancit bihon white sauce', 'Pancit bihon sauce blanche', 'Pancit bihon salsa blanca', 'Pancit Bihon weiße Soße', 'noodle_dishes', 'lunch', 'manila', 7, 30, 5),
  R(`بانتسيت بالابوك المقلقل ${T}`, 'Pancit palabok twice cooked', 'Pancit palabok mijoté', 'Pancit palabok rehogado', 'Pancit Palabok geschmort', 'noodle_dishes', 'lunch', 'pan_filipino', 10, 26, 9),
  R(`بانتسيت مالابون بالقشر ${T}`, 'Pancit malabon with choco', 'Pancit malabon au choco', 'Pancit malabon con chocolate', 'Pancit Malabon mit Schoko', 'noodle_dishes', 'lunch', 'pan_filipino', 11, 26, 10),
  R(`بانتسيت بالروبيان ${T}`, 'Pancit with shrimp', 'Pancit aux crevettes', 'Pancit con camarones', 'Pancit mit Garnelen', 'noodle_dishes', 'lunch', 'pan_filipino', 13, 25, 7),
  R(`بانتسيت بالجمبري ${T}`, 'Pancit with jumbo prawns', 'Pancit aux grosses crevettes', 'Pancit con gambas', 'Pancit mit Riesengarnelen', 'noodle_dishes', 'lunch', 'manila', 14, 25, 7),
  R(`بانتسيت مولو ${T}`, 'Pancit molo', 'Pancit molo', 'Pancit molo', 'Pancit Molo', 'noodle_dishes', 'lunch', 'pan_filipino', 10, 28, 6),
  R(`بانتسيت وانتون ${T}`, 'Pancit wonton', 'Pancit wonton', 'Pancit wonton', 'Pancit Wonton', 'noodle_dishes', 'lunch', 'manila', 10, 27, 8),
  R(`بانتسيت باتو ${T}`, 'Pancit bato', 'Pancit bato', 'Pancit bato', 'Pancit Bato', 'noodle_dishes', 'lunch', 'pan_filipino', 7, 28, 6),
  R(`سوتانغون بالبهارات ${T}`, 'Sotanghon with spices', 'Sotanghon aux épices', 'Sotanghon con especias', 'Sotanghon mit Gewürzen', 'noodle_dishes', 'lunch', 'pan_filipino', 6, 29, 5),
  R(`ميسوا الخسيمة ${T}`, 'Misua fine noodles', 'Misua vermicelles fines', 'Misua fideos finos', 'Misua feine Nudeln', 'noodle_dishes', 'lunch', 'pan_filipino', 6, 30, 3),
  R(`ميكي بيض ${T}`, 'Miki egg noodles', 'Miki nouilles aux oeufs', 'Miki fideos con huevo', 'Miki Eiernudeln', 'noodle_dishes', 'lunch', 'pan_filipino', 9, 27, 5),
  R(`لومي بالخضار والبيض ${T}`, 'Lomi with vegetables and egg', 'Lomi aux légumes et oeufs', 'Lomi con verduras y huevo', 'Lomi mit Gemüse und Ei', 'noodle_dishes', 'lunch', 'pan_filipino', 8, 26, 5),
  R(`مامي الخسيمة ${T}`, 'Mami fine noodles', 'Mami vermicelles', 'Mami fideos finos', 'Mami feine Nudeln', 'noodle_dishes', 'lunch', 'manila', 8, 24, 4),
  R(`باتشوي الخسيمة ${T}`, 'Batchoy noodles', 'Batchoy nouilles', 'Batchoy fideos', 'Batchoy Nudeln', 'noodle_dishes', 'lunch', 'pan_filipino', 10, 22, 5),
  R(`بانتسيت كاربونارا ${T}`, 'Pancit carbonara', 'Pancit carbonara', 'Pancit carbonara', 'Pancit Carbonara', 'noodle_dishes', 'lunch', 'manila', 11, 28, 10),
  R(`معكرونة فلبينية ${T}`, 'Filipino spaghetti', 'Spaghetti philippin', 'Espagueti filipino', 'Philippinische Spaghetti', 'noodle_dishes', 'lunch', 'manila', 9, 31, 7),
  R(`بالابوك ${T}`, 'Palabok noodles', 'Palabok nouilles', 'Palabok fideos', 'Palabok Nudeln', 'noodle_dishes', 'lunch', 'pan_filipino', 8, 30, 6),
  R(`سوتانغون مولو بالصبيان ${T}`, 'Sotanghon molo with squid', 'Sotanghon molo au calmar', 'Sotanghon molo con calamar', 'Sotanghon Molo mit Kalamar', 'noodle_dishes', 'lunch', 'zamboanga', 11, 26, 6),
  R(`بيهون جيسادو ${T}`, 'Guisado bihon', 'Bihon guisado', 'Bihon guisado', 'Guisado Bihon', 'noodle_dishes', 'lunch', 'pan_filipino', 8, 29, 6),
);
// --- soups_stews (18) --------------------------------------------------------
dishes.push(
  R(`تينولا بالدجاج ${T}`, 'Chicken tinola', 'Tinola de poulet', 'Tinola de pollo', 'Huhn-Tinola', 'soups_stews', 'lunch', 'manila', 14, 8, 6),
  R(`سينغانغ بالسمك ${T}`, 'Sinigang na isda', 'Sinigang de poisson', 'Sinigang de pescado', 'Sinigang na Isda', 'soups_stews', 'lunch', 'pan_filipino', 15, 6, 4),
  R(`سينغانغ بالروبيان ${T}`, 'Sinigang with prawns', 'Sinigang de crevettes', 'Sinigang de camarones', 'Sinigang mit Garnelen', 'soups_stews', 'lunch', 'pan_filipino', 15, 6, 4),
  R(`سينغانغ بالهيبون ${T}`, 'Sinigang with small prawns', 'Sinigang de petites crevettes', 'Sinigang con camarones pequeños', 'Sinigang mit Kleingarnelen', 'soups_stews', 'lunch', 'pan_filipino', 14, 6, 4),
  R(`سينغانغ بالخضار ${T}`, 'Sinigang with vegetables', 'Sinigang de légumes', 'Sinigang de verduras', 'Sinigang mit Gemüse', 'soups_stews', 'lunch', 'pan_filipino', 6, 9, 4),
  R(`شوربة الميسوا بالخضار ${T}`, 'Misua soup with vegetables', 'Soupe de misua aux légumes', 'Sopa de misua con verduras', 'Misua-Suppe mit Gemüse', 'soups_stews', 'lunch', 'pan_filipino', 7, 15, 3),
  R(`شوربة السوتانغون بالدجاج ${T}`, 'Sotanghon chicken soup', 'Soupe de sotanghon au poulet', 'Sopa de sotanghon con pollo', 'Sotanghon-Huhn-Suppe', 'soups_stews', 'lunch', 'pan_filipino', 11, 15, 4),
  R(`ستيو الدجاج بالبهارات ${T}`, 'Chicken stew with spices', 'Ragoût de poulet aux épices', 'Estofado de pollo con especias', 'Huhn-Eintopf mit Gewürzen', 'soups_stews', 'lunch', 'manila', 18, 8, 7),
  R(`باتشوي بالدجاج ${T}`, 'Chicken batchoy soup', 'Soupe batchoy au poulet', 'Sopa batchoy de pollo', 'Huhn-Batchoy-Suppe', 'soups_stews', 'lunch', 'pan_filipino', 11, 20, 5),
  R(`مامي بالدجاج ${T}`, 'Chicken mami soup', 'Soupe mami au poulet', 'Sopa mami de pollo', 'Huhn-Mami-Suppe', 'soups_stews', 'lunch', 'pan_filipino', 9, 21, 4),
  R(`ستيو بقر ${T}`, 'Beef pares stew', 'Ragoût de bœuf pares', 'Estofado de ternera pares', 'Rind-Pares-Eintopf', 'soups_stews', 'lunch', 'manila', 20, 8, 9),
  R(`شوربة الدجاج الكريمية ${T}`, 'Creamy chicken soup', 'Soupe de poulet à la crème', 'Sopa de pollo cremosa', 'Cremige Hühnersuppe', 'soups_stews', 'lunch', 'manila', 9, 9, 12),
  R(`شوربة السايوتي ${T}`, 'Sayote soup', 'Soupe de sayote', 'Sopa de sayote', 'Sayote-Suppe', 'soups_stews', 'lunch', 'pan_filipino', 3, 10, 4),
  R(`كاري كاري بصلصة الفول السوداني ${T}`, 'Kare-kare with peanut sauce', 'Kare-kare à la sauce cacahuète', 'Kare-kare con salsa de cacahuete', 'Kare-kare mit Erdnusssauce', 'soups_stews', 'lunch', 'pan_filipino', 15, 12, 11),
  R(`شوربة الكاموتو بالهالبينا ${T}`, 'Sweet potato halipena soup', 'Soupe de patate douce halipena', 'Sopa de boniato halipena', 'Süßkartoffel-Halipena-Suppe', 'soups_stews', 'lunch', 'pan_filipino', 2, 18, 4),
  R(`شوربة الروبيان الكريمية ${T}`, 'Creamy shrimp soup', 'Soupe de crevettes à la crème', 'Sopa de camarones cremosa', 'Cremige Garnelensuppe', 'soups_stews', 'lunch', 'manila', 11, 8, 10),
  R(`حساء الفول بالتمر ${T}`, 'Mung bean date soup', 'Soupe de haricots mungo et dattes', 'Sopa de mungo y dátil', 'Mungbohnen-Dattelsuppe', 'soups_stews', 'lunch', 'pan_filipino', 8, 19, 4),
  R(`شوربة عظم البقر ${T}`, 'Beef bone soup', 'Soupe d os de boeuf', 'Sopa de huesos de ternera', 'Rindfleischknochen-Suppe', 'soups_stews', 'lunch', 'pan_filipino', 19, 4, 9),
);
// --- poultry_mains (16) ------------------------------------------------------
dishes.push(
  R(`أدوبو دجاج بالثوم والبهارات ${T}`, 'Traditional chicken adobo', 'Adobo de poulet traditionnel', 'Adobo de pollo tradicional', 'Traditionelles Huhn-Adobo', 'poultry_mains', 'lunch', 'pan_filipino', 23, 4, 11),
  R(`مشوي دجاج بالثوم والليمون ${T}`, 'Grilled chicken garlic lemon', 'Poulet grillé ail citron', 'Pollo a la parrilla ajo limón', 'Gegrilltes Huhn Knoblauch Zitrone', 'poultry_mains', 'lunch', 'pan_filipino', 25, 2, 12),
  R(`توكينو دجاج حلو ${T}`, 'Sweet chicken tocino', 'Tocino de poulet sucré', 'Tocino de pollo dulce', 'Süßes Huhn-Tocino', 'poultry_mains', 'lunch', 'pan_filipino', 21, 10, 10),
  R(`لونجانيسا دجاج حارة ${T}`, 'Spicy chicken longganisa', 'Longganisa de poulet épicé', 'Longganisa de pollo picante', 'Scharfe Huhn-Longganisa', 'poultry_mains', 'lunch', 'pan_filipino', 20, 6, 14),
  R(`ليتشون دجاج كامل ${T}`, 'Whole roast chicken lechon', 'Lechon de poulet entier rôti', 'Lechón de pollo entero asado', 'Ganzes Brathuhn-Lechon', 'poultry_mains', 'lunch', 'pan_filipino', 27, 2, 14),
  R(`سيخ دجاج بالبهارات ${T}`, 'Spiced chicken skewers', 'Brochettes de poulet épicées', 'Pinchos de pollo sazonados', 'Gewürzte Hähnchenspieße', 'poultry_mains', 'lunch', 'manila', 22, 2, 10),
  R(`دجاج أفرتادا ${T}`, 'Chicken afritada', 'Afritada de poulet', 'Afritada de pollo', 'Huhn-Afritada', 'poultry_mains', 'lunch', 'manila', 19, 12, 8),
  R(`دجاج بوتشرو ${T}`, 'Chicken pochero', 'Pochero de poulet', 'Pochero de pollo', 'Huhn-Pochero', 'poultry_mains', 'lunch', 'manila', 22, 20, 8),
  R(`دجاج كالدرينا ${T}`, 'Chicken caldereta', 'Caldereta de pollo', 'Caldereta de pollo', 'Huhn-Kaldereta', 'poultry_mains', 'lunch', 'pan_filipino', 20, 12, 10),
  R(`دجاج كوردون بلو ${T}`, 'Chicken cordon bleu', 'Poulet cordon bleu', 'Pollo cordon bleu', 'Huhn Cordon Bleu', 'poultry_mains', 'lunch', 'manila', 23, 12, 12),
  R(`دجاج مشوي بالثوم ${T}`, 'Grilled chicken with garlic', 'Poulet grillé à l ail', 'Pollo a la parrilla con ajo', 'Gegrilltes Huhn mit Knoblauch', 'poultry_mains', 'lunch', 'pan_filipino', 24, 2, 11),
  R(`دجاج مقلي ${T}`, 'Fried chicken', 'Poulet frit', 'Pollo frito', 'Frittiertes Hähnchen', 'poultry_mains', 'lunch', 'pan_filipino', 21, 9, 15),
  R(`دجاج بالساجا ${T}`, 'Chicken in coconut milk', 'Poulet au lait de coco', 'Pollo con leche de coco', 'Huhn in Kokosmilch', 'poultry_mains', 'lunch', 'pan_filipino', 20, 5, 13),
  R(`دجاج بالزنجبيل ${T}`, 'Chicken with ginger', 'Poulet au gingembre', 'Pollo con jengibre', 'Huhn mit Ingwer', 'poultry_mains', 'lunch', 'pan_filipino', 22, 4, 11),
  R(`دجاج بالصلصة الحلوة ${T}`, 'Chicken with sweet sauce', 'Poulet à la sauce sucrée', 'Pollo con salsa dulce', 'Huhn mit süßer Soße', 'poultry_mains', 'lunch', 'pan_filipino', 21, 11, 9),
  R(`دجاج مقرمش ${T}`, 'Crispy fried chicken', 'Poulet croustillant', 'Pollo crujiente', 'Knuspriges Hähnchen', 'poultry_mains', 'lunch', 'manila', 20, 12, 14),
);
// --- meat_mains (20) ---------------------------------------------------------
dishes.push(
  R(`تابا البقر ${T}`, 'Beef tapa', 'Boeuf tapa', 'Tapa de ternera', 'Rindfleisch-Tapa', 'meat_mains', 'lunch', 'manila', 26, 3, 8),
  R(`كلاي بين الجوز ${T}`, 'Beef kilayin with coconut', 'Kilayin de boeuf à la noix de coco', 'Kilayin de ternera con coco', 'Rindfleisch-Kilayin mit Kokos', 'meat_mains', 'lunch', 'pan_filipino', 22, 3, 14),
  R(`بقر كالدرينا ${T}`, 'Beef caldereta', 'Caldereta de bœuf', 'Caldereta de ternera', 'Rindfleisch-Kaldereta', 'meat_mains', 'lunch', 'pan_filipino', 22, 12, 9),
  R(`بقر بوتشرو ${T}`, 'Beef pochero', 'Pochero de bœuf', 'Pochero de ternera', 'Rindfleisch-Pochero', 'meat_mains', 'lunch', 'manila', 24, 20, 8),
  R(`سالبيكون البقر ${T}`, 'Beef salpicon', 'Salpicon de bœuf', 'Salpicón de ternera', 'Rindfleisch-Salpicon', 'meat_mains', 'lunch', 'manila', 21, 8, 11),
  R(`شريحة بقر مشوية ${T}`, 'Grilled beef steak', 'Steak de bœuf grillé', 'Filete de ternera a la parrilla', 'Gegrilltes Rindsteak', 'meat_mains', 'lunch', 'manila', 25, 1, 14),
  R(`ريندانج البقر ${T}`, 'Beef rendang', 'Rendang de bœuf', 'Rendang de ternera', 'Rind-Rendang', 'meat_mains', 'lunch', 'manila', 21, 6, 17),
  R(`إمبيدو البقر ${T}`, 'Beef embutido', 'Embutido de bœuf', 'Embutido de ternera', 'Rind-Embutido', 'meat_mains', 'lunch', 'pan_filipino', 20, 5, 15),
  R(`منودو البقر ${T}`, 'Beef menudo', 'Menudo de bœuf', 'Menudo de ternera', 'Rind-Menudo', 'meat_mains', 'lunch', 'pan_filipino', 20, 5, 14),
  R(`دينوغوان البقر ${T}`, 'Beef dinuguan', 'Dinuguan de bœuf', 'Dinuguan de ternera', 'Rind-Dinuguan', 'meat_mains', 'lunch', 'pan_filipino', 18, 4, 13),
  R(`كليسين البقر ${T}`, 'Beef kilayin', 'Kilayin de bœuf', 'Kilayin de ternera', 'Rind-Kilayin', 'meat_mains', 'lunch', 'pan_filipino', 20, 3, 12),
  R(`بقر أفرتادا ${T}`, 'Beef afritada', 'Afritada de bœuf', 'Afritada de ternera', 'Rind-Afritada', 'meat_mains', 'lunch', 'pan_filipino', 21, 13, 8),
  R(`بيكول إكسبريس البقر ${T}`, 'Beef bicol express', 'Bicol express de bœuf', 'Bicol express de ternera', 'Rind-Bicol express', 'meat_mains', 'lunch', 'pan_filipino', 21, 5, 12),
  R(`بيف مياشادو ${T}`, 'Beef mechado', 'Bœuf mechado', 'Ternera mechada', 'Rind-Mechado', 'meat_mains', 'lunch', 'manila', 24, 6, 11),
  R(`كاليولو بقر ${T}`, 'Beef kalolo', 'Kalolo de bœuf', 'Kalolo de ternera', 'Rind-Kalolo', 'meat_mains', 'lunch', 'pan_filipino', 20, 12, 13),
  R(`سيخ بقر مشوي ${T}`, 'Grilled beef skewers', 'Brochettes de bœuf grillées', 'Pinchos de ternera a la parrilla', 'Gegrillte Rindfleischspieße', 'meat_mains', 'lunch', 'manila', 24, 2, 12),
  R(`لحم بقر معلب ${T}`, 'Corned beef', 'Bœuf en conserve', 'Carne de ternera enlatada', 'Corned Beef', 'meat_mains', 'lunch', 'manila', 17, 2, 14),
  R(`سيسيج البقر ${T}`, 'Beef sisig', 'Sisig de bœuf', 'Sisig de ternera', 'Rind-Sisig', 'meat_mains', 'lunch', 'pan_filipino', 20, 4, 16),
  R(`بقر مقلي بالثوم ${T}`, 'Fried beef with garlic', 'Bœuf frit à l ail', 'Ternera frita con ajo', 'Gebratenes Rindfleisch mit Knoblauch', 'meat_mains', 'lunch', 'pan_filipino', 24, 3, 15),
  R(`بقر أدوبو الجاف ${T}`, 'Beef adobo dry', 'Adobo de bœuf sec', 'Adobo de ternera seco', 'Trockenes Rind-Adobo', 'meat_mains', 'lunch', 'pan_filipino', 26, 3, 13),
);
// --- fish_seafood (22) -------------------------------------------------------
dishes.push(
  R(`سمك المولير المجفف ${T}`, 'Dried mullers', 'Mullet séché', 'Muela seca', 'Getrocknete Meerbrasse', 'fish_seafood', 'lunch', 'zamboanga', 22, 1, 8),
  R(`داينغ البانغوس المجفف ${T}`, 'Daing na bangus dried', 'Daing na bangus séché', 'Daing na bangus seco', 'Getrockneter Daing na bangus', 'fish_seafood', 'lunch', 'pan_filipino', 23, 1, 10),
  R(`ريلينونج البانغوس المحشي ${T}`, 'Stuffed rellenong bangus', 'Rellenong bangus farci', 'Rellenong bangus relleno', 'Gefüllter Rellenong Bangus', 'fish_seafood', 'lunch', 'iloilo', 22, 6, 9),
  R(`سينغانغ البانغوس ${T}`, 'Sinigang na bangus', 'Sinigang de bangus', 'Sinigang de bangus', 'Sinigang na Bangus', 'fish_seafood', 'lunch', 'pan_filipino', 19, 3, 7),
  R(`باكسيو الروبيان بالرحيق ${T}`, 'Paksiw prawn with ricipada', 'Paksiw de crevette au crabe', 'Paksiw de camarón con cangrejo', 'Praxen-Krabbe mit Krabbe', 'fish_seafood', 'lunch', 'pan_filipino', 18, 3, 8),
  R(`تيلابيا مشوية بالليمون ${T}`, 'Grilled tilapia with lemon', 'Tilapia grillé au citron', 'Tilapia a la parrilla con limón', 'Gegrillte Tilapia mit Zitrone', 'fish_seafood', 'lunch', 'pan_filipino', 22, 1, 7),
  R(`تيلابيا في الفرن بالثوم ${T}`, 'Baked tilapia with garlic', 'Tilapia au four à l ail', 'Tilapia al horno con ajo', 'Tilapia aus dem Ofen mit Knoblauch', 'fish_seafood', 'lunch', 'pan_filipino', 22, 2, 8),
  R(`باكسيو التيلابيا بالبهارات ${T}`, 'Paksiw tilapia with spices', 'Paksiw de tilapia aux épices', 'Paksiw de tilapia con especias', 'Paksiw Tilapia mit Gewürzen', 'fish_seafood', 'lunch', 'pan_filipino', 21, 3, 6),
  R(`تملاش بياتا الظهر ${T}`, 'Pata beef sinigang style', 'Pata de bœuf à la sinigang', 'Pata de ternera estilo sinigang', 'Rinderpata sinigang Art', 'meat_mains', 'lunch', 'manila', 23, 4, 12),
  R(`سمك حلو وحامض ${T}`, 'Sweet and sour fish', 'Poisson aigre-doux', 'Pescado agridulce', 'Süß-saures Fischgericht', 'fish_seafood', 'lunch', 'manila', 19, 14, 8),
  R(`روبيان أدوبو ${T}`, 'Shrimp adobo', 'Adobo de crevettes', 'Adobo de camarones', 'Garnelen-Adobo', 'fish_seafood', 'lunch', 'pan_filipino', 19, 4, 9),
  R(`روبيان مشوي بالثوم ${T}`, 'Grilled shrimp with garlic', 'Crevettes grillées à l ail', 'Camarones a la parrilla con ajo', 'Gegrillte Garnelen mit Knoblauch', 'fish_seafood', 'lunch', 'zamboanga', 20, 2, 9),
  R(`كاليمار أدوبو ${T}`, 'Squid adobo', 'Adobo de calmar', 'Adobo de calamar', 'Kalamar-Adobo', 'fish_seafood', 'lunch', 'pan_filipino', 18, 4, 8),
  R(`كاليمار مقلي ${T}`, 'Fried squid', 'Calmar frit', 'Calamar frito', 'Frittierter Kalamar', 'fish_seafood', 'lunch', 'pan_filipino', 17, 10, 12),
  R(`كاليمار مشوي ${T}`, 'Grilled squid', 'Calmar grillé', 'Calamar a la parrilla', 'Gegrillter Kalamar', 'fish_seafood', 'lunch', 'manila', 19, 2, 8),
  R(`سرطان بجلوز ${T}`, 'Crab in coconut milk', 'Crabe au lait de coco', 'Cangrejo con leche de coco', 'Krabben in Kokosmilch', 'fish_seafood', 'lunch', 'pan_filipino', 17, 5, 10),
  R(`تونة تابو ${T}`, 'Tuna tapa', 'Thon en conserve', 'Atún en conserva', 'Thunfisch-Tapa', 'fish_seafood', 'lunch', 'manila', 24, 1, 6),
  R(`ستريغاي بالثوم ${T}`, 'Streisegata with garlic', 'Streisegata à l ail', 'Streisegata con ajo', 'Streisegata mit Knoblauch', 'fish_seafood', 'lunch', 'davao', 24, 1, 10),
  R(`باكسيو الروبيان بالتمر ${T}`, 'Paksiw prawn with dates', 'Paksiw de crevette aux dattes', 'Paksiw de camarón con dátil', 'Praxen-Krabbe mit Datteln', 'fish_seafood', 'lunch', 'pan_filipino', 19, 8, 8),
  R(`سمك بالتمر الهندي ${T}`, 'Fish with tamarind', 'Poisson au tamarin', 'Pescado con tamarindo', 'Fisch mit Tamarinde', 'fish_seafood', 'lunch', 'pan_filipino', 17, 8, 6),
  R(`روبيان بالليمون الحار ${T}`, 'Prawns with calamansi', 'Crevettes au calamansi', 'Camarones con calamansi', 'Garnelen mit Calamansi', 'fish_seafood', 'lunch', 'zamboanga', 19, 4, 8),
  R(`سمك مقلي بالثوم ${T}`, 'Fried fish with garlic', 'Poisson frit à l ail', 'Pescado frito con ajo', 'Gebratener Fisch mit Knoblauch', 'fish_seafood', 'lunch', 'pan_filipino', 19, 10, 13),
);
// --- vegetable_mains (16) ----------------------------------------------------
dishes.push(
  R(`كواكو مقلي بالثوم ${T}`, 'Fried kangkong with garlic', 'Kangkong frit à l ail', 'Kangkong frito con ajo', 'Gebratener Kangkong mit Knoblauch', 'vegetable_mains', 'lunch', 'pan_filipino', 4, 12, 7),
  R(`بينانغات بالكاري ${T}`, 'Pinangat with curry', 'Pinangat au curry', 'Pinangat con curry', 'Pinangat mit Curry', 'vegetable_mains', 'lunch', 'pan_filipino', 5, 16, 12),
  R(`أملاياه بالبيض ${T}`, 'Ampalaya with egg', 'Ampalaya aux oeufs', 'Ampalaya con huevo', 'Ampalaya mit Ei', 'vegetable_mains', 'lunch', 'pan_filipino', 7, 12, 13),
  R(`جيناتانج السايوتي ${T}`, 'Ginataang sayote stew', 'Ginataang sayote ragoût', 'Ginataang sayote guiso', 'Ginataang Sayote Eintopf', 'vegetable_mains', 'lunch', 'pan_filipino', 2, 13, 9),
  R(`جيناتانج الكولاباسا ${T}`, 'Ginataang kulabasa stew', 'Ginataang kulabasa ragoût', 'Ginataang kulabaza guiso', 'Ginataang Kulabasa Eintopf', 'vegetable_mains', 'lunch', 'bicol', 3, 14, 9),
  R(`جيناتانج يام ${T}`, 'Ginataang yam stew', 'Ginataang igname ragoût', 'Ginataang ñame guiso', 'Ginataang Yam Eintopf', 'vegetable_mains', 'lunch', 'iloilo', 3, 20, 7),
  R(`تورتانج تالونج ${T}`, 'Tortang talong', 'Tortang talong', 'Tortang talong', 'Tortang Talong', 'vegetable_mains', 'lunch', 'pan_filipino', 6, 9, 16),
  R(`جيناتانج اللوبيا ${T}`, 'Ginataang lupoya stew', 'Ginataang haricots longs ragoût', 'Ginataang judía larga guiso', 'Ginataang Lupoya Eintopf', 'vegetable_mains', 'lunch', 'pan_filipino', 7, 20, 8),
  R(`أدوبو اللابوي ${T}`, 'Adobong labuy', 'Adobong fougère', 'Adobong helecho', 'Adobong Labuy', 'vegetable_mains', 'lunch', 'iloilo', 3, 8, 6),
  R(`أدوبو غاري ${T}`, 'Adobong gari ginger', 'Adobong gingembre', 'Adobong jengibre', 'Adobong Ingwer', 'vegetable_mains', 'lunch', 'manila', 3, 10, 6),
  R(`أدوبو تالونج ${T}`, 'Adobong talong', 'Adobong aubergine', 'Adobong berenjena', 'Adobong Talong', 'vegetable_mains', 'lunch', 'pan_filipino', 3, 10, 8),
  R(`جينيس أنغ اليوبو ${T}`, 'Ginisang upo stew', 'Ginisang upo ragoût', 'Ginisado de calabaza guiso', 'Ginisang Upo Eintopf', 'vegetable_mains', 'lunch', 'bicol', 2, 16, 5),
  R(`سايوتي مشوي ${T}`, 'Grilled sayote', 'Sayote grillé', 'Sayote asado', 'Gegrillte Sayote', 'vegetable_mains', 'lunch', 'pan_filipino', 2, 8, 5),
  R(`كاموتي مقلي ${T}`, 'Camote rebosado', 'Camote rebosado', 'Camote rebosado', 'Camote Rebosado', 'vegetable_mains', 'lunch', 'iloilo', 3, 30, 12),
  R(`كاموتي مسلوق ${T}`, 'Boiled sweet potato', 'Patate douce bouillie', 'Boniato hervido', 'Gekochte Süßkartoffel', 'vegetable_mains', 'lunch', 'pan_filipino', 2, 20, 0),
  R(`تينولا بالخضار ${T}`, 'Vegetable tinola', 'Tinola de légumes', 'Tinola de verduras', 'Gemüse-Tinola', 'vegetable_mains', 'lunch', 'davao', 6, 11, 5),
);
// --- banana_coconut (12) -----------------------------------------------------
dishes.push(
  R(`موزة سابا ${T}`, 'Saba banana', 'Banane saba', 'Plátano saba', 'Saba-Banane', 'banana_coconut', 'lunch', 'pan_filipino', 1, 23, 0),
  R(`سابا مسلوقة ${T}`, 'Boiled saba banana', 'Banane saba bouillie', 'Plátano saba hervido', 'Gekochte Saba-Banane', 'banana_coconut', 'lunch', 'pan_filipino', 1, 25, 0),
  R(`سابا كيو ${T}`, 'Saba banana cue', 'Banane saba cue', 'Plátano saba cue', 'Saba-Banane Cue', 'banana_coconut', 'snacks', 'pan_filipino', 1, 30, 7),
  R(`شرائح سابا محمصة ${T}`, 'Toasted saba banana chips', 'Chips de banane saba grillés', 'Chips de plátano saba tostados', 'Geröstete Saba-Banane-Chips', 'banana_coconut', 'snacks', 'pan_filipino', 2, 28, 12),
  R(`قلب الموز ${T}`, 'Banana heart', 'Coeur de bananier', 'Corazón de plátano', 'Bananenherz', 'banana_coconut', 'lunch', 'pan_filipino', 2, 10, 1),
  R(`حليب جوز الهند ${T}`, 'Coconut milk', 'Lait de coco', 'Leche de coco', 'Kokosmilch', 'banana_coconut', 'lunch', 'pan_filipino', 2, 6, 20),
  R(`سلطة بوكو ${T}`, 'Buko salad', 'Salade de buko', 'Ensalada de buko', 'Buko-Salat', 'banana_coconut', 'snacks', 'pan_filipino', 2, 12, 6),
  R(`سلطة بوكو بالروبيان ${T}`, 'Buko salad with shrimp', 'Salade de buko aux crevettes', 'Ensalada de buko con camarones', 'Buko-Salat mit Garnelen', 'banana_coconut', 'lunch', 'manila', 9, 14, 8),
  R(`ماء جوز الهند الطازج ${T}`, 'Fresh coconut water', 'Eau de coco fraîche', 'Agua de coco fresca', 'Frisches Kokoswasser', 'banana_coconut', 'snacks', 'pan_filipino', 1, 5, 1),
  R(`لاتيك ${T}`, 'Latik coconut curd', 'Latik caillé de coco', 'Latik cuajada de coco', 'Kokos-Käse Latik', 'banana_coconut', 'snacks', 'iloilo', 5, 8, 12),
  R(`مارويا ${T}`, 'Maruya fried sweet potato', 'Maruya patate douce frite', 'Maruya boniato frito', 'Maruya frittiertes Süßkartoffel', 'banana_coconut', 'snacks', 'pan_filipino', 2, 32, 12),
  R(`بيناتوغ ${T}`, 'Binatog mung beans', 'Binatog haricots mungo', 'Binatog mungo', 'Binatog Mungbohnen', 'banana_coconut', 'snacks', 'pan_filipino', 8, 20, 3),
);
// --- rice_cakes_sweets (12) --------------------------------------------------
dishes.push(
  R(`بيكو ${T}`, 'Biko sticky rice cake', 'Biko gâteau de riz gluant', 'Biko pastel de arroz glutinoso', 'Biko Reiskuchen', 'rice_cakes_sweets', 'snacks', 'pan_filipino', 5, 42, 9),
  R(`ماجا بلانكا ${T}`, 'Maja blanca', 'Maja blanca', 'Maja blanca', 'Maja Blanca', 'rice_cakes_sweets', 'snacks', 'pan_filipino', 3, 30, 9),
  R(`ليكي فلان ${T}`, 'Leche flan', 'Leche flan', 'Leche flan', 'Leche Flan', 'rice_cakes_sweets', 'snacks', 'manila', 5, 30, 11),
  R(`يما ${T}`, 'Yema custard', 'Yema crème pâtissière', 'Yema crema pastelera', 'Yema-Creme', 'rice_cakes_sweets', 'snacks', 'cebu', 5, 26, 12),
  R(`هالو هالو ${T}`, 'Halo-halo', 'Halo-halo', 'Halo-halo', 'Halo-Halo', 'rice_cakes_sweets', 'snacks', 'manila', 4, 38, 8),
  R(`ساغو غولامان ${T}`, 'Sago gulaman', 'Sago gulaman', 'Sago gulaman', 'Sago Gulaman', 'rice_cakes_sweets', 'snacks', 'pan_filipino', 1, 28, 0),
  R(`باستيلاس دي ليتي ${T}`, 'Pastillas de leche', 'Pastilles de lait', 'Pastillas de leche', 'Milchpastillen', 'rice_cakes_sweets', 'snacks', 'manila', 6, 46, 9),
  R(`جالا هالو ${T}`, 'Jala-halo shaved ice', 'Jala-halo glace pilée', 'Jala-halo hielo picado', 'Jala-Halo Shaved Ice', 'rice_cakes_sweets', 'snacks', 'davao', 3, 34, 7),
  R(`آيس كريم فوضوي ${T}`, 'Dirty ice cream', 'Glace Philippine', 'Helado cremoso', 'Philippinische Eiscreme', 'rice_cakes_sweets', 'snacks', 'manila', 3, 26, 9),
  R(`ميس كون هييلو ${T}`, 'Mais con hielo', 'Mais con hielo', 'Mais con hielo', 'Mais con Hielo', 'rice_cakes_sweets', 'snacks', 'manila', 2, 30, 5),
  R(`مانجو فلوت ${T}`, 'Mango float', 'Mango flotté', 'Mango flotante', 'Mango-Float', 'rice_cakes_sweets', 'snacks', 'pan_filipino', 3, 30, 8),
  R(`بوكو باي ${T}`, 'Buko pie', 'Tarte au buko', 'Tarta de buko', 'Buko-Tarte', 'rice_cakes_sweets', 'snacks', 'pan_filipino', 4, 36, 13),
);
// --- street_snacks (14) ------------------------------------------------------
dishes.push(
  R(`لومبيا بالروبيان ${T}`, 'Lumpia with shrimp', 'Lumpia aux crevettes', 'Lumpia con camarones', 'Lumpia mit Garnelen', 'street_snacks', 'snacks', 'manila', 9, 26, 13),
  R(`لومبيا بالخضار ${T}`, 'Vegetable lumpia', 'Lumpia aux légumes', 'Lumpia de verduras', 'Gemüse-Lumpia', 'street_snacks', 'snacks', 'pan_filipino', 4, 28, 12),
  R(`كويك كويك ${T}`, 'Kwek-kwek quail eggs', 'Kwek-kwek œufs de caille', 'Kwek-kwek huevos de codorniz', 'Kwek-Kwek Wachteleier', 'street_snacks', 'snacks', 'manila', 13, 12, 18),
  R(`إيتك إيتك ${T}`, 'Itik-itik rice cake', 'Gâteau de riz itik-itik', 'Pastel de arroz itik-itik', 'Itik-Itik Reiskuchen', 'street_snacks', 'snacks', 'iloilo', 3, 34, 4),
  R(`بوتو سكّو ${T}`, 'Puto seko', 'Puto seko', 'Puto seko', 'Puto Seko', 'street_snacks', 'snacks', 'iloilo', 4, 36, 3),
  R(`تشيكيتنغ ${T}`, 'Chikiting chickpea snack', 'Chikiting snack de pois chiches', 'Chikiting tentempié de garbanzo', 'Chikiting Kichererbsen-Snack', 'street_snacks', 'snacks', 'manila', 8, 30, 10),
  R(`كروسون بالبيض الطازج ${T}`, 'Fresh krosson with egg', 'Krosson frais aux oeufs', 'Krosson fresco con huevo', 'Frisches Krosson mit Ei', 'street_snacks', 'snacks', 'manila', 8, 28, 12),
  R(`بنانا كيو المقرمش ${T}`, 'Crispy banana cue', 'Banane cue croustillante', 'Plátano cue crujiente', 'Knusprige Banane-Cue', 'street_snacks', 'snacks', 'manila', 2, 42, 9),
  R(`بانيالام ${T}`, 'Panyalam palm sugar candy', 'Panyalam sucre de palme', 'Panyalam azúcar de palmera', 'Panyalam Palmzucker-Süßigkeit', 'street_snacks', 'snacks', 'pan_filipino', 0, 40, 0),
  R(`بولوت بوتي ${T}`, 'Pulut puti sticky rice', 'Pulut puti riz gluant', 'Pulut puti arroz glutinoso', 'Pulut Puti Klebreis', 'street_snacks', 'snacks', 'pan_filipino', 4, 36, 1),
  R(`سيخ دجاج مشوي ${T}`, 'Grilled chicken skewers street', 'Brochettes de poulet grillées', 'Pinchos de pollo a la parrilla', 'Gegrillte Hähnchenspieße', 'street_snacks', 'snacks', 'manila', 22, 3, 12),
  R(`باكسيو الروبيان بالليمون ${T}`, 'Paksiw prawn with lemon', 'Paksiw de crevette au citron', 'Paksiw de camarón con limón', 'Praxen-Krabbe mit Zitrone', 'fish_seafood', 'lunch', 'pan_filipino', 19, 3, 8),
  R(`فطائر الموز ${T}`, 'Banana fritters', 'Beignets de banane', 'Buñuelos de plátano', 'Bananen-Beignets', 'street_snacks', 'snacks', 'pan_filipino', 3, 34, 12),
  R(`خبز الجبن الساخن ${T}`, 'Warm cheese bread', 'Pain au fromage chaud', 'Pan con queso caliente', 'Warmes Käsebrot', 'street_snacks', 'snacks', 'manila', 8, 30, 13),
);
// --- condiments_sauces (8) ----------------------------------------------------
dishes.push(
  R(`صلصة الفلفل الحار ساوساوان ${T}`, 'Sawsawan hot pepper sauce', 'Sauce au piment sawsawan', 'Salsa de chile sawsawan', 'Sawsawan Chilisauce', 'condiments_sauces', 'lunch', 'pan_filipino', 2, 8, 6),
  R(`صلصة الفول السوداني ${T}`, 'Peanut sauce', 'Sauce aux cacahuètes', 'Salsa de cacahuete', 'Erdnusssauce', 'condiments_sauces', 'lunch', 'pan_filipino', 8, 10, 15),
  R(`صلصة السمسم ${T}`, 'Sesame sauce', 'Sauce au sésame', 'Salsa de sésamo', 'Sesamsauce', 'condiments_sauces', 'lunch', 'pan_filipino', 6, 8, 13),
  R(`صلصة الصويا والخل ${T}`, 'Soy and vinegar sauce', 'Sauce soja et vinaigre', 'Salsa de soja y vinagre', 'Soja-Essig-Sauce', 'condiments_sauces', 'lunch', 'pan_filipino', 4, 9, 4),
  R(`صلصة خل الثوم ${T}`, 'Vinegar and garlic sauce', 'Sauce vinaigre et ail', 'Salsa de vinagre y ajo', 'Essig-Knoblauch-Sauce', 'condiments_sauces', 'lunch', 'pan_filipino', 1, 7, 5),
  R(`صلصة الزنجبيل ${T}`, 'Ginger sauce', 'Sauce au gingembre', 'Salsa de jengibre', 'Ingwersauce', 'condiments_sauces', 'lunch', 'pan_filipino', 1, 14, 5),
  R(`مخلل الخيار ${T}`, 'Pickled cucumber', 'Concombre mariné', 'Pepino encurtido', 'Eingelegte Gurke', 'condiments_sauces', 'lunch', 'pan_filipino', 1, 8, 0),
  R(`أتشارا بالخل ${T}`, 'Atchara vinegar pickle', 'Achara au vinaigre', 'Atchara encurtido en vinagre', 'Atchara-Eingelegtes', 'condiments_sauces', 'lunch', 'pan_filipino', 1, 15, 0),
);
// --- beverages (10) ----------------------------------------------------------
dishes.push(
  R(`قهوة فلبينية ${T}`, 'Filipino coffee', 'Café philippin', 'Café filipino', 'Philippinischer Kaffee', 'beverages', 'breakfast', 'manila', 2, 3, 2),
  R(`شاي بالحليب ${T}`, 'Milk tea', 'Thé au lait', 'Té con leche', 'Tee mit Milch', 'beverages', 'breakfast', 'manila', 2, 12, 3),
  R(`عصير المانجو ${T}`, 'Mango juice', 'Jus de mangue', 'Zumo de mango', 'Mangosaft', 'beverages', 'snacks', 'pan_filipino', 1, 15, 0),
  R(`عصير الأناناس ${T}`, 'Pineapple juice', 'Jus d ananas', 'Zumo de piña', 'Ananassaft', 'beverages', 'snacks', 'cebu', 1, 14, 0),
  R(`عصير الموز بالتمر ${T}`, 'Banana and date shake', 'Smoothie banane et dattes', 'Batido de plátano y dátil', 'Bananen-Dattel-Shake', 'beverages', 'snacks', 'pan_filipino', 2, 24, 2),
  R(`شاي بالليمون ${T}`, 'Lemon tea', 'Thé au citron', 'Té con limón', 'Zitronentee', 'beverages', 'breakfast', 'pan_filipino', 0, 11, 0),
  R(`شراب ماء جوز الهند ${T}`, 'Coconut water drink', 'Eau de coco boisson', 'Bebida de agua de coco', 'Kokoswasser-Getränk', 'beverages', 'snacks', 'cebu', 1, 6, 1),
  R(`شاي الزنجبيل بالعسل ${T}`, 'Ginger honey tea', 'Thé au gingembre et miel', 'Té de jengibre con miel', 'Ingwer-Honigtee', 'beverages', 'breakfast', 'pan_filipino', 0, 12, 0),
  R(`عصير الكالامانسي ${T}`, 'Calamansi juice', 'Jus de calamansi', 'Zumo de calamansi', 'Calamansi-Saft', 'beverages', 'snacks', 'pan_filipino', 1, 9, 0),
  R(`مشروب التمر الهندي ${T}`, 'Tamarind drink', 'Boisson de tamarin', 'Bebida de tamarindo', 'Tamarindengetränk', 'beverages', 'snacks', 'davao', 1, 14, 0),
);

// --- validation -------------------------------------------------------------
const byCategory = {};
const byRegion = {};
const byMeal = {};
const seen = new Map();
const dups = [];
const badTok = [];
const badRange = [];
const badLang = [];
const badAtwater = [];
const hitsPorkOrAlcohol = [];
const TOKEN = 'فلبيني';
const ASIL = 'أصيل';
const PORK_OR_ALCOHOL = /\bpork\b|\bham\b|\bbacon\b|saucisson|chorizo|jam[oó]n|jamon|schwein|schinken|wurst|\bwine\b|\bbeer\b|\bale\b|cognac|\brhum\b|\bgin\b|\bvodka\b|\btequila\b|cerveza|\bvino\b|\bwein\b|liko|arack|gwapa|\btuba\b|lambanog|chanderi|خمر|نبيذ|مسكر|كحول|بيرة/i;

dishes.forEach((d, i) => {
  byCategory[d.category] = (byCategory[d.category] || 0) + 1;
  byRegion[d.region] = (byRegion[d.region] || 0) + 1;
  byMeal[d.mealType] = (byMeal[d.mealType] || 0) + 1;
  if (seen.has(d.name_ar)) dups.push(`${d.name_ar} (also #${seen.get(d.name_ar)})`);
  else seen.set(d.name_ar, i + 1);
  if (!d.name_ar.includes(TOKEN)) badTok.push(d.name_ar);
  if (!d.name_ar.trim().endsWith(ASIL)) badTok.push(`${d.name_ar} (missing ${ASIL})`);
  for (const k of ['name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!d[k] || d[k].length < 3) badLang.push(`${d.name_ar} -> ${k}`);
  }
  if (d.cal_100 < 20 || d.cal_100 > 900) badRange.push(`${d.name_ar}(${d.cal_100})`);
  if (d.cal_100 !== Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat)) badAtwater.push(d.name_ar);
  if (PORK_OR_ALCOHOL.test([d.name_ar, d.name_en, d.name_fr, d.name_es, d.name_de].join(' '))) {
    hitsPorkOrAlcohol.push(d.name_ar);
  }
  if (!/^[a-z_]+$/.test(d.region)) badLang.push(`${d.name_ar} -> region ${d.region}`);
  if (!/^[a-z_]+$/.test(d.category)) badLang.push(`${d.name_ar} -> category ${d.category}`);
});

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}
if (dups.length || badTok.length || badRange.length || badLang.length || badAtwater.length || hitsPorkOrAlcohol.length) {
  console.error('\nVALIDATION FAILED:');
  if (dups.length) console.error(`Duplicate names: ${dups.join(', ')}`);
  if (badTok.length) console.error(`Token problem: ${badTok.join(', ')}`);
  if (badLang.length) console.error(`Bad language/region/category: ${badLang.join(', ')}`);
  if (badRange.length) console.error(`Bad cal range: ${badRange.join(', ')}`);
  if (badAtwater.length) console.error(`Atwater mismatch: ${badAtwater.join(', ')}`);
  if (hitsPorkOrAlcohol.length) console.error(`Pork/alcohol: ${hitsPorkOrAlcohol.join(', ')}`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'filipino-200-proposal.json'),
  JSON.stringify(
    {
      meta: { target: 200, new_dishes: dishes.length, legacy_dishes: 100, with_macros: true },
      categories: Object.keys(byCategory),
      regions: Object.keys(byRegion),
      meal_types: Object.keys(byMeal),
      dishes,
    },
    null,
    2
  )
);
console.log(`\nWrote scripts/filipino-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);
