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
  ChevronUp
} from 'lucide-react';
import { 
  INTERVIEW_QUESTIONS, 
  GLOSSARY_TERMS, 
  COLD_EMAIL_TEMPLATES, 
  InterviewQuestion 
} from '@/lib/academy-data';
import AntiScamBanner from '@/components/AntiScamBanner';

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<'interview' | 'glossary' | 'emails'>('interview');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(INTERVIEW_QUESTIONS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [glossarySearch, setGlossarySearch] = useState('');

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          US Career Academy & Interview Preparation
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Master US Job Interviews & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Visa Pathways in Plain English
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Learn the exact formulas to ace behavioral interviews with US hiring managers, understand visa regulations, and copy high-converting outreach templates for scholarships and remote roles.
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        {[
          { id: 'interview', label: '🎯 Behavioral Interview Simulator (STAR Method)', icon: MessageSquare },
          { id: 'glossary', label: '📖 Plain-English Visa Glossary', icon: HelpCircle },
          { id: 'emails', label: '✉️ Professor & Recruiter Email Templates', icon: Copy }
        ].map(tab => {
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
                      
                      {/* STAR Formula Breakdown Grid */}
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                          The STAR Formula Architecture:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <strong className="text-indigo-600 block mb-1">S — Situation:</strong>
                            <span className="text-slate-700">{item.starFormula.situation}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <strong className="text-blue-600 block mb-1">T — Task:</strong>
                            <span className="text-slate-700">{item.starFormula.task}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <strong className="text-amber-600 block mb-1">A — Action:</strong>
                            <span className="text-slate-700">{item.starFormula.action}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <strong className="text-emerald-600 block mb-1">R — Result:</strong>
                            <span className="text-slate-700">{item.starFormula.result}</span>
                          </div>
                        </div>
                      </div>

                      {/* Sample Winning Spoken Script */}
                      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Sample High-Scoring Response:
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-950 italic leading-relaxed">
                          "{item.sampleWinningAnswer}"
                        </p>
                      </div>

                      {/* Pro Tip */}
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div><strong>Pro Tip for International Candidates:</strong> {item.proTip}</div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Plain-English Visa Glossary */}
      {activeTab === 'glossary' && (
        <div className="space-y-6 max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Search visa term (e.g. Cap-Exempt, W-8BEN, Green Card)..."
              className="w-full text-xs sm:text-sm bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-5">
            {filteredGlossary.map((term) => (
              <div
                key={term.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {term.term}
                  </h3>
                  <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    {term.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                  <strong>What it means:</strong> {term.plainEnglishExplanation}
                </p>

                <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950">
                  <strong>Why it matters to you:</strong> {term.whyItMattersToYou}
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  <strong>Real example:</strong> {term.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Cold Email Templates */}
      {activeTab === 'emails' && (
        <div className="space-y-6 max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 gap-6">
            {COLD_EMAIL_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      {tmpl.targetAudience}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                      Subject: <span className="font-mono text-sm text-indigo-700 font-normal">{tmpl.subjectLine}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      <strong>When to send:</strong> {tmpl.whenToUse}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(tmpl.id, `Subject: ${tmpl.subjectLine}\n\n${tmpl.body}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all shrink-0"
                  >
                    {copiedId === tmpl.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Template</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800">
                  {tmpl.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 1-on-1 Practice CTA Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/80 px-3 py-1 rounded-full border border-indigo-700">
            ★ Live Mock Interview Practice
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Want 1-on-1 US Interview Practice & Resume Review?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Practice your answers with our career specialist in a private video call before speaking to American hiring managers.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20would%20like%20to%20book%20a%20Mock%20Interview%20practice%20session"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm shadow transition-all"
          >
            Book via WhatsApp (+880 1981-505761)
          </a>
          <Link
            href="/services"
            className="text-center px-5 py-3 rounded-xl bg-white text-indigo-950 font-bold text-xs sm:text-sm shadow transition-all hover:bg-slate-100"
          >
            View Packages ($29 USD)
          </Link>
        </div>
      </div>

    </div>
  );
}
