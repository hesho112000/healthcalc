import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getMealLabel } from '../utils/mealLabels';
import MedicalDisclaimer from './MedicalDisclaimer';

export interface SeoPageData {
  slug: string;
  title: { en: string; fr: string; es: string; ar: string };
  metaDesc: { en: string; fr: string; es: string; ar: string };
  heroGradient: string;
  icon: string;
  profile: {
    title: { en: string; fr: string; es: string; ar: string };
    details: { label: { en: string; fr: string; es: string; ar: string }; value: string }[];
  };
  description: { en: string[]; fr: string[]; es: string[]; ar: string[] };
  samplePlan: {
    title: { en: string; fr: string; es: string; ar: string };
    meals: { meal: string; calories: number; items: string[] }[];
    workout: { day: string; activity: string }[];
    tips: { en: string[]; fr: string[]; es: string[]; ar: string[] };
  };
  ctaText: { en: string; fr: string; es: string; ar: string };
  ctaLink: string;
  ctaButtonLabel: { en: string; fr: string; es: string; ar: string };
}

interface SeoLandingPageProps {
  data: SeoPageData;
  pageLang?: Language;
}

const dirMap: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fr: 'ltr',
  es: 'ltr',
  ar: 'rtl',
};

const SeoLandingPage: React.FC<SeoLandingPageProps> = ({ data, pageLang }) => {
  const { language: ctxLanguage, dir: ctxDir } = useLanguage();
  const language = pageLang || ctxLanguage;
  const dir = dirMap[language];

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    return () => {
      document.documentElement.dir = ctxDir;
      document.documentElement.lang = ctxLanguage;
    };
  }, [language, dir, ctxDir, ctxLanguage]);

  const L = (obj: { en: string; fr: string; es: string; ar: string }) => obj[language] || obj.en;

  const sectionLabel = {
    overview: { en: 'Overview', fr: 'Description', es: 'Descripcion', ar: 'الوصف' },
    workoutPlan: { en: 'Workout Plan', fr: "Plan d'Exercices", es: 'Plan de Ejercicio', ar: 'خطة التمارين' },
    healthTips: { en: 'Health Tips', fr: 'Conseils Sante', es: 'Consejos de Salud', ar: 'نصائح صحية' },
    personalizedPlan: { en: 'Your Personalized Plan', fr: 'Votre plan personnalise', es: 'Tu plan personalizado', ar: 'خططك مخصصة لك' },
    planDesc: {
      en: 'Get a plan tailored exactly to your condition and health data',
      fr: 'Obtenez un plan adapte a votre situation et a vos donnees de sante',
      es: 'Obten un plan adaptado a tu situacion y datos de salud',
      ar: 'احصل على خطة مخصصة تماماً لحالتك ومعلوماتك الصحية',
    },
    free: { en: '100% Free', fr: '100% gratuit', es: '100% gratis', ar: 'مجاناً بالكامل' },
  };

  return (
    <div className="min-h-screen bg-gray-50/50" dir={dir}>
      <div className={`bg-gradient-to-r ${data.heroGradient} text-white`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{data.icon}</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">{L(data.title)}</h1>
          </div>
          <p className="text-sm md:text-base opacity-90 max-w-2xl leading-relaxed">{L(data.metaDesc)}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">&#128100;</span>
                <h2 className="text-lg font-bold text-gray-900">{L(data.profile.title)}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {data.profile.details.map((d, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">{L(d.label)}</p>
                    <p className="text-sm font-bold text-gray-900">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{L(sectionLabel.overview)}</h2>
              <div className="space-y-3">
                {data.description[language].map((p, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">&#127860;</span>
                <h2 className="text-lg font-bold text-gray-900">{L(data.samplePlan.title)}</h2>
              </div>

              <div className="space-y-4 mb-8">
                {data.samplePlan.meals.map((meal, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">{getMealLabel(meal.meal, language)}</h4>
                      <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">{meal.calories} kcal</span>
                    </div>
                    <ul className="space-y-1">
                      {meal.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-sage-400 rounded-full shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-lg">&#127947;&#65039;</span>
                {L(sectionLabel.workoutPlan)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {data.samplePlan.workout.map((w, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary-700">{w.day.slice(0, 3)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{w.activity}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 mb-3">
                {L(sectionLabel.healthTips)}
              </h3>
              <ul className="space-y-2">
                {data.samplePlan.tips[language].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-sage-500 mt-0.5">&#10003;</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <MedicalDisclaimer />
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-24 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{data.icon}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{L(sectionLabel.personalizedPlan)}</h3>
              <p className="text-sm text-gray-500 mb-6 px-2">
                {L(sectionLabel.planDesc)}
              </p>
              <Link
                to={data.ctaLink}
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-base"
              >
                {L(data.ctaButtonLabel)}
              </Link>
              <p className="text-xs text-gray-400 mt-3">
                {L(sectionLabel.free)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoLandingPage;
