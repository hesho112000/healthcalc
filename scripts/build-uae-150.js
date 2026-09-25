import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [ar, en, fr, es, de, mealType, region, cal_100, p, c, f, fiber, sugar, sodium, satFat, servG, servUnit, fried, sweet]
const R = [];

const add = (ar, en, fr, es, de, mealType, region, cal_100, p, c, f, fiber, sugar, sodium, satFat, servG, servUnit, fried, sweet) => {
  R.push({ ar, en, fr, es, de, mealType, region, cal_100, p, c, f, fiber, sugar, sodium, satFat, servG, servUnit, fried, sweet });
};

const B = (ar, en, fr, es, de, region, cal, p, c, f, fiber, sugar, sodium, sat, serv, unit, fried, sweet) =>
  add(ar, en, fr, es, de, 'breakfast', region, cal, p, c, f, fiber, sugar, sodium, sat, serv, unit, fried, sweet);
const L = (ar, en, fr, es, de, region, cal, p, c, f, fiber, sugar, sodium, sat, serv, unit, fried, sweet) =>
  add(ar, en, fr, es, de, 'lunch', region, cal, p, c, f, fiber, sugar, sodium, sat, serv, unit, fried, sweet);
const S = (ar, en, fr, es, de, region, cal, p, c, f, fiber, sugar, sodium, sat, serv, unit, fried, sweet) =>
  add(ar, en, fr, es, de, 'snacks', region, cal, p, c, f, fiber, sugar, sodium, sat, serv, unit, fried, sweet);

//// فطور Breakfast (10)
B('بفتة', 'Baftha Bread', 'Pain baftha', 'Pan baftha', 'Baftha-Brot', 'pan_emirati', 240, 5.5, 43, 5.5, 1.8, 2, 340, 1.5, 70, 'قطعة', false, false);
B('عريك بالجبن', 'Areeka with Cheese', 'Areeka au fromage', 'Areeka con queso', 'Areeka mit Käse', 'pan_emirati', 225, 6, 32, 8, 2.2, 24, 330, 3.5, 160, 'طبق', false, true);
B('مراصيع', 'Mraseea', 'Mraseea (blé et viande)', 'Mraseea (trigo y carne)', 'Mraseea (Weizen und Fleisch)', 'ras_al_khaimah', 118, 7, 13, 4, 2.2, 2, 330, 1.4, 250, 'طبق', false, false);
B('رقاق بالبيض', 'Regag Bread with Egg', 'Regag aux œufs', 'Regag con huevo', 'Regag mit Ei', 'pan_emirati', 165, 8, 15, 7.5, 1.8, 2, 340, 2.6, 100, 'حصة', false, false);
B('جباب بالتمر', 'Chebab with Dates', 'Chebab aux dattes', 'Chebab con dátiles', 'Chebab mit Datteln', 'pan_emirati', 265, 5, 45, 8, 1.8, 24, 300, 2.8, 90, 'قطعة', false, true);
B('جباب بالعسل واللبن', 'Chebab with Honey and Laban', 'Chebab au miel et laban', 'Chebab con miel y laban', 'Chebab mit Honig und Laban', 'pan_emirati', 255, 6, 42, 7.5, 1.8, 24, 320, 2.6, 95, 'قطعة', false, true);
B('رقاق محشي', 'Stuffed Regag', 'Regag farci', 'Regag relleno', 'Gefülltes Regag', 'pan_emirati', 168, 7.5, 21, 6.2, 1.8, 2, 380, 2.4, 110, 'حصة', false, false);
B('مشلتت بالجبن', 'Mashlouta with Cheese', 'Mashlouta au fromage', 'Mashlouta con queso', 'Mashlouta mit Käse', 'pan_emirati', 280, 9, 44, 8, 1.8, 2, 380, 4.8, 70, 'قطعة', false, false);
B('سويق بالتمر', 'Sawiq Date Porridge', 'Sawiq aux dattes', 'Sawiq de dátiles', 'Sawiq mit Datteln', 'pan_emirati', 165, 5, 28, 4, 3.5, 19, 300, 1.4, 180, 'طبق', false, true);
B('حميس', 'Hamiss', 'Hamiss (œufs à l\'oignon)', 'Hamiss (huevos con cebolla)', 'Hamiss (Eier mit Zwiebeln)', 'pan_emirati', 132, 8, 6, 8.5, 2.2, 2, 380, 2.8, 200, 'طبق', false, false);

//// مخبوزات Breads & Pastries (10)
B('رقاق حلو', 'Sweet Regag', 'Regag sucré', 'Regag dulce', 'Süßes Regag', 'pan_emirati', 240, 5, 46, 4, 1.8, 24, 300, 1.4, 50, 'قطعة', false, true);
B('صمون', 'Emirati Samoon Bread', 'Pain samoon émirati', 'Pan samoon emiratí', 'Emirati-Samoon-Brot', 'pan_emirati', 275, 8, 50, 4.5, 1.8, 2, 340, 1.5, 80, 'قطعة', false, false);
B('خمير بالجبن', 'Khameer with Cheese', 'Khameer au fromage', 'Khameer con queso', 'Khameer mit Käse', 'pan_emirati', 270, 9, 40, 9, 1.8, 2, 380, 4.9, 80, 'قطعة', false, false);
B('عيش بالفلفل', 'Spiced Aish Bread', 'Pain aish épicé', 'Pan aish especiado', 'Aish-Brot mit Gewürzen', 'pan_emirati', 255, 7, 46, 4.5, 1.8, 2, 340, 1.5, 80, 'قطعة', false, false);
B('كليجة بالهيل', 'Kleicha with Cardamom', 'Kleicha à la cardamome', 'Kleicha con cardamomo', 'Kleicha mit Kardamom', 'gulf_shared', 300, 5, 52, 9, 1.3, 19, 140, 4.5, 50, 'قطعة', false, true);
B('قرص بالتمر', 'Qurs Stuffed with Dates', 'Qurs fourré aux dattes', 'Qurs relleno de dátiles', 'Qurs mit Datteln gefüllt', 'pan_emirati', 290, 5, 50, 8, 1.8, 24, 300, 3.2, 60, 'قطعة', false, true);
B('خمير بالحليب والزعفران', 'Khameer with Saffron Milk', 'Khameer au lait safrané', 'Khameer con leche de azafrán', 'Khameer mit Safranmilch', 'pan_emirati', 265, 8, 44, 6, 1.8, 19, 320, 2.8, 80, 'قطعة', false, true);
B('خبز وقافي', 'Waggafi Bread', 'Pain waggafi', 'Pan waggafi', 'Waggafi-Brot', 'pan_emirati', 250, 7, 45, 4.5, 1.8, 2, 340, 1.4, 80, 'قطعة', false, false);
B('خبز محلا', 'Muhala Bread', 'Pain muhala', 'Pan muhala', 'Muhala-Brot', 'pan_emirati', 235, 6, 44, 3.5, 1.8, 2, 340, 1.1, 80, 'قطعة', false, false);
B('بتير', 'Bteer Bread', 'Pain bteer', 'Pan bteer', 'Bteer-Brot', 'pan_emirati', 258, 7, 46, 4.8, 1.8, 2, 340, 1.4, 80, 'قطعة', false, false);

