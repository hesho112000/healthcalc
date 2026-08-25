import type { SeoPageData } from '../../components/SeoLandingPage';

export const page1: SeoPageData = {
  slug: 'weight-loss-hypertension',
  title: {
    en: 'Weight Loss Plan for a 35-Year-Old Man with High Blood Pressure',
    fr: 'Plan de Perte de Poids pour un Homme de 35 Ans avec Hypertension',
    es: 'Plan de Perdida de Peso para un Hombre de 35 Anos con Hipertension',
    ar: 'خطة فقدان وزن لرجل في 35 سنة مصاب بارتفاع ضغط الدم',
  },
  metaDesc: {
    en: 'See how HealthCalc.ai creates a personalized weight loss and nutrition plan for a 35-year-old male with hypertension, based on ADA and DASH guidelines.',
    fr: 'Decouvrez comment HealthCalc.ai cree un plan personnalise de perte de poids pour un homme de 35 ans avec hypertension.',
    es: 'Descubre como HealthCalc.ai crea un plan personalizado de perdida de peso para un hombre de 35 anos con hipertension.',
    ar: 'اكتشف كيف ينشئ HealthCalc.ai خطة مخصصة لفقدان الوزن لرجل في 35 سنة مصاب بارتفاع ضغط الدم.',
  },
  heroGradient: 'from-red-500 to-rose-600',
  icon: '❤️',
  profile: {
    title: { en: 'Patient Profile', fr: 'Profil du Patient', es: 'Perfil del Paciente', ar: 'الملف الشخصي للمريض' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '35 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Male' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '178 cm' },
      { label: { en: 'Weight', fr: 'Poids', es: 'Peso', ar: 'الوزن' }, value: '95 kg' },
      { label: { en: 'BMI', fr: 'IMC', es: 'IMC', ar: 'BMI' }, value: '30.0 (Obese)' },
      { label: { en: 'Condition', fr: 'Condition', es: 'Condicion', ar: 'الحالة' }, value: 'Hypertension' },
    ],
  },
  description: {
    en: [
      'Ahmad is a 35-year-old office worker recently diagnosed with Stage 1 hypertension (138/88 mmHg). At 178 cm and 95 kg, his BMI is 30.0, placing him in the obese category. His doctor recommended weight loss and dietary changes following the DASH eating plan.',
      'Using HealthCalc.ai, Ahmad entered his age, gender, height, weight, and activity level (sedentary). The platform calculated his BMR at 1,842 kcal/day and his TDEE at 2,210 kcal/day. For safe weight loss of 0.5-1 kg per week, the calculator recommended approximately 1,710 calories daily.',
      'The AI-generated plan combines DASH diet principles (low sodium under 2,300mg/day, rich in potassium, magnesium, and calcium) with a moderate caloric deficit. The protein target is set at 30% to preserve lean mass during weight loss.',
    ],
    fr: [
      'Ahmad est un homme de 35 ans travaillant au bureau, recemment diagnostique avec une hypertension de stade 1 (138/88 mmHg) lors d\'un examen de routine. A 178 cm et 95 kg, son IMC est de 30,0.',
      'En utilisant HealthCalc.ai, Ahmad a entre son age, sexe, taille, poids et niveau d\'activite. La plateforme a calcule son MB a 1 842 kcal/jour et son TDEE a 2 210 kcal/jour. Pour une perte de poids sure, la cible recommandee est d\'environ 1 710 calories par jour.',
      'Le plan genere par l\'IA combine les principes du regime DASH (faible sodium, riche en potassium et magnesium) avec un deficit calorique modere.',
    ],
    es: [
      'Ahmad es un hombre de 35 anos que trabaja en una oficina, recien diagnosticado con hipertension etapa 1 (138/88 mmHg). Con 178 cm y 95 kg, su IMC es de 30,0, clasificandolo como obeso.',
      'Usando HealthCalc.ai, Ahmad ingreso su perfil completo. La plataforma calculo su TMB en 1.842 kcal/dia y su TDEE en 2.210 kcal/dia. Para una perdida de peso segura, se recomienda un objetivo diario de aproximadamente 1.710 calorias.',
      'El plan generado combina los principios de la dieta DASH (bajo sodio, rico en potasio y magnesio) con un deficit calorico moderado.',
    ],
    ar: [
      'أحمد رجل في 35 سنة يعمل في مكتب، تم تشخيصه مؤخراً بارتفاع ضغط الدم من الدرجة الأولى (138/88 ملم زئبقي). بطول 178 سم ووزن 95 كجم، مؤشر كتلة جسمه 30.0.',
      'باستخدام HealthCalc.ai، أدخل أحمد عمره وجنده وطوله ووزنه ومستوى نشاطه. حسبت المنصة معدل الأيض عند 1,842 سعرة/يوم وإجمالي الإنفاق عند 2,210 سعرة/يوم. لفقدان وزن آمن يُنصح بهدف يومي حوالي 1,710 سعرة.',
      'الخطة المولدة بالذكاء الاصطناعي تجمع بين مبادئ نظام DASH (منخفض الصوديوم، غني بالبوتاسيوم والمغنيسيوم) مع عجز سعرات معتدل.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day', fr: 'Exemple de Journee IA', es: 'Ejemplo de Dia Generado por IA', ar: 'مثال على يوم مولد بالذكاء الاصطناعي' },
    meals: [
      { meal: 'Breakfast (7:00 AM)', calories: 380, items: ['Steel-cut oatmeal (40g) with cinnamon', 'Low-fat Greek yogurt (150g)', 'Walnuts (6 pieces)', 'Green tea (unsweetened)'] },
      { meal: 'Snack (10:00 AM)', calories: 120, items: ['1 medium apple', '10 unsalted almonds'] },
      { meal: 'Lunch (1:00 PM)', calories: 480, items: ['Grilled chicken breast (120g)', 'Brown rice (120g cooked)', 'Mixed salad with cucumber & tomato', 'Olive oil & lemon dressing (1 tbsp)'] },
      { meal: 'Snack (4:00 PM)', calories: 100, items: ['Carrot sticks (100g)', 'Hummus (2 tbsp)'] },
      { meal: 'Dinner (7:00 PM)', calories: 430, items: ['Baked salmon (130g)', 'Steamed broccoli & asparagus', 'Quinoa (80g cooked)', 'Chamomile tea'] },
    ],
    workout: [
      { day: 'Monday', activity: '30 min brisk walking + 15 min resistance bands' },
      { day: 'Tuesday', activity: '20 min stationary cycling + 10 min stretching' },
      { day: 'Wednesday', activity: '30 min swimming or water aerobics' },
      { day: 'Thursday', activity: '15 min light dumbbell training + 15 min walking' },
      { day: 'Friday', activity: '30 min brisk walking + 15 min yoga' },
      { day: 'Saturday', activity: '45 min recreational activity (hiking or cycling)' },
      { day: 'Sunday', activity: 'Rest day - gentle 20 min walk only' },
    ],
    tips: {
      en: ['Keep sodium under 2,300mg/day (DASH guideline)', 'Aim for 4-5 servings of fruits and vegetables daily', 'Drink at least 8 glasses of water per day', 'Monitor blood pressure weekly', 'Avoid processed foods and excessive alcohol', 'Sleep 7-9 hours per night for recovery'],
      fr: ['Maintenez le sodium sous 2 300 mg/jour', 'Visez 4-5 portions de fruits et legumes par jour', 'Buvez au moins 8 verres d\'eau par jour', 'Surveillez la tension arterielle chaque semaine', 'Evitez les aliments transformes', 'Dormez 7-9 heures par nuit'],
      es: ['Manten el sodio por debajo de 2,300mg/dia', 'Busca 4-5 porciones de frutas y verduras al dia', 'Bebe al menos 8 vasos de agua al dia', 'Monitorea la presion arterial semanalmente', 'Evita los alimentos procesados', 'Duerme 7-9 horas por noche'],
      ar: ['حافظ على الصوديوم أقل من 2,300 ملغ/يوم', 'احرص على 4-5 حصص من الفواكه والخضروات يومياً', 'اشرب 8 أكواب ماء على الأقل يومياً', 'راقب ضغط الدم أسبوعياً', 'تجنب الأطعمة المعالجة والكحول الزائد', 'نم 7-9 ساعات كل ليلة للتعافي'],
    },
  },
  ctaText: { en: 'Get Your Custom Hypertension Plan', fr: 'Obtenez Votre Plan Hypertension', es: 'Obten Tu Plan de Hipertension', ar: 'احصل على خطتك المخصصة' },
  ctaLink: '/weight-loss',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
