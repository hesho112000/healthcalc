import React from 'react';
import type { LucideIcon } from 'lucide-react';

const tile = (color: string, px: number): React.CSSProperties => ({
  width: px,
  height: px,
  borderRadius: px * 0.42,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  background: `linear-gradient(150deg, #ffffff 0%, ${color}1c 100%)`,
  color,
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: `0 14px 28px ${color}38, inset 0 1px 0 rgba(255,255,255,0.9)`,
});

export const SoftIcon: React.FC<{
  icon: LucideIcon;
  color: string;
  size?: number;
  tile?: number;
}> = ({ icon: Icon, color, size = 20, tile: tileSize }) => (
  <span style={tile(color, tileSize || size + 16)}>
    <Icon size={size} strokeWidth={2.2} />
  </span>
);

interface SceneChip {
  value: string;
  sub?: string;
}

export const IconScene: React.FC<{
  icon: LucideIcon;
  color: string;
  large?: boolean;
  chip?: SceneChip;
  chip2?: SceneChip;
}> = ({ icon, color, large = false, chip, chip2 }) => (
  <div className={`anime-scene soft-scene ${large ? 'anime-scene-lg' : ''}`} aria-hidden="true">
    <span className="sparkle sparkle-a">✦</span>
    <span className="sparkle sparkle-b">✧</span>
    <span className="sparkle sparkle-c">✨</span>
    <span className="scene-orb orb-a" style={{ background: color }} />
    <span className="scene-orb orb-b" style={{ background: color }} />
    <span className="scene-ring" style={{ borderColor: `${color}55` }} />
    <span
      className="scene-core"
      style={{
        width: large ? 148 : 108,
        height: large ? 148 : 108,
        background: `linear-gradient(150deg, #ffffff 0%, ${color}16 100%)`,
      }}
    >
      <SoftIcon icon={icon} color={color} size={large ? 58 : 40} tile={large ? 96 : 68} />
    </span>
    {chip && (
      <span className="scene-chip chip-top" style={{ boxShadow: `0 12px 26px ${color}30` }}>
        <b>{chip.value}</b>
        {chip.sub && <span>{chip.sub}</span>}
      </span>
    )}
    {chip2 && (
      <span className="scene-chip chip-bottom" style={{ boxShadow: `0 12px 26px ${color}30` }}>
        <b>{chip2.value}</b>
        {chip2.sub && <span>{chip2.sub}</span>}
      </span>
    )}
  </div>
);