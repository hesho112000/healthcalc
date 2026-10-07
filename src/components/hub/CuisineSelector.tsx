import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { readHubPlan, tk } from './data';
import LockedCard from './LockedCard';
import Flag from '../common/Flag';

interface CuisineSelectorProps {
  paid: boolean;
  onUnlock: () => void;
  onNote: (message: string) => void;
}

const CUISINES: Array<{ id: string; countryCode: string }> = [
  { id: 'Egyptian', countryCode: 'eg' },
  { id: 'Tunisian', countryCode: 'tn' },
  { id: 'Saudi', countryCode: 'sa' },
  { id: 'Lebanese', countryCode: 'lb' },
  { id: 'American', countryCode: 'us' },
  { id: 'Italian', countryCode: 'it' },
  { id: 'Austrian', countryCode: 'at' },
  { id: 'Benelux', countryCode: 'nl' },
  { id: 'Norwegian', countryCode: 'no' },
  { id: 'Swedish', countryCode: 'se' },
  { id: 'Danish', countryCode: 'dk' },
  { id: 'Finnish', countryCode: 'fi' },
];

const readStoredCuisine = (): string => {
  try {
    const raw = localStorage.getItem('hc_hub_cuisine');
    if (raw) return raw;
    const planCuisine = readHubPlan()?.cuisine;
    if (planCuisine) return planCuisine;
  } catch {
    /* ignore */
  }
  return 'Egyptian';
};

const CuisineSelector: React.FC<CuisineSelectorProps> = ({ paid, onUnlock, onNote }) => {
  const { t } = useLanguage();
  const [cuisine, setCuisineState] = useState<string>(readStoredCuisine);

  if (!paid) {
    return <LockedCard title={t(tk('hub.cuisine'))} subtitle={t(tk('hub.cuisine.change'))} onUnlock={onUnlock} />;
  }

  const change = (id: string) => {
    setCuisineState(id);
    try {
      localStorage.setItem('hc_hub_cuisine', id);
    } catch {
      /* ignore */
    }
    onNote(t(tk('hub.cuisine.changed')));
  };

  return (
    <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.cuisine'))}</span>
          <p className="mt-1 text-sm text-[#6B7A75]">{t(tk('hub.cuisine.change'))}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map(({ id, countryCode }) => {
            const active = cuisine === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => change(id)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active
                    ? 'border-[#0F4C3A] bg-[#0F4C3A] text-[#FDFBF7]'
                    : 'border-[#EFEBE4] bg-white text-[#4A5A55] hover:border-[#0F4C3A]/40'
                }`}
              >
                <Flag countryCode={countryCode} alt={`${id} flag`} className="mr-1.5 h-3.5 w-5" />
                {id}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CuisineSelector;
