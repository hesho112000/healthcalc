// Authoring script: generates scripts/palestine-200-proposal.json (200 new authentic
// Palestinian dishes) for the Dry Run. Row = [name_ar, name_en, name_fr, name_es,
// name_de, category, mealType, region, cal_100]. Consumed by migrate-palestine.js
// (injector, dedupes by name_ar against the live dishes table) and by
// scripts/validate... (dry-run only, no DB writes).
//
// Region scheme: golden rule = keep it general (pan_palestinian). Regional anchors:
// jerusalem (kaak & musakhan), gaza (coastal fish, qidra, sumagiyya), nablus
// (knafeh & fda), hebron (stuffed cabbage & taboon), jaffa (seafood & knafeh),
// haifa (maqluba hub & mtayba), safad (safadi cheese), jenin/tulkarim/ramallah/
// bethlehem (village staples), qalqilya/tubas (countryside). A handful of rows are
// deliberately shared (levantine_shared / mena_shared) and will be credited to the
// Palestinian card via the 'levant-palestine-2026' source prefix.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (ar, en, fr, es, de, category, mealType, region, cal_100) => ({
  name_ar: ar, name_en: en, name_fr: fr, name_es: es, name_de: de,
  category, mealType, region, cal_100,
});

const ROWS = [
  // ---------- mezze_appetizers (26) ----------
  R('مسابحة الحمص الفلسطينية', 'Palestinian msabbaha hummus', 'Msabbaha palestinienne', 'Msabbaha palestina', 'Palästinensisches Msabbaha', 'mezze_appetizers', 'snacks', 'pan_palestinian', 165),
  R('حمص الشام الفلسطيني', 'Palestinian chickpea dip', 'Houmous de Damas palestinien', 'Hummus shami palestino', 'Palästinensisches Damaskus-Hummus', 'mezze_appetizers', 'snacks', 'pan_palestinian', 170),
  R('حمص باللحمة المفرومة الفلسطيني', 'Hummus with ground meat', 'Houmous à la viande hachée', 'Hummus con carne picada', 'Hummus mit Hackfleisch', 'mezze_appetizers', 'snacks', 'pan_palestinian', 190),
  R('متبل الباذنجان الفلسطيني', 'Palestinian eggplant mutabal', 'Moutabal palestinien', 'Mutabal palestino', 'Palästinensisches Mutabal', 'mezze_appetizers', 'snacks', 'pan_palestinian', 95),
  R('بابا غنوج الفلسطيني بالرمان', 'Baba ghanoush with pomegranate', 'Baba ganoush à la grenade', 'Baba ghanoush con granada', 'Baba-Ghanoush mit Granatapfel', 'mezze_appetizers', 'snacks', 'pan_palestinian', 110),
  R('اللبنة الفلسطينية بالزيت البلدي', 'Palestinian labneh with olive oil', 'Labneh palestinien à lhuile', 'Labneh palestino con aceite', 'Palästinensisches Labneh mit Olivenöl', 'mezze_appetizers', 'snacks', 'pan_palestinian', 105),
  R('شنكليش الفلسطيني بالبندورة', 'Shanklish with tomato', 'Chanklich à la tomate', 'Shanklish con tomate', 'Shanklish mit Tomate', 'mezze_appetizers', 'snacks', 'pan_palestinian', 150),
  R('مكدوس الخليل بالزيت البلدي', 'Hebron makdous in olive oil', 'Makdous de Hébron à lhuile', 'Makdus de Hebrón en aceite', 'Hebron-Makdous in Olivenöl', 'mezze_appetizers', 'snacks', 'hebron', 155),
  R('جبنة الشلل الفلسطينية البلدي', 'Palestinian shilal cheese', 'Fromage shilal palestinien', 'Queso shilal palestino', 'Palästinischer Schilal-Käse', 'mezze_appetizers', 'snacks', 'pan_palestinian', 250),
  R('جبنة الصفدية البلدي', 'Safadi village cheese', 'Fromage de Safed du terroir', 'Queso de Safed', 'Safed-Käse vom Land', 'mezze_appetizers', 'snacks', 'safad', 245),
  R('جبنة حلوم الفلسطينية المشوية', 'Grilled halloumi Palestinian style', 'Halloumi grillé palestinien', 'Halloumi a la parrilla palestino', 'Gegrilltes palästinensisches Halloumi', 'mezze_appetizers', 'snacks', 'pan_palestinian', 230),
  R('زيتون جنين الأخضر بالمكسرة', 'Jenin crushed green olives', 'Olives vertes concassées de Jénine', 'Aceitunas verdes machacadas de Yenín', 'Zerstoßene grüne Oliven aus Dschenin', 'mezze_appetizers', 'snacks', 'jenin', 120),
  R('زيتون نابلسي بالليمون والكزبرة', 'Nablus olives with lemon and coriander', 'Olives de Naplouse au citron et coriandre', 'Aceitunas de Nablus con limón y cilantro', 'Nablus-Oliven mit Zitrone und Koriander', 'mezze_appetizers', 'snacks', 'nablus', 110),
  R('باذنجان مخلل فلسطيني بلدي', 'Palestinian pickled eggplant', 'Aubergines marinées palestiniennes', 'Berenjenas encurtidas palestinas', 'Palästinensische eingelegte Auberginen', 'mezze_appetizers', 'snacks', 'pan_palestinian', 35),
  R('لفت مخلل بلدي ملون', 'Village pickled turnips', 'Navets marinés du terroir', 'Nabos encurtidos caseros', 'Eingelegte Rüben vom Land', 'mezze_appetizers', 'snacks', 'pan_palestinian', 30),
  R('خيار المخلل الفلسطيني البلدي', 'Palestinian pickled cucumbers', 'Cornichons palestiniens', 'Pepinillos palestinos', 'Palästinensische Gewürzgurken', 'mezze_appetizers', 'snacks', 'pan_palestinian', 25),
  R('فول مدمس الفلسطيني بالزيت والليمون', 'Ful medames with oil and lemon', 'Foul moudammas au citron', 'Ful medames con limón', 'Ful-Mudammas mit Zitrone', 'mezze_appetizers', 'snacks', 'pan_palestinian', 120),
  R('حمص بيلا بالزيت البلدي', 'Chickpeas with village oil', 'Pois chiches à lhuile du terroir', 'Garbanzos con aceite campestre', 'Kichererbsen mit Dorföl', 'mezze_appetizers', 'snacks', 'pan_palestinian', 125),
  R('عدس بزيت الفلسطيني', 'Palestinian lentils in oil', 'Lentilles à lhuile palestiniennes', 'Lentejas en aceite palestinas', 'Palästinensische Linsen in Öl', 'mezze_appetizers', 'snacks', 'pan_palestinian', 115),
  R('بطاطا حارة الفلسطينية بالكزبرة', 'Palestinian potatoes with coriander', 'Batata harra à la coriandre', 'Batata harra con cilantro', 'Batata Harra mit Koriander', 'mezze_appetizers', 'snacks', 'pan_palestinian', 115),
  R('سمبوسك الجبنة الفلسطيني بالسمسم', 'Cheese sambousek with sesame', 'Sambousek au fromage et sésame', 'Sambusek de queso con sésamo', 'Käse-Sambousek mit Sesam', 'mezze_appetizers', 'snacks', 'pan_palestinian', 180),
  R('فطاير السبانخ الفلسطينية الشامية', 'Palestinian spinach pastries', 'Fatayer aux épinards palestiniens', 'Fatayer de espinacas palestinos', 'Palästinensische Spinat-Fatayer', 'mezze_appetizers', 'snacks', 'pan_palestinian', 185),
  R('فطاير الجبنة الفلسطينية بالزعتر', 'Cheese pastries with zaatar', 'Fatayer au fromage et zaatar', 'Fatayer de queso con zaatar', 'Käse-Fatayer mit Zaatar', 'mezze_appetizers', 'snacks', 'pan_palestinian', 190),
  R('مقانق الفلسطينية بالبصل والزيت', 'Makanek with onion and oil', 'Makanek à loignon et à lhuile', 'Makanek con cebolla y aceite', 'Makanek mit Zwiebel und Öl', 'mezze_appetizers', 'snacks', 'pan_palestinian', 185),
  R('قاورما فلسطينية بالثوم البلدي', 'Kawarma with village garlic', 'Kawarma à lail du terroir', 'Kawarma con ajo campestre', 'Kawarma mit Dorfknoblauch', 'mezze_appetizers', 'snacks', 'pan_palestinian', 195),
  R('حلاوة السمسم الفلسطينية بالطحينة', 'Palestinian tahini halva', 'Halva au sésame palestinienne', 'Halva de sésamo palestina', 'Palästinensische Sesam-Halva', 'mezze_appetizers', 'snacks', 'pan_palestinian', 330),

  // ---------- salads (18) ----------
  R('سلطة البندورة الفلسطينية بالبقدونس', 'Palestinian tomato and parsley salad', 'Salade de tomates au persil palestinienne', 'Ensalada de tomate y perejil palestina', 'Palästinensischer Tomaten-Petersilien-Salat', 'salads', 'snacks', 'pan_palestinian', 45),
  R('سلطة الخيار واللبن الفلسطينية', 'Palestinian cucumber and yogurt salad', 'Salade de concombre au yaourt', 'Ensalada de pepino con yogur', 'Gurken-Joghurt-Salat', 'salads', 'snacks', 'pan_palestinian', 55),
  R('فتوش فلسطيني بحامض الرمان', 'Palestinian fattoush with pomegranate', 'Fattoush à la grenade', 'Fattush con granada', 'Fattush mit Granatapfel', 'salads', 'snacks', 'pan_palestinian', 65),
  R('تبولة القرى الفلسطينية', 'Palestinian village tabbouleh', 'Taboulé des villages palestiniens', 'Tabule de pueblo palestino', 'Palästinensischer Dorf-Taboulé', 'salads', 'snacks', 'pan_palestinian', 55),
  R('سلطة الجرجير الفلسطينية بالجوز', 'Arugula salad with walnuts', 'Salade de roquette aux noix', 'Ensalada de rúcula con nueces', 'Rucolasalat mit Walnüssen', 'salads', 'snacks', 'pan_palestinian', 60),
  R('سلطة الباذنجان المشوي الفلسطيني', 'Grilled eggplant salad', 'Salade daubergine grillée', 'Ensalada de berenjena asada', 'Gegrillter Auberginensalat', 'salads', 'snacks', 'pan_palestinian', 85),
  R('سلطة الحمص الفلسطينية الباردة', 'Palestinian chickpea salad', 'Salade de pois chiches froide', 'Ensalada fría de garbanzos', 'Kalte Kichererbsensalate', 'salads', 'snacks', 'pan_palestinian', 125),
  R('سلطة العدس الفلسطيني المتبلة', 'Spiced lentil salad', 'Salade de lentilles épicée', 'Ensalada de lentejas especiada', 'Gewürzter Linsensalat', 'salads', 'snacks', 'pan_palestinian', 85),
  R('سلطة الفريكة الفلسطينية', 'Palestinian freekeh salad', 'Salade de freekeh palestinienne', 'Ensalada de freekeh palestina', 'Palästinensischer Freekeh-Salat', 'salads', 'snacks', 'pan_palestinian', 70),
  R('سلطة الرجلة الفلسطينية باللبن', 'Purslane salad with yogurt', 'Salade de pourpier au yaourt', 'Ensalada de verdolaga con yogur', 'Portulak-Joghurt-Salat', 'salads', 'snacks', 'pan_palestinian', 40),
  R('سلطة الملفوف الفلسطيني بالخل', 'Cabbage salad with vinegar', 'Salade de chou au vinaigre', 'Ensalada de col con vinagre', 'Kohlsalat mit Essig', 'salads', 'snacks', 'pan_palestinian', 50),
  R('سلطة الجزر الفلسطينية المبشورة', 'Shredded carrot salad', 'Salade de carottes râpées', 'Ensalada de zanahoria rallada', 'Geriebener Karottensalat', 'salads', 'snacks', 'pan_palestinian', 55),
  R('سلطة البطاطا الفلسطينية بالخل', 'Palestinian potato salad', 'Salade de pommes de terre au vinaigre', 'Ensalada de patata con vinagre', 'Kartoffelsalat mit Essig', 'salads', 'snacks', 'pan_palestinian', 115),
  R('سلطة الشمندر الفلسطيني بالطحينة', 'Beetroot salad with tahini', 'Salade de betterave au tahini', 'Ensalada de remolacha con tahini', 'Rote-Bete-Salat mit Tahini', 'salads', 'snacks', 'pan_palestinian', 75),
  R('سلطة اللفت الفلسطيني البلدي', 'Palestinian turnip salad', 'Salade de navets palestinienne', 'Ensalada de nabos palestina', 'Palästinensischer Rübensalat', 'salads', 'snacks', 'pan_palestinian', 35),
  R('سلطة الكوسا الفلسطينية بالنعناع', 'Courgette salad with mint', 'Salade de courgettes à la menthe', 'Ensalada de calabacín con menta', 'Zucchini-Minz-Salat', 'salads', 'snacks', 'pan_palestinian', 45),
  R('سلطة الزيتون الفلسطينية بالبصل', 'Olive salad with onion', 'Salade dolives à loignon', 'Ensalada de aceitunas con cebolla', 'Oliven-Zwiebel-Salat', 'salads', 'snacks', 'pan_palestinian', 95),
  R('سلطة خبيزة البيضاء الفلسطينية', 'Palestinian mallow leaf salad', 'Salade de mauve blanche', 'Ensalada de malva blanca', 'Salat aus weißer Malve', 'salads', 'snacks', 'pan_palestinian', 45),

  // ---------- soups (12) ----------
  R('شوربة العدس الفلسطينية بالليمون', 'Palestinian lentil soup with lemon', 'Soupe de lentilles au citron', 'Sopa de lentejas con limón', 'Linsensuppe mit Zitrone', 'soups', 'dinner', 'pan_palestinian', 85),
  R('شوربة العدس الفلسطينية بالسبانخ', 'Lentil soup with spinach', 'Soupe de lentilles aux épinards', 'Sopa de lentejas con espinacas', 'Linsen-Spinat-Suppe', 'soups', 'dinner', 'pan_palestinian', 80),
  R('شوربة العدس الأصفر الفلسطينية', 'Palestinian yellow lentil soup', 'Soupe de lentilles jaunes', 'Sopa de lentejas amarillas', 'Gelbe Linsensuppe', 'soups', 'dinner', 'pan_palestinian', 90),
  R('شوربة خضار البيت الفلسطينية', 'Palestinian home vegetable soup', 'Soupe de légumes maison', 'Sopa de verduras casera', 'Hausgemachte Gemüsesuppe', 'soups', 'dinner', 'pan_palestinian', 55),
  R('شوربة دجاج فلسطينية بالشعيرية', 'Chicken soup with vermicelli', 'Soupe de poulet aux vermicelles', 'Sopa de pollo con fideos', 'Hühnersuppe mit Fadennudeln', 'soups', 'dinner', 'levantine_shared', 70),
  R('شوربة الفريكة الفلسطينية باللحم', 'Freekeh soup with meat', 'Soupe de freekeh à la viande', 'Sopa de freekeh con carne', 'Freekeh-Fleischsuppe', 'soups', 'dinner', 'pan_palestinian', 90),
  R('شوربة الذرة الفلسطينية بالكريمة', 'Creamy corn soup', 'Soupe de maïs crémeuse', 'Sopa cremosa de maíz', 'Cremige Maiscremesuppe', 'soups', 'dinner', 'pan_palestinian', 85),
  R('شوربة الحمص الفلسطينية بالطحينة', 'Chickpea soup with tahini', 'Soupe de pois chiches au tahini', 'Sopa de garbanzos con tahini', 'Kichererbsen-Tahini-Suppe', 'soups', 'dinner', 'pan_palestinian', 95),
  R('شوربة البندورة الفلسطينية بالزعتر', 'Tomato soup with zaatar', 'Soupe de tomate au zaatar', 'Sopa de tomate con zaatar', 'Tomaten-Zaatar-Suppe', 'soups', 'dinner', 'pan_palestinian', 60),
  R('شوربة الكوسا الفلسطينية الخفيفة', 'Light courgette soup', 'Soupe de courgettes légère', 'Sopa ligera de calabacín', 'Leichte Zucchinisuppe', 'soups', 'dinner', 'pan_palestinian', 50),
  R('شوربة خبيزة الفلسطينية البلدي', 'Palestinian mallow soup', 'Soupe de mauve palestinienne', 'Sopa de malva palestina', 'Palästinensische Malvensuppe', 'soups', 'dinner', 'pan_palestinian', 50),
  R('شوربة البازيلاء الفلسطينية بالجزر', 'Pea and carrot soup', 'Soupe de petits pois et carottes', 'Sopa de guisantes y zanahoria', 'Erbsen-Karotten-Suppe', 'soups', 'dinner', 'pan_palestinian', 65),

  // ---------- kibbeh_dishes (18) ----------
  R('كبة نابلسية بالصنوبر الفلسطينية', 'Nablusi kibbeh with pine nuts', 'Kibbeh nabulsi aux pignons', 'Kibbeh nabulsi con piñones', 'Nablus-Kibbeh mit Pinienkernen', 'kibbeh_dishes', 'lunch', 'nablus', 190),
  R('كبة النية الفلسطينية البلدي', 'Palestinian raw kibbeh', 'Kibbeh nayé palestinien', 'Kibbeh crudo palestino', 'Palästinensisches rohes Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 160),
  R('كبة مقلية الفلسطينية بالبقدونس', 'Fried kibbeh with parsley', 'Kibbeh frit au persil', 'Kibbeh frito con perejil', 'Gebratenes Kibbeh mit Petersilie', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 215),
  R('كبة مشوية الفلسطينية على الفحم', 'Charcoal grilled kibbeh', 'Kibbeh grillé à la braise', 'Kibbeh a la brasa', 'Kibbeh vom Holzkohlengrill', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 195),
  R('كبة صينية الفلسطينية بالبندورة', 'Baked kibbeh with tomato', 'Kibbeh au four à la tomate', 'Kibbeh al horno con tomate', 'Ofen-Kibbeh mit Tomate', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 145),
  R('كبة بلبن الفلسطينية الدافئة', 'Kibbeh in warm yogurt', 'Kibbeh au laban chaud', 'Kibbeh en yogur caliente', 'Kibbeh in warmer Joghurtsauce', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 165),
  R('كبة بالطحينة الفلسطينية', 'Kibbeh in tahini sauce', 'Kibbeh au tahini', 'Kibbeh con salsa de tahini', 'Kibbeh in Tahinisauce', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 185),
  R('كبة الكرز الفلسطينية الموسمية', 'Seasonal cherry kibbeh', 'Kibbeh à la cerise', 'Kibbeh de cerezas estacional', 'Saisonales Kirsch-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 190),
  R('كبة القرع الفلسطينية', 'Palestinian pumpkin kibbeh', 'Kibbeh au potiron', 'Kibbeh de calabaza', 'Kürbis-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 140),
  R('كبة الجوز الفلسطينية', 'Palestinian walnut kibbeh', 'Kibbeh aux noix palestinien', 'Kibbeh de nuez palestino', 'Palästinensisches Walnuss-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 180),
  R('كبة البطاطا الفلسطينية البلدي', 'Palestinian potato kibbeh', 'Kibbeh de pommes de terre', 'Kibbeh de patata', 'Kartoffel-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 150),
  R('كبة الخضار الفلسطينية الصيفية', 'Summer vegetable kibbeh', 'Kibbeh de légumes dété', 'Kibbeh de verduras de verano', 'Sommerliches Gemüse-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 145),
  R('فدا نابلسية التقليدية', 'Traditional Nablusi fda kibbeh', 'Fda nabulsi traditionnelle', 'Fda tradicional de Nablus', 'Traditionelles Nablus-Fda', 'kibbeh_dishes', 'lunch', 'nablus', 165),
  R('كبة بالبرغل والفليفلة الفلسطينية', 'Kibbeh with bulgur and peppers', 'Kibbeh au boulgour et poivrons', 'Kibbeh con bulgur y pimientos', 'Kibbeh mit Bulgur und Paprika', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 175),
  R('كبة بالكوسا الفلسطينية البلدية', 'Village courgette kibbeh', 'Kibbeh de courgettes du terroir', 'Kibbeh de calabacín casero', 'Dorf-Zucchini-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 155),
  R('كبة الحمص الفلسطينية', 'Palestinian chickpea kibbeh', 'Kibbeh de pois chiches', 'Kibbeh de garbanzos', 'Kichererbsen-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 135),
  R('كبة السمك الفلسطينية المقلية', 'Palestinian fish kibbeh', 'Kibbeh de poisson frit', 'Kibbeh de pescado frito', 'Gebratenes Fisch-Kibbeh', 'kibbeh_dishes', 'lunch', 'gaza', 175),
  R('كبة اللبلابي الفلسطينية', 'Palestinian kibbeh lablabi', 'Kibbeh lablabi palestinien', 'Kibbeh lablabi palestino', 'Palästinensisches Kibbeh-Lablabi', 'kibbeh_dishes', 'lunch', 'pan_palestinian', 160),

  // ---------- manakish_pies (20) ----------
  R('منقوشة الزعتر الفلسطينية البلدي', 'Palestinian zaatar manakish', 'Manakish zaatar palestinien', 'Manakish zaatar palestino', 'Palästinisches Zaatar-Manakish', 'manakish_pies', 'breakfast', 'pan_palestinian', 215),
  R('منقوشة الجبنة البيضاء الفلسطينية', 'White cheese manakish', 'Manakish au fromage blanc', 'Manakish de queso blanco', 'Weißkäse-Manakish', 'manakish_pies', 'breakfast', 'pan_palestinian', 210),
  R('منقوشة اللحمة الفلسطينية القدسية', 'Jerusalem meat manakish', 'Manakish à la viande de Jérusalem', 'Manakish de carne de Jerusalén', 'Jerusalem-Fleisch-Manakish', 'manakish_pies', 'lunch', 'jerusalem', 245),
  R('صفيحة اللحمة الفلسطينية بالشومر', 'Sfiha with fennel', 'Sfiha au fenouil', 'Sfiha con hinojo', 'Sfiha mit Fenchel', 'manakish_pies', 'lunch', 'pan_palestinian', 225),
  R('صفيحة الجبنة الفلسطينية', 'Palestinian cheese sfiha', 'Sfiha au fromage', 'Sfiha de queso', 'Käse-Sfiha', 'manakish_pies', 'breakfast', 'pan_palestinian', 220),
  R('لحم بعجين الفلسطيني بالبندورة', 'Palestinian lahm bi ajeen', 'Lahm bi ajin palestinien', 'Lahm bi ajeen palestino', 'Palästinensisches Lahm bi Ajeen', 'manakish_pies', 'lunch', 'pan_palestinian', 215),
  R('كعك القدس الفلسطيني بالزعتر', 'Jerusalem zaatar kaak', 'Kaak de Jérusalem au zaatar', 'Kaak de Jerusalén con zaatar', 'Jerusalem-Kaak mit Zaatar', 'manakish_pies', 'breakfast', 'jerusalem', 235),
  R('كعك بالجبنة الفلسطيني البلدي', 'Palestinian cheese kaak', 'Kaak au fromage palestinien', 'Kaak de queso palestino', 'Palästinensisches Käse-Kaak', 'manakish_pies', 'breakfast', 'pan_palestinian', 230),
  R('كعك بالسمن الفلسطيني البلدي', 'Kaak with village ghee', 'Kaak au ghee du terroir', 'Kaak con ghee casero', 'Kaak mit Dorf-Ghee', 'manakish_pies', 'breakfast', 'pan_palestinian', 240),
  R('منقوشة البيض الفلسطينية بالبندورة', 'Egg manakish with tomato', 'Manakish à loeuf et tomate', 'Manakish de huevo y tomate', 'Ei-Tomaten-Manakish', 'manakish_pies', 'breakfast', 'pan_palestinian', 205),
  R('فطيرة السبانخ الفلسطينية بالسماق', 'Spinach pie with sumac', 'Tarte épinards au sumac', 'Empanada de espinacas con suma', 'Spinat-Sumach-Tasche', 'manakish_pies', 'breakfast', 'pan_palestinian', 190),
  R('رغيف الزعترية الفلسطيني الداكن', 'Dark zaatari loaf', 'Pain zaatari au blé entier', 'Pan zaatari integral', 'Dunkles Zaatar-Brot', 'manakish_pies', 'breakfast', 'pan_palestinian', 200),
  R('معجنات الكشك الفلسطينية', 'Palestinian kishk pastries', 'Fatayer au kishk palestiniens', 'Fatayer de kishk palestinos', 'Palästinensisches Kishk-Gebäck', 'manakish_pies', 'breakfast', 'pan_palestinian', 210),
  R('خبز الطابون الفلسطيني الخليلي', 'Hebron taboon bread', 'Pain taboon de Hébron', 'Pan taboon de Hebrón', 'Hebron-Taboon-Brot', 'manakish_pies', 'breakfast', 'hebron', 185),
  R('خبز الملوح الفلسطيني', 'Palestinian mlouh bread', 'Pain mlouh palestinien', 'Pan mlouh palestino', 'Palästinensisches Mlouh-Brot', 'manakish_pies', 'breakfast', 'pan_palestinian', 190),
  R('خبز ساج القرية الفلسطينية', 'Village saaj bread', 'Pain saj du village', 'Pan saj de pueblo', 'Dorf-Saj-Brot', 'manakish_pies', 'breakfast', 'pan_palestinian', 180),
  R('سمبوسك اللحمة الفلسطيني', 'Palestinian meat sambousek', 'Sambousek à la viande', 'Sambusek de carne', 'Fleisch-Sambousek', 'manakish_pies', 'lunch', 'pan_palestinian', 195),
  R('شومبورك الفلسطيني باللحمة', 'Palestinian shumburik', 'Chomborak palestinien', 'Shumburik palestino', 'Palästinensisches Shumburik', 'manakish_pies', 'lunch', 'pan_palestinian', 195),
  R('مناقيش اللبنة الفلسطينية بالنعناع', 'Labneh manakish with mint', 'Manakish labneh à la menthe', 'Manakish de labneh con menta', 'Labneh-Minz-Manakish', 'manakish_pies', 'breakfast', 'pan_palestinian', 205),
  R('فطيرة البطاطا الفلسطينية', 'Palestinian potato pie', 'Tarte à la pomme de terre', 'Empanada de patata', 'Kartoffelpastete', 'manakish_pies', 'breakfast', 'pan_palestinian', 200),

  // ---------- mains_grills (40) ----------
  R('مسخن الدجاج الفلسطيني البلدي', 'Palestinian musakhan chicken', 'Mousakhan palestinien', 'Musakhan palestino', 'Palästinensisches Musakhan', 'mains_grills', 'lunch', 'pan_palestinian', 185),
  R('مسخن القدس بالبصل والسماق', 'Jerusalem musakhan feast', 'Mousakhan de Jérusalem', 'Musakhan de Jerusalén', 'Jerusalemer Musakhan-Festessen', 'mains_grills', 'lunch', 'jerusalem', 190),
  R('مسخن الدجاج الغزاوي المتبل', 'Gazan spiced musakhan', 'Mousakhan épicé de Gaza', 'Musakhan especiado de Gaza', 'Gewürztes Gaza-Musakhan', 'mains_grills', 'lunch', 'gaza', 195),
  R('مقلوبة الدجاج الفلسطينية', 'Palestinian chicken maqluba', 'Maqluba de poulet palestinienne', 'Maqluba de pollo palestina', 'Palästinensische Hühner-Maqluba', 'mains_grills', 'lunch', 'pan_palestinian', 170),
  R('مقلوبة اللحمة الفلسطينية بالخضار', 'Vegetable meat maqluba', 'Maqluba de viande aux légumes', 'Maqluba de carne con verduras', 'Gemüse-Fleisch-Maqluba', 'mains_grills', 'lunch', 'pan_palestinian', 180),
  R('مقلوبة يافا بالسمك', 'Jaffa fish maqluba', 'Maqluba de poisson de Jaffa', 'Maqluba de pescado de Jaffa', 'Jaffa-Fisch-Maqluba', 'mains_grills', 'lunch', 'jaffa', 175),
  R('قدرة القدس بلحم الضأن', 'Jerusalem lamb qidra', 'Qidra dagh de Jérusalem', 'Qidra de cordero de Jerusalén', 'Jerusalemer Lamm-Qidra', 'mains_grills', 'lunch', 'jerusalem', 185),
  R('قدرة غزة بالدجاج والحمص', 'Gazan chicken qidra with chickpeas', 'Qidra de poulet aux pois chiches', 'Qidra de pollo con garbanzos', 'Gaza-Hühner-Qidra mit Kichererbsen', 'mains_grills', 'lunch', 'gaza', 180),
  R('سماقية غزية بالكوسا', 'Gazan sumagiyya with courgettes', 'Sumagiyya aux courgettes', 'Sumagiyya con calabacín', 'Sumagiyya mit Zucchini', 'mains_grills', 'lunch', 'gaza', 120),
  R('سماقية غزية بالسبانخ', 'Gazan sumagiyya with spinach', 'Sumagiyya aux épinards', 'Sumagiyya con espinacas', 'Sumagiyya mit Spinat', 'mains_grills', 'lunch', 'gaza', 115),
  R('خبيزة الفلسطينية بالبصل البلدي', 'Palestinian mallow with onion', 'Mauve aux oignons', 'Malva con cebolla', 'Malve mit Zwiebeln', 'mains_grills', 'lunch', 'pan_palestinian', 75),
  R('عكوب الفلسطيني باللحمة', 'Cakoub with lamb', 'Cakoub à lagneau', 'Cakub con cordero', 'Cakoub mit Lamm', 'mains_grills', 'lunch', 'pan_palestinian', 115),
  R('هندبة الفلسطينية بالزيت البلدي', 'Palestinian hindbeh in oil', 'Hindbeh à lhuile', 'Hindbeh en aceite', 'Hindbeh in Öl', 'mains_grills', 'lunch', 'pan_palestinian', 80),
  R('زرب الفخار الفلسطيني بالدجاج', 'Clay pot Palestinian zarb', 'Zarb de poterie palestinien', 'Zarb de barro palestino', 'Palästinensisches Tontopf-Zarb', 'mains_grills', 'lunch', 'gaza', 165),
  R('كبسة الدجاج الفلسطينية المتبلة', 'Palestinian spiced chicken kabsa', 'Kabsa de poulet épicée', 'Kabsa de pollo especiada', 'Gewürzte Hühner-Kabsa', 'mains_grills', 'lunch', 'pan_palestinian', 175),
  R('شيش طاووق الفلسطيني بالثوم', 'Palestinian garlic shish taouk', 'Chiche taouk palestinien', 'Shish taouk palestino', 'Palästinensischer Shish-Taouk', 'mains_grills', 'lunch', 'pan_palestinian', 200),
  R('شيش كباب الفلسطيني البلدي', 'Palestinian shish kebab', 'Chiche kebab palestinien', 'Shish kebab palestino', 'Palästinensischer Shish-Kebab', 'mains_grills', 'lunch', 'pan_palestinian', 185),
  R('كفتة الفلسطينية بالطحينة', 'Palestinian kofta with tahini', 'Kofta au tahini palestinienne', 'Kofta con tahini palestina', 'Palästinensische Kofta mit Tahini', 'mains_grills', 'lunch', 'pan_palestinian', 190),
  R('كفتة البطاطا الفلسطينية', 'Palestinian potato kofta', 'Kofta de pommes de terre', 'Kofta de patata', 'Kartoffel-Kofta', 'mains_grills', 'lunch', 'pan_palestinian', 155),
  R('كباب باذنجان الفلسطيني', 'Palestinian eggplant kebab', 'Kebab daubergine palestinien', 'Kebab de berenjena palestino', 'Palästinensisches Auberginen-Kebab', 'mains_grills', 'lunch', 'pan_palestinian', 160),
  R('كباب كرز الغور الفلسطيني', 'Jordan Valley cherry kebab', 'Kebab cerise de la vallée', 'Kebab de cerezas del valle', 'Kirsch-Kebab aus dem Jordantal', 'mains_grills', 'lunch', 'pan_palestinian', 175),
  R('داوود باشا الفلسطيني بالبازيلاء', 'Palestinian daoud pasha', 'Daoud bacha aux petits pois', 'Daoud basha con guisantes', 'Daoud-Pascha mit Erbsen', 'mains_grills', 'lunch', 'pan_palestinian', 185),
  R('فرخة محشية الفلسطينية بالصنوبر', 'Stuffed chicken with pine nuts', 'Poulet farci aux pignons', 'Pollo relleno con piñones', 'Gefülltes Hähnchen mit Pinienkernen', 'mains_grills', 'lunch', 'pan_palestinian', 195),
  R('حمام محشي الفلسطيني البلدي', 'Palestinian stuffed squab', 'Pigeon farci palestinien', 'Paloma rellena palestina', 'Palästinensische gefüllte Taube', 'mains_grills', 'lunch', 'pan_palestinian', 190),
  R('دجاج مشوي الفلسطيني بالبهارات', 'Spiced grilled chicken', 'Poulet grillé aux épices', 'Pollo a la parrilla especiado', 'Gewürztes Grillhähnchen', 'mains_grills', 'lunch', 'pan_palestinian', 180),
  R('جوانح فلسطينية بالصنوبر والبقدونس', 'Wings with pine nuts and parsley', 'Ailes aux pignons et persil', 'Alitas con piñones y perejil', 'Flügel mit Pinienkernen und Petersilie', 'mains_grills', 'lunch', 'pan_palestinian', 185),
  R('ملوخية الفلسطينية بالدجاج والليمون', 'Chicken mlukhiyeh with lemon', 'Mlukhiyeh au poulet et citron', 'Mlukhiya con pollo y limón', 'Hühner-Mlukhiye mit Zitrone', 'mains_grills', 'lunch', 'pan_palestinian', 135),
  R('فريكة الفلسطينية بالدجاج', 'Palestinian chicken freekeh', 'Freekeh au poulet palestinien', 'Freekeh con pollo palestino', 'Palästinensisches Hühner-Freekeh', 'mains_grills', 'lunch', 'pan_palestinian', 165),
  R('جريش الفلسطيني البلدية', 'Palestinian jareesh bulgur', 'Jarish palestinien', 'Jaresh palestino', 'Palästinensisches Jareesh', 'mains_grills', 'lunch', 'pan_palestinian', 150),
  R('قلاية البندورة الفلسطينية بالبيض', 'Palestinian qalayet bandora with eggs', 'Qalayet bandora aux oeufs', 'Qalayet bandura con huevos', 'Qalayet Bandora mit Eiern', 'mains_grills', 'lunch', 'pan_palestinian', 130),
  R('الرشوف الفلسطيني بالنعناع', 'Palestinian rshaif with mint', 'Rshaif à la menthe', 'Rshaif con menta', 'Rshaif mit Minze', 'mains_grills', 'lunch', 'pan_palestinian', 130),
  R('مطبق حيفا الفلسطيني', 'Haifa mtayba omelette', 'Mtayba de Haïfa', 'Mtayba de Haifa', 'Haifa-Mtayba-Omelett', 'mains_grills', 'breakfast', 'haifa', 170),
  R('عجة البيض الفلسطينية بالبقدونس', 'Parsley egg ajeh', 'Ajeh au persil', 'Ajeh de perejil', 'Petersilien-Eieromelett', 'mains_grills', 'breakfast', 'pan_palestinian', 150),
  R('محاشي الكوسا الفلسطينية باللحمة', 'Stuffed courgettes Palestinian style', 'Courgettes farcies palestiniennes', 'Calabacines rellenos palestinos', 'Palästinensische gefüllte Zucchini', 'mains_grills', 'lunch', 'pan_palestinian', 150),
  R('محاشي ورق العنب الفلسطينية بالرمان', 'Vine leaves stuffed with pomegranate', 'Feuilles de vigne à la grenade', 'Hojas de parra rellenas con granada', 'Gefüllte Weinblätter mit Granatapfel', 'mains_grills', 'lunch', 'pan_palestinian', 160),
  R('كرمب الخليل المحشي باللحمة', 'Hebron stuffed cabbage', 'Chou farci de Hébron', 'Col rellena de Hebrón', 'Gefüllter Hebrón-Kohl', 'mains_grills', 'lunch', 'hebron', 145),
  R('باذنجان محشي الفلسطيني بالصنوبر', 'Eggplant stuffed with pine nuts', 'Aubergine farcie aux pignons', 'Berenjena rellena con piñones', 'Mit Pinienkernen gefüllte Aubergine', 'mains_grills', 'lunch', 'pan_palestinian', 150),
  R('ملفوف محشي الفلسطيني باللحم', 'Stuffed cabbage with meat', 'Chou farci à la viande', 'Col rellena con carne', 'Gefüllter Kohl mit Fleisch', 'mains_grills', 'lunch', 'pan_palestinian', 140),
  R('قرنبيط الفلسطيني بالطحينة واللحم', 'Cauliflower with tahini and meat', 'Chou-fleur au tahini et viande', 'Coliflor con tahini y carne', 'Blumenkohl mit Tahini und Fleisch', 'mains_grills', 'lunch', 'pan_palestinian', 150),
  R('اللحمة الفلسطينية بالفرن البلدي', 'Palestinian oven lamb', 'Agneau rôti au four', 'Cordero al horno casero', 'Palästinensisches Ofenlamm', 'mains_grills', 'lunch', 'pan_palestinian', 185),

  // ---------- rice_dishes (20) ----------
  R('رز المفلفل الفلسطيني بالصنوبر', 'Palestinian fluffy rice with pine nuts', 'Riz pilaf aux pignons', 'Arroz esponjoso con piñones', 'Fluffiger Reis mit Pinienkernen', 'rice_dishes', 'lunch', 'pan_palestinian', 170),
  R('عدس بالرز الفلسطيني بالبصل', 'Palestinian lentils and rice', 'Riz aux lentilles et oignons', 'Arroz con lentejas y cebolla', 'Linsen-Reis mit Zwiebeln', 'rice_dishes', 'lunch', 'pan_palestinian', 155),
  R('مجدرة الفلسطينية الأصلية', 'Authentic mujaddara', 'Moudjaddara authentique', 'Mujaddara auténtica', 'Authentische Mujaddara', 'rice_dishes', 'lunch', 'pan_palestinian', 155),
  R('الرز الفلسطيني بالحليب والسكر البلدي', 'Palestinian rice pudding', 'Riz au lait au sucre', 'Arroz con leche casero', 'Milchreis mit Zucker', 'rice_dishes', 'lunch', 'pan_palestinian', 150),
  R('البرغل الفلسطيني باللبن الساخن', 'Bulgur in hot yogurt', 'Boulgour au laban chaud', 'Bulgur en yogur caliente', 'Bulgur in warmer Joghurtsauce', 'rice_dishes', 'lunch', 'pan_palestinian', 140),
  R('البرغل الفلسطيني بالفليفلة', 'Bulgur with peppers', 'Boulgour aux poivrons', 'Bulgur con pimientos', 'Bulgur mit Paprika', 'rice_dishes', 'lunch', 'pan_palestinian', 150),
  R('رز بالسبانخ الفلسطيني بالثوم', 'Rice with spinach and garlic', 'Riz aux épinards et ail', 'Arroz con espinacas y ajo', 'Reis mit Spinat und Knoblauch', 'rice_dishes', 'lunch', 'pan_palestinian', 145),
  R('رز بالقرنبيط الفلسطيني المحمص', 'Rice with roasted cauliflower', 'Riz au chou-fleur rôti', 'Arroz con coliflor asada', 'Reis mit geröstetem Blumenkohl', 'rice_dishes', 'lunch', 'pan_palestinian', 155),
  R('رز البندورة الفلسطينية باللحمة', 'Tomato rice with meat', 'Riz à la tomate et viande', 'Arroz con tomate y carne', 'Tomatenreis mit Fleisch', 'rice_dishes', 'lunch', 'pan_palestinian', 160),
  R('رز بالجزر والبازيلاء الفلسطيني', 'Rice with carrots and peas', 'Riz aux carottes et petits pois', 'Arroz con zanahorias y guisantes', 'Reis mit Karotten und Erbsen', 'rice_dishes', 'lunch', 'pan_palestinian', 150),
  R('رز أصفر الفلسطيني بالبهارات', 'Saffron-spiced golden rice', 'Riz jaune aux épices', 'Arroz amarillo especiado', 'Gewürzter gelber Reis', 'rice_dishes', 'lunch', 'pan_palestinian', 160),
  R('رز الفريكة الفلسطينية بالسمك', 'Freekeh rice with fish', 'Riz freekeh au poisson', 'Arroz freekeh con pescado', 'Freekeh-Reis mit Fisch', 'rice_dishes', 'lunch', 'gaza', 165),
  R('صيادية غزة الفلسطينية', 'Gazan sayyadieh fish', 'Sayadieh de Gaza', 'Sayadieh de Gaza', 'Gaza-Sayyadieh', 'rice_dishes', 'lunch', 'gaza', 160),
  R('مفتول الفلسطيني بالدجاج', 'Palestinian maftoul chicken', 'Mafloul de poulet palestinien', 'Maftul de pollo palestino', 'Palästinensisches Hühner-Maftoul', 'rice_dishes', 'lunch', 'pan_palestinian', 165),
  R('مفتول بالفاصولياء الفلسطيني', 'Maftoul with beans', 'Mafloul aux haricots', 'Maftul con judías', 'Maftoul mit Bohnen', 'rice_dishes', 'lunch', 'pan_palestinian', 150),
  R('عبيات الرز الفلسطينية باللحم', 'Palestinian rice bite rolls', 'Abiyaat de riz à la viande', 'Rollitos de arroz con carne', 'Reisröllchen mit Fleisch', 'rice_dishes', 'lunch', 'pan_palestinian', 175),
  R('رز اللوز الفلسطيني بالزبيب', 'Rice with almonds and raisins', 'Riz aux amandes et raisins secs', 'Arroz con almendras y pasas', 'Reis mit Mandeln und Rosinen', 'rice_dishes', 'lunch', 'pan_palestinian', 180),
  R('شوفان الفلسطيني باللبن', 'Bulgar oats with yogurt', 'Avoine au yaourt', 'Avena con yogur', 'Hafer mit Joghurt', 'rice_dishes', 'breakfast', 'pan_palestinian', 130),
  R('البرغل الفلسطيني بالبندورة', 'Bulgur with tomato', 'Boulgour à la tomate', 'Bulgur con tomate', 'Bulgur mit Tomate', 'rice_dishes', 'lunch', 'pan_palestinian', 145),
  R('معكرونة الفلسطينية بالزيت البلدي', 'Palestinian pasta with village oil', 'Pâtes à lhuile du terroir', 'Pasta con aceite casero', 'Pasta mit Dorföl', 'rice_dishes', 'lunch', 'pan_palestinian', 165),

  // ---------- fish_seafood (16) ----------
  R('صيادية غزة بالروبيان', 'Gazan shrimp sayyadieh', 'Sayadieh aux crevettes', 'Sayadieh de camarones', 'Garnelen-Sayyadieh', 'fish_seafood', 'lunch', 'gaza', 155),
  R('سمك حرة الفلسطيني بالطحينة', 'Fish harrah with tahini', 'Poisson harrah au tahini', 'Pescado harrah con tahini', 'Fisch-Harrah mit Tahini', 'fish_seafood', 'lunch', 'gaza', 175),
  R('بلطي الفلسطيني بالبندورة', 'Palestinian tilapia with tomato', 'Tilapia à la tomate', 'Tilapia con tomate', 'Tilapia mit Tomate', 'fish_seafood', 'lunch', 'pan_palestinian', 150),
  R('سردين غزة المشوي بالزيت البلدي', 'Grilled Gaza sardines', 'Sardines grillées de Gaza', 'Sardinas a la parrilla de Gaza', 'Gegrillte Gaza-Sardinen', 'fish_seafood', 'lunch', 'gaza', 185),
  R('جمبري غزة المقلي بالثوم', 'Fried Gaza prawns with garlic', 'Crevettes frites à lail', 'Camarones fritos con ajo', 'Gebratene Knoblauch-Garnelen', 'fish_seafood', 'lunch', 'gaza', 140),
  R('بيتار غزة بلح البحر', 'Gazan mussels baytar', 'Moules baytar de Gaza', 'Mejillones baytar de Gaza', 'Gaza-Miesmuscheln Baytar', 'fish_seafood', 'lunch', 'gaza', 120),
  R('سمك مشوي الفلسطيني على الفحم', 'Charcoal grilled Palestinian fish', 'Poisson grillé à la braise', 'Pescado a la brasa', 'Fisch vom Holzkohlengrill', 'fish_seafood', 'lunch', 'pan_palestinian', 175),
  R('سمك مقلي الفلسطيني بالليمون', 'Fried fish with lemon', 'Poisson frit au citron', 'Pescado frito con limón', 'Gebratener Fisch mit Zitrone', 'fish_seafood', 'lunch', 'pan_palestinian', 190),
  R('سلطان إبراهيم يافا البلدي', 'Jaffa red mullet', 'Rouget de Jaffa', 'Salmonete de Jaffa', 'Jaffa-Rotbarbe', 'fish_seafood', 'lunch', 'jaffa', 150),
  R('حبار الفلسطيني بالبقدونس', 'Squid with parsley', 'Calamars au persil', 'Calamares con perejil', 'Tintenfisch mit Petersilie', 'fish_seafood', 'lunch', 'pan_palestinian', 160),
  R('روبيان الفلسطيني بالبصل البلدي', 'Prawns with local onion', 'Crevettes à loignon du terroir', 'Camarones con cebolla local', 'Garnelen mit Dorfzwiebeln', 'fish_seafood', 'lunch', 'pan_palestinian', 130),
  R('تنديري غزة بلح البحر بالبقدونس', 'Gazan mussel tanderi', 'Tanderi de moules', 'Mejillones tanderi', 'Miesmuschel-Tanderi', 'fish_seafood', 'lunch', 'gaza', 125),
  R('سمك الفلسطيني بالكزبرة', 'Fish with coriander', 'Poisson à la coriandre', 'Pescado con cilantro', 'Fisch mit Koriander', 'fish_seafood', 'lunch', 'pan_palestinian', 160),
  R('بلطي محشي الفلسطيني بالأعشاب', 'Tilapia stuffed with herbs', 'Tilapia farcie aux herbes', 'Tilapia rellena de hierbas', 'Mit Kräutern gefüllte Tilapia', 'fish_seafood', 'lunch', 'pan_palestinian', 165),
  R('جمبري الفلسطيني على الجمر', 'Charcoal prawns', 'Crevettes à la braise', 'Camarones a la brasa', 'Garnelen vom Holzkohlengrill', 'fish_seafood', 'lunch', 'gaza', 135),
  R('محشي السمك الفلسطيني بالرز', 'Fish stuffed with rice', 'Poisson farci au riz', 'Pescado relleno de arroz', 'Mit Reis gefüllter Fisch', 'fish_seafood', 'lunch', 'pan_palestinian', 170),

  // ---------- sweets_desserts (24) ----------
  R('كنافة نابلسية الفلسطينية بالجبنة', 'Nablusi knafeh with cheese', 'Knafeh nabulsi au fromage', 'Canafe nabulsi con queso', 'Nablus-Kanafeh mit Käse', 'sweets_desserts', 'snacks', 'nablus', 260),
  R('كنافة نابلسية الفلسطينية بالقشطة', 'Knafeh with cream', 'Knafeh nabulsi à la crème', 'Canafe nabulsi con crema', 'Nablus-Kanafeh mit Sahne', 'sweets_desserts', 'snacks', 'nablus', 255),
  R('كنافة يافا الساحلية', 'Jaffa coastal knafeh', 'Knafeh de Jaffa', 'Canafe de Jaffa', 'Jaffa-Küsten-Kanafeh', 'sweets_desserts', 'snacks', 'jaffa', 265),
  R('حلاوة الجبن الفلسطيني بالسكر البلدي', 'Palestinian halawet el jibn', 'Halawet el jibn palestinien', 'Halawet el jibn palestino', 'Palästinensisches Halawet el Jibn', 'sweets_desserts', 'snacks', 'pan_palestinian', 250),
  R('البقلاوة الفلسطينية بالفستق', 'Palestinian pistachio baklava', 'Baklava aux pistaches', 'Baklava de pistacho', 'Pistazien-Baklava', 'sweets_desserts', 'snacks', 'pan_palestinian', 330),
  R('غريبة الفلسطينية بالجوز', 'Walnut ghraybeh', 'Ghraybeh aux noix', 'Ghuraiba de nuez', 'Walnuss-Ghuraiba', 'sweets_desserts', 'snacks', 'pan_palestinian', 315),
  R('برازق الفلسطيني بالسمسم', 'Sesame barazek', 'Barazek au sésame', 'Barazek de sésamo', 'Sesam-Barazek', 'sweets_desserts', 'snacks', 'pan_palestinian', 340),
  R('معمول الفلسطيني بالتمر والجوز', 'Date and walnut maamoul', 'Maamoul dattes et noix', 'Maamoul de dátiles y nuez', 'Dattel-Walnuss-Maamoul', 'sweets_desserts', 'snacks', 'pan_palestinian', 265),
  R('معمول الخليل بالسميد', 'Hebron semolina maamoul', 'Maamoul de Hébron à la semoule', 'Maamoul de sémola de Hebrón', 'Hebron-Grieß-Maamoul', 'sweets_desserts', 'snacks', 'hebron', 270),
  R('سفوف الفلسطيني بالكركم', 'Turmeric sfouf', 'Sfouf au curcuma', 'Sfouf de cúrcuma', 'Kurkuma-Sfouf', 'sweets_desserts', 'snacks', 'pan_palestinian', 285),
  R('نمورة الفلسطينية بالسميد', 'Semolina nammoura', 'Nammoura à la semoule', 'Nammura de sémola', 'Grieß-Nammoura', 'sweets_desserts', 'snacks', 'pan_palestinian', 240),
  R('شعبيات الفلسطيني بالشيرة', 'Shaabiyat with syrup', 'Cheabiyat au sirop', 'Shaabiyat con almíbar', 'Shaabiyat mit Sirup', 'sweets_desserts', 'snacks', 'pan_palestinian', 295),
  R('زلابية نابلسية بالشيرة', 'Nablusi zalabieh', 'Zalabieh aux sirop', 'Zalabieh con almíbar', 'Nablus-Zalabieh mit Sirup', 'sweets_desserts', 'snacks', 'nablus', 280),
  R('لقمة القاضي الفلسطيني بالعسل', 'Palestinian luqaimat with honey', 'Loukoumades au miel', 'Luqaimat con miel', 'Luqaimat mit Honig', 'sweets_desserts', 'snacks', 'pan_palestinian', 285),
  R('زنود الست الفلسطيني بالفستق', 'Znoud el sit with pistachio', 'Znoud el sit aux pistaches', 'Znoud el sit con pistacho', 'Znoud-el-Sit mit Pistazien', 'sweets_desserts', 'snacks', 'pan_palestinian', 290),
  R('مهلبية الفلسطينية بالورد', 'Rose muhallabieh', 'Muhallabieh à leau de rose', 'Muhalabiya de agua de rosas', 'Rosenwasser-Muhallabieh', 'sweets_desserts', 'snacks', 'pan_palestinian', 130),
  R('مغلي الفلسطيني باليانسون', 'Meghli with anise', 'Meghli à lanis', 'Meghli con anís', 'Meghli mit Anis', 'sweets_desserts', 'snacks', 'pan_palestinian', 170),
  R('المشلش الفلسطيني البلدي', 'Palestinian mashloosh', 'Mashloosh palestinien', 'Mashlush palestino', 'Palästinensisches Mashlush', 'sweets_desserts', 'snacks', 'pan_palestinian', 150),
  R('قطايف الفلسطيني بالجبنة الحلوة', 'Sweet cheese qatayef', 'Qatayef au fromage sucré', 'Qatayef con queso dulce', 'Süßkäse-Qatayef', 'sweets_desserts', 'snacks', 'pan_palestinian', 255),
  R('قطايف الفلسطيني بالجوز والقرفة', 'Walnut cinnamon qatayef', 'Qatayef noix et cannelle', 'Qatayef de nuez y canela', 'Walnuss-Zimt-Qatayef', 'sweets_desserts', 'snacks', 'pan_palestinian', 260),
  R('رز بحليب الفلسطيني بالفستق', 'Rice pudding with pistachio', 'Riz au lait aux pistaches', 'Arroz con leche con pistacho', 'Milchreis mit Pistazien', 'sweets_desserts', 'snacks', 'pan_palestinian', 155),
  R('كعك العيد الفلسطيني بالسكر', 'Palestinian Eid kaak', 'Kaak de lAïd au sucre', 'Kaak de fiesta con azúcar', 'Zucker-Eid-Kaak', 'sweets_desserts', 'snacks', 'pan_palestinian', 240),
  R('حلوى الطحينية الفلسطينية بالفستق', 'Pistachio tahini halva', 'Halva au tahini et pistaches', 'Halva de tahini con pistacho', 'Pistazien-Tahini-Halva', 'sweets_desserts', 'snacks', 'pan_palestinian', 330),
  R('بولر الفلسطيني بالسميد', 'Semolina bolur', 'Bolour à la semoule', 'Bolur de sémola', 'Grieß-Bolur', 'sweets_desserts', 'snacks', 'pan_palestinian', 250),

  // ---------- dairy_eggs_drinks (6) ----------
  R('اللبن الرايب الفلسطيني البلدي', 'Palestinian set yogurt', 'Laban du terroir palestinien', 'Laban casero palestino', 'Palästinensisches Land-Laban', 'dairy_eggs_drinks', 'breakfast', 'pan_palestinian', 65),
  R('عيران الفلسطيني بالنعناع', 'Palestinian mint ayran', 'Ayran à la menthe', 'Ayran con menta', 'Minz-Ayran', 'dairy_eggs_drinks', 'snacks', 'mena_shared', 30),
  R('زبادي الفلسطيني كامل الدسم', 'Full-fat Palestinian yogurt', 'Yaourt entier palestinien', 'Yogur entero palestino', 'Vollfetter palästinensischer Joghurt', 'dairy_eggs_drinks', 'snacks', 'pan_palestinian', 75),
  R('أومليت الفلسطيني بالأعشاب', 'Palestinian herb omelette', 'Omelette aux herbes', 'Tortilla con hierbas', 'Kräuter-Omelett', 'dairy_eggs_drinks', 'breakfast', 'pan_palestinian', 140),
  R('بيض مقلي الفلسطيني بالبندورة', 'Fried eggs with tomato', 'Oeufs frits à la tomate', 'Huevos fritos con tomate', 'Spiegeleier mit Tomate', 'dairy_eggs_drinks', 'breakfast', 'mena_shared', 120),
  R('حليب الفلسطيني بالعسل البلدي', 'Palestinian yogurt with honey', 'Laban au miel du terroir', 'Laban con miel casera', 'Laban mit Honig vom Land', 'dairy_eggs_drinks', 'breakfast', 'pan_palestinian', 90),
  R('شكشوكة فلسطينية بالجبنة البلدي', 'Palestinian shakshuka with village cheese', 'Chakchouka palestinienne au fromage', 'Shakshuka palestina con queso casero', 'Palästinensische Shakshuka mit Dorfkäse', 'dairy_eggs_drinks', 'breakfast', 'pan_palestinian', 150),
];

const categories = [
  'mezze_appetizers', 'salads', 'soups', 'kibbeh_dishes', 'manakish_pies',
  'mains_grills', 'rice_dishes', 'fish_seafood', 'sweets_desserts', 'dairy_eggs_drinks',
];
const regions = [
  'pan_palestinian', 'jerusalem', 'gaza', 'nablus', 'hebron', 'jenin',
  'tulkarim', 'ramallah', 'bethlehem', 'jaffa', 'haifa', 'safad', 'qalqilya', 'tubas',
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

const out = { meta: { kitchen: 'palestinian', note: '201 new dishes: 99 legacy rows migrate separately (1 of the 100 source rows is a duplicate Arabic name, skipped) so legacy+new = 300. Shared rows (3) credited to Palestinian card via levant-palestine-2026 source.' }, categories, regions, meal_types, dishes: ROWS };

const target = path.join(__dirname, 'palestine-201-proposal.json');
fs.writeFileSync(target, JSON.stringify(out, null, 2));
console.log('Wrote', target);
console.log('Total dishes:', ROWS.length);
console.log('Category counts:', JSON.stringify(counts));
const regionCounts = {};
for (const d of ROWS) regionCounts[d.region] = (regionCounts[d.region] ?? 0) + 1;
console.log('Region distribution:', JSON.stringify(regionCounts));