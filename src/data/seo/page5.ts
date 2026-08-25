import type { SeoPageData } from '../../components/SeoLandingPage';

export const page5: SeoPageData = {
  slug: 'keto-diabetes',
  title: {
    en: 'Keto-Friendly Nutrition Plan for Type 2 Diabetes',
    fr: 'Plan Nutritionnel Keto pour Diabete de Type 2',
    es: 'Plan Nutricional Keto para Diabetes Tipo 2',
    ar: 'خطة تغذية كيتو لمرضى السكري من النوع الثاني',
  },
  metaDesc: {
    en: 'A science-based keto-adapted meal plan for Type 2 diabetes management, with blood sugar monitoring guidelines and safe exercise recommendations.',
    fr: 'Un plan alimentaire keto adapte pour la gestion du diabete de type 2, avec des recommandations de surveillance de la glycemie.',
    es: 'Un plan alimentario keto adaptado para el manejo de la diabetes tipo 2, con guias de monitoreo de glucosa y ejercicio seguro.',
    ar: 'خطة غذائية كيتو مكيّفة لإدارة داء السكري من النوع الثاني، مع إرشادات مراقبة السكر وتوصيات تمارين آمنة.',
  },
  heroGradient: 'from-emerald-500 to-teal-600',
  icon: '🥗',
  profile: {
    title: { en: 'Patient Profile', fr: 'Profil du Patient', es: 'Perfil del Paciente', ar: 'الملف الشخصي للمريض' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '55 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Male' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '175 cm' },
      { label: { en: 'Weight', fr: 'Poids', es: 'Peso', ar: 'الوزن' }, value: '90 kg' },
      { label: { en: 'HbA1c', fr: 'HbA1c', es: 'HbA1c', ar: 'HbA1c' }, value: '8.1% (High)' },
      { label: { en: 'Condition', fr: 'Condition', es: 'Condicion', ar: 'الحالة' }, value: 'T2D on Metformin' },
    ],
  },
  description: {
    en: [
      'Robert is a 55-year-old man with Type 2 diabetes (HbA1c 8.1%) currently on Metformin. At 175 cm and 90 kg (BMI 29.4), his doctor suggested that a low-carbohydrate or ketogenic approach could help improve his blood sugar control alongside medication.',
      'Using HealthCalc.ai, Robert explored the Diabetes Suite. His fasting glucose was 156 mg/dL and post-prandial was 218 mg/dL. The AI recommended a modified keto approach: 50-80g net carbs/day (not strict 20g) to maintain nutritional balance while still achieving significant blood sugar improvement.',
      'The plan emphasizes healthy fats (avocado, olive oil, nuts), moderate protein (1.2g/kg bodyweight), and non-starchy vegetables. Meal timing is synchronized with Metformin dosing for optimal glucose management. Regular blood glucose monitoring is included as part of the plan.',
    ],
    fr: [
      'Robert est un homme de 55 ans atteint de diabete de type 2 (HbA1c 8,1%) sous Metformine. A 175 cm et 90 kg (IMC 29,4), son medecin a suggere une approche faible en glucides.',
      'En utilisant HealthCalc.ai, Robert a explore la Suite Diabete. Son glucose a jeun etait de 156 mg/dL. L\'IA a recommande un approche keto modifiee: 50-80g de glucides nets par jour.',
      'Le plan privilegie les graisses saines (avocat, huile d\'olive, noix), des proteines moderees et des legumes sans amidon. La surveillance reguliere de la glycemie est incluse.',
    ],
    es: [
      'Robert es un hombre de 55 anos con diabetes tipo 2 (HbA1c 8.1%) bajo Metformina. Con 175 cm y 90 kg (IMC 29.4), su medico sugirio un enfoque bajo en carbohidratos.',
      'Usando HealthCalc.ai, Robert exploro la Suite de Diabetes. Su glucosa en ayunas fue 156 mg/dL. La IA recomendo un enfoque keto modificado: 50-80g de carbohidratos netos por dia.',
      'El plan enfatiza grasas saludables (aguacate, aceite de oliva, nueces), proteina moderada y verduras sin almidon. El monitoreo regular de glucosa esta incluido.',
    ],
    ar: [
      'روبرت رجل في 55 سنة مصاب بداء السكري من النوع الثاني (HbA1c 8.1%) تحت الميتفورمين. بطول 175 سم ووزن 90 كجم (BMI 29.4)، اقترح طبيبه نهجاً منخفض الكربوهيدرات.',
      'باستخدام HealthCalc.ai، استكشف روبرت مجموعة السكري. سكره الترشحي كان 156 ملغ/ديسيلتر. أوصى الذكاء الاصطناعي بنهج كيتو معدل: 50-80 جرام كربوهيدرات صافية يومياً.',
      'الخطة تؤكد على الدهون الصحية (الأفوكادو، زيت الزيتون، المكسرات)، البروتين المعتدل، والخضروات غير النشوية. مراقبة السكر المنتظمة مضمنة.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day', fr: 'Exemple de Journee IA', es: 'Ejemplo de Dia IA', ar: 'مثال على يوم مولد بالذكاء الاصطناعي' },
    meals: [
      { meal: 'Breakfast (7:00 AM)', calories: 420, items: ['Scrambled eggs (3) with spinach & cheese', 'Half avocado', 'Coffee with heavy cream', '5 walnuts'] },
      { meal: 'Snack (10:30 AM)', calories: 180, items: ['Handful of macadamia nuts (30g)', 'Celery sticks with cream cheese'] },
      { meal: 'Lunch (1:00 PM)', calories: 520, items: ['Grilled chicken thighs (150g)', 'Caesar salad (no croutons)', 'Parmesan cheese (20g)', 'Olive oil dressing'] },
      { meal: 'Snack (4:00 PM)', calories: 150, items: ['String cheese (1 piece)', '10 olives'] },
      { meal: 'Dinner (7:00 PM)', calories: 480, items: ['Pan-seared salmon (150g)', 'Roasted asparagus (100g)', 'Cauliflower mash (100g)', 'Butter & herbs'] },
    ],
    workout: [
      { day: 'Monday', activity: '30 min brisk walking + 15 min resistance bands' },
      { day: 'Tuesday', activity: '20 min cycling + 10 min stretching' },
      { day: 'Wednesday', activity: '30 min swimming (low-impact)' },
      { day: 'Thursday', activity: '15 min light weight training + 15 min walk' },
      { day: 'Friday', activity: '30 min brisk walking + yoga (15 min)' },
      { day: 'Saturday', activity: '45 min recreational activity' },
      { day: 'Sunday', activity: 'Rest or gentle 20 min walk' },
    ],
    tips: {
      en: ['Monitor blood glucose 2-3x daily when starting keto', 'Stay hydrated - keto increases water loss', 'Keep net carbs at 50-80g/day for modified keto', 'Take Metformin as prescribed alongside the diet', 'Increase electrolytes (sodium, potassium, magnesium)', 'Get regular HbA1c tests every 3 months'],
      fr: ['Surveillez la glycemie 2-3 fois/jour en debut de regime keto', 'Restez hydrate - le keto augmente la perte d\'eau', 'Gardez les glucides nets a 50-80g/jour', 'Prenez la Metformine comme prescrit', 'Augmentez les electrolytes (sodium, potassium, magnesium)', 'Faites des tests HbA1c reguliers tous les 3 mois'],
      es: ['Monitorea la glucosa 2-3 veces/dia al iniciar keto', 'Mantente hidratado - keto aumenta la perdida de agua', 'Manten carbohidratos netos en 50-80g/dia', 'Toma Metformina segun prescripcion', 'Aumenta electrolitos (sodio, potasio, magnesio)', 'Hazte pruebas HbA1c regulares cada 3 meses'],
      ar: ['راقب السكر 2-3 مرات يومياً عند بدء الكيتو', 'حافظ على الترطيب - الكيتو يزيد فقدان الماء', 'حافظ على 50-80 جرام كربوهيدرات صافية يومياً', 'تناول الميتفورمين كما هو موصوف', 'زِد الإلكتروليتات (صوديوم، بوتاسيوم، مغنيسيوم)', 'اخض لفحص HbA1c كل 3 أشهر'],
    },
  },
  ctaText: { en: 'Get Your Custom Diabetes Plan', fr: 'Obtenez Votre Plan Diabete', es: 'Obten Tu Plan de Diabetes', ar: 'احصل على خطتك المخصصة للسكري' },
  ctaLink: '/diabetes',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
