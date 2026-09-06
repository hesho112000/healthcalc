import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES_DATABASE } from '../data/exercises';
import { FOODS_DATABASE, type FoodItem } from '../utils/calculations';
import { ANIME_IMAGES } from '../utils/animeImages';
import { useLanguage } from '../context/LanguageContext';

type ConditionId = 'diabetes' | 'hypertension' | 'cholesterol' | 'gout' | 'liver' | 'kidney' | 'thyroid' | 'ibs';
type LabValues = Record<string, string>;
type LangStrings = { en: string; fr: string; es: string; ar: string };

const conditions: { id: ConditionId; icon: string; name: LangStrings; desc: LangStrings; interp: LangStrings }[] = [
  {
    id: 'diabetes', icon: '🩸',
    name: { en: 'Diabetes', fr: 'Diabetes', es: 'Diabetes', ar: 'سكر' },
    desc: { en: 'Diabetes affects blood sugar regulation. Controlling carbohydrates and starches is essential to maintain stable levels.', fr: 'Diabetes affects blood sugar regulation. Controlling carbohydrates and starches is essential to maintain stable levels.', es: 'Diabetes affects blood sugar regulation. Controlling carbohydrates and starches is essential to maintain stable levels.', ar: 'مرض السكري يؤثر على تنظيم سكر الدم. التحكم في الكربوهيدرات والنشويات ضروري للحفاظ على مستويات مستقرة.' },
    interp: { en: 'HbA1c below 5.7% is normal, 5.7–6.4% is prediabetes, and 6.5% or more indicates diabetes. Fasting glucose of 126 mg/dL or higher indicates diabetes.', fr: 'HbA1c below 5.7% is normal, 5.7–6.4% is prediabetes, and 6.5% or more indicates diabetes. Fasting glucose of 126 mg/dL or higher indicates diabetes.', es: 'HbA1c below 5.7% is normal, 5.7–6.4% is prediabetes, and 6.5% or more indicates diabetes. Fasting glucose of 126 mg/dL or higher indicates diabetes.', ar: 'HbA1c أقل من 5.7% طبيعي، من 5.7 إلى 6.4% مقدمات سكري، و6.5% أو أكثر يشير إلى سكري. سكر الصائم 126 mg/dL أو أكثر مؤشر للسكري.' },
  },
  {
    id: 'hypertension', icon: '💗',
    name: { en: 'Hypertension', fr: 'Hypertension', es: 'Hypertension', ar: 'ضغط' },
    desc: { en: 'High blood pressure puts extra strain on the heart and blood vessels. Reducing salt and maintaining a healthy weight are essential.', fr: 'High blood pressure puts extra strain on the heart and blood vessels. Reducing salt and maintaining a healthy weight are essential.', es: 'High blood pressure puts extra strain on the heart and blood vessels. Reducing salt and maintaining a healthy weight are essential.', ar: 'ارتفاع ضغط الدم يزيد الضغط على القلب والأوعية. تقليل الملح والحفاظ على وزن صحي أساسيان.' },
    interp: { en: 'A reading below 120/80 mmHg is normal, while 130/80 or higher is considered high blood pressure.', fr: 'A reading below 120/80 mmHg is normal, while 130/80 or higher is considered high blood pressure.', es: 'A reading below 120/80 mmHg is normal, while 130/80 or higher is considered high blood pressure.', ar: 'قراءة أقل من 120/80 مم زئبق طبيعية، و130/80 أو أكثر تُعد ارتفاعاً في ضغط الدم.' },
  },
  {
    id: 'cholesterol', icon: '🫀',
    name: { en: 'Cholesterol', fr: 'Cholesterol', es: 'Cholesterol', ar: 'كوليسترول' },
    desc: { en: 'High cholesterol builds up in the arteries and raises the risk of heart disease. Saturated fats are the main enemy.', fr: 'High cholesterol builds up in the arteries and raises the risk of heart disease. Saturated fats are the main enemy.', es: 'High cholesterol builds up in the arteries and raises the risk of heart disease. Saturated fats are the main enemy.', ar: 'الكوليسترول المرتفع يتراكم في الشرايين ويرفع خطر أمراض القلب. الدهون المشبعة هي العدو الرئيسي.' },
    interp: { en: 'Total cholesterol below 200 mg/dL is desirable, LDL below 100, HDL above 40, and triglycerides below 150.', fr: 'Total cholesterol below 200 mg/dL is desirable, LDL below 100, HDL above 40, and triglycerides below 150.', es: 'Total cholesterol below 200 mg/dL is desirable, LDL below 100, HDL above 40, and triglycerides below 150.', ar: 'الكوليسترول الكلي أقل من 200 mg/dL مرغوب، LDL أقل من 100، HDL فوق 40، والدهون الثلاثية أقل من 150.' },
  },
  {
    id: 'gout', icon: '🦶',
    name: { en: 'Gout', fr: 'Gout', es: 'Gout', ar: 'نقرس' },
    desc: { en: 'Gout occurs due to uric acid buildup. Reducing red meat and high-purine foods eases flare-ups.', fr: 'Gout occurs due to uric acid buildup. Reducing red meat and high-purine foods eases flare-ups.', es: 'Gout occurs due to uric acid buildup. Reducing red meat and high-purine foods eases flare-ups.', ar: 'النقرس يحدث بسبب تراكم حمض اليوريك. تقليل اللحوم الحمراء والمأكولات عالية البيورين يخفف النوبات.' },
    interp: { en: 'Uric acid up to 6.8 mg/dL is normal, and higher increases the risk of gout attacks.', fr: 'Uric acid up to 6.8 mg/dL is normal, and higher increases the risk of gout attacks.', es: 'Uric acid up to 6.8 mg/dL is normal, and higher increases the risk of gout attacks.', ar: 'حمض اليوريك حتى 6.8 mg/dL طبيعي، وأعلى من ذلك يزيد خطر نوبات النقرس.' },
  },
  {
    id: 'liver', icon: '🧡',
    name: { en: 'Liver health', fr: 'Liver health', es: 'Liver health', ar: 'كبد' },
    desc: { en: 'Liver health reflects on metabolism. Excess fat and excess sugar burden the liver.', fr: 'Liver health reflects on metabolism. Excess fat and excess sugar burden the liver.', es: 'Liver health reflects on metabolism. Excess fat and excess sugar burden the liver.', ar: 'صحة الكبد تنعكس على التمثيل الغذائي. الدهون الزائدة والسكر الزائد يثقلان الكبد.' },
    interp: { en: 'ALT is normally 7–56 U/L and AST 10–40 U/L; elevation indicates liver stress.', fr: 'ALT is normally 7–56 U/L and AST 10–40 U/L; elevation indicates liver stress.', es: 'ALT is normally 7–56 U/L and AST 10–40 U/L; elevation indicates liver stress.', ar: 'ALT طبيعي 7–56 U/L وAST 10–40 U/L، والارتفاع يشير إلى إجهاد كبدي.' },
  },
  {
    id: 'kidney', icon: '🫘',
    name: { en: 'CKD kidney', fr: 'CKD kidney', es: 'CKD kidney', ar: 'كلى' },
    desc: { en: 'The kidneys filter blood and balance fluids. Controlling protein, sodium, and potassium protects them.', fr: 'The kidneys filter blood and balance fluids. Controlling protein, sodium, and potassium protects them.', es: 'The kidneys filter blood and balance fluids. Controlling protein, sodium, and potassium protects them.', ar: 'الكلى ترشح الدم وتوازن السوائل. التحكم في البروتين والصوديوم والبوتاسيوم يحميها.' },
    interp: { en: 'eGFR above 90 ml/min is normal, and creatinine 0.6–1.3 mg/dL. Low eGFR indicates impaired kidney function.', fr: 'eGFR above 90 ml/min is normal, and creatinine 0.6–1.3 mg/dL. Low eGFR indicates impaired kidney function.', es: 'eGFR above 90 ml/min is normal, and creatinine 0.6–1.3 mg/dL. Low eGFR indicates impaired kidney function.', ar: 'eGFR فوق 90 ml/min طبيعي، والكرياتينين 0.6–1.3 mg/dL. انخفاض eGFR يشير إلى ضعف وظائف الكلى.' },
  },
  {
    id: 'thyroid', icon: '🦋',
    name: { en: 'Thyroid', fr: 'Thyroid', es: 'Thyroid', ar: 'غدة درقية' },
    desc: { en: 'The thyroid controls metabolic rate. Its imbalance causes changes in weight and energy.', fr: 'The thyroid controls metabolic rate. Its imbalance causes changes in weight and energy.', es: 'The thyroid controls metabolic rate. Its imbalance causes changes in weight and energy.', ar: 'الغدة الدرقية تتحكم في معدل الأيض. الخلل فيها يسبب تغيرات في الوزن والطاقة.' },
    interp: { en: 'TSH is normally 0.4–4.0 mIU/L; high TSH suggests an underactive thyroid and low TSH an overactive one.', fr: 'TSH is normally 0.4–4.0 mIU/L; high TSH suggests an underactive thyroid and low TSH an overactive one.', es: 'TSH is normally 0.4–4.0 mIU/L; high TSH suggests an underactive thyroid and low TSH an overactive one.', ar: 'TSH طبيعي 0.4–4.0 mIU/L، وارتفاعه يشير إلى كسل بالغدة وانخفاضه إلى فرط نشاط.' },
  },
  {
    id: 'ibs', icon: '🌿',
    name: { en: 'IBS', fr: 'IBS', es: 'IBS', ar: 'قولون' },
    desc: { en: 'Irritable bowel syndrome affects the digestive system. There is no specific test; we rely on symptoms and dietary response.', fr: 'Irritable bowel syndrome affects the digestive system. There is no specific test; we rely on symptoms and dietary response.', es: 'Irritable bowel syndrome affects the digestive system. There is no specific test; we rely on symptoms and dietary response.', ar: 'متلازمة القولون العصبي تؤثر على الجهاز الهضمي. لا يوجد تحليل محدد، ونعتمد على الأعراض والاستجابة الغذائية.' },
    interp: { en: 'There is no specific test — we will assess symptoms and recommend a colon-friendly diet.', fr: 'There is no specific test — we will assess symptoms and recommend a colon-friendly diet.', es: 'There is no specific test — we will assess symptoms and recommend a colon-friendly diet.', ar: 'لا يوجد تحليل محدد — سنقيم الأعراض ونرشح نظاماً غذائياً مريحاً للقولون.' },
  },
];

