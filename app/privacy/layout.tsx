import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | US Career Solutions",
  description: "Official privacy policy and cookie disclosures for US Career Solutions.",
  keywords: ["privacy policy", "data protection", "gdpr", "ccpa"],
  alternates: {
    canonical: "https://www.uscareersolutions.online/privacy",
  },
  openGraph: {
    title: "Privacy Policy | US Career Solutions",
    description: "Official privacy policy and cookie disclosures for US Career Solutions.",
    url: "https://www.uscareersolutions.online/privacy",
    siteName: "US Career Solutions",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="w-full">{children}</section>;
}
