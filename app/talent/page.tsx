'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Sparkles, 
  ThumbsUp, 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  Briefcase, 
  Globe2, 
  DollarSign, 
  Bell, 
  MessageCircle, 
  CheckCircle2, 
  X,
  ArrowRight
} from 'lucide-react';
import { INITIAL_TALENT, CandidatePitch } from '@/lib/talent-data';
import AntiScamBanner from '@/components/AntiScamBanner';

export default function TalentPage() {
  const [talent, setTalent] = useState<CandidatePitch[]>(INITIAL_TALENT);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  // Pitch Form State
  const [headline, setHeadline] = useState('');
  const [category, setCategory] = useState('Customer Support & Helpdesk');
  const [skillsInput, setSkillsInput] = useState('');
  const [experienceYears, setExperienceYears] = useState('1-3 Years');
  const [country, setCountry] = useState('');
  const [desiredRoleType, setDesiredRoleType] = useState<'Global Remote (W-8BEN)' | 'US Visa Sponsor (H-1B/EB-3)' | 'Either'>('Global Remote (W-8BEN)');
  const [hourlyRate, setHourlyRate] = useState('');
  const [pitchBio, setPitchBio] = useState('');
  const [alertContact, setAlertContact] = useState('');
  const [submittedAlertSuccess, setSubmittedAlertSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('us_talent_pitches');
      if (saved) {
        const parsed: CandidatePitch[] = JSON.parse(saved);
        setTalent([...parsed, ...INITIAL_TALENT.filter(t => !parsed.some(p => p.id === t.id))]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUpvote = (id: string) => {
    if (upvotedIds[id]) return;
    setTalent(prev => prev.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
    setUpvotedIds(prev => ({ ...prev, [id]: true }));
  };

  const handleCreatePitch = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newPitch: CandidatePitch = {
      id: `pitch-user-${Date.now()}`,
      anonymousHandle: `Talent-${category.split(' ')[0]}-${randomSuffix}`,
      headline,
      category,
      skills: skillsArray.length > 0 ? skillsArray : ['Remote Work', 'Communication'],
      experienceYears,
      country: country || 'International (Global Remote)',
      desiredRoleType,
      hourlyRateUSD: hourlyRate ? `$${hourlyRate}/hr` : undefined,
      pitchBio,
      upvotes: 1,
      createdAt: new Date().toISOString(),
      verifiedStatus: 'Community Profile'
    };

    const updated = [newPitch, ...talent];
    setTalent(updated);

    try {
      const userPitches = updated.filter(t => t.id.startsWith('pitch-user-'));
      localStorage.setItem('us_talent_pitches', JSON.stringify(userPitches));
    } catch (err) {
      console.error(err);
    }

    setSubmittedAlertSuccess(true);
    setTimeout(() => {
      setSubmittedAlertSuccess(false);
      setIsModalOpen(false);
      // Reset form
      setHeadline('');
      setSkillsInput('');
      setPitchBio('');
      setAlertContact('');
      setHourlyRate('');
    }, 2500);
  };

  const filteredTalent = talent.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchHead = item.headline.toLowerCase().includes(q);
      const matchBio = item.pitchBio.toLowerCase().includes(q);
      const matchSkill = item.skills.some(s => s.toLowerCase().includes(q));
      if (!matchHead && !matchBio && !matchSkill) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <Users className="w-4 h-4 text-blue-600" />
          Community Talent Showcase & Candidate Pitches
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Showcase Your Skills & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Get Scouted by US Recruiters
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Publish your anonymous candidate profile brief. US employers and agency scouts browse our talent pool daily. <strong>Subscribe to instant matching job alerts</strong> whenever newly synced jobs fit your skills!
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            Publish Your Candidate Pitch (Free)
          </button>
          
          <Link
            href="/recruiters"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 px-5 py-3 rounded-xl shadow-sm transition-all"
          >
            <Briefcase className="w-4 h-4 text-slate-500" />
            Employer & Recruiter Portal
          </Link>
        </div>
      </div>

      {/* Anti-Scam Shield */}
      <AntiScamBanner />

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, role, or tool..."
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quick Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'All Talent' },
              { id: 'Customer Support & Helpdesk', label: 'Customer Support' },
              { id: 'Data, AI Training & Annotation', label: 'AI & Data Annotation' },
              { id: 'Virtual Assistant & Admin', label: 'Virtual Assistant' },
              { id: 'Healthcare & Nursing', label: 'Healthcare & RN' },
              { id: 'Software & Tech', label: 'Tech & Dev' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Talent Pitches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredTalent.map((pitch) => (
          <div
            key={pitch.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                  {pitch.anonymousHandle}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {pitch.verifiedStatus}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {pitch.headline}
              </h2>

              {/* Details line */}
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {pitch.experienceYears}
                </span>
                <span>•</span>
                <span className="text-blue-600 font-semibold">{pitch.desiredRoleType}</span>
                {pitch.hourlyRateUSD && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{pitch.hourlyRateUSD}</span>
                  </>
                )}
              </div>

              {/* Pitch Bio */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{pitch.pitchBio}"
              </p>

              {/* Skills Tags */}
              <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                {pitch.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleUpvote(pitch.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  upvotedIds[pitch.id]
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{pitch.upvotes}</span>
              </button>

              <a
                href={`https://wa.me/8801981505761?text=Hi%20Jobs%20in%20USA%2C%20I%20am%20a%20recruiter%20interested%20in%20connecting%20with%20candidate%20${encodeURIComponent(pitch.anonymousHandle)}%20(${encodeURIComponent(pitch.headline)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold bg-slate-900 hover:bg-blue-600 text-white px-3.5 py-2 rounded-lg shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Request Intro
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Modal: Publish Your Candidate Pitch */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Publish Your Candidate Pitch Brief
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedAlertSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  Your Pitch is Published Live!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Your profile brief is now visible to visiting recruiters. You will receive matching job alerts whenever fresh jobs match your skills!
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreatePitch} className="mt-5 space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Professional Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Bilingual Customer Support Specialist (Zendesk & Chat)"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Job Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
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
                      Years of Experience
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Entry Level (< 1 Year)">Entry Level (&lt; 1 Year)</option>
                      <option value="1 - 3 Years">1 - 3 Years</option>
                      <option value="4 - 7 Years">4 - 7 Years</option>
                      <option value="8+ Years Executive">8+ Years Senior</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Key Skills (Separate by commas) *
                  </label>
                  <input
                    type="text"
                    required
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="e.g. Zendesk, Live Chat, English, Data Entry, Google Docs"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Desired Role Type
                    </label>
                    <select
                      value={desiredRoleType}
                      onChange={(e) => setDesiredRoleType(e.target.value as any)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Global Remote (W-8BEN)">Global Remote (W-8BEN / USD Payout)</option>
                      <option value="US Visa Sponsor (H-1B/EB-3)">US Visa Sponsor (H-1B/EB-3)</option>
                      <option value="Either">Open to Either</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Desired Rate (Optional)
                    </label>
                    <input
                      type="text"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="e.g. 15-20"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your 3-Sentence Elevator Pitch *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={pitchBio}
                    onChange={(e) => setPitchBio(e.target.value)}
                    placeholder="Explain your biggest strengths, why you are reliable for remote US teams, and how you solve problems..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Job Alert Notification Field */}
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                  <label className="block text-xs font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-blue-600" />
                    Subscribe for Matching Job Alerts (Email or WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={alertContact}
                    onChange={(e) => setAlertContact(e.target.value)}
                    placeholder="Your Email or WhatsApp number..."
                    className="w-full text-xs bg-white border border-blue-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-blue-700 mt-1 block">
                    🔒 Kept 100% private. Never displayed publicly on the board.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg transition-all"
                >
                  Publish My Pitch & Enable Job Alerts
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
