// Korean base part 3 of 6: poultry_mains (15) + meat_mains (18) = 33 rows.
// Halal notes: samgyeopsal (pork belly) becomes seoryeongui (beef brisket);
// ojiska (spicy pork) becomes jeong-yuk beef; the rice wine used in daldori-tang and
// samgyetang marinades is replaced with rice vinegar and pear juice. No pork, no alcohol.
import { B, T } from './rows.mjs';

export default [
  // --- poultry_mains (15) ---
  B(`داكغالبي ${T}`, 'Dakgalbi spicy marinated chicken', 'Poulet marinate releve dakgalbi', 'Pollo dakgalbi marinado picante', 'Dakgalbi mariniertes scharfes Huehnchen', 'poultry_mains', 'dinner', 25, 12, 12, 'stir-fried'),
  B(`داك بولوغوجي ${T}`, 'Chicken bulgogi', 'Bulgogi de poulet', 'Bulgogi de pollo', 'Huhn-Bulgogi', 'poultry_mains', 'dinner', 25, 10, 11, 'grilled'),
  B(`دجاج كانغ مقلي ${T}`, 'Korean fried chicken', 'Poulet frit coreen', 'Pollo frito coreano', 'Koreanisches Frittierte Huenerchen', 'poultry_mains', 'dinner', 25, 14, 14, 'fried'),
  B(`دالدوري تانغ ${T}`, 'Daldori-tang pine nut chicken soup', 'Soupe de poulet aux pignons de pin', 'Sopa de pollo con piñones', 'Huehnersuppe mit Kiefernkernen', 'poultry_mains', 'dinner', 22, 9, 12, 'simmered'),
  B(`داكجون ${T}`, 'Crispy fried chicken patty', 'Galette de poulet croustillante', 'Croqueta de pollo crujiente', 'Knusprige Huhn-Pfannkuchen', 'poultry_mains', 'dinner', 20, 13, 13, 'fried'),
  B(`يانيوم تشيكين ${T}`, 'Marinated soy chicken', 'Poulet marine au soja', 'Pollo marinado con soja', 'Sojamariniertes Huehnchen', 'poultry_mains', 'dinner', 24, 11, 11, 'grilled'),
  B(`غان جانغ داكغالبي ${T}`, 'Soy-marinated chicken galbi', 'Galbi de poulet marine au soja', 'Galbi de pollo marinado con soja', 'Sojamariniertes Huhn-Galbi', 'poultry_mains', 'dinner', 26, 9, 11, 'grilled'),
  B(`داك غوي ${T}`, 'Grilled chicken', 'Poulet grille', 'Pollo a la plancha', 'Gegrilltes Huehnchen', 'poultry_mains', 'dinner', 26, 2, 11, 'grilled'),
  B(`تشي سامغي تانغ ${T}`, 'Ginseng chicken soup', 'Soupe de poulet au ginseng', 'Sopa de pollo con ginseng', 'Ginseng-Huehnersuppe', 'poultry_mains', 'dinner', 22, 8, 11, 'simmered'),
  B(`داك بوكم ${T}`, 'Spicy stir-fried chicken', 'Poulet releve saute', 'Pollo picante salteado', 'Scharfes gebratenes Huehnchen', 'poultry_mains', 'dinner', 24, 12, 12, 'stir-fried'),
  B(`تشيز داكغالبي ${T}`, 'Cheese-topped chicken galbi', 'Galbi de poulet au fromage', 'Galbi de pollo con queso', 'Huhn-Galbi mit Kaese', 'poultry_mains', 'dinner', 25, 11, 14, 'grilled'),
  B(`داك غانغجونغ ${T}`, 'Sweet and spicy glazed chicken', 'Poulet laque sucre-releve', 'Pollo glaseado dulce y picante', 'Glaesiertes suess-scharfes Huehnchen', 'poultry_mains', 'dinner', 23, 15, 12, 'grilled'),
  B(`ماون داكغالبي ${T}`, 'Extra spicy dakgalbi', 'Dakgalbi tres releve', 'Dakgalbi extra picante', 'Extra-scharfes Dakgalbi', 'poultry_mains', 'dinner', 25, 12, 13, 'stir-fried'),
  B(`داك بال ${T}`, 'Braised chicken feet', 'Pattes de poulet braisees', 'Patas de pollo guisadas', 'Geschmorte Huhnfuesse', 'poultry_mains', 'snacks', 20, 10, 12, 'simmered'),
  B(`داك نوري ${T}`, 'Poached chicken breast', 'Poitrine de poulet pochee', 'Pechuga de pollo cocida', 'Gekochte Huhnbrust', 'poultry_mains', 'dinner', 26, 2, 9, 'simmered'),

  // --- meat_mains (18) ---
  B(`غالبي لحم البقر ${T}`, 'Grilled beef ribs', 'Cotes de boeuf grillees', 'Costillas de ternera a la plancha', 'Gegrillte Rinderrippen', 'meat_mains', 'dinner', 26, 5, 16, 'grilled'),
  B(`غان جانغ غالبي ${T}`, 'Soy-marinated beef ribs', 'Cotes de boeuf marinees au soja', 'Costillas de ternera marinadas con soja', 'Sojemariniertes Rindfleisch-Rippen', 'meat_mains', 'dinner', 25, 10, 14, 'grilled'),
  B(`شوت بول غالبي ${T}`, 'Charcoal-grilled beef ribs', 'Cotes de boeuf grillees au charbon', 'Costillas a la parrilla de carbon', 'Ueber Holzkohle gegrillte Rinderrippen', 'meat_mains', 'dinner', 27, 5, 16, 'grilled'),
  B(`إل إيه غالبي ${T}`, 'LA-style beef ribs', 'Cotes de boeuf a la californienne', 'Costillas estilo Los Angeles', 'Rinderrippen im LA-Stil', 'meat_mains', 'dinner', 26, 12, 15, 'grilled'),
  B(`يانيوم غالبي ${T}`, 'Spicy marinated ribs', 'Cotes de boeuf marinees relevees', 'Costillas de ternera marinadas picantes', 'Scharfes mariniertes Rindfleisch-Rippen', 'meat_mains', 'dinner', 25, 11, 14, 'grilled'),
  B(`سوغاليبي سال ${T}`, 'Beef rib plate', 'Assiette de cotes de boeuf', 'Plato de costillas de ternera', 'Rinderripchenplatte', 'meat_mains', 'dinner', 26, 4, 17, 'grilled'),
  B(`غات سال ${T}`, 'Beef brisket plate', 'Assiette de poitrine de boeuf', 'Plato de brisket de ternera', 'Rinderbrustplatte', 'meat_mains', 'dinner', 25, 4, 16, 'grilled'),
  B(`دوسيم ${T}`, 'Beef sirloin steak', 'Steak de faux-filet de boeuf', 'Filete de solomillo de ternera', 'Rinderfilet-Steak', 'meat_mains', 'dinner', 27, 2, 15, 'grilled'),
  B(`جيه يوك لحم البقر ${T}`, 'Spicy stir-fried beef', 'Boeuf releve saute', 'Ternera picante salteada', 'Scharfes gebratenes Rindfleisch', 'meat_mains', 'dinner', 24, 12, 13, 'stir-fried'),
  B(`يوكغي جانغ لحم البقر ${T}`, 'Beef yukgaejang soup', 'Soup yukgaejang au boeuf', 'Sopa yukgaejang de ternera', 'Rindfleisch-Yukgaejang', 'meat_mains', 'dinner', 20, 8, 11, 'simmered'),
  B(`يوكهوي ${T}`, 'Yukhoe beef tartare', 'Tartare de boeuf cru', 'Tartar de ternera crudo', 'Rindertatar', 'meat_mains', 'dinner', 22, 4, 13, 'raw'),
  B(`بوسوت سوجوجي ${T}`, 'Beef with mushrooms', 'Boeuf aux champignons', 'Ternera con hongos', 'Rindfleisch mit Pilzen', 'meat_mains', 'dinner', 24, 9, 12, 'stir-fried'),
  B(`غالبي سانتشي ${T}`, 'Ribs with mountain vegetables', 'Cotes de boeuf aux legumes de montagne', 'Costillas con verduras de montana', 'Rinderrippen mit Berggemuese', 'meat_mains', 'dinner', 24, 14, 12, 'simmered'),
  B(`سوجوجي بوكم ${T}`, 'Stir-fried beef', 'Boeuf saute', 'Ternera salteada', 'Gebratenes Rindfleisch', 'meat_mains', 'dinner', 25, 10, 13, 'stir-fried'),
  B(`سوجوجي جيجي ${T}`, 'Beef stew', 'Ragoût de boeuf', 'Guiso de ternera', 'Rindfleisch-Eintopf', 'meat_mains', 'dinner', 23, 12, 12, 'simmered'),
  B(`بوسوت جيجي ${T}`, 'Mushroom stew', 'Ragoût aux champignons', 'Guiso de hongos', 'Pilz-Eintopf', 'meat_mains', 'dinner', 14, 15, 9, 'simmered'),
  B(`سوجوجي كوتليت ${T}`, 'Beef cutlet', 'Escalope de boeuf', 'Escalope de ternera', 'Rindlede-Schnitzel', 'meat_mains', 'dinner', 24, 12, 12, 'pan-fried'),
  B(`غالبي أفن ${T}`, 'Oven-baked beef ribs', 'Cotes de boeuf au four', 'Costillas de ternera al horno', 'Ofen-gebackene Rinderrippen', 'meat_mains', 'dinner', 25, 11, 14, 'grilled'),
];
