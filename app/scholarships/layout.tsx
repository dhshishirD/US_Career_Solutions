import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Graduate Assistantships & Funded Scholarships in the USA",
  description: "Find US graduate assistantships and scholarships for international students: tuition waivers, stipends and how to apply. Updated for Fall 2026.",
  alternates: {
    canonical: "https://www.uscareersolutions.online/scholarships"
  },
  openGraph: {
    title: "Graduate Assistantships & Funded Scholarships in the USA",
    description: "Find US graduate assistantships and scholarships for international students: tuition waivers, stipends and how to apply. Updated for Fall 2026.",
    url: "https://www.uscareersolutions.online/scholarships",
    siteName: "US Career Solutions",
    type: "website"
  }
};

export default function ScholarshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can international students study in the USA for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "International graduate students can study in the USA for free through Graduate Teaching Assistantships (GTA), Graduate Research Assistantships (GRA), and institutional fellowships. These awards provide a 100% full tuition waiver plus an annual living stipend ranging from $22,000 to $38,000 USD."
        }
      },
      {
        "@type": "Question",
        "name": "Do graduate assistantships cover health insurance and living expenses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, standard GTA/GRA appointments (typically 20 hours/week) at major US universities (such as Purdue, UIUC, Georgia Tech, and UC Berkeley) include comprehensive university health insurance coverage and bi-weekly living stipends."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a GRE score to get a fully funded scholarship in the USA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many US universities have made GRE scores optional or waived them entirely for Fall 2026 admissions. Check our Fall 2026 Fee Waiver and GRE Exemption directory for specific departmental policies."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
