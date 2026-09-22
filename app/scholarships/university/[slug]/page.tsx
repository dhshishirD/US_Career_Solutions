import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Users, 
  FileText, 
  ArrowRight,
  HelpCircle,
  Clock,
  Zap
} from 'lucide-react';
import { 
  UNIVERSITIES_SCHOLARSHIPS_DATA, 
  getUniversityBySlug, 
  getAllUniversitySlugs 
} from '@/lib/university-scholarships-data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllUniversitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);

  if (!uni) {
    return {
      title: 'University Scholarship Not Found | US Career Solutions',
    };
  }

  return {
    title: `${uni.name} Fully Funded Graduate Assistantships & Scholarships (2026) | Full Tuition + ${uni.averageAnnualStipend}`,
    description: `Complete guide to ${uni.name} fully funded graduate assistantships (GTA/GRA), fellowships, ${uni.averageAnnualStipend} living stipends, and application fee waivers for international students.`,
    keywords: [
      `${uni.name.toLowerCase()} fully funded graduate assistantship`,
      `${uni.shortName.toLowerCase()} international scholarships 2026`,
      `${uni.shortName.toLowerCase()} gra gta stipend amount`,
      `${uni.shortName.toLowerCase()} application fee waiver code`,
      `how to get full tuition waiver at ${uni.name.toLowerCase()}`
    ],
    alternates: {
      canonical: `https://www.uscareersolutions.online/scholarships/university/${uni.slug}`,
    },
    openGraph: {
      title: `${uni.name} Fully Funded Scholarships & Assistantships (2026)`,
      description: `100% Tuition Remission + ${uni.averageAnnualStipend} Living Stipends for International Students at ${uni.name}.`,
      url: `https://www.uscareersolutions.online/scholarships/university/${uni.slug}`,
      siteName: 'US Career Solutions',
      type: 'article',
    }
  };
}

export default async function UniversityScholarshipPage({ params }: PageProps) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);

  if (!uni) {
    notFound();
  }

  const allUnis = Object.values(UNIVERSITIES_SCHOLARSHIPS_DATA);
  const otherUnis = allUnis.filter(u => u.slug !== uni.slug).slice(0, 4);

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOccupationalCredential',
        'name': `${uni.name} Graduate Assistantship & Fellowship Program`,
        'description': `Fully funded graduate appointments offering 100% tuition remission and ${uni.averageAnnualStipend} living stipends.`,
        'credentialCategory': 'Graduate Assistantship / Fellowship',
        'recognizedBy': {
          '@type': 'CollegeOrUniversity',
          'name': uni.name,
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': uni.city,
            'addressRegion': uni.state,
            'addressCountry': 'US'
          }
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': uni.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto pb-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/scholarships" className="hover:text-white transition-colors">Scholarships</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold">{uni.name}</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Institutional Funding Guide (2026)
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              {uni.name} <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Fully Funded Assistantships & Scholarships</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-3xl">
              Complete statutory funding guide for international graduate students at <strong>{uni.name}</strong> ({uni.city}, {uni.state}). Learn how to secure full tuition waivers, {uni.averageAnnualStipend} living stipends, and application fee waivers.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-slate-400">Institutional Rank</div>
                <div className="text-sm font-bold text-white mt-1">{uni.ranking}</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-slate-400">Average Stipend</div>
                <div className="text-sm font-bold text-emerald-400 mt-1">{uni.averageAnnualStipend}</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-slate-400">International Cohort</div>
                <div className="text-sm font-bold text-cyan-400 mt-1">{uni.internationalPercentage} of Grads</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-slate-400">Funding Guarantee</div>
                <div className="text-sm font-bold text-amber-400 mt-1">100% PhD / STEM MS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Programs, Assistantships, Fee Waivers */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Primary Fully Funded Programs */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                Featured Fully Funded Programs & Fellowships
              </h2>

              <div className="space-y-6">
                {uni.primaryPrograms.map((prog, idx) => (
                  <div 
                    key={idx}
                    className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 inline-block">
                          {prog.level}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {prog.name}
                        </h3>
                      </div>
                      <div className="shrink-0 text-left sm:text-right">
                        <div className="text-xs font-mono text-slate-400">Annual Value</div>
                        <div className="text-base font-black text-emerald-400">{prog.stipend}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 mb-6 space-y-2">
                      <div className="text-xs text-slate-300">
                        <strong>Coverage:</strong> {prog.coverage}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span><strong>Application Deadline:</strong> {prog.deadline}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                        Key Eligibility & Requirements:
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-400">
                        {prog.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={prog.departmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                    >
                      <span>Visit Department Admissions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistantship Appointment Types */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-blue-400" />
                Graduate Assistantship Types & Benefits (GTA / GRA)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uni.assistantshipTypes.map((ast, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{ast.title}</h3>
                      <span className="text-[11px] font-mono text-blue-400">{ast.hoursPerWeek}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ast.duties}
                    </p>
                    <div className="text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                      <strong className="text-emerald-400">Statutory Benefits:</strong> {ast.benefits}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Fee Waiver Section */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-amber-400" />
                  Application Fee Waiver Guide
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Standard Fee: {uni.applicationFee.amount}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {uni.applicationFee.waiverProcess}
              </p>
              <Link
                href="/scholarships/fee-waiver-directory"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/10"
              >
                <span>View 20+ University Fee Waiver Codes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-purple-400" />
                Frequently Asked Questions ({uni.shortName})
              </h2>

              <div className="space-y-4">
                {uni.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Cost of Living, Quick Tools, Other Universities */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Cost of Living Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                Local Living Cost Summary
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {uni.costOfLivingSummary}
              </p>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                💡 <em>Tip: Half-time assistantship stipends at {uni.shortName} are calibrated to cover housing, health insurance, and local living costs without personal loans.</em>
              </div>
            </div>

            {/* Interactive Calculator CTA */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Check Your Acceptance & Assistantship Odds
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use our free statutory predictor to evaluate your GPA, GRE, publications, and funding eligibility.
              </p>
              <Link
                href="/tools/scholarship-predictor"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Launch Scholarship Predictor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Explore Other Top Universities */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">
                Other Fully Funded Universities
              </h3>
              <div className="space-y-3">
                {otherUnis.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/scholarships/university/${other.slug}`}
                    className="block p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-all group"
                  >
                    <div className="font-bold text-xs text-white group-hover:text-emerald-400 transition-colors">
                      {other.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {other.averageAnnualStipend} • {other.city}, {other.state}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
