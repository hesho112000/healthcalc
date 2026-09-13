import React from 'react';

const COLORS = ['#0F4C3A', '#D4AF37', '#c9a52e', '#1a6b53', '#6B7A75', '#FDFBF7'];

interface Piece {
  left: number;
  color: string;
  width: number;
  height: number;
  sway: number;
  duration: number;
  delay: number;
  round: boolean;
}

const PIECES: Piece[] = Array.from({ length: 42 }, (_, i) => ({
  left: (i * 61) % 101,
  color: COLORS[i % COLORS.length],
  width: 7 + ((i * 13) % 8),
  height: 10 + ((i * 7) % 12),
  sway: ((i * 37) % 120) - 60,
  duration: 1.4 + ((i * 11) % 10) / 10,
  delay: (i * 17) % 60 / 100,
  round: i % 4 === 0,
}));

const ConfettiBurst: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-[70]">
    <style>{`
      @keyframes cf-fall {
        0% { transform: translate3d(0, -14vh, 0) rotate(0deg); opacity: 1; }
        100% { transform: translate3d(var(--cf-sway), 112vh, 0) rotate(720deg); opacity: 0; }
      }
      .cf-bit {
        position: absolute;
        top: 0;
        pointer-events: none;
        will-change: transform;
        animation-name: cf-fall;
        animation-timing-function: cubic-bezier(0.2, 0.6, 0.3, 1);
        animation-fill-mode: forwards;
      }
    `}</style>
    {PIECES.map((piece, index) => (
      <span
        key={index}
        className="cf-bit"
        style={
          {
            left: `${piece.left}%`,
            background: piece.color,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            borderRadius: piece.round ? '9999px' : '2px',
            '--cf-sway': `${piece.sway}px`,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
          } as React.CSSProperties
        }
      />
    ))}
  </div>
);

export default ConfettiBurst;