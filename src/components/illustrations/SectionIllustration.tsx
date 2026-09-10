import React from 'react';

export type SectionIllustrationKind = 'calculator' | 'plan' | 'care' | 'smartwatch';

const Emerald = '#0F4C3A';
const Gold = '#D4AF37';
const Beige = '#F4F1EB';
const White = '#FFFFFF';

const labels: Record<SectionIllustrationKind, string> = {
  calculator: 'Health dashboard illustration',
  plan: 'Personal plan illustration',
  care: 'Compassionate care illustration',
  smartwatch: 'Smartwatch sync illustration',
};

const bgGrad = (kind: SectionIllustrationKind, id: string) => (
  <radialGradient id={id} cx="50%" cy="40%" r="70%">
    <stop offset="0%" stopColor={Emerald} stopOpacity="0.05" />
    <stop offset="100%" stopColor={Emerald} stopOpacity="0" />
  </radialGradient>
);

const Background: React.FC<{ kind: SectionIllustrationKind }> = ({ kind }) => {
  const id = `si-bg-${kind}`;
  return (
    <>
      <defs>{bgGrad(kind, id)}</defs>
      <rect width="400" height="400" rx="36" fill={`url(#${id})`} />
    </>
  );
};

const CalculatorScene: React.FC = () => (
  <>
    <rect x="95" y="70" width="210" height="252" rx="26" fill={White} stroke={Emerald} strokeOpacity="0.12" strokeWidth="2" />
    <rect x="150" y="84" width="100" height="7" rx="3.5" fill={Gold} />
    <circle cx="150" cy="140" r="28" fill={Beige} />
    <circle cx="150" cy="130" r="10" fill={Emerald} fillOpacity="0.85" />
    <path d="M130 160 a20 20 0 0 1 40 0 z" fill={Emerald} fillOpacity="0.85" />
    <rect x="192" y="128" width="86" height="9" rx="4.5" fill={Emerald} fillOpacity="0.16" />
    <rect x="192" y="143" width="58" height="9" rx="4.5" fill={Emerald} fillOpacity="0.1" />
    <text x="110" y="226" fill={Emerald} fontSize="46" fontWeight="800" fontFamily="inherit">22.5</text>
    <text x="112" y="244" fill={Emerald} fillOpacity="0.6" fontSize="14" fontWeight="700" fontFamily="inherit">BMI</text>
    <rect x="230" y="248" width="100" height="4" rx="2" fill={Emerald} fillOpacity="0.22" />
    <rect x="238" y="196" width="20" height="48" rx="7" fill={Gold} />
    <rect x="270" y="164" width="20" height="80" rx="7" fill={Emerald} opacity="0.85" />
    <rect x="302" y="210" width="20" height="34" rx="7" fill={Emerald} fillOpacity="0.35" />
    <path d="M296 96 l8 16 18 2 -13 12 4 18 -17 -9 -17 9 4 -18 -13 -12 18 -2 z" fill={Gold} opacity="0.9" />
  </>
);

const PlanScene: React.FC = () => (
  <>
    <rect x="64" y="66" width="184" height="244" rx="26" fill={White} stroke={Emerald} strokeOpacity="0.12" strokeWidth="2" />
    <circle cx="88" cy="90" r="7" fill={Gold} />
    <rect x="104" y="85" width="120" height="9" rx="4.5" fill={Emerald} fillOpacity="0.18" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <circle cx="92" cy={152 + i * 44} r="13" fill={Beige} stroke={Emerald} strokeOpacity="0.2" strokeWidth="2" />
        <path d={`M${84 + 8 * 1} ${152 + i * 44 - 1} l4 5 8 -10`} stroke={Gold} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="116" y={142 + i * 44} width={i === 1 ? 72 : 96} height="8" rx="4" fill={Emerald} fillOpacity={i === 2 ? 0.14 : 0.22} />
        <rect x="116" y={157 + i * 44} width={i === 2 ? 56 : 80} height="7" rx="3.5" fill={Emerald} fillOpacity="0.09" />
      </g>
    ))}
    <circle cx="302" cy="158" r="58" fill={White} stroke={Gold} strokeWidth="7" />
    <circle cx="302" cy="146" r="26" fill={Emerald} opacity="0.8" />
    <circle cx="312" cy="168" r="18" fill={Beige} />
    <circle cx="292" cy="164" r="8" fill={Gold} />
    <g transform="rotate(45 302 322)">
      <rect x="284" y="306" width="36" height="10" rx="5" fill={Gold} />
      <rect x="274" y="296" width="14" height="30" rx="7" fill={Emerald} />
      <rect x="316" y="296" width="14" height="30" rx="7" fill={Emerald} />
    </g>
  </>
);

