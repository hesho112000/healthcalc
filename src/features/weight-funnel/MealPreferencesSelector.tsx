import React, { useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

export type ProteinSource = 'chicken' | 'eggs' | 'red_meat' | 'fish' | 'tuna' | 'turkey';
export type DietStyle = 'vegetarian' | 'high_protein' | 'low_carb' | 'vegan' | 'keto';
export type ExcludePref = 'nuts' | 'dairy' | 'gluten' | 'seafood';

type TKey = keyof typeof translations.en;

interface ProteinItem { id: ProteinSource; emoji: string; labelKey: TKey; animal: boolean }
interface StyleItem { id: DietStyle; emoji: string; labelKey: TKey }
interface ExcludeItem { id: ExcludePref; emoji: string; labelKey: TKey }

const PROTEINS: ProteinItem[] = [
  { id: 'chicken', emoji: '🍗', labelKey: 'wlfSrcChicken', animal: true },
  { id: 'eggs', emoji: '🥚', labelKey: 'wlfSrcEggs', animal: true },
  { id: 'red_meat', emoji: '🥩', labelKey: 'wlfSrcRedMeat', animal: true },
  { id: 'fish', emoji: '🐟', labelKey: 'wlfSrcFish', animal: true },
  { id: 'tuna', emoji: '🐠', labelKey: 'wlfSrcTuna', animal: true },
  { id: 'turkey', emoji: '🦃', labelKey: 'wlfSrcTurkey', animal: true },
];

const STYLES: StyleItem[] = [
  { id: 'vegetarian', emoji: '🥦', labelKey: 'wlfStyleVeg' },
  { id: 'vegan', emoji: '🌱', labelKey: 'wlfStyleVegan' },
  { id: 'high_protein', emoji: '💪', labelKey: 'wlfStyleHighProtein' },
  { id: 'low_carb', emoji: '🥑', labelKey: 'wlfStyleLowCarb' },
  { id: 'keto', emoji: '🍖', labelKey: 'wlfStyleKeto' },
];

const EXCLUDES: ExcludeItem[] = [
  { id: 'nuts', emoji: '🥜', labelKey: 'wlfExcNuts' },
  { id: 'dairy', emoji: '🥛', labelKey: 'wlfExcDairy' },
  { id: 'gluten', emoji: '🌾', labelKey: 'wlfExcGluten' },
  { id: 'seafood', emoji: '🐙', labelKey: 'wlfExcSeafood' },
];

const MEAT_PROTEINS = new Set<ProteinSource>(['chicken', 'red_meat', 'fish', 'tuna']);
const ALL_ANIMAL = new Set<ProteinSource>(['chicken', 'eggs', 'red_meat', 'fish', 'tuna', 'turkey']);

const STYLE_CONFLICTS: Record<DietStyle, DietStyle[]> = {
  vegetarian: [],
  vegan: [],
  high_protein: ['low_carb', 'keto'],
  low_carb: ['high_protein'],
  keto: ['high_protein'],
};

interface MealPreferencesSelectorProps {
  selectedProteins: ProteinSource[];
  onProteinsChange: (proteins: ProteinSource[]) => void;
  selectedStyle: DietStyle[];
  onStyleChange: (style: DietStyle[]) => void;
  selectedExcludes: ExcludePref[];
  onExcludesChange: (excludes: ExcludePref[]) => void;
}

const MealPreferencesSelector: React.FC<MealPreferencesSelectorProps> = ({
  selectedProteins,
  onProteinsChange,
  selectedStyle,
  onStyleChange,
  selectedExcludes,
  onExcludesChange,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ proteins: true, styles: true, excludes: true });
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  };

  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    const match = (label: string) => q === '' || label.toLowerCase().includes(q);
    const proteins = PROTEINS.filter((p) => match(t(p.labelKey)));
    const styles = STYLES.filter((s) => match(t(s.labelKey)));
    const excludes = EXCLUDES.filter((e) => match(t(e.labelKey)));
    if (q !== '') {
      if (proteins.length) openGroups['proteins'] = true;
      if (styles.length) openGroups['styles'] = true;
      if (excludes.length) openGroups['excludes'] = true;
    }
    return { proteins, styles, excludes, hasProteins: proteins.length > 0, hasStyles: styles.length > 0, hasExcludes: excludes.length > 0 };
  }, [q, t]);

  const toggle = <T,>(list: T[], onChange: (n: T[]) => void, id: T) => {
    onChange(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const removeFrom = <T,>(list: T[], onChange: (n: T[]) => void, items: T[]) => {
    const removed = items.filter((x) => list.includes(x));
    if (removed.length) onChange(list.filter((x) => !items.includes(x)));
    return removed;
  };

  const toggleStyle = (style: DietStyle) => {
    if (selectedStyle.includes(style)) {
      onStyleChange(selectedStyle.filter((s) => s !== style));
      return;
    }
    const conflict = (STYLE_CONFLICTS[style] || []).find((c) => selectedStyle.includes(c));
    if (conflict) {
      showToast(t('wlfCannotCombine').replace('{a}', t(style === 'high_protein' ? 'wlfStyleHighProtein' : style === 'low_carb' ? 'wlfStyleLowCarb' : 'wlfStyleKeto')).replace('{b}', t(conflict === 'high_protein' ? 'wlfStyleHighProtein' : conflict === 'low_carb' ? 'wlfStyleLowCarb' : 'wlfStyleKeto')));
      return;
    }
    if (style === 'vegetarian') {
      const removed = removeFrom(selectedProteins, onProteinsChange, [...MEAT_PROTEINS] as unknown as ProteinSource[]);
      if (removed.length) showToast(t('wlfCannotCombine').replace('{a}', t('wlfStyleVeg')).replace('{b}', t(styledName(removed[0]))));
    }
    if (style === 'vegan') {
      const removed = removeFrom(selectedProteins, onProteinsChange, [...ALL_ANIMAL] as unknown as ProteinSource[]);
      removeFrom(selectedExcludes, onExcludesChange, ['dairy'] as ExcludePref[]);
      if (removed.length) showToast(t('wlfCannotCombine').replace('{a}', t('wlfStyleVegan')).replace('{b}', t(styledName(removed[0]))));
    }
    onStyleChange([...selectedStyle, style]);
  };

  const styledName = (p: ProteinSource) =>
    p === 'chicken' ? 'wlfSrcChicken' : p === 'eggs' ? 'wlfSrcEggs' : p === 'red_meat' ? 'wlfSrcRedMeat' : p === 'fish' ? 'wlfSrcFish' : p === 'tuna' ? 'wlfSrcTuna' : 'wlfSrcTurkey';

  const chip = (emoji: string, label: string, active: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg border transition-all ${
        active ? 'border-[#0F4C3A] bg-[#EAF2EE]' : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
        <span className="text-base leading-none">{emoji}</span>
        {label}
      </span>
      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
        active ? 'bg-[#0F4C3A] text-white' : 'border-2 border-gray-300 text-transparent'
      }`}>✓</span>
    </button>
  );

  const group = (title: string, sub: string, render: () => React.ReactNode, key: string, hasItems: boolean) => (
    <div className="border border-gray-200 rounded-xl">
      <button
        type="button"
        onClick={() => setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))}
        className="w-full flex items-center justify-between px-3 py-2.5"
      >
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">{title}</span>
        </span>
        <span className="text-xs text-gray-400">{sub}{' '}<span className={`inline-block transition-transform ${openGroups[key] ? 'rotate-180' : ''}`}>▾</span></span>
      </button>
      {openGroups[key] && hasItems && (
        <div className="px-2 pb-2 space-y-0.5">
          {render()}
        </div>
      )}
      {openGroups[key] && !hasItems && (
        <p className="px-3 pb-2 text-xs text-gray-400">{t('wlfSearchEmpty')}</p>
      )}
    </div>
  );

  return (
    <div>
      <h4 className="font-semibold text-gray-900">🍽️ {t('wlfMealPrefTitle')}</h4>
      <p className="text-sm text-gray-500">{t('wlfMealPrefSub')}</p>
      <div className="mt-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('wlfSearchFoods')}
          className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
        />
      </div>
      <div className="mt-3 h-80 overflow-y-auto border border-gray-200 rounded-xl p-2 space-y-2 scrollbar-thin">
        {group(`${t('wlfSourcesTitle')} ${'🥚'}`, '', () => (
          <div className="space-y-0.5">
            {visible.proteins.map((p) => chip(p.emoji, t(p.labelKey), selectedProteins.includes(p.id), () => toggle(selectedProteins, onProteinsChange, p.id)))}
          </div>
        ), 'proteins', visible.hasProteins)}
        {group(`${t('wlfStyleTitle')} ${'🥗'}`, '', () => (
          <div className="space-y-0.5">
            {visible.styles.map((s) => chip(s.emoji, t(s.labelKey), selectedStyle.includes(s.id), () => toggleStyle(s.id)))}
          </div>
        ), 'styles', visible.hasStyles)}
        {group(`${t('wlfExcludeTitle')} ${'🚫'}`, '', () => (
          <div className="space-y-0.5">
            {visible.excludes.map((e) => chip(e.emoji, t(e.labelKey), selectedExcludes.includes(e.id), () => toggle(selectedExcludes, onExcludesChange, e.id)))}
          </div>
        ), 'excludes', visible.hasExcludes)}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
};

export default MealPreferencesSelector;