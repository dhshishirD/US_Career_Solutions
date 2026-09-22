import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.uscareersolutions.online/jobs",
  },
  title: 'Verified US Jobs with Visa Sponsorship (2026 Directory) | H-1B, Cap-Exempt & EB-3',
  description: 'Search 1,200+ verified everyday US jobs with legal visa sponsorship. Direct H-1B sponsors, Cap-Exempt university roles (0% lottery), Schedule A nursing green cards, and global remote USD contracts (Form W-8BEN).',
  keywords: [
    'jobs in usa with visa sponsorship',
    'usa jobs with visa sponsorship 2026',
    'jobs in california visa sponsorship',
    'companies hiring h-1b 2026',
    'h1b visa sponsorship jobs',
    'remote jobs usa paid in usd',
    'cap-exempt h1b jobs',
    'schedule a nurse green card jobs',
    'e-verify employers direct hire'
  ],
  openGraph: {
    title: 'Verified US Jobs with Visa Sponsorship (2026 Directory)',
    description: 'Search 1,200+ verified everyday US jobs with legal visa sponsorship. Direct H-1B sponsors, Cap-Exempt university roles, and global remote USD contracts.',
    url: 'https://www.uscareersolutions.online/jobs',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verified US Jobs with Visa Sponsorship (2026 Directory)',
    description: 'Search 1,200+ verified everyday US jobs with legal visa sponsorship. Direct H-1B sponsors, Cap-Exempt university roles, and global remote USD contracts.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