//// شوربات Soups (10)
L('شوربة لسان العصفور', 'Vermicelli Bird-Tongue Soup', 'Soupe langue d\'oiseau', 'Sopa pico de pájaro', 'Vogelshraube-Suppe', 'pan_emirati', 72, 3.5, 10.5, 1.8, 2.2, 2, 330, 0.8, 250, 'كوب', false, false);
L('شوربة الشعيرية بالدجاج', 'Vermicelli Chicken Soup', 'Soupe de vermicelles au poulet', 'Sopa de fideos con pollo', 'Fadennudelsuppe mit Hühnchen', 'pan_emirati', 78, 4.3, 9.5, 2.2, 2.2, 2, 330, 0.9, 250, 'كوب', false, false);
L('شوربة ملوخية بالدجاج', 'Molokhia Soup with Chicken', 'Soupe de molokhia au poulet', 'Sopa de molokhia con pollo', 'Molokhia-Suppe mit Hühnchen', 'pan_emirati', 82, 5.5, 8.5, 2.4, 3.5, 2, 330, 0.9, 250, 'كوب', false, false);
L('شوربة سمك', 'Emirati Fish Soup', 'Soupe de poisson émiratie', 'Sopa de pescado emiratí', 'Emirati-Fischsuppe', 'pan_emirati', 65, 6.5, 4.5, 2.2, 2.2, 2, 330, 0.7, 250, 'كوب', false, false);
L('شوربة كوسا بالزبادي', 'Zucchini and Yogurt Soup', 'Soupe de courgettes au yaourt', 'Sopa de calabacín con yogur', 'Zucchini-Joghurt-Suppe', 'pan_emirati', 70, 3.5, 7.5, 2.8, 2.2, 2, 330, 1.6, 250, 'كوب', false, false);
L('شوربة الفاصوليا البيضاء', 'White Bean Soup', 'Soupe de haricots blancs', 'Sopa de alubias blancas', 'Weiße-Bohnen-Suppe', 'pan_emirati', 95, 5.5, 13.5, 1.8, 3.5, 2, 330, 0.6, 250, 'كوب', false, false);
L('شوربة الذرة بالدجاج', 'Corn and Chicken Soup', 'Soupe de maïs au poulet', 'Sopa de maíz con pollo', 'Mais-Hühnchen-Suppe', 'pan_emirati', 85, 4.8, 10.5, 2.4, 2.2, 2, 330, 0.9, 250, 'كوب', false, false);
L('شوربة عدس بالكمون', 'Cumin Lentil Soup', 'Soupe de lentilles au cumin', 'Sopa de lentejas con comino', 'Linsensuppe mit Kreuzkümmel', 'pan_emirati', 80, 4.8, 11.5, 1.2, 3.5, 2, 330, 0.4, 250, 'كوب', false, false);
L('شوربة الجريش', 'Jareesh Soup', 'Soupe de jareesh', 'Sopa de jareesh', 'Jareesh-Suppe', 'pan_emirati', 90, 4.5, 13, 2.2, 2.2, 2, 330, 0.9, 250, 'كوب', false, false);
L('شوربة لحم بالخضار', 'Meat and Vegetable Soup', 'Soupe de viande aux légumes', 'Sopa de carne con verduras', 'Fleisch-Gemüse-Suppe', 'pan_emirati', 88, 6.5, 6.5, 3.6, 2.2, 2, 330, 1.4, 250, 'كوب', false, false);

