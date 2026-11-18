import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.uscareersolutions.online/services",
  },
  title: 'ATS Resume Rewrite & US Career Strategy Call ($29+)',
  description: 'Get your resume rewritten for US ATS systems or book a 40-minute career and visa strategy call. Packages from $29 USD.',
  openGraph: {
    title: 'ATS Resume Rewrite & US Career Strategy Call ($29+)',
    description: 'Get your resume rewritten for US ATS systems or book a 40-minute career and visa strategy call. Packages from $29 USD.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS Resume Rewrite & US Career Strategy Call ($29+)',
    description: 'Get your resume rewritten for US ATS systems or book a 40-minute career and visa strategy call. Packages from $29 USD.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
