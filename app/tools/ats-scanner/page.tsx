'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RotateCw, 
  Copy, 
  Check, 
  FileText, 
  Target, 
  Zap,
  TrendingUp
} from 'lucide-react';
import { ATSAnalysisResult } from '@/lib/types';

function ATSScannerContent() {
  const searchParams = useSearchParams();
  const queryTitle = searchParams.get('jobTitle') || '';
  const queryCompany = searchParams.get('company') || '';
  const queryDesc = searchParams.get('desc') || '';

  const [jobTitle, setJobTitle] = useState(queryTitle);
  const [jobDescription, setJobDescription] = useState(queryDesc);
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Set default sample if empty to allow instant 1-click test
  useEffect(() => {
    if (!resumeText) {
      setResumeText(`JOHN DOE
Full Stack Software Engineer | johndoe@email.com | LinkedIn: /in/johndoe

SUMMARY:
Results-driven software engineer with 4+ years of experience building web applications using React, TypeScript, Python, and Node.js. Experienced in developing REST APIs, microservices, and working with SQL databases.

PROFESSIONAL EXPERIENCE:
Software Engineer | Global Tech Solutions (2022 - Present)
- Worked on web applications and fixed bugs for the engineering team.
- Developed frontend UI components using React and styled them with CSS.
- Responsible for database management and system updates with PostgreSQL.
- Assisted with team code reviews and participated in sprint meetings.

Junior Developer | Innovate Web Systems (2020 - 2022)
- Built internal dashboard tools using JavaScript and Python scripts.
- Maintained RESTful APIs and performed unit testing for new features.`);
    }

    if (!jobDescription && !queryDesc) {
      setJobDescription(`Senior Full Stack Software Engineer
We are seeking an experienced Full Stack Engineer proficient in TypeScript, React/Next.js, and Python.
Responsibilities:
- Architect, build, and optimize scalable cloud applications on AWS or Azure.
- Lead system design discussions and collaborate cross-functionally with product managers.
- Improve CI/CD deployment pipelines, automated tests, and Docker containerization.
- Mentor junior engineers and champion code quality standards.`);
    }
  }, [queryDesc]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          targetRole: jobTitle || 'Target Role'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          AI Career Care Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI ATS Resume Tailorer & Match Score
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          US Applicant Tracking Systems (Workday, Greenhouse, Taleo) automatically filter out up to 75% of international resumes before a human recruiter ever sees them. Paste your CV and job description to optimize your application instantly.
        </p>
      </div>

      {/* Input Form Grid */}
      <form onSubmit={handleAnalyze} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        
        {/* Left Col: Target Job Description */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Target Job Details
              </label>
              {queryCompany && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                  {queryCompany}
                </span>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Target Job Title (e.g. Senior Software Engineer)"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Paste US Job Description:
            </label>
            <textarea
              rows={11}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job requirements and responsibilities here..."
              className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Right Col: Candidate Resume */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                Your Current Resume / CV
              </label>
              <span className="text-xs text-slate-400">
                Text or Markdown format
              </span>
            </div>

            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Paste Your Work Experience & Skills:
            </label>
            <textarea
              rows={14}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume contents here..."
              className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
            />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {resumeText.split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  Auditing with ATS Intelligence...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze & Tailor Resume
                </>
              )}
            </button>
          </div>
        </div>

      </form>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-2xl ${
                analysis.matchScore >= 80 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : analysis.matchScore >= 60 
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <span>{analysis.matchScore}%</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider">ATS Match</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {analysis.matchScore >= 80 ? 'Strong Candidate Fit' : analysis.matchScore >= 60 ? 'Moderate Alignment' : 'Needs Optimization'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Target threshold for top US recruiter screening: <strong>75%+</strong>
                </p>
              </div>
            </div>

            {/* Keyword Match summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Matched Keywords ({analysis.matchedKeywords.length})
              </span>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {analysis.matchedKeywords.map((kw, i) => (
                  <span key={i} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-medium">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded">
                Missing High-Value Keywords ({analysis.missingKeywords.length})
              </span>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {analysis.missingKeywords.map((kw, i) => (
                  <span key={i} className="text-xs bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded-md font-medium">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Executive Assessment */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Executive Fit Assessment
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {analysis.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Strong Profiles Elements
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {analysis.strengthPoints.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Critical Areas to Upgrade
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {analysis.weaknessPoints.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Rewritten Bullet Points */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900">
                US Action-Verb & Metric Rewrites
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Replace passive descriptions with high-impact power formulations designed to impress US hiring managers.
            </p>

            <div className="space-y-4">
              {analysis.rewrittenBullets.map((bullet, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="text-xs text-slate-400 mb-1 line-through">
                    Original: "{bullet.original}"
                  </div>
                  <div className="text-sm font-semibold text-slate-900 bg-white p-3 rounded-lg border border-emerald-200 mt-2 flex items-start justify-between gap-3">
                    <span className="text-emerald-950">
                      ✨ {bullet.improved}
                    </span>
                    <button
                      onClick={() => copyBullet(bullet.improved, idx)}
                      className="shrink-0 p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 mt-2 italic">
                    Why: {bullet.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default function ATSScannerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading ATS Analyzer...</div>}>
      <ATSScannerContent />
    </Suspense>
  );
}
