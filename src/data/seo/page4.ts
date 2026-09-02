import type { SeoPageData } from '../../components/SeoLandingPage';

export const page4: SeoPageData = {
  slug: 'pcos-weight-loss',
  title: {
    en: 'Weight Loss Plan for Women with PCOS',
    fr: 'Plan de Perte de Poids pour Femmes avec SOPK',
    es: 'Plan de Perdida de Peso para Mujeres con SOP',
    ar: 'خطة فقدان وزن للنساء المصابات متلازمة تكيس المبايض',
  },
  metaDesc: {
    en: 'A science-backed weight loss and nutrition plan designed for women with PCOS, focusing on insulin resistance management, anti-inflammatory foods, and safe exercise.',
    fr: 'Un plan de perte de poids et de nutrition concu pour les femmes avec SOPK, axe sur la resistance a l\'insuline et l\'alimentation anti-inflammatoire.',
    es: 'Un plan de perdida de peso y nutricion disenado para mujeres con SOP, enfocado en el manejo de resistencia a la insulina y alimentos antiinflamatorios.',
    ar: 'خطة فقدان وزن والتغذية مصممة للنساء المصابات بمتلازمة تكيس المبايض، تركز على إدارة مقاومة الأنسولين والأطعمة المضادة للالتهابات.',
  },
  heroGradient: 'from-purple-500 to-pink-600',
  icon: '🩺',
  profile: {
    title: { en: 'Patient Profile', fr: 'Profil de Patiente', es: 'Perfil de Paciente', ar: 'الملف الشخصي للمريضة' },
    details: [
      { label: { en: 'Age', fr: 'Age', es: 'Edad', ar: 'العمر' }, value: '32 years' },
      { label: { en: 'Gender', fr: 'Genre', es: 'Genero', ar: 'الجنس' }, value: 'Female' },
      { label: { en: 'Height', fr: 'Taille', es: 'Altura', ar: 'الطول' }, value: '168 cm' },
      { label: { en: 'Weight', fr: 'Poids', es: 'Peso', ar: 'الوزن' }, value: '88 kg' },
      { label: { en: 'BMI', fr: 'IMC', es: 'IMC', ar: 'BMI' }, value: '31.1 (Obese)' },
      { label: { en: 'Condition', fr: 'Condition', es: 'Condicion', ar: 'الحالة' }, value: 'PCOS + Insulin Resistance' },
    ],
  },
  description: {
    en: [
      'Sarah is a 32-year-old woman diagnosed with Polycystic Ovary Syndrome (PCOS) with insulin resistance. At 168 cm and 88 kg (BMI 31.1), she struggles with weight management, irregular periods, and fatigue. Her gynecologist recommended a combination of low-glycemic nutrition and regular moderate exercise.',
      'Using HealthCalc.ai, Sarah entered her profile data. The platform calculated her BMR at 1,656 kcal/day and TDEE at 2,070 kcal/day. For safe and sustainable weight loss (0.5 kg/week), the target was set at approximately 1,570 calories daily with an emphasis on anti-inflammatory foods.',
      'The PCOS-focused plan prioritizes low glycemic index carbohydrates, omega-3 rich foods, chromium and magnesium supplementation through food sources, and regular strength training to improve insulin sensitivity. The macro split is 30% protein, 40% low-GI carbs, and 30% healthy fats.',
    ],
    fr: [
      'Sarah est une femme de 32 ans diagnostiquee avec le Syndrome des Ovaires Polykystiques (SOPK) avec resistance a l\'insuline. A 168 cm et 88 kg (IMC 31,1), elle lutte avec la gestion du poids et la fatigue.',
      'En utilisant HealthCalc.ai, Sarah a entre ses donnees. La plateforme a calcule son MB a 1 656 kcal/jour et son TDEE a 2 070 kcal/jour. La cible etait de environ 1 570 calories par jour.',
      'Le plan SOPK priorise les glucides a faible index glycemique, les aliments riches en omega-3, et l\'entrainement en resistance regulier pour ameliorer la sensibilite a l\'insuline.',
    ],
    es: [
      'Sarah es una mujer de 32 anos diagnosticada con Sindrome de Ovario Poliquistico (SOP) con resistencia a la insulina. Con 168 cm y 88 kg (IMC 31.1), lucha con el manejo del peso y la fatiga.',
      'Usando HealthCalc.ai, Sarah ingreso sus datos. La plataforma calculo su TMB en 1,656 kcal/dia y su TDEE en 2,070 kcal/dia. El objetivo era aproximadamente 1,570 calorias diarias.',
      'El plan para SOP prioriza carbohidratos de bajo indice glucemico, alimentos ricos en omega-3, y entrenamiento de resistencia regular para mejorar la sensibilidad a la insulina.',
    ],
    ar: [
      'سارة امرأة في 32 سنة تم تشخيصها بمتلازمة تكيس المبايض مع مقاومة الأنسولين. بطول 168 سم ووزن 88 كجم (BMI 31.1)، تعاني من إدارة الوزن والإرهاق.',
      'باستخدام HealthCalc.ai، أدخلت سارة بياناتها. حسبت المنصة معدل الأيض عند 1,656 سعرة/يوم وإجمالي الإنفاق عند 2,070 سعرة/يوم. الهدف كان حوالي 1,570 سعرة يومياً.',
      'الخطة تركز على الكربوهيدرات منخفضة المؤشر الجلايسيمي، الأطعمة الغنية بأوميغا 3، والتدريب على المقاومة لتحسين حساسية الأنسولين.',
    ],
  },
  samplePlan: {
    title: { en: 'Sample AI-Generated Day', fr: 'Exemple de Journee IA', es: 'Ejemplo de Dia IA', ar: 'مثال على يوم مولد بالذكاء الاصطناعي' },
    meals: [
      { meal: 'Breakfast (7:30 AM)', calories: 380, items: ['Chia seed pudding with almond milk', 'Mixed berries (80g)', 'Flaxseeds (1 tbsp)', 'Cinnamon green tea'] },
      { meal: 'Snack (10:30 AM)', calories: 130, items: ['Handful of walnuts (8 pieces)', '1 small pear'] },
      { meal: 'Lunch (1:00 PM)', calories: 450, items: ['Grilled salmon (130g)', 'Sweet potato (120g)', 'Steamed spinach & broccoli', 'Extra virgin olive oil (1 tbsp)'] },
      { meal: 'Snack (4:00 PM)', calories: 140, items: ['Hummus (3 tbsp)', 'Cucumber & celery sticks'] },
      { meal: 'Dinner (7:00 PM)', calories: 420, items: ['Turkey meatballs (120g)', 'Zucchini noodles (150g)', 'Tomato sauce (low sugar)', 'Side salad with avocado'] },
    ],
    workout: [
      { day: 'Monday', activity: '30 min brisk walking + 15 min strength training (squats, lunges, glute bridges)' },
      { day: 'Tuesday', activity: '20 min yoga for stress management + 15 min light cardio' },
      { day: 'Wednesday', activity: '25 min resistance band workout (full body) + 10 min stretching' },
      { day: 'Thursday', activity: '30 min cycling or swimming (low-impact aerobic)' },
      { day: 'Friday', activity: '20 min strength training (upper body) + 15 min walking' },
      { day: 'Saturday', activity: '40 min nature hike or recreational activity' },
      { day: 'Sunday', activity: 'Rest day with gentle stretching (15 min)' },
    ],
    tips: {
      en: ['Eat low-glycemic foods to stabilize insulin levels', 'Include omega-3 fatty acids daily (salmon, walnuts, flaxseeds)', 'Strength training 3x/week improves insulin sensitivity', 'Manage stress - cortisol worsens PCOS symptoms', 'Limit processed sugar and refined carbohydrates', 'Consider inositol supplementation (consult your doctor)'],
      fr: ['Mangez des aliments a faible index glycemique', 'Incluez des omega-3 quotidiennement (saumon, noix, graines de lin)', 'L\'entrainement en resistance 3x/semaine ameliore la sensibilite a l\'insuline', 'Gerez le stress - le cortisol aggrave les symptomes SOPK', 'Limitez le sucre raffine et les glucides raffines', 'Envisagez la supplementation en inositol (consultez votre medecin)'],
      es: ['Come alimentos de bajo indice glucemico para estabilizar la insulina', 'Incluye omega-3 diariamente (salmon, nueces, linaza)', 'Entrenamiento de resistencia 3x/semana mejora sensibilidad a insulina', 'Maneja el estrés - el cortisol empeora sintomas del SOP', 'Limita azucar procesada y carbohidratos refinados', 'Considera suplementacion de inositol (consulta tu medico)'],
      ar: ['تناول أطعمة منخفضة المؤشر الجلايسيمي لمستقرة الأنسولين', 'أضف أوميغا 3 يومياً (سلمون، جوز، بذور الكتان)', 'التدريب على المقاومة 3 مرات أسبوعياً يحسن حساسية الأنسولين', 'تحكم في التوتر - الكورتيزول يزيد أعراض تكيس المبايض', 'تجنب السكر المعالج والكربوهيدرات المكررة', 'فكر في مكمل إينوزيتول (استشر طبيبك)'],
    },
  },
  ctaText: { en: 'Get Your Custom PCOS Plan', fr: 'Obtenez Votre Plan SOPK', es: 'Obten Tu Plan de SOP', ar: 'احصل على خطتك المخصصة لـ PCOS' },
  ctaLink: '/weight-loss',
  ctaButtonLabel: { en: 'Get Your Custom Plan Now', fr: 'Obtenez Votre Plan Maintenant', es: 'Obten Tu Plan Ahora', ar: 'احصل على خطتك الآن' },
};
