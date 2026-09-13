import React from 'react';

export const hubScoreColor = (score: number): string => {
  if (score >= 80) return '#0F4C3A';
  if (score >= 60) return '#D4AF37';
  return '#B91C1C';
};

interface ScoreRingProps {
  score: number | null;
  size?: number;
  stroke?: number;
}

const ScoreRing: React.FC<ScoreRingProps> = ({ score, size = 120, stroke = 10 }) => {
  const safe = score === null ? 0 : Math.max(0, Math.min(100, score));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const fill = c * (safe / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EFEBE4" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={score === null ? '#C7CFCB' : hubScoreColor(safe)}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${fill} ${c - fill}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.28}
        fontWeight="800"
        fill="#0F4C3A"
      >
        {score === null ? '—' : safe}
      </text>
    </svg>
  );
};

export default ScoreRing;