import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import InstallBanner from './components/layout/InstallBanner';
import CookieConsentBanner from './components/common/CookieConsentBanner';
import { AppRoutes } from './routes';

const AppShell: React.FC = () => {
  const { pathname } = useLocation();
  const isPreview = pathname === '/ui-preview';

  return (
    <div className="min-h-screen flex flex-col">
      {!isPreview && <Header />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!isPreview && <Footer />}
      {!isPreview && <InstallBanner />}
      {!isPreview && <CookieConsentBanner />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AdminProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AppShell />
            </Router>
        </SubscriptionProvider>
        </AuthProvider>
      </AdminProvider>
    </LanguageProvider>
  );
};

export default App;
