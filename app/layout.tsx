import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apex Veritas | Virtual HSEQ Solutions",
    template: "%s | Apex Veritas",
  },
  description:
    "Apex Veritas delivers end-to-end Virtual HSEQ compliance solutions for companies in Kenya and UAE. Safety Without Borders.",
  keywords: [
    "HSEQ",
    "Health Safety Environment Quality",
    "compliance platform",
    "virtual HSEQ",
    "Kenya compliance",
    "UAE HSEQ",
    "ISO 45001",
    "ISO 14001",
    "safety management",
    "Apex Veritas",
  ],
  authors: [{ name: "Apex Veritas" }],
  creator: "Apex Veritas",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://apexveritas.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apexveritas.com",
    siteName: "Apex Veritas",
    title: "Apex Veritas | Virtual HSEQ Solutions",
    description:
      "Safety Without Borders — Virtual HSEQ compliance platform for Kenya & UAE.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apex Veritas — Safety Without Borders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Veritas | Virtual HSEQ Solutions",
    description: "Safety Without Borders — Virtual HSEQ compliance for Kenya & UAE.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
