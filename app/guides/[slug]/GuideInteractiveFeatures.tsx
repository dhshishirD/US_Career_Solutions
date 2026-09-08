'use client';

import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Check, 
  Copy, 
  Send, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  guideTitle: string;
  guideSlug: string;
  faqs?: FAQ[];
}

export default function GuideInteractiveFeatures({ guideTitle, guideSlug, faqs }: Props) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const guideUrl = `https://www.uscareersolutions.online/guides/${guideSlug}`;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(guideUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `🇺🇸 *${guideTitle}*\n\nRead this complete guide on US Career Solutions:\n👉 ${guideUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleTelegramShare = () => {
    const text = `🇺🇸 ${guideTitle}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(guideUrl)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* 1. Real-Time Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-200">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Interactive Share Floating Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 my-8 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100">Found this guide helpful?</div>
            <div className="text-xs text-slate-400">Share with fellow international job seekers & students</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>

          <button
            onClick={handleTelegramShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Send className="w-4 h-4" />
            Telegram
          </button>

          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* 3. Interactive FAQ Accordion Section (if available) */}
      {faqs && faqs.length > 0 && (
        <div className="my-10 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">
              FAQ
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500">
                Common questions answered by USCIS & Career Analysts
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Interactive Feedback & Telegram Community Box */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 my-10 border border-indigo-900/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Intelligence Hub
          </div>
          <h4 className="text-xl font-black text-white mb-2">
            Never Miss Cap-Exempt & Scholarship Drops
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            Join over 2,000+ international professionals receiving daily verified US visa openings and full tuition funding alerts directly on Telegram.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {feedbackGiven ? (
            <div className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-4 py-3 rounded-xl">
              ✓ Thanks for your feedback!
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400">Helpful?</span>
              <button 
                onClick={() => setFeedbackGiven('yes')}
                className="hover:text-emerald-400 flex items-center gap-1 font-bold p-1 rounded transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Yes
              </button>
              <span className="text-slate-600">|</span>
              <button 
                onClick={() => setFeedbackGiven('no')}
                className="hover:text-rose-400 flex items-center gap-1 font-bold p-1 rounded transition-colors"
              >
                <ThumbsDown className="w-3.5 h-3.5" /> No
              </button>
            </div>
          )}

          <a
            href="https://t.me/uscareersolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            ✈️ Join Telegram Channel
          </a>
        </div>
      </div>
    </>
  );
}
