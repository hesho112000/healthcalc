import React from 'react';

const HealthFingerprint: React.FC = () => (
  <svg
    className="health-fingerprint"
    viewBox="0 0 500 500"
    width="100%"
    height="auto"
    role="img"
    aria-label="Health fingerprint illustration"
  >
    <defs>
      <radialGradient id="fp-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(15,76,58,0.08)" />
        <stop offset="100%" stopColor="rgba(15,76,58,0)" />
      </radialGradient>
    </defs>

    <circle cx="250" cy="250" r="238" fill="url(#fp-glow)" />

    <g stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 6" fill="none" opacity="0.7">
      <line x1="138" y1="120" x2="176" y2="170" />
      <line x1="362" y1="120" x2="324" y2="170" />
      <line x1="138" y1="380" x2="176" y2="332" />
      <line x1="362" y1="380" x2="324" y2="332" />
    </g>

    <path
      className="pulse-line"
      d="M118 236 C 158 146, 214 150, 250 236 C 286 322, 342 326, 382 236"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="6"
      strokeLinecap="round"
    />

    <path
      d="M250 392 C 132 320, 86 244, 110 178 C 130 122, 200 106, 250 158 C 300 106, 370 122, 390 178 C 414 244, 368 320, 250 392 Z"
      fill="none"
      stroke="#0F4C3A"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    <g className="orbit-slow" style={{ animationDelay: '0s' }}>
      <circle cx="110" cy="92" r="27" fill="#FFFFFF" stroke="#0F4C3A" strokeOpacity="0.35" strokeWidth="2" />
      <text x="110" y="100" textAnchor="middle" fontSize="26">🩸</text>
    </g>

    <g className="orbit-slow" style={{ animationDelay: '1.2s' }}>
      <circle cx="390" cy="92" r="27" fill="#FFFFFF" stroke="#0F4C3A" strokeOpacity="0.35" strokeWidth="2" />
      <text x="390" y="100" textAnchor="middle" fontSize="26">❤️</text>
    </g>

    <g className="orbit-slow" style={{ animationDelay: '2.1s' }}>
      <circle cx="110" cy="408" r="27" fill="#FFFFFF" stroke="#0F4C3A" strokeOpacity="0.35" strokeWidth="2" />
      <text x="110" y="416" textAnchor="middle" fontSize="26">⚖️</text>
    </g>

    <g className="orbit-slow" style={{ animationDelay: '0.9s' }}>
      <circle cx="390" cy="408" r="27" fill="#FFFFFF" stroke="#0F4C3A" strokeOpacity="0.35" strokeWidth="2" />
      <text x="390" y="416" textAnchor="middle" fontSize="26">🦶</text>
    </g>
  </svg>
);

export default HealthFingerprint;