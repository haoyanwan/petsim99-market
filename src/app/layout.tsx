import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petsim99 Market",
  description: "Made for tracking historic prices in petsim99",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add default font and color to the body
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Other meta tags */}
      </head>
      <body className={`${inter.className} font-sans text-gray-800`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