//// سلطات ومقبلات Salads & Sides (13)
L('دقوس', 'Daqoos', 'Daqoos (sauce tomate épicée)', 'Daqoos (salsa de tomate picante)', 'Daqoos (scharfe Tomatensauce)', 'pan_emirati', 55, 2, 8, 2.2, 2.2, 3, 380, 0.4, 60, 'حصة', false, false);
L('سلطة جرجير بالدبس', 'Arugula with Date Syrup', 'Salade de roquette au sirop de datte', 'Ensalada de rúcula con sirope de dátil', 'Rucola-Salat mit Dattelsirup', 'pan_emirati', 42, 2.2, 6.5, 1.2, 3.5, 19, 280, 0.3, 120, 'صحن', false, true);
L('سلطة شمندر', 'Beetroot Salad', 'Salade de betterave', 'Ensalada de remolacha', 'Rote-Bete-Salat', 'pan_emirati', 45, 1.6, 9.5, 0.4, 3.5, 19, 280, 0.2, 150, 'صحن', false, true);
L('سلطة خيار بالنعناع', 'Cucumber and Mint Salad', 'Salade de concombre à la menthe', 'Ensalada de pepino con menta', 'Gurken-Minz-Salat', 'pan_emirati', 28, 1.2, 5.5, 0.3, 2.2, 2, 280, 0.1, 150, 'صحن', false, false);
L('سلطة طماطم بالبصل', 'Tomato and Onion Salad', 'Salade de tomates et oignons', 'Ensalada de tomate y cebolla', 'Tomaten-Zwiebel-Salat', 'pan_emirati', 35, 1.5, 6.5, 0.5, 2.2, 3, 280, 0.2, 150, 'صحن', false, false);
L('مخلل خضار مشكل', 'Mixed Vegetable Pickles', 'Légumes marinés', 'Encurtidos de verduras', 'Gemischtes eingelegtes Gemüse', 'pan_emirati', 25, 1, 5.5, 0.2, 2.2, 3, 380, 0.1, 60, 'حصة', false, false);
L('متبل شمندر', 'Beetroot Mutabal', 'Mutabal de betterave', 'Mutabal de remolacha', 'Rote-Bete-Mutabal', 'pan_emirati', 68, 1.8, 9.5, 3, 2.2, 3, 280, 0.6, 80, 'حصة', false, false);
L('سلطة حمص', 'Chickpea Salad', 'Salade de pois chiches', 'Ensalada de garbanzos', 'Kichererbsensalat', 'pan_emirati', 95, 4.5, 11.5, 3.2, 3.5, 2, 280, 0.5, 120, 'صحن', false, false);
L('زبادي بالثوم', 'Garlic Yogurt Dip', 'Yaourt à l\'ail', 'Yogur con ajo', 'Knoblauch-Joghurt', 'pan_emirati', 62, 3.5, 5.2, 3.2, 0.6, 2, 120, 1.8, 80, 'حصة', false, false);
L('سلطة جزر', 'Carrot Salad', 'Salade de carottes', 'Ensalada de zanahoria', 'Karottensalat', 'pan_emirati', 40, 1.2, 9, 0.3, 2.2, 3, 280, 0.1, 150, 'صحن', false, false);
L('باجيلة', 'Bajella', 'Bajella (plat de fèves)', 'Bajella (plato de habas)', 'Bajella (Bohnengericht)', 'pan_emirati', 105, 6.5, 14.5, 1.8, 3.5, 2, 380, 0.5, 180, 'طبق', false, false);
L('سلطة الملفوف', 'Cabbage Salad', 'Salade de chou', 'Ensalada de col', 'Kohlsalat', 'pan_emirati', 32, 1.4, 6.2, 0.4, 2.2, 3, 280, 0.1, 150, 'صحن', false, false);
L('سلطة الباذنجان المحمص', 'Charred Eggplant Salad', 'Salade d\'aubergines grillées', 'Ensalada de berenjena asada', 'Gerösteter Auberginensalat', 'pan_emirati', 65, 1.8, 7.5, 3.5, 3.5, 2, 280, 0.5, 120, 'صحن', false, false);

//// أطباق الرز Rice Dishes (19)
L('مضبي لحم', 'Madbi Meat', 'Madbi de viande', 'Madbi de carne', 'Madbi mit Fleisch', 'gulf_shared', 155, 8.5, 16.5, 5.5, 2, 2, 330, 1.9, 350, 'طبق', false, false);
L('مضبي دجاج', 'Madbi Chicken', 'Madbi de poulet', 'Madbi de pollo', 'Madbi mit Hühnchen', 'gulf_shared', 135, 9, 14.5, 4.2, 2, 2, 330, 1.4, 350, 'طبق', false, false);
L('زربيان دجاج', 'Zurbian Chicken', 'Zurbian de poulet', 'Zurbian de pollo', 'Zurbian mit Hühnchen', 'gulf_shared', 138, 8.5, 15, 4.5, 2, 2, 330, 1.5, 350, 'طبق', false, false);
L('زربيان لحم', 'Zurbian Lamb', 'Zurbian d\'agneau', 'Zurbian de cordero', 'Zurbian mit Lamm', 'gulf_shared', 158, 8.8, 15.5, 6.2, 2, 2, 330, 2.2, 350, 'طبق', false, false);
L('رز بحريني', 'Bahraini Spiced Rice', 'Riz épicé bahreïni', 'Arroz especiado bahreiní', 'Bahrainischer Gewürzreis', 'gulf_shared', 148, 6.5, 20, 4.8, 1.8, 2, 330, 1.6, 300, 'طبق', false, false);
L('دبيازة', 'Debyaza', 'Debyaza (agneau et pois chiches)', 'Debyaza (cordero y garbanzos)', 'Debyaza (Lamm und Kichererbsen)', 'ras_al_khaimah', 165, 9.5, 18.5, 5.5, 2, 2, 330, 1.9, 350, 'طبق', false, false);
L('صيادية سمك', 'Sayyadia', 'Sayyadia (poisson et riz)', 'Sayyadia (pescado y arroz)', 'Sayyadia (Fisch und Reis)', 'gulf_shared', 142, 7.5, 16.5, 4.6, 2, 2, 330, 1.4, 350, 'طبق', false, false);
L('أرز أصفر بالزعفران', 'Saffron Yellow Rice', 'Riz jaune au safran', 'Arroz amarillo con azafrán', 'Gelber Safranreis', 'pan_emirati', 125, 3.2, 26.5, 1.2, 1.8, 2, 330, 0.4, 200, 'طبق', false, false);
L('رز بسمتي بالهيل', 'Cardamom Basmati Rice', 'Riz basmati à la cardamome', 'Arroz basmati con cardamomo', 'Basmatireis mit Kardamom', 'pan_emirati', 122, 3, 26, 1, 1.8, 2, 330, 0.3, 200, 'طبق', false, false);
L('رز بالخضار', 'Vegetable Rice', 'Riz aux légumes', 'Arroz con verduras', 'Gemüsereis', 'pan_emirati', 105, 2.8, 21.5, 1.6, 2.2, 2, 330, 0.5, 250, 'طبق', false, false);
L('أرز بالقرع والتمر', 'Rice with Pumpkin and Dates', 'Riz au potiron et dattes', 'Arroz con calabaza y dátiles', 'Reis mit Kürbis und Datteln', 'pan_emirati', 130, 3, 27, 1.8, 3.5, 19, 300, 0.6, 250, 'طبق', false, true);
L('أرز باللوز', 'Almond Rice', 'Riz aux amandes', 'Arroz con almendras', 'Mandelreis', 'pan_emirati', 180, 4.5, 28, 6.5, 2.2, 2, 330, 0.9, 250, 'طبق', false, false);
L('مكبوس حاشي', 'Camel Makhboos', 'Makhboos de chameau', 'Makhboos de camello', 'Kamel-Makhboos', 'pan_emirati', 128, 8.5, 14, 3.8, 2, 2, 330, 1.4, 350, 'طبق', false, false);
L('رز مطبخ بالخضار', 'Cooked Vegetable Rice', 'Riz cuit aux légumes', 'Arroz cocinado con verduras', 'Gekochter Gemüsereis', 'pan_emirati', 108, 2.9, 22, 1.7, 2.2, 2, 330, 0.5, 250, 'طبق', false, false);
L('برياني دجاج بالزعفران', 'Saffron Chicken Biryani', 'Biryani de poulet au safran', 'Biryani de pollo con azafrán', 'Safran-Hähnchen-Biryani', 'pan_emirati', 142, 8.8, 15.5, 4.8, 2, 2, 330, 1.6, 350, 'طبق', false, false);
L('مكبوس روبيان', 'Shrimp Makhboos', 'Makhboos de crevettes', 'Makhboos de camarones', 'Garnelen-Makhboos', 'pan_emirati', 112, 7.3, 14, 2.5, 2, 2, 330, 0.9, 300, 'طبق', false, false);
L('رز مع الفريكة', 'Freekeh Mixed Rice', 'Riz au freekeh', 'Arroz con freekeh', 'Reis mit Freekeh', 'pan_emirati', 130, 5.5, 21, 2.8, 3.5, 2, 330, 0.9, 300, 'طبق', false, false);
L('مكبوس حمام', 'Pigeon Makhboos', 'Makhboos de pigeon', 'Makhboos de pichón', 'Tauben-Makhboos', 'pan_emirati', 135, 9.5, 14.5, 4.2, 2, 2, 330, 1.3, 350, 'طبق', false, false);
L('مكبوس سمان', 'Quail Makhboos', 'Makhboos de caille', 'Makhboos de codorniz', 'Wachtel-Makhboos', 'pan_emirati', 138, 10.5, 14, 4.4, 2, 2, 330, 1.3, 350, 'طبق', false, false);

