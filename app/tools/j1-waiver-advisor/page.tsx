'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Scale, 
  FileText, 
  Building2, 
  Stethoscope, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Download, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Info
} from 'lucide-react';
import { SKILLS_LIST_SAMPLE, WAIVER_BASES, CONRAD_30_SAMPLE_STATES, WaiverBasis } from '@/lib/j1-data';

export default function J1WaiverAdvisorPage() {
  // Wizard State
  const [j1Category, setJ1Category] = useState<string>('researcher');
  const [fundingSource, setFundingSource] = useState<string>('none');
  const [country, setCountry] = useState<string>('India');
  const [field, setField] = useState<string>('Engineering');
  const [stampConflict, setStampConflict] = useState<string>('no_conflict');
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'pathways' | 'conrad' | 'memo' | 'guide'>('diagnostic');
  const [selectedWaiver, setSelectedWaiver] = useState<string>('nos');
  const [copied, setCopied] = useState<boolean>(false);
  const [stateSearch, setStateSearch] = useState<string>('');

  // Diagnostic Calculation
  const isPhysicianGME = j1Category === 'physician';
  const hasGovFunding = fundingSource === 'us_govt' || fundingSource === 'home_govt' || fundingSource === 'international';
  
  const countryObj = SKILLS_LIST_SAMPLE.find(c => c.country === country);
  const isSkillsListSubject = !isPhysicianGME && !hasGovFunding && countryObj && countryObj.subjectGroups.some(g => g.toLowerCase().includes(field.toLowerCase()) || g === 'All STEM Fields');

  let verdictType: 'DEFINITELY_SUBJECT' | 'LIKELY_SUBJECT' | 'NOT_SUBJECT' | 'ADVISORY_NEEDED' = 'NOT_SUBJECT';
  let primaryReason = '';

  if (isPhysicianGME) {
    verdictType = 'DEFINITELY_SUBJECT';
    primaryReason = 'Graduate Medical Education / Clinical Training (ECFMG sponsored residency or clinical fellowship).';
  } else if (hasGovFunding) {
    verdictType = 'DEFINITELY_SUBJECT';
    primaryReason = fundingSource === 'us_govt' 
      ? 'Direct or indirect U.S. Government Funding (e.g. Fulbright, USAID, federal grants specifically designated for exchange).'
      : 'Home Country Government Funding or International Organization sponsorship.';
  } else if (isSkillsListSubject) {
    verdictType = 'LIKELY_SUBJECT';
    primaryReason = `Your home country (${country}) designates your field (${field}) on the DOS Exchange Visitor Skills List.`;
  } else if (stampConflict === 'conflicting') {
    verdictType = 'ADVISORY_NEEDED';
    primaryReason = 'Discrepancy between J-1 Visa foil annotation and DS-2019 Item 1/Item 5 details. Formal DOS Advisory Opinion recommended.';
  } else {
    verdictType = 'NOT_SUBJECT';
    primaryReason = 'No government funding, non-ECFMG physician training, and field/country does not trigger the DOS Skills List.';
  }

  // Recommended Waiver Pathway
  let recommendedWaiverId = 'nos';
  if (isPhysicianGME) {
    recommendedWaiverId = 'conrad30';
  } else if (hasGovFunding && fundingSource === 'us_govt') {
    recommendedWaiverId = 'iga';
  } else if (verdictType === 'NOT_SUBJECT') {
    recommendedWaiverId = 'none';
  }

  const handleCopyMemo = () => {
    const memoText = `=====================================================
US CAREER SOLUTIONS: J-1 VISA 212(e) ACTION MEMORANDUM
=====================================================
DATE GENERATED: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
APPLICANT J-1 CATEGORY: ${j1Category.toUpperCase()}
NATIONALITY / RESIDENCE: ${country}
SPECIALIZED FIELD: ${field}
FUNDING SOURCE: ${fundingSource.toUpperCase()}

1. STATUTORY SUBJECTIVITY VERDICT:
Status: ${verdictType}
Statutory Grounds: ${primaryReason}

2. RECOMMENDED WAIVER / ACTION PATHWAY:
Primary Mechanism: ${isPhysicianGME ? 'Conrad State 30 Program / HHS IGA' : (hasGovFunding ? 'Interested Federal Agency (IGA) / Exceptional Hardship' : 'No Objection Statement (NOS) via DS-3035')}

3. IMMEDIATE ACTION CHECKLIST:
[ ] Step 1: Complete electronic Form DS-3035 on the DOS J Visa Waiver Online portal.
[ ] Step 2: Download your barcode sheet and 7-digit DOS Case Number.
[ ] Step 3: Pay the $120 DOS Waiver Review Division processing fee.
[ ] Step 4: ${isPhysicianGME ? 'Execute a 3-year employment contract at a designated HPSA/MUA clinic and submit application to State DOH.' : 'Submit formal application for a No Objection Certificate to your home country embassy/consulate in Washington, DC.'}
[ ] Step 5: Mail copies of DS-2019 forms (all copies, current & previous), passport biographical page, and third-party barcode sheets to DOS Waiver Review Division in St. Louis, MO.

Generated via US Career Solutions J-1 Waiver Advisory Engine (https://www.uscareersolutions.online/tools/j1-waiver-advisor)
=====================================================`;
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredStates = CONRAD_30_SAMPLE_STATES.filter(s => 
    s.state.toLowerCase().includes(stateSearch.toLowerCase()) || 
    s.abbr.toLowerCase().includes(stateSearch.toLowerCase()) ||
    s.specialtiesAllowed.toLowerCase().includes(stateSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Breadcrumb & Statutory Authority Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/tools" className="hover:text-amber-400 transition-colors">Tools</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400">J-1 212(e) Waiver Advisor</span>
          </nav>
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Statutory Reference: <strong>INA § 212(e) & 22 CFR § 41.62</strong></span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            2026 Statutory Compliance & Waiver Simulator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            J-1 Visa 2-Year Rule <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">(212e) Waiver</span> & Advisory Engine
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Determine if you are legally subject to the two-year home-country physical presence requirement, simulate your waiver approval probability across 5 statutory pathways, and generate your DOS Form DS-3035 filing package.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'diagnostic'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            1. 212(e) Diagnostic
          </button>
          <button
            onClick={() => setActiveTab('pathways')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'pathways'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            2. 5 Waiver Pathways
          </button>
          <button
            onClick={() => setActiveTab('conrad')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'conrad'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            3. Conrad 30 Directory
          </button>
          <button
            onClick={() => setActiveTab('memo')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'memo'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
            }`}
          >
            <Download className="w-4 h-4" />
            4. DS-3035 Action Memo
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            5. Statutory Guide & FAQ
          </button>
        </div>

        {/* TAB 1: DIAGNOSTIC WIZARD */}
        {activeTab === 'diagnostic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Questionnaire */}
            <div className="lg:col-span-7 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                Section 212(e) Subjectivity Diagnostic
              </h2>
              <p className="text-xs text-slate-400">
                Answer these 5 criteria to inspect the statutory triggers under INA § 212(e) and Department of State regulations.
              </p>

              <div className="space-y-5">
                {/* J-1 Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    1. J-1 Exchange Visitor Category
                  </label>
                  <select
                    value={j1Category}
                    onChange={(e) => setJ1Category(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="researcher">Research Scholar / Postdoctoral Fellow</option>
                    <option value="physician">International Medical Graduate (Physician in GME / Residency / Fellowship via ECFMG)</option>
                    <option value="student">Exchange Student (Bachelors / Masters / PhD)</option>
                    <option value="professor">Professor / Teacher / Specialist</option>
                    <option value="intern">Intern / Trainee</option>
                  </select>
                </div>

                {/* Funding Source */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    2. Primary Source of Program Funding (Box 5 on Form DS-2019)
                  </label>
                  <select
                    value={fundingSource}
                    onChange={(e) => setFundingSource(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="none">No Government Funding (University Salary, Private Funds, or Personal Savings Only)</option>
                    <option value="us_govt">U.S. Government Funding (Fulbright, USAID, direct federal grant for exchange)</option>
                    <option value="home_govt">Home Country Government Funding (CSC, CONACYT, HEC, government ministry fellowship)</option>
                    <option value="international">International Organization Funding (WHO, UN, World Bank, OAS)</option>
                  </select>
                </div>

                {/* Country of Nationality / Permanent Residence */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    3. Country of Nationality or Legal Permanent Residence
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    {SKILLS_LIST_SAMPLE.map((c) => (
                      <option key={c.country} value={c.country}>{c.country}</option>
                    ))}
                  </select>
                </div>

                {/* Field of Expertise */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    4. Specialized Field of Knowledge / Study (Subject Code on DS-2019)
                  </label>
                  <select
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Engineering">Engineering (Electrical, Mechanical, Civil, Chemical)</option>
                    <option value="Computer Science">Computer Science / Data Science / AI / IT</option>
                    <option value="Biological Sciences">Biological & Biomedical Sciences / Genetics</option>
                    <option value="Physical Sciences">Physical Sciences (Physics, Chemistry, Materials)</option>
                    <option value="Medicine">Medical Sciences / Clinical Medicine / Nursing</option>
                    <option value="Business Management">Business, Finance & Management</option>
                    <option value="Education">Education, Teaching & Linguistics</option>
                    <option value="Humanities">Humanities, Social Sciences & Arts</option>
                  </select>
                </div>

                {/* Consular Stamp vs DS-2019 Annotation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    5. Visa Foil Stamp & DS-2019 Notations
                  </label>
                  <select
                    value={stampConflict}
                    onChange={(e) => setStampConflict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="no_conflict">Consistent / Clear Notations</option>
                    <option value="conflicting">Conflicting (e.g. Visa foil says "Not Subject" but DS-2019 has government funding)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Diagnostic Result */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`rounded-2xl border p-6 sm:p-8 space-y-6 shadow-xl ${
                verdictType === 'DEFINITELY_SUBJECT'
                  ? 'bg-rose-950/40 border-rose-600/60 shadow-rose-900/10'
                  : verdictType === 'LIKELY_SUBJECT'
                  ? 'bg-amber-950/40 border-amber-600/60 shadow-amber-900/10'
                  : verdictType === 'ADVISORY_NEEDED'
                  ? 'bg-blue-950/40 border-blue-600/60 shadow-blue-900/10'
                  : 'bg-emerald-950/40 border-emerald-600/60 shadow-emerald-900/10'
              }`}>
                
                {/* Result Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Statutory Determination
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    verdictType === 'DEFINITELY_SUBJECT'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : verdictType === 'LIKELY_SUBJECT'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : verdictType === 'ADVISORY_NEEDED'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {verdictType === 'DEFINITELY_SUBJECT' && 'Definitely Subject (212e)'}
                    {verdictType === 'LIKELY_SUBJECT' && 'Likely Subject (Skills List)'}
                    {verdictType === 'ADVISORY_NEEDED' && 'Advisory Opinion Advised'}
                    {verdictType === 'NOT_SUBJECT' && 'Not Subject (Exempt)'}
                  </span>
                </div>

                {/* Verdict Title */}
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {verdictType === 'DEFINITELY_SUBJECT' && '2-Year Home Residence Rule Applies'}
                    {verdictType === 'LIKELY_SUBJECT' && 'Skills List Subjectivity Triggered'}
                    {verdictType === 'ADVISORY_NEEDED' && 'Conflicting Records Detected'}
                    {verdictType === 'NOT_SUBJECT' && 'You Are Free to Change Status / Apply for H-1B / Green Card'}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    <strong>Primary Statutory Ground:</strong> {primaryReason}
                  </p>
                </div>

                {/* Implications Table */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
                  <div className="font-bold text-slate-200 border-b border-slate-800 pb-2">
                    Legal Impact Under INA § 212(e):
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className={verdictType === 'NOT_SUBJECT' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {verdictType === 'NOT_SUBJECT' ? '✓' : '✕'}
                    </span>
                    <span>H-1B, L-1, or K-1 Visa eligibility without returning home for 2 years.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className={verdictType === 'NOT_SUBJECT' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {verdictType === 'NOT_SUBJECT' ? '✓' : '✕'}
                    </span>
                    <span>Adjustment of Status (Form I-485 Green Card) inside the United States.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className={verdictType === 'NOT_SUBJECT' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {verdictType === 'NOT_SUBJECT' ? '✓' : '✕'}
                    </span>
                    <span>Change of Status to F-1, O-1, or B-2 via USCIS Form I-539. (Note: O-1 visa abroad is permissible without a waiver).</span>
                  </div>
                </div>

                {/* Recommended Next Action */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400">
                    Recommended Next Action:
                  </div>
                  {verdictType !== 'NOT_SUBJECT' ? (
                    <button
                      onClick={() => {
                        setSelectedWaiver(recommendedWaiverId);
                        setActiveTab('pathways');
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm py-3 px-4 rounded-xl shadow-lg transition-all"
                    >
                      <span>Explore Recommended Waiver Pathway</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>You can proceed directly with H-1B, O-1, or Green Card (EB-2 NIW / EB-1A) applications.</span>
                    </div>
                  )}

                  <button
                    onClick={() => setActiveTab('memo')}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Generate Complete DS-3035 Action Memo</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 5 STATUTORY WAIVER PATHWAYS */}
        {activeTab === 'pathways' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {WAIVER_BASES.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWaiver(w.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedWaiver === w.id
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Basis {w.id.toUpperCase()}
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {w.shortName}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{w.processingTime}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Waiver Detail Panel */}
            {(() => {
              const currentWaiver = WAIVER_BASES.find(w => w.id === selectedWaiver) || WAIVER_BASES[0];
              return (
                <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-700/80 pb-6">
                    <div>
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        {currentWaiver.statutoryRef}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        {currentWaiver.title}
                      </h3>
                      <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                        {currentWaiver.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-center min-w-[120px]">
                        <div className="text-[11px] text-slate-400 uppercase font-semibold">Success Rate</div>
                        <div className="text-lg font-black text-emerald-400">{currentWaiver.successRate}</div>
                      </div>
                      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-center min-w-[120px]">
                        <div className="text-[11px] text-slate-400 uppercase font-semibold">Filing Fees</div>
                        <div className="text-sm font-bold text-amber-300">{currentWaiver.filingFee}</div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements & Disqualifiers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Key Evidentiary Requirements
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {currentWaiver.keyRequirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        Critical Disqualifiers & Hazards
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {currentWaiver.disqualifiers.map((dis, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold">✕</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Step By Step Filing Instructions */}
                  <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-white">Ready to prepare this waiver filing packet?</div>
                      <div className="text-xs text-slate-400 mt-0.5">Generate a complete Form DS-3035 barcode checklist and agency address template.</div>
                    </div>
                    <button
                      onClick={() => setActiveTab('memo')}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Generate Filing Checklist</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 3: CONRAD 30 STATE DIRECTORY */}
        {activeTab === 'conrad' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-amber-400" />
                    Conrad State 30 Program Physician Directory
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Each U.S. State Health Department receives 30 J-1 waiver allocations per fiscal year for physicians committing to 3 years in HPSA/MUA shortage areas.
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Filter by State (e.g. TX, California, Primary Care)..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 min-w-[260px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {filteredStates.map((st) => (
                  <div key={st.abbr} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-base font-bold text-white">
                        {st.state} ({st.abbr})
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        st.status === 'High Competition'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {st.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-2">
                      <div><strong>Slots:</strong> {st.slots} total ({st.flexSlots} Flex/Non-HPSA)</div>
                      <div><strong>Window:</strong> {st.applicationPeriod}</div>
                      <div><strong>Specialties:</strong> {st.specialtiesAllowed}</div>
                      <div><strong>HPSA Rule:</strong> {st.hpsaRequirement}</div>
                    </div>

                    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
                      <span>Agency: {st.contactAgency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DS-3035 ACTION MEMO */}
        {activeTab === 'memo' && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-amber-400" />
                  Customized J-1 212(e) Action Memorandum & DS-3035 Checklist
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Copy or print this structured compliance plan for your immigration attorney, employer, or home country embassy.
                </p>
              </div>

              <button
                onClick={handleCopyMemo}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Full Memo'}</span>
              </button>
            </div>

            {/* Structured Memo Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-xs text-slate-300 space-y-4 overflow-x-auto leading-relaxed">
              <div className="text-amber-400 font-bold">=====================================================</div>
              <div className="text-white font-bold">US CAREER SOLUTIONS: J-1 VISA 212(e) ACTION MEMORANDUM</div>
              <div className="text-amber-400 font-bold">=====================================================</div>
              
              <div>DATE: {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</div>
              <div>APPLICANT CATEGORY: {j1Category.toUpperCase()}</div>
              <div>COUNTRY OF RESIDENCE: {country}</div>
              <div>SPECIALTY FIELD: {field}</div>
              <div>FUNDING PROFILE: {fundingSource.toUpperCase()}</div>
              
              <div className="text-amber-300 font-bold pt-2">1. STATUTORY SUBJECTIVITY DETERMINATION:</div>
              <div>Status: <strong>{verdictType}</strong></div>
              <div>Grounds: {primaryReason}</div>

              <div className="text-amber-300 font-bold pt-2">2. STEP-BY-STEP FILING PROTOCOL (DOS FORM DS-3035):</div>
              <div>[ ] 1. Navigate to travel.state.gov & complete Form DS-3035 online.</div>
              <div>[ ] 2. Print barcode sheet with your unique 7-digit DOS Case Number.</div>
              <div>[ ] 3. Write your Case Number on the top right corner of every document page.</div>
              <div>[ ] 4. Enclose $120 cashier's check or money order payable to "U.S. Department of State".</div>
              <div>[ ] 5. Include full-size, legible copies of ALL DS-2019 / IAP-66 forms ever issued.</div>
              <div>[ ] 6. Include copy of passport biographical page and current I-94 record.</div>
              <div>[ ] 7. Mail initial packet to: U.S. Department of State, Waiver Review Division, P.O. Box 979037, St. Louis, MO 63197-9000.</div>

              <div className="text-amber-300 font-bold pt-2">3. THIRD-PARTY PACKET TRANSMISSION:</div>
              <div>{isPhysicianGME ? '[ ] State Health Department sends formal Conrad 30 recommendation letter directly to DOS WRD.' : '[ ] Home country Embassy transmits No Objection diplomatic note directly to DOS WRD.'}</div>
            </div>
          </div>
        )}

        {/* TAB 5: STATUTORY GUIDE & EDITORIAL (E-E-A-T) */}
        {activeTab === 'guide' && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-8 text-slate-300 text-sm leading-relaxed">
            <div className="border-b border-slate-700/80 pb-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-400" />
                Comprehensive Guide to J-1 Visa Section 212(e) & Waivers
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Statutory analysis under Immigration and Nationality Act (INA) § 212(e), 22 CFR § 41.62, and DOS Waiver Review Division guidelines.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">
                1. What is the Two-Year Home-Country Physical Presence Requirement?
              </h4>
              <p>
                Section 212(e) of the Immigration and Nationality Act (INA) is a statutory restriction designed to ensure that foreign exchange visitors return to their home countries to share the skills, knowledge, and experience gained during their US program. If subject, the exchange visitor cannot change nonimmigrant status in the US, apply for an H-1B, L-1, or K-1 visa, or adjust status to lawful permanent resident (Green Card) until they have resided in their country of nationality or last permanent residence for an aggregate of at least two years, or secured a formal waiver.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">
                2. Consular Visa Foil Error vs. Statutory Reality
              </h4>
              <p>
                A very common misconception occurs when a consular officer stamps "Bearer is not subject to Section 212(e)" on the J-1 visa foil, but the DS-2019 clearly indicates direct home government funding or the field is on the Skills List. <strong>Consular and border annotations are non-binding.</strong> USCIS and the Department of State will evaluate the factual and statutory reality at the time of your H-1B or Green Card application. If you have conflicting annotations, requesting a formal <strong>Advisory Opinion</strong> from the DOS Waiver Review Division is the only legally safe course of action.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">
                3. Can You Work on an O-1 Visa While Subject to 212(e)?
              </h4>
              <p>
                <strong>Yes, with one major caveat.</strong> An individual subject to INA § 212(e) is prohibited from <em>changing status inside the US</em> (via Form I-539) to O-1. However, Section 212(e) does NOT bar consular processing for an O-1 visa abroad. A J-1 scholar can have an employer petition for an O-1A/O-1B with consular notification, travel outside the US to an American Embassy or Consulate, obtain the O-1 visa foil, and re-enter the US in valid O-1 status. Note that the 2-year clock is paused, not eliminated, and must still be satisfied or waived prior to applying for a Green Card (Form I-485).
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">
                4. Transitioning to EB-2 NIW or EB-1A While Subject
              </h4>
              <p>
                You can file and receive approval for an <strong>I-140 Immigrant Petition</strong> (such as EB-2 National Interest Waiver or EB-1A Extraordinary Ability) while subject to Section 212(e). The restriction only blocks the final step: Form I-485 (Adjustment of Status) or immigrant visa issuance at the consulate. Therefore, scholars frequently self-petition for EB-2 NIW to lock in an early priority date while simultaneously processing their J-1 waiver.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
