import HeroSection from "@/components/home/HeroSection";
import TemploSection from "@/components/home/TemploSection";
import UpcomingMatchesSection from "@/components/home/UpcomingMatchesSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedPlayersSection from "@/components/home/FeaturedPlayersSection";
import NewsPreviewSection from "@/components/home/NewsPreviewSection";
import PassionSection from "@/components/home/PassionSection";
import CtaSection from "@/components/home/CtaSection";
import ColorTransition from "@/components/ui/ColorTransition";

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* Capa 1: Hero Section fijada en el fondo */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
        <HeroSection />
      </div>

      {/* Capa 2: Contenido principal superpuesto en scroll */}
      <div className="relative z-20 bg-marathon-darkest shadow-[0_-30px_90px_rgba(0,0,0,0.95)] border-t border-white/10">
        <TemploSection />

        <UpcomingMatchesSection />

        {/* Dark → Light transition into Stats */}
        <ColorTransition
          from="#012919"
          to="#F3F3F3"
          accentColor="#92BF4E"
          text="MARATHON"
          height="220px"
        />
        <StatsSection />

        {/* Light → Dark transition into Players */}
        <ColorTransition
          from="#F3F3F3"
          to="#012919"
          accentColor="#2E9C3F"
          text="FURIA VERDE"
          height="220px"
        />

        <FeaturedPlayersSection />
        <NewsPreviewSection />
        <PassionSection />
        <CtaSection />
      </div>
    </div>
  );
}
