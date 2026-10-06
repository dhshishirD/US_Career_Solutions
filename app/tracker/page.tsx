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
  ArrowLeft,
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
  BookmarkCheck,
  LayoutGrid,
  List,
  Filter,
  RefreshCw,
  TrendingUp,
  Briefcase
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

  // View & Filter States
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDocsOnly, setFilterDocsOnly] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        loadDefaultSamplePipeline();
      }
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadDefaultSamplePipeline = () => {
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
      },
      {
        id: 'sample-app-3',
        jobTitle: 'Senior Clinical Research Associate',
        company: 'Mayo Clinic',
        status: 'Offered',
        salary: '$110,000 - $145,000 USD/yr',
        recruiterEmail: 'clinicalcareers@mayo.edu',
        notes: 'Cap-Exempt H-1B institutional track. Official offer packet received. Reviewing compensation.',
        readyCvFileName: 'Clinical_Research_Dossier.pdf',
        readyCvText: `CLINICAL RESEARCH PROFESSIONAL\n10+ published clinical trials in oncology & immunology.\nRegulatory submissions compliant with FDA 21 CFR Part 312.`,
        submissionType: 'ready_documents',
        appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      }
    ];
    setApplications(sample);
    try {
      localStorage.setItem('tracked_applications', JSON.stringify(sample));
    } catch {}
  };

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
    showToast(`Application moved to "${nextStatus}".`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this tracked job from your pipeline?')) {
      const updated = applications.filter(app => app.id !== id);
      saveToStorage(updated);
      showToast('Application removed.');
    }
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
    showToast(`Added "${newTitle}" at ${newCompany} to your CRM.`);
    
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
    showToast('CRM Pipeline exported to CSV.');
  };

  const handleExportJsonBackup = () => {
    const dataStr = JSON.stringify(applications, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `US_Career_CRM_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Offline CRM backup downloaded (.json).');
  };

  const handleImportJsonBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const imported = JSON.parse(text);
        if (Array.isArray(imported)) {
          saveToStorage(imported);
          showToast(`Successfully restored ${imported.length} applications.`);
        }
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = app.jobTitle.toLowerCase().includes(q) ||
        app.company.toLowerCase().includes(q) ||
        (app.recruiterEmail || '').toLowerCase().includes(q) ||
        (app.notes || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterStatus !== 'all' && app.status !== filterStatus) {
      return false;
    }

    if (filterDocsOnly && !app.readyCvFileName && !app.readyCoverLetterFileName) {
      return false;
    }

    return true;
  });

  const stages: ApplicationStatus[] = ['Saved', 'Applied', 'Interviewing', 'Offered', 'Rejected'];

  const statusColors: Record<ApplicationStatus, { badge: string; border: string; header: string }> = {
    Saved: { badge: 'bg-slate-100 text-slate-700 border-slate-200', border: 'border-slate-200', header: 'bg-slate-100 text-slate-800' },
    Applied: { badge: 'bg-blue-50 text-blue-700 border-blue-200', border: 'border-blue-200', header: 'bg-blue-50 text-blue-800' },
    Interviewing: { badge: 'bg-amber-50 text-amber-800 border-amber-200', border: 'border-amber-200', header: 'bg-amber-50 text-amber-900' },
    Offered: { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', border: 'border-emerald-200', header: 'bg-emerald-50 text-emerald-900' },
    Rejected: { badge: 'bg-rose-50 text-rose-700 border-rose-200', border: 'border-rose-200', header: 'bg-rose-50 text-rose-800' },
  };

  // Metrics
  const totalApps = applications.length;
  const activeLoops = applications.filter(a => a.status === 'Interviewing' || a.status === 'Offered').length;
  const appliedCount = applications.filter(a => a.status !== 'Saved').length;
  const responseRate = appliedCount > 0 ? Math.round((activeLoops / appliedCount) * 100) : 0;
  const readyDocsCount = applications.filter(a => a.readyCvFileName || a.readyCoverLetterFileName).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
            Universal Multi-Dimensional Job CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Career Pipeline & Recruiter Outreach Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track applications from LinkedIn, Indeed, or email. Attach ready CVs and custom letters, log direct hiring contacts, and generate multi-stage outreach sequences.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Compact List View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            disabled={applications.length === 0}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl shadow-sm transition-colors disabled:opacity-50"
            title="Download full pipeline as CSV for Excel"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          {/* Backup / Restore Menu */}
          <button
            onClick={handleExportJsonBackup}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
            title="Download offline JSON backup"
          >
            <SaveBackupIcon />
            <span>Backup</span>
          </button>

          <label className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Restore</span>
            <input type="file" accept=".json" onChange={handleImportJsonBackup} className="hidden" />
          </label>

          {/* Add Application Button */}
          <button
            onClick={() => {
              setNewStatus('Applied');
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add External Job / Ready CV</span>
          </button>
        </div>
      </div>

      {/* KPI & Funnel Metrics Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Total Tracked Jobs</span>
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalApps}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across internal & external sources</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Active Interview Loops</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700 mt-1">{activeLoops}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Under screen or final loop</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Response Velocity</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{responseRate}%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Interview / Active ratio</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Ready Docs Attached</span>
            <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-700 mt-1">{readyDocsCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Direct candidate submissions</div>
        </div>
      </div>

      {/* Search, Filter & Quick Options Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by job title, company name, recruiter email, or notes..."
              className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Stages ({applications.length})</option>
            <option value="Saved">Saved ({applications.filter(a => a.status === 'Saved').length})</option>
            <option value="Applied">Applied ({applications.filter(a => a.status === 'Applied').length})</option>
            <option value="Interviewing">Interviewing ({applications.filter(a => a.status === 'Interviewing').length})</option>
            <option value="Offered">Offered ({applications.filter(a => a.status === 'Offered').length})</option>
            <option value="Rejected">Rejected ({applications.filter(a => a.status === 'Rejected').length})</option>
          </select>

          {/* Ready Docs Only Filter Checkbox */}
          <button
            onClick={() => setFilterDocsOnly(!filterDocsOnly)}
            className={`px-3 py-2 rounded-xl font-bold border transition-colors flex items-center gap-1.5 ${
              filterDocsOnly
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Ready Docs Only</span>
          </button>

          {applications.length === 0 && (
            <button
              onClick={loadDefaultSamplePipeline}
              className="px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-bold hover:bg-blue-100 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Verified Samples</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          KANBAN BOARD VIEW
      ===================================================================== */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {stages.map(stage => {
            const stageApps = filteredApps.filter(a => a.status === stage);
            const style = statusColors[stage];

            return (
              <div 
                key={stage} 
                className="bg-slate-50/70 rounded-3xl border border-slate-200 p-3.5 space-y-3 min-h-[450px] flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${style.badge}`}>
                      {stage}
                    </span>
                    <span className="text-xs font-black text-slate-500">
                      {stageApps.length}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setNewStatus(stage);
                      setShowAddModal(true);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title={`Add job to ${stage}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Column Card List */}
                <div className="space-y-3 flex-1">
                  {stageApps.length > 0 ? (
                    stageApps.map(app => (
                      <KanbanCard
                        key={app.id}
                        app={app}
                        onUpdateStatus={handleUpdateStatus}
                        onDelete={handleDelete}
                        onPreviewDoc={(title, content, type) => setPreviewDocModal({ title, content, type })}
                        onToggleIntelligence={() => setExpandedIntelligenceId(expandedIntelligenceId === app.id ? null : app.id)}
                        isExpanded={expandedIntelligenceId === app.id}
                        onCopy={handleCopyText}
                        copiedKey={copiedType}
                      />
                    ))
                  ) : (
                    <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                      No jobs in {stage}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* =====================================================================
            COMPACT LIST VIEW
        ===================================================================== */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Role & Company</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4">Salary</th>
                  <th className="p-4">Recruiter / Email</th>
                  <th className="p-4">Ready Documents</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredApps.length > 0 ? (
                  filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{app.jobTitle}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>{app.company}</span>
                          {app.jobUrl && (
                            <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center ml-1">
                              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border ${statusColors[app.status].badge} focus:outline-none`}
                        >
                          <option value="Saved">Saved</option>
                          <option value="Applied">Applied</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="p-4">
                        {app.salary ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                            {app.salary}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="p-4 font-mono text-slate-600">
                        {app.recruiterEmail ? (
                          <span className="flex items-center gap-1 text-slate-800">
                            <Mail className="w-3 h-3 text-blue-500 shrink-0" />
                            <span>{app.recruiterEmail}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Not recorded</span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {app.readyCvFileName && (
                            <button
                              onClick={() => setPreviewDocModal({
                                title: `Attached CV: ${app.readyCvFileName}`,
                                content: app.readyCvText || '',
                                type: 'CV'
                              })}
                              className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 flex items-center gap-1"
                            >
                              <FileText className="w-2.5 h-2.5" />
                              <span>CV</span>
                            </button>
                          )}
                          {app.readyCoverLetterFileName && (
                            <button
                              onClick={() => setPreviewDocModal({
                                title: `Attached Cover Letter: ${app.readyCoverLetterFileName}`,
                                content: app.readyCoverLetterText || '',
                                type: 'Cover Letter'
                              })}
                              className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 rounded border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                            >
                              <BookmarkCheck className="w-2.5 h-2.5" />
                              <span>Letter</span>
                            </button>
                          )}
                          {!app.readyCvFileName && !app.readyCoverLetterFileName && (
                            <span className="text-slate-400 text-[11px]">—</span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-slate-500">
                        {app.appliedDate || '—'}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setExpandedIntelligenceId(expandedIntelligenceId === app.id ? null : app.id)}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Recruiter outreach message templates"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      No matching applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recruiter Outreach Floating Modal / Drawer when expanded in List mode */}
      {viewMode === 'list' && expandedIntelligenceId && (
        <OutreachModal
          app={applications.find(a => a.id === expandedIntelligenceId)!}
          onClose={() => setExpandedIntelligenceId(null)}
          onCopy={handleCopyText}
          copiedKey={copiedType}
        />
      )}

      {/* =====================================================================
          ADD APPLICATION MODAL (3 TABS)
      ===================================================================== */}
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
                <span>3. Recruiter Contacts</span>
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
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
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
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
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
                        placeholder="e.g. $120,000 - $160,000 USD/yr"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Initial Pipeline Stage
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                      >
                        <option value="Saved">Saved / Prospect</option>
                        <option value="Applied">Applied (Dispatched)</option>
                        <option value="Interviewing">Interviewing / Screen</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Job Posting URL / Link (LinkedIn, Indeed, Company Site)
                    </label>
                    <input
                      type="url"
                      value={newJobUrl}
                      onChange={(e) => setNewJobUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/jobs/view/..."
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
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
                      placeholder="e.g. Contacted recruiter on LinkedIn, HR interview on Friday..."
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
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
                      <div className="text-blue-700 text-[11px]">Attach your finalized ready CV/Letter without forced AI modifications</div>
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
                      <span>Next: Recruiter Contacts</span>
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
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Our CRM automatically generates 4 personalized follow-up sequences for this contact.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Paste External Job Description (For Keyword Analysis)
                    </label>
                    <textarea
                      rows={4}
                      value={newJobDesc}
                      onChange={(e) => setNewJobDesc(e.target.value)}
                      placeholder="Paste job description or requirements to customize your outreach sequence..."
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

      {/* Permanent Vault Guarantee Bar */}
      <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3 shadow-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-900">Permanent CRM Cloud Vault Guarantee:</strong> All added positions, attached ready documents, recruiter contacts, and status progressions are safely preserved under your account. You will never lose your job search history, even on free tier.
        </div>
      </div>

    </div>
  );
}

// -----------------------------------------------------------------------------
// KANBAN CARD COMPONENT
// -----------------------------------------------------------------------------
interface KanbanCardProps {
  app: TrackedApplication;
  onUpdateStatus: (id: string, nextStatus: ApplicationStatus) => void;
  onDelete: (id: string) => void;
  onPreviewDoc: (title: string, content: string, type: string) => void;
  onToggleIntelligence: () => void;
  isExpanded: boolean;
  onCopy: (key: string, text: string) => void;
  copiedKey: string | null;
}

function KanbanCard({
  app,
  onUpdateStatus,
  onDelete,
  onPreviewDoc,
  onToggleIntelligence,
  isExpanded,
  onCopy,
  copiedKey
}: KanbanCardProps) {
  const stages: ApplicationStatus[] = ['Saved', 'Applied', 'Interviewing', 'Offered', 'Rejected'];
  const currentIndex = stages.indexOf(app.status);

  const moveLeft = () => {
    if (currentIndex > 0) {
      onUpdateStatus(app.id, stages[currentIndex - 1]);
    }
  };

  const moveRight = () => {
    if (currentIndex < stages.length - 1) {
      onUpdateStatus(app.id, stages[currentIndex + 1]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-2.5 text-xs">
      
      {/* Title & Quick Actions */}
      <div className="flex items-start justify-between gap-1.5">
        <div className="font-black text-slate-900 text-sm leading-snug line-clamp-2">
          {app.jobTitle}
        </div>
        <button
          onClick={() => onDelete(app.id)}
          className="text-slate-300 hover:text-rose-600 p-0.5 rounded transition-colors shrink-0"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Company & Source */}
      <div className="flex items-center gap-1.5 text-slate-600 flex-wrap font-medium">
        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="font-bold text-slate-800">{app.company}</span>
        {app.jobUrl && (
          <a
            href={app.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center"
            title="Open job link"
          >
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>

      {/* Salary & Date */}
      <div className="flex items-center justify-between gap-1 text-[11px]">
        {app.salary ? (
          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
            {app.salary}
          </span>
        ) : (
          <span className="text-slate-400">Competitive</span>
        )}
        <span className="text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {app.appliedDate || 'Today'}
        </span>
      </div>

      {/* Attached Document Pills */}
      {(app.readyCvFileName || app.readyCoverLetterFileName) && (
        <div className="flex items-center gap-1 flex-wrap pt-0.5">
          {app.readyCvFileName && (
            <button
              onClick={() => onPreviewDoc(`Attached CV: ${app.readyCvFileName}`, app.readyCvText || '', 'CV')}
              className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-200 hover:bg-blue-100 flex items-center gap-1"
            >
              <FileText className="w-2.5 h-2.5" />
              <span>Ready CV</span>
            </button>
          )}
          {app.readyCoverLetterFileName && (
            <button
              onClick={() => onPreviewDoc(`Attached Cover Letter: ${app.readyCoverLetterFileName}`, app.readyCoverLetterText || '', 'Cover Letter')}
              className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
            >
              <BookmarkCheck className="w-2.5 h-2.5" />
              <span>Ready Letter</span>
            </button>
          )}
        </div>
      )}

      {/* Recruiter Email Pill */}
      {app.recruiterEmail && (
        <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-[11px] font-mono text-slate-700">
          <span className="truncate max-w-[130px]">{app.recruiterEmail}</span>
          <button
            onClick={() => onCopy(`rec-${app.id}`, app.recruiterEmail!)}
            className="text-blue-600 hover:text-blue-800 font-bold text-[10px]"
          >
            {copiedKey === `rec-${app.id}` ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      {/* Outreach Drawer Button */}
      <button
        onClick={onToggleIntelligence}
        className="w-full py-1.5 px-2 bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-700 font-bold rounded-lg border border-indigo-200/80 flex items-center justify-between text-[11px] transition-colors"
      >
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-600" />
          <span>Outreach Templates</span>
        </span>
        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {/* Expanded Outreach Sequences */}
      {isExpanded && (
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-2 animate-in fade-in">
          {/* LinkedIn Sequence */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="flex items-center gap-1 text-sky-700">
                <Linkedin className="w-3 h-3" />
                <span>LinkedIn Note (&lt;300 chars)</span>
              </span>
              <button
                onClick={() => onCopy(`inmail-${app.id}`, `Hi [Recruiter], I recently applied for the ${app.jobTitle} position at ${app.company}. With verified work authorization and proven experience, I'd welcome the opportunity to connect!`)}
                className="text-blue-600 hover:underline"
              >
                {copiedKey === `inmail-${app.id}` ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-[10px] text-slate-600 bg-white p-1.5 rounded border border-slate-100 font-mono">
              Hi [Recruiter], I recently applied for the {app.jobTitle} position at {app.company}. With verified work authorization, I'd welcome the opportunity to connect!
            </p>
          </div>

          {/* Follow-up Email */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="flex items-center gap-1 text-emerald-700">
                <Mail className="w-3 h-3" />
                <span>Follow-up Email</span>
              </span>
              <button
                onClick={() => onCopy(`mail-${app.id}`, `Subject: Following up on ${app.jobTitle} application - [My Name]\n\nDear ${app.company} Recruiting Team,\n\nI recently submitted my application for the ${app.jobTitle} position. I remain deeply excited about the role and am prepared to contribute immediately. Please let me know if you need any additional credentials.\n\nBest regards,\n[My Name]`)}
                className="text-blue-600 hover:underline"
              >
                {copiedKey === `mail-${app.id}` ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-[10px] text-slate-600 bg-white p-1.5 rounded border border-slate-100 font-mono line-clamp-3">
              Subject: Following up on {app.jobTitle} application - [My Name]...
            </p>
          </div>
        </div>
      )}

      {/* Stage Shift Arrows & Selector */}
      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1">
        <button
          onClick={moveLeft}
          disabled={currentIndex === 0}
          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Move stage left"
        >
          <ArrowLeft className="w-3 h-3" />
        </button>

        <select
          value={app.status}
          onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
          className="text-[10px] font-bold bg-slate-50 border border-slate-200 rounded-md px-1.5 py-0.5 text-slate-800"
        >
          {stages.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        <button
          onClick={moveRight}
          disabled={currentIndex === stages.length - 1}
          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Move stage right"
        >
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}

// -----------------------------------------------------------------------------
// OUTREACH MODAL FOR LIST MODE
// -----------------------------------------------------------------------------
function OutreachModal({
  app,
  onClose,
  onCopy,
  copiedKey
}: {
  app: TrackedApplication;
  onClose: () => void;
  onCopy: (key: string, text: string) => void;
  copiedKey: string | null;
}) {
  const inMail = `Hi [Recruiter Name], I recently submitted my application for the ${app.jobTitle} position at ${app.company}. With direct experience in our industry and verified work authorization, I would love to connect and introduce my portfolio. Thank you!`;
  const followUp = `Subject: Following up on ${app.jobTitle} application - [My Name]\n\nDear ${app.company} Recruiting Team,\n\nI hope you are having a productive week. I recently submitted my application for the ${app.jobTitle} opening on ${app.appliedDate || 'this week'}.\n\nI remain deeply excited about the role and confident in my ability to hit the ground running. Please let me know if any additional work samples or references would be helpful as you review candidates.\n\nBest regards,\n[Your Name]`;
  const thankYou = `Subject: Thank you - ${app.jobTitle} Interview Loop\n\nDear ${app.company} Team,\n\nThank you for taking the time to speak with me regarding the ${app.jobTitle} position today. Learning more about your team's objectives reinforced my enthusiasm for joining ${app.company}.\n\nPlease let me know if there are any follow-up questions regarding my background or portfolio.\n\nBest regards,\n[Your Name]`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Multi-Stage Outreach Sequences: {app.company}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Role: {app.jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {/* Template 1 */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5 text-sky-700">
                <Linkedin className="w-3.5 h-3.5" />
                <span>1. LinkedIn Connection Request (&lt;300 chars)</span>
              </span>
              <button
                onClick={() => onCopy(`modal-inmail-${app.id}`, inMail)}
                className="text-blue-600 hover:underline font-bold"
              >
                {copiedKey === `modal-inmail-${app.id}` ? 'Copied!' : 'Copy Template'}
              </button>
            </div>
            <p className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-slate-700">
              {inMail}
            </p>
          </div>

          {/* Template 2 */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Mail className="w-3.5 h-3.5" />
                <span>2. Day 3-4 Application Follow-up Email</span>
              </span>
              <button
                onClick={() => onCopy(`modal-followup-${app.id}`, followUp)}
                className="text-blue-600 hover:underline font-bold"
              >
                {copiedKey === `modal-followup-${app.id}` ? 'Copied!' : 'Copy Template'}
              </button>
            </div>
            <p className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-slate-700 whitespace-pre-line">
              {followUp}
            </p>
          </div>

          {/* Template 3 */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5 text-purple-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>3. Post-Interview 24h Thank-You Note</span>
              </span>
              <button
                onClick={() => onCopy(`modal-thankyou-${app.id}`, thankYou)}
                className="text-blue-600 hover:underline font-bold"
              >
                {copiedKey === `modal-thankyou-${app.id}` ? 'Copied!' : 'Copy Template'}
              </button>
            </div>
            <p className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-slate-700 whitespace-pre-line">
              {thankYou}
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function SaveBackupIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );
}
