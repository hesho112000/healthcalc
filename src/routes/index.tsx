import React from 'react';
import { Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { activateAdmin, deactivateAdmin, isAdmin } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import LocalizedSeoPage from '../components/LocalizedSeoPage';
import HomePage from '../pages/HomePage';
import WeightLossPage from '../pages/WeightLossPage';
import DiabetesPage from '../pages/DiabetesPage';
import PremiumPage from '../pages/PremiumPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import MedicalDisclaimerPage from '../pages/MedicalDisclaimerPage';
import ContactUs from '../pages/ContactUs';
import FitnessPage from '../pages/FitnessPage';
import WorkoutPlanPage from '../pages/WorkoutPlanPage';
import SmartwatchSyncPage from '../pages/SmartwatchSyncPage';
import FoodLibraryPage from '../pages/FoodLibraryPage';
import AdvancedCarePage from '../pages/AdvancedCarePage';
import SearchPage from '../pages/SearchPage';

const LegacySeoRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/en/landing/${slug}`} replace />;
};

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🔍</span>
        </div>
        <h1 className="text-6xl font-extrabold text-gray-200 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-3">{t('notFoundTitle')}</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">{t('notFoundDesc')}</p>
        <Link to="/" className="btn-primary text-base py-3.5 px-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
};

const SimplePage: React.FC<{ emoji: string; title: string; desc: string }> = ({ emoji, title, desc }) => (
  <div className="px-4" style={{ padding: '120px 24px 80px', background: 'var(--bg-primary)', minHeight: '70vh' }}>
    <div className="container text-center" style={{ maxWidth: 760 }}>
      <div style={{ width: 88, height: 88, margin: '0 auto 20px', background: 'var(--primary)', color: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{emoji}</div>
      <h1 style={{ color: 'var(--primary)', fontSize: 30, marginBottom: 12 }}>{title}</h1>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 28 }}>{desc}</p>
      <Link to="/" className="btn-gold" style={{ textDecoration: 'none' }}>العودة للرئيسية</Link>
    </div>
  </div>
);

const StaticStepPage: React.FC<{ step: number }> = ({ step }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-primary)' }}>
    <iframe
      src={`${import.meta.env.BASE_URL}Personal-Data-Entry-Step${step}.html`}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title={`Personal Data Entry Step ${step}`}
    />
  </div>
);

const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const active = isAdmin();

  const handleToggle = () => {
    if (active) {
      deactivateAdmin();
    } else {
      activateAdmin();
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="text-center max-w-sm animate-fade-in">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🛡️</span>
        </div>
        <h1 className="text-xl font-extrabold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-sm text-gray-500 mb-6">Developer mode bypass for premium features.</p>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold mb-6 ${active ? 'bg-sage-100 text-sage-700' : 'bg-gray-100 text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${active ? 'bg-sage-500' : 'bg-gray-400'}`} />
          {active ? 'Admin Mode: ON' : 'Admin Mode: OFF'}
        </div>
        <br />
        <button
          onClick={handleToggle}
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${active ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
        >
          {active ? 'Deactivate Admin' : 'Activate Admin'}
        </button>
        <p className="text-[10px] text-gray-400 mt-4">dev_mode = ADMIN_2026</p>
      </div>
    </div>
  );
};

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/weight-loss" element={<WeightLossPage />} />
    <Route path="/diabetes" element={<DiabetesPage />} />
    <Route path="/premium" element={<PremiumPage />} />
    <Route path="/fitness" element={<FitnessPage />} />
    <Route path="/bmi" element={<FitnessPage />} />
    <Route path="/bmr" element={<FitnessPage />} />
    <Route path="/ideal-weight" element={<FitnessPage />} />
    <Route path="/calories" element={<FitnessPage />} />
    <Route path="/workout-plan" element={<WorkoutPlanPage />} />
    <Route path="/smartwatch-sync" element={<SmartwatchSyncPage />} />
    <Route path="/food-library" element={<FoodLibraryPage />} />
    <Route path="/advanced-care" element={<AdvancedCarePage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
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

    <Route path="/plan" element={<SimplePage emoji="📋" title="خطتي" desc="تابع خطتك الغذائية والحركية اليومية، وجدول وجباتك وأهدافك الأسبوعية في مكان واحد." />} />
    <Route path="/tracking" element={<SimplePage emoji="📈" title="تتبع الأمراض" desc="سجّل وتابع قياساتك يوميًا: ضغط الدم، السكري، الكوليسترول، وراقب اتجاهاتك الصحية بوضوح." />} />
    <Route path="/bio-age" element={<SimplePage emoji="🫀" title="حساب العمر الحيوي" desc="اكتشف عمرك الحيوي الحقيقي من بياناتك الصحية وأسلوب حياتك، واحصل على توصيات لتقليله." />} />
    <Route path="/articles" element={<SimplePage emoji="📰" title="المقالات" desc="مقالات التغذية العلاجية والصحة العامة، تحديثات أسبوعية من فريق بصمتك الحيوية." />} />
    <Route path="/about" element={<SimplePage emoji="🌿" title="عن المنصة" desc="بصمتك الحيوية منصة تغذية علاجية متكاملة لمتابعة الضغط والسكري والكوليسترول وتخصيص خطتك الصحية." />} />
    <Route path="/faq" element={<SimplePage emoji="💬" title="الأسئلة الشائعة" desc="إجابات واضحة على أكثر الأسئلة شيوعًا حول المنصة، والتتبع، والخصوصية، والاشتراك." />} />
    <Route path="/wizard/step1" element={<StaticStepPage step={1} />} />
    <Route path="/wizard/step2" element={<StaticStepPage step={2} />} />
    <Route path="/Personal-Data-Entry-Step1" element={<StaticStepPage step={1} />} />
    <Route path="/Personal-Data-Entry-Step2" element={<StaticStepPage step={2} />} />

    <Route path="/admin" element={<AdminPage />} />

    <Route path="/:lang/landing/:slug" element={<LocalizedSeoPage />} />
    <Route path="/health-guide/:slug" element={<LegacySeoRedirect />} />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);