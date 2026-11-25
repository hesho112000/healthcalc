import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getSupabaseClient } from '../../lib/supabaseClient';
import type { TranslationKeys } from '../../i18n/translationTypes';

const FooterNewsletter: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<keyof TranslationKeys | ''>('');
  const [statusType, setStatusType] = useState<'success' | 'warning' | 'error' | ''>('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setStatusMessage('');
    setStatusType('');

    try {
      const client = await getSupabaseClient();
      if (client) {
        const { error } = await client.from('subscribers').insert([{ email: email.trim(), source: 'Footer Newsletter' }]);
        if (!error) {
          setEmail('');
          setStatusMessage('common.subscribed');
          setStatusType('success');
        } else if ((error as any).code === '23505') {
          setStatusMessage('common.alreadySubscribed');
          setStatusType('warning');
        } else {
          setStatusMessage('common.errorTryAgain');
          setStatusType('error');
        }
      } else {
        setEmail('');
        setStatusMessage('common.subscribed');
        setStatusType('success');
      }
    } catch {
      setStatusMessage('common.errorTryAgain');
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="footer-form" onSubmit={handleSubscribe}>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          placeholder={t('footerEmailPlaceholder')}
          aria-label={t('footerEmailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? t('common.subscribing') : t('footerSubscribe')}
        </button>
      </form>
      {statusMessage && (
        <p className={`text-xs mt-2 ${
          statusType === 'success' ? 'text-green-300' :
          statusType === 'warning' ? 'text-amber-300' :
          'text-red-300'
        }`}>
          {t(statusMessage)}
        </p>
      )}
    </>
  );
};

export default FooterNewsletter;
