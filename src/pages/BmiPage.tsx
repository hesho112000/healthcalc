import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MedicalDisclaimer from '../components/MedicalDisclaimer';

interface BmiResult {
  bmi: number;
  category: string;
  categoryKey: string;
  color: string;
  bgColor: string;
  borderColor: string;
  idealWeightMin: number;
  idealWeightMax: number;
  healthyBmiMin: number;
  healthyBmiMax: number;
  riskLevel: string;
  recommendations: string[];
}

const bmiCategories = [
  { min: 0, max: 18.5, category: 'Underweight', categoryKey: 'bmiUnderweight', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', gaugeColor: '#3b82f6', riskLevel: 'Moderate' },
  { min: 18.5, max: 25, category: 'Normal', categoryKey: 'bmiNormal', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', gaugeColor: '#10b981', riskLevel: 'Low' },
  { min: 25, max: 30, category: 'Overweight', categoryKey: 'bmiOverweight', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', gaugeColor: '#f59e0b', riskLevel: 'Increased' },
  { min: 30, max: 100, category: 'Obese', categoryKey: 'bmiObese', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', gaugeColor: '#ef4444', riskLevel: 'High' },
];

function getBmiCategory(bmi: number) {
  return bmiCategories.find(c => bmi >= c.min && bmi < c.max) || bmiCategories[3];
}

function calcIdealWeightRange(heightCm: number): { min: number; max: number } {
  const h = heightCm / 100;
  return { min: Math.round(18.5 * h * h * 10) / 10, max: Math.round(24.9 * h * h * 10) / 10 };
}

function getGaugeRotation(bmi: number): number {
  const clamped = Math.min(Math.max(bmi, 10), 45);
  return ((clamped - 10) / 35) * 180 - 90;
}

const BmiPage: React.FC = () => {
  const { t } = useLanguage();
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState(170);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7);
  const [weightKg, setWeightKg] = useState(70);
  const [weightLbs, setWeightLbs] = useState(154);
  const [result, setResult] = useState<BmiResult | null>(null);
  const [showFormula, setShowFormula] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showRisk, setShowRisk] = useState(false);

  const currentHeight = useMemo(() => {
    if (unit === 'metric') return heightCm;
    return Math.round((heightFt * 12 + heightIn) * 2.54);
  }, [unit, heightCm, heightFt, heightIn]);

  const currentWeight = useMemo(() => {
    if (unit === 'metric') return weightKg;
    return Math.round(weightLbs * 0.453592 * 10) / 10;
  }, [unit, weightKg, weightLbs]);

  const idealWeight = useMemo(() => calcIdealWeightRange(currentHeight), [currentHeight]);

  const handleCalculate = useCallback(() => {
    const heightM = currentHeight / 100;
    const bmi = Math.round((currentWeight / (heightM * heightM)) * 10) / 10;
    const cat = getBmiCategory(bmi);
    const recMap: Record<string, string[]> = {
      Underweight: [t('bmiRecUnder1'), t('bmiRecUnder2'), t('bmiRecUnder3')],
      Normal: [t('bmiRecNormal1'), t('bmiRecNormal2'), t('bmiRecNormal3')],
      Overweight: [t('bmiRecOver1'), t('bmiRecOver2'), t('bmiRecOver3')],
      Obese: [t('bmiRecObese1'), t('bmiRecObese2'), t('bmiRecObese3')],
    };
    setResult({
      bmi,
      category: cat.category,
      categoryKey: cat.categoryKey,
      color: cat.color,
      bgColor: cat.bgColor,
      borderColor: cat.borderColor,
      idealWeightMin: idealWeight.min,
      idealWeightMax: idealWeight.max,
      healthyBmiMin: 18.5,
      healthyBmiMax: 24.9,
      riskLevel: cat.riskLevel,
      recommendations: recMap[cat.category] || recMap.Obese,
    });
  }, [currentHeight, currentWeight, idealWeight, t]);

  const gaugeRotation = result ? getGaugeRotation(result.bmi) : 0;
  const isOutNormal = result && (result.bmi < 18.5 || result.bmi >= 25);
  const linkedCondition = result ? (result.bmi >= 30 ? 'diabetes' : result.bmi >= 25 ? 'cholesterol' : null) : null;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-sage-600 to-sage-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-sage-200 rounded-full" />
              <span className="text-xs font-medium text-sage-100">WHO · CDC · NIH</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">{t('bmiTitle')}</h1>
            <p className="text-sage-100 text-sm md:text-base leading-relaxed">{t('bmiSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Card — left */}
          <div className="lg:col-span-2">
            <div className="card sticky top-24">
              {/* Unit Toggle */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-900">{t('bmiYourDetails')}</h2>
                <div className="toggle-group">
                  <button type="button" onClick={() => setUnit('metric')} className={unit === 'metric' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>Metric</button>
                  <button type="button" onClick={() => setUnit('us')} className={unit === 'us' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>US</button>
                </div>
              </div>

              <div className="space-y-5">
                {/* Age */}
                <div>
                  <label className="label">{t('age')}</label>
                  <input type="number" min={2} max={120} value={age} onChange={e => setAge(+e.target.value)} className="input-field-lg" />
                </div>

                {/* Gender Toggle */}
                <div>
                  <label className="label">{t('gender')}</label>
                  <div className="toggle-group">
                    <button type="button" onClick={() => setGender('male')} className={gender === 'male' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>
                      <span className="mr-1.5">♂</span> {t('male')}
                    </button>
                    <button type="button" onClick={() => setGender('female')} className={gender === 'female' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>
                      <span className="mr-1.5">♀</span> {t('female')}
                    </button>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="label">{t('height')}</label>
                  {unit === 'metric' ? (
                    <div className="relative">
                      <input type="number" min={100} max={250} step={0.5} value={heightCm} onChange={e => setHeightCm(+e.target.value)} className="input-field-lg pr-12" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">cm</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input type="number" min={1} max={8} value={heightFt} onChange={e => setHeightFt(+e.target.value)} className="input-field-lg pr-8" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">ft</span>
                      </div>
                      <div className="relative flex-1">
                        <input type="number" min={0} max={11} value={heightIn} onChange={e => setHeightIn(+e.target.value)} className="input-field-lg pr-8" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">in</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <label className="label">{t('weightLabel')}</label>
                  {unit === 'metric' ? (
                    <div className="relative">
                      <input type="number" min={20} max={300} step={0.5} value={weightKg} onChange={e => setWeightKg(+e.target.value)} className="input-field-lg pr-12" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">kg</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <input type="number" min={44} max={660} step={0.5} value={weightLbs} onChange={e => setWeightLbs(+e.target.value)} className="input-field-lg pr-12" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">lbs</span>
                    </div>
                  )}
                </div>

                <button onClick={handleCalculate} className="btn-primary w-full text-center mt-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  {t('calculate')}
                </button>
              </div>
            </div>
          </div>

          {/* Results — right */}
          <div className="lg:col-span-3 space-y-6">
            {!result && (
              <div className="card flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                <div className="w-20 h-20 bg-sage-50 rounded-3xl flex items-center justify-center mb-5">
                  <svg className="w-10 h-10 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('bmiEmptyTitle')}</h3>
                <p className="text-sm text-gray-500 max-w-xs">{t('bmiEmptyDesc')}</p>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-fade-in">
                {/* Gauge + BMI Value */}
                <div className="card flex flex-col items-center py-8">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{t('bmiYourBmi')}</p>
                  <div className="relative w-52 h-28 mb-4">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      {/* Background arc segments */}
                      <path d="M 10 95 A 90 90 0 0 1 55 15" fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      <path d="M 55 15 A 90 90 0 0 1 145 15" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      <path d="M 145 15 A 90 90 0 0 1 180 55" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      <path d="M 180 55 A 90 90 0 0 1 190 95" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      {/* Needle */}
                      <g transform={`rotate(${gaugeRotation}, 100, 95)`}>
                        <line x1="100" y1="95" x2="100" y2="20" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="100" cy="95" r="5" fill="#1f2937" />
                      </g>
                    </svg>
                  </div>
                  <div className={`inline-flex items-baseline gap-2 px-5 py-2.5 rounded-2xl ${result.bgColor} ${result.borderColor} border`}>
                    <span className={`text-4xl font-extrabold ${result.color}`}>{result.bmi}</span>
                    <span className={`text-sm font-semibold ${result.color}`}>{t('bmiKgM2')}</span>
                  </div>
                  <p className={`mt-3 text-sm font-bold ${result.color}`}>{t(result.categoryKey as 'bmiUnderweight' | 'bmiNormal' | 'bmiOverweight' | 'bmiObese')}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{t('bmiRisk')}: {result.riskLevel}</p>
                </div>

                {/* Bite-sized metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="stat-card text-center">
                    <p className="text-lg font-extrabold text-gray-900">{result.bmi}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{t('bmiValue')}</p>
                  </div>
                  <div className="stat-card text-center">
                    <p className="text-lg font-extrabold text-emerald-600">18.5 – 24.9</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{t('bmiHealthyRange')}</p>
                  </div>
                  <div className="stat-card text-center col-span-2 sm:col-span-1">
                    <p className="text-lg font-extrabold text-primary-600">{result.idealWeightMin} – {result.idealWeightMax} {t('kg')}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{t('bmiIdealWeight')}</p>
                  </div>
                </div>

                {/* Smart Cross-Promotion */}
                {isOutNormal && linkedCondition && (
                  <Link to="/premium" className={`block rounded-2xl border p-4 transition-all hover:shadow-card-hover hover:-translate-y-0.5 ${result.bgColor} ${result.borderColor}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${result.bgColor}`}>
                        <span className="text-lg">{linkedCondition === 'diabetes' ? '🩸' : '🫀'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold ${result.color}`}>{t('bmiCrossPromo')}</p>
                        <p className="text-xs text-gray-500 truncate">{t(`bmiCrossPromo${linkedCondition === 'diabetes' ? 'Diabetes' : 'Cholesterol'}`)}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </Link>
                )}

                {isOutNormal && !linkedCondition && (
                  <Link to="/premium" className={`block rounded-2xl border p-4 transition-all hover:shadow-card-hover hover:-translate-y-0.5 ${result.bgColor} ${result.borderColor}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center shrink-0">
                        <span className="text-lg">🏥</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-sage-700">{t('bmiCrossPromo')}</p>
                        <p className="text-xs text-gray-500 truncate">{t('bmiCrossPromoGeneral')}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </Link>
                )}

                {/* Recommendations */}
                <div className="card">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-lg">💡</span> {t('bmiRecommendations')}
                  </h4>
                  <ul className="space-y-2.5">
                    {result.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-sage-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progressive Disclosure Accordions */}
                <div className="space-y-3">
                  {/* Formula */}
                  <div className="card !p-0 overflow-hidden">
                    <button onClick={() => setShowFormula(!showFormula)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-all">
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-lg">📐</span> {t('bmiFormulaTitle')}
                      </span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${showFormula ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showFormula && (
                      <div className="px-6 pb-5 border-t border-gray-100 pt-4 animate-fade-in">
                        <div className="bg-gray-50 rounded-xl p-4 mb-3">
                          <p className="text-sm font-mono text-gray-700 text-center">BMI = weight (kg) / height² (m²)</p>
                          <p className="text-xs text-gray-500 text-center mt-2">{t('bmiFormulaExample')}</p>
                        </div>
                        <p className="text-xs text-gray-500">{t('bmiFormulaNote')}</p>
                      </div>
                    )}
                  </div>

                  {/* BMI Table */}
                  <div className="card !p-0 overflow-hidden">
                    <button onClick={() => setShowTable(!showTable)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-all">
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-lg">📊</span> {t('bmiTableTitle')}
                      </span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${showTable ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showTable && (
                      <div className="px-6 pb-5 border-t border-gray-100 pt-4 animate-fade-in">
                        <div className="space-y-2">
                          {bmiCategories.map(c => (
                            <div key={c.category} className={`flex items-center justify-between p-3 rounded-xl ${c.bgColor} border ${c.borderColor}`}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: c.gaugeColor }} />
                                <span className={`text-sm font-semibold ${c.color}`}>{c.category}</span>
                              </div>
                              <span className="text-xs font-mono text-gray-600">
                                {c.min === 0 ? '< 18.5' : c.max === 100 ? '≥ 30' : `${c.min} – ${c.max - 0.1}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Health Risks */}
                  <div className="card !p-0 overflow-hidden">
                    <button onClick={() => setShowRisk(!showRisk)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-all">
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-lg">⚠️</span> {t('bmiRiskTitle')}
                      </span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${showRisk ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showRisk && (
                      <div className="px-6 pb-5 border-t border-gray-100 pt-4 animate-fade-in">
                        <div className="space-y-3">
                          {[
                            { cat: 'Underweight', risks: ['Nutrient deficiencies', 'Weakened immune system', 'Bone density loss', 'Fertility issues'], color: 'text-blue-600' },
                            { cat: 'Overweight', risks: ['Type 2 diabetes risk ↑', 'Heart disease risk ↑', 'Sleep apnea', 'Joint stress'], color: 'text-amber-600' },
                            { cat: 'Obese', risks: ['Cardiovascular disease', 'Type 2 diabetes', 'Certain cancers risk ↑', 'Metabolic syndrome'], color: 'text-red-600' },
                          ].map(r => (
                            <div key={r.cat} className="bg-gray-50 rounded-xl p-4">
                              <p className={`text-sm font-bold ${r.color} mb-2`}>{r.cat}</p>
                              <ul className="space-y-1">
                                {r.risks.map((risk, i) => (
                                  <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full" />{risk}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <MedicalDisclaimer />
              </div>
            )}

            {!result && <MedicalDisclaimer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiPage;
