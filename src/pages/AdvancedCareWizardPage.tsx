import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  HeartPulse,
  ClipboardList,
  Calculator,
  Microscope,
  Target,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EXERCISES_DATABASE } from '../data/exercises/index';
import type { Exercise } from '../data/exercises/types';
import { FOODS_DATABASE } from '../utils/calculations';
import type { FoodItem } from '../utils/calculations';
import {
  CONDITION_DATA,
  CONDITION_IDS,
  isConditionId,
  exercisePoolFor,
  foodPoolFor,
  resolveConflicts,
} from '../data/conditions';
import type { ConditionId, FoodScore, ScoredExercise, ScoredFood } from '../data/conditions';
import { IconScene } from '../components/IconScene';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { translations } from '../i18n/translations';

type LabValues = Record<string, string>;

const EMERALD = '#0F4C3A';
const GOLD = '#D4AF37';
const CREAM = '#FDFBF7';
const BEIGE = '#F4F1EB';
const BORDER = '#EFEBE4';
const MUTED = '#6B7A75';
const RED = '#B91C1C';

const LAB_FIELD_UNITS: Record<string, string> = {
  fasting: 'mg/dL',
  hba1c: '%',
  systolic: 'mmHg',
  diastolic: 'mmHg',
  uricAcid: 'mg/dL',
  total: 'mg/dL',
  ldl: 'mg/dL',
  hdl: 'mg/dL',
  triglycerides: 'mg/dL',
  alt: 'U/L',
  ast: 'U/L',
  bilirubin: 'mg/dL',
  creatinine: 'mg/dL',
  egfr: 'mL/min',
  potassium: 'mmol/L',
  tsh: 'mIU/L',
  t3: 'ng/dL',
  t4: 'µg/dL',
};

const LAB_FIELD_KEYS: Record<Exclude<ConditionId, 'ibs'>, string[]> = {
  diabetes: ['fasting', 'hba1c'],
  hypertension: ['systolic', 'diastolic'],
  cholesterol: ['total', 'ldl', 'hdl', 'triglycerides'],
  gout: ['uricAcid'],
  liver: ['alt', 'ast', 'bilirubin'],
  kidney: ['creatinine', 'egfr', 'potassium'],
  thyroid: ['tsh', 't3', 't4'],
};

const CUISINES: Array<[string, string]> = [
  ['🇪🇬', 'Egyptian'],
  ['🇮🇳', 'Indian'],
  ['🇸🇦', 'Arabic'],
  ['🇬🇷', 'Mediterranean'],
  ['🌏', 'Asian'],
  ['🇺🇸', 'American'],
  ['🥗', 'Vegetarian'],
  ['🥑', 'Keto'],
];

const MEAL_TABS: Array<{ key: FoodItem['mealType']; i18n: string }> = [
  { key: 'breakfast', i18n: 'wizard.step6.mealBreakfast' },
  { key: 'lunch', i18n: 'wizard.step6.mealLunch' },
  { key: 'dinner', i18n: 'wizard.step6.mealDinner' },
  { key: 'snack', i18n: 'wizard.step6.mealSnack' },
];

const stepScene: Record<number, { icon: LucideIcon; color: string }> = {
  1: { icon: HeartPulse, color: GOLD },
  2: { icon: ClipboardList, color: EMERALD },
  3: { icon: Calculator, color: GOLD },
  4: { icon: Microscope, color: EMERALD },
  5: { icon: ClipboardList, color: GOLD },
  6: { icon: Target, color: EMERALD },
};

const badgeStyle: Record<FoodScore, { bg: string; label: FoodScore }> = {
  safe: { bg: `bg-[#0F4C3A] text-[#FDFBF7]`, label: 'safe' },
  limit: { bg: `bg-[#D4AF37] text-[#0F4C3A]`, label: 'limit' },
  avoid: { bg: `bg-[#B91C1C] text-white`, label: 'avoid' },
};

