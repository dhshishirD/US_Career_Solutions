import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.uscareersolutions.online/jobs",
  },
  title: 'US Jobs With Visa Sponsorship: Search by State & Role',
  description: 'Search US jobs that sponsor H-1B and green cards, plus remote USD contracts. Filter by state, role or visa type.',
  openGraph: {
    title: 'US Jobs With Visa Sponsorship: Search by State & Role',
    description: 'Search US jobs that sponsor H-1B and green cards, plus remote USD contracts. Filter by state, role or visa type.',
    url: 'https://www.uscareersolutions.online/jobs',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Jobs With Visa Sponsorship: Search by State & Role',
    description: 'Search US jobs that sponsor H-1B and green cards, plus remote USD contracts. Filter by state, role or visa type.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
