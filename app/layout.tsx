import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jerson Lumpas — Full-Stack & Mobile Developer",
  description:
    "4th Year BSIT student from the Philippines. Building real apps that solve real problems — from volunteer communities to pickup volleyball.",
  keywords: [
    "Jerson Lumpas",
    "Filipino developer",
    "Full-Stack Developer",
    "Mobile Developer",
    "React Native",
    "Laravel",
    "Next.js",
    "BSIT",
  ],
  authors: [{ name: "Jerson Lumpas", url: "https://github.com/jersonlumpas23-eng" }],
  openGraph: {
    title: "Jerson Lumpas — Developer",
    description: "Filipino developer building community-driven apps.",
    siteName: "Jerson Lumpas Portfolio",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerson Lumpas — Full-Stack & Mobile Developer",
    description: "Filipino developer building community-driven apps.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${dmSans.variable} ${spaceMono.variable} scroll-smooth`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
