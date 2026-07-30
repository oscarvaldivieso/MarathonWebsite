import type { Metadata } from "next";
import { outfit, inter, antonio, elrotex, elrotexSwash } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Club Deportivo Marathón | Furia Verde — San Pedro Sula, Honduras",
    template: "%s | CD Marathón",
  },
  icons: {
    icon: "/assets/brand/escudo_normal.svg",
    apple: "/assets/brand/escudo_normal.svg",
    shortcut: "/assets/brand/escudo_normal.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/brand/escudo_normal.svg",
    },
  },
  description:
    "Sitio web oficial del Club Deportivo Marathón, la Furia Verde de San Pedro Sula, Honduras. 9 veces campeón de la Liga Nacional. Fundado en 1925. Soy del verde, soy feliz.",
  keywords: [
    "Club Deportivo Marathón",
    "Marathón",
    "Furia Verde",
    "San Pedro Sula",
    "Honduras",
    "Liga Nacional",
    "fútbol hondureño",
    "Yankel Rosenthal",
  ],
  authors: [{ name: "Club Deportivo Marathón" }],
  openGraph: {
    title: "Club Deportivo Marathón | Furia Verde",
    description:
      "9 veces campeón de la Liga Nacional de Honduras. Fundado en 1925 en San Pedro Sula. Soy del verde, soy feliz.",
    url: "https://cdmarathon.com",
    siteName: "CD Marathón",
    locale: "es_HN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Deportivo Marathón | Furia Verde",
    description:
      "9 veces campeón. Fundado en 1925. San Pedro Sula, Honduras. Soy del verde, soy feliz.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: "Club Deportivo Marathón",
  sport: "Soccer",
  foundingDate: "1925-11-25",
  location: {
    "@type": "Place",
    name: "Estadio Yankel Rosenthal",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Pedro Sula",
      addressCountry: "HN",
    },
  },
  memberOf: {
    "@type": "SportsOrganization",
    name: "Liga Nacional de Fútbol de Honduras",
  },
  url: "https://cdmarathon.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${inter.variable} ${antonio.variable} ${elrotex.variable} ${elrotexSwash.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-marathon-darkest text-marathon-light">
        <SmoothScroll />
        <Preloader />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
