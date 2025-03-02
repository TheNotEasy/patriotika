import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/std/header";
import {Inter} from "next/font/google"

export const fetchCache = 'force-no-store';

const interFont = Inter({
  subsets: ['cyrillic', 'latin']
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${interFont.className}`}>
        <div className="flex flex-col min-h-[100vh] gap-5 sm:gap-10 pb-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
