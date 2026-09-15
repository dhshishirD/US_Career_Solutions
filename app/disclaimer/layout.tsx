import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Legal & Immigration Disclaimer | US Career Solutions",
  description: "Important legal, immigration, and educational disclaimers regarding information provided on US Career Solutions.",
  alternates: {
    canonical: "https://www.uscareersolutions.online/disclaimer"
  }
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
