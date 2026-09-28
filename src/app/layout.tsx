import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallButton, Cursor, Curtain, LegacyHashRedirect, ScrollProgress } from "@/components/layout/Chrome";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { JsonLd, organizationLd } from "@/components/JsonLd";
import "./globals.css";

// Заглавията са само в една дебелина (600): по-малко файлове за зареждане.
const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: "600",
  variable: "--f-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--f-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--f-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.slogan}`,
    template: `%s · ${site.name}`,
  },
  description: site.about[0],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: site.name,
    images: [{ url: "/img/projects/lake-house/000.webp", width: 1024, height: 768, alt: "Лейк хаус, Тайминвест Строй" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Към съдържанието
        </a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CallButton />
        <Cursor />
        <Curtain />
        <MotionRoot />
        <LegacyHashRedirect />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
