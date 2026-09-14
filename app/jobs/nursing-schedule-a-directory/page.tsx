'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Building2, 
  MapPin, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Award, 
  BookOpen, 
  Clock, 
  Copy, 
  Stethoscope, 
  FileCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { STATE_NURSING_MATRIX, DIRECT_HIRE_HOSPITALS, StateNursingInfo, DirectHireHospital } from '@/lib/nursing-directory-data';

export default function NursingScheduleADirectoryPage() {
  const [activeTab, setActiveTab] = useState<'states' | 'hospitals' | 'roadmap'>('states');
  
  // State Matrix Filters
  const [searchState, setSearchState] = useState<string>('');
  const [compactOnly, setCompactOnly] = useState<boolean>(false);
  const [noSSNOnly, setNoSSNOnly] = useState<boolean>(false);
  const [highSalaryOnly, setHighSalaryOnly] = useState<boolean>(false);

  // Hospital Directory Filters
  const [searchHospital, setSearchHospital] = useState<string>('');
  const [selectedHospitalState, setSelectedHospitalState] = useState<string>('ALL');

  // Pitch Generator State
  const [nurseName, setNurseName] = useState<string>('');
  const [nclexState, setNclexState] = useState<string>('New York');
  const [clinicalSpecialty, setClinicalSpecialty] = useState<string>('ICU / Critical Care');
  const [yearsExperience, setYearsExperience] = useState<string>('4');
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // Filtered States
  const filteredStates = useMemo(() => {
    return STATE_NURSING_MATRIX.filter((item) => {
      const matchesSearch = item.stateName.toLowerCase().includes(searchState.toLowerCase()) || 
                            item.stateCode.toLowerCase().includes(searchState.toLowerCase());
      const matchesCompact = !compactOnly || item.isCompact;
      const matchesNoSSN = !noSSNOnly || item.allowsInitialNoSSN;
      const matchesHighSalary = !highSalaryOnly || item.averageSalary >= 90000;
      return matchesSearch && matchesCompact && matchesNoSSN && matchesHighSalary;
    });
  }, [searchState, compactOnly, noSSNOnly, highSalaryOnly]);

  // Filtered Hospitals
  const filteredHospitals = useMemo(() => {
    return DIRECT_HIRE_HOSPITALS.filter((hosp) => {
      const matchesSearch = hosp.name.toLowerCase().includes(searchHospital.toLowerCase()) ||
                            hosp.city.toLowerCase().includes(searchHospital.toLowerCase()) ||
                            hosp.systemType.toLowerCase().includes(searchHospital.toLowerCase()) ||
                            hosp.featuredUnits.some(u => u.toLowerCase().includes(searchHospital.toLowerCase()));
      const matchesState = selectedHospitalState === 'ALL' || hosp.stateCode === selectedHospitalState;
      return matchesSearch && matchesState;
    });
  }, [searchHospital, selectedHospitalState]);

  // Generate Cold Pitch
  const generateNursePitch = () => {
    const name = nurseName.trim() || '[Your Full Name, RN, BSN]';
    return `Subject: Direct-Hire International RN Application (NCLEX-RN Passed & CGFNS In-Progress) — ${name}

Dear Nurse Recruitment Team,

I am writing to express my strong interest in joining your clinical nursing team as a Registered Nurse in ${clinicalSpecialty}.

PROFESSIONAL CREDENTIALS SUMMARY:
- Licensure: Passed US NCLEX-RN Examination (Initial State of Licensure: ${nclexState} Board of Nursing).
- Education: Bachelor of Science in Nursing (BSN) with ${yearsExperience} years of acute bedside clinical experience in ${clinicalSpecialty}.
- Credentialing Status: CGFNS Credentials Evaluation Service (CES) and VisaScreen Certificate in active processing.
- English Fluency: Fully compliant with US statutory health professional standards (IELTS / OET / TOEFL).

STATUTORY DIRECT-HIRE ELIGIBILITY (INA § 212(a)(5)(C)):
Because Professional Registered Nurses are designated under 20 CFR § 656.5 as DOL Schedule A Group I, hiring me does NOT require an individual PERM Labor Certification from the Department of Labor. Your hospital can directly file Form I-140 with USCIS along with an uncertified Form ETA-9089, reducing Green Card processing timelines by 12 to 18 months.

I am seeking a direct-hire hospital appointment without third-party staffing agencies, offering maximum institutional loyalty and clinical dedication.

I have attached my resume, NCLEX verification, and clinical skills checklist for your review. I look forward to speaking with your clinical nurse managers.

Sincerely,
${name}
Registered Nurse (NCLEX-RN Licensed)`;
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(generateNursePitch());
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Breadcrumbs & Banner */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-rose-400" />
            20 CFR § 656.5 Schedule A Group I Direct-Hire Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            50-State Nursing License Endorsement <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400">
              & Schedule A Direct-Hire Hospital Directory
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Fast-track your US Registered Nurse career without predatory agency lock-ins. Compare state Board of Nursing (BON) endorsement rules, CGFNS CES requirements, and apply directly to top academic hospital networks sponsoring EB-3 Green Cards.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl mx-auto">
          {[
            { id: 'states', label: '50-State BON Endorsement Matrix', icon: MapPin },
            { id: 'hospitals', label: 'Direct-Hire Hospital Directory', icon: Building2 },
            { id: 'roadmap', label: 'Schedule A Green Card Roadmap', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: 50-State BON Endorsement Matrix */}
        {activeTab === 'states' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Search & Filter Controls */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by state name or code (e.g. Texas, TX, California, New York)..."
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCompactOnly(!compactOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      compactOnly
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    ★ Compact States (NLC)
                  </button>

                  <button
                    onClick={() => setNoSSNOnly(!noSSNOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      noSSNOnly
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    ⚡ Initial No-SSN Friendly
                  </button>

                  <button
                    onClick={() => setHighSalaryOnly(!highSalaryOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      highSalaryOnly
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    💰 High Salary (&gt;$90k/yr)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                <span>Showing <strong>{filteredStates.length}</strong> state boards of nursing</span>
                <span className="text-slate-500">Data Source: BLS OEWS 2026 & National Council of State Boards of Nursing (NCSBN)</span>
              </div>
            </div>

            {/* States Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStates.map((state) => (
                <div
                  key={state.stateCode}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-white">{state.stateName}</h3>
                          <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold">
                            {state.stateCode}
                          </span>
                        </div>
                        <div className="text-xs text-rose-400 font-bold mt-0.5">
                          Avg: ${state.averageSalary.toLocaleString()} / yr (${state.hourlyWage.toFixed(2)}/hr)
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {state.isCompact ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            NLC Compact
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                            Single State
                          </span>
                        )}
                        {state.allowsInitialNoSSN ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            No SSN Initial ✓
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            SSN Required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400">Credential Evaluation: </span>
                        <span className="text-slate-200 font-medium">{state.evaluationAgency}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Processing Timeline: </span>
                        <span className="text-emerald-400 font-semibold">{state.processingTimeWeeks}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">English Standard: </span>
                        <span className="text-slate-300">{state.englishExemptionPolicy}</span>
                      </div>
                      {state.specialRules && (
                        <div className="pt-1.5 border-t border-slate-800/60 text-slate-400 text-[11px] leading-relaxed">
                          💡 {state.specialRules}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <a
                      href={state.bonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 group-hover:underline"
                    >
                      Official BON Portal <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-slate-500">Direct Endorsement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Direct-Hire Schedule A Hospital Directory */}
        {activeTab === 'hospitals' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Hospital Filters */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by hospital name, unit (ICU, Oncology, Trauma), or city..."
                    value={searchHospital}
                    onChange={(e) => setSearchHospital(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 shrink-0">State:</span>
                  <select
                    value={selectedHospitalState}
                    onChange={(e) => setSelectedHospitalState(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-rose-500"
                  >
                    <option value="ALL">All States</option>
                    <option value="MN">Minnesota (Mayo Clinic)</option>
                    <option value="OH">Ohio (Cleveland Clinic)</option>
                    <option value="MD">Maryland (Johns Hopkins)</option>
                    <option value="MA">Massachusetts (Mass General)</option>
                    <option value="TX">Texas (MD Anderson)</option>
                    <option value="NY">New York (NYU Langone / MSK)</option>
                    <option value="NC">North Carolina (Duke Health)</option>
                    <option value="PA">Pennsylvania (UPMC)</option>
                    <option value="AZ">Arizona (Banner Health)</option>
                    <option value="GA">Georgia (Emory)</option>
                    <option value="WA">Washington (UW Medicine)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hospital Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-black text-white group-hover:text-rose-400 transition-colors">
                          {hospital.name}
                        </h3>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{hospital.city}, {hospital.state}</span>
                        </div>
                      </div>

                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {hospital.signOnBonus}
                      </span>
                    </div>

                    <div className="text-xs text-indigo-300 font-semibold bg-indigo-950/40 border border-indigo-800/40 p-3 rounded-xl flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{hospital.eb3SponsorshipTrack}</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong>System Type:</strong> {hospital.systemType}
                    </p>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-300">Featured High-Demand Units:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {hospital.featuredUnits.map((unit, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg"
                          >
                            {unit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Relocation Assistance Provided</span>
                    </div>
                    <a
                      href={hospital.careerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-all"
                    >
                      Apply Direct <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* 1-Click Nursing Cold Pitch Generator */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> 1-Click Direct Hospital Application Generator
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Direct-Hire Hospital Outreach Pitch (Citing Schedule A)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Send this pre-formatted email to hospital nurse recruiters and Chief Nursing Officers (CNOs) explaining your direct PERM exemption.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPitch}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
                    copiedPitch
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {copiedPitch ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Hospital Pitch
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Your Full Name & Credentials:</label>
                  <input
                    type="text"
                    placeholder="e.g. Maria Santos, RN, BSN"
                    value={nurseName}
                    onChange={(e) => setNurseName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">NCLEX Initial State:</label>
                  <input
                    type="text"
                    placeholder="e.g. New York / Illinois / Texas"
                    value={nclexState}
                    onChange={(e) => setNclexState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Clinical Bedside Specialty:</label>
                  <input
                    type="text"
                    placeholder="e.g. ICU / ER / Oncology / Med-Surg"
                    value={clinicalSpecialty}
                    onChange={(e) => setClinicalSpecialty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {generateNursePitch()}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Schedule A Green Card Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Statutory Authority</span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  How EB-3 Schedule A Green Card Sponsorship Works (20 CFR § 656.5)
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Unlike tech or engineering roles that require a 12–18 month DOL PERM labor market test, Professional Registered Nurses are pre-certified as a nationwide shortage occupation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center">1</div>
                  <h4 className="font-bold text-white text-sm">Pass NCLEX-RN & Get CES</h4>
                  <p className="text-slate-400">
                    Pass the National Council Licensure Examination through a foreign-friendly state board (e.g. NY, IL, TX) and order your CGFNS Credentials Evaluation Service (CES) Professional Report.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">2</div>
                  <h4 className="font-bold text-white text-sm">Secure CGFNS VisaScreen</h4>
                  <p className="text-slate-400">
                    Complete your English proficiency test (IELTS 6.5 overall / OET Grade B / TOEFL 83) and obtain your Section 343 VisaScreen Healthcare Certificate (INA § 212(a)(5)(C)).
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">3</div>
                  <h4 className="font-bold text-white text-sm">Direct Form I-140 Filing</h4>
                  <p className="text-slate-400">
                    The hospital posts an internal Notice of Filing for 10 consecutive business days and files Form I-140 directly with USCIS with an uncertified ETA-9089. No individual PERM delay.
                  </p>
                </div>
              </div>

              <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-5 flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-rose-300">Why Choose Direct-Hire Over Staffing Agencies?</span>
                  <p className="text-slate-400 leading-relaxed">
                    Commercial staffing agencies often pay foreign nurses \$28–\$35/hr while billing hospitals \$80+/hr, locking nurses into 36-month contracts with massive breach liquidated damages. Direct-hire hospitals pay standard union/staff wages (\$40–\$65/hr), offer pension benefits, and provide free relocation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
