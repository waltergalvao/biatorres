import { HeroSection } from "@/components/HeroSection";
import { ValueProposition } from "@/components/ValueProposition";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { VistoriaSection } from "@/components/VistoriaSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutPreview } from "@/components/AboutPreview";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <FeaturedProjects />
      <ProcessSection />
      <VistoriaSection />
      <AboutPreview />
      <CTASection />
    </>
  );
}
