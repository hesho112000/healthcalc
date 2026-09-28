// Thai expansion part 3 of 5: poultry_mains (18) + meat_mains (18) = 36 rows.
// Halal note: the classic Northern/Isan sausages and grilled meats are pork-based
// (sai ua, sai krok, mok pa, nam tok, laab, jaeng), so they are authored as
// chicken/beef versions rather than dropped.
import { R, T } from './rows.mjs';

export default [
  // --- poultry_mains (18) ---
  R(`ساي أور بالدجاج ${T}`, 'Sai ua chicken sausage', 'Saucisse de poulet sai ua', 'Salchicha de pollo sai ua', 'Huhnwurst Sai Ua', 'poultry_mains', 'dinner', 'chiang_mai', 20, 4, 14),
  R(`ساي كروك بالدجاج ${T}`, 'Sai krok chicken', 'Sai krok au poulet', 'Sai krok con pollo', 'Sai Krok mit Huhn', 'poultry_mains', 'dinner', 'chiang_mai', 18, 24, 8),
  R(`موك با بالدجاج ${T}`, 'Mok pa chicken', 'Mok pa au poulet', 'Mok pa con pollo', 'Mok Pa mit Huhn', 'poultry_mains', 'dinner', 'isan', 25, 3, 14),
  R(`ساي أور بالأرز اللزج ${T}`, 'Sai ua with sticky rice', 'Sai ua avec riz gluant', 'Sai ua con arroz pegajoso', 'Sai Ua mit klebrigem Reis', 'poultry_mains', 'dinner', 'chiang_mai', 16, 22, 10),
  R(`صدر دجاج بصلصة البانانغ ${T}`, 'Panang chicken breast', 'Blanc de poulet panang', 'Pechuga de pollo panang', 'Hähnchenbrust panang', 'poultry_mains', 'dinner', 'pan_thai', 22, 8, 12),
  R(`دجاج مقلي بالزعتر والليمون ${T}`, 'Fried chicken with lemongrass', 'Poulet frit au citronnelle', 'Pollo frito con citronela', 'Frittiertes Huhn mit Zitronengras', 'poultry_mains', 'dinner', 'pan_thai', 22, 5, 14),
  R(`دجاج مقلي بالزبدة ${T}`, 'Butter fried chicken', 'Poulet frit au beurre', 'Pollo frito con mantequilla', 'Butter-Huhn', 'poultry_mains', 'dinner', 'pan_thai', 23, 4, 15),
  R(`دجاج مقلي بالبهارات ${T}`, 'Spiced fried chicken', 'Poulet frit aux épices', 'Pollo frito con especias', 'Gewürztes frittiertes Huhn', 'poultry_mains', 'dinner', 'pan_thai', 23, 6, 14),
  R(`دجاج في الفرن ${T}`, 'Oven-baked chicken', 'Poulet au four', 'Pollo al horno', 'Ofenhuhn', 'poultry_mains', 'dinner', 'pan_thai', 24, 2, 13),
  R(`دجاج مقلي بالليمون ${T}`, 'Lemon fried chicken', 'Poulet frit au citron', 'Pollo frito con limón', 'Zitronen-Huhn', 'poultry_mains', 'dinner', 'hua_hin', 22, 5, 13),
  R(`دجاج بالتمر الهندي ${T}`, 'Chicken with tamarind', 'Poulet au tamarin', 'Pollo con tamarindo', 'Huhn mit Tamarinde', 'poultry_mains', 'dinner', 'pan_thai', 22, 9, 9),
  R(`دجاج بالسماق والليمون ${T}`, 'Chicken with sumac', 'Poulet au sumac', 'Pollo con zumaque', 'Huhn mit Sumak', 'poultry_mains', 'dinner', 'pan_thai', 24, 3, 12),
  R(`دجاج مشوي بالزعفران ${T}`, 'Saffron grilled chicken', 'Poulet grillé au safran', 'Pollo a la parrilla con azafrán', 'Safran-Huhn vom Grill', 'poultry_mains', 'dinner', 'pan_thai', 24, 2, 13),
  R(`دجاج بصلصة الفول السوداني ${T}`, 'Chicken peanut sauce', 'Poulet à la sauce cacahuète', 'Pollo con salsa de cacahuete', 'Huhn mit Erdnusssauce', 'poultry_mains', 'dinner', 'pan_thai', 22, 8, 14),
  R(`دجاج مقلي للغمس ${T}`, 'Dipping fried chicken', 'Poulet frit pour tremper', 'Pollo frito para mojar', 'Tauchhuhn frittiert', 'poultry_mains', 'dinner', 'bangkok', 24, 3, 15),
  R(`صدر دجاج بماسمان ${T}`, 'Massaman chicken breast', 'Blanc de poulet au massaman', 'Pechuga de pollo al massaman', 'Hähnchenbrust im Massaman', 'poultry_mains', 'dinner', 'pattaya', 23, 11, 13),
  R(`دجاج مقلي بالثوم والفلفل ${T}`, 'Chicken fried garlic pepper', 'Poulet frit ail poivre', 'Pollo frito con ajo y pimienta', 'Knoblauch-Pfeffer-Huhn', 'poultry_mains', 'dinner', 'pan_thai', 23, 4, 14),
  R(`دجاج مشوي على الفحم بالثوم ${T}`, 'Charcoal grilled garlic chicken', 'Poulet grillé au charbon et ail', 'Pollo a la parrilla con ajo', 'Huhn vom Kohlegrill mit Knoblauch', 'poultry_mains', 'dinner', 'pan_thai', 25, 1, 14),

  // --- meat_mains (18) ---
  R(`موك با باللحم ${T}`, 'Beef mok pa', 'Mok pa au boeuf', 'Mok pa de ternera', 'Mok Pa mit Rindfleisch', 'meat_mains', 'dinner', 'isan', 24, 3, 13),
  R(`لاب كوا باللحم ${T}`, 'Larb kua beef', 'Larb kua au boeuf', 'Larb kua de ternera', 'Larb Kua mit Rindfleisch', 'meat_mains', 'dinner', 'chiang_mai', 24, 4, 13),
  R(`نام جيم جاو باللحم ${T}`, 'Nam jim jaeu beef dip', 'Nam jim jaeu au boeuf', 'Nam jim jaeu de ternera', 'Nam Jim Jaeu mit Rindfleisch', 'meat_mains', 'dinner', 'isan', 20, 4, 12),
  R(`لارب اللحم بالأعشاب ${T}`, 'Spiced beef larb with herbs', 'Larb de boeuf aux herbes', 'Larb de ternera con hierbas', 'Rindfleisch-Larb mit Kräutern', 'meat_mains', 'dinner', 'isan', 24, 3, 13),
  R(`دجاج موكاتا ${T}`, 'Chicken mookata', 'Poulet mookata', 'Pollo mookata', 'Huhn-Mookata', 'meat_mains', 'dinner', 'pattaya', 20, 6, 12),
  R(`شرائح لحم مقرمشة ${T}`, 'Crispy beef slices', 'Boeuf croustillant en tranches', 'Ternera crujiente en filetes', 'Knusprige Rindfleischscheiben', 'meat_mains', 'dinner', 'pan_thai', 26, 3, 16),
  R(`لحم مقرمش بالصلصة الحلوة ${T}`, 'Crispy beef with sweet sauce', 'Boeuf croustillant à la sauce sucrée', 'Ternera crujiente con salsa dulce', 'Knuspriges Rindfleisch mit süßer Soße', 'meat_mains', 'dinner', 'bangkok', 24, 9, 14),
  R(`ريب آي مشوي ${T}`, 'Stir-fried beef ribeye', 'Entrecote saisie', 'Entreceto salteado', 'Rinder-Ribeye gebraten', 'meat_mains', 'dinner', 'pattaya', 25, 2, 16),
  R(`كاري اللحم الأحمر ${T}`, 'Red beef curry', 'Curry rouge au boeuf', 'Curry rojo de ternera', 'Rotes Rindfleischcurry', 'meat_mains', 'dinner', 'pan_thai', 20, 8, 13),
  R(`لحم على الصاج بالبهارات ${T}`, 'Sizzling beef with spices', 'Boeuf sizzling aux épices', 'Ternera sizzling con especias', 'Sizzling-Rindfleisch mit Gewürzen', 'meat_mains', 'dinner', 'pattaya', 24, 5, 15),
  R(`نام توك اللحم المشوي ${T}`, 'Nam tok grilled beef', 'Nam tok de boeuf grillé', 'Nam tok de ternera a la parrilla', 'Nam Tok vom Grill', 'meat_mains', 'dinner', 'isan', 25, 2, 13),
  R(`سلطة اللحم البارد ${T}`, 'Cold beef salad', 'Salade de boeuf froide', 'Ensalada fría de ternera', 'Kaltes Rindfleischsalat', 'meat_mains', 'lunch', 'pan_thai', 22, 5, 12),
  R(`كاري اللحم والكاجو ${T}`, 'Beef and cashew curry', 'Curry au boeuf et noix de cajou', 'Curry de ternera y anacardo', 'Rindfleisch-Curry mit Cashews', 'meat_mains', 'dinner', 'pan_thai', 19, 10, 14),
  R(`لحم مقلي بالريحان ${T}`, 'Beef fried with basil', 'Boeuf frit au basilic', 'Ternera frita con albahaca', 'Rindfleisch mit Basilikum', 'meat_mains', 'dinner', 'pan_thai', 24, 4, 15),
  R(`لحم مقلي بالكاجو ${T}`, 'Beef stir fry with cashews', 'Boeuf saute aux noix de cajou', 'Ternera salteada con anacardos', 'Rindfleisch mit Cashews', 'meat_mains', 'dinner', 'pan_thai', 23, 6, 15),
  R(`ستيو مرق اللحم ${T}`, 'Beef shank stew', 'Ragout de jarret de boeuf', 'Estofado de morlaco', 'Rindfleisch-Knochen-Eintopf', 'meat_mains', 'dinner', 'pan_thai', 21, 5, 11),
  R(`لحم مدخن على الشواية ${T}`, 'Smoked beef barbecue', 'Boeuf fume au barbecue', 'Ternera ahumada a la parrilla', 'Geräuchertes Rindfleisch vom Grill', 'meat_mains', 'dinner', 'krabi', 24, 3, 14),
  R(`لحم متبل مقرمش ${T}`, 'Crispy marinated meat', 'Viande marinee croustillante', 'Carne marinada crujiente', 'Knuspriges mariniertes Fleisch', 'meat_mains', 'dinner', 'pan_thai', 25, 4, 15),
];
