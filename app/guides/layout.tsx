import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "US Career & Visa Sponsorship Master Guides (17 Pillars) | US Career Solutions",
  description: "In-depth statutory guides on H-1B, Cap-Exempt, EB-2 NIW, EB-3 Schedule A, F-1 OPT STEM, and W-8BEN remote taxation.",
  keywords: ["us career guides", "visa sponsorship guide", "eb2 niw guide", "w8ben tax guide"],
  alternates: {
    canonical: "https://www.uscareersolutions.online/guides",
  },
  openGraph: {
    title: "US Career & Visa Sponsorship Master Guides (17 Pillars) | US Career Solutions",
    description: "In-depth statutory guides on H-1B, Cap-Exempt, EB-2 NIW, EB-3 Schedule A, F-1 OPT STEM, and W-8BEN remote taxation.",
    url: "https://www.uscareersolutions.online/guides",
    siteName: "US Career Solutions",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="w-full">{children}</section>;
}
