'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  RotateCw, 
  Linkedin, 
  Mail, 
  MessageSquare, 
  Sparkles,
  GraduationCap,
  Briefcase,
  Lightbulb
} from 'lucide-react';

export default function OutreachGenPage() {
  const [candidateName, setCandidateName] = useState('Alex Rahman');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Software Engineer');
  const [companyName, setCompanyName] = useState('Microsoft');
  const [recruiterName, setRecruiterName] = useState('Sarah Jenkins');
  const [keyStrengths, setKeyStrengths] = useState('TypeScript, Next.js, distributed cloud architecture, and high-performance microservices');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeChannel, setActiveChannel] = useState<'linkedin' | 'email' | 'pitch' | 'followup' | 'professor'>('linkedin');

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName,
          targetRole,
          companyName,
          recruiterName,
          keyStrengths
        })
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    handleGenerate();
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Send className="w-3.5 h-3.5 text-indigo-600" />
          US Recruiter & Professor Outreach Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Recruiter & Hiring Manager Outreach Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Over 60% of US positions and funded university assistantships are won through targeted direct outreach. Generate high-converting cold messages for LinkedIn, Email, Hiring Managers, and University Professors in seconds.
        </p>
      </div>

      {/* Grid: Form + Generated Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm h-fit">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Candidate & Target Details
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Alex Rahman"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Company / University
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Microsoft / Purdue"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recruiter / Professor Name
                </label>
                <input
                  type="text"
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins / Dr. Smith"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Role or Position
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer / Graduate Assistant"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Key Strengths & Skills (Value Proposition)
              </label>
              <textarea
                value={keyStrengths}
                onChange={(e) => setKeyStrengths(e.target.value)}
                rows={4}
                placeholder="Mention 2-3 core skills or achievements (e.g. React/TypeScript, AWS cloud, reducing API latency by 40%)..."
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  Generating Tailored Messages...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate All Outreach Templates
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Previews (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Channel Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveChannel('linkedin')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeChannel === 'linkedin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn Note (&lt;300 chars)
            </button>

            <button
              onClick={() => setActiveChannel('email')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeChannel === 'email'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Executive Cold Email
            </button>

            <button
              onClick={() => setActiveChannel('pitch')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeChannel === 'pitch'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Hiring Manager Pitch
            </button>

            <button
              onClick={() => setActiveChannel('followup')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeChannel === 'followup'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              5-Day Follow-Up
            </button>

            <button
              onClick={() => setActiveChannel('professor')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeChannel === 'professor'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Professor Assistantship (GRA)
            </button>
          </div>

          {/* Active Channel Display Card */}
          {result && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative animate-in fade-in duration-200">
              
              {activeChannel === 'linkedin' && (
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        LinkedIn Connection Invitation
                      </h3>
                      <span className="text-xs text-slate-500">
                        Optimized under 300 characters for high connection acceptance
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(result.linkedInConnectionNote, 'linkedin')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {copiedKey === 'linkedin' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Note
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 leading-relaxed font-mono">
                    {result.linkedInConnectionNote}
                  </div>
                  <div className="mt-3 text-right text-[11px] text-slate-400">
                    Character Count: {result.linkedInConnectionNote.length} / 300 limit
                  </div>
                </div>
              )}

              {activeChannel === 'email' && (
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        Full Executive Cold Email
                      </h3>
                      <span className="text-xs text-slate-500">
                        Formal introductory note for recruiters and talent acquisition leads
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(result.coldEmailBody, 'email')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {copiedKey === 'email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Email
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-wrap font-mono">
                    {result.coldEmailBody}
                  </div>
                </div>
              )}

              {activeChannel === 'pitch' && (
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-emerald-600" />
                        Direct Hiring Manager Pitch
                      </h3>
                      <span className="text-xs text-slate-500">
                        Direct ROI-oriented message for engineering managers & team leads
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(result.hiringManagerPitch, 'pitch')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {copiedKey === 'pitch' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Pitch
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-wrap font-mono">
                    {result.hiringManagerPitch}
                  </div>
                </div>
              )}

              {activeChannel === 'followup' && (
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-600" />
                        5-Day Post-Application Follow-Up
                      </h3>
                      <span className="text-xs text-slate-500">
                        Polite nudge to ensure your application gets prioritized
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(result.followUpMessage, 'followup')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {copiedKey === 'followup' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Follow-Up
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-wrap font-mono">
                    {result.followUpMessage}
                  </div>
                </div>
              )}

              {activeChannel === 'professor' && (
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        Professor Cold Email (GRA / GTA Full Funding)
                      </h3>
                      <span className="text-xs text-slate-500">
                        Proven academic inquiry for research grants, tuition waivers, and living stipends
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(result.professorColdEmail, 'professor')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {copiedKey === 'professor' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Email
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-wrap font-mono">
                    {result.professorColdEmail}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