const labFields: Record<Exclude<ConditionId, 'ibs'>, { key: string; unit: string; label: LangStrings; hint: LangStrings }[]> = {
  diabetes: [
    { key: 'fasting', unit: 'mg/dL', label: { en: 'Fasting glucose', fr: 'Fasting glucose', es: 'Fasting glucose', ar: 'سكر صائم' }, hint: { en: 'Normal below 100', fr: 'Normal below 100', es: 'Normal below 100', ar: 'طبيعي أقل من 100' } },
    { key: 'hba1c', unit: '%', label: { en: 'HbA1c', fr: 'HbA1c', es: 'HbA1c', ar: 'HbA1c' }, hint: { en: 'Normal below 5.7', fr: 'Normal below 5.7', es: 'Normal below 5.7', ar: 'طبيعي أقل من 5.7' } },
  ],
  hypertension: [
    { key: 'systolic', unit: 'mmHg', label: { en: 'Systolic pressure', fr: 'Systolic pressure', es: 'Systolic pressure', ar: 'الضغط الانقباضي' }, hint: { en: 'Target below 130', fr: 'Target below 130', es: 'Target below 130', ar: 'الهدف أقل من 130' } },
    { key: 'diastolic', unit: 'mmHg', label: { en: 'Diastolic pressure', fr: 'Diastolic pressure', es: 'Diastolic pressure', ar: 'الضغط الانبساطي' }, hint: { en: 'Target below 80', fr: 'Target below 80', es: 'Target below 80', ar: 'الهدف أقل من 80' } },
  ],
  gout: [{ key: 'uricAcid', unit: 'mg/dL', label: { en: 'Uric acid', fr: 'Uric acid', es: 'Uric acid', ar: 'حمض اليوريك' }, hint: { en: 'High above 6.8', fr: 'High above 6.8', es: 'High above 6.8', ar: 'مرتفع فوق 6.8' } }],
  cholesterol: [
    { key: 'total', unit: 'mg/dL', label: { en: 'Total cholesterol', fr: 'Total cholesterol', es: 'Total cholesterol', ar: 'الكوليسترول الكلي' }, hint: { en: 'Ideal below 200', fr: 'Ideal below 200', es: 'Ideal below 200', ar: 'مثالي أقل من 200' } },
    { key: 'ldl', unit: 'mg/dL', label: { en: 'LDL', fr: 'LDL', es: 'LDL', ar: 'LDL' }, hint: { en: 'Target below 100', fr: 'Target below 100', es: 'Target below 100', ar: 'الهدف أقل من 100' } },
    { key: 'hdl', unit: 'mg/dL', label: { en: 'HDL', fr: 'HDL', es: 'HDL', ar: 'HDL' }, hint: { en: 'Best above 40', fr: 'Best above 40', es: 'Best above 40', ar: 'الأفضل فوق 40' } },
    { key: 'triglycerides', unit: 'mg/dL', label: { en: 'Triglycerides', fr: 'Triglycerides', es: 'Triglycerides', ar: 'الدهون الثلاثية' }, hint: { en: 'Normal below 150', fr: 'Normal below 150', es: 'Normal below 150', ar: 'طبيعي أقل من 150' } },
  ],
  liver: [
    { key: 'alt', unit: 'U/L', label: { en: 'ALT', fr: 'ALT', es: 'ALT', ar: 'ALT' }, hint: { en: 'Normal 7–56', fr: 'Normal 7–56', es: 'Normal 7–56', ar: 'الطبيعي 7–56' } },
    { key: 'ast', unit: 'U/L', label: { en: 'AST', fr: 'AST', es: 'AST', ar: 'AST' }, hint: { en: 'Normal 10–40', fr: 'Normal 10–40', es: 'Normal 10–40', ar: 'الطبيعي 10–40' } },
    { key: 'bilirubin', unit: 'mg/dL', label: { en: 'Bilirubin', fr: 'Bilirubin', es: 'Bilirubin', ar: 'Bilirubin' }, hint: { en: 'Normal below 1.2', fr: 'Normal below 1.2', es: 'Normal below 1.2', ar: 'الطبيعي أقل من 1.2' } },
  ],
  kidney: [
    { key: 'creatinine', unit: 'mg/dL', label: { en: 'Creatinine', fr: 'Creatinine', es: 'Creatinine', ar: 'Creatinine' }, hint: { en: 'Normal 0.6–1.3', fr: 'Normal 0.6–1.3', es: 'Normal 0.6–1.3', ar: 'الطبيعي 0.6–1.3' } },
    { key: 'egfr', unit: 'mL/min', label: { en: 'eGFR', fr: 'eGFR', es: 'eGFR', ar: 'eGFR' }, hint: { en: 'Normal above 90', fr: 'Normal above 90', es: 'Normal above 90', ar: 'الطبيعي فوق 90' } },
    { key: 'potassium', unit: 'mmol/L', label: { en: 'Potassium', fr: 'Potassium', es: 'Potassium', ar: 'Potassium' }, hint: { en: 'Normal 3.5–5.0', fr: 'Normal 3.5–5.0', es: 'Normal 3.5–5.0', ar: 'الطبيعي 3.5–5.0' } },
  ],
  thyroid: [
    { key: 'tsh', unit: 'mIU/L', label: { en: 'TSH', fr: 'TSH', es: 'TSH', ar: 'TSH' }, hint: { en: 'Normal 0.4–4.0', fr: 'Normal 0.4–4.0', es: 'Normal 0.4–4.0', ar: 'الطبيعي 0.4–4.0' } },
    { key: 't3', unit: 'ng/dL', label: { en: 'T3', fr: 'T3', es: 'T3', ar: 'T3' }, hint: { en: 'Per lab reference', fr: 'Per lab reference', es: 'Per lab reference', ar: 'حسب معمل التحليل' } },
    { key: 't4', unit: 'µg/dL', label: { en: 'T4', fr: 'T4', es: 'T4', ar: 'T4' }, hint: { en: 'Per lab reference', fr: 'Per lab reference', es: 'Per lab reference', ar: 'حسب معمل التحليل' } },
  ],
};

