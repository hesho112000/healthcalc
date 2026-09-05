import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface StartFreeDropdownProps {
  buttonClassName?: string;
  menuClassName?: string;
}

const StartFreeDropdown: React.FC<StartFreeDropdownProps> = ({ buttonClassName, menuClassName }) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const items: { path: string; icon: string; label: string }[] = [
    { path: '/fitness', icon: '📊', label: t('ddFitness') },
    { path: '/weight-loss', icon: '⚖️', label: t('ddWeight') },
    { path: '/premium', icon: '🏥', label: t('ddAdvancedCare') },
    { path: '/diabetes', icon: '🩸', label: t('ddDiabetesCare') },
    { path: '/premium', icon: '❤️', label: t('ddHypertensionCare') },
    { path: '/premium', icon: '🧪', label: t('ddCholesterolCare') },
    { path: '/premium', icon: '🦶', label: t('ddGoutCare') },
    { path: '/premium', icon: '🌀', label: t('ddIbsCare') },
    { path: '/premium', icon: '🫀', label: t('ddLiverCare') },
    { path: '/premium', icon: '🫘', label: t('ddKidneyCare') },
    { path: '/premium', icon: '🦋', label: t('ddThyroidCare') },
    { path: '/smartwatch-sync', icon: '⌚', label: t('ddSmartwatch') },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className={buttonClassName || 'btn-primary hero-cta'}
      >
        {t('heroCTA')}
        <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-2 min-w-[280px] max-h-[70vh] overflow-y-auto z-[100] animate-fade-in w-[calc(100vw-2.5rem)] sm:w-auto left-1/2 -translate-x-1/2 sm:translate-x-0 ${dir === 'rtl' ? 'sm:left-0 sm:right-auto' : 'sm:right-0 sm:left-auto'} ${menuClassName || ''}`}
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleSelect(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartFreeDropdown;