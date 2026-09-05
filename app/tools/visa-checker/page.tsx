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
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Globe2,
  Cpu,
  FileCheck,
  Briefcase
} from 'lucide-react';
import { CompanySponsorshipRecord } from '@/lib/types';
import { TOP_SPONSOR_COMPANIES, searchCompanies, lookupCompanySponsorship } from '@/lib/sponsorship-db';

export default function VisaCheckerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cap-exempt' | 'healthcare' | 'tech' | 'remote'>('all');
  const [selectedCompany, setSelectedCompany] = useState<CompanySponsorshipRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const filteredCompanies = searchCompanies(searchTerm, activeTab);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setHasSearched(true);
    const found = lookupCompanySponsorship(searchTerm);
    setSelectedCompany(found);
  };

  const selectCompany = (company: CompanySponsorshipRecord) => {
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
          USCIS & DOL LCA Intelligence Radar
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          USA Company Visa Sponsor Radar
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Verify whether an employer sponsors foreign talent, issues Cap-Exempt (no-lottery) H-1Bs, or hires worldwide via W-8BEN contractor agreements before investing hours into applications.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-4xl mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (!e.target.value) {
                  setSelectedCompany(null);
                  setHasSearched(false);
                }
              }}
              placeholder="Search any US employer (e.g. Microsoft, Stanford, Mayo Clinic, Amazon, Automattic)..."
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

        {/* Category Filter Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-500 mr-1">Filter Directory:</span>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            All Verified ({TOP_SPONSOR_COMPANIES.length})
          </button>
          <button
            onClick={() => setActiveTab('cap-exempt')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${activeTab === 'cap-exempt' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'}`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Cap-Exempt (No Lottery)
          </button>
          <button
            onClick={() => setActiveTab('healthcare')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${activeTab === 'healthcare' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'}`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            Healthcare / Schedule A
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${activeTab === 'tech' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'}`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Big Tech & Scaleups
          </button>
          <button
            onClick={() => setActiveTab('remote')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${activeTab === 'remote' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            Global Remote (W-8BEN)
          </button>
        </div>
      </div>

      {/* Direct Search Single Match Spotlight */}
      {hasSearched && (
        <div className="max-w-4xl mb-10">
          {selectedCompany ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xl">
                    {selectedCompany.companyName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black text-slate-900">{selectedCompany.companyName}</h2>
                      {selectedCompany.capExempt && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                          Cap-Exempt (No Lottery)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedCompany.domain}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://h1bdata.info/index.php?em=${encodeURIComponent(selectedCompany.companyName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                    View DOL LCA Filings
                    <ExternalLink className="w-3 h-3 ml-0.5 text-slate-400" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Annual H-1B Petitions</span>
                  <p className="text-xl font-black text-slate-900 mt-1">{selectedCompany.totalH1BFiled}+</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">USCIS Approval Rate</span>
                  <p className="text-xl font-black text-emerald-600 mt-1">{selectedCompany.approvalRate}%</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-500 font-medium">Sponsorship Policy</span>
                  <p className="text-sm font-bold text-slate-800 mt-1">
                    {selectedCompany.capExempt ? 'Lottery Exempt' : 'Direct Employer Sponsor'}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 mb-4">
                <p className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Official Radar Assessment:
                </p>
                {selectedCompany.notes}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Top Sponsored Occupations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCompany.topOccupations.map(occ => (
                    <span key={occ} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-lg font-medium">
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900">Custom Employer Search: &quot;{searchTerm}&quot;</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1 mb-4">
                This specific employer is not in our top pre-indexed verified database, but you can inspect their real-time Department of Labor disclosures immediately.
              </p>
              <a
                href={`https://h1bdata.info/index.php?em=${encodeURIComponent(searchTerm)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl shadow transition-colors"
              >
                Inspect Official US DOL LCA Filings for &quot;{searchTerm}&quot;
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Directory Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Verified Sponsoring Employers Directory ({filteredCompanies.length})
          </h2>
          <span className="text-xs text-slate-500">Click any card to inspect full immigration filing details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((comp) => (
            <div
              key={comp.companyName}
              onClick={() => selectCompany(comp)}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {comp.companyName}
                    </h3>
                    <span className="text-xs text-slate-400">{comp.domain}</span>
                  </div>
                  {comp.capExempt ? (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap">
                      Cap-Exempt
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap">
                      {comp.approvalRate}% Approval
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {comp.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{comp.totalH1BFiled}+ annual filings</span>
                <span className="font-bold text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  View Data &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