const cuisines = [
  ['🇪🇬', 'Egyptian'], ['🇮🇳', 'Indian'], ['🇸🇦', 'Arabic'], ['🇬🇷', 'Mediterranean'],
  ['🌏', 'Asian'], ['🇺🇸', 'American'], ['🥗', 'Vegetarian'], ['🥑', 'Keto'],
];

const imageForStep = (step: number) => {
  if (step === 1 || step === 2) return ANIME_IMAGES.care;
  if (step === 4) return ANIME_IMAGES.lab;
  if (step === 5 || step === 6) return ANIME_IMAGES.plan;
  return ANIME_IMAGES.calculator;
};

const UI = {
  step1Title: { en: 'Choose your health condition', fr: 'Choose your health condition', es: 'Choose your health condition', ar: 'اختر حالتك الصحية' },
  step2Title: { en: 'Have you had any lab tests recently?', fr: 'Have you had any lab tests recently?', es: 'Have you had any lab tests recently?', ar: 'هل أجريت تحاليل مؤخراً؟' },
  step3Title: { en: 'Your basic information', fr: 'Your basic information', es: 'Your basic information', ar: 'معلوماتك الأساسية' },
  step4Title: { en: 'Enter your lab results', fr: 'Enter your lab results', es: 'Enter your lab results', ar: 'أدخل نتائج تحاليلك' },
  step5Title: { en: 'Choose how you want your plan ✨', fr: 'Choose how you want your plan ✨', es: 'Choose how you want your plan ✨', ar: 'اختر كيف تريد خطتك ✨' },
  step6Title: { en: 'Build your personal plan', fr: 'Build your personal plan', es: 'Build your personal plan', ar: 'ابنِ خطتك الشخصية' },
  introSubtitle: { en: 'Simple steps, clearer recommendations, and an experience designed around your condition.', fr: 'Simple steps, clearer recommendations, and an experience designed around your condition.', es: 'Simple steps, clearer recommendations, and an experience designed around your condition.', ar: 'خطوات بسيطة، توصيات أوضح، وتجربة مصممة حول حالتك.' },
  advancedCarePill: { en: 'ADVANCED CARE', fr: 'ADVANCED CARE', es: 'ADVANCED CARE', ar: 'ADVANCED CARE' },
  back: { en: '← Previous', fr: '← Previous', es: '← Previous', ar: '→ السابق' },
  home: { en: '← Home', fr: '← Home', es: '← Home', ar: '← الرئيسية' },
  chooseMultipleHint: { en: 'You can select more than one condition', fr: 'You can select more than one condition', es: 'You can select more than one condition', ar: 'يمكنك اختيار أكثر من حالة' },
  next: { en: 'Next →', fr: 'Next →', es: 'Next →', ar: 'التالي ←' },
  selectedCount: { en: '{count} conditions selected', fr: '{count} conditions selected', es: '{count} conditions selected', ar: '{count} حالات محددة' },
  summaryStrip: { en: 'Age {age} · {height} cm · {weight} kg · {count} conditions', fr: 'Age {age} · {height} cm · {weight} kg · {count} conditions', es: 'Age {age} · {height} cm · {weight} kg · {count} conditions', ar: 'العمر {age} · {height} cm · {weight} kg · {count} حالات' },
  labsIntro: { en: 'Having lab results helps us give a more personalized reading.', fr: 'Having lab results helps us give a more personalized reading.', es: 'Having lab results helps us give a more personalized reading.', ar: 'وجود التحاليل يساعدنا على تقديم قراءة أكثر تخصيصاً.' },
  yesHasLabs: { en: 'Yes, I had lab tests', fr: 'Yes, I had lab tests', es: 'Yes, I had lab tests', ar: 'نعم، أجريت تحاليل' },
  noHasLabs: { en: 'No, I have not had lab tests yet', fr: 'No, I have not had lab tests yet', es: 'No, I have not had lab tests yet', ar: 'لا، لم أجر تحاليل بعد' },
  labsYesSub: { en: 'Have your lab results in front of you', fr: 'Have your lab results in front of you', es: 'Have your lab results in front of you', ar: 'جهّز نتيجة التحاليل أمامك' },
  labsNoSub: { en: 'We will start with the basic information', fr: 'We will start with the basic information', es: 'We will start with the basic information', ar: 'سنبدأ بالمعلومات الأساسية' },
  labsNote: { en: 'Note: have your lab result in front of you 📋', fr: 'Note: have your lab result in front of you 📋', es: 'Note: have your lab result in front of you 📋', ar: 'ملاحظة: جهز نتيجة التحاليل أمامك 📋' },
  age: { en: 'Age', fr: 'Age', es: 'Age', ar: 'العمر' },
  height: { en: 'Height (cm)', fr: 'Height (cm)', es: 'Height (cm)', ar: 'الطول (cm)' },
  weight: { en: 'Weight (kg)', fr: 'Weight (kg)', es: 'Weight (kg)', ar: 'الوزن (kg)' },
  gender: { en: 'Gender', fr: 'Gender', es: 'Gender', ar: 'النوع' },
  maleLabel: { en: '♂ Male', fr: '♂ Male', es: '♂ Male', ar: '♂ ذكر' },
  femaleLabel: { en: '♀ Female', fr: '♀ Female', es: '♀ Female', ar: '♀ أنثى' },
  labInterpretation: { en: 'Test interpretation', fr: 'Test interpretation', es: 'Test interpretation', ar: 'تفسير التحليل' },
  ibsNote: { en: 'There is no specific test for IBS - we will rely on symptoms', fr: 'There is no specific test for IBS - we will rely on symptoms', es: 'There is no specific test for IBS - we will rely on symptoms', ar: 'لا يوجد تحليل محدد لـ IBS - سنعتمد على الأعراض' },
  ibsBloating: { en: 'Bloating', fr: 'Bloating', es: 'Bloating', ar: 'انتفاخ' },
  ibsPain: { en: 'Pain', fr: 'Pain', es: 'Pain', ar: 'ألم' },
  readyFromBasics: { en: '✓ We will build your plan from your basic information', fr: '✓ We will build your plan from your basic information', es: '✓ We will build your plan from your basic information', ar: '✓ سنبني الخطة من معلوماتك الأساسية' },
  readyComplete: { en: '✓ Data complete — ready for interpretation', fr: '✓ Data complete — ready for interpretation', es: '✓ Data complete — ready for interpretation', ar: '✓ البيانات مكتملة — جاهز للتفسير' },
  readyIncomplete: { en: 'Enter all required values to continue', fr: 'Enter all required values to continue', es: 'Enter all required values to continue', ar: 'أدخل كل القيم المطلوبة للمتابعة' },
  generatePlan: { en: 'Start generating the plan ✨', fr: 'Start generating the plan ✨', es: 'Start generating the plan ✨', ar: 'ابدأ بتوليد الخطة ✨' },
  exercisePlanHeader: { en: 'Exercise plan', fr: 'Exercise plan', es: 'Exercise plan', ar: 'خطة التمارين' },
  nutritionPlanHeader: { en: 'Nutrition plan', fr: 'Nutrition plan', es: 'Nutrition plan', ar: 'خطة التغذية' },
  exerciseChooseTitle: { en: '🏋️ Choose your exercises yourself', fr: '🏋️ Choose your exercises yourself', es: '🏋️ Choose your exercises yourself', ar: '🏋️ اختر تمرينك بنفسك' },
  exerciseChooseDesc: { en: 'Browse all exercises and pick what you like', fr: 'Browse all exercises and pick what you like', es: 'Browse all exercises and pick what you like', ar: 'تصفح كل التمارين واختر ما تحبه' },
  exerciseRecommendTitle: { en: '🪄 Our recommendations', fr: '🪄 Our recommendations', es: '🪄 Our recommendations', ar: '🪄 توصياتنا' },
  exerciseRecommendDesc: { en: 'We recommend exercises suitable for your condition', fr: 'We recommend exercises suitable for your condition', es: 'We recommend exercises suitable for your condition', ar: 'نرشح لك تمارين مناسبة لحالتك' },
  nutritionChooseTitle: { en: '🥗 Choose your food yourself', fr: '🥗 Choose your food yourself', es: '🥗 Choose your food yourself', ar: '🥗 اختر طعامك بنفسك' },
  nutritionChooseDesc: { en: 'Choose the cuisines and meals you like', fr: 'Choose the cuisines and meals you like', es: 'Choose the cuisines and meals you like', ar: 'اختر المطبخ والوجبات التي تحبها' },
  nutritionRecommendTitle: { en: '📍 Let the site recommend for you', fr: '📍 Let the site recommend for you', es: '📍 Let the site recommend for you', ar: '📍 دع الموقع يرشح لك' },
  nutritionRecommendDesc: { en: 'Diverse suggestions based on your region', fr: 'Diverse suggestions based on your region', es: 'Diverse suggestions based on your region', ar: 'اقتراحات متنوعة حسب منطقتك' },
  viewPlan: { en: 'View the plan →', fr: 'View the plan →', es: 'View the plan →', ar: 'عرض الخطة ←' },
  fileReady: { en: '✓ Your profile is ready', fr: '✓ Your profile is ready', es: '✓ Your profile is ready', ar: '✓ ملفك جاهز' },
  exerciseHeader: { en: 'Exercises', fr: 'Exercises', es: 'Exercises', ar: 'التمارين' },
  recommended: { en: 'recommended', fr: 'recommended', es: 'recommended', ar: 'المقترحة' },
  exerciseRecommendText: { en: 'A 3-day weekly plan with moderate-intensity exercises, taking into account {conditions} and gradually increasing effort.', fr: 'A 3-day weekly plan with moderate-intensity exercises, taking into account {conditions} and gradually increasing effort.', es: 'A 3-day weekly plan with moderate-intensity exercises, taking into account {conditions} and gradually increasing effort.', ar: 'خطة 3 أيام أسبوعياً بتمارين متوسطة الشدة، مع مراعاة {conditions} وتدرج الجهد.' },
  nutritionHeader: { en: 'Nutrition', fr: 'Nutrition', es: 'Nutrition', ar: 'التغذية' },
  nutritionRecommendText: { en: 'Based on your location in Egypt — we suggest a variety of Mediterranean and Egyptian dishes, with options suitable for your conditions: {conditions}. The choices were selected to be diverse and low-glycemic-index when needed.', fr: 'Based on your location in Egypt — we suggest a variety of Mediterranean and Egyptian dishes, with options suitable for your conditions: {conditions}. The choices were selected to be diverse and low-glycemic-index when needed.', es: 'Based on your location in Egypt — we suggest a variety of Mediterranean and Egyptian dishes, with options suitable for your conditions: {conditions}. The choices were selected to be diverse and low-glycemic-index when needed.', ar: 'حسب موقعك في مصر — نقترح أطباقاً متوسطية ومصرية متنوعة، مع خيارات مناسبة لحالاتك: {conditions}. تم الاختيار لتكون متنوعة ومنخفضة المؤشر الجلايسيمي عند الحاجة.' },
  mealBreakfast: { en: 'breakfast', fr: 'breakfast', es: 'breakfast', ar: 'breakfast' },
  mealLunch: { en: 'lunch', fr: 'lunch', es: 'lunch', ar: 'lunch' },
  mealDinner: { en: 'dinner', fr: 'dinner', es: 'dinner', ar: 'dinner' },
  mealSnack: { en: 'snack', fr: 'snack', es: 'snack', ar: 'snack' },
  savePlan: { en: 'Save the plan ✓', fr: 'Save the plan ✓', es: 'Save the plan ✓', ar: 'حفظ الخطة ✓' },
  listSeparator: { en: ', ', fr: ', ', es: ', ', ar: '، ' },
};

