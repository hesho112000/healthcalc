import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

type IllustrationKind = 'calculator' | 'plan' | 'care' | 'lab' | 'watch';

const illustrations: Record<IllustrationKind, { src: string; accent: string; title: string }> = {
  calculator: { src: '/anime/ghibli_holographic_health_calculator.svg', accent: 'from-cyan-100 to-emerald-100', title: 'Health dashboard' },
  plan: { src: '/anime/fitness_plan_trio.svg', accent: 'from-amber-100 to-pink-100', title: 'Personal plan' },
  care: { src: '/anime/compassionate_chronic_care.svg', accent: 'from-violet-100 to-cyan-100', title: 'Compassionate care' },
  lab: { src: '/anime/lab_interpreter_holograms.svg', accent: 'from-emerald-100 to-teal-100', title: 'Lab interpreter' },
  watch: { src: '/anime/fitness_plan_trio.svg', accent: 'from-indigo-100 to-cyan-100', title: 'Smart sync' },
};

const conditions = [
  ['🩸', 'Diabetes', 'سكر', '/diabetes'],
  ['💗', 'Hypertension', 'ضغط', '/premium'],
  ['🫀', 'Cholesterol', 'كوليسترول', '/premium'],
  ['🦶', 'Gout', 'نقرس', '/premium'],
  ['🧡', 'Liver health', 'كبد', '/premium'],
  ['🫘', 'Kidney care', 'كلى', '/premium'],
  ['🦋', 'Thyroid', 'غدة درقية', '/premium'],
  ['🌿', 'IBS', 'قولون', '/premium'],
];

const cuisines = [
  ['🇪🇬', 'Egyptian'], ['🇮🇳', 'Indian'], ['🇸🇦', 'Arabic'], ['🇬🇷', 'Mediterranean'],
  ['🌏', 'Asian'], ['🇺🇸', 'American'], ['🥗', 'Vegetarian'], ['🥑', 'Keto'],
];

