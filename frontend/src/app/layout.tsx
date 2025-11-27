import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Dock } from "@/components/ui/dock";
import { Orb } from "@/components/ui/orb";
import { SpotlightEffect } from "@/components/ui/spotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sriharsha | Elite AI Engineer",
  description: "Building The Neural Future. Architecting AI Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="noise-overlay" />
        <SpotlightEffect />
        <LenisProvider>
          {children}
        </LenisProvider>
        <Dock />
        <Orb />
      </body>
    </html>
  );
}
