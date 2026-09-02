import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import InstallBanner from './components/layout/InstallBanner';
import { AppRoutes } from './routes';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
            <InstallBanner />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;