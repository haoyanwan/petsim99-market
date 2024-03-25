// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MenuItem from "./components/MenuItem";
import Image from "next/image";
import logoIcon from "../../public/images/logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Simulator 99 (PS99) Market Price Tracker",
  description: "Made for tracking historic prices in pet simulator 99(ps99)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-388650561"
        ></script>
        <script>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-388650561');
            `}
        </script>
      </head>
      <body className="h-full">
        <div className="Dashboard flex h-full bg-dk-light flex-col md:flex-row">
          <div className="SideBar w-full md:w-60 p-6 bg-dk flex flex-col justify-between">
            <div className="Top flex-col justify-start items-start gap-9 flex">
              <div className="Logo justify-start items-center gap-3 inline-flex">
                <div className="Logo px-1.5 py-1.5 shadow-lg bg-purple-300 rounded-md flex-col justify-start items-start gap-2.5 inline-flex">
                  <Image src={logoIcon} alt="Logo" width={34} height={34} />
                </div>
                <div className="Motiv text-white text-2xl font-bold font-['DM Sans']">
                  PS99
                </div>
              </div>
              <div className="Contents flex-col justify-start items-start gap-2.5 w-full">
                <MenuItem
                  text="Dashboard"
                  icon={<div className="DashboardIcon w-5 h-5 relative" />}
                  href="/"
                />
                <MenuItem
                  text="Inflation Index"
                  icon={<div className="IconsDoughnutLine w-5 h-5 relative" />}
                  href="/inflation-index"
                />
                <MenuItem
                  text="Hot Items"
                  icon={
                    <div className="IconsCarLine w-5 h-5 px-0.5 py-0.5 justify-center items-center flex">
                      <div className="Group w-4 h-4 relative"></div>
                    </div>
                  }
                  href="/hot-items"
                />
                <MenuItem
                  text="Price Terminal"
                  icon={
                    <div className="IconsShoppingBagLine w-5 h-5 relative" />
                  }
                  href="/price-terminal"
                />
                <MenuItem
                  text="RAP Manipulated"
                  icon={
                    <div className="IconsShoppingCartLine w-5 h-5 relative" />
                  }
                  href="/rap-manipulated"
                />
                <MenuItem
                  text="Discord"
                  icon={<div className="IconsFencingLine w-5 h-5 relative" />}
                  href="/discord"
                />
              </div>
            </div>
            <div className="Bottom flex-col justify-start items-start gap-6 w-full">
              <MenuItem
                text="Settings"
                icon={<div className="IconsCogLine w-5 h-5 relative" />}
                href="/settings"
              />
            </div>
          </div>
          <div className="MainContent flex-1 flex flex-col">
            <div className="Top p-4 bg-dk flex items-center justify-between">
              <div className="Right flex items-center gap-10"></div>
            </div>
            <div className="Main flex-1 px-0 py-0 overflow-auto bg-dk-light">
              {children}
            </div>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
