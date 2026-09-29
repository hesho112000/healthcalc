// Korean base part 5 of 6: street_snacks (16) + rice_cakes_sweets (16) = 32 rows.
// Halal notes: sundae uses beef blood instead of pork blood; gopchang is beef tripe;
// tteokbokki uses beef and anchovy stock. Bungeoppang is served without the
// traditional soju glaze. No pork, no alcohol anywhere.
import { B, T } from './rows.mjs';

export default [
  // --- street_snacks (16) ---
  B(`توكبوكي لحم البقر ${T}`, 'Beef tteokbokki', 'Tteokbokki au boeuf', 'Tteokbokki de ternera', 'Tteokbokki mit Rindfleisch', 'street_snacks', 'lunch', 14, 40, 8, 'stir-fried'),
  B(`توكبوكي لحم الدجاج ${T}`, 'Chicken tteokbokki', 'Tteokbokki au poulet', 'Tteokbokki de pollo', 'Tteokbokki mit Huehnchen', 'street_snacks', 'lunch', 15, 40, 8, 'stir-fried'),
  B(`تشيز توكبوكي ${T}`, 'Cheese tteokbokki', 'Tteokbokki au fromage', 'Tteokbokki con queso', 'Tteokbokki mit Kaese', 'street_snacks', 'lunch', 13, 40, 11, 'stir-fried'),
  B(`سوسونداي لحم البقر ${T}`, 'Beef blood sausage', 'Boudin noir au sang de boeuf', 'Salchicha de sangre de ternera', 'Rinderblutwurst', 'street_snacks', 'snacks', 15, 8, 12, 'simmered'),
  B(`سوجوجي غوتشانغ ${T}`, 'Beef tripe skewers', 'Brochettes de tripe de boeuf', 'Pinchos de tripa de ternera', 'Rindtripel-Spieesse', 'street_snacks', 'snacks', 20, 4, 13, 'grilled'),
  B(`مونغو كوتشي ${T}`, 'Octopus skewer', 'Brochette de poulpe', 'Pincho de pulpo', 'Oktopus-Spiess', 'street_snacks', 'snacks', 18, 8, 8, 'grilled'),
  B(`تاكوياكي ${T}`, 'Takoyaki octopus balls', 'Boulettes de poulpe', 'Bolitas de pulpo', 'Takoyaki-Kugeln', 'street_snacks', 'snacks', 9, 22, 8, 'pan-fried'),
  B(`أوجينغو تيمغيم ${T}`, 'Fried squid', 'Calamar frit', 'Calamar frito', 'Frittierter Kalmaring', 'street_snacks', 'snacks', 15, 20, 11, 'fried'),
  B(`كيم ماري ${T}`, 'Seaweed sweet potato roll', 'Rouleau de patate douce en algue', 'Rollo de boniato con algas', 'Susskartoffel-Rolle im Seetang', 'street_snacks', 'snacks', 5, 30, 7, 'fried'),
  B(`غيلريسي كيمباب ${T}`, 'Street kimbap roll', 'Kimbap de la rue', 'Kimbap callejero', 'Strassenkimbap', 'street_snacks', 'snacks', 9, 30, 7, 'steamed'),
  B(`هوتوك ${T}`, 'Hotteok sweet pancake', 'Pancake sucre de rue', 'Panqueque dulce callejero', 'Susses Pfannkuchen', 'street_snacks', 'snacks', 7, 34, 10, 'pan-fried'),
  B(`سيوت هوتوك ${T}`, 'Sesame hotteok', 'Hotteok aux graines de sesame', 'Hotteck con semillas de sésamo', 'Hotteck mit Sesam', 'street_snacks', 'snacks', 8, 33, 11, 'pan-fried'),
  B(`بونغيبانغ ${T}`, 'Bungeoppang red bean fish cake', 'Gaufre au haricot rouge', 'Bizcocho de judía roja', 'Bungeoppang mit roten Bohnen', 'street_snacks', 'snacks', 7, 32, 8, 'griddled'),
  B(`كوابيجي ${T}`, 'Kkwaebagi stuffed fried bread', 'Pain frit fourre', 'Pan frito relleno', 'Gefuelltes Frittierbroetchen', 'street_snacks', 'snacks', 10, 32, 13, 'fried'),
  B(`يانغتوك ${T}`, 'Yangtteok rice skewer', 'Brochette de gateau de riz', 'Pincho de pastel de arroz', 'Reisigeback-Spiess', 'street_snacks', 'snacks', 5, 32, 4, 'grilled'),
  B(`مول ماندو ${T}`, 'Steamed dumplings', 'Raviolis a la vapeur', 'Empanadillas al vapor', 'Gedampfte Kloesse', 'street_snacks', 'snacks', 9, 26, 5, 'steamed'),

  // --- rice_cakes_sweets (16) ---
  B(`توك ${T}`, 'Plain steamed rice cake', 'Gateau de riz cuit a la vapeur', 'Pastel de arroz al vapor', 'Gedampfter Reiskuchen', 'rice_cakes_sweets', 'snacks', 4, 28, 1, 'steamed'),
  B(`تشابشال توك ${T}`, 'Glutinous rice cake', 'Gâteau de riz gluant', 'Pastel de arroz glutinoso', 'Klebriger Reiskuchen', 'rice_cakes_sweets', 'snacks', 4, 30, 1, 'steamed'),
  B(`تشابشال أبوب ${T}`, 'Glutinous rice candy', 'Bonbon de riz gluant', 'Caramelo de arroz glutinoso', 'Klebriger Reis-Bonbon', 'rice_cakes_sweets', 'snacks', 2, 30, 2, 'steamed'),
  B(`مونغيونري توك ${T}`, 'Mungyeong rice cake', 'Gâteau de riz de Mungyeong', 'Pastel de arroz de Mungyeong', 'Mungyeong-Reiskuchen', 'rice_cakes_sweets', 'snacks', 6, 30, 2, 'steamed'),
  B(`كول توك ${T}`, 'Honey rice cake', 'Gâteau de riz au miel', 'Pastel de arroz con miel', 'Honig-Reiskuchen', 'rice_cakes_sweets', 'snacks', 4, 32, 2, 'steamed'),
  B(`جابتوك ${T}`, 'Stuffed rice cake', 'Gâteau de riz fourré', 'Pastel de arroz relleno', 'Gefuellter Reiskuchen', 'rice_cakes_sweets', 'snacks', 7, 32, 4, 'steamed'),
  B(`سونغبيون ${T}`, 'Songpyeon rice cake', 'Songpyeon au riz', 'Songpyeon de arroz', 'Songpyeon-Reiskuchen', 'rice_cakes_sweets', 'snacks', 5, 30, 2, 'steamed'),
  B(`بوغي توك ${T}`, 'Bukkiteok rice cake', 'Bukkiteok au riz', 'Bukkiteok de arroz', 'Bukkiteok-Reiskuchen', 'rice_cakes_sweets', 'snacks', 5, 30, 2, 'steamed'),
  B(`إنجول توك ${T}`, 'Injeolmi rice cake', 'Injeolmi au riz', 'Injeolmi de arroz', 'Injeolmi-Reiskuchen', 'rice_cakes_sweets', 'snacks', 5, 30, 2, 'steamed'),
  B(`يوت ${T}`, 'Yot Korean malt candy', 'Bonbon au malt coreen', 'Caramelo de malta coreano', 'Koreanischer Malz-Bonbon', 'rice_cakes_sweets', 'snacks', 1, 32, 2, 'fermented'),
  B(`يوغوا ${T}`, 'Yu-gwa candied nuts', 'Noix candees', 'Frutos secos caramelizados', 'Kandierte Nuesse', 'rice_cakes_sweets', 'snacks', 6, 26, 12, 'fermented'),
  B(`ياغوا ${T}`, 'Yakgwa ginger candy', 'Bonbon au gingembre', 'Caramelo de jengibre', 'Ingwer-Bonbon', 'rice_cakes_sweets', 'snacks', 2, 30, 6, 'fermented'),
  B(`هيانغوا ${T}`, 'Hyangga jujube candy', 'Bonbon au jujube', 'Caramelo de dátil', 'Dattel-Bonbon', 'rice_cakes_sweets', 'snacks', 1, 28, 5, 'fermented'),
  B(`سيكهي ${T}`, 'Sikhye sweet rice drink', 'Boisson au riz sucree', 'Bebida de arroz dulce', 'Suesser Reis-Trank', 'rice_cakes_sweets', 'snacks', 2, 22, 0, 'brewed'),
  B(`ميشوت غارو ${T}`, 'Roasted grain drink', 'Boisson de grains grilles', 'Bebida de granos tostados', 'Geröstetes Korn-Getränk', 'rice_cakes_sweets', 'snacks', 4, 20, 2, 'brewed'),
  B(`كودو توك ${T}`, 'Cut rice cake strip', 'Bande de gâteau de riz', 'Tira de pastel de arroz', 'Reiskuchen-Streifen', 'rice_cakes_sweets', 'snacks', 5, 32, 3, 'steamed'),
];