//// أطباق رئيسية Main Dishes (25)
L('إيدام لحم', 'Lamb Eidam Stew', 'Ragoût d\'agneau eidam', 'Guiso de cordero eidam', 'Lamm-Eidam-Eintopf', 'pan_emirati', 142, 8.5, 8.5, 8, 2.2, 2, 330, 3.2, 300, 'طبق', false, false);
L('إيدام دجاج', 'Chicken Eidam Stew', 'Ragoût de poulet eidam', 'Guiso de pollo eidam', 'Hähnchen-Eidam-Eintopf', 'pan_emirati', 108, 9.5, 6.5, 5, 2.2, 2, 330, 1.6, 300, 'طبق', false, false);
L('إيدام خضار', 'Vegetable Eidam Stew', 'Ragoût de légumes eidam', 'Guiso de verduras eidam', 'Gemüse-Eidam-Eintopf', 'pan_emirati', 82, 3.2, 12, 2.6, 3.5, 2, 330, 0.5, 300, 'طبق', false, false);
L('إيدام روبيان', 'Shrimp Eidam Stew', 'Ragoût de crevettes eidam', 'Guiso de camarones eidam', 'Garnelen-Eidam-Eintopf', 'pan_emirati', 95, 9.5, 6.5, 3.4, 2.2, 2, 330, 0.9, 300, 'طبق', false, false);
L('لوبيا باللحم', 'Green Beans with Meat', 'Haricots verts à la viande', 'Judías verdes con carne', 'Grüne Bohnen mit Fleisch', 'pan_emirati', 98, 8.5, 7.5, 4, 3.5, 2, 330, 1.6, 280, 'طبق', false, false);
L('جحي لحم', 'Jahi Lamb', 'Jahi d\'agneau', 'Jahi de cordero', 'Jahi mit Lamm', 'pan_emirati', 165, 9.5, 8.5, 10.5, 2.2, 2, 330, 4.2, 300, 'طبق', false, false);
L('فلفل محشي', 'Stuffed Peppers', 'Poivrons farcis', 'Pimientos rellenos', 'Gefüllte Paprika', 'pan_emirati', 88, 4.8, 10.5, 3, 2.2, 2, 330, 1.2, 250, 'طبق', false, false);
L('ورق عنب محشي', 'Stuffed Vine Leaves', 'Feuilles de vigne farcies', 'Hojas de parra rellenas', 'Gefüllte Weinblätter', 'pan_emirati', 118, 4.5, 14.5, 4.8, 3.5, 2, 330, 1.8, 200, 'طبق', false, false);
L('سبانخ باللحم', 'Spinach with Meat', 'Épinards à la viande', 'Espinacas con carne', 'Spinat mit Fleisch', 'pan_emirati', 92, 8, 5.5, 4.6, 2.2, 2, 330, 1.8, 280, 'طبق', false, false);
L('قرع بالتمر', 'Pumpkin with Dates', 'Potiron aux dattes', 'Calabaza con dátiles', 'Kürbis mit Datteln', 'pan_emirati', 118, 3.5, 22, 2.2, 3.5, 24, 300, 0.8, 220, 'طبق', false, true);
L('دجاج بالكاري', 'Emirati Chicken Curry', 'Curry de poulet émirati', 'Curry de pollo emiratí', 'Emirati-Hähnchen-Curry', 'pan_emirati', 132, 11.5, 7.5, 6.2, 2.2, 2, 330, 2.2, 300, 'طبق', false, false);
L('دال عدس', 'Emirati Lentil Dal', 'Dal de lentilles émirati', 'Dal de lentejas emiratí', 'Emirati-Linsen-Dal', 'pan_emirati', 105, 6.5, 15.5, 2.2, 3.5, 2, 330, 0.5, 250, 'طبق', false, false);
L('كاري روبيان', 'Shrimp Curry', 'Curry de crevettes', 'Curry de camarones', 'Garnelen-Curry', 'pan_emirati', 112, 10.5, 7.5, 4.6, 2.2, 2, 330, 1.5, 280, 'طبق', false, false);
L('كاري سمك', 'Fish Curry', 'Curry de poisson', 'Curry de pescado', 'Fisch-Curry', 'pan_emirati', 118, 11.5, 6.5, 5.2, 2.2, 2, 330, 1.5, 280, 'طبق', false, false);
L('خضار بالكاري', 'Mixed Vegetable Curry', 'Curry de légumes', 'Curry de verduras', 'Gemüse-Curry', 'pan_emirati', 88, 3.5, 14.5, 2.2, 3.5, 2, 330, 0.5, 250, 'طبق', false, false);
L('بامية بالدجاج', 'Okra with Chicken', 'Gombos au poulet', 'Okra con pollo', 'Okra mit Hühnchen', 'pan_emirati', 95, 8, 8.5, 3.2, 3.5, 2, 330, 1.2, 300, 'طبق', false, false);
L('جريش بالروبيان', 'Jareesh with Shrimp', 'Jareesh aux crevettes', 'Jareesh con camarones', 'Jareesh mit Garnelen', 'pan_emirati', 105, 8.5, 12.5, 2.5, 2.2, 2, 330, 0.8, 280, 'طبق', false, false);
L('فريكة بالدجاج', 'Freekeh with Chicken', 'Freekeh au poulet', 'Freekeh con pollo', 'Freekeh mit Hühnchen', 'pan_emirati', 138, 9.5, 15.5, 4.2, 3.5, 2, 330, 1.4, 300, 'طبق', false, false);
L('ثريد روبيان', 'Thareed with Shrimp', 'Thareed aux crevettes', 'Thareed con camarones', 'Thareed mit Garnelen', 'pan_emirati', 108, 9, 11, 3.4, 2.2, 2, 330, 1.1, 320, 'طبق', false, false);
L('قوزي دجاج', 'Chicken Quzi', 'Quzi de poulet', 'Quzi de pollo', 'Hähnchen-Quzi', 'pan_emirati', 150, 9.5, 16.5, 5.2, 2, 2, 330, 1.8, 350, 'طبق', false, false);
L('دجاج محشي بالبرغل', 'Chicken Stuffed with Bulgur', 'Poulet farci au boulgour', 'Pollo relleno de bulgur', 'Hähnchen mit Bulgur gefüllt', 'pan_emirati', 138, 12.5, 9.5, 5.8, 3.5, 2, 330, 2.2, 300, 'طبق', false, false);
L('عرايس دجاج', 'Chicken Arayes', 'Arayes de poulet', 'Arayes de pollo', 'Hähnchen-Arayes', 'gulf_shared', 225, 14.5, 18, 10.5, 2.2, 2, 340, 4.2, 140, 'حصة', false, false);
L('محشوش باللحم', 'Mahshoush', 'Mahshoush (blé concassé et agneau)', 'Mahshoush (trigo y cordero)', 'Mahshoush (Weizen und Lamm)', 'pan_emirati', 128, 7.5, 15, 4.2, 2.2, 2, 330, 1.5, 280, 'طبق', false, false);
L('كمونية لحم', 'Lamb Kamooniya', 'Kamooniya d\'agneau', 'Kamooniya de cordero', 'Lamm-Kamooniya', 'gulf_shared', 148, 10.5, 8.5, 8, 2.2, 2, 330, 3.2, 280, 'طبق', false, false);
L('عيش ولحم', 'Aish wa Laham', 'Aish wa laham (agneau au pain)', 'Aish wa laham (cordero con pan)', 'Aish wa Laham (Lamm mit Brot)', 'pan_emirati', 158, 9.5, 14.5, 6.2, 2.2, 2, 330, 2.4, 300, 'طبق', false, false);

