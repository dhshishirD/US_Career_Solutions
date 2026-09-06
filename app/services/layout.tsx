import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1-on-1 VIP US Career, Visa Strategy & ATS Resume Makeover ($29 USD)',
  description: 'Book a dedicated 1-on-1 strategy session with certified career advisors. Get your resume rewritten to score 90%+ on Workday ATS, build your Cap-Exempt strategy, and win interviews.',
  keywords: ['us career consultation', 'ats resume rewrite service', 'h1b visa career coach', 'study in usa admission consultation', 'us career solutions 1 on 1'],
  openGraph: {
    title: '1-on-1 VIP US Career, Visa Strategy & ATS Resume Makeover ($29 USD)',
    description: 'Book a dedicated 1-on-1 strategy session with certified career advisors. Get your resume rewritten to score 90%+ on Workday ATS, build your Cap-Exempt strategy, and win interviews.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1-on-1 VIP US Career, Visa Strategy & ATS Resume Makeover ($29 USD)',
    description: 'Book a dedicated 1-on-1 strategy session with certified career advisors. Get your resume rewritten to score 90%+ on Workday ATS, build your Cap-Exempt strategy, and win interviews.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
