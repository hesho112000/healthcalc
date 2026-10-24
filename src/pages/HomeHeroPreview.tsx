import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Globe2,
  HeartPulse,
  Mars,
  Ruler,
  Scale,
  ShieldCheck,
  Sparkles,
  Venus,
} from 'lucide-react';
import './HomeHeroPreview.css';

type Gender = 'female' | 'male';
type Goal = 'lose_weight' | 'maintain_weight' | 'build_muscle' | 'improve_health';

type MiniProfile = {
  age: string;
  gender: Gender;
  height: string;
  weight: string;
  goal: Goal;
};

const goals: { value: Goal; label: string }[] = [
  { value: 'lose_weight', label: 'Lose weight' },
  { value: 'maintain_weight', label: 'Maintain weight' },
  { value: 'build_muscle', label: 'Build muscle' },
  { value: 'improve_health', label: 'Feel healthier' },
];

const HomeHeroPreview: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<MiniProfile>({
    age: '30',
    gender: 'female',
    height: '168',
    weight: '68',
    goal: 'lose_weight',
  });

  const update = <K extends keyof MiniProfile>(key: K, value: MiniProfile[K]) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Hero mini-calculator profile:', {
      age: Number(profile.age),
      gender: profile.gender,
      height: Number(profile.height),
      weight: Number(profile.weight),
      goal: profile.goal,
    });
    navigate('/weight-loss');
  };

  return (
    <div className="hh-preview">
      <div className="hh-preview__ambient hh-preview__ambient--one" aria-hidden="true" />
      <div className="hh-preview__ambient hh-preview__ambient--two" aria-hidden="true" />
      <header className="hh-preview__topbar">
        <a className="hh-preview__brand" href="/" aria-label="HealthFingerprint home">
          <span className="hh-preview__brand-mark"><Activity size={18} strokeWidth={2.2} /></span>
          <span>health<span>fingerprint</span></span>
        </a>
        <span className="hh-preview__sandbox"><i /> Hero preview</span>
      </header>

      <main className="hh-preview__hero">
        <section className="hh-preview__message">
          <span className="hh-preview__badge"><Sparkles size={13} /> The Ultimate Health &amp; Diet Platform</span>
          <h1>Know Your Macros.<br />Eat What You <em>Love.</em></h1>
          <p className="hh-preview__subhead">Calculate your daily calories, explore 18,000+ global dishes, and get personalized meal plans in seconds.</p>

          <div className="hh-preview__proof" aria-label="Platform highlights">
            <div className="hh-proof-item"><span className="hh-proof-item__icon"><Globe2 size={16} /></span><strong>18,000<sup>+</sup></strong><small>Dishes</small></div>
            <span className="hh-preview__proof-divider" />
            <div className="hh-proof-item"><span className="hh-proof-item__icon"><Activity size={16} /></span><strong>5</strong><small>Languages</small></div>
            <span className="hh-preview__proof-divider" />
            <div className="hh-proof-item"><span className="hh-proof-item__icon"><HeartPulse size={16} /></span><strong>100%</strong><small>Free</small></div>
          </div>
        </section>

        <section className="hh-calculator" aria-labelledby="hh-calculator-heading">
          <div className="hh-calculator__shine" aria-hidden="true" />
          <div className="hh-calculator__topline"><span><i /> YOUR PERSONAL STARTING POINT</span><span className="hh-calculator__time"><Sparkles size={12} /> 30 sec</span></div>
          <div className="hh-calculator__heading"><div><span className="hh-calculator__eyebrow">A FEW QUICK DETAILS</span><h2 id="hh-calculator-heading">Let’s make it <em>yours.</em></h2></div><span className="hh-calculator__step">01 <i>/</i> 01</span></div>

          <form onSubmit={handleCalculate}>
            <div className="hh-form-grid hh-form-grid--three">
              <label className="hh-field">
                <span><CalendarDays size={13} /> Age</span>
                <span className="hh-field__control"><input aria-label="Age" type="number" min="13" max="100" value={profile.age} onChange={(event) => update('age', event.target.value)} required /><small>years</small></span>
              </label>
              <label className="hh-field">
                <span><Ruler size={13} /> Height</span>
                <span className="hh-field__control"><input aria-label="Height" type="number" min="120" max="230" value={profile.height} onChange={(event) => update('height', event.target.value)} required /><small>cm</small></span>
              </label>
              <label className="hh-field">
                <span><Scale size={13} /> Weight</span>
                <span className="hh-field__control"><input aria-label="Weight" type="number" min="35" max="300" value={profile.weight} onChange={(event) => update('weight', event.target.value)} required /><small>kg</small></span>
              </label>
            </div>

            <div className="hh-form-grid hh-form-grid--two">
              <fieldset className="hh-gender-field">
                <legend>Gender</legend>
                <div className="hh-gender-switch" role="group" aria-label="Gender">
                  <button type="button" className={profile.gender === 'female' ? 'is-selected' : ''} aria-pressed={profile.gender === 'female'} onClick={() => update('gender', 'female')}><Venus size={14} /> Woman</button>
                  <button type="button" className={profile.gender === 'male' ? 'is-selected' : ''} aria-pressed={profile.gender === 'male'} onClick={() => update('gender', 'male')}><Mars size={14} /> Man</button>
                </div>
              </fieldset>
              <label className="hh-field hh-goal-field">
                <span>Your primary goal</span>
                <span className="hh-select-wrap"><select aria-label="Your primary goal" value={profile.goal} onChange={(event) => update('goal', event.target.value as Goal)}>{goals.map((goal) => <option key={goal.value} value={goal.value}>{goal.label}</option>)}</select><ChevronDown size={15} /></span>
              </label>
            </div>

            <button className="hh-calculate-button" type="submit">Calculate My Results <span>🚀</span><ArrowRight size={19} /></button>
            <p className="hh-no-signup"><ShieldCheck size={14} /> No sign-up required. Instant results.</p>
          </form>
        </section>
      </main>

      <footer className="hh-preview__footer"><span>MADE FOR REAL LIFE</span><span><Check size={13} /> Your next healthy choice starts here.</span></footer>
    </div>
  );
};

export default HomeHeroPreview;
