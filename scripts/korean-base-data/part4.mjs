// Korean base part 4 of 6: fish_seafood (18) + vegetable_mains (18) = 36 rows.
// Halal notes: every fish/shellfish dish is halal by construction. Cooking wine is
// replaced with rice vinegar. No pork, no alcohol. All names in pure Arabic script.
import { B, T } from './rows.mjs';

export default [
  // --- fish_seafood (18) ---
  B(`شوروبي ${T}`, 'Grilled mackerel', 'Maquereau grille', 'Caballa a la plancha', 'Gegrillte Makrele', 'fish_seafood', 'dinner', 22, 4, 14, 'grilled'),
  B(`غالتشي غوي ${T}`, 'Grilled hairtail', 'Poisson-ruban grille', 'Cinuron de pez a la plancha', 'Gegrillter Haifischruecken', 'fish_seafood', 'dinner', 21, 4, 13, 'grilled'),
  B(`كودورو غوي ${T}`, 'Grilled mackerel fillet', 'Maquereau grille en filet', 'Caballa en filete a la plancha', 'Gegrilltes Makrelenfilet', 'fish_seafood', 'dinner', 22, 3, 14, 'grilled'),
  B(`سامتشي غوي ${T}`, 'Grilled Spanish mackerel', 'Maquereau grille a l espagnol', 'Caballa espanola a la plancha', 'Gegrillte spanische Makrele', 'fish_seafood', 'dinner', 21, 4, 13, 'grilled'),
  B(`ناكجي بوكم ${T}`, 'Stir-fried octopus', 'Poulpe saute', 'Pulpo salteado', 'Gebratener Oktopus', 'fish_seafood', 'dinner', 20, 10, 9, 'stir-fried'),
  B(`مونغو بوكم ${T}`, 'Stir-fried squid', 'Calmar saute', 'Calamar salteado', 'Gebratene Kalmaringe', 'fish_seafood', 'dinner', 19, 10, 8, 'stir-fried'),
  B(`هايمول بجن ${T}`, 'Seafood pancake', 'Pancake aux fruits de mer', 'Panqueque de mariscos', 'Meeresfruechte-Pfannkuchen', 'fish_seafood', 'snacks', 14, 26, 9, 'pan-fried'),
  B(`كيمتشي جون ${T}`, 'Kimchi pancake', 'Pancake au kimchi', 'Panqueque de kimchi', 'Kimchi-Pfannkuchen', 'fish_seafood', 'snacks', 8, 28, 8, 'pan-fried'),
  B(`هايمول بخار ${T}`, 'Steamed seafood', 'Fruits de mer a la vapeur', 'Mariscos al vapor', 'Gedampfte Meeresfruechte', 'fish_seafood', 'dinner', 22, 8, 9, 'steamed'),
  B(`ساوي غوي ${T}`, 'Grilled prawns', 'Crevettes grillees', 'Camarones a la plancha', 'Gegrillte Garnelen', 'fish_seafood', 'dinner', 22, 4, 12, 'grilled'),
  B(`ساوي بوكم ${T}`, 'Stir-fried prawns', 'Crevettes sautees', 'Camarones salteados', 'Gebratene Garnelen', 'fish_seafood', 'dinner', 21, 8, 11, 'stir-fried'),
  B(`أوجينغو بوكم ${T}`, 'Stir-fried small squid', 'Petit calmar saute', 'Calamar pequeno salteado', 'Gebratener Kalmaring', 'fish_seafood', 'dinner', 19, 9, 8, 'stir-fried'),
  B(`جوجي غوي ${T}`, 'Grilled clams', 'Palourdes grillees', 'Almejas a la plancha', 'Gegrillte Muscheln', 'fish_seafood', 'dinner', 17, 6, 7, 'grilled'),
  B(`هونغو غوي ${T}`, 'Grilled eel', 'Anguille grillee', 'Anguila a la plancha', 'Gegrillter Aal', 'fish_seafood', 'dinner', 22, 2, 16, 'grilled'),
  B(`غاداشي غوي ${T}`, 'Grilled Spanish mackerel fillet', 'Filet de maquereau grille', 'Filete de caballa a la plancha', 'Gegrilltes spanisches Makrelenfilet', 'fish_seafood', 'dinner', 20, 4, 12, 'grilled'),
  B(`سايونسون جوريم ${T}`, 'Braised fish with vegetables', 'Poisson braise aux legumes', 'Pescado guisado con verduras', 'Fisch mit Gemuese geschmort', 'fish_seafood', 'dinner', 19, 12, 8, 'simmered'),
  B(`أوموك بوكم ${T}`, 'Stir-fried fish cake', 'Gateaux de poisson sautes', 'Pastel de pescado salteado', 'Gebratener Fischkuchen', 'fish_seafood', 'snacks', 14, 16, 8, 'stir-fried'),
  B(`ميوك جوجي غوك ${T}`, 'Seaweed and clam soup', 'Soupe aux algues et aux palourdes', 'Sopa de algas y almejas', 'Meersalzen-Muschel-Suppe', 'fish_seafood', 'dinner', 14, 10, 5, 'simmered'),

  // --- vegetable_mains (18) ---
  B(`بيوك كيمتشي ${T}`, 'Napa cabbage kimchi', 'Kimchi de chou chinois', 'Kimchi de col china', 'Kimchi aus Chinakohl', 'vegetable_mains', 'side', 2, 9, 1, 'fermented'),
  B(`كاكدوكي ${T}`, 'Cubed radish kimchi', 'Kimchi de radis en cubes', 'Kimchi de rábano en dados', 'Wuerfel-Rettich-Kimchi', 'vegetable_mains', 'side', 2, 8, 1, 'fermented'),
  B(`تشونغغاك كيمتشي ${T}`, 'Green radish kimchi', 'Kimchi de radis vert', 'Kimchi de rábano verde', 'Kimchi aus gruenem Rettich', 'vegetable_mains', 'side', 2, 9, 1, 'fermented'),
  B(`يولمو كيمتشي ${T}`, 'Young radish kimchi', 'Kimchi de radis jeune', 'Kimchi de rábano tierno', 'Kimchi aus jungem Rettich', 'vegetable_mains', 'side', 2, 8, 1, 'fermented'),
  B(`أوي صوباكي ${T}`, 'Stuffed cucumber kimchi', 'Kimchi de concombre farci', 'Pepino encurtido relleno', 'Gefuellte Gurken-Kimchi', 'vegetable_mains', 'side', 2, 10, 1, 'fermented'),
  B(`دونغتشيمي ${T}`, 'Radish water kimchi', 'Kimchi liquide de radis', 'Kimchi liquido de rábano', 'Rettichwasser-Kimchi', 'vegetable_mains', 'side', 2, 7, 0, 'fermented'),
  B(`بوتشو كيمتشي ${T}`, 'Radish and cucumber kimchi', 'Kimchi de radis et de concombre', 'Kimchi de rábano y pepino', 'Rettich-Gurken-Kimchi', 'vegetable_mains', 'side', 2, 9, 1, 'fermented'),
  B(`غوجي نامول ${T}`, 'Stir-fried eggplant', 'Aubergine sautee', 'Berenjena salteada', 'Gebratene Aubergine', 'vegetable_mains', 'side', 2, 10, 4, 'stir-fried'),
  B(`غامجا تيمغيم ${T}`, 'Sweet potato fritters', 'Beignets de patate douce', 'Empanadillas de boniato', 'Suesskartoffel-Fritten', 'vegetable_mains', 'snacks', 4, 26, 10, 'fried'),
  B(`تانغسو غوي ${T}`, 'Roasted sweet potato', 'Patate douce grillee', 'Batata asada', 'Gerostete Suesskartoffel', 'vegetable_mains', 'snacks', 2, 24, 1, 'grilled'),
  B(`ياتشي تيمغيم ${T}`, 'Vegetable fritters', 'Beignets de legumes', 'Empanadillas de verduras', 'Gemuese-Gebrat', 'vegetable_mains', 'snacks', 6, 26, 11, 'fried'),
  B(`هوباك جون ${T}`, 'Zucchini pancake', 'Pancake de courgette', 'Panqueque de calabacín', 'Zucchini-Pfannkuchen', 'vegetable_mains', 'snacks', 5, 20, 8, 'pan-fried'),
  B(`بوسوت بوكم ${T}`, 'Stir-fried mushrooms', 'Champignons sautes', 'Hongos salteados', 'Gebratene Pilze', 'vegetable_mains', 'side', 4, 8, 6, 'stir-fried'),
  B(`دوبو غوي ${T}`, 'Grilled tofu', 'Tofu grille', 'Tofu a la plancha', 'Gegrillter Tofu', 'vegetable_mains', 'side', 12, 4, 7, 'grilled'),
  B(`نيوتاري بوسوت ${T}`, 'Enoki mushrooms', 'Champignons enoki', 'Hongos enoki', 'Enoki-Pilze', 'vegetable_mains', 'side', 4, 7, 1, 'simmered'),
  B(`دوراجي موتشيم ${T}`, 'Seasoned bellflower root', 'Racine de campanule assaisonnee', 'Raiz de campanilla sazonada', 'Wuerzige Glockenblumenwurzel', 'vegetable_mains', 'side', 3, 9, 1, 'simmered'),
  B(`غوصاري ${T}`, 'Seasoned fernbrake', 'Fougere marine assaisonnee', 'Helecho marino sazonado', 'Wuerziger Seefarn', 'vegetable_mains', 'side', 3, 8, 2, 'simmered'),
  B(`مولغوكي ${T}`, 'Watercress salad', 'Cresson de fontaine', 'Berro de agua', 'Brunnenkresse-Salat', 'vegetable_mains', 'side', 4, 4, 1, 'raw'),
];
