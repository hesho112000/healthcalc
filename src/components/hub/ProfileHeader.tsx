import React from 'react';
import { Download, Lock, Pencil, Share2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CONDITION_DATA } from '../../data/conditions';
import { tk } from './data';

export interface HubProfile {
  age?: number;
  height?: number;
  weight?: number;
  gender?: string;
}

interface ProfileHeaderProps {
  name: string;
  conditions: string[];
  profile?: HubProfile;
  paid: boolean;
  onEdit: () => void;
  onShare: () => void;
  onDownload: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, conditions, profile, paid, onEdit, onShare, onDownload }) => {
  const { t } = useLanguage();

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] flex items-center justify-center text-3xl font-extrabold text-[#D4AF37]">
            {name ? name.charAt(0).toUpperCase() : '👤'}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#0F4C3A]">{name}</h2>
            <p className="text-sm text-[#6B7A75] mt-1">
              {profile ? (
                <>
                  {profile?.age ? `${profile.age} ${t('years')} · ` : ''}
                  {profile?.gender === 'female' || profile?.gender === 'male'
                    ? `${t(profile.gender === 'female' ? 'female' : 'male')} · `
                    : ''}
                  {profile?.height ? `${profile.height} ${t('cm')} · ` : ''}
                  {profile?.weight ? `${profile.weight} ${t('kg')}` : '—'}
                </>
              ) : (
                '—'
              )}
            </p>
            {conditions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {conditions.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0F4C3A]/5 border border-[#0F4C3A]/10 px-2.5 py-1 text-[11px] font-bold text-[#0F4C3A]"
                  >
                    <span>{CONDITION_DATA[c]?.icon ?? '🩺'}</span>
                    {t(tk(`advanced.condition.${c}.title`))}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:ms-auto">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] hover:bg-[#F4F1EB] transition"
          >
            <Pencil size={14} />
            {t('hub.editProfile')}
          </button>
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-2 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] hover:bg-[#F4F1EB] transition"
          >
            <Share2 size={14} />
            {t('hub.share')}
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] hover:bg-[#F4F1EB] transition"
          >
            {!paid && <Lock size={13} />}
            <Download size={14} />
            {t('hub.downloadPdf')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;