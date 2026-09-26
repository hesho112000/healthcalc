// Authoring script for the Malaysian 300-dish proposal (scripts/malaysia-300-proposal.json).
// R(ar, en, fr, es, de, category, mealType, region, cal_100, protein, carbs, fat).
// Macronutrients may be authored explicitly (grams per 100 g); otherwise they are estimated
// from a per-category template. cal_100 is ALWAYS recomputed as round(4P + 4C + 9F) of the
// final macros, so calories and macros are internally consistent and never NULL. Regions:
// pan_malaysian by default (golden rule), regional anchors for famous authentic dishes
// (peninsular_malaysia / borneo), asian_shared for dishes shared across South-East Asia.
// Emphasizes Malaysian staples (nasi lemak variants, rendang, laksa, satay, char kway teow).
// Every Arabic name carries a ماليزي token (halal profile: no pork dishes).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat) => ({
  name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat,
});

const dishes = [];

// ============================================================ PAN_MALAYSIAN + REGIONAL (300)
// --- breakfast_items (24) -----------------------------------------------------
dishes.push(
  R('ناسي ليماك ماليزي', 'Nasi lemak Malaysian coconut rice with sambal', 'Riz au coco nasi lemak malaisien', 'Arroz con coco nasi lemak malasio', 'Malaysischer Nasi-Lemak-Kokosreis', 'breakfast_items', 'breakfast', 'pan_malaysian', 330),
  R('ناسي ليماك بونغكوس ماليزي', 'Nasi lemak bungkus Malaysian wrapped coconut rice', 'Riz coco enveloppé nasi lemak bungkus malaisien', 'Arroz con coco envuelto nasi lemak bungkus malasio', 'Malaysischer eingewickelter Nasi-Lemak-Kokosreis', 'breakfast_items', 'breakfast', 'pan_malaysian', 345),
  R('ناسي ليماك رينداغ ماليزي', 'Nasi lemak rendang Malaysian rice with beef rendang', 'Riz coco au rendang de bœuf nasi lemak malaisien', 'Arroz con coco y rendang de res nasi lemak malasio', 'Malaysischer Nasi-Lemak-Reis mit Rindrendang', 'breakfast_items', 'breakfast', 'pan_malaysian', 385),
  R('ناسي ليماك إيكان بيليس ماليزي', 'Nasi lemak ikan bilis Malaysian rice with fried anchovies', 'Riz coco aux anchois frits nasi lemak ikam bilis malaisien', 'Arroz con coco y anchoas fritas nasi lemak ikan bilis malasio', 'Malaysischer Nasi-Lemak-Reis mit fritierten Anchovis', 'breakfast_items', 'breakfast', 'pan_malaysian', 335),
  R('ناسي كيرابو ماليزي', 'Nasi kerabu Malaysian blue flower rice salad bowl', 'Riz bleu nasi kerabu malaisien', 'Arroz azul nasi kerabu malasio', 'Malaysischer Nasi-Kerabu-Blaukrautreis', 'breakfast_items', 'breakfast', 'peninsular_malaysia', 285),
  R('ناسي داغانغ ماليزي', 'Nasi dagang Malaysian Terengganu curry rice', 'Riz au curry nasi dagang de Terengganu malaisien', 'Arroz al curry nasi dagang de Terengganu malasio', 'Malaysischer Nasi-Dagang-Curryreis aus Terengganu', 'breakfast_items', 'breakfast', 'peninsular_malaysia', 325),
  R('ناسي غورينغ كامبونغ ماليزي', 'Nasi goreng kampung Malaysian village fried rice', 'Riz frit campagnard nasi goreng kampung malaisien', 'Arroz frito de pueblo nasi goreng kampung malasio', 'Malaysischer Nasi-Goreng-Kampung-Dorferis', 'breakfast_items', 'breakfast', 'pan_malaysian', 365),
  R('ناسي غورينغ أيام ماليزي', 'Nasi goreng ayam Malaysian chicken fried rice', 'Riz frit au poulet nasi goreng ayam malaisien', 'Arroz frito con pollo nasi goreng ayam malasio', 'Malaysischer Nasi-Goreng-Ayam-Hühnerreis', 'breakfast_items', 'breakfast', 'pan_malaysian', 355),
  R('ناسي غورينغ بيتاي سامبال ماليزي', 'Nasi goreng petai sambal Malaysian stink bean fried rice', 'Riz frit aux haricots puants et sambal nasi goreng petai malaisien', 'Arroz frito con habas olorosas y sambal nasi goreng petai malasio', 'Malaysischer Nasi-Goreng-Petai-Sambal-Reis', 'breakfast_items', 'breakfast', 'pan_malaysian', 340),
  R('ناسي غورينغ تلور ماليزي', 'Nasi goreng telur Malaysian egg fried rice', 'Riz frit aux œufs nasi goreng telur malaisien', 'Arroz frito con huevo nasi goreng telur malasio', 'Malaysischer Nasi-Goreng-Telur-Eierreis', 'breakfast_items', 'breakfast', 'pan_malaysian', 350),
  R('مي غورينغ ماماك ماليزي', 'Mee goreng mamak Malaysian mamak fried noodles', 'Nouilles sautées mamak mee goreng malaisiennes', 'Tallarines fritos mamak mee goreng malasios', 'Malaysische Mee-Goreng-Mamak-Nudeln', 'breakfast_items', 'breakfast', 'pan_malaysian', 355),
  R('مي غورينغ ماليزي', 'Mee goreng Malaysian fried yellow noodles', 'Nouilles jaunes sautées mee goreng malaisiennes', 'Tallarines amarillos fritos mee goreng malasios', 'Malaysische gebratene Mee-Goreng-Nudeln', 'breakfast_items', 'breakfast', 'pan_malaysian', 335),
  R('مي ريبوس ماليزي', 'Mee rebus Malaysian noodle in sweet potato gravy', 'Nouilles au bouillon de patate douce mee rebus malaisiennes', 'Tallarines en salsa de boniato mee rebus malasios', 'Malaysische Mee-Rebus-Nudeln in Süßkartoffelsoße', 'breakfast_items', 'breakfast', 'pan_malaysian', 285),
  R('مي باندونغ ماماك ماليزي', 'Mee bandung mamak Malaysian Mamak noodle soup', 'Soupe de nouilles mamak mee bandung malaisienne', 'Sopa de tallarines mamak mee bandung malasia', 'Malaysische Mee-Bandung-Mamak-Nudelsuppe', 'breakfast_items', 'breakfast', 'pan_malaysian', 300),
  R('بوبور أيام ماليزي', 'Bubur ayam Malaysian chicken congee', 'Congee au poulet bubur ayam malaisien', 'Congee con pollo bubur ayam malasio', 'Malaysischer Bubur-Ayam-Hühnerbrei', 'breakfast_items', 'breakfast', 'pan_malaysian', 215),
  R('بوبور ناسي داغينغ ماليزي', 'Bubur nasi daging Malaysian beef congee', 'Congee au bœuf bubur nasi daging malaisien', 'Congee con res bubur nasi daging malasio', 'Malaysischer Bubur-Nasi-Daging-Rindfleischbrei', 'breakfast_items', 'breakfast', 'pan_malaysian', 220),
  R('تشي تشيونغ فن ماليزي', 'Chee cheong fun Malaysian steamed rice rolls', 'Rouleaux de riz vapeur chee cheong fun malaisiens', 'Rollos de arroz al vapor chee cheong fun malasios', 'Malaysische Chee-Cheong-Fun-Reisrollen', 'breakfast_items', 'breakfast', 'pan_malaysian', 265),
  R('بان مي ماليزي', 'Pan mee Malaysian hand torn noodle soup', 'Soupe de nouilles déchirées pan mee malaisienne', 'Sopa de tallarines desgarrados pan mee malasia', 'Malaysische Pan-Mee-Handrissnudeln', 'breakfast_items', 'breakfast', 'pan_malaysian', 255),
  R('ناسي مينياك تيرنغانو ماليزي', 'Nasi minyak Terengganu Malaysian spiced butter rice', 'Riz au beurre épicé nasi minyak de Terengganu malaisien', 'Arroz con mantequilla especiado nasi minyak de Terengganu malasio', 'Malaysischer Nasi-Minyak-Butterreis aus Terengganu', 'breakfast_items', 'breakfast', 'peninsular_malaysia', 320),
  R('ناسي أولام ماليزي', 'Nasi ulam Malaysian herbed rice with ulam salad', 'Riz aux herbes nasi ulam malaisien', 'Arroz con hierbas nasi ulam malasio', 'Malaysischer Nasi-Ulam-Krauterreis', 'breakfast_items', 'breakfast', 'pan_malaysian', 265),
  R('بوبور بيداس ماليزي', 'Bubur pedas Malaysian Sarawak spiced porridge', 'Porridge épicé bubur pedas de Sarawak malaisien', 'Gachas especiadas bubur pedas de Sarawak malasias', 'Malaysischer Bubur-Pedas-Gewurzbrei aus Sarawak', 'breakfast_items', 'breakfast', 'borneo', 240),
  R('مي تواران ماليزي', 'Tuaran mee Malaysian Sabah egg noodle', 'Nouilles aux œufs tuaran mee de Sabah malaisiennes', 'Tallarines con huevo tuaran mee de Sabah malasios', 'Malaysische Tuaran-Mee-Eiernudeln aus Sabah', 'breakfast_items', 'breakfast', 'borneo', 320),
  R('مي غورينغ سيفود ماليزي', 'Mee goreng seafood Malaysian seafood fried noodles', 'Nouilles sautées aux fruits de mer mee goreng seafood malaisiennes', 'Tallarines fritos con mariscos mee goreng seafood malasios', 'Malaysische Mee-Goreng-Meeresfrüchte-Nudeln', 'breakfast_items', 'breakfast', 'pan_malaysian', 360),
  R('ناسي ليماك كاري ماليزي', 'Nasi lemak curry Malaysian coconut rice with curry gravy', 'Riz coco à la sauce curry nasi lemak curry malaisien', 'Arroz con coco y salsa curry nasi lemak curry malasio', 'Malaysischer Nasi-Lemak-Reis mit Currysauce', 'breakfast_items', 'breakfast', 'pan_malaysian', 360),
);
// --- breads_flatbreads (20) ---------------------------------------------------
dishes.push(
  R('روتي كاناي ماليزي', 'Roti canai Malaysian flaky flatbread', 'Pain plat feuilleté roti canai malaisien', 'Pan plano hojaldrado roti canai malasio', 'Malaysisches Roti-Canai-Blatthbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 260),
  R('روتي تلور ماليزي', 'Roti telur Malaysian egg stuffed flatbread', 'Pain plat farci à l œuf roti telur malaisien', 'Pan plano relleno de huevo roti telur malasio', 'Malaysisches Roti-Telur-Eierfladenbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 300),
  R('روتي باوانغ ماليزي', 'Roti bawang Malaysian onion flatbread', 'Pain plat à l oignon roti bawang malaisien', 'Pan plano con cebolla roti bawang malasio', 'Malaysisches Roti-Bawang-Zwiebelbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 290),
  R('روتي بيزانغ ماليزي', 'Roti pisang Malaysian banana stuffed flatbread', 'Pain plat farci à la banane roti pisang malaisien', 'Pan plano relleno de plátano roti pisang malasio', 'Malaysisches Roti-Pisang-Bananenbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 320),
  R('روتي ساردين ماليزي', 'Roti sardin Malaysian sardine stuffed flatbread', 'Pain plat farci aux sardines roti sardin malaisien', 'Pan plano relleno de sardinas roti sardin malasio', 'Malaysisches Roti-Sardin-Sardinenbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 310),
  R('روتي بلانتا ماليزي', 'Roti planta Malaysian margarine flatbread', 'Pain plat à la margarine roti planta malaisien', 'Pan plano con margarina roti planta malasio', 'Malaysisches Roti-Planta-Margarinebrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 330),
  R('روتي بوم ماليزي', 'Roti boom Malaysian crispy butter flatbread', 'Pain plat croustillant au beurre roti boom malaisien', 'Pan plano crujiente con mantequilla roti boom malasio', 'Malaysisches knuspriges Roti-Boom-Butterbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 340),
  R('روتي باكار ماليزي', 'Roti bakar Malaysian toasted bread', 'Pain grillé roti bakar malaisien', 'Pan tostado roti bakar malasio', 'Malaysisches Roti-Bakar-Toastbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 280),
  R('روتي كاهوين ماليزي', 'Roti kahwin Malaysian butter jam toast', 'Toast beurre et confiture roti kahwin malaisien', 'Tostada con mantequilla y mermelada roti kahwin malasia', 'Malaysisches Roti-Kahwin-Butter-Marmeladen-Toast', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 295),
  R('روتي جون ماليزي', 'Roti john Malaysian egg and onion baguette', 'Baguette œuf et oignon roti john malaisienne', 'Baguette con huevo y cebolla roti john malasia', 'Malaysisches Roti-John-Eier-Zwiebel-Baguette', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 350),
  R('روتي جالا ماليزي', 'Roti jala Malaysian lacy crepe with curry', 'Crêpe dentelle roti jala malaisienne au curry', 'Crepe de encaje roji jala malasia con curry', 'Malaysische Roti-Jala-Spitzencrepe', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 240),
  R('روتي بنغالي ماليزي', 'Roti benggali Malaysian sweet bread bun', 'Petit pain sucré roti benggali malaisien', 'Panecillo dulce roti benggali malasio', 'Malaysisches Roti-Benggali-Sußbrot', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 230),
  R('ثوساي ماليزي', 'Thosai Malaysian fermented rice lentil crepe', 'Crêpe fermentée riz lentille thosai malaise', 'Crepe fermentado de arroz y lenteja thosai malasio', 'Malaysische Thosai-Fermentcrepe', 'breads_flatbreads', 'breakfast', 'asian_shared', 210),
  R('ثوساي تلور ماليزي', 'Thosai telur Malaysian egg thosai', 'Crêpe thosai à l œuf malaisien', 'Thosai con huevo malasio', 'Malaysische Thosai-Telur-Eiercrepe', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 260),
  R('ثوساي ماسالا ماليزي', 'Thosai masala Malaysian spiced potato thosai', 'Crêpe thosai à la pomme de terre épicée malaisienne', 'Thosai con papa especiada malasio', 'Malaysische Thosai-Masala-Kartoffelcrepe', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 245),
  R('أبام ماليزي', 'Appam Malaysian coconut toddy pancake', 'Crêpe au lait de coco appam malaisienne', 'Panqueque de coco appam malasio', 'Malaysische Appam-Kokospfannkuchen', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 200),
  R('تشاباتي ماليزي', 'Chapati Malaysian whole wheat flatbread', 'Pain plat de blé complet chapati malaisien', 'Pan plano integral chapati malasio', 'Malaysisches Chapati-Vollkornfladenbrot', 'breads_flatbreads', 'breakfast', 'asian_shared', 240),
  R('نان ماليزي', 'Naan Malaysian tandoor bread', 'Pain tandoor naan malaisien', 'Pan tandoor naan malasio', 'Malaysisches Naan-Tandoorbrot', 'breads_flatbreads', 'breakfast', 'asian_shared', 250),
  R('روتي ماري ماليزي', 'Roti Mary Malaysian egg cheese toast', 'Toast œuf fromage roti Mary malaisien', 'Tostada con huevo y queso roti Mary malasia', 'Malaysisches Roti-Mary-Eier-Käse-Toast', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 300),
  R('روتي باكار كايا ماليزي', 'Roti bakar kaya Malaysian coconut jam toast', 'Toast à la confiture coco roti bakar kaya malaisien', 'Tostada con mermelada de coco roti bakar kaya malasia', 'Malaysisches Roti-Bakar-Kaya-Kokos-Toast', 'breads_flatbreads', 'breakfast', 'pan_malaysian', 305),
);
// --- rice_biryani (30) --------------------------------------------------------
dishes.push(
  R('ناسي كاندار ماليزي', 'Nasi kandar Malaysian Penang curry rice', 'Riz curry de Penang nasi kandar malaisien', 'Arroz al curry de Penang nasi kandar malasio', 'Malaysischer Nasi-Kandar-Curryreis aus Penang', 'rice_biryani', 'lunch', 'peninsular_malaysia', 380),
  R('ناسي كاندار أيام ماليزي', 'Nasi kandar ayam Malaysian chicken curry rice', 'Riz au curry de poulet nasi kandar malaisien', 'Arroz con curry de pollo nasi kandar malasio', 'Malaysischer Nasi-Kandar-Hühnercurryreis', 'rice_biryani', 'lunch', 'peninsular_malaysia', 385),
  R('ناسي كاندار داغينغ رينداغ ماليزي', 'Nasi kandar rendang beef Malaysian rendang rice plate', 'Riz au rendang de bœuf nasi kandar malaisien', 'Arroz con rendang de res nasi kandar malasio', 'Malaysischer Nasi-Kandar-Rendang-Rindfleischreis', 'rice_biryani', 'lunch', 'peninsular_malaysia', 420),
  R('ناسي برياني ماليزي', 'Nasi briyani Malaysian spiced rice', 'Riz épicé nasi briyani malaisien', 'Arroz especiado nasi briyani malasio', 'Malaysischer Nasi-Briyani-Gewürzreis', 'rice_biryani', 'lunch', 'asian_shared', 400),
  R('ناسي برياني أيام ماليزي', 'Nasi briyani ayam Malaysian chicken briyani', 'Briyani de poulet nasi briyani ayam malaisien', 'Biryani de pollo nasi briyani ayam malasio', 'Malaysischer Nasi-Briyani-Ayam-Hühnerreis', 'rice_biryani', 'lunch', 'pan_malaysian', 410),
  R('ناسي برياني داغينغ ماليزي', 'Nasi briyani daging Malaysian beef briyani', 'Briyani de bœuf nasi briyani daging malaisien', 'Biryani de res nasi briyani daging malasio', 'Malaysischer Nasi-Briyani-Daging-Rindfleischreis', 'rice_biryani', 'lunch', 'pan_malaysian', 430),
  R('ناسي برياني غام ماليزي', 'Nasi briyani gam Malaysian gam rice biryani', 'Briyani rare nasi briyani gam malaisien', 'Biryani gam nasi briyani gam malasio', 'Malaysischer Nasi-Briyani-Gam-Reis', 'rice_biryani', 'lunch', 'pan_malaysian', 420),
  R('ناسي تومات ماليزي', 'Nasi tomato Malaysian tomato rice', 'Riz à la tomate nasi tomato malaisien', 'Arroz con tomate nasi tomato malasio', 'Malaysischer Nasi-Tomato-Tomatenreis', 'rice_biryani', 'lunch', 'pan_malaysian', 330),
  R('ناسي هوجان باناس ماليزي', 'Nasi hujan panas Malaysian rainbow rice', 'Riz arc en ciel nasi hujan panas malaisien', 'Arroz arco iris nasi hujan panas malasio', 'Malaysischer Nasi-Hujan-Panas-Regenbogenreis', 'rice_biryani', 'lunch', 'pan_malaysian', 340),
  R('ناسي كامبور أيام ماليزي', 'Nasi campur ayam Malaysian mixed rice with chicken', 'Riz mélangé au poulet nasi campur malaisien', 'Arroz mixto con pollo nasi campur malasio', 'Malaysischer Nasi-Campur-Hühnermischreis', 'rice_biryani', 'lunch', 'pan_malaysian', 360),
  R('ناسي كامبور داغينغ سومبور ماليزي', 'Nasi campur daging sambal Malaysian mixed rice beef sambal', 'Riz mélangé au bœuf sambal nasi campur malaisien', 'Arroz mixto con res sambal nasi campur malasio', 'Malaysischer Nasi-Campur-Rind-Sambal-Mischreis', 'rice_biryani', 'lunch', 'pan_malaysian', 380),
  R('ناسي غورينغ أودانغ ماليزي', 'Nasi goreng udang Malaysian prawn fried rice', 'Riz frit aux crevettes nasi goreng udang malaisien', 'Arroz frito con camarones nasi goreng udang malasio', 'Malaysischer Nasi-Goreng-Udang-Garnelenreis', 'rice_biryani', 'lunch', 'pan_malaysian', 355),
  R('ناسي غورينغ سيفود ماليزي', 'Nasi goreng seafood Malaysian seafood fried rice', 'Riz frit aux fruits de mer nasi goreng seafood malaisien', 'Arroz frito con mariscos nasi goreng seafood malasio', 'Malaysischer Nasi-Goreng-Meeresfrüchte-Reis', 'rice_biryani', 'lunch', 'pan_malaysian', 360),
  R('ناسي غورينغ بيلاكان ماليزي', 'Nasi goreng belacan Malaysian shrimp paste fried rice', 'Riz frit à la pâte de crevettes nasi goreng belacan malaisien', 'Arroz frito con pasta de camarón nasi goreng belacan malasio', 'Malaysischer Nasi-Goreng-Belacan-Garnelempastareis', 'rice_biryani', 'lunch', 'pan_malaysian', 350),
  R('ناسي غورينغ كورنت ماليزي', 'Nasi goreng kornet Malaysian corned beef fried rice', 'Riz frit au corned-beef nasi goreng kornet malaisien', 'Arroz frito con carne enlatada nasi goreng kornet malasio', 'Malaysischer Nasi-Goreng-Kornet-Corned-Beef-Reis', 'rice_biryani', 'lunch', 'pan_malaysian', 350),
  R('ناسي غورينغ سوسيس ماليزي', 'Nasi goreng sosej Malaysian sausage fried rice', 'Riz frit à la saucisse nasi goreng sosej malaisien', 'Arroz frito con salchicha nasi goreng sosej malasio', 'Malaysischer Nasi-Goreng-Sosej-Wurstreis', 'rice_biryani', 'lunch', 'pan_malaysian', 365),
  R('ناسي غورينغ ميلايو ماليزي', 'Nasi goreng Melayu Malaysian Malay fried rice', 'Riz frit malais nasi goreng Melayu', 'Arroz frito malayo nasi goreng Melayu', 'Malaysischer Nasi-Goreng-Melayu-Reis', 'rice_biryani', 'lunch', 'peninsular_malaysia', 350),
  R('ناسي داغينغ ماساك ميراه ماليزي', 'Nasi daging masak merah Malaysian red beef rice', 'Riz au bœuf rouge nasi daging masak merah malaisien', 'Arroz con res roja nasi daging masak merah malasio', 'Malaysischer Nasi-Daging-Masak-Merah-Reis', 'rice_biryani', 'lunch', 'pan_malaysian', 390),
  R('ناسي أيام ماساك ميراه ماليزي', 'Nasi ayam masak merah Malaysian red chicken rice', 'Riz au poulet rouge nasi ayam masak merah malaisien', 'Arroz con pollo rojo nasi ayam masak merah malasio', 'Malaysischer Nasi-Ayam-Masak-Merah-Reis', 'rice_biryani', 'lunch', 'pan_malaysian', 370),
  R('ناسي أيام هينان ماليزي', 'Nasi ayam Hainan Malaysian Hainanese chicken rice', 'Riz au poulet hainanais nasi ayam malaisien', 'Arroz con pollo hainanés nasi ayam malasio', 'Malaysischer Nasi-Ayam-Hainan-Hähnchenreis', 'rice_biryani', 'lunch', 'peninsular_malaysia', 360),
  R('لونتوغ ماليزي', 'Lontong Malaysian compressed rice cake', 'Gâteau de riz compressé lontong malaisien', 'Pastel de arroz comprimido lontong malasio', 'Malaysischer Lontong-Reiskuchen', 'rice_biryani', 'lunch', 'asian_shared', 250),
  R('ليمونغ ماليزي', 'Lemang Malaysian bamboo glutinous rice', 'Riz gluant au bambou lemang malaisien', 'Arroz glutinoso en bambú lemang malasio', 'Malaysischer Lemang-Bambus-Klebreis', 'rice_biryani', 'lunch', 'peninsular_malaysia', 300),
  R('كيتوبات ناسي ماليزي', 'Ketupat nasi Malaysian diamond rice cake', 'Gâteau de riz losange ketupat malaisien', 'Pastel de arroz rombo ketupat malasio', 'Malaysischer Ketupat-Nasi-Reisdiamant', 'rice_biryani', 'lunch', 'pan_malaysian', 220),
  R('كيتوبات بالاس ماليزي', 'Ketupat palas Malaysian woven leaf rice cake', 'Gâteau de riz tissé ketupat palas malaisien', 'Pastel de arroz trenzado ketupat palas malasio', 'Malaysischer Ketupat-Palas-Geflochtener-Reiskuchen', 'rice_biryani', 'lunch', 'pan_malaysian', 230),
  R('لينوت ماليزي', 'Linut Malaysian Sarawak sago porridge', 'Porridge de sagou linut de Sarawak malaisien', 'Gachas de sagú linut de Sarawak malasias', 'Malaysischer Linut-Sagobrei aus Sarawak', 'rice_biryani', 'lunch', 'borneo', 280),
  R('كيلوبيس ماليزي', 'Kelupis Malaysian Sabah glutinous rice in leaf', 'Riz gluant en feuille kelupis de Sabah malaisien', 'Arroz glutinoso en hoja kelupis de Sabah malasio', 'Malaysischer Kelupis-Klebreis aus Sabah', 'rice_biryani', 'lunch', 'borneo', 240),
  R('ناسي برياني كامبينغ ماليزي', 'Nasi briyani kambing Malaysian lamb briyani', 'Briyani d agneau nasi briyani kambing malaisien', 'Biryani de cordero nasi briyani kambing malasio', 'Malaysischer Nasi-Briyani-Kambing-Lammreis', 'rice_biryani', 'lunch', 'pan_malaysian', 440),
  R('ناسي كونيكيت ماليزي', 'Nasi kunyit Malaysian turmeric wedding rice', 'Riz au curcuma nasi kunyit malaisien', 'Arroz con cúrcuma nasi kunyit malasio', 'Malaysischer Nasi-Kunyit-Kurkumareis', 'rice_biryani', 'lunch', 'pan_malaysian', 300),
  R('ناسي بابريك ماليزي', 'Nasi paprik Malaysian chili oil fried rice', 'Riz frit à l huile pimentée nasi paprik malaisien', 'Arroz frito con aceite de chile nasi paprik malasio', 'Malaysischer Nasi-Paprik-Chiliöl-Reis', 'rice_biryani', 'lunch', 'pan_malaysian', 350),
  R('ناسي كامبور سوتونغ ماليزي', 'Nasi campur sotong Malaysian mixed rice with squid', 'Riz mélangé au calmar nasi campur sotong malaisien', 'Arroz mixto con calamar nasi campur sotong malasio', 'Malaysischer Nasi-Campur-Sotong-Mischreis', 'rice_biryani', 'lunch', 'pan_malaysian', 360),
);
// --- dals_legumes (5) --------------------------------------------------------
dishes.push(
  R('دال كاري ماليزي', 'Dhal curry Malaysian lentil curry', 'Curry de lentilles dhal curry malaisien', 'Curry de lentejas dhal curry malasio', 'Malaysischer Dhal-Curry-Linsensud', 'dals_legumes', 'lunch', 'asian_shared', 190),
  R('دال سامبال ماليزي', 'Dhal sambal Malaysian sambal lentils', 'Lentilles au sambal dhal sambal malaisiennes', 'Lentejas con sambal dhal sambal malasias', 'Malaysische Dhal-Sambal-Linsen', 'dals_legumes', 'lunch', 'pan_malaysian', 195),
  R('دال تاهو ماليزي', 'Dhal tauhu Malaysian lentils and fried tofu', 'Lentilles et tofu frit dhal tauhu malaisiennes', 'Lentejas y tofu frito dhal tauhu malasias', 'Malaysische Dhal-Tauhu-Linsen mit Tofu', 'dals_legumes', 'lunch', 'pan_malaysian', 170),
  R('دال كاري بيلاكان ماليزي', 'Dhal curry belacan Malaysian shrimp paste lentil curry', 'Curry de lentilles à la pâte de crevettes dhal malaisien', 'Curry de lentejas con pasta de camarón dhal malasio', 'Malaysischer Dhal-Curry mit Belacan', 'dals_legumes', 'lunch', 'pan_malaysian', 185),
  R('دال سايور ماليزي', 'Dhal sayur Malaysian vegetable lentil stew', 'Ragoût de lentilles aux légumes dhal sayur malaisien', 'Estofado de lentejas con verduras dhal sayur malasio', 'Malaysischer Dhal-Sayur-Gemüselinseneintopf', 'dals_legumes', 'lunch', 'pan_malaysian', 180),
);
// --- vegetarian_mains (20) ----------------------------------------------------
dishes.push(
  R('سايور لوده ماليزي', 'Sayur lodeh Malaysian coconut vegetable stew', 'Ragoût de légumes au coco sayur lodeh malaisien', 'Estofado de verduras con coco sayur lodeh malasio', 'Malaysischer Sayur-Lodeh-Kokosgemüseeintopf', 'vegetarian_mains', 'lunch', 'asian_shared', 190),
  R('كاري سايور كامبور ماليزي', 'Kari sayur campur Malaysian mixed vegetable curry', 'Curry de légumes mélangés kari sayur campur malaisien', 'Curry de verduras mixtas kari sayur campur malasio', 'Malaysisches Kari-Sayur-Campur-Gemüsecurry', 'vegetarian_mains', 'lunch', 'pan_malaysian', 200),
  R('كانكونغ بيلاكان ماليزي', 'Kangkung belacan Malaysian shrimp paste water spinach', 'Épinards d eau à la pâte de crevettes kangkung belacan malaisiens', 'Espinacas de agua con pasta de camarón kangkung belacan malasias', 'Malaysisches Kangkung-Belacan-Wasserspinat', 'vegetarian_mains', 'lunch', 'pan_malaysian', 145),
  R('سايور ماساك ليماك جيلي آبي ماليزي', 'Sayur masak lemak cili api Malaysian coconut chili vegetables', 'Légumes au coco et piment sayur masak lemak malaisiens', 'Verduras con coco y chile sayur masak lemak malasias', 'Malaysisches Sayur-Masak-Lemak-Chili-Gemüse', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 210),
  R('تيرونغ ماساك ليماك ماليزي', 'Terung masak lemak Malaysian aubergine coconut curry', 'Aubergine au coco terung masak lemak malaisienne', 'Berenjena con coco terung masak lemak malasia', 'Malaysisches Terung-Masak-Lemak-Auberginencurry', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 190),
  R('بيريا ماساك ليماك ماليزي', 'Peria masak lemak Malaysian bitter gourd coconut curry', 'Courge amère au coco peria masak lemak malaisienne', 'Calabaza amarga con coco peria masak lemak malasia', 'Malaysisches Peria-Masak-Lemak-Bittergurkencurry', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 180),
  R('بيتاي ماساك ليماك ماليزي', 'Petai masak lemak Malaysian stink bean coconut curry', 'Haricots puants au coco petai masak lemak malaisiens', 'Habas olorosas con coco petai masak lemak malasias', 'Malaysisches Petai-Masak-Lemak-Stinkbohnencurry', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 220),
  R('سامبال بيتاي ماليزي', 'Sambal petai Malaysian stink bean sambal', 'Haricots puants au sambal sambal petai malaisiens', 'Habas olorosas con sambal sambal petai malasias', 'Malaysische Sambal-Petai-Stinkbohnen', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 200),
  R('تاهو كورما ماليزي', 'Tauhu kurma Malaysian tofu kurma curry', 'Tofu au curry kurma tauhu kurma malaisien', 'Tofu al curry kurma tauhu kurma malasio', 'Malaysisches Tauhu-Kurma-Tofucurry', 'vegetarian_mains', 'lunch', 'pan_malaysian', 180),
  R('تاهو سومبات ماليزي', 'Tahu sumbat Malaysian stuffed fried tofu', 'Tofu farci frit tahu sumbat malaisien', 'Tofu relleno frito tahu sumbat malasio', 'Malaysischer Tahu-Sumbat-Gefüllter Tofu', 'vegetarian_mains', 'lunch', 'pan_malaysian', 170),
  R('تاهو غورينغ ماليزي', 'Tauhu goreng Malaysian crispy fried tofu', 'Tofu croustillant tauhu goreng malaisien', 'Tofu crujiente frito tauhu goreng malasio', 'Malaysischer knuspriger Tauhu-Goreng-Tofu', 'vegetarian_mains', 'lunch', 'pan_malaysian', 160),
  R('تمبه غورينغ ماليزي', 'Tempeh goreng Malaysian fried tempeh', 'Tempeh frit tempeh goreng malaisien', 'Tempeh frito tempeh goreng malasio', 'Malaysischer gebratener Tempeh', 'vegetarian_mains', 'lunch', 'pan_malaysian', 210),
  R('تمبه ماساك ميراه ماليزي', 'Tempeh masak merah Malaysian red tempeh', 'Tempeh à la sauce rouge tempeh masak merah malaisien', 'Tempeh en salsa roja tempeh masak merah malasio', 'Malaysischer Tempeh-Masak-Merah-Tempeh', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 220),
  R('تمبه كاري ماليزي', 'Tempeh kari Malaysian tempeh curry', 'Curry de tempeh tempeh kari malaisien', 'Curry de tempeh tempeh kari malasio', 'Malaysisches Tempeh-Kari-Tempehcurry', 'vegetarian_mains', 'lunch', 'pan_malaysian', 200),
  R('رينداغ سايور ماليزي', 'Rendang sayur Malaysian vegetable rendang', 'Rendang de légumes rendang sayur malaisien', 'Rendang de verduras rendang sayur malasio', 'Malaysisches Rendang-Sayur-Gemüserendang', 'vegetarian_mains', 'lunch', 'pan_malaysian', 230),
  R('سايور أسام ماليزي', 'Sayur asam Malaysian sour vegetable soup', 'Soupe de légumes aigre sayur asam malaisienne', 'Sopa agria de verduras sayur asam malasia', 'Malaysische Sayur-Asam-Sauer-Gemüsesuppe', 'vegetarian_mains', 'lunch', 'pan_malaysian', 150),
  R('كاري نانغكا مودا ماليزي', 'Kari nangka muda Malaysian young jackfruit curry', 'Curry de jacquier kari nangka muda malaisien', 'Curry de yaca joven kari nangka muda malasio', 'Malaysisches Kari-Nangka-Muda-Jackfruchtcurry', 'vegetarian_mains', 'lunch', 'pan_malaysian', 210),
  R('سايور ماساك بوتيه ماليزي', 'Sayur masak putih Malaysian white vegetable curry', 'Curry de légumes blanc sayur masak putih malaisien', 'Curry de verduras blanco sayur masak putih malasio', 'Malaysisches Sayur-Masak-Putih-Weiß-Gemüsecurry', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 180),
  R('رينداغ نانغكا مودا ماليزي', 'Rendang nangka muda Malaysian young jackfruit rendang', 'Rendang de jacquier rendang nangka muda malaisien', 'Rendang de yaca joven rendang nangka muda malasio', 'Malaysisches Rendang-Nangka-Muda-Jackfruchtrendang', 'vegetarian_mains', 'lunch', 'peninsular_malaysia', 220),
  R('تاهو سيلي ماليزي', 'Tauhu cili Malaysian chili tofu', 'Tofu au piment tauhu cili malaisien', 'Tofu con chile tauhu cili malasio', 'Malaysischer Tauhu-Cili-Chilitofu', 'vegetarian_mains', 'lunch', 'pan_malaysian', 170),
);
// --- poultry_mains (30) -------------------------------------------------------
dishes.push(
  R('أيام رينداغ ماليزي', 'Ayam rendang Malaysian chicken rendang', 'Rendang de poulet ayam rendang malaisien', 'Rendang de pollo ayam rendang malasio', 'Malaysisches Ayam-Rendang-Hähnchenrendang', 'poultry_mains', 'lunch', 'pan_malaysian', 320),
  R('أيام رينداغ نيونيا ماليزي', 'Nyonya ayam rendang Malaysian Nyonya chicken rendang', 'Rendang de poulet nyonya ayam malaisien', 'Rendang de pollo nyonya ayam malasio', 'Malaysisches Nyonya-Ayam-Rendang-Hähnchen', 'poultry_mains', 'lunch', 'peninsular_malaysia', 330),
  R('أيام بيرشيك ماليزي', 'Ayam percik Malaysian Kelantan grilled chicken', 'Poulet grillé ayam percik de Kelantan malaisien', 'Pollo a la parrilla ayam percik de Kelantan malasio', 'Malaysisches Ayam-Percik-Grillhähnchen aus Kelantan', 'poultry_mains', 'lunch', 'peninsular_malaysia', 290),
  R('أيام ليماك جيلي آبي ماليزي', 'Ayam lemak cili api Malaysian coconut chili chicken', 'Poulet au coco et piment ayam lemak cili api malaisien', 'Pollo con coco y chile ayam lemak cili api malasio', 'Malaysisches Ayam-Lemak-Cili-Api-Hähnchen', 'poultry_mains', 'lunch', 'peninsular_malaysia', 300),
  R('أيام ماساك ميراه ماليزي', 'Ayam masak merah Malaysian red chicken curry', 'Curry de poulet rouge ayam masak merah malaisien', 'Curry de pollo rojo ayam masak merah malasio', 'Malaysisches Ayam-Masak-Merah-Rothähnchencurry', 'poultry_mains', 'lunch', 'pan_malaysian', 310),
  R('أيام ماساك كيكاب ماليزي', 'Ayam masak kicap Malaysian soy sauce chicken', 'Poulet à la sauce soja ayam masak kicap malaisien', 'Pollo en salsa de soja ayam masak kicap malasio', 'Malaysisches Ayam-Masak-Kicap-Sojahähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 290),
  R('أيام ماساك كورما ماليزي', 'Ayam masak kurma Malaysian kurma chicken', 'Poulet au kurma ayam masak kurma malaisien', 'Pollo al kurma ayam masak kurma malasio', 'Malaysisches Ayam-Masak-Kurma-Hähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 300),
  R('أيام باكار ماليزي', 'Ayam bakar Malaysian grilled chicken', 'Poulet grillé ayam bakar malaisien', 'Pollo a la parrilla ayam bakar malasio', 'Malaysisches Ayam-Bakar-Grillhähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 260),
  R('أيام باكار بيلاكان ماليزي', 'Ayam bakar belacan Malaysian belacan grilled chicken', 'Poulet grillé à la pâte de crevettes ayam bakar belacan malaisien', 'Pollo a la parrilla con pasta de camarón ayam bakar malasio', 'Malaysisches Ayam-Bakar-Belacan-Grillhähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 265),
  R('أيام غورينغ ماليزي', 'Ayam goreng Malaysian fried chicken', 'Poulet frit ayam goreng malaisien', 'Pollo frito ayam goreng malasio', 'Malaysisches Ayam-Goreng-Frikadellhähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 280),
  R('أيام غورينغ كونيكيت ماليزي', 'Ayam goreng kunyit Malaysian turmeric fried chicken', 'Poulet frit au curcuma ayam goreng kunyit malaisien', 'Pollo frito con cúrcuma ayam goreng kunyit malasio', 'Malaysisches Ayam-Goreng-Kunyit-Kurkumahähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 290),
  R('أيام غورينغ بيريمبا ماليزي', 'Ayam goreng berempah Malaysian spiced fried chicken', 'Poulet frit épicé ayam goreng berempah malaisien', 'Pollo frito especiado ayam goreng berempah malasio', 'Malaysisches Ayam-Goreng-Berempah-Gewürzhähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 295),
  R('كاري كابيتان ماليزي', 'Kapitan curry Malaysian Penang chicken curry', 'Curry de poulet kapitan de Penang malaisien', 'Curry de pollo kapitan de Penang malasio', 'Malaysisches Kapitan-Curry-Hähnchen aus Penang', 'poultry_mains', 'lunch', 'peninsular_malaysia', 310),
  R('كاري أيام ماماك ماليزي', 'Kari ayam mamak Malaysian Mamak chicken curry', 'Curry de poulet mamak kari ayam malaisien', 'Curry de pollo mamak kari ayam malasio', 'Malaysisches Kari-Ayam-Mamak-Hähnchencurry', 'poultry_mains', 'lunch', 'pan_malaysian', 300),
  R('أيام باندا ماليزي', 'Ayam pandan Malaysian pandan leaf chicken', 'Poulet aux feuilles de pandan ayam pandan malaisien', 'Pollo en hoja de pandan ayam pandan malasio', 'Malaysisches Ayam-Pandan-Pandanblatthähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 270),
  R('إنشي كابين ماليزي', 'Inche kabin Malaysian Kelantan fried chicken', 'Poulet frit inche kabin de Kelantan malaisien', 'Pollo frito inche kabin de Kelantan malasio', 'Malaysisches Inche-Kabin-Hähnchen aus Kelantan', 'poultry_mains', 'lunch', 'peninsular_malaysia', 300),
  R('أيام سوس تيرام ماليزي', 'Ayam sos tiram Malaysian oyster sauce chicken', 'Poulet à la sauce aux huîtres ayam sos tiram malaisien', 'Pollo en salsa de ostras ayam sos tiram malasio', 'Malaysisches Ayam-Sos-Tiram-Austernsauce-Hähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 285),
  R('أيام مادو ماليزي', 'Ayam madu Malaysian honey chicken', 'Poulet au miel ayam madu malaisien', 'Pollo con miel ayam madu malasio', 'Malaysisches Ayam-Madu-Honighähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 295),
  R('رينداغ إيتيك ماليزي', 'Rendang itik Malaysian duck rendang', 'Rendang de canard rendang itik malaisien', 'Rendang de pato rendang itik malasio', 'Malaysisches Rendang-Itik-Entenrendang', 'poultry_mains', 'lunch', 'peninsular_malaysia', 330),
  R('أيام غوليك ماليزي', 'Ayam golek Malaysian rotisserie chicken', 'Poulet rôti à la broche ayam golek malaisien', 'Pollo a la brasa ayam golek malasio', 'Malaysisches Ayam-Golek-Spießhähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 270),
  R('كاري أيام نيونيا ماليزي', 'Nyonya kari ayam Malaysian Nyonya chicken curry', 'Curry de poulet nyonya kari ayam malaisien', 'Curry de pollo nyonya kari ayam malasio', 'Malaysisches Nyonya-Kari-Ayam-Hähnchencurry', 'poultry_mains', 'lunch', 'peninsular_malaysia', 315),
  R('أيام ماساك بوتيه ماليزي', 'Ayam masak putih Malaysian white chicken curry', 'Curry de poulet blanc ayam masak putih malaisien', 'Curry de pollo blanco ayam masak putih malasio', 'Malaysisches Ayam-Masak-Putih-Weißhähnchencurry', 'poultry_mains', 'lunch', 'peninsular_malaysia', 285),
  R('أيام غورينغ تيبونغ ماليزي', 'Ayam goreng tepung Malaysian battered chicken', 'Poulet pané ayam goreng tepung malaisien', 'Pollo rebozado ayam goreng tepung malasio', 'Malaysisches paniertes Ayam-Goreng-Tepung-Hähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 300),
  R('أيام أسام بيداس ماليزي', 'Ayam asam pedas Malaysian sour spicy chicken', 'Poulet aigre épicé ayam asam pedas malaisien', 'Pollo agrio picante ayam asam pedas malasio', 'Malaysisches Ayam-Asam-Pedas-Sauer-Scharfes-Hähnchen', 'poultry_mains', 'lunch', 'peninsular_malaysia', 290),
  R('أيام ماساك سيلي كيرينغ ماليزي', 'Ayam masak cili kering Malaysian dry chili chicken', 'Poulet au piment sec ayam masak cili kering malaisien', 'Pollo con chile seco ayam masak cili kering malasio', 'Malaysisches Ayam-Masak-Cili-Kering-Trockenchili-Hähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 280),
  R('أيام سالاي ماليزي', 'Ayam salai Malaysian smoked chicken', 'Poulet fumé ayam salai malaisien', 'Pollo ahumado ayam salai malasio', 'Malaysisches Ayam-Salai-Räucherhähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 300),
  R('أيام ماساك كاجانغ ماليزي', 'Ayam masak kacang Malaysian peanut chicken', 'Poulet aux arachides ayam masak kacang malaisien', 'Pollo con maní ayam masak kacang malasio', 'Malaysisches Ayam-Masak-Kacang-Erdnusshähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 310),
  R('إيتيك باكار ماليزي', 'Itik bakar Malaysian grilled duck', 'Canard grillé itik bakar malaisien', 'Pato a la parrilla itik bakar malasio', 'Malaysische Itik-Bakar-Grillente', 'poultry_mains', 'lunch', 'pan_malaysian', 310),
  R('تشيكن تشوب ماليزي', 'Chicken chop Malaysian mali style chop', 'Escalope de poulet chop malaisien', 'Chuleta de pollo chop malasia', 'Malaysisches Chicken-Chop-Hähnchenschnitzel', 'poultry_mains', 'lunch', 'pan_malaysian', 330),
  R('أيام غورينغ سيلي غارام ماليزي', 'Ayam goreng cili garam Malaysian salt chili chicken', 'Poulet frit au piment sale ayam goreng cili garam malaisien', 'Pollo frito con chile salado ayam goreng cili garam malasio', 'Malaysisches Ayam-Goreng-Cili-Garam-Salz-Chili-Hähnchen', 'poultry_mains', 'lunch', 'pan_malaysian', 305),
);
// --- meat_mains (34) ----------------------------------------------------------
dishes.push(
  R('رينداغ داغينغ ماليزي', 'Rendang daging Malaysian beef rendang', 'Rendang de bœuf rendang daging malaisien', 'Rendang de res rendang daging malasio', 'Malaysisches Rendang-Daging-Rindfleischrendang', 'meat_mains', 'lunch', 'pan_malaysian', 380),
  R('رينداغ تو ماليزي', 'Rendang tok Malaysian Perak dark beef rendang', 'Rendang de bœuf noir rendang tok de Perak malaisien', 'Rendang de res oscuro rendang tok de Perak malasio', 'Malaysisches Rendang-Tok-Rindfleisch aus Perak', 'meat_mains', 'lunch', 'peninsular_malaysia', 360),
  R('رينداغ كامبينغ ماليزي', 'Rendang kambing Malaysian lamb rendang', 'Rendang d agneau rendang kambing malaisien', 'Rendang de cordero rendang kambing malasio', 'Malaysisches Rendang-Kambing-Lammrendang', 'meat_mains', 'lunch', 'peninsular_malaysia', 360),
  R('داغينغ ماساك ميراه ماليزي', 'Daging masak merah Malaysian red beef', 'Bœuf à la sauce rouge daging masak merah malaisien', 'Res en salsa roja daging masak merah malasia', 'Malaysisches Daging-Masak-Merah-Rinffleisch', 'meat_mains', 'lunch', 'pan_malaysian', 370),
  R('داغينغ ماساك كيكاب ماليزي', 'Daging masak kicap Malaysian soy beef', 'Bœuf à la sauce soja daging masak kicap malaisien', 'Res en salsa de soja daging masak kicap malasia', 'Malaysisches Daging-Masak-Kicap-Sojarindfleisch', 'meat_mains', 'lunch', 'pan_malaysian', 350),
  R('داغينغ ماساك كورما ماليزي', 'Daging masak kurma Malaysian kurma beef', 'Bœuf au kurma daging masak kurma malaisien', 'Res al kurma daging masak kurma malasia', 'Malaysisches Daging-Masak-Kurma-Kurmarindfleisch', 'meat_mains', 'lunch', 'pan_malaysian', 360),
  R('داغينغ ماساك كاجانغ ماليزي', 'Daging masak kacang Malaysian peanut beef', 'Bœuf aux arachides daging masak kacang malaisien', 'Res con maní daging masak kacang malasia', 'Malaysisches Daging-Masak-Kacang-Erdnussrindfleisch', 'meat_mains', 'lunch', 'pan_malaysian', 360),
  R('كاري داغينغ ماليزي', 'Kari daging Malaysian beef curry', 'Curry de bœuf kari daging malaisien', 'Curry de res kari daging malasio', 'Malaysisches Kari-Daging-Rindfleischcurry', 'meat_mains', 'lunch', 'pan_malaysian', 360),
  R('داغينغ باكار ماليزي', 'Daging bakar Malaysian grilled beef', 'Bœuf grillé daging bakar malaisien', 'Res a la parrilla daging bakar malasia', 'Malaysisches Daging-Bakar-Grillrindfleisch', 'meat_mains', 'lunch', 'pan_malaysian', 330),
  R('داغينغ غورينغ ماليزي', 'Daging goreng Malaysian fried beef', 'Bœuf frit daging goreng malaisien', 'Res frita daging goreng malasia', 'Malaysisches Daging-Goreng-Fritiertes Rindfleisch', 'meat_mains', 'lunch', 'pan_malaysian', 340),
  R('داغينغ سالاي ماساك ليماك ماليزي', 'Daging salai masak lemak Malaysian smoked beef coconut stew', 'Bœuf fumé au coco daging salai masak lemak malaisien', 'Res ahumada con coco daging salai masak lemak malasia', 'Malaysischer Daging-Salai-Masak-Lemak-Eintopf', 'meat_mains', 'lunch', 'peninsular_malaysia', 350),
  R('داغينغ بيستك ملايو ماليزي', 'Daging bistik Melayu Malaysian Malai beef steak', 'Steak de bœuf malais daging bistik Melayu', 'Bistec de res malayo daging bistik Melayu', 'Malaysisches Daging-Bistik-Melayu-Rindsteak', 'meat_mains', 'lunch', 'pan_malaysian', 370),
  R('كامبينغ ماساك كورما ماليزي', 'Kambing masak kurma Malaysian kurma lamb', 'Agneau au kurma kambing masak kurma malaisien', 'Cordero al kurma kambing masak kurma malasio', 'Malaysisches Kambing-Masak-Kurma-Kurmalamm', 'meat_mains', 'lunch', 'pan_malaysian', 350),
  R('كاري كامبينغ ماليزي', 'Kari kambing Malaysian lamb curry', 'Curry d agneau kari kambing malaisien', 'Curry de cordero kari kambing malasio', 'Malaysisches Kari-Kambing-Lammcurry', 'meat_mains', 'lunch', 'pan_malaysian', 340),
  R('كامبينغ غوليك ماليزي', 'Kambing golek Malaysian roasted lamb', 'Agneau rôti kambing golek malaisien', 'Cordero asado kambing golek malasio', 'Malaysisches Kambing-Golek-Bratlamm', 'meat_mains', 'lunch', 'peninsular_malaysia', 360),
  R('كامبينغ باكار ماليزي', 'Kambing bakar Malaysian grilled lamb', 'Agneau grillé kambing bakar malaisien', 'Cordero a la parrilla kambing bakar malasio', 'Malaysisches Kambing-Bakar-Grilllamm', 'meat_mains', 'lunch', 'pan_malaysian', 340),
  R('داغينغ أسام بيداس ماليزي', 'Daging asam pedas Malaysian sour spicy beef', 'Bœuf aigre épicé daging asam pedas malaisien', 'Res agria picante daging asam pedas malasia', 'Malaysisches Daging-Asam-Pedas-Sauer-Scharfes Rind', 'meat_mains', 'lunch', 'peninsular_malaysia', 350),
  R('داغينغ بونغا رمباه ماليزي', 'Daging bunga rempah Malaysian Kelantan spiced beef', 'Bœuf épicé daging bunga rempah de Kelantan malaisien', 'Res especiada daging bunga rempah de Kelantan malasia', 'Malaysisches Daging-Bunga-Rempah-Gewürzrind aus Kelantan', 'meat_mains', 'lunch', 'peninsular_malaysia', 360),
  R('داغينغ ماساك ليماو ماليزي', 'Daging masak limau Malaysian lime beef', 'Bœuf au citron vert daging masak limau malaisien', 'Res con limón daging masak limau malasia', 'Malaysisches Daging-Masak-Limau-Limonenrind', 'meat_mains', 'lunch', 'pan_malaysian', 330),
  R('داغينغ فلفل أسود ماليزي', 'Daging lada hitam Malaysian black pepper beef', 'Bœuf au poivre noir daging lada hitam malaisien', 'Res con pimienta negra daging lada hitam malasia', 'Malaysisches Daging-Lada-Hitam-Schwarzpfefferrind', 'meat_mains', 'lunch', 'pan_malaysian', 340),
  R('داغينغ ماساك تاوتشو ماليزي', 'Daging masak taucu Malaysian fermented bean beef', 'Bœuf à la pâte de soja fermentée daging masak taucu malaisien', 'Res con pasta de soja fermentada daging masak taucu malasia', 'Malaysisches Daging-Masak-Taucu-Rindfleisch', 'meat_mains', 'lunch', 'pan_malaysian', 330),
  R('سامبال داغينغ ماليزي', 'Sambal daging Malaysian beef sambal', 'Bœuf au sambal sambal daging malaisien', 'Res con sambal sambal daging malasia', 'Malaysisches Sambal-Daging-Rindsambal', 'meat_mains', 'lunch', 'pan_malaysian', 320),
  R('داغينغ غورينغ تيبونغ ماليزي', 'Daging goreng tepung Malaysian battered beef', 'Bœuf pané daging goreng tepung malaisien', 'Res rebozada daging goreng tepung malasia', 'Malaysisches paniertes Daging-Goreng-Tepung-Rind', 'meat_mains', 'lunch', 'pan_malaysian', 350),
  R('غولي كامبينغ ماليزي', 'Gulai kambing Malaysian Malay lamb gulai', 'Ragoût malais d agneau gulai kambing malaisien', 'Estofado malayo de cordero gulai kambing malasio', 'Malaysisches Gulai-Kambing-Lammeintopf', 'meat_mains', 'lunch', 'pan_malaysian', 350),
  R('كامبينغ أسام بيداس ماليزي', 'Kambing asam pedas Malaysian sour spicy lamb', 'Agneau aigre épicé kambing asam pedas malaisien', 'Cordero agrio picante kambing asam pedas malasio', 'Malaysisches Kambing-Asam-Pedas-Lamm', 'meat_mains', 'lunch', 'peninsular_malaysia', 340),
  R('كامبينغ غورينغ ماليزي', 'Kambing goreng Malaysian fried lamb', 'Agneau frit kambing goreng malaisien', 'Cordero frito kambing goreng malasio', 'Malaysisches Kambing-Goreng-Fritiertes Lamm', 'meat_mains', 'lunch', 'pan_malaysian', 300),
  R('كامبينغ ماساك كيكاب ماليزي', 'Kambing masak kicap Malaysian soy lamb', 'Agneau à la sauce soja kambing masak kicap malaisien', 'Cordero en salsa de soja kambing masak kicap malasio', 'Malaysisches Kambing-Masak-Kicap-Sojalamm', 'meat_mains', 'lunch', 'pan_malaysian', 330),
  R('داغينغ كامبونغ ماليزي', 'Daging kampung Malaysian village beef stew', 'Ragoût de bœuf villageois daging kampung malaisien', 'Estofado de res campesino daging kampung malasio', 'Malaysischer Daging-Kampung-Dorfrindeintopf', 'meat_mains', 'lunch', 'pan_malaysian', 340),
  R('رينداغ كيرينغ ماليزي', 'Rendang kering Malaysian dry beef rendang', 'Rendang de bœuf sec rendang kering malaisien', 'Rendang de res seco rendang kering malasio', 'Malaysisches Rendang-Kering-Trockenrindfleisch', 'meat_mains', 'lunch', 'pan_malaysian', 350),
  R('داغينغ ماساك رمباه ماليزي', 'Daging masak rempah Malaysian spiced beef', 'Bœuf aux épices daging masak rempah malaisien', 'Res con especias daging masak rempah malasia', 'Malaysisches Daging-Masak-Rempah-Gewürzrind', 'meat_mains', 'lunch', 'pan_malaysian', 350),
  R('داغينغ باكار بيريمبا ماليزي', 'Daging bakar berempah Malaysian spiced grilled beef', 'Bœuf grillé épicé daging bakar berempah malaisien', 'Res a la parrilla especiada daging bakar berempah malasia', 'Malaysisches Daging-Bakar-Berempah-Grillrind', 'meat_mains', 'lunch', 'pan_malaysian', 340),
  R('رينداغ كيربو ماليزي', 'Rendang kerbau Malaysian buffalo rendang', 'Rendang de buffle rendang kerbau malaisien', 'Rendang de búfalo rendang kerbau malasio', 'Malaysisches Rendang-Kerbau-Büffelrendang', 'meat_mains', 'lunch', 'peninsular_malaysia', 350),
  R('كاري كيربو ماليزي', 'Kari kerbau Malaysian buffalo curry', 'Curry de buffle kari kerbau malaisien', 'Curry de búfalo kari kerbau malasio', 'Malaysisches Kari-Kerbau-Büffelcurry', 'meat_mains', 'lunch', 'pan_malaysian', 340),
  R('داغينغ غورينغ كونيكيت ماليزي', 'Daging goreng kunyit Malaysian turmeric fried beef', 'Bœuf frit au curcuma daging goreng kunyit malaisien', 'Res frita con cúrcuma daging goreng kunyit malasia', 'Malaysisches Daging-Goreng-Kunyit-Kurkumarbind', 'meat_mains', 'lunch', 'pan_malaysian', 340),
);
// --- seafood_mains (33) -------------------------------------------------------
dishes.push(
  R('إيكان باكار ماليزي', 'Ikan bakar Malaysian grilled fish', 'Poisson grillé ikan bakar malaisien', 'Pescado a la parrilla ikan bakar malasio', 'Malaysischer Ikan-Bakar-Grillfisch', 'seafood_mains', 'lunch', 'pan_malaysian', 200),
  R('إيكان باكار بيريمبا ماليزي', 'Ikan bakar berempah Malaysian spiced grilled fish', 'Poisson grillé épicé ikan bakar berempah malaisien', 'Pescado a la parrilla especiado ikan bakar berempah malasio', 'Malaysischer Ikan-Bakar-Berempah-Grillfisch', 'seafood_mains', 'lunch', 'pan_malaysian', 210),
  R('إيكان غورينغ ماليزي', 'Ikan goreng Malaysian fried fish', 'Poisson frit ikan goreng malaisien', 'Pescado frito ikan goreng malasio', 'Malaysischer Ikan-Goreng-Fischfisch', 'seafood_mains', 'lunch', 'pan_malaysian', 220),
  R('إيكان غورينغ كونيكيت ماليزي', 'Ikan goreng kunyit Malaysian turmeric fried fish', 'Poisson frit au curcuma ikan goreng kunyit malaisien', 'Pescado frito con cúrcuma ikan goreng kunyit malasio', 'Malaysischer Ikan-Goreng-Kunyit-Kurkumafisch', 'seafood_mains', 'lunch', 'pan_malaysian', 210),
  R('إيكان غورينغ تيبونغ ماليزي', 'Ikan goreng tepung Malaysian battered fish', 'Poisson pané ikan goreng tepung malaisien', 'Pescado rebozado ikan goreng tepung malasio', 'Malaysischer panierter Ikan-Goreng-Tepung-Fisch', 'seafood_mains', 'lunch', 'pan_malaysian', 230),
  R('إيكان ماساك ميراه ماليزي', 'Ikan masak merah Malaysian red fish curry', 'Poisson à la sauce rouge ikan masak merah malaisien', 'Pescado en salsa roja ikan masak merah malasio', 'Malaysischer Ikan-Masak-Merah-Rotfischcurry', 'seafood_mains', 'lunch', 'pan_malaysian', 210),
  R('إيكان أسام بيداس ماليزي', 'Ikan asam pedas Malaysian sour spicy fish', 'Poisson aigre épicé ikan asam pedas malaisien', 'Pescado agrio picante ikan asam pedas malasio', 'Malaysischer Ikan-Asam-Pedas-Sauer-Scharfer Fisch', 'seafood_mains', 'lunch', 'peninsular_malaysia', 200),
  R('أسام بيداس إيكان بارانغ ماليزي', 'Asam pedas ikan parang Malaysian sour mackerel', 'Maquereau aigre épicé asam pedas ikan parang malaisien', 'Caballa agria picante asam pedas ikan parang malasia', 'Malaysischer Asam-Pedas-Ikan-Parang-Makrelendisch', 'seafood_mains', 'lunch', 'peninsular_malaysia', 200),
  R('كاري كيبالا إيكان ماليزي', 'Kari kepala ikan Malaysian fish head curry', 'Curry de tête de poisson kari kepala ikan malaisien', 'Curry de cabeza de pescado kari kepala ikan malasio', 'Malaysisches Kari-Kepala-Ikan-Fischkopfcurry', 'seafood_mains', 'lunch', 'peninsular_malaysia', 210),
  R('كاري إيكان ماليزي', 'Kari ikan Malaysian fish curry', 'Curry de poisson kari ikan malaisien', 'Curry de pescado kari ikan malasio', 'Malaysisches Kari-Ikan-Fischcurry', 'seafood_mains', 'lunch', 'pan_malaysian', 190),
  R('إيكان سينغغانغ ماليزي', 'Ikan singgang Malaysian ginger lemongrass fish', 'Poisson au gingembre citronnelle ikan singgang malaisien', 'Pescado con jengibre y limoncillo ikan singgang malasio', 'Malaysischer Ikan-Singgang-Ingwer-Zitronengras-Fisch', 'seafood_mains', 'lunch', 'peninsular_malaysia', 180),
  R('إيكان ماساك ليماك جيلي آبي ماليزي', 'Ikan masak lemak cili api Malaysian coconut chili fish', 'Poisson au coco et piment ikan masak lemak malaisien', 'Pescado con coco y chile ikan masak lemak malasio', 'Malaysischer Ikan-Masak-Lemak-Cili-Api-Fisch', 'seafood_mains', 'lunch', 'peninsular_malaysia', 200),
  R('إيكان باتين ماساك تيمبوي ماليزي', 'Ikan patin masak tempoyak Malaysian fermented durian catfish', 'Poisson-chat au durian fermenté ikan patin masak tempoyak malaisien', 'Bagre con durián fermentado ikan patin masak tempoyak malasio', 'Malaysischer Ikan-Patin-Masak-Tempoyak-Wels', 'seafood_mains', 'lunch', 'peninsular_malaysia', 220),
  R('سامبال إيكان ماليزي', 'Sambal ikan Malaysian fish sambal', 'Poisson au sambal sambal ikan malaisien', 'Pescado con sambal sambal ikan malasio', 'Malaysischer Sambal-Ikan-Fischsambal', 'seafood_mains', 'lunch', 'pan_malaysian', 200),
  R('سامبال إيكان بيليس ماليزي', 'Sambal ikan bilis Malaysian anchovy sambal', 'Anchois au sambal sambal ikan bilis malaisiens', 'Anchoas con sambal sambal ikan bilis malasias', 'Malaysische Sambal-Ikan-Bilis-Anchovissambal', 'seafood_mains', 'lunch', 'pan_malaysian', 140),
  R('إيكان بيليس غورينغ ماليزي', 'Ikan bilis goreng Malaysian fried anchovies', 'Anchois frits ikan bilis goreng malaisiens', 'Anchoas fritas ikan bilis goreng malasias', 'Malaysische frittierte Ikan-Bilis-Goreng-Anchovis', 'seafood_mains', 'lunch', 'pan_malaysian', 150),
  R('أودانغ ماساك ليماك ماليزي', 'Udang masak lemak Malaysian coconut prawn curry', 'Crevettes au coco udang masak lemak malaisiennes', 'Camarones con coco udang masak lemak malasios', 'Malaysisches Udang-Masak-Lemak-Garnelencurry', 'seafood_mains', 'lunch', 'peninsular_malaysia', 190),
  R('أودانغ ماساك ميراه ماليزي', 'Udang masak merah Malaysian red prawn curry', 'Crevettes à la sauce rouge udang masak merah malaisiennes', 'Camarones en salsa roja udang masak merah malasios', 'Malaysisches Udang-Masak-Merah-Garnelencurry', 'seafood_mains', 'lunch', 'pan_malaysian', 200),
  R('أودانغ سامبال ماليزي', 'Udang sambal Malaysian prawn sambal', 'Crevettes au sambal udang sambal malaisiennes', 'Camarones con sambal udang sambal malasios', 'Malaysische Udang-Sambal-Garnelen', 'seafood_mains', 'lunch', 'pan_malaysian', 180),
  R('أودانغ باكار ماليزي', 'Udang bakar Malaysian grilled prawns', 'Crevettes grillées udang bakar malaisiennes', 'Camarones a la parrilla udang bakar malasios', 'Malaysische Udang-Bakar-Grillgarnelen', 'seafood_mains', 'lunch', 'pan_malaysian', 170),
  R('أودانغ غورينغ تيبونغ ماليزي', 'Udang goreng tepung Malaysian battered prawns', 'Crevettes panées udang goreng tepung malaisiennes', 'Camarones rebozados udang goreng tepung malasios', 'Malaysische panierte Udang-Goreng-Tepung-Garnelen', 'seafood_mains', 'lunch', 'pan_malaysian', 220),
  R('أودانغ ماساك منتغا ماليزي', 'Udang masak mentega Malaysian butter prawns', 'Crevettes au beurre udang masak mentega malaisiennes', 'Camarones con mantequilla udang masak mentega malasios', 'Malaysische Udang-Masak-Mentega-Buttergarnelen', 'seafood_mains', 'lunch', 'pan_malaysian', 240),
  R('سوتونغ ماساك كيكاب ماليزي', 'Sotong masak kicap Malaysian soy squid', 'Calmar à la sauce soja sotong masak kicap malaisien', 'Calamar en salsa de soja sotong masak kicap malasio', 'Malaysischer Sotong-Masak-Kicap-Sojakalmar', 'seafood_mains', 'lunch', 'pan_malaysian', 190),
  R('سوتونغ ماساك ميراه ماليزي', 'Sotong masak merah Malaysian red squid', 'Calmar à la sauce rouge sotong masak merah malaisien', 'Calamar en salsa roja sotong masak merah malasio', 'Malaysischer Sotong-Masak-Merah-Rotkalmar', 'seafood_mains', 'lunch', 'pan_malaysian', 200),
  R('سوتونغ باكار ماليزي', 'Sotong bakar Malaysian grilled squid', 'Calmar grillé sotong bakar malaisien', 'Calamar a la parrilla sotong bakar malasio', 'Malaysischer Sotong-Bakar-Grillkalmar', 'seafood_mains', 'lunch', 'pan_malaysian', 180),
  R('سوتونغ غورينغ تيبونغ ماليزي', 'Sotong goreng tepung Malaysian battered squid', 'Calmar pané sotong goreng tepung malaisien', 'Calamar rebozado sotong goreng tepung malasio', 'Malaysischer panierter Sotong-Goreng-Tepung-Kalmar', 'seafood_mains', 'lunch', 'pan_malaysian', 210),
  R('كيتام سيلي ماليزي', 'Ketam cili Malaysian chili crab', 'Crabe au piment ketam cili malaisien', 'Cangrejo con chile ketam cili malasio', 'Malaysischer Ketam-Cili-Chilikrebs', 'seafood_mains', 'lunch', 'peninsular_malaysia', 230),
  R('كيتام منتغا ماليزي', 'Ketam mentega Malaysian butter crab', 'Crabe au beurre ketam mentega malaisien', 'Cangrejo con mantequilla ketam mentega malasio', 'Malaysischer Ketam-Mentega-Butterkrebs', 'seafood_mains', 'lunch', 'peninsular_malaysia', 250),
  R('كاري كيتام ماليزي', 'Kari ketam Malaysian crab curry', 'Curry de crabe kari ketam malaisien', 'Curry de cangrejo kari ketam malasio', 'Malaysisches Kari-Ketam-Krebscurry', 'seafood_mains', 'lunch', 'pan_malaysian', 210),
  R('إيكان كوشي ماليزي', 'Ikan kukus Malaysian steamed fish', 'Poisson vapeur ikan kukus malaisien', 'Pescado al vapor ikan kukus malasio', 'Malaysischer Ikan-Kukus-Dampffisch', 'seafood_mains', 'lunch', 'pan_malaysian', 180),
  R('إيكان سالاي ماليزي', 'Ikan salai Malaysian smoked fish', 'Poisson fumé ikan salai malaisien', 'Pescado ahumado ikan salai malasio', 'Malaysischer Ikan-Salai-Räucherfisch', 'seafood_mains', 'lunch', 'pan_malaysian', 190),
  R('أوماي ماليزي', 'Umai Malaysian Sarawak raw fish salad', 'Salade de poisson cru umai de Sarawak malaise', 'Ensalada de pescado crudo umai de Sarawak malasia', 'Malaysischer Umai-Rohfischsalat aus Sarawak', 'seafood_mains', 'lunch', 'borneo', 160),
  R('أودانغ كاري ماليزي', 'Udang kari Malaysian prawn curry', 'Curry de crevettes udang kari malaisien', 'Curry de camarones udang kari malasio', 'Malaysisches Udang-Kari-Garnelencurry', 'seafood_mains', 'lunch', 'pan_malaysian', 200),
);
// --- soups_salads (22) --------------------------------------------------------
dishes.push(
  R('أسام لاكسا بينانغ ماليزي', 'Asam laksa Penang Malaysian sour fish noodle soup', 'Soupe de nouilles aigres au poisson asam laksa de Penang malaisienne', 'Sopa de fideos agria de pescado asam laksa de Penang malasia', 'Malaysische Asam-Laksa-Sauer-Fischnudelsuppe aus Penang', 'soups_salads', 'lunch', 'peninsular_malaysia', 260),
  R('لاكسا ليماك ماليزي', 'Laksa lemak Malaysian coconut curry noodle soup', 'Soupe de nouilles au curry coco laksa lemak malaisienne', 'Sopa de fideos con curry de coco laksa lemak malasia', 'Malaysische Laksa-Lemak-Kokoscurry-Nudelsuppe', 'soups_salads', 'lunch', 'peninsular_malaysia', 270),
  R('كاري لاكسا ماليزي', 'Curry laksa Malaysian curry noodle soup', 'Soupe de nouilles au curry laksa malaisienne', 'Sopa de fideos al curry laksa malasia', 'Malaysische Curry-Laksa-Nudelsuppe', 'soups_salads', 'lunch', 'pan_malaysian', 280),
  R('لاكسا سراوق ماليزي', 'Laksa Sarawak Malaysian Sarawak laksa', 'Laksa de Sarawak laksa Sarawak malaisienne', 'Laksa de Sarawak laksa Sarawak malasia', 'Malaysische Laksa-Sarawak-Suppe', 'soups_salads', 'lunch', 'borneo', 270),
  R('لاكسا جوهور ماليزي', 'Laksa Johor Malaysian Johor spaghetti laksa', 'Laksa aux spaghettis laksa Johor malaisien', 'Laksa con espaguetis laksa Johor malasio', 'Malaysische Laksa-Johor-Spaghettisuppe', 'soups_salads', 'lunch', 'peninsular_malaysia', 280),
  R('كاري مي ماليزي', 'Curry mee Malaysian curry noodle soup', 'Soupe de nouilles au curry curry mee malaisienne', 'Sopa de fideos al curry curry mee malasia', 'Malaysische Curry-Mee-Nudelsuppe', 'soups_salads', 'lunch', 'pan_malaysian', 290),
  R('سوب كامبينغ ماليزي', 'Sup kambing Malaysian lamb soup', 'Soupe d agneau sup kambing malaisienne', 'Sopa de cordero sup kambing malasia', 'Malaysische Sup-Kambing-Lammsuppe', 'soups_salads', 'lunch', 'pan_malaysian', 200),
  R('سوب إيكور ماليزي', 'Sup ekor Malaysian oxtail soup', 'Soupe de queue de bœuf sup ekor malaisienne', 'Sopa de rabo de res sup ekor malasia', 'Malaysische Sup-Ekor-Ochsenschwanzsuppe', 'soups_salads', 'lunch', 'pan_malaysian', 210),
  R('سوب تولانغ ماليزي', 'Sup tulang Malaysian bone marrow soup', 'Soupe d os à moelle sup tulang malaisienne', 'Sopa de tuétano sup tulang malasia', 'Malaysische Sup-Tulang-Knochenmarksuppe', 'soups_salads', 'lunch', 'pan_malaysian', 180),
  R('سوب أيام كامبونغ ماليزي', 'Sup ayam kampung Malaysian village chicken soup', 'Soupe de poulet villageois sup ayam kampung malaisienne', 'Sopa de pollo campesino sup ayam kampung malasia', 'Malaysische Sup-Ayam-Kampung-Dorfsuppe', 'soups_salads', 'lunch', 'pan_malaysian', 170),
  R('سوب إيكان ماليزي', 'Sup ikan Malaysian fish soup', 'Soupe de poisson sup ikan malaisienne', 'Sopa de pescado sup ikan malasia', 'Malaysische Sup-Ikan-Fischsuppe', 'soups_salads', 'lunch', 'pan_malaysian', 160),
  R('تومايام سوب ماليزي', 'Tomyam sup Malaysian spicy sour soup', 'Soupe aigre épicée tomyam sup malaise', 'Sopa agria picante tomyam sup malasia', 'Malaysische Tomyam-Sup-Sauer-Scharfe Suppe', 'soups_salads', 'lunch', 'asian_shared', 170),
  R('بوبور لامبوق ماليزي', 'Bubur lambuk Malaysian Ramadan spiced porridge', 'Porridge épicé de Ramadan bubur lambuk malaisien', 'Gachas especiadas de Ramadán bubur lambuk malasias', 'Malaysischer Bubur-Lambuk-Ramadan-Gewürzbrei', 'soups_salads', 'lunch', 'peninsular_malaysia', 230),
  R('سوب وان تون ماليزي', 'Sup wonton Malaysian chicken wonton soup', 'Soupe de wontons au poulet sup wonton malaise', 'Sopa de wonton de pollo sup wonton malasia', 'Malaysische Sup-Wonton-Hühnerwontonsuppe', 'soups_salads', 'lunch', 'asian_shared', 200),
  R('مي كولو سراوق ماليزي', 'Kolo mee Sarawak Malaysian Sarawak egg noodle', 'Nouilles aux œufs kolo mee de Sarawak malaisiennes', 'Tallarines con huevo kolo mee de Sarawak malasios', 'Malaysische Kolo-Mee-Sarawak-Eiernudeln', 'soups_salads', 'lunch', 'borneo', 300),
  R('لاكسا كيداه ماليزي', 'Laksa Kedah Malaysian Kedah laksa', 'Laksa de Kedah laksa Kedah malaisienne', 'Laksa de Kedah laksa Kedah malasia', 'Malaysische Laksa-Kedah-Suppe', 'soups_salads', 'lunch', 'peninsular_malaysia', 250),
  R('كيرابو مانغغا ماليزي', 'Kerabu mangga Malaysian mango salad', 'Salade de mangue kerabu mangga malaise', 'Ensalada de mango kerabu mangga malasia', 'Malaysischer Kerabu-Mangga-Mangosalat', 'soups_salads', 'lunch', 'pan_malaysian', 120),
  R('كيرابو تيمون ماليزي', 'Kerabu timun Malaysian cucumber salad', 'Salade de concombre kerabu timun malaise', 'Ensalada de pepino kerabu timun malasia', 'Malaysischer Kerabu-Timun-Gurkensalat', 'soups_salads', 'lunch', 'pan_malaysian', 110),
  R('كيرابو ماكاروني ماليزي', 'Kerabu makaroni Malaysian macaroni salad', 'Salade de macaroni kerabu makaroni malaise', 'Ensalada de macarrones kerabu makaroni malasia', 'Malaysischer Kerabu-Makaroni-Makaronensalat', 'soups_salads', 'lunch', 'pan_malaysian', 150),
  R('كيرابو بونغا كنتان ماليزي', 'Kerabu bunga kantan Malaysian torch ginger salad', 'Salade de gingembre torche kerabu bunga kantan malaise', 'Ensalada de jengibre antorcha kerabu bunga kantan malasia', 'Malaysischer Kerabu-Bunga-Kantan-Fackelgingersalat', 'soups_salads', 'lunch', 'pan_malaysian', 130),
  R('لاكسا نيونيا ماليزي', 'Nyonya laksa Malaysian Nyonya laksa', 'Laksa nyonya laksa Nyonya malaisienne', 'Laksa nyonya laksa Nyonya malasia', 'Malaysische Nyonya-Laksa-Nudelsuppe', 'soups_salads', 'lunch', 'peninsular_malaysia', 275),
  R('سوب داغينغ ماليزي', 'Sup daging Malaysian beef soup', 'Soupe de bœuf sup daging malaisienne', 'Sopa de res sup daging malasia', 'Malaysische Sup-Daging-Rindfleischsuppe', 'soups_salads', 'lunch', 'pan_malaysian', 190),
);
// --- street_snacks (30) -------------------------------------------------------
dishes.push(
  R('ساتاي أيام ماليزي', 'Satay ayam Malaysian chicken satay', 'Satay de poulet satay ayam malaisien', 'Satay de pollo satay ayam malasio', 'Malaysisches Satay-Ayam-Hähnchensatay', 'street_snacks', 'snacks', 'asian_shared', 210),
  R('ساتاي كامبينغ ماليزي', 'Satay kambing Malaysian lamb satay', 'Satay d agneau satay kambing malaisien', 'Satay de cordero satay kambing malasio', 'Malaysisches Satay-Kambing-Lammsatay', 'street_snacks', 'snacks', 'pan_malaysian', 230),
  R('ساتاي داغينغ ماليزي', 'Satay daging Malaysian beef satay', 'Satay de bœuf satay daging malaisien', 'Satay de res satay daging malasio', 'Malaysisches Satay-Daging-Rindsatay', 'street_snacks', 'snacks', 'pan_malaysian', 240),
  R('ساتاي أودانغ ماليزي', 'Satay udang Malaysian prawn satay', 'Satay de crevettes satay udang malaisien', 'Satay de camarones satay udang malasio', 'Malaysisches Satay-Udang-Garnelensatay', 'street_snacks', 'snacks', 'pan_malaysian', 200),
  R('ساتاي سوتونغ ماليزي', 'Satay sotong Malaysian squid satay', 'Satay de calmar satay sotong malaisien', 'Satay de calamar satay sotong malasio', 'Malaysisches Satay-Sotong-Kalmarsatay', 'street_snacks', 'snacks', 'pan_malaysian', 190),
  R('ساتاي تاهو ماليزي', 'Satay tauhu Malaysian tofu satay', 'Satay de tofu satay tauhu malaisien', 'Satay de tofu satay tauhu malasio', 'Malaysisches Satay-Tauhu-Tofusatay', 'street_snacks', 'snacks', 'pan_malaysian', 200),
  R('مورتاك أيام ماليزي', 'Murtabak ayam Malaysian chicken murtabak', 'Murtabak au poulet murtabak ayam malaisien', 'Murtabak de pollo murtabak ayam malasio', 'Malaysischer Murtabak-Ayam-Hühnermurtabak', 'street_snacks', 'snacks', 'pan_malaysian', 320),
  R('مورتاك داغينغ ماليزي', 'Murtabak daging Malaysian beef murtabak', 'Murtabak au bœuf murtabak daging malaisien', 'Murtabak de res murtabak daging malasio', 'Malaysischer Murtabak-Daging-Rindmurtabak', 'street_snacks', 'snacks', 'pan_malaysian', 330),
  R('مورتاك كامبينغ ماليزي', 'Murtabak kambing Malaysian lamb murtabak', 'Murtabak d agneau murtabak kambing malaisien', 'Murtabak de cordero murtabak kambing malasio', 'Malaysischer Murtabak-Kambing-Lammmurtabak', 'street_snacks', 'snacks', 'pan_malaysian', 330),
  R('أبام باليك ماليزي', 'Apam balik Malaysian peanut corn pancake', 'Crêpe aux arachides et maïs apam balik malaisienne', 'Panqueque de maní y maíz apam balik malasio', 'Malaysische Apam-Balik-Erdnuss-Mais-Pfannkuchen', 'street_snacks', 'snacks', 'pan_malaysian', 250),
  R('روجاك ماليزي', 'Rojak Malaysian fruit and vegetable salad', 'Salade de fruits et légumes rojak malaise', 'Ensalada de frutas y verduras rojak malasia', 'Malaysischer Rojak-Frucht-Gemüse-Salat', 'street_snacks', 'snacks', 'pan_malaysian', 160),
  R('باسيمبور ماليزي', 'Pasembur Malaysian Penang rojak salad', 'Salade rojak de Penang pasembur malaisienne', 'Ensalada rojak de Penang pasembur malasia', 'Malaysischer Pasembur-Penang-Rojaksalat', 'street_snacks', 'snacks', 'peninsular_malaysia', 180),
  R('كيروبوك ليكور ماليزي', 'Keropok lekor Malaysian Terengganu fish crackers', 'Galettes de poisson keropok lekor de Terengganu malaisiennes', 'Galletas de pescado keropok lekor de Terengganu malasias', 'Malaysische Keropok-Lekor-Fischcracker aus Terengganu', 'street_snacks', 'snacks', 'peninsular_malaysia', 200),
  R('كيروبوك غورينغ ماليزي', 'Keropok goreng Malaysian fried fish crackers', 'Galettes de poisson frites keropok goreng malaisiennes', 'Galletas de pescado fritas keropok goreng malasias', 'Malaysische Keropok-Goreng-Fischcracker', 'street_snacks', 'snacks', 'pan_malaysian', 190),
  R('بيزانغ غورينغ ماليزي', 'Pisang goreng Malaysian fried banana', 'Banane frite pisang goreng malaisienne', 'Plátano frito pisang goreng malasio', 'Malaysische Pisang-Goreng-Frittenbanane', 'street_snacks', 'snacks', 'pan_malaysian', 220),
  R('أوبي غورينغ ماليزي', 'Ubi goreng Malaysian fried sweet potato', 'Patate douce frite ubi goreng malaisienne', 'Boniato frito ubi goreng malasio', 'Malaysische Ubi-Goreng-Süßkartoffel', 'street_snacks', 'snacks', 'pan_malaysian', 210),
  R('كاريباب ماليزي', 'Karipap Malaysian curry puff', 'Chausson au curry karipap malaisien', 'Empanadilla de curry karipap malasia', 'Malaysische Karipap-Currypüffel', 'street_snacks', 'snacks', 'pan_malaysian', 230),
  R('تشوكور أودانغ ماليزي', 'Cucur udang Malaysian prawn fritters', 'Beignets de crevettes cucur udang malaisiens', 'Buñuelos de camarón cucur udang malasios', 'Malaysische Cucur-Udang-Garnelenbeignets', 'street_snacks', 'snacks', 'pan_malaysian', 210),
  R('تشوكور سايور ماليزي', 'Cucur sayur Malaysian vegetable fritters', 'Beignets de légumes cucur sayur malaisiens', 'Buñuelos de verduras cucur sayur malasios', 'Malaysische Cucur-Sayur-Gemüsebeignets', 'street_snacks', 'snacks', 'pan_malaysian', 190),
  R('ڤاداي ماليزي', 'Vadai Malaysian lentil fritter', 'Beignet de lentilles vadai malaisien', 'Buñuelo de lenteja vadai malasio', 'Malaysische Vadai-Linsenbeignets', 'street_snacks', 'snacks', 'asian_shared', 200),
  R('بوبيا ماليزي', 'Popiah Malaysian fresh spring roll', 'Rouleau de printemps frais popiah malaisien', 'Rollo de primavera fresco popiah malasio', 'Malaysische Popiah-Frühlingsrolle', 'street_snacks', 'snacks', 'asian_shared', 150),
  R('بوبيا غورينغ ماليزي', 'Popiah goreng Malaysian fried spring rolls', 'Rouleaux de printemps frits popiah goreng malaisiens', 'Rollos de primavera fritos popiah goreng malasios', 'Malaysische Popiah-Goreng-Frühlingsrollen', 'street_snacks', 'snacks', 'pan_malaysian', 210),
  R('يونغ تاوفو ماليزي', 'Yong tau foo Malaysian stuffed tofu platter', 'Assortiment de tofu farci yong tau foo malaisien', 'Plato de tofu relleno yong tau foo malasio', 'Malaysische Yong-Tau-Foo-Gefüllter-Tofu-Platte', 'street_snacks', 'snacks', 'asian_shared', 190),
  R('تشار كوي تياو ماليزي', 'Char kway teow Malaysian Penang stir fried noodles', 'Nouilles sautées char kway teow de Penang malaisiennes', 'Tallarines salteados char kway teow de Penang malasios', 'Malaysische Char-Kway-Teow-Nudeln aus Penang', 'street_snacks', 'lunch', 'peninsular_malaysia', 330),
  R('تشار كوي تياو أودانغ ماليزي', 'Char kway teow udang Malaysian prawn stir fried noodles', 'Nouilles sautées aux crevettes char kway teow malaisiennes', 'Tallarines salteados con camarones char kway teow malasios', 'Malaysische Char-Kway-Teow-Udang-Nudeln', 'street_snacks', 'lunch', 'peninsular_malaysia', 340),
  R('تشار كوي تياو سوتونغ ماليزي', 'Char kway teow sotong Malaysian squid stir fried noodles', 'Nouilles sautées au calmar char kway teow malaisiennes', 'Tallarines salteados con calamar char kway teow malasios', 'Malaysische Char-Kway-Teow-Sotong-Nudeln', 'street_snacks', 'lunch', 'peninsular_malaysia', 335),
  R('هو فون إيبوه ماليزي', 'Ipoh hor fun Malaysian Ipoh rice noodle soup', 'Soupe de nouilles de riz hor fun d Ipoh malaisienne', 'Sopa de fideos de arroz hor fun de Ipoh malasia', 'Malaysische Ipoh-Hor-Fun-Reisnudelsuppe', 'street_snacks', 'lunch', 'peninsular_malaysia', 260),
  R('باو أيام ماليزي', 'Pau ayam Malaysian steamed chicken bun', 'Brioche vapeur au poulet pau ayam malaisienne', 'Panecillo al vapor con pollo pau ayam malasio', 'Malaysisches Pau-Ayam-Hühnerdampfbrötchen', 'street_snacks', 'snacks', 'asian_shared', 200),
  R('روجاك بويه ماليزي', 'Rojak buah Malaysian fruit rojak', 'Rojak de fruits rojak buah malaisien', 'Rojak de frutas rojak buah malasio', 'Malaysischer Rojak-Buah-Fruchterojak', 'street_snacks', 'snacks', 'pan_malaysian', 150),
  R('كاجانغ غورينغ ماليزي', 'Kacang goreng Malaysian roasted peanuts', 'Arachides grillées kacang goreng malaisiennes', 'Maní tostado kacang goreng malasio', 'Malaysische Kacang-Goreng-Erdnüsse', 'street_snacks', 'snacks', 'pan_malaysian', 180),
);
// --- condiments (8) -----------------------------------------------------------
dishes.push(
  R('سامبال بيلاكان ماليزي', 'Sambal belacan Malaysian shrimp paste chili', 'Piment à la pâte de crevettes sambal belacan malaisien', 'Chile con pasta de camarón sambal belacan malasio', 'Malaysischer Sambal-Belacan-Garnelempastenchili', 'condiments', 'snacks', 'pan_malaysian', 90),
  R('سامبال كيكاب ماليزي', 'Sambal kicap Malaysian soy chili dip', 'Sauce piment soja sambal kicap malaise', 'Salsa chile y soja sambal kicap malasia', 'Malaysischer Sambal-Kicap-Sojachili', 'condiments', 'snacks', 'pan_malaysian', 80),
  R('سامبال كاجانغ ماليزي', 'Sambal kacang Malaysian satay peanut sauce', 'Sauce cacahuète sambal kacang malaisienne', 'Salsa de maní sambal kacang malasia', 'Malaysische Sambal-Kacang-Erdnusssauce', 'condiments', 'snacks', 'pan_malaysian', 120),
  R('سامبال تومات ماليزي', 'Sambal tomato Malaysian tomato chili', 'Piment à la tomate sambal tomato malaisien', 'Chile con tomate sambal tomato malasio', 'Malaysischer Sambal-Tomato-Tomatenchili', 'condiments', 'snacks', 'pan_malaysian', 70),
  R('أچار ماليزي', 'Acar Malaysian pickled vegetables', 'Légumes marinés acar malaisiens', 'Verduras encurtidas acar malasias', 'Malaysisches Acar-Gemüsepickle', 'condiments', 'snacks', 'pan_malaysian', 60),
  R('أچار رمباي ماليزي', 'Acar rampai Malaysian spiced pickle', 'Légumes marinés épicés acar rampai malaisiens', 'Verduras encurtidas especiadas acar rampai malasias', 'Malaysisches Acar-Rampai-Würzgemüse', 'condiments', 'snacks', 'pan_malaysian', 70),
  R('بودو ماليزي', 'Budu Malaysian Kelantan anchovy sauce', 'Sauce d anchois budu de Kelantan malaisienne', 'Salsa de anchoas budu de Kelantan malasia', 'Malaysische Budu-Anchovissauce aus Kelantan', 'condiments', 'snacks', 'peninsular_malaysia', 60),
  R('تيمبوي ماليزي', 'Tempoyak Malaysian fermented durian condiment', 'Condiment de durian fermenté tempoyak malaisien', 'Condimento de durián fermentado tempoyak malasio', 'Malaysisches Tempoyak-Fermentierter-Durian-Condiment', 'condiments', 'snacks', 'peninsular_malaysia', 90),
);
// --- desserts_sweets (21) -----------------------------------------------------
dishes.push(
  R('تشيندول ماليزي', 'Cendol Malaysian pandan jelly dessert', 'Dessert à la gelée pandan cendol malaisien', 'Postre de gelatina de pandan cendol malasio', 'Malaysisches Cendol-Pandangelee-Dessert', 'desserts_sweets', 'snacks', 'asian_shared', 170),
  R('آيس باتو كامبور ماليزي', 'Ais batu campur Malaysian shaved ice dessert', 'Dessert de glace pilée ais batu campur malaisien', 'Postre de hielo raspado ais batu campur malasio', 'Malaysisches Ais-Batu-Campur-Eiscremedessert', 'desserts_sweets', 'snacks', 'pan_malaysian', 200),
  R('ساغو غولا ميلاك ماليزي', 'Sago gula Melaka Malaysian palm sugar sago', 'Sagou au sucre de palme sago gula Melaka malaisien', 'Sagú con azúcar de palma sago gula Melaka malasio', 'Malaysisches Sago-Gula-Melaka-Palmzuckersago', 'desserts_sweets', 'snacks', 'peninsular_malaysia', 180),
  R('بوبور بولوت هيتام ماليزي', 'Bubur pulut hitam Malaysian black glutinous rice pudding', 'Pudding de riz gluant noir bubur pulut hitam malaisien', 'Pudín de arroz glutinoso negro bubur pulut hitam malasio', 'Malaysischer Bubur-Pulut-Hitam-Schwarzklebreispudding', 'desserts_sweets', 'snacks', 'pan_malaysian', 200),
  R('بوبور كاجانغ هيجاو ماليزي', 'Bubur kacang hijau Malaysian mung bean porridge dessert', 'Porridge de haricots mungo sucré bubur kacang hijau malaisien', 'Gachas dulces de frijol mungo bubur kacang hijau malasias', 'Malaysischer Bubur-Kacang-Hijau-Mungobohnenbrei', 'desserts_sweets', 'snacks', 'pan_malaysian', 190),
  R('بوبور تشا تشا ماليزي', 'Bubur cha cha Malaysian coconut tubers dessert', 'Dessert de tubercules au coco bubur cha cha malaisien', 'Postre de tubérculos con coco bubur cha cha malasio', 'Malaysisches Bubur-Cha-Cha-Knollendessert', 'desserts_sweets', 'snacks', 'pan_malaysian', 180),
  R('سيري موكا ماليزي', 'Seri muka Malaysian pandan custard rice cake', 'Gâteau de riz à la crème pandan seri muka malaisien', 'Pastel de arroz con crema de pandan seri muka malasio', 'Malaysischer Seri-Muka-Pandancremekuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 220),
  R('كويه لابيس ماليزي', 'Kuih lapis Malaysian layered rice cake', 'Gâteau de riz en couches kuih lapis malaisien', 'Pastel de arroz en capas kuih lapis malasio', 'Malaysischer Kuih-Lapis-Reisschichtkuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 170),
  R('كويه تالام ماليزي', 'Kuih talam Malaysian steamed layer cake', 'Gâteau vapeur en étages kuih talam malaisien', 'Pastel al vapor en capas kuih talam malasio', 'Malaysischer Kuih-Talam-Dampfschichtkuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 190),
  R('كويه كتاياب ماليزي', 'Kuih ketayap Malaysian coconut crepe roll', 'Rouleau de crêpe au coco kuih ketayap malaisien', 'Rollo de crepe con coco kuih ketayap malasio', 'Malaysische Kuih-Ketayap-Kreperolle mit Kokos', 'desserts_sweets', 'snacks', 'pan_malaysian', 180),
  R('أوندي أوندي ماليزي', 'Ondeh ondeh Malaysian palm sugar balls', 'Boules au sucre de palme ondeh ondeh malaisiennes', 'Bolas de azúcar de palma ondeh ondeh malasias', 'Malaysische Ondeh-Ondeh-Palmenzuckerbällchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 170),
  R('كويه كيريا ماليزي', 'Kuih keria Malaysian sweet potato doughnuts', 'Beignets de patate douce kuih keria malaisiens', 'Dónuts de boniato kuih keria malasios', 'Malaysische Kuih-Keria-Süßkartoffeldonuts', 'desserts_sweets', 'snacks', 'pan_malaysian', 210),
  R('دودول ماليزي', 'Dodol Malaysian coconut sticky sweet', 'Douceur collante au coco dodol malaisienne', 'Dulce pegajoso de coco dodol malasio', 'Malaysischer Dodol-Kokosklebsüßen', 'desserts_sweets', 'snacks', 'peninsular_malaysia', 250),
  R('واجك ماليزي', 'Wajik Malaysian glutinous rice sweet', 'Douceur de riz gluant wajik malaisienne', 'Dulce de arroz glutinoso wajik malasio', 'Malaysische Wajik-Klebreis-Süßigkeit', 'desserts_sweets', 'snacks', 'pan_malaysian', 240),
  R('باهولو ماليزي', 'Bahulu Malaysian sponge cake', 'Gâteau éponge bahulu malaisien', 'Bizcocho bahulu malasio', 'Malaysischer Bahulu-Biskuitkuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 220),
  R('كويه كوتشي ماليزي', 'Kuih koci Malaysian glutinous coconut cake', 'Gâteau gluant au coco kuih koci malaisien', 'Pastel glutinoso con coco kuih koci malasio', 'Malaysischer Kuih-Koci-Klebreiskuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 190),
  R('بينغات بيزانغ ماليزي', 'Pengat pisang Malaysian banana custard', 'Crème à la banane pengat pisang malaisienne', 'Natilla de plátano pengat pisang malasia', 'Malaysische Pengat-Pisang-Bananencreme', 'desserts_sweets', 'snacks', 'pan_malaysian', 160),
  R('كويه أنغكو ماليزي', 'Kuih angku Malaysian red bean cake', 'Gâteau aux haricots rouges kuih angku malaisien', 'Pastel de frijoles rojos kuih angku malasio', 'Malaysischer Kuih-Angku-Rotbohnenkuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 180),
  R('كويه باكول ماليزي', 'Kuih bakul Malaysian sticky rice cake', 'Gâteau de riz gluant kuih bakul malaisien', 'Pastel de arroz glutinoso kuih bakul malasio', 'Malaysischer Kuih-Bakul-Klebreiskuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 240),
  R('كويه كوسي ماليزي', 'Kuih kusyi Malaysian coconut cake', 'Gâteau au coco kuih kusyi malaisien', 'Pastel de coco kuih kusyi malasio', 'Malaysischer Kuih-Kusyi-Kokoskuchen', 'desserts_sweets', 'snacks', 'pan_malaysian', 190),
  R('آجار آجار كيلابا ماليزي', 'Agar agar kelapa Malaysian coconut jelly', 'Gelée de coco agar agar kelapa malaise', 'Gelatina de coco agar agar kelapa malasia', 'Malaysisches Agar-Agar-Kelapa-Kokosgelee', 'desserts_sweets', 'snacks', 'pan_malaysian', 120),
);
// --- beverages (23) -----------------------------------------------------------
dishes.push(
  R('تيه تاريك ماليزي', 'Teh tarik Malaysian pulled tea', 'Thé tiré teh tarik malaisien', 'Té tirado teh tarik malasio', 'Malaysischer Teh-Tarik-Gezogener Tee', 'beverages', 'snacks', 'asian_shared', 110),
  R('تيه تاريك آيس ماليزي', 'Teh tarik ais Malaysian iced pulled tea', 'Thé tiré glacé teh tarik ais malaisien', 'Té tirado helado teh tarik ais malasio', 'Malaysischer Teh-Tarik-Ais-Eistee', 'beverages', 'snacks', 'pan_malaysian', 100),
  R('كوبي تاريك ماليزي', 'Kopi tarik Malaysian pulled coffee', 'Café tiré kopi tarik malaisien', 'Café tirado kopi tarik malasio', 'Malaysischer Kopi-Tarik-Gezogener Kaffee', 'beverages', 'snacks', 'pan_malaysian', 100),
  R('كوبي أ ماليزي', 'Kopi O Malaysian black coffee', 'Café noir kopi O malaisien', 'Café negro kopi O malasio', 'Malaysischer Kopi-O-Schwarzer Kaffee', 'beverages', 'snacks', 'pan_malaysian', 80),
  R('كوبي آيس ماليزي', 'Kopi ais Malaysian iced coffee', 'Café glacé kopi ais malaisien', 'Café helado kopi ais malasio', 'Malaysischer Kopi-Ais-Eiskaffee', 'beverages', 'snacks', 'pan_malaysian', 95),
  R('تيه أ آيس ماليزي', 'Teh O ais Malaysian iced black tea', 'Thé noir glacé teh O ais malaisien', 'Té negro helado teh O ais malasio', 'Malaysischer Teh-O-Ais-Eisteew', 'beverages', 'snacks', 'pan_malaysian', 70),
  R('سيراب باندونغ ماليزي', 'Sirap bandung Malaysian rose milk drink', 'Boisson rose au lait sirap bandung malaisienne', 'Bebida rosa con leche sirap bandung malasia', 'Malaysisches Sirap-Bandung-Rosenmilchgetränk', 'beverages', 'snacks', 'pan_malaysian', 90),
  R('ليماو آيس ماليزي', 'Limau ais Malaysian iced lime juice', 'Jus de citron vert glacé limau ais malaisien', 'Jugo de lima helado limau ais malasio', 'Malaysischer Limau-Ais-Limetten-Eissaft', 'beverages', 'snacks', 'pan_malaysian', 60),
  R('آيس كيلابا مودا ماليزي', 'Ais kelapa muda Malaysian iced young coconut', 'Coco jeune glacé ais kelapa muda malaisien', 'Coco joven helado ais kelapa muda malasio', 'Malaysisches Ais-Kelapa-Muda-Eisjungkokosnuss', 'beverages', 'snacks', 'asian_shared', 80),
  R('آير كيلابا ماليزي', 'Air kelapa Malaysian coconut water', 'Eau de coco air kelapa malaisienne', 'Agua de coco air kelapa malasia', 'Malaysisches Air-Kelapa-Kokoswasser', 'beverages', 'snacks', 'pan_malaysian', 60),
  R('سوسو كورما ماليزي', 'Susu kurma Malaysian dates milk', 'Lait aux dattes susu kurma malaisien', 'Leche con dátiles susu kurma malasia', 'Malaysische Susu-Kurma-Dattelmilch', 'beverages', 'snacks', 'pan_malaysian', 90),
  R('جوس مانغغا ماليزي', 'Jus mangga Malaysian mango juice', 'Jus de mangue jus mangga malaisien', 'Jugo de mango jus mangga malasio', 'Malaysischer Jus-Mangga-Mangosaft', 'beverages', 'snacks', 'pan_malaysian', 110),
  R('جوس جامبو ماليزي', 'Jus jambu Malaysian guava juice', 'Jus de goyave jus jambu malaisien', 'Jugo de guayaba jus jambu malasio', 'Malaysischer Jus-Jambu-Guavensaft', 'beverages', 'snacks', 'pan_malaysian', 80),
  R('جوس أسام بوي ماليزي', 'Jus asam boi Malaysian salted plum drink', 'Boisson à la prune salée jus asam boi malaisienne', 'Bebida de ciruela salada jus asam boi malasia', 'Malaysisches Jus-Asam-Boi-Gesalzenes-Plumpgetränk', 'beverages', 'snacks', 'pan_malaysian', 70),
  R('تشين تشاو آيس ماليزي', 'Chin chow ais Malaysian grass jelly drink', 'Boisson à la gelée d herbe chin chow ais malaisienne', 'Bebida de gelatina de hierba chin chow ais malasia', 'Malaysisches Chin-Chow-Ais-Kräutergeleedrink', 'beverages', 'snacks', 'asian_shared', 90),
  R('بارلي جيلي آيس ماليزي', 'Barley jelly ais Malaysian barley jelly drink', 'Boisson d orge et gelée barley malaisienne', 'Bebida de cebada con gelatina barley malasia', 'Malaysisches Barley-Jelly-Gerstengeleedrink', 'beverages', 'snacks', 'asian_shared', 100),
  R('آير جوغونغ ماليزي', 'Air jagung Malaysian corn drink', 'Boisson au maïs air jagung malaisienne', 'Bebida de maíz air jagung malasia', 'Malaysisches Air-Jagung-Maisgetränk', 'beverages', 'snacks', 'pan_malaysian', 100),
  R('تيه هاليا ماليزي', 'Teh halia Malaysian ginger tea', 'Thé au gingembre teh halia malaisien', 'Té de jengibre teh halia malasio', 'Malaysischer Teh-Halia-Ingwertee', 'beverages', 'snacks', 'pan_malaysian', 70),
  R('كوبي هاليا ماليزي', 'Kopi halia Malaysian ginger coffee', 'Café au gingembre kopi halia malaisien', 'Café de jengibre kopi halia malasio', 'Malaysischer Kopi-Halia-Ingwerkaffee', 'beverages', 'snacks', 'pan_malaysian', 90),
  R('آيس ميلو ماليزي', 'Ais Milo Malaysian iced malted chocolate', 'Chocolat malté glacé ais Milo malaisien', 'Chocolate malteado helado ais Milo malasio', 'Malaysisches Ais-Milo-Eis-Malzcocos', 'beverages', 'snacks', 'pan_malaysian', 130),
  R('سوسو بكات آيس ماليزي', 'Susu pekat ais Malaysian iced condensed milk', 'Lait concentré glacé susu pekat ais malaisien', 'Leche condensada helada susu pekat ais malasia', 'Malaysisches Susu-Pekat-Ais-Eiskondensmilch', 'beverages', 'snacks', 'pan_malaysian', 90),
  R('آير تيبو ماليزي', 'Air tebu Malaysian sugarcane juice', 'Jus de canne à sucre air tebu malaisien', 'Jugo de caña de azúcar air tebu malasio', 'Malaysischer Air-Tebu-Zuckerrohrsaft', 'beverages', 'snacks', 'pan_malaysian', 120),
  R('جوس تيمبيكاي ماليزي', 'Jus tembikai Malaysian watermelon juice', 'Jus de pastèque jus tembikai malaisien', 'Jugo de sandía jus tembikai malasio', 'Malaysischer Jus-Tembikai-Wassermelonensaft', 'beverages', 'snacks', 'pan_malaysian', 80),
);

// ============================================================ MACROS
const MACRO_TPL = {
  breakfast_items: [7, 28, 7],
  breads_flatbreads: [8, 38, 5],
  rice_biryani: [6, 30, 4],
  dals_legumes: [7, 16, 3],
  vegetarian_mains: [5, 12, 6],
  poultry_mains: [24, 6, 8],
  meat_mains: [23, 3, 12],
  seafood_mains: [20, 5, 6],
  soups_salads: [4, 10, 2],
  street_snacks: [6, 22, 8],
  condiments: [3, 8, 5],
  desserts_sweets: [6, 30, 12],
  beverages: [2, 10, 2],
};
const r1 = (v) => Math.round(v * 10) / 10;
for (const d of dishes) {
  const [tp, tc, tf] = MACRO_TPL[d.category];
  if (d.protein == null || d.carbs == null || d.fat == null) {
    const tcal = 4 * tp + 4 * tc + 9 * tf;
    const s = d.cal_100 / tcal;
    d.protein = r1(tp * s);
    d.carbs = r1(tc * s);
    d.fat = r1(tf * s);
  } else {
    d.protein = r1(d.protein); d.carbs = r1(d.carbs); d.fat = r1(d.fat);
  }
  d.cal_100 = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
}

// ============================================================ ASSERT
const byRegion = {};
for (const d of dishes) byRegion[d.region] = (byRegion[d.region] ?? 0) + 1;
const byCategory = {};
for (const d of dishes) byCategory[d.category] = (byCategory[d.category] ?? 0) + 1;
const byMeal = {};
for (const d of dishes) byMeal[d.mealType] = (byMeal[d.mealType] ?? 0) + 1;

console.log('TOTAL dishes:', dishes.length);
console.log('By region:', JSON.stringify(byRegion, null, 0));
console.log('By category:', JSON.stringify(byCategory, null, 0));
console.log('By meal:', JSON.stringify(byMeal, null, 0));

if (dishes.length !== 300) {
  console.error(`\nEXPECTED 300 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'malaysia-300-proposal.json'),
  JSON.stringify(
    {
      meta: { target: 300, new_dishes: dishes.length, legacy_dishes: 0, with_macros: true },
      categories: Object.keys(byCategory),
      regions: Object.keys(byRegion),
      meal_types: Object.keys(byMeal),
      dishes,
    },
    null,
    2
  )
);
console.log('\nWrote scripts/malaysia-300-proposal.json');