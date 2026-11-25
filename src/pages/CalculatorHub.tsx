import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Check,
  Dumbbell,
  Flame,
  Footprints,
  HeartPulse,
  Loader2,
  Percent,
  PieChart,
  Ruler,
  Scale,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../types';
import type { TranslationKeys } from '../i18n/translationTypes';
import SEO from '../components/seo/SEO';
import { RECIPES, lt as recipeLt } from '../data/recipes';
import { ARTICLES, lt as articleLt } from '../data/articles';
import './CalculatorHub.css';

type CalculatorTab = 'bmi' | 'bmr' | 'calories' | 'body-fat' | 'ideal-weight' | 'macros';
type UnitSystem = 'metric' | 'imperial';
type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
type Goal = 'lose' | 'maintain' | 'gain';
type BmrFormula = 'mifflin' | 'harris' | 'katch';

interface Profile {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  waistCm: number;
  neckCm: number;
  hipCm: number;
  bodyFatOverride: number | null;
  activity: ActivityLevel;
  goal: Goal;
}

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

const ACTIVITY_ICONS: Record<ActivityLevel, LucideIcon> = {
  sedentary: Scale,
  light: Footprints,
  moderate: Activity,
  very: Dumbbell,
  extra: Zap,
};

const TABS: Array<{ id: CalculatorTab; icon: LucideIcon; labelKey: keyof TranslationKeys }> = [
  { id: 'bmi', icon: Activity, labelKey: 'calculator.nav.bmi' },
  { id: 'bmr', icon: Flame, labelKey: 'calculator.nav.bmr' },
  { id: 'calories', icon: Zap, labelKey: 'calculator.nav.calories' },
  { id: 'body-fat', icon: Percent, labelKey: 'calculator.nav.bodyFat' },
  { id: 'ideal-weight', icon: Scale, labelKey: 'calculator.nav.idealWeight' },
  { id: 'macros', icon: PieChart, labelKey: 'calculator.nav.macros' },
];

const VALID_TABS = new Set<CalculatorTab>(TABS.map(({ id }) => id));
const toNumber = (value: string): number => Number.parseFloat(value) || 0;
const round = (value: number, digits = 0): number => {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
};

const bmiFor = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return heightM > 0 ? weightKg / (heightM * heightM) : 0;
};

const bodyFatFromBmi = (gender: Gender, bmi: number, age: number): number =>
  gender === 'male' ? 1.2 * bmi + 0.23 * age - 16.2 : 1.2 * bmi + 0.23 * age - 5.4;

const navyBodyFat = (profile: Profile): number | null => {
  const heightIn = profile.heightCm / 2.54;
  const waistIn = profile.waistCm / 2.54;
  const neckIn = profile.neckCm / 2.54;
  const hipIn = profile.hipCm / 2.54;
  if (heightIn <= 0 || waistIn <= neckIn || neckIn <= 0) return null;
  if (profile.gender === 'male') {
    return 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
  }
  if (waistIn + hipIn <= neckIn || hipIn <= 0) return null;
  return 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
};

const initialProfile: Profile = {
  age: 45,
  gender: 'male',
  heightCm: 189,
  weightKg: 100,
  waistCm: 102,
  neckCm: 35.2,
  hipCm: 100,
  bodyFatOverride: null,
  activity: 'moderate',
  goal: 'lose',
};

const readTab = (value: string | null): CalculatorTab =>
  value && VALID_TABS.has(value as CalculatorTab) ? (value as CalculatorTab) : 'bmi';

interface RangeFieldProps {
  id: string;
  label: string;
  value: number;
  displayValue: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onNumberChange: (value: number) => void;
  onRangeChange: (value: number) => void;
  rangeMin?: number;
  rangeMax?: number;
  rangeStep?: number;
}

const RangeField: React.FC<RangeFieldProps> = ({
  id,
  label,
  value,
  displayValue,
  min,
  max,
  step = 1,
  unit,
  onNumberChange,
  onRangeChange,
  rangeMin,
  rangeMax,
  rangeStep,
}) => (
  <div className="calc-input-group">
    <div className="calc-input-heading">
      <label className="calc-label" htmlFor={`calc-${id}`}>{label}</label>
      <div className="calc-number-wrap">
        <input
          id={`calc-${id}`}
          aria-label={label}
          className="calc-number-input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(displayValue) ? displayValue : ''}
          onChange={(event) => onNumberChange(toNumber(event.target.value))}
        />
        <span className="calc-unit">{unit}</span>
      </div>
    </div>
    <input
      aria-label={label}
      className="calc-range"
      type="range"
      min={rangeMin ?? min}
      max={rangeMax ?? max}
      step={rangeStep ?? step}
      value={value}
      onChange={(event) => onRangeChange(toNumber(event.target.value))}
    />
    <div className="calc-range-ends" aria-hidden="true">
      <span>{rangeMin ?? min}</span>
      <span>{rangeMax ?? max}</span>
    </div>
  </div>
);

const HeightField: React.FC<{
  label: string;
  valueCm: number;
  unit: UnitSystem;
  onChange: (heightCm: number) => void;
  t: (key: keyof TranslationKeys) => string;
}> = ({ label, valueCm, unit, onChange, t }) => {
  const totalInches = valueCm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = round(totalInches - feet * 12, 1);
  const updateImperial = (nextFeet: number, nextInches: number) =>
    onChange((nextFeet * 12 + nextInches) * 2.54);

  return (
    <div className="calc-input-group">
      <div className="calc-input-heading">
        <label className="calc-label" htmlFor={unit === 'metric' ? 'calc-height-cm' : 'calc-height-ft'}>
          {label}
        </label>
        {unit === 'metric' ? (
          <span className="calc-number-wrap">
            <input
              id="calc-height-cm"
              aria-label={label}
              className="calc-number-input"
              type="number"
              min="130"
              max="220"
              step="1"
              value={round(valueCm, 0)}
              onChange={(event) => onChange(toNumber(event.target.value))}
            />
            <span className="calc-unit">{t('calculator.units.cm')}</span>
          </span>
        ) : (
          <div className="flex gap-2">
            <span className="calc-number-wrap min-w-0 px-2">
              <input
                id="calc-height-ft"
                aria-label={`${label} ${t('calculator.units.ft')}`}
                className="calc-number-input w-10"
                type="number"
                min="4"
                max="7"
                step="1"
                value={feet}
                onChange={(event) => updateImperial(toNumber(event.target.value), inches)}
              />
              <span className="calc-unit">{t('calculator.units.ft')}</span>
            </span>
            <span className="calc-number-wrap min-w-0 px-2">
              <input
                aria-label={`${label} ${t('calculator.units.in')}`}
                className="calc-number-input w-10"
                type="number"
                min="0"
                max="11.9"
                step="0.1"
                value={inches}
                onChange={(event) => updateImperial(feet, toNumber(event.target.value))}
              />
              <span className="calc-unit">{t('calculator.units.in')}</span>
            </span>
          </div>
        )}
      </div>
      <input
        aria-label={label}
        className="calc-range"
        type="range"
        min="130"
        max="220"
        step="1"
        value={valueCm}
        onChange={(event) => onChange(toNumber(event.target.value))}
      />
      <div className="calc-range-ends" aria-hidden="true">
        <span>130 {t('calculator.units.cm')}</span>
        <span>220 {t('calculator.units.cm')}</span>
      </div>
    </div>
  );
};

