import React from 'react';
import { Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tk } from './data';
import LockedCard from './LockedCard';

interface CommunityCardProps {
  paid: boolean;
  onUnlock: () => void;
  onNote: (message: string) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ paid, onUnlock, onNote }) => {
  const { t } = useLanguage();

  if (!paid) {
    return <LockedCard title={t(tk('hub.community'))} subtitle={t(tk('hub.community.sub'))} onUnlock={onUnlock} />;
  }

  const join = async () => {
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
      onNote(t('hub.share.copied'));
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#EFEBE4] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-6 md:p-8 text-[#FDFBF7]">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <span className="w-12 h-12 rounded-2xl bg-[#FDFBF7]/10 flex items-center justify-center shrink-0">
            <Users size={20} className="text-[#D4AF37]" />
          </span>
          <div>
            <span className="block text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.community'))}</span>
            <p className="mt-1 text-sm text-[#FDFBF7]/80 max-w-sm leading-relaxed">{t(tk('hub.community.sub'))}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={join}
          className="rounded-full bg-[#D4AF37] text-[#0F4C3A] font-extrabold px-6 py-2.5 text-sm shadow-[0_10px_26px_-10px_rgba(212,175,55,0.7)] transition hover:bg-[#c9a52e]"
        >
          {t(tk('hub.community.join'))} →
        </button>
      </div>
    </section>
  );
};

export default CommunityCard;