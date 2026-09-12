import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, Plus, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import BodyMap, {
  ORGAN_CONFIG,
  ORGAN_IDS,
  organConditionKey,
  organNameKey,
} from '../components/health-universe/BodyMap';
import HealthCard from '../components/health-universe/HealthCard';
import HealthDashboard from '../components/health-universe/HealthDashboard';
import PaywallModal from '../components/health-universe/PaywallModal';
import { useSubscription } from '../context/SubscriptionContext';
import type { FeatureId } from '../context/SubscriptionContext';
import type { ConditionId } from '../data/conditions';
import type { OrganId } from '../components/health-universe/BodyMap';

type TKey = keyof typeof translations.en;

const tt = (t: (key: TKey) => string, key: TKey, params?: Record<string, string>): string => {
  let text = t(key);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.split(`{${k}}`).join(v);
    });
  }
  return text;
};

const STORAGE_KEY = 'hc_health_universe';

const HealthUniversePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const { hasFeature, upgrade } = useSubscription();
  const [paywallFeature, setPaywallFeature] = useState<FeatureId | null>(null);
  const [toast, setToast] = useState('');
  const [activeOrgan, setActiveOrgan] = useState<OrganId | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [plan, setPlan] = useState<OrganId[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw
        ? (JSON.parse(raw) as OrganId[]).filter((id) => (ORGAN_IDS as readonly string[]).includes(id))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch {
      /* ignore */
    }
  }, [plan]);

  const togglePlan = (id: OrganId) =>
    setPlan((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleTogglePlan = (id: OrganId) => {
    const adding = !plan.includes(id);
    togglePlan(id);
    if (adding) {
      showToast(tt(t, 'universe.toast.added', { condition: t(organConditionKey(id)) }));
    }
  };

  const handleRemoveFromPlan = (id: OrganId) => {
    togglePlan(id);
    if (activeOrgan === id) setActiveOrgan(null);
  };

  const selection = useMemo(
    () => (activeOrgan && !plan.includes(activeOrgan) ? [...plan, activeOrgan] : plan),
    [plan, activeOrgan],
  );

  const unionConditions = useMemo(() => {
    const set = new Set<string>();
    selection.forEach((id) => ORGAN_CONFIG[id].conditionIds.forEach((cid) => set.add(cid)));
    return [...set] as ConditionId[];
  }, [selection]);

  const handleContinue = () => {
    if (!hasFeature('fullPlan')) {
      setPaywallFeature('fullPlan');
      return;
    }
    if (unionConditions.length > 0) {
      navigate(`/advanced-care/wizard?conditions=${unionConditions.join(',')}`);
    } else {
      navigate('/advanced-care/wizard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-32" dir={dir}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_120%_at_50%_0%,rgba(212,175,55,0.10),rgba(255,255,255,0)_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-12 text-center">
          <span className="hero-eyebrow" aria-hidden="true" />
          <h1 className="hero-title">
            <span className="hero-title-line1">{t('universe.title')}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl">{t('universe.subtitle')}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <div
              ref={mapRef}
              className="max-w-md mx-auto rounded-[32px] border border-[#EFEBE4] bg-white/80 p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,76,58,0.06)]"
            >
              <BodyMap activeOrgan={activeOrgan} onSelect={setActiveOrgan} />
            </div>

            {activeOrgan && (
              <div className="hidden lg:flex justify-center mt-8 pointer-events-none">
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <span className="h-px w-24 border-t border-dashed border-[#D4AF37]/60" />
                  <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180 text-[#D4AF37]" />
                </div>
              </div>
            )}

            {!activeOrgan && (
              <p className="mt-6 text-center text-sm font-bold text-[#4A5A55] bg-[#F4F1EB] rounded-2xl px-5 py-3">
                {t('universe.hint')}
              </p>
            )}
          </div>

          <div>
            {activeOrgan ? (
              <div className="lg:sticky lg:top-8">
                <HealthCard
                  key={activeOrgan}
                  organ={activeOrgan}
                  inPlan={plan.includes(activeOrgan)}
                  onTogglePlan={() => handleTogglePlan(activeOrgan)}
                  onClose={() => setActiveOrgan(null)}
                />
              </div>
            ) : (
              <div className="rounded-[32px] border border-dashed border-[#E3DCC9] bg-[#FDFBF7] p-10 text-center max-w-xl mx-auto lg:mx-0">
                <span className="mx-auto w-16 h-16 rounded-full bg-[#F4F1EB] flex items-center justify-center text-3xl">
                  🫀
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-[#0F4C3A]">
                  {t('universe.title')}
                </h3>
                <p className="mt-2 text-sm text-[#4A5A55] leading-relaxed">
                  {t('universe.hint')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-14">
          <div className="rounded-[32px] border border-[#EFEBE4] bg-white p-6 sm:p-10 shadow-[0_18px_50px_rgba(15,76,58,0.08)]">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 shrink-0 rounded-full bg-[#F4F1EB] text-[#0F4C3A] flex items-center justify-center">
                <LayoutDashboard size={22} strokeWidth={2.2} />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-[#0F4C3A] leading-tight">
                  {t('dashboard.title')}
                </h2>
                <p className="mt-0.5 text-sm text-[#6B7A75]">{t('dashboard.subtitle')}</p>
              </div>
            </div>

            {selection.length > 0 && (
              <div className="mt-7 rounded-2xl bg-[#FDFBF7] border border-[#EFEBE4] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold text-[#0F4C3A]">
                    {t('universe.selectedOrgans')}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveOrgan(null);
                      mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 text-[#6a4f0e] px-3 py-1.5 text-xs font-extrabold hover:bg-[#D4AF37]/25 transition-colors"
                  >
                    <Plus size={13} strokeWidth={2.5} />
                    {t('universe.addMore')}
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selection.map((id) => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#EFEBE4] px-3 py-1.5 text-xs font-bold text-[#0F4C3A]"
                    >
                      <span>{ORGAN_CONFIG[id].emoji}</span>
                      {t(organNameKey(id))}
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveFromPlan(id);
                        }}
                        aria-label={t('universe.tools.back')}
                        className="text-[#4A5A55] hover:text-[#B91C1C] transition-colors"
                      >
                        <X size={13} strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <HealthDashboard
              organs={selection}
              onViewOrgan={setActiveOrgan}
              onContinue={handleContinue}
            />
          </div>
        </section>

      {activeOrgan && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#EFEBE4] bg-[#FDFBF7]/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="hidden sm:flex sm:items-center gap-2 text-xs font-bold text-[#4A5A55]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              {t('dashboard.title')}
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-3.5 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition-all"
            >
              {t('dashboard.cta.continue')}
              <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
            </button>
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

export default HealthUniversePage;