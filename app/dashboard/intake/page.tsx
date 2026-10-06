'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  MapPin, 
  ShieldCheck, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Save, 
  Linkedin, 
  Globe, 
  FileText, 
  Check, 
  Plus, 
  X, 
  Layers, 
  Send,
  HelpCircle,
  Clock,
  UserCheck
} from 'lucide-react';
import { 
  getCurrentUser, 
  getClientIntake, 
  saveClientIntake, 
  ClientIntakeProfile, 
  GoogleUserProfile 
} from '@/lib/user-vault';
import GoogleAuthModal from '@/components/GoogleAuthModal';

const POPULAR_ROLE_SUGGESTIONS = [
  'Senior Software Engineer',
  'Full Stack Developer',
  'Registered Nurse (Schedule A EB-3)',
  'Customer Success & Technical Support',
  'Data Analyst & BI Specialist',
  'DevOps / Cloud Engineer (AWS/GCP)',
  'AI Data Annotation & QA Specialist',
  'Product Manager'
];

const POPULAR_SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 
  'NCLEX-RN', 'PostgreSQL', 'SQL', 'REST APIs', 'Git', 'Kubernetes',
  'Zendesk', 'Customer Operations', 'Machine Learning'
];

const LOCATION_PREFERENCES = [
  '100% Remote (USD Paid / W-8BEN)',
  'Nationwide / Any U.S. State (Relocation Ready)',
  'California / Silicon Valley',
  'New York / East Coast Tech Hub',
  'Texas (Austin / Dallas)',
  'Washington (Seattle)',
  'Massachusetts (Boston / Cambridge Research Hub)',
  'Florida / Southeast'
];

const COMPANY_TYPE_OPTIONS = [
  'Cap-Exempt Universities & Non-Profit Research (No Lottery Cap)',
  'U.S. Healthcare Networks & Hospitals (Schedule A Fast-Track)',
  'High-Growth Tech Scale-ups (Series A - D)',
  'Remote-First USD Tech Employers',
  'Fortune 500 Enterprise Corporations'
];

const VISA_STATUS_OPTIONS = [
  'F-1 OPT / STEM OPT (Ready to work, no lottery needed initially)',
  'Foreign Registered Nurse - NCLEX Passed (Schedule A EB-3)',
  'Seeking Cap-Exempt H-1B (Higher Ed / Research Institution)',
  'Seeking Private Corporate H-1B Visa Sponsorship',
  'Global Remote Contractor (Form W-8BEN USD Wire)',
  'U.S. Citizen / Permanent Resident (Green Card Holder)',
  'Other / Custom Work Authorization'
];

