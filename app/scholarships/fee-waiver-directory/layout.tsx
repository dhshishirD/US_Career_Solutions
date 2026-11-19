import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US University Application Fee Waivers & GRE Policies',
  description: 'Find US universities with application fee waiver options and GRE-optional policies for international graduate applicants. Links to official pages.',
  openGraph: {
    title: 'US University Application Fee Waivers & GRE Policies',
    description: 'Find fee waiver options and GRE policies for US graduate programs, with links to each official university page.',
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
        'name': 'US Universities Graduate Application Fee Waiver & GRE Policy Directory',
        'description': 'Directory of application fee waiver options and GRE policies at U.S. graduate programs, with links to official university pages.',
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
              'text': 'Some universities waive the application fee for students who attend an official virtual open house, request a waiver from the admissions office, or apply during a free-application period. Options differ by university, so check each official admissions page.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Do US graduate programs require the GRE?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Many programs have made the GRE optional or no longer consider it, but policies vary by program and year. Check the admissions page of the specific program.'
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
