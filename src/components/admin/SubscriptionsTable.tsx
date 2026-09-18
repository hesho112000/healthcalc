import React, { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AdminSubscription, formatAdminDate } from './types';

type TierFilter = 'all' | 'free' | 'basic' | 'pro' | 'elite';

interface SubscriptionsTableProps {
  subscriptions: AdminSubscription[];
}

const TIER_FILTERS: TierFilter[] = ['all', 'free', 'basic', 'pro', 'elite'];

const STATUS_TONE: Record<string, string> = {
  active: 'bg-[#F4F1EB] text-[#0F4C3A] border-[#D4AF37]',
  cancelled: 'bg-[#FDFBF7] text-[#6B7A75] border-[#EFEBE4]',
  expired: 'bg-[#FDFBF7] text-[#6B7A75] border-[#EFEBE4]',
};

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ subscriptions }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<TierFilter>('all');

  const rows = useMemo(() => {
    if (filter === 'all') return subscriptions;
    if (filter === 'free') {
      return subscriptions.filter((s) => s.tier === 'free' || s.status === 'free');
    }
    return subscriptions.filter((s) => s.tier === filter);
  }, [subscriptions, filter]);

  const paid = subscriptions.filter((s) => s.tier === 'pro' || s.tier === 'elite').length;
  const free = subscriptions.length - paid;

  const th = 'px-4 py-3 text-start text-xs font-extrabold uppercase tracking-wider text-[#6B7A75]';
  const td = 'px-4 py-3 text-sm text-[#2E3835]';

  return (
    <div className="rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {TIER_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-colors ${
                filter === f
                  ? 'bg-[#0F4C3A] text-[#FDFBF7]'
                  : 'bg-[#F4F1EB] text-[#6B7A75] hover:bg-[#EFEBE4]'
              }`}
            >
              {t(`admin.subscriptions.filter.${f}` as keyof typeof import('../../i18n/translations').translations.en)}
            </button>
          ))}
        </div>
        <div className="text-xs font-bold text-[#6B7A75]">
          {t('admin.subscriptions.ratio')}:{' '}
          <span className="text-[#0F4C3A]">
            {free}/{paid}
          </span>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 py-10 text-center text-sm font-semibold text-[#6B7A75]">
          {t('admin.subscriptions.empty')}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-[#EFEBE4]">
          <table className="w-full min-w-[680px] border-collapse">
            <thead className="bg-[#F4F1EB]">
              <tr>
                <th className={th}>{t('admin.subscriptions.table.user')}</th>
                <th className={th}>{t('admin.subscriptions.table.tier')}</th>
                <th className={th}>{t('admin.subscriptions.table.status')}</th>
                <th className={th}>{t('admin.subscriptions.table.started')}</th>
                <th className={th}>{t('admin.subscriptions.table.expires')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t border-[#EFEBE4] hover:bg-[#FDFBF7] transition-colors">
                  <td className={td}>
                    <span className="font-bold text-[#0F4C3A]">{s.user_name || s.user_email || s.user_id}</span>
                  </td>
                  <td className={td}>
                    <span className="inline-block rounded-full border border-[#D4AF37] bg-[#F4F1EB] px-2.5 py-0.5 text-xs font-bold text-[#0F4C3A]">
                      {t(`admin.subscriptions.filter.${s.tier}` as keyof typeof import('../../i18n/translations').translations.en)}
                    </span>
                  </td>
                  <td className={td}>
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                        STATUS_TONE[s.status] ?? 'bg-[#FDFBF7] text-[#6B7A75] border-[#EFEBE4]'
                      }`}
                    >
                      {s.status === 'active' ? t('sub.statusActive') : s.status || '—'}
                    </span>
                  </td>
                  <td className={`${td} text-[#6B7A75]`}>{formatAdminDate(s.started_at)}</td>
                  <td className={`${td} text-[#6B7A75]`}>{formatAdminDate(s.expires_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTable;