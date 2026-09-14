'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Tractor, 
  Calendar, 
  Building2, 
  MapPin, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Award, 
  Clock, 
  Copy, 
  Home, 
  Plane, 
  HelpCircle,
  Fish,
  Trees,
  Mountain
} from 'lucide-react';
import { STATE_HARVEST_CALENDAR, CERTIFIED_SEASONAL_EMPLOYERS, SeasonalEmployer, StateHarvestCalendar } from '@/lib/seasonal-h2-data';

export default function SeasonalH2DirectoryPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'employers' | 'rights'>('calendar');
  
  // Calendar Filter
  const [searchState, setSearchState] = useState<string>('');

  // Employers Filter
  const [searchEmployer, setSearchEmployer] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStateCode, setSelectedStateCode] = useState<string>('ALL');

  // Cover Note Generator State
  const [workerName, setWorkerName] = useState<string>('');
  const [homeCountry, setHomeCountry] = useState<string>('Mexico');
  const [workExperience, setWorkExperience] = useState<string>('Fruit harvesting, packing, and tractor operation');
  const [copiedCover, setCopiedCover] = useState<boolean>(false);

  // Filtered Calendar
  const filteredCalendar = useMemo(() => {
    return STATE_HARVEST_CALENDAR.filter((item) => {
      return item.stateName.toLowerCase().includes(searchState.toLowerCase()) ||
             item.stateCode.toLowerCase().includes(searchState.toLowerCase()) ||
             item.primaryCrops.some(c => c.toLowerCase().includes(searchState.toLowerCase()));
    });
  }, [searchState]);

  // Filtered Employers
  const filteredEmployers = useMemo(() => {
    return CERTIFIED_SEASONAL_EMPLOYERS.filter((emp) => {
      const matchesSearch = emp.name.toLowerCase().includes(searchEmployer.toLowerCase()) ||
                            emp.city.toLowerCase().includes(searchEmployer.toLowerCase()) ||
                            emp.primaryCropOrService.toLowerCase().includes(searchEmployer.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || emp.category === selectedCategory;
      const matchesState = selectedStateCode === 'ALL' || emp.stateCode === selectedStateCode;
      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchEmployer, selectedCategory, selectedStateCode]);

  // Generate Cover Note
  const generateCoverNote = () => {
    const name = workerName.trim() || '[Your Full Name]';
    return `Subject: Application for Seasonal H-2A / H-2B Position (Certified Direct Applicant) — ${name}

Dear Agricultural Hiring Manager / HR Team,

I am writing to apply directly for your upcoming seasonal harvest/operations positions under the certified H-2 visa program.

APPLICANT SUMMARY:
- Name: ${name}
- Country of Citizenship & Residence: ${homeCountry}
- Practical Experience: ${workExperience}
- Health & Physical Stamina: Excellent physical conditioning, capable of 10-12 hour outdoor shifts, heavy lifting, and adverse weather conditions.
- Passport & Consular Status: Valid international passport ready for immediate consular visa appointment upon Form I-129 approval.

STATUTORY COMPLIANCE ACKNOWLEDGMENT (20 CFR § 655):
I am applying directly to your company without third-party recruitment agencies or middlemen. I understand that under US federal law (20 CFR § 655.135), zero recruitment fees may be charged to workers, and I am seeking a legitimate, certified employment contract with your organization.

I have attached my work history, reference contacts, and a copy of my valid passport identification page.

Thank you for your consideration.

Sincerely,
${name}`;
  };

  const handleCopyCover = () => {
    navigator.clipboard.writeText(generateCoverNote());
    setCopiedCover(true);
    setTimeout(() => setCopiedCover(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Breadcrumbs & Banner */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Tractor className="w-4 h-4 text-amber-400" />
            DOL 20 CFR § 655 Certified Seasonal Gateway
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            H-2A & H-2B Certified Seasonal Employers <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">
              & US State Harvest Calendar Directory
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Direct access to verified agricultural, seafood processing, ski resort, and hospitality employers. Track peak crop harvest cycles by state, verify Adverse Effect Wage Rates ($15.50–$19.75/hr), and protect yourself from illegal recruiter fee scams.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl mx-auto">
          {[
            { id: 'calendar', label: 'State Harvest & Seasonality Calendar', icon: Calendar },
            { id: 'employers', label: 'Certified Employer Directory', icon: Building2 },
            { id: 'rights', label: 'DOL Rights & Anti-Scam Rules', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Harvest & Seasonality Calendar */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Search */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by state or crop (e.g. Washington, Apples, California, Cherries, Alaska Salmon)..."
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="text-xs text-slate-400">
                Guaranteed Adverse Effect Wage Rate (AEWR) applies to all H-2A workers.
              </div>
            </div>

            {/* Calendar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalendar.map((item) => (
                <div
                  key={item.stateCode}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-white">{item.stateName}</h3>
                          <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold">
                            {item.stateCode}
                          </span>
                        </div>
                        <div className="text-xs text-amber-400 font-bold mt-1">
                          AEWR Min Wage: ${item.aewrRate.toFixed(2)} / hour
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.peakMonths}
                      </span>
                    </div>

                    <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold">Primary Crops / Industries:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.primaryCrops.map((crop, idx) => (
                            <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-slate-400">Application Filing Window: </span>
                        <span className="text-emerald-400 font-semibold">{item.h2aFilingWindow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Home className="w-3.5 h-3.5" /> Free Housing Required
                    </span>
                    <span>DOL Certified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Certified Employer Directory */}
        {activeTab === 'employers' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by company name, crop/service, or city..."
                    value={searchEmployer}
                    onChange={(e) => setSearchEmployer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="Agriculture (H-2A)">Agriculture (H-2A)</option>
                    <option value="Seafood Processing (H-2B)">Seafood Processing (H-2B)</option>
                    <option value="Seasonal Hospitality (H-2B)">Seasonal Hospitality (H-2B)</option>
                    <option value="Ski & Winter Resort (H-2B)">Ski & Winter Resort (H-2B)</option>
                    <option value="Landscaping & Forestry (H-2B)">Landscaping & Forestry (H-2B)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Employers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEmployers.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                            {emp.name}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            emp.visaType === 'H-2A' 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {emp.visaType}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>{emp.city}, {emp.state}</span>
                        </div>
                      </div>

                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {emp.hourlyWageRange}
                      </span>
                    </div>

                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-slate-300 font-semibold">Crops & Services: {emp.primaryCropOrService}</div>
                      <div className="text-slate-400">Peak Season: <strong className="text-amber-400">{emp.peakSeasonMonths}</strong></div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {emp.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      {emp.housingProvidedFree ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-semibold text-[11px]">
                          <Home className="w-3.5 h-3.5" /> 100% Free Housing (20 CFR § 655)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 text-[11px]">
                          <Home className="w-3.5 h-3.5" /> Subsidized Housing Available
                        </span>
                      )}
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 font-semibold text-[11px]">
                        <Plane className="w-3.5 h-3.5" /> Inbound Travel Reimbursed
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Direct Employer Application</span>
                    <a
                      href={emp.officialCareersUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                    >
                      Apply Direct <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* 1-Click Direct Application Note Generator */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> 1-Click Direct Seasonal Application Generator
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Direct Seasonal Application Cover Letter
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Apply directly to farm and resort hiring teams to establish your candidacy without middleman fees.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCover}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
                    copiedCover
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {copiedCover ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-950" /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Application Note
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Your Full Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Carlos Rodriguez"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Country of Residence:</label>
                  <input
                    type="text"
                    placeholder="e.g. Mexico / Jamaica / South Africa"
                    value={homeCountry}
                    onChange={(e) => setHomeCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Relevant Skills / Work Experience:</label>
                  <input
                    type="text"
                    placeholder="e.g. Harvesting, packing, forklift operation"
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {generateCoverNote()}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Rights & Anti-Scam Rules */}
        {activeTab === 'rights' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">US Statutory Worker Protections</span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Your Legal Rights Under DOL 20 CFR § 655 (H-2A & H-2B)
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  US federal law provides strict statutory guarantees to temporary foreign workers. Never pay illegal recruitment fees.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" /> 1. ZERO Recruitment Fees (Strict Law)
                  </div>
                  <p className="text-slate-400">
                    Under <strong>20 CFR § 655.135(k)</strong>, employers and their agents are prohibited from seeking or receiving payment of ANY KIND from prospective workers for recruitment, job placement, or visa processing fees.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Home className="w-4 h-4" /> 2. 100% Free Housing (H-2A Agricultural)
                  </div>
                  <p className="text-slate-400">
                    Under <strong>20 CFR § 655.122(d)</strong>, H-2A employers MUST provide certified, inspected housing at zero cost to workers who are not reasonably able to return to their residence within the same day.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                    <Plane className="w-4 h-4" /> 3. Inbound & Outbound Travel Reimbursement
                  </div>
                  <p className="text-slate-400">
                    Once you complete 50% of the contract period, the employer must reimburse all reasonable inbound travel and daily subsistence costs. Outbound transportation back home must be paid upon contract completion.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Clock className="w-4 h-4" /> 4. The 3/4 Work Guarantee
                  </div>
                  <p className="text-slate-400">
                    Under <strong>20 CFR § 655.122(i)</strong>, the employer must offer you total work hours equal to at least three-fourths (75%) of the workdays in the overall contract period, even if weather disrupts harvest.
                  </p>
                </div>
              </div>

              <div className="bg-amber-950/30 border border-amber-800/40 rounded-2xl p-5 flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-amber-300">Reporting Violations to the US Department of Labor</span>
                  <p className="text-slate-400 leading-relaxed">
                    If any recruiter asks you for money or if an employer fails to pay Adverse Effect Wage Rates, call the DOL Wage and Hour Division toll-free at <strong>1-866-4-US-WAGE (1-866-487-9243)</strong>. Calls are confidential.
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
