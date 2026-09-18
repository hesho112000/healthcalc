import type { Language } from '../types';

export type GuideTitle = { en: string; ar: string; es: string; fr: string; de: string };
export type GuideText = { en: string; ar: string };
export type GuideTextArray = { en: string[]; ar: string[] };

export type ExerciseCategory = 'cardio' | 'strength' | 'mindbody' | 'flexibility';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Equipment = 'none' | 'dumbbells' | 'mat';

export interface ExerciseGuide {
  id: string;
  slug: string;
  category: ExerciseCategory;
  title: GuideTitle;
  description: GuideText;
  duration: number;
  difficulty: Difficulty;
  caloriesBurned: number;
  equipment: Equipment;
  suitableFor: string[];
  benefits: GuideTextArray;
  instructions: GuideTextArray;
  tips: GuideTextArray;
  icon: string;
}

export const pickText = <T,>(text: { en: T } & Record<string, T>, lang: Language): T =>
  text[lang] ?? text.en;

const WALKING: ExerciseGuide = {
  id: 'walking-for-diabetes',
  slug: 'walking-for-diabetes',
  category: 'cardio',
  icon: '🚶',
  title: {
    en: 'Walking for Diabetes',
    ar: 'المشي لمرضى السكري',
    es: 'Caminar para la Diabetes',
    fr: 'La Marche pour le Diabète',
    de: 'Gehen bei Diabetes',
  },
  description: {
    en: 'Brisk walking is one of the safest, most effective ways to lower blood sugar, improve insulin sensitivity, and protect your heart.',
    ar: 'يُعد المشي السريع من أكثر الطرق أمانًا وفعالية لخفض سكر الدم وتحسين حساسية الأنسولين وحماية القلب.',
  },
  duration: 30,
  difficulty: 'easy',
  caloriesBurned: 120,
  equipment: 'none',
  suitableFor: ['diabetes', 'cholesterol'],
  benefits: {
    en: [
      'Improves insulin sensitivity, helping your cells use glucose more efficiently',
      'Lowers fasting blood sugar and post-meal glucose spikes',
      'Raises HDL (good) cholesterol and lowers triglycerides',
      'Reduces stress and boosts mood through endorphin release',
    ],
    ar: [
      'يحسن حساسية الأنسولين ويساعد خلاياك على استخدام الجلوكوز بكفاءة أكبر',
      'يخفض سكر الدم الصائم ويقلل الارتفاعات بعد الوجبات',
      'يرفع الكوليسترول الجيد HDL ويخفض الدهون الثلاثية',
      'يقلل التوتر ويحسّن المزاج عبر إفراز الإندورفين',
    ],
  },
  instructions: {
    en: [
      'Warm up with 5 minutes of slow walking and gentle arm swings',
      'Walk at a brisk pace for 20 minutes — you should be able to talk but not sing',
      'Keep your posture upright, shoulders relaxed, and swing your arms naturally',
      'Cool down with 5 minutes of slow walking and calf stretches',
      'Check your blood sugar before and after exercise, especially if you use insulin',
    ],
    ar: [
      'سخّن لمدة 5 دقائق بمشي بطيء وتأرجح خفيف للذراعين',
      'امشِ بوتيرة سريعة لمدة 20 دقيقة — يجب أن تستطيع التحدث دون أن تغني',
      'حافظ على استقامة ظهرك وارتخاء كتفيك وتأرجح ذراعيك بشكل طبيعي',
      'تبرّد لمدة 5 دقائق بمشي بطيء وتمددات للساق',
      'افحص سكر دمك قبل وبعد التمرين، خاصة إذا كنت تستخدم الأنسولين',
    ],
  },
  tips: {
    en: [
      'Wear comfortable, supportive walking shoes to protect your feet',
      'Stay hydrated — drink water before, during, and after your walk',
      'Walk after meals for the strongest effect on post-meal blood sugar',
    ],
    ar: [
      'ارتدِ أحذية مشي مريحة وداعمة لحماية قدميك',
      'اشرب كمية كافية من الماء قبل المشي وأثناءه وبعده',
      'امشِ بعد الوجبات للحصول على أقوى تأثير على سكر الدم بعد الأكل',
    ],
  },
};

