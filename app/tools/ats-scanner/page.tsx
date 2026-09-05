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
  ChevronRight
} from 'lucide-react';

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
Full Stack Software Engineer | alex@email.com | LinkedIn: /in/alex-dev

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
- Maintained RESTful APIs and performed unit testing for new features.`
  },
  {
    role: 'Registered Nurse',
    title: 'Registered Nurse - Acute Care / ICU (EB-3 Schedule A)',
    jobDesc: `Registered Nurse - Critical Care / ICU
Hospital healthcare system sponsoring international nurses for permanent US residency.
Responsibilities:
- Provide comprehensive bedside patient care and monitoring in acute critical care settings.
- Administer IV medications, manage ventilators, and document clinical parameters via Epic EMR.
- Collaborate with multidisciplinary medical teams to ensure patient safety and positive clinical outcomes.
- Maintain strict adherence to HIPAA guidelines and hospital patient care protocols.`,
    resume: `FATIMA KHAN, BSN, RN
Registered Nurse | fatima.rn@email.com | NCLEX-RN Certified

SUMMARY:
Compassionate and detail-oriented Registered Nurse with 3 years of acute bedside hospital experience. Certified in NCLEX-RN and BLS/ACLS.

CLINICAL EXPERIENCE:
Staff Nurse | City General Hospital (2022 - Present)
- Provided daily nursing care to 15+ acute care patients.
- Administered medications and assisted doctors with bedside procedures.
- Documented patient vitals and treatment plans.
- Communicated with patient families regarding recovery status.`
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
Customer Support & Operations Specialist | marcus@email.com

SUMMARY:
Customer support specialist with 3 years of experience handling chat, email, and ticketing for SaaS platforms. Strong written communication and technical troubleshooting.

EXPERIENCE:
Customer Support Rep | CloudApp Systems (2022 - 2024)
- Answered customer tickets via Zendesk and Intercom.
- Helped users with password resets and account settings.
- Reported bugs to development team.
- Maintained 95% customer satisfaction score.`
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header with High Volume Keywords */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          100% Free ATS Resume Checker & Score Calculator
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Free ATS Resume Checker & Score Scanner
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          The best free ATS resume checker and CV score auditor. Scan your resume against US job descriptions to discover missing keywords, eliminate ATS parsing red flags, and get an instant ATS-friendly resume makeover.
        </p>
      </div>

      {/* Preset Quick-Buttons */}
      <div className="bg-slate-100/90 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="font-bold text-slate-800">Test Instantly with Sample Job & CV:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.role}
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
                1. Target US Job Description
              </label>
              <span className="text-xs text-slate-400">Paste full job requirements</span>
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
              placeholder="Paste the US job description, requirements, responsibilities, and required qualifications here..."
              className="w-full flex-grow text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          {/* Candidate Resume Box with File Upload & Drag-and-Drop */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                2. Attach Your CV / Resume File
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
              <div className="flex flex-col flex-grow">
                {/* Drag and Drop Box */}
                <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-emerald-50/30 flex flex-col items-center justify-center mb-3 flex-grow min-h-[150px]">
                  {isParsingFile ? (
                    <div className="flex flex-col items-center">
                      <RotateCw className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                      <span className="text-xs font-bold text-slate-700">Extracting text from document...</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-emerald-600 mb-2" />
                      <span className="text-sm font-bold text-slate-800">
                        Click to browse or drag & drop your CV / Resume
                      </span>
                      <span className="text-xs text-slate-400 mt-1">
                        Supports PDF, DOCX, DOC, TXT, RTF files
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt,.rtf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Attached File Indicator */}
                {attachedFileName && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between mb-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold truncate">
                      <FileCheck2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{attachedFileName}</span>
                      <span className="text-emerald-600 font-normal text-[11px]">({attachedFileSize})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachedFile}
                      className="text-rose-600 hover:text-rose-800 font-bold ml-2"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {parseError && (
                  <div className="p-3 mb-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{parseError}</span>
                  </div>
                )}

                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={6}
                  placeholder="Extracted resume text appears here..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-mono"
                />
              </div>
            ) : (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={14}
                placeholder="Paste your resume content (Summary, Experience, Skills, Education)..."
                className="w-full flex-grow text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            )}
          </div>

        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isAnalyzing || !resumeText || !jobDescription}
            className={`px-8 py-4 text-base font-extrabold text-white rounded-2xl shadow-lg transition-all inline-flex items-center gap-2 ${
              isAnalyzing || !resumeText || !jobDescription
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RotateCw className="w-5 h-5 animate-spin" />
                Auditing Keywords, Metrics & ATS Match...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Calculate Free ATS Resume Score
              </>
            )}
          </button>
        </div>
      </form>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl space-y-8 mb-16 animate-in fade-in duration-300">
          
          {/* Top Score Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div>
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider block mb-1">
                Official ATS Audit Dossier
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Target ATS Match Score: {analysis.overallScore}%
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Audited against: <strong className="text-slate-900">{jobTitle || 'Target Position'}</strong>. {analysis.overallScore >= 75 ? 'Your resume is in the top tier of applicant profiles.' : 'Optimization is required to pass automated ATS filter thresholds.'}
              </p>
            </div>

            {/* Visual Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[100px]">
                <span className="text-[11px] text-slate-500 font-bold block">Overall Fit</span>
                <span className={`text-2xl font-black ${analysis.overallScore >= 75 ? 'text-emerald-600' : analysis.overallScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {analysis.overallScore}%
                </span>
              </div>

              <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[100px]">
                <span className="text-[11px] text-slate-500 font-bold block">Keywords</span>
                <span className="text-2xl font-black text-blue-600">
                  {analysis.keywordScore}%
                </span>
              </div>

              <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[100px]">
                <span className="text-[11px] text-slate-500 font-bold block">Metrics & ROI</span>
                <span className="text-2xl font-black text-purple-600">
                  {analysis.metricsScore}%
                </span>
              </div>

              <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[100px]">
                <span className="text-[11px] text-slate-500 font-bold block">Formatting</span>
                <span className="text-2xl font-black text-emerald-600">
                  {analysis.formattingScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Positives vs Critical Red Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Positives */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Positives & Verified Strengths ({analysis.positives?.length || 0})
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
                {analysis.positives?.map((pos: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{pos}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Red Flags */}
            <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200">
              <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                Critical Red Flags & Gaps ({analysis.negatives?.length || 0})
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-900">
                {analysis.negatives?.map((neg: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{neg}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Keywords Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matched Keywords */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Matched Core Competencies:
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedKeywords?.map((kw: string) => (
                  <span key={kw} className="bg-emerald-100 text-emerald-900 text-xs px-2.5 py-1 rounded-lg font-bold">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-3">
                Missing High-Priority Keywords (Insert These):
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords?.map((kw: string) => (
                  <span key={kw} className="bg-rose-100 text-rose-900 text-xs px-2.5 py-1 rounded-lg font-bold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Prioritized Recommendations */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200">
            <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-2 mb-3">
              <ListOrdered className="w-4 h-4 text-indigo-600" />
              Prioritized Action Plan to Reach 90%+ Score:
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-indigo-900">
              {analysis.recommendations?.map((rec: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-indigo-100">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Rewritten Power Bullets */}
          {analysis.rewrittenBullets && analysis.rewrittenBullets.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-black text-slate-900">
                  AI Power Bullet Point Makeover (US Hiring Standard)
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-6">
                Replace passive duty statements with quantifiable business impact and leadership action verbs:
              </p>

              <div className="space-y-4">
                {analysis.rewrittenBullets.map((bullet: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-rose-700">Original (Weak): </span>
                      <span className="line-through">{bullet.original}</span>
                    </div>

                    <div className="bg-white border border-emerald-200 rounded-xl p-4 relative group">
                      <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center justify-between">
                        <span>High-Impact ATS Version:</span>
                        <button
                          type="button"
                          onClick={() => copyBullet(bullet.improved, idx)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1 rounded-md transition-colors"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Bullet
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                        {bullet.improved}
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500 italic">
                      Why this wins: {bullet.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* High-SEO Educational Content Section (High Volume Target Keywords) */}
      <div className="border-t border-slate-200 pt-12 mt-12 space-y-12">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
            How Does This Free ATS Resume Checker Work?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
            An <strong>Applicant Tracking System (ATS)</strong> is automated software utilized by over 98% of Fortune 500 companies, US hospital networks, and tech scaleups (including Workday, Greenhouse, Lever, Taleo, and iCIMS) to filter, score, and rank incoming CVs before a human recruiter ever sees them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              ATS Keyword Match Ratio
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our <strong>ats score checker</strong> scans your document against exact required skills, frameworks, and job titles to verify that your keyword density aligns with applicant tracking algorithms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Quantifiable Metrics & ROI
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              US recruiters look for measurable impact. Our <strong>ats cv checker</strong> audits your experience bullets for metrics, percentage growth, revenue numbers, and leadership action verbs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              ATS-Friendly Formatting
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-column tables, graphics, and unreadable fonts can corrupt ATS parsers. Our <strong>ats friendly resume checker</strong> verifies clean hierarchy, standard section headers, and machine readability.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <h3 className="text-xl font-black text-slate-900 mb-6">
            Frequently Asked Questions: ATS Resume Checker Free
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">
                What is a good ATS resume score for US jobs?
              </h4>
              <p className="text-slate-600">
                A score of <strong>75% or higher</strong> typically passes automated ATS filter thresholds and places your application in the candidate shortlist for human review. Scores below 50% risk immediate automated rejection.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">
                Is this ATS resume checker completely free?
              </h4>
              <p className="text-slate-600">
                Yes! Our <strong>free ats resume checker online</strong> is 100% free with unlimited scans, file attachments (.docx, .pdf, .txt), and AI bullet point makeovers to support international job seekers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">
                Which file format is best for ATS scanners?
              </h4>
              <p className="text-slate-600">
                Standard single-column <strong>.docx</strong> or text-based <strong>.pdf</strong> files without complex tables, text boxes, or embedded images are the most compatible with all US Applicant Tracking Systems.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function ATSScannerPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-slate-500">Loading Free ATS Resume Checker...</div>}>
      <ATSScannerContent />
    </Suspense>
  );
}
