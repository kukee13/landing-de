import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://landing-de-brown.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Landing.de — Your first 90 days in Germany, sorted',
    template: '%s | Landing.de',
  },
  description:
    'Free personalised checklist for international students and skilled workers arriving in Germany. Anmeldung, health insurance, bank account, and 20+ more tasks — sorted by deadline.',
  openGraph: {
    type: 'website',
    siteName: 'Landing.de',
    title: 'Landing.de — Your first 90 days in Germany, sorted',
    description:
      'Free personalised checklist for newcomers to Germany. Anmeldung, health insurance, bank account, and 20+ tasks — sorted by deadline and visa type.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing.de — Your first 90 days in Germany, sorted',
    description:
      'Free personalised checklist for newcomers to Germany. Sorted by your visa type, city, and arrival date.',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
