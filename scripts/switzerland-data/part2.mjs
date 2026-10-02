import { B, diasporaFor } from '../switzerland-base-data/rows.mjs';

const GVA = 'geneva';
const LUZ = 'lucerne';
const BSL = 'basel';
const LSN = 'lausanne';
const TCN = 'ticino';
const VAL = 'valais';

export default [
  B('سلطة اللحم البقر بالجرجير', 'Beef Salad with Rocket', 'Salade de boeuf a la roquette', 'Ensalada de res con rucula', 'Rindfleisch-Salat mit Rucola', 'meat_mains', 'lunch', 18, 6, 11, 'tossing', GVA, diasporaFor(GVA)),

  B('كعك البصل', 'Onion Cake', 'Gateau aux oignons', 'Bizcocho de cebolla', 'Zwiebelkuchen', 'rice_cakes_sweets', 'snack', 5, 30, 11, 'baking', LUZ, diasporaFor(LUZ)),
  B('كرواسون اللوز', 'Almond Croissant', 'Croissant aux amandes', 'Croissant de almendra', 'Mandel-Croissant', 'breakfast_items', 'breakfast', 6, 28, 12, 'baking', LUZ, diasporaFor(LUZ)),
  B('بسكويت الأرز', 'Rice Biscuit', 'Biscuit au riz', 'Bizcocho de arroz', 'Reisbiscuit', 'rice_cakes_sweets', 'snack', 4, 27, 8, 'baking', LUZ, diasporaFor(LUZ)),
  B('خبز السمسم', 'Sesame Bread', 'Pain au sesame', 'Pan de sesamo', 'Sesambrot', 'breakfast_items', 'snack', 7, 25, 8, 'baking', LUZ, diasporaFor(LUZ)),
  B('كعك الزنجبيل', 'Ginger Cake', 'Gateau au gingembre', 'Bizcocho de jengibre', 'Ingwerkuchen', 'rice_cakes_sweets', 'snack', 4, 29, 10, 'baking', LUZ, diasporaFor(LUZ)),
  B('فيليه السمك النهري', 'Perch Fillet', 'Filet de perche', 'Filete de perca', 'Barschfilet', 'fish_seafood', 'dinner', 20, 1, 8, 'grilling', LUZ, diasporaFor(LUZ)),
  B('قرص الباذنجان بالطماطم', 'Aubergine Patty with Tomato', 'Galette d aubergine a la tomate', 'Tortita de berenjena con tomate', 'Auberginen-Laibchen mit Tomate', 'vegetable_mains', 'lunch', 4, 19, 8, 'frying', LUZ, diasporaFor(LUZ)),
  B('قرص الشعير بالجزر', 'Barley Patty with Carrot', 'Galette d orge aux carottes', 'Tortita de cebada con zanahoria', 'Gersten-Laibchen mit Karotten', 'vegetable_mains', 'lunch', 5, 20, 7, 'frying', LUZ, diasporaFor(LUZ)),
  B('كاكاو ساخن بالحليب', 'Hot Cocoa with Milk', 'Chocolat chaud au lait', 'Chocolate caliente con leche', 'Heisse Schokolade mit Milch', 'beverages', 'snack', 4, 14, 5, 'brewing', LUZ, diasporaFor(LUZ)),

  B('شوربة الشعير بالجزر', 'Barley and Carrot Soup', 'Soupe d orge aux carottes', 'Sopa de cebada con zanahoria', 'Gerstensuppe mit Karotten', 'soups_stews', 'lunch', 5, 18, 3, 'simmering', BSL, diasporaFor(BSL)),
  B('شوربة الليمون المخملية', 'Velvety Lemon Soup', 'Veloute au citron', 'Crema de limon', 'Zitronen-Suppe', 'soups_stews', 'lunch', 2, 11, 4, 'simmering', BSL, diasporaFor(BSL)),
  B('شوربة الهليون', 'Leek Soup', 'Veloute de poireaux', 'Crema de puerro', 'Lauchsuppe', 'soups_stews', 'lunch', 2, 10, 4, 'simmering', BSL, diasporaFor(BSL)),
  B('أومليت بالأعشاب', 'Herb Omelette', 'Omelette aux herbes', 'Omelette con hierbas', 'Kraeuteromelette', 'breakfast_items', 'breakfast', 9, 2, 12, 'frying', BSL, diasporaFor(BSL)),
  B('هليون بزيت الزيتون', 'Asparagus with Olive Oil', 'Asperges a l huile d olive', 'Espárragos con aceite de oliva', 'Spargel mit Olivenoel', 'vegetable_mains', 'lunch', 3, 6, 7, 'steaming', BSL, diasporaFor(BSL)),
  B('روبيان مشوي', 'Grilled Prawns', 'Crevettes grillees', 'Langostinos a la plancha', 'Gegrillte Gambas', 'fish_seafood', 'dinner', 20, 2, 8, 'grilling', BSL, diasporaFor(BSL)),
  B('تيراميسو بالقهوة', 'Coffee Tiramisu', 'Tiramisu au cafe', 'Tiramisu con cafe', 'Tiramisu mit Kaffee', 'rice_cakes_sweets', 'snack', 5, 26, 12, 'assembling', BSL, diasporaFor(BSL)),
  B('شوربة القرنبيط', 'Cauliflower Soup', 'Veloute de chou-fleur', 'Crema de coliflor', 'Blumenkohlsuppe', 'soups_stews', 'lunch', 3, 12, 4, 'simmering', BSL, diasporaFor(BSL)),
  B('فطيرة السبانخ', 'Spinach Pie', 'Tourte aux epinards', 'Pastel de espinacas', 'Spinat-Pastete', 'vegetable_mains', 'dinner', 6, 21, 11, 'baking', BSL, diasporaFor(BSL)),

  B('تارت الجبن', 'Cheese Tart', 'Tarte au fromage', 'Tarta de queso', 'Kaese-Tarte', 'rice_cakes_sweets', 'snack', 6, 26, 15, 'baking', LSN, diasporaFor(LSN)),
  B('موس الشوكولاتة', 'Chocolate Mousse', 'Mousse au chocolat', 'Mousse de chocolate', 'Schokoladenmousse', 'rice_cakes_sweets', 'snack', 4, 24, 14, 'assembling', LSN, diasporaFor(LSN)),
  B('بولينتا بصلصة الطماطم', 'Polenta with Tomato Sauce', 'Polenta a la sauce tomate', 'Polenta con salsa de tomate', 'Polenta mit Tomatensauce', 'vegetable_mains', 'dinner', 5, 26, 8, 'simmering', LSN, diasporaFor(LSN)),
  B('بارميزان الباذنجان', 'Aubergine Parmigiana', 'Aubergines gratinees a la parmesane', 'Berenjena a la parmesana', 'Parmesan-Auberginen', 'vegetable_mains', 'dinner', 6, 22, 13, 'baking', LSN, diasporaFor(LSN)),
  B('أقراص الخرشوف بالجبن', 'Artichoke Fritters with Cheese', 'Beignets d artichaut au fromage', 'Tortitas de alcachofa con queso', 'Artischocken-Laibchen mit Kaese', 'street_snacks', 'snack', 5, 17, 11, 'frying', LSN, diasporaFor(LSN)),
  B('تارتار لحم البقر', 'Beef Tartare', 'Tartare de boeuf', 'Tartar de res', 'Rindertatar', 'meat_mains', 'dinner', 21, 2, 11, 'assembling', LSN, diasporaFor(LSN)),
  B('سمك بالبطاطس', 'Fish with Potatoes', 'Poisson avec pommes de terre', 'Pescado con patatas', 'Fisch mit Kartoffeln', 'fish_seafood', 'dinner', 17, 14, 8, 'poaching', LSN, diasporaFor(LSN)),
  B('سلطة الأرز بالليمون', 'Rice Salad with Lemon', 'Salade de riz au citron', 'Ensalada de arroz con limon', 'Reissalat mit Zitrone', 'rice_dishes', 'lunch', 5, 24, 6, 'tossing', LSN, diasporaFor(LSN)),
  B('كعكة إسفنجية بالبرتقال', 'Orange Sponge Cake', 'Gateau sponge a l orange', 'Bizcocho esponjoso de naranja', 'Orangen-Biskuitkuchen', 'rice_cakes_sweets', 'snack', 4, 30, 10, 'baking', LSN, diasporaFor(LSN)),

  B('سلطة الفارو بزيت الزيتون', 'Farro Salad with Olive Oil', 'Salade de farro a l huile d olive', 'Ensalada de espelta con aceite de oliva', 'Dinkel-Salat mit Olivenoel', 'vegetable_mains', 'lunch', 7, 19, 8, 'tossing', TCN, diasporaFor(TCN)),
  B('معكرونة بالبستو', 'Pasta with Pesto', 'Pates au pesto', 'Pasta al pesto', 'Pasta mit Pesto', 'noodle_dishes', 'lunch', 9, 26, 11, 'simmering', TCN, diasporaFor(TCN)),
  B('نيوكي البطاطس', 'Potato Gnocchi', 'Gnocchi de pommes de terre', 'Gnocchi de papa', 'Kartoffel-Gnocchi', 'noodle_dishes', 'dinner', 6, 28, 6, 'boiling', TCN, diasporaFor(TCN)),
  B('أرانسيني بصلصة الطماطم', 'Arancini with Tomato Sauce', 'Arancini a la sauce tomate', 'Arancini con salsa de tomate', 'Arancini mit Tomatensauce', 'street_snacks', 'lunch', 8, 24, 9, 'frying', TCN, diasporaFor(TCN)),
  B('بروشيتا بالطماطم', 'Tomato Bruschetta', 'Bruschetta aux tomates', 'Bruschetta de tomate', 'Tomaten-Bruschetta', 'street_snacks', 'snack', 4, 18, 7, 'baking', TCN, diasporaFor(TCN)),
  B('معكرونة مخبوزة', 'Baked Pasta', 'Pates au four', 'Pasta al horno', 'Ueberbackene Pasta', 'noodle_dishes', 'dinner', 11, 27, 12, 'baking', TCN, diasporaFor(TCN)),
  B('سلطة الفواكه بالقشطة', 'Fruit Salad with Cream', 'Salade de fruits a la creme', 'Ensalada de frutas con nata', 'Obstsalat mit Rahm', 'fruit', 'snack', 2, 18, 6, 'assembling', TCN, diasporaFor(TCN)),
  B('جيلاتو بالشوكولاتة', 'Stracciatella Gelato', 'Glace stracciatella', 'Helado stracciatella', 'Stracciatella-Eis', 'rice_cakes_sweets', 'snack', 4, 20, 13, 'assembling', TCN, diasporaFor(TCN)),

  B('روستي بالبيض', 'Rosti with Egg', 'Rossti a l oeuf', 'Rosti con huevo', 'Roesti mit Ei', 'breakfast_items', 'breakfast', 8, 22, 10, 'frying', VAL, diasporaFor(VAL)),
  B('سجق البقر المشوي', 'Grilled Beef Bratwurst', 'Saucisse de boeuf grillee', 'Salchicha de res a la plancha', 'Rinder-Bratwurst vom Grill', 'street_snacks', 'lunch', 16, 4, 14, 'grilling', VAL, diasporaFor(VAL)),
  B('شرائح سيرفلات البقر', 'Beef Cervelat Slices', 'Cervelat de boeuf en tranches', 'Cervelat de res en lonchas', 'Rinder-Cervelat-Scheiben', 'street_snacks', 'snack', 17, 2, 15, 'slicing', VAL, diasporaFor(VAL)),
  B('بطاطس حلوة مشوية', 'Roasted Sweet Potato', 'Patate douce rostie', 'Patata dulce asada', 'Suesste-Kartoffel geroestet', 'vegetable_mains', 'lunch', 3, 24, 6, 'roasting', VAL, diasporaFor(VAL)),
  B('كوسا محشية بالأرز', 'Stuffed Zucchini with Rice', 'Courgettes farcies au riz', 'Calabacines rellenas de arroz', 'Gefuellte Zucchini mit Reis', 'vegetable_mains', 'dinner', 6, 22, 9, 'baking', VAL, diasporaFor(VAL)),
  B('حمص بالطحينة', 'Hummus with Tahini', 'Houmous au tahini', 'Hummus con tahini', 'Hummus mit Tahini', 'condiments_sauces', 'snack', 5, 10, 11, 'assembling', VAL, diasporaFor(VAL)),
];