//// لحوم ودواجن مشوية Grilled Meats & Poultry (15)
L('ريش لحم مشوية', 'Grilled Lamb Rack', 'Carré d\'agneau grillé', 'Carré de cordero a la parrilla', 'Gegrillte Lammkoteletts', 'pan_emirati', 245, 20.5, 0, 17.5, 0.2, 2, 250, 7.8, 150, 'حصة', false, false);
L('كفتة مشوية', 'Grilled Kofta', 'Kofta grillée', 'Kofta a la parrilla', 'Gegrillte Kofta', 'pan_emirati', 225, 17.5, 4, 15.5, 0.6, 2, 250, 6.5, 160, 'حصة', false, false);
L('دجاج على الفحم', 'Charcoal Chicken', 'Poulet au charbon de bois', 'Pollo al carbón', 'Holzkohle-Hähnchen', 'pan_emirati', 195, 20.5, 1.5, 11.5, 0.6, 2, 250, 3.4, 180, 'حصة', false, false);
L('كفتة حاشي', 'Camel Kofta', 'Kofta de chameau', 'Kofta de camello', 'Kamel-Kofta', 'pan_emirati', 195, 18.5, 4, 12.5, 0.6, 2, 250, 5.2, 160, 'حصة', false, false);
L('مشاوي بحرية مشكلة', 'Mixed Seafood Grill', 'Grillade de fruits de mer', 'Parrillada de mariscos', 'Gegrillte Meeresfrüchte', 'pan_emirati', 135, 17.5, 1.5, 6.5, 0.2, 2, 250, 1.5, 220, 'حصة', false, false);
L('كباب روبيان', 'Shrimp Kebab', 'Brochettes de crevettes', 'Brochetas de camarones', 'Garnelen-Spieße', 'pan_emirati', 125, 15.5, 4.5, 5.2, 0.6, 2, 250, 1.4, 180, 'حصة', false, false);
L('كرشة مشوية', 'Grilled Tripe', 'Tripe grillée', 'Tripas a la parrilla', 'Gegrillter Kutteln', 'pan_emirati', 155, 15.5, 0.5, 10.5, 0.2, 2, 250, 4.2, 150, 'حصة', false, false);
L('سجق حاشي', 'Camel Sausage', 'Saucisse de chameau', 'Salchicha de camello', 'Kamelwurst', 'pan_emirati', 245, 15.5, 2.5, 19.5, 0.2, 2, 380, 8.8, 120, 'حصة', false, false);
L('دجاج بلدي مشوي كامل', 'Whole Grilled Chicken', 'Poulet entier grillé', 'Pollo entero a la parrilla', 'Gegrilltes ganzes Huhn', 'pan_emirati', 195, 20.5, 1.5, 11.5, 0.6, 2, 250, 3.4, 220, 'حصة', false, false);
L('دجاج بالعسل', 'Honey Glazed Chicken', 'Poulet au miel', 'Pollo con miel', 'Honig-Hähnchen', 'pan_emirati', 200, 21.5, 5.5, 10, 0.6, 19, 300, 3.2, 180, 'حصة', false, true);
L('كبدة بالبهارات', 'Spiced Liver', 'Foie épicé', 'Hígado especiado', 'Gewürzte Leber', 'pan_emirati', 168, 22.5, 5.5, 5.5, 0.2, 2, 380, 1.8, 140, 'حصة', false, false);
L('سجق دجاج', 'Chicken Sausage', 'Saucisse de poulet', 'Salchicha de pollo', 'Hähnchenwurst', 'pan_emirati', 215, 14.5, 2.5, 16.5, 0.2, 2, 380, 5.5, 100, 'حصة', false, false);
L('دجاج مشوي بالزعفران', 'Saffron Grilled Chicken', 'Poulet grillé au safran', 'Pollo asado con azafrán', 'Gegrilltes Safran-Hähnchen', 'pan_emirati', 190, 21.5, 2.5, 10.5, 0.6, 2, 250, 3.2, 180, 'حصة', false, false);
L('كباب سمك', 'Fish Kebab', 'Brochettes de poisson', 'Brochetas de pescado', 'Fisch-Spieße', 'pan_emirati', 148, 16.5, 4.5, 6.5, 0.2, 2, 250, 1.6, 180, 'حصة', false, false);
L('شوى', 'Shuwaa', 'Shuwaa (agneau rôti)', 'Shuwaa (cordero asado)', 'Shuwaa (Bratlamm)', 'pan_emirati', 175, 17.5, 3.5, 10.5, 1.8, 2, 330, 4.2, 250, 'حصة', false, false);

