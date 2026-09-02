import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import WorkoutBlueprintModal from '../features/plan-builder/WorkoutBlueprintModal';
import {
  generateWeeklyPlan,
  toThirtyDayPlan,
  WorkoutGoal,
  WorkoutLevel,
  WorkoutEquipment,
  WorkoutDayPlan,
  WorkoutFocus,
} from '../features/workout-builder/workoutPlanGenerator';
import { Exercise } from '../utils/calculations_expanded';

type LangKey = 'en' | 'fr' | 'es' | 'ar';
interface LocalLabel { en: string; fr: string; es: string; ar: string }

const GOAL_OPTIONS: Array<{ key: WorkoutGoal; label: LocalLabel; emoji: string }> = [
  { key: 'lose_weight', label: { en: 'Fat Loss', fr: 'Perte de graisse', es: 'Pérdida de grasa', ar: 'خسارة الدهون' }, emoji: '🔥' },
  { key: 'gain_muscle', label: { en: 'Muscle Gain', fr: 'Prise de muscle', es: 'Ganar músculo', ar: 'بناء العضلات' }, emoji: '💪' },
  { key: 'maintain', label: { en: 'Fitness & Maintenance', fr: 'Forme et maintien', es: 'Forma y mantenimiento', ar: 'لياقة ومحافظة' }, emoji: '⚖️' },
  { key: 'cardio', label: { en: 'Heart Health', fr: 'Santé du cœur', es: 'Salud del corazón', ar: 'صحة القلب' }, emoji: '❤️' },
];

const LEVEL_OPTIONS: Array<{ key: WorkoutLevel; en: string; fr: string; es: string; ar: string }> = [
  { key: 'beginner', en: 'Beginner', fr: 'Débutant', es: 'Principiante', ar: 'مبتدئ' },
  { key: 'intermediate', en: 'Intermediate', fr: 'Intermédiaire', es: 'Intermedio', ar: 'متوسط' },
  { key: 'advanced', en: 'Advanced', fr: 'Avancé', es: 'Avanzado', ar: 'متقدم' },
];

const EQUIPMENT_OPTIONS: Array<{ key: WorkoutEquipment; label: LocalLabel; emoji: string }> = [
  { key: 'bodyweight', label: { en: 'Bodyweight', fr: 'Poids du corps', es: 'Peso corporal', ar: 'وزن الجسم' }, emoji: '🤸' },
  { key: 'dumbbells', label: { en: 'Dumbbells', fr: 'Haltères', es: 'Mancuernas', ar: 'دمبل' }, emoji: '🏋️' },
  { key: 'gym', label: { en: 'Full Gym', fr: 'Salle complète', es: 'Gimnasio completo', ar: 'صالة كاملة' }, emoji: '🏋️‍♀️' },
];

const DAYS_OPTIONS = [
  { key: 3 as const, label: { en: '3 days / week', fr: '3 jours / semaine', es: '3 días / semana', ar: '3 أيام / أسبوع' } },
  { key: 4 as const, label: { en: '4 days / week', fr: '4 jours / semaine', es: '4 días / semana', ar: '4 أيام / أسبوع' } },
  { key: 5 as const, label: { en: '5 days / week', fr: '5 jours / semaine', es: '5 días / semana', ar: '5 أيام / أسبوع' } },
];

const MINUTES_OPTIONS = [20, 30, 45, 60];

const SAFETY_OPTIONS: Array<{ value: string; label: LocalLabel }> = [
  { value: 'knee', label: { en: 'Knee concerns', fr: 'Genoux sensibles', es: 'Problemas de rodilla', ar: 'مشاكل في الركبة' } },
  { value: 'back', label: { en: 'Back concerns', fr: 'Dos sensible', es: 'Problemas de espalda', ar: 'مشاكل في الظهر' } },
  { value: 'shoulder', label: { en: 'Shoulder concerns', fr: 'Épaules sensibles', es: 'Problemas de hombro', ar: 'مشاكل في الكتف' } },
  { value: 'hypertension', label: { en: 'High blood pressure', fr: 'Tension élevée', es: 'Presión alta', ar: 'ضغط دم مرتفع' } },
  { value: 'diabetes', label: { en: 'Diabetes', fr: 'Diabète', es: 'Diabetes', ar: 'سكري' } },
  { value: 'pregnancy', label: { en: 'Pregnancy', fr: 'Grossesse', es: 'Embarazo', ar: 'حمل' } },
];

