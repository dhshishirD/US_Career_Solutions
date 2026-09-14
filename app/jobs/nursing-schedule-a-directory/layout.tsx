import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "50-State Nursing License Endorsement & Schedule A Hospital Directory (2026)",
  description: "Explore the complete 50-State Board of Nursing (BON) endorsement matrix, CGFNS CES / VisaScreen requirements, and direct-hire non-profit teaching hospitals sponsoring EB-3 Schedule A Green Cards for foreign Registered Nurses.",
  keywords: [
    "nursing license endorsement 50 states",
    "nclex endorsement international nurse",
    "schedule a green card direct hire hospitals",
    "cgfns visascreen requirements",
    "compact nursing states nlc map",
    "eb3 nursing sponsorship without agency",
    "foreign nurse hospital jobs usa",
    "mayo clinic nurse green card sponsorship"
  ],
  alternates: {
    canonical: "https://www.uscareersolutions.online/jobs/nursing-schedule-a-directory"
  },
  openGraph: {
    title: "50-State Nursing License Endorsement & Direct-Hire Hospital Directory",
    description: "Compare 50-state Board of Nursing endorsement requirements and discover premier US hospital networks sponsoring EB-3 Schedule A Green Cards directly.",
    url: "https://www.uscareersolutions.online/jobs/nursing-schedule-a-directory",
    siteName: "US Career Solutions",
    type: "website"
  }
};

export default function NursingDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "50-State Nursing License Endorsement & Direct-Hire Hospital Directory",
    "url": "https://www.uscareersolutions.online/jobs/nursing-schedule-a-directory",
    "description": "Directory of US state boards of nursing license endorsement requirements and verified direct-hire healthcare systems sponsoring foreign Registered Nurses for EB-3 Schedule A Green Cards under 20 CFR § 656.5.",
    "about": {
      "@type": "MedicalSpecialty",
      "name": "Nursing"
    }
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
