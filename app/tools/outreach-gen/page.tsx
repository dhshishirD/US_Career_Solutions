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
  Sparkles 
} from 'lucide-react';
import { OutreachMessageResult } from '@/lib/types';

export default function OutreachGenPage() {
  const [candidateName, setCandidateName] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer');
  const [companyName, setCompanyName] = useState('Microsoft');
  const [recruiterName, setRecruiterName] = useState('Sarah Jenkins');
  const [keyStrengths, setKeyStrengths] = useState('Next.js, cloud systems, and building high-traffic consumer web applications');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<OutreachMessageResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
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
          US Recruiter Conversion Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Recruiter & Hiring Manager Outreach Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Over 60% of US positions are filled through referrals and direct networking. Generate high-converting, professional cold messages for LinkedIn and Email in seconds.
        </p>
      </div>

      {/* Grid: Form + Generated Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Target Contact & Role Details
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Cloud Architect"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Company
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google, Amazon"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Recruiter or Hiring Manager Name (Optional)
              </label>
              <input
                type="text"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                placeholder="e.g. Sarah Jenkins or Talent Acquisition Team"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your 2-3 Core Superpowers / Relevant Tech
              </label>
              <textarea
                rows={3}
                value={keyStrengths}
                onChange={(e) => setKeyStrengths(e.target.value)}
                placeholder="e.g. Python, distributed systems, and cutting infrastructure costs by 30%"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  Drafting Custom Messages...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Outreach Kit
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Messages Preview */}
        <div className="space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* LinkedIn Note */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      LinkedIn Connection Request Note (Under 300 chars)
                    </h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.linkedInConnectionNote, 'linkedin')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'linkedin' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-slate-700 font-mono bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                  {result.linkedInConnectionNote}
                </p>
              </div>

              {/* Full Cold Email */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Direct Recruiter Cold Email
                    </h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`Subject: ${result.subject}\n\n${result.coldEmailBody}`, 'email')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'email' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="mt-3 text-xs text-slate-500 font-semibold">
                  Subject: <span className="text-slate-800">{result.subject}</span>
                </div>

                <pre className="mt-3 text-xs sm:text-sm text-slate-700 font-sans whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                  {result.coldEmailBody}
                </pre>
              </div>

              {/* 5-Day Follow-Up */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      5-Day Polite Follow-Up Note
                    </h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.followUpMessage, 'followup')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'followup' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'followup' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-slate-700 font-mono bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                  {result.followUpMessage}
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
              <Send className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">Ready to craft your outreach</h3>
              <p className="text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                Fill in the target role and company on the left to generate your custom LinkedIn and email outreach scripts.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
