import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { FOODS_DATABASE } from '../utils/calculations';
import { EXERCISES_DATABASE } from '../data/exercises/index';

const tk = (key: string) => key as keyof typeof translations.en;

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

const SLOTS: Array<{ key: MealSlot; i18n: keyof typeof translations.en }> = [
  { key: 'breakfast', i18n: 'wizard.step6.mealBreakfast' },
  { key: 'lunch', i18n: 'wizard.step6.mealLunch' },
  { key: 'dinner', i18n: 'wizard.step6.mealDinner' },
  { key: 'snack', i18n: 'wizard.step6.mealSnack' },
];

const slotLabel = (slot: MealSlot): string => {
  if (slot === 'breakfast') return 'wizard.step6.mealBreakfast';
  if (slot === 'lunch') return 'wizard.step6.mealLunch';
  if (slot === 'dinner') return 'wizard.step6.mealDinner';
  return 'wizard.step6.mealSnack';
};

const PlanDashboardPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [name, setName] = useState('there');
  const [checked, setChecked] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('hc_dash_meal_checked');
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [weight, setWeight] = useState<number | null>(null);
  const [cups, setCups] = useState<number>(() => {
    const raw = localStorage.getItem('hc_dash_water');
    return typeof raw === 'string' ? Number(raw) || 0 : 0;
  });
  const [toast, setToast] = useState('');

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

  const foodById = useMemo(() => new Map(FOODS_DATABASE.map((food) => [food.name_en, food])), []);
  const exerciseById = useMemo(() => new Map(EXERCISES_DATABASE.map((ex) => [ex.id, ex])), []);

  useEffect(() => {
    localStorage.setItem('hc_dash_meal_checked', JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem('hc_dash_water', String(cups));
  }, [cups]);

  const toggleFood = (name: string) =>
    setChecked((items) => (items.includes(name) ? items.filter((item) => item !== name) : [...items, name]));

  const mealRows = (plan?.foodNames ?? []).map((name) => {
    const food = foodById.get(name);
    const slot = food?.mealType && SLOTS.some((s) => s.key === food.mealType)
      ? (food.mealType as MealSlot)
      : 'snack';
    return { name, food, slot };
  });

  const mealsDone = mealRows.filter((row) => checked.includes(row.name)).length;
  const progress = mealRows.length === 0 ? 0 : Math.min(100, Math.round((mealsDone / mealRows.length) * 100));
  const weightValue = weight ?? plan?.profile?.weight;

  const exerciseRows = (plan?.exerciseIds ?? [])
    .map((id) => exerciseById.get(id))
    .filter(Boolean);

  const buildPdfHtml = (): string => {
    const conditionRow = [
      `<tr><th>${t('wizard.step6.planHeader')}</th><th>${t('wizard.step6.exercisesHeader')}</th><th>${t('wizard.step6.summary.calories')}</th></tr>`,
      `<tr><td>${plan?.conditions?.length ?? 0}</td><td>${exerciseRows.length}</td><td>${plan?.calories ?? 0} kcal</td></tr>`,
    ].join('');
    const mealTable = mealRows
      .map((row) => `<tr><td>${row.name}</td><td>${t(tk(slotLabel(row.slot)))}</td><td>${row.food ? `${row.food.calories} kcal` : '—'}</td></tr>`)
      .join('');
    const exTable = exerciseRows
      .map((ex) => `<tr><td>${ex!.nameEn}</td><td>${ex!.duration}</td><td>${ex!.calories} kcal</td></tr>`)
      .join('');
    const dirAttr = dir === 'rtl' ? ' dir="rtl" lang="ar"' : '';
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
</style>
</head>
<body>
  <h1>HealthCalc — ${t('dash.plan.title').replace('{name}', name)}</h1>
  <p class="muted">${t('dash.plan.subtitle')}</p>
  <div class="card">
    <div class="h">${t('dash.plan.progress')}</div>
    <table><tbody>${conditionRow}</tbody></table>
  </div>
  <div class="card">
    <div class="h">${t('dash.plan.todayMeals')}</div>
    <table><thead><tr><th>Food</th><th>Meal</th><th>Calories</th></tr></thead><tbody>${mealTable}</tbody></table>
  </div>
  <div class="card">
    <div class="h">${t('dash.plan.todayWorkout')}</div>
    <table><thead><tr><th>Exercise</th><th>Duration</th><th>Calories</th></tr></thead><tbody>${exTable}</tbody></table>
  </div>
  <div class="total"><span>${mealsDone} / ${mealRows.length}</span><span>${progress}%</span></div>
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
    setToast(t('wizard.step6.toastPdf'));
    window.setTimeout(() => setToast(''), 2800);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 py-20" dir={dir}>
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#0F4C3A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📋</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F4C3A] mb-3">{t('dash.plan.empty')}</h1>
          <p className="text-sm text-[#6B7A75] mb-8 leading-relaxed">{t('dash.plan.noPlan')}</p>
          <Link to="/advanced-care/wizard" className="inline-block bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-8 py-3.5 hover:bg-[#c9a52e] transition">
            {t('dash.plan.emptyCta')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-16" dir={dir}>
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        <span className="inline-block text-xs font-bold text-[#0F4C3A] bg-[#D4AF37]/15 rounded-full px-3 py-1.5">{t('dash.plan.title').replace('{name}', '')}</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F4C3A] mt-3">{t('dash.plan.title').replace('{name}', name)}</h1>
        <p className="text-[#6B7A75] mt-2">{t('dash.plan.subtitle')}</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 grid lg:grid-cols-3 gap-6 items-start">
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-[20px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-6 text-[#FDFBF7]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                <div className="text-2xl">🔥</div>
                <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{plan?.calories ?? 0}</div>
                <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t('wizard.step6.summary.calories').replace('{kcal}', String(plan?.calories ?? 0))}</div>
              </div>
              <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                <div className="text-2xl">🍽️</div>
                <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{plan?.meals ?? 0}</div>
                <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t('wizard.step6.summary.meals').replace('{count}', String(plan?.meals ?? 0))}</div>
              </div>
              <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                <div className="text-2xl">🍎</div>
                <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{plan?.snacks ?? 0}</div>
                <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t('wizard.step6.summary.snacks').replace('{count}', String(plan?.snacks ?? 0))}</div>
              </div>
              <div className="rounded-2xl bg-[#FDFBF7]/10 p-3 text-center">
                <div className="text-2xl">🏃</div>
                <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{exerciseRows.length}</div>
                <div className="text-xs text-[#FDFBF7]/80 mt-0.5">{t('wizard.step6.summary.exercises').replace('{count}', String(exerciseRows.length))}</div>
              </div>
            </div>
          </div>

          <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6">
            <h2 className="font-extrabold text-lg text-[#0F4C3A] mb-4">{t('dash.plan.todayMeals')}</h2>
            {mealRows.length === 0 && (
              <p className="text-sm text-[#6B7A75]">{t('dash.plan.empty')}</p>
            )}
            <div className="space-y-4">
              {SLOTS.map(({ key, i18n }) => {
                const rows = mealRows.filter((row) => row.slot === key);
                if (rows.length === 0) return null;
                return (
                  <div key={key}>
                    <h3 className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide mb-2">{t(tk(i18n))}</h3>
                    <div className="space-y-2">
                      {rows.map((row) => {
                        const active = checked.includes(row.name);
                        return (
                          <button
                            key={row.name}
                            type="button"
                            onClick={() => toggleFood(row.name)}
                            className={`w-full flex items-center justify-between gap-3 rounded-xl border p-3 transition ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-[#F4F1EB]/30'}`}
                          >
                            <span className="flex items-center gap-3">
                              <span className={`h-5 w-5 rounded-md border flex items-center justify-center text-xs font-bold ${active ? 'bg-[#0F4C3A] border-[#0F4C3A] text-[#FDFBF7]' : 'border-[#D4AF37] text-transparent'}`}>
                                ✓
                              </span>
                              <b className={`text-sm ${active ? 'text-[#6B7A75] line-through' : 'text-slate-900'}`}>{row.name}</b>
                            </span>
                            <span className="text-xs text-[#6B7A75]">{row.food ? `${row.food.calories} kcal` : '—'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6">
            <h2 className="font-extrabold text-lg text-[#0F4C3A] mb-4">{t('dash.plan.todayWorkout')}</h2>
            {exerciseRows.length === 0 && <p className="text-sm text-[#6B7A75]">{t('dash.plan.empty')}</p>}
            <div className="space-y-2">
              {exerciseRows.map((ex) => (
                <div key={ex!.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#EFEBE4] bg-[#F4F1EB]/30 p-3">
                  <div>
                    <b className="block text-sm text-slate-900">{ex!.nameEn}</b>
                    <small className="text-[#6B7A75]">{ex!.duration} · {ex!.calories} kcal</small>
                  </div>
                  <span className="text-xs font-bold bg-[#0F4C3A] text-[#FDFBF7] rounded-full px-3 py-1">{t('wizard.step6.recommend')}</span>
                </div>
              ))}
            </div>
          </section>
        </section>

        <aside className="rounded-3xl bg-white border border-[#EFEBE4] p-6 lg:sticky lg:top-6">
          <h2 className="font-extrabold text-lg text-[#0F4C3A] mb-4">{t('dash.plan.progress')}</h2>
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#6B7A75]">{t('dash.plan.mealsDone')}</span>
              <b className="text-[#0F4C3A]">{mealsDone} / {mealRows.length}</b>
            </div>
            <div className="h-2.5 rounded-full bg-[#F4F1EB] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#0F4C3A] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-center text-xs text-[#6B7A75] mt-1.5">{progress}%</p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#0F4C3A] mb-1.5">{t('dash.plan.weight')} (kg)</label>
            <input
              type="number"
              value={weightValue ?? ''}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="—"
              className="w-full rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
            />
          </div>

          <div className="mb-6">
            <span className="block text-sm font-semibold text-[#0F4C3A] mb-2">{t('dash.plan.water')} 💧 {cups}/8</span>
            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: 8 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCups(index + 1 === cups ? index : index + 1)}
                  className={`h-8 rounded-full text-xs transition ${index < cups ? 'bg-[#0F4C3A] text-[#FDFBF7]' : 'bg-[#F4F1EB] text-[#6B7A75]'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/advanced-care/wizard" className="block w-full text-center bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition">
              {t('dash.plan.adjust')}
            </Link>
            <button type="button" onClick={handleDownloadPdf} className="block w-full text-center bg-[#FDFBF7] border-2 border-[#0F4C3A] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#0F4C3A]/5 transition">
              {t('dash.plan.download')}
            </button>
          </div>
        </aside>
      </main>

      {toast && (
        <div className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">{toast}</div>
        </div>
      )}
    </div>
  );
};

export default PlanDashboardPage;