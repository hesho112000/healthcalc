import React, { lazy } from 'react';
import { Routes, Route, Navigate, Link, useLocation, useParams } from 'react-router-dom';
import type { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import type { translations } from '../i18n/translations';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminProtectedRoute from '../components/AdminProtectedRoute';
import SEO from '../components/seo/SEO';
import { ENABLE_PREMIUM } from '../config/featureFlags';

const DiscoverPage = lazy(() => import('../pages/DiscoverPage'));
const CalculatorHub = lazy(() => import('../pages/CalculatorHub'));
const AdminLoginPage = lazy(() => import('../pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage'));
const WeightLossPage = lazy(() => import('../pages/WeightLossPage'));
const DiabetesPage = lazy(() => import('../pages/DiabetesPage'));
const LegacyAdvancedCarePage = ENABLE_PREMIUM ? lazy(() => import('../pages/LegacyAdvancedCarePage')) : null;
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../pages/TermsOfService'));
const MedicalDisclaimerPage = lazy(() => import('../pages/MedicalDisclaimerPage'));
const CookiePolicy = lazy(() => import('../pages/CookiePolicy'));
const ContactUs = lazy(() => import('../pages/ContactUs'));

const WorkoutPlanPage = lazy(() => import('../pages/WorkoutPlanPage'));
const SmartwatchSyncPage = lazy(() => import('../pages/SmartwatchSyncPage'));
const FoodLibraryPage = lazy(() => import('../pages/FoodLibraryPage'));
const DishDetailPage = lazy(() => import('../pages/DishDetailPage'));
const HealthUniversePage = ENABLE_PREMIUM ? lazy(() => import('../pages/HealthUniversePage')) : null;
const AdvancedLabPage = ENABLE_PREMIUM ? lazy(() => import('../pages/AdvancedLabPage')) : null;
const AdvancedCareWizardPage = ENABLE_PREMIUM ? lazy(() => import('../pages/AdvancedCareWizardPage')) : null;
const SignupPage = lazy(() => import('../pages/SignupPage'));
const PlanDashboardPage = lazy(() => import('../pages/PlanDashboardPage'));
const MyHealthHubPage = ENABLE_PREMIUM ? lazy(() => import('../pages/MyHealthHubPage')) : null;
const SubscriptionPage = ENABLE_PREMIUM ? lazy(() => import('../pages/SubscriptionPage')) : null;
const OrganHubPage = ENABLE_PREMIUM ? lazy(() => import('../pages/OrganHubPage')) : null;
const SearchPage = lazy(() => import('../pages/SearchPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ResourcesPage = lazy(() => import('../pages/ResourcesPage'));
const ArticlePage = lazy(() => import('../pages/ArticlePage'));
const RecipePage = lazy(() => import('../pages/RecipePage'));
const ExerciseGuidePage = lazy(() => import('../pages/ExerciseGuidePage'));
const LocalizedSeoPage = lazy(() => import('../components/LocalizedSeoPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const LegacySeoRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/en/landing/${slug}`} replace />;
};

const SUPPORTED_PREFIXES = new Set<string>(['en', 'fr', 'es', 'ar', 'hi', 'de']);

/**
 * Handles the path-based locale URLs advertised through hreflang
 * (`/fr/resources`, `/hi/fitness`, ...). The language is applied and the
 * visitor is routed to the matching page without the prefix.
 */
const LanguagePrefixLayout: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();

  React.useEffect(() => {
    if (lang && SUPPORTED_PREFIXES.has(lang) && language !== lang) {
      setLanguage(lang as Language);
    }
  }, [lang, language, setLanguage]);

  if (!lang || !SUPPORTED_PREFIXES.has(lang)) {
    return <NotFoundPage />;
  }

  return <InnerRoutes />;
};

interface SimplePageProps {
  emoji: string;
  titleKey: keyof typeof translations.en;
  descKey: keyof typeof translations.en;
  seoTitle: string;
  seoDescription: string;
  url: string;
}

const SimplePage: React.FC<SimplePageProps> = ({ emoji, titleKey, descKey, seoTitle, seoDescription, url }) => {
  const { t } = useLanguage();
  return (
    <div className="px-4" style={{ padding: '120px 24px 80px', background: 'var(--bg-primary)', minHeight: '70vh' }}>
      <SEO title={seoTitle} description={seoDescription} url={url} />
      <div className="container text-center" style={{ maxWidth: 760 }}>
        <div style={{ width: 88, height: 88, margin: '0 auto 20px', background: 'var(--primary)', color: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{emoji}</div>
        <h1 style={{ color: 'var(--primary)', fontSize: 30, marginBottom: 12 }}>{t(titleKey)}</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 28 }}>{t(descKey)}</p>
        <Link to="/" className="btn-gold" style={{ textDecoration: 'none' }}>{t('spBackHome')}</Link>
      </div>
    </div>
  );
};

const StaticStepPage: React.FC<{ step: number }> = ({ step }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-primary)' }}>
    <iframe
      src={`${import.meta.env.BASE_URL}Personal-Data-Entry-Step${step}.html`}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title={`Personal Data Entry Step ${step}`}
    />
  </div>
);

const InnerRoutes: React.FC = () => (
    <Routes>
      <Route path="/" element={<CalculatorHub />} />
      <Route path="/meal-planner" element={<DiscoverPage />} />
      <Route path="/calculator" element={<Navigate to="/" replace />} />
      <Route path="/discover" element={<Navigate to="/meal-planner" replace />} />
      <Route path="/fitness-calculator" element={<Navigate to="/" replace />} />
      <Route path="/bmi" element={<Navigate to="/?tab=bmi" replace />} />
      <Route path="/bmr" element={<Navigate to="/?tab=bmr" replace />} />
      <Route path="/calories" element={<Navigate to="/?tab=calories" replace />} />
      <Route path="/body-fat" element={<Navigate to="/?tab=body-fat" replace />} />
      <Route path="/ideal-weight" element={<Navigate to="/?tab=ideal-weight" replace />} />
      <Route path="/meal-plan" element={<WeightLossPage />} />
      <Route path="/weight-loss" element={<WeightLossPage />} />
      <Route path="/diabetes" element={<DiabetesPage />} />
      {LegacyAdvancedCarePage && <Route path="/premium" element={<LegacyAdvancedCarePage />} />}
      <Route path="/fitness" element={<Navigate to="/" replace />} />
      <Route path="/workout-plan" element={<WorkoutPlanPage />} />
      <Route path="/smartwatch-sync" element={<SmartwatchSyncPage />} />
      <Route path="/food-library" element={<FoodLibraryPage />} />
      <Route path="/food-library/:id" element={<DishDetailPage />} />
      {HealthUniversePage && <Route path="/advanced-care" element={<ProtectedRoute><HealthUniversePage /></ProtectedRoute>} />}
      {OrganHubPage && <Route path="/advanced-care/:organId" element={<ProtectedRoute><OrganHubPage /></ProtectedRoute>} />}
      {AdvancedLabPage && <Route path="/advanced-care/lab" element={<ProtectedRoute><AdvancedLabPage /></ProtectedRoute>} />}
      {AdvancedCareWizardPage && <Route path="/advanced-care/wizard" element={<ProtectedRoute><AdvancedCareWizardPage /></ProtectedRoute>} />}
      {ENABLE_PREMIUM && <Route path="/advanced-care/wizard/signup" element={<SignupPage />} />}
      <Route path="/dashboard/plan" element={<ProtectedRoute><PlanDashboardPage /></ProtectedRoute>} />
      {MyHealthHubPage && <Route path="/my-health-hub" element={<ProtectedRoute><MyHealthHubPage /></ProtectedRoute>} />}
      {SubscriptionPage && <Route path="/subscription" element={<SubscriptionPage />} />}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard/:section"
        element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/disclaimer" element={<MedicalDisclaimerPage />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/contact" element={<ContactUs />} />

      <Route path="/plan" element={<SimplePage
        emoji="📋"
        titleKey="spPlanTitle"
        descKey="spPlanDesc"
        seoTitle="Your Health Plan"
        seoDescription="View and manage your personalized health plan."
        url="/plan"
      />} />
      <Route path="/tracking" element={<SimplePage
        emoji="📈"
        titleKey="spTrackingTitle"
        descKey="spTrackingDesc"
        seoTitle="Health Tracking"
        seoDescription="Track your daily health metrics."
        url="/tracking"
      />} />
      <Route path="/bio-age" element={<SimplePage
        emoji="🫀"
        titleKey="spBioAgeTitle"
        descKey="spBioAgeDesc"
        seoTitle="Biological Age Calculator"
        seoDescription="Calculate your biological age."
        url="/bio-age"
      />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resources/article/:slug" element={<ArticlePage />} />
      <Route path="/resources/recipe/:slug" element={<RecipePage />} />
      <Route path="/resources/exercise/:slug" element={<ExerciseGuidePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<SimplePage
        emoji="💬"
        titleKey="spFaqTitle"
        descKey="spFaqDesc"
        seoTitle="Frequently Asked Questions"
        seoDescription="Find answers to common questions."
        url="/faq"
      />} />
      <Route path="/wizard/step1" element={<StaticStepPage step={1} />} />
      <Route path="/wizard/step2" element={<StaticStepPage step={2} />} />
      <Route path="/Personal-Data-Entry-Step1" element={<StaticStepPage step={1} />} />
      <Route path="/Personal-Data-Entry-Step2" element={<StaticStepPage step={2} />} />

      <Route path="/landing/:slug" element={<LocalizedSeoPage />} />
      <Route path="/health-guide/:slug" element={<LegacySeoRedirect />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export const AppRoutes: React.FC = () => (
    <Routes>
      <Route path="/:lang/landing/:slug" element={<LocalizedSeoPage />} />
      <Route path="/:lang/*" element={<LanguagePrefixLayout />} />
      <Route path="/*" element={<InnerRoutes />} />
    </Routes>
);
