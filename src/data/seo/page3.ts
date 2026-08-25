import type { SeoPageData } from '../../components/SeoLandingPage';

export const page3: SeoPageData = {
  slug: 'muscle-building-80kg',
  title: {
    en: 'Muscle Building & Fitness Plan for an 80kg Individual',
    fr: 'Plan de Musculation et Fitness pour un Individu de 80kg',
    es: 'Plan de Construccion Muscular para un Individuo de 80kg',
    ar: 'خطة بناء العضلات واللياقة لشخص وزنه 80 كجم',
  },
  metaDesc: {
    en: 'Discover a science-backed muscle building plan with meal prep and progressive overload training for an active 80kg individual based on ACSM guidelines.',
    fr: 'Decouvrez un plan de musculation scientifique avec preparation de repas et entraînement a surcharge progressive pour un individu actif de 80kg.',
    es: 'Descubre un plan de construccion muscular con ciencia, preparacion de comidas y entrenamiento de sobrecarga progresiva para un individuo activo de 80kg.',
    ar: 'اكتشف خطة بناء العضلات المدعومة بالعلم مع تحضير الوجبات والتدريب التدريجي لشخص وزنه 80 كجم.',
  },
  heroGradient: 'from-blue-500 to-indigo-600',
  icon: '💪',
  profile: {
    title: { en: 'Profile Overview', fr: 'Apercu du Profil', es: 'Vista del Perfil', ar: 'نظرة عامة على الملف' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '28 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Male' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '180 cm' },
      { label: { en: 'Weight', fr: 'Poids', es: 'Peso', ar: 'الوزن' }, value: '80 kg' },
      { label: { en: 'BMI', fr: 'IMC', es: 'IMC', ar: 'BMI' }, value: '24.7 (Normal)' },
      { label: { en: 'Goal', fr: 'Objectif', es: 'Objetivo', ar: 'الهدف' }, value: 'Muscle Gain' },
    ],
  },
  description: {
    en: [
      'Karim is a 28-year-old software developer at 180 cm and 80 kg (BMI 24.7). He trains 3-4 days per week and wants to add lean muscle while maintaining his current weight. His activity level is moderately active with additional structured gym sessions.',
      'Using HealthCalc.ai, Karim selected the "Gain Muscle" goal. The calculator set his target at 2,640 kcal/day (a 300 kcal surplus over his 2,340 TDEE) with a macro split of 35% protein (231g), 40% carbs (264g), and 25% fat (73g).',
      'The progressive overload plan follows ACSM guidelines: 4 training days with compound movements (squats, deadlifts, bench press, rows), progressive weight increases of 2.5-5% every 2 weeks, and strategic deload weeks every 4th week.',
    ],
    fr: [
      'Karim est un developpeur de 28 ans, mesurant 180 cm et pesant 80 kg (IMC 24,7). Il s\'entraîne 3-4 jours par semaine et souhaite ajouter du muscle maigre tout en maintenant son poids.',
      'En utilisant HealthCalc.ai, Karim a selectionne l\'objectif "Gagner du Muscle". La cible calculee est de 2 640 kcal/jour (surplus de 300 kcal) avec 35% de proteines, 40% de glucides et 25% de lipides.',
      'Le plan de surcharge progressive suit les directives ACSM: 4 jours d\'entrainement avec exercices composes, augmentations progressives de 2,5-5% toutes les 2 semaines.',
    ],
    es: [
      'Karim es un desarrollador de software de 28 anos, de 180 cm y 80 kg (IMC 24.7). Entrena 3-4 dias por semana y quiere ganar musculo magro manteniendo su peso actual.',
      'Usando HealthCalc.ai, Karim selecciono el objetivo "Ganar Musculo". El objetivo calculado es de 2,640 kcal/dia (superavit de 300 kcal) con 35% proteina, 40% carbohidratos y 25% grasa.',
      'El plan de sobrecarga progresiva sigue las directrices ACSM: 4 dias de entrenamiento con ejercicios compuestos, aumentos progresivos del 2.5-5% cada 2 semanas.',
    ],
    ar: [
      'كريم مطور برمجيات في 28 سنة، طوله 180 سم ووزنه 80 كجم (BMI 24.7). يتدرب 3-4 أيام أسبوعياً ويريد إضافة عضلات نظيفة مع الحفاظ على وزنه.',
      'باستخدام HealthCalc.ai، اختار كريم هدف "اكتساب العضلات". الحد هو 2,640 سعرة/يوم (فائض 300 سعرة) مع 35% بروتين و40% كربوهيدرات و25% دهون.',
      'خطة الحمل التدريجي تتبع إرشادات ACSM: 4 أيام تدريب بتمارين مركبة، زيادة تدريجية 2.5-5% كل أسبوعين.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day', fr: 'Exemple de Journee IA', es: 'Ejemplo de Dia IA', ar: 'مثال على يوم مولد بالذكاء الاصطناعي' },
    meals: [
      { meal: 'Breakfast (7:00 AM)', calories: 550, items: ['Whole eggs (3) + egg whites (2)', 'Oatmeal (60g) with banana & honey', 'Whole wheat toast (2 slices)', 'Orange juice (200ml)'] },
      { meal: 'Snack (10:00 AM)', calories: 350, items: ['Protein shake (1 scoop whey)', 'Banana', 'Peanut butter (1 tbsp)'] },
      { meal: 'Lunch (1:00 PM)', calories: 650, items: ['Grilled chicken breast (180g)', 'Brown rice (200g cooked)', 'Steamed vegetables', 'Olive oil (1 tbsp)'] },
      { meal: 'Pre-Workout (4:00 PM)', calories: 250, items: ['Greek yogurt (200g)', 'Mixed berries (100g)', 'Honey drizzle (1 tsp)'] },
      { meal: 'Dinner (8:00 PM)', calories: 600, items: ['Lean beef steak (160g)', 'Sweet potato (150g)', 'Roasted broccoli & peppers', 'Side salad with olive oil'] },
    ],
    workout: [
      { day: 'Monday', activity: 'Chest & Triceps: Bench press 4x8, Incline DB press 3x10, Dips 3x12, Tricep pushdowns 3x12' },
      { day: 'Tuesday', activity: 'Back & Biceps: Deadlifts 4x6, Barbell rows 4x8, Pull-ups 3x10, Barbell curls 3x10' },
      { day: 'Wednesday', activity: 'Rest or light cardio (20 min walk)' },
      { day: 'Thursday', activity: 'Shoulders & Abs: OHP 4x8, Lateral raises 3x12, Face pulls 3x15, Planks 3x45s' },
      { day: 'Friday', activity: 'Legs: Squats 4x8, Romanian deadlifts 3x10, Leg press 3x12, Calf raises 4x15' },
      { day: 'Saturday', activity: 'Active recovery: 30 min light jog or swimming' },
      { day: 'Sunday', activity: 'Full rest day' },
    ],
    tips: {
      en: ['Progressive overload: increase weight by 2.5-5% every 2 weeks', 'Eat protein within 30 min post-workout (20-40g)', 'Sleep 7-9 hours for optimal muscle recovery', 'Aim for 1.6-2.2g protein per kg bodyweight', 'Stay hydrated: drink 3-4 liters daily', 'Take a deload week every 4th week to prevent injury'],
      fr: ['Surcharge progressive: augmentez le poids de 2,5-5% toutes les 2 semaines', 'Mangez des proteines dans les 30 min apres l\'entrainement', 'Dormez 7-9 heures pour la recuperation musculaire', 'Visez 1,6-2,2g de proteines par kg de poids corporel', 'Buvez 3-4 litres par jour', 'Prenez une semaine de deload toutes les 4 semaines'],
      es: ['Sobrecarga progresiva: aumenta el peso 2.5-5% cada 2 semanas', 'Come proteinas dentro de 30 min despues del entrenamiento', 'Duerme 7-9 horas para recuperacion muscular', 'Busca 1.6-2.2g de proteina por kg de peso corporal', 'Bebe 3-4 litros al dia', 'Toma una semana de descanso cada 4 semanas'],
      ar: ['الحمل التدريجي: زِد الوزن 2.5-5% كل أسبوعين', 'تناول البروتين خلال 30 دقيقة بعد التمرين', 'نم 7-9 ساعات لتعافي العضلات', 'احرص على 1.6-2.2 جرام بروتين لكل كجم', 'اشرب 3-4 لتر يومياً', 'خذ أسبوع تخفيف كل 4 أسابيع'],
    },
  },
  ctaText: { en: 'Build Your Custom Muscle Plan', fr: 'Creez Votre Plan Musculation', es: 'Crea Tu Plan Muscular', ar: 'أنشئ خطتك المخصصة لبناء العضلات' },
  ctaLink: '/weight-loss',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
