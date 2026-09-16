import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.uscareersolutions.online/jobs/cap-exempt-directory",
  },
  title: '100+ Cap-Exempt H-1B Employers & University Database [2026 Directory]',
  description: 'Search verified Cap-Exempt H-1B employers in the USA. Browse 100+ universities, non-profit research institutes, and hospital networks offering year-round H-1B sponsorship with NO annual lottery.',
  keywords: [
    'cap exempt h1b database 2026',
    'list of cap exempt employers usa',
    'cap exempt h1b companies',
    'university h1b sponsorship no lottery',
    'concurrent h1b cap exempt',
    'non profit research institute h1b visa',
    'f1 opt expiring cap exempt jobs'
  ],
  openGraph: {
    title: '100+ Cap-Exempt H-1B Employers & University Database [2026 Directory]',
    description: 'Bypass the annual H-1B lottery. Explore 100+ verified US universities, medical centers, and research foundations with year-round visa filings under INA § 214(g)(5).',
    url: 'https://www.uscareersolutions.online/jobs/cap-exempt-directory',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '100+ Cap-Exempt H-1B Employers Database [2026]',
    description: 'Bypass the annual H-1B lottery. Explore 100+ verified US universities, medical centers, and research foundations with year-round visa filings.',
  },
};

export default function CapExemptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Cap-Exempt H-1B Employer & University Database',
    url: 'https://www.uscareersolutions.online/jobs/cap-exempt-directory',
    description: 'Comprehensive directory of accredited US higher education institutions, non-profit research organizations, and affiliated medical networks exempt from the annual 85,000 H-1B lottery cap under INA § 214(g)(5).',
    keywords: ['Cap-Exempt H-1B', 'USCIS INA 214(g)(5)', 'University Visa Sponsorship', 'Non-Profit Research Jobs'],
    creator: {
      '@type': 'Organization',
      name: 'US Career Solutions Intelligence Team',
      url: 'https://www.uscareersolutions.online',
    },
  };

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
