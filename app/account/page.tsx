'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Briefcase, 
  Bookmark, 
  Sparkles, 
  Bell, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Edit3, 
  Trash2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { 
  CandidateProfile, 
  getCandidateProfile, 
  saveCandidateProfile, 
  clearCandidateSession 
} from '@/lib/candidate-auth';

interface TrackedApplication {
  id: string;
  jobTitle: string;
  company: string;
  status: 'Saved' | 'Applied' | 'Interview Scheduled' | 'Offer Received';
  salary?: string;
  notes?: string;
  updatedAt: string;
}

export default function AccountPage() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'tracker' | 'pitch' | 'alerts' | 'profile'>('tracker');
  const [trackedApps, setTrackedApps] = useState<TrackedApplication[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Sign In / Create Profile Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [targetRole, setTargetRole] = useState('Customer Support & Helpdesk');
  const [experienceLevel, setExperienceLevel] = useState('1 - 3 Years');
  const [country, setCountry] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const existing = getCandidateProfile();
    if (existing) {
      setProfile(existing);
      setName(existing.name);
      setEmail(existing.email);
      setWhatsapp(existing.whatsapp);
      setTargetRole(existing.targetRole);
      setExperienceLevel(existing.experienceLevel);
      setCountry(existing.country);
      setSkillsInput(existing.skills.join(', '));
      setBio(existing.bio);
    }

    // Load tracked applications from localStorage
    try {
      const stored = localStorage.getItem('tracked_applications');
      if (stored) {
        setTrackedApps(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newProfile: CandidateProfile = {
      id: profile ? profile.id : `candidate-${Date.now()}`,
      name,
      email,
      whatsapp,
      targetRole,
      experienceLevel,
      country: country || 'International',
      skills: skillsArray.length > 0 ? skillsArray : ['Remote Work', 'Customer Support'],
      bio: bio || 'Dedicated remote professional looking for opportunities with US companies.',
      isPublishedToTalentBoard: profile ? profile.isPublishedToTalentBoard : true,
      alertCategories: [targetRole],
      joinedDate: profile ? profile.joinedDate : new Date().toLocaleDateString()
    };

    saveCandidateProfile(newProfile);
    setProfile(newProfile);
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    clearCandidateSession();
    setProfile(null);
  };

  const handleUpdateAppStatus = (id: string, status: TrackedApplication['status']) => {
    const updated = trackedApps.map(a => a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a);
    setTrackedApps(updated);
    try {
      localStorage.setItem('tracked_applications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteApp = (id: string) => {
    const updated = trackedApps.filter(a => a.id !== id);
    setTrackedApps(updated);
    try {
      localStorage.setItem('tracked_applications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {!profile ? (
        /* Sign In / Sign Up Screen */
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4">
                <User className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Candidate Member Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Create or access your candidate dashboard in 10 seconds. Track your saved jobs, manage your talent pitch, and get matching alerts!
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+123..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@email.com"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Domain
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Customer Support & Helpdesk">Customer Support & Helpdesk</option>
                    <option value="Data, AI Training & Annotation">Data, AI Training & Annotation</option>
                    <option value="Virtual Assistant & Admin">Virtual Assistant & Admin</option>
                    <option value="Healthcare & Nursing">Healthcare & Nursing</option>
                    <option value="Software & Tech">Software & Tech</option>
                    <option value="Business & Finance">Business & Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Bangladesh, India, UK..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. Zendesk, English Fluency, Excel, Data Entry"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Bio / Pitch
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your background and strengths..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Candidate Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Logged In Candidate Dashboard */
        <div className="space-y-8">
          
          {/* Header Profile Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {profile.name}
                  </h1>
                  <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {profile.targetRole}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                  <span>📍 {profile.country}</span>
                  <span>•</span>
                  <span>📱 {profile.whatsapp}</span>
                  <span>•</span>
                  <span>Member since {profile.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log Out
              </button>
            </div>
          </div>

          {/* Quick Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {[
              { id: 'tracker', label: `📌 Saved Jobs (${trackedApps.length})`, icon: Bookmark },
              { id: 'pitch', label: '👥 My Talent Pitch Card', icon: User },
              { id: 'alerts', label: '🔔 Job Alerts & Preferences', icon: Bell }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Saved Jobs Tracker */}
          {activeTab === 'tracker' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Your Active Application Pipeline
                </h3>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Browse More Jobs
                </Link>
              </div>

              {trackedApps.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-bold text-slate-800">
                    No Saved Jobs Yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Browse our daily verified US jobs and click the bookmark icon on any job card to track your applications here!
                  </p>
                  <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                  >
                    Explore Jobs Now
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {trackedApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {app.jobTitle}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="font-semibold text-slate-700">{app.company}</span>
                          {app.salary && <span>• {app.salary}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as any)}
                          className={`text-xs font-bold rounded-lg p-2 border focus:outline-none ${
                            app.status === 'Offer Received' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                            app.status === 'Interview Scheduled' ? 'bg-indigo-50 text-indigo-800 border-indigo-300' :
                            app.status === 'Applied' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                            'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="Saved">Saved</option>
                          <option value="Applied">Applied</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Offer Received">Offer Received 🎉</option>
                        </select>

                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: My Talent Pitch */}
          {activeTab === 'pitch' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Your Talent Pitch Card
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  This summary is visible to US recruiters on the Community Talent Board (`/talent`).
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 max-w-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    Candidate Profile
                  </span>
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {profile.targetRole}
                </h4>
                <p className="text-xs text-slate-600 italic">
                  "{profile.bio}"
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {profile.skills.map((s, i) => (
                    <span key={i} className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/talent"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700"
                >
                  View on Live Talent Board <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: Job Alerts */}
          {activeTab === 'alerts' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Matching Job Notification Settings
              </h3>
              <p className="text-xs text-slate-500">
                You are currently set up to receive daily alerts when new jobs match <strong>{profile.targetRole}</strong>.
              </p>
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-2">
                <div><strong>Active Notification Channel:</strong> {profile.whatsapp || profile.email}</div>
                <div><strong>Monitored Categories:</strong> {profile.targetRole}</div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
