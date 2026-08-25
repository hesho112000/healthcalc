import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TermsOfService: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <span className="text-xs font-medium text-gray-200">Legal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('termsOfService')}</h1>
          <p className="text-gray-300 text-sm mt-2">Last updated: January 1, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="card animate-fade-in">
          <div className="prose prose-sm max-w-none space-y-8 text-gray-700">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm leading-relaxed">By accessing and using HealthCalc.ai, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Medical Disclaimer</h2>
              <p className="text-sm leading-relaxed">HealthCalc.ai provides information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician before starting any diet or workout program. The calculations and recommendations provided are based on general guidelines (ADA, DASH, USDA, ACSM) and may not be suitable for all individuals.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Use of Service</h2>
              <p className="text-sm leading-relaxed">You agree to use HealthCalc.ai only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of the service does not violate any applicable laws or regulations.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
              <p className="text-sm leading-relaxed">All content, features, and functionality of HealthCalc.ai, including but not limited to text, graphics, logos, icons, images, data compilations, and software, are the exclusive property of HealthCalc.ai and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p className="text-sm leading-relaxed">In no event shall HealthCalc.ai be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We shall not be responsible for any health decisions made based on the information provided by our calculators.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Accuracy of Information</h2>
              <p className="text-sm leading-relaxed">While we strive to provide accurate calculations based on recognized medical guidelines, we make no warranties about the completeness, reliability, or accuracy of this information. The results should be used as general guidelines only.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Third-Party Links</h2>
              <p className="text-sm leading-relaxed">Our service may contain links to third-party websites or services (including advertisements). We are not responsible for the content, privacy policies, or practices of any third-party sites or services.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
              <p className="text-sm leading-relaxed">We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">9. Governing Law</h2>
              <p className="text-sm leading-relaxed">These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">10. Contact</h2>
              <p className="text-sm leading-relaxed">For questions about these Terms, contact us at <a href="mailto:legal@healthcalc.ai" className="text-primary-600 hover:text-primary-700 underline">legal@healthcalc.ai</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