const CareScene: React.FC = () => (
  <>
    <circle cx="200" cy="180" r="118" fill={White} stroke={Emerald} strokeOpacity="0.08" strokeWidth="2" />
    <path
      d="M200 96 C 212 68 252 58 276 84 C 306 114 302 166 200 252 C 98 166 94 114 124 84 C 148 58 188 68 200 96 Z"
      fill={White}
      stroke={Emerald}
      strokeWidth="7"
      strokeLinejoin="round"
    />
    <polyline
      points="148,172 172,172 186,150 198,204 214,122 228,172 252,172"
      fill="none"
      stroke={Gold}
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {[104, 184, 264, 344].map((cx, i) => {
      const cy = 318;
      const glyphs: React.ReactNode[] = [
        <path key="drop" d={`M${cx} ${cy - 12} c -7 9 -10 14 -10 19 a10 10 0 0 0 20 0 c0 -5 -3 -10 -10 -19 z`} fill={Emerald} />,
        <path key="heart" d={`M${cx} ${cy - 4} c -4 -6 -9 -9 -13 -6 c -4 3 -3 8 0 11 c 4 4 10 8 13 11 c 3 -3 9 -7 13 -11 c 3 -3 4 -8 0 -11 c -4 -3 -9 0 -13 6 z`} fill={Gold} />,
        <polyline key="activity" points={`${cx - 12},${cy} ${cx - 4},${cy} ${cx + 2},${cy - 9} ${cx + 8},${cy + 7} ${cx + 14},${cy}`} fill="none" stroke={Emerald} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />,
        <g key="steps" fill={Emerald}>
          <rect x={cx - 12} y={cy - 10} width="9" height="15" rx="4.5" />
          <rect x={cx + 2} y={cy - 13} width="9" height="18" rx="4.5" />
          <rect x={cx - 7} y={cy + 7} width="11" height="7" rx="3.5" opacity="0.55" />
          <rect x={cx + 7} y={cy + 5} width="11" height="9" rx="3.5" opacity="0.55" />
        </g>,
      ];
      return (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="26" fill={White} stroke={Emerald} strokeOpacity="0.14" strokeWidth="2" />
          {glyphs[i]}
        </g>
      );
    })}
    <circle cx="320" cy="110" r="14" fill={Gold} opacity="0.5" />
  </>
);

const SmartwatchScene: React.FC = () => (
  <>
    <rect x="166" y="58" width="68" height="92" rx="22" fill={Emerald} fillOpacity="0.9" />
    <rect x="166" y="250" width="68" height="92" rx="22" fill={Emerald} fillOpacity="0.9" />
    <circle cx="200" cy="200" r="92" fill={White} stroke={Gold} strokeWidth="9" />
    <circle cx="200" cy="200" r="76" fill={Beige} />
    <polyline
      points="146,200 162,200 176,180 192,222 206,166 220,200 238,200"
      fill="none"
      stroke={Emerald}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M234 166 c -4 -7 -11 -10 -15 -6 c -5 4 -3 10 0 13 c 5 5 12 9 15 13 c 3 -4 10 -8 15 -13 c 3 -3 5 -9 0 -13 c -4 -4 -11 -1 -15 6 z" fill={Gold} />
    <text x="200" y="252" fill={Emerald} fontSize="30" fontWeight="800" fontFamily="inherit" textAnchor="middle">8,420</text>
    <text x="200" y="272" fill={Gold} fontSize="14" fontWeight="700" fontFamily="inherit" textAnchor="middle">steps</text>
    <circle cx="286" cy="120" r="12" fill={Gold} opacity="0.55" />
    <circle cx="112" cy="280" r="9" fill={Emerald} opacity="0.4" />
  </>
);

const scenes: Record<SectionIllustrationKind, React.FC> = {
  calculator: CalculatorScene,
  plan: PlanScene,
  care: CareScene,
  smartwatch: SmartwatchScene,
};

const SectionIllustration: React.FC<{ kind: SectionIllustrationKind }> = ({ kind }) => {
  const Scene = scenes[kind];
  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="auto"
      role="img"
      aria-label={labels[kind]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Background kind={kind} />
      <Scene />
    </svg>
  );
};

export default SectionIllustration;