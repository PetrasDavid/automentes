import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  variable: "--font-oswald",
  weight: ["500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "Autómentés Érden, Budapesten és Pest megyében 0–24. Személygépkocsi mentés, bikázás, kerékcsere Diósdon, Százhalombattán, Budaörsön és az agglomerációban — gyors kiérkezés, korrekt árak.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Autómentés Érd · ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "autómentés Érd",
    "autómentő Érd",
    "autómentés Budapest",
    "autómentés Pest megye",
    "autómentés Diósd",
    "autómentés Százhalombatta",
    "autómentés Budaörs",
    "autómentés Törökbálint",
    "autómentés Szigetszentmiklós",
    "autómentés Halásztelek",
    "autómentés Tárnok",
    "bikázás Érd",
    "kerékcsere Érd",
    "segélyszolgálat",
    "0-24 autómentő",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Autómentés Érd · ${SITE_TAGLINE}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Autómentés Érd · ${SITE_TAGLINE}`,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${oswald.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:font-bold focus:uppercase focus:text-black"
        >
          Ugrás a tartalomhoz
        </a>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
