import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LocalizedSeoPage from './components/LocalizedSeoPage';
import HomePage from './pages/HomePage';
import WeightLossPage from './pages/WeightLossPage';
import DiabetesPage from './pages/DiabetesPage';
import PremiumPage from './pages/PremiumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import MedicalDisclaimerPage from './pages/MedicalDisclaimerPage';
import ContactUs from './pages/ContactUs';
import LabToPlanPage from './pages/LabToPlanPage';
import FitnessPage from './pages/FitnessPage';
import SmartwatchSyncPage from './pages/SmartwatchSyncPage';
import InstallBanner from './components/InstallBanner';

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

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weight-loss" element={<WeightLossPage />} />
          <Route path="/diabetes" element={<DiabetesPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/lab-to-plan" element={<LabToPlanPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/smartwatch-sync" element={<SmartwatchSyncPage />} />
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

          <Route path="/:lang/landing/:slug" element={<LocalizedSeoPage />} />
          <Route path="/health-guide/:slug" element={<LegacySeoRedirect />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <InstallBanner />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
