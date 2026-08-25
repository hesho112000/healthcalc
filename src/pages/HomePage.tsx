import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const modules = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      title: t('module1Title'),
      desc: t('module1Desc'),
      link: '/weight-loss',
      bgIcon: 'bg-primary-50 text-primary-600',
      badge: 'FREE',
      badgeClass: 'badge-sage',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: t('module2Title'),
      desc: t('module2Desc'),
      link: '/diabetes',
      bgIcon: 'bg-rose-50 text-rose-600',
      badge: 'FREE',
      badgeClass: 'badge-sage',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: t('module3Title'),
      desc: t('module3Desc'),
      link: '/premium',
      bgIcon: 'bg-amber-50 text-amber-600',
      badge: 'PRO',
      badgeClass: 'badge-amber',
    },
  ];

  const features = [
    { icon: '🧬', title: t('homeScienceBased'), desc: t('homeScienceBasedDesc') },
    { icon: '🌍', title: t('homeMultiLang'), desc: t('homeMultiLangDesc') },
    { icon: '🔒', title: t('homePrivacyFirst'), desc: t('homePrivacyFirstDesc') },
    { icon: '📱', title: t('homeMobileFriendly'), desc: t('homeMobileFriendlyDesc') },
    { icon: '⚡', title: t('homeInstantResults'), desc: t('homeInstantResultsDesc') },
    { icon: '💊', title: t('homeLabInterpreter'), desc: t('homeLabInterpreterDesc') },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-sage-50/60" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sage-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/60 shadow-soft mb-8">
              <span className="w-2 h-2 bg-sage-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('homeAIPill')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              {t('heroTitle').split(' ').map((word, i) => (
                <span key={i}>
                  {(word.toLowerCase().includes('personalized') || word.toLowerCase().includes('personnalisé') || word.toLowerCase().includes('personalizado')) ? (
                    <span className="text-gradient-brand">{word} </span>
                  ) : (
                    <>{word} </>
                  )}
                </span>
              ))}
            </h1>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/weight-loss" className="btn-primary text-base py-3.5 px-8">
                {t('heroCTA')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link to="/diabetes" className="btn-outline text-base py-3.5 px-8">
                {t('diabetes')} Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('homeHowItWorks')}</h2>
          <p className="section-subtitle">{t('homeHowItWorksDesc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-sage-200 to-primary-200" />
          {[
            { step: '01', icon: '📝', title: t('homeEnterProfile'), desc: t('homeEnterProfileDesc') },
            { step: '02', icon: '🧬', title: t('homeGetPlan'), desc: t('homeGetPlanDesc') },
            { step: '03', icon: '📊', title: t('homeTrackAdapt'), desc: t('homeTrackAdaptDesc') },
          ].map((item, i) => (
            <div key={i} className="relative text-center card-hover p-7">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-2xl mb-4 relative z-10">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div className="text-xs font-black text-primary-400 uppercase tracking-widest mb-2">{t('homeStep')} {item.step}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('healthTools')}</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            {t('healthToolsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {modules.map((mod, index) => (
            <Link
              key={index}
              to={mod.link}
              className="card-hover group p-7"
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 ${mod.bgIcon} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {mod.icon}
                </div>
                <span className={mod.badgeClass}>{mod.badge}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{mod.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{mod.desc}</p>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                {t('getStarted')}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8 Health Conditions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('homeSpecializedPlans')}</h2>
          <p className="section-subtitle">{t('homeSpecializedPlansDesc')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: '⚖️', title: t('weightLoss'), desc: t('homeWeightLossDesc'), link: '/weight-loss' },
            { icon: '🩸', title: t('diabetes'), desc: t('homeDiabetesDesc'), link: '/diabetes' },
            { icon: '❤️', title: t('homeHypertension'), desc: t('homeHypertensionDesc'), link: '/premium' },
            { icon: '🫀', title: t('homeCholesterol'), desc: t('homeCholesterolDesc'), link: '/premium' },
            { icon: '🧪', title: t('homeLiver'), desc: t('homeLiverDesc'), link: '/premium' },
            { icon: '🫘', title: t('homeKidney'), desc: t('homeKidneyDesc'), link: '/premium' },
            { icon: '🦴', title: t('homeGout'), desc: t('homeGoutDesc'), link: '/premium' },
            { icon: '🫁', title: t('homeIBS'), desc: t('homeIBSDesc'), link: '/premium' },
            { icon: '⌚', title: t('swNav'), desc: t('homeSmartwatchDesc'), link: '/smartwatch-sync' },
          ].map((c, i) => (
            <Link key={i} to={c.link} className="card-hover p-5 text-center group">
              <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-300">{c.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{c.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50/80 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('homeWhyTitle')}</h2>
            <p className="section-subtitle">{t('homeWhySubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div key={i} className="card flex items-start gap-4 p-6">
                <span className="text-2xl mt-0.5">{feat.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="card bg-gradient-to-br from-gray-50 to-white p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="section-title">{t('homeGuidelinesTitle')}</h2>
            <p className="section-subtitle">{t('homeGuidelinesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'ADA', full: 'American Diabetes Association', color: 'text-primary-600' },
              { name: 'DASH', full: 'Dietary Approaches to Stop Hypertension', color: 'text-sage-600' },
              { name: 'USDA', full: 'US Department of Agriculture', color: 'text-amber-600' },
              { name: 'ACSM', full: 'American College of Sports Medicine', color: 'text-purple-600' },
            ].map((g, i) => (
              <div key={i} className="text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-soft">
                <div className={`text-2xl font-black ${g.color} mb-2`}>{g.name}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{g.full}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
