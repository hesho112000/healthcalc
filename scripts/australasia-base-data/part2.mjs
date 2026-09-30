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
  B('خبز ريوينا الماوري النيوزيلندي', 'Māori Rewena Bread', 'Pain rewena maori', 'Pan rewena maorí', 'Māori-Rewena-Brot', 'breakfast_items', 'breakfast', 8, 46, 3, 'baking', MAORI, diasporaFor(MAORI)),
  B('حساء اللحم البقري الماوري النيوزيلندي', 'Māori Beef Boil-Up', 'Bouilli maori au bœuf', 'Cocido maorí de res', 'Māori-Rindfleisch-Bouille', 'soups_stews', 'dinner', 15, 12, 8, 'boiling', MAORI, diasporaFor(MAORI)),
  B('بودينغ البخار الماوري النيوزيلندي', 'Māori Steamed Pudding', 'Pudding maori cuit à la vapeur', 'Budín maorí al vapor', 'Māori-Dampfpudding', 'rice_cakes_sweets', 'snack', 5, 48, 12, 'steaming', MAORI, diasporaFor(MAORI)),
  B('كومارا هانغي الماوري النيوزيلندي', 'Māori Hāngī Kūmara', 'Kūmara maori au hāngī', 'Kūmara maorí al hāngī', 'Māori-Hāngī-Kūmara', 'vegetable_mains', 'dinner', 2, 24, 1, 'earth_oven', MAORI, diasporaFor(MAORI)),
  B('فطائر باوا الماورية النيوزيلندية', 'Māori Pāua Fritters', 'Beignets maoris de pāua', 'Buñuelos maoríes de pāua', 'Māori-Pāua-Küchlein', 'fish_seafood', 'lunch', 16, 12, 7, 'frying', MAORI, diasporaFor(MAORI)),
  B('سلطة كينا الماورية النيوزيلندية', 'Māori Kina Salad', 'Salade maorie de kina', 'Ensalada maorí de kina', 'Māori-Kina-Salat', 'fish_seafood', 'lunch', 10, 5, 8, 'mixing', MAORI, diasporaFor(MAORI)),
  B('فطائر بلح البحر الأخضر الأوكلاندية النيوزيلندية', 'Auckland Green-Lipped Mussel Fritters', 'Beignets de moules vertes d’Auckland', 'Buñuelos de mejillones verdes de Auckland', 'Grüne-Muschel-Küchlein aus Auckland', 'fish_seafood', 'lunch', 13, 14, 8, 'frying', AKL, diasporaFor(AKL)),
  B('فطيرة السمك الأوكلاندية النيوزيلندية', 'Auckland Fish Pie', 'Tourte au poisson d’Auckland', 'Pastel de pescado de Auckland', 'Fischpastete aus Auckland', 'fish_seafood', 'dinner', 15, 22, 12, 'baking', AKL, diasporaFor(AKL)),
  B('صلصة تاماريلو أوكلاند النيوزيلندية', 'Auckland Tamarillo Chutney', 'Chutney de tamarillo d’Auckland', 'Chutney de tamarillo de Auckland', 'Tamarillo-Chutney aus Auckland', 'condiments_sauces', 'snack', 1, 34, 1, 'stewing', AKL, diasporaFor(AKL)),
  B('عصير فيجوا أوكلاند النيوزيلندي', 'Auckland Feijoa Smoothie', 'Smoothie aux feijoas d’Auckland', 'Batido de feijoa de Auckland', 'Feijoa-Smoothie aus Auckland', 'beverages', 'snack', 3, 18, 3, 'blending', AKL, diasporaFor(AKL)),
  B('لفافة لحم الضأن الويلنغتونية النيوزيلندية', 'Wellington Roast Lamb Roll', 'Rouleau à l’agneau rôti de Wellington', 'Rollo de cordero asado de Wellington', 'Lammbrötchen aus Wellington', 'meat_mains', 'lunch', 17, 29, 8, 'roasting', WLG, diasporaFor(WLG)),
  B('كعكة العسل والليمون الويلنغتونية النيوزيلندية', 'Wellington Lemon Honey Cake', 'Gâteau au miel et citron de Wellington', 'Pastel de miel y limón de Wellington', 'Zitronen-Honigkuchen aus Wellington', 'rice_cakes_sweets', 'snack', 5, 45, 14, 'baking', WLG, diasporaFor(WLG)),
  B('عجة السمك الأبيض الويلنغتونية النيوزيلندية', 'Wellington Whitebait Omelette', 'Omelette aux petits poissons de Wellington', 'Tortilla de pescaditos de Wellington', 'Weißfischomelett aus Wellington', 'fish_seafood', 'breakfast', 14, 2, 11, 'frying', WLG, diasporaFor(WLG)),
  B('حساء سنابر ويلنغتون النيوزيلندي', 'Wellington Snapper Chowder', 'Chaudrée de vivaneau de Wellington', 'Crema de pargo de Wellington', 'Schnapper-Chowder aus Wellington', 'soups_stews', 'lunch', 14, 10, 8, 'boiling', WLG, diasporaFor(WLG)),
  B('طاجن لحم الضأن والعدس كانتربري النيوزيلندي', 'Canterbury Lamb and Lentil Casserole', 'Cassolette d’agneau et lentilles de Canterbury', 'Cazuela de cordero y lentejas de Canterbury', 'Lamm-Linsen-Auflauf aus Canterbury', 'soups_stews', 'dinner', 17, 14, 9, 'baking', CAN, diasporaFor(CAN)),
  B('سلمون كانتربري بهوروبیتو النيوزيلندي', 'Canterbury Salmon with Horopito', 'Saumon de Canterbury au horopito', 'Salmón de Canterbury con horopito', 'Canterbury-Lachs mit Horopito', 'fish_seafood', 'dinner', 21, 1, 11, 'grilling', CAN, diasporaFor(CAN)),
  B('تارت الهليون كانتربري النيوزيلندية', 'Canterbury Asparagus Tart', 'Tarte aux asperges de Canterbury', 'Tarta de espárragos de Canterbury', 'Spargeltarte aus Canterbury', 'vegetable_mains', 'lunch', 8, 25, 12, 'baking', CAN, diasporaFor(CAN)),
  B('كعكة التوت كانتربري النيوزيلندية', 'Canterbury Berry Sponge', 'Gâteau éponge aux baies de Canterbury', 'Bizcocho de bayas de Canterbury', 'Fruchtschaumkuchen aus Canterbury', 'rice_cakes_sweets', 'snack', 5, 43, 11, 'baking', CAN, diasporaFor(CAN)),
  B('لفافة الجبن الأوتاغوية النيوزيلندية', 'Otago Cheese Roll', 'Rouleau au fromage d’Otago', 'Rollo de queso de Otago', 'Käserolle aus Otago', 'street_snacks', 'snack', 11, 31, 12, 'toasting', OTA, diasporaFor(OTA)),
  B('فطائر سمك القد الأزرق الأوتاغوية النيوزيلندية', 'Otago Blue Cod Fritters', 'Beignets de morue bleue d’Otago', 'Buñuelos de bacalao azul de Otago', 'Blauer-Kabeljau-Küchlein aus Otago', 'fish_seafood', 'lunch', 16, 13, 8, 'frying', OTA, diasporaFor(OTA)),
  B('مربى المشمش الأوتاغوية النيوزيلندية', 'Otago Apricot Jam', 'Confiture d’abricots d’Otago', 'Mermelada de albaricoque de Otago', 'Aprikosenkonfitüre aus Otago', 'condiments_sauces', 'breakfast', 0, 58, 0, 'boiling', OTA, diasporaFor(OTA)),
  B('زلابية المشمش المخبوزة الأوتاغوية النيوزيلندية', 'Otago Baked Apricot Dumplings', 'Boulettes aux abricots cuites d’Otago', 'Bollos horneados de albaricoque de Otago', 'Gebackene Aprikosenknödel aus Otago', 'rice_cakes_sweets', 'snack', 4, 41, 9, 'baking', OTA, diasporaFor(OTA)),
  B('زلابية الشراب الذهبي الأسترالية', 'Australian Golden Syrup Dumplings', 'Boulettes au sirop doré australiennes', 'Bollos con sirope dorado australianos', 'Australische Goldsirupknödel', 'rice_cakes_sweets', 'snack', 4, 55, 9, 'steaming', PAN, diasporaFor(PAN)),
  B('دجاج شنيتزل الأسترالي بالليمون', 'Australian Chicken Schnitzel with Lemon', 'Escalope de poulet australienne au citron', 'Escalope de pollo australiana con limón', 'Australisches Hähnchenschnitzel mit Zitrone', 'poultry_mains', 'dinner', 21, 14, 12, 'frying', PAN, diasporaFor(PAN)),
  B('خبز فيري الأسترالي الملون', 'Australian Fairy Bread', 'Pain féerique australien', 'Pan de hadas australiano', 'Australisches Feenbrot', 'street_snacks', 'snack', 5, 48, 12, 'toasting', PAN, diasporaFor(PAN)),
  B('مشروب ميلو الأسترالي بالحليب', 'Australian Milo Malt Drink', 'Boisson maltée Milo australienne', 'Bebida malteada Milo australiana', 'Australisches Milo-Malzgetränk', 'beverages', 'snack', 4, 19, 4, 'mixing', PAN, diasporaFor(PAN)),
  B('روبيان مشوي على الطريقة الأسترالية', 'Australian Barbecued Prawns', 'Crevettes grillées à l’australienne', 'Langostinos a la parrilla al estilo australiano', 'Australische Grillgarnelen', 'fish_seafood', 'dinner', 20, 2, 5, 'grilling', PAN, diasporaFor(PAN)),
  B('دجاج الليمون ميرتل من نيو ساوث ويلز الأسترالية', 'New South Wales Lemon Myrtle Chicken', 'Poulet au myrte citronné de Nouvelle-Galles du Sud', 'Pollo con mirto limón de Nueva Gales del Sur', 'Zitronenmyrten-Hähnchen aus New South Wales', 'poultry_mains', 'dinner', 22, 3, 9, 'roasting', NSW, diasporaFor(NSW)),
  B('سنابر بقشرة المكاديميا من نيو ساوث ويلز الأسترالية', 'New South Wales Macadamia-Crusted Snapper', 'Vivaneau en croûte de macadamia de Nouvelle-Galles du Sud', 'Pargo con costra de macadamia de Nueva Gales del Sur', 'Schnapper mit Macadamiakruste aus New South Wales', 'fish_seafood', 'dinner', 20, 5, 13, 'baking', NSW, diasporaFor(NSW)),
  B('فطيرة مأكولات نيْوكاسل البحرية الأسترالية', 'Newcastle Seafood Pie', 'Tourte aux fruits de mer de Newcastle', 'Pastel de mariscos de Newcastle', 'Meeresfrüchtepastete aus Newcastle', 'fish_seafood', 'lunch', 14, 22, 12, 'baking', NSW, diasporaFor(NSW)),
  B('برغر دجاج بونداي الأسترالي', 'Bondi Chicken Burger', 'Burger au poulet de Bondi', 'Hamburguesa de pollo de Bondi', 'Bondi-Hähnchenburger', 'poultry_mains', 'lunch', 19, 25, 10, 'grilling', NSW, diasporaFor(NSW)),
  B('سلطة روبيان سوق سيدني الأسترالية', 'Sydney Market Prawn Salad', 'Salade de crevettes du marché de Sydney', 'Ensalada de langostinos del mercado de Sídney', 'Garnelensalat vom Sydney Market', 'fish_seafood', 'lunch', 16, 7, 9, 'mixing', NSW, diasporaFor(NSW)),
  B('تارت الريكوتا الفيكتوري', 'Melbourne Ricotta Tart', 'Tarte à la ricotta de Melbourne', 'Tarta de ricota de Melbourne', 'Ricottatorte aus Melbourne', 'rice_cakes_sweets', 'snack', 9, 28, 17, 'baking', VIC, diasporaFor(VIC)),
  B('شريحة الكرز الأسترالية من ملبورن', 'Melbourne Cherry Ripe Slice', 'Carré au chocolat et à la cerise de Melbourne', 'Cuadrado de chocolate y cereza de Melbourne', 'Schokoladen-Kirsch-Schnitte aus Melbourne', 'rice_cakes_sweets', 'snack', 4, 48, 19, 'chilling', VIC, diasporaFor(VIC)),
  B('فطيرة الإسكالوب من جيلونغ الأسترالية', 'Geelong Scallop Pie', 'Tourte aux pétoncles de Geelong', 'Pastel de vieiras de Geelong', 'Jakobsmuschelpastete aus Geelong', 'fish_seafood', 'lunch', 13, 23, 12, 'baking', VIC, diasporaFor(VIC)),
  B('مخفوق قهوة ملبورن الأسترالي', 'Melbourne Coffee Milkshake', 'Milk-shake au café de Melbourne', 'Batido de café de Melbourne', 'Kaffee-Milchshake aus Melbourne', 'beverages', 'snack', 4, 22, 6, 'blending', VIC, diasporaFor(VIC)),
  B('سلطة جراد خليج مورتون الأسترالية', 'Moreton Bay Bug Salad', 'Salade de cigale de mer de Moreton Bay', 'Ensalada de cigarra marina de Moreton Bay', 'Moreton-Bay-Meereszikaden-Salat', 'fish_seafood', 'lunch', 17, 6, 7, 'mixing', QLD, diasporaFor(QLD)),
  B('تاكو السمك الذهبي من كوينزلاند الأسترالية', 'Queensland Golden Trevally Tacos', 'Tacos de carangue dorée du Queensland', 'Tacos de jurel dorado de Queensland', 'Goldmakrelen-Tacos aus Queensland', 'fish_seafood', 'lunch', 16, 25, 8, 'grilling', QLD, diasporaFor(QLD)),
  B('شراب الزنجبيل من كوينزلاند الأسترالية', 'Queensland Ginger Cordial', 'Sirop de gingembre du Queensland', 'Jarabe de jengibre de Queensland', 'Ingwersirup aus Queensland', 'beverages', 'snack', 0, 30, 0, 'reduction', QLD, diasporaFor(QLD)),
  B('سلطة البابايا الاستوائية من كوينزلاند الأسترالية', 'Queensland Tropical Papaya Salad', 'Salade tropicale de papaye du Queensland', 'Ensalada tropical de papaya de Queensland', 'Tropischer Papayasalat aus Queensland', 'fruit', 'lunch', 2, 14, 3, 'mixing', QLD, diasporaFor(QLD)),
  B('حساء القرع الأزرق من كوينزلاند الأسترالية', 'Queensland Blue Pumpkin Soup', 'Soupe au potiron bleu du Queensland', 'Sopa de calabaza azul de Queensland', 'Blaue-Kürbis-Suppe aus Queensland', 'soups_stews', 'lunch', 3, 13, 6, 'boiling', QLD, diasporaFor(QLD)),
  B('كاري سنابر بيرث الأسترالي', 'Perth Snapper Curry', 'Curry de vivaneau de Perth', 'Curry de pargo de Perth', 'Schnapper-Curry aus Perth', 'fish_seafood', 'dinner', 18, 10, 9, 'stewing', WA, diasporaFor(WA)),
  B('فطائر الإسكالوب من جيرالدتون الأسترالية', 'Geraldton Scallop Fritters', 'Beignets de pétoncles de Geraldton', 'Buñuelos de vieiras de Geraldton', 'Jakobsmuschel-Küchlein aus Geraldton', 'fish_seafood', 'lunch', 14, 16, 8, 'frying', WA, diasporaFor(WA)),
  B('لفافة جراد البحر الصخري الأسترالي', 'Western Rock Lobster Roll', 'Rouleau de langouste occidentale', 'Rollo de langosta occidental', 'Brötchen mit westlichem Hummer', 'fish_seafood', 'lunch', 17, 25, 7, 'grilling', WA, diasporaFor(WA)),
  B('خبز مسطح بالطماطم البرية من غرب أستراليا', 'Western Australian Bush Tomato Flatbread', 'Pain plat à la tomate de brousse d’Australie-Occidentale', 'Pan plano con tomate silvestre de Australia Occidental', 'Fladenbrot mit Buschtomate aus Westaustralien', 'breakfast_items', 'breakfast', 7, 46, 5, 'baking', WA, diasporaFor(WA)),
  B('بسكويت البرتقال واللوز من أديلايد الأسترالية', 'Adelaide Orange Almond Biscuits', 'Biscuits à l’orange et aux amandes d’Adélaïde', 'Galletas de naranja y almendra de Adelaida', 'Orangen-Mandel-Kekse aus Adelaide', 'rice_cakes_sweets', 'snack', 7, 49, 16, 'baking', SA, diasporaFor(SA)),
  B('كعكات سمك موراي كود من جنوب أستراليا', 'South Australian Murray Cod Cakes', 'Galettes de morue de Murray d’Australie-Méridionale', 'Tortitas de bacalao del Murray de Australia Meridional', 'Murray-Kabeljau-Küchlein aus Südaustralien', 'fish_seafood', 'lunch', 17, 13, 8, 'frying', SA, diasporaFor(SA)),
  B('فطيرة العدس من أديلايد الأسترالية', 'Adelaide Lentil Pie', 'Tourte aux lentilles d’Adélaïde', 'Pastel de lentejas de Adelaida', 'Linsenpastete aus Adelaide', 'vegetable_mains', 'lunch', 9, 25, 10, 'baking', SA, diasporaFor(SA)),
  B('فطائر سلمون هوان التسمانية الأسترالية', 'Huon Valley Salmon Patties', 'Galettes de saumon de la vallée de Huon', 'Tortitas de salmón del valle de Huon', 'Lachsküchlein aus dem Huon Valley', 'fish_seafood', 'lunch', 17, 12, 9, 'frying', TAS, diasporaFor(TAS)),
  B('يخنة المحار التسمانية الأسترالية', 'Tasmanian Oyster Stew', 'Ragoût d’huîtres de Tasmanie', 'Guiso de ostras de Tasmania', 'Austern-Eintopf aus Tasmanien', 'soups_stews', 'dinner', 10, 8, 6, 'stewing', TAS, diasporaFor(TAS)),
];
