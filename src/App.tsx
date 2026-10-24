import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import InstallBanner from './components/layout/InstallBanner';
import CookieConsentBanner from './components/common/CookieConsentBanner';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingFallback from './components/LoadingFallback';
import { AppRoutes } from './routes';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AdminProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <Suspense fallback={<LoadingFallback />}>
                    <AppRoutes />
                  </Suspense>
                </main>
                <Footer />
                <InstallBanner />
                <CookieConsentBanner />
              </div>
            </BrowserRouter>
        </SubscriptionProvider>
        </AuthProvider>
      </AdminProvider>
    </LanguageProvider>
  );
};

export default App;
