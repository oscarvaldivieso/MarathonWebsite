import HeroSection from "@/components/home/HeroSection";
import HeroPortalTransition from "@/components/home/HeroPortalTransition";
import PortalSection from "@/components/home/PortalSection";
import TemploSection from "@/components/home/TemploSection";
import StatsSection from "@/components/home/StatsSection";
import HistoryPreview from "@/components/home/HistoryPreview";
import MatchdaySection from "@/components/home/MatchdaySection";
import PassionSection from "@/components/home/PassionSection";
import CtaSection from "@/components/home/CtaSection";
import ColorTransition from "@/components/ui/ColorTransition";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroPortalTransition />
      <PortalSection />
      <TemploSection />

      {/* Dark → Light transition into Stats */}
      <ColorTransition 
        from="#000000" 
        to="#F3F3F3" 
        accentColor="#92BF4E" 
        text="TEMPLO" 
        height="280px" 
      />
      <StatsSection />

      {/* Light → Dark transition into History */}
      <ColorTransition 
        from="#F3F3F3" 
        to="#012919" 
        accentColor="#2E9C3F" 
        text="LEYENDA" 
        height="280px" 
      />
      <HistoryPreview />

      {/* Dark → Light transition into Matchday */}
      <ColorTransition 
        from="#012919" 
        to="#F3F3F3" 
        accentColor="#92BF4E" 
        text="PARTIDO" 
        height="280px" 
      />
      <MatchdaySection />

      {/* Light → Dark transition into Passion */}
      <ColorTransition 
        from="#F3F3F3" 
        to="#01402E" 
        accentColor="#2E9C3F" 
        text="PASION" 
        height="280px" 
      />
      <PassionSection />
      <CtaSection />
    </>
  );
}
