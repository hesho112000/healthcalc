import { B, T } from './rows.mjs';

export default [
  // condiments_sauces (8)
  B(`صلصة الصويا الطبيعية ${T}`, 'Natural soy sauce', 'Sauce soja naturelle', 'Salsa de soja natural', 'Natuerliche Sojasauce', 'condiments_sauces', 'lunch', 6, 6, 0, 'raw', 'taipei'),
  B(`صلصة السمسم الطبيعية ${T}`, 'Natural sesame sauce', 'Sauce sesame naturelle', 'Salsa de sesamo natural', 'Natuerliche Sesamsauce', 'condiments_sauces', 'lunch', 6, 4, 12, 'raw', 'tainan'),
  B(`صلصة الفلفل الحار الحادة ${T}`, 'Hot chili sauce', 'Sauce piment fort', 'Salsa de chile picante', 'Scharfe Chilisauce', 'condiments_sauces', 'lunch', 3, 10, 2, 'raw', 'kaohsiung'),
  B(`صلصة الخل بالليمون ${T}`, 'Lemon vinegar sauce', 'Sauce vinaigre citron', 'Salsa de vinagre y limon', 'Zitronen-Essigsauce', 'condiments_sauces', 'lunch', 2, 6, 0, 'raw', 'tainan'),
  B(`صلصة الفطر المطبوخة ${T}`, 'Cooked mushroom sauce', 'Sauce aux champignons cuite', 'Salsa de setas cocida', 'Gekochte Pilzsauce', 'condiments_sauces', 'lunch', 5, 9, 3, 'simmered', 'nantou'),
  B(`صلصة السمك المطبوخة ${T}`, 'Cooked fish sauce', 'Sauce poisson cuite', 'Salsa de pescado cocida', 'Gekochte Fischsauce', 'condiments_sauces', 'lunch', 9, 6, 3, 'simmered', 'keelung'),
  B(`صلصة الفول الحلوة ${T}`, 'Sweet bean sauce', 'Sauce sucree aux haricots', 'Salsa dulce de judia', 'Susse Bohnensauce', 'condiments_sauces', 'lunch', 5, 14, 2, 'simmered', 'chiayi'),
  B(`صلصة السمسم الحلوة ${T}`, 'Sweet sesame sauce', 'Sauce sesame sucree', 'Salsa dulce de sesamo', 'Susse Sesamsauce', 'condiments_sauces', 'lunch', 5, 12, 6, 'simmered', 'taichung'),

  // beverages (20)
  B(`شاي الأوي لونغ ${T}`, 'High mountain oolong tea', 'The oolong de haute montagne', 'Te oolong de alta montana', 'Hochland-Oolongtee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'nantou'),
  B(`شاي جبال الألي ${T}`, 'Alishan mountain tea', 'The de montagne Alishan', 'Te de montana Alishan', 'Alishan-Bergtee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'chiayi'),
  B(`شاي جيلانغ ${T}`, 'Jelan tea', 'The Jelan', 'Te Jelan', 'Jelan-Tee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'yilan'),
  B(`شاي تايتونغ ${T}`, 'Taitung tea', 'The de Taitung', 'Te de Taitung', 'Taitung-Tee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'taitung'),
  B(`شاي هسينشو ${T}`, 'Hsinchu tea', 'The de Hsinchu', 'Te de Hsinchu', 'Hsinchu-Tee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'hsinchu'),
  B(`شاي كيلي ${T}`, 'Keelung tea', 'The de Keelung', 'Te de Keelung', 'Keelung-Tee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'keelung'),
  B(`حليب الشاي اللؤلؤي الحلو ${T}`, 'Sweet bubble milk tea', 'The au lait perle sucre', 'Te con leche de perlas dulce', 'Susse Perlenmilchtee', 'beverages', 'snack', 3, 16, 4, 'brewed', 'taipei'),
  B(`شاي الأخضر الجبلي ${T}`, 'Taiwan green tea', 'The vert de Taiwan', 'Te verde de Taiwan', 'Taiwan-Grüntee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'taipei'),
  B(`شاي الزنجبيل الدافئ ${T}`, 'Warm ginger tea', 'The chaud au gingembre', 'Te caliente de jengibre', 'Warmer Ingwertee', 'beverages', 'snack', 0, 8, 0, 'brewed', 'tainan'),
  B(`شاي اللوز الحلو ${T}`, 'Sweet almond tea', 'The aux amandes sucre', 'Te de almendra dulce', 'Susse Mandeltee', 'beverages', 'snack', 2, 10, 3, 'brewed', 'taichung'),
  B(`عصير المانجو الطازج ${T}`, 'Fresh mango juice', 'Jus de mangue frais', 'Zumo de mango fresco', 'Frischer Mangosaft', 'beverages', 'snack', 1, 15, 1, 'raw', 'taitung'),
  B(`عصير الليتشي البارد ${T}`, 'Cold lychee juice', 'Jus de litchi froid', 'Zumo de lichi frio', 'Kalter Lycheisaft', 'beverages', 'snack', 1, 16, 0, 'raw', 'chiayi'),
  B(`عصير الموز ${T}`, 'Banana juice', 'Jus de banane', 'Zumo de platano', 'Bananensaft', 'beverages', 'snack', 1, 17, 0, 'raw', 'pingtung'),
  B(`عصير العنب ${T}`, 'Grape juice', 'Jus de raisin', 'Zumo de uva', 'Traubensaft', 'beverages', 'snack', 1, 15, 0, 'raw', 'chiayi'),
  B(`عصير الكاكا ${T}`, 'Persimmon juice', 'Jus de kaki', 'Zumo de caqui', 'Kakisaft', 'beverages', 'snack', 1, 14, 0, 'raw', 'tainan'),
  B(`عصير الليمون بالنعناع ${T}`, 'Mint lemon juice drink', 'Boisson citron menthe', 'Bebida de limón y menta', 'Zitronen-Minze-Getraenk', 'beverages', 'snack', 0, 8, 0, 'brewed', 'kaohsiung'),
  B(`عصير الجريب فروت ${T}`, 'Grapefruit juice', 'Jus de pamplemousse', 'Zumo de pomelo', 'Grapefruitsaft', 'beverages', 'snack', 1, 12, 0, 'raw', 'tainan'),
  B(`حليب الصويا الحلو ${T}`, 'Sweet soy milk drink', 'Lait de soja sucre', 'Bebida de leche de soja dulce', 'Susse Sojamilch', 'beverages', 'snack', 4, 8, 2, 'raw', 'taipei'),
  B(`حليب اللوز الحلو ${T}`, 'Sweet almond milk', 'Lait d amandes sucre', 'Leche de almendra dulce', 'Susse Mandelmilch', 'beverages', 'snack', 2, 6, 4, 'raw', 'taichung'),
  B(`شراب الخوخ ${T}`, 'Peach juice', 'Jus de peche', 'Zumo de melocoton', 'Pfirsichsaft', 'beverages', 'snack', 1, 14, 0, 'raw', 'hualien'),
];
