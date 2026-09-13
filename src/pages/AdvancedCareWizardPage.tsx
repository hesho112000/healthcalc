import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { HeartPulse, FlaskConical, PersonStanding, Activity, Target, UtensilsCrossed, ClipboardCheck, Rocket } from 'lucide-react';
import { CONDITION_DATA, CONDITION_IDS } from '../data/conditions';
import { exercisePoolFor, foodPoolFor, isConditionId, resolveConflicts } from '../data/conditions';
import type { ConditionId, ScoredExercise, ScoredFood } from '../data/conditions';
import type { Exercise } from '../data/exercises/types';
import { EXERCISES_DATABASE } from '../data/exercises/index';
import { FOODS_DATABASE } from '../utils/calculations';
import type { FoodItem } from '../utils/calculations';
import {
  calculateGoutScore,
  calculateHeartScore,
  calculateKidneyScore,
  calculateLiverScore,
  calculatePancreasScore,
  calculateThyroidScore,
} from '../utils/healthScoring';
import { IconScene } from '../components/IconScene';
import StickyPlanBar from '../components/wizard/StickyPlanBar';
import ConditionStep from '../components/wizard/ConditionStep';
import BasicInfoStep from '../components/wizard/BasicInfoStep';
import LabsStep from '../components/wizard/LabsStep';
import LifestyleStep from '../components/wizard/LifestyleStep';
import GoalStep from '../components/wizard/GoalStep';
import CuisineExercisesStep from '../components/wizard/CuisineExercisesStep';
import PlanResultsStep from '../components/wizard/PlanResultsStep';
import SubscriptionStep from '../components/wizard/SubscriptionStep';
import WhatsIncluded from '../components/wizard/WhatsIncluded';
import type { BlueprintExerciseItem, BlueprintFoodItem } from '../components/wizard/WhatsIncluded';
import SevenDayJourney from '../components/wizard/SevenDayJourney';
import type { JourneyExerciseItem, JourneyFoodItem } from '../components/wizard/SevenDayJourney';
import WhyChooseUs from '../components/wizard/WhyChooseUs';
import EmbeddedFAQ from '../components/wizard/EmbeddedFAQ';
import PaywallModal from '../components/health-universe/PaywallModal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import type { FeatureId, Tier } from '../context/SubscriptionContext';
import { savePlanToStorage } from '../utils/planStorage';
import { translations } from '../i18n/translations';
import type { LucideIcon } from 'lucide-react';
import type { TKey, LabValues, WizardGoal, WizardLifestyle } from '../components/wizard/stepTypes';

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

const CUISINE_LOOKUP: Record<string, string> = {
  Egyptian: 'egyptian',
  Tunisian: 'tunisian',
  Saudi: 'saudi',
  Lebanese: 'lebanese',
  American: 'american',
  Italian: 'italian',
};

const MEAL_TABS: Array<{ key: FoodItem['mealType']; i18n: string }> = [
  { key: 'breakfast', i18n: 'wizard.step6.mealBreakfast' },
  { key: 'lunch', i18n: 'wizard.step6.mealLunch' },
  { key: 'dinner', i18n: 'wizard.step6.mealDinner' },
  { key: 'snack', i18n: 'wizard.step6.mealSnack' },
];

const ACTIVITY_MULTIPLIER: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const DEFICIT_BY_INTENSITY: Record<string, number> = { light: 300, medium: 500, intense: 800 };

const stepScene: Record<number, { icon: LucideIcon; color: string }> = {
  1: { icon: HeartPulse, color: GOLD },
  2: { icon: PersonStanding, color: EMERALD },
  3: { icon: FlaskConical, color: GOLD },
  4: { icon: Activity, color: EMERALD },
  5: { icon: Target, color: GOLD },
  6: { icon: UtensilsCrossed, color: EMERALD },
  7: { icon: ClipboardCheck, color: GOLD },
  8: { icon: Rocket, color: EMERALD },
};

const railChip = (s: number): { value: string; sub?: string } | undefined => {
  if (s === 3) return { value: '🩸' };
  if (s === 6) return { value: '🍽️' };
  return undefined;
};
const railChip2 = (s: number): { value: string; sub?: string } | undefined =>
  s === 6 ? { value: '🏋️' } : undefined;

