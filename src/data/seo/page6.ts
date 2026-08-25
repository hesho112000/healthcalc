import type { SeoPageData } from '../../components/SeoLandingPage';

export const page6: SeoPageData = {
  slug: 'senior-fitness',
  title: {
    en: 'Fitness & Nutrition Plan for Seniors Over 60',
    fr: 'Plan Fitness et Nutrition pour Seniors de plus de 60 Ans',
    es: 'Plan de Fitness y Nutricion para Mayores de 60 Anos',
    ar: 'خطة اللياقة والتغذية لكبار السن فوق 60 سنة',
  },
  metaDesc: {
    en: 'A gentle, science-based fitness and meal plan designed for seniors 60+, focusing on joint health, bone density, balance, and heart-healthy nutrition.',
    fr: 'Un plan fitness et alimentaire doux concu pour les seniors de 60 ans et plus, axe sur la sante articulaire et osseuse.',
    es: 'Un plan de fitness y alimentacion suave disenado para mayores de 60 anos, enfocado en salud articular, densidad osea y nutricion cardiosaludable.',
    ar: 'خطة لياقة ووجبات لطيفة مصممة لكبار السن فوق 60 سنة، تركز على صحة المفاصل وكثافة العظام والتغذية الصحية للقلب.',
  },
  heroGradient: 'from-sky-500 to-blue-600',
  icon: '🧓',
  profile: {
    title: { en: 'Profile Overview', fr: 'Apercu du Profil', es: 'Vista del Perfil', ar: 'نظرة عامة على الملف' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '65 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Female' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '160 cm' },
      { label: { en: 'Weight', fr: 'Poids', es: 'Peso', ar: 'الوزن' }, value: '70 kg' },
      { label: { en: 'BMI', fr: 'IMC', es: 'IMC', ar: 'BMI' }, value: '27.3 (Overweight)' },
      { label: { en: 'Conditions', fr: 'Conditions', es: 'Condiciones', ar: 'الحالات' }, value: 'Mild HTN, Arthritis' },
    ],
  },
  description: {
    en: [
      'Margaret is a 65-year-old retired teacher at 160 cm and 70 kg (BMI 27.3). She has mild hypertension (controlled with medication), early-stage osteoarthritis in her knees, and wants to improve her overall fitness, maintain bone density, and lose a few kilograms safely.',
      'Using HealthCalc.ai, Margaret selected her activity level as lightly active and her goal as weight maintenance with improved fitness. Her BMR calculated at 1,320 kcal/day and TDEE at 1,650 kcal/day. The recommended daily intake was approximately 1,500 calories.',
      'The senior-specific plan focuses on calcium and vitamin D rich foods for bone health, anti-inflammatory omega-3 fatty acids for joint comfort, low-sodium meals for blood pressure management, and gentle but effective exercise that protects joints while building strength and balance.',
    ],
    fr: [
      'Margaret est une enseignante retraitee de 65 ans, mesurant 160 cm et pesant 70 kg (IMC 27,3). Elle a une hypertension legere (controlée), une arthrose precoce aux genoux.',
      'En utilisant HealthCalc.ai, Margaret a selectionne un niveau d\'activite legerement actif. Son MB est de 1 320 kcal/jour et son TDEE de 1 650 kcal/jour. L\'apport recommande est d\'environ 1 500 calories par jour.',
      'Le plan specifique aux seniors se concentre sur les aliments riches en calcium et vitamine D, les acides gras omega-3 anti-inflammatoires, les repas faibles en sodium.',
    ],
    es: [
      'Margaret es una profesora jubilada de 65 anos, de 160 cm y 70 kg (IMC 27.3). Tiene hipertension leve (controlada con medicamentos) y artrosis temprana en las rodillas.',
      'Usando HealthCalc.ai, Margaret selecciono nivel de actividad ligeramente activo. Su TMB es 1,320 kcal/dia y TDEE 1,650 kcal/dia. La ingesta recomendada es aproximadamente 1,500 calorias diarias.',
      'El plan para seniors se enfoca en alimentos ricos en calcio y vitamina D, acidos grasos omega-3 antiinflamatorios, comidas bajas en sodio y ejercicio suave que protege las articulaciones.',
    ],
    ar: [
      'مارغريت معلمة متقاعدة في 65 سنة، طولها 160 سم ووزنها 70 كجم (BMI 27.3). لديها ارتفاع خفيف في ضغط الدم (محكوم بالأدوية) وتآكل مبكر في الركبتين.',
      'باستخدام HealthCalc.ai، اختارت مارغريت مستوى نشاط خفيف. معدل الأيض 1,320 سعرة/يوم وإجمالي الإنفاق 1,650 سعرة/يوم. المدخول الموصى به حوالي 1,500 سعرة يومياً.',
      'الخطة تركز على الأطعمة الغنية بالكالسيوم وفيتامين D لصحة العظام، أوميغا 3 المضاد للالتهابات، والتمارين اللطيفة التي تحمي المفاصل.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day', fr: 'Exemple de Journee IA', es: 'Ejemplo de Dia IA', ar: 'مثال على يوم مولد بالذكاء الاصطناعي' },
    meals: [
      { meal: 'Breakfast (8:00 AM)', calories: 350, items: ['Whole grain toast (2 slices) with butter', 'Scrambled egg (1) with spinach', 'Orange juice with calcium (200ml)', 'Walnuts (5 pieces)'] },
      { meal: 'Snack (10:30 AM)', calories: 120, items: ['Greek yogurt (150g) with honey', 'Ground flaxseed (1 tsp)'] },
      { meal: 'Lunch (12:30 PM)', calories: 420, items: ['Grilled fish (120g)', 'Mashed sweet potato (100g)', 'Steamed green beans & carrots', 'Olive oil dressing (1 tbsp)'] },
      { meal: 'Snack (3:30 PM)', calories: 100, items: ['1 small banana', 'Almonds (6 pieces)'] },
      { meal: 'Dinner (6:00 PM)', calories: 380, items: ['Chicken soup with vegetables', 'Whole grain bread (1 slice)', 'Side salad with lemon', 'Herbal tea'] },
    ],
    workout: [
      { day: 'Monday', activity: '20 min gentle walking + 10 min balance exercises (heel-to-toe walk, single leg stand)' },
      { day: 'Tuesday', activity: '15 min chair yoga + 10 min light stretching' },
      { day: 'Wednesday', activity: '20 min water aerobics or pool walking' },
      { day: 'Thursday', activity: '15 min resistance band exercises (seated) + balance work' },
      { day: 'Friday', activity: '20 min gentle walking + 10 min breathing exercises' },
      { day: 'Saturday', activity: '30 min gardening or leisurely nature walk' },
      { day: 'Sunday', activity: 'Rest day with gentle stretching (10 min)' },
    ],
    tips: {
      en: ['Focus on calcium (1,200mg/day) and Vitamin D (800-1000 IU/day)', 'Start every exercise session with 5 min warm-up', 'Use chair-supported exercises for balance training', 'Eat anti-inflammatory foods: fatty fish, berries, turmeric', 'Stay hydrated - seniors often have reduced thirst sensation', 'Get bone density scans as recommended by your doctor'],
      fr: ['Concentrez-vous sur le calcium (1 200 mg/jour) et la vitamine D', 'Commencez chaque seance par 5 min d\'echauffement', 'Utilisez des exercices avec chaise pour l\'equilibre', 'Mangez des aliments anti-inflammatoires', 'Restez hydrate - les seniors ont souvent moins soif', 'Faites des densitometries osseuses recommandees'],
      es: ['Enfocate en calcio (1,200mg/dia) y Vitamina D (800-1000 UI/dia)', 'Empieza cada sesion con 5 min de calentamiento', 'Usa ejercicios con silla para entrenar equilibrio', 'Come alimentos antiinflamatorios: pescado graso, frutos rojos', 'Mantente hidratado - los mayores tienen menos sed', 'Hazte densitometrias oseas segun recomiende tu medico'],
      ar: ['ركز على الكالسيوم (1,200 ملغ/يوم) وفيتامين D (800-1000 وحدة/يوم)', 'ابدأ كل جلسة بـ 5 دقائق إحماء', 'استخدم تمارين بمساعدة الكرسي لتدريب التوازن', 'تناول أطعمة مضادة للالتهابات: الأسماك الدهنية، التوت، الكركم', 'حافظ على الترطيب - كبار السن يشعرون بالعطش بشكل أقل', 'اخض لفحص كثافة العظام كما يوصي طبيبك'],
    },
  },
  ctaText: { en: 'Get Your Custom Senior Fitness Plan', fr: 'Obtenez Votre Plan Senior', es: 'Obten Tu Plan para Mayores', ar: 'احصل على خطتك المخصصة لكبار السن' },
  ctaLink: '/weight-loss',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
