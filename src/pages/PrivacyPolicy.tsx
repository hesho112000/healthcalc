import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <span className="text-xs font-medium text-gray-200">Legal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('privacyPolicy')}</h1>
          <p className="text-gray-300 text-sm mt-2">Last updated: January 1, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="card animate-fade-in">
          <div className="prose prose-sm max-w-none space-y-8 text-gray-700">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="text-sm leading-relaxed">HealthCalc.ai is designed with privacy in mind. All health calculations are performed locally in your browser. We do not collect, store, or transmit any personal health information you enter into our calculators.</p>
              <p className="text-sm leading-relaxed mt-2">We may collect non-personal information such as:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm mt-3">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. How We Use Information</h2>
              <p className="text-sm leading-relaxed">Non-personal information is used solely for:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm mt-3">
                <li>Improving our website and user experience</li>
                <li>Analytics to understand usage patterns</li>
                <li>Serving relevant advertisements through Google AdSense</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Cookies and Advertising</h2>
              <p className="text-sm leading-relaxed">We use cookies for functionality and to serve personalized ads through Google AdSense. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet.</p>
              <p className="text-sm leading-relaxed mt-2">You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Data Security</h2>
              <p className="text-sm leading-relaxed">We implement appropriate security measures to protect the non-personal information we collect. However, no method of transmission over the Internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Third-Party Services</h2>
              <p className="text-sm leading-relaxed">We use Google AdSense for advertising. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting the Google Ads Settings page.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Children's Privacy</h2>
              <p className="text-sm leading-relaxed">Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Changes to This Policy</h2>
              <p className="text-sm leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated effective date.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Contact Us</h2>
              <p className="text-sm leading-relaxed">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@healthcalc.ai" className="text-primary-600 hover:text-primary-700 underline">privacy@healthcalc.ai</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
