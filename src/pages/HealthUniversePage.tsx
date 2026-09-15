import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import BodyMap, { CONDITION_DOT_CONFIG } from '../components/health-universe/BodyMap';
import { CONDITION_DATA, CONDITION_IDS } from '../data/conditions';
import type { ConditionId } from '../data/conditions';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

type TKey = keyof typeof translations.en;
const STORAGE_KEY = 'healthcalc_conditions';

const conditionNameKey = (id: ConditionId): TKey =>
  (id === 'mental-wellness'
    ? 'condition.mentalWellness.name'
    : `condition.${id.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())}.name`) as TKey;
const conditionDescriptionKey = (id: ConditionId): TKey =>
  (id === 'mental-wellness'
    ? 'condition.mentalWellness.desc'
    : `condition.${id.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())}.desc`) as TKey;

const HealthUniversePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [selectedConditions, setSelectedConditions] = useState<ConditionId[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(saved) ? saved.filter((id): id is ConditionId => CONDITION_IDS.includes(id)) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedConditions));
  }, [selectedConditions]);

  const toggleCondition = (id: ConditionId) => {
    setSelectedConditions((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <section className="px-6 py-12 text-center">
        <h1 className="hero-title"><span className="hero-title-line1">{t('universe.title')}</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#4A5A55]">{t('universe.subtitle')}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl rounded-[32px] border border-[#EFEBE4] bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,76,58,0.06)] sm:p-8">
          <BodyMap selectedConditions={selectedConditions} />
        </div>
        <p className="mx-auto mt-6 max-w-xl rounded-2xl bg-[#F4F1EB] px-5 py-3 text-center text-sm font-bold text-[#4A5A55]">
          {t('universe.hint')}
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-6 pb-28">
        <h2 className="mb-6 text-center text-2xl font-extrabold text-[#0F4C3A]">{t('universe.conditionsTitle' as TKey)}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONDITION_IDS.map((id) => {
            const data = CONDITION_DATA[id];
            const selected = selectedConditions.includes(id);
            const dot = CONDITION_DOT_CONFIG.find((entry) => entry.id === id);
            return (
              <article key={id} className={`rounded-[24px] border bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.04)] ${selected ? 'border-[#D4AF37]' : 'border-[#EFEBE4]'}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{data.icon}</span>
                  <div>
                    <h3 className="font-extrabold text-[#0F4C3A]">{t(conditionNameKey(id))}</h3>
                    <p className="mt-1 text-sm text-[#6B7A75]">{t(conditionDescriptionKey(id))}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => navigate(`/advanced-care/${dot?.organId ?? 'brain'}`)} className="text-sm font-bold text-[#D4AF37]">
                    {t('universe.viewDetails' as TKey)} →
                  </button>
                  <button type="button" onClick={() => toggleCondition(id)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold ${selected ? 'border border-[#D4AF37] text-[#0F4C3A]' : 'bg-[#D4AF37]/15 text-[#6a4f0e]'}`}>
                    {selected ? <Check size={13} /> : <Plus size={13} />}
                    {selected ? t('universe.added' as TKey) : t('universe.addToPlan' as TKey)}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-lg font-extrabold text-[#0F4C3A]">{t('universe.selectedConditions' as TKey)}</h2>
          {selectedConditions.length ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {selectedConditions.map((id) => (
                <span key={id} className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-white px-3 py-1.5 text-xs font-bold text-[#0F4C3A]">
                  {CONDITION_DATA[id].icon} {t(conditionNameKey(id))}
                  <button type="button" onClick={() => toggleCondition(id)} aria-label={`Remove ${t(conditionNameKey(id))}`}><X size={13} /></button>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 inline-block rounded-2xl bg-[#F4F1EB] px-5 py-3 text-sm font-bold text-[#6B7A75]">{t('universe.noConditions' as TKey)}</p>
          )}
          <button type="button" onClick={() => navigate(`/advanced-care/wizard?conditions=${selectedConditions.join(',')}`)} disabled={!selectedConditions.length} className="mx-auto mt-6 flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 text-sm font-extrabold text-[#0F4C3A] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition hover:bg-[#c9a12f] disabled:cursor-not-allowed disabled:bg-[#EFEBE4] disabled:text-[#6B7A75] disabled:shadow-none">
            {t('universe.continue' as TKey)} <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HealthUniversePage;
