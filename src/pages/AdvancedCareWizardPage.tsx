import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  HeartPulse,
  FlaskConical,
  PersonStanding,
  Microscope,
  Target,
  UtensilsCrossed,
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
import { useAdmin } from '../context/AdminContext';
import { translations } from '../i18n/translations';
import HealthBlueprintHero from '../components/wizard/HealthBlueprintHero';
import WhatsIncluded from '../components/wizard/WhatsIncluded';
import type { BlueprintExerciseItem, BlueprintFoodItem } from '../components/wizard/WhatsIncluded';
import SevenDayJourney from '../components/wizard/SevenDayJourney';
import type { JourneyExerciseItem, JourneyFoodItem } from '../components/wizard/SevenDayJourney';
import WhyChooseUs from '../components/wizard/WhyChooseUs';
import EmbeddedPricing from '../components/wizard/EmbeddedPricing';
import EmbeddedFAQ from '../components/wizard/EmbeddedFAQ';
import StickyPlanBar from '../components/wizard/StickyPlanBar';

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
  2: { icon: FlaskConical, color: EMERALD },
  3: { icon: PersonStanding, color: GOLD },
  4: { icon: Microscope, color: EMERALD },
  5: { icon: UtensilsCrossed, color: GOLD },
  6: { icon: Target, color: EMERALD },
};

const railChip = (s: number): { value: string; sub?: string } | undefined => {
  if (s === 2) return { value: '🧪' };
  if (s === 3) return { value: '⚖️', sub: 'BMI' };
  if (s === 4) return { value: '🩸' };
  if (s === 5) return { value: '🍽️' };
  return undefined;
};
const railChip2 = (s: number): { value: string; sub?: string } | undefined =>
  s === 5 ? { value: '🏋️' } : undefined;

const badgeStyle: Record<FoodScore, { bg: string; label: FoodScore }> = {
  safe: { bg: `bg-[#0F4C3A] text-[#FDFBF7]`, label: 'safe' },
  limit: { bg: `bg-[#D4AF37] text-[#0F4C3A]`, label: 'limit' },
  avoid: { bg: `bg-[#B91C1C] text-white`, label: 'avoid' },
};

