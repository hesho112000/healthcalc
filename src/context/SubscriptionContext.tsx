import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { translations } from '../i18n/translations';
import { useAuth } from './AuthContext';

type TKey = keyof typeof translations.en;

export type Tier = 'free' | 'basic' | 'pro' | 'elite';

export type FeatureId =
  | 'bodyMap'
  | 'labReadOnly'
  | 'labSave'
  | 'hubDay1'
  | 'hubDay2'
  | 'hubDay3'
  | 'progressTracker'
  | 'pdfDownload'
  | 'hubAllDays'
  | 'aiChat'
  | 'watchSync'
  | 'familySharing';

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
  labReadOnly: { minTier: 'free', labelKey: 'feat.labReadOnly' },
  hubDay1: { minTier: 'free', labelKey: 'feat.hubDay1' },
  labSave: { minTier: 'basic', labelKey: 'feat.labSave' },
  hubDay2: { minTier: 'basic', labelKey: 'feat.hubDay2' },
  hubDay3: { minTier: 'basic', labelKey: 'feat.hubDay3' },
  progressTracker: { minTier: 'basic', labelKey: 'feat.progressTracker' },
  pdfDownload: { minTier: 'basic', labelKey: 'feat.pdfDownload' },
  hubAllDays: { minTier: 'pro', labelKey: 'feat.hubAllDays' },
  aiChat: { minTier: 'pro', labelKey: 'feat.aiChat' },
  watchSync: { minTier: 'pro', labelKey: 'feat.watchSync' },
  familySharing: { minTier: 'elite', labelKey: 'feat.familySharing' },
};

interface SubscriptionContextType {
  tier: Tier;
  activeTier: Tier;
  setTier: (tier: Tier) => void;
  upgrade: (tier: Tier) => void;
  hasFeature: (feature: FeatureId) => boolean;
  tierForFeature: (feature: FeatureId) => Tier;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  useEffect(() => {
    try {
      localStorage.removeItem('hc_subscription_tier');
    } catch {
      /* ignore storage failures */
    }
  }, []);
  const tier: Tier = user?.subscription_status ?? 'free';
  const activeTier = tier;
  const setTier = (_next: Tier) => undefined;
  const upgrade = (_next: Tier) => undefined;

  const hasFeature = (feature: FeatureId): boolean =>
    TIER_ORDER[activeTier] >= TIER_ORDER[FEATURES[feature].minTier];

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
