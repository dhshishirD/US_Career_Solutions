import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US Career Academy: STAR Interview Frameworks & DOL Prevailing Wage Hub',
  description: 'Master behavioral STAR interview techniques for Fortune 500 tech companies, access certified Department of Labor Level 2 prevailing wages, and study executive cold outreach scripts.',
  keywords: ['star interview method', 'amazon leadership principles star', 'dol prevailing wage tier 2', 'h1b prevailing wage minimums', 'us visa glossary', 'how to negotiate salary usd'],
  openGraph: {
    title: 'US Career Academy: STAR Interview Frameworks & DOL Prevailing Wage Hub',
    description: 'Master behavioral STAR interview techniques for Fortune 500 tech companies, access certified Department of Labor Level 2 prevailing wages, and study executive cold outreach scripts.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Career Academy: STAR Interview Frameworks & DOL Prevailing Wage Hub',
    description: 'Master behavioral STAR interview techniques for Fortune 500 tech companies, access certified Department of Labor Level 2 prevailing wages, and study executive cold outreach scripts.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
