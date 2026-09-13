import React from 'react';
import { Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tk } from './data';

interface LockedCardProps {
  title: string;
  subtitle?: string;
  onUnlock: () => void;
}

const LockedCard: React.FC<LockedCardProps> = ({ title, subtitle, onUnlock }) => {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#EFEBE4] bg-white p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[180px]">
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ background: 'repeating-linear-gradient(45deg, rgba(15,76,58,0.02) 0 8px, transparent 8px 16px)' }}
      />
      <span className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/10 flex items-center justify-center">
        <Lock size={20} className="text-[#0F4C3A]" />
      </span>
      <p className="text-sm font-bold text-[#0F4C3A]">{title}</p>
      {subtitle && <p className="text-xs text-[#6B7A75] -mt-1">{subtitle}</p>}
      <button
        type="button"
        onClick={onUnlock}
        className="relative rounded-full bg-[#D4AF37] text-[#0F4C3A] px-6 py-2.5 text-sm font-extrabold shadow-[0_10px_26px_-10px_rgba(212,175,55,0.7)] transition hover:bg-[#c9a52e]"
      >
        {t(tk('hub.cta.trial'))}
      </button>
    </div>
  );
};

export default LockedCard;