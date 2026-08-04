import HeroSection from "@/components/home/HeroSection";
import TemploSection from "@/components/home/TemploSection";
import ImmersiveMatches from "@/components/home/ImmersiveMatches";
import StatsSection from "@/components/home/StatsSection";
import FeaturedPlayersSection from "@/components/home/FeaturedPlayersSection";
import NewsPreviewSection from "@/components/home/NewsPreviewSection";
import PassionSection from "@/components/home/PassionSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <div className="relative w-full bg-[#010906]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Próximos Partidos */}
      <ImmersiveMatches />

      {/* 3. La Historia se Mide en Grandeza (Bento Grid) */}
      <StatsSection />

      {/* 4. El Templo del Monstruo Verde (3D Stadium Experience) */}
      <TemploSection />

      {/* 5. Jugadores Destacados */}
      <FeaturedPlayersSection />

      {/* 6. Noticias Recientes */}
      <NewsPreviewSection />

      {/* 7. Pasión Verdolaga */}
      <PassionSection />

    </div>
  );
}
