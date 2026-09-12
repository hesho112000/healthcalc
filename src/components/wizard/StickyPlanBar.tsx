import React from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

interface StickyPlanBarProps {
  subtitle: string;
  onSave: () => void;
  onDownload: () => void;
}

const StickyPlanBar: React.FC<StickyPlanBarProps> = ({ subtitle, onSave, onDownload }) => {
  const { t, dir } = useLanguage();
  const tk = (key: string) => key as keyof typeof translations.en;

  return (
    <div dir={dir} className="fixed inset-x-0 bottom-0 z-40 border-t border-[#EFEBE4] bg-[#FDFBF7]/95 shadow-[0_-8px_30px_rgba(15,76,58,0.08)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6">
        <div className="text-center sm:text-start">
          <p className="text-sm font-extrabold text-[#0F4C3A]">{t(tk('wizard.blueprint.bar.ready'))}</p>
          <p className="mt-0.5 text-[11px] font-semibold text-[#4A5A55]">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#0F4C3A] px-5 py-2.5 text-sm font-bold text-[#0F4C3A] transition hover:bg-[#0F4C3A]/5"
          >
            <Download size={16} />
            {t(tk('wizard.step6.downloadPdf'))}
          </button>
          <button
            type="button"
            onClick={onSave}
            className="shrink-0 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-extrabold text-[#0F4C3A] shadow-[0_10px_24px_-8px_rgba(212,175,55,0.6)] transition hover:bg-[#c9a52e]"
          >
            {t(tk('advanced.finalCta.cta'))}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyPlanBar;