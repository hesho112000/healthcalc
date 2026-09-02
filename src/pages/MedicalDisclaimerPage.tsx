import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { medicalDisclaimerDocs, getLegalDoc } from '../i18n/legal';

const MedicalDisclaimerPage: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const doc = getLegalDoc(language, medicalDisclaimerDocs);

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir={dir}>
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-amber-200 rounded-full" />
            <span className="text-xs font-medium text-amber-100">{doc.badge}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('medicalDisclaimer')}</h1>
          <p className="text-amber-100 text-sm mt-2">{doc.updated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 mb-8 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-amber-900 leading-relaxed">
              {doc.intro}
            </p>
          </div>
        </div>

        <div className="card animate-fade-in">
          <div className="prose prose-sm max-w-none space-y-8 text-gray-700">
            {doc.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{s.heading}</h2>
                <p className="text-sm leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimerPage;