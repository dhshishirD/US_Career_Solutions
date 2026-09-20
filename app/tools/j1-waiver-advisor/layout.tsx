import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "J-1 Visa 2-Year Rule (INA § 212e) Waiver & Advisory Engine 2026 | US Career Solutions",
  description: "Free interactive diagnostic for J-1 scholars, researchers, and physicians. Check Section 212(e) two-year home country rule subjectivity, explore 5 waiver pathways (No Objection, Conrad 30, IGA, Hardship, Persecution), and generate Form DS-3035 filing checklists.",
  keywords: [
    "j1 waiver 212e calculator",
    "j1 visa two year home country physical presence requirement",
    "section 212e waiver",
    "conrad 30 j1 waiver",
    "no objection statement j1",
    "interested government agency waiver j1",
    "j1 waiver processing time 2026",
    "ds 3035 online application guide",
    "j1 physician waiver conrad 30",
    "advisory opinion j1 dos"
  ],
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/j1-waiver-advisor",
  },
  openGraph: {
    title: "J-1 Visa 2-Year Rule (INA § 212e) Waiver & Advisory Engine 2026",
    description: "Diagnose 212(e) subjectivity, evaluate No Objection vs Conrad 30 vs IGA waivers, and generate a step-by-step DS-3035 packet checklist.",
    url: "https://www.uscareersolutions.online/tools/j1-waiver-advisor",
    siteName: "US Career Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "J-1 Visa 2-Year Rule (212e) Waiver & Advisory Engine",
    description: "Check if you are subject to the J-1 two-year home residence rule and simulate your waiver approval pathways.",
  },
};

export default function J1AdvisorLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "J-1 Visa Section 212(e) Waiver & Advisory Engine",
        "operatingSystem": "All",
        "applicationCategory": "LegalServiceApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Interactive legal eligibility calculator and statutory pathway analyzer for J-1 visa holders subject to INA § 212(e)."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the J-1 Visa Two-Year Home-Country Physical Presence Requirement (INA § 212e)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Section 212(e) of the Immigration and Nationality Act (INA), certain J-1 exchange visitors cannot change status in the US, obtain an H-1B or L-1 visa, or adjust to permanent residence (Green Card) until they have resided in their home country for an aggregate of at least two years, or obtained a formal waiver from the Department of State Waiver Review Division and USCIS."
            }
          },
          {
            "@type": "Question",
            "name": "What are the 3 reasons a J-1 visa holder becomes subject to 212(e)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "1) Direct or indirect government funding from the US Government, home country government, or an international organization; 2) The exchange visitor's field of study or expertise appears on the Exchange Visitor Skills List for their country; 3) Graduate Medical Education or Training (GME) received in the US sponsored by ECFMG."
            }
          },
          {
            "@type": "Question",
            "name": "Can a J-1 physician use a No Objection Statement (NOS) to waive the 2-year rule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Under INA § 212(e), foreign medical graduates who participated in graduate medical education or clinical training (residency/fellowship) are legally barred from using a No Objection Statement. They must use the Conrad State 30 Program, an Interested Federal Government Agency (IGA like VA or HHS), Exceptional Hardship, or Persecution."
            }
          },
          {
            "@type": "Question",
            "name": "What if my J-1 visa foil says 'Bearer is not subject' but my DS-2019 has government funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The statutory reality governs over consular or border notations. If your DS-2019 shows US or home government funding, you are legally subject regardless of an erroneous visa stamp. In ambiguous cases, you can submit an Advisory Opinion request to the Department of State Waiver Review Division to obtain a binding determination."
            }
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
