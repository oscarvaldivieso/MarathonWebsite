import HeroSection from "@/components/home/HeroSection";
import UpcomingMatchesSection from "@/components/home/UpcomingMatchesSection";
import TemploSection from "@/components/home/TemploSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedPlayersSection from "@/components/home/FeaturedPlayersSection";
import NewsPreviewSection from "@/components/home/NewsPreviewSection";
import PassionSection from "@/components/home/PassionSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION (Fijado en el fondo) */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
        <HeroSection />
      </div>

      {/* Capa de Contenido Principal que asciende en scroll */}
      <div className="relative z-20 bg-marathon-darkest shadow-[0_-30px_90px_rgba(0,0,0,0.95)] border-t border-white/10">
        
        {/* 2. PRÓXIMOS PARTIDOS / MATCHDAY HUB (Acción y Utilidad Inmediata) */}
        <UpcomingMatchesSection />

        {/* 3. EL TEMPLO DEL MONSTRUO VERDE (WOW Factor Visual — Estadio) */}
        <TemploSection />

        {/* 4. LA GRANDEZA EN NÚMEROS / STATS (Credibilidad e Historia) */}
        <StatsSection />

        {/* 5. JUGADORES DESTACADOS / ESTRELLAS (Conexión Humana) */}
        <FeaturedPlayersSection />

        {/* 6. ACTUALIDAD Y NOTICIAS (Contenido Dinámico y Retención) */}
        <NewsPreviewSection />

        {/* 7. PASIÓN Y VOZ DEL HINCHA (Comunidad y Pertenencia) */}
        <PassionSection />

        {/* 8. CTA DE CONVERSIÓN Y COMUNIDAD (Cierre) */}
        <CtaSection />
      </div>
    </div>
  );
}