const CalculatorHub: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = readTab(searchParams.get('tab'));
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [formula, setFormula] = useState<BmrFormula>('mifflin');
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [highlightResults, setHighlightResults] = useState(false);
  const [animationRun, setAnimationRun] = useState(0);
  const [animatedCalories, setAnimatedCalories] = useState(0);
  const resultsRef = useRef<HTMLElement | null>(null);
  const highlightTimer = useRef<number | null>(null);
  const localeByLanguage: Record<Language, string> = {
    en: 'en-US', ar: 'ar-EG', fr: 'fr-FR', es: 'es-ES', hi: 'hi-IN', de: 'de-DE',
  };
  const format = (value: number, digits = 0): string =>
    value.toLocaleString(localeByLanguage[language], {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });

  const metrics = useMemo(() => {
    const bmi = bmiFor(profile.weightKg, profile.heightCm);
    const heightM = profile.heightCm / 100;
    const heightIn = profile.heightCm / 2.54;
    const bmiFat = bodyFatFromBmi(profile.gender, round(bmi, 1), profile.age);
    const navyFat = navyBodyFat(profile);
    const bodyFat = profile.bodyFatOverride !== null ? profile.bodyFatOverride : navyFat ?? bmiFat;
    const mifflin = profile.gender === 'male'
      ? 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + 5
      : 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age - 161;
    const harris = profile.gender === 'male'
      ? 13.397 * profile.weightKg + 4.799 * profile.heightCm - 5.677 * profile.age + 88.362
      : 9.247 * profile.weightKg + 3.098 * profile.heightCm - 4.33 * profile.age + 447.593;
    const katchExact = 370 + 21.6 * (1 - bodyFat / 100) * profile.weightKg;
    const katch = Math.round(katchExact / 10) * 10;
    const rawBmr = formula === 'mifflin' ? mifflin : formula === 'harris' ? harris : katchExact;
    const bmr = formula === 'katch' ? katch : Math.round(rawBmr);
    const tdee = Math.round(rawBmr * ACTIVITY_FACTORS[profile.activity]);
    const activityCalories = {
      sedentary: Math.round(rawBmr * ACTIVITY_FACTORS.sedentary),
      light: Math.round(rawBmr * ACTIVITY_FACTORS.light),
      moderate: Math.round(rawBmr * ACTIVITY_FACTORS.moderate),
      very: Math.round(rawBmr * ACTIVITY_FACTORS.very),
      extra: Math.round(rawBmr * ACTIVITY_FACTORS.extra),
    };
    const lossCalories = Math.max(1200, tdee - 500);
    const targetCalories = profile.goal === 'lose' ? lossCalories : profile.goal === 'gain' ? tdee + 250 : tdee;
    const lowerHealthyWeight = 18.5 * heightM * heightM;
    const upperHealthyWeight = 25 * heightM * heightM;
    const inchesOverFiveFeet = heightIn - 60;
    const idealWeight = {
      hamwi: profile.gender === 'male' ? 48 + 2.7 * inchesOverFiveFeet : 45.5 + 2.2 * inchesOverFiveFeet,
      devine: profile.gender === 'male' ? 50 + 2.3 * inchesOverFiveFeet : 45.5 + 2.3 * inchesOverFiveFeet,
      robinson: profile.gender === 'male' ? 52 + 1.9 * inchesOverFiveFeet : 49 + 1.7 * inchesOverFiveFeet,
      miller: profile.gender === 'male' ? 56.2 + 1.41 * inchesOverFiveFeet : 53.1 + 1.36 * inchesOverFiveFeet,
    };
    const idealAverage = Object.values(idealWeight).reduce((sum, value) => sum + value, 0) / 4;
    const bmiPrime = bmi / 25;
    const ponderal = heightM > 0 ? profile.weightKg / heightM ** 3 : 0;
    const whr = profile.hipCm > 0 ? profile.waistCm / profile.hipCm : 0;
    const maxHr = 220 - profile.age;
    const macros = {
      protein: Math.round(targetCalories * 0.3 / 4),
      carbs: Math.round(targetCalories * 0.4 / 4),
      fat: Math.round(targetCalories * 0.3 / 9),
    };
    return {
      bmi: round(bmi, 1),
      bmiFat: round(bmiFat, 1),
      bodyFat: round(Math.max(0, Math.min(70, bodyFat)), 1),
      mifflin: Math.round(mifflin),
      harris: Math.round(harris),
      katch,
      bmr,
      tdee,
      activityCalories,
      maxHr,
      targetCalories,
      maintenance: tdee,
      mildLoss: Math.max(1200, tdee - 250),
      lossCalories,
      extremeLoss: Math.max(1200, tdee - 1000),
      healthyMin: round(lowerHealthyWeight, 1),
      healthyMax: round(upperHealthyWeight, 1),
      bmiPrime: round(bmiPrime, 2),
      ponderal: round(ponderal, 1),
      idealWeight: {
        hamwi: round(idealWeight.hamwi, 1),
        devine: round(idealWeight.devine, 1),
        robinson: round(idealWeight.robinson, 1),
        miller: round(idealWeight.miller, 1),
      },
      idealAverage: round(idealAverage, 1),
      whr: round(whr, 2),
      macros,
    };
  }, [formula, profile]);

  useEffect(() => {
    if (!hasCalculated) return;
    const start = performance.now();
    const duration = 600;
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedCalories(Math.round(metrics.targetCalories * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setAnimatedCalories(metrics.targetCalories);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [animationRun, hasCalculated, metrics.targetCalories]);

  useEffect(() => () => {
    if (highlightTimer.current !== null) window.clearTimeout(highlightTimer.current);
  }, []);

  const updateProfile = (patch: Partial<Profile>) => {
    setProfile((current) => ({ ...current, ...patch }));
    setIsDirty(true);
    setHasError(false);
  };

  const selectTab = (tab: CalculatorTab) => {
    setSearchParams(tab === 'bmi' ? {} : { tab }, { replace: true });
    if (hasCalculated) setIsDirty(true);
    requestAnimationFrame(() => {
      const targetIds: Record<CalculatorTab, string> = {
        bmi: 'calculator-bmi-results',
        bmr: 'calculator-bmr-formula',
        calories: 'calculator-calorie-targets',
        'body-fat': 'calculator-body-fat-results',
        'ideal-weight': 'calculator-ideal-weight-results',
        macros: 'calculator-macros-results',
      };
      const target = hasCalculated
        ? document.getElementById(targetIds[tab])
        : document.querySelector('.calculator-profile');
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleCalculate = (event?: React.FormEvent) => {
    event?.preventDefault();
    const valid = profile.age >= 14 && profile.age <= 80
      && profile.heightCm >= 130 && profile.heightCm <= 220
      && profile.weightKg >= 30 && profile.weightKg <= 200;
    if (!valid) {
      setHasError(true);
      window.setTimeout(() => setHasError(false), 650);
      return;
    }
    setIsCalculating(true);
    setHasCalculated(true);
    setIsDirty(false);
    setAnimationRun((run) => run + 1);
    setHighlightResults(true);
    if (highlightTimer.current !== null) window.clearTimeout(highlightTimer.current);
    highlightTimer.current = window.setTimeout(() => setHighlightResults(false), 2000);
    window.setTimeout(() => {
      setIsCalculating(false);
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);
  };

  const navigateToPlan = () => {
    navigate('/meal-plan', {
      state: {
        calories: metrics.targetCalories,
        bmr: metrics.bmr,
        tdee: metrics.tdee,
        bmi: metrics.bmi,
        bodyFat: metrics.bmiFat,
      },
    });
  };

  const weightDisplay = unit === 'metric' ? round(profile.weightKg, 1) : round(profile.weightKg * 2.20462, 1);
  const weightUnit = t(unit === 'metric' ? 'calculator.units.kg' : 'calculator.units.lb');
  const weightInput = (value: number) => updateProfile({ weightKg: unit === 'metric' ? value : value / 2.20462 });
  const calorieRows = [
    { key: 'maintenance', label: t('calculator.results.maintenance'), value: metrics.maintenance },
    { key: 'mild', label: t('calculator.results.mild'), value: metrics.mildLoss },
    { key: 'loss', label: t('calculator.results.loss'), value: metrics.lossCalories },
    { key: 'extreme', label: t('calculator.results.extreme'), value: metrics.extremeLoss },
  ];
  const profileIsValid = profile.age >= 14 && profile.age <= 80
    && profile.heightCm >= 130 && profile.heightCm <= 220
    && profile.weightKg >= 30 && profile.weightKg <= 200;
  const bmrFormulaOptions: Array<{ id: BmrFormula; key: keyof TranslationKeys; value: number }> = [
    { id: 'mifflin', key: 'calculator.formula.mifflin', value: metrics.mifflin },
    { id: 'harris', key: 'calculator.formula.harris', value: metrics.harris },
    { id: 'katch', key: 'calculator.formula.katch', value: metrics.katch },
  ];
  const tabLabel = t(TABS.find(({ id }) => id === activeTab)?.labelKey ?? 'calculator.nav.bmi');
  const bmiPercent = Math.max(0, Math.min(100, ((metrics.bmi - 14) / 26) * 100));
  const gaugeRotation = -120 + bmiPercent * 2.4;
  const macroTotal = metrics.macros.protein + metrics.macros.carbs + metrics.macros.fat;
  const languageDirection = dir;

  return (
    <div className="calculator-hub min-h-screen bg-slate-50 pb-16" dir={languageDirection}>
      <SEO title={t('calculator.seoTitle')} description={t('calculator.seoDescription')} url="/" />
      <div className="calculator-hub__inner mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
        <header className="calculator-hero mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-900">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>{t('calculator.hero.badge')}</span>
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl">
            {t('calculator.hero.titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              {t('calculator.hero.titleAccent')}
            </span>{' '}
            {t('calculator.hero.titleSuffix')}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {t('calculator.hero.subtitle')}
          </p>
        </header>

        <div className="calculator-layout grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <nav className="calculator-nav lg:sticky lg:top-24 lg:col-span-2" aria-label={t('calculator.results.title')}>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {TABS.map(({ id, icon: Icon, labelKey }) => {
                const selected = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-current={selected ? 'page' : undefined}
                    onClick={() => selectTab(id)}
                    className={`calc-nav-item inline-flex min-h-11 shrink-0 items-center gap-3 rounded-2xl px-3 py-3 text-start text-sm font-semibold transition-colors ${
                      selected ? 'bg-emerald-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span className="flex-1">{t(labelKey)}</span>
                    {hasCalculated && <Check size={15} aria-label={t('calculator.results.title')} />}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="space-y-6 lg:col-span-7">
            <form onSubmit={handleCalculate} className={`calculator-profile rounded-3xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8 ${hasError ? 'calculator-error-shake' : ''}`}>
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="calc-label">{tabLabel}</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{t('calculator.results.title')}</h2>
                </div>
                <div className="inline-flex rounded-full bg-slate-100 p-1" role="group" aria-label={t('calculator.units.metric')}>
                  {(['metric', 'imperial'] as const).map((system) => (
                    <button
                      key={system}
                      type="button"
                      aria-pressed={unit === system}
                      onClick={() => {
                        setUnit(system);
                        setIsDirty(true);
                      }}
                      className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${unit === system ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {t(`calculator.units.${system}` as keyof TranslationKeys)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                <RangeField
                  id="age"
                  label={t('calculator.input.age')}
                  value={profile.age}
                  displayValue={profile.age}
                  min={14}
                  max={80}
                  unit={t('calculator.units.years')}
                  onNumberChange={(age) => updateProfile({ age })}
                  onRangeChange={(age) => updateProfile({ age })}
                />
                <fieldset className="calc-input-group">
                  <legend className="calc-label mb-3">{t('calculator.input.gender')}</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(['female', 'male'] as const).map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        aria-pressed={profile.gender === gender}
                        onClick={() => updateProfile({ gender, bodyFatOverride: null })}
                        className={`min-h-11 rounded-xl border px-4 text-sm font-semibold transition-colors ${
                          profile.gender === gender ? 'border-emerald-900 bg-emerald-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        {t(`calculator.input.${gender === 'female' ? 'woman' : 'man'}` as keyof TranslationKeys)}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <HeightField
                  label={t('calculator.input.height')}
                  valueCm={profile.heightCm}
                  unit={unit}
                  t={t}
                  onChange={(heightCm) => updateProfile({ heightCm })}
                />
                <RangeField
                  id="weight"
                  label={t('calculator.input.weight')}
                  value={profile.weightKg}
                  displayValue={weightDisplay}
                  min={unit === 'metric' ? 30 : 66}
                  max={unit === 'metric' ? 200 : 441}
                  step={0.1}
                  rangeMin={30}
                  rangeMax={200}
                  rangeStep={1}
                  unit={weightUnit}
                  onNumberChange={weightInput}
                  onRangeChange={(weightKg) => updateProfile({ weightKg })}
                />
              </div>

              {activeTab === 'body-fat' && (
                <section className="mt-7 rounded-2xl border border-slate-100 bg-slate-50 p-4" aria-labelledby="body-fat-inputs-title">
                  <div className="mb-4 flex items-center gap-2">
                    <Ruler size={17} className="text-emerald-700" aria-hidden="true" />
                    <h3 id="body-fat-inputs-title" className="text-sm font-bold text-slate-800">{t('calculator.input.bodyFat')}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {([
                      ['waistCm', 'waist'],
                      ['neckCm', 'neck'],
                      ['hipCm', 'hip'],
                    ] as const).map(([field, label]) => (
                      <label key={field} className="calc-label">
                        {t(`calculator.input.${label}` as keyof TranslationKeys)}
                        <span className="mt-2 flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-3">
                          <input
                            aria-label={t(`calculator.input.${label}` as keyof TranslationKeys)}
                            type="number"
                            min="25"
                            max="200"
                            value={unit === 'metric' ? profile[field] : round(profile[field] / 2.54, 1)}
                            onChange={(event) => updateProfile({
                              [field]: unit === 'metric' ? toNumber(event.target.value) : toNumber(event.target.value) * 2.54,
                              bodyFatOverride: null,
                            })}
                            className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none"
                          />
                          <span className="ml-2 text-xs text-slate-400">{unit === 'metric' ? t('calculator.units.cm') : t('calculator.units.in')}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {formula === 'katch' && (
                    <label className="calc-label mt-4 block">
                      {t('calculator.input.bodyFat')}
                      <span className="mt-2 flex min-h-11 max-w-48 items-center rounded-xl border border-slate-200 bg-white px-3">
                        <input
                          type="number"
                          min="3"
                          max="70"
                          value={profile.bodyFatOverride ?? ''}
                          onChange={(event) => updateProfile({ bodyFatOverride: event.target.value ? toNumber(event.target.value) : null })}
                          className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none"
                        />
                        <span className="ml-2 text-xs text-slate-400">{t('calculator.units.percent')}</span>
                      </span>
                    </label>
                  )}
                </section>
              )}

              <section className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="calc-label">{t('calculator.input.activity')}</h3>
                  <span className="text-xs font-semibold text-slate-500">{ACTIVITY_FACTORS[profile.activity].toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}×</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {(['sedentary', 'light', 'moderate', 'very', 'extra'] as const).map((level) => {
                    const Icon = ACTIVITY_ICONS[level];
                    return (
                      <button
                        key={level}
                        type="button"
                        aria-pressed={profile.activity === level}
                        onClick={() => updateProfile({ activity: level })}
                        className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 text-[11px] font-semibold transition-colors ${
                          profile.activity === level ? 'border-emerald-900 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20' : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                        }`}
                      >
                        <Icon size={16} aria-hidden="true" />
                        {t(`calculator.activity.${level}` as keyof TranslationKeys)}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="mt-6">
                <h3 className="calc-label mb-3">{t('calculator.input.goal')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['lose', 'maintain', 'gain'] as const).map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      aria-pressed={profile.goal === goal}
                      onClick={() => updateProfile({ goal })}
                      className={`min-h-11 rounded-xl border px-3 text-sm font-semibold transition-colors ${
                        profile.goal === goal ? 'border-emerald-900 bg-emerald-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                      }`}
                    >
                      {t(`calculator.goal.${goal}` as keyof TranslationKeys)}
                    </button>
                  ))}
                </div>
              </section>

              {(hasError || !profileIsValid) && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{t('calculator.error.required')}</p>}

              <button
                type="submit"
                disabled={isCalculating || !profileIsValid}
                aria-label={t('calculator.button.calculateAria')}
                className="calc-primary-button group mx-auto mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-px hover:bg-emerald-900 hover:shadow-emerald-500/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[280px]"
              >
                {isCalculating ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : null}
                {t(isCalculating ? 'calculator.button.calculating' : 'calculator.button.calculate')}
                {!isCalculating && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />}
              </button>
            </form>

            <aside className="calculator-summary rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7" aria-live="polite">
              <h2 className="text-xl font-bold text-slate-900">{t('calculator.summary.title')}</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="grid grid-cols-2 gap-3">
                  <MetricMini label={t('calculator.preview.bmi')} value={format(metrics.bmi, 1)} />
                  <MetricMini label={t('calculator.preview.bmr')} value={format(metrics.bmr)} unit={t('calculator.units.kcal')} />
                  <MetricMini label={t('calculator.preview.tdee')} value={format(metrics.tdee)} unit={t('calculator.units.kcal')} />
                  <MetricMini label={t('calculator.preview.bodyFat')} value={format(metrics.bodyFat, 1)} unit={t('calculator.units.percent')} />
                </div>
                <p className="flex items-center rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950">
                  {t('calculator.summary.tip')}
                </p>
              </div>
              {hasCalculated && isDirty && (
                <button type="button" onClick={() => handleCalculate()} className="mt-4 min-h-11 rounded-full border border-emerald-200 px-5 text-sm font-semibold text-emerald-900 hover:bg-emerald-50">
                  {t('calculator.button.calculate')}
                </button>
              )}
            </aside>

            {hasCalculated && (
              <section ref={resultsRef} className={`space-y-5 scroll-mt-24 ${highlightResults ? 'calculator-results-highlight' : ''}`} aria-labelledby="calculator-results-heading">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="calc-label">{tabLabel}</p>
                    <h2 id="calculator-results-heading" className="text-2xl font-bold text-slate-900">{t('calculator.results.title')}</h2>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">{format(animatedCalories)} {t('calculator.results.perDay')}</span>
                </div>

                <div className="grid gap-5 xl:grid-cols-12">
                  <section id="calculator-calorie-targets" className="calc-card xl:col-span-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-slate-900">{t('calculator.results.calorieTargets')}</h3>
                      <div className="flex flex-wrap gap-1 rounded-full bg-slate-100 p-1" role="group" aria-label={t('calculator.results.formula')}>
                        {bmrFormulaOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            aria-pressed={formula === option.id}
                            onClick={() => {
                              setFormula(option.id);
                              setIsDirty(true);
                            }}
                            className={`min-h-11 rounded-full px-3 text-xs font-semibold transition ${formula === option.id ? 'bg-emerald-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            {t(option.key)}
                            {option.id === 'mifflin' && <span className="ms-1 opacity-75">· {t('calculator.formula.recommended')}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5 space-y-4">
                      {calorieRows.map((row) => (
                        <div key={row.key} className="grid grid-cols-[minmax(92px,130px)_1fr_76px] items-center gap-3">
                          <span className="text-xs font-semibold text-slate-600 sm:text-sm">{row.label}</span>
                          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${row.key === 'loss' ? 'bg-emerald-500' : row.key === 'extreme' ? 'bg-amber-400' : 'bg-slate-300'}`}
                              style={{ width: `${Math.max(8, Math.min(100, row.value / metrics.maintenance * 100))}%` }}
                            />
                          </div>
                          <span className={`text-end text-sm font-bold ${row.key === 'loss' ? 'text-emerald-800' : 'text-slate-900'}`}>{format(row.value)}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs font-semibold text-emerald-800">
                      {t('calculator.results.lossRate')}
                    </p>
                    <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
                      {t('calculator.results.formula')}: {t(bmrFormulaOptions.find((item) => item.id === formula)?.key ?? 'calculator.formula.mifflin')} · {format(metrics.bmr)} {t('calculator.units.kcal')}
                    </div>
                  </section>

                  <section id="calculator-bmr-formula" className="calc-card xl:col-span-4">
                    <h3 className="text-lg font-bold text-slate-900">{t('calculator.results.activity')}</h3>
                    <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-2">
                      {(['sedentary', 'light', 'moderate', 'very', 'extra'] as const).map((level) => {
                        const factor = ACTIVITY_FACTORS[level];
                        const value = metrics.activityCalories[level];
                        return (
                          <div key={level} className={`min-w-[108px] shrink-0 rounded-xl border px-3 py-2 ${profile.activity === level ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : 'border-slate-100 bg-slate-50 text-slate-600'}`}>
                            <div className="flex items-center gap-1 text-[11px] font-semibold">
                              <span>{t(`calculator.activity.${level}` as keyof TranslationKeys)}</span>
                              {profile.activity === level && <Check size={13} aria-hidden="true" />}
                            </div>
                            <div className="mt-1 text-[10px] text-slate-400">{factor}×</div>
                            <div className="mt-1 text-sm font-extrabold">{format(value)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>

                <section id="calculator-bmi-results" className="calc-card">
                  <h3 className="text-lg font-bold text-slate-900">{t('calculator.results.bmiRange')}</h3>
                  <div className="mt-5 grid gap-5 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <div className="relative mt-3 h-4 rounded-full bg-gradient-to-r from-blue-300 via-emerald-400 via-60% to-amber-400">
                        <span className="absolute top-1/2 h-7 w-1.5 -translate-y-1/2 rounded-full bg-slate-900 shadow" style={{ left: `${bmiPercent}%` }} />
                      </div>
                      <div className="mt-2 flex justify-between text-[10px] font-semibold text-slate-500">
                        <span>14</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                      </div>
                    </div>
                    <div id="calculator-body-fat-results" className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-5">
                      <MetricMini label={t('calculator.preview.bmi')} value={format(metrics.bmi, 1)} />
                      <MetricMini label={t('calculator.results.bmiPrime')} value={format(metrics.bmiPrime, 2)} />
                      <MetricMini label={t('calculator.results.ponderal')} value={format(metrics.ponderal, 1)} />
                      <div className="rounded-2xl bg-slate-50 px-3 py-3">
                        <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">{t('calculator.preview.bodyFat')}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <svg viewBox="0 0 52 52" className="h-11 w-11 shrink-0" role="img" aria-label={`${t('calculator.preview.bodyFat')} ${format(metrics.bodyFat, 1)}${t('calculator.units.percent')}`}>
                            <circle cx="26" cy="26" r="20" fill="none" stroke="#E2E8F0" strokeWidth="5" />
                            <circle
                              cx="26"
                              cy="26"
                              r="20"
                              fill="none"
                              stroke="#1E3A8A"
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeDasharray={125.66}
                              strokeDashoffset={125.66 * (1 - Math.max(0, Math.min(100, metrics.bodyFat)) / 100)}
                              transform="rotate(-90 26 26)"
                              className="transition-all duration-500"
                            />
                          </svg>
                          <strong className="text-sm font-extrabold text-slate-900">{format(metrics.bodyFat, 1)}{t('calculator.units.percent')}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <MetricTag label={t('calculator.results.healthyWeight')} value={`${format(metrics.healthyMin, 1)}–${format(metrics.healthyMax, 1)} ${t('calculator.units.kg')}`} />
                    <MetricTag label={t('calculator.results.whr')} value={format(metrics.whr, 2)} danger={metrics.whr >= (profile.gender === 'male' ? 1 : 0.85)} />
                  </div>
                </section>

                <div className="grid gap-5 xl:grid-cols-12">
                  <section id="calculator-ideal-weight-results" className="calc-card xl:col-span-7">
                    <h3 className="text-lg font-bold text-slate-900">{t('calculator.results.idealWeight')}</h3>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full border-collapse text-start text-sm">
                        <thead>
                          <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-500">
                            <th className="py-2 pe-3 text-start">{t('calculator.results.formula')}</th>
                            <th className="py-2 text-end">{t('calculator.input.weight')} ({t('calculator.units.kg')})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {([
                        ['hamwi', metrics.idealWeight.hamwi],
                        ['devine', metrics.idealWeight.devine],
                        ['robinson', metrics.idealWeight.robinson],
                        ['miller', metrics.idealWeight.miller],
                      ] as const).map(([key, value]) => (
                            <tr key={key} className="border-b border-slate-50">
                              <th className="py-3 pe-3 text-start font-semibold text-slate-700">{t(`calculator.results.${key}` as keyof TranslationKeys)}</th>
                              <td className="py-3 text-end font-extrabold text-slate-900">{format(value, 1)} {t('calculator.units.kg')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-950">
                      {t('calculator.results.idealAverage')}: <strong>{format(metrics.idealAverage, 1)} {t('calculator.units.kg')}</strong>
                      <span className="mx-2 text-emerald-700">·</span>
                      {t('calculator.results.healthyWeight')}: <strong>{format(metrics.healthyMin, 1)}–{format(metrics.healthyMax, 1)} {t('calculator.units.kg')}</strong>
                    </div>
                  </section>
                  <section id="calculator-macros-results" className="calc-card xl:col-span-5">
                    <h3 className="text-lg font-bold text-slate-900">{t('calculator.results.macros')}</h3>
                    <div className="mt-4 space-y-4">
                      {([
                        ['protein', metrics.macros.protein, 'bg-emerald-500'],
                        ['carbs', metrics.macros.carbs, 'bg-amber-400'],
                        ['fat', metrics.macros.fat, 'bg-sky-500'],
                      ] as const).map(([key, value, color]) => (
                        <div key={key}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="font-semibold text-slate-600">{t(`calculator.macro.${key}` as keyof TranslationKeys)}</span>
                            <span className="font-bold text-slate-900">{format(value)} {t('calculator.units.grams')}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(0, Math.min(100, value / macroTotal * 100))}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">{t('calculator.education.title')}</h3>
                  <EducationAccordion title={t('calculator.education.whoTitle')} content={t('calculator.education.whoContent')} />
                  <BmiChart title={t('calculator.education.chartTitle')} />
                  <EducationAccordion title={t('calculator.education.overweightTitle')} content={t('calculator.education.overweight')} />
                  <EducationAccordion title={t('calculator.education.underweightTitle')} content={t('calculator.education.underweight')} />
                  <EducationAccordion title={t('calculator.education.limitationsTitle')} content={t('calculator.education.limitations')} />
                  <div className="calc-card">
                    <h4 className="text-base font-bold text-slate-900">{t('calculator.education.formulasTitle')}</h4>
                    <FormulaBlock title={t('calculator.nav.bmi')} formula={t('calculator.education.formulaBmi')} />
                    <FormulaBlock title={t('calculator.nav.bmr')} formula={t('calculator.education.formulaBmr')} />
                    <FormulaBlock title={t('calculator.nav.calories')} formula={t('calculator.education.formulaTdee')} />
                    <FormulaBlock title={t('calculator.nav.bodyFat')} formula={t('calculator.education.formulaBodyFat')} />
                    <FormulaBlock title={t('calculator.nav.bodyFat')} formula={t('calculator.education.formulaBodyFatSi')} />
                    <FormulaBlock title={t('calculator.preview.bodyFat')} formula={t('calculator.education.formulaBodyFatBmi')} />
                    <FormulaBlock title={t('calculator.results.bodyFat')} formula={t('calculator.education.formulaBodyComposition')} />
                    <FormulaBlock title={t('calculator.results.idealWeight')} formula={t('calculator.education.formulaIdealWeight')} />
                  </div>
                </section>
              </section>
            )}

            <section className="rounded-3xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8" aria-labelledby="calculator-science-heading">
              {(() => {
                const copyByLang: Record<string, { eyebrow: string; title: string; intro: string; bmrTitle: string; bmrBody: string; tdeeTitle: string; tdeeBody: string; howTitle: string; howBody: string; linksTitle: string }> = {
                  en: {
                    eyebrow: 'Evidence-Based Guide',
                    title: 'How BMR, TDEE, and calorie targets work',
                    intro: 'Understanding the science behind your numbers helps you use this calculator as a practical planning tool, not just a one-time score. Your results combine body measurements, age, sex, activity, and goal to estimate how much energy your body uses and how to adjust intake safely.',
                    bmrTitle: 'Basal Metabolic Rate (BMR)',
                    bmrBody: 'BMR is the energy your body needs at rest to support essential functions such as breathing, circulation, temperature regulation, and cell repair. It is usually the largest part of daily calorie burn. We estimate BMR using established equations such as Mifflin-St Jeor, which uses weight, height, age, and sex. Muscle mass, genetics, hormones, sleep, and medical conditions can also influence real-world BMR, so treat the number as a strong estimate rather than a medical diagnosis.',
                    tdeeTitle: 'Total Daily Energy Expenditure (TDEE)',
                    tdeeBody: 'TDEE starts with BMR and multiplies it by an activity factor to reflect movement throughout the day. This includes exercise, walking, work activity, and non-exercise movement. If your lifestyle is sedentary, your TDEE will be closer to BMR; if you train frequently or have an active job, your TDEE rises. Choosing the right activity level matters because overestimating activity is a common reason calorie plans stop working.',
                    howTitle: 'How to use this calculator',
                    howBody: 'Start by entering accurate measurements, then select the activity level that matches your normal week. Use the calorie target as a starting point: maintain for weight stability, a moderate deficit for gradual fat loss, or a small surplus for muscle gain. Recheck your numbers every few weeks as weight, activity, or goals change. For best results, pair calculator estimates with balanced meals, strength training, sleep, and professional guidance when you have a medical condition.',
                    linksTitle: 'Explore more health tools and guides',
                  },
                  ar: {
                    eyebrow: 'دليل مبني على الأدلة',
                    title: 'كيف تعمل BMR وTDEE وأهداف السعرات',
                    intro: 'فهم العلم وراء الأرقام يساعدك على استخدام هذه الحاسبة كأداة تخطيط عملية وليست مجرد نتيجة لمرة واحدة. تجمع نتائجك بين قياسات الجسم والعمر والجنس والنشاط والهدف لتقدير الطاقة التي يستخدمها جسمك وكيف تضبط السعرات بأمان.',
                    bmrTitle: 'معدل الأيض الأساسي (BMR)',
                    bmrBody: 'BMR هو الطاقة التي يحتاجها جسمك في حالة الراحة لدعم الوظائف الأساسية مثل التنفس والدورة الدموية وتنظيم الحرارة وإصلاح الخلايا. وعادة ما يكون أكبر جزء من حرق السعرات اليومي. نقدّر BMR باستخدام معادلات معتمدة مثل Mifflin-St Jeor التي تعتمد على الوزن والطول والعمر والجنس. الكتلة العضلية والوراثة والهرمونات والنوم والحالات الطبية قد تؤثر أيضًا، لذلك اعتبر الرقم تقديرًا قويًا وليس تشخيصًا طبيًا.',
                    tdeeTitle: 'إجمالي استهلاك الطاقة اليومي (TDEE)',
                    tdeeBody: 'يبدأ TDEE من BMR ثم يضربه في معامل النشاط ليعكس الحركة خلال اليوم، بما في ذلك التمارين والمشي ونشاط العمل والحركة اليومية. إذا كان نمط حياتك خاملًا سيكون TDEE أقرب إلى BMR، وإذا كنت نشطًا أو تتمرن كثيرًا فسيزيد. اختيار مستوى النشاط الصحيح مهم لأن المبالغة في تقدير النشاط سبب شائع لفشل خطط السعرات.',
                    howTitle: 'كيفية استخدام هذه الحاسبة',
                    howBody: 'ابدأ بإدخال قياسات دقيقة، ثم اختر مستوى النشاط الذي يطابق أسبوعك المعتاد. استخدم هدف السعرات كنقطة بداية: الثبات للحفاظ على الوزن، عجز معتدل لفقدان الدهون تدريجيًا، أو فائض صغير لزيادة العضلات. أعد مراجعة الأرقام كل بضعة أسابيع مع تغير الوزن أو النشاط أو الأهداف. ولأفضل النتائج، اجمع بين تقديرات الحاسبة والوجبات المتوازنة وتمارين القوة والنوم واستشارة مختص عند وجود حالة طبية.',
                    linksTitle: 'استكشف المزيد من الأدوات والأدلة الصحية',
                  },
                  fr: {
                    eyebrow: 'Guide fondé sur les preuves',
                    title: 'Comment fonctionnent le BMR, le TDEE et les objectifs caloriques',
                    intro: 'Comprendre la science derrière vos chiffres vous aide à utiliser cette calculatrice comme un outil de planification pratique. Vos résultats combinent mesures corporelles, âge, sexe, activité et objectif pour estimer l’énergie utilisée par votre corps et ajuster l’apport en toute sécurité.',
                    bmrTitle: 'Métabolisme de base (BMR)',
                    bmrBody: 'Le BMR est l’énergie dont votre corps a besoin au repos pour assurer les fonctions essentielles comme la respiration, la circulation, la régulation de la température et la réparation cellulaire. C’est souvent la plus grande part des calories brûlées chaque jour. Nous estimons le BMR avec des équations reconnues comme Mifflin-St Jeor. La masse musculaire, la génétique, les hormones, le sommeil et les conditions médicales peuvent aussi influencer le BMR réel.',
                    tdeeTitle: 'Dépense énergétique totale quotidienne (TDEE)',
                    tdeeBody: 'Le TDEE part du BMR et le multiplie par un facteur d’activité pour refléter les mouvements de la journée : exercice, marche, travail et activité hors sport. Si vous êtes sédentaire, votre TDEE sera proche du BMR ; si vous êtes très actif, il augmente. Choisir le bon niveau d’activité est essentiel car surestimer l’activité est une cause fréquente d’échec des plans caloriques.',
                    howTitle: 'Comment utiliser cette calculatrice',
                    howBody: 'Commencez par saisir des mesures précises, puis choisissez le niveau d’activité qui correspond à votre semaine habituelle. Utilisez l’objectif calorique comme point de départ : maintien pour stabiliser le poids, déficit modéré pour une perte de graisse progressive, ou léger surplus pour prendre du muscle. Réévaluez vos chiffres toutes les quelques semaines. Pour de meilleurs résultats, associez ces estimations à des repas équilibrés, du renforcement, du sommeil et un avis professionnel si nécessaire.',
                    linksTitle: 'Explorez plus d’outils et de guides santé',
                  },
                  es: {
                    eyebrow: 'Guía basada en evidencia',
                    title: 'Cómo funcionan el BMR, el TDEE y los objetivos de calorías',
                    intro: 'Entender la ciencia detrás de tus números te ayuda a usar esta calculadora como una herramienta práctica de planificación. Tus resultados combinan medidas corporales, edad, sexo, actividad y objetivo para estimar cuánta energía usa tu cuerpo y cómo ajustar la ingesta de forma segura.',
                    bmrTitle: 'Tasa metabólica basal (BMR)',
                    bmrBody: 'El BMR es la energía que tu cuerpo necesita en reposo para funciones esenciales como respirar, la circulación, la regulación de la temperatura y la reparación celular. Suele ser la mayor parte del gasto calórico diario. Estimamos el BMR con ecuaciones reconocidas como Mifflin-St Jeor. La masa muscular, la genética, las hormonas, el sueño y las condiciones médicas también pueden influir en el BMR real.',
                    tdeeTitle: 'Gasto energético total diario (TDEE)',
                    tdeeBody: 'El TDEE parte del BMR y lo multiplica por un factor de actividad para reflejar el movimiento diario: ejercicio, caminar, trabajo y actividad fuera del entrenamiento. Si tu estilo de vida es sedentario, tu TDEE estará cerca del BMR; si eres muy activo, aumentará. Elegir bien el nivel de actividad es importante porque sobreestimar la actividad es una causa común de que los planes de calorías no funcionen.',
                    howTitle: 'Cómo usar esta calculadora',
                    howBody: 'Empieza ingresando medidas precisas y selecciona el nivel de actividad que coincida con tu semana normal. Usa el objetivo calórico como punto de partida: mantenimiento para estabilidad, déficit moderado para pérdida gradual de grasa o un pequeño superávit para ganar músculo. Revisa tus números cada pocas semanas. Para mejores resultados, combina estas estimaciones con comidas equilibradas, entrenamiento de fuerza, sueño y orientación profesional cuando sea necesario.',
                    linksTitle: 'Explora más herramientas y guías de salud',
                  },
                  hi: {
                    eyebrow: 'साक्ष्य-आधारित मार्गदर्शिका',
                    title: 'BMR, TDEE और कैलोरी लक्ष्य कैसे काम करते हैं',
                    intro: 'अपने नंबरों के पीछे का विज्ञान समझने से आप इस कैलकुलेटर का उपयोग एक व्यावहारिक योजना टूल के रूप में कर सकते हैं। आपके परिणाम शरीर के माप, उम्र, लिंग, गतिविधि और लक्ष्य को मिलाकर अनुमान लगाते हैं कि आपका शरीर कितनी ऊर्जा उपयोग करता है और सेवन को सुरक्षित रूप से कैसे समायोजित करें।',
                    bmrTitle: 'बेसल मेटाबॉलिक रेट (BMR)',
                    bmrBody: 'BMR वह ऊर्जा है जिसकी आपके शरीर को आराम की स्थिति में सांस लेने, रक्त संचार, तापमान नियंत्रण और कोशिका मरम्मत जैसी आवश्यक प्रक्रियाओं के लिए जरूरत होती है। यह आमतौर पर दैनिक कैलोरी खर्च का सबसे बड़ा हिस्सा होता है। हम Mifflin-St Jeor जैसे स्थापित समीकरणों से BMR का अनुमान लगाते हैं। मांसपेशी द्रव्यमान, आनुवंशिकी, हार्मोन, नींद और चिकित्सा स्थितियाँ भी वास्तविक BMR को प्रभावित कर सकती हैं।',
                    tdeeTitle: 'कुल दैनिक ऊर्जा व्यय (TDEE)',
                    tdeeBody: 'TDEE BMR से शुरू होता है और दिनभर की गतिविधि को दर्शाने के लिए इसे गतिविधि कारक से गुणा करता है। इसमें व्यायाम, चलना, काम की गतिविधि और गैर-व्यायाम मूवमेंट शामिल हैं। यदि आपकी जीवनशैली बैठी हुई है तो TDEE BMR के करीब होगा; यदि आप सक्रिय हैं तो यह बढ़ेगा। सही गतिविधि स्तर चुनना महत्वपूर्ण है क्योंकि गतिविधि को अधिक आंकना कैलोरी योजनाओं के विफल होने का सामान्य कारण है।',
                    howTitle: 'इस कैलकुलेटर का उपयोग कैसे करें',
                    howBody: 'सटीक माप दर्ज करें और अपनी सामान्य सप्ताहचर्या से मेल खाने वाला गतिविधि स्तर चुनें। कैलोरी लक्ष्य को शुरुआती बिंदु के रूप में उपयोग करें: वजन स्थिर रखने के लिए मेंटेन, धीरे-धीरे फैट लॉस के लिए मध्यम déficit, या मांसपेशी बढ़ाने के लिए छोटा surplus। हर कुछ हफ्तों में नंबर दोबारा जांचें। बेहतर परिणामों के लिए संतुलित भोजन, स्ट्रेंथ ट्रेनिंग, नींद और जरूरत पड़ने पर विशेषज्ञ सलाह के साथ इन अनुमानों को जोड़ें।',
                    linksTitle: 'और स्वास्थ्य टूल व मार्गदर्शिकाएँ देखें',
                  },
                  de: {
                    eyebrow: 'Evidenzbasierter Leitfaden',
                    title: 'So funktionieren BMR, TDEE und Kalorienziele',
                    intro: 'Wenn Sie die Wissenschaft hinter Ihren Zahlen verstehen, können Sie diesen Rechner als praktisches Planungstool nutzen. Ihre Ergebnisse kombinieren Körpermaße, Alter, Geschlecht, Aktivität und Ziel, um den Energiebedarf Ihres Körpers einzuschätzen.',
                    bmrTitle: 'Grundumsatz (BMR)',
                    bmrBody: 'Der BMR ist die Energie, die Ihr Körper in Ruhe für lebenswichtige Funktionen wie Atmung, Kreislauf, Temperaturregulierung und Zellreparatur benötigt. Er macht meist den größten Teil des täglichen Kalorienverbrauchs aus. Wir schätzen den BMR mit anerkannten Formeln wie Mifflin-St Jeor. Muskelmasse, Genetik, Hormone, Schlaf und Erkrankungen können den tatsächlichen BMR beeinflussen.',
                    tdeeTitle: 'Gesamtumsatz (TDEE)',
                    tdeeBody: 'Der TDEE geht vom BMR aus und multipliziert ihn mit einem Aktivitätsfaktor, der Bewegung im Alltag und Training berücksichtigt. Ein sitzender Lebensstil liegt näher am BMR, ein aktiver deutlich darüber. Die richtige Aktivitätsstufe ist wichtig, da eine Überschätzung häufig dazu führt, dass Kalorienpläne nicht funktionieren.',
                    howTitle: 'So nutzen Sie diesen Rechner',
                    howBody: 'Geben Sie genaue Messwerte ein und wählen Sie die Aktivitätsstufe, die zu Ihrer normalen Woche passt. Nutzen Sie das Kalorienziel als Startpunkt: Erhalt für Stabilität, moderates Defizit für Fettabbau oder leichter Überschuss für Muskelaufbau. Überprüfen Sie die Werte alle paar Wochen und kombinieren Sie sie mit ausgewogener Ernährung, Krafttraining, Schlaf und bei Bedarf professioneller Beratung.',
                    linksTitle: 'Weitere Gesundheitstools und Ratgeber',
                  },
                };
                const copy = copyByLang[language] || copyByLang.en;
                return (
                  <>
                    <p className="calc-label mb-2">{copy.eyebrow}</p>
                    <h2 id="calculator-science-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">{copy.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{copy.intro}</p>
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <article className="rounded-2xl bg-slate-50 p-5">
                        <h3 className="text-lg font-bold text-slate-900">{copy.bmrTitle}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{copy.bmrBody}</p>
                      </article>
                      <article className="rounded-2xl bg-slate-50 p-5">
                        <h3 className="text-lg font-bold text-slate-900">{copy.tdeeTitle}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{copy.tdeeBody}</p>
                      </article>
                    </div>
                    <article className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
                      <h3 className="text-lg font-bold text-slate-900">{copy.howTitle}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{copy.howBody}</p>
                    </article>
                  </>
                );
              })()}
            </section>

            <section className="grid gap-5 lg:grid-cols-2" aria-labelledby="home-links-heading">
              <div className="rounded-3xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_24px_rgba(0,0,0,0.04)]">
                <h2 id="home-links-heading" className="text-xl font-bold text-slate-900">{language === 'ar' ? 'وصفات مميزة' : language === 'fr' ? 'Recettes en vedette' : language === 'es' ? 'Recetas destacadas' : language === 'hi' ? 'विशेष रेसिपी' : 'Featured Recipes'}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {RECIPES.slice(0, 6).map((r) => (
                    <Link key={r.slug} to={`/resources/recipe/${r.slug}`} className="rounded-2xl border border-slate-100 p-4 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors">
                      <div className="text-sm font-bold text-slate-900">{recipeLt(r.title, language)}</div>
                      <div className="mt-1 text-xs text-slate-500">{recipeLt(r.cuisine, language)} · {r.nutrition.calories} kcal</div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_24px_rgba(0,0,0,0.04)]">
                <h2 className="text-xl font-bold text-slate-900">{language === 'ar' ? 'أحدث المقالات' : language === 'fr' ? 'Derniers articles' : language === 'es' ? 'Últimos artículos' : language === 'hi' ? 'नवीनतम लेख' : 'Latest Articles'}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {ARTICLES.slice(0, 6).map((a) => (
                    <Link key={a.slug} to={`/resources/article/${a.slug}`} className="rounded-2xl border border-slate-100 p-4 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors">
                      <div className="text-sm font-bold text-slate-900 line-clamp-2">{articleLt(a.title, language)}</div>
                      <div className="mt-1 text-xs text-slate-500">{a.readTime} min · {a.publishedAt}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_24px_rgba(0,0,0,0.04)]" aria-labelledby="home-tools-heading">
              <h2 id="home-tools-heading" className="text-xl font-bold text-slate-900">{language === 'ar' ? 'أدوات وموارد مهمة' : language === 'fr' ? 'Outils et ressources importants' : language === 'es' ? 'Herramientas y recursos importantes' : language === 'hi' ? 'महत्वपूर्ण टूल और संसाधन' : 'Important Tools and Resources'}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { to: '/meal-planner', label: { en: 'Meal Planner', ar: 'مخطط الوجبات', fr: 'Planificateur de repas', es: 'Planificador de comidas', hi: 'मील प्लानर' } },
                  { to: '/food-library', label: { en: 'Food Library', ar: 'مكتبة الطعام', fr: 'Bibliothèque alimentaire', es: 'Biblioteca de alimentos', hi: 'फूड लाइब्रेरी' } },
                  { to: '/resources', label: { en: 'Health Resources', ar: 'الموارد الصحية', fr: 'Ressources santé', es: 'Recursos de salud', hi: 'स्वास्थ्य संसाधन' } },
                  { to: '/weight-loss', label: { en: 'Weight Loss Plan', ar: 'خطة فقدان الوزن', fr: 'Plan de perte de poids', es: 'Plan de pérdida de peso', hi: 'वजन घटाने की योजना' } },
                  { to: '/diabetes', label: { en: 'Diabetes Guide', ar: 'دليل السكري', fr: 'Guide diabète', es: 'Guía de diabetes', hi: 'मधुमेह गाइड' } },
                  { to: '/about', label: { en: 'About Us', ar: 'من نحن', fr: 'À propos', es: 'Sobre nosotros', hi: 'हमारे बारे में' } },
                  { to: '/contact', label: { en: 'Contact', ar: 'تواصل معنا', fr: 'Contact', es: 'Contacto', hi: 'संपर्क' } },
                  { to: '/privacy', label: { en: 'Privacy Policy', ar: 'سياسة الخصوصية', fr: 'Politique de confidentialité', es: 'Política de privacidad', hi: 'गोपनीयता नीति' } },
                  { to: '/terms', label: { en: 'Terms of Service', ar: 'شروط الخدمة', fr: "Conditions d'utilisation", es: 'Términos de servicio', hi: 'सेवा की शर्तें' } },
                ].map((item) => (
                  <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/40 hover:text-emerald-900 transition-colors">
                    {(item.label as any)[language] || item.label.en}
                  </Link>
                ))}
              </div>
            </section>

            <section className="calculator-final-cta relative overflow-hidden rounded-[32px] bg-slate-900 p-6 text-white shadow-xl sm:p-10">
              <div className="calculator-cta-glow pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-900/20 blur-3xl" />
              <div className="relative">
                <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {t('calculator.cta.title').replace('{calories}', format(metrics.targetCalories))}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">{t('calculator.cta.subtitle')}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
                  <span className="flex -space-x-2" aria-hidden="true">
                    <span className="h-7 w-7 rounded-full border-2 border-slate-900 bg-emerald-300" />
                    <span className="h-7 w-7 rounded-full border-2 border-slate-900 bg-amber-300" />
                    <span className="h-7 w-7 rounded-full border-2 border-slate-900 bg-sky-300" />
                  </span>
                  <span>{t('calculator.cta.trust')}</span>
                </div>
                <button
                  type="button"
                  onClick={navigateToPlan}
                  className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-extrabold text-slate-900 shadow-xl transition duration-200 hover:-translate-y-px hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40 sm:w-auto"
                >
                  {t('calculator.cta.button')} <ArrowRight size={18} aria-hidden="true" />
                </button>
                <p className="mt-3 text-xs text-slate-400">{t('calculator.cta.footnote')}</p>
              </div>
            </section>
          </div>

          <aside className="calculator-live-panel space-y-4 lg:sticky lg:top-24 lg:col-span-3">
            <div className="calc-card">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">{t('calculator.preview.title')}</h2>
                <HeartPulse size={18} className="text-emerald-700" aria-hidden="true" />
              </div>
              <div className="calc-bmi-gauge mx-auto my-4 h-40 w-40">
                <svg viewBox="0 0 160 160" role="img" aria-label={`${t('calculator.preview.bmi')} ${format(metrics.bmi, 1)}`}>
                  <defs>
                    <linearGradient id="bmi-gauge-gradient" x1="0" x2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="65%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="66" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                  <circle cx="80" cy="80" r="66" fill="none" stroke="url(#bmi-gauge-gradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray="300 415" transform="rotate(135 80 80)" />
                  <g className="calc-gauge-needle" style={{ transform: `rotate(${gaugeRotation}deg)` }}>
                    <line x1="80" y1="80" x2="80" y2="30" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="80" cy="80" r="6" fill="#0F172A" />
                  </g>
                  <text x="80" y="105" textAnchor="middle" className="calc-gauge-number">{format(metrics.bmi, 1)}</text>
                  <text x="80" y="123" textAnchor="middle" className="calc-gauge-caption">{t('calculator.preview.bmi')}</text>
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <MetricMini label={t('calculator.preview.bmr')} value={format(metrics.bmr)} unit={t('calculator.units.kcal')} />
                <MetricMini label={t('calculator.preview.tdee')} value={format(metrics.tdee)} unit={t('calculator.units.kcal')} />
                <MetricMini label={t('calculator.preview.maxHr')} value={format(metrics.maxHr)} unit={t('calculator.units.bpm')} />
                <MetricMini label={t('calculator.preview.bodyFat')} value={format(metrics.bodyFat, 1)} unit={t('calculator.units.percent')} />
              </div>
              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-950">
                {t('calculator.preview.tip').replace('{kg}', format(Math.max(0, profile.weightKg - metrics.healthyMax), 1))}
              </p>
            </div>
            <div className="calc-card">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <HeartPulse size={17} className="text-rose-500" aria-hidden="true" />
                {t('calculator.preview.healthyWeight')}
              </div>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">
                {format(metrics.healthyMin, 1)}–{format(metrics.healthyMax, 1)} <span className="text-sm font-semibold text-slate-500">{t('calculator.units.kg')}</span>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <span>{t('calculator.preview.bodyFat')}</span><strong className="text-end text-slate-800">{format(metrics.bodyFat, 1)}{t('calculator.units.percent')}</strong>
                <span>{t('calculator.preview.whr')}</span><strong className={`text-end ${metrics.whr >= (profile.gender === 'male' ? 1 : 0.85) ? 'text-red-600' : 'text-emerald-700'}`}>{format(metrics.whr, 2)}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const MetricMini: React.FC<{ label: string; value: string; unit?: string }> = ({ label, value, unit }) => (
  <div className="rounded-2xl bg-slate-50 px-3 py-3">
    <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">{label}</div>
    <div className="mt-1 text-base font-extrabold text-slate-900">
      {value}{unit ? <span className="ms-1 text-[10px] font-semibold text-slate-500">{unit}</span> : null}
    </div>
  </div>
);

const MetricTag: React.FC<{ label: string; value: string; danger?: boolean }> = ({ label, value, danger = false }) => (
  <div className={`rounded-full px-3 py-2 text-xs font-semibold ${danger ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-900'}`}>
    {label}: <strong>{value}</strong>
  </div>
);

const EducationAccordion: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <details className="calc-card group">
    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20">
      <span>{title}</span>
      <span aria-hidden="true" className="text-xl text-emerald-800 transition-transform group-open:rotate-45">+</span>
    </summary>
    <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">{content}</p>
  </details>
);

const FormulaBlock: React.FC<{ title: string; formula: string }> = ({ title, formula }) => (
  <div className="mt-3 rounded-xl bg-slate-50 p-3">
    <h5 className="text-xs font-bold text-slate-700">{title}</h5>
    <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-5 text-slate-600">{formula}</pre>
  </div>
);

const BmiChart: React.FC<{ title: string }> = ({ title }) => (
  <details className="calc-card group">
    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-bold text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20">
      <span>{title}</span><span aria-hidden="true" className="text-xl text-emerald-800 transition-transform group-open:rotate-45">+</span>
    </summary>
    <svg className="mt-4 h-auto w-full" viewBox="0 0 640 200" role="img" aria-label={title}>
      <defs>
        <linearGradient id="bmi-chart-gradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="42%" stopColor="#10B981" />
          <stop offset="72%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F87171" />
        </linearGradient>
      </defs>
      <rect x="20" y="40" width="600" height="20" rx="10" fill="url(#bmi-chart-gradient)" />
      <path d="M28 150 C120 145, 165 115, 230 95 C295 75, 335 75, 400 95 C465 115, 520 145, 612 150" fill="none" stroke="#065F46" strokeWidth="4" />
      <line x1="20" y1="170" x2="620" y2="170" stroke="#CBD5E1" strokeWidth="2" />
      <text x="20" y="190" className="calc-chart-label">14</text>
      <text x="160" y="190" className="calc-chart-label">18.5</text>
      <text x="300" y="190" className="calc-chart-label">25</text>
      <text x="420" y="190" className="calc-chart-label">30</text>
      <text x="590" y="190" className="calc-chart-label">40</text>
    </svg>
  </details>
);

export default CalculatorHub;
