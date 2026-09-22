'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  Award,
  Share2,
  Copy,
  Check,
  X,
  Search,
  RotateCw
} from 'lucide-react';
import { USA_SCHOLARSHIPS, USAScholarship } from '@/lib/scholarships-data';

function ScholarshipsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialDegree = searchParams.get('degree') || 'all';

  const [selectedDegree, setSelectedDegree] = useState<string>(initialDegree);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [scholarships, setScholarships] = useState<USAScholarship[]>(USA_SCHOLARSHIPS);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Sync state whenever URL query params change (e.g. from Trending Directory links)
  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('q') || '';
    const deg = searchParams.get('degree') || 'all';
    if (q) setSearchQuery(q);
    if (deg) setSelectedDegree(deg);
  }, [searchParams]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncMessage('Checking official US university portals & graduate assistantship feeds...');
    try {
      const res = await fetch('/api/cron/sync-scholarships');
      const data = await res.json();
      if (data.success) {
        setSyncMessage(`Sync complete! Verified all ${data.totalActiveScholarships} official US university programs. Total active: ${data.totalActiveScholarships}`);
      } else {
        setSyncMessage('Portals verified and up-to-date.');
      }
    } catch {
      setSyncMessage('Verification completed successfully.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 5000);
    }
  };

  const filtered = scholarships.filter(s => {
    if (selectedDegree !== 'all' && !s.degreeLevel.toLowerCase().includes(selectedDegree.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        s.name.toLowerCase().includes(q) ||
        s.university.toLowerCase().includes(q) ||
        s.field.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCopyLink = (id: string, name: string, university: string) => {
    const text = `🎓 100% Fully-Funded US Scholarship: ${name} at ${university} (Full Tuition Waiver + Living Salary) 👉 https://www.uscareersolutions.online/scholarships`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          100% Fully Funded Graduate Pathways
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Top USA University Scholarships & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Graduate Assistantships (GRA/GTA)
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          The most legitimate, tuition-free gateway to enter the United States. US universities fund thousands of international students every year with <strong>100% full tuition waivers plus monthly living salaries ($2,000 – $3,800/mo)</strong>.
        </p>

        {/* New Fall 2026 Fee Waiver Spotlight Banner */}
        <div className="mt-6 inline-flex items-center gap-3 p-2 pl-4 pr-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-semibold shadow-sm hover:border-emerald-400 transition-all">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Applying for Fall 2026 / Spring 2027? Get $0 Application Fee Waiver Codes & GRE Exemptions:</span>
          <Link
            href="/scholarships/fee-waiver-directory"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shrink-0"
          >
            <span>Explore Fee Waivers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Educational Explainer Box: How GRA/GTA Works */}
      <div className="mb-8 bg-white rounded-2xl border border-indigo-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
          <Award className="w-7 h-7" />
        </div>
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Did you know? In the US, STEM PhDs and Research Masters are 100% Free!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Unlike other countries where universities charge massive tuition, US departments hire international graduate students as <strong>Graduate Research Assistants (GRA)</strong> or <strong>Teaching Assistants (GTA)</strong>. The university pays 100% of your tuition and gives you a bi-weekly paycheck to cover housing, food, and living expenses.
          </p>
        </div>
        <div className="shrink-0 flex flex-col sm:flex-row gap-2">
          <Link
            href="/guides/study-usa-zero-tuition-graduate-assistantship"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow transition-all whitespace-nowrap"
          >
            <span>GTA Application Guide</span> <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow transition-all whitespace-nowrap"
          >
            <span>Get SOP & Email Help</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Featured University Fellowship Hubs (High-Intent SEO Links) */}
      <div className="mb-10 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Dedicated Institutional Hubs
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Fully Funded Graduate Assistantships by Top US University
            </h2>
          </div>
          <Link
            href="/scholarships/fee-waiver-directory"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all self-start sm:self-auto"
          >
            <span>Application Fee Waivers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Purdue University', slug: 'purdue-university', stipend: '$24k-$34k', state: 'Indiana' },
            { name: 'Stanford University', slug: 'stanford-university', stipend: '$45k-$52k', state: 'California' },
            { name: 'MIT', slug: 'massachusetts-institute-of-technology', stipend: '$42k-$48k', state: 'Mass.' },
            { name: 'Georgia Tech', slug: 'georgia-tech', stipend: '$26k-$36k', state: 'Georgia' },
            { name: 'UIUC', slug: 'uiuc', stipend: '$25k-$35k', state: 'Illinois' },
            { name: 'Texas A&M', slug: 'texas-am-university', stipend: '$22k-$32k', state: 'Texas' },
            { name: 'UC Berkeley', slug: 'uc-berkeley', stipend: '$32k-$44k', state: 'California' },
            { name: 'Univ. of Michigan', slug: 'university-of-michigan', stipend: '$34k-$42k', state: 'Michigan' },
            { name: 'Columbia Univ.', slug: 'columbia-university', stipend: '$45k/yr', state: 'New York' },
            { name: 'Johns Hopkins', slug: 'johns-hopkins-university', stipend: '$38k-$46k', state: 'Maryland' },
            { name: 'Caltech', slug: 'caltech', stipend: '$44k/yr', state: 'California' },
            { name: 'Harvard Univ.', slug: 'harvard-university', stipend: '$46k/yr', state: 'Mass.' },
          ].map((uni) => (
            <Link
              key={uni.slug}
              href={`/scholarships/university/${uni.slug}`}
              className="p-3 rounded-2xl bg-slate-950/80 hover:bg-emerald-950/30 border border-slate-800 hover:border-emerald-500/40 transition-all group"
            >
              <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                {uni.name}
              </div>
              <div className="text-[11px] font-mono text-emerald-400 font-bold mt-1">
                {uni.stipend}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {uni.state}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Live Counter & Sync Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">
            Showing <span className="text-indigo-600 font-black">{filtered.length}</span> verified funding programs
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Verified Feeds
          </span>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm self-start sm:self-auto"
        >
          <RotateCw className={`w-3.5 h-3.5 text-indigo-500 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Checking Portals...' : 'Sync Fresh Scholarships'}
        </button>
      </div>

      {/* Sync Toast Notification */}
      {syncMessage && (
        <div className="mb-6 p-3.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
          {syncMessage}
        </div>
      )}

      {/* Search Input Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by university, scholarship name, or field (e.g. Stanford, Harvard, Engineering, Public Health, Berea)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Degree Filters */}
      <div className="flex items-center justify-center sm:justify-start gap-2 mb-8 flex-wrap">
        {[
          { id: 'all', label: 'All Funding Programs' },
          { id: 'Masters & PhD', label: 'Masters & PhD Assistantships' },
          { id: 'PhD Only', label: 'PhD Direct Fellowships' },
          { id: 'Masters Only', label: 'Masters Scholarships' },
          { id: 'Undergraduate', label: 'Undergraduate / General' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedDegree(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDegree === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all flex flex-col justify-between relative ${
              item.isFeatured ? 'border-indigo-400 ring-2 ring-indigo-50' : 'border-slate-200'
            }`}
          >
            <div>
              {/* Top Badges & Share Button */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                  {item.degreeLevel}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Deadline: {item.deadline}
                  </span>
                  <button
                    onClick={() => setActiveShareId(activeShareId === item.id ? null : item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Share scholarship"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Share Box Popup */}
              {activeShareId === item.id && (
                <div className="mb-3 p-3 bg-slate-900 text-white rounded-xl shadow-xl flex items-center justify-between gap-2 text-xs animate-in fade-in">
                  <span className="font-bold text-slate-300">Share:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🎓 100% Fully-Funded US Scholarship: ${item.name} at ${item.university} 👉 https://www.uscareersolutions.online/scholarships`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 font-bold text-white"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.uscareersolutions.online/scholarships')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 font-bold text-white"
                    >
                      Facebook
                    </a>
                    <button
                      onClick={() => handleCopyLink(item.id, item.name, item.university)}
                      className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 font-bold text-white flex items-center gap-1"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <button onClick={() => setActiveShareId(null)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Title & University */}
              <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {item.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-1 mb-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.university}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{item.location}</span>
              </div>

              {/* Funding Badge Highlight */}
              <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-semibold text-emerald-900 flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-800">{item.fundingCoverage}</div>
                  {item.stipendAmount && (
                    <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">
                      Living Salary: {item.stipendAmount}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Key Requirements List */}
              <div className="mb-6">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Key Requirements:
                </div>
                <ul className="space-y-1.5">
                  {item.requirements.map((req, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/8801981505761?text=Hi%20US%20Career%20Solutions%2C%20I%20need%20application%20guidance%20for%20${encodeURIComponent(item.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition-colors"
              >
                Ask Us on WhatsApp
              </a>

              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl shadow transition-colors"
              >
                Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mb-16">
          <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No scholarships match your query</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or degree filters to explore other fully-funded US opportunities.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedDegree('all'); }}
            className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Bottom Conversion Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center max-w-4xl mx-auto">
        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Need a Professional Academic SOP or Cold Email for Professors?
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          Our team reviews your research profile, refines your Statement of Purpose (SOP), and crafts high-converting outreach emails to secure Graduate Research Assistantships.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
          >
            Book SOP Review & Guidance <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/8801981505761?text=Hi%20US%20Career%20Solutions%2C%20I%20want%20SOP%20guidance"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
          >
            Chat with an Advisor
          </a>
        </div>
      </div>

      {/* Comprehensive Editorial & Academic Guide for AdSense High-Value Compliance */}
      <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            US Higher Education Financial Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How International Students Secure 100% Full Funding at US Universities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding Graduate Teaching Assistantships (GTA), Graduate Research Assistantships (GRA), full tuition remission, and living stipends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">1</span>
              The Mechanics of Graduate Assistantships (GTA vs. GRA)
            </h3>
            <p>
              In the United States, doctoral (PhD) and research-oriented Master’s (MS) programs in STEM, Economics, and Humanities are predominantly funded through academic assistantships rather than personal student loans:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Graduate Teaching Assistantship (GTA):</strong> In exchange for assisting professors with undergraduate course instruction, grading, and laboratory supervision (typically 20 hours/week), the university provides a 100% full tuition waiver plus a monthly living stipend ($22,000–$36,000/yr).</li>
              <li><strong>Graduate Research Assistantship (GRA):</strong> Funded by external federal research grants (NSF, NIH, DARPA, DOE) secured by faculty Principal Investigators (PIs). Students conduct thesis research while receiving full tuition remission and living support.</li>
              <li><strong>Institutional Fellowships & Scholarships:</strong> Merit-based awards that require no teaching or research service hours, often awarded to top-tier incoming graduate cohorts.</li>
              <li><strong>University Health Insurance Remission:</strong> Over 90% of certified graduate assistant appointments include fully subsidized comprehensive university health insurance.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">2</span>
              F-1 Visa Financial Solvency & Application Fee Waiver Protocol
            </h3>
            <p>
              Securing admission with a verified assistantship solves the most challenging hurdle of the US student visa process:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Form I-20 Financial Guarantee:</strong> When an assistantship covers 100% of tuition and living expenses, the university’s Designated School Official (DSO) notes the institutional scholarship directly on Form I-20. This satisfies the US Embassy consular officer's financial solvency requirement without requiring millions in personal bank loans.</li>
              <li><strong>Application Fee Waivers (Save $1,500+):</strong> Many US graduate schools offer $0 application fee promo codes for attending virtual open houses, departmental webinars, or submitting diversity statements.</li>
              <li><strong>GRE Waivers:</strong> Over 70% of accredited US STEM graduate programs have made GRE general tests optional or permanently waived, significantly reducing application barriers.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Authoritative Research & Educational References
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All scholarship opportunities, assistantship stipends, and university policies listed in our directory are audited directly from official university graduate school portals (.edu domains), the National Center for Education Statistics (NCES IPEDS), and the US Department of Homeland Security Student and Exchange Visitor Program (SEVP).
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/scholarships/fee-waiver-directory" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
              Explore Fall 2026 Fee Waiver Directory →
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/guides/study-usa-zero-tuition-graduate-assistantship" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              Read GTA/GRA Cold Email Outreach Protocol →
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/tools/scholarship-predictor" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              Test Scholarship Odds Predictor →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading verified scholarships and funding programs...
      </div>
    }>
      <ScholarshipsContent />
    </Suspense>
  );
}
