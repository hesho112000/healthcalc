// Korean base part 6 of 6: condiments_sauces (10) + beverages (14) = 24 rows.
// Halal notes: mirin and rice wine in dipping sauces are replaced with rice vinegar
// and a mild perilla extract. No alcohol anywhere. All drinks are non-alcoholic.
import { B, T } from './rows.mjs';

export default [
  // --- condiments_sauces (10) ---
  B(`سوجوجي سوس ${T}`, 'Soy-based dipping sauce', 'Sauce de trempe au soja', 'Salsa para mojar de soja', 'Sojasauce zum Tauchen', 'condiments_sauces', 'snacks', 6, 10, 2, 'fermented'),
  B(`غوتشوجانغ ${T}`, 'Gochujang chili paste', 'Pate de piment gochujang', 'Pasta de chile gochujang', 'Gochujang-Chilipaste', 'condiments_sauces', 'snacks', 3, 16, 1, 'fermented'),
  B(`دوجانج ${T}`, 'Doenjang soybean paste', 'Pate de soja fermentee', 'Pasta de soja fermentada', 'Fermentierte Sojabohnenpastete', 'condiments_sauces', 'snacks', 6, 12, 1, 'fermented'),
  B(`غيان جانغ ${T}`, 'Ganjang soy sauce', 'Sauce de soja ganjang', 'Salsa de soja ganjang', 'Ganjang-Sojasauce', 'condiments_sauces', 'snacks', 4, 8, 0, 'fermented'),
  B(`بيجاز ${T}`, 'Vinegar dipping sauce', 'Sauce vinaigreee', 'Salsa de vinagre', 'Essigsauce zum Tauchen', 'condiments_sauces', 'snacks', 1, 6, 0, 'fermented'),
  B(`سوجوجي سوس حار ${T}`, 'Spicy soy dipping sauce', 'Sauce de soja relevee', 'Salsa de soja picante', 'Scharfe Sojasauce', 'condiments_sauces', 'snacks', 5, 11, 2, 'fermented'),
  B(`تشو تشو سوس ${T}`, 'Teochew-style soy vinegar sauce', 'Sauce de soja et vinaigre de Teochew', 'Salsa de soja y vinagre Teochew', 'Teochew-Soja-Essigsauce', 'condiments_sauces', 'snacks', 4, 10, 1, 'fermented'),
  B(`فلفل حار سوس ${T}`, 'Hot pepper sauce', 'Sauce au piment fort', 'Salsa de chile picante', 'Scharfe Chilisauce', 'condiments_sauces', 'snacks', 2, 8, 1, 'fermented'),
  B(`سمك سوس ${T}`, 'Fish-based dipping sauce', 'Sauce de trempe au poisson', 'Salsa para mojar de pescado', 'Fischsauce zum Tauchen', 'condiments_sauces', 'snacks', 8, 9, 2, 'fermented'),
  B(`دولغا سوس ${T}`, 'Sesame dipping sauce', 'Sauce au sesame', 'Salsa de sésamo', 'Sesamsauce zum Tauchen', 'condiments_sauces', 'snacks', 4, 8, 6, 'fermented'),

  // --- beverages (14) ---
  B(`بوريتشي ${T}`, 'Barley tea', 'The d orge', 'Te de cebada', 'Gerstentee', 'beverages', 'snacks', 1, 6, 0, 'brewed'),
  B(`غول ميونغ جاتشي ${T}`, 'Whole brown rice tea', 'The au riz brun complet', 'Te de arroz integral', 'Vollkorn-Reis-Tee', 'beverages', 'snacks', 2, 12, 1, 'brewed'),
  B(`أوكسونسوتشي ${T}`, 'Corn silk tea', 'The de soies de mais', 'Te de pelotas de maiz', 'Maiskolben-Tee', 'beverages', 'snacks', 1, 7, 0, 'brewed'),
  B(`إيمبي ${T}`, 'Ember roasted rice drink', 'Boisson de riz grille', 'Bebida de arroz tostado', 'Geroesteter Reis-Trank', 'beverages', 'snacks', 3, 20, 1, 'brewed'),
  B(`سوبيان ميلك ${T}`, 'Soy milk', 'Lait de soja', 'Leche de soja', 'Sojamilch', 'beverages', 'snacks', 5, 5, 4, 'simmered'),
  B(`دوبيو ميلك ${T}`, 'Soft tofu milk', 'Lait de tofu doux', 'Bebida de tofu suave', 'Weiche-Tofu-Milch', 'beverages', 'snacks', 4, 5, 3, 'simmered'),
  B(`سوجوجي زنجبيل ${T}`, 'Ginger soy drink', 'Boisson au gingembre et soja', 'Bebida de jengibre y soja', 'Ingwer-Soja-Getraenk', 'beverages', 'snacks', 2, 10, 1, 'brewed'),
  B(`أوريمي سول ${T}`, 'Rice fermentation water', 'Eau de riz fermente', 'Agua de arroz fermentado', 'Fermentierter Reis-Wasser', 'beverages', 'snacks', 2, 14, 0, 'fermented'),
  B(`تشا فا ${T}`, 'Sorghum tea', 'The de sorgho', 'Te de sorgo', 'Sorghum-Tee', 'beverages', 'snacks', 1, 8, 0, 'brewed'),
  B(`سوجوجي حلو ${T}`, 'Sweet soy milk drink', 'Boisson de lait de soja sucre', 'Bebida de leche de soja dulce', 'Suessliche Sojamilch', 'beverages', 'snacks', 5, 12, 4, 'simmered'),
  B(`ميسوت ثوا ${T}`, 'Sweet barley drink', 'Boisson d orge sucree', 'Bebida de cebada dulce', 'Suessliche Gerstenmilch', 'beverages', 'snacks', 3, 18, 1, 'brewed'),
  B(`توك مقلول ${T}`, 'Roasted rice tea', 'The de riz grille', 'Te de arroz tostado', 'Gerösteter Reis-Tee', 'beverages', 'snacks', 2, 16, 1, 'brewed'),
  B(`مورو ${T}`, 'Brown rice vinegar drink', 'Boisson de vinaigre de riz brun', 'Bebida de vinagre de arroz integral', 'Vollkorn-Reis-Essig-Getraenk', 'beverages', 'snacks', 1, 9, 0, 'brewed'),
  B(`دولغا برو ${T}`, 'Roasted soybean drink', 'Boisson de soja grille', 'Bebida de soja tostado', 'Geröstetes Soja-Getraenk', 'beverages', 'snacks', 4, 20, 2, 'brewed'),
];
