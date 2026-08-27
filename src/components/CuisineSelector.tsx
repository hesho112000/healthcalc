import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CUISINE_GROUPS, CUISINE_FLAGS, type Cuisine } from '../utils/cuisineCatalog';

interface CuisineSelectorProps {
  selected: Cuisine;
  onChange: (cuisine: Cuisine) => void;
  className?: string;
}

const CuisineSelector: React.FC<CuisineSelectorProps> = ({ selected, onChange, className = '' }) => {
  const { language } = useLanguage();
  return (
    <div className={`space-y-4 ${className}`}>
      {CUISINE_GROUPS.map((group) => (
        <div key={group.region}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">{group.region}</span>
            <span className="text-[11px] font-semibold text-gray-300" dir="rtl">{group.regionAr}</span>
            <span className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => {
              const isActive = selected === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {CUISINE_FLAGS[item.id]} {language === 'ar' ? item.nameAr : item.nameEn}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CuisineSelector;