'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Building2, 
  DollarSign, 
  MapPin, 
  ShieldCheck, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  HelpCircle,
  TrendingUp,
  FileText,
  BadgePercent,
  Layers
} from 'lucide-react';
import { LCA_RECORDS_DATA, LcaRecord } from '@/lib/lca-data';

export default function LcaSalarySearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedWageLevel, setSelectedWageLevel] = useState('all');
  const [capExemptOnly, setCapExemptOnly] = useState(false);
  const [minSalary, setMinSalary] = useState<number>(0);

  // Filtered LCA records
  const filteredRecords = useMemo(() => {
    return LCA_RECORDS_DATA.filter(rec => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        rec.jobTitle.toLowerCase().includes(q) ||
        rec.company.toLowerCase().includes(q) ||
        rec.socTitle.toLowerCase().includes(q) ||
        rec.city.toLowerCase().includes(q);

      const matchesState = selectedState === 'all' || rec.state.toUpperCase() === selectedState.toUpperCase();
      const matchesLevel = selectedWageLevel === 'all' || rec.wageLevel.includes(selectedWageLevel);
      const matchesCap = !capExemptOnly || rec.capExempt;
      const matchesSalary = rec.baseSalary >= minSalary;

      return matchesQuery && matchesState && matchesLevel && matchesCap && matchesSalary;
    });
  }, [searchQuery, selectedState, selectedWageLevel, capExemptOnly, minSalary]);

  // Calculated Metrics for current filtered view
  const metrics = useMemo(() => {
    if (filteredRecords.length === 0) {
      return { medianSalary: 0, highestSalary: 0, totalCount: 0, avgPrevailing: 0 };
    }
    const salaries = filteredRecords.map(r => r.baseSalary).sort((a, b) => a - b);
    const median = salaries[Math.floor(salaries.length / 2)];
    const highest = salaries[salaries.length - 1];
    const avgPrev = Math.round(filteredRecords.reduce((acc, r) => acc + r.prevailingWage, 0) / filteredRecords.length);

    return {
      medianSalary: median,
      highestSalary: highest,
      totalCount: filteredRecords.length,
      avgPrevailing: avgPrev
    };
  }, [filteredRecords]);

  // Structured Schema for Google
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'US H-1B LCA Prevailing Wage & Certified Salary Search Engine 2026',
    url: 'https://www.uscareersolutions.online/tools/lca-salary-search',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Search official US Department of Labor certified H-1B base salaries, prevailing wage levels, and Day 1 Green Card sponsorship policies across top US companies.'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a certified Labor Condition Application (LCA)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An LCA (Form ETA-9035) is a mandatory public document filed with the US Department of Labor by employers sponsoring H-1B and E-3 visas. It legally certifies the exact base salary, worksite location, and prevailing wage level paid to the foreign employee.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can an employer legally pay below the DOL Prevailing Wage Level?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Federal law prohibits employers from paying less than the certified prevailing wage for that occupation and county. If the offered wage is lower than the DOL wage minimum, USCIS denies the visa petition.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between DOL Wage Levels I, II, III, and IV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Level I is for entry-level workers (17th percentile); Level II is for qualified professionals with moderate experience (34th percentile); Level III is for experienced specialists (50th percentile); and Level IV is for fully competent senior leaders (67th percentile).'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
          <span>/</span>
          <span className="text-blue-400">H-1B LCA Prevailing Wage Search</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <Building2 className="w-4 h-4" />
            <span>US Department of Labor Verified Open Data</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Live H-1B LCA Prevailing Wage & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Certified Salary Search 2026
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Search official certified base salaries, DOL wage levels (Level 1–4), worksite locations, and Day 1 Green Card sponsorship track records across top US employers.
          </p>
        </div>

        {/* Search & Filter Bar Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Company Name or Job Title
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Google, Software Engineer, Data Scientist, Meta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* State Select */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Worksite State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="all">All 50 US States</option>
                <option value="CA">California (CA)</option>
                <option value="TX">Texas (TX)</option>
                <option value="WA">Washington (WA)</option>
                <option value="NY">New York (NY)</option>
                <option value="MA">Massachusetts (MA)</option>
                <option value="IL">Illinois (IL)</option>
                <option value="NC">North Carolina (NC)</option>
                <option value="VA">Virginia (VA)</option>
                <option value="GA">Georgia (GA)</option>
              </select>
            </div>

            {/* Wage Level Select */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                DOL Wage Level
              </label>
              <select
                value={selectedWageLevel}
                onChange={(e) => setSelectedWageLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="all">All Wage Levels</option>
                <option value="Level I">Level I (Entry)</option>
                <option value="Level II">Level II (Qualified)</option>
                <option value="Level III">Level III (Experienced)</option>
                <option value="Level IV">Level IV (Fully Competent)</option>
              </select>
            </div>
          </div>

          {/* Secondary Quick Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={capExemptOnly}
                  onChange={(e) => setCapExemptOnly(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Cap-Exempt Only (0% Lottery Risk Hospitals/Universities)</span>
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Min Base Salary:</span>
              {[0, 100000, 150000, 180000, 200000].map(amt => (
                <button
                  key={amt}
                  onClick={() => setMinSalary(amt)}
                  className={`px-2.5 py-1 rounded-md border transition-colors ${minSalary === amt ? 'bg-blue-600 border-blue-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {amt === 0 ? 'Any' : `$${amt/1000}k+`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Filtered KPIs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-medium block">Median Base Salary</span>
            <span className="text-2xl font-black text-emerald-400">
              {metrics.medianSalary > 0 ? `$${metrics.medianSalary.toLocaleString()}` : 'N/A'}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-medium block">Highest Certified Base</span>
            <span className="text-2xl font-black text-white">
              {metrics.highestSalary > 0 ? `$${metrics.highestSalary.toLocaleString()}` : 'N/A'}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-medium block">Matching Certified LCAs</span>
            <span className="text-2xl font-black text-purple-400">{metrics.totalCount} Filings</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-medium block">Avg Prevailing Wage Floor</span>
            <span className="text-2xl font-black text-blue-400">
              {metrics.avgPrevailing > 0 ? `$${metrics.avgPrevailing.toLocaleString()}` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Certified LCA Records Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-12">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white">Certified Labor Condition Applications (LCA)</h2>
              <p className="text-xs text-slate-400">Official filings certified by the US Department of Labor</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Certified Data
            </span>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Job Title & SOC Code</th>
                    <th className="px-6 py-4">Employer</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Wage Level</th>
                    <th className="px-6 py-4">Certified Base Salary</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{rec.jobTitle}</div>
                        <div className="text-xs text-slate-500 font-mono">SOC: {rec.socCode} ({rec.socTitle})</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-200">{rec.company}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          {rec.day1GreenCard && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Day 1 Green Card
                            </span>
                          )}
                          {rec.capExempt && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              0% Lottery Cap-Exempt
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{rec.city}, {rec.state}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {rec.wageLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-black text-emerald-400 text-base">
                          ${rec.baseSalary.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Floor: ${rec.prevailingWage.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/tools/state-tax-compare`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <span>Take-Home Tax</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-400 mb-4">No LCA records found matching your exact search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedState('all');
                  setSelectedWageLevel('all');
                  setMinSalary(0);
                  setCapExemptOnly(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* DOL Wage Level Explainer Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BadgePercent className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Understanding US Department of Labor Wage Levels</h2>
              <p className="text-sm text-slate-400">How the DOL determines prevailing wage minimums for H-1B petitions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">Wage Level I</span>
              <h3 className="text-base font-bold text-white mb-2">Entry Level (17th Percentile)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applies to beginning candidates who perform routine tasks requiring basic knowledge and close supervision (e.g. fresh Master’s graduates on initial STEM OPT).
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">Wage Level II</span>
              <h3 className="text-base font-bold text-white mb-2">Qualified (34th Percentile)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applies to workers with a solid understanding of the occupation who perform moderately complex tasks with limited supervision (typically 2–3 yrs experience).
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">Wage Level III</span>
              <h3 className="text-base font-bold text-white mb-2">Experienced (50th Percentile)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applies to senior engineers and team leads who exercise independent judgment and plan technical system architectures (typically 5+ yrs experience).
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Wage Level IV</span>
              <h3 className="text-base font-bold text-white mb-2">Fully Competent (67th Percentile)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applies to principal staff engineers, managers, and research directors with authoritative subject matter expertise and leadership responsibilities.
              </p>
            </div>
          </div>
        </section>

        {/* High-Converting CTA Box */}
        <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-8 sm:p-10 mb-12 shadow-2xl text-center">
          <div className="max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Take the Next Step in Your US Career
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
              Know Your Exact Worth & Maximize Your Take-Home Salary
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Use our suite of free interactive tools to test your self-petition Green Card eligibility, compare state taxes side-by-side, or optimize your resume for Workday and Greenhouse ATS parsers.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tools/visa-simulator"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Test Green Card Approval Odds</span>
              </Link>
              <Link
                href="/tools/state-tax-compare"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                <DollarSign className="w-4 h-4" />
                <span>Compare State Taxes (0% Tax States)</span>
              </Link>
              <Link
                href="/jobs/states"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>Top 10 State Career Hubs</span>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions About H-1B LCA & Prevailing Wages</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">What is a certified Labor Condition Application (LCA)?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                An LCA (Form ETA-9035) is a mandatory public document filed with the US Department of Labor by employers sponsoring H-1B and E-3 visas. It legally certifies the exact base salary, worksite location, and prevailing wage level paid to the foreign employee.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">Can an employer legally pay below the DOL Prevailing Wage Level?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No. Federal law prohibits employers from paying less than the certified prevailing wage for that occupation and county. If the offered wage is lower than the DOL wage minimum, USCIS denies the visa petition.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">How do I verify if a company sponsors Day 1 Green Cards?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Top enterprise employers (Google, Meta, Apple, Amazon, Microsoft) have established corporate policies initiating PERM Labor Certification (Form ETA-9089) within 6 to 12 months of hiring, enabling foreign employees to secure Green Card priority dates quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Official Government Data Attribution & E-E-A-T Compliance Box */}
        <section className="mt-8 bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Official Government Data Sources & Verification</h4>
                <p className="text-slate-400 text-xs">Public Disclosure Program under U.S. Department of Labor (DOL) ETA-9035 regulations</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a 
                href="https://www.dol.gov/agencies/eta/foreign-labor/performance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <span>DOL OFLC Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a 
                href="https://flag.dol.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <span>FLAG Prevailing Wage</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a 
                href="https://www.bls.gov/oes/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <span>BLS OEWS Database</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          <div className="pt-6 space-y-3 leading-relaxed text-slate-400">
            <p>
              <strong className="text-slate-300">Data Methodology:</strong> All compensation records and wage levels displayed are compiled from certified Form ETA-9035 / ETA-9035E public disclosure data released quarterly by the Office of Foreign Labor Certification (OFLC) and prevailing wage benchmarks administered by the Bureau of Labor Statistics (BLS).
            </p>
            <p>
              <strong className="text-slate-300">Legal Disclaimer:</strong> US Career Solutions is an independent educational and career intelligence research platform. We are not a law firm, not affiliated with the U.S. Department of Labor (DOL), USCIS, or any governmental authority. Information provided herein is for informational and educational benchmarking purposes only and should not be construed as legal advice. For formal visa petition filings or immigration counsel, please consult a licensed immigration attorney registered with the American Immigration Lawyers Association (AILA).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
