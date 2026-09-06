'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  MessageSquare, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lightbulb, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrendingUp,
  Building2,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { 
  INTERVIEW_QUESTIONS, 
  GLOSSARY_TERMS, 
  COLD_EMAIL_TEMPLATES, 
  US_SALARY_BENCHMARKS,
  InterviewQuestion,
  SalaryBenchmark 
} from '@/lib/academy-data';
import AntiScamBanner from '@/components/AntiScamBanner';

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<'interview' | 'salaries' | 'glossary' | 'emails'>('interview');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(INTERVIEW_QUESTIONS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [salaryCategoryFilter, setSalaryCategoryFilter] = useState('all');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredGlossary = GLOSSARY_TERMS.filter(item => {
    if (!glossarySearch.trim()) return true;
    const q = glossarySearch.toLowerCase();
    return item.term.toLowerCase().includes(q) || 
           item.plainEnglishExplanation.toLowerCase().includes(q) ||
           item.whyItMattersToYou.toLowerCase().includes(q);
  });

  const filteredSalaries = US_SALARY_BENCHMARKS.filter(item => {
    if (salaryCategoryFilter === 'all') return true;
    return item.category.toLowerCase().includes(salaryCategoryFilter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          US Career Intelligence & Interview Academy
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Master US Job Interviews, Salaries & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Visa Pathways in Plain English
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Reverse-engineering American hiring practices, Department of Labor prevailing wage standards, behavioral STAR interview strategies, and verified visa pathways.
        </p>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {[
          { id: 'interview', label: 'STAR Interview Academy', icon: HelpCircle },
          { id: 'salaries', label: 'US Prevailing Wage & Salaries', icon: DollarSign },
          { id: 'glossary', label: 'US Visa Glossary (A-Z)', icon: BookOpen },
          { id: 'emails', label: 'Executive Cold Outreach Pitches', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* AntiScam Banner */}
      <AntiScamBanner />

      {/* TAB 1: Behavioral Interview Simulator */}
      {activeTab === 'interview' && (
        <div className="space-y-6 max-w-4xl mx-auto mb-16">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-xs sm:text-sm text-indigo-900 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-indigo-600 shrink-0" />
            <div>
              <strong>How US Recruiters Grade Candidates:</strong> In American job interviews, recruiters use the <strong>STAR method</strong> (Situation, Task, Action, Result). They look for quantifiable metrics ($ savings, % improvement) and proactive communication.
            </div>
          </div>

          <div className="space-y-4">
            {INTERVIEW_QUESTIONS.map((item) => {
              const isExpanded = expandedQuestion === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm ${
                    isExpanded ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedQuestion(isExpanded ? null : item.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                        {item.question}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        <strong>Why they ask:</strong> {item.whyRecruitersAsk}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5">
                      {/* STAR Formula Breakdown */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          The STAR Formula Breakdown
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                            <span className="font-extrabold text-blue-600 block mb-0.5">S - Situation:</span>
                            <span className="text-slate-600">{item.starFormula.situation}</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                            <span className="font-extrabold text-indigo-600 block mb-0.5">T - Task:</span>
                            <span className="text-slate-600">{item.starFormula.task}</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                            <span className="font-extrabold text-amber-600 block mb-0.5">A - Action:</span>
                            <span className="text-slate-600">{item.starFormula.action}</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                            <span className="font-extrabold text-emerald-600 block mb-0.5">R - Result:</span>
                            <span className="text-slate-600">{item.starFormula.result}</span>
                          </div>
                        </div>
                      </div>

                      {/* Model Answering Script */}
                      <div className="relative bg-indigo-950 text-white p-5 rounded-xl border border-indigo-900 shadow-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Exact Model Answering Script:
                          </span>
                          <button
                            onClick={() => handleCopy(item.id, item.sampleWinningAnswer)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold bg-indigo-800 hover:bg-indigo-700 text-white px-2.5 py-1 rounded-md transition-colors"
                          >
                            {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copiedId === item.id ? 'Copied' : 'Copy Script'}
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                          "{item.sampleWinningAnswer}"
                        </p>
                      </div>

                      {/* Insider Pro Tip */}
                      <div className="text-xs bg-amber-50 text-amber-900 border border-amber-200 p-3 rounded-xl flex items-start gap-2">
                        <span className="font-extrabold shrink-0">💡 PRO TIP:</span>
                        <span>{item.proTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: US Salary & Prevailing Wage Transparency (Glassdoor-Style) */}
      {activeTab === 'salaries' && (
        <div className="space-y-6 max-w-5xl mx-auto mb-16">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-xs sm:text-sm text-emerald-900 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <strong>US Department of Labor Prevailing Wage Transparency:</strong> Under US federal law (INA § 212(n)), US companies sponsoring H-1B, EB-3, or Cap-Exempt visas are legally forbidden from paying foreign workers less than the certified prevailing wage for their geographic area.
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Career Fields' },
              { id: 'Software', label: 'Tech & Cloud' },
              { id: 'Healthcare', label: 'Healthcare & Nursing' },
              { id: 'Data', label: 'Data & AI' },
              { id: 'Virtual', label: 'Virtual Operations' },
              { id: 'Research', label: 'Cap-Exempt Research' },
              { id: 'University', label: 'Graduate Assistantships' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSalaryCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  salaryCategoryFilter === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Salary Benchmarks Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSalaries.map((sal) => (
              <div
                key={sal.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      {sal.category}
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      Sponsor Demand: {sal.h1bSponsorDemand}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-4">
                    {sal.role}
                  </h3>

                  <div className="space-y-2.5 mb-4">
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                        US National Average Salary:
                      </span>
                      <span className="text-base font-black text-emerald-700">
                        {sal.usAverageSalary}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Certified DOL Prevailing Wage (Level 2):
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {sal.dolPrevailingWageLevel2}
                      </span>
                    </div>

                    <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                        Global Remote (W-8BEN Contractor Rate):
                      </span>
                      <span className="text-sm font-bold text-blue-700">
                        {sal.globalRemoteW8BenRate}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {sal.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {sal.topPayingStates}
                  </span>
                  <Link
                    href="/jobs"
                    className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    View Openings <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Visa Glossary (A-Z) */}
      {activeTab === 'glossary' && (
        <div className="space-y-6 max-w-4xl mx-auto mb-16">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search immigration terms (e.g., Cap-Exempt, Schedule A, STEM OPT, W-8BEN)..."
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredGlossary.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.term}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  <strong>What it means:</strong> {item.plainEnglishExplanation}
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  <strong className="text-slate-900 block mb-1">Why it matters to you:</strong>
                  {item.whyItMattersToYou}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Cold Email & Outreach Templates */}
      {activeTab === 'emails' && (
        <div className="space-y-6 max-w-4xl mx-auto mb-16">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-xs sm:text-sm text-blue-900 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <strong>Why Direct Pitching Beats Job Boards:</strong> Over 60% of high-paying US remote contracts and university research assistantships are never posted publicly. Use these proven high-converting pitch scripts to contact founders and professors directly.
            </div>
          </div>

          <div className="space-y-6">
            {COLD_EMAIL_TEMPLATES.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    Target: {item.targetAudience}
                  </span>
                  <span className="text-xs text-slate-500 italic">
                    {item.whenToUse}
                  </span>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-4 mb-4">
                  <div className="text-xs text-slate-400 mb-1 font-mono">
                    Subject Line:
                  </div>
                  <div className="font-bold text-sm text-amber-300">
                    {item.subjectLine}
                  </div>
                </div>

                <div className="relative bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed mb-4">
                  {item.body}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleCopy(item.id, `${item.subjectLine}\n\n${item.body}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === item.id ? 'Copied to Clipboard' : 'Copy Pitch Script'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center max-w-4xl mx-auto">
        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Want Personal Mock Interview or SOP Review?
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          Book a 1-on-1 session with our US career specialists for full resume overhaul, mock video interviews, and personalized immigration strategy.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
          >
            Explore 1-on-1 Guidance <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/8801981505761?text=Hi%20US%20Career%20Solutions%2C%20I%20need%20interview%20guidance"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
}
