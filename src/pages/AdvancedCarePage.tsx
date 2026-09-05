import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES_DATABASE } from '../data/exercises';
import { FOODS_DATABASE, type FoodItem } from '../utils/calculations';

type ConditionId = 'diabetes' | 'hypertension' | 'cholesterol' | 'gout' | 'liver' | 'kidney' | 'thyroid' | 'ibs';
type LabValues = Record<string, string>;

const conditions: { id: ConditionId; icon: string; ar: string; en: string }[] = [
  { id: 'diabetes', icon: '🩸', ar: 'سكر', en: 'Diabetes' },
  { id: 'hypertension', icon: '💗', ar: 'ضغط', en: 'Hypertension' },
  { id: 'cholesterol', icon: '🫀', ar: 'كوليسترول', en: 'Cholesterol' },
  { id: 'gout', icon: '🦶', ar: 'نقرس', en: 'Gout' },
  { id: 'liver', icon: '🧡', ar: 'كبد', en: 'Liver health' },
  { id: 'kidney', icon: '🫘', ar: 'كلى', en: 'CKD kidney' },
  { id: 'thyroid', icon: '🦋', ar: 'غدة درقية', en: 'Thyroid' },
  { id: 'ibs', icon: '🌿', ar: 'قولون', en: 'IBS' },
];

const labFields: Record<Exclude<ConditionId, 'ibs'>, { key: string; label: string; unit: string; hint: string }[]> = {
  diabetes: [
    { key: 'fasting', label: 'سكر صائم', unit: 'mg/dL', hint: 'طبيعي أقل من 100' },
    { key: 'hba1c', label: 'HbA1c', unit: '%', hint: 'طبيعي أقل من 5.7' },
  ],
  hypertension: [
    { key: 'systolic', label: 'الضغط الانقباضي', unit: 'mmHg', hint: 'الهدف أقل من 130' },
    { key: 'diastolic', label: 'الضغط الانبساطي', unit: 'mmHg', hint: 'الهدف أقل من 80' },
  ],
  gout: [{ key: 'uricAcid', label: 'حمض اليوريك', unit: 'mg/dL', hint: 'مرتفع فوق 6.8' }],
  cholesterol: [
    { key: 'total', label: 'الكوليسترول الكلي', unit: 'mg/dL', hint: 'مثالي أقل من 200' },
    { key: 'ldl', label: 'LDL', unit: 'mg/dL', hint: 'الهدف أقل من 100' },
    { key: 'hdl', label: 'HDL', unit: 'mg/dL', hint: 'الأفضل فوق 40' },
    { key: 'triglycerides', label: 'الدهون الثلاثية', unit: 'mg/dL', hint: 'طبيعي أقل من 150' },
  ],
  liver: [
    { key: 'alt', label: 'ALT', unit: 'U/L', hint: 'الطبيعي 7–56' },
    { key: 'ast', label: 'AST', unit: 'U/L', hint: 'الطبيعي 10–40' },
    { key: 'bilirubin', label: 'Bilirubin', unit: 'mg/dL', hint: 'الطبيعي أقل من 1.2' },
  ],
  kidney: [
    { key: 'creatinine', label: 'Creatinine', unit: 'mg/dL', hint: 'الطبيعي 0.6–1.3' },
    { key: 'egfr', label: 'eGFR', unit: 'mL/min', hint: 'الطبيعي فوق 90' },
    { key: 'potassium', label: 'Potassium', unit: 'mmol/L', hint: 'الطبيعي 3.5–5.0' },
  ],
  thyroid: [
    { key: 'tsh', label: 'TSH', unit: 'mIU/L', hint: 'الطبيعي 0.4–4.0' },
    { key: 't3', label: 'T3', unit: 'ng/dL', hint: 'حسب معمل التحليل' },
    { key: 't4', label: 'T4', unit: 'µg/dL', hint: 'حسب معمل التحليل' },
  ],
};

const cuisines = [
  ['🇪🇬', 'Egyptian'], ['🇮🇳', 'Indian'], ['🇸🇦', 'Arabic'], ['🇬🇷', 'Mediterranean'],
  ['🌏', 'Asian'], ['🇺🇸', 'American'], ['🥗', 'Vegetarian'], ['🥑', 'Keto'],
];

const imageForStep = (step: number) => {
  if (step === 1 || step === 2) return '/anime/compassionate_chronic_care.jpg';
  if (step === 4) return '/anime/lab_interpreter_holograms.jpg';
  if (step === 5 || step === 6) return '/anime/fitness_plan_trio.jpg';
  return '/anime/ghibli_holographic_health_calculator.jpg';
};