const LOW_IMPACT_CARDIO: ExerciseGuide = {
  id: 'low-impact-cardio',
  slug: 'low-impact-cardio',
  category: 'cardio',
  icon: '🚴',
  title: {
    en: 'Low-Impact Cardio for Joint Health',
    ar: 'كارديو منخفض التأثير لصحة المفاصل',
    es: 'Cardio de Bajo Impacto para las Articulaciones',
    fr: 'Cardio à Faible Impact pour les Articulations',
    de: 'Gelenkschonendes Cardio-Training',
  },
  description: {
    en: 'Gentle cycling and similar low-impact movements strengthen your heart without jarring your knees and hips.',
    ar: 'يسهّل ركوب الدراجات والحركات منخفضة التأثير تقوية قلبك دون إجهاد الركبتين والوركين.',
  },
  duration: 25,
  difficulty: 'easy',
  caloriesBurned: 100,
  equipment: 'none',
  suitableFor: ['joints', 'hypertension', 'cholesterol'],
  benefits: {
    en: [
      'Improves cardiovascular endurance with minimal joint strain',
      'Lowers blood pressure by relaxing and widening blood vessels',
      'Strengthens leg muscles around knees and hips for better support',
      'Boosts circulation and helps maintain a healthy weight',
    ],
    ar: [
      'يحسّن التحمل القلبي الوعائي مع الحد الأدنى من إجهاد المفاصل',
      'يخفض ضغط الدم بإرخاء الأوعية الدموية وتوسيعها',
      'يقوّي عضلات الساق حول الركبتين والوركين لتوفير دعم أفضل',
      'يحسّن الدورة الدموية ويساعد في الحفاظ على وزن صحي',
    ],
  },
  instructions: {
    en: [
      'Start with 5 minutes at an easy, comfortable resistance',
      'Increase your pace for 15 minutes — aim for a steady, manageable effort',
      'Keep your back straight and avoid locking your knees',
      'Finish with 5 minutes of easy pedaling to cool down',
    ],
    ar: [
      'ابدأ بـ 5 دقائق بمقاومة سهلة ومريحة',
      'زد سرعتك لمدة 15 دقيقة — استهدف جهدًا ثابتًا يمكنك التحكم به',
      'حافظ على استقامة ظهرك وتجنب تثبيت ركبتيك',
      'أنهِ بجهد سهل لمدة 5 دقائق لتهدئة جسمك',
    ],
  },
  tips: {
    en: [
      'Adjust the seat height so your knee is slightly bent at the bottom of the pedal stroke',
      'Wear soft-soled shoes that grip the pedals well',
      'Start with short sessions and gradually increase duration',
    ],
    ar: [
      'اضبط ارتفاع المقعد بحيث تكون ركبتك مثنية قليلًا عند أسفل الدواسة',
      'ارتدِ أحذية بنعل مرن تمسك بالدواسات جيدًا',
      'ابدأ بجلسات قصيرة ثم زد المدة تدريجيًا',
    ],
  },
};

