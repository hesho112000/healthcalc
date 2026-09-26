// Authoring script: generates scripts/jordan-200-proposal.json (200 new authentic Jordanian
// dishes) for the Dry Run. Row = [name_ar, name_en, name_fr, name_es, name_de, category,
// mealType, region, cal_100]. Consumed by scripts/validate-lebanon-150.js (dry run only,
// no DB writes).
//
// Region scheme: golden rule = keep it general (pan_jordanian). Regional anchors: irbid
// (Hawran kishk & soups), karak (jameed), jerash (maftoul), aqaba (Red Sea seafood),
// plus 4 deliberately shared rows (levantine_shared / mena_shared) that will be credited to
// the Jordanian card via the 'levant-jordan-2026' source prefix.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (ar, en, fr, es, de, category, mealType, region, cal_100) => ({
  name_ar: ar, name_en: en, name_fr: fr, name_es: es, name_de: de,
  category, mealType, region, cal_100,
});

const ROWS = [
  // ---------- mezze_appetizers (25) ----------
  R('حمص المدور الأردني', 'Jordanian round hummus', 'Houmous jordanien relevé', 'Hummus redondo jordano', 'Jordanisches Teller-Hummus', 'mezze_appetizers', 'snacks', 'pan_jordanian', 165),
  R('متبل الباذنجان بالرمان البلدي', 'Eggplant mutabal with pomegranate', 'Moutabal à la grenade', 'Mutabal con granada', 'Mutabal mit Granatapfel', 'mezze_appetizers', 'snacks', 'pan_jordanian', 95),
  R('محمرة الجوز بالفلفل الحلو الأردنية', 'Jordanian muhammara with sweet pepper', 'Muhammara jordanienne aux poivrons doux', 'Muhammara jordana con pimiento dulce', 'Jordanische Muhammara mit süßem Paprika', 'mezze_appetizers', 'snacks', 'pan_jordanian', 190),
  R('بابا غنوج بالطحينة والزيت البلدي', 'Baba ghanoush with tahini and olive oil', 'Baba ganoush au tahini', 'Baba ghanoush con tahini', 'Baba-Ghanoush mit Tahini', 'mezze_appetizers', 'snacks', 'pan_jordanian', 100),
  R('لبنة الجميد الملكية', 'Royal jameed labneh cream', 'Crème de labneh au jameed', 'Crema de labneh con jameed', 'Jameed-Labneh-Creme', 'mezze_appetizers', 'snacks', 'karak', 120),
  R('لبنة بالفلفل الحار البلدي', 'Labneh with hot pepper', 'Labneh au piment', 'Labneh con chile', 'Labneh mit Chili', 'mezze_appetizers', 'snacks', 'pan_jordanian', 105),
  R('شنكليش بالبصل والفلفل الأردني', 'Jordanian shanklish with onion and pepper', 'Chanklich à loignon et au poivron', 'Shanklish con cebolla y pimiento', 'Shanklish mit Zwiebel und Paprika', 'mezze_appetizers', 'snacks', 'pan_jordanian', 145),
  R('فتة الحمص باللبنة الأردنية', 'Hummus fatteh with labneh', 'Fatteh houmous au labneh', 'Fatteh de hummus con labneh', 'Hummus-Fatteh mit Labneh', 'mezze_appetizers', 'snacks', 'pan_jordanian', 175),
  R('فتة الباذنجان المدخن', 'Smoked eggplant fatteh', 'Fatteh daubergine fumée', 'Fatteh de berenjena ahumada', 'Fatteh mit geräucherter Aubergine', 'mezze_appetizers', 'snacks', 'pan_jordanian', 130),
  R('مكدوس الجرشي بالزيت البلدي', 'Jerash makdous in olive oil', 'Makdous de Jerash à lhuile dolive', 'Makdus de Jerash en aceite de oliva', 'Jerash-Makdous in Olivenöl', 'mezze_appetizers', 'snacks', 'jerash', 150),
  R('ليمون مخلل بلدي', 'Village pickled lemons', 'Citrons confits du terroir', 'Limones encurtidos', 'Eingelegte Zitronen', 'mezze_appetizers', 'snacks', 'pan_jordanian', 30),
  R('جبنة بالزعتر البلدي', 'Cheese with village zaatar', 'Fromage au zaatar du terroir', 'Queso con zaatar del campo', 'Käse mit Zaatar', 'mezze_appetizers', 'snacks', 'pan_jordanian', 160),
  R('حلوم مشوي بالزعتر البلدي', 'Grilled halloumi with zaatar', 'Halloumi grillé au zaatar', 'Halloumi a la parrilla con zaatar', 'Gegrillter Halloumi mit Zaatar', 'mezze_appetizers', 'snacks', 'pan_jordanian', 200),
  R('سمبوسك الجبنة المملحة', 'Salty cheese sambousek', 'Sambousek au fromage salé', 'Sambusek de queso salado', 'Sambousek mit Salzkäse', 'mezze_appetizers', 'snacks', 'pan_jordanian', 180),
  R('فطاير السبانخ بالجوز الأردني', 'Jordanian spinach pastries with walnuts', 'Fatayer aux épinards et noix', 'Fatayer de espinacas con nueces', 'Spinat-Fatayer mit Walnüssen', 'mezze_appetizers', 'snacks', 'pan_jordanian', 185),
  R('مقانق البلدية بالثوم', 'Village makanek with garlic', 'Makanek du terroir à lail', 'Makanek caseros con ajo', 'Dorf-Makanek mit Knoblauch', 'mezze_appetizers', 'snacks', 'pan_jordanian', 175),
  R('سجق بلدي بالبندورة والفلفل', 'Village soujouk with tomato and pepper', 'Soujouk à la tomate et au poivron', 'Soujouk con tomate y pimiento', 'Soujouk mit Tomate und Paprika', 'mezze_appetizers', 'snacks', 'pan_jordanian', 190),
  R('قاورما باللبنة البلدية', 'Kawarma with labneh', 'Kawarma au labneh', 'Kawarma con labneh', 'Kawarma mit Labneh', 'mezze_appetizers', 'snacks', 'pan_jordanian', 190),
  R('زيتون بلدي بالزيت والليمون', 'Olives with lemon and oil', 'Olives au citron et à lhuile', 'Aceitunas con limón y aceite', 'Oliven mit Zitrone und Öl', 'mezze_appetizers', 'snacks', 'pan_jordanian', 75),
  R('مخلل اللفت البلدي', 'Pickled turnips', 'Navets marinés', 'Nabos encurtidos', 'Eingelegte Rüben', 'mezze_appetizers', 'snacks', 'pan_jordanian', 30),
  R('طرشي الجزر البلدي', 'Pickled carrots', 'Carottes marinées', 'Zanahorias encurtidas', 'Eingelegte Karotten', 'mezze_appetizers', 'snacks', 'pan_jordanian', 35),
  R('فول مدمس بالزيت البلدي', 'Ful medames with olive oil', 'Foul moudammas à lhuile dolive', 'Ful medames con aceite de oliva', 'Ful-Mudammas mit Olivenöl', 'mezze_appetizers', 'snacks', 'pan_jordanian', 120),
  R('حمص بالفلفل الحار البلدي', 'Spicy chickpea hummus', 'Houmous piquant', 'Hummus picante', 'Scharfes Hummus', 'mezze_appetizers', 'snacks', 'pan_jordanian', 125),
  R('بطاطا الحرّة البلدية', 'Village batata harra', 'Batata harra du terroir', 'Batata harra casera', 'Dorf-Batata-Harra', 'mezze_appetizers', 'snacks', 'pan_jordanian', 110),
  R('خيار بلدي بالزبادي والثوم', 'Cucumber with yogurt and garlic', 'Concombre au yaourt et à lail', 'Pepino con yogur y ajo', 'Gurke mit Joghurt und Knoblauch', 'mezze_appetizers', 'snacks', 'pan_jordanian', 50),

  // ---------- salads (18) ----------
  R('سلطة البندورة والبقدونس البلدي', 'Tomato and parsley salad', 'Salade de tomates au persil', 'Ensalada de tomate y perejil', 'Tomaten-Petersilien-Salat', 'salads', 'snacks', 'pan_jordanian', 45),
  R('سلطة الخيار باللبنة البلدي', 'Cucumber and labneh salad', 'Salade de concombre au labneh', 'Ensalada de pepino con labneh', 'Gurken-Labneh-Salat', 'salads', 'snacks', 'pan_jordanian', 55),
  R('سلطة الجرجير بالجوز البلدي', 'Rocket salad with walnuts', 'Salade de roquette aux noix', 'Ensalada de rúcula con nueces', 'Rucolasalat mit Walnüssen', 'salads', 'snacks', 'pan_jordanian', 42),
  R('سلطة الحمص والبقدونس الأردنية', 'Jordanian chickpea and parsley salad', 'Salade de pois chiches au persil', 'Ensalada de garbanzos y perejil', 'Kichererbsen-Petersilien-Salat', 'salads', 'snacks', 'pan_jordanian', 120),
  R('سلطة الباذنجان المشوي بالرمان البلدي', 'Grilled eggplant salad with pomegranate', 'Salade daubergine grillée à la grenade', 'Ensalada de berenjena asada con granada', 'Gegrillter Auberginensalat mit Granatapfel', 'salads', 'snacks', 'pan_jordanian', 85),
  R('سلطة الكوسا بالخل البلدي', 'Courgette salad with vinegar', 'Salade de courgettes au vinaigre', 'Ensalada de calabacín con vinagre', 'Zucchinisalat mit Essig', 'salads', 'snacks', 'pan_jordanian', 45),
  R('سلطة الشمندر والجوز الأردنية', 'Jordanian beetroot and walnut salad', 'Salade de betterave aux noix', 'Ensalada de remolacha con nueces', 'Rote-Bete-Walnuss-Salat', 'salads', 'snacks', 'pan_jordanian', 70),
  R('سلطة العدس الحارة الأردنية', 'Jordanian spicy lentil salad', 'Salade de lentilles piquante', 'Ensalada de lentejas picante', 'Scharfer Linsensalat', 'salads', 'snacks', 'pan_jordanian', 80),
  R('سلطة البرغل بالنعناع', 'Bulgur salad with mint', 'Salade de boulgour à la menthe', 'Ensalada de bulgur con menta', 'Bulgursalat mit Minze', 'salads', 'snacks', 'pan_jordanian', 115),
  R('سلطة الفريكة بالخضار البلدي', 'Freekeh salad with vegetables', 'Salade de freekeh aux légumes', 'Ensalada de freekeh con verduras', 'Freekeh-Gemüsesalat', 'salads', 'snacks', 'pan_jordanian', 70),
  R('سلطة الملفوف البنفسجي', 'Purple cabbage salad', 'Salade de chou rouge', 'Ensalada de col morada', 'Rotkohlsalat', 'salads', 'snacks', 'pan_jordanian', 60),
  R('سلطة الجزر بالعسل الأردنية', 'Carrot salad with honey', 'Salade de carottes au miel', 'Ensalada de zanahoria con miel', 'Karottensalat mit Honig', 'salads', 'snacks', 'pan_jordanian', 55),
  R('سلطة السلق البلدي', 'Swiss chard salad', 'Salade de blettes', 'Ensalada de acelgas', 'Mangoldsalat', 'salads', 'snacks', 'pan_jordanian', 40),
  R('سلطة الفاصولياء الخضراء البلدي', 'Green bean salad', 'Salade de haricots verts', 'Ensalada de judías verdes', 'Grüner Bohnensalat', 'salads', 'snacks', 'pan_jordanian', 65),
  R('سلطة البطاطا بالخل الأردنية', 'Jordanian potato salad with vinegar', 'Salade de pommes de terre au vinaigre', 'Ensalada de patatas con vinagre', 'Kartoffelsalat mit Essig', 'salads', 'snacks', 'pan_jordanian', 110),
  R('سلطة الرجلة بالنعناع البلدي', 'Purslane salad with mint', 'Salade de pourpier à la menthe', 'Ensalada de verdolaga con menta', 'Portulak-Salat mit Minze', 'salads', 'snacks', 'pan_jordanian', 35),
  R('سلطة القرع المحمص', 'Roasted pumpkin salad', 'Salade de potiron rôti', 'Ensalada de calabaza asada', 'Gerösteter Kürbissalat', 'salads', 'snacks', 'pan_jordanian', 70),
  R('سلطة الباذنجان المدخن بالطحينة', 'Smoked eggplant salad with tahini', 'Salade daubergine fumée au tahini', 'Ensalada de berenjena ahumada con tahini', 'Geräucherter Auberginensalat mit Tahini', 'salads', 'snacks', 'pan_jordanian', 90),

  // ---------- soups (14) ----------
  R('شوربة العدس بالبصل المقلي الأردنية', 'Jordanian lentil soup with fried onions', 'Soupe de lentilles aux oignons frits', 'Sopa de lentejas con cebolla frita', 'Jordanische Linsensuppe mit gebratenen Zwiebeln', 'soups', 'dinner', 'pan_jordanian', 85),
  R('شوربة العدس بالليمون الأردنية', 'Jordanian lentil soup with lemon', 'Soupe de lentilles au citron', 'Sopa de lentejas con limón', 'Linsensuppe mit Zitrone', 'soups', 'dinner', 'pan_jordanian', 80),
  R('شوربة الخضار البلدي', 'Village vegetable soup', 'Soupe de légumes du terroir', 'Sopa de verduras casera', 'Dorf-Gemüsesuppe', 'soups', 'dinner', 'pan_jordanian', 55),
  R('شوربة الدجاج بالشعيرية البلدي', 'Chicken soup with vermicelli', 'Soupe de poulet aux vermicelles', 'Sopa de pollo con fideos', 'Hühnersuppe mit Fadennudeln', 'soups', 'dinner', 'pan_jordanian', 70),
  R('شوربة لسان العصفور بالدجاج', 'Orzo and chicken soup', 'Soupe poulet orzo', 'Sopa de pollo y orzo', 'Orzo-Hühnersuppe', 'soups', 'dinner', 'levantine_shared', 75),
  R('شوربة الفريكة باللحم البلدي', 'Freekeh soup with meat', 'Soupe de freekeh à la viande', 'Sopa de freekeh con carne', 'Freekeh-Suppe mit Fleisch', 'soups', 'dinner', 'pan_jordanian', 90),
  R('شوربة الكشك الإربدية', 'Irbid kishk soup', 'Soupe de kishk dIrbid', 'Sopa de kishk de Irbid', 'Irbid-Kishk-Suppe', 'soups', 'dinner', 'irbid', 110),
  R('الشوربة الحورانية', 'Hawran soup', 'Soupe du Hawran', 'Sopa de Haurán', 'Hawran-Suppe', 'soups', 'dinner', 'irbid', 100),
  R('شوربة الحمص بالطحينة الأردنية', 'Chickpea soup with tahini', 'Soupe de pois chiches au tahini', 'Sopa de garbanzos con tahini', 'Kichererbsensuppe mit Tahini', 'soups', 'dinner', 'pan_jordanian', 95),
  R('شوربة البندورة بالبصل الأردنية', 'Tomato and onion soup', 'Soupe de tomate à loignon', 'Sopa de tomate con cebolla', 'Tomaten-Zwiebel-Suppe', 'soups', 'dinner', 'pan_jordanian', 60),
  R('شوربة البازيلاء البلدي', 'Village pea soup', 'Soupe de petits pois du terroir', 'Sopa de guisantes casera', 'Dorf-Erbsensuppe', 'soups', 'dinner', 'pan_jordanian', 65),
  R('شوربة الذرة بالكريمة البلدي', 'Creamy corn soup', 'Soupe de maïs crémeuse', 'Sopa cremosa de maíz', 'Cremige Maiscremesuppe', 'soups', 'dinner', 'pan_jordanian', 85),
  R('شوربة القرع بالزنجبيل', 'Pumpkin soup with ginger', 'Soupe de potiron au gingembre', 'Sopa de calabaza con jengibre', 'Kürbissuppe mit Ingwer', 'soups', 'dinner', 'pan_jordanian', 55),
  R('شوربة السبانخ بالليمون البلدي', 'Spinach soup with lemon', 'Soupe dépinards au citron', 'Sopa de espinacas con limón', 'Spinat-Limonensuppe', 'soups', 'dinner', 'pan_jordanian', 50),

  // ---------- kibbeh_dishes (22) ----------
  R('كبيبة نابلسية بالبرغل', 'Nablusi kibbeh with bulgur', 'Kibbeh nabulsi au boulgour', 'Kibbeh nabulsi con bulgur', 'Nabulsi-Kibbeh mit Bulgur', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 195),
  R('كبيبة نابلسية بالجوز', 'Nablusi kibbeh with walnuts', 'Kibbeh nabulsi aux noix', 'Kibbeh nabulsi con nueces', 'Nabulsi-Kibbeh mit Walnüssen', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 185),
  R('كبة محشية باللحم البلدي', 'Kibbeh stuffed with village meat', 'Kibbeh farci à la viande', 'Kibbeh relleno de carne', 'Kibbeh mit Fleisch gefüllt', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 195),
  R('كبة بلبن الأردنية', 'Kibbeh in Jordanian yogurt laban', 'Kibbeh au laban jordanien', 'Kibbeh en laban jordano', 'Jordanisches Kibbeh in Laban', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 165),
  R('كبة بالطحينة الأردنية', 'Kibbeh with tahini sauce', 'Kibbeh au tahini', 'Kibbeh con salsa de tahini', 'Kibbeh mit Tahini-Sauce', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 185),
  R('كبة الكراوي البلدي', 'Village fried kibbeh', 'Kibbeh krouniyeh du terroir', 'Kibbeh frito casero', 'Gebratenes Dorf-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 160),
  R('كبة مقلية بالبقدونس', 'Fried kibbeh with parsley', 'Kibbeh frit au persil', 'Kibbeh frito con perejil', 'Frittiertes Kibbeh mit Petersilie', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 210),
  R('كبة النية الأردنية', 'Jordanian raw kibbeh', 'Kibbeh nayé jordanien', 'Kibbeh crudo jordano', 'Jordanisches rohes Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 155),
  R('كبة بالبصل والسماق البلدي', 'Kibbeh with onion and sumac', 'Kibbeh à loignon et au sumac', 'Kibbeh con cebolla y suma', 'Kibbeh mit Zwiebel und Sumach', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 175),
  R('كبة الجوز الأردنية', 'Jordanian walnut kibbeh', 'Kibbeh aux noix jordanien', 'Kibbeh de nuez jordano', 'Jordanisches Walnuss-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 180),
  R('كبة الخضار الأردنية', 'Jordanian vegetable kibbeh', 'Kibbeh de légumes jordanien', 'Kibbeh de verduras jordano', 'Jordanisches Gemüse-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 145),
  R('كبة اليقطين البلدي', 'Pumpkin kibbeh', 'Kibbeh au potiron', 'Kibbeh de calabaza', 'Kürbis-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 140),
  R('كبة الفريكة البلدي', 'Freekeh kibbeh', 'Kibbeh de freekeh', 'Kibbeh de freekeh', 'Freekeh-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 150),
  R('كبة الحمص البلدي', 'Chickpea kibbeh', 'Kibbeh de pois chiches', 'Kibbeh de garbanzos', 'Kichererbsen-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 135),
  R('كبة بالقرنبيط', 'Cauliflower kibbeh', 'Kibbeh au chou-fleur', 'Kibbeh de coliflor', 'Blumenkohl-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 145),
  R('كبة السمك العقباوية', 'Aqaba fish kibbeh', 'Kibbeh de poisson dAqaba', 'Kibbeh de pescado de Áqaba', 'Akaba-Fisch-Kibbeh', 'kibbeh_dishes', 'lunch', 'aqaba', 170),
  R('كبة بالكرز الأردني', 'Jordanian cherry kibbeh', 'Kibbeh à la cerise jordanien', 'Kibbeh de cerezas jordano', 'Jordanisches Kirsch-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 190),
  R('كبة المبرومة باللحم', 'Rolled kibbeh with meat', 'Kibbeh mabrumeh à la viande', 'Kibbeh enrollado con carne', 'Gerolltes Kibbeh mit Fleisch', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 190),
  R('كبة بلبن الجميد البلدية', 'Kibbeh in jameed', 'Kibbeh au jameed', 'Kibbeh en jameed', 'Kibbeh in Jameed', 'kibbeh_dishes', 'lunch', 'karak', 170),
  R('كبة الصينية بالبندورة', 'Baked kibbeh with tomato', 'Kibbeh au four à la tomate', 'Kibbeh al horno con tomate', 'Ofen-Kibbeh mit Tomate', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 140),
  R('كبة بلحم الدجاج', 'Chicken kibbeh', 'Kibbeh au poulet', 'Kibbeh de pollo', 'Hühner-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 150),
  R('كبة البرغل بالصنوبر الأردنية', 'Bulgur kibbeh with pine nuts', 'Kibbeh au boulgour et pignons', 'Kibbeh de bulgur con piñones', 'Bulgur-Kibbeh mit Pinienkernen', 'kibbeh_dishes', 'lunch', 'pan_jordanian', 185),

  // ---------- manakish_pies (22) ----------
  R('منقوشة الزعتر البلدي الأردني', 'Jordanian zaatar manakish', 'Manakish zaatar jordanien', 'Manakish zaatar jordano', 'Jordanisches Zaatar-Manakish', 'manakish_pies', 'breakfast', 'pan_jordanian', 215),
  R('منقوشة الجبنة البيضاء البلدي', 'White cheese manakish', 'Manakish au fromage blanc', 'Manakish de queso blanco', 'Weißkäse-Manakish', 'manakish_pies', 'breakfast', 'pan_jordanian', 210),
  R('منقوشة اللحمة المفرومة البلدية', 'Minced meat manakish', 'Manakish à la viande hachée', 'Manakish de carne picada', 'Manakish mit Hackfleisch', 'manakish_pies', 'lunch', 'pan_jordanian', 240),
  R('صفيحة اللحمة بالجوز البلدي', 'Sfiha with walnuts', 'Sfiha aux noix', 'Sfiha con nueces', 'Sfiha mit Walnüssen', 'manakish_pies', 'lunch', 'pan_jordanian', 225),
  R('صفيحة اللحمة بالبندورة الأردنية', 'Tomato sfiha', 'Sfiha à la tomate', 'Sfiha con tomate', 'Sfiha mit Tomate', 'manakish_pies', 'lunch', 'pan_jordanian', 220),
  R('لحم بعجين البلدي', 'Village lahm bi ajeen', 'Lahm bi ajin du terroir', 'Lahm bi ajeen casero', 'Dorf-Lahm bi Ajeen', 'manakish_pies', 'lunch', 'pan_jordanian', 215),
  R('شومبوريك باللحمة البلدي', 'Shumburik with meat', 'Shumborak à la viande', 'Shumburik de carne', 'Shumburik mit Fleisch', 'manakish_pies', 'lunch', 'pan_jordanian', 195),
  R('كعك القدس بالزعتر البلدي', 'Jerusalem kaak with zaatar', 'Kaak de Jérusalem au zaatar', 'Kaak de Jerusalén con zaatar', 'Jerusalem-Kaak mit Zaatar', 'manakish_pies', 'breakfast', 'pan_jordanian', 235),
  R('كعك الجبن الأردني', 'Jordanian cheese kaak', 'Kaak au fromage jordanien', 'Kaak de queso jordano', 'Jordanisches Käse-Kaak', 'manakish_pies', 'breakfast', 'pan_jordanian', 230),
  R('كعك بالسمن البلدي', 'Kaak with ghee', 'Kaak au ghee', 'Kaak con ghee', 'Kaak mit Ghee', 'manakish_pies', 'breakfast', 'pan_jordanian', 240),
  R('منقوشة بالبيض والبندورة', 'Egg and tomato manakish', 'Manakish à loeuf et à la tomate', 'Manakish de huevo y tomate', 'Ei-Tomaten-Manakish', 'manakish_pies', 'breakfast', 'pan_jordanian', 205),
  R('فطيرة السبانخ بالجوز والسماق', 'Spinach pie with walnuts and sumac', 'Tarte épinards noix sumac', 'Empanada de espinacas con nueces y suma', 'Spinat-Walnuss-Sumach-Tasche', 'manakish_pies', 'breakfast', 'pan_jordanian', 190),
  R('فطيرة الجبنة بالعسل', 'Cheese pie with honey', 'Tarte au fromage et miel', 'Empanada de queso con miel', 'Käse-Honig-Pastete', 'manakish_pies', 'breakfast', 'pan_jordanian', 200),
  R('رغيف الزعترية البلدي', 'Village zaatari loaf', 'Pain zaatari du terroir', 'Pan zaatari casero', 'Dorf-Zaatar-Brot', 'manakish_pies', 'breakfast', 'pan_jordanian', 240),
  R('معجنات الكشك البلدية', 'Kishk pastries', 'Fatayer au kishk du terroir', 'Fatayer de kishk casero', 'Dorf-Kishk-Gebäck', 'manakish_pies', 'breakfast', 'pan_jordanian', 210),
  R('خبز الصاج البلدي بالزعتر', 'Saaj bread with zaatar', 'Pain saj au zaatar', 'Pan saj con zaatar', 'Saj-Brot mit Zaatar', 'manakish_pies', 'breakfast', 'pan_jordanian', 195),
  R('خبز التنور الأردني', 'Jordanian taboon bread', 'Pain tandoor jordanien', 'Pan tandoor jordano', 'Jordanisches Tandoor-Brot', 'manakish_pies', 'breakfast', 'pan_jordanian', 180),
  R('الخبز الحوراني', 'Hawran bread', 'Pain du Hawran', 'Pan de Haurán', 'Hawran-Brot', 'manakish_pies', 'breakfast', 'irbid', 190),
  R('خبز البطاطا الأردني', 'Jordanian potato bread', 'Pain de pommes de terre jordanien', 'Pan de patata jordano', 'Jordanisches Kartoffelbrot', 'manakish_pies', 'breakfast', 'pan_jordanian', 195),
  R('سمبوسك بالجبنة والأعشاب', 'Sambousek with cheese and herbs', 'Sambousek fromage et herbes', 'Sambusek de queso y hierbas', 'Sambousek mit Käse und Kräutern', 'manakish_pies', 'breakfast', 'pan_jordanian', 185),
  R('مناقيش اللبنة والزعتر', 'Labneh and zaatar manakish', 'Manakish labneh zaatar', 'Manakish de labneh y zaatar', 'Labneh-Zaatar-Manakish', 'manakish_pies', 'breakfast', 'pan_jordanian', 205),
  R('فطيرة الدجاج البلدي', 'Village chicken pie', 'Tarte au poulet du terroir', 'Empanada de pollo casera', 'Dorf-Hühnerpastete', 'manakish_pies', 'lunch', 'pan_jordanian', 220),

  // ---------- mains_grills (35) ----------
  R('منسف بالجميد البلدي', 'Mansaf with village jameed', 'Mansaf au jameed', 'Mansaf con jameed', 'Mansaf mit Jameed', 'mains_grills', 'lunch', 'pan_jordanian', 210),
  R('منسف الكرك باللحم', 'Karak mansaf with meat', 'Mansaf de Karak à la viande', 'Mansaf de Karak con carne', 'Karak-Mansaf mit Fleisch', 'mains_grills', 'lunch', 'karak', 215),
  R('منسف الدجاج بالجميد', 'Chicken mansaf with jameed', 'Mansaf de poulet au jameed', 'Mansaf de pollo con jameed', 'Hühner-Mansaf mit Jameed', 'mains_grills', 'lunch', 'pan_jordanian', 195),
  R('منسف بالخضار الموسمية', 'Mansaf with seasonal vegetables', 'Mansaf aux légumes de saison', 'Mansaf con verduras de temporada', 'Mansaf mit Saisongemüse', 'mains_grills', 'lunch', 'pan_jordanian', 150),
  R('مقلوبة اللحمة الأردنية', 'Jordanian meat maqluba', 'Maqluba daghn jordanienne', 'Maqluba de carne jordana', 'Jordanische Fleisch-Maqluba', 'mains_grills', 'lunch', 'pan_jordanian', 185),
  R('مقلوبة الدجاج بالباذنجان', 'Chicken maqluba with eggplant', 'Maqluba de poulet à laubergine', 'Maqluba de pollo con berenjena', 'Hühner-Maqluba mit Aubergine', 'mains_grills', 'lunch', 'pan_jordanian', 170),
  R('المقلوبة الحورانية', 'Hawran maqluba', 'Maqluba du Hawran', 'Maqluba de Haurán', 'Hawran-Maqluba', 'mains_grills', 'lunch', 'irbid', 175),
  R('زرب بدوي بالدجاج', 'Bedouin zarb with chicken', 'Zarb bédouin au poulet', 'Zarb beduino con pollo', 'Beduinen-Zarb mit Huhn', 'mains_grills', 'lunch', 'pan_jordanian', 165),
  R('زرب بالخضار البلدي', 'Zarb with vegetables', 'Zarb aux légumes', 'Zarb con verduras', 'Zarb mit Gemüse', 'mains_grills', 'lunch', 'pan_jordanian', 130),
  R('شيش برك بلبن الجميد', 'Shish barak in jameed', 'Chiche barak au jameed', 'Shish barak con jameed', 'Shish-Barak in Jameed', 'mains_grills', 'lunch', 'pan_jordanian', 170),
  R('كفتة بالطحينة والبطاطا الأردنية', 'Kofta with tahini and potatoes', 'Kofta au tahini et pommes de terre', 'Kofta con tahini y patatas', 'Kofta mit Tahini und Kartoffeln', 'mains_grills', 'lunch', 'pan_jordanian', 190),
  R('كفتة بالبندورة البلدي', 'Kofta with tomato', 'Kofta à la tomate', 'Kofta con tomate', 'Kofta mit Tomate', 'mains_grills', 'lunch', 'pan_jordanian', 180),
  R('كباب بلدي بالبقدونس', 'Village kebab with parsley', 'Kebab du terroir au persil', 'Kebab casero con perejil', 'Dorf-Kebab mit Petersilie', 'mains_grills', 'lunch', 'pan_jordanian', 185),
  R('كباب الكرز الأردني', 'Jordanian cherry kebab', 'Kebab cerise jordanien', 'Kebab de cerezas jordano', 'Jordanisches Kirsch-Kebab', 'mains_grills', 'lunch', 'pan_jordanian', 175),
  R('شيش طاووق بلدية بالثوم', 'Village shish taouk with garlic', 'Chiche taouk du terroir à lail', 'Shish taouk casero con ajo', 'Dorf-Shish-Taouk mit Knoblauch', 'mains_grills', 'lunch', 'pan_jordanian', 200),
  R('دجاج مشوي بالزعتر البلدي', 'Grilled chicken with zaatar', 'Poulet grillé au zaatar', 'Pollo a la parrilla con zaatar', 'Gegrilltes Hähnchen mit Zaatar', 'mains_grills', 'lunch', 'pan_jordanian', 175),
  R('فرخة محشية بالبرغل', 'Stuffed chicken with bulgur', 'Poulet farci au boulgour', 'Pollo relleno de bulgur', 'Mit Bulgur gefülltes Hähnchen', 'mains_grills', 'lunch', 'pan_jordanian', 195),
  R('حمام محشي البلدي', 'Stuffed squab', 'Pigeon farci du terroir', 'Paloma rellena casera', 'Gefüllte Wildtaube', 'mains_grills', 'lunch', 'pan_jordanian', 190),
  R('أرنب مشوي بالثوم', 'Grilled rabbit with garlic', 'Lapin grillé à lail', 'Conejo a la parrilla con ajo', 'Gegrilltes Kaninchen mit Knoblauch', 'mains_grills', 'lunch', 'pan_jordanian', 160),
  R('فروج بالأعشاب البلدية', 'Chicken with village herbs', 'Poulet aux herbes du terroir', 'Pollo con hierbas caseras', 'Hähnchen mit Dorfkräutern', 'mains_grills', 'lunch', 'pan_jordanian', 170),
  R('داوود باشا بالبندورة الأردني', 'Jordanian daoud pasha', 'Daoud bacha à la tomate', 'Daoud basha con tomate', 'Daoud-Pascha mit Tomate', 'mains_grills', 'lunch', 'pan_jordanian', 185),
  R('لحم العجل بالبصل البلدي', 'Veal with onion', 'Veau à loignon', 'Ternera con cebolla', 'Kalb mit Zwiebeln', 'mains_grills', 'lunch', 'pan_jordanian', 175),
  R('كريشة بالبندورة البلدي', 'Tripe with tomato', 'Tripes à la tomate', 'Callos con tomate', 'Kutteln mit Tomate', 'mains_grills', 'lunch', 'pan_jordanian', 170),
  R('كبدة غنم بالخل البلدي', 'Lamb liver with vinegar', 'Foie dagneau au vinaigre', 'Hígado de cordero con vinagre', 'Lammleber mit Essig', 'mains_grills', 'lunch', 'pan_jordanian', 160),
  R('محاشي الكوسا بالجميد', 'Stuffed courgettes in jameed', 'Courgettes farcies au jameed', 'Calabacines rellenos con jameed', 'Gefüllte Zucchini in Jameed', 'mains_grills', 'lunch', 'pan_jordanian', 155),
  R('محشي الفليفلة الخضراء', 'Stuffed green peppers', 'Poivrons verts farcis', 'Pimientos verdes rellenos', 'Gefüllte grüne Paprika', 'mains_grills', 'lunch', 'pan_jordanian', 145),
  R('محشي ورق العنب بالجميد', 'Stuffed vine leaves in jameed', 'Feuilles de vigne farcies au jameed', 'Hojas de parra rellenas con jameed', 'Gefüllte Weinblätter in Jameed', 'mains_grills', 'lunch', 'pan_jordanian', 155),
  R('باذنجان محشي باللحم البلدي', 'Eggplant stuffed with meat', 'Aubergine farcie à la viande', 'Berenjena rellena de carne', 'Mit Fleisch gefüllte Aubergine', 'mains_grills', 'lunch', 'pan_jordanian', 150),
  R('ملوخية بالدجاج الأردنية', 'Jordanian mlukhiyeh with chicken', 'Mlukhiyeh au poulet jordanien', 'Mlukhiya con pollo jordana', 'Jordanisches Mlukhiye mit Huhn', 'mains_grills', 'lunch', 'pan_jordanian', 135),
  R('فريكة باللحمة البلدية', 'Freekeh with meat', 'Freekeh à la viande', 'Freekeh con carne', 'Freekeh mit Fleisch', 'mains_grills', 'lunch', 'pan_jordanian', 165),
  R('قلاية بندورة باللحمة', 'Qalayet bandora with meat', 'Qalayet bandora à la viande', 'Qalayet bandura con carne', 'Tomaten-Galayet mit Fleisch', 'mains_grills', 'lunch', 'pan_jordanian', 140),
  R('الرشوف البلدي بالجوز', 'Rshaif with walnuts', 'Rshaif aux noix', 'Rshaif con nueces', 'Rshaif mit Walnüssen', 'mains_grills', 'lunch', 'pan_jordanian', 130),
  R('مسخن الدجاج بالبصل والسماق', 'Chicken musakhan with onion and sumac', 'Mousakhan poulet oignons sumac', 'Musakhan de pollo con cebolla y suma', 'Hühner-Musakhan mit Zwiebel und Sumach', 'mains_grills', 'lunch', 'levantine_shared', 185),
  R('خروف محشي بالبرغل والمكسرات', 'Stuffed lamb with bulgur and nuts', 'Agneau farci au boulgour', 'Cordero relleno de bulgur y frutos secos', 'Mit Bulgur und Nüssen gefülltes Lamm', 'mains_grills', 'lunch', 'pan_jordanian', 210),
  R('لحم بالفرن مع البطاطا البلدي', 'Oven lamb with potatoes', 'Viande au four avec pommes de terre', 'Carne al horno con patatas', 'Ofenlamm mit Kartoffeln', 'mains_grills', 'lunch', 'pan_jordanian', 185),

  // ---------- rice_dishes (22) ----------
  R('رز المفلفل الحوراني', 'Hawran vermicelli rice', 'Riz du Hawran aux vermicelles', 'Arroz de Haurán con fideos', 'Hawran-Fadennudeln-Reis', 'rice_dishes', 'lunch', 'irbid', 165),
  R('رز بالجميد بلبن المنسف', 'Rice in mansaf jameed', 'Riz au jameed du mansaf', 'Arroz con jameed de mansaf', 'Mansaf-Jameed-Reis', 'rice_dishes', 'lunch', 'pan_jordanian', 170),
  R('رز أصفر بالبهارات البلدية', 'Spiced yellow rice', 'Riz jaune aux épices', 'Arroz amarillo especiado', 'Gewürzter gelber Reis', 'rice_dishes', 'lunch', 'pan_jordanian', 150),
  R('عدس بالرز البلدي', 'Lentil rice', 'Riz aux lentilles', 'Arroz con lentejas', 'Reis mit Linsen', 'rice_dishes', 'lunch', 'pan_jordanian', 150),
  R('الرز الأبيض بالزيت البلدي', 'White rice with oil', 'Riz blanc à lhuile', 'Arroz blanco con aceite', 'Weißer Reis mit Öl', 'rice_dishes', 'lunch', 'pan_jordanian', 145),
  R('رز باللوز والصنوبر البلدي', 'Rice with almonds and pine nuts', 'Riz aux amandes et pignons', 'Arroz con almendras y piñones', 'Reis mit Mandeln und Pinienkernen', 'rice_dishes', 'lunch', 'pan_jordanian', 170),
  R('مندي اللحمة الأردني', 'Jordanian lamb mandi', 'Mandi daghn jordanien', 'Mandi de carne jordano', 'Jordanisches Lamm-Mandi', 'rice_dishes', 'lunch', 'pan_jordanian', 190),
  R('كبسة اللحم البلدي', 'Village meat kabsa', 'Kabsa à la viande', 'Kabsa con carne', 'Kabsa mit Fleisch', 'rice_dishes', 'lunch', 'pan_jordanian', 185),
  R('مجدرة بلدية بالعدس', 'Village mujaddara', 'Moudjaddara du terroir', 'Mujaddara casera', 'Dorf-Mujaddara', 'rice_dishes', 'lunch', 'pan_jordanian', 155),
  R('برغل البلدي بالخضار', 'Bulgur with vegetables', 'Boulgour aux légumes', 'Bulgur con verduras', 'Bulgur mit Gemüse', 'rice_dishes', 'lunch', 'pan_jordanian', 150),
  R('فريكة بالدجاج البلدي', 'Freekeh with chicken', 'Freekeh au poulet', 'Freekeh con pollo', 'Freekeh mit Huhn', 'rice_dishes', 'lunch', 'pan_jordanian', 160),
  R('رز الحشوة بالبرغل البلدي', 'Rice stuffing with bulgur', 'Farce de riz au boulgour', 'Relleno de arroz con bulgur', 'Reis-Bulgur-Füllung', 'rice_dishes', 'lunch', 'pan_jordanian', 160),
  R('مفتول الجرشي بالدجاج', 'Jerash maftoul with chicken', 'Mafloul de Jerash au poulet', 'Maftul de Jerash con pollo', 'Jerash-Maftoul mit Huhn', 'rice_dishes', 'lunch', 'jerash', 165),
  R('مفتول بالخضار البلدي', 'Maftoul with vegetables', 'Mafloul aux légumes', 'Maftul con verduras', 'Maftoul mit Gemüse', 'rice_dishes', 'lunch', 'pan_jordanian', 150),
  R('الرز بالحليب الأردني', 'Jordanian rice pudding', 'Riz au lait jordanien', 'Arroz con leche jordano', 'Jordanischer Milchreis', 'rice_dishes', 'lunch', 'pan_jordanian', 150),
  R('البرغل باللبن البلدي', 'Bulgur in yogurt', 'Boulgour au laban', 'Bulgur en yogur', 'Bulgur in Joghurt', 'rice_dishes', 'lunch', 'pan_jordanian', 140),
  R('رز بالسبانخ والثوم البلدي', 'Rice with spinach and garlic', 'Riz aux épinards et à lail', 'Arroz con espinacas y ajo', 'Reis mit Spinat und Knoblauch', 'rice_dishes', 'lunch', 'pan_jordanian', 145),
  R('رز بالقرنبيط المشوي', 'Rice with grilled cauliflower', 'Riz au chou-fleur grillé', 'Arroz con coliflor asada', 'Reis mit gegrilltem Blumenkohl', 'rice_dishes', 'lunch', 'pan_jordanian', 155),
  R('رز البندورة الحارة البلدي', 'Spicy tomato rice', 'Riz à la tomate piquante', 'Arroz picante de tomate', 'Scharfer Tomatenreis', 'rice_dishes', 'lunch', 'pan_jordanian', 160),
  R('رز بالجزر والبازيلاء البلدي', 'Rice with carrots and peas', 'Riz aux carottes et petits pois', 'Arroz con zanahorias y guisantes', 'Reis mit Karotten und Erbsen', 'rice_dishes', 'lunch', 'pan_jordanian', 150),
  R('رز محمر بالفستق البلدي', 'Golden rice with pistachio', 'Riz doré aux pistaches', 'Arroz dorado con pistachos', 'Goldener Pistazien-Reis', 'rice_dishes', 'lunch', 'pan_jordanian', 175),
  R('الفريكة بالبندورة البلدي', 'Freekeh with tomato', 'Freekeh à la tomate', 'Freekeh con tomate', 'Freekeh mit Tomate', 'rice_dishes', 'lunch', 'pan_jordanian', 155),

  // ---------- fish_seafood (12) ----------
  R('سماكة حرة العقباوية', 'Aqaba samakeh harrah', 'Samakeh harrah dAqaba', 'Samakeh harrah de Áqaba', 'Akaba-Samakeh-Harrah', 'fish_seafood', 'lunch', 'aqaba', 180),
  R('سمك حرة بالطحينة', 'Fish harrah with tahini', 'Poisson harrah au tahini', 'Pescado harrah con tahini', 'Fisch-Harrah mit Tahini', 'fish_seafood', 'lunch', 'aqaba', 175),
  R('جمبري العقبة المشوي بالثوم', 'Grilled Aqaba prawns with garlic', 'Crevettes dAqaba grillées à lail', 'Camarones de Áqaba con ajo', 'Knoblauch-Grillgarnelen aus Akaba', 'fish_seafood', 'lunch', 'aqaba', 135),
  R('سمك مشوي على جمر الفحم', 'Charcoal flame fish', 'Poisson grillé à la braise', 'Pescado a la brasa de carbón', 'Fisch über Holzkohle gegrillt', 'fish_seafood', 'lunch', 'pan_jordanian', 175),
  R('سمك مقلي بالزيت الأردني', 'Jordanian fried fish in oil', 'Poisson frit à lhuile jordanien', 'Pescado frito en aceite jordano', 'Jordanischer Fisch in Öl gebraten', 'fish_seafood', 'lunch', 'pan_jordanian', 190),
  R('سلطان إبراهيم العقباوي', 'Aqaba red mullet', 'Rouget dAqaba', 'Salmonete de Áqaba', 'Akaba-Rotbarbe', 'fish_seafood', 'lunch', 'aqaba', 150),
  R('سردين مشوي بالزعتر البلدي', 'Grilled sardines with zaatar', 'Sardines grillées au zaatar', 'Sardinas a la parrilla con zaatar', 'Gegrillte Sardinen mit Zaatar', 'fish_seafood', 'lunch', 'pan_jordanian', 185),
  R('روبيان بالبصل البلدي', 'Prawns with onion', 'Crevettes à loignon', 'Camarones con cebolla', 'Garnelen mit Zwiebeln', 'fish_seafood', 'lunch', 'pan_jordanian', 130),
  R('حبار مقرمش بالليمون', 'Crispy squid with lemon', 'Calamars croustillants au citron', 'Calamares crujientes con limón', 'Knuspriger Tintenfisch mit Zitrone', 'fish_seafood', 'lunch', 'pan_jordanian', 160),
  R('صيادية العقبة', 'Aqaba sayyadieh', 'Sayadieh dAqaba', 'Sayadieh de Áqaba', 'Akaba-Sayyadieh', 'fish_seafood', 'lunch', 'aqaba', 160),
  R('بلطي محشي بالفلفل', 'Tilapia stuffed with peppers', 'Tilapia farcie au poivron', 'Tilapia rellena de pimiento', 'Mit Paprika gefüllte Tilapia', 'fish_seafood', 'lunch', 'pan_jordanian', 165),
  R('بلطي بالبندورة البلدي', 'Tilapia with tomato', 'Tilapia à la tomate', 'Tilapia con tomate', 'Tilapia mit Tomate', 'fish_seafood', 'lunch', 'pan_jordanian', 150),

  // ---------- sweets_desserts (24) ----------
  R('كنافة نابلسية بالفستق', 'Nablusi knafeh with pistachio', 'Knafeh nabulsi aux pistaches', 'Canafe nabulsi con pistachos', 'Nablus-Kanafeh mit Pistazien', 'sweets_desserts', 'snacks', 'pan_jordanian', 260),
  R('كنافة نابلسية بالجبن الحلو', 'Nablusi knafeh with sweet cheese', 'Knafeh nabulsi au fromage sucré', 'Canafe nabulsi con queso dulce', 'Nablus-Kanafeh mit Süßkäse', 'sweets_desserts', 'snacks', 'pan_jordanian', 255),
  R('حلاوة الجبن الأردنية', 'Jordanian halawet el jibn', 'Halawet el jibn jordanien', 'Halawet el jibn jordano', 'Jordanisches Halawet el Jibn', 'sweets_desserts', 'snacks', 'pan_jordanian', 250),
  R('البقلاوة الأردنية بالجوز', 'Jordanian walnut baklava', 'Baklava jordanienne aux noix', 'Baklava jordana con nueces', 'Jordanisches Walnuss-Baklava', 'sweets_desserts', 'snacks', 'pan_jordanian', 325),
  R('غريبة بالجوز الأردنية', 'Jordanian walnut ghraybeh', 'Ghraybeh aux noix jordanien', 'Ghuraiba de nuez jordana', 'Jordanisches Walnuss-Ghuraiba', 'sweets_desserts', 'snacks', 'pan_jordanian', 315),
  R('برازق السمسم بالعسل البلدي', 'Sesame barazek with honey', 'Barazek sésame miel', 'Barazek de sésamo con miel', 'Sesam-Barazek mit Honig', 'sweets_desserts', 'snacks', 'pan_jordanian', 340),
  R('معمول الجوز البلدي', 'Walnut maamoul', 'Maamoul aux noix', 'Maamoul de nuez', 'Walnuss-Maamoul', 'sweets_desserts', 'snacks', 'pan_jordanian', 265),
  R('معمول التمر الأردني', 'Jordanian date maamoul', 'Maamoul aux dattes jordanien', 'Maamoul de dátiles jordano', 'Jordanisches Dattel-Maamoul', 'sweets_desserts', 'snacks', 'pan_jordanian', 250),
  R('معمول الفستق البلدي', 'Pistachio maamoul', 'Maamoul aux pistaches', 'Maamoul de pistacho', 'Pistazien-Maamoul', 'sweets_desserts', 'snacks', 'pan_jordanian', 270),
  R('سفوف بالسميد والحليب البلدي', 'Semolina sfouf with milk', 'Sfouf à la semoule et au lait', 'Sfouf de sémola con leche', 'Grieß-Sfouf mit Milch', 'sweets_desserts', 'snacks', 'pan_jordanian', 285),
  R('النمورة الأردنية', 'Jordanian nammoura', 'Nammoura jordanienne', 'Nammura jordana', 'Jordanische Nammoura', 'sweets_desserts', 'snacks', 'pan_jordanian', 240),
  R('شعبيات بالجوز البلدي', 'Walnut shaabiyat', 'Cheabiyat aux noix', 'Shaabiyat de nuez', 'Walnuss-Shaabiyat', 'sweets_desserts', 'snacks', 'pan_jordanian', 295),
  R('الحلاوة الطحينية بالجوز', 'Tahini halva with walnuts', 'Halva au tahini et noix', 'Halva de tahini con nueces', 'Tahini-Halva mit Walnüssen', 'sweets_desserts', 'snacks', 'pan_jordanian', 265),
  R('طحينية بالعسل البلدي', 'Tahini with honey', 'Tahini au miel', 'Tahini con miel', 'Tahini mit Honig', 'sweets_desserts', 'snacks', 'pan_jordanian', 270),
  R('مغلي الأردني بالزعفران', 'Jordanian meghli with saffron', 'Meghli jordanien au safran', 'Meghli jordano con azafrán', 'Jordanisches Meghli mit Safran', 'sweets_desserts', 'snacks', 'pan_jordanian', 165),
  R('مهلبية بالورد والمكسرات', 'Rose muhallabieh with nuts', 'Muhallabieh à leau de rose', 'Muhalabiya de agua de rosas', 'Rosenwasser-Muhallabieh', 'sweets_desserts', 'snacks', 'pan_jordanian', 130),
  R('رز بحليب بالزعفران البلدي', 'Saffron rice pudding', 'Riz au lait au safran', 'Arroz con leche con azafrán', 'Safran-Milchreis', 'sweets_desserts', 'snacks', 'pan_jordanian', 155),
  R('قطايف بالجبنة الحلوة البلدي', 'Sweet cheese qatayef', 'Qatayef au fromage sucré', 'Qatayef con queso dulce', 'Süßkäse-Qatayef', 'sweets_desserts', 'snacks', 'pan_jordanian', 255),
  R('قطايف بالفستق والعسل', 'Pistachio qatayef with honey', 'Qatayef pistaches miel', 'Qatayef de pistacho con miel', 'Pistazien-Qatayef mit Honig', 'sweets_desserts', 'snacks', 'pan_jordanian', 260),
  R('كعك العسل البلدي', 'Honey kaak', 'Kaak au miel', 'Kaak con miel', 'Honig-Kaak', 'sweets_desserts', 'snacks', 'pan_jordanian', 240),
  R('زنود الست بالجوز البلدي', 'Znoud el sit with walnuts', 'Znoud el sit aux noix', 'Znoud el sit con nueces', 'Znoud-el-Sit mit Walnüssen', 'sweets_desserts', 'snacks', 'pan_jordanian', 285),
  R('لقمة القاضي بالعسل البلدي', 'Luqaimat with honey', 'Loukoumades au miel', 'Luqaimat con miel', 'Luqaimat mit Honig', 'sweets_desserts', 'snacks', 'pan_jordanian', 280),
  R('حلوى الطحينية بالسمسم', 'Tahini sesame bites', 'Douceurs sésame au tahini', 'Dulces de sésamo y tahini', 'Tahini-Sesam-Süßigkeiten', 'sweets_desserts', 'snacks', 'pan_jordanian', 250),
  R('التمرية البلدي بالجوز', 'Walnut date tamriya', 'Tamriya aux noix', 'Tamriya con nueces', 'Walnuss-Dattel-Tamriya', 'sweets_desserts', 'snacks', 'pan_jordanian', 265),

  // ---------- dairy_eggs_drinks (6) ----------
  R('اللبن البلدي الرايب', 'Village set laban', 'Laban du terroir', 'Laban casero', 'Dorf-Laban', 'dairy_eggs_drinks', 'breakfast', 'pan_jordanian', 65),
  R('عيران أردني', 'Jordanian ayran', 'Ayran jordanien', 'Ayran jordano', 'Jordanischer Ayran', 'dairy_eggs_drinks', 'snacks', 'pan_jordanian', 35),
  R('زبادي بلدي كامل الدسم', 'Full-fat village yogurt', 'Yaourt entier du terroir', 'Yogur entero casero', 'Vollfetter Dorfjoghurt', 'dairy_eggs_drinks', 'snacks', 'pan_jordanian', 75),
  R('أومليت بالأعشاب البلدية', 'Omelette with village herbs', 'Omelette aux herbes du terroir', 'Tortilla con hierbas caseras', 'Omelett mit Kräutern', 'dairy_eggs_drinks', 'breakfast', 'mena_shared', 140),
  R('بيض مقلي بالبندورة البلدي', 'Fried eggs with tomato', 'Oeufs frits à la tomate', 'Huevos fritos con tomate', 'Spiegeleier mit Tomate', 'dairy_eggs_drinks', 'breakfast', 'mena_shared', 120),
  R('اللبن بالعسل البلدي', 'Yogurt with honey', 'Laban au miel du terroir', 'Laban con miel', 'Laban mit Honig', 'dairy_eggs_drinks', 'breakfast', 'pan_jordanian', 90),
];

const categories = [
  'mezze_appetizers', 'salads', 'soups', 'kibbeh_dishes', 'manakish_pies',
  'mains_grills', 'rice_dishes', 'fish_seafood', 'sweets_desserts', 'dairy_eggs_drinks',
];
const regions = [
  'pan_jordanian', 'amman', 'irbid', 'zarqa', 'balqa', 'mafraq', 'jerash', 'ajloun',
  'karak', 'tafilah', 'maan', 'aqaba', 'madaba',
  'levantine_shared', 'mena_shared',
];
const meal_types = ['breakfast', 'lunch', 'dinner', 'snacks'];

const counts = {};
for (const d of ROWS) counts[d.category] = (counts[d.category] ?? 0) + 1;

const arNames = ROWS.map((d) => d.name_ar);
const dupNames = arNames.filter((n, i) => arNames.indexOf(n) !== i);
if (dupNames.length) {
  console.error('Duplicate Arabic names in authoring set:', [...new Set(dupNames)].join(' | '));
  process.exit(1);
}
for (const c of categories) if (!counts[c]) console.warn(`WARNING: category ${c} has 0 rows`);

const out = { meta: { kitchen: 'jordanian', note: '200 new dishes to reach 300 total (100 legacy migrated separately). Shared rows (4) credited to Jordanian card via levant-jordan-2026 source.' }, categories, regions, meal_types, dishes: ROWS };

const target = path.join(__dirname, 'jordan-200-proposal.json');
fs.writeFileSync(target, JSON.stringify(out, null, 2));
console.log('Wrote', target);
console.log('Total dishes:', ROWS.length);
console.log('Category counts:', JSON.stringify(counts));
const regionCounts = {};
for (const d of ROWS) regionCounts[d.region] = (regionCounts[d.region] ?? 0) + 1;
console.log('Region distribution:', JSON.stringify(regionCounts));