import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
}

const BASE_URL = 'https://hesho112000.github.io/healthcalc';
const DEFAULT_IMAGE = `${BASE_URL}/assets/og-image.png`;

const LANGUAGES: Array<{ lang: string; label: string }> = [
  { lang: 'en', label: 'English' },
  { lang: 'ar', label: 'العربية' },
  { lang: 'es', label: 'Español' },
  { lang: 'fr', label: 'Français' },
  { lang: 'de', label: 'Deutsch' },
];

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  locale,
}) => {
  const { language } = useLanguage();
  const fullTitle = `${title} | HealthCalc`;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const currentLocale = locale || language || 'en';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="HealthCalc" />
      <meta property="og:locale" content={currentLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {LANGUAGES.map(({ lang, label }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={`${fullUrl}?lang=${lang}`} title={label} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;