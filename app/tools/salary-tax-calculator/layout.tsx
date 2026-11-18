import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/salary-tax-calculator",
  },
  title: 'US Take-Home Pay Calculator: W-2, F-1 OPT & W-8BEN (2026)',
  description: 'Estimate your US net pay after federal, state and FICA tax for all 50 states, including F-1 OPT and W-8BEN contractor modes. Free.',
  openGraph: {
    title: 'US Take-Home Pay Calculator: W-2, F-1 OPT & W-8BEN (2026)',
    description: 'Estimate your US net pay after federal, state and FICA tax for all 50 states, including F-1 OPT and W-8BEN contractor modes. Free.',
    url: 'https://www.uscareersolutions.online/tools/salary-tax-calculator',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Take-Home Pay Calculator: W-2, F-1 OPT & W-8BEN (2026)',
    description: 'Estimate your US net pay after federal, state and FICA tax for all 50 states, including F-1 OPT and W-8BEN contractor modes. Free.',
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
