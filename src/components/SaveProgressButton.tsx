import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../utils/api';

interface SaveProgressButtonProps {
  module: string;
  inputs: any;
  results: any;
  className?: string;
}

const SaveProgressButton: React.FC<SaveProgressButtonProps> = ({ module, inputs, results, className = '' }) => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200 transition-all ${className}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {t('loginToSave')}
      </Link>
    );
  }

  const handleSave = async () => {
    setStatus('saving');
    setErrorMsg('');
    try {
      await api.saveHealthData(module, inputs, results);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || t('failedToSave'));
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  if (status === 'saved') {
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-sage-50 text-sage-700 border border-sage-200 ${className}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {t('saved')}
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <button
        onClick={handleSave}
        disabled={status === 'saving'}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 transition-all disabled:opacity-50"
      >
        {status === 'saving' ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
            {t('saving')}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {t('saveProgress')}
          </>
        )}
      </button>
      {status === 'error' && (
        <span className="text-[11px] text-red-500">{errorMsg}</span>
      )}
    </div>
  );
};

export default SaveProgressButton;
