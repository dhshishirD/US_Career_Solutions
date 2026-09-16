import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/eb2-niw-evaluator",
  },
  title: 'EB-2 NIW Profile Evaluator & Citation Scorer [2026] | Matter of Dhanasar Test',
  description: 'Evaluate your EB-2 National Interest Waiver (NIW) Green Card approval odds. Free assessment based on USCIS Matter of Dhanasar 3-prong precedent, citation metrics, and critical tech endeavors.',
  keywords: [
    'eb2 niw evaluator',
    'eb-2 niw profile evaluation',
    'national interest waiver citation requirements',
    'matter of dhanasar 3 prong test',
    'eb2 niw approval calculator',
    'eb2 niw self petition guide 2026',
    'phd postdoc green card evaluation',
    'uscis niw stem criteria'
  ],
  openGraph: {
    title: 'EB-2 NIW Profile Evaluator & Citation Scorer [2026] | Matter of Dhanasar Test',
    description: 'Calculate your EB-2 National Interest Waiver self-petition approval probability based on degrees, citations, peer reviews, and federal priority endeavors.',
    url: 'https://www.uscareersolutions.online/tools/eb2-niw-evaluator',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EB-2 NIW Profile Evaluator & Citation Scorer [2026]',
    description: 'Calculate your EB-2 National Interest Waiver self-petition approval probability based on degrees, citations, peer reviews, and federal priority endeavors.',
  },
};

export default function NIWEvaluatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EB-2 NIW Profile Evaluator & Citation Scorer',
    url: 'https://www.uscareersolutions.online/tools/eb2-niw-evaluator',
    applicationCategory: 'LegalApplication',
    operatingSystem: 'All',
    description: 'Free self-petition Green Card evaluation engine analyzing foreign degrees, Google Scholar citations, peer review records, and US national importance endeavors under the Matter of Dhanasar precedent.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'US Career Solutions Intelligence Team',
      url: 'https://www.uscareersolutions.online',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
