// Generates scripts/tunisia-100-proposal.json — 100 NEW authentic Tunisian dishes.
// Real dishes from Tunisian culinary heritage, not in the existing 200-name local set.
// Golden rule: "When in doubt, keep it general (pan_tunisian)."
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100]
const ROWS = [
  // ---- soups (11) ----
  ['شوربة الشعيرية بالهريسة', 'Vermicelli Soup with Harissa', 'Soupe de vermicelles à la harissa', 'Sopa de fideos con harissa', 'Harissa-Nudelsuppe', 'soups', 'lunch', 'pan_tunisian', 55],
  ['شوربة الحريرة التونسية باللحم', 'Tunisian Harira Soup with Meat', 'Harira tunisienne à la viande', 'Harira tunecina con carne', 'Tunesische Harira-Suppe mit Fleisch', 'soups', 'lunch', 'maghreb_shared', 62],
  ['شوربة الدجاج بالليمون', 'Chicken and Lemon Soup', 'Soupe de poulet au citron', 'Sopa de pollo con limón', 'Hühner-Zitronen-Suppe', 'soups', 'lunch', 'pan_tunisian', 55],
  ['شوربة الجمبري الحارة', 'Spicy Shrimp Soup', 'Soupe de crevettes épicée', 'Sopa picante de camarones', 'Scharfe Garnelensuppe', 'soups', 'lunch', 'pan_tunisian', 70],
  ['شوربة الكراث بالبطاطا', 'Leek and Potato Soup', 'Soupe de poireaux et pommes de terre', 'Sopa de puerros y patatas', 'Lauch-Kartoffel-Suppe', 'soups', 'lunch', 'pan_tunisian', 50],
  ['شوربة الفطر بالكريمة', 'Creamy Mushroom Soup', 'Soupe de champignons à la crème', 'Sopa cremosa de champiñones', 'Cremige Pilzsuppe', 'soups', 'lunch', 'pan_tunisian', 60],
  ['شوربة الخرشوف باللحم', 'Artichoke Soup with Meat', 'Soupe d’artichauts à la viande', 'Sopa de alcachofas con carne', 'Artischocken-Fleisch-Suppe', 'soups', 'lunch', 'pan_tunisian', 65],
  ['شوربة القمح باللحم', 'Wheat Soup with Meat (Sof)', 'Soupe de blé à la viande', 'Sopa de trigo con carne', 'Weizen-Fleisch-Suppe', 'soups', 'lunch', 'pan_tunisian', 72],
  ['شوربة الحمص بالسبانخ', 'Chickpea and Spinach Soup', 'Soupe de pois chiches et épinards', 'Sopa de garbanzos y espinacas', 'Kichererbsen-Spinat-Suppe', 'soups', 'lunch', 'pan_tunisian', 68],
  ['شوربة الجلبانة بالقديد', 'Pea Soup with Cured Meat', 'Soupe de petits pois au kaddid', 'Sopa de guisantes con carne curada', 'Erbsensuppe mit Trockenfleisch', 'soups', 'lunch', 'pan_tunisian', 78],
  ['شوربة السمك بالكركم والهريسة', 'Fish Soup with Turmeric and Harissa', 'Soupe de poisson au curcuma et à la harissa', 'Sopa de pescado con cúrcuma y harissa', 'Fischsuppe mit Kurkuma und Harissa', 'soups', 'lunch', 'pan_tunisian', 75],
  // ---- salads (11) ----
  ['سلطة الفلفل المشوي بالثوم والزيت', 'Roasted Pepper Salad with Garlic and Oil', 'Salade de poivrons grillés à l’ail', 'Ensalada de pimientos asados con ajo', 'Geröstete Paprikasalade mit Knoblauch', 'salads', 'lunch', 'pan_tunisian', 90],
  ['سلطة الباذنجان بالطحينة', 'Eggplant Salad with Tahini', 'Salade d’aubergines au tahini', 'Ensalada de berenjena con tahini', 'Auberginensalat mit Tahini', 'salads', 'lunch', 'pan_tunisian', 95],
  ['سلطة الحمص بالكمون والليمون', 'Chickpea Salad with Cumin and Lemon', 'Salade de pois chiches au cumin et citron', 'Ensalada de garbanzos con comino y limón', 'Kichererbsensalat mit Kreuzkümmel und Zitrone', 'salads', 'lunch', 'pan_tunisian', 110],
  ['سلطة الكسكسي الباردة بالخضار', 'Cold Couscous Salad with Vegetables', 'Salade froide de couscous aux légumes', 'Ensalada fría de cuscús con verduras', 'Kalte Couscous-Gemüsesalat', 'salads', 'lunch', 'pan_tunisian', 120],
  ['سلطة المكرونة بالمايونيز والخضار', 'Pasta Salad with Mayonnaise and Vegetables', 'Salade de pâtes à la mayonnaise et légumes', 'Ensalada de pasta con mayonesa y verduras', 'Nudelsalat mit Mayonnaise und Gemüse', 'salads', 'lunch', 'pan_tunisian', 180],
  ['سلطة التونة مع البيض والزيتون', 'Tuna Salad with Eggs and Olives', 'Salade de thon aux œufs et olives', 'Ensalada de atún con huevos y aceitunas', 'Thunfischsalat mit Eiern und Oliven', 'salads', 'lunch', 'pan_tunisian', 140],
  ['سلطة الطماطم والخيار بالهريسة', 'Tomato and Cucumber Salad with Harissa', 'Salade de tomates et concombres à la harissa', 'Ensalada de tomate y pepino con harissa', 'Tomaten-Gurken-Salat mit Harissa', 'salads', 'lunch', 'pan_tunisian', 45],
  ['سلطة البسباس مع البيض', 'Dill Salad with Eggs', 'Salade d’aneth aux œufs', 'Ensalada de eneldo con huevos', 'Dillsalat mit Eiern', 'salads', 'lunch', 'pan_tunisian', 75],
  ['سلطة الجزر المبروش بالمايونيز', 'Grated Carrot Salad with Mayonnaise', 'Salade de carottes râpées à la mayonnaise', 'Ensalada de zanahoria rallada con mayonesa', 'Geraspelte Karottensalat mit Mayonnaise', 'salads', 'lunch', 'pan_tunisian', 85],
  ['سلطة البصل بالليمون والزيتون', 'Onion Salad with Lemon and Olives', 'Salade d’oignons au citron et olives', 'Ensalada de cebolla con limón y aceitunas', 'Zwiebelsalat mit Zitrone und Oliven', 'salads', 'lunch', 'pan_tunisian', 70],
  ['سلطة الفول البلدي بالكمون', 'Fava Bean Salad with Cumin', 'Salade de fèves au cumin', 'Ensalada de habas con comino', 'Saubohnensalat mit Kreuzkümmel', 'salads', 'lunch', 'pan_tunisian', 95],
  // ---- brik (8) ----
  ['بريك بالبيض والتن والهريسة', 'Brik with Egg, Tuna and Harissa', 'Brik aux œufs, thon et harissa', 'Brik de huevo, atún y harissa', 'Brik mit Ei, Thunfisch und Harissa', 'brik', 'snacks', 'pan_tunisian', 350],
  ['بريك حلو بالشعيرية والعسل', 'Sweet Brik with Vermicelli and Honey', 'Brik sucré aux vermicelles et miel', 'Brik dulce de fideos con miel', 'Süßes Brik mit Fadennudeln und Honig', 'brik', 'snacks', 'pan_tunisian', 320],
  ['مبطن بالدجاج والجبن', 'Chicken and Cheese Mtaben', 'M’taben au poulet et fromage', 'Mtaben de pollo y queso', 'Mtaben mit Hühnchen und Käse', 'brik', 'snacks', 'pan_tunisian', 300],
  ['مبطن بالبطاطا والجبن', 'Potato and Cheese Mtaben', 'M’taben aux pommes de terre et fromage', 'Mtaben de patata y queso', 'Mtaben mit Kartoffeln und Käse', 'brik', 'snacks', 'pan_tunisian', 260],
  ['مبطن بالقديد والفلفل', 'Kaddid and Pepper Mtaben', 'M’taben au kaddid et poivre', 'Mtaben de carne curada y pimiento', 'Mtaben mit Trockenfleisch und Paprika', 'brik', 'snacks', 'pan_tunisian', 330],
  ['طاجين الروبيان بالجبن', 'Shrimp and Cheese Tajine', 'Tajine de crevettes au fromage', 'Tajín de camarones con queso', 'Garnelen-Käse-Tajine', 'brik', 'snacks', 'pan_tunisian', 180],
  ['طاجين الفلفل والبيض', 'Pepper and Egg Tajine', 'Tajine de poivrons et œufs', 'Tajín de pimientos y huevos', 'Paprika-Eier-Tajine', 'brik', 'snacks', 'pan_tunisian', 160],
  ['معقود الفول الأخضر', 'Green Fava Bean Maakoud', 'Maakoud de fèves vertes', 'Maakoud de habas verdes', 'Maakoud mit grünen Saubohnen', 'brik', 'snacks', 'pan_tunisian', 200],
  // ---- main_stews (11) ----
  ['مرقة الكوسة باللحم', 'Zucchini Stew with Meat', 'Ragoût de courgettes à la viande', 'Guiso de calabacín con carne', 'Zucchini-Eintopf mit Fleisch', 'main_stews', 'lunch', 'pan_tunisian', 90],
  ['مرقة الكراث باللحم', 'Leek Stew with Meat', 'Ragoût de poireaux à la viande', 'Guiso de puerros con carne', 'Lauch-Eintopf mit Fleisch', 'main_stews', 'lunch', 'pan_tunisian', 85],
  ['مرقة الجزر والبطاطا باللحم', 'Carrot and Potato Stew with Meat', 'Ragoût de carottes et pommes de terre à la viande', 'Guiso de zanahoria y patata con carne', 'Karotten-Kartoffel-Eintopf mit Fleisch', 'main_stews', 'lunch', 'pan_tunisian', 95],
  ['مرقة الفطر بالدجاج', 'Mushroom Stew with Chicken', 'Ragoût de champignons au poulet', 'Guiso de champiñones con pollo', 'Pilz-Eintopf mit Hühnchen', 'main_stews', 'lunch', 'pan_tunisian', 80],
  ['مرقة السبانخ بالدجاج', 'Spinach Stew with Chicken', 'Ragoût d’épinards au poulet', 'Guiso de espinacas con pollo', 'Spinat-Eintopf mit Hühnchen', 'main_stews', 'lunch', 'pan_tunisian', 70],
  ['مكرونة بالقديد المحمر', 'Pasta with Fried Kaddid', 'Pâtes au kaddid rissolé', 'Pasta con carne curada frita', 'Nudeln mit gebratenem Trockenfleisch', 'main_stews', 'lunch', 'pan_tunisian', 380],
  ['مكرونة بالتن والهريسة', 'Pasta with Tuna and Harissa', 'Pâtes au thon et à la harissa', 'Pasta con atún y harissa', 'Nudeln mit Thunfisch und Harissa', 'main_stews', 'lunch', 'pan_tunisian', 250],
  ['رز بالعلوش والحمص', 'Rice with Lamb and Chickpeas', 'Riz à l’agneau et pois chiches', 'Arroz con cordero y garbanzos', 'Reis mit Lamm und Kichererbsen', 'main_stews', 'lunch', 'pan_tunisian', 210],
  ['البركوكش بالخضار واللحم', 'Berkoukesh with Vegetables and Meat', 'Berkoukesh aux légumes et à la viande', 'Berkoukesh con verduras y carne', 'Berkoukesh mit Gemüse und Fleisch', 'main_stews', 'lunch', 'maghreb_shared', 110],
  ['مرقة القرع الأصفر بالحمص', 'Yellow Squash Stew with Chickpeas', 'Ragoût de courge jaune aux pois chiches', 'Guiso de calabaza amarilla con garbanzos', 'Kürbis-Eintopf mit Kichererbsen', 'main_stews', 'lunch', 'pan_tunisian', 72],
  ['مرقة الباذنجان باللحم', 'Eggplant Stew with Meat', 'Ragoût d’aubergines à la viande', 'Guiso de berenjena con carne', 'Auberginen-Eintopf mit Fleisch', 'main_stews', 'lunch', 'pan_tunisian', 88],
  // ---- couscous (11) ----
  ['كسكسي بالقديد والبيض المسلوق', 'Couscous with Kaddid and Boiled Eggs', 'Couscous au kaddid et œufs durs', 'Cuscús con carne curada y huevos', 'Couscous mit Trockenfleisch und Eiern', 'couscous', 'lunch', 'pan_tunisian', 240],
  ['كسكسي بالحوت المحمر والهريسة', 'Couscous with Fried Fish and Harissa', 'Couscous au poisson frit et à la harissa', 'Cuscús con pescado frito y harissa', 'Couscous mit gebratenem Fisch und Harissa', 'couscous', 'lunch', 'pan_tunisian', 260],
  ['كسكسي بالثوم على الطريقة الجنوبية', 'Garlic Couscous, Southern Style', 'Couscous à l’ail, style du Sud', 'Cuscús con ajo, estilo del sur', 'Knoblauch-Couscous nach Südstil', 'couscous', 'lunch', 'medenine', 220],
  ['كسكسي بالجلبانة والجزر', 'Couscous with Peas and Carrots', 'Couscous aux petits pois et carottes', 'Cuscús con guisantes y zanahorias', 'Couscous mit Erbsen und Karotten', 'couscous', 'lunch', 'pan_tunisian', 130],
  ['كسكسي بالكرنب واللحم', 'Couscous with Cabbage and Meat', 'Couscous au chou et à la viande', 'Cuscús con col y carne', 'Couscous mit Kohl und Fleisch', 'couscous', 'lunch', 'pan_tunisian', 175],
  ['كسكسي بالبصل المحمر والحوت', 'Couscous with Caramelized Onions and Fish', 'Couscous aux oignons caramélisés et poisson', 'Cuscús con cebolla caramelizada y pescado', 'Couscous mit karamellisierten Zwiebeln und Fisch', 'couscous', 'lunch', 'sousse', 250],
  ['كسكسي صفاقصي بالحوت الحار', 'Sfax-Style Spicy Fish Couscous', 'Couscous sfaxien au poisson épicé', 'Cuscús de Sfax con pescado picante', 'Sfax-Couscous mit scharfem Fisch', 'couscous', 'lunch', 'sfax', 270],
  ['كسكسي باللحم المفروم والطماطم', 'Couscous with Minced Meat and Tomato', 'Couscous à la viande hachée et tomates', 'Cuscús con carne picada y tomate', 'Couscous mit Hackfleisch und Tomaten', 'couscous', 'lunch', 'pan_tunisian', 230],
  ['كسكسي بالخضار والحمص', 'Vegetarian Couscous with Vegetables and Chickpeas', 'Couscous végétarien aux légumes et pois chiches', 'Cuscús vegetariano con verduras y garbanzos', 'Vegetarisches Couscous mit Gemüse und Kichererbsen', 'couscous', 'lunch', 'pan_tunisian', 120],
  ['مسفوف بالخضار والقديد', 'Savory Mesfouf with Vegetables and Kaddid', 'Mesfouf salé aux légumes et kaddid', 'Mesfuf salado con verduras y carne curada', 'Herzhaftes Mesfouf mit Gemüse und Trockenfleisch', 'couscous', 'lunch', 'pan_tunisian', 180],
  ['كسكسي بالحوت والكوسة', 'Couscous with Fish and Zucchini', 'Couscous au poisson et courgettes', 'Cuscús con pescado y calabacín', 'Couscous mit Fisch und Zucchini', 'couscous', 'lunch', 'pan_tunisian', 210],
  // ---- seafood (9) ----
  ['سمك السردين المقلي بالدقيق', 'Fried Sardines in Flour Batter', 'Sardines frites à la farine', 'Sardinas fritas en harina', 'Gebratene Sardinen im Mehlmantel', 'seafood', 'lunch', 'pan_tunisian', 190],
  ['سمك قاروس بالفرن بصلصة الهريسة', 'Garous Fish Baked in Harissa Sauce', 'Garous au four, sauce harissa', 'Garous al horno con salsa harissa', 'Garous-Fisch im Ofen mit Harissa-Sauce', 'seafood', 'lunch', 'pan_tunisian', 155],
  ['سمك مرصع بالكرفس والبصل', 'Fish with Celery and Onion (Merssa)', 'Poisson à la merssa (céleri et oignons)', 'Pescado con apio y cebolla (merssa)', 'Fisch mit Sellerie und Zwiebeln (Merssa)', 'seafood', 'lunch', 'pan_tunisian', 130],
  ['سمك بوري بالفرن بالصلصة البيضاء', 'Mullet Baked in White Sauce', 'Mulet au four, sauce blanche', 'Liso al horno con salsa blanca', 'Gebratene Meeräsche in weißer Sauce', 'seafood', 'lunch', 'pan_tunisian', 150],
  ['جمبري مشوي على الفحم', 'Charcoal-Grilled Shrimp', 'Crevettes grillées au charbon', 'Camarones a la brasa', 'Gegrillte Garnelen vom Holzkohlefeuer', 'seafood', 'lunch', 'pan_tunisian', 110],
  ['سبيط بصلصة الحبر', 'Calamari in Ink Sauce', 'Calmars à l’encre', 'Calamar en su tinta', 'Tintenfisch in Tintensauce', 'seafood', 'lunch', 'pan_tunisian', 95],
  ['كفتة الحوت بالفرن بصلصة الطماطم', 'Fish Kofta Baked in Tomato Sauce', 'Kefta de poisson au four, sauce tomate', 'Kefta de pescado al horno con salsa de tomate', 'Fischkefta im Ofen mit Tomatensauce', 'seafood', 'lunch', 'pan_tunisian', 140],
  ['بلح البحر بنزرتي بالليمون', 'Bizerte Mussels with Lemon', 'Moules de Bizerte au citron', 'Mejillones de Bizerta con limón', 'Bizerta-Muscheln mit Zitrone', 'seafood', 'lunch', 'bizerte', 85],
  ['طاجين سوسي بالحوت والبطاطا', 'Sousse Fish and Potato Tajine', 'Tajine soussi au poisson et pommes de terre', 'Tajín de Sousse con pescado y patatas', 'Sousse-Fisch-Kartoffel-Tajine', 'seafood', 'lunch', 'sousse', 170],
  // ---- meats_poultry (9) ----
  ['دجاج بالزيتون والليمون بالفرن', 'Oven Chicken with Olives and Lemon', 'Poulet au four, olives et citron', 'Pollo al horno con aceitunas y limón', 'Ofenhähnchen mit Oliven und Zitrone', 'meats_poultry', 'lunch', 'pan_tunisian', 200],
  ['دجاج محشي بالكسكسي', 'Chicken Stuffed with Couscous', 'Poulet farci au couscous', 'Pollo relleno de cuscús', 'Hähnchen mit Couscous gefüllt', 'meats_poultry', 'lunch', 'pan_tunisian', 230],
  ['دجاج بالبطاطا والثوم بالفرن', 'Oven Chicken with Potatoes and Garlic', 'Poulet au four, pommes de terre et ail', 'Pollo al horno con patatas y ajo', 'Ofenhähnchen mit Kartoffeln und Knoblauch', 'meats_poultry', 'lunch', 'pan_tunisian', 185],
  ['لحم الضان بالبرقوق', 'Lamb with Prunes', 'Agneau aux pruneaux', 'Cordero con ciruelas', 'Lamm mit Pflaumen', 'meats_poultry', 'lunch', 'pan_tunisian', 240],
  ['الشكشوكة بالقديد والبيض', 'Chakchouka with Kaddid and Eggs', 'Chakchouka au kaddid et œufs', 'Chakchouka con carne curada y huevos', 'Chakchouka mit Trockenfleisch und Eiern', 'meats_poultry', 'lunch', 'maghreb_shared', 120],
  ['مرقاز مشوي مع البطاطا والزيتون', 'Grilled Merguez with Potatoes and Olives', 'Merguez grillées, pommes de terre et olives', 'Merguez a la brasa con patatas y aceitunas', 'Gegrillte Merguez mit Kartoffeln und Oliven', 'meats_poultry', 'lunch', 'pan_tunisian', 250],
  ['أرانب مشوية بالزعتر والثوم', 'Roasted Rabbit with Thyme and Garlic', 'Lapin rôti au thym et à l’ail', 'Conejo asado con tomillo y ajo', 'Gebratenes Kaninchen mit Thymian und Knoblauch', 'meats_poultry', 'lunch', 'pan_tunisian', 165],
  ['كبدة بالبقدونس على الطريقة التونسية', 'Tunisian-Style Liver with Parsley', 'Foie sauté au persil, style tunisien', 'Hígado con perejil estilo tunecino', 'Leber mit Petersilie nach tunesischer Art', 'meats_poultry', 'lunch', 'pan_tunisian', 145],
  ['لحم العجل المشوي بالفحم', 'Charcoal-Grilled Veal', 'Veau grillé au charbon', 'Ternera a la brasa', 'Gegrilltes Kalbfleisch vom Holzkohlefeuer', 'meats_poultry', 'lunch', 'pan_tunisian', 190],
  // ---- bakery (8) ----
  ['الفريكاسي بالتونة والبيض والزيتون', 'Fricassé with Tuna, Egg and Olives', 'Fricassé au thon, œuf et olives', 'Fricasé con atún, huevo y aceitunas', 'Fricassé mit Thunfisch, Ei und Oliven', 'bakery', 'breakfast', 'tunis', 310],
  ['خبز الكماج التقليدي', 'Traditional Kamaj Bread', 'Pain kamaj traditionnel', 'Pan kamaj tradicional', 'Traditionelles Kamaj-Brot', 'bakery', 'breakfast', 'pan_tunisian', 240],
  ['كعك السمسم', 'Sesame Kaak', 'Kaak au sésame', 'Kaak de sésamo', 'Sesam-Kaak', 'bakery', 'breakfast', 'pan_tunisian', 270],
  ['خبز الحلبة', 'Fenugreek Bread', 'Pain à la fenugrec', 'Pan de fenogreco', 'Bockshornklee-Brot', 'bakery', 'breakfast', 'pan_tunisian', 230],
  ['خبز الشعير بالتمر', 'Barley Bread with Dates', 'Pain d’orge aux dattes', 'Pan de cebada con dátiles', 'Gerstenbrot mit Datteln', 'bakery', 'breakfast', 'pan_tunisian', 250],
  ['المسبع بالعسل', 'Honey Fried Dough (Masseba)', 'Masseba au miel', 'Masseba con miel', 'Masseba mit Honig', 'bakery', 'breakfast', 'pan_tunisian', 300],
  ['خبز الزيتونة بالزيتون الأخضر', 'Olive Bread with Green Olives', 'Pain aux olives vertes', 'Pan de aceitunas verdes', 'Brot mit grünen Oliven', 'bakery', 'breakfast', 'pan_tunisian', 265],
  ['خبز السلق بالزيتون', 'Slag Bread with Olives', 'Pain salg aux olives', 'Pan salg con aceitunas', 'Salg-Brot mit Oliven', 'bakery', 'breakfast', 'pan_tunisian', 245],
  // ---- sweets (13) ----
  ['كعك الغزال باللوز', 'Kaak Ghzal (Almond Crescent Pastries)', 'Kaak Ghzal aux amandes', 'Kaak Ghzal de almendras', 'Kaak Ghzal mit Mandeln', 'sweets', 'snacks', 'maghreb_shared', 420],
  ['كعك عين الجمل المحشو', 'Kaak Ain Jemel (Stuffed Glazed Pastries)', 'Kaak Ain Jemel fourré', 'Kaak Ain Jemel relleno', 'Kaak Ain Jemel gefüllt', 'sweets', 'snacks', 'pan_tunisian', 400],
  ['عجائن اللوز التقليدية', 'Traditional Molded Almond Paste Sweets', 'Pâtes d’amandes traditionnelles', 'Masas de almendra tradicionales', 'Traditionelle Mandelmasse-Süßigkeiten', 'sweets', 'snacks', 'pan_tunisian', 380],
  ['غرايبة اللوز', 'Almond Ghraiba', 'Ghraiba aux amandes', 'Ghraiba de almendras', 'Ghraiba mit Mandeln', 'sweets', 'snacks', 'maghreb_shared', 460],
  ['بسبوسة بالزبادي واللوز', 'Yogurt Basbousa with Almonds', 'Basboussa au yaourt et aux amandes', 'Basbusa con yogur y almendras', 'Basbousa mit Joghurt und Mandeln', 'sweets', 'snacks', 'pan_tunisian', 330],
  ['بقلاوة نابلية باللوز والبندق', 'Nabeul Baklava with Almonds and Hazelnuts', 'Baklava de Nabeul aux amandes et noisettes', 'Baklava de Nabeul con almendras y avellanas', 'Nabeul-Baklava mit Mandeln und Haselnüssen', 'sweets', 'snacks', 'nabeul', 450],
  ['مقروض صفاقسي بالتمر والعسل', 'Sfax Makroud with Dates and Honey', 'Makroud sfaxien aux dattes et miel', 'Makroud de Sfax con dátiles y miel', 'Sfax-Makroud mit Datteln und Honig', 'sweets', 'snacks', 'sfax', 400],
  ['بسيسة جنوبية بالفستق واللوز', 'Southern Bsissa with Pistachios and Almonds', 'Bssissa du Sud aux pistaches et amandes', 'Bssissa del sur con pistachos y almendras', 'Südliche Bsissa mit Pistazien und Mandeln', 'sweets', 'snacks', 'gabes', 300],
  ['مسكوتة باليانسون والعسل', 'Anise and Honey Pound Cake', 'Gâteau au anis et miel', 'Bizcocho de anís y miel', 'Anis-Honig-Kuchen', 'sweets', 'snacks', 'pan_tunisian', 360],
  ['قطايف بالجوز والعسل التونسية', 'Tunisian Qatayef with Walnuts and Honey', 'Qatayef tunisien aux noix et miel', 'Qatayef tunecino con nueces y miel', 'Tunesisches Qatayef mit Walnüssen und Honig', 'sweets', 'snacks', 'pan_tunisian', 350],
  ['حلوى النشا بالورد والليمون', 'Starch Pudding with Rose and Lemon', 'Crème d’amidon à la rose et citron', 'Flan de almidón con rosa y limón', 'Stärkepudding mit Rose und Zitrone', 'sweets', 'snacks', 'pan_tunisian', 90],
  ['كعك الأنيس باللوز', 'Anise Kaak with Almonds', 'Kaak à l’anis et amandes', 'Kaak de anís con almendras', 'Anis-Kaak mit Mandeln', 'sweets', 'snacks', 'pan_tunisian', 380],
  ['قريقشات السمسم والعسل', 'Sesame and Honey Crunch (Grigichat)', 'Grigichat au sésame et miel', 'Grigichat de sésamo y miel', 'Grigichat mit Sesam und Honig', 'sweets', 'snacks', 'pan_tunisian', 360],
  // ---- drinks_spices (9) ----
  ['لبن عيران التونسي', 'Tunisian Lben (Buttermilk)', 'Lben tunisien', 'Lben tunecino', 'Tunesischer Lben (Buttermilch)', 'drinks_spices', 'snacks', 'maghreb_shared', 40],
  ['عصير العنب البلدي', 'Fresh Grape Juice', 'Jus de raisin frais', 'Zumo de uva natural', 'Frischer Traubensaft', 'drinks_spices', 'snacks', 'pan_tunisian', 70],
  ['شراب التين المجفف', 'Dried Fig Drink', 'Boisson de figues séchées', 'Bebida de higos secos', 'Getränk aus getrockneten Feigen', 'drinks_spices', 'snacks', 'pan_tunisian', 55],
  ['شراب الشعير المحمص', 'Roasted Barley Drink', 'Boisson d’orge grillée', 'Bebida de cebada tostada', 'Geröstetes Gerstengetränk', 'drinks_spices', 'snacks', 'pan_tunisian', 45],
  ['شراب اللوز الحار', 'Hot Almond Drink', 'Boisson chaude aux amandes', 'Bebida caliente de almendras', 'Heißes Mandelgetränk', 'drinks_spices', 'snacks', 'pan_tunisian', 85],
  ['مخلل الجزر الحار', 'Spicy Pickled Carrots (Mouna)', 'Carottes marinées épicées', 'Zanahorias encurtidas picantes', 'Scharf eingelegte Karotten', 'drinks_spices', 'snacks', 'pan_tunisian', 25],
  ['مخلل القرنبيط', 'Pickled Cauliflower', 'Chou-fleur mariné', 'Coliflor encurtida', 'Eingelegter Blumenkohl', 'drinks_spices', 'snacks', 'pan_tunisian', 30],
  ['مخلل البصل الحار', 'Pickled Onions in Vinegar', 'Oignons marinés au vinaigre', 'Cebollas encurtidas en vinagre', 'In Essig eingelegte Zwiebeln', 'drinks_spices', 'snacks', 'pan_tunisian', 28],
  ['تبل الكمون والكزبرة البلدي', 'Cumin and Coriander Tabil Blend', 'Tabil au cumin et coriandre', 'Tabil de comino y cilantro', 'Tabil aus Kreuzkümmel und Koriander', 'drinks_spices', 'snacks', 'pan_tunisian', 25],
];

