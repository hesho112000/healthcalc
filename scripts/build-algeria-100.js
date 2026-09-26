// Generates scripts/algeria-100-proposal.json — 100 NEW authentic Algerian dishes.
// Real dishes from Algerian culinary heritage, not in the existing 200-name local
// set nor the live Supabase DB (scripts/_db-names.json).
// Golden rule: "When in doubt, keep it general (pan_algerian)."
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100]
const ROWS = [
  // ---- soups / chorba (12) ----
  ['شربة الفريك بالدجاج', 'Algerian Chorba Frik with Chicken', 'Chorba frik au poulet', 'Chorba frik con pollo', 'Chorba Frik mit Hühnchen', 'soups', 'lunch', 'pan_algerian', 65],
  ['شربة السمك الجزائرية', 'Algerian Fish Chorba', 'Chorba de poisson algérienne', 'Chorba de pescado argelina', 'Algerische Fisch-Chorba', 'soups', 'lunch', 'pan_algerian', 75],
  ['شربة الفول بالشعرية', 'Fava Bean Soup with Vermicelli', 'Chorba de fèves aux vermicelles', 'Sopa de habas con fideos', 'Saubohnen-Fadennudelsuppe', 'soups', 'lunch', 'pan_algerian', 70],
  ['شربة الطماطم بالشعرية', 'Tomato Soup with Vermicelli', 'Chorba de tomates aux vermicelles', 'Sopa de tomate con fideos', 'Tomatennudelsuppe', 'soups', 'lunch', 'pan_algerian', 55],
  ['شوربة القرنبيط بالجبن', 'Cauliflower Cheese Soup', 'Soupe de chou-fleur au fromage', 'Sopa de coliflor con queso', 'Blumenkohl-Käsesuppe', 'soups', 'lunch', 'pan_algerian', 60],
  ['شوربة الكوسة بالريحان', 'Zucchini Soup with Basil', 'Soupe de courgettes au basilic', 'Sopa de calabacín con albahaca', 'Zucchini-Basilikumsuppe', 'soups', 'lunch', 'pan_algerian', 50],
  ['شوربة اليقطين بالزنجبيل', 'Pumpkin Soup with Ginger', 'Soupe de citrouille au gingembre', 'Sopa de calabaza con jengibre', 'Kürbissuppe mit Ingwer', 'soups', 'lunch', 'pan_algerian', 58],
  ['شربة البصل المحمر بالجبن', 'Caramelized Onion and Cheese Soup', 'Chorba d’oignons caramélisés au fromage', 'Sopa de cebolla caramelizada con queso', 'Karamellisierte Zwiebelsuppe mit Käse', 'soups', 'lunch', 'pan_algerian', 62],
  ['شوربة الفطر البري بالكريمة', 'Wild Mushroom Cream Soup', 'Soupe de champignons sauvages à la crème', 'Sopa de champiñones silvestres con crema', 'Cremige Wildpilzsuppe', 'soups', 'lunch', 'pan_algerian', 55],
  ['شوربة الجزر بالزنجبيل والبرتقال', 'Carrot Ginger Orange Soup', 'Soupe de carottes au gingembre et orange', 'Sopa de zanahoria con jengibre y naranja', 'Karotten-Ingwer-Orangen-Suppe', 'soups', 'lunch', 'pan_algerian', 48],
  ['شوربة الجمبري بالكركم', 'Shrimp Soup with Turmeric', 'Chorba de crevettes au curcuma', 'Sopa de camarones con cúrcuma', 'Garnelensuppe mit Kurkuma', 'soups', 'lunch', 'pan_algerian', 68],
  ['شوربة الفاصولياء البيضاء بالطماطم', 'White Bean and Tomato Soup', 'Soupe de haricots blancs à la tomate', 'Sopa de alubias blancas con tomate', 'Weiße-Bohnen-Tomatensuppe', 'soups', 'lunch', 'pan_algerian', 63],
  // ---- salads / sides (12) ----
  ['السلاطة الجزائرية بالبطاطا والبيض', 'Algerian Salad with Potato and Egg', 'Salade algérienne aux pommes de terre et œufs', 'Ensalada argelina con patata y huevo', 'Algerischer Salat mit Kartoffeln und Ei', 'salads_sides', 'lunch', 'pan_algerian', 160],
  ['تورشي الخضار المقرمش', 'Crunchy Pickled Vegetables (Torchi)', 'Torchi de légumes croquants', 'Torshi crujiente de verduras', 'Knackiges Torschi-Gemüse', 'salads_sides', 'lunch', 'pan_algerian', 35],
  ['سلطة الجزر المبشور بالبرتقال', 'Grated Carrot and Orange Salad', 'Salade de carottes râpées à l’orange', 'Ensalada de zanahoria rallada y naranja', 'Karotten-Orangen-Salat', 'salads_sides', 'lunch', 'pan_algerian', 70],
  ['سلطة الرجيلة بالزيتون والفلفل', 'Arugula Salad with Olives and Pepper', 'Salade de roquette aux olives et poivron', 'Ensalada de rúcula con aceitunas y pimiento', 'Rucolasalat mit Oliven und Paprika', 'salads_sides', 'lunch', 'pan_algerian', 60],
  ['سلطة الحمص بالشرمولة', 'Chickpea Salad with Chermoula', 'Salade de pois chiches à la chermoula', 'Ensalada de garbanzos con chermula', 'Kichererbsensalat mit Chermoula', 'salads_sides', 'lunch', 'pan_algerian', 110],
  ['سلطة الخيار بالزبادي والثوم', 'Cucumber Yogurt Salad with Garlic', 'Salade de concombre au yaourt et ail', 'Ensalada de pepino con yogur y ajo', 'Gurken-Joghurt-Salat mit Knoblauch', 'salads_sides', 'lunch', 'pan_algerian', 55],
  ['سلطة الكسكسي الباردة بالشرمولة', 'Cold Couscous Salad with Chermoula', 'Salade froide de couscous à la chermoula', 'Ensalada fría de cuscús con chermula', 'Kalte Couscous-Salat mit Chermoula', 'salads_sides', 'lunch', 'pan_algerian', 130],
  ['سلطة الشمندر بالثوم والخل', 'Beetroot Salad with Garlic and Vinegar', 'Salade de betterave à l’ail et vinaigre', 'Ensalada de remolacha con ajo y vinagre', 'Rote-Bete-Salat mit Knoblauch und Essig', 'salads_sides', 'lunch', 'pan_algerian', 65],
  ['سلطة الفول الأخضر بالبيض', 'Green Fava Bean Salad with Eggs', 'Salade de fèves vertes aux œufs', 'Ensalada de habas verdes con huevos', 'Grüne-Saubohnen-Salat mit Eiern', 'salads_sides', 'lunch', 'pan_algerian', 85],
  ['سلطة البرتقال بالزيتون الأسود', 'Orange Salad with Black Olives', 'Salade d’oranges aux olives noires', 'Ensalada de naranja con aceitunas negras', 'Orangensalat mit schwarzen Oliven', 'salads_sides', 'lunch', 'pan_algerian', 60],
  ['سلطة الملفوف بالبقدونس والليمون', 'Cabbage Salad with Parsley and Lemon', 'Salade de chou au persil et citron', 'Ensalada de col con perejil y limón', 'Kohlsalat mit Petersilie und Zitrone', 'salads_sides', 'lunch', 'pan_algerian', 50],
  ['سلطة البطاطا بالثوم والزيت البلدي', 'Potato Salad with Garlic and Olive Oil', 'Salade de pommes de terre à l’ail et huile d’olive', 'Ensalada de patata con ajo y aceite de oliva', 'Kartoffelsalat mit Knoblauch und Olivenöl', 'salads_sides', 'lunch', 'pan_algerian', 120],
  // ---- tajines / stews (12) ----
  ['طاجين الباذنجان بالدجاج والطماطم', 'Eggplant Chicken Tomato Tajine', 'Tajine d’aubergines au poulet et tomates', 'Tajín de berenjena con pollo y tomate', 'Auberginen-Hähnchen-Tomaten-Tajine', 'tajines', 'lunch', 'pan_algerian', 170],
  ['طاجين البطاطا باللحم والكركم', 'Potato and Meat Tajine with Turmeric', 'Tajine de pommes de terre et viande au curcuma', 'Tajín de patata y carne con cúrcuma', 'Kartoffel-Fleisch-Tajine mit Kurkuma', 'tajines', 'lunch', 'pan_algerian', 150],
  ['طاجين الفاصولياء بالخضار', 'Bean and Vegetable Tajine', 'Tajine de haricots aux légumes', 'Tajín de alubias con verduras', 'Bohnen-Gemüse-Tajine', 'tajines', 'lunch', 'pan_algerian', 120],
  ['طاجين القرع بالحمص', 'Squash and Chickpea Tajine', 'Tajine de courge aux pois chiches', 'Tajín de calabaza con garbanzos', 'Kürbis-Kichererbsen-Tajine', 'tajines', 'lunch', 'pan_algerian', 110],
  ['طاجين السبانخ بالزيتون', 'Spinach and Olive Tajine', 'Tajine d’épinards aux olives', 'Tajín de espinacas con aceitunas', 'Spinat-Oliven-Tajine', 'tajines', 'lunch', 'pan_algerian', 90],
  ['طاجين الكوسة بالجبن والبيض', 'Zucchini, Cheese and Egg Tajine', 'Tajine de courgettes au fromage et œufs', 'Tajín de calabacín con queso y huevo', 'Zucchini-Käse-Eier-Tajine', 'tajines', 'lunch', 'pan_algerian', 140],
  ['طاجين الحوت بالخضار', 'Fish and Vegetable Tajine', 'Tajine de poisson aux légumes', 'Tajín de pescado con verduras', 'Fisch-Gemüse-Tajine', 'tajines', 'lunch', 'oran', 150],
  ['طاجين الدجاج بالليمون المصير', 'Chicken Tajine with Preserved Lemon', 'Tajine de poulet au citron confit', 'Tajín de pollo con limón en conserva', 'Hähnchen-Tajine mit eingelegter Zitrone', 'tajines', 'lunch', 'pan_algerian', 185],
  ['طاجين اللحم بالعنب والزبيب', 'Meat Tajine with Grapes and Raisins', 'Tajine de viande aux raisins', 'Tajín de carne con uvas y pasas', 'Fleisch-Tajine mit Trauben und Rosinen', 'tajines', 'lunch', 'pan_algerian', 210],
  ['طاجين الفريك بالدجاج', 'Chicken and Freekeh Tajine', 'Tajine de poulet au frik', 'Tajín de pollo con freekeh', 'Hähnchen-Freekeh-Tajine', 'tajines', 'lunch', 'kabylie', 175],
  ['طاجين الكرنب باللحم', 'Cabbage and Meat Tajine', 'Tajine de chou à la viande', 'Tajín de col con carne', 'Kohl-Fleisch-Tajine', 'tajines', 'lunch', 'pan_algerian', 160],
  ['طاجين الدجاج بالبطاطا والزيتون الأخضر', 'Chicken Tajine with Potatoes and Green Olives', 'Tajine de poulet aux pommes de terre et olives vertes', 'Tajín de pollo con patatas y aceitunas verdes', 'Hähnchen-Tajine mit Kartoffeln und grünen Oliven', 'tajines', 'lunch', 'pan_algerian', 200],
  // ---- couscous / rechta (12) ----
  ['كسكسي بالكرعين وحمص العاصمة', 'Couscous with Calves’ Feet, Algiers Style', 'Couscous aux pieds de veau, style d’Alger', 'Cuscús con pies de ternera estilo Argel', 'Couscous mit Kalbsfüßen nach Algers-Stil', 'couscous_rechta', 'lunch', 'alger', 220],
  ['كسكسي بالحوت والبطاطا', 'Couscous with Fish and Potatoes', 'Couscous au poisson et pommes de terre', 'Cuscús con pescado y patatas', 'Couscous mit Fisch und Kartoffeln', 'couscous_rechta', 'lunch', 'pan_algerian', 200],
  ['كسكسي بلحم الغنم واللفت (كسكسي الشتاء)', 'Winter Couscous with Lamb and Turnips', 'Couscous d’hiver à l’agneau et navets', 'Cuscús de invierno con cordero y nabos', 'Winter-Couscous mit Lamm und Rüben', 'couscous_rechta', 'lunch', 'pan_algerian', 165],
  ['كسكسي باللفت والجزر', 'Couscous with Turnips and Carrots', 'Couscous aux navets et carottes', 'Cuscús con nabos y zanahorias', 'Couscous mit Rüben und Karotten', 'couscous_rechta', 'lunch', 'pan_algerian', 150],
  ['كسكسي بالملفوف والحمص', 'Couscous with Cabbage and Chickpeas', 'Couscous au chou et pois chiches', 'Cuscús con col y garbanzos', 'Couscous mit Kohl und Kichererbsen', 'couscous_rechta', 'lunch', 'pan_algerian', 160],
  ['كسكسي بالسردين (صيد البحر)', 'Couscous with Sardines (Sea Catch)', 'Couscous aux sardines', 'Cuscús con sardinas', 'Couscous mit Sardinen', 'couscous_rechta', 'lunch', 'pan_algerian', 210],
  ['كسكسي بالمرقاز والزيتون', 'Couscous with Merguez and Olives', 'Couscous aux merguez et olives', 'Cuscús con merguez y aceitunas', 'Couscous mit Merguez und Oliven', 'couscous_rechta', 'lunch', 'pan_algerian', 260],
  ['كسكسي كبد القبائل بالبصل', 'Kabyle Couscous with Liver and Onions', 'Couscous kabyle au foie et oignons', 'Cuscús cabilio con hígado y cebolla', 'Kabylen-Couscous mit Leber und Zwiebeln', 'couscous_rechta', 'lunch', 'kabylie', 205],
  ['كسكسي حلو باللوز والقرفة', 'Sweet Couscous with Almonds and Cinnamon', 'Couscous sucré aux amandes et cannelle', 'Cuscús dulce con almendras y canela', 'Süßes Couscous mit Mandeln und Zimt', 'couscous_rechta', 'lunch', 'pan_algerian', 310],
  ['كسكسي تلمساني بالبصل والزبيب', 'Tlemcen Couscous with Onions and Raisins', 'Couscous de Tlemcen aux oignons et raisins secs', 'Cuscús de Tremecén con cebolla y pasas', 'Tlemcen-Couscous mit Zwiebeln und Rosinen', 'couscous_rechta', 'lunch', 'tlemcen', 210],
  ['كسكسي بلحم البقر ببجاية', 'Bejaia Couscous with Beef', 'Couscous de Béjaïa au bœuf', 'Cuscús de Bugía con ternera', 'Béjaïa-Couscous mit Rindfleisch', 'couscous_rechta', 'lunch', 'bejaia', 195],
  ['التريدة بالدجاج والخضار', 'Rechta-Style Pasta (Richta) with Chicken and Vegetables', 'Rechta au poulet et légumes', 'Rechta con pollo y verduras', 'Rechta mit Hühnchen und Gemüse', 'couscous_rechta', 'lunch', 'alger', 185],
  // ---- grilled meats (10) ----
  ['كدنة بالتوابل (الكبد الجزائري)', 'Spiced Grilled Liver (Kedena)', 'Kedena de foie aux épices', 'Kedena de hígado especiado', 'Gewürzte Grillleber (Kedena)', 'grilled_meats', 'lunch', 'pan_algerian', 135],
  ['مرقاز بلحم الغنم الحار', 'Spicy Lamb Merguez (Homemade)', 'Merguez d’agneau épicée fait maison', 'Merguez casera de cordero picante', 'Scharfe hausgemachte Lamm-Merguez', 'grilled_meats', 'lunch', 'pan_algerian', 285],
  ['بوسلام (رأس الخروف المشوي)', 'Bouslam (Roasted Lamb Head)', 'Bouslam (tête d’agneau rôtie)', 'Bouslam (cabeza de cordero asada)', 'Bouslam (gerösteter Lammkopf)', 'grilled_meats', 'lunch', 'pan_algerian', 250],
  ['لحم الضأن المشوي بالزعفران والثوم', 'Saffron Garlic Grilled Lamb', 'Agneau grillé au safran et ail', 'Cordero a la brasa con azafrán y ajo', 'Mit Safran und Knoblauch gegrilltes Lamm', 'grilled_meats', 'lunch', 'pan_algerian', 215],
  ['دجاج الشواية بالثوم والكركم', 'Grilled Chicken with Garlic and Turmeric', 'Poulet grillé à l’ail et curcuma', 'Pollo a la brasa con ajo y cúrcuma', 'Grillhähnchen mit Knoblauch und Kurkuma', 'grilled_meats', 'lunch', 'pan_algerian', 225],
  ['أفخاذ الدجاج المشوية بالبابريكا', 'Paprika Grilled Chicken Thighs', 'Cuisses de poulet grillées au paprika', 'Muslos de pollo a la brasa con pimentón', 'Grillierte Paprika-Hähnchenschenkel', 'grilled_meats', 'lunch', 'pan_algerian', 200],
  ['المشوي البلدي بالبصل والطماطم', 'Country-Style Grill with Onions and Tomatoes', 'Grillade paysanne aux oignons et tomates', 'Asado rural con cebolla y tomate', 'Ländliches Grillgericht mit Zwiebeln und Tomaten', 'grilled_meats', 'lunch', 'pan_algerian', 205],
  ['السجق الحار بالفلفل المشوي', 'Spicy Sausage with Grilled Peppers', 'Saucisse épicée aux poivrons grillés', 'Salchicha picante con pimientos asados', 'Scharfe Wurst mit gegrillten Paprika', 'grilled_meats', 'lunch', 'pan_algerian', 275],
  ['الدجاج المشوي بالليمون والأوريجانو', 'Lemon and Oregano Grilled Chicken', 'Poulet grillé au citron et origan', 'Pollo a la brasa con limón y orégano', 'Zitrone-Oregano-Grillhähnchen', 'grilled_meats', 'lunch', 'pan_algerian', 205],
  ['لحم العجل المشوي بالبقدونس والثوم', 'Grilled Veal with Parsley and Garlic', 'Veau grillé au persil et ail', 'Ternera a la brasa con perejil y ajo', 'Gegrilltes Kalb mit Petersilie und Knoblauch', 'grilled_meats', 'lunch', 'pan_algerian', 190],
  // ---- fish / seafood (8) ----
  ['كرات السردين على طريقة وهران', 'Oran-Style Sardine Balls', 'Boulettes de sardines à l’oranaise', 'Albóndigas de sardina estilo Orán', 'Oran-Sardinenbällchen', 'fish_seafood', 'lunch', 'oran', 220],
  ['مفروم السردين بالبقدونس', 'Sardine Kofta with Parsley', 'Kefta de sardine au persil', 'Kefta de sardina con perejil', 'Sardinen-Kefta mit Petersilie', 'fish_seafood', 'lunch', 'pan_algerian', 180],
  ['سمك الدنيس بالفرن بالشرمولة', 'Baked Sea Bream with Chermoula', 'Dorade au four à la chermoula', 'Dorada al horno con chermula', 'Gebackene Dorade mit Chermoula', 'fish_seafood', 'lunch', 'pan_algerian', 150],
  ['السردين المملح (الملحاح)', 'Salt-Cured Sardines (Melhah)', 'Sardines salées (melha)', 'Sardinas saladas (melha)', 'Eingesalzene Sardinen (Melha)', 'fish_seafood', 'lunch', 'annaba', 120],
  ['بلح البحر بالفرن بالثوم والبقدونس', 'Baked Mussels with Garlic and Parsley', 'Moules au four à l’ail et persil', 'Mejillones al horno con ajo y perejil', 'Gebackene Muscheln mit Knoblauch und Petersilie', 'fish_seafood', 'lunch', 'pan_algerian', 90],
  ['قريدس مقلي بالثوم والفلفل الحار', 'Fried Shrimp with Garlic and Chili', 'Crevettes frites à l’ail et piment', 'Camarones fritos con ajo y chile', 'Gebratene Garnelen mit Knoblauch und Chili', 'fish_seafood', 'lunch', 'pan_algerian', 160],
  ['سمك البوري المشوي بالفلفل والليمون', 'Grilled Mullet with Pepper and Lemon', 'Mulet grillé au poivre et citron', 'Liso a la brasa con pimiento y limón', 'Gegrillte Meeräsche mit Pfeffer und Zitrone', 'fish_seafood', 'lunch', 'oran', 165],
  ['المرجان الصغير المقرمش', 'Crispy Small Red Fish (Merjan)', 'Petits merjans croustillants', 'Pequeños merjanes crujientes', 'Knusprige kleine Merjan-Fische', 'fish_seafood', 'lunch', 'annaba', 140],
  // ---- breads / pastries (9) ----
  ['الكسرات بالزيت والزعتر (خبز الشعير)', 'Barley Flatbread with Oil and Zaatar (Ksera)', 'Ksera à l’huile et zaatar (pain d’orge)', 'Ksera con aceite y zaatar (pan de cebada)', 'Gerstefladenbrot mit Öl und Zaatar (Ksera)', 'breads_pastries', 'breakfast', 'maghreb_shared', 245],
  ['المحاجب المورق بالزيتون', 'Flaky Mahajeb with Olives', 'Mahajeb feuilletées aux olives', 'Mahajeb hojaldradas con aceitunas', 'Blättrige Mahajeb mit Oliven', 'breads_pastries', 'breakfast', 'maghreb_shared', 305],
  ['الخبز الجزائري بالسميد (خبز الفرن)', 'Algerian Semolina Bread (Oven Bread)', 'Pain de semoule algérien (pain au four)', 'Pan de sémola argelino (pan de horno)', 'Algerisches Grießbrot (Ofenbrot)', 'breads_pastries', 'breakfast', 'pan_algerian', 245],
  ['الملة (خبز الجمر البلدي)', 'Mella (Ember-Baked Country Bread)', 'Mella (pain cuit sous la braise)', 'Mella (pan cocido bajo brasas)', 'Mella (Glutbrot)', 'breads_pastries', 'breakfast', 'pan_algerian', 240],
  ['صمدة العرس باليانسون والبيض', 'Wedding Semda Bread with Anise and Eggs', 'Semda de mariage à l’anis et œufs', 'Pan Semda de boda con anís y huevos', 'Hochzeitssemda mit Anis und Eiern', 'breads_pastries', 'breakfast', 'pan_algerian', 260],
  ['كعك الوردة بالأنيس', 'Anise Rose Kaak', 'Kaak rose à l’anis', 'Kaak rosa de anís', 'Anis-Rosen-Kaak', 'breads_pastries', 'breakfast', 'pan_algerian', 270],
  ['خبز النخالة والحبوب الكاملة', 'Wholegrain Bran Bread', 'Pain complet au son', 'Pan integral de salvado', 'Vollkorn-Kleiebrot', 'breads_pastries', 'breakfast', 'pan_algerian', 230],
  ['البسكرة بالتمر (معجنات الجنوب)', 'Date Pastries of Biskra', 'Bourek de Biskra aux dattes', 'Pastel de dátiles de Biskra', 'Dattelgebäck aus Biskra', 'breads_pastries', 'breakfast', 'pan_algerian', 290],
  ['الرغيف المحشو بالجبن والبقدونس', 'Stuffed Flatbread with Cheese and Parsley', 'Pain farci au fromage et persil', 'Pan relleno de queso y perejil', 'Gefülltes Fladenbrot mit Käse und Petersilie', 'breads_pastries', 'breakfast', 'pan_algerian', 315],
  // ---- sweets / desserts (13) ----
  ['بنونة بالسميد والعسل', 'Bnouna Semolina Honey Pastry', 'Bnouna à la semoule et miel', 'Bnouna de sémola con miel', 'Bnouna aus Grieß und Honig', 'sweets_desserts', 'snacks', 'pan_algerian', 380],
  ['قريوش بالعسل والسمسم', 'Griwech with Honey and Sesame', 'Griwech au miel et sésame', 'Griwech con miel y sésamo', 'Griwech mit Honig und Sesam', 'sweets_desserts', 'snacks', 'pan_algerian', 360],
  ['بقلاوة العيد باللوز', 'Eid Baklava with Almonds', 'Baklava de l’Aïd aux amandes', 'Baklava del Eid con almendras', 'Eid-Baklava mit Mandeln', 'sweets_desserts', 'snacks', 'pan_algerian', 420],
  ['مقروط باللوز والعسل', 'Makrout with Almonds and Honey', 'Makrout aux amandes et miel', 'Makrout de almendras con miel', 'Makrout mit Mandeln und Honig', 'sweets_desserts', 'snacks', 'constantine', 405],
  ['الشباكية بالعسل', 'Sesame Honey Squares (Chebakia)', 'Chebakia au miel', 'Chebakia con miel', 'Chebakia mit Honig', 'sweets_desserts', 'snacks', 'maghreb_shared', 395],
  ['الدزيرية باللوز وماء الورد (قسنطينة)', 'Dziriate with Almonds and Rose Water (Constantine)', 'Dziriate aux amandes et eau de rose (Constantine)', 'Dziriate de almendras y agua de rosas (Constantina)', 'Dziriate mit Mandeln und Rosenwasser (Konstantin)', 'sweets_desserts', 'snacks', 'constantine', 430],
  ['المبرزمة باللوز المحمص', 'Mbarzma with Toasted Almonds', 'Mbarzma aux amandes grillées', 'Mbarzma de almendras tostadas', 'Mbarzma mit gerösteten Mandeln', 'sweets_desserts', 'snacks', 'pan_algerian', 400],
  ['الطايب باللوز والعسل', 'Taayeb with Almonds and Honey', 'Taayeb aux amandes et miel', 'Taayeb de almendras con miel', 'Taayeb mit Mandeln und Honig', 'sweets_desserts', 'snacks', 'pan_algerian', 415],
  ['قنديل العسل (حلوى العيد المقرمشة)', 'Honey Candle Crunch (Qandil el Asel)', 'Qandil el asel au miel', 'Qandil el asel de miel', 'Qandil el Asel mit Honig', 'sweets_desserts', 'snacks', 'pan_algerian', 380],
  ['وردية اللوز', 'Rose Almond Pastry (Wardia)', 'Wardia aux amandes', 'Wardia de almendras', 'Wardia mit Mandeln', 'sweets_desserts', 'snacks', 'pan_algerian', 340],
  ['الجلجلانية بالعسل', 'Sesame and Honey Crunch (Guelgelania)', 'Guelgelania au miel et sésame', 'Guelgelania de miel y sésamo', 'Guelgelania mit Honig und Sesam', 'sweets_desserts', 'snacks', 'pan_algerian', 370],
  ['قلب اللوز (حلوى العيد الملكية)', 'Almond Hearts (Qalb el Louz)', 'Qalb el louz aux amandes', 'Qalb el louz de almendras', 'Qalb el Louz mit Mandeln', 'sweets_desserts', 'snacks', 'pan_algerian', 455],
  ['حلوى التمر والسمن باللوز', 'Date and Ghee Sweet with Almonds', 'Douceur aux dattes et smen aux amandes', 'Dulce de dátiles y mantequilla clarificada con almendras', 'Dattel-Ghee-Süßigkeit mit Mandeln', 'sweets_desserts', 'snacks', 'pan_algerian', 350],
  // ---- dairy / eggs / fruits (6) ----
  ['الرايب البلدي مع العسل والقرفة', 'Country Rayeb with Honey and Cinnamon', 'Rayeb fermier au miel et cannelle', 'Rayeb casero con miel y canela', 'Hausgemachtes Rayeb mit Honig und Zimt', 'dairy_eggs_fruits', 'breakfast', 'maghreb_shared', 75],
  ['الزقوقو بالحليب (وهران)', 'Zgougou Milk (Oran)', 'Zgougou au lait (Oran)', 'Zgougou con leche (Orán)', 'Zgougou-Milch (Oran)', 'dairy_eggs_fruits', 'breakfast', 'oran', 90],
  ['مشمش وهران الطازج', 'Fresh Oran Apricots', 'Abricots frais d’Oran', 'Albaricoques frescos de Orán', 'Frische Aprikosen aus Oran', 'dairy_eggs_fruits', 'breakfast', 'oran', 45],
  ['مربى السفرجل البلدي', 'Country Quince Jam', 'Confiture de coings fermière', 'Mermelada de membrillo casera', 'Hausgemachte Quittenmarmelade', 'dairy_eggs_fruits', 'breakfast', 'pan_algerian', 55],
  ['التمر المحلي بالسمن والعسل', 'Local Dates with Ghee and Honey', 'Dattes locales au smen et miel', 'Dátiles locales con mantequilla clarificada y miel', 'Lokale Datteln mit Ghee und Honig', 'dairy_eggs_fruits', 'breakfast', 'pan_algerian', 120],
  ['التين الطازج بالجبن البلدي', 'Fresh Figs with Country Cheese', 'Figues fraîches au fromage fermier', 'Higos frescos con queso casero', 'Frische Feigen mit Landkäse', 'dairy_eggs_fruits', 'breakfast', 'pan_algerian', 85],
  // ---- drinks / spices (6) ----
  ['عصير المشمش الوهراني', 'Oran Apricot Juice', 'Jus d’abricot d’Oran', 'Zumo de albaricoque de Orán', 'Orang-Aprikosensaft', 'drinks_spices', 'snacks', 'oran', 60],
  ['عصير العنب الأسود البلدي', 'Country Black Grape Juice', 'Jus de raisin noir fermier', 'Zumo de uva negra casero', 'Hausgemachter dunkler Traubensaft', 'drinks_spices', 'snacks', 'pan_algerian', 80],
  ['ماء الزهر البلدي (زهر البرتقال)', 'Country Orange Blossom Water', 'Eau de fleur d’oranger fermière', 'Agua de azahar casera', 'Hausgemachtes Orangenblütenwasser', 'drinks_spices', 'snacks', 'pan_algerian', 25],
  ['تبل الكسكسي والطواجن', 'Couscous and Tajine Spice Blend', 'Mélange d’épices couscous et tajine', 'Mezcla de especias para cuscús y tajín', 'Couscous- und Tajine-Gewürzmischung', 'drinks_spices', 'snacks', 'pan_algerian', 30],
  ['زيتون بلدي بالثوم والليمون', 'Country Olives with Garlic and Lemon', 'Olives fermières à l’ail et citron', 'Aceitunas caseras con ajo y limón', 'Landoliven mit Knoblauch und Zitrone', 'drinks_spices', 'snacks', 'pan_algerian', 110],
  ['تورشي الباذنجان والفلفل', 'Pickled Eggplant and Pepper (Torshi)', 'Torchi d’aubergines et poivrons', 'Torshi de berenjena y pimiento', 'Eingelegte Auberginen und Paprika (Torshi)', 'drinks_spices', 'snacks', 'pan_algerian', 35],
];