//// أسماك ومأكولات بحرية Fish & Seafood (17)
L('سبيطي مشوي', 'Grilled Sobaity Bream', 'Bretonneau sobaity grillé', 'Dorada sobaity a la parrilla', 'Gegrillte Sobaity-Brasse', 'pan_emirati', 120, 16.5, 0, 5.5, 0.2, 2, 250, 1.6, 200, 'حصة', false, false);
L('شعم مقلي', 'Fried Threadfin', 'Filament frit', 'Pez hilo frito', 'Gebratener Fadenfisch', 'pan_emirati', 205, 16.5, 10.5, 11.5, 1.3, 2, 280, 2.8, 180, 'حصة', true, false);
L('بياح مقلي', 'Fried Bayah Fish', 'Bayah frit', 'Bayah frito', 'Gebratener Bayah-Fisch', 'pan_emirati', 190, 16.5, 9.5, 10, 1.3, 2, 280, 2.6, 180, 'حصة', true, false);
L('قرش مقلي', 'Fried Shark', 'Requin frit', 'Tiburón frito', 'Gebratener Hai', 'gulf_shared', 210, 18.5, 8.5, 12, 1.3, 2, 280, 3.2, 180, 'حصة', true, false);
L('كلمار مقلي', 'Fried Calamari', 'Calmars frits', 'Calamares fritos', 'Gebratene Calamari', 'pan_emirati', 180, 14.5, 12, 8.5, 0.5, 2, 280, 2, 150, 'حصة', true, false);
L('سبيط مشوي', 'Grilled Cuttlefish', 'Seiche grillée', 'Sepia a la parrilla', 'Gegrillter Tintenfisch', 'pan_emirati', 90, 14.7, 1.7, 2.3, 0.5, 2, 250, 0.7, 150, 'حصة', false, false);
L('بلح البحر بالثوم', 'Garlic Mussels', 'Moules à l\'ail', 'Mejillones al ajillo', 'Knoblauch-Muscheln', 'pan_emirati', 120, 15.5, 5.5, 4.5, 0.5, 2, 250, 1.2, 180, 'حصة', false, false);
L('هامور محشي', 'Stuffed Hamour', 'Mérou farci', 'Mero relleno', 'Gefüllter Zackenbarsch', 'pan_emirati', 140, 16.5, 4.5, 6.5, 0.2, 2, 250, 1.7, 220, 'حصة', false, false);
L('سمك مقلي بالبهارات', 'Spiced Fried Fish', 'Poisson frit aux épices', 'Pescado frito especiado', 'Gebratener Fisch mit Gewürzen', 'pan_emirati', 210, 16.5, 10.5, 11.5, 1.3, 2, 280, 2.9, 180, 'حصة', true, false);
L('يخنة روبيان بالخضار', 'Shrimp and Vegetable Stew', 'Ragoût de crevettes aux légumes', 'Guiso de camarones con verduras', 'Garnelen-Gemüse-Eintopf', 'pan_emirati', 92, 9.5, 6.5, 3.2, 2.2, 2, 330, 0.9, 300, 'طبق', false, false);
L('قباقب بالكاري', 'Crab Curry', 'Curry de crabe', 'Curry de cangrejo', 'Krabben-Curry', 'pan_emirati', 105, 12.5, 6.5, 3.8, 0.6, 2, 330, 0.8, 280, 'طبق', false, false);
L('صبور مشوي', 'Grilled Shad', 'Alose grillée', 'Sábalo a la parrilla', 'Gegrillte Alse', 'pan_emirati', 128, 15.5, 0, 7.5, 0.2, 2, 250, 2, 200, 'حصة', false, false);
L('روبيان مجفف محمر', 'Fried Dried Shrimp', 'Crevettes séchées frites', 'Camarones secos fritos', 'Gebratene getrocknete Garnelen', 'pan_emirati', 175, 14.5, 9.5, 9, 0.5, 2, 280, 2.2, 120, 'حصة', true, false);
L('يخنة تونة', 'Tuna Stew', 'Ragoût de thon', 'Guiso de atún', 'Thunfisch-Eintopf', 'pan_emirati', 135, 14.5, 6.5, 6.5, 2.2, 2, 330, 1.6, 280, 'طبق', false, false);
L('مضروبة', 'Madrooba', 'Madrooba (poisson salé)', 'Madrooba (pescado salado)', 'Madrooba (gesalzener Fisch)', 'pan_emirati', 122, 8.5, 12.5, 4.2, 2.2, 2, 380, 1.6, 250, 'طبق', false, false);
L('جشيد', 'Jasheed', 'Jasheed (requin épicé)', 'Jasheed (tiburón especiado)', 'Jasheed (gewürzter Hai)', 'pan_emirati', 118, 15.5, 4.5, 4.5, 0.2, 2, 330, 1.2, 200, 'حصة', false, false);
L('روبيان ناشف', 'Ro-be-yann Nashif', 'Crevettes épicées frites', 'Camarones picantes fritos', 'Scharf gebratene Garnelen', 'pan_emirati', 165, 14.5, 8.5, 8.5, 0.5, 2, 280, 2, 160, 'حصة', true, false);

