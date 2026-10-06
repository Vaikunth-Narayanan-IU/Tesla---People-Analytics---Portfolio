import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Tesla People Intelligence",
  description: "Recruiting Analytics & Decision Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Navigation />
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