const Illustration: React.FC<{ kind: IllustrationKind; large?: boolean }> = ({ kind, large = false }) => {
  const item = illustrations[kind];
  return (
    <div className={`anime-scene bg-gradient-to-br ${item.accent} ${large ? 'anime-scene-lg' : ''}`} aria-label={item.title}>
      <span className="sparkle sparkle-a">✦</span><span className="sparkle sparkle-b">✧</span><span className="sparkle sparkle-c">✨</span>
      <div className="anime-orbit orbit-one" /><div className="anime-orbit orbit-two" />
      <img className="anime-character" src={item.src} alt="" aria-hidden="true" />
      <div className="anime-card anime-card-top"><b>{kind === 'lab' ? 'LAB RESULTS' : 'YOUR HEALTH'}</b><span>{kind === 'calculator' ? 'BMI 22.4' : kind === 'watch' ? '8,420 steps' : '75% complete'}</span></div>
      <div className="anime-card anime-card-bottom"><span className="mini-dot" />{kind === 'care' ? 'Care team online' : kind === 'plan' ? 'Plan matched ✨' : 'Science-backed'}</div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { t, dir } = useLanguage();
  return (
    <div className="home-shell" dir={dir}>
      <section className="hero-section">
        <div className="hero-mesh" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
            <div className="hero-copy">
              <span className="eyebrow"><span className="status-dot" /> AI-POWERED · ANIME MAGIC ✨</span>
              <h1>Your <span>Personalized</span> Health &amp; Fitness Blueprint</h1>
              <p>Science-backed calculators, meal plans, and workout routines powered by internationally recognized medical guidelines.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/fitness" className="btn-primary hero-cta">Get Started Free <span>→</span></Link>
                <Link to="/diabetes" className="btn-outline hero-cta">Diabetes &amp; Hypertension Calculator</Link>
              </div>
              <div className="trust-row"><span>Trusted frameworks</span>{['ADA', 'DASH', 'USDA', 'ACSM'].map((x) => <b key={x}>{x}</b>)}</div>
            </div>
            <div className="relative">
              <Illustration kind="calculator" large />
              <div className="floating-stat stat-bmi"><strong>22.4</strong><small>BMI · healthy</small></div>
              <div className="floating-stat stat-bmr"><strong>1,680</strong><small>BMR kcal</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap" id="calculator">
        <div className="section-intro"><span className="step-pill">STEP 1 · ASSESS</span><h2>1. حاسبة اللياقة الصحية والتمارين</h2><p>Enter your profile once and get instant BMI, BMR, daily calories, water, and protein targets with transparent formulas.</p></div>
        <div className="explainer-grid">
          <Illustration kind="calculator" />
          <div className="feature-panel">
            <div className="mock-inputs"><div><label>AGE</label><strong>28 years</strong></div><div><label>HEIGHT</label><strong>172 cm</strong></div><div><label>WEIGHT</label><strong>74 kg</strong></div></div>
            <div className="feature-list">{['BMI & ideal weight', 'BMR and daily calories', 'Water and protein targets'].map((x) => <span key={x}>✓ {x}</span>)}</div>
            <Link to="/fitness" className="btn-primary">جرب الحاسبة الآن <span>→</span></Link>
            <p className="panel-note">احفظ النتيجة وانتقل مباشرة إلى خطة الوزن واللياقة.</p>
          </div>
        </div>
      </section>

      <section className="section-wrap section-tint">
        <div className="explainer-grid reverse">
          <div className="section-intro"><span className="step-pill pink">STEP 2 · PLAN</span><h2>2. الوزن واللياقة - خطتك الشخصية</h2><p>Choose fat loss, maintenance, or muscle gain. Explore cuisines, meal tabs, and workouts that fit your goal and lifestyle.</p>
            <div className="cuisine-grid">{cuisines.map(([flag, name]) => <span key={name}>{flag} {name}</span>)}</div>
            <Link to="/weight-loss" className="btn-secondary">شوف خطتك <span>→</span></Link>
          </div>
          <Illustration kind="plan" />
        </div>
      </section>

      <section className="section-wrap">
        <div className="explainer-grid">
          <Illustration kind="care" />
          <div className="section-intro"><span className="step-pill purple">STEP 3 · ADVANCED CARE</span><h2>3. الرعاية المتقدمة - لكل الحالات</h2><p>Interpret labs and blood pressure, then build condition-aware nutrition and exercise guidance for your next step.</p>
            <div className="condition-grid">{conditions.map(([icon, en, ar, path]) => <Link to={path} key={en}><span>{icon}</span><b>{en}</b><small>{ar}</small></Link>)}</div>
            <Link to="/advanced-care" className="btn-primary">استكشف خطط الرعاية <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section-wrap section-tint">
        <div className="section-intro center"><span className="step-pill">LAB INTERPRETER</span><h2>من نتائج التحاليل إلى خطة واضحة</h2><p>Enter glucose, HbA1c, blood pressure, lipids, liver, kidney, thyroid, or gout markers and see useful ranges and next steps.</p></div>
        <div className="lab-feature"><Illustration kind="lab" large /><div className="lab-copy"><span className="lab-chip">LIVE INTERPRETATION</span><h3>Understand your numbers without the overwhelm.</h3><div className="lab-bars"><span><i style={{ width: '78%' }} />Glucose · in range</span><span><i style={{ width: '52%' }} />Blood pressure · stage 1</span><span><i style={{ width: '88%' }} />Cholesterol · optimal</span></div><Link to="/lab-to-plan" className="btn-outline">ابدأ تفسير التحاليل</Link></div></div>
      </section>

      <section className="section-wrap">
        <div className="watch-banner"><Illustration kind="watch" /><div><span className="step-pill blue">SMARTWATCH SYNC</span><h2>اربط ساعتك الذكية</h2><p>Sync steps, heart rate, sleep, and workouts to make every plan more personal.</p><div className="watch-steps"><span>01 Install your app</span><span>02 Enable permissions</span><span>03 Data syncs</span></div><Link to="/smartwatch-sync" className="btn-primary">Connect your watch →</Link></div></div>
      </section>

      <section className="section-wrap final-cta"><div><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE ✨</span><h2>Small inputs. Smarter health decisions.</h2><p>Everything you need to understand your body and build a plan you can actually follow.</p><Link to="/fitness" className="btn-primary hero-cta">Get Started Free <span>→</span></Link></div></section>
    </div>
  );
};

export default HomePage;
