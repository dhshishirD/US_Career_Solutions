import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verified Global Candidate Showcase & Talent Board',
  description: 'Browse pre-screened international software engineers, clinical nurses, data scientists, and AI prompt evaluators actively seeking US visa sponsorship and remote USD contracts.',
  keywords: ['hire international talent usa', 'sponsor h1b candidates', 'global remote developers w8ben', 'international nurse talent showcase', 'us career solutions talent board'],
  openGraph: {
    title: 'Verified Global Candidate Showcase & Talent Board',
    description: 'Browse pre-screened international software engineers, clinical nurses, data scientists, and AI prompt evaluators actively seeking US visa sponsorship and remote USD contracts.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verified Global Candidate Showcase & Talent Board',
    description: 'Browse pre-screened international software engineers, clinical nurses, data scientists, and AI prompt evaluators actively seeking US visa sponsorship and remote USD contracts.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
