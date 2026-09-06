import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const pages: { path: string; icon: string; title: string; keywords: string }[] = [
  { path: '/fitness', icon: '⚖️', title: 'Fitness & Health Calculator', keywords: 'bmi body mass index bmr basal metabolic rate ideal weight calories tdee fitness' },
  { path: '/smartwatch-sync', icon: '⌚', title: 'Smartwatch Sync', keywords: 'smartwatch apple health google health connect watch wearable tracker' },
  { path: '/weight-loss', icon: '🏋️', title: 'Weight & Fitness', keywords: 'weight loss meal plan workout calorie deficit plan' },
  { path: '/advanced-care', icon: '✨', title: 'Advanced Care', keywords: 'advanced care plans ibs gout kidney liver thyroid hypertension cholesterol care' },
  { path: '/lab-to-plan', icon: '🔬', title: 'Lab Interpretation', keywords: 'lab results blood work interpretation labs cholesterol thyroid blood sugar' },
  { path: '/diabetes', icon: '🩸', title: 'Diabetes Management', keywords: 'diabetes glucose hba1c blood sugar lab interpreter diabetes care' },
  { path: '/workout-plan', icon: '💪', title: 'Workout Plan Builder', keywords: 'workout exercise trainer gym strength cardio routine weekly plan' },
  { path: '/food-library', icon: '🍽️', title: 'Food Library', keywords: 'food library recipes calories meals food' },
  { path: '/login', icon: '👤', title: 'Login', keywords: 'login sign in account auth' },
  { path: '/register', icon: '📝', title: 'Register', keywords: 'register sign up signup account' },
  { path: '/privacy', icon: '🔒', title: 'Privacy Policy', keywords: 'privacy data protection gdpr' },
  { path: '/terms', icon: '📜', title: 'Terms of Service', keywords: 'terms conditions legal' },
  { path: '/contact', icon: '📧', title: 'Contact Us', keywords: 'contact support help email' },
];

const SearchPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim().toLowerCase();

  const results = q
    ? pages.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.path.toLowerCase().includes(q) ||
          p.keywords.toLowerCase().includes(q)
      )
    : pages;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-gray-900">{t('searchResultsTitle')}</h1>
        {q && <p className="text-sm text-gray-500 mt-1">{t('searchResultsFor')} “{q}”</p>}
        <div className="mt-6 space-y-3">
          {results.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-card border border-gray-100/80 p-10 text-center">
              <span className="text-4xl">🔍</span>
              <p className="text-sm text-gray-500 mt-3">
                {t('headerNoResults')} “{q}”
              </p>
              <p className="text-xs text-gray-400 mt-1">{t('searchPlaceholder')}</p>
            </div>
          ) : (
            results.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className="card-hover flex items-center gap-4 p-5"
              >
                <span className="text-2xl">{p.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.path}</p>
                </div>
                <span className="ml-auto shrink-0 text-gray-400">{dir === 'rtl' ? '←' : '→'}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;