import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/shared/SessionProvider";
import Topbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apex Veritas | Virtual HSEQ Solutions",
    template: "%s | Apex Veritas",
  },
  description:
    "Apex Veritas delivers end-to-end Virtual HSEQ compliance solutions for companies worldwide. From our base in Kenya, we provide 'Safety Without Borders' through our global virtual platform.",
  keywords: [
    "HSEQ",
    "Health Safety Environment Quality",
    "compliance platform",
    "HSEQ compliance software",
    "Virtual HSEQ consulting",
    "ISO 45001 virtual management",
    "Kenyan HSEQ experts",
    "Worldwide HSEQ services",
    "Safety Without Borders",
    "HSEQ dashboard",
  ],
  authors: [{ name: "Apex Veritas Team" }],
  creator: "Apex Veritas",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://apexveritas.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apex-veristas.vercel.app",
    siteName: "Apex Veritas",
    title: "Apex Veritas | Virtual HSEQ Solutions — Safety Without Borders",
    description:
      "Safety Without Borders — Virtual HSEQ compliance platform serving companies worldwide from Kenya.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apex Veritas Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Veritas | Virtual HSEQ Solutions",
    description: "Safety Without Borders — Virtual HSEQ compliance for companies worldwide.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <Topbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
