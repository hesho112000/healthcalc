import React, { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bike,
  Check,
  ChevronRight,
  Footprints,
  Heart,
  HeartPulse,
  Minus,
  MoveRight,
  Plus,
  Scale,
  ShieldCheck,
  Sparkles,
  Venus,
  Mars,
  PersonStanding,
  Dumbbell,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import './HealthProfilePreview.css';

type Gender = 'Woman' | 'Man' | 'Non-binary';
type ActivityLevel = 'Mostly sitting' | 'Lightly active' | 'Active' | 'Very active';
type Goal = 'Build strength' | 'Lose weight' | 'Improve fitness' | 'Feel healthier';
type Variation = 1 | 2 | 3;
type ProfileData = {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activity: ActivityLevel;
  goal: Goal;
};

const genderOptions: { label: Gender; note: string; icon: LucideIcon }[] = [
  { label: 'Woman', note: 'Female', icon: Venus },
  { label: 'Man', note: 'Male', icon: Mars },
  { label: 'Non-binary', note: 'Other', icon: PersonStanding },
];

const activityOptions: { label: ActivityLevel; note: string; icon: LucideIcon }[] = [
  { label: 'Mostly sitting', note: 'A gentler pace, mostly seated', icon: Heart },
  { label: 'Lightly active', note: 'Easy movement a few days a week', icon: Footprints },
  { label: 'Active', note: 'Regular walks or workouts', icon: Bike },
  { label: 'Very active', note: 'Training is part of your routine', icon: Dumbbell },
];

const goalOptions: { label: Goal; note: string; icon: LucideIcon }[] = [
  { label: 'Build strength', note: 'Get stronger, one session at a time', icon: Dumbbell },
  { label: 'Lose weight', note: 'Make steady, sustainable progress', icon: Scale },
  { label: 'Improve fitness', note: 'Move more and feel more capable', icon: Zap },
  { label: 'Feel healthier', note: 'Build habits that feel good', icon: HeartPulse },
];

const variationNames: Record<Variation, string> = {
  1: 'Card-based Selection',
  2: 'Slider-focused',
  3: 'Step-by-Step',
};

const initialProfile: ProfileData = {
  age: 29,
  gender: 'Woman',
  height: 168,
  weight: 66,
  activity: 'Active',
  goal: 'Improve fitness',
};

const RangeControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
  compact?: boolean;
}> = ({ label, value, min, max, unit, onChange, compact = false }) => (
  <div className={`hp-range ${compact ? 'hp-range--compact' : ''}`}>
    <div className="hp-range__topline">
      <label htmlFor={`range-${label}`}>{label}</label>
      <div className="hp-range__value"><strong>{value}</strong><span>{unit}</span></div>
    </div>
    <input
      id={`range-${label}`}
      aria-label={label}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      style={{ '--hp-range-progress': `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties}
    />
    <div className="hp-range__limits"><span>{min} {unit}</span><span>{max} {unit}</span></div>
  </div>
);

const NumberField: React.FC<{
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}> = ({ label, value, unit, min, max, onChange }) => (
  <label className="hp-number-field">
    <span className="hp-number-field__label">{label}</span>
    <span className="hp-number-field__input">
      <input
        aria-label={label}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))}
      />
      <span>{unit}</span>
    </span>
  </label>
);

const OptionCard: React.FC<{
  label: string;
  note?: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}> = ({ label, note, icon: Icon, selected, onClick, compact = false }) => (
  <button
    type="button"
    className={`hp-option-card ${selected ? 'is-selected' : ''} ${compact ? 'hp-option-card--compact' : ''}`}
    aria-pressed={selected}
    onClick={onClick}
  >
    <span className="hp-option-card__icon"><Icon size={compact ? 18 : 20} strokeWidth={1.75} /></span>
    <span className="hp-option-card__copy"><strong>{label}</strong>{note && <small>{note}</small>}</span>
    {selected && <span className="hp-option-card__check"><Check size={13} strokeWidth={2.5} /></span>}
  </button>
);

const SectionHeading: React.FC<{ eyebrow: string; title: string; helper?: string }> = ({ eyebrow, title, helper }) => (
  <div className="hp-section-heading">
    <span>{eyebrow}</span>
    <h2>{title}</h2>
    {helper && <p>{helper}</p>}
  </div>
);

const ProfileAside: React.FC<{ profile: ProfileData }> = ({ profile }) => {
  const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(1);
  return (
    <aside className="hp-insight-card">
      <div className="hp-insight-card__top"><span className="hp-insight-card__icon"><Activity size={18} /></span><span>YOUR STARTING POINT</span></div>
      <div className="hp-orbit" aria-hidden="true"><span className="hp-orbit__ring hp-orbit__ring--outer" /><span className="hp-orbit__ring hp-orbit__ring--inner" /><span className="hp-orbit__core"><HeartPulse size={29} strokeWidth={1.5} /></span><i className="hp-orbit__dot hp-orbit__dot--one" /><i className="hp-orbit__dot hp-orbit__dot--two" /></div>
      <p className="hp-insight-card__title">A plan that<br /><em>starts with you.</em></p>
      <p className="hp-insight-card__copy">Your details help us make every recommendation feel a little more personal.</p>
      <div className="hp-insight-card__stats">
        <div><span>Profile BMI</span><strong>{bmi}</strong></div>
        <div><span>Height</span><strong>{profile.height}<small> cm</small></strong></div>
        <div><span>Weight</span><strong>{profile.weight}<small> kg</small></strong></div>
      </div>
      <div className="hp-privacy-note"><ShieldCheck size={16} /><span>Your health details stay private</span></div>
    </aside>
  );
};

const HealthProfilePreview: React.FC = () => {
  const [variation, setVariation] = useState<Variation>(1);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const update = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="hp-preview">
      <header className="hp-preview__bar">
        <div className="hp-preview__bar-inner">
          <div className="hp-sandbox-brand"><span className="hp-sandbox-brand__mark"><Activity size={17} strokeWidth={2.1} /></span><span>HEALTHFINGERPRINT <i> / </i> <strong>UI LAB</strong></span></div>
          <div className="hp-preview__switcher" role="tablist" aria-label="Choose health profile design">
            {([1, 2, 3] as const).map((item) => (
              <button key={item} type="button" role="tab" aria-selected={variation === item} className={variation === item ? 'is-active' : ''} onClick={() => setVariation(item)}>
                <span>0{item}</span>{variationNames[item]}
              </button>
            ))}
          </div>
          <span className="hp-sandbox-pill"><i /> Sandbox mode</span>
        </div>
      </header>

      <main className="hp-preview__main">
        <div className="hp-preview__intro">
          <div className="hp-preview__intro-copy">
            <span className="hp-kicker"><Sparkles size={13} /> YOUR HEALTH, IN FOCUS</span>
            <h1>A little about <em>you.</em></h1>
            <p>A few details help us shape a health profile that feels personal, useful, and made for real life.</p>
          </div>
          <div className="hp-intro-note"><span>01 — 06</span><i /><small>YOUR PROFILE</small></div>
        </div>

        <div className={`hp-variation hp-variation--${variation}`} key={variation}>
          {variation === 1 && <CardBasedVariation profile={profile} update={update} />}
          {variation === 2 && <SliderVariation profile={profile} update={update} />}
          {variation === 3 && <StepVariation profile={profile} update={update} />}
        </div>
        <footer className="hp-preview__foot"><span>HEALTHFINGERPRINT <i>·</i> YOUR PERSONAL HEALTH COMPANION</span><span>Thoughtfully designed for you <Heart size={13} /></span></footer>
      </main>
    </div>
  );
};

const CardBasedVariation: React.FC<{
  profile: ProfileData;
  update: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
}> = ({ profile, update }) => (
  <CardBasedContent profile={profile} update={update} />
);

const CardBasedContent: React.FC<{
  profile: ProfileData;
  update: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
}> = ({ profile, update }) => {
  const [saved, setSaved] = useState(false);
  return <div className="hp-layout">
    <section className="hp-form-panel">
      <div className="hp-form-panel__heading"><div><span className="hp-step-label">THE BASICS <i>01</i></span><h2>Let’s get to know you</h2></div><span className="hp-form-panel__completion"><i /> 6 details</span></div>
      <div className="hp-form-section">
        <SectionHeading eyebrow="01 — YOUR DETAILS" title="How do you identify?" helper="Choose the option that feels right for you." />
        <div className="hp-options hp-options--three">
          {genderOptions.map((option) => <OptionCard key={option.label} {...option} selected={profile.gender === option.label} onClick={() => update('gender', option.label)} />)}
        </div>
      </div>
      <div className="hp-form-divider" />
      <div className="hp-form-section">
        <SectionHeading eyebrow="02 — YOUR MEASUREMENTS" title="Your body, your baseline" helper="A starting point for recommendations that fit." />
        <div className="hp-number-grid">
          <NumberField label="Age" unit="years" min={13} max={100} value={profile.age} onChange={(value) => update('age', value)} />
          <NumberField label="Height" unit="cm" min={120} max={220} value={profile.height} onChange={(value) => update('height', value)} />
          <NumberField label="Weight" unit="kg" min={35} max={250} value={profile.weight} onChange={(value) => update('weight', value)} />
        </div>
      </div>
      <div className="hp-form-divider" />
      <div className="hp-form-section">
        <SectionHeading eyebrow="03 — YOUR ROUTINE" title="How do you move?" helper="Pick what most closely matches a usual week." />
        <div className="hp-options hp-options--two">
          {activityOptions.map((option) => <OptionCard key={option.label} {...option} selected={profile.activity === option.label} onClick={() => update('activity', option.label)} compact />)}
        </div>
      </div>
      <div className="hp-form-divider" />
      <div className="hp-form-section">
        <SectionHeading eyebrow="04 — YOUR NORTH STAR" title="What matters most right now?" />
        <div className="hp-options hp-options--two">
          {goalOptions.map((option) => <OptionCard key={option.label} {...option} selected={profile.goal === option.label} onClick={() => update('goal', option.label)} compact />)}
        </div>
      </div>
      <div className="hp-form-actions"><button type="button" className="hp-primary-button" onClick={() => setSaved(true)}>{saved ? 'Profile preview ready' : 'Build my health profile'} {saved ? <Check size={16} /> : <ArrowRight size={17} />}</button><span><ShieldCheck size={14} /> Private by design</span></div>
    </section>
    <ProfileAside profile={profile} />
  </div>;
};

const SliderVariation: React.FC<{
  profile: ProfileData;
  update: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
}> = ({ profile, update }) => (
  <SliderContent profile={profile} update={update} />
);

const SliderContent: React.FC<{
  profile: ProfileData;
  update: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
}> = ({ profile, update }) => {
  const [continued, setContinued] = useState(false);
  return <div className="hp-slider-layout">
    <section className="hp-slider-panel">
      <div className="hp-slider-panel__heading"><div><span className="hp-step-label">YOUR NUMBERS <i>LIVE</i></span><h2>Set your starting point</h2><p>Use the sliders to fine-tune your profile. Your numbers update as you go.</p></div><span className="hp-live-indicator"><i /> LIVE</span></div>
      <div className="hp-slider-controls">
        <RangeControl label="Age" value={profile.age} min={13} max={100} unit="years" onChange={(value) => update('age', value)} />
        <RangeControl label="Height" value={profile.height} min={120} max={220} unit="cm" onChange={(value) => update('height', value)} />
        <RangeControl label="Weight" value={profile.weight} min={35} max={250} unit="kg" onChange={(value) => update('weight', value)} />
      </div>
      <div className="hp-slider-segments">
        <div className="hp-segment-section"><div className="hp-segment-heading"><span>GENDER</span><small>Personalizes your metrics</small></div><div className="hp-segment-control" role="group" aria-label="Gender">
          {genderOptions.map(({ label, icon: Icon }) => <button type="button" className={profile.gender === label ? 'is-active' : ''} aria-pressed={profile.gender === label} key={label} onClick={() => update('gender', label)}><Icon size={16} />{label}</button>)}
        </div></div>
        <div className="hp-segment-section"><div className="hp-segment-heading"><span>ACTIVITY LEVEL</span><small>On a typical week</small></div><div className="hp-segment-control hp-segment-control--activity" role="group" aria-label="Activity level">
          {activityOptions.map(({ label }, index) => <button type="button" className={profile.activity === label ? 'is-active' : ''} aria-pressed={profile.activity === label} key={label} onClick={() => update('activity', label)}><i>0{index + 1}</i>{label}</button>)}
        </div></div>
        <div className="hp-segment-section"><div className="hp-segment-heading"><span>PRIMARY GOAL</span><small>Your focus, for now</small></div><div className="hp-goal-pills" role="group" aria-label="Primary goal">
          {goalOptions.map(({ label, icon: Icon }) => <button type="button" className={profile.goal === label ? 'is-active' : ''} aria-pressed={profile.goal === label} key={label} onClick={() => update('goal', label)}><Icon size={15} />{label}</button>)}
        </div></div>
      </div>
      <div className="hp-slider-panel__footer"><div><span className="hp-footer-check"><Check size={12} /></span><span>{continued ? 'Your profile is ready to go.' : 'Looking good. Your profile is up to date.'}</span></div><button type="button" className="hp-primary-button" onClick={() => setContinued(true)}>{continued ? 'Profile ready' : 'Continue'} {continued ? <Check size={15} /> : <ArrowRight size={17} />}</button></div>
    </section>
    <aside className="hp-slider-summary">
      <div className="hp-slider-summary__label"><span>YOUR PROFILE</span><span className="hp-summary-sparkle"><Sparkles size={15} /></span></div>
      <div className="hp-summary-bmi"><span>Body mass index</span><strong>{(profile.weight / ((profile.height / 100) ** 2)).toFixed(1)}</strong><small>ESTIMATED BMI</small><div className="hp-bmi-meter"><i /></div><div className="hp-bmi-labels"><span>LOW</span><span>MODERATE</span><span>HIGH</span></div></div>
      <div className="hp-summary-details"><div><span>Age</span><strong>{profile.age} <small>yrs</small></strong></div><div><span>Height</span><strong>{profile.height} <small>cm</small></strong></div><div><span>Weight</span><strong>{profile.weight} <small>kg</small></strong></div></div>
      <div className="hp-summary-note"><span><HeartPulse size={18} /></span><p>Your starting point is unique. Your plan should be, too.</p></div>
    </aside>
  </div>;
};

const stepTitles = [
  { eyebrow: 'FIRST, THE BASICS', title: 'How do you identify?', copy: 'This helps us make your health metrics more personal.' },
  { eyebrow: 'A LITTLE CONTEXT', title: 'How old are you?', copy: 'Age helps us tailor your recommendations to you.' },
  { eyebrow: 'YOUR BODY, YOUR BASELINE', title: 'How tall are you?', copy: 'Move the slider to set your height.' },
  { eyebrow: 'YOUR BODY, YOUR BASELINE', title: 'What do you weigh?', copy: 'An estimate is a perfectly good place to start.' },
  { eyebrow: 'YOUR EVERYDAY', title: 'How active are you?', copy: 'Think about a typical week, not your best one.' },
  { eyebrow: 'YOUR NORTH STAR', title: 'What’s your main goal?', copy: 'We’ll use this to keep your plan focused on what matters.' },
];

const StepVariation: React.FC<{
  profile: ProfileData;
  update: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
}> = ({ profile, update }) => {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const current = stepTitles[step];
  const previous = () => { setComplete(false); setStep((value) => Math.max(0, value - 1)); };
  const next = () => {
    if (step === stepTitles.length - 1) setComplete(true);
    else setStep((value) => Math.min(stepTitles.length - 1, value + 1));
  };

  return (
    <section className="hp-typeform">
      <div className="hp-typeform__progress"><div className="hp-typeform__progress-label"><span>{complete ? 'PROFILE READY' : `QUESTION 0${step + 1} <i>OF 06</i>`}</span><span>{complete ? '100' : Math.round(((step + 1) / stepTitles.length) * 100)}<small>%</small></span></div><div className="hp-typeform__track"><i style={{ width: `${complete ? 100 : ((step + 1) / stepTitles.length) * 100}%` }} /></div></div>
      {complete ? (
        <div className="hp-typeform__complete" key="complete"><span className="hp-complete-mark"><Check size={28} /></span><span className="hp-kicker"><Sparkles size={13} /> A GREAT PLACE TO BEGIN</span><h2>Your profile is<br /><em>taking shape.</em></h2><p>You’ve given us a thoughtful starting point. You can always fine-tune these details as you go.</p><div className="hp-complete-summary"><span>{profile.gender}</span><i /><span>{profile.age} years</span><i /><span>{profile.height} cm</span><i /><span>{profile.weight} kg</span><i /><span>{profile.goal}</span></div><button type="button" className="hp-primary-button" onClick={() => setComplete(false)}>Review my answers <MoveRight size={17} /></button></div>
      ) : (
        <div className="hp-typeform__content" key={step} onKeyDown={(event) => { if (event.key === 'Enter' && !(event.target instanceof HTMLButtonElement)) next(); }}>
          <div className="hp-typeform__question"><span>{current.eyebrow}</span><h2>{current.title}</h2><p>{current.copy}</p></div>
          <div className="hp-typeform__answer">
            {step === 0 && <div className="hp-options hp-options--three hp-options--typeform">{genderOptions.map((option) => <OptionCard key={option.label} {...option} selected={profile.gender === option.label} onClick={() => update('gender', option.label)} />)}</div>}
            {step === 1 && <div className="hp-step-number"><div className="hp-step-number__value"><button type="button" aria-label="Decrease age" onClick={() => update('age', Math.max(13, profile.age - 1))}><Minus size={18} /></button><strong>{profile.age}</strong><span>years old</span><button type="button" aria-label="Increase age" onClick={() => update('age', Math.min(100, profile.age + 1))}><Plus size={18} /></button></div><RangeControl label="Age" value={profile.age} min={13} max={100} unit="years" onChange={(value) => update('age', value)} compact /></div>}
            {step === 2 && <RangeControl label="Height" value={profile.height} min={120} max={220} unit="cm" onChange={(value) => update('height', value)} />}
            {step === 3 && <RangeControl label="Weight" value={profile.weight} min={35} max={250} unit="kg" onChange={(value) => update('weight', value)} />}
            {step === 4 && <div className="hp-options hp-options--two hp-options--typeform">{activityOptions.map((option) => <OptionCard key={option.label} {...option} selected={profile.activity === option.label} onClick={() => update('activity', option.label)} compact />)}</div>}
            {step === 5 && <div className="hp-options hp-options--two hp-options--typeform">{goalOptions.map((option) => <OptionCard key={option.label} {...option} selected={profile.goal === option.label} onClick={() => update('goal', option.label)} compact />)}</div>}
          </div>
          <div className="hp-typeform__actions"><button type="button" className="hp-back-button" onClick={previous} disabled={step === 0}><ArrowLeft size={16} /> Back</button><button type="button" className="hp-primary-button" onClick={next}>{step === stepTitles.length - 1 ? 'Finish profile' : 'Continue'}<ChevronRight size={17} /></button><span><kbd>ENTER</kbd> to continue</span></div>
          <div className="hp-typeform__hint"><Sparkles size={14} /> No pressure — you can change any answer later.</div>
        </div>
      )}
    </section>
  );
};

export default HealthProfilePreview;