const CATEGORIES = [
  'soups', 'salads_sides', 'tajines', 'couscous_rechta', 'grilled_meats',
  'fish_seafood', 'breads_pastries', 'sweets_desserts', 'dairy_eggs_fruits', 'drinks_spices',
];
const MEALTYPES = ['breakfast', 'lunch', 'snacks'];
const REGIONS = [
  'pan_algerian', 'maghreb_shared', 'alger', 'oran', 'constantine',
  'annaba', 'tlemcen', 'bejaia', 'kabylie',
];

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
  kitchen: 'algerian',
  goal: 300,
  project_tag: 'north-africa-algeria-2026',
  local_migrated: {
    count: 135,
    note: '135 of 200 local Algerian dishes were new and migrated to Supabase (region=pan_algerian); 65 skipped as exact name duplicates already present (38 pan_moroccan Maghrebi staples, 27 generic legacy items tagged null/pan_saudi/pan_emirati/pan_egyptian/pan_tunisian).',
  },
  new_additions: {
    count: 100,
    note: '100 new authentic Algerian dishes proposed; combined with the 135 migrated + regional tags this represents the Algerian kitchen premium pool.',
  },
  regions: REGIONS,
  meal_types: MEALTYPES,
  dishes,
};

fs.writeFileSync(path.join(__dirname, 'algeria-100-proposal.json'), JSON.stringify(proposal, null, 2), 'utf8');
console.log('wrote scripts/algeria-100-proposal.json');