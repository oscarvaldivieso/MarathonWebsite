import HeroSection from "@/components/home/HeroSection";
import PortalSection from "@/components/home/PortalSection";
import PassionSection from "@/components/home/PassionSection";
import TemploSection from "@/components/home/TemploSection";
import StatsSection from "@/components/home/StatsSection";
import HistoryPreview from "@/components/home/HistoryPreview";
import MatchdaySection from "@/components/home/MatchdaySection";
import FanSection from "@/components/home/FanSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PortalSection />
      <TemploSection />
      <PassionSection />
      <StatsSection />
      <HistoryPreview />
      <MatchdaySection />
      <FanSection />
      <CtaSection />
    </>
  );
}
