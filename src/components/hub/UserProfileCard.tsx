import React from 'react';
import { HeartPulse, Pencil } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSubscription } from '../../context/SubscriptionContext';
import { useUserData } from '../../hooks/useUserData';
import { CONDITION_DATA } from '../../data/conditions';
import { readHubConditions, readHubPlan, tk } from './data';
import type { TKey } from './data';

interface UserProfileCardProps {
  name: string;
  onEdit: () => void;
}

const TIER_KEY: Record<string, TKey> = {
  free: tk('hub.badge.free'),
  basic: tk('hub.badge.basic'),
  pro: tk('hub.badge.pro'),
  elite: tk('hub.badge.elite'),
};

const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, onEdit }) => {
  const { t } = useLanguage();
  const { tier } = useSubscription();
  const { profile, conditions: dbConditions } = useUserData();

  const db = profile;
  const localPlan = readHubPlan();
  const conditions =
    readHubConditions().length > 0 ? readHubConditions() : dbConditions;
  const age = db?.age ?? localPlan?.profile?.age;
  const height = db?.height_cm ?? localPlan?.profile?.height;
  const weight = db?.weight_kg ?? localPlan?.profile?.weight;
  const gender = db?.gender ?? localPlan?.profile?.gender;
  const initial = name ? name.charAt(0).toUpperCase() : '👤';

  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-6 text-[#FDFBF7] shadow-[0_14px_34px_rgba(15,76,58,0.18)]">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] flex items-center justify-center text-2xl font-extrabold text-[#0F4C3A]">
          {initial}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-extrabold truncate">{name}</h2>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 px-2.5 py-0.5 text-[11px] font-bold text-[#D4AF37]">
            <HeartPulse size={11} />
            {t(TIER_KEY[tier] ?? TIER_KEY.free)}
          </span>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="ms-auto inline-flex items-center gap-1.5 rounded-full bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 transition px-3.5 py-2 text-xs font-bold"
        >
          <Pencil size={13} />
          {t('hub.editProfile')}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {[
          { label: t('hub.profile.age'), value: age ? String(age) : '—' },
          {
            label: t('hub.profile.gender'),
            value: gender === 'female' || gender === 'male' ? t(gender === 'female' ? 'female' : 'male') : '—',
          },
          { label: t('hub.profile.height'), value: height ? `${height} ${t('cm')}` : '—' },
          { label: t('hub.profile.weight'), value: weight ? `${weight} ${t('kg')}` : '—' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-[#FDFBF7]/10 px-3 py-2.5 text-center">
            <div className="text-[10px] font-bold text-[#FDFBF7]/70 uppercase tracking-wide">{stat.label}</div>
            <div className="mt-0.5 text-sm font-extrabold tabular-nums">{stat.value}</div>
          </div>
        ))}
      </div>

      {conditions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {conditions.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FDFBF7]/10 px-2.5 py-1 text-[11px] font-bold"
            >
              <span>{CONDITION_DATA[c]?.icon ?? '🩺'}</span>
              {t(tk(`advanced.condition.${c}.title`))}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserProfileCard;