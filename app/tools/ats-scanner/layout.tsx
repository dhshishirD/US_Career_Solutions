import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI ATS Resume Checker & Scanner (Score 90%+ for Workday & Greenhouse)',
  description: 'Test your CV against Fortune 500 Applicant Tracking Systems (ATS). Get instant keyword density analysis, formatting audits, Google XYZ bullet recommendations, and an overall match score.',
  keywords: ['ats resume checker', 'free ats resume checker', 'ats score checker', 'how to pass workday ats', 'greenhouse resume scanner', 'applicant tracking system checker', 'ats cv checker free'],
  openGraph: {
    title: 'Free AI ATS Resume Checker & Scanner (Score 90%+ for Workday & Greenhouse)',
    description: 'Test your CV against Fortune 500 Applicant Tracking Systems (ATS). Get instant keyword density analysis, formatting audits, Google XYZ bullet recommendations, and an overall match score.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI ATS Resume Checker & Scanner (Score 90%+ for Workday & Greenhouse)',
    description: 'Test your CV against Fortune 500 Applicant Tracking Systems (ATS). Get instant keyword density analysis, formatting audits, Google XYZ bullet recommendations, and an overall match score.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
