import React, { useMemo } from 'react';
import { Sparkles, Stethoscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useUserData } from '../../hooks/useUserData';
import { CONDITION_DATA } from '../../data/conditions';
import { readHubConditions, tk, tt } from './data';

const AiCoPilotCard: React.FC = () => {
  const { t } = useLanguage();
  const { labs, conditions: dbConditions } = useUserData();

  const conditions = readHubConditions().length > 0 ? readHubConditions() : dbConditions;

  const bullets = useMemo(() => {
    const out: Array<{ emoji: string; text: string }> = [];
    conditions.slice(0, 3).forEach((c) => {
      const label = t(tk(`advanced.condition.${c}.title`));
      out.push({
        emoji: CONDITION_DATA[c]?.icon ?? '🩺',
        text: `${label} — ${t('hub.ai.cond')}`,
      });
    });
    if (labs.length > 0) {
      out.push({ emoji: '🧪', text: tt(t, 'hub.ai.lab', { n: String(labs.length) }) });
    }
    out.push({ emoji: '💧', text: t('hub.ai.tipHydration') });
    out.push({ emoji: '🌙', text: t('hub.ai.tipSleep') });
    return out.slice(0, 4);
  }, [conditions, labs, t]);

  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border border-[#0F4C3A]/20 p-5 text-[#FDFBF7] shadow-[0_14px_34px_rgba(15,76,58,0.18)]">
      <div className="flex items-center gap-2.5">
        <span className="h-10 w-10 rounded-2xl bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center">
          <Stethoscope size={18} />
        </span>
        <div>
          <h3 className="flex items-center gap-1.5 font-extrabold text-sm">
            AI Co-Pilot
            <Sparkles size={13} className="text-[#D4AF37]" />
          </h3>
          <p className="text-[11px] text-[#FDFBF7]/70">{t('hub.ai.subtitle')}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#FDFBF7] text-[#0F4C3A] p-4 shadow-inner">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#8A6D1C]">
          {t('hub.ai.recommends')}
        </div>
        <ul className="space-y-2.5">
          {bullets.length === 0 ? (
            <li className="text-xs text-[#6B7A75]">{t('hub.ai.noData')}</li>
          ) : (
            bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-relaxed">
                <span className="mt-0.5 shrink-0">{b.emoji}</span>
                <span className="text-[#3d4b46]">{b.text}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default AiCoPilotCard;