import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Verified Jobs in USA with Visa Sponsorship & US Remote Jobs',
  description: 'Explore verified everyday jobs in the USA offering direct H-1B sponsorship, Cap-Exempt university roles, Schedule A nursing green cards, and global remote USD contracts (Form W-8BEN).',
  keywords: ['jobs in usa with visa sponsorship', 'usa jobs with visa sponsorship', 'h1b visa sponsorship jobs', 'remote jobs usa paid in usd', 'cap-exempt h1b jobs', 'schedule a nurse green card jobs', 'work from home jobs usa for foreigners'],
  openGraph: {
    title: 'Daily Verified Jobs in USA with Visa Sponsorship & US Remote Jobs',
    description: 'Explore verified everyday jobs in the USA offering direct H-1B sponsorship, Cap-Exempt university roles, Schedule A nursing green cards, and global remote USD contracts (Form W-8BEN).',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Verified Jobs in USA with Visa Sponsorship & US Remote Jobs',
    description: 'Explore verified everyday jobs in the USA offering direct H-1B sponsorship, Cap-Exempt university roles, Schedule A nursing green cards, and global remote USD contracts (Form W-8BEN).',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
