import type { SeoPageData } from '../../components/SeoLandingPage';

export const page8: SeoPageData = {
  slug: 'athletic-performance',
  title: {
    en: 'Athletic Performance & Marathon Nutrition Plan',
    fr: 'Plan de Performance Athletique et Nutrition Marathon',
    es: 'Plan de Rendimiento Atletico y Nutricion para Maraton',
    ar: 'خطة الأداء الرياضي والتغذية للعداء الريفي',
  },
  metaDesc: {
    en: 'A performance nutrition and training plan for competitive runners, with carb-loading strategies, race-day fueling, and recovery protocols based on ACSM guidelines.',
    fr: 'Un plan de nutrition et d\'entrainement pour coureurs competitifs, avec strategies de charge en glucides et protocoles de recuperation.',
    es: 'Un plan de nutricion y entrenamiento para corredores competitivos, con estrategias de carga de carbohidratos y protocolos de recuperacion.',
    ar: 'خطة تغذية وأداء للعدائين التنافسيين، مع استراتيجيات تحميل الكربوهيدرات وبروتوكولات التعافي.',
  },
  heroGradient: 'from-violet-500 to-purple-600',
  icon: '🏃',
  profile: {
    title: { en: 'Athlete Profile', fr: 'Profil Athlete', es: 'Perfil de Atleta', ar: 'ملف الرياضي' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '25 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Male' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '182 cm' },
      { label: { en: 'Weight', fr: 'Poids', es: 'Peso', ar: 'الوزن' }, value: '85 kg' },
      { label: { en: 'BMI', fr: 'IMC', es: 'IMC', ar: 'BMI' }, value: '25.7 (Normal)' },
      { label: { en: 'Goal', fr: 'Objectif', es: 'Objetivo', ar: 'الهدف' }, value: 'Marathon Training' },
    ],
  },
  description: {
    en: [
      'Omar is a 25-year-old competitive runner at 182 cm and 85 kg (BMI 25.7) training for his first full marathon. He currently runs 50-60 km per week and wants to optimize his nutrition for peak performance, proper fueling during long runs, and faster recovery.',
      'Using HealthCalc.ai, Omar entered his profile as very active with a muscle gain/maintenance goal. His BMR calculated at 1,922 kcal/day and his training-adjusted TDEE at 3,360 kcal/day. During peak training weeks, his target was set at 3,500-3,800 calories.',
      'The performance plan is periodized: base phase (55% carbs, 25% protein, 20% fat), build phase (60% carbs, 22% protein, 18% fat), and race week (65% carbs, 20% protein, 15% fat). Carb-loading begins 3 days before race day with 8-10g carbs per kg of body weight.',
    ],
    fr: [
      'Omar est un coureur competitif de 25 ans, mesurant 182 cm et pesant 85 kg (IMC 25,7) s\'entrainant pour son premier marathon complet. Il court 50-60 km par semaine.',
      'En utilisant HealthCalc.ai, Omar a selectionne un niveau d\'activite tres actif. Son MB est de 1 922 kcal/jour et son TDEE ajuste a 3 360 kcal/jour. Pendant les semaines de pic, sa cible est de 3 500-3 800 calories.',
      'Le plan de performance est periodise: phase de base (55% glucides), phase de construction (60% glucides), et semaine de course (65% glucides). Le chargement en glucides commence 3 jours avant la course.',
    ],
    es: [
      'Omar es un corredor competitivo de 25 anos, de 182 cm y 85 kg (IMC 25.7) entrenando para su primer maraton completo. Corre 50-60 km por semana.',
      'Usando HealthCalc.ai, Omar selecciono nivel de actividad muy activo. Su TMB es 1,922 kcal/dia y su TDEE ajustado 3,360 kcal/dia. Durante semanas pico, su objetivo es 3,500-3,800 calorias.',
      'El plan de rendimiento esta periodizado: fase base (55% carbohidratos), fase de construccion (60%) y semana de carrera (65%). La carga de carbohidratos comienza 3 dias antes.',
    ],
    ar: [
      'عمر عداء تنافسي في 25 سنة، طوله 182 سم ووزنه 85 كجم (BMI 25.7) يتدرب لأول ماراثون كامل. يركض 50-60 كم أسبوعياً.',
      'باستخدام HealthCalc.ai، اختار عمر مستوى نشاط نشط جداً. معدل الأيض 1,922 سعرة/يوم وإجمالي الإنفاق المعدّل 3,360 سعرة/يوم. خلال أسابيع الذروة الهدف 3,500-3,800 سعرة.',
      'خطة الأداء مقسمة لمراحل: قاعدة (55% كربوهيدرات)، بناء (60%)، وأسبوع السباق (65%). تحميل الكربوهيدرات يبدأ قبل 3 أيام من السباق.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day (Peak Week)', fr: 'Exemple de Journee IA (Semaine de Pic)', es: 'Ejemplo de Dia IA (Semana Pico)', ar: 'مثال على يوم مولد (أسبوع الذروة)' },
    meals: [
      { meal: 'Breakfast (6:30 AM)', calories: 650, items: ['Large oatmeal (80g) with banana & honey', 'Whole eggs (2) + egg whites (2)', 'Whole wheat toast (2) with peanut butter', 'Orange juice (300ml)'] },
      { meal: 'Pre-Run Snack (9:00 AM)', calories: 250, items: ['Energy bar (homemade: oats, dates, honey)', 'Small banana'] },
      { meal: 'Post-Run Recovery (11:00 AM)', calories: 400, items: ['Recovery shake: whey protein + banana + milk', 'Handful of dried fruit'] },
      { meal: 'Lunch (1:00 PM)', calories: 750, items: ['Grilled chicken breast (200g)', 'White rice (250g cooked)', 'Steamed vegetables', 'Olive oil (1 tbsp)'] },
      { meal: 'Afternoon Snack (4:00 PM)', calories: 300, items: ['Greek yogurt (200g) with granola', 'Mixed berries', 'Honey drizzle'] },
      { meal: 'Dinner (7:00 PM)', calories: 700, items: ['Pasta with lean ground turkey (200g)', 'Tomato sauce with vegetables', 'Side salad', 'Whole grain bread (1 slice)'] },
    ],
    workout: [
      { day: 'Monday', activity: 'Easy run 10 km (5:30/km pace) + 15 min stretching & foam rolling' },
      { day: 'Tuesday', activity: 'Track intervals: 8x800m at 3:30 pace with 400m jog recovery' },
      { day: 'Wednesday', activity: 'Rest day or easy 5 km recovery jog + strength training (30 min)' },
      { day: 'Thursday', activity: 'Tempo run 12 km at 4:45/km pace + stretching' },
      { day: 'Friday', activity: 'Easy run 8 km + core strength (20 min)' },
      { day: 'Saturday', activity: 'Long run 28 km (5:45/km pace) with race-day nutrition rehearsal' },
      { day: 'Sunday', activity: 'Active recovery: 30 min walk or light cycling + full body stretching' },
    ],
    tips: {
      en: ['Practice race-day nutrition during long runs - never try new foods on race day', 'Carb-load 3 days before race: 8-10g carbs per kg body weight', 'Electrolyte replacement every 45 min during runs over 60 min', 'Post-workout protein within 30 min (20-40g whey)', 'Sleep 8-9 hours during peak training weeks', 'Gradually increase weekly mileage by no more than 10%'],
      fr: ['Pratiquez la nutrition de course pendant les longues sorties', 'Chargez en glucides 3 jours avant: 8-10g par kg de poids corporel', 'Remplacement des electrolytes toutes les 45 min', 'Proteines dans les 30 min apres l\'entrainement', 'Dormez 8-9 heures pendant les semaines de pic', 'Augmentez progressivement le kilometrage de 10% maximum'],
      es: ['Practica nuticion de carrera durante tiradas largas', 'Carga de carbohidratos 3 dias antes: 8-10g por kg', 'Reemplazo de electrolitos cada 45 min durante carreras > 60 min', 'Proteina post-entrenamiento en 30 min', 'Duerme 8-9 horas durante semanas pico', 'Aumenta kilometraje semanal gradualmente (max 10%)'],
      ar: ['تدرب على تغذية يوم السباق أثناء الجولات الطويلة', 'حمّل الكربوهيدرات قبل 3 أيام: 8-10 جرام لكل كجم', 'استبدل الإلكتروليتات كل 45 دقيقة أثناء الركض', 'تناول البروتين خلال 30 دقيقة بعد التمرين', 'نم 8-9 ساعات خلال أسابيع الذروة', 'زِد المسافة الأسبوعية تدريجياً بحد أقصى 10%'],
    },
  },
  ctaText: { en: 'Build Your Custom Athletic Plan', fr: 'Creez Votre Plan Athletique', es: 'Crea Tu Plan Atletico', ar: 'أنشئ خطتك الرياضية المخصصة' },
  ctaLink: '/weight-loss',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
