import React from 'react';
import type { FeatureId } from '../../context/SubscriptionContext';
import ProjectionCard from './ProjectionCard';
import CuisineSelector from './CuisineSelector';
import SubstitutionHint from './SubstitutionHint';
import WeeklyReport from './WeeklyReport';
import SmartReminders from './SmartReminders';
import CommunityCard from './CommunityCard';
import Achievements from './Achievements';
import FamilySharing from './FamilySharing';

interface SubscriptionFeaturesProps {
  hasFullHub: boolean;
  hasPdf: boolean;
  hasSupport: boolean;
  onUnlock: (feature: FeatureId) => void;
  onNote: (message: string) => void;
}

const SubscriptionFeatures: React.FC<SubscriptionFeaturesProps> = ({
  hasFullHub,
  hasPdf,
  hasSupport,
  onUnlock,
  onNote,
}) => (
  <section className="grid lg:grid-cols-2 gap-6">
    <ProjectionCard paid={hasFullHub} onUnlock={() => onUnlock('fullHub')} />
    <CuisineSelector paid={hasFullHub} onUnlock={() => onUnlock('fullHub')} onNote={onNote} />
    <SubstitutionHint paid={hasFullHub} onUnlock={() => onUnlock('fullHub')} />
    <WeeklyReport paid={hasPdf} onUnlock={() => onUnlock('pdf')} onNote={onNote} />
    <SmartReminders paid={hasFullHub} onUnlock={() => onUnlock('fullHub')} onNote={onNote} />
    <Achievements paid={hasFullHub} onUnlock={() => onUnlock('fullHub')} onNote={onNote} />
    <CommunityCard paid={hasFullHub} onUnlock={() => onUnlock('fullHub')} onNote={onNote} />
    <FamilySharing paid={hasSupport} onUnlock={() => onUnlock('support')} onNote={onNote} />
  </section>
);

export default SubscriptionFeatures;