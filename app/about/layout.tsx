import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us — Mission, Editorial Standards & Career Intelligence Team",
  description: "Learn about US Career Solutions: our mission to democratize verified US employment, 100% fully-funded university scholarships, statutory immigration data, and editorial standards.",
  alternates: {
    canonical: "https://www.uscareersolutions.online/about"
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