const railStepFor = (s: number): number | undefined =>
  s === 3 ? 2 : s === 6 ? 5 : undefined;

const exerciseCategoryOf = (ex: Exercise): string => {
  const name = ex.nameEn.toLowerCase();
  if (ex.type === 'hiit') return 'hiit';
  if (ex.type === 'strength') return 'strength';
  if (/swim|aqua/.test(name)) return 'swimming';
  if (/walk|treadmill|stair|hike/.test(name)) return 'walking';
  if (/cycl|bike|spin/.test(name)) return 'cycling';
  if (/pilates/.test(name)) return 'pilates';
  if (ex.type === 'mindbody' || ex.type === 'flexibility' || /yoga|pilates|stretch|meditat|breath/.test(name)) {
    return 'yoga';
  }
  return 'cardio';
};

const AdvancedCareWizardPage: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasFeature, upgrade, setTier } = useSubscription();
  const [paywallFeature, setPaywallFeature] = useState<FeatureId | null>(null);
  const [searchParams] = useSearchParams();
  const fromUrlConditions: ConditionId[] = (() => {
    const raw = searchParams.get('conditions') || searchParams.get('condition');
    if (!raw) return [];
    return raw
      .split(',')
      .map((id) => id.trim())
      .filter(isConditionId);
  })();
  const preselectedFromUrl = fromUrlConditions.length > 0;
  const [step, setStep] = useState<number>(() => {
    const raw = searchParams.get('step');
    const s = Number(raw);
    return s >= 1 && s <= 8 ? s : 1;
  });
  const [selected, setSelected] = useState<ConditionId[]>(fromUrlConditions);
  const [hasLabs, setHasLabs] = useState<boolean | null>(null);
  const [profile, setProfile] = useState({ age: 35, height: 170, weight: 70, gender: 'male' as 'male' | 'female' });
  const [labs, setLabs] = useState<LabValues>({});
  const [lifestyle, setLifestyle] = useState<WizardLifestyle>({ activity: '', sleep: '', stress: '' });
  const [goal, setGoal] = useState<WizardGoal>({ type: '', targetWeight: '', timelineMonths: 3, intensity: '' });
  const [cuisine, setCuisine] = useState('Egyptian');
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (preselectedFromUrl) return;
    const saved = localStorage.getItem('hc_advanced_care');
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<{
        step: number;
        selected: string[];
        hasLabs: boolean | null;
        profile: typeof profile;
        labs: LabValues;
        lifestyle: WizardLifestyle;
        goal: WizardGoal;
        cuisine: string;
        exerciseTypes: string[];
      }>;
      const savedSelected = Array.isArray(parsed.selected) ? parsed.selected.filter((id) => isConditionId(id)) : [];
      if (savedSelected.length > 0) setSelected(savedSelected);
      if (typeof parsed.hasLabs === 'boolean' || parsed.hasLabs === null) setHasLabs(parsed.hasLabs);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.labs && typeof parsed.labs === 'object') setLabs(parsed.labs);
      if (parsed.lifestyle && typeof parsed.lifestyle === 'object') setLifestyle(parsed.lifestyle);
      if (parsed.goal && typeof parsed.goal === 'object') setGoal(parsed.goal);
      if (typeof parsed.cuisine === 'string') setCuisine(parsed.cuisine);
      if (Array.isArray(parsed.exerciseTypes)) setExerciseTypes(parsed.exerciseTypes);
      if (typeof parsed.step === 'number' && parsed.step >= 1 && parsed.step <= 8) setStep(parsed.step);
    } catch {
      localStorage.removeItem('hc_advanced_care');
    }
  }, []);

  const save = (nextStep: number) => {
    localStorage.setItem(
      'hc_advanced_care',
      JSON.stringify({ step: nextStep, selected, hasLabs, profile, labs, lifestyle, goal, cuisine, exerciseTypes }),
    );
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCondition = (id: ConditionId) =>
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const tk = (key: string): TKey => key as TKey;
  const condName = (id: ConditionId) => t(tk(`wizard.condition.${id}.name`));
  const primary = selected[0] ?? null;
  const conditionLabel = primary ? condName(primary) : '';
  const conditionList = selected.map(condName).filter(Boolean).join(', ');

  const activeFields = useMemo(
    () => selected.flatMap((id) => (id === 'ibs' ? [] : LAB_FIELD_KEYS[id])),
    [selected],
  );

  const pool: ScoredExercise[] = useMemo(() => exercisePoolFor(selected), [selected]);
  const foodPool: ScoredFood[] = useMemo(() => foodPoolFor(selected), [selected]);

  const foodById = useMemo(() => new Map(FOODS_DATABASE.map((food) => [food.name_en, food])), []);
  const exerciseById = useMemo(() => new Map(EXERCISES_DATABASE.map((exercise) => [exercise.id, exercise])), []);

  const recommendedExercises = useMemo(() => pool.filter((item) => item.score !== 'avoid').slice(0, 7), [pool]);

  const bmr = useMemo(() => {
    const base = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    return Math.round(base + (profile.gender === 'female' ? -161 : 5));
  }, [profile]);

  const calorieFloor = useMemo(() => Math.max(1200, Math.round(bmr * 1.1)), [bmr]);

  const calorieTarget = useMemo(() => {
    const tdee = Math.round(bmr * (ACTIVITY_MULTIPLIER[lifestyle.activity] ?? 1.375));
    let target = tdee;
    if (goal.type === 'lose') target -= DEFICIT_BY_INTENSITY[goal.intensity] ?? 0;
    else if (goal.type === 'gain') target += 250;
    return Math.max(1400, target);
  }, [bmr, lifestyle.activity, goal.type, goal.intensity]);

  const planFoodPool = useMemo(() => {
    const safe = foodPool.filter((item) => item.score !== 'avoid');
    const cuis = CUISINE_LOOKUP[cuisine];
    if (!cuis) return safe;
    const matched = safe.filter((item) =>
      item.food.cuisine.some((c) => {
        const cl = c.toLowerCase();
        return cl === 'all' || cl === cuis || cl.includes(cuis);
      }),
    );
    return matched.length >= 4 ? matched : safe;
  }, [foodPool, cuisine]);

  const recommendation = useMemo(() => {
    const slots: Array<FoodItem['mealType']> = ['breakfast', 'lunch', 'dinner', 'snack', 'snack'];
    const out: string[] = [];
    const taken = new Set<string>();
    const safe = planFoodPool;
    const target = Math.max(calorieTarget, calorieFloor);
    for (const slot of slots) {
      const pick = safe.find((item) => item.food.mealType === slot && !taken.has(item.food.name_en))
        ?? safe.find((item) => !taken.has(item.food.name_en));
      if (!pick) break;
      taken.add(pick.food.name_en);
      out.push(pick.food.name_en);
    }
    const sum = () => out.reduce((total, name) => total + (foodById.get(name)?.calories ?? 0), 0);
    let extended = false;
    if (sum() < target) {
      extended = true;
      const extras = safe
        .filter((item) => !taken.has(item.food.name_en))
        .sort((a, b) => (b.food.calories ?? 0) - (a.food.calories ?? 0));
      for (const item of extras) {
        if (sum() >= target) break;
        taken.add(item.food.name_en);
        out.push(item.food.name_en);
      }
    }
    return { foods: out, extended };
  }, [planFoodPool, foodById, calorieFloor, calorieTarget]);

  const recommendedFoods = recommendation.foods;
  const kcalExtended = recommendation.extended;

  const exerciseName = (exercise: Exercise) =>
    (({ en: 'nameEn', fr: 'nameFr', es: 'nameEs', ar: 'nameAr', de: 'nameEn' } as const)[language]) as keyof Exercise;

  const currentExerciseIds = useMemo(() => {
    if (exerciseTypes.length === 0) return recommendedExercises.map((item) => item.exercise.id);
    const filtered = recommendedExercises.filter((item) =>
      exerciseTypes.some((type) => exerciseCategoryOf(item.exercise) === type),
    );
    return filtered.length >= 2
      ? filtered.map((item) => item.exercise.id)
      : recommendedExercises.map((item) => item.exercise.id);
  }, [recommendedExercises, exerciseTypes]);

  const currentFoodNames = recommendedFoods;

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

  const mealBreakdownPairs: Array<[TKey, 'breakfast' | 'lunch' | 'dinner' | 'snack']> = [
    ['wizard.step6.mealBreakfast' as TKey, 'breakfast'],
    ['wizard.step6.mealLunch' as TKey, 'lunch'],
    ['wizard.step6.mealDinner' as TKey, 'dinner'],
    ['wizard.step6.mealSnack' as TKey, 'snack'],
  ];

  const mealSlotLabel = (name: string) => {
    const food = foodById.get(name);
    const kind = food?.mealType;
    const key = kind === 'breakfast' ? 'wizard.step6.mealBreakfast'
      : kind === 'lunch' ? 'wizard.step6.mealLunch'
      : kind === 'dinner' ? 'wizard.step6.mealDinner'
      : 'wizard.step6.mealSnack';
    return t(tk(key));
  };

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

  const macros = useMemo(() => {
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    currentFoodNames.forEach((name) => {
      const food = foodById.get(name);
      if (!food) return;
      protein += food.protein || 0;
      carbs += food.carbs || 0;
      fat += food.fat || 0;
    });
    return { protein: Math.round(protein), carbs: Math.round(carbs), fat: Math.round(fat) };
  }, [currentFoodNames, foodById]);

  const sampleMeals = useMemo(() => {
    const all = selected.flatMap((id) => CONDITION_DATA[id].sampleMeals[cuisine] ?? CONDITION_DATA[id].sampleMeals.Egyptian ?? []);
    return [...new Set(all)].slice(0, 8);
  }, [selected, cuisine]);

  const numericLabs = useMemo(() => {
    const out: Record<string, number> = {};
    Object.entries(labs).forEach(([key, value]) => {
      const n = parseFloat(value ?? '');
      if (Number.isFinite(n)) out[key] = n;
    });
    return out;
  }, [labs]);

  const labsScoreFor = (id: ConditionId): number | null => {
    if (id === 'ibs') return null;
    switch (id) {
      case 'diabetes':
        return calculatePancreasScore(numericLabs);
      case 'hypertension':
      case 'cholesterol':
        return calculateHeartScore(numericLabs);
      case 'gout':
        return calculateGoutScore(numericLabs);
      case 'liver':
        return calculateLiverScore(numericLabs);
      case 'kidney':
        return calculateKidneyScore(numericLabs);
      case 'thyroid':
        return calculateThyroidScore(numericLabs);
      default:
        return null;
    }
  };

  const lifestyleScoreFor = (id: ConditionId): number => {
    let score = CONDITION_DATA[id]?.defaultHealthScore ?? 78;
    if (profile.age > 60) score -= 4;
    else if (profile.age > 50) score -= 2;
    switch (lifestyle.activity) {
      case 'sedentary': score -= 6; break;
      case 'light': score -= 3; break;
      case 'moderate': break;
      case 'active': score += 2; break;
      case 'veryActive': score += 4; break;
      default: break;
    }
    switch (lifestyle.sleep) {
      case 'less6': score -= 5; break;
      case '6to7': score -= 2; break;
      case 'more8': score -= 1; break;
      default: break;
    }
    switch (lifestyle.stress) {
      case 'medium': score -= 2; break;
      case 'high': score -= 5; break;
      default: break;
    }
    return Math.round(Math.min(96, Math.max(25, score)));
  };

  const scoreRows = useMemo(
    () =>
      selected.map((id) => ({
        id,
        icon: CONDITION_DATA[id].icon,
        label: condName(id),
        score: labsScoreFor(id) ?? lifestyleScoreFor(id),
      })),
    [selected, numericLabs, lifestyle, profile],
  );

  const overall =
    scoreRows.length > 0
      ? Math.round(scoreRows.reduce((sum, row) => sum + row.score, 0) / scoreRows.length)
      : null;

  const intensityIndex = goal.intensity === 'light' ? 0 : goal.intensity === 'intense' ? 2 : 1;
  const boost = 4 + (goal.intensity ? intensityIndex : 0);
  const projected = overall !== null ? Math.min(95, Math.round(overall + boost)) : null;

  const numericLabsByCondition = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    selected.forEach((id) => {
      if (id === 'ibs') return;
      const markers = LAB_FIELD_KEYS[id] ?? [];
      markers.forEach((marker) => {
        const value = parseFloat(labs[marker] ?? '');
        if (Number.isFinite(value)) {
          map[id] = { ...(map[id] ?? {}), [marker]: value };
        }
      });
    });
    return map;
  }, [selected, labs]);

  const persistPlan = useCallback(() => {
    savePlanToStorage({
      version: 3,
      conditions: selected,
      profile,
      labs: numericLabsByCondition,
      lifestyle,
      goal,
      cuisine,
      exerciseTypes,
      foodNames: currentFoodNames,
      exerciseIds: currentExerciseIds,
      calories: calorieTarget,
      dailyKcal,
      calorieFloor,
      kcalExtended,
      kcalBreakdown,
      meals: mealCount,
      snacks: snackCount,
      focusCondition,
      overall,
      projected,
    });
  }, [
    selected, profile, numericLabsByCondition, lifestyle, goal, cuisine, exerciseTypes,
    currentFoodNames, currentExerciseIds, calorieTarget, dailyKcal, calorieFloor,
    kcalExtended, kcalBreakdown, mealCount, snackCount, focusCondition, overall, projected,
  ]);

  const finishWizard = (tier: Tier) => {
    persistPlan();
    setTier(tier);
    navigate('/my-health-hub', { state: { planReady: true } });
  };

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
    if (!hasFeature('pdfDownload')) {
      setPaywallFeature('pdfDownload');
      return;
    }
    persistPlan();
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

  const handleAutoSelect = () => {
    setExerciseTypes(
      [...new Set(recommendedExercises.map((item) => exerciseCategoryOf(item.exercise)).filter(Boolean))].slice(0, 4),
    );
    setToast(t(tk('wizard.autoSelect.done')));
    window.setTimeout(() => setToast(''), 2800);
  };

  const goToResults = () => save(7);
  const goToSubscription = () => save(8);
  const startTrial = () => finishWizard('pro');
  const continueFree = () => finishWizard('free');

  const stepTitle = [
    t(tk('wizard.care.step1.title')),
    t(tk('wizard.care.step3.title')),
    t(tk('wizard.care.step2.title')),
    t(tk('wizard.care.stepLifestyle.title')),
    t(tk('wizard.care.stepGoal.title')),
    t(tk('wizard.care.stepPersonalize.title')),
    t(tk('wizard.care.step7.title')),
    t(tk('wizard.care.step8.title')),
  ][step - 1];

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

  useEffect(() => {
    if (step < 7) return;
    persistPlan();
  }, [step, persistPlan]);

  const stickySubtitle =
    step === 7 ? (focusConditionName ? `${focusConditionName} · ${calorieTarget} kcal` : `${calorieTarget} kcal`) : `${step} / 8`;

  const mealBreakdown = mealBreakdownPairs
    .map(([key, slot]) => ({ key, kcal: kcalBreakdown[slot] }))
    .filter((entry) => entry.kcal > 0);

  const railS = railStepFor(step);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-28" dir={dir}>
      <div className="h-1.5 bg-[#EFEBE4]">
        <div className="h-full bg-[#0F4C3A] transition-all duration-500" style={{ width: `${(step / 8) * 100}%` }} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="step-pill">{t(tk('wizard.eyebrow'))} · {step}/8</span>
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

        {preselectedFromUrl && step === 1 && (
          <div className="mb-8 rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/10 p-4 text-sm text-[#0F4C3A] font-semibold leading-relaxed">
            {t(tk('wizard.preselect.banner'))}
          </div>
        )}

        {step === 7 ? (
          <div className="space-y-8" key={step}>
            {resolution && resolution.conflictDetected && selected.length > 1 && (
              <div className="rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/10 p-4 text-sm text-[#0F4C3A] font-semibold leading-relaxed">
                {t(tk('wizard.conflict.banner')).replace('{condition}', focusConditionName)}
              </div>
            )}

            <PlanResultsStep
              t={t}
              firstName={firstName}
              scoreRows={scoreRows}
              overall={overall}
              projected={projected}
              dailyKcal={dailyKcal}
              macros={macros}
              sampleMeals={sampleMeals}
              mealBreakdown={mealBreakdown}
              exerciseItems={exerciseItems}
              onStart={goToSubscription}
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

            <EmbeddedFAQ />
          </div>
        ) : step === 8 ? (
          <div className="space-y-8" key={step}>
            <SubscriptionStep
              t={t}
              hasFull={hasFeature('hubAllDays')}
              onTrial={startTrial}
              onPreview={handleDownloadPdf}
              onFree={continueFree}
            />
            <WhyChooseUs />
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

              {railS && (
                <>
                  <div className="rounded-[24px] bg-[#0F4C3A] text-[#FDFBF7] p-5 shadow-[0_18px_44px_-18px_rgba(15,76,58,0.5)]">
                    <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
                      ✨ {t(tk('wizard.rail.hdr'))}
                    </span>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#FDFBF7]/90">
                      {t(tk(`wizard.rail.step${railS}.fact`))}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#D4AF37]/50 bg-[#D4AF37]/10 p-5">
                    <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#6b4f0c]">
                      💡 {t(tk('wizard.rail.tipHdr'))}
                    </span>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#4A5A55]">
                      {t(tk(`wizard.rail.step${railS}.tip`))}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white border border-[#EFEBE4] rounded-[28px] p-6 md:p-10 shadow-[0_10px_40px_-20px_rgba(15,76,58,0.15)] min-h-[430px]" key={step}>
              {step === 1 && (
                <ConditionStep t={t} selected={selected} onToggle={toggleCondition} onContinue={() => save(2)} />
              )}
              {step === 2 && (
                <BasicInfoStep t={t} profile={profile} onChange={(patch) => setProfile((prev) => ({ ...prev, ...patch }))} onContinue={() => save(3)} />
              )}
              {step === 3 && (
                <LabsStep
                  t={t}
                  selected={selected}
                  hasLabs={hasLabs}
                  setHasLabs={setHasLabs}
                  labs={labs}
                  setLabs={setLabs}
                  onContinue={() => save(4)}
                />
              )}
              {step === 4 && (
                <LifestyleStep t={t} lifestyle={lifestyle} onChange={(patch) => setLifestyle((prev) => ({ ...prev, ...patch }))} onContinue={() => save(5)} />
              )}
              {step === 5 && (
                <GoalStep
                  t={t}
                  goal={goal}
                  profile={profile}
                  calorieTarget={calorieTarget}
                  timelineStep={1}
                  deficits={DEFICIT_BY_INTENSITY}
                  onChange={(patch) => setGoal((prev) => ({ ...prev, ...patch }))}
                  onContinue={() => save(6)}
                />
              )}
              {step === 6 && (
                <CuisineExercisesStep
                  t={t}
                  cuisine={cuisine}
                  onCuisine={setCuisine}
                  exerciseTypes={exerciseTypes}
                  onToggleExerciseType={(type) =>
                    setExerciseTypes((items) => (items.includes(type) ? items.filter((item) => item !== type) : [...items, type]))
                  }
                  onAutoSelect={handleAutoSelect}
                  onBuild={goToResults}
                />
              )}
            </div>
          </div>
        )}
      </section>

      {step === 7 && <StickyPlanBar subtitle={stickySubtitle} onSave={goToSubscription} onDownload={handleDownloadPdf} />}
      {toast && (
        <div className="fixed bottom-24 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">
            {toast}
          </div>
        </div>
      )}

      <PaywallModal
        open={!!paywallFeature}
        feature={paywallFeature}
        onClose={() => setPaywallFeature(null)}
        onUpgrade={(tier) => {
          upgrade(tier);
          setPaywallFeature(null);
        }}
      />
    </div>
  );
};

export default AdvancedCareWizardPage;