const STRENGTH_HYPERTENSION: ExerciseGuide = {
  id: 'strength-hypertension',
  slug: 'strength-hypertension',
  category: 'strength',
  icon: '💪',
  title: {
    en: 'Strength Training for Hypertension',
    ar: 'تدريب القوة لمرضى ارتفاع الضغط',
    es: 'Entrenamiento de Fuerza para la Hipertensión',
    fr: 'Musculation pour l\'Hypertension',
    de: 'Krafttraining bei Bluthochdruck',
  },
  description: {
    en: 'Controlled resistance training builds strong muscles that help regulate blood pressure while improving metabolism and bone health.',
    ar: 'يبني تدريب المقاومة المتحكم به عضلات قوية تساعد على تنظيم ضغط الدم وتحسين الأيض وصحة العظام.',
  },
  duration: 30,
  difficulty: 'medium',
  caloriesBurned: 160,
  equipment: 'dumbbells',
  suitableFor: ['hypertension', 'diabetes', 'cholesterol'],
  benefits: {
    en: [
      'Lowers resting blood pressure over time with consistent training',
      'Increases muscle mass, which improves glucose uptake and insulin sensitivity',
      'Raises HDL cholesterol and strengthens bones',
      'Boosts metabolism, helping with long-term weight control',
    ],
    ar: [
      'يخفض ضغط الدم أثناء الراحة مع التدريب المنتظم',
      'يزيد الكتلة العضلية مما يحسّن امتصاص الجلوكوز وحساسية الأنسولين',
      'يرفع الكوليسترول الجيد HDL ويقوّي العظام',
      'يرفع معدل الأيض مما يساعد على التحكم بالوزن على المدى الطويل',
    ],
  },
  instructions: {
    en: [
      'Warm up with 5 minutes of light walking and arm circles',
      'Do 2–3 sets of 10–12 repetitions per exercise with a comfortable weight',
      'Exhale on the effort (lifting) and inhale on the lowering phase — never hold your breath',
      'Rest 60–90 seconds between sets',
      'Finish with gentle stretching for the muscles you trained',
    ],
    ar: [
      'سخّن بـ 5 دقائق من المشي الخفيف ودوران الذراعين',
      'نفّذ 2–3 مجموعات من 10–12 تكرارًا لكل تمرين بوزن مريح',
      'ازفر أثناء رفع الوزن واستنشق عند إنزاله — ولا تحبس أنفاسك أبدًا',
      'ارتح لمدة 60–90 ثانية بين المجموعات',
      'أنهِ بتمددات لطيفة للعضلات التي دربتها',
    ],
  },
  tips: {
    en: [
      'Start with light weights and perfect your form before adding load',
      'Check your blood pressure before training and stop if it is very high',
      'Avoid heavy lifting and breath-holding, which can spike blood pressure',
    ],
    ar: [
      'ابدأ بأوزان خفيفة وأتقن الأداء قبل زيادة الوزن',
      'افحص ضغط دمك قبل التدريب وتوقف إذا كان مرتفعًا جدًا',
      'تجنب رفع الأوزان الثقيلة وحبس النفس لأنهما يرفعان ضغط الدم',
    ],
  },
};

const YOGA_STRESS: ExerciseGuide = {
  id: 'yoga-stress-relief',
  slug: 'yoga-stress-relief',
  category: 'mindbody',
  icon: '🧘',
  title: {
    en: 'Yoga for Stress Relief',
    ar: 'اليوغا لتخفيف التوتر',
    es: 'Yoga para Aliviar el Estrés',
    fr: 'Yoga pour Soulager le Stress',
    de: 'Yoga gegen Stress',
  },
  description: {
    en: 'Slow, mindful yoga combines gentle movement with breathing to calm your nervous system and lower stress hormones.',
    ar: 'تجمع اليوغا البطيئة والواعية بين الحركة اللطيفة والتنفس لتهدئة جهازك العصبي وخفض هرمونات التوتر.',
  },
  duration: 20,
  difficulty: 'easy',
  caloriesBurned: 70,
  equipment: 'mat',
  suitableFor: ['stress', 'hypertension'],
  benefits: {
    en: [
      'Lowers cortisol and activates the parasympathetic (rest-and-digest) system',
      'Reduces blood pressure and slows an overactive heart rate',
      'Deepens breathing, improving oxygen flow and lung capacity',
      'Improves flexibility, balance, and body awareness',
    ],
    ar: [
      'يخفض هرمون الكورتيزول وينشّط الجهاز العصبي اللاودي المسؤول عن الراحة',
      'يخفض ضغط الدم ويبطئ تسارع ضربات القلب',
      'يعمّق التنفس ويحسّن تدفق الأكسجين وسعة الرئتين',
      'يحسّن المرونة والتوازن والوعي بالجسم',
    ],
  },
  instructions: {
    en: [
      'Sit comfortably and take 5 slow, deep breaths to center yourself',
      'Move through gentle poses — Child\'s Pose, Cat-Cow, and Forward Fold',
      'Hold each pose for 30–60 seconds while breathing steadily',
      'Finish lying down in a relaxed position for 3 minutes of quiet breathing',
    ],
    ar: [
      'اجلس براحة وخذ 5 أنفاس عميقة وبطيئة لتركيز نفسك',
      'انتقل بين وضعيات لطيفة — وضعية الطفل وقطة-بقرة والانحناء للأمام',
      'اثبت في كل وضعية 30–60 ثانية مع تنفس منتظم',
      'أنهِ بالاستلقاء في وضع مريح لمدة 3 دقائق من التنفس الهادئ',
    ],
  },
  tips: {
    en: [
      'Use a yoga mat or soft surface to protect your knees and wrists',
      'Wear loose, comfortable clothing and practice in a quiet space',
      'Never force a stretch — move gently to your comfortable limit',
    ],
    ar: [
      'استخدم حصيرة يوغا أو سطحًا ناعمًا لحماية ركبتيك ومعصميك',
      'ارتدِ ملابس فضفاضة ومريحة ومارس في مكان هادئ',
      'لا تُجبر أي تمدد أبدًا — تحرك بلطف حتى حدودك المريحة',
    ],
  },
};

