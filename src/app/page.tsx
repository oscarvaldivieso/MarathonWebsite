import HeroSection from "@/components/home/HeroSection";
import TemploSection from "@/components/home/TemploSection";
import UpcomingMatchesSection from "@/components/home/UpcomingMatchesSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedPlayersSection from "@/components/home/FeaturedPlayersSection";
import NewsPreviewSection from "@/components/home/NewsPreviewSection";
import PassionSection from "@/components/home/PassionSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* Capa 1: Hero Section fijada en el fondo */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
        <HeroSection />
      </div>

      {/* Capa 2: Contenido principal superpuesto que cubre el Hero limpiamente con el Templo */}
      <div className="relative z-20 bg-marathon-darkest shadow-[0_-30px_90px_rgba(0,0,0,0.95)] border-t border-white/10">
        {/* 1. Transición de superposición fluida: Templo del Monstruo Verde */}
        <TemploSection />

        {/* 2. Próximos Partidos (Carrusel Horizontal limpio e independiente) */}
        <UpcomingMatchesSection />

        {/* 3. La Grandeza en Números (Bento Grid Estilo Apple) */}
        <StatsSection />

        {/* 4. Jugadores Destacados */}
        <FeaturedPlayersSection />

        {/* 5. Noticias Recientes */}
        <NewsPreviewSection />

        {/* 6. Pasión Verdolaga */}
        <PassionSection />

        {/* 7. CTA de Conversión */}
        <CtaSection />
      </div>
    </div>
  );
}
