import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uscareersolutions.online"),
  title: {
    default: "US Career Solutions | Everyday Verified USA Jobs & Visa Radar",
    template: "%s | US Career Solutions",
  },
  description: "Find everyday verified USA jobs with visa sponsorship (H-1B, Cap-Exempt, OPT/CPT, US Remote Contractor), top fully-funded USA university scholarships, AI ATS resume scanner, and 1-on-1 career care.",
  keywords: [
    "USA Jobs",
    "Jobs in USA",
    "USA University Scholarships",
    "Full Tuition Waiver USA",
    "Graduate Assistantship GRA GTA",
    "H1B Visa Sponsor Jobs",
    "Cap Exempt H1B Jobs",
    "US Remote Jobs Worldwide",
    "ATS Resume Tailorer",
    "OPT CPT Jobs",
    "US Career Solutions"
  ],
  authors: [{ name: "US Career Solutions", url: "https://www.uscareersolutions.online" }],
  creator: "US Career Solutions",
  publisher: "US Career Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.uscareersolutions.online",
    siteName: "US Career Solutions",
    title: "US Career Solutions | Everyday Verified USA Jobs & Visa Radar",
    description: "Search daily verified USA jobs, top 100% funded university scholarships, and AI career tools for international candidates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "US Career Solutions | Everyday Verified USA Jobs & Visa Radar",
    description: "Search daily verified USA jobs, top 100% funded university scholarships, and AI career tools for international candidates.",
  },
  alternates: {
    canonical: "https://www.uscareersolutions.online",
  },
  verification: {
    google: "3K6llDWiEFsE-NW3c8pYbydTDIcnIw74WfKJ88pU4Sg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "US Career Solutions",
    "url": "https://www.uscareersolutions.online",
    "description": "Everyday verified USA jobs, visa sponsorship radar, top US university scholarships, and AI ATS resume tailor care.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.uscareersolutions.online/jobs?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId="G-NF718Z8KTR" />
      </body>
    </html>
  );
}
