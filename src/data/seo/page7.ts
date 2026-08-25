import type { SeoPageData } from '../../components/SeoLandingPage';

export const page7: SeoPageData = {
  slug: 'post-pregnancy-weight-loss',
  title: {
    en: 'Safe Post-Pregnancy Weight Loss & Nutrition Plan',
    fr: 'Plan de Perte de Poids Securise Apres Grossesse',
    es: 'Plan Seguro de Perdida de Peso Postparto',
    ar: 'خطة آمنة لفقدان الوزن بعد الولادة والتغذية',
  },
  metaDesc: {
    en: 'A gentle, breastfeeding-safe weight loss plan for new mothers, focusing on nutrient-dense meals, gradual fitness restoration, and postpartum recovery.',
    fr: 'Un plan de perte de poids sur pour les jeunes meres, axee sur les repas nutritifs et le retablissement post-partum.',
    es: 'Un plan seguro de perdida de peso para nuevas madres, enfocado en comidas nutritivas y recuperacion posparto.',
    ar: 'خطة آمنة لفقدان الوزن للأمهات الجددات، تركز على الوجبات المغذية والتعافي بعد الولادة.',
  },
  heroGradient: 'from-pink-500 to-rose-500',
  icon: '👶',
  profile: {
    title: { en: 'Profile Overview', fr: 'Apercu du Profil', es: 'Vista del Perfil', ar: 'نظرة عامة على الملف' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '30 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Female' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '163 cm' },
      { label: { en: 'Current Weight', fr: 'Poids Actuel', es: 'Peso Actual', ar: 'الوزن الحالي' }, value: '78 kg' },
      { label: { en: 'Pre-Pregnancy', fr: 'Avant Grossesse', es: 'Antes del Embarazo', ar: 'قبل الحمل' }, value: '65 kg' },
      { label: { en: 'Status', fr: 'Statut', es: 'Estado', ar: 'الحالة' }, value: '6mo Postpartum, BF' },
    ],
  },
  description: {
    en: [
      'Emma is a 30-year-old new mother, 6 months postpartum, currently breastfeeding. She gained 13 kg during pregnancy (from 65 kg to 78 kg at 163 cm). Her OB-GYN recommended a gradual approach: losing no more than 0.5 kg per week while maintaining milk supply.',
      'Using HealthCalc.ai, Emma entered her current stats. Her BMR was calculated at 1,520 kcal/day (elevated due to breastfeeding, which burns approximately 500 extra kcal/day). Her TDEE was 1,900 kcal/day. A safe deficit of 300-500 kcal was recommended, targeting 1,400-1,600 calories daily.',
      'The plan prioritizes nutrient density: iron-rich foods for postpartum recovery, calcium and vitamin D for bone health, DHA omega-3 for brain development (passed through breast milk), and adequate protein (1.1g/kg) for tissue repair. Gentle progressive exercise begins after the 6-week clearance.',
    ],
    fr: [
      'Emma est une jeune mere de 30 ans, 6 mois apres l\'accouchement, allaitant. Elle a pris 13 kg pendant la grossesse (de 65 kg a 78 kg a 163 cm). Son gynecologue a recommande une approche graduelle.',
      'En utilisant HealthCalc.ai, Emma a entre ses statistiques. Son MB est de 1 520 kcal/jour (eleve en raison de l\'allaitement). Son TDEE est de 1 900 kcal/jour. Un deficit de 300-500 kcal a ete recommande.',
      'Le plan priorise la densite nutritive: aliments riches en fer, calcium, vitamine D, DHA omega-3 et proteines adequates pour la reparation tissulaire.',
    ],
    es: [
      'Emma es una nueva madre de 30 anos, 6 meses despues del parto, amamantando. Gano 13 kg durante el embarazo (de 65 a 78 kg con 163 cm). Su ginecologo recomendo un enfoque gradual.',
      'Usando HealthCalc.ai, Emma ingreso sus estadisticas. Su TMB es 1,320 kcal/dia (elevado por la lactancia). Su TDEE es 1,650 kcal/dia. Se recomendo un deficit de 300-500 kcal.',
      'El plan prioriza la densidad nutritiva: alimentos ricos en hierro, calcio, vitamina D, DHA omega-3 y proteinas adecuadas para la reparacion de tejidos.',
    ],
    ar: [
      'إيما أم حديثة في 30 سنة، منذ 6 أشهر من الولادة، ترضع رضاعة طبيعية. زاد وزنها 13 كجم أثناء الحمل (من 65 إلى 78 كجم بطول 163 سم). أوصى طبيبها بنهج تدريجي.',
      'باستخدام HealthCalc.ai، أدخلت إيما إحصائياتها. معدل الأيض 1,520 سعرة/يوم (مرتفع بسبب الرضاعة). إجمالي الإنفاق 1,900 سعرة/يوم. أُوصي بعجز 300-500 سعرة.',
      'الخطة تركز على الكثافة المغذية: أطعمة غنية بالحديد للتعافي، الكالسيوم وفيتامين D، أوميغا 3 DHA لتطور الدماغ، والبروتين الكافي لإصلاح الأنسجة.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day', fr: 'Exemple de Journee IA', es: 'Ejemplo de Dia IA', ar: 'مثال على يوم مولد بالذكاء الاصطناعي' },
    meals: [
      { meal: 'Breakfast (8:00 AM)', calories: 380, items: ['Oatmeal (50g) with banana & walnuts', 'Boiled egg (1) + scrambled egg (1)', 'Fortified orange juice (200ml)', 'Prenatal vitamin'] },
      { meal: 'Snack (10:30 AM)', calories: 180, items: ['Greek yogurt (200g) with berries', 'Ground flaxseed (1 tbsp)'] },
      { meal: 'Lunch (1:00 PM)', calories: 450, items: ['Lean beef stir-fry (130g)', 'Brown rice (100g cooked)', 'Steamed broccoli & bell peppers', 'Sesame oil (1 tsp)'] },
      { meal: 'Snack (4:00 PM)', calories: 150, items: ['Apple slices with almond butter (1 tbsp)', 'Handful of trail mix'] },
      { meal: 'Dinner (6:30 PM)', calories: 400, items: ['Baked chicken thigh (120g)', 'Sweet potato mash (100g)', 'Sautéed spinach with garlic', 'Warm milk (200ml)'] },
    ],
    workout: [
      { day: 'Monday', activity: '15 min postpartum core restoration (pelvic floor + deep breathing)' },
      { day: 'Tuesday', activity: '20 min gentle walking with stroller' },
      { day: 'Wednesday', activity: '15 min postpartum yoga (hips & back focus)' },
      { day: 'Thursday', activity: '20 min walking + 10 min light upper body stretching' },
      { day: 'Friday', activity: '15 min pelvic floor exercises + 15 min walk' },
      { day: 'Saturday', activity: '25 min stroller walk in park' },
      { day: 'Sunday', activity: 'Rest day with gentle stretching' },
    ],
    tips: {
      en: ['Do NOT restrict calories below 1,500 while breastfeeding', 'Eat nutrient-dense foods, not just low-calorie foods', 'Pelvic floor exercises should start within first 6 weeks', 'Stay hydrated - drink a glass of water each time you nurse', 'Sleep when the baby sleeps - rest is critical for recovery', 'Consult your OB-GYN before starting any exercise program'],
      fr: ['NE RESTREIGNEZ PAS les calories en dessous de 1 500 pendant l\'allaitement', 'Mangez des aliments nutritifs, pas seulement faibles en calories', 'Les exercices du plancher pelvien doivent commencer dans les 6 premieres semaines', 'Buvez un verre d\'eau a chaque session d\'allaitement', 'Dormez quand le bebe dort - le repos est essentiel', 'Consultez votre gynecologue avant de commencer l\'exercice'],
      es: ['NO restrinja calorias por debajo de 1,500 durante la lactancia', 'Come alimentos nutritivos, no solo bajos en calorias', 'Los ejercicios del suelo pelvico deben empezar en las primeras 6 semanas', 'Bebe un vaso de agua cada vez que amamantes', 'Duerme cuando el bebe duerma - el descanso es critico', 'Consulta a tu ginecologo antes de iniciar ejercicio'],
      ar: ['لا تقلي السعرات عن 1,500 أثناء الرضاعة الطبيعية', 'تناولي أطعمة مغذية وليست فقط منخفضة السعرات', 'تمارين قاع الحوض يجب أن تبدأ خلال 6 أسابيع', 'اشربي كوب ماء في كل مرة ترضعين فيها', 'نامي عندما ينام الطفل - الراحة بالغة الأهمية', 'استشيري طبيبتك قبل بدء أي برنامج رياضي'],
    },
  },
  ctaText: { en: 'Get Your Custom Postpartum Plan', fr: 'Obtenez Votre Plan Post-partum', es: 'Obten Tu Plan Postparto', ar: 'احصل على خطتك المخصصة ما بعد الولادة' },
  ctaLink: '/weight-loss',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
