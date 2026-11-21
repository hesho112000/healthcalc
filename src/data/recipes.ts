import { pickLocalized, type LangText, type Language, type LocalizedTextList } from '../types';

export type { LangText } from '../types';

export interface Recipe {
  id: string;
  slug: string;
  foodLibraryDishId?: string;
  imageUrl?: string;
  emoji: string;
  title: LangText;
  cuisine: LangText;
  description: LangText;
  prepTime: LangText;
  cookTime?: LangText;
  ingredients: LocalizedTextList;
  instructions: LocalizedTextList;
  nutrition: { calories: number; protein: number; carbs: number; fat: number };
}

export const lt = (text: LangText, lang: Language): string => pickLocalized(text, lang);

export const ltList = (text: LocalizedTextList, lang: Language): string[] =>
  pickLocalized(text, lang);

const FOUL: Recipe = {
  id: 'foul-medames',
  slug: 'foul-medames',
  emoji: '🫘',
  title: {
    en: 'Foul Medames',
    ar: 'فول مدمس',
    fr: 'Foul Medames aux fèves',
    es: 'Foul Medames con habas',
    hi: 'फ़ूल मेदामेस',
  },
  cuisine: { en: 'Egyptian', ar: 'مصري' },
  description: {
    en: 'A creamy, protein-packed Egyptian fava bean breakfast bowl that keeps you full for hours.',
    ar: 'طبق مصري كريمي غني بالبروتين من الفول، يبقيك شبعانًا لساعات.',
    fr: 'Un bol de petit-déjeuner égyptien crémeux et riche en protéines, à base de fèves, qui vous rassasie pendant des heures.',
    es: 'Un bol de desayuno egipcio cremoso y rico en proteínas, hecho con habas, que te mantiene saciado durante horas.',
    hi: 'मलाईदार और प्रोटीन से भरपूर मिस्र का फवा बीन नाश्ता, जो आपको घंटों तक भरा हुआ रखता है।',
  },
  prepTime: { en: '10 min', ar: '10 دقائق' },
  ingredients: {
    en: [
      '1 can (400 g) fava beans, drained and rinsed',
      '2 tbsp tahini',
      '1 clove garlic, minced',
      '1 lemon, juiced',
      '1/2 tsp ground cumin',
      '2 tbsp olive oil',
      'Salt to taste',
      'Toppings: chopped tomatoes, onion, parsley, chili flakes',
    ],
    ar: [
      'علبة (400 غرام) فول مدمس، مصفى ومغسول',
      'ملعقتان كبيرتان طحينة',
      'فص ثوم مفروم',
      'عصير ليمونة',
      'نصف ملعقة صغيرة كمون مطحون',
      'ملعقتان كبيرتان زيت زيتون',
      'ملح حسب الرغبة',
      'للوجه: طماطم مقطعة، بصل، بقدونس، شطة',
    ],
  },
  instructions: {
    en: [
      'Heat the fava beans gently in a pot over medium heat for 3–4 minutes, mashing lightly with a fork.',
      'In a bowl, stir together tahini, garlic, lemon juice, cumin, and olive oil.',
      'Fold the tahini mixture into the beans and season with salt.',
      'Simmer for another 2 minutes until thick and creamy.',
      'Serve in a bowl, drizzle with extra olive oil, and top with tomatoes, onion, parsley, and chili flakes.',
    ],
    ar: [
      'سخّن الفول بلطف في قدر على نار متوسطة لمدة 3 إلى 4 دقائق، واهرسه قليلًا بالشوكة.',
      'في وعاء، اخلط الطحينة والثوم وعصير الليمون والكمون وزيت الزيتون.',
      'أضف خليط الطحينة إلى الفول وتبّل بالملح.',
      'اتركه يُطهى دقيقتين إضافيتين حتى يصبح كثيفًا وكريميًا.',
      'قدّم الفول في طبق، ورش زيت الزيتون، وزين بالطماطم والبصل والبقدونس والشطة.',
    ],
    fr: [
      'Chauffez doucement les fèves dans une casserole à feu moyen pendant 3 à 4 minutes, en les écrasant légèrement avec une fourchette.',
      'Dans un bol, mélangez le tahini, l’ail, le jus de citron, le cumin et l’huile d’olive.',
      'Incorporez le mélange de tahini aux fèves et assaisonnez avec du sel.',
      'Laissez mijoter encore 2 minutes jusqu’à ce que le mélange soit épais et crémeux.',
      'Servez dans un bol, arrosez d’un filet d’huile d’olive et garnissez de tomates, d’oignon, de persil et de flocons de piment.',
    ],
    es: [
      'Calienta las habas suavemente en una olla a fuego medio durante 3 a 4 minutos, aplastándolas ligeramente con un tenedor.',
      'En un bol, mezcla el tahini, el ajo, el zumo de limón, el comino y el aceite de oliva.',
      'Incorpora la mezcla de tahini a las habas y sazona con sal.',
      'Cocina a fuego lento otros 2 minutos hasta que la mezcla espese y quede cremosa.',
      'Sirve en un bol, rocía con un poco de aceite de oliva y cubre con tomate, cebolla, perejil y copos de chile.',
    ],
    hi: [
      'फवा बीन्स को एक बर्तन में मध्यम आँच पर 3 से 4 मिनट तक धीरे-धीरे गरम करें और काँटे से हल्का मैश करें।',
      'एक कटोरे में ताहिनी, लहसुन, नींबू का रस, जीरा और जैतून का तेल मिलाएँ।',
      'ताहिनी का मिश्रण फवा बीन्स में मिलाएँ और नमक से स्वाद बढ़ाएँ।',
      '2 मिनट और धीमी आँच पर पकाएँ, जब तक मिश्रण गाढ़ा और मलाईदार न हो जाए।',
      'एक कटोरे में परोसें, ऊपर से जैतून का तेल डालें और टमाटर, प्याज़, अजमोद और मिर्च के गुच्छे से सजाएँ।',
    ],
  },
  nutrition: { calories: 220, protein: 13, carbs: 28, fat: 7 },
};

const CHICKEN_RICE: Recipe = {
  id: 'grilled-chicken-brown-rice',
  slug: 'grilled-chicken-brown-rice',
  emoji: '🍗',
  title: { en: 'Grilled Chicken with Brown Rice', ar: 'دجاج مشوي مع أرز بني' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: {
    en: 'Lean grilled chicken and fiber-rich brown rice — a balanced plate your blood sugar will thank you for.',
    ar: 'دجاج مشوي قليل الدهون وأرز بني غني بالألياف — طبق متوازن يفيد سكر دمك.',
  },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: [
      '2 chicken breasts (about 300 g)',
      '1 cup brown rice',
      '2 cups water',
      '2 tbsp olive oil',
      '1 tsp paprika',
      '1 tsp dried oregano',
      '1 lemon, juiced',
      'Salt and black pepper',
      'Steamed broccoli to serve',
    ],
    ar: [
      'صدرا دجاج (نحو 300 غرام)',
      'كوب أرز بني',
      'كوبان من الماء',
      'ملعقتان كبيرتان زيت زيتون',
      'ملعقة صغيرة بابريكا',
      'ملعقة صغيرة أوريغانو مجفف',
      'عصير ليمونة',
      'ملح وفلفل أسود',
      'بروكلي مطهو على البخار للتقديم',
    ],
  },
  instructions: {
    en: [
      'Rinse the brown rice and cook with 2 cups water on low heat for about 35 minutes until tender.',
      'Season the chicken with olive oil, paprika, oregano, lemon juice, salt, and pepper.',
      'Grill the chicken for 6–7 minutes per side until cooked through.',
      'Rest the chicken for 3 minutes, then slice.',
      'Serve over the rice with steamed broccoli on the side.',
    ],
    ar: [
      'اغسل الأرز البني واطبخه مع كوبي ماء على نار هادئة نحو 35 دقيقة حتى ينضج.',
      'تبّل الدجاج بزيت الزيتون والبابريكا والأوريغانو وعصير الليمون والملح والفلفل.',
      'اشوِ الدجاج 6 إلى 7 دقائق لكل جانب حتى ينضج تمامًا.',
      'اترك الدجاج يرتاح 3 دقائق ثم قطّعه.',
      'قدّم الدجاج فوق الأرز مع البروكلي المطهو على البخار.',
    ],
  },
  nutrition: { calories: 450, protein: 38, carbs: 46, fat: 12 },
};

const TAGINE: Recipe = {
  id: 'tunisian-vegetable-tagine',
  slug: 'tunisian-vegetable-tagine',
  emoji: '🥘',
  title: { en: 'Tunisian Vegetable Tagine', ar: 'طاجين تونسي بالخضار' },
  cuisine: { en: 'Tunisian', ar: 'تونسي' },
  description: {
    en: 'A baked egg-and-vegetable dish inspired by Tunisian home cooking — hearty, warming, and low in carbs.',
    ar: 'طبق مخبوز من البيض والخضار مستوحى من المطبخ التونسي — مريح ودافئ ومنخفض الكربوهيدرات.',
  },
  prepTime: { en: '40 min', ar: '40 دقيقة' },
  ingredients: {
    en: [
      '4 eggs',
      '1 zucchini, diced',
      '1 red bell pepper, diced',
      '1 onion, chopped',
      '2 tbsp olive oil',
      '1 tsp harissa (or chili paste)',
      '1/2 tsp ground caraway',
      'Salt and pepper',
      'Chopped parsley to garnish',
    ],
    ar: [
      '4 بيضات',
      'كوسة مقطعة مكعبات',
      'فلفل رومي أحمر مقطع مكعبات',
      'بصلة مفرومة',
      'ملعقتان كبيرتان زيت زيتون',
      'ملعقة صغيرة هريسة',
      'نصف ملعقة صغيرة كمون مطحون',
      'ملح وفلفل',
      'بقدونس مفروم للتزيين',
    ],
  },
  instructions: {
    en: [
      'Preheat the oven to 190°C (375°F).',
      'Sauté onion, zucchini, and pepper in olive oil with harissa and caraway for 5 minutes until soft.',
      'Spread the vegetables evenly in a small baking dish.',
      'Beat the eggs with salt and pepper, then pour over the vegetables.',
      'Bake for 20–25 minutes until the eggs are set and golden on top.',
      'Garnish with parsley, let rest 5 minutes, and serve warm.',
    ],
    ar: [
      'سخّن الفرن على 190 درجة مئوية.',
      'اقْلِ البصل والكوسة والفلفل في زيت الزيتون مع الهريسة والكمون لمدة 5 دقائق حتى يلين.',
      'افرد الخضار بالتساوي في صينية خبز صغيرة.',
      'اخفق البيض مع الملح والفلفل ثم اسكبه فوق الخضار.',
      'اخبز لمدة 20 إلى 25 دقيقة حتى يتماسك البيض ويصبح ذهبيًا من الأعلى.',
      'زيّن بالبقدونس واتركه يرتاح 5 دقائق وقدّمه دافئًا.',
    ],
  },
  nutrition: { calories: 320, protein: 18, carbs: 15, fat: 20 },
};

const TABBOULEH: Recipe = {
  id: 'lebanese-tabbouleh',
  slug: 'lebanese-tabbouleh',
  emoji: '🌿',
  title: { en: 'Lebanese Tabbouleh', ar: 'تبولة لبنانية' },
  cuisine: { en: 'Lebanese', ar: 'لبناني' },
  description: {
    en: 'A bright, herb-forward salad of parsley, bulgur, tomato, and lemon — fresh, light, and full of fiber.',
    ar: 'سلطة منعشة غنية بالأعشاب من البقدونس والبرغل والطماطم والليمون — طازجة وخفيفة وغنية بالألياف.',
  },
  prepTime: { en: '15 min', ar: '15 دقيقة' },
  ingredients: {
    en: [
      '2 large bunches flat-leaf parsley, finely chopped',
      '1/2 cup fine bulgur',
      '2 ripe tomatoes, finely diced',
      '4 spring onions, sliced',
      '1/4 cup olive oil',
      '2 lemons, juiced',
      '1/2 tsp salt',
      'Fresh mint leaves, chopped',
    ],
    ar: [
      'ربطان كبيران من البقدونس المفروم ناعمًا',
      'نصف كوب برغل ناعم',
      'حبتان من الطماطم الناضجة مقطعة ناعمًا',
      '4 رؤوس بصل أخضر شرائح',
      'ربع كوب زيت زيتون',
      'عصير ليمونتين',
      'نصف ملعقة صغيرة ملح',
      'أوراق نعناع طازجة مفرومة',
    ],
  },
  instructions: {
    en: [
      'Soak the bulgur in cold water for 10 minutes, then drain well and squeeze out excess liquid.',
      'Place the parsley, tomatoes, spring onions, and mint in a large bowl.',
      'Add the drained bulgur in the center.',
      'Whisk olive oil, lemon juice, and salt, then pour over the salad.',
      'Toss gently, taste, adjust the lemon and salt, and serve immediately.',
    ],
    ar: [
      'انقع البرغل في ماء بارد 10 دقائق ثم صفّه جيدًا واعصره من السوائل الزائدة.',
      'ضع البقدونس والطماطم والبصل الأخضر والنعناع في وعاء كبير.',
      'أضف البرغل المصفى في المنتصف.',
      'اخفق زيت الزيتون وعصير الليمون والملح ثم اسكبه فوق السلطة.',
      'قلّب برفق، وتذوّق واضبط الليمون والملح، وقدّم فورًا.',
    ],
  },
  nutrition: { calories: 180, protein: 4, carbs: 18, fat: 11 },
};

const KABSA: Recipe = {
  id: 'saudi-kabsa-lighter',
  slug: 'saudi-kabsa-lighter',
  emoji: '🍚',
  title: { en: 'Saudi Kabsa (Lighter Version)', ar: 'كبسة سعودية (نسخة خفيفة)' },
  cuisine: { en: 'Saudi', ar: 'سعودي' },
  description: {
    en: 'A lighter take on the classic Saudi rice dish — lean chicken, fragrant spices, and brown rice.',
    ar: 'نسخة أخف من الكبسة السعودية الكلاسيكية — دجاج قليل الدهون وتوابل عطرية وأرز بني.',
  },
  prepTime: { en: '45 min', ar: '45 دقيقة' },
  ingredients: {
    en: [
      '500 g skinless chicken pieces',
      '1 1/2 cups brown basmati rice',
      '1 onion, finely chopped',
      '3 cloves garlic, minced',
      '1 tbsp kabsa spice blend',
      '1 tbsp tomato paste',
      '2 tomatoes, chopped',
      '3 cups water',
      '2 tbsp olive oil',
      'Salt and pepper',
    ],
    ar: [
      '500 غرام قطع دجاج منزوع الجلد',
      'كوب ونصف أرز بسمتي بني',
      'بصلة مفرومة ناعمًا',
      '3 فصوص ثوم مفرومة',
      'ملعقة كبيرة بهارات الكبسة',
      'ملعقة كبيرة معجون طماطم',
      'حبتا طماطم مقطعتان',
      '3 أكواب ماء',
      'ملعقتان كبيرتان زيت زيتون',
      'ملح وفلفل',
    ],
  },
  instructions: {
    en: [
      'Brown the chicken in olive oil in a large pot for 4 minutes per side, then set aside.',
      'Sauté onion and garlic until soft, add kabsa spices, tomato paste, and tomatoes, and cook 2 minutes.',
      'Return chicken, add 3 cups water, and simmer covered for 25 minutes.',
      'Meanwhile, soak the brown rice for 15 minutes, then drain.',
      'Add the rice to the pot, season, cover, and cook on low for 20 more minutes until the water is absorbed.',
      'Rest for 5 minutes, fluff with a fork, and serve with a simple side salad.',
    ],
    ar: [
      'حمّر الدجاج في زيت الزيتون في قدر كبير لمدة 4 دقائق لكل جانب ثم ارفعه جانبًا.',
      'اقْلِ البصل والثوم حتى يلينا، ثم أضف بهارات الكبسة ومعجون الطماطم والطماطم واطبخ دقيقتين.',
      'أعد الدجاج وأضف 3 أكواب ماء واتركه ينضج مغطىً لمدة 25 دقيقة.',
      'في الأثناء، انقع الأرز البني 15 دقيقة ثم صفّه.',
      'أضف الأرز إلى القدر وتبّل وغطِّه واطبخه على نار هادئة 20 دقيقة إضافية حتى تمتص الماء.',
      'اتركه يرتاح 5 دقائق ثم قلبّه بالشوكة وقدّمه مع سلطة جانبية بسيطة.',
    ],
  },
  nutrition: { calories: 520, protein: 34, carbs: 62, fat: 12 },
};

const LENTIL_SOUP: Recipe = {
  id: 'moroccan-lentil-soup',
  slug: 'moroccan-lentil-soup',
  imageUrl: '/images/recipes/moroccan-lentil-soup.webp',
  emoji: '🍲',
  title: { en: 'Moroccan Lentil Soup', ar: 'شوربة عدس مغربية' },
  cuisine: { en: 'Moroccan', ar: 'مغربي' },
  description: {
    en: 'Red lentils simmered with warm Moroccan spices — creamy, cheap, and rich in protein and fiber.',
    ar: 'عدس أحمر مطبوخ مع توابل مغربية دافئة — كريمي واقتصادي وغني بالبروتين والألياف.',
  },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: [
      '1 cup red lentils, rinsed',
      '1 onion, chopped',
      '2 carrots, diced',
      '2 cloves garlic, minced',
      '1 tsp ground cumin',
      '1 tsp paprika',
      '1/2 tsp ground turmeric',
      '1 tbsp tomato paste',
      '4 cups vegetable stock',
      '2 tbsp olive oil',
      'Salt, pepper, and lemon juice to finish',
    ],
    ar: [
      'كوب عدس أحمر مغسول',
      'بصلة مفرومة',
      'جزرة مقطعة مكعبات',
      'فصان ثوم مفرومان',
      'ملعقة صغيرة كمون مطحون',
      'ملعقة صغيرة بابريكا',
      'نصف ملعقة صغيرة كركم مطحون',
      'ملعقة كبيرة معجون طماطم',
      '4 أكواب مرق خضار',
      'ملعقتان كبيرتان زيت زيتون',
      'ملح وفلفل وعصير ليمون في النهاية',
    ],
  },
  instructions: {
    en: [
      'Sauté onion, carrots, and garlic in olive oil for 5 minutes.',
      'Add cumin, paprika, turmeric, and tomato paste, and cook for 1 minute until fragrant.',
      'Add the lentils and vegetable stock and bring to a boil.',
      'Reduce the heat and simmer uncovered for 20–25 minutes until the lentils are soft.',
      'Blend half the soup for a creamier texture, return to the pot, and season.',
      'Serve with a squeeze of lemon and a drizzle of olive oil.',
    ],
    ar: [
      'اقْلِ البصل والجزر والثوم في زيت الزيتون 5 دقائق.',
      'أضف الكمون والبابريكا والكركم ومعجون الطماطم واطبخ دقيقة واحدة حتى تفوح الرائحة.',
      'أضف العدس ومرق الخضار واتركه يغلي.',
      'اخفض النار واتركه على نار هادئة دون غطاء 20 إلى 25 دقيقة حتى يلين العدس.',
      'اهرس نصف الشوربة لقوام كريمي، ثم أعدها للقدر وتبّلها.',
      'قدّمها مع عصير الليمون ورشة زيت زيتون.',
    ],
  },
  nutrition: { calories: 280, protein: 14, carbs: 42, fat: 7 },
};

const LEMON_HERB_SALMON: Recipe = {
  id: 'lemon-herb-grilled-salmon',
  slug: 'lemon-herb-grilled-salmon',
  emoji: '🐟',
  title: { en: 'Lemon Herb Grilled Salmon', ar: 'سلمون مشوي بالأعشاب والليمون' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'Grilled salmon with lemon, dill, and parsley, served with quinoa and broccoli for a balanced weeknight meal.',
    ar: 'سلمون مشوي بالليمون والشبت والبقدونس، يقدم مع الكينوا والبروكلي لوجبة متوازنة.',
  },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: [
      '4 salmon fillets (about 5 oz each)',
      '1 tbsp olive oil',
      '1 lemon, zested and juiced',
      '2 cloves garlic, minced',
      '1 tbsp chopped fresh dill',
      '1 tbsp chopped fresh parsley',
      '1/4 tsp black pepper',
      '2 cups cooked quinoa',
      '3 cups broccoli florets',
    ],
    ar: [
      '4 شرائح سلمون (نحو 140 غرامًا لكل شريحة)',
      'ملعقة كبيرة زيت زيتون',
      'بشر وعصير ليمونة',
      'فصان ثوم مفرومان',
      'ملعقة كبيرة شبت طازج مفروم',
      'ملعقة كبيرة بقدونس طازج مفروم',
      'ربع ملعقة صغيرة فلفل أسود',
      'كوبان كينوا مطبوخة',
      '3 أكواب زهرات بروكلي',
    ],
  },
  instructions: {
    en: [
      'Heat an outdoor grill or grill pan to medium-high and lightly oil the grates.',
      'Stir olive oil, lemon zest and juice, garlic, dill, parsley, and black pepper together.',
      'Brush the mixture over the salmon and let it stand for 10 minutes while the grill heats.',
      'Grill salmon for about 4–5 minutes per side, until it flakes easily and reaches a safe internal temperature of 145°F.',
      'Steam broccoli until tender-crisp and warm the cooked quinoa.',
      'Serve each salmon fillet with quinoa and broccoli, spooning any remaining lemon herbs over the top.',
    ],
    ar: [
      'سخّن الشواية أو مقلاة الشوي إلى حرارة متوسطة مرتفعة وادهن سطحها بقليل من الزيت.',
      'اخلط زيت الزيتون وبشر الليمون وعصيره والثوم والشبت والبقدونس والفلفل.',
      'ادهن السلمون بالخليط واتركه 10 دقائق أثناء تسخين الشواية.',
      'اشوِ السلمون نحو 4 إلى 5 دقائق لكل جانب حتى يتفتت بسهولة وتبلغ حرارته الداخلية الآمنة 145 فهرنهايت.',
      'اطه البروكلي بالبخار حتى يصبح طريًا ومتماسكًا، وسخّن الكينوا المطبوخة.',
      'قدّم كل شريحة مع الكينوا والبروكلي وأضف ما تبقى من خليط الأعشاب والليمون.',
    ],
  },
  nutrition: { calories: 430, protein: 37, carbs: 35, fat: 17 },
};

const AVOCADO_CHICKEN_BOWL: Recipe = {
  id: 'avocado-chicken-power-bowl',
  slug: 'avocado-chicken-power-bowl',
  emoji: '🥑',
  title: { en: 'Avocado Chicken Power Bowl', ar: 'وعاء الدجاج والأفوكادو المغذي' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'A colorful bowl of grilled chicken, brown rice, avocado, greens, and black beans with a bright lime dressing.',
    ar: 'وعاء ملون من الدجاج المشوي والأرز البني والأفوكادو والخضار والفاصوليا السوداء مع صلصة الليمون.',
  },
  prepTime: { en: '35 min', ar: '35 دقيقة' },
  ingredients: {
    en: [
      '2 boneless, skinless chicken breasts (about 12 oz total)',
      '1 tsp olive oil',
      '1/2 tsp ground cumin',
      '1/4 tsp paprika',
      '2 cups cooked brown rice',
      '1 ripe avocado, sliced',
      '1 cup black beans, drained and rinsed',
      '2 cups baby spinach',
      '1 cup cherry tomatoes, halved',
      'Juice of 1 lime',
      '2 tbsp plain Greek yogurt',
    ],
    ar: [
      'صدرا دجاج منزوعا العظم والجلد (نحو 340 غرامًا إجمالًا)',
      'ملعقة صغيرة زيت زيتون',
      'نصف ملعقة صغيرة كمون مطحون',
      'ربع ملعقة صغيرة بابريكا',
      'كوبان أرز بني مطبوخ',
      'حبة أفوكادو ناضجة مقطعة شرائح',
      'كوب فاصوليا سوداء مصفاة ومغسولة',
      'كوبان سبانخ صغيرة',
      'كوب طماطم كرزية مقطعة أنصافًا',
      'عصير ليمونة خضراء',
      'ملعقتان كبيرتان لبن يوناني سادة',
    ],
  },
  instructions: {
    en: [
      'Rub chicken with olive oil, cumin, and paprika.',
      'Grill or sear chicken over medium heat until browned and cooked through to 165°F; rest for 5 minutes, then slice.',
      'Whisk lime juice with Greek yogurt and 1 tablespoon of water to make a pourable dressing.',
      'Divide warm brown rice, spinach, black beans, and tomatoes among four bowls.',
      'Top each bowl with sliced chicken and avocado.',
      'Drizzle with lime dressing and serve; refrigerate leftovers promptly in separate covered containers.',
    ],
    ar: [
      'تبّل الدجاج بزيت الزيتون والكمون والبابريكا.',
      'اشوِ الدجاج أو حمّره على حرارة متوسطة حتى ينضج وتبلغ حرارته الداخلية 165 فهرنهايت؛ اتركه 5 دقائق ثم قطعه.',
      'اخفق عصير الليمون الأخضر مع اللبن اليوناني وملعقة ماء لتحضير صلصة سائلة.',
      'وزّع الأرز البني الدافئ والسبانخ والفاصوليا والطماطم على أربعة أوعية.',
      'أضف شرائح الدجاج والأفوكادو إلى كل وعاء.',
      'اسكب صلصة الليمون وقدّم؛ برّد البقايا سريعًا في أوعية مغطاة منفصلة.',
    ],
  },
  nutrition: { calories: 520, protein: 42, carbs: 50, fat: 17 },
};

const TURKEY_MEATBALLS_ZUCCHINI: Recipe = {
  id: 'lean-turkey-meatballs-zucchini',
  slug: 'lean-turkey-meatballs-zucchini',
  emoji: '🍝',
  title: { en: 'Lean Turkey Meatballs with Zucchini', ar: 'كرات ديك رومي قليلة الدهون مع الكوسا' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'Oven-baked lean turkey meatballs served with zucchini and tomato marinara for a lighter comfort-food dinner.',
    ar: 'كرات ديك رومي قليلة الدهون مخبوزة بالفرن وتقدم مع الكوسا وصلصة الطماطم لوجبة منزلية أخف.',
  },
  prepTime: { en: '40 min', ar: '40 دقيقة' },
  ingredients: {
    en: [
      '1 lb lean ground turkey',
      '1 large egg',
      '1/3 cup whole-wheat breadcrumbs',
      '2 tbsp grated Parmesan cheese',
      '2 cloves garlic, minced',
      '1 tsp dried Italian herbs',
      '2 medium zucchini, sliced into half-moons',
      '2 cups no-salt-added tomato marinara sauce',
      '1 tbsp olive oil',
      '2 tbsp chopped fresh basil',
    ],
    ar: [
      '450 غرام ديك رومي مفروم قليل الدهون',
      'بيضة كبيرة',
      'ثلث كوب فتات خبز من القمح الكامل',
      'ملعقتان كبيرتان جبن بارميزان مبشور',
      'فصان ثوم مفرومان',
      'ملعقة صغيرة أعشاب إيطالية مجففة',
      'حبتا كوسا متوسطتان مقطعتان أنصاف دوائر',
      'كوبان صلصة طماطم مارينارا قليلة الملح',
      'ملعقة كبيرة زيت زيتون',
      'ملعقتان كبيرتان ريحان طازج مفروم',
    ],
  },
  instructions: {
    en: [
      'Heat the oven to 400°F and line a rimmed baking sheet with parchment.',
      'Combine ground turkey, egg, breadcrumbs, Parmesan, garlic, and Italian herbs; mix gently until just combined.',
      'Shape into 16 small meatballs and arrange on the prepared baking sheet.',
      'Bake for 16–20 minutes, until browned and the center reaches 165°F.',
      'Meanwhile, warm marinara in a large skillet and simmer the zucchini in olive oil for 5–7 minutes until tender but still firm.',
      'Add the cooked meatballs to the sauce, spoon over zucchini, and finish with fresh basil.',
    ],
    ar: [
      'سخّن الفرن إلى 400 فهرنهايت وضع ورق خبز في صينية ذات حواف.',
      'اخلط الديك الرومي والبيض وفتات الخبز والبارميزان والثوم والأعشاب برفق حتى تتجانس.',
      'شكّل 16 كرة صغيرة ورتبها في الصينية.',
      'اخبز 16 إلى 20 دقيقة حتى تتحمر وتبلغ حرارة وسطها 165 فهرنهايت.',
      'في هذه الأثناء سخّن صلصة المارينارا واطه الكوسا بزيت الزيتون 5 إلى 7 دقائق حتى تلين مع بقائها متماسكة.',
      'أضف كرات اللحم المطهوة إلى الصلصة وقدّمها فوق الكوسا مع الريحان الطازج.',
    ],
  },
  nutrition: { calories: 390, protein: 36, carbs: 25, fat: 15 },
};

