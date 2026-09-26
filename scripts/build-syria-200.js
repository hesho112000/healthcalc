// Authoring script: generates scripts/syria-200-proposal.json (200 new authentic Syrian
// dishes) for the Dry Run. Row = [name_ar, name_en, name_fr, name_es, name_de, category,
// mealType, region, cal_100]. Consumed by scripts/validate-lebanon-150.js (dry run only,
// no DB writes).
//
// Region scheme: golden rule = keep it general (pan_syrian). Regional cities get their
// authentic home (Aleppo = kibbeh & meat, Damascus = sweet & patisserie, Homs = fassouliye
// & kanafeh, coast = seafood). Exactly 4 rows are deliberately shared (levantine_shared /
// mena_shared) and will be credited to the Syrian card via the 'levant-syria-2026' source.
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
  R('حمص مهروس بالطحينة', 'Creamy hummus with tahini', 'Houmous crémeux au tahini', 'Hummus cremoso con tahini', 'Cremiges Hummus mit Tahini', 'mezze_appetizers', 'snacks', 'pan_syrian', 160),
  R('متبل الباذنجان المدخن', 'Smoky baba ghanoush', 'Moutabal fumé', 'Baba ghanoush ahumado', 'Geräuchertes Auberginen-Mutabal', 'mezze_appetizers', 'snacks', 'pan_syrian', 90),
  R('محمرة بالجوز الحلبي', 'Aleppo muhammara with walnuts', 'Muhammara dAlep aux noix', 'Muhammara aleppina con nueces', 'Aleppo-Muhammara mit Walnüssen', 'mezze_appetizers', 'snacks', 'aleppo', 190),
  R('بابا غنوج بالرمان الحلبي', 'Aleppo baba ghanoush with pomegranate', 'Baba ganoush à la grenade', 'Baba ghanoush con granada', 'Baba-Ghanoush mit Granatapfel', 'mezze_appetizers', 'snacks', 'pan_syrian', 95),
  R('متبل الباذنجان بالطحينة والثوم', 'Eggplant dip with tahini and garlic', 'Moutabal ail tahini', 'Mutabal de ajo y tahini', 'Auberginen-Dip mit Knoblauch und Tahini', 'mezze_appetizers', 'snacks', 'pan_syrian', 95),
  R('فتة الحمص باللحمة', 'Hummus fatteh with meat', 'Fatteh houmous à la viande', 'Fatteh de hummus con carne', 'Hummus-Fatteh mit Fleisch', 'mezze_appetizers', 'snacks', 'levantine_shared', 190),
  R('فتة الباذنجان بالسماق', 'Eggplant fatteh with sumac', 'Fatteh aubergine au sumac', 'Fatteh de berenjena con suma', 'Auberginen-Fatteh mit Sumach', 'mezze_appetizers', 'snacks', 'pan_syrian', 130),
  R('مكدوس بزيت الزيتون البلدي', 'Stuffed makdous in olive oil', 'Makdous à lhuile dolive', 'Makdus en aceite de oliva', 'Makdous in Olivenöl', 'mezze_appetizers', 'snacks', 'homs', 150),
  R('شنكليش بالطحينة', 'Shanklish with tahini', 'Chanklich au tahini', 'Shanklish con tahini', 'Shanklish mit Tahini', 'mezze_appetizers', 'snacks', 'pan_syrian', 150),
  R('لبنة بالثوم والنعناع', 'Labneh with garlic and mint', 'Labneh ail menthe', 'Labneh con ajo y menta', 'Labneh mit Knoblauch und Minze', 'mezze_appetizers', 'snacks', 'pan_syrian', 100),
  R('لبنة شامية بالزعتر', 'Damascene labneh with zaatar', 'Labneh levantin au zaatar', 'Labneh levantino con zaatar', 'Levantinisches Labneh mit Zaatar', 'mezze_appetizers', 'snacks', 'pan_syrian', 105),
  R('ورق عنب باللحم', 'Stuffed vine leaves with meat', 'Feuilles de vigne farcies à la viande', 'Hojas de parra rellenas de carne', 'Gefüllte Weinblätter mit Fleisch', 'mezze_appetizers', 'snacks', 'pan_syrian', 155),
  R('محاشي الكوسا الصغار', 'Stuffed baby courgettes', 'Courgettes farcies', 'Calabacines pequeños rellenos', 'Gefüllte Baby-Zucchini', 'mezze_appetizers', 'snacks', 'pan_syrian', 130),
  R('محشي الباذنجان بالطحينة', 'Eggplant stuffed with tahini', 'Aubergines farcies au tahini', 'Berenjenas rellenas de tahini', 'Gefüllte Auberginen mit Tahini', 'mezze_appetizers', 'snacks', 'pan_syrian', 140),
  R('سمبوسك بالجبنة السورية', 'Cheese sambousek', 'Sambousek au fromage syrien', 'Sambusek de queso sirio', 'Syrisches Käse-Sambousek', 'mezze_appetizers', 'snacks', 'pan_syrian', 175),
  R('معجنات السبانخ بالصنوبر', 'Spinach pastries with pine nuts', 'Fatayer aux épinards et pignons', 'Espinacas con piñones', 'Spinat-Gebäck mit Pinienkernen', 'mezze_appetizers', 'snacks', 'pan_syrian', 185),
  R('قاورما بالخبز', 'Kawarma on bread', 'Kawarma sur pain', 'Kawarma sobre pan', 'Kawarma auf Brot', 'mezze_appetizers', 'snacks', 'homs', 200),
  R('مقانق بالطماطم', 'Makanek with tomato', 'Makanek à la tomate', 'Makanek con tomate', 'Makanek mit Tomate', 'mezze_appetizers', 'snacks', 'pan_syrian', 170),
  R('سجق حلب بالثوم', 'Aleppo garlic soujouk', 'Soujouk dAlep à lail', 'Soujouk aleppino con ajo', 'Aleppo-Soujouk mit Knoblauch', 'mezze_appetizers', 'snacks', 'aleppo', 195),
  R('مخلل الخضار الشامي', 'Levantine pickled vegetables', 'Légumes à la saumure du Levant', 'Encurtidos levantinos', 'Levantinisches eingelegtes Gemüse', 'mezze_appetizers', 'snacks', 'pan_syrian', 30),
  R('زيتون حلب بالزيت', 'Aleppo olives in oil', 'Olives dAlep à lhuile', 'Aceitunas aleppinas en aceite', 'Aleppo-Oliven in Öl', 'mezze_appetizers', 'snacks', 'aleppo', 70),
  R('جبنة بالزعتر', 'Cheese with zaatar', 'Fromage au zaatar', 'Queso con zaatar', 'Käse mit Zaatar', 'mezze_appetizers', 'snacks', 'pan_syrian', 160),
  R('حلوم بالجوز', 'Halloumi with walnuts', 'Halloumi aux noix', 'Halloumi con nueces', 'Halloumi mit Walnüssen', 'mezze_appetizers', 'snacks', 'pan_syrian', 200),
  R('بطاطا بالطحينة', 'Potatoes with tahini', 'Pommes de terre au tahini', 'Patatas con tahini', 'Kartoffeln mit Tahini', 'mezze_appetizers', 'snacks', 'pan_syrian', 130),
  R('حمص بالفلفل الحار', 'Spicy hot hummus', 'Houmous piquant', 'Hummus picante', 'Scharfes Hummus', 'mezze_appetizers', 'snacks', 'mena_shared', 120),

  // ---------- salads (18) ----------
  R('سلطة الباذنجان بالطحينة السورية', 'Syrian eggplant salad with tahini', 'Salade daubergine au tahini', 'Ensalada de berenjena con tahini', 'Auberginensalat mit Tahini', 'salads', 'snacks', 'pan_syrian', 90),
  R('سلطة الشمندر بالجوز', 'Beetroot salad with walnuts', 'Salade de betterave aux noix', 'Ensalada de remolacha con nueces', 'Rote-Bete-Salat mit Walnüssen', 'salads', 'snacks', 'pan_syrian', 70),
  R('سلطة الحمص بالبقدونس', 'Hummus chickpea salad', 'Salade de pois chiches au persil', 'Ensalada de garbanzos con perejil', 'Kichererbsensalat mit Petersilie', 'salads', 'snacks', 'pan_syrian', 120),
  R('سلطة العدس الحار', 'Spicy lentil salad', 'Salade de lentilles piquante', 'Ensalada de lentejas picante', 'Scharfer Linsensalat', 'salads', 'snacks', 'pan_syrian', 80),
  R('سلطة البرغل الشامية', 'Levantine bulgur salad', 'Salade de boulgour du Levant', 'Ensalada de bulgur levantina', 'Levantinischer Bulgursalat', 'salads', 'snacks', 'pan_syrian', 120),
  R('سلطة الجرجير بالرمان والصنوبر', 'Rocket salad with pomegranate and pine nuts', 'Salade de roquette à la grenade', 'Ensalada de rúcula con granada', 'Rucolasalat mit Granatapfel', 'salads', 'snacks', 'pan_syrian', 40),
  R('سلطة الملفوف الأرمنية', 'Armenian cabbage salad', 'Salade de chou arménienne', 'Ensalada de col armenia', 'Armenischer Kohlsalat', 'salads', 'snacks', 'pan_syrian', 65),
  R('سلطة الخيار البلدي', 'Cucumber village salad', 'Salade de concombre', 'Ensalada de pepino', 'Gurkensalat', 'salads', 'snacks', 'pan_syrian', 50),
  R('سلطة البندورة الحلوة', 'Sweet tomato salad', 'Salade de tomates douces', 'Ensalada de tomate dulce', 'Süßer Tomatensalat', 'salads', 'snacks', 'pan_syrian', 40),
  R('سلطة الفريكة', 'Freekeh salad', 'Salade de freekeh', 'Ensalada de freekeh', 'Freekeh-Salat', 'salads', 'snacks', 'pan_syrian', 70),
  R('سلطة الرجلة بالثوم', 'Purslane salad with garlic', 'Salade de pourpier à lail', 'Ensalada de verdolaga con ajo', 'Portulak-Salat mit Knoblauch', 'salads', 'snacks', 'pan_syrian', 35),
  R('سلطة الباذنجان المشوي بالخل', 'Grilled eggplant salad with vinegar', 'Salade daubergine grillée', 'Ensalada de berenjena asada', 'Gegrillter Auberginensalat', 'salads', 'snacks', 'pan_syrian', 85),
  R('سلطة الجزر الحارة', 'Spicy carrot salad', 'Salade de carottes piquante', 'Ensalada de zanahoria picante', 'Scharfer Karottensalat', 'salads', 'snacks', 'pan_syrian', 55),
  R('سلطة الكوسا', 'Courgette salad', 'Salade de courgettes', 'Ensalada de calabacín', 'Zucchinisalat', 'salads', 'snacks', 'pan_syrian', 45),
  R('سلطة البطاطا بالليمون', 'Potato salad with lemon', 'Salade de pommes de terre au citron', 'Ensalada de patatas con limón', 'Kartoffelsalat mit Zitrone', 'salads', 'snacks', 'pan_syrian', 110),
  R('سلطة الفول بالشبت', 'Fava bean salad with dill', 'Salade de fèves à laneth', 'Ensalada de habas con eneldo', 'Saubohnensalat mit Dill', 'salads', 'snacks', 'pan_syrian', 75),
  R('سلطة القرع', 'Pumpkin salad', 'Salade de potiron', 'Ensalada de calabaza', 'Kürbissalat', 'salads', 'snacks', 'pan_syrian', 60),
  R('سلطة الكمأة الفراتية', 'Euphrates truffle salad', 'Salade de truffes de lEuphrate', 'Ensalada de trufa del Éufrates', 'Euphrat-Trüffelsalat', 'salads', 'snacks', 'dayr_ez_zawr', 110),

  // ---------- soups (14) ----------
  R('شوربة العدس بالكمون الشامية', 'Levantine lentil soup with cumin', 'Soupe de lentilles au cumin', 'Sopa de lentejas con comino', 'Linsensuppe mit Kreuzkümmel', 'soups', 'dinner', 'pan_syrian', 90),
  R('شوربة العدس بالزعتر', 'Lentil soup with zaatar', 'Soupe de lentilles au zaatar', 'Sopa de lentejas con zaatar', 'Linsensuppe mit Zaatar', 'soups', 'dinner', 'pan_syrian', 85),
  R('شوربة الخضار الشامية', 'Levantine vegetable soup', 'Soupe de légumes du Levant', 'Sopa de verduras levantina', 'Levantinische Gemüsesuppe', 'soups', 'dinner', 'pan_syrian', 55),
  R('شوربة الفريكة بالدجاج السورية', 'Syrian freekeh soup with chicken', 'Soupe de freekeh au poulet', 'Sopa de freekeh con pollo', 'Freekeh-Suppe mit Huhn', 'soups', 'dinner', 'pan_syrian', 95),
  R('شوربة الدجاج بالليمون الشامية', 'Levantine chicken and lemon soup', 'Soupe de poulet au citron', 'Sopa de pollo con limón', 'Hühnersuppe mit Zitrone', 'soups', 'dinner', 'pan_syrian', 75),
  R('شوربة البندورة بالريحان', 'Tomato and basil soup', 'Soupe de tomate au basilic', 'Sopa de tomate con albahaca', 'Tomatensuppe mit Basilikum', 'soups', 'dinner', 'pan_syrian', 60),
  R('شوربة الكوسا بالشبت', 'Courgette soup with dill', 'Soupe de courgettes à laneth', 'Sopa de calabacín con eneldo', 'Zucchinisuppe mit Dill', 'soups', 'dinner', 'pan_syrian', 55),
  R('شوربة الذرة', 'Corn soup', 'Soupe de maïs', 'Sopa de maíz', 'Maissuppe', 'soups', 'dinner', 'pan_syrian', 80),
  R('شوربة البازيلاء بالجزر', 'Pea and carrot soup', 'Soupe de petits pois et carottes', 'Sopa de guisantes y zanahoria', 'Erbsen-Karotten-Suppe', 'soups', 'dinner', 'pan_syrian', 65),
  R('شوربة الكشك السورية', 'Syrian kishk soup', 'Soupe de kishk syrienne', 'Sopa de kishk siria', 'Syrische Kishk-Suppe', 'soups', 'dinner', 'damascus', 110),
  R('شوربة الحمص بالليمون', 'Chickpea soup with lemon', 'Soupe de pois chiches', 'Sopa de garbanzos', 'Kichererbsensuppe', 'soups', 'dinner', 'pan_syrian', 95),
  R('شوربة الهراوة الشامية', 'Damascene harawé soup', 'Soupe harawé de Damas', 'Sopa harawé damascena', 'Damaszener Harawé-Suppe', 'soups', 'dinner', 'damascus', 85),
  R('شوربة السلق', 'Swiss chard soup', 'Soupe de blettes', 'Sopa de acelgas', 'Mangoldsuppe', 'soups', 'dinner', 'pan_syrian', 50),
  R('شوربة البرغل بالكبدة', 'Bulgur soup with liver', 'Soupe de boulgour au foie', 'Sopa de bulgur con hígado', 'Bulgursuppe mit Leber', 'soups', 'dinner', 'aleppo', 100),

  // ---------- kibbeh_dishes (22) ----------
  R('كبة المشوية على الفحم', 'Charcoal-grilled kibbeh', 'Kibbeh grillé au charbon', 'Kibbeh a la brasa', 'Holzkohle-gegrilltes Kibbeh', 'kibbeh_dishes', 'lunch', 'aleppo', 190),
  R('كبة حلبية بالجوز', 'Aleppo kibbeh with walnuts', 'Kibbeh dAlep aux noix', 'Kibbeh aleppino con nueces', 'Aleppo-Kibbeh mit Walnüssen', 'kibbeh_dishes', 'lunch', 'aleppo', 200),
  R('كبة محشية باللحم والجوز', 'Kibbeh stuffed with meat and walnuts', 'Kibbeh farci à la viande et aux noix', 'Kibbeh relleno de carne y nueces', 'Gefülltes Kibbeh mit Fleisch und Walnüssen', 'kibbeh_dishes', 'lunch', 'pan_syrian', 195),
  R('كبة باللبن الزبادي', 'Kibbeh in yogurt', 'Kibbeh au laban', 'Kibbeh en yogur', 'Kibbeh in Joghurt', 'kibbeh_dishes', 'lunch', 'pan_syrian', 165),
  R('كبة بالسماق الحلبي', 'Kibbeh with Aleppo sumac', 'Kibbeh au sumac dAlep', 'Kibbeh con suma aleppina', 'Kibbeh mit Aleppo-Sumach', 'kibbeh_dishes', 'lunch', 'aleppo', 175),
  R('كبة الكراوية بالبصل', 'Fried kibbeh with caramelized onion', 'Kibbeh krouniyeh à l oignon', 'Kibbeh frito con cebolla', 'Gebratenes Kibbeh mit Zwiebel', 'kibbeh_dishes', 'lunch', 'homs', 160),
  R('كبة النية الحلبية بالمكسرات', 'Raw Aleppo kibbeh with nuts', 'Kibbeh nayé dAlep aux fruits secs', 'Kibbeh crudo aleppino con frutos secos', 'Rohes Aleppo-Kibbeh mit Nüssen', 'kibbeh_dishes', 'lunch', 'aleppo', 155),
  R('كبة بالبصل المكرمل والسماق', 'Kibbeh with caramelized onion and sumac', 'Kibbeh à loignon caramélisé', 'Kibbeh con cebolla caramelizada', 'Kibbeh mit karamellisierter Zwiebel', 'kibbeh_dishes', 'lunch', 'pan_syrian', 170),
  R('كبة الكشك بالبصل', 'Kibbeh kishk with onions', 'Kibbeh kishk à loignon', 'Kibbeh kishk con cebolla', 'Kibbeh-Kishk mit Zwiebeln', 'kibbeh_dishes', 'lunch', 'homs', 180),
  R('كبة بالرمان والسماق', 'Kibbeh with pomegranate and sumac', 'Kibbeh à la grenade et au sumac', 'Kibbeh con granada y suma', 'Kibbeh mit Granatapfel und Sumach', 'kibbeh_dishes', 'lunch', 'pan_syrian', 175),
  R('كبة الخضراوات', 'Vegetable kibbeh', 'Kibbeh de légumes', 'Kibbeh de verduras', 'Gemüse-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_syrian', 145),
  R('كبة باليقطين', 'Pumpkin kibbeh', 'Kibbeh au potiron', 'Kibbeh de calabaza', 'Kürbis-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_syrian', 140),
  R('كبة الشامية', 'Damascene kibbeh', 'Kibbeh damascène', 'Kibbeh damasceno', 'Damaszener Kibbeh', 'kibbeh_dishes', 'lunch', 'damascus', 180),
  R('كبة مبرومة', 'Rolled kibbeh', 'Kibbeh mabrumeh', 'Kibbeh enrollado', 'Gerolltes Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_syrian', 190),
  R('كبة المقلية الصغيرة', 'Small fried kibbeh balls', 'Petits kibbeh frits', 'Bolitas de kibbeh frito', 'Kleine frittierte Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_syrian', 210),
  R('كبة بلحم الغنم', 'Lamb kibbeh', 'Kibbeh daghn', 'Kibbeh de cordero', 'Lamm-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_syrian', 200),
  R('كبة بالدبس والسماق', 'Kibbeh with molasses and sumac', 'Kibbeh à la mélasse et au sumac', 'Kibbeh con melaza y suma', 'Kibbeh mit Melasse und Sumach', 'kibbeh_dishes', 'lunch', 'pan_syrian', 170),
  R('كبة بطحينية', 'Kibbeh with tahini sauce', 'Kibbeh au tahini', 'Kibbeh con salsa de tahini', 'Kibbeh mit Tahini-Sauce', 'kibbeh_dishes', 'lunch', 'pan_syrian', 185),
  R('كبة بالطماطم', 'Kibbeh in tomato sauce', 'Kibbeh à la tomate', 'Kibbeh en salsa de tomate', 'Kibbeh in Tomatensauce', 'kibbeh_dishes', 'lunch', 'pan_syrian', 160),
  R('كبة السمك الساحلية', 'Coastal fish kibbeh', 'Kibbeh de poisson côtier', 'Kibbeh de pescado costero', 'Küsten-Fisch-Kibbeh', 'kibbeh_dishes', 'lunch', 'lataqia', 170),
  R('كبة الحمص', 'Chickpea kibbeh', 'Kibbeh de pois chiches', 'Kibbeh de garbanzos', 'Kichererbsen-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_syrian', 135),
  R('كبة الفريكة', 'Freekeh kibbeh', 'Kibbeh de freekeh', 'Kibbeh de freekeh', 'Freekeh-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_syrian', 150),

  // ---------- manakish_pies (22) ----------
  R('منقوشة الزعتر البلدي', 'Village zaatar manakish', 'Manakish zaatar traditionnel', 'Manakish zaatar tradicional', 'Traditionelles Zaatar-Manakish', 'manakish_pies', 'breakfast', 'pan_syrian', 215),
  R('منقوشة الجبنة الشامية', 'Levantine cheese manakish', 'Manakish au fromage levantin', 'Manakish de queso levantino', 'Levantinisches Käse-Manakish', 'manakish_pies', 'breakfast', 'pan_syrian', 210),
  R('منقوشة اللحمة المفرومة', 'Minced meat manakish', 'Manakish à la viande hachée', 'Manakish de carne picada', 'Manakish mit Hackfleisch', 'manakish_pies', 'lunch', 'pan_syrian', 240),
  R('صفيحة الحلبي باللحم المفروم', 'Aleppo sfiha with minced meat', 'Sfiha dAlep à la viande', 'Sfiha aleppina de carne picada', 'Aleppo-Sfiha mit Hackfleisch', 'manakish_pies', 'lunch', 'aleppo', 240),
  R('صفيحة الكبد الحلبية', 'Aleppo liver sfiha', 'Sfiha au foie dAlep', 'Sfiha de hígado aleppina', 'Aleppo-Leber-Sfiha', 'manakish_pies', 'lunch', 'aleppo', 210),
  R('لحم بعجين بالبندورة', 'Lahm bi ajeen with tomato', 'Lahm bi ajin à la tomate', 'Lahm bi ajeen con tomate', 'Lahm bi Ajeen mit Tomate', 'manakish_pies', 'lunch', 'pan_syrian', 215),
  R('فطاير الجبنة الحلبي بالزعتر', 'Aleppo cheese pastries with zaatar', 'Fatayer au fromage et zaatar', 'Fatayer de queso con zaatar', 'Käse-Fatayer mit Zaatar', 'manakish_pies', 'breakfast', 'pan_syrian', 195),
  R('فطائر اللحمة المفتوحة', 'Open-faced meat pies', 'Tartelettes à la viande', 'Empanadas abiertas de carne', 'Offene Fleischpasteten', 'manakish_pies', 'lunch', 'pan_syrian', 220),
  R('رغيف الزعترية السوري', 'Syrian zaatari loaf', 'Pain zaatari syrien', 'Pan zaatari sirio', 'Syrisches Zaatar-Brot', 'manakish_pies', 'breakfast', 'pan_syrian', 240),
  R('كعك السمسم بالتمر', 'Sesame kaak with dates', 'Kaak sésame aux dattes', 'Kaak de sésamo con dátiles', 'Sesam-Kaak mit Datteln', 'manakish_pies', 'breakfast', 'pan_syrian', 220),
  R('كعك بالجبنة الحلبي', 'Aleppo cheese kaak', 'Kaak au fromage dAlep', 'Kaak de queso aleppino', 'Aleppo-Käse-Kaak', 'manakish_pies', 'breakfast', 'aleppo', 230),
  R('منقوشة بالفطر', 'Mushroom manakish', 'Manakish aux champignons', 'Manakish de champiñones', 'Pilz-Manakish', 'manakish_pies', 'breakfast', 'pan_syrian', 185),
  R('منقوشة بالبيض', 'Egg manakish', 'Manakish à loeuf', 'Manakish de huevo', 'Ei-Manakish', 'manakish_pies', 'breakfast', 'pan_syrian', 200),
  R('فطيرة السبانخ والسماق', 'Spinach and sumac pie', 'Tarte aux épinards et sumac', 'Empanada de espinacas y suma', 'Spinat-Sumach-Tasche', 'manakish_pies', 'breakfast', 'pan_syrian', 180),
  R('الشمبوريك', 'Shamburek meat pocket', 'Chamborek à la viande', 'Shamborek de carne', 'Shamborek mit Fleisch', 'manakish_pies', 'lunch', 'pan_syrian', 190),
  R('عجين اللحمة الحلبي', 'Aleppo meat dough', 'Pâte à viande dAlep', 'Masa de carne aleppina', 'Aleppo-Fleischteig', 'manakish_pies', 'lunch', 'aleppo', 225),
  R('المترد الشامي', 'Levantine mutrad flatbread', 'Mutrad du Levant', 'Pan mutrad levantino', 'Levantinisches Mutrad-Fladenbrot', 'manakish_pies', 'breakfast', 'pan_syrian', 230),
  R('معجنات الكشك', 'Kishk pastries', 'Fatayer au kishk', 'Fatayer de kishk', 'Kishk-Gebäck', 'manakish_pies', 'breakfast', 'damascus', 210),
  R('منقوشة اللبنة والبندورة', 'Labneh and tomato manakish', 'Manakish labneh tomate', 'Manakish de labneh y tomate', 'Labneh-Tomaten-Manakish', 'manakish_pies', 'breakfast', 'pan_syrian', 200),
  R('خبز البطاطا البلدي', 'Village potato bread', 'Pain de pommes de terre', 'Pan de patata', 'Kartoffelbrot', 'manakish_pies', 'breakfast', 'pan_syrian', 195),
  R('سمبوسك بالجوز', 'Walnut sambousek', 'Sambousek aux noix', 'Sambusek de nuez', 'Walnuss-Sambousek', 'manakish_pies', 'breakfast', 'pan_syrian', 185),
  R('مناقيش بالصنوبر', 'Manakish with pine nuts', 'Manakish aux pignons', 'Manakish con piñones', 'Manakish mit Pinienkernen', 'manakish_pies', 'breakfast', 'pan_syrian', 220),

  // ---------- mains_grills (35) ----------
  R('شاورما اللحم الشامية', 'Levantine beef shawarma', 'Chawarma de buf levantin', 'Shawarma de res levantino', 'Levantinisches Rind-Shawarma', 'mains_grills', 'lunch', 'damascus', 210),
  R('شاورما دجاج بالثوم', 'Garlic chicken shawarma', 'Chawarma de poulet à lail', 'Shawarma de pollo con ajo', 'Knoblauch-Hähnchen-Shawarma', 'mains_grills', 'lunch', 'pan_syrian', 195),
  R('كباب حلبي بالفحم', 'Charcoal Aleppo kebab', 'Kebab dAlep au charbon', 'Kebab aleppino a la brasa', 'Holzkohle Aleppo-Kebab', 'mains_grills', 'lunch', 'aleppo', 205),
  R('كباب خشخاش بالبندورة', 'Khashkhash kebab with tomato', 'Kebab khachkhach à la tomate', 'Kebab khashkhash con tomate', 'Khashkhash-Kebab mit Tomate', 'mains_grills', 'lunch', 'aleppo', 195),
  R('شيش طاووق بثومية حلبية', 'Shish taouk with Aleppo garlic sauce', 'Chiche taouk à la sauce ail dAlep', 'Shish taouk con salsa de ajo aleppina', 'Shish-Taouk mit Aleppo-Knoblauchsauce', 'mains_grills', 'lunch', 'aleppo', 200),
  R('كفتة الحطب بالبقدونس', 'Charcoal kofta with parsley', 'Kofta grillée au persil', 'Kofta a la parrilla con perejil', 'Gegrillte Kofta mit Petersilie', 'mains_grills', 'lunch', 'pan_syrian', 185),
  R('كفتة حب بالبندورة', 'Tomato simmered kofta', 'Kofta à la tomate', 'Kofta guisada con tomate', 'Kofta in Tomatensauce', 'mains_grills', 'lunch', 'homs', 190),
  R('كفتة بالطحينة المشوية', 'Grilled kofta with tahini', 'Kofta grillée au tahini', 'Kofta a la parrilla con tahini', 'Gegrillte Kofta mit Tahini', 'mains_grills', 'lunch', 'pan_syrian', 195),
  R('داوود باشا بالبندورة', 'Daoud pasha with tomato', 'Daoud bacha à la tomate', 'Daoud basha con tomate', 'Daoud-Pascha mit Tomate', 'mains_grills', 'lunch', 'pan_syrian', 185),
  R('لحمة بكرز بالسماق', 'Cherry meat with sumac', 'Lahme b karaz au sumac', 'Carne con cerezas y suma', 'Kirschfleisch mit Sumach', 'mains_grills', 'lunch', 'aleppo', 195),
  R('محشي الملفوف باللحم', 'Stuffed cabbage with meat', 'Chou farci à la viande', 'Repollo relleno de carne', 'Gefüllter Kohl mit Fleisch', 'mains_grills', 'lunch', 'pan_syrian', 150),
  R('محشي الباذنجان الصغير', 'Stuffed baby eggplants', 'Petites aubergines farcies', 'Berenjenas pequeñas rellenas', 'Gefüllte Baby-Auberginen', 'mains_grills', 'lunch', 'pan_syrian', 145),
  R('محشي الكوسا باللبن', 'Courgettes stuffed in yogurt', 'Courgettes farcies au laban', 'Calabacines rellenos en yogur', 'Gefüllte Zucchini in Joghurt', 'mains_grills', 'lunch', 'pan_syrian', 155),
  R('يبرق بلحم الغنم', 'Lamb yabrak', 'Yabrak daghn', 'Yabrak de cordero', 'Lamm-Yabrak', 'mains_grills', 'lunch', 'damascus', 160),
  R('ملوخية بالدجاج الشامية', 'Levantine mlukhiyeh with chicken', 'Mlukhiyeh au poulet du Levant', 'Mlukhiya con pollo levantina', 'Levantinisches Mlukhiye mit Huhn', 'mains_grills', 'lunch', 'damascus', 135),
  R('فريكة باللحم في الفرن', 'Oven freekeh with meat', 'Freekeh à la viande au four', 'Freekeh con carne al horno', 'Freekeh mit Fleisch aus dem Ofen', 'mains_grills', 'lunch', 'pan_syrian', 165),
  R('منزلة الباذنجان', 'Eggplant munazzala', 'Munazzala daubergine', 'Munazzala de berenjena', 'Auberginen-Munazzala', 'mains_grills', 'lunch', 'pan_syrian', 140),
  R('كرشة بالبندورة', 'Tripe with tomato', 'Tripes à la tomate', 'Callos con tomate', 'Kutteln mit Tomate', 'mains_grills', 'lunch', 'pan_syrian', 170),
  R('كبدة بالخل والليمون', 'Liver with vinegar and lemon', 'Foie au vinaigre et citron', 'Hígado con vinagre y limón', 'Leber mit Essig und Zitrone', 'mains_grills', 'lunch', 'pan_syrian', 160),
  R('السماقية الساحلية', 'Coastal sumagiyyeh stew', 'Sumakiyeh côtière', 'Sumaqiya costera', 'Küsten-Sumach-Eintopf', 'mains_grills', 'lunch', 'lataqia', 180),
  R('دجاج بالفرن بالليمون', 'Oven chicken with lemon', 'Poulet au four au citron', 'Pollo al horno con limón', 'Ofenhuhn mit Zitrone', 'mains_grills', 'lunch', 'pan_syrian', 180),
  R('فروج مسلوق بالخضار', 'Boiled chicken with vegetables', 'Poulet bouilli aux légumes', 'Pollo hervido con verduras', 'Gekochtes Huhn mit Gemüse', 'mains_grills', 'lunch', 'pan_syrian', 165),
  R('جوانح الدجاج الشامية', 'Levantine chicken wings', 'Ailes de poulet du Levant', 'Alitas de pollo levantinas', 'Levantinische Hähnchenflügel', 'mains_grills', 'lunch', 'pan_syrian', 185),
  R('طاجن لسان العصفور', 'Orzo chicken casserole', 'Tajine orzo au poulet', 'Tajín de orzo con pollo', 'Orzo-Huhn-Auflauf', 'mains_grills', 'lunch', 'levantine_shared', 155),
  R('طاجن البامية باللحمة', 'Okra meat casserole', 'Tajine de bamia à la viande', 'Tajín de bamia con carne', 'Okra-Fleisch-Auflauf', 'mains_grills', 'lunch', 'pan_syrian', 135),
  R('دجاج مشوي على الفحم', 'Charcoal-grilled chicken', 'Poulet grillé au charbon', 'Pollo a la brasa', 'Holzkohle-Grilled Chicken', 'mains_grills', 'lunch', 'pan_syrian', 175),
  R('حمام محشي دمشقي', 'Damascene stuffed pigeon', 'Pigeon farci de Damas', 'Paloma rellena damascena', 'Gefüllte Damaszener Taube', 'mains_grills', 'lunch', 'damascus', 190),
  R('ريدو بالفستق', 'Pistachio rido', 'Rido aux pistaches', 'Rido con pistachos', 'Pistazien-Rido', 'mains_grills', 'lunch', 'damascus', 210),
  R('كباب الكرز الدمشقي', 'Damascene cherry kebab', 'Kebab cerise de Damas', 'Kebab de cerezas damasceno', 'Damaszener Kirsch-Kebab', 'mains_grills', 'lunch', 'damascus', 175),
  R('شيش برك باللبن', 'Shish barak in yogurt', 'Chiche barak au laban', 'Shish barak en yogur', 'Shish-Barak in Joghurt', 'mains_grills', 'lunch', 'homs', 165),
  R('مشويات مشكلة شامية', 'Levantine mixed grill', 'Assortiment de grillades du Levant', 'Parrillada mixta levantina', 'Levantinische gemischte Grillplatte', 'mains_grills', 'lunch', 'damascus', 205),
  R('كباب الصاج', 'Saaj kebab', 'Kebab au saj', 'Kebab al saj', 'Saj-Kebab', 'mains_grills', 'lunch', 'pan_syrian', 195),
  R('كباب عجمي', 'Ajami kebab', 'Kebab ajami', 'Kebab ajami', 'Ajami-Kebab', 'mains_grills', 'lunch', 'pan_syrian', 180),
  R('شيخ المحشي', 'Sheikh el mahshi stuffed eggplant', 'Cheikh el mahshi', 'Sheikh el mahshi', 'Sheikh-el-Mahshi', 'mains_grills', 'lunch', 'pan_syrian', 165),
  R('كفتة الخضار بالزيت', 'Vegetable kofta in oil', 'Kofta de légumes à lhuile', 'Kofta de verduras en aceite', 'Gemüse-Kofta in Öl', 'mains_grills', 'lunch', 'pan_syrian', 160),

  // ---------- rice_dishes (22) ----------
  R('رز مفلفل سوري بالشعيرية', 'Syrian vermicelli rice', 'Riz syrien aux vermicelles', 'Arroz sirio con fideos', 'Syrischer Fadennudeln-Reis', 'rice_dishes', 'lunch', 'pan_syrian', 165),
  R('رز بلحم الغنم والصنوبر', 'Lamb rice with pine nuts', 'Riz daghn aux pignons', 'Arroz de cordero con piñones', 'Lamm-Reis mit Pinienkernen', 'rice_dishes', 'lunch', 'pan_syrian', 190),
  R('رز محمر سوري', 'Syrian golden rice', 'Riz doré syrien', 'Arroz dorado sirio', 'Syrischer goldener Reis', 'rice_dishes', 'lunch', 'pan_syrian', 175),
  R('الفريكة الشامية', 'Levantine freekeh', 'Freekeh du Levant', 'Freekeh levantino', 'Levantinisches Freekeh', 'rice_dishes', 'lunch', 'pan_syrian', 150),
  R('برغل سوري بالخضار', 'Syrian bulgur with vegetables', 'Boulgour syrien aux légumes', 'Bulgur sirio con verduras', 'Syrischer Bulgur mit Gemüse', 'rice_dishes', 'lunch', 'pan_syrian', 150),
  R('مقلوبة اللحمة', 'Meat maqluba', 'Maqluba daghn', 'Maqluba de carne', 'Fleisch-Maqluba', 'rice_dishes', 'lunch', 'pan_syrian', 185),
  R('مقلوبة الدجاج بالخضار', 'Chicken maqluba with vegetables', 'Maqluba de poulet aux légumes', 'Maqluba de pollo con verduras', 'Hühner-Maqluba mit Gemüse', 'rice_dishes', 'lunch', 'pan_syrian', 170),
  R('مقلوبة البندورة', 'Tomato maqluba', 'Maqluba à la tomate', 'Maqluba de tomate', 'Tomaten-Maqluba', 'rice_dishes', 'lunch', 'pan_syrian', 160),
  R('رشتة باللبن', 'Pasta rish ayeh in yogurt', 'Rish ayeh au laban', 'Pasta rish ayeh en yogur', 'Rish-Ayeh-Nudeln in Joghurt', 'rice_dishes', 'lunch', 'pan_syrian', 175),
  R('الكشك الشامي', 'Levantine kishk', 'Kishk du Levant', 'Kishk levantino', 'Levantinisches Kishk', 'rice_dishes', 'lunch', 'damascus', 165),
  R('رز أصفر بالبهارات', 'Spiced yellow rice', 'Riz jaune aux épices', 'Arroz amarillo especiado', 'Gewürzter gelber Reis', 'rice_dishes', 'lunch', 'pan_syrian', 150),
  R('رز بالعدس والبصل المقلي', 'Lentil rice with fried onions', 'Riz aux lentilles', 'Arroz con lentejas', 'Reis mit Linsen', 'rice_dishes', 'lunch', 'pan_syrian', 155),
  R('مجدرة حلبية', 'Aleppo mujaddara', 'Moudjaddara dAlep', 'Mujaddara aleppina', 'Aleppo-Mujaddara', 'rice_dishes', 'lunch', 'aleppo', 140),
  R('رز باللوز والزبيب', 'Rice with almonds and raisins', 'Riz aux amandes et raisins', 'Arroz con almendras y pasas', 'Reis mit Mandeln und Rosinen', 'rice_dishes', 'lunch', 'pan_syrian', 170),
  R('مفتول بالدجاج', 'Chicken maftoul', 'Mafloul au poulet', 'Maftul con pollo', 'Hühner-Maftoul', 'rice_dishes', 'lunch', 'pan_syrian', 165),
  R('فريكة بالحمص', 'Freekeh with chickpeas', 'Freekeh aux pois chiches', 'Freekeh con garbanzos', 'Freekeh mit Kichererbsen', 'rice_dishes', 'lunch', 'homs', 155),
  R('رز بالبصل المكرمل', 'Rice with caramelized onions', 'Riz à loignon caramélisé', 'Arroz con cebolla caramelizada', 'Reis mit karamellisierten Zwiebeln', 'rice_dishes', 'lunch', 'pan_syrian', 160),
  R('حشوة الرز السورية', 'Syrian rice stuffing', 'Farce de riz syrienne', 'Relleno de arroz sirio', 'Syrische Reis-Füllung', 'rice_dishes', 'lunch', 'pan_syrian', 165),
  R('أرز بالقرنبيط', 'Rice with cauliflower', 'Riz au chou-fleur', 'Arroz con coliflor', 'Reis mit Blumenkohl', 'rice_dishes', 'lunch', 'pan_syrian', 150),
  R('برغل بالفطر', 'Bulgur with mushrooms', 'Boulgour aux champignons', 'Bulgur con champiñones', 'Bulgur mit Pilzen', 'rice_dishes', 'lunch', 'pan_syrian', 140),
  R('رز بالسبانخ', 'Rice with spinach', 'Riz aux épinards', 'Arroz con espinacas', 'Reis mit Spinat', 'rice_dishes', 'lunch', 'pan_syrian', 145),
  R('رز بالبندورة الحارة', 'Spicy tomato rice', 'Riz à la tomate piquante', 'Arroz picante de tomate', 'Scharfer Tomatenreis', 'rice_dishes', 'lunch', 'pan_syrian', 160),

  // ---------- fish_seafood (12) ----------
  R('صيادية ساحلية', 'Coastal sayyadieh', 'Sayadieh côtière', 'Sayadieh costera', 'Küsten-Sayyadieh', 'fish_seafood', 'lunch', 'lataqia', 160),
  R('سمك مشوي بالفحم', 'Charcoal-grilled fish', 'Poisson grillé au charbon', 'Pescado a la brasa', 'Holzkohle-gegrillter Fisch', 'fish_seafood', 'lunch', 'tartus', 175),
  R('سمك مقلي بالزيت', 'Fried fish in oil', 'Poisson frit à lhuile', 'Pescado frito en aceite', 'Frittierter Fisch in Öl', 'fish_seafood', 'lunch', 'pan_syrian', 190),
  R('روبيان مشوي بالثوم', 'Garlic grilled prawns', 'Crevettes grillées à lail', 'Camarones a la parrilla con ajo', 'Knoblauch-Grillgarnelen', 'fish_seafood', 'lunch', 'lataqia', 135),
  R('بوري مقلي ساحلي', 'Coastal fried mullet', 'Mulet frit côtier', 'Lisa frita costera', 'Gebratene Küsten-Meeräsche', 'fish_seafood', 'lunch', 'tartus', 170),
  R('سلطان إبراهيم بالزبدة', 'Red mullet with butter', 'Rouget au beurre', 'Salmonete con mantequilla', 'Rotbarbe mit Butter', 'fish_seafood', 'lunch', 'pan_syrian', 150),
  R('سردين مشوي بالليمون', 'Grilled sardines with lemon', 'Sardines grillées', 'Sardinas a la parrilla', 'Gegrillte Sardinen', 'fish_seafood', 'lunch', 'pan_syrian', 185),
  R('حبار بالليمون', 'Squid with lemon', 'Calamars au citron', 'Calamares con limón', 'Tintenfisch mit Zitrone', 'fish_seafood', 'lunch', 'lataqia', 160),
  R('أخطبوط بالثوم والبقدونس', 'Octopus with garlic and parsley', 'Poulpe à lail et persil', 'Pulpo con ajo y perejil', 'Oktopus mit Knoblauch und Petersilie', 'fish_seafood', 'lunch', 'pan_syrian', 125),
  R('كبيبة السمك', 'Fish kibbeh in sauce', 'Kibbé de poisson', 'Kibbeh de pescado en salsa', 'Fisch-Kibbeh in Sauce', 'fish_seafood', 'lunch', 'damascus', 140),
  R('بلطي بالفرن', 'Oven-baked tilapia', 'Tilapia au four', 'Tilapia al horno', 'Gebackene Tilapia', 'fish_seafood', 'lunch', 'pan_syrian', 160),
  R('سمك بالطحينة', 'Fish with tahini', 'Poisson au tahini', 'Pescado con tahini', 'Fisch mit Tahini', 'fish_seafood', 'lunch', 'tartus', 175),

  // ---------- sweets_desserts (24) ----------
  R('بقلاوة دمشقية', 'Damascene baklava', 'Baklava damascène', 'Baklava damasceno', 'Damaszener Baklava', 'sweets_desserts', 'snacks', 'damascus', 330),
  R('معمول الجوز السوري', 'Syrian walnut maamoul', 'Maamoul syrien aux noix', 'Maamoul sirio de nuez', 'Syrisches Walnuss-Maamoul', 'sweets_desserts', 'snacks', 'pan_syrian', 265),
  R('معمول التمر الشامي', 'Levantine date maamoul', 'Maamoul aux dattes', 'Maamoul de dátiles', 'Dattel-Maamoul', 'sweets_desserts', 'snacks', 'pan_syrian', 250),
  R('غريبة بالفستق الحلبي', 'Aleppo pistachio ghraybeh', 'Ghraybeh aux pistaches dAlep', 'Ghuraiba de pistacho aleppino', 'Aleppo-Pistazien-Ghuraiba', 'sweets_desserts', 'snacks', 'aleppo', 320),
  R('برازق السمسم', 'Sesame barazek', 'Barazek au sésame', 'Barazek de sésamo', 'Sesam-Barazek', 'sweets_desserts', 'snacks', 'pan_syrian', 340),
  R('كنافة بالجبن الشامية', 'Levantine cheese kanafeh', 'Kanafeh au fromage', 'Canafe de queso', 'Käse-Kanafeh', 'sweets_desserts', 'snacks', 'homs', 260),
  R('حلاوة الجبن الشامية', 'Levantine halawet el jibn', 'Halawet el jibn du Levant', 'Halawet el jibn levantino', 'Levantinisches Halawet el Jibn', 'sweets_desserts', 'snacks', 'homs', 250),
  R('سفوف باللوز', 'Almond sfouf', 'Sfouf aux amandes', 'Sfouf de almendra', 'Mandel-Sfouf', 'sweets_desserts', 'snacks', 'aleppo', 290),
  R('النمورة الشامية', 'Levantine nammoura', 'Nammoura du Levant', 'Nammura levantina', 'Levantinische Nammoura', 'sweets_desserts', 'snacks', 'pan_syrian', 245),
  R('شعبيات بالفستق', 'Pistachio shaabiyat', 'Cheabiyat aux pistaches', 'Shaabiyat de pistacho', 'Pistazien-Shaabiyat', 'sweets_desserts', 'snacks', 'pan_syrian', 300),
  R('بلور الشامي', 'Damascene ballouri', 'Ballouri de Damas', 'Ballouri damasceno', 'Damaszener Ballouri', 'sweets_desserts', 'snacks', 'damascus', 275),
  R('زنود الست', 'Znoud el sit', 'Znoud el sit', 'Znoud el sit', 'Znoud el Sit', 'sweets_desserts', 'snacks', 'pan_syrian', 285),
  R('رز بحليب سوري', 'Syrian rice pudding', 'Riz au lait syrien', 'Arroz con leche sirio', 'Syrischer Milchreis', 'sweets_desserts', 'snacks', 'pan_syrian', 150),
  R('مهلبية بالفستق الحلبي', 'Aleppo pistachio muhallabieh', 'Muhallabieh aux pistaches', 'Muhalabiya con pistachos', 'Pistazien-Muhallabieh', 'sweets_desserts', 'snacks', 'pan_syrian', 130),
  R('مغلي بالمكسرات', 'Meghli with nuts', 'Meghli aux fruits secs', 'Meghli con frutos secos', 'Meghli mit Nüssen', 'sweets_desserts', 'snacks', 'pan_syrian', 160),
  R('قطايف بالقشطة الطرية', 'Qatayef with soft cream', 'Qatayef à la crème', 'Qatayef con crema', 'Qatayef mit Sahne', 'sweets_desserts', 'snacks', 'pan_syrian', 250),
  R('قطايف بالفستق الحلبي', 'Aleppo pistachio qatayef', 'Qatayef aux pistaches', 'Qatayef de pistacho', 'Pistazien-Qatayef', 'sweets_desserts', 'snacks', 'pan_syrian', 260),
  R('سحلب بالجوز', 'Salep with walnuts', 'Sahleb aux noix', 'Sahleb con nueces', 'Salep mit Walnüssen', 'sweets_desserts', 'snacks', 'damascus', 140),
  R('حلقوم حلبي', 'Aleppo lokum', 'Lokoum dAlep', 'Lokum aleppino', 'Aleppo-Lokum', 'sweets_desserts', 'snacks', 'aleppo', 340),
  R('مربى التين', 'Fig jam', 'Confiture de figues', 'Mermelada de higos', 'Feigenmarmelade', 'sweets_desserts', 'snacks', 'pan_syrian', 220),
  R('معمول الفستق الحلبي', 'Aleppo pistachio maamoul', 'Maamoul aux pistaches dAlep', 'Maamoul de pistacho aleppino', 'Aleppo-Pistazien-Maamoul', 'sweets_desserts', 'snacks', 'aleppo', 270),
  R('عصيدة الدقيق', 'Flour porridge asida', 'Assida de farine', 'Asida de harina', 'Mehl-Asida', 'sweets_desserts', 'snacks', 'damascus', 200),
  R('بقلاوة الحلبي بالفستق', 'Aleppo pistachio baklava', 'Baklava dAlep aux pistaches', 'Baklava aleppina de pistacho', 'Aleppo-Pistazien-Baklava', 'sweets_desserts', 'snacks', 'aleppo', 335),
  R('مشبك بالسمن', 'Bunuelo-style mashbak in ghee', 'Machbak au ghee', 'Mashbak en mantequilla clarificada', 'Mashbak in Ghee', 'sweets_desserts', 'snacks', 'pan_syrian', 280),

  // ---------- dairy_eggs_drinks (6) ----------
  R('اللبن الشامي بالعسل', 'Levantine yogurt with honey', 'Laban du Levant au miel', 'Yogur levantino con miel', 'Levantinischer Joghurt mit Honig', 'dairy_eggs_drinks', 'breakfast', 'pan_syrian', 95),
  R('قمر الدين الشامي', 'Damascene apricot drink', 'Boisson abricot de Damas', 'Bebida de albaricoque damascena', 'Damaszener Aprikosengetränk', 'dairy_eggs_drinks', 'snacks', 'damascus', 90),
  R('عيران سوري', 'Syrian ayran', 'Ayran syrien', 'Ayran sirio', 'Syrischer Ayran', 'dairy_eggs_drinks', 'snacks', 'pan_syrian', 35),
  R('زبادي الشام', 'Levantine yogurt', 'Yaourt du Levant', 'Yogur levantino', 'Levantinischer Joghurt', 'dairy_eggs_drinks', 'snacks', 'pan_syrian', 70),
  R('أومليت بالخضار الشامية', 'Levantine veggie omelette', 'Omelette aux légumes du Levant', 'Tortilla de verduras levantina', 'Levantinisches Gemüse-Omelett', 'dairy_eggs_drinks', 'breakfast', 'mena_shared', 140),
  R('عرق السوس السوري', 'Syrian licorice drink', 'Boisson de réglisse syrienne', 'Bebida de regaliz siria', 'Syrisches Lakritzgetränk', 'dairy_eggs_drinks', 'snacks', 'damascus', 45),
];

const categories = [
  'mezze_appetizers', 'salads', 'soups', 'kibbeh_dishes', 'manakish_pies',
  'mains_grills', 'rice_dishes', 'fish_seafood', 'sweets_desserts', 'dairy_eggs_drinks',
];
const regions = [
  'pan_syrian', 'damascus', 'aleppo', 'homs', 'hama', 'lataqia', 'tartus',
  'dayr_ez_zawr', 'hasakah', 'swaida', 'daraa', 'idlib', 'raqqa',
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

const out = { meta: { kitchen: 'syrian', note: '200 new dishes to reach 300 total (100 legacy migrated separately). Shared rows (4) credited to Syrian card via levant-syria-2026 source.' }, categories, regions, meal_types, dishes: ROWS };

const target = path.join(__dirname, 'syria-200-proposal.json');
fs.writeFileSync(target, JSON.stringify(out, null, 2));
console.log('Wrote', target);
console.log('Total dishes:', ROWS.length);
console.log('Category counts:', JSON.stringify(counts));
const regionCounts = {};
for (const d of ROWS) regionCounts[d.region] = (regionCounts[d.region] ?? 0) + 1;
console.log('Region distribution:', JSON.stringify(regionCounts));