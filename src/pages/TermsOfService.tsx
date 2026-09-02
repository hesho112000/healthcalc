import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { termsOfServiceDocs, getLegalDoc } from '../i18n/legal';

const TermsOfService: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const doc = getLegalDoc(language, termsOfServiceDocs);

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir={dir}>
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <span className="text-xs font-medium text-gray-200">{doc.badge}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('termsOfService')}</h1>
          <p className="text-gray-300 text-sm mt-2">{doc.updated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
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

export default TermsOfService;