import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  Droplets,
  Dumbbell,
  FileDown,
  Lock,
  Minus,
  Pencil,
  Play,
  Plus,
  Scale,
  Share2,
  SmilePlus,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSubscription } from '../context/SubscriptionContext';
import { translations } from '../i18n/translations';
import PaywallModal from '../components/health-universe/PaywallModal';
import {
  calculateOverallScore,
  getOrganDetail,
  organScore,
  organStatus,
  readStoredLabs,
} from '../utils/healthScoring';
import type { HealthOrganId } from '../utils/healthScoring';
import type { FeatureId, Tier } from '../context/SubscriptionContext';
import {
  CONDITION_DATA,
  exercisePoolFor,
  foodPoolFor,
  isConditionId,
} from '../data/conditions';
import type { ConditionId } from '../data/conditions';
import { EXERCISES_DATABASE } from '../data/exercises/index';
import type { Exercise } from '../data/exercises/types';
import { FOODS_DATABASE } from '../utils/calculations';
import type { FoodItem } from '../utils/calculations';

type TKey = keyof typeof translations.en;
const tk = (key: string) => key as TKey;

const tt = (t: (key: TKey) => string, key: string, params?: Record<string, string>): string => {
  let text = t(tk(key));
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.split(`{${k}}`).join(v);
    });
  }
  return text;
};

interface SavedPlan {
  version?: number;
  savedAt?: number;
  conditions?: string[];
  profile?: { age: number; height: number; weight: number; gender: string };
  foodNames?: string[];
  exerciseIds?: string[];
  calories?: number;
  calorieFloor?: number;
  meals?: number;
  snacks?: number;
  focusCondition?: string | null;
}

type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

const SLOTS: Array<{ key: MealSlot; i18n: TKey; index: number }> = [
  { key: 'breakfast', i18n: tk('wizard.step6.mealBreakfast'), index: 0 },
  { key: 'lunch', i18n: tk('wizard.step6.mealLunch'), index: 1 },
  { key: 'dinner', i18n: tk('wizard.step6.mealDinner'), index: 2 },
  { key: 'snack', i18n: tk('wizard.step6.mealSnack'), index: 3 },
];

const ORGANS: Array<{ id: HealthOrganId; nameKey: TKey; icon: string; conditions: string[] }> = [
  { id: 'brain', nameKey: tk('universe.organ.brain.name'), icon: '🧠', conditions: [] },
  { id: 'heart', nameKey: tk('universe.organ.heart.name'), icon: '❤️', conditions: ['hypertension', 'cholesterol'] },
  { id: 'pancreas', nameKey: tk('universe.organ.pancreas.name'), icon: '🍬', conditions: ['diabetes'] },
  { id: 'liver', nameKey: tk('universe.organ.liver.name'), icon: '🫁', conditions: ['liver'] },
  { id: 'kidneys', nameKey: tk('universe.organ.kidneys.name'), icon: '🫘', conditions: ['kidney'] },
  { id: 'thyroid', nameKey: tk('universe.organ.thyroid.name'), icon: '🦋', conditions: ['thyroid'] },
  { id: 'gut', nameKey: tk('universe.organ.gut.name'), icon: '🌿', conditions: ['ibs'] },
  { id: 'joints', nameKey: tk('universe.organ.joints.name'), icon: '🦴', conditions: ['gout'] },
];

const EX_EMOJI: Record<string, string> = {
  strength: '🏋️',
  cardio: '🏃',
  hiit: '🔥',
  flexibility: '🧘',
  balance: '⚖️',
  functional: '🤸',
  mindbody: '🧠',
};

const EXERCISE_TYPE_ORDER: Record<string, number> = {
  strength: 0,
  cardio: 1,
  hiit: 2,
  flexibility: 3,
  balance: 4,
  functional: 5,
  mindbody: 6,
};

const MOODS = ['😀', '🙂', '😐', '😟', '😢'];

interface LabRef {
  lo: number;
  hi: number;
  unit: string;
  invert?: boolean;
}

const LAB_REF: Record<string, LabRef> = {
  fasting: { lo: 70, hi: 99, unit: 'mg/dL' },
  hba1c: { lo: 4.0, hi: 5.6, unit: '%' },
  systolic: { lo: 90, hi: 119, unit: 'mmHg' },
  diastolic: { lo: 60, hi: 79, unit: 'mmHg' },
  total: { lo: 125, hi: 199, unit: 'mg/dL' },
  ldl: { lo: 40, hi: 99, unit: 'mg/dL' },
  hdl: { lo: 40, hi: 60, invert: true, unit: 'mg/dL' },
  triglycerides: { lo: 50, hi: 149, unit: 'mg/dL' },
  uricAcid: { lo: 3.5, hi: 7.0, unit: 'mg/dL' },
  alt: { lo: 7, hi: 56, unit: 'U/L' },
  ast: { lo: 10, hi: 40, unit: 'U/L' },
  bilirubin: { lo: 0.1, hi: 1.2, unit: 'mg/dL' },
  creatinine: { lo: 0.6, hi: 1.3, unit: 'mg/dL' },
  egfr: { lo: 60, hi: 90, invert: true, unit: 'mL/min' },
  potassium: { lo: 3.5, hi: 5.0, unit: 'mmol/L' },
  tsh: { lo: 0.4, hi: 4.0, unit: 'mIU/L' },
  t3: { lo: 80, hi: 200, unit: 'ng/dL' },
  t4: { lo: 4.5, hi: 12.5, unit: 'µg/dL' },
};

const statusFor = (v: number, ref: LabRef): 'high' | 'low' | 'normal' => {
  if (v < ref.lo) return ref.invert ? 'high' : 'low';
  if (v > ref.hi) return ref.invert ? 'low' : 'high';
  return 'normal';
};

interface ProgressDay {
  water?: number;
  weight?: number;
  mood?: number;
}

type ProgressMap = Record<string, ProgressDay>;

const MyHealthHubPage: React.FC = () => {
  const { t, dir, language: lang } = useLanguage();
  const { hasFeature, upgrade } = useSubscription();
  const navigate = useNavigate();

  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [name, setName] = useState('there');
  const [paywall, setPaywall] = useState<FeatureId | null>(null);
  const [toast, setToast] = useState('');
  const [openScore, setOpenScore] = useState<string | null>(null);
  const [openLab, setOpenLab] = useState<string | null>(null);
  const [day, setDay] = useState(1);
  const [weightInput, setWeightInput] = useState('');
  const [exDone, setExDone] = useState<Record<number, string[]>>(() => {
    try {
      const raw = localStorage.getItem('hc_hub_ex_done');
      return raw ? (JSON.parse(raw) as Record<number, string[]>) : {};
    } catch {
      return {};
    }
  });
  const [mealDone, setMealDone] = useState<Record<number, string[]>>(() => {
    try {
      const raw = localStorage.getItem('hc_hub_meal_done');
      return raw ? (JSON.parse(raw) as Record<number, string[]>) : {};
    } catch {
      return {};
    }
  });
  const [progress, setProgress] = useState<ProgressMap>(() => {
    try {
      const raw = localStorage.getItem('hc_hub_progress');
      return raw ? (JSON.parse(raw) as ProgressMap) : {};
    } catch {
      return {};
    }
  });
  const today = new Date().toISOString().slice(0, 10);

  const paid = hasFeature('fullHub');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hc_advanced_care_plan');
      setPlan(raw ? (JSON.parse(raw) as SavedPlan) : null);
    } catch {
      setPlan(null);
    }
    try {
      const raw = localStorage.getItem('hc_advanced_care_account');
      if (raw) {
        const account = JSON.parse(raw) as { name?: string };
        if (account?.name) setName(account.name);
      }
    } catch {
      setName('there');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hc_hub_ex_done', JSON.stringify(exDone));
  }, [exDone]);

  useEffect(() => {
    localStorage.setItem('hc_hub_meal_done', JSON.stringify(mealDone));
  }, [mealDone]);

  useEffect(() => {
    localStorage.setItem('hc_hub_progress', JSON.stringify(progress));
  }, [progress]);

  const planConditions = plan?.conditions ?? [];
  const pool = useMemo(() => {
    const ids = planConditions.filter((c): c is ConditionId => isConditionId(c));
    const ex = exercisePoolFor(ids)
      .filter((s) => s.score !== 'avoid')
      .map((s) => s.exercise);
    const foods = foodPoolFor(ids)
      .filter((s) => s.score !== 'avoid')
      .map((s) => s.food);
    return { ex, foods };
  }, [planConditions]);

  const covered = useMemo(
    () => ORGANS.filter((o) => o.conditions.length === 0 || o.conditions.some((c) => planConditions.includes(c))),
    [planConditions],
  );

  const overallScore = useMemo(() => {
    const scores = covered
      .map((o) => organScore(o.id))
      .filter((v): v is number => typeof v === 'number');
    return calculateOverallScore(scores);
  }, [covered]);

  const note = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const gate = (feature: FeatureId) => {
    if (!hasFeature(feature)) setPaywall(feature);
  };

  const handleUpgrade = (tier: Tier) => {
    upgrade(tier);
    setPaywall(null);
    setToast(t('paywall.cta.startTrial'));
    window.setTimeout(() => setToast(''), 2600);
  };

  const exName = (ex: Exercise): string => {
    if (lang === 'ar') return ex.nameAr || ex.nameEn;
    if (lang === 'fr') return ex.nameFr || ex.nameEn;
    if (lang === 'es') return ex.nameEs || ex.nameEn;
    return ex.nameEn;
  };

  const foodName = (food: FoodItem): string =>
    lang === 'ar' && food.name_ar ? food.name_ar : food.name_en;

  const exercisePool = pool.ex.length > 0 ? pool.ex : EXERCISES_DATABASE;

  const dayExercises = (d: number): Exercise[] => {
    const out: Exercise[] = [];
    const seen = new Set<string>();
    let idx = 0;
    while (out.length < 5 && idx < 40) {
      const ex = exercisePool[(idx * 3 + (d - 1) * 2) % exercisePool.length];
      if (!seen.has(ex.id)) {
        seen.add(ex.id);
        out.push(ex);
      }
      idx += 1;
    }
    return out;
  };

  const foodPool = pool.foods.length > 0 ? pool.foods : FOODS_DATABASE.filter((f) => f.healthy === true);

  const dayMeals = (d: number): Array<{ slot: MealSlot; foods: FoodItem[] }> =>
    SLOTS.map(({ key, index }) => {
      const slotFoods = foodPool.filter((f) => (f.mealType ?? undefined) === key);
      const source = slotFoods.length > 0 ? slotFoods : foodPool;
      const picks: FoodItem[] = [];
      const count = key === 'snack' ? 2 : 1;
      for (let i = 0; i < count; i += 1) {
        const food = source[(i * 5 + (d - 1) * 3 + index) % source.length];
        if (!picks.some((p) => p.name_en === food.name_en)) picks.push(food);
      }
      return { slot: key, foods: picks };
    });

  const currentExercises = dayExercises(day);
  const currentMeals = dayMeals(day);
  const dayCalories = currentMeals.reduce((sum, row) => sum + row.foods.reduce((a, f) => a + (f.calories || 0), 0), 0);

  const exChecked = exDone[day] ?? [];
  const mealChecked = mealDone[day] ?? [];

  const toggleEx = (id: string) => {
    if (!paid) {
      gate('fullHub');
      return;
    }
    setExDone((prev) => {
      const list = new Set(prev[day] ?? []);
      if (list.has(id)) list.delete(id);
      else list.add(id);
      return { ...prev, [day]: [...list] };
    });
  };

  const markAllEx = () => {
    if (!paid) {
      gate('fullHub');
      return;
    }
    setExDone((prev) => ({ ...prev, [day]: currentExercises.map((ex) => ex.id) }));
  };

  const toggleMeal = (foodNameEn: string) => {
    if (!paid) {
      gate('fullHub');
      return;
    }
    setMealDone((prev) => {
      const list = new Set(prev[day] ?? []);
      if (list.has(foodNameEn)) list.delete(foodNameEn);
      else list.add(foodNameEn);
      return { ...prev, [day]: [...list] };
    });
  };

  const logAllMeals = () => {
    if (!paid) {
      gate('fullHub');
      return;
    }
    const all = currentMeals.flatMap((row) => row.foods.map((f) => f.name_en));
    setMealDone((prev) => ({ ...prev, [day]: [...new Set(all)] }));
  };

  const selectDay = (d: number) => {
    if (!paid && d > 1) {
      gate('fullHub');
      return;
    }
    setDay(d);
  };

  const labRows = Object.entries(readStoredLabs()).flatMap(([cond, markers]) =>
    Object.entries(markers)
      .filter(([key]) => LAB_REF[key])
      .map(([key, value]) => ({ key, value, cond })),
  );

  const visibleLabs = paid ? labRows : labRows.slice(0, 3);
  const lockedLabCount = Math.max(0, labRows.length - 3);

  const barColor = (score: number): string => {
    if (score < 50) return '#B91C1C';
    if (score <= 75) return '#D4AF37';
    return '#0F4C3A';
  };

  const statusLabel = (score: number) => {
    const status = organStatus(score);
    return status === 'healthy'
      ? t('universe.score.healthy')
      : status === 'warning'
        ? t('universe.score.warning')
        : t('universe.score.critical');
  };

  const progressDay = progress[today] ?? {};

  const setDayProgress = (patch: Partial<ProgressDay>) => {
    setProgress((prev) => ({ ...prev, [today]: { ...(prev[today] ?? {}), ...patch } }));
  };

  const week = (() => {
    const list: string[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      list.push(d.toISOString().slice(0, 10));
    }
    return list;
  })();

  const chart = (() => {
    const values = week.map((d) => {
      const p = progress[d];
      if (!p) return null;
      return typeof p.weight === 'number' ? p.weight : typeof p.water === 'number' ? p.water : null;
    });
    let prev: number | null = null;
    const numeric = values.filter((v): v is number => typeof v === 'number');
    if (numeric.length < 2) return null;
    const min = Math.min(...numeric);
    const max = Math.max(...numeric);
    const span = max - min || 1;
    const W = 300;
    const H = 96;
    const PAD = 10;
    const pts = values.map((v, i) => {
      const val = v ?? prev;
      prev = v ?? prev;
      const x = (i / (week.length - 1)) * W;
      const y = H - PAD - (((val ?? min) - min) / span) * (H - PAD * 2);
      return { x, y, has: v !== null };
    });
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    return { pts, line };
  })();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Health Hub', url });
        return;
      } catch {
        /* fall back to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
    note(t('hub.share.copied'));
  };

  const buildPdfHtml = (): string => {
    const scoreRows = covered
      .map((o) => {
        const score = organScore(o.id);
        return `<tr><td>${t(o.nameKey)}</td><td>${score === null ? '—' : `${score}`}</td></tr>`;
      })
      .join('');
    const overall = overallScore === null ? '—' : `${overallScore}`;
    const labRowsHtml = labRows
      .map((row) => {
        const ref = LAB_REF[row.key];
        return `<tr><td>${t(tk(`advanced.lab.field.${row.key}.label`))}</td><td>${row.value} ${ref.unit}</td></tr>`;
      })
      .join('');
    const exercisesHtml = dayExercises(1)
      .map((ex) => `<tr><td>${exName(ex)}</td><td>${ex.duration}</td><td>${ex.calories} kcal</td></tr>`)
      .join('');
    const mealsHtml = dayMeals(1)
      .flatMap((row) => row.foods.map((f) => ({ food: f, slot: t(row.slot === 'breakfast' ? tk('wizard.step6.mealBreakfast') : row.slot === 'lunch' ? tk('wizard.step6.mealLunch') : row.slot === 'dinner' ? tk('wizard.step6.mealDinner') : tk('wizard.step6.mealSnack')) })))
      .map((row) => `<tr><td>${foodName(row.food)}</td><td>${row.slot}</td><td>${row.food.calories} kcal</td></tr>`)
      .join('');
    const dirAttr = dir === 'rtl' ? ' dir="rtl" lang="ar"' : '';
    const condChips = planConditions.map((c) => t(tk(`advanced.condition.${c}.title`))).join(', ');
    return `<!doctype html>
<html${dirAttr}>
<head>
<meta charset="utf-8" />
<title>${t('hub.pdf.pageTitle')}</title>
<style>
  @page { margin: 24px; }
  body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color: #0F4C3A; margin: 0; padding: 32px; background: #FDFBF7; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  h3 { font-size: 15px; margin: 0 0 8px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; }
  p { color: #6B7A75; font-size: 13px; margin: 0 0 16px; }
  .card { background: #fff; border: 1px solid #EFEBE4; border-radius: 16px; padding: 20px; margin-top: 16px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { text-align: start; color: #0F4C3A; border-bottom: 2px solid #D4AF37; padding: 8px; }
  td { padding: 8px; border-bottom: 1px solid #EFEBE4; text-align: start; }
</style>
</head>
<body>
  <h1>${t('hub.pdf.pageTitle')} — ${name}</h1>
  <p>${condChips || '—'}</p>
  <div class="card">
    <h3>${t('hub.scores.title')}</h3>
    <table><thead><tr><th></th><th>${t('hub.scores.overall')}</th></tr></thead><tbody>${scoreRows}<tr><td><b>${t('hub.scores.overall')}</b></td><td><b>${overall}</b></td></tr></tbody></table>
  </div>
  <div class="card">
    <h3>${t('hub.labs.title')}</h3>
    <table><thead><tr><th></th><th></th></tr></thead><tbody>${labRowsHtml}</tbody></table>
  </div>
  <div class="card">
    <h3>${t('hub.exercise.title')}</h3>
    <table><thead><tr><th></th><th></th></tr></thead><tbody>${exercisesHtml}</tbody></table>
  </div>
  <div class="card">
    <h3>${t('hub.nutrition.title')}</h3>
    <table><thead><tr><th></th><th></th></tr></thead><tbody>${mealsHtml}</tbody></table>
  </div>
</body>
</html>`;
  };

  const handleDownloadPdf = () => {
    const win = window.open('', '_blank', 'width=960,height=760');
    if (!win) return;
    win.document.open();
    win.document.write(buildPdfHtml());
    win.document.close();
    win.focus();
    win.print();
    note(t('wizard.step6.toastPdf'));
  };

  const adjustPlan = () => {
    const qs = planConditions.length > 0 ? `?conditions=${planConditions.join(',')}&step=5` : '?step=5';
    navigate(`/advanced-care/wizard${qs}`);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 py-20" dir={dir}>
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#0F4C3A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🫀</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F4C3A] mb-3">{t('hub.empty.title')}</h1>
          <p className="text-sm text-[#6B7A75] mb-8 leading-relaxed">{t('hub.empty.desc')}</p>
          <Link
            to="/advanced-care/wizard"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-8 py-3.5 hover:bg-[#c9a52e] transition"
          >
            {t('hub.empty.cta')}
            <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  const profile = plan?.profile;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-16" dir={dir}>
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4C3A] bg-[#D4AF37]/15 rounded-full px-3 py-1.5">
          <Sparkles size={13} />
          {paid ? t('hub.badge.premium') : t('hub.badge.free')}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F4C3A] mt-3">{t('nav.myHealthHub')}</h1>
        <p className="text-[#6B7A75] mt-2">{t('hub.subtitle')}</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 space-y-8">
        <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] flex items-center justify-center text-3xl font-extrabold text-[#D4AF37]">
                {name ? name.charAt(0).toUpperCase() : '👤'}
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#0F4C3A]">{name}</h2>
                <p className="text-sm text-[#6B7A75] mt-1">
                  {profile ? (
                    <>
                      {profile?.age ? `${profile.age} ${t('years')} · ` : ''}
                      {profile?.gender === 'female' || profile?.gender === 'male'
                        ? `${t(profile.gender === 'female' ? 'female' : 'male')} · `
                        : ''}
                      {profile?.height ? `${profile.height} ${t('cm')} · ` : ''}
                      {profile?.weight ? `${profile.weight} ${t('kg')}` : '—'}
                    </>
                  ) : (
                    t('dash.plan.noPlan')
                  )}
                </p>
                {planConditions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {planConditions.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0F4C3A]/5 border border-[#0F4C3A]/10 px-2.5 py-1 text-[11px] font-bold text-[#0F4C3A]"
                      >
                        <span>{CONDITION_DATA[c]?.icon ?? '🩺'}</span>
                        {t(tk(`advanced.condition.${c}.title`))}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:ms-auto">
              <button
                type="button"
                onClick={adjustPlan}
                className="inline-flex items-center gap-2 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] hover:bg-[#F4F1EB] transition"
              >
                <Pencil size={14} />
                {t('hub.profile.edit')}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] hover:bg-[#F4F1EB] transition"
              >
                <Share2 size={14} />
                {t('hub.profile.share')}
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] hover:bg-[#F4F1EB] transition"
              >
                <Download size={14} />
                {t('hub.profile.pdf')}
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
              <Activity size={19} />
              {t('hub.scores.title')}
            </h2>
            <Link
              to="/advanced-care"
              className="text-xs font-bold text-[#0F4C3A] underline decoration-[#D4AF37] underline-offset-4"
            >
              {t('universe.score.calcLink')}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-6 text-[#FDFBF7]">
              <div className="flex items-center justify-between text-sm text-[#FDFBF7]/80">
                <span className="font-bold">{t('hub.scores.overall')}</span>
                <Sparkles size={16} className="text-[#D4AF37]" />
              </div>
              <div className="mt-3 text-5xl font-extrabold text-[#D4AF37] tabular-nums">
                {overallScore === null ? '—' : overallScore}
              </div>
              {overallScore === null ? (
                <p className="mt-2 text-xs text-[#FDFBF7]/70">{t('universe.score.enterLabs')}</p>
              ) : (
                <>
                  <p className="mt-1 text-xs font-bold text-[#FDFBF7]/90">{statusLabel(overallScore)}</p>
                  <div className="mt-4 h-2.5 rounded-full bg-[#FDFBF7]/15 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"
                      style={{ width: `${overallScore}%` }}
                    />
                  </div>
                </>
              )}
            </div>
            {covered.map((organ) => {
              const score = organScore(organ.id);
              const color = score === null ? '#D4AF37' : barColor(score);
              const detail = score === null ? null : getOrganDetail(organ.id);
              const expanded = openScore === organ.id;
              return (
                <div key={organ.id} className="rounded-3xl bg-white border border-[#EFEBE4] p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0F4C3A]">{t(organ.nameKey)}</span>
                    <span className="text-xl">{organ.icon}</span>
                  </div>
                  <div className="mt-3 text-4xl font-extrabold text-[#0F4C3A] tabular-nums">
                    {score === null ? '—' : score}
                  </div>
                  {score === null ? (
                    <p className="mt-1.5 text-xs text-[#6B7A75]">{t('universe.score.enterLabs')}</p>
                  ) : (
                    <>
                      <p className="mt-1 text-xs font-bold" style={{ color: score < 50 ? '#B91C1C' : score <= 75 ? '#B91C1C' : '#0F4C3A' }}>
                        {statusLabel(score)}
                      </p>
                      <div className="mt-4 h-2.5 rounded-full bg-[#F4F1EB] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${score}%`, background: color }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenScore(expanded ? null : organ.id)}
                        className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0F4C3A] underline decoration-[#D4AF37] underline-offset-4"
                      >
                        {t('universe.score.calcLink')}
                        <ChevronDown size={13} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded && detail && (
                        <div className="mt-3 space-y-1.5 rounded-xl bg-[#F4F1EB]/50 p-3">
                          {detail.factors.map((f, fi) => (
                            <div key={fi} className="flex items-center justify-between text-xs">
                              <span className="text-[#6B7A75]">{t(f.labelKey)}</span>
                              <b className="text-[#0F4C3A]">
                                {f.value}
                                {f.unit ? ` ${f.unit}` : f.unitKey ? ` ${t(f.unitKey)}` : ''}
                              </b>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
              {t('hub.labs.title')}
            </h2>
            {!paid && lockedLabCount > 0 && (
              <button
                type="button"
                onClick={() => gate('fullHub')}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 text-[#0F4C3A] px-3 py-1.5 text-xs font-bold hover:bg-[#D4AF37]/25 transition"
              >
                <Lock size={13} />
                {t('hub.labs.seeFull')}
              </button>
            )}
          </div>
          {labRows.length === 0 ? (
            <Link to="/advanced-care" className="block rounded-2xl border border-dashed border-[#D4AF37]/50 bg-[#FDFBF7] p-5 text-sm font-semibold text-[#0F4C3A] text-center hover:bg-[#F4F1EB] transition">
              {t('universe.score.enterLabs')}
            </Link>
          ) : (
            <div className="space-y-2">
              {visibleLabs.map((row) => {
                const ref = LAB_REF[row.key];
                const status = statusFor(row.value, ref);
                const isOpen = openLab === `${row.cond}:${row.key}`;
                const statusText = status === 'normal' ? t('hub.labs.normal') : status === 'high' ? t('hub.labs.high') : t('hub.labs.low');
                const statusColor =
                  status === 'normal'
                    ? 'bg-[#0F4C3A]/10 text-[#0F4C3A]'
                    : status === 'high'
                      ? (ref.invert ? 'bg-[#D4AF37]/15 text-[#0F4C3A]' : 'bg-[#B91C1C]/10 text-[#B91C1C]')
                      : (ref.invert ? 'bg-[#B91C1C]/10 text-[#B91C1C]' : 'bg-[#D4AF37]/15 text-[#0F4C3A]');
                return (
                  <button
                    key={`${row.cond}:${row.key}`}
                    type="button"
                    onClick={() => setOpenLab(isOpen ? null : `${row.cond}:${row.key}`)}
                    className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#EFEBE4] bg-[#F4F1EB]/30 p-3 text-start transition hover:bg-[#F4F1EB]/60"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="truncate text-sm font-bold text-slate-900">
                        {t(tk(`advanced.lab.field.${row.key}.label`))}
                      </span>
                      <span className="shrink-0 text-xs text-[#6B7A75]">{row.value} {ref.unit}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${statusColor}`}>{statusText}</span>
                    </span>
                    <ChevronDown size={14} className={`shrink-0 text-[#6B7A75] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                );
              })}
              {!paid && lockedLabCount > 0 && (
                <div className="relative rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-3 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 rounded-full bg-[#FDFBF7] border border-[#D4AF37]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] shadow-sm">
                      <Lock size={13} />
                      +{lockedLabCount} {t('hub.labs.seeFull')}
                    </div>
                  </div>
                  <div className="space-y-2 blur-sm">
                    {labRows.slice(3, 6).map((row) => (
                      <div key={`${row.cond}:${row.key}`} className="rounded-lg bg-white p-3 text-xs font-semibold text-[#6B7A75]">
                        {t(tk(`advanced.lab.field.${row.key}.label`))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {paid && (
                <div className="pt-2">
                  {labRows.map((row) => {
                    const ref = LAB_REF[row.key];
                    if (openLab !== `${row.cond}:${row.key}`) return null;
                    return (
                      <div key={`${row.cond}:${row.key}-detail`} className="mt-1 rounded-xl bg-[#F4F1EB]/50 px-3 py-2 text-xs text-[#6B7A75]">
                        {t('hub.labs.range')}: {ref.lo}–{ref.hi} {ref.unit}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
                <Dumbbell size={19} />
                {t('hub.exercise.title')}
              </h2>
              {!paid && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 text-[#0F4C3A] px-2.5 py-1 text-[10px] font-extrabold">
                  <Lock size={11} />
                  {t('hub.badge.premium')}
                </span>
              )}
            </div>
            <div className="flex gap-1.5 mb-4 overflow-x-auto">
              {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => {
                const active = d === day;
                const locked = !paid && d > 1;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => selectDay(d)}
                    className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${active ? (paid ? 'bg-[#0F4C3A] text-[#FDFBF7]' : 'bg-[#D4AF37] text-[#0F4C3A]') : locked ? 'bg-[#F4F1EB]/50 text-[#6B7A75]' : 'bg-[#F4F1EB]/50 text-[#0F4C3A] hover:bg-[#F4F1EB]'}`}
                  >
                    {locked ? <Lock size={12} className="mx-auto" /> : tt(t, 'hub.exercise.day', { n: String(d) })}
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              {currentExercises.map((ex) => {
                const active = exChecked.includes(ex.id);
                const emoji = EX_EMOJI[ex.type] ?? '💪';
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => toggleEx(ex.id)}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl border p-3 transition ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-[#F4F1EB]/30'}`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className={`h-5 w-5 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ${active ? 'bg-[#0F4C3A] border-[#0F4C3A] text-[#FDFBF7]' : 'border-[#D4AF37] text-transparent'}`}>
                        ✓
                      </span>
                      <span className="text-base">{emoji}</span>
                      <span className={`min-w-0 ${active ? 'text-[#6B7A75] line-through' : ''}`}>
                        <b className="block truncate text-sm text-slate-900">{exName(ex)}</b>
                        <small className="text-[#6B7A75]">{ex.duration} · {ex.calories} kcal</small>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={markAllEx}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F4C3A] text-[#FDFBF7] px-5 py-2.5 text-xs font-bold hover:bg-[#1a6b53] transition"
              >
                <Check size={14} />
                {t('hub.exercise.markAll')}
              </button>
              <button
                type="button"
                onClick={() => (paid ? adjustPlan() : gate('fullHub'))}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0F4C3A] text-[#0F4C3A] px-5 py-2.5 text-xs font-bold hover:bg-[#0F4C3A]/5 transition"
              >
                {!paid && <Lock size={13} />}
                {t('hub.exercise.adjust')}
              </button>
            </div>
            {!paid && (
              <p className="mt-3 text-xs text-[#6B7A75]">{tt(t, 'hub.exercise.lockedDay', { n: '2-7' })}</p>
            )}
          </section>

          <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
                <UtensilsCrossed size={19} />
                {t('hub.nutrition.title')}
              </h2>
              {!paid && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 text-[#0F4C3A] px-2.5 py-1 text-[10px] font-extrabold">
                  <Lock size={11} />
                  {t('hub.badge.premium')}
                </span>
              )}
            </div>
            <div className="flex gap-1.5 mb-4 overflow-x-auto">
              {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => {
                const active = d === day;
                const locked = !paid && d > 1;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => selectDay(d)}
                    className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${active ? (paid ? 'bg-[#0F4C3A] text-[#FDFBF7]' : 'bg-[#D4AF37] text-[#0F4C3A]') : locked ? 'bg-[#F4F1EB]/50 text-[#6B7A75]' : 'bg-[#F4F1EB]/50 text-[#0F4C3A] hover:bg-[#F4F1EB]'}`}
                  >
                    {locked ? <Lock size={12} className="mx-auto" /> : tt(t, 'hub.exercise.day', { n: String(d) })}
                  </button>
                );
              })}
            </div>
            <div className="space-y-3">
              {currentMeals.map(({ slot, foods }) => (
                <div key={slot}>
                  <h3 className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide mb-1.5">
                    {t(SLOTS.find((s) => s.key === slot)!.i18n)}
                  </h3>
                  <div className="space-y-2">
                    {foods.map((food) => {
                      const active = mealChecked.includes(food.name_en);
                      return (
                        <button
                          key={food.name_en}
                          type="button"
                          onClick={() => toggleMeal(food.name_en)}
                          className={`w-full flex items-center justify-between gap-3 rounded-xl border p-3 transition ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-[#F4F1EB]/30'}`}
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span className={`h-5 w-5 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ${active ? 'bg-[#0F4C3A] border-[#0F4C3A] text-[#FDFBF7]' : 'border-[#D4AF37] text-transparent'}`}>
                              ✓
                            </span>
                            <span className="text-base">🍽️</span>
                            <b className={`truncate text-sm ${active ? 'text-[#6B7A75] line-through' : 'text-slate-900'}`}>{foodName(food)}</b>
                          </span>
                          <span className="shrink-0 text-xs text-[#6B7A75]">{food.calories || 0} kcal</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="rounded-full bg-[#0F4C3A]/5 border border-[#0F4C3A]/10 px-4 py-2 text-xs font-bold text-[#0F4C3A]">
                {tt(t, 'hub.nutrition.dayCalories', { cal: String(dayCalories) })}
              </div>
              <button
                type="button"
                onClick={logAllMeals}
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-5 py-2.5 text-xs font-bold hover:bg-[#c9a52e] transition"
              >
                <Check size={14} />
                {t('hub.nutrition.markAll')}
              </button>
            </div>
          </section>
        </div>

        <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8 relative">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
              <TrendingUp size={19} />
              {t('hub.progress.title')}
            </h2>
            {!paid && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 text-[#0F4C3A] px-2.5 py-1 text-[10px] font-extrabold">
                <Lock size={11} />
                {t('hub.badge.premium')}
              </span>
            )}
          </div>
          {!paid ? (
            <div className="pointer-events-none relative overflow-hidden rounded-2xl border border-[#EFEBE4]">
              <div className="grid sm:grid-cols-3 gap-4 p-5 blur-sm">
                <div className="rounded-2xl bg-[#F4F1EB]/40 p-4">
                  <div className="text-xs font-bold text-[#6B7A75]">{t('hub.progress.water')}</div>
                  <div className="mt-3 h-2.5 rounded-full bg-[#EFEBE4] w-3/4" />
                  <div className="mt-2 h-2.5 rounded-full bg-[#EFEBE4] w-1/2" />
                </div>
                <div className="rounded-2xl bg-[#F4F1EB]/40 p-4">
                  <div className="text-xs font-bold text-[#6B7A75]">{t('dash.plan.weight')}</div>
                  <div className="mt-3 h-2.5 rounded-full bg-[#EFEBE4] w-2/3" />
                  <div className="mt-2 h-2.5 rounded-full bg-[#EFEBE4] w-1/3" />
                </div>
                <div className="rounded-2xl bg-[#F4F1EB]/40 p-4">
                  <div className="text-xs font-bold text-[#6B7A75]">{t('hub.progress.mood')}</div>
                  <div className="mt-3 text-2xl text-[#0F4C3A]/30">😀 🙄 😐 😟 😢</div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 rounded-3xl bg-[#FDFBF7] border-2 border-[#D4AF37] px-6 py-5 shadow-[0_12px_28px_rgba(212,175,55,0.25)]">
                  <Lock size={22} className="text-[#D4AF37]" />
                  <b className="text-sm text-[#0F4C3A] text-center">{t('hub.progress.locked')}</b>
                  <button
                    type="button"
                    onClick={() => gate('fullHub')}
                    className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-5 py-2.5 text-xs font-bold hover:bg-[#c9a52e] transition"
                  >
                    <Sparkles size={13} />
                    {t('hub.progress.unlockCta')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#F4F1EB]/40 p-5">
                <div className="text-xs font-bold text-[#6B7A75] flex items-center gap-1.5">
                  <Droplets size={14} />
                  {t('hub.progress.water')}
                </div>
                <div className="mt-3 flex items-center justify-between text-[#0F4C3A]">
                  <button
                    type="button"
                    onClick={() => setDayProgress({ water: Math.max(0, (progressDay.water ?? 0) - 1) })}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EFEBE4] hover:bg-[#F4F1EB] transition"
                    aria-label="−"
                  >
                    <Minus size={15} />
                  </button>
                  <b className="text-2xl tabular-nums">{progressDay.water ?? 0} <span className="text-xs text-[#6B7A75]">/ 8</span></b>
                  <button
                    type="button"
                    onClick={() => setDayProgress({ water: Math.min(16, (progressDay.water ?? 0) + 1) })}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EFEBE4] hover:bg-[#F4F1EB] transition"
                    aria-label="+"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-[#EFEBE4] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#0F4C3A] transition-all duration-500"
                    style={{ width: `${Math.min(100, ((progressDay.water ?? 0) / 8) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-[#F4F1EB]/40 p-5">
                <div className="text-xs font-bold text-[#6B7A75] flex items-center gap-1.5">
                  <Scale size={14} />
                  {t('dash.plan.weight')}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder={`${progressDay.weight ?? plan?.profile?.weight ?? '—'} kg`}
                    className="w-full min-w-0 rounded-xl border border-[#EFEBE4] bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const val = Number(weightInput);
                    if (Number.isFinite(val) && val > 0) {
                      setDayProgress({ weight: Math.round(val * 10) / 10 });
                      setWeightInput('');
                    }
                  }}
                  className="mt-3 w-full rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-xs font-bold px-4 py-2.5 hover:bg-[#1a6b53] transition"
                >
                  {t('hub.progress.logWeight')}
                </button>
              </div>
              <div className="rounded-2xl bg-[#F4F1EB]/40 p-5">
                <div className="text-xs font-bold text-[#6B7A75] flex items-center gap-1.5">
                  <SmilePlus size={14} />
                  {t('hub.progress.mood')}
                </div>
                <div className="mt-3 flex justify-between gap-1">
                  {MOODS.map((emoji, i) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setDayProgress({ mood: i })}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition ${progressDay.mood === i ? 'bg-[#D4AF37] ring-2 ring-[#D4AF37]' : 'bg-white border border-[#EFEBE4] hover:bg-[#F4F1EB]'}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-xs font-bold text-[#0F4C3A]">
                  {progressDay.mood !== undefined ? MOODS[progressDay.mood] : '—'}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (progressDay.mood !== undefined) {
                      setToast(t('hub.progress.logMood'));
                      window.setTimeout(() => setToast(''), 2000);
                    }
                  }}
                  className="mt-3 w-full rounded-full border-2 border-[#0F4C3A] text-[#0F4C3A] text-xs font-bold px-4 py-2.5 hover:bg-[#0F4C3A]/5 transition"
                >
                  {t('hub.progress.logMood')}
                </button>
              </div>
              <div className="md:col-span-3 rounded-2xl bg-[#F4F1EB]/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-bold text-[#6B7A75] flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {t('hub.progress.week')}
                  </div>
                </div>
                {chart ? (
                  <svg viewBox="0 0 300 96" className="mt-3 w-full" role="img" aria-label={t('hub.progress.week')}>
                    <path d={chart.line} fill="none" stroke="#0F4C3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {chart.pts.map((p, i) =>
                      p.has ? (
                        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#D4AF37" stroke="#FDFBF7" strokeWidth="1.5" />
                      ) : null,
                    )}
                  </svg>
                ) : (
                  <p className="mt-3 text-sm text-[#6B7A75]">—</p>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-6 md:p-8 text-[#FDFBF7]">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="md:me-auto">
              <h2 className="text-lg font-extrabold">{t('hub.subtitle')}</h2>
              <p className="text-sm text-[#FDFBF7]/70 mt-1">{t('universe.score.disclaimer')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => (paid ? adjustPlan() : gate('fullHub'))}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition ${paid ? 'bg-[#0F4C3A] text-[#FDFBF7] ring-2 ring-[#FDFBF7]/30 hover:ring-[#D4AF37]' : 'bg-white/10 text-[#FDFBF7]'}`}
              >
                {!paid && <Lock size={15} />}
                {t('hub.cta.adjust')}
              </button>
              <button
                type="button"
                onClick={() => (paid ? handleDownloadPdf() : gate('fullHub'))}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition ${paid ? 'bg-[#D4AF37] text-[#0F4C3A] hover:bg-[#c9a52e]' : 'bg-white/10 text-[#FDFBF7]'}`}
              >
                {!paid && <Lock size={15} />}
                <FileDown size={16} />
                {t('hub.cta.pdf')}
              </button>
              {!paid ? (
                <button
                  type="button"
                  onClick={() => gate('fullHub')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-6 py-3 text-sm font-extrabold hover:bg-[#c9a52e] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition"
                >
                  <Play size={16} fill="currentColor" />
                  {t('hub.cta.trial')}
                </button>
              ) : (
                <Link
                  to="/premium"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FDFBF7]/10 text-[#FDFBF7] px-6 py-3 text-sm font-extrabold hover:bg-[#FDFBF7]/20 transition"
                >
                  {t('hub.cta.manage')}
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <PaywallModal open={paywall !== null} feature={paywall} onClose={() => setPaywall(null)} onUpgrade={handleUpgrade} />

      {toast && (
        <div className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">{toast}</div>
        </div>
      )}
    </div>
  );
};

export default MyHealthHubPage;