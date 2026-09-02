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
  ArrowRight
} from 'lucide-react';
import { TrackedApplication, ApplicationStatus } from '@/lib/types';

export default function TrackerPage() {
  const [applications, setApplications] = useState<TrackedApplication[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Applied');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tracked_applications');
      if (stored) {
        setApplications(JSON.parse(stored));
      } else {
        // Seed a sample application if empty
        const sample: TrackedApplication[] = [
          {
            id: 'sample-app-1',
            jobTitle: 'Senior Full Stack Software Engineer (Cloud & AI)',
            company: 'Microsoft',
            status: 'Applied',
            salary: '$155,000 - $220,000 /yr',
            notes: 'H-1B sponsorship confirmed. Submitted ATS-tailored resume on official careers portal.',
            appliedDate: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString()
          },
          {
            id: 'sample-app-2',
            jobTitle: 'AI / Machine Learning Research Engineer',
            company: 'Stanford University',
            status: 'Interviewing',
            salary: '$130,000 - $180,000 /yr',
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
      salary: newSalary.trim() || 'Competitive',
      notes: newNotes.trim(),
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

  const statusColors: Record<ApplicationStatus, string> = {
    Saved: 'bg-slate-100 text-slate-700 border-slate-200',
    Applied: 'bg-blue-50 text-blue-700 border-blue-200',
    Interviewing: 'bg-amber-50 text-amber-700 border-amber-200',
    Offered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            Candidate Application CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My US Job Tracker & Pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize every saved opening, tailored submission, and interview loop in one dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Application
          </button>
        </div>
      </div>

      {/* Pipeline Summary Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {(['Saved', 'Applied', 'Interviewing', 'Offered', 'Rejected'] as ApplicationStatus[]).map(status => {
          const count = applications.filter(a => a.status === status).length;
          return (
            <div key={status} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">{status}</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {applications.map(app => (
              <div key={app.id} className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                    {app.appliedDate && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Applied: {app.appliedDate}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                    {app.jobTitle}
                  </h3>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 flex-wrap">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {app.company}
                    </span>
                    {app.salary && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <DollarSign className="w-3.5 h-3.5" />
                        {app.salary}
                      </span>
                    )}
                  </div>

                  {app.notes && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2">
                      {app.notes}
                    </p>
                  )}
                </div>

                {/* Actions & Status Changer */}
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap shrink-0">
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                    className="text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Saved">Stage: Saved</option>
                    <option value="Applied">Stage: Applied</option>
                    <option value="Interviewing">Stage: Interviewing</option>
                    <option value="Offered">Stage: Offered</option>
                    <option value="Rejected">Stage: Rejected</option>
                  </select>

                  <Link
                    href={`/tools/ats-scanner?jobTitle=${encodeURIComponent(app.jobTitle)}&company=${encodeURIComponent(app.company)}`}
                    className="p-2 rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                    title="Tailor resume for this"
                  >
                    <Sparkles className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No applications tracked yet</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Browse our daily US jobs and click the bookmark button, or add an application manually.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse US Jobs <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Manual Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Add New Tracked Application
            </h3>

            <form onSubmit={handleAddApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lead Software Engineer"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Amazon, Mayo Clinic, Tesla"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Salary (Optional)
                  </label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. $140,000 /yr"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Stage
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes / Interview Dates
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Contacted recruiter on LinkedIn, HR interview on Friday..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
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
