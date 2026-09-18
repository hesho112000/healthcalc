import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import ProtectedRoute from '../components/ProtectedRoute';
import LoadingFallback from '../components/LoadingFallback';

const HomePage = lazy(() => import('../pages/HomePage'));
const AdminLoginPage = lazy(() => import('../pages/AdminLoginPage'));
const WeightLossPage = lazy(() => import('../pages/WeightLossPage'));
const DiabetesPage = lazy(() => import('../pages/DiabetesPage'));
const LegacyAdvancedCarePage = lazy(() => import('../pages/LegacyAdvancedCarePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../pages/TermsOfService'));
const MedicalDisclaimerPage = lazy(() => import('../pages/MedicalDisclaimerPage'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const FitnessPage = lazy(() => import('../pages/FitnessPage'));
const WorkoutPlanPage = lazy(() => import('../pages/WorkoutPlanPage'));
const SmartwatchSyncPage = lazy(() => import('../pages/SmartwatchSyncPage'));
const FoodLibraryPage = lazy(() => import('../pages/FoodLibraryPage'));
const HealthUniversePage = lazy(() => import('../pages/HealthUniversePage'));
const AdvancedLabPage = lazy(() => import('../pages/AdvancedLabPage'));
const AdvancedCareWizardPage = lazy(() => import('../pages/AdvancedCareWizardPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const PlanDashboardPage = lazy(() => import('../pages/PlanDashboardPage'));
const MyHealthHubPage = lazy(() => import('../pages/MyHealthHubPage'));
const SubscriptionPage = lazy(() => import('../pages/SubscriptionPage'));
const OrganHubPage = lazy(() => import('../pages/OrganHubPage'));
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

const SimplePage: React.FC<{ emoji: string; titleKey: keyof typeof translations.en; descKey: keyof typeof translations.en }> = ({ emoji, titleKey, descKey }) => {
  const { t } = useLanguage();
  return (
    <div className="px-4" style={{ padding: '120px 24px 80px', background: 'var(--bg-primary)', minHeight: '70vh' }}>
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

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weight-loss" element={<WeightLossPage />} />
      <Route path="/diabetes" element={<DiabetesPage />} />
      <Route path="/premium" element={<LegacyAdvancedCarePage />} />
      <Route path="/fitness" element={<FitnessPage />} />
      <Route path="/bmi" element={<FitnessPage />} />
      <Route path="/bmr" element={<FitnessPage />} />
      <Route path="/ideal-weight" element={<FitnessPage />} />
      <Route path="/calories" element={<FitnessPage />} />
      <Route path="/workout-plan" element={<WorkoutPlanPage />} />
      <Route path="/smartwatch-sync" element={<SmartwatchSyncPage />} />
      <Route path="/food-library" element={<FoodLibraryPage />} />
      <Route path="/advanced-care" element={<HealthUniversePage />} />
      <Route path="/advanced-care/:organId" element={<OrganHubPage />} />
      <Route path="/advanced-care/lab" element={<AdvancedLabPage />} />
      <Route path="/advanced-care/wizard" element={<AdvancedCareWizardPage />} />
      <Route path="/advanced-care/wizard/signup" element={<SignupPage />} />
      <Route path="/dashboard/plan" element={<PlanDashboardPage />} />
      <Route path="/my-health-hub" element={<MyHealthHubPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
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
      <Route path="/contact" element={<ContactUs />} />

      <Route path="/plan" element={<SimplePage emoji="📋" titleKey="spPlanTitle" descKey="spPlanDesc" />} />
      <Route path="/tracking" element={<SimplePage emoji="📈" titleKey="spTrackingTitle" descKey="spTrackingDesc" />} />
      <Route path="/bio-age" element={<SimplePage emoji="🫀" titleKey="spBioAgeTitle" descKey="spBioAgeDesc" />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resources/article/:slug" element={<ArticlePage />} />
      <Route path="/resources/recipe/:slug" element={<RecipePage />} />
      <Route path="/resources/exercise/:slug" element={<ExerciseGuidePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<SimplePage emoji="💬" titleKey="spFaqTitle" descKey="spFaqDesc" />} />
      <Route path="/wizard/step1" element={<StaticStepPage step={1} />} />
      <Route path="/wizard/step2" element={<StaticStepPage step={2} />} />
      <Route path="/Personal-Data-Entry-Step1" element={<StaticStepPage step={1} />} />
      <Route path="/Personal-Data-Entry-Step2" element={<StaticStepPage step={2} />} />

      <Route path="/admin" element={<Navigate to="/admin-login" replace />} />

      <Route path="/:lang/landing/:slug" element={<LocalizedSeoPage />} />
      <Route path="/health-guide/:slug" element={<LegacySeoRedirect />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);