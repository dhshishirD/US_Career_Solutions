import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Percent, 
  Sparkles,
  Compass
} from 'lucide-react';
import { US_STATES_DATA } from '@/lib/states-data';

export const metadata: Metadata = {
  title: 'Top US States for Visa Sponsorship & Tech Jobs 2026 | US Career Solutions',
  description: 'Explore the top 10 US states ranked by H-1B visa approvals, median tech salaries, state income tax (0% tax states), and cost of living. California, Texas, New York, Washington & more.',
  alternates: {
    canonical: 'https://www.uscareersolutions.online/jobs/states',
  },
  openGraph: {
    title: 'Top US States for Visa Sponsorship & Tech Jobs 2026',
    description: 'Compare H-1B visa approvals, state income tax rates, and tech salary benchmarks across top US states.',
    url: 'https://www.uscareersolutions.online/jobs/states',
    type: 'website',
  }
};

export default function StatesDirectoryPage() {
  const statesList = Object.values(US_STATES_DATA);

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.uscareersolutions.online'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Jobs',
        item: 'https://www.uscareersolutions.online/jobs'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'US States Directory',
        item: 'https://www.uscareersolutions.online/jobs/states'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
          <span>/</span>
          <span className="text-blue-400">US States Directory</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <Compass className="w-4 h-4" />
            <span>US Geographic Career & Visa Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Top US States Ranked by <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Visa Sponsorship & Salaries
            </span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Compare verified H-1B LCA filing volumes, state income tax rates (including 0% tax havens like Texas & Washington), median tech salaries, and cap-exempt research institutions across the top 10 employment states.
          </p>
        </div>

        {/* Quick Insights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">#1 H-1B Hub</h3>
            </div>
            <p className="text-2xl font-black text-purple-400 mb-1">California</p>
            <p className="text-sm text-slate-400">75,000+ approved petitions in Silicon Valley & SF Bay Area.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">0% State Tax</h3>
            </div>
            <p className="text-2xl font-black text-emerald-400 mb-1">Texas & Washington</p>
            <p className="text-sm text-slate-400">Keep $10,800+ more net take-home pay per year vs CA/NY.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Biotech & Cap-Exempt</h3>
            </div>
            <p className="text-2xl font-black text-blue-400 mb-1">Massachusetts</p>
            <p className="text-sm text-slate-400">Kendall Square & Harvard/MIT cap-exempt research labs.</p>
          </div>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statesList.map((state) => (
            <Link 
              key={state.slug} 
              href={`/jobs/states/${state.slug}`}
              className="group bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {state.code}
                    </span>
                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mt-2">
                      {state.name}
                    </h2>
                  </div>
                  <span 
                    className="text-xs font-bold px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `${state.badgeColor}40`, color: state.badgeColor, backgroundColor: `${state.badgeColor}15` }}
                  >
                    {state.stats.h1bApprovalRank}
                  </span>
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                  {state.tagline}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Avg Tech Base</span>
                    <span className="text-sm font-bold text-slate-200">{state.stats.avgTechSalary}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">State Income Tax</span>
                    <span className="text-sm font-bold text-emerald-400">{state.stats.stateIncomeTax}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Median Rent</span>
                    <span className="text-sm font-bold text-slate-200">{state.stats.medianRent}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Top Hub</span>
                    <span className="text-sm font-bold text-blue-400 truncate block">{state.keyHubs[0]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform pt-2 border-t border-slate-800/80">
                <span>View {state.name} Jobs & Tax Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
