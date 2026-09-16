import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'H-1B LCA Salary Search Tool 2026 [Verified DOL Prevailing Wage Data]',
  description: 'Search official U.S. Department of Labor (DOL Form ETA-9035) certified H-1B salaries by company, job title, state, and wage level (I-IV). Filter cap-exempt employers and benchmark real tech compensation.',
  keywords: [
    'h1b salary search',
    'lca database 2026',
    'prevailing wage calculator',
    'dol form eta 9035 search',
    'h1b visa salaries',
    'cap exempt h1b salaries',
    'tech salary benchmark usa'
  ],
  openGraph: {
    title: 'H-1B LCA Salary Search Tool 2026 [Verified DOL Prevailing Wage Data]',
    description: 'Explore certified base salaries and prevailing wages from official U.S. Department of Labor filings across top tech sponsors and universities.',
    url: 'https://www.uscareersolutions.online/tools/lca-salary-search',
    siteName: 'US Career Solutions',
    type: 'website',
  },
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/lca-salary-search"
  }
};

export default function LcaSalarySearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://www.uscareersolutions.online/tools/lca-salary-search#app',
        'name': 'H-1B LCA Prevailing Wage & Certified Salary Search Tool',
        'url': 'https://www.uscareersolutions.online/tools/lca-salary-search',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All modern web browsers',
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock'
        },
        'description': 'Real-time search engine for certified U.S. Department of Labor H-1B Labor Condition Applications (LCA). Filter by employer, wage level I-IV, state, and cap-exempt status.',
        'featureList': [
          'Search certified base salaries across 10,000+ DOL filings',
          'Filter by Prevailing Wage Levels I, II, III, and IV',
          'Cap-Exempt sponsor identification (Universities & Non-Profit Research)',
          'Instant Median and Peak Salary KPI Calculation',
          'Official U.S. Department of Labor Form ETA-9035 Data Source Citing'
        ],
        'provider': {
          '@type': 'Organization',
          'name': 'US Career Solutions',
          'url': 'https://www.uscareersolutions.online'
        }
      },
      {
        '@type': 'Dataset',
        '@id': 'https://www.uscareersolutions.online/tools/lca-salary-search#dataset',
        'name': 'U.S. Department of Labor H-1B LCA Certified Wage Filings 2025-2026',
        'description': 'Aggregated public disclosure dataset of certified Form ETA-9035 H-1B Labor Condition Applications released by the U.S. Department of Labor Office of Foreign Labor Certification (OFLC).',
        'url': 'https://www.uscareersolutions.online/tools/lca-salary-search',
        'license': 'https://www.dol.gov/agencies/eta/foreign-labor/performance',
        'isAccessibleForFree': true,
        'creator': {
          '@type': 'Organization',
          'name': 'U.S. Department of Labor OFLC & US Career Solutions'
        },
        'temporalCoverage': '2025/2026'
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
            'name': 'H-1B LCA Salary Search',
            'item': 'https://www.uscareersolutions.online/tools/lca-salary-search'
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
