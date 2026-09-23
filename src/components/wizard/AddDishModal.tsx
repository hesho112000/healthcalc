import React, { useEffect, useMemo, useState } from 'react';
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

const AddDishModal: React.FC<AddDishModalProps> = ({ open, mode, mealLabel, pool, currentDish, language, onClose, onSelect }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

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
      className="no-print fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-end md:items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] bg-white rounded-t-[20px] md:rounded-[20px] p-5 shadow-xl relative max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0">
            <h3 className="text-[17px] font-extrabold truncate">
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
            aria-label="close"
            className="w-8 h-8 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-[#F4F1EB] text-[16px] shrink-0 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 h-[44px] bg-[#F4F1EB] rounded-[14px] flex items-center px-4 border-2 border-transparent focus-within:border-[#D4AF37] shrink-0">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث في الأطباق…' : 'Search dishes…'}
            className="flex-1 bg-transparent outline-none text-[14px] text-[#0F4C3A] placeholder:text-[#A0A8A4] min-w-0"
          />
          <span className="text-[#0F4C3A] text-[16px] shrink-0">🔍</span>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-2 min-h-[160px] max-h-[52vh]">
          {filtered.length ? (
            filtered.map((d) => {
              const isCurrent = isSwap && currentDish ? d.name === currentDish.name : false;
              return (
                <button
                  key={d.name}
                  type="button"
                  disabled={isCurrent}
                  onClick={() => onSelect(d)}
                  className={`w-full flex items-center gap-3 p-3 rounded-[16px] border-2 text-start transition-all min-w-0 ${
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