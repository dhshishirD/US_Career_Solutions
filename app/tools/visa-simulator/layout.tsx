import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI US Visa & Green Card Eligibility Simulator (Cap-Exempt, EB-2 NIW, EB-3)',
  description: 'Analyze your statistical eligibility across 6 official US immigration pathways. Discover if you qualify to bypass the annual H-1B lottery via Cap-Exempt institutions, Schedule A, or EB-2 NIW.',
  keywords: ['green card eligibility simulator', 'eb2 niw green card', 'eb1a green card', 'self sponsored green card', 'employment based green card', 'cap-exempt h1b eligibility', 'schedule a nurse green card', 'h1b to green card'],
  openGraph: {
    title: 'AI US Visa & Green Card Eligibility Simulator (Cap-Exempt, EB-2 NIW, EB-3)',
    description: 'Analyze your statistical eligibility across 6 official US immigration pathways. Discover if you qualify to bypass the annual H-1B lottery via Cap-Exempt institutions, Schedule A, or EB-2 NIW.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI US Visa & Green Card Eligibility Simulator (Cap-Exempt, EB-2 NIW, EB-3)',
    description: 'Analyze your statistical eligibility across 6 official US immigration pathways. Discover if you qualify to bypass the annual H-1B lottery via Cap-Exempt institutions, Schedule A, or EB-2 NIW.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
