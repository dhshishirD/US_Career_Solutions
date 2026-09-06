'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle, 
  Globe2, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Award,
  ChevronRight,
  Download,
  Share2,
  Check
} from 'lucide-react';

export default function VisaSimulatorPage() {
  const [step, setStep] = useState(1);
  const [citizenship, setCitizenship] = useState('other');
  const [degree, setDegree] = useState('bachelor');
  const [experience, setExperience] = useState('2-5');
  const [field, setField] = useState('software');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [targetGoal, setTargetGoal] = useState('onsite');
  const [copied, setCopied] = useState(false);

  const toggleAchievement = (id: string) => {
    setAchievements(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const results = useMemo(() => {
    let capExemptScore = 40;
    let scheduleANurseScore = 10;
    let eb2NiwScore = 25;
    let o1Score = 15;
    let standardH1BScore = 50;
    let remoteW8benScore = 75;

    // Degree impact
    if (degree === 'phd') {
      eb2NiwScore += 40;
      o1Score += 35;
      capExemptScore += 35;
      standardH1BScore += 20;
    } else if (degree === 'us-masters') {
      eb2NiwScore += 25;
      capExemptScore += 30;
      standardH1BScore += 30; // Masters lottery cap
    } else if (degree === 'foreign-masters') {
      eb2NiwScore += 20;
      capExemptScore += 25;
      standardH1BScore += 10;
    }

    // Experience impact
    if (experience === '8+') {
      eb2NiwScore += 25;
      o1Score += 25;
      capExemptScore += 15;
      remoteW8benScore += 20;
    } else if (experience === '5-8') {
      eb2NiwScore += 15;
      o1Score += 15;
      remoteW8benScore += 15;
    }

    // Field impact
    if (field === 'nursing') {
      scheduleANurseScore = 95;
      capExemptScore = 90; // Hospital systems
      standardH1BScore = 30; // Nurses usually do EB-3
    } else if (field === 'software' || field === 'data') {
      remoteW8benScore += 20;
      capExemptScore += 20;
    } else if (field === 'academia') {
      capExemptScore = 95;
      eb2NiwScore += 25;
    }

    // Achievements impact
    if (achievements.includes('publications')) {
      eb2NiwScore += 25;
      o1Score += 30;
      capExemptScore += 15;
    }
    if (achievements.includes('patents')) {
      eb2NiwScore += 20;
      o1Score += 25;
    }
    if (achievements.includes('awards')) {
      o1Score += 30;
      eb2NiwScore += 15;
    }
    if (achievements.includes('high-salary')) {
      o1Score += 15;
      eb2NiwScore += 10;
    }

    // Retrogression warning for India/China
    const isRetrogressed = citizenship === 'india' || citizenship === 'china';

    return {
      capExempt: Math.min(capExemptScore, 98),
      scheduleANurse: Math.min(scheduleANurseScore, 99),
      eb2Niw: Math.min(eb2NiwScore, 95),
      o1: Math.min(o1Score, 92),
      standardH1B: Math.min(standardH1BScore, 75),
      remoteW8ben: Math.min(remoteW8benScore, 99),
      isRetrogressed
    };
  }, [citizenship, degree, experience, field, achievements, targetGoal]);

  const handleShare = () => {
    const text = '🎯 I just analyzed my US Visa & Green Card eligibility on US Career Solutions: https://www.uscareersolutions.online/tools/visa-simulator';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          AI Immigration Pathway Wizard (2026 USCIS Rules)
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          US Visa & Green Card Eligibility Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Discover your statistical eligibility across 6 official US immigration pathways. Find out if you can <strong>bypass the H-1B annual lottery</strong> via Cap-Exempt institutions, direct Schedule A Nurse Green Cards, or self-petitioned EB-2 NIW.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {step}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {step === 1 && 'Step 1: Citizenship & Country of Birth'}
              {step === 2 && 'Step 2: Educational Credentials'}
              {step === 3 && 'Step 3: Professional Experience & Industry'}
              {step === 4 && 'Step 4: Notable Achievements & Publications'}
              {step === 5 && 'Step 5: Your Personalized US Pathway Report'}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            {step < 5 ? `Step ${step} of 4` : 'Analysis Complete'}
          </span>
        </div>

        {/* Step 1: Citizenship */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Where were you born / what is your country of citizenship?
            </h2>
            <p className="text-xs text-slate-500">
              US Green Card priority dates are governed by country of chargeability (birthplace), which impacts EB-2 and EB-3 waiting times.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'other', label: 'Worldwide / Rest of World (All Other Countries)', sub: 'Fastest Green Card processing' },
                { id: 'bangladesh', label: 'Bangladesh / South Asia', sub: 'Worldwide priority date tier' },
                { id: 'nigeria', label: 'Nigeria / Ghana / Africa', sub: 'Worldwide priority date tier' },
                { id: 'philippines', label: 'Philippines', sub: 'Dedicated Schedule A nursing pipeline' },
                { id: 'india', label: 'India', sub: 'Subject to EB-2/EB-3 retrogression queues' },
                { id: 'china', label: 'China', sub: 'Subject to EB-2 priority date waitlists' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCitizenship(c.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    citizenship === c.id
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{c.label}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{c.sub}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                Continue to Education <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Degree */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              What is your highest completed or in-progress level of education?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'phd', label: 'PhD, MD, or Doctorate Degree', sub: 'Unlocks top eligibility for EB-2 NIW, O-1, and Cap-Exempt Research H-1B' },
                { id: 'us-masters', label: 'Master\'s Degree from a US University (F-1/OPT)', sub: 'Qualifies for 20,000 extra US Master\'s H-1B Lottery Cap + STEM OPT' },
                { id: 'foreign-masters', label: 'Master\'s Degree from Foreign University', sub: 'Qualifies for Advanced Degree EB-2 and commercial H-1B' },
                { id: 'bachelor', label: '4-Year Bachelor\'s Degree (BS / BA / B.Tech / BSN)', sub: 'Standard prerequisite for H-1B and EB-3 Professional Green Card' },
                { id: 'diploma', label: 'Diploma / Associate Degree / High School', sub: 'Best suited for Remote USD Freelancing or US University Study pathways' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDegree(d.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    degree === d.id
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{d.label}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{d.sub}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                Continue to Experience <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Experience & Field */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                What is your primary professional industry?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'software', label: 'Software, AI & Cloud Tech' },
                  { id: 'nursing', label: 'Registered Nursing & Healthcare' },
                  { id: 'data', label: 'Data Science & AI Annotation' },
                  { id: 'engineering', label: 'Hardware / Mechanical / Civil Eng' },
                  { id: 'academia', label: 'University Research & Teaching' },
                  { id: 'business', label: 'Business, Finance & Operations' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setField(f.id)}
                    className={`p-3 rounded-xl border text-left transition-all text-xs font-bold ${
                      field === f.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20'
                        : 'border-slate-200 text-slate-700 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Total Years of Full-Time Professional Experience:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: '0-2', label: 'Under 2 Years (Junior)' },
                  { id: '2-5', label: '2 to 5 Years (Mid-Level)' },
                  { id: '5-8', label: '5 to 8 Years (Senior)' },
                  { id: '8+', label: '8+ Years (Lead / Staff)' },
                ].map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setExperience(exp.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold ${
                      experience === exp.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                Continue to Achievements <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Achievements */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Select all special credentials or achievements that apply to you:
            </h2>
            <p className="text-xs text-slate-500">
              These factors trigger high eligibility for O-1 extraordinary ability visas and self-petitioned EB-2 NIW Green Cards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'publications', label: 'Published Research Papers or Citations', desc: 'Authored papers in peer-reviewed journals or IEEE/ACM conferences' },
                { id: 'patents', label: 'Granted Patents or Commercial Inventions', desc: 'Hold utility or software patents in your technical domain' },
                { id: 'awards', label: 'National / International Professional Awards', desc: 'Recognized by major professional societies or hackathons' },
                { id: 'high-salary', label: 'High Historical Salary (DOL Level 3/4)', desc: 'Command significantly higher earnings than the market average' },
                { id: 'nclex', label: 'Active NCLEX-RN Pass / US Nursing License', desc: 'Qualified for direct Schedule A hospital Green Card sponsorship' },
                { id: 'none', label: 'Standard Strong Resume (No Special Awards Yet)', desc: 'Ready for standard H-1B, Cap-Exempt, or Remote W-8BEN roles' },
              ].map((ach) => {
                const isSelected = achievements.includes(ach.id);
                return (
                  <button
                    key={ach.id}
                    onClick={() => toggleAchievement(ach.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{ach.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{ach.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-8 py-3 rounded-xl text-xs shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Generate My US Immigration Report
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Results Dashboard */}
        {step === 5 && (
          <div className="space-y-8">
            
            {/* Summary Top Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 text-white relative overflow-hidden border border-slate-700">
              <div className="relative z-10">
                <span className="inline-block bg-emerald-400 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md mb-2 tracking-wider">
                  ✓ Profile Analysis Complete
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Your Top Recommended US Pathway:
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Based on your educational credentials and industry profile, you have high probability pathways that completely <strong>bypass the annual H-1B lottery cap</strong>.
                </p>
              </div>
            </div>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Card 1: Cap-Exempt H-1B */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-blue-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      Zero Lottery Cap
                    </span>
                    <span className="text-sm font-black text-blue-600">{results.capExempt}% Match</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                    Cap-Exempt H-1B (Universities & Hospitals)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Higher education institutions, teaching hospitals, and affiliated non-profit research labs file H-1B petitions anytime with 100% approval rates.
                  </p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${results.capExempt}%` }} />
                  </div>
                </div>
                <Link 
                  href="/landing/visa-sponsorship-jobs" 
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 mt-2"
                >
                  View Cap-Exempt Employers &rarr;
                </Link>
              </div>

              {/* Card 2: Schedule A Nurse */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-emerald-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Direct Green Card
                    </span>
                    <span className="text-sm font-black text-emerald-600">{results.scheduleANurse}% Match</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                    Schedule A Nurse Direct EB-3
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    US hospitals sponsor international NCLEX-passed nurses directly for permanent residency, skipping the 1-year PERM labor certification process.
                  </p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${results.scheduleANurse}%` }} />
                  </div>
                </div>
                <Link 
                  href="/guides/international-nurse-schedule-a-greencard-guide" 
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 mt-2"
                >
                  Read Schedule A Guide &rarr;
                </Link>
              </div>

              {/* Card 3: EB-2 NIW */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-purple-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                      Self-Petitioned
                    </span>
                    <span className="text-sm font-black text-purple-600">{results.eb2Niw}% Match</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                    EB-2 National Interest Waiver (NIW)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Self-petition for a Green Card without needing an employer sponsor if your work in STEM/AI/Healthcare has substantial intrinsic merit to the US.
                  </p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${results.eb2Niw}%` }} />
                  </div>
                </div>
                <Link 
                  href="/learn?tab=salaries" 
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1 mt-2"
                >
                  Check NIW Wage Tiers &rarr;
                </Link>
              </div>

              {/* Card 4: Global Remote W-8BEN */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100">
                      Immediate USD Pay
                    </span>
                    <span className="text-sm font-black text-amber-600">{results.remoteW8ben}% Match</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                    Global Remote USD Contractor (W-8BEN)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Earn \$3,000 to \$12,000/mo working directly for US tech companies, AI labs, and agencies from your home country with zero visa requirements.
                  </p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${results.remoteW8ben}%` }} />
                  </div>
                </div>
                <Link 
                  href="/landing/us-remote-jobs-w8ben" 
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 mt-2"
                >
                  Browse Remote USD Roles &rarr;
                </Link>
              </div>

              {/* Card 5: O-1A Extraordinary Ability */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-indigo-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      No Annual Limit
                    </span>
                    <span className="text-sm font-black text-indigo-600">{results.o1}% Match</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                    O-1A Extraordinary Ability Visa
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    For individuals with demonstrated record of extraordinary achievement in science, education, business, or athletics. Unlimited renewals.
                  </p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${results.o1}%` }} />
                  </div>
                </div>
                <Link 
                  href="/tools/visa-checker" 
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 mt-2"
                >
                  Verify Sponsor Radar &rarr;
                </Link>
              </div>

              {/* Card 6: Standard Commercial H-1B */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-slate-400 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Annual Lottery (March)
                    </span>
                    <span className="text-sm font-black text-slate-700">{results.standardH1B}% Match</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                    Standard Commercial H-1B Lottery
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    65,000 standard cap + 20,000 US Master\'s exemption. Requires commercial employer sponsorship registered each March.
                  </p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-slate-500 h-full rounded-full" style={{ width: `${results.standardH1B}%` }} />
                  </div>
                </div>
                <Link 
                  href="/jobs" 
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 mt-2"
                >
                  Search H-1B Employers &rarr;
                </Link>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Analysis
              </button>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    const msg = `⚡ *My US Visa & Green Card Pathway Scorecard:*\n• Cap-Exempt H-1B Match: ${results.capExempt}% (No Lottery)\n• Schedule A Nurse EB-3: ${results.scheduleANurse}% (Direct Green Card)\n• EB-2 NIW Match: ${results.eb2Niw}% (Self-Petitioned)\n• Remote USD (W-8BEN): ${results.remoteW8ben}%\n\nTest your US visa & green card eligibility here: https://www.uscareersolutions.online/tools/visa-simulator`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
                >
                  <span>📱</span> Share on WhatsApp
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  VIP Advice ($29)
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Authoritative US Immigration & Green Card Pathways Guide (Natural SEO) */}
      <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Understanding US Employment-Based Green Card & Visa Pathways (2026)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Transitioning from an F-1 student visa, H-1B, or direct foreign hiring to a <strong>permanent resident green card</strong> requires navigating specific USCIS preference categories. Our <strong>US visa eligibility simulator</strong> evaluates your qualifications across major employment-based (EB) immigrant and non-immigrant pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs">
          <div className="space-y-2">
            <h3 className="font-bold text-blue-700 uppercase tracking-wider">
              EB-1A & EB-1B Extraordinary Ability
            </h3>
            <p className="text-slate-600 leading-relaxed">
              The <strong>EB-1 green card</strong> category is reserved for individuals with sustained national or international acclaim, outstanding researchers, and multinational executives. EB-1A allows <strong>self-sponsored green card</strong> petitions with no employer requirement and current priority dates.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-purple-700 uppercase tracking-wider">
              EB-2 National Interest Waiver (NIW)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              The <strong>EB-2 NIW green card</strong> allows professionals holding advanced degrees (Master\'s, PhD) or exceptional ability in STEM, healthcare, or AI to waive the permanent job offer and PERM labor certification if their endeavor has substantial merit and national importance to the United States.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-emerald-700 uppercase tracking-wider">
              Schedule A Nurse & EB-3 Professional
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Under Department of Labor Schedule A designation, Registered Nurses (RNs) and physical therapists are pre-certified for <strong>employment-based green cards</strong>, allowing hospitals to sponsor permanent residency directly without lengthy labor market testing.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            USCIS regulations, Form I-140 filing criteria, and visa bulletin priority dates are updated periodically by the US Department of State.
          </p>
          <Link href="/guides" className="text-blue-600 font-bold hover:underline shrink-0">
            Read Complete Visa Blueprints &rarr;
          </Link>
        </div>
      </div>

    </div>
  );
}
