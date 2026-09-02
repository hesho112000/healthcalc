import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface Crumb { label: string; path?: string; }

const landingLanguages = ['en', 'fr', 'es', 'ar'];

const Breadcrumbs: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  type TranslationKey = Parameters<typeof t>[0];

  const landingSlugKeys: Record<string, TranslationKey> = {
    'weight-loss-hypertension': 'bcLandingWeightLossHypertension',
    'diabetes-meal-plan-40f': 'bcLandingDiabetesMealPlan40f',
    'muscle-building-80kg': 'bcLandingMuscleBuilding80kg',
    'pcos-weight-loss': 'bcLandingPcosWeightLoss',
    'keto-diabetes': 'bcLandingKetoDiabetes',
    'senior-fitness': 'bcLandingSeniorFitness',
    'post-pregnancy-weight-loss': 'bcLandingPostPregnancyWeightLoss',
    'athletic-performance': 'bcLandingAthleticPerformance',
  };

  const isLandingRoute =
    parts.length === 3 &&
    landingLanguages.includes(parts[0]) &&
    parts[1] === 'landing';

  const routeLabels: Record<string, string> = {
    '/': t('bcHome'),
    '/fitness': t('fcNav'),
    '/workout-plan': t('workoutPlan'),
    '/weight-loss': t('weightLoss'),
    '/diabetes': t('diabetes'),
    '/lab-to-plan': 'Lab-to-Plan',
    '/premium': t('premium'),
    '/login': t('headerSignIn'),
    '/register': t('headerSignUp'),
    '/dashboard': t('headerDashboard'),
    '/privacy': t('privacyPolicy'),
    '/terms': t('termsOfService'),
    '/disclaimer': t('medicalDisclaimer'),
    '/contact': t('contactUs'),
    '/smartwatch-sync': t('swNav'),
  };

  if (parts.length === 0) return null;

  const crumbs: Crumb[] = [{ label: t('bcHome'), path: '/' }];

  if (isLandingRoute) {
    const slug = parts[2];
    crumbs.push({ label: t('bcLanding'), path: `/${parts[0]}/landing` });
    const labelKey = landingSlugKeys[slug];
    crumbs.push({
      label: labelKey
        ? t(labelKey)
        : slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      path: `/${parts[0]}/landing/${slug}`,
    });
  } else {
    let builtPath = '';
    for (const part of parts) {
      builtPath += `/${part}`;
      const label = routeLabels[builtPath];
      if (label) {
        crumbs.push({ label, path: builtPath });
      }
    }
  }

  if (crumbs.length < 2) return null;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
      <ol className="flex items-center gap-1.5 text-xs text-gray-400">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
              {isLast || !crumb.path ? (
                <span className="font-medium text-gray-600">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="hover:text-primary-600 transition-colors">{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