const FOCUS_EXTRA: Record<string, LocalLabel> = {
  push: { en: 'Push', fr: 'Poussée', es: 'Empuje', ar: 'دفع' },
  pull: { en: 'Pull', fr: 'Tirage', es: 'Jalón', ar: 'سحب' },
  legs: { en: 'Legs', fr: 'Jambes', es: 'Piernas', ar: 'الأرجل' },
  hiit: { en: 'HIIT', fr: 'HIIT', es: 'HIIT', ar: 'هيت' },
  rest: { en: 'Rest & Recovery', fr: 'Repos et récupération', es: 'Descanso y recuperación', ar: 'راحة واستشفاء' },
};

const EX_EQUIP_LABELS: Record<string, LocalLabel> = {
  bodyweight: { en: 'Bodyweight', fr: 'Poids du corps', es: 'Peso corporal', ar: 'وزن الجسم' },
  dumbbells: { en: 'Dumbbells', fr: 'Haltères', es: 'Mancuernas', ar: 'دمبل' },
  barbell: { en: 'Barbell', fr: 'Barre', es: 'Barra', ar: 'باربيل' },
  kettlebell: { en: 'Kettlebell', fr: 'Kettlebell', es: 'Kettlebell', ar: 'كيتل بيل' },
  band: { en: 'Resistance Band', fr: 'Bande élastique', es: 'Banda de resistencia', ar: 'شريط مقاومة' },
  machine: { en: 'Machine', fr: 'Machine', es: 'Máquina', ar: 'جهاز' },
  cable: { en: 'Cable', fr: 'Poulie', es: 'Polea', ar: 'بكرة' },
  cardio_machine: { en: 'Cardio Machine', fr: 'Appareil cardio', es: 'Máquina cardio', ar: 'جهاز كارديو' },
  stability_ball: { en: 'Stability Ball', fr: 'Ballon de stabilité', es: 'Balón de estabilidad', ar: 'كرة الثبات' },
  bosu: { en: 'BOSU', fr: 'BOSU', es: 'BOSU', ar: 'بوسو' },
  mat: { en: 'Mat', fr: 'Tapis', es: 'Colchoneta', ar: 'حصيرة' },
  pull_up_bar: { en: 'Pull-Up Bar', fr: 'Barre de traction', es: 'Barra de dominadas', ar: 'عارضة سحب' },
  foam_roller: { en: 'Foam Roller', fr: 'Rouleau de massage', es: 'Rodillo de espuma', ar: 'أسطوانة تدليك' },
  none: { en: 'No Equipment', fr: 'Aucun matériel', es: 'Sin equipo', ar: 'بدون معدات' },
};

const EX_NAME: Record<LangKey, (ex: Exercise) => string> = {
  en: ex => ex.nameEn,
  fr: ex => ex.nameFr,
  es: ex => ex.nameEs,
  ar: ex => ex.nameAr,
};

const EX_TIP: Record<LangKey, (ex: Exercise) => string | undefined> = {
  en: ex => ex.tipEn,
  fr: ex => ex.tipFr,
  es: ex => ex.tipEs,
  ar: ex => ex.tipAr,
};

