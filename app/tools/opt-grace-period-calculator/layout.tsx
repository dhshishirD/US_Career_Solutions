import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'F-1 OPT Grace Period & SEVIS Transfer Calculator [2026 USCIS Rules]',
  description: 'Calculate your exact 60-day USCIS departure deadline, 90/150-day unemployment allowance, SEVIS transfer release dates, Day 1 CPT windows, and H-1B Cap-Gap eligibility under 8 CFR § 214.2(f)(10).',
  keywords: [
    'opt grace period calculator',
    'f1 60 day grace period calculator',
    'stem opt unemployment days calculator',
    'sevis transfer deadline opt',
    'day 1 cpt deadline calculator',
    'h1b cap gap extension calculator'
  ],
  openGraph: {
    title: 'F-1 OPT Grace Period & SEVIS Transfer Calculator [2026 USCIS Rules]',
    description: 'Free interactive calculator for international students. Compute your 60-day grace period, remaining unemployment days, and download your 7-point RFE status maintenance checklist.',
    url: 'https://www.uscareersolutions.online/tools/opt-grace-period-calculator',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/opt-grace-period-calculator"
  }
};

export default function OptGracePeriodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://www.uscareersolutions.online/tools/opt-grace-period-calculator#app',
        'name': 'F-1 OPT Grace Period & SEVIS Transfer Calculator',
        'url': 'https://www.uscareersolutions.online/tools/opt-grace-period-calculator',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'All modern web browsers',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock'
        },
        'description': 'Real-time calculation engine for F-1 visa students computing post-completion OPT 60-day grace periods, 90-day unemployment limits, 150-day STEM unemployment clocks, and SEVIS transfer deadlines.',
        'provider': {
          '@type': 'Organization',
          'name': 'US Career Solutions',
          'url': 'https://www.uscareersolutions.online'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://www.uscareersolutions.online'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Tools',
            'item': 'https://www.uscareersolutions.online/tools/salary-tax-calculator'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'OPT Grace Period Calculator',
            'item': 'https://www.uscareersolutions.online/tools/opt-grace-period-calculator'
          }
        ]
      }
    ]
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
