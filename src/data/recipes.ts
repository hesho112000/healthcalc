import type { Language } from '../types';

export type LangText = { en: string; ar: string };

export interface Recipe {
  id: string;
  slug: string;
  emoji: string;
  title: LangText;
  cuisine: LangText;
  description: LangText;
  prepTime: LangText;
  ingredients: { en: string[]; ar: string[] };
  instructions: { en: string[]; ar: string[] };
  nutrition: { calories: number; protein: number; carbs: number; fat: number };
}

export const lt = (text: LangText, lang: Language): string =>
  text[lang as keyof LangText] ?? text.en;

const FOUL: Recipe = {
  id: 'foul-medames',
  slug: 'foul-medames',
  emoji: '🫘',
  title: { en: 'Foul Medames', ar: 'فول مدمس' },
  cuisine: { en: 'Egyptian', ar: 'مصري' },
  description: {
    en: 'A creamy, protein-packed Egyptian fava bean breakfast bowl that keeps you full for hours.',
    ar: 'طبق مصري كريمي غني بالبروتين من الفول، يبقيك شبعانًا لساعات.',
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
];

export const getRecipeBySlug = (slug: string): Recipe | undefined =>
  RECIPES.find((r) => r.slug === slug);
