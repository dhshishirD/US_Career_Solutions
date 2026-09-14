import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Form W-8BEN Compliance Validator & Treaty Rate Calculator (2026)",
  description: "Interactive 4-step W-8BEN validator for non-US freelancers and remote contractors. Verify Foreign Tax ID (FTIN) formats, calculate withholding tax rates (0% vs 30%), cite IRS tax treaty articles, and generate a US client compliance packet.",
  keywords: [
    "w-8ben validator",
    "w8ben foreign tax id format",
    "w8ben treaty rate calculator",
    "form w8ben remote contractor",
    "w8ben line by line guide",
    "us withholding tax remote freelancer",
    "ftin validation",
    "irc 1441 foreign contractor",
    "article 7 business profits w8ben"
  ],
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/w8ben-validator"
  },
  openGraph: {
    title: "Form W-8BEN Compliance Validator & Treaty Rate Calculator",
    description: "Ensure 0% US withholding tax on your remote contractor earnings. Verify your FTIN, check double tax treaty rates, and get an IRS-compliant completion blueprint.",
    url: "https://www.uscareersolutions.online/tools/w8ben-validator",
    siteName: "US Career Solutions",
    type: "website"
  }
};

export default function W8BENValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Form W-8BEN Compliance Validator & Treaty Rate Calculator",
    "url": "https://www.uscareersolutions.online/tools/w8ben-validator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Interactive tax compliance tool for non-US remote contractors and freelancers to validate IRS Form W-8BEN, verify foreign tax IDs, and calculate double taxation treaty withholding rates."
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
