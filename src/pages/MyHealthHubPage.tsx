import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, FileDown, FlaskConical, Lock, Play, Share2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import { useUserData } from '../hooks/useUserData';
import { migrateLocalData } from '../services/migrateLocalData';
import { savePlanToStorage } from '../utils/planStorage';
import type { PlanStoragePayload } from '../utils/planStorage';
import type { FeatureId, Tier } from '../context/SubscriptionContext';
import PaywallModal from '../components/health-universe/PaywallModal';
import UserProfileCard from '../components/hub/UserProfileCard';
import DailyGoalsCard from '../components/hub/DailyGoalsCard';
import HealthScoreCard from '../components/hub/HealthScoreCard';
import MealLoggingTabs from '../components/hub/MealLoggingTabs';
import TodayExerciseCard from '../components/hub/TodayExerciseCard';
import WaterTracker from '../components/hub/WaterTracker';
import AiCoPilotCard from '../components/hub/AiCoPilotCard';
import WeightTrendChart from '../components/hub/WeightTrendChart';
import QuickActions from '../components/hub/QuickActions';
import LabSummary from '../components/hub/LabSummary';
import ExerciseDayWizard from '../components/hub/ExerciseDayWizard';
import NutritionDayWizard from '../components/hub/NutritionDayWizard';
import ProgressTracker from '../components/hub/ProgressTracker';
import SubscriptionFeatures from '../components/hub/SubscriptionFeatures';
import HealthChat from '../components/hub/HealthChat';
import ConfettiBurst from '../components/hub/ConfettiBurst';
import {
  coveredOrgans,
  dayExercises,
  dayMeals,
  exerciseName,
  exercisePoolForConditions,
  foodDisplayName,
  foodPoolForConditions,
  readHubConditions,
  readHubPlan,
  readHubProfile,
  tk,
} from '../components/hub/data';
import type { TKey } from '../components/hub/data';
import { readStoredLabs, organScore } from '../utils/healthScoring';
import { LAB_REF } from '../components/hub/LabSummary';

const SLOT_KEY: Record<string, TKey> = {
  breakfast: tk('wizard.step6.mealBreakfast'),
  lunch: tk('wizard.step6.mealLunch'),
  dinner: tk('wizard.step6.mealDinner'),
  snack: tk('wizard.step6.mealSnack'),
};

const migratedUsers = new Set<string>();

