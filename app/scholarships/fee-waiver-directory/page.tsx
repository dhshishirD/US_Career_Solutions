'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Search, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Filter, 
  BookOpen, 
  Calendar, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  FileCheck,
  TrendingUp,
  Percent,
  Mail,
  Compass,
  Lightbulb,
  Building2,
  FileText
} from 'lucide-react';
import { US_FEE_WAIVERS_DATA, UniversityFeeWaiver } from '@/lib/fee-waivers-data';

export default function FeeWaiverDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedGre, setSelectedGre] = useState('all');
  const [selectedWaiverType, setSelectedWaiverType] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Filtered universities
  const filteredUniversities = useMemo(() => {
    return US_FEE_WAIVERS_DATA.filter(uni => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        uni.university.toLowerCase().includes(q) ||
        uni.description.toLowerCase().includes(q) ||
        uni.waiverCodeOrInstruction.toLowerCase().includes(q);

      const matchesState = selectedState === 'all' || uni.state.toUpperCase() === selectedState.toUpperCase();
      const matchesGre = selectedGre === 'all' || uni.greRequirement.includes(selectedGre);
      const matchesType = selectedWaiverType === 'all' || uni.waiverType.includes(selectedWaiverType);

      return matchesQuery && matchesState && matchesGre && matchesType;
    });
  }, [searchQuery, selectedState, selectedGre, selectedWaiverType]);

  // Telemetry KPIs
  const stats = useMemo(() => {
    const totalWaiverSavings = filteredUniversities.reduce((acc, u) => acc + (u.standardFee || 85), 0);
    const greWaivedCount = filteredUniversities.filter(u => u.greRequirement.includes('Waived') || u.greRequirement.includes('Optional')).length;
    const fundedCount = filteredUniversities.filter(u => u.fundingCoverage.includes('100% Full Tuition')).length;

    return {
      count: filteredUniversities.length,
      savings: totalWaiverSavings,
      greWaivedPct: filteredUniversities.length > 0 ? Math.round((greWaivedCount / filteredUniversities.length) * 100) : 0,
      fundedPct: filteredUniversities.length > 0 ? Math.round((fundedCount / filteredUniversities.length) * 100) : 0
    };
  }, [filteredUniversities]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const coldEmailTemplate = `Subject: Prospective Fall 2026 [MS/PhD] Inquiries - [Your Area of Research, e.g. Machine Learning Systems]

Dear Professor [Last Name],

I hope this email finds you well. I have been following your lab's recent publications in [Specific Research Topic], particularly your 2025 paper on [Paper Title or Specific Finding]. 

I am applying to the [MS/PhD] in [Department Name] for Fall 2026 at [University Name]. My academic background in [Your Major/Field] from [Your Undergraduate University] aligns directly with your lab's focus on [Mention 1-2 Technical Skills/Tools]. 

During my undergraduate thesis / research project, I worked on [1-sentence achievement with quantifiable metrics].

Are you planning to take on new graduate research assistants (GRA) funded under your active research grants for the upcoming Fall 2026 academic cycle?

I have attached my academic CV and unofficial transcript for your preliminary review. I would welcome 10 minutes to discuss how my technical skill set could contribute to your ongoing projects.

Sincerely,
[Your Full Name]
[LinkedIn / GitHub Portfolio Link]
[Your Phone / WhatsApp Number]`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(coldEmailTemplate);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Structured Data Schema for Google High-Intent Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'Fall 2026 US University Application Fee Waiver & GRE Waiver Directory',
    description: 'Verified directory of US universities offering 100% application fee waivers, GRE waivers, and full tuition Graduate Assistantships (GTA/GRA) for Fall 2026 and Spring 2027.',
    provider: {
      '@type': 'Organization',
      name: 'US Career Solutions',
      url: 'https://www.uscareersolutions.online'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do international students get US university application fee waivers for Fall 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'International applicants can secure $0 application fee waivers by: (1) Attending official virtual graduate info sessions or open houses, (2) Submitting promotional departmental codes, (3) Emailing graduate program directors directly with an academic CV, or (4) Applying to universities with permanent $0 application fees.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are GRE scores waived for US Master\'s and PhD programs in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Over 75% of top US STEM graduate programs have made GRE scores completely optional or permanently waived for Fall 2026 admissions, evaluating applicants on undergraduate GPA, research experience, and SOP strength.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a Graduate Teaching or Research Assistantship (GTA/GRA)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Graduate Assistantship provides 100% full tuition coverage (tuition remission) plus a monthly living stipend ($2,200 - $3,800/month) in exchange for 20 hours per week of teaching or laboratory research assistance.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/scholarships" className="hover:text-emerald-400 transition-colors">Scholarships & Education</Link>
          <span>/</span>
          <span className="text-emerald-400 font-medium">Fall 2026 Fee Waiver Directory</span>
        </nav>

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 mb-10 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fall 2026 & Spring 2027 Admissions Rush</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              US Universities Application <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Fee Waiver Directory</span> 2026
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Stop paying <strong className="text-white">$75 to $120</strong> per application. Search verified US institutions offering <strong>100% Free Application Codes</strong>, <strong>GRE Waivers</strong>, and <strong>Full-Ride Graduate Assistantships (GTA/GRA)</strong> with $2,400+ monthly stipends.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified .EDU Admissions Portals</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fall 2026 Deadlines</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Free Access</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live KPI Telemetry Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Active Fee Waivers</span>
              <GraduationCap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{stats.count} Universities</div>
            <p className="text-xs text-slate-400 mt-1">Verified for Fall 2026</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Potential Savings</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">${stats.savings.toLocaleString()} USD</div>
            <p className="text-xs text-slate-400 mt-1">Applying to listed programs</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">No GRE Required</span>
              <Percent className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{stats.greWaivedPct}% of Programs</div>
            <p className="text-xs text-slate-400 mt-1">GRE Optional / Waived</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Full Funding Rate</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">{stats.fundedPct}% Available</div>
            <p className="text-xs text-slate-400 mt-1">Full Tuition + GTA/GRA Stipend</p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search university (e.g. Northeastern, Michigan, Purdue, Arlington, Robotics, CS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedGre}
                onChange={(e) => setSelectedGre(e.target.value)}
                aria-label="Filter by GRE Requirement"
                className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All GRE Policies</option>
                <option value="Waived">100% GRE Waived</option>
                <option value="Optional">GRE Optional</option>
              </select>

              <select
                value={selectedWaiverType}
                onChange={(e) => setSelectedWaiverType(e.target.value)}
                aria-label="Filter by Waiver Type"
                className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Waiver Types</option>
                <option value="Automatic">Automatic ($0 Fee)</option>
                <option value="Info Session">Info Session / Webinar</option>
                <option value="Promotional">Promo Code</option>
                <option value="Direct Email">Email Request</option>
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                aria-label="Filter by US State"
                className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All US States</option>
                <option value="MA">Massachusetts (MA)</option>
                <option value="TX">Texas (TX)</option>
                <option value="MI">Michigan (MI)</option>
                <option value="NY">New York (NY)</option>
                <option value="IL">Illinois (IL)</option>
                <option value="VA">Virginia (VA)</option>
                <option value="CO">Colorado (CO)</option>
                <option value="OH">Ohio (OH)</option>
                <option value="FL">Florida (FL)</option>
                <option value="WI">Wisconsin (WI)</option>
                <option value="AZ">Arizona (AZ)</option>
                <option value="NJ">New Jersey (NJ)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Showing <strong className="text-emerald-400">{filteredUniversities.length}</strong> matching university fee waivers</span>
            {(searchQuery || selectedState !== 'all' || selectedGre !== 'all' || selectedWaiverType !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedState('all');
                  setSelectedGre('all');
                  setSelectedWaiverType('all');
                }}
                className="text-emerald-400 hover:underline font-medium"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="space-y-6 mb-12">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-200 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                      {uni.waiverType}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                      {uni.greRequirement}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-bold">
                      {uni.state}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {uni.university}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {uni.description}
                  </p>

                  {/* Waiver Code / Instructions Box */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Waiver Method & Code Instructions:</span>
                      </span>
                      <button
                        onClick={() => handleCopy(uni.id, uni.waiverCodeOrInstruction)}
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
                      >
                        {copiedId === uni.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Instruction</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-mono bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                      {uni.waiverCodeOrInstruction}
                    </p>
                  </div>

                  {/* Program Details Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/50">
                      <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Funding:</strong> {uni.fundingCoverage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/50">
                      <DollarSign className="w-4 h-4 text-teal-400 shrink-0" />
                      <span><strong>Stipend:</strong> {uni.averageStipend}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/50">
                      <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                      <span><strong>Priority Deadline:</strong> {uni.priorityDeadlineFall2026}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/50">
                      <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                      <span><strong>Degrees:</strong> {uni.degreeLevels.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="lg:w-60 flex flex-col justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-6">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Standard Application Fee</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">${uni.standardFee}</span>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        {uni.standardFee === 0 ? 'FREE' : '-> $0 With Waiver'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={uni.officialApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all"
                    >
                      <span>Apply on .EDU Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      href="/tools/scholarship-predictor"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 font-semibold text-xs transition-colors"
                    >
                      <span>Check Admission Odds</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTENT GAP SOLVER 1: The Professor Cold-Email Formula */}
        <section className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 mb-12 shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Exclusive Strategy Blueprint</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  The Professor Cold-Email Formula (40%+ Response Rate)
                </h2>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied Cold-Email Template!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete Email Script</span>
                </>
              )}
            </button>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Over 85% of graduate research funding (GRA) is controlled directly by individual professors, not the general admissions committee. If a professor agrees to sponsor you, the department automatically waives your application fee and issues a 100% full-ride tuition waiver with living stipend.
          </p>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
            <pre className="whitespace-pre-wrap font-mono">{coldEmailTemplate}</pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <strong className="text-emerald-400 block mb-1">1. Timing Window (Sept - Nov)</strong>
              <span>Send emails between 8:00 AM - 9:30 AM US Eastern Time on Tuesday through Thursday for maximum open rates.</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <strong className="text-teal-400 block mb-1">2. Target Active NSF Grants</strong>
              <span>Search <code className="text-slate-200">nsf.gov/awardsearch</code> for professors who received $500k+ grants in 2024-2026.</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <strong className="text-cyan-400 block mb-1">3. Keep Under 150 Words</strong>
              <span>Busy US faculty ignore long life stories. Focus on 1 specific paper and your exact technical contribution.</span>
            </div>
          </div>
        </section>

        {/* CONTENT GAP SOLVER 2: The 4-Step Method to $0 Application Fees */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 mb-12 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              The 4-Step Strategy to Secure $0 Application Fee Waivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-2">1. Attend Official Virtual Open Houses</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Top universities (e.g. Northeastern, Purdue, Stevens, Case Western) host free 45-minute webinars every September through December. Attending generates an automated email containing a personalized 100% waiver promo code.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-2">2. Direct Department Coordinator Request</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Before submitting your portal, send a brief email to the Graduate Program Director: <em>&quot;Dear Prof. [Name], I am applying to the MS/PhD in [Program] with research interests in [Topic]. Does the department offer application fee waiver vouchers for prospective scholars? Attached is my CV.&quot;</em>
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-2">3. Prioritize Zero-Fee Public Institutions</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Universities like Michigan Tech, University of Dayton, and Tulane Science & Engineering have permanent $0 application fees for international graduate applicants.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-2">4. Target STEM Graduate Assistantships (GTA/GRA)</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Securing a Teaching or Research Assistantship automatically covers 100% of out-of-state tuition plus provides a monthly living stipend ($2,200 - $3,800/mo), converting your degree into a fully funded education.
              </p>
            </div>
          </div>
        </section>

        {/* High-Converting CTA Box */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 mb-12 shadow-2xl text-center">
          <div className="max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Free AI Career & Education Suite
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
              Maximize Your US Graduate Admissions & Career Success
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Optimize your academic CV for US research assistantships, calculate your F-1 STEM OPT visa pathway, or search certified H-1B salaries across top US tech sponsors.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tools/scholarship-predictor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Full-Ride Scholarship Predictor</span>
              </Link>
              <Link
                href="/tools/ats-scanner"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Optimize Resume for Assistantships</span>
              </Link>
              <Link
                href="/tools/lca-salary-search"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Search H-1B Base Salaries</span>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">How do international students get US university application fee waivers for Fall 2026?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                International applicants can secure $0 application fee waivers by: (1) Attending official virtual graduate info sessions or open houses, (2) Submitting promotional departmental codes, (3) Emailing graduate program directors directly with an academic CV, or (4) Applying to universities with permanent $0 application fees.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">Are GRE scores waived for US Master&apos;s and PhD programs in 2026?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Yes. Over 75% of top US STEM graduate programs have made GRE scores completely optional or permanently waived for Fall 2026 admissions, evaluating applicants on undergraduate GPA, research experience, and SOP strength.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">What is a Graduate Teaching or Research Assistantship (GTA/GRA)?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A Graduate Assistantship provides 100% full tuition coverage (tuition remission) plus a monthly living stipend ($2,200 - $3,800/month) in exchange for 20 hours per week of teaching or laboratory research assistance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
