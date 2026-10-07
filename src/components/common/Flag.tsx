import React from 'react';

const COUNTRY_NAMES: Record<string, string> = {
  ae: 'United Arab Emirates', al: 'Albania', am: 'Armenia', ar: 'Argentina',
  at: 'Austria', au: 'Australia', ba: 'Bosnia and Herzegovina', bd: 'Bangladesh',
  be: 'Belgium', bg: 'Bulgaria', bh: 'Bahrain', br: 'Brazil', bw: 'Botswana',
  by: 'Belarus', ca: 'Canada', ch: 'Switzerland', cl: 'Chile', cn: 'China',
  co: 'Colombia', cr: 'Costa Rica', cu: 'Cuba', cz: 'Czechia', de: 'Germany',
  dk: 'Denmark', dz: 'Algeria', ee: 'Estonia', eg: 'Egypt', es: 'Spain',
  et: 'Ethiopia', fi: 'Finland', fr: 'France', ga: 'Gabon', gb: 'United Kingdom',
  ge: 'Georgia', gh: 'Ghana', gr: 'Greece', hu: 'Hungary', id: 'Indonesia',
  in: 'India', it: 'Italy', jp: 'Japan', jo: 'Jordan', ke: 'Kenya', kr: 'South Korea',
  kw: 'Kuwait', lb: 'Lebanon', lt: 'Lithuania', lv: 'Latvia', ly: 'Libya',
  ma: 'Morocco', md: 'Moldova', me: 'Montenegro', mk: 'North Macedonia',
  mu: 'Mauritius', my: 'Malaysia', mx: 'Mexico', ng: 'Nigeria', nl: 'Netherlands',
  no: 'Norway', nz: 'New Zealand', om: 'Oman', pe: 'Peru', ph: 'Philippines',
  pk: 'Pakistan', pl: 'Poland', ps: 'Palestine', qa: 'Qatar', ro: 'Romania',
  rs: 'Serbia', rw: 'Rwanda', sa: 'Saudi Arabia', sc: 'Seychelles', se: 'Sweden',
  si: 'Slovenia', sk: 'Slovakia', sy: 'Syria', th: 'Thailand', tn: 'Tunisia',
  tr: 'Turkey', tw: 'Taiwan', ua: 'Ukraine', us: 'United States', ve: 'Venezuela',
  vn: 'Vietnam', za: 'South Africa',
};

export function getCountryCode(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  if (/^[a-z]{2}$/.test(normalized)) return normalized;

  const indicators = Array.from(value, (character) => character.codePointAt(0) ?? 0);
  if (indicators.length !== 2 || indicators.some((point) => point < 0x1f1e6 || point > 0x1f1ff)) return null;

  return String.fromCharCode(...indicators.map((point) => point - 0x1f1e6 + 65)).toLowerCase();
}

export function isCountryCode(value: string): boolean {
  return /^[a-z]{2}$/i.test(value.trim());
}

export interface FlagProps {
  countryCode: string;
  alt?: string;
  className?: string;
}

const Flag: React.FC<FlagProps> = ({ countryCode, alt, className = '' }) => {
  const code = getCountryCode(countryCode);
  if (!code) return null;

  const countryName = COUNTRY_NAMES[code] ?? code.toUpperCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={alt ?? `${countryName} flag`}
      width={40}
      height={30}
      loading="lazy"
      decoding="async"
      className={`inline-block h-6 w-8 align-middle object-contain ${className}`.trim()}
    />
  );
};

export default Flag;