const AdvancedCarePage: React.FC = () => {
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
  const stepTitle = ['اختر حالتك الصحية', 'هل أجريت تحاليل مؤخراً؟', 'معلوماتك الأساسية', 'أدخل نتائج تحاليلك', 'اختر كيف تريد خطتك ✨', 'ابنِ خطتك الشخصية'][step - 1];

  return (
    <div className="tool-page advanced-care-page min-h-screen bg-slate-50 pb-16" dir="rtl">
      <div className="care-progress"><span style={{ width: `${(step / 6) * 100}%` }} /></div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div><span className="step-pill purple">ADVANCED CARE · {step}/6</span><h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3">{stepTitle}</h1><p className="text-slate-500 mt-2">خطوات بسيطة، توصيات أوضح، وتجربة مصممة حول حالتك.</p></div>
          {step > 1 && <button type="button" onClick={() => { setStep((current) => current - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-outline hidden sm:inline-flex">→ السابق</button>}
          <Link to="/" className="btn-ghost hidden sm:inline-flex">← الرئيسية</Link>
        </div>

        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-start">
          <div className="care-illustration"><img src={imageForStep(step)} alt="" /><span className="sparkle sparkle-a">✦</span><span className="sparkle sparkle-b">✨</span></div>
          <div className="card !rounded-3xl min-h-[430px] care-step" key={step}>
            {step === 1 && <><p className="text-slate-500 mb-6">يمكنك اختيار أكثر من حالة</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{conditions.map((condition) => <button key={condition.id} type="button" onClick={() => toggleCondition(condition.id)} className={`condition-choice ${selected.includes(condition.id) ? 'selected' : ''}`}><span>{condition.icon}</span><strong>{condition.ar}</strong><small>{condition.en}</small>{selected.includes(condition.id) && <b className="choice-check">✓</b>}</button>)}</div><p className="text-sm text-emerald-700 font-bold mt-5">{selected.length} حالات محددة</p><button disabled={!selected.length} onClick={() => save(2)} className="btn-primary w-full mt-6 disabled:opacity-40">التالي ←</button></>}
            {step === 2 && <div className="space-y-4"><p className="text-slate-500 mb-6">وجود التحاليل يساعدنا على تقديم قراءة أكثر تخصيصاً.</p><div className="grid md:grid-cols-2 gap-4">{[[true, 'نعم، أجريت تحاليل', '📋'], [false, 'لا، لم أجر تحاليل بعد', '🌱']].map(([value, label, icon]) => <button key={String(value)} onClick={() => setHasLabs(value as boolean)} className={`choice-card ${hasLabs === value ? 'selected' : ''}`}><span>{icon}</span><strong>{label}</strong><small>{value ? 'جهّز نتيجة التحاليل أمامك' : 'سنبدأ بالمعلومات الأساسية'}</small></button>)}</div>{hasLabs === true && <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3 animate-fade-in">ملاحظة: جهز نتيجة التحاليل أمامك 📋</p>}<button disabled={hasLabs === null} onClick={() => save(3)} className="btn-primary w-full mt-5 disabled:opacity-40">التالي ←</button></div>}
            {step === 3 && <><div className="flex flex-wrap gap-2 mb-6">{selected.map((id) => <span key={id} className="badge-primary">{conditions.find((item) => item.id === id)?.icon} {conditions.find((item) => item.id === id)?.ar} <button onClick={() => toggleCondition(id)}>×</button></span>)}</div><div className="grid sm:grid-cols-2 gap-4"><label className="care-label">العمر <output>{profile.age}</output><input type="range" min="18" max="80" value={profile.age} onChange={(e) => setProfile({ ...profile, age: +e.target.value })} /></label><label className="care-label">الطول (cm)<input type="number" min="100" max="250" value={profile.height} onChange={(e) => setProfile({ ...profile, height: +e.target.value })} /></label><label className="care-label">الوزن (kg)<input type="number" min="20" max="300" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: +e.target.value })} /></label><div className="care-label">النوع<div className="toggle-group mt-2"><button className={profile.gender === 'male' ? 'toggle-btn-active' : 'toggle-btn-inactive'} onClick={() => setProfile({ ...profile, gender: 'male' })}>♂ ذكر</button><button className={profile.gender === 'female' ? 'toggle-btn-active' : 'toggle-btn-inactive'} onClick={() => setProfile({ ...profile, gender: 'female' })}>♀ أنثى</button></div></div></div><button onClick={() => save(4)} className="btn-primary w-full mt-7">التالي ←</button></>}
            {step === 4 && <><div className="summary-strip">العمر {profile.age} · {profile.height} cm · {profile.weight} kg · {selected.length} حالات</div><div className="grid sm:grid-cols-2 gap-4 mt-5">{activeFields.map((field) => <label key={field.key} className="care-label">{field.label}<span>{field.unit}</span><input required type="number" value={labs[field.key] || ''} onChange={(e) => setLabs({ ...labs, [field.key]: e.target.value })} placeholder={field.hint} /><small>{field.hint}</small></label>)}</div>{selected.includes('ibs') && <div className="rounded-2xl bg-purple-50 text-purple-800 p-4 mt-4 text-sm">لا يوجد تحليل محدد لـ IBS - سنعتمد على الأعراض<br /><label className="inline-flex gap-2 mt-3"><input type="checkbox" /> انتفاخ</label><label className="inline-flex gap-2 mt-3 mr-4"><input type="checkbox" /> ألم</label></div>}            <div className="mt-5 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-bold">{hasLabs === false ? '✓ سنبني الخطة من معلوماتك الأساسية' : activeFields.length && activeFields.every((field) => labs[field.key]) ? '✓ البيانات مكتملة — جاهز للتفسير' : 'أدخل كل القيم المطلوبة للمتابعة'}</div><button disabled={!labReady} onClick={() => save(5)} className="btn-primary w-full mt-5 disabled:opacity-40">ابدأ بتوليد الخطة ✨</button></>}
            {step === 5 && <><div className="grid md:grid-cols-2 gap-5"><div><h3 className="font-extrabold text-lg mb-3">خطة التمارين</h3><div className="space-y-3">{[['choose', '🏋️ اختر تمرينك بنفسك', 'تصفح كل التمارين واختر ما تحبه'], ['recommend', '🪄 توصياتنا', 'نرشح لك تمارين مناسبة لحالتك']].map(([value, title, desc]) => <button key={value} onClick={() => setExerciseMode(value as 'choose' | 'recommend')} className={`choice-card compact ${exerciseMode === value ? 'selected' : ''}`}><strong>{title}</strong><small>{desc}</small></button>)}</div></div><div><h3 className="font-extrabold text-lg mb-3">خطة التغذية</h3><div className="space-y-3">{[['choose', '🥗 اختر طعامك بنفسك', 'اختر المطبخ والوجبات التي تحبها'], ['recommend', '📍 دع الموقع يرشح لك', 'اقتراحات متنوعة حسب منطقتك']].map(([value, title, desc]) => <button key={value} onClick={() => setNutritionMode(value as 'choose' | 'recommend')} className={`choice-card compact ${nutritionMode === value ? 'selected' : ''}`}><strong>{title}</strong><small>{desc}</small></button>)}</div></div></div><button onClick={() => save(6)} className="btn-primary w-full mt-8">عرض الخطة ←</button></>}
            {step === 6 && <><div className="flex flex-wrap gap-2 mb-6"><span className="badge-sage">✓ ملفك جاهز</span>{selected.map((id) => <span key={id} className="badge-primary">{conditions.find((item) => item.id === id)?.ar}</span>)}</div><div className="grid md:grid-cols-2 gap-6"><div><h3 className="font-extrabold text-lg mb-3">التمارين {exerciseMode === 'recommend' && 'المقترحة'}</h3>{exerciseMode === 'recommend' ? <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">خطة 3 أيام أسبوعياً بتمارين متوسطة الشدة، مع مراعاة {selected.map((id) => conditions.find((item) => item.id === id)?.ar).join('، ')} وتدرج الجهد.</div> : <div className="space-y-2">{filteredExercises.map((exercise) => <button key={exercise.id} onClick={() => setPickedExercises((items) => items.includes(exercise.id) ? items.filter((id) => id !== exercise.id) : [...items, exercise.id])} className={`mini-select ${pickedExercises.includes(exercise.id) ? 'selected' : ''}`}><b>{exercise.nameAr}</b><span>{exercise.duration} · {exercise.calories} kcal</span></button>)}</div>}</div><div><h3 className="font-extrabold text-lg mb-3">التغذية</h3>{nutritionMode === 'recommend' ? <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">حسب موقعك في مصر — نقترح أطباقاً متوسطية ومصرية متنوعة، مع خيارات مناسبة لحالاتك: {selected.map((id) => conditions.find((item) => item.id === id)?.ar).join('، ')}. تم الاختيار لتكون متنوعة ومنخفضة المؤشر الجلايسيمي عند الحاجة.</div> : <><div className="grid grid-cols-4 gap-2 mb-3">{cuisines.map(([flag, name]) => <button key={name} onClick={() => setCuisine(name)} className={`cuisine-choice ${cuisine === name ? 'selected' : ''}`}>{flag}<small>{name}</small></button>)}</div><div className="flex gap-2 mb-3">{(['breakfast', 'lunch', 'dinner', 'snack'] as FoodItem['mealType'][]).map((type) => <button key={type} onClick={() => setMealType(type)} className={`meal-tab ${mealType === type ? 'active' : ''}`}>{type}</button>)}</div><div className="space-y-2">{filteredMeals.map((food) => <button key={food.name_en} onClick={() => setPickedMeals((items) => items.includes(food.name_en) ? items.filter((id) => id !== food.name_en) : [...items, food.name_en])} className={`mini-select ${pickedMeals.includes(food.name_en) ? 'selected' : ''}`}><b>{food.name_ar}</b><span>{food.calories} kcal · {food.protein}g protein</span></button>)}</div></>}</div></div><button onClick={() => localStorage.setItem('hc_advanced_care_complete', 'true')} className="btn-primary w-full mt-8">حفظ الخطة ✓</button></>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedCarePage;
