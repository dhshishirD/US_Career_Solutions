import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us — Official Support, Inquiries & Career Advisory",
  description: "Get in touch with the US Career Solutions editorial and support team. Inquire about 1-on-1 career consulting, submit job listings, report errors, or ask visa guidance questions.",
  alternates: {
    canonical: "https://www.uscareersolutions.online/contact"
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
