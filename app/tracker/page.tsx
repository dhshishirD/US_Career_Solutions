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
  MessageSquare
} from 'lucide-react';
import { TrackedApplication, ApplicationStatus } from '@/lib/types';

export default function TrackerPage() {
  const [applications, setApplications] = useState<TrackedApplication[]>([]);
  const [credits, setCredits] = useState<number>(3);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedIntelligenceId, setExpandedIntelligenceId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Applied');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      // 1. Credits
      const savedCredits = localStorage.getItem('usc_app_credits');
      if (savedCredits !== null) {
        setCredits(parseInt(savedCredits, 10));
      } else {
        localStorage.setItem('usc_app_credits', '3');
        setCredits(3);
      }

      // 2. Tracked Applications
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
            notes: 'Dispatched via Platform AI Dossier. ATS Match: 92%. Tracking ID: USC-841902. Recruiter read beacon active.',
            appliedDate: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString()
          },
          {
            id: 'sample-app-2',
            jobTitle: 'AI / Machine Learning Research Engineer',
            company: 'Stanford University',
            status: 'Interviewing',
            salary: '$130,000 - $180,000 USD/yr',
            notes: 'Cap-Exempt H-1B role. Initial recruiter screen scheduled for next Tuesday.',
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

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newApp: TrackedApplication = {
      id: `custom-${Date.now()}`,
      jobTitle: newTitle.trim(),
      company: newCompany.trim(),
      salary: newSalary.trim() || 'Competitive USD',
      notes: newNotes.trim() || 'Manually logged application.',
      status: newStatus,
      appliedDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString()
    };

    saveToStorage([newApp, ...applications]);
    setNewTitle('');
    setNewCompany('');
    setNewSalary('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const handleCopyText = (typeKey: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const statusColors: Record<ApplicationStatus, string> = {
    Saved: 'bg-slate-100 text-slate-700 border-slate-200',
    Applied: 'bg-blue-50 text-blue-700 border-blue-200',
    Interviewing: 'bg-amber-50 text-amber-700 border-amber-200',
    Offered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const stages: { status: ApplicationStatus; label: string; day: string }[] = [
    { status: 'Applied', label: '1. Dispatched', day: 'Day 0' },
    { status: 'Interviewing', label: '2. Under Review / Screen', day: 'Day 2-4' },
    { status: 'Offered', label: '3. Technical / Partner Loop', day: 'Day 5-10' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
            Verified Candidate CRM & Real-Time Tracking
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My U.S. Job Application Pipeline
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track dispatches, ATS keyword compatibility, recruiter response milestones, and hiring manager outreach.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Credit Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <div className="text-xs">
              <span className="font-extrabold text-slate-900">{credits}</span>
              <span className="text-slate-500 font-medium"> Apps Available</span>
            </div>
            {credits === 0 && (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                Refill
              </span>
            )}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
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
            const inMailMessage = `Hi [Recruiter Name], I recently submitted my application for the ${app.jobTitle} position at ${app.company} via US Career Solutions. With direct experience in our industry and verified work authorization, I would love to connect and introduce my portfolio. Thank you!`;
            const followUpEmail = `Subject: Following up on ${app.jobTitle} application - [My Name]\n\nDear ${app.company} Recruiting Team,\n\nI hope you are having a productive week. I recently submitted my tailored application dossier for the ${app.jobTitle} opening on ${app.appliedDate || 'this week'}.\n\nI remain deeply excited about the role and confident in my ability to hit the ground running. Please let me know if any additional work samples or references would be helpful as you review candidates.\n\nBest regards,\n[Your Name]`;

            return (
              <div 
                key={app.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all overflow-hidden"
              >
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Job Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                      {app.appliedDate && (
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          Applied: {app.appliedDate}
                        </span>
                      )}
                      <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Delivery
                      </span>
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
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-2 font-mono leading-relaxed">
                        {app.notes}
                      </p>
                    )}

                    {/* Milestone Visual Progression */}
                    <div className="pt-3">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Response Milestone Tracker
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className={`p-2 rounded-xl border text-center transition-colors ${
                          ['Applied', 'Interviewing', 'Offered'].includes(app.status)
                            ? 'bg-blue-50 border-blue-200 text-blue-900'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                          <div className="text-xs font-bold">1. Dispatched</div>
                          <div className="text-[10px] text-slate-500">Day 0 (Delivered)</div>
                        </div>

                        <div className={`p-2 rounded-xl border text-center transition-colors ${
                          ['Interviewing', 'Offered'].includes(app.status)
                            ? 'bg-amber-50 border-amber-200 text-amber-900 font-bold'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                          <div className="text-xs font-bold">2. Under Review</div>
                          <div className="text-[10px] text-slate-500">Day 2-4 (Recruiter Beacon)</div>
                        </div>

                        <div className={`p-2 rounded-xl border text-center transition-colors ${
                          app.status === 'Offered'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                          <div className="text-xs font-bold">3. Interview / Offer</div>
                          <div className="text-[10px] text-slate-500">Day 5-10 (Decision)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Intelligence Drawer Toggle */}
                  <div className="flex flex-col gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 justify-between">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-500">Stage:</label>
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
                      className="inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        Recruiter Intelligence
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Link
                        href={`/tools/ats-scanner?jobTitle=${encodeURIComponent(app.jobTitle)}&company=${encodeURIComponent(app.company)}`}
                        className="p-2 rounded-xl text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                        title="Re-scan ATS Keywords"
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

                {/* Recruiter Intelligence Drawer (Light Luxury Expandable) */}
                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-200 p-5 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          🎯
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          Direct Hiring Manager Outreach Intelligence ({app.company})
                        </h4>
                      </div>
                      
                      <a
                        href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(app.company + ' recruiter OR talent acquisition')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:shadow"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                        <span>Find {app.company} Recruiters on LinkedIn</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* LinkedIn InMail Message */}
                      <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                            3-Line LinkedIn Connect Note
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
                                <span>Copy Note</span>
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
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            Day 4 Milestone Follow-up Email
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
                                <span>Copy Email</span>
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
            Browse our verified US jobs and click <strong>🚀 Direct Apply</strong> to submit with 1-click ATS tailoring and live status tracking.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition-all"
            >
              <span>Explore Verified US Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Manual Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-slate-900 mb-4">
              Add New Tracked Application
            </h3>

            <form onSubmit={handleAddApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lead Software Engineer"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Amazon, Mayo Clinic, Tesla"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Salary (Optional)
                  </label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. $140,000 /yr"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Initial Stage
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                  >
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes / Interview Dates
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Contacted recruiter on LinkedIn, HR interview on Friday..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
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
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
