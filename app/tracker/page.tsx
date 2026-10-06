'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Building2, 
  ExternalLink,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  Linkedin,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MessageSquare,
  FileText,
  FileCheck,
  Mail,
  Upload,
  Download,
  Eye,
  X,
  FileUp,
  BookmarkCheck
} from 'lucide-react';
import { TrackedApplication, ApplicationStatus } from '@/lib/types';
import { getCurrentUser } from '@/lib/user-vault';

export default function TrackerPage() {
  const [applications, setApplications] = useState<TrackedApplication[]>([]);
  const [credits, setCredits] = useState<number>(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'job' | 'ready_docs' | 'outreach'>('job');
  const [expandedIntelligenceId, setExpandedIntelligenceId] = useState<string | null>(null);
  const [previewDocModal, setPreviewDocModal] = useState<{ title: string; content: string; type: string } | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Form states for New Application
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newJobUrl, setNewJobUrl] = useState('');
  const [newRecruiterEmail, setNewRecruiterEmail] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Applied');
  
  // Ready Documents attached
  const [newReadyCvText, setNewReadyCvText] = useState('');
  const [newReadyCvFileName, setNewReadyCvFileName] = useState('');
  const [newReadyCoverLetterText, setNewReadyCoverLetterText] = useState('');
  const [newReadyCoverLetterFileName, setNewReadyCoverLetterFileName] = useState('');
  const [newSubmissionType, setNewSubmissionType] = useState<'ready_documents' | 'ai_tailored'>('ready_documents');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const user = getCurrentUser();
      if (user && user.credits !== undefined) {
        setCredits(user.credits);
      } else {
        const savedCredits = localStorage.getItem('usc_app_credits');
        setCredits(savedCredits !== null ? parseInt(savedCredits, 10) : 5);
      }

      // Tracked Applications
      const stored = localStorage.getItem('tracked_applications');
      if (stored) {
        setApplications(JSON.parse(stored));
      } else {
        const sample: TrackedApplication[] = [
          {
            id: 'sample-app-1',
            jobTitle: 'Senior Full Stack Software Engineer (Cloud & AI)',
            company: 'Microsoft',
            status: 'Applied',
            salary: '$155,000 - $220,000 USD/yr',
            recruiterEmail: 'technical-talent@microsoft.com',
            jobUrl: 'https://careers.microsoft.com',
            notes: 'Applied with finalized ready CV. Recruiter screen beacon confirmed.',
            readyCvFileName: 'John_Smith_Senior_Engineer_Resume.pdf',
            readyCvText: `JOHN SMITH\njohn.smith@gmail.com | +1 (555) 019-2831\nU.S. Permanent Resident / Green Card\n\nPROFESSIONAL SUMMARY\nSenior Full Stack Engineer with 7+ years developing distributed cloud services, Node.js microservices, and modern TypeScript frontends.\n\nTECHNICAL SKILLS\nTypeScript, React, Next.js, Node.js, AWS, Azure, PostgreSQL, Docker, Kubernetes.\n\nEXPERIENCE\nLead Full Stack Architect | Enterprise Cloud Solutions\n• Spearheaded migration of legacy services to Next.js and AWS serverless, improving page speed by 42%.\n• Designed multi-tenant REST APIs processing 5M+ daily requests.`,
            readyCoverLetterFileName: 'Microsoft_Senior_Engineer_Cover_Letter.docx',
            readyCoverLetterText: `Dear Microsoft Hiring Team,\n\nI am writing to express my strong enthusiasm for the Senior Full Stack Software Engineer position. With over seven years of production experience architecting high-scale cloud applications and leading asynchronous teams, I am confident in my ability to immediately contribute to Microsoft's cloud initiatives.\n\nThroughout my career, I have prioritized system resilience, clean code architecture, and high developer velocity. Having led projects that scaled to over 5 million daily requests, I bring deep hands-on expertise in distributed computing, modern React frameworks, and automated CI/CD pipelines.\n\nI hold full U.S. permanent residency and am available for immediate engagement. Thank you for your consideration, and I look forward to speaking with your engineering leadership.\n\nSincerely,\nJohn Smith`,
            submissionType: 'ready_documents',
            appliedDate: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString()
          },
          {
            id: 'sample-app-2',
            jobTitle: 'Registered Nurse (ICU / Critical Care)',
            company: 'Cedars-Sinai Medical Center',
            status: 'Interviewing',
            salary: '$95,000 - $138,000 USD/yr',
            recruiterEmail: 'nurse-recruiting@cshs.org',
            notes: 'Schedule A EB-3 hospital track. Submitted finalized CES credentials and ready nursing CV.',
            readyCvFileName: 'Nurse_Schedule_A_Clinical_CV.pdf',
            readyCvText: `CLINICAL RESUME - REGISTERED NURSE\nLicensure: Registered Nurse (NCLEX-RN Passed)\nCredentials: CGFNS CES Certified | BLS & ACLS Certified\nSpecialty: Critical Care / ICU / Post-Op Recovery\nExperience: 5 years clinical inpatient nursing with direct hemodynamic monitoring.`,
            submissionType: 'ready_documents',
            appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString().split('T')[0],
            updatedAt: new Date().toISOString()
          }
        ];
        setApplications(sample);
        localStorage.setItem('tracked_applications', JSON.stringify(sample));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, []);

  const saveToStorage = (updated: TrackedApplication[]) => {
    setApplications(updated);
    try {
      localStorage.setItem('tracked_applications', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: ApplicationStatus) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: nextStatus, updatedAt: new Date().toISOString() } : app
    );
    saveToStorage(updated);
  };

  const handleDelete = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    saveToStorage(updated);
  };

  // Ready CV File Upload
  const handleReadyCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewReadyCvFileName(file.name);

    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewReadyCvText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    } else {
      setNewReadyCvText(`[Uploaded Finalized Document: ${file.name}]\n\nReady candidate CV successfully attached to this tracked application.\nSize: ${(file.size / 1024).toFixed(1)} KB\nSubmitted directly for employer consideration.`);
    }
  };

  // Ready Cover Letter File Upload
  const handleReadyCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewReadyCoverLetterFileName(file.name);

    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewReadyCoverLetterText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    } else {
      setNewReadyCoverLetterText(`[Uploaded Finalized Cover Letter: ${file.name}]\n\nCandidate's customized cover letter attached for ${newCompany || 'this employer'}.\nSize: ${(file.size / 1024).toFixed(1)} KB`);
    }
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newApp: TrackedApplication = {
      id: `custom-${Date.now()}`,
      jobTitle: newTitle.trim(),
      company: newCompany.trim(),
      salary: newSalary.trim() || 'Competitive USD',
      jobUrl: newJobUrl.trim(),
      recruiterEmail: newRecruiterEmail.trim(),
      jobDescription: newJobDesc.trim(),
      notes: newNotes.trim() || 'Custom tracked application.',
      readyCvText: newReadyCvText.trim(),
      readyCvFileName: newReadyCvFileName.trim() || (newReadyCvText.trim() ? 'Pasted_Ready_CV.txt' : undefined),
      readyCoverLetterText: newReadyCoverLetterText.trim(),
      readyCoverLetterFileName: newReadyCoverLetterFileName.trim() || (newReadyCoverLetterText.trim() ? 'Pasted_Ready_Cover_Letter.txt' : undefined),
      submissionType: newSubmissionType,
      status: newStatus,
      appliedDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString()
    };

    saveToStorage([newApp, ...applications]);
    
    // Reset Form
    setNewTitle('');
    setNewCompany('');
    setNewSalary('');
    setNewJobUrl('');
    setNewRecruiterEmail('');
    setNewJobDesc('');
    setNewNotes('');
    setNewReadyCvText('');
    setNewReadyCvFileName('');
    setNewReadyCoverLetterText('');
    setNewReadyCoverLetterFileName('');
    setActiveModalTab('job');
    setShowAddModal(false);
  };

  const handleCopyText = (typeKey: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleExportCsv = () => {
    if (applications.length === 0) return;
    const headers = ['ID', 'Job Title', 'Company', 'Status', 'Salary', 'Applied Date', 'Recruiter Email', 'Has Ready CV', 'Notes'];
    const rows = applications.map(a => [
      `"${a.id}"`,
      `"${a.jobTitle.replace(/"/g, '""')}"`,
      `"${a.company.replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${(a.salary || '').replace(/"/g, '""')}"`,
      `"${a.appliedDate || ''}"`,
      `"${(a.recruiterEmail || '').replace(/"/g, '""')}"`,
      `"${a.readyCvFileName ? 'Yes' : 'No'}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `US_Career_Solutions_Pipeline_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusColors: Record<ApplicationStatus, string> = {
    Saved: 'bg-slate-100 text-slate-700 border-slate-200',
    Applied: 'bg-blue-50 text-blue-700 border-blue-200',
    Interviewing: 'bg-amber-50 text-amber-700 border-amber-200',
    Offered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
            Multi-Dimensional Job CRM & Career Copilot
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Universal Job Application Pipeline
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track internal & external applications from LinkedIn, Indeed, or email. Submit your ready CV and cover letter, or use 1-click ATS tailoring.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            disabled={applications.length === 0}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl shadow-sm transition-colors disabled:opacity-50"
            title="Download full pipeline as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          {/* Credit Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
            <div className="text-xs">
              <span className="font-extrabold text-slate-900">{credits}</span>
              <span className="text-slate-500 font-medium"> Apps Available</span>
            </div>
          </div>

          {/* Add Application Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add External Job / Ready CV</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {(['Saved', 'Applied', 'Interviewing', 'Offered', 'Rejected'] as ApplicationStatus[]).map(status => {
          const count = applications.filter(a => a.status === status).length;
          return (
            <div key={status} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-blue-300 transition-colors">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{status}</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map(app => {
            const isExpanded = expandedIntelligenceId === app.id;
            const inMailMessage = `Hi [Recruiter Name], I recently submitted my application for the ${app.jobTitle} position at ${app.company}. With direct experience in our industry and verified work authorization, I would love to connect and introduce my portfolio. Thank you!`;
            const followUpEmail = `Subject: Following up on ${app.jobTitle} application - [My Name]\n\nDear ${app.company} Recruiting Team,\n\nI hope you are having a productive week. I recently submitted my application for the ${app.jobTitle} opening on ${app.appliedDate || 'this week'}.\n\nI remain deeply excited about the role and confident in my ability to hit the ground running. Please let me know if any additional work samples or references would be helpful as you review candidates.\n\nBest regards,\n[Your Name]`;

            return (
              <div 
                key={app.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all overflow-hidden"
              >
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Job Details */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                      {app.appliedDate && (
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {app.appliedDate}
                        </span>
                      )}

                      {/* Document Badges */}
                      {app.readyCvFileName ? (
                        <span className="text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <FileText className="w-3 h-3 text-blue-600" />
                          Ready CV Attached
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                          Standard CV
                        </span>
                      )}

                      {app.readyCoverLetterFileName && (
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <FileCheck className="w-3 h-3 text-emerald-600" />
                          Ready Cover Letter Attached
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {app.jobTitle}
                    </h3>

                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1 font-bold text-slate-800">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {app.company}
                      </span>
                      {app.salary && (
                        <span className="flex items-center gap-0.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          <DollarSign className="w-3.5 h-3.5" />
                          {app.salary}
                        </span>
                      )}
                      {app.recruiterEmail && (
                        <span className="flex items-center gap-1 text-slate-600 font-mono text-xs">
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                          {app.recruiterEmail}
                        </span>
                      )}
                      {app.jobUrl && (
                        <a
                          href={app.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline text-xs font-semibold"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Job Link</span>
                        </a>
                      )}
                    </div>

                    {/* Attached Ready Document Actions */}
                    {(app.readyCvText || app.readyCoverLetterText) && (
                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        {app.readyCvText && (
                          <button
                            type="button"
                            onClick={() => setPreviewDocModal({
                              title: `Attached Ready CV: ${app.readyCvFileName || app.jobTitle}`,
                              content: app.readyCvText!,
                              type: 'CV'
                            })}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>Preview Attached CV</span>
                          </button>
                        )}

                        {app.readyCoverLetterText && (
                          <button
                            type="button"
                            onClick={() => setPreviewDocModal({
                              title: `Attached Cover Letter: ${app.readyCoverLetterFileName || app.company}`,
                              content: app.readyCoverLetterText!,
                              type: 'Cover Letter'
                            })}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Preview Cover Letter</span>
                          </button>
                        )}
                      </div>
                    )}

                    {app.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-2 font-mono leading-relaxed">
                        {app.notes}
                      </p>
                    )}

                    {/* Milestone Visual Progression */}
                    <div className="pt-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div className={`p-2 rounded-xl border text-center transition-colors ${
                          ['Applied', 'Interviewing', 'Offered'].includes(app.status)
                            ? 'bg-blue-50 border-blue-200 text-blue-900'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                          <div className="text-xs font-bold">1. Dispatched</div>
                          <div className="text-[10px] text-slate-500">Day 0</div>
                        </div>

                        <div className={`p-2 rounded-xl border text-center transition-colors ${
                          ['Interviewing', 'Offered'].includes(app.status)
                            ? 'bg-amber-50 border-amber-200 text-amber-900 font-bold'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                          <div className="text-xs font-bold">2. Under Review</div>
                          <div className="text-[10px] text-slate-500">Day 2-4 Screen</div>
                        </div>

                        <div className={`p-2 rounded-xl border text-center transition-colors ${
                          app.status === 'Offered'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                          <div className="text-xs font-bold">3. Interview / Offer</div>
                          <div className="text-[10px] text-slate-500">Day 5-10 Decision</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Intelligence Drawer Toggle */}
                  <div className="flex flex-col gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 justify-between w-full lg:w-48">
                    <div className="flex items-center justify-between lg:flex-col lg:items-stretch gap-2">
                      <label className="text-xs font-bold text-slate-500">Pipeline Stage:</label>
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                        className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Saved">Stage: Saved</option>
                        <option value="Applied">Stage: Applied</option>
                        <option value="Interviewing">Stage: Interviewing</option>
                        <option value="Offered">Stage: Offered</option>
                        <option value="Rejected">Stage: Rejected</option>
                      </select>
                    </div>

                    {/* Recruiter Intelligence Toggle */}
                    <button
                      type="button"
                      onClick={() => setExpandedIntelligenceId(isExpanded ? null : app.id)}
                      className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        Outreach Sequences
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Link
                        href={`/tools/ats-scanner?jobTitle=${encodeURIComponent(app.jobTitle)}&company=${encodeURIComponent(app.company)}`}
                        className="p-2 rounded-xl text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                        title="Re-scan ATS Keywords with AI"
                      >
                        <Sparkles className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Recruiter Outreach Drawer */}
                {isExpanded && (
                  <div className="bg-slate-50/80 p-5 sm:p-6 border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        Multi-Stage Recruiter Outreach for {app.company}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">1-Click Copy Ready</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* LinkedIn InMail Message */}
                      <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                            LinkedIn Connect Note (&lt; 300 chars)
                          </span>
                          <button
                            onClick={() => handleCopyText(`inmail-${app.id}`, inMailMessage)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                          >
                            {copiedType === `inmail-${app.id}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                          {inMailMessage}
                        </p>
                      </div>

                      {/* Day 4 Follow-up Email */}
                      <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-emerald-600" />
                            Milestone Follow-up Email
                          </span>
                          <button
                            onClick={() => handleCopyText(`email-${app.id}`, followUpEmail)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                          >
                            {copiedType === `email-${app.id}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono whitespace-pre-line line-clamp-4">
                          {followUpEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No applications tracked yet</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            You can bring any job from LinkedIn or Indeed, submit your ready CV and cover letter, or browse our verified US openings.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Application</span>
            </button>
          </div>
        </div>
      )}

      {/* Multi-Dimensional Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Add Application & Submit Ready Documents
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track any role and attach your finalized ready CV and cover letter.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl my-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveModalTab('job')}
                className={`py-2 rounded-lg transition-colors ${
                  activeModalTab === 'job' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Job Details
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('ready_docs')}
                className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                  activeModalTab === 'ready_docs' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Ready CV & Letter</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('outreach')}
                className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                  activeModalTab === 'outreach' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>3. Recruiter Outreach</span>
              </button>
            </div>

            <form onSubmit={handleAddApplication} className="space-y-4">
              
              {/* Tab 1: Job Details */}
              {activeModalTab === 'job' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Hospital / Lab *
                      </label>
                      <input
                        type="text"
                        required
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        placeholder="e.g. Google, Stanford, Mayo Clinic"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Salary or Budget
                      </label>
                      <input
                        type="text"
                        value={newSalary}
                        onChange={(e) => setNewSalary(e.target.value)}
                        placeholder="e.g. $120,000 - $160,000 /yr"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Initial Pipeline Stage
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                      >
                        <option value="Saved">Saved / Prospect</option>
                        <option value="Applied">Applied (Dispatched)</option>
                        <option value="Interviewing">Interviewing / Screen</option>
                        <option value="Offered">Offered</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Job Posting URL / Link (LinkedIn, Indeed, Career Site)
                    </label>
                    <input
                      type="url"
                      value={newJobUrl}
                      onChange={(e) => setNewJobUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/jobs/view/..."
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Notes & Deadlines
                    </label>
                    <textarea
                      rows={2}
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="e.g. Referred by engineer on LinkedIn; Application deadline Oct 30..."
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab('ready_docs')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                    >
                      <span>Next: Attach Ready Documents</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Submit Ready CV & Cover Letter */}
              {activeModalTab === 'ready_docs' && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-extrabold text-blue-900">Submission Mode:</div>
                      <div className="text-blue-700 text-[11px]">Attach your finalized ready CV/Letter without forced alterations</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNewSubmissionType('ready_documents')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          newSubmissionType === 'ready_documents'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        Use Ready Docs
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewSubmissionType('ai_tailored')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          newSubmissionType === 'ai_tailored'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        AI Tailor
                      </button>
                    </div>
                  </div>

                  {/* Ready CV Section */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-blue-600" />
                        Attach Ready CV / Resume
                      </label>
                      <label className="cursor-pointer text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">
                        <Upload className="w-3 h-3" />
                        <span>Upload File (.pdf/.docx/.txt)</span>
                        <input
                          type="file"
                          accept=".pdf,.docx,.txt"
                          onChange={handleReadyCvUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {newReadyCvFileName && (
                      <div className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Attached file: {newReadyCvFileName}</span>
                      </div>
                    )}

                    <textarea
                      rows={3}
                      value={newReadyCvText}
                      onChange={(e) => setNewReadyCvText(e.target.value)}
                      placeholder="Or paste your finalized ready CV text here directly..."
                      className="w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Ready Cover Letter Section */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        Attach Ready Cover Letter
                      </label>
                      <label className="cursor-pointer text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">
                        <Upload className="w-3 h-3" />
                        <span>Upload Letter (.docx/.pdf/.txt)</span>
                        <input
                          type="file"
                          accept=".pdf,.docx,.txt"
                          onChange={handleReadyCoverLetterUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {newReadyCoverLetterFileName && (
                      <div className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Attached letter: {newReadyCoverLetterFileName}</span>
                      </div>
                    )}

                    <textarea
                      rows={3}
                      value={newReadyCoverLetterText}
                      onChange={(e) => setNewReadyCoverLetterText(e.target.value)}
                      placeholder="Or paste your finalized cover letter text here..."
                      className="w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab('job')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTab('outreach')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                    >
                      <span>Next: Recruiter Outreach</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Recruiter Outreach & Sequences */}
              {activeModalTab === 'outreach' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Recruiter / Hiring Manager Email
                    </label>
                    <input
                      type="email"
                      value={newRecruiterEmail}
                      onChange={(e) => setNewRecruiterEmail(e.target.value)}
                      placeholder="e.g. talent-acquisition@company.com or sarah.recruiter@hospital.org"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Our CRM will generate follow-up email sequences and LinkedIn connection notes for this contact.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Paste External Job Description (For AI Keyword Analysis)
                    </label>
                    <textarea
                      rows={4}
                      value={newJobDesc}
                      onChange={(e) => setNewJobDesc(e.target.value)}
                      placeholder="Paste the full job requirements from LinkedIn or Indeed to automatically generate tailored follow-up templates..."
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab('ready_docs')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600"
                    >
                      ← Back
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition-all"
                      >
                        Save & Track Application
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      )}

      {/* Preview Document Modal */}
      {previewDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">
                  {previewDocModal.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDocModal(null)}
                className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[50vh] overflow-y-auto text-slate-800">
              {previewDocModal.content}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(previewDocModal.content);
                  setCopiedType('preview-modal');
                  setTimeout(() => setCopiedType(null), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                {copiedType === 'preview-modal' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Document Text</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setPreviewDocModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
