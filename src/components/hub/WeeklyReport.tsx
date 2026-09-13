import React, { useState } from 'react';
import { FileText, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tk } from './data';
import LockedCard from './LockedCard';

interface WeeklyReportProps {
  paid: boolean;
  onUnlock: () => void;
  onNote: (message: string) => void;
}

const readStored = (): boolean => {
  try {
    return localStorage.getItem('hc_hub_weekly_report') === 'on';
  } catch {
    return false;
  }
};

const WeeklyReport: React.FC<WeeklyReportProps> = ({ paid, onUnlock, onNote }) => {
  const { t } = useLanguage();
  const [enabled, setEnabled] = useState<boolean>(readStored);

  if (!paid) {
    return <LockedCard title={t(tk('hub.weekly'))} subtitle={t(tk('hub.weekly.sub'))} onUnlock={onUnlock} />;
  }

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem('hc_hub_weekly_report', next ? 'on' : 'off');
    } catch {
      /* ignore */
    }
    onNote(next ? t(tk('hub.weekly.enabled')) : t(tk('hub.weekly.saved')));
  };

  return (
    <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <span className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/10 flex items-center justify-center shrink-0">
            <FileText size={20} className="text-[#0F4C3A]" />
          </span>
          <div>
            <span className="block text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.weekly'))}</span>
            <p className="mt-1 text-sm text-[#6B7A75] max-w-sm leading-relaxed">{t(tk('hub.weekly.sub'))}</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={toggle}
          className={`relative h-8 w-16 shrink-0 rounded-full transition ${enabled ? 'bg-[#0F4C3A]' : 'bg-[#EFEBE4]'}`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${enabled ? 'left-9' : 'left-1'}`}
          />
        </button>
      </div>
      <p className="mt-3 text-xs text-[#6B7A75] flex items-center gap-1.5">
        <Lock size={12} /> {enabled ? t(tk('hub.weekly.enabled')) : t(tk('hub.weekly.enable'))}
      </p>
    </section>
  );
};

export default WeeklyReport;