const AdvancedCareWizardPage: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const queryCondition = searchParams.get('condition');
  const initialConditions: ConditionId[] =
    queryCondition && isConditionId(queryCondition) ? [queryCondition] : [];
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<ConditionId[]>(initialConditions);
  const [hasLabs, setHasLabs] = useState<boolean | null>(null);
  const [profile, setProfile] = useState({ age: 35, height: 170, weight: 70, gender: 'male' });
  const [labs, setLabs] = useState<LabValues>({});
  const [exerciseMode, setExerciseMode] = useState<'choose' | 'recommend'>('recommend');
  const [nutritionMode, setNutritionMode] = useState<'choose' | 'recommend'>('recommend');
  const [cuisine, setCuisine] = useState('Egyptian');
  const [mealType, setMealType] = useState<FoodItem['mealType']>('lunch');
  const [pickedExercises, setPickedExercises] = useState<string[]>([]);
  const [pickedFoods, setPickedFoods] = useState<string[]>([]);
  const [whyOpen, setWhyOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hc_advanced_care');
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<{
        step: number;
        selected: string[];
        hasLabs: boolean | null;
        profile: typeof profile;
        labs: LabValues;
        exerciseMode: 'choose' | 'recommend';
        nutritionMode: 'choose' | 'recommend';
        cuisine: string;
        pickedExercises: string[];
        pickedFoods: string[];
      }>;
      const savedSelected = Array.isArray(parsed.selected) ? parsed.selected.filter((id) => isConditionId(id)) : [];
      if (savedSelected.length > 0) {
        setSelected(savedSelected);
      }
      if (typeof parsed.hasLabs === 'boolean' || parsed.hasLabs === null) setHasLabs(parsed.hasLabs);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.labs && typeof parsed.labs === 'object') setLabs(parsed.labs);
      if (parsed.exerciseMode === 'choose' || parsed.exerciseMode === 'recommend') setExerciseMode(parsed.exerciseMode);
      if (parsed.nutritionMode === 'choose' || parsed.nutritionMode === 'recommend') setNutritionMode(parsed.nutritionMode);
      if (typeof parsed.cuisine === 'string') setCuisine(parsed.cuisine);
      if (Array.isArray(parsed.pickedExercises)) setPickedExercises(parsed.pickedExercises);
      if (Array.isArray(parsed.pickedFoods)) setPickedFoods(parsed.pickedFoods);
      if (typeof parsed.step === 'number' && parsed.step >= 1 && parsed.step <= 6) setStep(parsed.step);
    } catch {
      localStorage.removeItem('hc_advanced_care');
    }
  }, []);

  const save = (nextStep: number) => {
    localStorage.setItem(
      'hc_advanced_care',
      JSON.stringify({ step: nextStep, selected, hasLabs, profile, labs, exerciseMode, nutritionMode, cuisine, pickedExercises, pickedFoods }),
    );
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCondition = (id: ConditionId) =>
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const tk = (key: string) => key as keyof typeof translations.en;
  const condName = (id: ConditionId) => t(tk(`wizard.condition.${id}.name`));
  const primary = selected[0] ?? null;
  const conditionLabel = primary ? condName(primary) : '';
  const conditionList = selected.map(condName).filter(Boolean).join(', ');

  const activeFields = useMemo(
    () => selected.flatMap((id) => (id === 'ibs' ? [] : LAB_FIELD_KEYS[id])),
    [selected],
  );
  const labReady =
    hasLabs === false ||
    selected.every((id) => id === 'ibs' || LAB_FIELD_KEYS[id].every((key) => labs[key]?.trim()));

  const pool: ScoredExercise[] = useMemo(() => exercisePoolFor(selected), [selected]);
  const foodPool: ScoredFood[] = useMemo(() => foodPoolFor(selected), [selected]);

  const foodById = useMemo(() => new Map(FOODS_DATABASE.map((food) => [food.name_en, food])), []);

  const recommendedExercises = useMemo(() => pool.filter((item) => item.score !== 'avoid').slice(0, 7), [pool]);

  const bmr = useMemo(() => {
    const base = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    return Math.round(base + (profile.gender === 'female' ? -161 : 5));
  }, [profile]);

  const calorieFloor = useMemo(() => Math.max(1200, Math.round(bmr * 1.1)), [bmr]);

  const recommendation = useMemo(() => {
    const slots: Array<FoodItem['mealType']> = ['breakfast', 'lunch', 'dinner', 'snack', 'snack'];
    const out: string[] = [];
    const taken = new Set<string>();
    const safe = foodPool.filter((item) => item.score !== 'avoid');
    for (const slot of slots) {
      const pick = safe.find((item) => item.food.mealType === slot && !taken.has(item.food.name_en))
        ?? safe.find((item) => !taken.has(item.food.name_en));
      if (!pick) break;
      taken.add(pick.food.name_en);
      out.push(pick.food.name_en);
    }
    const sum = () => out.reduce((total, name) => total + (foodById.get(name)?.calories ?? 0), 0);
    let extended = false;
    if (sum() < calorieFloor) {
      extended = true;
      const extras = safe
        .filter((item) => !taken.has(item.food.name_en))
        .sort((a, b) => (b.food.calories ?? 0) - (a.food.calories ?? 0));
      for (const item of extras) {
        if (sum() >= calorieFloor) break;
        taken.add(item.food.name_en);
        out.push(item.food.name_en);
      }
    }
    return { foods: out, extended };
  }, [foodPool, foodById, calorieFloor]);

  const recommendedFoods = recommendation.foods;
  const kcalExtended = recommendation.extended;

  const exerciseName = (exercise: Exercise) =>
    (({ en: 'nameEn', fr: 'nameFr', es: 'nameEs', ar: 'nameAr', de: 'nameEn' } as const)[language]) as keyof Exercise;
  const poolById = useMemo(() => new Map(pool.map((item) => [item.exercise.id, item])), [pool]);
  const foodScoreById = useMemo(() => new Map(foodPool.map((item) => [item.food.name_en, item.score])), [foodPool]);

  const filteredFoods = useMemo(() => {
    if (selected.length === 0) return [];
    return foodPool
      .filter((item) =>
        item.food.cuisine.some((itemCuisine) => itemCuisine.toLowerCase().includes(cuisine.toLowerCase())) &&
        (!item.food.mealType || item.food.mealType === mealType),
      )
      .slice(0, 9);
  }, [foodPool, cuisine, mealType, selected.length]);

  const currentExerciseIds = exerciseMode === 'recommend' ? recommendedExercises.map((item) => item.exercise.id) : pickedExercises;
  const currentFoodNames = nutritionMode === 'recommend' ? recommendedFoods : pickedFoods;

  const dailyKcal = useMemo(() => {
    const kcal = currentFoodNames.reduce((sum, name) => {
      const food = foodById.get(name);
      return food ? sum + (food.calories || 0) : sum;
    }, 0);
    return Math.round(kcal);
  }, [currentFoodNames, foodById]);

  const kcalBreakdown = useMemo(() => {
    const buckets: Record<string, number> = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
    currentFoodNames.forEach((name) => {
      const food = foodById.get(name);
      if (!food) return;
      const slot: 'breakfast' | 'lunch' | 'dinner' | 'snack' =
        food.mealType === 'breakfast' || food.mealType === 'lunch' || food.mealType === 'dinner'
          ? food.mealType
          : 'snack';
      buckets[slot] += food.calories || 0;
    });
    return buckets as Record<'breakfast' | 'lunch' | 'dinner' | 'snack', number>;
  }, [currentFoodNames, foodById]);

  const mealCount = useMemo(
    () =>
      currentFoodNames.filter((name) =>
        ['breakfast', 'lunch', 'dinner'].includes(foodById.get(name)?.mealType ?? ''),
      ).length,
    [currentFoodNames, foodById],
  );
  const snackCount = currentFoodNames.length - mealCount;

  const resolution = useMemo(() => resolveConflicts(selected), [selected]);
  const focusCondition: ConditionId | null = resolution
    ? (resolution.prioritized[0] as ConditionId)
    : primary;
  const focusConditionName = focusCondition ? condName(focusCondition) : '';
  const focusLine = focusCondition
    ? `${t(tk(`wizard.condition.${focusCondition}.focus`))} · ${t(tk(`wizard.condition.${focusCondition}.nutritionRules`))}`
    : '';

  const mealBreakdownPairs: Array<[string, 'breakfast' | 'lunch' | 'dinner' | 'snack']> = [
    ['wizard.step6.mealBreakfast', 'breakfast'],
    ['wizard.step6.mealLunch', 'lunch'],
    ['wizard.step6.mealDinner', 'dinner'],
    ['wizard.step6.mealSnack', 'snack'],
  ];
  const breakdownLine = mealBreakdownPairs
    .map(([i18n, slot]) => `${t(tk(i18n))}: ${kcalBreakdown[slot]} kcal`)
    .join(' + ');

  const calorieFloorAdjusted = dailyKcal < calorieFloor;

  const mealSlotLabel = (name: string) => {
    const food = foodById.get(name);
    const kind = food?.mealType;
    const key = kind === 'breakfast' ? 'wizard.step6.mealBreakfast'
      : kind === 'lunch' ? 'wizard.step6.mealLunch'
      : kind === 'dinner' ? 'wizard.step6.mealDinner'
      : 'wizard.step6.mealSnack';
    return t(tk(key));
  };

  const badgeLabel = (score: FoodScore) => {
    if (score === 'safe') return t(tk('wizard.badge.safe')).replace('{condition}', conditionLabel);
    if (score === 'limit') return t(tk('wizard.badge.limit'));
    return t(tk('wizard.badge.avoid'));
  };

  const togglePickExercise = (id: string) =>
    setPickedExercises((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  const togglePickFood = (name: string) =>
    setPickedFoods((items) => (items.includes(name) ? items.filter((item) => item !== name) : [...items, name]));

  const handleSaveAccount = () => {
    if (user) navigate('/premium');
    else navigate('/advanced-care/wizard/signup');
  };

  const exerciseById = useMemo(
    () => new Map(EXERCISES_DATABASE.map((exercise) => [exercise.id, exercise])),
    [],
  );

  const buildPlanPdfHtml = (): string => {
    const foodRows = currentFoodNames
      .map((name) => foodById.get(name))
      .filter((food): food is FoodItem => Boolean(food))
      .map(
        (food) =>
          `<tr><td>${food.name_en}</td><td>${mealSlotLabel(food.name_en)}</td><td>${food.calories} kcal</td></tr>`,
      )
      .join('');
    const exerciseRows = currentExerciseIds
      .map((id) => exerciseById.get(id))
      .filter((ex): ex is Exercise => Boolean(ex))
      .map(
        (ex) =>
          `<tr><td>${ex[exerciseName(ex)]}</td><td>${ex.duration}</td><td>${ex.calories} kcal</td></tr>`,
      )
      .join('');
    const dirAttr = dir === 'rtl' ? ' dir="rtl" lang="ar"' : '';
    const conditionTags = selected
      .map((id) => `<span class="tag">${CONDITION_DATA[id].icon} ${condName(id)}</span>`)
      .join('\n');
    return `<!doctype html>
<html${dirAttr}>
<head>
<meta charset="utf-8" />
<title>HealthCalc Plan</title>
<style>
  @page { margin: 24px; }
  body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color: #0F4C3A; margin: 0; padding: 32px; background: #FDFBF7; }
  h1 { font-size: 24px; color: #0F4C3A; margin: 0 0 4px; }
  .muted { color: #6B7A75; font-size: 13px; }
  .card { background: #ffffff; border: 1px solid #EFEBE4; border-radius: 16px; padding: 20px; margin-top: 20px; }
  .h { color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px; }
  th { text-align: start; color: #0F4C3A; border-bottom: 2px solid #D4AF37; padding: 8px; }
  td { padding: 8px; border-bottom: 1px solid #EFEBE4; text-align: start; }
  .total { margin-top: 20px; background: #0F4C3A; color: #FDFBF7; border-radius: 12px; padding: 12px 16px; font-weight: 700; display: flex; justify-content: space-between; }
  .tag { display: inline-block; background: #D4AF37; color: #0F4C3A; border-radius: 9999px; padding: 4px 12px; font-size: 12px; font-weight: 700; margin: 2px 4px 2px 0; }
</style>
</head>
<body>
  <h1>HealthCalc — Personalized Plan</h1>
  <p class="muted">${focusLine}</p>
  <div>
${conditionTags}
  </div>
  <div class="card">
    <div class="h">${t(tk('wizard.step6.planHeader'))} · ${t(tk('wizard.step6.nutritionHeader'))}</div>
    <table><thead><tr><th>Food</th><th>Meal</th><th>Calories</th></tr></thead><tbody>${foodRows}</tbody></table>
  </div>
  <div class="card">
    <div class="h">${t(tk('wizard.step6.exercisesHeader'))}</div>
    <table><thead><tr><th>Exercise</th><th>Duration</th><th>Calories</th></tr></thead><tbody>${exerciseRows}</tbody></table>
  </div>
  <div class="total"><span>${t(tk('wizard.step6.summary.calories')).replace('{kcal}', String(dailyKcal))}</span><span>${dailyKcal} kcal</span></div>
</body>
</html>`;
  };

  const handleDownloadPdf = () => {
    const win = window.open('', '_blank', 'width=960,height=760');
    if (!win) return;
    win.document.open();
    win.document.write(buildPlanPdfHtml());
    win.document.close();
    win.focus();
    win.print();
    setToast(t(tk('wizard.step6.toastPdf')));
    window.setTimeout(() => setToast(''), 2800);
  };

  const stepTitle = [
    t(tk('wizard.care.step1.title')),
    t(tk('wizard.care.step2.title')),
    t(tk('wizard.care.step3.title')),
    t(tk('wizard.care.step4.title')),
    t(tk('wizard.care.step5.title')),
    t(tk('wizard.care.step6.title')),
  ][step - 1];

  useEffect(() => {
    if (step !== 6) return;
    const plan = {
      version: 2,
      savedAt: Date.now(),
      conditions: selected,
      profile,
      exerciseMode,
      nutritionMode,
      cuisine,
      foodNames: currentFoodNames,
      exerciseIds: currentExerciseIds,
      calories: dailyKcal,
      calorieFloor,
      kcalExtended,
      kcalBreakdown,
      meals: mealCount,
      snacks: snackCount,
      focusCondition,
    };
    localStorage.setItem('hc_advanced_care_plan', JSON.stringify(plan));
  }, [step, selected, profile, exerciseMode, nutritionMode, cuisine, currentFoodNames, currentExerciseIds, dailyKcal, calorieFloor, kcalExtended, mealCount, snackCount, focusCondition]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24" dir={dir}>
      <div className="h-1.5 bg-[#EFEBE4]">
        <div className="h-full bg-[#0F4C3A] transition-all duration-500" style={{ width: `${(step / 6) * 100}%` }} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="step-pill">{t(tk('wizard.eyebrow'))} · {step}/6</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F4C3A] mt-3">{stepTitle}</h1>
            <p className="text-[#6B7A75] mt-2">{t(tk('wizard.subtitle'))}</p>
          </div>
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button type="button" onClick={() => save(step - 1)} className="inline-flex items-center gap-2 border border-[#0F4C3A] text-[#0F4C3A] font-semibold rounded-full px-5 py-2.5 hover:bg-[#0F4C3A]/5 transition text-sm">
                {dir === 'rtl' ? '→' : '←'} {t(tk('wizard.care.back'))}
              </button>
            )}
            <Link to="/advanced-care" className="inline-flex items-center gap-2 text-[#0F4C3A] font-semibold rounded-full px-5 py-2.5 hover:bg-[#0F4C3A]/5 transition text-sm">
              {t(tk('wizard.home'))}
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-start">
          <div className="hidden lg:block">
            <IconScene icon={stepScene[step].icon} color={stepScene[step].color} large />
          </div>

          <div className="bg-white border border-[#EFEBE4] rounded-[28px] p-6 md:p-10 shadow-[0_10px_40px_-20px_rgba(15,76,58,0.15)] min-h-[430px]" key={step}>
            {step === 1 && (
              <>
                <p className="text-[#6B7A75] mb-6">{t(tk('wizard.chooseMultiple'))}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CONDITION_IDS.map((id) => {
                    const active = selected.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleCondition(id)}
                        className={`rounded-2xl border bg-white p-4 text-center transition ${
                          active
                            ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]'
                            : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                        }`}
                      >
                        <span className="text-3xl block">{CONDITION_DATA[id].icon}</span>
                        <strong className={`block mt-2 text-sm ${active ? 'text-[#0F4C3A]' : 'text-slate-900'}`}>
                          {condName(id)}
                        </strong>
                        {active && <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-xs text-[#0F4C3A] font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>

                {selected.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {selected.map((id) => (
                      <div key={id} className="rounded-2xl bg-[#F4F1EB]/60 border border-[#EFEBE4] p-4 text-sm text-[#6B7A75] flex gap-3">
                        <span className="text-xl shrink-0">{CONDITION_DATA[id].icon}</span>
                        <div>
                          <b className="text-[#0F4C3A]">{condName(id)}</b>
                          <p className="mt-0.5 leading-relaxed">{t(tk(`wizard.condition.${id}.desc`))}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  disabled={!selected.length}
                  onClick={() => save(2)}
                  className="w-full mt-6 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40"
                >
                  {t(tk('wizard.care.next'))}
                </button>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-[#6B7A75] mb-6">{t(tk('wizard.labsIntro'))}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {([['true', t(tk('wizard.labsYes')), '📋'], ['false', t(tk('wizard.labsNo')), '🌱']] as const).map(([value, label, icon]) => {
                    const active = hasLabs === (value === 'true');
                    return (
                      <button
                        key={value}
                        onClick={() => setHasLabs(value === 'true')}
                        className={`rounded-2xl border bg-white p-5 text-left transition ${
                          active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                        }`}
                      >
                        <span className="text-2xl">{icon}</span>
                        <strong className="block mt-2 text-slate-900">{label}</strong>
                        <small className="block mt-1 text-[#6B7A75]">{value === 'true' ? t(tk('wizard.labsYesSub')) : t(tk('wizard.labsNoSub'))}</small>
                      </button>
                    );
                  })}
                </div>
                {hasLabs === true && (
                  <p className="text-xs text-[#6B7A75] bg-[#F4F1EB]/60 rounded-xl p-3">{t(tk('wizard.labsNote'))}</p>
                )}
                <button
                  type="button"
                  disabled={hasLabs === null}
                  onClick={() => save(3)}
                  className="w-full mt-5 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40"
                >
                  {t(tk('wizard.care.next'))}
                </button>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.map((id) => (
                    <span key={id} className="bg-[#D4AF37] text-[#0F4C3A] text-sm font-semibold rounded-full px-3 py-1.5 flex items-center gap-2">
                      {CONDITION_DATA[id].icon} {condName(id)}
                      <button onClick={() => toggleCondition(id)} aria-label="remove">×</button>
                    </span>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block text-sm font-semibold text-slate-900">
                    {t(tk('wizard.age'))} <output className="ml-2 text-[#D4AF37] font-bold">{profile.age}</output>
                    <input type="range" min="18" max="80" value={profile.age} onChange={(e) => setProfile({ ...profile, age: +e.target.value })} className="w-full mt-3 accent-[#0F4C3A]" />
                  </label>
                  <label className="block text-sm font-semibold text-slate-900">
                    {t(tk('wizard.height'))}
                    <input type="number" min="100" max="250" value={profile.height} onChange={(e) => setProfile({ ...profile, height: +e.target.value })} className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900" />
                  </label>
                  <label className="block text-sm font-semibold text-slate-900">
                    {t(tk('wizard.weight'))}
                    <input type="number" min="20" max="300" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: +e.target.value })} className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900" />
                  </label>
                  <div className="text-sm font-semibold text-slate-900">
                    {t(tk('wizard.gender'))}
                    <div className="flex gap-2 mt-2">
                      <button className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${profile.gender === 'male' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0F4C3A]' : 'border-[#EFEBE4] text-[#6B7A75]'}`} onClick={() => setProfile({ ...profile, gender: 'male' })}>{t(tk('wizard.male'))}</button>
                      <button className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${profile.gender === 'female' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0F4C3A]' : 'border-[#EFEBE4] text-[#6B7A75]'}`} onClick={() => setProfile({ ...profile, gender: 'female' })}>{t(tk('wizard.female'))}</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => save(4)} className="w-full mt-7 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition">{t(tk('wizard.care.next'))}</button>
              </>
            )}

            {step === 4 && (
              <>
                <div className="rounded-2xl bg-[#0F4C3A] text-[#FDFBF7] p-4 text-sm flex flex-wrap gap-x-4 gap-y-1">
                  <span>{t(tk('wizard.age'))}: <b>{profile.age}</b></span>
                  <span>{t(tk('wizard.height'))}: <b>{profile.height} cm</b></span>
                  <span>{t(tk('wizard.weight'))}: <b>{profile.weight} kg</b></span>
                  <span>{conditionList || '—'}</span>
                </div>

                <div className="mt-4 space-y-2">
                  {selected.map((id) => (
                    <div key={id} className="rounded-2xl bg-[#F4F1EB]/70 border border-[#EFEBE4] p-3.5 text-sm text-[#4a5a55]">
                      <b className="flex items-center gap-1.5 text-[#0F4C3A]">{CONDITION_DATA[id].icon} {condName(id)}</b>
                      {id !== 'ibs' && <p className="mt-1 leading-relaxed">{t(tk(`advanced.lab.interp.${id}`))}</p>}
                      {id === 'ibs' && <p className="mt-1 leading-relaxed">{t(tk('wizard.labExclusions'))}</p>}
                      <p className="mt-1 text-[#6B7A75]">{t(tk(`wizard.condition.${id}.focus`))}</p>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  {activeFields.map((key) => (
                    <label key={key} className="block text-sm font-semibold text-slate-900">
                      {t(tk(`wizard.lab.${key}`))} <span className="text-[#6B7A75] font-normal">({LAB_FIELD_UNITS[key]})</span>
                      <input
                        required
                        type="number"
                        value={labs[key] || ''}
                        onChange={(e) => setLabs({ ...labs, [key]: e.target.value })}
                        placeholder={t(tk(`advanced.lab.field.${key}.hint`))}
                        className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
                      />
                      <small className="text-[#6B7A75] font-normal">{t(tk(`advanced.lab.field.${key}.hint`))}</small>
                    </label>
                  ))}
                </div>

                <p className="text-xs text-[#6B7A75] bg-[#F4F1EB]/60 rounded-xl p-3 mt-4">{t(tk('wizard.labNote'))}</p>

                <div className={`mt-5 p-4 rounded-2xl text-sm font-bold ${labReady ? 'bg-emerald-50 text-emerald-800' : 'bg-[#D4AF37]/15 text-[#0F4C3A]'}`}>
                  {labReady ? '✓ ' + t(tk('wizard.step6.planHeader')) : t(tk('wizard.step6.empty'))}
                </div>

                <button disabled={!labReady} onClick={() => save(5)} className="w-full mt-5 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40">
                  {t(tk('wizard.care.next'))}
                </button>
              </>
            )}

            {step === 5 && (
              <>
                {selected.map((id) => {
                  const data = CONDITION_DATA[id];
                  return (
                    <div key={id} className="rounded-3xl border border-[#EFEBE4] bg-[#FDFBF7] p-5 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{data.icon}</span>
                        <div>
                          <b className="text-[#0F4C3A] text-lg block">{condName(id)}</b>
                          <p className="text-xs text-[#6B7A75]">{t(tk(`wizard.condition.${id}.focus`))}</p>
                        </div>
                        <span className="ml-auto text-xs font-semibold bg-[#0F4C3A] text-[#FDFBF7] rounded-full px-3 py-1">{t(tk(`wizard.condition.${id}.nutritionRules`))}</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="rounded-2xl bg-white border border-[#EFEBE4] p-4">
                          <h4 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.step5.exerciseHeader'))}</h4>
                          <p className="text-sm text-[#6B7A75] leading-relaxed">{t(tk(`wizard.condition.${id}.exercisePref`))}</p>
                        </div>
                        <div className="rounded-2xl bg-white border border-[#EFEBE4] p-4">
                          <h4 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.step5.rulesLabel'))}</h4>
                          <p className="text-sm text-[#6B7A75] leading-relaxed">{t(tk(`wizard.condition.${id}.nutritionRules`))}</p>
                        </div>
                        <div className="rounded-2xl bg-[#B91C1C]/5 border border-[#B91C1C]/20 p-4">
                          <h4 className="text-sm font-bold text-[#B91C1C] mb-2">{t(tk('wizard.step5.avoidHeader'))}</h4>
                          <p className="text-sm text-[#8a1c1c] leading-relaxed">{t(tk(`wizard.condition.${id}.avoid`))}</p>
                        </div>
                        <div className="rounded-2xl bg-[#0F4C3A]/5 border border-[#0F4C3A]/20 p-4">
                          <h4 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.step5.preferHeader'))}</h4>
                          <p className="text-sm text-[#0F4C3A]/80 leading-relaxed">{t(tk(`wizard.condition.${id}.prefer`))}</p>
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-[#6B7A75] uppercase tracking-wide mt-4 mb-2">{t(tk('wizard.step5.exampleMeals'))} ({cuisine})</p>
                      <div className="flex flex-wrap gap-2">
                        {(data.sampleMeals[cuisine] ?? data.sampleMeals.Egyptian ?? []).map((meal) => (
                          <span key={meal} className="inline-block rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#0F4C3A] text-xs px-3 py-1.5">{meal}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="grid md:grid-cols-2 gap-5 mt-6">
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0F4C3A] mb-3">{t(tk('wizard.plan.exercise'))}</h3>
                    <div className="space-y-3">
                      {([
                        ['choose', t(tk('wizard.step5.choose')), t(tk('wizard.step5.chooseDesc'))],
                        ['recommend', '🪄 ' + t(tk('wizard.step5.recommend')), t(tk('wizard.step5.recommendDesc'))],
                      ] as const).map(([value, title, desc]) => (
                        <button key={value} onClick={() => setExerciseMode(value)} className={`rounded-2xl border bg-white p-4 text-left w-full transition ${exerciseMode === value ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'}`}>
                          <strong className="block text-slate-900 text-sm">{title}</strong>
                          <small className="block mt-1 text-[#6B7A75]">{desc}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0F4C3A] mb-3">{t(tk('wizard.plan.nutrition'))}</h3>
                    <div className="space-y-3">
                      {([
                        ['choose', t(tk('wizard.step5.choose')), t(tk('wizard.step5.chooseDesc'))],
                        ['recommend', '📍 ' + t(tk('wizard.step5.recommend')), t(tk('wizard.step5.recommendDesc'))],
                      ] as const).map(([value, title, desc]) => (
                        <button key={value} onClick={() => setNutritionMode(value)} className={`rounded-2xl border bg-white p-4 text-left w-full transition ${nutritionMode === value ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'}`}>
                          <strong className="block text-slate-900 text-sm">{title}</strong>
                          <small className="block mt-1 text-[#6B7A75]">{desc}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={() => save(6)} className="w-full mt-8 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition">{t(tk('wizard.care.next'))}</button>
              </>
            )}

            {step === 6 && (
              <div className="space-y-6">
                {resolution && resolution.conflictDetected && selected.length > 1 && (
                  <div className="rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/10 p-4 text-sm text-[#0F4C3A] font-semibold leading-relaxed">
                    {t(tk('wizard.conflict.banner')).replace('{condition}', focusConditionName)}
                  </div>
                )}

                <div className="sticky top-4 z-10 rounded-[20px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-6 text-[#FDFBF7] shadow-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                      <div className="text-2xl">🏃</div>
                      <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{currentExerciseIds.length}</div>
                      <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t(tk('wizard.step6.summary.exercises')).replace('{count}', String(currentExerciseIds.length))}</div>
                    </div>
                    <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                      <div className="text-2xl">🍽️</div>
                      <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{mealCount}</div>
                      <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t(tk('wizard.step6.summary.meals')).replace('{count}', String(mealCount))}</div>
                    </div>
                    <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                      <div className="text-2xl">🍎</div>
                      <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{snackCount}</div>
                      <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t(tk('wizard.step6.summary.snacks')).replace('{count}', String(snackCount))}</div>
                    </div>
                    <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                      <div className="text-2xl">🔥</div>
                      <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{dailyKcal}</div>
                      <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t(tk('wizard.step6.summary.calories')).replace('{kcal}', String(dailyKcal))}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-[#FDFBF7]">
                    <b>{t(tk('wizard.step6.summary.focus')).replace('{focus}', '')}</b>{' '}
                    <span className="text-[#D4AF37] font-semibold">{focusLine}</span>
                  </p>

                  <p className="mt-2 text-xs text-[#FDFBF7]/85 leading-relaxed">
                    {breakdownLine} <b className="text-[#D4AF37]">= {dailyKcal} kcal</b>
                  </p>

                  {kcalExtended && (
                    <p className="mt-2 text-xs text-[#D4AF37] font-semibold">{t(tk('wizard.step6.calAdjusted'))}</p>
                  )}
                  {kcalExtended && (
                    <p className="mt-1 text-[11px] text-[#FDFBF7]/70">{t(tk('wizard.step6.minKcal')).replace('{kcal}', String(calorieFloor))}</p>
                  )}
                  {calorieFloorAdjusted && (
                    <p className="mt-2 text-xs text-[#D4AF37] font-semibold">{t(tk('wizard.step6.lowCalWarning'))}</p>
                  )}

                  <div className="mt-4 border-t border-[#FDFBF7]/15 pt-3">
                    <button type="button" onClick={() => setWhyOpen((open) => !open)} className="flex items-center justify-between w-full text-sm font-bold text-[#D4AF37]">
                      {t(tk('wizard.preview.whyTitle'))}
                      <ChevronDown size={16} className={`transition-transform ${whyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {whyOpen && focusCondition && (
                      <p className="mt-2 text-xs text-[#FDFBF7]/80 leading-relaxed">
                        {t(tk('wizard.preview.whyBody'))
                          .replace('{condition}', focusConditionName)
                          .replace('{source}', CONDITION_DATA[focusCondition].source)}
                      </p>
                    )}
                  </div>
                </div>

                {resolution && selected.length > 1 && (
                  <div className="rounded-2xl bg-white border border-[#EFEBE4] p-4 text-sm">
                    <h4 className="font-extrabold text-[#0F4C3A] text-base mb-2">⚖️ {t(tk('wizard.conflict.title'))}</h4>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      <div>
                        <span className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide">{t(tk('wizard.conflict.prioritized'))}</span>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {resolution.prioritized.map((id) => (
                            <span key={id} className="bg-[#0F4C3A] text-[#FDFBF7] text-xs font-bold rounded-full px-3 py-1.5">{CONDITION_DATA[id].icon} {condName(id as ConditionId)}</span>
                          ))}
                        </div>
                      </div>
                      {resolution.compromised.length > 0 && (
                        <div>
                          <span className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide">{t(tk('wizard.conflict.compromised'))}</span>
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            {resolution.compromised.map((id) => (
                              <span key={id} className="bg-[#D4AF37] text-[#0F4C3A] text-xs font-bold rounded-full px-3 py-1.5">{CONDITION_DATA[id].icon} {condName(id as ConditionId)}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#0F4C3A] text-[#FDFBF7] text-xs font-bold rounded-full px-3 py-1.5">{t(tk('wizard.step6.planHeader'))}</span>
                  {selected.map((id) => (
                    <span key={id} className="bg-[#D4AF37] text-[#0F4C3A] text-xs font-bold rounded-full px-3 py-1.5">
                      {CONDITION_DATA[id].icon} {condName(id)}
                    </span>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-extrabold text-lg text-[#0F4C3A]">
                        {t(tk('wizard.step6.exercisesHeader'))}
                        {exerciseMode === 'recommend' && <span className="ml-2 text-xs bg-[#0F4C3A] text-[#FDFBF7] rounded-full px-2 py-0.5 align-middle">{t(tk('wizard.step6.recommend'))}</span>}
                      </h3>
                      {exerciseMode === 'recommend' && (
                        <button onClick={() => setExerciseMode('choose')} className="text-xs text-[#0F4C3A] underline">{t(tk('wizard.step6.choose'))}</button>
                      )}
                    </div>

                    {exerciseMode === 'recommend' ? (
                      <div className="rounded-2xl bg-[#0F4C3A]/5 border border-[#0F4C3A]/15 p-4 text-sm text-[#0F4C3A] leading-relaxed">
                        <p className="font-semibold flex items-center gap-1.5"><Sparkles size={15} /> {selected.length} {t(tk('wizard.preview.exercises')).replace('{count}', String(recommendedExercises.length))}</p>
                        <div className="mt-3 space-y-2">
                          {recommendedExercises.map(({ exercise, score }) => (
                            <div key={exercise.id} className="flex items-start justify-between gap-2 bg-white rounded-xl border border-[#EFEBE4] p-3">
                              <div>
                                <b className="block text-slate-900">{exercise[exerciseName(exercise)]}</b>
                                <small className="text-[#6B7A75]">{exercise.duration} · {exercise.calories} kcal</small>
                              </div>
                              <span className={`shrink-0 text-[10px] font-bold rounded-full px-2 py-1 ${badgeStyle[score].bg}`}>{badgeLabel(score)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {pool.length === 0 && <p className="text-sm text-[#6B7A75]">{t(tk('wizard.step6.empty'))}</p>}
                        {pool.map(({ exercise, score }) => {
                          const active = pickedExercises.includes(exercise.id);
                          return (
                            <button key={exercise.id} onClick={() => togglePickExercise(exercise.id)} className={`w-full flex items-start justify-between gap-2 rounded-xl border p-3 transition ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-white'} ${score === 'avoid' ? 'opacity-60' : ''}`}>
                              <span className="text-left">
                                <b className={`block text-sm ${score === 'avoid' ? 'text-[#6B7A75] line-through' : 'text-slate-900'}`}>{exercise[exerciseName(exercise)]}</b>
                                <small className="text-[#6B7A75]">{exercise.duration} · {exercise.calories} kcal</small>
                              </span>
                              <span className="flex items-center gap-2">
                                <span className={`shrink-0 text-[10px] font-bold rounded-full px-2 py-1 ${badgeStyle[score].bg}`}>{badgeLabel(score)}</span>
                                {active && <span className="h-5 w-5 rounded-full bg-[#D4AF37] text-[#0F4C3A] text-xs font-bold flex items-center justify-center">✓</span>}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-extrabold text-lg text-[#0F4C3A]">
                        {t(tk('wizard.step6.nutritionHeader'))}
                        {nutritionMode === 'recommend' && <span className="ml-2 text-xs bg-[#D4AF37] text-[#0F4C3A] rounded-full px-2 py-0.5 align-middle">{t(tk('wizard.step6.recommend'))}</span>}
                      </h3>
                      {nutritionMode === 'recommend' && (
                        <button onClick={() => setNutritionMode('choose')} className="text-xs text-[#0F4C3A] underline">{t(tk('wizard.step6.choose'))}</button>
                      )}
                    </div>

                    {nutritionMode === 'recommend' ? (
                      <div className="rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-4 text-sm text-[#0F4C3A] leading-relaxed">
                        <p className="font-semibold">{t(tk('wizard.preview.meals')).replace('{count}', String(currentFoodNames.length))}</p>
                        <div className="mt-3 space-y-2">
                          {recommendedFoods.map((name) => {
                            const food = foodById.get(name);
                            if (!food) return null;
                            const score = foodScoreById.get(name) ?? 'limit';
                            return (
                              <div key={name} className="flex items-start justify-between gap-2 bg-white rounded-xl border border-[#EFEBE4] p-3">
                                <div>
                                  <b className="block text-slate-900">{food.name_en}</b>
                                  <small className="text-[#6B7A75]">{mealSlotLabel(name)} · {food.calories} kcal</small>
                                </div>
                                <span className={`shrink-0 text-[10px] font-bold rounded-full px-2 py-1 ${badgeStyle[score].bg}`}>{badgeLabel(score)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {CUISINES.map(([flag, name]) => (
                            <button key={name} onClick={() => setCuisine(name)} className={`rounded-xl border px-2 py-2 text-xs transition ${cuisine === name ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0F4C3A] font-bold' : 'border-[#EFEBE4] bg-white text-[#6B7A75]'}`}>
                              {flag}<br />{name}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2 mb-3">
                          {MEAL_TABS.map(({ key, i18n }) => (
                            <button key={key} onClick={() => setMealType(key)} className={`flex-1 rounded-full border px-3 py-2 text-xs transition ${mealType === key ? 'bg-[#0F4C3A] text-[#FDFBF7] border-[#0F4C3A]' : 'border-[#EFEBE4] bg-white text-[#6B7A75]'}`}>
                              {t(tk(i18n))}
                            </button>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {filteredFoods.map(({ food, score }) => {
                            const active = pickedFoods.includes(food.name_en);
                            return (
                              <button key={food.name_en} onClick={() => togglePickFood(food.name_en)} className={`w-full flex items-start justify-between gap-2 rounded-xl border p-3 transition ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-white'} ${score === 'avoid' ? 'opacity-60' : ''}`}>
                                <span className="text-left">
                                  <b className={`block text-sm ${score === 'avoid' ? 'text-[#6B7A75] line-through' : 'text-slate-900'}`}>{food.name_en}</b>
                                  <small className="text-[#6B7A75]">{food.calories} kcal{food.protein ? ` · ${food.protein} g protein` : ''}</small>
                                </span>
                                <span className="flex items-center gap-2">
                                  <span className={`shrink-0 text-[10px] font-bold rounded-full px-2 py-1 ${badgeStyle[score].bg}`}>{badgeLabel(score)}</span>
                                  {active && <span className="h-5 w-5 rounded-full bg-[#D4AF37] text-[#0F4C3A] text-xs font-bold flex items-center justify-center">✓</span>}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {step === 6 && (
        <div className="fixed bottom-0 inset-x-0 bg-[#FDFBF7]/95 backdrop-blur border-t border-[#EFEBE4] px-4 py-3 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <p className="text-sm text-[#6B7A75] truncate">
                {focusConditionName ? `${focusConditionName} · ` : ''}{dailyKcal} kcal
              </p>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button onClick={handleDownloadPdf} className="shrink-0 bg-[#FDFBF7] border-2 border-[#0F4C3A] text-[#0F4C3A] font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#0F4C3A]/5 transition">
                  {t(tk('wizard.step6.downloadPdf'))}
                </button>
                <button onClick={handleSaveAccount} className="shrink-0 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition">
                  {t(tk('wizard.step6.saveAccount'))}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#6B7A75] mt-1.5">{t(tk('wizard.step6.privacyNote'))}</p>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-24 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedCareWizardPage;