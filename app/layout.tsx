import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import enData from "./data/site-data-en.json";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${enData.company.name} — ${enData.company.slogan}`,
  description: enData.company.description,
  keywords: [
    "IVD filling line",
    "pharmaceutical filling machine",
    "culture media filling",
    "diagnostic reagent filling",
    "vial filling capping",
    "tube filling capping",
    "automated production line",
    "Huiyou Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
