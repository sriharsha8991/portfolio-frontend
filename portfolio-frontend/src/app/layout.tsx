import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sriharsha Velicheti | AI Engineer & Agentic Systems Developer",
  description: "Building intelligent systems that bridge cutting-edge AI research with real-world applications. Specializing in RAG systems, multimodal AI, and production-ready generative AI solutions.",
  keywords: ["AI Engineer", "RAG Systems", "Machine Learning", "Healthcare AI", "Agentic Systems"],
  authors: [{ name: "Sriharsha Velicheti" }],
  openGraph: {
    title: "Sriharsha Velicheti | AI Engineer",
    description: "AI Engineer specializing in RAG systems and production AI applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased`}>
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}