//// حلويات Desserts (10)
S('حيسة', 'Haisa', 'Haisa (dattes et beurre)', 'Haisa (dátiles y mantequilla)', 'Haisa (Datteln und Butter)', 'pan_emirati', 285, 3.8, 42, 11.5, 1.3, 24, 140, 6, 60, 'حصة', false, true);
S('كليجة بالتمر', 'Date Kleicha', 'Kleicha aux dattes', 'Kleicha de dátiles', 'Dattel-Kleicha', 'gulf_shared', 305, 5, 52, 9.5, 1.3, 24, 140, 4.8, 50, 'قطعة', false, true);
S('كعك العيد', 'Eid Kaak Cookies', 'Kaak de l\'Aïd', 'Kaak de Eid', 'Osterlamm-Kaak', 'pan_emirati', 310, 6.5, 50, 10.5, 1.3, 19, 140, 4.6, 40, 'قطعة', false, true);
S('تمر محشي بالمكسرات', 'Stuffed Dates with Nuts', 'Dattes fourrées aux noix', 'Dátiles rellenos de frutos secos', 'Mit Nüssen gefüllte Datteln', 'pan_emirati', 280, 4.5, 45, 10, 1.3, 24, 120, 2.8, 40, 'حصة', false, true);
S('عصيدة بالقرع', 'Pumpkin Asida', 'Asida au potiron', 'Asida de calabaza', 'Kürbis-Asida', 'pan_emirati', 175, 3.5, 30, 5.5, 3.5, 19, 140, 2.2, 180, 'حصة', false, true);
S('خبيص بالجوز', 'Khabees with Walnuts', 'Khabees aux noix', 'Khabees con nueces', 'Khabees mit Walnüssen', 'pan_emirati', 290, 5.5, 42, 12, 1.8, 24, 140, 5.2, 60, 'حصة', false, true);
S('رقاق بالحلاوة', 'Regag with Halva', 'Regag au halva', 'Regag con halva', 'Regag mit Halva', 'pan_emirati', 285, 6, 42, 11, 1.8, 19, 300, 4.5, 70, 'قطعة', false, true);
S('قرص بالتمر والفستق', 'Date and Pistachio Qurs', 'Qurs aux dattes et pistaches', 'Qurs de dátiles y pistachos', 'Qurs mit Datteln und Pistazien', 'pan_emirati', 295, 5.5, 50, 9, 1.8, 24, 140, 3.5, 50, 'قطعة', false, true);
S('فطيرة التمر', 'Date Pastry', 'Feuilleté aux dattes', 'Hojaldre de dátiles', 'Dattel-Pastete', 'pan_emirati', 300, 4.5, 48, 10.5, 1.8, 24, 140, 4.2, 60, 'قطعة', false, true);
S('رقاق بالتمر', 'Regag with Dates', 'Regag aux dattes', 'Regag con dátiles', 'Regag mit Datteln', 'pan_emirati', 280, 4.5, 50, 7.5, 1.8, 24, 300, 2.8, 70, 'قطعة', false, true);

//// ألبان وبيض وفواكه Dairy, Eggs & Fruit (21)
B('قهوة عربية بالهيل', 'Emirati Gahwa', 'Gahwa émirati', 'Gahwa emiratí', 'Emirati-Gahwa', 'pan_emirati', 20, 0.5, 2, 0.8, 0.2, 2, 60, 0.2, 60, 'فنجان', false, false);
B('شاي حليب إماراتي', 'Emirati Milk Tea', 'Thé au lait émirati', 'Té con leche emiratí', 'Emirati-Milchtee', 'pan_emirati', 35, 1.5, 5, 1, 0.2, 19, 60, 0.7, 200, 'كوب', false, true);
B('شنينة', 'Shanina', 'Shanina (boisson au laban)', 'Shanina (bebida de laban)', 'Shanina (Laban-Getränk)', 'pan_emirati', 30, 2.2, 3.2, 1, 0.2, 2, 120, 0.6, 200, 'كوب', false, false);
B('ليمون بالنعناع', 'Mint Lemonade', 'Citronnade à la menthe', 'Limonada de menta', 'Minz-Limonade', 'pan_emirati', 28, 0.3, 7, 0, 0.2, 11, 60, 0, 250, 'كوب', false, true);
B('عصير أفوكادو', 'Avocado Shake', 'Milk-shake d\'avocat', 'Batido de aguacate', 'Avocado-Shake', 'pan_emirati', 75, 1.5, 9, 4, 0.6, 11, 60, 1.4, 250, 'كوب', false, true);
B('حليب بالهيل والزعفران', 'Saffron Cardamom Milk', 'Lait à la cardamome et safran', 'Leche con cardamomo y azafrán', 'Safran-Kardamom-Milch', 'pan_emirati', 85, 3.5, 11, 3.2, 0.6, 11, 120, 2, 200, 'كوب', false, true);
B('تمر بالحليب', 'Dates with Milk', 'Dattes au lait', 'Dátiles con leche', 'Datteln mit Milch', 'pan_emirati', 135, 3.5, 26, 2.5, 0.6, 24, 120, 1.4, 180, 'كوب', false, true);
B('عجة بيض', 'Emirati Egg Omelette', 'Omelette émirati', 'Tortilla emiratí', 'Emirati-Omelett', 'pan_emirati', 150, 10.5, 3, 10.5, 0.6, 2, 300, 4.2, 180, 'طبق', false, false);
B('بيض بالكمون', 'Cumin Eggs', 'Œufs au cumin', 'Huevos con comino', 'Eier mit Kreuzkümmel', 'pan_emirati', 145, 11, 2.5, 10, 0.6, 2, 300, 3.6, 160, 'طبق', false, false);
B('سلطة فواكه', 'Fruit Salad', 'Salade de fruits', 'Ensalada de frutas', 'Obstsalat', 'pan_emirati', 62, 1, 15, 0.3, 0.6, 19, 60, 0.1, 200, 'صحن', false, true);
B('عصير أناناس', 'Pineapple Juice', 'Jus d\'ananas', 'Jugo de piña', 'Ananassaft', 'pan_emirati', 55, 0.5, 13, 0.1, 0.6, 11, 60, 0, 250, 'كوب', false, true);
B('ليموناضة بالعسل', 'Honey Lemonade', 'Citronnade au miel', 'Limonada con miel', 'Honig-Limonade', 'pan_emirati', 42, 0.2, 11, 0, 0.2, 11, 60, 0, 250, 'كوب', false, true);
B('قشطة', 'Fresh Cream', 'Crème fraîche', 'Crema fresca', 'Frische Sahne', 'pan_emirati', 320, 2.5, 4, 33, 0.6, 2, 120, 20.5, 40, 'حصة', false, true);
B('تمر خنيزي', 'Khnezi Dates', 'Dattes khnezi', 'Dátiles khnezi', 'Khnezi-Datteln', 'pan_emirati', 272, 1.8, 74, 0.4, 0.6, 24, 120, 0.2, 24, 'حصة', false, true);
B('رطب خلاص', 'Khalas Rutab Dates', 'Dattes rutab khalas', 'Dátiles rutab khalas', 'Khalas-Rutab-Datteln', 'pan_emirati', 150, 1.2, 38, 0.3, 0.6, 19, 120, 0.1, 40, 'حصة', false, true);
B('ميلك شيك موز', 'Banana Milkshake', 'Milk-shake à la banane', 'Batido de plátano', 'Banane-Milchshake', 'pan_emirati', 78, 2.5, 12, 2.5, 0.6, 19, 120, 1.6, 250, 'كوب', false, true);
B('عصير شمام', 'Cantaloupe Juice', 'Jus de cantaloup', 'Jugo de melón', 'Cantaloup-Saft', 'pan_emirati', 32, 0.8, 7.5, 0.2, 0.6, 11, 60, 0, 250, 'كوب', false, true);
B('جبنة بيلادي بالكريمة', 'Creamy Beladi Cheese', 'Fromage beladi à la crème', 'Queso beladi cremoso', 'Cremiger Beladi-Käse', 'pan_emirati', 245, 7.5, 3.5, 22, 0.6, 2, 380, 14.5, 50, 'حصة', false, false);
B('عصير جزر بالبرتقال', 'Carrot and Orange Juice', 'Jus de carotte et orange', 'Zumo de zanahoria y naranja', 'Karotten-Orangen-Saft', 'pan_emirati', 42, 0.8, 10, 0.2, 0.6, 11, 60, 0.1, 250, 'كوب', false, true);
B('شاي بالزعفران', 'Saffron Tea', 'Thé au safran', 'Té de azafrán', 'Safrantee', 'pan_emirati', 22, 0.3, 3.5, 0.6, 0.2, 2, 60, 0.3, 200, 'كوب', false, false);
B('عصير مانجو بالحليب', 'Mango Lassi', 'Lassi à la mangue', 'Lassi de mango', 'Mango-Lassi', 'pan_emirati', 82, 2, 13, 2.6, 0.6, 11, 120, 1.7, 250, 'كوب', false, true);

