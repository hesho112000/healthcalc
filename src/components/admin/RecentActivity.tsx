import React from 'react';
import { UserPlus, FilePlus2, FlaskConical } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ActivityItem, adminActivityLabel, formatAdminDateTime } from './types';

interface RecentActivityProps {
  items: ActivityItem[];
}

const ACTIVITY_ICON: Record<ActivityItem['type'], React.ReactNode> = {
  user: <UserPlus size={16} />,
  plan: <FilePlus2 size={16} />,
  lab: <FlaskConical size={16} />,
};

const RecentActivity: React.FC<RecentActivityProps> = ({ items }) => {
  const { t } = useLanguage();
  return (
    <div className="rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <h3 className="text-base font-extrabold text-[#0F4C3A]">{t('admin.recentActivity')}</h3>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-[#6B7A75]">—</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F1EB] text-[#0F4C3A]">
                {ACTIVITY_ICON[item.type]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#0F4C3A] leading-snug">
                  {t(adminActivityLabel(item.type))}
                  {item.title ? <span className="font-semibold text-[#6B7A75]"> — {item.title}</span> : null}
                </p>
                <p className="mt-0.5 text-xs text-[#6B7A75]">{formatAdminDateTime(item.time)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;