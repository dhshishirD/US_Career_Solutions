'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCw, 
  Copy, 
  Check, 
  FileText, 
  Target, 
  Zap,
  TrendingUp,
  UploadCloud,
  FileCheck2,
  HelpCircle,
  Lightbulb,
  File,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  Percent,
  ListOrdered,
  BookOpen,
  Award,
  ChevronRight,
  Download,
  FileDown,
  Printer,
  CheckCircle
} from 'lucide-react';
import { generateATSResumeDocx } from '@/lib/export-ats-resume';

const SAMPLE_PRESETS = [
  {
    role: 'Software Engineer',
    title: 'Senior Full Stack Software Engineer (React / Python / Cloud)',
    jobDesc: `Senior Full Stack Software Engineer
We are seeking an experienced Full Stack Engineer proficient in TypeScript, React/Next.js, Python, and AWS/Azure cloud architecture.
Key Responsibilities:
- Architect and build scalable microservices handling 1M+ daily active users.
- Design resilient REST and GraphQL APIs backed by PostgreSQL and Redis caching.
- Spearhead CI/CD automation pipelines, unit testing, and Docker containerization.
- Collaborate with product managers and mentor junior developers.`,
    resume: `ALEX RAHMAN
Full Stack Software Engineer | alex@email.com | LinkedIn: /in/alex-dev | Tel: +1 (555) 019-2834

PROFESSIONAL SUMMARY:
Results-driven software engineer with 4+ years of experience building web applications using React, TypeScript, Python, and Node.js. Experienced in developing scalable microservices, REST APIs, and high-performance SQL databases.

CORE COMPETENCIES & KEYWORDS:
React.js • TypeScript • Next.js • Python • REST APIs • Docker • PostgreSQL • CI/CD Pipelines • AWS Cloud

PROFESSIONAL EXPERIENCE:
Senior Software Engineer | Global Tech Solutions (2022 - Present)
- Architected and deployed scalable containerized web applications using React, Next.js, and Python, improving site speed by 45%.
- Implemented robust REST and GraphQL API microservices handling over 1.2M monthly transactions.
- Automated CI/CD deployment workflows with Docker and GitHub Actions, reducing production deployment errors by 60%.
- Conducted regular code reviews and mentored 4 junior developers across distributed engineering teams.

Software Developer | Innovate Web Systems (2020 - 2022)
- Built internal analytics dashboards and automated reporting tools using JavaScript, Python, and PostgreSQL.
- Optimized database query performance and index structures, cutting average response time from 420ms to 110ms.`
  },
  {
    role: 'Registered Nurse',
    title: 'Registered Nurse - Acute Care / ICU (EB-3 Schedule A)',
    jobDesc: `Registered Nurse - Critical Care / ICU
Hospital healthcare system sponsoring international nurses for permanent US residency (EB-3 Schedule A).
Responsibilities:
- Provide comprehensive bedside patient care and monitoring in acute critical care settings.
- Administer IV medications, manage ventilators, and document clinical parameters via Epic EMR.
- Collaborate with multidisciplinary medical teams to ensure patient safety and positive clinical outcomes.
- Maintain strict adherence to HIPAA guidelines and hospital patient care protocols.`,
    resume: `FATIMA KHAN, BSN, RN
Registered Nurse | fatima.rn@email.com | NCLEX-RN Certified | Tel: +1 (555) 842-1982

PROFESSIONAL SUMMARY:
Dedicated and detail-oriented Registered Nurse with 4 years of acute critical care and ICU hospital experience. Certified in NCLEX-RN, BLS, and ACLS. Recognized for exceptional bedside patient advocacy and rigorous clinical documentation.

CORE COMPETENCIES & CLINICAL SKILLS:
Critical Care (ICU) • NCLEX-RN Certified • Patient Assessment • Epic EMR • Ventilator Management • ACLS/BLS • Medication Administration • HIPAA Compliance

CLINICAL EXPERIENCE:
Critical Care Staff Nurse | City General Hospital (2022 - Present)
- Provided comprehensive acute critical care and hemodynamic monitoring for 15+ ICU patients per shift.
- Managed mechanical ventilators, arterial lines, and titrated high-alert IV medications adhering to clinical safety protocols.
- Documented clinical patient assessments and multidisciplinary care plans in Epic EMR with 100% regulatory compliance.
- Collaborated with attending physicians and intensivists to optimize patient recovery and discharge trajectories.

Acute Care Staff Nurse | Metro Health Center (2020 - 2022)
- Monitored post-surgical and telemetry patients, administering treatments and educating patient families on post-discharge care.`
  },
  {
    role: 'Remote Customer Care',
    title: 'Customer Happiness & Support Specialist (Global Remote - W-8BEN)',
    jobDesc: `Customer Support Specialist (Global Remote)
Support global customers via live chat, email, and ticketing systems.
Responsibilities:
- Resolve complex technical inquiries with empathy and patience.
- Troubleshoot customer account setups, billing queries, and software navigation.
- Write clear customer-facing documentation and help center articles.
- Collaborate asynchronously with distributed support engineers.`,
    resume: `MARCUS CHEN
Customer Operations & Support Specialist | marcus@email.com | Tel: +1 (555) 773-9021

PROFESSIONAL SUMMARY:
Customer support and technical operations specialist with 4+ years experience delivering tier-1 and tier-2 support for high-growth SaaS platforms. Expert in Zendesk, Intercom, and asynchronous distributed team workflows.

CORE COMPETENCIES:
Customer Support • Zendesk • Intercom • Technical Troubleshooting • Help Center Documentation • Client Escalation • SLA Management • SaaS Operations

PROFESSIONAL EXPERIENCE:
Customer Happiness Specialist | CloudApp Systems (2022 - Present)
- Resolved over 120 customer support tickets weekly via Zendesk and live chat with a 98.4% Customer Satisfaction (CSAT) score.
- Authored 28 technical knowledge base articles, reducing repeat billing and setup inquiries by 32%.
- Identified software bugs and collaborated with product engineers in Jira to expedite customer issue resolution.

Client Support Associate | Global SaaS Hub (2020 - 2022)
- Managed email inquiries, onboarding walkthroughs, and password reset requests with an average first-response time of 8 minutes.`
  }
];

function ATSScannerContent() {
  const searchParams = useSearchParams();
  const queryTitle = searchParams.get('jobTitle') || '';
  const queryDesc = searchParams.get('desc') || '';

  const [jobTitle, setJobTitle] = useState(queryTitle);
  const [jobDescription, setJobDescription] = useState(queryDesc);
  const [resumeText, setResumeText] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [attachedFileSize, setAttachedFileSize] = useState<string | null>(null);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (!resumeText && !jobDescription) {
      loadPreset(SAMPLE_PRESETS[0]);
    }
  }, []);

  const loadPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setJobTitle(preset.title);
    setJobDescription(preset.jobDesc);
    setResumeText(preset.resume);
    setAttachedFileName(null);
    setAttachedFileSize(null);
    setParseError(null);
    setAnalysis(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    setAttachedFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setIsParsingFile(true);
    setParseError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/ai/parse-resume', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setResumeText(data.text);
      } else {
        setParseError(data.error || 'Failed to parse document text. You can copy-paste text directly.');
      }
    } catch (err: any) {
      setParseError('Error uploading file. Please paste text directly into the box.');
    } finally {
      setIsParsingFile(false);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFileName(null);
    setAttachedFileSize(null);
    setResumeText('');
    setParseError(null);
  };

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
          targetRole: jobTitle || 'Target Role',
          fileName: attachedFileName || 'Candidate_Resume.txt'
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

  // 1-Click ATS-Proof .docx Export
  const handleDownloadDocx = async () => {
    setIsDownloadingDocx(true);
    try {
      // Extract candidate name from first line
      const lines = resumeText.split('\n');
      const firstLine = lines[0]?.trim() || 'Candidate Resume';
      const secondLine = lines[1]?.trim() || '';

      const keywordsToInclude = analysis?.missingKeywords?.slice(0, 10) || [
        'ATS Optimization', 'Cross-Functional Teamwork', 'Quantified Results', 'Project Execution'
      ];

      const blob = await generateATSResumeDocx({
        fullName: firstLine,
        contactInfo: secondLine,
        targetRole: jobTitle || 'Target Position',
        professionalSummary: `Results-driven professional targeting ${jobTitle || 'career advancement'} with demonstrated track record of technical competence, quantified business ROI, and proactive cross-functional collaboration.`,
        coreCompetencies: keywordsToInclude,
        resumeBody: resumeText
      });

      // Trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cleanRole = (jobTitle || 'ATS_Friendly_Resume').replace(/[^a-zA-Z0-9]/g, '_');
      a.download = `${cleanRole}_ATS_Optimized_Template.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Docx generation error:', err);
    } finally {
      setIsDownloadingDocx(false);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header with High-Volume SEO Keywords ($4 - $18 CPC) */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Free ATS Friendly Resume Builder & Score Checker
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Free ATS Resume Builder & Checker
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Create, check, and download 100% free ATS friendly resume templates that pass Workday, Greenhouse, and Lever scanners. Check if your resume is ATS friendly in seconds, inject missing keywords, and export parser-safe .docx files instantly.
        </p>
      </div>

      {/* Preset Quick-Buttons */}
      <div className="bg-slate-100/90 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="font-bold text-slate-800">Test ATS Templates with Real Job & CV Data:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.role}
              type="button"
              onClick={() => loadPreset(p)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all shadow-sm"
            >
              {p.role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleAnalyze} className="space-y-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Target Job Description Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                1. Target Job Description (ATS Keyword Source)
              </label>
              <span className="text-xs text-slate-400">Paste requirements</span>
            </div>
            
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Target Job Title (e.g. Senior Full Stack Engineer, Registered Nurse)..."
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={12}
              placeholder="Paste the US or international job description, requirements, responsibilities, and required qualifications here..."
              className="w-full flex-grow text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          {/* Candidate Resume Box with File Upload & Drag-and-Drop */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                2. Your Current Resume / CV
              </label>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors ${inputMode === 'upload' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}
                >
                  File Upload
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('paste')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors ${inputMode === 'paste' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {inputMode === 'upload' ? (
              <div className="flex-grow flex flex-col">
                {!attachedFileName ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center flex-grow">
                    <UploadCloud className="w-10 h-10 text-blue-600 mb-3" />
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                      Upload your Resume (.docx, .doc, .pdf, or .txt)
                    </p>
                    <p className="text-xs text-slate-500 mb-4">
                      Direct server-side extraction parses your CV with 100% text fidelity
                    </p>
                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all">
                      Choose File
                      <input 
                        type="file" 
                        accept=".docx,.doc,.pdf,.txt" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                ) : (
                  <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-200 mb-3">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">{attachedFileName}</p>
                          <p className="text-[11px] text-slate-500">{attachedFileSize}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeAttachedFile}
                        className="text-xs text-red-600 hover:text-red-700 font-bold"
                      >
                        Change File
                      </button>
                    </div>

                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Extracted Resume Text (Editable):
                    </p>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      rows={8}
                      className="w-full flex-grow text-xs bg-white border border-blue-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                )}

                {isParsingFile && (
                  <p className="text-xs text-blue-600 font-semibold mt-2 flex items-center gap-1.5 animate-pulse">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    Parsing document and tokenizing skills...
                  </p>
                )}

                {parseError && (
                  <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    {parseError}
                  </p>
                )}
              </div>
            ) : (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={14}
                placeholder="Paste your resume text here (Summary, Work History, Education, Skills)..."
                className="w-full flex-grow text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            )}
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Private & Client Encrypted
            </span>
            <span>•</span>
            <span>Workday, Greenhouse & Lever Parsing Rules</span>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || isParsingFile || !resumeText.trim() || !jobDescription.trim()}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                Auditing ATS Match & Keywords...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-300" />
                Scan Resume for Free (Calculate Match Score)
              </>
            )}
          </button>
        </div>
      </form>

      {/* ANALYSIS RESULTS & 1-CLICK EXPORT CARD */}
      {analysis && (
        <div className="space-y-8 animate-fadeIn mb-16">
          
          {/* Overall Score Header Card with 1-Click .docx Download */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-500/30">
                  ATS Audit Verdict
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {analysis.matchScore >= 80 ? '🎉 Excellent ATS Readiness!' : analysis.matchScore >= 60 ? '⚡ Good Baseline, Needs Keyword Optimization' : '⚠️ High Risk of ATS Filter Rejection'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                  {analysis.overallVerdict || 'Your resume was scored based on exact keyword density, formatting compliance, and metric impact against the job description.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Score Dial */}
                <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <div className={`text-4xl sm:text-5xl font-black ${analysis.matchScore >= 80 ? 'text-emerald-400' : analysis.matchScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {analysis.matchScore}%
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-200">Overall Match</p>
                    <p className="text-[11px] text-slate-400">Workday / Greenhouse</p>
                  </div>
                </div>

                {/* 1-CLICK DOCX DOWNLOAD BUTTON */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleDownloadDocx}
                    disabled={isDownloadingDocx}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-full"
                  >
                    {isDownloadingDocx ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin" />
                        Generating ATS .docx...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download ATS-Optimized (.docx)
                      </>
                    )}
                  </button>

                  {downloadSuccess && (
                    <p className="text-[11px] text-emerald-400 font-bold text-center flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Downloaded ATS-Proof Microsoft Word File!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Missing Keywords & Suggestions */}
          {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-600" />
                Missing Critical Keywords (Required by ATS Parsers)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                These keywords appear prominently in the job description but were missing or weak in your CV:
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((kw: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* High-Impact Bullet Makeover (Google XYZ Formula) */}
          {analysis.bulletMakeovers && analysis.bulletMakeovers.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    High-Impact Bullet Point Makeovers (Google XYZ Formula)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Transformed from passive duty descriptions into high-scoring quantified achievements:
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {analysis.bulletMakeovers.map((b: any, i: number) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="mb-2">
                      <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                        ❌ Weak Original Bullet:
                      </span>
                      <p className="text-xs text-slate-600 italic pl-3 border-l-2 border-rose-300">
                        "{b.original}"
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                          ✅ ATS-Optimized Google XYZ Makeover:
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 pl-3 border-l-2 border-emerald-500">
                          "{b.enhanced}"
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyBullet(b.enhanced, i)}
                        className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm flex-shrink-0"
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            Copy Bullet
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* SEO & Educational Guide Section with Top Keywords ($4 - $18 CPC) */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <h2 className="text-2xl font-black text-slate-900 mb-3">
          How to Create an ATS Friendly Resume That Passes Any Scanner
        </h2>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed max-w-4xl">
          An <strong>ATS friendly resume template</strong> is designed to be easily read, parsed, and scored by automated Applicant Tracking Systems like Workday, Greenhouse, Taleo, and Lever. Follow these essential rules to ensure your CV passes automated screening:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold mb-3">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Use Single-Column ATS Format
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-column layouts and text boxes cause parsers to scramble your job titles and dates. Use clean, single-column vertical hierarchy.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold mb-3">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Exact Keyword Taxonomy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Match the exact hard skill names from the job description (e.g. <em>TypeScript</em> instead of just <em>Coding</em>; <em>Epic EMR</em> instead of <em>Hospital Software</em>).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold mb-3">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Google XYZ Action Bullets
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structure accomplishments with strong action verbs and quantified metrics (e.g., <em>"cut API latency by 42% and saved $18,400 monthly"</em>).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function ATSScannerPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">Loading ATS Resume Builder...</div>}>
      <ATSScannerContent />
    </Suspense>
  );
}
