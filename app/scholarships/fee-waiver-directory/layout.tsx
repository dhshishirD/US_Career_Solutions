import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fall 2026 US University Application Fee Waiver & GRE Waiver Directory',
  description: 'Comprehensive directory of 30+ verified US universities offering $0 application fee waiver promo codes, webinar attendee waivers, and GRE exemption policies for Fall 2026 & Spring 2027.',
  keywords: [
    'university application fee waiver 2026',
    'gre waiver universities usa',
    'free us graduate application promo codes',
    'fall 2026 application fee waiver',
    'graduate application fee waiver list',
    'full ride scholarships usa'
  ],
  openGraph: {
    title: 'Fall 2026 US University Application Fee Waiver & GRE Waiver Directory',
    description: 'Save $1,500+ on graduate school applications with verified $0 promo codes, webinar fee waivers, and GRE exemption policies across top US universities.',
    url: 'https://www.uscareersolutions.online/scholarships/fee-waiver-directory',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  alternates: {
    canonical: "https://www.uscareersolutions.online/scholarships/fee-waiver-directory"
  }
};

export default function FeeWaiverDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        '@id': 'https://www.uscareersolutions.online/scholarships/fee-waiver-directory#dataset',
        'name': 'Fall 2026 US Universities Graduate Application Fee Waiver & GRE Exemption Directory',
        'description': 'Curated and verified database of application fee waiver codes, information session waiver mechanisms, and GRE test policies across top accredited U.S. graduate programs.',
        'url': 'https://www.uscareersolutions.online/scholarships/fee-waiver-directory',
        'isAccessibleForFree': true,
        'creator': {
          '@type': 'Organization',
          'name': 'US Career Solutions'
        },
        'temporalCoverage': '2026/2027'
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.uscareersolutions.online/scholarships/fee-waiver-directory#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How do international students get application fee waivers for US universities?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'International applicants can secure $0 application fees by attending official departmental virtual open houses, emailing Graduate Admissions Coordinators with a strong academic CV, or applying during university Free Application Weeks.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can the GRE be waived for STEM Masters and PhD programs in 2026?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, over 60% of top US STEM graduate programs have adopted test-optional or test-blind policies for 2026-2027, allowing applicants to submit strong research portfolios and letters of recommendation without GRE scores.'
            }
          }
        ]
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
            'name': 'Scholarships',
            'item': 'https://www.uscareersolutions.online/scholarships'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Fee Waiver Directory',
            'item': 'https://www.uscareersolutions.online/scholarships/fee-waiver-directory'
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
