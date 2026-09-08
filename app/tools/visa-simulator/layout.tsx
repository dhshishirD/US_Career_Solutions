import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026 AI US Visa & Green Card Eligibility Simulator [Instant Report] | Cap-Exempt, EB-2 NIW, EB-3',
  description: 'Run the 60-second diagnostic across 6 official US immigration pathways. Discover if you qualify to bypass the annual H-1B lottery via Cap-Exempt institutions, Schedule A, or EB-2 NIW.',
  keywords: ['green card eligibility simulator', 'eb2 niw green card', 'eb1a green card', 'self sponsored green card', 'employment based green card', 'cap-exempt h1b eligibility', 'schedule a nurse green card', 'h1b to green card'],
  openGraph: {
    title: '2026 AI US Visa & Green Card Eligibility Simulator [Instant Report] | Cap-Exempt, EB-2 NIW, EB-3',
    description: 'Run the 60-second diagnostic across 6 official US immigration pathways. Discover if you qualify to bypass the annual H-1B lottery via Cap-Exempt institutions, Schedule A, or EB-2 NIW.',
    url: 'https://www.uscareersolutions.online/tools/visa-simulator',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 AI US Visa & Green Card Eligibility Simulator [Instant Report] | Cap-Exempt, EB-2 NIW, EB-3',
    description: 'Run the 60-second diagnostic across 6 official US immigration pathways. Discover if you qualify to bypass the annual H-1B lottery via Cap-Exempt institutions, Schedule A, or EB-2 NIW.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI US Visa & Green Card Eligibility Simulator',
  url: 'https://www.uscareersolutions.online/tools/visa-simulator',
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
    ratingCount: '214',
    bestRating: '5',
    worstRating: '1',
  },
  description: '60-Second AI Diagnostic scoring for Cap-Exempt H-1B, Schedule A Healthcare EB-3, and EB-2 National Interest Waiver.',
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
