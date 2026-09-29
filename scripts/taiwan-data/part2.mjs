import { B, T } from './rows.mjs';

export default [
  // noodle_dishes (12)
  B(`نودلز لحم البقر الحار الحامض ${T}`, 'Hot and sour beef noodles', 'Nouilles au boeuf epicé acide', 'Fideos de ternera agriosos', 'Sauer-scharfe Rindfleischnudeln', 'noodle_dishes', 'lunch', 18, 31, 8, 'stir-fried', 'kaohsiung'),
  B(`نودلز الدجاج بالثوم ${T}`, 'Garlic chicken noodles', 'Nouilles au poulet a l ail', 'Fideos de pollo con ajo', 'Knoblauch-Haehnchennudeln', 'noodle_dishes', 'lunch', 15, 30, 8, 'stir-fried', 'tainan'),
  B(`نودلز السمك المطاطي ${T}`, 'Chewy fish noodles', 'Nouilles de poisson elastiques', 'Fideos de pescado elasticos', 'Kauende Fischnudeln', 'noodle_dishes', 'lunch', 14, 31, 5, 'simmered', 'keelung'),
  B(`نودلز الفطر الحلو ${T}`, 'Sweet mushroom noodles', 'Nouilles douces aux champignons', 'Fideos dulces con setas', 'Susse Pilznudeln', 'noodle_dishes', 'lunch', 8, 33, 6, 'stir-fried', 'nantou'),
  B(`نودلز الفلفل الحار ${T}`, 'Chili pepper noodles', 'Nouilles au piment', 'Fideos con chile', 'Chilinudeln', 'noodle_dishes', 'lunch', 9, 33, 8, 'stir-fried', 'taichung'),
  B(`نودلز الدجاج المطفيّ ${T}`, 'Claypot chicken noodles', 'Nouilles de poulet en cassole', 'Fideos de pollo en cazuela', 'Tonpfannudeln mit Haehnchen', 'noodle_dishes', 'lunch', 17, 30, 10, 'simmered', 'kaohsiung'),
  B(`نودلز الروبيان الحراري ${T}`, 'Hot prawn noodles', 'Nouilles chaudes aux crevettes', 'Fideos calientes con gambas', 'Heisse Garnelennudeln', 'noodle_dishes', 'lunch', 16, 29, 7, 'simmered', 'pingtung'),
  B(`نودلز لحم البقر المعلب ${T}`, 'Canned beef noodles', 'Nouilles au boeuf en conserve', 'Fideos con ternera enlatada', 'Nudeln mit DosENrindfleisch', 'noodle_dishes', 'lunch', 18, 30, 9, 'simmered', 'tainan'),
  B(`نودلز الخضار المطهي ${T}`, 'Cooked vegetable noodles', 'Nouilles de legumes cuites', 'Fideos de verduras cocidos', 'Gekochte Gemuessenudeln', 'noodle_dishes', 'lunch', 7, 32, 7, 'simmered', 'yilan'),
  B(`نودلز السمك المجمد ${T}`, 'Frozen fish noodles', 'Nouilles au poisson surgele', 'Fideos con pescado congelado', 'Nudeln mit Tiefkuehlfisch', 'noodle_dishes', 'lunch', 13, 31, 6, 'simmered', 'hualien'),
  B(`نودلز الأرز البني ${T}`, 'Brown rice noodles', 'Nouilles de riz brun', 'Fideos de arroz integral', 'Vollkornreisnudeln', 'noodle_dishes', 'lunch', 10, 31, 6, 'simmered', 'chiayi'),
  B(`نودلز الدجاج بالعسل ${T}`, 'Honey chicken noodles', 'Nouilles au poulet au miel', 'Fideos de pollo con miel', 'Honighaehnchennudeln', 'noodle_dishes', 'lunch', 15, 31, 7, 'stir-fried', 'taipei'),

  // soups_stews (14)
  B(`حساء الدجاج بالزنجبيل الطازج ${T}`, 'Fresh ginger chicken soup', 'Soupe poulet gingembre frais', 'Sopa de pollo con jengibre fresco', 'Frische Ingwerhuhnersuppe', 'soups_stews', 'lunch', 15, 10, 6, 'simmered', 'chiayi'),
  B(`حساء لحم البرقوق الحلو ${T}`, 'Sweet beef plum soup', 'Soupe de boeuf aux pruneaux', 'Sopa de ternera con ciruelas', 'Suesse Rindfleisch-Pflaumensuppe', 'soups_stews', 'lunch', 16, 16, 7, 'simmered', 'tainan'),
  B(`حساء السمك الطازج الحار ${T}`, 'Fresh spicy fish soup', 'Soupe de poisson frais epice', 'Sopa de pescado fresco picante', 'Frische scharfe Fischsuppe', 'soups_stews', 'lunch', 14, 11, 5, 'simmered', 'hualien'),
  B(`حساء بذور السمسم تايوان أصيل`, 'Sesame seed soup', 'Soupe de graines de sesame', 'Sopa de semillas de sesamo', 'Sesamsamensuppe', 'soups_stews', 'lunch', 6, 12, 5, 'simmered', 'tainan'),
  B(`حساء الدجاج بالكاكاو ${T}`, 'Cocoa chicken soup', 'Soupe de poulet au cacao', 'Sopa de pollo con cacao', 'Kakao-Huehnchensuppe', 'soups_stews', 'dinner', 15, 13, 7, 'simmered', 'taipei'),
  B(`حساء الخضار المالح ${T}`, 'Salted vegetable soup', 'Soupe de legumes salee', 'Sopa de verduras salada', 'Gesalzenes Gemuese-Suppe', 'soups_stews', 'lunch', 5, 14, 3, 'simmered', 'pingtung'),
  B(`حساء لسان البطاطا ${T}`, 'Potato tongue soup', 'Soupe de langue de pomme de terre', 'Sopa de lengua de patata', 'Kartoffelzungen-Suppe', 'soups_stews', 'lunch', 5, 15, 3, 'simmered', 'yilan'),
  B(`حساء الفطر الحلو ${T}`, 'Sweet mushroom soup', 'Soupe douce aux champignons', 'Sopa dulce de setas', 'Susse Pilzsuppe', 'soups_stews', 'lunch', 6, 15, 4, 'simmered', 'nantou'),
  B(`حساء سمك القرش الصافي ${T}`, 'Clear shark fish soup', 'Soupe claire de requin', 'Sopa clara de tiburon', 'Klare Haifischsuppe', 'soups_stews', 'lunch', 15, 8, 5, 'simmered', 'kaohsiung'),
  B(`حساء الدجاج المطاطي ${T}`, 'Chewy chicken soup', 'Soupe de poulet elastique', 'Sopa de pollo elastica', 'Kauende Huehnchensuppe', 'soups_stews', 'lunch', 17, 9, 8, 'simmered', 'taichung'),
  B(`حساء الخضار بالموالح ${T}`, 'Sour vegetable soup', 'Soupe de legumes aigre', 'Sopa de verduras agria', 'Sauer Gemuesesuppe', 'soups_stews', 'lunch', 5, 13, 3, 'simmered', 'yilan'),
  B(`حساء المأكولات البحرية الكامل ${T}`, 'Full seafood soup', 'Soupe complete aux fruits de mer', 'Sopa completa de mariscos', 'Vollstaendige Meeresfruechtesuppe', 'soups_stews', 'dinner', 18, 12, 7, 'simmered', 'keelung'),
  B(`حساء الدجاج المحمر ${T}`, 'Red cooked chicken soup', 'Soupe de poulet rouge braise', 'Sopa de pollo rojo guisado', 'Rothgekochter Huehnchensuppe', 'soups_stews', 'lunch', 18, 10, 9, 'simmered', 'chiayi'),
  B(`حساء الجذر بالجزر ${T}`, 'Carrot root soup', 'Soupe de racine et carotte', 'Sopa de raiz y zanahoria', 'Wurzel-Karottensuppe', 'soups_stews', 'lunch', 5, 14, 3, 'simmered', 'taichung'),
];
