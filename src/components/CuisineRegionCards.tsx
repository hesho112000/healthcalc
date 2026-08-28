import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CUISINE_GROUPS, CUISINE_FLAGS, type Cuisine } from '../utils/cuisineCatalog';

const DEFAULT_CUISINE = 'egyptian';

const REGION_META: Array<{ icon: string; accent: string }> = [
  { icon: '🕌', accent: 'border-t-emerald-400' },
  { icon: '🌍', accent: 'border-t-amber-400' },
  { icon: '🥢', accent: 'border-t-rose-400' },
  { icon: '🏰', accent: 'border-t-blue-400' },
  { icon: '🗽', accent: 'border-t-indigo-400' },
  { icon: '🏜️', accent: 'border-t-orange-400' },
  { icon: '🦘', accent: 'border-t-green-400' },
  { icon: '🧆', accent: 'border-t-teal-400' },
  { icon: '🌍', accent: 'border-t-lime-400' },
  { icon: '🥗', accent: 'border-t-purple-400' },
];

export interface CuisineRegionCardsProps {
  selected: Cuisine;
  onChange: (cuisine: Cuisine) => void;
  onClear?: (cuisine: Cuisine) => void;
  className?: string;
}

const CuisineRegionCards: React.FC<CuisineRegionCardsProps> = ({ selected, onChange, onClear, className = '' }) => {
  const { language } = useLanguage();

  const regions = useMemo(() => CUISINE_GROUPS.map((group, idx) => ({
    nameEn: group.region,
    nameAr: group.regionAr,
    icon: REGION_META[idx % REGION_META.length].icon,
    accent: REGION_META[idx % REGION_META.length].accent,
    cuisines: group.items.map((item) => ({
      id: item.id,
      nameEn: item.nameEn,
      nameAr: item.nameAr,
      flag: CUISINE_FLAGS[item.id] || '🍽️',
    })),
  })), []);

  const selectedName = useMemo(() => {
    for (const region of regions) {
      const found = region.cuisines.find((c) => c.id === selected);
      if (found) return { ...found, regionNameAr: region.nameAr };
    }
    return null;
  }, [regions, selected]);

  const handleClear = () => {
    if (onClear) onClear(DEFAULT_CUISINE);
    else onChange(DEFAULT_CUISINE);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {language === 'ar' ? 'المطبخ المحدد' : 'Selected'}
          </span>
          {selectedName ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold">
              <span>{selectedName.flag}</span>
              <span>{language === 'ar' ? selectedName.nameAr : selectedName.nameEn}</span>
            </span>
          ) : (
            <span className="text-xs text-gray-400">{language === 'ar' ? 'لم يتم الاختيار' : 'None'}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 transition-all cursor-pointer"
        >
          ✕ <span>{language === 'ar' ? 'مسح' : 'Clear'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regions.map((region) => (
          <div key={region.nameEn} className={`bg-white rounded-xl border border-t-4 border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow ${region.accent}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg leading-none">{region.icon}</span>
              <span className="text-sm font-extrabold text-gray-800">{language === 'ar' ? region.nameAr : region.nameEn}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {region.cuisines.map((c) => {
                const active = selected === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onChange(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {c.flag} {language === 'ar' ? c.nameAr : c.nameEn}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuisineRegionCards;