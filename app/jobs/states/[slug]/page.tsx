import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  ShieldCheck, 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { US_STATES_DATA } from '@/lib/states-data';
import { INITIAL_JOBS } from '@/lib/jobs-data';
import JobCard from '@/components/JobCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(US_STATES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const state = US_STATES_DATA[slug];
  if (!state) return {};

  return {
    title: `${state.name} H-1B Visa Sponsorship Jobs & Tech Salaries 2026 | US Career Solutions`,
    description: state.metaDescription,
    alternates: {
      canonical: `https://www.uscareersolutions.online/jobs/states/${slug}`,
    },
    openGraph: {
      title: `${state.name} Visa Sponsorship Jobs & Salary Guide 2026`,
      description: state.metaDescription,
      url: `https://www.uscareersolutions.online/jobs/states/${slug}`,
      type: 'article',
    }
  };
}

export default async function StateDetailPage({ params }: Props) {
  const { slug } = await params;
  const state = US_STATES_DATA[slug];

  if (!state) {
    notFound();
  }

  // Filter jobs belonging to this state or remote with this state origin
  const matchingJobs = INITIAL_JOBS.filter(job => 
    job.state?.toUpperCase() === state.code.toUpperCase() || 
    (job.location && job.location.includes(state.name))
  );

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: state.discussions.map((d) => ({
      '@type': 'Question',
      name: d.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: d.answer
      }
    }))
  };

  // Breadcrumb Schema
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
        name: 'States',
        item: 'https://www.uscareersolutions.online/jobs/states'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: state.name,
        item: `https://www.uscareersolutions.online/jobs/states/${state.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb & Back Link */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
            <span>/</span>
            <Link href="/jobs/states" className="hover:text-white transition-colors">States</Link>
            <span>/</span>
            <span className="text-blue-400">{state.name}</span>
          </nav>
          <Link 
            href="/jobs/states" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All States</span>
          </Link>
        </div>

        {/* Hero Header Card */}
        <div className={`rounded-3xl p-8 sm:p-10 border border-slate-800 bg-gradient-to-br ${state.heroBgGradient} relative overflow-hidden mb-12 shadow-2xl`}>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                {state.code} State Hub
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{ borderColor: `${state.badgeColor}60`, color: state.badgeColor, backgroundColor: `${state.badgeColor}20` }}
              >
                {state.stats.h1bApprovalRank}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {state.stats.stateIncomeTax} Tax
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              {state.name} Visa Sponsorship & <br className="hidden sm:inline" />
              <span className="text-blue-400">Career Intelligence 2026</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
              {state.tagline}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/70 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Avg Tech Salary</span>
                <span className="text-lg sm:text-xl font-black text-white">{state.stats.avgTechSalary}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">State Income Tax</span>
                <span className="text-lg sm:text-xl font-black text-emerald-400">{state.stats.stateIncomeTax}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Median Rent</span>
                <span className="text-lg sm:text-xl font-black text-slate-200">{state.stats.medianRent}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">E-Verify Status</span>
                <span className="text-lg sm:text-xl font-black text-blue-400">{state.stats.eVerifyRank}</span>
              </div>
            </div>
          </div>
        </div>

        {/* State Salary & Net Take-Home Tax Breakdown */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {state.name} Net Take-Home Pay Analysis ($150,000 Base)
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">Gross Annual Salary</span>
                <span className="text-2xl font-bold text-white">${state.taxAnalysis.grossSalary.toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">Federal Income Tax</span>
                <span className="text-2xl font-bold text-rose-400">-${state.taxAnalysis.federalTax.toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">State Income Tax</span>
                <span className="text-2xl font-bold text-rose-400">
                  {state.taxAnalysis.stateTax === 0 ? '$0 (Exempt)' : `-$${state.taxAnalysis.stateTax.toLocaleString()}`}
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">Estimated Net Take-Home</span>
                <span className="text-2xl font-black text-emerald-400">${state.taxAnalysis.netTakeHome.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">Tax Strategy Insight:</strong> {state.taxAnalysis.comparisonNote}
              </p>
            </div>
          </div>
        </section>

        {/* Top 5 Verified Visa Sponsors Table */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Top Enterprise H-1B Visa Sponsors in {state.name}
            </h2>
          </div>

          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Employer</th>
                  <th className="px-6 py-4">Industry</th>
                  <th className="px-6 py-4">Approved LCA Filings</th>
                  <th className="px-6 py-4">Median Base Salary</th>
                  <th className="px-6 py-4">Green Card Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {state.topSponsors.map((sponsor, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{sponsor.name}</td>
                    <td className="px-6 py-4 text-slate-400">{sponsor.industry}</td>
                    <td className="px-6 py-4 font-semibold text-purple-400">{sponsor.h1bApprovals}</td>
                    <td className="px-6 py-4 font-bold text-emerald-400">{sponsor.medianSalary}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Day 1 PERM Support
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cap-Exempt Institutions Box */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Cap-Exempt Employers in {state.name} (Zero Lottery Risk)
              </h2>
              <p className="text-sm text-slate-400">
                These universities and medical research systems are legally exempt from the annual 85,000 H-1B cap.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {state.capExemptInstitutions.map((inst, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block mb-3">
                    {inst.type}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1">{inst.name}</h3>
                  <p className="text-xs font-medium text-slate-400 mb-4">{inst.city}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{inst.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Jobs in this State */}
        <section className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Active Job Openings in {state.name} ({matchingJobs.length})
              </h2>
            </div>
            <Link 
              href={`/jobs?q=${encodeURIComponent(state.name)}`}
              className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>Explore All Jobs</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {matchingJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchingJobs.slice(0, 4).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <p className="text-slate-400 mb-4">Explore verified remote and enterprise sponsorship roles for {state.name}:</p>
              <Link 
                href={`/jobs?q=${encodeURIComponent(state.name)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                <span>Search {state.name} Openings</span>
              </Link>
            </div>
          )}
        </section>

        {/* Community Discussion & State FAQs */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {state.name} Career & Immigration Community Discussions
              </h2>
              <p className="text-sm text-slate-400">
                Verified answers from senior tech architects, healthcare recruiters, and immigration attorneys.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {state.discussions.map((disc, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
                    {disc.authorRole}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    ▲ {disc.upvotes} Community Upvotes
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{disc.question}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{disc.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Insider State Tips */}
        <section className="mb-14 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>Insider Relocation & Career Tips for {state.name}</span>
          </h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {state.insiderTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Explore Other States Navigation */}
        <div className="border-t border-slate-800 pt-8 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-semibold text-slate-400">Explore Other States:</span>
          <div className="flex flex-wrap gap-2">
            {Object.values(US_STATES_DATA).filter(s => s.slug !== state.slug).map((otherState) => (
              <Link
                key={otherState.slug}
                href={`/jobs/states/${otherState.slug}`}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition-colors"
              >
                {otherState.name} ({otherState.code})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
