import { B, diasporaFor } from './rows.mjs';

const R = 'pan_canadian';
const Q = 'quebec';
const O = 'ontario';
const BC = 'british_columbia';
const P = 'prairies';
const A = 'atlantic_canada';
const N = 'northern_canada';
const I = 'indigenous_canada';

export default [
  B('بوتان كندي بالحلال', 'Poutine with Halal Gravy', 'Poutine avec sauce halal', 'Poutine con salsa halal', 'Poutine mit Halal-Soße', 'street_snacks', 'lunch', 4, 30, 15, 'frying', Q, diasporaFor(Q)),
  B('فطيرة تورتيير كندي باللحم البقري', 'Halal Beef Tourtière', 'Tourtière au bœuf halal', 'Tourtière de carne halal', 'Halal-Rindfleisch-Tourtière', 'meat_mains', 'dinner', 12, 25, 18, 'baking', Q, diasporaFor(Q)),
  B('لحم بقري مقدد كندي (بي ميل)', 'Halal Beef Peameal Bacon', 'Bacon de dos de bœuf halal', 'Tocino de lomo de res halal', 'Halal-Rinder-Peameal-Bacon', 'meat_mains', 'breakfast', 18, 2, 8, 'grilling', O, diasporaFor(O)),
  B('تارت الزبدة كندي', 'Canadian Butter Tart', 'Tarte au beurre canadienne', 'Tarta de mantequilla canadiense', 'Kanadische Buttertorte', 'rice_cakes_sweets', 'snack', 3, 45, 12, 'baking', O, diasporaFor(O)),
  B('حلوى نانايمو كندي', 'Nanaimo Bar', 'Barre de Nanaimo', 'Barra de Nanaimo', 'Nanaimo-Riegel', 'rice_cakes_sweets', 'snack', 4, 50, 22, 'chilling', BC, diasporaFor(BC)),
  B('أذان القندس كندي والقرفة', 'BeaverTails with Cinnamon', 'Queues de Castor à la cannelle', 'Colas de castor con canela', 'BeaverTails mit Zimt', 'street_snacks', 'snack', 5, 55, 10, 'frying', O, diasporaFor(O)),
  B('حساء البازلاء كندي الأصفر', 'Canadian Yellow Split Pea Soup', 'Soupe aux pois jaunes', 'Sopa de guisantes amarillos', 'Gelbe Erbsensuppe', 'soups_stews', 'lunch', 8, 20, 2, 'boiling', Q, diasporaFor(Q)),
  B('خبز بانوك كندي التقليدي', 'Traditional Canadian Bannock', 'Bannock traditionnel', 'Bannock tradicional', 'Traditionelles Bannock', 'breakfast_items', 'breakfast', 6, 40, 8, 'frying', I, diasporaFor(I)),
  B('كعك مونتريال كندي', 'Montreal-style Bagel', 'Bagel de Montréal', 'Bagel de Montreal', 'Bagel nach Montreal-Art', 'breakfast_items', 'breakfast', 10, 48, 2, 'baking', Q, diasporaFor(Q)),
  B('لحم مدخن مونتريال كندي (حلال)', 'Halal Montreal Smoked Meat', 'Viande fumée de Montréal halal', 'Carne ahumada de Montreal halal', 'Halal Montreal Smoked Meat', 'meat_mains', 'lunch', 22, 1, 14, 'smoking', Q, diasporaFor(Q)),
  B('سلمون مشوي كندي', 'Grilled Canadian Salmon', 'Saumon canadien grillé', 'Salmón canadiense a la parrilla', 'Gegrillter kanadischer Lachs', 'fish_seafood', 'dinner', 20, 0, 13, 'grilling', BC, diasporaFor(BC)),
  B('شراب القيقب كندي النقي', 'Pure Canadian Maple Syrup', 'Sirop d\'érable canadien pur', 'Jarabe de arce canadiense puro', 'Reiner kanadischer Ahornsirup', 'condiments_sauces', 'snack', 0, 67, 0, 'reduction', Q, diasporaFor(Q)),
  B('فطائر اليقطين كندي', 'Canadian Pumpkin Pie', 'Tarte au citrouille canadienne', 'Tarta de calabaza canadiense', 'Kanadischer Kürbiskuchen', 'rice_cakes_sweets', 'snack', 4, 35, 9, 'baking', O, diasporaFor(O)),
  B('شوربة المأكولات البحرية كندي', 'Canadian Seafood Chowder', 'Chaudrée de fruits de mer canadienne', 'Crema de mariscos canadiense', 'Kanadische Meeresfrüchtesuppe', 'soups_stews', 'dinner', 15, 12, 10, 'boiling', A, diasporaFor(A)),
  B('لحم ثور المسك كندي مشوي', 'Grilled Muskox Steak', 'Steak de bœuf musqué grillé', 'Filete de buey almizclero a la parrilla', 'Gegrilltes Moschusochsensteak', 'meat_mains', 'dinner', 25, 0, 5, 'grilling', N, diasporaFor(N)),
  B('توت ساسكاتون كندي طازج', 'Fresh Saskatoon Berries', 'Amélanches fraîches', 'Bayas de Saskatoon frescas', 'Frische Saskatoon-Beeren', 'fruit', 'snack', 1, 18, 0, 'raw', P, diasporaFor(P)),
  B('لفائف القرفة كندي', 'Canadian Cinnamon Rolls', 'Brioches à la cannelle canadiennes', 'Rollos de canela canadienses', 'Kanadische Zimtschnecken', 'breakfast_items', 'breakfast', 5, 45, 15, 'baking', P, diasporaFor(P)),
  B('سمك القد المقلي كندي', 'Fried Atlantic Cod', 'Morue de l\'Atlantique frite', 'Bacalao del Atlántico frito', 'Frittierter Atlantik-Kabeljau', 'fish_seafood', 'lunch', 18, 10, 12, 'frying', A, diasporaFor(A)),
  B('لحم الرنة كندي مشوي (حلال)', 'Halal Grilled Caribou', 'Caribou grillé halal', 'Caribú a la parrilla halal', 'Halal-Gegrilltes Karibu', 'meat_mains', 'dinner', 24, 0, 4, 'grilling', N, diasporaFor(N)),
  B('فطيرة التوت البري كندي', 'Canadian Wild Blueberry Pie', 'Tarte aux bleuets sauvages', 'Tarta de arándanos silvestres', 'Wildheidelbeerkuchen', 'rice_cakes_sweets', 'snack', 3, 40, 10, 'baking', A, diasporaFor(A)),
  B('دجاج مشوي على الطريقة الكندية', 'Canadian Style Roasted Chicken', 'Poulet rôti à la canadienne', 'Pollo asado al estilo canadiense', 'Gebratenes Hähnchen nach kanadischer Art', 'poultry_mains', 'dinner', 22, 0, 10, 'roasting', R, diasporaFor(R)),
  B('ستيك لحم بقري ألبرتا كندي', 'Alberta Beef Steak', 'Steak de bœuf de l\'Alberta', 'Filete de res de Alberta', 'Alberta-Rindersteak', 'meat_mains', 'dinner', 26, 0, 15, 'grilling', P, diasporaFor(P)),
  B('بطاطس مهروسة كندي بالثوم', 'Canadian Garlic Mashed Potatoes', 'Purée de pommes de terre à l\'ail', 'Puré de papas con ajo', 'Knoblauchkartoffelbrei', 'vegetable_mains', 'dinner', 2, 18, 5, 'boiling', R, diasporaFor(R)),
  B('ذرة مشوية كندي بالزبدة', 'Canadian Buttered Grilled Corn', 'Maïs grillé au beurre', 'Maíz a la parrilla con mantequilla', 'Gegrillter Mais mit Butter', 'vegetable_mains', 'snack', 3, 20, 4, 'grilling', O, diasporaFor(O)),
  B('فاصوليا مطبوخة كندي بالقيقب', 'Maple Baked Beans', 'Haricots blancs au suif de bœuf et au sirop d\'érable', 'Frijoles horneados con arce', 'Gebackene Bohnen mit Ahornsirup', 'vegetable_mains', 'breakfast', 6, 25, 2, 'stewing', Q, diasporaFor(Q)),
  B('أصابع السمك كندي المنزلية', 'Homemade Canadian Fish Sticks', 'Bâtonnets de poisson maison', 'Palitos de pescado caseros', 'Hausgemachte Fischstäbchen', 'fish_seafood', 'lunch', 15, 15, 8, 'frying', A, diasporaFor(A)),
  B('شوربة اليقطين كندي الكريمية', 'Creamy Canadian Pumpkin Soup', 'Soupe à la citrouille crémeuse', 'Sopa de calabaza cremosa', 'Cremige Kürbissuppe', 'soups_stews', 'dinner', 2, 12, 6, 'boiling', R, diasporaFor(R)),
  B('أومليت بالجبن كندي شيدر', 'Canadian Cheddar Omelette', 'Omelette au cheddar canadien', 'Tortilla de queso cheddar canadiense', 'Kanadisches Cheddar-Omelett', 'breakfast_items', 'breakfast', 13, 1, 15, 'frying', O, diasporaFor(O)),
  B('شطيرة لحم تركي كندي', 'Canadian Turkey Sandwich', 'Sandwich à la dinde canadien', 'Sándwich de pavo canadiense', 'Kanadisches Putensandwich', 'poultry_mains', 'lunch', 18, 25, 6, 'raw', R, diasporaFor(R)),
  B('سلطة البطاطس كندي التقليدية', 'Traditional Canadian Potato Salad', 'Salade de pommes de terre traditionnelle', 'Ensalada de papa tradicional', 'Traditioneller Kartoffelsalat', 'vegetable_mains', 'lunch', 2, 15, 10, 'boiling', R, diasporaFor(R)),
  B('فطائر البانكيك كندي بالقيقب', 'Canadian Maple Pancakes', 'Crêpes canadiennes au sirop d\'érable', 'Pancakes canadienses con arce', 'Kanadische Ahorn-Pfannkuchen', 'breakfast_items', 'breakfast', 6, 45, 8, 'frying', R, diasporaFor(R)),
  B('عصيدة الشوفان كندي بالحليب', 'Canadian Oatmeal with Milk', 'Gruau canadien au lait', 'Avena canadiense con leche', 'Kanadische Haferflocken mit Milch', 'breakfast_items', 'breakfast', 5, 25, 4, 'boiling', R, diasporaFor(R)),
  B('لحم بقري مشوي كندي (روست)', 'Canadian Roast Beef', 'Rôti de bœuf canadien', 'Rosbif canadiense', 'Kanadischer Rinderbraten', 'meat_mains', 'dinner', 24, 0, 12, 'roasting', R, diasporaFor(R)),
  B('شاي كندي مثلج بالليمون', 'Canadian Iced Tea with Lemon', 'Thé glacé canadien au citron', 'Té helado canadiense con limón', 'Kanadischer Eistee mit Zitrone', 'beverages', 'snack', 0, 8, 0, 'chilling', R, diasporaFor(R)),
  B('قهوة كندية دبل دبل', 'Canadian Double Double Coffee', 'Café Double Double canadien', 'Café doble doble canadiense', 'Kanadischer Double-Double-Kaffee', 'beverages', 'breakfast', 0, 10, 5, 'brewing', O, diasporaFor(O)),
  B('كعكة الجبن كندي بالتوت', 'Canadian Berry Cheesecake', 'Gâteau au fromage aux baies canadien', 'Pastel de queso con bayas canadiense', 'Kanadischer Beeren-Käsekuchen', 'rice_cakes_sweets', 'snack', 6, 35, 20, 'chilling', BC, diasporaFor(BC)),
  B('سمك السلمون المدخن كندي', 'Canadian Smoked Salmon', 'Saumon fumé canadien', 'Salmón ahumado canadiense', 'Kanadischer Räucherlachs', 'fish_seafood', 'breakfast', 18, 0, 10, 'smoking', BC, diasporaFor(BC)),
  B('جمبري بي سي كندي مسلوق', 'Boiled BC Spot Prawns', 'Crevettes tachetées de la C.-B. bouillies', 'Langostinos de BC hervidos', 'Gekochte BC-Spot-Prawns', 'fish_seafood', 'dinner', 20, 1, 2, 'boiling', BC, diasporaFor(BC)),
  B('أخطبوط مشوي كندي (فيكتوريا)', 'Victoria Grilled Octopus', 'Poulpe grillé de Victoria', 'Pulpo a la parrilla de Victoria', 'Gegrillter Victoria-Oktopus', 'fish_seafood', 'dinner', 18, 2, 4, 'grilling', BC, diasporaFor(BC)),
  B('توت بري كندي طازج', 'Fresh Canadian Cranberries', 'Canneberges canadiennes fraîches', 'Arándanos rojos canadienses frescos', 'Frische kanadische Preiselbeeren', 'fruit', 'snack', 0, 12, 0, 'raw', BC, diasporaFor(BC)),
  B('تفاح كندي ماكنتوش', 'Canadian McIntosh Apple', 'Pomme McIntosh canadienne', 'Manzana McIntosh canadiense', 'Kanadischer McIntosh-Apfel', 'fruit', 'snack', 0, 14, 0, 'raw', O, diasporaFor(O)),
  B('كمثرى كندي بارتليت', 'Canadian Bartlett Pear', 'Poire Bartlett canadienne', 'Pera Bartlett canadiense', 'Kanadische Bartlett-Birne', 'fruit', 'snack', 0, 15, 0, 'raw', BC, diasporaFor(BC)),
  B('خوخ كندي أوكاناغان', 'Okanagan Peaches', 'Pêches de l\'Okanagan', 'Duraznos de Okanagan', 'Okanagan-Pfirsiche', 'fruit', 'snack', 1, 10, 0, 'raw', BC, diasporaFor(BC)),
  B('عنب كندي مثلج (آيس واين)', 'Canadian Ice Grape', 'Raisin de glace canadien', 'Uva de hielo canadiense', 'Kanadische Eistraube', 'fruit', 'snack', 1, 18, 0, 'raw', O, diasporaFor(O)),
  B('حساء الفطر كندي البري', 'Canadian Wild Mushroom Soup', 'Soupe aux champignons sauvages', 'Sopa de champiñones silvestres', 'Wildpilzsuppe', 'soups_stews', 'lunch', 3, 10, 7, 'boiling', BC, diasporaFor(BC)),
  B('سلطة الكرنب كندي (كول سلو)', 'Canadian Coleslaw', 'Salade de chou canadienne', 'Ensalada de col canadiense', 'Kanadischer Krautsalat', 'vegetable_mains', 'snack', 1, 12, 8, 'raw', R, diasporaFor(R)),
  B('بطاطس مقلية كندي مقرمشة', 'Crispy Canadian Fries', 'Frites canadiennes croustillantes', 'Papas fritas canadienses crujientes', 'Knusprige kanadische Pommes', 'street_snacks', 'snack', 3, 35, 15, 'frying', R, diasporaFor(R)),
  B('حلقات البصل كندي المقلية', 'Canadian Fried Onion Rings', 'Rondelles d\'oignon frites', 'Aros de cebolla fritos', 'Frittierte Zwiebelringe', 'street_snacks', 'snack', 2, 25, 12, 'frying', R, diasporaFor(R)),
  B('بيتزا كندية بالخضار (حلال)', 'Halal Canadian Veggie Pizza', 'Pizza végétarienne canadienne halal', 'Pizza vegetariana canadiense halal', 'Halal-Kanadische Veggie-Pizza', 'street_snacks', 'lunch', 10, 30, 10, 'baking', O, diasporaFor(O)),
  B('فطيرة التفاح كندي الكلاسيكية', 'Classic Canadian Apple Pie', 'Tarte aux pommes canadienne classique', 'Tarta de manzana canadiense clásica', 'Klassischer kanadischer Apfelkuchen', 'rice_cakes_sweets', 'snack', 2, 40, 15, 'baking', O, diasporaFor(O)),
];