const SWIMMING: ExerciseGuide = {
  id: 'swimming-fitness',
  slug: 'swimming-fitness',
  category: 'cardio',
  icon: '🏊',
  title: {
    en: 'Swimming for Full-Body Fitness',
    ar: 'السباحة للياقة الجسم الكاملة',
    es: 'Natación para un Cuerpo en Forma',
    fr: 'Natation pour la Forme Complète',
    de: 'Schwimmen für die Ganzkörper-Fitness',
  },
  description: {
    en: 'Swimming works your whole body with zero impact on joints, making it ideal for arthritis, diabetes, and heart health.',
    ar: 'تشغّل السباحة الجسم كله دون أي تأثير على المفاصل، مما يجعلها مثالية لالتهاب المفاصل والسكري وصحة القلب.',
  },
  duration: 40,
  difficulty: 'medium',
  caloriesBurned: 300,
  equipment: 'none',
  suitableFor: ['cholesterol', 'diabetes', 'joints'],
  benefits: {
    en: [
      'Provides a full-body workout that burns significant calories',
      'Zero-impact exercise that protects knees, hips, and spine',
      'Improves lung capacity, circulation, and resting heart rate',
      'Naturally lowers blood pressure and improves cholesterol profile',
    ],
    ar: [
      'يوفر تمرينًا للجسم كاملًا يحرق سعرات حرارية كبيرة',
      'تمرين بدون أي تأثير يحمي الركبتين والوركين والعمود الفقري',
      'يحسّن سعة الرئتين والدورة الدموية ومعدل ضربات القلب أثناء الراحة',
      'يخفض ضغط الدم بشكل طبيعي ويحسّن مستويات الكوليسترول',
    ],
  },
  instructions: {
    en: [
      'Warm up with 5 minutes of easy swimming or water walking',
      'Swim for 25 minutes at a steady pace, alternating strokes to balance muscles',
      'Take short rest breaks at the pool edge whenever you need',
      'Cool down with 5 minutes of slow swimming and light stretching',
      'Rehydrate well after your session — swimming is sneaky, sweaty work',
    ],
    ar: [
      'سخّن لمدة 5 دقائق بسباحة سهلة أو مشي في الماء',
      'اسبح لمدة 25 دقيقة بوتيرة ثابتة، متناوبًا بين السباحات لتوازن العضلات',
      'خذ فترات راحة قصيرة عند حافة المسبح متى احتجت',
      'تبرّد لمدة 5 دقائق بسباحة بطيئة وتمددات خفيفة',
      'أعد ترطيب جسمك جيدًا بعد الجلسة — السباحة عمل يتعرق دون أن تشعر',
    ],
  },
  tips: {
    en: [
      'No goggles or cap? No problem — a relaxed breaststroke works fine too',
      'Swim with a buddy or in a supervised pool, especially if you have a heart condition',
      'Increase distance gradually: add 5 minutes each week',
    ],
    ar: [
      'لا تملك نظارات السباحة أو القبعة؟ لا مشكلة — سباحة الصدر المريحة مناسبة أيضًا',
      'اسبح مع صديق أو في مسبح خاضع للإشراف، خاصة إذا كنت تعاني من حالة قلبية',
      'زد المسافة تدريجيًا: أضف 5 دقائق كل أسبوع',
    ],
  },
};

