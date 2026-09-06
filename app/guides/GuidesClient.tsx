'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  Globe2,
  Search,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { GuideArticle } from '@/lib/guides-data';

interface Props {
  guides: GuideArticle[];
}

const CATEGORIES = [
  { id: 'ALL', label: 'All Dossiers', icon: BookOpen },
  { id: 'ATS & Resumes', label: 'ATS & Resumes', icon: FileText },
  { id: 'Visa & Green Cards', label: 'Visa & Green Cards', icon: ShieldCheck },
  { id: 'Scholarships & Education', label: 'Scholarships & Fellowships', icon: GraduationCap },
  { id: 'Remote USD Careers', label: 'Remote USD & Taxes', icon: Globe2 },
];

export default function GuidesClient({ guides }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredGuide = guides[0];

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesCategory = selectedCategory === 'ALL' || guide.category === selectedCategory;
      const matchesQuery = 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [guides, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Featured Master Blueprint Banner (Only shown if ALL or no search) */}
      {featuredGuide && selectedCategory === 'ALL' && !searchQuery && (
        <div className="mb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden group border border-slate-700/50">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md mb-4 tracking-wider">
              ★ Featured Master Intelligence Dossier
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
              <Link href={`/guides/${featuredGuide.slug}`} className="hover:text-blue-300 transition-colors">
                {featuredGuide.title}
              </Link>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {featuredGuide.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {featuredGuide.readTime}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium">By {featuredGuide.author.name}</span>
            </div>

            <Link
              href={`/guides/${featuredGuide.slug}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              Read Complete Blueprint
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Glassdoor-Style Filter Hubs & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Verified Intelligence Dossiers</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'}
            </span>
          </h2>
          {(selectedCategory !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredGuides.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No blueprints match your search criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your filters or searching for terms like "ATS", "Nurse", "Scholarship", or "W-8BEN".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <article 
                key={guide.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {guide.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    <Link href={`/guides/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {guide.author.name}
                  </span>
                  <Link 
                    href={`/guides/${guide.slug}`}
                    className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    Read Blueprint &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
