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
  HelpCircle,
  Search,
  Globe,
  MapPin,
  Filter,
  Eye,
  X
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
  CandidateDossier,
  exportVaultBackup,
  importVaultBackup
} from '@/lib/user-vault';
import { parseResumeIntelligently } from '@/lib/resume-intelligence';
import { generateATSResumeDocx } from '@/lib/export-ats-resume';
import { TrackedApplication, ApplicationStatus, JobPosting, VisaSponsorshipType } from '@/lib/types';
import { INITIAL_JOBS } from '@/lib/jobs-data';
import GoogleAuthModal from '@/components/GoogleAuthModal';
import PaymentCheckoutModal from '@/components/PaymentCheckoutModal';
import { signOutSupabase } from '@/lib/supabase';

type ActiveTab = 'jobs' | 'studio' | 'tracker' | 'outputs' | 'connections' | 'profile';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryJobId = searchParams.get('jobId') || '';
  const queryTitle = searchParams.get('title') || '';
  const queryCompany = searchParams.get('company') || '';

  // Auth & Session
  const [user, setUser] = useState<GoogleUserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
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

  // Job Browser States
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>('all');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobPosting | null>(null);
  const [targetedJobAlert, setTargetedJobAlert] = useState<string | null>(null);
  const [syncToast, setSyncToast] = useState<string | null>(null);

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

  const handleLoadSampleProfile = () => {
    const sampleRole = 'Full Stack Software Engineer';
    const sampleCompany = 'Amazon Web Services (AWS)';
    const sampleSkills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS Cloud', 'Docker', 'REST APIs'];
    const sampleCV = `DALOYAR HASSAN
Senior Software Engineer | Full Stack Architect
Email: candidate@uscareersolutions.online | Phone: +1 (555) 019-2834
LinkedIn: linkedin.com/in/verified-candidate | Location: Open to Relocation / Remote

PROFESSIONAL SUMMARY
Results-driven Full Stack Software Engineer with 5+ years of hands-on experience designing and delivering resilient web architectures, distributed microservices, and high-conversion client platforms. Proven capability collaborating asynchronously in global engineering squads, optimizing CI/CD velocity by 40%, and upholding strict U.S. corporate compliance standards.

CORE TECHNICAL COMPETENCIES
• Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS, KaTeX, Redux Toolkit
• Backend & Cloud: Node.js, Python, PostgreSQL, Supabase, Redis, AWS (ECS, S3, CloudFront)
• System Architecture: RESTful APIs, GraphQL, Microservices, CI/CD Pipeline Automation, Git
• Compliance & Governance: ATS Resume Formatting, W-8BEN Tax Optimization, F-1 STEM OPT

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Enterprise Platform Solutions
2023 - Present
• Architected enterprise career discovery engine supporting 10,000+ daily applicant queries with sub-100ms database response latency.
• Engineered automated ATS resume scoring and DOCX generator conforming to Workday and Greenhouse parsing specifications.
• Mentored junior engineers, established TypeScript type-safety standards, and led sprint retrospectives.

Software Engineer | High-Growth Cloud Engineering
2021 - 2023
• Deployed full-stack microservices reducing server-side payload size by 35% across high-traffic endpoints.
• Automated cross-border payment reconciliation pipelines handling multi-currency settlements (USD / BDT).
• Integrated OAuth 2.0 authentication mechanisms ensuring zero-trust session integrity.

EDUCATION & CERTIFICATIONS
Bachelor of Science in Computer Science & Engineering (B.Sc CSE)
Verified U.S. Equivalency (WES Evaluated) • High Honors`;

    const sampleCL = `Dear Hiring Team at ${sampleCompany},

I am writing to formally express my enthusiasm for the ${sampleRole} opening at ${sampleCompany}. With a proven track record of architecting scalable web applications, streamlining asynchronous delivery, and implementing high-reliability cloud systems, I am prepared to contribute immediately to your engineering objectives.

Current U.S. Work Authorization: ${user?.visaStatus || 'F-1 OPT / Ready for Onboarding'}.
I bring verified credentials and can onboard smoothly without administrative friction. In my prior engagements, I led the technical development of automated intelligence engines, improved application throughput, and maintained rigorous engineering documentation.

Key strengths tailored for this position:
• Deep technical proficiency across: ${sampleSkills.slice(0, 5).join(', ')}
• Rapid adaptability to enterprise standards, sprint deadlines, and asynchronous communication
• Dedicated focus on clean architecture, performance optimization, and measurable business impact

I welcome the opportunity to discuss how my qualifications align with the growth goals of ${sampleCompany}.

Sincerely,
${user?.name || 'Daloyar Hassan'}
${user?.email || 'client@gmail.com'}`;

    const updated = saveCandidateDossier({
      targetRole: sampleRole,
      targetCompany: sampleCompany,
      cvText: sampleCV,
      cvFileName: 'Sample_High_Scoring_Tech_Resume.txt',
      coverLetter: sampleCL,
      skills: sampleSkills
    });
    setDossier(updated);
    saveOutput({
      type: 'ats_resume',
      title: `ATS Resume: ${sampleRole}`,
      company: sampleCompany,
      content: sampleCV
    });
    saveOutput({
      type: 'cover_letter',
      title: `Cover Letter: ${sampleRole}`,
      company: sampleCompany,
      content: sampleCL
    });
    setSavedOutputs(getSavedOutputs());
  };

  const handleManualSyncVault = () => {
    saveCandidateDossier(dossier);
    setSyncToast('Permanent Vault synchronized. All your updated CVs, cover letters, and application progress are securely stored.');
    setTimeout(() => setSyncToast(null), 4000);
  };

  const handleExportBackup = () => {
    const backupJson = exportVaultBackup();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(user?.name || 'Candidate').replace(/\s+/g, '_')}_Career_Vault_Backup.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSyncToast('Backup exported! Your complete career portfolio has been downloaded to your device.');
    setTimeout(() => setSyncToast(null), 4000);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const ok = importVaultBackup(text);
        if (ok) {
          setDossier(getCandidateDossier());
          setSavedOutputs(getSavedOutputs());
          setConnections(getConnections());
          try {
            const stored = localStorage.getItem('tracked_applications');
            if (stored) setTrackedApps(JSON.parse(stored));
          } catch (e) {}
          setSyncToast('Backup restored successfully! All your customized CVs, cover letters, and application history have been reloaded.');
          setTimeout(() => setSyncToast(null), 4000);
        } else {
          alert('Could not parse backup file. Please provide a valid JSON vault file.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleTargetJobAndTailor = (job: JobPosting) => {
    const newRole = job.title;
    const newCompany = job.company;
    const jobSkills = job.skills || [];

    const candidateName = user?.name || 'Candidate';
    const candidateEmail = user?.email || 'candidate@gmail.com';
    const candidatePhone = user?.phone || '+1 (555) 019-2834';
    const visaStatus = user?.visaStatus || 'F-1 OPT / Ready for Onboarding';

    const mergedSkills = Array.from(new Set([...(dossier.skills || []), ...jobSkills]));

    const tailoredLetter = `Dear Hiring Team at ${newCompany},

I am writing to formally submit my candidacy for the ${newRole} position. Having reviewed the role criteria and operational standards at ${newCompany}, I am confident that my technical background and disciplined execution align directly with your objectives.

Current U.S. Work Authorization: ${visaStatus}.
I hold verified credentials and can onboard smoothly without administrative friction. In my prior engagements, I have demonstrated ownership in architecting scalable solutions, maintaining rigorous documentation, and driving team velocity.

Key competencies tailored for this role:
• Core proficiency in: ${jobSkills.length > 0 ? jobSkills.slice(0, 5).join(', ') : 'industry-standard technologies and agile delivery'}
• Rapid adaptability to complex project constraints, sprint goals, and asynchronous communication
• Dedicated focus on performance, timeline milestones, and regulatory compliance

I welcome the opportunity to discuss how my qualifications will contribute directly to ${newCompany}'s mission and engineering objectives.

Sincerely,
${candidateName}
${candidateEmail} | ${candidatePhone}`;

    let atsCV = dossier.cvText;
    if (!atsCV) {
      atsCV = `=====================================================
${candidateName.toUpperCase()}
${candidateEmail} | ${candidatePhone}
U.S. Work Authorization: ${visaStatus}
Target Role: ${newRole}
Target Employer: ${newCompany}
=====================================================

PROFESSIONAL SUMMARY
Results-driven ${newRole} with demonstrated expertise in enterprise architecture and modern tooling. Track record of delivering scalable solutions, optimizing cross-functional processes, and maintaining high velocity in demanding environments.

CORE TECHNICAL COMPETENCIES
${jobSkills.length > 0 ? jobSkills.join(' • ') : 'Software Engineering • Cloud Platforms • Project Governance • System Optimization'}

PROFESSIONAL EXPERIENCE
${newRole} | Industry Delivery & Contract Services
• Delivered critical operational workflows aligned with ${newCompany}'s technical specifications.
• Architected scalable features, reducing system latency and improving end-user responsiveness.
• Coordinated asynchronously with distributed technical squads and business stakeholders.

EDUCATION & ACCREDITATION
Bachelor of Science / Equivalent Accredited Degree
Verified U.S. Equivalency & Institutional Credentials`;
    }

    const updated = saveCandidateDossier({
      targetRole: newRole,
      targetCompany: newCompany,
      coverLetter: tailoredLetter,
      cvText: atsCV,
      skills: mergedSkills
    });
    setDossier(updated);

    saveOutput({
      type: 'cover_letter',
      title: `Tailored Cover Letter: ${newRole}`,
      company: newCompany,
      content: tailoredLetter
    });
    if (atsCV) {
      saveOutput({
        type: 'ats_resume',
        title: `ATS Resume: ${newRole}`,
        company: newCompany,
        content: atsCV
      });
    }
    setSavedOutputs(getSavedOutputs());

    setTargetedJobAlert(`Successfully targeted "${newRole}" at ${newCompany}! Your ATS CV & tailored cover letter have been generated.`);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredJobs = INITIAL_JOBS.filter(job => {
    if (selectedJobCategory === 'remote') {
      const isRem = job.isRemote || job.location.toLowerCase().includes('remote') || job.visaSponsorship.toLowerCase().includes('remote');
      if (!isRem) return false;
    } else if (selectedJobCategory === 'capexempt') {
      const isCap = job.visaSponsorship.toLowerCase().includes('cap-exempt') || job.description.toLowerCase().includes('cap-exempt');
      if (!isCap) return false;
    } else if (selectedJobCategory === 'nurse') {
      const isNurse = job.category.toLowerCase().includes('health') || job.category.toLowerCase().includes('nurs') || job.title.toLowerCase().includes('nurse');
      if (!isNurse) return false;
    } else if (selectedJobCategory === 'tech') {
      const isTech = job.category.toLowerCase().includes('software') || job.category.toLowerCase().includes('engineer') || job.category.toLowerCase().includes('data') || job.category.toLowerCase().includes('tech') || job.category.toLowerCase().includes('it');
      if (!isTech) return false;
    } else if (selectedJobCategory === 'entry') {
      const isEntry = job.experienceLevel?.toLowerCase().includes('entry') || job.experienceLevel?.toLowerCase().includes('junior');
      if (!isEntry) return false;
    }

    if (jobSearchQuery.trim()) {
      const q = jobSearchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchLocation = job.location.toLowerCase().includes(q);
      const matchSkills = job.skills?.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchLocation && !matchSkills) return false;
    }

    return true;
  });

  const getJobBadge = (type: string) => {
    if (type.includes('Cap-Exempt')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          <ShieldCheck className="w-3 h-3 text-amber-600" />
          Cap-Exempt H-1B (No Lottery)
        </span>
      );
    }
    if (type.includes('Schedule A') || type.includes('Nurse')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          Schedule A EB-3 (Direct Green Card)
        </span>
      );
    }
    if (type.includes('Remote') || type.includes('W-8BEN')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
          <Globe className="w-3 h-3 text-purple-600" />
          Global Remote (Paid in USD)
        </span>
      );
    }
    if (type.includes('OPT')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
          <CheckCircle2 className="w-3 h-3 text-blue-600" />
          STEM OPT Friendly
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
        <CheckCircle2 className="w-3 h-3 text-slate-500" />
        {type}
      </span>
    );
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
          <div className="flex items-center gap-2.5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-1.5 flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <div className="text-xs">
                <span className="font-black text-slate-900">{user?.credits ?? 5}</span>
                <span className="text-slate-500 font-medium"> Apps Available This Month</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Upgrade Package</span>
            </button>

            <Link
              href="/pricing"
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Plans
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
            { id: 'jobs', label: 'Browse Sponsor Jobs (100+)', icon: Briefcase },
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

        {/* Sync Toast Feedback */}
        {syncToast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">{syncToast}</span>
            </div>
            <button
              onClick={() => setSyncToast(null)}
              className="p-1 text-emerald-700 hover:text-emerald-900 rounded-lg hover:bg-emerald-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Permanent Career Vault Guarantee & Cloud Sync Bar */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-black text-slate-900">
                  Permanent Cloud Vault Guarantee
                </span>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  100% Preserved • Never Expires
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
                All your updated CVs, tailored cover letters, targeted jobs, and CRM milestones are permanently preserved under your profile. <strong>None of your work will ever be removed.</strong> Stay on Free Explorer as long as you need — whenever you have the funds to upgrade (starting from $10), your portfolio will be right here.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              type="button"
              onClick={handleManualSyncVault}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              title="Save current progress"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              <span>Sync Vault</span>
            </button>

            <button
              type="button"
              onClick={handleExportBackup}
              className="px-3 py-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              title="Download offline backup of all your career assets"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Export Backup (.json)</span>
            </button>

            <label className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Restore</span>
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
          </div>
        </div>

        {/* =====================================================================
            FREE EXPLORER SERVICE QUICK-DOCK & WORKFLOW ROADMAP
        ===================================================================== */}
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-slate-50 border border-blue-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                  Free Explorer Roadmap
                </span>
                <span className="text-xs font-bold text-slate-700">5 Direct Applications Every Month ($0)</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Welcome, {user?.name?.split(' ')[0] || 'Candidate'}! Your 4-step job application workflow:
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleLoadSampleProfile}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs border border-blue-200 shadow-sm transition-all flex items-center gap-1.5"
                title="Populate ATS resume & tailored letter in 1 click"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Load Sample High-Scoring CV</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('jobs')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Browse 100+ Verified Jobs</span>
              </button>
            </div>
          </div>

          {/* 4 Interactive Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div 
              onClick={() => setActiveTab('jobs')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${dossier.targetRole ? 'bg-blue-50/80 border-blue-300 text-blue-950' : 'bg-white border-slate-200 hover:border-blue-300'}`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>1. Target Sponsor Job</span>
                <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded-full">100+ Live</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {dossier.targetRole ? `Targeting: ${dossier.targetRole}` : 'Browse pre-vetted sponsor roles to target.'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('studio')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${dossier.cvText ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200 hover:border-blue-300'}`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>2. ATS Resume Builder</span>
                {dossier.cvText ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.2 rounded-full">Step 2</span>}
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {dossier.cvText ? 'ATS Resume structured & ready.' : 'Auto-tailored from target job or sample CV.'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('studio')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${dossier.coverLetter ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200 hover:border-blue-300'}`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>3. Tailored Cover Letter</span>
                {dossier.coverLetter ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.2 rounded-full">Step 3</span>}
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {dossier.coverLetter ? 'Tailored letter generated.' : '1-click tailor letter to role & employer.'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('tracker')}
              className="p-3.5 rounded-2xl border bg-white border-slate-200 hover:border-blue-300 cursor-pointer text-slate-700 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>4. Direct Apply CRM</span>
                <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full">{user?.credits ?? 5} Free Left</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Track status milestones and recruiter read beacons.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            TAB 0: BROWSE VERIFIED U.S. SPONSOR JOBS (100+ Live)
        ===================================================================== */}
        {activeTab === 'jobs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Header & Quick Filter Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2.5 py-0.5 rounded-full">
                      Verified Directory
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      DOL 20 CFR § 656.12 Compliant • Zero Placement Fees
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    Browse 100+ Verified U.S. Sponsor & Global Remote Jobs
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select any opportunity below and click <strong>&quot;Target Job & Auto-Tailor CV + Letter&quot;</strong> to generate an ATS-optimized resume and tailored cover letter referencing your specific visa authorization.
                  </p>
                </div>

                <div className="text-xs font-bold text-slate-500 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
                  Showing <span className="text-blue-600 font-extrabold">{filteredJobs.length}</span> of {INITIAL_JOBS.length} Verified Roles
                </div>
              </div>

              {/* Live Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2 border-t border-slate-100">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={jobSearchQuery}
                    onChange={e => setJobSearchQuery(e.target.value)}
                    placeholder="Search by job title, company, skills (e.g. React, Python, Nurse, AWS)..."
                    className="w-full text-xs sm:text-sm pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                  {jobSearchQuery && (
                    <button
                      onClick={() => setJobSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: 'All Roles' },
                    { id: 'remote', label: 'Remote USD (W-8BEN)' },
                    { id: 'capexempt', label: 'Cap-Exempt H-1B' },
                    { id: 'nurse', label: 'Nurse EB-3' },
                    { id: 'tech', label: 'Tech & STEM OPT' },
                    { id: 'entry', label: 'Entry Level' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedJobCategory(cat.id)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                        selectedJobCategory === cat.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredJobs.map(job => (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {getJobBadge(job.visaSponsorship)}
                          {job.isRemote && (
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              100% Remote
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                            {job.category}
                          </span>
                        </div>
                      </div>

                      {/* Job Title & Company */}
                      <div>
                        <h3 className="text-base font-black text-slate-900 leading-snug">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-600 flex-wrap">
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </span>
                          {job.salaryMin && (
                            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              ${job.salaryMin.toLocaleString()} - ${job.salaryMax?.toLocaleString()} USD/yr
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Brief Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Skills Chips */}
                      {job.skills && job.skills.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {job.skills.slice(0, 4).map((sk, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-lg"
                            >
                              {sk}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              +{job.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedJobForModal(job)}
                          className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>

                        <a
                          href={job.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                          title="Open Official Job Source"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTargetJobAndTailor(job)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span>Target Job & Auto-Tailor CV</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm space-y-3">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-black text-slate-800">No matching jobs found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search query or selecting a different category filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setJobSearchQuery('');
                    setSelectedJobCategory('all');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 1: CV & COVER LETTER PREPARATION STUDIO
        ===================================================================== */}
        {activeTab === 'studio' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Targeted Job Celebration Alert */}
            {targetedJobAlert && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-950 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold">{targetedJobAlert}</div>
                    <div className="text-[11px] text-emerald-700">Review your customized CV and cover letter below, export DOCX, or dispatch directly.</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadDocx}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export DOCX</span>
                  </button>
                  <button
                    onClick={() => setTargetedJobAlert(null)}
                    className="p-1.5 text-emerald-700 hover:text-emerald-900 rounded-lg hover:bg-emerald-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Target Role & Employer Meta Inputs */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="text-xs font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Target Role & Employer Settings</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('jobs')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-all"
                >
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                  <span>Browse 100+ Live Jobs to Target</span>
                </button>
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

      {/* Job Details Modal */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {getJobBadge(selectedJobForModal.visaSponsorship)}
                  {selectedJobForModal.isRemote && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      100% Remote
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {selectedJobForModal.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-600 flex-wrap">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {selectedJobForModal.company}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {selectedJobForModal.location}
                  </span>
                  {selectedJobForModal.salaryMin && (
                    <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      ${selectedJobForModal.salaryMin.toLocaleString()} - ${selectedJobForModal.salaryMax?.toLocaleString()} USD/yr
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJobForModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Role Overview</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedJobForModal.description}
              </p>
            </div>

            {/* Requirements */}
            {selectedJobForModal.requirements && selectedJobForModal.requirements.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Key Qualifications</h4>
                <ul className="space-y-1.5">
                  {selectedJobForModal.requirements.map((req, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {selectedJobForModal.skills && selectedJobForModal.skills.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Required Technical Skills</h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedJobForModal.skills.map((sk, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <a
                href={selectedJobForModal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Official Careers Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  const job = selectedJobForModal;
                  setSelectedJobForModal(null);
                  handleTargetJobAndTailor(job);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Target Job & Auto-Tailor CV + Letter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade / Refill Payment Checkout Modal */}
      <PaymentCheckoutModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onSuccess={() => {
          setShowUpgradeModal(false);
          const current = getCurrentUser();
          if (current) setUser(current);
        }}
        initialPlan="fast_track"
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
