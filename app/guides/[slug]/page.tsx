import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { MASTER_GUIDES, getGuideBySlug } from '@/lib/guides-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MASTER_GUIDES.map(guide => ({
    slug: guide.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | US Career Solutions'
    };
  }

  return {
    title: `${guide.title} | US Career Solutions`,
    description: guide.excerpt,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
      url: `https://www.uscareersolutions.online/guides/${guide.slug}`,
      publishedTime: guide.publishedDate
    }
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': guide.title,
    'description': guide.excerpt,
    'datePublished': guide.publishedDate,
    'dateModified': guide.updatedDate,
    'author': {
      '@type': 'Organization',
      'name': guide.author.name,
      'url': 'https://www.uscareersolutions.online'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'US Career Solutions',
      'url': 'https://www.uscareersolutions.online',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.uscareersolutions.online/favicon.ico'
      }
    },
    'mainEntityOfPage': `https://www.uscareersolutions.online/guides/${guide.slug}`
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Schema.org Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <div className="mb-6">
        <Link 
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to All Guides
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Content Column (8 cols) */}
        <div className="lg:col-span-8">
          
          <div className="mb-8">
            <span className="inline-block bg-blue-50 text-blue-800 text-xs font-bold uppercase px-3 py-1 rounded-md mb-3 border border-blue-200">
              {guide.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {guide.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {guide.subtitle}
            </p>

            {/* Author & Meta Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-6 mt-6 border-t border-slate-100">
              <span className="font-semibold text-slate-800">{guide.author.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {guide.readTime}
              </span>
              <span>•</span>
              <span>Updated {new Date(guide.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Article HTML Content */}
          <div 
            className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700"
            dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
          />

          {/* Embedded Interactive Tool CTA Card */}
          <div className="my-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Recommended Free Tool:
              </span>
              <h3 className="text-xl font-black text-white mb-2">
                {guide.relatedTool.name}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                {guide.relatedTool.description}
              </p>
            </div>

            <Link
              href={guide.relatedTool.link}
              className="px-6 py-3 text-xs sm:text-sm font-extrabold bg-white text-blue-900 hover:bg-blue-50 rounded-xl shadow-md transition-all whitespace-nowrap inline-flex items-center gap-1.5"
            >
              {guide.relatedTool.buttonText}
            </Link>
          </div>

        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Table of Contents Sticky Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-24">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
              Table of Contents:
            </h3>
            <ul className="space-y-2 text-xs">
              {guide.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className="text-slate-600 hover:text-blue-600 font-medium transition-colors block py-0.5"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-2">Need Direct 1-on-1 Guidance?</h4>
              <p className="text-[11px] text-slate-600 mb-3">
                Book a personalized strategy session with our US career concierge on WhatsApp.
              </p>
              <a
                href="https://wa.me/8801981505761?text=Hi%2C%20I%20read%20your%20guide%20and%20need%201-on-1%20US%20career%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow block transition-colors"
              >
                Chat on WhatsApp (Instant)
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
