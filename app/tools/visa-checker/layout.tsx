import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US Company Visa Sponsor Radar: H-1B, Cap-Exempt & EB-3 Hospital Database',
  description: 'Verify whether a US employer actively sponsors H-1B visas, Cap-Exempt petitions, or direct Schedule A green cards based on certified Department of Labor filing data.',
  keywords: ['company visa sponsor checker', 'h1b sponsor database', 'cap-exempt employers list', 'hospital green card sponsors', 'h1b visa radar'],
  openGraph: {
    title: 'US Company Visa Sponsor Radar: H-1B, Cap-Exempt & EB-3 Hospital Database',
    description: 'Verify whether a US employer actively sponsors H-1B visas, Cap-Exempt petitions, or direct Schedule A green cards based on certified Department of Labor filing data.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Company Visa Sponsor Radar: H-1B, Cap-Exempt & EB-3 Hospital Database',
    description: 'Verify whether a US employer actively sponsors H-1B visas, Cap-Exempt petitions, or direct Schedule A green cards based on certified Department of Labor filing data.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
