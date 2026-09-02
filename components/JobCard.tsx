'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle2,
  ShieldCheck,
  Globe2
} from 'lucide-react';
import { JobPosting, VisaSponsorshipType } from '@/lib/types';

interface JobCardProps {
  job: JobPosting;
  onSaveToggle?: (job: JobPosting, isSaved: boolean) => void;
  isInitiallySaved?: boolean;
}

export default function JobCard({ job, onSaveToggle, isInitiallySaved = false }: JobCardProps) {
  const [saved, setSaved] = useState(isInitiallySaved);

  const toggleSave = () => {
    const nextState = !saved;
    setSaved(nextState);

    // Persist to localStorage tracker
    try {
      const stored = localStorage.getItem('tracked_applications');
      let apps = stored ? JSON.parse(stored) : [];
      if (nextState) {
        if (!apps.some((a: any) => a.id === job.id)) {
          apps.push({
            id: job.id,
            jobTitle: job.title,
            company: job.company,
            status: 'Saved',
            salary: job.salaryMin ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax?.toLocaleString()}` : 'Competitive',
            notes: `Source: ${job.location}`,
            updatedAt: new Date().toISOString()
          });
        }
      } else {
        apps = apps.filter((a: any) => a.id !== job.id);
      }
      localStorage.setItem('tracked_applications', JSON.stringify(apps));
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }

    if (onSaveToggle) {
      onSaveToggle(job, nextState);
    }
  };

  const getSponsorshipBadge = (type: VisaSponsorshipType) => {
    switch (type) {
      case 'Cap-Exempt H-1B':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full badge-capexempt">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Cap-Exempt H-1B (No Lottery)
          </span>
        );
      case 'H-1B Sponsor':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full badge-h1b">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            H-1B Visa Sponsor
          </span>
        );
      case 'OPT/CPT Friendly':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full badge-opt">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            OPT / STEM OPT Friendly
          </span>
        );
      case 'US Remote (Contractor/W-8BEN)':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full badge-remote">
            <Globe2 className="w-3.5 h-3.5 text-purple-600" />
            Global Contractor (W-8BEN)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            US Work Auth Required
          </span>
        );
    }
  };

  const timeAgo = (dateStr: string) => {
    const diffHours = Math.round((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const days = Math.round(diffHours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar: Category + Time + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
              {job.category}
            </span>
            {getSponsorshipBadge(job.visaSponsorship)}
            {job.isRemote && (
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                Remote
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(job.postedDate)}
            </span>
            <button
              onClick={toggleSave}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              title={saved ? 'Remove from tracker' : 'Save to tracker'}
            >
              {saved ? (
                <BookmarkCheck className="w-4 h-4 text-blue-600 fill-blue-50" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Title and Company */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors">
          {job.title}
        </h3>

        <div className="flex items-center gap-3 mt-2 text-sm text-slate-600 flex-wrap">
          <span className="flex items-center gap-1 font-semibold text-slate-800">
            <Building2 className="w-4 h-4 text-slate-400" />
            {job.company}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-4 h-4 text-slate-400" />
            {job.location}
          </span>
          {job.salaryMin && (
            <span className="flex items-center gap-0.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              <DollarSign className="w-3.5 h-3.5" />
              {job.salaryMin.toLocaleString()} - ${job.salaryMax?.toLocaleString()} /yr
            </span>
          )}
        </div>

        {/* Short description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills pills */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {job.skills.slice(0, 5).map((skill, i) => (
              <span 
                key={i} 
                className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="text-[11px] text-slate-400">
                +{job.skills.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        <Link
          href={`/tools/ats-scanner?jobTitle=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}&desc=${encodeURIComponent(job.description)}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-2 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Tailor Resume For This
        </Link>

        <a
          href={job.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          Direct Apply
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
