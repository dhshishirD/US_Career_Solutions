import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "H-2A & H-2B Seasonal Employer & Harvest Calendar Directory (2026)",
  description: "Explore DOL certified H-2A agricultural and H-2B seasonal employers. Interactive harvest calendar by state, Adverse Effect Wage Rates (AEWR), free housing verification, and direct employer application links.",
  keywords: [
    "h2a visa agricultural jobs",
    "h2b seasonal jobs usa",
    "us farm harvest calendar by state",
    "aewr wage rates 2026",
    "certified h2a employers directory",
    "alaska fish processing jobs h2b",
    "colorado ski resort seasonal jobs",
    "dol 20 cfr 655 anti scam rules"
  ],
  alternates: {
    canonical: "https://www.uscareersolutions.online/jobs/seasonal-h2-directory"
  },
  openGraph: {
    title: "H-2A & H-2B Seasonal Employer & Harvest Calendar Directory",
    description: "Search 50+ certified US seasonal employers, track crop harvest seasons by state, check Adverse Effect Wage Rates, and access verified direct applications.",
    url: "https://www.uscareersolutions.online/jobs/seasonal-h2-directory",
    siteName: "US Career Solutions",
    type: "website"
  }
};

export default function SeasonalH2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "H-2A Agricultural & H-2B Seasonal Employer Directory & Harvest Calendar",
    "url": "https://www.uscareersolutions.online/jobs/seasonal-h2-directory",
    "description": "Comprehensive database of US Department of Labor certified H-2A and H-2B seasonal employers, state harvest calendars, and statutory Adverse Effect Wage Rates.",
    "license": "https://creativecommons.org/licenses/by/4.0/"
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
