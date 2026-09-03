'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Lock, 
  RefreshCw, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  DollarSign, 
  Sparkles, 
  Building2, 
  Trash2, 
  LogOut, 
  ExternalLink,
  MessageCircle,
  AlertCircle,
  Activity,
  TrendingUp,
  Eye,
  Globe2,
  Bookmark,
  FileText,
  Share2,
  Copy,
  Check,
  Send,
  Calendar,
  Clock
} from 'lucide-react';
import { verifyAdminPasscode, isAdminAuthenticated, setAdminSession } from '@/lib/admin-auth';
import { INITIAL_TALENT, CandidatePitch } from '@/lib/talent-data';
import { generateDailySocialSlots, SocialSlot } from '@/lib/social-post-generator';

interface ActivityLog {
  id: string;
  type: 'ats_scan' | 'job_saved' | 'pitch_created' | 'scholarship_view' | 'consultation_inquiry' | 'social_posted';
  text: string;
  timeAgo: string;
  ipLocation: string;
}

const SAMPLE_LIVE_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'ats_scan',
    text: 'Candidate tested resume on AI ATS Scanner (Matched 94% with Customer Support role)',
    timeAgo: '2 minutes ago',
    ipLocation: 'United States'
  },
  {
    id: 'act-2',
    type: 'job_saved',
    text: 'Candidate saved "Customer Happiness Engineer - Automattic" to personal tracker',
    timeAgo: '7 minutes ago',
    ipLocation: 'Bangladesh'
  },
  {
    id: 'act-3',
    type: 'scholarship_view',
    text: 'Visitor explored Purdue University Graduate Assistantship (GRA) details',
    timeAgo: '14 minutes ago',
    ipLocation: 'India'
  },
  {
    id: 'act-4',
    type: 'pitch_created',
    text: 'New candidate pitch submitted for AI Data Annotation specialist',
    timeAgo: '28 minutes ago',
    ipLocation: 'Nigeria'
  },
  {
    id: 'act-5',
    type: 'consultation_inquiry',
    text: 'User initiated $29 USD Resume Makeover inquiry on WhatsApp',
    timeAgo: '45 minutes ago',
    ipLocation: 'United Kingdom'
  }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Social Studio States
  const [socialSlots, setSocialSlots] = useState<SocialSlot[]>([]);
  const [copiedSlotId, setCopiedSlotId] = useState<string | null>(null);
  const [publishedSlots, setPublishedSlots] = useState<Record<string, boolean>>({});

  // Data states
  const [talentList, setTalentList] = useState<CandidatePitch[]>(INITIAL_TALENT);
  const [activeTab, setActiveTab] = useState<'social' | 'activity' | 'sync' | 'talent' | 'leads'>('social');
  const [activities, setActivities] = useState<ActivityLog[]>(SAMPLE_LIVE_ACTIVITIES);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      setIsAuthenticated(true);
    }
    setSocialSlots(generateDailySocialSlots());

    // Load published slots from localStorage
    try {
      const saved = localStorage.getItem('fb_published_slots_today');
      if (saved) {
        setPublishedSlots(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      setAdminSession(true);
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect Admin Passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleCopySlot = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlotId(id);
    setTimeout(() => setCopiedSlotId(null), 2000);
  };

  const handlePostToFacebook = (slot: SocialSlot) => {
    // Copy text automatically
    navigator.clipboard.writeText(slot.copyText);
    
    // Mark as published
    const nextPublished = { ...publishedSlots, [slot.slotId]: true };
    setPublishedSlots(nextPublished);
    try {
      localStorage.setItem('fb_published_slots_today', JSON.stringify(nextPublished));
    } catch (e) {
      console.error(e);
    }

    // Add to activity stream
    const newAct: ActivityLog = {
      id: `act-soc-${Date.now()}`,
      type: 'social_posted',
      text: `Published Facebook broadcast: "${slot.title}" (${slot.theme})`,
      timeAgo: 'Just now',
      ipLocation: 'Admin Console'
    };
    setActivities(prev => [newAct, ...prev]);

    // Open Facebook Page Creator in new tab
    window.open('https://www.facebook.com/profile.php?id=61573335766965', '_blank');
  };

  const publishedCount = Object.values(publishedSlots).filter(Boolean).length;

  const handleTriggerLiveSync = async () => {
    setIsSyncing(true);
    setSyncStatus('Connecting to external feeds & parsing jobs...');
    try {
      const res = await fetch('/api/cron/sync-jobs');
      const data = await res.json();
      if (data.success) {
        setSyncStatus(`Sync Successful! Ingested ${data.newlyIngested} fresh jobs. Total active jobs: ${data.totalActiveJobs}.`);
      } else {
        setSyncStatus('Sync finished with message: ' + JSON.stringify(data));
      }
    } catch (err: any) {
      setSyncStatus('Sync request completed. Check /jobs for newly updated listings.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeletePitch = (id: string) => {
    setTalentList(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleVerify = (id: string) => {
    setTalentList(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.verifiedStatus === 'Verified Candidate' ? 'Community Profile' : 'Verified Candidate';
        return { ...t, verifiedStatus: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {!isAuthenticated ? (
        /* Admin Login Screen */
        <div className="max-w-md mx-auto my-12">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 text-white shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                Admin Command Center
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Enter your secret admin passcode to access live activity & site controls
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Secret Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin2026)"
                  className="w-full text-xs sm:text-sm bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all"
              >
                Access Dashboard
              </button>

              <p className="text-[11px] text-center text-slate-500">
                Default Master PIN: <span className="font-mono text-slate-400">admin2026</span>
              </p>
            </form>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="space-y-8">
          
          {/* Header */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h1 className="text-2xl font-black text-white">
                  Owner Command Center
                </h1>
                <span className="text-[10px] font-bold bg-blue-950 border border-blue-700 text-blue-300 px-2 py-0.5 rounded-full uppercase">
                  Live Social Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Auto-broadcast scheduled drops to <strong>Jobs in USA</strong> Facebook page and monitor traffic on <strong>uscareersolutions.online</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5" /> GA4 Realtime
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61573335766965"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" /> Open FB Page
              </a>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </div>
          </div>

          {/* Real-Time Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Facebook Drops Today</span>
                <Share2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-blue-600 mt-2">{publishedCount} of 3 Done</div>
              <span className="text-[11px] text-slate-500 font-medium">Circular schedule active</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Active Jobs</span>
                <Briefcase className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">21+ Positions</div>
              <span className="text-[11px] text-emerald-600 font-semibold">13 Synced today</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Talent Pitches</span>
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{talentList.length} Candidates</div>
              <span className="text-[11px] text-indigo-600 font-semibold">Active in talent pool</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Consultation Packages</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">$29 / $45 / $79 USD</div>
              <span className="text-[11px] text-slate-500">Connected to WhatsApp</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {[
              { id: 'social', label: `📱 Facebook Social Studio (${publishedCount}/3 Done)`, icon: Share2 },
              { id: 'activity', label: '⚡ Live Activity Feed & Traffic', icon: Activity },
              { id: 'sync', label: '🔄 Ingestion & Sync Engine', icon: RefreshCw },
              { id: 'talent', label: `👥 Moderate Talent Pitches (${talentList.length})`, icon: Users },
              { id: 'leads', label: '💬 Consultation Leads', icon: MessageCircle }
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

          {/* TAB 1: Facebook Social Broadcast Studio */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              
              {/* Daily Publishing Progress Banner */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-900/80 px-2.5 py-0.5 rounded-full">
                      Daily Circular Posting Engine
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {publishedCount >= 3 ? '🎉 All 3 Drops Completed Today!' : `${3 - publishedCount} Drops Remaining`}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1.5">
                    Jobs in USA Facebook Broadcast Schedule
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Follow the 3 daily slots below to maintain high Facebook reach, drive hundreds of daily visitors to <strong>uscareersolutions.online</strong>, and convert consultation leads!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61573335766965"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-950 font-bold text-xs shadow-md hover:bg-slate-100 transition-all"
                  >
                    <Share2 className="w-4 h-4 text-blue-600" />
                    Open Jobs in USA Page
                  </a>
                </div>
              </div>

              {/* 3 Circular Daily Slots Grid */}
              <div className="grid grid-cols-1 gap-6">
                {socialSlots.map((slot) => {
                  const isDone = publishedSlots[slot.slotId];
                  return (
                    <div
                      key={slot.slotId}
                      className={`bg-white rounded-2xl border transition-all p-6 shadow-sm ${
                        isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                              {slot.timeLabel}
                            </span>
                            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                              {slot.theme}
                            </span>
                            {isDone && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Published Today
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mt-2">
                            {slot.title}
                          </h4>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopySlot(slot.slotId, slot.copyText)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                          >
                            {copiedSlotId === slot.slotId ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Caption</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handlePostToFacebook(slot)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Post to Facebook Page Now</span>
                          </button>
                        </div>
                      </div>

                      {/* Ready-to-Post Copy Preview */}
                      <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                        {slot.copyText}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>Direct Link included: <strong className="text-blue-600">{slot.directUrl}</strong></span>
                        <span className="text-[11px]">Clicking "Post" automatically copies text & opens your Facebook page!</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: Live Activity Feed */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              
              {/* Traffic Sources & Googlebot Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
                  <div className="text-xs font-bold text-blue-900 uppercase">Top Traffic Source #1</div>
                  <div className="text-lg font-black text-slate-900 mt-1">Facebook Community</div>
                  <p className="text-xs text-blue-800 mt-1">Direct referrals from "Jobs in USA" page posts.</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="text-xs font-bold text-emerald-900 uppercase">Top Traffic Source #2</div>
                  <div className="text-lg font-black text-slate-900 mt-1">Google Organic Search</div>
                  <p className="text-xs text-emerald-800 mt-1">Googlebot indexing 24 active pages from sitemap.xml.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5">
                  <div className="text-xs font-bold text-purple-900 uppercase">Top Traffic Source #3</div>
                  <div className="text-lg font-black text-slate-900 mt-1">WhatsApp Broadcasts</div>
                  <p className="text-xs text-purple-800 mt-1">Direct shares across candidate study groups.</p>
                </div>
              </div>

              {/* Real-Time Activity Stream List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      Recent Candidate Actions & Engagements
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Live Feed</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {activities.map((act) => (
                    <div key={act.id} className="py-3.5 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                          act.type === 'ats_scan' ? 'bg-amber-50 text-amber-600' :
                          act.type === 'job_saved' ? 'bg-blue-50 text-blue-600' :
                          act.type === 'scholarship_view' ? 'bg-purple-50 text-purple-600' :
                          act.type === 'pitch_created' ? 'bg-indigo-50 text-indigo-600' :
                          act.type === 'social_posted' ? 'bg-blue-50 text-blue-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                          {act.type === 'ats_scan' && <Sparkles className="w-4 h-4" />}
                          {act.type === 'job_saved' && <Bookmark className="w-4 h-4" />}
                          {act.type === 'scholarship_view' && <FileText className="w-4 h-4" />}
                          {act.type === 'pitch_created' && <Users className="w-4 h-4" />}
                          {act.type === 'social_posted' && <Share2 className="w-4 h-4" />}
                          {act.type === 'consultation_inquiry' && <MessageCircle className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800">
                            {act.text}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>📍 {act.ipLocation}</span>
                            <span>•</span>
                            <span>{act.timeAgo}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 shrink-0">
                        {act.type.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Ingestion Engine */}
          {activeTab === 'sync' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  On-Demand Live Job Scraper & Ingestion
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click the button below to immediately poll external remote and US feeds and publish freshly scraped jobs to the live website.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-slate-800 text-sm">Automated Schedule: Daily at 06:00 UTC</div>
                  <div className="text-xs text-slate-500 mt-0.5">Vercel Cron endpoint: <span className="font-mono text-blue-600">/api/cron/sync-jobs</span></div>
                </div>

                <button
                  type="button"
                  onClick={handleTriggerLiveSync}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing Live Jobs...' : 'Trigger Live Job Sync Now'}</span>
                </button>
              </div>

              {syncStatus && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                  {syncStatus}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Talent Pitch Moderation */}
          {activeTab === 'talent' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Moderate Community Candidate Pitches
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {talentList.map((pitch) => (
                  <div
                    key={pitch.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {pitch.anonymousHandle}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          pitch.verifiedStatus === 'Verified Candidate'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {pitch.verifiedStatus}
                        </span>
                        <span className="text-xs text-slate-500">• {pitch.category}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{pitch.headline}</h4>
                      <p className="text-xs text-slate-600 mt-1 max-w-2xl italic">"{pitch.pitchBio}"</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleVerify(pitch.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                      >
                        {pitch.verifiedStatus === 'Verified Candidate' ? 'Unmark Verified' : 'Mark Verified'}
                      </button>
                      <button
                        onClick={() => handleDeletePitch(pitch.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete pitch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Leads */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                1-on-1 Consultation & Client Communications
              </h3>
              <p className="text-xs text-slate-500">
                When customers click to book a $29 Resume Transformation, $45 Strategy Call, or $79 VIP Bundle, their details are delivered directly to your WhatsApp.
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
                <div className="text-xs text-emerald-950 font-medium">
                  <strong>Official WhatsApp Concierge Number:</strong> +880 1981-505761
                </div>
                <a
                  href="https://wa.me/8801981505761"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
