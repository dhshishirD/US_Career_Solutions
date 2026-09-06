import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USA University Funding Probability Predictor & Professor Pitch AI',
  description: 'Calculate your statistical probability for a 100% full tuition waiver plus $2,200–$3,500/month Graduate Assistantship (GRA/GTA), and generate high-reply cold outreach emails to US faculty.',
  keywords: ['graduate school scholarships', 'graduate student scholarships', 'fully funded masters programs', 'fully funded phd', 'grants for graduate students', 'how to email us professors for funding', 'graduate assistantship stipend tuition waiver'],
  openGraph: {
    title: 'USA University Funding Probability Predictor & Professor Pitch AI',
    description: 'Calculate your statistical probability for a 100% full tuition waiver plus $2,200–$3,500/month Graduate Assistantship (GRA/GTA), and generate high-reply cold outreach emails to US faculty.',
    url: 'https://www.uscareersolutions.online',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA University Funding Probability Predictor & Professor Pitch AI',
    description: 'Calculate your statistical probability for a 100% full tuition waiver plus $2,200–$3,500/month Graduate Assistantship (GRA/GTA), and generate high-reply cold outreach emails to US faculty.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
