'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  RotateCw, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2, 
  X,
  AlertCircle
} from 'lucide-react';
import JobCard from '@/components/JobCard';
import { JobPosting, VisaSponsorshipType, JobCategory } from '@/lib/types';
import { INITIAL_JOBS } from '@/lib/jobs-data';

function JobsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialSponsorship = searchParams.get('sponsorship') || 'all';
  const initialRemote = searchParams.get('remote') === 'true';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedSponsorship, setSelectedSponsorship] = useState<string>(initialSponsorship);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [remoteOnly, setRemoteOnly] = useState<boolean>(initialRemote);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [jobs, setJobs] = useState<JobPosting[]>(INITIAL_JOBS);
  const [isLoading, setIsLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (selectedSponsorship !== 'all') params.set('sponsorship', selectedSponsorship);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (remoteOnly) params.set('remote', 'true');
      if (minSalary > 0) params.set('minSalary', minSalary.toString());

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedSponsorship, selectedCategory, remoteOnly, minSalary]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleManualSync = async () => {
    setSyncMessage('Checking public US job feeds and ATS endpoints...');
    try {
      const res = await fetch('/api/cron/sync-jobs');
      const data = await res.json();
      if (data.success) {
        setSyncMessage(`Sync complete! ${data.newlyIngested} fresh opportunities added. Total active: ${data.totalActiveJobs}`);
        fetchJobs();
      } else {
        setSyncMessage('Feed sync complete.');
      }
    } catch {
      setSyncMessage('Sync finished.');
    }
    setTimeout(() => setSyncMessage(null), 5000);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSponsorship('all');
    setSelectedCategory('all');
    setRemoteOnly(false);
    setMinSalary(0);
  };

  const hasActiveFilters = searchQuery !== '' || selectedSponsorship !== 'all' || selectedCategory !== 'all' || remoteOnly || minSalary > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            Verified Everyday Database
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Daily USA Job Opportunities
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Filter by legal visa sponsorship status, Cap-Exempt institutions, and US remote contracts.
          </p>
        </div>

        {/* Sync Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleManualSync}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 shadow-sm transition-all"
            title="Fetch latest job postings from live feeds"
          >
            <RotateCw className="w-3.5 h-3.5 text-blue-600" />
            Sync Fresh Jobs
          </button>
        </div>
      </div>

      {syncMessage && (
        <div className="my-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
          {syncMessage}
        </div>
      )}

      {/* Main Layout: Filters Sidebar + Job Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-600" />
                Filter Positions
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Visa Sponsorship Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Visa / Work Eligibility
              </label>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Eligibility Types' },
                  { value: 'H-1B Sponsor', label: 'H-1B Visa Sponsor' },
                  { value: 'Cap-Exempt H-1B', label: 'Cap-Exempt H-1B (No Lottery)' },
                  { value: 'OPT/CPT Friendly', label: 'OPT / STEM OPT Friendly' },
                  { value: 'US Remote (Contractor/W-8BEN)', label: 'Global Remote (W-8BEN)' },
                ].map(opt => (
                  <label 
                    key={opt.value} 
                    className={`flex items-center gap-2 text-xs p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedSponsorship === opt.value 
                        ? 'bg-blue-50 text-blue-800 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sponsorship"
                      value={opt.value}
                      checked={selectedSponsorship === opt.value}
                      onChange={(e) => setSelectedSponsorship(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Job Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Job Categories</option>
                <option value="Software & Tech">Software & Tech</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Healthcare & Nursing">Healthcare & Nursing</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
              </select>
            </div>

            {/* Remote Toggle */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-700">
                  Remote Opportunities Only
                </span>
              </label>
            </div>

            {/* Minimum Salary Filter */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Minimum Salary (USD)</span>
                <span className="text-blue-600">
                  {minSalary > 0 ? `$${minSalary.toLocaleString()}/yr` : 'Any'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="180000"
                step="15000"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$0</span>
                <span>$90k</span>
                <span>$180k+</span>
              </div>
            </div>

          </div>
        </div>

        {/* Jobs Results Column */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, skills, or company name..."
                className="w-full text-sm bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition-all"
            >
              Search
            </button>
          </form>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-slate-400">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                  "{searchQuery}"
                  <button onClick={() => { setSearchQuery(''); fetchJobs(); }}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedSponsorship !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                  {selectedSponsorship}
                  <button onClick={() => setSelectedSponsorship('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {remoteOnly && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                  Remote Only
                  <button onClick={() => setRemoteOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 py-1">
            <span>Showing <strong>{jobs.length}</strong> active opportunities</span>
            <span>Sorted by: <strong>Newest First</strong></span>
          </div>

          {/* Job List */}
          {isLoading ? (
            <div className="py-20 text-center text-slate-400">
              <RotateCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-3" />
              Loading verified positions...
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No matching jobs found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Try loosening your filters or resetting your search keywords to see more opportunities.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading US Jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}
