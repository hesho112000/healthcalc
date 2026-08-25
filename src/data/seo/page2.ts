import type { SeoPageData } from '../../components/SeoLandingPage';

export const page2: SeoPageData = {
  slug: 'diabetes-meal-plan-40f',
  title: {
    en: 'Diabetes & Meal Plan for a 40-Year-Old Woman',
    fr: 'Plan Diabete & Nutrition pour une Femme de 40 Ans',
    es: 'Plan de Diabetes y Comidas para una Mujer de 40 Anos',
    ar: 'خطة السكري والوجبات لامرأة في 40 سنة',
  },
  metaDesc: {
    en: 'See how a 40-year-old woman with Type 2 diabetes uses HealthCalc.ai for blood sugar tracking, DASH meal planning, and safe exercise routines.',
    fr: 'Decouvrez comment une femme de 40 ans diabetique utilise HealthCalc.ai pour le suivi glycemique et la planification des repas.',
    es: 'Descubre como una mujer de 40 anos con diabetes tipo 2 usa HealthCalc.ai para el monitoreo de glucosa y planes de comidas.',
    ar: 'اكتشف كيف تستخدم امرأة في 40 سنة مصابة بداء السكري HealthCalc.ai لتتبع السكر وخطط الوجبات.',
  },
  heroGradient: 'from-amber-500 to-orange-600',
  icon: '🩺',
  profile: {
    title: { en: 'Patient Profile', fr: 'Profil de Patiente', es: 'Perfil de Paciente', ar: 'الملف الشخصي للمريضة' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '40 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Female' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '165 cm' },
      { label: { en: 'Weight', fr: 'Poids', es: 'Peso', ar: 'الوزن' }, value: '82 kg' },
      { label: { en: 'HbA1c', fr: 'HbA1c', es: 'HbA1c', ar: 'HbA1c' }, value: '7.2% (High)' },
      { label: { en: 'Condition', fr: 'Condition', es: 'Condicion', ar: 'الحالة' }, value: 'Type 2 Diabetes' },
    ],
  },
  description: {
    en: [
      'Maria is a 40-year-old teacher recently diagnosed with Type 2 diabetes. Her latest HbA1c is 7.2%, and fasting glucose was 142 mg/dL. At 165 cm and 82 kg (BMI 30.1), her endocrinologist recommended dietary changes and regular exercise following ADA guidelines.',
      'Using HealthCalc.ai, Maria entered her lab values into the Diabetes Suite interpreter. The tool flagged her fasting glucose as elevated (normal: 70-99 mg/dL) and her HbA1c as above the ADA target of under 7%.',
      'The AI-generated meal plan follows ADA and DASH principles: low glycemic index foods, controlled carbohydrate portions at each meal, adequate fiber (25g/day), and sodium under 2,300mg. Total daily target: approximately 1,510 calories with balanced macros.',
    ],
    fr: [
      'Maria est une enseignante de 40 ans recemment diagnostiquee avec un diabete de type 2. Son HbA1c est de 7,2% et sa glycemie a jeun etait de 142 mg/dL. Son endocrinologue a recommande des changements alimentaires.',
      'En utilisant HealthCalc.ai, Maria a entre ses valeurs de laboratoire. L\'outil a identifie sa glycemie a jeun comme elevee et son HbA1c au-dessus de la cible ADA de 7%.',
      'Le plan alimentaire genere suit les principes ADA et DASH: aliments a faible index glycemique, portions de glucides controlees, fibres adequates (25g/jour) et sodium inferieur a 2 300 mg.',
    ],
    es: [
      'Maria es una profesora de 40 anos recien diagnosticada con diabetes tipo 2. Su HbA1c es 7.2% y su glucosa en ayunas fue 142 mg/dL. Su endocrinólogo recomendo cambios dieteticos y ejercicio regular.',
      'Usando HealthCalc.ai, Maria ingreso sus valores de laboratorio. La herramienta identifico su glucosa en ayunas como elevada y su HbA1c por encima del objetivo ADA del 7%.',
      'El plan de comidas generado sigue los principios ADA y DASH: alimentos de bajo indice glucemico, porciones controladas de carbohidratos, fibra adecuada (25g/dia) y sodio menor a 2,300mg.',
    ],
    ar: [
      'ماريا معلمة في 40 سنة تم تشخيصها مؤخراً بداء السكري من النوع الثاني. قياس HbA1c هو 7.2% والسكر الترشحي كان 142 ملغ/ديسيلتر. أوصى طبيبها بتغييرات غذائية وممارسة الرياضة.',
      'باستخدام HealthCalc.ai، أدخلت ماريا قيم مختبرها. الأداة حددت سكرها الترشحي مرتفع وHbA1c فوق هدف ADA البالغ 7%.',
      'خطة الوجبات المولدة تتبع مبادئ ADA وDASH: أطعمة منخفضة المؤشر الجلايسيمي، حصص كربوهيدرات محكومة، ألياف كافية (25 جرام/يوم) وصوديوم أقل من 2,300 ملغ.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day', fr: 'Exemple de Journee IA', es: 'Ejemplo de Dia IA', ar: 'مثال على يوم مولد بالذكاء الاصطناعي' },
    meals: [
      { meal: 'Breakfast (7:00 AM)', calories: 350, items: ['Steel-cut oatmeal (40g) with cinnamon', '1/2 cup blueberries', '10 almonds', 'Green tea'] },
      { meal: 'Snack (10:00 AM)', calories: 150, items: ['Greek yogurt (150g, unsweetened)', 'Chia seeds (1 tsp)'] },
      { meal: 'Lunch (1:00 PM)', calories: 450, items: ['Grilled chicken breast (120g)', 'Quinoa (80g cooked)', 'Large mixed green salad', 'Olive oil & lemon dressing'] },
      { meal: 'Snack (4:00 PM)', calories: 120, items: ['1 medium apple', '1 tbsp natural peanut butter'] },
      { meal: 'Dinner (7:00 PM)', calories: 400, items: ['Baked salmon (150g)', 'Steamed broccoli & green beans', 'Sweet potato (100g)', 'Herbs (no salt)'] },
    ],
    workout: [
      { day: 'Monday', activity: '30 min brisk walking + 15 min resistance bands' },
      { day: 'Tuesday', activity: '20 min cycling + 10 min stretching' },
      { day: 'Wednesday', activity: '30 min swimming or water aerobics' },
      { day: 'Thursday', activity: '15 min resistance training + 15 min walking' },
      { day: 'Friday', activity: '30 min brisk walking + 15 min yoga' },
      { day: 'Saturday', activity: '45 min recreational activity' },
      { day: 'Sunday', activity: 'Rest or gentle walking (20 min)' },
    ],
    tips: {
      en: ['Check blood sugar before and after exercise', 'Limit carbs to 45-60g per meal (ADA)', 'Eat at consistent times daily', 'Carry fast-acting glucose during workouts', 'Monitor feet daily for any issues', 'Stay hydrated - drink water before, during, after exercise'],
      fr: ['Verifiez la glycemie avant et apres l\'exercice', 'Limitez les glucides a 45-60g par repas', 'Mangez a des heures regulieres', 'Portez du glucose rapide pendant l\'exercice', 'Surveillez vos pieds quotidiennement', 'Restez hydrate - buvez avant, pendant et apres l\'exercice'],
      es: ['Revisa tu glucosa antes y despues del ejercicio', 'Limita los carbohidratos a 45-60g por comida', 'Come a horas consistentes', 'Lleva glucosa de accion rapida durante ejercicio', 'Revisa tus pies diariamente', 'Mantente hidratado antes, durante y despues del ejercicio'],
      ar: ['افحص السكر قبل وبعد الرياضة', 'قلل الكربوهيدرات إلى 45-60 جرام لكل وجبة', 'تناول الطعام في أوقات منتظمة', 'احمل سكراً سريع المفعول أثناء الرياضة', 'افحص قدميك يومياً', 'حافظ على الترطيب - اشرب الماء قبل وأثناء وبعد الرياضة'],
    },
  },
  ctaText: { en: 'Get Your Custom Diabetes Plan', fr: 'Obtenez Votre Plan Diabete', es: 'Obten Tu Plan de Diabetes', ar: 'احصل على خطتك المخصصة للسكري' },
  ctaLink: '/diabetes',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