const CATEGORIES = ['soups', 'salads', 'brik', 'main_stews', 'couscous', 'seafood', 'meats_poultry', 'bakery', 'sweets', 'drinks_spices'];
const MEALTYPES = ['breakfast', 'lunch', 'snacks'];
const REGIONS = ['pan_tunisian', 'maghreb_shared', 'tunis', 'sfax', 'sousse', 'nabeul', 'gabes', 'medenine', 'bizerte'];

const dishes = ROWS.map(([name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100]) => ({
  name_ar,
  name_en,
  name_fr,
  name_es,
  name_de,
  category,
  mealType,
  region,
  cal_100,
}));

// Guard: schema + counts
for (const d of dishes) {
  if (!CATEGORIES.includes(d.category)) throw new Error(`bad category: ${d.category} (${d.name_ar})`);
  if (!MEALTYPES.includes(d.mealType)) throw new Error(`bad mealType: ${d.mealType} (${d.name_ar})`);
  if (!REGIONS.includes(d.region)) throw new Error(`bad region: ${d.region} (${d.name_ar})`);
  if (!(d.cal_100 >= 20 && d.cal_100 <= 900)) throw new Error(`bad cal_100: ${d.cal_100} (${d.name_ar})`);
  for (const k of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!d[k] || !d[k].trim()) throw new Error(`empty ${k}: ${d.name_ar}`);
  }
}
const arSet = new Set(dishes.map((d) => d.name_ar));
if (arSet.size !== dishes.length) throw new Error('duplicate Arabic names inside proposal');

const byCat = {};
const byRegion = {};
for (const d of dishes) {
  byCat[d.category] = (byCat[d.category] || 0) + 1;
  byRegion[d.region] = (byRegion[d.region] || 0) + 1;
}
console.log('categories', JSON.stringify(byCat));
console.log('regions', JSON.stringify(byRegion));
console.log('total', dishes.length);

const proposal = {
  kitchen: 'tunisian',
  goal: 300,
  project_tag: 'north-africa-tunisia-2026',
  local_migrated: {
    count: 197,
    note: '197 of 200 local Tunisian dishes migrated to Supabase (3 skipped as existing duplicates). All tagged region=pan_tunisian.',
  },
  new_additions: {
    count: 100,
    note: '100 new authentic Tunisian dishes proposed to reach the 300-dish premium target.',
  },
  regions: REGIONS,
  meal_types: MEALTYPES,
  dishes,
};

fs.writeFileSync(path.join(__dirname, 'tunisia-100-proposal.json'), JSON.stringify(proposal, null, 2), 'utf8');
console.log('wrote scripts/tunisia-100-proposal.json');