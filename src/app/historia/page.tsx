import type { Metadata } from "next";
import HistoryHero from "@/components/historia/HistoryHero";
import OriginStorySection from "@/components/historia/OriginStorySection";
import TimelineSection from "@/components/historia/TimelineSection";
import InternationalGlorySection from "@/components/historia/InternationalGlorySection";
import IdentitySection from "@/components/historia/IdentitySection";
import StadiaAndFansSection from "@/components/historia/StadiaAndFansSection";

export const metadata: Metadata = {
  title: "Historia del Club Deportivo Marathón | 100 Años de Gloria y Leyenda",
  description:
    "La crónica oficial e inmersiva del Club Deportivo Marathón: su origen en 1925 con la célebre pelota Montgomery Ward de Chicago, la Sinfonía Verde de 1979, los 9 campeonatos de Liga Nacional, el Estadio Yankel Rosenthal y sus históricas victorias ante River Plate y Cruz Azul.",
  keywords: [
    "Historia CD Marathón",
    "Fundación Marathón 1925",
    "Eloy Montes",
    "Monstruo Verde",
    "La Sinfonía Verde",
    "Yankel Rosenthal",
    "Furia Verde",
    "Marathon vs River Plate",
    "Marathon vs Cruz Azul",
  ],
  openGraph: {
    title: "Historia del Club Deportivo Marathón | Centenario Verdolaga",
    description:
      "Explora 100 años de historia, títulos, hazañas internacionales y pasión incondicional del Monstruo Verde.",
    url: "https://cdmarathon.com/historia",
    siteName: "CD Marathón",
    locale: "es_HN",
    type: "article",
  },
};

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-[#012919] text-marathon-light selection:bg-marathon-green/30 selection:text-white">
      {/* 00. Hero Section */}
      <HistoryHero />

      {/* 01. Light Section: Origin & Chicago Ball 1925 (Apple / Awwwards Style) */}
      <OriginStorySection />

      {/* 02. Dark Section: Timeline 100 Years (Editorial Timeline) */}
      <TimelineSection />

      {/* 03. Dark Section: International Glory (Verdugo de Extranjeros) */}
      <InternationalGlorySection />

      {/* 04. Light Section: Symbols & Nicknames (Apple Bento Grid) */}
      <IdentitySection />

      {/* 05. Dark Section: Stadium & Fan Culture */}
      <StadiaAndFansSection />
    </div>
  );
}