function IntakeContent() {
  const router = useRouter();
  const [user, setUser] = useState<GoogleUserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Form State
  const [targetRoles, setTargetRoles] = useState<string[]>(['Senior Software Engineer']);
  const [roleInput, setRoleInput] = useState('');
  
  const [preferredLocations, setPreferredLocations] = useState<string[]>(['100% Remote (USD Paid / W-8BEN)']);
  const [workAuthorization, setWorkAuthorization] = useState(VISA_STATUS_OPTIONS[0]);
  const [minSalaryTarget, setMinSalaryTarget] = useState('$100,000 / year');
  const [experienceYears, setExperienceYears] = useState('3-5 years');
  
  const [targetCompanyTypes, setTargetCompanyTypes] = useState<string[]>([
    'Cap-Exempt Universities & Non-Profit Research (No Lottery Cap)',
    'Remote-First USD Tech Employers'
  ]);
  const [specificTargetCompanies, setSpecificTargetCompanies] = useState('');
  
  const [coreSkills, setCoreSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [skillInput, setSkillInput] = useState('');
  
  const [dealBreakers, setDealBreakers] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [githubOrPortfolioUrl, setGithubOrPortfolioUrl] = useState('');
  const [notesForFulfillment, setNotesForFulfillment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const savedIntake = getClientIntake();
    if (savedIntake) {
      if (savedIntake.targetRoles?.length) setTargetRoles(savedIntake.targetRoles);
      if (savedIntake.preferredLocations?.length) setPreferredLocations(savedIntake.preferredLocations);
      if (savedIntake.workAuthorization) setWorkAuthorization(savedIntake.workAuthorization);
      if (savedIntake.minSalaryTarget) setMinSalaryTarget(savedIntake.minSalaryTarget);
      if (savedIntake.experienceYears) setExperienceYears(savedIntake.experienceYears);
      if (savedIntake.targetCompanyTypes?.length) setTargetCompanyTypes(savedIntake.targetCompanyTypes);
      if (savedIntake.specificTargetCompanies) setSpecificTargetCompanies(savedIntake.specificTargetCompanies);
      if (savedIntake.coreSkills?.length) setCoreSkills(savedIntake.coreSkills);
      if (savedIntake.dealBreakers) setDealBreakers(savedIntake.dealBreakers);
      if (savedIntake.linkedInUrl) setLinkedInUrl(savedIntake.linkedInUrl);
      if (savedIntake.githubOrPortfolioUrl) setGithubOrPortfolioUrl(savedIntake.githubOrPortfolioUrl);
      if (savedIntake.notesForFulfillment) setNotesForFulfillment(savedIntake.notesForFulfillment);
    }
  }, []);

  const handleAddRole = (role: string) => {
    const trimmed = role.trim();
    if (trimmed && !targetRoles.includes(trimmed)) {
      setTargetRoles([...targetRoles, trimmed]);
      setRoleInput('');
    }
  };

  const handleRemoveRole = (role: string) => {
    setTargetRoles(targetRoles.filter(r => r !== role));
  };

  const handleToggleLocation = (loc: string) => {
    if (preferredLocations.includes(loc)) {
      setPreferredLocations(preferredLocations.filter(l => l !== loc));
    } else {
      setPreferredLocations([...preferredLocations, loc]);
    }
  };

  const handleToggleCompanyType = (type: string) => {
    if (targetCompanyTypes.includes(type)) {
      setTargetCompanyTypes(targetCompanyTypes.filter(t => t !== type));
    } else {
      setTargetCompanyTypes([...targetCompanyTypes, type]);
    }
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !coreSkills.includes(trimmed)) {
      setCoreSkills([...coreSkills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setCoreSkills(coreSkills.filter(s => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const intakePayload: ClientIntakeProfile = {
      targetRoles,
      preferredLocations,
      workAuthorization,
      minSalaryTarget,
      targetCompanyTypes,
      specificTargetCompanies,
      experienceYears,
      coreSkills,
      dealBreakers,
      linkedInUrl,
      githubOrPortfolioUrl,
      notesForFulfillment
    };

    // 1. Save to Client Cloud Vault
    saveClientIntake(intakePayload);

    // 2. Submit to Backend API
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user?.email || 'client@gmail.com',
          userName: user?.name || 'Client Candidate',
          userPhone: user?.phone || '',
          plan: user?.plan || 'starter',
          ...intakePayload
        })
      });
    } catch (err) {
      console.warn('Network sync for intake failed, saved locally:', err);
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Back to Candidate Dashboard</span>
          </Link>

          <span className="text-[11px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Client Intake Studio
          </span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Target Role & Placement Intake Profile
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Define your exact target roles, U.S. work authorization, target company profiles, and salary expectations. 
                Our statutory matching engine and executive concierge desk use this profile to compile verified jobs and direct hiring-manager dossiers for your pipeline.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Statutory Legal Protection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>3-5 Minute Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>Permanent Cloud Vault Sync</span>
            </div>
          </div>
        </div>

        {/* Success Confirmation Banner */}
        {submitSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-base font-black text-emerald-950">
                  Intake Profile Successfully Saved & Synced!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  Your targeting parameters have been permanently locked into your Cloud Vault and routed to our fulfillment desk. 
                  Your automated decision-maker databases and direct recruiter outreach scripts are ready in your CRM.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/tracker"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Launch Multi-Dimensional CRM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-2.5 bg-white border border-emerald-300 hover:bg-emerald-100/50 text-emerald-900 font-bold text-xs rounded-xl transition-all"
              >
                <span>Return to Studio</span>
              </Link>
            </div>
          </div>
        )}

        {/* Main Intake Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section 1: Target Roles */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  1. Target Job Titles & Roles
                </h2>
                <p className="text-xs text-slate-500">
                  List the specific job titles you want us to match and target.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={roleInput}
                  onChange={e => setRoleInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddRole(roleInput);
                    }
                  }}
                  placeholder="e.g. Senior Frontend Engineer or Staff Data Scientist"
                  className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddRole(roleInput)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {/* Active Roles Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {targetRoles.map(role => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold"
                  >
                    <span>{role}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="text-blue-500 hover:text-blue-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Suggestions */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Role Suggestions:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {POPULAR_ROLE_SUGGESTIONS.map(sug => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleAddRole(sug)}
                      disabled={targetRoles.includes(sug)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        targetRoles.includes(sug)
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Work Authorization & Statutory Status */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  2. Work Authorization & Visa Status
                </h2>
                <p className="text-xs text-slate-500">
                  Ensures applications are only sent to employers statutory-exempt or authorized for your status.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Your Current Status *
                </label>
                <select
                  value={workAuthorization}
                  onChange={e => setWorkAuthorization(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                >
                  {VISA_STATUS_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Target Experience Level
                  </label>
                  <select
                    value={experienceYears}
                    onChange={e => setExperienceYears(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  >
                    <option value="0-2 years (Entry / Junior)">0-2 years (Entry / Junior)</option>
                    <option value="3-5 years (Mid-Level)">3-5 years (Mid-Level)</option>
                    <option value="5-8 years (Senior)">5-8 years (Senior)</option>
                    <option value="8+ years (Staff / Principal / Lead)">8+ years (Staff / Principal / Lead)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Expected Target Salary Floor
                  </label>
                  <input
                    type="text"
                    value={minSalaryTarget}
                    onChange={e => setMinSalaryTarget(e.target.value)}
                    placeholder="e.g. $100,000 / year or $45 / hour"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Geographic & Location Preferences */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  3. Preferred Locations & Remote Style
                </h2>
                <p className="text-xs text-slate-500">
                  Select all regions where you are willing to work or accept remote contracts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LOCATION_PREFERENCES.map(loc => {
                const isSelected = preferredLocations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleToggleLocation(loc)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                      isSelected
                        ? 'bg-purple-50/70 text-purple-900 border-purple-300 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100/70 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{loc}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Target Company Types & Employers */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  4. Target Employer Categories & Specific Companies
                </h2>
                <p className="text-xs text-slate-500">
                  Which institution types should we prioritize for decision-maker extraction?
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                {COMPANY_TYPE_OPTIONS.map(type => {
                  const isSelected = targetCompanyTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleToggleCompanyType(type)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                        isSelected
                          ? 'bg-indigo-50/70 text-indigo-900 border-indigo-300 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100/70 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{type}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Specific Companies You Want to Target (Optional)
                </label>
                <input
                  type="text"
                  value={specificTargetCompanies}
                  onChange={e => setSpecificTargetCompanies(e.target.value)}
                  placeholder="e.g. Johns Hopkins, Automattic, Mayo Clinic, Datadog, Stanford University"
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Core Technical Stack & Skills */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Layers className="w-5 h-5 text-amber-600" />
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  5. Core Skills & Technologies
                </h2>
                <p className="text-xs text-slate-500">
                  Our algorithm will pair these skills directly with recruiter search criteria.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(skillInput);
                    }
                  }}
                  placeholder="e.g. React, Next.js, NCLEX-RN, Python, Docker"
                  className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(skillInput)}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              {/* Active Skill Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {coreSkills.map(sk => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold"
                  >
                    <span>{sk}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(sk)}
                      className="text-amber-500 hover:text-amber-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Suggestions */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Common High-Demand Skills:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {POPULAR_SKILL_SUGGESTIONS.map(sug => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleAddSkill(sug)}
                      disabled={coreSkills.includes(sug)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        coreSkills.includes(sug)
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Hard Deal-Breakers & Fulfillment Notes */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  6. Deal-Breakers & Personal Links
                </h2>
                <p className="text-xs text-slate-500">
                  Ensure we never submit or recommend roles that conflict with your non-negotiables.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Deal-Breakers (What must we avoid?)
                </label>
                <textarea
                  rows={2}
                  value={dealBreakers}
                  onChange={e => setDealBreakers(e.target.value)}
                  placeholder="e.g. Cannot relocate to East Coast; No positions requiring security clearance; Must offer 401(k) matching or direct USD wire."
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={e => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    GitHub / Portfolio Website URL
                  </label>
                  <input
                    type="url"
                    value={githubOrPortfolioUrl}
                    onChange={e => setGithubOrPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/yourname or yourportfolio.com"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Notes for the Executive Concierge Team
                </label>
                <textarea
                  rows={2}
                  value={notesForFulfillment}
                  onChange={e => setNotesForFulfillment(e.target.value)}
                  placeholder="e.g. I am currently finishing my NCLEX certification / I need my first interview scheduled before December."
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Form Submit Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-800">Permanent Vault Sync:</span> Changes are saved locally and synced to your central concierge dashboard.
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Syncing Profile...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save & Lock Intake Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

export default function IntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-8 text-center text-xs text-slate-500">Loading Client Intake Studio...</div>}>
      <IntakeContent />
    </Suspense>
  );
}
