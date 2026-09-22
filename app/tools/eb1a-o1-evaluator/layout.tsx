import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free EB-1A & O-1A Extraordinary Ability Profile Scorer (2026) | Kazarian 2-Step Evaluator',
  description: 'Evaluate your profile against the 10 statutory criteria under 8 CFR § 204.5(h)(3) & 8 CFR § 214.2(o). Audit your Kazarian two-step merits risk, identify RFE vulnerabilities, and generate a 1-click legal action filing memo.',
  keywords: [
    'eb1a profile evaluation free',
    'o1 visa eligibility calculator',
    '8 cfr 204.5 h 3 criteria checker',
    'kazarian two step evaluation test',
    'eb1a green card points calculator',
    'o1a visa for ai researchers founders',
    'eb1a recommendation letters guide'
  ],
  alternates: {
    canonical: 'https://www.uscareersolutions.online/tools/eb1a-o1-evaluator',
  },
  openGraph: {
    title: 'Free EB-1A & O-1A Extraordinary Ability Profile Scorer (2026)',
    description: '10-criterion diagnostic engine built strictly on 8 CFR § 204.5(h)(3) and 8 CFR § 214.2(o)(3)(iii).',
    url: 'https://www.uscareersolutions.online/tools/eb1a-o1-evaluator',
    siteName: 'US Career Solutions',
    type: 'website',
  }
};

export default function EB1AO1Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
