import { B, diasporaFor } from '../australasia-base-data/rows.mjs';

const R = 'pan_australasian';
const NSW = 'nsw';
const V = 'victoria';
const Q = 'queensland';
const WA = 'western_australia';
const SA = 'south_australia';
const T = 'tasmania';
const NT = 'northern_territory';
const AK = 'auckland';
const W = 'wellington';
const C = 'canterbury';
const O = 'otago';
const M = 'maori';

export default [
  B('طبق نيوزيلندي من كعكات الكومارا بغموس الجرجير', 'Kumara Cakes with Watercress Dip', 'Galettes de kumara avec sauce au cresson', 'Tortitas de kumara con salsa de berro', 'Kumara-Küchlein mit Brunnenkressedip', 'street_snacks', 'snack', 5, 32, 10, 'frying', W, diasporaFor(W)),
  B('طبق أسترالي من فطائر الذرة والروبيان', 'Prawn and Corn Fritters', 'Beignets de crevettes et maïs', 'Buñuelos de langostino y maíz', 'Garnelen-Maisküchlein', 'street_snacks', 'snack', 12, 25, 9, 'frying', Q, diasporaFor(Q)),
  B('طبق أسترالي من جيوب المعجنات بالضأن والفطر', 'Lamb Mushroom Pastry Pockets', 'Feuilletés farcis à l’agneau et aux cèpes', 'Bocaditos de hojaldre rellenos de cordero y setas', 'Blätterteigtaschen mit Lamm und Pilzen', 'street_snacks', 'snack', 13, 24, 15, 'baking', V, diasporaFor(V)),
  B('طبق نيوزيلندي من لقيمات بلح البحر وعشب البحر', 'Mussel Kelp Bites', 'Bouchées de moules et varech', 'Bocados de mejillón y alga marina', 'Muschel-Algen-Happen', 'street_snacks', 'snack', 14, 18, 8, 'frying', O, diasporaFor(O)),
  B('طبق أسترالي من شرائح جوز الهند والليمون الإصبعي', 'Finger Lime Coconut Slice', 'Carré à la noix de coco et citron doigt', 'Cuadrado de coco y lima dedo', 'Kokosschnitte mit Fingerlimette', 'rice_cakes_sweets', 'snack', 4, 48, 19, 'baking', Q, diasporaFor(Q)),
  B('طبق أسترالي من بسكويت الليمون العطري', 'Lemon Myrtle Shortbread', 'Sablés à la myrte citronnée', 'Galletas de mantequilla al mirto limón', 'Mürbgebäck mit Zitronenmyrte', 'rice_cakes_sweets', 'snack', 5, 62, 23, 'baking', V, diasporaFor(V)),
  B('طبق نيوزيلندي من مثلجات الفيجوا', 'Feijoa Sorbet', 'Sorbet à la feijoa', 'Sorbete de feijoa', 'Feijoa-Sorbet', 'rice_cakes_sweets', 'snack', 1, 29, 1, 'freezing', AK, diasporaFor(AK)),
  B('طبق أسترالي من فتات الشوفان والتوت الأسود', 'Blackberry Oat Crumble', 'Crumble aux mûres et flocons d’avoine', 'Crumble de moras y avena', 'Brombeer-Hafer-Crumble', 'rice_cakes_sweets', 'snack', 4, 46, 15, 'baking', T, diasporaFor(T)),
  B('طبق أسترالي من حلوى التابيوكا وخوخ كاكادو', 'Kakadu Plum Tapioca Pudding', 'Pudding de tapioca à la prune de Kakadu', 'Pudín de tapioca con ciruela de Kakadu', 'Tapiokapudding mit Kakadu-Pflaume', 'rice_cakes_sweets', 'snack', 3, 39, 8, 'boiling', NT, diasporaFor(NT)),
  B('طبق نيوزيلندي من بودينغ الكومارا وعسل المانوكا', 'Kumara Manuka Honey Steamed Pudding', 'Pudding vapeur de kumara au miel de manuka', 'Pudín al vapor de kumara con miel de manuka', 'Gedämpfter Kumara-Pudding mit Manukahonig', 'rice_cakes_sweets', 'snack', 5, 44, 11, 'steaming', M, diasporaFor(M)),
  B('طبق أسترالي من حلوى النوجا بالمكاديميا والعسل', 'Macadamia Honey Nougat', 'Nougat au miel et aux noix de macadamia', 'Turrón de miel y nueces de macadamia', 'Macadamia-Honignougat', 'rice_cakes_sweets', 'snack', 8, 59, 20, 'boiling', SA, diasporaFor(SA)),
  B('طبق نيوزيلندي من تارت الكشمش الأسود والكاسترد', 'Blackcurrant Custard Tart', 'Tarte à la crème pâtissière et au cassis', 'Tarta de natillas y grosella negra', 'Schwarze-Johannisbeer-Cremetarte', 'rice_cakes_sweets', 'snack', 6, 41, 17, 'baking', C, diasporaFor(C)),
  B('طبق أسترالي من كعكة الجبن وخوخ ديفيدسون', 'Davidson Plum Baked Cheesecake', 'Gâteau au fromage cuit à la prune Davidson', 'Tarta de queso horneada con ciruela Davidson', 'Gebackener Käsekuchen mit Davidson-Pflaume', 'rice_cakes_sweets', 'snack', 8, 29, 21, 'baking', NSW, diasporaFor(NSW)),
  B('طبق أسترالي من هلام الكواندونغ وجوز الهند', 'Quandong Coconut Jelly', 'Gelée de quandong à la noix de coco', 'Gelatina de quandong y coco', 'Quandong-Kokosgelee', 'rice_cakes_sweets', 'snack', 2, 30, 6, 'chilling', WA, diasporaFor(WA)),
  B('طبق أسترالي من تتبيلة الليمون الإصبعي', 'Finger Lime Dressing', 'Vinaigrette au citron doigt', 'Aderezo de lima dedo', 'Fingerlimetten-Dressing', 'condiments_sauces', 'snack', 1, 12, 18, 'mixing', Q, diasporaFor(Q)),
  B('طبق أسترالي من صلصة الطماطم الصحراوية', 'Bush Tomato Relish', 'Condiment à la tomate du désert', 'Salsa de tomate del desierto', 'Buschtomatenrelish', 'condiments_sauces', 'dinner', 2, 34, 3, 'simmering', NT, diasporaFor(NT)),
  B('طبق أسترالي من معجون المكاديميا وفلفل الأدغال', 'Macadamia Native Pepper Paste', 'Pâte de macadamia au poivre indigène', 'Pasta de macadamia con pimienta nativa', 'Macadamiapaste mit australischem Pfeffer', 'condiments_sauces', 'snack', 9, 16, 36, 'grinding', WA, diasporaFor(WA)),
  B('طبق نيوزيلندي من تتبيلة أعشاب الكاواكاوا', 'Kawakawa Herb Marinade', 'Marinade aux herbes de kawakawa', 'Adobo de hierbas kawakawa', 'Kawakawa-Kräutermarinade', 'condiments_sauces', 'dinner', 1, 8, 9, 'mixing', M, diasporaFor(M)),
  B('طبق أسترالي من خردل توت الفلفل التسماني', 'Tasmanian Pepperberry Mustard', 'Moutarde aux baies poivrées de Tasmanie', 'Mostaza con bayas de pimienta de Tasmania', 'Tasmanischer Pfefferbeersenf', 'condiments_sauces', 'dinner', 5, 15, 18, 'mixing', T, diasporaFor(T)),
  B('شراب أسترالي من شاي الليمون العطري المثلج', 'Iced Lemon Myrtle Tea', 'Thé glacé à la myrte citronnée', 'Té helado al mirto limón', 'Eistee mit Zitronenmyrte', 'beverages', 'snack', 0, 7, 0, 'brewing', NSW, diasporaFor(NSW)),
  B('شراب أسترالي من الأناناس والليمون الإصبعي', 'Pineapple Finger Lime Cooler', 'Boisson fraîche à l’ananas et citron doigt', 'Refresco de piña y lima dedo', 'Ananas-Fingerlimetten-Erfrischung', 'beverages', 'snack', 0, 13, 0, 'mixing', Q, diasporaFor(Q)),
  B('شراب نيوزيلندي من مخفوق الفيجوا واللبن', 'Feijoa Yogurt Smoothie', 'Smoothie au yaourt et à la feijoa', 'Batido de yogur y feijoa', 'Feijoa-Joghurt-Smoothie', 'beverages', 'breakfast', 4, 17, 2, 'blending', AK, diasporaFor(AK)),
  B('شراب أسترالي من عصير الكواندونغ', 'Quandong Nectar', 'Nectar de quandong', 'Néctar de quandong', 'Quandongnektar', 'beverages', 'snack', 0, 14, 0, 'pressing', SA, diasporaFor(SA)),
  B('شراب نيوزيلندي من منقوع النعناع والكاواكاوا', 'Kawakawa Mint Herbal Infusion', 'Infusion de menthe et kawakawa', 'Infusión de menta y kawakawa', 'Minz-Kawakawa-Kräuteraufguss', 'beverages', 'snack', 0, 1, 0, 'brewing', W, diasporaFor(W)),
  B('ثمر أسترالي من خوخ ديفيدسون', 'Davidson Plum Fruit', 'Prune Davidson fraîche', 'Fruta de ciruela Davidson', 'Davidson-Pflaume', 'fruit', 'snack', 1, 12, 0, 'raw', NSW, diasporaFor(NSW)),
  B('ثمر أسترالي من الليمون الإصبعي', 'Australian Finger Limes', 'Citrons doigts australiens', 'Limas dedo australianas', 'Australische Fingerlimetten', 'fruit', 'snack', 1, 11, 0, 'raw', Q, diasporaFor(Q)),
  B('ثمر أسترالي من الكواندونغ الناضج', 'Ripe Quandong Fruit', 'Fruit de quandong mûr', 'Fruta madura de quandong', 'Reife Quandong-Frucht', 'fruit', 'snack', 1, 10, 1, 'raw', WA, diasporaFor(WA)),
  B('ثمر أسترالي من توت مونتريز', 'Muntries Berries', 'Baies de muntries', 'Bayas de muntries', 'Muntries-Beeren', 'fruit', 'snack', 1, 13, 0, 'raw', SA, diasporaFor(SA)),
  B('ثمر أسترالي من توت الفلفل الجبلي', 'Tasmanian Mountain Pepperberries', 'Baies poivrées des montagnes de Tasmanie', 'Bayas de pimienta de montaña de Tasmania', 'Tasmanische Bergpfefferbeeren', 'fruit', 'snack', 2, 15, 1, 'raw', T, diasporaFor(T)),
  B('ثمر أسترالي من خوخ كاكادو', 'Kakadu Plum Fruit', 'Fruit de prune de Kakadu', 'Fruta de ciruela de Kakadu', 'Kakadu-Pflaumenfrucht', 'fruit', 'snack', 1, 12, 0, 'raw', NT, diasporaFor(NT)),
  B('ثمر نيوزيلندي من الفيجوا الطازج', 'Fresh Feijoa Fruit', 'Feijoa fraîche', 'Feijoa fresca', 'Frische Feijoa', 'fruit', 'snack', 1, 14, 0, 'raw', AK, diasporaFor(AK)),
  B('ثمر نيوزيلندي من التاماريلو الناضج', 'Ripe Tamarillo', 'Tamarillo mûr', 'Tamarillo maduro', 'Reife Tamarillo', 'fruit', 'snack', 2, 8, 1, 'raw', W, diasporaFor(W)),
  B('ثمر نيوزيلندي من الكشمش الأسود في كانتربري', 'Canterbury Blackcurrants', 'Cassis de Canterbury', 'Grosellas negras de Canterbury', 'Schwarze Johannisbeeren aus Canterbury', 'fruit', 'snack', 1, 15, 0, 'raw', C, diasporaFor(C)),
  B('ثمر نيوزيلندي من مشمش أوتاغو', 'Otago Apricots', 'Abricots d’Otago', 'Albaricoques de Otago', 'Aprikosen aus Otago', 'fruit', 'snack', 1, 11, 0, 'raw', O, diasporaFor(O)),
  B('طبق أسترالي من كعكات الذرة وخضار الواريغال للإفطار', 'Warrigal Greens and Sweet Corn Breakfast Cakes', 'Galettes matinales de maïs doux et feuilles de warrigal', 'Tortitas matinales de maíz dulce y hojas de warrigal', 'Frühstücksküchlein mit Zuckermais und Warrigal-Blättern', 'breakfast_items', 'breakfast', 6, 30, 8, 'frying', NSW, diasporaFor(NSW)),
  B('طبق نيوزيلندي من النهاش المطهو على البخار وأرز الكاواكاوا', 'Steamed Snapper with Kawakawa Rice', 'Vivaneau vapeur accompagné de riz au kawakawa', 'Pargo al vapor con arroz al kawakawa', 'Gedämpfter Schnapper mit Kawakawa-Reis', 'rice_dishes', 'dinner', 21, 27, 7, 'steaming', AK, diasporaFor(AK)),
  B('طبق أسترالي من نودلز الأرز والروبيان والليمون الأسبن', 'Carnarvon Prawn Lemon Aspen Rice Noodles', 'Nouilles de riz aux crevettes et citron aspen de Carnarvon', 'Fideos de arroz con langostinos y limón aspen de Carnarvon', 'Carnarvon-Reisnudeln mit Garnelen und Lemon Aspen', 'noodle_dishes', 'dinner', 16, 33, 7, 'stir_frying', WA, diasporaFor(WA)),
  B('طبق أسترالي من حساء الجزر الأبيض وخضار الواريغال', 'Parsnip Warrigal Greens Soup', 'Soupe de panais aux feuilles de warrigal', 'Sopa de chirivía con hojas de warrigal', 'Pastinakensuppe mit Warrigal-Blättern', 'soups_stews', 'lunch', 4, 18, 6, 'boiling', V, diasporaFor(V)),
  B('طبق أسترالي من الدجاج المسلوق بجوز الهند والزنجبيل الأسترالي', 'Coconut Poached Chicken with Native Ginger', 'Poulet poché au lait de coco et gingembre indigène', 'Pollo escalfado en coco con jengibre nativo', 'In Kokos pochiertes Huhn mit australischem Ingwer', 'poultry_mains', 'dinner', 22, 8, 12, 'poaching', Q, diasporaFor(Q)),
  B('طبق نيوزيلندي من كتف البقر وصلصة الكشمش الأسود', 'Beef Shoulder with Blackcurrant Jus', 'Épaule de bœuf au jus de cassis', 'Paletilla de res con jugo de grosella negra', 'Rinderschulter mit schwarzem Johannisbeersaft', 'meat_mains', 'dinner', 23, 8, 15, 'braising', C, diasporaFor(C)),
  B('طبق أسترالي من سلمون تسمانيا وصلصة التفاح والشمر', 'Tasmanian Salmon with Apple Fennel Relish', 'Saumon de Tasmanie et condiment à la pomme et au fenouil', 'Salmón de Tasmania con salsa de manzana e hinojo', 'Tasmanischer Lachs mit Apfel-Fenchel-Relish', 'fish_seafood', 'dinner', 21, 9, 14, 'baking', T, diasporaFor(T)),
  B('طبق نيوزيلندي من محار بلاف والكومارا المخبوز', 'Bluff Oyster Kumara Bake', 'Gratin de kumara aux huîtres de Bluff', 'Gratén de kumara con ostras de Bluff', 'Kumara-Auflauf mit Bluff-Austern', 'fish_seafood', 'dinner', 14, 19, 8, 'baking', O, diasporaFor(O)),
  B('طبق أسترالي من يخنة البوهة والكومارا والبازلاء', 'Puha Kumara Pea Stew', 'Ragoût de puha, kumara et petits pois', 'Guiso de puha, kumara y guisantes', 'Puha-Kumara-Erbseneintopf', 'vegetable_mains', 'dinner', 8, 25, 5, 'stewing', M, diasporaFor(M)),
  B('طبق أسترالي من الجزر المطلي بتوت مونتريز والملح بوش', 'Muntries Glazed Carrots with Saltbush', 'Carottes glacées aux muntries et salicorne australienne', 'Zanahorias glaseadas con muntries y salicornia australiana', 'Mit Muntries glasierte Karotten und australischer Queller', 'vegetable_mains', 'dinner', 2, 20, 6, 'roasting', SA, diasporaFor(SA)),
  B('طبق أسترالي شامل من فطائر الكومارا والذرة وبذور الوتل', 'Australasian Kumara Corn Wattleseed Patties', 'Galettes australasiennes de kumara, maïs et graines de wattleseed', 'Tortitas australásicas de kumara, maíz y semillas de wattleseed', 'Australasiatische Kumara-Mais-Wattlesamen-Bratlinge', 'vegetable_mains', 'lunch', 5, 32, 8, 'frying', R, diasporaFor(R)),
  B('طبق أسترالي من لقيمات الإسكالوب والبطاطس التسمانية', 'Tasmanian Scallop Potato Bites', 'Bouchées de pomme de terre aux pétoncles de Tasmanie', 'Bocados de patata con vieira de Tasmania', 'Tasmanische Jakobsmuschel-Kartoffelhappen', 'street_snacks', 'snack', 10, 20, 9, 'frying', T, diasporaFor(T)),
  B('طبق نيوزيلندي من كعكة المانوكا والكشمش الأسود بالبخار', 'Manuka Blackcurrant Steamed Sponge', 'Gâteau éponge vapeur au manuka et cassis', 'Bizcocho al vapor de manuka y grosella negra', 'Gedämpfter Biskuit mit Manuka und schwarzer Johannisbeere', 'rice_cakes_sweets', 'snack', 5, 48, 10, 'steaming', C, diasporaFor(C)),
  B('طبق نيوزيلندي من صلصة التفاح والهوروبتو', 'Horopito Apple Chutney', 'Chutney de pomme et horopito', 'Chutney de manzana y horopito', 'Apfel-Horopito-Chutney', 'condiments_sauces', 'dinner', 1, 38, 1, 'simmering', W, diasporaFor(W)),
  B('شراب أسترالي من الليمون الصحراوي والزنجبيل', 'Desert Lime Ginger Cooler', 'Boisson fraîche au citron du désert et gingembre', 'Refresco de limón del desierto y jengibre', 'Erfrischungsgetränk mit Wüstenlimette und Ingwer', 'beverages', 'snack', 0, 12, 0, 'mixing', NT, diasporaFor(NT)),
  B('ثمر نيوزيلندي من الخوخ المخبوز بعسل المانوكا', 'Manuka Honey Roasted Peaches', 'Pêches rôties au miel de manuka', 'Melocotones asados con miel de manuka', 'Mit Manukahonig geröstete Pfirsiche', 'fruit', 'snack', 1, 17, 1, 'roasting', M, diasporaFor(M)),
];
