import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uscareersolutions.online"),
  title: {
    default: "Jobs in USA with Visa Sponsorship & US Remote Jobs | US Career Solutions",
    template: "%s | US Career Solutions",
  },
  description: "Explore daily verified jobs in USA with visa sponsorship (H-1B, Cap-Exempt, EB-3), US remote jobs for foreigners (W-8BEN), top 100% fully-funded USA university scholarships, and free AI ATS resume tools.",
  keywords: [
    "jobs in usa with visa sponsorship",
    "usa jobs with visa sponsorship",
    "jobs in usa for foreigners",
    "remote jobs usa",
    "work from home jobs in usa for foreigners",
    "online jobs in usa for foreigners",
    "us remote jobs for foreigners",
    "h1b visa sponsorship jobs in usa",
    "eb3 visa sponsorship jobs usa",
    "data entry jobs in usa",
    "nursing jobs in usa for foreigners",
    "caregiver jobs in usa with visa sponsorship",
    "entry level jobs in usa for foreigners",
    "free job posting sites in usa",
    "recruitment agencies in usa for foreigners",
    "usa university scholarships",
    "fully funded scholarships in usa",
    "graduate assistantship usa full tuition waiver",
    "us career solutions"
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
    title: "Jobs in USA with Visa Sponsorship & US Remote Jobs | US Career Solutions",
    description: "Search daily verified jobs in USA with visa sponsorship, global remote roles, 100% funded USA scholarships, and AI career care tools for international applicants.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs in USA with Visa Sponsorship & US Remote Jobs | US Career Solutions",
    description: "Search daily verified jobs in USA with visa sponsorship, global remote roles, 100% funded USA scholarships, and AI career care tools for international applicants.",
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
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.uscareersolutions.online/#website",
        "url": "https://www.uscareersolutions.online",
        "name": "US Career Solutions",
        "description": "Everyday verified jobs in USA with visa sponsorship, US remote jobs for foreigners, top USA university scholarships, and AI ATS resume tailor care.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.uscareersolutions.online/jobs?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.uscareersolutions.online/#organization",
        "name": "US Career Solutions",
        "url": "https://www.uscareersolutions.online",
        "logo": "https://www.uscareersolutions.online/favicon.ico",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61573335766965"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+8801981505761",
          "contactType": "Customer Support & Career Guidance",
          "areaServed": "Worldwide",
          "availableLanguage": ["English", "Bengali", "Hindi"]
        }
      }
    ]
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
