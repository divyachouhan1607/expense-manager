import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kharcha-saathi.vercel.app"),
  title: "Kharcha Saathi",
  description: "Smart expense tracking for everyone",
  openGraph: {
    title: "Kharcha Saathi",
    description: "Smart expense tracking for everyone",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kharcha Saathi – Stress free expense tracking",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kharcha Saathi",
    description: "Smart expense tracking for everyone",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
