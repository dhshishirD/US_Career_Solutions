import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US Take-Home Pay & Paycheck Tax Calculator (W-2, F-1 OPT & Form W-8BEN)',
  description: 'Calculate your true net take-home pay after taxes across US states (TX, CA, NY, WA, FL). Includes F-1 STEM OPT FICA tax exemption savings and global remote 1099/W-8BEN treaty calculations.',
  keywords: ['take home pay calculator', 'paycheck calculator', 'calculate salary after tax', 'calculate pay after tax', '1099 tax calculator', 'federal income tax calculator', 'net pay calculator', 'f1 opt fica tax exemption calculator', 'w8ben tax calculator'],
  openGraph: {
    title: 'US Take-Home Pay & Paycheck Tax Calculator (W-2, F-1 OPT & Form W-8BEN)',
    description: 'Calculate your true net take-home pay after taxes across US states (TX, CA, NY, WA, FL). Includes F-1 STEM OPT FICA tax exemption savings and global remote 1099/W-8BEN treaty calculations.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Take-Home Pay & Paycheck Tax Calculator (W-2, F-1 OPT & Form W-8BEN)',
    description: 'Calculate your true net take-home pay after taxes across US states (TX, CA, NY, WA, FL). Includes F-1 STEM OPT FICA tax exemption savings and global remote 1099/W-8BEN treaty calculations.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
