// Korean base part 2 of 6: noodle_dishes (20) + soups_stews (20) = 40 rows.
// Halal notes: jajangmyeon uses beef and chicken instead of pork; naengmyeon uses
// a beef and vinegar broth instead of the traditional pork broth; jjampong broth is
// seafood and chicken only. No alcohol anywhere.
import { B, T } from './rows.mjs';

export default [
  // --- noodle_dishes (20) ---
  B(`جاجانغميون لحم البقر ${T}`, 'Beef jajangmyeon', 'Jajangmyeon au boeuf', 'Jajangmyeon de ternera', 'Jajangmyeon mit Rindfleisch', 'noodle_dishes', 'lunch', 14, 52, 10, 'simmered'),
  B(`جامبونغ ${T}`, 'Spicy seafood jjamppong', 'Jjamppong aux fruits de mer', 'Jjamppong de mariscos', 'Scharfes Meeresfruechte-Jjamppong', 'noodle_dishes', 'lunch', 18, 46, 9, 'simmered'),
  B(`كالغوكسو ${T}`, 'Kalguksu knife-cut noodles', 'Kalguksu aux nouilles fines', 'Kalguksu de fideos', 'Kalguksu-Nudeln', 'noodle_dishes', 'lunch', 15, 48, 7, 'simmered'),
  B(`بيبيم غوكسو ${T}`, 'Spicy bibim guksu', 'Bibim guksu releve', 'Bibim guksu picante', 'Scharfes Bibim-Guksu', 'noodle_dishes', 'lunch', 13, 50, 8, 'stir-fried'),
  B(`كونغغوكسو ${T}`, 'Soy milk kongguksu', 'Kongguksu au lait de soja', 'Kongguksu con leche de soja', 'Kongguksu mit Sojamilch', 'noodle_dishes', 'breakfast', 10, 44, 6, 'simmered'),
  B(`سالغوكسو ${T}`, 'Sallguksu rice noodles', 'Sallguksu aux nouilles de riz', 'Sallguksu de fideos de arroz', 'Sallguksu-Reisnudeln', 'noodle_dishes', 'lunch', 11, 50, 5, 'simmered'),
  B(`بوكم غوكسو ${T}`, 'Stir-fried noodles', 'Nouilles sautees', 'Fideos salteados', 'Gebratene Nudeln', 'noodle_dishes', 'lunch', 13, 52, 9, 'stir-fried'),
  B(`كامجاغوكسو ${T}`, 'Potato starch noodles', 'Nouilles a la fecule de pomme de terre', 'Fideos con fecula de patata', 'Kartoffelstark-Nudeln', 'noodle_dishes', 'lunch', 4, 62, 1, 'simmered'),
  B(`ياتشي غوكسو ${T}`, 'Vegetable noodles', 'Nouilles aux legumes', 'Fideos con verduras', 'Gemuese-Nudeln', 'noodle_dishes', 'lunch', 10, 50, 5, 'simmered'),
  B(`هايمول غوكسو ${T}`, 'Seafood noodles', 'Nouilles aux fruits de mer', 'Fideos con mariscos', 'Meeresfruechte-Nudeln', 'noodle_dishes', 'lunch', 17, 46, 8, 'simmered'),
  B(`نينغميون ${T}`, 'Naengmyeon cold buckwheat noodles', 'Naengmyeon froide au sarrasin', 'Naengmyeon frio de trigo sarraceno', 'Kaltes Naengmyeon', 'noodle_dishes', 'lunch', 12, 50, 4, 'simmered'),
  B(`تشيوتشي ${T}`, 'Japchae glass noodles', 'Japie-chai de nouilles de verre', 'Japchae de fideos de vidrio', 'Japchae-Glasnudeln', 'noodle_dishes', 'lunch', 10, 44, 8, 'stir-fried'),
  B(`كيمتشي غوكسو ${T}`, 'Kimchi noodles', 'Nouilles au kimchi', 'Fideos con kimchi', 'Kimchi-Nudeln', 'noodle_dishes', 'lunch', 10, 50, 6, 'simmered'),
  B(`أوموك غوكسو ${T}`, 'Eomuk fish cake noodles', 'Nouilles aux galettes de poisson', 'Fideos con sopa de pescado', 'Fischkuchen-Nudeln', 'noodle_dishes', 'lunch', 15, 48, 6, 'simmered'),
  B(`ونمين ${T}`, 'Onmen wheat noodle soup', 'Onmen au ble', 'Onmen de trigo', 'Weizennudel-Suppe', 'noodle_dishes', 'lunch', 13, 46, 5, 'simmered'),
  B(`هوانتاي غوكسو ${T}`, 'Salted pollock noodle soup', 'Nouilles a la morue salee', 'Fideos con abadejo salado', 'Gesalzter-Kabeljau-Nudelsuppe', 'noodle_dishes', 'dinner', 17, 44, 6, 'simmered'),
  B(`ميميل غوكسو ${T}`, 'Buckwheat noodles', 'Nouilles de sarrasin', 'Fideos de trigo sarraceno', 'Buchweizen-Nudeln', 'noodle_dishes', 'lunch', 12, 50, 4, 'simmered'),
  B(`سوجوجي غوكسو ${T}`, 'Beef noodle soup', 'Soupe de nouilles au boeuf', 'Sopa de fideos con ternera', 'Rindfleisch-Nudelsuppe', 'noodle_dishes', 'dinner', 16, 44, 7, 'simmered'),
  B(`ساوي غوكسو ${T}`, 'Shrimp noodle soup', 'Soupe de nouilles aux crevettes', 'Sopa de fideos con camarones', 'Garnelen-Nudelsuppe', 'noodle_dishes', 'dinner', 16, 44, 7, 'simmered'),
  B(`تشادول غوكسو ${T}`, 'Diced beef noodles', 'Nouilles au boeuf en cubes', 'Fideos con ternera en dados', 'Nudeln mit gewuerfeltem Rindfleisch', 'noodle_dishes', 'lunch', 15, 48, 8, 'simmered'),

  // --- soups_stews (20) ---
  B(`كيمتشي جيجي لحم البقر ${T}`, 'Beef kimchi stew', 'Ragoût de kimchi au boeuf', 'Guiso de kimchi con ternera', 'Rindfleisch-Kimchi-Eintopf', 'soups_stews', 'dinner', 18, 14, 11, 'simmered'),
  B(`دوجانج جيجي ${T}`, 'Soybean paste stew', 'Ragoût au miso de soja', 'Guiso de pasta de soja', 'Sojabohnen-Eintopf', 'soups_stews', 'dinner', 16, 13, 9, 'simmered'),
  B(`سوندوبو جيجي ${T}`, 'Soft tofu stew', 'Ragoût au tofu fondant', 'Guiso de tofu blando', 'Weicher-Tofu-Eintopf', 'soups_stews', 'dinner', 15, 12, 9, 'simmered'),
  B(`سوجوجي جونغول ${T}`, 'Beef jeongol stew', 'Ragoût jeongol au boeuf', 'Guiso jeongol de ternera', 'Rindfleisch-Jeongol', 'soups_stews', 'dinner', 20, 16, 13, 'simmered'),
  B(`غالبي جوم ${T}`, 'Braised beef short ribs', 'Cotes de boeuf braisees', 'Costillas de ternera guisadas', 'Geschmorte Rinderrippen', 'soups_stews', 'dinner', 24, 12, 15, 'simmered'),
  B(`داك بوكم تانغ ${T}`, 'Spicy braised chicken stew', 'Ragoût de poulet releve', 'Guiso de pollo picante', 'Scharfes Huhn-Eintopf', 'soups_stews', 'dinner', 24, 14, 12, 'simmered'),
  B(`هايمول جوم ${T}`, 'Stewed seafood', 'Fruits de mer braises', 'Mariscos estofados', 'Geschmorte Meeresfruechte', 'soups_stews', 'dinner', 22, 12, 9, 'simmered'),
  B(`دونغتي جيجي ${T}`, 'Pollock stew', 'Ragoût de morue', 'Guiso de abadejo', 'Kabeljau-Eintopf', 'soups_stews', 'dinner', 19, 13, 8, 'simmered'),
  B(`كيمتشي غوكي جيجي ${T}`, 'Spicy beef kimchi stew', 'Ragoût de kimchi et boeuf releve', 'Guiso picante de kimchi y ternera', 'Scharfes Rindfleisch-Kimchi-Eintopf', 'soups_stews', 'dinner', 19, 14, 12, 'simmered'),
  B(`ياتشي جونغول ${T}`, 'Vegetable jeongol stew', 'Ragoût jeongol aux legumes', 'Guiso jeongol de verduras', 'Gemuese-Jeongol', 'soups_stews', 'dinner', 12, 18, 8, 'simmered'),
  B(`هايمول دوك بيجي ${T}`, 'Spicy seafood ttukbaegi', 'Ttukbaegi aux fruits de mer', 'Ttukbaegi de mariscos', 'Meeresfruechte-Ttukbaegi', 'soups_stews', 'dinner', 21, 14, 10, 'simmered'),
  B(`جوجي توك ${T}`, 'Steamed clams in broth', 'Palourdes a la vapeur en bouillon', 'Almejas al vapor en caldo', 'Dampfmuscheln in Bruehe', 'soups_stews', 'dinner', 17, 8, 5, 'steamed'),
  B(`جوجي دوبو ${T}`, 'Clam and tofu stew', 'Ragoût de palourdes et tofu', 'Guiso de almejas y tofu', 'Muschel-Tofu-Eintopf', 'soups_stews', 'dinner', 17, 11, 7, 'simmered'),
  B(`تشاي جانغ ${T}`, 'Glass noodle stew', 'Ragoût de nouilles de verre', 'Guiso de fideos de vidrio', 'Glasnudel-Eintopf', 'soups_stews', 'dinner', 14, 18, 7, 'simmered'),
  B(`بيوتشو جيجي ${T}`, 'Napa cabbage stew', 'Ragoût de chou chinois', 'Guiso de col china', 'Chinakohl-Eintopf', 'soups_stews', 'dinner', 13, 15, 8, 'simmered'),
  B(`مو جيجي ${T}`, 'Radish stew', 'Ragoût de radis', 'Guiso de rábano', 'Rettich-Eintopf', 'soups_stews', 'dinner', 12, 14, 7, 'simmered'),
  B(`كونغغي جيجي ${T}`, 'Bean sprout stew', 'Ragoût de pousses de soja', 'Guiso de germenes de soja', 'Sojohacken-Eintopf', 'soups_stews', 'dinner', 14, 13, 7, 'simmered'),
  B(`دويسوب غوك ${T}`, 'Perilla leaf soup', 'Soupe au shiso', 'Sopa con perilla', 'Perilla-Suppe', 'soups_stews', 'dinner', 9, 8, 5, 'simmered'),
  B(`سوجوجي مو ${T}`, 'Beef and radish soup', 'Soupe au boeuf et au radis', 'Sopa de ternera y rábano', 'Rindfleisch-Rettich-Suppe', 'soups_stews', 'dinner', 17, 10, 6, 'simmered'),
  B(`هايمول دوجانغ ${T}`, 'Seafood soybean paste stew', 'Ragoût de miso de soja aux fruits de mer', 'Guiso de pasta de soja y mariscos', 'Meeresfruechte-Sojabohnen-Eintopf', 'soups_stews', 'dinner', 18, 12, 8, 'simmered'),
];
