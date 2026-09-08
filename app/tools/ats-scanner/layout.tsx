import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI ATS Resume Checker & Scanner [Score 90%+] | Workday & Greenhouse',
  description: 'Test your CV against Fortune 500 Applicant Tracking Systems (ATS). Instant keyword density audits, formatting fixes, Google XYZ bullet formulation, and 100% free match score.',
  keywords: ['ats resume checker', 'free ats resume checker', 'ats score checker', 'how to pass workday ats', 'greenhouse resume scanner', 'applicant tracking system checker', 'ats cv checker free'],
  openGraph: {
    title: 'Free AI ATS Resume Checker & Scanner [Score 90%+] | Workday & Greenhouse',
    description: 'Test your CV against Fortune 500 Applicant Tracking Systems (ATS). Instant keyword density audits, formatting fixes, Google XYZ bullet formulation, and 100% free match score.',
    url: 'https://www.uscareersolutions.online/tools/ats-scanner',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI ATS Resume Checker & Scanner [Score 90%+] | Workday & Greenhouse',
    description: 'Test your CV against Fortune 500 Applicant Tracking Systems (ATS). Instant keyword density audits, formatting fixes, Google XYZ bullet formulation, and 100% free match score.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free AI ATS Resume Checker & Scanner',
  url: 'https://www.uscareersolutions.online/tools/ats-scanner',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '230',
    bestRating: '5',
    worstRating: '1',
  },
  description: 'Instant ATS resume scanner and scoring engine compatible with Workday, Greenhouse, and Lever.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
