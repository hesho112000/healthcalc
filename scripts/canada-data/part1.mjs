import { B, diasporaFor } from '../canada-base-data/rows.mjs';

const R = 'pan_canadian';
const Q = 'quebec';
const O = 'ontario';
const BC = 'british_columbia';
const P = 'prairies';
const A = 'atlantic_canada';
const N = 'northern_canada';
const I = 'indigenous_canada';

export default [
  B('لحم ثور كندي مشوي', 'Roasted Canadian Bison', 'Bison canadien rôti', 'Bisonte canadiense asado', 'Gebratener kanadischer Bison', 'meat_mains', 'dinner', 25, 0, 3, 'roasting', P, diasporaFor(P)),
  B('برجر بيسون كندي (حلال)', 'Halal Canadian Bison Burger', 'Burger au bison canadien halal', 'Hamburguesa de bisonte canadiense halal', 'Halal-Bison-Burger', 'meat_mains', 'lunch', 22, 25, 10, 'grilling', P, diasporaFor(P)),
  B('سلمون كندي بصلصة القيقب', 'Maple Glazed Canadian Salmon', 'Saumon à l\'érable canadien', 'Salmón glaseado con arce', 'Lachs mit Ahornglasur', 'fish_seafood', 'dinner', 20, 10, 12, 'baking', BC, diasporaFor(BC)),
  B('فطيرة الدجاج كندي (بوت باي)', 'Canadian Chicken Pot Pie', 'Pâté au poulet canadien', 'Pastel de pollo canadiense', 'Hühnerpastete', 'poultry_mains', 'dinner', 12, 25, 15, 'baking', R, diasporaFor(R)),
  B('حساء الفاصوليا كندي الأبيض', 'Canadian White Bean Soup', 'Soupe aux haricots blancs', 'Sopa de frijoles blancos', 'Weiße Bohnensuppe', 'soups_stews', 'lunch', 7, 18, 2, 'boiling', R, diasporaFor(R)),
  B('شطيرة لحم تركي مدخن كندي', 'Smoked Turkey Sandwich', 'Sandwich à la dinde fumée', 'Sándwich de pavo ahumado', 'Geräuchertes Putensandwich', 'poultry_mains', 'lunch', 18, 28, 5, 'raw', R, diasporaFor(R)),
  B('سلطة الذرة كندي واللوبيا', 'Canadian Corn and Bean Salad', 'Salade de maïs et haricots', 'Ensalada de maíz y frijol', 'Mais-Bohnen-Salat', 'vegetable_mains', 'lunch', 4, 15, 6, 'mixing', R, diasporaFor(R)),
  B('بطاطس كندية مشوية بالأعشاب', 'Herb Roasted Canadian Potatoes', 'Pommes de terre rôties aux herbes', 'Papas asadas con hierbas', 'Kräuterkartoffeln', 'vegetable_mains', 'dinner', 2, 18, 5, 'roasting', R, diasporaFor(R)),
  B('كعكة الشوكولاتة كندي بالقيقب', 'Canadian Maple Chocolate Cake', 'Gâteau au chocolat et à l\'érable', 'Pastel de chocolate y arce', 'Ahorn-Schokoladenkuchen', 'rice_cakes_sweets', 'snack', 4, 45, 18, 'baking', Q, diasporaFor(Q)),
  B('بسكويت القيقب كندي الكريمي', 'Maple Cream Cookies', 'Biscuits à la crème d\'érable', 'Galletas de crema de arce', 'Ahorncreme-Kekse', 'rice_cakes_sweets', 'snack', 3, 65, 22, 'baking', Q, diasporaFor(Q)),
  B('شاي كندي بالأعشاب البرية', 'Wild Canadian Herbal Tea', 'Thé aux herbes sauvages', 'Té de hierbas silvestres', 'Wildkräutertee', 'beverages', 'snack', 0, 0, 0, 'brewing', I, diasporaFor(I)),
  B('عصير التوت البري كندي المر', 'Tart Canadian Cranberry Juice', 'Jus de canneberge acide', 'Jugo de arándano agrio', 'Herber Preiselbeersaft', 'beverages', 'snack', 0, 10, 0, 'pressing', A, diasporaFor(A)),
  B('شطيرة بيض كندية (حلال)', 'Halal Canadian Egg Sandwich', 'Sandwich aux œufs canadien', 'Sándwich de huevo canadiense', 'Kanadisches Eiersandwich', 'breakfast_items', 'breakfast', 12, 25, 10, 'mixing', R, diasporaFor(R)),
  B('شوفان كندي بالتفاح والقرفة', 'Apple Cinnamon Oatmeal', 'Gruau pomme et cannelle', 'Avena con manzana y canela', 'Apfel-Zimt-Haferflocken', 'breakfast_items', 'breakfast', 5, 30, 4, 'boiling', R, diasporaFor(R)),
  B('بانكيك كندي بالتوت الأزرق', 'Blueberry Pancakes', 'Crêpes aux bleuets', 'Pancakes de arándanos', 'Heidelbeer-Pfannkuchen', 'breakfast_items', 'breakfast', 6, 40, 8, 'frying', R, diasporaFor(R)),
  B('لبن كندي طازج', 'Fresh Canadian Milk', 'Lait canadien frais', 'Leche canadiense fresca', 'Frische kanadische Milch', 'beverages', 'breakfast', 3, 5, 3, 'raw', O, diasporaFor(O)),
  B('جبنة شيدر كندية معتقة', 'Aged Canadian Cheddar', 'Cheddar canadien vieilli', 'Queso cheddar añejo', 'Gereifter kanadischer Cheddar', 'condiments_sauces', 'snack', 25, 1, 33, 'aging', O, diasporaFor(O)),
  B('تفاح كندي مخبوز بالقرفة', 'Baked Apples with Cinnamon', 'Pommes au four à la cannelle', 'Manzanas al horno con canela', 'Bratäpfel mit Zimt', 'fruit', 'snack', 0, 20, 2, 'baking', O, diasporaFor(O)),
  B('مربى التوت كندي البري', 'Wild Berry Jam', 'Confiture de baies sauvages', 'Mermelada de bayas silvestres', 'Wildbeerenmarmelade', 'condiments_sauces', 'breakfast', 0, 55, 0, 'boiling', BC, diasporaFor(BC)),
  B('عسل القيقب كندي الصافي', 'Pure Canadian Maple Honey', 'Miel d\'érable pur', 'Miel de arce pura', 'Reiner Ahornhonig', 'condiments_sauces', 'breakfast', 0, 82, 0, 'collection', Q, diasporaFor(Q)),
  B('يخنة دجاج كندية منزلية', 'Homemade Canadian Chicken Stew', 'Ragoût de poulet maison', 'Estofado de pollo casero', 'Hausgemachter Hühnereintopf', 'soups_stews', 'dinner', 15, 10, 8, 'stewing', R, diasporaFor(R)),
  B('لحم بقري كندي بالبصل', 'Canadian Beef with Onions', 'Bœuf aux oignons canadien', 'Res con cebolla canadiense', 'Rindfleisch mit Zwiebeln', 'meat_mains', 'dinner', 20, 5, 12, 'stir_frying', R, diasporaFor(R)),
  B('ستيك سمك القد كندي', 'Atlantic Cod Steak', 'Steak de morue de l\'Atlantique', 'Filete de bacalao del Atlántico', 'Kabeljau-Steak', 'fish_seafood', 'dinner', 18, 0, 1, 'grilling', A, diasporaFor(A)),
  B('روبيان كندي بالثوم والليمون', 'Garlic Lemon Shrimp', 'Crevettes à l\'ail et au citron', 'Camarones al ajo y limón', 'Knoblauch-Zitronen-Garnelen', 'fish_seafood', 'dinner', 20, 2, 8, 'stir_frying', BC, diasporaFor(BC)),
  B('سلطة خضراء كندية مشكلة', 'Mixed Canadian Green Salad', 'Salade verte composée', 'Ensalada verde mixta', 'Gemischter grüner Salat', 'vegetable_mains', 'lunch', 1, 3, 5, 'mixing', R, diasporaFor(R)),
  B('سبانخ كندية مطهوة بالبخار', 'Steamed Canadian Spinach', 'Épinards à la vapeur', 'Espinacas al vapor', 'Gedämpfter Spinat', 'vegetable_mains', 'dinner', 3, 4, 0, 'steaming', R, diasporaFor(R)),
  B('قرنبيط كندي مشوي', 'Roasted Canadian Cauliflower', 'Chou-fleur rôti', 'Coliflor asada', 'Gerösteter Blumenkohl', 'vegetable_mains', 'dinner', 2, 5, 4, 'roasting', R, diasporaFor(R)),
  B('كوسا كندية مشوية', 'Grilled Canadian Zucchini', 'Courgettes grillées', 'Calabacín a la parrilla', 'Gegrillte Zucchini', 'vegetable_mains', 'dinner', 1, 3, 2, 'grilling', O, diasporaFor(O)),
  B('باذنجان كندي مخبوز', 'Baked Canadian Eggplant', 'Aubergines au four', 'Berenjena al horno', 'Gebackene Aubergine', 'vegetable_mains', 'dinner', 1, 6, 3, 'baking', O, diasporaFor(O)),
  B('فلفل كندي حلو طازج', 'Fresh Canadian Bell Peppers', 'Poivrons frais', 'Pimientos frescos', 'Frische Paprika', 'fruit', 'snack', 1, 6, 0, 'raw', O, diasporaFor(O)),
  B('خيار كندي طازج', 'Fresh Canadian Cucumber', 'Concombre frais', 'Pepino fresco', 'Frische Gurke', 'fruit', 'snack', 1, 3, 0, 'raw', O, diasporaFor(O)),
  B('طماطم كندية حمراء', 'Red Canadian Tomatoes', 'Tomates rouges canadiennes', 'Tomates rojos canadienses', 'Rote kanadische Tomaten', 'fruit', 'snack', 1, 4, 0, 'raw', O, diasporaFor(O)),
  B('بصل كندي أصفر', 'Yellow Canadian Onion', 'Oignon jaune canadien', 'Cebolla amarilla canadiense', 'Gelbe kanadische Zwiebel', 'vegetable_mains', 'dinner', 1, 9, 0, 'raw', R, diasporaFor(R)),
  B('ثوم كندي طازج', 'Fresh Canadian Garlic', 'Ail frais canadien', 'Ajo fresco canadiense', 'Frischer kanadischer Knoblauch', 'condiments_sauces', 'snack', 6, 33, 0, 'raw', O, diasporaFor(O)),
  B('زنجبيل كندي طازج', 'Fresh Canadian Ginger', 'Gingembre frais canadien', 'Jengibre fresco canadiense', 'Frischer kanadischer Ingwer', 'condiments_sauces', 'snack', 2, 18, 1, 'raw', BC, diasporaFor(BC)),
  B('مشروم كندي أبيض', 'White Canadian Mushrooms', 'Champignons blancs', 'Champiñones blancos', 'Weiße Champignons', 'vegetable_mains', 'dinner', 3, 3, 0, 'raw', O, diasporaFor(O)),
  B('بروكلي كندي مطهو بالبخار', 'Steamed Canadian Broccoli', 'Brocoli à la vapeur', 'Brócoli al vapor', 'Gedämpfter Brokkoli', 'vegetable_mains', 'dinner', 3, 7, 0, 'steaming', R, diasporaFor(R)),
  B('فاصوليا كندية خضراء رفيعة', 'Thin Green Beans', 'Haricots verts fins', 'Ejotes finos', 'Feine grüne Bohnen', 'vegetable_mains', 'dinner', 2, 7, 0, 'boiling', R, diasporaFor(R)),
  B('هليون كندي مشوي', 'Grilled Canadian Asparagus', 'Asperges grillées', 'Espárragos a la parrilla', 'Gegrillter Spargel', 'vegetable_mains', 'dinner', 2, 4, 2, 'grilling', O, diasporaFor(O)),
  B('كرنب سلق كندي مطبوخ', 'Cooked Canadian Kale', 'Chou frisé cuit', 'Col rizada cocida', 'Gekochter Grünkohl', 'vegetable_mains', 'dinner', 3, 9, 1, 'boiling', R, diasporaFor(R)),
  B('عدس كندي أحمر مطبوخ', 'Cooked Red Lentils', 'Lentilles rouges cuites', 'Lentejas rojas cocidas', 'Gekochte rote Linsen', 'vegetable_mains', 'dinner', 9, 20, 1, 'boiling', P, diasporaFor(P)),
  B('حمص كندي مسلوق', 'Boiled Canadian Chickpeas', 'Pois chiches bouillis', 'Garbanzos hervidos', 'Gekochte Kichererbsen', 'vegetable_mains', 'dinner', 9, 27, 3, 'boiling', P, diasporaFor(P)),
  B('فاصوليا كندية حمراء', 'Kidney Beans', 'Haricots rouges', 'Frijoles rojos', 'Wachtelbohnen', 'vegetable_mains', 'dinner', 9, 23, 1, 'boiling', P, diasporaFor(P)),
  B('توفو كندي صلب', 'Firm Canadian Tofu', 'Tofu ferme canadien', 'Tofu firme canadiense', 'Fester kanadischer Tofu', 'vegetable_mains', 'dinner', 8, 2, 5, 'raw', BC, diasporaFor(BC)),
  B('حليب الصويا كندي', 'Canadian Soy Milk', 'Lait de soja canadien', 'Leche de soya canadiense', 'Kanadische Sojamilch', 'beverages', 'breakfast', 3, 2, 2, 'mixing', R, diasporaFor(R)),
  B('حليب اللوز كندي', 'Canadian Almond Milk', 'Lait d\'amande canadien', 'Leche de almendras canadiense', 'Kanadische Mandelmilch', 'beverages', 'breakfast', 1, 1, 1, 'mixing', R, diasporaFor(R)),
  B('شوفان كندي سريع التحضير', 'Instant Canadian Oats', 'Avoine instantanée', 'Avena instantánea', 'Instant-Haferflocken', 'breakfast_items', 'breakfast', 13, 68, 7, 'boiling', R, diasporaFor(R)),
  B('بذور الكتان كندية مطحونة', 'Ground Canadian Flaxseed', 'Graines de lin moulues', 'Semillas de lino molidas', 'Gemahlene Leinsamen', 'condiments_sauces', 'snack', 18, 29, 42, 'grinding', P, diasporaFor(P)),
  B('بذور الشيا كندية', 'Canadian Chia Seeds', 'Graines de chia canadiennes', 'Semillas de chía canadienses', 'Kanadische Chiasamen', 'condiments_sauces', 'snack', 17, 42, 31, 'raw', R, diasporaFor(R)),
  B('بذور اليقطين كندية محمصة', 'Roasted Pumpkin Seeds', 'Graines de citrouille rôties', 'Semillas de calabaza tostadas', 'Geröstete Kürbiskerne', 'condiments_sauces', 'snack', 30, 11, 49, 'roasting', R, diasporaFor(R)),
];
