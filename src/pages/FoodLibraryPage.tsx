import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabaseClient as supabase } from '../lib/supabaseClient';
import DishCard, { isValidDish, type Dish } from '../components/food/DishCard';

const PAGE_SIZE = 50;
const TABLE = 'dishes';
const SELECT_COLUMNS = 'id,name_en,name_ar,name_fr,name_es,name_de,cal_100,protein,carbs,fat,region,meal_type';

export default function FoodLibraryPage() {
  const { i18n } = useTranslation();
  const locale = (i18n.language || 'en').split('-')[0];

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const fetchPage = useCallback(
    async (pageIndex: number, q: string, append: boolean) => {
      const myId = ++requestIdRef.current;
      setLoading(true);
      setError(null);
      try {
        if (!supabase) throw new Error('Supabase client is not configured');

        let builder = supabase
          .from(TABLE)
          .select(SELECT_COLUMNS, { count: 'exact' })
          .order('id', { ascending: true })
          .range(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE - 1);

        if (q) {
          const like = `%${q.replace(/[%_]/g, (m) => `\\${m}`)}%`;
          builder = builder.or(
            [
              `name_en.ilike.${like}`,
              `name_ar.ilike.${like}`,
              `name_fr.ilike.${like}`,
              `name_es.ilike.${like}`,
              `name_de.ilike.${like}`,
            ].join(','),
          );
        }

        const { data, error: sbError, count } = await builder;
        if (sbError) throw sbError;
        if (myId !== requestIdRef.current) return;

        const rows = (data ?? []) as Dish[];
        const cleaned = rows.filter((d) => isValidDish(d, locale));

        setTotal(count ?? 0);
        setDishes((prev) => (append ? [...prev, ...cleaned] : cleaned));
        setHasMore(rows.length === PAGE_SIZE);
      } catch (e: unknown) {
        if (myId === requestIdRef.current) {
          setError(e instanceof Error ? e.message : 'Failed to load dishes');
        }
      } finally {
        if (myId === requestIdRef.current) setLoading(false);
      }
    },
    [locale],
  );

  useEffect(() => {
    setPage(0);
    void fetchPage(0, debouncedQuery, false);
  }, [debouncedQuery, locale, fetchPage]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    void fetchPage(next, debouncedQuery, true);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-16 pt-8 bg-slate-50/50">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Food Library</h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse {total.toLocaleString()} dishes with full macro breakdown.
        </p>
      </header>

      <div className="mb-8 sticky top-4 z-10">
        <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-sm backdrop-blur-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes (e.g. koshari, tea)..."
            className="w-full rounded-xl bg-slate-100/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            aria-label="Search dishes"
          />
        </div>
      </div>

      {error && (
        <div role="alert" className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
          <button onClick={() => void fetchPage(page, debouncedQuery, page > 0)} className="ml-3 underline underline-offset-2 hover:text-rose-900">
            Retry
          </button>
        </div>
      )}

      {loading && dishes.length === 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          ))}
        </div>
      ) : dishes.length === 0 && !error ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          No dishes match your search.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dishes.map((d) => (
              <DishCard key={d.id} dish={d} locale={locale} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
              >
                {loading ? 'Loading…' : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
