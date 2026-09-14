'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  GraduationCap, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  Users,
  Building2,
  Atom,
  Cpu,
  HeartPulse,
  Leaf,
  Globe
} from 'lucide-react';

export default function NIWEvaluatorPage() {
  // Form State
  const [degree, setDegree] = useState<'phd' | 'masters' | 'bachelors_5yr' | 'bachelors_only'>('phd');
  const [citations, setCitations] = useState<number>(45);
  const [papers, setPapers] = useState<number>(6);
  const [firstAuthorPapers, setFirstAuthorPapers] = useState<number>(3);
  const [peerReviews, setPeerReviews] = useState<number>(8);
  const [patents, setPatents] = useState<number>(1);
  const [grantFunding, setGrantFunding] = useState<boolean>(true);
  const [commercialDeployment, setCommercialDeployment] = useState<boolean>(true);
  const [criticalDomain, setCriticalDomain] = useState<string>('ai_tech');
  const [hasIndependentLetters, setHasIndependentLetters] = useState<boolean>(true);
  const [copiedCoverLetter, setCopiedCoverLetter] = useState<boolean>(false);

  // Calculate Evaluation
  const calculateEvaluation = () => {
    let score = 0;
    const feedback: { prong: string; status: 'strong' | 'moderate' | 'weak'; details: string }[] = [];
    const recommendations: string[] = [];

    // Base Degree Threshold (8 CFR § 204.5(k)(2))
    let degreeScore = 0;
    if (degree === 'phd') degreeScore = 25;
    else if (degree === 'masters') degreeScore = 20;
    else if (degree === 'bachelors_5yr') degreeScore = 15;
    else degreeScore = 5;
    score += degreeScore;

    // Citations & Scholarly Metric Impact
    let citationScore = 0;
    if (citations >= 150) citationScore = 25;
    else if (citations >= 75) citationScore = 20;
    else if (citations >= 30) citationScore = 15;
    else if (citations >= 10) citationScore = 10;
    else citationScore = 3;
    score += citationScore;

    // Papers & First Authorship
    if (firstAuthorPapers >= 3 || papers >= 8) score += 12;
    else if (papers >= 3) score += 8;
    else score += 3;

    // Peer Reviews (Evidence of standing as judge of others under 8 CFR § 204.5)
    if (peerReviews >= 10) score += 12;
    else if (peerReviews >= 4) score += 8;
    else if (peerReviews >= 1) score += 4;

    // Critical Tech & National Importance Domain (Executive Orders / White House Critical List)
    const isHighPriorityDomain = ['ai_tech', 'biomed', 'clean_energy', 'semiconductor'].includes(criticalDomain);
    if (isHighPriorityDomain) score += 12;
    else score += 6;

    // Federal Grants / Commercial Deployment
    if (grantFunding) score += 7;
    if (commercialDeployment || patents > 0) score += 7;

    // Independent Letters
    if (hasIndependentLetters) score += 5;

    // Cap score at 98% (USCIS always has discretionary adjudication)
    const finalScore = Math.min(98, Math.max(25, score));

    // Determine Tier
    let tier: 'exceptional' | 'strong' | 'moderate' | 'borderline';
    let tierColor: string;
    let tierLabel: string;
    let tierBg: string;

    if (finalScore >= 80) {
      tier = 'exceptional';
      tierLabel = 'Exceptional Case (High Approval Probability)';
      tierColor = 'text-emerald-700';
      tierBg = 'bg-emerald-50 border-emerald-300';
    } else if (finalScore >= 65) {
      tier = 'strong';
      tierLabel = 'Strong Case (Solid National Interest Argument)';
      tierColor = 'text-blue-700';
      tierBg = 'bg-blue-50 border-blue-300';
    } else if (finalScore >= 50) {
      tier = 'moderate';
      tierLabel = 'Moderate / Developing Case (Requires Strategic Evidence)';
      tierColor = 'text-amber-700';
      tierBg = 'bg-amber-50 border-amber-300';
    } else {
      tier = 'borderline';
      tierLabel = 'Borderline Profile (Risk of USCIS RFE / NOID)';
      tierColor = 'text-red-700';
      tierBg = 'bg-red-50 border-red-300';
    }

    // Prong 1: Substantial Merit & National Importance
    if (isHighPriorityDomain) {
      feedback.push({
        prong: 'Prong 1: Substantial Merit & National Importance',
        status: 'strong',
        details: 'Your proposed endeavor aligns with designated U.S. Critical & Emerging Technologies or public health mandates with national, prospective impact.'
      });
    } else {
      feedback.push({
        prong: 'Prong 1: Substantial Merit & National Importance',
        status: 'moderate',
        details: 'You must carefully articulate how your research or engineering impacts the U.S. economy broadly rather than just benefiting a single private employer.'
      });
    }

    // Prong 2: Well-Positioned to Advance the Endeavor
    if (citations >= 30 && (papers >= 4 || patents >= 1) && degree !== 'bachelors_only') {
      feedback.push({
        prong: 'Prong 2: Well-Positioned to Advance Endeavor',
        status: 'strong',
        details: `Your record of ${citations} citations, published papers, and advanced degree proves past record of success and field influence.`
      });
    } else {
      feedback.push({
        prong: 'Prong 2: Well-Positioned to Advance Endeavor',
        status: 'moderate',
        details: 'To satisfy Prong 2, emphasize media coverage, commercial deployments, or acquire 3-4 independent recommendation letters from prominent researchers.'
      });
    }

    // Prong 3: On Balance Beneficial to Waive PERM Labor Certification
    if (grantFunding || isHighPriorityDomain || citations >= 50) {
      feedback.push({
        prong: 'Prong 3: Balance of Factors to Waive PERM',
        status: 'strong',
        details: 'The urgent national interest and specialized nature of your endeavor make standard Department of Labor PERM recruitment impractical.'
      });
    } else {
      feedback.push({
        prong: 'Prong 3: Balance of Factors to Waive PERM',
        status: 'weak',
        details: 'You must argue why requiring a corporate sponsor would delay U.S. advancements in your field.'
      });
    }

    // Recommendations
    if (citations < 30) {
      recommendations.push('Target publishing in high-impact open-access journals to accelerate citation velocity over the next 3-6 months.');
    }
    if (peerReviews < 5) {
      recommendations.push('Reach out to journal editors in your sub-specialty to secure at least 4-6 peer review assignments to prove expert status.');
    }
    if (!hasIndependentLetters) {
      recommendations.push('Crucial: Secure 3 to 4 "Independent" recommendation letters from professors or directors who have never co-authored or worked with you.');
    }
    if (!grantFunding && !commercialDeployment) {
      recommendations.push('Document how your work was supported by institutional or federal grant funds (e.g., NSF, NIH, DARPA, DOE) to substantiate U.S. government interest.');
    }
    recommendations.push('Utilize Form I-907 Premium Processing (45 calendar days USCIS adjudication response) to eliminate long multi-year processing delays.');

    return {
      finalScore,
      tierLabel,
      tierColor,
      tierBg,
      feedback,
      recommendations
    };
  };

  const evalResult = calculateEvaluation();

  const domainNames: Record<string, { name: string; icon: any }> = {
    ai_tech: { name: 'Artificial Intelligence, LLMs & Machine Learning', icon: Cpu },
    semiconductor: { name: 'Semiconductors, Microelectronics & CHIPS Act', icon: Atom },
    biomed: { name: 'Biomedical Sciences, Oncology & Genomics', icon: HeartPulse },
    clean_energy: { name: 'Renewable Energy, Grid Storage & Decarbonization', icon: Leaf },
    supply_chain: { name: 'National Defense, Cybersecurity & Infrastructure', icon: Globe },
    other_stem: { name: 'Other STEM / Applied Engineering & Finance', icon: Building2 },
  };

  const coverLetterTemplate = `PETITION FOR IMMIGRANT WORKER UNDER SECTION 203(b)(2) OF THE IMMIGRATION AND NATIONALITY ACT (EB-2 NATIONAL INTEREST WAIVER)

Petitioner/Beneficiary: [Your Full Legal Name]
Classification Sought: Alien of Exceptional Ability / Member of the Professions Holding an Advanced Degree
Statutory Authority: INA § 203(b)(2)(B); 8 CFR § 204.5(k); Matter of Dhanasar, 26 I&N Dec. 884 (AAO 2016)

I. PRELIMINARY STATEMENT & QUALIFYING THRESHOLD
The Petitioner holds an Advanced Degree ([Degree Level: ${degree.toUpperCase()}]) in [Field of Study], fulfilling the baseline statutory threshold set forth in 8 CFR § 204.5(k)(2).

II. SATISFACTION OF THE THREE-PRONG DHANASAR PRECEDENT
1. PRONG 1: THE PROPOSED ENDEAVOR HAS BOTH SUBSTANTIAL MERIT AND NATIONAL IMPORTANCE
The Petitioner's proposed endeavor focuses on advancing ${domainNames[criticalDomain]?.name || 'critical research'}, which directly aligns with U.S. national priorities and federal initiatives.

2. PRONG 2: THE PETITIONER IS WELL-POSITIONED TO ADVANCE THE PROPOSED ENDEAVOR
The Petitioner possesses a distinguished record of achievement, documented by:
- ${citations}+ Academic Citations indexed on Google Scholar demonstrating broad field adoption.
- ${papers} Peer-Reviewed Publications and Conference Articles in top-tier proceedings.
- Service as an Expert Peer Reviewer for ${peerReviews} professional manuscripts.
- ${patents > 0 ? `${patents} Patent / Commercial Deployments.` : 'Tangible technical implementations.'}
- Corroboration by Independent Reference Letters from leading non-collaborator authorities.

3. PRONG 3: ON BALANCE, IT IS BENEFICIAL TO THE UNITED STATES TO WAIVE THE JOB OFFER AND PERM REQUIREMENTS
Given the critical urgency of the Petitioner\'s endeavor, forcing standard Department of Labor labor market recruitment would severely delay or forfeit the substantial prospective benefits to the United States.

CONCLUSION:
The Petitioner respectfully requests that USCIS approve this Immigrant Petition under INA § 203(b)(2) with a National Interest Waiver.`;

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetterTemplate);
    setCopiedCoverLetter(true);
    setTimeout(() => setCopiedCoverLetter(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-xs font-semibold mb-3 shadow-sm">
          <Scale className="w-4 h-4 text-indigo-600" />
          USCIS Matter of Dhanasar 3-Prong Statutory Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          EB-2 NIW Profile Evaluator & Citation Scorer
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Test your direct <strong>National Interest Waiver (Self-Petition Green Card)</strong> approval probability without needing an employer sponsor or PERM labor certification under <strong>8 CFR § 204.5(k)(2)</strong>.
        </p>
      </div>

      {/* Main Grid: Input Form (Left) + Real-Time Evaluation (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                Step 1: Baseline Educational Threshold
              </h2>
              <span className="text-xs text-slate-400 font-medium">8 CFR § 204.5(k)</span>
            </div>

            {/* Degree Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Highest Completed Degree Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { value: 'phd', label: 'Doctorate (PhD / MD / JD)', badge: 'Preferred' },
                  { value: 'masters', label: "U.S. Master's / Foreign Equiv", badge: 'Strong' },
                  { value: 'bachelors_5yr', label: "Bachelor's + 5 Yrs Exp", badge: 'Eligible' },
                  { value: 'bachelors_only', label: "Bachelor's Only (<5 Yrs)", badge: 'Needs Excep.' }
                ].map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDegree(d.value as any)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      degree === d.value
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 leading-tight mb-1">{d.label}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${
                      degree === d.value ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {d.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scholarly & Impact Metrics */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Step 2: Scholarly & Field Influence Metrics
              </h2>

              {/* Citations Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Google Scholar Total Citations</span>
                  <span className="text-indigo-600 font-extrabold text-sm">{citations.toLocaleString()} Citations</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="350"
                  step="5"
                  value={citations}
                  onChange={(e) => setCitations(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                  <span>0 (Emerging)</span>
                  <span>50 (Solid NIW)</span>
                  <span>150+ (High Approval)</span>
                  <span>350+</span>
                </div>
              </div>

              {/* Grid: Papers & Reviews */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Publications
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={papers}
                    onChange={(e) => setPapers(Math.max(0, Number(e.target.value)))}
                    className="w-full text-sm font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                  <span className="text-[10px] text-slate-400">Journals & Conferences</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    First-Author Papers
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={firstAuthorPapers}
                    onChange={(e) => setFirstAuthorPapers(Math.max(0, Number(e.target.value)))}
                    className="w-full text-sm font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                  <span className="text-[10px] text-slate-400">Lead Investigator</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Peer Reviews Judged
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={peerReviews}
                    onChange={(e) => setPeerReviews(Math.max(0, Number(e.target.value)))}
                    className="w-full text-sm font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                  <span className="text-[10px] text-slate-400">8 CFR § 204.5 Standing</span>
                </div>
              </div>

              {/* Patents & Additional Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={grantFunding}
                    onChange={(e) => setGrantFunding(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Supported by U.S. Federal Grants</div>
                    <div className="text-[10px] text-slate-500">NSF, NIH, DARPA, DOE, or DoD funding</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hasIndependentLetters}
                    onChange={(e) => setHasIndependentLetters(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">3+ Independent Reference Letters</div>
                    <div className="text-[10px] text-slate-500">From prominent non-collaborators</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Proposed Endeavor Domain */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Atom className="w-5 h-5 text-indigo-600" />
                Step 3: Proposed Endeavor (National Importance)
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(domainNames).map(([key, item]) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCriticalDomain(key)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        criticalDomain === key
                          ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${criticalDomain === key ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Dynamic Real-Time Scorecard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Approval Probability Card */}
          <div className={`p-6 rounded-2xl border shadow-sm transition-all ${evalResult.tierBg}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                EB-2 NIW Approval Odds
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs">
                USCIS Precedent Score
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-black text-slate-900 tracking-tight">
                {evalResult.finalScore}%
              </span>
              <span className={`text-sm font-extrabold ${evalResult.tierColor}`}>
                {evalResult.tierLabel}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden my-3">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500"
                style={{ width: `${evalResult.finalScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Calculated using the 3-Prong <em>Matter of Dhanasar</em> precedent, citation thresholds, and White House Critical Technologies priorities.
            </p>
          </div>

          {/* 3-Prong Breakdown Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600" />
              Matter of Dhanasar 3-Prong Audit
            </h3>

            <div className="space-y-3">
              {evalResult.feedback.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.prong}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                      item.status === 'strong' ? 'bg-emerald-100 text-emerald-800' :
                      item.status === 'moderate' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Recommendations Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Tailored Evidence Strategy
            </h3>

            <ul className="space-y-2.5">
              {evalResult.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>

            {/* 1-Click Petition Cover Letter Modal / Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopyCoverLetter}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm"
              >
                {copiedCoverLetter ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Copied Petition Legal Outline!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy 1-Click NIW Petition Legal Outline
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Statutory Guidance Section */}
      <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Statutory Framework: How USCIS Adjudicates EB-2 National Interest Waivers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600">
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">1. Advance Degree (8 CFR § 204.5(k))</h4>
            <p className="leading-relaxed">
              You must demonstrate either an official U.S. Master's / PhD (or evaluated foreign equivalent) OR a U.S. Bachelor's plus 5 years of progressive post-degree experience.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">2. Matter of Dhanasar Precedent</h4>
            <p className="leading-relaxed">
              Replaced the older <em>NYSDOT</em> test in 2016. It focuses on the prospective national impact of your endeavor and whether you possess the tools to successfully advance it.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">3. Form I-907 Premium Processing</h4>
            <p className="leading-relaxed">
              Under current USCIS regulations, EB-2 NIW petitions qualify for <strong>45 calendar day premium processing</strong> for a federal filing fee of $2,805.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Need to explore H-1B timeline options or Cap-Exempt institutions while preparing your self-petition?
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/guides/h1b-to-green-card-perm-i140-timeline-audit-guide-2026"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              H-1B to Green Card Timeline Guide →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
