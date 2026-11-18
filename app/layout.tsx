import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uscareersolutions.online"),
  title: {
    default: "US Career Solutions: Visa Sponsorship Jobs & Scholarships",
    template: "%s | US Career Solutions",
  },
  description: "Find US jobs with visa sponsorship, remote USD contracts and funded scholarships, plus free ATS resume and salary tools.",
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
    title: "US Career Solutions: Visa Sponsorship Jobs & Scholarships",
    description: "Find US jobs with visa sponsorship, remote USD contracts and funded scholarships, plus free ATS resume and salary tools.",
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  twitter: {
    card: "summary_large_image",
    title: "US Career Solutions: Visa Sponsorship Jobs & Scholarships",
    description: "Find US jobs with visa sponsorship, remote USD contracts and funded scholarships, plus free ATS resume and salary tools.",
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6517318043008526"
          crossOrigin="anonymous"
        />
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
        <GoogleAnalytics gaId="G-NF718ZBKTR" />
      </body>
    </html>
  );
}
