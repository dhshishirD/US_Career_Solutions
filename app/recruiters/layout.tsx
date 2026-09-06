import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Employers & Recruiters: Post a US Role & Hire Global Talent',
  description: 'Post your open US positions with visa sponsorship or global remote USD contractor roles. Reach over 50,000+ ambitious international professionals.',
  keywords: ['post a job in usa', 'hire h1b candidates', 'recruit international nurses', 'post remote usd contractor jobs', 'us job posting site'],
  openGraph: {
    title: 'For Employers & Recruiters: Post a US Role & Hire Global Talent',
    description: 'Post your open US positions with visa sponsorship or global remote USD contractor roles. Reach over 50,000+ ambitious international professionals.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Employers & Recruiters: Post a US Role & Hire Global Talent',
    description: 'Post your open US positions with visa sponsorship or global remote USD contractor roles. Reach over 50,000+ ambitious international professionals.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