const GREEK_YOGURT_BERRY_PARFAIT: Recipe = {
  id: 'greek-yogurt-berry-parfait',
  slug: 'greek-yogurt-berry-parfait',
  emoji: '🫐',
  title: { en: 'Greek Yogurt Berry Parfait', ar: 'بارفيه اللبن اليوناني والتوت' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'A quick layered parfait with plain Greek yogurt, mixed berries, oats, and crunchy walnuts for breakfast or a snack.',
    ar: 'حلوى طبقات سريعة من اللبن اليوناني السادة والتوت والشوفان والجوز للفطور أو وجبة خفيفة.',
  },
  prepTime: { en: '10 min', ar: '10 دقائق' },
  ingredients: {
    en: [
      '2 cups plain nonfat Greek yogurt',
      '1 cup fresh or frozen mixed berries, thawed if frozen',
      '1/2 cup rolled oats or low-sugar granola',
      '2 tbsp chopped walnuts',
      '1 tsp honey, optional',
      '1/4 tsp ground cinnamon',
    ],
    ar: [
      'كوبان لبن يوناني سادة خالي الدسم',
      'كوب توت مشكل طازج أو مجمد بعد تذويبه',
      'نصف كوب شوفان ملفوف أو جرانولا قليلة السكر',
      'ملعقتان كبيرتان جوز مفروم',
      'ملعقة صغيرة عسل، اختياري',
      'ربع ملعقة صغيرة قرفة مطحونة',
    ],
  },
  instructions: {
    en: [
      'Stir cinnamon into the Greek yogurt.',
      'Spoon half of the yogurt into four glasses or jars.',
      'Add a layer of berries and a sprinkle of oats or granola.',
      'Repeat the layers with the remaining yogurt and berries.',
      'Top with walnuts and a small drizzle of honey if desired.',
      'Serve right away for crunchy oats, or cover and chill; add granola just before serving.',
    ],
    ar: [
      'اخلط القرفة مع اللبن اليوناني.',
      'ضع نصف كمية اللبن في أربعة أكواب أو أوعية زجاجية.',
      'أضف طبقة من التوت ورشة من الشوفان أو الجرانولا.',
      'كرر الطبقات ببقية اللبن والتوت.',
      'زيّن بالجوز وقليل من العسل حسب الرغبة.',
      'قدّم فورًا للحفاظ على قرمشة الشوفان، أو غطّه وبرّده وأضف الجرانولا قبل التقديم.',
    ],
  },
  nutrition: { calories: 300, protein: 25, carbs: 36, fat: 6 },
};

const HEALTHY_TURKEY_BURGER_BOWL: Recipe = {
  id: 'healthy-turkey-burger-bowl',
  slug: 'healthy-turkey-burger-bowl',
  foodLibraryDishId: 'bc320bd7-c128-40b8-bdf3-014535d56394',
  emoji: '🍔',
  title: { en: 'Healthy Turkey Burger Bowl', ar: 'وعاء برغر الديك الرومي الصحي' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Seasoned turkey burger, brown rice, crisp vegetables, and a tangy yogurt sauce in a filling bowl.', ar: 'برغر ديك رومي متبل مع الأرز البني والخضار الطازجة وصلصة اللبن المنعشة في وعاء مشبع.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['1 lb lean ground turkey', '1 tsp garlic powder', '1/2 tsp smoked paprika', '1 tsp olive oil', '2 cups cooked brown rice', '2 cups shredded lettuce', '1 cup chopped tomato', '1/2 red onion, sliced', '1/2 cup plain Greek yogurt', '1 tbsp lemon juice'],
    ar: ['450 غرام ديك رومي مفروم قليل الدهون', 'ملعقة صغيرة مسحوق ثوم', 'نصف ملعقة صغيرة بابريكا مدخنة', 'ملعقة صغيرة زيت زيتون', 'كوبان أرز بني مطبوخ', 'كوبان خس مفروم', 'كوب طماطم مقطعة', 'نصف بصلة حمراء مقطعة', 'نصف كوب لبن يوناني سادة', 'ملعقة كبيرة عصير ليمون'],
  },
  instructions: {
    en: ['Mix turkey with garlic powder and paprika; shape into four thin patties.', 'Heat oil in a skillet and cook patties for 5–6 minutes per side until browned and 165°F inside.', 'Stir Greek yogurt with lemon juice and a spoonful of water to make a sauce.', 'Divide warm rice, lettuce, tomato, and onion among bowls.', 'Slice the turkey patties, place over the bowls, and drizzle with yogurt sauce.'],
    ar: ['اخلط الديك الرومي مع مسحوق الثوم والبابريكا وشكّله إلى أربع أقراص رقيقة.', 'سخّن الزيت في مقلاة واطه الأقراص 5 إلى 6 دقائق لكل جانب حتى تتحمر وتبلغ حرارتها الداخلية 165 فهرنهايت.', 'اخلط اللبن اليوناني مع عصير الليمون وملعقة ماء لتحضير الصلصة.', 'وزّع الأرز الدافئ والخس والطماطم والبصل في الأوعية.', 'قطّع أقراص الديك الرومي وضعها فوق الأوعية ثم أضف صلصة اللبن.'],
  },
  nutrition: { calories: 470, protein: 39, carbs: 43, fat: 15 },
};

