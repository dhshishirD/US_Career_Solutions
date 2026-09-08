import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US Take-Home Pay & Paycheck Tax Calculator [2026 Free Tool] | W-2, F-1 OPT & Form W-8BEN',
  description: 'Calculate your true net take-home pay after taxes across all 50 US states (TX, CA, NY, WA, FL). Includes F-1 STEM OPT FICA 7.65% tax exemption savings and remote W-8BEN treaty calculations.',
  keywords: ['take home pay calculator', 'paycheck calculator', 'calculate salary after tax', 'calculate pay after tax', '1099 tax calculator', 'federal income tax calculator', 'net pay calculator', 'f1 opt fica tax exemption calculator', 'w8ben tax calculator'],
  openGraph: {
    title: 'US Take-Home Pay & Paycheck Tax Calculator [2026 Free Tool] | W-2, F-1 OPT & Form W-8BEN',
    description: 'Calculate your true net take-home pay after taxes across all 50 US states (TX, CA, NY, WA, FL). Includes F-1 STEM OPT FICA 7.65% tax exemption savings and remote W-8BEN treaty calculations.',
    url: 'https://www.uscareersolutions.online/tools/salary-tax-calculator',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Take-Home Pay & Paycheck Tax Calculator [2026 Free Tool] | W-2, F-1 OPT & Form W-8BEN',
    description: 'Calculate your true net take-home pay after taxes across all 50 US states (TX, CA, NY, WA, FL). Includes F-1 STEM OPT FICA 7.65% tax exemption savings and remote W-8BEN treaty calculations.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'US Paycheck & Net Take-Home Tax Calculator',
  url: 'https://www.uscareersolutions.online/tools/salary-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '168',
    bestRating: '5',
    worstRating: '1',
  },
  description: 'Instant US Take-Home Pay & Federal/State Tax Calculator with F-1 OPT FICA exemption & Remote W-8BEN treaty analysis.',
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