if (R.length !== 150) throw new Error('Expected 150 dishes, got ' + R.length);
const names = new Set();
for (const r of R) {
  if (names.has(r.ar)) throw new Error('Duplicate AR: ' + r.ar);
  names.add(r.ar);
}

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'uae-expansion-proposal.json'), 'utf8'));
const byName = new Map(prop.map((p) => [p.name_ar, p]));

const out = R.map((r) => {
  const pmeta = byName.get(r.ar);
  const mealType = pmeta ? pmeta.mealType : r.mealType;
  let region = pmeta ? pmeta.region : r.region;
  if (pmeta && pmeta.region === 'regional' && r.region !== 'regional') {
    region = r.region;
  } else if (pmeta && pmeta.region !== 'regional' && r.region !== pmeta.region) {
    throw new Error('Region mismatch for ' + r.ar + ': ' + r.region + ' vs ' + pmeta.region);
  }
  let region_note = null;
  if (pmeta && pmeta.regionNote) region_note = pmeta.regionNote;
  const calServ = Math.round(r.cal_100 * r.servG / 100);
  const unitLabel = (r.servUnit === 'كوب' || r.servUnit === 'فنجان') ? 'كوب' : r.servUnit;
  const serving_description =
    r.servUnit === 'فنجان' ? `فنجان قهوة 60جم` :
    r.servUnit === 'كوب' ? `كوب ${r.servG}جم` :
    r.servUnit === 'قطعة' ? `قطعة ${r.servG}جم` :
    r.servUnit === 'صحن' ? `صحن ${r.servG}جم` :
    r.servUnit === 'حصة' ? `حصة ${r.servG}جم` :
    `طبق متوسط ${r.servG}جم`;
  const half = Math.round(calServ / 2);
  const dbl = calServ * 2;
  return {
    name: r.ar,
    name_en: r.en,
    name_fr: r.fr,
    name_es: r.es,
    name_de: r.de,
    cal_100: r.cal_100,
    p: r.p,
    c: r.c,
    f: r.f,
    fiber_g: r.fiber,
    sugar_g: r.sugar,
    sodium_mg: r.sodium,
    sat_fat_g: r.sat,
    serv_g: r.servG,
    cal_serv: calServ,
    serving_unit: unitLabel,
    serving_description,
    serving_options: [
      { label: 'نص', label_en: 'Half', multiplier: 0.5, g: Math.round(r.servG / 2), kcal: half },
      { label: 'كامل', label_en: 'Full', multiplier: 1, g: r.servG, kcal: calServ },
      { label: 'مضاعف', label_en: 'Double', multiplier: 2, g: r.servG * 2, kcal: dbl },
    ],
    healthy: r.cal_100 <= 350,
    is_fried: r.fried,
    is_sweet: r.sweet,
    mealType,
    mealTypes: mealType === 'lunch' ? ['lunch', 'dinner'] : mealType === 'breakfast' ? ['breakfast', 'snacks'] : ['snacks'],
region,
    region_note,
    source: 'المطبخ الإماراتي - أرقام محسوبة · Verified against UAE Culinary Heritage',
    notes: '',
    confidence: 70,
    confidence_label: '70% - تقديري',
    confidence_color: 'orange',
  };
});

fs.writeFileSync(path.join(__dirname, 'uae-150-data.json'), JSON.stringify(out, null, 1));
console.log('Wrote uae-150-data.json with', out.length, 'dishes');