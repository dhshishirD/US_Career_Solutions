import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "50-State Take-Home Pay & Tax Compare Calculator 2026 | US Career Solutions",
  description: "Compare 50 US state income taxes, local taxes, FICA, and net monthly take-home salary side-by-side.",
  keywords: ["state tax comparison", "us state income tax calculator", "take home pay calculator"],
  alternates: {
    canonical: "https://www.uscareersolutions.online/tools/state-tax-compare",
  },
  openGraph: {
    title: "50-State Take-Home Pay & Tax Compare Calculator 2026 | US Career Solutions",
    description: "Compare 50 US state income taxes, local taxes, FICA, and net monthly take-home salary side-by-side.",
    url: "https://www.uscareersolutions.online/tools/state-tax-compare",
    siteName: "US Career Solutions",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="w-full">{children}</section>;
}