const BAKED_LEMON_CHICKEN_BROCCOLI: Recipe = {
  id: 'baked-lemon-chicken-broccoli',
  slug: 'baked-lemon-chicken-broccoli',
  emoji: '🍋',
  title: { en: 'Baked Lemon Chicken & Broccoli', ar: 'دجاج بالليمون والبروكلي في الفرن' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A simple sheet-pan dinner of juicy lemon chicken, broccoli, and quinoa with garlic and herbs.', ar: 'وجبة صينية سهلة من الدجاج الطري بالليمون والبروكلي والكينوا مع الثوم والأعشاب.' },
  prepTime: { en: '40 min', ar: '40 دقيقة' },
  ingredients: {
    en: ['4 boneless skinless chicken breasts (about 1 1/2 lb)', '4 cups broccoli florets', '1 lemon, zested and juiced', '2 tbsp olive oil', '2 cloves garlic, minced', '1 tsp dried oregano', '1/4 tsp black pepper', '2 cups cooked quinoa'],
    ar: ['4 صدور دجاج منزوعة العظم والجلد (نحو 680 غرامًا)', '4 أكواب زهرات بروكلي', 'بشر وعصير ليمونة', 'ملعقتان كبيرتان زيت زيتون', 'فصان ثوم مفرومان', 'ملعقة صغيرة أوريغانو مجفف', 'ربع ملعقة صغيرة فلفل أسود', 'كوبان كينوا مطبوخة'],
  },
  instructions: {
    en: ['Heat oven to 400°F and line a sheet pan with parchment.', 'Whisk lemon zest and juice with olive oil, garlic, oregano, and pepper.', 'Arrange chicken and broccoli on the pan; spoon the lemon mixture over both.', 'Bake 22–28 minutes, turning broccoli once, until chicken reaches 165°F.', 'Rest chicken for 5 minutes, slice, and serve with quinoa and pan juices.'],
    ar: ['سخّن الفرن إلى 400 فهرنهايت وبطّن صينية بورق الخَبز.', 'اخفق بشر الليمون وعصيره مع زيت الزيتون والثوم والأوريغانو والفلفل.', 'رتب الدجاج والبروكلي في الصينية واسكب خليط الليمون فوقهما.', 'اخبز 22 إلى 28 دقيقة مع تقليب البروكلي مرة حتى تبلغ حرارة الدجاج 165 فهرنهايت.', 'اترك الدجاج 5 دقائق ثم قطعه وقدمه مع الكينوا وعصارة الصينية.'],
  },
  nutrition: { calories: 430, protein: 43, carbs: 39, fat: 12 },
};

const SWEET_POTATO_BLACK_BEAN_TACOS: Recipe = {
  id: 'sweet-potato-black-bean-tacos',
  slug: 'sweet-potato-black-bean-tacos',
  emoji: '🌮',
  title: { en: 'Sweet Potato & Black Bean Tacos', ar: 'تاكو البطاطا الحلوة والفاصوليا السوداء' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Roasted sweet potato and seasoned black beans tucked into warm corn tortillas with crunchy cabbage and lime.', ar: 'بطاطا حلوة مشوية وفاصوليا سوداء متبلة داخل خبز الذرة الدافئ مع الملفوف المقرمش والليمون.' },
  prepTime: { en: '35 min', ar: '35 دقيقة' },
  ingredients: {
    en: ['2 medium sweet potatoes, cubed', '1 tsp olive oil', '1/2 tsp ground cumin', '1 can black beans, drained and rinsed', '8 small corn tortillas', '1 cup shredded red cabbage', '1/2 avocado, sliced', '1/2 cup mild salsa', '1 lime, cut into wedges'],
    ar: ['حبتا بطاطا حلوة متوسطتان مقطعتان مكعبات', 'ملعقة صغيرة زيت زيتون', 'نصف ملعقة صغيرة كمون مطحون', 'علبة فاصوليا سوداء مصفاة ومغسولة', '8 أرغفة ذرة صغيرة', 'كوب ملفوف أحمر مفروم', 'نصف أفوكادو مقطع شرائح', 'نصف كوب صلصة معتدلة', 'ليمونة خضراء مقطعة أرباعًا'],
  },
  instructions: {
    en: ['Heat oven to 425°F. Toss sweet potato with oil and cumin and roast 22–25 minutes until tender.', 'Warm black beans in a small pan with a splash of water.', 'Warm tortillas in a dry skillet until pliable.', 'Fill each tortilla with sweet potato, beans, cabbage, and avocado.', 'Top with salsa and squeeze lime over the tacos before serving.'],
    ar: ['سخّن الفرن إلى 425 فهرنهايت. قلّب البطاطا مع الزيت والكمون واشوها 22 إلى 25 دقيقة حتى تلين.', 'سخّن الفاصوليا السوداء في مقلاة صغيرة مع قليل من الماء.', 'دفّئ أرغفة الذرة في مقلاة جافة حتى تصبح لينة.', 'احشُ كل رغيف بالبطاطا والفاصوليا والملفوف والأفوكادو.', 'أضف الصلصة واعصر الليمون فوق التاكو قبل التقديم.'],
  },
  nutrition: { calories: 390, protein: 13, carbs: 63, fat: 11 },
};

const CLASSIC_COBB_SALAD_LIGHT: Recipe = {
  id: 'classic-cobb-salad-light',
  slug: 'classic-cobb-salad-light',
  emoji: '🥗',
  title: { en: 'Classic Cobb Salad (Light)', ar: 'سلطة كوب الكلاسيكية الخفيفة' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A lighter Cobb-style salad with chicken, egg, avocado, tomatoes, and a creamy yogurt herb dressing.', ar: 'سلطة كوب أخف بالدجاج والبيض والأفوكادو والطماطم وصلصة الأعشاب الكريمية باللبن.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['2 cups cooked chicken breast, diced', '4 cups chopped romaine lettuce', '2 hard-boiled eggs, quartered', '1/2 avocado, diced', '1 cup cherry tomatoes, halved', '1/2 cup cucumber, diced', '2 tbsp crumbled blue cheese', '1/2 cup plain Greek yogurt', '1 tbsp lemon juice', '1 tbsp chopped chives'],
    ar: ['كوبان صدر دجاج مطبوخ ومقطع مكعبات', '4 أكواب خس روماني مفروم', 'بيضتان مسلوقتان مقطعتان أرباعًا', 'نصف أفوكادو مقطع مكعبات', 'كوب طماطم كرزية مقطعة أنصافًا', 'نصف كوب خيار مكعبات', 'ملعقتان كبيرتان جبن أزرق مفتت', 'نصف كوب لبن يوناني سادة', 'ملعقة كبيرة عصير ليمون', 'ملعقة كبيرة ثوم معمر مفروم'],
  },
  instructions: {
    en: ['Whisk Greek yogurt, lemon juice, chives, and a tablespoon of water until smooth.', 'Arrange romaine on a large platter or divide among four plates.', 'Place chicken, egg, avocado, tomatoes, cucumber, and blue cheese in separate rows over the lettuce.', 'Drizzle lightly with yogurt dressing and serve extra dressing on the side.'],
    ar: ['اخفق اللبن اليوناني وعصير الليمون والثوم المعمر وملعقة ماء حتى يصبح الخليط ناعمًا.', 'رتب الخس الروماني في طبق كبير أو وزعه على أربعة أطباق.', 'ضع الدجاج والبيض والأفوكادو والطماطم والخيار والجبن الأزرق في صفوف فوق الخس.', 'أضف قليلًا من صلصة اللبن وقدّم الباقي جانبًا.'],
  },
  nutrition: { calories: 410, protein: 39, carbs: 19, fat: 21 },
};

const MAPLE_GLAZED_SALMON: Recipe = {
  id: 'maple-glazed-salmon',
  slug: 'maple-glazed-salmon',
  emoji: '🍁',
  title: { en: 'Maple Glazed Salmon', ar: 'سلمون بطبقة القيقب' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Oven-roasted salmon brushed with a light maple and mustard glaze, served with asparagus and brown rice.', ar: 'سلمون مشوي في الفرن مع طبقة خفيفة من القيقب والخردل، يقدم مع الهليون والأرز البني.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['4 salmon fillets (5 oz each)', '1 tbsp pure maple syrup', '1 tbsp Dijon mustard', '1 tsp low-sodium soy sauce', '1 clove garlic, minced', '1 lb asparagus, trimmed', '1 tsp olive oil', '2 cups cooked brown rice', '1/4 tsp black pepper'],
    ar: ['4 شرائح سلمون (نحو 140 غرامًا لكل شريحة)', 'ملعقة كبيرة شراب قيقب نقي', 'ملعقة كبيرة خردل ديجون', 'ملعقة صغيرة صلصة صويا قليلة الصوديوم', 'فص ثوم مفروم', '450 غرام هليون منزوع الأطراف', 'ملعقة صغيرة زيت زيتون', 'كوبان أرز بني مطبوخ', 'ربع ملعقة صغيرة فلفل أسود'],
  },
  instructions: {
    en: ['Heat oven to 400°F and place salmon on a lined baking sheet.', 'Whisk maple syrup, Dijon, soy sauce, and garlic; brush over the salmon.', 'Toss asparagus with olive oil and pepper and arrange beside the fish.', 'Roast 12–16 minutes until salmon flakes easily and reaches 145°F; broil briefly for more color if desired.', 'Serve with brown rice and spoon any pan glaze over the salmon.'],
    ar: ['سخّن الفرن إلى 400 فهرنهايت وضع السلمون في صينية مبطنة.', 'اخفق شراب القيقب وديجون وصلصة الصويا والثوم وادهن السلمون بالخليط.', 'قلّب الهليون مع زيت الزيتون والفلفل ورتبه بجانب السمك.', 'اشوِ 12 إلى 16 دقيقة حتى يتفتت السلمون بسهولة وتبلغ حرارته 145 فهرنهايت؛ ويمكن تحميره قليلًا من الأعلى.', 'قدّم مع الأرز البني واسكب ما تبقى من الصلصة فوق السلمون.'],
  },
  nutrition: { calories: 450, protein: 36, carbs: 39, fat: 17 },
};

const LEAN_BEEF_BROCCOLI_STIRFRY: Recipe = {
  id: 'lean-beef-broccoli-stirfry',
  slug: 'lean-beef-broccoli-stirfry',
  emoji: '🥦',
  title: { en: 'Lean Beef & Broccoli Stir-fry', ar: 'لحم بقري قليل الدهون مع البروكلي' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Tender lean beef and crisp broccoli in a quick ginger-garlic sauce, served over brown rice.', ar: 'لحم بقري طري قليل الدهون وبروكلي مقرمش بصلصة الزنجبيل والثوم السريعة فوق الأرز البني.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['1 lb lean sirloin, thinly sliced', '4 cups broccoli florets', '1 tbsp canola oil', '2 cloves garlic, minced', '1 tsp grated fresh ginger', '3 tbsp low-sodium soy sauce', '1 tsp cornstarch mixed with 2 tbsp water', '2 cups cooked brown rice', '1 tsp sesame seeds'],
    ar: ['450 غرام لحم سيرلوين قليل الدهون مقطع شرائح رفيعة', '4 أكواب زهرات بروكلي', 'ملعقة كبيرة زيت كانولا', 'فصان ثوم مفرومان', 'ملعقة صغيرة زنجبيل طازج مبشور', '3 ملاعق كبيرة صلصة صويا قليلة الصوديوم', 'ملعقة صغيرة نشا ممزوجة بملعقتين ماء', 'كوبان أرز بني مطبوخ', 'ملعقة صغيرة بذور سمسم'],
  },
  instructions: {
    en: ['Whisk soy sauce with the cornstarch mixture and set aside.', 'Heat half the oil in a large skillet; sear beef in batches for 1–2 minutes per side, then transfer to a plate.', 'Add remaining oil, broccoli, garlic, ginger, and 2 tablespoons water; cover and steam-sauté for 3 minutes.', 'Return beef to the skillet, pour in sauce, and toss until glossy and thickened.', 'Serve over brown rice and sprinkle with sesame seeds.'],
    ar: ['اخفق صلصة الصويا مع خليط النشا واتركه جانبًا.', 'سخّن نصف الزيت في مقلاة كبيرة وحمّر اللحم على دفعات دقيقة إلى دقيقتين لكل جانب ثم ارفعه إلى طبق.', 'أضف بقية الزيت والبروكلي والثوم والزنجبيل وملعقتي ماء؛ غطّ المقلاة واطه 3 دقائق.', 'أعد اللحم واسكب الصلصة وقلّب حتى تتماسك وتغطي المكونات.', 'قدّم فوق الأرز البني وزيّن ببذور السمسم.'],
  },
  nutrition: { calories: 440, protein: 35, carbs: 48, fat: 12 },
};

const QUINOA_KALE_POWER_SALAD: Recipe = {
  id: 'quinoa-kale-power-salad',
  slug: 'quinoa-kale-power-salad',
  emoji: '🥬',
  title: { en: 'Quinoa & Kale Power Salad', ar: 'سلطة الكينوا والكرنب المغذية' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A hearty plant-forward salad of quinoa, kale, chickpeas, vegetables, feta, and lemon dressing.', ar: 'سلطة نباتية مشبعة من الكينوا والكرنب والحمص والخضار وجبن الفيتا وصلصة الليمون.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['2 cups cooked quinoa, cooled', '4 cups chopped kale, tough stems removed', '1 can chickpeas, drained and rinsed', '1 cup cherry tomatoes, halved', '1/2 cucumber, diced', '1/3 cup crumbled feta cheese', '2 tbsp olive oil', '2 tbsp lemon juice', '1 tsp Dijon mustard'],
    ar: ['كوبان كينوا مطبوخة ومبردة', '4 أكواب كرنب مفروم ومنزوع السيقان القاسية', 'علبة حمص مصفاة ومغسولة', 'كوب طماطم كرزية مقطعة أنصافًا', 'نصف خيار مكعبات', 'ثلث كوب جبن فيتا مفتت', 'ملعقتان كبيرتان زيت زيتون', 'ملعقتان كبيرتان عصير ليمون', 'ملعقة صغيرة خردل ديجون'],
  },
  instructions: {
    en: ['Whisk olive oil, lemon juice, and Dijon mustard in a small bowl.', 'Massage half the dressing into the kale for 1 minute to soften the leaves.', 'Add quinoa, chickpeas, tomatoes, and cucumber and toss gently.', 'Top with feta and the remaining dressing.', 'Chill for 10 minutes or serve at once; keep leftovers refrigerated.'],
    ar: ['اخفق زيت الزيتون وعصير الليمون وخردل ديجون في وعاء صغير.', 'دلّك نصف الصلصة في الكرنب دقيقة واحدة لتليين الأوراق.', 'أضف الكينوا والحمص والطماطم والخيار وقلّب برفق.', 'أضف الفيتا وبقية الصلصة.', 'برّد 10 دقائق أو قدّم فورًا، واحفظ البقايا في الثلاجة.'],
  },
  nutrition: { calories: 390, protein: 15, carbs: 55, fat: 14 },
};

const CAULIFLOWER_CRUST_PIZZA: Recipe = {
  id: 'cauliflower-crust-pizza',
  slug: 'cauliflower-crust-pizza',
  emoji: '🍕',
  title: { en: 'Cauliflower Crust Pizza', ar: 'بيتزا بعجينة القرنبيط' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A crisp cauliflower-based pizza crust topped with tomato sauce, mozzarella, mushrooms, and bell pepper.', ar: 'قاعدة بيتزا مقرمشة من القرنبيط مغطاة بصلصة الطماطم والموزاريلا والفطر والفلفل الحلو.' },
  prepTime: { en: '55 min', ar: '55 دقيقة' },
  ingredients: {
    en: ['1 large cauliflower, riced (about 4 cups)', '1 large egg', '1/2 cup shredded part-skim mozzarella, divided', '1/4 cup grated Parmesan', '1/2 tsp dried oregano', '1/2 cup low-sodium tomato sauce', '1 cup sliced mushrooms', '1/2 bell pepper, sliced'],
    ar: ['حبة قرنبيط كبيرة مبشورة (نحو 4 أكواب)', 'بيضة كبيرة', 'نصف كوب موزاريلا قليلة الدسم مبشورة ومقسمة', 'ربع كوب بارميزان مبشور', 'نصف ملعقة صغيرة أوريغانو مجفف', 'نصف كوب صلصة طماطم قليلة الصوديوم', 'كوب فطر مقطع شرائح', 'نصف حبة فلفل حلو مقطعة شرائح'],
  },
  instructions: {
    en: ['Heat oven to 425°F. Microwave riced cauliflower for 5 minutes, cool, then squeeze very dry in a clean towel.', 'Mix cauliflower with egg, half the mozzarella, Parmesan, and oregano.', 'Press into a thin round on parchment and bake 20–25 minutes until golden and firm.', 'Spread with tomato sauce, add mushrooms, bell pepper, and remaining mozzarella.', 'Bake 8–10 minutes more until cheese melts; rest briefly before slicing.'],
    ar: ['سخّن الفرن إلى 425 فهرنهايت. اطه القرنبيط المبشور في الميكروويف 5 دقائق ثم برّده واعصره جيدًا بمنشفة نظيفة.', 'اخلط القرنبيط مع البيض ونصف الموزاريلا والبارميزان والأوريغانو.', 'افرد الخليط دائرة رقيقة فوق ورق الخبز واخبزه 20 إلى 25 دقيقة حتى يصبح ذهبيًا ومتماسكًا.', 'افرد صلصة الطماطم وأضف الفطر والفلفل وبقية الموزاريلا.', 'اخبز 8 إلى 10 دقائق إضافية حتى يذوب الجبن، واتركه قليلًا قبل التقطيع.'],
  },
  nutrition: { calories: 340, protein: 24, carbs: 30, fat: 15 },
};

const SPAGHETTI_SQUASH_TURKEY_MEAT_SAUCE: Recipe = {
  id: 'spaghetti-squash-turkey-meat-sauce',
  slug: 'spaghetti-squash-turkey-meat-sauce',
  emoji: '🍝',
  title: { en: 'Spaghetti Squash with Turkey Meat Sauce', ar: 'قرع السباغيتي بصلصة الديك الرومي' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Roasted spaghetti squash strands topped with a hearty tomato sauce of lean ground turkey and spinach.', ar: 'خيوط قرع السباغيتي المشوي مع صلصة طماطم غنية بالديك الرومي المفروم قليل الدهون والسبانخ.' },
  prepTime: { en: '55 min', ar: '55 دقيقة' },
  ingredients: {
    en: ['1 large spaghetti squash, halved and seeded', '1 tsp olive oil', '1 lb lean ground turkey', '1/2 yellow onion, diced', '2 cloves garlic, minced', '2 cups no-salt-added marinara sauce', '2 cups baby spinach', '2 tbsp grated Parmesan', '1/2 tsp dried basil'],
    ar: ['حبة قرع سباغيتي كبيرة مقسومة ومنزوعة البذور', 'ملعقة صغيرة زيت زيتون', '450 غرام ديك رومي مفروم قليل الدهون', 'نصف بصلة صفراء مكعبات', 'فصان ثوم مفرومان', 'كوبان صلصة مارينارا بلا ملح مضاف', 'كوبان سبانخ صغيرة', 'ملعقتان كبيرتان بارميزان مبشور', 'نصف ملعقة صغيرة ريحان مجفف'],
  },
  instructions: {
    en: ['Heat oven to 400°F. Brush squash cut sides with olive oil and roast cut-side down for 35–40 minutes until tender.', 'Meanwhile, brown turkey in a skillet, breaking it into small pieces; add onion and cook until soft.', 'Stir in garlic, marinara, basil, and spinach; simmer for 8 minutes.', 'Scrape squash into strands with a fork and divide among plates.', 'Spoon turkey sauce over the squash and finish with Parmesan.'],
    ar: ['سخّن الفرن إلى 400 فهرنهايت. ادهن الجهة المقطوعة من القرع بزيت الزيتون واشوه مقلوبًا 35 إلى 40 دقيقة حتى يلين.', 'حمّر الديك الرومي في مقلاة مع تفتيته، ثم أضف البصل واطهه حتى يلين.', 'أضف الثوم والمارينارا والريحان والسبانخ واترك الخليط 8 دقائق.', 'استخرج خيوط القرع بالشوكة ووزعها على الأطباق.', 'أضف صلصة الديك الرومي فوق القرع وزيّن بالبارميزان.'],
  },
  nutrition: { calories: 370, protein: 34, carbs: 35, fat: 11 },
};

const ALMOND_BUTTER_PROTEIN_OATMEAL: Recipe = {
  id: 'almond-butter-protein-oatmeal',
  slug: 'almond-butter-protein-oatmeal',
  emoji: '🥣',
  title: { en: 'Almond Butter Protein Oatmeal', ar: 'شوفان بالبروتين وزبدة اللوز' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Creamy oats cooked with milk and topped with almond butter, Greek yogurt, berries, and chia seeds.', ar: 'شوفان كريمي مطهو بالحليب ومغطى بزبدة اللوز واللبن اليوناني والتوت وبذور الشيا.' },
  prepTime: { en: '15 min', ar: '15 دقيقة' },
  ingredients: {
    en: ['1 cup old-fashioned rolled oats', '1 1/2 cups low-fat milk', '1/2 cup plain Greek yogurt', '2 tbsp almond butter', '1/2 cup blueberries', '1 tbsp chia seeds', '1/4 tsp ground cinnamon'],
    ar: ['كوب شوفان ملفوف تقليدي', 'كوب ونصف حليب قليل الدسم', 'نصف كوب لبن يوناني سادة', 'ملعقتان كبيرتان زبدة لوز', 'نصف كوب توت أزرق', 'ملعقة كبيرة بذور شيا', 'ربع ملعقة صغيرة قرفة مطحونة'],
  },
  instructions: {
    en: ['Combine oats, milk, and cinnamon in a saucepan.', 'Bring to a gentle simmer and cook 5–7 minutes, stirring, until creamy.', 'Divide oatmeal into two bowls and let cool slightly.', 'Top each bowl with Greek yogurt, almond butter, blueberries, and chia seeds.'],
    ar: ['ضع الشوفان والحليب والقرفة في قدر.', 'اتركه يغلي برفق واطهه 5 إلى 7 دقائق مع التحريك حتى يصبح كريميًا.', 'وزّع الشوفان في وعاءين واتركه يبرد قليلًا.', 'أضف اللبن اليوناني وزبدة اللوز والتوت الأزرق وبذور الشيا فوق كل وعاء.'],
  },
  nutrition: { calories: 380, protein: 20, carbs: 48, fat: 14 },
};

const BAKED_SWEET_POTATO_COTTAGE_CHEESE: Recipe = {
  id: 'baked-sweet-potato-cottage-cheese',
  slug: 'baked-sweet-potato-cottage-cheese',
  emoji: '🍠',
  title: { en: 'Baked Sweet Potato with Cottage Cheese', ar: 'بطاطا حلوة مخبوزة مع الجبن القريش' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A fluffy baked sweet potato filled with cottage cheese, black beans, spinach, and fresh salsa.', ar: 'بطاطا حلوة مخبوزة وهشة محشوة بالجبن القريش والفاصوليا السوداء والسبانخ والصلصة الطازجة.' },
  prepTime: { en: '50 min', ar: '50 دقيقة' },
  ingredients: {
    en: ['2 medium sweet potatoes, scrubbed', '1 cup low-fat cottage cheese', '1/2 cup black beans, drained and rinsed', '1 cup baby spinach, chopped', '1/2 cup fresh tomato salsa', '1 tbsp pumpkin seeds', '1/4 tsp ground cumin'],
    ar: ['حبتا بطاطا حلوة متوسطتان مغسولتان', 'كوب جبن قريش قليل الدسم', 'نصف كوب فاصوليا سوداء مصفاة ومغسولة', 'كوب سبانخ صغيرة مفرومة', 'نصف كوب صلصة طماطم طازجة', 'ملعقة كبيرة بذور قرع', 'ربع ملعقة صغيرة كمون مطحون'],
  },
  instructions: {
    en: ['Heat oven to 400°F. Pierce potatoes several times with a fork and place on a lined tray.', 'Bake 40–50 minutes until a knife slides easily into the center.', 'Warm black beans with cumin and fold in chopped spinach until just wilted.', 'Split potatoes lengthwise and fluff the centers with a fork.', 'Top with cottage cheese, bean mixture, salsa, and pumpkin seeds.'],
    ar: ['سخّن الفرن إلى 400 فهرنهايت. اثقب البطاطا بالشوكة عدة مرات وضعها في صينية مبطنة.', 'اخبز 40 إلى 50 دقيقة حتى تدخل السكين في الوسط بسهولة.', 'سخّن الفاصوليا مع الكمون وأضف السبانخ المفرومة حتى تذبل قليلًا.', 'افتح البطاطا طوليًا وهرّش اللب بالشوكة.', 'أضف الجبن القريش وخليط الفاصوليا والصلصة وبذور القرع.'],
  },
  nutrition: { calories: 350, protein: 23, carbs: 54, fat: 6 },
};

const GRILLED_SHRIMP_ZUCCHINI_SKEWERS: Recipe = {
  id: 'grilled-shrimp-zucchini-skewers',
  slug: 'grilled-shrimp-zucchini-skewers',
  emoji: '🍤',
  title: { en: 'Grilled Shrimp & Zucchini Skewers', ar: 'أسياخ روبيان وكوسا مشوية' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Quick lemon-garlic shrimp and zucchini skewers served with brown rice for a bright summer meal.', ar: 'أسياخ سريعة من الروبيان والكوسا بالليمون والثوم تقدم مع الأرز البني لوجبة صيفية منعشة.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['1 lb large shrimp, peeled and deveined', '2 medium zucchini, cut into thick half-moons', '1 red bell pepper, cut into chunks', '1 tbsp olive oil', '1 lemon, juiced', '2 cloves garlic, minced', '1/4 tsp black pepper', '2 cups cooked brown rice'],
    ar: ['450 غرام روبيان كبير مقشر ومنزوع العرق', 'حبتا كوسا متوسطتان مقطعتان أنصاف دوائر سميكة', 'حبة فلفل أحمر مقطعة مكعبات', 'ملعقة كبيرة زيت زيتون', 'عصير ليمونة', 'فصان ثوم مفرومان', 'ربع ملعقة صغيرة فلفل أسود', 'كوبان أرز بني مطبوخ'],
  },
  instructions: {
    en: ['If using wooden skewers, soak them in water for 20 minutes.', 'Whisk olive oil, lemon juice, garlic, and pepper; toss with shrimp and vegetables.', 'Thread shrimp, zucchini, and bell pepper onto skewers.', 'Grill over medium-high heat for 2–3 minutes per side until shrimp are opaque and cooked through.', 'Serve right away with brown rice and any remaining lemon juice.'],
    ar: ['إذا استخدمت أسياخًا خشبية فانقعها في الماء 20 دقيقة.', 'اخفق زيت الزيتون وعصير الليمون والثوم والفلفل وقلّب معها الروبيان والخضار.', 'ضع الروبيان والكوسا والفلفل بالتناوب على الأسياخ.', 'اشوِ على حرارة متوسطة مرتفعة دقيقتين إلى 3 لكل جانب حتى ينضج الروبيان ويصبح معتمًا.', 'قدّم فورًا مع الأرز البني وما تبقى من عصير الليمون.'],
  },
  nutrition: { calories: 320, protein: 32, carbs: 36, fat: 8 },
};

const CHICKEN_AVOCADO_LETTUCE_WRAP: Recipe = {
  id: 'chicken-avocado-lettuce-wrap',
  slug: 'chicken-avocado-lettuce-wrap',
  emoji: '🥬',
  title: { en: 'Chicken Avocado Lettuce Wrap', ar: 'لفائف خس بالدجاج والأفوكادو' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Cool lettuce cups filled with lime chicken, avocado, tomato, and a light Greek-yogurt dressing.', ar: 'أكواب خس منعشة محشوة بدجاج الليمون والأفوكادو والطماطم وصلصة خفيفة باللبن اليوناني.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['2 cups cooked chicken breast, finely diced', '1 ripe avocado, diced', '8 large butter lettuce leaves', '1/2 cup chopped tomato', '1/4 cup plain Greek yogurt', '1 tbsp lime juice', '1 celery stalk, finely chopped', '2 tbsp chopped cilantro'],
    ar: ['كوبان صدر دجاج مطبوخ ومقطع ناعمًا', 'حبة أفوكادو ناضجة مكعبات', '8 أوراق خس زبدية كبيرة', 'نصف كوب طماطم مفرومة', 'ربع كوب لبن يوناني سادة', 'ملعقة كبيرة عصير ليمون أخضر', 'عود كرفس مفروم ناعمًا', 'ملعقتان كبيرتان كزبرة مفرومة'],
  },
  instructions: {
    en: ['Stir Greek yogurt and lime juice together in a small bowl.', 'Combine diced chicken, avocado, tomato, celery, and cilantro in a mixing bowl.', 'Fold in the yogurt dressing gently so the avocado keeps its shape.', 'Spoon the mixture into clean, dry lettuce leaves.', 'Serve immediately with extra lime wedges.'],
    ar: ['اخلط اللبن اليوناني وعصير الليمون الأخضر في وعاء صغير.', 'امزج الدجاج والأفوكادو والطماطم والكرفس والكزبرة في وعاء.', 'أضف صلصة اللبن برفق حتى يحتفظ الأفوكادو بشكله.', 'ضع الخليط في أوراق خس نظيفة وجافة.', 'قدّم فورًا مع شرائح إضافية من الليمون الأخضر.'],
  },
  nutrition: { calories: 360, protein: 35, carbs: 17, fat: 17 },
};

const VEGAN_LENTIL_VEGETABLE_SOUP: Recipe = {
  id: 'vegan-lentil-vegetable-soup',
  slug: 'vegan-lentil-vegetable-soup',
  emoji: '🍲',
  title: { en: 'Vegan Lentil & Vegetable Soup', ar: 'شوربة عدس وخضار نباتية' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A comforting one-pot soup of lentils, carrots, celery, tomatoes, and spinach in savory vegetable broth.', ar: 'شوربة منزلية في قدر واحد من العدس والجزر والكرفس والطماطم والسبانخ بمرق الخضار.' },
  prepTime: { en: '45 min', ar: '45 دقيقة' },
  ingredients: {
    en: ['1 cup brown or green lentils, rinsed', '1 tbsp olive oil', '1 yellow onion, diced', '2 carrots, diced', '2 celery stalks, diced', '1 can diced tomatoes', '6 cups low-sodium vegetable broth', '1 tsp ground cumin', '2 cups baby spinach', '1 tbsp lemon juice'],
    ar: ['كوب عدس بني أو أخضر مغسول', 'ملعقة كبيرة زيت زيتون', 'بصلة صفراء مكعبات', 'حبتا جزر مكعبات', 'عودا كرفس مكعبات', 'علبة طماطم مكعبات', '6 أكواب مرق خضار قليل الصوديوم', 'ملعقة صغيرة كمون مطحون', 'كوبان سبانخ صغيرة', 'ملعقة كبيرة عصير ليمون'],
  },
  instructions: {
    en: ['Heat olive oil in a soup pot; cook onion, carrots, and celery for 5 minutes.', 'Add lentils, tomatoes, broth, and cumin and bring to a boil.', 'Reduce heat, cover partially, and simmer 30–35 minutes until lentils are tender.', 'Stir in spinach until wilted and finish with lemon juice.', 'Taste and season as needed; serve warm.'],
    ar: ['سخّن زيت الزيتون في قدر الشوربة واطه البصل والجزر والكرفس 5 دقائق.', 'أضف العدس والطماطم والمرق والكمون واتركه حتى يغلي.', 'خفف النار وغطّ القدر جزئيًا واتركه 30 إلى 35 دقيقة حتى يلين العدس.', 'أضف السبانخ حتى تذبل ثم أضف عصير الليمون.', 'تذوق وعدّل التتبيل حسب الحاجة وقدّم دافئًا.'],
  },
  nutrition: { calories: 290, protein: 16, carbs: 47, fat: 7 },
};

const APPLE_CINNAMON_BAKED_OATMEAL: Recipe = {
  id: 'apple-cinnamon-baked-oatmeal',
  slug: 'apple-cinnamon-baked-oatmeal',
  emoji: '🍎',
  title: { en: 'Apple Cinnamon Baked Oatmeal', ar: 'شوفان مخبوز بالتفاح والقرفة' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A make-ahead breakfast bake with rolled oats, fresh apple, cinnamon, milk, and crunchy walnuts.', ar: 'فطور مخبوز يحضّر مسبقًا من الشوفان والتفاح الطازج والقرفة والحليب والجوز المقرمش.' },
  prepTime: { en: '45 min', ar: '45 دقيقة' },
  ingredients: {
    en: ['2 cups old-fashioned rolled oats', '1 large apple, diced', '1 1/2 cups low-fat milk', '1 large egg', '2 tbsp pure maple syrup', '1 tsp ground cinnamon', '1 tsp baking powder', '1/4 cup chopped walnuts', '1 tsp vanilla extract'],
    ar: ['كوبان شوفان ملفوف تقليدي', 'حبة تفاح كبيرة مكعبات', 'كوب ونصف حليب قليل الدسم', 'بيضة كبيرة', 'ملعقتان كبيرتان شراب قيقب نقي', 'ملعقة صغيرة قرفة مطحونة', 'ملعقة صغيرة بيكنج باودر', 'ربع كوب جوز مفروم', 'ملعقة صغيرة خلاصة فانيليا'],
  },
  instructions: {
    en: ['Heat oven to 350°F and lightly oil an 8-inch baking dish.', 'Whisk milk, egg, maple syrup, and vanilla in a bowl.', 'Stir oats, cinnamon, and baking powder together; fold in apple and walnuts.', 'Pour wet ingredients over the oat mixture and stir to combine.', 'Bake 30–35 minutes until the center is set; cool slightly and serve warm.'],
    ar: ['سخّن الفرن إلى 350 فهرنهايت وادهن طبق خبز بحجم 8 بوصات بقليل من الزيت.', 'اخفق الحليب والبيض وشراب القيقب والفانيليا في وعاء.', 'اخلط الشوفان والقرفة والبيكنج باودر ثم أضف التفاح والجوز.', 'اسكب المكونات السائلة فوق خليط الشوفان وقلّب حتى تمتزج.', 'اخبز 30 إلى 35 دقيقة حتى يتماسك الوسط، ثم برّد قليلًا وقدّم دافئًا.'],
  },
  nutrition: { calories: 330, protein: 12, carbs: 51, fat: 10 },
};

const GROUND_CHICKEN_STUFFED_PEPPERS: Recipe = {
  id: 'ground-chicken-stuffed-peppers',
  slug: 'ground-chicken-stuffed-peppers',
  emoji: '🫑',
  title: { en: 'Ground Chicken Stuffed Bell Peppers', ar: 'فلفل حلو محشو بالدجاج المفروم' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Bell peppers baked with a savory filling of ground chicken, brown rice, tomatoes, and herbs.', ar: 'فلفل حلو مخبوز بحشوة لذيذة من الدجاج المفروم والأرز البني والطماطم والأعشاب.' },
  prepTime: { en: '50 min', ar: '50 دقيقة' },
  ingredients: {
    en: ['4 large bell peppers, tops removed and seeded', '1 lb lean ground chicken', '1 cup cooked brown rice', '1/2 yellow onion, diced', '1 cup no-salt-added tomato sauce', '2 cloves garlic, minced', '1 tsp dried Italian herbs', '1/2 cup shredded part-skim mozzarella'],
    ar: ['4 حبات فلفل حلو كبيرة منزوعة القمم والبذور', '450 غرام دجاج مفروم قليل الدهون', 'كوب أرز بني مطبوخ', 'نصف بصلة صفراء مكعبات', 'كوب صلصة طماطم بلا ملح مضاف', 'فصان ثوم مفرومان', 'ملعقة صغيرة أعشاب إيطالية مجففة', 'نصف كوب موزاريلا قليلة الدسم مبشورة'],
  },
  instructions: {
    en: ['Heat oven to 375°F and place peppers upright in a baking dish with 1/4 cup water.', 'Brown ground chicken with onion in a skillet, breaking it up; cook until no pink remains.', 'Stir in garlic, rice, tomato sauce, and Italian herbs.', 'Spoon filling into peppers, cover the dish with foil, and bake 30 minutes.', 'Uncover, add mozzarella, and bake 8–10 minutes more until peppers are tender and cheese melts.'],
    ar: ['سخّن الفرن إلى 375 فهرنهايت وضع الفلفل قائمًا في طبق خبز مع ربع كوب ماء.', 'حمّر الدجاج المفروم مع البصل في مقلاة وفتته حتى يختفي اللون الوردي.', 'أضف الثوم والأرز وصلصة الطماطم والأعشاب وقلّب.', 'احشُ الفلفل بالخليط وغطّ الطبق بورق ألمنيوم واخبز 30 دقيقة.', 'اكشف الطبق وأضف الموزاريلا واخبز 8 إلى 10 دقائق حتى يلين الفلفل ويذوب الجبن.'],
  },
  nutrition: { calories: 380, protein: 33, carbs: 39, fat: 11 },
};

const MEDITERRANEAN_GRILLED_CHICKEN_SALAD: Recipe = {
  id: 'mediterranean-grilled-chicken-salad',
  slug: 'mediterranean-grilled-chicken-salad',
  emoji: '🥗',
  title: { en: 'Mediterranean Grilled Chicken Salad', ar: 'سلطة دجاج مشوي متوسطية' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: { en: 'Grilled chicken over crisp romaine, cucumber, tomatoes, chickpeas, olives, and feta with lemon dressing.', ar: 'دجاج مشوي فوق خس روماني مقرمش وخيار وطماطم وحمص وزيتون وفيتا مع صلصة الليمون.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['2 boneless skinless chicken breasts (about 12 oz)', '1 tsp olive oil', '1 tsp dried oregano', '4 cups chopped romaine lettuce', '1 cup cucumber, diced', '1 cup cherry tomatoes, halved', '1/2 cup chickpeas, drained and rinsed', '1/4 cup sliced Kalamata olives', '1/4 cup crumbled feta', '2 tbsp lemon juice'],
    ar: ['صدرا دجاج منزوعا العظم والجلد (نحو 340 غرامًا)', 'ملعقة صغيرة زيت زيتون', 'ملعقة صغيرة أوريغانو مجفف', '4 أكواب خس روماني مفروم', 'كوب خيار مكعبات', 'كوب طماطم كرزية مقطعة أنصافًا', 'نصف كوب حمص مصفى ومغسول', 'ربع كوب زيتون كالاماتا شرائح', 'ربع كوب جبن فيتا مفتت', 'ملعقتان كبيرتان عصير ليمون'],
  },
  instructions: {
    en: ['Rub chicken with olive oil and oregano; grill over medium heat until the center reaches 165°F.', 'Rest chicken for 5 minutes, then slice across the grain.', 'Whisk lemon juice with 1 tablespoon water and a little black pepper.', 'Arrange romaine, cucumber, tomatoes, chickpeas, and olives in a serving bowl.', 'Top with chicken and feta, drizzle with lemon dressing, and serve.'],
    ar: ['تبّل الدجاج بزيت الزيتون والأوريغانو واشوه على حرارة متوسطة حتى تبلغ حرارة الوسط 165 فهرنهايت.', 'اترك الدجاج 5 دقائق ثم قطعه عكس اتجاه الألياف.', 'اخفق عصير الليمون مع ملعقة ماء وقليل من الفلفل الأسود.', 'رتب الخس والخيار والطماطم والحمص والزيتون في وعاء تقديم.', 'أضف الدجاج والفيتا واسكب صلصة الليمون ثم قدّم.'],
  },
  nutrition: { calories: 430, protein: 40, carbs: 32, fat: 17 },
};

const BAKED_COD_LEMON_OLIVES: Recipe = {
  id: 'baked-cod-lemon-olives',
  slug: 'baked-cod-lemon-olives',
  emoji: '🐟',
  title: { en: 'Baked Cod with Lemon & Olives', ar: 'سمك القد المخبوز بالليمون والزيتون' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: { en: 'Flaky cod baked with lemon, tomatoes, garlic, and briny olives, served with whole-grain couscous.', ar: 'سمك قد طري مخبوز مع الليمون والطماطم والثوم والزيتون، يقدم مع الكسكس الكامل.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['4 cod fillets (5 oz each)', '1 lemon, thinly sliced', '1 cup cherry tomatoes, halved', '1/3 cup sliced Kalamata olives', '2 cloves garlic, minced', '1 tbsp olive oil', '1 tsp dried oregano', '2 cups cooked whole-wheat couscous', '2 tbsp chopped parsley'],
    ar: ['4 شرائح سمك قد (نحو 140 غرامًا لكل شريحة)', 'ليمونة مقطعة شرائح رفيعة', 'كوب طماطم كرزية مقطعة أنصافًا', 'ثلث كوب زيتون كالاماتا شرائح', 'فصان ثوم مفرومان', 'ملعقة كبيرة زيت زيتون', 'ملعقة صغيرة أوريغانو مجفف', 'كوبان كسكس قمح كامل مطبوخ', 'ملعقتان كبيرتان بقدونس مفروم'],
  },
  instructions: {
    en: ['Heat oven to 400°F and lightly oil a baking dish.', 'Arrange cod in the dish; scatter tomatoes, olives, garlic, and oregano around it.', 'Drizzle with olive oil and lay lemon slices over the fish.', 'Bake 12–16 minutes until cod flakes easily and reaches 145°F.', 'Sprinkle with parsley and serve with warm couscous and pan juices.'],
    ar: ['سخّن الفرن إلى 400 فهرنهايت وادهن طبق خبز بقليل من الزيت.', 'رتب سمك القد في الطبق وانثر الطماطم والزيتون والثوم والأوريغانو حوله.', 'أضف زيت الزيتون وضع شرائح الليمون فوق السمك.', 'اخبز 12 إلى 16 دقيقة حتى يتفتت السمك بسهولة وتبلغ حرارته 145 فهرنهايت.', 'رش البقدونس وقدّم مع الكسكس الدافئ وعصارة الطبق.'],
  },
  nutrition: { calories: 390, protein: 36, carbs: 42, fat: 10 },
};

const QUINOA_TABBOULEH_CHICKPEAS: Recipe = {
  id: 'quinoa-tabbouleh-chickpeas',
  slug: 'quinoa-tabbouleh-chickpeas',
  emoji: '🌿',
  title: { en: 'Quinoa Tabbouleh with Chickpeas', ar: 'تبولة الكينوا مع الحمص' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: { en: 'A bright parsley and mint salad with fluffy quinoa, chickpeas, cucumber, tomato, and fresh lemon.', ar: 'سلطة منعشة بالبقدونس والنعناع مع كينوا خفيفة وحمص وخيار وطماطم وليمون طازج.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['2 cups cooked quinoa, cooled', '1 cup finely chopped parsley', '1/3 cup chopped fresh mint', '1 cup cherry tomatoes, finely diced', '1/2 English cucumber, diced', '1 can chickpeas, drained and rinsed', '3 tbsp lemon juice', '2 tbsp extra-virgin olive oil', '2 green onions, thinly sliced'],
    ar: ['كوبان كينوا مطبوخة ومبردة', 'كوب بقدونس مفروم ناعمًا', 'ثلث كوب نعناع طازج مفروم', 'كوب طماطم كرزية مفرومة ناعمًا', 'نصف خيار إنجليزي مكعبات', 'علبة حمص مصفاة ومغسولة', '3 ملاعق كبيرة عصير ليمون', 'ملعقتان كبيرتان زيت زيتون بكر ممتاز', 'بصلتان خضراوان مقطعتان شرائح رفيعة'],
  },
  instructions: {
    en: ['Whisk lemon juice and olive oil in a large bowl.', 'Add parsley, mint, tomatoes, cucumber, green onions, and chickpeas.', 'Fold in cooled quinoa until evenly mixed.', 'Season with black pepper and a pinch of salt if desired.', 'Let stand for 10 minutes so flavors blend; serve chilled or at room temperature.'],
    ar: ['اخفق عصير الليمون وزيت الزيتون في وعاء كبير.', 'أضف البقدونس والنعناع والطماطم والخيار والبصل الأخضر والحمص.', 'أضف الكينوا المبردة وقلّب حتى تمتزج المكونات.', 'تبّل بالفلفل الأسود ورشة ملح حسب الرغبة.', 'اتركها 10 دقائق لتمتزج النكهات ثم قدمها باردة أو بحرارة الغرفة.'],
  },
  nutrition: { calories: 380, protein: 15, carbs: 57, fat: 12 },
};

const ZUCCHINI_NOODLES_PESTO: Recipe = {
  id: 'zucchini-noodles-pesto',
  slug: 'zucchini-noodles-pesto',
  emoji: '🍅',
  title: { en: 'Zucchini Noodles with Pesto & Cherry Tomatoes', ar: 'نودلز الكوسا بالبيستو والطماطم الكرزية' },
  cuisine: { en: 'Italian', ar: 'إيطالي' },
  description: { en: 'Tender zucchini ribbons tossed with basil pesto, white beans, and sweet cherry tomatoes for a quick Italian-inspired meal.', ar: 'شرائح كوسا طرية ممزوجة ببيستو الريحان والفاصوليا البيضاء والطماطم الكرزية لوجبة سريعة مستوحاة من المطبخ الإيطالي.' },
  prepTime: { en: '20 min', ar: '20 دقيقة' },
  ingredients: {
    en: ['4 medium zucchini, spiralized', '1 cup cherry tomatoes, halved', '1 cup cannellini beans, drained and rinsed', '1/4 cup basil pesto', '1 tsp olive oil', '2 tbsp grated Parmesan', '2 tbsp chopped fresh basil', '1/4 tsp black pepper'],
    ar: ['4 حبات كوسا متوسطة مقطعة بشكل حلزوني', 'كوب طماطم كرزية مقطعة أنصافًا', 'كوب فاصوليا كانيليني مصفاة ومغسولة', 'ربع كوب بيستو ريحان', 'ملعقة صغيرة زيت زيتون', 'ملعقتان كبيرتان بارميزان مبشور', 'ملعقتان كبيرتان ريحان طازج مفروم', 'ربع ملعقة صغيرة فلفل أسود'],
  },
  instructions: {
    en: ['Warm olive oil in a large skillet over medium heat.', 'Add tomatoes and cook 2–3 minutes until they begin to soften.', 'Add zucchini noodles and cannellini beans; toss for 2–3 minutes until just tender.', 'Remove from heat and fold in pesto and black pepper.', 'Finish with Parmesan and fresh basil; serve immediately to keep the zucchini firm.'],
    ar: ['سخّن زيت الزيتون في مقلاة كبيرة على حرارة متوسطة.', 'أضف الطماطم واطهها دقيقتين إلى 3 حتى تبدأ باللين.', 'أضف نودلز الكوسا والفاصوليا وقلّب دقيقتين إلى 3 حتى تلين قليلًا.', 'ارفع المقلاة عن النار وأضف البيستو والفلفل الأسود.', 'زيّن بالبارميزان والريحان الطازج وقدّم فورًا للحفاظ على تماسك الكوسا.'],
  },
  nutrition: { calories: 350, protein: 16, carbs: 39, fat: 16 },
};

const GREEK_STUFFED_PEPPERS_FETA: Recipe = {
  id: 'greek-stuffed-peppers-feta',
  slug: 'greek-stuffed-peppers-feta',
  emoji: '🫑',
  title: { en: 'Greek Stuffed Peppers with Feta', ar: 'فلفل يوناني محشو بجبن الفيتا' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: { en: 'Bell peppers baked with quinoa, chickpeas, spinach, oregano, and tangy feta.', ar: 'فلفل حلو مخبوز ومحشو بالكينوا والحمص والسبانخ والأوريغانو وجبن الفيتا المنعش.' },
  prepTime: { en: '50 min', ar: '50 دقيقة' },
  ingredients: {
    en: ['4 large bell peppers, halved lengthwise and seeded', '1 1/2 cups cooked quinoa', '1 cup chickpeas, drained and rinsed', '1 cup chopped baby spinach', '1/2 cup diced tomato', '1/3 cup crumbled feta', '1 tbsp olive oil', '1 tsp dried oregano', '1 clove garlic, minced'],
    ar: ['4 حبات فلفل حلو كبيرة مقسومة طوليًا ومنزوعة البذور', 'كوب ونصف كينوا مطبوخة', 'كوب حمص مصفى ومغسول', 'كوب سبانخ صغيرة مفرومة', 'نصف كوب طماطم مكعبات', 'ثلث كوب جبن فيتا مفتت', 'ملعقة كبيرة زيت زيتون', 'ملعقة صغيرة أوريغانو مجفف', 'فص ثوم مفروم'],
  },
  instructions: {
    en: ['Heat oven to 375°F and place pepper halves cut-side up in a baking dish.', 'Mix quinoa, chickpeas, spinach, tomato, garlic, oregano, and olive oil.', 'Spoon filling evenly into the peppers and add 1/4 cup water to the dish.', 'Cover loosely with foil and bake 30 minutes until peppers begin to soften.', 'Uncover, sprinkle with feta, and bake 10 minutes more; serve warm.'],
    ar: ['سخّن الفرن إلى 375 فهرنهايت وضع أنصاف الفلفل في طبق الخبز والجهة المقطوعة للأعلى.', 'اخلط الكينوا والحمص والسبانخ والطماطم والثوم والأوريغانو وزيت الزيتون.', 'وزّع الحشوة داخل الفلفل وأضف ربع كوب ماء إلى الطبق.', 'غطّ الطبق بورق ألمنيوم واخبز 30 دقيقة حتى يبدأ الفلفل باللين.', 'اكشف الطبق ورش الفيتا واخبز 10 دقائق إضافية ثم قدّم دافئًا.'],
  },
  nutrition: { calories: 380, protein: 16, carbs: 52, fat: 13 },
};

const SHRIMP_SCAMPI_WHOLE_WHEAT: Recipe = {
  id: 'shrimp-scampi-whole-wheat',
  slug: 'shrimp-scampi-whole-wheat',
  emoji: '🍤',
  title: { en: 'Shrimp Scampi with Whole Wheat Pasta', ar: 'روبيان سكامبي مع معكرونة القمح الكامل' },
  cuisine: { en: 'Italian', ar: 'إيطالي' },
  description: { en: 'Garlic-lemon shrimp tossed with whole-wheat linguine, parsley, and a light olive-oil sauce.', ar: 'روبيان بالثوم والليمون ممزوج بمعكرونة لينغويني من القمح الكامل والبقدونس وصلصة زيت زيتون خفيفة.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['8 oz whole-wheat linguine', '1 lb large shrimp, peeled and deveined', '1 tbsp olive oil', '3 cloves garlic, thinly sliced', '1/2 cup low-sodium vegetable broth', '2 tbsp lemon juice', '1/4 tsp red pepper flakes, optional', '1/4 cup chopped parsley', '2 tbsp grated Parmesan'],
    ar: ['225 غرام لينغويني من القمح الكامل', '450 غرام روبيان كبير مقشر ومنزوع العرق', 'ملعقة كبيرة زيت زيتون', '3 فصوص ثوم مقطعة شرائح رفيعة', 'نصف كوب مرق خضار قليل الصوديوم', 'ملعقتان كبيرتان عصير ليمون', 'ربع ملعقة صغيرة رقائق فلفل أحمر، اختياري', 'ربع كوب بقدونس مفروم', 'ملعقتان كبيرتان بارميزان مبشور'],
  },
  instructions: {
    en: ['Cook linguine in boiling water according to package directions; reserve 1/2 cup pasta water and drain.', 'Warm olive oil in a skillet and cook garlic for 30 seconds without browning.', 'Add shrimp and cook 1–2 minutes per side until pink and opaque.', 'Pour in broth and lemon juice; simmer briefly, then toss with pasta and a splash of pasta water.', 'Finish with parsley, red pepper flakes if using, and Parmesan; serve hot.'],
    ar: ['اطه اللينغويني في ماء يغلي حسب تعليمات العبوة، واحتفظ بنصف كوب من ماء الطهي ثم صفّها.', 'سخّن زيت الزيتون في مقلاة واطه الثوم 30 ثانية دون تحميره.', 'أضف الروبيان واطهه دقيقة إلى دقيقتين لكل جانب حتى يصبح ورديًا ومعتمًا.', 'أضف المرق وعصير الليمون واتركه قليلًا ثم قلّب المعكرونة مع رشة من ماء الطهي.', 'أضف البقدونس ورقائق الفلفل إن رغبت والبارميزان ثم قدّم ساخنًا.'],
  },
  nutrition: { calories: 430, protein: 34, carbs: 54, fat: 10 },
};

const EGGPLANT_PARMESAN_LIGHT: Recipe = {
  id: 'eggplant-parmesan-light',
  slug: 'eggplant-parmesan-light',
  emoji: '🍆',
  title: { en: 'Eggplant Parmesan (Light & Baked)', ar: 'بارميزان الباذنجان الخفيف والمخبوز' },
  cuisine: { en: 'Italian', ar: 'إيطالي' },
  description: { en: 'Oven-baked eggplant layered with tomato marinara, part-skim mozzarella, and Parmesan for a lighter Italian classic.', ar: 'باذنجان مخبوز في الفرن بطبقات من صلصة المارينارا والموزاريلا قليلة الدسم والبارميزان لطبق إيطالي أخف.' },
  prepTime: { en: '60 min', ar: '60 دقيقة' },
  ingredients: {
    en: ['2 medium eggplants, cut into 1/2-inch rounds', '1 large egg, beaten', '1 cup whole-wheat breadcrumbs', '2 cups low-sodium marinara sauce', '1 cup shredded part-skim mozzarella', '1/4 cup grated Parmesan', '1 tsp dried oregano', '1 tbsp chopped fresh basil'],
    ar: ['حبتا باذنجان متوسطتان مقطعتان شرائح بسماكة 1/2 بوصة', 'بيضة كبيرة مخفوقة', 'كوب فتات خبز من القمح الكامل', 'كوبان صلصة مارينارا قليلة الصوديوم', 'كوب موزاريلا قليلة الدسم مبشورة', 'ربع كوب بارميزان مبشور', 'ملعقة صغيرة أوريغانو مجفف', 'ملعقة كبيرة ريحان طازج مفروم'],
  },
  instructions: {
    en: ['Heat oven to 425°F and line two baking sheets with parchment.', 'Dip eggplant rounds in egg, coat with breadcrumbs, and arrange in one layer.', 'Bake 20 minutes, turning once, until lightly golden and tender.', 'Spread a thin layer of marinara in a baking dish; layer eggplant, sauce, mozzarella, and Parmesan.', 'Bake 15–18 minutes until bubbling; rest 5 minutes and finish with basil.'],
    ar: ['سخّن الفرن إلى 425 فهرنهايت وبطّن صينيتين بورق الخبز.', 'اغمس شرائح الباذنجان في البيض ثم غطّها بفتات الخبز ورتبها بطبقة واحدة.', 'اخبز 20 دقيقة مع قلبها مرة حتى تصبح ذهبية قليلًا وطرية.', 'افرد طبقة رقيقة من المارينارا في طبق خبز ثم رتب الباذنجان والصلصة والموزاريلا والبارميزان.', 'اخبز 15 إلى 18 دقيقة حتى تظهر الفقاعات، واتركه 5 دقائق وزيّنه بالريحان.'],
  },
  nutrition: { calories: 360, protein: 22, carbs: 42, fat: 12 },
};

const TUSCAN_WHITE_BEAN_KALE_SOUP: Recipe = {
  id: 'tuscan-white-bean-kale-soup',
  slug: 'tuscan-white-bean-kale-soup',
  emoji: '🍲',
  title: { en: 'Tuscan White Bean & Kale Soup', ar: 'شوربة توسكانية بالفاصوليا البيضاء والكرنب' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: { en: 'A rustic Tuscan-inspired soup with white beans, kale, carrots, celery, tomatoes, and rosemary.', ar: 'شوربة ريفية مستوحاة من توسكانا بالفاصوليا البيضاء والكرنب والجزر والكرفس والطماطم وإكليل الجبل.' },
  prepTime: { en: '40 min', ar: '40 دقيقة' },
  ingredients: {
    en: ['1 tbsp olive oil', '1 yellow onion, diced', '2 carrots, diced', '2 celery stalks, diced', '2 cans cannellini beans, drained and rinsed', '1 can diced tomatoes', '6 cups low-sodium vegetable broth', '4 cups chopped kale', '1 tsp dried rosemary', '1 tbsp lemon juice'],
    ar: ['ملعقة كبيرة زيت زيتون', 'بصلة صفراء مكعبات', 'حبتا جزر مكعبات', 'عودا كرفس مكعبات', 'علبتا فاصوليا كانيليني مصفاتان ومغسولتان', 'علبة طماطم مكعبات', '6 أكواب مرق خضار قليل الصوديوم', '4 أكواب كرنب مفروم', 'ملعقة صغيرة إكليل جبل مجفف', 'ملعقة كبيرة عصير ليمون'],
  },
  instructions: {
    en: ['Heat olive oil in a heavy soup pot; cook onion, carrots, and celery for 6 minutes.', 'Add beans, tomatoes, broth, and rosemary and bring to a gentle boil.', 'Simmer uncovered for 15 minutes so the vegetables soften and flavors combine.', 'Stir in kale and cook 5–7 minutes until tender; mash a few beans to thicken if desired.', 'Finish with lemon juice and black pepper and serve warm.'],
    ar: ['سخّن زيت الزيتون في قدر شوربة ثقيل واطه البصل والجزر والكرفس 6 دقائق.', 'أضف الفاصوليا والطماطم والمرق وإكليل الجبل واتركه حتى يغلي برفق.', 'اتركه يغلي بهدوء دون غطاء 15 دقيقة حتى تلين الخضار وتمتزج النكهات.', 'أضف الكرنب واطهه 5 إلى 7 دقائق حتى يلين؛ اهرس بعض الفاصوليا للتكثيف حسب الرغبة.', 'أضف عصير الليمون والفلفل الأسود وقدّم دافئًا.'],
  },
  nutrition: { calories: 300, protein: 17, carbs: 48, fat: 7 },
};

const CAPRESE_AVOCADO_SALAD: Recipe = {
  id: 'caprese-avocado-salad',
  slug: 'caprese-avocado-salad',
  emoji: '🥑',
  title: { en: 'Caprese Avocado Salad', ar: 'سلطة كابريزي بالأفوكادو' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: { en: 'Ripe tomatoes, creamy avocado, fresh mozzarella, and basil with a simple balsamic dressing.', ar: 'طماطم ناضجة وأفوكادو كريمي وموزاريلا طازجة وريحان مع صلصة بلسميك بسيطة.' },
  prepTime: { en: '15 min', ar: '15 دقيقة' },
  ingredients: {
    en: ['3 medium ripe tomatoes, sliced', '1 ripe avocado, sliced', '8 oz fresh mozzarella, sliced', '1 cup fresh basil leaves', '2 cups baby arugula', '1 tbsp extra-virgin olive oil', '1 tbsp balsamic vinegar', '1/4 tsp black pepper'],
    ar: ['3 حبات طماطم ناضجة متوسطة مقطعة شرائح', 'حبة أفوكادو ناضجة مقطعة شرائح', '225 غرام موزاريلا طازجة مقطعة شرائح', 'كوب أوراق ريحان طازجة', 'كوبان جرجير صغير', 'ملعقة كبيرة زيت زيتون بكر ممتاز', 'ملعقة كبيرة خل بلسميك', 'ربع ملعقة صغيرة فلفل أسود'],
  },
  instructions: {
    en: ['Arrange arugula on a serving platter.', 'Layer tomato, mozzarella, and avocado slices over the greens, tucking basil leaves between them.', 'Whisk olive oil and balsamic vinegar together.', 'Drizzle dressing over the salad, season with black pepper, and serve immediately.'],
    ar: ['رتب الجرجير في طبق تقديم.', 'ضع شرائح الطماطم والموزاريلا والأفوكادو فوق الخضار مع توزيع أوراق الريحان بينها.', 'اخفق زيت الزيتون والخل البلسميك معًا.', 'اسكب الصلصة فوق السلطة وتبّل بالفلفل الأسود وقدّم فورًا.'],
  },
  nutrition: { calories: 380, protein: 17, carbs: 24, fat: 27 },
};

const LEMON_HERB_SALMON_ASPARAGUS: Recipe = {
  id: 'lemon-herb-salmon-asparagus',
  slug: 'lemon-herb-salmon-asparagus',
  emoji: '🍋',
  title: { en: 'Lemon Herb Salmon with Asparagus', ar: 'سلمون بالأعشاب والليمون مع الهليون' },
  cuisine: { en: 'Mediterranean', ar: 'متوسطي' },
  description: { en: 'Oven-roasted salmon with lemon, dill, and parsley alongside tender asparagus and fluffy quinoa.', ar: 'سلمون مشوي بالفرن مع الليمون والشبت والبقدونس إلى جانب الهليون الطري والكينوا الخفيفة.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['4 salmon fillets (5 oz each)', '1 lb asparagus, trimmed', '1 lemon, zested and juiced', '1 tbsp olive oil', '1 clove garlic, minced', '1 tbsp chopped fresh dill', '1 tbsp chopped parsley', '2 cups cooked quinoa', '1/4 tsp black pepper'],
    ar: ['4 شرائح سلمون (نحو 140 غرامًا لكل شريحة)', '450 غرام هليون منزوع الأطراف', 'بشر وعصير ليمونة', 'ملعقة كبيرة زيت زيتون', 'فص ثوم مفروم', 'ملعقة كبيرة شبت طازج مفروم', 'ملعقة كبيرة بقدونس مفروم', 'كوبان كينوا مطبوخة', 'ربع ملعقة صغيرة فلفل أسود'],
  },
  instructions: {
    en: ['Heat oven to 400°F and place salmon and asparagus on a parchment-lined sheet pan.', 'Mix lemon zest and juice with olive oil, garlic, dill, parsley, and black pepper.', 'Spoon herb mixture over salmon and asparagus and turn asparagus to coat.', 'Roast 12–16 minutes until salmon flakes easily and reaches 145°F; check asparagus for tenderness.', 'Serve with warm quinoa and any lemon-herb juices from the pan.'],
    ar: ['سخّن الفرن إلى 400 فهرنهايت وضع السلمون والهليون في صينية مبطنة بورق الخبز.', 'اخلط بشر الليمون وعصيره مع زيت الزيتون والثوم والشبت والبقدونس والفلفل.', 'اسكب خليط الأعشاب فوق السلمون والهليون وقلّب الهليون لتغطيته.', 'اشوِ 12 إلى 16 دقيقة حتى يتفتت السلمون بسهولة وتبلغ حرارته 145 فهرنهايت، وتأكد من طراوة الهليون.', 'قدّم مع الكينوا الدافئة وعصارة الليمون والأعشاب من الصينية.'],
  },
  nutrition: { calories: 440, protein: 38, carbs: 37, fat: 16 },
};

const CHICKEN_FAJITA_BOWL: Recipe = {
  id: 'chicken-fajita-bowl',
  slug: 'chicken-fajita-bowl',
  emoji: '🌮',
  title: { en: 'Chicken Fajita Bowl', ar: 'وعاء فاهيتا الدجاج' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'Sizzling chicken strips with bell peppers and onions over brown rice, black beans, and fresh salsa.', ar: 'شرائح دجاج مشوية مع الفلفل الملون والبصل فوق أرز بني وفاصوليا سوداء وصلصة طماطم طازجة.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['2 boneless skinless chicken breasts (about 12 oz)', '1 red bell pepper, sliced', '1 yellow bell pepper, sliced', '1 small red onion, sliced', '1 tbsp olive oil', '1 tsp ground cumin', '1 tsp chili powder', '1/2 tsp smoked paprika', '2 cups cooked brown rice', '1 cup black beans, drained and rinsed', '1/2 cup fresh tomato salsa', '1 lime, cut into wedges', '2 tbsp chopped cilantro'],
    ar: ['صدرا دجاج منزوعا العظم والجلد (نحو 340 غرامًا)', 'فلفل أحمر حلو مقطع شرائح', 'فلفل أصفر حلو مقطع شرائح', 'بصلة حمراء صغيرة مقطعة شرائح', 'ملعقة كبيرة زيت زيتون', 'ملعقة صغيرة كمون مطحون', 'ملعقة صغيرة مسحوق فلفل حار', 'نصف ملعقة صغيرة بابريكا مدخنة', 'كوبان أرز بني مطبوخ', 'كوب فاصوليا سوداء مصفاة ومغسولة', 'نصف كوب صلصة طماطم طازجة', 'ليمونة خضراء مقطعة أرباعًا', 'ملعقتان كبيرتان كزبرة مفرومة'],
  },
  instructions: {
    en: ['Slice the chicken into thin strips and toss with cumin, chili powder, smoked paprika, and half the olive oil.', 'Heat a large skillet over medium-high heat and cook the chicken for 6 to 8 minutes until browned and cooked through; transfer to a plate.', 'Add the remaining oil, peppers, and onion to the skillet and cook 5 to 7 minutes until lightly charred but still crisp.', 'Return the chicken to the pan and squeeze over half the lime.', 'Divide brown rice and black beans between bowls, top with the chicken mixture, salsa, cilantro, and lime wedges.'],
    ar: ['قطّع الدجاج إلى شرائح رفيعة وقلّبه مع الكمون ومسحوق الفلفل الحار والبابريكا المدخنة ونصف زيت الزيتون.', 'سخّن مقلاة كبيرة على حرارة متوسطة إلى عالية واطه الدجاج 6 إلى 8 دقائق حتى يتحمر وينضج تمامًا ثم انقله إلى طبق.', 'أضف بقية الزيت والفلفل والبصل إلى المقلاة واطهها 5 إلى 7 دقائق حتى تتحمر قليلًا مع بقائها مقرمشة.', 'أعد الدجاج إلى المقلاة واعصر عليه نصف الليمون الأخضر.', 'وزّع الأرز البني والفاصوليا السوداء في أوعية ثم أضف خليط الدجاج والصلصة والكزبرة وأرباع الليمون.'],
  },
  nutrition: { calories: 470, protein: 38, carbs: 48, fat: 14 },
};

const LEAN_BEEF_BURRITO_BOWL: Recipe = {
  id: 'lean-beef-burrito-bowl',
  slug: 'lean-beef-burrito-bowl',
  emoji: '🌯',
  title: { en: 'Lean Beef Burrito Bowl', ar: 'وعاء بوريتو اللحم البقري الخفيف' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'Lean ground beef with brown rice, black beans, corn, lettuce, tomatoes, and a smoky yogurt-lime sauce.', ar: 'لحم بقري مفروم قليل الدهون مع أرز بني وفاصوليا سوداء وذرة وخس وطماطم وصلصة لبنية بالليمون والبابريكا المدخنة.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['1 lb 93% lean ground beef', '1 tsp olive oil', '2 cloves garlic, minced', '1 tsp ground cumin', '1 tsp smoked paprika', '1/2 tsp chili powder', '2 cups cooked brown rice', '1 cup black beans, drained and rinsed', '1 cup corn kernels', '2 cups shredded romaine lettuce', '1 cup cherry tomatoes, halved', '1 ripe avocado, sliced', '1/2 cup plain Greek yogurt', '1 lime, juiced'],
    ar: ['450 غرام لحم بقري مفروم قليل الدهون (93%)', 'ملعقة صغيرة زيت زيتون', 'فصان ثوم مفرومان', 'ملعقة صغيرة كمون مطحون', 'ملعقة صغيرة بابريكا مدخنة', 'نصف ملعقة صغيرة مسحوق فلفل حار', 'كوبان أرز بني مطبوخ', 'كوب فاصوليا سوداء مصفاة ومغسولة', 'كوب حبوب ذرة', 'كوبان خس روماني مفروم', 'كوب طماطم كرزية مقطعة أنصافًا', 'حبة أفوكادو ناضجة مقطعة شرائح', 'نصف كوب لبن يوناني سادة', 'عصير ليمونة خضراء'],
  },
  instructions: {
    en: ['Heat the olive oil in a skillet over medium heat and cook the garlic for 30 seconds.', 'Add the beef, cumin, smoked paprika, and chili powder; cook 6 to 8 minutes, breaking it up, until no pink remains.', 'Stir in the black beans and corn and cook 2 minutes more.', 'Whisk the Greek yogurt with the lime juice and a pinch of black pepper.', 'Build bowls with brown rice, beef mixture, lettuce, tomatoes, and avocado; drizzle with the yogurt-lime sauce.'],
    ar: ['سخّن زيت الزيتون في مقلاة على حرارة متوسطة واطه الثوم 30 ثانية.', 'أضف اللحم البقري والكمون والبابريكا المدخنة ومسحوق الفلفل الحار واطه 6 إلى 8 دقائق مع تقليبه حتى يختفي اللون الوردي.', 'أضف الفاصوليا السوداء والذرة واطه دقيقتين إضافيتين.', 'اخفق اللبن اليوناني مع عصير الليمون ورشة فلفل أسود.', 'رتّب الأرز البني وخليط اللحم والخس والطماطم والأفوكادو في أوعية ثم اسكب صلصة اللبن والليمون.'],
  },
  nutrition: { calories: 490, protein: 36, carbs: 50, fat: 16 },
};

const SHRIMP_TACOS_CABBAGE_SLAW: Recipe = {
  id: 'shrimp-tacos-cabbage-slaw',
  slug: 'shrimp-tacos-cabbage-slaw',
  emoji: '🍤',
  title: { en: 'Shrimp Tacos with Cabbage Slaw', ar: 'تاكو الروبيان مع سلطة الملفوف' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'Warm corn tortillas filled with chili-lime shrimp, crunchy cabbage slaw, and creamy avocado.', ar: 'تورتيا ذرة دافئة محشوة بالروبيان بالليمون والفلفل مع سلطة ملفوف مقرمشة وأفوكادو كريمي.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['1 lb large shrimp, peeled and deveined', '8 small corn tortillas', '3 cups shredded green cabbage', '1 carrot, grated', '1/4 cup plain Greek yogurt', '2 tbsp lime juice', '1 tbsp olive oil', '1 tsp chili powder', '1/2 tsp ground cumin', '1/4 cup chopped cilantro', '1 ripe avocado, sliced', 'Salt and black pepper'],
    ar: ['450 غرام روبيان كبير مقشر ومنزوع العرق', '8 تورتيا ذرة صغيرة', '3 أكواب ملفوف أخضر مفروم', 'حبة جزر مبشورة', 'ربع كوب لبن يوناني سادة', 'ملعقتان كبيرتان عصير ليمون أخضر', 'ملعقة كبيرة زيت زيتون', 'ملعقة صغيرة مسحوق فلفل حار', 'نصف ملعقة صغيرة كمون مطحون', 'ربع كوب كزبرة مفرومة', 'حبة أفوكادو ناضجة مقطعة شرائح', 'ملح وفلفل أسود'],
  },
  instructions: {
    en: ['Whisk the Greek yogurt with half the lime juice and a pinch of salt; toss with the cabbage and carrot and set aside.', 'Pat the shrimp dry and toss with olive oil, chili powder, cumin, salt, and pepper.', 'Cook the shrimp in a hot skillet for 2 to 3 minutes per side until pink and opaque.', 'Warm the tortillas in a dry pan for about 30 seconds per side.', 'Fill each tortilla with slaw, shrimp, avocado, cilantro, and a squeeze of the remaining lime.'],
    ar: ['اخفق اللبن اليوناني مع نصف عصير الليمون ورشة ملح ثم قلّبه مع الملفوف والجزر واتركه جانبًا.', 'جفف الروبيان وقلّبه مع زيت الزيتون ومسحوق الفلفل الحار والكمون والملح والفلفل.', 'اطه الروبيان في مقلاة ساخنة دقيقتين إلى 3 دقائق لكل جانب حتى يصبح ورديًا ومعتمًا.', 'سخّن التورتيا في مقلاة جافة نحو 30 ثانية لكل جانب.', 'احشُ كل تورتيا بالسلطة والروبيان والأفوكادو والكزبرة واعصر عليها بقية الليمون.'],
  },
  nutrition: { calories: 360, protein: 27, carbs: 40, fat: 10 },
};

const BLACK_BEAN_SWEET_POTATO_QUESADILLA: Recipe = {
  id: 'black-bean-sweet-potato-quesadilla',
  slug: 'black-bean-sweet-potato-quesadilla',
  emoji: '🫓',
  title: { en: 'Black Bean & Sweet Potato Quesadilla', ar: 'كيساديا الفاصوليا السوداء والبطاطا الحلوة' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'Crispy whole-wheat quesadillas filled with roasted sweet potato, black beans, spinach, and melted cheese.', ar: 'كيساديا مقرمشة من القمح الكامل محشوة بالبطاطا الحلوة المشوية والفاصوليا السوداء والسبانخ والجبن الذائب.' },
  prepTime: { en: '35 min', ar: '35 دقيقة' },
  ingredients: {
    en: ['1 large sweet potato (about 12 oz), peeled and cubed', '1 tbsp olive oil', '1 tsp ground cumin', '1 tsp smoked paprika', '1 cup black beans, drained and rinsed', '4 whole-wheat tortillas', '2 cups baby spinach', '1 cup shredded Monterey Jack cheese', '1/2 cup fresh salsa', 'Salt and black pepper'],
    ar: ['حبة بطاطا حلوة كبيرة (نحو 340 غرامًا) مقشرة ومكعبات', 'ملعقة كبيرة زيت زيتون', 'ملعقة صغيرة كمون مطحون', 'ملعقة صغيرة بابريكا مدخنة', 'كوب فاصوليا سوداء مصفاة ومغسولة', '4 تورتيا من القمح الكامل', 'كوبان سبانخ صغيرة', 'كوب جبن مونتيري جاك مبشور', 'نصف كوب صلصة طماطم طازجة', 'ملح وفلفل أسود'],
  },
  instructions: {
    en: ['Heat the oven to 400°F, toss the sweet potato with half the olive oil, cumin, paprika, salt, and pepper, and roast 20 minutes until tender.', 'Mash the roasted sweet potato with the black beans, adding a splash of water if needed.', 'Place a tortilla in a lightly oiled skillet and spread half with the sweet potato mixture, spinach, and cheese; fold and cook 3 to 4 minutes per side until golden.', 'Repeat with the remaining tortillas and filling.', 'Cut into wedges and serve with salsa.'],
    ar: ['سخّن الفرن إلى 400 فهرنهايت وقلّب البطاطا الحلوة مع نصف زيت الزيتون والكمون والبابريكا والملح والفلفل ثم اشوِها 20 دقيقة حتى تلين.', 'اهرس البطاطا المشوية مع الفاصوليا السوداء وأضف القليل من الماء عند الحاجة.', 'ضع تورتيا في مقلاة مدهونة قليلًا وافرد على نصفها خليط البطاطا والسبانخ والجبن ثم اطوها واطهها 3 إلى 4 دقائق لكل جانب حتى تتحمر.', 'كرر العملية مع بقية التورتيا والحشوة.', 'قطّعها إلى مثلثات وقدّمها مع الصلصة.'],
  },
  nutrition: { calories: 420, protein: 17, carbs: 58, fat: 14 },
};

const GRILLED_FISH_TACOS_MANGO_SALSA: Recipe = {
  id: 'grilled-fish-tacos-mango-salsa',
  slug: 'grilled-fish-tacos-mango-salsa',
  emoji: '🐟',
  title: { en: 'Grilled Fish Tacos with Mango Salsa', ar: 'تاكو السمك المشوي مع صلصة المانجو' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'Charred white fish in corn tortillas with a bright mango, red onion, and cilantro salsa.', ar: 'سمك أبيض مشوي في تورتيا الذرة مع صلصة مانجو منعشة بالبصل الأحمر والكزبرة.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['1 lb cod or tilapia fillets', '8 small corn tortillas', '1 ripe mango, diced', '1/2 small red onion, finely diced', '1 jalapeño, seeded and minced (optional)', '1/4 cup chopped cilantro', '2 limes, juiced', '1 tbsp olive oil', '1 tsp ground cumin', '1/2 tsp smoked paprika', '2 cups shredded cabbage', 'Salt and black pepper'],
    ar: ['450 غرام فيليه سمك قد أو تيلابيا', '8 تورتيا ذرة صغيرة', 'حبة مانجو ناضجة مكعبات', 'نصف بصلة حمراء صغيرة مفرومة ناعمًا', 'حبة فلفل هالابينو منزوعة البذور ومفرومة (اختياري)', 'ربع كوب كزبرة مفرومة', 'عصير ليمونتين خضراوين', 'ملعقة كبيرة زيت زيتون', 'ملعقة صغيرة كمون مطحون', 'نصف ملعقة صغيرة بابريكا مدخنة', 'كوبان ملفوف مفروم', 'ملح وفلفل أسود'],
  },
  instructions: {
    en: ['Mix the mango, red onion, jalapeño if using, half the cilantro, and the juice of one lime; season lightly and set aside.', 'Pat the fish dry and rub with olive oil, cumin, smoked paprika, salt, and pepper.', 'Grill or pan-sear the fish for 3 to 4 minutes per side until it flakes easily.', 'Warm the tortillas in a dry pan and flake the fish into large pieces.', 'Fill tortillas with cabbage, fish, mango salsa, remaining cilantro, and a squeeze of lime.'],
    ar: ['اخلط المانجو والبصل الأحمر والهالابينو إن رغبت ونصف الكزبرة وعصير ليمونة واحدة وتبّل قليلًا ثم اتركه جانبًا.', 'جفف السمك وافركه بزيت الزيتون والكمون والبابريكا المدخنة والملح والفلفل.', 'اشوِ السمك أو اطهه في مقلاة 3 إلى 4 دقائق لكل جانب حتى يتفتت بسهولة.', 'سخّن التورتيا في مقلاة جافة وفتت السمك إلى قطع كبيرة.', 'احشُ التورتيا بالملفوف والسمك وصلصة المانجو وبقية الكزبرة واعصر عليها الليمون.'],
  },
  nutrition: { calories: 340, protein: 28, carbs: 38, fat: 8 },
};

const MEXICAN_QUINOA_SALAD: Recipe = {
  id: 'mexican-quinoa-salad',
  slug: 'mexican-quinoa-salad',
  emoji: '🥗',
  title: { en: 'Mexican Quinoa Salad', ar: 'سلطة الكينوا المكسيكية' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'A fiber-rich salad with quinoa, black beans, corn, tomatoes, avocado, and a smoky lime dressing.', ar: 'سلطة غنية بالألياف بالكينوا والفاصوليا السوداء والذرة والطماطم والأفوكادو وصلصة ليمون مدخنة.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['2 cups cooked quinoa, cooled', '1 cup black beans, drained and rinsed', '1 cup corn kernels', '1 cup cherry tomatoes, halved', '1/2 English cucumber, diced', '1/4 cup finely diced red onion', '1 ripe avocado, cubed', '1/4 cup chopped cilantro', '3 tbsp lime juice', '2 tbsp olive oil', '1/2 tsp smoked paprika', '1/4 tsp chili powder', 'Salt and black pepper'],
    ar: ['كوبان كينوا مطبوخة ومبردة', 'كوب فاصوليا سوداء مصفاة ومغسولة', 'كوب حبوب ذرة', 'كوب طماطم كرزية مقطعة أنصافًا', 'نصف خيار إنجليزي مكعبات', 'ربع كوب بصل أحمر مفروم ناعمًا', 'حبة أفوكادو ناضجة مكعبات', 'ربع كوب كزبرة مفرومة', '3 ملاعق كبيرة عصير ليمون أخضر', 'ملعقتان كبيرتان زيت زيتون', 'نصف ملعقة صغيرة بابريكا مدخنة', 'ربع ملعقة صغيرة مسحوق فلفل حار', 'ملح وفلفل أسود'],
  },
  instructions: {
    en: ['Whisk the lime juice, olive oil, smoked paprika, chili powder, salt, and pepper in a large bowl.', 'Add the quinoa, black beans, corn, tomatoes, cucumber, and red onion and toss to combine.', 'Fold in the avocado and cilantro gently.', 'Let the salad stand for 10 minutes so the flavors blend.', 'Serve chilled or at room temperature.'],
    ar: ['اخفق عصير الليمون وزيت الزيتون والبابريكا المدخنة ومسحوق الفلفل الحار والملح والفلفل في وعاء كبير.', 'أضف الكينوا والفاصوليا السوداء والذرة والطماطم والخيار والبصل الأحمر وقلّب حتى تمتزج.', 'أضف الأفوكادو والكزبرة وقلّب برفق.', 'اترك السلطة 10 دقائق لتمتزج النكهات.', 'قدّمها باردة أو بحرارة الغرفة.'],
  },
  nutrition: { calories: 390, protein: 14, carbs: 54, fat: 14 },
};

const TURKEY_ZUCCHINI_ENCHILADAS: Recipe = {
  id: 'turkey-zucchini-enchiladas',
  slug: 'turkey-zucchini-enchiladas',
  emoji: '🫔',
  title: { en: 'Turkey & Zucchini Enchiladas', ar: 'إنشيلادا الديك الرومي والكوسا' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'Lean turkey and grated zucchini rolled in corn tortillas, topped with red enchilada sauce and cheese, then baked.', ar: 'ديك رومي قليل الدهون وكوسا مبشورة ملفوفان في تورتيا الذرة مع صلصة إنشيلادا حمراء وجبن ثم مخبوزان.' },
  prepTime: { en: '50 min', ar: '50 دقيقة' },
  ingredients: {
    en: ['1 lb lean ground turkey', '2 medium zucchini, grated and squeezed dry', '1 small onion, diced', '2 cloves garlic, minced', '1 tbsp olive oil', '1 tsp ground cumin', '1 tsp chili powder', '1 cup black beans, drained and rinsed', '8 corn tortillas', '1 1/2 cups red enchilada sauce', '1 cup shredded Monterey Jack cheese', '1/2 cup plain Greek yogurt', '1/4 cup chopped cilantro'],
    ar: ['450 غرام ديك رومي مفروم قليل الدهون', 'حبتا كوسا متوسطتان مبشورتان ومعصورتان من الماء', 'بصلة صغيرة مكعبات', 'فصان ثوم مفرومان', 'ملعقة كبيرة زيت زيتون', 'ملعقة صغيرة كمون مطحون', 'ملعقة صغيرة مسحوق فلفل حار', 'كوب فاصوليا سوداء مصفاة ومغسولة', '8 تورتيا ذرة', 'كوب ونصف صلصة إنشيلادا حمراء', 'كوب جبن مونتيري جاك مبشور', 'نصف كوب لبن يوناني سادة', 'ربع كوب كزبرة مفرومة'],
  },
  instructions: {
    en: ['Heat the oven to 375°F and spread 1/2 cup enchilada sauce in a baking dish.', 'Warm the olive oil in a skillet and cook the onion and garlic for 3 minutes.', 'Add the turkey, cumin, and chili powder and cook until no pink remains; stir in the zucchini and black beans and cook 3 minutes more.', 'Warm the tortillas, fill each with the turkey mixture, roll, and place seam-side down in the dish.', 'Pour over the remaining sauce, sprinkle with cheese, and bake 20 minutes; serve with Greek yogurt and cilantro.'],
    ar: ['سخّن الفرن إلى 375 فهرنهايت وافرد نصف كوب من صلصة الإنشيلادا في طبق خبز.', 'سخّن زيت الزيتون في مقلاة واطه البصل والثوم 3 دقائق.', 'أضف الديك الرومي والكمون ومسحوق الفلفل الحار واطه حتى يختفي اللون الوردي ثم أضف الكوسا والفاصوليا واطه 3 دقائق إضافية.', 'سخّن التورتيا واحشُ كل واحدة بخليط الديك الرومي ثم لفها وضعها في الطبق بحيث يكون طرف اللفة للأسفل.', 'اسكب بقية الصلصة ورش الجبن واخبز 20 دقيقة ثم قدّم مع اللبن اليوناني والكزبرة.'],
  },
  nutrition: { calories: 410, protein: 32, carbs: 38, fat: 15 },
};

const CHICKEN_TORTILLA_SOUP_LIGHT: Recipe = {
  id: 'chicken-tortilla-soup-light',
  slug: 'chicken-tortilla-soup-light',
  emoji: '🍲',
  title: { en: 'Chicken Tortilla Soup (Light)', ar: 'شوربة التورتيا بالدجاج (خفيفة)' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'A brothy tomato-chicken soup with black beans, corn, peppers, and crispy baked tortilla strips.', ar: 'شوربة دجاج وطماطم غنية بالمرق مع فاصوليا سوداء وذرة وفلفل وشرائح تورتيا مخبوزة مقرمشة.' },
  prepTime: { en: '40 min', ar: '40 دقيقة' },
  ingredients: {
    en: ['12 oz boneless skinless chicken breast', '6 cups low-sodium chicken broth', '1 can (14 oz) diced tomatoes', '1 cup black beans, drained and rinsed', '1 cup corn kernels', '1 red bell pepper, diced', '1 small onion, diced', '2 cloves garlic, minced', '1 tsp ground cumin', '1 tsp chili powder', '2 corn tortillas, cut into strips', '1 lime, juiced', '1/4 cup chopped cilantro', '1 ripe avocado, sliced'],
    ar: ['340 غرامًا من صدر الدجاج منزوع العظم والجلد', '6 أكواب مرق دجاج قليل الصوديوم', 'علبة (400 غرام) طماطم مكعبات', 'كوب فاصوليا سوداء مصفاة ومغسولة', 'كوب حبوب ذرة', 'فلفل أحمر حلو مكعبات', 'بصلة صغيرة مكعبات', 'فصان ثوم مفرومان', 'ملعقة صغيرة كمون مطحون', 'ملعقة صغيرة مسحوق فلفل حار', 'تورتيا ذرة مقطعة شرائح', 'عصير ليمونة خضراء', 'ربع كوب كزبرة مفرومة', 'حبة أفوكادو ناضجة مقطعة شرائح'],
  },
  instructions: {
    en: ['Bring the chicken broth to a gentle simmer, add the chicken, and cook 15 minutes until cooked through; remove and shred.', 'Heat a large pot, add the onion, bell pepper, and garlic, and cook 4 minutes.', 'Stir in the cumin, chili powder, tomatoes, black beans, corn, and broth; simmer 15 minutes.', 'Toss the tortilla strips with a little oil and bake at 400°F for 8 to 10 minutes until crisp.', 'Return the chicken to the soup, stir in the lime juice, and serve topped with tortilla strips, cilantro, and avocado.'],
    ar: ['اترك مرق الدجاج يغلي بهدوء وأضف الدجاج واطهه 15 دقيقة حتى ينضج ثم أخرجه وفتته.', 'سخّن قدرًا كبيرًا وأضف البصل والفلفل والثوم واطه 4 دقائق.', 'أضف الكمون ومسحوق الفلفل الحار والطماطم والفاصوليا والذرة والمرق واتركه يغلي 15 دقيقة.', 'قلّب شرائح التورتيا مع قليل من الزيت واخبزها على 400 فهرنهايت 8 إلى 10 دقائق حتى تصبح مقرمشة.', 'أعد الدجاج إلى الشوربة وأضف عصير الليمون ثم قدّمها مع شرائح التورتيا والكزبرة والأفوكادو.'],
  },
  nutrition: { calories: 320, protein: 30, carbs: 32, fat: 9 },
};

const BEEF_BELL_PEPPER_FAJITAS: Recipe = {
  id: 'beef-bell-pepper-fajitas',
  slug: 'beef-bell-pepper-fajitas',
  emoji: '🥩',
  title: { en: 'Beef & Bell Pepper Fajitas', ar: 'فاهيتا اللحم البقري والفلفل الملون' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'Tender sirloin strips seared with tri-color bell peppers and onions, served with warm tortillas.', ar: 'شرائح لحم سيرلوين طرية مشوية مع فلفل ملون وبصل وتقدم مع تورتيا دافئة.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['1 lb sirloin steak, thinly sliced against the grain', '1 red bell pepper, sliced', '1 green bell pepper, sliced', '1 yellow bell pepper, sliced', '1 large onion, sliced', '2 tbsp olive oil', '1 lime, juiced', '1 tsp ground cumin', '1 tsp chili powder', '1/2 tsp smoked paprika', '2 cloves garlic, minced', '6 small whole-wheat tortillas', '1/2 cup plain Greek yogurt', '1/2 cup fresh salsa'],
    ar: ['450 غرام ستيك سيرلوين مقطع شرائح رفيعة عكس اتجاه الألياف', 'فلفل أحمر حلو مقطع شرائح', 'فلفل أخضر حلو مقطع شرائح', 'فلفل أصفر حلو مقطع شرائح', 'بصلة كبيرة مقطعة شرائح', 'ملعقتان كبيرتان زيت زيتون', 'عصير ليمونة خضراء', 'ملعقة صغيرة كمون مطحون', 'ملعقة صغيرة مسحوق فلفل حار', 'نصف ملعقة صغيرة بابريكا مدخنة', 'فصان ثوم مفرومان', '6 تورتيا صغيرة من القمح الكامل', 'نصف كوب لبن يوناني سادة', 'نصف كوب صلصة طماطم طازجة'],
  },
  instructions: {
    en: ['Toss the beef with half the olive oil, lime juice, cumin, chili powder, smoked paprika, garlic, salt, and pepper.', 'Heat a large skillet over high heat and sear the beef for 2 to 3 minutes per side; transfer to a plate.', 'Add the remaining oil, peppers, and onion and cook 5 to 6 minutes until softened and lightly charred.', 'Return the beef and any juices to the pan and toss for 1 minute.', 'Serve in warm tortillas with Greek yogurt and salsa.'],
    ar: ['قلّب اللحم مع نصف زيت الزيتون وعصير الليمون والكمون ومسحوق الفلفل الحار والبابريكا المدخنة والثوم والملح والفلفل.', 'سخّن مقلاة كبيرة على حرارة عالية واشوِ اللحم دقيقتين إلى 3 دقائق لكل جانب ثم انقله إلى طبق.', 'أضف بقية الزيت والفلفل والبصل واطه 5 إلى 6 دقائق حتى يلين ويتحمر قليلًا.', 'أعد اللحم وعصارته إلى المقلاة وقلّب دقيقة واحدة.', 'قدّمه في تورتيا دافئة مع اللبن اليوناني والصلصة.'],
  },
  nutrition: { calories: 430, protein: 35, carbs: 36, fat: 17 },
};

const CILANTRO_LIME_CAULIFLOWER_RICE_BOWL: Recipe = {
  id: 'cilantro-lime-cauliflower-rice-bowl',
  slug: 'cilantro-lime-cauliflower-rice-bowl',
  emoji: '🥣',
  title: { en: 'Cilantro Lime Cauliflower Rice Bowl', ar: 'وعاء أرز القرنبيط بالكزبرة والليمون' },
  cuisine: { en: 'Mexican', ar: 'مكسيكي' },
  description: { en: 'A low-carb bowl of cilantro-lime cauliflower rice with black beans, grilled chicken, avocado, and pico de gallo.', ar: 'وعاء منخفض الكربوهيدرات من أرز القرنبيط بالكزبرة والليمون مع فاصوليا سوداء ودجاج مشوي وأفوكادو وصلصة بيتو دي غايو.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['4 cups cauliflower rice', '2 boneless skinless chicken breasts (about 12 oz)', '1 tbsp olive oil', '2 cloves garlic, minced', '1 tsp ground cumin', '1/2 tsp smoked paprika', '1 cup black beans, drained and rinsed', '1 ripe avocado, sliced', '1 cup diced tomato', '1/4 cup finely diced red onion', '1/4 cup chopped cilantro', '2 limes, juiced', 'Salt and black pepper'],
    ar: ['4 أكواب أرز قرنبيط', 'صدرا دجاج منزوعا العظم والجلد (نحو 340 غرامًا)', 'ملعقة كبيرة زيت زيتون', 'فصان ثوم مفرومان', 'ملعقة صغيرة كمون مطحون', 'نصف ملعقة صغيرة بابريكا مدخنة', 'كوب فاصوليا سوداء مصفاة ومغسولة', 'حبة أفوكادو ناضجة مقطعة شرائح', 'كوب طماطم مكعبات', 'ربع كوب بصل أحمر مفروم ناعمًا', 'ربع كوب كزبرة مفرومة', 'عصير ليمونتين خضراوين', 'ملح وفلفل أسود'],
  },
  instructions: {
    en: ['Season the chicken with cumin, smoked paprika, salt, and pepper; grill or pan-sear 6 to 7 minutes per side, then rest and slice.', 'Heat half the olive oil in a skillet and cook the garlic for 30 seconds.', 'Add the cauliflower rice and cook 5 to 6 minutes until tender; stir in half the lime juice and half the cilantro.', 'Mix the tomato, red onion, remaining cilantro, and remaining lime juice for a quick pico de gallo.', 'Build bowls with cauliflower rice, chicken, black beans, avocado, and pico de gallo.'],
    ar: ['تبّل الدجاج بالكمون والبابريكا المدخنة والملح والفلفل واشوه أو اطهه في مقلاة 6 إلى 7 دقائق لكل جانب ثم اتركه يرتاح وقطعه.', 'سخّن نصف زيت الزيتون في مقلاة واطه الثوم 30 ثانية.', 'أضف أرز القرنبيط واطه 5 إلى 6 دقائق حتى يلين ثم أضف نصف عصير الليمون ونصف الكزبرة.', 'اخلط الطماطم والبصل الأحمر وبقية الكزبرة وبقية عصير الليمون لتحضير بيتو دي غايو سريع.', 'رتّب أرز القرنبيط والدجاج والفاصوليا والأفوكادو والبيتو دي غايو في أوعية.'],
  },
  nutrition: { calories: 370, protein: 34, carbs: 24, fat: 15 },
};

const GRILLED_CHICKEN_COBB_SALAD: Recipe = {
  id: 'grilled-chicken-cobb-salad-vinaigrette',
  slug: 'grilled-chicken-cobb-salad-vinaigrette',
  foodLibraryDishId: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be001',
  emoji: '🥗',
  title: { en: 'Grilled Chicken Cobb Salad', ar: 'سلطة كوب بالدجاج المشوي' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Grilled chicken, hard-boiled eggs, avocado, and blue cheese in neat rows over crisp romaine and radicchio, finished with a bright lemon-herb vinaigrette instead of a heavy dressing.', ar: 'دجاج مشوي وبيض مسلوق وأفوكادو وجبن أزرق في صفوف مرتبة فوق خس روماني وشيكوريا مقرمشة، مع صلصة ليمون وأعشاب خفيفة بدلًا من الصلصة الثقيلة.' },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['1 lb boneless, skinless chicken breast', '1 tbsp olive oil', '1/2 tsp smoked paprika', '1/2 tsp garlic powder', '6 cups chopped romaine lettuce', '2 cups shredded radicchio or red cabbage', '3 hard-boiled eggs, quartered', '1 ripe avocado, sliced', '1 cup cherry tomatoes, halved', '1/3 cup crumbled blue cheese', '2 tbsp sliced almonds', 'Dressing: 2 tbsp olive oil, 1 tbsp lemon juice, 1 tsp Dijon mustard, 1 tbsp chopped parsley, 1 tsp chopped chives'],
    ar: ['450 غرامًا من صدور الدجاج منزوعة العظم والجلد', 'ملعقة كبيرة زيت زيتون', 'نصف ملعقة صغيرة بابريكا مدخنة', 'نصف ملعقة صغيرة مسحوق الثوم', '6 أكواب خس روماني مفروم', 'كوبان شيكوريا حمراء أو ملفوف أحمر مفروم', '3 بيضات مسلوقة مقطعة أرباعًا', 'حبة أفوكادو ناضجة مقطعة شرائح', 'كوب طماطم كرزية مقطعة أنصافًا', 'ثلث كوب جبن أزرق مفتت', 'ملعقتان كبيرتان لوز مقطع شرائح', 'الصلصة: ملعقتان كبيرتان زيت زيتون، ملعقة كبيرة عصير ليمون، ملعقة صغيرة خردل ديجون، ملعقة كبيرة بقدونس مفروم، ملعقة صغيرة ثوم معمر مفروم'],
  },
  instructions: {
    en: ['Season the chicken with smoked paprika, garlic powder, salt, and black pepper.', 'Grill or sear in a grill pan for 6 to 7 minutes per side until the center reaches 165°F; rest 5 minutes, then slice.', 'Whisk the dressing ingredients with 1 tablespoon of water until smooth.', 'Toss the romaine and radicchio with half the dressing and spread over a large platter.', 'Arrange chicken, eggs, avocado, tomatoes, blue cheese, and almonds in rows and spoon the remaining dressing over the top.'],
    ar: ['تبّل الدجاج بالبابريكا المدخنة ومسحوق الثوم والملح والفلفل الأسود.', 'اشوِ الدجاج على الشواية أو في مقلاة مشوية 6 إلى 7 دقائق لكل جانب حتى تبلغ حرارة مركزه 165 فهرنهايت، ثم اتركه 5 دقائق وقطعه شرائح.', 'اخفق مكونات الصلصة مع ملعقة كبيرة ماء حتى تصبح ناعمة.', 'قلّب الخس الروماني والشيكوريا مع نصف الصلصة وافردهما في طبق تقديم كبير.', 'رتّب الدجاج والبيض والأفوكادو والطماطم والجبن الأزرق واللوز في صفوف ثم اسكب بقية الصلصة فوقها.'],
  },
  nutrition: { calories: 290, protein: 26, carbs: 8, fat: 17 },
};

const BUFFALO_CHICKEN_LETTUCE_WRAPS: Recipe = {
  id: 'buffalo-chicken-lettuce-wraps',
  slug: 'buffalo-chicken-lettuce-wraps',
  foodLibraryDishId: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be002',
  emoji: '🌯',
  title: { en: 'Buffalo Chicken Lettuce Wraps', ar: 'لفائف الخس بالدجاج بصلصة بافلو' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Tender chicken strips tossed in a tangy buffalo sauce and piled into crisp lettuce leaves with carrot, celery, and a cooling Greek yogurt ranch.', ar: 'شرائح دجاج طرية بصلصة بافلو حارة داخل أوراق خس مقرمشة مع جزر وكرفس وصلصة رانش باردة باللبن اليوناني.' },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['1 lb boneless, skinless chicken breast, cut into strips', '1/2 cup mild buffalo-style hot sauce', '1 tsp olive oil', '1/2 tsp garlic powder', '8 large butter lettuce leaves', '1 cup shredded carrot', '1/2 cup finely diced celery', '1/4 cup crumbled blue cheese (optional)', 'Ranch: 1/2 cup plain Greek yogurt, 1 tbsp milk, 1 tsp lemon juice, 1/2 tsp dried dill, 1/2 tsp garlic powder, 1 tbsp chopped chives'],
    ar: ['450 غرامًا من صدور الدجاج منزوعة العظم والجلد مقطعة شرائح', 'نصف كوب صلصة بافلو معتدلة الحرارة', 'ملعقة صغيرة زيت زيتون', 'نصف ملعقة صغيرة مسحوق الثوم', '8 أوراق خس كبيرة', 'كوب جزر مبشور', 'نصف كوب كرفس مكعبات صغيرة', 'ربع كوب جبن أزرق مفتت (اختياري)', 'الرانش: نصف كوب لبن يوناني سادة، ملعقة كبيرة حليب، ملعقة صغيرة عصير ليمون، نصف ملعقة صغيرة شبت مجفف، نصف ملعقة صغيرة مسحوق الثوم، ملعقة كبيرة ثوم معمر مفروم'],
  },
  instructions: {
    en: ['Toss the chicken strips with olive oil, garlic powder, and black pepper.', 'Sear in a hot skillet for 6 to 8 minutes, turning once, until cooked through and 165°F at the center.', 'Remove from the heat and toss the chicken with the buffalo sauce.', 'Whisk the Greek yogurt, milk, lemon juice, dill, garlic powder, and chives into a quick ranch.', 'Spoon the chicken into lettuce leaves, top with carrot, celery, and blue cheese, and drizzle with ranch.'],
    ar: ['قلّب شرائح الدجاج مع زيت الزيتون ومسحوق الثوم والفلفل الأسود.', 'اشوِها في مقلاة ساخنة 6 إلى 8 دقائق مع تقليبها مرة واحدة حتى تنضج وتصل حرارة مركزها إلى 165 فهرنهايت.', 'ارفع المقلاة عن النار وقلّب الدجاج مع صلصة بافلو.', 'اخفق اللبن اليوناني والحليب وعصير الليمون والشبت ومسحوق الثوم والثوم المعمر لتحضير صلصة رانش سريعة.', 'وزّع الدجاج في أوراق الخس وأضف الجزر والكرفس والجبن الأزرق ثم اسكب صلصة الرانش.'],
  },
  nutrition: { calories: 216, protein: 24, carbs: 9, fat: 9 },
};

const TURKEY_MEATLOAF_CAULIFLOWER_MASH: Recipe = {
  id: 'turkey-meatloaf-cauliflower-mash',
  slug: 'turkey-meatloaf-cauliflower-mash',
  foodLibraryDishId: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be003',
  emoji: '🍽️',
  title: { en: 'Turkey Meatloaf with Cauliflower Mash', ar: 'رغيف الديك الرومي مع هريس القرنبيط' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A moist, lean turkey meatloaf with grated vegetables under a light tomato glaze, served with creamy Parmesan cauliflower mash.', ar: 'رغيف ديك رومي طري وقليل الدهون مع خضار مبشورة وطبقة طماطم خفيفة، يقدم مع هريس قرنبيط كريمي بالبارميزان.' },
  prepTime: { en: '55 min', ar: '55 دقيقة' },
  ingredients: {
    en: ['1 1/2 lb lean ground turkey (93%)', '1/2 cup whole-wheat panko breadcrumbs', '1 large egg', '1/2 cup finely diced onion', '1/2 cup grated carrot', '1/4 cup low-sodium tomato sauce', '1 tbsp Worcestershire sauce', '1 tsp garlic powder', '1 tsp dried oregano', '1/2 tsp black pepper', 'Glaze: 1/4 cup low-sodium tomato sauce, 1 tsp Dijon mustard', 'Mash: 1 large head cauliflower (about 6 cups florets), 2 cloves garlic, 1/4 cup grated Parmesan, 1/4 cup plain Greek yogurt, 1 tbsp olive oil'],
    ar: ['700 غرام من الديك الرومي المفروم قليل الدهون', 'نصف كوب بقسماط قمح كامل', 'بيضة كبيرة', 'نصف كوب بصل مفروم ناعمًا', 'نصف كوب جزر مبشور', 'ربع كوب صلصة طماطم قليلة الصوديوم', 'ملعقة كبيرة صلصة ورشستر', 'ملعقة صغيرة مسحوق الثوم', 'ملعقة صغيرة أوريغانو مجفف', 'نصف ملعقة صغيرة فلفل أسود', 'الطبقة: ربع كوب صلصة طماطم قليلة الصوديوم، ملعقة صغيرة خردل ديجون', 'الهريس: رأس قرنبيط كبير (نحو 6 أكواب زهرات)، فصان ثوم، ربع كوب بارميزان مبشور، ربع كوب لبن يوناني سادة، ملعقة كبيرة زيت زيتون'],
  },
  instructions: {
    en: ['Heat the oven to 375°F and line a loaf pan with parchment.', 'Mix the turkey, breadcrumbs, egg, onion, carrot, tomato sauce, Worcestershire sauce, garlic powder, oregano, and pepper until just combined.', 'Press into the pan, spread the glaze over the top, and bake 40 to 45 minutes until the center reaches 165°F.', 'Steam the cauliflower and garlic for 10 minutes, then blend with Parmesan, Greek yogurt, olive oil, salt, and pepper until smooth.', 'Rest the meatloaf 10 minutes before slicing and serve with the cauliflower mash.'],
    ar: ['سخّن الفرن إلى 375 فهرنهايت وبطّن قالب الرغيف بورق الخبز.', 'اخلط الديك الرومي والبقسماط والبيض والبصل والجزر وصلصة الطماطم وصلصة ورشستر ومسحوق الثوم والأوريغانو والفلفل حتى يتجانس الخليط دون إفراط.', 'اضغط الخليط في القالب وافرد الطبقة فوقه واخبزه 40 إلى 45 دقيقة حتى تبلغ حرارة مركزه 165 فهرنهايت.', 'اطه القرنبيط والثوم على البخار 10 دقائق ثم اخلطهما مع البارميزان واللبن اليوناني وزيت الزيتون والملح والفلفل حتى يصبح المزيج ناعمًا.', 'اترك الرغيف 10 دقائق قبل تقطيعه وقدمه مع هريس القرنبيط.'],
  },
  nutrition: { calories: 336, protein: 36, carbs: 20, fat: 13 },
};

const LOADED_BAKED_SWEET_POTATO: Recipe = {
  id: 'loaded-baked-sweet-potato',
  slug: 'loaded-baked-sweet-potato',
  foodLibraryDishId: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be004',
  emoji: '🍠',
  title: { en: 'Loaded Baked Sweet Potato', ar: 'بطاطا حلوة مشوية محشوة' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'A whole baked sweet potato split and loaded with cumin-spiced black beans, corn, salsa, avocado, and cool Greek yogurt.', ar: 'حبة بطاطا حلوة مشوية كاملة مفتوحة ومحشوة بالفاصوليا السوداء بالكمون والذرة والصلصة والأفوكادو واللبن اليوناني.' },
  prepTime: { en: '50 min', ar: '50 دقيقة' },
  ingredients: {
    en: ['2 medium sweet potatoes (about 10 oz each)', '1 tsp olive oil', '1 cup black beans, drained and rinsed', '1/2 cup corn kernels', '1/2 tsp ground cumin', '1/2 tsp chili powder', '1/4 cup mild salsa', '1/2 cup plain Greek yogurt', '1/2 ripe avocado, diced', '1/4 cup chopped cilantro', '1 lime, cut into wedges'],
    ar: ['حبتا بطاطا حلوة متوسطتان (نحو 280 غرامًا لكل حبة)', 'ملعقة صغيرة زيت زيتون', 'كوب فاصوليا سوداء مصفاة ومغسولة', 'نصف كوب حبوب ذرة', 'نصف ملعقة صغيرة كمون مطحون', 'نصف ملعقة صغيرة مسحوق فلفل حار', 'ربع كوب صلصة طماطم معتدلة', 'نصف كوب لبن يوناني سادة', 'نصف حبة أفوكادو ناضجة مكعبات', 'ربع كوب كزبرة مفرومة', 'ليمونة خضراء مقطعة أرباعًا'],
  },
  instructions: {
    en: ['Heat the oven to 425°F, rub the sweet potatoes with olive oil, and pierce them a few times with a fork.', 'Bake 40 to 45 minutes until completely tender, turning once halfway through.', 'Warm the black beans and corn with the cumin, chili powder, and 2 tablespoons of water.', 'Split each potato and fluff the inside with a fork.', 'Fill with beans and corn, top with salsa, Greek yogurt, avocado, and cilantro, and serve with lime wedges.'],
    ar: ['سخّن الفرن إلى 425 فهرنهايت وادهن البطاطا بزيت الزيتون واثقبها عدة مرات بالشوكة.', 'اخبزها 40 إلى 45 دقيقة حتى تلين تمامًا مع تقليبها مرة واحدة في منتصف المدة.', 'سخّن الفاصوليا السوداء والذرة مع الكمون ومسحوق الفلفل الحار وملعقتين كبيرتين ماء.', 'افتح كل حبة بطاطا وافرك داخلها بالشوكة.', 'احشُها بالفاصوليا والذرة وأضف الصلصة واللبن اليوناني والأفوكادو والكزبرة وقدمها مع شرائح الليمون.'],
  },
  nutrition: { calories: 312, protein: 13, carbs: 50, fat: 7 },
};

const CRISPY_BAKED_CHICKEN_TENDERS: Recipe = {
  id: 'crispy-baked-chicken-tenders-almond',
  slug: 'crispy-baked-chicken-tenders-almond',
  foodLibraryDishId: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be005',
  emoji: '🍗',
  title: { en: 'Crispy Baked Chicken Tenders with Almond Crust', ar: 'أصابع الدجاج المقرمشة المخبوزة بطبقة اللوز' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: { en: 'Golden oven-baked chicken tenders with an almond flour and panko crust, served with a tangy Greek yogurt mustard dip instead of fryer oil.', ar: 'أصابع دجاج ذهبية مقرمشة من الفرن بطبقة من دقيق اللوز والبقسماط، تقدم مع صلصة غمس باللبن اليوناني والخردل بدلًا من القلي بالزيت.' },
  prepTime: { en: '35 min', ar: '35 دقيقة' },
  ingredients: {
    en: ['1 lb chicken breast tenders', '1/2 cup almond flour', '1/2 cup whole-wheat panko breadcrumbs', '1/4 cup grated Parmesan', '1 tsp smoked paprika', '1/2 tsp garlic powder', '1/2 tsp onion powder', '1 large egg', '1 tbsp olive oil', 'Dip: 1/2 cup plain Greek yogurt, 1 tsp Dijon mustard, 1 tsp lemon juice, 1 tbsp chopped chives'],
    ar: ['450 غرامًا من أصابع صدور الدجاج', 'نصف كوب دقيق لوز', 'نصف كوب بقسماط قمح كامل', 'ربع كوب بارميزان مبشور', 'ملعقة صغيرة بابريكا مدخنة', 'نصف ملعقة صغيرة مسحوق الثوم', 'نصف ملعقة صغيرة مسحوق البصل', 'بيضة كبيرة', 'ملعقة كبيرة زيت زيتون', 'الغمس: نصف كوب لبن يوناني سادة، ملعقة صغيرة خردل ديجون، ملعقة صغيرة عصير ليمون، ملعقة كبيرة ثوم معمر مفروم'],
  },
  instructions: {
    en: ['Heat the oven to 425°F and set a wire rack over a lined sheet pan.', 'Mix the almond flour, panko, Parmesan, smoked paprika, garlic powder, and onion powder in a shallow bowl.', 'Beat the egg with 1 tablespoon of water in a second bowl.', 'Dip each tender in egg, press firmly into the crumb mixture, and place on the rack; brush lightly with olive oil.', 'Bake 16 to 20 minutes, turning once, until golden and 165°F at the center; stir the dip ingredients together and serve.'],
    ar: ['سخّن الفرن إلى 425 فهرنهايت وضع شبكة معدنية فوق صينية مبطنة.', 'اخلط دقيق اللوز والبقسماط والبارميزان والبابريكا المدخنة ومسحوق الثوم ومسحوق البصل في وعاء مسطح.', 'اخفق البيضة مع ملعقة كبيرة ماء في وعاء ثانٍ.', 'اغمس كل إصبع دجاج في البيض ثم اضغطه جيدًا في خليط البقسماط وضعه على الشبكة وادهنه بقليل من زيت الزيتون.', 'اخبزه 16 إلى 20 دقيقة مع تقليبه مرة واحدة حتى يصبح ذهبيًا وتصل حرارة مركزه 165 فهرنهايت، ثم اخلط مكونات الغمس وقدمه معه.'],
  },
  nutrition: { calories: 263, protein: 28, carbs: 14, fat: 11 },
};

const BENELUX_BAKED_RICE_PUDDING: Recipe = {
  id: 'benelux-baked-rice-pudding',
  slug: 'benelux-baked-rice-pudding',
  foodLibraryDishId: '001ced3a-7ce8-4c1d-b2bd-b2c44852531f',
  imageUrl: '/images/recipes/benelux-baked-rice-pudding.webp',
  emoji: '🍮',
  title: { en: 'Benelux Baked Rice Pudding', ar: 'بودينغ الأرز المخبوز البنلوكسي' },
  cuisine: { en: 'Benelux', ar: 'بنلوكسي' },
  description: {
    en: 'Creamy short-grain rice baked with milk, egg and vanilla until golden on top.',
    ar: 'أرز قصير الحبة كريمي يُخبز مع الحليب والبيض والفانيلا حتى يصبح وجهه ذهبيًا.',
  },
  prepTime: { en: '1 hr 10 min', ar: '70 دقيقة' },
  ingredients: {
    en: ['1 cup short-grain rice, rinsed', '4 cups whole milk', '2 eggs, lightly beaten', '1/3 cup sugar', '1 tsp vanilla extract', '1/2 tsp ground cinnamon', '1 tbsp butter for the dish', 'Pinch of salt'],
    ar: ['كوب أرز قصير الحبة مغسول', '4 أكواب حليب كامل الدسم', 'بيضتان مخفوقتان', 'ثلث كوب سكر', 'ملعقة صغيرة فانيلا', 'نصف ملعقة صغيرة قرفة مطحونة', 'ملعقة كبيرة زبدة للطبق', 'رشة ملح'],
  },
  instructions: {
    en: ['Heat the oven to 180°C (350°F) and butter a medium baking dish.', 'Simmer the rice with milk and salt over low heat for 20 minutes, stirring often.', 'Whisk the eggs with sugar and vanilla, then temper with a ladle of the warm rice mixture.', 'Stir the egg mixture into the rice and pour everything into the prepared dish.', 'Sprinkle with cinnamon and bake for 35–40 minutes until set and golden.', 'Rest for 10 minutes before serving warm or chilled.'],
    ar: ['سخّن الفرن إلى 180 درجة مئوية وادهن طبق الخبز بالزبدة.', 'اطه الأرز مع الحليب والملح على نار هادئة 20 دقيقة مع التحريك المتكرر.', 'اخلط البيض مع السكر والفانيلا ثم أضف ملعقة من خليط الأرز الدافئ لتلطيفه.', 'أضف خليط البيض إلى الأرز واسكبه في الطبق المجهز.', 'رشّ القرفة واخبز 35 إلى 40 دقيقة حتى يتماسك ويصبح ذهبيًا.', 'اتركه 10 دقائق قبل التقديم دافئًا أو باردًا.'],
  },
  nutrition: { calories: 320, protein: 10, carbs: 52, fat: 8 },
};

const CHICKEN_MATHLOUTHA: Recipe = {
  id: 'chicken-mathloutha',
  slug: 'chicken-mathloutha',
  foodLibraryDishId: '000b2d78-8a6e-4de2-ad35-3f1182dee8c7',
  imageUrl: '/images/recipes/chicken-mathloutha.webp',
  emoji: '🍗',
  title: { en: 'Chicken Mathloutha', ar: 'دجاج المثلوثة' },
  cuisine: { en: 'Emirati', ar: 'إماراتي' },
  description: {
    en: 'An Emirati one-pot chicken and rice dish scented with tomato, turmeric and warm spices.',
    ar: 'طبق إماراتي يجمع الدجاج والأرز في قدر واحد مع الطماطم والكركم والتوابل الدافئة.',
  },
  prepTime: { en: '55 min', ar: '55 دقيقة' },
  ingredients: {
    en: ['4 chicken thighs, skinless', '1 1/2 cups basmati rice', '1 onion, finely chopped', '2 tomatoes, diced', '2 tbsp tomato paste', '1 tsp ground turmeric', '1 tsp ground cumin', '1/2 tsp ground coriander', '4 cardamom pods', '2 tbsp olive oil', '1 3/4 cups chicken stock', 'Salt and black pepper to taste'],
    ar: ['4 أفخاذ دجاج منزوعة الجلد', 'كوب ونصف أرز بسمتي', 'بصلة مفرومة ناعمًا', 'طماطمتان مقطعتان', 'ملعقتان كبيرتان معجون طماطم', 'ملعقة صغيرة كركم', 'ملعقة صغيرة كمون', 'نصف ملعقة صغيرة كزبرة مطحونة', '4 حبات هيل', 'ملعقتان كبيرتان زيت زيتون', 'كوب وثلاثة أرباع مرق دجاج', 'ملح وفلفل أسود حسب الرغبة'],
  },
  instructions: {
    en: ['Rinse the rice until the water runs clear, then drain.', 'Heat the oil in a heavy pot and brown the chicken on both sides; set aside.', 'Soften the onion in the same pot, then add tomatoes, tomato paste and spices.', 'Return the chicken, add stock and bring to a gentle simmer.', 'Stir in the rice, cover and cook on low heat for 25 minutes.', 'Fluff with a fork, rest for 5 minutes and serve with lemon wedges.'],
    ar: ['اغسل الأرز حتى يصفو الماء ثم صفّه.', 'سخّن الزيت في قدر ثقيل وحمّر الدجاج من الجانبين ثم اتركه جانبًا.', 'أضف البصل إلى القدر حتى يلين ثم أضف الطماطم والمعجون والتوابل.', 'أعد الدجاج إلى القدر وأضف المرق واتركه يغلي برفق.', 'أضف الأرز وغطّه واطه على نار هادئة 25 دقيقة.', 'قلّب الأرز بالشوكة واتركه 5 دقائق ثم قدّمه مع شرائح الليمون.'],
  },
  nutrition: { calories: 480, protein: 38, carbs: 52, fat: 14 },
};

const CHICKEN_PIE_RWANDAN: Recipe = {
  id: 'chicken-pie-rwandan',
  slug: 'chicken-pie-rwandan',
  foodLibraryDishId: '000d4261-8c95-4451-98c3-930e56024568',
  imageUrl: '/images/recipes/chicken-pie-rwandan.webp',
  emoji: '🥧',
  title: { en: 'Chicken pie Rwandan', ar: 'فطيرة الدجاج الرواندية' },
  cuisine: { en: 'Rwandan', ar: 'رواندي' },
  description: {
    en: 'A flaky Rwandan-style chicken pie with a savory chicken, potato and vegetable filling.',
    ar: 'فطيرة رواندية بقشرة هشة وحشوة دجاج وبطاطس وخضار غنية بالنكهة.',
  },
  prepTime: { en: '1 hr 15 min', ar: '75 دقيقة' },
  ingredients: {
    en: ['2 sheets ready-rolled puff pastry', '2 cups cooked chicken, shredded', '1 potato, diced small', '1 carrot, diced', '1/2 cup frozen peas', '1 onion, chopped', '2 cloves garlic, minced', '1 tsp curry powder', '1/2 tsp dried thyme', '1/2 cup chicken stock', '1 egg, beaten for brushing', 'Salt and pepper to taste'],
    ar: ['ورقتان من عجينة البف باستري الجاهزة', 'كوبان دجاج مطبوخ مقطع', 'بطاطسة مقطعة صغيرًا', 'جزرة مقطعة', 'نصف كوب بازلاء مجمدة', 'بصلة مفرومة', 'فصان ثوم مفرومان', 'ملعقة صغيرة مسحوق كاري', 'نصف ملعقة صغيرة زعتر مجفف', 'نصف كوب مرق دجاج', 'بيضة مخفوفة للدهن', 'ملح وفلفل حسب الرغبة'],
  },
  instructions: {
    en: ['Heat the oven to 200°C (400°F) and line a baking tray.', 'Cook the potato and carrot in the stock until just tender, then drain.', 'Sauté the onion and garlic, then stir in chicken, vegetables, peas and spices.', 'Spoon the filling onto one pastry sheet and cover with the second sheet.', 'Seal the edges, cut a few slits on top and brush with beaten egg.', 'Bake for 30–35 minutes until deep golden and serve warm.'],
    ar: ['سخّن الفرن إلى 200 درجة مئوية وافرش صينية الخبز.', 'اطه البطاطس والجزر في المرق حتى تصبح طرية ثم صفّها.', 'قلّب البصل والثوم ثم أضف الدجاج والخضار والبازلاء والتوابل.', 'اسكب الحشوة على إحدى ورقتَي العجين وغطّها بالأخرى.', 'أغلق الأطراف واعمل شقوقًا في الأعلى وادهنها بالبيض.', 'اخبز 30 إلى 35 دقيقة حتى تصبح ذهبية داكنة وقدّمها دافئة.'],
  },
  nutrition: { calories: 520, protein: 32, carbs: 45, fat: 24 },
};

const GREEK_FASOLADA: Recipe = {
  id: 'greek-fasolada',
  slug: 'greek-fasolada-white-bean-soup',
  foodLibraryDishId: '000ef540-16db-416e-bf09-911a4fa0b551',
  imageUrl: '/images/recipes/greek-fasolada-white-bean-soup.webp',
  emoji: '🍲',
  title: { en: 'Greek Fasolada White Bean Soup', ar: 'شوربة الفاصوليا البيضاء اليونانية فاسولادا' },
  cuisine: { en: 'Greek', ar: 'يوناني' },
  description: {
    en: 'A hearty Greek white bean soup with tomato, celery and olive oil, finished with lemon.',
    ar: 'شوربة يونانية دسمة بالفاصوليا البيضاء والطماطم والكرفس وزيت الزيتون، تُقدَّم بعصير الليمون.',
  },
  prepTime: { en: '1 hr 20 min', ar: '80 دقيقة' },
  ingredients: {
    en: ['1 1/2 cups dried white beans, soaked overnight', '1 onion, finely chopped', '1 carrot, diced', '2 celery stalks, diced', '3 tbsp olive oil', '2 tbsp tomato paste', '4 cups vegetable stock', '1 bay leaf', '1 tsp dried oregano', '1 lemon, juiced', 'Salt and pepper to taste'],
    ar: ['كوب ونصف فاصوليا بيضاء مجففة منقوعة طوال الليل', 'بصلة مفرومة ناعمًا', 'جزرة مقطعة', 'عُودا كرفس مقطعان', '3 ملاعق كبيرة زيت زيتون', 'ملعقتان كبيرتان معجون طماطم', '4 أكواب مرق خضار', 'ورقة غار', 'ملعقة صغيرة أوريغانو مجفف', 'عصير ليمونة', 'ملح وفلفل حسب الرغبة'],
  },
  instructions: {
    en: ['Drain the soaked beans and rinse well.', 'Warm the olive oil in a pot and soften the onion, carrot and celery.', 'Stir in tomato paste and cook for one minute, then add beans and stock.', 'Add bay leaf and oregano, cover and simmer for about 55 minutes.', 'Season with salt only once the beans are tender, then simmer 10 minutes more.', 'Stir in lemon juice and serve with crusty bread.'],
    ar: ['صفّ الفاصوليا المنقوعة واغسلها جيدًا.', 'سخّن زيت الزيتون في قدر وأضف البصل والجزر والكرفس حتى تلين.', 'أضف معجون الطماطم وقلّب دقيقة ثم أضف الفاصوليا والمرق.', 'أضف ورقة الغار والأوريغانو وغطّ القدر واتركه يغلي نحو 55 دقيقة.', 'أضف الملح بعد تصبح الفاصوليا طرية ثم اتركها 10 دقائق إضافية.', 'أضف عصير الليمون وقدمها مع الخبز المقرمش.'],
  },
  nutrition: { calories: 290, protein: 14, carbs: 44, fat: 6 },
};

const ITALIAN_PASTA_FRESH_TOMATO_SAUCE: Recipe = {
  id: 'italian-pasta-with-fresh-tomato-sauce',
  slug: 'italian-pasta-with-fresh-tomato-sauce',
  foodLibraryDishId: '000a7ad4-16e9-49d1-9eef-6e3125b620ba',
  imageUrl: '/images/recipes/italian-pasta-with-fresh-tomato-sauce.webp',
  emoji: '🍝',
  title: { en: 'Italian Pasta with Fresh Tomato Sauce', ar: 'معكرونة إيطالية بصلصة الطماطم الطازجة' },
  cuisine: { en: 'Italian', ar: 'إيطالي' },
  description: {
    en: 'Simple Italian pasta tossed with a fresh tomato and garlic sauce, basil and olive oil.',
    ar: 'معكرونة إيطالية بسيطة مع صلصة طماطم طازجة بالثوم والريحان وزيت الزيتون.',
  },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['12 oz spaghetti or rigatoni', '4 ripe tomatoes, chopped', '3 cloves garlic, thinly sliced', '3 tbsp extra-virgin olive oil', '1 handful fresh basil leaves', '1/2 tsp chili flakes (optional)', 'Salt to taste', '2 tbsp grated Parmesan (optional)'],
    ar: ['340 غرام معكرونة إسباغيتي أو ريغاتوني', '4 طماطم ناضجة مفرومة', '3 فصوص ثوم مقطعة رقيقة', '3 ملاعق كبيرة زيت زيتون بكر ممتاز', 'حفنة أوراق ريحان طازجة', 'نصف ملعقة صغيرة رقائق فلفل (اختياري)', 'ملح حسب الرغبة', 'ملعقتان كبيرتان جبن بارميزان مبشور (اختياري)'],
  },
  instructions: {
    en: ['Bring a large pot of salted water to a boil and cook the pasta until al dente.', 'Meanwhile, warm the olive oil and gently sizzle the garlic without browning.', 'Add the tomatoes and chili flakes and cook for 10–12 minutes until saucy.', 'Tear in the basil and season with salt.', 'Drain the pasta, reserving a cup of cooking water, and toss with the sauce.', 'Loosen with a splash of pasta water and finish with Parmesan if using.'],
    ar: ['غلي كمية كبيرة من الماء المملح واسلق المعكرونة حتى تصبح أل دينتي.', 'في هذه الأثناء سخّن زيت الزيتون وأضف الثوم برفق دون أن يحمر.', 'أضف الطماطم ورقائق الفلفل واطه 10 إلى 12 دقيقة حتى تتكون الصلصة.', 'أضف أوراق الريحان المقطعة وتبّل بالملح.', 'صفّ المعكرونة مع الاحتفاظ بكوب من ماء السلق ثم قلّبها مع الصلصة.', 'أضف قليلًا من ماء المعكرونة ورشّ البارميزان عند الرغبة.'],
  },
  nutrition: { calories: 420, protein: 14, carbs: 68, fat: 9 },
};

const NITER_KIBE_BUTTER_AFRICAN: Recipe = {
  id: 'niter-kibe-butter-african',
  slug: 'niter-kibe-butter-african',
  foodLibraryDishId: '00194379-897e-44f6-a571-be6ecbd431d6',
  imageUrl: '/images/recipes/niter-kibe-butter-african.webp',
  emoji: '🧈',
  title: { en: 'Niter kibe butter African', ar: 'زبدة نتر كيب الأفريقية' },
  cuisine: { en: 'African', ar: 'أفريقي' },
  description: {
    en: 'A gently spiced clarified butter infused with onion, garlic, ginger and warming aromatics.',
    ar: 'زبدة مصفاة متبلة برفق مع البصل والثوم والزنجبيل والتوابل الدافئة.',
  },
  prepTime: { en: '30 min', ar: '30 دقيقة' },
  ingredients: {
    en: ['250 g unsalted butter', '2 tbsp ghee or clarified butter', '1 small onion, grated', '2 cloves garlic, crushed', '1 tsp fresh ginger, grated', '1/2 tsp ground turmeric', '1/4 tsp ground cardamom', '1/4 tsp ground cinnamon', '1/4 tsp ground cloves', '1/4 tsp fenugreek seeds', '1/2 tsp black peppercorns', '1/2 tsp salt'],
    ar: ['250 غرام زبدة غير مملحة', 'ملعقتان كبيرتان سمن أو زبدة مصفاة', 'بصلة صغيرة مبشورة', 'فصان ثوم مهروسان', 'ملعقة صغيرة زنجبيل طازج مبشور', 'نصف ملعقة صغيرة كركم', 'ربع ملعقة صغيرة هيل مطحون', 'ربع ملعقة صغيرة قرفة مطحونة', 'ربع ملعقة صغيرة قرنفل مطحون', 'ربع ملعقة صغيرة بذور حلبة', 'نصف ملعقة صغيرة حبوب فلفل أسود', 'نصف ملعقة صغيرة ملح'],
  },
  instructions: {
    en: ['Melt the butter with the ghee in a small saucepan over low heat.', 'Add the grated onion, garlic and ginger and cook gently for 5 minutes.', 'Stir in all the spices and salt, then simmer very gently for 15 minutes.', 'Let the solids settle and skim off any foam from the surface.', 'Strain through a fine sieve into a clean jar, discarding the solids.', 'Cool completely, seal and store in the refrigerator for up to one month.'],
    ar: ['ذوّب الزبدة مع السمن في قدر صغير على نار هادئة.', 'أضف البصل المبشور والثوم والزنجبيل واطه برفق 5 دقائق.', 'أضف جميع التوابل والملح ثم اتركها تغلي برفق 15 دقيقة.', 'اترك الرواسب تترقرق وأزل أي رغوة من السطح.', 'صفِّ الخليط عبر منخل ناعم في برطمان نظيف وتخلص من الرواسب.', 'اتركه يبرد تمامًا وأغلقه واحفظه في الثلاجة حتى شهر.'],
  },
  nutrition: { calories: 120, protein: 0, carbs: 0, fat: 13 },
};

const PUMPKIN_SALAD: Recipe = {
  id: 'pumpkin-salad',
  slug: 'pumpkin-salad',
  foodLibraryDishId: '00068af1-5832-48e8-bf81-9154fb12d825',
  imageUrl: '/images/recipes/pumpkin-salad.webp',
  emoji: '🥗',
  title: { en: 'Pumpkin salad', ar: 'سلطة القرع' },
  cuisine: { en: 'Syrian', ar: 'سوري' },
  description: {
    en: 'A bright Syrian-style pumpkin salad with lemon, cumin, parsley and a drizzle of olive oil.',
    ar: 'سلطة قرع سورية منعشة بالليمون والكمون والبقدونس ورشة زيت زيتون.',
  },
  prepTime: { en: '35 min', ar: '35 دقيقة' },
  ingredients: {
    en: ['500 g pumpkin, peeled and cubed', '2 tbsp olive oil', '1 small onion, thinly sliced', '1 lemon, juiced', '1 tsp ground cumin', '1/4 cup chopped parsley', '1/2 tsp sumac (optional)', 'Salt and black pepper to taste'],
    ar: ['500 غرام قرع مقشور ومقطع مكعبات', 'ملعقتان كبيرتان زيت زيتون', 'بصلة صغيرة مقطعة رقيقة', 'عصير ليمونة', 'ملعقة صغيرة كمون مطحون', 'ربع كوب بقدونس مفروم', 'نصف ملعقة صغيرة سماق (اختياري)', 'ملح وفلفل أسود حسب الرغبة'],
  },
  instructions: {
    en: ['Heat the oven to 200°C (400°F) and line a tray.', 'Toss the pumpkin with half the oil, cumin, salt and pepper.', 'Spread on the tray and roast for 20–25 minutes until tender and lightly browned.', 'Whisk the remaining oil with lemon juice and sumac.', 'Combine the warm pumpkin with onion and parsley.', 'Pour over the dressing, toss gently and serve warm or at room temperature.'],
    ar: ['سخّن الفرن إلى 200 درجة مئوية وافرش صينية.', 'قلّب القرع مع نصف الزيت والكمون والملح والفلفل.', 'افرده في الصينية واشويه 20 إلى 25 دقيقة حتى يصبح طريًا ومحمّرًا قليلًا.', 'اخلط ما تبقى من الزيت مع عصير الليمون والسماق.', 'امزج القرع الدافئ مع البصل والبقدونس.', 'اسكب الصلصة وقلّب برفق ثم قدّمه دافئًا أو بدرجة حرارة الغرفة.'],
  },
  nutrition: { calories: 180, protein: 4, carbs: 24, fat: 8 },
};

const PUTTU_INDIAN: Recipe = {
  id: 'puttu-indian',
  slug: 'puttu-indian',
  foodLibraryDishId: '000722e1-d5bb-4dbf-869a-b2e9fd904d48',
  imageUrl: '/images/recipes/puttu-indian.webp',
  emoji: '🥥',
  title: { en: 'Puttu Indian', ar: 'بوتو هندي' },
  cuisine: { en: 'Indian', ar: 'هندي' },
  description: {
    en: 'Steamed rice flour and coconut layers, a simple South Indian breakfast served with curry or banana.',
    ar: 'طبقات من دقيق الأرز وجوز الهند المطهوة بالبخار، إفطار هندي بسيط يُقدّم مع الكاري أو الموز.',
  },
  prepTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: ['2 cups rice flour', '1 cup freshly grated coconut', '1/2 tsp salt', '1/4 tsp cardamom powder (optional)', 'Water as needed', '1 banana, sliced (to serve)', '2 tbsp coconut oil (optional)'],
    ar: ['كوبان دقيق أرز', 'كوب جوز هند مبشور طازج', 'نصف ملعقة صغيرة ملح', 'ربع ملعقة صغيرة مسحوق هيل (اختياري)', 'ماء حسب الحاجة', 'موزة مقطعة للتقديم', 'ملعقتان كبيرتان زيت جوز الهند (اختياري)'],
  },
  instructions: {
    en: ['Mix the rice flour with salt and a little water until it holds together loosely.', 'Fold in the grated coconut and cardamom powder.', 'Fill a puttu maker or steamer mould with alternating layers of flour and coconut.', 'Steam for 8–10 minutes until the layers are set and fragrant.', 'Turn the puttu out onto a plate and drizzle with coconut oil if desired.', 'Serve warm with sliced banana or a vegetable curry.'],
    ar: ['اخلط دقيق الأرز مع الملح وقليل من الماء حتى يتماسك برفق.', 'أضف جوز الهند المبشور ومسحوق الهيل.', 'املأ قالب البوتو أو قدر البخار بطبقات متناوبة من الدقيق وجوز الهند.', 'اطه بالبخار 8 إلى 10 دقائق حتى تتماسك الطبقات وتفوح رائحتها.', 'اقلب البوتو على طبق ورشّه بزيت جوز الهند عند الرغبة.', 'قدّمه دافئًا مع شرائح الموز أو كاري الخضار.'],
  },
  nutrition: { calories: 260, protein: 5, carbs: 46, fat: 6 },
};

const RICE_WITH_BEANS_RWANDAN: Recipe = {
  id: 'rice-with-beans-rwandan',
  slug: 'rice-with-beans-rwandan',
  foodLibraryDishId: '000fe281-b3dc-4c67-b48e-36b5244db6fc',
  imageUrl: '/images/recipes/rice-with-beans-rwandan.webp',
  emoji: '🍚',
  title: { en: 'Rice with beans Rwandan', ar: 'الأرز بالفاصوليا الرواندي' },
  cuisine: { en: 'Rwandan', ar: 'رواندي' },
  description: {
    en: 'A comforting Rwandan plate of fluffy rice and tender beans cooked with tomato and spices.',
    ar: 'طبق رواندي مريح يجمع الأرز الهش والفاصوليا الطرية مع الطماطم والتوابل.',
  },
  prepTime: { en: '45 min', ar: '45 دقيقة' },
  ingredients: {
    en: ['1 1/2 cups rice', '1 cup cooked kidney beans', '1 onion, chopped', '2 tomatoes, diced', '3 tbsp vegetable oil', '2 cloves garlic, minced', '1 tsp ground cumin', '1/2 tsp ground coriander', '2 cups vegetable stock', 'Salt and pepper to taste'],
    ar: ['كوب ونصف أرز', 'كوب فاصوليا حمراء مطبوخة', 'بصلة مفرومة', 'طماطمتان مقطعتان', '3 ملاعق كبيرة زيت نباتي', 'فصان ثوم مفرومان', 'ملعقة صغيرة كمون مطحون', 'نصف ملعقة صغيرة كزبرة مطحونة', 'كوبان مرق خضار', 'ملح وفلفل حسب الرغبة'],
  },
  instructions: {
    en: ['Rinse the rice until the water runs clear, then drain.', 'Heat the oil in a pot and soften the onion and garlic.', 'Add tomatoes and spices and cook for 5 minutes until thickened.', 'Stir in the beans and stock, then add the rice.', 'Cover and simmer on low heat for 20–25 minutes until the rice is tender.', 'Fluff with a fork, season and serve warm.'],
    ar: ['اغسل الأرز حتى يصفو الماء ثم صفّه.', 'سخّن الزيت في قدر وأضف البصل والثوم حتى يلينا.', 'أضف الطماطم والتوابل واطه 5 دقائق حتى تتكاثف.', 'أضف الفاصوليا والمرق ثم الأرز.', 'غطّ القدر واتركه على نار هادئة 20 إلى 25 دقيقة حتى يصبح الأرز طريًا.', 'قلّبه بالشوكة وتبّله وقدمه دافئًا.'],
  },
  nutrition: { calories: 410, protein: 14, carbs: 72, fat: 7 },
};

const SEVILLIAN_BEAN_AND_VEGETABLE_STEW: Recipe = {
  id: 'sevillian-bean-and-vegetable-stew',
  slug: 'sevillian-bean-and-vegetable-stew',
  foodLibraryDishId: '001400e3-b7c9-4787-86af-56c901ff42d7',
  imageUrl: '/images/recipes/sevillian-bean-and-vegetable-stew.webp',
  emoji: '🫘',
  title: { en: 'Sevillian Bean and Vegetable Stew', ar: 'يخنة الفاصوليا والخضار الإشبيلية' },
  cuisine: { en: 'Spanish', ar: 'إسباني' },
  description: {
    en: 'A rustic Seville-style stew of white beans, green beans and vegetables with smoked paprika.',
    ar: 'يخنة ريفية على طريقة إشبيلية بالفاصوليا البيضاء والفاصوليا الخضراء والخضار والبابريكا المدخنة.',
  },
  prepTime: { en: '1 hr 10 min', ar: '70 دقيقة' },
  ingredients: {
    en: ['1 1/2 cups dried white beans, soaked overnight', '1 onion, chopped', '3 cloves garlic, minced', '1 carrot, sliced', '1 potato, cubed', '1 cup green beans, trimmed', '2 tomatoes, grated', '3 tbsp olive oil', '1 tsp smoked paprika', '1 bay leaf', '3 cups vegetable stock', 'Salt to taste'],
    ar: ['كوب ونصف فاصوليا بيضاء مجففة منقوعة طوال الليل', 'بصلة مفرومة', '3 فصوص ثوم مفرومان', 'جزرة مقطعة', 'بطاطسة مكعبة', 'كوب فاصوليا خضراء مقلوبة الأطراف', 'طماطمتان مبشورتان', '3 ملاعق كبيرة زيت زيتون', 'ملعقة صغيرة بابريكا مدخنة', 'ورقة غار', '3 أكواب مرق خضار', 'ملح حسب الرغبة'],
  },
  instructions: {
    en: ['Drain and rinse the soaked beans.', 'Warm the olive oil in a pot and soften the onion and garlic.', 'Add grated tomato and smoked paprika and cook for 3 minutes.', 'Add beans, carrot, potato, green beans, bay leaf and stock.', 'Simmer gently for 50 minutes, stirring occasionally, until the beans are tender.', 'Season with salt, discard the bay leaf and serve with crusty bread.'],
    ar: ['صفّ الفاصوليا المنقوعة واغسلها.', 'سخّن زيت الزيتون في قدر وأضف البصل والثوم حتى يلينا.', 'أضف الطماطم المبشورة والبابريكا المدخنة واطه 3 دقائق.', 'أضف الفاصوليا والجزر والبطاطس والفاصوليا الخضراء وورقة الغار والمرق.', 'اتركها تغلي برفق 50 دقيقة مع التحريك من حين لآخر حتى تصبح الفاصوليا طرية.', 'تبّل بالملح وأزل ورقة الغار وقدمها مع الخبز المقرمش.'],
  },
  nutrition: { calories: 300, protein: 13, carbs: 46, fat: 7 },
};

const ARDENNES_CREAMY_POTATO_GRATIN: Recipe = {
  id: 'ardennes-creamy-potato-gratin',
  slug: 'ardennes-creamy-potato-gratin',
  foodLibraryDishId: '002f3fdf-3efe-45a4-9f64-7587e1be9bcd',
  imageUrl: '/images/recipes/ardennes-creamy-potato-gratin.webp',
  emoji: '🥔',
  title: { en: 'Ardennes Creamy Potato Gratin', ar: 'مطابخ الأردين غراتان البطاطس بالكريمة أرديني' },
  cuisine: { en: 'Ardennes', ar: 'أرديني' },
  description: {
    en: 'Thinly sliced potatoes baked with cream, garlic and nutty Emmental until tender and golden.',
    ar: 'شرائح بطاطس رقيقة تُخبز مع الكريمة والثوم وجبن إمنتال حتى تصبح طرية وذهبية.',
  },
  prepTime: { en: '1 hr 15 min', ar: '75 دقيقة' },
  ingredients: {
    en: ['1.5 kg waxy potatoes, thinly sliced', '2 cups heavy cream', '1 cup milk', '2 cloves garlic, minced', '1 cup grated Emmental cheese', '1 tbsp butter for the dish', '1/2 tsp ground nutmeg', 'Salt and white pepper to taste'],
    ar: ['كيلو ونصف بطاطس نشوية مقطعة شرائح رقيقة', 'كوبان كريمة ثقيلة', 'كوب حليب', 'فصان ثوم مفرومان', 'كوب جبن إمنتال مبشور', 'ملعقة كبيرة زبدة للطبق', 'نصف ملعقة صغيرة جوز الطيب المطحون', 'ملح وفلفل أبيض حسب الرغبة'],
  },
  instructions: {
    en: ['Heat the oven to 190°C (375°F) and butter a large baking dish.', 'Layer the potato slices in the dish, overlapping them slightly.', 'Warm the cream with milk, garlic, nutmeg, salt and pepper, then pour evenly over the potatoes.', 'Scatter the cheese on top and cover the dish with foil.', 'Bake for 45 minutes, then remove the foil and bake 20–25 minutes more until golden and tender.', 'Rest for 10 minutes before serving.'],
    ar: ['سخّن الفرن إلى 190 درجة مئوية وادهن طبق خبز كبيرًا بالزبدة.', 'رتّب شرائح البطاطس في الطبق مع تراكبها قليلًا.', 'سخّن الكريمة مع الحليب والثوم وجوز الطيب والملح والفلفل ثم اسكبها بالتساوي فوق البطاطس.', 'رشّ الجبن في الأعلى وغطّ الطبق بورق القصدير.', 'اخبز 45 دقيقة ثم أزل القصدير واخبز 20 إلى 25 دقيقة إضافية حتى يصبح ذهبيًا وطريًا.', 'اتركه 10 دقائق قبل التقديم.'],
  },
  nutrition: { calories: 420, protein: 12, carbs: 46, fat: 21 },
};

const BENELUX_COUQUE_DE_DINANT: Recipe = {
  id: 'benelux-couque-de-dinant-honey-biscuit',
  slug: 'benelux-couque-de-dinant-honey-biscuit',
  foodLibraryDishId: '0032a8c0-3020-404f-a009-61e6f5ce5c0e',
  imageUrl: '/images/recipes/benelux-couque-de-dinant-honey-biscuit.webp',
  emoji: '🍪',
  title: { en: 'Benelux Couque de Dinant Honey Biscuit', ar: 'بسكويت العسل الصلب بنيلوكسي' },
  cuisine: { en: 'Benelux', ar: 'بنلوكسي' },
  description: {
    en: 'A firm, honey-sweetened biscuit from Dinant with a crisp snap and warm spice.',
    ar: 'بسكويت صلب محلى بالعسل من دينان بقوام مقرمش ونكهة توابل دافئة.',
  },
  prepTime: { en: '45 min', ar: '45 دقيقة' },
  ingredients: {
    en: ['2 cups all-purpose flour', '1/2 cup honey', '1/3 cup brown sugar', '1/4 cup butter, softened', '1 egg', '1 tsp baking powder', '1/2 tsp ground cinnamon', '1/4 tsp ground cloves', 'Pinch of salt'],
    ar: ['كوبان دقيق متعدد الأغراض', 'نصف كوب عسل', 'ثلث كوب سكر بني', 'ربع كوب زبدة طرية', 'بيضة', 'ملعقة صغيرة بيكنغ بودر', 'نصف ملعقة صغيرة قرفة مطحونة', 'ربع ملعقة صغيرة قرنفل مطحون', 'رشة ملح'],
  },
  instructions: {
    en: ['Heat the oven to 180°C (350°F) and line a baking sheet.', 'Mix the flour, baking powder, cinnamon, cloves and salt.', 'Beat the butter, brown sugar and honey until creamy, then add the egg.', 'Stir in the dry ingredients to form a firm dough and rest for 10 minutes.', 'Roll out to 1 cm thick, cut into shapes and place on the sheet.', 'Bake for 18–20 minutes until firm, then cool completely before storing.'],
    ar: ['سخّن الفرن إلى 180 درجة مئوية وافرش صينية الخبز.', 'اخلط الدقيق والبيكنغ بودر والقرفة والقرنفل والملح.', 'اخفق الزبدة والسكر البني والعسل حتى تصبح كريمية ثم أضف البيضة.', 'أضف المكونات الجافة لتكوين عجينة صلبة واتركها 10 دقائق.', 'افرد العجينة بسماكة سنتيمتر وقطّعها إلى أشكال ثم ضعها في الصينية.', 'اخبز 18 إلى 20 دقيقة حتى تصبح صلبة ثم اتركها تبرد تمامًا قبل حفظها.'],
  },
  nutrition: { calories: 190, protein: 3, carbs: 37, fat: 3 },
};

const DRIED_POLLACK_SOUP_WITH_RICE: Recipe = {
  id: 'dried-pollack-soup-with-rice',
  slug: 'dried-pollack-soup-with-rice',
  foodLibraryDishId: '00266d3e-695a-41b4-83a9-5b837600a49d',
  imageUrl: '/images/recipes/dried-pollack-soup-with-rice.webp',
  emoji: '🍲',
  title: { en: 'Dried pollack soup with rice', ar: 'حساء سمك القد المجفف مع الأرز كوري أصيل' },
  cuisine: { en: 'Korean', ar: 'كوري' },
  description: {
    en: 'A comforting Korean breakfast soup with dried pollack, rice, radish and a clean savory broth.',
    ar: 'حساء إفطار كوري مريح بسمك القد المجفف والأرز والفجل ومرق غني بالنكهة.',
  },
  prepTime: { en: '50 min', ar: '50 دقيقة' },
  ingredients: {
    en: ['100 g dried pollack, soaked 20 minutes', '1 cup cooked rice', '4 cups water', '1/2 Korean radish, sliced', '2 cloves garlic, minced', '1 tbsp fish sauce', '1 tsp sesame oil', '1 scallion, sliced', 'Salt to taste'],
    ar: ['100 غرام سمك قد مجفف منقوع 20 دقيقة', 'كوب أرز مطبوخ', '4 أكواب ماء', 'نصف فجل كوري مقطع', 'فصان ثوم مفرومان', 'ملعقة كبيرة صلصة سمك', 'ملعقة صغيرة زيت السمسم', 'بصلة خضراء مقطعة', 'ملح حسب الرغبة'],
  },
  instructions: {
    en: ['Soak the dried pollack in warm water, then rinse and cut into pieces.', 'Bring the water to a boil with the radish and garlic and simmer for 15 minutes.', 'Add the pollack and simmer gently for 10 minutes until it flakes easily.', 'Stir in the cooked rice and fish sauce and season with salt.', 'Turn off the heat, drizzle with sesame oil and top with scallion.', 'Serve hot as a light but filling meal.'],
    ar: ['انقع سمك القد المجفف في ماء دافئ ثم اغسله وقطّعه إلى قطع.', 'غلي الماء مع الفجل والثوم واتركه يغلي 15 دقيقة.', 'أضف السمك واتركه يغلي برفق 10 دقائق حتى يتفتت بسهولة.', 'أضف الأرز المطبوخ وصلصة السمك وتبّل بالملح.', 'أطفئ النار ورشّ زيت السمسم والبصل الأخضر.', 'قدّمه ساخنًا كوجبة خفيفة ومشبعة.'],
  },
  nutrition: { calories: 260, protein: 28, carbs: 24, fat: 4 },
};

const ESTONIAN_BARLEY_MUSHROOM_PORRIDGE: Recipe = {
  id: 'estonian-barley-mushroom-porridge',
  slug: 'estonian-barley-mushroom-porridge',
  foodLibraryDishId: '0027826c-dc62-4658-8b9c-0bb6efcf4cbf',
  imageUrl: '/images/recipes/estonian-barley-mushroom-porridge.webp',
  emoji: '🥣',
  title: { en: 'Estonian Barley Mushroom Porridge', ar: 'عصيدة الشعير الإستونية بالفطر' },
  cuisine: { en: 'Estonian', ar: 'إستوني' },
  description: {
    en: 'Creamy pearl barley porridge with mushrooms, onion and a touch of butter.',
    ar: 'عصيدة شعير كريمية بالفطر والبصل ولمسة من الزبدة.',
  },
  prepTime: { en: '1 hr', ar: '60 دقيقة' },
  ingredients: {
    en: ['1 cup pearl barley, rinsed', '3 cups vegetable stock', '250 g mushrooms, sliced', '1 onion, chopped', '2 tbsp butter', '1/2 cup milk or cream', '1 tsp dried thyme', 'Salt and pepper to taste'],
    ar: ['كوب شعير لؤلؤي مغسول', '3 أكواب مرق خضار', '250 غرام فطر مقطع', 'بصلة مفرومة', 'ملعقتان كبيرتان زبدة', 'نصف كوب حليب أو كريمة', 'ملعقة صغيرة زعتر مجفف', 'ملح وفلفل حسب الرغبة'],
  },
  instructions: {
    en: ['Simmer the barley in the stock for about 40 minutes until tender.', 'Melt the butter in a skillet and cook the onion until soft.', 'Add the mushrooms and thyme and cook until the mushrooms release and absorb their liquid.', 'Stir the mushroom mixture into the barley and add the milk or cream.', 'Season with salt and pepper and simmer for 5 more minutes.', 'Serve warm in shallow bowls.'],
    ar: ['اترك الشعير يغلي في المرق نحو 40 دقيقة حتى يصبح طريًا.', 'ذوّب الزبدة في مقلاة وأضف البصل حتى يلين.', 'أضف الفطر والزعتر واطه حتى يطلق الفطر سائله ثم يمتصه.', 'قلّب خليط الفطر مع الشعير وأضف الحليب أو الكريمة.', 'تبّل بالملح والفلفل واتركه يغلي 5 دقائق إضافية.', 'قدّمه دافئًا في أطباق مسطحة.'],
  },
  nutrition: { calories: 380, protein: 14, carbs: 58, fat: 10 },
};

const LABNEH_WITH_GARLIC_AND_MINT: Recipe = {
  id: 'labneh-with-garlic-and-mint',
  slug: 'labneh-with-garlic-and-mint',
  foodLibraryDishId: '001edee8-75f9-446e-9b23-670c228bc6c1',
  imageUrl: '/images/recipes/labneh-with-garlic-and-mint.webp',
  emoji: '🥣',
  title: { en: 'Labneh with garlic and mint', ar: 'لبنة بالثوم والنعناع' },
  cuisine: { en: 'Syrian', ar: 'سوري' },
  description: {
    en: 'Strained yogurt labneh topped with garlic, dried mint and olive oil.',
    ar: 'لبنة مصفاة مع الثوم والنعناع المجفف وزيت الزيتون.',
  },
  prepTime: { en: '20 min + straining', ar: '20 دقيقة + تصفيف' },
  ingredients: {
    en: ['2 cups thick Greek yogurt', '1 clove garlic, finely grated', '1 tsp dried mint', '2 tbsp olive oil', '1/2 tsp salt', '1 tbsp lemon juice', 'Warm pita bread to serve'],
    ar: ['كوبان لبن يوناني كثيف', 'فص ثوم مبشور ناعمًا', 'ملعقة صغيرة نعناع مجفف', 'ملعقتان كبيرتان زيت زيتون', 'نصف ملعقة صغيرة ملح', 'ملعقة كبيرة عصير ليمون', 'خبز بيتا دافئ للتقديم'],
  },
  instructions: {
    en: ['Mix the yogurt with salt and lemon juice.', 'Spoon into a cheesecloth-lined sieve and refrigerate for 6–8 hours to thicken.', 'Stir the grated garlic and dried mint into the strained labneh.', 'Shape into a bowl or roll into small balls.', 'Drizzle with olive oil and serve with warm pita bread.'],
    ar: ['اخلط اللبن مع الملح وعصير الليمون.', 'اسكبه في منخل مبطن بقطعة قماش واتركه في الثلاجة 6 إلى 8 ساعات حتى يتكاثف.', 'أضف الثوم المبشور والنعناع المجفف إلى اللبنة المصفاة.', 'شكّلها في وعاء أو كرات صغيرة.', 'رشّها بزيت الزيتون وقدمها مع خبز البيتا الدافئ.'],
  },
  nutrition: { calories: 130, protein: 6, carbs: 5, fat: 6 },
};

const MAKROUD_WITH_ALMONDS: Recipe = {
  id: 'makroud-with-almonds',
  slug: 'makroud-with-almonds',
  foodLibraryDishId: '0023143c-fdfc-4acf-8c74-f8f4a076d95e',
  imageUrl: '/images/recipes/makroud-with-almonds.webp',
  emoji: '🍪',
  title: { en: 'Makroud with Almonds', ar: 'مقروط باللوز' },
  cuisine: { en: 'Algerian', ar: 'جزائري' },
  description: {
    en: 'Semolina pastries filled with almonds and honey, scented with orange blossom.',
    ar: 'معجنات السميد المحشوة باللوز والعسل بنكهة ماء الزهر.',
  },
  prepTime: { en: '1 hr 20 min', ar: '80 دقيقة' },
  ingredients: {
    en: ['2 cups fine semolina', '1/2 cup melted butter', '1/3 cup warm water', '1 cup ground almonds', '1/3 cup honey', '1 tsp orange blossom water', '1/2 tsp ground cinnamon', 'Sesame seeds for topping'],
    ar: ['كوبان سميد ناعم', 'نصف كوب زبدة مذابة', 'ثلث كوب ماء دافئ', 'كوب لوز مطحون', 'ثلث كوب عسل', 'ملعقة صغيرة ماء زهر', 'نصف ملعقة صغيرة قرفة مطحونة', 'بذور سمسم للوجه'],
  },
  instructions: {
    en: ['Mix semolina with melted butter and warm water to form a soft dough.', 'Combine ground almonds, honey, cinnamon and orange blossom water for the filling.', 'Roll the dough into small logs, flatten and add a spoonful of filling.', 'Fold the dough around the filling, seal and gently cut into diamond shapes.', 'Place on a lined tray, sprinkle with sesame seeds and bake at 180°C (350°F) for 25–30 minutes.', 'Brush with a little warm honey after baking and cool before serving.'],
    ar: ['اخلط السميد مع الزبدة المذابة والماء الدافئ لتكوين عجينة طرية.', 'امزج اللوز المطحون مع العسل والقرفة وماء الزهر للحشوة.', 'شكّل العجينة أسطوانات صغيرة وافردها ثم أضف ملعقة من الحشوة.', 'أغلق العجينة حول الحشوة وقطّعها برفق إلى معينات.', 'ضعها في صينية مبطنة ورشّها بالسمسم واخبزها على 180 درجة مئوية 25 إلى 30 دقيقة.', 'ادهنها بقليل من العسل الدافئ بعد الخبز واتركها تبرد قبل التقديم.'],
  },
  nutrition: { calories: 90, protein: 1, carbs: 14, fat: 3 },
};

const ONION_GRILLED_CHICKEN: Recipe = {
  id: 'onion-grilled-chicken',
  slug: 'onion-grilled-chicken',
  foodLibraryDishId: '0028b6e6-a902-401c-93f9-2f3273b2e655',
  imageUrl: '/images/recipes/onion-grilled-chicken.webp',
  emoji: '🍗',
  title: { en: 'Onion grilled chicken', ar: 'غا نونغ بالبصل فيتنامي أصيل' },
  cuisine: { en: 'Vietnamese', ar: 'فيتنامي' },
  description: {
    en: 'Vietnamese-style grilled chicken with onions, lemongrass and a savory fish sauce marinade.',
    ar: 'دجاج مشوي على الطريقة الفيتنامية مع البصل والليمون العشبي وصلصة السمك.',
  },
  prepTime: { en: '40 min + marinating', ar: '40 دقيقة + تتبيل' },
  ingredients: {
    en: ['4 boneless chicken thighs', '1 large onion, cut into wedges', '2 tbsp fish sauce', '1 tbsp soy sauce', '1 tbsp honey', '1 stalk lemongrass, minced', '2 cloves garlic, minced', '1 tbsp vegetable oil', 'Black pepper to taste'],
    ar: ['4 أفخاذ دجاج منزوعة العظم', 'بصلة كبيرة مقطعة إلى أجزاء', 'ملعقتان كبيرتان صلصة سمك', 'ملعقة كبيرة صلصة صويا', 'ملعقة كبيرة عسل', 'عير ليمون عشبي مفروم', 'فصان ثوم مفرومان', 'ملعقة كبيرة زيت نباتي', 'فلفل أسود حسب الرغبة'],
  },
  instructions: {
    en: ['Mix fish sauce, soy sauce, honey, lemongrass, garlic, oil and pepper.', 'Coat the chicken in the marinade and refrigerate for at least 30 minutes.', 'Thread the chicken and onion wedges onto skewers.', 'Grill over medium heat for 6–8 minutes per side, basting with the remaining marinade.', 'Cook until the chicken is charred at the edges and reaches a safe internal temperature.', 'Serve with steamed rice and a fresh cucumber salad.'],
    ar: ['اخلط صلصة السمك وصلصة الصويا والعسل والليمون العشبي والثوم والزيت والفلفل.', 'غطّ الدجاج بالتتبيل وضعه في الثلاجة 30 دقيقة على الأقل.', 'ضع الدجاج وقطع البصل في أسياخ.', 'اشوي على حرارة متوسطة 6 إلى 8 دقائق لكل جانب مع دهنها ببقية التتبيل.', 'استمر حتى يحمرّ الدجاج ويصل إلى درجة حرارة داخلية آمنة.', 'قدّمه مع الأرز المطهو بالبخار وسلطة الخيار الطازجة.'],
  },
  nutrition: { calories: 330, protein: 42, carbs: 4, fat: 16 },
};

const RICE_WITH_MINCED_MEAT_AND_PINE_NUTS: Recipe = {
  id: 'rice-with-minced-meat-and-pine-nuts',
  slug: 'rice-with-minced-meat-and-pine-nuts',
  foodLibraryDishId: '0022320b-0a66-40fc-b7f2-33f95486fce3',
  imageUrl: '/images/recipes/rice-with-minced-meat-and-pine-nuts.webp',
  emoji: '🍚',
  title: { en: 'Rice with Minced Meat and Pine Nuts', ar: 'رز باللحم المفروم والصنوبر' },
  cuisine: { en: 'Lebanese', ar: 'لبناني' },
  description: {
    en: 'Fragrant basmati rice layered with spiced minced meat, pine nuts and onions.',
    ar: 'أرز بسمتي عطري مع اللحم المفروم المتبل والصنوبر والبصل.',
  },
  prepTime: { en: '50 min', ar: '50 دقيقة' },
  ingredients: {
    en: ['2 cups basmati rice', '300 g ground beef or lamb', '1 onion, finely chopped', '1/4 cup pine nuts', '2 tbsp olive oil', '1 tsp ground allspice', '1/2 tsp ground cinnamon', '2 cups beef stock', 'Salt and pepper to taste'],
    ar: ['كوبان أرز بسمتي', '300 غرام لحم مفروم', 'بصلة مفرومة ناعمًا', 'ربع كوب صنوبر', 'ملعقتان كبيرتان زيت زيتون', 'ملعقة صغيرة بهار مطحون', 'نصف ملعقة صغيرة قرفة مطحونة', 'كوبان مرق لحم', 'ملح وفلفل حسب الرغبة'],
  },
  instructions: {
    en: ['Rinse the rice until the water runs clear and drain.', 'Toast the pine nuts in oil until golden, then remove and set aside.', 'Cook the onion in the same oil until soft, then add the minced meat and spices.', 'Add the stock and bring to a gentle boil.', 'Stir in the rice, cover and simmer on low heat for 20 minutes.', 'Fluff with a fork, scatter with pine nuts and serve warm.'],
    ar: ['اغسل الأرز حتى يصفو الماء ثم صفّه.', 'حمّص الصنوبر في الزيت حتى يصبح ذهبيًا ثم أخرجه واتركه جانبًا.', 'اطه البصل في الزيت نفسه حتى يلين ثم أضف اللحم المفروم والتوابل.', 'أضف المرق واتركه يغلي برفق.', 'أضف الأرز وغطّه واتركه على نار هادئة 20 دقيقة.', 'قلّبه بالشوكة ورشّ الصنوبر وقدمه دافئًا.'],
  },
  nutrition: { calories: 480, protein: 15, carbs: 70, fat: 15 },
};

const SPICY_MEATBALLS: Recipe = {
  id: 'spicy-meatballs',
  slug: 'spicy-meatballs',
  foodLibraryDishId: '00233ff2-7140-4d3a-8d87-2482816bbc36',
  imageUrl: '/images/recipes/spicy-meatballs.webp',
  emoji: '🍢',
  title: { en: 'Spicy meatballs', ar: 'كرات اللحم الحار تايوان أصيل' },
  cuisine: { en: 'Taiwanese', ar: 'تايواني' },
  description: {
    en: 'Juicy Taiwanese-style meatballs with chili, garlic and a glossy spicy sauce.',
    ar: 'كرات لحم تايوانية غنية العصير بالفلفل الحار والثوم وصلصة لامعة حارة.',
  },
  prepTime: { en: '45 min', ar: '45 دقيقة' },
  ingredients: {
    en: ['500 g ground pork', '1 egg', '1/3 cup breadcrumbs', '3 cloves garlic, minced', '1 tbsp chili paste', '1 tbsp soy sauce', '1 tsp five-spice powder', '2 tbsp vegetable oil', '2 scallions, sliced'],
    ar: ['500 غرام لحم خنزير مفروم', 'بيضة', 'ثلث كوب فتات خبز', '3 فصوص ثوم مفرومة', 'ملعقة كبيرة معجون فلفل حار', 'ملعقة كبيرة صلصة صويا', 'ملعقة صغيرة توابل خماسية', 'ملعقتان كبيرتان زيت نباتي', 'بصلتان خضراوان مقطعتان'],
  },
  instructions: {
    en: ['Mix the pork with egg, breadcrumbs, garlic, chili paste, soy sauce and five-spice.', 'Shape the mixture into walnut-sized meatballs.', 'Heat the oil in a skillet and pan-fry the meatballs until browned on all sides.', 'Add a splash of water, cover and steam for 5 minutes until cooked through.', 'Uncover and toss until the sauce glazes the meatballs.', 'Garnish with sliced scallions and serve with steamed rice.'],
    ar: ['اخلط اللحم المفروم مع البيض وفتات الخبز والثوم ومعجون الفلفل وصلصة الصويا والتوابل الخماسية.', 'شكّل الخليط كرات بحجم حبة الجوز.', 'سخّن الزيت في مقلاة واقلِ الكرات حتى تحمر من جميع الجوانب.', 'أضف رشقة ماء وغطّ المقلاة واتركها 5 دقائق حتى تنضج تمامًا.', 'ارفع الغطاء وقلّب حتى تتغطى الكرات بالصلصة اللامعة.', 'زيّنها بالبصل الأخضر وقدمها مع الأرز المبخّر.'],
  },
  nutrition: { calories: 360, protein: 30, carbs: 16, fat: 20 },
};

const TURKU_RONTTONEN_BERRY_PASTRIES: Recipe = {
  id: 'turku-ronttonen-berry-pastries',
  slug: 'turku-ronttonen-berry-pastries',
  foodLibraryDishId: '0030a905-b309-4d98-bb3c-ad929aa53732',
  imageUrl: '/images/recipes/turku-ronttonen-berry-pastries.webp',
  emoji: '🫐',
  title: { en: 'Turku Rönttönen Berry Pastries', ar: 'مطابخ توركو رونتونن معجنات التوت توركوي' },
  cuisine: { en: 'Finnish', ar: 'فنلندي' },
  description: {
    en: 'Small Finnish rye pastries filled with berry jam and a hint of cardamom.',
    ar: 'معجنات شعير فنلندية صغيرة محشوة بمربى التوت ولمسة من الهيل.',
  },
  prepTime: { en: '1 hr', ar: '60 دقيقة' },
  ingredients: {
    en: ['2 cups rye flour', '1/2 cup all-purpose flour', '1/2 cup butter, softened', '1/3 cup sugar', '1 egg', '1 tsp ground cardamom', '1/2 cup berry jam', '1 tbsp pearl sugar for topping'],
    ar: ['كوبان دقيق شعير', 'نصف كوب دقيق متعدد الأغراض', 'نصف كوب زبدة طرية', 'ثلث كوب سكر', 'بيضة', 'ملعقة صغيرة هيل مطحون', 'نصف كوب مربى توت', 'ملعقة كبيرة سكر لؤلؤي للوجه'],
  },
  instructions: {
    en: ['Cream the butter and sugar, then beat in the egg.', 'Mix the rye flour, all-purpose flour and cardamom, then add to the butter mixture.', 'Knead into a smooth dough and chill for 15 minutes.', 'Roll out and cut into small rounds, then add a spoonful of jam to each.', 'Fold the rounds in half, brush with beaten egg and sprinkle with pearl sugar.', 'Bake at 180°C (350°F) for 15–18 minutes until lightly browned.'],
    ar: ['اخفق الزبدة والسكر ثم أضف البيضة.', 'اخلط دقيق الشعير والدقيق متعدد الأغراض والهيل ثم أضفها إلى خليط الزبدة.', 'اعجن حتى تصبح العجينة ناعمة ثم برّدها 15 دقيقة.', 'افرد العجينة وقطّعها دوائر صغيرة ثم أضف ملعقة مربى لكل دائرة.', 'اطوِ الدوائر نصفين وادهنها بالبيض ورشّها بالسكر اللؤلؤي.', 'اخبز على 180 درجة مئوية 15 إلى 18 دقيقة حتى تصبح محمرة قليلًا.'],
  },
  nutrition: { calories: 210, protein: 4, carbs: 30, fat: 8 },
};

const CLASSIC_CHEESEBURGER: Recipe = {
  id: 'classic-cheeseburger',
  slug: 'classic-cheeseburger',
  foodLibraryDishId: 'bc320bd7-c128-40b8-bdf3-014535d56394',
  imageUrl: '/images/recipes/classic-cheeseburger.webp',
  emoji: '🍔',
  title: { en: 'Classic Cheeseburger', ar: 'برجر الجبن الكلاسيكي' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'A juicy seared beef patty with melted cheddar, crisp lettuce and tomato on a toasted bun.',
    ar: 'قطعة لحم بقري مشوية غنية العصير مع جبن الشيدر المذاب والخس والطماطم على خبز محمص.',
  },
  prepTime: { en: '15 min', ar: '15 دقيقة' },
  cookTime: { en: '12 min', ar: '12 دقيقة' },
  ingredients: {
    en: [
      '1 lb ground beef (80% lean)',
      '4 burger buns',
      '4 slices cheddar cheese (1 oz each)',
      '1 tbsp vegetable oil',
      '1 tsp kosher salt',
      '1/2 tsp black pepper',
      '4 lettuce leaves',
      '1 medium tomato, sliced',
      '1 tbsp ketchup',
      '1 tbsp yellow mustard',
    ],
    ar: [
      '500 غرام لحم بقري مفروم',
      '4 أقراص خبز برجر',
      '4 شرائح جبن شيدر',
      'ملعقة كبيرة زيت نباتي',
      'ملعقة صغيرة ملح خشن',
      'نصف ملعقة صغيرة فلفل أسود',
      '4 أوراق خس',
      'طماطم متوسطة مقطعة',
      'ملعقة كبيرة كاتشب',
      'ملعقة كبيرة خردل',
    ],
  },
  instructions: {
    en: [
      'Heat a cast-iron skillet over medium-high heat and brush lightly with oil.',
      'Shape the beef into 4 equal patties and season both sides with salt and pepper.',
      'Sear the patties for 4 minutes per side, then top each with cheese and cover for 1 minute to melt.',
      'Toast the buns in the same skillet for about 30 seconds.',
      'Spread ketchup and mustard on the buns, then layer with lettuce, tomato and the melted-cheese patties.',
      'Serve hot with a green salad or oven-baked potato wedges.',
    ],
    ar: [
      'سخّن مقلاة حديدية على حرارة متوسطة عالية وادهنها بقليل من الزيت.',
      'شكّل اللحم 4 قطع متساوية وتبّلها بالملح والفلفل من الجانبين.',
      'اشوي القطع 4 دقائق لكل جانب ثم ضع الجبن فوقها وغطّها دقيقة واحدة حتى يذوب.',
      'حمّص أقراص الخبز في المقلاة نفسها نحو 30 ثانية.',
      'انشر الكاتشب والخردل على الخبز ثم أضف الخس والطماطم وقطع اللحم بالجبن.',
      'قدّمها ساخنة مع سلطة خضراء أو بطاطس مشوية بالفرن.',
    ],
  },
  nutrition: { calories: 480, protein: 28, carbs: 35, fat: 24 },
};

const BUFFALO_CHICKEN_WINGS: Recipe = {
  id: 'buffalo-chicken-wings',
  slug: 'buffalo-chicken-wings',
  foodLibraryDishId: '9e90f9f3-236f-4345-a64f-3f16cee16f61',
  imageUrl: '/images/recipes/buffalo-chicken-wings.webp',
  emoji: '🍗',
  title: { en: 'Buffalo Chicken Wings', ar: 'أجنحة الدجاج بصلصة بوفالو' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'Crispy oven-baked chicken wings tossed in a tangy cayenne pepper sauce.',
    ar: 'أجنحة دجاج مقرمشة مخبوزة بالفرن مقلوبة بصلصة حارة بنكهة الفلفل.',
  },
  prepTime: { en: '15 min', ar: '15 دقيقة' },
  cookTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: [
      '2 lbs chicken wings, split at the joints',
      '1/4 cup cayenne hot sauce',
      '2 tbsp unsalted butter, melted',
      '1 tbsp apple cider vinegar',
      '1 tsp garlic powder',
      '1/2 tsp kosher salt',
      '1 tbsp olive oil',
      '2 tbsp blue cheese dressing for serving',
      'Celery sticks for serving',
    ],
    ar: [
      '900 غرام أجنحة دجاج مقطعة عند المفاصل',
      'ربع كوب صلصة فلفل حار',
      'ملعقتان كبيرتان زبدة مذابة',
      'ملعقة كبيرة خل تفاح',
      'ملعقة صغيرة مسحوق ثوم',
      'نصف ملعقة صغيرة ملح خشن',
      'ملعقة كبيرة زيت زيتون',
      'ملعقتان كبيرتان صلصة جبن زرقاء للتقديم',
      'عيدان كرفس للتقديم',
    ],
  },
  instructions: {
    en: [
      'Heat the oven to 425°F (220°C) and line a baking sheet with foil.',
      'Pat the wings dry, then toss with olive oil, garlic powder and salt.',
      'Arrange in a single layer and bake for 25 minutes, flipping once halfway through.',
      'Whisk the hot sauce, melted butter and vinegar together in a large bowl.',
      'Toss the hot wings in the sauce until evenly coated.',
      'Serve with blue cheese dressing and celery sticks.',
    ],
    ar: [
      'سخّن الفرن إلى 425 درجة فهرنهايت وافرش صينية الخبز بورق القصدير.',
      'جفّف الأجنحة ثم قلّبها مع زيت الزيتون ومسحوق الثوم والملح.',
      'رتّبها في طبقة واحدة واخبزها 25 دقيقة مع تقليبها مرة في المنتصف.',
      'اخفق الصلصة الحارة والزبدة المذابة والخل في وعاء كبير.',
      'قلّب الأجنحة الساخنة في الصلصة حتى تتغطى بالتساوي.',
      'قدّمها مع الصلصة الجبن وعيدان الكرفس.',
    ],
  },
  nutrition: { calories: 420, protein: 32, carbs: 12, fat: 26 },
};

const BUTTERMILK_PANCAKES: Recipe = {
  id: 'buttermilk-pancakes',
  slug: 'buttermilk-pancakes',
  foodLibraryDishId: 'e50b3588-d465-41a0-8315-7ef02984a0cb',
  imageUrl: '/images/recipes/buttermilk-pancakes.webp',
  emoji: '🥞',
  title: { en: 'Buttermilk Pancakes', ar: 'فطائر اللبن الرائب' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'Fluffy griddle pancakes with a tender crumb and a light tang from buttermilk.',
    ar: 'فطائر هشة مطبوخة على الصاجة بقوام طري ونكهة خفيفة من اللبن الرائب.',
  },
  prepTime: { en: '10 min', ar: '10 دقائق' },
  cookTime: { en: '15 min', ar: '15 دقيقة' },
  ingredients: {
    en: [
      '1 cup all-purpose flour',
      '1 cup buttermilk',
      '1 large egg',
      '2 tbsp granulated sugar',
      '2 tsp baking powder',
      '1/2 tsp kosher salt',
      '2 tbsp unsalted butter, melted',
      '1 tsp vanilla extract',
      'Maple syrup and fresh berries for serving',
    ],
    ar: [
      'كوب دقيق متعدد الأغراض',
      'كوب لبن رائب',
      'بيضة كبيرة',
      'ملعقتان كبيرتان سكر',
      'ملعقتان صغيرتان بيكنغ بودر',
      'نصف ملعقة صغيرة ملح خشن',
      'ملعقتان كبيرتان زبدة مذابة',
      'ملعقة صغيرة خلاصة فانيلا',
      'شراب القيقب وتوت طازج للتقديم',
    ],
  },
  instructions: {
    en: [
      'Whisk the flour, sugar, baking powder and salt in a large bowl.',
      'In a second bowl, whisk the buttermilk, egg, melted butter and vanilla.',
      'Pour the wet mixture into the dry ingredients and stir just until combined; a few lumps are fine.',
      'Let the batter rest for 5 minutes while you heat a griddle over medium heat.',
      'Drop 1/4 cup of batter per pancake and cook for 2 minutes until bubbles form.',
      'Flip and cook 1 more minute, then serve warm with maple syrup and berries.',
    ],
    ar: [
      'اخفق الدقيق والسكر والبيكنغ بودر والملح في وعاء كبير.',
      'في وعاء آخر اخفق اللبن الرائب والبيضة والزبدة المذابة والفانيلا.',
      'اسكب المكونات السائلة على الجافة وقلّب حتى تتجانس فقط؛ بعض الكتل مقبول.',
      'اترك الخليط 5 دقائق أثناء تسخين الصاجة على حرارة متوسطة.',
      'اسكب ربع كوب من الخليط لكل فطيرة واطهها دقيقتين حتى تظهر الفقاعات.',
      'اقلبها واطهها دقيقة إضافية ثم قدّمها دافئة مع شراب القيقب والتوت.',
    ],
  },
  nutrition: { calories: 280, protein: 8, carbs: 36, fat: 11 },
};

const GRILLED_CHICKEN_CAESAR_SALAD: Recipe = {
  id: 'grilled-chicken-caesar-salad',
  slug: 'grilled-chicken-caesar-salad',
  foodLibraryDishId: 'a4469f5d-6901-4cf7-95da-a6fcf01d9b3b',
  imageUrl: '/images/recipes/grilled-chicken-caesar-salad.webp',
  emoji: '🥗',
  title: { en: 'Grilled Chicken Caesar Salad', ar: 'سلطة سيزر بالدجاج المشوي' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'Char-grilled chicken over crisp romaine with a creamy lemon dressing and Parmesan.',
    ar: 'دجاج مشوي فوق خس روماني مقرمش مع صلصة ليمون كريمية وجبن بارميزان.',
  },
  prepTime: { en: '20 min', ar: '20 دقيقة' },
  cookTime: { en: '12 min', ar: '12 دقيقة' },
  ingredients: {
    en: [
      '1 lb boneless, skinless chicken breast',
      '2 heads romaine lettuce, chopped',
      '1/2 cup grated Parmesan cheese',
      '1/4 cup mayonnaise',
      '1 tbsp lemon juice',
      '1 tsp Dijon mustard',
      '1 clove garlic, minced',
      '1 cup croutons',
      '2 tbsp olive oil',
      '1/2 tsp black pepper',
    ],
    ar: [
      '500 غرام صدر دجاج منزوع العظم والجلد',
      'رأسان خس روماني مقطعان',
      'نصف كوب جبن بارميزان مبشور',
      'ربع كوب مايونيز',
      'ملعقة كبيرة عصير ليمون',
      'ملعقة صغيرة خردل ديجون',
      'فص ثوم مفروم',
      'كوب قطع خبز محمص',
      'ملعقتان كبيرتان زيت زيتون',
      'نصف ملعقة صغيرة فلفل أسود',
    ],
  },
  instructions: {
    en: [
      'Flatten the chicken slightly, brush with olive oil and season with black pepper.',
      'Grill over medium-high heat for 6 minutes per side until cooked through.',
      'Rest the chicken for 5 minutes, then slice it into strips.',
      'Whisk the mayonnaise, lemon juice, mustard and garlic with 2 tbsp of water until pourable.',
      'Toss the romaine with the dressing and half of the Parmesan.',
      'Top with the sliced chicken, remaining cheese and croutons.',
    ],
    ar: [
      'افرد صدر الدجاج قليلًا وادهنه بزيت الزيتون وتبّله بالفلفل الأسود.',
      'اشويه على حرارة متوسطة عالية 6 دقائق لكل جانب حتى ينضج.',
      'اتركه 5 دقائق ثم قطّعه إلى شرائح.',
      'اخفق المايونيز وعصير الليمون والخردل والثوم مع ملعقتين كبيرتين ماء حتى يصبح سائلًا.',
      'قلّب الخس الروماني مع الصلصة ونصف جبن البارميزان.',
      'رتب فوقه شرائح الدجاج وبقية الجبن وقطع الخبز المحمص.',
    ],
  },
  nutrition: { calories: 380, protein: 30, carbs: 14, fat: 22 },
};

const MACARONI_AND_CHEESE: Recipe = {
  id: 'macaroni-and-cheese',
  slug: 'macaroni-and-cheese',
  foodLibraryDishId: 'd83971ce-9cc2-48b2-8373-3b5815c34717',
  imageUrl: '/images/recipes/macaroni-and-cheese.webp',
  emoji: '🧀',
  title: { en: 'Macaroni and Cheese', ar: 'المعكرونة بالجبن' },
  cuisine: { en: 'American', ar: 'أمريكي' },
  description: {
    en: 'Tender elbow macaroni folded into a smooth cheddar sauce and baked until golden.',
    ar: 'معكرونة الكوع الطرية ممزوجة بصلصة الشيدر الناعمة ومخبوزة حتى تصبح ذهبية.',
  },
  prepTime: { en: '15 min', ar: '15 دقيقة' },
  cookTime: { en: '25 min', ar: '25 دقيقة' },
  ingredients: {
    en: [
      '16 oz elbow macaroni',
      '8 oz sharp cheddar cheese, shredded',
      '2 cups whole milk',
      '2 tbsp unsalted butter',
      '2 tbsp all-purpose flour',
      '1/2 tsp kosher salt',
      '1/4 tsp black pepper',
      '1/2 tsp paprika',
    ],
    ar: [
      '450 غرام معكرونة الكوع',
      '225 غرام جبن شيدر مبشور',
      'كوبان حليب كامل الدسم',
      'ملعقتان كبيرتان زبدة',
      'ملعقتان كبيرتان دقيق متعدد الأغراض',
      'نصف ملعقة صغيرة ملح خشن',
      'ربع ملعقة صغيرة فلفل أسود',
      'نصف ملعقة صغيرة بابريكا',
    ],
  },
  instructions: {
    en: [
      'Heat the oven to 375°F (190°C) and grease a 2-quart baking dish.',
      'Boil the macaroni in salted water for 8 minutes, then drain.',
      'Melt the butter in a saucepan, whisk in the flour and cook for 1 minute.',
      'Gradually whisk in the milk and cook until the sauce thickens, about 3 minutes.',
      'Stir in the cheese until smooth, then fold in the macaroni and season.',
      'Transfer to the dish, sprinkle with paprika and bake for 15 minutes until bubbling.',
    ],
    ar: [
      'سخّن الفرن إلى 375 درجة فهرنهايت وادهن طبق خبز.',
      'اسلق المعكرونة في ماء مملح 8 دقائق ثم صفّها.',
      'ذوّب الزبدة في قدر وأضف الدقيق مع الخفق واطه دقيقة واحدة.',
      'أضف الحليب تدريجيًا مع الخفق واطه حتى تتكاثف الصلصة نحو 3 دقائق.',
      'أضف الجبن حتى يذوب ثم قلّب المعكرونة وتبّلها.',
      'انقلها إلى الطبق ورشّ البابريكا واخبزها 15 دقيقة حتى تغلي.',
    ],
  },
  nutrition: { calories: 450, protein: 18, carbs: 48, fat: 20 },
};

export const RECIPES: Recipe[] = [
  FOUL,
  CHICKEN_RICE,
  TAGINE,
  TABBOULEH,
  KABSA,
  LENTIL_SOUP,
  LEMON_HERB_SALMON,
  AVOCADO_CHICKEN_BOWL,
  TURKEY_MEATBALLS_ZUCCHINI,
  GREEK_YOGURT_BERRY_PARFAIT,
  HEALTHY_TURKEY_BURGER_BOWL,
  BAKED_LEMON_CHICKEN_BROCCOLI,
  SWEET_POTATO_BLACK_BEAN_TACOS,
  CLASSIC_COBB_SALAD_LIGHT,
  MAPLE_GLAZED_SALMON,
  LEAN_BEEF_BROCCOLI_STIRFRY,
  QUINOA_KALE_POWER_SALAD,
  CAULIFLOWER_CRUST_PIZZA,
  SPAGHETTI_SQUASH_TURKEY_MEAT_SAUCE,
  ALMOND_BUTTER_PROTEIN_OATMEAL,
  BAKED_SWEET_POTATO_COTTAGE_CHEESE,
  GRILLED_SHRIMP_ZUCCHINI_SKEWERS,
  CHICKEN_AVOCADO_LETTUCE_WRAP,
  VEGAN_LENTIL_VEGETABLE_SOUP,
  APPLE_CINNAMON_BAKED_OATMEAL,
  GROUND_CHICKEN_STUFFED_PEPPERS,
  MEDITERRANEAN_GRILLED_CHICKEN_SALAD,
  BAKED_COD_LEMON_OLIVES,
  QUINOA_TABBOULEH_CHICKPEAS,
  ZUCCHINI_NOODLES_PESTO,
  GREEK_STUFFED_PEPPERS_FETA,
  SHRIMP_SCAMPI_WHOLE_WHEAT,
  EGGPLANT_PARMESAN_LIGHT,
  TUSCAN_WHITE_BEAN_KALE_SOUP,
  CAPRESE_AVOCADO_SALAD,
  LEMON_HERB_SALMON_ASPARAGUS,
  CHICKEN_FAJITA_BOWL,
  LEAN_BEEF_BURRITO_BOWL,
  SHRIMP_TACOS_CABBAGE_SLAW,
  BLACK_BEAN_SWEET_POTATO_QUESADILLA,
  GRILLED_FISH_TACOS_MANGO_SALSA,
  MEXICAN_QUINOA_SALAD,
  TURKEY_ZUCCHINI_ENCHILADAS,
  CHICKEN_TORTILLA_SOUP_LIGHT,
  BEEF_BELL_PEPPER_FAJITAS,
  CILANTRO_LIME_CAULIFLOWER_RICE_BOWL,
  GRILLED_CHICKEN_COBB_SALAD,
  BUFFALO_CHICKEN_LETTUCE_WRAPS,
  TURKEY_MEATLOAF_CAULIFLOWER_MASH,
  LOADED_BAKED_SWEET_POTATO,
  CRISPY_BAKED_CHICKEN_TENDERS,
  BENELUX_BAKED_RICE_PUDDING,
  CHICKEN_MATHLOUTHA,
  CHICKEN_PIE_RWANDAN,
  GREEK_FASOLADA,
  ITALIAN_PASTA_FRESH_TOMATO_SAUCE,
  NITER_KIBE_BUTTER_AFRICAN,
  PUMPKIN_SALAD,
  PUTTU_INDIAN,
  RICE_WITH_BEANS_RWANDAN,
  SEVILLIAN_BEAN_AND_VEGETABLE_STEW,
  ARDENNES_CREAMY_POTATO_GRATIN,
  BENELUX_COUQUE_DE_DINANT,
  DRIED_POLLACK_SOUP_WITH_RICE,
  ESTONIAN_BARLEY_MUSHROOM_PORRIDGE,
  LABNEH_WITH_GARLIC_AND_MINT,
  MAKROUD_WITH_ALMONDS,
  ONION_GRILLED_CHICKEN,
  RICE_WITH_MINCED_MEAT_AND_PINE_NUTS,
  SPICY_MEATBALLS,
  TURKU_RONTTONEN_BERRY_PASTRIES,
  CLASSIC_CHEESEBURGER,
  BUFFALO_CHICKEN_WINGS,
  BUTTERMILK_PANCAKES,
  GRILLED_CHICKEN_CAESAR_SALAD,
  MACARONI_AND_CHEESE,
];

export const getRecipeBySlug = (slug: string): Recipe | undefined =>
  RECIPES.find((r) => r.slug === slug);
