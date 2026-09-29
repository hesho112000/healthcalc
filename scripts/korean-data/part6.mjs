import { E, T } from './rows.mjs';

export default [
  // condiments_sauces (10)
  E(`صلصة السسام الحارة ${T}`, 'Ssamjang dipping paste', 'Pate a tremper ssamjang', 'Pasta ssamjang para mojar', 'Ssamjang-Dippaste', 'condiments_sauces', 'snacks', 8, 12, 4, 'fermented', 'pan_korean'),
  E(`صلصة الفول التخميرية الحارة ${T}`, 'Fermented soybean chili paste', 'Pate de soja fermentee et piment', 'Pasta de soja fermentada con chile', 'Fermentierte-Soja-Chili-Paste', 'condiments_sauces', 'snacks', 7, 14, 3, 'fermented', 'jeonju'),
  E(`صلصة الفلفل الحار التفتي ${T}`, 'Chili dipping sauce', 'Sauce au piment fort', 'Salsa de chile picante', 'Chili-Dippsauce', 'condiments_sauces', 'snacks', 3, 10, 1, 'raw', 'pan_korean'),
  E(`صلصة الخل الأسود ${T}`, 'Black vinegar sauce', 'Sauce au vinaigre noir', 'Salsa de vinagre negro', 'Schwarzessig-Sauce', 'condiments_sauces', 'snacks', 2, 8, 1, 'raw', 'pan_korean'),
  E(`معجون الخردل ${T}`, 'Mustard paste', 'Pate de moutarde', 'Pasta de mostaza', 'Senfpaste', 'condiments_sauces', 'snacks', 4, 6, 3, 'raw', 'jeonju'),
  E(`صلصة الثوم والفلفل ${T}`, 'Garlic and chili sauce', 'Sauce ail et piment', 'Salsa de ajo y chile', 'Knoblauch-Chili-Sauce', 'condiments_sauces', 'snacks', 2, 7, 1, 'raw', 'pan_korean'),
  E(`صلصة زيت السمسم ${T}`, 'Sesame oil sauce', 'Sauce a l huile de sesame', 'Salsa de aceite de sésamo', 'Sesamoel-Sauce', 'condiments_sauces', 'snacks', 2, 4, 8, 'raw', 'pan_korean'),
  E(`صلصة التتبيل بالصويا ${T}`, 'Soy marinating sauce', 'Sauce d marinade au soja', 'Salsa de marinado de soja', 'Soja-Marinadesauce', 'condiments_sauces', 'snacks', 5, 8, 2, 'raw', 'pan_korean'),
  E(`صلصة الخل بالبرقوق ${T}`, 'Plum vinegar sauce', 'Sauce au vinaigre de prune', 'Salsa de vinagre de ciruela', 'Pflaumenessig-Sauce', 'condiments_sauces', 'snacks', 1, 9, 1, 'raw', 'gwangju'),
  E(`صلصة الثوم المعمر ${T}`, 'Aged garlic sauce', 'Sauce a l ail vieilli', 'Salsa de ajo curado', 'Gealterter Knoblauch-Sauce', 'condiments_sauces', 'snacks', 3, 8, 1, 'fermented', 'pan_korean'),

  // beverages (12)
  E(`شاي الشعير والأرز ${T}`, 'Roasted barley and rice tea', 'Thee d orge et de riz grille', 'Te de cebada y arroz tostados', 'Geröstete-Gerste-Reis-Tee', 'beverages', 'snacks', 2, 12, 1, 'brewed', 'boseong'),
  E(`شاي الأقحوان ${T}`, 'Chrysanthemum tea', 'Thee de chrysantheme', 'Te de crisantemo', 'Chrysanthemen-Tee', 'beverages', 'snacks', 1, 8, 0, 'brewed', 'pan_korean'),
  E(`شاي الزنجبيل ${T}`, 'Ginger tea', 'Thee au gingembre', 'Te de jengibre', 'Ingwertee', 'beverages', 'snacks', 1, 9, 0, 'brewed', 'pan_korean'),
  E(`شاي التمر الجوجي ${T}`, 'Jujube tea', 'Thee aux dattes', 'Te de dátil', 'Datteltee', 'beverages', 'snacks', 1, 11, 0, 'brewed', 'pan_korean'),
  E(`شاي الذرة ${T}`, 'Corn tea', 'Thee de mais', 'Te de maíz', 'Maistee', 'beverages', 'snacks', 2, 10, 1, 'brewed', 'pan_korean'),
  E(`ماء الشعربه ${T}`, 'Barley water', 'Eau d orge', 'Agua de cebada', 'Gerstenwasser', 'beverages', 'snacks', 2, 10, 0, 'brewed', 'busan'),
  E(`شاي الحنطة السوداء المبخر ${T}`, 'Steamed buckwheat tea', 'Thee de sarrasin vapeur', 'Te de alforfón al vapor', 'Dampf-Buchweizen-Tee', 'beverages', 'snacks', 2, 9, 1, 'brewed', 'gangneung'),
  E(`شاي ورقة الكاكا ${T}`, 'Persimmon leaf tea', 'Thee de feuille de kaki', 'Te de hoja de caqui', 'Kakiblatt-Tee', 'beverages', 'snacks', 1, 6, 0, 'brewed', 'boseong'),
  E(`شاي إبرة الصنوبر ${T}`, 'Pine needle tea', 'Thee d aiguilles de pin', 'Te de agujas de pino', 'Kiefernadelpoltee', 'beverages', 'snacks', 1, 5, 0, 'brewed', 'boseong'),
  E(`ماء العسل بالليمون ${T}`, 'Honey lemon water', 'Eau miel citron', 'Agua de miel y limón', 'Honig-Zitronen-Wasser', 'beverages', 'snacks', 0, 12, 0, 'raw', 'pan_korean'),
  E(`ماء الأرز بالعسل ${T}`, 'Rice water with honey', 'Eau de riz au miel', 'Agua de arroz con miel', 'Reiswasser mit Honig', 'beverages', 'snacks', 1, 13, 0, 'brewed', 'pan_korean'),
  E(`شاي فول الصويا المثلج ${T}`, 'Iced soybean tea', 'Thee de soja glace', 'Te de soja helado', 'Eisiger Sojatee', 'beverages', 'snacks', 4, 6, 2, 'brewed', 'pan_korean'),
];
