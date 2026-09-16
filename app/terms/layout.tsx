import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | US Career Solutions",
  description: "Terms of service and user agreements for US Career Solutions platform.",
  keywords: ["terms of service", "user agreement", "disclaimer"],
  alternates: {
    canonical: "https://www.uscareersolutions.online/terms",
  },
  openGraph: {
    title: "Terms of Service | US Career Solutions",
    description: "Terms of service and user agreements for US Career Solutions platform.",
    url: "https://www.uscareersolutions.online/terms",
    siteName: "US Career Solutions",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="w-full">{children}</section>;
}