const TAI_CHI: ExerciseGuide = {
  id: 'tai-chi-balance',
  slug: 'tai-chi-balance',
  category: 'mindbody',
  icon: '🌊',
  title: {
    en: 'Tai Chi for Balance & Mental Wellness',
    ar: 'التاي تشي للتوازن والصحة النفسية',
    es: 'Tai Chi para el Equilibrio y el Bienestar Mental',
    fr: 'Tai Chi pour l\'Équilibre et le Bien-Être Mental',
    de: 'Tai-Chi für Gleichgewicht und geistiges Wohlbefinden',
  },
  description: {
    en: 'Tai Chi\'s slow, flowing movements train your balance, calm your mind, and gently strengthen your whole body.',
    ar: 'تدرب حركات التاي تشي البطيئة والمتدفقة توازنك وتهدئ عقلك وتقوّي جسمك كله بلطف.',
  },
  duration: 25,
  difficulty: 'easy',
  caloriesBurned: 90,
  equipment: 'none',
  suitableFor: ['stress', 'joints'],
  benefits: {
    en: [
      'Sharply improves balance and reduces the risk of falls, especially with age',
      'Relieves stress and anxiety through focused, rhythmic movement',
      'Strengthens legs and core without stressing the joints',
      'Improves sleep quality and overall mental wellbeing',
    ],
    ar: [
      'يحسّن التوازن بشكل ملحوظ ويقلل خطر السقوط، خاصة مع تقدم العمر',
      'يخفف التوتر والقلق من خلال حركة إيقاعية مركزة',
      'يقوّي الساقين والمنطقة الوسطى دون إجهاد المفاصل',
      'يحسّن جودة النوم والصحة النفسية بشكل عام',
    ],
  },
  instructions: {
    en: [
      'Stand with feet shoulder-width apart, knees soft, and shoulders relaxed',
      'Shift weight slowly and smoothly from one leg to the other',
      'Follow with flowing arm movements that match each step',
      'Breathe deeply and rhythmically with every movement',
      'Repeat the sequence slowly for 20 minutes, focusing on control',
    ],
    ar: [
      'قف بقدمين بعرض الكتفين مع ليونة في الركبتين وارتخاء الكتفين',
      'انقل وزنك ببطء وسلاسة من ساق إلى أخرى',
      'تابع بحركات ذراع متدفقة تتناسب مع كل خطوة',
      'تنفس بعمق وبإيقاع منتظم مع كل حركة',
      'كرر التسلسل ببطء لمدة 20 دقيقة مع التركيز على التحكم',
    ],
  },
  tips: {
    en: [
      'Practice on a flat, non-slip surface in comfortable flat shoes or barefoot',
      'Follow a beginner video or class to learn the basic posture sequence',
      'Focus on your breathing rather than how "perfect" the moves look',
    ],
    ar: [
      'مارس على سطح مستوٍ غير قابل للانزلاق بأحذية مسطحة مريحة أو حافي القدمين',
      'اتبع فيديو أو صفًا للمبتدئين لتعلّم تسلسل الوضعيات الأساسي',
      'ركّز على تنفسك بدلًا من مدى "مثالية" الحركات',
    ],
  },
};

export const EXERCISE_GUIDES: ExerciseGuide[] = [WALKING, LOW_IMPACT_CARDIO, STRENGTH_HYPERTENSION, YOGA_STRESS, SWIMMING, TAI_CHI];

export const getExerciseGuideBySlug = (slug: string): ExerciseGuide | undefined =>
  EXERCISE_GUIDES.find((g) => g.slug === slug);