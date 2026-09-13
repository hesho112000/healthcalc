import React, { useState } from 'react';
import { Copy, Send, UserPlus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tk } from './data';
import LockedCard from './LockedCard';

interface FamilySharingProps {
  paid: boolean;
  onUnlock: () => void;
  onNote: (message: string) => void;
}

const MAX_MEMBERS = 2;

const FamilySharing: React.FC<FamilySharingProps> = ({ paid, onUnlock, onNote }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [invites, setInvites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('hc_hub_invites');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
    } catch {
      return [];
    }
  });

  if (!paid) {
    return <LockedCard title={t(tk('hub.family'))} subtitle={t(tk('hub.family.sub'))} onUnlock={onUnlock} />;
  }

  const persist = (next: string[]) => {
    try {
      localStorage.setItem('hc_hub_invites', JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const invite = () => {
    const clean = email.trim();
    if (!clean || invites.length >= MAX_MEMBERS) return;
    const next = [...invites, clean];
    setInvites(next);
    persist(next);
    setEmail('');
    onNote(t(tk('hub.family.invited')));
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      onNote(t(tk('hub.family.copied')));
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.family'))}</span>
          <p className="mt-1 text-sm text-[#6B7A75] max-w-sm leading-relaxed">{t(tk('hub.family.sub'))}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold">
          <UserPlus size={14} className="text-[#0F4C3A]" />
          <span className="text-[#4A5A55]">{invites.length} / {MAX_MEMBERS}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t(tk('hub.family.email'))}
          className="flex-1 rounded-xl border border-[#EFEBE4] px-4 py-2.5 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900 text-sm"
        />
        <button
          type="button"
          onClick={invite}
          disabled={!email.trim() || invites.length >= MAX_MEMBERS}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C3A] text-[#FDFBF7] font-bold px-5 py-2.5 text-sm transition hover:bg-[#0F4C3A]/90 disabled:opacity-40"
        >
          <Send size={14} />
          {t(tk('hub.family.invite'))}
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/60 text-[#0F4C3A] font-bold px-5 py-2.5 text-sm transition hover:bg-[#D4AF37]/10"
        >
          <Copy size={14} />
          {t(tk('hub.family.invite'))}
        </button>
      </div>

      {invites.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {invites.map((inviteEmail) => (
            <span key={inviteEmail} className="rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#0F4C3A] text-xs font-semibold px-3 py-1.5">
              👤 {inviteEmail}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default FamilySharing;