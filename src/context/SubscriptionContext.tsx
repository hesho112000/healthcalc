import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../i18n/translations';
import { useAuth, hasPremiumAccess, isAdmin } from './AuthContext';

type TKey = keyof typeof translations.en;

export type Tier = 'free' | 'basic' | 'pro' | 'elite';

export type FeatureId =
  | 'bodyMap'
  | 'dashboard'
  | 'labSave'
  | 'lab'
  | 'meals'
  | 'exercises'
  | 'fullPlan'
  | 'pdf'
  | 'sync'
  | 'support';

export const TIER_ORDER: Record<Tier, number> = { free: 0, basic: 1, pro: 2, elite: 3 };

export const TIER_PRICE: Record<Tier, string> = {
  free: '$0',
  basic: '$9',
  pro: '$19',
  elite: '$49',
};

export const tierPlanKey = (tier: Tier): TKey => `plan.${tier}` as TKey;

export interface FeatureDef {
  minTier: Tier;
  labelKey: TKey;
}

export const FEATURES: Record<FeatureId, FeatureDef> = {
  bodyMap: { minTier: 'free', labelKey: 'feat.bodyMap' },
  dashboard: { minTier: 'free', labelKey: 'feat.dashboard' },
  labSave: { minTier: 'basic', labelKey: 'feat.lab' },
  lab: { minTier: 'basic', labelKey: 'feat.lab' },
  meals: { minTier: 'basic', labelKey: 'feat.meals' },
  exercises: { minTier: 'basic', labelKey: 'feat.exercises' },
  fullPlan: { minTier: 'pro', labelKey: 'feat.fullPlan' },
  pdf: { minTier: 'pro', labelKey: 'feat.pdf' },
  sync: { minTier: 'pro', labelKey: 'feat.sync' },
  support: { minTier: 'elite', labelKey: 'feat.support' },
};

interface SubscriptionContextType {
  tier: Tier;
  activeTier: Tier;
  setTier: (tier: Tier) => void;
  upgrade: (tier: Tier) => void;
  hasFeature: (feature: FeatureId, tierOverride?: Tier) => boolean;
  tierForFeature: (feature: FeatureId) => Tier;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const STORAGE_KEY = 'hc_subscription_tier';

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tier, setTierState] = useState<Tier>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Tier | null;
      return saved && saved in TIER_ORDER ? saved : 'free';
    } catch {
      return 'free';
    }
  });

  const setTier = (next: Tier) => {
    setTierState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const upgrade = (next: Tier) => {
    if (TIER_ORDER[next] > TIER_ORDER[tier]) setTier(next);
  };

  const activeTier: Tier = isAdmin()
    ? 'elite'
    : hasPremiumAccess(user)
      ? 'pro'
      : tier;

  const hasFeature = (feature: FeatureId, tierOverride?: Tier): boolean =>
    TIER_ORDER[tierOverride ?? activeTier] >= TIER_ORDER[FEATURES[feature].minTier];

  const tierForFeature = (feature: FeatureId): Tier => FEATURES[feature].minTier;

  return (
    <SubscriptionContext.Provider
      value={{ tier, activeTier, setTier, upgrade, hasFeature, tierForFeature }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('useSubscription must be used within a SubscriptionProvider');
  return context;
};