const AdvancedCareWizardPage: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
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
    if (isAdmin) {
      navigate('/advanced-care');
      return;
    }
    if (user) navigate('/premium');
    else navigate('/advanced-care/wizard/signup');
  };

  const exerciseById = useMemo(
    () => new Map(EXERCISES_DATABASE.map((exercise) => [exercise.id, exercise])),
    [],
  );

  const firstName = useMemo(() => {
    try {
      const account = localStorage.getItem('hc_advanced_care_account');
      if (account) {
        const parsed = JSON.parse(account) as { name?: string };
        const parsedName = parsed.name?.trim().split(/\s+/)[0] ?? '';
        if (parsedName) return parsedName;
      }
    } catch {
      /* ignore */
    }
    if (user && user.name && user.name !== 'Guest') {
      const userName = user.name.trim().split(/\s+/)[0] ?? '';
      if (userName) return userName;
    }
    return '';
  }, [user]);

  const exerciseItems: BlueprintExerciseItem[] = currentExerciseIds
    .map((id) => exerciseById.get(id))
    .filter((ex): ex is Exercise => Boolean(ex))
    .map((ex) => ({ name: String(ex[exerciseName(ex)]), meta: `${ex.duration} · ${ex.calories} kcal` }));

  const foodItems: BlueprintFoodItem[] = currentFoodNames
    .map((name) => foodById.get(name))
    .filter((food): food is FoodItem => Boolean(food))
    .map((food) => {
      const slot: BlueprintFoodItem['slot'] =
        food.mealType === 'breakfast' || food.mealType === 'lunch' || food.mealType === 'dinner'
          ? food.mealType
          : 'snack';
      return {
        name: food.name_en,
        slot,
        kcal: food.calories || 0,
        meta: `${mealSlotLabel(food.name_en)} · ${food.calories} kcal`,
      };
    });

  const journeyFoods: JourneyFoodItem[] = foodItems.map(({ name, slot, kcal }) => ({ name, slot, kcal }));
  const journeyExercises: JourneyExerciseItem[] = exerciseItems;

  const stickySubtitle =
    step === 6
      ? focusConditionName
        ? `${focusConditionName} · ${dailyKcal} kcal`
        : `${dailyKcal} kcal`
      : `${step} / 6`;

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
    <div className="min-h-screen bg-[#FDFBF7] pb-28" dir={dir}>
      <div className="h-1.5 bg-[#EFEBE4]">
        <div className="h-full bg-[#0F4C3A] transition-all duration-500" style={{ width: `${(step / 6) * 100}%` }} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="step-pill">{t(tk('wizard.eyebrow'))} · {step}/6</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F4C3A] mt-3">{stepTitle}</h1>
            <p className="text-[#4A5A55] mt-2">{t(tk('wizard.subtitle'))}</p>
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

        {step === 6 ? (
          <div className="space-y-12">
            {resolution && resolution.conflictDetected && selected.length > 1 && (
              <div className="rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/10 p-4 text-sm text-[#0F4C3A] font-semibold leading-relaxed">
                {t(tk('wizard.conflict.banner')).replace('{condition}', focusConditionName)}
              </div>
            )}

            <HealthBlueprintHero
              name={firstName}
              dailyKcal={dailyKcal}
              exerciseCount={currentExerciseIds.length}
              mealCount={mealCount}
              snackCount={snackCount}
              focusTags={selected.map(condName)}
              lowCal={calorieFloorAdjusted}
              onCta={handleSaveAccount}
            />

            <WhatsIncluded
              exerciseCount={currentExerciseIds.length}
              mealCount={mealCount}
              snackCount={snackCount}
              exercises={exerciseItems}
              foods={foodItems}
            />

            <SevenDayJourney foods={journeyFoods} exercises={journeyExercises} />

            <WhyChooseUs />

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-[24px] border border-[#EFEBE4] bg-white px-6 py-5">
              <span className="text-sm font-extrabold text-[#0F4C3A]">{t(tk('wizard.blueprint.social.rating'))}</span>
              <span className="text-sm font-bold text-[#4A5A55]">{t(tk('wizard.blueprint.social.users'))}</span>
              <span className="text-sm font-bold text-[#4A5A55]">{t(tk('wizard.blueprint.social.secure'))}</span>
            </div>

            <EmbeddedPricing onCta={handleSaveAccount} />

            <EmbeddedFAQ />

            <section className="rounded-[32px] border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-center md:p-14">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#FDFBF7] md:text-[36px]">{t(tk('wizard.blueprint.cta.title'))}</h2>
              <p className="mt-3 text-sm text-[#A7C4B8] md:text-[15px]">{t(tk('wizard.blueprint.cta.subtitle'))}</p>
              <button
                type="button"
                onClick={handleSaveAccount}
                className="mt-7 rounded-full bg-[#D4AF37] px-8 py-4 font-extrabold text-[#0F4C3A] shadow-[0_14px_34px_-10px_rgba(212,175,55,0.7)] transition hover:bg-[#c9a52e]"
              >
                {t(tk('advanced.finalCta.cta'))}
              </button>
              <p className="mt-3 text-xs font-bold text-[#A7C4B8]">{t(tk('wizard.blueprint.cta.secondary'))}</p>
            </section>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-start">
            <div className="hidden lg:block space-y-5 sticky top-24">
              <IconScene
                icon={stepScene[step].icon}
                color={stepScene[step].color}
                large
                chip={step >= 2 ? railChip(step) : undefined}
                chip2={railChip2(step)}
              />

              {step >= 2 && step <= 5 && (
                <>
                  <div className="rounded-[24px] bg-[#0F4C3A] text-[#FDFBF7] p-5 shadow-[0_18px_44px_-18px_rgba(15,76,58,0.5)]">
                    <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
                      ✨ {t(tk('wizard.rail.hdr'))}
                    </span>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#FDFBF7]/90">
                      {t(tk(`wizard.rail.step${step}.fact`))}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#D4AF37]/50 bg-[#D4AF37]/10 p-5">
                    <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#6b4f0c]">
                      💡 {t(tk('wizard.rail.tipHdr'))}
                    </span>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#4A5A55]">
                      {t(tk(`wizard.rail.step${step}.tip`))}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white border border-[#EFEBE4] rounded-[28px] p-6 md:p-10 shadow-[0_10px_40px_-20px_rgba(15,76,58,0.15)] min-h-[430px]" key={step}>
            {step === 1 && (
              <>
                <p className="text-[#4A5A55] mb-6">{t(tk('wizard.chooseMultiple'))}</p>
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
                      <div key={id} className="rounded-2xl bg-[#F4F1EB]/60 border border-[#EFEBE4] p-4 text-sm text-[#4A5A55] flex gap-3">
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
                <p className="text-[#4A5A55] mb-6">{t(tk('wizard.labsIntro'))}</p>
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
                        <small className="block mt-1 text-[#4A5A55]">{value === 'true' ? t(tk('wizard.labsYesSub')) : t(tk('wizard.labsNoSub'))}</small>
                      </button>
                    );
                  })}
                </div>
                {hasLabs === true && (
                  <p className="text-xs text-[#4A5A55] bg-[#F4F1EB]/60 rounded-xl p-3">{t(tk('wizard.labsNote'))}</p>
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
                      <button className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${profile.gender === 'male' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0F4C3A]' : 'border-[#EFEBE4] text-[#4A5A55]'}`} onClick={() => setProfile({ ...profile, gender: 'male' })}>{t(tk('wizard.male'))}</button>
                      <button className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${profile.gender === 'female' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0F4C3A]' : 'border-[#EFEBE4] text-[#4A5A55]'}`} onClick={() => setProfile({ ...profile, gender: 'female' })}>{t(tk('wizard.female'))}</button>
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
                      <p className="mt-1 text-[#4A5A55]">{t(tk(`wizard.condition.${id}.focus`))}</p>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  {activeFields.map((key) => (
                    <label key={key} className="block text-sm font-semibold text-slate-900">
                      {t(tk(`wizard.lab.${key}`))} <span className="text-[#4A5A55] font-normal">({LAB_FIELD_UNITS[key]})</span>
                      <input
                        required
                        type="number"
                        value={labs[key] || ''}
                        onChange={(e) => setLabs({ ...labs, [key]: e.target.value })}
                        placeholder={t(tk(`advanced.lab.field.${key}.hint`))}
                        className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
                      />
                      <small className="text-[#4A5A55] font-normal">{t(tk(`advanced.lab.field.${key}.hint`))}</small>
                    </label>
                  ))}
                </div>

                <p className="text-xs text-[#4A5A55] bg-[#F4F1EB]/60 rounded-xl p-3 mt-4">{t(tk('wizard.labNote'))}</p>

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
                          <p className="text-xs text-[#4A5A55]">{t(tk(`wizard.condition.${id}.focus`))}</p>
                        </div>
                        <span className="ml-auto text-xs font-semibold bg-[#0F4C3A] text-[#FDFBF7] rounded-full px-3 py-1">{t(tk(`wizard.condition.${id}.nutritionRules`))}</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="rounded-2xl bg-white border border-[#EFEBE4] p-4">
                          <h4 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.step5.exerciseHeader'))}</h4>
                          <p className="text-sm text-[#4A5A55] leading-relaxed">{t(tk(`wizard.condition.${id}.exercisePref`))}</p>
                        </div>
                        <div className="rounded-2xl bg-white border border-[#EFEBE4] p-4">
                          <h4 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.step5.rulesLabel'))}</h4>
                          <p className="text-sm text-[#4A5A55] leading-relaxed">{t(tk(`wizard.condition.${id}.nutritionRules`))}</p>
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

                      <p className="text-xs font-semibold text-[#4A5A55] uppercase tracking-wide mt-4 mb-2">{t(tk('wizard.step5.exampleMeals'))} ({cuisine})</p>
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
                          <small className="block mt-1 text-[#4A5A55]">{desc}</small>
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
                          <small className="block mt-1 text-[#4A5A55]">{desc}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={() => save(6)} className="w-full mt-8 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition">{t(tk('wizard.care.next'))}</button>
              </>
            )}

            </div>
          </div>
        )}
      </section>

      <StickyPlanBar subtitle={stickySubtitle} onSave={handleSaveAccount} onDownload={handleDownloadPdf} />
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