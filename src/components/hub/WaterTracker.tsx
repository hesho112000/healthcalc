import React from 'react';
import { Droplets, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { addWater, useHubDaily } from './hubDailyStore';

const GLASS_ML = 250;
const TARGET_L = 2;

const WaterTracker: React.FC = () => {
  const { t } = useLanguage();
  const { day, key } = useHubDaily();

  const glassesTotal = Math.round(TARGET_L * 1000 / GLASS_ML);
  const filled = Math.min(glassesTotal, Math.round(day.water * 1000 / GLASS_ML));
  const liters = day.water.toFixed(2);

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="flex items-center gap-2 font-extrabold text-sm text-[#0F4C3A]">
          <Droplets size={16} />
          {t('hub.water')}
        </h3>
        <span className="text-[11px] font-bold text-[#6B7A75] tabular-nums">
          {filled}/{glassesTotal} {t('hub.water.glasses')}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: glassesTotal }, (_, i) => (
          <div
            key={i}
            className={`h-10 flex-1 rounded-lg transition-all duration-300 ${
              i < filled
                ? 'bg-gradient-to-b from-[#0F4C3A] to-[#1a6b53] shadow-sm'
                : 'bg-[#F4F1EB] border border-[#EFEBE4]'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => addWater(key, -GLASS_ML)}
            className="h-10 w-10 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 text-[#0F4C3A] font-extrabold hover:bg-[#F4F1EB] transition flex items-center justify-center"
          >
            <Minus size={15} strokeWidth={3} />
          </button>
          <button
            type="button"
            onClick={() => addWater(key, GLASS_ML)}
            className="h-10 w-10 rounded-full bg-[#0F4C3A] text-[#FDFBF7] font-extrabold hover:bg-[#1a6b53] transition flex items-center justify-center"
          >
            <Plus size={15} strokeWidth={3} />
          </button>
          <span className="ms-1 text-sm font-extrabold text-[#0F4C3A] tabular-nums">
            {liters} L
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#6B7A75]">
          {t('hub.water.logged').replace('{liters}', liters)}
        </span>
      </div>
    </section>
  );
};

export default WaterTracker;