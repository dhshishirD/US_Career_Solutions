'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Search, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  Copy, 
  Check, 
  GraduationCap, 
  Microscope, 
  HeartPulse, 
  Zap, 
  X,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CAP_EXEMPT_EMPLOYERS, CapExemptEmployer } from '@/lib/cap-exempt-data';

export default function CapExemptDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // Filter Logic
  const filtered = CAP_EXEMPT_EMPLOYERS.filter(emp => {
    // Search query matching
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = emp.name.toLowerCase().includes(q);
      const cityMatch = emp.city.toLowerCase().includes(q);
      const stateMatch = emp.state.toLowerCase().includes(q) || emp.stateCode.toLowerCase() === q;
      const fieldMatch = emp.topFields.some(f => f.toLowerCase().includes(q));
      if (!nameMatch && !cityMatch && !stateMatch && !fieldMatch) return false;
    }

    // State filter
    if (selectedState !== 'all' && emp.stateCode !== selectedState) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && emp.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  const concurrentPitchTemplate = `SUBJECT: Inquiry Regarding Research & Technical Roles | F-1 OPT / Cap-Exempt H-1B Candidate

Dear [Hiring Manager / Department Director],

I am writing to express my strong interest in technical and research opportunities within [Department / Laboratory Name] at [Institution Name].

I hold a [Degree Level: Master's / PhD] in [Field of Study] with core technical expertise in [Key Skills / Technologies]. My work directly aligns with your team's recent projects in [Specific Area of Research / Operational Function].

As an international candidate currently on F-1 STEM OPT, I am seeking an opportunity with a recognized Cap-Exempt institution under INA § 214(g)(5). Because [Institution Name] is an accredited Higher Education / Non-Profit Research organization, H-1B petitions can be filed year-round with zero annual lottery constraints (and qualify for 15-day Premium Processing), enabling an immediate and seamless onboarding transition.

I have attached my ATS-optimized CV for your review. Would you be available for a brief 10-minute conversation this week to discuss potential alignment?

Thank you for your time and consideration.

Sincerely,
[Your Name]
[Your Phone Number] | [LinkedIn Profile URL]`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(concurrentPitchTemplate);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Higher Education':
        return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'Non-Profit Research':
        return <Microscope className="w-4 h-4 text-purple-600" />;
      case 'Teaching Hospital / Medical Network':
        return <HeartPulse className="w-4 h-4 text-emerald-600" />;
      case 'National Laboratory (FFRDC)':
        return <Zap className="w-4 h-4 text-amber-600" />;
      default:
        return <Building2 className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-semibold mb-3 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          USCIS INA § 214(g)(5) Statutory Database
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          100+ Cap-Exempt H-1B Employers & University Directory
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Bypass the annual 85,000 H-1B lottery cap. Explore accredited U.S. universities, non-profit research institutes, and hospital networks offering <strong>year-round H-1B visa filings with 99% approval rates</strong>.
        </p>
      </div>

      {/* Statutory Explanation Card */}
      <div className="mb-8 p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-slate-800 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <span>🏛️</span> Zero Lottery Risk
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Cap-exempt petitions can be filed on any business day of the year. There is no March lottery registration or randomized computer selection.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="text-blue-400 font-bold flex items-center gap-1.5">
              <span>⚡</span> 15-Day Premium Processing
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Employers can file Form I-907 for guaranteed 15 calendar day USCIS adjudication, enabling rapid onboarding for expiring F-1 OPT candidates.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span>🔄</span> Concurrent H-1B Work Rights
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Under 8 CFR § 214.2(h)(2)(i)(G), holding a cap-exempt H-1B allows you to work part-time for a private cap-subject company simultaneously.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by university name, medical center, city (e.g., Stanford, Mayo Clinic, Boston, AI)..."
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />
        </div>

        {/* Filters Row: State Pills + Sector Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          
          {/* Quick State Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1">States:</span>
            {[
              { label: 'All States', code: 'all' },
              { label: 'California (CA)', code: 'CA' },
              { label: 'Massachusetts (MA)', code: 'MA' },
              { label: 'New York (NY)', code: 'NY' },
              { label: 'Texas (TX)', code: 'TX' },
              { label: 'Illinois (IL)', code: 'IL' },
              { label: 'Washington (WA)', code: 'WA' },
              { label: 'Maryland (MD)', code: 'MD' },
              { label: 'North Carolina (NC)', code: 'NC' },
            ].map(st => (
              <button
                key={st.code}
                type="button"
                onClick={() => setSelectedState(st.code)}
                className={`shrink-0 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  selectedState === st.code
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Sector Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Sector:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Organization Sectors</option>
              <option value="Higher Education">🏛️ Higher Education</option>
              <option value="Non-Profit Research">🔬 Non-Profit Research</option>
              <option value="Teaching Hospital / Medical Network">🏥 Teaching Hospitals</option>
              <option value="National Laboratory (FFRDC)">⚡ National Laboratories</option>
            </select>
          </div>

        </div>

      </div>

      {/* Directory Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
        <span>Showing <strong>{filtered.length}</strong> verified Cap-Exempt institutions</span>
        <span>Statutory Authority: <strong>8 CFR § 214.2(h)(8)</strong></span>
      </div>

      {/* Employer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(emp => (
          <div 
            key={emp.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Badge Row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {getCategoryIcon(emp.category)}
                  {emp.category}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  {emp.annualH1BVolume}
                </span>
              </div>

              {/* Institution Name */}
              <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                {emp.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{emp.city}, {emp.state}</span>
              </div>

              {/* Top Hiring Disciplines */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Key Hiring Domains:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {emp.topFields.map((field, i) => (
                    <span 
                      key={i}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-800 border border-blue-100"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {emp.notes}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-slate-400">
                {emp.statutoryBasis}
              </span>
              <a
                href={emp.careersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
              >
                Official Careers
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No matching institutions found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your state or search query filters.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedState('all'); setSelectedCategory('all'); }}
            className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Outreach Pitch Copy Tool */}
      <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              Candidate Toolkit
            </div>
            <h3 className="text-lg font-bold text-white">
              Cap-Exempt H-1B Cold Email Pitch Template for F-1 STEM OPT Holders
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Use this pre-formatted pitch to reach out directly to university lab directors, principal investigators (PIs), and hospital hiring managers.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyPitch}
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0 transition-colors shadow-sm"
          >
            {copiedPitch ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Cold Pitch Template
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
