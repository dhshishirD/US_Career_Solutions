import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Executive Recruiter Outreach & Cold Pitch Email Generator',
  description: 'Generate high-converting, professional cold outreach emails and LinkedIn messages tailored for US tech recruiters, hospital hiring managers, and university department chairs.',
  keywords: ['recruiter outreach generator', 'cold email template for jobs', 'how to message recruiters on linkedin', 'visa sponsorship cold email', 'executive pitch generator'],
  openGraph: {
    title: 'AI Executive Recruiter Outreach & Cold Pitch Email Generator',
    description: 'Generate high-converting, professional cold outreach emails and LinkedIn messages tailored for US tech recruiters, hospital hiring managers, and university department chairs.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Executive Recruiter Outreach & Cold Pitch Email Generator',
    description: 'Generate high-converting, professional cold outreach emails and LinkedIn messages tailored for US tech recruiters, hospital hiring managers, and university department chairs.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
