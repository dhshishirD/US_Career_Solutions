import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/scholarship-predictor",
  },
  title: 'USA University 100% Scholarship Predictor & Professor Pitch AI [2026 Free Tool]',
  description: 'Calculate your probability for a 100% tuition waiver plus $2,400–$3,500/month Graduate Assistantship (GRA/TA), and generate high-reply cold outreach emails to US faculty.',
  openGraph: {
    title: 'USA University 100% Scholarship Predictor & Professor Pitch AI [2026 Free Tool]',
    description: 'Calculate your probability for a 100% tuition waiver plus $2,400–$3,500/month Graduate Assistantship (GRA/TA), and generate high-reply cold outreach emails to US faculty.',
    url: 'https://www.uscareersolutions.online/tools/scholarship-predictor',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA University 100% Scholarship Predictor & Professor Pitch AI [2026 Free Tool]',
    description: 'Calculate your probability for a 100% tuition waiver plus $2,400–$3,500/month Graduate Assistantship (GRA/TA), and generate high-reply cold outreach emails to US faculty.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'USA University 100% Scholarship Predictor & Professor Pitch AI',
  url: 'https://www.uscareersolutions.online/tools/scholarship-predictor',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'AI-driven full tuition waiver probability meter and academic faculty cold outreach email generator.',
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
