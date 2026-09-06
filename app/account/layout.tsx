import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidate Account & Profile Management | US Career Solutions',
  description: 'Manage your candidate profile, review saved opportunities, and track your personalized US career solutions roadmap.',
  keywords: ['candidate account', 'profile settings', 'us career solutions login'],
  openGraph: {
    title: 'Candidate Account & Profile Management | US Career Solutions',
    description: 'Manage your candidate profile, review saved opportunities, and track your personalized US career solutions roadmap.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Candidate Account & Profile Management | US Career Solutions',
    description: 'Manage your candidate profile, review saved opportunities, and track your personalized US career solutions roadmap.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