const WorkoutPlanPage: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as LangKey;
  const B = translations[language].workoutPlanBuilder;

  const [goal, setGoal] = useState<WorkoutGoal>('lose_weight');
  const [level, setLevel] = useState<WorkoutLevel>('beginner');
  const [days, setDays] = useState<3 | 4 | 5>(3);
  const [minutes, setMinutes] = useState(30);
  const [equipment, setEquipment] = useState<WorkoutEquipment>('bodyweight');
  const [safety, setSafety] = useState<string[]>([]);
  const [seedOffset, setSeedOffset] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);

  const plan = useMemo(
    () => generateWeeklyPlan({ goal, level, days, minutes, equipment, safety, seedOffset }),
    [goal, level, days, minutes, equipment, safety, seedOffset]
  );

  const thirtyDayPlan = useMemo<WorkoutDayPlan[]>(() => toThirtyDayPlan(plan), [plan]);

  const bmi = useMemo(() => {
    try {
      const bridge = JSON.parse(localStorage.getItem('hc_calculator_bridge') || '{}');
      const w = Number(bridge.weight);
      const h = Number(bridge.height);
      if (w > 0 && h > 0) return Number((w / ((h / 100) * (h / 100))).toFixed(1));
    } catch {}
    return undefined;
  }, []);

  const weightKg = useMemo(() => {
    try {
      const bridge = JSON.parse(localStorage.getItem('hc_calculator_bridge') || '{}');
      const w = Number(bridge.weight);
      if (w > 0) return w;
    } catch {}
    return 75;
  }, []);

  const focusLabel = (focus: WorkoutFocus | 'rest'): string => {
    if (focus === 'cardio') return B.cardiovascular;
    if (focus === 'flexibility') return B.flexibility;
    if (focus === 'mindbody') return B.relax;
    if (focus === 'fullBody') return B.fullBody;
    if (focus === 'upperBody') return B.upperBody;
    if (focus === 'lowerBody') return B.lowerBody;
    return FOCUS_EXTRA[focus]?.[lang] || focus;
  };

  const equipmentLabel = (key: string): string =>
    EX_EQUIP_LABELS[key]?.[lang] || key;

  const difficultyLabel = (key: string): string => {
    const found = LEVEL_OPTIONS.find(o => o.key === key);
    return found ? (found as unknown as Record<LangKey, string>)[lang] : key;
  };

  const levelLabel = (key: WorkoutLevel): string => LEVEL_OPTIONS.find(o => o.key === key)?.[lang] || key;

  const toggleSafety = (value: string) => {
    setSafety(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const onRegenerate = () => {
    setSeedOffset(s => s + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <Breadcrumbs />

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-orange-500 to-amber-400 text-white mt-6 p-8 md:p-12 shadow-xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold mb-4">
                <span>💪</span> {B.title}
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight">{B.title}</h1>
              <p className="mt-3 text-white/90 max-w-xl text-sm md:text-base">{B.subtitle}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['ACSM', 'AHA', 'WHO', 'CDC'].map(a => (
                  <span key={a} className="bg-white/15 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wide">{a}</span>
                ))}
              </div>
            </div>
            <div className="hidden md:flex w-40 h-40 items-center justify-center">
              <span className="text-8xl drop-shadow-lg">🏋️</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-extrabold text-gray-800 mb-3">{B.goalLabel}</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {GOAL_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setGoal(opt.key)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      goal === opt.key
                        ? 'border-rose-500 bg-rose-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{opt.emoji}</div>
                    <div className={`text-sm font-bold ${goal === opt.key ? 'text-rose-700' : 'text-gray-700'}`}>{opt.label[lang]}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-extrabold text-gray-800 mb-3">{B.exercise_type}</label>
                <div className="flex flex-wrap gap-2">
                  {LEVEL_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setLevel(opt.key)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        level === opt.key
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {opt[lang]}
                    </button>
                  ))}
                </div>
                <label className="block text-sm font-extrabold text-gray-800 mb-3 mt-6">{B.difficulty}</label>
                <span className="text-sm text-gray-500">{levelLabel(level)}</span>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-gray-800 mb-3">{B.workoutDaysLabel}</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setDays(opt.key)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        days === opt.key
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {opt.label[lang]}
                    </button>
                  ))}
                </div>
                <label className="block text-sm font-extrabold text-gray-800 mb-3 mt-6">{B.durationLabel}</label>
                <div className="flex flex-wrap gap-2">
                  {MINUTES_OPTIONS.map(m => (
                    <button
                      key={m}
                      onClick={() => setMinutes(m)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        minutes === m
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {m} {B.minutes}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-extrabold text-gray-800 mb-3">{B.equipment}</label>
              <div className="grid grid-cols-3 gap-3 max-w-2xl">
                {EQUIPMENT_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setEquipment(opt.key)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      equipment === opt.key
                        ? 'border-sage-500 bg-sage-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{opt.emoji}</div>
                    <div className={`text-xs font-bold ${equipment === opt.key ? 'text-sage-700' : 'text-gray-600'}`}>{opt.label[lang]}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-extrabold text-gray-800 mb-2">{B.contraindications}</label>
              <p className="text-xs text-gray-500 mb-3">🛡️ {B.contraindications}: </p>
              <div className="flex flex-wrap gap-2">
                {SAFETY_OPTIONS.map(opt => {
                  const active = safety.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleSafety(opt.value)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                        active
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {active ? '✓ ' : ''}{opt.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setGenerated(true)}
                className="btn-primary flex-1 py-4 text-base font-black rounded-2xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 shadow-lg shadow-rose-200"
              >
                ⚡ {B.generateBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {generated && (
          <div className="mt-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-black">{B.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{B.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={onRegenerate}
                  className="px-4 py-2.5 rounded-xl bg-white border-2 border-gray-200 text-sm font-bold text-gray-700 hover:border-gray-300"
                >
                  🔄 {B.regenerate}
                </button>
                <button
                  onClick={() => setShowBlueprint(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 text-white text-sm font-bold shadow-md shadow-rose-200"
                >
                  📅 {B.openBlueprint}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
                <div className="text-2xl font-black text-rose-600">{plan.trainingSessions}</div>
                <div className="text-xs text-gray-500 mt-1 font-semibold">{days} {B.workoutDaysLabel}</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
                <div className="text-2xl font-black text-orange-500">{plan.weeklyCalories.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1 font-semibold">kcal / {B.workoutDaysLabel.split('/')[0].trim()}</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
                <div className="text-2xl font-black text-sage-600">{minutes} {B.minutes}</div>
                <div className="text-xs text-gray-500 mt-1 font-semibold">{B.durationLabel}</div>
              </div>
            </div>

            <div className="grid gap-4 mt-6">
              {plan.days.map(day => {
                const isRest = day.focus === 'rest';
                return (
                  <div key={day.day} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${isRest ? 'border-dashed border-gray-200' : 'border-gray-100'}`}>
                    <div className={`px-5 py-3.5 flex items-center justify-between ${isRest ? 'bg-gray-50' : 'bg-gradient-to-r from-rose-50 to-orange-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${isRest ? 'bg-gray-100 text-gray-500' : 'bg-rose-100 text-rose-700'}`}>
                          {isRest ? '😴' : '🔥'}
                        </span>
                        <div>
                          <div className="text-sm font-extrabold text-gray-900">{focusLabel(day.focus)}</div>
                            <span className="text-xs text-gray-500">
                              {B.dayLabel} {day.day} · {isRest ? '' : `${day.sessionMinutes} ${B.minutes}`}
                            </span>
                        </div>
                      </div>
                      {!isRest && (
                        <span className="text-sm font-black text-rose-600">~{day.calorieBurnTarget.toLocaleString()} kcal</span>
                      )}
                    </div>
                    {!isRest && (
                      <div className="px-5 py-3 grid gap-2.5">
                        {day.exercises.map((ex, idx) => (
                          <div key={ex.id} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-100 text-xs font-black text-gray-400 shrink-0">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-gray-800">
                                {EX_NAME[lang](ex)}
                                <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 align-middle">{difficultyLabel(ex.difficulty)}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                                <span className="inline-flex items-center gap-1">🏋️ {equipmentLabel(ex.equipment)}</span>
                                <span className="inline-flex items-center gap-1">🔁 {ex.sets}</span>
                                <span className="inline-flex items-center gap-1">⏱️ {ex.duration}</span>
                              </div>
                              {EX_TIP[lang](ex) && (
                                <div className="mt-1.5 text-xs text-gray-500 italic">💡 {EX_TIP[lang](ex)}</div>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="text-[11px] text-gray-400 font-semibold">{B.references}: ACSM · AHA · WHO · CDC — {B.caloriesLabel}: ~{day.calorieBurnTarget} kcal</div>
                      </div>
                    )}
                    {isRest && (
                      <div className="px-5 py-4 text-sm text-gray-400 italic">
                        {FOCUS_EXTRA.rest[lang]} — mobile recovery, stretching and hydration.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5 mt-6 text-sm text-gray-700">
              <strong>📈 {B.goal}:</strong> {B.subtitle}. {B.generateBtn}: ACSM/AHA — {ADDITIONAL_NOTE}
            </div>
          </div>
        )}

        <div className="mt-8">
          <MedicalDisclaimer />
        </div>
      </div>

      <WorkoutBlueprintModal
        isOpen={showBlueprint}
        onClose={() => setShowBlueprint(false)}
        bmi={bmi}
        goal={goal}
        fitnessLevel={level}
        workoutPlan={thirtyDayPlan}
        weight={weightKg}
        onSave={() => setShowBlueprint(false)}
      />
    </div>
  );
};

const ADDITIONAL_NOTE = 'progressive overload, mobility and rest are built into the rotation.';

export default WorkoutPlanPage;