const AdvancedCarePage: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<ConditionId[]>([]);
  const [hasLabs, setHasLabs] = useState<boolean | null>(null);
  const [profile, setProfile] = useState({ age: 35, height: 170, weight: 70, gender: 'male' });
  const [labs, setLabs] = useState<LabValues>({});
  const [exerciseMode, setExerciseMode] = useState<'choose' | 'recommend'>('recommend');
  const [nutritionMode, setNutritionMode] = useState<'choose' | 'recommend'>('recommend');
  const [cuisine, setCuisine] = useState('Egyptian');
  const [mealType, setMealType] = useState<FoodItem['mealType']>('lunch');
  const [pickedExercises, setPickedExercises] = useState<string[]>([]);
  const [pickedMeals, setPickedMeals] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('hc_advanced_care');
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<{
        step: number;
        selected: ConditionId[];
        hasLabs: boolean | null;
        profile: typeof profile;
        labs: LabValues;
        exerciseMode: 'choose' | 'recommend';
        nutritionMode: 'choose' | 'recommend';
        cuisine: string;
        pickedExercises: string[];
        pickedMeals: string[];
      }>;
      if (Array.isArray(parsed.selected)) setSelected(parsed.selected.filter((id) => conditions.some((condition) => condition.id === id)));
      if (typeof parsed.hasLabs === 'boolean' || parsed.hasLabs === null) setHasLabs(parsed.hasLabs);
      if (parsed.profile && typeof parsed.profile.age === 'number' && typeof parsed.profile.height === 'number' && typeof parsed.profile.weight === 'number') setProfile(parsed.profile);
      if (parsed.labs && typeof parsed.labs === 'object') setLabs(parsed.labs);
      if (parsed.exerciseMode === 'choose' || parsed.exerciseMode === 'recommend') setExerciseMode(parsed.exerciseMode);
      if (parsed.nutritionMode === 'choose' || parsed.nutritionMode === 'recommend') setNutritionMode(parsed.nutritionMode);
      if (typeof parsed.cuisine === 'string') setCuisine(parsed.cuisine);
      if (Array.isArray(parsed.pickedExercises)) setPickedExercises(parsed.pickedExercises);
      if (Array.isArray(parsed.pickedMeals)) setPickedMeals(parsed.pickedMeals);
      if (typeof parsed.step === 'number' && parsed.step >= 1 && parsed.step <= 6) setStep(parsed.step);
    } catch {
      localStorage.removeItem('hc_advanced_care');
    }
  }, []);

  const activeFields = useMemo(
    () => selected.flatMap((id) => id === 'ibs' ? [] : labFields[id]),
    [selected],
  );
  const labReady = hasLabs === false || selected.every((id) => id === 'ibs' || (labFields[id].every((field) => labs[field.key]?.trim())));
  const filteredMeals = useMemo(
    () => FOODS_DATABASE.filter((food) => food.cuisine.some((item) => item.toLowerCase().includes(cuisine.toLowerCase())) && (!food.mealType || food.mealType === mealType)).slice(0, 8),
    [cuisine, mealType],
  );
  const filteredExercises = useMemo(
    () => EXERCISES_DATABASE.filter((exercise) => !selected.includes('gout') || !exercise.contraindications?.includes('knee')).slice(0, 9),
    [selected],
  );

  const save = (nextStep: number) => {
    localStorage.setItem('hc_advanced_care', JSON.stringify({ step: nextStep, selected, hasLabs, profile, labs, exerciseMode, nutritionMode, cuisine, pickedExercises, pickedMeals }));
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const toggleCondition = (id: ConditionId) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const L = (k: keyof typeof UI): string => UI[k][language];
  const stepTitle = [L('step1Title'), L('step2Title'), L('step3Title'), L('step4Title'), L('step5Title'), L('step6Title')][step - 1];
  const nameKey = ({ en: 'nameEn', fr: 'nameFr', es: 'nameEs', ar: 'nameAr' } as const)[language];
  const conditionList = selected.map((id) => conditions.find((item) => item.id === id)?.name[language] ?? '').filter(Boolean).join(UI.listSeparator[language]);
  const summaryStrip = UI.summaryStrip[language].replace('{age}', String(profile.age)).replace('{height}', String(profile.height)).replace('{weight}', String(profile.weight)).replace('{count}', String(selected.length));
  const selectedCountLabel = UI.selectedCount[language].replace('{count}', String(selected.length));
  const exerciseRecommendText = UI.exerciseRecommendText[language].replace('{conditions}', conditionList);
  const nutritionRecommendText = UI.nutritionRecommendText[language].replace('{conditions}', conditionList);

  return (
    <div className="tool-page advanced-care-page min-h-screen bg-slate-50 pb-16" dir={dir}>
      <div className="care-progress"><span style={{ width: `${(step / 6) * 100}%` }} /></div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div><span className="step-pill purple">{L('advancedCarePill')} · {step}/6</span><h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3">{stepTitle}</h1><p className="text-slate-500 mt-2">{L('introSubtitle')}</p></div>
          {step > 1 && <button type="button" onClick={() => { setStep((current) => current - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-outline hidden sm:inline-flex">{L('back')}</button>}
          <Link to="/" className="btn-ghost hidden sm:inline-flex">{L('home')}</Link>
        </div>

        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-start">
          <div className="care-illustration"><img src={imageForStep(step)} alt="" /><span className="sparkle sparkle-a">✦</span><span className="sparkle sparkle-b">✨</span></div>
          <div className="card !rounded-3xl min-h-[430px] care-step" key={step}>
            {step === 1 && <><p className="text-slate-500 mb-6">{L('chooseMultipleHint')}</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{conditions.map((condition) => <button key={condition.id} type="button" onClick={() => toggleCondition(condition.id)} className={`condition-choice ${selected.includes(condition.id) ? 'selected' : ''}`}><span>{condition.icon}</span><strong>{condition.name[language]}</strong>{selected.includes(condition.id) && <b className="choice-check">✓</b>}</button>)}</div>{selected.length > 0 && <div className="mt-5 space-y-2">{selected.map((id) => { const c = conditions.find((item) => item.id === id); return c ? <div key={id} className="rounded-2xl bg-white border border-slate-200 p-4 text-sm text-slate-700 flex gap-3"><span className="text-xl shrink-0">{c.icon}</span><div><b className="text-slate-900">{c.name[language]}</b><p className="mt-0.5 text-slate-500 leading-relaxed">{c.desc[language]}</p></div></div> : null; })}</div>}<p className="text-sm text-emerald-700 font-bold mt-5">{selectedCountLabel}</p><button disabled={!selected.length} onClick={() => save(2)} className="btn-primary w-full mt-6 disabled:opacity-40">{L('next')}</button></>}
            {step === 2 && <div className="space-y-4"><p className="text-slate-500 mb-6">{L('labsIntro')}</p><div className="grid md:grid-cols-2 gap-4">{[[true, L('yesHasLabs'), '📋'], [false, L('noHasLabs'), '🌱']].map(([value, label, icon]) => <button key={String(value)} onClick={() => setHasLabs(value as boolean)} className={`choice-card ${hasLabs === value ? 'selected' : ''}`}><span>{icon}</span><strong>{label}</strong><small>{value ? L('labsYesSub') : L('labsNoSub')}</small></button>)}</div>{hasLabs === true && <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3 animate-fade-in">{L('labsNote')}</p>}<button disabled={hasLabs === null} onClick={() => save(3)} className="btn-primary w-full mt-5 disabled:opacity-40">{L('next')}</button></div>}
            {step === 3 && <><div className="flex flex-wrap gap-2 mb-6">{selected.map((id) => <span key={id} className="badge-primary">{conditions.find((item) => item.id === id)?.icon} {conditions.find((item) => item.id === id)?.name[language]} <button onClick={() => toggleCondition(id)}>×</button></span>)}</div><div className="grid sm:grid-cols-2 gap-4"><label className="care-label">{L('age')} <output>{profile.age}</output><input type="range" min="18" max="80" value={profile.age} onChange={(e) => setProfile({ ...profile, age: +e.target.value })} /></label><label className="care-label">{L('height')}<input type="number" min="100" max="250" value={profile.height} onChange={(e) => setProfile({ ...profile, height: +e.target.value })} /></label><label className="care-label">{L('weight')}<input type="number" min="20" max="300" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: +e.target.value })} /></label><div className="care-label">{L('gender')}<div className="toggle-group mt-2"><button className={profile.gender === 'male' ? 'toggle-btn-active' : 'toggle-btn-inactive'} onClick={() => setProfile({ ...profile, gender: 'male' })}>{L('maleLabel')}</button><button className={profile.gender === 'female' ? 'toggle-btn-active' : 'toggle-btn-inactive'} onClick={() => setProfile({ ...profile, gender: 'female' })}>{L('femaleLabel')}</button></div></div></div><button onClick={() => save(4)} className="btn-primary w-full mt-7">{L('next')}</button></>}
            {step === 4 && <><div className="summary-strip">{summaryStrip}</div><div className="mt-4 space-y-2">{selected.map((id) => { const c = conditions.find((item) => item.id === id); return c ? <div key={id} className="rounded-2xl bg-cyan-50 border border-cyan-200 p-3.5 text-sm text-cyan-900"><b className="flex items-center gap-1.5">{c.icon} {c.name[language]} — {L('labInterpretation')}</b><p className="mt-1 text-cyan-800 leading-relaxed">{c.interp[language]}</p></div> : null; })}</div><div className="grid sm:grid-cols-2 gap-4 mt-5">{activeFields.map((field) => <label key={field.key} className="care-label">{field.label[language]}<span>{field.unit}</span><input required type="number" value={labs[field.key] || ''} onChange={(e) => setLabs({ ...labs, [field.key]: e.target.value })} placeholder={field.hint[language]} /><small>{field.hint[language]}</small></label>)}</div>{selected.includes('ibs') && <div className="rounded-2xl bg-purple-50 text-purple-800 p-4 mt-4 text-sm">{L('ibsNote')}<br /><label className="inline-flex gap-2 mt-3"><input type="checkbox" /> {L('ibsBloating')}</label><label className="inline-flex gap-2 mt-3 mr-4"><input type="checkbox" /> {L('ibsPain')}</label></div>}            <div className="mt-5 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-bold">{hasLabs === false ? L('readyFromBasics') : activeFields.length && activeFields.every((field) => labs[field.key]) ? L('readyComplete') : L('readyIncomplete')}</div><button disabled={!labReady} onClick={() => save(5)} className="btn-primary w-full mt-5 disabled:opacity-40">{L('generatePlan')}</button></>}
            {step === 5 && <><div className="grid md:grid-cols-2 gap-5"><div><h3 className="font-extrabold text-lg mb-3">{L('exercisePlanHeader')}</h3><div className="space-y-3">{[['choose', L('exerciseChooseTitle'), L('exerciseChooseDesc')], ['recommend', L('exerciseRecommendTitle'), L('exerciseRecommendDesc')]].map(([value, title, desc]) => <button key={value} onClick={() => setExerciseMode(value as 'choose' | 'recommend')} className={`choice-card compact ${exerciseMode === value ? 'selected' : ''}`}><strong>{title}</strong><small>{desc}</small></button>)}</div></div><div><h3 className="font-extrabold text-lg mb-3">{L('nutritionPlanHeader')}</h3><div className="space-y-3">{[['choose', L('nutritionChooseTitle'), L('nutritionChooseDesc')], ['recommend', L('nutritionRecommendTitle'), L('nutritionRecommendDesc')]].map(([value, title, desc]) => <button key={value} onClick={() => setNutritionMode(value as 'choose' | 'recommend')} className={`choice-card compact ${nutritionMode === value ? 'selected' : ''}`}><strong>{title}</strong><small>{desc}</small></button>)}</div></div></div><button onClick={() => save(6)} className="btn-primary w-full mt-8">{L('viewPlan')}</button></>}
            {step === 6 && <><div className="flex flex-wrap gap-2 mb-6"><span className="badge-sage">{L('fileReady')}</span>{selected.map((id) => <span key={id} className="badge-primary">{conditions.find((item) => item.id === id)?.name[language]}</span>)}</div><div className="grid md:grid-cols-2 gap-6"><div><h3 className="font-extrabold text-lg mb-3">{L('exerciseHeader')} {exerciseMode === 'recommend' && L('recommended')}</h3>{exerciseMode === 'recommend' ? <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">{exerciseRecommendText}</div> : <div className="space-y-2">{filteredExercises.map((exercise) => <button key={exercise.id} onClick={() => setPickedExercises((items) => items.includes(exercise.id) ? items.filter((id) => id !== exercise.id) : [...items, exercise.id])} className={`mini-select ${pickedExercises.includes(exercise.id) ? 'selected' : ''}`}><b>{exercise[nameKey]}</b><span>{exercise.duration} · {exercise.calories} kcal</span></button>)}</div>}</div><div><h3 className="font-extrabold text-lg mb-3">{L('nutritionHeader')}</h3>{nutritionMode === 'recommend' ? <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">{nutritionRecommendText}</div> : <><div className="grid grid-cols-4 gap-2 mb-3">{cuisines.map(([flag, name]) => <button key={name} onClick={() => setCuisine(name)} className={`cuisine-choice ${cuisine === name ? 'selected' : ''}`}>{flag}<small>{name}</small></button>)}</div><div className="flex gap-2 mb-3">{(['breakfast', 'lunch', 'dinner', 'snack'] as FoodItem['mealType'][]).map((type) => <button key={type} onClick={() => setMealType(type)} className={`meal-tab ${mealType === type ? 'active' : ''}`}>{type === 'breakfast' ? L('mealBreakfast') : type === 'lunch' ? L('mealLunch') : type === 'dinner' ? L('mealDinner') : L('mealSnack')}</button>)}</div><div className="space-y-2">{filteredMeals.map((food) => <button key={food.name_en} onClick={() => setPickedMeals((items) => items.includes(food.name_en) ? items.filter((id) => id !== food.name_en) : [...items, food.name_en])} className={`mini-select ${pickedMeals.includes(food.name_en) ? 'selected' : ''}`}><b>{language === 'ar' ? food.name_ar : food.name_en}</b><span>{food.calories} kcal · {food.protein}g protein</span></button>)}</div></>}</div></div><button onClick={() => localStorage.setItem('hc_advanced_care_complete', 'true')} className="btn-primary w-full mt-8">{L('savePlan')}</button></>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedCarePage;