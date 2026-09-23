import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { KitchenDish } from '../../data/kitchens';
import type { PlanMealType } from '../../utils/mealPlanGenerator';

interface AddDishModalProps {
  open: boolean;
  mode: 'add' | 'swap';
  mealType: PlanMealType;
  mealLabel: string;
  pool: KitchenDish[];
  currentDish?: { calories: number; name: string } | null;
  language: 'ar' | 'en' | string;
  onClose: () => void;
  onSelect: (dish: KitchenDish) => void;
}

const haptic = (ms = 8) => {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms);
  } catch {
    /* ignore */
  }
};

const AddDishModal: React.FC<AddDishModalProps> = ({ open, mode, mealLabel, pool, currentDish, language, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setLoading(true);
      const t = window.setTimeout(() => setLoading(false), 340);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const prev = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('input, button, [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey, true);
      prev?.focus?.();
    };
  }, [open, onClose]);

  const isSwap = mode === 'swap';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = pool.filter((d) => !q || d.name.toLowerCase().includes(q));
    if (isSwap && currentDish) {
      const lo = currentDish.calories * 0.8;
      const hi = currentDish.calories * 1.2;
      list = list.filter((d) => d.cal_serv >= lo && d.cal_serv <= hi);
    }
    return list;
  }, [pool, query, isSwap, currentDish]);

  if (!open) return null;

  const minC = isSwap && currentDish ? Math.round(currentDish.calories * 0.8) : 0;
  const maxC = isSwap && currentDish ? Math.round(currentDish.calories * 1.2) : 0;

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-end md:items-center justify-center overlay-fade"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-dish-modal-title"
        className="w-full max-w-[560px] bg-white rounded-t-[20px] md:rounded-[20px] px-5 pb-5 pt-1.5 shadow-xl relative max-h-[85vh] flex flex-col sheet-up"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto w-10 h-1 rounded-full bg-[#E3E0D8] mb-2 shrink-0 md:hidden" aria-hidden="true" />
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0">
            <h3 id="add-dish-modal-title" className="text-[17px] font-extrabold truncate">
              {isSwap ? '🔄' : '➕'}{' '}
              {language === 'ar'
                ? isSwap
                  ? `بدّل طبق في ${mealLabel}`
                  : `إضافة طبق إلى ${mealLabel}`
                : isSwap
                  ? `Swap dish in ${mealLabel}`
                  : `Add dish to ${mealLabel}`}
            </h3>
            {isSwap && currentDish ? (
              <p className="text-[11.5px] text-[#8A938E] mt-0.5 leading-snug">
                {language === 'ar'
                  ? `البديل يطابق ±20% من السعرات الحالية (${minC}–${maxC} kcal)`
                  : `Alternatives match ±20% of current calories (${minC}–${maxC} kcal)`}
              </p>
            ) : (
              <p className="text-[11.5px] text-[#8A938E] mt-0.5">
                {language === 'ar' ? 'اختر طبقاً من مطبخك' : 'Pick a dish from your cuisine'}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
            className="w-8 h-8 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-[#F4F1EB] text-[16px] shrink-0 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 h-[44px] bg-[#F4F1EB] rounded-[14px] flex items-center px-4 border-2 border-transparent focus-within:border-[#D4AF37] shrink-0">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث في الأطباق…' : 'Search dishes…'}
            aria-label={language === 'ar' ? 'ابحث في الأطباق' : 'Search dishes'}
            className="flex-1 bg-transparent outline-none text-[14px] text-[#0F4C3A] placeholder:text-[#A0A8A4] min-w-0"
          />
          <span className="text-[#0F4C3A] text-[16px] shrink-0">🔍</span>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-2 min-h-[160px] max-h-[52vh]">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-11 h-11 rounded-[12px] skeleton-row shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-3.5 w-3/5 rounded-md skeleton-row" />
                  <div className="h-2.5 w-2/5 rounded-md skeleton-row mt-2" />
                </div>
                <div className="h-4 w-14 rounded-md skeleton-row shrink-0" />
              </div>
            ))
          ) : filtered.length ? (
            filtered.map((d) => {
              const isCurrent = isSwap && currentDish ? d.name === currentDish.name : false;
              return (
                <button
                  key={d.name}
                  type="button"
                  disabled={isCurrent}
                  onClick={() => {
                    if (isCurrent) return;
                    haptic();
                    onSelect(d);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-[16px] border-2 text-start transition-all min-w-0 dish-enter ${
                    isCurrent
                      ? 'border-[#D4AF37] bg-[#FFFBEF] cursor-default'
                      : 'border-[#EFEBE4] bg-white hover:border-[#D4AF37] active:scale-[0.99]'
                  }`}
                >
                  <span className="w-11 h-11 rounded-[12px] bg-[#F4F1EB] flex items-center justify-center text-[20px] shrink-0">🍲</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-[13px] text-[#0F4C3A] truncate">{d.name}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold bg-[#D4AF37] text-[#0F4C3A] px-2 py-0.5 rounded-full shrink-0">
                          {language === 'ar' ? 'الحالي' : 'Current'}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#8A938E] mt-0.5">
                      {Math.round(d.serv_g)} g · {Math.round(d.p)}P / {Math.round(d.c)}C / {Math.round(d.f)}F
                    </div>
                  </div>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="num text-[13px] font-extrabold text-[#B8860B] whitespace-nowrap">{Math.round(d.cal_serv)} kcal</span>
                    {!isCurrent && (
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[15px] text-white shadow-sm ${
                          isSwap ? 'bg-[#0F4C3A]' : 'bg-[#D4AF37]'
                        }`}
                      >
                        {isSwap ? '🔄' : '+'}
                      </span>
                    )}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="text-center text-[13px] text-[#A0A8A4] py-8">{language === 'ar' ? 'لا توجد نتائج' : 'No results'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDishModal;