'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe2, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';

export default function GlassdoorDirectory() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-t border-slate-800 bg-slate-950/80 text-slate-300 py-8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-extrabold text-white tracking-wide uppercase flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Explore Trending Opportunities & Directories
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-semibold text-slate-400 hover:text-white inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <>Hide Trending Hubs <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>See What's Trending <ChevronDown className="w-3.5 h-3.5 text-emerald-400" /></>
            )}
          </button>
        </div>

        {/* Directory Grid */}
        {isOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-8 text-xs">
            
            {/* Column 1: Top Employers & Sponsors */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                Top Sponsors & Employers
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/jobs?q=Google" className="hover:text-blue-400 transition-colors">
                    Google US & Remote
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=OpenAI" className="hover:text-blue-400 transition-colors">
                    OpenAI AI Evaluators
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Anthropic" className="hover:text-blue-400 transition-colors">
                    Anthropic Safety & Research
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=DataAnnotation" className="hover:text-blue-400 transition-colors">
                    DataAnnotation.tech (USD)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Outlier" className="hover:text-blue-400 transition-colors">
                    Outlier.ai AI Training
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Mayo%20Clinic" className="hover:text-blue-400 transition-colors">
                    Mayo Clinic Healthcare
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Johns%20Hopkins" className="hover:text-blue-400 transition-colors">
                    Johns Hopkins Medicine
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Amazon" className="hover:text-blue-400 transition-colors">
                    Amazon AWS & Tech
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Microsoft" className="hover:text-blue-400 transition-colors">
                    Microsoft H-1B Roles
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Cleveland%20Clinic" className="hover:text-blue-400 transition-colors">
                    Cleveland Clinic EB-3
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Automattic" className="hover:text-blue-400 transition-colors">
                    Automattic (W-8BEN)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Alignerr" className="hover:text-blue-400 transition-colors">
                    Alignerr AI Language Ops
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Jobs by US State & Metro */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Jobs by State & Metro
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/jobs?q=California" className="hover:text-emerald-400 transition-colors">
                    California Tech & AI Hubs
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=New%20York" className="hover:text-emerald-400 transition-colors">
                    New York Finance & Tech
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Texas" className="hover:text-emerald-400 transition-colors">
                    Texas (Austin & Dallas)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Washington" className="hover:text-emerald-400 transition-colors">
                    Washington (Seattle Tech)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Massachusetts" className="hover:text-emerald-400 transition-colors">
                    Massachusetts (Boston Biotech)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Florida" className="hover:text-emerald-400 transition-colors">
                    Florida Healthcare & Remote
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Illinois" className="hover:text-emerald-400 transition-colors">
                    Illinois (Chicago Metro)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=Georgia" className="hover:text-emerald-400 transition-colors">
                    Georgia (Atlanta Enterprise)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?q=North%20Carolina" className="hover:text-emerald-400 transition-colors">
                    North Carolina (RTP Hub)
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?remote=true" className="hover:text-emerald-400 font-semibold text-emerald-400/90 transition-colors">
                    Worldwide Remote (W-8BEN)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: High-Value Visa & Career Tracks */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                Visa & Career Tracks
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/landing/visa-sponsorship-jobs" className="hover:text-amber-400 transition-colors">
                    Cap-Exempt H-1B Jobs (No Lottery)
                  </Link>
                </li>
                <li>
                  <Link href="/guides/international-nurse-schedule-a-greencard-guide" className="hover:text-amber-400 transition-colors">
                    Schedule A Nurse Direct EB-3
                  </Link>
                </li>
                <li>
                  <Link href="/landing/us-remote-jobs-w8ben" className="hover:text-amber-400 transition-colors">
                    Remote USD Independent Contractors
                  </Link>
                </li>
                <li>
                  <Link href="/learn?tab=salaries" className="hover:text-amber-400 transition-colors font-medium text-slate-300">
                    DOL Level 2 Prevailing Wages
                  </Link>
                </li>
                <li>
                  <Link href="/guides/pass-workday-greenhouse-ats-resume-2026" className="hover:text-amber-400 transition-colors">
                    Pass Workday & Greenhouse ATS
                  </Link>
                </li>
                <li>
                  <Link href="/tools/ats-scanner" className="hover:text-amber-400 transition-colors">
                    Free AI ATS Score Checker
                  </Link>
                </li>
                <li>
                  <Link href="/tools/visa-checker" className="hover:text-amber-400 transition-colors">
                    Company Visa Sponsor Radar
                  </Link>
                </li>
                <li>
                  <Link href="/tools/outreach-gen" className="hover:text-amber-400 transition-colors">
                    Executive Recruiter Outreach
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-emerald-400 font-bold text-emerald-400 transition-colors">
                    ★ 1-on-1 VIP Strategy ($29)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: 100% Fully-Funded USA Scholarships */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                USA Scholarships & Aid
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/scholarships?search=Stanford" className="hover:text-purple-400 transition-colors">
                    Stanford Knight-Hennessy (100%)
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=Fulbright" className="hover:text-purple-400 transition-colors">
                    Fulbright Foreign Student
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=Berea" className="hover:text-purple-400 transition-colors">
                    Berea College 100% Free Tuition
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=Harvard" className="hover:text-purple-400 transition-colors">
                    Harvard GSAS PhD Fellowships
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=Purdue" className="hover:text-purple-400 transition-colors">
                    Purdue GRA Research Assistantship
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=Georgia%20Tech" className="hover:text-purple-400 transition-colors">
                    Georgia Tech GTA Tuition Waiver
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=Yale" className="hover:text-purple-400 transition-colors">
                    Yale University Need-Based Aid
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=Princeton" className="hover:text-purple-400 transition-colors">
                    Princeton Doctoral Fellowship
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships?search=MIT" className="hover:text-purple-400 transition-colors">
                    MIT Presidential Fellowship
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Study in USA & Part-Time Work Hub */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Study & Part-Time Work in USA
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/guides/study-in-usa-f1-part-time-cpt-opt-work-guide" className="hover:text-cyan-400 transition-colors font-medium text-cyan-300">
                    F-1 On-Campus Work (20 hrs/wk)
                  </Link>
                </li>
                <li>
                  <Link href="/guides/study-usa-zero-tuition-graduate-assistantship" className="hover:text-cyan-400 transition-colors">
                    Graduate Teaching Assistant (GTA)
                  </Link>
                </li>
                <li>
                  <Link href="/guides/study-usa-zero-tuition-graduate-assistantship" className="hover:text-cyan-400 transition-colors">
                    Graduate Research Assistant (GRA)
                  </Link>
                </li>
                <li>
                  <Link href="/guides/study-in-usa-f1-part-time-cpt-opt-work-guide#day-1-cpt" className="hover:text-cyan-400 transition-colors">
                    Day-1 CPT Work-Study Programs
                  </Link>
                </li>
                <li>
                  <Link href="/guides/study-in-usa-f1-part-time-cpt-opt-work-guide#stem-opt" className="hover:text-cyan-400 transition-colors">
                    3-Year STEM OPT Work Permit
                  </Link>
                </li>
                <li>
                  <Link href="/guides/study-in-usa-f1-part-time-cpt-opt-work-guide#paid-internships" className="hover:text-cyan-400 transition-colors">
                    Paid Summer Internships (CPT)
                  </Link>
                </li>
                <li>
                  <Link href="/learn?tab=star" className="hover:text-cyan-400 transition-colors">
                    F-1 Visa Interview Prep (STAR)
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships" className="hover:text-cyan-400 font-semibold text-cyan-400 transition-colors">
                    Browse All 22+ Funded Programs &rarr;
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