const MyHealthHubPage: React.FC = () => {
  const { t, dir, language: lang } = useLanguage();
  const { user } = useAuth();
  const { hasFeature, upgrade } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useUserData();
  const dbProfile = userData.profile;
  const dbConditions = userData.conditions;
  const dbPlan = userData.plan;
  const dbLoading = userData.loading;

  const planReady =
    (location.state as { planReady?: boolean } | null)?.planReady === true;

  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    if (!planReady) return;
    setConfetti(true);
    note(t('hub.planReady'));
    const timeout = window.setTimeout(() => setConfetti(false), 2500);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [name, setName] = useState(() => {
    try {
      const raw = localStorage.getItem('hc_advanced_care_account');
      if (raw) {
        const account = JSON.parse(raw) as { name?: string };
        if (account?.name) return account.name;
      }
    } catch {
      /* ignore */
    }
    return 'there';
  });

  useEffect(() => {
    const dbName = dbProfile?.full_name;
    if (dbName) {
      setName(dbName);
      return;
    }
    if (!user) return;
    const fallbackName = user.name || (user.email ? user.email.split('@')[0] : '') || '';
    if (fallbackName) setName(fallbackName);
  }, [user, dbProfile]);

  useEffect(() => {
    if (!user) return;
    void migrateLocalData(user.id).catch(() => undefined);
  }, [user]);

  const [paywall, setPaywall] = useState<FeatureId | null>(null);
  const [toast, setToast] = useState('');
  const [day, setDay] = useState(1);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!user || !dbPlan?.plan_data || typeof dbPlan.plan_data !== 'object') return;
    const pd = dbPlan.plan_data as unknown as PlanStoragePayload & { kind?: string; savedAt?: number };
    if (pd.kind === 'weight-loss') return;
    try {
      const raw = localStorage.getItem('hc_advanced_care_plan');
      if (raw) {
        const local = JSON.parse(raw) as { savedAt?: number } | null;
        if (local?.savedAt && dbPlan.created_at) {
          const dbMs = new Date(dbPlan.created_at).getTime();
          if (Number.isFinite(dbMs) && dbMs <= local.savedAt) return;
        }
      }
    } catch {
      /* ignore */
    }
    savePlanToStorage(pd);
    setSynced(true);
  }, [user, dbPlan]);

  const paid = hasFeature('hubAllDays');
  const dayLimit = paid ? 7 : hasFeature('hubDay3') ? 3 : hasFeature('hubDay2') ? 2 : 1;

  const plan = useMemo(() => readHubPlan(), [synced]);
  const conditions = useMemo(() => {
    const local = readHubConditions();
    return local.length > 0 ? local : dbConditions;
  }, [synced, dbConditions]);
  const dbProfileView = useMemo(
    () =>
      dbProfile
        ? {
            age: Number.isFinite(Number(dbProfile.age)) ? Number(dbProfile.age) : undefined,
            height: Number.isFinite(Number(dbProfile.height_cm)) ? Number(dbProfile.height_cm) : undefined,
            weight: Number.isFinite(Number(dbProfile.weight_kg)) ? Number(dbProfile.weight_kg) : undefined,
            gender: (dbProfile.gender ?? undefined) as 'male' | 'female' | undefined,
          }
        : undefined,
    [dbProfile],
  );
  const profile =
    (plan?.profile as { age?: number; height?: number; weight?: number; gender?: string } | undefined) ??
    dbProfileView ??
    readHubProfile();

  const baseCalories = useMemo(() => {
    const planCal = Number(plan?.calories);
    return Number.isFinite(planCal) && planCal > 0 ? planCal : 2100;
  }, [plan]);

  const scrollToLabs = () => {
    document.getElementById('hub-lab')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const hasData =
    Boolean(plan) ||
    conditions.length > 0 ||
    Boolean(dbPlan) ||
    Boolean(dbProfile) ||
    dbConditions.length > 0 ||
    (() => {
      try {
        return Boolean(localStorage.getItem('healthcalc_plan'));
      } catch {
        return false;
      }
    })() ||
    dbLoading;

  const gate = (feature: FeatureId) => {
    if (!hasFeature(feature)) setPaywall(feature);
  };

  const handleUpgrade = (tier: Tier) => {
    upgrade(tier);
    setPaywall(null);
    note(t('paywall.cta.startTrial'));
  };

  const note = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const sourceConditions =
    Array.isArray(plan?.conditions) && plan.conditions.length > 0 ? plan.conditions : conditions;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: t('hub.title'), url });
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
    const covered = coveredOrgans(sourceConditions);
    const scoreRows = covered
      .map((o) => {
        const score = organScore(o.id);
        return `<tr><td>${t(o.nameKey)}</td><td>${score === null ? '—' : `${score}`}</td></tr>`;
      })
      .join('');
    const exPool = exercisePoolForConditions(sourceConditions);
    const foodPool = foodPoolForConditions(sourceConditions);
    const labRows = Object.entries(readStoredLabs()).flatMap(([, markers]) =>
      Object.entries(markers)
        .filter(([key]) => LAB_REF[key])
        .map(([key, value]) => ({ key, value })),
    );
    const labRowsHtml = labRows
      .map((row) => {
        const ref = LAB_REF[row.key];
        return `<tr><td>${t(tk(`advanced.lab.field.${row.key}.label`))}</td><td>${row.value} ${ref.unit}</td></tr>`;
      })
      .join('');
    const exercisesHtml = dayExercises(exPool, 1)
      .map((ex) => `<tr><td>${exerciseName(ex, lang)}</td><td>${ex.duration}</td><td>${ex.calories} kcal</td></tr>`)
      .join('');
    const mealsHtml = dayMeals(foodPool, 1)
      .flatMap((row) =>
        row.foods.map((food) => ({
          food,
          slot: t(
            SLOT_KEY[row.slot as keyof typeof SLOT_KEY],
          ),
        })),
      )
      .map((row) => `<tr><td>${foodDisplayName(row.food, lang)}</td><td>${row.slot}</td><td>${row.food.calories} kcal</td></tr>`)
      .join('');
    const dirAttr = dir === 'rtl' ? ' dir="rtl" lang="ar"' : '';
    const condChips = sourceConditions
      .map((c) => t(tk(`advanced.condition.${c}.title`)))
      .join(', ');
    return `<!doctype html>
<html${dirAttr}>
<head>
<meta charset="utf-8" />
<title>${t('hub.pdf.pageTitle')}</title>
<style>
  @page { margin: 24px; }
  body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color: #0F4C3A; margin: 0; padding: 32px; background: #FDFBF7; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  h3 { font-size: 11px; margin: 0 0 8px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; }
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
    <h3>${t('hub.healthScore')}</h3>
    <table><tbody>${scoreRows}</tbody></table>
  </div>
  <div class="card">
    <h3>${t('hub.labResults')}</h3>
    <table><tbody>${labRowsHtml}</tbody></table>
  </div>
  <div class="card">
    <h3>${t('hub.exercisePlan')}</h3>
    <table><tbody>${exercisesHtml}</tbody></table>
  </div>
  <div class="card">
    <h3>${t('hub.nutritionPlan')}</h3>
    <table><tbody>${mealsHtml}</tbody></table>
  </div>
</body>
</html>`;
  };

  const handleDownloadPdf = () => {
    if (!hasFeature('pdfDownload')) {
      gate('pdfDownload');
      return;
    }
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
    const qs = sourceConditions.length > 0 ? `?conditions=${sourceConditions.join(',')}&step=6` : '?step=6';
    navigate(`/advanced-care/wizard${qs}`);
  };

  if (!hasData) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 py-20" dir={dir}>
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#0F4C3A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🫀</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F4C3A] mb-3">{t('hub.title')}</h1>
          <p className="text-sm text-[#6B7A75] mb-8 leading-relaxed">{t('hub.noData')}</p>
          <Link
            to="/advanced-care/wizard"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-8 py-3.5 hover:bg-[#c9a52e] transition"
          >
            {t('hub.startWizard')}
            <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-16" dir={dir}>
      <SEO title={t('seo.hub.title')} description={t('seo.hub.description')} url="/my-health-hub" />
      {confetti && <ConfettiBurst />}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        <Link
          to="/advanced-care"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors mb-4"
        >
          <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
          {t('hub.backToUniverse')}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4C3A] bg-[#D4AF37]/15 rounded-full px-3 py-1.5">
            <Sparkles size={13} />
            {paid ? t('hub.badge.premium') : t('hub.badge.free')}
          </span>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] bg-[#F4F1EB]/70 rounded-full px-3 py-1.5 hover:bg-[#F4F1EB] transition"
          >
            <Share2 size={12} />
            {t('hub.share')}
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F4C3A] mt-3">{t('hub.title')}</h1>
        <p className="text-[#6B7A75] mt-2">{t('hub.subtitle')}</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 space-y-8">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 space-y-6">
            <UserProfileCard name={name} onEdit={adjustPlan} />
            <DailyGoalsCard baseCalories={baseCalories} />
            <HealthScoreCard conditions={sourceConditions} />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <MealLoggingTabs />
            <TodayExerciseCard />
            <WaterTracker />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <AiCoPilotCard />
            <WeightTrendChart />
            <QuickActions />
            <button
              type="button"
              onClick={scrollToLabs}
              className="w-full flex items-center justify-between gap-3 rounded-3xl border border-[#EFEBE4] bg-white px-5 py-4 text-start shadow-[0_8px_24px_rgba(15,76,58,0.06)] hover:border-[#D4AF37]/60 transition"
            >
              <span className="inline-flex items-center gap-2.5 text-sm font-extrabold text-[#0F4C3A]">
                <span className="h-9 w-9 rounded-xl bg-[#F4F1EB] text-[#D4AF37] flex items-center justify-center">
                  <FlaskConical size={17} />
                </span>
                {t('hub.quickActions.labLink')}
              </span>
              <ArrowRight size={16} strokeWidth={2.5} className="text-[#0F4C3A] rtl:rotate-180" />
            </button>
          </div>
        </div>

        <SubscriptionFeatures
          hasFullHub={hasFeature('hubAllDays')}
          hasPdf={hasFeature('pdfDownload')}
          hasSupport={hasFeature('familySharing')}
          onUnlock={gate}
          onNote={note}
        />

        <div id="hub-lab" className="scroll-mt-24">
          <LabSummary paid={hasFeature('labSave')} onUnlock={() => gate('labSave')} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ExerciseDayWizard
            conditions={sourceConditions}
            paid={day <= dayLimit}
            day={day}
            onDayChange={setDay}
            onUnlock={() => gate('hubAllDays')}
            onAdjust={adjustPlan}
          />
          <NutritionDayWizard
            conditions={sourceConditions}
            paid={day <= dayLimit}
            day={day}
            onDayChange={setDay}
            onUnlock={() => gate('hubAllDays')}
          />
        </div>

        <ProgressTracker
          paid={hasFeature('progressTracker')}
          onUnlock={() => gate('progressTracker')}
          initialWeight={profile?.weight}
        />

        <section className="rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-6 md:p-8 text-[#FDFBF7]">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="md:me-auto">
              <h2 className="text-lg font-extrabold">{t('hub.subtitle')}</h2>
              <p className="text-sm text-[#FDFBF7]/70 mt-1">{t('universe.score.disclaimer')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => (paid ? adjustPlan() : gate('hubAllDays'))}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition ${paid ? 'bg-[#0F4C3A] text-[#FDFBF7] ring-2 ring-[#FDFBF7]/30 hover:ring-[#D4AF37]' : 'bg-white/10 text-[#FDFBF7]'}`}
              >
                {!paid && <Lock size={15} />}
                {t('hub.adjustPlan')}
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition ${paid ? 'bg-[#D4AF37] text-[#0F4C3A] hover:bg-[#c9a52e]' : 'bg-white/10 text-[#FDFBF7]'}`}
              >
                {!paid && <Lock size={15} />}
                <FileDown size={16} />
                {t('hub.downloadPdf')}
              </button>
              {!paid ? (
                <button
                  type="button"
                  onClick={() => gate('hubAllDays')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-6 py-3 text-sm font-extrabold hover:bg-[#c9a52e] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition"
                >
                  <Play size={16} fill="currentColor" />
                  {t('hub.cta.trial')}
                </button>
              ) : (
                <Link
                  to="/subscription"
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

      <HealthChat paid={hasFeature('aiChat')} onUnlock={() => gate('aiChat')} name={name} />

      {toast && (
        <div className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">{toast}</div>
        </div>
      )}
    </div>
  );
};

export default MyHealthHubPage;