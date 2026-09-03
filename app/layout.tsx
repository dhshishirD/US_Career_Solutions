import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "US Career Solutions | Everyday Verified USA Jobs & Visa Radar",
  description: "Find everyday verified US jobs with transparent visa sponsorship (H-1B, Cap-Exempt, OPT/CPT, US Remote), plus instant AI ATS resume tailoring and career care tools.",
  keywords: ["USA Jobs", "H1B Sponsor Jobs", "Cap Exempt Jobs", "US Remote Jobs", "ATS Resume Tailorer", "OPT Jobs", "Career Solutions"],
  authors: [{ name: "US Career Solutions" }],
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
  return (
    <html lang="en" className="h-full">
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
