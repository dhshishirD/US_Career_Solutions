import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US Job Application Tracker & Career CRM Dashboard',
  description: 'Organize and track your US job applications, interview stages, follow-ups, and salary offers in one streamlined, private dashboard.',
  keywords: ['job application tracker', 'career crm', 'job search organizer', 'track us visa applications'],
  openGraph: {
    title: 'US Job Application Tracker & Career CRM Dashboard',
    description: 'Organize and track your US job applications, interview stages, follow-ups, and salary offers in one streamlined, private dashboard.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Job Application Tracker & Career CRM Dashboard',
    description: 'Organize and track your US job applications, interview stages, follow-ups, and salary offers in one streamlined, private dashboard.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
