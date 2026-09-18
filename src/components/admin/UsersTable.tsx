import React, { useMemo, useState } from 'react';
import { Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AdminUser, formatAdminDate } from './types';

const PAGE_SIZE = 20;

interface UsersTableProps {
  users: AdminUser[];
  onDelete: (user: AdminUser) => Promise<void>;
  onEdit: (user: AdminUser, name: string, age: number | null) => Promise<void>;
}

const TierBadge: React.FC<{ tier: string }> = ({ tier }) => {
  const { t } = useLanguage();
  const tone =
    tier === 'pro' || tier === 'elite'
      ? 'bg-[#F4F1EB] text-[#0F4C3A] border-[#D4AF37]'
      : tier === 'basic'
        ? 'bg-[#FDFBF7] text-[#6B7A75] border-[#EFEBE4]'
        : 'bg-[#FDFBF7] text-[#6B7A75] border-[#EFEBE4]';
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${tone}`}>
      {t(`admin.subscriptions.filter.${tier}` as keyof typeof import('../../i18n/translations').translations.en)}
    </span>
  );
};

const UsersTable: React.FC<UsersTableProps> = ({ users, onDelete, onEdit }) => {
  const { t, dir } = useLanguage();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<AdminUser | null>(null);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [confirming, setConfirming] = useState<AdminUser | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        (u.full_name ?? '').toLowerCase().includes(q) || (u.email ?? '').toLowerCase().includes(q),
    );
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const openEdit = (user: AdminUser) => {
    setEditing(user);
    setEditName(user.full_name ?? '');
    setEditAge(user.age === null ? '' : String(user.age));
  };

  const saveEdit = async () => {
    if (!editing || busy) return;
    setBusy(true);
    const ageValue = editAge.trim() === '' ? null : Number(editAge);
    await onEdit(editing, editName.trim(), Number.isFinite(ageValue ?? 0) ? ageValue : null);
    setBusy(false);
    setEditing(null);
  };

  const doDelete = async () => {
    if (!confirming || busy) return;
    setBusy(true);
    await onDelete(confirming);
    setBusy(false);
    setConfirming(null);
  };

  const th = 'px-4 py-3 text-start text-xs font-extrabold uppercase tracking-wider text-[#6B7A75]';
  const td = 'px-4 py-3 text-sm text-[#2E3835]';

  return (
    <div className="rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search size={16} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#6B7A75]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={t('admin.users.searchPlaceholder')}
            className="w-full rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] py-2.5 ps-9 pe-3 text-sm font-semibold text-[#0F4C3A] placeholder-[#94A3B8] outline-none focus:border-[#D4AF37]"
          />
        </div>
        <p className="text-xs font-bold text-[#6B7A75]">
          {filtered.length} · {users.length}
        </p>
      </div>

      {pageRows.length === 0 ? (
        <p className="mt-6 py-10 text-center text-sm font-semibold text-[#6B7A75]">
          {t('admin.users.empty')}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-[#EFEBE4]">
          <table className="w-full min-w-[760px] border-collapse">
            <thead className="bg-[#F4F1EB]">
              <tr>
                <th className={th}>{t('admin.users.table.name')}</th>
                <th className={th}>{t('admin.users.table.email')}</th>
                <th className={th}>{t('admin.users.table.age')}</th>
                <th className={th}>{t('admin.users.table.conditions')}</th>
                <th className={th}>{t('admin.users.table.tier')}</th>
                <th className={th}>{t('admin.users.table.joined')}</th>
                <th className={th}>{t('admin.users.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((u) => (
                <tr key={u.id} className="border-t border-[#EFEBE4] hover:bg-[#FDFBF7] transition-colors">
                  <td className={td}>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-xs font-extrabold">
                        {(u.full_name ?? u.email ?? '?').charAt(0).toUpperCase()}
                      </span>
                      <span className="font-bold text-[#0F4C3A]">{u.full_name || '—'}</span>
                    </div>
                  </td>
                  <td className={`${td} text-[#6B7A75]`}>{u.email || '—'}</td>
                  <td className={td}>{u.age ?? '—'}</td>
                  <td className={td}>{u.conditionCount}</td>
                  <td className={td}>
                    <TierBadge tier={u.tier} />
                  </td>
                  <td className={`${td} text-[#6B7A75]`}>{formatAdminDate(u.created_at)}</td>
                  <td className={td}>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label={t('admin.users.view')}
                        onClick={() => setViewing(u)}
                        className="rounded-lg p-2 text-[#0F4C3A] hover:bg-[#F4F1EB] transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={t('admin.users.edit')}
                        onClick={() => openEdit(u)}
                        className="rounded-lg p-2 text-[#B8860B] hover:bg-[#F4F1EB] transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={t('admin.users.delete')}
                        onClick={() => setConfirming(u)}
                        className="rounded-lg p-2 text-[#B91C1C] hover:bg-[#FDFBF7] transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="inline-flex items-center gap-1 rounded-xl border border-[#EFEBE4] px-3 py-2 text-xs font-bold text-[#0F4C3A] disabled:opacity-40 hover:bg-[#F4F1EB] transition-colors"
        >
          <ChevronLeft size={14} className="rtl:rotate-180" /> {safePage}
        </button>
        <span className="text-xs font-bold text-[#6B7A75]">
          {safePage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="inline-flex items-center gap-1 rounded-xl border border-[#EFEBE4] px-3 py-2 text-xs font-bold text-[#0F4C3A] disabled:opacity-40 hover:bg-[#F4F1EB] transition-colors"
        >
          <ChevronRight size={14} className="rtl:rotate-180" /> {totalPages}
        </button>
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" dir={dir}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-lg font-extrabold">
                {(viewing.full_name ?? viewing.email ?? '?').charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="text-lg font-extrabold text-[#0F4C3A]">{viewing.full_name || '—'}</p>
                <p className="text-sm font-semibold text-[#6B7A75]">{viewing.email || '—'}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#6B7A75]">{t('admin.users.table.age')}</dt>
                <dd className="font-bold text-[#0F4C3A]">{viewing.age ?? '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#6B7A75]">{t('admin.users.table.conditions')}</dt>
                <dd className="font-bold text-[#0F4C3A]">{viewing.conditionCount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#6B7A75]">{t('admin.users.table.tier')}</dt>
                <dd>
                  <TierBadge tier={viewing.tier} />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#6B7A75]">{t('admin.users.table.joined')}</dt>
                <dd className="font-bold text-[#0F4C3A]">{formatAdminDate(viewing.created_at)}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setViewing(null)}
              className="mt-6 w-full rounded-xl bg-[#0F4C3A] text-[#FDFBF7] px-4 py-2.5 text-sm font-extrabold hover:bg-[#0B3A2B] transition-colors"
            >
              {t('admin.login.back')}
            </button>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" dir={dir}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
            <h3 className="text-lg font-extrabold text-[#0F4C3A]">{t('admin.users.edit')}</h3>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-sm font-bold text-[#0F4C3A]">{t('admin.users.table.name')}</span>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] px-3 py-2.5 text-sm font-semibold text-[#0F4C3A] outline-none focus:border-[#D4AF37]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-[#0F4C3A]">{t('admin.users.table.age')}</span>
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] px-3 py-2.5 text-sm font-semibold text-[#0F4C3A] outline-none focus:border-[#D4AF37]"
                />
              </label>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 rounded-xl border border-[#EFEBE4] px-4 py-2.5 text-sm font-extrabold text-[#6B7A75] hover:bg-[#F4F1EB] transition-colors"
              >
                {t('pmCancel')}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={saveEdit}
                className="flex-1 rounded-xl bg-[#0F4C3A] text-[#FDFBF7] px-4 py-2.5 text-sm font-extrabold hover:bg-[#0B3A2B] disabled:opacity-50 transition-colors"
              >
                {t('admin.users.edit')}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" dir={dir}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FDFBF7] text-2xl">
              🗑️
            </span>
            <p className="mt-4 text-lg font-extrabold text-[#0F4C3A]">{t('admin.users.delete')}</p>
            <p className="mt-2 text-sm font-semibold text-[#6B7A75]">
              {confirming.full_name || confirming.email || confirming.id}
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirming(null)}
                className="flex-1 rounded-xl border border-[#EFEBE4] px-4 py-2.5 text-sm font-extrabold text-[#6B7A75] hover:bg-[#F4F1EB] transition-colors"
              >
                {t('pmCancel')}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={doDelete}
                className="flex-1 rounded-xl bg-[#B91C1C] text-white px-4 py-2.5 text-sm font-extrabold hover:bg-[#a01818] disabled:opacity-50 transition-colors"
              >
                {t('admin.users.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;