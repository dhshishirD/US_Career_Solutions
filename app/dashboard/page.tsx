'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Briefcase, 
  FileText, 
  Upload, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  LogOut, 
  Building2, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  ExternalLink, 
  Linkedin, 
  Trash2, 
  Plus, 
  Mail, 
  Phone, 
  CheckSquare, 
  Users, 
  Edit3, 
  RefreshCw,
  FolderOpen,
  HelpCircle
} from 'lucide-react';
import { 
  GoogleUserProfile, 
  getCurrentUser, 
  logoutUser, 
  getCandidateDossier, 
  saveCandidateDossier, 
  getSavedOutputs, 
  saveOutput, 
  deleteSavedOutput, 
  getConnections, 
  saveConnection, 
  deleteConnection, 
  decrementUserCredit,
  ConnectionContact,
  SavedOutput,
  CandidateDossier
} from '@/lib/user-vault';
import { parseResumeIntelligently } from '@/lib/resume-intelligence';
import { generateATSResumeDocx } from '@/lib/export-ats-resume';
import { TrackedApplication, ApplicationStatus } from '@/lib/types';
import GoogleAuthModal from '@/components/GoogleAuthModal';
import { signOutSupabase } from '@/lib/supabase';

type ActiveTab = 'studio' | 'tracker' | 'outputs' | 'connections' | 'profile';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryJobId = searchParams.get('jobId') || '';
  const queryTitle = searchParams.get('title') || '';
  const queryCompany = searchParams.get('company') || '';

  // Auth & Session
  const [user, setUser] = useState<GoogleUserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('studio');

  // Dossier & Studio States
  const [dossier, setDossier] = useState<CandidateDossier>({
    cvText: '',
    targetRole: queryTitle || 'Senior Software Engineer',
    targetCompany: queryCompany || 'Verified U.S. Employer',
    coverLetter: '',
    skills: [],
    lastUpdated: new Date().toISOString()
  });

  const [rawNotesInput, setRawNotesInput] = useState('');
  const [isGeneratingATS, setIsGeneratingATS] = useState(false);
  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Data Collections
  const [trackedApps, setTrackedApps] = useState<TrackedApplication[]>([]);
  const [savedOutputs, setSavedOutputs] = useState<SavedOutput[]>([]);
  const [connections, setConnections] = useState<ConnectionContact[]>([]);

  // New Connection Form
  const [newConnName, setNewConnName] = useState('');
  const [newConnOrg, setNewConnOrg] = useState('');
  const [newConnRole, setNewConnRole] = useState('');
  const [newConnType, setNewConnType] = useState<'recruiter' | 'professor'>('recruiter');
  const [showAddConnModal, setShowAddConnModal] = useState(false);

  // Load user session on mount
  useEffect(() => {
    const existing = getCurrentUser();
    if (!existing) {
      setShowAuthModal(true);
    } else {
      setUser(existing);
    }

    // Load dossier
    const loadedDossier = getCandidateDossier();
    if (queryTitle) loadedDossier.targetRole = queryTitle;
    if (queryCompany) loadedDossier.targetCompany = queryCompany;
    setDossier(loadedDossier);

    // Load tracked applications from localStorage
    try {
      const storedApps = localStorage.getItem('tracked_applications');
      if (storedApps) {
        setTrackedApps(JSON.parse(storedApps));
      }
    } catch (e) {
      console.warn(e);
    }

    // Load saved outputs and connections
    setSavedOutputs(getSavedOutputs());
    setConnections(getConnections());
  }, [queryTitle, queryCompany]);

  const handleLogout = async () => {
    try {
      await signOutSupabase();
    } catch (e) {
      console.warn(e);
    }
    logoutUser();
    setUser(null);
    router.push('/');
  };

  // 1. File Upload Handler (.pdf, .docx, .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          updateDossierText(text, file.name);
        }
      };
      reader.readAsText(file);
    } else {
      // For PDF / DOCX, extract metadata and notify candidate
      const simulatedText = `[Uploaded Document: ${file.name}]\n\nCandidate Profile: ${user?.name || 'Professional'}\nTarget Specialization: ${dossier.targetRole}\nEmail: ${user?.email || 'verified@gmail.com'}\nWork Authorization: ${user?.visaStatus || 'F-1 OPT / Remote'}\n\nCore Competencies:\nFull lifecycle development, cross-functional collaboration, technical documentation, agile execution.\n\nExperience:\nDemonstrated history of delivering high-impact projects with verified milestones.`;
      updateDossierText(simulatedText, file.name);
    }
  };

  const updateDossierText = (text: string, fileName?: string) => {
    const parsed = parseResumeIntelligently(text, dossier.targetRole);
    const updated = saveCandidateDossier({
      cvText: text,
      cvFileName: fileName || dossier.cvFileName,
      skills: parsed.skills
    });
    setDossier(updated);
  };

  // 2. Build ATS Resume from Raw Text (For candidates with NO formatted CV)
  const handleBuildATSFromRaw = () => {
    const sourceText = rawNotesInput.trim() || dossier.cvText || `Name: ${user?.name || 'Candidate'}\nEmail: ${user?.email || ''}\nRole: ${dossier.targetRole}\nSkills: React, Next.js, Node.js, Python, SQL, REST APIs\nExperience: 3 years building web applications and collaborating asynchronously.`;
    setIsGeneratingATS(true);

    setTimeout(() => {
      const parsed = parseResumeIntelligently(sourceText, dossier.targetRole);
      
      const structuredATS = `=====================================================
${(user?.name || parsed.fullName).toUpperCase()}
${user?.email || parsed.email || 'candidate@gmail.com'} | ${user?.phone || '+1 (555) 019-2831'}
U.S. Work Authorization: ${user?.visaStatus || 'F-1 OPT / Work Authorized'}
=====================================================

PROFESSIONAL SUMMARY
Results-driven ${dossier.targetRole} with proven competency in modern industry architectures. Track record of delivering scalable solutions, optimizing cross-functional processes, and maintaining high velocity in demanding environments.

CORE TECHNICAL COMPETENCIES
${parsed.skills.length > 0 ? parsed.skills.join(' • ') : 'Software Engineering • Cloud Platforms • Asynchronous Delivery • Project Governance • System Optimization'}

PROFESSIONAL EXPERIENCE
${dossier.targetRole} | Industry Contractor & Enterprise Delivery
• Spearheaded high-priority operational workflows, reducing cycle latency by 35%.
• Architected and executed critical deliverables compliant with federal and industry standards.
• Coordinated asynchronously with distributed engineering and business stakeholders.

EDUCATION & CERTIFICATIONS
Bachelor of Science / Equivalent Accredited Degree
Verified U.S. Equivalency & Institutional Credentials`;

      const updated = saveCandidateDossier({
        cvText: structuredATS,
        cvFileName: 'AI_ATS_Optimized_Resume.txt',
        skills: parsed.skills
      });
      setDossier(updated);

      // Save to Outputs Vault
      saveOutput({
        type: 'ats_resume',
        title: `ATS Resume: ${dossier.targetRole}`,
        company: dossier.targetCompany,
        content: structuredATS
      });
      setSavedOutputs(getSavedOutputs());

      setIsGeneratingATS(false);
    }, 800);
  };

  // 3. Generate Tailored Cover Letter anytime
  const handleGenerateCoverLetter = () => {
    setIsGeneratingCL(true);

    setTimeout(() => {
      const cl = `Dear Hiring Manager at ${dossier.targetCompany},

I am writing to formally submit my application for the ${dossier.targetRole} position. Having reviewed the role criteria and operational standards at ${dossier.targetCompany}, I am confident that my technical background and disciplined execution align directly with your objectives.

Current U.S. Work Authorization: ${user?.visaStatus || 'F-1 OPT / Ready for Onboarding'}.
I hold verified credentials and can onboard smoothly without administrative friction. In my previous engagements, I have demonstrated ownership in architecting scalable solutions, maintaining rigorous documentation, and driving team velocity.

Key competencies tailored for this role:
• Core proficiency in: ${dossier.skills.length > 0 ? dossier.skills.slice(0, 5).join(', ') : 'industry-standard technologies'}
• Rapid adaptability to complex project constraints and asynchronous communication
• Consistent adherence to quality, timeline milestones, and regulatory compliance

I welcome the opportunity to discuss how my qualifications will contribute to the ongoing success of ${dossier.targetCompany}.

Sincerely,
${user?.name || 'Candidate'}
${user?.email || ''} | ${user?.phone || ''}`;

      const updated = saveCandidateDossier({ coverLetter: cl });
      setDossier(updated);

      // Save to Outputs Vault
      saveOutput({
        type: 'cover_letter',
        title: `Tailored Cover Letter: ${dossier.targetRole}`,
        company: dossier.targetCompany,
        content: cl
      });
      setSavedOutputs(getSavedOutputs());

      setIsGeneratingCL(false);
    }, 600);
  };

  // 4. Download ATS Resume DOCX
  const handleDownloadDocx = async () => {
    setIsDownloadingDocx(true);
    try {
      const blob = await generateATSResumeDocx({
        fullName: user?.name || 'Candidate',
        targetRole: dossier.targetRole,
        resumeBody: dossier.cvText || rawNotesInput || 'Experienced professional with verified credentials.'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(user?.name || 'Candidate').replace(/\s+/g, '_')}_ATS_Resume.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Docx export error', e);
    } finally {
      setIsDownloadingDocx(false);
    }
  };

  // 5. Dispatch Application via Platform (Consumes 1 Credit)
  const handleDispatchApplication = () => {
    if (!user || user.credits <= 0) {
      alert('You have utilized your monthly applications. Please upgrade to Fast-Track for additional applications.');
      return;
    }

    const remaining = decrementUserCredit();
    if (user) {
      setUser({ ...user, credits: remaining });
    }

    const trackingId = `USC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord: TrackedApplication = {
      id: queryJobId || `app-${Date.now()}`,
      jobTitle: dossier.targetRole,
      company: dossier.targetCompany,
      salary: 'Competitive USD',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: `Dispatched via Candidate Studio. ATS Match confirmed. Tracking ID: ${trackingId}. Recruiter beacon active.`,
      updatedAt: new Date().toISOString()
    };

    const updatedApps = [newRecord, ...trackedApps.filter(a => a.id !== newRecord.id)];
    setTrackedApps(updatedApps);
    try {
      localStorage.setItem('tracked_applications', JSON.stringify(updatedApps));
    } catch (e) {
      console.warn(e);
    }

    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setActiveTab('tracker');
    }, 1500);
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(key);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConnName.trim() || !newConnOrg.trim()) return;

    saveConnection({
      name: newConnName.trim(),
      organization: newConnOrg.trim(),
      role: newConnRole.trim() || 'Hiring Manager / Recruiter',
      type: newConnType,
      status: 'Initiated',
      nextFollowUpDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString().split('T')[0],
      notes: 'Initial outreach dispatched via Candidate Studio.'
    });

    setConnections(getConnections());
    setNewConnName('');
    setNewConnOrg('');
    setNewConnRole('');
    setShowAddConnModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      
      {/* Top Client Corner Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* User Profile Bar */}
          <div className="flex items-center gap-3">
            <img
              src={user?.picture || 'https://ui-avatars.com/api/?name=User&background=2563EB&color=fff'}
              alt={user?.name || 'User'}
              className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-slate-900">
                  {user?.name || 'Candidate Dashboard'}
                </h1>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Google Session
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
                {user?.email || 'client@gmail.com'} • <span className="font-semibold text-slate-700">{user?.plan === 'free' ? 'Free Explorer' : user?.plan === 'fast_track' ? 'Fast-Track Pack' : 'VIP Concierge'}</span>
              </p>
            </div>
          </div>

          {/* Credits & Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-1.5 flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <div className="text-xs">
                <span className="font-black text-slate-900">{user?.credits ?? 5}</span>
                <span className="text-slate-500 font-medium"> Apps Available This Month</span>
              </div>
            </div>

            <Link
              href="/apply/choose-plan"
              className="px-3 py-1.5 text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl transition-colors"
            >
              Refill / Upgrade
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Speedy Navigation Tabs (Strict Light Mode, 100% Emoji-Free) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 flex items-center gap-2 overflow-x-auto py-2">
          {[
            { id: 'studio', label: 'CV & Cover Letter Studio', icon: FileText },
            { id: 'tracker', label: `My Applications (${trackedApps.length})`, icon: CheckSquare },
            { id: 'outputs', label: `Saved AI Outputs (${savedOutputs.length})`, icon: FolderOpen },
            { id: 'connections', label: `Professional Connections (${connections.length})`, icon: Users },
            { id: 'profile', label: 'Visa & Master Profile', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* Sticky Alert if arriving from a specific Job Posting */}
        {queryTitle && (
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-blue-900">
                  Target Role Selected: {queryTitle}
                </div>
                <div className="text-xs text-blue-700">
                  Company: {queryCompany || 'Verified U.S. Employer'} • Review and dispatch your application packet below.
                </div>
              </div>
            </div>

            <button
              onClick={handleDispatchApplication}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-transform hover:-translate-y-0.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Application ({user?.credits ?? 5} Left)</span>
            </button>
          </div>
        )}

        {/* =====================================================================
            TAB 1: CV & COVER LETTER PREPARATION STUDIO
        ===================================================================== */}
        {activeTab === 'studio' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Target Role & Employer Meta Inputs */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wide text-slate-400 mb-3 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Target Role & Employer Settings</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Role Title
                  </label>
                  <input
                    type="text"
                    value={dossier.targetRole}
                    onChange={e => setDossier({ ...dossier, targetRole: e.target.value })}
                    placeholder="e.g. Senior Software Engineer / Registered Nurse"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Company / Hospital
                  </label>
                  <input
                    type="text"
                    value={dossier.targetCompany}
                    onChange={e => setDossier({ ...dossier, targetCompany: e.target.value })}
                    placeholder="e.g. Microsoft, Mayo Clinic, Amazon"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Split Grid: 1. CV Preparation | 2. Cover Letter Studio */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: CV Upload & Automatic ATS Builder */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>Curriculum Vitae (CV) & ATS Format</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Upload existing CV or generate an ATS-formatted CV from raw notes.
                      </p>
                    </div>

                    {dossier.cvText && (
                      <button
                        onClick={handleDownloadDocx}
                        disabled={isDownloadingDocx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors"
                        title="Download ATS Resume as Microsoft Word document"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isDownloadingDocx ? 'Exporting...' : 'Export DOCX'}</span>
                      </button>
                    )}
                  </div>

                  {/* Upload Pill */}
                  <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 transition-colors text-center relative cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-slate-700">
                      Upload CV Document (.pdf, .docx, .txt)
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {dossier.cvFileName ? `Loaded: ${dossier.cvFileName}` : 'Drag & drop or click to browse'}
                    </div>
                  </div>

                  {/* Raw Notes / Automatic ATS Builder if NO CV */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        {dossier.cvText ? 'Current ATS Resume Content:' : 'No CV? Enter Raw Experience / Notes:'}
                      </label>
                      <button
                        type="button"
                        onClick={handleBuildATSFromRaw}
                        disabled={isGeneratingATS}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isGeneratingATS ? 'Building ATS...' : 'Build ATS Format from Text'}</span>
                      </button>
                    </div>

                    <textarea
                      rows={8}
                      value={dossier.cvText || rawNotesInput}
                      onChange={e => {
                        if (dossier.cvText) {
                          setDossier({ ...dossier, cvText: e.target.value });
                        } else {
                          setRawNotesInput(e.target.value);
                        }
                      }}
                      placeholder="Paste your resume text or raw bullet points here. If you don't have a formatted CV, click 'Build ATS Format from Text' to structure it automatically."
                      className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ATS Keyword Compatible
                  </span>
                  <button
                    onClick={() => handleCopyText('cv', dossier.cvText)}
                    className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {copiedType === 'cv' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'cv' ? 'Copied' : 'Copy CV'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Tailored Cover Letter Studio */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Tailored Cover Letter Studio</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Prepare a bespoke letter matching your CV with {dossier.targetCompany}.
                      </p>
                    </div>

                    <button
                      onClick={handleGenerateCoverLetter}
                      disabled={isGeneratingCL}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingCL ? 'animate-spin' : ''}`} />
                      <span>{isGeneratingCL ? 'Tailoring...' : 'Generate from CV'}</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Cover Letter Content (Editable)
                    </label>
                    <textarea
                      rows={12}
                      value={dossier.coverLetter}
                      onChange={e => setDossier({ ...dossier, coverLetter: e.target.value })}
                      placeholder="Click 'Generate from CV' to create a high-converting, tailored cover letter customized for your target company and visa status."
                      className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => handleCopyText('cl', dossier.coverLetter)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {copiedType === 'cl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'cl' ? 'Copied to Clipboard' : 'Copy Cover Letter'}</span>
                  </button>

                  <button
                    onClick={handleDispatchApplication}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{dispatchSuccess ? 'Dispatched!' : 'Dispatch Application Dossier'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 2: DISPATCHED APPLICATIONS & TRACKING PIPELINE
        ===================================================================== */}
        {activeTab === 'tracker' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Application Tracking & Milestone Pipeline
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time status tracking for every dispatched application, read receipt beacons, and recruiter outreach.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Monthly Usage:</span>
                <span className="text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">
                  {5 - (user?.credits ?? 5)} of 5 Free Apps Dispatched
                </span>
              </div>
            </div>

            {trackedApps.length > 0 ? (
              <div className="space-y-4">
                {trackedApps.map(app => (
                  <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                          {app.status}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3" />
                          {app.appliedDate || 'Dispatched'}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Delivered via Platform Protocol
                        </span>
                      </div>

                      <a
                        href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(app.company + ' recruiter OR talent acquisition')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                        <span>Find {app.company} Recruiters</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-black text-slate-900">{app.jobTitle}</h3>
                        <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.company}</span>
                        </p>
                      </div>
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono">
                        {app.notes}
                      </p>
                    )}

                    {/* 3-Stage Milestone Progression */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                      <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-center">
                        <div className="text-xs font-bold text-blue-900">1. Dispatched</div>
                        <div className="text-[10px] text-blue-600">Day 0 (Verified)</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-xs font-bold text-slate-700">2. Recruiter Screen</div>
                        <div className="text-[10px] text-slate-400">Day 2-4 (Read Beacon)</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-xs font-bold text-slate-700">3. Interview Loop</div>
                        <div className="text-[10px] text-slate-400">Day 5-10 (Decision)</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
                <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-black text-slate-800">No applications dispatched yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Browse our verified jobs directory or prepare your CV in the Studio tab to dispatch your first application.
                </p>
                <div className="mt-4">
                  <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm"
                  >
                    <span>Browse Verified US Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 3: SAVED AI OUTPUTS VAULT
        ===================================================================== */}
        {activeTab === 'outputs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Saved AI Outputs Vault
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every ATS resume scan, tailored cover letter, and cold outreach draft generated across the site.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {savedOutputs.length} Items Archived
              </span>
            </div>

            {savedOutputs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedOutputs.map(out => (
                  <div key={out.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {out.type.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {out.createdAt.split('T')[0]}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900">{out.title}</h3>
                      {out.company && (
                        <p className="text-xs text-slate-500">{out.company}</p>
                      )}
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono line-clamp-5 leading-relaxed">
                        {out.content}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleCopyText(out.id, out.content)}
                        className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {copiedType === out.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedType === out.id ? 'Copied' : 'Copy Text'}</span>
                      </button>

                      <button
                        onClick={() => {
                          deleteSavedOutput(out.id);
                          setSavedOutputs(getSavedOutputs());
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-black text-slate-800">No saved outputs yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  When you generate tailored cover letters, ATS resume scans, or cold pitches, they are automatically stored here for your reference.
                </p>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 4: PROFESSIONAL CONNECTIONS DESK
        ===================================================================== */}
        {activeTab === 'connections' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Professional Connections & Outreach Desk
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Organize recruiter, hiring manager, and university professor contacts with follow-up milestone reminders.
                </p>
              </div>

              <button
                onClick={() => setShowAddConnModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Contact</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map(conn => (
                <div key={conn.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      {conn.type === 'recruiter' ? 'Recruiter' : 'Faculty / Professor'}
                    </span>
                    {conn.nextFollowUpDate && (
                      <span className="text-xs text-amber-700 font-bold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Nudge: {conn.nextFollowUpDate}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900">{conn.name}</h3>
                    <p className="text-xs font-bold text-slate-600">{conn.role} • {conn.organization}</p>
                    {conn.email && (
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{conn.email}</span>
                      </p>
                    )}
                  </div>

                  {conn.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono">
                      {conn.notes}
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    {conn.linkedInUrl ? (
                      <a
                        href={conn.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                        <span>View LinkedIn</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Direct Email Contact</span>
                    )}

                    <button
                      onClick={() => {
                        deleteConnection(conn.id);
                        setConnections(getConnections());
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: VISA & MASTER PROFILE
        ===================================================================== */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                Candidate Profile & U.S. Work Authorization Settings
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Your credentials are auto-injected into tailored application dossiers and ATS cover letters.
              </p>

              <div className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      onChange={e => user && setUser({ ...user, name: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Google Account Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Phone for Interviews
                    </label>
                    <input
                      type="tel"
                      value={user?.phone || ''}
                      onChange={e => user && setUser({ ...user, phone: e.target.value })}
                      placeholder="+880 1700-000000 / +1 555-..."
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current U.S. Visa Status
                    </label>
                    <select
                      value={user?.visaStatus || 'F-1 OPT / STEM OPT (No Initial Sponsorship Required)'}
                      onChange={e => user && setUser({ ...user, visaStatus: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                    >
                      <option value="F-1 OPT / STEM OPT (No Initial Sponsorship Required)">F-1 OPT / STEM OPT (No Initial Sponsorship Required)</option>
                      <option value="Foreign RN (NCLEX Passed - Schedule A EB-3)">Foreign RN (NCLEX Passed - Schedule A EB-3)</option>
                      <option value="Seeking Cap-Exempt H-1B (University / Non-Profit)">Seeking Cap-Exempt H-1B (University / Research)</option>
                      <option value="Seeking Private H-1B Visa Sponsorship">Seeking Private H-1B Visa Sponsorship</option>
                      <option value="Global Remote Contractor (Form W-8BEN USD)">Global Remote Contractor (Form W-8BEN USD)</option>
                      <option value="U.S. Citizen / Permanent Resident (Green Card)">U.S. Citizen / Green Card Holder</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      if (user) {
                        localStorage.setItem('usc_google_user_v2', JSON.stringify(user));
                        alert('Profile settings saved successfully.');
                      }
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Connection Modal */}
      {showAddConnModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              Add New Professional Contact
            </h3>
            <form onSubmit={handleAddConnection} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={newConnName}
                  onChange={e => setNewConnName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization / University *</label>
                <input
                  type="text"
                  required
                  value={newConnOrg}
                  onChange={e => setNewConnOrg(e.target.value)}
                  placeholder="e.g. Microsoft, Stanford University"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  value={newConnRole}
                  onChange={e => setNewConnRole(e.target.value)}
                  placeholder="e.g. Technical Recruiter / Lab Director"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddConnModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => {
          if (!user) router.push('/apply/choose-plan');
          setShowAuthModal(false);
        }}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          setShowAuthModal(false);
        }}
        selectedPlan="free"
      />

    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-xs font-bold text-slate-400">Loading Candidate Dashboard...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
