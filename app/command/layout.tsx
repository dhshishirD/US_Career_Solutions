import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Command Center & Social Broadcast Console',
  description: 'Manage real-time job sync pipelines, verified scholarship audits, and automated multichannel social broadcasts.',
  keywords: ['command center', 'platform automation', 'us career solutions command'],
  openGraph: {
    title: 'Platform Command Center & Social Broadcast Console',
    description: 'Manage real-time job sync pipelines, verified scholarship audits, and automated multichannel social broadcasts.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform Command Center & Social Broadcast Console',
    description: 'Manage real-time job sync pipelines, verified scholarship audits, and automated multichannel social broadcasts.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
