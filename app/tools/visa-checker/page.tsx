'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { CompanySponsorshipRecord } from '@/lib/types';
import { TOP_SPONSOR_COMPANIES } from '@/lib/sponsorship-db';

export default function VisaCheckerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanySponsorshipRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setHasSearched(true);
    const query = searchTerm.toLowerCase().trim();
    const match = TOP_SPONSOR_COMPANIES.find(c => 
      c.companyName.toLowerCase().includes(query) || 
      query.includes(c.companyName.toLowerCase())
    );
    setSelectedCompany(match || null);
  };

  const selectPredefined = (company: CompanySponsorshipRecord) => {
    setSearchTerm(company.companyName);
    setSelectedCompany(company);
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          USCIS & DOL LCA Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          USA Company Visa Sponsor Radar
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Verify whether an employer actually sponsors foreign talent before investing hours into applications. Cross-referenced against US Department of Labor LCA disclosure records and Cap-Exempt listings.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-3xl mb-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter US employer name (e.g., Microsoft, Mayo Clinic, Stanford, Amazon)..."
              className="w-full text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            Lookup Sponsor
          </button>
        </form>

        {/* Quick Quicklinks */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <span>Popular searches:</span>
          {['Microsoft', 'Amazon', 'Stanford University', 'Mayo Clinic', 'Tesla', 'Stripe'].map(name => (
            <button
              key={name}
              onClick={() => {
                const found = TOP_SPONSOR_COMPANIES.find(c => c.companyName === name);
                if (found) selectPredefined(found);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Result Display */}
      {hasSearched && (
        <div className="max-w-3xl mb-12 animate-in fade-in duration-300">
          {selectedCompany ? (
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-slate-900">
                      {selectedCompany.companyName}
                    </h2>
                    {selectedCompany.capExempt && (
                      <span className="badge-capexempt text-xs font-bold px-2.5 py-0.5 rounded-full">
                        Cap-Exempt (No Lottery!)
                      </span>
                    )}
                  </div>
                  {selectedCompany.domain && (
                    <span className="text-xs text-slate-400">
                      Domain: {selectedCompany.domain}
                    </span>
                  )}
                </div>

                <div className="text-left sm:text-right">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Confirmed US Sponsor
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Annual H-1B Filings</span>
                  <div className="text-xl font-black text-slate-900 mt-1">
                    {selectedCompany.totalH1BFiled.toLocaleString()}+
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">LCA Approval Rate</span>
                  <div className="text-xl font-black text-emerald-600 mt-1">
                    {selectedCompany.approvalRate}%
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-500 font-medium">H-1B Lottery Status</span>
                  <div className="text-sm font-bold text-slate-900 mt-1">
                    {selectedCompany.capExempt ? 'Exempt (Year-Round)' : 'Subject to Annual Cap'}
                  </div>
                </div>
              </div>

              {/* Sponsor Advice & Top Occupations */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Top Sponsored Occupations
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompany.topOccupations.map((role, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCompany.notes && (
                  <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl text-xs sm:text-sm text-slate-700">
                    <strong className="text-emerald-900">Immigration Intelligence: </strong>
                    {selectedCompany.notes}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-900">
                No direct indexed filings found for "{searchTerm}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                This employer may be a startup, private boutique agency, or hires via international contractor agreements. You can still reach out to their talent team or ask about STEM OPT extensions.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Directory of Featured Top Sponsors */}
      <div className="mt-8">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">
          Major US Sponsors Quick Directory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_SPONSOR_COMPANIES.slice(0, 9).map((comp, i) => (
            <div
              key={i}
              onClick={() => selectPredefined(comp)}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-400 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-900">{comp.companyName}</h4>
                <span className="text-xs text-slate-500">
                  {comp.totalH1BFiled}+ filings • {comp.approvalRate}% approval
                </span>
              </div>
              {comp.capExempt && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-capexempt">
                  Cap-Exempt
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
