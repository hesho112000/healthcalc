import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ARTICLES, lt as articleLt } from '../../data/articles';
import { RECIPES, lt as recipeLt } from '../../data/recipes';
import { EXERCISE_GUIDES, pickText } from '../../data/exerciseGuides';

type ContentTab = 'articles' | 'recipes' | 'exercises';

const TABS: ContentTab[] = ['articles', 'recipes', 'exercises'];

interface ContentRow {
  key: string;
  title: string;
  category: string;
  published: string | null;
}

const ContentManager: React.FC = () => {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<ContentTab>('articles');
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const rows: ContentRow[] = useMemo(() => {
    if (tab === 'articles') {
      return ARTICLES.map((a) => ({
        key: a.id,
        title: articleLt(a.title, language),
        category: a.category,
        published: a.publishedAt ?? null,
      }));
    }
    if (tab === 'recipes') {
      return RECIPES.map((r) => ({
        key: r.id,
        title: recipeLt(r.title, language),
        category: recipeLt(r.cuisine, language),
        published: null,
      }));
    }
    return EXERCISE_GUIDES.map((e) => ({
      key: e.id,
      title: pickText(e.title, language),
      category: e.category,
      published: null,
    }));
  }, [tab, language]);

  const th = 'px-4 py-3 text-start text-xs font-extrabold uppercase tracking-wider text-[#6B7A75]';
  const td = 'px-4 py-3 text-sm text-[#2E3835]';

  return (
    <div className="rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 rounded-full bg-[#F4F1EB] p-1">
          {TABS.map((tb) => (
            <button
              key={tb}
              type="button"
              onClick={() => setTab(tb)}
              className={`rounded-full px-4 py-1.5 text-xs font-extrabold transition-colors ${
                tab === tb ? 'bg-[#0F4C3A] text-[#FDFBF7]' : 'text-[#6B7A75] hover:text-[#0F4C3A]'
              }`}
            >
              {t(`admin.content.tabs.${tb}` as keyof typeof import('../../i18n/translations').translations.en)}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setDraft('');
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#D4AF37] text-[#0F4C3A] px-4 py-2 text-xs font-extrabold shadow-[0_8px_20px_rgba(212,175,55,0.35)] hover:bg-[#c9a12f] transition-colors"
        >
          <Plus size={15} strokeWidth={2.5} /> {t('admin.content.addNew')}
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 py-10 text-center text-sm font-semibold text-[#6B7A75]">{t('admin.content.empty')}</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-[#EFEBE4]">
          <table className="w-full min-w-[520px] border-collapse">
            <thead className="bg-[#F4F1EB]">
              <tr>
                <th className={th}>{t('admin.content.table.title')}</th>
                <th className={th}>{t('admin.content.table.category')}</th>
                <th className={th}>{t('admin.content.table.published')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className="border-t border-[#EFEBE4] hover:bg-[#FDFBF7] transition-colors">
                  <td className={`${td} font-bold text-[#0F4C3A]`}>{r.title}</td>
                  <td className={`${td} text-[#6B7A75]`}>
                    <span className="inline-block rounded-full bg-[#F4F1EB] px-2.5 py-0.5 text-xs font-bold text-[#0F4C3A]">
                      {r.category}
                    </span>
                  </td>
                  <td className={`${td} text-[#6B7A75]`}>{r.published ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
            <h3 className="text-lg font-extrabold text-[#0F4C3A]">{t('admin.content.modalTitle')}</h3>
            <p className="mt-2 text-sm font-semibold text-[#6B7A75]">{t('admin.content.modalBody')}</p>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t('admin.content.table.title')}
              className="mt-4 w-full rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] px-3 py-2.5 text-sm font-semibold text-[#0F4C3A] placeholder-[#94A3B8] outline-none focus:border-[#D4AF37]"
            />
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-xl border border-[#EFEBE4] px-4 py-2.5 text-sm font-extrabold text-[#6B7A75] hover:bg-[#F4F1EB] transition-colors"
              >
                {t('pmCancel')}
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-xl bg-[#0F4C3A] text-[#FDFBF7] px-4 py-2.5 text-sm font-extrabold hover:bg-[#0B3A2B] transition-colors"
              >
                {t('admin.content.addNew')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManager;