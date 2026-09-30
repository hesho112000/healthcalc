import { B, diasporaFor } from './rows.mjs';

const PAN = 'pan_australasian';
const NSW = 'nsw';
const VIC = 'victoria';
const QLD = 'queensland';
const WA = 'western_australia';
const SA = 'south_australia';
const TAS = 'tasmania';
const NT = 'northern_territory';
const AKL = 'auckland';
const WLG = 'wellington';
const CAN = 'canterbury';
const OTA = 'otago';
const MAORI = 'maori';

export default [
  B('خبز الفيجيمايت الأسترالي', 'Vegemite Toast', 'Tartine au Vegemite', 'Tostada con Vegemite', 'Vegemite-Toast', 'breakfast_items', 'breakfast', 9, 45, 5, 'toasting', PAN, diasporaFor(PAN)),
  B('بسكويت أنزاك الأسترالي', 'ANZAC Biscuits', 'Biscuits ANZAC', 'Galletas ANZAC', 'ANZAC-Kekse', 'rice_cakes_sweets', 'snack', 5, 65, 18, 'baking', PAN, diasporaFor(PAN)),
  B('حلوى بافلوفا الأسترالية', 'Australian Pavlova', 'Pavlova australienne', 'Pavlova australiana', 'Australische Pavlova', 'rice_cakes_sweets', 'snack', 4, 42, 12, 'baking', PAN, diasporaFor(PAN)),
  B('كعكة لامينغتون الأسترالية', 'Lamington Cake', 'Gâteau lamington', 'Pastel lamington', 'Lamington-Kuchen', 'rice_cakes_sweets', 'snack', 5, 48, 16, 'baking', PAN, diasporaFor(PAN)),
  B('خبز دامبر الأسترالي', 'Australian Damper Bread', 'Pain damper australien', 'Pan damper australiano', 'Australisches Damperbrot', 'breakfast_items', 'breakfast', 7, 48, 7, 'baking', PAN, diasporaFor(PAN)),
  B('فطيرة اللحم البقري الأسترالية', 'Australian Beef Meat Pie', 'Tourte australienne au bœuf', 'Pastel australiano de carne de res', 'Australische Rindfleischpastete', 'meat_mains', 'lunch', 13, 24, 14, 'baking', PAN, diasporaFor(PAN)),
  B('سمك باراموندي الأسترالي المشوي', 'Grilled Australian Barramundi', 'Barramundi australien grillé', 'Barramundi australiano a la parrilla', 'Gegrillter australischer Barramundi', 'fish_seafood', 'dinner', 21, 0, 5, 'grilling', PAN, diasporaFor(PAN)),
  B('جراد خليج مورتون الأسترالي المشوي', 'Grilled Moreton Bay Bug', 'Cigale de mer de Moreton Bay grillée', 'Cigarra marina de Moreton Bay a la parrilla', 'Gegrillte Moreton-Bay-Meereszikade', 'fish_seafood', 'dinner', 19, 1, 2, 'grilling', QLD, diasporaFor(QLD)),
  B('مانجو كوينزلاند الأسترالي', 'Queensland Kensington Pride Mango', 'Mangue Kensington Pride du Queensland', 'Mango Kensington Pride de Queensland', 'Kensington-Pride-Mango aus Queensland', 'fruit', 'snack', 1, 15, 0, 'raw', QLD, diasporaFor(QLD)),
  B('أناناس كوينزلاند الأسترالي', 'Queensland Pineapple Wedges', 'Quartiers d’ananas du Queensland', 'Gajos de piña de Queensland', 'Ananasspalten aus Queensland', 'fruit', 'snack', 1, 13, 0, 'raw', QLD, diasporaFor(QLD)),
  B('مكسرات ماكاديميا كوينزلاند الأسترالية', 'Queensland Macadamia Nuts', 'Noix de macadamia du Queensland', 'Nueces de macadamia de Queensland', 'Macadamianüsse aus Queensland', 'fruit', 'snack', 8, 14, 76, 'roasting', QLD, diasporaFor(QLD)),
  B('محار صخور سيدني الأسترالي', 'Sydney Rock Oysters', 'Huîtres de roche de Sydney', 'Ostras de roca de Sídney', 'Sydney-Felsenaustern', 'fish_seafood', 'snack', 9, 4, 2, 'raw', NSW, diasporaFor(NSW)),
  B('لفافة روبيان سيدني الأسترالية', 'Sydney Prawn Roll', 'Rouleau aux crevettes de Sydney', 'Rollo de langostinos de Sídney', 'Sydney-Garnelenbrötchen', 'street_snacks', 'lunch', 14, 26, 8, 'grilling', NSW, diasporaFor(NSW)),
  B('سلطعون السباح الأزرق الأسترالي', 'New South Wales Blue Swimmer Crab', 'Crabe nageur bleu de Nouvelle-Galles du Sud', 'Cangrejo azul nadador de Nueva Gales del Sur', 'Blaue Schwimmkrabbe aus New South Wales', 'fish_seafood', 'dinner', 19, 0, 1, 'steaming', NSW, diasporaFor(NSW)),
  B('دجاج بارميجيانا الأسترالي', 'New South Wales Chicken Parmigiana', 'Poulet parmigiana de Nouvelle-Galles du Sud', 'Pollo a la parmigiana de Nueva Gales del Sur', 'Hähnchen Parmigiana aus New South Wales', 'poultry_mains', 'dinner', 20, 12, 13, 'baking', NSW, diasporaFor(NSW)),
  B('كعكات السمك الأسترالية من سيدني', 'Sydney Fish Cakes', 'Galettes de poisson de Sydney', 'Tortitas de pescado de Sídney', 'Sydney-Fischküchlein', 'fish_seafood', 'lunch', 15, 12, 8, 'frying', NSW, diasporaFor(NSW)),
  B('ديم سم لحم البقر الفيكتوري', 'Melbourne Beef Dim Sim', 'Dim sim au bœuf de Melbourne', 'Dim sim de res de Melbourne', 'Melbourner Dim Sim mit Rindfleisch', 'street_snacks', 'snack', 12, 20, 9, 'steaming', VIC, diasporaFor(VIC)),
  B('شريحة الفانيليا الفيكتورية', 'Melbourne Vanilla Slice', 'Mille-feuille à la vanille de Melbourne', 'Milhojas de vainilla de Melbourne', 'Melbourner Vanilleschnitte', 'rice_cakes_sweets', 'snack', 5, 38, 15, 'baking', VIC, diasporaFor(VIC)),
  B('كعكة البطاطس المقلية الفيكتورية', 'Melbourne Potato Cake', 'Galette de pomme de terre de Melbourne', 'Torta de patata de Melbourne', 'Melbourner Kartoffelküchlein', 'street_snacks', 'snack', 3, 28, 12, 'frying', VIC, diasporaFor(VIC)),
  B('قهوة فلات وايت ملبورن الأسترالية', 'Melbourne Flat White Coffee', 'Café flat white de Melbourne', 'Café blanco de Melbourne', 'Melbourner Flat White Kaffee', 'beverages', 'breakfast', 3, 4, 3, 'brewing', VIC, diasporaFor(VIC)),
  B('فطيرة جبن جيبسلاند الأسترالية', 'Gippsland Cheese Pie', 'Tourte au fromage du Gippsland', 'Pastel de queso de Gippsland', 'Gippsland-Käsepastete', 'vegetable_mains', 'lunch', 11, 24, 14, 'baking', VIC, diasporaFor(VIC)),
  B('سلمون تسمانيا المشوي الأسترالي', 'Tasmanian Grilled Salmon', 'Saumon grillé de Tasmanie', 'Salmón a la parrilla de Tasmania', 'Gegrillter Lachs aus Tasmanien', 'fish_seafood', 'dinner', 21, 0, 12, 'grilling', TAS, diasporaFor(TAS)),
  B('فطيرة الإسكالوب التسمانية الأسترالية', 'Tasmanian Scallop Pie', 'Tourte aux pétoncles de Tasmanie', 'Pastel de vieiras de Tasmania', 'Jakobsmuschelpastete aus Tasmanien', 'fish_seafood', 'lunch', 12, 23, 12, 'baking', TAS, diasporaFor(TAS)),
  B('كعكة عسل ليذروود التسمانية الأسترالية', 'Tasmanian Leatherwood Honey Cake', 'Gâteau au miel de leatherwood de Tasmanie', 'Pastel de miel de leatherwood de Tasmania', 'Leatherwood-Honigkuchen aus Tasmanien', 'rice_cakes_sweets', 'snack', 5, 46, 13, 'baking', TAS, diasporaFor(TAS)),
  B('تفاح بينك ليدي التسماني الأسترالي', 'Tasmanian Pink Lady Apple', 'Pomme Pink Lady de Tasmanie', 'Manzana Pink Lady de Tasmania', 'Pink-Lady-Apfel aus Tasmanien', 'fruit', 'snack', 0, 14, 0, 'raw', TAS, diasporaFor(TAS)),
  B('أذن البحر التسمانية الأسترالية', 'Tasmanian Abalone', 'Ormeau de Tasmanie', 'Abulón de Tasmania', 'Seeohr aus Tasmanien', 'fish_seafood', 'dinner', 17, 5, 1, 'steaming', TAS, diasporaFor(TAS)),
  B('جراد مارون الأسترالي من غرب أستراليا', 'Western Australian Marron', 'Marron d’Australie-Occidentale', 'Marron de Australia Occidental', 'Marron aus Westaustralien', 'fish_seafood', 'dinner', 18, 1, 1, 'boiling', WA, diasporaFor(WA)),
  B('بلح البحر الحار من بيرث الأسترالية', 'Perth Chilli Mussels', 'Moules pimentées de Perth', 'Mejillones picantes de Perth', 'Scharfe Miesmuscheln aus Perth', 'fish_seafood', 'dinner', 14, 7, 6, 'stewing', WA, diasporaFor(WA)),
  B('جراد البحر الصخري من ألباني الأسترالية', 'Albany Western Rock Lobster', 'Langouste occidentale d’Albany', 'Langosta occidental de Albany', 'Westlicher Hummer aus Albany', 'fish_seafood', 'dinner', 20, 1, 2, 'steaming', WA, diasporaFor(WA)),
  B('خبز مارون المحمص من بيرث الأسترالية', 'Perth Marron Toast', 'Tartine grillée au marron de Perth', 'Tostada de marron de Perth', 'Geröstetes Marronbrot aus Perth', 'street_snacks', 'lunch', 13, 24, 7, 'toasting', WA, diasporaFor(WA)),
  B('فطيرة اللحم العائمة الأسترالية', 'Adelaide Beef Pie Floater', 'Tourte flottante au bœuf d’Adélaïde', 'Pastel flotante de res de Adelaida', 'Adelaide Beef-Pie-Floater', 'meat_mains', 'lunch', 12, 25, 13, 'baking', SA, diasporaFor(SA)),
  B('كعكة اللوز الأسترالية من أديلايد', 'Adelaide Almond Cake', 'Gâteau aux amandes d’Adélaïde', 'Pastel de almendra de Adelaida', 'Mandelkuchen aus Adelaide', 'rice_cakes_sweets', 'snack', 7, 38, 18, 'baking', SA, diasporaFor(SA)),
  B('مذاق الطماطم الخضراء من جنوب أستراليا أسترالي', 'South Australian Green Tomato Relish', 'Condiment aux tomates vertes d’Australie-Méridionale', 'Salsa de tomate verde de Australia Meridional', 'Grüne-Tomaten-Relish aus Südaustralien', 'condiments_sauces', 'dinner', 1, 29, 1, 'stewing', SA, diasporaFor(SA)),
  B('فطائر الذرة من جنوب أستراليا أسترالي', 'South Australian Sweet Corn Fritters', 'Beignets de maïs doux d’Australie-Méridionale', 'Buñuelos de maíz dulce de Australia Meridional', 'Maisküchlein aus Südaustralien', 'street_snacks', 'snack', 5, 25, 8, 'frying', SA, diasporaFor(SA)),
  B('يخنة باراموندي بجوز الهند الأسترالية', 'Northern Territory Barramundi Coconut Stew', 'Ragoût de barramundi à la noix de coco du Territoire du Nord', 'Guiso de barramundi con coco del Territorio del Norte', 'Barramundi-Kokos-Eintopf aus dem Northern Territory', 'soups_stews', 'dinner', 16, 9, 10, 'stewing', NT, diasporaFor(NT)),
  B('عصير مانجو داروين الأسترالي', 'Darwin Mango Smoothie', 'Smoothie à la mangue de Darwin', 'Batido de mango de Darwin', 'Mango-Smoothie aus Darwin', 'beverages', 'snack', 3, 17, 3, 'blending', NT, diasporaFor(NT)),
  B('مربى برقوق كاكادو الأسترالي', 'Kakadu Plum Jam', 'Confiture de prunes de Kakadu', 'Mermelada de ciruela de Kakadu', 'Kakadu-Pflaumenmarmelade', 'condiments_sauces', 'breakfast', 0, 55, 0, 'boiling', NT, diasporaFor(NT)),
  B('صلصة طماطم الأدغال من الإقليم الشمالي الأسترالي', 'Northern Territory Bush Tomato Relish', 'Condiment à la tomate de brousse du Territoire du Nord', 'Salsa de tomate silvestre del Territorio del Norte', 'Buschtomaten-Relish aus dem Northern Territory', 'condiments_sauces', 'dinner', 2, 22, 3, 'stewing', NT, diasporaFor(NT)),
  B('فطيرة كاري اللحم البقري من داروين الأسترالية', 'Darwin Beef Curry Pie', 'Tourte au curry de bœuf de Darwin', 'Pastel de curry de res de Darwin', 'Rindfleisch-Currypastete aus Darwin', 'meat_mains', 'lunch', 13, 23, 13, 'baking', NT, diasporaFor(NT)),
  B('حساء بلح البحر الأخضر من أوكلاند النيوزيلندية', 'Auckland Green-Lipped Mussel Chowder', 'Chaudrée de moules vertes d’Auckland', 'Crema de mejillones verdes de Auckland', 'Grüne-Muschel-Chowder aus Auckland', 'soups_stews', 'lunch', 12, 13, 8, 'boiling', AKL, diasporaFor(AKL)),
  B('فطائر السمك الأبيض من أوكلاند النيوزيلندية', 'Auckland Whitebait Fritters', 'Beignets de petits poissons d’Auckland', 'Buñuelos de pescaditos de Auckland', 'Weißfischküchlein aus Auckland', 'fish_seafood', 'lunch', 14, 10, 9, 'frying', AKL, diasporaFor(AKL)),
  B('فتات فيجوا أوكلاند النيوزيلندي', 'Auckland Feijoa Shortcake', 'Sablé aux feijoas d’Auckland', 'Tarta de feijoa de Auckland', 'Feijoa-Shortcake aus Auckland', 'rice_cakes_sweets', 'snack', 3, 42, 12, 'baking', AKL, diasporaFor(AKL)),
  B('فطيرة كومارا أوكلاند النيوزيلندية', 'Auckland Kūmara Fritters', 'Galettes de kūmara d’Auckland', 'Tortitas de kūmara de Auckland', 'Kūmara-Küchlein aus Auckland', 'vegetable_mains', 'lunch', 4, 25, 8, 'frying', AKL, diasporaFor(AKL)),
  B('كعكة الجبن الويلنغتونية النيوزيلندية', 'Wellington Cheese Scone', 'Scone au fromage de Wellington', 'Scone de queso de Wellington', 'Käsescone aus Wellington', 'breakfast_items', 'breakfast', 10, 36, 12, 'baking', WLG, diasporaFor(WLG)),
  B('كعكات سنابر ويلنغتون النيوزيلندية', 'Wellington Snapper Cakes', 'Galettes de vivaneau de Wellington', 'Tortitas de pargo de Wellington', 'Schnapperküchlein aus Wellington', 'fish_seafood', 'lunch', 16, 11, 8, 'frying', WLG, diasporaFor(WLG)),
  B('مثلجات هوكي بوكي الويلنغتونية النيوزيلندية', 'Wellington Hokey Pokey Ice Cream', 'Glace hokey pokey de Wellington', 'Helado hokey pokey de Wellington', 'Hokey-Pokey-Eis aus Wellington', 'rice_cakes_sweets', 'snack', 4, 28, 11, 'freezing', WLG, diasporaFor(WLG)),
  B('لحم ضأن كانتربري المشوي النيوزيلندي', 'Canterbury Roast Lamb', 'Agneau rôti de Canterbury', 'Cordero asado de Canterbury', 'Lammbraten aus Canterbury', 'meat_mains', 'dinner', 25, 0, 15, 'roasting', CAN, diasporaFor(CAN)),
  B('فطيرة لحم الضأن كانتربري النيوزيلندية', 'Canterbury Lamb Pasty', 'Pâté en croûte à l’agneau de Canterbury', 'Empanada de cordero de Canterbury', 'Lamm-Pastete aus Canterbury', 'meat_mains', 'lunch', 14, 24, 13, 'baking', CAN, diasporaFor(CAN)),
  B('زلابية المشمش الأوتاغوية النيوزيلندية', 'Otago Apricot Dumplings', 'Ravioles aux abricots d’Otago', 'Empanadillas de albaricoque de Otago', 'Aprikosenknödel aus Otago', 'rice_cakes_sweets', 'snack', 4, 44, 8, 'boiling', OTA, diasporaFor(OTA)),
  B('هآنگي لحم الضأن الماوري النيوزيلندي', 'Māori Lamb Hāngī', 'Hāngī maori à l’agneau', 'Hāngī maorí de cordero', 'Māori-Hāngī mit Lamm', 'meat_mains', 'dinner', 23, 8, 12, 'earth_oven', MAORI, diasporaFor(MAORI)),
];
