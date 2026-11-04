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

const HEALTHY_TURKEY_BURGER_BOWL: Recipe = {
  id: 'healthy-turkey-burger-bowl',
  slug: 'healthy-turkey-burger-bowl',
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
];

export const getRecipeBySlug = (slug: string): Recipe | undefined =>
  RECIPES.find((r) => r.slug === slug);
